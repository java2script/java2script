Clazz.declarePackage ("org.eclipse.osgi.framework.internal.defaultadaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"], "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor", ["java.io.File", "$.IOException", "java.lang.Long", "java.security.AccessController", "$.PrivilegedExceptionAction", "java.util.ArrayList", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultElementFactory", "$.DefaultLog", "$.MetaData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fwMetadata = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.defaultadaptor, "DefaultAdaptor", org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor);
Clazz.overrideMethod (c$, "getInstalledBundles", 
function () {
var list = this.getBundleStoreRootDir ().list ();
if (list == null) {
return null;
}var bundleDatas =  new java.util.ArrayList (list.length);
for (var i = 0; i < list.length; i++) {
try {
var data;
var id = -1;
try {
id = Long.parseLong (list[i]);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
continue ;} else {
throw nfe;
}
}
data = this.getElementFactory ().createBundleData (this, id);
this.loadMetaDataFor (data);
data.initializeExistingBundle ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleData created: " + data);
}this.processExtension (data, 1);
bundleDatas.add (data);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.osgi.framework.BundleException)) {
var e = e$$;
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to open Bundle[" + list[i] + "]: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to open Bundle[" + list[i] + "]: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}}
} else {
throw e$$;
}
}
}
return bundleDatas.toArray ( new Array (bundleDatas.size ()));
});
Clazz.defineMethod (c$, "setInitialBundleStartLevel", 
function (value) {
Clazz.superCall (this, org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor, "setInitialBundleStartLevel", [value]);
try {
this.persistInitialBundleStartLevel (value);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.eventPublisher.publishFrameworkEvent (2, this.context.getBundle (), e);
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "persistInitialBundleStartLevel", 
function (value) {
this.fwMetadata.setInt ("METADATA_ADAPTOR_IBSL", value);
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.defaultadaptor, "DefaultAdaptor$1", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor"].fwMetadata.save ();
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.defaultadaptor.DefaultAdaptor$1, i$, v$);
}) (this, null));
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.io.IOException)) {
throw e.getException ();
}throw e.getException ();
} else {
throw e;
}
}
}, "~N");
Clazz.overrideMethod (c$, "getElementFactory", 
function () {
if (this.elementFactory == null) this.elementFactory =  new org.eclipse.osgi.framework.internal.defaultadaptor.DefaultElementFactory ();
return this.elementFactory;
});
Clazz.defineMethod (c$, "loadMetaDataFor", 
function (data) {
var bundleMetaData = ( new org.eclipse.osgi.framework.internal.defaultadaptor.MetaData ( new java.io.File (data.getBundleStoreDir (), ".bundle"), "Bundle metadata"));
bundleMetaData.load ();
data.setLocation (bundleMetaData.get ("METADATA_BUNDLE_LOC", null));
data.setFileName (bundleMetaData.get ("METADATA_BUNDLE_NAME", null));
data.setGeneration (bundleMetaData.getInt ("METADATA_BUNDLE_GEN", -1));
data.setNativePaths (bundleMetaData.get ("METADATA_BUNDLE_NCP", null));
data.setStartLevel (bundleMetaData.getInt ("METADATA_BUNDLE_ABSL", 1));
data.setStatus (bundleMetaData.getInt ("METADATA_BUNDLE_STATUS", 0));
data.setReference (bundleMetaData.getBoolean ("METADATA_BUNDLE_REF", false));
data.setLastModified (bundleMetaData.getLong ("METADATA_LAST_MODIFIED", 0));
if (data.getGeneration () == -1 || data.getFileName () == null || data.getLocation () == null) {
throw  new java.io.IOException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION);
}}, "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultBundleData");
Clazz.defineMethod (c$, "saveMetaDataFor", 
function (data) {
var bundleMetadata = ( new org.eclipse.osgi.framework.internal.defaultadaptor.MetaData ( new java.io.File ((data).createBundleStoreDir (), ".bundle"), "Bundle metadata"));
bundleMetadata.load ();
bundleMetadata.set ("METADATA_BUNDLE_LOC", data.getLocation ());
bundleMetadata.set ("METADATA_BUNDLE_NAME", data.getFileName ());
bundleMetadata.setInt ("METADATA_BUNDLE_GEN", data.getGeneration ());
var nativePaths = data.getNativePathsString ();
if (nativePaths != null) {
bundleMetadata.set ("METADATA_BUNDLE_NCP", nativePaths);
}bundleMetadata.setInt ("METADATA_BUNDLE_ABSL", data.getStartLevel ());
bundleMetadata.setInt ("METADATA_BUNDLE_STATUS", data.getStatus ());
bundleMetadata.setBoolean ("METADATA_BUNDLE_REF", data.isReference ());
bundleMetadata.setLong ("METADATA_LAST_MODIFIED", data.getLastModified ());
bundleMetadata.save ();
}, "org.eclipse.osgi.framework.adaptor.core.AbstractBundleData");
Clazz.overrideMethod (c$, "persistNextBundleID", 
function (id) {
this.fwMetadata.setLong ("METADATA_ADAPTOR_NEXTID", this.nextId);
this.fwMetadata.save ();
}, "~N");
Clazz.overrideMethod (c$, "initializeMetadata", 
function () {
this.fwMetadata =  new org.eclipse.osgi.framework.internal.defaultadaptor.MetaData (this.getMetaDataFile (), "Framework metadata");
this.fwMetadata.load ();
this.nextId = this.fwMetadata.getLong ("METADATA_ADAPTOR_NEXTID", 1);
this.initialBundleStartLevel = this.fwMetadata.getInt ("METADATA_ADAPTOR_IBSL", 1);
});
Clazz.overrideMethod (c$, "createFrameworkLog", 
function () {
return  new org.eclipse.osgi.framework.internal.defaultadaptor.DefaultLog ();
});
Clazz.defineStatics (c$,
"METADATA_ADAPTOR_NEXTID", "METADATA_ADAPTOR_NEXTID",
"METADATA_ADAPTOR_IBSL", "METADATA_ADAPTOR_IBSL",
"METADATA_BUNDLE_GEN", "METADATA_BUNDLE_GEN",
"METADATA_BUNDLE_LOC", "METADATA_BUNDLE_LOC",
"METADATA_BUNDLE_REF", "METADATA_BUNDLE_REF",
"METADATA_BUNDLE_NAME", "METADATA_BUNDLE_NAME",
"METADATA_BUNDLE_NCP", "METADATA_BUNDLE_NCP",
"METADATA_BUNDLE_ABSL", "METADATA_BUNDLE_ABSL",
"METADATA_BUNDLE_STATUS", "METADATA_BUNDLE_STATUS",
"METADATA_BUNDLE_METADATA", "METADATA_BUNDLE_METADATA",
"METADATA_LAST_MODIFIED", "METADATA_LAST_MODIFIED");
});
