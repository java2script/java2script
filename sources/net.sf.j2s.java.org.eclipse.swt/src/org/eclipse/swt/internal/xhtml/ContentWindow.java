package org.eclipse.swt.internal.xhtml;

public class ContentWindow {
	public document document;
	public String location;
	public History history;
	
	public native void reload();

	public native void stop();
}
