Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.Vector", "org.eclipse.osgi.framework.internal.core.Framework"], "org.eclipse.osgi.framework.internal.core.BundleNativeCode", ["java.lang.StringBuffer", "org.eclipse.osgi.framework.internal.core.FilterImpl", "$.Msg", "org.eclipse.osgi.service.resolver.VersionRange", "org.osgi.framework.BundleException", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nativepaths = null;
this.processor = null;
this.osname = null;
this.language = null;
this.osversion = null;
this.filterString = null;
this.bundle = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleNativeCode");
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core.BundleNativeCode, "Attribute", java.util.Vector);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute, [10, 10]);
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
for (var b = 0; b < this.elementCount; b++) {
var c = this.elementData[b];
if (Clazz.instanceOf (c, String)) {
if (this.elementData[b].equals (a)) {
return (true);
}} else {
var d = (c).elements ();
while (d.hasMoreElements ()) {
if ((d.nextElement ()).equals (a)) {
return true;
}}
}}
return (false);
}, "~O");
Clazz.defineMethod (c$, "addElement", 
function (a) {
if (!this.contains (a)) {
Clazz.superCall (this, org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute, "addElement", [a]);
}}, "~O");
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function (element, bundle) {
this.bundle = bundle;
var nativePaths = element.getValueComponents ();
for (var i = 0; i < nativePaths.length; i++) {
this.addPath (nativePaths[i]);
}
this.setAttribute (element, "osname");
this.setAttribute (element, "processor");
this.setAttribute (element, "osversion");
this.setAttribute (element, "language");
this.setAttribute (element, "selection-filter");
}, "org.eclipse.osgi.util.ManifestElement,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "setAttribute", 
($fz = function (element, attribute) {
var attrValues = element.getAttributes (attribute);
if (attrValues != null) {
for (var i = 0; i < attrValues.length; i++) {
this.addAttribute (attribute, attrValues[i]);
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement,~S");
Clazz.defineMethod (c$, "getPaths", 
function () {
if (this.nativepaths == null) {
return null;
}var paths =  new Array (this.nativepaths.size ());
this.nativepaths.toArray (paths);
return (paths);
});
Clazz.defineMethod (c$, "addPath", 
function (nativepath) {
if (this.nativepaths == null) {
this.nativepaths =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute ();
}this.nativepaths.addElement (nativepath);
}, "~S");
Clazz.defineMethod (c$, "addAttribute", 
function (key, value) {
if (key.equals ("processor")) {
if (this.processor == null) {
this.processor =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute ();
}this.processor.addElement (org.eclipse.osgi.framework.internal.core.BundleNativeCode.aliasMapper.aliasProcessor (value));
return ;
}if (key.equals ("osname")) {
if (this.osname == null) {
this.osname =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute ();
}this.osname.addElement (org.eclipse.osgi.framework.internal.core.BundleNativeCode.aliasMapper.aliasOSName (value));
return ;
}if (key.equals ("osversion")) {
if (this.osversion == null) {
this.osversion =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute ();
}this.osversion.addElement ( new org.eclipse.osgi.service.resolver.VersionRange (value));
return ;
}if (key.equals ("selection-filter")) {
if (this.filterString == null) {
this.filterString = value;
}return ;
}if (key.equals ("language")) {
if (this.language == null) {
this.language =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode.Attribute ();
}this.language.addElement (value.toLowerCase ());
return ;
}}, "~S,~S");
Clazz.defineMethod (c$, "toString", 
function () {
var size = this.nativepaths.size ();
var sb =  new StringBuffer (50 * size);
for (var i = 0; i < size; i++) {
if (i > 0) {
sb.append (';');
}sb.append (this.nativepaths.elementAt (i).toString ());
}
if (this.processor != null) {
size = this.processor.size ();
for (var i = 0; i < size; i++) {
sb.append (';');
sb.append ("processor");
sb.append ('=');
sb.append (this.processor.elementAt (i).toString ());
}
}if (this.osname != null) {
size = this.osname.size ();
for (var i = 0; i < size; i++) {
sb.append (';');
sb.append ("osname");
sb.append ('=');
sb.append (this.osname.elementAt (i).toString ());
}
}if (this.osversion != null) {
size = this.osversion.size ();
for (var i = 0; i < size; i++) {
sb.append (';');
sb.append ("osversion");
sb.append ('=');
sb.append (this.osversion.elementAt (i).toString ());
}
}if (this.language != null) {
size = this.language.size ();
for (var i = 0; i < size; i++) {
sb.append (';');
sb.append ("language");
sb.append ('=');
sb.append (this.language.elementAt (i).toString ());
}
}return (sb.toString ());
});
Clazz.defineMethod (c$, "matchProcessorOSNameFilter", 
function (processor, osname) {
if ((this.processor == null) || (this.osname == null)) {
return (0);
}var otherProcessor = org.eclipse.osgi.framework.internal.core.BundleNativeCode.aliasMapper.aliasProcessor (processor);
var otherOSName = org.eclipse.osgi.framework.internal.core.BundleNativeCode.aliasMapper.aliasOSName (osname);
if (this.processor.equals (otherProcessor) && this.osname.equals (otherOSName) && this.matchFilter ()) {
return (1);
}return (0);
}, "~S,~S");
Clazz.defineMethod (c$, "matchOSVersion", 
function (version) {
if (this.osversion == null) return org.osgi.framework.Version.emptyVersion;
var result = null;
var size = this.osversion.size ();
for (var i = 0; i < size; i++) {
var range = this.osversion.elementAt (i);
if (range.isIncluded (version) && (result == null || (range.getMinimum ().compareTo (result) > 0))) result = range.getMinimum ();
}
return result;
}, "org.osgi.framework.Version");
Clazz.defineMethod (c$, "matchLanguage", 
function (language) {
if (this.language == null) {
return (1);
}if (this.language.equals (language.toLowerCase ())) {
return (2);
}return (0);
}, "~S");
Clazz.defineMethod (c$, "matchFilter", 
function () {
if (this.filterString == null) {
return true;
}var filter;
try {
filter =  new org.eclipse.osgi.framework.internal.core.FilterImpl (this.filterString);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_NATIVECODE_INVALID_FILTER, e);
this.bundle.framework.publishFrameworkEvent (2, this.bundle, be);
return false;
} else {
throw e;
}
}
return filter.match (System.getProperties ());
});
c$.aliasMapper = c$.prototype.aliasMapper = org.eclipse.osgi.framework.internal.core.Framework.aliasMapper;
});
