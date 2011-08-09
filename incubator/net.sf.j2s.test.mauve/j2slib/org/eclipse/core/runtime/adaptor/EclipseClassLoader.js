Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader", "org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo"], "org.eclipse.core.runtime.adaptor.EclipseClassLoader", ["java.lang.ClassNotFoundException", "$.Exception", "$.Long", "$.StringBuffer", "$.Thread", "java.util.ArrayList", "$.StringTokenizer", "java.util.jar.Attributes", "$.Manifest", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.core.runtime.internal.stats.ClassloaderStats", "$.ResourceBundleStats", "$.StatsManager", "org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper", "org.eclipse.osgi.framework.internal.core.Msg", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseClassLoader.EclipseClasspathEntry")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.mf = null;
this.initMF = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "EclipseClasspathEntry", org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry, null, Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "getManifest", 
function () {
if (this.initMF) return this.mf;
if (!this.hasPackageInfo ()) {
this.initMF = true;
this.mf = null;
return this.mf;
}var a = this.getBundleFile ().getEntry ("META-INF/MANIFEST.MF");
if (a != null) try {
var b = a.getInputStream ();
this.mf =  new java.util.jar.Manifest (b);
b.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.initMF = true;
return this.mf;
});
Clazz.defineMethod (c$, "hasPackageInfo", 
($fz = function () {
if (this.getBundleFile () === this.b$["org.eclipse.core.runtime.adaptor.EclipseClassLoader"].getHostData ().getBaseBundleFile ()) return (this.b$["org.eclipse.core.runtime.adaptor.EclipseClassLoader"].getHostData ()).$hasPackageInfo;
var a = this.b$["org.eclipse.core.runtime.adaptor.EclipseClassLoader"].getFragClasspaths ();
if (a != null) for (var b = 0; b < a.length; b++) if (this.getBundleFile () === a[b].getBundleData ().getBaseBundleFile ()) return (a[b].getBundleData ()).$hasPackageInfo;

return true;
}, $fz.isPrivate = true, $fz));
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "EclipseClassLoader", org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader);
Clazz.makeConstructor (c$, 
function (delegate, domain, classpath, parent, bundleData) {
Clazz.superConstructor (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, [delegate, domain, classpath, parent, bundleData]);
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,java.security.ProtectionDomain,~A,ClassLoader,org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "findLocalClass", 
function (className) {
if (org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES) org.eclipse.core.runtime.internal.stats.ClassloaderStats.startLoadingClass (this.getClassloaderId (), className);
var found = true;
try {
var bundle = this.hostdata.getBundle ();
if ((bundle.getState () & (49)) != 0) return this.basicFindLocalClass (className);
if (!this.shouldActivateFor (className)) return this.basicFindLocalClass (className);
if (bundle.getState () == 8) {
if (bundle.testStateChanging (Thread.currentThread ()) || bundle.testStateChanging (null)) return this.basicFindLocalClass (className);
if (!bundle.testStateChanging (Thread.currentThread ())) {
var threadChangingState = bundle.getStateChanging ();
if (org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_BUNDLES && threadChangingState != null) {
System.out.println ("Concurrent startup of bundle " + bundle.getSymbolicName () + " by " + Thread.currentThread () + " and " + threadChangingState.getName () + ". Waiting up to 5000ms for " + threadChangingState + " to finish the initialization.");
}var start = System.currentTimeMillis ();
var delay = 5000;
var timeLeft = delay;
while (true) {
try {
Thread.sleep (100);
if (bundle.testStateChanging (null) || timeLeft <= 0) break;
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
timeLeft = start + delay - System.currentTimeMillis ();
}
if (timeLeft <= 0 || bundle.getState () != 32) {
var bundleName = bundle.getSymbolicName () == null ? Long.toString (bundle.getBundleId ()) : bundle.getSymbolicName ();
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_CONCURRENT_STARTUP, [Thread.currentThread ().getName (), className, threadChangingState.getName (), bundleName, Long.toString (delay)]);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0,  new Exception (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_GENERATED_EXCEPTION), null));
}return this.basicFindLocalClass (className);
}}try {
this.hostdata.getBundle ().start ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_ACTIVATION, bundle.getSymbolicName (), Long.toString (bundle.getBundleId ()));
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null));
throw  new ClassNotFoundException (className, e);
} else {
throw e;
}
}
return this.basicFindLocalClass (className);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
found = false;
throw e;
} else {
throw e;
}
} finally {
if (org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES) org.eclipse.core.runtime.internal.stats.ClassloaderStats.endLoadingClass (this.getClassloaderId (), className, found);
}
}, "~S");
Clazz.defineMethod (c$, "basicFindLocalClass", 
function (name) {
return Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "findLocalClass", [name]);
}, "~S");
Clazz.defineMethod (c$, "shouldActivateFor", 
($fz = function (className) {
if (!this.isAutoStartable (className)) return false;
if (this.hostdata.getAdaptor ().isStopping ()) {
var stopper = org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getBundleStopper ();
if (stopper != null && stopper.isStopped (this.hostdata.getBundle ())) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_ALREADY_STOPPED, className, this.hostdata.getSymbolicName ());
throw  new ClassNotFoundException (message);
}}return true;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isAutoStartable", 
($fz = function (className) {
var autoStart = (this.hostdata).isAutoStart ();
var autoStartExceptions = (this.hostdata).getAutoStartExceptions ();
if (autoStartExceptions == null) return autoStart;
var dotPosition = className.lastIndexOf ('.');
if (dotPosition == -1) return autoStart;
var packageName = className.substring (0, dotPosition);
return  new Boolean (autoStart ^ this.contains (autoStartExceptions, packageName)).valueOf ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "contains", 
($fz = function (array, element) {
for (var i = 0; i < array.length; i++) if (array[i].equals (element)) return true;

return false;
}, $fz.isPrivate = true, $fz), "~A,~S");
Clazz.defineMethod (c$, "defineClass", 
function (name, classbytes, off, len, classpathEntry) {
if (!org.eclipse.core.runtime.adaptor.EclipseClassLoader.DEFINE_PACKAGES) return Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "defineClass", [name, classbytes, off, len, classpathEntry]);
var lastIndex = name.lastIndexOf ('.');
if (lastIndex != -1) {
var packageName = name.substring (0, lastIndex);
var pkg = this.getPackage (packageName);
if (pkg == null) {
var specTitle = null;
var specVersion = null;
var specVendor = null;
var implTitle = null;
var implVersion = null;
var implVendor = null;
var mf = (classpathEntry).getManifest ();
if (mf != null) {
var mainAttributes = mf.getMainAttributes ();
var dirName = packageName.$replace ('.', '/') + '/';
var packageAttributes = mf.getAttributes (dirName);
var noEntry = false;
if (packageAttributes == null) {
noEntry = true;
packageAttributes = mainAttributes;
}specTitle = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_TITLE);
if (specTitle == null && !noEntry) specTitle = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_TITLE);
specVersion = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_VERSION);
if (specVersion == null && !noEntry) specVersion = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_VERSION);
specVendor = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_VENDOR);
if (specVendor == null && !noEntry) specVendor = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.SPECIFICATION_VENDOR);
implTitle = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_TITLE);
if (implTitle == null && !noEntry) implTitle = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_TITLE);
implVersion = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_VERSION);
if (implVersion == null && !noEntry) implVersion = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_VERSION);
implVendor = packageAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_VENDOR);
if (implVendor == null && !noEntry) implVendor = mainAttributes.getValue (java.util.jar.Attributes.Attributes.Name.IMPLEMENTATION_VENDOR);
}this.definePackage (packageName, specTitle, specVersion, specVendor, implTitle, implVersion, implVendor, null);
}}return Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "defineClass", [name, classbytes, off, len, classpathEntry]);
}, "~S,~A,~N,~N,org.eclipse.osgi.framework.adaptor.core.DefaultClassLoader.ClasspathEntry");
Clazz.defineMethod (c$, "getClassloaderId", 
($fz = function () {
return this.hostdata.getBundle ().getSymbolicName ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getResource", 
function (name) {
var result = Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "getResource", [name]);
if (org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_RESOURCES) {
if (result != null && name.endsWith (".properties")) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.loadedBundle (this.getClassloaderId (),  new org.eclipse.core.runtime.internal.stats.ResourceBundleStats (this.getClassloaderId (), name, result));
}}return result;
}, "~S");
Clazz.defineMethod (c$, "findClassPathEntry", 
function (result, entry, bundledata, domain) {
var $var = this.hasPrefix (entry);
if ($var != null) {
this.findInternalClassPath ($var, result, entry, bundledata, domain);
return ;
}if (entry.startsWith ("external:")) {
entry = entry.substring ("external:".length);
var cpEntry = this.getExternalClassPath (this.substituteVars (entry), bundledata, domain);
if (cpEntry != null) result.add (cpEntry);
return ;
}Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "findClassPathEntry", [result, entry, bundledata, domain]);
}, "java.util.ArrayList,~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
Clazz.defineMethod (c$, "findInternalClassPath", 
($fz = function ($var, result, entry, bundledata, domain) {
if ($var.equals ("ws")) {
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "findClassPathEntry", [result, "ws/" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getWS () + entry.substring (4), bundledata, domain]);
return ;
}if ($var.equals ("os")) {
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseClassLoader, "findClassPathEntry", [result, "os/" + org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getOS () + entry.substring (4), bundledata, domain]);
return ;
}if ($var.equals ("nl")) {
entry = entry.substring (4);
for (var i = 0; i < org.eclipse.core.runtime.adaptor.EclipseClassLoader.NL_JAR_VARIANTS.length; i++) {
if (this.addClassPathEntry (result, "nl/" + org.eclipse.core.runtime.adaptor.EclipseClassLoader.NL_JAR_VARIANTS[i] + entry, bundledata, domain)) return ;
}
if (!org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.inDevelopmentMode ()) {
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_CLASSPATH_ENTRY_NOT_FOUND_EXCEPTION, entry));
bundledata.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, bundledata.getBundle (), be);
}}}, $fz.isPrivate = true, $fz), "~S,java.util.ArrayList,~S,org.eclipse.osgi.framework.adaptor.core.AbstractBundleData,java.security.ProtectionDomain");
c$.buildNLJarVariants = Clazz.defineMethod (c$, "buildNLJarVariants", 
($fz = function (nl) {
var result =  new java.util.ArrayList ();
nl = nl.$replace ('_', '/');
while (nl.length > 0) {
result.add ("nl/" + nl + "/");
var i = nl.lastIndexOf ('/');
nl = (i < 0) ? "" : nl.substring (0, i);
}
result.add ("");
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "hasPrefix", 
($fz = function (libPath) {
if (libPath.startsWith ("$ws$")) return "ws";
if (libPath.startsWith ("$os$")) return "os";
if (libPath.startsWith ("$nl$")) return "nl";
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "substituteVars", 
($fz = function (cp) {
var buf =  new StringBuffer (cp.length);
var st =  new java.util.StringTokenizer (cp, "$", true);
var varStarted = false;
var $var = null;
while (st.hasMoreElements ()) {
var tok = st.nextToken ();
if ("$".equals (tok)) {
if (!varStarted) {
varStarted = true;
$var = "";
} else {
var prop = null;
if ($var != null && $var.length > 0) prop = System.getProperty ($var);
if (prop != null) buf.append (prop);
 else buf.append ($var == null ? "" : $var);
varStarted = false;
$var = null;
}} else {
if (!varStarted) buf.append (tok);
 else $var = tok;
}}
if ($var != null) buf.append ('$').append ($var);
return buf.toString ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "createClassPathEntry", 
function (bundlefile, domain) {
return Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseClassLoader.EclipseClasspathEntry, this, null, bundlefile, domain);
}, "org.eclipse.osgi.framework.adaptor.core.BundleFile,java.security.ProtectionDomain");
c$.NL_JAR_VARIANTS = c$.prototype.NL_JAR_VARIANTS = org.eclipse.core.runtime.adaptor.EclipseClassLoader.buildNLJarVariants (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getNL ());
Clazz.defineStatics (c$,
"DEFINE_PACKAGES", false,
"VARIABLE_DELIM_STRING", "$",
"VARIABLE_DELIM_CHAR", '$',
"EXTERNAL_LIB_PREFIX", "external:");
{
try {
Class.forName ("java.lang.Package");
($t$ = org.eclipse.core.runtime.adaptor.EclipseClassLoader.DEFINE_PACKAGES = true, org.eclipse.core.runtime.adaptor.EclipseClassLoader.prototype.DEFINE_PACKAGES = org.eclipse.core.runtime.adaptor.EclipseClassLoader.DEFINE_PACKAGES, $t$);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
($t$ = org.eclipse.core.runtime.adaptor.EclipseClassLoader.DEFINE_PACKAGES = false, org.eclipse.core.runtime.adaptor.EclipseClassLoader.prototype.DEFINE_PACKAGES = org.eclipse.core.runtime.adaptor.EclipseClassLoader.DEFINE_PACKAGES, $t$);
} else {
throw e;
}
}
}});
