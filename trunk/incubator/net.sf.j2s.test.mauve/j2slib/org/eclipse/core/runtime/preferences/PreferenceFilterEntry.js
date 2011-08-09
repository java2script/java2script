Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (null, "org.eclipse.core.runtime.preferences.PreferenceFilterEntry", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.key = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.preferences, "PreferenceFilterEntry");
Clazz.makeConstructor (c$, 
function (key) {
if (key == null || key.length == 0) throw  new IllegalArgumentException ();
this.key = key;
}, "~S");
Clazz.defineMethod (c$, "getKey", 
function () {
return this.key;
});
});
