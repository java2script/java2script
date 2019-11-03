Clazz.declarePackage ("org.eclipse.core.internal.commands.util");
Clazz.load (null, "org.eclipse.core.internal.commands.util.Assert", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.commands.util, "Assert");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (object, "");
}, "~O");
c$.isNotNull = Clazz.defineMethod (c$, "isNotNull", 
function (object, message) {
if (object == null) throw  new IllegalArgumentException ("null argument:" + message);
}, "~O,~S");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression) {
return org.eclipse.core.internal.commands.util.Assert.isTrue (expression, "");
}, "~B");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (expression, message) {
if (!expression) throw  new IllegalArgumentException ("assertion failed:" + message);
return expression;
}, "~B,~S");
});
