Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.util.EventListenerProxy", "java.awt.event.AWTEventListener"], "java.awt.event.AWTEventListenerProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.eventMask = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "AWTEventListenerProxy", java.util.EventListenerProxy, java.awt.event.AWTEventListener);
Clazz.makeConstructor (c$, 
function (eventMask, listener) {
Clazz.superConstructor (this, java.awt.event.AWTEventListenerProxy, [listener]);
this.eventMask = eventMask;
}, "~N,java.awt.event.AWTEventListener");
Clazz.defineMethod (c$, "eventDispatched", 
function (evt) {
(this.getListener ()).eventDispatched (evt);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "getEventMask", 
function () {
return this.eventMask;
});
});
