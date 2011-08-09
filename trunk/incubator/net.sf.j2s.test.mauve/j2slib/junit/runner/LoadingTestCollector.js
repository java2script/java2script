Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.runner.ClassPathTestCollector"], "junit.runner.LoadingTestCollector", ["java.lang.reflect.Modifier", "junit.framework.Test", "$.TestSuite", "junit.runner.TestCaseClassLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fLoader = null;
Clazz.instantialize (this, arguments);
}, junit.runner, "LoadingTestCollector", junit.runner.ClassPathTestCollector);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.runner.LoadingTestCollector, []);
this.fLoader =  new junit.runner.TestCaseClassLoader ();
});
Clazz.defineMethod (c$, "isTestClass", 
function (classFileName) {
try {
if (classFileName.endsWith (".class")) {
var testClass = this.classFromFile (classFileName);
return (testClass != null) && this.isTestClass (testClass);
}} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var expected = e$$;
{
}
} else if (Clazz.instanceOf (e$$, NoClassDefFoundError)) {
var notFatal = e$$;
{
}
} else {
throw e$$;
}
}
return false;
}, "~S");
Clazz.defineMethod (c$, "classFromFile", 
function (classFileName) {
var className = this.classNameFromFile (classFileName);
if (!this.fLoader.isExcluded (className)) return this.fLoader.loadClass (className, false);
return null;
}, "~S");
Clazz.defineMethod (c$, "isTestClass", 
function (testClass) {
if (this.hasSuiteMethod (testClass)) return true;
if (junit.framework.Test.isAssignableFrom (testClass) && java.lang.reflect.Modifier.isPublic (testClass.getModifiers ()) && this.hasPublicConstructor (testClass)) return true;
return false;
}, "Class");
Clazz.defineMethod (c$, "hasSuiteMethod", 
function (testClass) {
try {
testClass.getMethod ("suite",  new Array (0));
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
return false;
} else {
throw e;
}
}
return true;
}, "Class");
Clazz.defineMethod (c$, "hasPublicConstructor", 
function (testClass) {
try {
junit.framework.TestSuite.getTestConstructor (testClass);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
return false;
} else {
throw e;
}
}
return true;
}, "Class");
});
