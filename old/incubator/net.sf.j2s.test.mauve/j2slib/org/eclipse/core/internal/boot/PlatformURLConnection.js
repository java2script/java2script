Clazz.declarePackage ("org.eclipse.core.internal.boot");
Clazz.load (["java.net.URLConnection", "java.io.File", "java.util.Properties"], "org.eclipse.core.internal.boot.PlatformURLConnection", ["java.io.FileInputStream", "$.FileOutputStream", "$.IOException", "java.lang.Long", "$.Thread", "java.net.URL", "java.util.Date", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isInCache = false;
this.isJar = false;
this.resolvedURL = null;
this.cachedURL = null;
this.connection = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.boot, "PlatformURLConnection", java.net.URLConnection);
Clazz.defineMethod (c$, "allowCaching", 
function () {
return false;
});
Clazz.defineMethod (c$, "connect", 
function () {
this.connect (false);
});
Clazz.defineMethod (c$, "connect", 
($fz = function (asLocal) {
if (this.connected) return ;
if (this.shouldCache (asLocal)) {
try {
var inCache = this.getURLInCache ();
if (inCache != null) this.connection = inCache.openConnection ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if (this.connection == null) this.connection = this.resolvedURL.openConnection ();
this.connected = true;
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CONNECT) this.debug ("Connected as " + this.connection.getURL ());
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "copyToCache", 
($fz = function () {
if ( new Boolean (this.isInCache | this.cachedURL == null).valueOf ()) return ;
var tmp;
var ix;
var key;
if (this.isJar) {
tmp = this.url.getFile ();
ix = tmp.lastIndexOf ("!/");
if (ix != -1) tmp = tmp.substring (0, ix);
key = tmp;
} else key = this.url.getFile ();
var src;
if (this.isJar) {
tmp = this.resolvedURL.getFile ();
ix = tmp.lastIndexOf ("!/");
if (ix != -1) tmp = tmp.substring (0, ix);
src =  new java.net.URL (tmp);
} else src = this.resolvedURL;
var srcis = null;
var tgt;
if (this.isJar) {
tmp = this.cachedURL.getFile ();
ix = tmp.indexOf (":");
if (ix != -1) tmp = tmp.substring (ix + 1);
ix = tmp.lastIndexOf ("!/");
if (ix != -1) tmp = tmp.substring (0, ix);
tgt = tmp;
} else tgt = this.cachedURL.getFile ();
var tgtFile = null;
var tgtos = null;
var error = false;
var total = 0;
try {
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CACHE_COPY) {
if (this.isJar) this.debug ("Caching jar as " + tgt);
 else this.debug ("Caching as " + tgt);
}srcis = src.openStream ();
var buf =  Clazz.newArray (32768, 0);
var count = srcis.read (buf);
tgtFile =  new java.io.File (tgt);
tgtos =  new java.io.FileOutputStream (tgtFile);
while (count != -1) {
total += count;
tgtos.write (buf, 0, count);
count = srcis.read (buf);
}
srcis.close ();
srcis = null;
tgtos.flush ();
tgtos.getFD ().sync ();
tgtos.close ();
tgtos = null;
org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.put (key, tgt);
this.isInCache = true;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
error = true;
org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.put (key, org.eclipse.core.internal.boot.PlatformURLConnection.NOT_FOUND);
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CACHE_COPY) this.debug ("Failed to cache due to " + e);
throw e;
} else {
throw e;
}
} finally {
if (!error && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CACHE_COPY) this.debug (total + " bytes copied");
if (srcis != null) srcis.close ();
if (tgtos != null) tgtos.close ();
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "debug", 
function (s) {
System.out.println ("URL " + this.getURL ().toString () + "^" + Integer.toHexString (Thread.currentThread ().hashCode ()) + " " + s);
}, "~S");
c$.debugStartup = Clazz.defineMethod (c$, "debugStartup", 
($fz = function (s) {
System.out.println ("URL " + s);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getAuxillaryURLs", 
function () {
return null;
});
Clazz.defineMethod (c$, "getInputStream", 
function () {
if (!this.connected) this.connect ();
return this.connection.getInputStream ();
});
Clazz.defineMethod (c$, "getResolvedURL", 
function () {
return this.resolvedURL;
});
Clazz.defineMethod (c$, "getURLAsLocal", 
function () {
this.connect (true);
var u = this.connection.getURL ();
var up = u.getProtocol ();
if (!up.equals ("file") && !up.equals ("jar") && !up.startsWith ("bundle")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_noaccess, up));
return u;
});
Clazz.defineMethod (c$, "getURLInCache", 
($fz = function () {
if (!this.allowCaching ()) return null;
if (this.isInCache) return this.cachedURL;
if ( new Boolean (org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation == null | org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex == null).valueOf ()) return null;
var file = "";
var jarEntry = null;
if (this.isJar) {
file = this.url.getFile ();
var ix = file.lastIndexOf ("!/");
if (ix != -1) {
jarEntry = file.substring (ix + "!/".length);
file = file.substring (0, ix);
}} else {
file = this.url.getFile ();
jarEntry = null;
}var tmp = org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.get (file);
if (tmp != null && tmp === org.eclipse.core.internal.boot.PlatformURLConnection.NOT_FOUND) throw  new java.io.IOException ();
if (tmp != null && !( new java.io.File (tmp)).exists ()) {
tmp = null;
org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.remove (this.url.getFile ());
}if (tmp != null) {
if (this.isJar) {
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CACHE_LOOKUP) this.debug ("Jar located in cache as " + tmp);
tmp = "file" + ":" + tmp + "!/" + jarEntry;
this.cachedURL =  new java.net.URL ("jar", null, -1, tmp);
} else {
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG && org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG_CACHE_LOOKUP) this.debug ("Located in cache as " + tmp);
this.cachedURL =  new java.net.URL ("file", null, -1, tmp);
}this.isInCache = true;
} else {
var ix = file.lastIndexOf ("/");
tmp = file.substring (ix + 1);
tmp = org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation + org.eclipse.core.internal.boot.PlatformURLConnection.filePrefix + Long.toString (( new java.util.Date ()).getTime ()) + "_" + tmp;
tmp = tmp.$replace (java.io.File.separatorChar, '/');
if (this.isJar) {
tmp = "file" + ":" + tmp + "!/" + jarEntry;
this.cachedURL =  new java.net.URL ("jar", null, -1, tmp);
} else this.cachedURL =  new java.net.URL ("file", null, -1, tmp);
this.copyToCache ();
}return this.cachedURL;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "resolve", 
function () {
throw  new java.io.IOException ();
});
Clazz.defineMethod (c$, "getId", 
function (spec) {
var i = spec.lastIndexOf ('_');
return i >= 0 ? spec.substring (0, i) : spec;
}, "~S");
Clazz.defineMethod (c$, "getVersion", 
function (spec) {
var i = spec.lastIndexOf ('_');
return i >= 0 ? spec.substring (i + 1, spec.length) : "";
}, "~S");
Clazz.defineMethod (c$, "setResolvedURL", 
function (url) {
if (url == null) throw  new java.io.IOException ();
if (this.resolvedURL != null) return ;
var ix = url.getFile ().lastIndexOf ("!/");
this.isJar = -1 != ix;
if (this.isJar && !url.getProtocol ().equals ("jar")) url =  new java.net.URL ("jar", "", -1, url.toExternalForm ());
this.resolvedURL = url;
}, "java.net.URL");
Clazz.defineMethod (c$, "shouldCache", 
($fz = function (asLocal) {
var rp = this.resolvedURL.getProtocol ();
var rf = this.resolvedURL.getFile ();
if (rp.equals ("file")) return false;
if (rp.equals ("jar") && (rf.startsWith ("file"))) return false;
if (asLocal) return true;
return true;
}, $fz.isPrivate = true, $fz), "~B");
c$.shutdown = Clazz.defineMethod (c$, "shutdown", 
function () {
if (org.eclipse.core.internal.boot.PlatformURLConnection.indexName != null && org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation != null) {
var keys = org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.keys ();
var key;
var value;
while (keys.hasMoreElements ()) {
key = keys.nextElement ();
value = org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.get (key);
if (value === org.eclipse.core.internal.boot.PlatformURLConnection.NOT_FOUND) org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.remove (key);
}
if (org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.size () == 0) return ;
try {
var fos = null;
fos =  new java.io.FileOutputStream (org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation + org.eclipse.core.internal.boot.PlatformURLConnection.indexName);
try {
org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.store (fos, null);
fos.flush ();
fos.getFD ().sync ();
} finally {
fos.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}});
c$.startup = Clazz.defineMethod (c$, "startup", 
function (location, os, ws, nl) {
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.os = os, org.eclipse.core.internal.boot.PlatformURLConnection.prototype.os = org.eclipse.core.internal.boot.PlatformURLConnection.os, $t$);
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.ws = ws, org.eclipse.core.internal.boot.PlatformURLConnection.prototype.ws = org.eclipse.core.internal.boot.PlatformURLConnection.ws, $t$);
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.nl = nl, org.eclipse.core.internal.boot.PlatformURLConnection.prototype.nl = org.eclipse.core.internal.boot.PlatformURLConnection.nl, $t$);
org.eclipse.core.internal.boot.PlatformURLConnection.verifyLocation (location);
var cacheProps = location.trim ();
if (!cacheProps.endsWith (java.io.File.separator)) cacheProps += java.io.File.separator;
cacheProps += ".cache.properties";
var cachePropFile =  new java.io.File (cacheProps);
var props = null;
var fis;
if (cachePropFile.exists ()) {
try {
props =  new java.util.Properties ();
fis =  new java.io.FileInputStream (cachePropFile);
try {
props.load (fis);
} finally {
fis.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
props = null;
} else {
throw e;
}
}
}if (props == null) {
props =  new java.util.Properties ();
var tmp = System.getProperty ("user.home");
if (!tmp.endsWith (java.io.File.separator)) tmp += java.io.File.separator;
tmp += org.eclipse.core.internal.boot.PlatformURLConnection.CACHE_DIR;
props.put ("location", tmp);
tmp = Long.toString (( new java.util.Date ()).getTime ());
props.put ("prefix", tmp);
tmp += ".index.properties";
props.put ("index", tmp);
var fos = null;
try {
fos =  new java.io.FileOutputStream (cachePropFile);
try {
props.store (fos, null);
fos.flush ();
fos.getFD ().sync ();
} finally {
fos.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.filePrefix = props.get ("prefix"), org.eclipse.core.internal.boot.PlatformURLConnection.prototype.filePrefix = org.eclipse.core.internal.boot.PlatformURLConnection.filePrefix, $t$);
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.indexName = props.get ("index"), org.eclipse.core.internal.boot.PlatformURLConnection.prototype.indexName = org.eclipse.core.internal.boot.PlatformURLConnection.indexName, $t$);
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation = props.get ("location"), org.eclipse.core.internal.boot.PlatformURLConnection.prototype.cacheLocation = org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation, $t$);
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG) {
org.eclipse.core.internal.boot.PlatformURLConnection.debugStartup ("Cache location: " + org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation);
org.eclipse.core.internal.boot.PlatformURLConnection.debugStartup ("Cache index: " + org.eclipse.core.internal.boot.PlatformURLConnection.indexName);
org.eclipse.core.internal.boot.PlatformURLConnection.debugStartup ("Cache file prefix: " + org.eclipse.core.internal.boot.PlatformURLConnection.filePrefix);
}if (!org.eclipse.core.internal.boot.PlatformURLConnection.verifyLocation (org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation)) {
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.indexName = null, org.eclipse.core.internal.boot.PlatformURLConnection.prototype.indexName = org.eclipse.core.internal.boot.PlatformURLConnection.indexName, $t$);
($t$ = org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation = null, org.eclipse.core.internal.boot.PlatformURLConnection.prototype.cacheLocation = org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation, $t$);
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG) org.eclipse.core.internal.boot.PlatformURLConnection.debugStartup ("Failed to create cache directory structure. Caching suspended");
return ;
}if (org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation != null && org.eclipse.core.internal.boot.PlatformURLConnection.indexName != null) {
try {
fis =  new java.io.FileInputStream (org.eclipse.core.internal.boot.PlatformURLConnection.cacheLocation + org.eclipse.core.internal.boot.PlatformURLConnection.indexName);
try {
org.eclipse.core.internal.boot.PlatformURLConnection.cacheIndex.load (fis);
} finally {
fis.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (org.eclipse.core.internal.boot.PlatformURLConnection.DEBUG) org.eclipse.core.internal.boot.PlatformURLConnection.debugStartup ("Failed to initialize cache");
} else {
throw e;
}
}
}}, "~S,~S,~S,~S");
c$.verifyLocation = Clazz.defineMethod (c$, "verifyLocation", 
($fz = function (location) {
var cacheDir =  new java.io.File (location);
if (cacheDir.exists ()) return true;
return cacheDir.mkdirs ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"os", null,
"ws", null,
"nl", null);
c$.cacheIndex = c$.prototype.cacheIndex =  new java.util.Properties ();
Clazz.defineStatics (c$,
"cacheLocation", null,
"indexName", null,
"filePrefix", null,
"BUF_SIZE", 32768);
c$.NOT_FOUND = c$.prototype.NOT_FOUND =  new Object ();
Clazz.defineStatics (c$,
"CACHE_PROP", ".cache.properties",
"CACHE_LOCATION_PROP", "location",
"CACHE_INDEX_PROP", "index",
"CACHE_PREFIX_PROP", "prefix",
"CACHE_INDEX", ".index.properties");
c$.CACHE_DIR = c$.prototype.CACHE_DIR = ".eclipse-" + "platform" + java.io.File.separator;
Clazz.defineStatics (c$,
"DEBUG", false,
"DEBUG_CONNECT", true,
"DEBUG_CACHE_LOOKUP", true,
"DEBUG_CACHE_COPY", true);
});
