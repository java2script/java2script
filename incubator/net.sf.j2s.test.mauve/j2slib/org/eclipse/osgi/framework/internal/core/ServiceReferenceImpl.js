Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.framework.ServiceReference"], "org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl", ["org.eclipse.osgi.framework.internal.core.BundleLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.registration = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ServiceReferenceImpl", null, [org.osgi.framework.ServiceReference, Comparable]);
Clazz.makeConstructor (c$, 
function (registration) {
this.registration = registration;
}, "org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl");
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
return (this.registration.getProperty (key));
}, "~S");
Clazz.overrideMethod (c$, "getPropertyKeys", 
function () {
return (this.registration.getPropertyKeys ());
});
Clazz.overrideMethod (c$, "getBundle", 
function () {
return (this.registration.getBundle ());
});
Clazz.overrideMethod (c$, "getUsingBundles", 
function () {
return (this.registration.getUsingBundles ());
});
Clazz.defineMethod (c$, "getClasses", 
function () {
return (this.registration.clazzes);
});
Clazz.defineMethod (c$, "getId", 
function () {
return (this.registration.serviceid);
});
Clazz.defineMethod (c$, "getRanking", 
function () {
return (this.registration.serviceranking);
});
Clazz.defineMethod (c$, "hashCode", 
function () {
return (this.registration.hashCode ());
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return (true);
}if (!(Clazz.instanceOf (obj, org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl))) {
return (false);
}var other = obj;
return (this.registration === other.registration);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.registration.toString ());
});
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var other = object;
var compare = this.getRanking () - other.getRanking ();
if (compare == 0) {
return (other.getId () - this.getId ());
}return compare;
}, "~O");
Clazz.overrideMethod (c$, "isAssignableTo", 
function (bundle, className) {
var consumer = bundle;
if (consumer.isFragment ()) return false;
var producer = this.registration.bundle;
if (consumer === producer) return true;
var pkgName = org.eclipse.osgi.framework.internal.core.BundleLoader.getPackageName (className);
if (pkgName.startsWith ("java.")) return true;
var producerBL = producer.getBundleLoader ();
if (producerBL == null) return false;
var consumerBL = consumer.getBundleLoader ();
if (consumerBL == null) return false;
var consumerSource = consumerBL.getPackageSource (pkgName);
if (consumerSource == null) return true;
var producerSource = producerBL.getPackageSource (pkgName);
if (producerSource == null) {
producerSource = this.getPackageSource (this.registration.service.getClass (), pkgName);
if (producerSource == null) return false;
}return producerSource.hasCommonSource (consumerSource);
}, "org.osgi.framework.Bundle,~S");
Clazz.defineMethod (c$, "getPackageSource", 
($fz = function (serviceClass, pkgName) {
if (serviceClass == null) return null;
var serviceBundle = this.registration.framework.packageAdmin.getBundle (serviceClass);
if (serviceBundle == null) return null;
var producerBL = serviceBundle.getBundleLoader ();
if (producerBL == null) return null;
var producerSource = producerBL.getPackageSource (pkgName);
if (producerSource != null) return producerSource;
var interfaces = serviceClass.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
producerSource = this.getPackageSource (serviceClass.getSuperclass (), pkgName);
if (producerSource != null) return producerSource;
}
return this.getPackageSource (serviceClass.getSuperclass (), pkgName);
}, $fz.isPrivate = true, $fz), "Class,~S");
});
