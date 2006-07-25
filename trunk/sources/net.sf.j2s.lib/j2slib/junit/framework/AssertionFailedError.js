Clazz.declarePackage ("junit.framework");
Clazz.load (["java.lang.Error"], "junit.framework.AssertionFailedError", null, function () {
c$ = Clazz.decorateAsClass (function () {
Clazz.instantialize (this, arguments);
}, junit.framework, "AssertionFailedError", java.lang.Error);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.framework.AssertionFailedError, []);
});
Clazz.makeConstructor (c$, 
function (message) {
Clazz.superConstructor (this, junit.framework.AssertionFailedError, [message]);
}, "~S");
});
