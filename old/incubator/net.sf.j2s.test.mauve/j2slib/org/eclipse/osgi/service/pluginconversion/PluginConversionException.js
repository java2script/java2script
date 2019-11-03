Clazz.declarePackage ("org.eclipse.osgi.service.pluginconversion");
Clazz.load (["java.lang.Exception"], "org.eclipse.osgi.service.pluginconversion.PluginConversionException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.service.pluginconversion, "PluginConversionException", Exception);
Clazz.makeConstructor (c$, 
function (message, cause) {
Clazz.superConstructor (this, org.eclipse.osgi.service.pluginconversion.PluginConversionException, [message]);
this.$cause = cause;
}, "~S,Throwable");
Clazz.makeConstructor (c$, 
function (cause) {
Clazz.superConstructor (this, org.eclipse.osgi.service.pluginconversion.PluginConversionException, []);
this.$cause = cause;
}, "Throwable");
Clazz.overrideMethod (c$, "getCause", 
function () {
return this.$cause;
});
});
