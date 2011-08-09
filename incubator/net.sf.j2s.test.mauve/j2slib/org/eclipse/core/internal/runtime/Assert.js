Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.Assert", ["java.lang.IllegalArgumentException", "org.eclipse.core.internal.runtime.AssertionFailedException"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "Assert");
c$.isLegal = Clazz.defineMethod (c$, "isLegal", 
function (expression) {
return org.eclipse.core.internal.runtime.Assert.isLegal (expression, "");
}, "~B");
c$.isLegal = Clazz.defineMethod (c$, "isLegal", 
function (expression, message) {
if (!expression) throw  new IllegalArgumentException (message);
return expression;
}, "~B,~S");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object) {
org.eclipse.core.internal.runtime.Assert.isNotNull (object, "");
}, "~O");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object, message) {
if (object == null) throw  new org.eclipse.core.internal.runtime.AssertionFailedException ("null argument:" + message);
}, "~O,~S");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression) {
return org.eclipse.core.internal.runtime.Assert.isTrue (expression, "");
}, "~B");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression, message) {
if (!expression) throw  new org.eclipse.core.internal.runtime.AssertionFailedException ("assertion failed: " + message);
return expression;
}, "~B,~S");
});
