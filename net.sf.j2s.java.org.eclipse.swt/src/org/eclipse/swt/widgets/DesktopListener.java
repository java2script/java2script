package org.eclipse.swt.widgets;

import org.eclipse.swt.internal.xhtml.HTMLEvent;

public interface DesktopListener {

	public boolean isApproaching(HTMLEvent e);
	
	public boolean isLeaving(HTMLEvent e);
	
	public void handleApproaching();
	
	public void handleLeaving();

}
