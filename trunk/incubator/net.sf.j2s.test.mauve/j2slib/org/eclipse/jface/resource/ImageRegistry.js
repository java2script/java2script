Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor", "org.eclipse.jface.util.Assert"], "org.eclipse.jface.resource.ImageRegistry", ["java.lang.IllegalArgumentException", "java.util.HashMap", "org.eclipse.jface.resource.JFaceResources", "$wt.widgets.Display"], function () {
c$ = Clazz.decorateAsClass (function () {
this.display = null;
this.manager = null;
this.table = null;
this.disposeRunnable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ImageRegistry");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.image = null;
this.descriptor = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource.ImageRegistry, "Entry");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.original = null;
this.refCount = 0;
this.originalDisplay = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource.ImageRegistry, "OriginalImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor, []);
this.original = a;
this.originalDisplay = b;
}, "$wt.graphics.Image,$wt.graphics.Device");
Clazz.defineMethod (c$, "createResource", 
function (a) {
if (a === this.originalDisplay) {
this.refCount++;
return this.original;
}return Clazz.superCall (this, org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor, "createResource", [a]);
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "destroyResource", 
function (a) {
if (this.original === a) {
this.refCount--;
if (this.refCount == 0) {
this.original.dispose ();
this.original = null;
}} else {
Clazz.superCall (this, org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor, "destroyResource", [a]);
}}, "~O");
Clazz.overrideMethod (c$, "getImageData", 
function () {
return this.original.getImageData ();
});
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.disposeRunnable = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.ImageRegistry$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "ImageRegistry$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.resource.ImageRegistry"].dispose ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.ImageRegistry$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function () {
this.construct ($wt.widgets.Display.getCurrent ());
});
Clazz.makeConstructor (c$, 
function (manager) {
org.eclipse.jface.util.Assert.isNotNull (manager);
var dev = manager.getDevice ();
if (Clazz.instanceOf (dev, $wt.widgets.Display)) {
this.display = dev;
}this.manager = manager;
manager.disposeExec (this.disposeRunnable);
}, "org.eclipse.jface.resource.ResourceManager");
Clazz.makeConstructor (c$, 
function (display) {
this.construct (org.eclipse.jface.resource.JFaceResources.getResources (display));
}, "$wt.widgets.Display");
Clazz.defineMethod (c$, "get", 
function (key) {
if (key == null) {
return null;
}if (this.display != null) {
var swtKey = -1;
if (key.equals ("dialog_info_imageg")) {
swtKey = 2;
}if (key.equals ("dialog_question_image")) {
swtKey = 4;
}if (key.equals ("dialog_warning_image")) {
swtKey = 8;
}if (key.equals ("dialog_error_image")) {
swtKey = 1;
}if (swtKey != -1) {
var image =  new Array (1);
var id = swtKey;
this.display.syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.ImageRegistry$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "ImageRegistry$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.image[0] = this.b$["org.eclipse.jface.resource.ImageRegistry"].display.getSystemImage (this.f$.id);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.ImageRegistry$2, i$, v$);
}) (this, Clazz.cloneFinals ("image", image, "id", id)));
return image[0];
}}var entry = this.getEntry (key);
if (entry == null) {
return null;
}if (entry.image == null) {
entry.image = this.manager.createImageWithDefault (entry.descriptor);
}return entry.image;
}, "~S");
Clazz.defineMethod (c$, "getDescriptor", 
function (key) {
var entry = this.getEntry (key);
if (entry == null) {
return null;
}return entry.descriptor;
}, "~S");
Clazz.defineMethod (c$, "put", 
function (key, descriptor) {
var entry = this.getEntry (key);
if (entry == null) {
entry =  new org.eclipse.jface.resource.ImageRegistry.Entry ();
this.getTable ().put (key, entry);
}if (entry.image != null) {
throw  new IllegalArgumentException ("ImageRegistry key already in use: " + key);
}entry.descriptor = descriptor;
}, "~S,org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "put", 
function (key, image) {
var entry = this.getEntry (key);
if (entry == null) {
entry =  new org.eclipse.jface.resource.ImageRegistry.Entry ();
this.putEntry (key, entry);
}if (entry.image != null || entry.descriptor != null) {
throw  new IllegalArgumentException ("ImageRegistry key already in use: " + key);
}entry.image = image;
entry.descriptor =  new org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor (image, this.manager.getDevice ());
try {
this.manager.create (entry.descriptor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DeviceResourceException)) {
} else {
throw e;
}
}
}, "~S,$wt.graphics.Image");
Clazz.defineMethod (c$, "remove", 
function (key) {
var descriptor = this.getDescriptor (key);
if (descriptor != null) {
this.manager.destroy (descriptor);
this.getTable ().remove (key);
}}, "~S");
Clazz.defineMethod (c$, "getEntry", 
($fz = function (key) {
return this.getTable ().get (key);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "putEntry", 
($fz = function (key, entry) {
this.getTable ().put (key, entry);
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.jface.resource.ImageRegistry.Entry");
Clazz.defineMethod (c$, "getTable", 
($fz = function () {
if (this.table == null) {
this.table =  new java.util.HashMap (10);
}return this.table;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "dispose", 
function () {
this.manager.cancelDisposeExec (this.disposeRunnable);
if (this.table != null) {
for (var i = this.table.values ().iterator (); i.hasNext (); ) {
var entry = i.next ();
if (entry.image != null) {
this.manager.destroyImage (entry.descriptor);
}}
this.table = null;
}this.display = null;
});
});
