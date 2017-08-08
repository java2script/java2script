Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.AWTEvent", "$.ActiveEvent", "java.util.LinkedList"], "java.awt.SequencedEvent", ["java.lang.Thread", "java.awt.Component", "$.Conditional", "$.EventQueue", "$.SentEvent", "$.Toolkit", "sun.awt.AppContext", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nested = null;
this.appContext = null;
this.disposed = false;
Clazz.instantialize (this, arguments);
}, java.awt, "SequencedEvent", java.awt.AWTEvent, java.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function (nested) {
Clazz.superConstructor (this, java.awt.SequencedEvent, [nested.getSource (), 1006]);
this.nested = nested;
{
java.awt.SequencedEvent.list.add (this);
}}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "dispatch", 
function () {
try {
this.appContext = sun.awt.AppContext.getAppContext ();
if (java.awt.SequencedEvent.getFirst () !== this) {
if (java.awt.EventQueue.isDispatchThread ()) {
var edt = Thread.currentThread ();
edt.pumpEvents (1007, ((Clazz.isClassDefined ("java.awt.SequencedEvent$1") ? 0 : java.awt.SequencedEvent.$SequencedEvent$1$ ()), Clazz.innerTypeInstance (java.awt.SequencedEvent$1, this, null)));
} else {
while (!this.isFirstOrDisposed ()) {
{
try {
swingjs.JSToolkit.warn ("Cannot wait in SequenceEvent");
java.awt.SequencedEvent.wait (1000);
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
break;
} else {
throw e;
}
}
}}
}}if (!this.disposed) {
java.awt.Toolkit.getEventQueue ().dispatchEvent (this.nested);
}} finally {
this.dispose ();
}
});
c$.isOwnerAppContextDisposed = Clazz.defineMethod (c$, "isOwnerAppContextDisposed", 
 function (se) {
if (se != null) {
var target = se.nested.getSource ();
if (Clazz.instanceOf (target, java.awt.Component)) {
return (target).appContext.isDisposed ();
}}return false;
}, "java.awt.SequencedEvent");
Clazz.defineMethod (c$, "isFirstOrDisposed", 
function () {
if (this.disposed) {
return true;
}return this === java.awt.SequencedEvent.getFirstWithContext () || this.disposed;
});
c$.getFirst = Clazz.defineMethod (c$, "getFirst", 
 function () {
return java.awt.SequencedEvent.list.getFirst ();
});
c$.getFirstWithContext = Clazz.defineMethod (c$, "getFirstWithContext", 
 function () {
var first = java.awt.SequencedEvent.getFirst ();
while (java.awt.SequencedEvent.isOwnerAppContextDisposed (first)) {
first.dispose ();
first = java.awt.SequencedEvent.getFirst ();
}
return first;
});
Clazz.defineMethod (c$, "dispose", 
function () {
{
if (this.disposed) {
return;
}this.disposed = true;
}if (this.appContext != null) {
sun.awt.SunToolkit.postEvent (this.appContext,  new java.awt.SentEvent ());
}var next = null;
{
java.awt.SequencedEvent.notifyAll ();
if (java.awt.SequencedEvent.list.getFirst () === this) {
java.awt.SequencedEvent.list.removeFirst ();
if (!java.awt.SequencedEvent.list.isEmpty ()) {
next = java.awt.SequencedEvent.list.getFirst ();
}} else {
java.awt.SequencedEvent.list.remove (this);
}}if (next != null && next.appContext != null) {
sun.awt.SunToolkit.postEvent (next.appContext,  new java.awt.SentEvent ());
}});
c$.$SequencedEvent$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt, "SequencedEvent$1", null, java.awt.Conditional);
Clazz.overrideMethod (c$, "evaluate", 
function () {
return !this.b$["java.awt.SequencedEvent"].isFirstOrDisposed ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"ID", 1006);
c$.list = c$.prototype.list =  new java.util.LinkedList ();
});
