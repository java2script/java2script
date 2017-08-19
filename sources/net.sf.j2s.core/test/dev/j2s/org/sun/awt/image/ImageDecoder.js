Clazz.declarePackage ("sun.awt.image");
Clazz.load (null, "sun.awt.image.ImageDecoder", ["java.lang.Thread", "sun.awt.image.ImageConsumerQueue"], function () {
c$ = Clazz.decorateAsClass (function () {
this.source = null;
this.input = null;
this.feeder = null;
this.aborted = false;
this.finished = false;
this.queue = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "ImageDecoder");
Clazz.makeConstructor (c$, 
function (src, is) {
this.source = src;
this.input = is;
this.feeder = Thread.currentThread ();
}, "sun.awt.image.InputStreamImageSource,java.io.InputStream");
Clazz.defineMethod (c$, "isConsumer", 
function (ic) {
return sun.awt.image.ImageConsumerQueue.isConsumer (this.queue, ic);
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "removeConsumer", 
function (ic) {
this.queue = sun.awt.image.ImageConsumerQueue.removeConsumer (this.queue, ic, false);
if (!this.finished && this.queue == null) {
this.abort ();
}}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "nextConsumer", 
function (cq) {
{
if (this.aborted) {
return null;
}cq = ((cq == null) ? this.queue : cq.next);
while (cq != null) {
if (cq.interested) {
return cq;
}cq = cq.next;
}
}return null;
}, "sun.awt.image.ImageConsumerQueue");
Clazz.defineMethod (c$, "setDimensions", 
function (w, h) {
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setDimensions (w, h);
count++;
}
return count;
}, "~N,~N");
Clazz.defineMethod (c$, "setProperties", 
function (props) {
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setProperties (props);
count++;
}
return count;
}, "java.util.Hashtable");
Clazz.defineMethod (c$, "setColorModel", 
function (model) {
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setColorModel (model);
count++;
}
return count;
}, "java.awt.image.ColorModel");
Clazz.defineMethod (c$, "setHints", 
function (hints) {
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setHints (hints);
count++;
}
return count;
}, "~N");
Clazz.defineMethod (c$, "headerComplete", 
function () {
this.feeder.setPriority (3);
});
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, model, pix, off, scansize) {
this.source.latchConsumers (this);
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setPixels (x, y, w, h, model, pix, off, scansize);
count++;
}
return count;
}, "~N,~N,~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, model, pix, off, scansize) {
this.source.latchConsumers (this);
var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.setPixels (x, y, w, h, model, pix, off, scansize);
count++;
}
return count;
}, "~N,~N,~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.defineMethod (c$, "imageComplete", 
function (status, done) {
this.source.latchConsumers (this);
if (done) {
this.finished = true;
this.source.doneDecoding (this);
}var cq = null;
var count = 0;
while ((cq = this.nextConsumer (cq)) != null) {
cq.consumer.imageComplete (status);
count++;
}
return count;
}, "~N,~B");
Clazz.defineMethod (c$, "abort", 
function () {
this.aborted = true;
this.source.doneDecoding (this);
this.close ();
this.feeder.interrupt ();
});
Clazz.defineMethod (c$, "close", 
function () {
if (this.input != null) {
try {
this.input.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}});
});
