Clazz.declarePackage ("org.osgi.framework");
Clazz.load (null, "org.osgi.framework.Version", ["java.lang.IllegalArgumentException", "java.util.StringTokenizer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.major = 0;
this.minor = 0;
this.micro = 0;
this.qualifier = null;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "Version", null, Comparable);
Clazz.makeConstructor (c$, 
function (major, minor, micro) {
this.construct (major, minor, micro, null);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (major, minor, micro, qualifier) {
if (qualifier == null) {
qualifier = "";
}this.major = major;
this.minor = minor;
this.micro = micro;
this.qualifier = qualifier;
this.validate ();
}, "~N,~N,~N,~S");
Clazz.makeConstructor (c$, 
function (version) {
var major = 0;
var minor = 0;
var micro = 0;
var qualifier = "";
try {
var st =  new java.util.StringTokenizer (version, ".", true);
major = Integer.parseInt (st.nextToken ());
if (st.hasMoreTokens ()) {
st.nextToken ();
minor = Integer.parseInt (st.nextToken ());
if (st.hasMoreTokens ()) {
st.nextToken ();
micro = Integer.parseInt (st.nextToken ());
if (st.hasMoreTokens ()) {
st.nextToken ();
qualifier = st.nextToken ();
if (st.hasMoreTokens ()) {
throw  new IllegalArgumentException ("invalid format");
}}}}} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
throw  new IllegalArgumentException ("invalid format");
} else {
throw e;
}
}
this.major = major;
this.minor = minor;
this.micro = micro;
this.qualifier = qualifier;
this.validate ();
}, "~S");
Clazz.defineMethod (c$, "validate", 
($fz = function () {
if (this.major < 0) {
throw  new IllegalArgumentException ("negative major");
}if (this.minor < 0) {
throw  new IllegalArgumentException ("negative minor");
}if (this.micro < 0) {
throw  new IllegalArgumentException ("negative micro");
}var length = this.qualifier.length;
for (var i = 0; i < length; i++) {
if ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".indexOf (this.qualifier.charAt (i)) == -1) {
throw  new IllegalArgumentException ("invalid qualifier");
}}
}, $fz.isPrivate = true, $fz));
c$.parseVersion = Clazz.defineMethod (c$, "parseVersion", 
function (version) {
if (version == null) {
return org.osgi.framework.Version.emptyVersion;
}version = version.trim ();
if (version.length == 0) {
return org.osgi.framework.Version.emptyVersion;
}return  new org.osgi.framework.Version (version);
}, "~S");
Clazz.defineMethod (c$, "getMajor", 
function () {
return this.major;
});
Clazz.defineMethod (c$, "getMinor", 
function () {
return this.minor;
});
Clazz.defineMethod (c$, "getMicro", 
function () {
return this.micro;
});
Clazz.defineMethod (c$, "getQualifier", 
function () {
return this.qualifier;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var base = this.major + "." + this.minor + "." + this.micro;
if (this.qualifier.length == 0) {
return base;
} else {
return base + "." + this.qualifier;
}});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.major << 24) + (this.minor << 16) + (this.micro << 8) + this.qualifier.hashCode ();
});
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (object === this) {
return true;
}if (!(Clazz.instanceOf (object, org.osgi.framework.Version))) {
return false;
}var other = object;
return (this.major == other.major) && (this.minor == other.minor) && (this.micro == other.micro) && this.qualifier.equals (other.qualifier);
}, "~O");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
if (object === this) {
return 0;
}var other = object;
var result = this.major - other.major;
if (result != 0) {
return result;
}result = this.minor - other.minor;
if (result != 0) {
return result;
}result = this.micro - other.micro;
if (result != 0) {
return result;
}return this.qualifier.compareTo (other.qualifier);
}, "~O");
Clazz.defineStatics (c$,
"SEPARATOR", ".");
c$.emptyVersion = c$.prototype.emptyVersion =  new org.osgi.framework.Version (0, 0, 0);
});
