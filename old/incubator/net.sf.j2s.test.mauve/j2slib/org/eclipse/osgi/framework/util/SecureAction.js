Clazz.declarePackage ("org.eclipse.osgi.framework.util");
Clazz.load (null, "org.eclipse.osgi.framework.util.SecureAction", ["java.io.FileInputStream", "$.FileOutputStream", "java.lang.Boolean", "$.Long", "$.Thread", "java.net.URL", "java.security.AccessController", "$.PrivilegedAction", "$.PrivilegedExceptionAction", "java.util.zip.ZipFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.controlContext = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.util, "SecureAction");
Clazz.makeConstructor (c$, 
function () {
this.controlContext = java.security.AccessController.getContext ();
});
Clazz.defineMethod (c$, "getProperty", 
function (property) {
if (System.getSecurityManager () == null) return System.getProperty (property);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return System.getProperty (this.f$.property);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$1, i$, v$);
}) (this, Clazz.cloneFinals ("property", property)), this.controlContext);
}, "~S");
Clazz.defineMethod (c$, "getProperty", 
function (property, def) {
if (System.getSecurityManager () == null) return System.getProperty (property, def);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$2", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return System.getProperty (this.f$.property, this.f$.def);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$2, i$, v$);
}) (this, Clazz.cloneFinals ("property", property, "def", def)), this.controlContext);
}, "~S,~S");
Clazz.defineMethod (c$, "getProperties", 
function () {
if (System.getSecurityManager () == null) return System.getProperties ();
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$3", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return System.getProperties ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$3, i$, v$);
}) (this, null), this.controlContext);
});
Clazz.defineMethod (c$, "getFileInputStream", 
function (file) {
if (System.getSecurityManager () == null) return  new java.io.FileInputStream (file);
try {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$4", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new java.io.FileInputStream (this.f$.file);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$4, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.io.FileNotFoundException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
}
}, "java.io.File");
Clazz.defineMethod (c$, "getFileOutputStream", 
function (file, append) {
if (System.getSecurityManager () == null) return  new java.io.FileOutputStream (file.getAbsolutePath (), append);
try {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$5", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new java.io.FileOutputStream (this.f$.file.getAbsolutePath (), this.f$.append);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$5, i$, v$);
}) (this, Clazz.cloneFinals ("file", file, "append", append)), this.controlContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.io.FileNotFoundException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
}
}, "java.io.File,~B");
Clazz.defineMethod (c$, "length", 
function (file) {
if (System.getSecurityManager () == null) return file.length ();
return (java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$6", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new Long (this.f$.file.length ());
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$6, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext)).longValue ();
}, "java.io.File");
Clazz.defineMethod (c$, "exists", 
function (file) {
if (System.getSecurityManager () == null) return file.exists ();
return (java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$7", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new Boolean (this.f$.file.exists ());
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$7, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext)).booleanValue ();
}, "java.io.File");
Clazz.defineMethod (c$, "isDirectory", 
function (file) {
if (System.getSecurityManager () == null) return file.isDirectory ();
return (java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$8")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$8", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new Boolean (this.f$.file.isDirectory ());
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$8, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext)).booleanValue ();
}, "java.io.File");
Clazz.defineMethod (c$, "lastModified", 
function (file) {
if (System.getSecurityManager () == null) return file.lastModified ();
return (java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$9")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$9", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new Long (this.f$.file.lastModified ());
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$9, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext)).longValue ();
}, "java.io.File");
Clazz.defineMethod (c$, "list", 
function (file) {
if (System.getSecurityManager () == null) return file.list ();
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$10")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$10", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.file.list ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$10, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext);
}, "java.io.File");
Clazz.defineMethod (c$, "getZipFile", 
function (file) {
if (System.getSecurityManager () == null) return  new java.util.zip.ZipFile (file);
try {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$11")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$11", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new java.util.zip.ZipFile (this.f$.file);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$11, i$, v$);
}) (this, Clazz.cloneFinals ("file", file)), this.controlContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.io.IOException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
}
}, "java.io.File");
Clazz.defineMethod (c$, "getURL", 
function (protocol, host, port, file, handler) {
if (System.getSecurityManager () == null) return  new java.net.URL (protocol, host, port, file, handler);
try {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$12")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$12", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new java.net.URL (this.f$.protocol, this.f$.host, this.f$.port, this.f$.file, this.f$.handler);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$12, i$, v$);
}) (this, Clazz.cloneFinals ("protocol", protocol, "host", host, "port", port, "file", file, "handler", handler)), this.controlContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.net.MalformedURLException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
}
}, "~S,~S,~N,~S,java.net.URLStreamHandler");
Clazz.defineMethod (c$, "createThread", 
function (target, name) {
if (System.getSecurityManager () == null) return  new Thread (target, name);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$13")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$13", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new Thread (this.f$.target, this.f$.name);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$13, i$, v$);
}) (this, Clazz.cloneFinals ("target", target, "name", name)), this.controlContext);
}, "Runnable,~S");
Clazz.defineMethod (c$, "getService", 
function (reference, context) {
if (System.getSecurityManager () == null) return context.getService (reference);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$14")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$14", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.context.getService (this.f$.reference);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$14, i$, v$);
}) (this, Clazz.cloneFinals ("context", context, "reference", reference)), this.controlContext);
}, "org.osgi.framework.ServiceReference,org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "forName", 
function (name) {
if (System.getSecurityManager () == null) return Class.forName (name);
try {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$15")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$15", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
return Class.forName (this.f$.name);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$15, i$, v$);
}) (this, Clazz.cloneFinals ("name", name)));
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), ClassNotFoundException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "open", 
function (tracker) {
if (System.getSecurityManager () == null) {
tracker.open ();
return ;
}java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.SecureAction$16")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.util, "SecureAction$16", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.tracker.open ();
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.SecureAction$16, i$, v$);
}) (this, Clazz.cloneFinals ("tracker", tracker)), this.controlContext);
}, "org.osgi.util.tracker.ServiceTracker");
});
