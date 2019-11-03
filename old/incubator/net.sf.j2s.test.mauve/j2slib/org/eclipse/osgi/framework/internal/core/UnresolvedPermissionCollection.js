Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.security.PermissionCollection", "java.util.Hashtable"], "org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection", ["java.lang.IllegalStateException", "java.util.Enumeration", "$.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.permissions = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "UnresolvedPermissionCollection", java.security.PermissionCollection);
Clazz.prepareFields (c$, function () {
this.permissions =  new java.util.Hashtable (8);
});
Clazz.overrideMethod (c$, "add", 
function (permission) {
if (this.isReadOnly ()) {
throw  new IllegalStateException ();
}var name = permission.getName ();
var elements;
{
elements = this.permissions.get (name);
if (elements == null) {
elements =  new java.util.Vector (10, 10);
this.permissions.put (name, elements);
}}elements.addElement (permission);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "elements", 
function () {
return ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.vEnum = null;
this.pEnum = this.b$["org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection"].permissions.elements ();
this.next = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "UnresolvedPermissionCollection$1", null, java.util.Enumeration);
Clazz.prepareFields (c$, function () {
this.next = this.findNext ();
});
Clazz.defineMethod (c$, "findNext", 
($fz = function () {
if (this.vEnum != null) {
if (this.vEnum.hasMoreElements ()) return (this.vEnum.nextElement ());
}if (!this.pEnum.hasMoreElements ()) return (null);
this.vEnum = (this.pEnum.nextElement ()).elements ();
return (this.vEnum.nextElement ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
return (this.next != null);
});
Clazz.defineMethod (c$, "nextElement", 
function () {
var result = this.next;
this.next = this.findNext ();
return (result);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.UnresolvedPermissionCollection$1, i$, v$);
}) (this, null));
});
Clazz.overrideMethod (c$, "implies", 
function (permission) {
return false;
}, "java.security.Permission");
Clazz.defineMethod (c$, "getPermissions", 
function (name) {
return this.permissions.get (name);
}, "~S");
});
