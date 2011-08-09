Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.IProduct"], "org.eclipse.core.internal.runtime.Product", ["java.util.HashMap", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.application = null;
this.name = null;
this.id = null;
this.description = null;
this.properties = null;
this.definingBundle = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "Product", null, org.eclipse.core.runtime.IProduct);
Clazz.makeConstructor (c$, 
function (id, element) {
this.id = id;
if (element == null) return ;
this.application = element.getAttribute ("application");
this.name = element.getAttribute ("name");
this.description = element.getAttribute ("description");
this.loadProperties (element);
}, "~S,org.eclipse.core.runtime.IConfigurationElement");
Clazz.defineMethod (c$, "loadProperties", 
($fz = function (element) {
var children = element.getChildren ();
this.properties =  new java.util.HashMap (children.length);
for (var i = 0; i < children.length; i++) {
var child = children[i];
var key = child.getAttribute ("name");
var value = child.getAttribute ("value");
if (key != null && value != null) this.properties.put (key, value);
}
this.definingBundle = org.eclipse.core.runtime.Platform.getBundle (element.getNamespace ());
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IConfigurationElement");
Clazz.overrideMethod (c$, "getDefiningBundle", 
function () {
return this.definingBundle;
});
Clazz.overrideMethod (c$, "getApplication", 
function () {
return this.application;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getDescription", 
function () {
return this.description;
});
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
return this.properties.get (key);
}, "~S");
Clazz.defineStatics (c$,
"ATTR_DESCRIPTION", "description",
"ATTR_NAME", "name",
"ATTR_APPLICATION", "application",
"ATTR_VALUE", "value");
});
