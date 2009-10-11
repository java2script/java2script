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

import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Sep 17, 2008
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.MaximizedTitle");
 */
public class MaximizedTitle extends DesktopItem {
	private Shell lastMaximizedShell = null;
	private Element topbarEl = null;
	private Object hMaxClick;

	public MaximizedTitle(Display display) {
		super();
		this.display = display;
	}
	
	public void updateLayout() {
		Shell lastShell = Display.getTopMaximizedShell();
		if (lastShell == null || lastShell.titleBar == null) return;
		this.lastMaximizedShell = lastShell;
		
		// move the title bar elements into topbarEl
		Element[] els = new Element[0];
		for (int i = 0; i < lastShell.titleBar.childNodes.length; i++) {
			els[i] = lastShell.titleBar.childNodes[i];
		}
		for (int i = 0; i < els.length; i++) {
			lastShell.titleBar.removeChild(els[i]);
			this.topbarEl.appendChild(els[i]);
		}

		// update topbar
		this.handle.style.left = Math.round((OS.getFixedBodyClientWidth()/*document.body.clientWidth*/ - 320) / 2) + "px";
		this.topbarEl.style.width = "316px";
		if (OS.isIE) {
			this.topbarEl.style.left = "1px";
		} else {
			this.topbarEl.style.left = "2px";
		}
		this.topbarEl.style.top = "1px";
		hMaxClick = lastShell.hMaxClick;
		if (hMaxClick != null) {
			Clazz.addEvent(handle, "dblclick", hMaxClick);
		}
		lastShell.updateShellTitle(320 + 4);
	}
	public void returnTopMaximized(Shell shell) {
		Shell lastShell = this.lastMaximizedShell;
		if (shell != null && lastShell != shell) return;
		if (lastShell == null || lastShell.titleBar == null) return;
		
		// move the title bar elements back to Shell's title bar
		Element[] els = new Element[0];
		for (int i = 0; i < this.topbarEl.childNodes.length; i++) {
			els[i] = this.topbarEl.childNodes[i];
		}
		for (int i = 0; i < els.length; i++) {
			lastShell.titleBar.appendChild(els[i]);
		}
		if (shell != null) {
			this.handle.style.display = "none";
		}
	}
	public void initialize() {
		if (this.handle != null) return;

		Element tbc = document.createElement("DIV");
		tbc.className = "shell-manager-topbar-container";
		document.body.appendChild(tbc);
		tbc.style.lineHeight = "16px"; // or "1", reset CSS
		tbc.style.display = "none";
		this.handle = tbc;
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.disable.shadow"] != true;
		 */ {}
		if (supportShadow) {
			//Decorations.createShadowHandles(handle);
			Decorations.appendShadowHandles(handle, false, true, true, true);
		}

		Element tb = document.createElement("DIV");
		tb.className = "shell-title-bar shell-maximized";
		this.handle.appendChild(tb);
		this.topbarEl = tb;
	}

	boolean isAround(long now, int x, int y) {
		if (now - this.lastUpdated < 1000) {
			return true;
		}
		int barWidth = 320;
		int width = OS.getFixedBodyClientWidth(); //document.body.clientWidth;
		int offset = Math.round((width - barWidth) / 2);
		int x1 = offset - 72;
		int x2 = offset + barWidth + 72;
		return (x >= x1 && x <= x2);
	};

	void hide() {
		CSSStyle smStyle = this.handle.style;
		if (smStyle.display == "block") {
			smStyle.display = "none";
		}
	}

	public void handleApproaching() {
		Element topbar = handle;
		if (topbar == null) return;
		if (topbar.style.display != "block") {
			Shell lastShell = Display.getTopMaximizedShell();
			if (lastShell != null && lastShell.titleBar != null) {
				topbar.style.display = "block";
				updateLayout();
			}
		}
	}
	
	public void handleLeaving() {
		Element topbar = handle;
		if (topbar == null) return;
		if (topbar.style.display != "none") {
			topbar.style.display = "none";
			returnTopMaximized(null);
		}
	}

	public boolean isApproaching(long now, int x, int y, boolean ctrlKey) {
		return (y <= 8 && !ctrlKey) && isAround(now, x, y);
	}

	public boolean isLeaving(long now, int x, int y, boolean ctrlKey) {
		Shell topShell = Display.getTopMaximizedShell();
		if (topShell == null) return false;
		return !isAround(now, x, y) || ctrlKey
				|| y > 12 + ((topShell.titleBar != null) ?
						OS.getContainerHeight(topShell.titleBar) : 20);
	}

	public void bringToTop(int index) {
		
	}

	public boolean isVisible() {
		return handle.style.display != "none";
	}

	public void releaseWidget() {
		if (handle != null) {
			if (hMaxClick != null) {
				Clazz.removeEvent(handle, "dblclick", hMaxClick);
				hMaxClick = null;
			}
			OS.destroyHandle(handle);
			handle = null;
		}
		if (topbarEl != null) {
			OS.destroyHandle(topbarEl);
			topbarEl = null;
		}
	}
	
}
