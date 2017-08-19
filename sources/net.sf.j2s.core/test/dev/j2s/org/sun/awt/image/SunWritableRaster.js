Clazz.declarePackage ("sun.awt.image");
Clazz.load (["java.awt.image.WritableRaster", "sun.awt.image.DataStealer"], "sun.awt.image.SunWritableRaster", ["sun.java2d.StateTrackable", "$.StateTrackableDelegate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.theTrackable = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "SunWritableRaster", java.awt.image.WritableRaster);
c$.getStealer = Clazz.defineMethod (c$, "getStealer", 
 function () {
return (sun.awt.image.SunWritableRaster.stealer == null ? sun.awt.image.SunWritableRaster.stealer = ((Clazz.isClassDefined ("sun.awt.image.SunWritableRaster$1") ? 0 : sun.awt.image.SunWritableRaster.$SunWritableRaster$1$ ()), Clazz.innerTypeInstance (sun.awt.image.SunWritableRaster$1, this, null)) : sun.awt.image.SunWritableRaster.stealer);
});
c$.stealData = Clazz.defineMethod (c$, "stealData", 
function (dbb, bank) {
return sun.awt.image.SunWritableRaster.getStealer ().getData (dbb, bank);
}, "java.awt.image.DataBufferByte,~N");
c$.stealData = Clazz.defineMethod (c$, "stealData", 
function (dbi, bank) {
return sun.awt.image.SunWritableRaster.getStealer ().getData (dbi, bank);
}, "java.awt.image.DataBufferInt,~N");
c$.stealTrackable = Clazz.defineMethod (c$, "stealTrackable", 
function (db) {
return sun.awt.image.SunWritableRaster.getStealer ().getTrackable (db);
}, "java.awt.image.DataBuffer");
c$.setTrackable = Clazz.defineMethod (c$, "setTrackable", 
function (db, trackable) {
sun.awt.image.SunWritableRaster.getStealer ().setTrackable (db, trackable);
}, "java.awt.image.DataBuffer,sun.java2d.StateTrackableDelegate");
c$.makeTrackable = Clazz.defineMethod (c$, "makeTrackable", 
function (db) {
sun.awt.image.SunWritableRaster.getStealer ().setTrackable (db, sun.java2d.StateTrackableDelegate.createInstance (sun.java2d.StateTrackable.State.STABLE));
}, "java.awt.image.DataBuffer");
c$.markDirty = Clazz.defineMethod (c$, "markDirty", 
function (db) {
sun.awt.image.SunWritableRaster.getStealer ().getTrackable (db).markDirty ();
}, "java.awt.image.DataBuffer");
c$.markDirty = Clazz.defineMethod (c$, "markDirty", 
function (wr) {
if (Clazz.instanceOf (wr, sun.awt.image.SunWritableRaster)) {
(wr).markDirty ();
} else {
sun.awt.image.SunWritableRaster.markDirty (wr.getDataBuffer ());
}}, "java.awt.image.WritableRaster");
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, sun.awt.image.SunWritableRaster, [sampleModel, origin]);
this.theTrackable = sun.awt.image.SunWritableRaster.stealTrackable (this.dataBuffer);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, sun.awt.image.SunWritableRaster, [sampleModel, dataBuffer, origin]);
this.theTrackable = sun.awt.image.SunWritableRaster.stealTrackable (dataBuffer);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.image.SunWritableRaster, []);
});
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent) {
Clazz.superConstructor (this, sun.awt.image.SunWritableRaster, []);
this.setSunRaster (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "setSunRaster", 
function (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent) {
this.setRaster (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent);
this.theTrackable = sun.awt.image.SunWritableRaster.stealTrackable (dataBuffer);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "markDirty", 
function () {
this.theTrackable.markDirty ();
});
c$.$SunWritableRaster$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.image, "SunWritableRaster$1", null, sun.awt.image.DataStealer);
Clazz.defineMethod (c$, "getData", 
function (dbb, bank) {
return dbb.bankdata[bank];
}, "java.awt.image.DataBufferByte,~N");
Clazz.defineMethod (c$, "getData", 
function (dbi, bank) {
return dbi.bankdata[bank];
}, "java.awt.image.DataBufferInt,~N");
Clazz.defineMethod (c$, "getTrackable", 
function (db) {
return db.theTrackable;
}, "java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setTrackable", 
function (db, trackable) {
db.theTrackable = trackable;
}, "java.awt.image.DataBuffer,sun.java2d.StateTrackableDelegate");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"stealer", null);
});
