Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["$wt.dnd.DragSourceListener", "java.util.ArrayList"], "org.eclipse.jface.util.DelegatingDragAdapter", ["org.eclipse.jface.util.SafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.activeListeners = null;
this.currentListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "DelegatingDragAdapter", null, $wt.dnd.DragSourceListener);
Clazz.prepareFields (c$, function () {
this.listeners =  new java.util.ArrayList ();
this.activeListeners =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addDragSourceListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.TransferDragSourceListener");
Clazz.defineMethod (c$, "dragFinished", 
function (event) {
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDragAdapter$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDragAdapter$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
if (this.b$["org.eclipse.jface.util.DelegatingDragAdapter"].currentListener != null) {
this.b$["org.eclipse.jface.util.DelegatingDragAdapter"].currentListener.dragFinished (this.f$.event);
} else {
var iterator = this.b$["org.eclipse.jface.util.DelegatingDragAdapter"].activeListeners.iterator ();
while (iterator.hasNext ()) (iterator.next ()).dragFinished (this.f$.event);

}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDragAdapter$1, i$, v$);
}) (this, Clazz.cloneFinals ("event", event)));
this.currentListener = null;
this.activeListeners.clear ();
}, "$wt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "dragSetData", 
function (event) {
this.updateCurrentListener (event);
if (this.currentListener != null) {
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDragAdapter$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDragAdapter$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.util.DelegatingDragAdapter"].currentListener.dragSetData (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDragAdapter$2, i$, v$);
}) (this, Clazz.cloneFinals ("event", event)));
}}, "$wt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "dragStart", 
function (event) {
var doit = false;
var transfers =  new java.util.ArrayList (this.listeners.size ());
this.activeListeners.clear ();
for (var i = 0; i < this.listeners.size (); i++) {
var listener = this.listeners.get (i);
event.doit = true;
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDragAdapter$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDragAdapter$3", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.listener.dragStart (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDragAdapter$3, i$, v$);
}) (this, Clazz.cloneFinals ("listener", listener, "event", event)));
if (event.doit) {
transfers.add (listener.getTransfer ());
this.activeListeners.add (listener);
}doit = new Boolean (doit | event.doit).valueOf ();
}
if (doit) (event.widget).setTransfer (transfers.toArray ( new Array (transfers.size ())));
event.doit = doit;
}, "$wt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "getTransfers", 
function () {
var types =  new Array (this.listeners.size ());
for (var i = 0; i < this.listeners.size (); i++) {
var listener = this.listeners.get (i);
types[i] = listener.getTransfer ();
}
return types;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.listeners.isEmpty ();
});
Clazz.defineMethod (c$, "removeDragSourceListener", 
function (listener) {
this.listeners.remove (listener);
if (this.currentListener === listener) this.currentListener = null;
if (this.activeListeners.contains (listener)) this.activeListeners.remove (listener);
}, "org.eclipse.jface.util.TransferDragSourceListener");
Clazz.defineMethod (c$, "updateCurrentListener", 
($fz = function (event) {
this.currentListener = null;
if (event.dataType == null) return ;
var iterator = this.activeListeners.iterator ();
while (iterator.hasNext ()) {
var listener = iterator.next ();
if (listener.getTransfer ().isSupportedType (event.dataType)) {
this.currentListener = listener;
return ;
}}
}, $fz.isPrivate = true, $fz), "$wt.dnd.DragSourceEvent");
});
