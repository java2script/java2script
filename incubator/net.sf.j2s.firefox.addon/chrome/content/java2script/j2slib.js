window["j2s.addon.loaded"] = true;
window["j2s.lib.list"] = [
	/*{ version : "20061113", alias : "1.0.0-m4" },
	{ version : "20061215" },*/
	{ version : "20070206" }/*,
	{ version : "20070207" },
	{ version : "20070228", alias : "1.0.0-m5" },
	{ version : "20070307" },*/
];

// following will try to read from window["j2s.lib"] configuration!
var j2slibList = window["j2s.lib.list"];
var j2sver = null;
var o = window["j2s.lib"];
for (var i = 0; i < j2slibList.length; i++) {
	var item = j2slibList[i];
	if (o.version != null && item.version == o.version) {
		j2sver = (item.alias != null ? item.alias : item.version);
		break;
	} else if (o.alias != null && item.alias == o.alias) {
		j2sver = item.alias;
		break;
	}
}
if (j2sver == null && o.version != null 
		&& (o.forward || o.forward == null)) {
	var availables = [];
	for (var i = 0; i < j2slibList.length; i++) {
		var item = j2slibList[i];
		if (item.version != null && item.version >= o.version) {
			if (o.mode == null || o.mode == "dailybuild" 
				|| (o.mode == "milestone" && item.alias != null)
				|| (o.mode == "release" && item.alias != null && item.alias.indexOf ("-m") == -1)) {
				availables[availables.length] = item;
			}
		}
	}
	if (availables.length > 0) {
		var first = availables.sort()[availables.length - 1];
		j2sver = (first.alias != null ? first.alias : first.version);
	}
}
var sxr = document.createElement ("SCRIPT");
if (j2sver != null) {
	sxr.src = "chrome://java2script/content/" + j2sver + "/j2slib.z.js";
} else {
	if (o.base == null) {
		o.base = "http://archive.java2script.org/";
	}
	sxr.src = o.base + (o.alias ? o.alias : o.version) + "/j2slib.z.js";
}
var t = "onreadystatechange";
var xhrCallback = function(){
	var s = this.readyState;
	if (s == null || s == "loaded" || s == "complete") {
		window["j2s.lib"].onload ();
	}
};
if (typeof sxr[t] == "undefined") {
	sxr.onload = xhrCallback;
} else {
	sxr[t] = xhrCallback;
}
document.getElementsByTagName ("HEAD")[0].appendChild (sxr);
