Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.framework.TestListener"], "junit.runner.BaseTestRunner", ["java.io.BufferedReader", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.PrintWriter", "$.StringReader", "$.StringWriter", "java.lang.reflect.Modifier", "java.util.Properties", "junit.framework.TestSuite", "junit.runner.ReloadingTestSuiteLoader", "$.StandardTestSuiteLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fLoading = true;
Clazz.instantialize (this, arguments);
}, junit.runner, "BaseTestRunner", null, junit.framework.TestListener);
Clazz.overrideMethod (c$, "startTest", 
function (test) {
this.testStarted (test.toString ());
}, "junit.framework.Test");
c$.setPreferences = Clazz.defineMethod (c$, "setPreferences", 
function (preferences) {
($t$ = junit.runner.BaseTestRunner.fPreferences = preferences, junit.runner.BaseTestRunner.prototype.fPreferences = junit.runner.BaseTestRunner.fPreferences, $t$);
}, "java.util.Properties");
c$.getPreferences = Clazz.defineMethod (c$, "getPreferences", 
function () {
if (junit.runner.BaseTestRunner.fPreferences == null) {
($t$ = junit.runner.BaseTestRunner.fPreferences =  new java.util.Properties (), junit.runner.BaseTestRunner.prototype.fPreferences = junit.runner.BaseTestRunner.fPreferences, $t$);
junit.runner.BaseTestRunner.fPreferences.put ("loading", "true");
junit.runner.BaseTestRunner.fPreferences.put ("filterstack", "true");
junit.runner.BaseTestRunner.readPreferences ();
}return junit.runner.BaseTestRunner.fPreferences;
});
c$.savePreferences = Clazz.defineMethod (c$, "savePreferences", 
function () {
var fos =  new java.io.FileOutputStream (junit.runner.BaseTestRunner.getPreferencesFile ());
try {
junit.runner.BaseTestRunner.getPreferences ().store (fos, "");
} finally {
fos.close ();
}
});
Clazz.defineMethod (c$, "setPreference", 
function (key, value) {
junit.runner.BaseTestRunner.getPreferences ().setProperty (key, value);
}, "~S,~S");
Clazz.overrideMethod (c$, "endTest", 
function (test) {
this.testEnded (test.toString ());
}, "junit.framework.Test");
Clazz.overrideMethod (c$, "addError", 
function (test, t) {
this.testFailed (1, test, t);
}, "junit.framework.Test,Throwable");
Clazz.overrideMethod (c$, "addFailure", 
function (test, t) {
this.testFailed (2, test, t);
}, "junit.framework.Test,junit.framework.AssertionFailedError");
Clazz.defineMethod (c$, "getTest", 
function (suiteClassName) {
if (suiteClassName.length <= 0) {
this.clearStatus ();
return null;
}var testClass = null;
try {
testClass = this.loadSuiteClass (suiteClassName);
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
var clazz = e.getMessage ();
if (clazz == null) clazz = suiteClassName;
this.runFailed ("Class not found \"" + clazz + "\"");
return null;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.runFailed ("Error: " + e.toString ());
return null;
}
} else {
throw e$$;
}
}
var suiteMethod = null;
try {
suiteMethod = testClass.getMethod ("suite",  new Array (0));
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.clearStatus ();
return  new junit.framework.TestSuite (testClass);
} else {
throw e;
}
}
if (!java.lang.reflect.Modifier.isStatic (suiteMethod.getModifiers ())) {
this.runFailed ("Suite() method must be static");
return null;
}var test = null;
try {
test = suiteMethod.invoke (null,  new Array (0));
if (test == null) return test;
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
this.runFailed ("Failed to invoke suite():" + e.getTargetException ().toString ());
return null;
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
this.runFailed ("Failed to invoke suite():" + e.toString ());
return null;
}
} else {
throw e$$;
}
}
this.clearStatus ();
return test;
}, "~S");
Clazz.defineMethod (c$, "elapsedTimeAsString", 
function (runTime) {
return "" + (runTime / 1000);
}, "~N");
Clazz.defineMethod (c$, "processArguments", 
function (args) {
var suiteName = null;
for (var i = 0; i < args.length; i++) {
if (args[i].equals ("-noloading")) {
this.setLoading (false);
} else if (args[i].equals ("-nofilterstack")) {
($t$ = junit.runner.BaseTestRunner.fgFilterStack = false, junit.runner.BaseTestRunner.prototype.fgFilterStack = junit.runner.BaseTestRunner.fgFilterStack, $t$);
} else if (args[i].equals ("-c")) {
if (args.length > i + 1) suiteName = this.extractClassName (args[i + 1]);
 else System.out.println ("Missing Test class name");
i++;
} else {
suiteName = args[i];
}}
return suiteName;
}, "~A");
Clazz.defineMethod (c$, "setLoading", 
function (enable) {
this.fLoading = enable;
}, "~B");
Clazz.defineMethod (c$, "extractClassName", 
function (className) {
if (className.startsWith ("Default package for")) return className.substring (className.lastIndexOf (".") + 1);
return className;
}, "~S");
c$.truncate = Clazz.defineMethod (c$, "truncate", 
function (s) {
if (junit.runner.BaseTestRunner.fgMaxMessageLength != -1 && s.length > junit.runner.BaseTestRunner.fgMaxMessageLength) s = s.substring (0, junit.runner.BaseTestRunner.fgMaxMessageLength) + "...";
return s;
}, "~S");
Clazz.defineMethod (c$, "loadSuiteClass", 
function (suiteClassName) {
return this.getLoader ().load (suiteClassName);
}, "~S");
Clazz.defineMethod (c$, "clearStatus", 
function () {
});
Clazz.defineMethod (c$, "getLoader", 
function () {
if (this.useReloadingTestSuiteLoader ()) return  new junit.runner.ReloadingTestSuiteLoader ();
return  new junit.runner.StandardTestSuiteLoader ();
});
Clazz.defineMethod (c$, "useReloadingTestSuiteLoader", 
function () {
return junit.runner.BaseTestRunner.getPreference ("loading").equals ("true") && !junit.runner.BaseTestRunner.inVAJava () && this.fLoading;
});
c$.getPreferencesFile = Clazz.defineMethod (c$, "getPreferencesFile", 
($fz = function () {
var home = System.getProperty ("user.home");
return  new java.io.File (home, "junit.properties");
}, $fz.isPrivate = true, $fz));
c$.readPreferences = Clazz.defineMethod (c$, "readPreferences", 
($fz = function () {
var is = null;
try {
is =  new java.io.FileInputStream (junit.runner.BaseTestRunner.getPreferencesFile ());
junit.runner.BaseTestRunner.setPreferences ( new java.util.Properties (junit.runner.BaseTestRunner.getPreferences ()));
junit.runner.BaseTestRunner.getPreferences ().load (is);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
try {
if (is != null) is.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
c$.getPreference = Clazz.defineMethod (c$, "getPreference", 
function (key) {
return junit.runner.BaseTestRunner.getPreferences ().getProperty (key);
}, "~S");
c$.getPreference = Clazz.defineMethod (c$, "getPreference", 
function (key, dflt) {
var value = junit.runner.BaseTestRunner.getPreference (key);
var intValue = dflt;
if (value == null) return intValue;
try {
intValue = Integer.parseInt (value);
} catch (ne) {
if (Clazz.instanceOf (ne, NumberFormatException)) {
} else {
throw ne;
}
}
return intValue;
}, "~S,~N");
c$.inVAJava = Clazz.defineMethod (c$, "inVAJava", 
function () {
try {
Class.forName ("com.ibm.uvm.tools.DebugSupport");
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
return false;
} else {
throw e;
}
}
return true;
});
c$.getFilteredTrace = Clazz.defineMethod (c$, "getFilteredTrace", 
function (t) {
var stringWriter =  new java.io.StringWriter ();
var writer =  new java.io.PrintWriter (stringWriter);
t.printStackTrace (writer);
var buffer = stringWriter.getBuffer ();
var trace = buffer.toString ();
return junit.runner.BaseTestRunner.getFilteredTrace (trace);
}, "Throwable");
c$.getFilteredTrace = Clazz.defineMethod (c$, "getFilteredTrace", 
function (stack) {
if (junit.runner.BaseTestRunner.showStackRaw ()) return stack;
var sw =  new java.io.StringWriter ();
var pw =  new java.io.PrintWriter (sw);
var sr =  new java.io.StringReader (stack);
var br =  new java.io.BufferedReader (sr);
var line;
try {
while ((line = br.readLine ()) != null) {
if (!junit.runner.BaseTestRunner.filterLine (line)) pw.println (line);
}
} catch (IOException) {
if (Clazz.instanceOf (IOException, Exception)) {
return stack;
} else {
throw IOException;
}
}
return sw.toString ();
}, "~S");
c$.showStackRaw = Clazz.defineMethod (c$, "showStackRaw", 
function () {
return !junit.runner.BaseTestRunner.getPreference ("filterstack").equals ("true") || junit.runner.BaseTestRunner.fgFilterStack == false;
});
c$.filterLine = Clazz.defineMethod (c$, "filterLine", 
function (line) {
var patterns = ["junit.framework.TestCase", "junit.framework.TestResult", "junit.framework.TestSuite", "junit.framework.Assert.", "junit.swingui.TestRunner", "junit.awtui.TestRunner", "junit.textui.TestRunner", "java.lang.reflect.Method.invoke("];
for (var i = 0; i < patterns.length; i++) {
if (line.indexOf (patterns[i]) > 0) return true;
}
return false;
}, "~S");
Clazz.defineStatics (c$,
"SUITE_METHODNAME", "suite",
"fPreferences", null,
"fgMaxMessageLength", 500,
"fgFilterStack", true);
{
}});
