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

	var path = ClazzLoader.getClasspathFor ("org.eclipse.swt.*");
	
	// The core.z.js should already intialized
	ClazzLoader.loadZJar (path + "events.z.js", "org.eclipse.swt.widgets.EventTable");

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
	ClazzLoader.jarClasspath (wPath + "SashForm.z.js", [
		"$wt.internal.dnd.SashDND",
		w + "Sash",
		"$wt.custom.SashFormData",
		"$.SashFormLayout",
		"$.SashForm"
	]);
	
	var cPath = ClazzLoader.getClasspathFor ("org.eclipse.swt.custom.*");
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

}) ();


/* private */
window["org.eclipse.swt.registered"] = true;