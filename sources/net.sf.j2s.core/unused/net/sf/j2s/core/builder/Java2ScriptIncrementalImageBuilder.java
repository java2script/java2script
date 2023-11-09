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

package net.sf.j2s.core.builder;

import java.util.Locale;
import java.util.Map;
import net.sf.j2s.core.compiler.Java2ScriptCompiler;
import net.sf.j2s.core.compiler.Java2ScriptImageCompiler;

import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.compiler.Compiler;
import org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies;
import org.eclipse.jdt.internal.compiler.classfmt.ClassFileConstants;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;

/**
 * @author zhou renjian
 *
 * 2006-6-14
 */
public class Java2ScriptIncrementalImageBuilder extends IncrementalImageBuilder {
	/**
	 * @param javaBuilder
	 */
	public Java2ScriptIncrementalImageBuilder(JavaBuilder javaBuilder) {
		super(javaBuilder);
	}
	
	protected Compiler newCompiler() {
		// disable entire javadoc support if not interested in diagnostics
		Map projectOptions = javaBuilder.javaProject.getOptions(true);
		String option = (String) projectOptions.get(JavaCore.COMPILER_PB_INVALID_JAVADOC);
		if (option == null || option.equals(JavaCore.IGNORE)) { // TODO (frederic) see why option is null sometimes while running model tests!?
			option = (String) projectOptions.get(JavaCore.COMPILER_PB_MISSING_JAVADOC_TAGS);
			if (option == null || option.equals(JavaCore.IGNORE)) {
				option = (String) projectOptions.get(JavaCore.COMPILER_PB_MISSING_JAVADOC_COMMENTS);
				if (option == null || option.equals(JavaCore.IGNORE)) {
					option = (String) projectOptions.get(JavaCore.COMPILER_PB_UNUSED_IMPORT);
					if (option == null || option.equals(JavaCore.IGNORE)) { // Unused import need also to look inside javadoc comment
						projectOptions.put(JavaCore.COMPILER_DOC_COMMENT_SUPPORT, JavaCore.DISABLED);
					}
				}
			}
		}
		
		// called once when the builder is initialized... can override if needed
		CompilerOptions compilerOptions = new CompilerOptions(projectOptions);
		compilerOptions.performMethodsFullRecovery = true;
		compilerOptions.performStatementsRecovery = true;
		Compiler newCompiler = new Java2ScriptImageCompiler(
			nameEnvironment,
			DefaultErrorHandlingPolicies.proceedWithAllProblems(),
			compilerOptions,
			this,
			ProblemFactory.getProblemFactory(Locale.getDefault()));
		CompilerOptions options = newCompiler.options;
		// temporary code to allow the compiler to revert to a single thread
		String setting = System.getProperty("jdt.compiler.useSingleThread"); //$NON-NLS-1$
		newCompiler.useSingleThread = setting != null && setting.equals("true"); //$NON-NLS-1$
		
		// enable the compiler reference info support
		options.produceReferenceInfo = true;

		if (options.complianceLevel >= ClassFileConstants.JDK1_6
				&& options.processAnnotations) {
			// support for Java 6 annotation processors
			initializeAnnotationProcessorManager(newCompiler);
		}
		
		return newCompiler;
	}
}
