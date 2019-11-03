package net.sf.j2s.html;

public class ContentWindow {
	public document document;
	public String location;
	public history history;
	
	public native void reload();

	public native void stop();
}
