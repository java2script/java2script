Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.Policy", ["java.lang.StringBuffer", "$.Thread", "java.util.Date", "org.eclipse.core.runtime.NullProgressMonitor", "$.SubProgressMonitor"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "Policy");
c$.monitorFor = Clazz.defineMethod (c$, "monitorFor", 
function (monitor) {
if (monitor == null) return  new org.eclipse.core.runtime.NullProgressMonitor ();
return monitor;
}, "org.eclipse.core.runtime.IProgressMonitor");
c$.subMonitorFor = Clazz.defineMethod (c$, "subMonitorFor", 
function (monitor, ticks) {
if (monitor == null) return  new org.eclipse.core.runtime.NullProgressMonitor ();
if (Clazz.instanceOf (monitor, org.eclipse.core.runtime.NullProgressMonitor)) return monitor;
return  new org.eclipse.core.runtime.SubProgressMonitor (monitor, ticks);
}, "org.eclipse.core.runtime.IProgressMonitor,~N");
c$.subMonitorFor = Clazz.defineMethod (c$, "subMonitorFor", 
function (monitor, ticks, style) {
if (monitor == null) return  new org.eclipse.core.runtime.NullProgressMonitor ();
if (Clazz.instanceOf (monitor, org.eclipse.core.runtime.NullProgressMonitor)) return monitor;
return  new org.eclipse.core.runtime.SubProgressMonitor (monitor, ticks, style);
}, "org.eclipse.core.runtime.IProgressMonitor,~N,~N");
c$.debug = Clazz.defineMethod (c$, "debug", 
function (message) {
var buffer =  new StringBuffer ();
buffer.append ( new java.util.Date (System.currentTimeMillis ()));
buffer.append (" - [");
buffer.append (Thread.currentThread ().getName ());
buffer.append ("] ");
buffer.append (message);
System.out.println (buffer.toString ());
}, "~S");
});
