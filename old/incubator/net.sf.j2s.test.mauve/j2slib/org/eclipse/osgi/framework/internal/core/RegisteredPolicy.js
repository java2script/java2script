Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.DependentPolicy"], "org.eclipse.osgi.framework.internal.core.RegisteredPolicy", ["org.eclipse.osgi.util.ManifestElement"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "RegisteredPolicy", org.eclipse.osgi.framework.internal.core.DependentPolicy);
Clazz.makeConstructor (c$, 
function (requester) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.RegisteredPolicy, [requester]);
if (this.allDependents == null) return ;
for (var iter = this.allDependents.iterator (); iter.hasNext (); ) {
var proxy = this.buddyRequester.getLoaderProxy (iter.next ());
if (proxy == null) iter.remove ();
try {
var allContributions = org.eclipse.osgi.util.ManifestElement.getArrayFromList ((proxy.getBundle ()).getBundleData ().getManifest ().get ("Eclipse-RegisterBuddy"));
if (allContributions == null) {
iter.remove ();
continue ;}var contributes = false;
for (var j = 0; j < allContributions.length && contributes == false; j++) {
if (allContributions[j].equals (this.buddyRequester.bundle.getSymbolicName ())) contributes = true;
}
if (!contributes) iter.remove ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
iter.remove ();
} else {
throw e;
}
}
}
if (this.allDependents.size () == 0) this.allDependents = null;
}, "org.eclipse.osgi.framework.internal.core.BundleLoader");
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
try {
var proxy = this.buddyRequester.getLoaderProxy (this.allDependents.get (i));
if (proxy == null) continue ;result = proxy.getBundleLoader ().findClass (name, true);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
continue ;} else {
throw e;
}
}
}
return result;
}, "~S");
Clazz.overrideMethod (c$, "loadResource", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
var proxy = this.buddyRequester.getLoaderProxy (this.allDependents.get (i));
if (proxy == null) continue ;result = proxy.getBundleLoader ().findResource (name, true);
}
return result;
}, "~S");
Clazz.overrideMethod (c$, "loadResources", 
function (name) {
if (this.allDependents == null) return null;
var result = null;
for (var i = 0; i < this.allDependents.size () && result == null; i++) {
try {
var proxy = this.buddyRequester.getLoaderProxy (this.allDependents.get (i));
if (proxy == null) continue ;result = proxy.getBundleLoader ().findResources (name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return result;
}, "~S");
});
