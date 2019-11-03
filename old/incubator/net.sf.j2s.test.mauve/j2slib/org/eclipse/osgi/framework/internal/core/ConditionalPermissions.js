Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PermissionCollection", "java.util.Vector", "org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet"], "org.eclipse.osgi.framework.internal.core.ConditionalPermissions", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.satisfiedCPIs = null;
this.satisfiedCPS = null;
this.satisfiableCPSs = null;
this.empty = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ConditionalPermissions", java.security.PermissionCollection);
Clazz.prepareFields (c$, function () {
this.satisfiedCPIs =  new java.util.Vector ();
this.satisfiedCPS =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet ( new Array (0),  new Array (0));
this.satisfiableCPSs =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function (bundle, cpa) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.ConditionalPermissions, []);
this.bundle = bundle;
var en = cpa.getConditionalPermissionInfos ();
while (en.hasMoreElements ()) {
var cpi = en.nextElement ();
this.checkConditionalPermissionInfo (cpi);
}
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle,org.osgi.service.condpermadmin.ConditionalPermissionAdmin");
Clazz.defineMethod (c$, "checkConditionalPermissionInfo", 
function (cpi) {
try {
this.removeCPI (cpi);
var conds = cpi.getConditions (this.bundle);
if (conds == null) {
return ;
}var satisfied = true;
for (var i = 0; i < conds.length; i++) {
var cond = conds[i];
if (cond.isMutable ()) {
satisfied = false;
} else if (!cond.isSatisfied ()) {
return ;
} else {
conds[i] = null;
}}
if (satisfied) {
this.satisfiedCPIs.add (cpi);
} else {
this.satisfiableCPSs.add ( new org.eclipse.osgi.framework.internal.core.ConditionalPermissionSet ([cpi], conds));
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.bundle.framework.publishFrameworkEvent (2, this.bundle, e);
} else {
throw e;
}
}
}, "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl");
Clazz.defineMethod (c$, "removeCPI", 
($fz = function (cpi) {
this.satisfiedCPIs.remove (cpi);
this.satisfiedCPS.remove (cpi);
var cpsArray = this.satisfiableCPSs.toArray ( new Array (0));
for (var i = 0; i < cpsArray.length; i++) if (cpsArray[i].remove (cpi)) this.satisfiableCPSs.remove (cpsArray[i]);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.ConditionalPermissionInfoImpl");
Clazz.overrideMethod (c$, "add", 
function (perm) {
}, "java.security.Permission");
Clazz.overrideMethod (c$, "implies", 
function (perm) {
this.processPending ();
var newEmpty = !this.satisfiedCPS.isNonEmpty ();
if (!newEmpty && this.satisfiedCPS.implies (perm)) {
this.empty = false;
return true;
}var satisfied = false;
var unevalCondsSets = null;
var sm = System.getSecurityManager ();
var fsm = null;
if (Clazz.instanceOf (sm, org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager)) {
fsm = sm;
}var cpsArray = this.satisfiableCPSs.toArray ( new Array (0));
cpsLoop : for (var i = 0; i < cpsArray.length; i++) {
if (cpsArray[i].isNonEmpty ()) {
newEmpty = false;
var conds = cpsArray[i].getNeededConditions ();
if (conds == null) continue ;for (var j = 0; j < conds.length; j++) if (conds[j] != null && !conds[j].isPostponed () && !conds[j].isSatisfied ()) continue cpsLoop;
if (cpsArray[i].implies (perm)) {
var unevaluatedConds = null;
for (var j = 0; j < conds.length; j++) {
if (conds[j] != null && conds[j].isPostponed ()) {
if (fsm == null) {
if (!conds[j].isSatisfied ()) continue cpsLoop;} else {
if (unevaluatedConds == null) unevaluatedConds =  new java.util.Vector ();
unevaluatedConds.add (conds[j]);
}}}
if (unevaluatedConds == null) {
this.empty = false;
return true;
}if (unevalCondsSets == null) unevalCondsSets =  new java.util.Vector (2);
unevalCondsSets.add (unevaluatedConds.toArray ( new Array (0)));
satisfied = true;
}} else {
this.satisfiableCPSs.remove (cpsArray[i]);
}}
this.empty = newEmpty;
if (satisfied && fsm != null) {
var condArray = unevalCondsSets.toArray ( new Array (0));
satisfied = fsm.addConditionsForDomain (condArray);
}return satisfied;
}, "java.security.Permission");
Clazz.defineMethod (c$, "processPending", 
($fz = function () {
if (this.satisfiedCPIs.size () > 0) {
{
for (var i = 0; i < this.satisfiedCPIs.size (); i++) {
var cpi = this.satisfiedCPIs.get (i);
if (!cpi.isDeleted ()) this.satisfiedCPS.addConditionalPermissionInfo (cpi);
}
this.satisfiedCPIs.clear ();
}}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "elements", 
function () {
return null;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.empty;
});
Clazz.defineMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
this.satisfiedCPS.unresolvePermissions (refreshedBundles);
{
var en = this.satisfiableCPSs.elements ();
while (en.hasMoreElements ()) {
var cs = en.nextElement ();
cs.unresolvePermissions (refreshedBundles);
}
}}, "~A");
});
