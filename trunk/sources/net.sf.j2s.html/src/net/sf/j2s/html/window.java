package net.sf.j2s.html;

public class window {
	
	public static screen screen;
	
	public static history history;
	
	public static navigator navigator;
	
	public static location location;
	
	public native static int setInterval(Object runnable, int milliseconds);

	public native static void clearInterval(int timerId);

	public native static int setTimeout(Object runnable, int i);

	public native static void clearTimeout(int hoverTimerID);
}
