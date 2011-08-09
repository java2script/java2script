Clazz.declarePackage ("org.eclipse.core.runtime.dynamichelpers");
Clazz.load (["org.eclipse.core.runtime.IRegistryChangeListener", "org.eclipse.core.runtime.dynamichelpers.IExtensionTracker", "java.util.HashMap", "org.eclipse.core.internal.runtime.ListenerList"], "org.eclipse.core.runtime.dynamichelpers.ExtensionTracker", ["org.eclipse.core.internal.registry.ReferenceHashSet", "org.eclipse.core.runtime.Platform", "org.eclipse.core.runtime.dynamichelpers.IFilter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extensionToObjects = null;
this.handlers = null;
this.lock = null;
this.closed = false;
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.HandlerWrapper")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.handler = null;
this.filter = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.dynamichelpers.ExtensionTracker, "HandlerWrapper");
Clazz.makeConstructor (c$, 
function (a, b) {
this.handler = a;
this.filter = b;
}, "org.eclipse.core.runtime.dynamichelpers.IExtensionChangeHandler,org.eclipse.core.runtime.dynamichelpers.IFilter");
Clazz.defineMethod (c$, "equals", 
function (a) {
return this.handler.equals ((a).handler);
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.handler.hashCode ();
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.dynamichelpers, "ExtensionTracker", null, [org.eclipse.core.runtime.dynamichelpers.IExtensionTracker, org.eclipse.core.runtime.IRegistryChangeListener]);
Clazz.prepareFields (c$, function () {
this.extensionToObjects =  new java.util.HashMap ();
this.handlers =  new org.eclipse.core.internal.runtime.ListenerList ();
this.lock =  new Object ();
});
Clazz.makeConstructor (c$, 
function () {
org.eclipse.core.runtime.Platform.getExtensionRegistry ().addRegistryChangeListener (this);
});
Clazz.overrideMethod (c$, "registerHandler", 
function (handler, filter) {
{
if (this.closed) return ;
this.handlers.add (Clazz.innerTypeInstance (org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.HandlerWrapper, this, null, handler, filter));
}}, "org.eclipse.core.runtime.dynamichelpers.IExtensionChangeHandler,org.eclipse.core.runtime.dynamichelpers.IFilter");
Clazz.overrideMethod (c$, "unregisterHandler", 
function (handler) {
{
if (this.closed) return ;
this.handlers.remove (Clazz.innerTypeInstance (org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.HandlerWrapper, this, null, handler, null));
}}, "org.eclipse.core.runtime.dynamichelpers.IExtensionChangeHandler");
Clazz.overrideMethod (c$, "registerObject", 
function (element, object, referenceType) {
if (element == null || object == null) return ;
{
if (this.closed) return ;
var associatedObjects = this.extensionToObjects.get (element);
if (associatedObjects == null) {
associatedObjects =  new org.eclipse.core.internal.registry.ReferenceHashSet ();
this.extensionToObjects.put (element, associatedObjects);
}associatedObjects.add (object, referenceType);
}}, "org.eclipse.core.runtime.IExtension,~O,~N");
Clazz.overrideMethod (c$, "registryChanged", 
function (event) {
var delta = event.getExtensionDeltas ();
var len = delta.length;
for (var i = 0; i < len; i++) switch (delta[i].getKind ()) {
case 1:
this.doAdd (delta[i]);
break;
case 2:
this.doRemove (delta[i]);
break;
default:
break;
}

}, "org.eclipse.core.runtime.IRegistryChangeEvent");
Clazz.defineMethod (c$, "notify", 
($fz = function (delta, objects) {
var handlersCopy = null;
{
if (this.closed) return ;
if (this.handlers == null || this.handlers.isEmpty ()) return ;
handlersCopy = this.handlers.getListeners ();
}for (var i = 0; i < handlersCopy.length; i++) {
var wrapper = handlersCopy[i];
if (wrapper.filter == null || wrapper.filter.matches (delta.getExtensionPoint ())) {
if (objects == null) this.applyAdd (wrapper.handler, delta.getExtension ());
 else this.applyRemove (wrapper.handler, delta.getExtension (), objects);
}}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IExtensionDelta,~A");
Clazz.defineMethod (c$, "applyAdd", 
function (handler, extension) {
handler.addExtension (this, extension);
}, "org.eclipse.core.runtime.dynamichelpers.IExtensionChangeHandler,org.eclipse.core.runtime.IExtension");
Clazz.defineMethod (c$, "doAdd", 
($fz = function (delta) {
this.notify (delta, null);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IExtensionDelta");
Clazz.defineMethod (c$, "doRemove", 
($fz = function (delta) {
var removedObjects = null;
{
if (this.closed) return ;
var associatedObjects = this.extensionToObjects.remove (delta.getExtension ());
if (associatedObjects == null) return ;
removedObjects = associatedObjects.toArray ();
}this.notify (delta, removedObjects);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IExtensionDelta");
Clazz.defineMethod (c$, "applyRemove", 
function (handler, removedExtension, removedObjects) {
handler.removeExtension (removedExtension, removedObjects);
}, "org.eclipse.core.runtime.dynamichelpers.IExtensionChangeHandler,org.eclipse.core.runtime.IExtension,~A");
Clazz.overrideMethod (c$, "getObjects", 
function (element) {
{
if (this.closed) return org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.EMPTY_ARRAY;
var objectSet = this.extensionToObjects.get (element);
if (objectSet == null) return org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.EMPTY_ARRAY;
return objectSet.toArray ();
}}, "org.eclipse.core.runtime.IExtension");
Clazz.overrideMethod (c$, "close", 
function () {
{
if (this.closed) return ;
org.eclipse.core.runtime.Platform.getExtensionRegistry ().removeRegistryChangeListener (this);
this.extensionToObjects = null;
this.handlers = null;
this.closed = true;
}});
Clazz.defineMethod (c$, "unregisterObject", 
function (extension, object) {
{
if (this.closed) return ;
var associatedObjects = this.extensionToObjects.get (extension);
if (associatedObjects != null) associatedObjects.remove (object);
}}, "org.eclipse.core.runtime.IExtension,~O");
Clazz.defineMethod (c$, "unregisterObject", 
function (extension) {
{
if (this.closed) return org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.EMPTY_ARRAY;
var associatedObjects = this.extensionToObjects.remove (extension);
if (associatedObjects == null) return org.eclipse.core.runtime.dynamichelpers.ExtensionTracker.EMPTY_ARRAY;
return associatedObjects.toArray ();
}}, "org.eclipse.core.runtime.IExtension");
c$.createExtensionPointFilter = Clazz.defineMethod (c$, "createExtensionPointFilter", 
function (xpt) {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.dynamichelpers, "ExtensionTracker$1", null, org.eclipse.core.runtime.dynamichelpers.IFilter);
Clazz.defineMethod (c$, "matches", 
function (target) {
return this.f$.xpt.equals (target);
}, "org.eclipse.core.runtime.IExtensionPoint");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$1, i$, v$);
}) (this, Clazz.cloneFinals ("xpt", xpt));
}, "org.eclipse.core.runtime.IExtensionPoint");
c$.createExtensionPointFilter = Clazz.defineMethod (c$, "createExtensionPointFilter", 
function (xpts) {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.dynamichelpers, "ExtensionTracker$2", null, org.eclipse.core.runtime.dynamichelpers.IFilter);
Clazz.defineMethod (c$, "matches", 
function (target) {
for (var i = 0; i < this.f$.xpts.length; i++) if (this.f$.xpts[i].equals (target)) return true;

return false;
}, "org.eclipse.core.runtime.IExtensionPoint");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$2, i$, v$);
}) (this, Clazz.cloneFinals ("xpts", xpts));
}, "~A");
c$.createNamespaceFilter = Clazz.defineMethod (c$, "createNamespaceFilter", 
function (id) {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.dynamichelpers, "ExtensionTracker$3", null, org.eclipse.core.runtime.dynamichelpers.IFilter);
Clazz.defineMethod (c$, "matches", 
function (target) {
return this.f$.id.equals (target.getNamespace ());
}, "org.eclipse.core.runtime.IExtensionPoint");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.dynamichelpers.ExtensionTracker$3, i$, v$);
}) (this, Clazz.cloneFinals ("id", id));
}, "~S");
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
});
