Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.Permission"], "org.eclipse.osgi.framework.internal.core.UnresolvedPermission", ["org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.actions = null;
this.$name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "UnresolvedPermission", java.security.Permission);
Clazz.makeConstructor (c$, 
function (type, name, actions) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.UnresolvedPermission, [type]);
this.$name = name;
this.type = type;
this.actions = actions;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (!(Clazz.instanceOf (obj, org.eclipse.osgi.framework.internal.core.UnresolvedPermission))) {
return false;
}var perm = obj;
return this.type.equals (perm.type) && this.$name.equals (perm.$name) && this.actions.equals (perm.actions);
}, "~O");
Clazz.overrideMethod (c$, "implies", 
function (p) {
return false;
}, "java.security.Permission");
Clazz.overrideMethod (c$, "newPermissionCollection", 
function () {
return  new org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection ();
});
Clazz.overrideMethod (c$, "getActions", 
function () {
return "";
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.toString ().hashCode ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "(unresolved " + this.type + " " + this.$name + " " + this.actions + ")";
});
Clazz.defineMethod (c$, "resolve", 
function (clazz) {
if (clazz.getName ().equals (this.type)) {
try {
var constructor = clazz.getConstructor (org.eclipse.osgi.framework.internal.core.UnresolvedPermission.constructorArgs);
var permission = constructor.newInstance ([this.$name, this.actions]);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Resolved " + this);
}return permission;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Exception trying to resolve permission");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
}return null;
}, "Class");
Clazz.defineStatics (c$,
"constructorArgs", null);
{
var string = String;
($t$ = org.eclipse.osgi.framework.internal.core.UnresolvedPermission.constructorArgs = [string, string], org.eclipse.osgi.framework.internal.core.UnresolvedPermission.prototype.constructorArgs = org.eclipse.osgi.framework.internal.core.UnresolvedPermission.constructorArgs, $t$);
}});
