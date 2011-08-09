Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.ILogListener"], "org.eclipse.core.internal.runtime.PlatformLogWriter", ["java.lang.StringBuffer", "java.util.ArrayList", "org.eclipse.osgi.framework.log.FrameworkLogEntry"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frameworkLog = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformLogWriter", null, org.eclipse.core.runtime.ILogListener);
Clazz.makeConstructor (c$, 
function (frameworkLog) {
this.frameworkLog = frameworkLog;
}, "org.eclipse.osgi.framework.log.FrameworkLog");
Clazz.overrideMethod (c$, "logging", 
function (status, plugin) {
this.frameworkLog.log (this.getLog (status));
}, "org.eclipse.core.runtime.IStatus,~S");
Clazz.defineMethod (c$, "getLog", 
function (status) {
var entry =  new StringBuffer ();
entry.append (status.getPlugin ()).append (" ");
entry.append (Integer.toString (status.getSeverity ())).append (" ");
entry.append (Integer.toString (status.getCode ()));
var t = status.getException ();
var childlist =  new java.util.ArrayList ();
var stackCode = Clazz.instanceOf (t, org.eclipse.core.runtime.CoreException) ? 1 : 0;
if (stackCode == 1) {
var coreStatus = (t).getStatus ();
if (coreStatus != null) {
childlist.add (this.getLog (coreStatus));
}}if (status.isMultiStatus ()) {
var children = status.getChildren ();
for (var i = 0; i < children.length; i++) {
childlist.add (this.getLog (children[i]));
}
}var children = (childlist.size () == 0 ? null : childlist.toArray ( new Array (childlist.size ())));
return  new org.eclipse.osgi.framework.log.FrameworkLogEntry (entry.toString (), status.getMessage (), stackCode, t, children);
}, "org.eclipse.core.runtime.IStatus");
});
