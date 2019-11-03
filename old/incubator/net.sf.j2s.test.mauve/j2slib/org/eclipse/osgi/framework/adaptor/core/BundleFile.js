Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.osgi.framework.adaptor.core.BundleFile", ["java.io.File", "$.IOException", "java.lang.Long", "$.NullPointerException", "$.StringBuffer", "java.util.Enumeration", "$.NoSuchElementException", "$.Vector", "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor", "$.AdaptorMsg", "$.BundleEntry", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.protocol.bundleresource.Handler", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.basefile = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "BundleFile");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bundledata = null;
this.zipFile = null;
this.closed = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "ZipBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.ZipBundleFile, [a]);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (a)) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTER_FILEEXIST_EXCEPTION, a));
this.bundledata = b;
this.closed = true;
}, "java.io.File,org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "checkedOpen", 
function () {
try {
return this.getZipFile () != null;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var a = this.bundledata;
a.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, a.getBundle (), e);
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "basicOpen", 
function () {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.getZipFile (this.basefile);
});
Clazz.defineMethod (c$, "getZipFile", 
function () {
if (this.closed) {
this.zipFile = this.basicOpen ();
this.closed = false;
}return this.zipFile;
});
Clazz.defineMethod (c$, "getZipEntry", 
($fz = function (a) {
if (a.length > 0 && (a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) a = a.substring (1);
var b = this.zipFile.getEntry (a);
if (b != null && b.getSize () == 0 && !b.isDirectory ()) {
var c = this.zipFile.getEntry (a + '/');
if (c != null) b = c;
}return b;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractDirectory", 
function (a) {
if (!this.checkedOpen ()) return null;
var b = this.zipFile.entries ();
while (b.hasMoreElements ()) {
var c = (b.nextElement ()).getName ();
if (c.startsWith (a) && !c.endsWith ("/")) this.getFile (c);
}
return this.getExtractFile (a);
}, "~S");
Clazz.defineMethod (c$, "getExtractFile", 
($fz = function (a) {
if (!(Clazz.instanceOf (this.bundledata, org.eclipse.osgi.framework.adaptor.core.AbstractBundleData))) return null;
var b = ".cp";
var c = a.$replace ('/', java.io.File.separatorChar);
if ((c.length > 1) && ((c.charAt (0)).charCodeAt (0) == (java.io.File.separatorChar).charCodeAt (0))) b = b.concat (c);
 else b = b + java.io.File.separator + c;
var d = (this.bundledata).getGenerationDir ();
if (d != null) {
var e =  new java.io.File (d, b);
if (e.exists ()) return e;
}var e = (this.bundledata).getParentGenerationDir ();
if (e != null) {
var f =  new java.io.File (e, b);
if (f.exists ()) return f;
}var f = (this.bundledata).createGenerationDir ();
if (f != null && f.exists ()) return  new java.io.File (f, b);
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getFile", 
function (a) {
if (!this.checkedOpen ()) return null;
var b = this.getZipEntry (a);
if (b == null) {
return null;
}try {
var c = this.getExtractFile (b.getName ());
if (c != null) {
if (c.exists ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("File already present: " + c.getPath ());
}} else {
if (b.getName ().endsWith ("/")) {
if (!c.mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create directory: " + c.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, c.getAbsolutePath ()));
}this.extractDirectory (b.getName ());
} else {
var d = this.zipFile.getInputStream (b);
if (d == null) return null;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Creating file: " + c.getPath ());
}var e =  new java.io.File (c.getParent ());
if (!e.exists () && !e.mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create directory: " + e.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, e.getAbsolutePath ()));
}org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile (d, c);
}}return c;
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "containsDir", 
function (a) {
if (!this.checkedOpen ()) return false;
if (a == null) return false;
if (a.length == 0) return true;
if ((a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) {
if (a.length == 1) return true;
a = a.substring (1);
}if (a.length > 0 && (a.charAt (a.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) a = a + '/';
var b = this.zipFile.entries ();
var c;
var d;
while (b.hasMoreElements ()) {
c = b.nextElement ();
d = c.getName ();
if (d.startsWith (a)) {
return true;
}}
return false;
}, "~S");
Clazz.overrideMethod (c$, "getEntry", 
function (a) {
if (!this.checkedOpen ()) return null;
var b = this.getZipEntry (a);
if (b == null) {
if (a.length == 0 || (a.charAt (a.length - 1)).charCodeAt (0) == ('/').charCodeAt (0)) {
if (this.containsDir (a)) return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.DirZipBundleEntry (this, a);
}return null;
}return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.ZipBundleEntry (b, this);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (a) {
if (!this.checkedOpen ()) return null;
if (a == null) {
throw  new NullPointerException ();
}if (a.length > 0 && (a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) {
a = a.substring (1);
}if (a.length > 0 && (a.charAt (a.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) {
a =  new StringBuffer (a).append ("/").toString ();
}var b =  new java.util.Vector ();
var c = this.zipFile.entries ();
while (c.hasMoreElements ()) {
var d = c.nextElement ();
var e = d.getName ();
if (e.startsWith (a)) {
if (a.length < e.length) {
if (e.lastIndexOf ('/') < a.length) {
b.add (e);
} else {
e = e.substring (a.length);
var f = e.indexOf ('/');
e = a + e.substring (0, f + 1);
if (!b.contains (e)) {
b.add (e);
}}}}}
return b.size () == 0 ? null : b.elements ();
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
if (!this.closed) {
this.closed = true;
this.zipFile.close ();
}});
Clazz.overrideMethod (c$, "open", 
function () {
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor.core.BundleFile, "DirBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile, [a]);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (a) || !org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (a)) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_EXCEPTION, a));
}}, "java.io.File");
Clazz.overrideMethod (c$, "getFile", 
function (a) {
var b =  new java.io.File (this.basefile, a);
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (b)) {
return b;
}return null;
}, "~S");
Clazz.overrideMethod (c$, "getEntry", 
function (a) {
var b =  new java.io.File (this.basefile, a);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (b)) {
return null;
}return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.FileBundleEntry (b, a);
}, "~S");
Clazz.overrideMethod (c$, "containsDir", 
function (a) {
var b =  new java.io.File (this.basefile, a);
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (b) && org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (b);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (a) {
var b =  new java.io.File (this.basefile, a);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (b)) return null;
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (b)) {
var c = org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.list (b);
if (c == null || c.length == 0) return null;
var d = a.length == 0 || (a.charAt (a.length - 1)).charCodeAt (0) == ('/').charCodeAt (0) ? a : a + '/';
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cur = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "DirBundleFile$1", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.f$.c != null && this.cur < this.f$.c.length;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (!this.hasMoreElements ()) {
throw  new java.util.NoSuchElementException ();
}var e =  new java.io.File (this.f$.b, this.f$.c[this.cur]);
var f =  new StringBuffer (this.f$.d).append (this.f$.c[this.cur++]);
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (e)) {
f.append ("/");
}return f.toString ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile$1, i$, v$);
}) (this, Clazz.cloneFinals ("c", c, "b", b, "d", d));
}return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile$2")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cur = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "DirBundleFile$2", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.cur < 1;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (this.cur == 0) {
this.cur = 1;
return this.f$.a;
}throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile$2, i$, v$);
}) (this, Clazz.cloneFinals ("a", a));
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.overrideMethod (c$, "open", 
function () {
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.baseBundleFile = null;
this.cp = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "NestedDirBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.NestedDirBundleFile, [a.basefile]);
this.baseBundleFile = a;
this.cp = b;
if ((b.charAt (b.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) {
this.cp = this.cp + '/';
}}, "org.eclipse.osgi.framework.adaptor.core.BundleFile,~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.defineMethod (c$, "getEntry", 
function (a) {
if (a.length > 0 && (a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) a = a.substring (1);
var b =  new StringBuffer (this.cp).append (a).toString ();
return this.baseBundleFile.getEntry (b);
}, "~S");
Clazz.defineMethod (c$, "containsDir", 
function (a) {
if (a == null) return false;
if (a.length > 0 && (a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) a = a.substring (1);
var b =  new StringBuffer (this.cp).append (a).toString ();
return this.baseBundleFile.containsDir (b);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (a) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getFile", 
function (a) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "open", 
function () {
});
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (basefile) {
this.basefile = basefile;
}, "java.io.File");
Clazz.defineMethod (c$, "getResourceURL", 
function (path, hostBundleID) {
return this.getResourceURL (path, hostBundleID, 0);
}, "~S,~N");
Clazz.defineMethod (c$, "getResourceURL", 
function (path, hostBundleID, index) {
var bundleEntry = this.getEntry (path);
if (bundleEntry == null) return null;
if (path.length == 0 || (path.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0)) path = '/' + path;
try {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.getURL ("bundleresource", Long.toString (hostBundleID), index, path,  new org.eclipse.osgi.framework.internal.protocol.bundleresource.Handler (bundleEntry));
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getBaseFile", 
function () {
return this.basefile;
});
c$.secureAction = c$.prototype.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
});
