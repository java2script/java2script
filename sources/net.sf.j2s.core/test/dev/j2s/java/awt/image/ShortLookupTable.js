Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.LookupTable"], "java.awt.image.ShortLookupTable", ["java.lang.ArrayIndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "ShortLookupTable", java.awt.image.LookupTable);
Clazz.makeConstructor (c$, 
function (offset, data) {
Clazz.superConstructor (this, java.awt.image.ShortLookupTable, [offset, data.length]);
this.numComponents = data.length;
this.numEntries = data[0].length;
this.data =  Clazz.newShortArray (this.numComponents, 0);
for (var i = 0; i < this.numComponents; i++) {
this.data[i] = data[i];
}
}, "~N,~A");
Clazz.makeConstructor (c$, 
function (offset, data) {
Clazz.superConstructor (this, java.awt.image.ShortLookupTable, [offset, data.length]);
this.numComponents = 1;
this.numEntries = data.length;
this.data =  Clazz.newShortArray (1, 0);
this.data[0] = data;
}, "~N,~A");
Clazz.defineMethod (c$, "getTable", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "lookupPixel", 
function (src, dst) {
if (dst == null) {
dst =  Clazz.newIntArray (src.length, 0);
}if (this.numComponents == 1) {
for (var i = 0; i < src.length; i++) {
var s = (src[i] & 0xffff) - this.offset;
if (s < 0) {
throw  new ArrayIndexOutOfBoundsException ("src[" + i + "]-offset is " + "less than zero");
}dst[i] = this.data[0][s];
}
} else {
for (var i = 0; i < src.length; i++) {
var s = (src[i] & 0xffff) - this.offset;
if (s < 0) {
throw  new ArrayIndexOutOfBoundsException ("src[" + i + "]-offset is " + "less than zero");
}dst[i] = this.data[i][s];
}
}return dst;
}, "~A,~A");
Clazz.defineMethod (c$, "lookupPixel", 
function (src, dst) {
if (dst == null) {
dst =  Clazz.newShortArray (src.length, 0);
}if (this.numComponents == 1) {
for (var i = 0; i < src.length; i++) {
var s = (src[i] & 0xffff) - this.offset;
if (s < 0) {
throw  new ArrayIndexOutOfBoundsException ("src[" + i + "]-offset is " + "less than zero");
}dst[i] = this.data[0][s];
}
} else {
for (var i = 0; i < src.length; i++) {
var s = (src[i] & 0xffff) - this.offset;
if (s < 0) {
throw  new ArrayIndexOutOfBoundsException ("src[" + i + "]-offset is " + "less than zero");
}dst[i] = this.data[i][s];
}
}return dst;
}, "~A,~A");
});
