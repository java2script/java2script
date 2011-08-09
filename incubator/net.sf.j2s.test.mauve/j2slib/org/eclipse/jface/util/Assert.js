Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["java.lang.RuntimeException"], "org.eclipse.jface.util.Assert", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.declareType (org.eclipse.jface.util, "Assert");
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.jface.util.Assert, "AssertionFailedException", RuntimeException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.util.Assert.AssertionFailedException, []);
});
c$ = Clazz.p0p ();
c$.isLegal = Clazz.defineMethod (c$, "isLegal", 
function (expression) {
if (expression) {
return true;
}return org.eclipse.jface.util.Assert.isLegal (expression, "");
}, "~B");
c$.isLegal = Clazz.defineMethod (c$, "isLegal", 
function (expression, message) {
if (!expression) throw  new IllegalArgumentException ("assertion failed; " + message);
return expression;
}, "~B,~S");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object) {
if (object != null) {
return ;
}org.eclipse.jface.util.Assert.isNotNull (object, "");
}, "~O");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object, message) {
if (object == null) throw  new org.eclipse.jface.util.Assert.AssertionFailedException ("null argument;" + message);
}, "~O,~S");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression) {
if (expression) {
return true;
}return org.eclipse.jface.util.Assert.isTrue (expression, "");
}, "~B");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression, message) {
if (!expression) throw  new org.eclipse.jface.util.Assert.AssertionFailedException ("Assertion failed: " + message);
return expression;
}, "~B,~S");
});
