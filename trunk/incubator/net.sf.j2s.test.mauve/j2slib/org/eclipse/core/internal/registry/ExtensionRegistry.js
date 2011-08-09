Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.runtime.IExtensionRegistry", "org.eclipse.core.runtime.jobs.Job", "java.util.HashMap", "org.eclipse.core.internal.registry.ReadWriteMonitor", "org.eclipse.core.internal.runtime.ListenerList", "org.eclipse.core.runtime.jobs.ISchedulingRule"], "org.eclipse.core.internal.registry.ExtensionRegistry", ["java.io.File", "java.lang.reflect.Array", "java.util.ArrayList", "$.HashSet", "$.Hashtable", "org.eclipse.core.internal.registry.EclipseBundleListener", "$.ExtensionDelta", "$.ExtensionHandle", "$.ExtensionPointHandle", "$.RegistryChangeEvent", "$.RegistryDelta", "$.RegistryObjectManager", "$.TableReader", "$.TableWriter", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.IRegistryChangeListener", "$.MultiStatus", "$.Platform", "$.Status", "org.eclipse.core.runtime.adaptor.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pluginBundleListener = null;
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ExtensionRegistry.ListenerInfo")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filter = null;
this.listener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ExtensionRegistry, "ListenerInfo");
Clazz.makeConstructor (c$, 
function (a, b) {
this.listener = a;
this.filter = b;
}, "org.eclipse.core.runtime.IRegistryChangeListener,~S");
Clazz.overrideMethod (c$, "equals", 
function (a) {
return Clazz.instanceOf (a, org.eclipse.core.internal.registry.ExtensionRegistry.ListenerInfo) && (a).listener === this.listener;
}, "~O");
c$ = Clazz.p0p ();
}
this.access = null;
this.deltas = null;
this.currentFileManager = null;
this.listeners = null;
this.registryObjects = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ExtensionRegistry", null, org.eclipse.core.runtime.IExtensionRegistry);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.deltas = null;
this.listenerInfos = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ExtensionRegistry, "ExtensionEventDispatcherJob", org.eclipse.core.runtime.jobs.Job);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ExtensionRegistry.ExtensionEventDispatcherJob, ["Registry event dispatcher"]);
this.setSystem (true);
this.listenerInfos = a;
this.deltas = b;
this.setRule (org.eclipse.core.internal.registry.ExtensionRegistry.ExtensionEventDispatcherJob.EXTENSION_EVENT_RULE);
}, "~A,java.util.Map");
Clazz.overrideMethod (c$, "run", 
function (a) {
var b =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.plugin_eventListenerError, null);
for (var c = 0; c < this.listenerInfos.length; c++) {
var d = this.listenerInfos[c];
if (d.filter != null && !this.deltas.containsKey (d.filter)) continue ;try {
d.listener.registryChanged ( new org.eclipse.core.internal.registry.RegistryChangeEvent (this.deltas, d.filter));
} catch (re) {
if (Clazz.instanceOf (re, RuntimeException)) {
var e = re.getMessage () == null ? "" : re.getMessage ();
b.add ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, e, re));
} else {
throw re;
}
}
}
for (var d = this.deltas.values ().iterator (); d.hasNext (); ) {
(d.next ()).getObjectManager ().close ();
}
return b;
}, "org.eclipse.core.runtime.IProgressMonitor");
c$.EXTENSION_EVENT_RULE = c$.prototype.EXTENSION_EVENT_RULE = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ExtensionRegistry.ExtensionEventDispatcherJob$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.registry.ExtensionRegistry, "ExtensionEventDispatcherJob$1", null, org.eclipse.core.runtime.jobs.ISchedulingRule);
Clazz.overrideMethod (c$, "contains", 
function (a) {
return a === this;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.overrideMethod (c$, "isConflicting", 
function (a) {
return a === this;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ExtensionRegistry.ExtensionEventDispatcherJob$1, i$, v$);
}) (this, null);
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.access =  new org.eclipse.core.internal.registry.ReadWriteMonitor ();
this.deltas =  new java.util.HashMap (11);
this.listeners =  new org.eclipse.core.internal.runtime.ListenerList ();
});
Clazz.defineMethod (c$, "getObjectManager", 
function () {
return this.registryObjects;
});
Clazz.defineMethod (c$, "add", 
function (element) {
this.access.enterWrite ();
try {
this.basicAdd (element, true);
this.fireRegistryChangeEvent ();
} finally {
this.access.exitWrite ();
}
}, "org.eclipse.core.internal.registry.Contribution");
Clazz.defineMethod (c$, "add", 
function (elements) {
this.access.enterWrite ();
try {
for (var i = 0; i < elements.length; i++) this.basicAdd (elements[i], true);

this.fireRegistryChangeEvent ();
} finally {
this.access.exitWrite ();
}
}, "~A");
c$.concatArrays = Clazz.defineMethod (c$, "concatArrays", 
function (a, b) {
var result = java.lang.reflect.Array.newInstance (a.getClass ().getComponentType (), java.lang.reflect.Array.getLength (a) + java.lang.reflect.Array.getLength (b));
System.arraycopy (a, 0, result, 0, java.lang.reflect.Array.getLength (a));
System.arraycopy (b, 0, result, java.lang.reflect.Array.getLength (a), java.lang.reflect.Array.getLength (b));
return result;
}, "~O,~O");
Clazz.defineMethod (c$, "addExtension", 
($fz = function (extension) {
var addedExtension = this.registryObjects.getObject (extension, 2);
var extensionPointToAddTo = addedExtension.getExtensionPointIdentifier ();
var extPoint = this.registryObjects.getExtensionPointObject (extensionPointToAddTo);
if (extPoint == null) {
this.registryObjects.addOrphan (extensionPointToAddTo, extension);
return null;
}var newExtensions;
var existingExtensions = extPoint.getRawChildren ();
newExtensions =  Clazz.newArray (existingExtensions.length + 1, 0);
System.arraycopy (existingExtensions, 0, newExtensions, 0, existingExtensions.length);
newExtensions[newExtensions.length - 1] = extension;
this.link (extPoint, newExtensions);
return this.recordChange (extPoint, extension, 1);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "addExtensionPoint", 
($fz = function (extPoint) {
var extensionPoint = this.registryObjects.getObject (extPoint, 3);
var orphans = this.registryObjects.removeOrphans (extensionPoint.getUniqueIdentifier ());
if (orphans == null) return null;
this.link (extensionPoint, orphans);
return this.recordChange (extensionPoint, orphans, 1);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "addExtensionsAndExtensionPoints", 
($fz = function (element) {
var affectedNamespaces =  new java.util.HashSet ();
var extPoints = element.getExtensionPoints ();
for (var i = 0; i < extPoints.length; i++) {
var namespace = this.addExtensionPoint (extPoints[i]);
if (namespace != null) affectedNamespaces.add (namespace);
}
var extensions = element.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var namespace = this.addExtension (extensions[i]);
if (namespace != null) affectedNamespaces.add (namespace);
}
return affectedNamespaces;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.Contribution");
Clazz.defineMethod (c$, "addRegistryChangeListener", 
function (listener) {
this.addRegistryChangeListener (listener, null);
}, "org.eclipse.core.runtime.IRegistryChangeListener");
Clazz.defineMethod (c$, "addRegistryChangeListener", 
function (listener, filter) {
{
this.listeners.add (Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ExtensionRegistry.ListenerInfo, this, null, listener, filter));
}}, "org.eclipse.core.runtime.IRegistryChangeListener,~S");
Clazz.defineMethod (c$, "basicAdd", 
($fz = function (element, link) {
if (element.getNamespace () == null) return ;
this.registryObjects.addContribution (element);
if (!link) return ;
var affectedNamespaces = this.addExtensionsAndExtensionPoints (element);
this.setObjectManagers (affectedNamespaces, this.registryObjects.createDelegatingObjectManager (this.registryObjects.getAssociatedObjects (element.getContributingBundle ().getBundleId ())));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.Contribution,~B");
Clazz.defineMethod (c$, "setObjectManagers", 
($fz = function (affectedNamespaces, manager) {
for (var iter = affectedNamespaces.iterator (); iter.hasNext (); ) {
this.getDelta (iter.next ()).setObjectManager (manager);
}
}, $fz.isPrivate = true, $fz), "java.util.Set,org.eclipse.core.internal.registry.IObjectManager");
Clazz.defineMethod (c$, "basicRemove", 
($fz = function (bundleId) {
var affectedNamespaces = this.removeExtensionsAndExtensionPoints (bundleId);
var associatedObjects = this.registryObjects.getAssociatedObjects (bundleId);
this.registryObjects.removeObjects (associatedObjects);
this.setObjectManagers (affectedNamespaces, this.registryObjects.createDelegatingObjectManager (associatedObjects));
this.registryObjects.removeContribution (bundleId);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "enterRead", 
function () {
this.access.enterRead ();
});
Clazz.defineMethod (c$, "exitRead", 
function () {
this.access.exitRead ();
});
Clazz.defineMethod (c$, "fireRegistryChangeEvent", 
($fz = function () {
if (this.deltas.isEmpty () || this.listeners.isEmpty ()) return ;
var tmpListeners = this.listeners.getListeners ();
var tmpDeltas =  new java.util.HashMap (this.deltas);
this.deltas.clear ();
 new org.eclipse.core.internal.registry.ExtensionRegistry.ExtensionEventDispatcherJob (tmpListeners, tmpDeltas).schedule ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getConfigurationElementsFor", 
function (extensionPointId) {
var lastdot = extensionPointId.lastIndexOf ('.');
if (lastdot == -1) return  new Array (0);
return this.getConfigurationElementsFor (extensionPointId.substring (0, lastdot), extensionPointId.substring (lastdot + 1));
}, "~S");
Clazz.defineMethod (c$, "getConfigurationElementsFor", 
function (pluginId, extensionPointSimpleId) {
var extPoint = this.getExtensionPoint (pluginId, extensionPointSimpleId);
if (extPoint == null) return  new Array (0);
return extPoint.getConfigurationElements ();
}, "~S,~S");
Clazz.defineMethod (c$, "getConfigurationElementsFor", 
function (pluginId, extensionPointName, extensionId) {
var extension = this.getExtension (pluginId, extensionPointName, extensionId);
if (extension == null) return  new Array (0);
return extension.getConfigurationElements ();
}, "~S,~S,~S");
Clazz.defineMethod (c$, "getDelta", 
($fz = function (namespace) {
var existingDelta = this.deltas.get (namespace);
if (existingDelta != null) return existingDelta;
var delta =  new org.eclipse.core.internal.registry.RegistryDelta ();
this.deltas.put (namespace, delta);
return delta;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getExtension", 
function (extensionId) {
if (extensionId == null) return null;
var lastdot = extensionId.lastIndexOf ('.');
if (lastdot == -1) return null;
var namespace = extensionId.substring (0, lastdot);
var allBundles = this.findAllBundles (namespace);
for (var i = 0; i < allBundles.length; i++) {
var extensions = this.registryObjects.getExtensionsFrom (allBundles[i].getBundleId ());
for (var j = 0; j < extensions.length; j++) {
var ext = this.registryObjects.getObject (extensions[j], 2);
if (extensionId.equals (ext.getUniqueIdentifier ()) && this.registryObjects.getExtensionPointObject (ext.getExtensionPointIdentifier ()) != null) {
return this.registryObjects.getHandle (extensions[j], 2);
}}
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getExtension", 
function (extensionPointId, extensionId) {
var lastdot = extensionPointId.lastIndexOf ('.');
if (lastdot == -1) return null;
return this.getExtension (extensionPointId.substring (0, lastdot), extensionPointId.substring (lastdot + 1), extensionId);
}, "~S,~S");
Clazz.defineMethod (c$, "getExtension", 
function (pluginId, extensionPointName, extensionId) {
var extPoint = this.getExtensionPoint (pluginId, extensionPointName);
if (extPoint != null) return extPoint.getExtension (extensionId);
return null;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "getExtensionPoint", 
function (xptUniqueId) {
return this.registryObjects.getExtensionPointHandle (xptUniqueId);
}, "~S");
Clazz.defineMethod (c$, "getExtensionPoint", 
function (elementName, xpt) {
this.access.enterRead ();
try {
return this.registryObjects.getExtensionPointHandle (elementName + '.' + xpt);
} finally {
this.access.exitRead ();
}
}, "~S,~S");
Clazz.defineMethod (c$, "getExtensionPoints", 
function () {
this.access.enterRead ();
try {
return this.registryObjects.getExtensionPointsHandles ();
} finally {
this.access.exitRead ();
}
});
Clazz.defineMethod (c$, "getExtensionPoints", 
function (namespace) {
this.access.enterRead ();
try {
var correspondingBundles = this.findAllBundles (namespace);
var result = org.eclipse.core.internal.registry.ExtensionPointHandle.EMPTY_ARRAY;
for (var i = 0; i < correspondingBundles.length; i++) {
result = org.eclipse.core.internal.registry.ExtensionRegistry.concatArrays (result, this.registryObjects.getHandles (this.registryObjects.getExtensionPointsFrom (correspondingBundles[i].getBundleId ()), 3));
}
return result;
} finally {
this.access.exitRead ();
}
}, "~S");
Clazz.defineMethod (c$, "findAllBundles", 
($fz = function (namespace) {
var correspondingHost = org.eclipse.core.runtime.Platform.getBundle (namespace);
if (correspondingHost == null) return  new Array (0);
var fragments = org.eclipse.core.runtime.Platform.getFragments (correspondingHost);
if (fragments == null) return [correspondingHost];
var result =  new Array (fragments.length + 1);
System.arraycopy (fragments, 0, result, 0, fragments.length);
result[fragments.length] = correspondingHost;
return result;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getExtensions", 
function (namespace) {
this.access.enterRead ();
try {
var correspondingBundles = this.findAllBundles (namespace);
var tmp =  new java.util.ArrayList ();
for (var i = 0; i < correspondingBundles.length; i++) {
var exts = this.registryObjects.getObjects (this.registryObjects.getExtensionsFrom (correspondingBundles[i].getBundleId ()), 2);
for (var j = 0; j < exts.length; j++) {
if (this.registryObjects.getExtensionPointObject (exts[j].getExtensionPointIdentifier ()) != null) tmp.add (this.registryObjects.getHandle (exts[j].getObjectId (), 2));
}
}
if (tmp.size () == 0) return org.eclipse.core.internal.registry.ExtensionHandle.EMPTY_ARRAY;
var result =  new Array (tmp.size ());
return tmp.toArray (result);
} finally {
this.access.exitRead ();
}
}, "~S");
Clazz.overrideMethod (c$, "getNamespaces", 
function () {
this.access.enterRead ();
try {
var namespaces = this.registryObjects.getNamespaces ();
var result =  new Array (namespaces.size ());
return namespaces.toArray (result);
} finally {
this.access.exitRead ();
}
});
Clazz.defineMethod (c$, "hasNamespace", 
function (name) {
this.access.enterRead ();
try {
return this.registryObjects.hasContribution (name);
} finally {
this.access.exitRead ();
}
}, "~N");
Clazz.defineMethod (c$, "link", 
($fz = function (extPoint, extensions) {
extPoint.setRawChildren (extensions);
this.registryObjects.add (extPoint, true);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionPoint,~A");
Clazz.defineMethod (c$, "recordChange", 
($fz = function (extPoint, extension, kind) {
if (this.listeners.isEmpty ()) return null;
var extensionDelta =  new org.eclipse.core.internal.registry.ExtensionDelta ();
extensionDelta.setExtension (extension);
extensionDelta.setExtensionPoint (extPoint.getObjectId ());
extensionDelta.setKind (kind);
this.getDelta (extPoint.getNamespace ()).addExtensionDelta (extensionDelta);
return extPoint.getNamespace ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionPoint,~N,~N");
Clazz.defineMethod (c$, "recordChange", 
($fz = function (extPoint, extensions, kind) {
if (this.listeners.isEmpty ()) return null;
if (extensions == null || extensions.length == 0) return null;
var pluginDelta = this.getDelta (extPoint.getNamespace ());
for (var i = 0; i < extensions.length; i++) {
var extensionDelta =  new org.eclipse.core.internal.registry.ExtensionDelta ();
extensionDelta.setExtension (extensions[i]);
extensionDelta.setExtensionPoint (extPoint.getObjectId ());
extensionDelta.setKind (kind);
pluginDelta.addExtensionDelta (extensionDelta);
}
return extPoint.getNamespace ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionPoint,~A,~N");
Clazz.defineMethod (c$, "remove", 
function (removedBundleId) {
this.access.enterWrite ();
try {
this.basicRemove (removedBundleId);
this.fireRegistryChangeEvent ();
} finally {
this.access.exitWrite ();
}
}, "~N");
Clazz.defineMethod (c$, "removeExtension", 
($fz = function (extensionId) {
var extension = this.registryObjects.getObject (extensionId, 2);
var xptName = extension.getExtensionPointIdentifier ();
var extPoint = this.registryObjects.getExtensionPointObject (xptName);
if (extPoint == null) {
this.registryObjects.removeOrphan (xptName, extensionId);
return null;
}var existingExtensions = extPoint.getRawChildren ();
var newExtensions = org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
if (existingExtensions.length > 1) {
if (existingExtensions.length == 1) newExtensions = org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
newExtensions =  Clazz.newArray (existingExtensions.length - 1, 0);
for (var i = 0, j = 0; i < existingExtensions.length; i++) if (existingExtensions[i] != extension.getObjectId ()) newExtensions[j++] = existingExtensions[i];

}this.link (extPoint, newExtensions);
return this.recordChange (extPoint, extension.getObjectId (), 2);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "removeExtensionPoint", 
($fz = function (extPoint) {
var extensionPoint = this.registryObjects.getObject (extPoint, 3);
var existingExtensions = extensionPoint.getRawChildren ();
if (existingExtensions == null || existingExtensions.length == 0) {
return null;
}this.registryObjects.addOrphans (extensionPoint.getUniqueIdentifier (), existingExtensions);
this.link (extensionPoint, org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY);
return this.recordChange (extensionPoint, existingExtensions, 2);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "removeExtensionsAndExtensionPoints", 
($fz = function (bundleId) {
var affectedNamespaces =  new java.util.HashSet ();
var extensions = this.registryObjects.getExtensionsFrom (bundleId);
for (var i = 0; i < extensions.length; i++) {
var namespace = this.removeExtension (extensions[i]);
if (namespace != null) affectedNamespaces.add (namespace);
}
var extPoints = this.registryObjects.getExtensionPointsFrom (bundleId);
for (var i = 0; i < extPoints.length; i++) {
var namespace = this.removeExtensionPoint (extPoints[i]);
if (namespace != null) affectedNamespaces.add (namespace);
}
return affectedNamespaces;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "removeRegistryChangeListener", 
function (listener) {
{
this.listeners.remove (Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ExtensionRegistry.ListenerInfo, this, null, listener, null));
}}, "org.eclipse.core.runtime.IRegistryChangeListener");
Clazz.makeConstructor (c$, 
function () {
var fromCache = false;
this.registryObjects =  new org.eclipse.core.internal.registry.RegistryObjectManager ();
if (!"true".equals (System.getProperty ("eclipse.noRegistryCache"))) {
var start = 0;
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG) start = System.currentTimeMillis ();
var cacheFile = null;
try {
this.currentFileManager = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRuntimeFileManager ();
cacheFile = this.currentFileManager.lookup (".table", false);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (cacheFile == null || !cacheFile.isFile ()) {
var currentLocation = org.eclipse.core.runtime.Platform.getConfigurationLocation ();
var parentLocation = null;
if (currentLocation != null && (parentLocation = currentLocation.getParentLocation ()) != null) {
try {
this.currentFileManager =  new org.eclipse.core.runtime.adaptor.FileManager ( new java.io.File (parentLocation.getURL ().getFile () + '/' + "org.eclipse.core.runtime"), null, true);
this.currentFileManager.open (false);
cacheFile = this.currentFileManager.lookup (".table", false);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}if (cacheFile != null && cacheFile.isFile ()) {
org.eclipse.core.internal.registry.TableReader.setTableFile (cacheFile);
try {
org.eclipse.core.internal.registry.TableReader.setExtraDataFile (this.currentFileManager.lookup (".extraData", false));
org.eclipse.core.internal.registry.TableReader.setMainDataFile (this.currentFileManager.lookup (".mainData", false));
org.eclipse.core.internal.registry.TableReader.setContributionsFile (this.currentFileManager.lookup (".contributions", false));
org.eclipse.core.internal.registry.TableReader.setOrphansFile (this.currentFileManager.lookup (".orphans", false));
fromCache = this.registryObjects.init (this.computeRegistryStamp ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG && fromCache) System.out.println ("Reading registry cache: " + (System.currentTimeMillis () - start));
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY) {
if (!fromCache) System.out.println ("Reloading registry from manifest files...");
 else System.out.println ("Using registry cache...");
}}var debugOption = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/registry/debug/events/extension");
($t$ = org.eclipse.core.internal.registry.ExtensionRegistry.DEBUG = debugOption == null ? false : debugOption.equalsIgnoreCase ("true"), org.eclipse.core.internal.registry.ExtensionRegistry.prototype.DEBUG = org.eclipse.core.internal.registry.ExtensionRegistry.DEBUG, $t$);
if (org.eclipse.core.internal.registry.ExtensionRegistry.DEBUG) this.addRegistryChangeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ExtensionRegistry$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.registry, "ExtensionRegistry$1", null, org.eclipse.core.runtime.IRegistryChangeListener);
Clazz.defineMethod (c$, "registryChanged", 
function (event) {
System.out.println (event);
}, "org.eclipse.core.runtime.IRegistryChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ExtensionRegistry$1, i$, v$);
}) (this, null));
this.pluginBundleListener =  new org.eclipse.core.internal.registry.EclipseBundleListener (this);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().addBundleListener (this.pluginBundleListener);
if (!fromCache) this.pluginBundleListener.processBundles (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getBundles ());
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().registerService (org.eclipse.core.runtime.IExtensionRegistry.getName (), this,  new java.util.Hashtable ());
});
Clazz.defineMethod (c$, "stop", 
function () {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().removeBundleListener (this.pluginBundleListener);
if (!this.registryObjects.isDirty ()) return ;
if (this.currentFileManager == null) return ;
if (this.currentFileManager.isReadOnly ()) {
if (this.currentFileManager !== org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRuntimeFileManager ()) this.currentFileManager.close ();
return ;
}var tableFile = null;
var mainFile = null;
var extraFile = null;
var contributionsFile = null;
var orphansFile = null;
try {
this.currentFileManager.lookup (".table", true);
this.currentFileManager.lookup (".mainData", true);
this.currentFileManager.lookup (".extraData", true);
this.currentFileManager.lookup (".contributions", true);
this.currentFileManager.lookup (".orphans", true);
tableFile = java.io.File.createTempFile (".table", ".new", this.currentFileManager.getBase ());
mainFile = java.io.File.createTempFile (".mainData", ".new", this.currentFileManager.getBase ());
extraFile = java.io.File.createTempFile (".extraData", ".new", this.currentFileManager.getBase ());
contributionsFile = java.io.File.createTempFile (".contributions", ".new", this.currentFileManager.getBase ());
orphansFile = java.io.File.createTempFile (".orphans", ".new", this.currentFileManager.getBase ());
org.eclipse.core.internal.registry.TableWriter.setTableFile (tableFile);
org.eclipse.core.internal.registry.TableWriter.setExtraDataFile (extraFile);
org.eclipse.core.internal.registry.TableWriter.setMainDataFile (mainFile);
org.eclipse.core.internal.registry.TableWriter.setContributionsFile (contributionsFile);
org.eclipse.core.internal.registry.TableWriter.setOrphansFile (orphansFile);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return ;
} else {
throw e;
}
}
try {
if ( new org.eclipse.core.internal.registry.TableWriter ().saveCache (this.registryObjects, this.computeRegistryStamp ())) this.currentFileManager.update ([".table", ".mainData", ".extraData", ".contributions", ".orphans"], [tableFile.getName (), mainFile.getName (), extraFile.getName (), contributionsFile.getName (), orphansFile.getName ()]);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.currentFileManager !== org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRuntimeFileManager ()) this.currentFileManager.close ();
});
Clazz.defineMethod (c$, "clearRegistryCache", 
function () {
var keys = [".table", ".mainData", ".extraData", ".contributions", ".orphans"];
for (var i = 0; i < keys.length; i++) try {
this.currentFileManager.remove (keys[i]);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems, e));
} else {
throw e;
}
}

});
Clazz.defineMethod (c$, "computeRegistryStamp", 
($fz = function () {
if (!"true".equalsIgnoreCase (System.getProperty ("osgi.checkConfiguration"))) return 0;
var allBundles = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getBundles ();
var result = 0;
for (var i = 0; i < allBundles.length; i++) {
var pluginManifest = allBundles[i].getEntry ("plugin.xml");
if (pluginManifest == null) pluginManifest = allBundles[i].getEntry ("fragment.xml");
if (pluginManifest == null) continue ;try {
var connection = pluginManifest.openConnection ();
result ^= connection.getLastModified () + allBundles[i].getBundleId ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return 0;
} else {
throw e;
}
}
}
return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"DEBUG", false,
"OPTION_DEBUG_EVENTS_EXTENSION", "org.eclipse.core.runtime/registry/debug/events/extension");
});
