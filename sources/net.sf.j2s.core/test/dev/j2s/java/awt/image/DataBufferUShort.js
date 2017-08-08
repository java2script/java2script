Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.DataBuffer"], "java.awt.image.DataBufferUShort", ["java.lang.IllegalArgumentException", "$.NullPointerException", "sun.java2d.StateTrackable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.bankdata = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "DataBufferUShort", java.awt.image.DataBuffer);
Clazz.makeConstructor (c$, 
function (size) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.STABLE, 1, size]);
this.data =  Clazz.newShortArray (size, 0);
this.bankdata =  Clazz.newShortArray (1, 0);
this.bankdata[0] = this.data;
}, "~N");
Clazz.makeConstructor (c$, 
function (size, numBanks) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.STABLE, 1, size, numBanks]);
this.bankdata =  Clazz.newShortArray (numBanks, 0);
for (var i = 0; i < numBanks; i++) {
this.bankdata[i] =  Clazz.newShortArray (size, 0);
}
this.data = this.bankdata[0];
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.UNTRACKABLE, 1, size]);
if (dataArray == null) {
throw  new NullPointerException ("dataArray is null");
}this.data = dataArray;
this.bankdata =  Clazz.newShortArray (1, 0);
this.bankdata[0] = this.data;
}, "~A,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size, offset) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.UNTRACKABLE, 1, size, 1, offset]);
if (dataArray == null) {
throw  new NullPointerException ("dataArray is null");
}if ((size + offset) > dataArray.length) {
throw  new IllegalArgumentException ("Length of dataArray is less  than size+offset.");
}this.data = dataArray;
this.bankdata =  Clazz.newShortArray (1, 0);
this.bankdata[0] = this.data;
}, "~A,~N,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.UNTRACKABLE, 1, size, dataArray.length]);
if (dataArray == null) {
throw  new NullPointerException ("dataArray is null");
}for (var i = 0; i < dataArray.length; i++) {
if (dataArray[i] == null) {
throw  new NullPointerException ("dataArray[" + i + "] is null");
}}
this.bankdata = dataArray.clone ();
this.data = this.bankdata[0];
}, "~A,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size, offsets) {
Clazz.superConstructor (this, java.awt.image.DataBufferUShort, [sun.java2d.StateTrackable.State.UNTRACKABLE, 1, size, dataArray.length, offsets]);
if (dataArray == null) {
throw  new NullPointerException ("dataArray is null");
}for (var i = 0; i < dataArray.length; i++) {
if (dataArray[i] == null) {
throw  new NullPointerException ("dataArray[" + i + "] is null");
}if ((size + offsets[i]) > dataArray[i].length) {
throw  new IllegalArgumentException ("Length of dataArray[" + i + "] is less than size+" + "offsets[" + i + "].");
}}
this.bankdata = dataArray.clone ();
this.data = this.bankdata[0];
}, "~A,~N,~A");
Clazz.defineMethod (c$, "getData", 
function () {
this.theTrackable.setUntrackable ();
return this.data;
});
Clazz.defineMethod (c$, "getData", 
function (bank) {
this.theTrackable.setUntrackable ();
return this.bankdata[bank];
}, "~N");
Clazz.defineMethod (c$, "getBankData", 
function () {
this.theTrackable.setUntrackable ();
return this.bankdata.clone ();
});
Clazz.defineMethod (c$, "getElem", 
function (i) {
return (this.data[i + this.offset] & 0xffff);
}, "~N");
Clazz.defineMethod (c$, "getElem", 
function (bank, i) {
return (this.bankdata[bank][i + this.offsets[bank]] & 0xffff);
}, "~N,~N");
Clazz.defineMethod (c$, "setElem", 
function (i, val) {
this.data[i + this.offset] = (val & 0xffff);
this.theTrackable.markDirty ();
}, "~N,~N");
Clazz.defineMethod (c$, "setElem", 
function (bank, i, val) {
this.bankdata[bank][i + this.offsets[bank]] = (val & 0xffff);
this.theTrackable.markDirty ();
}, "~N,~N,~N");
});
