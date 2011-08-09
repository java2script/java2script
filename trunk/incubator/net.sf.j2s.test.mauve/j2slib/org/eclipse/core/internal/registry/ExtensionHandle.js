Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.Handle", "org.eclipse.core.runtime.IExtension"], "org.eclipse.core.internal.registry.ExtensionHandle", null, function () {
c$ = Clazz.declareType (org.eclipse.core.internal.registry, "ExtensionHandle", org.eclipse.core.internal.registry.Handle, org.eclipse.core.runtime.IExtension);
Clazz.defineMethod (c$, "getExtension", 
($fz = function () {
return this.objectManager.getObject (this.getId (), 2);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getDeclaringPluginDescriptor", 
function () {
return this.getExtension ().getDeclaringPluginDescriptor ();
});
Clazz.overrideMethod (c$, "getNamespace", 
function () {
return this.getExtension ().getNamespace ();
});
Clazz.overrideMethod (c$, "getExtensionPointUniqueIdentifier", 
function () {
return this.getExtension ().getExtensionPointIdentifier ();
});
Clazz.overrideMethod (c$, "getLabel", 
function () {
return this.getExtension ().getLabel ();
});
Clazz.overrideMethod (c$, "getSimpleIdentifier", 
function () {
return this.getExtension ().getSimpleIdentifier ();
});
Clazz.overrideMethod (c$, "getUniqueIdentifier", 
function () {
return this.getExtension ().getUniqueIdentifier ();
});
Clazz.overrideMethod (c$, "getConfigurationElements", 
function () {
return this.objectManager.getHandles (this.getExtension ().getRawChildren (), 1);
});
Clazz.overrideMethod (c$, "getObject", 
function () {
return this.getExtension ();
});
Clazz.overrideMethod (c$, "isValid", 
function () {
try {
this.getExtension ();
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
