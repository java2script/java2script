Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.lang.ClassLoader", "org.eclipse.osgi.framework.internal.core.IBuddyPolicy"], "org.eclipse.osgi.framework.internal.core.SystemPolicy", ["java.security.AccessController", "$.PrivilegedAction"], function () {
c$ = Clazz.decorateAsClass (function () {
this.classLoader = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SystemPolicy", null, org.eclipse.osgi.framework.internal.core.IBuddyPolicy);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core.SystemPolicy, "ParentClassLoader", ClassLoader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.SystemPolicy.ParentClassLoader, [null]);
});
c$ = Clazz.p0p ();
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (type) {
if (org.eclipse.osgi.framework.internal.core.SystemPolicy.instances[type] == null) {
org.eclipse.osgi.framework.internal.core.SystemPolicy.instances[type] =  new org.eclipse.osgi.framework.internal.core.SystemPolicy ();
org.eclipse.osgi.framework.internal.core.SystemPolicy.instances[type].classLoader = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.SystemPolicy$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "SystemPolicy$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return org.eclipse.osgi.framework.internal.core.SystemPolicy.createClassLoader (this.f$.type);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.SystemPolicy$1, i$, v$);
}) (this, Clazz.cloneFinals ("type", type)));
}return org.eclipse.osgi.framework.internal.core.SystemPolicy.instances[type];
}, "~N");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (parent) {
this.classLoader = parent;
}, "ClassLoader");
c$.createClassLoader = Clazz.defineMethod (c$, "createClassLoader", 
function (type) {
switch (type) {
case 2:
if (ClassLoader.getSystemClassLoader () != null) return ClassLoader.getSystemClassLoader ();
return  new org.eclipse.osgi.framework.internal.core.SystemPolicy.ParentClassLoader ();
case 0:
return  new org.eclipse.osgi.framework.internal.core.SystemPolicy.ParentClassLoader ();
case 1:
if (ClassLoader.getSystemClassLoader () != null) return ClassLoader.getSystemClassLoader ().getParent ();
return  new org.eclipse.osgi.framework.internal.core.SystemPolicy.ParentClassLoader ();
}
return null;
}, "~N");
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
try {
return this.classLoader.loadClass (name);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "loadResource", 
function (name) {
return this.classLoader.getResource (name);
}, "~S");
Clazz.overrideMethod (c$, "loadResources", 
function (name) {
try {
return this.classLoader.getResources (name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineStatics (c$,
"BOOT", 0,
"EXT", 1,
"APP", 2);
c$.instances = c$.prototype.instances =  new Array (3);
});
