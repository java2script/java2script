Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.IBuddyPolicy"], "org.eclipse.osgi.framework.internal.core.DependentPolicy", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buddyRequester = null;
this.lastDependentOfAdded = -1;
this.allDependents = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "DependentPolicy", null, org.eclipse.osgi.framework.internal.core.IBuddyPolicy);
Clazz.makeConstructor (c$, 
function (requester) {
this.buddyRequester = requester;
this.allDependents =  new java.util.ArrayList ();
this.basicAddImmediateDependents (this.buddyRequester.getBundle ().getBundleDescription ());
if (this.allDependents.size () == 0) this.allDependents = null;
}, "org.eclipse.osgi.framework.internal.core.BundleLoader");
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
var searchedBundle = this.allDependents.get (i);
try {
var proxy = this.buddyRequester.getLoaderProxy (searchedBundle);
if (proxy == null) continue ;result = proxy.getBundleLoader ().findClass (name, true);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
if (result == null) this.addDependent (i, searchedBundle);
} else {
throw e;
}
}
}
return result;
}, "~S");
Clazz.defineMethod (c$, "addDependent", 
($fz = function (i, searchedBundle) {
if (i > this.lastDependentOfAdded) {
this.lastDependentOfAdded = i;
this.basicAddImmediateDependents (searchedBundle);
}}, $fz.isPrivate = true, $fz), "~N,org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "loadResource", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
var searchedBundle = this.allDependents.get (i);
var proxy = this.buddyRequester.getLoaderProxy (searchedBundle);
if (proxy == null) continue ;result = proxy.getBundleLoader ().findResource (name, true);
if (result == null) {
this.addDependent (i, searchedBundle);
}}
return result;
}, "~S");
Clazz.overrideMethod (c$, "loadResources", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
var searchedBundle = this.allDependents.get (i);
try {
var proxy = this.buddyRequester.getLoaderProxy (searchedBundle);
if (proxy == null) continue ;result = proxy.getBundleLoader ().findResources (name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
continue ;} else {
throw e;
}
}
if (result == null) {
this.addDependent (i, searchedBundle);
}}
return result;
}, "~S");
Clazz.defineMethod (c$, "basicAddImmediateDependents", 
($fz = function (root) {
var dependents = root.getDependents ();
for (var i = 0; i < dependents.length; i++) {
var toAdd = dependents[i];
if (toAdd.getHost () == null && !this.allDependents.contains (toAdd)) {
this.allDependents.add (toAdd);
}}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription");
});
