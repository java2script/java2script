Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.DataArea", ["java.io.File", "java.lang.IllegalStateException", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.CoreException", "$.Path", "$.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.location = null;
this.initialized = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "DataArea");
Clazz.defineMethod (c$, "assertLocationInitialized", 
function () {
if (this.location != null && this.initialized) return ;
var service = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getInstanceLocation ();
if (service == null) throw  new IllegalStateException (org.eclipse.core.internal.runtime.Messages.meta_noDataModeSpecified);
try {
var url = service.getURL ();
if (url == null) throw  new IllegalStateException (org.eclipse.core.internal.runtime.Messages.meta_instanceDataUnspecified);
this.location =  new org.eclipse.core.runtime.Path ( new java.io.File (url.getFile ()).toString ());
this.initializeLocation ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw  new IllegalStateException (e.getMessage ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getMetadataLocation", 
function () {
this.assertLocationInitialized ();
return this.location.append (".metadata");
});
Clazz.defineMethod (c$, "getInstanceDataLocation", 
function () {
this.assertLocationInitialized ();
return this.location;
});
Clazz.defineMethod (c$, "getLogLocation", 
function () {
return  new org.eclipse.core.runtime.Path (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFrameworkLog ().getFile ().getAbsolutePath ());
});
Clazz.defineMethod (c$, "getStateLocation", 
function (bundle) {
this.assertLocationInitialized ();
return this.getStateLocation (bundle.getSymbolicName ());
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getStateLocation", 
function (bundleName) {
this.assertLocationInitialized ();
return this.getMetadataLocation ().append (".plugins").append (bundleName);
}, "~S");
Clazz.defineMethod (c$, "getPreferenceLocation", 
function (bundleName, create) {
var result = this.getStateLocation (bundleName);
if (create) result.toFile ().mkdirs ();
return result.append ("pref_store.ini");
}, "~S,~B");
Clazz.defineMethod (c$, "initializeLocation", 
($fz = function () {
if (this.location.toFile ().exists ()) {
if (!this.location.toFile ().isDirectory ()) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_notDir, this.location);
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 5, message, null));
}}if (this.location.getDevice () == null) this.location =  new org.eclipse.core.runtime.Path (this.location.toFile ().getAbsolutePath ());
this.createLocation ();
this.initialized = true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createLocation", 
($fz = function () {
var file = this.location.append (".metadata").toFile ();
try {
file.mkdirs ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_couldNotCreate, file.getAbsolutePath ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 5, message, e));
} else {
throw e;
}
}
if (!file.canWrite ()) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_readonly, file.getAbsolutePath ());
throw  new org.eclipse.core.runtime.CoreException ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 5, message, null));
}var path = this.location.append (".metadata").append (".log");
try {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFrameworkLog ().setFile (path.toFile (), true);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"F_META_AREA", ".metadata",
"F_PLUGIN_DATA", ".plugins",
"F_LOG", ".log",
"PREFERENCES_FILE_NAME", "pref_store.ini");
});
