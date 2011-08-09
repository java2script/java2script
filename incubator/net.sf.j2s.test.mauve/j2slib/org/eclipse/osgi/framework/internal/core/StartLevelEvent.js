Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.EventObject"], "org.eclipse.osgi.framework.internal.core.StartLevelEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.newSl = 0;
this.bundle = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "StartLevelEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (type, newSl, bundle) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.StartLevelEvent, [bundle]);
this.type = type;
this.newSl = newSl;
this.bundle = bundle;
}, "~N,~N,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getNewSL", 
function () {
return this.newSl;
});
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineStatics (c$,
"CHANGE_BUNDLE_SL", 0x00000000,
"CHANGE_FW_SL", 0x00000001);
});
