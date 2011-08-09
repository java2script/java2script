Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.permissionadmin.PermissionAdmin"], "org.eclipse.osgi.framework.internal.core.PermissionAdminImpl", ["java.io.BufferedReader", "$.DataInputStream", "$.File", "$.InputStreamReader", "java.lang.NullPointerException", "java.security.AllPermission", "java.util.Vector", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions", "$.BundlePermissions", "$.BundleProtectionDomainImpl", "$.ConditionalPermissionInfoImpl", "$.ConditionalPermissionSet", "$.ConditionalPermissions", "$.SecurePermissionStorage", "$.UnresolvedPermission", "org.osgi.framework.AdminPermission", "org.osgi.service.permissionadmin.PermissionInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.framework = null;
this.storage = null;
this.defaultDefaultPermissionInfos = null;
this.baseImpliedPermissionInfos = null;
this.defaultAssignedPermissions = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "PermissionAdminImpl", null, org.osgi.service.permissionadmin.PermissionAdmin);
Clazz.makeConstructor (c$, 
function (framework, storage) {
this.framework = framework;
this.storage = storage;
this.defaultDefaultPermissionInfos = this.getPermissionInfos ("default.permissions");
this.baseImpliedPermissionInfos = this.getPermissionInfos ("implied.permissions");
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Default default assigned bundle permissions");
if (this.defaultDefaultPermissionInfos == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < this.defaultDefaultPermissionInfos.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + this.defaultDefaultPermissionInfos[i]);
}
}org.eclipse.osgi.framework.debug.Debug.println ("Base implied bundle permissions");
if (this.baseImpliedPermissionInfos == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < this.baseImpliedPermissionInfos.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + this.baseImpliedPermissionInfos[i]);
}
}}this.defaultAssignedPermissions =  new org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions (null);
this.defaultAssignedPermissions.setAssignedPermissions (this.createDefaultAssignedPermissions (this.getDefaultPermissions ()), true);
}, "org.eclipse.osgi.framework.internal.core.Framework,org.eclipse.osgi.framework.adaptor.PermissionStorage");
Clazz.overrideMethod (c$, "getPermissions", 
function (location) {
if (location == null) {
throw  new NullPointerException ();
}var storage =  new org.eclipse.osgi.framework.internal.core.SecurePermissionStorage (this.storage);
try {
var data = storage.getPermissionData (location);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Getting permissions for location: " + location);
if (data == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < data.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + data[i]);
}
}}return this.makePermissionInfo (data);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "setPermissions", 
function (location, permissions) {
var sm = System.getSecurityManager ();
if (sm != null) sm.checkPermission ( new java.security.AllPermission ());
if (location == null) {
throw  new NullPointerException ();
}var storage =  new org.eclipse.osgi.framework.internal.core.SecurePermissionStorage (this.storage);
try {
var data = this.makePermissionData (permissions);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Setting permissions for location: " + location);
if (data == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < data.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + data[i]);
}
}}storage.setPermissionData (location, data);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
return ;
} else {
throw e;
}
}
var bundle = this.framework.getBundleByLocation (location);
if ((bundle != null) && (bundle.getBundleId () != 0)) {
var domain = bundle.getProtectionDomain ();
if (domain != null) {
var combined = domain.getPermissions ();
if (permissions == null) {
combined.setAssignedPermissions (this.defaultAssignedPermissions, true);
} else {
combined.setAssignedPermissions (this.createPermissions (permissions, bundle), false);
}}}}, "~S,~A");
Clazz.overrideMethod (c$, "getLocations", 
function () {
var storage =  new org.eclipse.osgi.framework.internal.core.SecurePermissionStorage (this.storage);
try {
var locations = storage.getLocations ();
return locations;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getDefaultPermissions", 
function () {
var storage =  new org.eclipse.osgi.framework.internal.core.SecurePermissionStorage (this.storage);
try {
var data = storage.getPermissionData (null);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Getting default permissions");
if (data == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < data.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + data[i]);
}
}}return this.makePermissionInfo (data);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "setDefaultPermissions", 
function (permissions) {
var sm = System.getSecurityManager ();
if (sm != null) sm.checkPermission ( new java.security.AllPermission ());
var storage =  new org.eclipse.osgi.framework.internal.core.SecurePermissionStorage (this.storage);
try {
var data = this.makePermissionData (permissions);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Setting default permissions");
if (data == null) {
org.eclipse.osgi.framework.debug.Debug.println ("  <none>");
} else {
for (var i = 0; i < data.length; i++) {
org.eclipse.osgi.framework.debug.Debug.println ("  " + data[i]);
}
}}storage.setPermissionData (null, data);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
return ;
} else {
throw e;
}
}
this.defaultAssignedPermissions.setAssignedPermissions (this.createDefaultAssignedPermissions (permissions), true);
}, "~A");
Clazz.defineMethod (c$, "makePermissionInfo", 
function (data) {
if (data == null) {
return null;
}var size = data.length;
var permissions =  new Array (size);
for (var i = 0; i < size; i++) {
permissions[i] =  new org.osgi.service.permissionadmin.PermissionInfo (data[i]);
}
return permissions;
}, "~A");
Clazz.defineMethod (c$, "makePermissionData", 
function (permissions) {
if (permissions == null) {
return null;
}var size = permissions.length;
var data =  new Array (size);
for (var i = 0; i < size; i++) {
data[i] = permissions[i].getEncoded ();
}
return data;
}, "~A");
Clazz.defineMethod (c$, "createProtectionDomain", 
function (bundle) {
var implied = this.getImpliedPermissions (bundle);
var combined =  new org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions (implied);
var assigned = this.getAssignedPermissions (bundle);
combined.setAssignedPermissions (assigned, assigned === this.defaultAssignedPermissions);
combined.setConditionalPermissions ( new org.eclipse.osgi.framework.internal.core.ConditionalPermissions (bundle, this.framework.condPermAdmin));
var u = bundle.getEntry ("OSGI-INF/permissions.perm");
if (u != null) {
try {
var dis =  new java.io.DataInputStream (u.openStream ());
var line;
var piList =  new java.util.Vector ();
while ((line = dis.readLine ()) != null) {
line = line.trim ();
if (line.startsWith ("#") || line.startsWith ("//") || line.length == 0) continue ;try {
var pi =  new org.osgi.service.permissionadmin.PermissionInfo (line);
piList.add (pi);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.framework.publishFrameworkEvent (2, bundle, e);
} else {
throw e;
}
}
}
var cpiArray =  new Array (1);
cpiArray[0] =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl (null,  new Array (0), piList.toArray ( new Array (0)));
var cps =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet (cpiArray,  new Array (0));
combined.setRestrictedPermissions (cps);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.framework.publishFrameworkEvent (2, bundle, e);
} else {
throw e;
}
}
}return  new org.eclipse.osgi.framework.internal.core.BundleProtectionDomainImpl (bundle, combined);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "createDefaultAssignedPermissions", 
function (info) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Creating default assigned permissions");
}if (info == null) {
info = this.defaultDefaultPermissionInfos;
}return this.createPermissions (info, null);
}, "~A");
Clazz.defineMethod (c$, "getAssignedPermissions", 
function (bundle) {
var location = bundle.getLocation ();
var info = this.getPermissions (location);
if (info == null) {
return this.defaultAssignedPermissions;
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Creating assigned permissions for " + bundle);
}return this.createPermissions (info, bundle);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "getImpliedPermissions", 
function (bundle) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) org.eclipse.osgi.framework.debug.Debug.println ("Creating implied permissions for " + bundle);
var collection = this.createPermissions (this.baseImpliedPermissionInfos, bundle);
var permission =  new org.osgi.framework.AdminPermission ("(id=" + bundle.getBundleId () + ")", "resource,metadata,class");
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) org.eclipse.osgi.framework.debug.Debug.println ("Created permission: " + permission);
collection.add (permission);
return collection;
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "getPermissionInfos", 
function (resource) {
var info = null;
var $in = this.getClass ().getResourceAsStream (resource);
if ($in != null) {
try {
var permissions =  new java.util.Vector ();
var reader;
try {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF8"));
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in));
} else {
throw e;
}
}
while (true) {
var line = reader.readLine ();
if (line == null) {
break;
}line = line.trim ();
if ((line.length == 0) || line.startsWith ("#") || line.startsWith ("//")) {
continue ;}try {
permissions.addElement ( new org.osgi.service.permissionadmin.PermissionInfo (line));
} catch (iae) {
if (Clazz.instanceOf (iae, IllegalArgumentException)) {
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, iae);
} else {
throw iae;
}
}
}
var size = permissions.size ();
if (size > 0) {
info =  new Array (size);
permissions.copyInto (info);
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
}return info;
}, "~S");
Clazz.defineMethod (c$, "createPermissions", 
function (info, bundle) {
var collection =  new org.eclipse.osgi.framework.internal.core.BundlePermissions (this.framework.packageAdmin);
var size = info.length;
for (var i = 0; i < size; i++) {
var perm = info[i];
var type = perm.getType ();
if (type.equals ("java.io.FilePermission")) {
var name = perm.getName ();
if (!name.equals ("<<ALL FILES>>")) {
var file =  new java.io.File (name);
if (!file.isAbsolute ()) {
if (bundle == null) {
continue ;}var target = this.framework.getDataFile (bundle, name);
if (target == null) {
continue ;}perm =  new org.osgi.service.permissionadmin.PermissionInfo (type, target.getPath (), perm.getActions ());
}}}collection.add (this.createPermission (perm));
}
return collection;
}, "~A,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "createPermission", 
function (info) {
var type = info.getType ();
var name = info.getName ();
var actions = info.getActions ();
var permission =  new org.eclipse.osgi.framework.internal.core.UnresolvedPermission (type, name, actions);
try {
var clazz = Class.forName (type);
var resolved = permission.resolve (clazz);
if (resolved != null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Created permission: " + resolved);
}return resolved;
}} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Created permission: " + permission);
}return permission;
}, "org.osgi.service.permissionadmin.PermissionInfo");
c$.ADMIN_IMPLIED_ACTIONS = c$.prototype.ADMIN_IMPLIED_ACTIONS = "resource,metadata,class";
});
