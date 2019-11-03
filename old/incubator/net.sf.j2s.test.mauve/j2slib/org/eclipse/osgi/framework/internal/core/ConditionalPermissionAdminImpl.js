Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.condpermadmin.ConditionalPermissionAdmin"], "org.eclipse.osgi.framework.internal.core.ConditionalPermissionAdminImpl", ["java.lang.Long", "java.security.AccessControlContext", "$.AllPermission", "$.ProtectionDomain", "java.util.ArrayList", "$.Vector", "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl", "org.osgi.service.condpermadmin.BundleSignerCondition"], function () {
c$ = Clazz.decorateAsClass (function () {
this.condPerms = null;
this.framework = null;
this.storage = null;
this.nextID = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ConditionalPermissionAdminImpl", null, org.osgi.service.condpermadmin.ConditionalPermissionAdmin);
Clazz.prepareFields (c$, function () {
this.nextID = System.currentTimeMillis ();
});
Clazz.makeConstructor (c$, 
function (framework, permissionStorage) {
org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.setConditionalPermissionAdminImpl (this);
this.framework = framework;
this.storage = permissionStorage;
try {
this.condPerms = permissionStorage.deserializeConditionalPermissionInfos ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
framework.publishFrameworkEvent (2, framework.systemBundle, e);
this.condPerms =  new java.util.Vector ();
} else {
throw e;
}
}
}, "org.eclipse.osgi.framework.internal.core.Framework,org.eclipse.osgi.framework.adaptor.PermissionStorage");
Clazz.overrideMethod (c$, "addConditionalPermissionInfo", 
function (conds, perms) {
return this.setConditionalPermissionInfo (null, conds, perms);
}, "~A,~A");
Clazz.overrideMethod (c$, "setConditionalPermissionInfo", 
function (name, conds, perms) {
var sm = System.getSecurityManager ();
if (sm != null) sm.checkPermission ( new java.security.AllPermission ());
if (name == null) name = "generated_" + Long.toString (this.nextID++);
var condPermInfo = null;
{
condPermInfo = this.getConditionalPermissionInfo (name);
if (condPermInfo == null) {
condPermInfo =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl (name, conds, perms);
this.condPerms.add (condPermInfo);
} else {
condPermInfo.conds = conds;
condPermInfo.perms = perms;
}this.saveCondPermInfos ();
}var bundles = this.framework.getAllBundles ();
for (var i = 0; i < bundles.length; i++) {
var bundle = bundles[i];
if (bundle.domain == null) {
continue ;}var bcp = bundle.domain.getPermissions ();
if (perms == null) {
continue ;}bcp.checkConditionalPermissionInfo (condPermInfo);
}
return condPermInfo;
}, "~S,~A,~A");
Clazz.overrideMethod (c$, "getConditionalPermissionInfo", 
function (name) {
for (var eCondPerms = this.condPerms.elements (); eCondPerms.hasMoreElements (); ) {
var condPerm = eCondPerms.nextElement ();
if (name.equals (condPerm.getName ())) return condPerm;
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getConditionalPermissionInfos", 
function () {
{
return this.condPerms.elements ();
}});
Clazz.defineMethod (c$, "deleteConditionalPermissionInfo", 
function (cpi) {
{
this.condPerms.remove (cpi);
this.saveCondPermInfos ();
}}, "org.osgi.service.condpermadmin.ConditionalPermissionInfo");
Clazz.defineMethod (c$, "saveCondPermInfos", 
($fz = function () {
try {
this.storage.serializeConditionalPermissionInfos (this.condPerms);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, e);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getAccessControlContext", 
function (signers) {
var infos = this.getConditionalPermissionInfos ();
var permissionInfos =  new java.util.ArrayList ();
if (infos != null) {
while (infos.hasMoreElements ()) {
var condPermInfo = infos.nextElement ();
var condInfo = condPermInfo.getConditionInfos ();
var match = true;
for (var i = 0; i < condInfo.length; i++) {
if (org.osgi.service.condpermadmin.BundleSignerCondition.getName ().equals (condInfo[i].getType ())) {
var args = condInfo[i].getArgs ();
for (var j = 0; j < args.length; j++) if (!this.framework.adaptor.matchDNChain (args[j], signers)) {
match = false;
break;
}
} else {
match = false;
break;
}}
if (match) {
var addPermInfos = condPermInfo.getPermissionInfos ();
for (var i = 0; i < addPermInfos.length; i++) permissionInfos.add (addPermInfos[i]);

}}
}var collection = this.framework.permissionAdmin.createPermissions (permissionInfos.toArray ( new Array (permissionInfos.size ())), null);
return  new java.security.AccessControlContext (collection == null ?  new Array (0) : [ new java.security.ProtectionDomain (null, collection)]);
}, "~A");
});
