Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (null, "org.eclipse.core.internal.registry.ReadWriteMonitor", ["java.lang.IllegalStateException", "$.StringBuffer", "$.Thread"], function () {
c$ = Clazz.decorateAsClass (function () {
this.status = 0;
this.writeLockowner = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ReadWriteMonitor");
Clazz.defineMethod (c$, "enterRead", 
function () {
if (this.writeLockowner === Thread.currentThread ()) return ;
while (this.status < 0) {
try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
this.status++;
});
Clazz.defineMethod (c$, "enterWrite", 
function () {
if (this.writeLockowner !== Thread.currentThread ()) {
while (this.status != 0) {
try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
this.writeLockowner = Thread.currentThread ();
}this.status--;
});
Clazz.defineMethod (c$, "exitRead", 
function () {
if (this.writeLockowner === Thread.currentThread ()) return ;
if (--this.status == 0) this.notifyAll ();
});
Clazz.defineMethod (c$, "exitWrite", 
function () {
if (this.writeLockowner !== Thread.currentThread ()) throw  new IllegalStateException ("Current owner is " + this.writeLockowner);
if (++this.status == 0) {
this.writeLockowner = null;
this.notifyAll ();
}});
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append (this.hashCode ());
if (this.status == 0) {
buffer.append ("Monitor idle ");
} else if (this.status < 0) {
buffer.append ("Monitor writing ");
} else if (this.status > 0) {
buffer.append ("Monitor reading ");
}buffer.append ("(status = ");
buffer.append (this.status);
buffer.append (")");
return buffer.toString ();
});
});
