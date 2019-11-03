Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.RegistryObject"], "org.eclipse.core.internal.registry.ConfigurationElement", ["java.util.Hashtable", "org.eclipse.core.internal.registry.ConfigurationElementHandle", "$.RegistryObjectManager", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.CoreException", "$.InvalidRegistryObjectException", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parentId = 0;
this.parentType = 0;
this.propertiesAndValue = null;
this.name = null;
this.contributingBundle = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ConfigurationElement", org.eclipse.core.internal.registry.RegistryObject);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ConfigurationElement, []);
});
Clazz.makeConstructor (c$, 
function (self, bundle, name, propertiesAndValue, children, extraDataOffset, parent, parentType) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ConfigurationElement, []);
this.setObjectId (self);
this.contributingBundle = bundle;
this.name = name;
this.propertiesAndValue = propertiesAndValue;
this.setRawChildren (children);
this.extraDataOffset = extraDataOffset;
this.parentId = parent;
this.parentType = parentType;
}, "~N,org.osgi.framework.Bundle,~S,~A,~A,~N,~N,~N");
Clazz.defineMethod (c$, "createExecutableExtension", 
function (attributeName) {
var prop = null;
var executable;
var pluginName = null;
var className = null;
var initData = null;
var i;
if (attributeName != null) prop = this.getAttribute (attributeName);
 else {
prop = this.getValue ();
if (prop != null) {
prop = prop.trim ();
if (prop.equals ("")) prop = null;
}}if (prop == null) {
var exec;
var parms;
var element;
var initParms;
var pname;
exec = this.getChildren (attributeName);
if (exec.length != 0) {
element = exec[0];
pluginName = element.getAttribute ("plugin");
className = element.getAttribute ("class");
parms = element.getChildren ("parameter");
if (parms.length != 0) {
initParms =  new java.util.Hashtable (parms.length + 1);
for (i = 0; i < parms.length; i++) {
pname = parms[i].getAttribute ("name");
if (pname != null) initParms.put (pname, parms[i].getAttribute ("value"));
}
if (!initParms.isEmpty ()) initData = initParms;
}} else {
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_extDefNotFound, attributeName), null);
}} else {
i = prop.indexOf (':');
if (i != -1) {
executable = prop.substring (0, i).trim ();
initData = prop.substring (i + 1).trim ();
} else executable = prop;
i = executable.indexOf ('/');
if (i != -1) {
pluginName = executable.substring (0, i).trim ();
className = executable.substring (i + 1).trim ();
} else className = executable;
}if (className == null || className.equals ("")) this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_extDefNoClass, attributeName), null);
return this.createExecutableExtension (pluginName, className, initData, this, attributeName);
}, "~S");
Clazz.defineMethod (c$, "createExecutableExtension", 
($fz = function (pluginName, className, initData, cfig, propertyName) {
if (this.contributingBundle == null) {
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_loadClassError, "UNKNOWN BUNDLE", className),  new org.eclipse.core.runtime.InvalidRegistryObjectException ());
}var id = this.contributingBundle.getSymbolicName ();
if (pluginName != null && !pluginName.equals ("") && !pluginName.equals (id)) {
var otherBundle = null;
otherBundle = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (pluginName);
return this.createExecutableExtension (otherBundle, className, initData, cfig, propertyName);
}return this.createExecutableExtension (this.contributingBundle, className, initData, cfig, propertyName);
}, $fz.isPrivate = true, $fz), "~S,~S,~O,org.eclipse.core.internal.registry.ConfigurationElement,~S");
Clazz.defineMethod (c$, "createExecutableExtension", 
($fz = function (bundle, className, initData, cfig, propertyName) {
if (this.contributingBundle == null) {
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_loadClassError, "UNKNOWN BUNDLE", className),  new org.eclipse.core.runtime.InvalidRegistryObjectException ());
}var classInstance = null;
try {
classInstance = bundle.loadClass (className);
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e1 = e$$;
{
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_loadClassError, bundle.getSymbolicName (), className), e1);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_loadClassError, bundle.getSymbolicName (), className), e);
}
} else {
throw e$$;
}
}
var result = null;
try {
result = classInstance.newInstance ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_instantiateClassError, bundle.getSymbolicName (), className), e);
} else {
throw e;
}
}
if (Clazz.instanceOf (result, org.eclipse.core.runtime.IExecutableExtension)) {
try {
var cfigHandle =  new org.eclipse.core.internal.registry.ConfigurationElementHandle ((org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ()).getObjectManager (), cfig.getObjectId ());
(result).setInitializationData (cfigHandle, propertyName, initData);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var ce = e$$;
{
throw ce;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var te = e$$;
{
this.throwException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_initObjectError, bundle.getSymbolicName (), className), te);
}
} else {
throw e$$;
}
}
}if (Clazz.instanceOf (result, org.eclipse.core.runtime.IExecutableExtensionFactory)) {
result = (result).create ();
}return result;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,~S,~O,org.eclipse.core.internal.registry.ConfigurationElement,~S");
Clazz.defineMethod (c$, "throwException", 
($fz = function (message, exception) {
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, message, exception));
}, $fz.isPrivate = true, $fz), "~S,Throwable");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.getValueAsIs ();
});
Clazz.defineMethod (c$, "getValueAsIs", 
function () {
if (this.propertiesAndValue.length != 0 && this.propertiesAndValue.length % 2 == 1) return this.propertiesAndValue[this.propertiesAndValue.length - 1];
return null;
});
Clazz.defineMethod (c$, "getAttribute", 
function (attrName) {
return this.getAttributeAsIs (attrName);
}, "~S");
Clazz.defineMethod (c$, "getAttributeAsIs", 
function (attrName) {
if (this.propertiesAndValue.length <= 1) return null;
var size = this.propertiesAndValue.length - (this.propertiesAndValue.length % 2);
for (var i = 0; i < size; i += 2) {
if (this.propertiesAndValue[i].equals (attrName)) return this.propertiesAndValue[i + 1];
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getAttributeNames", 
function () {
if (this.propertiesAndValue.length <= 1) return org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_STRING_ARRAY;
var size = Math.floor (this.propertiesAndValue.length / 2);
var result =  new Array (size);
for (var i = 0; i < size; i++) {
result[i] = this.propertiesAndValue[i * 2];
}
return result;
});
Clazz.defineMethod (c$, "setProperties", 
function (value) {
this.propertiesAndValue = value;
}, "~A");
Clazz.defineMethod (c$, "getPropertiesAndValue", 
function () {
return this.propertiesAndValue;
});
Clazz.defineMethod (c$, "setValue", 
function (value) {
if (this.propertiesAndValue.length == 0) {
this.propertiesAndValue = [value];
return ;
}if (this.propertiesAndValue.length % 2 == 1) {
this.propertiesAndValue[this.propertiesAndValue.length - 1] = value;
return ;
}var newPropertiesAndValue =  new Array (this.propertiesAndValue.length + 1);
System.arraycopy (this.propertiesAndValue, 0, newPropertiesAndValue, 0, this.propertiesAndValue.length);
newPropertiesAndValue[this.propertiesAndValue.length] = value;
this.propertiesAndValue = newPropertiesAndValue;
}, "~S");
Clazz.defineMethod (c$, "setContributingBundle", 
function (b) {
this.contributingBundle = b;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getContributingBundle", 
function () {
return this.contributingBundle;
});
Clazz.defineMethod (c$, "getChildren", 
function (childrenName) {
if (this.getRawChildren ().length == 0) return org.eclipse.core.internal.registry.ConfigurationElement.EMPTY_ARRAY;
var result =  new Array (1);
var idx = 0;
var objectManager = (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ()).getObjectManager ();
for (var i = 0; i < this.children.length; i++) {
var toTest = objectManager.getObject (this.children[i], this.extraDataOffset == -1 ? 1 : 4);
if (toTest.name.equals (childrenName)) {
if (idx != 0) {
var copy =  new Array (result.length + 1);
System.arraycopy (result, 0, copy, 0, result.length);
result = copy;
}result[idx++] = toTest;
}}
if (idx == 0) result = org.eclipse.core.internal.registry.ConfigurationElement.EMPTY_ARRAY;
return result;
}, "~S");
Clazz.defineMethod (c$, "setParentId", 
function (objectId) {
this.parentId = objectId;
}, "~N");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "setParentType", 
function (type) {
this.parentType = type;
}, "~N");
Clazz.defineMethod (c$, "getNamespace", 
function () {
return this.contributingBundle == null ? null : this.contributingBundle.getSymbolicName ();
});
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"PLUGIN_ERROR", 1);
});
