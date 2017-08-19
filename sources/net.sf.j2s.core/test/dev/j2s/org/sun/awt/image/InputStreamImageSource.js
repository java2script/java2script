Clazz.declarePackage ("sun.awt.image");
Clazz.load (["java.awt.image.ImageProducer", "sun.awt.image.ImageFetchable"], "sun.awt.image.InputStreamImageSource", ["java.lang.SecurityException", "$.Thread", "sun.awt.image.ImageConsumerQueue", "$.ImageFetcher"], function () {
c$ = Clazz.decorateAsClass (function () {
this.consumers = null;
this.decoder = null;
this.decoders = null;
this.awaitingFetch = false;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "InputStreamImageSource", null, [java.awt.image.ImageProducer, sun.awt.image.ImageFetchable]);
Clazz.defineMethod (c$, "countConsumers", 
function (cq) {
var i = 0;
while (cq != null) {
i++;
cq = cq.next;
}
return i;
}, "sun.awt.image.ImageConsumerQueue");
Clazz.defineMethod (c$, "countConsumers", 
function () {
var id = this.decoders;
var i = this.countConsumers (this.consumers);
while (id != null) {
i += this.countConsumers (id.queue);
id = id.next;
}
return i;
});
Clazz.defineMethod (c$, "addConsumer", 
function (ic) {
this.addConsumer (ic, false);
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "printQueue", 
function (cq, prefix) {
while (cq != null) {
System.out.println (prefix + cq);
cq = cq.next;
}
}, "sun.awt.image.ImageConsumerQueue,~S");
Clazz.defineMethod (c$, "printQueues", 
function (title) {
System.out.println (title + "[ -----------");
this.printQueue (this.consumers, "  ");
for (var id = this.decoders; id != null; id = id.next) {
System.out.println ("    " + id);
this.printQueue (id.queue, "      ");
}
System.out.println ("----------- ]" + title);
}, "~S");
Clazz.defineMethod (c$, "addConsumer", 
function (ic, produce) {
for (var id = this.decoders; id != null; id = id.next) {
if (id.isConsumer (ic)) {
return;
}}
var cq = this.consumers;
while (cq != null && cq.consumer !== ic) {
cq = cq.next;
}
if (cq == null) {
cq =  new sun.awt.image.ImageConsumerQueue (this, ic);
cq.next = this.consumers;
this.consumers = cq;
} else {
if (!cq.secure) {
var context = null;
var security = System.getSecurityManager ();
if (security != null) {
context = security.getSecurityContext ();
}if (cq.securityContext == null) {
cq.securityContext = context;
} else if (!cq.securityContext.equals (context)) {
this.errorConsumer (cq, false);
throw  new SecurityException ("Applets are trading image data!");
}}cq.interested = true;
}if (produce && this.decoder == null) {
this.startProduction ();
}}, "java.awt.image.ImageConsumer,~B");
Clazz.overrideMethod (c$, "isConsumer", 
function (ic) {
for (var id = this.decoders; id != null; id = id.next) {
if (id.isConsumer (ic)) {
return true;
}}
return sun.awt.image.ImageConsumerQueue.isConsumer (this.consumers, ic);
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "errorAllConsumers", 
 function (cq, needReload) {
while (cq != null) {
if (cq.interested) {
this.errorConsumer (cq, needReload);
}cq = cq.next;
}
}, "sun.awt.image.ImageConsumerQueue,~B");
Clazz.defineMethod (c$, "errorConsumer", 
 function (cq, needReload) {
cq.consumer.imageComplete (1);
this.removeConsumer (cq.consumer);
}, "sun.awt.image.ImageConsumerQueue,~B");
Clazz.overrideMethod (c$, "removeConsumer", 
function (ic) {
for (var id = this.decoders; id != null; id = id.next) {
id.removeConsumer (ic);
}
this.consumers = sun.awt.image.ImageConsumerQueue.removeConsumer (this.consumers, ic, false);
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "startProduction", 
function (ic) {
this.addConsumer (ic, true);
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "startProduction", 
 function () {
if (!this.awaitingFetch) {
sun.awt.image.ImageFetcher.add (this);
this.awaitingFetch = true;
}});
Clazz.overrideMethod (c$, "requestTopDownLeftRightResend", 
function (ic) {
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "decoderForType", 
function (is, content_type) {
return null;
}, "java.io.InputStream,~S");
Clazz.defineMethod (c$, "getDecoder", 
function (is) {
return null;
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "doFetch", 
function () {
{
if (this.consumers == null) {
this.awaitingFetch = false;
return;
}}var imgd = this.getDecoder ();
if (imgd == null) {
this.badDecoder ();
} else {
this.setDecoder (imgd);
try {
imgd.produceImage ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, sun.awt.image.ImageFormatException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
} finally {
this.removeDecoder (imgd);
if (Thread.currentThread ().isInterrupted () || !Thread.currentThread ().isAlive ()) {
this.errorAllConsumers (imgd.queue, true);
} else {
this.errorAllConsumers (imgd.queue, false);
}}
}});
Clazz.defineMethod (c$, "badDecoder", 
 function () {
var cq;
{
cq = this.consumers;
this.consumers = null;
this.awaitingFetch = false;
}this.errorAllConsumers (cq, false);
});
Clazz.defineMethod (c$, "setDecoder", 
 function (mydecoder) {
var cq;
{
mydecoder.next = this.decoders;
this.decoders = mydecoder;
this.decoder = mydecoder;
cq = this.consumers;
mydecoder.queue = cq;
this.consumers = null;
this.awaitingFetch = false;
}}, "sun.awt.image.ImageDecoder");
Clazz.defineMethod (c$, "removeDecoder", 
 function (mydecoder) {
this.doneDecoding (mydecoder);
var idprev = null;
for (var id = this.decoders; id != null; id = id.next) {
if (id === mydecoder) {
if (idprev == null) {
this.decoders = id.next;
} else {
idprev.next = id.next;
}break;
}idprev = id;
}
}, "sun.awt.image.ImageDecoder");
Clazz.defineMethod (c$, "doneDecoding", 
function (mydecoder) {
if (this.decoder === mydecoder) {
this.decoder = null;
if (this.consumers != null) {
this.startProduction ();
}}}, "sun.awt.image.ImageDecoder");
Clazz.defineMethod (c$, "latchConsumers", 
function (id) {
this.doneDecoding (id);
}, "sun.awt.image.ImageDecoder");
Clazz.defineMethod (c$, "flush", 
function () {
this.decoder = null;
});
});
