Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.FontDescriptor"], "org.eclipse.jface.resource.ArrayFontDescriptor", ["$wt.graphics.Font"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.originalFont = null;
this.originalDevice = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ArrayFontDescriptor", org.eclipse.jface.resource.FontDescriptor);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.eclipse.jface.resource.ArrayFontDescriptor, []);
this.data = data;
}, "~A");
Clazz.makeConstructor (c$, 
function (originalFont) {
this.construct (originalFont.getFontData ());
this.originalFont = originalFont;
}, "$wt.graphics.Font");
Clazz.makeConstructor (c$, 
function (originalFont, originalDevice) {
this.construct (originalFont);
this.originalDevice = originalDevice;
}, "$wt.graphics.Font,$wt.graphics.Device");
Clazz.overrideMethod (c$, "createFont", 
function (device) {
if (this.originalFont != null) {
if (this.originalDevice == null) {
var result =  new $wt.graphics.Font (device, this.data);
if (result.equals (this.originalFont)) {
result.dispose ();
this.originalDevice = device;
return this.originalFont;
}return result;
}if (this.originalDevice === device) {
return this.originalFont;
}}return  new $wt.graphics.Font (device, this.data);
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if ((obj.getClass () === org.eclipse.jface.resource.ArrayFontDescriptor)) {
var descr = obj;
if (descr.originalFont !== this.originalFont) {
return false;
}if (this.originalFont != null) {
return true;
}if (this.data.length != descr.data.length) {
return false;
}for (var i = 0; i < this.data.length; i++) {
var fd = this.data[i];
var fd2 = descr.data[i];
if (!fd.equals (fd2)) {
return false;
}}
return true;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.originalFont != null) {
return this.originalFont.hashCode ();
}var code = 0;
for (var i = 0; i < this.data.length; i++) {
var fd = this.data[i];
code += fd.hashCode ();
}
return code;
});
Clazz.overrideMethod (c$, "destroyFont", 
function (previouslyCreatedFont) {
if (previouslyCreatedFont === this.originalFont) {
return ;
}previouslyCreatedFont.dispose ();
}, "$wt.graphics.Font");
});
