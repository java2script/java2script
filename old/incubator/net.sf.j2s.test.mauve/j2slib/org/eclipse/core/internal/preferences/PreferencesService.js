Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.runtime.IRegistryChangeListener", "org.eclipse.core.runtime.preferences.IPreferencesService", "java.util.Collections", "$.HashMap", "org.eclipse.core.internal.preferences.RootPreferences"], "org.eclipse.core.internal.preferences.PreferencesService", ["java.io.BufferedInputStream", "$.FileInputStream", "java.lang.Boolean", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "java.util.ArrayList", "$.Properties", "org.eclipse.core.internal.preferences.EclipsePreferences", "$.ExportedPreferences", "$.LookupOrder", "$.StringPool", "org.eclipse.core.internal.runtime.InternalPlatform", "$.ListenerList", "$.Messages", "$.Policy", "org.eclipse.core.runtime.CoreException", "$.ISafeRunnable", "$.MultiStatus", "$.Platform", "$.PluginVersionIdentifier", "$.Status", "org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modifyListeners = null;
this.lastStringSharing = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "PreferencesService", null, [org.eclipse.core.runtime.preferences.IPreferencesService, org.eclipse.core.runtime.IRegistryChangeListener]);
c$.createStatusError = Clazz.defineMethod (c$, "createStatusError", 
($fz = function (message, e) {
return  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
}, $fz.isPrivate = true, $fz), "~S,Exception");
c$.createStatusWarning = Clazz.defineMethod (c$, "createStatusWarning", 
($fz = function (message, e) {
return  new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 2, message, e);
}, $fz.isPrivate = true, $fz), "~S,Exception");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
if (org.eclipse.core.internal.preferences.PreferencesService.instance == null) ($t$ = org.eclipse.core.internal.preferences.PreferencesService.instance =  new org.eclipse.core.internal.preferences.PreferencesService (), org.eclipse.core.internal.preferences.PreferencesService.prototype.instance = org.eclipse.core.internal.preferences.PreferencesService.instance, $t$);
return org.eclipse.core.internal.preferences.PreferencesService.instance;
});
Clazz.defineMethod (c$, "initializeScopes", 
($fz = function () {
var point = org.eclipse.core.runtime.Platform.getExtensionRegistry ().getExtensionPoint ("org.eclipse.core.runtime", "preferences");
if (point == null) return ;
var extensions = point.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var elements = extensions[i].getConfigurationElements ();
for (var j = 0; j < elements.length; j++) if ("scope".equalsIgnoreCase (elements[j].getName ())) org.eclipse.core.internal.preferences.PreferencesService.scopeAdded (elements[j]);

}
org.eclipse.core.runtime.Platform.getExtensionRegistry ().addRegistryChangeListener (this, "org.eclipse.core.runtime");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeModifyListeners", 
($fz = function () {
this.modifyListeners =  new org.eclipse.core.internal.runtime.ListenerList ();
var point = org.eclipse.core.runtime.Platform.getExtensionRegistry ().getExtensionPoint ("org.eclipse.core.runtime", "preferences");
if (point == null) return ;
var extensions = point.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var elements = extensions[i].getConfigurationElements ();
for (var j = 0; j < elements.length; j++) if ("modifier".equalsIgnoreCase (elements[j].getName ())) this.addModifyListener (elements[j]);

}
org.eclipse.core.runtime.Platform.getExtensionRegistry ().addRegistryChangeListener (this, "org.eclipse.core.runtime");
}, $fz.isPrivate = true, $fz));
c$.log = Clazz.defineMethod (c$, "log", 
function (status) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}, "org.eclipse.core.runtime.IStatus");
c$.scopeAdded = Clazz.defineMethod (c$, "scopeAdded", 
function (element) {
var key = element.getAttribute ("name");
if (key == null) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_missingScopeAttribute, element.getDeclaringExtension ().getUniqueIdentifier ());
org.eclipse.core.internal.preferences.PreferencesService.log (org.eclipse.core.internal.preferences.PreferencesService.createStatusWarning (message, null));
return ;
}org.eclipse.core.internal.preferences.PreferencesService.scopeRegistry.put (key, element);
org.eclipse.core.internal.preferences.PreferencesService.root.addChild (key, null);
}, "org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "addModifyListener", 
($fz = function (element) {
var key = element.getAttribute ("class");
if (key == null) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_missingClassAttribute, element.getDeclaringExtension ().getUniqueIdentifier ());
org.eclipse.core.internal.preferences.PreferencesService.log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, null));
return ;
}try {
var listener = element.createExecutableExtension ("class");
if (!(Clazz.instanceOf (listener, org.eclipse.core.runtime.preferences.PreferenceModifyListener))) {
org.eclipse.core.internal.preferences.PreferencesService.log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.core.internal.runtime.Messages.preferences_classCastListener, null));
return ;
}this.modifyListeners.add (listener);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.core.internal.preferences.PreferencesService.log (e.getStatus ());
return ;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
c$.scopeRemoved = Clazz.defineMethod (c$, "scopeRemoved", 
function (key) {
var node = org.eclipse.core.internal.preferences.PreferencesService.root.node (key);
org.eclipse.core.internal.preferences.PreferencesService.root.removeNode (node);
org.eclipse.core.internal.preferences.PreferencesService.scopeRegistry.remove (key);
}, "~S");
Clazz.makeConstructor (c$, 
($fz = function () {
this.initializeScopes ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyPreferences", 
function (preferences) {
if (preferences == null) throw  new IllegalArgumentException ();
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Applying exported preferences: " + (preferences).toDeepDebugString ());
var result =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 0, org.eclipse.core.internal.runtime.Messages.preferences_applyProblems, null);
var modifiedNode = this.firePreApplyEvent (preferences);
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$1", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
var globalNode;
if (node.parent () == null) globalNode = org.eclipse.core.internal.preferences.PreferencesService.root;
 else globalNode = org.eclipse.core.internal.preferences.PreferencesService.root.node (node.absolutePath ());
var epNode = node;
var removed = false;
if (epNode.isExportRoot ()) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Found export root: " + epNode.absolutePath ());
globalNode.removeNode ();
removed = true;
}if (epNode.properties != null && !epNode.properties.isEmpty ()) {
if (removed) globalNode = org.eclipse.core.internal.preferences.PreferencesService.root.node (node.absolutePath ());
var keys = epNode.properties.keys ();
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
key = key.intern ();
var value = node.get (key, null);
if (value != null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET) org.eclipse.core.internal.runtime.Policy.debug ("Setting: " + globalNode.absolutePath () + '/' + key + '=' + value);
globalNode.put (key, value);
}}
}return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$1, i$, v$);
}) (this, null);
try {
modifiedNode.accept (visitor);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_applyProblems, e));
} else {
throw e;
}
}
try {
this.getRootNode ().node (modifiedNode.absolutePath ()).flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_saveProblems, e));
} else {
throw e;
}
}
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Current list of all settings: " + (this.getRootNode ()).toDeepDebugString ());
this.lastStringSharing = 0;
this.shareStrings ();
return result;
}, "org.eclipse.core.runtime.preferences.IExportedPreferences");
Clazz.defineMethod (c$, "convertFromLegacy", 
($fz = function (properties) {
var result =  new java.util.Properties ();
var prefix = "/instance/";
for (var i = properties.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
var value = properties.getProperty (key);
if (value != null) {
var index = key.indexOf ('/');
if (index == -1) {
result.put ('@' + key, value);
result.put ('!' + prefix + key, "");
} else {
var path = key.substring (0, index);
key = key.substring (index + 1);
result.put (org.eclipse.core.internal.preferences.EclipsePreferences.encodePath (prefix + path, key), value);
}}}
return result;
}, $fz.isPrivate = true, $fz), "java.util.Properties");
Clazz.defineMethod (c$, "convertFromProperties", 
($fz = function (properties) {
var result = org.eclipse.core.internal.preferences.ExportedPreferences.newRoot ();
for (var i = properties.keySet ().iterator (); i.hasNext (); ) {
var path = i.next ();
var value = properties.getProperty (path);
if ((path.charAt (0)).charCodeAt (0) == ('!').charCodeAt (0)) {
var current = result.node (path.substring (1));
current.setExportRoot ();
} else if ((path.charAt (0)).charCodeAt (0) == ('@').charCodeAt (0)) {
var current = result.node ("instance").node (path.substring (1));
current.setVersion (value);
} else {
var decoded = org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (path);
path = decoded[0] == null ? "" : decoded[0];
var current = result.node (path);
var key = decoded[1];
current.put (key, value);
}}
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Converted preferences file to IExportedPreferences tree: " + (result).toDeepDebugString ());
return result;
}, $fz.isPrivate = true, $fz), "java.util.Properties");
Clazz.defineMethod (c$, "getScope", 
function (path) {
if (path == null || path.length == 0) return "";
var startIndex = path.indexOf ('/');
if (startIndex == -1) return path;
if (path.length == 1) return "";
var endIndex = path.indexOf ('/', startIndex + 1);
if (endIndex == -1) endIndex = path.length;
return path.substring (startIndex + 1, endIndex);
}, "~S");
Clazz.defineMethod (c$, "convertToProperties", 
($fz = function (preferences, excludesList) {
var result =  new java.util.Properties ();
var baseLength = preferences.absolutePath ().length;
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$2", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
var absolutePath = node.absolutePath ();
var scope = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getScope (absolutePath);
if ("default".equals (scope)) return false;
var path = absolutePath.length <= this.f$.baseLength ? "" : org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (absolutePath.substring (this.f$.baseLength));
for (var i = 0; i < this.f$.excludesList.length; i++) {
var exclusion = org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (this.f$.excludesList[i]);
if (path.startsWith (exclusion)) return false;
}
var needToAddVersion = "instance".equals (scope);
var keys = node.keys ();
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
var ignore = false;
for (var j = 0; !ignore && j < this.f$.excludesList.length; j++) if (org.eclipse.core.internal.preferences.EclipsePreferences.encodePath (path, key).startsWith (org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (this.f$.excludesList[j]))) ignore = true;

if (!ignore) {
var value = node.get (key, null);
if (value != null) {
if (needToAddVersion) {
var bundle = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getBundleName (absolutePath);
if (bundle != null) {
var version = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getBundleVersion (bundle);
if (version != null) this.f$.result.put ('@' + bundle, version);
}needToAddVersion = false;
}this.f$.result.put (org.eclipse.core.internal.preferences.EclipsePreferences.encodePath (absolutePath, key), value);
}}}
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$2, i$, v$);
}) (this, Clazz.cloneFinals ("baseLength", baseLength, "excludesList", excludesList, "result", result));
preferences.accept (visitor);
return result;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A");
Clazz.defineMethod (c$, "createNode", 
function (name) {
var scope = null;
var value = org.eclipse.core.internal.preferences.PreferencesService.scopeRegistry.get (name);
if (Clazz.instanceOf (value, org.eclipse.core.runtime.IConfigurationElement)) {
try {
scope = (value).createExecutableExtension ("class");
org.eclipse.core.internal.preferences.PreferencesService.scopeRegistry.put (name, scope);
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassCastException)) {
var e = e$$;
{
org.eclipse.core.internal.preferences.PreferencesService.log (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_classCastScope, e));
return  new org.eclipse.core.internal.preferences.EclipsePreferences (org.eclipse.core.internal.preferences.PreferencesService.root, name);
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
org.eclipse.core.internal.preferences.PreferencesService.log (e.getStatus ());
return  new org.eclipse.core.internal.preferences.EclipsePreferences (org.eclipse.core.internal.preferences.PreferencesService.root, name);
}
} else {
throw e$$;
}
}
} else scope = value;
return scope.create (org.eclipse.core.internal.preferences.PreferencesService.root, name);
}, "~S");
Clazz.defineMethod (c$, "exportPreferences", 
function (node, output, excludesList) {
if (node == null || output == null) throw  new IllegalArgumentException ();
var properties = null;
if (excludesList == null) excludesList =  new Array (0);
try {
properties = this.convertToProperties (node, excludesList);
if (properties.isEmpty ()) return org.eclipse.core.runtime.Status.OK_STATUS;
properties.put ("file_export_version", Float.toString (3.0));
properties.put ('!' + node.absolutePath (), "");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (e.getMessage (), e));
} else {
throw e;
}
}
try {
properties.store (output, null);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_exportProblems, e));
} else {
throw e;
}
}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences,java.io.OutputStream,~A");
Clazz.overrideMethod (c$, "get", 
function (key, defaultValue, nodes) {
if (nodes == null) return defaultValue;
for (var i = 0; i < nodes.length; i++) {
var node = nodes[i];
if (node != null) {
var result = node.get (key, null);
if (result != null) return result;
}}
return defaultValue;
}, "~S,~S,~A");
Clazz.overrideMethod (c$, "getBoolean", 
function (qualifier, key, defaultValue, scopes) {
var result = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
return result == null ? defaultValue : Boolean.$valueOf (result).booleanValue ();
}, "~S,~S,~B,~A");
Clazz.defineMethod (c$, "getBundleVersion", 
function (bundleName) {
var bundle = org.eclipse.core.runtime.Platform.getBundle (bundleName);
if (bundle != null) {
var version = bundle.getHeaders ("").get ("Bundle-Version");
if (version != null && Clazz.instanceOf (version, String)) return version;
}return null;
}, "~S");
Clazz.defineMethod (c$, "getBundleName", 
function (path) {
if (path.length == 0 || (path.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0)) return null;
var first = path.indexOf ('/', 1);
if (first == -1) return null;
var second = path.indexOf ('/', first + 1);
return second == -1 ? path.substring (first + 1) : path.substring (first + 1, second);
}, "~S");
Clazz.overrideMethod (c$, "getByteArray", 
function (qualifier, key, defaultValue, scopes) {
var result = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
return result == null ? defaultValue : result.getBytes ();
}, "~S,~S,~A,~A");
Clazz.overrideMethod (c$, "getDefaultLookupOrder", 
function (qualifier, key) {
var order = org.eclipse.core.internal.preferences.PreferencesService.defaultsRegistry.get (this.getRegistryKey (qualifier, key));
return order == null ? null : order.getOrder ();
}, "~S,~S");
Clazz.overrideMethod (c$, "getDouble", 
function (qualifier, key, defaultValue, scopes) {
var value = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
if (value == null) return defaultValue;
try {
return Double.parseDouble (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~S,~N,~A");
Clazz.overrideMethod (c$, "getFloat", 
function (qualifier, key, defaultValue, scopes) {
var value = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
if (value == null) return defaultValue;
try {
return Float.parseFloat (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~S,~N,~A");
Clazz.overrideMethod (c$, "getInt", 
function (qualifier, key, defaultValue, scopes) {
var value = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
if (value == null) return defaultValue;
try {
return Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~S,~N,~A");
Clazz.overrideMethod (c$, "getLong", 
function (qualifier, key, defaultValue, scopes) {
var value = this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], null, this.getNodes (qualifier, key, scopes));
if (value == null) return defaultValue;
try {
return Long.parseLong (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~S,~N,~A");
Clazz.overrideMethod (c$, "getLookupOrder", 
function (qualifier, key) {
var order = this.getDefaultLookupOrder (qualifier, key);
if (order == null && key != null) order = this.getDefaultLookupOrder (qualifier, null);
if (order == null) order = org.eclipse.core.internal.preferences.PreferencesService.DEFAULT_DEFAULT_LOOKUP_ORDER;
return order;
}, "~S,~S");
Clazz.defineMethod (c$, "getNodes", 
($fz = function (qualifier, key, contexts) {
var order = this.getLookupOrder (qualifier, key);
var childPath = org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[0]);
var result =  new java.util.ArrayList ();
for (var i = 0; i < order.length; i++) {
var scopeString = order[i];
var found = false;
for (var j = 0; contexts != null && j < contexts.length; j++) {
var context = contexts[j];
if (context != null && context.getName ().equals (scopeString)) {
var node = context.getNode (qualifier);
if (node != null) {
found = true;
if (childPath != null) node = node.node (childPath);
result.add (node);
}}}
if (!found) {
var node = this.getRootNode ().node (scopeString).node (qualifier);
if (childPath != null) node = node.node (childPath);
result.add (node);
}found = false;
}
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~S,~S,~A");
Clazz.defineMethod (c$, "getRegistryKey", 
($fz = function (qualifier, key) {
if (qualifier == null) throw  new IllegalArgumentException ();
if (key == null) return qualifier;
return qualifier + '/' + key;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.overrideMethod (c$, "getRootNode", 
function () {
return org.eclipse.core.internal.preferences.PreferencesService.root;
});
Clazz.overrideMethod (c$, "getString", 
function (qualifier, key, defaultValue, scopes) {
return this.get (org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (key)[1], defaultValue, this.getNodes (qualifier, key, scopes));
}, "~S,~S,~S,~A");
Clazz.overrideMethod (c$, "importPreferences", 
function (input) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Importing preferences...");
return this.applyPreferences (this.readPreferences (input));
}, "java.io.InputStream");
Clazz.defineMethod (c$, "isLegacy", 
($fz = function (properties) {
return properties.getProperty ("file_export_version") == null;
}, $fz.isPrivate = true, $fz), "java.util.Properties");
Clazz.overrideMethod (c$, "readPreferences", 
function (input) {
if (input == null) throw  new IllegalArgumentException ();
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Reading preferences from stream...");
var properties =  new java.util.Properties ();
try {
properties.load (input);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_importProblems, e));
} else {
throw e;
}
} finally {
try {
input.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
if (properties.isEmpty ()) throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_invalidFileFormat, null));
if (this.isLegacy (properties)) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Read legacy preferences file, converting to 3.0 format...");
properties = this.convertFromLegacy (properties);
} else {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Read preferences file.");
properties.remove ("file_export_version");
}return this.convertFromProperties (properties);
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "registryChanged", 
function (event) {
var deltas = event.getExtensionDeltas ("org.eclipse.core.runtime", "preferences");
if (deltas.length == 0) return ;
for (var i = 0; i < deltas.length; i++) {
var elements = deltas[i].getExtension ().getConfigurationElements ();
for (var j = 0; j < elements.length; j++) {
switch (deltas[i].getKind ()) {
case 1:
org.eclipse.core.internal.preferences.PreferencesService.scopeAdded (elements[j]);
break;
case 2:
var scope = elements[j].getAttribute ("name");
if (scope != null) org.eclipse.core.internal.preferences.PreferencesService.scopeRemoved (scope);
break;
}
}
}
this.initializeModifyListeners ();
}, "org.eclipse.core.runtime.IRegistryChangeEvent");
Clazz.overrideMethod (c$, "setDefaultLookupOrder", 
function (qualifier, key, order) {
var registryKey = this.getRegistryKey (qualifier, key);
if (order == null) org.eclipse.core.internal.preferences.PreferencesService.defaultsRegistry.remove (registryKey);
 else {
var obj =  new org.eclipse.core.internal.preferences.LookupOrder (order);
org.eclipse.core.internal.preferences.PreferencesService.defaultsRegistry.put (registryKey, obj);
}}, "~S,~S,~A");
Clazz.defineMethod (c$, "shareStrings", 
function () {
var now = System.currentTimeMillis ();
if (now - this.lastStringSharing < 300000) return ;
var pool =  new org.eclipse.core.internal.preferences.StringPool ();
org.eclipse.core.internal.preferences.PreferencesService.root.shareStrings (pool);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) System.out.println ("Preference string sharing saved: " + pool.getSavedStringCount ());
this.lastStringSharing = now;
});
Clazz.defineMethod (c$, "validateVersions", 
function (path) {
var result =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 1, org.eclipse.core.internal.runtime.Messages.preferences_validate, null);
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$3", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
if (!(Clazz.instanceOf (node, org.eclipse.core.internal.preferences.ExportedPreferences))) return false;
var realNode = node;
var version = realNode.getVersion ();
if (version == null || !org.eclipse.core.runtime.PluginVersionIdentifier.validateVersion (version).isOK ()) return true;
var versionInFile =  new org.eclipse.core.runtime.PluginVersionIdentifier (version);
var bundleName = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getBundleName (node.absolutePath ());
if (bundleName == null) return true;
var stringVersion = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getBundleVersion (bundleName);
if (stringVersion == null || !org.eclipse.core.runtime.PluginVersionIdentifier.validateVersion (stringVersion).isOK ()) return true;
var versionInMemory =  new org.eclipse.core.runtime.PluginVersionIdentifier (stringVersion);
var verification = this.b$["org.eclipse.core.internal.preferences.PreferencesService"].validatePluginVersions (bundleName, versionInFile, versionInMemory);
if (verification != null) this.f$.result.add (verification);
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$3, i$, v$);
}) (this, Clazz.cloneFinals ("result", result));
var input = null;
try {
input =  new java.io.BufferedInputStream ( new java.io.FileInputStream (path.toFile ()));
var prefs = this.readPreferences (input);
prefs.accept (visitor);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
result.add (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_validationException, e));
}
} else if (Clazz.instanceOf (e$$, org.osgi.service.prefs.BackingStoreException)) {
var e = e$$;
{
result.add (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_validationException, e));
}
} else {
throw e$$;
}
}
return result;
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "validatePluginVersions", 
function (bundle, pref, installed) {
if (installed.getMajorComponent () == pref.getMajorComponent () && installed.getMinorComponent () == pref.getMinorComponent ()) return null;
var severity;
if (installed.getMajorComponent () < pref.getMajorComponent ()) severity = 4;
 else severity = 2;
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_incompatible, ([pref, bundle, installed]));
return  new org.eclipse.core.runtime.Status (severity, "org.eclipse.core.runtime", 1, msg, null);
}, "~S,org.eclipse.core.runtime.PluginVersionIdentifier,org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.defineMethod (c$, "mergeTrees", 
($fz = function (trees) {
if (trees.length == 1) return trees[0];
var result = org.eclipse.core.internal.preferences.ExportedPreferences.newRoot ();
if (trees.length == 0) return result;
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$4", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
var destination = this.f$.result.node (node.absolutePath ());
this.b$["org.eclipse.core.internal.preferences.PreferencesService"].copyFromTo (node, destination, null, 0);
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$4, i$, v$);
}) (this, Clazz.cloneFinals ("result", result));
for (var i = 0; i < trees.length; i++) trees[i].accept (visitor);

return result;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "trimTree", 
($fz = function (tree, filter) {
var result = org.eclipse.core.internal.preferences.ExportedPreferences.newRoot ().node (tree.absolutePath ());
var scopes = filter.getScopes ();
if (scopes == null) throw  new IllegalArgumentException ();
var treePath = tree.absolutePath ();
for (var i = 0; i < scopes.length; i++) {
var scope = scopes[i];
var mapping = filter.getMapping (scope);
if (mapping == null) {
if (tree.parent () == null && tree.nodeExists (scope)) this.copyFromTo (tree.node (scope), result.node (scope), null, -1);
 else if (this.scopeMatches (scope, tree)) this.copyFromTo (tree, result, null, -1);
continue ;}for (var iter = mapping.keySet ().iterator (); iter.hasNext (); ) {
var nodePath = iter.next ();
var nodeFullPath = '/' + scope + '/' + nodePath;
if (!nodeFullPath.startsWith (treePath)) continue ;var childPath = nodeFullPath.substring (treePath.length);
childPath = org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (childPath);
if (tree.nodeExists (childPath)) {
var entries;
try {
entries = mapping.get (nodePath);
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
org.eclipse.core.internal.preferences.PreferencesService.log (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_classCastFilterEntry, e));
continue ;} else {
throw e;
}
}
var keys = null;
if (entries != null) {
var list =  new java.util.ArrayList ();
for (var j = 0; j < entries.length; j++) {
if (entries[j] != null) list.add (entries[j].getKey ());
}
keys = list.toArray ( new Array (list.size ()));
}this.copyFromTo (tree.node (childPath), result.node (childPath), keys, keys == null ? -1 : 0);
}}
}
return result;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,org.eclipse.core.runtime.preferences.IPreferenceFilter");
Clazz.defineMethod (c$, "scopeMatches", 
($fz = function (scope, tree) {
if (tree.parent () == null) return false;
var path = tree.absolutePath ();
var index = path.indexOf ('/', 1);
var sub = path.substring (1, index == -1 ? path.length : index);
return scope.equals (sub);
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.defineMethod (c$, "copyFromTo", 
function (source, destination, keys, depth) {
var keysToCopy = keys == null ? source.keys () : keys;
for (var i = 0; i < keysToCopy.length; i++) {
var value = source.get (keysToCopy[i], null);
if (value != null) destination.put (keysToCopy[i], value);
}
if (depth == 0) return ;
var children = source.childrenNames ();
for (var i = 0; i < children.length; i++) this.copyFromTo (source.node (children[i]), destination.node (children[i]), keys, depth);

}, "org.osgi.service.prefs.Preferences,org.osgi.service.prefs.Preferences,~A,~N");
Clazz.defineMethod (c$, "exportPreferences", 
function (node, filters, stream) {
if (filters == null || filters.length == 0) return ;
try {
this.internalExport (node, filters, stream);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_exportProblems, e));
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A,java.io.OutputStream");
Clazz.defineMethod (c$, "internalExport", 
($fz = function (node, filters, output) {
var trees =  new java.util.ArrayList ();
for (var i = 0; i < filters.length; i++) trees.add (this.trimTree (node, filters[i]));

var toExport = this.mergeTrees (trees.toArray ( new Array (trees.size ())));
this.exportPreferences (toExport, output, Clazz.castNullAs ("Array"));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A,java.io.OutputStream");
Clazz.overrideMethod (c$, "matches", 
function (tree, filters) {
if (filters == null || filters.length == 0) return  new Array (0);
try {
return this.internalMatches (tree, filters);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_matching, e));
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A");
Clazz.defineMethod (c$, "internalMatches", 
($fz = function (tree, filters) {
var result =  new java.util.ArrayList ();
for (var i = 0; i < filters.length; i++) if (this.internalMatches (tree, filters[i])) result.add (filters[i]);

return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A");
Clazz.defineMethod (c$, "containsKeys", 
($fz = function (aRoot) {
var result = [false];
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$5", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
if (node.keys ().length != 0) this.f$.result[0] = true;
return !this.f$.result[0];
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$5, i$, v$);
}) (this, Clazz.cloneFinals ("result", result));
aRoot.accept (visitor);
return result[0];
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.defineMethod (c$, "internalMatches", 
($fz = function (tree, filter) {
var scopes = filter.getScopes ();
if (scopes == null) throw  new IllegalArgumentException ();
var treePath = tree.absolutePath ();
for (var i = 0; i < scopes.length; i++) {
var scope = scopes[i];
var mapping = filter.getMapping (scope);
if (mapping == null) {
if (tree.parent () == null && tree.nodeExists (scope)) return this.containsKeys (tree.node (scope));
if (this.scopeMatches (scope, tree) && this.containsKeys (tree)) return true;
continue ;}for (var iter = mapping.keySet ().iterator (); iter.hasNext (); ) {
var nodePath = iter.next ();
var nodeFullPath = '/' + scope + '/' + nodePath;
if (!nodeFullPath.startsWith (treePath)) continue ;var childPath = nodeFullPath.substring (treePath.length);
childPath = org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (childPath);
if (tree.nodeExists (childPath)) {
var entries;
try {
entries = mapping.get (nodePath);
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
org.eclipse.core.internal.preferences.PreferencesService.log (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_classCastFilterEntry, e));
continue ;} else {
throw e;
}
}
var child = tree.node (childPath);
if (entries == null) return child.keys ().length != 0 || child.childrenNames ().length != 0;
for (var j = 0; j < entries.length; j++) {
if (entries[j] != null && child.get (entries[j].getKey (), null) != null) return true;
}
}}
}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,org.eclipse.core.runtime.preferences.IPreferenceFilter");
Clazz.defineMethod (c$, "applyPreferences", 
function (tree, filters) {
if (filters == null || filters.length == 0) return ;
try {
this.internalApply (tree, filters);
this.lastStringSharing = 0;
this.shareStrings ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new org.eclipse.core.runtime.CoreException (org.eclipse.core.internal.preferences.PreferencesService.createStatusError (org.eclipse.core.internal.runtime.Messages.preferences_applyProblems, e));
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A");
Clazz.defineMethod (c$, "internalApply", 
($fz = function (tree, filters) {
var trees =  new java.util.ArrayList ();
for (var i = 0; i < filters.length; i++) trees.add (this.trimTree (tree, filters[i]));

var toApply = this.mergeTrees (trees.toArray ( new Array (trees.size ())));
toApply = this.firePreApplyEvent (toApply);
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$6", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.overrideMethod (c$, "visit", 
function (node) {
var keys = node.keys ();
if (keys.length == 0) return true;
this.b$["org.eclipse.core.internal.preferences.PreferencesService"].copyFromTo (node, this.b$["org.eclipse.core.internal.preferences.PreferencesService"].getRootNode ().node (node.absolutePath ()), keys, 0);
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$6, i$, v$);
}) (this, null);
toApply.accept (visitor);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences,~A");
Clazz.defineMethod (c$, "firePreApplyEvent", 
($fz = function (tree) {
var result = [tree];
if (this.modifyListeners == null) this.initializeModifyListeners ();
var listeners = this.modifyListeners.getListeners ();
for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
var job = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.PreferencesService$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "PreferencesService$7", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.result[0] = this.f$.listener.preApply (this.f$.result[0]);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.PreferencesService$7, i$, v$);
}) (this, Clazz.cloneFinals ("result", result, "listener", listener));
org.eclipse.core.runtime.Platform.run (job);
}
return result[0];
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.defineStatics (c$,
"STRING_SHARING_INTERVAL", 300000);
c$.DEFAULT_DEFAULT_LOOKUP_ORDER = c$.prototype.DEFAULT_DEFAULT_LOOKUP_ORDER = ["project", "instance", "configuration", "default"];
Clazz.defineStatics (c$,
"EXPORT_ROOT_PREFIX", '!',
"BUNDLE_VERSION_PREFIX", '@',
"EXPORT_VERSION", 3,
"VERSION_KEY", "file_export_version",
"ATTRIBUTE_NAME", "name",
"ATTRIBUTE_CLASS", "class",
"ELEMENT_SCOPE", "scope",
"ELEMENT_MODIFIER", "modifier",
"EMPTY_STRING", "",
"instance", null);
c$.root = c$.prototype.root =  new org.eclipse.core.internal.preferences.RootPreferences ();
c$.defaultsRegistry = c$.prototype.defaultsRegistry = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
c$.scopeRegistry = c$.prototype.scopeRegistry = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
});
