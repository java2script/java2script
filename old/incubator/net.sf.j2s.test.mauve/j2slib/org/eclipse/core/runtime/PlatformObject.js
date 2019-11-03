Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.IAdaptable"], "org.eclipse.core.runtime.PlatformObject", ["org.eclipse.core.internal.runtime.InternalPlatform"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime, "PlatformObject", null, org.eclipse.core.runtime.IAdaptable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getAdapter", 
function (adapter) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getAdapterManager ().getAdapter (this, adapter);
}, "Class");
});
