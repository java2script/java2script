Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.runner.ClassPathTestCollector"], "junit.runner.SimpleTestCollector", null, function () {
c$ = Clazz.decorateAsClass (function () {
Clazz.instantialize (this, arguments);
}, junit.runner, "SimpleTestCollector", junit.runner.ClassPathTestCollector);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.runner.SimpleTestCollector, []);
});
Clazz.overrideMethod (c$, "isTestClass", 
function (classFileName) {
return classFileName.endsWith (".class") && classFileName.indexOf ('$') < 0 && classFileName.indexOf ("Test") > 0;
}, "~S");
});
