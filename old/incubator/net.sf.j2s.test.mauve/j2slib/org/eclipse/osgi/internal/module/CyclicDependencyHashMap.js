Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["java.util.HashMap"], "org.eclipse.osgi.internal.module.CyclicDependencyHashMap", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.internal = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "CyclicDependencyHashMap");
Clazz.prepareFields (c$, function () {
this.internal =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "put", 
function (dependentOn, module) {
var existing = this.internal.get (dependentOn);
if (existing == null) {
var v =  new java.util.ArrayList ();
v.add (module);
this.internal.put (dependentOn, v);
} else {
if (!existing.contains (module)) {
existing.add (module);
}}return null;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "remove", 
function (dependentOn) {
return this.internal.remove (dependentOn);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
});
