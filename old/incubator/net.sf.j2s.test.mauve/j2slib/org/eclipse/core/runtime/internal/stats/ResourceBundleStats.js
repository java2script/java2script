Clazz.declarePackage ("org.eclipse.core.runtime.internal.stats");
Clazz.load (null, "org.eclipse.core.runtime.internal.stats.ResourceBundleStats", ["java.util.Properties"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pluginId = null;
this.fileName = null;
this.keyCount = 0;
this.keySize = 0;
this.valueSize = 0;
this.hashSize = 0;
this.fileSize = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.stats, "ResourceBundleStats");
c$.sizeOf = Clazz.defineMethod (c$, "sizeOf", 
($fz = function (value) {
return 44 + (2 * value.length);
}, $fz.isPrivate = true, $fz), "~S");
c$.sizeOf = Clazz.defineMethod (c$, "sizeOf", 
($fz = function (value) {
return Math.round (44 + (16 + (value.size () * 1.25 * 4)) + (24 * value.size ()));
}, $fz.isPrivate = true, $fz), "java.util.Properties");
Clazz.makeConstructor (c$, 
function (pluginId, fileName, input) {
this.pluginId = pluginId;
this.fileName = fileName;
this.initialize (input);
}, "~S,~S,java.net.URL");
Clazz.makeConstructor (c$, 
function (pluginId, fileName, bundle) {
this.pluginId = pluginId;
this.fileName = fileName;
this.initialize (bundle);
}, "~S,~S,java.util.ResourceBundle");
Clazz.defineMethod (c$, "initialize", 
($fz = function (bundle) {
for (var keys = bundle.getKeys (); keys.hasMoreElements (); ) {
var key = keys.nextElement ();
this.keySize += org.eclipse.core.runtime.internal.stats.ResourceBundleStats.sizeOf (key);
this.valueSize += org.eclipse.core.runtime.internal.stats.ResourceBundleStats.sizeOf (bundle.getString (key));
this.keyCount++;
}
}, $fz.isPrivate = true, $fz), "java.util.ResourceBundle");
Clazz.defineMethod (c$, "initialize", 
($fz = function (url) {
var stream = null;
var props =  new java.util.Properties ();
try {
try {
stream = url.openStream ();
this.fileSize = stream.available ();
props.load (stream);
for (var iter = props.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
this.keySize += org.eclipse.core.runtime.internal.stats.ResourceBundleStats.sizeOf (key);
this.valueSize += org.eclipse.core.runtime.internal.stats.ResourceBundleStats.sizeOf (props.getProperty (key));
this.keyCount++;
}
this.hashSize = org.eclipse.core.runtime.internal.stats.ResourceBundleStats.sizeOf (props);
} finally {
if (stream != null) stream.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineMethod (c$, "getHashSize", 
function () {
return this.hashSize;
});
Clazz.defineMethod (c$, "getKeyCount", 
function () {
return this.keyCount;
});
Clazz.defineMethod (c$, "getPluginId", 
function () {
return this.pluginId;
});
Clazz.defineMethod (c$, "getKeySize", 
function () {
return this.keySize;
});
Clazz.defineMethod (c$, "getValueSize", 
function () {
return this.valueSize;
});
Clazz.defineMethod (c$, "getTotalSize", 
function () {
return this.keySize + this.valueSize + this.hashSize;
});
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz.defineMethod (c$, "getFileSize", 
function () {
return this.fileSize;
});
});
