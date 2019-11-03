Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["java.util.EventListener", "$.EventObject", "org.eclipse.core.internal.runtime.ListenerList"], "org.eclipse.core.runtime.Preferences", ["java.io.BufferedInputStream", "$.BufferedOutputStream", "$.FileInputStream", "$.FileOutputStream", "java.lang.Boolean", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "java.util.Properties", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.core.runtime.CoreException", "$.ISafeRunnable", "$.Platform", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.properties = null;
this.defaultProperties = null;
this.dirty = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "Preferences");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.propertyName = null;
this.oldValue = null;
this.newValue = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.Preferences, "PropertyChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, org.eclipse.core.runtime.Preferences.PropertyChangeEvent, [a]);
if (b == null) {
throw  new IllegalArgumentException ();
}this.propertyName = b;
this.oldValue = c;
this.newValue = d;
}, "~O,~S,~O,~O");
Clazz.defineMethod (c$, "getProperty", 
function () {
return this.propertyName;
});
Clazz.defineMethod (c$, "getNewValue", 
function () {
return this.newValue;
});
Clazz.defineMethod (c$, "getOldValue", 
function () {
return this.oldValue;
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.runtime.Preferences, "IPropertyChangeListener", java.util.EventListener);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.core.internal.runtime.ListenerList ();
});
c$.exportPreferences = Clazz.defineMethod (c$, "exportPreferences", 
function (path) {
var file = path.toFile ();
if (file.exists ()) file.$delete ();
file.getParentFile ().mkdirs ();
var service = org.eclipse.core.runtime.Platform.getPreferencesService ();
var output = null;
var fos = null;
try {
fos =  new java.io.FileOutputStream (file);
output =  new java.io.BufferedOutputStream (fos);
var node = service.getRootNode ().node ("instance");
service.exportPreferences (node, output, Clazz.castNullAs ("Array"));
output.flush ();
fos.getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_errorWriting, file, e.getMessage ());
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
throw  new org.eclipse.core.runtime.CoreException (status);
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
c$.importPreferences = Clazz.defineMethod (c$, "importPreferences", 
function (path) {
if (!path.toFile ().exists ()) {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_fileNotFound, path.toOSString ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, null));
}var service = org.eclipse.core.runtime.Platform.getPreferencesService ();
var input = null;
try {
input =  new java.io.BufferedInputStream ( new java.io.FileInputStream (path.toFile ()));
service.importPreferences (input);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.preferences_fileNotFound, path.toOSString ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, e));
} else {
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
}, "org.eclipse.core.runtime.IPath");
c$.validatePreferenceVersions = Clazz.defineMethod (c$, "validatePreferenceVersions", 
function (file) {
var service = org.eclipse.core.runtime.Platform.getPreferencesService ();
return service.validateVersions (file);
}, "org.eclipse.core.runtime.IPath");
Clazz.makeConstructor (c$, 
function () {
this.defaultProperties =  new java.util.Properties ();
this.properties =  new java.util.Properties (this.defaultProperties);
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.core.runtime.Preferences.IPropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.core.runtime.Preferences.IPropertyChangeListener");
Clazz.defineMethod (c$, "contains", 
function (name) {
return (this.properties.containsKey (name) || this.defaultProperties.containsKey (name));
}, "~S");
Clazz.defineMethod (c$, "firePropertyChangeEvent", 
function (name, oldValue, newValue) {
if (name == null) throw  new IllegalArgumentException ();
var changeListeners = this.listeners.getListeners ();
if (changeListeners.length == 0) return ;
var pe =  new org.eclipse.core.runtime.Preferences.PropertyChangeEvent (this, name, oldValue, newValue);
for (var i = 0; i < changeListeners.length; ++i) {
var l = changeListeners[i];
var job = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.Preferences$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime, "Preferences$1", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (exception) {
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.l.propertyChange (this.f$.pe);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.Preferences$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "pe", pe));
org.eclipse.core.runtime.Platform.run (job);
}
}, "~S,~O,~O");
Clazz.defineMethod (c$, "getBoolean", 
function (name) {
var value = this.properties.getProperty (name);
if (value == null) {
return false;
}return value.equals ("true");
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var defaultValue = this.getDefaultBoolean (name);
var oldValue = this.getBoolean (name);
if (value == defaultValue) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, value ? "true" : "false");
}if (oldValue != value) {
this.dirty = true;
this.firePropertyChangeEvent (name, oldValue ? Boolean.TRUE : Boolean.FALSE, value ? Boolean.TRUE : Boolean.FALSE);
}}, "~S,~B");
Clazz.defineMethod (c$, "getDefaultBoolean", 
function (name) {
var value = this.defaultProperties.getProperty (name);
if (value == null) {
return false;
}return value.equals ("true");
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.defaultProperties.put (name, value ? "true" : "false");
}, "~S,~B");
Clazz.defineMethod (c$, "getDouble", 
function (name) {
return this.convertToDouble (this.properties.getProperty (name), 0.0);
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (Double.isNaN (value)) {
throw  new IllegalArgumentException ();
}var defaultValue = this.getDefaultDouble (name);
var oldValue = this.getDouble (name);
if (value == defaultValue) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, Double.toString (value));
}if (oldValue != value) {
this.dirty = true;
this.firePropertyChangeEvent (name,  new Double (oldValue),  new Double (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "getDefaultDouble", 
function (name) {
return this.convertToDouble (this.defaultProperties.getProperty (name), 0.0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (Double.isNaN (value)) {
throw  new IllegalArgumentException ();
}this.defaultProperties.put (name, Double.toString (value));
}, "~S,~N");
Clazz.defineMethod (c$, "convertToDouble", 
($fz = function (rawPropertyValue, defaultValue) {
var result = defaultValue;
if (rawPropertyValue != null) {
try {
result = Double.parseDouble (rawPropertyValue);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}return result;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "getFloat", 
function (name) {
return this.convertToFloat (this.properties.getProperty (name), 0.0);
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (Float.isNaN (value)) {
throw  new IllegalArgumentException ();
}var defaultValue = this.getDefaultFloat (name);
var oldValue = this.getFloat (name);
if (value == defaultValue) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, Float.toString (value));
}if (oldValue != value) {
this.dirty = true;
this.firePropertyChangeEvent (name,  new Float (oldValue),  new Float (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "getDefaultFloat", 
function (name) {
return this.convertToFloat (this.defaultProperties.getProperty (name), 0.0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (Float.isNaN (value)) {
throw  new IllegalArgumentException ();
}this.defaultProperties.put (name, Float.toString (value));
}, "~S,~N");
Clazz.defineMethod (c$, "convertToFloat", 
($fz = function (rawPropertyValue, defaultValue) {
var result = defaultValue;
if (rawPropertyValue != null) {
try {
result = Float.parseFloat (rawPropertyValue);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}return result;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "getInt", 
function (name) {
return this.convertToInt (this.properties.getProperty (name), 0);
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var defaultValue = this.getDefaultInt (name);
var oldValue = this.getInt (name);
if (value == defaultValue) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, Integer.toString (value));
}if (oldValue != value) {
this.dirty = true;
this.firePropertyChangeEvent (name,  new Integer (oldValue),  new Integer (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "getDefaultInt", 
function (name) {
return this.convertToInt (this.defaultProperties.getProperty (name), 0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.defaultProperties.put (name, Integer.toString (value));
}, "~S,~N");
Clazz.defineMethod (c$, "convertToInt", 
($fz = function (rawPropertyValue, defaultValue) {
var result = defaultValue;
if (rawPropertyValue != null) {
try {
result = Integer.parseInt (rawPropertyValue);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}return result;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "getLong", 
function (name) {
return this.convertToLong (this.properties.getProperty (name), 0);
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var defaultValue = this.getDefaultLong (name);
var oldValue = this.getLong (name);
if (value == defaultValue) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, Long.toString (value));
}if (oldValue != value) {
this.dirty = true;
this.firePropertyChangeEvent (name,  new Long (oldValue),  new Long (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "getDefaultLong", 
function (name) {
return this.convertToLong (this.defaultProperties.getProperty (name), 0);
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.defaultProperties.put (name, Long.toString (value));
}, "~S,~N");
Clazz.defineMethod (c$, "convertToLong", 
($fz = function (rawPropertyValue, defaultValue) {
var result = defaultValue;
if (rawPropertyValue != null) {
try {
result = Long.parseLong (rawPropertyValue);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}return result;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "getString", 
function (name) {
var value = this.properties.getProperty (name);
return (value != null ? value : "");
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
if (value == null) {
throw  new IllegalArgumentException ();
}var defaultValue = this.getDefaultString (name);
var oldValue = this.getString (name);
if (value.equals (defaultValue)) {
var removed = this.properties.remove (name);
if (removed != null) {
this.dirty = true;
}} else {
this.properties.put (name, value);
}if (!oldValue.equals (value)) {
this.dirty = true;
this.firePropertyChangeEvent (name, oldValue, value);
}}, "~S,~S");
Clazz.defineMethod (c$, "getDefaultString", 
function (name) {
var value = this.defaultProperties.getProperty (name);
return (value != null ? value : "");
}, "~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
if (value == null) {
throw  new IllegalArgumentException ();
}this.defaultProperties.put (name, value);
}, "~S,~S");
Clazz.defineMethod (c$, "isDefault", 
function (name) {
return !this.properties.containsKey (name);
}, "~S");
Clazz.defineMethod (c$, "setToDefault", 
function (name) {
var oldPropertyValue = this.properties.remove (name);
if (oldPropertyValue != null) {
this.dirty = true;
}var newValue = this.defaultProperties.getProperty (name, null);
this.firePropertyChangeEvent (name, oldPropertyValue, newValue);
}, "~S");
Clazz.defineMethod (c$, "propertyNames", 
function () {
return this.properties.keySet ().toArray (org.eclipse.core.runtime.Preferences.EMPTY_STRING_ARRAY);
});
Clazz.defineMethod (c$, "defaultPropertyNames", 
function () {
return this.defaultProperties.keySet ().toArray (org.eclipse.core.runtime.Preferences.EMPTY_STRING_ARRAY);
});
Clazz.defineMethod (c$, "needsSaving", 
function () {
return this.dirty;
});
Clazz.defineMethod (c$, "store", 
function (out, header) {
this.properties.store (out, header);
this.dirty = false;
}, "java.io.OutputStream,~S");
Clazz.defineMethod (c$, "load", 
function ($in) {
this.properties.load ($in);
this.dirty = false;
}, "java.io.InputStream");
Clazz.defineStatics (c$,
"BOOLEAN_DEFAULT_DEFAULT", false,
"DOUBLE_DEFAULT_DEFAULT", 0.0,
"FLOAT_DEFAULT_DEFAULT", 0.0,
"INT_DEFAULT_DEFAULT", 0,
"LONG_DEFAULT_DEFAULT", 0,
"STRING_DEFAULT_DEFAULT", "",
"TRUE", "true",
"FALSE", "false");
c$.EMPTY_STRING_ARRAY = c$.prototype.EMPTY_STRING_ARRAY =  new Array (0);
});
