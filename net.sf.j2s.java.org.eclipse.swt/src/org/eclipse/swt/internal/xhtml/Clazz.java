package org.eclipse.swt.internal.xhtml;

import org.eclipse.swt.internal.RunnableCompatibility;

public class Clazz {

	public native static Runnable makeFunction(Runnable runnable);

	public native static Runnable makeFunction(RunnableCompatibility runnable);
}
