Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (null, "org.eclipse.core.internal.preferences.LookupOrder", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.order = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "LookupOrder");
Clazz.makeConstructor (c$, 
function (order) {
for (var i = 0; i < order.length; i++) if (order[i] == null) throw  new IllegalArgumentException ();

this.order = order;
}, "~A");
Clazz.defineMethod (c$, "getOrder", 
function () {
return this.order;
});
});
