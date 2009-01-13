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

import java.util.Date;

import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
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
public class QuickLaunch extends DesktopItem implements DesktopListener {

	static QuickLaunch defaultQuickLaunch = null;
	
	private int shortcutCount = 0;
	private Element[] shortcutItems = new Element[0];
	private boolean alreadyInitialized = false;

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
		this.handle = document.createElement ("DIV");
		this.handle.className = "shortcut-bar";
		document.body.appendChild (this.handle);
		this.handle.onmouseover = new RunnableCompatibility() {
		
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
		this.handle.onclick = new RunnableCompatibility(){
		
			public void run() {
				if (setMinimized(false)) {
					isJustUpdated = true;
					window.setTimeout (new RunnableCompatibility() {
					
						public void run() {
							isJustUpdated = false;
						}
					
					}, 500);
				}
				bringToTop (null);
			}
		
		};
		this.handle.title = "Doubleclick to hide shortcuts";
		this.handle.ondblclick = new RunnableCompatibility(){
		
			public void run() {
				isAutoHide = !isAutoHide;
				handle.title = isAutoHide ? "Doubleclick to set quicklaunch always-visible"
						: "Doubleclick to set quicklaunch auto-hide";
				setMinimized(isAutoHide);
				if (isJustUpdated) {
					return;
				}
				bringToTop (null);
			}
		
		};
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.shell.shadow"];
		 */ {}
		if (supportShadow) {
			Decorations.createShadowHandles(handle);
		}

		Element[] childNodes = document.body.childNodes;
		Element[] children = new Element[childNodes.length];
		for (int i = 0; i < childNodes.length; i++) {
			children[i] = childNodes[i];
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
					&& child.className.indexOf ("alaa") != -1
					&& child.className.indexOf ("ignored") == -1) {
				existed = true;
				Object js = child.href;
				if (js == "#") {
					js = child.onclick;
				}
				/*if (typeof js == "string") {
					if (js.indexOf ("javascript:") == 0) {
						js = js.substring (11);
					}
					js = decodeURIComponent(js);
				}
				var fun = null;
				eval ("fun = function () {" + js + "};");
				*/
				String icon = null;
				for (int j = 0; j < child.childNodes.length; j++) {
					Element item = child.childNodes[j];
					if (item != null && item.className != null
							&& item.className.indexOf ("alaa-icon") != -1) {
						icon = item.style.backgroundImage;
						if (icon != null) {
							if (icon.indexOf ("url(") == 0) {
								icon = icon.substring (4, icon.length() - 1);
							}
							char ch = icon.charAt (0);
							if (ch == '\'' || ch == '\"') {
								icon = icon.substring (1, icon.length() - 1);
							}
						}
						break;
					}
				}
				this.addShortcut (child.text != null ? child.text : child.innerText, icon, js);
				child.parentNode.removeChild (child);
			}
		}
		if (existed) {
			defaultQuickLaunch = this;
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
			Element itemDiv = this.shortcutItems[i];
			itemDiv.style.display = visible ? "" : "none";
		}
	}
	public void bringToTop(String zIdx) {
		if (this.shortcutCount <= 0) {
			return;
		}
		String zIndex = "";
		if (zIdx == null) {
			zIndex = Display.getNextZIndex(true);
			if (Display.getTopMaximizedShell () == null) {
				this.layerZIndex = zIndex;
			}
		} else {
			zIndex = zIdx;
		}
		this.handle.style.zIndex = zIndex;
		for (int i = 0; i < this.shortcutCount; i++) {
			Element itemDiv = this.shortcutItems[i];
			itemDiv.style.zIndex = zIndex;
		}
	}
	public void updateLayout() {
		if (this.shortcutCount <= 0) {
			return;
		}
		int barWidth = 20 + this.shortcutCount * 60;
		int barOffset = (OS.getFixedBodyClientWidth () - barWidth) / 2;
		if (this.handle != null) {
			this.handle.style.left = barOffset + 10 + "px";
			this.handle.style.width = barWidth + "px";
		}
		for (int i = 0; i < this.shortcutCount; i++) {
			Element itemDiv = this.shortcutItems[i];
			itemDiv.style.left = (barOffset + 20 + 10 + i * 60) + "px";
		}
	}
	public Element addShortcut(String name, String icon, Object clickFun) {
		/**
		 * @j2sNative
		if (window["swt.shortcut.bar"] == false) {
			return false;
		}
		 */ {}
		if (this.handle == null) {
			this.initialize ();
		}
		String tag = "A";
		/*if (!O$.isIENeedPNGFix) {
			tag = "DIV";
		}*/
		Element itemDiv = document.createElement (tag);
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
			/**
			 * @j2sNative
			if (typeof clickFun == "string") {
				itemDiv.href = clickFun;
			} else {
				itemDiv.href = "#";
				itemDiv.onclick = (function (f) {
						return function () {
							f();
							return false;
						};
				})(clickFun);
			}
			 */ {}
		} else {
			if (icon != null && icon.length() != 0) {
				itemDiv.style.backgroundImage = "url('" + icon + "')";
			}
			/**
			 * @j2sNative
			if (typeof clickFun == "string") {
				itemDiv.href = clickFun;
			} else {
				itemDiv.onclick = clickFun;
			}
			 */ {}
		}
		itemDiv.title = name;
		document.body.appendChild (itemDiv);
		itemDiv.onmouseover = this.handle.onmouseover;
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.shell.shadow"];
		 */ {}
		if (supportShadow && !OS.isIE) {
			Decorations.createShadowHandles(itemDiv);
		}

		this.shortcutItems[this.shortcutCount] = itemDiv;
		this.shortcutCount++;
		this.bringToTop (null);
		this.updateLayout ();
		setMinimized(false);
		updateLastModified();
		return itemDiv;
	}
	public void markActiveItem (Element item) {
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
		int height = document.body.clientWidth;
		int offset = Math.round ((height - barWidth) / 2);
		int x1 = offset - 72;
		int x2 = offset + barWidth + 72;
		return (x >= x1 && x <= x2);
	}
	
	public boolean isApproaching(HTMLEvent e) {
		mouseAlreadyMoved = true;
		return (!e.ctrlKey && e.clientY >= OS.getFixedBodyClientHeight () - 8
				&& isAround(e.clientX, e.clientY));
	}

	public boolean isLeaving(HTMLEvent e) {
		mouseAlreadyMoved = true;
		long now = new Date().getTime();
		if (now - lastUpdated <= Display.AUTO_HIDE_DELAY) return false;
		return (e.clientY <= OS.getFixedBodyClientHeight () - 70
				|| !isAround (e.clientX, e.clientY));
	}

	public void handleApproaching() {
		String zIndex = Display.getNextZIndex(false);
		if ("" + handle.style.zIndex != zIndex) {
			layerZIndex = "" + handle.style.zIndex;
			bringToTop (zIndex);
		}
	}

	public void handleLeaving() {
		if (layerZIndex != null) {
			bringToTop (layerZIndex);
			layerZIndex = null;
		}
		if (isAutoHide) {
			setMinimized(true);
		}
	}

	public void releaseWidget() {
		if (defaultQuickLaunch != null) {
			return;
		}
		if (handle != null) {
			OS.destroyHandle(handle);
			handle = null;
		}
		if (shortcutItems != null) {
			for (int i = 0; i < shortcutItems.length; i++) {
				Element item = shortcutItems[i];
				if (item != null) {
					OS.destroyHandle(item);
				}
			}
			shortcutItems = null;
			shortcutCount = 0;
		}
	}

}
