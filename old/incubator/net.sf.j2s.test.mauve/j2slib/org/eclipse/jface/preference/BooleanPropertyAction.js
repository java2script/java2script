Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.action.Action"], "org.eclipse.jface.preference.BooleanPropertyAction", ["java.lang.Boolean", "$.IllegalArgumentException", "org.eclipse.jface.util.IPropertyChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.preferenceStore = null;
this.property = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "BooleanPropertyAction", org.eclipse.jface.action.Action);
Clazz.makeConstructor (c$, 
function (title, preferenceStore, property) {
Clazz.superConstructor (this, org.eclipse.jface.preference.BooleanPropertyAction, [title, 2]);
if (preferenceStore == null || property == null) throw  new IllegalArgumentException ();
this.preferenceStore = preferenceStore;
this.property = property;
var finalProprety = property;
preferenceStore.addPropertyChangeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.BooleanPropertyAction$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "BooleanPropertyAction$1", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
if (this.f$.finalProprety.equals (event.getProperty ())) this.b$["org.eclipse.jface.preference.BooleanPropertyAction"].setChecked (Boolean.TRUE.equals (event.getNewValue ()));
}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.BooleanPropertyAction$1, i$, v$);
}) (this, Clazz.cloneFinals ("finalProprety", finalProprety)));
this.setChecked (preferenceStore.getBoolean (property));
}, "~S,org.eclipse.jface.preference.IPreferenceStore,~S");
Clazz.overrideMethod (c$, "run", 
function () {
this.preferenceStore.setValue (this.property, this.isChecked ());
});
});
