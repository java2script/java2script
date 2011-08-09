Clazz.declarePackage ("org.eclipse.osgi.framework.debug");
Clazz.load (["org.eclipse.osgi.service.debug.DebugOptions"], "org.eclipse.osgi.framework.debug.FrameworkDebugOptions", ["java.io.File", "java.net.URL", "java.util.Properties"], function () {
c$ = Clazz.decorateAsClass (function () {
this.options = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.debug, "FrameworkDebugOptions", null, org.eclipse.osgi.service.debug.DebugOptions);
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
if (org.eclipse.osgi.framework.debug.FrameworkDebugOptions.singleton == null && org.eclipse.osgi.framework.debug.FrameworkDebugOptions.debugEnabled) {
var result =  new org.eclipse.osgi.framework.debug.FrameworkDebugOptions ();
($t$ = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.debugEnabled = result.isDebugEnabled (), org.eclipse.osgi.framework.debug.FrameworkDebugOptions.prototype.debugEnabled = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.debugEnabled, $t$);
if (org.eclipse.osgi.framework.debug.FrameworkDebugOptions.debugEnabled) ($t$ = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.singleton = result, org.eclipse.osgi.framework.debug.FrameworkDebugOptions.prototype.singleton = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.singleton, $t$);
}return org.eclipse.osgi.framework.debug.FrameworkDebugOptions.singleton;
});
c$.buildURL = Clazz.defineMethod (c$, "buildURL", 
($fz = function (spec, trailingSlash) {
if (spec == null) return null;
var isFile = spec.startsWith ("file:");
try {
if (isFile) return org.eclipse.osgi.framework.debug.FrameworkDebugOptions.adjustTrailingSlash ( new java.io.File (spec.substring (5)).toURL (), trailingSlash);
return  new java.net.URL (spec);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
if (isFile) return null;
try {
return org.eclipse.osgi.framework.debug.FrameworkDebugOptions.adjustTrailingSlash ( new java.io.File (spec).toURL (), trailingSlash);
} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
return null;
} else {
throw e1;
}
}
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S,~B");
c$.adjustTrailingSlash = Clazz.defineMethod (c$, "adjustTrailingSlash", 
($fz = function (url, trailingSlash) {
var file = url.getFile ();
if (trailingSlash == (file.endsWith ("/"))) return url;
file = trailingSlash ? file + "/" : file.substring (0, file.length - 1);
return  new java.net.URL (url.getProtocol (), url.getHost (), file);
}, $fz.isPrivate = true, $fz), "java.net.URL,~B");
Clazz.makeConstructor (c$, 
($fz = function () {
this.loadOptions ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getBooleanOption", 
function (option, defaultValue) {
var optionValue = this.getOption (option);
return (optionValue != null && optionValue.equalsIgnoreCase ("true")) || defaultValue;
}, "~S,~B");
Clazz.defineMethod (c$, "getOption", 
function (option) {
return this.options != null ? this.options.getProperty (option) : null;
}, "~S");
Clazz.defineMethod (c$, "getOption", 
function (option, defaultValue) {
return this.options != null ? this.options.getProperty (option, defaultValue) : defaultValue;
}, "~S,~S");
Clazz.overrideMethod (c$, "getIntegerOption", 
function (option, defaultValue) {
var value = this.getOption (option);
try {
return value == null ? defaultValue : Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.overrideMethod (c$, "setOption", 
function (option, value) {
if (this.options != null) this.options.put (option, value.trim ());
}, "~S,~S");
Clazz.defineMethod (c$, "isDebugEnabled", 
($fz = function () {
return this.options != null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadOptions", 
($fz = function () {
var debugOptionsFilename = System.getProperty ("osgi.debug");
if (debugOptionsFilename == null) return ;
this.options =  new java.util.Properties ();
var optionsFile;
if (debugOptionsFilename.length == 0) {
var userDir = System.getProperty ("user.dir").$replace (java.io.File.separatorChar, '/');
if (!userDir.endsWith ("/")) userDir += "/";
debugOptionsFilename =  new java.io.File (userDir, ".options").toString ();
}optionsFile = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.buildURL (debugOptionsFilename, false);
if (optionsFile == null) {
System.out.println ("Unable to construct URL for options file: " + debugOptionsFilename);
return ;
}System.out.print ("Debug options:\n    " + optionsFile.toExternalForm ());
try {
var input = optionsFile.openStream ();
try {
this.options.load (input);
System.out.println (" loaded");
} finally {
input.close ();
}
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
System.out.println (" not found");
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
System.out.println (" did not parse");
e.printStackTrace (System.out);
}
} else {
throw e$$;
}
}
for (var i = this.options.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
this.options.put (key, (this.options.get (key)).trim ());
}
if (this.options.size () == 0) this.options = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"singleton", null,
"debugEnabled", true,
"OPTIONS", ".options");
});
