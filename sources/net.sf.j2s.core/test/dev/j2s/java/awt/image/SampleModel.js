Clazz.declarePackage ("java.awt.image");
Clazz.load (null, "java.awt.image.SampleModel", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
this.numBands = 0;
this.dataType = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "SampleModel");
Clazz.makeConstructor (c$, 
function (dataType, w, h, numBands) {
var size = w * h;
if (w <= 0 || h <= 0) {
throw  new IllegalArgumentException ("Width (" + w + ") and height (" + h + ") must be > 0");
}if (size >= 2147483647) {
throw  new IllegalArgumentException ("Dimensions (width=" + w + " height=" + h + ") are too large");
}if (dataType < 0 || (dataType > 3 && dataType != 32)) {
throw  new IllegalArgumentException ("Unsupported dataType: " + dataType);
}if (numBands <= 0) {
throw  new IllegalArgumentException ("Number of bands must be > 0");
}this.dataType = dataType;
this.width = w;
this.height = h;
this.numBands = numBands;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getNumBands", 
function () {
return this.numBands;
});
Clazz.defineMethod (c$, "getDataType", 
function () {
return this.dataType;
});
Clazz.defineMethod (c$, "getTransferType", 
function () {
return this.dataType;
});
Clazz.defineMethod (c$, "getPixel", 
function (x, y, iArray, data) {
var pixels;
if (iArray != null) pixels = iArray;
 else pixels =  Clazz.newIntArray (this.numBands, 0);
for (var i = 0; i < this.numBands; i++) {
pixels[i] = this.getSample (x, y, i, data);
}
return pixels;
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, obj, data) {
var type = this.getTransferType ();
var numDataElems = this.getNumDataElements ();
var cnt = 0;
var o = null;
switch (type) {
case 0:
var btemp;
var bdata;
if (obj == null) bdata =  Clazz.newByteArray (numDataElems * w * h, 0);
 else bdata = obj;
for (var i = y; i < y + h; i++) {
for (var j = x; j < x + w; j++) {
o = this.getDataElements (j, i, o, data);
btemp = o;
for (var k = 0; k < numDataElems; k++) {
bdata[cnt++] = btemp[k];
}
}
}
obj = bdata;
break;
case 2:
var sdata;
var stemp;
if (obj == null) sdata =  Clazz.newShortArray (numDataElems * w * h, 0);
 else sdata = obj;
for (var i = y; i < y + h; i++) {
for (var j = x; j < x + w; j++) {
o = this.getDataElements (j, i, o, data);
stemp = o;
for (var k = 0; k < numDataElems; k++) {
sdata[cnt++] = stemp[k];
}
}
}
obj = sdata;
break;
case 3:
var idata;
var itemp;
if (obj == null) idata =  Clazz.newIntArray (numDataElems * w * h, 0);
 else idata = obj;
for (var i = y; i < y + h; i++) {
for (var j = x; j < x + w; j++) {
o = this.getDataElements (j, i, o, data);
itemp = o;
for (var k = 0; k < numDataElems; k++) {
idata[cnt++] = itemp[k];
}
}
}
obj = idata;
break;
}
return obj;
}, "~N,~N,~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, obj, data) {
var cnt = 0;
var type = this.getTransferType ();
var numDataElems = this.getNumDataElements ();
switch (type) {
case 0:
var barray = obj;
var btemp =  Clazz.newByteArray (numDataElems, 0);
for (var i = y; i < y + h; i++) {
for (var j = x; j < x + w; j++) {
for (var k = 0; k < numDataElems; k++) {
btemp[k] = barray[cnt++];
}
this.setDataElements (j, i, btemp, data);
}
}
break;
case 3:
var iArray = obj;
var itemp =  Clazz.newIntArray (numDataElems, 0);
for (var i = y; i < y + h; i++) {
for (var j = x; j < x + w; j++) {
for (var k = 0; k < numDataElems; k++) {
itemp[k] = iArray[cnt++];
}
this.setDataElements (j, i, itemp, data);
}
}
break;
}
}, "~N,~N,~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, iArray, data) {
var pixels;
var Offset = 0;
if (iArray != null) pixels = iArray;
 else pixels =  Clazz.newIntArray (this.numBands * w * h, 0);
for (var i = y; i < (h + y); i++) {
for (var j = x; j < (w + x); j++) {
for (var k = 0; k < this.numBands; k++) {
pixels[Offset++] = this.getSample (j, i, k, data);
}
}
}
return pixels;
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getSampleFloat", 
function (x, y, b, data) {
var sample;
sample = this.getSample (x, y, b, data);
return sample;
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getSampleDouble", 
function (x, y, b, data) {
var sample;
sample = this.getSample (x, y, b, data);
return sample;
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, iArray, data) {
var pixels;
var Offset = 0;
if (iArray != null) pixels = iArray;
 else pixels =  Clazz.newIntArray (w * h, 0);
for (var i = y; i < (h + y); i++) {
for (var j = x; j < (w + x); j++) {
pixels[Offset++] = this.getSample (j, i, b, data);
}
}
return pixels;
}, "~N,~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, iArray, data) {
for (var i = 0; i < this.numBands; i++) this.setSample (x, y, i, iArray[i], data);

}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, fArray, data) {
for (var i = 0; i < this.numBands; i++) this.setSample (x, y, i, fArray[i], data);

}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray, data) {
var Offset = 0;
for (var i = y; i < (y + h); i++) {
for (var j = x; j < (x + w); j++) {
for (var k = 0; k < this.numBands; k++) {
this.setSample (j, i, k, iArray[Offset++], data);
}
}
}
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, iArray, data) {
var Offset = 0;
for (var i = y; i < (y + h); i++) {
for (var j = x; j < (x + w); j++) {
this.setSample (j, i, b, iArray[Offset++], data);
}
}
}, "~N,~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
});
