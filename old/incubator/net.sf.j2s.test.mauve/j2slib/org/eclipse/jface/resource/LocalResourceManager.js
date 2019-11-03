Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.AbstractResourceManager"], "org.eclipse.jface.resource.LocalResourceManager", ["$wt.events.DisposeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parentRegistry = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "LocalResourceManager", org.eclipse.jface.resource.AbstractResourceManager);
Clazz.makeConstructor (c$, 
function (parentRegistry) {
Clazz.superConstructor (this, org.eclipse.jface.resource.LocalResourceManager, []);
this.parentRegistry = parentRegistry;
}, "org.eclipse.jface.resource.ResourceManager");
Clazz.makeConstructor (c$, 
function (parentRegistry, owner) {
this.construct (parentRegistry);
owner.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.LocalResourceManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "LocalResourceManager$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
this.b$["org.eclipse.jface.resource.LocalResourceManager"].dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.LocalResourceManager$1, i$, v$);
}) (this, null));
}, "org.eclipse.jface.resource.ResourceManager,$wt.widgets.Control");
Clazz.defineMethod (c$, "getDevice", 
function () {
return this.parentRegistry.getDevice ();
});
Clazz.overrideMethod (c$, "allocate", 
function (descriptor) {
return this.parentRegistry.create (descriptor);
}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod (c$, "deallocate", 
function (resource, descriptor) {
this.parentRegistry.destroy (descriptor);
}, "~O,org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.defineMethod (c$, "getDefaultImage", 
function () {
return this.parentRegistry.getDefaultImage ();
});
});
