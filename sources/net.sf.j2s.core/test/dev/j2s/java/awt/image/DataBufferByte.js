Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.DataBuffer"], "java.awt.image.DataBufferByte", ["JU.AU", "sun.java2d.StateTrackable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.bankdata = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "DataBufferByte", java.awt.image.DataBuffer);
Clazz.makeConstructor (c$, 
function (size) {
Clazz.superConstructor (this, java.awt.image.DataBufferByte, [sun.java2d.StateTrackable.State.STABLE, 0, size]);
this.data =  Clazz.newByteArray (size, 0);
this.bankdata =  Clazz.newByteArray (1, 0);
this.bankdata[0] = this.data;
}, "~N");
Clazz.makeConstructor (c$, 
function (size, numBanks) {
Clazz.superConstructor (this, java.awt.image.DataBufferByte, [sun.java2d.StateTrackable.State.STABLE, 0, size, numBanks]);
this.bankdata =  Clazz.newByteArray (numBanks, 0);
for (var i = 0; i < numBanks; i++) {
this.bankdata[i] =  Clazz.newByteArray (size, 0);
}
this.data = this.bankdata[0];
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size) {
Clazz.superConstructor (this, java.awt.image.DataBufferByte, [sun.java2d.StateTrackable.State.UNTRACKABLE, 0, size]);
if (JU.AU.isAI (dataArray)) {
this.data = dataArray;
this.bankdata =  Clazz.newByteArray (1, 0);
this.bankdata[0] = this.data;
} else {
this.banks = dataArray.length;
this.bankdata = dataArray.clone ();
this.data = this.bankdata[0];
}}, "~A,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size, offset) {
Clazz.superConstructor (this, java.awt.image.DataBufferByte, [sun.java2d.StateTrackable.State.UNTRACKABLE, 0, size, 1, offset]);
this.data = dataArray;
this.bankdata =  Clazz.newByteArray (1, 0);
this.bankdata[0] = this.data;
}, "~A,~N,~N");
Clazz.makeConstructor (c$, 
function (dataArray, size, offsets) {
Clazz.superConstructor (this, java.awt.image.DataBufferByte, [sun.java2d.StateTrackable.State.UNTRACKABLE, 0, size, dataArray.length, offsets]);
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
return (this.data[i + this.offset]) & 0xff;
}, "~N");
Clazz.defineMethod (c$, "getElem", 
function (bank, i) {
return (this.bankdata[bank][i + this.offsets[bank]]) & 0xff;
}, "~N,~N");
Clazz.defineMethod (c$, "setElem", 
function (i, val) {
this.data[i + this.offset] = val;
this.theTrackable.markDirty ();
}, "~N,~N");
Clazz.defineMethod (c$, "setElem", 
function (bank, i, val) {
this.bankdata[bank][i + this.offsets[bank]] = val;
this.theTrackable.markDirty ();
}, "~N,~N,~N");
});
