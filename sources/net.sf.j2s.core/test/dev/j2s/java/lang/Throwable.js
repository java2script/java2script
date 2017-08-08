;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Throwable", null, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.detailMessage = null;
this.cause = this;
this.stackTrace = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
this.fillInStackTrace ();
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (message) {
C$.$init$.apply(this);
this.fillInStackTrace ();
this.detailMessage = message;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Throwable', function (message, cause) {
C$.$init$.apply(this);
this.fillInStackTrace ();
this.detailMessage = message;
this.cause = cause;
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (cause) {
C$.$init$.apply(this);
this.fillInStackTrace ();
this.detailMessage = (cause == null ? null : cause.toString ());
this.cause = cause;
}, 1);

Clazz.newMethod$ (C$, 'getMessage', function () {
{
if (typeof this.message != "undefined") {
return this.message;
}
}return this.detailMessage;
});

Clazz.newMethod$ (C$, 'getLocalizedMessage', function () {
return this.getMessage ();
});

Clazz.newMethod$ (C$, 'getCause', function () {
return (this.cause === this ? null : this.cause);
});

Clazz.newMethod$ (C$, 'initCause$Throwable', function (cause) {
if (this.cause !== this) throw Clazz.$new(IllegalStateException.construct$S,["Can't overwrite cause"]);
if (cause === this) throw Clazz.$new(IllegalArgumentException.construct$S,["Self-causation not permitted"]);
this.cause = cause;
return this;
});

Clazz.newMethod$ (C$, 'toString', function () {
var s = this.getClass ().getName ();
var message = this.getLocalizedMessage ();
return (message != null) ? (s + ": " + message) : s;
});

Clazz.newMethod$ (C$, 'printStackTrace', function () {
System.err.println$O (this);
for (var i = 0; i < this.stackTrace.length; i++) {
var t = this.stackTrace[i];
var x = t.methodName.indexOf ("(");
var n = t.methodName.substring (0, x).replace (/\s+/g, "");
if (n != "construct" || t.nativeClazz == null
|| Clazz.getInheritedLevel (t.nativeClazz, Throwable) < 0) {
System.err.println (t);
}
}
});

Clazz.newMethod$ (C$, 'printStackTrace$java_io_PrintStream', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$ (C$, 'printStackTrace$java_io_PrintWriter', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$ (C$, 'fillInStackTrace', function () {
this.stackTrace = new Array ();
var caller = arguments.callee.caller;
var superCaller = null;
var callerList = new Array ();
var index = Clazz.callingStackTraces.length - 1;
var noLooping = true;
while (index > -1 || caller != null) {
var clazzName = null;
var nativeClazz = null;
if (!noLooping || caller == Clazz.tryToSearchAndExecute || caller == Clazz.superCall || caller == null) {
if (index < 0) {
break;
}
noLooping = true;
superCaller = Clazz.callingStackTraces[index].caller;
nativeClazz = Clazz.callingStackTraces[index].owner;
index--;
} else {
superCaller = caller;
if (superCaller.claxxOwner != null) {
nativeClazz = superCaller.claxxOwner;
} else if (superCaller.exClazz != null) {
nativeClazz = superCaller.exClazz;
}
}
var st = new StackTraceElement (
((nativeClazz != null && nativeClazz.__CLASS_NAME__.length != 0) ?
nativeClazz.__CLASS_NAME__ : "anonymous"),
((superCaller.exName == null) ? "anonymous" : superCaller.exName)
+ " (" + Clazz.getParamsType (superCaller.arguments) + ")",
null, -1);
st.nativeClazz = nativeClazz;
this.stackTrace[this.stackTrace.length] = st;
for (var i = 0; i < callerList.length; i++) {
if (callerList[i] == superCaller) {
// ... stack information lost as recursive invocation existed ...
var st = new StackTraceElement ("lost", "missing", null, -3);
st.nativeClazz = null;
this.stackTrace[this.stackTrace.length] = st;
noLooping = false;
//break;
}
}
if (superCaller != null) {
callerList[callerList.length] = superCaller;
}
//caller = superCaller.arguments.callee.caller;
// Udo
caller = (superCaller && superCaller.arguments && superCaller.arguments.callee) ? superCaller.arguments.callee.caller : null;
}
Clazz.initializingException = false;
return this;
});

Clazz.newMethod$ (C$, 'setStackTrace$StackTraceElementA', function (stackTrace) {
var defensiveCopy = stackTrace.clone ();
for (var i = 0; i < defensiveCopy.length; i++) if (defensiveCopy[i] == null) throw Clazz.$new(NullPointerException.construct$S,["stackTrace[" + i + "]"]);

this.stackTrace = defensiveCopy;
});
})()

//Created 2017-08-08 06:13:44
