Clazz.declarePackage ("java.util");
Clazz.load (["java.util.ResourceBundle"], "java.util.PropertyResourceBundle", ["java.lang.NullPointerException", "java.util.HashMap", "java.util.Properties", "sun.util.ResourceBundleEnumeration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lookup = null;
Clazz.instantialize (this, arguments);
}, java.util, "PropertyResourceBundle", java.util.ResourceBundle);
Clazz.makeConstructor (c$, 
function (stream) {
Clazz.superConstructor (this, java.util.PropertyResourceBundle, []);
this.setStream (stream);
}, "java.io.InputStream");
Clazz.defineMethod (c$, "setStream", 
function (stream) {
var properties =  new java.util.Properties ();
properties.load (stream);
this.lookup =  new java.util.HashMap (properties);
return this;
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function (reader) {
Clazz.superConstructor (this, java.util.PropertyResourceBundle, []);
var properties =  new java.util.Properties ();
properties.load (reader);
this.lookup =  new java.util.HashMap (properties);
}, "java.io.Reader");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.PropertyResourceBundle, []);
});
Clazz.overrideMethod (c$, "handleGetObject", 
function (key) {
if (key == null) {
throw  new NullPointerException ();
}return this.lookup.get (key);
}, "~S");
Clazz.defineMethod (c$, "getKeys", 
function () {
var parent = this.parent;
return  new sun.util.ResourceBundleEnumeration (this.lookup.keySet (), (parent != null) ? parent.getKeys () : null);
});
Clazz.overrideMethod (c$, "handleKeySet", 
function () {
return this.lookup.keySet ();
});
});
