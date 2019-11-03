Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.runtime.preferences.IEclipsePreferences", "$.IScope"], "org.eclipse.core.internal.preferences.EclipsePreferences", ["java.io.BufferedInputStream", "$.BufferedOutputStream", "$.FileInputStream", "$.FileOutputStream", "java.lang.Double", "$.Float", "$.IllegalStateException", "$.Long", "$.NullPointerException", "$.StringBuffer", "java.util.ArrayList", "$.Collections", "$.HashMap", "$.Properties", "$.StringTokenizer", "org.eclipse.core.internal.preferences.Base64", "$.PreferencesService", "org.eclipse.core.internal.runtime.HashMapOfString", "$.InternalPlatform", "$.ListenerList", "$.Messages", "$.Policy", "org.eclipse.core.runtime.ISafeRunnable", "$.Platform", "$.Status", "org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor", "org.eclipse.osgi.util.NLS", "org.osgi.service.prefs.BackingStoreException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cachedPath = null;
this.children = null;
this.dirty = false;
this.loading = false;
this.$name = null;
this.$parent = null;
this.properties = null;
this.removed = false;
this.nodeChangeListeners = null;
this.preferenceChangeListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "EclipsePreferences", null, [org.eclipse.core.runtime.preferences.IEclipsePreferences, org.eclipse.core.runtime.preferences.IScope]);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (parent, name) {
this.$parent = parent;
this.$name = name;
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S");
Clazz.defineMethod (c$, "absolutePath", 
function () {
if (this.cachedPath == null) {
if (this.$parent == null) this.cachedPath = org.eclipse.core.internal.preferences.EclipsePreferences.PATH_SEPARATOR;
 else {
var parentPath = this.$parent.absolutePath ();
if (parentPath.length == 1) this.cachedPath = parentPath + this.name ();
 else this.cachedPath = parentPath + org.eclipse.core.internal.preferences.EclipsePreferences.PATH_SEPARATOR + this.name ();
}}return this.cachedPath;
});
Clazz.defineMethod (c$, "accept", 
function (visitor) {
if (!visitor.visit (this)) return ;
var toVisit = this.getChildren (true);
for (var i = 0; i < toVisit.length; i++) toVisit[i].accept (visitor);

}, "org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor");
Clazz.defineMethod (c$, "addChild", 
function (childName, child) {
if (this.children == null) this.children = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
this.children.put (childName, child == null ? childName : child);
return child;
}, "~S,org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.overrideMethod (c$, "addNodeChangeListener", 
function (listener) {
this.checkRemoved ();
if (this.nodeChangeListeners == null) this.nodeChangeListeners =  new org.eclipse.core.internal.runtime.ListenerList ();
this.nodeChangeListeners.add (listener);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Added preference node change listener: " + listener + " to: " + this.absolutePath ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.INodeChangeListener");
Clazz.overrideMethod (c$, "addPreferenceChangeListener", 
function (listener) {
this.checkRemoved ();
if (this.preferenceChangeListeners == null) this.preferenceChangeListeners =  new org.eclipse.core.internal.runtime.ListenerList ();
this.preferenceChangeListeners.add (listener);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Added preference property change listener: " + listener + " to: " + this.absolutePath ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.IPreferenceChangeListener");
Clazz.defineMethod (c$, "calculateRoot", 
($fz = function () {
var result = this;
while (result.parent () != null) result = result.parent ();

return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkRemoved", 
function () {
if (this.removed) {
throw  new IllegalStateException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_removedNode, this.$name));
}});
Clazz.overrideMethod (c$, "childrenNames", 
function () {
this.checkRemoved ();
return this.internalChildNames ();
});
Clazz.defineMethod (c$, "internalChildNames", 
function () {
var temp = this.children;
if (temp == null || temp.size () == 0) return org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_STRING_ARRAY;
return temp.keySet ().toArray (org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_STRING_ARRAY);
});
Clazz.overrideMethod (c$, "clear", 
function () {
this.checkRemoved ();
var temp = this.properties;
if (temp == null) return ;
var keys = temp.keys ();
for (var i = 0; i < keys.length; i++) this.remove (keys[i]);

{
this.properties = null;
}this.makeDirty ();
});
Clazz.defineMethod (c$, "computeChildren", 
function (root) {
if (root == null) return org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_STRING_ARRAY;
var dir = root.append (".settings");
var result =  new java.util.ArrayList ();
var extension = ".prefs";
var file = dir.toFile ();
var totalFiles = file.listFiles ();
if (totalFiles != null) {
for (var i = 0; i < totalFiles.length; i++) {
if (totalFiles[i].isFile ()) {
var filename = totalFiles[i].getName ();
if (filename.endsWith (".prefs")) {
var shortName = filename.substring (0, filename.length - ".prefs".length);
result.add (shortName);
}}}
}return result.toArray (org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_STRING_ARRAY);
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "computeLocation", 
function (root, qualifier) {
return root == null ? null : root.append (".settings").append (qualifier).addFileExtension ("prefs");
}, "org.eclipse.core.runtime.IPath,~S");
c$.convertFromProperties = Clazz.defineMethod (c$, "convertFromProperties", 
function (node, table, notify) {
var version = table.getProperty ("eclipse.preferences.version");
if (version == null || !"1".equals (version)) {
}table.remove ("eclipse.preferences.version");
for (var i = table.keySet ().iterator (); i.hasNext (); ) {
var fullKey = i.next ();
var value = table.getProperty (fullKey);
if (value != null) {
var splitPath = org.eclipse.core.internal.preferences.EclipsePreferences.decodePath (fullKey);
var path = splitPath[0];
path = org.eclipse.core.internal.preferences.EclipsePreferences.makeRelative (path);
var key = splitPath[1];
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET) org.eclipse.core.internal.runtime.Policy.debug ("Setting preference: " + path + '/' + key + '=' + value);
var childNode = node.internalNode (path, false, null);
var oldValue = childNode.internalPut (key, value);
if (notify && !value.equals (oldValue)) node.firePreferenceEvent (key, oldValue, value);
}}
org.eclipse.core.internal.preferences.PreferencesService.getDefault ().shareStrings ();
}, "org.eclipse.core.internal.preferences.EclipsePreferences,java.util.Properties,~B");
Clazz.defineMethod (c$, "convertToProperties", 
function (result, prefix) {
var temp = this.properties;
var addSeparator = prefix.length != 0;
if (temp != null) {
{
var keys = temp.keys ();
for (var i = 0; i < keys.length; i++) {
var value = temp.get (keys[i]);
if (value != null) result.put (org.eclipse.core.internal.preferences.EclipsePreferences.encodePath (prefix, keys[i]), value);
}
}}var childNodes = this.getChildren (true);
for (var i = 0; i < childNodes.length; i++) {
var child = childNodes[i];
var fullPath = addSeparator ? prefix + org.eclipse.core.internal.preferences.EclipsePreferences.PATH_SEPARATOR + child.name () : child.name ();
child.convertToProperties (result, fullPath);
}
org.eclipse.core.internal.preferences.PreferencesService.getDefault ().shareStrings ();
return result;
}, "java.util.Properties,~S");
Clazz.defineMethod (c$, "create", 
function (nodeParent, nodeName) {
return this.create (nodeParent, nodeName, null);
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences,~S");
Clazz.defineMethod (c$, "isLoading", 
function () {
return this.loading;
});
Clazz.defineMethod (c$, "setLoading", 
function (isLoading) {
this.loading = isLoading;
}, "~B");
Clazz.defineMethod (c$, "create", 
function (nodeParent, nodeName, context) {
var result = this.internalCreate (nodeParent, nodeName, context);
nodeParent.addChild (nodeName, result);
var loadLevel = result.getLoadLevel ();
if (loadLevel == null) return result;
if (result !== loadLevel) return result;
if (this.isAlreadyLoaded (result) || result.isLoading ()) return result;
try {
result.setLoading (true);
result.loadLegacy ();
result.load ();
result.loaded ();
result.flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
var location = result.getLocation ();
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_loadException, location == null ? "" : location.toString ());
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
} else {
throw e;
}
} finally {
result.setLoading (false);
}
return result;
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "flush", 
function () {
this.checkRemoved ();
var loadLevel = this.getLoadLevel ();
if (loadLevel == null) {
var childrenNames = this.childrenNames ();
for (var i = 0; i < childrenNames.length; i++) this.node (childrenNames[i]).flush ();

return ;
}if (this !== loadLevel) {
loadLevel.flush ();
return ;
}if (!this.dirty) return ;
this.dirty = false;
try {
this.save ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
this.dirty = true;
throw e;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "get", 
function (key, defaultValue) {
var value = this.internalGet (key);
return value == null ? defaultValue : value;
}, "~S,~S");
Clazz.overrideMethod (c$, "getBoolean", 
function (key, defaultValue) {
var value = this.internalGet (key);
return value == null ? defaultValue : "true".equalsIgnoreCase (value);
}, "~S,~B");
Clazz.overrideMethod (c$, "getByteArray", 
function (key, defaultValue) {
var value = this.internalGet (key);
return value == null ? defaultValue : org.eclipse.core.internal.preferences.Base64.decode (value.getBytes ());
}, "~S,~A");
Clazz.defineMethod (c$, "childExists", 
function (childName) {
if (this.children == null) return false;
return this.children.get (childName) != null;
}, "~S");
Clazz.defineMethod (c$, "getChild", 
function (key, context, create) {
{
if (this.children == null) return null;
var value = this.children.get (key);
if (value == null) return null;
if (Clazz.instanceOf (value, org.eclipse.core.runtime.preferences.IEclipsePreferences)) return value;
if (!create) return null;
}return this.addChild (key, this.create (this, key, context));
}, "~S,org.eclipse.core.runtime.Plugin,~B");
Clazz.defineMethod (c$, "getChildren", 
function (create) {
var result =  new java.util.ArrayList ();
var names = this.internalChildNames ();
for (var i = 0; i < names.length; i++) {
var child = this.getChild (names[i], null, create);
if (child != null) result.add (child);
}
return result.toArray (org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_NODE_ARRAY);
}, "~B");
Clazz.overrideMethod (c$, "getDouble", 
function (key, defaultValue) {
var value = this.internalGet (key);
var result = defaultValue;
if (value != null) try {
result = Double.parseDouble (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return result;
}, "~S,~N");
Clazz.overrideMethod (c$, "getFloat", 
function (key, defaultValue) {
var value = this.internalGet (key);
var result = defaultValue;
if (value != null) try {
result = Float.parseFloat (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return result;
}, "~S,~N");
Clazz.overrideMethod (c$, "getInt", 
function (key, defaultValue) {
var value = this.internalGet (key);
var result = defaultValue;
if (value != null) try {
result = Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return result;
}, "~S,~N");
Clazz.defineMethod (c$, "getLoadLevel", 
function () {
return null;
});
Clazz.defineMethod (c$, "getLocation", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getLong", 
function (key, defaultValue) {
var value = this.internalGet (key);
var result = defaultValue;
if (value != null) try {
result = Long.parseLong (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return result;
}, "~S,~N");
Clazz.defineMethod (c$, "internalCreate", 
function (nodeParent, nodeName, context) {
return  new org.eclipse.core.internal.preferences.EclipsePreferences (nodeParent, nodeName);
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "internalGet", 
function (key) {
if (key == null) throw  new NullPointerException ();
this.checkRemoved ();
var temp = this.properties;
if (temp == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GET) org.eclipse.core.internal.runtime.Policy.debug ("Getting preference value: " + this.absolutePath () + '/' + key + "->null");
return null;
}var result = temp.get (key);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GET) org.eclipse.core.internal.runtime.Policy.debug ("Getting preference value: " + this.absolutePath () + '/' + key + "->" + result);
return result;
}, "~S");
Clazz.defineMethod (c$, "internalNode", 
function (path, notify, context) {
this.checkRemoved ();
if (path.length == 0) return this;
if ((path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return this.calculateRoot ().node (path.substring (1));
var index = path.indexOf ('/');
var key = index == -1 ? path : path.substring (0, index);
var added = false;
var child = this.getChild (key, context, true);
if (child == null) {
child = this.create (this, key, context);
added = true;
}if (added && notify) this.fireNodeEvent ( new org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent (this, child), true);
return child.node (index == -1 ? "" : path.substring (index + 1));
}, "~S,~B,org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "internalPut", 
function (key, newValue) {
this.checkRemoved ();
if (this.properties == null) this.properties =  new org.eclipse.core.internal.runtime.HashMapOfString ();
var oldValue = this.properties.get (key);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET) org.eclipse.core.internal.runtime.Policy.debug ("Setting preference: " + this.absolutePath () + '/' + key + '=' + newValue);
this.properties.put (key, newValue);
return oldValue;
}, "~S,~S");
Clazz.defineMethod (c$, "internalRemove", 
($fz = function (key, oldValue) {
var wasRemoved = false;
{
if (this.properties == null) return ;
wasRemoved = this.properties.removeKey (key) != null;
if (this.properties.size () == 0) this.properties = null;
if (wasRemoved) this.makeDirty ();
}if (wasRemoved) this.firePreferenceEvent (key, oldValue, null);
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "isAlreadyLoaded", 
function (node) {
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.defineMethod (c$, "keys", 
function () {
this.checkRemoved ();
var temp = this.properties;
if (temp == null || temp.size () == 0) return org.eclipse.core.internal.preferences.EclipsePreferences.EMPTY_STRING_ARRAY;
return temp.keys ();
});
Clazz.defineMethod (c$, "load", 
function () {
this.load (this.getLocation ());
});
c$.loadProperties = Clazz.defineMethod (c$, "loadProperties", 
function (location) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Loading preferences from file: " + location);
var input = null;
var result =  new java.util.Properties ();
try {
input =  new java.io.BufferedInputStream ( new java.io.FileInputStream (location.toFile ()));
result.load (input);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Preference file does not exist: " + location);
return result;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_loadException, location);
org.eclipse.core.internal.preferences.EclipsePreferences.log ( new org.eclipse.core.runtime.Status (1, "org.eclipse.core.runtime", 1, message, e));
throw  new org.osgi.service.prefs.BackingStoreException (message);
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
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "load", 
function (location) {
if (location == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Unable to determine location of preference file for node: " + this.absolutePath ());
return ;
}var fromDisk = org.eclipse.core.internal.preferences.EclipsePreferences.loadProperties (location);
org.eclipse.core.internal.preferences.EclipsePreferences.convertFromProperties (this, fromDisk, false);
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "loaded", 
function () {
});
Clazz.defineMethod (c$, "loadLegacy", 
function () {
});
c$.log = Clazz.defineMethod (c$, "log", 
function (status) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "makeDirty", 
function () {
var node = this;
while (node != null && !node.removed) {
node.dirty = true;
node = node.parent ();
}
});
Clazz.defineMethod (c$, "name", 
function () {
return this.$name;
});
Clazz.defineMethod (c$, "node", 
function (pathName) {
return this.internalNode (pathName, true, null);
}, "~S");
Clazz.defineMethod (c$, "fireNodeEvent", 
function (event, added) {
if (this.nodeChangeListeners == null) return ;
var listeners = this.nodeChangeListeners.getListeners ();
for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
var job = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.EclipsePreferences$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "EclipsePreferences$1", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
if (this.f$.added) this.f$.listener.added (this.f$.event);
 else this.f$.listener.removed (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.EclipsePreferences$1, i$, v$);
}) (this, Clazz.cloneFinals ("added", added, "listener", listener, "event", event));
org.eclipse.core.runtime.Platform.run (job);
}
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent,~B");
Clazz.defineMethod (c$, "nodeExists", 
function (path) {
if (path.length == 0) return !this.removed;
this.checkRemoved ();
if ((path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return this.calculateRoot ().nodeExists (path.substring (1));
var index = path.indexOf ('/');
var noSlash = index == -1;
if (noSlash) return this.childExists (path);
var childName = path.substring (0, index);
if (!this.childExists (childName)) return false;
var child = this.getChild (childName, null, true);
if (child == null) return false;
return child.nodeExists (path.substring (index + 1));
}, "~S");
Clazz.defineMethod (c$, "parent", 
function () {
this.checkRemoved ();
return this.$parent;
});
Clazz.defineMethod (c$, "firePreferenceEvent", 
function (key, oldValue, newValue) {
if (this.preferenceChangeListeners == null) return ;
var listeners = this.preferenceChangeListeners.getListeners ();
var event =  new org.eclipse.core.runtime.preferences.IEclipsePreferences.PreferenceChangeEvent (this, key, oldValue, newValue);
for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
var job = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.EclipsePreferences$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "EclipsePreferences$2", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.listener.preferenceChange (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.EclipsePreferences$2, i$, v$);
}) (this, Clazz.cloneFinals ("listener", listener, "event", event));
org.eclipse.core.runtime.Platform.run (job);
}
}, "~S,~O,~O");
Clazz.overrideMethod (c$, "put", 
function (key, newValue) {
if (key == null || newValue == null) throw  new NullPointerException ();
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~S");
Clazz.overrideMethod (c$, "putBoolean", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
var newValue = value ? "true" : "false";
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~B");
Clazz.overrideMethod (c$, "putByteArray", 
function (key, value) {
if (key == null || value == null) throw  new NullPointerException ();
var newValue =  String.instantialize (org.eclipse.core.internal.preferences.Base64.encode (value));
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~A");
Clazz.overrideMethod (c$, "putDouble", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
var newValue = Double.toString (value);
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~N");
Clazz.overrideMethod (c$, "putFloat", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
var newValue = Float.toString (value);
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~N");
Clazz.overrideMethod (c$, "putInt", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
var newValue = Integer.toString (value);
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~N");
Clazz.overrideMethod (c$, "putLong", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
var newValue = Long.toString (value);
var oldValue = this.internalPut (key, newValue);
if (!newValue.equals (oldValue)) {
this.makeDirty ();
this.firePreferenceEvent (key, oldValue, newValue);
}}, "~S,~N");
Clazz.overrideMethod (c$, "remove", 
function (key) {
var oldValue = this.internalGet (key);
if (oldValue != null) this.internalRemove (key, oldValue);
}, "~S");
Clazz.defineMethod (c$, "removeNode", 
function () {
this.checkRemoved ();
var keys = this.keys ();
for (var i = 0; i < keys.length; i++) this.remove (keys[i]);

if (this.$parent != null && !(Clazz.instanceOf (this.$parent, org.eclipse.core.internal.preferences.RootPreferences))) {
this.removed = true;
this.$parent.removeNode (this);
}var childNodes = this.getChildren (false);
for (var i = 0; i < childNodes.length; i++) try {
childNodes[i].removeNode ();
} catch (e) {
if (Clazz.instanceOf (e, IllegalStateException)) {
} else {
throw e;
}
}

});
Clazz.defineMethod (c$, "removeNode", 
function (child) {
var wasRemoved = false;
{
if (this.children != null) {
wasRemoved = this.children.remove (child.name ()) != null;
if (wasRemoved) this.makeDirty ();
if (this.children.isEmpty ()) this.children = null;
}}if (wasRemoved) this.fireNodeEvent ( new org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent (this, child), false);
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.overrideMethod (c$, "removeNodeChangeListener", 
function (listener) {
this.checkRemoved ();
if (this.nodeChangeListeners == null) return ;
this.nodeChangeListeners.remove (listener);
if (this.nodeChangeListeners.size () == 0) this.nodeChangeListeners = null;
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Removed preference node change listener: " + listener + " from: " + this.absolutePath ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.INodeChangeListener");
Clazz.overrideMethod (c$, "removePreferenceChangeListener", 
function (listener) {
this.checkRemoved ();
if (this.preferenceChangeListeners == null) return ;
this.preferenceChangeListeners.remove (listener);
if (this.preferenceChangeListeners.size () == 0) this.preferenceChangeListeners = null;
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Removed preference property change listener: " + listener + " from: " + this.absolutePath ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.IPreferenceChangeListener");
Clazz.defineMethod (c$, "save", 
function () {
this.save (this.getLocation ());
});
Clazz.defineMethod (c$, "save", 
function (location) {
if (location == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Unable to determine location of preference file for node: " + this.absolutePath ());
return ;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Saving preferences to file: " + location);
var table = this.convertToProperties ( new java.util.Properties (), "");
if (table.isEmpty ()) {
if (location.toFile ().exists () && !location.toFile ().$delete ()) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_failedDelete, location);
org.eclipse.core.internal.preferences.EclipsePreferences.log ( new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 2, message, null));
}return ;
}table.put ("eclipse.preferences.version", "1");
var output = null;
var fos = null;
try {
var parentFile = location.toFile ().getParentFile ();
if (parentFile == null) return ;
parentFile.mkdirs ();
fos =  new java.io.FileOutputStream (location.toOSString (), false);
output =  new java.io.BufferedOutputStream (fos);
table.store (output, null);
output.flush ();
fos.getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_saveException, location);
org.eclipse.core.internal.preferences.EclipsePreferences.log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e));
throw  new org.osgi.service.prefs.BackingStoreException (message);
} else {
throw e;
}
} finally {
if (output != null) try {
output.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "shareStrings", 
function (pool) {
{
var temp = this.properties;
if (temp != null) temp.shareStrings (pool);
}var myChildren = this.getChildren (false);
for (var i = 0; i < myChildren.length; i++) if (Clazz.instanceOf (myChildren[i], org.eclipse.core.internal.preferences.EclipsePreferences)) (myChildren[i]).shareStrings (pool);

}, "org.eclipse.core.internal.preferences.StringPool");
c$.encodePath = Clazz.defineMethod (c$, "encodePath", 
function (path, key) {
var result;
var pathLength = path == null ? 0 : path.length;
if (key.indexOf ('/') == -1) {
if (pathLength == 0) result = key;
 else result = path + '/' + key;
} else {
if (pathLength == 0) result = "//" + key;
 else result = path + "//" + key;
}return result;
}, "~S,~S");
c$.getSegment = Clazz.defineMethod (c$, "getSegment", 
function (path, segment) {
var start = path.indexOf ('/') == 0 ? 1 : 0;
var end = path.indexOf ('/', start);
if (end == path.length - 1) end = -1;
for (var i = 0; i < segment; i++) {
if (end == -1) return null;
start = end + 1;
end = path.indexOf ('/', start);
}
if (end == -1) end = path.length;
return path.substring (start, end);
}, "~S,~N");
c$.getSegmentCount = Clazz.defineMethod (c$, "getSegmentCount", 
function (path) {
var tokenizer =  new java.util.StringTokenizer (path, String.valueOf ('/'));
return tokenizer.countTokens ();
}, "~S");
c$.makeRelative = Clazz.defineMethod (c$, "makeRelative", 
function (path) {
var result = path;
if (path == null) return "";
if (path.length > 0 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) result = path.length == 0 ? "" : path.substring (1);
return result;
}, "~S");
c$.decodePath = Clazz.defineMethod (c$, "decodePath", 
function (fullPath) {
var key = null;
var path = null;
var index = fullPath.indexOf ("//");
if (index == -1) {
var lastIndex = fullPath.lastIndexOf ('/');
if (lastIndex == -1) {
key = fullPath;
} else {
path = fullPath.substring (0, lastIndex);
key = fullPath.substring (lastIndex + 1);
}} else {
path = fullPath.substring (0, index);
key = fullPath.substring (index + 2);
}if (path != null) if (path.length == 0) path = null;
 else if ((path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) path = path.substring (1);
return [path, key];
}, "~S");
Clazz.overrideMethod (c$, "sync", 
function () {
this.checkRemoved ();
var node = this.getLoadLevel ();
if (node == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Preference node is not a load root: " + this.absolutePath ());
return ;
}if (Clazz.instanceOf (node, org.eclipse.core.internal.preferences.EclipsePreferences)) {
(node).load ();
node.flush ();
}});
Clazz.defineMethod (c$, "toDeepDebugString", 
function () {
var buffer =  new StringBuffer ();
var visitor = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.preferences.EclipsePreferences$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.preferences, "EclipsePreferences$3", null, org.eclipse.core.runtime.preferences.IPreferenceNodeVisitor);
Clazz.defineMethod (c$, "visit", 
function (node) {
this.f$.buffer.append (node);
this.f$.buffer.append ('\n');
var keys = node.keys ();
for (var i = 0; i < keys.length; i++) {
this.f$.buffer.append (node.absolutePath ());
this.f$.buffer.append (org.eclipse.core.internal.preferences.EclipsePreferences.PATH_SEPARATOR);
this.f$.buffer.append (keys[i]);
this.f$.buffer.append ('=');
this.f$.buffer.append (node.get (keys[i], "*default*"));
this.f$.buffer.append ('\n');
}
return true;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.preferences.EclipsePreferences$3, i$, v$);
}) (this, Clazz.cloneFinals ("buffer", buffer));
try {
this.accept (visitor);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
System.out.println ("Exception while calling #toDeepDebugString()");
e.printStackTrace ();
} else {
throw e;
}
}
return buffer.toString ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.absolutePath ();
});
Clazz.defineStatics (c$,
"DEFAULT_PREFERENCES_DIRNAME", ".settings",
"PREFS_FILE_EXTENSION", "prefs");
c$.EMPTY_NODE_ARRAY = c$.prototype.EMPTY_NODE_ARRAY =  new Array (0);
c$.EMPTY_STRING_ARRAY = c$.prototype.EMPTY_STRING_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"FALSE", "false",
"TRUE", "true",
"VERSION_KEY", "eclipse.preferences.version",
"VERSION_VALUE", "1");
c$.PATH_SEPARATOR = c$.prototype.PATH_SEPARATOR = String.valueOf ('/');
Clazz.defineStatics (c$,
"DOUBLE_SLASH", "//",
"EMPTY_STRING", "");
});
