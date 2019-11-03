Clazz.declarePackage ("org.osgi.service.prefs");
Clazz.load (["java.lang.Exception"], "org.osgi.service.prefs.BackingStoreException", ["java.lang.IllegalStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.osgi.service.prefs, "BackingStoreException", Exception);
Clazz.makeConstructor (c$, 
function (s, cause) {
Clazz.superConstructor (this, org.osgi.service.prefs.BackingStoreException, [s]);
this.$cause = cause;
}, "~S,Throwable");
Clazz.overrideMethod (c$, "getCause", 
function () {
return this.$cause;
});
Clazz.overrideMethod (c$, "initCause", 
function (cause) {
throw  new IllegalStateException ();
}, "Throwable");
});
