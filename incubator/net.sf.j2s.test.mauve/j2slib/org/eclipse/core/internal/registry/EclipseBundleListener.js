Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.osgi.framework.SynchronousBundleListener"], "org.eclipse.core.internal.registry.EclipseBundleListener", ["javax.xml.parsers.SAXParserFactory", "org.eclipse.core.internal.registry.Contribution", "$.ExtensionsParser", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "$.ResourceTranslator", "org.eclipse.core.runtime.MultiStatus", "$.Status", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.util.tracker.ServiceTracker", "org.xml.sax.InputSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.registry = null;
this.xmlTracker = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "EclipseBundleListener", null, org.osgi.framework.SynchronousBundleListener);
Clazz.makeConstructor (c$, 
function (registry) {
this.registry = registry;
this.xmlTracker =  new org.osgi.util.tracker.ServiceTracker (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleContext (), javax.xml.parsers.SAXParserFactory.getName (), null);
this.xmlTracker.open ();
}, "org.eclipse.core.internal.registry.ExtensionRegistry");
Clazz.overrideMethod (c$, "bundleChanged", 
function (event) {
var bundle = event.getBundle ();
switch (event.getType ()) {
case 32:
this.addBundle (bundle);
break;
case 64:
this.removeBundle (bundle);
break;
}
}, "org.osgi.framework.BundleEvent");
Clazz.defineMethod (c$, "processBundles", 
function (bundles) {
for (var i = 0; i < bundles.length; i++) {
if (this.isBundleResolved (bundles[i])) this.addBundle (bundles[i]);
 else this.removeBundle (bundles[i]);
}
}, "~A");
Clazz.defineMethod (c$, "isBundleResolved", 
($fz = function (bundle) {
return (bundle.getState () & (60)) != 0;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "removeBundle", 
($fz = function (bundle) {
this.registry.remove (bundle.getBundleId ());
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "addBundle", 
($fz = function (bundle) {
if (this.registry.hasNamespace (bundle.getBundleId ())) return ;
var bundleModel = this.getBundleModel (bundle);
if (bundleModel == null) return ;
if ("org.eclipse.core.runtime".equals (bundleModel.getNamespace ())) org.eclipse.core.internal.runtime.Messages.reloadMessages ();
this.registry.add (bundleModel);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "isSingleton", 
($fz = function (bundle) {
var allHeaders = bundle.getHeaders ("");
var symbolicNameHeader = allHeaders.get ("Bundle-SymbolicName");
try {
if (symbolicNameHeader != null) {
var symbolicNameElements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-SymbolicName", symbolicNameHeader);
if (symbolicNameElements.length > 0) {
var singleton = symbolicNameElements[0].getDirective ("singleton");
if (singleton == null) singleton = symbolicNameElements[0].getAttribute ("singleton");
if (!"true".equalsIgnoreCase (singleton)) {
var status = 1;
var manifestVersion = allHeaders.get ("Bundle-ManifestVersion");
if (manifestVersion == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (symbolicNameElements[0].getValue ()) === bundle) {
return true;
}status = 4;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY || status == 4) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_nonSingleton, bundle.getLocation ());
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (status, "org.eclipse.core.runtime", 0, message, null));
}return false;
}}}} catch (e1) {
if (Clazz.instanceOf (e1, org.osgi.framework.BundleException)) {
} else {
throw e1;
}
}
return true;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getBundleModel", 
($fz = function (bundle) {
if (bundle.getBundleId () == 0) return null;
if (bundle.getSymbolicName () == null) return null;
if (!this.isSingleton (bundle)) return null;
var isFragment = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().isFragment (bundle);
if (isFragment) {
var hosts = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getHosts (bundle);
if (hosts != null && this.isSingleton (hosts[0]) == false) return null;
}var is = null;
var manifestType = null;
var manifestName = isFragment ? "fragment.xml" : "plugin.xml";
try {
var url = bundle.getEntry (manifestName);
if (url != null) {
is = url.openStream ();
manifestType = isFragment ? "fragment" : "plugin";
}} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
is = null;
} else {
throw ex;
}
}
if (is == null) return null;
try {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_problems, bundle.getLocation ());
var problems =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 1, message, null);
var b = null;
try {
b = org.eclipse.core.internal.runtime.ResourceTranslator.getResourceBundle (bundle);
} catch (e) {
if (Clazz.instanceOf (e, java.util.MissingResourceException)) {
} else {
throw e;
}
}
var parser =  new org.eclipse.core.internal.registry.ExtensionsParser (problems);
var bundleModel =  new org.eclipse.core.internal.registry.Contribution (bundle);
parser.parseManifest (this.xmlTracker,  new org.xml.sax.InputSource (is), manifestType, manifestName, this.registry.getObjectManager (), bundleModel, b);
if (problems.getSeverity () != 0) org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (problems);
return bundleModel;
} catch (e$$) {
if (Clazz.instanceOf (e$$, javax.xml.parsers.ParserConfigurationException)) {
var e = e$$;
{
this.logParsingError (bundle, e);
return null;
}
} else if (Clazz.instanceOf (e$$, org.xml.sax.SAXException)) {
var e = e$$;
{
this.logParsingError (bundle, e);
return null;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
this.logParsingError (bundle, e);
return null;
}
} else {
throw e$$;
}
} finally {
try {
is.close ();
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
} else {
throw ioe;
}
}
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "logParsingError", 
($fz = function (bundle, e) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_failedParsingManifest, bundle.getLocation ());
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 0, message, e));
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,Exception");
Clazz.defineStatics (c$,
"PLUGIN_MANIFEST", "plugin.xml",
"FRAGMENT_MANIFEST", "fragment.xml");
});
