Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.util.zip.DeflaterOutputStream", "$.CRC32"], "java.util.zip.GZIPOutputStream", ["java.util.zip.Deflater"], function () {
c$ = Clazz.decorateAsClass (function () {
this.crc = null;
this.usesDefaultDeflater = false;
Clazz.instantialize (this, arguments);
}, java.util.zip, "GZIPOutputStream", java.util.zip.DeflaterOutputStream);
Clazz.prepareFields (c$, function () {
this.crc =  new java.util.zip.CRC32 ();
});
Clazz.makeConstructor (c$, 
function (out, size) {
Clazz.superConstructor (this, java.util.zip.GZIPOutputStream, [out,  new java.util.zip.Deflater (-1, true), size]);
this.usesDefaultDeflater = true;
this.writeHeader ();
this.crc.reset ();
}, "java.io.OutputStream,~N");
Clazz.makeConstructor (c$, 
function (out) {
this.construct (out, 512);
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "write", 
function (buf, off, len) {
Clazz.superCall (this, java.util.zip.GZIPOutputStream, "write", [buf, off, len]);
this.crc.update (buf, off, len);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "finish", 
function () {
if (!this.deflater.finished ()) {
this.deflater.finish ();
while (!this.deflater.finished ()) {
var len = this.deflate (this.buffer, 0, this.buffer.length);
if (this.deflater.finished () && len <= this.buffer.length - 8) {
this.writeTrailer (this.buffer, len);
len = len + 8;
this.out.write (this.buffer, 0, len);
return;
}if (len > 0) this.out.write (this.buffer, 0, len);
}
var trailer =  Clazz.newByteArray (8, 0);
this.writeTrailer (trailer, 0);
this.out.write (trailer, 0, trailer.length);
}});
Clazz.defineMethod (c$, "writeHeader", 
 function () {
this.out.write (java.util.zip.GZIPOutputStream.header, 0, java.util.zip.GZIPOutputStream.header.length);
});
Clazz.defineMethod (c$, "writeTrailer", 
 function (buf, offset) {
this.writeInt (this.crc.getValue (), buf, offset);
this.writeInt (this.deflater.getTotalIn (), buf, offset + 4);
}, "~A,~N");
Clazz.defineMethod (c$, "writeInt", 
 function (i, buf, offset) {
this.writeShort (i & 0xffff, buf, offset);
this.writeShort ((i >> 16) & 0xffff, buf, offset + 2);
}, "~N,~A,~N");
Clazz.defineMethod (c$, "writeShort", 
 function (s, buf, offset) {
buf[offset] = (s & 0xff);
buf[offset + 1] = ((s >> 8) & 0xff);
}, "~N,~A,~N");
Clazz.defineStatics (c$,
"GZIP_MAGIC", 0x8b1f,
"TRAILER_SIZE", 8,
"header",  Clazz.newByteArray (-1, [35615, (139), 8, 0, 0, 0, 0, 0, 0, 0]));
});
