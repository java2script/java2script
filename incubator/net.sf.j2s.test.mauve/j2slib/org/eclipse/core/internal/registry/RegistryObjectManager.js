Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.IObjectManager", "$.KeyedHashSet"], "org.eclipse.core.internal.registry.RegistryObjectManager", ["java.lang.Long", "java.lang.ref.SoftReference", "java.util.HashMap", "$.HashSet", "org.eclipse.core.internal.registry.ConfigurationElement", "$.ConfigurationElementHandle", "$.Extension", "$.ExtensionHandle", "$.ExtensionPoint", "$.ExtensionPointHandle", "$.HashtableOfInt", "$.HashtableOfStringAndInt", "$.ReferenceMap", "$.TableReader", "$.TemporaryObjectManager", "$.ThirdLevelConfigurationElementHandle", "org.eclipse.core.runtime.InvalidRegistryObjectException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extensionPoints = null;
this.cache = null;
this.fileOffsets = null;
this.nextId = 1;
this.newContributions = null;
this.formerContributions = null;
this.orphanExtensions = null;
this.heldObjects = null;
this.$isDirty = false;
this.fromCache = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "RegistryObjectManager", null, org.eclipse.core.internal.registry.IObjectManager);
Clazz.prepareFields (c$, function () {
this.heldObjects =  new org.eclipse.core.internal.registry.KeyedHashSet ();
});
Clazz.makeConstructor (c$, 
function () {
this.extensionPoints =  new org.eclipse.core.internal.registry.HashtableOfStringAndInt ();
if ("true".equalsIgnoreCase (System.getProperty ("eclipse.noRegistryFlushing"))) {
this.cache =  new org.eclipse.core.internal.registry.ReferenceMap (0, 512, 0.75);
} else {
this.cache =  new org.eclipse.core.internal.registry.ReferenceMap (1, 512, 0.75);
}this.newContributions =  new org.eclipse.core.internal.registry.KeyedHashSet ();
this.fileOffsets =  new org.eclipse.core.internal.registry.HashtableOfInt ();
});
Clazz.defineMethod (c$, "init", 
function (timeStamp) {
var reader =  new org.eclipse.core.internal.registry.TableReader ();
var results = reader.loadTables (timeStamp);
if (results == null) {
return false;
}this.fileOffsets = results[0];
this.extensionPoints = results[1];
this.nextId = (results[2]).intValue ();
this.fromCache = true;
if ("true".equalsIgnoreCase (System.getProperty ("eclipse.noLazyRegistryCacheLoading"))) {
reader.setHoldObjects (true);
this.markOrphansHasDirty (this.getOrphans ());
this.fromCache = reader.readAllCache (this);
this.formerContributions = this.getFormerContributions ();
}return this.fromCache;
}, "~N");
Clazz.defineMethod (c$, "addContribution", 
function (contribution) {
this.$isDirty = true;
this.newContributions.add (contribution);
}, "org.eclipse.core.internal.registry.Contribution");
Clazz.defineMethod (c$, "getExtensionPointsFrom", 
function (id) {
var tmp = this.newContributions.getByKey ( new Long (id));
if (tmp == null) tmp = this.getFormerContributions ().getByKey ( new Long (id));
if (tmp == null) return org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
return (tmp).getExtensionPoints ();
}, "~N");
Clazz.defineMethod (c$, "getNamespaces", 
function () {
var formerElts = this.getFormerContributions ().elements ();
var newElts = this.newContributions.elements ();
var tmp =  new java.util.HashSet (formerElts.length + newElts.length);
for (var i = 0; i < formerElts.length; i++) {
tmp.add ((formerElts[i]).getNamespace ());
}
for (var i = 0; i < newElts.length; i++) {
tmp.add ((newElts[i]).getNamespace ());
}
return tmp;
});
Clazz.defineMethod (c$, "hasContribution", 
function (id) {
var result = this.newContributions.getByKey ( new Long (id));
if (result == null) result = this.getFormerContributions ().getByKey ( new Long (id));
return result != null;
}, "~N");
Clazz.defineMethod (c$, "getFormerContributions", 
($fz = function () {
var result;
if (this.fromCache == false) return  new org.eclipse.core.internal.registry.KeyedHashSet (0);
if (this.formerContributions == null || (result = (((Clazz.instanceOf (this.formerContributions, java.lang.ref.SoftReference)) ? (this.formerContributions).get () : this.formerContributions))) == null) {
var reader =  new org.eclipse.core.internal.registry.TableReader ();
result = reader.loadNamespaces ();
this.formerContributions =  new java.lang.ref.SoftReference (result);
}return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "add", 
function (registryObject, hold) {
if (registryObject.getObjectId () == org.eclipse.core.internal.registry.RegistryObjectManager.UNKNOWN) {
var id = this.nextId++;
registryObject.setObjectId (id);
}this.cache.put (registryObject.getObjectId (), registryObject);
if (hold) this.hold (registryObject);
}, "org.eclipse.core.internal.registry.RegistryObject,~B");
Clazz.defineMethod (c$, "remove", 
($fz = function (registryObject, release) {
this.cache.remove (registryObject.getObjectId ());
if (release) this.release (registryObject);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObject,~B");
Clazz.defineMethod (c$, "remove", 
function (id, release) {
var toRemove = this.cache.get (id);
if (this.fileOffsets != null) this.fileOffsets.removeKey (id);
if (toRemove != null) this.remove (toRemove, release);
}, "~N,~B");
Clazz.defineMethod (c$, "hold", 
($fz = function (toHold) {
this.heldObjects.add (toHold);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObject");
Clazz.defineMethod (c$, "release", 
($fz = function (toRelease) {
this.heldObjects.remove (toRelease);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObject");
Clazz.overrideMethod (c$, "getObject", 
function (id, type) {
return this.basicGetObject (id, type);
}, "~N,~N");
Clazz.defineMethod (c$, "basicGetObject", 
($fz = function (id, type) {
var result = this.cache.get (id);
if (result != null) return result;
if (this.fromCache) result = this.load (id, type);
if (result == null) throw  new org.eclipse.core.runtime.InvalidRegistryObjectException ();
this.cache.put (id, result);
return result;
}, $fz.isPrivate = true, $fz), "~N,~N");
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
results[i] = this.basicGetObject (values[i], type);
}
return results;
}, "~A,~N");
Clazz.defineMethod (c$, "getExtensionPointObject", 
function (xptUniqueId) {
var id;
if ((id = this.extensionPoints.get (xptUniqueId)) == -2147483648) return null;
return this.getObject (id, 3);
}, "~S");
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
Clazz.defineMethod (c$, "getExtensionPointsHandles", 
function () {
return this.getHandles (this.extensionPoints.getValues (), 3);
});
Clazz.defineMethod (c$, "getExtensionPointHandle", 
function (xptUniqueId) {
var id = this.extensionPoints.get (xptUniqueId);
if (id == -2147483648) return null;
return this.getHandle (id, 3);
}, "~S");
Clazz.defineMethod (c$, "load", 
($fz = function (id, type) {
var reader =  new org.eclipse.core.internal.registry.TableReader ();
var offset = this.fileOffsets.get (id);
if (offset == -2147483648) return null;
switch (type) {
case 1:
return reader.loadConfigurationElement (offset);
case 4:
return reader.loadThirdLevelConfigurationElements (offset, this);
case 2:
return reader.loadExtension (offset);
case 3:
default:
return reader.loadExtensionPointTree (offset, this);
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getExtensionsFrom", 
function (bundleId) {
var tmp = this.newContributions.getByKey ( new Long (bundleId));
if (tmp == null) tmp = this.getFormerContributions ().getByKey ( new Long (bundleId));
if (tmp == null) return org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
return (tmp).getExtensions ();
}, "~N");
Clazz.defineMethod (c$, "addExtensionPoint", 
function (currentExtPoint, hold) {
this.add (currentExtPoint, hold);
this.extensionPoints.put (currentExtPoint.getUniqueIdentifier (), currentExtPoint.getObjectId ());
}, "org.eclipse.core.internal.registry.ExtensionPoint,~B");
Clazz.defineMethod (c$, "removeExtensionPoint", 
function (extensionPointId) {
var pointId = this.extensionPoints.removeKey (extensionPointId);
if (pointId == -2147483648) return ;
this.remove (pointId, true);
}, "~S");
Clazz.defineMethod (c$, "isDirty", 
function () {
return this.$isDirty;
});
Clazz.defineMethod (c$, "removeContribution", 
function (bundleId) {
var removed = this.newContributions.removeByKey ( new Long (bundleId));
if (removed == false) {
removed = this.getFormerContributions ().removeByKey ( new Long (bundleId));
if (removed) this.formerContributions = this.getFormerContributions ();
}if (removed) {
this.$isDirty = true;
return ;
}}, "~N");
Clazz.defineMethod (c$, "getOrphans", 
($fz = function () {
var result = this.orphanExtensions;
if (this.orphanExtensions == null && !this.fromCache) {
result =  new java.util.HashMap ();
this.orphanExtensions = result;
} else if (this.orphanExtensions == null || (result = (((Clazz.instanceOf (this.orphanExtensions, java.lang.ref.SoftReference)) ? (this.orphanExtensions).get () : this.orphanExtensions))) == null) {
var reader =  new org.eclipse.core.internal.registry.TableReader ();
result = reader.loadOrphans ();
this.orphanExtensions =  new java.lang.ref.SoftReference (result);
}return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addOrphans", 
function (extensionPoint, extensions) {
var orphans = this.getOrphans ();
var existingOrphanExtensions = orphans.get (extensionPoint);
if (existingOrphanExtensions != null) {
var newOrphanExtensions =  Clazz.newArray (existingOrphanExtensions.length + extensions.length, 0);
System.arraycopy (existingOrphanExtensions, 0, newOrphanExtensions, 0, existingOrphanExtensions.length);
System.arraycopy (extensions, 0, newOrphanExtensions, existingOrphanExtensions.length, extensions.length);
orphans.put (extensionPoint, newOrphanExtensions);
} else {
orphans.put (extensionPoint, extensions);
}this.markOrphansHasDirty (orphans);
}, "~S,~A");
Clazz.defineMethod (c$, "markOrphansHasDirty", 
function (orphans) {
this.orphanExtensions = orphans;
}, "java.util.Map");
Clazz.defineMethod (c$, "addOrphan", 
function (extensionPoint, extension) {
var orphans = this.getOrphans ();
var existingOrphanExtensions = orphans.get (extensionPoint);
if (existingOrphanExtensions != null) {
var newOrphanExtensions =  Clazz.newArray (existingOrphanExtensions.length + 1, 0);
System.arraycopy (existingOrphanExtensions, 0, newOrphanExtensions, 0, existingOrphanExtensions.length);
newOrphanExtensions[existingOrphanExtensions.length] = extension;
orphans.put (extensionPoint, newOrphanExtensions);
} else {
orphans.put (extensionPoint, [extension]);
}this.markOrphansHasDirty (orphans);
}, "~S,~N");
Clazz.defineMethod (c$, "removeOrphans", 
function (extensionPoint) {
var orphans = this.getOrphans ();
var existingOrphanExtensions = orphans.remove (extensionPoint);
if (existingOrphanExtensions != null) {
this.markOrphansHasDirty (orphans);
}return existingOrphanExtensions;
}, "~S");
Clazz.defineMethod (c$, "removeOrphan", 
function (extensionPoint, extension) {
var orphans = this.getOrphans ();
var existingOrphanExtensions = orphans.get (extensionPoint);
if (existingOrphanExtensions == null) return ;
this.markOrphansHasDirty (orphans);
var newSize = existingOrphanExtensions.length - 1;
if (newSize == 0) {
orphans.remove (extensionPoint);
return ;
}var newOrphanExtensions =  Clazz.newArray (existingOrphanExtensions.length - 1, 0);
for (var i = 0, j = 0; i < existingOrphanExtensions.length; i++) if (extension != existingOrphanExtensions[i]) newOrphanExtensions[j++] = existingOrphanExtensions[i];

orphans.put (extensionPoint, newOrphanExtensions);
return ;
}, "~S,~N");
Clazz.defineMethod (c$, "getOrphanExtensions", 
function () {
return this.getOrphans ();
});
Clazz.defineMethod (c$, "getNextId", 
function () {
return this.nextId;
});
Clazz.defineMethod (c$, "getExtensionPoints", 
function () {
return this.extensionPoints;
});
Clazz.defineMethod (c$, "getContributions", 
function () {
return [this.newContributions, this.getFormerContributions ()];
});
Clazz.defineMethod (c$, "getAssociatedObjects", 
function (contributionId) {
var xpts = this.getExtensionPointsFrom (contributionId);
var exts = this.getExtensionsFrom (contributionId);
var actualObjects =  new java.util.HashMap (xpts.length + exts.length);
for (var i = 0; i < exts.length; i++) {
var tmp = this.basicGetObject (exts[i], 2);
actualObjects.put ( new Integer (exts[i]), tmp);
this.collectChildren (tmp, 0, actualObjects);
}
for (var i = 0; i < xpts.length; i++) {
var xpt = this.basicGetObject (xpts[i], 3);
actualObjects.put ( new Integer (xpts[i]), xpt);
}
return actualObjects;
}, "~N");
Clazz.defineMethod (c$, "removeObjects", 
function (associatedObjects) {
var allValues = associatedObjects.values ();
for (var iter = allValues.iterator (); iter.hasNext (); ) {
var toRemove = iter.next ();
this.remove ((toRemove).getObjectId (), true);
if (Clazz.instanceOf (toRemove, org.eclipse.core.internal.registry.ExtensionPoint)) this.removeExtensionPoint ((toRemove).getUniqueIdentifier ());
}
}, "java.util.Map");
Clazz.defineMethod (c$, "createDelegatingObjectManager", 
function (object) {
return  new org.eclipse.core.internal.registry.TemporaryObjectManager (object, this);
}, "java.util.Map");
Clazz.defineMethod (c$, "collectChildren", 
($fz = function (ce, level, collector) {
var children = this.getObjects (ce.getRawChildren (), level == 0 || ce.extraDataOffset == -1 ? 1 : 4);
for (var j = 0; j < children.length; j++) {
collector.put ( new Integer (children[j].getObjectId ()), children[j]);
this.collectChildren (children[j], level + 1, collector);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObject,~N,java.util.Map");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.defineStatics (c$,
"CONFIGURATION_ELEMENT", 1,
"EXTENSION", 2,
"EXTENSION_POINT", 3,
"THIRDLEVEL_CONFIGURATION_ELEMENT", 4,
"CACHE_INITIAL_SIZE", 512,
"DEFAULT_LOADFACTOR", 0.75,
"EMPTY_INT_ARRAY",  Clazz.newArray (0, 0));
c$.EMPTY_STRING_ARRAY = c$.prototype.EMPTY_STRING_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"UNKNOWN", -1);
});
