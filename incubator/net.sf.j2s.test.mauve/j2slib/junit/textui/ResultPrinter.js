Clazz.declarePackage ("junit.textui");
Clazz.load (["junit.framework.TestListener"], "junit.textui.ResultPrinter", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.fWriter = null;
this.fColumn = 0;
Clazz.instantialize (this, arguments);
}, junit.textui, "ResultPrinter", null, junit.framework.TestListener);
Clazz.makeConstructor (c$, 
function (writer) {
this.fWriter = writer;
}, "java.io.PrintStream");
Clazz.defineMethod (c$, "print", 
function (result, runTime) {
this.printHeader (runTime);
this.printErrors (result);
this.printFailures (result);
this.printFooter (result);
}, "junit.framework.TestResult,~N");
Clazz.defineMethod (c$, "printWaitPrompt", 
function () {
this.getWriter ().println ();
this.getWriter ().println ("<RETURN> to continue");
});
Clazz.defineMethod (c$, "printHeader", 
function (runTime) {
this.getWriter ().println ();
this.getWriter ().println ("Time: " + this.elapsedTimeAsString (runTime));
}, "~N");
Clazz.defineMethod (c$, "printErrors", 
function (result) {
this.printDefects (result.errors (), result.errorCount (), "error");
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "printFailures", 
function (result) {
this.printDefects (result.failures (), result.failureCount (), "failure");
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "printDefects", 
function (booBoos, count, type) {
if (count == 0) return ;
if (count == 1) this.getWriter ().println ("There was " + count + " " + type + ":");
 else this.getWriter ().println ("There were " + count + " " + type + "s:");
for (var i = 1; booBoos.hasMoreElements (); i++) {
this.printDefect (booBoos.nextElement (), i);
}
}, "java.util.Enumeration,~N,~S");
Clazz.defineMethod (c$, "printDefect", 
function (booBoo, count) {
this.printDefectHeader (booBoo, count);
this.printDefectTrace (booBoo);
}, "junit.framework.TestFailure,~N");
Clazz.defineMethod (c$, "printDefectHeader", 
function (booBoo, count) {
this.getWriter ().print (count + ") " + booBoo.failedTest ());
}, "junit.framework.TestFailure,~N");
Clazz.defineMethod (c$, "printDefectTrace", 
function (booBoo) {
this.getWriter ().println (booBoo.trace ());
}, "junit.framework.TestFailure");
Clazz.defineMethod (c$, "printFooter", 
function (result) {
if (result.wasSuccessful ()) {
this.getWriter ().println ();
this.getWriter ().print ("OK");
this.getWriter ().println (" (" + result.runCount () + " test" + (result.runCount () == 1 ? "" : "s") + ")");
} else {
this.getWriter ().println ();
this.getWriter ().println ("FAILURES!!!");
this.getWriter ().println ("Tests run: " + result.runCount () + ",  Failures: " + result.failureCount () + ",  Errors: " + result.errorCount ());
}this.getWriter ().println ();
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "elapsedTimeAsString", 
function (runTime) {
return "" + (runTime / 1000);
}, "~N");
Clazz.defineMethod (c$, "getWriter", 
function () {
return this.fWriter;
});
Clazz.overrideMethod (c$, "addError", 
function (test, t) {
this.getWriter ().print ("E");
}, "junit.framework.Test,Throwable");
Clazz.overrideMethod (c$, "addFailure", 
function (test, t) {
this.getWriter ().print ("F");
}, "junit.framework.Test,junit.framework.AssertionFailedError");
Clazz.overrideMethod (c$, "endTest", 
function (test) {
}, "junit.framework.Test");
Clazz.overrideMethod (c$, "startTest", 
function (test) {
this.getWriter ().print (".");
if (this.fColumn++ >= 40) {
this.getWriter ().println ();
this.fColumn = 0;
}}, "junit.framework.Test");
});
