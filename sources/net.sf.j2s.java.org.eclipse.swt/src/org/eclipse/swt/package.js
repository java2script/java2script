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
	    	"widgets"]);

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
		var path = ClazzLoader.getClasspathFor ("org.eclipse.swt.*");
		stylesheet.href = path + swtCSSKey;
		document.getElementsByTagName ("HEAD")[0].appendChild (stylesheet);
	}

	var path = ClazzLoader.getClasspathFor ("org.eclipse.swt.*");
//	if (false)
	ClazzLoader.jarClasspath (path + "events.z.js", [
		"$swt.internal.SWTEventListener",
		"$.SWTEventObject",
				
		"$wt.widgets.Event",
		"$.Listener",
		"$.TypedListener",
		"$.EventTable",
		
		"$wt.events.TypedEvent",
			
		"$.ArmEvent",
		"$.ControlEvent",
		"$.DisposeEvent",
		"$.FocusEvent",
		"$.HelpEvent",
		"$.KeyEvent",
		"$.MenuEvent",
		"$.ModifyEvent",
		"$.MouseAdapter",
		"$.MouseEvent",
		"$.PaintEvent",
		"$.SelectionEvent",
		"$.ShellEvent",
		"$.TraverseEvent",
		"$.TreeEvent",
		"$.VerifyEvent",
		
		"$.ArmListener",
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
		"$.ModifyListener",
		"$.MouseListener",
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
		"$.VerifyListener"
	]);
	//if (false)
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
		"$wt.ResizeSystem",

		"$wt.internal.dnd.DragAndDrop",
		"$.DNDUtils",
		"$.ShellFrameDND",
        		
		"$wt.internal.browser.OS",
        		
		"$wt.graphics.Image",
		"$wt.widgets.Item",
		"$.Layout"
	]);
	/*
	ClazzLoader.jarClasspath (path + "events.js", [
		"java.util.AbstractList",
		"$.RandomAccessSubList",
		"$.SubList"
	]);
	*/

}) ();


/* private */
window["org.eclipse.swt.registered"] = true;