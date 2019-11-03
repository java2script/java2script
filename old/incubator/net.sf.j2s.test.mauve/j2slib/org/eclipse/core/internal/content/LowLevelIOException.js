Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["java.io.IOException"], "org.eclipse.core.internal.content.LowLevelIOException", ["org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.actual = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "LowLevelIOException", java.io.IOException);
Clazz.makeConstructor (c$, 
function (actual) {
Clazz.superConstructor (this, org.eclipse.core.internal.content.LowLevelIOException, []);
org.eclipse.core.internal.runtime.Assert.isLegal (!(Clazz.instanceOf (actual, org.eclipse.core.internal.content.LowLevelIOException)));
this.actual = actual;
}, "java.io.IOException");
Clazz.defineMethod (c$, "getActualException", 
function () {
return this.actual;
});
});
