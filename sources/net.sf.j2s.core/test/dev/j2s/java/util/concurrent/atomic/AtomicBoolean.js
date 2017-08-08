Clazz.declarePackage ("java.util.concurrent.atomic");
c$ = Clazz.decorateAsClass (function () {
this.value = 0;
Clazz.instantialize (this, arguments);
}, java.util.concurrent.atomic, "AtomicBoolean", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (initialValue) {
this.value = initialValue ? 1 : 0;
}, "~B");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "get", 
function () {
return this.value != 0;
});
Clazz.defineMethod (c$, "compareAndSet", 
function (expect, update) {
var e = expect ? 1 : 0;
var u = update ? 1 : 0;
if (this.value == e) {
this.value = u;
return true;
}return false;
}, "~B,~B");
Clazz.defineMethod (c$, "weakCompareAndSet", 
function (expect, update) {
return this.compareAndSet (expect, update);
}, "~B,~B");
Clazz.defineMethod (c$, "set", 
function (newValue) {
this.value = newValue ? 1 : 0;
}, "~B");
Clazz.defineMethod (c$, "lazySet", 
function (newValue) {
this.value = newValue ? 1 : 0;
}, "~B");
Clazz.defineMethod (c$, "getAndSet", 
function (newValue) {
for (; ; ) {
var current = this.get ();
if (this.compareAndSet (current, newValue)) return current;
}
}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return "" + this.get ();
});
