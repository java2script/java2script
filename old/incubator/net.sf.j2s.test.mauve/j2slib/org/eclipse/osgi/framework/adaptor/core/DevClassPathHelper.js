Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (null, "org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper", ["java.net.URL", "java.util.Properties", "$.StringTokenizer", "$.Vector"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor.core, "DevClassPathHelper");
c$.getDevClassPath = Clazz.defineMethod (c$, "getDevClassPath", 
($fz = function (id, properties, defaultClasspath) {
var result = null;
if (id != null && properties != null) {
var entry = properties.get (id);
if (entry != null) result = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getArrayFromList (entry);
}if (result == null) result = defaultClasspath;
return result;
}, $fz.isPrivate = true, $fz), "~S,java.util.Dictionary,~A");
c$.getDevClassPath = Clazz.defineMethod (c$, "getDevClassPath", 
function (id, properties) {
if (properties == null) return org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (id, org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devProperties, org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devDefaultClasspath);
return org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (id, properties, org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getArrayFromList (properties.get ("*")));
}, "~S,java.util.Dictionary");
c$.getDevClassPath = Clazz.defineMethod (c$, "getDevClassPath", 
function (id) {
return org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (id, null);
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
return org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.$inDevelopmentMode;
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
($t$ = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.$inDevelopmentMode = true, org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.prototype.$inDevelopmentMode = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.$inDevelopmentMode, $t$);
var location =  new java.net.URL (osgiDev);
($t$ = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devProperties = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.load (location), org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.prototype.devProperties = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devProperties, $t$);
if (org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devProperties != null) ($t$ = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devDefaultClasspath = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getArrayFromList (org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devProperties.get ("*")), org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.prototype.devDefaultClasspath = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devDefaultClasspath, $t$);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
($t$ = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devDefaultClasspath = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getArrayFromList (osgiDev), org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.prototype.devDefaultClasspath = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.devDefaultClasspath, $t$);
} else {
throw e;
}
}
}}});
