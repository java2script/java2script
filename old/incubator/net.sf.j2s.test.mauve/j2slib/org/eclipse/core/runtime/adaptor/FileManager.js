Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["java.lang.Boolean", "java.util.Properties"], "org.eclipse.core.runtime.adaptor.FileManager", ["java.io.File", "$.IOException", "java.lang.Thread", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "org.eclipse.core.runtime.internal.adaptor.BasicLocation", "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile", "$.ReliableFileInputStream", "$.ReliableFileOutputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.FileManager.Entry")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.readId = 0;
this.writeId = 0;
this.fileType = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor.FileManager, "Entry");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.readId = a;
this.writeId = b;
this.fileType = c;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getReadId", 
function () {
return this.readId;
});
Clazz.defineMethod (c$, "getWriteId", 
function () {
return this.writeId;
});
Clazz.defineMethod (c$, "getFileType", 
function () {
return this.fileType;
});
Clazz.defineMethod (c$, "setReadId", 
function (a) {
this.readId = a;
}, "~N");
Clazz.defineMethod (c$, "setWriteId", 
function (a) {
this.writeId = a;
}, "~N");
Clazz.defineMethod (c$, "setFileType", 
function (a) {
this.fileType = a;
}, "~N");
c$ = Clazz.p0p ();
}
this.base = null;
this.managerRoot = null;
this.lockMode = null;
this.tableFile = null;
this.lockFile = null;
this.locker = null;
this.instanceFile = null;
this.instanceLocker = null;
this.readOnly = false;
this.$open = false;
this.tableStamp = -1;
this.table = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "FileManager");
Clazz.prepareFields (c$, function () {
this.table =  new java.util.Properties ();
});
Clazz.makeConstructor (c$, 
function (base, lockMode) {
this.construct (base, lockMode, false);
}, "java.io.File,~S");
Clazz.makeConstructor (c$, 
function (base, lockMode, readOnly) {
this.base = base;
this.lockMode = lockMode;
this.managerRoot =  new java.io.File (base, ".manager");
if (!readOnly) this.managerRoot.mkdirs ();
this.tableFile =  new java.io.File (this.managerRoot, ".fileTable");
this.lockFile =  new java.io.File (this.managerRoot, ".fileTableLock");
this.readOnly = readOnly;
this.$open = false;
}, "java.io.File,~S,~B");
Clazz.defineMethod (c$, "initializeInstanceFile", 
($fz = function () {
if (this.instanceFile != null || this.readOnly) return ;
this.instanceFile = java.io.File.createTempFile (".tmp", ".instance", this.managerRoot);
this.instanceFile.deleteOnExit ();
this.instanceLocker = org.eclipse.core.runtime.internal.adaptor.BasicLocation.createLocker (this.instanceFile, this.lockMode);
this.instanceLocker.lock ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAbsolutePath", 
($fz = function (file) {
return  new java.io.File (this.base, file).getAbsolutePath ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "add", 
function (file) {
this.add (file, 0);
}, "~S");
Clazz.defineMethod (c$, "add", 
function (file, fileType) {
if (!this.$open) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_notOpen);
if (this.readOnly) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_illegalInReadOnlyMode);
if (!this.lock (true)) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
try {
this.updateTable ();
var entry = this.table.get (file);
if (entry == null) {
entry = Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.FileManager.Entry, this, null, 0, 1, fileType);
this.table.put (file, entry);
var oldestGeneration = this.findOldestGeneration (file);
if (oldestGeneration != 0) entry.setWriteId (oldestGeneration + 1);
this.save ();
} else {
if (entry.getFileType () != fileType) {
entry.setFileType (fileType);
this.updateTable ();
this.save ();
}}} finally {
this.release ();
}
}, "~S,~N");
Clazz.defineMethod (c$, "findOldestGeneration", 
($fz = function (file) {
var files = this.base.list ();
var oldestGeneration = 0;
if (files != null) {
var name = file + '.';
var len = name.length;
for (var i = 0; i < files.length; i++) {
if (!files[i].startsWith (name)) continue ;try {
var generation = Integer.parseInt (files[i].substring (len));
if (generation > oldestGeneration) oldestGeneration = generation;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
continue ;} else {
throw e;
}
}
}
}return oldestGeneration;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "update", 
function (targets, sources) {
if (!this.$open) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_notOpen);
if (this.readOnly) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_illegalInReadOnlyMode);
if (!this.lock (true)) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
try {
this.updateTable ();
var originalReadIDs =  Clazz.newArray (targets.length, 0);
var error = false;
for (var i = 0; i < targets.length; i++) {
originalReadIDs[i] = this.getId (targets[i]);
if (!this.update (targets[i], sources[i])) error = true;
}
if (error) {
for (var i = 0; i < targets.length; i++) {
var entry = this.table.get (targets[i]);
entry.setReadId (originalReadIDs[i]);
}
throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_updateFailed);
}this.save ();
} finally {
this.release ();
}
}, "~A,~A");
Clazz.defineMethod (c$, "getFiles", 
function () {
if (!this.$open) return null;
var set = this.table.keySet ();
var keys = set.toArray ( new Array (set.size ()));
var result =  new Array (keys.length);
for (var i = 0; i < keys.length; i++) result[i] =  String.instantialize (keys[i]);

return result;
});
Clazz.defineMethod (c$, "getBase", 
function () {
return this.base;
});
Clazz.defineMethod (c$, "getId", 
function (target) {
if (!this.$open) return -1;
var entry = this.table.get (target);
if (entry == null) return -1;
return entry.getReadId ();
}, "~S");
Clazz.defineMethod (c$, "getFileType", 
function (target) {
if (this.$open) {
var entry = this.table.get (target);
if (entry != null) return entry.getFileType ();
}return -1;
}, "~S");
Clazz.defineMethod (c$, "isReadOnly", 
function () {
return this.readOnly;
});
Clazz.defineMethod (c$, "lock", 
($fz = function (wait) {
if (this.readOnly) return false;
if (this.locker == null) {
this.locker = org.eclipse.core.runtime.internal.adaptor.BasicLocation.createLocker (this.lockFile, this.lockMode);
if (this.locker == null) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
}var locked = this.locker.lock ();
if (locked || !wait) return locked;
var start = System.currentTimeMillis ();
while (true) {
try {
Thread.sleep (200);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
locked = this.locker.lock ();
if (locked) return true;
var time = System.currentTimeMillis () - start;
if (time > 5000) return false;
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "lookup", 
function (target, add) {
if (!this.$open) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_notOpen);
var entry = this.table.get (target);
if (entry == null) {
if (add) {
this.add (target);
entry = this.table.get (target);
} else {
return null;
}}return  new java.io.File (this.getAbsolutePath (target + '.' + entry.getReadId ()));
}, "~S,~B");
Clazz.defineMethod (c$, "move", 
($fz = function (source, target) {
var original =  new java.io.File (source);
var targetFile =  new java.io.File (target);
if (!original.exists () || targetFile.exists ()) return false;
return original.renameTo (targetFile);
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "release", 
($fz = function () {
if (this.locker == null) return ;
this.locker.release ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remove", 
function (file) {
if (!this.$open) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_notOpen);
if (this.readOnly) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_illegalInReadOnlyMode);
if (!this.lock (true)) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
try {
this.updateTable ();
this.table.remove (file);
this.save ();
} finally {
this.release ();
}
}, "~S");
Clazz.defineMethod (c$, "updateTable", 
($fz = function () {
var stamp;
stamp = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastModifiedVersion (this.tableFile);
if (stamp == this.tableStamp || stamp == -1) return ;
var diskTable =  new java.util.Properties ();
try {
var input;
input =  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileInputStream (this.tableFile);
try {
diskTable.load (input);
} finally {
input.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw e;
} else {
throw e;
}
}
this.tableStamp = stamp;
for (var e = diskTable.keys (); e.hasMoreElements (); ) {
var file = e.nextElement ();
var value = diskTable.getProperty (file);
if (value != null) {
var entry = this.table.get (file);
var id;
var fileType;
var idx = value.indexOf (',');
if (idx != -1) {
id = Integer.parseInt (value.substring (0, idx));
fileType = Integer.parseInt (value.substring (idx + 1));
} else {
id = Integer.parseInt (value);
fileType = 0;
}if (entry == null) {
this.table.put (file, Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.FileManager.Entry, this, null, id, id + 1, fileType));
} else {
entry.setWriteId (id + 1);
}}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "save", 
($fz = function () {
if (this.readOnly) return ;
this.updateTable ();
var props =  new java.util.Properties ();
for (var e = this.table.keys (); e.hasMoreElements (); ) {
var file = e.nextElement ();
var entry = this.table.get (file);
var value;
if (entry.getFileType () != 0) {
value = Integer.toString (entry.getWriteId () - 1) + ',' + Integer.toString (entry.getFileType ());
} else {
value = Integer.toString (entry.getWriteId () - 1);
}props.put (file, value);
}
var fileStream =  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFileOutputStream (this.tableFile);
try {
var error = true;
try {
props.store (fileStream, "safe table");
fileStream.close ();
error = false;
} finally {
if (error) fileStream.abort ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_couldNotSave);
} else {
throw e;
}
}
this.tableStamp = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastModifiedVersion (this.tableFile);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "update", 
function (target, source) {
var entry = this.table.get (target);
var newId = entry.getWriteId ();
var success = this.move (this.getAbsolutePath (source), this.getAbsolutePath (target) + '.' + newId);
if (!success) {
newId = this.findOldestGeneration (target) + 1;
success = this.move (this.getAbsolutePath (source), this.getAbsolutePath (target) + '.' + newId);
}if (!success) return false;
entry.setReadId (newId);
entry.setWriteId (newId + 1);
return true;
}, "~S,~S");
Clazz.defineMethod (c$, "cleanup", 
($fz = function () {
if (this.readOnly) return ;
if (!this.lock (true)) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
try {
var files = this.managerRoot.list ();
if (files != null) {
for (var i = 0; i < files.length; i++) {
if (files[i].endsWith (".instance") && this.instanceFile != null && !files[i].equalsIgnoreCase (this.instanceFile.getName ())) {
var tmpLocker = org.eclipse.core.runtime.internal.adaptor.BasicLocation.createLocker ( new java.io.File (this.managerRoot, files[i]), this.lockMode);
if (tmpLocker.lock ()) {
tmpLocker.release ();
 new java.io.File (this.managerRoot, files[i]).$delete ();
} else {
tmpLocker.release ();
return ;
}}}
}this.updateTable ();
var managedFiles = this.table.entrySet ();
for (var iter = managedFiles.iterator (); iter.hasNext (); ) {
var fileEntry = iter.next ();
var fileName = fileEntry.getKey ();
var info = fileEntry.getValue ();
if (info.getFileType () == 1) {
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cleanupGenerations ( new java.io.File (this.base, fileName));
} else {
var readId = Integer.toString (info.getWriteId () - 1);
this.deleteCopies (fileName, readId);
}}
if (org.eclipse.core.runtime.adaptor.FileManager.tempCleanup) {
files = this.base.list ();
if (files != null) {
for (var i = 0; i < files.length; i++) {
if (files[i].endsWith (".tmp")) {
 new java.io.File (this.base, files[i]).$delete ();
}}
}}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw e;
} else {
throw e;
}
} finally {
this.release ();
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "deleteCopies", 
($fz = function (fileName, exceptionNumber) {
var notToDelete = fileName + '.' + exceptionNumber;
var files = this.base.list ();
if (files == null) return ;
for (var i = 0; i < files.length; i++) {
if (files[i].startsWith (fileName + '.') && !files[i].equals (notToDelete))  new java.io.File (this.base, files[i]).$delete ();
}
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "close", 
function () {
if (!this.$open) return ;
this.$open = false;
if (this.readOnly) return ;
try {
this.cleanup ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.instanceLocker != null) this.instanceLocker.release ();
if (this.instanceFile != null) this.instanceFile.$delete ();
});
Clazz.defineMethod (c$, "open", 
function (wait) {
if (org.eclipse.core.runtime.adaptor.FileManager.openCleanup) this.cleanup ();
if (!this.readOnly) {
var locked = this.lock (wait);
if (!locked && wait) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_cannotLock);
}try {
this.initializeInstanceFile ();
this.updateTable ();
this.$open = true;
} finally {
this.release ();
}
}, "~B");
Clazz.defineMethod (c$, "createTempFile", 
function (file) {
if (this.readOnly) throw  new java.io.IOException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.fileManager_illegalInReadOnlyMode);
var tmpFile = java.io.File.createTempFile (file, ".tmp", this.base);
tmpFile.deleteOnExit ();
return tmpFile;
}, "~S");
Clazz.defineStatics (c$,
"FILETYPE_STANDARD", 0,
"FILETYPE_RELIABLEFILE", 1);
c$.tempCleanup = c$.prototype.tempCleanup = Boolean.$valueOf (System.getProperty ("osgi.embedded.cleanTempFiles")).booleanValue ();
c$.openCleanup = c$.prototype.openCleanup = Boolean.$valueOf (System.getProperty ("osgi.embedded.cleanupOnOpen")).booleanValue ();
Clazz.defineStatics (c$,
"MANAGER_FOLDER", ".manager",
"TABLE_FILE", ".fileTable",
"LOCK_FILE", ".fileTableLock",
"MAX_LOCK_WAIT", 5000);
});
