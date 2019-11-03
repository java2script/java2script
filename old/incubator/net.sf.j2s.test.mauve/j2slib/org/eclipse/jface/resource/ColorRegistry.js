Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ResourceRegistry", "java.util.ArrayList", "$.HashMap"], "org.eclipse.jface.resource.ColorRegistry", ["java.util.Collections", "org.eclipse.jface.resource.ColorDescriptor", "org.eclipse.jface.util.Assert", "$wt.graphics.Color", "$wt.widgets.Display"], function () {
c$ = Clazz.decorateAsClass (function () {
this.display = null;
this.staleColors = null;
this.stringToColor = null;
this.stringToRGB = null;
this.displayRunnable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ColorRegistry", org.eclipse.jface.resource.ResourceRegistry);
Clazz.prepareFields (c$, function () {
this.staleColors =  new java.util.ArrayList ();
this.stringToColor =  new java.util.HashMap (7);
this.stringToRGB =  new java.util.HashMap (7);
this.displayRunnable = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.ColorRegistry$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "ColorRegistry$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.resource.ColorRegistry"].clearCaches ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.ColorRegistry$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function () {
this.construct ($wt.widgets.Display.getCurrent (), true);
});
Clazz.makeConstructor (c$, 
function (display) {
this.construct (display, true);
}, "$wt.widgets.Display");
Clazz.makeConstructor (c$, 
function (display, cleanOnDisplayDisposal) {
Clazz.superConstructor (this, org.eclipse.jface.resource.ColorRegistry, []);
org.eclipse.jface.util.Assert.isNotNull (display);
this.display = display;
if (cleanOnDisplayDisposal) this.hookDisplayDispose ();
}, "$wt.widgets.Display,~B");
Clazz.defineMethod (c$, "createColor", 
($fz = function (rgb) {
return  new $wt.graphics.Color (this.display, rgb);
}, $fz.isPrivate = true, $fz), "$wt.graphics.RGB");
Clazz.defineMethod (c$, "disposeColors", 
($fz = function (iterator) {
while (iterator.hasNext ()) {
var next = iterator.next ();
(next).dispose ();
}
}, $fz.isPrivate = true, $fz), "java.util.Iterator");
Clazz.defineMethod (c$, "get", 
function (symbolicName) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
var result = this.stringToColor.get (symbolicName);
if (result != null) return result;
var color = null;
result = this.stringToRGB.get (symbolicName);
if (result == null) return null;
color = this.createColor (result);
this.stringToColor.put (symbolicName, color);
return color;
}, "~S");
Clazz.overrideMethod (c$, "getKeySet", 
function () {
return java.util.Collections.unmodifiableSet (this.stringToRGB.keySet ());
});
Clazz.defineMethod (c$, "getRGB", 
function (symbolicName) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
return this.stringToRGB.get (symbolicName);
}, "~S");
Clazz.defineMethod (c$, "getColorDescriptor", 
function (symbolicName) {
return org.eclipse.jface.resource.ColorDescriptor.createFrom (this.getRGB (symbolicName));
}, "~S");
Clazz.overrideMethod (c$, "clearCaches", 
function () {
this.disposeColors (this.stringToColor.values ().iterator ());
this.disposeColors (this.staleColors.iterator ());
this.stringToColor.clear ();
this.staleColors.clear ();
});
Clazz.overrideMethod (c$, "hasValueFor", 
function (colorKey) {
return this.stringToRGB.containsKey (colorKey);
}, "~S");
Clazz.defineMethod (c$, "hookDisplayDispose", 
($fz = function () {
this.display.disposeExec (this.displayRunnable);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "put", 
function (symbolicName, colorData) {
this.put (symbolicName, colorData, true);
}, "~S,$wt.graphics.RGB");
Clazz.defineMethod (c$, "put", 
($fz = function (symbolicName, colorData, update) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
org.eclipse.jface.util.Assert.isNotNull (colorData);
var existing = this.stringToRGB.get (symbolicName);
if (colorData.equals (existing)) return ;
var oldColor = this.stringToColor.remove (symbolicName);
this.stringToRGB.put (symbolicName, colorData);
if (update) this.fireMappingChanged (symbolicName, existing, colorData);
if (oldColor != null) this.staleColors.add (oldColor);
}, $fz.isPrivate = true, $fz), "~S,$wt.graphics.RGB,~B");
});
