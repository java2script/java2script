Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.condpermadmin.ConditionalPermissionInfo", "org.osgi.framework.Bundle", "org.osgi.service.condpermadmin.ConditionInfo"], "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl", ["java.security.AllPermission", "org.osgi.service.condpermadmin.Condition"], function () {
c$ = Clazz.decorateAsClass (function () {
this.perms = null;
this.conds = null;
this.name = null;
this.deleted = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ConditionalPermissionInfoImpl", null, [org.osgi.service.condpermadmin.ConditionalPermissionInfo, java.io.Serializable]);
Clazz.defineMethod (c$, "isDeleted", 
function () {
return this.deleted;
});
Clazz.makeConstructor (c$, 
function (name, conds, perms) {
this.name = name;
this.conds = conds;
this.perms = perms;
}, "~S,~A,~A");
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getConditionInfos", 
function () {
if (this.conds == null) return null;
var results =  new Array (this.conds.length);
System.arraycopy (this.conds, 0, results, 0, this.conds.length);
return results;
});
Clazz.defineMethod (c$, "addPermissions", 
function (collection, permClass) {
var permClassName = permClass.getName ();
var constructor = permClass.getConstructor (org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.twoStringClassArray);
var count = 0;
for (var i = 0; i < this.perms.length; i++) {
if (this.perms[i].getType ().equals (permClassName)) {
count++;
var args =  new Array (2);
args[0] = this.perms[i].getName ();
args[1] = this.perms[i].getActions ();
collection.add (constructor.newInstance (args));
}}
return count;
}, "java.security.PermissionCollection,Class");
Clazz.defineMethod (c$, "getConditions", 
function (bundle) {
var conditions =  new Array (this.conds.length);
for (var i = 0; i < this.conds.length; i++) {
var clazz;
try {
clazz = Class.forName (this.conds[i].getType ());
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return null;
} else {
throw e;
}
}
var constructor = null;
var method = null;
try {
method = clazz.getMethod ("getCondition", org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.condClassArray);
if ((method.getModifiers () & 8) == 0) method = null;
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
} else {
throw e;
}
}
if (method == null) try {
constructor = clazz.getConstructor (org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.condClassArray);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
conditions[i] = org.osgi.service.condpermadmin.Condition.FALSE;
continue ;} else {
throw e;
}
}
var args = [bundle, this.conds[i]];
try {
if (method != null) conditions[i] = method.invoke (null, args);
 else conditions[i] = constructor.newInstance (args);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
conditions[i] = org.osgi.service.condpermadmin.Condition.FALSE;
} else {
throw t;
}
}
}
return conditions;
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "getPermissionInfos", 
function () {
if (this.perms == null) return null;
var results =  new Array (this.perms.length);
System.arraycopy (this.perms, 0, results, 0, this.perms.length);
return results;
});
Clazz.overrideMethod (c$, "$delete", 
function () {
var sm = System.getSecurityManager ();
if (sm != null) sm.checkPermission ( new java.security.AllPermission ());
this.deleted = true;
org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.condAdmin.deleteConditionalPermissionInfo (this);
});
c$.setConditionalPermissionAdminImpl = Clazz.defineMethod (c$, "setConditionalPermissionAdminImpl", 
function (condAdmin) {
($t$ = org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.condAdmin = condAdmin, org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.prototype.condAdmin = org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl.condAdmin, $t$);
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionAdminImpl");
c$.twoStringClassArray = c$.prototype.twoStringClassArray = [String, String];
c$.condClassArray = c$.prototype.condClassArray = [org.osgi.framework.Bundle, org.osgi.service.condpermadmin.ConditionInfo];
Clazz.defineStatics (c$,
"condAdmin", null);
});
