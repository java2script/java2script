Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (["org.eclipse.core.internal.preferences.AbstractScope"], "org.eclipse.core.runtime.preferences.ConfigurationScope", ["org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.Path"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.preferences, "ConfigurationScope", org.eclipse.core.internal.preferences.AbstractScope);
Clazz.overrideMethod (c$, "getName", 
function () {
return "configuration";
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
var result = null;
var location = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getConfigurationLocation ();
if (!location.isReadOnly ()) {
var url = location.getURL ();
if (url != null) {
result =  new org.eclipse.core.runtime.Path (url.getFile ());
if (result.isEmpty ()) result = null;
}}return result;
});
Clazz.defineStatics (c$,
"SCOPE", "configuration");
});
