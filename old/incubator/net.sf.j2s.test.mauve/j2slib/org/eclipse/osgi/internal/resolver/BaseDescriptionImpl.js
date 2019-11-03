Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.BaseDescription"], "org.eclipse.osgi.internal.resolver.BaseDescriptionImpl", ["org.osgi.framework.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.version = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "BaseDescriptionImpl", null, org.eclipse.osgi.service.resolver.BaseDescription);
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
if (this.version == null) return org.osgi.framework.Version.emptyVersion;
return this.version;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "setVersion", 
function (version) {
this.version = version;
}, "org.osgi.framework.Version");
});
