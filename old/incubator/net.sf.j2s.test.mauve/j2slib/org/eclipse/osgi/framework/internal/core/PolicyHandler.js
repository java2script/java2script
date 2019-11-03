Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.framework.BundleListener"], "org.eclipse.osgi.framework.internal.core.PolicyHandler", ["java.lang.ThreadLocal", "java.util.HashSet", "$.StringTokenizer", "$.Vector", "org.eclipse.osgi.framework.internal.core.DependentPolicy", "$.GlobalPolicy", "$.RegisteredPolicy", "$.SystemPolicy"], function () {
c$ = Clazz.decorateAsClass (function () {
this.policedLoader = null;
this.policies = null;
this.beingLoaded = null;
this.listener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "PolicyHandler");
Clazz.prepareFields (c$, function () {
this.listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.PolicyHandler$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "PolicyHandler$1", null, org.osgi.framework.BundleListener);
Clazz.overrideMethod (c$, "bundleChanged", 
function (event) {
if (event.getType () == 2 || event.getType () == 4) return ;
try {
var list = this.b$["org.eclipse.osgi.framework.internal.core.PolicyHandler"].policedLoader.getBundle ().getBundleData ().getManifest ().get ("Eclipse-BuddyPolicy");
{
this.b$["org.eclipse.osgi.framework.internal.core.PolicyHandler"].policies = org.eclipse.osgi.framework.internal.core.PolicyHandler.getArrayFromList (list);
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
} else {
throw e;
}
}
}, "org.osgi.framework.BundleEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.PolicyHandler$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function (loader, buddyList) {
this.policedLoader = loader;
this.policies = org.eclipse.osgi.framework.internal.core.PolicyHandler.getArrayFromList (buddyList);
this.beingLoaded =  new ThreadLocal ();
this.policedLoader.bundle.framework.systemBundle.context.addBundleListener (this.listener);
}, "org.eclipse.osgi.framework.internal.core.BundleLoader,~S");
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
function (stringList) {
if (stringList == null || stringList.trim ().equals ("")) return null;
var list =  new java.util.Vector ();
var tokens =  new java.util.StringTokenizer (stringList, ",");
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.addElement (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, "~S");
Clazz.defineMethod (c$, "getPolicyImplementation", 
($fz = function (policyOrder) {
if (Clazz.instanceOf (this.policies[policyOrder], String)) {
var buddyName = this.policies[policyOrder];
if ("registered".equals (buddyName)) {
this.policies[policyOrder] =  new org.eclipse.osgi.framework.internal.core.RegisteredPolicy (this.policedLoader);
return this.policies[policyOrder];
}if ("boot".equals (buddyName)) {
this.policies[policyOrder] = org.eclipse.osgi.framework.internal.core.SystemPolicy.getInstance (0);
return this.policies[policyOrder];
}if ("app".equals (buddyName)) {
this.policies[policyOrder] = org.eclipse.osgi.framework.internal.core.SystemPolicy.getInstance (2);
return this.policies[policyOrder];
}if ("ext".equals (buddyName)) {
this.policies[policyOrder] = org.eclipse.osgi.framework.internal.core.SystemPolicy.getInstance (1);
return this.policies[policyOrder];
}if ("dependent".equals (buddyName)) {
this.policies[policyOrder] =  new org.eclipse.osgi.framework.internal.core.DependentPolicy (this.policedLoader);
return this.policies[policyOrder];
}if ("global".equals (buddyName)) {
this.policies[policyOrder] =  new org.eclipse.osgi.framework.internal.core.GlobalPolicy (this.policedLoader.bundle.framework.packageAdmin);
return this.policies[policyOrder];
}if ("parent".equals (buddyName)) {
this.policies[policyOrder] =  new org.eclipse.osgi.framework.internal.core.SystemPolicy (this.policedLoader.parent);
return this.policies[policyOrder];
}}return this.policies[policyOrder];
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "doBuddyClassLoading", 
function (name) {
if (this.startLoading (name) == false) return null;
var result = null;
for (var i = 0; i < this.policies.length && result == null; i++) {
result = this.getPolicyImplementation (i).loadClass (name);
}
this.stopLoading (name);
return result;
}, "~S");
Clazz.defineMethod (c$, "doBuddyResourceLoading", 
function (name) {
if (this.startLoading (name) == false) return null;
if (this.policies == null) return null;
var result = null;
for (var i = 0; i < this.policies.length && result == null; i++) {
result = this.getPolicyImplementation (i).loadResource (name);
}
this.stopLoading (name);
return result;
}, "~S");
Clazz.defineMethod (c$, "doBuddyResourcesLoading", 
function (name) {
if (this.startLoading (name) == false) return null;
if (this.policies == null) return null;
var result = null;
for (var i = 0; i < this.policies.length && result == null; i++) {
result = this.getPolicyImplementation (i).loadResources (name);
}
this.stopLoading (name);
return result;
}, "~S");
Clazz.defineMethod (c$, "startLoading", 
($fz = function (name) {
var classesAndResources = this.beingLoaded.get ();
if (classesAndResources != null && classesAndResources.contains (name)) return false;
if (classesAndResources == null) {
classesAndResources =  new java.util.HashSet (3);
this.beingLoaded.set (classesAndResources);
}classesAndResources.add (name);
return true;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "stopLoading", 
($fz = function (name) {
(this.beingLoaded.get ()).remove (name);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "close", 
function () {
this.policedLoader.bundle.framework.systemBundle.context.removeBundleListener (this.listener);
});
Clazz.defineStatics (c$,
"DEPENDENT_POLICY", "dependent",
"GLOBAL_POLICY", "global",
"REGISTERED_POLICY", "registered",
"APP_POLICY", "app",
"EXT_POLICY", "ext",
"BOOT_POLICY", "boot",
"PARENT_POLICY", "parent");
});
