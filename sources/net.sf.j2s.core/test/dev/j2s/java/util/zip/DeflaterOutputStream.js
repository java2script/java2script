Clazz.declarePackage ("java.util.zip");
Clazz.load (["swingjs.jzlib.DeflaterOutputStream"], "java.util.zip.DeflaterOutputStream", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.zip.Deflater"], function () {
c$ = Clazz.declareType (java.util.zip, "DeflaterOutputStream", swingjs.jzlib.DeflaterOutputStream);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
});
Clazz.makeConstructor (c$, 
function (bos) {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
this.setDOS (bos, java.util.zip.DeflaterOutputStream.newDeflater ());
}, "java.io.ByteArrayOutputStream");
Clazz.makeConstructor (c$, 
function (bos, deflater) {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
this.setDOS (bos, deflater);
}, "java.io.ByteArrayOutputStream,java.util.zip.Deflater");
Clazz.makeConstructor (c$, 
function (out, deflater, size) {
Clazz.superConstructor (this, java.util.zip.DeflaterOutputStream, []);
if (out == null || deflater == null) {
throw  new NullPointerException ();
} else if (size <= 0) {
throw  new IllegalArgumentException ("buffer size <= 0");
}this.jzSetDOS (out, deflater, size, false);
}, "java.io.OutputStream,java.util.zip.Deflater,~N");
Clazz.defineMethod (c$, "setDOS", 
function (out, deflater) {
this.jzSetDOS (out, deflater, 0, false);
}, "java.io.OutputStream,java.util.zip.Deflater");
c$.newDeflater = Clazz.defineMethod (c$, "newDeflater", 
function () {
return  new java.util.zip.Deflater (-1, 0, false);
});
});
