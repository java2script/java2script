Clazz.declarePackage ("java.awt.color");
Clazz.load (null, "java.awt.color.ColorSpace", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.numComponents = 0;
this.compName = null;
Clazz.instantialize (this, arguments);
}, java.awt.color, "ColorSpace");
Clazz.makeConstructor (c$, 
function (type, numcomponents) {
this.type = type;
this.numComponents = numcomponents;
}, "~N,~N");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (colorspace) {
var theColorSpace;
switch (colorspace) {
default:
case 1000:
if (java.awt.color.ColorSpace.sRGBspace == null) {
java.awt.color.ColorSpace.sRGBspace =  new java.awt.color.ColorSpace (5, 3);
}theColorSpace = java.awt.color.ColorSpace.sRGBspace;
break;
}
return theColorSpace;
}, "~N");
Clazz.defineMethod (c$, "isCS_sRGB", 
function () {
return (this === java.awt.color.ColorSpace.sRGBspace);
});
Clazz.defineMethod (c$, "toRGB", 
function (colorvalue) {
return colorvalue;
}, "~A");
Clazz.defineMethod (c$, "fromRGB", 
function (rgbvalue) {
return rgbvalue;
}, "~A");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getNumComponents", 
function () {
return this.numComponents;
});
Clazz.defineMethod (c$, "getName", 
function (idx) {
if ((idx < 0) || (idx > this.numComponents - 1)) {
throw  new IllegalArgumentException ("Component index out of range: " + idx);
}if (this.compName == null) {
switch (this.type) {
case 0:
this.compName =  Clazz.newArray (-1, ["X", "Y", "Z"]);
break;
case 1:
this.compName =  Clazz.newArray (-1, ["L", "a", "b"]);
break;
case 2:
this.compName =  Clazz.newArray (-1, ["L", "u", "v"]);
break;
case 3:
this.compName =  Clazz.newArray (-1, ["Y", "Cb", "Cr"]);
break;
case 4:
this.compName =  Clazz.newArray (-1, ["Y", "x", "y"]);
break;
case 5:
this.compName =  Clazz.newArray (-1, ["Red", "Green", "Blue"]);
break;
case 6:
this.compName =  Clazz.newArray (-1, ["Gray"]);
break;
case 7:
this.compName =  Clazz.newArray (-1, ["Hue", "Saturation", "Value"]);
break;
case 8:
this.compName =  Clazz.newArray (-1, ["Hue", "Lightness", "Saturation"]);
break;
case 9:
this.compName =  Clazz.newArray (-1, ["Cyan", "Magenta", "Yellow", "Black"]);
break;
case 11:
this.compName =  Clazz.newArray (-1, ["Cyan", "Magenta", "Yellow"]);
break;
default:
var tmp =  new Array (this.numComponents);
for (var i = 0; i < tmp.length; i++) {
tmp[i] = "Unnamed color component(" + i + ")";
}
this.compName = tmp;
}
}return this.compName[idx];
}, "~N");
Clazz.defineMethod (c$, "getMinValue", 
function (component) {
if ((component < 0) || (component > this.numComponents - 1)) {
throw  new IllegalArgumentException ("Component index out of range: " + component);
}return 0.0;
}, "~N");
Clazz.defineMethod (c$, "getMaxValue", 
function (component) {
if ((component < 0) || (component > this.numComponents - 1)) {
throw  new IllegalArgumentException ("Component index out of range: " + component);
}return 1.0;
}, "~N");
Clazz.defineStatics (c$,
"sRGBspace", null,
"TYPE_XYZ", 0,
"TYPE_Lab", 1,
"TYPE_Luv", 2,
"TYPE_YCbCr", 3,
"TYPE_Yxy", 4,
"TYPE_RGB", 5,
"TYPE_GRAY", 6,
"TYPE_HSV", 7,
"TYPE_HLS", 8,
"TYPE_CMYK", 9,
"TYPE_CMY", 11,
"TYPE_2CLR", 12,
"TYPE_3CLR", 13,
"TYPE_4CLR", 14,
"TYPE_5CLR", 15,
"TYPE_6CLR", 16,
"TYPE_7CLR", 17,
"TYPE_8CLR", 18,
"TYPE_9CLR", 19,
"TYPE_ACLR", 20,
"TYPE_BCLR", 21,
"TYPE_CCLR", 22,
"TYPE_DCLR", 23,
"TYPE_ECLR", 24,
"TYPE_FCLR", 25,
"CS_sRGB", 1000,
"CS_LINEAR_RGB", 1004,
"CS_CIEXYZ", 1001,
"CS_PYCC", 1002,
"CS_GRAY", 1003);
});
