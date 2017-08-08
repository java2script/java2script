Clazz.declarePackage ("java.awt.print");
Clazz.load (null, "java.awt.print.Paper", ["java.awt.geom.Rectangle2D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mHeight = 0;
this.mWidth = 0;
this.mImageableArea = null;
Clazz.instantialize (this, arguments);
}, java.awt.print, "Paper", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.mHeight = 792.0;
this.mWidth = 612.0;
this.mImageableArea =  new java.awt.geom.Rectangle2D.Double (72, 72, this.mWidth - 144, this.mHeight - 144);
});
Clazz.defineMethod (c$, "clone", 
function () {
var newPaper;
try {
newPaper = Clazz.superCall (this, java.awt.print.Paper, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
e.printStackTrace ();
newPaper = null;
} else {
throw e;
}
}
return newPaper;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.mHeight;
});
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.mWidth = width;
this.mHeight = height;
}, "~N,~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.mWidth;
});
Clazz.defineMethod (c$, "setImageableArea", 
function (x, y, width, height) {
this.mImageableArea =  new java.awt.geom.Rectangle2D.Double (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getImageableX", 
function () {
return this.mImageableArea.getX ();
});
Clazz.defineMethod (c$, "getImageableY", 
function () {
return this.mImageableArea.getY ();
});
Clazz.defineMethod (c$, "getImageableWidth", 
function () {
return this.mImageableArea.getWidth ();
});
Clazz.defineMethod (c$, "getImageableHeight", 
function () {
return this.mImageableArea.getHeight ();
});
Clazz.defineStatics (c$,
"INCH", 72,
"LETTER_WIDTH", 612.0,
"LETTER_HEIGHT", 792);
});
