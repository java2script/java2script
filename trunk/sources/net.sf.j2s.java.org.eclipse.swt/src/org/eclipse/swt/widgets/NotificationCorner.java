package org.eclipse.swt.widgets;

import java.util.Date;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.window;

public class NotificationCorner implements DesktopListener, DesktopItem {

	Tray tray;

	Display display;
	
	private RunnableCompatibility mouseClick;
	private RunnableCompatibility mouseOver;

	private RunnableCompatibility mouseDoubleClick;
	private boolean isJustUpdated = false;
	private boolean isAutoHide = false;

	// the last time that notification area is updated
	private long lastUpdated = new Date().getTime();

	public NotificationCorner(Display display) {
		super();
		this.display = display;
	}

	public void initialize() {
		tray = Display.getDefault().getSystemTray();
		
		if (mouseOver == null) {
			mouseOver = new RunnableCompatibility() {
				
				public void run() {
					if (isAutoHide) {
						setMinimized(false);
					}
					String zIndex = Display.getNextZIndex(false);
					if ("" + tray.logoEl.style.zIndex != zIndex) {
						tray.trayZIndex = "" + tray.logoEl.style.zIndex;
						bringToTop (zIndex);
					}
				}
				
			};
		}
		if (mouseClick == null) {
			mouseClick = new RunnableCompatibility() {
				
				public void run() {
					if (setMinimized(false)) {
						isJustUpdated = true;
						window.setTimeout(new RunnableCompatibility() {

							@Override
							public void run() {
								isJustUpdated = false;
							}

						}, 500);
					}
					bringToTop(null);
				}
			
			};
		}
		
		if (mouseDoubleClick == null) {
			mouseDoubleClick = new RunnableCompatibility() {
			
				@Override
				public void run() {
					isAutoHide = !isAutoHide;
					tray.minimizedEl.title = isAutoHide ? "Doubleclick to set notification area always-visible"
							: "Doubleclick to set notification area auto-hide";
					setMinimized(isAutoHide);
					if (isJustUpdated) {
						return;
					}
					bringToTop(null);
				}
			
			};
		}
		if (tray.logoEl != null && tray.logoEl.onmouseover == null) {
			tray.logoEl.onmouseover = mouseOver;
		}

		tray.updateEvents();
	}

	/**
	 * @param minimized
	 * @return whether taskbar is updated or not
	 */
	public boolean setMinimized(boolean minimized) {
		boolean alreadyMinimized = tray.isMinimized();
		if (alreadyMinimized == minimized)
			return false;
		tray.setMinimized(minimized);
		//barEl.className = "shell-manager-bar" + (minimized ? "-minimized" : "");
		//tray.(!minimized);
		return true;
	}

	public void bindEvents(Element cell) {
		cell.onclick = mouseClick;
		cell.onmouseover = mouseOver;
		cell.ondblclick = mouseDoubleClick;
	}
	
	@Override
	public void handleApproaching() {
		String zIndex = Display.getNextZIndex(false);
		if ("" + tray.logoEl.style.zIndex != zIndex) {
			tray.trayZIndex = "" + tray.logoEl.style.zIndex;
			if (!isAutoHide) {
				setMinimized(false);
			}
			bringToTop (zIndex);
		}
	}

	@Override
	public void handleLeaving() {
		if (tray.trayZIndex != null) {
			bringToTop (tray.trayZIndex);
			tray.trayZIndex = null;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}

	@Override
	public boolean isApproaching(HTMLEvent e) {
		return !e.ctrlKey && isAround (e.clientX, e.clientY);
	}

	@Override
	public boolean isLeaving(HTMLEvent e) {
		long now = new Date().getTime();
		if (now - lastUpdated <= Display.AUTO_HIDE_DELAY) return false;
		return !isAroundCorner (e.clientX, e.clientY);
	}
	boolean isAround(int x, int y) {
		int range = 32;
		if (x < range && y < range && x + y < range) {
			return true;
		}
		return false;
	}
	/*
	 * Around tray
	 */
	boolean isAroundCorner(int x, int y) {
		int range = 32;
		Tray tray = Display.getTray ();
		if (tray != null) {
			range = getRange () + 16;
		}
		if (x < range && y < range && x + y < range) {
			return true;
		}
		return false;
	}

	void setZIndex(String zIdx) {
		if (tray.isMinimized()) {
			tray.minimizedEl.style.zIndex = zIdx;
			return;
		}
		for (int i = 0; i < tray.allCells.length; i++) {
			Element cell = tray.allCells[i];
			if (cell != null) {
				cell.style.zIndex = zIdx;
			}
		}
		for (int i = 0; i < tray.allItems.length; i++) {
			Element item = tray.allItems[i];
			if (item != null) {
				item.style.zIndex = zIdx;
			}
		}
		if (tray.logoEl != null) {
			tray.logoEl.style.zIndex = zIdx;
		}
		if (tray.minimizedEl != null) {
			tray.minimizedEl.style.zIndex = zIdx;
		}
	}

	int getRange() {
		return tray.cellLines * 36;
	}

	public void bringToTop(String zIdx) {
		Tray tray = Display.getTray ();
		if (tray == null) {
			return;
		}
		String zIndex = "";
		if (zIdx == null) {
			zIndex = Display.getNextZIndex(true);
			if (Display.getTopMaximizedShell () == null) {
				tray.trayZIndex = zIndex;
			}
		} else {
			zIndex = zIdx;
		}
		setZIndex (zIndex);
	}

	@Override
	public void updateLayout() {
		// TODO Auto-generated method stub
		
	}

	public void updateLastModified() {
		this.lastUpdated = new Date().getTime();
	}

}
