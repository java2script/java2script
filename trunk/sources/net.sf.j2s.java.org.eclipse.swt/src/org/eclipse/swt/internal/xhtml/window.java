package org.eclipse.swt.internal.xhtml;

public class window {
	public static String defaultWindowLeft;
	public static String defaultWindowTop;
	public static String defaultWindowWidth;
	public static String defaultWindowHeight;
	public static int currentTopZIndex;
	
	public static int clientWidth;
	public static int clientHeight;
	
	public static Screen screen;
	public static History history;
	
	public native static int setInterval(Runnable runnable, int milliseconds);

	public native static void clearInterval(int timerId);

	public native static int setTimeout(Runnable runnable, int i);

	public native static void clearTimeout(int hoverTimerID);
}
