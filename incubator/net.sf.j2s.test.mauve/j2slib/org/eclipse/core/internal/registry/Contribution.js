Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.KeyedElement"], "org.eclipse.core.internal.registry.Contribution", ["java.lang.IllegalStateException", "$.Long", "org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contributingBundle = null;
this.contributingBundleId = 0;
this.children = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "Contribution", null, org.eclipse.core.internal.registry.KeyedElement);
Clazz.prepareFields (c$, function () {
this.children = org.eclipse.core.internal.registry.Contribution.EMPTY_CHILDREN;
});
Clazz.makeConstructor (c$, 
function (bundle) {
this.contributingBundle = bundle;
this.contributingBundleId = bundle.getBundleId ();
}, "org.osgi.framework.Bundle");
Clazz.makeConstructor (c$, 
function (id) {
this.contributingBundleId = id;
this.contributingBundle = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getBundle (this.contributingBundleId);
}, "~N");
Clazz.defineMethod (c$, "setRawChildren", 
function (children) {
this.children = children;
}, "~A");
Clazz.defineMethod (c$, "getRawChildren", 
function () {
return this.children;
});
Clazz.defineMethod (c$, "getExtensions", 
function () {
var results =  Clazz.newArray (this.children[1], 0);
System.arraycopy (this.children, 2 + this.children[0], results, 0, this.children[1]);
return results;
});
Clazz.defineMethod (c$, "getContributingBundle", 
function () {
return this.contributingBundle;
});
Clazz.defineMethod (c$, "getExtensionPoints", 
function () {
var results =  Clazz.newArray (this.children[0], 0);
System.arraycopy (this.children, 2, results, 0, this.children[0]);
return results;
});
Clazz.defineMethod (c$, "getNamespace", 
function () {
if (this.contributingBundle == null) throw  new IllegalStateException ("Internal error in extension registry. The bundle corresponding to this contribution has been uninstalled.");
if (org.eclipse.core.runtime.Platform.isFragment (this.contributingBundle)) return org.eclipse.core.runtime.Platform.getHosts (this.contributingBundle)[0].getSymbolicName ();
return this.contributingBundle.getSymbolicName ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "Contribution: " + this.contributingBundleId + " in namespace" + this.getNamespace ();
});
Clazz.defineMethod (c$, "getNamespaceBundle", 
function () {
if (this.contributingBundle == null) throw  new IllegalStateException ("Internal error in extension registry. The bundle corresponding to this contribution has been uninstalled.");
if (org.eclipse.core.runtime.Platform.isFragment (this.contributingBundle)) return org.eclipse.core.runtime.Platform.getHosts (this.contributingBundle)[0];
return this.contributingBundle;
});
Clazz.overrideMethod (c$, "getKeyHashCode", 
function () {
return this.getKey ().hashCode ();
});
Clazz.overrideMethod (c$, "getKey", 
function () {
return  new Long (this.contributingBundleId);
});
Clazz.overrideMethod (c$, "compare", 
function (other) {
return this.contributingBundleId == (other).contributingBundleId;
}, "org.eclipse.core.internal.registry.KeyedElement");
Clazz.defineStatics (c$,
"EMPTY_CHILDREN", [0, 0],
"EXTENSION_POINT", 0,
"EXTENSION", 1);
});
