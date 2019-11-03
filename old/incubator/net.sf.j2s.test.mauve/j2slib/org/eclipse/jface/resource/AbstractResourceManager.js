Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ResourceManager"], "org.eclipse.jface.resource.AbstractResourceManager", ["java.util.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.map = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "AbstractResourceManager", org.eclipse.jface.resource.ResourceManager);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.resource = null;
this.count = 1;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource.AbstractResourceManager, "RefCount");
Clazz.makeConstructor (c$, 
function (a) {
this.resource = a;
}, "~O");
c$ = Clazz.p0p ();
Clazz.overrideMethod (c$, "create", 
function (descriptor) {
if (this.map == null) {
this.map =  new java.util.HashMap ();
}var count = this.map.get (descriptor);
if (count != null) {
count.count++;
return count.resource;
}var resource = this.allocate (descriptor);
count =  new org.eclipse.jface.resource.AbstractResourceManager.RefCount (resource);
this.map.put (descriptor, count);
return resource;
}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod (c$, "destroy", 
function (descriptor) {
if (this.map == null) {
return ;
}var count = this.map.get (descriptor);
if (count != null) {
count.count--;
if (count.count == 0) {
this.deallocate (count.resource, descriptor);
this.map.remove (descriptor);
}}if (this.map.isEmpty ()) {
this.map = null;
}}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.defineMethod (c$, "dispose", 
function () {
Clazz.superCall (this, org.eclipse.jface.resource.AbstractResourceManager, "dispose", []);
if (this.map == null) {
return ;
}var entries = this.map.entrySet ();
for (var iter = entries.iterator (); iter.hasNext (); ) {
var next = iter.next ();
var key = next.getKey ();
var val = next.getValue ();
this.deallocate (val.resource, key);
}
this.map = null;
});
Clazz.overrideMethod (c$, "find", 
function (descriptor) {
if (this.map == null) {
return null;
}return this.map.get (descriptor);
}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
});
