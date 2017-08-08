Clazz.declarePackage ("java.beans");
Clazz.load (["java.util.EventListenerProxy", "java.beans.PropertyChangeListener"], "java.beans.PropertyChangeListenerProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyName = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyChangeListenerProxy", java.util.EventListenerProxy, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (propertyName, listener) {
Clazz.superConstructor (this, java.beans.PropertyChangeListenerProxy, [listener]);
this.propertyName = propertyName;
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "propertyChange", 
function (evt) {
(this.getListener ()).propertyChange (evt);
}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "getPropertyName", 
function () {
return this.propertyName;
});
});
