Clazz.declarePackage ("java.io");
Clazz.load (["java.io.OutputStreamWriter"], "java.io.FileWriter", ["java.io.FileOutputStream"], function () {
c$ = Clazz.declareType (java.io, "FileWriter", java.io.OutputStreamWriter);
Clazz.makeConstructor (c$, 
function (fileName) {
Clazz.superConstructor (this, java.io.FileWriter, [ new java.io.FileOutputStream (fileName)]);
}, "~S");
Clazz.makeConstructor (c$, 
function (fileName, append) {
Clazz.superConstructor (this, java.io.FileWriter, [ new java.io.FileOutputStream (fileName, append)]);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (file) {
Clazz.superConstructor (this, java.io.FileWriter, [ new java.io.FileOutputStream (file)]);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, append) {
Clazz.superConstructor (this, java.io.FileWriter, [ new java.io.FileOutputStream (file, append)]);
}, "java.io.File,~B");
});
