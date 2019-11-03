Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.AbstractScope"], "org.eclipse.core.runtime.preferences.InstanceScope", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.preferences, "InstanceScope", org.eclipse.core.internal.preferences.AbstractScope);
Clazz.overrideMethod (c$, "getLocation", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "instance";
});
Clazz.defineStatics (c$,
"SCOPE", "instance");
});
