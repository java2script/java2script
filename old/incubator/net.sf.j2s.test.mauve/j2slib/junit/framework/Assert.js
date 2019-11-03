Clazz.declarePackage ("junit.framework");
Clazz.load (null, "junit.framework.Assert", ["java.lang.Float", "junit.framework.AssertionFailedError", "$.ComparisonFailure"], function () {
c$ = Clazz.declareType (junit.framework, "Assert");
Clazz.makeConstructor (c$, 
function () {
});
c$.assertTrue = Clazz.defineMethod (c$, "assertTrue", 
function (message, condition) {
if (!condition) junit.framework.Assert.fail (message);
}, "~S,~B");
c$.assertTrue = Clazz.defineMethod (c$, "assertTrue", 
function (condition) {
junit.framework.Assert.assertTrue (null, condition);
}, "~B");
c$.assertFalse = Clazz.defineMethod (c$, "assertFalse", 
function (message, condition) {
junit.framework.Assert.assertTrue (message, !condition);
}, "~S,~B");
c$.assertFalse = Clazz.defineMethod (c$, "assertFalse", 
function (condition) {
junit.framework.Assert.assertFalse (null, condition);
}, "~B");
c$.fail = Clazz.defineMethod (c$, "fail", 
function (message) {
var err =  new junit.framework.AssertionFailedError (message);
{
err.detailMessage = message;
}throw err;
}, "~S");
c$.fail = Clazz.defineMethod (c$, "fail", 
function () {
junit.framework.Assert.fail (null);
});
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (message, expected, actual) {
if (expected == null && actual == null) return ;
if (expected != null && expected.equals (actual)) return ;
junit.framework.Assert.failNotEquals (message, expected, actual);
}, "~S,~O,~O");
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (expected, actual) {
junit.framework.Assert.assertEquals (Clazz.castNullAs("String"), expected, actual);
}, "~O,~O");
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (message, expected, actual) {
if (expected == null && actual == null) return ;
if (expected != null && expected.equals (actual)) return ;
throw  new junit.framework.ComparisonFailure (message, expected, actual);
}, "~S,~S,~S");
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (expected, actual) {
junit.framework.Assert.assertEquals (null, expected, actual);
}, "~S,~S");
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (message, expected, actual, delta) {
if (Float.isInfinite (expected)) {
if (!(expected == actual)) junit.framework.Assert.failNotEquals (message,  new Float (expected),  new Float (actual));
} else if (!(Math.abs (expected - actual) <= delta)) junit.framework.Assert.failNotEquals (message,  new Float (expected),  new Float (actual));
}, "~S,~N,~N,~N");
c$.assertEquals = Clazz.defineMethod (c$, "assertEquals", 
function (expected, actual, delta) {
junit.framework.Assert.assertEquals (null, expected, actual, delta);
}, "~N,~N,~N");
c$.assertNotNull = Clazz.defineMethod (c$, "assertNotNull", 
function (object) {
junit.framework.Assert.assertNotNull (null, object);
}, "~O");
c$.assertNotNull = Clazz.defineMethod (c$, "assertNotNull", 
function (message, object) {
junit.framework.Assert.assertTrue (message, object != null);
}, "~S,~O");
c$.assertNull = Clazz.defineMethod (c$, "assertNull", 
function (object) {
junit.framework.Assert.assertNull (null, object);
}, "~O");
c$.assertNull = Clazz.defineMethod (c$, "assertNull", 
function (message, object) {
junit.framework.Assert.assertTrue (message, object == null);
}, "~S,~O");
c$.assertSame = Clazz.defineMethod (c$, "assertSame", 
function (message, expected, actual) {
if (expected === actual) return ;
junit.framework.Assert.failNotSame (message, expected, actual);
}, "~S,~O,~O");
c$.assertSame = Clazz.defineMethod (c$, "assertSame", 
function (expected, actual) {
junit.framework.Assert.assertSame (null, expected, actual);
}, "~O,~O");
c$.assertNotSame = Clazz.defineMethod (c$, "assertNotSame", 
function (message, expected, actual) {
if (expected === actual) junit.framework.Assert.failSame (message);
}, "~S,~O,~O");
c$.assertNotSame = Clazz.defineMethod (c$, "assertNotSame", 
function (expected, actual) {
junit.framework.Assert.assertNotSame (null, expected, actual);
}, "~O,~O");
c$.failSame = Clazz.defineMethod (c$, "failSame", 
($fz = function (message) {
var formatted = "";
if (message != null) formatted = message + " ";
junit.framework.Assert.fail (formatted + "expected not same");
}, $fz.isPrivate = true, $fz), "~S");
c$.failNotSame = Clazz.defineMethod (c$, "failNotSame", 
($fz = function (message, expected, actual) {
var formatted = "";
if (message != null) formatted = message + " ";
junit.framework.Assert.fail (formatted + "expected same:<" + expected + "> was not:<" + actual + ">");
}, $fz.isPrivate = true, $fz), "~S,~O,~O");
c$.failNotEquals = Clazz.defineMethod (c$, "failNotEquals", 
($fz = function (message, expected, actual) {
junit.framework.Assert.fail (junit.framework.Assert.format (message, expected, actual));
}, $fz.isPrivate = true, $fz), "~S,~O,~O");
c$.format = Clazz.defineMethod (c$, "format", 
function (message, expected, actual) {
var formatted = "";
if (message != null) formatted = message + " ";
return formatted + "expected:<" + expected + "> but was:<" + actual + ">";
}, "~S,~O,~O");
});
