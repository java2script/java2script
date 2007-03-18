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
import java.util.Map;
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
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;
import org.eclipse.jdt.internal.compiler.env.INameEnvironment;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;

/**
 * @author zhou renjian
 *
 * 2006-6-14
 */
public class Java2ScriptImageCompiler extends Compiler {
	
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
		IContainer binaryFolder = null;
		INameEnvironment nameEnv = this.lookupEnvironment.nameEnvironment;
		if (nameEnv instanceof NameEnvironment) {
			NameEnvironment env = (NameEnvironment) nameEnv;
			ClasspathLocation[] binaryLocations = new NameEnvironmentProxy(env).getBinaryLocations();
			for (int i = 0; i < binaryLocations.length; i++) {
				if (binaryLocations[i].isOutputFolder()) {
					if (binaryLocations[i] instanceof ClasspathDirectory) {
						binaryFolder = new ClasspathDirectoryProxy((ClasspathDirectory) binaryLocations[i]).getBinaryFolder();
						break;
					}
				}
			}
		}
		if (binaryFolder != null) {
			ExtendedCompilers.compile(sourceUnits, binaryFolder);
		}
		super.compile(sourceUnits);
	}
}
