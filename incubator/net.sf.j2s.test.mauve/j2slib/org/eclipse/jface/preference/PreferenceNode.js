Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.IPreferenceNode"], "org.eclipse.jface.preference.PreferenceNode", ["java.util.ArrayList", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.page = null;
this.subNodes = null;
this.classname = null;
this.id = null;
this.label = null;
this.imageDescriptor = null;
this.image = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceNode", null, org.eclipse.jface.preference.IPreferenceNode);
Clazz.makeConstructor (c$, 
function (id) {
org.eclipse.jface.util.Assert.isNotNull (id);
this.id = id;
}, "~S");
Clazz.makeConstructor (c$, 
function (id, label, image, className) {
this.construct (id);
this.imageDescriptor = image;
org.eclipse.jface.util.Assert.isNotNull (label);
this.label = label;
this.classname = className;
}, "~S,~S,org.eclipse.jface.resource.ImageDescriptor,~S");
Clazz.makeConstructor (c$, 
function (id, preferencePage) {
this.construct (id);
org.eclipse.jface.util.Assert.isNotNull (preferencePage);
this.page = preferencePage;
}, "~S,org.eclipse.jface.preference.IPreferencePage");
Clazz.overrideMethod (c$, "add", 
function (node) {
if (this.subNodes == null) this.subNodes =  new java.util.ArrayList ();
this.subNodes.add (node);
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "createObject", 
($fz = function (className) {
org.eclipse.jface.util.Assert.isNotNull (className);
try {
var cl = Class.forName (className);
if (cl != null) return cl.newInstance ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.instanceOf (e$$, NoSuchMethodError)) {
var e = e$$;
{
return null;
}
} else {
throw e$$;
}
}
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "createPage", 
function () {
this.page = this.createObject (this.classname);
if (this.getLabelImage () != null) this.page.setImageDescriptor (this.imageDescriptor);
this.page.setTitle (this.label);
});
Clazz.overrideMethod (c$, "disposeResources", 
function () {
if (this.image != null) {
this.image.dispose ();
this.image = null;
}if (this.page != null) {
this.page.dispose ();
this.page = null;
}});
Clazz.overrideMethod (c$, "findSubNode", 
function (id) {
org.eclipse.jface.util.Assert.isNotNull (id);
org.eclipse.jface.util.Assert.isTrue (id.length > 0);
if (this.subNodes == null) return null;
var size = this.subNodes.size ();
for (var i = 0; i < size; i++) {
var node = this.subNodes.get (i);
if (id.equals (node.getId ())) return node;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getImageDescriptor", 
function () {
return this.imageDescriptor;
});
Clazz.overrideMethod (c$, "getLabelImage", 
function () {
if (this.image == null && this.imageDescriptor != null) {
this.image = this.imageDescriptor.createImage ();
}return this.image;
});
Clazz.overrideMethod (c$, "getLabelText", 
function () {
if (this.page != null) return this.page.getTitle ();
return this.label;
});
Clazz.overrideMethod (c$, "getPage", 
function () {
return this.page;
});
Clazz.overrideMethod (c$, "getSubNodes", 
function () {
if (this.subNodes == null) return  new Array (0);
return this.subNodes.toArray ( new Array (this.subNodes.size ()));
});
Clazz.defineMethod (c$, "remove", 
function (id) {
var node = this.findSubNode (id);
if (node != null) this.remove (node);
return node;
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (node) {
if (this.subNodes == null) return false;
return this.subNodes.remove (node);
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "setPage", 
function (newPage) {
this.page = newPage;
}, "org.eclipse.jface.preference.IPreferencePage");
});
