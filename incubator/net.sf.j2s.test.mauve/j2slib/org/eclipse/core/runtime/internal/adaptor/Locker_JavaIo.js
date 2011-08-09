Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.core.runtime.internal.adaptor.Locker"], "org.eclipse.core.runtime.internal.adaptor.Locker_JavaIo", ["java.io.RandomAccessFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lockFile = null;
this.lockRAF = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "Locker_JavaIo", null, org.eclipse.core.runtime.internal.adaptor.Locker);
Clazz.makeConstructor (c$, 
function (lockFile) {
this.lockFile = lockFile;
}, "java.io.File");
Clazz.overrideMethod (c$, "lock", 
function () {
if (this.lockFile.exists ()) this.lockFile.$delete ();
if (this.lockFile.exists ()) return false;
this.lockRAF =  new java.io.RandomAccessFile (this.lockFile, "rw");
this.lockRAF.writeByte (0);
return true;
});
Clazz.overrideMethod (c$, "release", 
function () {
try {
if (this.lockRAF != null) {
this.lockRAF.close ();
this.lockRAF = null;
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.lockFile != null) this.lockFile.$delete ();
});
});
