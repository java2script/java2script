Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (null, "org.eclipse.osgi.framework.internal.core.ServiceUse", ["java.lang.IllegalArgumentException", "java.security.AccessController", "$.PrivilegedAction", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleContextImpl", "$.Msg", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.factory = null;
this.service = null;
this.context = null;
this.registration = null;
this.useCount = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ServiceUse");
Clazz.makeConstructor (c$, 
function (context, registration) {
this.context = context;
this.registration = registration;
this.useCount = 0;
var service = registration.service;
if (Clazz.instanceOf (service, org.osgi.framework.ServiceFactory)) {
this.factory = service;
this.service = null;
} else {
this.factory = null;
this.service = service;
}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl,org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl");
Clazz.defineMethod (c$, "getService", 
function () {
if ((this.useCount == 0) && (this.factory != null)) {
var factorybundle = this.registration.context.bundle;
var service;
try {
service = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.ServiceUse$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "ServiceUse$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].factory.getService (this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].context.bundle, this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].registration);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.ServiceUse$1, i$, v$);
}) (this, null));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println (this.factory + ".getService() exception: " + t.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}this.context.framework.adaptor.handleRuntimeError (t);
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_FACTORY_EXCEPTION, this.factory.getClass ().getName (), "getService"), t);
this.context.framework.publishFrameworkEvent (2, factorybundle, be);
return (null);
} else {
throw t;
}
}
if (service == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println (this.factory + ".getService() returned null.");
}var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_OBJECT_NULL_EXCEPTION, this.factory.getClass ().getName ()));
this.context.framework.publishFrameworkEvent (2, factorybundle, be);
return (null);
}var clazzes = this.registration.clazzes;
var invalidService = org.eclipse.osgi.framework.internal.core.BundleContextImpl.checkServiceClass (clazzes, service);
if (invalidService != null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("Service object is not an instanceof " + invalidService);
}throw  new IllegalArgumentException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_NOT_INSTANCEOF_CLASS_EXCEPTION, invalidService));
}this.service = service;
}this.useCount++;
return (this.service);
});
Clazz.defineMethod (c$, "ungetService", 
function () {
if (this.useCount == 0) {
return (true);
}this.useCount--;
if (this.useCount == 0) {
if (this.factory != null) {
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.ServiceUse$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "ServiceUse$2", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].factory.ungetService (this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].context.bundle, this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].registration, this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].service);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.ServiceUse$2, i$, v$);
}) (this, null));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println (this.factory + ".ungetService() exception");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}var factorybundle = this.registration.context.bundle;
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_FACTORY_EXCEPTION, this.factory.getClass ().getName (), "ungetService"), t);
this.context.framework.publishFrameworkEvent (2, factorybundle, be);
} else {
throw t;
}
}
this.service = null;
}return (true);
}return (false);
});
Clazz.defineMethod (c$, "releaseService", 
function () {
if ((this.useCount > 0) && (this.factory != null)) {
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.ServiceUse$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "ServiceUse$3", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].factory.ungetService (this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].context.bundle, this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].registration, this.b$["org.eclipse.osgi.framework.internal.core.ServiceUse"].service);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.ServiceUse$3, i$, v$);
}) (this, null));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println (this.factory + ".ungetService() exception");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}var factorybundle = this.registration.context.bundle;
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_FACTORY_EXCEPTION, this.factory.getClass ().getName (), "ungetService"), t);
this.context.framework.publishFrameworkEvent (2, factorybundle, be);
} else {
throw t;
}
}
this.service = null;
}this.useCount = 0;
});
});
