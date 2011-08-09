Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor");
Clazz.load (["java.io.File"], "org.eclipse.osgi.framework.adaptor.FilePath", ["java.lang.IllegalArgumentException", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.device = null;
this.flags = 0;
this.segments = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor, "FilePath");
Clazz.makeConstructor (c$, 
function (location) {
this.initialize (location.getPath ());
if (location.isDirectory ()) this.flags |= 4;
 else this.flags &= -5;
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (original) {
this.initialize (original);
}, "~S");
Clazz.defineMethod (c$, "computeSegmentCount", 
($fz = function (path) {
var len = path.length;
if (len == 0 || (len == 1 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) return 0;
var count = 1;
var prev = -1;
var i;
while ((i = path.indexOf ('/', prev + 1)) != -1) {
if (i != prev + 1 && i != len) ++count;
prev = i;
}
if ((path.charAt (len - 1)).charCodeAt (0) == ('/').charCodeAt (0)) --count;
return count;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "computeSegments", 
($fz = function (path) {
var maxSegmentCount = this.computeSegmentCount (path);
if (maxSegmentCount == 0) return org.eclipse.osgi.framework.adaptor.FilePath.NO_SEGMENTS;
var newSegments =  new Array (maxSegmentCount);
var len = path.length;
var firstPosition = this.isAbsolute () ? 1 : 0;
var lastPosition = this.hasTrailingSlash () ? len - 2 : len - 1;
var next = firstPosition;
var actualSegmentCount = 0;
for (var i = 0; i < maxSegmentCount; i++) {
var start = next;
var end = path.indexOf ('/', next);
next = end + 1;
var segment = path.substring (start, end == -1 ? lastPosition + 1 : end);
if (".".equals (segment)) continue ;if ("..".equals (segment)) {
if (actualSegmentCount > 0) actualSegmentCount--;
continue ;}newSegments[actualSegmentCount++] = segment;
}
if (actualSegmentCount == newSegments.length) return newSegments;
if (actualSegmentCount == 0) return org.eclipse.osgi.framework.adaptor.FilePath.NO_SEGMENTS;
var actualSegments =  new Array (actualSegmentCount);
System.arraycopy (newSegments, 0, actualSegments, 0, actualSegments.length);
return actualSegments;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getDevice", 
function () {
return this.device;
});
Clazz.defineMethod (c$, "getSegments", 
function () {
return this.segments.clone ();
});
Clazz.defineMethod (c$, "hasTrailingSlash", 
function () {
return (this.flags & 4) != 0;
});
Clazz.defineMethod (c$, "initialize", 
($fz = function (original) {
original = original.indexOf ('\\') == -1 ? original : original.$replace ('\\', '/');
if (org.eclipse.osgi.framework.adaptor.FilePath.WINDOWS) {
var deviceSeparatorPos = original.indexOf (':');
if (deviceSeparatorPos >= 0) {
var start = (original.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0) ? 1 : 0;
this.device = original.substring (start, deviceSeparatorPos + 1);
original = original.substring (deviceSeparatorPos + 1, original.length);
} else if (original.startsWith ("//")) {
var uncPrefixEnd = original.indexOf ('/', 2);
if (uncPrefixEnd >= 0) uncPrefixEnd = original.indexOf ('/', uncPrefixEnd + 1);
if (uncPrefixEnd >= 0) {
this.device = original.substring (0, uncPrefixEnd);
original = original.substring (uncPrefixEnd, original.length);
} else throw  new IllegalArgumentException ("Not a valid UNC: " + original);
}}if ((original.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) this.flags |= 1;
if ((original.charAt (original.length - 1)).charCodeAt (0) == ('/').charCodeAt (0)) this.flags |= 4;
this.segments = this.computeSegments (original);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isAbsolute", 
function () {
return (this.flags & 1) != 0;
});
Clazz.defineMethod (c$, "makeRelative", 
function (base) {
if (base.device != null && !base.device.equalsIgnoreCase (this.device)) return base.toString ();
var baseCount = this.segments.length;
var count = this.matchingFirstSegments (base);
if (baseCount == count && count == base.segments.length) return base.hasTrailingSlash () ? ("./") : ".";
var relative =  new StringBuffer ();
for (var j = 0; j < baseCount - count; j++) relative.append ("../");

for (var i = 0; i < base.segments.length - count; i++) {
relative.append (base.segments[count + i]);
relative.append ('/');
}
if (!base.hasTrailingSlash ()) relative.deleteCharAt (relative.length () - 1);
return relative.toString ();
}, "org.eclipse.osgi.framework.adaptor.FilePath");
Clazz.defineMethod (c$, "matchingFirstSegments", 
($fz = function (anotherPath) {
var anotherPathLen = anotherPath.segments.length;
var max = Math.min (this.segments.length, anotherPathLen);
var count = 0;
for (var i = 0; i < max; i++) {
if (!this.segments[i].equals (anotherPath.segments[i])) return count;
count++;
}
return count;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.adaptor.FilePath");
Clazz.overrideMethod (c$, "toString", 
function () {
var result =  new StringBuffer ();
if (this.device != null) result.append (this.device);
if (this.isAbsolute ()) result.append ('/');
for (var i = 0; i < this.segments.length; i++) {
result.append (this.segments[i]);
result.append ('/');
}
if (this.segments.length > 0 && !this.hasTrailingSlash ()) result.deleteCharAt (result.length () - 1);
return result.toString ();
});
c$.WINDOWS = c$.prototype.WINDOWS = (java.io.File.separatorChar).charCodeAt (0) == ('\\').charCodeAt (0);
Clazz.defineStatics (c$,
"CURRENT_DIR", ".",
"DEVICE_SEPARATOR", ':',
"HAS_LEADING", 1,
"HAS_TRAILING", 4);
c$.NO_SEGMENTS = c$.prototype.NO_SEGMENTS =  new Array (0);
Clazz.defineStatics (c$,
"PARENT_DIR", "..",
"SEPARATOR", '/',
"UNC_SLASHES", "//");
});
