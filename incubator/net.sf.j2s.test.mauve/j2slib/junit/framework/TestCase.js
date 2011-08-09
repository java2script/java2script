Clazz.declarePackage ("junit.framework");
Clazz.load (["junit.framework.Assert", "$.Test"], "junit.framework.TestCase", ["java.lang.reflect.Modifier", "junit.framework.TestResult"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fName = null;
Clazz.instantialize (this, arguments);
}, junit.framework, "TestCase", junit.framework.Assert, junit.framework.Test);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, junit.framework.TestCase, []);
this.fName = null;
});
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, junit.framework.TestCase, []);
this.fName = name;
}, "~S");
Clazz.overrideMethod (c$, "countTestCases", 
function () {
return 1;
});
Clazz.defineMethod (c$, "createResult", 
function () {
return  new junit.framework.TestResult ();
});
Clazz.defineMethod (c$, "run", 
function () {
var result = this.createResult ();
this.run (result);
return result;
});
Clazz.defineMethod (c$, "run", 
function (result) {
result.run (this);
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "runBare", 
function () {
this.setUp ();
try {
this.runTest ();
} finally {
this.tearDown ();
}
});
Clazz.defineMethod (c$, "runTest", 
function () {
junit.framework.Assert.assertNotNull (this.fName);
var runMethod = null;
try {
runMethod = this.getClass ().getMethod (this.fName, [null]);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
junit.framework.Assert.fail ("Method \"" + this.fName + "\" not found");
} else {
throw e;
}
}
if (!java.lang.reflect.Modifier.isPublic (runMethod.getModifiers ())) {
junit.framework.Assert.fail ("Method \"" + this.fName + "\" should be public");
}try {
runMethod.invoke (this,  new Array (0));
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
e.fillInStackTrace ();
throw e.getTargetException ();
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
e.fillInStackTrace ();
throw e;
}
} else {
throw e$$;
}
}
});
Clazz.defineMethod (c$, "setUp", 
function () {
});
Clazz.defineMethod (c$, "tearDown", 
function () {
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getName () + "(" + this.getClass ().getName () + ")";
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.fName;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.fName = name;
}, "~S");
});
