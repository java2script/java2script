Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.EclipsePreferences", "java.util.HashSet", "org.eclipse.core.runtime.Path"], "org.eclipse.core.internal.preferences.DefaultPreferences", ["java.io.BufferedInputStream", "$.FileInputStream", "java.net.URL", "java.util.Properties", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "$.Policy", "org.eclipse.core.runtime.Platform", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.loadLevel = null;
this.qualifier = null;
this.segmentCount = 0;
this.plugin = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "DefaultPreferences", org.eclipse.core.internal.preferences.EclipsePreferences);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
($fz = function (parent, name, context) {
this.construct (parent, name);
this.plugin = context;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
Clazz.makeConstructor (c$, 
($fz = function (parent, name) {
Clazz.superConstructor (this, org.eclipse.core.internal.preferences.DefaultPreferences, [parent, name]);
if (Clazz.instanceOf (parent, org.eclipse.core.internal.preferences.DefaultPreferences)) this.plugin = (parent).plugin;
var path = this.absolutePath ();
this.segmentCount = org.eclipse.core.internal.preferences.EclipsePreferences.getSegmentCount (path);
if (this.segmentCount < 2) return ;
this.qualifier = org.eclipse.core.internal.preferences.EclipsePreferences.getSegment (path, 1);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.preferences.EclipsePreferences,~S");
Clazz.defineMethod (c$, "applyBundleDefaults", 
($fz = function () {
var bundle = org.eclipse.core.runtime.Platform.getBundle (this.name ());
if (bundle == null) return ;
var url = org.eclipse.core.runtime.Platform.find (bundle,  new org.eclipse.core.runtime.Path ("preferences.ini"));
if (url == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Preference default override file not found for bundle: " + bundle.getSymbolicName ());
return ;
}var transURL = org.eclipse.core.runtime.Platform.find (bundle, org.eclipse.core.internal.preferences.DefaultPreferences.NL_DIR.append ("preferences").addFileExtension ("properties"));
if (transURL == null && org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Preference translation file not found for bundle: " + bundle.getSymbolicName ());
this.applyDefaults (this.name (), this.loadProperties (url), this.loadProperties (transURL));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyCommandLineDefaults", 
($fz = function () {
if (org.eclipse.core.internal.preferences.DefaultPreferences.commandLineCustomization == null) {
var filename = org.eclipse.core.internal.runtime.InternalPlatform.pluginCustomizationFile;
if (filename == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Command-line preferences customization file not specified.");
return ;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Using command-line preference customization file: " + filename);
($t$ = org.eclipse.core.internal.preferences.DefaultPreferences.commandLineCustomization = this.loadProperties (filename), org.eclipse.core.internal.preferences.DefaultPreferences.prototype.commandLineCustomization = org.eclipse.core.internal.preferences.DefaultPreferences.commandLineCustomization, $t$);
}this.applyDefaults (null, org.eclipse.core.internal.preferences.DefaultPreferences.commandLineCustomization, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyDefaults", 
($fz = function (id, defaultValues, translations) {
for (var e = defaultValues.keys (); e.hasMoreElements (); ) {
var fullKey = e.nextElement ();
var value = defaultValues.getProperty (fullKey);
if (value == null) continue ;var childPath =  new org.eclipse.core.runtime.Path (fullKey);
var key = childPath.lastSegment ();
childPath = childPath.removeLastSegments (1);
var localQualifier = id;
if (id == null) {
localQualifier = childPath.segment (0);
childPath = childPath.removeFirstSegments (1);
}if (this.name ().equals (localQualifier)) {
value = this.translatePreference (value, translations);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET) org.eclipse.core.internal.runtime.Policy.debug ("Setting default preference: " + ( new org.eclipse.core.runtime.Path (this.absolutePath ()).append (childPath).append (key)) + '=' + value);
(this.internalNode (childPath.toString (), false, null)).internalPut (key, value);
}}
}, $fz.isPrivate = true, $fz), "~S,java.util.Properties,java.util.Properties");
Clazz.defineMethod (c$, "runInitializer", 
($fz = function (element) {
var initializer = null;
try {
initializer = element.createExecutableExtension ("class");
initializer.initializeDefaultPreferences ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassCastException)) {
var e = e$$;
{
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.core.internal.runtime.Messages.preferences_invalidExtensionSuperclass, e);
org.eclipse.core.internal.preferences.EclipsePreferences.log (status);
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
org.eclipse.core.internal.preferences.EclipsePreferences.log (e.getStatus ());
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "node", 
function (childName, context) {
return this.internalNode (childName, true, context);
}, "~S,org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "applyRuntimeDefaults", 
($fz = function () {
var point = org.eclipse.core.runtime.Platform.getExtensionRegistry ().getExtensionPoint ("org.eclipse.core.runtime", "preferences");
if (point == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("No extensions for org.eclipse.core.runtime.preferences extension point. Skipping runtime default preference customization.");
return ;
}var extensions = point.getExtensions ();
var foundInitializer = false;
for (var i = 0; i < extensions.length; i++) {
var elements = extensions[i].getConfigurationElements ();
for (var j = 0; j < elements.length; j++) if ("initializer".equals (elements[j].getName ())) {
if (this.name ().equals (elements[j].getNamespace ())) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Running default preference customization as defined by: " + elements[j].getDeclaringExtension ().getDeclaringPluginDescriptor ());
this.runInitializer (elements[j]);
foundInitializer = true;
}}
}
if (foundInitializer) return ;
if (this.plugin == null && org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle ("org.eclipse.core.runtime.compatibility") != null) this.plugin = org.eclipse.core.runtime.Platform.getPlugin (this.name ());
if (this.plugin == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("No plug-in object available to set plug-in default preference overrides for:" + this.name ());
return ;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Applying plug-in default preference overrides for plug-in: " + this.plugin.getDescriptor ().getUniqueIdentifier ());
this.plugin.internalInitializeDefaultPluginPreferences ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyProductDefaults", 
($fz = function () {
if (org.eclipse.core.internal.preferences.DefaultPreferences.productCustomization == null) {
var product = org.eclipse.core.runtime.Platform.getProduct ();
if (product == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Product not available to set product default preference overrides.");
return ;
}var id = product.getId ();
if (id == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Product ID not available to apply product-level preference defaults.");
return ;
}var bundle = product.getDefiningBundle ();
if (bundle == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Bundle not available to apply product-level preference defaults for product id: " + id);
return ;
}var value = product.getProperty ("preferenceCustomization");
var url = null;
var transURL = null;
if (value == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Product : " + id + " does not define preference customization file. Using legacy file: plugin_customization.ini");
value = "plugin_customization.ini";
url = org.eclipse.core.runtime.Platform.find (bundle,  new org.eclipse.core.runtime.Path ("plugin_customization.ini"));
transURL = org.eclipse.core.runtime.Platform.find (bundle, org.eclipse.core.internal.preferences.DefaultPreferences.NL_DIR.append (value).removeFileExtension ().addFileExtension ("properties"));
} else {
try {
url =  new java.net.URL (value);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
url = org.eclipse.core.runtime.Platform.find (bundle,  new org.eclipse.core.runtime.Path (value));
if (url != null) transURL = org.eclipse.core.runtime.Platform.find (bundle, org.eclipse.core.internal.preferences.DefaultPreferences.NL_DIR.append (value).removeFileExtension ().addFileExtension ("properties"));
} else {
throw e;
}
}
}if (url == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Product preference customization file: " + value + " not found for bundle: " + id);
return ;
}if (transURL == null && org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("No preference translations found for product/file: " + bundle.getSymbolicName () + '/' + value);
($t$ = org.eclipse.core.internal.preferences.DefaultPreferences.productCustomization = this.loadProperties (url), org.eclipse.core.internal.preferences.DefaultPreferences.prototype.productCustomization = org.eclipse.core.internal.preferences.DefaultPreferences.productCustomization, $t$);
($t$ = org.eclipse.core.internal.preferences.DefaultPreferences.productTranslation = this.loadProperties (transURL), org.eclipse.core.internal.preferences.DefaultPreferences.prototype.productTranslation = org.eclipse.core.internal.preferences.DefaultPreferences.productTranslation, $t$);
}this.applyDefaults (null, org.eclipse.core.internal.preferences.DefaultPreferences.productCustomization, org.eclipse.core.internal.preferences.DefaultPreferences.productTranslation);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "flush", 
function () {
});
Clazz.overrideMethod (c$, "getLoadLevel", 
function () {
if (this.loadLevel == null) {
if (this.qualifier == null) return null;
var node = this;
for (var i = 2; i < this.segmentCount; i++) node = node.parent ();

this.loadLevel = node;
}return this.loadLevel;
});
Clazz.overrideMethod (c$, "internalCreate", 
function (nodeParent, nodeName, context) {
return  new org.eclipse.core.internal.preferences.DefaultPreferences (nodeParent, nodeName, context);
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
Clazz.overrideMethod (c$, "isAlreadyLoaded", 
function (node) {
return org.eclipse.core.internal.preferences.DefaultPreferences.loadedNodes.contains (node.name ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.defineMethod (c$, "load", 
function () {
this.loadDefaults ();
});
Clazz.defineMethod (c$, "loadDefaults", 
($fz = function () {
this.applyRuntimeDefaults ();
this.applyBundleDefaults ();
this.applyProductDefaults ();
this.applyCommandLineDefaults ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadProperties", 
($fz = function (url) {
var result =  new java.util.Properties ();
if (url == null) return result;
var input = null;
try {
input = url.openStream ();
result.load (input);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) {
org.eclipse.core.internal.runtime.Policy.debug ("Problem opening stream to preference customization file: " + url);
e.printStackTrace ();
}} else {
throw e;
}
} finally {
if (input != null) try {
input.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return result;
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineMethod (c$, "loadProperties", 
($fz = function (filename) {
var result =  new java.util.Properties ();
var input = null;
try {
input =  new java.io.BufferedInputStream ( new java.io.FileInputStream (filename));
result.load (input);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Preference customization file not found: " + filename);
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_loadException, filename);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}
} else {
throw e$$;
}
} finally {
if (input != null) try {
input.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return result;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "loaded", 
function () {
org.eclipse.core.internal.preferences.DefaultPreferences.loadedNodes.add (this.name ());
});
Clazz.overrideMethod (c$, "sync", 
function () {
});
Clazz.defineMethod (c$, "translatePreference", 
($fz = function (value, props) {
value = value.trim ();
if (props == null || value.startsWith ("%%")) return value;
if (value.startsWith ("%")) {
var ix = value.indexOf (" ");
var key = ix == -1 ? value.substring (1) : value.substring (1, ix);
var dflt = ix == -1 ? value : value.substring (ix + 1);
return props.getProperty (key, dflt);
}return value;
}, $fz.isPrivate = true, $fz), "~S,java.util.Properties");
c$.loadedNodes = c$.prototype.loadedNodes =  new java.util.HashSet ();
Clazz.defineStatics (c$,
"ELEMENT_INITIALIZER", "initializer",
"ATTRIBUTE_CLASS", "class",
"KEY_PREFIX", "%",
"KEY_DOUBLE_PREFIX", "%%");
c$.NL_DIR = c$.prototype.NL_DIR =  new org.eclipse.core.runtime.Path ("$nl$");
Clazz.defineStatics (c$,
"PRODUCT_KEY", "preferenceCustomization",
"LEGACY_PRODUCT_CUSTOMIZATION_FILENAME", "plugin_customization.ini",
"PROPERTIES_FILE_EXTENSION", "properties",
"productCustomization", null,
"productTranslation", null,
"commandLineCustomization", null);
});
