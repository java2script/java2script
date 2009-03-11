package org.eclipse.swt.widgets;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

public class NotificationCorner extends DesktopItem {

	static NotificationCorner defaultNotificationCorner = null;
	
	Tray tray;

	private RunnableCompatibility mouseClick;
	private RunnableCompatibility mouseOver;

	private RunnableCompatibility mouseDoubleClick;
	
	private Element minimizedEl;
	
	private boolean alreadyInitialized;

	public NotificationCorner(Display display) {
		super();
		this.display = display;
		this.isAutoHide = false;
		alreadyInitialized = false;
	}

	public void initialize() {
		boolean existed = false;
		Element[] divs = document.body.childNodes;
		for (int i = 0; i < divs.length; i++) {
			if (divs[i].className == "powered") {
				document.body.removeChild(divs[i]);
				existed = true;
				/**
				 * @j2sNative
				 * if (window["swt.notification.corner.float"] == null) {
				 * 	window["swt.notification.corner.float"] = true;
				 * }
				 */ {}
				break;
			}
		}
		if (!existed && tray == null) {
			return;
		}
		if (existed) {
			defaultNotificationCorner = this;
		}
		
		if (tray == null) {
			/**
			 * @j2sNative
			 * this.tray = new Object ();
			 */ {}
			tray = Display.getDefault().getSystemTray();
		} 
		if (alreadyInitialized) {
			handle.style.display = "block";
			document.body.removeChild(minimizedEl);
			document.body.removeChild(handle);
			document.body.appendChild(minimizedEl);
			document.body.appendChild(handle);
			return;
		}
		alreadyInitialized = true;
		
		minimizedEl = document.createElement("DIV");
		minimizedEl.className = "tray-cell tray-minimized";
		minimizedEl.title = "Doubleclick to set notification area always-visible";
		minimizedEl.style.display = "none";
		String lineColor = Tray.trayLineColor(3);
		minimizedEl.style.borderColor = lineColor + " transparent transparent transparent";
		if (OS.isIENeedPNGFix) { // IE < 6.0
			minimizedEl.style.borderRightColor = "rgb(0,255,0)";
			minimizedEl.style.filter = "Chroma(Color=#00ff00);";
		}
		//display.trayCorner.bindEvents(minimizedEl);
		document.body.appendChild(minimizedEl);
		
		handle = document.createElement("DIV");
		handle.className = "tray-logo-item";
		handle.title = "Powered by Java2Script";
		boolean needFixing = OS.isFirefox;
		/**
		 * @j2sNative
		 * needFixing &= (navigator.userAgent.indexOf ("Firefox/2.0") != -1);
		 */ {}
		if (needFixing) {
			handle.style.backgroundColor = "white";
		}
		document.body.appendChild(handle);
		handle.onclick = new RunnableCompatibility() {
			public void run() {
				if (display != null && !display.isDisposed()) {
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
						bringToTop(zIndex);
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
		//if (tray.allCells != null) {
			for (int i = 0; i < tray.allCells.length; i++) {
				Element cell = tray.allCells[i];
				if (cell != null) {
					bindEvents(cell);
				}
			}
		//}
		bindEvents(minimizedEl);
	}

	public void bindEvents(Element cell) {
		cell.onclick = mouseClick;
		cell.onmouseover = mouseOver;
		cell.ondblclick = mouseDoubleClick;
	}
	
	public void handleApproaching() {
		if (handle == null) {
			return;
		}
		String zIndex = Display.getNextZIndex(false);
		if ("" + handle.style.zIndex != zIndex) {
			layerZIndex = "" + handle.style.zIndex;
			if (!isAutoHide) {
				setMinimized(false);
			}
			bringToTop(zIndex);
		}
	}

	public void handleLeaving() {
		if (handle == null) {
			return;
		}
		if (layerZIndex != null) {
			bringToTop(layerZIndex);
			layerZIndex = null;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}

	public boolean isApproaching(long now, int x, int y, boolean ctrlKey) {
		mouseAlreadyMoved = true;
		return !ctrlKey && isAround(x, y);
	}

	public boolean isLeaving(long now, int x, int y, boolean ctrlKey) {
		mouseAlreadyMoved = true;
		if (now - lastUpdated <= Display.AUTO_HIDE_DELAY) return false;
		return !isAroundCorner(x, y);
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
		Tray tray = Display.getTray();
		if (tray != null) {
			range = getRange() + 16;
		}
		if (x < range && y < range && x + y < range) {
			return true;
		}
		return false;
	}

	public boolean handleMouseMove(long now, int x, int y, boolean ctrlKey) {
		if (this.isApproaching(now, x, y, ctrlKey)) {
			this.handleApproaching();
			return true;
		} else if (this.isLeaving(now, x, y, ctrlKey)) {
			this.handleLeaving();
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
		if (tray.supportShadow && tray.outerShadows != null) {
			for (int i = 0; i < tray.outerShadows.length; i++) {
				Element item = tray.outerShadows[i];
				if (item != null) {
					item.style.zIndex = zIdx;
				}
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
		if (tray.supportShadow) {
			for (int i = 0; i < tray.outerShadows.length; i++) {
				Element cell = tray.outerShadows[i];
				if (minimized) {
					cell.style.left = (- i * 36 - 21) + "px";
				} else {
					cell.style.left = ((tray.cellLines - i - 1) * 36 - 1) + "px";
				}
			}
		}

		handle.style.display = minimized ? "none" : "block";
		return true;
	}

	int getRange() {
		return tray.cellLines * 36;
	}

	public void bringToTop(String zIdx) {
		Tray tray = Display.getTray();
		if (tray == null) {
			return;
		}
		String zIndex = "";
		if (zIdx == null) {
			zIndex = Display.getNextZIndex(true);
			if (Display.getTopMaximizedShell() == null) {
				layerZIndex = zIndex;
			}
		} else {
			zIndex = zIdx;
		}
		setZIndex(zIndex);
	}

	public void updateLayout() {
		
	}

	public void releaseWidget() {
		tray = null;

		if (defaultNotificationCorner != null) {
			return;
		}
		
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
