Clazz.declarePackage ("java.awt");
Clazz.load (["JU.JSThread", "java.awt.AWTEvent", "$.ActiveEvent", "$.EventFilter", "JU.Lst"], "java.awt.EventDispatchThread", ["java.lang.Error", "$.RuntimeException", "$.Thread", "java.awt.Component", "$.Container", "$.ModalEventFilter", "$.Window", "sun.awt.AWTAutoShutdown", "$.ModalExclude", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.theQueue = null;
this.eventFilters = null;
this.modalFiltersCount = 0;
this.filter = null;
this.cond = null;
this.id = 0;
this.doDispatch = true;
if (!Clazz.isClassDefined ("java.awt.EventDispatchThread.StopDispatchEvent")) {
java.awt.EventDispatchThread.$EventDispatchThread$StopDispatchEvent$ ();
}
Clazz.instantialize (this, arguments);
}, java.awt, "EventDispatchThread", JU.JSThread);
Clazz.prepareFields (c$, function () {
this.eventFilters =  new JU.Lst ();
});
Clazz.overrideMethod (c$, "myInit", 
function () {
this.addEventFilter (this.filter);
return true;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
return (this.doDispatch && (this.cond == null || this.cond.evaluate ()) && !this.isInterrupted () || (this.doDispatch = false));
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
var myid = this.id;
var r = ((Clazz.isClassDefined ("java.awt.EventDispatchThread$1") ? 0 : java.awt.EventDispatchThread.$EventDispatchThread$1$ ()), Clazz.innerTypeInstance (java.awt.EventDispatchThread$1, this, Clazz.cloneFinals ("myid", myid)));
var f = null;
var me = this;
var mode = 1;
{
f = function() {r.run();me.run1(mode)};
}swingjs.JSToolkit.dispatch (f, 0, 0);
return (this.doDispatch = false);
});
Clazz.overrideMethod (c$, "getDelayMillis", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "whenDone", 
function () {
});
Clazz.overrideMethod (c$, "doFinally", 
function () {
if (!this.doDispatch) this.finish ();
});
Clazz.overrideMethod (c$, "onException", 
function (e) {
}, "Exception");
Clazz.makeConstructor (c$, 
function (group, name, queue) {
Clazz.superConstructor (this, java.awt.EventDispatchThread, [group, name]);
this.theQueue = queue;
}, "ThreadGroup,~S,java.awt.EventQueue");
Clazz.defineMethod (c$, "stopDispatchingImpl", 
function (wait) {
var stopEvent = Clazz.innerTypeInstance (java.awt.EventDispatchThread.StopDispatchEvent, this, null);
if (Thread.currentThread () !== this) {
this.theQueue.postEventPrivate (stopEvent);
if (wait) {
try {
this.join ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}} else {
stopEvent.dispatch ();
}{
if (this.theQueue.getDispatchThread () === this) {
this.theQueue.detachDispatchThread ();
}}}, "~B");
Clazz.defineMethod (c$, "stopDispatching", 
function () {
this.stopDispatchingImpl (true);
});
Clazz.defineMethod (c$, "stopDispatchingLater", 
function () {
this.stopDispatchingImpl (false);
});
Clazz.overrideMethod (c$, "run", 
function () {
this.pumpEvents (-1, null);
});
Clazz.defineMethod (c$, "pumpEvents", 
function (id, cond) {
this.pumpEventsForHierarchy (id, cond, null);
}, "~N,java.awt.Conditional");
Clazz.defineMethod (c$, "pumpEventsForHierarchy", 
function (id, cond, modalComponent) {
this.pumpEventsForFilter (id, cond,  new java.awt.EventDispatchThread.HierarchyEventFilter (modalComponent));
}, "~N,java.awt.Conditional,java.awt.Component");
Clazz.defineMethod (c$, "pumpEventsForFilter", 
function (id, cond, filter) {
this.filter = filter;
this.cond = cond;
this.id = id;
this.run1 (0);
}, "~N,java.awt.Conditional,java.awt.EventFilter");
Clazz.defineMethod (c$, "dispatchAndReturn", 
function (r, mode) {
var f = null;
var me = this;
{
f = function() {r.run();me.run1(mode)
};
}swingjs.JSToolkit.dispatch (f, 0, 0);
}, "Runnable,~N");
Clazz.defineMethod (c$, "finish", 
 function () {
this.doDispatch = false;
this.removeEventFilter (this.filter);
{
if (this.theQueue.getDispatchThread () === this) {
this.theQueue.detachDispatchThread ();
}if (this.theQueue.peekEventSAEM () != null || !sun.awt.SunToolkit.isPostEventQueueEmpty ()) {
this.theQueue.initDispatchThread ();
}sun.awt.AWTAutoShutdown.getInstance ().notifyThreadFree (this);
}});
Clazz.defineMethod (c$, "addEventFilter", 
function (filter) {
{
if (!this.eventFilters.contains (filter)) {
if (Clazz.instanceOf (filter, java.awt.ModalEventFilter)) {
var newFilter = filter;
var k = 0;
for (k = 0; k < this.eventFilters.size (); k++) {
var f = this.eventFilters.get (k);
if (Clazz.instanceOf (f, java.awt.ModalEventFilter)) {
var cf = f;
if (cf.compareTo (newFilter) > 0) {
break;
}}}
this.eventFilters.add (k, filter);
this.modalFiltersCount++;
} else {
this.eventFilters.addLast (filter);
}}}}, "java.awt.EventFilter");
Clazz.defineMethod (c$, "removeEventFilter", 
function (filter) {
{
if (this.eventFilters.contains (filter)) {
if (Clazz.instanceOf (filter, java.awt.ModalEventFilter)) {
this.modalFiltersCount--;
}this.eventFilters.removeObj (filter);
}}}, "java.awt.EventFilter");
Clazz.defineMethod (c$, "pumpOneEventForFilters", 
function (id) {
try {
var event;
var eventOK;
do {
event = (id == -1) ? this.theQueue.getNextEvent () : this.theQueue.getNextEventForID (id);
if (event == null) return (this.doDispatch = false);
eventOK = true;
{
for (var i = this.eventFilters.size () - 1; i >= 0; i--) {
var f = this.eventFilters.get (i);
var accept = f.acceptEvent (event);
if (accept === java.awt.EventFilter.FilterAction.REJECT) {
eventOK = false;
break;
} else if (accept === java.awt.EventFilter.FilterAction.ACCEPT_IMMEDIATELY) {
break;
}}
}if (!eventOK) {
event.consume ();
}} while (eventOK == false);
this.theQueue.dispatchEvent (event);
return this.doDispatch = true;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ThreadDeath)) {
var death = e$$;
{
return this.doDispatch = false;
}
} else if (Clazz.exceptionOf (e$$, InterruptedException)) {
var interruptedException = e$$;
{
return this.doDispatch = false;
}
} else {
var e = e$$;
{
this.processException (e, this.modalFiltersCount > 0);
}
}
}
return this.doDispatch = true;
}, "~N");
Clazz.defineMethod (c$, "processException", 
 function (e, isModal) {
if (!this.handleException (e)) {
if (isModal) {
System.err.println ("Exception occurred during event dispatching:");
e.printStackTrace ();
} else if (Clazz.instanceOf (e, RuntimeException)) {
throw e;
} else if (Clazz.instanceOf (e, Error)) {
throw e;
}}}, "Throwable,~B");
Clazz.defineMethod (c$, "handleException", 
 function (thrown) {
return false;
}, "Throwable");
Clazz.defineMethod (c$, "isDispatching", 
function (eq) {
return this.theQueue.equals (eq);
}, "java.awt.EventQueue");
Clazz.defineMethod (c$, "getEventQueue", 
function () {
return this.theQueue;
});
c$.$EventDispatchThread$StopDispatchEvent$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, java.awt.EventDispatchThread, "StopDispatchEvent", java.awt.AWTEvent, java.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.EventDispatchThread.StopDispatchEvent, [this.b$["java.awt.EventDispatchThread"], 0]);
});
Clazz.overrideMethod (c$, "dispatch", 
function () {
this.b$["java.awt.EventDispatchThread"].doDispatch = false;
});
c$ = Clazz.p0p ();
};
c$.$EventDispatchThread$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt, "EventDispatchThread$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["java.awt.EventDispatchThread"].pumpOneEventForFilters (this.f$.myid);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.modalComponent = null;
Clazz.instantialize (this, arguments);
}, java.awt.EventDispatchThread, "HierarchyEventFilter", null, java.awt.EventFilter);
Clazz.makeConstructor (c$, 
function (a) {
this.modalComponent = a;
}, "java.awt.Component");
Clazz.overrideMethod (c$, "acceptEvent", 
function (a) {
if (this.modalComponent != null) {
var b = a.getID ();
var c = (b >= 500) && (b <= 507);
var d = (b >= 1001) && (b <= 1001);
var e = (b == 201);
if (java.awt.Component.isInstanceOf (this.modalComponent, "javax.swing.JInternalFrame")) {
return e ? java.awt.EventFilter.FilterAction.REJECT : java.awt.EventFilter.FilterAction.ACCEPT;
}if (c || d || e) {
var f = a.getSource ();
if (Clazz.instanceOf (f, sun.awt.ModalExclude)) {
return java.awt.EventFilter.FilterAction.ACCEPT;
} else if (Clazz.instanceOf (f, java.awt.Component)) {
var g = f;
var h = false;
if (Clazz.instanceOf (this.modalComponent, java.awt.Container)) {
while (g !== this.modalComponent && g != null) {
if ((Clazz.instanceOf (g, java.awt.Window)) && (sun.awt.SunToolkit.isModalExcluded (g))) {
h = true;
break;
}g = g.getParent ();
}
}if (!h && (g !== this.modalComponent)) {
return java.awt.EventFilter.FilterAction.REJECT;
}}}}return java.awt.EventFilter.FilterAction.ACCEPT;
}, "java.awt.AWTEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"ANY_EVENT", -1);
});
