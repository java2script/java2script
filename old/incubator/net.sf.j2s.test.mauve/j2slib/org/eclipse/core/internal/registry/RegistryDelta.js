Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["java.util.HashSet"], "org.eclipse.core.internal.registry.RegistryDelta", ["java.util.LinkedList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extensionDeltas = null;
this.objectManager = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "RegistryDelta");
Clazz.prepareFields (c$, function () {
this.extensionDeltas =  new java.util.HashSet ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getExtensionDeltasCount", 
function () {
return this.extensionDeltas.size ();
});
Clazz.defineMethod (c$, "getExtensionDeltas", 
function () {
return this.extensionDeltas.toArray ( new Array (this.extensionDeltas.size ()));
});
Clazz.defineMethod (c$, "getExtensionDeltas", 
function (extensionPoint) {
var selectedExtDeltas =  new java.util.LinkedList ();
for (var extDeltasIter = this.extensionDeltas.iterator (); extDeltasIter.hasNext (); ) {
var extensionDelta = extDeltasIter.next ();
if (extensionDelta.getExtension ().getExtensionPointUniqueIdentifier ().equals (extensionPoint)) selectedExtDeltas.add (extensionDelta);
}
return selectedExtDeltas.toArray ( new Array (selectedExtDeltas.size ()));
}, "~S");
Clazz.defineMethod (c$, "getExtensionDelta", 
function (extensionPointId, extensionId) {
for (var extDeltasIter = this.extensionDeltas.iterator (); extDeltasIter.hasNext (); ) {
var extensionDelta = extDeltasIter.next ();
var extension = extensionDelta.getExtension ();
if (extension.getExtensionPointUniqueIdentifier ().equals (extensionPointId) && extension.getUniqueIdentifier () != null && extension.getUniqueIdentifier ().equals (extensionId)) return extensionDelta;
}
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "addExtensionDelta", 
function (extensionDelta) {
this.extensionDeltas.add (extensionDelta);
(extensionDelta).setContainingDelta (this);
}, "org.eclipse.core.runtime.IExtensionDelta");
Clazz.overrideMethod (c$, "toString", 
function () {
return "\n\tHost " + ": " + this.extensionDeltas;
});
Clazz.defineMethod (c$, "setObjectManager", 
function (objectManager) {
this.objectManager = objectManager;
}, "org.eclipse.core.internal.registry.IObjectManager");
Clazz.defineMethod (c$, "getObjectManager", 
function () {
return this.objectManager;
});
});
