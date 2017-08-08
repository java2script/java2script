Clazz.declarePackage ("java.io");
Clazz.load (["java.io.InputStreamReader"], "java.io.FileReader", ["java.io.FileInputStream"], function () {
c$ = Clazz.declareType (java.io, "FileReader", java.io.InputStreamReader);
Clazz.makeConstructor (c$, 
function (fileName) {
Clazz.superConstructor (this, java.io.FileReader, [ new java.io.FileInputStream (fileName)]);
}, "~S");
Clazz.makeConstructor (c$, 
function (file) {
Clazz.superConstructor (this, java.io.FileReader, [ new java.io.FileInputStream (file)]);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (fd) {
Clazz.superConstructor (this, java.io.FileReader, [ new java.io.FileInputStream (Clazz.castNullAs ("java.io.File"))]);
}, "java.io.FileDescriptor");
});
