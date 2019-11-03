Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PrivilegedExceptionAction", "org.eclipse.osgi.framework.adaptor.PermissionStorage"], "org.eclipse.osgi.framework.internal.core.SecurePermissionStorage", ["java.lang.UnsupportedOperationException", "java.security.AccessController"], function () {
c$ = Clazz.decorateAsClass (function () {
this.storage = null;
this.location = null;
this.data = null;
this.v = null;
this.action = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SecurePermissionStorage", null, [org.eclipse.osgi.framework.adaptor.PermissionStorage, java.security.PrivilegedExceptionAction]);
Clazz.makeConstructor (c$, 
function (storage) {
this.storage = storage;
}, "org.eclipse.osgi.framework.adaptor.PermissionStorage");
Clazz.overrideMethod (c$, "run", 
function () {
switch (this.action) {
case 1:
return this.storage.getPermissionData (this.location);
case 2:
this.storage.setPermissionData (this.location, this.data);
return null;
case 3:
return this.storage.getLocations ();
case 5:
this.storage.serializeConditionalPermissionInfos (this.v);
return null;
case 4:
return this.storage.deserializeConditionalPermissionInfos ();
}
throw  new UnsupportedOperationException ();
});
Clazz.defineMethod (c$, "getPermissionData", 
function (location) {
this.location = location;
this.action = 1;
try {
return java.security.AccessController.doPrivileged (this);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getLocations", 
function () {
this.action = 3;
try {
return java.security.AccessController.doPrivileged (this);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "setPermissionData", 
function (location, data) {
this.location = location;
this.data = data;
this.action = 2;
try {
java.security.AccessController.doPrivileged (this);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
}, "~S,~A");
Clazz.defineMethod (c$, "serializeConditionalPermissionInfos", 
function (v) {
this.action = 5;
this.v = v;
try {
java.security.AccessController.doPrivileged (this);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
}, "java.util.Vector");
Clazz.defineMethod (c$, "deserializeConditionalPermissionInfos", 
function () {
this.action = 4;
try {
return java.security.AccessController.doPrivileged (this);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
});
Clazz.defineStatics (c$,
"GET", 1,
"SET", 2,
"LOCATION", 3,
"DESERIALIZE", 4,
"SERIALIZE", 5);
});
