Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ColorDescriptor"], "org.eclipse.jface.resource.RGBColorDescriptor", ["$wt.graphics.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.color = null;
this.originalColor = null;
this.originalDevice = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "RGBColorDescriptor", org.eclipse.jface.resource.ColorDescriptor);
Clazz.makeConstructor (c$, 
function (color) {
Clazz.superConstructor (this, org.eclipse.jface.resource.RGBColorDescriptor, []);
this.color = color;
}, "$wt.graphics.RGB");
Clazz.makeConstructor (c$, 
function (originalColor, originalDevice) {
this.construct (originalColor.getRGB ());
this.originalColor = originalColor;
this.originalDevice = originalDevice;
}, "$wt.graphics.Color,$wt.graphics.Device");
Clazz.makeConstructor (c$, 
function (originalColor) {
this.construct (originalColor.getRGB ());
this.originalColor = originalColor;
}, "$wt.graphics.Color");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, org.eclipse.jface.resource.RGBColorDescriptor)) {
var other = obj;
return other.color.equals (this.color) && other.originalColor === this.originalColor;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.color.hashCode ();
});
Clazz.overrideMethod (c$, "createColor", 
function (device) {
if (this.originalColor != null) {
if (this.originalDevice == null) {
var result =  new $wt.graphics.Color (device, this.color);
if (result.equals (this.originalColor)) {
result.dispose ();
this.originalDevice = device;
return this.originalColor;
}return result;
}if (this.originalDevice === device) {
return this.originalColor;
}}return  new $wt.graphics.Color (device, this.color);
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "destroyColor", 
function (toDestroy) {
if (toDestroy === this.originalColor) {
return ;
}toDestroy.dispose ();
}, "$wt.graphics.Color");
});
