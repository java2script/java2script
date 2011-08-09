Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (null, "org.eclipse.core.runtime.internal.adaptor.BundleStopper", ["java.lang.StringBuffer", "java.util.Hashtable", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stoppedBundles = null;
this.allToStop = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "BundleStopper");
Clazz.makeConstructor (c$, 
function (context) {
this.context = context;
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "logCycles", 
($fz = function (cycles) {
if (false) return ;
if (cycles.length > 0) {
var cycleText =  new StringBuffer ("[");
for (var i = 0; i < cycles.length; i++) {
cycleText.append ('[');
for (var j = 0; j < cycles[i].length; j++) {
cycleText.append ((cycles[i][j]).getSymbolicName ());
cycleText.append (',');
}
cycleText.insert (cycleText.length () - 1, ']');
}
cycleText.setCharAt (cycleText.length () - 1, ']');
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_BUNDLESTOPPER_CYCLES_FOUND, cycleText);
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, null, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
}}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "stopBundles", 
function () {
this.allToStop = org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getState ().getResolvedBundles ();
var stateHelper = org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getPlatformAdmin ().getStateHelper ();
var cycles = stateHelper.sortBundles (this.allToStop);
this.logCycles (cycles);
this.stoppedBundles =  new java.util.Hashtable (this.allToStop.length);
this.basicStopBundles ();
});
Clazz.defineMethod (c$, "basicStopBundles", 
($fz = function () {
for (var stoppingIndex = this.allToStop.length - 1; stoppingIndex >= 0; stoppingIndex--) {
var toStop = this.context.getBundle (this.allToStop[stoppingIndex].getBundleId ());
if (toStop.getBundleId () != 0 && (toStop.getBundleData ()).isAutoStartable ()) {
try {
if ((toStop.getState () == 32) && (Clazz.instanceOf (toStop, org.eclipse.osgi.framework.internal.core.BundleHost))) toStop.stop ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_BUNDLESTOPPER_ERROR_STOPPING_BUNDLE, this.allToStop[stoppingIndex].toString ());
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
} else {
throw e;
}
} finally {
this.stoppedBundles.put (toStop, toStop);
}
}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isStopped", 
function (bundle) {
if (this.stoppedBundles == null) return false;
return this.stoppedBundles.get (bundle) != null;
}, "org.osgi.framework.Bundle");
});
