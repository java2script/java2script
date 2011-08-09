Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.ListenerList", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.compareMode = 0;
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "ListenerList");
Clazz.prepareFields (c$, function () {
this.listeners = org.eclipse.core.internal.runtime.ListenerList.EmptyArray;
});
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (mode) {
this.compareMode = mode;
}, "~N");
Clazz.defineMethod (c$, "add", 
function (listener) {
if (listener == null) throw  new IllegalArgumentException ();
var oldSize = this.listeners.length;
for (var i = 0; i < oldSize; ++i) if (this.same (listener, this.listeners[i])) return ;

var newListeners =  new Array (oldSize + 1);
System.arraycopy (this.listeners, 0, newListeners, 0, oldSize);
newListeners[oldSize] = listener;
this.listeners = newListeners;
}, "~O");
Clazz.defineMethod (c$, "getListeners", 
function () {
return this.listeners;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.listeners.length == 0;
});
Clazz.defineMethod (c$, "remove", 
function (listener) {
if (listener == null) throw  new IllegalArgumentException ();
var oldSize = this.listeners.length;
for (var i = 0; i < oldSize; ++i) {
if (this.same (listener, this.listeners[i])) {
if (oldSize == 1) {
this.listeners = org.eclipse.core.internal.runtime.ListenerList.EmptyArray;
} else {
var newListeners =  new Array (oldSize - 1);
System.arraycopy (this.listeners, 0, newListeners, 0, i);
System.arraycopy (this.listeners, i + 1, newListeners, i, oldSize - i - 1);
this.listeners = newListeners;
}return ;
}}
}, "~O");
Clazz.defineMethod (c$, "same", 
($fz = function (listener1, listener2) {
return this.compareMode == 1 ? listener1 === listener2 : listener1.equals (listener2);
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.listeners.length;
});
c$.EmptyArray = c$.prototype.EmptyArray =  new Array (0);
Clazz.defineStatics (c$,
"EQUALITY", 0,
"IDENTITY", 1);
});
