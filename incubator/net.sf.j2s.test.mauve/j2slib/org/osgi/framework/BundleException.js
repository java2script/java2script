Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.lang.Exception"], "org.osgi.framework.BundleException", ["java.lang.IllegalStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "BundleException", Exception);
Clazz.makeConstructor (c$, 
function (msg, cause) {
Clazz.superConstructor (this, org.osgi.framework.BundleException, [msg]);
this.$cause = cause;
}, "~S,Throwable");
Clazz.makeConstructor (c$, 
function (msg) {
Clazz.superConstructor (this, org.osgi.framework.BundleException, [msg]);
this.$cause = null;
}, "~S");
Clazz.defineMethod (c$, "getNestedException", 
function () {
return this.$cause;
});
Clazz.overrideMethod (c$, "getCause", 
function () {
return this.$cause;
});
Clazz.overrideMethod (c$, "initCause", 
function (cause) {
throw  new IllegalStateException ();
}, "Throwable");
});
