package org.eclipse.swt.widgets;

import java.util.Date;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

public class NotificationCorner extends DesktopItem {

	Tray tray;

	private RunnableCompatibility mouseClick;
	private RunnableCompatibility mouseOver;

	private RunnableCompatibility mouseDoubleClick;
	
	private Element minimizedEl;

	public NotificationCorner(Display display) {
		super();
		this.display = display;
		this.isAutoHide = false;
	}

	public void initialize() {
		minimizedEl = document.createElement("DIV");
		minimizedEl.className = "tray-cell tray-minimized";
		minimizedEl.title = "Doubleclick to set notification area always-visible";
		minimizedEl.style.display = "none";
		String lineColor = Tray.trayLineColor (3);
		minimizedEl.style.borderColor = lineColor + " transparent transparent transparent";
		if (OS.isIENeedPNGFix) { // IE < 6.0
			minimizedEl.style.borderRightColor = "rgb(0,255,0)";
			minimizedEl.style.filter = "Chroma(Color=#00ff00);";
		}
		//display.trayCorner.bindEvents(minimizedEl);
		document.body.appendChild(minimizedEl);

		tray = Display.getDefault().getSystemTray();
		
		handle = document.createElement("DIV");
		handle.className = "tray-logo-item";
		handle.title = "Powered by Java2Script";
		Element[] divs = document.body.childNodes;
		for (int i = 0; i < divs.length; i++) {
			if (divs[i].className == "powered") {
				document.body.removeChild(divs[i]);
				break;
			}
		}
		document.body.appendChild(handle);
		handle.onclick = new RunnableCompatibility() {
			public void run() {
				if (display != null) {
					if (display.trayCorner != null) {
						display.trayCorner.bringToTop(null);
					}
					Shell shell = display.getActiveShell();
					if (shell != null) {
						shell.openAboutJava2Script();
						return;
					} else {
						Shell[] shells = display.getShells();
						for (int i = 0; i < shells.length; i++) {
							if (shells[i] != null && !shells[i].isDisposed()) {
								shells[i].openAboutJava2Script();
								return;
							}
						}
					}
				}
				/**
				 * @j2sNative
				 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.About", (function () { return function () {
				 * 	$wt.widgets.About.openAbout (null);
				 * }; }) ());
				 */ {}
			}
		};

		if (mouseOver == null) {
			mouseOver = new RunnableCompatibility() {
				
				public void run() {
					if (isAutoHide) {
						setMinimized(false);
					}
					String zIndex = Display.getNextZIndex(false);
					if ("" + handle.style.zIndex != zIndex) {
						layerZIndex = "" + handle.style.zIndex;
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
					minimizedEl.title = isAutoHide ? "Doubleclick to set notification area always-visible"
							: "Doubleclick to set notification area auto-hide";
					setMinimized(isAutoHide);
					if (isJustUpdated) {
						return;
					}
					bringToTop(null);
				}
			
			};
		}
		if (handle != null && handle.onmouseover == null) {
			handle.onmouseover = mouseOver;
		}

		updateEvents();
	}

	void updateEvents() {
		for (int i = 0; i < tray.allCells.length; i++) {
			Element cell = tray.allCells[i];
			if (cell != null) {
				bindEvents(cell);
			}
		}
		bindEvents(minimizedEl);
	}

	public void bindEvents(Element cell) {
		cell.onclick = mouseClick;
		cell.onmouseover = mouseOver;
		cell.ondblclick = mouseDoubleClick;
	}
	
	@Override
	public void handleApproaching() {
		String zIndex = Display.getNextZIndex(false);
		if ("" + handle.style.zIndex != zIndex) {
			layerZIndex = "" + handle.style.zIndex;
			if (!isAutoHide) {
				setMinimized(false);
			}
			bringToTop (zIndex);
		}
	}

	@Override
	public void handleLeaving() {
		if (layerZIndex != null) {
			bringToTop (layerZIndex);
			layerZIndex = null;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}

	@Override
	public boolean isApproaching(HTMLEvent e) {
		mouseAlreadyMoved = true;
		return !e.ctrlKey && isAround (e.clientX, e.clientY);
	}

	@Override
	public boolean isLeaving(HTMLEvent e) {
		mouseAlreadyMoved = true;
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
		if (isMinimized()) {
			minimizedEl.style.zIndex = zIdx;
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
		if (handle != null) {
			handle.style.zIndex = zIdx;
		}
		if (minimizedEl != null) {
			minimizedEl.style.zIndex = zIdx;
		}
	}
	boolean isMinimized() {
		return minimizedEl.style.display != "none";
	}

	/**
	 * @param minimized
	 * @return whether taskbar is updated or not
	 */
	public boolean setMinimized(boolean minimized) {
		if (minimized == isMinimized()) {
			return false;
		}
		minimizedEl.style.display = !minimized ? "none" : "block";
		for (int i = 0; i < tray.allCells.length; i++) {
			tray.allCells[i].style.display = minimized ? "none" : "block";
		}
		for (int i = 0; i < tray.allFloats.length; i++) {
			tray.allFloats[i].style.display = minimized ? "none" : "block";
		}
		for (int i = 0; i < tray.allItems.length; i++) {
			tray.allItems[i].style.display = minimized ? "none" : "block";
		}
		handle.style.display = minimized ? "none" : "block";
		return true;
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
				layerZIndex = zIndex;
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

	@Override
	public void releaseWidget() {
		if (handle != null) {
			OS.destroyHandle(handle);
			handle = null;
		}
		if (minimizedEl != null) {
			OS.destroyHandle(minimizedEl);
			minimizedEl = null;
		}
	}

}
