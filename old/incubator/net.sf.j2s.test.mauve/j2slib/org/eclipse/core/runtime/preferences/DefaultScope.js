Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.AbstractScope"], "org.eclipse.core.runtime.preferences.DefaultScope", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.preferences, "DefaultScope", org.eclipse.core.internal.preferences.AbstractScope);
Clazz.overrideMethod (c$, "getName", 
function () {
return "default";
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
return null;
});
Clazz.defineStatics (c$,
"SCOPE", "default");
});
