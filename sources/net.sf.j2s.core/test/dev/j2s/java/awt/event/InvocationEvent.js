Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent", "$.ActiveEvent"], "java.awt.event.InvocationEvent", ["java.lang.Exception"], function () {
c$ = Clazz.decorateAsClass (function () {
this.runnable = null;
this.notifier = null;
this.catchExceptions = false;
this.exception = null;
this.throwable = null;
this.when = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "InvocationEvent", java.awt.AWTEvent, java.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function (source, runnable) {
this.construct (source, 1200, runnable, null, false);
}, "~O,Runnable");
Clazz.makeConstructor (c$, 
function (source, runnable, notifier, catchThrowables) {
this.construct (source, 1200, runnable, notifier, catchThrowables);
}, "~O,Runnable,~O,~B");
Clazz.makeConstructor (c$, 
function (source, id, runnable, notifier, catchThrowables) {
Clazz.superConstructor (this, java.awt.event.InvocationEvent, [source, id]);
this.runnable = runnable;
this.notifier = notifier;
this.catchExceptions = catchThrowables;
this.when = System.currentTimeMillis ();
}, "~O,~N,Runnable,~O,~B");
Clazz.overrideMethod (c$, "dispatch", 
function () {
if (this.catchExceptions) {
try {
this.runnable.run ();
} catch (t) {
if (Clazz.instanceOf (t, Exception)) {
this.exception = t;
}this.throwable = t;
}
} else {
this.runnable.run ();
}if (this.notifier != null) {
{
this.notifier.notifyAll ();
}}});
Clazz.defineMethod (c$, "getException", 
function () {
return (this.catchExceptions) ? this.exception : null;
});
Clazz.defineMethod (c$, "getThrowable", 
function () {
return (this.catchExceptions) ? this.throwable : null;
});
Clazz.defineMethod (c$, "getWhen", 
function () {
return this.when;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 1200:
typeStr = "INVOCATION_DEFAULT";
break;
default:
typeStr = "unknown type";
}
return typeStr + ",runnable=" + this.runnable + ",notifier=" + this.notifier + ",catchExceptions=" + this.catchExceptions + ",when=" + this.when;
});
Clazz.defineStatics (c$,
"SWINGJS_INVOCATION_LOW", 1201,
"INVOCATION_FIRST", 1200,
"INVOCATION_DEFAULT", 1200,
"INVOCATION_LAST", 1201);
});
