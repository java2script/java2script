Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.IAdapterFactory"], "org.eclipse.core.internal.runtime.AdapterFactoryProxy", ["java.util.ArrayList", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Platform", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.element = null;
this.factory = null;
this.factoryLoaded = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "AdapterFactoryProxy", null, org.eclipse.core.runtime.IAdapterFactory);
c$.createProxy = Clazz.defineMethod (c$, "createProxy", 
function (element) {
var result =  new org.eclipse.core.internal.runtime.AdapterFactoryProxy ();
result.element = element;
if ("factory".equals (element.getName ())) return result;
result.logError ();
return null;
}, "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "getAdaptableType", 
function () {
var result = this.element.getAttribute ("adaptableType");
if (result != null) return result;
this.logError ();
return "";
});
Clazz.defineMethod (c$, "getAdapter", 
function (adaptableObject, adapterType) {
if (!this.factoryLoaded) this.loadFactory (false);
return this.factory == null ? null : this.factory.getAdapter (adaptableObject, adapterType);
}, "~O,Class");
Clazz.defineMethod (c$, "getAdapterList", 
function () {
if (!this.factoryLoaded) this.loadFactory (false);
return this.factory == null ? null : this.factory.getAdapterList ();
});
Clazz.defineMethod (c$, "getAdapterNames", 
function () {
var children = this.element.getChildren ();
var adapters =  new java.util.ArrayList (children.length);
for (var i = 0; i < children.length; i++) {
if ("adapter".equals (children[i].getName ())) {
var type = children[i].getAttribute ("type");
if (type != null) adapters.add (type);
}}
if (adapters.isEmpty ()) this.logError ();
return adapters.toArray ( new Array (adapters.size ()));
});
Clazz.defineMethod (c$, "getExtension", 
function () {
return this.element.getDeclaringExtension ();
});
Clazz.defineMethod (c$, "loadFactory", 
function (force) {
{
if (this.factory != null || this.factoryLoaded) return this.factory;
var bundleId = this.element.getNamespace ();
if (!force && org.eclipse.core.runtime.Platform.getBundle (bundleId).getState () != 32) return null;
this.factoryLoaded = true;
}try {
this.factory = this.element.createExecutableExtension ("class");
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (e.getStatus ());
} else {
throw e;
}
}
return this.factory;
}, "~B");
Clazz.defineMethod (c$, "logError", 
($fz = function () {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.adapters_badAdapterFactory, this.element.getNamespace ());
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, null));
}, $fz.isPrivate = true, $fz));
});
