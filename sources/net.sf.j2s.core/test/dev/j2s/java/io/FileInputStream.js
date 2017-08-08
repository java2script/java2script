Clazz.declarePackage ("java.io");
Clazz.load (["java.io.ByteArrayInputStream"], "java.io.FileInputStream", ["java.io.FileNotFoundException", "java.io.File", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (java.io, "FileInputStream", java.io.ByteArrayInputStream);
Clazz.makeConstructor (c$, 
function (name) {
this.construct (name == null ? null :  new java.io.File (name));
}, "~S");
Clazz.makeConstructor (c$, 
function (file) {
Clazz.superConstructor (this, java.io.FileInputStream, [null]);
var bytes = null;
{
bytes = file && file.__bytes;
}var name = (bytes != null || file == null ? null : file.getPath ());
if (name != null) bytes = swingjs.JSToolkit.getFileAsBytes (name);
if (bytes != null) {
this.setBuf (bytes);
return;
}throw  new java.io.FileNotFoundException ();
}, "java.io.File");
});
