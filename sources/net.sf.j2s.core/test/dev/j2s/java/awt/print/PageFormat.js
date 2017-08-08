Clazz.declarePackage ("java.awt.print");
Clazz.load (null, "java.awt.print.PageFormat", ["java.lang.IllegalArgumentException", "$.InternalError", "java.awt.print.Paper"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mPaper = null;
this.mOrientation = 1;
Clazz.instantialize (this, arguments);
}, java.awt.print, "PageFormat", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.mPaper =  new java.awt.print.Paper ();
});
Clazz.defineMethod (c$, "clone", 
function () {
var newPage;
try {
newPage = Clazz.superCall (this, java.awt.print.PageFormat, "clone", []);
newPage.mPaper = this.mPaper.clone ();
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
e.printStackTrace ();
newPage = null;
} else {
throw e;
}
}
return newPage;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
var width;
var orientation = this.getOrientation ();
if (orientation == 1) {
width = this.mPaper.getWidth ();
} else {
width = this.mPaper.getHeight ();
}return width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
var height;
var orientation = this.getOrientation ();
if (orientation == 1) {
height = this.mPaper.getHeight ();
} else {
height = this.mPaper.getWidth ();
}return height;
});
Clazz.defineMethod (c$, "getImageableX", 
function () {
var x;
switch (this.getOrientation ()) {
case 0:
x = this.mPaper.getHeight () - (this.mPaper.getImageableY () + this.mPaper.getImageableHeight ());
break;
case 1:
x = this.mPaper.getImageableX ();
break;
case 2:
x = this.mPaper.getImageableY ();
break;
default:
throw  new InternalError ("unrecognized orientation");
}
return x;
});
Clazz.defineMethod (c$, "getImageableY", 
function () {
var y;
switch (this.getOrientation ()) {
case 0:
y = this.mPaper.getImageableX ();
break;
case 1:
y = this.mPaper.getImageableY ();
break;
case 2:
y = this.mPaper.getWidth () - (this.mPaper.getImageableX () + this.mPaper.getImageableWidth ());
break;
default:
throw  new InternalError ("unrecognized orientation");
}
return y;
});
Clazz.defineMethod (c$, "getImageableWidth", 
function () {
var width;
if (this.getOrientation () == 1) {
width = this.mPaper.getImageableWidth ();
} else {
width = this.mPaper.getImageableHeight ();
}return width;
});
Clazz.defineMethod (c$, "getImageableHeight", 
function () {
var height;
if (this.getOrientation () == 1) {
height = this.mPaper.getImageableHeight ();
} else {
height = this.mPaper.getImageableWidth ();
}return height;
});
Clazz.defineMethod (c$, "getPaper", 
function () {
return this.mPaper.clone ();
});
Clazz.defineMethod (c$, "setPaper", 
function (paper) {
this.mPaper = paper.clone ();
}, "java.awt.print.Paper");
Clazz.defineMethod (c$, "setOrientation", 
function (orientation) {
if (0 <= orientation && orientation <= 2) {
this.mOrientation = orientation;
} else {
throw  new IllegalArgumentException ();
}}, "~N");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return this.mOrientation;
});
Clazz.defineMethod (c$, "getMatrix", 
function () {
var matrix =  Clazz.newDoubleArray (6, 0);
switch (this.mOrientation) {
case 0:
matrix[0] = 0;
matrix[1] = -1;
matrix[2] = 1;
matrix[3] = 0;
matrix[4] = 0;
matrix[5] = this.mPaper.getHeight ();
break;
case 1:
matrix[0] = 1;
matrix[1] = 0;
matrix[2] = 0;
matrix[3] = 1;
matrix[4] = 0;
matrix[5] = 0;
break;
case 2:
matrix[0] = 0;
matrix[1] = 1;
matrix[2] = -1;
matrix[3] = 0;
matrix[4] = this.mPaper.getWidth ();
matrix[5] = 0;
break;
default:
throw  new IllegalArgumentException ();
}
return matrix;
});
Clazz.defineStatics (c$,
"LANDSCAPE", 0,
"PORTRAIT", 1,
"REVERSE_LANDSCAPE", 2);
});
