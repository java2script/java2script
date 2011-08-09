Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["org.eclipse.jface.viewers.deferred.AbstractConcurrentModel", "java.util.HashSet"], "org.eclipse.jface.viewers.deferred.SetModel", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "SetModel", org.eclipse.jface.viewers.deferred.AbstractConcurrentModel);
Clazz.prepareFields (c$, function () {
this.data =  new java.util.HashSet ();
});
Clazz.defineMethod (c$, "getElements", 
function () {
return this.data.toArray ();
});
Clazz.defineMethod (c$, "set", 
function (newContents) {
org.eclipse.jface.util.Assert.isNotNull (newContents);
this.data.clear ();
for (var i = 0; i < newContents.length; i++) {
var object = newContents[i];
this.data.add (object);
}
var listeners = this.getListeners ();
for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
listener.setContents (newContents);
}
}, "~A");
Clazz.defineMethod (c$, "clear", 
function () {
var removed = this.data.toArray ();
this.data.clear ();
this.fireRemove (removed);
});
Clazz.defineMethod (c$, "addAll", 
function (toAdd) {
org.eclipse.jface.util.Assert.isNotNull (toAdd);
for (var i = 0; i < toAdd.length; i++) {
var object = toAdd[i];
this.data.add (object);
}
this.fireAdd (toAdd);
}, "~A");
Clazz.defineMethod (c$, "addAll", 
function (toAdd) {
org.eclipse.jface.util.Assert.isNotNull (toAdd);
this.addAll (toAdd.toArray ());
}, "java.util.Collection");
Clazz.defineMethod (c$, "changeAll", 
function (changed) {
org.eclipse.jface.util.Assert.isNotNull (changed);
this.fireUpdate (changed);
}, "~A");
Clazz.defineMethod (c$, "removeAll", 
function (toRemove) {
org.eclipse.jface.util.Assert.isNotNull (toRemove);
for (var i = 0; i < toRemove.length; i++) {
var object = toRemove[i];
this.data.add (object);
}
this.fireRemove (toRemove);
}, "~A");
Clazz.overrideMethod (c$, "requestUpdate", 
function (listener) {
org.eclipse.jface.util.Assert.isNotNull (listener);
listener.setContents (this.getElements ());
}, "org.eclipse.jface.viewers.deferred.IConcurrentModelListener");
});
