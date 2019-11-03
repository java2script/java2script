Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.framework.Assert", "$.Test"], "junit.extensions.TestDecorator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.fTest = null;
Clazz.instantialize (this, arguments);
}, junit.extensions, "TestDecorator", junit.framework.Assert, junit.framework.Test);
Clazz.makeConstructor (c$, 
function (test) {
Clazz.superConstructor (this, junit.extensions.TestDecorator, []);
this.fTest = test;
}, "junit.framework.Test");
Clazz.defineMethod (c$, "basicRun", 
function (result) {
this.fTest.run (result);
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "countTestCases", 
function () {
return this.fTest.countTestCases ();
});
Clazz.defineMethod (c$, "run", 
function (result) {
this.basicRun (result);
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "toString", 
function () {
return this.fTest.toString ();
});
Clazz.defineMethod (c$, "getTest", 
function () {
return this.fTest;
});
});
