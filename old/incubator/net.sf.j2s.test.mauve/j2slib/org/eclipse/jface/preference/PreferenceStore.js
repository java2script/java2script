Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.IPersistentPreferenceStore", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.preference.PreferenceStore", ["java.io.FileInputStream", "$.FileOutputStream", "$.IOException", "java.lang.Boolean", "$.Double", "$.Float", "$.Long", "java.util.ArrayList", "$.Properties", "org.eclipse.jface.preference.IPreferenceStore", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$.PropertyChangeEvent", "$.SafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.properties = null;
this.defaultProperties = null;
this.dirty = false;
this.filename = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceStore", null, org.eclipse.jface.preference.IPersistentPreferenceStore);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.defaultProperties =  new java.util.Properties ();
this.properties =  new java.util.Properties (this.defaultProperties);
});
Clazz.makeConstructor (c$, 
function (filename) {
this.construct ();
org.eclipse.jface.util.Assert.isNotNull (filename);
this.filename = filename;
}, "~S");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.overrideMethod (c$, "contains", 
function (name) {
return (this.properties.containsKey (name) || this.defaultProperties.containsKey (name));
}, "~S");
Clazz.overrideMethod (c$, "firePropertyChangeEvent", 
function (name, oldValue, newValue) {
var finalListeners = this.listeners.getListeners ();
if (finalListeners.length > 0 && (oldValue == null || !oldValue.equals (newValue))) {
var pe =  new org.eclipse.jface.util.PropertyChangeEvent (this, name, oldValue, newValue);
for (var i = 0; i < finalListeners.length; ++i) {
var l = finalListeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceStore$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceStore$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.propertyChange (this.f$.pe);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceStore$1, i$, v$, arg0);
}) (this, org.eclipse.jface.resource.JFaceResources.getString ("PreferenceStore.changeError"), Clazz.cloneFinals ("l", l, "pe", pe)));
}
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "getBoolean", 
function (name) {
return this.getBoolean (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getBoolean", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return false;
if (value.equals ("true")) return true;
return false;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.overrideMethod (c$, "getDefaultBoolean", 
function (name) {
return this.getBoolean (this.defaultProperties, name);
}, "~S");
Clazz.overrideMethod (c$, "getDefaultDouble", 
function (name) {
return this.getDouble (this.defaultProperties, name);
}, "~S");
Clazz.overrideMethod (c$, "getDefaultFloat", 
function (name) {
return this.getFloat (this.defaultProperties, name);
}, "~S");
Clazz.overrideMethod (c$, "getDefaultInt", 
function (name) {
return this.getInt (this.defaultProperties, name);
}, "~S");
Clazz.overrideMethod (c$, "getDefaultLong", 
function (name) {
return this.getLong (this.defaultProperties, name);
}, "~S");
Clazz.overrideMethod (c$, "getDefaultString", 
function (name) {
return this.getString (this.defaultProperties, name);
}, "~S");
Clazz.defineMethod (c$, "getDouble", 
function (name) {
return this.getDouble (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getDouble", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return 0.0;
var ival = 0.0;
try {
ival =  new Double (value).doubleValue ();
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return ival;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.defineMethod (c$, "getFloat", 
function (name) {
return this.getFloat (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getFloat", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return 0.0;
var ival = 0.0;
try {
ival =  new Float (value).floatValue ();
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return ival;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.defineMethod (c$, "getInt", 
function (name) {
return this.getInt (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getInt", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return 0;
var ival = 0;
try {
ival = Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return ival;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.defineMethod (c$, "getLong", 
function (name) {
return this.getLong (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getLong", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return 0;
var ival = 0;
try {
ival = Long.parseLong (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
return ival;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.defineMethod (c$, "getString", 
function (name) {
return this.getString (this.properties, name);
}, "~S");
Clazz.defineMethod (c$, "getString", 
($fz = function (p, name) {
var value = p != null ? p.getProperty (name) : null;
if (value == null) return "";
return value;
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S");
Clazz.overrideMethod (c$, "isDefault", 
function (name) {
return (!this.properties.containsKey (name) && this.defaultProperties.containsKey (name));
}, "~S");
Clazz.defineMethod (c$, "list", 
function (out) {
this.properties.list (out);
}, "java.io.PrintStream");
Clazz.defineMethod (c$, "list", 
function (out) {
this.properties.list (out);
}, "java.io.PrintWriter");
Clazz.defineMethod (c$, "load", 
function () {
if (this.filename == null) throw  new java.io.IOException ("File name not specified");
var $in =  new java.io.FileInputStream (this.filename);
this.load ($in);
$in.close ();
});
Clazz.defineMethod (c$, "load", 
function ($in) {
this.properties.load ($in);
this.dirty = false;
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "needsSaving", 
function () {
return this.dirty;
});
Clazz.defineMethod (c$, "preferenceNames", 
function () {
var list =  new java.util.ArrayList ();
var it = this.properties.propertyNames ();
while (it.hasMoreElements ()) {
list.add (it.nextElement ());
}
return list.toArray ( new Array (list.size ()));
});
Clazz.overrideMethod (c$, "putValue", 
function (name, value) {
var oldValue = this.getString (name);
if (oldValue == null || !oldValue.equals (value)) {
this.setValue (this.properties, name, value);
this.dirty = true;
}}, "~S,~S");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "save", 
function () {
if (this.filename == null) throw  new java.io.IOException ("File name not specified");
var out = null;
try {
out =  new java.io.FileOutputStream (this.filename);
this.save (out, null);
} finally {
if (out != null) out.close ();
}
});
Clazz.defineMethod (c$, "save", 
function (out, header) {
this.properties.store (out, header);
this.dirty = false;
}, "java.io.OutputStream,~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~N");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~N");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~N");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~N");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~S");
Clazz.defineMethod (c$, "setDefault", 
function (name, value) {
this.setValue (this.defaultProperties, name, value);
}, "~S,~B");
Clazz.defineMethod (c$, "setFilename", 
function (name) {
this.filename = name;
}, "~S");
Clazz.overrideMethod (c$, "setToDefault", 
function (name) {
var oldValue = this.properties.get (name);
this.properties.remove (name);
this.dirty = true;
var newValue = null;
if (this.defaultProperties != null) newValue = this.defaultProperties.get (name);
this.firePropertyChangeEvent (name, oldValue, newValue);
}, "~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getDouble (name);
if (oldValue != value) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name,  new Double (oldValue),  new Double (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getFloat (name);
if (oldValue != value) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name,  new Float (oldValue),  new Float (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getInt (name);
if (oldValue != value) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name,  new Integer (oldValue),  new Integer (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getLong (name);
if (oldValue != value) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name,  new Long (oldValue),  new Long (value));
}}, "~S,~N");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getString (name);
if (oldValue == null || !oldValue.equals (value)) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name, oldValue, value);
}}, "~S,~S");
Clazz.defineMethod (c$, "setValue", 
function (name, value) {
var oldValue = this.getBoolean (name);
if (oldValue != value) {
this.setValue (this.properties, name, value);
this.dirty = true;
this.firePropertyChangeEvent (name,  new Boolean (oldValue),  new Boolean (value));
}}, "~S,~B");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null);
p.put (name, Double.toString (value));
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~N");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null);
p.put (name, Float.toString (value));
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~N");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null);
p.put (name, Integer.toString (value));
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~N");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null);
p.put (name, Long.toString (value));
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~N");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null && value != null);
p.put (name, value);
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~S");
Clazz.defineMethod (c$, "setValue", 
($fz = function (p, name, value) {
org.eclipse.jface.util.Assert.isTrue (p != null);
p.put (name, value == true ? "true" : "false");
}, $fz.isPrivate = true, $fz), "java.util.Properties,~S,~B");
});
