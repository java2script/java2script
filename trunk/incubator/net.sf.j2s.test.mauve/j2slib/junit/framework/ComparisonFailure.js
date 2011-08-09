Clazz.declarePackage ("junit.framework");
Clazz.load (["junit.framework.AssertionFailedError"], "junit.framework.ComparisonFailure", ["junit.framework.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fExpected = null;
this.fActual = null;
Clazz.instantialize (this, arguments);
}, junit.framework, "ComparisonFailure", junit.framework.AssertionFailedError);
Clazz.makeConstructor (c$, 
function (message, expected, actual) {
Clazz.superConstructor (this, junit.framework.ComparisonFailure, [message]);
this.fExpected = expected;
this.fActual = actual;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "getMessage", 
function () {
if (this.fExpected == null || this.fActual == null) return junit.framework.Assert.format (Clazz.superCall (this, junit.framework.ComparisonFailure, "getMessage", []), this.fExpected, this.fActual);
var end = Math.min (this.fExpected.length, this.fActual.length);
var i = 0;
for (; i < end; i++) {
if ((this.fExpected.charAt (i)).charCodeAt (0) != (this.fActual.charAt (i)).charCodeAt (0)) break;
}
var j = this.fExpected.length - 1;
var k = this.fActual.length - 1;
for (; k >= i && j >= i; k--, j--) {
if ((this.fExpected.charAt (j)).charCodeAt (0) != (this.fActual.charAt (k)).charCodeAt (0)) break;
}
var actual;
var expected;
if (j < i && k < i) {
expected = this.fExpected;
actual = this.fActual;
} else {
expected = this.fExpected.substring (i, j + 1);
actual = this.fActual.substring (i, k + 1);
if (i <= end && i > 0) {
expected = "..." + expected;
actual = "..." + actual;
}if (j < this.fExpected.length - 1) expected = expected + "...";
if (k < this.fActual.length - 1) actual = actual + "...";
}return junit.framework.Assert.format (Clazz.superCall (this, junit.framework.ComparisonFailure, "getMessage", []), expected, actual);
});
});
