Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.resource.ResourceRegistry", ["org.eclipse.jface.util.PropertyChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ResourceRegistry");
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList ();
});
Clazz.defineMethod (c$, "addListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "fireMappingChanged", 
function (name, oldValue, newValue) {
var myListeners = this.listeners.getListeners ();
if (myListeners.length > 0) {
var event =  new org.eclipse.jface.util.PropertyChangeEvent (this, name, oldValue, newValue);
for (var i = 0; i < myListeners.length; ++i) {
try {
(myListeners[i]).propertyChange (event);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
});
