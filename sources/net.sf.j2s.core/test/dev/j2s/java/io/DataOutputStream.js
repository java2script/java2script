Clazz.declarePackage ("java.io");
Clazz.load (["java.io.DataOutput", "$.FilterOutputStream"], "java.io.DataOutputStream", ["java.io.UTFDataFormatException", "java.lang.Double", "$.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.written = 0;
this.bytearr = null;
this.writeBuffer = null;
Clazz.instantialize (this, arguments);
}, java.io, "DataOutputStream", java.io.FilterOutputStream, java.io.DataOutput);
Clazz.prepareFields (c$, function () {
this.writeBuffer =  Clazz.newByteArray (8, 0);
});
Clazz.defineMethod (c$, "incCount", 
 function (value) {
var temp = this.written + value;
if (temp < 0) {
temp = 2147483647;
}this.written = temp;
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b) {
this.out.writeByteAsInt (b);
this.incCount (1);
}, "~N");
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
this.out.writeByteAsInt (b);
this.incCount (1);
}, "~N");
Clazz.overrideMethod (c$, "writeIntAsByte", 
function (v) {
this.out.writeByteAsInt (v);
this.incCount (1);
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
this.out.write (b, off, len);
this.incCount (len);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "flush", 
function () {
this.out.flush ();
});
Clazz.overrideMethod (c$, "writeBoolean", 
function (v) {
this.out.write (v ? 1 : 0);
this.incCount (1);
}, "~B");
Clazz.defineMethod (c$, "writeByte", 
function (v) {
this.out.write (v);
this.incCount (1);
}, "~N");
Clazz.overrideMethod (c$, "writeShort", 
function (v) {
this.out.write ((v >>> 8) & 0xFF);
this.out.write ((v >>> 0) & 0xFF);
this.incCount (2);
}, "~N");
Clazz.overrideMethod (c$, "writeChar", 
function (v) {
this.out.write ((v >>> 8) & 0xFF);
this.out.write ((v >>> 0) & 0xFF);
this.incCount (2);
}, "~N");
Clazz.overrideMethod (c$, "writeInt", 
function (v) {
this.out.write ((v >>> 24) & 0xFF);
this.out.write ((v >>> 16) & 0xFF);
this.out.write ((v >>> 8) & 0xFF);
this.out.write ((v >>> 0) & 0xFF);
this.incCount (4);
}, "~N");
Clazz.overrideMethod (c$, "writeLong", 
function (v) {
this.writeBuffer[0] = (v >>> 56);
this.writeBuffer[1] = (v >>> 48);
this.writeBuffer[2] = (v >>> 40);
this.writeBuffer[3] = (v >>> 32);
this.writeBuffer[4] = (v >>> 24);
this.writeBuffer[5] = (v >>> 16);
this.writeBuffer[6] = (v >>> 8);
this.writeBuffer[7] = (v >>> 0);
this.out.write (this.writeBuffer, 0, 8);
this.incCount (8);
}, "~N");
Clazz.overrideMethod (c$, "writeFloat", 
function (v) {
this.writeInt (Float.floatToIntBits (v));
}, "~N");
Clazz.overrideMethod (c$, "writeDouble", 
function (v) {
this.writeLong (Double.doubleToLongBits (v));
}, "~N");
Clazz.overrideMethod (c$, "writeBytes", 
function (s) {
var len = s.length;
for (var i = 0; i < len; i++) {
this.out.write ((s.charAt (i)).charCodeAt (0));
}
this.incCount (len);
}, "~S");
Clazz.overrideMethod (c$, "writeChars", 
function (s) {
var len = s.length;
for (var i = 0; i < len; i++) {
var v = s.charCodeAt (i);
this.out.write ((v >>> 8) & 0xFF);
this.out.write ((v >>> 0) & 0xFF);
}
this.incCount (len * 2);
}, "~S");
Clazz.defineMethod (c$, "writeUTF", 
function (str) {
java.io.DataOutputStream.writeUTF (str, this);
}, "~S");
c$.writeUTF = Clazz.defineMethod (c$, "writeUTF", 
function (str, out) {
var strlen = str.length;
var utflen = 0;
var c;
var count = 0;
for (var i = 0; i < strlen; i++) {
c = str.charCodeAt (i);
if ((c >= 0x0001) && (c <= 0x007F)) {
utflen++;
} else if (c > 0x07FF) {
utflen += 3;
} else {
utflen += 2;
}}
if (utflen > 65535) throw  new java.io.UTFDataFormatException ("encoded string too long: " + utflen + " bytes");
var bytearr = null;
if (Clazz.instanceOf (out, java.io.DataOutputStream)) {
var dos = out;
if (dos.bytearr == null || (dos.bytearr.length < (utflen + 2))) dos.bytearr =  Clazz.newByteArray ((utflen * 2) + 2, 0);
bytearr = dos.bytearr;
} else {
bytearr =  Clazz.newByteArray (utflen + 2, 0);
}bytearr[count++] = ((utflen >>> 8) & 0xFF);
bytearr[count++] = ((utflen >>> 0) & 0xFF);
var i = 0;
for (i = 0; i < strlen; i++) {
c = str.charCodeAt (i);
if (!((c >= 0x0001) && (c <= 0x007F))) break;
bytearr[count++] = c;
}
for (; i < strlen; i++) {
c = str.charCodeAt (i);
if ((c >= 0x0001) && (c <= 0x007F)) {
bytearr[count++] = c;
} else if (c > 0x07FF) {
bytearr[count++] = (0xE0 | ((c >> 12) & 0x0F));
bytearr[count++] = (0x80 | ((c >> 6) & 0x3F));
bytearr[count++] = (0x80 | ((c >> 0) & 0x3F));
} else {
bytearr[count++] = (0xC0 | ((c >> 6) & 0x1F));
bytearr[count++] = (0x80 | ((c >> 0) & 0x3F));
}}
out.write (bytearr, 0, utflen + 2);
return utflen + 2;
}, "~S,java.io.DataOutput");
Clazz.defineMethod (c$, "size", 
function () {
return this.written;
});
});
