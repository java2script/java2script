Clazz.declarePackage ("org.eclipse.jface.preference");
c$ = Clazz.declareType (org.eclipse.jface.preference, "JFacePreferences");
c$.getPreferenceStore = Clazz.defineMethod (c$, "getPreferenceStore", 
function () {
return org.eclipse.jface.preference.JFacePreferences.preferenceStore;
});
c$.setPreferenceStore = Clazz.defineMethod (c$, "setPreferenceStore", 
function (store) {
($t$ = org.eclipse.jface.preference.JFacePreferences.preferenceStore = store, org.eclipse.jface.preference.JFacePreferences.prototype.preferenceStore = org.eclipse.jface.preference.JFacePreferences.preferenceStore, $t$);
}, "org.eclipse.jface.preference.IPreferenceStore");
Clazz.defineStatics (c$,
"ERROR_COLOR", "ERROR_COLOR",
"HYPERLINK_COLOR", "HYPERLINK_COLOR",
"ACTIVE_HYPERLINK_COLOR", "ACTIVE_HYPERLINK_COLOR",
"preferenceStore", null);
