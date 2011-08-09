Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (null, "org.eclipse.core.internal.registry.TableReader", ["java.io.BufferedInputStream", "$.DataInputStream", "$.FileInputStream", "java.lang.IllegalStateException", "$.Long", "java.util.HashMap", "org.eclipse.core.internal.registry.ConfigurationElement", "$.Contribution", "$.Extension", "$.ExtensionPoint", "$.HashtableOfInt", "$.HashtableOfStringAndInt", "$.KeyedHashSet", "$.RegistryObjectManager", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mainInput = null;
this.extraInput = null;
this.holdObjects = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "TableReader");
c$.setMainDataFile = Clazz.defineMethod (c$, "setMainDataFile", 
function (main) {
($t$ = org.eclipse.core.internal.registry.TableReader.mainDataFile = main, org.eclipse.core.internal.registry.TableReader.prototype.mainDataFile = org.eclipse.core.internal.registry.TableReader.mainDataFile, $t$);
}, "java.io.File");
c$.setExtraDataFile = Clazz.defineMethod (c$, "setExtraDataFile", 
function (extra) {
($t$ = org.eclipse.core.internal.registry.TableReader.extraDataFile = extra, org.eclipse.core.internal.registry.TableReader.prototype.extraDataFile = org.eclipse.core.internal.registry.TableReader.extraDataFile, $t$);
}, "java.io.File");
c$.setTableFile = Clazz.defineMethod (c$, "setTableFile", 
function (table) {
($t$ = org.eclipse.core.internal.registry.TableReader.tableFile = table, org.eclipse.core.internal.registry.TableReader.prototype.tableFile = org.eclipse.core.internal.registry.TableReader.tableFile, $t$);
}, "java.io.File");
c$.setContributionsFile = Clazz.defineMethod (c$, "setContributionsFile", 
function (namespace) {
($t$ = org.eclipse.core.internal.registry.TableReader.contributionsFile = namespace, org.eclipse.core.internal.registry.TableReader.prototype.contributionsFile = org.eclipse.core.internal.registry.TableReader.contributionsFile, $t$);
}, "java.io.File");
c$.setOrphansFile = Clazz.defineMethod (c$, "setOrphansFile", 
function (orphan) {
($t$ = org.eclipse.core.internal.registry.TableReader.orphansFile = orphan, org.eclipse.core.internal.registry.TableReader.prototype.orphansFile = org.eclipse.core.internal.registry.TableReader.orphansFile, $t$);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function () {
this.openInputFile ();
this.openExtraFile ();
});
Clazz.defineMethod (c$, "openInputFile", 
($fz = function () {
try {
this.mainInput =  new java.io.DataInputStream ( new java.io.BufferedInputStream ( new java.io.FileInputStream (org.eclipse.core.internal.registry.TableReader.mainDataFile)));
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_unableToReadCache, e));
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().clearRegistryCache ();
throw  new IllegalStateException (org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "openExtraFile", 
($fz = function () {
try {
this.extraInput =  new java.io.DataInputStream ( new java.io.BufferedInputStream ( new java.io.FileInputStream (org.eclipse.core.internal.registry.TableReader.extraDataFile)));
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_unableToReadCache, e));
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().clearRegistryCache ();
throw  new IllegalStateException (org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "closeInputFile", 
($fz = function () {
try {
this.mainInput.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems, e));
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "closeExtraFile", 
($fz = function () {
try {
this.extraInput.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems, e));
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadTables", 
function (expectedTimestamp) {
var offsets;
var extensionPoints;
var tableInput = null;
try {
tableInput =  new java.io.DataInputStream ( new java.io.BufferedInputStream ( new java.io.FileInputStream (org.eclipse.core.internal.registry.TableReader.tableFile)));
if (!this.checkCacheValidity (tableInput, expectedTimestamp)) return null;
var nextId =  new Integer (tableInput.readInt ());
offsets =  new org.eclipse.core.internal.registry.HashtableOfInt ();
offsets.load (tableInput);
extensionPoints =  new org.eclipse.core.internal.registry.HashtableOfStringAndInt ();
extensionPoints.load (tableInput);
return [offsets, extensionPoints, nextId];
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (tableInput != null) try {
tableInput.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheReadProblems, e));
return null;
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "checkCacheValidity", 
($fz = function ($in, expectedTimestamp) {
var version;
try {
version = $in.readInt ();
if (version != 1) return false;
var installStamp = $in.readLong ();
var registryStamp = $in.readLong ();
var mainDataFileSize = $in.readLong ();
var extraDataFileSize = $in.readLong ();
var contributionsFileSize = $in.readLong ();
var orphansFileSize = $in.readLong ();
var osStamp = $in.readUTF ();
var windowsStamp = $in.readUTF ();
var localeStamp = $in.readUTF ();
var info = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ();
return ((expectedTimestamp == 0 || expectedTimestamp == registryStamp) && (installStamp == info.getStateTimeStamp ()) && (osStamp.equals (info.getOS ())) && (windowsStamp.equals (info.getWS ())) && (localeStamp.equals (info.getNL ())) && mainDataFileSize == org.eclipse.core.internal.registry.TableReader.mainDataFile.length () && extraDataFileSize == org.eclipse.core.internal.registry.TableReader.extraDataFile.length () && contributionsFileSize == org.eclipse.core.internal.registry.TableReader.contributionsFile.length () && orphansFileSize == org.eclipse.core.internal.registry.TableReader.orphansFile.length ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheInconsistent, e));
return false;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "loadConfigurationElement", 
function (offset) {
try {
this.goToInputFile (offset);
return this.basicLoadConfigurationElement (this.mainInput, null);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.mainDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading a configuration element (" + offset + ") from the registry cache", e));
return null;
} else {
throw e;
}
} finally {
this.closeInputFile ();
this.closeExtraFile ();
}
}, "~N");
Clazz.defineMethod (c$, "basicLoadConfigurationElement", 
($fz = function (is, actualContributingBundle) {
var self = is.readInt ();
var contributingBundle = is.readLong ();
var name = this.readStringOrNull (is, false);
var parentId = is.readInt ();
var parentType = is.readByte ();
var misc = is.readInt ();
var propertiesAndValue = this.readPropertiesAndValue (is);
var children = this.readArray (is);
if (actualContributingBundle == null) actualContributingBundle = this.getBundle (contributingBundle);
return  new org.eclipse.core.internal.registry.ConfigurationElement (self, actualContributingBundle, name, propertiesAndValue, children, misc, parentId, parentType);
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "loadThirdLevelConfigurationElements", 
function (offset, objectManager) {
try {
this.goToExtraFile (offset);
return this.loadConfigurationElementAndChildren (null, this.extraInput, 3, 2147483647, objectManager, null);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.extraDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading a third level configuration element (" + offset + ") from the registry cache", e));
return null;
} else {
throw e;
}
} finally {
this.closeInputFile ();
this.closeExtraFile ();
}
}, "~N,org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "loadConfigurationElementAndChildren", 
($fz = function (is, extraIs, depth, maxDepth, objectManager, actualContributingBundle) {
var currentStream = is;
if (depth > 2) currentStream = extraIs;
var ce = this.basicLoadConfigurationElement (currentStream, actualContributingBundle);
if (actualContributingBundle == null) actualContributingBundle = ce.getContributingBundle ();
var children = ce.getRawChildren ();
if (depth + 1 > maxDepth) return ce;
for (var i = 0; i < children.length; i++) {
var tmp = this.loadConfigurationElementAndChildren (currentStream, extraIs, depth + 1, maxDepth, objectManager, actualContributingBundle);
objectManager.add (tmp, this.holdObjects);
}
return ce;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,java.io.DataInputStream,~N,~N,org.eclipse.core.internal.registry.RegistryObjectManager,org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "readPropertiesAndValue", 
($fz = function (inputStream) {
var numberOfProperties = inputStream.readInt ();
if (numberOfProperties == 0) return org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_STRING_ARRAY;
var properties =  new Array (numberOfProperties);
for (var i = 0; i < numberOfProperties; i++) {
properties[i] = this.readStringOrNull (inputStream, false);
}
return properties;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "loadExtension", 
function (offset) {
try {
this.goToInputFile (offset);
return this.basicLoadExtension (this.mainInput);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.mainDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading an extension (" + offset + ") from the registry cache", e));
} else {
throw e;
}
} finally {
this.closeExtraFile ();
this.closeInputFile ();
}
return null;
}, "~N");
Clazz.defineMethod (c$, "getBundle", 
($fz = function (id) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getBundle (id);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "basicLoadExtension", 
($fz = function (inputStream) {
var self = inputStream.readInt ();
var simpleId = this.readStringOrNull (this.mainInput, false);
var namespace = this.readStringOrNull (this.mainInput, false);
var children = this.readArray (this.mainInput);
var extraData = this.mainInput.readInt ();
return  new org.eclipse.core.internal.registry.Extension (self, simpleId, namespace, children, extraData);
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "loadExtensionPointTree", 
function (offset, objects) {
try {
var xpt = this.loadExtensionPoint (offset);
var children = xpt.getRawChildren ();
var nbrOfExtension = children.length;
for (var i = 0; i < nbrOfExtension; i++) {
var loaded = this.basicLoadExtension (this.mainInput);
objects.add (loaded, this.holdObjects);
}
for (var i = 0; i < nbrOfExtension; i++) {
var nbrOfCe = this.mainInput.readInt ();
for (var j = 0; j < nbrOfCe; j++) {
objects.add (this.loadConfigurationElementAndChildren (this.mainInput, this.extraInput, 1, 2, objects, null), this.holdObjects);
}
}
return xpt;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.mainDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading an extension point tree (" + offset + ") from the registry cache", e));
return null;
} else {
throw e;
}
} finally {
this.closeExtraFile ();
this.closeInputFile ();
}
}, "~N,org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "loadExtensionPoint", 
($fz = function (offset) {
try {
this.goToInputFile (offset);
return this.basicLoadExtensionPoint ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.mainDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading an extension point (" + offset + ") from the registry cache", e));
return null;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "basicLoadExtensionPoint", 
($fz = function () {
var self = this.mainInput.readInt ();
var children = this.readArray (this.mainInput);
var extraData = this.mainInput.readInt ();
return  new org.eclipse.core.internal.registry.ExtensionPoint (self, children, extraData);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readArray", 
($fz = function ($in) {
var arraySize = $in.readInt ();
if (arraySize == 0) return org.eclipse.core.internal.registry.RegistryObjectManager.EMPTY_INT_ARRAY;
var result =  Clazz.newArray (arraySize, 0);
for (var i = 0; i < arraySize; i++) {
result[i] = $in.readInt ();
}
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "goToInputFile", 
($fz = function (offset) {
this.mainInput.skipBytes (offset);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "goToExtraFile", 
($fz = function (offset) {
this.extraInput.skipBytes (offset);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "readStringOrNull", 
($fz = function ($in, intern) {
var type = $in.readByte ();
if (type == 0) return null;
if (intern) return $in.readUTF ().intern ();
return $in.readUTF ();
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,~B");
Clazz.defineMethod (c$, "loadExtensionExtraData", 
function (dataPosition) {
try {
this.goToExtraFile (dataPosition);
return this.basicLoadExtensionExtraData ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.extraDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading extension label (" + dataPosition + ") from the registry cache", e));
return null;
} else {
throw e;
}
} finally {
this.closeExtraFile ();
this.closeInputFile ();
}
}, "~N");
Clazz.defineMethod (c$, "basicLoadExtensionExtraData", 
($fz = function () {
return [this.readStringOrNull (this.extraInput, false), this.readStringOrNull (this.extraInput, false)];
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadExtensionPointExtraData", 
function (offset) {
try {
this.goToExtraFile (offset);
return this.basicLoadExtensionPointExtraData ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.extraDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
if (false) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, "Error reading extension point data (" + offset + ") from the resgistry cache", e));
return null;
} else {
throw e;
}
} finally {
this.closeExtraFile ();
this.closeInputFile ();
}
}, "~N");
Clazz.defineMethod (c$, "basicLoadExtensionPointExtraData", 
($fz = function () {
var result =  new Array (5);
result[0] = this.readStringOrNull (this.extraInput, false);
result[1] = this.readStringOrNull (this.extraInput, false);
result[2] = this.readStringOrNull (this.extraInput, false);
result[3] = this.readStringOrNull (this.extraInput, false);
result[4] = Long.toString (this.extraInput.readLong ());
return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadNamespaces", 
function () {
var namespaceInput = null;
try {
namespaceInput =  new java.io.DataInputStream ( new java.io.BufferedInputStream ( new java.io.FileInputStream (org.eclipse.core.internal.registry.TableReader.contributionsFile)));
var size = namespaceInput.readInt ();
var result =  new org.eclipse.core.internal.registry.KeyedHashSet (size);
for (var i = 0; i < size; i++) {
var n =  new org.eclipse.core.internal.registry.Contribution (namespaceInput.readLong ());
n.setRawChildren (this.readArray (namespaceInput));
result.add (n);
}
return result;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.contributionsFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
return null;
} else {
throw e;
}
} finally {
if (namespaceInput != null) try {
namespaceInput.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
}
});
Clazz.defineMethod (c$, "loadAllOrphans", 
($fz = function (objectManager) {
var orphans = objectManager.getOrphanExtensions ().size ();
for (var k = 0; k < orphans; k++) {
var numberOfOrphanExtensions = this.mainInput.readInt ();
for (var i = 0; i < numberOfOrphanExtensions; i++) {
this.loadFullExtension (objectManager);
}
for (var i = 0; i < numberOfOrphanExtensions; i++) {
var nbrOfCe = this.mainInput.readInt ();
for (var j = 0; j < nbrOfCe; j++) {
objectManager.add (this.loadConfigurationElementAndChildren (this.mainInput, this.extraInput, 1, 2147483647, objectManager, null), true);
}
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "readAllCache", 
function (objectManager) {
try {
var size = objectManager.getExtensionPoints ().size ();
for (var i = 0; i < size; i++) {
objectManager.add (this.readAllExtensionPointTree (objectManager), this.holdObjects);
}
this.loadAllOrphans (objectManager);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_regCacheIOExceptionReading, org.eclipse.core.internal.registry.TableReader.mainDataFile);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
return false;
} else {
throw e;
}
} finally {
this.closeExtraFile ();
this.closeInputFile ();
}
return true;
}, "org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "readAllExtensionPointTree", 
function (objectManager) {
var xpt = this.loadFullExtensionPoint ();
var children = xpt.getRawChildren ();
var nbrOfExtension = children.length;
for (var i = 0; i < nbrOfExtension; i++) {
this.loadFullExtension (objectManager);
}
for (var i = 0; i < nbrOfExtension; i++) {
var nbrOfCe = this.mainInput.readInt ();
for (var j = 0; j < nbrOfCe; j++) {
objectManager.add (this.loadConfigurationElementAndChildren (this.mainInput, this.extraInput, 1, 2147483647, objectManager, null), true);
}
}
return xpt;
}, "org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "loadFullExtensionPoint", 
($fz = function () {
var xpt = this.basicLoadExtensionPoint ();
var tmp = this.basicLoadExtensionPointExtraData ();
xpt.setLabel (tmp[0]);
xpt.setSchema (tmp[1]);
xpt.setUniqueIdentifier (tmp[2]);
xpt.setNamespace (tmp[3]);
xpt.setBundleId (Long.parseLong (tmp[4]));
return xpt;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadFullExtension", 
($fz = function (objectManager) {
var tmp;
var loaded = this.basicLoadExtension (this.mainInput);
tmp = this.basicLoadExtensionExtraData ();
loaded.setLabel (tmp[0]);
loaded.setExtensionPointIdentifier (tmp[1]);
objectManager.add (loaded, this.holdObjects);
return loaded;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineMethod (c$, "loadOrphans", 
function () {
var orphanInput = null;
try {
orphanInput =  new java.io.DataInputStream ( new java.io.BufferedInputStream ( new java.io.FileInputStream (org.eclipse.core.internal.registry.TableReader.orphansFile)));
var size = orphanInput.readInt ();
var result =  new java.util.HashMap (size);
for (var i = 0; i < size; i++) {
var key = orphanInput.readUTF ();
var value = this.readArray (orphanInput);
result.put (key, value);
}
return result;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
} finally {
if (orphanInput != null) try {
orphanInput.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
}
});
Clazz.defineMethod (c$, "setHoldObjects", 
function (holdObjects) {
this.holdObjects = holdObjects;
}, "~B");
Clazz.defineStatics (c$,
"NULL", 0,
"OBJECT", 1,
"CACHE_VERSION", 1,
"MAIN", ".mainData",
"mainDataFile", null,
"EXTRA", ".extraData",
"extraDataFile", null,
"TABLE", ".table",
"tableFile", null,
"CONTRIBUTIONS", ".contributions",
"contributionsFile", null,
"ORPHANS", ".orphans",
"orphansFile", null,
"fileError", 0,
"DEBUG", false);
});
