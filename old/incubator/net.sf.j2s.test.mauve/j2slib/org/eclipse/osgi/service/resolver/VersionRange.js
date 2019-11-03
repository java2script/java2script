Clazz.declarePackage ("org.eclipse.osgi.service.resolver");
Clazz.load (["org.osgi.framework.Version"], "org.eclipse.osgi.service.resolver.VersionRange", ["java.lang.IllegalArgumentException", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minVersion = null;
this.includeMin = false;
this.maxVersion = null;
this.includeMax = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.service.resolver, "VersionRange");
Clazz.makeConstructor (c$, 
function (minVersion, includeMin, maxVersion, includeMax) {
this.minVersion = minVersion;
this.includeMin = includeMin;
this.maxVersion = maxVersion;
this.includeMax = includeMax;
}, "org.osgi.framework.Version,~B,org.osgi.framework.Version,~B");
Clazz.makeConstructor (c$, 
function (versionRange) {
if (versionRange == null || versionRange.length == 0) {
this.minVersion = org.osgi.framework.Version.emptyVersion;
this.includeMin = true;
this.maxVersion = org.eclipse.osgi.service.resolver.VersionRange.versionMax;
this.includeMax = true;
return ;
}versionRange = versionRange.trim ();
if ((versionRange.charAt (0)).charCodeAt (0) == ('[').charCodeAt (0) || (versionRange.charAt (0)).charCodeAt (0) == ('(').charCodeAt (0)) {
var comma = versionRange.indexOf (',');
if (comma < 0) throw  new IllegalArgumentException ();
var last = versionRange.charAt (versionRange.length - 1);
if ((last).charCodeAt (0) != (']').charCodeAt (0) && (last).charCodeAt (0) != (')').charCodeAt (0)) throw  new IllegalArgumentException ();
this.minVersion = org.osgi.framework.Version.parseVersion (versionRange.substring (1, comma).trim ());
this.includeMin = (versionRange.charAt (0)).charCodeAt (0) == ('[').charCodeAt (0);
this.maxVersion = org.osgi.framework.Version.parseVersion (versionRange.substring (comma + 1, versionRange.length - 1).trim ());
this.includeMax = (last).charCodeAt (0) == (']').charCodeAt (0);
} else {
this.minVersion = org.osgi.framework.Version.parseVersion (versionRange.trim ());
this.includeMin = true;
this.maxVersion = org.eclipse.osgi.service.resolver.VersionRange.versionMax;
this.includeMax = true;
}}, "~S");
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.minVersion;
});
Clazz.defineMethod (c$, "getIncludeMinimum", 
function () {
return this.includeMin;
});
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.maxVersion;
});
Clazz.defineMethod (c$, "getIncludeMaximum", 
function () {
return this.includeMax;
});
Clazz.defineMethod (c$, "isIncluded", 
function (version) {
var minRequired = this.getMinimum ();
if (minRequired == null) return true;
if (version == null) return false;
var maxRequired = this.getMaximum () == null ? org.eclipse.osgi.service.resolver.VersionRange.versionMax : this.getMaximum ();
var minCheck = this.includeMin ? 0 : 1;
var maxCheck = this.includeMax ? 0 : -1;
return version.compareTo (minRequired) >= minCheck && version.compareTo (maxRequired) <= maxCheck;
}, "org.osgi.framework.Version");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.osgi.service.resolver.VersionRange))) return false;
var vr = object;
if (this.minVersion != null && vr.getMinimum () != null) {
if (this.minVersion.equals (vr.getMinimum ()) && this.includeMin == vr.includeMin) if (this.maxVersion != null && vr.getMaximum () != null) {
if (this.maxVersion.equals (vr.getMaximum ()) && this.includeMax == vr.includeMax) return true;
} else return this.maxVersion === vr.getMaximum ();
} else {
return this.minVersion === vr.getMinimum ();
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.minVersion == null) return org.osgi.framework.Version.emptyVersion.toString ();
if (org.eclipse.osgi.service.resolver.VersionRange.versionMax.equals (this.maxVersion)) return this.minVersion.toString ();
var result =  new StringBuffer ();
result.append (this.includeMin ? '[' : '(');
result.append (this.minVersion);
result.append (',');
result.append (this.maxVersion);
result.append (this.includeMax ? ']' : ')');
return result.toString ();
});
c$.versionMax = c$.prototype.versionMax =  new org.osgi.framework.Version (2147483647, 2147483647, 2147483647);
c$.emptyRange = c$.prototype.emptyRange =  new org.eclipse.osgi.service.resolver.VersionRange (null);
});
