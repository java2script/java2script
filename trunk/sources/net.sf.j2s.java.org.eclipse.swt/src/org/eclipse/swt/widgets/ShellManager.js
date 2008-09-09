/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Jan 17, 2007
 *******/

/*
 * ShellManager is optional for SWT applications. When ShellManager is 
 * activated, there are an automatically-hidden side bar for all windows,
 * and there are no title bar for maximized Shells but with an automatically-
 * hidden top bar. By using ShellManager, much of the inner browser window 
 * space will be used, and minimize or maximize windows will be much more
 * user-friendly.
 *
 * Example:
<script>
...
ClazzLoader.loadClass ("org.eclipse.swt.widgets.ShellManager", function () {
	ClazzLoader.loadClass ("com.example.Notepad", function () {
		com.example.Notepad.main([]);
	});
});
</script>
 * 
 * Update: Above example is out of date. -- Feb 26, 2007
 */
$_L(null, "$wt.widgets.ShellManager", null, function(){
$WTC$$.registerCSS ("$wt.widgets.ShellManager");
//ShellManager = new Object ();
ShellManager = $_T($wt.widgets, "ShellManager");
var sm = ShellManager;
sm.sidebarEl = null;
sm.barEl = null;
sm.topbarEl = null;
sm.lastMaximizedShell = null;
sm.items = new Array ();
// the last time that a window is minimized or maximized
sm.lastMMed = new Date().getTime();
sm.initialize = function () {
	if (this.sidebarEl != null) return;
	var sb = document.createElement ("DIV");
	sb.className = "shell-manager-sidebar";
	sb.style.display = "none";
	document.body.appendChild (sb);
	this.sidebarEl = sb;
	var bb = document.createElement ("DIV");
	bb.className = "shell-manager-bar";
	sb.appendChild (bb);
	this.barEl = bb;

	var tbc = document.createElement ("DIV");
	tbc.className = "shell-manager-topbar-container";
	document.body.appendChild (tbc);
	tbc.style.display = "none";
	tbc.style.width = "320px";
	tbc.style.zIndex = "3456";
	this.topbarContainerEl = tbc;
	
	var tb = document.createElement ("DIV");
	tb.className = "shell-title-bar shell-maximized";
	this.topbarContainerEl.appendChild (tb);
	this.topbarEl = tb;

	var listener = function (e) {
		if (e == null) e = window.event;
		var sidebar = ShellManager.sidebarEl;
		if (sidebar.style.display != "none" && !ShellManager.isAroundSideBar (e.clientY)) {
			sidebar.style.display = "none";
		} else if (e.clientX <= 8 && !e.ctrlKey) {
			if (sidebar.style.display != "block"
					&& ShellManager.isAroundSideBar (e.clientY)
					&& ShellManager.items.length != 0) {
				sidebar.style.display = "block";
				ShellManager.updateItems ();
			}
		} else if (e.clientX > 200 || e.ctrlKey) {
			var now = new Date().getTime();
			if ((now - ShellManager.lastMMed >= 1000 || ShellManager.items.length == 0)
					&& sidebar.style.display != "none") {
				sidebar.style.display = "none";
			}
		}
		
		if (ShellManager.shortcutBarDiv != null) {
			if (!e.ctrlKey && e.clientY >= O$.getFixedBodyClientHeight () - 8
					&& ShellManager.isAroundTopBar (e.clientX)) {
				var zIndex = "";
				if (window.currentTopZIndex == null) {
					zIndex = "1000";
				} else {
					zIndex = (Integer.parseInt(window.currentTopZIndex) + 1) + "";
				}
				if (ShellManager.shortcutBarDiv.style.zIndex != zIndex) {
					ShellManager.shortcutZIndex = ShellManager.shortcutBarDiv.style.zIndex;
					ShellManager.bringShortcutsToTop (zIndex);
				}
			} else if (e.clientY <= O$.getFixedBodyClientHeight () - 70
					|| !ShellManager.isAroundTopBar (e.clientX)) {
				if (ShellManager.shortcutZIndex != null) {
					ShellManager.bringShortcutsToTop (ShellManager.shortcutZIndex);
					ShellManager.shortcutZIndex = null;
				}
			}
		}
		var topbar = ShellManager.topbarContainerEl;
		if (topbar == null) return;
		var topShell = ShellManager.getTopMaximizedShell ();
		if (topShell == null) return;
		
		if (topbar.style.display != "none" && !ShellManager.isAroundTopBar (e.clientX)) {
			topbar.style.display = "none";
			ShellManager.returnTopMaximized ();
		} else if (e.clientY <= 8 && !e.ctrlKey) {
			if (topbar.style.display != "block" && ShellManager.isAroundTopBar (e.clientX)) {
				var lastShell = ShellManager.getTopMaximizedShell ();
				if (lastShell != null && lastShell.titleBar != null) {
					topbar.style.display = "block";
					ShellManager.updateTopMaximized ();
				}
			}
		} else if (e.ctrlKey || e.clientY > 12 + ((topShell.titleBar != null 
				&& window["O$"] != null) ? O$.getContainerHeight (topShell.titleBar) : 20)) {
			var now = new Date().getTime();
			if (now - ShellManager.lastMMed >= 1000 && topbar.style.display != "none") {
				topbar.style.display = "none";
				ShellManager.returnTopMaximized ();
			}
		}
	};
	if (document.addEventListener) {
		document.addEventListener ("mousemove", listener, false);
	} else if (document.attachEvent) {
		document.attachEvent ("onmousemove", listener);
	}
};
sm.createShellItem = function (shell) {
	for (var i = 0; i < this.items.length; i++) {
		var item = this.items[i];
		if (item != null && item.shell == shell) {
			return; // existed already
		}
	}
	if (this.sidebarEl == null) {
		this.initialize ();
	}
	var text = null;
	if (typeof shell == "string") {
		text = shell;
		shell = null;
	} else {
		text = shell.getText ();
	}
	if (text == null) {
		text = "Java2Script";
	}
	var tag = "A";
	if (window["O$"] != null && !O$.isIENeedPNGFix) {
		tag = "DIV";
	}
	var si = document.createElement (tag);
	si.className = "shell-item";
	if (tag == "A") {
		si.href = "#";
	}
	si.title = text;
	si.onclick = function () {
		return false;
	};
	this.sidebarEl.appendChild (si);
	var icon = document.createElement ("DIV");
	icon.className = "shell-item-icon";
	si.appendChild (icon);
	var div = document.createElement ("DIV");
	div.className = "shell-item-text";
	si.appendChild (div);
	div.appendChild (document.createTextNode (text));
	if (shell != null) {
		si.onclick = (function (ss) {
				return function () {
					if (ss.getMinimized ()) {
						ss.bringToTop ();
					} else {
						var lastShell = $wt.widgets.ShellManager.getTopShell ();
						if (ss == lastShell) {
							$wt.internal.ResizeSystem.unregister(ss, 128);
							ss.setMinimized(true);
							$wt.widgets.ShellManager.returnTopMaximized (ss);
						} else {
							ss.bringToTop ();
						}
					}
					$wt.widgets.ShellManager.updateItems ();
					return false;
				};
			}) (shell);
	}
	this.items[this.items.length] = {
		shell : shell,
		text : text,
		itemHandle : si,
		textHandle : div,
		iconHandle : icon
	};
	this.updateItems ();
};
sm.removeShellItem = function (shell) {
	for (var i = 0; i < this.items.length; i++) {
		var item = this.items[i];
		if (item != null && item.shell == shell) {
			item.shell = null;
			item.itemHandle.onclick = null;
			this.sidebarEl.removeChild (item.itemHandle);
			item.itemHandle = null;
			item.textHandle = null;
			item.iconHandle = null;
			this.items[i] = null;
			break;
		}
	}
	var smStyle = this.topbarContainerEl.style;
	if (smStyle.display == "block" && shell.getMaximized()) {
		smStyle.display = "none";
	}
	this.syncItems ();
	if (this.items.length == 0) {
		ShellManager.sidebarEl.style.display = "none";
	}
};
sm.syncItems = function () {
	var delta = 0;
	for (var i = 0; i < this.items.length - delta; i++) {
		while (this.items[i + delta] == null 
				&& i + delta < this.items.length) {
			delta++;
		}
		this.items[i] = this.items[i + delta];
	}
	this.items.length -= delta;
};
sm.isAroundTopBar = function (x) {
	var now = new Date().getTime();
	if (now - this.lastMMed < 1000) {
		return true;
	}
	var x1, x2, barWidth;
	barWidth = 320;
	var height = document.body.clientWidth;
	var offset = Math.round ((height - barWidth) / 2);
	x1 = offset - 72;
	x2 = offset + barWidth + 72;
	return (x >= x1 && x <= x2);
};
sm.getTopShell = function () {
	var lastShell = null;
	var lastZIndex = 0;
	var disps = $wt.widgets.Display.Displays;
	for (var k = 0; k < disps.length; k++) {
		if (disps[k] == null) continue;
		var ss = disps[k].getShells ();
		for (var i = 0; i < ss.length; i++) {
			if (!ss[i].isDisposed () /*&& ss[i].parent == null*/
					&& ss[i].handle.style.display != "none") {
				var idx = ss[i].handle.style.zIndex;
				var zidx = 0;
				if (idx == null || idx.length == 0) {
					zidx = 0;
				} else {
					zidx = parseInt (idx);
				}
				if (zidx > lastZIndex) {
					lastZIndex = zidx;
					lastShell = ss[i];
				}
			}
		}
	}
	return lastShell;
};
sm.getTopMaximizedShell = function () {
	// find the top maximized shell
	var lastShell = null;
	var lastMaxZIndex = 0;
	var disps = $wt.widgets.Display.Displays;
	for (var k = 0; k < disps.length; k++) {
		if (disps[k] == null) continue;
		var ss = disps[k].getShells ();
		for (var i = 0; i < ss.length; i++) {
			if (!ss[i].isDisposed () /*&& ss[i].parent == null*/ && ss[i].getMaximized ()
					&& ss[i].handle.style.display != "none") {
				var idx = ss[i].handle.style.zIndex;
				var zidx = 0;
				if (idx == null || idx.length == 0) {
					zidx = 0;
				} else {
					zidx = parseInt (idx);
				}
				if (zidx > lastMaxZIndex) {
					lastMaxZIndex = zidx;
					lastShell = ss[i];
				}
			}
		}
	}
	return lastShell;
};
sm.updateTopMaximized = function () {
	var lastShell = this.getTopMaximizedShell ();
	if (lastShell == null || lastShell.titleBar == null) return;
	this.lastMaximizedShell = lastShell;
	
	// move the title bar elements into topbarEl
	var els = [];
	for (var i = 0; i < lastShell.titleBar.childNodes.length; i++) {
		els[i] = lastShell.titleBar.childNodes[i];
	}
	for (var i = 0; i < els.length; i++) {
		lastShell.titleBar.removeChild (els[i]);
		this.topbarEl.appendChild (els[i]);
	}

	// update topbar
	this.topbarContainerEl.style.left = Math.round ((document.body.clientWidth - 320) / 2) + "px";
	this.topbarEl.style.width = "316px";
	this.topbarEl.style.left = "2px";
	this.topbarEl.style.top = "1px";
	this.topbarContainerEl.ondblclick = lastShell.titleBar.ondblclick;
	lastShell.updateShellTitle (320);
};
sm.returnTopMaximized = function (shell) {
	var lastShell = this.lastMaximizedShell;
	if (shell != null && lastShell != shell) return;
	if (lastShell == null || lastShell.titleBar == null) return;
	
	// move the title bar elements back to Shell's title bar
	var els = [];
	for (var i = 0; i < this.topbarEl.childNodes.length; i++) {
		els[i] = this.topbarEl.childNodes[i];
	}
	for (var i = 0; i < els.length; i++) {
		lastShell.titleBar.appendChild (els[i]);
	}
	if (shell != null) {
		this.topbarContainerEl.style.display = "none";
	}
};
sm.isAroundSideBar = function (y) {
	var now = new Date().getTime();
	if (now - this.lastMMed < 1000 && this.items.length != 0) {
		return true;
	}
	var y1, y2, barHeight;
	this.syncItems ();
	var length = this.items.length;
	if (length == 0) {
		barHeight = 36;
	} else {
		var si = this.items[0].itemHandle;
		var hh = Math.max (si.scrollHeight, si.offsetHeight, si.clientHeight) + 12;
		barHeight = (length * hh + 36);
	}
	var height = O$.getFixedBodyClientHeight();
	var offset = O$.getFixedBodyOffsetTop() + Math.round ((height - barHeight) / 2);
	y1 = offset - 72;
	y2 = offset + barHeight + 72;
	return (y >= y1 && y <= y2);
};
sm.updateItems = function () {
	this.syncItems ();
	var length = this.items.length;
	if (length == 0) {
		this.barEl.style.height = 36 + "px";
		var offset = 0;
		if (window["O$"] != null) {
			var height = O$.getFixedBodyClientHeight();
			offset = O$.getFixedBodyOffsetTop() + Math.round ((height - 36) / 2);
		}
		this.barEl.style.top = offset + "px";
		return;
	}
	var si = this.items[0].itemHandle;
	var hh = Math.max (si.scrollHeight, si.offsetHeight, si.clientHeight) + 12;
	var offset = 50;
	if (window["O$"] != null) {
		var height = O$.getFixedBodyClientHeight();
		offset = O$.getFixedBodyOffsetTop() + Math.round ((height - (length * hh + 36)) / 2);
	}
	var topShell = this.getTopShell ();
	for (var i = 0; i < length; i++) {
		var item = this.items[i];
		item.itemHandle.style.top = offset + (i * hh + 24) + "px";
		if (item.shell != null) {
			if (item.shell.getText () != item.text) {
				for (var j = item.textHandle.childNodes.length - 1; j >= 0; j--) {
					item.textHandle.removeChild (item.textHandle.childNodes[j]);
				}
				item.textHandle.appendChild (document.createTextNode (item.shell.getText ()));
				item.itemHandle.title = item.shell.getText ();
			} else {
				var img = item.shell.getImage ();
				if (img != null) {
					item.iconHandle.style.backgroundImage = "url(\"" + img.url + "\")";
				}
			}
			item.itemHandle.style.borderColor = item.shell.getMinimized () ? "buttonshadow" : "";
			if (item.shell == topShell) {
				O$.addCSSClass(item.itemHandle, "shell-top-item");
			} else {
				O$.removeCSSClass(item.itemHandle, "shell-top-item");
			}
		}
	}
	this.barEl.style.height = (length * hh + 36) + "px";
	this.barEl.style.top = offset + "px";
	if (window["O$"] != null) {
		offset = O$.getFixedBodyOffsetLeft ();
	} else {
		offset = 0;
	}
	this.sidebarEl.style.left = offset + "px";
};
sm.shortcutBarDiv = null;
sm.shortcutCount = 0;
sm.shortcutItems = [];
sm.shortcutZIndex = null;
sm.initShortcutBar = function () {
	this.shortcutBarDiv = document.createElement ("DIV");
	this.shortcutBarDiv.className = "shortcut-bar";
	document.body.appendChild (this.shortcutBarDiv);
	this.shortcutBarDiv.onclick = function () {
		var sm = $wt.widgets.ShellManager;
		sm.bringShortcutsToTop (null);
	};
	this.shortcutBarDiv.title = "Doubleclick to hide shortcuts";
	this.shortcutBarDiv.ondblclick = function () {
		var sm = $wt.widgets.ShellManager;
		if (sm.shortcutBarDiv.className.indexOf ("minized") == -1) {
			sm.shortcutBarDiv.className = "shortcut-bar-minized";
			sm.shortcutBarDiv.title = "Doubleclick to show shortcuts";
			sm.setShortcutsVisible (false);
		} else {
			sm.shortcutBarDiv.className = "shortcut-bar";
			sm.shortcutBarDiv.title = "Doubleclick to hide shortcuts";
			sm.setShortcutsVisible (true);
		}
		sm.bringShortcutsToTop (null);
	};
};
sm.setShortcutsVisible = function (visible) {
	if (this.shortcutCount <= 0) {
		return;
	}
	for (var i = 0; i < this.shortcutCount; i++) {
		var itemDiv = this.shortcutItems[i];
		itemDiv.style.display = visible ? "" : "none";
	}
};
sm.bringShortcutsToTop = function (zIdx) {
	if (this.shortcutCount <= 0) {
		return;
	}
	var zIndex = "";
	if (zIdx == null) {
		if (window.currentTopZIndex == null) {
			zIndex = "1000";
		} else {
			zIndex = (Integer.parseInt(window.currentTopZIndex) + 1) + "";
		}
		if (this.getTopMaximizedShell () == null) {
			this.shortcutZIndex = zIndex;
		}
	} else {
		zIndex = zIdx;
	}
	this.shortcutBarDiv.style.zIndex = zIndex;
	for (var i = 0; i < this.shortcutCount; i++) {
		var itemDiv = this.shortcutItems[i];
		itemDiv.style.zIndex = zIndex;
	}
};
sm.layoutShortcuts = function () {
	if (this.shortcutCount <= 0) {
		return;
	}
	var barWidth = 20 + this.shortcutCount * 60;
	var barOffset = (O$.getFixedBodyClientWidth () - barWidth) / 2;
	for (var i = 0; i < this.shortcutCount; i++) {
		var itemDiv = this.shortcutItems[i];
		itemDiv.style.left = (barOffset + 20 + i * 60) + "px";
	}
	this.shortcutBarDiv.style.left = barOffset + "px";
	this.shortcutBarDiv.style.width = barWidth + "px";
};
sm.addShortcut = function (name, icon, clickFun) {
	if (this.shortcutBarDiv == null) {
		this.initShortcutBar ();
	}
	var tag = "A";
	if (!O$.isIENeedPNGFix) {
		tag = "DIV";
	}
	var itemDiv = document.createElement (tag);
	itemDiv.className = "shortcut-item";
	if (O$.isIENeedPNGFix) {
		if (icon.toLowerCase().endsWith(".png")) {
			itemDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + icon + "\", sizingMethod=\"image\")";
		} else {
			itemDiv.style.backgroundImage = "url('" + icon + "')";
		}	
		itemDiv.href = "#";
		itemDiv.onclick = (function (f) {
				return function () {
					f();
					return false;
				};
		})(clickFun);
	} else {
		itemDiv.style.backgroundImage = "url('" + icon + "')";
		itemDiv.onclick = clickFun;
	}
	itemDiv.title = name;
	document.body.appendChild (itemDiv);

	this.shortcutItems[this.shortcutCount] = itemDiv;
	this.shortcutCount++;
	this.layoutShortcuts ();
	return itemDiv;
};
sm.markActiveItem = function (item) {
	if (this.shortcutCount <= 0 || item == null) {
		return;
	}
	for (var i = 0; i < this.shortcutCount; i++) {
		var itemDiv = this.shortcutItems[i];
		if (item == itemDiv) {
			O$.addCSSClass(itemDiv, "shortcut-active-item");
		} else {
			O$.removeCSSClass(itemDiv, "shortcut-active-item");
		}
	}
}
sm.isAroundShortcutBar = function (x) {
	/*var now = new Date().getTime();
	if (now - this.lastMMed < 1000) {
		return true;
	}*/
	var x1, x2, barWidth;
	var barWidth = 20 + this.shortcutCount * 60;
	var height = document.body.clientWidth;
	var offset = Math.round ((height - barWidth) / 2);
	x1 = offset - 72;
	x2 = offset + barWidth + 72;
	return (x >= x1 && x <= x2);
};
});
