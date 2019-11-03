Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.EclipsePreferences", "java.util.HashSet"], "org.eclipse.core.internal.preferences.InstancePreferences", ["java.io.BufferedInputStream", "$.FileInputStream", "java.util.Properties", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Policy", "org.eclipse.core.runtime.Path", "$.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.qualifier = null;
this.segmentCount = 0;
this.loadLevel = null;
this.location = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "InstancePreferences", org.eclipse.core.internal.preferences.EclipsePreferences);
c$.getBaseLocation = Clazz.defineMethod (c$, "getBaseLocation", 
($fz = function () {
if (org.eclipse.core.internal.preferences.InstancePreferences.baseLocation == null) {
var instanceLocation = org.eclipse.core.runtime.Platform.getInstanceLocation ();
if (instanceLocation != null && (instanceLocation.isSet () || instanceLocation.allowsDefault ())) ($t$ = org.eclipse.core.internal.preferences.InstancePreferences.baseLocation = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getMetaArea ().getStateLocation ("org.eclipse.core.runtime"), org.eclipse.core.internal.preferences.InstancePreferences.prototype.baseLocation = org.eclipse.core.internal.preferences.InstancePreferences.baseLocation, $t$);
}return org.eclipse.core.internal.preferences.InstancePreferences.baseLocation;
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
($fz = function (parent, name) {
Clazz.superConstructor (this, org.eclipse.core.internal.preferences.InstancePreferences, [parent, name]);
this.initializeChildren ();
var path = this.absolutePath ();
this.segmentCount = org.eclipse.core.internal.preferences.EclipsePreferences.getSegmentCount (path);
if (this.segmentCount < 2) return ;
this.qualifier = org.eclipse.core.internal.preferences.EclipsePreferences.getSegment (path, 1);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.preferences.EclipsePreferences,~S");
Clazz.overrideMethod (c$, "isAlreadyLoaded", 
function (node) {
return org.eclipse.core.internal.preferences.InstancePreferences.loadedNodes.contains (node.name ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.overrideMethod (c$, "loaded", 
function () {
org.eclipse.core.internal.preferences.InstancePreferences.loadedNodes.add (this.name ());
});
Clazz.overrideMethod (c$, "loadLegacy", 
function () {
var path =  new org.eclipse.core.runtime.Path (this.absolutePath ());
if (path.segmentCount () != 2) return ;
if (org.eclipse.core.runtime.Platform.getInstanceLocation () == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Cannot load Legacy plug-in preferences since instance location is not set.");
return ;
}var bundleName = path.segment (1);
var prefFile = null;
var instanceLocation = org.eclipse.core.runtime.Platform.getInstanceLocation ();
if (instanceLocation != null && instanceLocation.isSet ()) prefFile = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getMetaArea ().getPreferenceLocation (bundleName, false).toFile ();
if (prefFile == null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Cannot load legacy values because instance location is not set.");
return ;
}if (!prefFile.exists ()) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Legacy plug-in preference file not found: " + prefFile);
return ;
}if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Loading legacy preferences from " + prefFile);
var input = null;
var values =  new java.util.Properties ();
try {
input =  new java.io.BufferedInputStream ( new java.io.FileInputStream (prefFile));
values.load (input);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("IOException encountered loading legacy preference file " + prefFile);
return ;
} else {
throw e;
}
} finally {
if (input != null) {
try {
input.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) {
org.eclipse.core.internal.runtime.Policy.debug ("IOException encountered closing legacy preference file " + prefFile);
e.printStackTrace ();
}} else {
throw e;
}
}
}}
for (var i = values.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
var value = values.getProperty (key);
if (value != null) {
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Loaded legacy preference: " + key + " -> " + value);
var oldValue = this.internalPut (key, value);
if (!value.equals (oldValue)) this.makeDirty ();
}}
if (!prefFile.$delete ()) if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL) org.eclipse.core.internal.runtime.Policy.debug ("Unable to delete legacy preferences file: " + prefFile);
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
if (this.location == null) this.location = this.computeLocation (org.eclipse.core.internal.preferences.InstancePreferences.getBaseLocation (), this.qualifier);
return this.location;
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
Clazz.defineMethod (c$, "initializeChildren", 
function () {
if (org.eclipse.core.internal.preferences.InstancePreferences.initialized || this.$parent == null) return ;
try {
{
var names = this.computeChildren (org.eclipse.core.internal.preferences.InstancePreferences.getBaseLocation ());
for (var i = 0; i < names.length; i++) this.addChild (names[i], null);

}} finally {
($t$ = org.eclipse.core.internal.preferences.InstancePreferences.initialized = true, org.eclipse.core.internal.preferences.InstancePreferences.prototype.initialized = org.eclipse.core.internal.preferences.InstancePreferences.initialized, $t$);
}
});
Clazz.overrideMethod (c$, "internalCreate", 
function (nodeParent, nodeName, context) {
return  new org.eclipse.core.internal.preferences.InstancePreferences (nodeParent, nodeName);
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
c$.loadedNodes = c$.prototype.loadedNodes =  new java.util.HashSet ();
Clazz.defineStatics (c$,
"initialized", false,
"baseLocation", null);
});
