Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundlePermissionCollection", "java.util.Hashtable"], "org.eclipse.osgi.framework.internal.core.BundlePermissions", ["java.lang.SecurityException", "java.util.Enumeration", "$.NoSuchElementException", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.PermissionsHash", "$.UnresolvedPermission"], function () {
c$ = Clazz.decorateAsClass (function () {
this.collections = null;
this.allPermission = null;
this.packageAdmin = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundlePermissions", org.eclipse.osgi.framework.internal.core.BundlePermissionCollection);
Clazz.prepareFields (c$, function () {
this.collections =  new java.util.Hashtable (8);
});
Clazz.makeConstructor (c$, 
function (packageAdmin) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundlePermissions);
this.packageAdmin = packageAdmin;
}, "org.eclipse.osgi.framework.internal.core.PackageAdminImpl");
Clazz.defineMethod (c$, "add", 
function (permission) {
if (this.isReadOnly ()) {
throw  new SecurityException ();
}var collection;
{
collection = this.findCollection (permission);
if (collection == null) {
collection = this.newPermissionCollection (permission);
}}if (Clazz.instanceOf (permission, java.security.AllPermission)) {
this.allPermission = collection;
}collection.add (permission);
}, "java.security.Permission");
Clazz.defineMethod (c$, "elements", 
function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundlePermissions$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.enumMap = null;
this.c = null;
this.enumC = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundlePermissions$1", null, java.util.Enumeration);
Clazz.prepareFields (c$, function () {
this.enumMap = this.b$["org.eclipse.osgi.framework.internal.core.BundlePermissions"].collections.elements ();
this.next = this.findNextPermission ();
});
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
return (this.next != null);
});
Clazz.defineMethod (c$, "nextElement", 
function () {
if (this.next == null) {
throw  new java.util.NoSuchElementException ();
} else {
var answer = this.next;
this.next = this.findNextPermission ();
return (answer);
}});
Clazz.defineMethod (c$, "findNextPermission", 
($fz = function () {
while (this.c == null && this.enumMap.hasMoreElements ()) {
this.c = this.enumMap.nextElement ();
this.enumC = this.c.elements ();
if (!this.enumC.hasMoreElements ()) this.c = null;
}
if (this.c == null) {
return (null);
} else {
var answer = this.enumC.nextElement ();
if (!this.enumC.hasMoreElements ()) this.c = null;
return (answer);
}}, $fz.isPrivate = true, $fz));
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundlePermissions$1, i$, v$);
}) (this, null);
});
Clazz.defineMethod (c$, "findCollection", 
($fz = function (permission) {
var clazz = permission.getClass ();
var collection = this.collections.get (clazz);
if (collection == null) {
{
collection = this.collections.get (clazz);
if (collection == null) {
collection = this.resolvePermissions (permission);
}}}return collection;
}, $fz.isPrivate = true, $fz), "java.security.Permission");
Clazz.defineMethod (c$, "resolvePermissions", 
($fz = function (permission) {
var unresolvedCollection = this.collections.get (org.eclipse.osgi.framework.internal.core.UnresolvedPermission);
if (unresolvedCollection != null) {
var name = permission.getClass ().getName ();
var permissions = unresolvedCollection.getPermissions (name);
if (permissions != null) {
var collection = null;
var clazz;
clazz = permission.getClass ();
if (clazz == null) {
return null;
}var permsEnum = permissions.elements ();
while (permsEnum.hasMoreElements ()) {
var resolved = (permsEnum.nextElement ()).resolve (clazz);
if (resolved != null) {
if (collection == null) {
collection = this.newPermissionCollection (resolved);
}collection.add (resolved);
}}
return collection;
}}return null;
}, $fz.isPrivate = true, $fz), "java.security.Permission");
Clazz.defineMethod (c$, "newPermissionCollection", 
($fz = function (permission) {
var collection = permission.newPermissionCollection ();
if (collection == null) {
collection =  new org.eclipse.osgi.framework.internal.core.PermissionsHash ();
}this.collections.put (permission.getClass (), collection);
return collection;
}, $fz.isPrivate = true, $fz), "java.security.Permission");
Clazz.defineMethod (c$, "implies", 
function (perm) {
if ((this.allPermission != null) && this.allPermission.implies (perm)) {
return true;
}var collection = this.findCollection (perm);
if (collection == null) {
return false;
}return collection.implies (perm);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
{
var size = this.collections.size ();
var clazzes =  new Array (size);
var keysEnum = this.collections.keys ();
for (var i = 0; i < size; i++) {
clazzes[i] = keysEnum.nextElement ();
}
for (var i = 0; i < size; i++) {
var clazz = clazzes[i];
var bundle = this.packageAdmin.getBundle (clazz);
if (bundle == null) continue ;for (var j = 0; j < refreshedBundles.length; j++) if (refreshedBundles[j] === bundle) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("  Unresolving permission class " + clazz.getName ());
}this.collections.remove (clazz);
continue ;}
}
}}, "~A");
});
