1. Modify chrome/content/java2script/j2slib.js' window["j2s.lib.list"]
   Add new version, or modify the version number.
2. Create new folder like chrome/content/java2script/20070206/ according
   to the above version number.
3. Copy files and folders inside net.sf.j2s.lib/j2slib/ into the abvove folder
4. Modify *.html as following example:

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>org.java2script.notepad.Notepad</title>
</head>
<body>
<script type="text/javascript">
window["j2s.lib"] = {
	/*base : "http://archive.java2script.org/",*/
   	/*alias : "1.0.0-m5",*/
	base : "../net.sf.j2s.lib/",
	alias : "j2slib",
	version : "20070206",
	/*forward : true,*/
	mode : "dailybuild",
	onload : function () {
		ClazzLoader.ignore (["java.io.File", "$.FileOutputStream", "$.ByteArrayOutputStream", "$.FileInputStream", "$.FileFilter"]);
		ClazzLoader.loadClass ("org.eclipse.swt.widgets.ShellManager", function () {
			ClazzLoader.loadClass ("org.java2script.notepad.Notepad", function () {
				org.java2script.notepad.Notepad.main([]);
			});
		});
	}
};

/* The following script need no modifications */
function loadJ2SLibZJS (path, cb) {
	var sxr = document.createElement ("SCRIPT");
	sxr.src = path;
	sxr.type = "text/javascript";
	if (cb) {
		var t = "onreadystatechange";
		var xhrCallback = function () {
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
	}
	document.getElementsByTagName ("HEAD")[0].appendChild (sxr);
};
if (navigator.userAgent.toLowerCase ().indexOf ("gecko") != -1) {
	loadJ2SLibZJS("chrome://java2script/content/j2slib.js");
	//loadJ2SLibZJS("file:///S:/eclipse-3.1.1/eclipse/workspace/net.sf.j2s.firefox.addon/chrome/content/java2script/j2slib.js");
	window.setTimeout (function () {
		if (window["j2s.addon.loaded"]) return; // Loaded by Firefox addon!
		var o = window["j2s.lib"];
		if (o.base == null) {
			o.base = "http://archive.java2script.org/";
		}
		loadJ2SLibZJS(o.base + (o.alias ? o.alias : o.version) + "/j2slib.z.js", o.onload);
	}, 300); // with 0.3 second lag! 0.3 is enough for chrome://*.js to be loaded.
} else {
	var o = window["j2s.lib"];
	if (o.base == null) {
		o.base = "http://archive.java2script.org/";
	}
	loadJ2SLibZJS(o.base + (o.alias ? o.alias : o.version) + "/j2slib.z.js", o.onload);
}
</script>
</body>
</html>

