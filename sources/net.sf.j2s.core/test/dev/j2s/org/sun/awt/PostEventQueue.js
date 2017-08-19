Clazz.declarePackage ("sun.awt");
Clazz.load (null, "sun.awt.PostEventQueue", ["sun.awt.EventQueueItem", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.queueHead = null;
this.queueTail = null;
this.eventQueue = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "PostEventQueue");
Clazz.makeConstructor (c$, 
function (eq) {
this.eventQueue = eq;
}, "java.awt.EventQueue");
Clazz.defineMethod (c$, "noEvents", 
function () {
return this.queueHead == null;
});
Clazz.defineMethod (c$, "flush", 
function () {
if (this.queueHead != null) {
var tempQueue;
{
tempQueue = this.queueHead;
this.queueHead = this.queueTail = null;
while (tempQueue != null) {
swingjs.JSToolkit.alert ("postevent IS NOT IMPLEMENTED " + tempQueue.event);
this.eventQueue.postEvent (tempQueue.event);
tempQueue = tempQueue.next;
}
}}});
Clazz.defineMethod (c$, "postEvent", 
function (event) {
var item =  new sun.awt.EventQueueItem (event);
{
if (this.queueHead == null) {
this.queueHead = this.queueTail = item;
} else {
this.queueTail.next = item;
this.queueTail = item;
}}sun.awt.SunToolkit.wakeupEventQueue (this.eventQueue, false);
}, "java.awt.AWTEvent");
});
