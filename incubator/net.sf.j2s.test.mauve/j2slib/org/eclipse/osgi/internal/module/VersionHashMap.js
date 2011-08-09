Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["java.util.HashMap"], "org.eclipse.osgi.internal.module.VersionHashMap", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.internal = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "VersionHashMap");
Clazz.prepareFields (c$, function () {
this.internal =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "put", 
function (versionSupplier) {
var existing = this.internal.get (versionSupplier.getName ());
if (existing == null) {
var vss =  new Array (1);
vss[0] = versionSupplier;
this.internal.put (versionSupplier.getName (), vss);
} else {
for (var i = 0; i < existing.length; i++) {
var e = existing[i];
if (e === versionSupplier) return e;
if (versionSupplier.getBundle ().isResolved () && !e.getBundle ().isResolved ()) {
this.internal.put (versionSupplier.getName (), this.add (i, versionSupplier, existing));
return null;
} else if (versionSupplier.getBundle ().isResolved () == e.getBundle ().isResolved ()) {
if (versionSupplier.getVersion ().compareTo (e.getVersion ()) > 0) {
this.internal.put (versionSupplier.getName (), this.add (i, versionSupplier, existing));
return null;
} else if (e.getVersion ().equals (versionSupplier.getVersion ())) {
if (versionSupplier.getBundle ().getBundleId () < e.getBundle ().getBundleId ()) {
this.internal.put (versionSupplier.getName (), this.add (i, versionSupplier, existing));
return e;
}}}}
this.internal.put (versionSupplier.getName (), this.add (existing.length, versionSupplier, existing));
}return null;
}, "org.eclipse.osgi.internal.module.VersionSupplier");
Clazz.defineMethod (c$, "put", 
function (versionSuppliers) {
for (var i = 0; i < versionSuppliers.length; i++) {
this.put (versionSuppliers[i]);
}
}, "~A");
Clazz.defineMethod (c$, "add", 
($fz = function (index, versionSupplier, existing) {
var newVS =  new Array (existing.length + 1);
for (var i = 0; i < index; i++) {
newVS[i] = existing[i];
}
newVS[index] = versionSupplier;
for (var i = index + 1; i < newVS.length; i++) {
newVS[i] = existing[i - 1];
}
return newVS;
}, $fz.isPrivate = true, $fz), "~N,org.eclipse.osgi.internal.module.VersionSupplier,~A");
Clazz.defineMethod (c$, "getArray", 
function (supplierName) {
var existing = this.internal.get (supplierName);
if (existing != null) return existing;
 else return  new Array (0);
}, "~S");
Clazz.defineMethod (c$, "contains", 
function (vs) {
var existing = this.internal.get (vs.getName ());
if (existing == null) return false;
for (var i = 0; i < existing.length; i++) {
if (existing[i] === vs) return true;
}
return false;
}, "org.eclipse.osgi.internal.module.VersionSupplier");
Clazz.defineMethod (c$, "remove", 
($fz = function (existing, name, index) {
if (existing.length == 1) {
this.internal.remove (name);
} else {
var newVS =  new Array (existing.length - 1);
for (var i = 0; i < index; i++) {
newVS[i] = existing[i];
}
for (var i = index + 1; i < existing.length; i++) {
newVS[i - 1] = existing[i];
}
this.internal.put (name, newVS);
}}, $fz.isPrivate = true, $fz), "~A,~S,~N");
Clazz.defineMethod (c$, "remove", 
function (toBeRemoved) {
var existing = this.internal.get (toBeRemoved.getName ());
if (existing != null) {
for (var i = 0; i < existing.length; i++) {
if (toBeRemoved === existing[i]) {
this.remove (existing, toBeRemoved.getName (), i);
return toBeRemoved;
}}
}return null;
}, "org.eclipse.osgi.internal.module.VersionSupplier");
Clazz.defineMethod (c$, "remove", 
function (versionSuppliers) {
for (var i = 0; i < versionSuppliers.length; i++) {
this.remove (versionSuppliers[i]);
}
}, "~A");
Clazz.defineMethod (c$, "reorder", 
function () {
var it = this.internal.values ().iterator ();
while (it.hasNext ()) {
var toBeReordered =  new java.util.ArrayList ();
var existing = it.next ();
if (existing == null || existing.length <= 1) continue ;var vs1 = existing[0];
for (var i = 1; i < existing.length; i++) {
var vs2 = existing[i];
var b1 = vs1.getBundle ();
var b2 = vs2.getBundle ();
if (b2.isResolved () && !b1.isResolved ()) {
toBeReordered.add (vs2);
} else if (b2.isResolved () == b1.isResolved ()) {
var versionDiff = vs2.getVersion ().compareTo (vs1.getVersion ());
if (versionDiff > 0 || (b2.getBundleId () < b1.getBundleId () && versionDiff == 0)) {
toBeReordered.add (vs2);
}}vs1 = vs2;
}
for (var i = 0; i < toBeReordered.size (); i++) {
var vs = toBeReordered.get (i);
this.remove (vs);
this.put (vs);
}
}
});
});
