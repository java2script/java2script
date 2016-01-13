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
(function () {
	var o = window["j2s.lib"];
	if (o.base == null) {
		o.base = "http://archive.java2script.org/";
	}
	o.j2sBase = o.base + (o.alias ? o.alias : o.version) + "/";
	var sxr = document.createElement ("SCRIPT");
	sxr.src = o.j2sBase + "j2slib.z.js";
	sxr.type = "text/javascript";
	if (o.onload) {
		var t = "onreadystatechange";
		var xhrCallback = generateScriptCallback ();
		if (typeof sxr[t] == "undefined") {
			sxr.onload = xhrCallback;
		} else {
			sxr[t] = xhrCallback;
		}
	}
	document.getElementsByTagName ("HEAD")[0].appendChild (sxr);
}) ();
