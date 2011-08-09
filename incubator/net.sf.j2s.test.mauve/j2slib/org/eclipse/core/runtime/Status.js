Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.IStatus", "org.eclipse.core.internal.runtime.Assert"], "org.eclipse.core.runtime.Status", ["java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.severity = 0;
this.pluginId = null;
this.code = 0;
this.message = null;
this.exception = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "Status", null, org.eclipse.core.runtime.IStatus);
Clazz.makeConstructor (c$, 
function (severity, pluginId, code, message, exception) {
this.setSeverity (severity);
this.setPlugin (pluginId);
this.setCode (code);
this.setException (exception);
}, "~N,~S,~N,~S,Throwable");
Clazz.overrideMethod (c$, "getChildren", 
function () {
return org.eclipse.core.runtime.Status.theEmptyStatusArray;
});
Clazz.overrideMethod (c$, "getCode", 
function () {
return this.code;
});
Clazz.overrideMethod (c$, "getException", 
function () {
return this.exception;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.overrideMethod (c$, "getPlugin", 
function () {
return this.pluginId;
});
Clazz.overrideMethod (c$, "getSeverity", 
function () {
return this.severity;
});
Clazz.overrideMethod (c$, "isMultiStatus", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isOK", 
function () {
return this.severity == 0;
});
Clazz.overrideMethod (c$, "matches", 
function (severityMask) {
return (this.severity & severityMask) != 0;
}, "~N");
Clazz.defineMethod (c$, "setCode", 
function (code) {
this.code = code;
}, "~N");
Clazz.defineMethod (c$, "setException", 
function (exception) {
this.exception = exception;
}, "Throwable");
Clazz.defineMethod (c$, "setMessage", 
function (message) {
org.eclipse.core.internal.runtime.Assert.isLegal (message != null);
this.message = message;
}, "~S");
Clazz.defineMethod (c$, "setPlugin", 
function (pluginId) {
org.eclipse.core.internal.runtime.Assert.isLegal (pluginId != null && pluginId.length > 0);
this.pluginId = pluginId;
}, "~S");
Clazz.defineMethod (c$, "setSeverity", 
function (severity) {
org.eclipse.core.internal.runtime.Assert.isLegal (severity == 0 || severity == 4 || severity == 2 || severity == 1 || severity == 8);
this.severity = severity;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
var buf =  new StringBuffer ();
buf.append ("Status ");
if (this.severity == 0) {
buf.append ("OK");
} else if (this.severity == 4) {
buf.append ("ERROR");
} else if (this.severity == 2) {
buf.append ("WARNING");
} else if (this.severity == 1) {
buf.append ("INFO");
} else if (this.severity == 8) {
buf.append ("CANCEL");
} else {
buf.append ("severity=");
buf.append (this.severity);
}buf.append (": ");
buf.append (this.pluginId);
buf.append (" code=");
buf.append (this.code);
buf.append (' ');
buf.append (this.message);
buf.append (' ');
buf.append (this.exception);
return buf.toString ();
});
c$.OK_STATUS = c$.prototype.OK_STATUS =  new org.eclipse.core.runtime.Status (0, "org.eclipse.core.runtime", 0, "OK", null);
c$.CANCEL_STATUS = c$.prototype.CANCEL_STATUS =  new org.eclipse.core.runtime.Status (8, "org.eclipse.core.runtime", 1, "", null);
c$.theEmptyStatusArray = c$.prototype.theEmptyStatusArray =  new Array (0);
});
