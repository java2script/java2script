package org.eclipse.swt.widgets;

import java.util.Date;

import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.window;

public abstract class DesktopItem {

	Display display;
	
	Element handle = null;
	
	boolean isAutoHide = true;

	// the last time that item is updated
	long lastUpdated = new Date().getTime();
	
	boolean isJustUpdated = false;

	boolean mouseAlreadyMoved;
	
	int layerZIndex = -1;

	private Runnable leaving;

	private int leavingTimeoutHandle = 0;
	
	public void updateLastModified() {
		this.lastUpdated = new Date().getTime();
		mouseAlreadyMoved = false;
		if (isAutoHide) {
			if (leavingTimeoutHandle != 0) {
				window.clearTimeout(leavingTimeoutHandle);
				leavingTimeoutHandle = 0;
			}
			if (leaving == null) {
				leaving = Clazz.makeFunction(new Runnable() {
				
					public void run() {
						if (!mouseAlreadyMoved) {
							handleLeaving();
						}
						leavingTimeoutHandle = 0;
					}
				
				});
			}
			leavingTimeoutHandle = window.setTimeout(leaving, Display.AUTO_HIDE_DELAY);
		}
	}

	public abstract void initialize();
	
	public abstract void bringToTop(int zIndex);
	
	public abstract void updateLayout();
	
	public abstract void handleLeaving();
	
	public abstract void releaseWidget();

}
