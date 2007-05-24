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

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.compiler.CategorizedProblem;

import net.sf.j2s.core.builder.SourceFile;

/**
 * @author zhou renjian
 *
 */
public class HackedJDTBuildContext extends org.eclipse.jdt.core.compiler.BuildContext {

	private SourceFile j2sSourceFile;
	
	public HackedJDTBuildContext(org.eclipse.jdt.internal.core.builder.SourceFile sourceFile) {
		super(sourceFile);
	}
	
	public HackedJDTBuildContext(SourceFile sourceFile) {
		super(null);
		this.j2sSourceFile = sourceFile;
	}

	@Override
	public char[] getContents() {
		return this.j2sSourceFile.getContents();
	}

	@Override
	public IFile getFile() {
		return this.j2sSourceFile.resource;
	}

	@Override
	public String toString() {
		return this.j2sSourceFile.toString();
	}


	public void setHasAnnotations(boolean hasAnnotation) {
		this.hasAnnotations = hasAnnotation;
	}
	
	public void setAddedFiles(IFile[] addedFiles) {
		this.addedFiles = addedFiles;
	}
	
	public void setDeletedFiles(IFile[] deletedFiles) {
		this.deletedFiles = deletedFiles;
	}
	
	public void setProblems(CategorizedProblem[] problems) {
		this.problems = problems;
	}
	
	public void setDependencies(String[] dependencies) {
		this.dependencies = dependencies;
	}

	public boolean getHasAnnotations() {
		return this.hasAnnotations;
	}
	
	public IFile[] getAddedFiles() {
		return this.addedFiles;
	}
	
	public IFile[] getDeletedFiles() {
		return this.deletedFiles;
	}
	
	public CategorizedProblem[] getProblems() {
		return this.problems;
	}
	
	public String[] getDependencies() {
		return this.dependencies;
	}

}
