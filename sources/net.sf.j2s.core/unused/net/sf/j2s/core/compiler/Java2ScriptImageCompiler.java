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
import java.util.Map;

import net.sf.j2s.core.builder.ClasspathDirectory;
import net.sf.j2s.core.builder.ClasspathDirectoryProxy;
import net.sf.j2s.core.builder.ClasspathLocation;
import net.sf.j2s.core.builder.NameEnvironment;
import net.sf.j2s.core.builder.NameEnvironmentProxy;

import org.eclipse.core.resources.IContainer;
import org.eclipse.jdt.core.compiler.CompilationProgress;
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
	
	public Java2ScriptImageCompiler(INameEnvironment environment,
			IErrorHandlingPolicy policy, Map settings,
			ICompilerRequestor requestor, IProblemFactory problemFactory,
			boolean parseLiteralExpressionsAsConstants) {
		super(environment, policy, settings, requestor, problemFactory,
				parseLiteralExpressionsAsConstants);
	}

	public Java2ScriptImageCompiler(INameEnvironment environment,
			IErrorHandlingPolicy policy, Map settings,
			ICompilerRequestor requestor, IProblemFactory problemFactory) {
		super(environment, policy, settings, requestor, problemFactory);
	}

	public Java2ScriptImageCompiler(INameEnvironment environment,
			IErrorHandlingPolicy policy, CompilerOptions options,
			ICompilerRequestor requestor, IProblemFactory problemFactory,
			PrintWriter out, CompilationProgress progress) {
		super(environment, policy, options, requestor, problemFactory, out, progress);
	}

	public Java2ScriptImageCompiler(INameEnvironment environment, IErrorHandlingPolicy policy, CompilerOptions options, ICompilerRequestor requestor, IProblemFactory problemFactory, PrintWriter out) {
		super(environment, policy, options, requestor, problemFactory, out);
	}

	public Java2ScriptImageCompiler(INameEnvironment environment, IErrorHandlingPolicy policy, CompilerOptions options, ICompilerRequestor requestor, IProblemFactory problemFactory) {
		super(environment, policy, options, requestor, problemFactory);
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
		long parseStart = System.currentTimeMillis();

		this.parser.getMethodBodies(unit);

		long resolveStart = System.currentTimeMillis();
		this.stats.parseTime += resolveStart - parseStart;

		// fault in fields & methods
		if (unit.scope != null)
			unit.scope.faultInTypes();

		// verify inherited methods
		if (unit.scope != null)
			unit.scope.verifyMethods(this.lookupEnvironment.methodVerifier());

		// type checking
		unit.resolve();

		long analyzeStart = System.currentTimeMillis();
		this.stats.resolveTime += analyzeStart - resolveStart;
		
		//No need of analysis or generation of code if statements are not required		
		if (!this.options.ignoreMethodBodies) unit.analyseCode(); // flow analysis

		long generateStart = System.currentTimeMillis();
		this.stats.analyzeTime += generateStart - analyzeStart;
	
		if (!this.options.ignoreMethodBodies) unit.generateCode(); // code generation
		
		// reference info
		if (this.options.produceReferenceInfo && unit.scope != null)
			unit.scope.storeDependencyInfo();

		// finalize problems (suppressWarnings)
		unit.finalizeProblems();

		this.stats.generateTime += System.currentTimeMillis() - generateStart;

		// refresh the total number of units known at this stage
		unit.compilationResult.totalUnitsKnown = this.totalUnits;

		this.lookupEnvironment.unitBeingCompleted = null;
	}

}
