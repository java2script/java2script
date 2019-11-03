Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["java.lang.ClassLoader", "$.SecurityManager", "java.security.PrivilegedAction", "$.AccessController"], "org.eclipse.core.runtime.internal.adaptor.ContextFinder", ["java.lang.ClassNotFoundException"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.internal.adaptor, "ContextFinder", ClassLoader, java.security.PrivilegedAction);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.core.runtime.internal.adaptor.ContextFinder, "Finder", SecurityManager);
c$ = Clazz.p0p ();
Clazz.defineMethod (c$, "basicFindClassLoader", 
function () {
var stack = org.eclipse.core.runtime.internal.adaptor.ContextFinder.contextFinder.getClassContext ();
var result = null;
for (var i = 1; i < stack.length; i++) {
var tmp = stack[i].getClassLoader ();
if (stack[i] !== org.eclipse.core.runtime.internal.adaptor.ContextFinder && tmp != null && tmp !== this) {
result = tmp;
break;
}}
if (this.checkClassLoader (result)) return result;
return null;
});
Clazz.defineMethod (c$, "checkClassLoader", 
($fz = function (classloader) {
if (classloader == null || classloader === this.getParent ()) return false;
for (var parent = classloader.getParent (); parent != null; parent = parent.getParent ()) if (parent === this) return false;

return true;
}, $fz.isPrivate = true, $fz), "ClassLoader");
Clazz.defineMethod (c$, "findClassLoader", 
($fz = function () {
if (System.getSecurityManager () == null) return this.basicFindClassLoader ();
return java.security.AccessController.doPrivileged (this);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function () {
return this.basicFindClassLoader ();
});
Clazz.defineMethod (c$, "loadClass", 
function (arg0, arg1) {
var result = null;
try {
result = Clazz.superCall (this, org.eclipse.core.runtime.internal.adaptor.ContextFinder, "loadClass", [arg0, arg1]);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
if (result == null) {
var toConsult = this.findClassLoader ();
if (toConsult != null) result = toConsult.loadClass (arg0);
}if (result == null) throw  new ClassNotFoundException (arg0);
return result;
}, "~S,~B");
Clazz.defineMethod (c$, "findResource", 
function (arg0) {
var result = Clazz.superCall (this, org.eclipse.core.runtime.internal.adaptor.ContextFinder, "findResource", [arg0]);
if (result == null) {
var toConsult = this.findClassLoader ();
if (toConsult != null) result = toConsult.getResource (arg0);
}return result;
}, "~S");
Clazz.defineMethod (c$, "findResources", 
function (arg0) {
try {
var result = Clazz.superCall (this, org.eclipse.core.runtime.internal.adaptor.ContextFinder, "findResources", [arg0]);
if (result == null) {
var toConsult = this.findClassLoader ();
if (toConsult != null) result = toConsult.getResources (arg0);
}return result;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "~S");
c$.contextFinder = c$.prototype.contextFinder = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.internal.adaptor.ContextFinder$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.internal.adaptor, "ContextFinder$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new org.eclipse.core.runtime.internal.adaptor.ContextFinder.Finder ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.adaptor.ContextFinder$1, i$, v$);
}) (this, null));
});
