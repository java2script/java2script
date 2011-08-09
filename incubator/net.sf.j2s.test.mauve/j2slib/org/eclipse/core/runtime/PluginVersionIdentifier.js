Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (null, "org.eclipse.core.runtime.PluginVersionIdentifier", ["java.lang.Character", "java.util.StringTokenizer", "$.Vector", "org.eclipse.core.internal.runtime.Assert", "$.Messages", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.major = 0;
this.minor = 0;
this.service = 0;
this.qualifier = "";
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "PluginVersionIdentifier");
Clazz.makeConstructor (c$, 
function (major, minor, service) {
this.construct (major, minor, service, null);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (major, minor, service, qualifier) {
if (major < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveMajor, major + "." + minor + "." + service + "." + qualifier));
if (minor < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveMinor, major + "." + minor + "." + service + "." + qualifier));
if (service < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveService, major + "." + minor + "." + service + "." + qualifier));
if (qualifier == null) qualifier = "";
this.major = major;
this.minor = minor;
this.service = service;
this.qualifier = org.eclipse.core.runtime.PluginVersionIdentifier.verifyQualifier (qualifier);
}, "~N,~N,~N,~S");
Clazz.makeConstructor (c$, 
function (versionId) {
var parts = org.eclipse.core.runtime.PluginVersionIdentifier.parseVersion (versionId);
this.major = (parts[0]).intValue ();
this.minor = (parts[1]).intValue ();
this.service = (parts[2]).intValue ();
this.qualifier = parts[3];
}, "~S");
c$.validateVersion = Clazz.defineMethod (c$, "validateVersion", 
function (version) {
try {
org.eclipse.core.runtime.PluginVersionIdentifier.parseVersion (version);
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
return  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 4, e.getMessage (), e);
} else {
throw e;
}
}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "~S");
c$.parseVersion = Clazz.defineMethod (c$, "parseVersion", 
($fz = function (versionId) {
if (versionId == null) org.eclipse.core.internal.runtime.Assert.isNotNull (null, org.eclipse.core.internal.runtime.Messages.parse_emptyPluginVersion);
var s = versionId.trim ();
if (s.equals ("")) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.core.internal.runtime.Messages.parse_emptyPluginVersion);
if (s.startsWith (".")) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_separatorStartVersion, s));
if (s.endsWith (".")) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_separatorEndVersion, s));
if (s.indexOf ("..") != -1) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_doubleSeparatorVersion, s));
var st =  new java.util.StringTokenizer (s, ".");
var elements =  new java.util.Vector (4);
while (st.hasMoreTokens ()) elements.addElement (st.nextToken ());

var elementSize = elements.size ();
if (elementSize <= 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_oneElementPluginVersion, s));
if (elementSize > 4) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_fourElementPluginVersion, s));
var numbers =  Clazz.newArray (3, 0);
try {
numbers[0] = Integer.parseInt (elements.elementAt (0));
if (numbers[0] < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveMajor, s));
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_numericMajorComponent, s));
} else {
throw nfe;
}
}
try {
if (elementSize >= 2) {
numbers[1] = Integer.parseInt (elements.elementAt (1));
if (numbers[1] < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveMinor, s));
} else numbers[1] = 0;
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_numericMinorComponent, s));
} else {
throw nfe;
}
}
try {
if (elementSize >= 3) {
numbers[2] = Integer.parseInt (elements.elementAt (2));
if (numbers[2] < 0) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_postiveService, s));
} else numbers[2] = 0;
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.parse_numericServiceComponent, s));
} else {
throw nfe;
}
}
var result =  new Array (4);
result[0] =  new Integer (numbers[0]);
result[1] =  new Integer (numbers[1]);
result[2] =  new Integer (numbers[2]);
if (elementSize >= 4) result[3] = org.eclipse.core.runtime.PluginVersionIdentifier.verifyQualifier (elements.elementAt (3));
 else result[3] = "";
return result;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.core.runtime.PluginVersionIdentifier))) return false;
var v = object;
return v.getMajorComponent () == this.major && v.getMinorComponent () == this.minor && v.getServiceComponent () == this.service && v.getQualifierComponent ().equals (this.qualifier);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var code = this.major + this.minor + this.service;
if (this.qualifier.equals ("")) return code;
 else return code + this.qualifier.hashCode ();
});
Clazz.defineMethod (c$, "getMajorComponent", 
function () {
return this.major;
});
Clazz.defineMethod (c$, "getMinorComponent", 
function () {
return this.minor;
});
Clazz.defineMethod (c$, "getServiceComponent", 
function () {
return this.service;
});
Clazz.defineMethod (c$, "getQualifierComponent", 
function () {
return this.qualifier;
});
Clazz.defineMethod (c$, "isGreaterOrEqualTo", 
function (id) {
if (id == null) return false;
if (this.major > id.getMajorComponent ()) return true;
if ((this.major == id.getMajorComponent ()) && (this.minor > id.getMinorComponent ())) return true;
if ((this.major == id.getMajorComponent ()) && (this.minor == id.getMinorComponent ()) && (this.service > id.getServiceComponent ())) return true;
if ((this.major == id.getMajorComponent ()) && (this.minor == id.getMinorComponent ()) && (this.service == id.getServiceComponent ()) && (this.qualifier.compareTo (id.getQualifierComponent ()) >= 0)) return true;
 else return false;
}, "org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.defineMethod (c$, "isCompatibleWith", 
function (id) {
if (id == null) return false;
if (this.major != id.getMajorComponent ()) return false;
if (this.minor > id.getMinorComponent ()) return true;
if (this.minor < id.getMinorComponent ()) return false;
if (this.service > id.getServiceComponent ()) return true;
if (this.service < id.getServiceComponent ()) return false;
if (this.qualifier.compareTo (id.getQualifierComponent ()) >= 0) return true;
 else return false;
}, "org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.defineMethod (c$, "isEquivalentTo", 
function (id) {
if (id == null) return false;
if (this.major != id.getMajorComponent ()) return false;
if (this.minor != id.getMinorComponent ()) return false;
if (this.service > id.getServiceComponent ()) return true;
if (this.service < id.getServiceComponent ()) return false;
if (this.qualifier.compareTo (id.getQualifierComponent ()) >= 0) return true;
 else return false;
}, "org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.defineMethod (c$, "isPerfect", 
function (id) {
if (id == null) return false;
if ((this.major != id.getMajorComponent ()) || (this.minor != id.getMinorComponent ()) || (this.service != id.getServiceComponent ()) || (!this.qualifier.equals (id.getQualifierComponent ()))) return false;
 else return true;
}, "org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.defineMethod (c$, "isGreaterThan", 
function (id) {
if (id == null) {
if (this.major == 0 && this.minor == 0 && this.service == 0 && this.qualifier.equals ("")) return false;
 else return true;
}if (this.major > id.getMajorComponent ()) return true;
if (this.major < id.getMajorComponent ()) return false;
if (this.minor > id.getMinorComponent ()) return true;
if (this.minor < id.getMinorComponent ()) return false;
if (this.service > id.getServiceComponent ()) return true;
if (this.service < id.getServiceComponent ()) return false;
if (this.qualifier.compareTo (id.getQualifierComponent ()) > 0) return true;
 else return false;
}, "org.eclipse.core.runtime.PluginVersionIdentifier");
Clazz.overrideMethod (c$, "toString", 
function () {
var base = this.major + "." + this.minor + "." + this.service;
if (this.qualifier.equals ("")) return base;
 else return base + "." + this.qualifier;
});
c$.verifyQualifier = Clazz.defineMethod (c$, "verifyQualifier", 
($fz = function (s) {
var chars = s.trim ().toCharArray ();
var whitespace = false;
for (var i = 0; i < chars.length; i++) {
if (!Character.isLetterOrDigit (chars[i])) {
chars[i] = '-';
whitespace = true;
}}
return whitespace ?  String.instantialize (chars) : s;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"SEPARATOR", ".");
});
