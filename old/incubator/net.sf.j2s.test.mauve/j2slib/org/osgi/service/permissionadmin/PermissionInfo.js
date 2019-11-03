Clazz.declarePackage ("org.osgi.service.permissionadmin");
Clazz.load (null, "org.osgi.service.permissionadmin.PermissionInfo", ["java.lang.Character", "$.IllegalArgumentException", "$.NullPointerException", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.name = null;
this.actions = null;
Clazz.instantialize (this, arguments);
}, org.osgi.service.permissionadmin, "PermissionInfo");
Clazz.makeConstructor (c$, 
function (type, name, actions) {
this.type = type;
this.name = name;
this.actions = actions;
if (type == null) {
throw  new NullPointerException ("type is null");
}if ((name == null) && (actions != null)) {
throw  new IllegalArgumentException ("name missing");
}}, "~S,~S,~S");
Clazz.makeConstructor (c$, 
function (encodedPermission) {
if (encodedPermission == null) {
throw  new NullPointerException ("missing encoded permission");
}if (encodedPermission.length == 0) {
throw  new IllegalArgumentException ("empty encoded permission");
}try {
var encoded = encodedPermission.toCharArray ();
var length = encoded.length;
var pos = 0;
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
if ((encoded[pos]).charCodeAt (0) != ('(').charCodeAt (0)) {
throw  new IllegalArgumentException ("expecting open parenthesis");
}pos++;
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
var begin = pos;
while (!Character.isWhitespace (encoded[pos]) && ((encoded[pos]).charCodeAt (0) != (')').charCodeAt (0))) {
pos++;
}
if (pos == begin || (encoded[begin]).charCodeAt (0) == ('"').charCodeAt (0)) {
throw  new IllegalArgumentException ("expecting type");
}this.type =  String.instantialize (encoded, begin, pos - begin);
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
if ((encoded[pos]).charCodeAt (0) == ('"').charCodeAt (0)) {
pos++;
begin = pos;
while ((encoded[pos]).charCodeAt (0) != ('"').charCodeAt (0)) {
if ((encoded[pos]).charCodeAt (0) == ('\\').charCodeAt (0)) {
pos++;
}pos++;
}
this.name = org.osgi.service.permissionadmin.PermissionInfo.unescapeString (encoded, begin, pos);
pos++;
if (Character.isWhitespace (encoded[pos])) {
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
if ((encoded[pos]).charCodeAt (0) == ('"').charCodeAt (0)) {
pos++;
begin = pos;
while ((encoded[pos]).charCodeAt (0) != ('"').charCodeAt (0)) {
if ((encoded[pos]).charCodeAt (0) == ('\\').charCodeAt (0)) {
pos++;
}pos++;
}
this.actions = org.osgi.service.permissionadmin.PermissionInfo.unescapeString (encoded, begin, pos);
pos++;
while (Character.isWhitespace (encoded[pos])) {
pos++;
}
}}}var c = encoded[pos];
pos++;
while ((pos < length) && Character.isWhitespace (encoded[pos])) {
pos++;
}
if (((c).charCodeAt (0) != (')').charCodeAt (0)) || (pos != length)) {
throw  new IllegalArgumentException ("expecting close parenthesis");
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
var output =  new StringBuffer (8 + this.type.length + ((((this.name == null) ? 0 : this.name.length) + ((this.actions == null) ? 0 : this.actions.length)) << 1));
output.append ('(');
output.append (this.type);
if (this.name != null) {
output.append (" \"");
org.osgi.service.permissionadmin.PermissionInfo.escapeString (this.name, output);
if (this.actions != null) {
output.append ("\" \"");
org.osgi.service.permissionadmin.PermissionInfo.escapeString (this.actions, output);
}output.append ('\"');
}output.append (')');
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
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getActions", 
function () {
return this.actions;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (!(Clazz.instanceOf (obj, org.osgi.service.permissionadmin.PermissionInfo))) {
return false;
}var other = obj;
if (!this.type.equals (other.type) || ( new Boolean ((this.name == null) ^ (other.name == null)).valueOf ()) || ( new Boolean ((this.actions == null) ^ (other.actions == null)).valueOf ())) {
return false;
}if (this.name != null) {
if (this.actions != null) {
return this.name.equals (other.name) && this.actions.equals (other.actions);
} else {
return this.name.equals (other.name);
}} else {
return true;
}}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = this.type.hashCode ();
if (this.name != null) {
hash ^= this.name.hashCode ();
if (this.actions != null) {
hash ^= this.actions.hashCode ();
}}return hash;
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
