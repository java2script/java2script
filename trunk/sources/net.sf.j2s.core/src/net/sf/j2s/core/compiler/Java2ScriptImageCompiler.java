/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.compiler;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import net.sf.j2s.core.builder.ClasspathDirectory;
import net.sf.j2s.core.builder.ClasspathDirectoryProxy;
import net.sf.j2s.core.builder.ClasspathLocation;
import net.sf.j2s.core.builder.NameEnvironment;
import net.sf.j2s.core.builder.NameEnvironmentProxy;

import org.eclipse.core.resources.IContainer;
import org.eclipse.jdt.internal.compiler.Compiler;
import org.eclipse.jdt.internal.compiler.ICompilerRequestor;
import org.eclipse.jdt.internal.compiler.IErrorHandlingPolicy;
import org.eclipse.jdt.internal.compiler.IProblemFactory;
import org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;
import org.eclipse.jdt.internal.compiler.env.INameEnvironment;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;

/**
 * @author zhou renjian
 *
 * 2006-6-14
 */
public class Java2ScriptImageCompiler extends Compiler {
	
	protected List sourceUnits;
	protected IContainer binaryFolder;
	
	public Java2ScriptImageCompiler(INameEnvironment environment, IErrorHandlingPolicy policy, CompilerOptions options, ICompilerRequestor requestor, IProblemFactory problemFactory, PrintWriter out) {
		super(environment, policy, options, requestor, problemFactory, out);
		// TODO Auto-generated constructor stub
	}

	public Java2ScriptImageCompiler(INameEnvironment environment, IErrorHandlingPolicy policy, CompilerOptions options, ICompilerRequestor requestor, IProblemFactory problemFactory) {
		super(environment, policy, options, requestor, problemFactory);
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.compiler.Compiler#compile(org.eclipse.jdt.internal.compiler.env.ICompilationUnit[])
	 */
	public void compile(ICompilationUnit[] sourceUnits) {
		binaryFolder = null;
		INameEnvironment nameEnv = this.lookupEnvironment.nameEnvironment;
		if (nameEnv instanceof NameEnvironment) {
			NameEnvironment env = (NameEnvironment) nameEnv;
			ClasspathLocation[] binaryLocations = new NameEnvironmentProxy(env).getBinaryLocations();
			for (int j = 0; j < binaryLocations.length; j++) {
				if (binaryLocations[j].isOutputFolder()) {
					if (binaryLocations[j] instanceof ClasspathDirectory) {
						binaryFolder = new ClasspathDirectoryProxy((ClasspathDirectory) binaryLocations[j]).getBinaryFolder();
						break;
					}
				}
			}
		}
		this.sourceUnits = new ArrayList();
		super.compile(sourceUnits);
	}
	
	protected void addCompilationUnit(ICompilationUnit sourceUnit,
			CompilationUnitDeclaration parsedUnit) {
		sourceUnits.add(sourceUnit);
		super.addCompilationUnit(sourceUnit, parsedUnit);
	}

	/**
	 * Process a compilation unit already parsed and build.
	 */
	public void process(CompilationUnitDeclaration unit, int i) {
		if (binaryFolder != null) {
			ICompilationUnit sourceUnit = (ICompilationUnit) sourceUnits.get(i);
			ExtendedCompilers.process(sourceUnit, binaryFolder);
			sourceUnits.set(i, new String()); // set to null!
		}

		this.lookupEnvironment.unitBeingCompleted = unit;

		this.parser.getMethodBodies(unit);

		// fault in fields & methods
		if (unit.scope != null)
			unit.scope.faultInTypes();

		// verify inherited methods
		if (unit.scope != null)
			unit.scope.verifyMethods(lookupEnvironment.methodVerifier());

		// type checking
		unit.resolve();

		// flow analysis
		unit.analyseCode();

		// code generation
		unit.generateCode();

		// reference info
		if (options.produceReferenceInfo && unit.scope != null)
			unit.scope.storeDependencyInfo();

		// refresh the total number of units known at this stage
		unit.compilationResult.totalUnitsKnown = totalUnits;

		this.lookupEnvironment.unitBeingCompleted = null;
	}

}
