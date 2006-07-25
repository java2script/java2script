Clazz.declarePackage ("junit.framework");
Clazz.load (null, "junit.framework.TestFailure", ["java.io.PrintWriter", "$.StringWriter", "java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fFailedTest = null;
this.fThrownException = null;
Clazz.instantialize (this, arguments);
}, junit.framework, "TestFailure");
Clazz.makeConstructor (c$, 
function (failedTest, thrownException) {
this.fFailedTest = failedTest;
this.fThrownException = thrownException;
}, "junit.framework.Test,Throwable");
Clazz.defineMethod (c$, "failedTest", 
function () {
return this.fFailedTest;
});
Clazz.defineMethod (c$, "thrownException", 
function () {
return this.fThrownException;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append (this.fFailedTest + ": " + this.fThrownException.getMessage ());
return buffer.toString ();
});
Clazz.defineMethod (c$, "trace", 
function () {
if (true) return this.thrownException ().toString ();
var stringWriter =  new java.io.StringWriter ();
var writer =  new java.io.PrintWriter (stringWriter);
this.thrownException ().printStackTrace (writer);
var buffer = stringWriter.getBuffer ();
return buffer.toString ();
});
Clazz.defineMethod (c$, "exceptionMessage", 
function () {
return this.thrownException ().getMessage ();
});
Clazz.defineMethod (c$, "isFailure", 
function () {
return Clazz.instanceOf (this.thrownException (), junit.framework.AssertionFailedError);
});
});
