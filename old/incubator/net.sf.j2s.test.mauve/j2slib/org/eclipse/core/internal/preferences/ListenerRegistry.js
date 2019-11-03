Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (null, "org.eclipse.core.internal.preferences.ListenerRegistry", ["java.lang.NullPointerException", "org.eclipse.core.internal.runtime.ListenerList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.registry = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "ListenerRegistry");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.keys = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences.ListenerRegistry, "ListenerMap");
Clazz.makeConstructor (c$, 
function (a) {
this.keys =  new Array (a);
this.values =  new Array (a);
}, "~N");
Clazz.defineMethod (c$, "get", 
function (a) {
if (a == null) throw  new NullPointerException ();
for (var b = 0; b < this.keys.length; b++) if (a.equals (this.keys[b])) return this.values[b];

return null;
}, "~S");
Clazz.defineMethod (c$, "put", 
function (a, b) {
if (a == null) throw  new NullPointerException ();
if (b == null) {
this.remove (a);
return ;
}var c = -1;
for (var d = 0; d < this.keys.length; d++) {
var e = this.keys[d];
if (e == null) {
c = d;
continue ;}if (e.equals (a)) {
this.values[d] = b;
return ;
}}
if (c == -1) c = this.grow ();
this.keys[c] = a;
this.values[c] = b;
}, "~S,org.eclipse.core.internal.runtime.ListenerList");
Clazz.defineMethod (c$, "grow", 
($fz = function () {
var a = this.keys.length;
var b =  new Array (a + 10);
System.arraycopy (this.keys, 0, b, 0, a);
this.keys = b;
var c =  new Array (a + 10);
System.arraycopy (this.values, 0, c, 0, a);
this.values = c;
return a;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remove", 
function (a) {
if (a == null) throw  new NullPointerException ();
for (var b = 0; b < this.keys.length; b++) if (a.equals (this.keys[b])) {
this.keys[b] = null;
this.values[b] = null;
return ;
}
}, "~S");
Clazz.defineStatics (c$,
"GROW_SIZE", 10);
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.registry =  new org.eclipse.core.internal.preferences.ListenerRegistry.ListenerMap (25);
});
Clazz.defineMethod (c$, "getListeners", 
function (path) {
var list = this.registry.get (path);
return list == null ? org.eclipse.core.internal.preferences.ListenerRegistry.EMPTY_LIST : list.getListeners ();
}, "~S");
Clazz.defineMethod (c$, "add", 
function (path, listener) {
var list = this.registry.get (path);
if (list == null) list =  new org.eclipse.core.internal.runtime.ListenerList (1);
list.add (listener);
this.registry.put (path, list);
}, "~S,~O");
Clazz.defineMethod (c$, "remove", 
function (path, listener) {
var list = this.registry.get (path);
if (list == null) return ;
list.remove (listener);
if (list.isEmpty ()) this.registry.remove (path);
}, "~S,~O");
Clazz.defineMethod (c$, "clear", 
function (path) {
this.registry.remove (path);
}, "~S");
c$.EMPTY_LIST = c$.prototype.EMPTY_LIST =  new Array (0);
});
