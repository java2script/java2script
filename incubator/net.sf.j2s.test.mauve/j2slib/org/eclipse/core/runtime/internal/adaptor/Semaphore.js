Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
c$ = Clazz.decorateAsClass (function () {
this.notifications = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "Semaphore");
Clazz.makeConstructor (c$, 
function (count) {
this.notifications = count;
}, "~N");
Clazz.defineMethod (c$, "acquire", 
function () {
while (true) {
if (this.notifications > 0) {
this.notifications--;
return ;
}try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "acquire", 
function (delay) {
var start = System.currentTimeMillis ();
var timeLeft = delay;
while (true) {
if (this.notifications > 0) {
this.notifications--;
return true;
}if (timeLeft < 0) return false;
try {
this.wait (timeLeft);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
timeLeft = start + delay - System.currentTimeMillis ();
}
}, "~N");
Clazz.defineMethod (c$, "release", 
function () {
this.notifications++;
this.notifyAll ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "Semaphore(" + this.notifications + ")";
});
