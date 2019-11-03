Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.framework.TestCase"], "junit.extensions.ExceptionTestCase", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.fExpected = null;
Clazz.instantialize (this, arguments);
}, junit.extensions, "ExceptionTestCase", junit.framework.TestCase);
Clazz.makeConstructor (c$, 
function (name, exception) {
Clazz.superConstructor (this, junit.extensions.ExceptionTestCase, [name]);
this.fExpected = exception;
}, "~S,Class");
Clazz.defineMethod (c$, "runTest", 
function () {
try {
Clazz.superCall (this, junit.extensions.ExceptionTestCase, "runTest", []);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
if (this.fExpected.isAssignableFrom (e.getClass ())) return ;
 else throw e;
} else {
throw e;
}
}
junit.framework.Assert.fail ("Expected exception " + this.fExpected);
});
});
