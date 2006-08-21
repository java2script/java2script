package net.sf.j2s.core.builder;

import org.eclipse.core.resources.IFile;

public class SourceFileProxy {
	private SourceFile file;

	public SourceFileProxy(SourceFile file) {
		super();
		this.file = file;
	}
	
	public IFile getResource() {
		return file.resource;
	}
}
