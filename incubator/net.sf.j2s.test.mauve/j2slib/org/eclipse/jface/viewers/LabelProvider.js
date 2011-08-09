Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.ILabelProvider", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.LabelProvider", ["org.eclipse.jface.util.SafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "LabelProvider", null, org.eclipse.jface.viewers.ILabelProvider);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.viewers.ILabelProviderListener");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "fireLabelProviderChanged", 
function (event) {
var listeners = this.listeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.LabelProvider$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "LabelProvider$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.labelProviderChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.LabelProvider$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.LabelProviderChangedEvent");
Clazz.overrideMethod (c$, "getImage", 
function (element) {
return null;
}, "~O");
Clazz.overrideMethod (c$, "getText", 
function (element) {
return element == null ? "" : element.toString ();
}, "~O");
Clazz.overrideMethod (c$, "isLabelProperty", 
function (element, property) {
return true;
}, "~O,~S");
Clazz.overrideMethod (c$, "removeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.viewers.ILabelProviderListener");
});
