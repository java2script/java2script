/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package org.eclipse.swt.widgets;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

/**
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Sep 16, 2008
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.QuickLaunch");
 */
public class QuickLaunch extends DesktopItem {

	static QuickLaunch defaultQuickLaunch = null;
	
	int shortcutCount = 0;
	private Element[] shortcutItems = new Element[0];
	private boolean alreadyInitialized = false;

	private Object hLaunchMouseEnter;

	private Object hLaunchClick;

	private Object hLaunchToggle;

	public QuickLaunch(Display display) {
		super();
		this.display = display;
		this.isAutoHide = false;
	}
	public void initialize() {
		if (alreadyInitialized) {
			return;
		}
		alreadyInitialized = true;
		if (Display.bodyOverflow == null) {
			Element body = document.body;
			Display.bodyOverflow = body.style.overflow;
			Display.bodyHeight = body.style.height;
			Display.htmlOverflow = body.parentNode.style.overflow;
			Display.bodyScrollLeft = body.scrollLeft;
			Display.bodyScrollTop = body.scrollTop;
			Display.htmlScrollLeft = body.parentNode.scrollLeft;
			Display.htmlScrollTop = body.parentNode.scrollTop;
			body.parentNode.scrollLeft = 0;
			body.parentNode.scrollTop = 0;
			body.scrollLeft = 0;
			body.scrollTop = 0;
			if (body.style.overflow != "hidden") {
				body.style.overflow = "hidden";
			}
			if (body.style.height != "100%") {
				body.style.height = "100%";
			}
			if (body.parentNode.style.overflow != "hidden") {
				body.parentNode.style.overflow = "hidden";
			}
		}
		this.handle = document.createElement("DIV");
		this.handle.className = "shortcut-bar";
		document.body.appendChild(this.handle);
		hLaunchMouseEnter = new RunnableCompatibility() {
		
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
		Clazz.addEvent(handle, "mouseover", hLaunchMouseEnter);
		hLaunchClick = new RunnableCompatibility(){
		
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
		Clazz.addEvent(handle, "click", hLaunchClick);
		
		this.handle.title = "Doubleclick to hide shortcuts";
		hLaunchToggle = new RunnableCompatibility(){
		
			public void run() {
				toggleAutoHide();
			}
		
		};
		Clazz.addEvent(handle, "dblclick", hLaunchToggle);
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.disable.shadow"] != true;
		 */ {}
		if (supportShadow) {
			//Decorations.createShadowHandles(handle);
			Decorations.appendShadowHandles(handle, true, true, false, true);
		}

		Element[] childNodes = document.body.childNodes;
		Element[] children = new Element[childNodes.length];
		for (int i = 0; i < childNodes.length; i++) {
			children[i] = childNodes[i];
		}
		Element panel = document.getElementById("swt-desktop-panel");
		if (panel != null) {
			int offset = children.length;
			childNodes = panel.childNodes;
			for (int i = 0; i < childNodes.length; i++) {
				children[offset + i] = childNodes[i];
			}
		}
		Element qlContainer = document.getElementById("quick-launch");
		if (qlContainer != null) {
			childNodes = qlContainer.childNodes;
			int length = children.length;
			//children = new Element[childNodes.length];
			for (int i = 0; i < childNodes.length; i++) {
				children[i + length] = childNodes[i];
			}
		}
		boolean existed = false;
		for (int i = 0; i < children.length; i++) {
			Element child = children[i];
			if (child.nodeName == "A" && child.className != null
					&& child.className.indexOf("alaa") != -1
					&& child.className.indexOf("ignored") == -1) {
				existed = true;
				String icon = null;
				for (int j = 0; j < child.childNodes.length; j++) {
					Element item = child.childNodes[j];
					if (item != null && item.className != null
							&& item.className.indexOf("alaa-icon") != -1) {
						icon = item.style.backgroundImage;
						if (icon != null) {
							if (icon.indexOf("url(") == 0) {
								icon = icon.substring(4, icon.length() - 1);
							}
							char ch = icon.charAt(0);
							if (ch == '\'' || ch == '\"') {
								icon = icon.substring(1, icon.length() - 1);
							}
						}
						break;
					}
				}
				Element shortcut = this.addShortcut(child.text != null ? child.text : child.innerText, icon, child.href);
				String id = child.id;
				OS.destroyHandle(child);
				if (id != null && id.length() > 0) {
					shortcut.id = id;
				}
			}
		}
		if (existed) {
			defaultQuickLaunch = this;
		} else {
			handle.style.display = "none";
		}
	}

	/**
	 * @param minimized
	 * @return whether taskbar is updated or not
	 */
	public boolean setMinimized(boolean minimized) {
		boolean alreadyMinimized = handle.className.indexOf("minimized") != -1;
		if (alreadyMinimized == minimized)
			return false;
		handle.className = "shortcut-bar" + (minimized ? "-minimized" : "");
		setShortcutsVisible(!minimized);
		return true;
	}

	public void setShortcutsVisible(boolean visible) {
		if (this.shortcutCount <= 0) {
			return;
		}
		for (int i = 0; i < this.shortcutCount; i++) {
			shortcutItems[i].style.display = visible ? "" : "none";
		}
	}
	public void bringToTop(int zIdx) {
		if (this.shortcutCount <= 0) {
			return;
		}
		int zIndex = -1;
		if (zIdx == -1) {
			window.currentTopZIndex++;
			zIndex = window.currentTopZIndex;
			if (Display.getTopMaximizedShell() == null) {
				this.layerZIndex = zIndex;
			}
		} else {
			zIndex = zIdx;
		}
		if (zIndex == -1 && !OS.isIE)
		/**
		 * @j2sNative
		 * zIndex = "";
		 */{ }
		this.handle.style.zIndex = zIndex;
		for (int i = 0; i < this.shortcutCount; i++) {
			shortcutItems[i].style.zIndex = zIndex;
		}
	}
	public void updateLayout() {
		if (this.shortcutCount <= 0) {
			return;
		}
		int barWidth = 20 + this.shortcutCount * 60;
		int barOffset = (OS.getFixedBodyClientWidth() - barWidth) / 2;
		if (this.handle != null) {
			this.handle.style.left = barOffset + 10 + "px";
			this.handle.style.width = barWidth + "px";
		}
		for (int i = 0; i < this.shortcutCount; i++) {
			shortcutItems[i].style.left = (barOffset + 20 + 10 + i * 60) + "px";
		}
	}
	public Element addShortcut(String name, String icon, String href) {
		/**
		 * @j2sNative
		if (window["swt.shortcut.bar"] == false) {
			return false;
		}
		 */ {}
		if (this.handle == null) {
			this.initialize();
		}
		String tag = "A";
		/*if (!O$.isIENeedPNGFix) {
			tag = "DIV";
		}*/
		Element itemDiv = document.createElement(tag);
		itemDiv.className = "shortcut-item";
		if (OS.isIENeedPNGFix) {
			if (icon != null && icon.length() != 0) {
				// The following is commented out intentionally.
				// Using filter may result in black blocks 
//				if (icon.toLowerCase().endsWith(".png")) {
//					itemDiv.style.backgroundImage = "url(\"about:blank\")";
//					itemDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + icon + "\", sizingMethod=\"image\")";
//				} else {
					itemDiv.style.backgroundImage = "url('" + icon + "')";
//				}
			}
			itemDiv.href = href;
		} else {
			if (icon != null && icon.length() != 0) {
				itemDiv.style.backgroundImage = "url('" + icon + "')";
			}
			itemDiv.href = href;
		}
		itemDiv.title = name;
		document.body.appendChild(itemDiv);
		Clazz.addEvent(itemDiv, "mouseover", hLaunchMouseEnter);
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.disable.shadow"] != true;
		 */ {}
		if (supportShadow) {
			Decorations.createNarrowShadowHandles(itemDiv);
		}

		this.shortcutItems[this.shortcutCount] = itemDiv;
		this.shortcutCount++;
		this.bringToTop(-1);
		this.updateLayout();
		setMinimized(false);
		updateLastModified();
		return itemDiv;
	}
	public void markActiveItem(Element item) {
		if (this.shortcutCount <= 0 || item == null) {
			return;
		}
		for (int i = 0; i < this.shortcutCount; i++) {
			Element itemDiv = this.shortcutItems[i];
			if (item == itemDiv) {
				OS.addCSSClass(itemDiv, "shortcut-active-item");
			} else {
				OS.removeCSSClass(itemDiv, "shortcut-active-item");
			}
		}
	};
	
	boolean isAround(int x, int y) {
		int barWidth = 20 + this.shortcutCount * 60;
		int width = OS.getFixedBodyClientWidth(); //document.body.clientWidth;
		int offset = Math.round((width - barWidth) / 2);
		int x1 = offset - 72;
		int x2 = offset + barWidth + 72;
		return (x >= x1 && x <= x2);
	}
	
	public boolean isApproaching(long now, int x, int y, boolean ctrlKey) {
		return (!ctrlKey && y >= OS.getFixedBodyClientHeight() - 8
				&& isAround(x, y));
	}

	public boolean isLeaving(long now, int x, int y, boolean ctrlKey) {
		return (y <= OS.getFixedBodyClientHeight() - 70 || !isAround(x, y));
	}

	public void handleApproaching() {
		int zIndex = window.currentTopZIndex + 1;
		if (handle.style.zIndex != zIndex) {
			layerZIndex = handle.style.zIndex;
			bringToTop(zIndex);
		}
	}

	public void handleLeaving() {
		if (layerZIndex != -1) {
			bringToTop(layerZIndex);
			layerZIndex = -1;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}
	
	public void releaseWidget() {
		if (defaultQuickLaunch != null) {
			return;
		}
		if (shortcutItems != null) {
			for (int i = 0; i < shortcutItems.length; i++) {
				Element item = shortcutItems[i];
				if (item != null) {
					Clazz.removeEvent(item, "mouseover", hLaunchMouseEnter);
					OS.destroyHandle(item);
				}
			}
			shortcutItems = null;
			shortcutCount = 0;
		}
		if (handle != null) {
			if (hLaunchToggle != null) {
				Clazz.removeEvent(handle, "dblclick", hLaunchToggle);
				hLaunchToggle = null;
			}
			if (hLaunchClick != null) {
				Clazz.removeEvent(handle, "click", hLaunchClick);
				hLaunchClick = null;
			}
			if (hLaunchMouseEnter != null) {
				Clazz.removeEvent(handle, "mouseover", hLaunchMouseEnter);
				hLaunchMouseEnter = null;
			}
			OS.destroyHandle(handle);
			handle = null;
		}
	}
	void toggleAutoHide() {
		isAutoHide = !isAutoHide;
		handle.title = isAutoHide ? "Doubleclick to set quicklaunch always-visible"
				: "Doubleclick to set quicklaunch auto-hide";
		setMinimized(isAutoHide);
		if (isJustUpdated) {
			return;
		}
		bringToTop(-1);
	}

}
