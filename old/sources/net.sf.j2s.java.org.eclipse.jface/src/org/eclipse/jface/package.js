/* private */
window["org.eclipse.jface.registered"] = false;
 
Clazz.declarePackage ("org.eclipse.jface");

(function () {
	ClazzLoader.registerPackages ("org.eclipse.jface", [
			"action",
			"bindings",
			"bindings.keys",
			"bindings.keys.formatting",
			"commands",
			"contexts",
			"dialogs",
			"operation", 
			"perference", 
			"resource", 
			"util", 
			"viewers", 
			"viewers.deffered", 
			"window", 
			"wizard"]);

	var path = ClazzLoader.getClasspathFor ("org.eclipse.jface.*");
	
	ClazzLoader.jarClasspath (path + "resource.z.js", [
 		"org.eclipse.jface.resource.DataFormatException",
 		"$.DeviceResourceDescriptor",
 		"$.ColorDescriptor",
 		"$.DeviceResourceException",
 		"$.FontDescriptor",
 		"$.ArrayFontDescriptor",
 		"$.ImageDescriptor",
 		"$.ImageDataImageDescriptor",
 		"$.FileImageDescriptor",
 		"$.DerivedImageDescriptor",
 		"$.CompositeImageDescriptor",
 		"$.ImageRegistry",
 		"$.JFaceResources",
 		"$.JFaceColors",
 		"$.MissingImageDescriptor",
 		"$.NamedFontDescriptor",
 		"$.ResourceRegistry",
 		"$.RGBColorDescriptor",
 		"$.ColorRegistry",
 		"$.FontRegistry",
 		"$.ResourceManager",
 		"$.AbstractResourceManager",
 		"$.DeviceResourceManager",
 		"$.LocalResourceManager",
 		"$.StringConverter",
 		"$.URLImageDescriptor"
 	]);

	ClazzLoader.jarClasspath (path + "util.z.js", [
	   "org.eclipse.jface.util.Geometry",
       "$.ILogger",
       "$.IOpenEventListener",
       "$.IPropertyChangeListener",
       "$.ISafeRunnableRunner",
       "$.ListenerList",
       "$.OpenStrategy",
       "$.Policy",
       "$.PropertyChangeEvent",
       "$.SafeRunnable"
    ]);

	ClazzLoader.jarClasspath (path + "window.z.js", [
  	   "net.sf.j2s.ajax.AWindowDelegate",
	   "$.AWindowRunnable",
	   "org.eclipse.jface.operation.IRunnableContext",
	   "$.IRunnableWithProgress",
	   "$.IThreadListener",
	   "org.eclipse.jface.window.IShellProvider",
	   "$.SameShellProvider",
	   "$.WindowManager",
	   "$.Window"/*,
	   "$.ApplicationWindow"*/
    ]);
	
	ClazzLoader.jarClasspath (path + "viewers.interfaces.z.js", [
		"org.eclipse.jface.viewers.IBaseLabelProvider",
		"$.IBasicPropertyConstants",
		"$.ICellEditorListener",
		"$.ICellEditorValidator",
		"$.ICellModifier",
		"$.ICheckable",
		"$.ICheckStateListener",
		"$.IColorDecorator",
		"$.IColorProvider",
		"$.IContentProvider",
		"$.IDecoration",
		"$.IDoubleClickListener",
		"$.IElementComparer",
		"$.IFilter",
		"$.IFontDecorator",
		"$.IFontProvider",
		"$.IInputProvider",
		"$.IInputSelectionProvider",
		"$.ILabelDecorator",
		"$.IDelayedLabelDecorator",
		"$.ILabelProvider",
		"$.ILabelProviderListener",
		"$.ILazyContentProvider",
		"$.ILightweightLabelDecorator",
		"$.IOpenListener",
		"$.ISelection",
		"$.ISelectionChangedListener",
		"$.ISelectionProvider",
		"$.IPostSelectionProvider",
		"$.IStructuredContentProvider",
		"$.IStructuredSelection",
		"$.ITableColorProvider",
		"$.ITableFontProvider",
		"$.ITableLabelProvider",
		"$.ITreeContentProvider",
		"$.ITreeViewerListener",
		"$.IViewerLabelProvider"
	]);
}) ();

/* private */
window["org.eclipse.jface.registered"] = true;
