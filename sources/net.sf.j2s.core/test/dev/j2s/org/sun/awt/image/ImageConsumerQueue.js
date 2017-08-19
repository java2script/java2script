Clazz.declarePackage ("sun.awt.image");
c$ = Clazz.decorateAsClass (function () {
this.next = null;
this.consumer = null;
this.interested = false;
this.securityContext = null;
this.secure = false;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "ImageConsumerQueue");
c$.removeConsumer = Clazz.defineMethod (c$, "removeConsumer", 
function (cqbase, ic, stillinterested) {
var cqprev = null;
for (var cq = cqbase; cq != null; cq = cq.next) {
if (cq.consumer === ic) {
if (cqprev == null) {
cqbase = cq.next;
} else {
cqprev.next = cq.next;
}cq.interested = stillinterested;
break;
}cqprev = cq;
}
return cqbase;
}, "sun.awt.image.ImageConsumerQueue,java.awt.image.ImageConsumer,~B");
c$.isConsumer = Clazz.defineMethod (c$, "isConsumer", 
function (cqbase, ic) {
for (var cq = cqbase; cq != null; cq = cq.next) {
if (cq.consumer === ic) {
return true;
}}
return false;
}, "sun.awt.image.ImageConsumerQueue,java.awt.image.ImageConsumer");
Clazz.makeConstructor (c$, 
function (src, ic) {
this.consumer = ic;
this.interested = true;
this.secure = true;
}, "sun.awt.image.InputStreamImageSource,java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "toString", 
function () {
return ("[" + this.consumer + ", " + (this.interested ? "" : "not ") + "interested" + (this.securityContext != null ? ", " + this.securityContext : "") + "]");
});
