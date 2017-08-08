Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.LayoutManager"], "java.awt.GridLayout", ["java.lang.IllegalArgumentException", "java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hgap = 0;
this.vgap = 0;
this.rows = 0;
this.cols = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "GridLayout", null, [java.awt.LayoutManager, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, 0, 0, 0);
});
Clazz.makeConstructor (c$, 
function (rows, cols) {
this.construct (rows, cols, 0, 0);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (rows, cols, hgap, vgap) {
if ((rows == 0) && (cols == 0)) {
throw  new IllegalArgumentException ("rows and cols cannot both be zero");
}this.rows = rows;
this.cols = cols;
this.hgap = hgap;
this.vgap = vgap;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getRows", 
function () {
return this.rows;
});
Clazz.defineMethod (c$, "setRows", 
function (rows) {
if ((rows == 0) && (this.cols == 0)) {
throw  new IllegalArgumentException ("rows and cols cannot both be zero");
}this.rows = rows;
}, "~N");
Clazz.defineMethod (c$, "getColumns", 
function () {
return this.cols;
});
Clazz.defineMethod (c$, "setColumns", 
function (cols) {
if ((cols == 0) && (this.rows == 0)) {
throw  new IllegalArgumentException ("rows and cols cannot both be zero");
}this.cols = cols;
}, "~N");
Clazz.defineMethod (c$, "getHgap", 
function () {
return this.hgap;
});
Clazz.defineMethod (c$, "setHgap", 
function (hgap) {
this.hgap = hgap;
}, "~N");
Clazz.defineMethod (c$, "getVgap", 
function () {
return this.vgap;
});
Clazz.defineMethod (c$, "setVgap", 
function (vgap) {
this.vgap = vgap;
}, "~N");
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, comp) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var nrows = this.rows;
var ncols = this.cols;
if (nrows > 0) {
ncols = Clazz.doubleToInt ((ncomponents + nrows - 1) / nrows);
} else {
nrows = Clazz.doubleToInt ((ncomponents + ncols - 1) / ncols);
}var w = 0;
var h = 0;
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
var d = comp.getPreferredSize ();
if (w < d.width) {
w = d.width;
}if (h < d.height) {
h = d.height;
}}
return  new java.awt.Dimension (insets.left + insets.right + ncols * w + (ncols - 1) * this.hgap, insets.top + insets.bottom + nrows * h + (nrows - 1) * this.vgap);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var nrows = this.rows;
var ncols = this.cols;
if (nrows > 0) {
ncols = Clazz.doubleToInt ((ncomponents + nrows - 1) / nrows);
} else {
nrows = Clazz.doubleToInt ((ncomponents + ncols - 1) / ncols);
}var w = 0;
var h = 0;
for (var i = 0; i < ncomponents; i++) {
var comp = parent.getComponent (i);
var d = comp.getMinimumSize ();
if (w < d.width) {
w = d.width;
}if (h < d.height) {
h = d.height;
}}
return  new java.awt.Dimension (insets.left + insets.right + ncols * w + (ncols - 1) * this.hgap, insets.top + insets.bottom + nrows * h + (nrows - 1) * this.vgap);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
{
var insets = parent.getInsets ();
var ncomponents = parent.getComponentCount ();
var nrows = this.rows;
var ncols = this.cols;
var ltr = parent.getComponentOrientation ().isLeftToRight ();
if (ncomponents == 0) {
return;
}if (nrows > 0) {
ncols = Clazz.doubleToInt ((ncomponents + nrows - 1) / nrows);
} else {
nrows = Clazz.doubleToInt ((ncomponents + ncols - 1) / ncols);
}var totalGapsWidth = (ncols - 1) * this.hgap;
var widthWOInsets = parent.width - (insets.left + insets.right);
var widthOnComponent = Clazz.doubleToInt ((widthWOInsets - totalGapsWidth) / ncols);
var extraWidthAvailable = Clazz.doubleToInt ((widthWOInsets - (widthOnComponent * ncols + totalGapsWidth)) / 2);
var totalGapsHeight = (nrows - 1) * this.vgap;
var heightWOInsets = parent.height - (insets.top + insets.bottom);
var heightOnComponent = Clazz.doubleToInt ((heightWOInsets - totalGapsHeight) / nrows);
var extraHeightAvailable = Clazz.doubleToInt ((heightWOInsets - (heightOnComponent * nrows + totalGapsHeight)) / 2);
if (ltr) {
for (var c = 0, x = insets.left + extraWidthAvailable; c < ncols; c++, x += widthOnComponent + this.hgap) {
for (var r = 0, y = insets.top + extraHeightAvailable; r < nrows; r++, y += heightOnComponent + this.vgap) {
var i = r * ncols + c;
if (i < ncomponents) {
parent.getComponent (i).setBounds (x, y, widthOnComponent, heightOnComponent);
}}
}
} else {
for (var c = 0, x = (parent.width - insets.right - widthOnComponent) - extraWidthAvailable; c < ncols; c++, x -= widthOnComponent + this.hgap) {
for (var r = 0, y = insets.top + extraHeightAvailable; r < nrows; r++, y += heightOnComponent + this.vgap) {
var i = r * ncols + c;
if (i < ncomponents) {
parent.getComponent (i).setBounds (x, y, widthOnComponent, heightOnComponent);
}}
}
}}}, "java.awt.Container");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[hgap=" + this.hgap + ",vgap=" + this.vgap + ",rows=" + this.rows + ",cols=" + this.cols + "]";
});
});
