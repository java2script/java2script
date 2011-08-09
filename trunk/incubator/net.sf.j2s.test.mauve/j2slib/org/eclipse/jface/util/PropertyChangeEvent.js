Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.util.PropertyChangeEvent", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyName = null;
this.oldValue = null;
this.newValue = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "PropertyChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, property, oldValue, newValue) {
Clazz.superConstructor (this, org.eclipse.jface.util.PropertyChangeEvent, [source]);
org.eclipse.jface.util.Assert.isNotNull (property);
this.propertyName = property;
this.oldValue = oldValue;
this.newValue = newValue;
}, "~O,~S,~O,~O");
Clazz.defineMethod (c$, "getNewValue", 
function () {
return this.newValue;
});
Clazz.defineMethod (c$, "getOldValue", 
function () {
return this.oldValue;
});
Clazz.defineMethod (c$, "getProperty", 
function () {
return this.propertyName;
});
});
