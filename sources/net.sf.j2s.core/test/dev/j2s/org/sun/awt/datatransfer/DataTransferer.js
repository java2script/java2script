Clazz.declarePackage ("sun.awt.datatransfer");
Clazz.load (["java.lang.Long", "java.util.ArrayList", "$.Collections", "$.HashMap", "$.HashSet", "java.util.logging.Logger"], "sun.awt.datatransfer.DataTransferer", ["java.io.ByteArrayInputStream", "$.ByteArrayOutputStream", "$.File", "$.IOException", "$.InputStream", "$.InputStreamReader", "$.Reader", "$.SequenceInputStream", "$.StringReader", "java.lang.Boolean", "$.ClassLoader", "$.StringBuffer", "java.lang.reflect.Modifier", "java.util.Arrays", "$.Stack", "$.TreeMap", "$.TreeSet", "java.util.logging.Level", "java.awt.AWTError", "$.EventQueue", "java.awt.datatransfer.DataFlavor", "$.FlavorTable", "java.security.AccessController", "$.PrivilegedAction", "sun.awt.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.declareType (sun.awt.datatransfer, "DataTransferer");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (sun.awt.datatransfer.DataTransferer.transferer == null) {
{
if (sun.awt.datatransfer.DataTransferer.transferer == null) {
var name = sun.awt.SunToolkit.getDataTransfererClassName ();
if (name != null) {
var action = ((Clazz.isClassDefined ("sun.awt.datatransfer.DataTransferer$1") ? 0 : sun.awt.datatransfer.DataTransferer.$DataTransferer$1$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.DataTransferer$1, this, Clazz.cloneFinals ("name", name)));
sun.awt.datatransfer.DataTransferer.transferer = java.security.AccessController.doPrivileged (action);
}}}}return sun.awt.datatransfer.DataTransferer.transferer;
});
c$.canonicalName = Clazz.defineMethod (c$, "canonicalName", 
function (encoding) {
if (encoding == null) {
return null;
}return encoding;
}, "~S");
c$.getTextCharset = Clazz.defineMethod (c$, "getTextCharset", 
function (flavor) {
if (!sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor)) {
return null;
}var encoding = flavor.getParameter ("charset");
return (encoding != null) ? encoding : sun.awt.datatransfer.DataTransferer.getDefaultTextCharset ();
}, "java.awt.datatransfer.DataFlavor");
c$.getDefaultTextCharset = Clazz.defineMethod (c$, "getDefaultTextCharset", 
function () {
if (sun.awt.datatransfer.DataTransferer.defaultEncoding != null) {
return sun.awt.datatransfer.DataTransferer.defaultEncoding;
}return null;
});
c$.doesSubtypeSupportCharset = Clazz.defineMethod (c$, "doesSubtypeSupportCharset", 
function (flavor) {
if (sun.awt.datatransfer.DataTransferer.dtLog.isLoggable (java.util.logging.Level.FINE)) {
if (!"text".equals (flavor.getPrimaryType ())) {
sun.awt.datatransfer.DataTransferer.dtLog.log (java.util.logging.Level.FINE, "Assertion (\"text\".equals(flavor.getPrimaryType())) failed");
}}var subType = flavor.getSubType ();
if (subType == null) {
return false;
}var support = sun.awt.datatransfer.DataTransferer.textMIMESubtypeCharsetSupport.get (subType);
if (support != null) {
return (support === Boolean.TRUE);
}var ret_val = (flavor.getParameter ("charset") != null);
sun.awt.datatransfer.DataTransferer.textMIMESubtypeCharsetSupport.put (subType, (ret_val) ? Boolean.TRUE : Boolean.FALSE);
return ret_val;
}, "java.awt.datatransfer.DataFlavor");
c$.doesSubtypeSupportCharset = Clazz.defineMethod (c$, "doesSubtypeSupportCharset", 
function (subType, charset) {
var support = sun.awt.datatransfer.DataTransferer.textMIMESubtypeCharsetSupport.get (subType);
if (support != null) {
return (support === Boolean.TRUE);
}var ret_val = (charset != null);
sun.awt.datatransfer.DataTransferer.textMIMESubtypeCharsetSupport.put (subType, (ret_val) ? Boolean.TRUE : Boolean.FALSE);
return ret_val;
}, "~S,~S");
c$.isFlavorCharsetTextType = Clazz.defineMethod (c$, "isFlavorCharsetTextType", 
function (flavor) {
if (java.awt.datatransfer.DataFlavor.stringFlavor.equals (flavor)) {
return true;
}if (!"text".equals (flavor.getPrimaryType ()) || !sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (flavor)) {
return false;
}var rep_class = flavor.getRepresentationClass ();
if (flavor.isRepresentationClassReader () || String.equals (rep_class) || flavor.isRepresentationClassCharBuffer () || sun.awt.datatransfer.DataTransferer.charArrayClass.equals (rep_class)) {
return true;
}if (!(flavor.isRepresentationClassInputStream () || flavor.isRepresentationClassByteBuffer () || sun.awt.datatransfer.DataTransferer.byteArrayClass.equals (rep_class))) {
return false;
}var charset = flavor.getParameter ("charset");
return (charset != null) ? sun.awt.datatransfer.DataTransferer.isEncodingSupported (charset) : true;
}, "java.awt.datatransfer.DataFlavor");
c$.isFlavorNoncharsetTextType = Clazz.defineMethod (c$, "isFlavorNoncharsetTextType", 
function (flavor) {
if (!"text".equals (flavor.getPrimaryType ()) || sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (flavor)) {
return false;
}return (flavor.isRepresentationClassInputStream () || flavor.isRepresentationClassByteBuffer () || sun.awt.datatransfer.DataTransferer.byteArrayClass.equals (flavor.getRepresentationClass ()));
}, "java.awt.datatransfer.DataFlavor");
c$.isEncodingSupported = Clazz.defineMethod (c$, "isEncodingSupported", 
function (encoding) {
if (encoding == null) {
return false;
}return false;
}, "~S");
c$.standardEncodings = Clazz.defineMethod (c$, "standardEncodings", 
function () {
if (sun.awt.datatransfer.DataTransferer.$standardEncodings == null) {
var tempSet =  new java.util.TreeSet (sun.awt.datatransfer.DataTransferer.defaultCharsetComparator);
tempSet.add ("US-ASCII");
tempSet.add ("ISO-8859-1");
tempSet.add ("UTF-8");
tempSet.add ("UTF-16BE");
tempSet.add ("UTF-16LE");
tempSet.add ("UTF-16");
tempSet.add (sun.awt.datatransfer.DataTransferer.getDefaultTextCharset ());
sun.awt.datatransfer.DataTransferer.$standardEncodings = java.util.Collections.unmodifiableSortedSet (tempSet);
}return sun.awt.datatransfer.DataTransferer.$standardEncodings.iterator ();
});
c$.adaptFlavorMap = Clazz.defineMethod (c$, "adaptFlavorMap", 
function (map) {
if (Clazz.instanceOf (map, java.awt.datatransfer.FlavorTable)) {
return map;
}return ((Clazz.isClassDefined ("sun.awt.datatransfer.DataTransferer$2") ? 0 : sun.awt.datatransfer.DataTransferer.$DataTransferer$2$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.DataTransferer$2, this, Clazz.cloneFinals ("map", map)));
}, "java.awt.datatransfer.FlavorMap");
Clazz.defineMethod (c$, "registerTextFlavorProperties", 
function (nat, charset, eoln, terminators) {
var format = this.getFormatForNativeAsLong (nat);
sun.awt.datatransfer.DataTransferer.textNatives.add (format);
sun.awt.datatransfer.DataTransferer.nativeCharsets.put (format, (charset != null && charset.length != 0) ? charset : sun.awt.datatransfer.DataTransferer.getDefaultTextCharset ());
if (eoln != null && eoln.length != 0 && !eoln.equals ("\n")) {
sun.awt.datatransfer.DataTransferer.nativeEOLNs.put (format, eoln);
}if (terminators != null && terminators.length != 0) {
var iTerminators = Integer.$valueOf (terminators);
if (iTerminators.intValue () > 0) {
sun.awt.datatransfer.DataTransferer.nativeTerminators.put (format, iTerminators);
}}}, "~S,~S,~S,~S");
Clazz.defineMethod (c$, "isTextFormat", 
function (format) {
return sun.awt.datatransfer.DataTransferer.textNatives.contains (Long.$valueOf (format));
}, "~N");
Clazz.defineMethod (c$, "getCharsetForTextFormat", 
function (lFormat) {
return sun.awt.datatransfer.DataTransferer.nativeCharsets.get (lFormat);
}, "Long");
Clazz.defineMethod (c$, "getFormatsForTransferable", 
function (contents, map) {
var flavors = contents.getTransferDataFlavors ();
if (flavors == null) {
return  new java.util.TreeMap ();
}return this.getFormatsForFlavors (flavors, map);
}, "java.awt.datatransfer.Transferable,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFormatsForFlavor", 
function (flavor, map) {
return this.getFormatsForFlavors ( Clazz.newArray (-1, [flavor]), map);
}, "java.awt.datatransfer.DataFlavor,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFormatsForFlavors", 
function (flavors, map) {
var formatMap =  new java.util.HashMap (flavors.length);
var textPlainMap =  new java.util.HashMap (flavors.length);
var indexMap =  new java.util.HashMap (flavors.length);
var textPlainIndexMap =  new java.util.HashMap (flavors.length);
var currentIndex = 0;
for (var i = flavors.length - 1; i >= 0; i--) {
var flavor = flavors[i];
if (flavor == null) continue;
if (flavor.isFlavorTextType () || flavor.isFlavorJavaFileListType () || java.awt.datatransfer.DataFlavor.imageFlavor.equals (flavor) || flavor.isRepresentationClassSerializable () || flavor.isRepresentationClassInputStream () || flavor.isRepresentationClassRemote ()) {
var natives = map.getNativesForFlavor (flavor);
currentIndex += natives.size ();
for (var iter = natives.iterator (); iter.hasNext (); ) {
var lFormat = this.getFormatForNativeAsLong (iter.next ());
var index = Integer.$valueOf (currentIndex--);
formatMap.put (lFormat, flavor);
indexMap.put (lFormat, index);
if (("text".equals (flavor.getPrimaryType ()) && "plain".equals (flavor.getSubType ())) || flavor.equals (java.awt.datatransfer.DataFlavor.stringFlavor)) {
textPlainMap.put (lFormat, flavor);
textPlainIndexMap.put (lFormat, index);
}}
currentIndex += natives.size ();
}}
formatMap.putAll (textPlainMap);
indexMap.putAll (textPlainIndexMap);
var comparator =  new sun.awt.datatransfer.DataTransferer.IndexOrderComparator (indexMap, false);
var sortedMap =  new java.util.TreeMap (comparator);
sortedMap.putAll (formatMap);
return sortedMap;
}, "~A,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFormatsForTransferableAsArray", 
function (contents, map) {
return sun.awt.datatransfer.DataTransferer.keysToLongArray (this.getFormatsForTransferable (contents, map));
}, "java.awt.datatransfer.Transferable,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFormatsForFlavorAsArray", 
function (flavor, map) {
return sun.awt.datatransfer.DataTransferer.keysToLongArray (this.getFormatsForFlavor (flavor, map));
}, "java.awt.datatransfer.DataFlavor,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFormatsForFlavorsAsArray", 
function (flavors, map) {
return sun.awt.datatransfer.DataTransferer.keysToLongArray (this.getFormatsForFlavors (flavors, map));
}, "~A,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFlavorsForFormat", 
function (format, map) {
return this.getFlavorsForFormats ( Clazz.newLongArray (-1, [format]), map);
}, "~N,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFlavorsForFormats", 
function (formats, map) {
var flavorMap =  new java.util.HashMap (formats.length);
var mappingSet =  new java.util.HashSet (formats.length);
var flavorSet =  new java.util.HashSet (formats.length);
for (var i = 0; i < formats.length; i++) {
var format = formats[i];
var nat = this.getNativeForFormat (format);
var flavors = map.getFlavorsForNative (nat);
for (var iter = flavors.iterator (); iter.hasNext (); ) {
var flavor = iter.next ();
if (flavor.isFlavorTextType () || flavor.isFlavorJavaFileListType () || java.awt.datatransfer.DataFlavor.imageFlavor.equals (flavor) || flavor.isRepresentationClassSerializable () || flavor.isRepresentationClassInputStream () || flavor.isRepresentationClassRemote ()) {
var lFormat = Long.$valueOf (format);
var mapping = sun.awt.datatransfer.DataTransferer.createMapping (lFormat, flavor);
flavorMap.put (flavor, lFormat);
mappingSet.add (mapping);
flavorSet.add (flavor);
}}
}
for (var flavorIter = flavorSet.iterator (); flavorIter.hasNext (); ) {
var flavor = flavorIter.next ();
var natives = map.getNativesForFlavor (flavor);
for (var nativeIter = natives.iterator (); nativeIter.hasNext (); ) {
var lFormat = this.getFormatForNativeAsLong (nativeIter.next ());
var mapping = sun.awt.datatransfer.DataTransferer.createMapping (lFormat, flavor);
if (mappingSet.contains (mapping)) {
flavorMap.put (flavor, lFormat);
break;
}}
}
return flavorMap;
}, "~A,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFlavorsForFormatsAsSet", 
function (formats, map) {
var flavorSet =  new java.util.HashSet (formats.length);
for (var i = 0; i < formats.length; i++) {
var nat = this.getNativeForFormat (formats[i]);
var flavors = map.getFlavorsForNative (nat);
for (var iter = flavors.iterator (); iter.hasNext (); ) {
var flavor = iter.next ();
if (flavor.isFlavorTextType () || flavor.isFlavorJavaFileListType () || java.awt.datatransfer.DataFlavor.imageFlavor.equals (flavor) || flavor.isRepresentationClassSerializable () || flavor.isRepresentationClassInputStream () || flavor.isRepresentationClassRemote ()) {
flavorSet.add (flavor);
}}
}
return flavorSet;
}, "~A,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFlavorsForFormatAsArray", 
function (format, map) {
return this.getFlavorsForFormatsAsArray ( Clazz.newLongArray (-1, [format]), map);
}, "~N,java.awt.datatransfer.FlavorTable");
Clazz.defineMethod (c$, "getFlavorsForFormatsAsArray", 
function (formats, map) {
return sun.awt.datatransfer.DataTransferer.setToSortedDataFlavorArray (this.getFlavorsForFormatsAsSet (formats, map));
}, "~A,java.awt.datatransfer.FlavorTable");
c$.createMapping = Clazz.defineMethod (c$, "createMapping", 
 function (key, value) {
return java.util.Arrays.asList ( Clazz.newArray (-1, [key, value]));
}, "~O,~O");
Clazz.defineMethod (c$, "getBestCharsetForTextFormat", 
 function (lFormat, localeTransferable) {
var charset = null;
if (localeTransferable != null && this.isLocaleDependentTextFormat ((lFormat).longValue ()) && localeTransferable.isDataFlavorSupported (sun.awt.datatransfer.DataTransferer.javaTextEncodingFlavor)) {
try {
charset =  String.instantialize (localeTransferable.getTransferData (sun.awt.datatransfer.DataTransferer.javaTextEncodingFlavor), "UTF-8");
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, java.awt.datatransfer.UnsupportedFlavorException)) {
} else {
throw cannotHappen;
}
}
} else {
charset = this.getCharsetForTextFormat (lFormat);
}if (charset == null) {
charset = sun.awt.datatransfer.DataTransferer.getDefaultTextCharset ();
}return charset;
}, "Long,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "translateTransferableString", 
 function (str, format) {
var lFormat = Long.$valueOf (format);
var charset = this.getBestCharsetForTextFormat (lFormat, null);
var eoln = sun.awt.datatransfer.DataTransferer.nativeEOLNs.get (lFormat);
if (eoln != null) {
var length = str.length;
var buffer =  new StringBuffer (length * 2);
for (var i = 0; i < length; i++) {
if (str.startsWith (eoln, i)) {
buffer.append (eoln);
i += eoln.length - 1;
continue;
}var c = str.charAt (i);
if (c == '\n') {
buffer.append (eoln);
} else {
buffer.append (c);
}}
str = buffer.toString ();
}var bytes = str.getBytes (charset);
var terminators = sun.awt.datatransfer.DataTransferer.nativeTerminators.get (lFormat);
if (terminators != null) {
var numTerminators = terminators.intValue ();
var terminatedBytes =  Clazz.newByteArray (bytes.length + numTerminators, 0);
System.arraycopy (bytes, 0, terminatedBytes, 0, bytes.length);
for (var i = bytes.length; i < terminatedBytes.length; i++) {
terminatedBytes[i] = 0x0;
}
bytes = terminatedBytes;
}return bytes;
}, "~S,~N");
Clazz.defineMethod (c$, "translateBytesOrStreamToString", 
 function (str, bytes, format, localeTransferable) {
if (bytes == null) {
bytes = sun.awt.datatransfer.DataTransferer.inputStreamToByteArray (str);
}str.close ();
var lFormat = Long.$valueOf (format);
var charset = this.getBestCharsetForTextFormat (lFormat, localeTransferable);
var eoln = sun.awt.datatransfer.DataTransferer.nativeEOLNs.get (lFormat);
var terminators = sun.awt.datatransfer.DataTransferer.nativeTerminators.get (lFormat);
var count;
if (terminators != null) {
var numTerminators = terminators.intValue ();
search : for (count = 0; count < (bytes.length - numTerminators + 1); count += numTerminators) {
for (var i = count; i < count + numTerminators; i++) {
if (bytes[i] != 0x0) {
continue search;
}}
break search;
}
} else {
count = bytes.length;
}var converted =  String.instantialize (bytes, 0, count, charset);
if (eoln != null) {
var buf = converted.toCharArray ();
var eoln_arr = eoln.toCharArray ();
converted = null;
var j = 0;
var match;
for (var i = 0; i < buf.length; ) {
if (i + eoln_arr.length > buf.length) {
buf[j++] = buf[i++];
continue;
}match = true;
for (var k = 0, l = i; k < eoln_arr.length; k++, l++) {
if (eoln_arr[k] != buf[l]) {
match = false;
break;
}}
if (match) {
buf[j++] = '\n';
i += eoln_arr.length;
} else {
buf[j++] = buf[i++];
}}
converted =  String.instantialize (buf, 0, j);
}return converted;
}, "java.io.InputStream,~A,~N,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "translateTransferable", 
function (contents, flavor, format) {
var obj;
var stringSelectionHack;
try {
obj = contents.getTransferData (flavor);
if (obj == null) {
return null;
}if (flavor.equals (java.awt.datatransfer.DataFlavor.plainTextFlavor) && !(Clazz.instanceOf (obj, java.io.InputStream))) {
obj = contents.getTransferData (java.awt.datatransfer.DataFlavor.stringFlavor);
if (obj == null) {
return null;
}stringSelectionHack = true;
} else {
stringSelectionHack = false;
}} catch (e) {
if (Clazz.exceptionOf (e, java.awt.datatransfer.UnsupportedFlavorException)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
if (stringSelectionHack || (String.equals (flavor.getRepresentationClass ()) && sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
return this.translateTransferableString (this.removeSuspectedData (flavor, contents, obj), format);
} else if (flavor.isRepresentationClassReader ()) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as Reader");
}var r = obj;
var buf =  new StringBuffer ();
var c;
while ((c = r.read ()) != -1) {
buf.append (String.fromCharCode (c));
}
r.close ();
return this.translateTransferableString (buf.toString (), format);
} else if (flavor.isRepresentationClassCharBuffer ()) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as CharBuffer");
}return null;
} else if (sun.awt.datatransfer.DataTransferer.charArrayClass.equals (flavor.getRepresentationClass ())) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as char array");
}return this.translateTransferableString ( String.instantialize (obj), format);
} else if (flavor.isRepresentationClassByteBuffer ()) {
} else if (sun.awt.datatransfer.DataTransferer.byteArrayClass.equals (flavor.getRepresentationClass ())) {
var bytes = obj;
if (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format)) {
var sourceEncoding = sun.awt.datatransfer.DataTransferer.getTextCharset (flavor);
return this.translateTransferableString ( String.instantialize (bytes, sourceEncoding), format);
} else {
return bytes;
}} else if (java.awt.datatransfer.DataFlavor.imageFlavor.equals (flavor)) {
if (!this.isImageFormat (format)) {
throw  new java.io.IOException ("Data translation failed: not an image format");
}var image = obj;
var bytes = this.imageToPlatformBytes (image, format);
if (bytes == null) {
throw  new java.io.IOException ("Data translation failed: cannot convert java image to native format");
}return bytes;
}var bos =  new java.io.ByteArrayOutputStream ();
if (this.isFileFormat (format)) {
if (!java.awt.datatransfer.DataFlavor.javaFileListFlavor.equals (flavor)) {
throw  new java.io.IOException ("data translation failed");
}var list = obj;
var fileList =  new java.util.ArrayList ();
var nFiles = 0;
for (var i = 0; i < list.size (); i++) {
var o = list.get (i);
if (Clazz.instanceOf (o, java.io.File) || Clazz.instanceOf (o, String)) {
nFiles++;
}}
var files =  new Array (nFiles);
for (var i = 0, j = 0; i < list.size (); i++) {
var o = list.get (i);
var file = this.castToFile (o);
fileList.add (file.getCanonicalPath ());
}
for (var fileName, $fileName = fileList.iterator (); $fileName.hasNext () && ((fileName = $fileName.next ()) || true);) {
var bytes = fileName.getBytes ();
bos.write (bytes, 0, bytes.length);
bos.write (0);
}
bos.write (0);
} else if (flavor.isRepresentationClassInputStream ()) {
var is = obj;
var eof = false;
var avail = is.available ();
var tmp =  Clazz.newByteArray (avail > 8192 ? avail : 8192, 0);
do {
var ret;
if (!(eof = (ret = is.read (tmp, 0, tmp.length)) == -1)) {
bos.write (tmp, 0, ret);
}} while (!eof);
is.close ();
if (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format)) {
var bytes = bos.toByteArray ();
bos.close ();
var sourceEncoding = sun.awt.datatransfer.DataTransferer.getTextCharset (flavor);
return this.translateTransferableString ( String.instantialize (bytes, sourceEncoding), format);
}} else {
throw  new java.io.IOException ("data translation failed");
}var ret = bos.toByteArray ();
bos.close ();
return ret;
}, "java.awt.datatransfer.Transferable,java.awt.datatransfer.DataFlavor,~N");
Clazz.defineMethod (c$, "translateBytes", 
function (bytes, flavor, format, localeTransferable) {
return this.translateBytesOrStream (null, bytes, flavor, format, localeTransferable);
}, "~A,java.awt.datatransfer.DataFlavor,~N,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "translateStream", 
function (str, flavor, format, localeTransferable) {
return this.translateBytesOrStream (str, null, flavor, format, localeTransferable);
}, "java.io.InputStream,java.awt.datatransfer.DataFlavor,~N,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "translateBytesOrStream", 
function (str, bytes, flavor, format, localeTransferable) {
if (str == null) {
str =  new java.io.ByteArrayInputStream (bytes);
}if (this.isFileFormat (format)) {
if (!java.awt.datatransfer.DataFlavor.javaFileListFlavor.equals (flavor)) {
throw  new java.io.IOException ("data translation failed");
}if (bytes == null) {
bytes = sun.awt.datatransfer.DataTransferer.inputStreamToByteArray (str);
}var filenames = this.dragQueryFile (bytes);
if (filenames == null) {
str.close ();
return null;
}var files =  new Array (filenames.length);
for (var i = 0; i < filenames.length; i++) {
files[i] =  new java.io.File (filenames[i]);
}
str.close ();
return java.util.Arrays.asList (files);
} else if (String.equals (flavor.getRepresentationClass ()) && sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format)) {
return this.translateBytesOrStreamToString (str, bytes, format, localeTransferable);
} else if (java.awt.datatransfer.DataFlavor.plainTextFlavor.equals (flavor)) {
return  new java.io.StringReader (this.translateBytesOrStreamToString (str, bytes, format, localeTransferable));
} else if (flavor.isRepresentationClassInputStream ()) {
return this.translateBytesOrStreamToInputStream (str, flavor, format, localeTransferable);
} else if (flavor.isRepresentationClassReader ()) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as Reader");
}var is = this.translateBytesOrStreamToInputStream (str, java.awt.datatransfer.DataFlavor.plainTextFlavor, format, localeTransferable);
var unicode = sun.awt.datatransfer.DataTransferer.getTextCharset (java.awt.datatransfer.DataFlavor.plainTextFlavor);
var reader =  new java.io.InputStreamReader (is, unicode);
return this.constructFlavoredObject (reader, flavor, java.io.Reader);
} else if (flavor.isRepresentationClassCharBuffer ()) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as CharBuffer");
}return null;
} else if (sun.awt.datatransfer.DataTransferer.charArrayClass.equals (flavor.getRepresentationClass ())) {
if (!(sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format))) {
throw  new java.io.IOException ("cannot transfer non-text data as char array");
}return this.translateBytesOrStreamToString (str, bytes, format, localeTransferable).toCharArray ();
} else if (flavor.isRepresentationClassByteBuffer ()) {
if (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format)) {
bytes = this.translateBytesOrStreamToString (str, bytes, format, localeTransferable).getBytes (sun.awt.datatransfer.DataTransferer.getTextCharset (flavor));
} else {
if (bytes == null) {
bytes = sun.awt.datatransfer.DataTransferer.inputStreamToByteArray (str);
}}return null;
} else if (sun.awt.datatransfer.DataTransferer.byteArrayClass.equals (flavor.getRepresentationClass ())) {
if (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flavor) && this.isTextFormat (format)) {
return this.translateBytesOrStreamToString (str, bytes, format, localeTransferable).getBytes (sun.awt.datatransfer.DataTransferer.getTextCharset (flavor));
} else {
return (bytes != null) ? bytes : sun.awt.datatransfer.DataTransferer.inputStreamToByteArray (str);
}} else if (java.awt.datatransfer.DataFlavor.imageFlavor.equals (flavor)) {
if (!this.isImageFormat (format)) {
throw  new java.io.IOException ("data translation failed");
}var image = this.platformImageBytesOrStreamToImage (str, bytes, format);
str.close ();
return image;
}throw  new java.io.IOException ("data translation failed");
}, "java.io.InputStream,~A,java.awt.datatransfer.DataFlavor,~N,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "translateBytesOrStreamToInputStream", 
 function (str, flavor, format, localeTransferable) {
return this.constructFlavoredObject (str, flavor, java.io.InputStream);
}, "java.io.InputStream,java.awt.datatransfer.DataFlavor,~N,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "removeSuspectedData", 
 function (flavor, contents, str) {
if (null == System.getSecurityManager () || !flavor.isMimeTypeEqual ("text/uri-list")) {
return str;
}var ret_val = "";
var allowedFiles =  new StringBuffer (str.length);
for (var i = 0; i < str.$plit ("(\\s)+").length; i++) {
var fileName = str.$plit ("(\\s)+")[i];
var file =  new java.io.File (fileName);
if (file.exists () && sun.awt.datatransfer.DataTransferer.isFileInWebstartedCache (file)) {
continue;
}if (0 != allowedFiles.length ()) {
allowedFiles.append ("\\r\\n");
}allowedFiles.append (fileName);
}
ret_val = allowedFiles.toString ();
return ret_val;
}, "java.awt.datatransfer.DataFlavor,java.awt.datatransfer.Transferable,~S");
Clazz.defineMethod (c$, "castToFile", 
 function (fileObject) {
var filePath = null;
if (Clazz.instanceOf (fileObject, java.io.File)) {
filePath = (fileObject).getCanonicalPath ();
} else if (Clazz.instanceOf (fileObject, String)) {
filePath = fileObject;
}return  new java.io.File (filePath);
}, "~O");
c$.isFileInWebstartedCache = Clazz.defineMethod (c$, "isFileInWebstartedCache", 
 function (f) {
if (sun.awt.datatransfer.DataTransferer.deploymentCacheDirectoryList.isEmpty ()) {
for (var cacheDirectoryProperty, $cacheDirectoryProperty = 0, $$cacheDirectoryProperty = sun.awt.datatransfer.DataTransferer.DEPLOYMENT_CACHE_PROPERTIES; $cacheDirectoryProperty < $$cacheDirectoryProperty.length && ((cacheDirectoryProperty = $$cacheDirectoryProperty[$cacheDirectoryProperty]) || true); $cacheDirectoryProperty++) {
var cacheDirectoryPath = System.getProperty (cacheDirectoryProperty);
if (cacheDirectoryPath != null) {
try {
var cacheDirectory = ( new java.io.File (cacheDirectoryPath)).getCanonicalFile ();
if (cacheDirectory != null) {
sun.awt.datatransfer.DataTransferer.deploymentCacheDirectoryList.add (cacheDirectory);
}} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
} else {
throw ioe;
}
}
}}
}for (var it = sun.awt.datatransfer.DataTransferer.deploymentCacheDirectoryList.iterator (); it.hasNext (); ) {
var deploymentCacheDirectory = it.next ();
for (var dir = f; dir != null; dir = dir.getParentFile ()) {
if (dir.equals (deploymentCacheDirectory)) {
return true;
}}
}
return false;
}, "java.io.File");
Clazz.defineMethod (c$, "constructFlavoredObject", 
 function (arg, flavor, clazz) {
var dfrc = flavor.getRepresentationClass ();
if (clazz.equals (dfrc)) {
return arg;
} else {
var constructors = null;
try {
constructors = java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("sun.awt.datatransfer.DataTransferer$3") ? 0 : sun.awt.datatransfer.DataTransferer.$DataTransferer$3$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.DataTransferer$3, this, Clazz.cloneFinals ("dfrc", dfrc))));
} catch (se) {
if (Clazz.exceptionOf (se, SecurityException)) {
throw  new java.io.IOException (se.getMessage ());
} else {
throw se;
}
}
var constructor = null;
for (var j = 0; j < constructors.length; j++) {
if (!java.lang.reflect.Modifier.isPublic (constructors[j].getModifiers ())) {
continue;
}var ptypes = constructors[j].getParameterTypes ();
if (ptypes != null && ptypes.length == 1 && clazz.equals (ptypes[0])) {
constructor = constructors[j];
break;
}}
if (constructor == null) {
throw  new java.io.IOException ("can't find <init>(L" + clazz + ";)V for class: " + dfrc.getName ());
}try {
return constructor.newInstance ( Clazz.newArray (-1, [arg]));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new java.io.IOException (e.getMessage ());
} else {
throw e;
}
}
}}, "~O,java.awt.datatransfer.DataFlavor,Class");
Clazz.defineMethod (c$, "convertData", 
function (source, contents, format, formatMap, isToolkitThread) {
var ret = null;
if (isToolkitThread) try {
var stack =  new java.util.Stack ();
var dataConverter = ((Clazz.isClassDefined ("sun.awt.datatransfer.DataTransferer$4") ? 0 : sun.awt.datatransfer.DataTransferer.$DataTransferer$4$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.DataTransferer$4, this, Clazz.cloneFinals ("formatMap", formatMap, "format", format, "contents", contents, "stack", stack)));
var appContext = sun.awt.SunToolkit.targetToAppContext (source);
this.getToolkitThreadBlockedHandler ().lock ();
if (appContext != null) {
appContext.put ("DATA_CONVERTER_KEY", dataConverter);
}sun.awt.SunToolkit.executeOnEventHandlerThread (source, dataConverter);
while (stack.empty ()) {
this.getToolkitThreadBlockedHandler ().enter ();
}
if (appContext != null) {
appContext.remove ("DATA_CONVERTER_KEY");
}ret = stack.pop ();
} finally {
this.getToolkitThreadBlockedHandler ().unlock ();
}
 else {
var flavor = formatMap.get (Long.$valueOf (format));
if (flavor != null) {
ret = this.translateTransferable (contents, flavor, format);
}}return ret;
}, "~O,java.awt.datatransfer.Transferable,~N,java.util.Map,~B");
Clazz.defineMethod (c$, "processDataConversionRequests", 
function () {
if (java.awt.EventQueue.isDispatchThread ()) {
var appContext = sun.awt.AppContext.getAppContext ();
this.getToolkitThreadBlockedHandler ().lock ();
try {
var dataConverter = appContext.get ("DATA_CONVERTER_KEY");
if (dataConverter != null) {
dataConverter.run ();
appContext.remove ("DATA_CONVERTER_KEY");
}} finally {
this.getToolkitThreadBlockedHandler ().unlock ();
}
}});
c$.keysToLongArray = Clazz.defineMethod (c$, "keysToLongArray", 
function (map) {
var keySet = map.keySet ();
var retval =  Clazz.newLongArray (keySet.size (), 0);
var i = 0;
for (var iter = keySet.iterator (); iter.hasNext (); i++) {
retval[i] = (iter.next ()).longValue ();
}
return retval;
}, "java.util.SortedMap");
c$.keysToDataFlavorArray = Clazz.defineMethod (c$, "keysToDataFlavorArray", 
function (map) {
return sun.awt.datatransfer.DataTransferer.setToSortedDataFlavorArray (map.keySet (), map);
}, "java.util.Map");
c$.setToSortedDataFlavorArray = Clazz.defineMethod (c$, "setToSortedDataFlavorArray", 
function (flavorsSet) {
var flavors =  new Array (flavorsSet.size ());
flavorsSet.toArray (flavors);
java.util.Arrays.sort (flavors, sun.awt.datatransfer.DataTransferer.defaultFlavorComparator);
return flavors;
}, "java.util.Set");
c$.setToSortedDataFlavorArray = Clazz.defineMethod (c$, "setToSortedDataFlavorArray", 
function (flavorsSet, flavorToNativeMap) {
var flavors =  new Array (flavorsSet.size ());
flavorsSet.toArray (flavors);
var comparator =  new sun.awt.datatransfer.DataTransferer.DataFlavorComparator (flavorToNativeMap, false);
java.util.Arrays.sort (flavors, comparator);
return flavors;
}, "java.util.Set,java.util.Map");
c$.inputStreamToByteArray = Clazz.defineMethod (c$, "inputStreamToByteArray", 
function (str) {
var baos =  new java.io.ByteArrayOutputStream ();
var len = 0;
var buf =  Clazz.newByteArray (8192, 0);
while ((len = str.read (buf)) != -1) {
baos.write (buf, 0, len);
}
return baos.toByteArray ();
}, "java.io.InputStream");
Clazz.defineMethod (c$, "getPlatformMappingsForNative", 
function (nat) {
return  new java.util.ArrayList ();
}, "~S");
Clazz.defineMethod (c$, "getPlatformMappingsForFlavor", 
function (df) {
return  new java.util.ArrayList ();
}, "java.awt.datatransfer.DataFlavor");
c$.$DataTransferer$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.datatransfer, "DataTransferer$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var cls = null;
var method = null;
var ret = null;
try {
cls = Clazz._4Name (this.$finals.name);
} catch (e) {
if (Clazz.exceptionOf (e, ClassNotFoundException)) {
var cl = ClassLoader.getSystemClassLoader ();
if (cl != null) {
try {
cls = cl.loadClass (this.$finals.name);
} catch (ee) {
if (Clazz.exceptionOf (ee, ClassNotFoundException)) {
ee.printStackTrace ();
throw  new java.awt.AWTError ("DataTransferer not found: " + this.$finals.name);
} else {
throw ee;
}
}
}} else {
throw e;
}
}
if (cls != null) {
try {
method = cls.getDeclaredMethod ("getInstanceImpl", []);
method.setAccessible (true);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, NoSuchMethodException)) {
var e = e$$;
{
e.printStackTrace ();
throw  new java.awt.AWTError ("Cannot instantiate DataTransferer: " + this.$finals.name);
}
} else if (Clazz.exceptionOf (e$$, SecurityException)) {
var e = e$$;
{
e.printStackTrace ();
throw  new java.awt.AWTError ("Access is denied for DataTransferer: " + this.$finals.name);
}
} else {
throw e$$;
}
}
}if (method != null) {
try {
ret = method.invoke (null, []);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
e.printStackTrace ();
throw  new java.awt.AWTError ("Cannot instantiate DataTransferer: " + this.$finals.name);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e = e$$;
{
e.printStackTrace ();
throw  new java.awt.AWTError ("Cannot access DataTransferer: " + this.$finals.name);
}
} else {
throw e$$;
}
}
}return ret;
});
c$ = Clazz.p0p ();
};
c$.$DataTransferer$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.datatransfer, "DataTransferer$2", null, java.awt.datatransfer.FlavorTable);
Clazz.defineMethod (c$, "getNativesForFlavors", 
function (flavors) {
return this.$finals.map.getNativesForFlavors (flavors);
}, "~A");
Clazz.defineMethod (c$, "getFlavorsForNatives", 
function (natives) {
return this.$finals.map.getFlavorsForNatives (natives);
}, "~A");
Clazz.defineMethod (c$, "getNativesForFlavor", 
function (flav) {
var natives = this.getNativesForFlavors ( Clazz.newArray (-1, [flav]));
var nat = natives.get (flav);
if (nat != null) {
var list =  new java.util.ArrayList (1);
list.add (nat);
return list;
} else {
return java.util.Collections.EMPTY_LIST;
}}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "getFlavorsForNative", 
function (nat) {
var flavors = this.getFlavorsForNatives ( Clazz.newArray (-1, [nat]));
var flavor = flavors.get (nat);
if (flavor != null) {
var list =  new java.util.ArrayList (1);
list.add (flavor);
return list;
} else {
return java.util.Collections.EMPTY_LIST;
}}, "~S");
c$ = Clazz.p0p ();
};
c$.$DataTransferer$3$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.datatransfer, "DataTransferer$3", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.$finals.dfrc.getConstructors ();
});
c$ = Clazz.p0p ();
};
c$.$DataTransferer$4$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.done = false;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer, "DataTransferer$4", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
if (this.done) {
return;
}var data = null;
try {
var flavor = this.$finals.formatMap.get (Long.$valueOf (this.$finals.format));
if (flavor != null) {
data = this.b$["sun.awt.datatransfer.DataTransferer"].translateTransferable (this.$finals.contents, flavor, this.$finals.format);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
data = null;
} else {
throw e;
}
}
try {
this.b$["sun.awt.datatransfer.DataTransferer"].getToolkitThreadBlockedHandler ().lock ();
this.$finals.stack.push (data);
this.b$["sun.awt.datatransfer.DataTransferer"].getToolkitThreadBlockedHandler ().exit ();
} finally {
this.b$["sun.awt.datatransfer.DataTransferer"].getToolkitThreadBlockedHandler ().unlock ();
this.done = true;
}
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.order = false;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer.DataTransferer, "IndexedComparator", null, java.util.Comparator);
Clazz.makeConstructor (c$, 
function () {
this.construct (true);
});
Clazz.makeConstructor (c$, 
function (a) {
this.order = a;
}, "~B");
c$.compareIndices = Clazz.defineMethod (c$, "compareIndices", 
function (a, b, c, d) {
var e = a.get (b);
var f = a.get (c);
if (e == null) {
e = d;
}if (f == null) {
f = d;
}return e.compareTo (f);
}, "java.util.Map,~O,~O,Integer");
c$.compareLongs = Clazz.defineMethod (c$, "compareLongs", 
function (a, b, c, d) {
var e = a.get (b);
var f = a.get (c);
if (e == null) {
e = d;
}if (f == null) {
f = d;
}return e.compareTo (f);
}, "java.util.Map,~O,~O,Long");
Clazz.defineStatics (c$,
"SELECT_BEST", true,
"SELECT_WORST", false);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.datatransfer.DataTransferer, "CharsetComparator", sun.awt.datatransfer.DataTransferer.IndexedComparator);
Clazz.makeConstructor (c$, 
function () {
this.construct (true);
});
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var c = null;
var d = null;
if (this.order == true) {
c = a;
d = b;
} else {
c = b;
d = a;
}return this.compareCharsets (c, d);
}, "~O,~O");
Clazz.defineMethod (c$, "compareCharsets", 
function (a, b) {
a = sun.awt.datatransfer.DataTransferer.CharsetComparator.getEncoding (a);
b = sun.awt.datatransfer.DataTransferer.CharsetComparator.getEncoding (b);
var c = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.CharsetComparator.charsets, a, b, sun.awt.datatransfer.DataTransferer.CharsetComparator.OTHER_CHARSET_INDEX);
if (c == 0) {
return b.compareTo (a);
}return c;
}, "~S,~S");
c$.getEncoding = Clazz.defineMethod (c$, "getEncoding", 
function (a) {
if (a == null) {
return null;
} else if (!sun.awt.datatransfer.DataTransferer.isEncodingSupported (a)) {
return "UNSUPPORTED";
} else {
var b = sun.awt.datatransfer.DataTransferer.canonicalName (a);
return (sun.awt.datatransfer.DataTransferer.CharsetComparator.charsets.containsKey (b)) ? b : a;
}}, "~S");
Clazz.defineStatics (c$,
"charsets", null,
"defaultEncoding", null);
c$.DEFAULT_CHARSET_INDEX = c$.prototype.DEFAULT_CHARSET_INDEX = Integer.$valueOf (2);
c$.OTHER_CHARSET_INDEX = c$.prototype.OTHER_CHARSET_INDEX = Integer.$valueOf (1);
c$.WORST_CHARSET_INDEX = c$.prototype.WORST_CHARSET_INDEX = Integer.$valueOf (0);
c$.UNSUPPORTED_CHARSET_INDEX = c$.prototype.UNSUPPORTED_CHARSET_INDEX = Integer.$valueOf (-2147483648);
Clazz.defineStatics (c$,
"UNSUPPORTED_CHARSET", "UNSUPPORTED");
{
var a =  new java.util.HashMap (8, 1.0);
a.put (sun.awt.datatransfer.DataTransferer.canonicalName ("UTF-16LE"), Integer.$valueOf (4));
a.put (sun.awt.datatransfer.DataTransferer.canonicalName ("UTF-16BE"), Integer.$valueOf (5));
a.put (sun.awt.datatransfer.DataTransferer.canonicalName ("UTF-8"), Integer.$valueOf (6));
a.put (sun.awt.datatransfer.DataTransferer.canonicalName ("UTF-16"), Integer.$valueOf (7));
a.put (sun.awt.datatransfer.DataTransferer.canonicalName ("US-ASCII"), sun.awt.datatransfer.DataTransferer.CharsetComparator.WORST_CHARSET_INDEX);
var b = sun.awt.datatransfer.DataTransferer.canonicalName (sun.awt.datatransfer.DataTransferer.getDefaultTextCharset ());
if (a.get (sun.awt.datatransfer.DataTransferer.CharsetComparator.defaultEncoding) == null) {
a.put (sun.awt.datatransfer.DataTransferer.CharsetComparator.defaultEncoding, sun.awt.datatransfer.DataTransferer.CharsetComparator.DEFAULT_CHARSET_INDEX);
}a.put ("UNSUPPORTED", sun.awt.datatransfer.DataTransferer.CharsetComparator.UNSUPPORTED_CHARSET_INDEX);
sun.awt.datatransfer.DataTransferer.CharsetComparator.charsets = java.util.Collections.unmodifiableMap (a);
}c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.flavorToFormatMap = null;
this.charsetComparator = null;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer.DataTransferer, "DataFlavorComparator", sun.awt.datatransfer.DataTransferer.IndexedComparator);
Clazz.makeConstructor (c$, 
function () {
this.construct (true);
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, sun.awt.datatransfer.DataTransferer.DataFlavorComparator, [a]);
this.charsetComparator =  new sun.awt.datatransfer.DataTransferer.CharsetComparator (a);
this.flavorToFormatMap = java.util.Collections.EMPTY_MAP;
}, "~B");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, true);
}, "java.util.Map");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, sun.awt.datatransfer.DataTransferer.DataFlavorComparator, [b]);
this.charsetComparator =  new sun.awt.datatransfer.DataTransferer.CharsetComparator (b);
var c =  new java.util.HashMap (a.size ());
c.putAll (a);
this.flavorToFormatMap = java.util.Collections.unmodifiableMap (c);
}, "java.util.Map,~B");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var c = null;
var d = null;
if (this.order == true) {
c = a;
d = b;
} else {
c = b;
d = a;
}if (c.equals (d)) {
return 0;
}var e = 0;
var f = c.getPrimaryType ();
var g = c.getSubType ();
var h = f + "/" + g;
var i = c.getRepresentationClass ();
var j = d.getPrimaryType ();
var k = d.getSubType ();
var l = j + "/" + k;
var m = d.getRepresentationClass ();
if (c.isFlavorTextType () && d.isFlavorTextType ()) {
e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.textTypes, h, l, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES);
if (e != 0) {
return e;
}if (sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (c)) {
e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.decodedTextRepresentations, i, m, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES);
if (e != 0) {
return e;
}e = this.charsetComparator.compareCharsets (sun.awt.datatransfer.DataTransferer.getTextCharset (c), sun.awt.datatransfer.DataTransferer.getTextCharset (d));
if (e != 0) {
return e;
}}e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.encodedTextRepresentations, i, m, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES);
if (e != 0) {
return e;
}} else {
e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.primaryTypes, f, j, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES);
if (e != 0) {
return e;
}e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.exactTypes, h, l, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_WINS);
if (e != 0) {
return e;
}e = sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (sun.awt.datatransfer.DataTransferer.DataFlavorComparator.nonTextRepresentations, i, m, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES);
if (e != 0) {
return e;
}}return sun.awt.datatransfer.DataTransferer.IndexedComparator.compareLongs (this.flavorToFormatMap, c, d, sun.awt.datatransfer.DataTransferer.DataFlavorComparator.UNKNOWN_OBJECT_LOSES_L);
}, "~O,~O");
Clazz.defineStatics (c$,
"exactTypes", null,
"primaryTypes", null,
"nonTextRepresentations", null,
"textTypes", null,
"decodedTextRepresentations", null,
"encodedTextRepresentations", null);
c$.UNKNOWN_OBJECT_LOSES = c$.prototype.UNKNOWN_OBJECT_LOSES = Integer.$valueOf (-2147483648);
c$.UNKNOWN_OBJECT_WINS = c$.prototype.UNKNOWN_OBJECT_WINS = Integer.$valueOf (2147483647);
c$.UNKNOWN_OBJECT_LOSES_L = c$.prototype.UNKNOWN_OBJECT_LOSES_L = Long.$valueOf (-9223372036854775808);
c$.UNKNOWN_OBJECT_WINS_L = c$.prototype.UNKNOWN_OBJECT_WINS_L = Long.$valueOf (9223372036854775807);
{
{
var a =  new java.util.HashMap (4, 1.0);
a.put ("application/x-java-file-list", Integer.$valueOf (0));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.exactTypes = java.util.Collections.unmodifiableMap (a);
}{
var a =  new java.util.HashMap (1, 1.0);
a.put ("application", Integer.$valueOf (0));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.primaryTypes = java.util.Collections.unmodifiableMap (a);
}{
var a =  new java.util.HashMap (3, 1.0);
a.put (java.io.InputStream, Integer.$valueOf (0));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.nonTextRepresentations = java.util.Collections.unmodifiableMap (a);
}{
var a =  new java.util.HashMap (16, 1.0);
a.put ("text/plain", Integer.$valueOf (0));
a.put ("application/x-java-serialized-object", Integer.$valueOf (1));
a.put ("text/calendar", Integer.$valueOf (2));
a.put ("text/css", Integer.$valueOf (3));
a.put ("text/directory", Integer.$valueOf (4));
a.put ("text/parityfec", Integer.$valueOf (5));
a.put ("text/rfc822-headers", Integer.$valueOf (6));
a.put ("text/t140", Integer.$valueOf (7));
a.put ("text/tab-separated-values", Integer.$valueOf (8));
a.put ("text/uri-list", Integer.$valueOf (9));
a.put ("text/richtext", Integer.$valueOf (10));
a.put ("text/enriched", Integer.$valueOf (11));
a.put ("text/rtf", Integer.$valueOf (12));
a.put ("text/html", Integer.$valueOf (13));
a.put ("text/xml", Integer.$valueOf (14));
a.put ("text/sgml", Integer.$valueOf (15));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.textTypes = java.util.Collections.unmodifiableMap (a);
}{
var a =  new java.util.HashMap (4, 1.0);
a.put (sun.awt.datatransfer.DataTransferer.charArrayClass, Integer.$valueOf (0));
a.put (String, Integer.$valueOf (2));
a.put (java.io.Reader, Integer.$valueOf (3));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.decodedTextRepresentations = java.util.Collections.unmodifiableMap (a);
}{
var a =  new java.util.HashMap (3, 1.0);
a.put (sun.awt.datatransfer.DataTransferer.byteArrayClass, Integer.$valueOf (0));
a.put (java.io.InputStream, Integer.$valueOf (2));
sun.awt.datatransfer.DataTransferer.DataFlavorComparator.encodedTextRepresentations = java.util.Collections.unmodifiableMap (a);
}}c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.indexMap = null;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer.DataTransferer, "IndexOrderComparator", sun.awt.datatransfer.DataTransferer.IndexedComparator);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, sun.awt.datatransfer.DataTransferer.IndexOrderComparator, [true]);
this.indexMap = a;
}, "java.util.Map");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, sun.awt.datatransfer.DataTransferer.IndexOrderComparator, [b]);
this.indexMap = a;
}, "java.util.Map,~B");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
if (this.order == false) {
return -sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (this.indexMap, a, b, sun.awt.datatransfer.DataTransferer.IndexOrderComparator.FALLBACK_INDEX);
} else {
return sun.awt.datatransfer.DataTransferer.IndexedComparator.compareIndices (this.indexMap, a, b, sun.awt.datatransfer.DataTransferer.IndexOrderComparator.FALLBACK_INDEX);
}}, "~O,~O");
c$.FALLBACK_INDEX = c$.prototype.FALLBACK_INDEX = Integer.$valueOf (-2147483648);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"charArrayClass", null,
"byteArrayClass", null,
"plainTextStringFlavor", null,
"javaTextEncodingFlavor", null,
"$standardEncodings", null,
"textMIMESubtypeCharsetSupport", null,
"defaultEncoding", null);
c$.textNatives = c$.prototype.textNatives = java.util.Collections.synchronizedSet ( new java.util.HashSet ());
c$.nativeCharsets = c$.prototype.nativeCharsets = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
c$.nativeEOLNs = c$.prototype.nativeEOLNs = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
c$.nativeTerminators = c$.prototype.nativeTerminators = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
Clazz.defineStatics (c$,
"DATA_CONVERTER_KEY", "DATA_CONVERTER_KEY",
"transferer", null);
c$.dtLog = c$.prototype.dtLog = java.util.logging.Logger.getLogger ("sun.awt.datatransfer.DataTransfer");
{
var tCharArrayClass = null;
var tByteArrayClass = null;
try {
tCharArrayClass = Clazz._4Name ("[C");
tByteArrayClass = Clazz._4Name ("[B");
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
sun.awt.datatransfer.DataTransferer.charArrayClass = tCharArrayClass;
sun.awt.datatransfer.DataTransferer.byteArrayClass = tByteArrayClass;
var tPlainTextStringFlavor = null;
try {
tPlainTextStringFlavor =  new java.awt.datatransfer.DataFlavor ("text/plain;charset=Unicode;class=java.lang.String");
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
sun.awt.datatransfer.DataTransferer.plainTextStringFlavor = tPlainTextStringFlavor;
var tJavaTextEncodingFlavor = null;
try {
tJavaTextEncodingFlavor =  new java.awt.datatransfer.DataFlavor ("application/x-java-text-encoding;class=\"[B\"");
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
sun.awt.datatransfer.DataTransferer.javaTextEncodingFlavor = tJavaTextEncodingFlavor;
var tempMap =  new java.util.HashMap (17);
tempMap.put ("sgml", Boolean.TRUE);
tempMap.put ("xml", Boolean.TRUE);
tempMap.put ("html", Boolean.TRUE);
tempMap.put ("enriched", Boolean.TRUE);
tempMap.put ("richtext", Boolean.TRUE);
tempMap.put ("uri-list", Boolean.TRUE);
tempMap.put ("directory", Boolean.TRUE);
tempMap.put ("css", Boolean.TRUE);
tempMap.put ("calendar", Boolean.TRUE);
tempMap.put ("plain", Boolean.TRUE);
tempMap.put ("rtf", Boolean.FALSE);
tempMap.put ("tab-separated-values", Boolean.FALSE);
tempMap.put ("t140", Boolean.FALSE);
tempMap.put ("rfc822-headers", Boolean.FALSE);
tempMap.put ("parityfec", Boolean.FALSE);
sun.awt.datatransfer.DataTransferer.textMIMESubtypeCharsetSupport = java.util.Collections.synchronizedMap (tempMap);
}Clazz.defineStatics (c$,
"DEPLOYMENT_CACHE_PROPERTIES",  Clazz.newArray (-1, ["deployment.system.cachedir", "deployment.user.cachedir", "deployment.javaws.cachedir", "deployment.javapi.cachedir"]));
c$.deploymentCacheDirectoryList = c$.prototype.deploymentCacheDirectoryList =  new java.util.ArrayList ();
c$.defaultCharsetComparator = c$.prototype.defaultCharsetComparator =  new sun.awt.datatransfer.DataTransferer.CharsetComparator (false);
c$.defaultFlavorComparator = c$.prototype.defaultFlavorComparator =  new sun.awt.datatransfer.DataTransferer.DataFlavorComparator (false);
});
