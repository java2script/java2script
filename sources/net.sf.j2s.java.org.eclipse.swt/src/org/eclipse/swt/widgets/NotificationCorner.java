package org.eclipse.swt.widgets;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

public class NotificationCorner extends DesktopItem {

	static NotificationCorner defaultNotificationCorner = null;
	
	Tray tray;

	private Object mouseClick;
	private Object mouseOver;
	private Object mouseDoubleClick;
	private Object hLogoClick;
	
	private Element minimizedEl;
	
	private boolean alreadyInitialized;

	private int currentZIndex;
	
	public NotificationCorner(Display display) {
		super();
		this.display = display;
		this.isAutoHide = false;
		alreadyInitialized = false;
	}

	public void initialize() {
		boolean existed = false;
		Element[] containers = new Element[2];
		containers[0] = document.body;
		containers[1] = document.getElementById("swt-desktop-panel");
		for (int k = 0; k < containers.length; k++) {
			Element container = containers[k];
			if (containers[k] == null) {
				continue;
			}
			Element[] divs = container.childNodes;
			for (int i = 0; i < divs.length; i++) {
				if (divs[i].className == "powered") {
					OS.destroyHandle(divs[i]);
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
			if (existed) {
				break;
			}
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
		hLogoClick = new RunnableCompatibility() {
			public void run() {
				if (display != null && !display.isDisposed()) {
					if (display.trayCorner != null) {
						display.trayCorner.bringToTop(-1);
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
				openAbout();
			}
		};
		Clazz.addEvent(handle, "click", hLogoClick);

		if (mouseOver == null) {
			mouseOver = new RunnableCompatibility() {
				
				public void run() {
					if (isAutoHide) {
						setMinimized(false);
					}
					int zIndex = window.currentTopZIndex + 1;
					if (handle.style.zIndex != zIndex) {
						layerZIndex = handle.style.zIndex;
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
					bringToTop(-1);
				}
			
			};
		}
		
		if (mouseDoubleClick == null) {
			mouseDoubleClick = new RunnableCompatibility() {
			
				public void run() {
					toggleAutoHide();
				}
			
			};
		}
		if (handle != null) {
			Clazz.addEvent(handle, "mouseover", mouseOver);
		}

		updateEvents();
		
		bringToTop(window.currentTopZIndex);
	}

	/**
	 * @j2sNative
	 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.About", (function () { return function () {
	 * 	$wt.widgets.About.openAbout (null);
	 * }; }) ());
	 */
	static void openAbout() {
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

	private void unbindAllEvents() {
		if (tray != null && tray.allCells != null) {
			for (int i = 0; i < tray.allCells.length; i++) {
				Element cell = tray.allCells[i];
				if (cell != null) {
					unbindEvents(cell);
				}
			}
		}
		if (minimizedEl != null) {
			unbindEvents(minimizedEl);
		}
	}

	public void bindEvents(Element cell) {
		if (mouseClick != null) {
			Clazz.addEvent(cell, "click", mouseClick);
		}
		if (mouseOver != null) {
			Clazz.addEvent(cell, "mouseover", mouseOver);
		}
		if (mouseDoubleClick != null) {
			Clazz.addEvent(cell, "dblclick", mouseDoubleClick);
		}
	}
	
	void unbindEvents(Element cell) {
		if (cell == null) {
			return;
		}
		Clazz.removeEvent(cell, "click", mouseClick);
		Clazz.removeEvent(cell, "mouseover", mouseOver);
		Clazz.removeEvent(cell, "dblclick", mouseDoubleClick);
	}
	

	public void handleApproaching() {
		if (handle == null) {
			return;
		}
		int zIndex = window.currentTopZIndex + 1;
		if (handle.style.zIndex != zIndex) {
			layerZIndex = handle.style.zIndex;
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
		if (layerZIndex != -1) {
			bringToTop(layerZIndex);
			layerZIndex = -1;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}

	public boolean isApproaching(long now, int x, int y, boolean ctrlKey) {
		return !ctrlKey && isAround(x, y);
	}

	public boolean isLeaving(long now, int x, int y, boolean ctrlKey) {
		return !isAroundCorner(x, y);
	}
	boolean isAround(int x, int y) {
		int range = 32;
		if (x + y < range) {
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
		if (x + y < range) {
			return true;
		}
		return false;
	}

	void setZIndex(int zIdx) {
		if (currentZIndex == zIdx) {
			return;
		}
		currentZIndex = zIdx;
		if (zIdx == -1 && !OS.isIE)
		/**
		 * @j2sNative
		 * zIdx = "";
		 */{ }
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
			Element cell = tray.allCells[i];
			if (cell != null) {
				cell.style.display = minimized ? "none" : "block";
			}
		}
		for (int i = 0; i < tray.allFloats.length; i++) {
			Element divFloat = tray.allFloats[i];
			if (divFloat != null) {
				divFloat.style.display = minimized ? "none" : "block";
			}
		}
		for (int i = 0; i < tray.allItems.length; i++) {
			Element item = tray.allItems[i];
			if (item != null) {
				item.style.display = minimized ? "none" : "block";
			}
		}
		if (tray.supportShadow) {
			for (int i = 0; i < tray.outerShadows.length; i++) {
				Element cell = tray.outerShadows[i];
				if (cell != null) {
					if (minimized) {
						cell.style.left = (- i * 36 - 21) + "px";
					} else {
						cell.style.left = ((tray.cellLines - i - 1) * 36 - 1) + "px";
					}
				}
			}
		}

		handle.style.display = minimized ? "none" : "block";
		return true;
	}

	int getRange() {
		return tray.cellLines * 36;
	}

	public void bringToTop(int zIdx) {
		//Tray tray = Display.getTray();
		if (tray == null) {
			return;
		}
		int zIndex = -1;
		if (zIdx == -1) {
			window.currentTopZIndex++;
			zIndex = window.currentTopZIndex;
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
		
		unbindAllEvents();
		if (minimizedEl != null) {
			OS.destroyHandle(minimizedEl);
			minimizedEl = null;
		}
		if (handle != null) {
			if (hLogoClick != null) {
				Clazz.removeEvent(handle, "click", hLogoClick);
				hLogoClick = null;
			}
			Clazz.removeEvent(handle, "mouseover", mouseOver);
			
			OS.destroyHandle(handle);
			handle = null;
		}
		
		mouseOver = null;
		mouseClick = null;
		mouseDoubleClick = null;
	}

	void toggleAutoHide() {
		isAutoHide = !isAutoHide;
		minimizedEl.title = isAutoHide ? "Doubleclick to set notification area always-visible"
				: "Doubleclick to set notification area auto-hide";
		setMinimized(isAutoHide);
		if (isJustUpdated) {
			return;
		}
		bringToTop(-1);
	}

}
