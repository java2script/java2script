Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.Status"], "org.eclipse.core.runtime.MultiStatus", ["java.lang.StringBuffer", "org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.children = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "MultiStatus", org.eclipse.core.runtime.Status);
Clazz.makeConstructor (c$, 
function (pluginId, code, newChildren, message, exception) {
this.construct (pluginId, code, message, exception);
org.eclipse.core.internal.runtime.Assert.isLegal (newChildren != null);
var maxSeverity = this.getSeverity ();
for (var i = 0; i < newChildren.length; i++) {
org.eclipse.core.internal.runtime.Assert.isLegal (newChildren[i] != null);
var severity = newChildren[i].getSeverity ();
if (severity > maxSeverity) maxSeverity = severity;
}
this.children =  new Array (newChildren.length);
this.setSeverity (maxSeverity);
System.arraycopy (newChildren, 0, this.children, 0, newChildren.length);
}, "~S,~N,~A,~S,Throwable");
Clazz.makeConstructor (c$, 
function (pluginId, code, message, exception) {
Clazz.superConstructor (this, org.eclipse.core.runtime.MultiStatus, [0, pluginId, code, message, exception]);
this.children =  new Array (0);
}, "~S,~N,~S,Throwable");
Clazz.defineMethod (c$, "add", 
function (status) {
org.eclipse.core.internal.runtime.Assert.isLegal (status != null);
var result =  new Array (this.children.length + 1);
System.arraycopy (this.children, 0, result, 0, this.children.length);
result[result.length - 1] = status;
this.children = result;
var newSev = status.getSeverity ();
if (newSev > this.getSeverity ()) {
this.setSeverity (newSev);
}}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "addAll", 
function (status) {
org.eclipse.core.internal.runtime.Assert.isLegal (status != null);
var statuses = status.getChildren ();
for (var i = 0; i < statuses.length; i++) {
this.add (statuses[i]);
}
}, "org.eclipse.core.runtime.IStatus");
Clazz.overrideMethod (c$, "getChildren", 
function () {
return this.children;
});
Clazz.overrideMethod (c$, "isMultiStatus", 
function () {
return true;
});
Clazz.defineMethod (c$, "merge", 
function (status) {
org.eclipse.core.internal.runtime.Assert.isLegal (status != null);
if (!status.isMultiStatus ()) {
this.add (status);
} else {
this.addAll (status);
}}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "toString", 
function () {
var buf =  new StringBuffer (Clazz.superCall (this, org.eclipse.core.runtime.MultiStatus, "toString", []));
buf.append (" children=[");
for (var i = 0; i < this.children.length; i++) {
if (i != 0) {
buf.append (" ");
}buf.append (this.children[i].toString ());
}
buf.append ("]");
return buf.toString ();
});
});
