Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.BundleDelta"], "org.eclipse.osgi.internal.resolver.BundleDeltaImpl", ["java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundleDescription = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "BundleDeltaImpl", null, org.eclipse.osgi.service.resolver.BundleDelta);
Clazz.makeConstructor (c$, 
function (bundleDescription) {
this.construct (bundleDescription, 0);
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.makeConstructor (c$, 
function (bundleDescription, type) {
this.bundleDescription = bundleDescription;
this.type = type;
}, "org.eclipse.osgi.service.resolver.BundleDescription,~N");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundleDescription;
});
Clazz.overrideMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "setBundle", 
function (bundleDescription) {
this.bundleDescription = bundleDescription;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "setType", 
function (type) {
this.type = type;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.bundleDescription.getSymbolicName () + '_' + this.bundleDescription.getVersion () + " (" + org.eclipse.osgi.internal.resolver.BundleDeltaImpl.toTypeString (this.type) + ")";
});
c$.toTypeString = Clazz.defineMethod (c$, "toTypeString", 
($fz = function (type) {
var typeStr =  new StringBuffer ();
if ((type & 1) != 0) typeStr.append ("ADDED,");
if ((type & 2) != 0) typeStr.append ("REMOVED,");
if ((type & 8) != 0) typeStr.append ("RESOLVED,");
if ((type & 16) != 0) typeStr.append ("UNRESOLVED,");
if ((type & 32) != 0) typeStr.append ("LINKAGE_CHANGED,");
if ((type & 4) != 0) typeStr.append ("UPDATED,");
if ((type & 128) != 0) typeStr.append ("REMOVAL_PENDING,");
if ((type & 256) != 0) typeStr.append ("REMOVAL_COMPLETE,");
if (typeStr.length () > 0) typeStr.deleteCharAt (typeStr.length () - 1);
return typeStr.toString ();
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "compareTo", 
function (obj) {
var idcomp = this.getBundle ().getBundleId () - (obj).getBundle ().getBundleId ();
return (idcomp < 0) ? -1 : ((idcomp > 0) ? 1 : 0);
}, "~O");
});
