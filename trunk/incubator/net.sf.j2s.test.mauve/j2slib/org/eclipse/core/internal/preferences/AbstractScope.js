Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (["org.eclipse.core.runtime.preferences.IScopeContext"], "org.eclipse.core.internal.preferences.AbstractScope", ["java.lang.IllegalArgumentException", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.preferences, "AbstractScope", null, org.eclipse.core.runtime.preferences.IScopeContext);
Clazz.overrideMethod (c$, "getNode", 
function (qualifier) {
if (qualifier == null) throw  new IllegalArgumentException ();
return org.eclipse.core.runtime.Platform.getPreferencesService ().getRootNode ().node (this.getName ()).node (qualifier);
}, "~S");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (!(Clazz.instanceOf (obj, org.eclipse.core.runtime.preferences.IScopeContext))) return false;
var other = obj;
if (!this.getName ().equals (other.getName ())) return false;
var location = this.getLocation ();
return location == null ? other.getLocation () == null : location.equals (other.getLocation ());
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.getName ().hashCode ();
});
});
