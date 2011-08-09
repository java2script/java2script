Clazz.declarePackage ("junit.textui");
Clazz.load (["junit.runner.BaseTestRunner"], "junit.textui.TestRunner", ["java.lang.Exception", "junit.framework.TestResult", "$.TestSuite", "junit.runner.StandardTestSuiteLoader", "$.Version", "junit.textui.ResultPrinter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fPrinter = null;
Clazz.instantialize (this, arguments);
}, junit.textui, "TestRunner", junit.runner.BaseTestRunner);
Clazz.makeConstructor (c$, 
function () {
this.construct (System.out);
});
Clazz.makeConstructor (c$, 
function (writer) {
this.construct ( new junit.textui.ResultPrinter (writer));
}, "java.io.PrintStream");
Clazz.makeConstructor (c$, 
function (printer) {
Clazz.superConstructor (this, junit.textui.TestRunner, []);
this.fPrinter = printer;
}, "junit.textui.ResultPrinter");
c$.run = Clazz.defineMethod (c$, "run", 
function (testClass) {
junit.textui.TestRunner.run ( new junit.framework.TestSuite (testClass));
}, "Class");
c$.run = Clazz.defineMethod (c$, "run", 
function (test) {
var runner =  new junit.textui.TestRunner ();
return runner.doRun (test);
}, "junit.framework.Test");
c$.runAndWait = Clazz.defineMethod (c$, "runAndWait", 
function (suite) {
var aTestRunner =  new junit.textui.TestRunner ();
aTestRunner.doRun (suite, true);
}, "junit.framework.Test");
Clazz.overrideMethod (c$, "getLoader", 
function () {
return  new junit.runner.StandardTestSuiteLoader ();
});
Clazz.overrideMethod (c$, "testFailed", 
function (status, test, t) {
}, "~N,junit.framework.Test,Throwable");
Clazz.overrideMethod (c$, "testStarted", 
function (testName) {
}, "~S");
Clazz.overrideMethod (c$, "testEnded", 
function (testName) {
}, "~S");
Clazz.defineMethod (c$, "createTestResult", 
function () {
return  new junit.framework.TestResult ();
});
Clazz.defineMethod (c$, "doRun", 
function (test) {
return this.doRun (test, false);
}, "junit.framework.Test");
Clazz.defineMethod (c$, "doRun", 
function (suite, wait) {
var result = this.createTestResult ();
result.addListener (this.fPrinter);
var startTime = System.currentTimeMillis ();
suite.run (result);
var endTime = System.currentTimeMillis ();
var runTime = endTime - startTime;
this.fPrinter.print (result, runTime);
this.pause (wait);
return result;
}, "junit.framework.Test,~B");
Clazz.defineMethod (c$, "pause", 
function (wait) {
if (!wait) return ;
this.fPrinter.printWaitPrompt ();
try {
System.$in.read ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}, "~B");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var aTestRunner =  new junit.textui.TestRunner ();
try {
var r = aTestRunner.start (args);
if (!r.wasSuccessful ()) System.exit (1);
System.exit (0);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
System.err.println (e.getMessage ());
System.exit (2);
} else {
throw e;
}
}
}, "~A");
Clazz.defineMethod (c$, "start", 
function (args) {
var testCase = "";
var wait = false;
for (var i = 0; i < args.length; i++) {
if (args[i].equals ("-wait")) wait = true;
 else if (args[i].equals ("-c")) testCase = this.extractClassName (args[++i]);
 else if (args[i].equals ("-v")) System.err.println ("JUnit " + junit.runner.Version.id () + " by Kent Beck and Erich Gamma");
 else testCase = args[i];
}
if (testCase.equals ("")) throw  new Exception ("Usage: TestRunner [-wait] testCaseName, where name is the name of the TestCase class");
try {
var suite = this.getTest (testCase);
return this.doRun (suite, wait);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new Exception ("Could not create and run test suite: " + e);
} else {
throw e;
}
}
}, "~A");
Clazz.overrideMethod (c$, "runFailed", 
function (message) {
System.err.println (message);
System.exit (1);
}, "~S");
Clazz.defineMethod (c$, "setPrinter", 
function (printer) {
this.fPrinter = printer;
}, "junit.textui.ResultPrinter");
Clazz.defineStatics (c$,
"SUCCESS_EXIT", 0,
"FAILURE_EXIT", 1,
"EXCEPTION_EXIT", 2);
});
