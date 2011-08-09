Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.KeyedElement"], "org.eclipse.osgi.framework.internal.core.PackageSource", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "PackageSource", null, org.eclipse.osgi.framework.internal.core.KeyedElement);
Clazz.makeConstructor (c$, 
function (id) {
this.id = id.intern ();
}, "~S");
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "compare", 
function (other) {
return this.id.equals ((other).getId ());
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.overrideMethod (c$, "getKeyHashCode", 
function () {
return this.id.hashCode ();
});
Clazz.overrideMethod (c$, "getKey", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "isNullSource", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFriend", 
function (symbolicName) {
return true;
}, "~S");
Clazz.defineMethod (c$, "hasCommonSource", 
function (other) {
if (other == null) return false;
if (this === other) return true;
var suppliers1 = this.getSuppliers ();
var suppliers2 = other.getSuppliers ();
if (suppliers1 == null || suppliers2 == null) return false;
for (var i = 0; i < suppliers1.length; i++) {
var found = false;
for (var j = 0; j < suppliers2.length; j++) if (suppliers2[j].equals (suppliers1[i])) {
found = true;
break;
}
if (!found) return false;
}
return true;
}, "org.eclipse.osgi.framework.internal.core.PackageSource");
});
