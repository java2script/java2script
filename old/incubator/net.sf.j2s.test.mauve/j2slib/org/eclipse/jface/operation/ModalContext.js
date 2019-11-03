Clazz.declarePackage ("org.eclipse.jface.operation");
Clazz.load (["java.lang.Thread"], "org.eclipse.jface.operation.ModalContext", ["java.lang.InterruptedException", "java.lang.reflect.InvocationTargetException", "org.eclipse.jface.operation.AccumulatingProgressMonitor", "org.eclipse.jface.util.Assert", "$wt.widgets.Display"], function () {
c$ = Clazz.declareType (org.eclipse.jface.operation, "ModalContext");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.runnable = null;
this.throwable = null;
this.progressMonitor = null;
this.display = null;
this.continueEventDispatching = true;
this.callingThread = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.operation.ModalContext, "ModalContextThread", Thread);
Clazz.makeConstructor (c$, 
($fz = function (a, b, c) {
Clazz.superConstructor (this, org.eclipse.jface.operation.ModalContext.ModalContextThread, ["ModalContext"]);
org.eclipse.jface.util.Assert.isTrue (b != null && c != null);
this.runnable = a;
this.progressMonitor =  new org.eclipse.jface.operation.AccumulatingProgressMonitor (b, c);
this.display = c;
this.callingThread = Thread.currentThread ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.operation.IRunnableWithProgress,org.eclipse.core.runtime.IProgressMonitor,$wt.widgets.Display");
Clazz.overrideMethod (c$, "run", 
function () {
try {
if (this.runnable != null) this.runnable.run (this.progressMonitor);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
this.throwable = e;
}
} else if (Clazz.instanceOf (e$$, InterruptedException)) {
var e = e$$;
{
this.throwable = e;
}
} else if (Clazz.instanceOf (e$$, RuntimeException)) {
var e = e$$;
{
this.throwable = e;
}
} else if (Clazz.instanceOf (e$$, ThreadDeath)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
this.throwable = e;
}
} else {
throw e$$;
}
} finally {
if (Clazz.instanceOf (this.runnable, org.eclipse.jface.operation.IThreadListener)) (this.runnable).threadChange (this.callingThread);
this.display.syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.operation.ModalContext.ModalContextThread$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation.ModalContext, "ModalContextThread$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.operation.ModalContext.ModalContextThread$1, i$, v$);
}) (this, null));
this.continueEventDispatching = false;
this.display.asyncExec (null);
}
});
Clazz.defineMethod (c$, "block", 
function () {
if (this.display === $wt.widgets.Display.getCurrent ()) {
while (this.continueEventDispatching) {
if (!this.display.readAndDispatch ()) this.display.sleep ();
}
} else {
try {
this.join ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
this.throwable = e;
} else {
throw e;
}
}
}});
c$ = Clazz.p0p ();
c$.canProgressMonitorBeUsed = Clazz.defineMethod (c$, "canProgressMonitorBeUsed", 
function (monitor1, monitor2) {
if (monitor1 === monitor2) return true;
while (Clazz.instanceOf (monitor1, org.eclipse.core.runtime.ProgressMonitorWrapper)) {
monitor1 = (monitor1).getWrappedProgressMonitor ();
if (monitor1 === monitor2) return true;
}
return false;
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IProgressMonitor");
c$.checkCanceled = Clazz.defineMethod (c$, "checkCanceled", 
function (monitor) {
if (monitor.isCanceled ()) throw  new InterruptedException ();
}, "org.eclipse.core.runtime.IProgressMonitor");
c$.getCurrentModalContextThread = Clazz.defineMethod (c$, "getCurrentModalContextThread", 
($fz = function () {
var t = Thread.currentThread ();
if (Clazz.instanceOf (t, org.eclipse.jface.operation.ModalContext.ModalContextThread)) return t;
return null;
}, $fz.isPrivate = true, $fz));
c$.getModalLevel = Clazz.defineMethod (c$, "getModalLevel", 
function () {
return org.eclipse.jface.operation.ModalContext.modalLevel;
});
c$.isModalContextThread = Clazz.defineMethod (c$, "isModalContextThread", 
function (thread) {
return Clazz.instanceOf (thread, org.eclipse.jface.operation.ModalContext.ModalContextThread);
}, "Thread");
c$.run = Clazz.defineMethod (c$, "run", 
function (operation, fork, monitor, display) {
org.eclipse.jface.util.Assert.isTrue (operation != null && monitor != null);
($t$ = org.eclipse.jface.operation.ModalContext.modalLevel ++, org.eclipse.jface.operation.ModalContext.prototype.modalLevel = org.eclipse.jface.operation.ModalContext.modalLevel, $t$);
try {
if (monitor != null) monitor.setCanceled (false);
if (!fork || !org.eclipse.jface.operation.ModalContext.runInSeparateThread) {
org.eclipse.jface.operation.ModalContext.runInCurrentThread (operation, monitor);
} else {
var t = org.eclipse.jface.operation.ModalContext.getCurrentModalContextThread ();
if (t != null) {
org.eclipse.jface.util.Assert.isTrue (org.eclipse.jface.operation.ModalContext.canProgressMonitorBeUsed (monitor, t.progressMonitor));
org.eclipse.jface.operation.ModalContext.runInCurrentThread (operation, monitor);
} else {
t =  new org.eclipse.jface.operation.ModalContext.ModalContextThread (operation, monitor, display);
if (Clazz.instanceOf (operation, org.eclipse.jface.operation.IThreadListener)) (operation).threadChange (t);
t.start ();
t.block ();
var throwable = t.throwable;
if (throwable != null) {
if (org.eclipse.jface.operation.ModalContext.debug && !(Clazz.instanceOf (throwable, InterruptedException)) && !(Clazz.instanceOf (throwable, org.eclipse.core.runtime.OperationCanceledException))) {
System.err.println ("Exception in modal context operation:");
throwable.printStackTrace ();
System.err.println ("Called from:");
 new java.lang.reflect.InvocationTargetException (null).printStackTrace ();
}if (Clazz.instanceOf (throwable, java.lang.reflect.InvocationTargetException)) {
throw throwable;
} else if (Clazz.instanceOf (throwable, InterruptedException)) {
throw throwable;
} else if (Clazz.instanceOf (throwable, org.eclipse.core.runtime.OperationCanceledException)) {
throw  new InterruptedException (throwable.getMessage ());
} else {
throw  new java.lang.reflect.InvocationTargetException (throwable);
}}}}} finally {
($t$ = org.eclipse.jface.operation.ModalContext.modalLevel --, org.eclipse.jface.operation.ModalContext.prototype.modalLevel = org.eclipse.jface.operation.ModalContext.modalLevel, $t$);
}
}, "org.eclipse.jface.operation.IRunnableWithProgress,~B,org.eclipse.core.runtime.IProgressMonitor,$wt.widgets.Display");
c$.runInCurrentThread = Clazz.defineMethod (c$, "runInCurrentThread", 
($fz = function (runnable, progressMonitor) {
try {
if (runnable != null) runnable.run (progressMonitor);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, InterruptedException)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.OperationCanceledException)) {
var e = e$$;
{
throw  new InterruptedException ();
}
} else if (Clazz.instanceOf (e$$, ThreadDeath)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, RuntimeException)) {
var e = e$$;
{
throw  new java.lang.reflect.InvocationTargetException (e);
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
throw  new java.lang.reflect.InvocationTargetException (e);
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.operation.IRunnableWithProgress,org.eclipse.core.runtime.IProgressMonitor");
c$.setDebugMode = Clazz.defineMethod (c$, "setDebugMode", 
function (debugMode) {
($t$ = org.eclipse.jface.operation.ModalContext.debug = debugMode, org.eclipse.jface.operation.ModalContext.prototype.debug = org.eclipse.jface.operation.ModalContext.debug, $t$);
}, "~B");
Clazz.defineStatics (c$,
"debug", false,
"modalLevel", 0,
"runInSeparateThread", true);
});
