Clazz.declarePackage ("java.io");
Clazz.load (null, "java.io.FileDescriptor", ["java.util.concurrent.atomic.AtomicInteger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fd = 0;
this.useCount = null;
Clazz.instantialize (this, arguments);
}, java.io, "FileDescriptor");
Clazz.makeConstructor (c$, 
function () {
this.fd = -1;
this.useCount =  new java.util.concurrent.atomic.AtomicInteger ();
});
Clazz.makeConstructor (c$, 
 function (fd) {
this.fd = fd;
this.useCount =  new java.util.concurrent.atomic.AtomicInteger ();
}, "~N");
Clazz.defineMethod (c$, "valid", 
function () {
return this.fd != -1;
});
Clazz.defineMethod (c$, "incrementAndGetUseCount", 
function () {
return this.useCount.incrementAndGet ();
});
Clazz.defineMethod (c$, "decrementAndGetUseCount", 
function () {
return this.useCount.decrementAndGet ();
});
c$.$in = c$.prototype.$in =  new java.io.FileDescriptor (0);
c$.out = c$.prototype.out =  new java.io.FileDescriptor (1);
c$.err = c$.prototype.err =  new java.io.FileDescriptor (2);
});
