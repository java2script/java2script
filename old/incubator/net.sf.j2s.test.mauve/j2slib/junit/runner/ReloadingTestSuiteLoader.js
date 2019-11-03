Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.runner.TestSuiteLoader"], "junit.runner.ReloadingTestSuiteLoader", ["junit.runner.TestCaseClassLoader"], function () {
c$ = Clazz.declareType (junit.runner, "ReloadingTestSuiteLoader", null, junit.runner.TestSuiteLoader);
Clazz.overrideMethod (c$, "load", 
function (suiteClassName) {
return this.createLoader ().loadClass (suiteClassName, true);
}, "~S");
Clazz.overrideMethod (c$, "reload", 
function (aClass) {
return this.createLoader ().loadClass (aClass.getName (), true);
}, "Class");
Clazz.defineMethod (c$, "createLoader", 
function () {
return  new junit.runner.TestCaseClassLoader ();
});
});
