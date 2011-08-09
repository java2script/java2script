Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.core.runtime.internal.adaptor.Locker", "org.eclipse.osgi.service.datalocation.Location"], "org.eclipse.core.runtime.internal.adaptor.BasicLocation", ["java.io.File", "java.lang.IllegalStateException", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "$.LocationManager", "org.eclipse.core.runtime.internal.adaptor.Locker_JavaIo", "$.Locker_JavaNio"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isReadOnly = false;
this.location = null;
this.parent = null;
this.defaultValue = null;
this.property = null;
this.lockFile = null;
this.locker = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "BasicLocation", null, org.eclipse.osgi.service.datalocation.Location);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.core.runtime.internal.adaptor.BasicLocation, "MockLocker", null, org.eclipse.core.runtime.internal.adaptor.Locker);
Clazz.overrideMethod (c$, "lock", 
function () {
return true;
});
Clazz.overrideMethod (c$, "release", 
function () {
});
c$ = Clazz.p0p ();
c$.isRunningWithNio = Clazz.defineMethod (c$, "isRunningWithNio", 
($fz = function () {
try {
Class.forName ("java.nio.channels.FileLock");
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return false;
} else {
throw e;
}
}
return true;
}, $fz.isPrivate = true, $fz));
c$.createLocker = Clazz.defineMethod (c$, "createLocker", 
function (lock, lockMode) {
if (lockMode == null) lockMode = System.getProperties ().getProperty ("osgi.locking");
if ("none".equals (lockMode)) return  new org.eclipse.core.runtime.internal.adaptor.BasicLocation.MockLocker ();
if ("java.io".equals (lockMode)) return  new org.eclipse.core.runtime.internal.adaptor.Locker_JavaIo (lock);
if ("java.nio".equals (lockMode)) {
if (org.eclipse.core.runtime.internal.adaptor.BasicLocation.isRunningWithNio ()) {
return  new org.eclipse.core.runtime.internal.adaptor.Locker_JavaNio (lock);
} else {
return  new org.eclipse.core.runtime.internal.adaptor.Locker_JavaIo (lock);
}}if (org.eclipse.core.runtime.internal.adaptor.BasicLocation.isRunningWithNio ()) {
return  new org.eclipse.core.runtime.internal.adaptor.Locker_JavaNio (lock);
} else {
return  new org.eclipse.core.runtime.internal.adaptor.Locker_JavaIo (lock);
}}, "java.io.File,~S");
Clazz.makeConstructor (c$, 
function (property, defaultValue, isReadOnly) {
this.property = property;
this.defaultValue = defaultValue;
this.$isReadOnly = isReadOnly;
}, "~S,java.net.URL,~B");
Clazz.overrideMethod (c$, "allowsDefault", 
function () {
return this.defaultValue != null;
});
Clazz.overrideMethod (c$, "getDefault", 
function () {
return this.defaultValue;
});
Clazz.overrideMethod (c$, "getParentLocation", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "getURL", 
function () {
if (this.location == null && this.defaultValue != null) this.setURL (this.defaultValue, false);
return this.location;
});
Clazz.overrideMethod (c$, "isSet", 
function () {
return this.location != null;
});
Clazz.overrideMethod (c$, "isReadOnly", 
function () {
return this.$isReadOnly;
});
Clazz.overrideMethod (c$, "setURL", 
function (value, lock) {
if (this.location != null) throw  new IllegalStateException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CANNOT_CHANGE_LOCATION);
var file = null;
if (value.getProtocol ().equalsIgnoreCase ("file")) file =  new java.io.File (value.getFile (), org.eclipse.core.runtime.internal.adaptor.BasicLocation.LOCK_FILENAME);
lock = lock && !this.$isReadOnly;
if (lock) {
try {
if (!this.lock (file)) return false;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return false;
} else {
throw e;
}
}
}this.lockFile = file;
this.location = org.eclipse.core.runtime.adaptor.LocationManager.buildURL (value.toExternalForm (), true);
if (this.property != null) System.getProperties ().put (this.property, this.location.toExternalForm ());
return lock;
}, "java.net.URL,~B");
Clazz.defineMethod (c$, "setParent", 
function (value) {
this.parent = value;
}, "org.eclipse.osgi.service.datalocation.Location");
Clazz.defineMethod (c$, "lock", 
function () {
if (!this.isSet ()) return false;
return this.lock (this.lockFile);
});
Clazz.defineMethod (c$, "lock", 
($fz = function (lock) {
if (lock == null || this.$isReadOnly) return false;
var parentFile =  new java.io.File (lock.getParent ());
if (!parentFile.exists ()) if (!parentFile.mkdirs ()) return false;
this.setLocker (lock);
if (this.locker == null) return true;
var locked = false;
try {
locked = this.locker.lock ();
return locked;
} finally {
if (!locked) this.locker = null;
}
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "setLocker", 
($fz = function (lock) {
if (this.locker != null) return ;
var lockMode = System.getProperties ().getProperty ("osgi.locking");
this.locker = org.eclipse.core.runtime.internal.adaptor.BasicLocation.createLocker (lock, lockMode);
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.overrideMethod (c$, "release", 
function () {
if (this.locker != null) this.locker.release ();
});
Clazz.defineStatics (c$,
"PROP_OSGI_LOCKING", "osgi.locking",
"LOCK_FILENAME", ".metadata/.lock",
"DEBUG", false);
});
