Clazz.declarePackage ("java.beans");
Clazz.load (["java.util.EventObject"], "java.beans.PropertyChangeEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyName = null;
this.newValue = null;
this.oldValue = null;
this.propagationId = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, propertyName, oldValue, newValue) {
Clazz.superConstructor (this, java.beans.PropertyChangeEvent, [source]);
this.propertyName = propertyName;
this.newValue = newValue;
this.oldValue = oldValue;
}, "~O,~S,~O,~O");
Clazz.defineMethod (c$, "getPropertyName", 
function () {
return this.propertyName;
});
Clazz.defineMethod (c$, "getNewValue", 
function () {
return this.newValue;
});
Clazz.defineMethod (c$, "getOldValue", 
function () {
return this.oldValue;
});
Clazz.defineMethod (c$, "setPropagationId", 
function (propagationId) {
this.propagationId = propagationId;
}, "~O");
Clazz.defineMethod (c$, "getPropagationId", 
function () {
return this.propagationId;
});
});
