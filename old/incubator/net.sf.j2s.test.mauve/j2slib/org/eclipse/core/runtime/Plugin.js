Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.osgi.framework.BundleActivator"], "org.eclipse.core.runtime.Plugin", ["java.lang.Long", "org.eclipse.core.internal.preferences.PreferenceForwarder", "org.eclipse.core.internal.runtime.Assert", "$.CompatibilityHelper", "$.FindSupport", "$.InternalPlatform", "$.Messages", "$.Policy", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.debug = false;
this.descriptor = null;
this.preferences = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "Plugin", null, org.osgi.framework.BundleActivator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (descriptor) {
org.eclipse.core.internal.runtime.Assert.isNotNull (descriptor);
org.eclipse.core.internal.runtime.Assert.isTrue (!org.eclipse.core.internal.runtime.CompatibilityHelper.hasPluginObject (descriptor), org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_deactivatedLoad, this.getClass ().getName (), descriptor.getUniqueIdentifier () + " is not activated"));
this.descriptor = descriptor;
this.bundle = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (descriptor.getUniqueIdentifier ());
try {
if ((this.bundle.getState () & (56)) == 0) this.bundle.start ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_startupProblems, descriptor.getUniqueIdentifier ());
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
} else {
throw e;
}
}
}, "org.eclipse.core.runtime.IPluginDescriptor");
Clazz.defineMethod (c$, "find", 
function (path) {
return org.eclipse.core.internal.runtime.FindSupport.find (this.bundle, path, null);
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "find", 
function (path, override) {
return org.eclipse.core.internal.runtime.FindSupport.find (this.bundle, path, override);
}, "org.eclipse.core.runtime.IPath,java.util.Map");
Clazz.defineMethod (c$, "getDescriptor", 
function () {
if (this.descriptor != null) return this.descriptor;
return this.initializeDescriptor (this.bundle.getSymbolicName ());
});
Clazz.defineMethod (c$, "getLog", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getLog (this.bundle);
});
Clazz.defineMethod (c$, "getStateLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getStateLocation (this.bundle, true);
});
Clazz.defineMethod (c$, "getPluginPreferences", 
function () {
if (this.preferences != null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Plugin preferences already loaded for: " + this.bundle.getSymbolicName ());
return this.preferences;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Loading preferences for plugin: " + this.bundle.getSymbolicName ());
this.preferences =  new org.eclipse.core.internal.preferences.PreferenceForwarder (this, this.bundle.getSymbolicName ());
return this.preferences;
});
Clazz.defineMethod (c$, "savePluginPreferences", 
function () {
this.getPluginPreferences ();
try {
this.preferences.flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, org.eclipse.core.internal.runtime.Messages.preferences_saveProblems, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "initializeDefaultPluginPreferences", 
function () {
});
Clazz.defineMethod (c$, "internalInitializeDefaultPluginPreferences", 
function () {
this.initializeDefaultPluginPreferences ();
});
Clazz.defineMethod (c$, "isDebugging", 
function () {
return this.debug;
});
Clazz.defineMethod (c$, "openStream", 
function (file) {
return org.eclipse.core.internal.runtime.FindSupport.openStream (this.bundle, file, false);
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "openStream", 
function (file, localized) {
return org.eclipse.core.internal.runtime.FindSupport.openStream (this.bundle, file, localized);
}, "org.eclipse.core.runtime.IPath,~B");
Clazz.defineMethod (c$, "setDebugging", 
function (value) {
this.debug = value;
}, "~B");
Clazz.defineMethod (c$, "shutdown", 
function () {
if (org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility () == null) return ;
var exception = null;
var m;
try {
m = this.descriptor.getClass ().getMethod ("doPluginDeactivation",  new Array (0));
m.invoke (this.descriptor, [null]);
} catch (e$$) {
if (Clazz.instanceOf (e$$, SecurityException)) {
var e = e$$;
{
exception = e;
}
} else if (Clazz.instanceOf (e$$, NoSuchMethodException)) {
var e = e$$;
{
exception = e;
}
} else if (Clazz.instanceOf (e$$, IllegalArgumentException)) {
var e = e$$;
{
exception = e;
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
exception = e;
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
exception = e;
}
} else {
throw e$$;
}
}
if (exception == null) return ;
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.plugin_shutdownProblems, this.descriptor.getUniqueIdentifier ());
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, message, exception);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
});
Clazz.defineMethod (c$, "startup", 
function () {
});
Clazz.overrideMethod (c$, "toString", 
function () {
var name = this.bundle.getSymbolicName ();
return name == null ?  new Long (this.bundle.getBundleId ()).toString () : name;
});
Clazz.overrideMethod (c$, "start", 
function (context) {
this.bundle = context.getBundle ();
var symbolicName = this.bundle.getSymbolicName ();
if (symbolicName != null) {
var key = symbolicName + "/debug";
var value = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption (key);
this.debug = value == null ? false : value.equalsIgnoreCase ("true");
}this.initializeDescriptor (symbolicName);
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "initializeDescriptor", 
($fz = function (symbolicName) {
if (org.eclipse.core.internal.runtime.CompatibilityHelper.initializeCompatibility () == null) return null;
if (symbolicName == null) return null;
var tmp = org.eclipse.core.internal.runtime.CompatibilityHelper.getPluginDescriptor (symbolicName);
if (!symbolicName.equals ("org.eclipse.core.runtime")) this.descriptor = tmp;
org.eclipse.core.internal.runtime.CompatibilityHelper.setPlugin (tmp, this);
org.eclipse.core.internal.runtime.CompatibilityHelper.setActive (tmp);
return tmp;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "stop", 
function (context) {
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
c$.PLUGIN_PREFERENCE_SCOPE = c$.prototype.PLUGIN_PREFERENCE_SCOPE = "instance";
Clazz.defineStatics (c$,
"PREFERENCES_DEFAULT_OVERRIDE_BASE_NAME", "preferences");
c$.PREFERENCES_DEFAULT_OVERRIDE_FILE_NAME = c$.prototype.PREFERENCES_DEFAULT_OVERRIDE_FILE_NAME = "preferences.ini";
});
