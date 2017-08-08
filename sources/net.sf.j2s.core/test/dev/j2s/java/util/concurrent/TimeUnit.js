Clazz.declarePackage ("java.util.concurrent");
Clazz.load (["java.lang.Enum"], "java.util.concurrent.TimeUnit", ["java.lang.AbstractMethodError", "$.Thread"], function () {
c$ = Clazz.declareType (java.util.concurrent, "TimeUnit", Enum);
c$.x = Clazz.defineMethod (c$, "x", 
function (d, m, over) {
if (d > over) return 9223372036854775807;
if (d < -over) return -9223372036854775808;
return d * m;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "convert", 
function (sourceDuration, sourceUnit) {
throw  new AbstractMethodError ();
}, "~N,java.util.concurrent.TimeUnit");
Clazz.defineMethod (c$, "toNanos", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toMicros", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toMillis", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toSeconds", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toMinutes", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toHours", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "toDays", 
function (duration) {
throw  new AbstractMethodError ();
}, "~N");
Clazz.defineMethod (c$, "timedWait", 
function (obj, timeout) {
if (timeout > 0) {
var ms = this.toMillis (timeout);
var ns = this.excessNanos (timeout, ms);
obj.wait (ms, ns);
}}, "~O,~N");
Clazz.defineMethod (c$, "timedJoin", 
function (thread, timeout) {
if (timeout > 0) {
var ms = this.toMillis (timeout);
var ns = this.excessNanos (timeout, ms);
thread.join (ms, ns);
}}, "Thread,~N");
Clazz.defineMethod (c$, "sleep", 
function (timeout) {
if (timeout > 0) {
var ms = this.toMillis (timeout);
var ns = this.excessNanos (timeout, ms);
Thread.sleep (ms, ns);
}}, "~N");
c$.C0 = 1;
c$.C1 = 1000;
c$.C2 = 1000000;
c$.C3 = 1000000000;
c$.C4 = 60000000000;
c$.C5 = 3600000000000;
c$.C6 = 86400000000000;
c$.MAX = 9223372036854775807;
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$1") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$1$ ())Clazz.defineEnumConstant (c$, "NANOSECONDS", 0, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$2") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$2$ ())Clazz.defineEnumConstant (c$, "MICROSECONDS", 1, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$3") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$3$ ())Clazz.defineEnumConstant (c$, "MILLISECONDS", 2, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$4") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$4$ ())Clazz.defineEnumConstant (c$, "SECONDS", 3, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$5") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$5$ ())Clazz.defineEnumConstant (c$, "MINUTES", 4, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$6") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$6$ ())Clazz.defineEnumConstant (c$, "HOURS", 5, [], java.util.concurrent.TimeUnit);
(Clazz.isClassDefined ("java.util.concurrent.TimeUnit$7") ? 0 : java.util.concurrent.TimeUnit.$TimeUnit$7$ ())Clazz.defineEnumConstant (c$, "DAYS", 6, [], java.util.concurrent.TimeUnit);
});
