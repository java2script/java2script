Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.framework.BundleActivator"], "org.eclipse.osgi.framework.internal.core.SystemBundleActivator", ["java.util.Hashtable", "org.eclipse.osgi.framework.debug.FrameworkDebugOptions", "org.eclipse.osgi.service.debug.DebugOptions", "org.osgi.service.condpermadmin.ConditionalPermissionAdmin"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.bundle = null;
this.framework = null;
this.packageAdmin = null;
this.permissionAdmin = null;
this.condPermAdmin = null;
this.startLevel = null;
this.debugOptions = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SystemBundleActivator", null, org.osgi.framework.BundleActivator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "start", 
function (context) {
this.context = context;
this.bundle = context.getBundle ();
this.framework = this.bundle.framework;
if (this.framework.packageAdmin != null) this.packageAdmin = this.register ("org.osgi.service.packageadmin.PackageAdmin", this.framework.packageAdmin);
if (this.framework.permissionAdmin != null) this.permissionAdmin = this.register ("org.osgi.service.permissionadmin.PermissionAdmin", this.framework.permissionAdmin);
if (this.framework.startLevelManager != null) this.startLevel = this.register ("org.osgi.service.startlevel.StartLevel", this.framework.startLevelManager);
if (this.framework.condPermAdmin != null) this.condPermAdmin = this.register (org.osgi.service.condpermadmin.ConditionalPermissionAdmin.getName (), this.framework.condPermAdmin);
var dbgOptions = null;
if ((dbgOptions = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ()) != null) this.debugOptions = this.register (org.eclipse.osgi.service.debug.DebugOptions.getName (), dbgOptions);
this.framework.adaptor.frameworkStart (context);
this.framework.packageAdmin.setResolvedBundles (this.bundle);
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "stop", 
function (context) {
this.framework.adaptor.frameworkStop (context);
if (this.packageAdmin != null) this.packageAdmin.unregister ();
if (this.permissionAdmin != null) this.permissionAdmin.unregister ();
if (this.condPermAdmin != null) this.condPermAdmin.unregister ();
if (this.startLevel != null) this.startLevel.unregister ();
if (this.debugOptions != null) this.debugOptions.unregister ();
this.framework = null;
this.bundle = null;
this.context = null;
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "register", 
function (name, service) {
var properties =  new java.util.Hashtable (7);
var headers = this.bundle.getHeaders ();
properties.put ("service.vendor", headers.get ("Bundle-Vendor"));
properties.put ("service.ranking",  new Integer (2147483647));
properties.put ("service.pid", this.bundle.getBundleId () + "." + service.getClass ().getName ());
return this.context.registerService (name, service, properties);
}, "~S,~O");
});
