Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (["java.util.EventObject", "org.osgi.service.prefs.Preferences", "java.lang.IllegalArgumentException"], "org.eclipse.core.runtime.preferences.IEclipsePreferences", null, function () {
Clazz.declareInterface (org.eclipse.core.runtime.preferences, "IEclipsePreferences", org.osgi.service.prefs.Preferences);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.child = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.preferences.IEclipsePreferences, "NodeChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent, [a]);
this.child = b;
}, "org.osgi.service.prefs.Preferences,org.osgi.service.prefs.Preferences");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.getSource ();
});
Clazz.defineMethod (c$, "getChild", 
function () {
return this.child;
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.runtime.preferences.IEclipsePreferences, "INodeChangeListener");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.newValue = null;
this.oldValue = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.preferences.IEclipsePreferences, "PreferenceChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, org.eclipse.core.runtime.preferences.IEclipsePreferences.PreferenceChangeEvent, [a]);
if (b == null || !(Clazz.instanceOf (a, org.osgi.service.prefs.Preferences))) throw  new IllegalArgumentException ();
this.key = b;
this.newValue = d;
this.oldValue = c;
}, "~O,~S,~O,~O");
Clazz.defineMethod (c$, "getNode", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "getKey", 
function () {
return this.key;
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
Clazz.declareInterface (org.eclipse.core.runtime.preferences.IEclipsePreferences, "IPreferenceChangeListener");
});
