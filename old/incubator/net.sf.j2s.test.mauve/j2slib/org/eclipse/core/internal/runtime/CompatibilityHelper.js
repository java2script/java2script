Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.lang.Boolean", "org.eclipse.core.internal.runtime.InternalPlatform"], "org.eclipse.core.internal.runtime.CompatibilityHelper", ["java.lang.IllegalStateException", "org.eclipse.core.runtime.Plugin", "$.Status"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "CompatibilityHelper");
c$.nullCompatibility = Clazz.defineMethod (c$, "nullCompatibility", 
function () {
($t$ = org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility = null, org.eclipse.core.internal.runtime.CompatibilityHelper.prototype.compatibility = org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility, $t$);
});
c$.initializeCompatibility = Clazz.defineMethod (c$, "initializeCompatibility", 
function () {
if (org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility == null || (org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility.getState () & (19)) != 0) ($t$ = org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle ("org.eclipse.core.runtime.compatibility"), org.eclipse.core.internal.runtime.CompatibilityHelper.prototype.compatibility = org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility, $t$);
return org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility;
});
c$.setPlugin = Clazz.defineMethod (c$, "setPlugin", 
function (descriptor, plugin) {
if (org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility () == null) throw  new IllegalStateException ();
try {
var setPlugin = descriptor.getClass ().getMethod ("setPlugin", [org.eclipse.core.runtime.Plugin]);
setPlugin.invoke (descriptor, [plugin]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.IPluginDescriptor,org.eclipse.core.runtime.Plugin");
c$.getPluginDescriptor = Clazz.defineMethod (c$, "getPluginDescriptor", 
function (pluginId) {
org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility ();
if (org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility == null) throw  new IllegalStateException ();
var oldInternalPlatform = null;
try {
oldInternalPlatform = org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility.loadClass ("org.eclipse.core.internal.plugins.InternalPlatform");
var getPluginDescriptor = oldInternalPlatform.getMethod ("getPluginDescriptor", [String]);
return getPluginDescriptor.invoke (oldInternalPlatform, [pluginId]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
if (org.eclipse.core.internal.runtime.CompatibilityHelper.DEBUG) {
var msg = "Error running compatibility code";
var error =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (error);
}} else {
throw e;
}
}
return null;
}, "~S");
c$.setActive = Clazz.defineMethod (c$, "setActive", 
function (descriptor) {
org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility ();
if (org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility == null) throw  new IllegalStateException ();
try {
var setPlugin = descriptor.getClass ().getMethod ("setActive", [null]);
setPlugin.invoke (descriptor, [null]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.IPluginDescriptor");
c$.hasPluginObject = Clazz.defineMethod (c$, "hasPluginObject", 
function (descriptor) {
org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility ();
if (org.eclipse.core.internal.runtime.CompatibilityHelper.compatibility == null) throw  new IllegalStateException ();
var result =  new Boolean (false);
try {
var setPlugin = descriptor.getClass ().getMethod ("hasPluginObject", [null]);
result = setPlugin.invoke (descriptor, [null]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
return result.booleanValue ();
}, "org.eclipse.core.runtime.IPluginDescriptor");
c$.OPTION_DEBUG_COMPATIBILITY = c$.prototype.OPTION_DEBUG_COMPATIBILITY = "org.eclipse.core.runtime/compatibility/debug";
c$.DEBUG = c$.prototype.DEBUG = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/compatibility/debug"));
Clazz.defineStatics (c$,
"PI_RUNTIME_COMPATIBILITY", "org.eclipse.core.runtime.compatibility",
"compatibility", null);
});
