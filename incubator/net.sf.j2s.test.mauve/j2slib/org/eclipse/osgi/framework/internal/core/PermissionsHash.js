Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PermissionCollection", "java.util.Hashtable"], "org.eclipse.osgi.framework.internal.core.PermissionsHash", ["java.lang.SecurityException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.perms = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "PermissionsHash", java.security.PermissionCollection);
Clazz.prepareFields (c$, function () {
this.perms =  new java.util.Hashtable (8);
});
Clazz.overrideMethod (c$, "add", 
function (perm) {
if (this.isReadOnly ()) {
throw  new SecurityException ();
}this.perms.put (perm, perm);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "elements", 
function () {
return this.perms.keys ();
});
Clazz.overrideMethod (c$, "implies", 
function (perm) {
var p = this.perms.get (perm);
if ((p != null) && p.implies (perm)) {
return true;
}var permsEnum = this.elements ();
while (permsEnum.hasMoreElements ()) {
if ((permsEnum.nextElement ()).implies (perm)) {
return true;
}}
return false;
}, "java.security.Permission");
});
