Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (null, "java.awt.datatransfer.MimeTypeParameterList", ["java.lang.Character", "$.StringBuilder", "java.util.Hashtable", "java.awt.datatransfer.MimeTypeParseException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parameters = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "MimeTypeParameterList", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.parameters =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (rawdata) {
this.parameters =  new java.util.Hashtable ();
this.parse (rawdata);
}, "~S");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var code = 47721858;
var paramName = null;
var enum_ = this.getNames ();
while (enum_.hasMoreElements ()) {
paramName = enum_.nextElement ();
code += paramName.hashCode ();
code += this.get (paramName).hashCode ();
}
return code;
});
Clazz.overrideMethod (c$, "equals", 
function (thatObject) {
if (!(Clazz.instanceOf (thatObject, java.awt.datatransfer.MimeTypeParameterList))) {
return false;
}var that = thatObject;
if (this.size () != that.size ()) {
return false;
}var name = null;
var thisValue = null;
var thatValue = null;
var entries = this.parameters.entrySet ();
var iterator = entries.iterator ();
var entry = null;
while (iterator.hasNext ()) {
entry = iterator.next ();
name = entry.getKey ();
thisValue = entry.getValue ();
thatValue = that.parameters.get (name);
if ((thisValue == null) || (thatValue == null)) {
if (thisValue !== thatValue) {
return false;
}} else if (!thisValue.equals (thatValue)) {
return false;
}}
return true;
}, "~O");
Clazz.defineMethod (c$, "parse", 
function (rawdata) {
var length = rawdata.length;
if (length > 0) {
var currentIndex = java.awt.datatransfer.MimeTypeParameterList.skipWhiteSpace (rawdata, 0);
var lastIndex = 0;
if (currentIndex < length) {
var currentChar = rawdata.charAt (currentIndex);
while ((currentIndex < length) && (currentChar == ';')) {
var name;
var value;
var foundit;
++currentIndex;
currentIndex = java.awt.datatransfer.MimeTypeParameterList.skipWhiteSpace (rawdata, currentIndex);
if (currentIndex < length) {
lastIndex = currentIndex;
currentChar = rawdata.charAt (currentIndex);
while ((currentIndex < length) && java.awt.datatransfer.MimeTypeParameterList.isTokenChar (currentChar)) {
++currentIndex;
currentChar = rawdata.charAt (currentIndex);
}
name = rawdata.substring (lastIndex, currentIndex).toLowerCase ();
currentIndex = java.awt.datatransfer.MimeTypeParameterList.skipWhiteSpace (rawdata, currentIndex);
if ((currentIndex < length) && (rawdata.charAt (currentIndex) == '=')) {
++currentIndex;
currentIndex = java.awt.datatransfer.MimeTypeParameterList.skipWhiteSpace (rawdata, currentIndex);
if (currentIndex < length) {
currentChar = rawdata.charAt (currentIndex);
if (currentChar == '"') {
++currentIndex;
lastIndex = currentIndex;
if (currentIndex < length) {
foundit = false;
while ((currentIndex < length) && !foundit) {
currentChar = rawdata.charAt (currentIndex);
if (currentChar == '\\') {
currentIndex += 2;
} else if (currentChar == '"') {
foundit = true;
} else {
++currentIndex;
}}
if (currentChar == '"') {
value = java.awt.datatransfer.MimeTypeParameterList.unquote (rawdata.substring (lastIndex, currentIndex));
++currentIndex;
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Encountered unterminated quoted parameter value.");
}} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Encountered unterminated quoted parameter value.");
}} else if (java.awt.datatransfer.MimeTypeParameterList.isTokenChar (currentChar)) {
lastIndex = currentIndex;
foundit = false;
while ((currentIndex < length) && !foundit) {
currentChar = rawdata.charAt (currentIndex);
if (java.awt.datatransfer.MimeTypeParameterList.isTokenChar (currentChar)) {
++currentIndex;
} else {
foundit = true;
}}
value = rawdata.substring (lastIndex, currentIndex);
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Unexpected character encountered at index " + currentIndex);
}this.parameters.put (name, value);
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Couldn't find a value for parameter named " + name);
}} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Couldn't find the '=' that separates a parameter name from its value.");
}} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Couldn't find parameter name");
}currentIndex = java.awt.datatransfer.MimeTypeParameterList.skipWhiteSpace (rawdata, currentIndex);
if (currentIndex < length) {
currentChar = rawdata.charAt (currentIndex);
}}
if (currentIndex < length) {
throw  new java.awt.datatransfer.MimeTypeParseException ("More characters encountered in input than expected.");
}}}}, "~S");
Clazz.defineMethod (c$, "size", 
function () {
return this.parameters.size ();
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.parameters.isEmpty ();
});
Clazz.defineMethod (c$, "get", 
function (name) {
return this.parameters.get (name.trim ().toLowerCase ());
}, "~S");
Clazz.defineMethod (c$, "set", 
function (name, value) {
this.parameters.put (name.trim ().toLowerCase (), value);
}, "~S,~S");
Clazz.defineMethod (c$, "remove", 
function (name) {
this.parameters.remove (name.trim ().toLowerCase ());
}, "~S");
Clazz.defineMethod (c$, "getNames", 
function () {
return this.parameters.keys ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuilder (this.parameters.size () * 16);
var keys = this.parameters.keys ();
while (keys.hasMoreElements ()) {
buffer.append ("; ");
var key = keys.nextElement ();
buffer.append (key);
buffer.append ('=');
buffer.append (java.awt.datatransfer.MimeTypeParameterList.quote (this.parameters.get (key)));
}
return buffer.toString ();
});
Clazz.defineMethod (c$, "clone", 
function () {
var newObj = null;
try {
newObj = Clazz.superCall (this, java.awt.datatransfer.MimeTypeParameterList, "clone", []);
} catch (cannotHappen) {
if (Clazz.exceptionOf (cannotHappen, CloneNotSupportedException)) {
} else {
throw cannotHappen;
}
}
newObj.parameters = this.parameters.clone ();
return newObj;
});
c$.isTokenChar = Clazz.defineMethod (c$, "isTokenChar", 
 function (c) {
return ((c.charCodeAt (0) > 040) && (c.charCodeAt (0) < 0177)) && ("()<>@,;:\\\"/[]?=".indexOf (c) < 0);
}, "~S");
c$.skipWhiteSpace = Clazz.defineMethod (c$, "skipWhiteSpace", 
 function (rawdata, i) {
var length = rawdata.length;
if (i < length) {
var c = rawdata.charAt (i);
while ((i < length) && Character.isWhitespace (c)) {
++i;
c = rawdata.charAt (i);
}
}return i;
}, "~S,~N");
c$.quote = Clazz.defineMethod (c$, "quote", 
 function (value) {
var needsQuotes = false;
var length = value.length;
for (var i = 0; (i < length) && !needsQuotes; ++i) {
needsQuotes = !java.awt.datatransfer.MimeTypeParameterList.isTokenChar (value.charAt (i));
}
if (needsQuotes) {
var buffer =  new StringBuilder (Clazz.doubleToInt (length * 1.5));
buffer.append ('"');
for (var i = 0; i < length; ++i) {
var c = value.charAt (i);
if ((c == '\\') || (c == '"')) {
buffer.append ('\\');
}buffer.append (c);
}
buffer.append ('"');
return buffer.toString ();
} else {
return value;
}}, "~S");
c$.unquote = Clazz.defineMethod (c$, "unquote", 
 function (value) {
var valueLength = value.length;
var buffer =  new StringBuilder (valueLength);
var escaped = false;
for (var i = 0; i < valueLength; ++i) {
var currentChar = value.charAt (i);
if (!escaped && (currentChar != '\\')) {
buffer.append (currentChar);
} else if (escaped) {
buffer.append (currentChar);
escaped = false;
} else {
escaped = true;
}}
return buffer.toString ();
}, "~S");
Clazz.defineStatics (c$,
"TSPECIALS", "()<>@,;:\\\"/[]?=");
});
