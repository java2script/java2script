Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.Properties"], "org.eclipse.osgi.framework.internal.core.MessageResourceBundle", ["java.util.ArrayList", "$.Locale", "org.eclipse.osgi.framework.log.FrameworkLogEntry"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "MessageResourceBundle");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bundleName = null;
this.fields = null;
this.isAccessible = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.MessageResourceBundle, "MessagesProperties", java.util.Properties);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.MessageResourceBundle.MessagesProperties);
this.fields = a;
this.bundleName = b;
this.isAccessible = c;
}, "java.util.Map,~S,~B");
Clazz.overrideMethod (c$, "put", 
function (a, b) {
var c = this.fields.put (a, org.eclipse.osgi.framework.internal.core.MessageResourceBundle.ASSIGNED);
if (c === org.eclipse.osgi.framework.internal.core.MessageResourceBundle.ASSIGNED) return null;
if (c == null) {
var d = "NLS unused message: " + a + " in: " + this.bundleName;
if (org.eclipse.osgi.framework.debug.Debug.DEBUG_MESSAGE_BUNDLES) System.out.println (d);
org.eclipse.osgi.framework.internal.core.MessageResourceBundle.log (org.eclipse.osgi.framework.internal.core.MessageResourceBundle.SEVERITY_WARNING, d, null);
return null;
}var d = c;
if ((d.getModifiers () & 25) != 9) return null;
try {
d.set (null, b);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
org.eclipse.osgi.framework.internal.core.MessageResourceBundle.log (org.eclipse.osgi.framework.internal.core.MessageResourceBundle.SEVERITY_ERROR, "Exception setting field value.", e);
} else {
throw e;
}
}
return null;
}, "~O,~O");
Clazz.defineStatics (c$,
"MOD_EXPECTED", 9,
"MOD_MASK", 25);
c$ = Clazz.p0p ();
c$.buildVariants = Clazz.defineMethod (c$, "buildVariants", 
($fz = function (root) {
if (org.eclipse.osgi.framework.internal.core.MessageResourceBundle.nlSuffixes == null) {
var nl = java.util.Locale.getDefault ().toString ();
var result =  new java.util.ArrayList (4);
var lastSeparator;
while (true) {
result.add ('_' + nl + ".properties");
lastSeparator = nl.lastIndexOf ('_');
if (lastSeparator == -1) break;
nl = nl.substring (0, lastSeparator);
}
result.add (".properties");
($t$ = org.eclipse.osgi.framework.internal.core.MessageResourceBundle.nlSuffixes = result.toArray ( new Array (result.size ())), org.eclipse.osgi.framework.internal.core.MessageResourceBundle.prototype.nlSuffixes = org.eclipse.osgi.framework.internal.core.MessageResourceBundle.nlSuffixes, $t$);
}root = root.$replace ('.', '/');
var variants =  new Array (org.eclipse.osgi.framework.internal.core.MessageResourceBundle.nlSuffixes.length);
for (var i = 0; i < variants.length; i++) variants[i] = root + org.eclipse.osgi.framework.internal.core.MessageResourceBundle.nlSuffixes[i];

return variants;
}, $fz.isPrivate = true, $fz), "~S");
c$.load = Clazz.defineMethod (c$, "load", 
function (bundleName, clazz) {
}, "~S,Class");
c$.log = Clazz.defineMethod (c$, "log", 
function (severity, msg, e) {
if (org.eclipse.osgi.framework.internal.core.MessageResourceBundle.adaptor != null) org.eclipse.osgi.framework.internal.core.MessageResourceBundle.adaptor.getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi" + ' ' + severity + ' ' + 1, msg, 0, e, null));
 else {
System.out.println (msg);
if (e != null) e.printStackTrace ();
}}, "~N,~S,Exception");
c$.setAdaptor = Clazz.defineMethod (c$, "setAdaptor", 
function (adaptor) {
($t$ = org.eclipse.osgi.framework.internal.core.MessageResourceBundle.adaptor = adaptor, org.eclipse.osgi.framework.internal.core.MessageResourceBundle.prototype.adaptor = org.eclipse.osgi.framework.internal.core.MessageResourceBundle.adaptor, $t$);
}, "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineStatics (c$,
"adaptor", null);
c$.ASSIGNED = c$.prototype.ASSIGNED =  new Object ();
Clazz.defineStatics (c$,
"EXTENSION", ".properties",
"nlSuffixes", null,
"SEVERITY_ERROR", 0x04,
"SEVERITY_WARNING", 0x02);
});
