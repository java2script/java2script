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

import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.internal.ResizeSystem;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
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
 * $WTC$$.registerCSS ("$wt.widgets.TaskBar");
 */
public class TaskBar extends DesktopItem {

	static class TaskItem {
		public Shell shell;
		public String text;
		public Element itemHandle;
		public Element textHandle;
		public Element iconHandle;
		public Object hShellItemClick;
		public Object hTextSelection;

		public TaskItem(Shell shell, String text, Element itemHandle,
				Element textHandle, Element iconHandle,
				Object itemClick, Object textSelection) {
			super();
			this.shell = shell;
			this.text = text;
			this.itemHandle = itemHandle;
			this.textHandle = textHandle;
			this.iconHandle = iconHandle;
			this.hShellItemClick = itemClick;
			this.hTextSelection = textSelection;
		}

		public void releaseFromBar(TaskBar bar) {
			shell = null;
			if (hShellItemClick != null) {
				Clazz.removeEvent(itemHandle, "click", hShellItemClick);
				hShellItemClick = null;
			}
			if (hTextSelection != null) {
				Clazz.removeEvent(textHandle, "selectstart", hTextSelection);
				hTextSelection = null;
			}
			if (bar.hBarMouesEnter != null) {
				Clazz.removeEvent(itemHandle, "mouseover", bar.hBarMouesEnter);
			}
			if (textHandle != null) {
				OS.destroyHandle(textHandle);
				textHandle = null;
			}
			if (iconHandle != null) {
				OS.destroyHandle(iconHandle);
				iconHandle = null;
			}
			if (itemHandle != null) {
				OS.destroyHandle(itemHandle);
				itemHandle = null;
			}
		}
	}

	Element barEl = null;
	TaskItem[] items = new TaskItem[0];
	private Object hBarToggle;
	private Object hBarClick;
	private Object hBarMouesEnter;
//	private Object hNoReturn;

	public TaskBar(Display display) {
		super();
		this.display = display;
	}

	public void setTasksVisible(boolean visible) {
		if (this.items.length <= 0) {
			return;
		}
		for (int i = 0; i < this.items.length; i++) {
			Element itemDiv = this.items[i].itemHandle;
			itemDiv.style.display = visible ? "" : "none";
		}
	}

	public void bringToTop(int zIdx) {
		if (this.items.length <= 0) {
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
	}

	public void updateLayout() {
		this.updateItems();
	}

	public void createShellItem(final Shell shell) {
		for (int i = 0; i < this.items.length; i++) {
			TaskItem item = this.items[i];
			if (item != null && item.shell == shell) {
				return; // existed already
			}
		}
		if (Dialog.isDialog(shell)) {
			return;
		}
		if (this.handle == null) {
			this.initialize();
		}
		String text = null;
		/**
		 * @j2sNative
		 * if (window["swt.task.bar"] == false) {
		 * 	return;
		 * }
		 * if (typeof shell == "string") {
		 * 	text = shell;
		 * 	shell = null;
		 * } else {
		 * 	text = shell.getText ();
		 * }
		 */ { }
		if (text == null) {
			text = "Java2Script";
		}
		String tag = "A";
		if (!OS.isIENeedPNGFix) {
			tag = "DIV";
		}
		Element si = document.createElement(tag);
		si.className = "shell-item";
		if (tag == "A") {
			si.href = "#";
		}
		si.title = text;
//		hNoReturn = new RunnableCompatibility() {
//
//			public void run() {
//				toReturn(false);
//			}
//
//		};
//		Clazz.addEvent(si, "click", hNoReturn);
		
		if (barEl.style.display == "none") {
			barEl.style.display = "";
		}
		if (barEl.className.indexOf("minimized") != -1) {
			si.style.display = "none";
		}
		Clazz.addEvent(si, "mouseover", hBarMouesEnter);
		
		this.handle.appendChild(si);
		Element icon = document.createElement("DIV");
		icon.className = "shell-item-icon";
		si.appendChild(icon);
		Element div = document.createElement("DIV");
		div.className = "shell-item-text";
		
		Object hNoTextSelection = OS.setTextSelection(div, false);
		si.appendChild(div);
		div.appendChild(document.createTextNode(text));
		int w = OS.getStringStyledWidth(text, "shell-item-text", "") + 8;
		if (w > 120) {
			w = 120;
		}
		div.style.width = w + "px";
		si.style.width = (w + 48) + "px";
		if (OS.isIE80) {
			div.style.top = "1em";
			div.style.left = "20px";
		}
		Object hShellItemClick = null;
		if (shell != null) {
			hShellItemClick = new RunnableCompatibility() {

				public void run() {
					if (shell.getMinimized()) {
						shell.setMinimized(false);
						shell.bringToTop();
					} else {
						Shell lastShell = Display.getTopShell();
						if (shell == lastShell) {
							ResizeSystem.unregister(shell, 128);
							shell.setMinimized(true);
							if (display.topBar != null) {
								display.topBar.returnTopMaximized(shell);
							}
						} else {
							shell.bringToTop();
						}
					}
					updateItems();
					toReturn(false);
				}

			};
			Clazz.addEvent(si, "click", hShellItemClick);
		}
		this.items[this.items.length] = new TaskItem(shell, text, si, div, icon, hShellItemClick, hNoTextSelection);
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.disable.shadow"] != true;
		 */ {}
		if (supportShadow) {
			Decorations.createNarrowShadowHandles(si);
		}

		this.updateItems();
		
		keepAutoHide();
	}

	void keepAutoHide() {
		TaskBar taskBar = display.taskBar;
		if (taskBar != null && taskBar.isAutoHide) {
			final long createdTime = new Date().getTime();
			taskBar.lastUpdated = createdTime;
			display.timerExec(Display.AUTO_HIDE_DELAY, new Runnable() {
			
				@Override
				public void run() {
					TaskBar taskBar = display.taskBar;
					if (Math.abs(taskBar.lastUpdated - createdTime) < 250) {
						taskBar.setMinimized(taskBar.isAutoHide);
					}
				}
			
			});
		}
	}

	public void removeShellItem(Shell shell) {
		if (this.items == null) {
			return;
		}
		for (int i = 0; i < this.items.length; i++) {
			TaskItem item = this.items[i];
			if (item != null && item.shell == shell) {
				item.releaseFromBar(this);
				this.items[i] = null;
				break;
			}
		}
		if (shell.getMaximized() && display.topBar != null) {
			display.topBar.hide();
		}
		/**
		 * @j2sNative
		 * if (window["swt.task.bar"] == false) { return; }
		 */ { }
		this.syncItems();
		this.updateItems();
		if (this.items.length == 0) {
			handle.style.display = "none";
			barEl.style.display = "none";
		}
		keepAutoHide();
	}

	void syncItems() {
		if (barEl == null) {
			return;
		}
		int delta = 0;
		for (int i = 0; i < this.items.length - delta; i++) {
			while (this.items[i + delta] == null
					&& i + delta < this.items.length) {
				delta++;
			}
			this.items[i] = this.items[i + delta];
		}
		/**
		 * @j2sNative
		 * this.items.length -= delta;
		 */ { }
	}

	boolean isAround(int x, int y) {
		// long now = new Date().getTime();
		// if (now - this.lastMMed < 1000 && this.items.length != 0) {
		// return true;
		// }
		int barHeight = 0;
		this.syncItems();
		int length = this.items.length;
		if (length == 0) {
			barHeight = 36;
		} else {
			Element si = this.items[0].itemHandle;
			int hh = Math.max(Math.max(si.scrollHeight, si.offsetHeight),
					si.clientHeight) + 12;
			barHeight = (length * hh + 36);
		}
		int height = OS.getFixedBodyClientHeight();
		int offset = OS.getFixedBodyOffsetTop()
				+ Math.round((height - barHeight) / 2);
		int y1 = offset - 72;
		int y2 = offset + barHeight + 72;
		return (y >= y1 && y <= y2);
	}

	public void updateItems() {
		if (barEl == null) {
			return;
		}
		this.syncItems();
		/**
		 * @j2sNative
		 * if (window["swt.task.bar"] == false) {
		 * 	return;
		 * }
		 */ { }
		int length = this.items.length;
		if (length == 0) {
			this.barEl.style.height = 36 + "px";
			int offset = 0;
			int height = OS.getFixedBodyClientHeight();
			offset = OS.getFixedBodyOffsetTop() + Math.round((height - 36) / 2);
			this.barEl.style.top = offset + "px";
			return;
		}
		Element si = this.items[0].itemHandle;
		boolean alreadyHidden = false;
		if (si.style.display == "none") {
			si.style.display = "";
			alreadyHidden = true;
		}
		int hh = Math.max(Math.max(si.scrollHeight, si.offsetHeight),
				si.clientHeight) + 12;
		if (alreadyHidden) {
			si.style.display = "none";
		}
		int height = OS.getFixedBodyClientHeight();
		int offset = OS.getFixedBodyOffsetTop()
				+ Math.round((height - (length * hh + 36)) / 2);
		Shell topShell = Display.getTopShell();
		for (int i = 0; i < length; i++) {
			TaskItem item = this.items[i];
			item.itemHandle.style.top = offset + (i * hh + 24) + "px";
			if (item.shell != null) {
				String text = item.shell.getText();
				if (text != item.text) {
					OS.clearChildren(item.textHandle);
					item.textHandle.appendChild(document.createTextNode(text));
					item.itemHandle.title = text;
					item.text = text;
				}
				Image image = item.shell.getImage();
				CSSStyle handleStyle = item.iconHandle.style;
				if (image != null) {
					if (OS.isIENeedPNGFix && image.url != null && image.url.toLowerCase().endsWith(".png") && handleStyle.filter != null) {
						handleStyle.backgroundImage = "url(\"about:blank\")";
						handleStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + image.url + "\", sizingMethod=\"image\")";
					} else {
						if (OS.isIENeedPNGFix && handleStyle.filter != null) handleStyle.filter = ""; 
						if (image.packedURL != null) {
							handleStyle.backgroundImage = "url(\"" + image.packedURL + "\")";
							handleStyle.backgroundPosition = "-" + image.packedOffsetX + "px -" + image.packedOffsetY + "px";
						} else {
							handleStyle.backgroundPosition = "";
							handleStyle.backgroundImage = "url(\"" + image.url + "\")";
						}
					}
				} else {
					String cssClazzName = null;
					if (item.shell.shellIcon != null) {
						cssClazzName = item.shell.shellIcon.className;
					}
					if (cssClazzName != null && cssClazzName.indexOf("shell-title-icon-console") != -1) {
						OS.addCSSClass(item.iconHandle, "shell-item-icon-console");
					}
					handleStyle.backgroundImage = "";
					if (OS.isIENeedPNGFix && handleStyle.filter != null) {
						handleStyle.filter = "";
					}
				}
				item.itemHandle.style.borderColor = item.shell.getMinimized() ? "buttonshadow" : "";
				boolean isTopShell = item.shell == topShell;
				Shell sh = topShell;
				while (!isTopShell && sh != null) {
					isTopShell = item.shell == sh;
					sh = (Shell) sh.parent;
				}
				if (isTopShell) {
					OS.addCSSClass(item.itemHandle, "shell-top-item");
				} else {
					OS.removeCSSClass(item.itemHandle, "shell-top-item");
				}
			}
		}
		this.barEl.style.height = (length * hh + 36) + "px";
		this.barEl.style.top = offset + "px";
		offset = OS.getFixedBodyOffsetLeft();
		this.handle.style.left = offset + "px";
	}

	public void initialize() {
		/**
		 * @j2sNative
		 * if (window["swt.task.bar"] == false) {
		 * 	return;
		 * }
		 */ { }
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
		if (this.handle != null)
			return;
		Element sb = document.createElement("DIV");
		sb.className = "shell-manager-sidebar";
		sb.style.lineHeight = "16px"; // or "1", reset CSS
		sb.style.display = "none";
		document.body.appendChild(sb);
		this.handle = sb;
		Element bb = document.createElement("DIV");
		bb.className = "shell-manager-bar";
		sb.appendChild(bb);
		this.barEl = bb;
		hBarMouesEnter = new RunnableCompatibility() {

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
		Clazz.addEvent(barEl, "mouseover", hBarMouesEnter);
		
		hBarClick = new RunnableCompatibility() {

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
		Clazz.addEvent(barEl, "click", hBarClick);
		
		hBarToggle = new RunnableCompatibility() {

			public void run() {
				toggleAutoHide();
			}

		};
		Clazz.addEvent(barEl, "dblclick", hBarToggle);
		
		this.barEl.title = "Doubleclick to set taskbar auto-hide";
		
		boolean supportShadow = false;
		/**
		 * @j2sNative
		 * supportShadow = window["swt.disable.shadow"] != true;
		 */ {}
		if (supportShadow) {
			Decorations.appendShadowHandles(barEl, true, true, true, false);
		}

	}

	/**
	 * @param minimized
	 * @return whether taskbar is updated or not
	 */
	public boolean setMinimized(boolean minimized) {
		boolean alreadyMinimized = barEl.className.indexOf("minimized") != -1;
		if (alreadyMinimized == minimized)
			return false;
		barEl.className = "shell-manager-bar" + (minimized ? "-minimized" : "");
		setTasksVisible(!minimized);
		return true;
	}

	public void handleApproaching() {
		if (barEl == null) {
			return;
		}
		if (items.length != 0) {
			handle.style.display = "block";
			int zIndex = window.currentTopZIndex + 1;
			if (handle.style.zIndex != zIndex) {
				layerZIndex = handle.style.zIndex;
				bringToTop(zIndex);
			}
			updateItems();
		}
	}

	public void handleLeaving() {
		if (barEl == null) {
			return;
		}
		if (items.length == 0) {
			handle.style.display = "none";
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
		return !ctrlKey && x <= 8 && isAround(x, y);
	}

	public boolean isLeaving(long now, int x, int y, boolean ctrlKey) {
		return ctrlKey || x > 200 || !isAround(x, y);
	}

	public void releaseWidget() {
		if (items != null) {
			for (int i = 0; i < this.items.length; i++) {
				TaskItem item = this.items[i];
				if (item != null) {
					item.releaseFromBar(this);
					this.items[i] = null;
					break;
				}
			}
			items = null;
		}
		if (barEl != null) {
			if (hBarClick != null) {
				Clazz.removeEvent(barEl, "click", hBarClick);
				hBarClick = null;
			}
			if (hBarToggle != null) {
				Clazz.removeEvent(barEl, "dblclick", hBarToggle);
				hBarToggle = null;
			}
			if (hBarMouesEnter != null) {
				Clazz.removeEvent(barEl, "mouseover", hBarMouesEnter);
				hBarMouesEnter = null;
			}
			OS.destroyHandle(barEl);
			barEl = null;
		}
		if (handle != null) {
			OS.destroyHandle(handle);
			handle = null;
		}
	}

	void toggleAutoHide() {
		isAutoHide = !isAutoHide;
		barEl.title = isAutoHide ? "Doubleclick to set taskbar always-visible"
				: "Doubleclick to set taskbar auto-hide";
		setMinimized(isAutoHide);
		if (isJustUpdated) {
			return;
		}
		bringToTop(-1);
	}

}
