Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
c$ = Clazz.declareType (org.eclipse.core.runtime.preferences, "PreferenceModifyListener");
Clazz.defineMethod (c$, "preApply", 
function (node) {
return node;
}, "org.eclipse.core.runtime.preferences.IEclipsePreferences");
