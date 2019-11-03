Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.StateImpl"], "org.eclipse.osgi.internal.resolver.SystemState", ["java.lang.UnsupportedOperationException"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "SystemState", org.eclipse.osgi.internal.resolver.StateImpl);
Clazz.defineMethod (c$, "addBundle", 
function (description) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "addBundle", [description])) return false;
this.updateTimeStamp ();
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "removeBundle", 
function (toRemove) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "removeBundle", [toRemove])) return false;
this.updateTimeStamp ();
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "updateBundle", 
function (newDescription) {
if (!Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "updateBundle", [newDescription])) return false;
this.updateTimeStamp ();
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "updateTimeStamp", 
($fz = function () {
if (this.getTimeStamp () == 9223372036854775807) this.setTimeStamp (0);
this.setTimeStamp (this.getTimeStamp () + 1);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "compare", 
function (state) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "resolve", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var delta = Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "resolve", []);
if (delta.getChanges ().length > 0) this.updateTimeStamp ();
return delta;
});
Clazz.defineMethod (c$, "resolve", 
function (incremental) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var delta = Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "resolve", [incremental]);
if (delta.getChanges ().length > 0) this.updateTimeStamp ();
return delta;
}, "~B");
Clazz.defineMethod (c$, "resolve", 
function (reResolve) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var delta = Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "resolve", [reResolve]);
if (delta.getChanges ().length > 0) this.updateTimeStamp ();
return delta;
}, "~A");
Clazz.defineMethod (c$, "linkDynamicImport", 
function (importingBundle, requestedPackage) {
var result = Clazz.superCall (this, org.eclipse.osgi.internal.resolver.SystemState, "linkDynamicImport", [importingBundle, requestedPackage]);
if (result == null) return null;
this.updateTimeStamp ();
return result;
}, "org.eclipse.osgi.service.resolver.BundleDescription,~S");
});
