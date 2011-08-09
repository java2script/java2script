Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.runner.TestSuiteLoader"], "junit.runner.StandardTestSuiteLoader", null, function () {
c$ = Clazz.declareType (junit.runner, "StandardTestSuiteLoader", null, junit.runner.TestSuiteLoader);
Clazz.overrideMethod (c$, "load", 
function (suiteClassName) {
return Class.forName (suiteClassName);
}, "~S");
Clazz.overrideMethod (c$, "reload", 
function (aClass) {
return aClass;
}, "Class");
});
