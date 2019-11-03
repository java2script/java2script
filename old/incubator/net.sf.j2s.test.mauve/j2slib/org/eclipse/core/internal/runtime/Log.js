Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.ILog", "java.util.HashSet"], "org.eclipse.core.internal.runtime.Log", ["org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.ISafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.logListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "Log", null, org.eclipse.core.runtime.ILog);
Clazz.prepareFields (c$, function () {
this.logListeners =  new java.util.HashSet (5);
});
Clazz.makeConstructor (c$, 
function (plugin) {
this.bundle = plugin;
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "addLogListener", 
function (listener) {
{
this.logListeners.add (listener);
}}, "org.eclipse.core.runtime.ILogListener");
Clazz.overrideMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.overrideMethod (c$, "log", 
function (status) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
var listeners;
{
listeners = this.logListeners.toArray ( new Array (this.logListeners.size ()));
}for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
var code = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.runtime.Log$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.runtime, "Log$1", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.listener.logging (this.f$.status, this.b$["org.eclipse.core.internal.runtime.Log"].bundle.getSymbolicName ());
});
Clazz.overrideMethod (c$, "handleException", 
function (e) {
}, "Throwable");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.runtime.Log$1, i$, v$);
}) (this, Clazz.cloneFinals ("listener", listener, "status", status));
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().run (code);
}
}, "org.eclipse.core.runtime.IStatus");
Clazz.overrideMethod (c$, "removeLogListener", 
function (listener) {
{
this.logListeners.remove (listener);
}}, "org.eclipse.core.runtime.ILogListener");
});
