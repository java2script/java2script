Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundlePermissionCollection"], "org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions", ["java.lang.SecurityException", "java.util.Enumeration", "$.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.assigned = null;
this.implied = null;
this.conditional = null;
this.restrictedPermissions = null;
this.isDefault = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleCombinedPermissions", org.eclipse.osgi.framework.internal.core.BundlePermissionCollection);
Clazz.makeConstructor (c$, 
function (implied) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions, []);
this.implied = implied;
this.setReadOnly ();
}, "org.eclipse.osgi.framework.internal.core.BundlePermissionCollection");
Clazz.defineMethod (c$, "setAssignedPermissions", 
function (assigned, isDefault) {
this.assigned = assigned;
this.isDefault = isDefault;
}, "org.eclipse.osgi.framework.internal.core.BundlePermissionCollection,~B");
Clazz.defineMethod (c$, "setConditionalPermissions", 
function (conditional) {
this.conditional = conditional;
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissions");
Clazz.defineMethod (c$, "checkConditionalPermissionInfo", 
function (cpi) {
if (this.conditional != null) {
this.conditional.checkConditionalPermissionInfo (cpi);
}}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl");
Clazz.defineMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
if (this.assigned != null) {
this.assigned.unresolvePermissions (refreshedBundles);
}if (this.implied != null) {
this.implied.unresolvePermissions (refreshedBundles);
}if (this.conditional != null) {
this.conditional.unresolvePermissions (refreshedBundles);
}if (this.restrictedPermissions != null) {
this.restrictedPermissions.unresolvePermissions (refreshedBundles);
}}, "~A");
Clazz.overrideMethod (c$, "add", 
function (permission) {
throw  new SecurityException ();
}, "java.security.Permission");
Clazz.defineMethod (c$, "elements", 
function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.i = 0;
this.enums = null;
{
this.enums = [(this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].assigned == null) ? null : this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].assigned.elements (), (this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].implied == null) ? null : this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].implied.elements ()];
}Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleCombinedPermissions$1", null, java.util.Enumeration);
Clazz.prepareFields (c$, function () {
{
this.enums = [(this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].assigned == null) ? null : this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].assigned.elements (), (this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].implied == null) ? null : this.b$["org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions"].implied.elements ()];
}});
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
while (this.i < this.enums.length) {
var perms = this.enums[this.i];
if ((perms != null) && perms.hasMoreElements ()) {
return true;
}this.i++;
}
return false;
});
Clazz.defineMethod (c$, "nextElement", 
function () {
while (this.i < this.enums.length) {
try {
var perms = this.enums[this.i];
if (perms != null) {
return perms.nextElement ();
}} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
} else {
throw e;
}
}
this.i++;
}
throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleCombinedPermissions$1, i$, v$);
}) (this, null);
});
Clazz.defineMethod (c$, "implies", 
function (permission) {
if ((this.implied != null) && this.implied.implies (permission)) return true;
if ((this.restrictedPermissions != null) && !this.restrictedPermissions.implies (permission)) {
return false;
}if (!this.isDefault && this.assigned != null) return this.assigned.implies (permission);
if (this.conditional != null) {
var conditionalImplies = this.conditional.implies (permission);
if (!this.conditional.isEmpty ()) {
return conditionalImplies;
}}return this.assigned.implies (permission);
}, "java.security.Permission");
Clazz.defineMethod (c$, "setRestrictedPermissions", 
function (restrictedPermissions) {
this.restrictedPermissions = restrictedPermissions;
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet");
});
