Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.DevClassPathHelper", ["java.net.URL", "java.util.Properties", "$.StringTokenizer", "$.Vector"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "DevClassPathHelper");
c$.getDevClassPath = Clazz.defineMethod (c$, "getDevClassPath", 
function (id) {
var result = null;
if (id != null && org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties != null) {
var entry = org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties.getProperty (id);
if (entry != null) result = org.eclipse.core.internal.runtime.DevClassPathHelper.getArrayFromList (entry);
}if (result == null) result = org.eclipse.core.internal.runtime.DevClassPathHelper.devDefaultClasspath;
return result;
}, "~S");
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
function (prop) {
if (prop == null || prop.trim ().equals ("")) return  new Array (0);
var list =  new java.util.Vector ();
var tokens =  new java.util.StringTokenizer (prop, ",");
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.addElement (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, "~S");
c$.inDevelopmentMode = Clazz.defineMethod (c$, "inDevelopmentMode", 
function () {
return org.eclipse.core.internal.runtime.DevClassPathHelper.$inDevelopmentMode;
});
c$.load = Clazz.defineMethod (c$, "load", 
($fz = function (url) {
var props =  new java.util.Properties ();
try {
var is = null;
try {
is = url.openStream ();
props.load (is);
} finally {
if (is != null) is.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return props;
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineStatics (c$,
"$inDevelopmentMode", false,
"devDefaultClasspath", null,
"devProperties", null);
{
var osgiDev = System.getProperty ("osgi.dev");
if (osgiDev != null) {
try {
($t$ = org.eclipse.core.internal.runtime.DevClassPathHelper.$inDevelopmentMode = true, org.eclipse.core.internal.runtime.DevClassPathHelper.prototype.$inDevelopmentMode = org.eclipse.core.internal.runtime.DevClassPathHelper.$inDevelopmentMode, $t$);
var location =  new java.net.URL (osgiDev);
($t$ = org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties = org.eclipse.core.internal.runtime.DevClassPathHelper.load (location), org.eclipse.core.internal.runtime.DevClassPathHelper.prototype.devProperties = org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties, $t$);
if (org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties != null) ($t$ = org.eclipse.core.internal.runtime.DevClassPathHelper.devDefaultClasspath = org.eclipse.core.internal.runtime.DevClassPathHelper.getArrayFromList (org.eclipse.core.internal.runtime.DevClassPathHelper.devProperties.getProperty ("*")), org.eclipse.core.internal.runtime.DevClassPathHelper.prototype.devDefaultClasspath = org.eclipse.core.internal.runtime.DevClassPathHelper.devDefaultClasspath, $t$);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
($t$ = org.eclipse.core.internal.runtime.DevClassPathHelper.devDefaultClasspath = org.eclipse.core.internal.runtime.DevClassPathHelper.getArrayFromList (osgiDev), org.eclipse.core.internal.runtime.DevClassPathHelper.prototype.devDefaultClasspath = org.eclipse.core.internal.runtime.DevClassPathHelper.devDefaultClasspath, $t$);
} else {
throw e;
}
}
}}});
