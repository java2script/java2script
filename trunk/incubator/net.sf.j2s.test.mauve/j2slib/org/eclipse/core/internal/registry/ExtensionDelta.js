Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.runtime.IExtensionDelta"], "org.eclipse.core.internal.registry.ExtensionDelta", ["org.eclipse.core.internal.registry.ExtensionHandle", "$.ExtensionPointHandle"], function () {
c$ = Clazz.decorateAsClass (function () {
this.kind = 0;
this.extension = 0;
this.extensionPoint = 0;
this.containingDelta = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ExtensionDelta", null, org.eclipse.core.runtime.IExtensionDelta);
Clazz.defineMethod (c$, "setContainingDelta", 
function (containingDelta) {
this.containingDelta = containingDelta;
}, "org.eclipse.core.internal.registry.RegistryDelta");
Clazz.defineMethod (c$, "getExtensionId", 
function () {
return this.extension;
});
Clazz.defineMethod (c$, "getExtensionPointId", 
function () {
return this.extensionPoint;
});
Clazz.overrideMethod (c$, "getExtensionPoint", 
function () {
return  new org.eclipse.core.internal.registry.ExtensionPointHandle (this.containingDelta.getObjectManager (), this.extensionPoint);
});
Clazz.defineMethod (c$, "setExtensionPoint", 
function (extensionPoint) {
this.extensionPoint = extensionPoint;
}, "~N");
Clazz.overrideMethod (c$, "getKind", 
function () {
return this.kind;
});
Clazz.overrideMethod (c$, "getExtension", 
function () {
return  new org.eclipse.core.internal.registry.ExtensionHandle (this.containingDelta.getObjectManager (), this.extension);
});
Clazz.defineMethod (c$, "setExtension", 
function (extension) {
this.extension = extension;
}, "~N");
Clazz.defineMethod (c$, "setKind", 
function (kind) {
this.kind = kind;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "\n\t\t" + this.getExtensionPoint ().getUniqueIdentifier () + " - " + this.getExtension ().getNamespace () + '.' + this.getExtension ().getSimpleIdentifier () + " (" + org.eclipse.core.internal.registry.ExtensionDelta.getKindString (this.getKind ()) + ")";
});
c$.getKindString = Clazz.defineMethod (c$, "getKindString", 
function (kind) {
switch (kind) {
case 1:
return "ADDED";
case 2:
return "REMOVED";
}
return "UNKNOWN";
}, "~N");
});
