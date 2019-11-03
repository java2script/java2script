Clazz.declarePackage ("org.eclipse.core.internal.registry");
c$ = Clazz.decorateAsClass (function () {
this.objectManager = null;
this.objectId = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "Handle");
Clazz.defineMethod (c$, "getId", 
function () {
return this.objectId;
});
Clazz.makeConstructor (c$, 
function (objectManager, value) {
this.objectId = value;
this.objectManager = objectManager;
}, "org.eclipse.core.internal.registry.IObjectManager,~N");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (Clazz.instanceOf (object, org.eclipse.core.internal.registry.Handle)) {
return this.objectId == (object).objectId;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.objectId;
});
