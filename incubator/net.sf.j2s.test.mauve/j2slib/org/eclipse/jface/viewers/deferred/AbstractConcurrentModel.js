Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["org.eclipse.jface.viewers.deferred.IConcurrentModel", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.deferred.AbstractConcurrentModel", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "AbstractConcurrentModel", null, org.eclipse.jface.viewers.deferred.IConcurrentModel);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList ();
});
Clazz.overrideMethod (c$, "addListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.viewers.deferred.IConcurrentModelListener");
Clazz.defineMethod (c$, "fireAdd", 
function (added) {
var listenerArray = this.listeners.getListeners ();
for (var i = 0; i < listenerArray.length; i++) {
var next = listenerArray[i];
next.add (added);
}
}, "~A");
Clazz.defineMethod (c$, "fireRemove", 
function (removed) {
var listenerArray = this.listeners.getListeners ();
for (var i = 0; i < listenerArray.length; i++) {
var next = listenerArray[i];
next.remove (removed);
}
}, "~A");
Clazz.defineMethod (c$, "fireUpdate", 
function (updated) {
var listenerArray = this.listeners.getListeners ();
for (var i = 0; i < listenerArray.length; i++) {
var next = listenerArray[i];
next.update (updated);
}
}, "~A");
Clazz.defineMethod (c$, "getListeners", 
function () {
var l = this.listeners.getListeners ();
var result =  new Array (l.length);
for (var i = 0; i < l.length; i++) {
result[i] = l[i];
}
return result;
});
Clazz.overrideMethod (c$, "removeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.viewers.deferred.IConcurrentModelListener");
});
