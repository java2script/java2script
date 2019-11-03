Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.security.BasicPermission", "$.PermissionCollection"], ["org.osgi.framework.AdminPermissionCollection", "$.AdminPermission"], ["java.lang.Character", "$.IllegalArgumentException", "$.Long", "$.RuntimeException", "$.SecurityException", "$.StringBuffer", "$.UnsupportedOperationException", "java.security.AccessController", "$.PrivilegedAction", "java.util.Collections", "$.Hashtable", "org.eclipse.osgi.framework.internal.core.FilterImpl"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$wildcard = false;
this.filter = null;
this.actions = null;
this.action_mask = 0;
this.bundle = null;
this.bundleProperties = null;
this.filterImpl = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "AdminPermission", java.security.BasicPermission);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.pattern = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework.AdminPermission, "SignerWrapper");
Clazz.makeConstructor (c$, 
function (a) {
this.pattern = a;
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
this.bundle = a;
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, org.osgi.framework.AdminPermission.SignerWrapper))) return false;
var b = a;
var c = (this.bundle != null ? this.bundle : b.bundle);
var d = this.bundle != null ? b.pattern : this.pattern;
return c.getBundleData ().matchDNChain (d);
}, "~O");
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function () {
this.construct ("*", 991);
});
Clazz.makeConstructor (c$, 
function (filter, actions) {
this.construct ((filter == null ? "*" : filter), org.osgi.framework.AdminPermission.getMask ((actions == null ? "*" : actions)));
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (bundle, actions) {
Clazz.superConstructor (this, org.osgi.framework.AdminPermission, [org.osgi.framework.AdminPermission.createName (bundle)]);
this.bundle = bundle;
this.$wildcard = false;
this.filter = null;
this.action_mask = org.osgi.framework.AdminPermission.getMask (actions);
}, "org.osgi.framework.Bundle,~S");
c$.createName = Clazz.defineMethod (c$, "createName", 
($fz = function (bundle) {
var sb =  new StringBuffer ();
sb.append ("(id=");
sb.append (bundle.getBundleId ());
sb.append (")");
return sb.toString ();
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (!(Clazz.instanceOf (obj, org.osgi.framework.AdminPermission))) {
return false;
}var a = obj;
return (this.action_mask == a.action_mask) && (this.$wildcard == a.$wildcard) && (this.bundle == null ? a.bundle == null : (a.bundle == null ? false : this.bundle.getBundleId () == a.bundle.getBundleId ())) && (this.filter == null ? a.filter == null : this.filter.equals (a.filter));
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.getName ().hashCode () ^ this.getActions ().hashCode ();
});
Clazz.overrideMethod (c$, "getActions", 
function () {
if (this.actions == null) {
var sb =  new StringBuffer ();
if ((this.action_mask & 1) == 1) {
sb.append ("class");
sb.append (',');
}if ((this.action_mask & 2) == 2) {
sb.append ("execute");
sb.append (',');
}if ((this.action_mask & 512) == 512) {
sb.append ("extensionLifecycle");
sb.append (',');
}if ((this.action_mask & 4) == 4) {
sb.append ("lifecycle");
sb.append (',');
}if ((this.action_mask & 8) == 8) {
sb.append ("listener");
sb.append (',');
}if ((this.action_mask & 16) == 16) {
sb.append ("metadata");
sb.append (',');
}if ((this.action_mask & 64) == 64) {
sb.append ("resolve");
sb.append (',');
}if ((this.action_mask & 128) == 128) {
sb.append ("resource");
sb.append (',');
}if ((this.action_mask & 256) == 256) {
sb.append ("startlevel");
sb.append (',');
}if (sb.length () > 0) {
sb.setLength (sb.length () - 1);
}this.actions = sb.toString ();
}return this.actions;
});
Clazz.overrideMethod (c$, "implies", 
function (p) {
if (!(Clazz.instanceOf (p, org.osgi.framework.AdminPermission))) return false;
var target = p;
if ((this.action_mask & target.action_mask) != target.action_mask) return false;
if (target.filter != null) throw  new RuntimeException ("Cannot imply a filter");
if (target.$wildcard) return this.$wildcard;
if (this.filter != null) {
var filterImpl = this.getFilterImpl ();
return filterImpl != null && filterImpl.match (target.getProperties ());
} else if (this.$wildcard) {
return true;
} else {
return this.bundle.equals (target.bundle);
}}, "java.security.Permission");
Clazz.overrideMethod (c$, "newPermissionCollection", 
function () {
return ( new org.osgi.framework.AdminPermissionCollection ());
});
Clazz.makeConstructor (c$, 
function (filter, action_mask) {
Clazz.superConstructor (this, org.osgi.framework.AdminPermission, [filter]);
if (filter.equals ("*")) {
this.$wildcard = true;
this.filter = null;
} else {
this.$wildcard = false;
this.filter = filter;
}this.bundle = null;
this.action_mask = action_mask;
}, "~S,~N");
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
if (i >= 4 && ((a[i - 4]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('a').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('A').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i]).charCodeAt (0) == ('S').charCodeAt (0))) {
matchlen = 5;
mask |= 1;
} else if (i >= 6 && ((a[i - 6]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('x').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('X').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('u').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('U').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i]).charCodeAt (0) == ('E').charCodeAt (0))) {
matchlen = 7;
mask |= 2;
} else if (i >= 17 && ((a[i - 17]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 17]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 16]).charCodeAt (0) == ('x').charCodeAt (0) || (a[i - 16]).charCodeAt (0) == ('X').charCodeAt (0)) && ((a[i - 15]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 15]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 14]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 14]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 13]).charCodeAt (0) == ('n').charCodeAt (0) || (a[i - 13]).charCodeAt (0) == ('N').charCodeAt (0)) && ((a[i - 12]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 12]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 11]).charCodeAt (0) == ('i').charCodeAt (0) || (a[i - 11]).charCodeAt (0) == ('I').charCodeAt (0)) && ((a[i - 10]).charCodeAt (0) == ('o').charCodeAt (0) || (a[i - 10]).charCodeAt (0) == ('O').charCodeAt (0)) && ((a[i - 9]).charCodeAt (0) == ('n').charCodeAt (0) || (a[i - 9]).charCodeAt (0) == ('N').charCodeAt (0)) && ((a[i - 8]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 8]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 7]).charCodeAt (0) == ('i').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('I').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('f').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('F').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('y').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('Y').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i]).charCodeAt (0) == ('E').charCodeAt (0))) {
matchlen = 18;
mask |= 512;
} else if (i >= 8 && ((a[i - 8]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 8]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 7]).charCodeAt (0) == ('i').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('I').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('f').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('F').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('y').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('Y').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i]).charCodeAt (0) == ('E').charCodeAt (0))) {
matchlen = 9;
mask |= 4;
} else if (i >= 7 && ((a[i - 7]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('i').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('I').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('n').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('N').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i]).charCodeAt (0) == ('R').charCodeAt (0))) {
matchlen = 8;
mask |= 8;
} else if (i >= 7 && ((a[i - 7]).charCodeAt (0) == ('m').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('M').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('a').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('A').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('d').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('D').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('a').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('A').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('a').charCodeAt (0) || (a[i]).charCodeAt (0) == ('A').charCodeAt (0))) {
matchlen = 8;
mask |= 16;
} else if (i >= 6 && ((a[i - 6]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('R').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('o').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('O').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('v').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('V').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i]).charCodeAt (0) == ('E').charCodeAt (0))) {
matchlen = 7;
mask |= 64;
} else if (i >= 7 && ((a[i - 7]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('R').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('o').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('O').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('u').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('U').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('R').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('c').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('C').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i]).charCodeAt (0) == ('E').charCodeAt (0))) {
matchlen = 8;
mask |= 128;
} else if (i >= 9 && ((a[i - 9]).charCodeAt (0) == ('s').charCodeAt (0) || (a[i - 9]).charCodeAt (0) == ('S').charCodeAt (0)) && ((a[i - 8]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 8]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 7]).charCodeAt (0) == ('a').charCodeAt (0) || (a[i - 7]).charCodeAt (0) == ('A').charCodeAt (0)) && ((a[i - 6]).charCodeAt (0) == ('r').charCodeAt (0) || (a[i - 6]).charCodeAt (0) == ('R').charCodeAt (0)) && ((a[i - 5]).charCodeAt (0) == ('t').charCodeAt (0) || (a[i - 5]).charCodeAt (0) == ('T').charCodeAt (0)) && ((a[i - 4]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i - 4]).charCodeAt (0) == ('L').charCodeAt (0)) && ((a[i - 3]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 3]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i - 2]).charCodeAt (0) == ('v').charCodeAt (0) || (a[i - 2]).charCodeAt (0) == ('V').charCodeAt (0)) && ((a[i - 1]).charCodeAt (0) == ('e').charCodeAt (0) || (a[i - 1]).charCodeAt (0) == ('E').charCodeAt (0)) && ((a[i]).charCodeAt (0) == ('l').charCodeAt (0) || (a[i]).charCodeAt (0) == ('L').charCodeAt (0))) {
matchlen = 10;
mask |= 256;
} else if (i >= 0 && ((a[i]).charCodeAt (0) == ('*').charCodeAt (0))) {
matchlen = 1;
mask |= 991;
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
Clazz.defineMethod (c$, "getProperties", 
($fz = function () {
if (this.bundleProperties == null) {
this.bundleProperties =  new java.util.Hashtable ();
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.osgi.framework.AdminPermission$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.osgi.framework, "AdminPermission$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.osgi.framework.AdminPermission"].bundleProperties.put ("id",  new Long (this.b$["org.osgi.framework.AdminPermission"].bundle.getBundleId ()));
this.b$["org.osgi.framework.AdminPermission"].bundleProperties.put ("location", this.b$["org.osgi.framework.AdminPermission"].bundle.getLocation ());
if (this.b$["org.osgi.framework.AdminPermission"].bundle.getSymbolicName () != null) this.b$["org.osgi.framework.AdminPermission"].bundleProperties.put ("name", this.b$["org.osgi.framework.AdminPermission"].bundle.getSymbolicName ());
this.b$["org.osgi.framework.AdminPermission"].bundleProperties.put ("signer",  new org.osgi.framework.AdminPermission.SignerWrapper (this.b$["org.osgi.framework.AdminPermission"].bundle));
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.osgi.framework.AdminPermission$1, i$, v$);
}) (this, null));
}return this.bundleProperties;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getFilterImpl", 
($fz = function () {
if (this.filterImpl == null) {
try {
var pos = this.filter.indexOf ("signer");
if (pos != -1) {
var filterBuf =  new StringBuffer (this.filter);
var numAsteriskFound = 0;
var walkbackPos;
while (pos != -1) {
walkbackPos = pos - 1;
while (walkbackPos >= 0 && Character.isWhitespace (this.filter.charAt (walkbackPos))) {
walkbackPos--;
}
if (walkbackPos < 0) {
break;
}if ((this.filter.charAt (walkbackPos)).charCodeAt (0) != ('(').charCodeAt (0) || (walkbackPos > 0 && (this.filter.charAt (walkbackPos - 1)).charCodeAt (0) == ('\\').charCodeAt (0))) {
pos = this.filter.indexOf ("signer", pos + 6);
continue ;}pos += 6;
while (Character.isWhitespace (this.filter.charAt (pos))) {
pos++;
}
if ((this.filter.charAt (pos)).charCodeAt (0) != ('=').charCodeAt (0)) {
pos = this.filter.indexOf ("signer", pos);
continue ;}pos++;
while (!((this.filter.charAt (pos)).charCodeAt (0) == (')').charCodeAt (0) && (this.filter.charAt (pos - 1)).charCodeAt (0) != ('\\').charCodeAt (0))) {
if ((this.filter.charAt (pos)).charCodeAt (0) == ('*').charCodeAt (0)) {
filterBuf.insert (pos + numAsteriskFound, '\\');
numAsteriskFound++;
}pos++;
}
pos = this.filter.indexOf ("signer", pos);
}
this.filter = filterBuf.toString ();
}this.filterImpl =  new org.eclipse.osgi.framework.internal.core.FilterImpl (this.filter);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
}return this.filterImpl;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMask", 
function () {
return this.action_mask;
});
Clazz.defineStatics (c$,
"CLASS", "class",
"EXECUTE", "execute",
"EXTENSIONLIFECYCLE", "extensionLifecycle",
"LIFECYCLE", "lifecycle",
"LISTENER", "listener",
"METADATA", "metadata",
"RESOLVE", "resolve",
"RESOURCE", "resource",
"STARTLEVEL", "startlevel",
"ACTION_CLASS", 0x00000001,
"ACTION_EXECUTE", 0x00000002,
"ACTION_LIFECYCLE", 0x00000004,
"ACTION_LISTENER", 0x00000008,
"ACTION_METADATA", 0x00000010,
"ACTION_RESOLVE", 0x00000040,
"ACTION_RESOURCE", 0x00000080,
"ACTION_STARTLEVEL", 0x00000100,
"ACTION_EXTENSIONLIFECYCLE", 0x00000200,
"ACTION_ALL", 991,
"ACTION_NONE", 0);
c$ = Clazz.decorateAsClass (function () {
this.permissions = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "AdminPermissionCollection", java.security.PermissionCollection);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.osgi.framework.AdminPermissionCollection, []);
this.permissions =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "add", 
function (permission) {
if (!(Clazz.instanceOf (permission, org.osgi.framework.AdminPermission))) throw  new IllegalArgumentException ("invalid permission: " + permission);
if (this.isReadOnly ()) throw  new SecurityException ("attempt to add a Permission to a readonly AdminCollection");
var ap = permission;
var existing = this.permissions.get (ap.getName ());
if (existing != null) {
var oldMask = existing.getMask ();
var newMask = ap.getMask ();
if (oldMask != newMask) {
this.permissions.put (existing.getName (),  new org.osgi.framework.AdminPermission (existing.getName (), oldMask | newMask));
}} else {
this.permissions.put (ap.getName (), ap);
}}, "java.security.Permission");
Clazz.overrideMethod (c$, "implies", 
function (permission) {
if (!(Clazz.instanceOf (permission, org.osgi.framework.AdminPermission))) return (false);
var target = permission;
var permItr = this.permissions.values ().iterator ();
while (permItr.hasNext ()) if ((permItr.next ()).implies (target)) return true;

return false;
}, "java.security.Permission");
Clazz.overrideMethod (c$, "elements", 
function () {
return (java.util.Collections.enumeration (this.permissions.values ()));
});
});
