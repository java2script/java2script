Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.AbstractBundle"], "org.eclipse.osgi.framework.internal.core.BundleFragment", ["java.lang.ClassNotFoundException", "$.Exception", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Msg", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hosts = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleFragment", org.eclipse.osgi.framework.internal.core.AbstractBundle);
Clazz.makeConstructor (c$, 
function (bundledata, framework) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleFragment, [bundledata, framework]);
this.hosts = null;
}, "org.eclipse.osgi.framework.adaptor.BundleData,org.eclipse.osgi.framework.internal.core.Framework");
Clazz.overrideMethod (c$, "load", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (2)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.load called when state != INSTALLED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}if (this.framework.isActive ()) {
var sm = System.getSecurityManager ();
if (sm != null && this.framework.permissionAdmin != null) {
this.domain = this.framework.permissionAdmin.createProtectionDomain (this);
}}});
Clazz.overrideMethod (c$, "reload", 
function (newBundle) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (6)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.reload called when state != INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}var exporting = false;
if (this.framework.isActive ()) {
if (this.hosts != null) {
if (this.state == 4) {
exporting = true;
this.hosts = null;
this.state = 2;
}}} else {
try {
this.bundledata.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if (!exporting) {
try {
this.bundledata.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}this.bundledata = newBundle.bundledata;
this.bundledata.setBundle (this);
if (this.framework.isActive () && System.getSecurityManager () != null && this.framework.permissionAdmin != null) this.domain = this.framework.permissionAdmin.createProtectionDomain (this);
return (exporting);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.overrideMethod (c$, "refresh", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (7)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.refresh called when state != UNINSTALLED | INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}if (this.state == 4) {
this.hosts = null;
this.state = 2;
}this.manifestLocalization = null;
});
Clazz.overrideMethod (c$, "unload", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (7)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.unload called when state != UNINSTALLED | INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}var exporting = false;
if (this.framework.isActive ()) {
if (this.hosts != null) {
if (this.state == 4) {
exporting = true;
this.hosts = null;
this.state = 2;
}this.domain = null;
}}if (!exporting) {
try {
this.bundledata.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}return (exporting);
});
Clazz.defineMethod (c$, "loadClass", 
function (name, checkPermission) {
if (checkPermission) {
try {
this.framework.checkAdminPermission (this, "class");
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
throw  new ClassNotFoundException ();
} else {
throw e;
}
}
this.checkValid ();
}throw  new ClassNotFoundException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_FRAGMENT_CNFE, name));
}, "~S,~B");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
this.checkValid ();
return (null);
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (name) {
this.checkValid ();
return null;
}, "~S");
Clazz.overrideMethod (c$, "startWorker", 
function (persistent) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_FRAGMENT_START, this));
}, "~B");
Clazz.overrideMethod (c$, "stopWorker", 
function (persistent) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_FRAGMENT_STOP, this));
}, "~B");
Clazz.overrideMethod (c$, "getRegisteredServices", 
function () {
this.checkValid ();
return null;
});
Clazz.overrideMethod (c$, "getServicesInUse", 
function () {
this.checkValid ();
return null;
});
Clazz.overrideMethod (c$, "getHosts", 
function () {
return this.hosts;
});
Clazz.overrideMethod (c$, "isFragment", 
function () {
return true;
});
Clazz.defineMethod (c$, "addHost", 
function (host) {
if (host == null) return false;
try {
(host.getBundleHost ()).attachFragment (this);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, host.getBundleHost (), be);
return false;
} else {
throw be;
}
}
if (this.hosts == null) {
this.hosts = [host];
return true;
}for (var i = 0; i < this.hosts.length; i++) {
if (host.getBundleHost () === this.hosts[i].getBundleHost ()) return true;
}
var newHosts =  new Array (this.hosts.length + 1);
System.arraycopy (this.hosts, 0, newHosts, 0, this.hosts.length);
newHosts[newHosts.length - 1] = host;
this.hosts = newHosts;
return true;
}, "org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
Clazz.overrideMethod (c$, "getBundleLoader", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getContext", 
function () {
return null;
});
});
