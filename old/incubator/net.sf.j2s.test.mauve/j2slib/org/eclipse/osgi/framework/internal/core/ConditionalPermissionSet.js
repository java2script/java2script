Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PermissionCollection", "java.util.HashMap"], "org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet", ["java.lang.RuntimeException", "java.security.AllPermission", "org.eclipse.osgi.framework.internal.core.PermissionsHash"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cpis = null;
this.cachedPermissionCollections = null;
this.hasAllPermission = false;
this.neededConditions = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ConditionalPermissionSet", java.security.PermissionCollection);
Clazz.prepareFields (c$, function () {
this.cpis =  new Array (0);
this.cachedPermissionCollections =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (cpis, neededConditions) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet, []);
this.cpis = cpis;
this.neededConditions = neededConditions;
this.checkForAllPermission ();
}, "~A,~A");
Clazz.defineMethod (c$, "addConditionalPermissionInfo", 
function (cpi) {
if (this.neededConditions == null || this.neededConditions.length > 0) throw  new RuntimeException ("Cannot add ConditionalPermissionInfoImpl to a non satisfied set");
for (var i = 0; i < this.cpis.length; i++) if (this.cpis[i] == null) {
this.cpis[i] = cpi;
this.cachedPermissionCollections.clear ();
return ;
}
var newcpis =  new Array (this.cpis.length + 1);
System.arraycopy (this.cpis, 0, newcpis, 0, this.cpis.length);
newcpis[this.cpis.length] = cpi;
this.cpis = newcpis;
this.cachedPermissionCollections.clear ();
this.checkForAllPermission ();
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl");
Clazz.defineMethod (c$, "checkForAllPermission", 
($fz = function () {
if (this.hasAllPermission) {
return ;
}out : for (var i = 0; i < this.cpis.length; i++) {
if (this.cpis[i] == null) continue ;var perms = this.cpis[i].perms;
for (var j = 0; j < perms.length; j++) {
if (perms[j].getType ().equals (java.security.AllPermission.getName ())) {
this.hasAllPermission = true;
break out;
}}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isNonEmpty", 
function () {
var nonEmpty = false;
var forceAllPermCheck = false;
for (var i = 0; i < this.cpis.length; i++) {
if (this.cpis[i] != null) {
if (this.cpis[i].isDeleted ()) {
this.cpis[i] = null;
forceAllPermCheck = true;
this.cachedPermissionCollections.clear ();
} else {
nonEmpty = true;
}}}
if (!nonEmpty) this.cpis =  new Array (0);
if (forceAllPermCheck) {
this.hasAllPermission = false;
this.checkForAllPermission ();
}return nonEmpty;
});
Clazz.defineMethod (c$, "getNeededConditions", 
function () {
if (this.neededConditions == null || this.neededConditions.length == 0) return this.neededConditions;
var foundNonNullCondition = false;
for (var i = 0; i < this.neededConditions.length; i++) {
var cond = this.neededConditions[i];
if (cond == null) continue ;if (!cond.isMutable ()) {
if (cond.isSatisfied ()) {
this.neededConditions[i] = null;
} else {
this.neededConditions = null;
break;
}} else {
foundNonNullCondition = true;
}}
if (this.neededConditions != null && !foundNonNullCondition) this.neededConditions =  new Array (0);
return this.neededConditions;
});
Clazz.overrideMethod (c$, "add", 
function (perm) {
}, "java.security.Permission");
Clazz.defineMethod (c$, "implies", 
function (perm) {
if (this.hasAllPermission) return true;
var permClass = perm.getClass ();
var collection = this.cachedPermissionCollections.get (permClass);
if (collection == null) {
collection = perm.newPermissionCollection ();
if (collection == null) collection =  new org.eclipse.osgi.framework.internal.core.PermissionsHash ();
for (var i = 0; i < this.cpis.length; i++) {
try {
var cpi = this.cpis[i];
if (cpi != null) cpi.addPermissions (collection, permClass);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}
this.cachedPermissionCollections.put (permClass, collection);
}return collection.implies (perm);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "elements", 
function () {
return null;
});
Clazz.defineMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
this.cachedPermissionCollections.clear ();
}, "~A");
Clazz.defineMethod (c$, "remove", 
function (cpi) {
for (var i = 0; i < this.cpis.length; i++) if (this.cpis[i] === cpi) {
this.cpis[i] = null;
this.cachedPermissionCollections.clear ();
return true;
}
return false;
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl");
});
