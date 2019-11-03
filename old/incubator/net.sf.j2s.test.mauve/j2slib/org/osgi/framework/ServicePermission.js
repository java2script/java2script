Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.security.BasicPermission", "$.PermissionCollection"], ["org.osgi.framework.ServicePermission", "$.ServicePermissionCollection"], ["java.lang.IllegalArgumentException", "$.SecurityException", "$.StringBuffer", "java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.action_mask = 0;
this.actions = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "ServicePermission", java.security.BasicPermission);
Clazz.makeConstructor (c$, 
function (name, actions) {
this.construct (name, org.osgi.framework.ServicePermission.getMask (actions));
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (name, mask) {
Clazz.superConstructor (this, org.osgi.framework.ServicePermission, [name]);
this.init (mask);
}, "~S,~N");
Clazz.defineMethod (c$, "init", 
($fz = function (mask) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if ((mask == 0) || ((mask & 3) != mask)) {
throw  new IllegalArgumentException ("invalid action string");
}this.action_mask = mask;
}, $fz.isPrivate = true, $fz), "~N");
c$.getMask = Clazz.defineMethod (c$, "getMask", 
($fz = function (actions) {
var seencomma = false;
var mask = 0;
if (actions == null) {
return mask;
}var a = actions.toCharArray ();
var i = a.length - 1;
if (i < 0) return mask;
while (i != -1) {
var c;
while ((i != -1) && (((c = a[i])).charCodeAt (0) == (' ').charCodeAt (0) || (c).charCodeAt (0) == ('\r').charCodeAt (0) || (c).charCodeAt (0) == ('\n').charCodeAt (0) || (c).charCodeAt (0) == ('\f').charCodeAt (0) || (c).charCodeAt (0) == ('\t').charCodeAt (0))) i--;

var matchlen;
if (i >= 2 && ((a[i - 2]).charCodeAt (0) == ('g').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('G').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i]).charCodeAt (0) == ('T').charCodeAt (0))) {
matchlen = 3;
mask |= 1;
} else if (i >= 7 && ((a[i - 7]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('R').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('g').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('G').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('i').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('I').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i]).charCodeAt (0) == ('R').charCodeAt (0))) {
matchlen = 8;
mask |= 2;
} else {
throw  new IllegalArgumentException ("invalid permission: " + actions);
}seencomma = false;
while (i >= matchlen && !seencomma) {
switch (a[i - matchlen]) {
case ',':
seencomma = true;
case ' ':
case '\r':
case '\n':
case '\f':
case '\t':
break;
default:
throw  new IllegalArgumentException ("invalid permission: " + actions);
}
i--;
}
i -= matchlen;
}
if (seencomma) {
throw  new IllegalArgumentException ("invalid permission: " + actions);
}return mask;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "implies", 
function (p) {
if (Clazz.instanceOf (p, org.osgi.framework.ServicePermission)) {
var target = p;
return (((this.action_mask & target.action_mask) == target.action_mask) && Clazz.superCall (this, org.osgi.framework.ServicePermission, "implies", [p]));
}return (false);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "getActions", 
function () {
if (this.actions == null) {
var sb =  new StringBuffer ();
var comma = false;
if ((this.action_mask & 1) == 1) {
sb.append ("get");
comma = true;
}if ((this.action_mask & 2) == 2) {
if (comma) sb.append (',');
sb.append ("register");
}this.actions = sb.toString ();
}return (this.actions);
});
Clazz.overrideMethod (c$, "newPermissionCollection", 
function () {
return ( new org.osgi.framework.ServicePermissionCollection ());
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return (true);
}if (!(Clazz.instanceOf (obj, org.osgi.framework.ServicePermission))) {
return (false);
}var p = obj;
return ((this.action_mask == p.action_mask) && this.getName ().equals (p.getName ()));
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.getName ().hashCode () ^ this.getActions ().hashCode ());
});
Clazz.defineMethod (c$, "getMask", 
function () {
return (this.action_mask);
});
Clazz.defineStatics (c$,
"GET", "get",
"REGISTER", "register",
"ACTION_GET", 0x00000001,
"ACTION_REGISTER", 0x00000002,
"ACTION_ALL", 3,
"ACTION_NONE", 0);
c$ = Clazz.decorateAsClass (function () {
this.permissions = null;
this.all_allowed = false;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "ServicePermissionCollection", java.security.PermissionCollection);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.osgi.framework.ServicePermissionCollection, []);
this.permissions =  new java.util.Hashtable ();
this.all_allowed = false;
});
Clazz.overrideMethod (c$, "add", 
function (permission) {
if (!(Clazz.instanceOf (permission, org.osgi.framework.ServicePermission))) throw  new IllegalArgumentException ("invalid permission: " + permission);
if (this.isReadOnly ()) throw  new SecurityException ("attempt to add a Permission to a readonly PermissionCollection");
var sp = permission;
var name = sp.getName ();
var existing = this.permissions.get (name);
if (existing != null) {
var oldMask = existing.getMask ();
var newMask = sp.getMask ();
if (oldMask != newMask) {
this.permissions.put (name,  new org.osgi.framework.ServicePermission (name, oldMask | newMask));
}} else {
this.permissions.put (name, permission);
}if (!this.all_allowed) {
if (name.equals ("*")) this.all_allowed = true;
}}, "java.security.Permission");
Clazz.overrideMethod (c$, "implies", 
function (permission) {
if (!(Clazz.instanceOf (permission, org.osgi.framework.ServicePermission))) return (false);
var sp = permission;
var x;
var desired = sp.getMask ();
var effective = 0;
if (this.all_allowed) {
x = this.permissions.get ("*");
if (x != null) {
effective |= x.getMask ();
if ((effective & desired) == desired) return (true);
}}var name = sp.getName ();
x = this.permissions.get (name);
if (x != null) {
effective |= x.getMask ();
if ((effective & desired) == desired) return (true);
}var last;
var offset;
offset = name.length - 1;
while ((last = name.lastIndexOf (".", offset)) != -1) {
name = name.substring (0, last + 1) + "*";
x = this.permissions.get (name);
if (x != null) {
effective |= x.getMask ();
if ((effective & desired) == desired) return (true);
}offset = last - 1;
}
return (false);
}, "java.security.Permission");
Clazz.overrideMethod (c$, "elements", 
function () {
return (this.permissions.elements ());
});
});
