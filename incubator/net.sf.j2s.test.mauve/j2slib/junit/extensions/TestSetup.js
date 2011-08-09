Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.extensions.TestDecorator"], "junit.extensions.TestSetup", ["junit.framework.Protectable"], function () {
c$ = Clazz.declareType (junit.extensions, "TestSetup", junit.extensions.TestDecorator);
Clazz.overrideMethod (c$, "run", 
function (result) {
var p = (function (i$, v$) {
if (!Clazz.isClassDefined ("junit.extensions.TestSetup$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (junit.extensions, "TestSetup$1", null, junit.framework.Protectable);
Clazz.overrideMethod (c$, "protect", 
function () {
this.b$["junit.extensions.TestSetup"].setUp ();
this.b$["junit.extensions.TestSetup"].basicRun (this.f$.result);
this.b$["junit.extensions.TestSetup"].tearDown ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (junit.extensions.TestSetup$1, i$, v$);
}) (this, Clazz.cloneFinals ("result", result));
result.runProtected (this, p);
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "setUp", 
function () {
});
Clazz.defineMethod (c$, "tearDown", 
function () {
});
});
