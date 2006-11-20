/*
 * The following codes are moved from ClassExt.js, with modifications
 */

/*
 * Standing for SWT CSS, with all "S" into "$". We love dollors. -zhou renjian
 *
 * ATTENTION: Should only be used for SWT only. 
 */
/* protected */
$WTC$$ = {};

/* protected */
$WTC$$.cssAlreadyAggregated = false;
$WTC$$.cssForcedUsingFile = false;

/**
 * Register css for the given class. If the given css text is null, it will
 * try to find relative *.css file instead loading css text directly.
 * @param clazzName Qualified name of a class
 * @param cssText Optional, if given, it will loaded into the page directly.
 */
/* public */
$WTC$$.registerCSS = function (clazzName, cssText) {
	if ($WTC$$.cssAlreadyAggregated || window["ClazzLoader"] == null) {
		return ;
	}
	clazzName = ClazzLoader.unwrapArray ([clazzName])[0];
	var cssPath = ClazzLoader.getClasspathFor (clazzName, false, ".css");
	
	var basePath = ClazzLoader.getClasspathFor (clazzName, true);
	var cssID = "c$$." + clazzName;
	/*
	 * Check whether the css resources is loaded or not
	 */
	if (!ClazzLoader.isResourceExisted (clazzName, cssPath, basePath)) {
		$WTC$$.registeredCSSs[$WTC$$.registeredCSSs.length] = clazzName;
		if (cssText == null || $WTC$$.cssForcedUsingFile) {
			var cssLink = document.createElement ("LINK");
			cssLink.rel = "stylesheet";
			cssLink.id = cssID;
			cssLink.href = cssPath;
			document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
		} else {
			var prefix = "";
			var idx = cssPath.lastIndexOf ("/");
			if (idx != -1) {
				prefix = cssPath.substring (0, idx + 1);
			}
			if (document.createStyleSheet != null) {
				// prepare for createStyleSheet with "javascript:...";
				/*
				 * TODO: Make more tests on the correctness of prefix!
				 */
				//var protocol = window.location.protocol;
				//var host = window.location.host;
				var location = window.location.href.toString ();
				//if (protocol == "file:" || host == "") {
					var idx = location.lastIndexOf ("/");
					if (idx != -1) {
						prefix = location.substring (0, idx + 1) + prefix;
					}
				//}
			}
			/*
			 * Fix the css images location
			 */
			cssText = cssText.replace (/(url\s*\(\s*['"])(.*)(['"])/ig, 
					//"
					function ($0, $1, $2, $3) {
						if ($2.indexOf ("/") == 0
								|| $2.indexOf ("http://") == 0 
								|| $2.indexOf ("https://") == 0
								|| $2.indexOf ("file:/") == 0
								|| $2.indexOf ("ftp://") == 0
								|| $2.indexOf ("javascript:") == 0) {
							return $0;
						}
						return $1 + prefix + $2 + $3;
					});
			if (document.createStyleSheet != null) {
				/*
				 * Internet Explorer does not support loading dynamic css styles
				 * by creating <STYLE> element!
				 */
				var sheet = document.createStyleSheet ();
				sheet.cssText = cssText;
				//sheet.id = cssID; // No ID support the this element for IE
				window[cssID] = true;
			} else {
				var cssStyle = document.createElement ("STYLE");
				cssStyle.id = cssID;
				cssStyle.appendChild (document.createTextNode (cssText));
				document.getElementsByTagName ("HEAD")[0].appendChild (cssStyle);
			}
		}
		
		var len = $WTC$$.themes.length;
		for(var i = 0; i < len; i++){
			var themeName = $WTC$$.themes[i];
			var themePath = $WTC$$.themePaths[themeName] + "/" + clazzName.replace (/\./g, "/") + ".css";
			var cssLink = document.createElement ("LINK");
			cssLink.rel = "stylesheet";
			cssLink.id = cssID + themeName;
			cssLink.href = themePath;
			document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
		}
	}
};

/*
 * The above codes are moved from ClassExt.js
 */

/*
 * The following codes are moved from ClassLoader.js
 */
 
/*
 * loadCSS may be considered part of SWT library. Should be packed with
 * SWT not with Java core.
 *
 * Not used in other *.js yet.
 * - Nov 8, 2006
 */
/* public */
$WTC$$.loadCSS = function (cssName) {
	var cssKey = "";
	var idx = cssName.lastIndexOf (".");
	if (idx == -1) {
		cssKey = cssName + ".css";
	} else {
		cssKey = cssName.substring (idx + 1) + ".css";
	}
	var resLinks = document.getElementsByTagName ("LINK");
	for (var i = 0; i < resLinks.length; i++) {
		var cssPath = resLinks[i].href;
		if (cssPath.lastIndexOf (cssKey) == cssPath.length - cssKey.length) {
			return ;
		}
	}

	/*-# cssLink -> rel #-*/
	var cssLink = document.createElement ("LINK");
	cssLink.rel = "stylesheet";
	var path = ClazzLoader.getClasspathFor (cssName);
	cssLink.href = path.substring (0, path.lastIndexOf (".js")) + ".css";
	document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
};
/*
 * This array will preserves the themes order.
 */
$WTC$$.themes = new Array();
$WTC$$.themePaths = new Object();
$WTC$$.registeredCSSs = new Array();
/**
 * This mehtod register a theme for overriding the default theme mechanism.
 *
 * @param themeName The name of the theme that must be unique
 * @param themePath The path of the theme that must contains the CSS files
 */
$WTC$$.registerTheme = function(themeName, themePath){
	$WTC$$.themes[$WTC$$.themes.length] = themeName;
	$WTC$$.themePaths[themeName] = themePath;
	
	var len = $WTC$$.registeredCSSs.length;
	var cssID = "c$$." + clazzName;
	
	for (var i = 0 ; i < len; i++) {
		var clazzName = $WTC$$.registeredCSSs[i];
		var cssPath = themePath + "/" + clazzName.replace (/\./g, "/") + ".css";
		var cssLink = document.createElement ("LINK");
		cssLink.rel = "stylesheet";
		cssLink.id = cssID + themeName;
		cssLink.href = cssPath;
		document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
	}
	
};

/*
 * The above codes are moved from ClassLoader.js
 */
 
Clazz.declarePackage ("org.eclipse.swt");
$wt = org.eclipse.swt;

(function () {
	ClazzLoader.registerPackages ("org.eclipse.swt", [
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
			"printing",
			"program",
	    	"widgets"]);

	var path = ClazzLoader.getClasspathFor ("org.eclipse.swt.*");
	
	// The core.z.js should already intialized
	ClazzLoader.loadZJar (path + "events.z.js", "org.eclipse.swt.widgets.EventTable");

var isDebugging = (window["swt.debugging"] == true);
if (!isDebugging) {
	ClazzLoader.jarClasspath (path + "basic.z.js", [
		"$wt.internal.SerializableCompatibility",
		"$.CloneableCompatibility",
		"$.RunnableCompatibility",
		"$wt.internal.dnd.HTMLEventWrapper",
		"$.DragListener",
		"$.DragAdapter",
		"$.DragEvent",
		
		"$wt.internal.struct.WINDOWPOS",
		"$.MESSAGE",
        		
		"$wt.accessibility.Accessible",

		"$wt.graphics.Point",
		"$.Rectangle",
		"$.RGB",

		"$.Resource",
		"$.Color",
		"$.Cursor",

		"$.Drawable",
		"$.Device",
		"$.DeviceData",

		"$wt.widgets.Monitor"
	]);
	ClazzLoader.jarClasspath (path + "more.z.js", [
		"$wt.internal.ResizeHandler",
		"$wt.internal.ResizeSystem",

		"$wt.internal.dnd.DragAndDrop",
		"$.DNDUtils",
		"$.ShellFrameDND",
        		
		"$wt.internal.browser.OS",
        		
		"$wt.graphics.Image",
		"$.ImageData",
		"$wt.widgets.Item",
		"$.Layout"
	]);
	var wPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.widgets.*");
	ClazzLoader.jarClasspath (wPath + "Shell.z.js", [
		"$wt.widgets.Display",
		"$.Widget",
		"$.Control",
		"$.ScrollBar",
		"$.Scrollable",
		"$.Composite",
		"$.Canvas",
		"$.Decorations",
		"$.Shell"
	]);
	var w = "$wt.widgets.";
	ClazzLoader.jarClasspath (wPath + "Tree.z.js", [
		w + "TreeItem",
		"$.TreeColumn",
		"$.Tree"
	]);
	ClazzLoader.jarClasspath (wPath + "Tray.z.js", [
		w + "TrayItem",
		"$.Tray"
	]);
	ClazzLoader.jarClasspath (wPath + "ToolBar.z.js", [
		w + "ToolItem",
		"$.ToolBar"
	]);
	ClazzLoader.jarClasspath (wPath + "Table.z.js", [
		w + "TableItem",
		"$.TableColumn",
		"$.Table",
		"$wt.internal.dnd.TableColumnDND"
	]);
	
	var cPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.custom.*");
	ClazzLoader.jarClasspath (cPath + "SashForm.z.js", [
		"$wt.internal.dnd.SashDND",
		w + "Sash",
		"$wt.custom.SashFormData",
		"$.SashFormLayout",
		"$.SashForm"
	]);
	var c = "$wt.custom.";
	ClazzLoader.jarClasspath (cPath + "CBanner.z.js", [
		c + "CBannerLayout",
		"$.CBanner"
	]);
	ClazzLoader.jarClasspath (cPath + "CLabel.z.js", [
		c + "CLayoutData",
		"$.CLabel"
	]);
	ClazzLoader.jarClasspath (cPath + "CTabFolder.z.js", [
		c + "CTabFolderEvent",
		"$.CTabFolderListener",
		"$.CTabFolderAdapter",
		"$.CTabFolder2Listener",
		"$.CTabFolder2Adapter",
		"$.CTabFolderLayout",
		"$.CTabItem",
		"$.CTabFolder",
	]);
	ClazzLoader.jarClasspath (cPath + "ViewForm.z.js", [
		c + "ViewFormLayout",
		"$.ViewForm"
	]);

	ClazzLoader.jarClasspath (wPath + "Slider.z.js", [
		"$wt.internal.dnd.SliderDND",
		w + "Slider"
	]);
	ClazzLoader.jarClasspath (wPath + "Scale.z.js", [
		"$wt.internal.dnd.ScaleDND",
		w + "Scale"
	]);
	//if (false)
	ClazzLoader.jarClasspath (wPath + "TabFolder.z.js", [
		w + "TabItem",
		"$.TabFolder"
	]);
	ClazzLoader.jarClasspath (wPath + "Menu.z.js", [
		w + "MenuItem",
		"$.Menu"
	]);
	ClazzLoader.jarClasspath (wPath + "CoolBar.z.js", [
		w + "CoolItem",
		"$.CoolBar"
	]);
	
	var lPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.layout.*");
	var l = "$wt.layout.";
	ClazzLoader.jarClasspath (lPath + "GridLayout.z.js", [
		l + "GridData",
		"$.GridLayout"
	]);
	ClazzLoader.jarClasspath (lPath + "FillLayout.z.js", [
		l + "FillData",
		"$.FillLayout"
	]);
	ClazzLoader.jarClasspath (lPath + "RowLayout.z.js", [
		l + "RowData",
		"$.RowLayout"
	]);
	ClazzLoader.jarClasspath (lPath + "FormLayout.z.js", [
		l + "FormAttachment",
		"$.FormData",
		"$.FormLayout"
	]);

	var gPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.graphics.*");
	var g = "$wt.graphics.";
	ClazzLoader.jarClasspath (gPath + "Font.z.js", [
		g + "FontData",
		"$.FontMetrics",
		"$.Font"
	]);
	/*
	ClazzLoader.jarClasspath (path + "events.js", [
		"java.util.AbstractList",
		"$.RandomAccessSubList",
		"$.SubList"
	]);
	*/
} // end of !isDebugging

}) ();


/* private */
window["org.eclipse.swt.registered"] = true;
