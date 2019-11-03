Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.service.environment.EnvironmentInfo"], "org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo", ["java.util.Locale", "$.StringTokenizer", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.internal.adaptor, "EclipseEnvironmentInfo", null, org.eclipse.osgi.service.environment.EnvironmentInfo);
Clazz.makeConstructor (c$, 
($fz = function () {
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setupSystemContext ();
}, $fz.isPrivate = true, $fz));
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.singleton == null) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.singleton =  new org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo (), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.singleton = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.singleton, $t$);
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.singleton;
});
Clazz.overrideMethod (c$, "inDevelopmentMode", 
function () {
return System.getProperty ("osgi.dev") != null;
});
Clazz.overrideMethod (c$, "inDebugMode", 
function () {
return System.getProperty ("osgi.debug") != null;
});
Clazz.overrideMethod (c$, "getCommandLineArgs", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.allArgs;
});
Clazz.overrideMethod (c$, "getFrameworkArgs", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.frameworkArgs;
});
Clazz.overrideMethod (c$, "getNonFrameworkArgs", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.appArgs;
});
Clazz.overrideMethod (c$, "getOSArch", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch;
});
Clazz.overrideMethod (c$, "getNL", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl;
});
Clazz.overrideMethod (c$, "getOS", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os;
});
Clazz.overrideMethod (c$, "getWS", 
function () {
return org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws;
});
c$.setupSystemContext = Clazz.defineMethod (c$, "setupSystemContext", 
($fz = function () {
($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl = System.getProperty ("osgi.nl"), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.nl = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl, $t$);
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl != null) {
var tokenizer =  new java.util.StringTokenizer (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl, "_");
var segments = tokenizer.countTokens ();
try {
var userLocale = null;
switch (segments) {
case 1:
userLocale =  new java.util.Locale (tokenizer.nextToken (), "");
break;
case 2:
userLocale =  new java.util.Locale (tokenizer.nextToken (), tokenizer.nextToken ());
break;
case 3:
userLocale =  new java.util.Locale (tokenizer.nextToken (), tokenizer.nextToken (), tokenizer.nextToken ());
break;
default:
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.error_badNL, org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl));
userLocale = java.util.Locale.getDefault ();
break;
}
java.util.Locale.setDefault (userLocale);
System.getProperties ().put ("osgi.nl.user", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl);
} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
} else {
throw e;
}
}
}($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl = java.util.Locale.getDefault ().toString (), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.nl = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl, $t$);
System.getProperties ().put ("osgi.nl", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.nl);
($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os = System.getProperty ("osgi.os"), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.os = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os, $t$);
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os == null) {
($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.guessOS (System.getProperty ("os.name")), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.os = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os, $t$);
System.getProperties ().put ("osgi.os", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os);
}($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws = System.getProperty ("osgi.ws"), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.ws = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws, $t$);
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws == null) {
($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.guessWS (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.os), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.ws = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws, $t$);
System.getProperties ().put ("osgi.ws", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.ws);
}($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch = System.getProperty ("osgi.arch"), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.arch = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch, $t$);
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch == null) {
var name = System.getProperty ("os.arch");
if (name.equalsIgnoreCase ("i386")) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch = "x86", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.arch = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch, $t$);
 else if (name.equalsIgnoreCase ("amd64")) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch = "x86_64", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.arch = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch, $t$);
 else ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch = name, org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.arch = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch, $t$);
System.getProperties ().put ("osgi.arch", org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.arch);
}}, $fz.isPrivate = true, $fz));
c$.setAllArgs = Clazz.defineMethod (c$, "setAllArgs", 
function (allArgs) {
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.allArgs == null) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.allArgs = allArgs, org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.allArgs = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.allArgs, $t$);
}, "~A");
c$.setAppArgs = Clazz.defineMethod (c$, "setAppArgs", 
function (appArgs) {
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.appArgs == null) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.appArgs = appArgs, org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.appArgs = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.appArgs, $t$);
}, "~A");
c$.setFrameworkArgs = Clazz.defineMethod (c$, "setFrameworkArgs", 
function (frameworkArgs) {
if (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.frameworkArgs == null) ($t$ = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.frameworkArgs = frameworkArgs, org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.prototype.frameworkArgs = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.frameworkArgs, $t$);
}, "~A");
c$.guessWS = Clazz.defineMethod (c$, "guessWS", 
function (os) {
if (os.equals ("win32")) return "win32";
if (os.equals ("linux")) return "motif";
if (os.equals ("macosx")) return "carbon";
if (os.equals ("hpux")) return "motif";
if (os.equals ("aix")) return "motif";
if (os.equals ("solaris")) return "motif";
if (os.equals ("qnx")) return "photon";
return "unknown";
}, "~S");
c$.guessOS = Clazz.defineMethod (c$, "guessOS", 
function (osName) {
if (osName.regionMatches (true, 0, "win32", 0, 3)) return "win32";
if (osName.equalsIgnoreCase ("SunOS")) return "solaris";
if (osName.equalsIgnoreCase ("Linux")) return "linux";
if (osName.equalsIgnoreCase ("QNX")) return "qnx";
if (osName.equalsIgnoreCase ("AIX")) return "aix";
if (osName.equalsIgnoreCase ("HP-UX")) return "hpux";
if (osName.regionMatches (true, 0, "Mac OS", 0, "Mac OS".length)) return "macosx";
return "unknown";
}, "~S");
Clazz.defineStatics (c$,
"singleton", null,
"nl", null,
"os", null,
"ws", null,
"arch", null,
"allArgs", null,
"frameworkArgs", null,
"appArgs", null,
"INTERNAL_OS_SUNOS", "SunOS",
"INTERNAL_OS_LINUX", "Linux",
"INTERNAL_OS_MACOSX", "Mac OS",
"INTERNAL_OS_AIX", "AIX",
"INTERNAL_OS_HPUX", "HP-UX",
"INTERNAL_OS_QNX", "QNX",
"INTERNAL_ARCH_I386", "i386",
"INTERNAL_AMD64", "amd64");
});
