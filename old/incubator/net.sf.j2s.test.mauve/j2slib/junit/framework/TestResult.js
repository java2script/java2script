Clazz.declarePackage ("junit.framework");
Clazz.load (null, "junit.framework.TestResult", ["java.util.Vector", "junit.framework.Protectable", "$.TestFailure"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fFailures = null;
this.fErrors = null;
this.fListeners = null;
this.fRunTests = 0;
this.fStop = false;
Clazz.instantialize (this, arguments);
}, junit.framework, "TestResult");
Clazz.makeConstructor (c$, 
function () {
this.fFailures =  new java.util.Vector ();
this.fErrors =  new java.util.Vector ();
this.fListeners =  new java.util.Vector ();
this.fRunTests = 0;
this.fStop = false;
});
Clazz.defineMethod (c$, "addError", 
function (test, t) {
this.fErrors.addElement ( new junit.framework.TestFailure (test, t));
for (var e = this.cloneListeners ().elements (); e.hasMoreElements (); ) {
(e.nextElement ()).addError (test, t);
}
}, "junit.framework.Test,Throwable");
Clazz.defineMethod (c$, "addFailure", 
function (test, t) {
this.fFailures.addElement ( new junit.framework.TestFailure (test, t));
for (var e = this.cloneListeners ().elements (); e.hasMoreElements (); ) {
(e.nextElement ()).addFailure (test, t);
}
}, "junit.framework.Test,junit.framework.AssertionFailedError");
Clazz.defineMethod (c$, "addListener", 
function (listener) {
this.fListeners.addElement (listener);
}, "junit.framework.TestListener");
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
this.fListeners.removeElement (listener);
}, "junit.framework.TestListener");
Clazz.defineMethod (c$, "cloneListeners", 
($fz = function () {
return this.fListeners.clone ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "endTest", 
function (test) {
for (var e = this.cloneListeners ().elements (); e.hasMoreElements (); ) {
(e.nextElement ()).endTest (test);
}
}, "junit.framework.Test");
Clazz.defineMethod (c$, "errorCount", 
function () {
return this.fErrors.size ();
});
Clazz.defineMethod (c$, "errors", 
function () {
return this.fErrors.elements ();
});
Clazz.defineMethod (c$, "failureCount", 
function () {
return this.fFailures.size ();
});
Clazz.defineMethod (c$, "failures", 
function () {
return this.fFailures.elements ();
});
Clazz.defineMethod (c$, "run", 
function (test) {
this.startTest (test);
var p = (function (i$, v$) {
if (!Clazz.isClassDefined ("junit.framework.TestResult$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (junit.framework, "TestResult$1", null, junit.framework.Protectable);
Clazz.defineMethod (c$, "protect", 
function () {
this.f$.test.runBare ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (junit.framework.TestResult$1, i$, v$);
}) (this, Clazz.cloneFinals ("test", test));
this.runProtected (test, p);
this.endTest (test);
}, "junit.framework.TestCase");
Clazz.defineMethod (c$, "runCount", 
function () {
return this.fRunTests;
});
Clazz.defineMethod (c$, "runProtected", 
function (test, p) {
try {
p.protect ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, junit.framework.AssertionFailedError)) {
var e = e$$;
{
this.addFailure (test, e);
}
} else if (Clazz.instanceOf (e$$, ThreadDeath)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, Throwable)) {
var e = e$$;
{
this.addError (test, e);
}
} else {
throw e$$;
}
}
}, "junit.framework.Test,junit.framework.Protectable");
Clazz.defineMethod (c$, "shouldStop", 
function () {
return this.fStop;
});
Clazz.defineMethod (c$, "startTest", 
function (test) {
var count = test.countTestCases ();
{
this.fRunTests += count;
}for (var e = this.cloneListeners ().elements (); e.hasMoreElements (); ) {
(e.nextElement ()).startTest (test);
}
}, "junit.framework.Test");
Clazz.defineMethod (c$, "stop", 
function () {
this.fStop = true;
});
Clazz.defineMethod (c$, "wasSuccessful", 
function () {
return this.failureCount () == 0 && this.errorCount () == 0;
});
});
