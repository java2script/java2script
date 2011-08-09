Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.io.InputStream"], "org.eclipse.osgi.framework.internal.core.ReferenceInputStream", ["java.io.IOException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reference = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ReferenceInputStream", java.io.InputStream);
Clazz.makeConstructor (c$, 
function (reference) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.ReferenceInputStream, []);
this.reference = reference;
}, "java.net.URL");
Clazz.defineMethod (c$, "read", 
function () {
throw  new java.io.IOException ();
});
Clazz.defineMethod (c$, "getReference", 
function () {
return this.reference;
});
});
