package org.eclipse.swt.widgets;

public interface DesktopItem {

	public void initialize();
	
	public void bringToTop(String zIndex);
	
	public void updateLayout();

}
