Clazz.declarePackage ("java.beans");
Clazz.load (["java.lang.Exception"], "java.beans.PropertyVetoException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.evt = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyVetoException", Exception);
Clazz.makeConstructor (c$, 
function (mess, evt) {
Clazz.superConstructor (this, java.beans.PropertyVetoException, [mess]);
this.evt = evt;
}, "~S,java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "getPropertyChangeEvent", 
function () {
return this.evt;
});
});
