/******************************************************************************
 * Copyright (c) 2005-2007 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Web:
 *     http://j2s.sourceforge.net/
 *     http://sourceforge.net/projects/j2s/
 * Contributors:
 *     ognize.com - initial API and implementation
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
			if (sidebar.style.display != "block" && ShellManager.isAroundSideBar (e.clientY)) {
				sidebar.style.display = "block";
				ShellManager.updateItems ();
			}
		} else if (e.clientX > 200 || e.ctrlKey) {
			if (sidebar.style.display != "none") {
				sidebar.style.display = "none";
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
				topbar.style.display = "block";
				ShellManager.updateTopMaximized ();
			}
		} else if (e.ctrlKey || e.clientY > 12 + ((topShell.titleBar != null 
				&& window["O$"] != null) ? O$.getContainerHeight (topShell.titleBar) : 20)) {
			if (topbar.style.display != "none") {
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
	if (window["O$"] != null && !O$.isIE) {
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
	var div = document.createElement ("DIV");
	div.className = "shell-item-icon";
	si.appendChild (div);
	div = document.createElement ("DIV");
	div.className = "shell-item-text";
	si.appendChild (div);
	div.appendChild (document.createTextNode (text));
	if (shell != null) {
		si.onclick = (function (ss) {
				return function () {
					ss.bringToTop ();
					return false;
				};
			}) (shell);
	}
	this.items[this.items.length] = {
		shell : shell,
		text : text,
		itemHandle : si,
		textHandle : div
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
			this.items[i] = null;
			break;
		}
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
	var x1, x2, barWidth;
	barWidth = 320;
	var height = document.body.clientWidth;
	var offset = Math.round ((height - barWidth) / 2);
	x1 = offset - 72;
	x2 = offset + barWidth + 72;
	return (x >= x1 && x <= x2);
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
	if (lastShell == null) return;
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
	for (var i = 0; i < length; i++) {
		var item = this.items[i];
		item.itemHandle.style.top = offset + (i * hh + 24) + "px";
		if (item.shell != null && item.shell.getText () != item.text) {
			for (var j = item.textHandle.childNodes.length; j >= 0; j--) {
				item.textHandle.removeChild (item.textHandle.childNodes[j]);
			}
			item.textHandle.appendChild (document.createTextNode (item.shell.getText ()));
		}
	}
	this.barEl.style.height = (length * hh + 36) + "px";
	this.barEl.style.top = offset + "px";
	if (window["O$"] != null) {
		offset = O$.getFixedBodyOffsetLeft();
	} else {
		offset = 0;
	}
	this.sidebarEl.style.left = offset + "px";
};
});
