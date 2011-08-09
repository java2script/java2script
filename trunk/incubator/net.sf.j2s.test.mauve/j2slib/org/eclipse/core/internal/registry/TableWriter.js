Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (null, "org.eclipse.core.internal.registry.TableWriter", ["java.io.BufferedOutputStream", "$.DataOutputStream", "$.FileOutputStream", "org.eclipse.core.internal.registry.HashtableOfInt", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mainOutput = null;
this.extraOutput = null;
this.mainFileOutput = null;
this.extraFileOutput = null;
this.offsets = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "TableWriter");
c$.setMainDataFile = Clazz.defineMethod (c$, "setMainDataFile", 
function (main) {
($t$ = org.eclipse.core.internal.registry.TableWriter.mainDataFile = main, org.eclipse.core.internal.registry.TableWriter.prototype.mainDataFile = org.eclipse.core.internal.registry.TableWriter.mainDataFile, $t$);
}, "java.io.File");
c$.setExtraDataFile = Clazz.defineMethod (c$, "setExtraDataFile", 
function (extra) {
($t$ = org.eclipse.core.internal.registry.TableWriter.extraDataFile = extra, org.eclipse.core.internal.registry.TableWriter.prototype.extraDataFile = org.eclipse.core.internal.registry.TableWriter.extraDataFile, $t$);
}, "java.io.File");
c$.setTableFile = Clazz.defineMethod (c$, "setTableFile", 
function (table) {
($t$ = org.eclipse.core.internal.registry.TableWriter.tableFile = table, org.eclipse.core.internal.registry.TableWriter.prototype.tableFile = org.eclipse.core.internal.registry.TableWriter.tableFile, $t$);
}, "java.io.File");
c$.setContributionsFile = Clazz.defineMethod (c$, "setContributionsFile", 
function (fileName) {
($t$ = org.eclipse.core.internal.registry.TableWriter.contributionsFile = fileName, org.eclipse.core.internal.registry.TableWriter.prototype.contributionsFile = org.eclipse.core.internal.registry.TableWriter.contributionsFile, $t$);
}, "java.io.File");
c$.setOrphansFile = Clazz.defineMethod (c$, "setOrphansFile", 
function (orphan) {
($t$ = org.eclipse.core.internal.registry.TableWriter.orphansFile = orphan, org.eclipse.core.internal.registry.TableWriter.prototype.orphansFile = org.eclipse.core.internal.registry.TableWriter.orphansFile, $t$);
}, "java.io.File");
Clazz.defineMethod (c$, "getExtraDataPosition", 
($fz = function () {
return this.extraOutput.size ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "saveCache", 
function (objectManager, timestamp) {
try {
if (!this.openFiles ()) return false;
try {
this.saveExtensionRegistry (objectManager, timestamp);
} catch (io) {
if (Clazz.instanceOf (io, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheWriteProblems, io));
return false;
} else {
throw io;
}
}
} finally {
this.closeFiles ();
}
return true;
}, "org.eclipse.core.internal.registry.RegistryObjectManager,~N");
Clazz.defineMethod (c$, "openFiles", 
($fz = function () {
try {
this.mainFileOutput =  new java.io.FileOutputStream (org.eclipse.core.internal.registry.TableWriter.mainDataFile);
this.mainOutput =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (this.mainFileOutput));
this.extraFileOutput =  new java.io.FileOutputStream (org.eclipse.core.internal.registry.TableWriter.extraDataFile);
this.extraOutput =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (this.extraFileOutput));
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
if (this.mainFileOutput != null) try {
this.mainFileOutput.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_unableToCreateCache, e));
return false;
} else {
throw e;
}
}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "closeFiles", 
($fz = function () {
try {
if (this.mainOutput != null) {
this.mainOutput.flush ();
if (this.mainFileOutput.getFD ().valid ()) {
this.mainFileOutput.getFD ().sync ();
}this.mainOutput.close ();
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheWriteProblems, e));
e.printStackTrace ();
} else {
throw e;
}
}
try {
if (this.extraOutput != null) {
this.extraOutput.flush ();
if (this.extraFileOutput.getFD ().valid ()) {
this.extraFileOutput.getFD ().sync ();
}this.extraOutput.close ();
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.meta_registryCacheWriteProblems, e));
e.printStackTrace ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "saveExtensionRegistry", 
($fz = function (objectManager, timestamp) {
var points = objectManager.getExtensionPointsHandles ();
this.offsets =  new org.eclipse.core.internal.registry.HashtableOfInt (objectManager.getNextId ());
for (var i = 0; i < points.length; i++) {
this.saveExtensionPoint (points[i]);
}
this.saveOrphans (objectManager);
this.saveNamespaces (objectManager.getContributions ());
this.closeFiles ();
this.saveTables (objectManager, timestamp);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObjectManager,~N");
Clazz.defineMethod (c$, "saveNamespaces", 
($fz = function (contributions) {
var fosNamespace =  new java.io.FileOutputStream (org.eclipse.core.internal.registry.TableWriter.contributionsFile);
var outputNamespace =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (fosNamespace));
var newElements = contributions[0].elements ();
var formerElements = contributions[1].elements ();
outputNamespace.writeInt (newElements.length + formerElements.length);
for (var i = 0; i < newElements.length; i++) {
var elt = newElements[i];
outputNamespace.writeLong (elt.getContributingBundle ().getBundleId ());
this.saveArray (elt.getRawChildren (), outputNamespace);
}
for (var i = 0; i < formerElements.length; i++) {
var elt = formerElements[i];
outputNamespace.writeLong (elt.getContributingBundle ().getBundleId ());
this.saveArray (elt.getRawChildren (), outputNamespace);
}
outputNamespace.flush ();
fosNamespace.getFD ().sync ();
outputNamespace.close ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "saveTables", 
($fz = function (objectManager, registryTimeStamp) {
var fosTable =  new java.io.FileOutputStream (org.eclipse.core.internal.registry.TableWriter.tableFile);
var outputTable =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (fosTable));
this.writeCacheHeader (outputTable, registryTimeStamp);
outputTable.writeInt (objectManager.getNextId ());
this.offsets.save (outputTable);
objectManager.getExtensionPoints ().save (outputTable);
outputTable.flush ();
fosTable.getFD ().sync ();
outputTable.close ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObjectManager,~N");
Clazz.defineMethod (c$, "writeCacheHeader", 
($fz = function (output, registryTimeStamp) {
output.writeInt (1);
output.writeLong (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getStateTimeStamp ());
output.writeLong (registryTimeStamp);
output.writeLong (org.eclipse.core.internal.registry.TableWriter.mainDataFile.length ());
output.writeLong (org.eclipse.core.internal.registry.TableWriter.extraDataFile.length ());
output.writeLong (org.eclipse.core.internal.registry.TableWriter.contributionsFile.length ());
output.writeLong (org.eclipse.core.internal.registry.TableWriter.orphansFile.length ());
var info = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ();
output.writeUTF (info.getOS ());
output.writeUTF (info.getWS ());
output.writeUTF (info.getNL ());
}, $fz.isPrivate = true, $fz), "java.io.DataOutputStream,~N");
Clazz.defineMethod (c$, "saveArray", 
($fz = function (array, out) {
if (array == null) {
out.writeInt (0);
return ;
}out.writeInt (array.length);
for (var i = 0; i < array.length; i++) {
out.writeInt (array[i]);
}
}, $fz.isPrivate = true, $fz), "~A,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveExtensionPoint", 
($fz = function (xpt) {
this.offsets.put (xpt.getId (), this.mainOutput.size ());
this.mainOutput.writeInt (xpt.getId ());
this.saveArray (xpt.getObject ().getRawChildren (), this.mainOutput);
this.mainOutput.writeInt (this.getExtraDataPosition ());
this.saveExtensionPointData (xpt);
this.saveExtensions (xpt.getExtensions (), this.mainOutput);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionPointHandle");
Clazz.defineMethod (c$, "saveExtension", 
($fz = function (ext, outputStream) {
this.offsets.put (ext.getId (), outputStream.size ());
outputStream.writeInt (ext.getId ());
this.writeStringOrNull (ext.getSimpleIdentifier (), outputStream);
this.writeStringOrNull (ext.getNamespace (), outputStream);
this.saveArray (ext.getObject ().getRawChildren (), outputStream);
outputStream.writeInt (this.getExtraDataPosition ());
this.saveExtensionData (ext);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionHandle,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeStringArray", 
($fz = function (array, outputStream) {
outputStream.writeInt (array == null ? 0 : array.length);
for (var i = 0; i < (array == null ? 0 : array.length); i++) {
this.writeStringOrNull (array[i], outputStream);
}
}, $fz.isPrivate = true, $fz), "~A,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveConfigurationElement", 
($fz = function (element, outputStream, extraOutputStream, depth) {
var currentOutput = outputStream;
if (depth > 2) currentOutput = extraOutputStream;
this.offsets.put (element.getId (), currentOutput.size ());
currentOutput.writeInt (element.getId ());
var actualCe = element.getObject ();
currentOutput.writeLong (actualCe.getContributingBundle ().getBundleId ());
this.writeStringOrNull (actualCe.getName (), currentOutput);
currentOutput.writeInt (actualCe.parentId);
currentOutput.writeByte (actualCe.parentType);
currentOutput.writeInt (depth > 1 ? extraOutputStream.size () : -1);
this.writeStringArray (actualCe.getPropertiesAndValue (), currentOutput);
this.saveArray (actualCe.getRawChildren (), currentOutput);
var childrenCEs = element.getChildren ();
for (var i = 0; i < childrenCEs.length; i++) {
this.saveConfigurationElement (childrenCEs[i], outputStream, extraOutputStream, depth + 1);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ConfigurationElementHandle,java.io.DataOutputStream,java.io.DataOutputStream,~N");
Clazz.defineMethod (c$, "saveExtensions", 
($fz = function (exts, outputStream) {
for (var i = 0; i < exts.length; i++) {
this.saveExtension (exts[i], outputStream);
}
for (var i = 0; i < exts.length; i++) {
var ces = exts[i].getConfigurationElements ();
outputStream.writeInt (ces.length);
for (var j = 0; j < ces.length; j++) {
this.saveConfigurationElement (ces[j], outputStream, this.extraOutput, 1);
}
}
}, $fz.isPrivate = true, $fz), "~A,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveExtensionPointData", 
($fz = function (xpt) {
this.writeStringOrNull (xpt.getLabel (), this.extraOutput);
this.writeStringOrNull (xpt.getSchemaReference (), this.extraOutput);
this.writeStringOrNull (xpt.getUniqueIdentifier (), this.extraOutput);
this.writeStringOrNull (xpt.getNamespace (), this.extraOutput);
this.extraOutput.writeLong ((xpt.getObject ()).getBundleId ());
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionPointHandle");
Clazz.defineMethod (c$, "saveExtensionData", 
($fz = function (extension) {
this.writeStringOrNull (extension.getLabel (), this.extraOutput);
this.writeStringOrNull (extension.getExtensionPointUniqueIdentifier (), this.extraOutput);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ExtensionHandle");
Clazz.defineMethod (c$, "writeStringOrNull", 
($fz = function (string, out) {
if (string == null) out.writeByte (0);
 else {
out.writeByte (1);
out.writeUTF (string);
}}, $fz.isPrivate = true, $fz), "~S,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveOrphans", 
($fz = function (objectManager) {
var orphans = objectManager.getOrphanExtensions ();
var fosOrphan =  new java.io.FileOutputStream (org.eclipse.core.internal.registry.TableWriter.orphansFile);
var outputOrphan =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (fosOrphan));
outputOrphan.writeInt (orphans.size ());
var elements = orphans.entrySet ();
for (var iter = elements.iterator (); iter.hasNext (); ) {
var entry = iter.next ();
outputOrphan.writeUTF (entry.getKey ());
this.saveArray (entry.getValue (), outputOrphan);
}
for (var iter = elements.iterator (); iter.hasNext (); ) {
var entry = iter.next ();
this.mainOutput.writeInt ((entry.getValue ()).length);
this.saveExtensions (objectManager.getHandles (entry.getValue (), 2), this.mainOutput);
}
outputOrphan.flush ();
fosOrphan.getFD ().sync ();
outputOrphan.close ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.RegistryObjectManager");
Clazz.defineStatics (c$,
"fileError", 0,
"mainDataFile", null,
"extraDataFile", null,
"tableFile", null,
"contributionsFile", null,
"orphansFile", null);
});
