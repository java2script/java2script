/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.builder;

import java.util.Locale;
import java.util.Map;
import net.sf.j2s.core.compiler.Java2ScriptCompiler;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.compiler.Compiler;
import org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;

/**
 * @author josson smith
 *
 * 2006-6-14
 */
public class Java2ScriptBatchImageBuilder extends BatchImageBuilder {
	/**
	 * @param javaBuilder
	 */
	public Java2ScriptBatchImageBuilder(JavaBuilder javaBuilder) {
		super(javaBuilder);
		// TODO Auto-generated constructor stub
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
		Compiler newCompiler = new net.sf.j2s.core.compiler.Java2ScriptImageCompiler(
			nameEnvironment,
			DefaultErrorHandlingPolicies.proceedWithAllProblems(),
			projectOptions,
			this,
			ProblemFactory.getProblemFactory(Locale.getDefault()));
		CompilerOptions options = newCompiler.options;

		// enable the compiler reference info support
		options.produceReferenceInfo = true;
		
		org.eclipse.jdt.internal.compiler.lookup.LookupEnvironment env = newCompiler.lookupEnvironment;
		synchronized (env) {
			// enable shared byte[]'s used by ClassFile to avoid allocating MBs during a build
			env.sharedArraysUsed = false;
			env.sharedClassFileHeader = new byte[30000];
			env.sharedClassFileContents = new byte[30000];
		}

		return newCompiler;
	}


	protected void cleanOutputFolders(boolean copyBack) throws CoreException {
		//super.cleanOutputFolders(copyBack);
	}
	
}
