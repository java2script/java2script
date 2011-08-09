Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.Handle", "org.eclipse.core.runtime.IConfigurationElement"], "org.eclipse.core.internal.registry.ConfigurationElementHandle", ["org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.CoreException", "$.Status"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.registry, "ConfigurationElementHandle", org.eclipse.core.internal.registry.Handle, org.eclipse.core.runtime.IConfigurationElement);
Clazz.defineMethod (c$, "getConfigurationElement", 
function () {
return this.objectManager.getObject (this.getId (), 1);
});
Clazz.overrideMethod (c$, "getAttribute", 
function (propertyName) {
return this.getConfigurationElement ().getAttribute (propertyName);
}, "~S");
Clazz.overrideMethod (c$, "getAttributeNames", 
function () {
return this.getConfigurationElement ().getAttributeNames ();
});
Clazz.defineMethod (c$, "getChildren", 
function () {
var actualCe = this.getConfigurationElement ();
if (actualCe.extraDataOffset == -1) {
return this.objectManager.getHandles (actualCe.getRawChildren (), 1);
}return this.objectManager.getHandles (actualCe.getRawChildren (), 4);
});
Clazz.overrideMethod (c$, "createExecutableExtension", 
function (propertyName) {
try {
return this.getConfigurationElement ().createExecutableExtension (propertyName);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.InvalidRegistryObjectException)) {
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, "Invalid registry object", e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getLog (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getBundle ()).log (status);
throw  new org.eclipse.core.runtime.CoreException (status);
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "getAttributeAsIs", 
function (name) {
return this.getConfigurationElement ().getAttributeAsIs (name);
}, "~S");
Clazz.defineMethod (c$, "getChildren", 
function (name) {
var actualCE = this.getConfigurationElement ();
var children = this.objectManager.getObjects (actualCE.getRawChildren (), actualCE.extraDataOffset == -1 ? 1 : 4);
if (children.length == 0) return org.eclipse.core.internal.registry.ConfigurationElementHandle.EMPTY_ARRAY;
var result =  new Array (1);
var idx = 0;
for (var i = 0; i < children.length; i++) {
if (children[i].getName ().equals (name)) {
if (idx != 0) {
var copy =  new Array (result.length + 1);
System.arraycopy (result, 0, copy, 0, result.length);
result = copy;
}result[idx++] = this.objectManager.getHandle (children[i].getObjectId (), actualCE.extraDataOffset == -1 ? 1 : 4);
}}
if (idx == 0) return org.eclipse.core.internal.registry.ConfigurationElementHandle.EMPTY_ARRAY;
return result;
}, "~S");
Clazz.overrideMethod (c$, "getDeclaringExtension", 
function () {
var result = this;
while (!(Clazz.instanceOf ((result = (result).getParent ()), org.eclipse.core.internal.registry.ExtensionHandle))) {
}
return result;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.getConfigurationElement ().getName ();
});
Clazz.overrideMethod (c$, "getParent", 
function () {
var actualCe = this.getConfigurationElement ();
return this.objectManager.getHandle (actualCe.parentId, actualCe.parentType);
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.getConfigurationElement ().getValue ();
});
Clazz.overrideMethod (c$, "getValueAsIs", 
function () {
return this.getConfigurationElement ().getValueAsIs ();
});
Clazz.overrideMethod (c$, "getObject", 
function () {
return this.getConfigurationElement ();
});
Clazz.overrideMethod (c$, "getNamespace", 
function () {
var result = this.getConfigurationElement ().getNamespace ();
if (result == null) return this.getDeclaringExtension ().getNamespace ();
return result;
});
Clazz.overrideMethod (c$, "isValid", 
function () {
try {
this.getConfigurationElement ();
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
