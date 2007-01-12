$_L(["$wt.widgets.Shell"], "$wt.widgets.ShellManagerSideBar", null, function(){
$WTC$$.registerCSS ("$wt.widgets.ShellManagerSideBar");
//ShellManagerSideBar = new Object ();
ShellManagerSideBar = $_T($wt.widgets, "ShellManagerSideBar");
var smsb = ShellManagerSideBar;
smsb.sidebarEl = null;
smsb.barEl = null;
smsb.items = new Array ();
smsb.initialize = function () {
	if (this.sidebarEl != null) return;
	var sb = document.createElement ("DIV");
	sb.className = "shell-manager-sidebar";
	sb.style.display = "none";
	//sb.id = "shell-sidebar";
	document.body.appendChild (sb);
	this.sidebarEl = sb;
	var bb = document.createElement ("DIV");
	bb.className = "shell-manager-bar";
	sb.appendChild (bb);
	this.barEl = bb;
	var listener = function (e) {
		if (e == null) e = window.event;
		var sidebar = ShellManagerSideBar.sidebarEl;
		if (e.clientX <= 8) {
			if (sidebar.style.display != "block") {
				sidebar.style.display = "block";
				ShellManagerSideBar.updateItems ();
			}
		} else if (e.clientX > 200) {
			if (sidebar.style.display != "none") {
				sidebar.style.display = "none";
			}
		}
	};
	if (document.addEventListener) {
		document.addEventListener ("mousemove", listener, false);
	} else if (document.attachEvent) {
		document.attachEvent ("onmousemove", listener);
	}
};
smsb.createShellItem = function (shell) {
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
	var si = document.createElement ("A");
	si.className = "shell-item";
	si.href = "#";
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
smsb.removeShellItem = function (shell) {
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
smsb.updateItems = function () {
	var delta = 0;
	for (var i = 0; i < this.items.length - delta; i++) {
		while (this.items[i + delta] == null 
				&& i + delta < this.items.length) {
			delta++;
		}
		this.items[i] = this.items[i + delta];
	}
	this.items.length -= delta;
	var length = this.items.length;
	if (length == 0) {
		this.barEl.style.height = 36 + "px";
		var offset = 0;
		if (window["O$"] != null) {
			var height = O$.getFixedBodyClientHeight();
			offset = O$.getFixedBodyOffsetTop() + Math.round ((height - 36) / 2) - 72;
		}
		this.barEl.style.top = offset + "px";
		return;
	}
	var si = this.items[0].itemHandle;
	var hh = Math.max (si.scrollHeight, si.offsetHeight, si.clientHeight) + 12;
	var offset = 50;
	if (window["O$"] != null) {
		var height = O$.getFixedBodyClientHeight();
		offset = O$.getFixedBodyOffsetTop() + Math.round ((height - (length * hh + 36)) / 2) - 72;
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
};
});