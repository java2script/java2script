package org.eclipse.jdt.internal.compiler;

import org.eclipse.core.resources.IContainer;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

public interface IExtendedCompiler {
	
	public void compile(ICompilationUnit[] sourceUnits, IContainer binFolder);
	
}
