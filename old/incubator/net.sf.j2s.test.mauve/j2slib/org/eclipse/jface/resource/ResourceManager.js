Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["java.util.ArrayList"], "org.eclipse.jface.resource.ResourceManager", ["org.eclipse.jface.resource.RGBColorDescriptor", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.disposeExecs = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ResourceManager");
Clazz.defineMethod (c$, "createImage", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "createImageWithDefault", 
function (descriptor) {
if (descriptor == null) {
return this.getDefaultImage ();
}try {
return this.create (descriptor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DeviceResourceException)) {
return this.getDefaultImage ();
} else {
throw e;
}
}
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "destroyImage", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "createColor", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod (c$, "createColor", 
function (descriptor) {
return this.createColor ( new org.eclipse.jface.resource.RGBColorDescriptor (descriptor));
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "destroyColor", 
function (descriptor) {
this.destroyColor ( new org.eclipse.jface.resource.RGBColorDescriptor (descriptor));
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "destroyColor", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod (c$, "createFont", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod (c$, "destroyFont", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.disposeExecs == null) {
return ;
}var foundException = null;
var execs = this.disposeExecs.toArray ( new Array (this.disposeExecs.size ()));
for (var i = 0; i < execs.length; i++) {
var exec = execs[i];
try {
exec.run ();
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
foundException = e;
} else {
throw e;
}
}
}
if (foundException != null) {
throw foundException;
}});
Clazz.defineMethod (c$, "disposeExec", 
function (r) {
org.eclipse.jface.util.Assert.isNotNull (r);
if (this.disposeExecs == null) {
this.disposeExecs =  new java.util.ArrayList ();
}this.disposeExecs.add (r);
}, "Runnable");
Clazz.defineMethod (c$, "cancelDisposeExec", 
function (r) {
org.eclipse.jface.util.Assert.isNotNull (r);
if (this.disposeExecs == null) {
return ;
}this.disposeExecs.remove (r);
if (this.disposeExecs.isEmpty ()) {
this.disposeExecs = null;
}}, "Runnable");
});
