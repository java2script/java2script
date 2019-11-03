Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.core.runtime.internal.adaptor.Locker"], "org.eclipse.core.runtime.internal.adaptor.Locker_JavaNio", ["java.io.FileOutputStream", "$.IOException", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.core.runtime.internal.adaptor.BasicLocation", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lockFile = null;
this.fileLock = null;
this.fileStream = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "Locker_JavaNio", null, org.eclipse.core.runtime.internal.adaptor.Locker);
Clazz.makeConstructor (c$, 
function (lockFile) {
this.lockFile = lockFile;
}, "java.io.File");
Clazz.overrideMethod (c$, "lock", 
function () {
this.fileStream =  new java.io.FileOutputStream (this.lockFile, true);
try {
this.fileLock = this.fileStream.getChannel ().tryLock ();
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
if (org.eclipse.core.runtime.internal.adaptor.BasicLocation.DEBUG) {
var basicMessage = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.location_cannotLock, this.lockFile);
var basicEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", basicMessage, 0, ioe, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (basicEntry);
}var specificMessage = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.location_cannotLockNIO, [this.lockFile, ioe.getMessage (), "\"-Dosgi.locking=none\""]);
throw  new java.io.IOException (specificMessage);
} else {
throw ioe;
}
}
if (this.fileLock != null) return true;
this.fileStream.close ();
this.fileStream = null;
return false;
});
Clazz.overrideMethod (c$, "release", 
function () {
if (this.fileLock != null) {
try {
this.fileLock.release ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.fileLock = null;
}if (this.fileStream != null) {
try {
this.fileStream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.fileStream = null;
}});
});
