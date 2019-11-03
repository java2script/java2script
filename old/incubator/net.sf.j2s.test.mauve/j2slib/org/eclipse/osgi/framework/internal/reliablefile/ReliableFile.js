Clazz.declarePackage ("org.eclipse.osgi.framework.internal.reliablefile");
Clazz.load (["java.util.Hashtable"], "org.eclipse.osgi.framework.internal.reliablefile.ReliableFile", ["java.io.BufferedInputStream", "$.File", "$.FileInputStream", "$.FileNotFoundException", "$.FileOutputStream", "$.IOException", "java.lang.Long", "java.util.ArrayList", "$.Arrays", "$.HashSet", "java.util.zip.CRC32"], function () {
c$ = Clazz.decorateAsClass (function () {
this.referenceFile = null;
this.inputFile = null;
this.outputFile = null;
this.appendChecksum = null;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.CacheInfo")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filetype = 0;
this.checksum = null;
this.timeStamp = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile, "CacheInfo");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.filetype = a;
this.checksum = b;
this.timeStamp = c;
}, "~N,java.util.zip.Checksum,~N");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.reliablefile, "ReliableFile");
c$.getReliableFile = Clazz.defineMethod (c$, "getReliableFile", 
function (name) {
return org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getReliableFile ( new java.io.File (name));
}, "~S");
c$.getReliableFile = Clazz.defineMethod (c$, "getReliableFile", 
function (file) {
if (file.isDirectory ()) {
throw  new java.io.FileNotFoundException ("file is a directory");
}return  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFile (file);
}, "java.io.File");
Clazz.makeConstructor (c$, 
($fz = function (file) {
this.referenceFile = file;
}, $fz.isPrivate = true, $fz), "java.io.File");
c$.getFileGenerations = Clazz.defineMethod (c$, "getFileGenerations", 
($fz = function (file) {
if (!org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileSharing && org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile != null) {
if (file.equals (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile)) return org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations;
}var generations = null;
try {
var name = file.getName ();
var prefix = name + '.';
var prefixLen = prefix.length;
var parent =  new java.io.File (file.getParent ());
var files = parent.list ();
if (files == null) return null;
var list =  new java.util.ArrayList (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.defaultMaxGenerations);
if (file.exists ()) list.add ( new Integer (0));
for (var i = 0; i < files.length; i++) {
if (files[i].startsWith (prefix)) {
try {
var id = Integer.parseInt (files[i].substring (prefixLen));
list.add ( new Integer (id));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}}
if (list.size () == 0) return null;
var array = list.toArray ();
java.util.Arrays.sort (array);
generations =  Clazz.newArray (array.length, 0);
for (var i = 0, j = array.length - 1; i < array.length; i++, j--) {
generations[i] = (array[j]).intValue ();
}
return generations;
} finally {
if (!org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileSharing) {
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile = file, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerationFile = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile, $t$);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations = generations, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations, $t$);
}}
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getInputStream", 
function (generation, openMask) {
if (this.inputFile != null) {
throw  new java.io.IOException ("Input stream already open");
}var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (this.referenceFile);
if (generations == null) {
throw  new java.io.FileNotFoundException ("File not found");
}var name = this.referenceFile.getName ();
var parent =  new java.io.File (this.referenceFile.getParent ());
var failOnPrimary = (openMask & 1) != 0;
if (failOnPrimary && generation == 0) generation = generations[0];
var textFile = null;
var textIS = null;
for (var idx = 0; idx < generations.length; idx++) {
if (generation != 0) {
if (generations[idx] > generation || (failOnPrimary && generations[idx] != generation)) continue ;}var file;
if (generations[idx] != 0) file =  new java.io.File (parent, name + '.' + generations[idx]);
 else file = this.referenceFile;
var is = null;
var info;
{
info = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.get (file);
}var timeStamp = file.lastModified ();
if (info == null || timeStamp != info.timeStamp) {
try {
is =  new java.io.FileInputStream (file);
if (is.available () < org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.maxInputStreamBuffer) is =  new java.io.BufferedInputStream (is);
var cksum = this.getChecksumCalculator ();
var filetype = this.getStreamType (is, cksum);
info = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.CacheInfo, this, null, filetype, cksum, timeStamp);
{
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.put (file, info);
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if (failOnPrimary) {
if (info != null && info.filetype == 0) {
this.inputFile = file;
if (is != null) return is;
return  new java.io.FileInputStream (file);
}throw  new java.io.IOException ("ReliableFile is corrupt");
}if (info == null) continue ;switch (info.filetype) {
case 0:
this.inputFile = file;
if (is != null) return is;
return  new java.io.FileInputStream (file);
case 2:
if (textFile == null) {
textFile = file;
textIS = is;
}break;
}
}
if (textFile != null) {
this.inputFile = textFile;
if (textIS != null) return textIS;
return  new java.io.FileInputStream (textFile);
}throw  new java.io.IOException ("ReliableFile is corrupt");
}, "~N,~N");
Clazz.defineMethod (c$, "getOutputStream", 
function (append, appendGeneration) {
if (this.outputFile != null) throw  new java.io.IOException ("Output stream is already open");
var name = this.referenceFile.getName ();
var parent =  new java.io.File (this.referenceFile.getParent ());
var tmpFile = java.io.File.createTempFile (name, ".tmp", parent);
if (!append) {
var os =  new java.io.FileOutputStream (tmpFile);
this.outputFile = tmpFile;
return os;
}var is;
try {
is = this.getInputStream (appendGeneration, 0);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
var os =  new java.io.FileOutputStream (tmpFile);
this.outputFile = tmpFile;
return os;
} else {
throw e;
}
}
try {
var info = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.get (this.inputFile);
this.appendChecksum = info.checksum;
var os =  new java.io.FileOutputStream (tmpFile);
if (info.filetype == 2) {
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cp (is, os, 0);
} else {
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cp (is, os, 16);
}this.outputFile = tmpFile;
return os;
} finally {
this.closeInputFile ();
}
}, "~B,~N");
Clazz.defineMethod (c$, "closeOutputFile", 
function (checksum) {
if (this.outputFile == null) throw  new java.io.IOException ("Output stream is not open");
var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (this.referenceFile);
var name = this.referenceFile.getName ();
var parent =  new java.io.File (this.referenceFile.getParent ());
var newFile;
if (generations == null) newFile =  new java.io.File (parent, name + ".1");
 else newFile =  new java.io.File (parent, name + '.' + (generations[0] + 1));
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.mv (this.outputFile, newFile);
this.outputFile = null;
this.appendChecksum = null;
var info = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.CacheInfo, this, null, 0, checksum, newFile.lastModified ());
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.put (newFile, info);
this.cleanup (generations, true);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerationFile = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile, $t$);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations, $t$);
}, "java.util.zip.Checksum");
Clazz.defineMethod (c$, "abortOutputFile", 
function () {
if (this.outputFile == null) return ;
this.outputFile.$delete ();
this.outputFile = null;
this.appendChecksum = null;
});
Clazz.defineMethod (c$, "getOutputFile", 
function () {
return this.outputFile;
});
Clazz.defineMethod (c$, "closeInputFile", 
function () {
this.inputFile = null;
});
Clazz.defineMethod (c$, "cleanup", 
($fz = function (generations, generationAdded) {
if (generations == null) return ;
var name = this.referenceFile.getName ();
var parent =  new java.io.File (this.referenceFile.getParent ());
var generationCount = generations.length;
if (generations[generationCount - 1] == 0) generationCount--;
var rmCount = generationCount - org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.defaultMaxGenerations;
if (generationAdded) rmCount++;
if (rmCount < 1) return ;
{
for (var idx = 0, count = generationCount - rmCount; idx < count; idx++) {
var file =  new java.io.File (parent, name + '.' + generations[idx]);
var info = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.get (file);
if (info != null) {
if (info.filetype == 1) rmCount--;
}}
for (var idx = generationCount - 1; rmCount > 0; idx--, rmCount--) {
var rmFile =  new java.io.File (parent, name + '.' + generations[idx]);
rmFile.$delete ();
org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.remove (rmFile);
}
}}, $fz.isPrivate = true, $fz), "~A,~B");
c$.mv = Clazz.defineMethod (c$, "mv", 
($fz = function (from, to) {
if (!from.renameTo (to)) {
throw  new java.io.IOException ("rename failed");
}}, $fz.isPrivate = true, $fz), "java.io.File,java.io.File");
c$.cp = Clazz.defineMethod (c$, "cp", 
($fz = function ($in, out, truncateSize) {
try {
var length = $in.available ();
if (truncateSize > length) length = 0;
 else length -= truncateSize;
if (length > 0) {
var bufferSize;
if (length > 4096) {
bufferSize = 4096;
} else {
bufferSize = length;
}var buffer =  Clazz.newArray (bufferSize, 0);
var size = 0;
var count;
while ((count = $in.read (buffer, 0, length)) > 0) {
if ((size + count) >= length) count = length - size;
out.write (buffer, 0, count);
size += count;
}
}} finally {
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
out.close ();
}
}, $fz.isPrivate = true, $fz), "java.io.InputStream,java.io.OutputStream,~N");
c$.exists = Clazz.defineMethod (c$, "exists", 
function (file) {
var prefix = file.getName () + '.';
var parent =  new java.io.File (file.getParent ());
var prefixLen = prefix.length;
var files = parent.list ();
if (files == null) return false;
for (var i = 0; i < files.length; i++) {
if (files[i].startsWith (prefix)) {
try {
Integer.parseInt (files[i].substring (prefixLen));
return true;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}}
return file.exists ();
}, "java.io.File");
c$.lastModified = Clazz.defineMethod (c$, "lastModified", 
function (file) {
var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (file);
if (generations == null) return 0;
if (generations[0] == 0) return file.lastModified ();
var name = file.getName ();
var parent =  new java.io.File (file.getParent ());
var newFile =  new java.io.File (parent, name + '.' + generations[0]);
return newFile.lastModified ();
}, "java.io.File");
Clazz.defineMethod (c$, "lastModified", 
function () {
if (this.inputFile != null) {
return this.inputFile.lastModified ();
}return 0;
});
c$.lastModifiedVersion = Clazz.defineMethod (c$, "lastModifiedVersion", 
function (file) {
var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (file);
if (generations == null) return -1;
return generations[0];
}, "java.io.File");
c$.$delete = Clazz.defineMethod (c$, "$delete", 
function (deleteFile) {
var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (deleteFile);
if (generations == null) return false;
var name = deleteFile.getName ();
var parent =  new java.io.File (deleteFile.getParent ());
{
for (var idx = 0; idx < generations.length; idx++) {
if (generations[idx] == 0) continue ;var file =  new java.io.File (parent, name + '.' + generations[idx]);
if (file.exists ()) {
file.$delete ();
}org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.remove (file);
}
}return true;
}, "java.io.File");
c$.getBaseFiles = Clazz.defineMethod (c$, "getBaseFiles", 
function (directory) {
if (!directory.isDirectory ()) throw  new java.io.IOException ("Not a valid directory");
var files = directory.list ();
var list =  new java.util.HashSet (Math.floor (files.length / 2));
for (var idx = 0; idx < files.length; idx++) {
var file = files[idx];
var pos = file.lastIndexOf ('.');
if (pos == -1) continue ;var ext = file.substring (pos + 1);
var generation = 0;
try {
generation = Integer.parseInt (ext);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
if (generation == 0) continue ;var base = file.substring (0, pos);
list.add (base);
}
files =  new Array (list.size ());
var idx = 0;
for (var iter = list.iterator (); iter.hasNext (); ) {
files[idx++] = iter.next ();
}
return files;
}, "java.io.File");
c$.cleanupGenerations = Clazz.defineMethod (c$, "cleanupGenerations", 
function (base) {
var rf =  new org.eclipse.osgi.framework.internal.reliablefile.ReliableFile (base);
var generations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.getFileGenerations (base);
rf.cleanup (generations, false);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerationFile = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile, $t$);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations, $t$);
}, "java.io.File");
c$.fileUpdated = Clazz.defineMethod (c$, "fileUpdated", 
function (file) {
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerationFile = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerationFile, $t$);
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations = null, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.lastGenerations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.lastGenerations, $t$);
}, "java.io.File");
Clazz.defineMethod (c$, "writeChecksumSignature", 
function (out, checksum) {
out.write (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.identifier1);
out.write (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.intToHex (checksum.getValue ()));
out.write (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.identifier2);
}, "java.io.OutputStream,java.util.zip.Checksum");
Clazz.defineMethod (c$, "getSignatureSize", 
function () {
if (this.inputFile != null) {
var info;
{
info = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.cacheFiles.get (this.inputFile);
}if (info != null) {
switch (info.filetype) {
case 0:
case 1:
return 16;
case 2:
return 0;
}
}}throw  new java.io.IOException ("ReliableFile signature size is unknown");
});
Clazz.defineMethod (c$, "getFileChecksum", 
function () {
if (this.appendChecksum == null) throw  new java.io.IOException ("Checksum is invalid!");
return this.appendChecksum;
});
Clazz.defineMethod (c$, "getChecksumCalculator", 
function () {
return  new java.util.zip.CRC32 ();
});
Clazz.defineMethod (c$, "getStreamType", 
($fz = function (is, crc) {
var markSupported = is.markSupported ();
if (markSupported) is.mark (is.available ());
try {
var len = is.available ();
if (len < 16) {
if (crc != null) {
var data =  Clazz.newArray (16, 0);
var num = is.read (data);
if (num > 0) crc.update (data, 0, num);
}return 2;
}len -= 16;
var pos = 0;
var data =  Clazz.newArray (4096, 0);
while (pos < len) {
var read = data.length;
if (pos + read > len) read = len - pos;
var num = is.read (data, 0, read);
if (num == -1) {
throw  new java.io.IOException ("Unable to read entire file.");
}crc.update (data, 0, num);
pos += num;
}
var num = is.read (data);
if (num != 16) {
throw  new java.io.IOException ("Unable to read entire file.");
}var i;
var j;
for (i = 0; i < 4; i++) if (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.identifier1[i] != data[i]) {
crc.update (data, 0, 16);
return 2;
}
for (i = 0, j = 12; i < 4; i++, j++) if (org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.identifier2[i] != data[j]) {
crc.update (data, 0, 16);
return 2;
}
var crccmp;
try {
crccmp = Long.$valueOf ( String.instantialize (data, 4, 8, "UTF-8"), 16).longValue ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
crccmp = Long.$valueOf ( String.instantialize (data, 4, 8), 16).longValue ();
} else {
throw e;
}
}
if (crccmp == crc.getValue ()) {
return 0;
}return 1;
} finally {
if (markSupported) is.reset ();
}
}, $fz.isPrivate = true, $fz), "java.io.InputStream,java.util.zip.Checksum");
c$.intToHex = Clazz.defineMethod (c$, "intToHex", 
($fz = function (l) {
var buffer =  Clazz.newArray (8, 0);
var count = 8;
do {
var ch = (l & 0xf);
if (ch > 9) ch = ch - 10 + ('a').charCodeAt (0);
 else ch += ('0').charCodeAt (0);
buffer[--count] = ch;
l >>= 4;
} while (count > 0);
return buffer;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineStatics (c$,
"OPEN_BEST_AVAILABLE", 0,
"OPEN_FAIL_ON_PRIMARY", 1,
"GENERATION_LATEST", 0,
"GENERATIONS_INFINITE", 0,
"tmpExt", ".tmp",
"PROP_MAX_BUFFER", "osgi.reliableFile.maxInputStreamBuffer",
"PROP_MAX_GENERATIONS", "osgi.ReliableFile.maxGenerations",
"PROP_OSGI_LOCKING", "osgi.locking",
"FILETYPE_UNKNOWN", -1,
"FILETYPE_VALID", 0,
"FILETYPE_CORRUPT", 1,
"FILETYPE_NOSIGNATURE", 2,
"identifier1", ['.', 'c', 'r', 'c'],
"identifier2", ['.', 'v', '1', '\n'],
"BUF_SIZE", 4096,
"maxInputStreamBuffer", 131072,
"defaultMaxGenerations", 2,
"fileSharing", true,
"lastGenerationFile", null,
"lastGenerations", null);
{
var prop = System.getProperty ("osgi.reliableFile.maxInputStreamBuffer");
if (prop != null) {
try {
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.maxInputStreamBuffer = Integer.parseInt (prop), org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.maxInputStreamBuffer = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.maxInputStreamBuffer, $t$);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}prop = System.getProperty ("osgi.ReliableFile.maxGenerations");
if (prop != null) {
try {
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.defaultMaxGenerations = Integer.parseInt (prop), org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.defaultMaxGenerations = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.defaultMaxGenerations, $t$);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}prop = System.getProperty ("osgi.locking");
if (prop != null) {
if (prop.equals ("none")) {
($t$ = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileSharing = false, org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.prototype.fileSharing = org.eclipse.osgi.framework.internal.reliablefile.ReliableFile.fileSharing, $t$);
}}}c$.cacheFiles = c$.prototype.cacheFiles =  new java.util.Hashtable (20);
});
