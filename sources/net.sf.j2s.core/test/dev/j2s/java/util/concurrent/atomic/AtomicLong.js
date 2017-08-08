Clazz.declarePackage ("java.util.concurrent.atomic");
Clazz.load (["java.lang.Number"], "java.util.concurrent.atomic.AtomicLong", ["java.lang.Long"], function () {
c$ = Clazz.decorateAsClass (function () {
this.value = 0;
Clazz.instantialize (this, arguments);
}, java.util.concurrent.atomic, "AtomicLong", Number);
Clazz.makeConstructor (c$, 
function (initialValue) {
Clazz.superConstructor (this, java.util.concurrent.atomic.AtomicLong, []);
this.value = initialValue;
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.concurrent.atomic.AtomicLong, []);
});
Clazz.defineMethod (c$, "get", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "set", 
function (newValue) {
this.value = newValue;
}, "~N");
Clazz.defineMethod (c$, "lazySet", 
function (newValue) {
this.set (newValue);
}, "~N");
Clazz.defineMethod (c$, "getAndSet", 
function (newValue) {
var current = this.value;
this.set (newValue);
return current;
}, "~N");
Clazz.defineMethod (c$, "compareAndSet", 
function (expect, update) {
if (this.value == expect) {
this.value = update;
return true;
}return false;
}, "~N,~N");
Clazz.defineMethod (c$, "weakCompareAndSet", 
function (expect, update) {
return this.compareAndSet (expect, update);
}, "~N,~N");
Clazz.defineMethod (c$, "getAndIncrement", 
function () {
while (true) {
var current = this.get ();
var next = current + 1;
if (this.compareAndSet (current, next)) return current;
}
});
Clazz.defineMethod (c$, "getAndDecrement", 
function () {
while (true) {
var current = this.get ();
var next = current - 1;
if (this.compareAndSet (current, next)) return current;
}
});
Clazz.defineMethod (c$, "getAndAdd", 
function (delta) {
while (true) {
var current = this.get ();
var next = current + delta;
if (this.compareAndSet (current, next)) return current;
}
}, "~N");
Clazz.defineMethod (c$, "incrementAndGet", 
function () {
for (; ; ) {
var current = this.get ();
var next = current + 1;
if (this.compareAndSet (current, next)) return next;
}
});
Clazz.defineMethod (c$, "decrementAndGet", 
function () {
for (; ; ) {
var current = this.get ();
var next = current - 1;
if (this.compareAndSet (current, next)) return next;
}
});
Clazz.defineMethod (c$, "addAndGet", 
function (delta) {
for (; ; ) {
var current = this.get ();
var next = current + delta;
if (this.compareAndSet (current, next)) return next;
}
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return Long.toString (this.get ());
});
Clazz.overrideMethod (c$, "intValue", 
function () {
return this.get ();
});
Clazz.overrideMethod (c$, "longValue", 
function () {
return this.get ();
});
Clazz.overrideMethod (c$, "floatValue", 
function () {
return this.get ();
});
Clazz.overrideMethod (c$, "doubleValue", 
function () {
return this.get ();
});
});
