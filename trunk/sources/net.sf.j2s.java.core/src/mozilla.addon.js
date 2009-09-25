// mozilla.addon.js
// Following script will make J2SLib compatiable with Java2Script addon
function generateScriptCallback () {
	return function () {
		var s = this.readyState;
		if (s == null || s == "loaded" || s == "complete") {
			if (window["ClazzLoader"] != null) {
				window["j2s.lib"].onload (this);
			}
			this.onreadystatechange = null;
			this.onload = null;
		}
	};
};
function loadJ2SLibZJS (path, cb) {
	var sxr = document.createElement ("SCRIPT");
	sxr.src = path;
	sxr.type = "text/javascript";
	if (cb) {
		var t = "onreadystatechange";
		var xhrCallback = generateScriptCallback ();
		if (typeof sxr[t] == "undefined") {
			sxr.onload = xhrCallback;
		} else {
			sxr[t] = xhrCallback;
		}
	}
	document.getElementsByTagName ("HEAD")[0].appendChild (sxr);
};
if (navigator.userAgent.toLowerCase ().indexOf ("gecko") != -1) {
	loadJ2SLibZJS("chrome://java2script/content/j2slib.js");
	window.setTimeout (function () {
		if (window["j2s.addon.loaded"]) return; // Loaded by Firefox addon!
		var o = window["j2s.lib"];
		if (o.base == null) {
			o.base = "http://archive.java2script.org/";
		}
		o.j2sBase = o.base + (o.alias ? o.alias : o.version) + "/";
		loadJ2SLibZJS(o.j2sBase + "j2slib.z.js", o.onload);
	}, 300); // with 0.3 second lag! 0.3 is enough for chrome://*.js to be loaded.
} else {
	var o = window["j2s.lib"];
	if (o.base == null) {
		o.base = "http://archive.java2script.org/";
	}
	o.j2sBase = o.base + (o.alias ? o.alias : o.version) + "/";
	loadJ2SLibZJS(o.j2sBase + "j2slib.z.js", o.onload);
}