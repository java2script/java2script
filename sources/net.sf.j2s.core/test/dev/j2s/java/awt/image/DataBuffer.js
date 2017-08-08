Clazz.declarePackage ("java.awt.image");
Clazz.load (null, "java.awt.image.DataBuffer", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "sun.java2d.StateTrackable", "$.StateTrackableDelegate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataType = 0;
this.banks = 0;
this.offset = 0;
this.size = 0;
this.offsets = null;
this.theTrackable = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "DataBuffer");
c$.getDataTypeSize = Clazz.defineMethod (c$, "getDataTypeSize", 
function (type) {
if (type < 0 || type > 3) {
throw  new IllegalArgumentException ("Unknown data type " + type);
}return java.awt.image.DataBuffer.dataTypeSize[type];
}, "~N");
Clazz.makeConstructor (c$, 
function (dataType, size) {
this.construct (sun.java2d.StateTrackable.State.UNTRACKABLE, dataType, size);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (initialState, dataType, size) {
this.theTrackable = sun.java2d.StateTrackableDelegate.createInstance (initialState);
this.dataType = dataType;
this.banks = 1;
this.size = size;
this.offset = 0;
this.offsets =  Clazz.newIntArray (1, 0);
}, "sun.java2d.StateTrackable.State,~N,~N");
Clazz.makeConstructor (c$, 
function (dataType, size, numBanks) {
this.construct (sun.java2d.StateTrackable.State.UNTRACKABLE, dataType, size, numBanks);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (initialState, dataType, size, numBanks) {
this.theTrackable = sun.java2d.StateTrackableDelegate.createInstance (initialState);
this.dataType = dataType;
this.banks = numBanks;
this.size = size;
this.offset = 0;
this.offsets =  Clazz.newIntArray (this.banks, 0);
}, "sun.java2d.StateTrackable.State,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (dataType, size, numBanks, offset) {
this.construct (sun.java2d.StateTrackable.State.UNTRACKABLE, dataType, size, numBanks, offset);
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (initialState, dataType, size, numBanks, offset) {
this.theTrackable = sun.java2d.StateTrackableDelegate.createInstance (initialState);
this.dataType = dataType;
this.banks = numBanks;
this.size = size;
this.offset = offset;
this.offsets =  Clazz.newIntArray (numBanks, 0);
for (var i = 0; i < numBanks; i++) {
this.offsets[i] = offset;
}
}, "sun.java2d.StateTrackable.State,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (dataType, size, numBanks, offsets) {
this.construct (sun.java2d.StateTrackable.State.UNTRACKABLE, dataType, size, numBanks, offsets);
}, "~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (initialState, dataType, size, numBanks, offsets) {
if (numBanks != offsets.length) {
throw  new ArrayIndexOutOfBoundsException ("Number of banks does not match number of bank offsets");
}this.theTrackable = sun.java2d.StateTrackableDelegate.createInstance (initialState);
this.dataType = dataType;
this.banks = numBanks;
this.size = size;
this.offset = offsets[0];
this.offsets = offsets.clone ();
}, "sun.java2d.StateTrackable.State,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getDataType", 
function () {
return this.dataType;
});
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "getOffset", 
function () {
return this.offset;
});
Clazz.defineMethod (c$, "getOffsets", 
function () {
return this.offsets.clone ();
});
Clazz.defineMethod (c$, "getNumBanks", 
function () {
return this.banks;
});
Clazz.defineMethod (c$, "getElem", 
function (i) {
return this.getElem (0, i);
}, "~N");
Clazz.defineMethod (c$, "setElem", 
function (i, val) {
this.setElem (0, i, val);
}, "~N,~N");
Clazz.defineMethod (c$, "getElemFloat", 
function (i) {
return this.getElem (i);
}, "~N");
Clazz.defineMethod (c$, "getElemFloat", 
function (bank, i) {
return this.getElem (bank, i);
}, "~N,~N");
Clazz.defineMethod (c$, "setElemFloat", 
function (i, val) {
this.setElem (i, Clazz.floatToInt (val));
}, "~N,~N");
Clazz.defineMethod (c$, "setElemFloat", 
function (bank, i, val) {
this.setElem (bank, i, Clazz.floatToInt (val));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getElemDouble", 
function (i) {
return this.getElem (i);
}, "~N");
Clazz.defineMethod (c$, "getElemDouble", 
function (bank, i) {
return this.getElem (bank, i);
}, "~N,~N");
Clazz.defineMethod (c$, "setElemDouble", 
function (i, val) {
this.setElem (i, Clazz.doubleToInt (val));
}, "~N,~N");
Clazz.defineMethod (c$, "setElemDouble", 
function (bank, i, val) {
this.setElem (bank, i, Clazz.doubleToInt (val));
}, "~N,~N,~N");
c$.toIntArray = Clazz.defineMethod (c$, "toIntArray", 
function (obj) {
if (Clazz.instanceOf (obj, Array)) {
return obj;
} else if (obj == null) {
return null;
} else if (Clazz.instanceOf (obj, Array)) {
var sdata = obj;
var idata =  Clazz.newIntArray (sdata.length, 0);
for (var i = 0; i < sdata.length; i++) {
idata[i] = sdata[i] & 0xffff;
}
return idata;
} else if (Clazz.instanceOf (obj, Array)) {
var bdata = obj;
var idata =  Clazz.newIntArray (bdata.length, 0);
for (var i = 0; i < bdata.length; i++) {
idata[i] = 0xff & bdata[i];
}
return idata;
}return null;
}, "~O");
Clazz.defineStatics (c$,
"TYPE_BYTE", 0,
"TYPE_USHORT", 1,
"TYPE_SHORT", 2,
"TYPE_INT", 3,
"TYPE_UNDEFINED", 32,
"dataTypeSize",  Clazz.newIntArray (-1, [8, 16, 16, 32, 32, 64]));
});
