Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (null, "org.eclipse.jface.resource.StringConverter", ["java.lang.Character", "$.Double", "$.Float", "$.Long", "$.StringBuffer", "java.util.ArrayList", "$.StringTokenizer", "org.eclipse.jface.resource.DataFormatException", "$.JFaceResources", "org.eclipse.jface.util.Assert", "$wt.graphics.FontData", "$.Point", "$.RGB", "$.Rectangle"], function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "StringConverter");
c$.asArray = Clazz.defineMethod (c$, "asArray", 
function (value) {
var list =  new java.util.ArrayList ();
var stok =  new java.util.StringTokenizer (value);
while (stok.hasMoreTokens ()) {
list.add (stok.nextToken ());
}
var result =  new Array (list.size ());
list.toArray (result);
return result;
}, "~S");
c$.asArray = Clazz.defineMethod (c$, "asArray", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asArray (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~A");
c$.asBoolean = Clazz.defineMethod (c$, "asBoolean", 
function (value) {
var v = value.toLowerCase ();
if (v.equals ("t") || v.equals ("true")) return true;
if (value.equals ("f") || v.equals ("false")) return false;
throw  new org.eclipse.jface.resource.DataFormatException ("Value " + value + "doesn't represent a boolean");
}, "~S");
c$.asBoolean = Clazz.defineMethod (c$, "asBoolean", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asBoolean (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~B");
c$.asDouble = Clazz.defineMethod (c$, "asDouble", 
function (value) {
try {
return (Double.$valueOf (value)).doubleValue ();
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.asDouble = Clazz.defineMethod (c$, "asDouble", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asDouble (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~N");
c$.asFloat = Clazz.defineMethod (c$, "asFloat", 
function (value) {
try {
return (Float.$valueOf (value)).floatValue ();
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.asFloat = Clazz.defineMethod (c$, "asFloat", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asFloat (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~N");
c$.asFontData = Clazz.defineMethod (c$, "asFontData", 
function (value) {
if (value == null) throw  new org.eclipse.jface.resource.DataFormatException ("Null doesn't represent a valid font data");
var name = null;
var height = 0;
var style = 0;
try {
var length = value.length;
var heightIndex = value.lastIndexOf ('-');
if (heightIndex == -1) throw  new org.eclipse.jface.resource.DataFormatException ("No correct font data format \"" + value + "\"");
height = org.eclipse.jface.resource.StringConverter.asInt (value.substring (heightIndex + 1, length));
var faceIndex = value.lastIndexOf ('-', heightIndex - 1);
if (faceIndex == -1) throw  new org.eclipse.jface.resource.DataFormatException ("No correct font data format \"" + value + "\"");
var s = value.substring (faceIndex + 1, heightIndex);
if ("bold italic".equals (s)) {
style = 3;
} else if ("bold".equals (s)) {
style = 1;
} else if ("italic".equals (s)) {
style = 2;
} else if ("regular".equals (s)) {
style = 0;
} else {
throw  new org.eclipse.jface.resource.DataFormatException ("Unknown face name \"" + s + "\"");
}name = value.substring (0, faceIndex);
} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
return  new $wt.graphics.FontData (name, height, style);
}, "~S");
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
($fz = function (prop, separator) {
if (prop == null || prop.trim ().equals ("")) return  new Array (0);
var list =  new java.util.ArrayList ();
var tokens =  new java.util.StringTokenizer (prop, separator);
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.add (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.asFontDataArray = Clazz.defineMethod (c$, "asFontDataArray", 
function (value) {
var strings = org.eclipse.jface.resource.StringConverter.getArrayFromList (value, ";");
var data =  new java.util.ArrayList (strings.length);
for (var i = 0; i < strings.length; i++) {
try {
data.add (org.eclipse.jface.resource.StringConverter.asFontData (strings[i]));
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
} else {
throw e;
}
}
}
return data.toArray ( new Array (data.size ()));
}, "~S");
c$.asFontData = Clazz.defineMethod (c$, "asFontData", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asFontData (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,$wt.graphics.FontData");
c$.asInt = Clazz.defineMethod (c$, "asInt", 
function (value) {
try {
return Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.asInt = Clazz.defineMethod (c$, "asInt", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asInt (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~N");
c$.asLong = Clazz.defineMethod (c$, "asLong", 
function (value) {
try {
return Long.parseLong (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.asLong = Clazz.defineMethod (c$, "asLong", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asLong (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,~N");
c$.asPoint = Clazz.defineMethod (c$, "asPoint", 
function (value) {
if (value == null) throw  new org.eclipse.jface.resource.DataFormatException ("Null doesn't represent a valid point");
var stok =  new java.util.StringTokenizer (value, ",");
var x = stok.nextToken ();
var y = stok.nextToken ();
var xval = 0;
var yval = 0;
try {
xval = Integer.parseInt (x);
yval = Integer.parseInt (y);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
return  new $wt.graphics.Point (xval, yval);
}, "~S");
c$.asPoint = Clazz.defineMethod (c$, "asPoint", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asPoint (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,$wt.graphics.Point");
c$.asRectangle = Clazz.defineMethod (c$, "asRectangle", 
function (value) {
if (value == null) throw  new org.eclipse.jface.resource.DataFormatException ("Null doesn't represent a valid rectangle");
var stok =  new java.util.StringTokenizer (value, ",");
var x = stok.nextToken ();
var y = stok.nextToken ();
var width = stok.nextToken ();
var height = stok.nextToken ();
var xval = 0;
var yval = 0;
var wval = 0;
var hval = 0;
try {
xval = Integer.parseInt (x);
yval = Integer.parseInt (y);
wval = Integer.parseInt (width);
hval = Integer.parseInt (height);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
return  new $wt.graphics.Rectangle (xval, yval, wval, hval);
}, "~S");
c$.asRectangle = Clazz.defineMethod (c$, "asRectangle", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asRectangle (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,$wt.graphics.Rectangle");
c$.asRGB = Clazz.defineMethod (c$, "asRGB", 
function (value) {
if (value == null) throw  new org.eclipse.jface.resource.DataFormatException ("Null doesn't represent a valid RGB");
var stok =  new java.util.StringTokenizer (value, ",");
try {
var red = stok.nextToken ();
var green = stok.nextToken ();
var blue = stok.nextToken ();
var rval = 0;
var gval = 0;
var bval = 0;
try {
rval = Integer.parseInt (red);
gval = Integer.parseInt (green);
bval = Integer.parseInt (blue);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
return  new $wt.graphics.RGB (rval, gval, bval);
} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
throw  new org.eclipse.jface.resource.DataFormatException (e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.asRGB = Clazz.defineMethod (c$, "asRGB", 
function (value, dflt) {
try {
return org.eclipse.jface.resource.StringConverter.asRGB (value);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
return dflt;
} else {
throw e;
}
}
}, "~S,$wt.graphics.RGB");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
return String.valueOf (value);
}, "~N");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
return String.valueOf (value);
}, "~N");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
return String.valueOf (value);
}, "~N");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
return String.valueOf (value);
}, "~N");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
return String.valueOf (value.booleanValue ());
}, "Boolean");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
return String.valueOf (value.doubleValue ());
}, "Double");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
return String.valueOf (value.floatValue ());
}, "Float");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
return String.valueOf (value.intValue ());
}, "Integer");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
return String.valueOf (value.longValue ());
}, "Long");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
var buffer =  new StringBuffer ();
for (var i = 0; i < value.length; i++) {
buffer.append (org.eclipse.jface.resource.StringConverter.asString (value[i]));
if (i != value.length - 1) buffer.append (";");
}
return buffer.toString ();
}, "~A");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
var buffer =  new StringBuffer ();
buffer.append (value.getName ());
buffer.append ('-');
var style = value.getStyle ();
var bold = (style & 1) == 1;
var italic = (style & 2) == 2;
if (bold && italic) {
buffer.append ("bold italic");
} else if (bold) {
buffer.append ("bold");
} else if (italic) {
buffer.append ("italic");
} else {
buffer.append ("regular");
}buffer.append ('-');
buffer.append (value.getHeight ());
return buffer.toString ();
}, "$wt.graphics.FontData");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
var buffer =  new StringBuffer ();
buffer.append (value.x);
buffer.append (',');
buffer.append (value.y);
return buffer.toString ();
}, "$wt.graphics.Point");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
var buffer =  new StringBuffer ();
buffer.append (value.x);
buffer.append (',');
buffer.append (value.y);
buffer.append (',');
buffer.append (value.width);
buffer.append (',');
buffer.append (value.height);
return buffer.toString ();
}, "$wt.graphics.Rectangle");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
var buffer =  new StringBuffer ();
buffer.append (value.red);
buffer.append (',');
buffer.append (value.green);
buffer.append (',');
buffer.append (value.blue);
return buffer.toString ();
}, "$wt.graphics.RGB");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (value) {
return String.valueOf (value);
}, "~B");
c$.removeWhiteSpaces = Clazz.defineMethod (c$, "removeWhiteSpaces", 
function (s) {
var found = false;
var wsIndex = -1;
var size = s.length;
for (var i = 0; i < size; i++) {
found = Character.isWhitespace (s.charAt (i));
if (found) {
wsIndex = i;
break;
}}
if (!found) return s;
var result =  new StringBuffer (s.substring (0, wsIndex));
for (var i = wsIndex + 1; i < size; i++) {
var ch = s.charAt (i);
if (!Character.isWhitespace (ch)) result.append (ch);
}
return result.toString ();
}, "~S");
c$.asDisplayableString = Clazz.defineMethod (c$, "asDisplayableString", 
function (value) {
org.eclipse.jface.util.Assert.isNotNull (value);
var buffer =  new StringBuffer ();
buffer.append (value.getName ());
buffer.append ('-');
var style = value.getStyle ();
var bold = (style & 1) == 1;
var italic = (style & 2) == 2;
if (bold && italic) {
buffer.append (org.eclipse.jface.resource.JFaceResources.getString ("BoldItalicFont"));
} else if (bold) {
buffer.append (org.eclipse.jface.resource.JFaceResources.getString ("BoldFont"));
} else if (italic) {
buffer.append (org.eclipse.jface.resource.JFaceResources.getString ("ItalicFont"));
} else {
buffer.append (org.eclipse.jface.resource.JFaceResources.getString ("RegularFont"));
}buffer.append ('-');
buffer.append (value.getHeight ());
return buffer.toString ();
}, "$wt.graphics.FontData");
Clazz.defineStatics (c$,
"REGULAR", "regular",
"BOLD", "bold",
"ITALIC", "italic",
"BOLD_ITALIC", "bold italic",
"SEPARATOR", '-',
"FONT_SEPARATOR", ";");
});
