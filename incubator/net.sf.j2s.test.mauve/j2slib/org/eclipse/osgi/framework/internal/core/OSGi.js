Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (null, "org.eclipse.osgi.framework.internal.core.OSGi", ["org.eclipse.osgi.framework.internal.core.Framework", "$.Msg"], function () {
c$ = Clazz.decorateAsClass (function () {
this.framework = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "OSGi");
Clazz.makeConstructor (c$, 
function (adaptor) {
this.framework = this.createFramework (adaptor);
}, "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineMethod (c$, "close", 
function () {
this.framework.close ();
});
Clazz.defineMethod (c$, "launch", 
function () {
this.framework.launch ();
});
Clazz.defineMethod (c$, "shutdown", 
function () {
this.framework.shutdown ();
});
Clazz.defineMethod (c$, "isActive", 
function () {
return (this.framework.isActive ());
});
Clazz.defineMethod (c$, "getBundleContext", 
function () {
return (this.framework.systemBundle.getContext ());
});
Clazz.defineMethod (c$, "createFramework", 
function (adaptor) {
return ( new org.eclipse.osgi.framework.internal.core.Framework (adaptor));
}, "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineMethod (c$, "displayBanner", 
function () {
System.out.println ();
System.out.print (org.eclipse.osgi.framework.internal.core.Msg.ECLIPSE_OSGI_NAME);
System.out.print (" ");
System.out.println (org.eclipse.osgi.framework.internal.core.Msg.ECLIPSE_OSGI_VERSION);
System.out.println ();
System.out.println (org.eclipse.osgi.framework.internal.core.Msg.OSGI_VERSION);
System.out.println ();
System.out.println (org.eclipse.osgi.framework.internal.core.Msg.ECLIPSE_COPYRIGHT);
});
});
