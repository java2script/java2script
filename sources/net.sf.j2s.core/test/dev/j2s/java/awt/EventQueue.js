Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Thread"], ["java.awt.EventQueueItem", "$.EventQueue", "$.Queue"], ["java.lang.Error", "java.lang.reflect.InvocationTargetException", "java.util.EmptyStackException", "java.awt.ActiveEvent", "$.Component", "$.EventDispatchThread", "$.SentEvent", "$.SequencedEvent", "$.Toolkit", "java.awt.event.ActionEvent", "$.FocusEvent", "$.InputEvent", "$.InputMethodEvent", "$.InvocationEvent", "$.KeyEvent", "$.MouseEvent", "$.PaintEvent", "$.WindowEvent", "sun.awt.AWTAutoShutdown", "$.AppContext", "$.PeerEvent", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.queues = null;
this.nextQueue = null;
this.previousQueue = null;
this.dispatchThread = null;
this.threadGroup = null;
this.mostRecentEventTime = 0;
this.currentEvent = null;
this.waitForID = 0;
this.name = null;
Clazz.instantialize (this, arguments);
}, java.awt, "EventQueue");
Clazz.prepareFields (c$, function () {
this.queues =  new Array (4);
this.threadGroup = Thread.currentThread ().getThreadGroup ();
this.mostRecentEventTime = System.currentTimeMillis ();
this.name = "AWT-EventQueue-" + java.awt.EventQueue.nextThreadNum ();
});
c$.nextThreadNum = Clazz.defineMethod (c$, "nextThreadNum", 
 function () {
return java.awt.EventQueue.threadInitNumber++;
});
c$.noEvents = Clazz.defineMethod (c$, "noEvents", 
function (eventQueue) {
return eventQueue.noEvents ();
}, "java.awt.EventQueue");
c$.getNextQueue = Clazz.defineMethod (c$, "getNextQueue", 
function (eventQueue) {
return eventQueue.nextQueue;
}, "java.awt.EventQueue");
c$.removeSourceEvents = Clazz.defineMethod (c$, "removeSourceEvents", 
function (eventQueue, source, removeAllEvents) {
eventQueue.removeSourceEvents (source, removeAllEvents);
}, "java.awt.EventQueue,~O,~B");
Clazz.makeConstructor (c$, 
function () {
for (var i = 0; i < 4; i++) {
this.queues[i] =  new java.awt.Queue ();
}
});
Clazz.defineMethod (c$, "postEvent", 
function (event) {
sun.awt.SunToolkit.flushPendingEvents ();
this.postEventPrivate (event);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "postEventPrivate", 
function (theEvent) {
theEvent.isPosted = true;
{
if (this.dispatchThread == null && this.nextQueue == null) {
if (theEvent.getSource () === sun.awt.AWTAutoShutdown.getInstance ()) {
return;
} else {
this.initDispatchThread ();
}}if (this.nextQueue != null) {
this.nextQueue.postEventPrivate (theEvent);
return;
}this.postEventNow (theEvent, java.awt.EventQueue.getPriority (theEvent));
}}, "java.awt.AWTEvent");
c$.getPriority = Clazz.defineMethod (c$, "getPriority", 
 function (theEvent) {
if (Clazz.instanceOf (theEvent, sun.awt.PeerEvent)) {
var flags = (theEvent).getFlags ();
if ((flags & 2) != 0) return 3;
if ((flags & 1) != 0) return 2;
if ((flags & 4) != 0) return 0;
}switch (theEvent.getID ()) {
case 1201:
case 800:
case 801:
return 0;
default:
return 1;
}
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "postEventNow", 
 function (theEvent, priority) {
if (this.coalesceEvent (theEvent, priority)) {
return;
}var newItem =  new java.awt.EventQueueItem (theEvent);
this.cacheEQItem (newItem);
if (this.queues[priority].head == null) {
var shouldNotify = this.noEvents ();
this.queues[priority].head = this.queues[priority].tail = newItem;
if (shouldNotify) {
if (theEvent.getSource () !== sun.awt.AWTAutoShutdown.getInstance ()) {
sun.awt.AWTAutoShutdown.getInstance ().notifyThreadBusy (this.dispatchThread);
}}} else {
this.queues[priority].tail.next = newItem;
this.queues[priority].tail = newItem;
}}, "java.awt.AWTEvent,~N");
Clazz.defineMethod (c$, "coalescePaintEvent", 
 function (e) {
var sourcePeer = (e.getSource ()).peer;
if (sourcePeer != null) {
sourcePeer.coalescePaintEvent (e);
}var cache = (e.getSource ()).eventCache;
if (cache == null) {
return false;
}var index = java.awt.EventQueue.eventToCacheIndex (e);
if (index != -1 && cache[index] != null) {
var merged = this.mergePaintEvents (e, cache[index].event);
if (merged != null) {
cache[index].event = merged;
return true;
}}return false;
}, "java.awt.event.PaintEvent");
Clazz.defineMethod (c$, "mergePaintEvents", 
 function (a, b) {
var aRect = a.getUpdateRect ();
var bRect = b.getUpdateRect ();
if (bRect.contains (aRect)) {
return b;
}if (aRect.contains (bRect)) {
return a;
}return null;
}, "java.awt.event.PaintEvent,java.awt.event.PaintEvent");
Clazz.defineMethod (c$, "coalesceMouseEvent", 
 function (e) {
var cache = (e.getSource ()).eventCache;
if (cache == null) {
return false;
}var index = java.awt.EventQueue.eventToCacheIndex (e);
if (index != -1 && cache[index] != null) {
cache[index].event = e;
return true;
}return false;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "coalescePeerEvent", 
 function (e) {
var cache = (e.getSource ()).eventCache;
if (cache == null) {
return false;
}var index = java.awt.EventQueue.eventToCacheIndex (e);
if (index != -1 && cache[index] != null) {
e = e.coalesceEvents (cache[index].event);
if (e != null) {
cache[index].event = e;
return true;
} else {
cache[index] = null;
}}return false;
}, "sun.awt.PeerEvent");
Clazz.defineMethod (c$, "coalesceOtherEvent", 
 function (e, priority) {
var id = e.getID ();
var source = e.getSource ();
for (var entry = this.queues[priority].head; entry != null; entry = entry.next) {
if (entry.event.getSource () === source && entry.id == id) {
var coalescedEvent = source.coalesceEvents (entry.event, e);
if (coalescedEvent != null) {
entry.event = coalescedEvent;
return true;
}}}
return false;
}, "java.awt.AWTEvent,~N");
Clazz.defineMethod (c$, "coalesceEvent", 
 function (e, priority) {
if (!(Clazz.instanceOf (e.getSource (), java.awt.Component))) {
return false;
}if (Clazz.instanceOf (e, sun.awt.PeerEvent)) {
return this.coalescePeerEvent (e);
}if ((e.getSource ()).isCoalescingEnabled () && this.coalesceOtherEvent (e, priority)) {
return true;
}if (Clazz.instanceOf (e, java.awt.event.PaintEvent)) {
return this.coalescePaintEvent (e);
}if (Clazz.instanceOf (e, java.awt.event.MouseEvent)) {
return this.coalesceMouseEvent (e);
}return false;
}, "java.awt.AWTEvent,~N");
Clazz.defineMethod (c$, "cacheEQItem", 
 function (entry) {
var index = java.awt.EventQueue.eventToCacheIndex (entry.event);
if (index != -1 && Clazz.instanceOf (entry.event.getSource (), java.awt.Component)) {
var source = entry.event.getSource ();
if (source.eventCache == null) {
source.eventCache =  new Array (5);
}source.eventCache[index] = entry;
}}, "java.awt.EventQueueItem");
Clazz.defineMethod (c$, "uncacheEQItem", 
 function (entry) {
var index = java.awt.EventQueue.eventToCacheIndex (entry.event);
if (index != -1 && Clazz.instanceOf (entry.event.getSource (), java.awt.Component)) {
var source = entry.event.getSource ();
if (source.eventCache == null) {
return;
}source.eventCache[index] = null;
}}, "java.awt.EventQueueItem");
c$.eventToCacheIndex = Clazz.defineMethod (c$, "eventToCacheIndex", 
 function (e) {
switch (e.getID ()) {
case 800:
return 0;
case 801:
return 1;
case 503:
return 2;
case 506:
return 3;
default:
return -1;
}
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "noEvents", 
 function () {
for (var i = 0; i < 4; i++) {
if (this.queues[i].head != null) {
return false;
}}
return true;
});
Clazz.defineMethod (c$, "getNextEvent", 
function () {
sun.awt.SunToolkit.flushPendingEvents ();
{
for (var i = 3; i >= 0; i--) {
if (this.queues[i].head != null) {
var entry = this.queues[i].head;
this.queues[i].head = entry.next;
if (entry.next == null) {
this.queues[i].tail = null;
}this.uncacheEQItem (entry);
return entry.event;
}}
sun.awt.AWTAutoShutdown.getInstance ().notifyThreadFree (this.dispatchThread);
}return null;
});
Clazz.defineMethod (c$, "getNextEventForID", 
function (id) {
sun.awt.SunToolkit.flushPendingEvents ();
{
for (var i = 0; i < 4; i++) {
for (var entry = this.queues[i].head, prev = null; entry != null; prev = entry, entry = entry.next) {
if (entry.id == id) {
if (prev == null) {
this.queues[i].head = entry.next;
} else {
prev.next = entry.next;
}if (this.queues[i].tail === entry) {
this.queues[i].tail = prev;
}this.uncacheEQItem (entry);
return entry.event;
}}
}
this.waitForID = id;
this.waitForID = 0;
}return null;
}, "~N");
Clazz.defineMethod (c$, "peekEvent", 
function () {
return this.peekEventSAEM ();
});
Clazz.defineMethod (c$, "peekEventSAEM", 
function () {
for (var i = 3; i >= 0; i--) {
if (this.queues[i].head != null) {
return this.queues[i].head.event;
}}
return null;
});
Clazz.defineMethod (c$, "peekEvent", 
function (id) {
for (var i = 3; i >= 0; i--) {
var q = this.queues[i].head;
for (; q != null; q = q.next) {
if (q.id == id) {
return q.event;
}}
}
return null;
}, "~N");
Clazz.defineMethod (c$, "dispatchEvent", 
function (event) {
var src = event.getSource ();
this.dispatchEventImpl (event, src, false);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventAndWait", 
function (event, src) {
this.dispatchEventImpl (event, src, true);
}, "java.awt.AWTEvent,~O");
Clazz.defineMethod (c$, "dispatchEventImpl", 
 function (event, src, andWait) {
event.isPosted = true;
if (Clazz.instanceOf (event, java.awt.ActiveEvent)) {
this.setCurrentEventAndMostRecentTimeImpl (event);
swingjs.JSToolkit.dispatchEvent (event, null, andWait);
} else if (Clazz.instanceOf (src, java.awt.Component)) {
swingjs.JSToolkit.dispatchEvent (event, src, andWait);
event.dispatched ();
} else if (Clazz.instanceOf (src, sun.awt.AWTAutoShutdown)) {
if (this.noEvents ()) {
this.dispatchThread.stopDispatching ();
}} else {
System.err.println ("unable to dispatch event: " + event);
}}, "java.awt.AWTEvent,~O,~B");
c$.getMostRecentEventTime = Clazz.defineMethod (c$, "getMostRecentEventTime", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getMostRecentEventTimeEx", 
function () {
return this.mostRecentEventTime;
});
c$.getCurrentEvent = Clazz.defineMethod (c$, "getCurrentEvent", 
function () {
return java.awt.Toolkit.getEventQueue ().getCurrentEventImpl ();
});
Clazz.defineMethod (c$, "getCurrentEventImpl", 
 function () {
return (swingjs.JSToolkit.isDispatchThread () ? (this.currentEvent) : null);
});
Clazz.defineMethod (c$, "push", 
function (newEventQueue) {
if (this.nextQueue != null) {
this.nextQueue.push (newEventQueue);
return;
}{
while (this.peekEventSAEM () != null) {
try {
newEventQueue.postEventPrivate (this.getNextEvent ());
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
} else {
throw ie;
}
}
}
newEventQueue.previousQueue = this;
}if (this.dispatchThread != null) {
this.dispatchThread.stopDispatchingLater ();
}this.nextQueue = newEventQueue;
var appContext = sun.awt.AppContext.getAppContext ();
if (appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY) === this) {
appContext.put (sun.awt.AppContext.EVENT_QUEUE_KEY, newEventQueue);
}}, "java.awt.EventQueue");
Clazz.defineMethod (c$, "pop", 
function () {
var prev = this.previousQueue;
{
{
if (this.nextQueue != null) {
this.nextQueue.pop ();
return;
}if (this.previousQueue == null) {
throw  new java.util.EmptyStackException ();
}this.previousQueue.nextQueue = null;
while (this.peekEventSAEM () != null) {
try {
this.previousQueue.postEventPrivate (this.getNextEvent ());
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
} else {
throw ie;
}
}
}
var appContext = sun.awt.AppContext.getAppContext ();
if (appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY) === this) {
appContext.put (sun.awt.AppContext.EVENT_QUEUE_KEY, this.previousQueue);
}this.previousQueue = null;
}}var dt = this.dispatchThread;
if (dt != null) {
dt.stopDispatching ();
}});
c$.isDispatchThread = Clazz.defineMethod (c$, "isDispatchThread", 
function () {
return swingjs.JSToolkit.isDispatchThread ();
});
Clazz.defineMethod (c$, "initDispatchThread", 
function () {
{
if (this.dispatchThread == null) {
var t =  new java.awt.EventDispatchThread (this.threadGroup, this.name, this);
sun.awt.AWTAutoShutdown.getInstance ().notifyThreadBusy (t);
this.dispatchThread = t;
this.dispatchThread.start ();
}}});
Clazz.defineMethod (c$, "detachDispatchThread", 
function () {
this.dispatchThread = null;
});
Clazz.defineMethod (c$, "getDispatchThread", 
function () {
return this.dispatchThread;
});
Clazz.defineMethod (c$, "removeSourceEvents", 
function (source, removeAllEvents) {
sun.awt.SunToolkit.flushPendingEvents ();
{
for (var i = 0; i < 4; i++) {
var entry = this.queues[i].head;
var prev = null;
while (entry != null) {
if ((entry.event.getSource () === source) && (removeAllEvents || !(Clazz.instanceOf (entry.event, java.awt.SequencedEvent) || Clazz.instanceOf (entry.event, java.awt.SentEvent) || Clazz.instanceOf (entry.event, java.awt.event.FocusEvent) || Clazz.instanceOf (entry.event, java.awt.event.WindowEvent) || Clazz.instanceOf (entry.event, java.awt.event.KeyEvent) || Clazz.instanceOf (entry.event, java.awt.event.InputMethodEvent)))) {
if (Clazz.instanceOf (entry.event, java.awt.SequencedEvent)) {
(entry.event).dispose ();
}if (Clazz.instanceOf (entry.event, java.awt.SentEvent)) {
(entry.event).dispose ();
}if (prev == null) {
this.queues[i].head = entry.next;
} else {
prev.next = entry.next;
}this.uncacheEQItem (entry);
} else {
prev = entry;
}entry = entry.next;
}
this.queues[i].tail = prev;
}
}}, "~O,~B");
c$.setCurrentEventAndMostRecentTime = Clazz.defineMethod (c$, "setCurrentEventAndMostRecentTime", 
function (e) {
java.awt.Toolkit.getEventQueue ().setCurrentEventAndMostRecentTimeImpl (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "setCurrentEventAndMostRecentTimeImpl", 
 function (e) {
if (swingjs.JSToolkit.isDispatchThread ()) {
return;
}this.currentEvent = e;
var mostRecentEventTime2 = -9223372036854775808;
if (Clazz.instanceOf (e, java.awt.event.InputEvent)) {
var ie = e;
mostRecentEventTime2 = ie.getWhen ();
} else if (Clazz.instanceOf (e, java.awt.event.InputMethodEvent)) {
var ime = e;
mostRecentEventTime2 = ime.getWhen ();
} else if (Clazz.instanceOf (e, java.awt.event.ActionEvent)) {
var ae = e;
mostRecentEventTime2 = ae.getWhen ();
} else if (Clazz.instanceOf (e, java.awt.event.InvocationEvent)) {
var ie = e;
mostRecentEventTime2 = ie.getWhen ();
}this.mostRecentEventTime = Math.max (this.mostRecentEventTime, mostRecentEventTime2);
}, "java.awt.AWTEvent");
c$.invokeLater = Clazz.defineMethod (c$, "invokeLater", 
function (runnable) {
java.awt.Toolkit.getEventQueue ().postEvent ( new java.awt.event.InvocationEvent (java.awt.Toolkit.getDefaultToolkit (), 1200, runnable, null, false));
}, "Runnable");
c$.invokeAndWait = Clazz.defineMethod (c$, "invokeAndWait", 
function (runnable) {
java.awt.EventQueue.invokeAndWaitStatic (java.awt.Toolkit.getDefaultToolkit (), runnable);
}, "Runnable");
c$.invokeAndWaitStatic = Clazz.defineMethod (c$, "invokeAndWaitStatic", 
 function (source, runnable) {
if (java.awt.EventQueue.isDispatchThread ()) {
throw  new Error ("Cannot call invokeAndWait from the event dispatcher thread");
}var event =  new java.awt.event.InvocationEvent (source, 1200, runnable, null, true);
swingjs.JSToolkit.dispatchEvent (event, null, true);
var eventThrowable = event.getThrowable ();
if (eventThrowable != null) {
throw  new java.lang.reflect.InvocationTargetException (eventThrowable);
}}, "~O,Runnable");
Clazz.defineMethod (c$, "wakeup", 
function (isShutdown) {
{
if (this.nextQueue != null) {
this.nextQueue.wakeup (isShutdown);
} else if (this.dispatchThread != null) {
try {
this.dispatchThread.start ();
} catch (e) {
if (Clazz.exceptionOf (e, IllegalThreadStateException)) {
this.dispatchThread.run ();
} else {
throw e;
}
}
} else if (!isShutdown) {
this.initDispatchThread ();
}}}, "~B");
Clazz.defineStatics (c$,
"threadInitNumber", 0,
"LOW_PRIORITY", 0,
"NORM_PRIORITY", 1,
"HIGH_PRIORITY", 2,
"ULTIMATE_PRIORITY", 3,
"NUM_PRIORITIES", 4,
"PAINT", 0,
"UPDATE", 1,
"MOVE", 2,
"DRAG", 3,
"PEER", 4,
"CACHE_LENGTH", 5);
c$ = Clazz.decorateAsClass (function () {
this.head = null;
this.tail = null;
Clazz.instantialize (this, arguments);
}, java.awt, "Queue");
c$ = Clazz.decorateAsClass (function () {
this.event = null;
this.id = 0;
this.next = null;
Clazz.instantialize (this, arguments);
}, java.awt, "EventQueueItem");
Clazz.makeConstructor (c$, 
function (evt) {
this.event = evt;
this.id = evt.getID ();
}, "java.awt.AWTEvent");
});
