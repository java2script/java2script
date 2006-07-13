Clazz.declarePackage ("org.eclipse.swt");
$wt = org.eclipse.swt;

(function () {
	var subPkgs = [
			"accessibility", 
			"browser", 
	    	"custom", 
			"dnd",
	    	"events", 
			"graphics", 
	    	"internal", 
	    	"internal.dnd", 
	    	"internal.browser", 
	    	"internal.struct", 
			"layout", 
	    	"widgets"
	];
	for (var i = 0; i < subPkgs.length; i++) {
		Clazz.declarePackage ("org.eclipse.swt." + subPkgs[i]);
	}

	var swtCSSKey = "swt-default.css";
	var existed = false;
	var resLinks = document.getElementsByTagName ("LINK");
	for (var i = 0; i < resLinks.length; i++) {
		var cssPath = resLinks[i].href;
		if (cssPath.lastIndexOf (swtCSSKey) == cssPath.length - swtCSSKey.length) {
			existed = true;
			break;
		}
	}
	if (!existed) {
		var stylesheet = document.createElement ("LINK");
		stylesheet.rel = "stylesheet";
		var path = ClazzLoader.getClasspathFor ("org.eclipse.swt.SWT");
		stylesheet.href = path.substring (0, path.lastIndexOf ("SWT.js")) + swtCSSKey;
		document.getElementsByTagName ("HEAD")[0].appendChild (stylesheet);
	}
}) ();

/* private */
window["org.eclipse.swt.registered"] = true;