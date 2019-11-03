Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.PackageSource"], "org.eclipse.osgi.framework.internal.core.MultiSourcePackage", ["java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.suppliers = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "MultiSourcePackage", org.eclipse.osgi.framework.internal.core.PackageSource);
Clazz.makeConstructor (c$, 
function (id, suppliers) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.MultiSourcePackage, [id]);
this.suppliers = suppliers;
}, "~S,~A");
Clazz.overrideMethod (c$, "getSuppliers", 
function () {
return this.suppliers;
});
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
var result = null;
for (var i = 0; i < this.suppliers.length; i++) {
result = this.suppliers[i].loadClass (name);
if (result != null) return result;
}
return result;
}, "~S");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
var result = null;
for (var i = 0; i < this.suppliers.length; i++) {
result = this.suppliers[i].getResource (name);
if (result != null) return result;
}
return result;
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (name) {
var firstResult = null;
var compoundResults = null;
for (var i = 0; i < this.suppliers.length; i++) {
var resources = this.suppliers[i].getResources (name);
if (resources != null) {
if (firstResult == null) firstResult = resources;
 else {
if (compoundResults == null) {
compoundResults =  new java.util.Vector ();
while (firstResult.hasMoreElements ()) compoundResults.add (firstResult.nextElement ());

}while (resources.hasMoreElements ()) compoundResults.add (resources.nextElement ());

}}}
return compoundResults == null ? firstResult : compoundResults.elements ();
}, "~S");
});
