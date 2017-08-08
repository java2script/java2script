Clazz.declarePackage ("java.io");
Clazz.load (["java.io.OutputStream"], "java.io.FileOutputStream", ["java.io.ByteArrayOutputStream", "java.lang.NullPointerException", "JU.OC", "java.io.File", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.out = null;
Clazz.instantialize (this, arguments);
}, java.io, "FileOutputStream", java.io.OutputStream);
Clazz.makeConstructor (c$, 
function (name) {
this.construct (name != null ?  new java.io.File (name) : null, false);
}, "~S");
Clazz.makeConstructor (c$, 
function (name, append) {
this.construct (name != null ?  new java.io.File (name) : null, append);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (file) {
this.construct (file, false);
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (file, append) {
Clazz.superConstructor (this, java.io.FileOutputStream, []);
var name = (file != null ? file.getPath () : null);
if (name == null) {
throw  new NullPointerException ();
}if (append) {
this.openAppend (name);
} else {
this.open (name);
}}, "java.io.File,~B");
Clazz.makeConstructor (c$, 
function (fdObj) {
Clazz.superConstructor (this, java.io.FileOutputStream, []);
swingjs.JSToolkit.notImplemented (null);
}, "java.io.FileDescriptor");
Clazz.defineMethod (c$, "open", 
 function (name) {
this.out =  new JU.OC ();
this.out.setParams (null, name, false, null);
}, "~S");
Clazz.defineMethod (c$, "openAppend", 
 function (name) {
this.out =  new JU.OC ();
var bytes = swingjs.JSToolkit.getFileAsBytes (name);
var os =  new java.io.ByteArrayOutputStream ();
os.write (bytes, 0, bytes.length);
this.out.setParams (null, name, false, os);
}, "~S");
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
this.out.writeByteAsInt (b);
}, "~N");
Clazz.defineMethod (c$, "writeBytes", 
 function (b, off, len) {
this.out.write (b, off, len);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "write", 
function (b) {
this.out.writeByteAsInt (b);
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b) {
this.writeBytes (b, 0, b.length);
}, "~A");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
this.writeBytes (b, off, len);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "close", 
function () {
this.out.closeChannel ();
});
Clazz.overrideMethod (c$, "finalize", 
function () {
this.close ();
});
});
