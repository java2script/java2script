Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.framework.TestSuite"], "junit.extensions.ActiveTestSuite", ["java.lang.Thread"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fActiveTestDeathCount = 0;
Clazz.instantialize (this, arguments);
}, junit.extensions, "ActiveTestSuite", junit.framework.TestSuite);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.extensions.ActiveTestSuite, []);
});
Clazz.defineMethod (c$, "run", 
function (result) {
this.fActiveTestDeathCount = 0;
Clazz.superCall (this, junit.extensions.ActiveTestSuite, "run", [result]);
this.waitUntilFinished ();
}, "junit.framework.TestResult");
Clazz.overrideMethod (c$, "runTest", 
function (test, result) {
var t = (function (i$, v$) {
if (!Clazz.isClassDefined ("junit.extensions.ActiveTestSuite$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (junit.extensions, "ActiveTestSuite$1", Thread);
Clazz.overrideMethod (c$, "run", 
function () {
try {
this.f$.test.run (this.f$.result);
} finally {
this.b$["junit.extensions.ActiveTestSuite"].runFinished (this.f$.test);
}
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (junit.extensions.ActiveTestSuite$1, i$, v$);
}) (this, Clazz.cloneFinals ("test", test, "result", result));
t.start ();
}, "junit.framework.Test,junit.framework.TestResult");
Clazz.defineMethod (c$, "waitUntilFinished", 
function () {
while (this.fActiveTestDeathCount < this.testCount ()) {
try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
return ;
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "runFinished", 
function (test) {
this.fActiveTestDeathCount++;
this.notifyAll ();
}, "junit.framework.Test");
});
