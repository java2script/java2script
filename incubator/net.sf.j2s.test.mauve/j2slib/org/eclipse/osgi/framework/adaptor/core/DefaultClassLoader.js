Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["java.security.ProtectionDomain", "org.eclipse.osgi.framework.adaptor.core.AbstractClassLoader"], "org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader", ["java.io.File", "java.lang.ClassNotFoundException", "java.security.AllPermission", "$.CodeSource", "java.util.ArrayList", "$.Vector", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "$.BundleFile", "$.DevClassPathHelper", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hostdata = null;
this.classpathEntries = null;
this.fragClasspaths = null;
this.buffersize = 8192;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.FragmentClasspath")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.classpathEntries = null;
this.bundledata = null;
this.domain = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader, "FragmentClasspath");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.classpathEntries = a;
this.bundledata = b;
this.domain = c;
}, "~A,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "close", 
function () {
for (var a = 0; a < this.classpathEntries.length; a++) {
try {
this.classpathEntries[a].getBundleFile ().close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.bundledata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, this.bundledata.getBundle (), e);
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "getBundleData", 
function () {
return this.bundledata;
});
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bundlefile = null;
this.domain = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader, "ClasspathEntry");
Clazz.makeConstructor (c$, 
function (a, b) {
this.bundlefile = a;
this.domain = this.createProtectionDomain (b);
}, "org.eclipse.osgi.framework.adaptor.core.BundleFile,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "getBundleFile", 
function () {
return this.bundlefile;
});
Clazz.defineMethod (c$, "getProtectionDomain", 
function () {
return this.domain;
});
Clazz.defineMethod (c$, "createProtectionDomain", 
function (a) {
try {
var b;
if (a != null) b = a.getPermissions ();
 else b = org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ALLPERMISSIONS;
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathDomain, this, null, this.bundlefile.getBaseFile ().toURL (), b);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return a;
} else {
throw e;
}
}
}, "java.security.ProtectionDomain");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathDomain")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader, "ClasspathDomain", java.security.ProtectionDomain);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathDomain, [ new java.security.CodeSource (a, Clazz.castNullAs ("Array")), b]);
}, "java.net.URL,java.security.PermissionCollection");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "DefaultClassLoader", org.eclipse.osgi.framework.adaptor.core.AbstractClassLoader);
Clazz.makeConstructor (c$, 
function (delegate, domain, classpath, parent, bundledata) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader, [delegate, domain, classpath, parent]);
this.hostdata = bundledata;
try {
this.hostdata.open ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.hostdata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, this.hostdata.getBundle (), e);
} else {
throw e;
}
}
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,java.security.ProtectionDomain,~A,ClassLoader,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData");
Clazz.overrideMethod (c$, "initialize", 
function () {
this.classpathEntries = this.buildClasspath (this.hostclasspath, this.hostdata, this.hostdomain);
});
Clazz.overrideMethod (c$, "attachFragment", 
function (bundledata, domain, classpath) {
var abstractbundledata = bundledata;
try {
bundledata.open ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
abstractbundledata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, abstractbundledata.getBundle (), e);
} else {
throw e;
}
}
var fragEntries = this.buildClasspath (classpath, abstractbundledata, domain);
var fragClasspath = Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.FragmentClasspath, this, null, fragEntries, abstractbundledata, domain);
this.insertFragment (fragClasspath);
}, "org.eclipse.osgi.framework.adaptor.BundleData,java.security.ProtectionDomain,~A");
Clazz.defineMethod (c$, "insertFragment", 
function (fragClasspath) {
if (this.fragClasspaths == null) {
this.fragClasspaths =  new java.util.Vector (10);
this.fragClasspaths.addElement (fragClasspath);
return ;
}var size = this.fragClasspaths.size ();
var fragID = fragClasspath.bundledata.getBundleID ();
for (var i = 0; i < size; i++) {
var otherID = (this.fragClasspaths.elementAt (i)).bundledata.getBundleID ();
if (fragID < otherID) {
this.fragClasspaths.insertElementAt (fragClasspath, i);
return ;
}}
this.fragClasspaths.addElement (fragClasspath);
}, "org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.FragmentClasspath");
Clazz.defineMethod (c$, "getBundleSymbolicName", 
function () {
return this.hostdata.getSymbolicName () + "_" + this.hostdata.getVersion ();
});
Clazz.defineMethod (c$, "getHostData", 
function () {
return this.hostdata;
});
Clazz.defineMethod (c$, "getFragClasspaths", 
function () {
if (this.fragClasspaths == null) return null;
return this.fragClasspaths.toArray ( new Array (this.fragClasspaths.size ()));
});
Clazz.defineMethod (c$, "getClasspath", 
function (cp, bundledata, domain) {
var bundlefile = null;
var file;
if ((file = bundledata.getBaseBundleFile ().getFile (cp)) != null) bundlefile = this.createBundleFile (file, bundledata);
if (bundlefile == null && bundledata.getBaseBundleFile ().containsDir (cp)) bundlefile =  new org.eclipse.osgi.framework.adaptor.core.BundleFile.NestedDirBundleFile (bundledata.getBaseBundleFile (), cp);
if (bundlefile == null && org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.inDevelopmentMode ()) return this.getExternalClassPath (cp, bundledata, domain);
if (bundlefile != null) return this.createClassPathEntry (bundlefile, domain);
return null;
}, "~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "getExternalClassPath", 
function (cp, bundledata, domain) {
var file =  new java.io.File (cp);
if (!file.isAbsolute ()) return null;
var bundlefile = this.createBundleFile (file, bundledata);
if (bundlefile != null) return this.createClassPathEntry (bundlefile, domain);
return null;
}, "~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "createBundleFile", 
function (file, bundledata) {
if (file == null || !file.exists ()) return null;
try {
return this.hostdata.getAdaptor ().createBundleFile (file, bundledata);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
bundledata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, bundledata.getBundle (), e);
} else {
throw e;
}
}
return null;
}, "java.io.File,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData");
Clazz.overrideMethod (c$, "findClass", 
function (name) {
var result = this.findLoadedClass (name);
if (result != null) return result;
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
result = this.findClassImpl (name, this.classpathEntries[i]);
if (result != null) return result;
}}
if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
for (var j = 0; j < fragCP.classpathEntries.length; j++) {
result = this.findClassImpl (name, fragCP.classpathEntries[j]);
if (result != null) return result;
}
}
}throw  new ClassNotFoundException (name);
}, "~S");
Clazz.defineMethod (c$, "findClassImpl", 
function (name, classpathEntry) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.hostdata + "].findClass(" + name + ")");
}var filename = name.$replace ('.', '/').concat (".class");
var entry = classpathEntry.getBundleFile ().getEntry (filename);
if (entry == null) {
return null;
}var $in;
try {
$in = entry.getInputStream ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
var length = entry.getSize ();
var classbytes;
var bytesread = 0;
var readcount;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  about to read " + length + " bytes from " + filename);
}try {
try {
if (length > 0) {
classbytes =  Clazz.newArray (length, 0);
readloop : for (; bytesread < length; bytesread += readcount) {
readcount = $in.read (classbytes, bytesread, length - bytesread);
if (readcount <= 0) {
break readloop;
}}
} else {
length = this.buffersize;
classbytes =  Clazz.newArray (length, 0);
readloop : while (true) {
for (; bytesread < length; bytesread += readcount) {
readcount = $in.read (classbytes, bytesread, length - bytesread);
if (readcount <= 0) {
break readloop;
}}
var oldbytes = classbytes;
length += this.buffersize;
classbytes =  Clazz.newArray (length, 0);
System.arraycopy (oldbytes, 0, classbytes, 0, bytesread);
}
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  IOException reading " + filename + " from " + this.hostdata);
}return null;
} else {
throw e;
}
}
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  read " + bytesread + " bytes from " + filename);
org.eclipse.osgi.framework.debug.Debug.println ("  defining class " + name);
}try {
return (this.defineClass (name, classbytes, 0, bytesread, classpathEntry));
} catch (e) {
if (Clazz.instanceOf (e, Error)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  error defining class " + name);
}throw e;
} else {
throw e;
}
}
}, "~S,org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry");
Clazz.defineMethod (c$, "defineClass", 
function (name, classbytes, off, len, classpathEntry) {
if (name != null && name.startsWith ("java.")) {
name = null;
}return this.defineClass (name, classbytes, off, len, classpathEntry.getProtectionDomain ());
}, "~S,~A,~N,~N,org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry");
Clazz.overrideMethod (c$, "findResource", 
function (name) {
var result = null;
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
result = this.findResourceImpl (name, this.classpathEntries[i].getBundleFile ());
if (result != null) return result;
}}
if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
for (var j = 0; j < fragCP.classpathEntries.length; j++) {
result = this.findResourceImpl (name, fragCP.classpathEntries[j].getBundleFile ());
if (result != null) return result;
}
}
}return null;
}, "~S");
Clazz.defineMethod (c$, "findResourceImpl", 
function (name, bundlefile) {
return this.findResourceImpl (name, bundlefile, 0);
}, "~S,org.eclipse.osgi.framework.adaptor.core.BundleFile");
Clazz.defineMethod (c$, "findResourceImpl", 
function (name, bundlefile, index) {
return bundlefile.getResourceURL (name, this.hostdata.getBundleID (), index);
}, "~S,org.eclipse.osgi.framework.adaptor.core.BundleFile,~N");
Clazz.overrideMethod (c$, "findLocalResources", 
function (resource) {
var resources =  new java.util.Vector (6);
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
var url = this.findResourceImpl (resource, this.classpathEntries[i].getBundleFile (), resources.size ());
if (url != null) resources.addElement (url);
}}
if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
for (var j = 0; j < fragCP.classpathEntries.length; j++) {
var url = this.findResourceImpl (resource, fragCP.classpathEntries[j].getBundleFile (), resources.size ());
if (url != null) resources.addElement (url);
}
}
}if (resources.size () > 0) return resources.elements ();
return null;
}, "~S");
Clazz.overrideMethod (c$, "findLocalObject", 
function (object) {
var result = null;
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
result = this.findObjectImpl (object, this.classpathEntries[i].getBundleFile ());
if (result != null) {
return result;
}}}
if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
for (var j = 0; j < fragCP.classpathEntries.length; j++) {
result = this.findObjectImpl (object, fragCP.classpathEntries[j].getBundleFile ());
if (result != null) {
return result;
}}
}
}return null;
}, "~S");
Clazz.overrideMethod (c$, "findLocalObjects", 
function (object) {
var objects =  new java.util.Vector (6);
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
var result = this.findObjectImpl (object, this.classpathEntries[i].getBundleFile ());
if (result != null) objects.addElement (result);
}}
if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
for (var j = 0; j < fragCP.classpathEntries.length; j++) {
var result = this.findObjectImpl (object, fragCP.classpathEntries[j].getBundleFile ());
if (result != null) objects.addElement (result);
}
}
}if (objects.size () > 0) return objects.elements ();
return null;
}, "~S");
Clazz.defineMethod (c$, "findObjectImpl", 
function (object, bundleFile) {
return bundleFile.getEntry (object);
}, "~S,org.eclipse.osgi.framework.adaptor.core.BundleFile");
Clazz.defineMethod (c$, "close", 
function () {
Clazz.superCall (this, org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader, "close", []);
if (this.classpathEntries != null) {
for (var i = 0; i < this.classpathEntries.length; i++) {
if (this.classpathEntries[i] != null) {
try {
this.classpathEntries[i].getBundleFile ().close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.hostdata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, this.hostdata.getBundle (), e);
} else {
throw e;
}
}
}}
}if (this.fragClasspaths != null) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
fragCP.close ();
}
}});
Clazz.defineMethod (c$, "buildClasspath", 
function (classpath, bundledata, domain) {
var result =  new java.util.ArrayList (classpath.length);
this.addDefaultDevEntries (result, bundledata, domain);
for (var i = 0; i < classpath.length; i++) this.findClassPathEntry (result, classpath[i], bundledata, domain);

return result.toArray ( new Array (result.size ()));
}, "~A,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "addDefaultDevEntries", 
function (result, bundledata, domain) {
var devClassPath = !org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.inDevelopmentMode () ? null : org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (bundledata.getSymbolicName ());
if (devClassPath == null) return ;
for (var i = 0; i < devClassPath.length; i++) this.findClassPathEntry (result, devClassPath[i], bundledata, domain);

}, "java.util.ArrayList,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "findClassPathEntry", 
function (result, entry, bundledata, domain) {
if (!this.addClassPathEntry (result, entry, bundledata, domain)) {
var devCP = !org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.inDevelopmentMode () ? null : org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (bundledata.getSymbolicName ());
if (devCP == null || devCP.length == 0) {
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.BUNDLE_CLASSPATH_ENTRY_NOT_FOUND_EXCEPTION, entry, bundledata.getLocation ()));
bundledata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (32, bundledata.getBundle (), be);
}}}, "java.util.ArrayList,~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "addClassPathEntry", 
function (result, entry, bundledata, domain) {
if (entry.equals (".")) {
result.add (this.createClassPathEntry (bundledata.getBaseBundleFile (), domain));
return true;
}var element = this.getClasspath (entry, bundledata, domain);
if (element != null) {
result.add (element);
return true;
}if (this.fragClasspaths != null && this.hostdata === bundledata) {
var size = this.fragClasspaths.size ();
for (var i = 0; i < size; i++) {
var fragCP = this.fragClasspaths.elementAt (i);
element = this.getClasspath (entry, fragCP.bundledata, fragCP.domain);
if (element != null) {
result.add (element);
return true;
}}
}return false;
}, "java.util.ArrayList,~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "createClassPathEntry", 
function (bundlefile, domain) {
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry, this, null, bundlefile, domain);
}, "org.eclipse.osgi.framework.adaptor.core.BundleFile,java.security.ProtectionDomain");
Clazz.defineStatics (c$,
"ALLPERMISSIONS", null);
{
var allPerm =  new java.security.AllPermission ();
($t$ = org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ALLPERMISSIONS = allPerm.newPermissionCollection (), org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.prototype.ALLPERMISSIONS = org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ALLPERMISSIONS, $t$);
if (org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ALLPERMISSIONS != null) org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ALLPERMISSIONS.add (allPerm);
}});
