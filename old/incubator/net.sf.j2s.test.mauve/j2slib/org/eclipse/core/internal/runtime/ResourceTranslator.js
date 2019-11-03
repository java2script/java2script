Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.ResourceTranslator", ["java.net.URLClassLoader", "java.util.ArrayList", "$.Locale", "$.ResourceBundle", "org.eclipse.core.internal.runtime.DevClassPathHelper", "$.InternalPlatform", "org.eclipse.osgi.service.localization.BundleLocalization", "org.eclipse.osgi.util.ManifestElement"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "ResourceTranslator");
c$.getResourceString = Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value) {
return org.eclipse.core.internal.runtime.ResourceTranslator.getResourceString (bundle, value, null);
}, "org.osgi.framework.Bundle,~S");
c$.getResourceString = Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value, resourceBundle) {
var s = value.trim ();
if (!s.startsWith ("%", 0)) return s;
if (s.startsWith ("%%", 0)) return s.substring (1);
var ix = s.indexOf (' ');
var key = ix == -1 ? s : s.substring (0, ix);
var dflt = ix == -1 ? s : s.substring (ix + 1);
if (resourceBundle == null && bundle != null) {
try {
resourceBundle = org.eclipse.core.internal.runtime.ResourceTranslator.getResourceBundle (bundle);
} catch (e) {
if (Clazz.instanceOf (e, java.util.MissingResourceException)) {
} else {
throw e;
}
}
}if (resourceBundle == null) return dflt;
try {
return resourceBundle.getString (key.substring (1));
} catch (e) {
if (Clazz.instanceOf (e, java.util.MissingResourceException)) {
return dflt;
} else {
throw e;
}
}
}, "org.osgi.framework.Bundle,~S,java.util.ResourceBundle");
c$.start = Clazz.defineMethod (c$, "start", 
function () {
var context = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ();
($t$ = org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().getServiceReference (org.eclipse.osgi.service.localization.BundleLocalization.getName ()), org.eclipse.core.internal.runtime.ResourceTranslator.prototype.localizationServiceReference = org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference, $t$);
if (org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.ResourceTranslator.localizationService = context.getService (org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference), org.eclipse.core.internal.runtime.ResourceTranslator.prototype.localizationService = org.eclipse.core.internal.runtime.ResourceTranslator.localizationService, $t$);
});
c$.stop = Clazz.defineMethod (c$, "stop", 
function () {
if (org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.ResourceTranslator.localizationService = null, org.eclipse.core.internal.runtime.ResourceTranslator.prototype.localizationService = org.eclipse.core.internal.runtime.ResourceTranslator.localizationService, $t$);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext ().ungetService (org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference);
($t$ = org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference = null, org.eclipse.core.internal.runtime.ResourceTranslator.prototype.localizationServiceReference = org.eclipse.core.internal.runtime.ResourceTranslator.localizationServiceReference, $t$);
});
c$.getResourceBundle = Clazz.defineMethod (c$, "getResourceBundle", 
function (bundle) {
if (org.eclipse.core.internal.runtime.ResourceTranslator.hasRuntime21 (bundle)) return java.util.ResourceBundle.getBundle ("plugin", java.util.Locale.getDefault (), org.eclipse.core.internal.runtime.ResourceTranslator.createTempClassloader (bundle));
return org.eclipse.core.internal.runtime.ResourceTranslator.localizationService.getLocalization (bundle, null);
}, "org.osgi.framework.Bundle");
c$.hasRuntime21 = Clazz.defineMethod (c$, "hasRuntime21", 
($fz = function (b) {
try {
var prereqs = org.eclipse.osgi.util.ManifestElement.parseHeader ("Require-Bundle", b.getHeaders ("").get ("Require-Bundle"));
if (prereqs == null) return false;
for (var i = 0; i < prereqs.length; i++) {
if ("2.1".equals (prereqs[i].getAttribute ("bundle-version")) && "org.eclipse.core.runtime".equals (prereqs[i].getValue ())) {
return true;
}}
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
return false;
} else {
throw e;
}
}
return false;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
c$.createTempClassloader = Clazz.defineMethod (c$, "createTempClassloader", 
($fz = function (b) {
var classpath =  new java.util.ArrayList ();
org.eclipse.core.internal.runtime.ResourceTranslator.addClasspathEntries (b, classpath);
org.eclipse.core.internal.runtime.ResourceTranslator.addBundleRoot (b, classpath);
org.eclipse.core.internal.runtime.ResourceTranslator.addDevEntries (b, classpath);
org.eclipse.core.internal.runtime.ResourceTranslator.addFragments (b, classpath);
var urls =  new Array (classpath.size ());
return  new java.net.URLClassLoader (classpath.toArray (urls));
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
c$.addFragments = Clazz.defineMethod (c$, "addFragments", 
($fz = function (host, classpath) {
var fragments = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFragments (host);
if (fragments == null) return ;
for (var i = 0; i < fragments.length; i++) {
org.eclipse.core.internal.runtime.ResourceTranslator.addClasspathEntries (fragments[i], classpath);
org.eclipse.core.internal.runtime.ResourceTranslator.addDevEntries (fragments[i], classpath);
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,java.util.ArrayList");
c$.addClasspathEntries = Clazz.defineMethod (c$, "addClasspathEntries", 
($fz = function (b, classpath) {
var classpathElements;
try {
classpathElements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-ClassPath", b.getHeaders ("").get ("Bundle-ClassPath"));
if (classpathElements == null) return ;
for (var i = 0; i < classpathElements.length; i++) {
var classpathEntry = b.getEntry (classpathElements[i].getValue ());
if (classpathEntry != null) classpath.add (classpathEntry);
}
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,java.util.ArrayList");
c$.addBundleRoot = Clazz.defineMethod (c$, "addBundleRoot", 
($fz = function (b, classpath) {
classpath.add (b.getEntry ("/"));
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,java.util.ArrayList");
c$.addDevEntries = Clazz.defineMethod (c$, "addDevEntries", 
($fz = function (b, classpath) {
if (!org.eclipse.core.internal.runtime.DevClassPathHelper.inDevelopmentMode ()) return ;
var binaryPaths = org.eclipse.core.internal.runtime.DevClassPathHelper.getDevClassPath (b.getSymbolicName ());
for (var i = 0; i < binaryPaths.length; i++) {
var classpathEntry = b.getEntry (binaryPaths[i]);
if (classpathEntry != null) classpath.add (classpathEntry);
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,java.util.ArrayList");
Clazz.defineStatics (c$,
"KEY_PREFIX", "%",
"KEY_DOUBLE_PREFIX", "%%",
"localizationServiceReference", null,
"localizationService", null);
});
