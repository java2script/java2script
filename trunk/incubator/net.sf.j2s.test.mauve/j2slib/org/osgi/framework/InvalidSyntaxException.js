Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.lang.Exception"], "org.osgi.framework.InvalidSyntaxException", ["java.lang.IllegalStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.filter = null;
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "InvalidSyntaxException", Exception);
Clazz.makeConstructor (c$, 
function (msg, filter) {
Clazz.superConstructor (this, org.osgi.framework.InvalidSyntaxException, [msg]);
this.filter = filter;
this.$cause = null;
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (msg, filter, cause) {
Clazz.superConstructor (this, org.osgi.framework.InvalidSyntaxException, [msg]);
this.filter = filter;
this.$cause = cause;
}, "~S,~S,Throwable");
Clazz.defineMethod (c$, "getFilter", 
function () {
return this.filter;
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
