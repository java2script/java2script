Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.IObjectManager"], "org.eclipse.core.internal.registry.TemporaryObjectManager", ["org.eclipse.core.internal.registry.ConfigurationElement", "$.ConfigurationElementHandle", "$.Extension", "$.ExtensionHandle", "$.ExtensionPoint", "$.ExtensionPointHandle", "$.ThirdLevelConfigurationElementHandle", "org.eclipse.core.runtime.InvalidRegistryObjectException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.actualObjects = null;
this.parent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "TemporaryObjectManager", null, org.eclipse.core.internal.registry.IObjectManager);
Clazz.makeConstructor (c$, 
function (actualObjects, parent) {
this.actualObjects = actualObjects;
this.parent = parent;
}, "java.util.Map,org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.overrideMethod (c$, "getHandle", 
function (id, type) {
switch (type) {
case 3:
return  new org.eclipse.core.internal.registry.ExtensionPointHandle (this, id);
case 2:
return  new org.eclipse.core.internal.registry.ExtensionHandle (this, id);
case 1:
return  new org.eclipse.core.internal.registry.ConfigurationElementHandle (this, id);
case 4:
default:
return  new org.eclipse.core.internal.registry.ThirdLevelConfigurationElementHandle (this, id);
}
}, "~N,~N");
Clazz.overrideMethod (c$, "getHandles", 
function (ids, type) {
var results = null;
var nbrId = ids.length;
switch (type) {
case 3:
if (nbrId == 0) return org.eclipse.core.internal.registry.ExtensionPointHandle.EMPTY_ARRAY;
results =  new Array (nbrId);
for (var i = 0; i < nbrId; i++) {
results[i] =  new org.eclipse.core.internal.registry.ExtensionPointHandle (this, ids[i]);
}
break;
case 2:
if (nbrId == 0) return org.eclipse.core.internal.registry.ExtensionHandle.EMPTY_ARRAY;
results =  new Array (nbrId);
for (var i = 0; i < nbrId; i++) {
results[i] =  new org.eclipse.core.internal.registry.ExtensionHandle (this, ids[i]);
}
break;
case 1:
if (nbrId == 0) return org.eclipse.core.internal.registry.ConfigurationElementHandle.EMPTY_ARRAY;
results =  new Array (nbrId);
for (var i = 0; i < nbrId; i++) {
results[i] =  new org.eclipse.core.internal.registry.ConfigurationElementHandle (this, ids[i]);
}
break;
case 4:
if (nbrId == 0) return org.eclipse.core.internal.registry.ConfigurationElementHandle.EMPTY_ARRAY;
results =  new Array (nbrId);
for (var i = 0; i < nbrId; i++) {
results[i] =  new org.eclipse.core.internal.registry.ThirdLevelConfigurationElementHandle (this, ids[i]);
}
break;
}
return results;
}, "~A,~N");
Clazz.overrideMethod (c$, "getObject", 
function (id, type) {
var result = null;
try {
result = this.parent.getObject (id, type);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.InvalidRegistryObjectException)) {
if (this.actualObjects != null) {
result = this.actualObjects.get ( new Integer (id));
}} else {
throw e;
}
}
if (result == null) throw  new org.eclipse.core.runtime.InvalidRegistryObjectException ();
return result;
}, "~N,~N");
Clazz.overrideMethod (c$, "getObjects", 
function (values, type) {
if (values.length == 0) {
switch (type) {
case 3:
return org.eclipse.core.internal.registry.ExtensionPoint.EMPTY_ARRAY;
case 2:
return org.eclipse.core.internal.registry.Extension.EMPTY_ARRAY;
case 1:
case 4:
return org.eclipse.core.internal.registry.ConfigurationElement.EMPTY_ARRAY;
}
}var results = null;
switch (type) {
case 3:
results =  new Array (values.length);
break;
case 2:
results =  new Array (values.length);
break;
case 1:
case 4:
results =  new Array (values.length);
break;
}
for (var i = 0; i < values.length; i++) {
results[i] = this.getObject (values[i], type);
}
return results;
}, "~A,~N");
Clazz.overrideMethod (c$, "close", 
function () {
this.actualObjects = null;
});
});
