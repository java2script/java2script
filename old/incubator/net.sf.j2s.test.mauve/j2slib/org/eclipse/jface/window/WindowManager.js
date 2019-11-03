Clazz.declarePackage ("org.eclipse.jface.window");
Clazz.load (["java.util.ArrayList"], "org.eclipse.jface.window.WindowManager", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windows = null;
this.subManagers = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.window, "WindowManager");
Clazz.prepareFields (c$, function () {
this.windows =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (parent) {
org.eclipse.jface.util.Assert.isNotNull (parent);
parent.addWindowManager (this);
}, "org.eclipse.jface.window.WindowManager");
Clazz.defineMethod (c$, "add", 
function (window) {
if (!this.windows.contains (window)) {
this.windows.add (window);
window.setWindowManager (this);
}}, "org.eclipse.jface.window.Window");
Clazz.defineMethod (c$, "addWindowManager", 
($fz = function (wm) {
if (this.subManagers == null) this.subManagers =  new java.util.ArrayList ();
if (!this.subManagers.contains (wm)) {
this.subManagers.add (wm);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.window.WindowManager");
Clazz.defineMethod (c$, "close", 
function () {
var t = this.windows.clone ();
var e = t.iterator ();
while (e.hasNext ()) {
var window = e.next ();
var closed = window.close ();
if (!closed) return false;
}
if (this.subManagers != null) {
e = this.subManagers.iterator ();
while (e.hasNext ()) {
var wm = e.next ();
var closed = wm.close ();
if (!closed) return false;
}
}return true;
});
Clazz.defineMethod (c$, "getWindowCount", 
function () {
return this.windows.size ();
});
Clazz.defineMethod (c$, "getWindows", 
function () {
var bs =  new Array (this.windows.size ());
this.windows.toArray (bs);
return bs;
});
Clazz.defineMethod (c$, "remove", 
function (window) {
if (this.windows.contains (window)) {
this.windows.remove (window);
window.setWindowManager (null);
}}, "org.eclipse.jface.window.Window");
});
