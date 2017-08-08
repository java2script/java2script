Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (["java.awt.datatransfer.FlavorMap", "$.FlavorTable", "java.util.HashMap", "$.HashSet"], "java.awt.datatransfer.SystemFlavorMap", ["java.awt.Toolkit", "java.io.BufferedReader", "$.File", "$.InputStreamReader", "java.lang.ClassLoader", "$.IllegalArgumentException", "$.NullPointerException", "$.StringBuilder", "$.Thread", "java.lang.ref.SoftReference", "java.net.URL", "java.security.AccessController", "$.PrivilegedAction", "java.util.ArrayList", "$.LinkedList", "java.awt.datatransfer.DataFlavor", "$.MimeType", "sun.awt.datatransfer.DataTransferer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nativeToFlavor = null;
this.flavorToNative = null;
this.getNativesForFlavorCache = null;
this.getFlavorsForNativeCache = null;
this.disabledMappingGenerationKeys = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "SystemFlavorMap", null, [java.awt.datatransfer.FlavorMap, java.awt.datatransfer.FlavorTable]);
Clazz.prepareFields (c$, function () {
this.nativeToFlavor =  new java.util.HashMap ();
this.flavorToNative =  new java.util.HashMap ();
this.getNativesForFlavorCache =  new java.util.HashMap ();
this.getFlavorsForNativeCache =  new java.util.HashMap ();
this.disabledMappingGenerationKeys =  new java.util.HashSet ();
});
c$.getDefaultFlavorMap = Clazz.defineMethod (c$, "getDefaultFlavorMap", 
function () {
var contextClassLoader = Thread.currentThread ().getContextClassLoader ();
if (contextClassLoader == null) {
contextClassLoader = ClassLoader.getSystemClassLoader ();
}var fm;
{
fm = java.awt.datatransfer.SystemFlavorMap.flavorMaps.get (contextClassLoader);
if (fm == null) {
fm =  new java.awt.datatransfer.SystemFlavorMap ();
java.awt.datatransfer.SystemFlavorMap.flavorMaps.put (contextClassLoader, fm);
}}return fm;
});
Clazz.makeConstructor (c$, 
 function () {
var flavormapDotProperties = java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("java.awt.datatransfer.SystemFlavorMap$1") ? 0 : java.awt.datatransfer.SystemFlavorMap.$SystemFlavorMap$1$ ()), Clazz.innerTypeInstance (java.awt.datatransfer.SystemFlavorMap$1, this, null)));
var flavormapURL = java.security.AccessController.doPrivileged (((Clazz.isClassDefined ("java.awt.datatransfer.SystemFlavorMap$2") ? 0 : java.awt.datatransfer.SystemFlavorMap.$SystemFlavorMap$2$ ()), Clazz.innerTypeInstance (java.awt.datatransfer.SystemFlavorMap$2, this, null)));
if (flavormapDotProperties != null) {
try {
this.parseAndStoreReader (flavormapDotProperties);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.err.println ("IOException:" + e + " while parsing default flavormap.properties file");
} else {
throw e;
}
}
}if (flavormapURL != null) {
try {
this.parseAndStoreReader (flavormapURL);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.err.println ("IOException:" + e + " while parsing AWT.DnD.flavorMapFileURL");
} else {
throw e;
}
}
}});
Clazz.defineMethod (c$, "parseAndStoreReader", 
 function ($in) {
while (true) {
var line = $in.readLine ();
if (line == null) {
return;
}if (line.length > 0) {
var firstChar = line.charAt (0);
if (firstChar != '#' && firstChar != '!') {
while (this.continueLine (line)) {
var nextLine = $in.readLine ();
if (nextLine == null) {
nextLine =  String.instantialize ("");
}var loppedLine = line.substring (0, line.length - 1);
var startIndex = 0;
for (; startIndex < nextLine.length; startIndex++) {
if (" \t\r\n\f".indexOf (nextLine.charAt (startIndex)) == -1) {
break;
}}
nextLine = nextLine.substring (startIndex, nextLine.length);
line =  String.instantialize (loppedLine + nextLine);
}
var len = line.length;
var keyStart = 0;
for (; keyStart < len; keyStart++) {
if (" \t\r\n\f".indexOf (line.charAt (keyStart)) == -1) {
break;
}}
if (keyStart == len) {
continue;
}var separatorIndex = keyStart;
for (; separatorIndex < len; separatorIndex++) {
var currentChar = line.charAt (separatorIndex);
if (currentChar == '\\') {
separatorIndex++;
} else if ("=: \t\r\n\f".indexOf (currentChar) != -1) {
break;
}}
var valueIndex = separatorIndex;
for (; valueIndex < len; valueIndex++) {
if (" \t\r\n\f".indexOf (line.charAt (valueIndex)) == -1) {
break;
}}
if (valueIndex < len) {
if ("=:".indexOf (line.charAt (valueIndex)) != -1) {
valueIndex++;
}}while (valueIndex < len) {
if (" \t\r\n\f".indexOf (line.charAt (valueIndex)) == -1) {
break;
}valueIndex++;
}
var key = line.substring (keyStart, separatorIndex);
var value = (separatorIndex < len) ? line.substring (valueIndex, len) : "";
key = this.loadConvert (key);
value = this.loadConvert (value);
try {
var mime =  new java.awt.datatransfer.MimeType (value);
if ("text".equals (mime.getPrimaryType ())) {
var charset = mime.getParameter ("charset");
if (sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (mime.getSubType (), charset)) {
var transferer = sun.awt.datatransfer.DataTransferer.getInstance ();
if (transferer != null) {
transferer.registerTextFlavorProperties (key, charset, mime.getParameter ("eoln"), mime.getParameter ("terminators"));
}}mime.removeParameter ("charset");
mime.removeParameter ("class");
mime.removeParameter ("eoln");
mime.removeParameter ("terminators");
value = mime.toString ();
}} catch (e) {
if (Clazz.exceptionOf (e, java.awt.datatransfer.MimeTypeParseException)) {
e.printStackTrace ();
continue;
} else {
throw e;
}
}
var flavor;
try {
flavor =  new java.awt.datatransfer.DataFlavor (value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
flavor =  new java.awt.datatransfer.DataFlavor (value, Clazz.castNullAs ("String"));
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
continue;
} else {
throw ee;
}
}
} else {
throw e;
}
}
if ("text".equals (flavor.getPrimaryType ())) {
this.store (value, key, this.flavorToNative);
this.store (key, value, this.nativeToFlavor);
} else {
this.store (flavor, key, this.flavorToNative);
this.store (key, flavor, this.nativeToFlavor);
}}}}
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "continueLine", 
 function (line) {
var slashCount = 0;
var index = line.length - 1;
while ((index >= 0) && (line.charAt (index--) == '\\')) {
slashCount++;
}
return (slashCount % 2 == 1);
}, "~S");
Clazz.defineMethod (c$, "loadConvert", 
 function (theString) {
var aChar;
var len = theString.length;
var outBuffer =  new StringBuilder (len);
for (var x = 0; x < len; ) {
aChar = theString.charAt (x++);
if (aChar == '\\') {
aChar = theString.charAt (x++);
if (aChar == 'u') {
var value = 0;
for (var i = 0; i < 4; i++) {
aChar = theString.charAt (x++);
switch (aChar) {
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
{
value = (value << 4) + aChar.charCodeAt (0) - 48;
break;
}case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
{
value = (value << 4) + 10 + aChar.charCodeAt (0) - 97;
break;
}case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
{
value = (value << 4) + 10 + aChar.charCodeAt (0) - 65;
break;
}default:
{
throw  new IllegalArgumentException ("Malformed \\uxxxx encoding.");
}}
}
outBuffer.append (String.fromCharCode (value));
} else {
if (aChar == 't') {
aChar = '\t';
} else if (aChar == 'r') {
aChar = '\r';
} else if (aChar == 'n') {
aChar = '\n';
} else if (aChar == 'f') {
aChar = '\f';
}outBuffer.append (aChar);
}} else {
outBuffer.append (aChar);
}}
return outBuffer.toString ();
}, "~S");
Clazz.defineMethod (c$, "store", 
 function (hashed, listed, map) {
var list = map.get (hashed);
if (list == null) {
list =  new java.util.ArrayList (1);
map.put (hashed, list);
}if (!list.contains (listed)) {
list.add (listed);
}}, "~O,~O,java.util.Map");
Clazz.defineMethod (c$, "nativeToFlavorLookup", 
 function (nat) {
var flavors = this.nativeToFlavor.get (nat);
if (nat != null && !this.disabledMappingGenerationKeys.contains (nat)) {
var transferer = sun.awt.datatransfer.DataTransferer.getInstance ();
if (transferer != null) {
var platformFlavors = transferer.getPlatformMappingsForNative (nat);
if (!platformFlavors.isEmpty ()) {
if (flavors != null) {
platformFlavors.removeAll ( new java.util.HashSet (flavors));
platformFlavors.addAll (flavors);
}flavors = platformFlavors;
}}}if (flavors == null && java.awt.datatransfer.SystemFlavorMap.isJavaMIMEType (nat)) {
var decoded = java.awt.datatransfer.SystemFlavorMap.decodeJavaMIMEType (nat);
var flavor = null;
try {
flavor =  new java.awt.datatransfer.DataFlavor (decoded);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception \"" + e.getClass ().getName () + ": " + e.getMessage () + "\"while constructing DataFlavor for: " + decoded);
} else {
throw e;
}
}
if (flavor != null) {
flavors =  new java.util.ArrayList (1);
this.nativeToFlavor.put (nat, flavors);
flavors.add (flavor);
this.getFlavorsForNativeCache.remove (nat);
this.getFlavorsForNativeCache.remove (null);
var natives = this.flavorToNative.get (flavor);
if (natives == null) {
natives =  new java.util.ArrayList (1);
this.flavorToNative.put (flavor, natives);
}natives.add (nat);
this.getNativesForFlavorCache.remove (flavor);
this.getNativesForFlavorCache.remove (null);
}}return (flavors != null) ? flavors :  new java.util.ArrayList (0);
}, "~S");
Clazz.defineMethod (c$, "flavorToNativeLookup", 
 function (flav, synthesize) {
var natives = this.flavorToNative.get (flav);
if (flav != null && !this.disabledMappingGenerationKeys.contains (flav)) {
var transferer = sun.awt.datatransfer.DataTransferer.getInstance ();
if (transferer != null) {
var platformNatives = transferer.getPlatformMappingsForFlavor (flav);
if (!platformNatives.isEmpty ()) {
if (natives != null) {
platformNatives.removeAll ( new java.util.HashSet (natives));
platformNatives.addAll (natives);
}natives = platformNatives;
}}}if (natives == null) {
if (synthesize) {
var encoded = java.awt.datatransfer.SystemFlavorMap.encodeDataFlavor (flav);
natives =  new java.util.ArrayList (1);
this.flavorToNative.put (flav, natives);
natives.add (encoded);
this.getNativesForFlavorCache.remove (flav);
this.getNativesForFlavorCache.remove (null);
var flavors = this.nativeToFlavor.get (encoded);
if (flavors == null) {
flavors =  new java.util.ArrayList (1);
this.nativeToFlavor.put (encoded, flavors);
}flavors.add (flav);
this.getFlavorsForNativeCache.remove (encoded);
this.getFlavorsForNativeCache.remove (null);
} else {
natives =  new java.util.ArrayList (0);
}}return natives;
}, "java.awt.datatransfer.DataFlavor,~B");
Clazz.overrideMethod (c$, "getNativesForFlavor", 
function (flav) {
var retval = null;
var ref = this.getNativesForFlavorCache.get (flav);
if (ref != null) {
retval = ref.get ();
if (retval != null) {
return  new java.util.ArrayList (retval);
}}if (flav == null) {
retval =  new java.util.ArrayList (this.nativeToFlavor.keySet ());
} else if (this.disabledMappingGenerationKeys.contains (flav)) {
retval = this.flavorToNativeLookup (flav, false);
} else if (sun.awt.datatransfer.DataTransferer.isFlavorCharsetTextType (flav)) {
if ("text".equals (flav.getPrimaryType ())) {
retval = this.flavorToNative.get (flav.mimeType.getBaseType ());
if (retval != null) {
retval =  new java.util.ArrayList (retval);
}}var textPlainList = this.flavorToNative.get ("text/plain");
if (textPlainList != null && !textPlainList.isEmpty ()) {
textPlainList =  new java.util.ArrayList (textPlainList);
if (retval != null && !retval.isEmpty ()) {
textPlainList.removeAll ( new java.util.HashSet (retval));
retval.addAll (textPlainList);
} else {
retval = textPlainList;
}}if (retval == null || retval.isEmpty ()) {
retval = this.flavorToNativeLookup (flav, true);
} else {
var explicitList = this.flavorToNativeLookup (flav, false);
if (!explicitList.isEmpty ()) {
explicitList =  new java.util.ArrayList (explicitList);
explicitList.removeAll ( new java.util.HashSet (retval));
retval.addAll (explicitList);
}}} else if (sun.awt.datatransfer.DataTransferer.isFlavorNoncharsetTextType (flav)) {
retval = this.flavorToNative.get (flav.mimeType.getBaseType ());
if (retval == null || retval.isEmpty ()) {
retval = this.flavorToNativeLookup (flav, true);
} else {
var explicitList = this.flavorToNativeLookup (flav, false);
if (!explicitList.isEmpty ()) {
retval =  new java.util.ArrayList (retval);
explicitList =  new java.util.ArrayList (explicitList);
explicitList.removeAll ( new java.util.HashSet (retval));
retval.addAll (explicitList);
}}} else {
retval = this.flavorToNativeLookup (flav, true);
}this.getNativesForFlavorCache.put (flav,  new java.lang.ref.SoftReference (retval));
return  new java.util.ArrayList (retval);
}, "java.awt.datatransfer.DataFlavor");
Clazz.overrideMethod (c$, "getFlavorsForNative", 
function (nat) {
var ref = this.getFlavorsForNativeCache.get (nat);
if (ref != null) {
var retval = ref.get ();
if (retval != null) {
return retval.clone ();
}}var retval =  new java.util.LinkedList ();
if (nat == null) {
var natives = this.getNativesForFlavor (null);
var dups =  new java.util.HashSet (natives.size ());
for (var natives_iter = natives.iterator (); natives_iter.hasNext (); ) {
var flavors = this.getFlavorsForNative (natives_iter.next ());
for (var flavors_iter = flavors.iterator (); flavors_iter.hasNext (); ) {
var flavor = flavors_iter.next ();
if (dups.add (flavor)) {
retval.add (flavor);
}}
}
} else {
var flavors = this.nativeToFlavorLookup (nat);
if (this.disabledMappingGenerationKeys.contains (nat)) {
return flavors;
}var dups =  new java.util.HashSet (flavors.size ());
var flavorsAndbaseTypes = this.nativeToFlavorLookup (nat);
for (var flavorsAndbaseTypes_iter = flavorsAndbaseTypes.iterator (); flavorsAndbaseTypes_iter.hasNext (); ) {
var value = flavorsAndbaseTypes_iter.next ();
if (Clazz.instanceOf (value, String)) {
var baseType = value;
var subType = null;
try {
var mimeType =  new java.awt.datatransfer.MimeType (baseType);
subType = mimeType.getSubType ();
} catch (mtpe) {
if (Clazz.exceptionOf (mtpe, java.awt.datatransfer.MimeTypeParseException)) {
} else {
throw mtpe;
}
}
if (sun.awt.datatransfer.DataTransferer.doesSubtypeSupportCharset (subType, null)) {
if ("text/plain".equals (baseType) && dups.add (java.awt.datatransfer.DataFlavor.stringFlavor)) {
retval.add (java.awt.datatransfer.DataFlavor.stringFlavor);
}for (var i = 0; i < java.awt.datatransfer.SystemFlavorMap.UNICODE_TEXT_CLASSES.length; i++) {
var toAdd = null;
try {
toAdd =  new java.awt.datatransfer.DataFlavor (baseType + ";charset=Unicode;class=" + java.awt.datatransfer.SystemFlavorMap.UNICODE_TEXT_CLASSES[i]);
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
if (dups.add (toAdd)) {
retval.add (toAdd);
}}
for (var charset_iter = sun.awt.datatransfer.DataTransferer.standardEncodings (); charset_iter.hasNext (); ) {
var charset = charset_iter.next ();
for (var i = 0; i < java.awt.datatransfer.SystemFlavorMap.ENCODED_TEXT_CLASSES.length; i++) {
var toAdd = null;
try {
toAdd =  new java.awt.datatransfer.DataFlavor (baseType + ";charset=" + charset + ";class=" + java.awt.datatransfer.SystemFlavorMap.ENCODED_TEXT_CLASSES[i]);
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
if (toAdd.equals (java.awt.datatransfer.DataFlavor.plainTextFlavor)) {
toAdd = java.awt.datatransfer.DataFlavor.plainTextFlavor;
}if (dups.add (toAdd)) {
retval.add (toAdd);
}}
}
if ("text/plain".equals (baseType) && dups.add (java.awt.datatransfer.DataFlavor.plainTextFlavor)) {
retval.add (java.awt.datatransfer.DataFlavor.plainTextFlavor);
}} else {
for (var i = 0; i < java.awt.datatransfer.SystemFlavorMap.ENCODED_TEXT_CLASSES.length; i++) {
var toAdd = null;
try {
toAdd =  new java.awt.datatransfer.DataFlavor (baseType + ";class=" + java.awt.datatransfer.SystemFlavorMap.ENCODED_TEXT_CLASSES[i]);
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, ClassNotFoundException)) {
} else {
throw cannotHappen;
}
}
if (dups.add (toAdd)) {
retval.add (toAdd);
}}
}} else {
var flavor = value;
if (dups.add (flavor)) {
retval.add (flavor);
}}}
}var arrayList =  new java.util.ArrayList (retval);
this.getFlavorsForNativeCache.put (nat,  new java.lang.ref.SoftReference (arrayList));
return arrayList.clone ();
}, "~S");
Clazz.overrideMethod (c$, "getNativesForFlavors", 
function (flavors) {
if (flavors == null) {
var flavor_list = this.getFlavorsForNative (null);
flavors =  new Array (flavor_list.size ());
flavor_list.toArray (flavors);
}var retval =  new java.util.HashMap (flavors.length, 1.0);
for (var i = 0; i < flavors.length; i++) {
var natives = this.getNativesForFlavor (flavors[i]);
var nat = (natives.isEmpty ()) ? null : natives.get (0);
retval.put (flavors[i], nat);
}
return retval;
}, "~A");
Clazz.overrideMethod (c$, "getFlavorsForNatives", 
function (natives) {
if (natives == null) {
var native_list = this.getNativesForFlavor (null);
natives =  new Array (native_list.size ());
native_list.toArray (natives);
}var retval =  new java.util.HashMap (natives.length, 1.0);
for (var i = 0; i < natives.length; i++) {
var flavors = this.getFlavorsForNative (natives[i]);
var flav = (flavors.isEmpty ()) ? null : flavors.get (0);
retval.put (natives[i], flav);
}
return retval;
}, "~A");
Clazz.defineMethod (c$, "addUnencodedNativeForFlavor", 
function (flav, nat) {
if (flav == null || nat == null) {
throw  new NullPointerException ("null arguments not permitted");
}var natives = this.flavorToNative.get (flav);
if (natives == null) {
natives =  new java.util.ArrayList (1);
this.flavorToNative.put (flav, natives);
} else if (natives.contains (nat)) {
return;
}natives.add (nat);
this.getNativesForFlavorCache.remove (flav);
this.getNativesForFlavorCache.remove (null);
}, "java.awt.datatransfer.DataFlavor,~S");
Clazz.defineMethod (c$, "setNativesForFlavor", 
function (flav, natives) {
if (flav == null || natives == null) {
throw  new NullPointerException ("null arguments not permitted");
}this.flavorToNative.remove (flav);
for (var i = 0; i < natives.length; i++) {
this.addUnencodedNativeForFlavor (flav, natives[i]);
}
this.disabledMappingGenerationKeys.add (flav);
this.getNativesForFlavorCache.remove (flav);
this.getNativesForFlavorCache.remove (null);
}, "java.awt.datatransfer.DataFlavor,~A");
Clazz.defineMethod (c$, "addFlavorForUnencodedNative", 
function (nat, flav) {
if (nat == null || flav == null) {
throw  new NullPointerException ("null arguments not permitted");
}var flavors = this.nativeToFlavor.get (nat);
if (flavors == null) {
flavors =  new java.util.ArrayList (1);
this.nativeToFlavor.put (nat, flavors);
} else if (flavors.contains (flav)) {
return;
}flavors.add (flav);
this.getFlavorsForNativeCache.remove (nat);
this.getFlavorsForNativeCache.remove (null);
}, "~S,java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "setFlavorsForNative", 
function (nat, flavors) {
if (nat == null || flavors == null) {
throw  new NullPointerException ("null arguments not permitted");
}this.nativeToFlavor.remove (nat);
for (var i = 0; i < flavors.length; i++) {
this.addFlavorForUnencodedNative (nat, flavors[i]);
}
this.disabledMappingGenerationKeys.add (nat);
this.getFlavorsForNativeCache.remove (nat);
this.getFlavorsForNativeCache.remove (null);
}, "~S,~A");
c$.encodeJavaMIMEType = Clazz.defineMethod (c$, "encodeJavaMIMEType", 
function (mimeType) {
return (mimeType != null) ? java.awt.datatransfer.SystemFlavorMap.JavaMIME + mimeType : null;
}, "~S");
c$.encodeDataFlavor = Clazz.defineMethod (c$, "encodeDataFlavor", 
function (flav) {
return (flav != null) ? java.awt.datatransfer.SystemFlavorMap.encodeJavaMIMEType (flav.getMimeType ()) : null;
}, "java.awt.datatransfer.DataFlavor");
c$.isJavaMIMEType = Clazz.defineMethod (c$, "isJavaMIMEType", 
function (str) {
return (str != null && str.startsWith (java.awt.datatransfer.SystemFlavorMap.JavaMIME, 0));
}, "~S");
c$.decodeJavaMIMEType = Clazz.defineMethod (c$, "decodeJavaMIMEType", 
function (nat) {
return (java.awt.datatransfer.SystemFlavorMap.isJavaMIMEType (nat)) ? nat.substring (java.awt.datatransfer.SystemFlavorMap.JavaMIME.length, nat.length).trim () : null;
}, "~S");
c$.decodeDataFlavor = Clazz.defineMethod (c$, "decodeDataFlavor", 
function (nat) {
var retval_str = java.awt.datatransfer.SystemFlavorMap.decodeJavaMIMEType (nat);
return (retval_str != null) ?  new java.awt.datatransfer.DataFlavor (retval_str) : null;
}, "~S");
c$.$SystemFlavorMap$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.datatransfer, "SystemFlavorMap$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var fileName = System.getProperty ("java.home") + java.io.File.separator + "lib" + java.io.File.separator + "flavormap.properties";
try {
return  new java.io.BufferedReader ( new java.io.InputStreamReader ( new java.io.File (fileName).toURI ().toURL ().openStream (), "ISO-8859-1"));
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
System.err.println ("MalformedURLException:" + e + " while loading default flavormap.properties file:" + fileName);
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
System.err.println ("IOException:" + e + " while loading default flavormap.properties file:" + fileName);
}
} else {
throw e$$;
}
}
return null;
});
c$ = Clazz.p0p ();
};
c$.$SystemFlavorMap$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.datatransfer, "SystemFlavorMap$2", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var url = java.awt.Toolkit.getDefaultToolkit ().getProperty ("AWT.DnD.flavorMapFileURL", null);
if (url == null) {
return null;
}try {
return  new java.io.BufferedReader ( new java.io.InputStreamReader ( new java.net.URL (url).openStream (), "ISO-8859-1"));
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
System.err.println ("MalformedURLException:" + e + " while reading AWT.DnD.flavorMapFileURL:" + url);
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
System.err.println ("IOException:" + e + " while reading AWT.DnD.flavorMapFileURL:" + url);
}
} else {
throw e$$;
}
}
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"JavaMIME", "JAVA_DATAFLAVOR:");
c$.flavorMaps = c$.prototype.flavorMaps =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"keyValueSeparators", "=: \t\r\n\f",
"strictKeyValueSeparators", "=:",
"whiteSpaceChars", " \t\r\n\f",
"UNICODE_TEXT_CLASSES",  Clazz.newArray (-1, ["java.io.Reader", "java.lang.String", "java.nio.CharBuffer", "\"[C\""]),
"ENCODED_TEXT_CLASSES",  Clazz.newArray (-1, ["java.io.InputStream", "java.nio.ByteBuffer", "\"[B\""]),
"TEXT_PLAIN_BASE_TYPE", "text/plain",
"SYNTHESIZE_IF_NOT_FOUND", true);
});
