Clazz.declarePackage ("org.osgi.service.condpermadmin");
Clazz.load (null, "org.osgi.service.condpermadmin.ConditionInfo", ["java.lang.Character", "$.IllegalArgumentException", "$.NullPointerException", "$.StringBuffer", "java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.args = null;
Clazz.instantialize (this, arguments);
}, org.osgi.service.condpermadmin, "ConditionInfo");
Clazz.makeConstructor (c$, 
function (type, args) {
this.type = type;
this.args = args != null ? args :  new Array (0);
if (type == null) {
throw  new NullPointerException ("type is null");
}}, "~S,~A");
Clazz.makeConstructor (c$, 
function (encodedCondition) {
if (encodedCondition == null) {
throw  new NullPointerException ("missing encoded condition");
}if (encodedCondition.length == 0) {
throw  new IllegalArgumentException ("empty encoded condition");
}try {
var encoded = encodedCondition.toCharArray ();
var length = encoded.length;
var pos = 0;
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
if ((encoded[pos]).charCodeAt (0) != ('[').charCodeAt (0)) {
throw  new IllegalArgumentException ("expecting open bracket");
}pos++;
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
var begin = pos;
while (!Character.isWhitespace (encoded[pos]) && ((encoded[pos]).charCodeAt (0) != (']').charCodeAt (0))) {
pos++;
}
if (pos == begin || (encoded[begin]).charCodeAt (0) == ('"').charCodeAt (0)) {
throw  new IllegalArgumentException ("expecting type");
}this.type =  String.instantialize (encoded, begin, pos - begin);
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
var argsList =  new java.util.ArrayList ();
while ((encoded[pos]).charCodeAt (0) == ('"').charCodeAt (0)) {
pos++;
begin = pos;
while ((encoded[pos]).charCodeAt (0) != ('"').charCodeAt (0)) {
if ((encoded[pos]).charCodeAt (0) == ('\\').charCodeAt (0)) {
pos++;
}pos++;
}
argsList.add (org.osgi.service.condpermadmin.ConditionInfo.unescapeString (encoded, begin, pos));
pos++;
if (Character.isWhitespace (encoded[pos])) {
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
}}
this.args = argsList.toArray ( new Array (argsList.size ()));
var c = encoded[pos];
pos++;
while ((pos < length) && Character.isWhitespace (encoded[pos])) {
pos++;
}
if (((c).charCodeAt (0) != (']').charCodeAt (0)) || (pos != length)) {
throw  new IllegalArgumentException ("expecting close bracket");
}} catch (e) {
if (Clazz.instanceOf (e, ArrayIndexOutOfBoundsException)) {
throw  new IllegalArgumentException ("parsing terminated abruptly");
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "getEncoded", 
function () {
var output =  new StringBuffer ();
output.append ('[');
output.append (this.type);
for (var i = 0; i < this.args.length; i++) {
output.append (" \"");
org.osgi.service.condpermadmin.ConditionInfo.escapeString (this.args[i], output);
output.append ('\"');
}
output.append (']');
return output.toString ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getEncoded ();
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getArgs", 
function () {
return this.args;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (!(Clazz.instanceOf (obj, org.osgi.service.condpermadmin.ConditionInfo))) {
return false;
}var other = obj;
if (!this.type.equals (other.type) || this.args.length != other.args.length) return false;
for (var i = 0; i < this.args.length; i++) {
if (!this.args[i].equals (other.args[i])) return false;
}
return true;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = this.type.hashCode ();
for (var i = 0; i < this.args.length; i++) {
hash ^= this.args[i].hashCode ();
}
return hash;
});
c$.escapeString = Clazz.defineMethod (c$, "escapeString", 
($fz = function (str, output) {
var len = str.length;
for (var i = 0; i < len; i++) {
var c = str.charAt (i);
switch (c) {
case '"':
case '\\':
output.append ('\\');
output.append (c);
break;
case '\r':
output.append ("\\r");
break;
case '\n':
output.append ("\\n");
break;
default:
output.append (c);
break;
}
}
}, $fz.isPrivate = true, $fz), "~S,StringBuffer");
c$.unescapeString = Clazz.defineMethod (c$, "unescapeString", 
($fz = function (str, begin, end) {
var output =  new StringBuffer (end - begin);
for (var i = begin; i < end; i++) {
var c = str[i];
if ((c).charCodeAt (0) == ('\\').charCodeAt (0)) {
i++;
if (i < end) {
c = str[i];
switch (c) {
case '"':
case '\\':
break;
case 'r':
c = '\r';
break;
case 'n':
c = '\n';
break;
default:
c = '\\';
i--;
break;
}
}}output.append (c);
}
return output.toString ();
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
});
