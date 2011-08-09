Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["org.osgi.framework.Version"], "org.eclipse.osgi.framework.adaptor.core.InvalidVersion", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.invalidVersion = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "InvalidVersion", org.osgi.framework.Version);
Clazz.makeConstructor (c$, 
function (badVersion) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.InvalidVersion, [0, 0, 0, null]);
this.invalidVersion = badVersion;
}, "~S");
Clazz.defineMethod (c$, "getInvalidVersion", 
function () {
return this.invalidVersion;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.invalidVersion;
});
});
