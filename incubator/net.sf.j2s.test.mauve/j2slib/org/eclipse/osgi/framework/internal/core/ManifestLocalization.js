Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.PropertyResourceBundle", "$.ResourceBundle", "$.Hashtable"], "org.eclipse.osgi.framework.internal.core.ManifestLocalization", ["java.util.ArrayList", "$.Locale", "org.eclipse.osgi.framework.util.Headers"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.rawHeaders = null;
this.defaultLocaleHeaders = null;
this.cache = null;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.ManifestLocalization.LocalizationResourceBundle")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.ManifestLocalization, "LocalizationResourceBundle", java.util.PropertyResourceBundle, org.eclipse.osgi.framework.internal.core.ManifestLocalization.BundleResourceBundle);
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return false;
});
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.ManifestLocalization.EmptyResouceBundle")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.ManifestLocalization, "EmptyResouceBundle", java.util.ResourceBundle, org.eclipse.osgi.framework.internal.core.ManifestLocalization.BundleResourceBundle);
Clazz.overrideMethod (c$, "getKeys", 
function () {
return null;
});
Clazz.overrideMethod (c$, "handleGetObject", 
function (a) {
return null;
}, "~S");
Clazz.defineMethod (c$, "isEmpty", 
function () {
if (this.parent == null) return true;
return (this.parent).isEmpty ();
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ManifestLocalization");
Clazz.declareInterface (org.eclipse.osgi.framework.internal.core.ManifestLocalization, "BundleResourceBundle");
Clazz.prepareFields (c$, function () {
this.cache =  new java.util.Hashtable (5);
});
Clazz.makeConstructor (c$, 
function (bundle, rawHeaders) {
this.bundle = bundle;
this.rawHeaders = rawHeaders;
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle,java.util.Dictionary");
Clazz.defineMethod (c$, "getHeaders", 
function (localeString) {
if (localeString.length == 0) return (this.rawHeaders);
var isDefaultLocale = false;
var defaultLocale = java.util.Locale.getDefault ().toString ();
if (localeString.equals (defaultLocale)) {
if (this.defaultLocaleHeaders != null) return (this.defaultLocaleHeaders);
isDefaultLocale = true;
}try {
this.bundle.checkValid ();
} catch (ex) {
if (Clazz.instanceOf (ex, IllegalStateException)) {
if (this.defaultLocaleHeaders != null) return this.defaultLocaleHeaders;
return (this.rawHeaders);
} else {
throw ex;
}
}
var localeProperties = this.getResourceBundle (localeString);
if (localeProperties == null && !isDefaultLocale) localeProperties = this.getResourceBundle (defaultLocale);
var e = this.rawHeaders.keys ();
var localeHeaders =  new org.eclipse.osgi.framework.util.Headers (this.rawHeaders.size ());
while (e.hasMoreElements ()) {
var key = e.nextElement ();
var value = this.rawHeaders.get (key);
if (value.startsWith ("%") && (value.length > 1)) {
var propertiesKey = value.substring (1);
try {
value = localeProperties == null ? propertiesKey : localeProperties.getObject (propertiesKey);
} catch (ex) {
if (Clazz.instanceOf (ex, java.util.MissingResourceException)) {
value = propertiesKey;
} else {
throw ex;
}
}
}localeHeaders.set (key, value);
}
if (isDefaultLocale) {
this.defaultLocaleHeaders = localeHeaders;
}return (localeHeaders);
}, "~S");
Clazz.defineMethod (c$, "buildNLVariants", 
($fz = function (nl) {
var result =  new java.util.ArrayList ();
var lastSeparator;
while ((lastSeparator = nl.lastIndexOf ('_')) != -1) {
result.add (nl);
if (lastSeparator != -1) {
nl = nl.substring (0, lastSeparator);
}}
result.add (nl);
result.add ("");
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getResourceBundle", 
function (localeString) {
var propertiesLocation = this.rawHeaders.get ("Bundle-Localization");
if (propertiesLocation == null) {
propertiesLocation = "OSGI-INF/l10n/bundle";
}var result = this.cache.get (localeString);
if (result != null) return (result.isEmpty () ? null : result);
var nlVarients = this.buildNLVariants (localeString);
var parent = null;
for (var i = nlVarients.length - 1; i >= 0; i--) {
var varientBundle = this.cache.get (nlVarients[i]);
var varientURL = this.findResource (propertiesLocation + (nlVarients[i].equals ("") ? nlVarients[i] : '_' + nlVarients[i]) + ".properties");
if (varientURL != null) {
var resourceStream = null;
try {
resourceStream = varientURL.openStream ();
varientBundle = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.ManifestLocalization.LocalizationResourceBundle, this, null, resourceStream);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
} finally {
if (resourceStream != null) {
try {
resourceStream.close ();
} catch (e3) {
if (Clazz.instanceOf (e3, java.io.IOException)) {
} else {
throw e3;
}
}
}}
}if (varientBundle == null) {
varientBundle = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.ManifestLocalization.EmptyResouceBundle, this, null);
}if (parent != null) varientBundle.setParent (parent);
this.cache.put (nlVarients[i], varientBundle);
parent = varientBundle;
}
result = this.cache.get (localeString);
return (result.isEmpty () ? null : result);
}, "~S");
Clazz.defineMethod (c$, "findResource", 
($fz = function (resource) {
var searchBundle = this.bundle;
if (this.bundle.isResolved ()) {
if (this.bundle.isFragment () && this.bundle.getHosts () != null) {
searchBundle = this.bundle.getHosts ()[0].getBundleHost ();
if (searchBundle.getState () == 1) searchBundle = this.bundle;
}return this.findInResolved (resource, searchBundle);
}return this.findInBundle (resource, searchBundle);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "findInResolved", 
($fz = function (filePath, bundleHost) {
var result = this.findInBundle (filePath, bundleHost);
if (result != null) return result;
return this.findInFragments (filePath, bundleHost);
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "findInBundle", 
($fz = function (filePath, searchBundle) {
return searchBundle.getEntry (filePath);
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "findInFragments", 
($fz = function (filePath, searchBundle) {
var fragments = searchBundle.getFragments ();
var fileURL = null;
for (var i = 0; fragments != null && i < fragments.length && fileURL == null; i++) {
if (fragments[i].getState () != 1) fileURL = fragments[i].getEntry (filePath);
}
return fileURL;
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.osgi.framework.internal.core.AbstractBundle");
});
