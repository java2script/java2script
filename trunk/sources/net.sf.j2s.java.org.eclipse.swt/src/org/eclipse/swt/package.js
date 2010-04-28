/* private */
window["org.eclipse.swt.registered"] = false;

/*
 * Standing for SWT CSS, with all "S" into "$". We love dollars. -zhou renjian
 *
 * ATTENTION: Should only be used for SWT only. 
 */
/* protected */
$WTC$$ = {};

/* protected */
$WTC$$.cssAlreadyAggregated = false;
$WTC$$.cssForcedUsingFile = false;

/* private */
$WTC$$.timeouts = new Object ();
$WTC$$.triedTimes = new Object ();
$WTC$$.cssTestEls = [];
/* private */
$WTC$$.trackCSS = function (clazzName) {
	var el = document.createElement ("DIV");
	el.style.cssText = "position:absolute;left:-1000px;top:-100px;font-size:0;display:block;";
	var cssID = $WTC$$.getCSSRuleID (clazzName);
	el.className = cssID;
	if (document.body != null) {
		document.body.appendChild (el);
	}

	var els = $WTC$$.cssTestEls;
	for (var i = 0; i < els.length; i++) {
		if (els[i] == el) {
			return;
		}
	}
	els[els.length] = el;
	var f = (function (e, name) {
		return function () {
			$WTC$$.removeTesting (name);
			var tts = $WTC$$.triedTimes;
			if (tts[e.className] > 1) { // already tried once
				alert ("[Java2Script] Error in loading CSS for " + name + "!");
			} else {
				// alert ("Try to load *.css " + name + " again.");
				/*
				 * Remove existed *.css
				 */
				var head = document.getElementsByTagName ("HEAD")[0];
				var links = head.getElementsByTagName ("LINK");
				for (var i = 0; i < links.length; i++) {
					if (links[i].id == "c$$." + name) {
						if (window["O$"] != null && O$.destroyHandle != null) {
							O$.destroyHandle (links[i]);
						} else {
							head.removeChild (links[i]);
						}
						break;
					}
				}
				$WTC$$.registerCSS (name);
			}
		};
	}) (el, clazzName);
	var handle = window.setTimeout (f, 15000); // 15 seconds, should be 30s
	
	$WTC$$.timeouts[cssID] = handle;
	var tts = $WTC$$.triedTimes;
	if (tts[cssID] == null) {
		tts[cssID] = 1;
	} else {
		tts[cssID]++;
	}
	if (els.length == 1) { // start global checking
		$WTC$$.globalChecking ();
	}
};
/* protected */
$WTC$$.cssLoaded = function (clazzName) {};
/* protected */
$WTC$$.globalLoaded = function () {};
/* private */
$WTC$$.removeTesting = function (clazzName) {
	var cssClassName = $WTC$$.getCSSRuleID (clazzName);
	var els = $WTC$$.cssTestEls;
	for (var i = 0; i < els.length; i++) {
		if (els[i].className == cssClassName) {
			var el = els[i];
			if (el.parentNode != null) {
				if (window["O$"] != null && O$.destroyHandle != null) {
					O$.destroyHandle (el);
				} else {
					el.parentNode.removeChild (el);
				}
			}
			for (var j = i; j < els.length - 1; j++) {
				els[j] = els[j + 1];
			}
			els.length--;
			return el;
		}
	}
	return null;
};
/* private */
$WTC$$.globalChecking = function () {
	var els = $WTC$$.cssTestEls;
	for (var i = 0; i < els.length; i++) {
		var el = els[i];
		var w = Math.max(el.offsetWidth,Math.max(el.clientWidth,el.scrollWidth));
		if (w == 324) { // there are "width:324px;" rules in SWT's *.css
			//log ("CSS: " + el.className + " loaded!");
			$WTC$$.cssLoaded (el.className);
			window.clearTimeout ($WTC$$.timeouts[el.className]);
			if (el.parentNode != null) {
				if (window["O$"] != null && O$.destroyHandle != null) {
					O$.destroyHandle (el);
				} else {
					el.parentNode.removeChild (el);
				}
			}
			for (var j = i; j < els.length - 1; j++) {
				els[j] = els[j + 1];
			}
			els.length--;
		}
	}
	if (els.length != 0) {
		//alert ("continue checking ...");
		return window.setTimeout ($WTC$$.globalChecking, 100);
	} else {
		//log ("finished !");
		$WTC$$.globalLoaded ();
	}
};

/* private */
$WTC$$.getCSSRuleID = function (clazzName) {
	var cssRuleID = null;
	if (clazzName.indexOf ("org.eclipse.swt.") == 0 || clazzName.indexOf ("$wt.")) {
		var idx = clazzName.indexOf ("wt.") + 3;
		cssRuleID = "swt." + clazzName.substring (idx);
	}
	return cssRuleID.toLowerCase ().replace (/\./g, '-');
};

/**
 * Register css for the given class. If the given css text is null, it will
 * try to find relative *.css file instead loading css text directly.
 * @param clazzName Qualified name of a class
 * @param cssText Optional, if given, it will loaded into the page directly.
 */
/* public */
$WTC$$.registerCSS = function (clazzName, cssText) {
	var isDebugging = (window["swt.debugging"] == true);
	if (isDebugging) {
		cssText = null;
	}
	if ($WTC$$.cssAlreadyAggregated || window["ClazzLoader"] == null) {
		return;
	}
	if (!ClazzLoader.isIE && clazzName.indexOf (".IE") != -1) {
		return;
	}
	clazzName = ClazzLoader.unwrapArray ([clazzName])[0];
	var cssPath = null;
	var idx = clazzName.indexOf (".IE");
	if (idx != -1) {
		cssPath = ClazzLoader.getClasspathFor (clazzName.substring(0, idx), false, ".IE.css");
	} else {
		cssPath = ClazzLoader.getClasspathFor (clazzName, false, ".css");
	}
	
	var basePath = ClazzLoader.getClasspathFor (clazzName, true);
	var cssID = "c$$." + clazzName;
	/*
	 * Check whether the css resources is loaded or not
	 */
	if (!ClazzLoader.isResourceExisted (clazzName, cssPath, basePath)) {
		$WTC$$.registeredCSSs[$WTC$$.registeredCSSs.length] = clazzName;
		if (window["swt.debugging"] == true || cssText == null || $WTC$$.cssForcedUsingFile) {
			var cssLink = document.createElement ("LINK");
			cssLink.rel = "stylesheet";
			cssLink.id = cssID;
			cssLink.href = cssPath;
			document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
			/*
			 * register onload event callback
			 */
			$WTC$$.trackCSS (clazzName);
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
					if (idx != -1 && prefix.indexOf ("http://") != 0
							&& prefix.indexOf ("https://") != 0
							&& prefix.indexOf ("file://") != 0
							&& prefix.indexOf ("ftp://") != 0
							&& prefix.indexOf ("javascript://") != 0) {
						prefix = location.substring (0, idx + 1) + prefix;
					}
				//}
			}
			/*
			 * Fix the css images location: url('...') or filter:...(src='...')
			 */
			cssText = cssText.replace (/((url\s*\(\s*['"])|(src\s*=\s*['"]))(.*)(['"])/ig, 
					//"
					function ($0, $1, $2, $3, $4, $5) {
						if ($4.indexOf ("/") == 0
								|| $4.indexOf ("http://") == 0 
								|| $4.indexOf ("https://") == 0
								|| $4.indexOf ("file:/") == 0
								|| $4.indexOf ("ftp://") == 0
								|| $4.indexOf ("javascript:") == 0) {
							return $0;
						}
						return $1 + prefix + $4 + $5;
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
		
		/*
		 * This method will generated a lot non existed *.css resource requests (404) for server.
		 */
		var len = $WTC$$.themes.length;
		for(var i = 0; i < len; i++){
			var themeName = $WTC$$.themes[i];
			var themePath = $WTC$$.themePaths[themeName] + "/" + clazzName.replace (/\./g, "/") + ".css";
			var cssLink = document.createElement ("LINK");
			cssLink.rel = "stylesheet";
			cssLink.id = cssID + themeName;
			cssLink.href = themePath;
			document.getElementsByTagName ("HEAD")[0].appendChild (cssLink);
			/*
			 * OK, theme *.css may be not essential. So no onload callbacks here.
			 */
		}
	}
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
	
var isDebugging = (window["swt.debugging"] == true);
if (!isDebugging) {
	ClazzLoader.jarClasspath (path + "basic.z.js", [
		"org.eclipse.swt.internal.SWTEventListener",
		"$.SWTEventObject",
		"org.eclipse.swt.widgets.Event",
		"org.eclipse.swt.events.TypedEvent",
		"$.ArmEvent",
		"$.ControlEvent",
		"$.DisposeEvent",
		"$.FocusEvent",
		"$.HelpEvent",
		"$.KeyEvent",
		"$.MenuEvent",
		"$.MenuDetectEvent",
		"$.ModifyEvent",
		"$.MouseEvent",
		"$.PaintEvent",
		"$.SelectionEvent",
		"$.ShellEvent",
		"$.TraverseEvent",
		"$.TreeEvent",
		"$.VerifyEvent",
		"org.eclipse.swt.widgets.Listener",
		"$.TypedListener",
		"org.eclipse.swt.events.ArmListener",
		"$.ControlListener",
		"$.ControlAdapter",
		"$.DisposeListener",
		"$.FocusListener",
		"$.FocusAdapter",
		"$.HelpListener",
		"$.KeyListener",
		"$.KeyAdapter",
		"$.MenuListener",
		"$.MenuAdapter",
		"$.MenuDetectListener",
		"$.ModifyListener",
		"$.MouseListener",
		"$.MouseAdapter",
		"$.MouseMoveListener",
		"$.MouseTrackListener",
		"$.MouseTrackAdapter",
		"$.PaintListener",
		"$.SelectionListener",
		"$.SelectionAdapter",
		"$.ShellListener",
		"$.ShellAdapter",
		"$.TraverseListener",
		"$.TreeListener",
		"$.TreeAdapter",
		"$.VerifyListener",
		"org.eclipse.swt.widgets.EventTable",
		
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

		"$.FontData",
		"$.FontMetrics",
		"$.Font",

		"$wt.widgets.Monitor",
		
		"$wt.internal.ResizeHandler",
		"$wt.internal.ResizeSystem",

		"$wt.internal.dnd.DragAndDrop",
		"$.DNDUtils",
		"$.ShellFrameDND",
        		
		"$wt.internal.browser.OS",
		"$.Popup",
        		
		"$wt.graphics.Image",
		"$.ImageData",
		"$wt.widgets.Item",
		"$.Layout"
	]);
	
	ClazzLoader.jarClasspath (ClazzLoader.getClasspathFor ("org.eclipse.swt.*") + "SWT.z.js", [
		"$wt.SWT",
		"$.SWTError",
		"$.SWTException"
	]);
	
	var wPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.widgets.*");
	ClazzLoader.jarClasspath (wPath + "Shell.z.js", [
		"$wt.widgets.DesktopItem",
		"$.TaskBar",
		"$.MaximizedTitle",
		"$.QuickLaunch",
		"$.NotificationCorner",
		"$.Display",
		"$.Widget",
		"$.Control",
		"$.ScrollBar",
		"$.Scrollable",
		"$.Composite",
		"$.Canvas",
		"$.Decorations",
		"$.Shell",
		"$.Dialog"
	]);
	ClazzLoader.jarClasspath (wPath + "more.z.js", [
   		"$wt.widgets.Label",
   		"$.Button",
   		"$.Text",
   		"$.Group",
   		"$.TabItem",
   		"$.TabFolder",
   		"$.TrayItem",
   		"$.Tray",
   		"$.MenuItem",
   		"$.Menu",
   		"$.Link",
   		"$.Combo",
   		"$wt.browser.Browser",
   		"$wt.program.Program",
   		"$wt.layout.GridData",
   		"$.GridLayout",
   		"$.FillData",
   		"$.FillLayout"
   	]);

	var w = "$wt.widgets.";
	ClazzLoader.jarClasspath (wPath + "Tree.z.js", [
		w + "TreeItem",
		"$.TreeColumn",
		"$.Tree"
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
	ClazzLoader.jarClasspath (wPath + "CoolBar.z.js", [
		w + "CoolItem",
		"$.CoolBar"
	]);
	
	var lPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.layout.*");
	var l = "$wt.layout.";
	ClazzLoader.jarClasspath (lPath + "RowLayout.z.js", [
		l + "RowData",
		"$.RowLayout"
	]);
	ClazzLoader.jarClasspath (lPath + "FormLayout.z.js", [
		l + "FormAttachment",
		"$.FormData",
		"$.FormLayout"
	]);

	ClazzLoader.jarClasspath (path + "dnd.z.js", [
		"$wt.dnd.DND",
		"$.DNDEvent",
		"$.DNDListener",
		"$.DragSourceListener",
		"$.DragSourceAdapter",
		"$.DragSourceEvent",
		"$.DropTargetListener",
		"$.DropTargetAdapter",
		"$.DropTargetEvent",
		"$.TransferData",
		"$.Transfer",
		"$.DragSource",
		"$.DropTarget"
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

var lazyCBKey = "swt.lazy.loading.callback";
if (window[lazyCBKey] != null) {
	window[lazyCBKey]();
	window[lazyCBKey] = null;
}
