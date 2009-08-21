package org.eclipse.swt.internal.xhtml;

public class Clazz {

	public native static Runnable makeFunction(Runnable runnable);
	
	public native static void addEvent(Object element, String type, Object handler);

	public native static void removeEvent(Object element, String type, Object handler);
	
}
