Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["java.util.HashMap", "$.ResourceBundle", "org.eclipse.jface.resource.DeviceResourceManager", "$.ImageRegistry"], "org.eclipse.jface.resource.JFaceResources", ["java.text.MessageFormat", "org.eclipse.jface.resource.ColorRegistry", "$.FontRegistry", "org.eclipse.jface.util.Assert", "$wt.widgets.Display"], function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "JFaceResources");
c$.format = Clazz.defineMethod (c$, "format", 
function (key, args) {
return java.text.MessageFormat.format (org.eclipse.jface.resource.JFaceResources.getString (key), args);
}, "~S,~A");
c$.getBannerFont = Clazz.defineMethod (c$, "getBannerFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.bannerfont");
});
c$.getBundle = Clazz.defineMethod (c$, "getBundle", 
function () {
return org.eclipse.jface.resource.JFaceResources.bundle;
});
c$.getColorRegistry = Clazz.defineMethod (c$, "getColorRegistry", 
function () {
if (org.eclipse.jface.resource.JFaceResources.colorRegistry == null) ($t$ = org.eclipse.jface.resource.JFaceResources.colorRegistry =  new org.eclipse.jface.resource.ColorRegistry (), org.eclipse.jface.resource.JFaceResources.prototype.colorRegistry = org.eclipse.jface.resource.JFaceResources.colorRegistry, $t$);
return org.eclipse.jface.resource.JFaceResources.colorRegistry;
});
c$.getResources = Clazz.defineMethod (c$, "getResources", 
function (toQuery) {
var reg = org.eclipse.jface.resource.JFaceResources.registries.get (toQuery);
if (reg == null) {
var mgr =  new org.eclipse.jface.resource.DeviceResourceManager (toQuery);
reg = mgr;
org.eclipse.jface.resource.JFaceResources.registries.put (toQuery, reg);
toQuery.disposeExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.JFaceResources$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "JFaceResources$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.mgr.dispose ();
org.eclipse.jface.resource.JFaceResources.registries.remove (this.f$.toQuery);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.JFaceResources$1, i$, v$);
}) (this, Clazz.cloneFinals ("mgr", mgr, "toQuery", toQuery)));
}return reg;
}, "$wt.widgets.Display");
c$.getResources = Clazz.defineMethod (c$, "getResources", 
function () {
return org.eclipse.jface.resource.JFaceResources.getResources ($wt.widgets.Display.getCurrent ());
});
c$.getDefaultFont = Clazz.defineMethod (c$, "getDefaultFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().defaultFont ();
});
c$.getDialogFont = Clazz.defineMethod (c$, "getDialogFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.dialogfont");
});
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (symbolicName) {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get (symbolicName);
}, "~S");
c$.getFontRegistry = Clazz.defineMethod (c$, "getFontRegistry", 
function () {
if (org.eclipse.jface.resource.JFaceResources.fontRegistry == null) {
($t$ = org.eclipse.jface.resource.JFaceResources.fontRegistry =  new org.eclipse.jface.resource.FontRegistry ("org.eclipse.jface.resource.jfacefonts"), org.eclipse.jface.resource.JFaceResources.prototype.fontRegistry = org.eclipse.jface.resource.JFaceResources.fontRegistry, $t$);
}return org.eclipse.jface.resource.JFaceResources.fontRegistry;
});
c$.getHeaderFont = Clazz.defineMethod (c$, "getHeaderFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.headerfont");
});
c$.getImage = Clazz.defineMethod (c$, "getImage", 
function (key) {
return org.eclipse.jface.resource.JFaceResources.getImageRegistry ().get (key);
}, "~S");
c$.getImageRegistry = Clazz.defineMethod (c$, "getImageRegistry", 
function () {
if (org.eclipse.jface.resource.JFaceResources.imageRegistry == null) ($t$ = org.eclipse.jface.resource.JFaceResources.imageRegistry =  new org.eclipse.jface.resource.ImageRegistry (org.eclipse.jface.resource.JFaceResources.getResources ($wt.widgets.Display.getCurrent ())), org.eclipse.jface.resource.JFaceResources.prototype.imageRegistry = org.eclipse.jface.resource.JFaceResources.imageRegistry, $t$);
return org.eclipse.jface.resource.JFaceResources.imageRegistry;
});
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key) {
try {
return org.eclipse.jface.resource.JFaceResources.bundle.getString (key);
} catch (e) {
if (Clazz.instanceOf (e, java.util.MissingResourceException)) {
return key;
} else {
throw e;
}
}
}, "~S");
c$.getStrings = Clazz.defineMethod (c$, "getStrings", 
function (keys) {
org.eclipse.jface.util.Assert.isNotNull (keys);
var length = keys.length;
var result =  new Array (length);
for (var i = 0; i < length; i++) result[i] = org.eclipse.jface.resource.JFaceResources.getString (keys[i]);

return result;
}, "~A");
c$.getTextFont = Clazz.defineMethod (c$, "getTextFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.textfont");
});
c$.getViewerFont = Clazz.defineMethod (c$, "getViewerFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.viewerfont");
});
c$.setFontRegistry = Clazz.defineMethod (c$, "setFontRegistry", 
function (registry) {
org.eclipse.jface.util.Assert.isTrue (org.eclipse.jface.resource.JFaceResources.fontRegistry == null, "Font registry can only be set once.");
($t$ = org.eclipse.jface.resource.JFaceResources.fontRegistry = registry, org.eclipse.jface.resource.JFaceResources.prototype.fontRegistry = org.eclipse.jface.resource.JFaceResources.fontRegistry, $t$);
}, "org.eclipse.jface.resource.FontRegistry");
c$.registries = c$.prototype.registries =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"BANNER_FONT", "org.eclipse.jface.bannerfont");
c$.bundle = c$.prototype.bundle = java.util.ResourceBundle.getBundle ("org.eclipse.jface.messages");
Clazz.defineStatics (c$,
"colorRegistry", null,
"DEFAULT_FONT", "org.eclipse.jface.defaultfont",
"DIALOG_FONT", "org.eclipse.jface.dialogfont",
"fontRegistry", null,
"HEADER_FONT", "org.eclipse.jface.headerfont",
"imageRegistry", null,
"TEXT_FONT", "org.eclipse.jface.textfont",
"VIEWER_FONT", "org.eclipse.jface.viewerfont",
"WINDOW_FONT", "org.eclipse.jface.windowfont");
});
