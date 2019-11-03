Clazz.declarePackage ("org.osgi.service.condpermadmin");
Clazz.load (null, "org.osgi.service.condpermadmin.BundleLocationCondition", ["java.lang.IllegalArgumentException", "$.RuntimeException", "java.security.AccessController", "$.PrivilegedAction", "java.util.Hashtable", "org.osgi.framework.FrameworkUtil", "org.osgi.service.condpermadmin.Condition"], function () {
c$ = Clazz.declareType (org.osgi.service.condpermadmin, "BundleLocationCondition");
c$.getCondition = Clazz.defineMethod (c$, "getCondition", 
function (bundle, info) {
if (!"org.osgi.service.condpermadmin.BundleLocationCondition".equals (info.getType ())) throw  new IllegalArgumentException ("ConditionInfo must be of type \"org.osgi.service.condpermadmin.BundleLocationCondition\"");
var args = info.getArgs ();
if (args.length != 1) throw  new IllegalArgumentException ("Illegal number of args: " + args.length);
var bundleLocation = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.osgi.service.condpermadmin.BundleLocationCondition$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.osgi.service.condpermadmin, "BundleLocationCondition$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.bundle.getLocation ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.osgi.service.condpermadmin.BundleLocationCondition$1, i$, v$);
}) (this, Clazz.cloneFinals ("bundle", bundle)));
var filter = null;
try {
filter = org.osgi.framework.FrameworkUtil.createFilter ("(location=" + org.osgi.service.condpermadmin.BundleLocationCondition.escapeLocation (args[0]) + ")");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
throw  new RuntimeException ("Invalid filter: " + e.getFilter ());
} else {
throw e;
}
}
var matchProps =  new java.util.Hashtable (2);
matchProps.put ("location", bundleLocation);
return filter.match (matchProps) ? org.osgi.service.condpermadmin.Condition.TRUE : org.osgi.service.condpermadmin.Condition.FALSE;
}, "org.osgi.framework.Bundle,org.osgi.service.condpermadmin.ConditionInfo");
c$.escapeLocation = Clazz.defineMethod (c$, "escapeLocation", 
($fz = function (value) {
var escaped = false;
var inlen = value.length;
var outlen = inlen << 1;
var output =  Clazz.newArray (outlen, '\0');
value.getChars (0, inlen, output, inlen);
var cursor = 0;
for (var i = inlen; i < outlen; i++) {
var c = output[i];
switch (c) {
case '\\':
if (i + 1 < outlen && (output[i + 1]).charCodeAt (0) == ('*').charCodeAt (0)) break;
case '(':
case ')':
output[cursor] = '\\';
cursor++;
escaped = true;
break;
}
output[cursor] = c;
cursor++;
}
return escaped ?  String.instantialize (output, 0, cursor) : value;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"CONDITION_TYPE", "org.osgi.service.condpermadmin.BundleLocationCondition");
});
