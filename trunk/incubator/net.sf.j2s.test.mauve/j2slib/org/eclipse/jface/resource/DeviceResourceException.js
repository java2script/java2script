Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["java.lang.Exception"], "org.eclipse.jface.resource.DeviceResourceException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "DeviceResourceException", Exception);
Clazz.makeConstructor (c$, 
function (missingResource, cause) {
Clazz.superConstructor (this, org.eclipse.jface.resource.DeviceResourceException, ["Unable to create resource " + missingResource.toString ()]);
this.$cause = cause;
}, "org.eclipse.jface.resource.DeviceResourceDescriptor,Throwable");
Clazz.makeConstructor (c$, 
function (missingResource) {
this.construct (missingResource, null);
}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod (c$, "getCause", 
function () {
return this.$cause;
});
});
