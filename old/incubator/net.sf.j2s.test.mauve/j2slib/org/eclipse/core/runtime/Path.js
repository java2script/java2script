Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.IPath", "java.io.File"], "org.eclipse.core.runtime.Path", ["java.lang.StringBuffer", "org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.device = null;
this.$segments = null;
this.separators = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "Path", null, [org.eclipse.core.runtime.IPath, Cloneable]);
c$.fromOSString = Clazz.defineMethod (c$, "fromOSString", 
function (pathString) {
return  new org.eclipse.core.runtime.Path (pathString);
}, "~S");
c$.fromPortableString = Clazz.defineMethod (c$, "fromPortableString", 
function (pathString) {
var firstMatch = pathString.indexOf (':') + 1;
if (firstMatch <= 0) return  new org.eclipse.core.runtime.Path ().initialize (null, pathString);
var devicePart = null;
var pathLength = pathString.length;
if (firstMatch == pathLength || (pathString.charAt (firstMatch)).charCodeAt (0) != (':').charCodeAt (0)) {
devicePart = pathString.substring (0, firstMatch);
pathString = pathString.substring (firstMatch, pathLength);
}if (pathString.indexOf (':') == -1) return  new org.eclipse.core.runtime.Path ().initialize (devicePart, pathString);
var chars = pathString.toCharArray ();
var readOffset = 0;
var writeOffset = 0;
var length = chars.length;
while (readOffset < length) {
if ((chars[readOffset]).charCodeAt (0) == (':').charCodeAt (0)) if (++readOffset >= length) break;
chars[writeOffset++] = chars[readOffset++];
}
return  new org.eclipse.core.runtime.Path ().initialize (devicePart,  String.instantialize (chars, 0, writeOffset));
}, "~S");
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function (fullPath) {
var devicePart = null;
if (org.eclipse.core.runtime.Path.WINDOWS) {
fullPath = fullPath.indexOf ('\\') == -1 ? fullPath : fullPath.$replace ('\\', '/');
var i = fullPath.indexOf (':');
if (i != -1) {
var start = (fullPath.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0) ? 1 : 0;
devicePart = fullPath.substring (start, i + 1);
fullPath = fullPath.substring (i + 1, fullPath.length);
}}this.initialize (devicePart, fullPath);
}, "~S");
Clazz.makeConstructor (c$, 
function (device, path) {
if (org.eclipse.core.runtime.Path.WINDOWS) {
path = path.indexOf ('\\') == -1 ? path : path.$replace ('\\', '/');
}this.initialize (device, path);
}, "~S,~S");
Clazz.makeConstructor (c$, 
($fz = function (device, segments, _separators) {
this.$segments = segments;
this.device = device;
this.separators = (this.computeHashCode () << 3) | (_separators & 7);
}, $fz.isPrivate = true, $fz), "~S,~A,~N");
Clazz.overrideMethod (c$, "addFileExtension", 
function (extension) {
if (this.isRoot () || this.isEmpty () || this.hasTrailingSeparator ()) return this;
var len = this.$segments.length;
var newSegments =  new Array (len);
System.arraycopy (this.$segments, 0, newSegments, 0, len - 1);
newSegments[len - 1] = this.$segments[len - 1] + "." + extension;
return  new org.eclipse.core.runtime.Path (this.device, newSegments, this.separators);
}, "~S");
Clazz.overrideMethod (c$, "addTrailingSeparator", 
function () {
if (this.hasTrailingSeparator () || this.isRoot ()) {
return this;
}if (this.isEmpty ()) {
return  new org.eclipse.core.runtime.Path (this.device, this.$segments, 1);
}return  new org.eclipse.core.runtime.Path (this.device, this.$segments, this.separators | 4);
});
Clazz.defineMethod (c$, "append", 
function (tail) {
if (tail == null || tail.segmentCount () == 0) return this;
if (this.isEmpty ()) return tail.setDevice (this.device).makeRelative ();
if (this.isRoot ()) return tail.setDevice (this.device).makeAbsolute ();
var myLen = this.$segments.length;
var tailLen = tail.segmentCount ();
var newSegments =  new Array (myLen + tailLen);
System.arraycopy (this.$segments, 0, newSegments, 0, myLen);
for (var i = 0; i < tailLen; i++) {
newSegments[myLen + i] = tail.segment (i);
}
var result =  new org.eclipse.core.runtime.Path (this.device, newSegments, (this.separators & (3)) | (tail.hasTrailingSeparator () ? 4 : 0));
var tailFirstSegment = newSegments[myLen];
if (tailFirstSegment.equals ("..") || tailFirstSegment.equals (".")) {
result.canonicalize ();
}return result;
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "append", 
function (tail) {
if (tail.indexOf ('/') == -1 && tail.indexOf ("\\") == -1 && tail.indexOf (':') == -1) {
var tailLength = tail.length;
if (tailLength < 3) {
if (tailLength == 0 || ".".equals (tail)) {
return this;
}if ("..".equals (tail)) return this.removeLastSegments (1);
}var myLen = this.$segments.length;
var newSegments =  new Array (myLen + 1);
System.arraycopy (this.$segments, 0, newSegments, 0, myLen);
newSegments[myLen] = tail;
return  new org.eclipse.core.runtime.Path (this.device, newSegments, this.separators & -5);
}return this.append ( new org.eclipse.core.runtime.Path (tail));
}, "~S");
Clazz.defineMethod (c$, "canonicalize", 
($fz = function () {
for (var i = 0, max = this.$segments.length; i < max; i++) {
var segment = this.$segments[i];
if ((segment.charAt (0)).charCodeAt (0) == ('.').charCodeAt (0) && (segment.equals ("..") || segment.equals ("."))) {
this.collapseParentReferences ();
if (this.$segments.length == 0) this.separators &= (3);
this.separators = (this.separators & 7) | (this.computeHashCode () << 3);
return true;
}}
return false;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, org.eclipse.core.runtime.Path, "clone", []);
} catch (e) {
if (Clazz.instanceOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "collapseParentReferences", 
($fz = function () {
var segmentCount = this.$segments.length;
var stack =  new Array (segmentCount);
var stackPointer = 0;
for (var i = 0; i < segmentCount; i++) {
var segment = this.$segments[i];
if (segment.equals ("..")) {
if (stackPointer == 0) {
if (!this.isAbsolute ()) stack[stackPointer++] = segment;
} else {
if ("..".equals (stack[stackPointer - 1])) stack[stackPointer++] = "..";
 else stackPointer--;
}} else if (!segment.equals (".") || (i == 0 && !this.isAbsolute ())) stack[stackPointer++] = segment;
}
if (stackPointer == segmentCount) return ;
var newSegments =  new Array (stackPointer);
System.arraycopy (stack, 0, newSegments, 0, stackPointer);
this.$segments = newSegments;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "collapseSlashes", 
($fz = function (path) {
var length = path.length;
if (length < 3) return path;
if (path.indexOf ("//", 1) == -1) return path;
var result =  Clazz.newArray (path.length, '\0');
var count = 0;
var hasPrevious = false;
var characters = path.toCharArray ();
for (var index = 0; index < characters.length; index++) {
var c = characters[index];
if ((c).charCodeAt (0) == ('/').charCodeAt (0)) {
if (hasPrevious) {
if (this.device == null && index == 1) {
result[count] = c;
count++;
}} else {
hasPrevious = true;
result[count] = c;
count++;
}} else {
hasPrevious = false;
result[count] = c;
count++;
}}
return  String.instantialize (result, 0, count);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "computeHashCode", 
($fz = function () {
var hash = this.device == null ? 17 : this.device.hashCode ();
var segmentCount = this.$segments.length;
for (var i = 0; i < segmentCount; i++) {
hash = hash * 37 + this.$segments[i].hashCode ();
}
return hash;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "computeLength", 
($fz = function () {
var length = 0;
if (this.device != null) length += this.device.length;
if ((this.separators & 1) != 0) length++;
if ((this.separators & 2) != 0) length++;
var max = this.$segments.length;
if (max > 0) {
for (var i = 0; i < max; i++) {
length += this.$segments[i].length;
}
length += max - 1;
}if ((this.separators & 4) != 0) length++;
return length;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "computeSegmentCount", 
($fz = function (path) {
var len = path.length;
if (len == 0 || (len == 1 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) {
return 0;
}var count = 1;
var prev = -1;
var i;
while ((i = path.indexOf ('/', prev + 1)) != -1) {
if (i != prev + 1 && i != len) {
++count;
}prev = i;
}
if ((path.charAt (len - 1)).charCodeAt (0) == ('/').charCodeAt (0)) {
--count;
}return count;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "computeSegments", 
($fz = function (path) {
var segmentCount = this.computeSegmentCount (path);
if (segmentCount == 0) return org.eclipse.core.runtime.Path.NO_SEGMENTS;
var newSegments =  new Array (segmentCount);
var len = path.length;
var firstPosition = ((path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) ? 1 : 0;
if (firstPosition == 1 && len > 1 && ((path.charAt (1)).charCodeAt (0) == ('/').charCodeAt (0))) firstPosition = 2;
var lastPosition = ((path.charAt (len - 1)).charCodeAt (0) != ('/').charCodeAt (0)) ? len - 1 : len - 2;
var next = firstPosition;
for (var i = 0; i < segmentCount; i++) {
var start = next;
var end = path.indexOf ('/', next);
if (end == -1) {
newSegments[i] = path.substring (start, lastPosition + 1);
} else {
newSegments[i] = path.substring (start, end);
}next = end + 1;
}
return newSegments;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "encodeSegment", 
($fz = function (string, buf) {
var len = string.length;
for (var i = 0; i < len; i++) {
var c = string.charAt (i);
buf.append (c);
if ((c).charCodeAt (0) == (':').charCodeAt (0)) buf.append (':');
}
}, $fz.isPrivate = true, $fz), "~S,StringBuffer");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (!(Clazz.instanceOf (obj, org.eclipse.core.runtime.Path))) return false;
var target = obj;
if ((this.separators & -5) != (target.separators & -5)) return false;
var targetSegments = target.$segments;
var i = this.$segments.length;
if (i != targetSegments.length) return false;
while (--i >= 0) if (!this.$segments[i].equals (targetSegments[i])) return false;

return this.device === target.device || (this.device != null && this.device.equals (target.device));
}, "~O");
Clazz.defineMethod (c$, "getDevice", 
function () {
return this.device;
});
Clazz.overrideMethod (c$, "getFileExtension", 
function () {
if (this.hasTrailingSeparator ()) {
return null;
}var lastSegment = this.lastSegment ();
if (lastSegment == null) {
return null;
}var index = lastSegment.lastIndexOf (".");
if (index == -1) {
return null;
}return lastSegment.substring (index + 1);
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.separators & -5;
});
Clazz.defineMethod (c$, "hasTrailingSeparator", 
function () {
return (this.separators & 4) != 0;
});
Clazz.defineMethod (c$, "initialize", 
($fz = function (deviceString, path) {
org.eclipse.core.internal.runtime.Assert.isNotNull (path);
this.device = deviceString;
path = this.collapseSlashes (path);
var len = path.length;
if (len < 2) {
if (len == 1 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) {
this.separators = 1;
} else {
this.separators = 0;
}} else {
var hasLeading = (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0);
var isUNC = hasLeading && (path.charAt (1)).charCodeAt (0) == ('/').charCodeAt (0);
var hasTrailing = !(isUNC && len == 2) && (path.charAt (len - 1)).charCodeAt (0) == ('/').charCodeAt (0);
this.separators = hasLeading ? 1 : 0;
if (isUNC) this.separators |= 2;
if (hasTrailing) this.separators |= 4;
}this.$segments = this.computeSegments (path);
if (!this.canonicalize ()) {
this.separators = (this.separators & 7) | (this.computeHashCode () << 3);
}return this;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "isAbsolute", 
function () {
return (this.separators & 1) != 0;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.$segments.length == 0 && ((this.separators & 7) != 1);
});
Clazz.overrideMethod (c$, "isPrefixOf", 
function (anotherPath) {
if (this.device == null) {
if (anotherPath.getDevice () != null) {
return false;
}} else {
if (!this.device.equalsIgnoreCase (anotherPath.getDevice ())) {
return false;
}}if (this.isEmpty () || (this.isRoot () && anotherPath.isAbsolute ())) {
return true;
}var len = this.$segments.length;
if (len > anotherPath.segmentCount ()) {
return false;
}for (var i = 0; i < len; i++) {
if (!this.$segments[i].equals (anotherPath.segment (i))) return false;
}
return true;
}, "org.eclipse.core.runtime.IPath");
Clazz.overrideMethod (c$, "isRoot", 
function () {
return this === org.eclipse.core.runtime.Path.ROOT || (this.$segments.length == 0 && ((this.separators & 7) == 1));
});
Clazz.overrideMethod (c$, "isUNC", 
function () {
if (this.device != null) return false;
return (this.separators & 2) != 0;
});
Clazz.overrideMethod (c$, "isValidPath", 
function (path) {
var test =  new org.eclipse.core.runtime.Path (path);
for (var i = 0, max = test.segmentCount (); i < max; i++) if (!this.isValidSegment (test.segment (i))) return false;

return true;
}, "~S");
Clazz.overrideMethod (c$, "isValidSegment", 
function (segment) {
var size = segment.length;
if (size == 0) return false;
for (var i = 0; i < size; i++) {
var c = segment.charAt (i);
if ((c).charCodeAt (0) == ('/').charCodeAt (0)) return false;
if (org.eclipse.core.runtime.Path.WINDOWS && ((c).charCodeAt (0) == ('\\').charCodeAt (0) || (c).charCodeAt (0) == (':').charCodeAt (0))) return false;
}
return true;
}, "~S");
Clazz.overrideMethod (c$, "lastSegment", 
function () {
var len = this.$segments.length;
return len == 0 ? null : this.$segments[len - 1];
});
Clazz.defineMethod (c$, "makeAbsolute", 
function () {
if (this.isAbsolute ()) {
return this;
}var result =  new org.eclipse.core.runtime.Path (this.device, this.$segments, this.separators | 1);
if (result.segmentCount () > 0) {
var first = result.segment (0);
if (first.equals ("..") || first.equals (".")) {
result.canonicalize ();
}}return result;
});
Clazz.defineMethod (c$, "makeRelative", 
function () {
if (!this.isAbsolute ()) {
return this;
}return  new org.eclipse.core.runtime.Path (this.device, this.$segments, this.separators & 4);
});
Clazz.overrideMethod (c$, "makeUNC", 
function (toUNC) {
if (!( new Boolean (toUNC ^ this.isUNC ()).valueOf ())) return this;
var newSeparators = this.separators;
if (toUNC) {
newSeparators |= 3;
} else {
newSeparators &= 5;
}return  new org.eclipse.core.runtime.Path (toUNC ? null : this.device, this.$segments, newSeparators);
}, "~B");
Clazz.overrideMethod (c$, "matchingFirstSegments", 
function (anotherPath) {
org.eclipse.core.internal.runtime.Assert.isNotNull (anotherPath);
var anotherPathLen = anotherPath.segmentCount ();
var max = Math.min (this.$segments.length, anotherPathLen);
var count = 0;
for (var i = 0; i < max; i++) {
if (!this.$segments[i].equals (anotherPath.segment (i))) {
return count;
}count++;
}
return count;
}, "org.eclipse.core.runtime.IPath");
Clazz.overrideMethod (c$, "removeFileExtension", 
function () {
var extension = this.getFileExtension ();
if (extension == null || extension.equals ("")) {
return this;
}var lastSegment = this.lastSegment ();
var index = lastSegment.lastIndexOf (extension) - 1;
return this.removeLastSegments (1).append (lastSegment.substring (0, index));
});
Clazz.overrideMethod (c$, "removeFirstSegments", 
function (count) {
if (count == 0) return this;
if (count >= this.$segments.length) {
return  new org.eclipse.core.runtime.Path (this.device, org.eclipse.core.runtime.Path.NO_SEGMENTS, 0);
}org.eclipse.core.internal.runtime.Assert.isLegal (count > 0);
var newSize = this.$segments.length - count;
var newSegments =  new Array (newSize);
System.arraycopy (this.$segments, count, newSegments, 0, newSize);
return  new org.eclipse.core.runtime.Path (this.device, newSegments, this.separators & 4);
}, "~N");
Clazz.overrideMethod (c$, "removeLastSegments", 
function (count) {
if (count == 0) return this;
if (count >= this.$segments.length) {
return  new org.eclipse.core.runtime.Path (this.device, org.eclipse.core.runtime.Path.NO_SEGMENTS, this.separators & (3));
}org.eclipse.core.internal.runtime.Assert.isLegal (count > 0);
var newSize = this.$segments.length - count;
var newSegments =  new Array (newSize);
System.arraycopy (this.$segments, 0, newSegments, 0, newSize);
return  new org.eclipse.core.runtime.Path (this.device, newSegments, this.separators);
}, "~N");
Clazz.overrideMethod (c$, "removeTrailingSeparator", 
function () {
if (!this.hasTrailingSeparator ()) {
return this;
}return  new org.eclipse.core.runtime.Path (this.device, this.$segments, this.separators & (3));
});
Clazz.defineMethod (c$, "segment", 
function (index) {
if (index >= this.$segments.length) return null;
return this.$segments[index];
}, "~N");
Clazz.defineMethod (c$, "segmentCount", 
function () {
return this.$segments.length;
});
Clazz.overrideMethod (c$, "segments", 
function () {
var segmentCopy =  new Array (this.$segments.length);
System.arraycopy (this.$segments, 0, segmentCopy, 0, this.$segments.length);
return segmentCopy;
});
Clazz.defineMethod (c$, "setDevice", 
function (value) {
if (value != null) {
org.eclipse.core.internal.runtime.Assert.isTrue (value.indexOf (':') == (value.length - 1), "Last character should be the device separator");
}if (value === this.device || (value != null && value.equals (this.device))) return this;
return  new org.eclipse.core.runtime.Path (value, this.$segments, this.separators);
}, "~S");
Clazz.overrideMethod (c$, "toFile", 
function () {
return  new java.io.File (this.toOSString ());
});
Clazz.overrideMethod (c$, "toOSString", 
function () {
var resultSize = this.computeLength ();
if (resultSize <= 0) return "";
var FILE_SEPARATOR = java.io.File.separatorChar;
var result =  Clazz.newArray (resultSize, '\0');
var offset = 0;
if (this.device != null) {
var size = this.device.length;
this.device.getChars (0, size, result, offset);
offset += size;
}if ((this.separators & 1) != 0) result[offset++] = FILE_SEPARATOR;
if ((this.separators & 2) != 0) result[offset++] = FILE_SEPARATOR;
var len = this.$segments.length - 1;
if (len >= 0) {
for (var i = 0; i < len; i++) {
var size = this.$segments[i].length;
this.$segments[i].getChars (0, size, result, offset);
offset += size;
result[offset++] = FILE_SEPARATOR;
}
var size = this.$segments[len].length;
this.$segments[len].getChars (0, size, result, offset);
offset += size;
}if ((this.separators & 4) != 0) result[offset++] = FILE_SEPARATOR;
return  String.instantialize (result);
});
Clazz.overrideMethod (c$, "toPortableString", 
function () {
var resultSize = this.computeLength ();
if (resultSize <= 0) return "";
var result =  new StringBuffer (resultSize);
if (this.device != null) result.append (this.device);
if ((this.separators & 1) != 0) result.append ('/');
if ((this.separators & 2) != 0) result.append ('/');
var len = this.$segments.length;
for (var i = 0; i < len; i++) {
if (this.$segments[i].indexOf (':') >= 0) this.encodeSegment (this.$segments[i], result);
 else result.append (this.$segments[i]);
if (i < len - 1 || (this.separators & 4) != 0) result.append ('/');
}
return result.toString ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
var resultSize = this.computeLength ();
if (resultSize <= 0) return "";
var result =  Clazz.newArray (resultSize, '\0');
var offset = 0;
if (this.device != null) {
var size = this.device.length;
this.device.getChars (0, size, result, offset);
offset += size;
}if ((this.separators & 1) != 0) result[offset++] = '/';
if ((this.separators & 2) != 0) result[offset++] = '/';
var len = this.$segments.length - 1;
if (len >= 0) {
for (var i = 0; i < len; i++) {
var size = this.$segments[i].length;
this.$segments[i].getChars (0, size, result, offset);
offset += size;
result[offset++] = '/';
}
var size = this.$segments[len].length;
this.$segments[len].getChars (0, size, result, offset);
offset += size;
}if ((this.separators & 4) != 0) result[offset++] = '/';
return  String.instantialize (result);
});
Clazz.overrideMethod (c$, "uptoSegment", 
function (count) {
if (count == 0) return  new org.eclipse.core.runtime.Path (this.device, org.eclipse.core.runtime.Path.EMPTY_STRING_ARRAY, this.separators & (3));
if (count >= this.$segments.length) return this;
org.eclipse.core.internal.runtime.Assert.isTrue (count > 0, "Invalid parameter to Path.uptoSegment");
var newSegments =  new Array (count);
System.arraycopy (this.$segments, 0, newSegments, 0, count);
return  new org.eclipse.core.runtime.Path (this.device, newSegments, this.separators);
}, "~N");
Clazz.defineStatics (c$,
"HAS_LEADING", 1,
"IS_UNC", 2,
"HAS_TRAILING", 4,
"ALL_SEPARATORS", 7,
"EMPTY_STRING", "");
c$.EMPTY_STRING_ARRAY = c$.prototype.EMPTY_STRING_ARRAY = [];
c$.NO_SEGMENTS = c$.prototype.NO_SEGMENTS =  new Array (0);
c$.EMPTY = c$.prototype.EMPTY =  new org.eclipse.core.runtime.Path ("");
Clazz.defineStatics (c$,
"HASH_MASK", -5,
"ROOT_STRING", "/");
c$.ROOT = c$.prototype.ROOT =  new org.eclipse.core.runtime.Path ("/");
c$.WINDOWS = c$.prototype.WINDOWS = (java.io.File.separatorChar).charCodeAt (0) == ('\\').charCodeAt (0);
});
