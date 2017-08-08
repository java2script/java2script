Clazz.declarePackage ("java.util.concurrent");
Clazz.load (["java.util.AbstractQueue", "$.Iterator", "$.PriorityQueue", "java.util.concurrent.locks.ReentrantLock"], "java.util.concurrent.DelayQueue", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "java.util.NoSuchElementException", "java.util.concurrent.TimeUnit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lock = null;
this.available = null;
this.q = null;
if (!Clazz.isClassDefined ("java.util.concurrent.DelayQueue.Itr")) {
java.util.concurrent.DelayQueue.$DelayQueue$Itr$ ();
}
Clazz.instantialize (this, arguments);
}, java.util.concurrent, "DelayQueue", java.util.AbstractQueue);
Clazz.prepareFields (c$, function () {
this.lock =  new java.util.concurrent.locks.ReentrantLock ();
this.available = this.lock.newCondition ();
this.q =  new java.util.PriorityQueue ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.concurrent.DelayQueue, []);
});
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, java.util.concurrent.DelayQueue, []);
this.addAll (c);
}, "java.util.Collection");
Clazz.overrideMethod (c$, "add", 
function (e) {
return this.offer (e);
}, "~O");
Clazz.defineMethod (c$, "offer", 
function (e) {
var lock = this.lock;
lock.lock ();
try {
var first = this.q.peek ();
this.q.offer (e);
if (first == null || e.compareTo (first) < 0) this.available.signalAll ();
return true;
} finally {
lock.unlock ();
}
}, "~O");
Clazz.defineMethod (c$, "put", 
function (e) {
this.offer (e);
}, "~O");
Clazz.defineMethod (c$, "offer", 
function (e, timeout, unit) {
return this.offer (e);
}, "~O,~N,java.util.concurrent.TimeUnit");
Clazz.defineMethod (c$, "poll", 
function () {
var lock = this.lock;
lock.lock ();
try {
var first = this.q.peek ();
if (first == null || first.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS) > 0) return null;
 else {
var x = this.q.poll ();
if (this.q.size () != 0) this.available.signalAll ();
return x;
}} finally {
lock.unlock ();
}
});
Clazz.defineMethod (c$, "take", 
function () {
var lock = this.lock;
lock.lockInterruptibly ();
try {
for (; ; ) {
var first = this.q.peek ();
if (first == null) {
this.available.await ();
} else {
var delay = first.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS);
if (delay > 0) {
var tl = this.available.awaitNanos (delay);
} else {
var x = this.q.poll ();
if (this.q.size () != 0) this.available.signalAll ();
return x;
}}}
} finally {
lock.unlock ();
}
});
Clazz.defineMethod (c$, "poll", 
function (timeout, unit) {
var nanos = unit.toNanos (timeout);
var lock = this.lock;
lock.lockInterruptibly ();
try {
for (; ; ) {
var first = this.q.peek ();
if (first == null) {
if (nanos <= 0) return null;
 else nanos = this.available.awaitNanos (nanos);
} else {
var delay = first.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS);
if (delay > 0) {
if (nanos <= 0) return null;
if (delay > nanos) delay = nanos;
var timeLeft = this.available.awaitNanos (delay);
nanos -= delay - timeLeft;
} else {
var x = this.q.poll ();
if (this.q.size () != 0) this.available.signalAll ();
return x;
}}}
} finally {
lock.unlock ();
}
}, "~N,java.util.concurrent.TimeUnit");
Clazz.overrideMethod (c$, "peek", 
function () {
var lock = this.lock;
lock.lock ();
try {
return this.q.peek ();
} finally {
lock.unlock ();
}
});
Clazz.overrideMethod (c$, "size", 
function () {
var lock = this.lock;
lock.lock ();
try {
return this.q.size ();
} finally {
lock.unlock ();
}
});
Clazz.defineMethod (c$, "drainTo", 
function (c) {
if (c == null) throw  new NullPointerException ();
if (c === this) throw  new IllegalArgumentException ();
var lock = this.lock;
lock.lock ();
try {
var n = 0;
for (; ; ) {
var first = this.q.peek ();
if (first == null || first.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS) > 0) break;
c.add (this.q.poll ());
++n;
}
if (n > 0) this.available.signalAll ();
return n;
} finally {
lock.unlock ();
}
}, "java.util.Collection");
Clazz.defineMethod (c$, "drainTo", 
function (c, maxElements) {
if (c == null) throw  new NullPointerException ();
if (c === this) throw  new IllegalArgumentException ();
if (maxElements <= 0) return 0;
var lock = this.lock;
lock.lock ();
try {
var n = 0;
while (n < maxElements) {
var first = this.q.peek ();
if (first == null || first.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS) > 0) break;
c.add (this.q.poll ());
++n;
}
if (n > 0) this.available.signalAll ();
return n;
} finally {
lock.unlock ();
}
}, "java.util.Collection,~N");
Clazz.overrideMethod (c$, "clear", 
function () {
var lock = this.lock;
lock.lock ();
try {
this.q.clear ();
} finally {
lock.unlock ();
}
});
Clazz.defineMethod (c$, "remainingCapacity", 
function () {
return 2147483647;
});
Clazz.defineMethod (c$, "toArray", 
function () {
var lock = this.lock;
lock.lock ();
try {
return this.q.toArray ();
} finally {
lock.unlock ();
}
});
Clazz.defineMethod (c$, "toArray", 
function (a) {
var lock = this.lock;
lock.lock ();
try {
return this.q.toArray (a);
} finally {
lock.unlock ();
}
}, "~A");
Clazz.defineMethod (c$, "remove", 
function (o) {
var lock = this.lock;
lock.lock ();
try {
return this.q.remove (o);
} finally {
lock.unlock ();
}
}, "~O");
Clazz.overrideMethod (c$, "iterator", 
function () {
return Clazz.innerTypeInstance (java.util.concurrent.DelayQueue.Itr, this, null, this.toArray ());
});
c$.$DelayQueue$Itr$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.array = null;
this.cursor = 0;
this.lastRet = 0;
Clazz.instantialize (this, arguments);
}, java.util.concurrent.DelayQueue, "Itr", null, java.util.Iterator);
Clazz.makeConstructor (c$, 
function (a) {
this.lastRet = -1;
this.array = a;
}, "~A");
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.cursor < this.array.length;
});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.cursor >= this.array.length) throw  new java.util.NoSuchElementException ();
this.lastRet = this.cursor;
return this.array[this.cursor++];
});
Clazz.overrideMethod (c$, "remove", 
function () {
if (this.lastRet < 0) throw  new IllegalStateException ();
var a = this.array[this.lastRet];
this.lastRet = -1;
this.b$["java.util.concurrent.DelayQueue"].lock.lock ();
try {
for (var b = this.b$["java.util.concurrent.DelayQueue"].q.iterator (); b.hasNext (); ) {
if (b.next () === a) {
b.remove ();
return;
}}
} finally {
this.b$["java.util.concurrent.DelayQueue"].lock.unlock ();
}
});
c$ = Clazz.p0p ();
};
});
