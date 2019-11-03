Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.startlevel.StartLevel"], "org.eclipse.osgi.framework.internal.core.StartLevelImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
this.owner = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "StartLevelImpl", null, org.osgi.service.startlevel.StartLevel);
Clazz.makeConstructor (c$, 
function (owner, framework) {
this.owner = owner;
this.manager = framework.startLevelManager;
}, "org.osgi.framework.Bundle,org.eclipse.osgi.framework.internal.core.Framework");
Clazz.overrideMethod (c$, "getInitialBundleStartLevel", 
function () {
return this.manager.getInitialBundleStartLevel ();
});
Clazz.overrideMethod (c$, "setInitialBundleStartLevel", 
function (startlevel) {
this.manager.setInitialBundleStartLevel (startlevel);
}, "~N");
Clazz.overrideMethod (c$, "getStartLevel", 
function () {
return this.manager.getStartLevel ();
});
Clazz.overrideMethod (c$, "setStartLevel", 
function (newSL) {
this.manager.setStartLevel (newSL, this.owner);
}, "~N");
Clazz.overrideMethod (c$, "isBundlePersistentlyStarted", 
function (bundle) {
return this.manager.isBundlePersistentlyStarted (bundle);
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "getBundleStartLevel", 
function (bundle) {
return this.manager.getBundleStartLevel (bundle);
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "setBundleStartLevel", 
function (bundle, newSL) {
this.manager.setBundleStartLevel (bundle, newSL);
}, "org.osgi.framework.Bundle,~N");
});
