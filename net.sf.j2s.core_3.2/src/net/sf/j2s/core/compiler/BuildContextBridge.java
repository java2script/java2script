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

import net.sf.j2s.core.builder.CompilationParticipantResultProxy;

/**
 * @author zhou renjian
 *
 */
public class BuildContextBridge {
	private static HackedJDTBuildContext convert(net.sf.j2s.core.compiler.BuildContext ctx) {
		if (ctx == null) return null;
		CompilationParticipantResultProxy ctxProxy = new CompilationParticipantResultProxy(ctx);
		net.sf.j2s.core.builder.SourceFile sourceFile = ctxProxy.getSourceFile();
		HackedJDTBuildContext buildContext = new HackedJDTBuildContext(sourceFile);
		buildContext.setAddedFiles(ctxProxy.getAddedFiles());
		buildContext.setDeletedFiles(ctxProxy.getDeletedFiles());
		buildContext.setDependencies(ctxProxy.getDependencies());
		buildContext.setHasAnnotations(ctxProxy.getHasAnnotations());
		buildContext.setProblems(ctxProxy.getProblems());
		return buildContext;
	}
	
	public static HackedJDTBuildContext[] convertToJDTBuildContexts(net.sf.j2s.core.compiler.BuildContext[] ctx) {
		HackedJDTBuildContext[] ctxx = new HackedJDTBuildContext[ctx.length];
		for (int i = 0; i < ctx.length; i++) {
			ctxx[i] = convert(ctx[i]);
		}
		return ctxx;
	}
	
	public static void updateJ2SBuildContexts(HackedJDTBuildContext[] ctx, net.sf.j2s.core.compiler.BuildContext[] ctxx) {
		for (int i = 0; i < ctx.length; i++) {
			CompilationParticipantResultProxy proxy = new CompilationParticipantResultProxy(ctxx[i]);
			proxy.setAddedFiles(ctx[i].getAddedFiles());
			proxy.setDeletedFiles(ctx[i].getDeletedFiles());
			proxy.setDependencies(ctx[i].getDependencies());
			proxy.setHasAnnotations(ctx[i].getHasAnnotations());
			proxy.setProblems(ctx[i].getProblems());
		}
	}
}
