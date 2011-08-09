Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.FontDescriptor"], "org.eclipse.jface.resource.NamedFontDescriptor", ["$wt.graphics.Font"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "NamedFontDescriptor", org.eclipse.jface.resource.FontDescriptor);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.eclipse.jface.resource.NamedFontDescriptor, []);
this.data = data;
}, "$wt.graphics.FontData");
Clazz.overrideMethod (c$, "createFont", 
function (device) {
return  new $wt.graphics.Font (device, this.data);
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if ((obj.getClass () === org.eclipse.jface.resource.NamedFontDescriptor)) {
var descr = obj;
return this.data.equals (descr.data);
}return Clazz.superCall (this, org.eclipse.jface.resource.NamedFontDescriptor, "equals", [obj]);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.data.hashCode ();
});
Clazz.overrideMethod (c$, "destroyFont", 
function (previouslyCreatedFont) {
previouslyCreatedFont.dispose ();
}, "$wt.graphics.Font");
});
