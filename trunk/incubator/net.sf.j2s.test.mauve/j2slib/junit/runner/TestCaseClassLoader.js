Clazz.declarePackage ("junit.runner");
Clazz.load (["java.lang.ClassLoader"], "junit.runner.TestCaseClassLoader", ["java.io.ByteArrayOutputStream", "$.File", "$.FileInputStream", "java.lang.ClassNotFoundException", "java.util.Properties", "$.StringTokenizer", "$.Vector", "java.util.zip.ZipFile"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fPathItems = null;
this.defaultExclusions = null;
this.fExcluded = null;
Clazz.instantialize (this, arguments);
}, junit.runner, "TestCaseClassLoader", ClassLoader);
Clazz.prepareFields (c$, function () {
this.defaultExclusions = ["junit.framework.", "junit.extensions.", "junit.runner."];
});
Clazz.makeConstructor (c$, 
function () {
this.construct (System.getProperty ("java.class.path"));
});
Clazz.makeConstructor (c$, 
function (classPath) {
Clazz.superConstructor (this, junit.runner.TestCaseClassLoader, []);
this.scanPath (classPath);
this.readExcludedPackages ();
}, "~S");
Clazz.defineMethod (c$, "scanPath", 
($fz = function (classPath) {
var separator = System.getProperty ("path.separator");
this.fPathItems =  new java.util.Vector (10);
var st =  new java.util.StringTokenizer (classPath, separator);
while (st.hasMoreTokens ()) {
this.fPathItems.addElement (st.nextToken ());
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
return ClassLoader.getSystemResource (name);
}, "~S");
Clazz.overrideMethod (c$, "getResourceAsStream", 
function (name) {
return ClassLoader.getSystemResourceAsStream (name);
}, "~S");
Clazz.defineMethod (c$, "isExcluded", 
function (name) {
for (var i = 0; i < this.fExcluded.size (); i++) {
if (name.startsWith (this.fExcluded.elementAt (i))) {
return true;
}}
return false;
}, "~S");
Clazz.defineMethod (c$, "loadClass", 
function (name, resolve) {
var c = this.findLoadedClass (name);
if (c != null) return c;
if (this.isExcluded (name)) {
try {
c = this.findSystemClass (name);
return c;
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
}if (c == null) {
var data = this.lookupClassData (name);
if (data == null) throw  new ClassNotFoundException ();
c = this.defineClass (name, data, 0, data.length);
}if (resolve) this.resolveClass (c);
return c;
}, "~S,~B");
Clazz.defineMethod (c$, "lookupClassData", 
($fz = function (className) {
var data = null;
for (var i = 0; i < this.fPathItems.size (); i++) {
var path = this.fPathItems.elementAt (i);
var fileName = className.$replace ('.', '/') + ".class";
if (this.isJar (path)) {
data = this.loadJarData (path, fileName);
} else {
data = this.loadFileData (path, fileName);
}if (data != null) return data;
}
throw  new ClassNotFoundException (className);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isJar", 
function (pathEntry) {
return pathEntry.endsWith (".jar") || pathEntry.endsWith (".zip");
}, "~S");
Clazz.defineMethod (c$, "loadFileData", 
($fz = function (path, fileName) {
var file =  new java.io.File (path, fileName);
if (file.exists ()) {
return this.getClassData (file);
}return null;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "getClassData", 
($fz = function (f) {
try {
var stream =  new java.io.FileInputStream (f);
var out =  new java.io.ByteArrayOutputStream (1000);
var b =  Clazz.newArray (1000, 0);
var n;
while ((n = stream.read (b)) != -1) out.write (b, 0, n);

stream.close ();
out.close ();
return out.toByteArray ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return null;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "loadJarData", 
($fz = function (path, fileName) {
var zipFile = null;
var stream = null;
var archive =  new java.io.File (path);
if (!archive.exists ()) return null;
try {
zipFile =  new java.util.zip.ZipFile (archive);
} catch (io) {
if (Clazz.instanceOf (io, java.io.IOException)) {
return null;
} else {
throw io;
}
}
var entry = zipFile.getEntry (fileName);
if (entry == null) return null;
var size = entry.getSize ();
try {
stream = zipFile.getInputStream (entry);
var data =  Clazz.newArray (size, 0);
var pos = 0;
while (pos < size) {
var n = stream.read (data, pos, data.length - pos);
pos += n;
}
zipFile.close ();
return data;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
} finally {
try {
if (stream != null) stream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return null;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "readExcludedPackages", 
($fz = function () {
this.fExcluded =  new java.util.Vector (10);
for (var i = 0; i < this.defaultExclusions.length; i++) this.fExcluded.addElement (this.defaultExclusions[i]);

var is = this.getClass ().getResourceAsStream ("excluded.properties");
if (is == null) return ;
var p =  new java.util.Properties ();
try {
p.load (is);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return ;
} else {
throw e;
}
} finally {
try {
is.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
for (var e = p.propertyNames (); e.hasMoreElements (); ) {
var key = e.nextElement ();
if (key.startsWith ("excluded.")) {
var path = p.getProperty (key);
path = path.trim ();
if (path.endsWith ("*")) path = path.substring (0, path.length - 1);
if (path.length > 0) this.fExcluded.addElement (path);
}}
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"EXCLUDED_FILE", "excluded.properties");
});
