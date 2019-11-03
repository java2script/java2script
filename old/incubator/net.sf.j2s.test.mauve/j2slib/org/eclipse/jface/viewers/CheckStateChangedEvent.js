Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.CheckStateChangedEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.element = null;
this.state = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CheckStateChangedEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, element, state) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.CheckStateChangedEvent, [source]);
this.element = element;
this.state = state;
}, "org.eclipse.jface.viewers.ICheckable,~O,~B");
Clazz.defineMethod (c$, "getCheckable", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "getChecked", 
function () {
return this.state;
});
Clazz.defineMethod (c$, "getElement", 
function () {
return this.element;
});
});
