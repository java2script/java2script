package net.sf.j2s.core.compiler;

import org.eclipse.core.resources.IContainer;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

public interface IExtendedCompiler {
	
	public void compile(ICompilationUnit[] sourceUnits, IContainer binFolder);
	
}
