Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.Handle", "org.eclipse.core.runtime.IExtensionPoint"], "org.eclipse.core.internal.registry.ExtensionPointHandle", ["java.util.ArrayList", "$.Arrays", "org.eclipse.core.internal.registry.ConfigurationElementHandle"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.registry, "ExtensionPointHandle", org.eclipse.core.internal.registry.Handle, org.eclipse.core.runtime.IExtensionPoint);
Clazz.overrideMethod (c$, "getExtensions", 
function () {
return this.objectManager.getHandles (this.getExtensionPoint ().getRawChildren (), 2);
});
Clazz.overrideMethod (c$, "getDeclaringPluginDescriptor", 
function () {
return this.getExtensionPoint ().getDeclaringPluginDescriptor ();
});
Clazz.overrideMethod (c$, "getNamespace", 
function () {
return this.getExtensionPoint ().getNamespace ();
});
Clazz.overrideMethod (c$, "getExtension", 
function (extensionId) {
if (extensionId == null) return null;
var children = this.getExtensionPoint ().getRawChildren ();
for (var i = 0; i < children.length; i++) {
if (extensionId.equals ((this.objectManager.getObject (children[i], 2)).getUniqueIdentifier ())) return this.objectManager.getHandle (children[i], 2);
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getConfigurationElements", 
function () {
var tmpExtensions = this.objectManager.getObjects (this.getExtensionPoint ().getRawChildren (), 2);
if (tmpExtensions.length == 0) return org.eclipse.core.internal.registry.ConfigurationElementHandle.EMPTY_ARRAY;
var result =  new java.util.ArrayList ();
for (var i = 0; i < tmpExtensions.length; i++) {
result.addAll (java.util.Arrays.asList (this.objectManager.getHandles (tmpExtensions[i].getRawChildren (), 1)));
}
return result.toArray ( new Array (result.size ()));
});
Clazz.overrideMethod (c$, "getLabel", 
function () {
return this.getExtensionPoint ().getLabel ();
});
Clazz.overrideMethod (c$, "getSchemaReference", 
function () {
return this.getExtensionPoint ().getSchemaReference ();
});
Clazz.overrideMethod (c$, "getSimpleIdentifier", 
function () {
return this.getExtensionPoint ().getSimpleIdentifier ();
});
Clazz.overrideMethod (c$, "getUniqueIdentifier", 
function () {
return this.getExtensionPoint ().getUniqueIdentifier ();
});
Clazz.overrideMethod (c$, "getObject", 
function () {
return this.getExtensionPoint ();
});
Clazz.defineMethod (c$, "getExtensionPoint", 
($fz = function () {
return this.objectManager.getObject (this.getId (), 3);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "isValid", 
function () {
try {
this.getExtensionPoint ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.InvalidRegistryObjectException)) {
return false;
} else {
throw e;
}
}
return true;
});
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
});
