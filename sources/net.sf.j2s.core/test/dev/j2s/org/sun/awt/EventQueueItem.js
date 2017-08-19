Clazz.declarePackage ("sun.awt");
c$ = Clazz.decorateAsClass (function () {
this.event = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "EventQueueItem");
Clazz.makeConstructor (c$, 
function (evt) {
this.event = evt;
}, "java.awt.AWTEvent");
