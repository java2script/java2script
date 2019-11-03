Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.EclipsePreferences", "java.util.HashSet"], "org.eclipse.core.internal.preferences.ConfigurationPreferences", ["org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.Path"], function () {
c$ = Clazz.decorateAsClass (function () {
this.segmentCount = 0;
this.qualifier = null;
this.location = null;
this.loadLevel = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "ConfigurationPreferences", org.eclipse.core.internal.preferences.EclipsePreferences);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
($fz = function (parent, name) {
Clazz.superConstructor (this, org.eclipse.core.internal.preferences.ConfigurationPreferences, [parent, name]);
this.initializeChildren ();
var path = this.absolutePath ();
this.segmentCount = org.eclipse.core.internal.preferences.EclipsePreferences.getSegmentCount (path);
if (this.segmentCount < 2) return ;
this.qualifier = org.eclipse.core.internal.preferences.EclipsePreferences.getSegment (path, 1);
if (this.qualifier == null) return ;
if (org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation != null) this.location = this.computeLocation (org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation, this.qualifier);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.preferences.EclipsePreferences,~S");
Clazz.overrideMethod (c$, "getLocation", 
function () {
return this.location;
});
Clazz.overrideMethod (c$, "isAlreadyLoaded", 
function (node) {
return org.eclipse.core.internal.preferences.ConfigurationPreferences.loadedNodes.contains (node.name ());
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
Clazz.overrideMethod (c$, "loaded", 
function () {
org.eclipse.core.internal.preferences.ConfigurationPreferences.loadedNodes.add (this.name ());
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
if (org.eclipse.core.internal.preferences.ConfigurationPreferences.initialized || this.$parent == null) return ;
try {
{
if (org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation == null) return ;
var names = this.computeChildren (org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation);
for (var i = 0; i < names.length; i++) this.addChild (names[i], null);

}} finally {
($t$ = org.eclipse.core.internal.preferences.ConfigurationPreferences.initialized = true, org.eclipse.core.internal.preferences.ConfigurationPreferences.prototype.initialized = org.eclipse.core.internal.preferences.ConfigurationPreferences.initialized, $t$);
}
});
Clazz.overrideMethod (c$, "internalCreate", 
function (nodeParent, nodeName, context) {
return  new org.eclipse.core.internal.preferences.ConfigurationPreferences (nodeParent, nodeName);
}, "org.eclipse.core.internal.preferences.EclipsePreferences,~S,org.eclipse.core.runtime.Plugin");
c$.loadedNodes = c$.prototype.loadedNodes =  new java.util.HashSet ();
Clazz.defineStatics (c$,
"initialized", false,
"baseLocation", null);
{
var url = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getConfigurationLocation ().getURL ();
if (url != null) ($t$ = org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation =  new org.eclipse.core.runtime.Path (url.getFile ()), org.eclipse.core.internal.preferences.ConfigurationPreferences.prototype.baseLocation = org.eclipse.core.internal.preferences.ConfigurationPreferences.baseLocation, $t$);
}});
