Clazz.declarePackage ("junit.framework");
Clazz.load (["junit.framework.Test", "java.lang.reflect.Constructor"], "junit.framework.TestSuite", ["java.io.PrintWriter", "$.StringWriter", "java.lang.Void", "java.lang.reflect.Modifier", "java.util.Vector", "junit.framework.TestCase"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fTests = null;
this.fName = null;
Clazz.instantialize (this, arguments);
}, junit.framework, "TestSuite", null, junit.framework.Test);
Clazz.makeConstructor (c$, 
function () {
this.fTests =  new java.util.Vector (10);
});
Clazz.makeConstructor (c$, 
function (theClass, name) {
this.construct (theClass);
this.setName (name);
}, "Class,~S");
Clazz.makeConstructor (c$, 
function (theClass) {
this.fTests =  new java.util.Vector (10);
this.fName = theClass.getName ();
try {
junit.framework.TestSuite.getTestConstructor (theClass);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
this.addTest (junit.framework.TestSuite.warning ("Class " + theClass.getName () + " has no public constructor TestCase(String name) or TestCase()"));
return ;
} else {
throw e;
}
}
if (!java.lang.reflect.Modifier.isPublic (theClass.getModifiers ())) {
this.addTest (junit.framework.TestSuite.warning ("Class " + theClass.getName () + " is not public"));
return ;
}var superClass = theClass;
var names =  new java.util.Vector ();
while (junit.framework.Test.isAssignableFrom (superClass)) {
var methods = superClass.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
this.addTestMethod (methods[i], names, theClass);
}
superClass = superClass.getSuperclass ();
}
if (this.fTests.size () == 0) this.addTest (junit.framework.TestSuite.warning ("No tests found in " + theClass.getName ()));
}, "Class");
Clazz.makeConstructor (c$, 
function (name) {
this.fTests =  new java.util.Vector (10);
this.setName (name);
}, "~S");
Clazz.defineMethod (c$, "addTest", 
function (test) {
this.fTests.addElement (test);
}, "junit.framework.Test");
Clazz.defineMethod (c$, "addTestSuite", 
function (testClass) {
this.addTest ( new junit.framework.TestSuite (testClass));
}, "Class");
Clazz.defineMethod (c$, "addTestMethod", 
($fz = function (m, names, theClass) {
var name = m.getName ();
if (names.contains (name)) return ;
if (!this.isPublicTestMethod (m)) {
if (this.isTestMethod (m)) this.addTest (junit.framework.TestSuite.warning ("Test method isn't public: " + m.getName ()));
return ;
}names.addElement (name);
this.addTest (junit.framework.TestSuite.createTest (theClass, name));
}, $fz.isPrivate = true, $fz), "java.lang.reflect.Method,java.util.Vector,Class");
c$.createTest = Clazz.defineMethod (c$, "createTest", 
function (theClass, name) {
var constructor;
try {
constructor = junit.framework.TestSuite.getTestConstructor (theClass);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
return junit.framework.TestSuite.warning ("Class " + theClass.getName () + " has no public constructor TestCase(String name) or TestCase()");
} else {
throw e;
}
}
var test;
try {
if (constructor.getParameterTypes ().length == 0) {
test = constructor.newInstance ( new Array (0));
if (Clazz.instanceOf (test, junit.framework.TestCase)) (test).setName (name);
} else {
test = constructor.newInstance ([name]);
}} catch (e$$) {
if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
return (junit.framework.TestSuite.warning ("Cannot instantiate test case: " + name + " (" + junit.framework.TestSuite.exceptionToString (e) + ")"));
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
return (junit.framework.TestSuite.warning ("Exception in constructor: " + name + " (" + junit.framework.TestSuite.exceptionToString (e.getTargetException ()) + ")"));
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
return (junit.framework.TestSuite.warning ("Cannot access test case: " + name + " (" + junit.framework.TestSuite.exceptionToString (e) + ")"));
}
} else {
throw e$$;
}
}
return test;
}, "Class,~S");
c$.exceptionToString = Clazz.defineMethod (c$, "exceptionToString", 
($fz = function (t) {
var stringWriter =  new java.io.StringWriter ();
var writer =  new java.io.PrintWriter (stringWriter);
t.printStackTrace (writer);
return stringWriter.toString ();
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "countTestCases", 
function () {
var count = 0;
for (var e = this.tests (); e.hasMoreElements (); ) {
var test = e.nextElement ();
count = count + test.countTestCases ();
}
return count;
});
c$.getTestConstructor = Clazz.defineMethod (c$, "getTestConstructor", 
function (theClass) {
var args = [String];
try {
return theClass.getConstructor (args);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
} else {
throw e;
}
}
return theClass.getConstructor ( new Array (0));
}, "Class");
Clazz.defineMethod (c$, "isPublicTestMethod", 
($fz = function (m) {
return this.isTestMethod (m) && java.lang.reflect.Modifier.isPublic (m.getModifiers ());
}, $fz.isPrivate = true, $fz), "java.lang.reflect.Method");
Clazz.defineMethod (c$, "isTestMethod", 
($fz = function (m) {
var name = m.getName ();
var parameters = m.getParameterTypes ();
var returnType = m.getReturnType ();
return parameters.length == 0 && name.startsWith ("test") && returnType.equals (Void.TYPE);
}, $fz.isPrivate = true, $fz), "java.lang.reflect.Method");
Clazz.defineMethod (c$, "run", 
function (result) {
for (var e = this.tests (); e.hasMoreElements (); ) {
if (result.shouldStop ()) break;
var test = e.nextElement ();
this.runTest (test, result);
}
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "runTest", 
function (test, result) {
test.run (result);
}, "junit.framework.Test,junit.framework.TestResult");
Clazz.defineMethod (c$, "testAt", 
function (index) {
return this.fTests.elementAt (index);
}, "~N");
Clazz.defineMethod (c$, "testCount", 
function () {
return this.fTests.size ();
});
Clazz.defineMethod (c$, "tests", 
function () {
return this.fTests.elements ();
});
Clazz.defineMethod (c$, "toString", 
function () {
if (this.getName () != null) return this.getName ();
return Clazz.superCall (this, junit.framework.TestSuite, "toString", []);
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.fName = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.fName;
});
c$.warning = Clazz.defineMethod (c$, "warning", 
($fz = function (message) {
return (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("junit.framework.TestSuite$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (junit.framework, "TestSuite$1", junit.framework.TestCase);
Clazz.overrideMethod (c$, "runTest", 
function () {
junit.framework.Assert.fail (this.f$.message);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (junit.framework.TestSuite$1, i$, v$, arg0);
}) (this, "warning", Clazz.cloneFinals ("message", message));
}, $fz.isPrivate = true, $fz), "~S");
});
