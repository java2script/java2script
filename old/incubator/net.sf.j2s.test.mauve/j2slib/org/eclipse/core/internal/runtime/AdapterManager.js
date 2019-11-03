Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.IAdapterManager", "$.IRegistryChangeListener"], "org.eclipse.core.internal.runtime.AdapterManager", ["java.util.ArrayList", "$.HashMap", "$.HashSet", "org.eclipse.core.internal.runtime.AdapterFactoryProxy", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.adapterLookup = null;
this.classLookup = null;
this.classSearchOrderLookup = null;
this.factories = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "AdapterManager", null, [org.eclipse.core.runtime.IAdapterManager, org.eclipse.core.runtime.IRegistryChangeListener]);
Clazz.makeConstructor (c$, 
function () {
this.factories =  new java.util.HashMap (5);
this.adapterLookup = null;
this.registerFactoryProxies ();
org.eclipse.core.runtime.Platform.getExtensionRegistry ().addRegistryChangeListener (this);
});
Clazz.defineMethod (c$, "addFactoriesFor", 
($fz = function (typeName, table) {
var factoryList = this.factories.get (typeName);
if (factoryList == null) return ;
for (var i = 0, imax = factoryList.size (); i < imax; i++) {
var factory = factoryList.get (i);
if (Clazz.instanceOf (factory, org.eclipse.core.internal.runtime.AdapterFactoryProxy)) {
var adapters = (factory).getAdapterNames ();
for (var j = 0; j < adapters.length; j++) {
if (table.get (adapters[j]) == null) table.put (adapters[j], factory);
}
} else {
var adapters = factory.getAdapterList ();
for (var j = 0; j < adapters.length; j++) {
var adapterName = adapters[j].getName ();
if (table.get (adapterName) == null) table.put (adapterName, factory);
}
}}
}, $fz.isPrivate = true, $fz), "~S,java.util.Map");
Clazz.defineMethod (c$, "cacheClassLookup", 
($fz = function (factory, clazz) {
var lookup = this.classLookup;
if (lookup == null) this.classLookup = lookup =  new java.util.HashMap (4);
var classes = lookup.get (factory);
if (classes == null) {
classes =  new java.util.HashMap (4);
lookup.put (factory, classes);
}classes.put (clazz.getName (), clazz);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IAdapterFactory,Class");
Clazz.defineMethod (c$, "cachedClassForName", 
($fz = function (factory, typeName) {
var clazz = null;
var lookup = this.classLookup;
if (lookup != null) {
var classes = lookup.get (factory);
if (classes != null) {
clazz = classes.get (typeName);
}}return clazz;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IAdapterFactory,~S");
Clazz.defineMethod (c$, "classForName", 
($fz = function (factory, typeName) {
var clazz = this.cachedClassForName (factory, typeName);
if (clazz == null) {
try {
if (Clazz.instanceOf (factory, org.eclipse.core.internal.runtime.AdapterFactoryProxy)) factory = (factory).loadFactory (false);
if (factory != null) {
clazz = factory.getClass ().getClassLoader ().loadClass (typeName);
this.cacheClassLookup (factory, clazz);
}} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
}return clazz;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IAdapterFactory,~S");
Clazz.overrideMethod (c$, "computeAdapterTypes", 
function (adaptable) {
var types = this.getFactories (adaptable).keySet ();
return types.toArray ( new Array (types.size ()));
}, "Class");
Clazz.defineMethod (c$, "getFactories", 
($fz = function (adaptable) {
var lookup = this.adapterLookup;
if (lookup == null) this.adapterLookup = lookup =  new java.util.HashMap (30);
var table = lookup.get (adaptable.getName ());
if (table == null) {
table =  new java.util.HashMap (4);
var classes = this.computeClassOrder (adaptable);
for (var i = 0; i < classes.length; i++) this.addFactoriesFor (classes[i].getName (), table);

lookup.put (adaptable.getName (), table);
}return table;
}, $fz.isPrivate = true, $fz), "Class");
Clazz.defineMethod (c$, "computeClassOrder", 
function (adaptable) {
var classes = null;
var lookup = this.classSearchOrderLookup;
if (lookup != null) classes = lookup.get (adaptable);
if (classes == null) {
classes =  new java.util.ArrayList ();
this.computeClassOrder (adaptable, classes);
if (lookup == null) this.classSearchOrderLookup = lookup =  new java.util.HashMap ();
lookup.put (adaptable, classes);
}return classes.toArray ( new Array (classes.size ()));
}, "Class");
Clazz.defineMethod (c$, "computeClassOrder", 
($fz = function (adaptable, classes) {
var clazz = adaptable;
var seen =  new java.util.HashSet (4);
while (clazz != null) {
classes.add (clazz);
this.computeInterfaceOrder (clazz.getInterfaces (), classes, seen);
clazz = clazz.getSuperclass ();
}
}, $fz.isPrivate = true, $fz), "Class,java.util.Collection");
Clazz.defineMethod (c$, "computeInterfaceOrder", 
($fz = function (interfaces, classes, seen) {
var newInterfaces =  new java.util.ArrayList (interfaces.length);
for (var i = 0; i < interfaces.length; i++) {
var interfac = interfaces[i];
if (seen.add (interfac)) {
classes.add (interfac);
newInterfaces.add (interfac);
}}
for (var it = newInterfaces.iterator (); it.hasNext (); ) this.computeInterfaceOrder ((it.next ()).getInterfaces (), classes, seen);

}, $fz.isPrivate = true, $fz), "~A,java.util.Collection,java.util.Set");
Clazz.defineMethod (c$, "flushLookup", 
function () {
this.adapterLookup = null;
this.classLookup = null;
this.classSearchOrderLookup = null;
});
Clazz.defineMethod (c$, "getAdapter", 
function (adaptable, adapterType) {
var factory = this.getFactories (adaptable.getClass ()).get (adapterType.getName ());
var result = null;
if (factory != null) result = factory.getAdapter (adaptable, adapterType);
if (result == null && adapterType.isInstance (adaptable)) return adaptable;
return result;
}, "~O,Class");
Clazz.defineMethod (c$, "getAdapter", 
function (adaptable, adapterType) {
return this.getAdapter (adaptable, adapterType, false);
}, "~O,~S");
Clazz.defineMethod (c$, "getAdapter", 
($fz = function (adaptable, adapterType, force) {
var factory = this.getFactories (adaptable.getClass ()).get (adapterType);
if (force && Clazz.instanceOf (factory, org.eclipse.core.internal.runtime.AdapterFactoryProxy)) factory = (factory).loadFactory (true);
var result = null;
if (factory != null) {
var clazz = this.classForName (factory, adapterType);
if (clazz != null) result = factory.getAdapter (adaptable, clazz);
}if (result == null && adaptable.getClass ().getName ().equals (adapterType)) return adaptable;
return result;
}, $fz.isPrivate = true, $fz), "~O,~S,~B");
Clazz.overrideMethod (c$, "hasAdapter", 
function (adaptable, adapterTypeName) {
return this.getFactories (adaptable.getClass ()).get (adapterTypeName) != null;
}, "~O,~S");
Clazz.overrideMethod (c$, "loadAdapter", 
function (adaptable, adapterTypeName) {
return this.getAdapter (adaptable, adapterTypeName, true);
}, "~O,~S");
Clazz.overrideMethod (c$, "registerAdapters", 
function (factory, adaptable) {
this.registerFactory (factory, adaptable.getName ());
this.flushLookup ();
}, "org.eclipse.core.runtime.IAdapterFactory,Class");
Clazz.defineMethod (c$, "registerExtension", 
($fz = function (extension) {
var elements = extension.getConfigurationElements ();
for (var j = 0; j < elements.length; j++) {
var proxy = org.eclipse.core.internal.runtime.AdapterFactoryProxy.createProxy (elements[j]);
if (proxy != null) this.registerFactory (proxy, proxy.getAdaptableType ());
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IExtension");
Clazz.defineMethod (c$, "registerFactory", 
($fz = function (factory, adaptableType) {
var list = this.factories.get (adaptableType);
if (list == null) {
list =  new java.util.ArrayList (5);
this.factories.put (adaptableType, list);
}list.add (factory);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IAdapterFactory,~S");
Clazz.defineMethod (c$, "registerFactoryProxies", 
($fz = function () {
var registry = org.eclipse.core.runtime.Platform.getExtensionRegistry ();
var point = registry.getExtensionPoint ("org.eclipse.core.runtime", "adapters");
if (point == null) return ;
var extensions = point.getExtensions ();
for (var i = 0; i < extensions.length; i++) this.registerExtension (extensions[i]);

}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "registryChanged", 
function (event) {
var toRemove = null;
var deltas = event.getExtensionDeltas ();
var adapterId = "org.eclipse.core.runtime.adapters";
var found = false;
for (var i = 0; i < deltas.length; i++) {
if (!adapterId.equals (deltas[i].getExtensionPoint ().getUniqueIdentifier ())) continue ;found = true;
if (deltas[i].getKind () == 1) this.registerExtension (deltas[i].getExtension ());
 else {
if (toRemove == null) toRemove =  new java.util.HashSet ();
toRemove.add (deltas[i].getExtension ());
}}
if (found) this.flushLookup ();
if (toRemove == null) return ;
for (var it = this.factories.values ().iterator (); it.hasNext (); ) {
for (var it2 = (it.next ()).iterator (); it2.hasNext (); ) {
var factory = it2.next ();
if (Clazz.instanceOf (factory, org.eclipse.core.internal.runtime.AdapterFactoryProxy)) {
var ext = (factory).getExtension ();
if (toRemove.contains (ext)) it2.remove ();
}}
}
}, "org.eclipse.core.runtime.IRegistryChangeEvent");
Clazz.defineMethod (c$, "unregisterAdapters", 
function (factory) {
for (var it = this.factories.values ().iterator (); it.hasNext (); ) (it.next ()).remove (factory);

this.flushLookup ();
}, "org.eclipse.core.runtime.IAdapterFactory");
Clazz.defineMethod (c$, "unregisterAdapters", 
function (factory, adaptable) {
var factoryList = this.factories.get (adaptable.getName ());
if (factoryList == null) return ;
factoryList.remove (factory);
this.flushLookup ();
}, "org.eclipse.core.runtime.IAdapterFactory,Class");
Clazz.defineMethod (c$, "unregisterAllAdapters", 
function () {
this.factories.clear ();
this.flushLookup ();
org.eclipse.core.runtime.Platform.getExtensionRegistry ().removeRegistryChangeListener (this);
});
});
