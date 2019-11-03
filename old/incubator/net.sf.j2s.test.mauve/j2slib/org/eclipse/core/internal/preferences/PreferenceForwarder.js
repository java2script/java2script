Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.runtime.Preferences", "org.eclipse.core.runtime.preferences.IEclipsePreferences", "org.eclipse.core.runtime.Platform"], "org.eclipse.core.internal.preferences.PreferenceForwarder", ["java.io.IOException", "java.lang.Boolean", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "$.RuntimeException", "java.util.Properties", "org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pluginRoot = null;
this.defaultsRoot = null;
this.pluginID = null;
this.plugin = null;
this.$notify = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "PreferenceForwarder", org.eclipse.core.runtime.Preferences, [org.eclipse.core.runtime.preferences.IEclipsePreferences.IPreferenceChangeListener, org.eclipse.core.runtime.preferences.IEclipsePreferences.INodeChangeListener]);
Clazz.prepareFields (c$, function () {
this.pluginRoot = org.eclipse.core.runtime.Platform.getPreferencesService ().getRootNode ().node ("instance");
this.defaultsRoot = org.eclipse.core.runtime.Platform.getPreferencesService ().getRootNode ().node ("default");
});
Clazz.makeConstructor (c$, 
function (pluginID) {
this.construct (null, pluginID);
}, "~S");
Clazz.makeConstructor (c$, 
function (plugin, pluginID) {
Clazz.superConstructor (this, org.eclipse.core.internal.preferences.PreferenceForwarder);
this.plugin = plugin;
this.pluginID = pluginID;
this.pluginRoot.addNodeChangeListener (this);
}, "org.eclipse.core.runtime.Plugin,~S");
Clazz.overrideMethod (c$, "added", 
function (event) {
if (this.listeners.size () > 0 && this.pluginID.equals (event.getChild ().name ())) this.getPluginPreferences (true).addPreferenceChangeListener (this);
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent");
Clazz.overrideMethod (c$, "removed", 
function (event) {
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.getPluginPreferences (true).addPreferenceChangeListener (this);
this.listeners.add (listener);
}, "org.eclipse.core.runtime.Preferences.IPropertyChangeListener");
Clazz.overrideMethod (c$, "preferenceChange", 
function (event) {
if (!this.$notify) return ;
var oldValue = event.getOldValue ();
var newValue = event.getNewValue ();
var key = event.getKey ();
if (newValue == null) newValue = this.getDefault (key, oldValue);
 else if (oldValue == null) oldValue = this.getDefault (key, newValue);
this.firePropertyChangeEvent (key, oldValue, newValue);
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences.PreferenceChangeEvent");
Clazz.defineMethod (c$, "getPluginPreferences", 
($fz = function (create) {
try {
if (!create && !this.pluginRoot.nodeExists (this.pluginID)) return null;
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
return null;
} else {
throw e;
}
}
try {
return this.pluginRoot.node (this.pluginID);
} catch (e) {
if (Clazz.instanceOf (e, ClassCastException)) {
throw  new RuntimeException ("Plug-in preferences must be instances of EclipsePreferences: " + e.getMessage ());
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "getDefaultPreferences", 
($fz = function () {
return this.defaultsRoot.node (this.pluginID, this.plugin);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.core.runtime.Preferences.IPropertyChangeListener");
Clazz.defineMethod (c$, "getDefault", 
($fz = function (key, obj) {
var defaults = this.getDefaultPreferences ();
if (Clazz.instanceOf (obj, String)) return defaults.get (key, "");
 else if (Clazz.instanceOf (obj, Integer)) return  new Integer (defaults.getInt (key, 0));
 else if (Clazz.instanceOf (obj, Double)) return  new Double (defaults.getDouble (key, 0.0));
 else if (Clazz.instanceOf (obj, Float)) return  new Float (defaults.getFloat (key, 0.0));
 else if (Clazz.instanceOf (obj, Long)) return  new Long (defaults.getLong (key, 0));
 else if (Clazz.instanceOf (obj, Array)) return defaults.getByteArray (key, org.eclipse.core.internal.preferences.PreferenceForwarder.BYTE_ARRAY_DEFAULT_DEFAULT);
 else if (Clazz.instanceOf (obj, Boolean)) return  new Boolean (defaults.getBoolean (key, false));
 else return null;
}, $fz.isPrivate = true, $fz), "~S,~O");
Clazz.overrideMethod (c$, "contains", 
function (name) {
if (name == null) return false;
var value = this.getPluginPreferences (true).get (name, null);
if (value != null) return true;
return this.getDefaultPreferences ().get (name, null) != null;
}, "~S");
Clazz.overrideMethod (c$, "getBoolean", 
function (name) {
return this.getPluginPreferences (true).getBoolean (name, this.getDefaultPreferences ().getBoolean (name, false));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getBoolean (name) ? Boolean.TRUE : Boolean.FALSE;
var newValue = value ? Boolean.TRUE : Boolean.FALSE;
if (newValue === oldValue) return ;
try {
this.$notify = false;
if (this.getDefaultBoolean (name) == value) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).putBoolean (name, value);
this.firePropertyChangeEvent (name, oldValue, newValue);
} finally {
this.$notify = true;
}
}, "~S,~B");
Clazz.overrideMethod (c$, "getDefaultBoolean", 
function (name) {
return this.getDefaultPreferences ().getBoolean (name, false);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.getDefaultPreferences ().putBoolean (name, value);
}, "~S,~B");
Clazz.overrideMethod (c$, "getDouble", 
function (name) {
return this.getPluginPreferences (true).getDouble (name, this.getDefaultPreferences ().getDouble (name, 0.0));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (Double.isNaN (value)) throw  new IllegalArgumentException ();
var doubleValue = this.getDouble (name);
if (value == doubleValue) return ;
var oldValue =  new Double (doubleValue);
var newValue =  new Double (value);
try {
this.$notify = false;
if (this.getDefaultDouble (name) == value) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).putDouble (name, value);
this.firePropertyChangeEvent (name, oldValue, newValue);
} finally {
this.$notify = true;
}
}, "~S,~N");
Clazz.overrideMethod (c$, "getDefaultDouble", 
function (name) {
return this.getDefaultPreferences ().getDouble (name, 0.0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (Double.isNaN (value)) throw  new IllegalArgumentException ();
this.getDefaultPreferences ().putDouble (name, value);
}, "~S,~N");
Clazz.overrideMethod (c$, "getFloat", 
function (name) {
return this.getPluginPreferences (true).getFloat (name, this.getDefaultPreferences ().getFloat (name, 0.0));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (Float.isNaN (value)) throw  new IllegalArgumentException ();
var floatValue = this.getFloat (name);
if (value == floatValue) return ;
var oldValue =  new Float (floatValue);
var newValue =  new Float (value);
try {
this.$notify = false;
if (this.getDefaultFloat (name) == value) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).putFloat (name, value);
this.firePropertyChangeEvent (name, oldValue, newValue);
} finally {
this.$notify = true;
}
}, "~S,~N");
Clazz.overrideMethod (c$, "getDefaultFloat", 
function (name) {
return this.getDefaultPreferences ().getFloat (name, 0.0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (Float.isNaN (value)) throw  new IllegalArgumentException ();
this.getDefaultPreferences ().putFloat (name, value);
}, "~S,~N");
Clazz.overrideMethod (c$, "getInt", 
function (name) {
return this.getPluginPreferences (true).getInt (name, this.getDefaultPreferences ().getInt (name, 0));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var intValue = this.getInt (name);
if (value == intValue) return ;
var oldValue =  new Integer (intValue);
var newValue =  new Integer (value);
try {
this.$notify = false;
if (this.getDefaultInt (name) == value) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).putInt (name, value);
this.firePropertyChangeEvent (name, oldValue, newValue);
} finally {
this.$notify = true;
}
}, "~S,~N");
Clazz.overrideMethod (c$, "getDefaultInt", 
function (name) {
return this.getDefaultPreferences ().getInt (name, 0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.getDefaultPreferences ().putInt (name, value);
}, "~S,~N");
Clazz.overrideMethod (c$, "getLong", 
function (name) {
return this.getPluginPreferences (true).getLong (name, this.getDefaultPreferences ().getLong (name, 0));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var longValue = this.getLong (name);
if (value == longValue) return ;
var oldValue =  new Long (longValue);
var newValue =  new Long (value);
try {
this.$notify = false;
if (this.getDefaultLong (name) == value) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).putLong (name, value);
this.firePropertyChangeEvent (name, oldValue, newValue);
} finally {
this.$notify = true;
}
}, "~S,~N");
Clazz.overrideMethod (c$, "getDefaultLong", 
function (name) {
return this.getDefaultPreferences ().getLong (name, 0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.getDefaultPreferences ().putLong (name, value);
}, "~S,~N");
Clazz.overrideMethod (c$, "getString", 
function (name) {
return this.getPluginPreferences (true).get (name, this.getDefaultPreferences ().get (name, ""));
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (value == null) throw  new IllegalArgumentException ();
var oldValue = this.getString (name);
if (value.equals (oldValue)) return ;
try {
this.$notify = false;
if (this.getDefaultString (name).equals (value)) this.getPluginPreferences (true).remove (name);
 else this.getPluginPreferences (true).put (name, value);
this.firePropertyChangeEvent (name, oldValue, value);
} finally {
this.$notify = true;
}
}, "~S,~S");
Clazz.overrideMethod (c$, "getDefaultString", 
function (name) {
return this.getDefaultPreferences ().get (name, "");
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (value == null) throw  new IllegalArgumentException ();
this.getDefaultPreferences ().put (name, value);
}, "~S,~S");
Clazz.overrideMethod (c$, "isDefault", 
function (name) {
if (name == null) return false;
return this.getPluginPreferences (true).get (name, null) == null;
}, "~S");
Clazz.overrideMethod (c$, "setToDefault", 
function (name) {
var preferences = this.getPluginPreferences (true);
var oldValue = preferences.get (name, null);
if (oldValue != null) preferences.remove (name);
}, "~S");
Clazz.overrideMethod (c$, "propertyNames", 
function () {
return this.getPluginPreferences (true).keys ();
});
Clazz.overrideMethod (c$, "defaultPropertyNames", 
function () {
try {
return this.getDefaultPreferences ().keys ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
this.logError (e.getMessage (), e);
return  new Array (0);
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "needsSaving", 
function () {
return this.getPluginPreferences (true).dirty;
});
Clazz.defineMethod (c$, "flush", 
function () {
var node = this.getPluginPreferences (false);
if (node != null) node.flush ();
});
Clazz.defineMethod (c$, "logError", 
($fz = function (message, e) {
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}, $fz.isPrivate = true, $fz), "~S,Exception");
Clazz.overrideMethod (c$, "load", 
function ($in) {
var result =  new java.util.Properties ();
result.load ($in);
this.convertFromProperties (result);
try {
this.flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "store", 
function (out, header) {
var result = this.convertToProperties ();
result.store (out, header);
try {
this.flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}, "java.io.OutputStream,~S");
Clazz.defineMethod (c$, "convertFromProperties", 
($fz = function (props) {
var preferences = this.getPluginPreferences (true);
for (var i = props.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
var value = props.getProperty (key);
if (value != null) preferences.put (key, value);
}
}, $fz.isPrivate = true, $fz), "java.util.Properties");
Clazz.overrideMethod (c$, "toString", 
function () {
return "PreferenceForwarder(" + this.pluginID + ")";
});
Clazz.defineMethod (c$, "convertToProperties", 
($fz = function () {
var result =  new java.util.Properties ();
var keys = this.propertyNames ();
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
var value = this.getString (key);
if (!"".equals (value)) result.put (key, value);
}
return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"BYTE_ARRAY_DEFAULT_DEFAULT",  Clazz.newArray (0, 0));
});
