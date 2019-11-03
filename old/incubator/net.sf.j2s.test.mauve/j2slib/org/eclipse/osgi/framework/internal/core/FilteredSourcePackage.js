Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.SingleSourcePackage"], "org.eclipse.osgi.framework.internal.core.FilteredSourcePackage", ["org.eclipse.osgi.util.ManifestElement"], function () {
c$ = Clazz.decorateAsClass (function () {
this.includes = null;
this.excludes = null;
this.friends = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FilteredSourcePackage", org.eclipse.osgi.framework.internal.core.SingleSourcePackage);
Clazz.makeConstructor (c$, 
function (name, expid, supplier, includes, excludes, friends) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.FilteredSourcePackage, [name, expid, supplier]);
if (includes != null) this.includes = org.eclipse.osgi.util.ManifestElement.getArrayFromList (includes);
if (excludes != null) this.excludes = org.eclipse.osgi.util.ManifestElement.getArrayFromList (excludes);
this.friends = friends;
}, "~S,~N,org.eclipse.osgi.framework.internal.core.BundleLoaderProxy,~S,~S,~A");
Clazz.overrideMethod (c$, "isFriend", 
function (symbolicName) {
if (this.friends == null) return true;
for (var i = 0; i < this.friends.length; i++) if (this.friends[i].equals (symbolicName)) return true;

return false;
}, "~S");
Clazz.defineMethod (c$, "getResource", 
function (name) {
if (this.isFiltered (name, this.getId ())) return null;
return Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.FilteredSourcePackage, "getResource", [name]);
}, "~S");
Clazz.defineMethod (c$, "getResources", 
function (name) {
if (this.isFiltered (name, this.getId ())) return null;
return Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.FilteredSourcePackage, "getResources", [name]);
}, "~S");
Clazz.defineMethod (c$, "loadClass", 
function (name) {
if (this.isFiltered (name, this.getId ())) return null;
return Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.FilteredSourcePackage, "loadClass", [name]);
}, "~S");
Clazz.defineMethod (c$, "isFiltered", 
($fz = function (name, pkgName) {
var lastName = this.getName (name, pkgName);
return !this.isIncluded (lastName) || this.isExcluded (lastName);
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "getName", 
($fz = function (name, pkgName) {
if (!".".equals (pkgName) && pkgName.length + 1 <= name.length) return name.substring (pkgName.length + 1);
return name;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "isIncluded", 
($fz = function (name) {
if (this.includes == null) return true;
return this.isInList (name, this.includes);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isExcluded", 
($fz = function (name) {
if (this.excludes == null) return false;
return this.isInList (name, this.excludes);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isInList", 
($fz = function (name, list) {
for (var i = 0; i < list.length; i++) {
var len = list[i].length;
if (len == 0) continue ;if ((list[i].charAt (0)).charCodeAt (0) == ('*').charCodeAt (0) && len == 1) return true;
if ((list[i].charAt (len - 1)).charCodeAt (0) == ('*').charCodeAt (0)) if (name.startsWith (list[i].substring (0, len - 1))) return true;
if (name.equals (list[i])) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineStatics (c$,
"ALL", '*');
});
