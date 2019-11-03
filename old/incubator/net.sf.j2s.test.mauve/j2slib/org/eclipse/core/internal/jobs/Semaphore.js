Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (null, "org.eclipse.core.internal.jobs.Semaphore", ["java.lang.InterruptedException", "$.Thread"], function () {
c$ = Clazz.decorateAsClass (function () {
this.notifications = 0;
this.runnable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "Semaphore");
Clazz.makeConstructor (c$, 
function (runnable) {
this.runnable = runnable;
this.notifications = 0;
}, "Runnable");
Clazz.defineMethod (c$, "acquire", 
function (delay) {
if (Thread.interrupted ()) throw  new InterruptedException ();
var start = System.currentTimeMillis ();
var timeLeft = delay;
while (true) {
if (this.notifications > 0) {
this.notifications--;
return true;
}if (timeLeft <= 0) return false;
this.wait (timeLeft);
timeLeft = start + delay - System.currentTimeMillis ();
}
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
return (this.runnable === (obj).runnable);
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.runnable == null ? 0 : this.runnable.hashCode ();
});
Clazz.defineMethod (c$, "release", 
function () {
this.notifications++;
this.notifyAll ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "Semaphore(" + this.runnable + ")";
});
});
