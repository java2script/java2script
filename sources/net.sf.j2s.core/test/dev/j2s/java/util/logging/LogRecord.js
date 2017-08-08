Clazz.declarePackage ("java.util.logging");
Clazz.load (null, "java.util.logging.LogRecord", ["java.lang.NullPointerException", "$.Throwable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.level = null;
this.sequenceNumber = 0;
this.sourceClassName = null;
this.sourceMethodName = null;
this.message = null;
this.threadID = 0;
this.millis = 0;
this.thrown = null;
this.loggerName = null;
this.resourceBundleName = null;
this.needToInferCaller = false;
this.parameters = null;
this.resourceBundle = null;
Clazz.instantialize (this, arguments);
}, java.util.logging, "LogRecord", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (level, msg) {
level.getClass ();
this.level = level;
this.message = msg;
this.millis = System.currentTimeMillis ();
this.needToInferCaller = true;
}, "java.util.logging.Level,~S");
Clazz.defineMethod (c$, "getLoggerName", 
function () {
return this.loggerName;
});
Clazz.defineMethod (c$, "setLoggerName", 
function (name) {
this.loggerName = name;
}, "~S");
Clazz.defineMethod (c$, "getResourceBundle", 
function () {
return this.resourceBundle;
});
Clazz.defineMethod (c$, "setResourceBundle", 
function (bundle) {
this.resourceBundle = bundle;
}, "java.util.ResourceBundle");
Clazz.defineMethod (c$, "getResourceBundleName", 
function () {
return this.resourceBundleName;
});
Clazz.defineMethod (c$, "setResourceBundleName", 
function (name) {
this.resourceBundleName = name;
}, "~S");
Clazz.defineMethod (c$, "getLevel", 
function () {
return this.level;
});
Clazz.defineMethod (c$, "setLevel", 
function (level) {
if (level == null) {
throw  new NullPointerException ();
}this.level = level;
}, "java.util.logging.Level");
Clazz.defineMethod (c$, "getSequenceNumber", 
function () {
return this.sequenceNumber;
});
Clazz.defineMethod (c$, "setSequenceNumber", 
function (seq) {
this.sequenceNumber = seq;
}, "~N");
Clazz.defineMethod (c$, "getSourceClassName", 
function () {
if (this.needToInferCaller) {
this.inferCaller ();
}return this.sourceClassName;
});
Clazz.defineMethod (c$, "setSourceClassName", 
function (sourceClassName) {
this.sourceClassName = sourceClassName;
this.needToInferCaller = false;
}, "~S");
Clazz.defineMethod (c$, "getSourceMethodName", 
function () {
if (this.needToInferCaller) {
this.inferCaller ();
}return this.sourceMethodName;
});
Clazz.defineMethod (c$, "setSourceMethodName", 
function (sourceMethodName) {
this.sourceMethodName = sourceMethodName;
this.needToInferCaller = false;
}, "~S");
Clazz.defineMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.defineMethod (c$, "setMessage", 
function (message) {
this.message = message;
}, "~S");
Clazz.defineMethod (c$, "getParameters", 
function () {
return this.parameters;
});
Clazz.defineMethod (c$, "setParameters", 
function (parameters) {
this.parameters = parameters;
}, "~A");
Clazz.defineMethod (c$, "getThreadID", 
function () {
return this.threadID;
});
Clazz.defineMethod (c$, "setThreadID", 
function (threadID) {
this.threadID = threadID;
}, "~N");
Clazz.defineMethod (c$, "getMillis", 
function () {
return this.millis;
});
Clazz.defineMethod (c$, "setMillis", 
function (millis) {
this.millis = millis;
}, "~N");
Clazz.defineMethod (c$, "getThrown", 
function () {
return this.thrown;
});
Clazz.defineMethod (c$, "setThrown", 
function (thrown) {
this.thrown = thrown;
}, "Throwable");
Clazz.defineMethod (c$, "inferCaller", 
 function () {
this.needToInferCaller = false;
var stack = ( new Throwable ()).getStackTrace ();
var ix = 0;
while (ix < stack.length) {
var frame = stack[ix];
var cname = frame.getClassName ();
if (cname.equals ("java.util.logging.Logger")) {
break;
}ix++;
}
while (ix < stack.length) {
var frame = stack[ix];
var cname = frame.getClassName ();
if (!cname.equals ("java.util.logging.Logger")) {
this.setSourceClassName (cname);
this.setSourceMethodName (frame.getMethodName ());
return;
}ix++;
}
});
Clazz.defineStatics (c$,
"globalSequenceNumber", 0);
});
