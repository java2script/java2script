Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (null, "java.awt.datatransfer.MimeType", ["java.awt.datatransfer.MimeTypeParameterList", "$.MimeTypeParseException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.primaryType = null;
this.subType = null;
this.parameters = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "MimeType", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (rawdata) {
this.parse (rawdata);
}, "~S");
Clazz.makeConstructor (c$, 
function (primary, sub) {
this.construct (primary, sub,  new java.awt.datatransfer.MimeTypeParameterList ());
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (primary, sub, mtpl) {
if (this.isValidToken (primary)) {
this.primaryType = primary.toLowerCase ();
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Primary type is invalid.");
}if (this.isValidToken (sub)) {
this.subType = sub.toLowerCase ();
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Sub type is invalid.");
}this.parameters = mtpl.clone ();
}, "~S,~S,java.awt.datatransfer.MimeTypeParameterList");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var code = 0;
code += this.primaryType.hashCode ();
code += this.subType.hashCode ();
code += this.parameters.hashCode ();
return code;
});
Clazz.overrideMethod (c$, "equals", 
function (thatObject) {
if (!(Clazz.instanceOf (thatObject, java.awt.datatransfer.MimeType))) {
return false;
}var that = thatObject;
var isIt = ((this.primaryType.equals (that.primaryType)) && (this.subType.equals (that.subType)) && (this.parameters.equals (that.parameters)));
return isIt;
}, "~O");
Clazz.defineMethod (c$, "parse", 
 function (rawdata) {
var slashIndex = rawdata.indexOf ('/');
var semIndex = rawdata.indexOf (';');
if ((slashIndex < 0) && (semIndex < 0)) {
throw  new java.awt.datatransfer.MimeTypeParseException ("Unable to find a sub type.");
} else if ((slashIndex < 0) && (semIndex >= 0)) {
throw  new java.awt.datatransfer.MimeTypeParseException ("Unable to find a sub type.");
} else if ((slashIndex >= 0) && (semIndex < 0)) {
this.primaryType = rawdata.substring (0, slashIndex).trim ().toLowerCase ();
this.subType = rawdata.substring (slashIndex + 1).trim ().toLowerCase ();
this.parameters =  new java.awt.datatransfer.MimeTypeParameterList ();
} else if (slashIndex < semIndex) {
this.primaryType = rawdata.substring (0, slashIndex).trim ().toLowerCase ();
this.subType = rawdata.substring (slashIndex + 1, semIndex).trim ().toLowerCase ();
this.parameters =  new java.awt.datatransfer.MimeTypeParameterList (rawdata.substring (semIndex));
} else {
throw  new java.awt.datatransfer.MimeTypeParseException ("Unable to find a sub type.");
}if (!this.isValidToken (this.primaryType)) {
throw  new java.awt.datatransfer.MimeTypeParseException ("Primary type is invalid.");
}if (!this.isValidToken (this.subType)) {
throw  new java.awt.datatransfer.MimeTypeParseException ("Sub type is invalid.");
}}, "~S");
Clazz.defineMethod (c$, "getPrimaryType", 
function () {
return this.primaryType;
});
Clazz.defineMethod (c$, "getSubType", 
function () {
return this.subType;
});
Clazz.defineMethod (c$, "getParameters", 
function () {
return this.parameters.clone ();
});
Clazz.defineMethod (c$, "getParameter", 
function (name) {
return this.parameters.get (name);
}, "~S");
Clazz.defineMethod (c$, "setParameter", 
function (name, value) {
this.parameters.set (name, value);
}, "~S,~S");
Clazz.defineMethod (c$, "removeParameter", 
function (name) {
this.parameters.remove (name);
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getBaseType () + this.parameters.toString ();
});
Clazz.defineMethod (c$, "getBaseType", 
function () {
return this.primaryType + "/" + this.subType;
});
Clazz.defineMethod (c$, "match", 
function (type) {
if (type == null) return false;
return this.primaryType.equals (type.getPrimaryType ()) && (this.subType.equals ("*") || type.getSubType ().equals ("*") || (this.subType.equals (type.getSubType ())));
}, "java.awt.datatransfer.MimeType");
Clazz.defineMethod (c$, "match", 
function (rawdata) {
if (rawdata == null) return false;
return this.match ( new java.awt.datatransfer.MimeType (rawdata));
}, "~S");
Clazz.defineMethod (c$, "clone", 
function () {
var newObj = null;
try {
newObj = Clazz.superCall (this, java.awt.datatransfer.MimeType, "clone", []);
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
Clazz.defineMethod (c$, "isValidToken", 
 function (s) {
var len = s.length;
if (len > 0) {
for (var i = 0; i < len; ++i) {
var c = s.charAt (i);
if (!java.awt.datatransfer.MimeType.isTokenChar (c)) {
return false;
}}
return true;
} else {
return false;
}}, "~S");
Clazz.defineStatics (c$,
"TSPECIALS", "()<>@,;:\\\"/[]?=");
});
