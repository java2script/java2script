Clazz.declarePackage ("junit.runner");
Clazz.load (["junit.runner.TestCollector"], "junit.runner.ClassPathTestCollector", ["java.io.File", "java.util.Hashtable", "$.StringTokenizer", "$.Vector"], function () {
c$ = Clazz.declareType (junit.runner, "ClassPathTestCollector", null, junit.runner.TestCollector);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "collectTests", 
function () {
var classPath = System.getProperty ("java.class.path");
var result = this.collectFilesInPath (classPath);
return result.elements ();
});
Clazz.defineMethod (c$, "collectFilesInPath", 
function (classPath) {
var result = this.collectFilesInRoots (this.splitClassPath (classPath));
return result;
}, "~S");
Clazz.defineMethod (c$, "collectFilesInRoots", 
function (roots) {
var result =  new java.util.Hashtable (100);
var e = roots.elements ();
while (e.hasMoreElements ()) this.gatherFiles ( new java.io.File (e.nextElement ()), "", result);

return result;
}, "java.util.Vector");
Clazz.defineMethod (c$, "gatherFiles", 
function (classRoot, classFileName, result) {
var thisRoot =  new java.io.File (classRoot, classFileName);
if (thisRoot.isFile ()) {
if (this.isTestClass (classFileName)) {
var className = this.classNameFromFile (classFileName);
result.put (className, className);
}return ;
}var contents = thisRoot.list ();
if (contents != null) {
for (var i = 0; i < contents.length; i++) this.gatherFiles (classRoot, classFileName + java.io.File.separatorChar + contents[i], result);

}}, "java.io.File,~S,java.util.Hashtable");
Clazz.defineMethod (c$, "splitClassPath", 
function (classPath) {
var result =  new java.util.Vector ();
var separator = System.getProperty ("path.separator");
var tokenizer =  new java.util.StringTokenizer (classPath, separator);
while (tokenizer.hasMoreTokens ()) result.addElement (tokenizer.nextToken ());

return result;
}, "~S");
Clazz.defineMethod (c$, "isTestClass", 
function (classFileName) {
return classFileName.endsWith (".class") && classFileName.indexOf ('$') < 0 && classFileName.indexOf ("Test") > 0;
}, "~S");
Clazz.defineMethod (c$, "classNameFromFile", 
function (classFileName) {
var s = classFileName.substring (0, classFileName.length - junit.runner.ClassPathTestCollector.SUFFIX_LENGTH);
var s2 = s.$replace (java.io.File.separatorChar, '.');
if (s2.startsWith (".")) return s2.substring (1);
return s2;
}, "~S");
c$.SUFFIX_LENGTH = c$.prototype.SUFFIX_LENGTH = ".class".length;
});
