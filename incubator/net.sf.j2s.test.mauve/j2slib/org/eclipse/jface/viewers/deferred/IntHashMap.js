Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (null, "org.eclipse.jface.viewers.deferred.IntHashMap", ["java.util.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.map = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "IntHashMap");
Clazz.makeConstructor (c$, 
function (size, loadFactor) {
this.map =  new java.util.HashMap (size, loadFactor);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function () {
this.map =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "remove", 
function (key) {
this.map.remove (key);
}, "~O");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.map.put (key,  new Integer (value));
}, "~O,~N");
Clazz.defineMethod (c$, "get", 
function (key) {
return this.get (key, 0);
}, "~O");
Clazz.defineMethod (c$, "get", 
function (key, defaultValue) {
var result = this.map.get (key);
if (result != null) {
return result.intValue ();
}return defaultValue;
}, "~O,~N");
Clazz.defineMethod (c$, "containsKey", 
function (key) {
return this.map.containsKey (key);
}, "~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.map.size ();
});
});
