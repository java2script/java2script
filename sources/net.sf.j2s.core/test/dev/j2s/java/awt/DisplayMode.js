Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.DisplayMode", ["java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.size = null;
this.bitDepth = 0;
this.refreshRate = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "DisplayMode");
Clazz.makeConstructor (c$, 
function (width, height, bitDepth, refreshRate) {
this.size =  new java.awt.Dimension (width, height);
this.bitDepth = bitDepth;
this.refreshRate = refreshRate;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.size.height;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.size.width;
});
Clazz.defineMethod (c$, "getBitDepth", 
function () {
return this.bitDepth;
});
Clazz.defineMethod (c$, "getRefreshRate", 
function () {
return this.refreshRate;
});
Clazz.defineMethod (c$, "equals", 
function (dm) {
if (dm == null) {
return false;
}return (this.getHeight () == dm.getHeight () && this.getWidth () == dm.getWidth () && this.getBitDepth () == dm.getBitDepth () && this.getRefreshRate () == dm.getRefreshRate ());
}, "java.awt.DisplayMode");
Clazz.defineMethod (c$, "equals", 
function (dm) {
if (Clazz.instanceOf (dm, java.awt.DisplayMode)) {
return this.equals (dm);
} else {
return false;
}}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.getWidth () + this.getHeight () + this.getBitDepth () * 7 + this.getRefreshRate () * 13;
});
Clazz.defineStatics (c$,
"BIT_DEPTH_MULTI", -1,
"REFRESH_RATE_UNKNOWN", 0);
});
