Clazz.declarePackage ("junit.framework");
Clazz.load (["java.lang.Error"], "junit.framework.AssertionFailedError", null, function () {
c$ = Clazz.declareType (junit.framework, "AssertionFailedError", Error);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.framework.AssertionFailedError, []);
});
});
