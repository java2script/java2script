Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.EclipsePreferences"], "org.eclipse.core.internal.preferences.RootPreferences", ["org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.preferences, "RootPreferences", org.eclipse.core.internal.preferences.EclipsePreferences);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.internal.preferences.RootPreferences, [null, ""]);
});
Clazz.overrideMethod (c$, "flush", 
function () {
var exception = null;
var names = this.childrenNames ();
for (var i = 0; i < names.length; i++) {
try {
this.node (names[i]).flush ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
if (exception != null) exception = e;
} else {
throw e;
}
}
}
if (exception != null) throw exception;
});
Clazz.defineMethod (c$, "getChild", 
function (key, context) {
var value = null;
var child = null;
if (this.children != null) value = this.children.get (key);
if (value != null) {
if (Clazz.instanceOf (value, org.eclipse.core.runtime.preferences.IEclipsePreferences)) return value;
child = (org.eclipse.core.runtime.Platform.getPreferencesService ()).createNode (key);
this.addChild (key, child);
}return child;
}, "~S,org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "getChildren", 
function () {
var childNames = this.childrenNames ();
var childNodes =  new Array (childNames.length);
for (var i = 0; i < childNames.length; i++) childNodes[i] = this.getChild (childNames[i], null);

return childNodes;
});
Clazz.overrideMethod (c$, "node", 
function (path) {
if (path.length == 0 || (path.length == 1 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) return this;
var startIndex = (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0) ? 1 : 0;
var endIndex = path.indexOf ('/', startIndex + 1);
var scope = path.substring (startIndex, endIndex == -1 ? path.length : endIndex);
var child = this.getChild (scope, null);
if (child == null) {
child =  new org.eclipse.core.internal.preferences.EclipsePreferences (this, scope);
this.addChild (scope, child);
}return child.node (endIndex == -1 ? "" : path.substring (endIndex + 1));
}, "~S");
Clazz.overrideMethod (c$, "sync", 
function () {
var exception = null;
var names = this.childrenNames ();
for (var i = 0; i < names.length; i++) {
try {
this.node (names[i]).sync ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.service.prefs.BackingStoreException)) {
if (exception != null) exception = e;
} else {
throw e;
}
}
}
if (exception != null) throw exception;
});
});
