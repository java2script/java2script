Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["org.eclipse.core.runtime.ISafeRunnable"], "org.eclipse.jface.util.SafeRunnable", ["org.eclipse.jface.dialogs.MessageDialog", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.ISafeRunnableRunner"], function () {
c$ = Clazz.decorateAsClass (function () {
this.message = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "SafeRunnable", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (message) {
this.message = message;
}, "~S");
Clazz.defineMethod (c$, "handleException", 
function (e) {
if (!org.eclipse.jface.util.SafeRunnable.ignoreErrors) {
if (this.message == null) this.message = org.eclipse.jface.resource.JFaceResources.getString ("SafeRunnable.errorMessage");
org.eclipse.jface.dialogs.MessageDialog.openError (null, org.eclipse.jface.resource.JFaceResources.getString ("Error"), this.message);
}}, "Throwable");
c$.getIgnoreErrors = Clazz.defineMethod (c$, "getIgnoreErrors", 
function (flag) {
return org.eclipse.jface.util.SafeRunnable.ignoreErrors;
}, "~B");
c$.getIgnoreErrors = Clazz.defineMethod (c$, "getIgnoreErrors", 
function () {
return org.eclipse.jface.util.SafeRunnable.ignoreErrors;
});
c$.setIgnoreErrors = Clazz.defineMethod (c$, "setIgnoreErrors", 
function (flag) {
($t$ = org.eclipse.jface.util.SafeRunnable.ignoreErrors = flag, org.eclipse.jface.util.SafeRunnable.prototype.ignoreErrors = org.eclipse.jface.util.SafeRunnable.ignoreErrors, $t$);
}, "~B");
c$.getRunner = Clazz.defineMethod (c$, "getRunner", 
function () {
if (org.eclipse.jface.util.SafeRunnable.runner == null) {
($t$ = org.eclipse.jface.util.SafeRunnable.runner = org.eclipse.jface.util.SafeRunnable.createDefaultRunner (), org.eclipse.jface.util.SafeRunnable.prototype.runner = org.eclipse.jface.util.SafeRunnable.runner, $t$);
}return org.eclipse.jface.util.SafeRunnable.runner;
});
c$.createDefaultRunner = Clazz.defineMethod (c$, "createDefaultRunner", 
($fz = function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.SafeRunnable$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "SafeRunnable$1", null, org.eclipse.jface.util.ISafeRunnableRunner);
Clazz.defineMethod (c$, "run", 
function (code) {
try {
code.run ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.handleException (code, e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
this.handleException (code, e);
}
} else {
throw e$$;
}
}
}, "org.eclipse.core.runtime.ISafeRunnable");
Clazz.defineMethod (c$, "handleException", 
($fz = function (code, e) {
if (!(Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException))) {
e.printStackTrace ();
}code.handleException (e);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.ISafeRunnable,Throwable");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.SafeRunnable$1, i$, v$);
}) (this, null);
}, $fz.isPrivate = true, $fz));
c$.setRunner = Clazz.defineMethod (c$, "setRunner", 
function (runner) {
($t$ = org.eclipse.jface.util.SafeRunnable.runner = runner, org.eclipse.jface.util.SafeRunnable.prototype.runner = org.eclipse.jface.util.SafeRunnable.runner, $t$);
}, "org.eclipse.jface.util.ISafeRunnableRunner");
c$.run = Clazz.defineMethod (c$, "run", 
function (runnable) {
org.eclipse.jface.util.SafeRunnable.getRunner ().run (runnable);
}, "org.eclipse.core.runtime.ISafeRunnable");
Clazz.defineStatics (c$,
"ignoreErrors", false,
"runner", null);
});
