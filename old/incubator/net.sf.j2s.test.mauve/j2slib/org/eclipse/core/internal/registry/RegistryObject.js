Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.KeyedElement", "$.RegistryObjectManager"], "org.eclipse.core.internal.registry.RegistryObject", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.objectId = 0;
this.children = null;
this.extraDataOffset = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "RegistryObject", null, org.eclipse.core.internal.registry.KeyedElement);
Clazz.prepareFields (c$, function () {
this.objectId = org.eclipse.core.internal.registry.RegistryObjectManager.UNKNOWN;
this.children = org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
});
Clazz.defineMethod (c$, "setRawChildren", 
function (values) {
this.children = values;
}, "~A");
Clazz.defineMethod (c$, "getRawChildren", 
function () {
return this.children;
});
Clazz.defineMethod (c$, "setObjectId", 
function (value) {
this.objectId = value;
}, "~N");
Clazz.defineMethod (c$, "getObjectId", 
function () {
return this.objectId;
});
Clazz.overrideMethod (c$, "getKeyHashCode", 
function () {
return this.objectId;
});
Clazz.overrideMethod (c$, "getKey", 
function () {
return  new Integer (this.objectId);
});
Clazz.overrideMethod (c$, "compare", 
function (other) {
return this.objectId == (other).objectId;
}, "org.eclipse.core.internal.registry.KeyedElement");
});
