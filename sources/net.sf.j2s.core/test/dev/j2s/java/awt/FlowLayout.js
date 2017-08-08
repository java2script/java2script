Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.LayoutManager"], "java.awt.FlowLayout", ["java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.align = 0;
this.newAlign = 0;
this.hgap = 0;
this.vgap = 0;
this.alignOnBaseline = false;
Clazz.instantialize (this, arguments);
}, java.awt, "FlowLayout", null, [java.awt.LayoutManager, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, 5, 5);
});
Clazz.makeConstructor (c$, 
function (align) {
this.construct (align, 5, 5);
}, "~N");
Clazz.makeConstructor (c$, 
function (align, hgap, vgap) {
this.hgap = hgap;
this.vgap = vgap;
this.setAlignment (align);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getAlignment", 
function () {
return this.newAlign;
});
Clazz.defineMethod (c$, "setAlignment", 
function (align) {
this.newAlign = align;
switch (align) {
case 3:
this.align = 0;
break;
case 4:
this.align = 2;
break;
default:
this.align = align;
break;
}
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
Clazz.defineMethod (c$, "setAlignOnBaseline", 
function (alignOnBaseline) {
this.alignOnBaseline = alignOnBaseline;
}, "~B");
Clazz.defineMethod (c$, "getAlignOnBaseline", 
function () {
return this.alignOnBaseline;
});
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, comp) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
{
var dim =  new java.awt.Dimension (0, 0);
var nmembers = target.getComponentCount ();
var firstVisibleComponent = true;
var useBaseline = this.getAlignOnBaseline ();
var maxAscent = 0;
var maxDescent = 0;
for (var i = 0; i < nmembers; i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
dim.height = Math.max (dim.height, d.height);
if (firstVisibleComponent) {
firstVisibleComponent = false;
} else {
dim.width += this.hgap;
}dim.width += d.width;
if (useBaseline) {
var baseline = m.getBaseline (d.width, d.height);
if (baseline >= 0) {
maxAscent = Math.max (maxAscent, baseline);
maxDescent = Math.max (maxDescent, d.height - baseline);
}}}}
if (useBaseline) {
dim.height = Math.max (maxAscent + maxDescent, dim.height);
}var insets = target.getInsets ();
dim.width += insets.left + insets.right + this.hgap * 2;
dim.height += insets.top + insets.bottom + this.vgap * 2;
return dim;
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
{
var useBaseline = this.getAlignOnBaseline ();
var dim =  new java.awt.Dimension (0, 0);
var nmembers = target.getComponentCount ();
var maxAscent = 0;
var maxDescent = 0;
var firstVisibleComponent = true;
for (var i = 0; i < nmembers; i++) {
var m = target.getComponent (i);
if (m.visible) {
var d = m.getMinimumSize ();
dim.height = Math.max (dim.height, d.height);
if (firstVisibleComponent) {
firstVisibleComponent = false;
} else {
dim.width += this.hgap;
}dim.width += d.width;
if (useBaseline) {
var baseline = m.getBaseline (d.width, d.height);
if (baseline >= 0) {
maxAscent = Math.max (maxAscent, baseline);
maxDescent = Math.max (maxDescent, dim.height - baseline);
}}}}
if (useBaseline) {
dim.height = Math.max (maxAscent + maxDescent, dim.height);
}var insets = target.getInsets ();
dim.width += insets.left + insets.right + this.hgap * 2;
dim.height += insets.top + insets.bottom + this.vgap * 2;
return dim;
}}, "java.awt.Container");
Clazz.defineMethod (c$, "moveComponents", 
 function (target, x, y, width, height, rowStart, rowEnd, ltr, useBaseline, ascent, descent) {
switch (this.newAlign) {
case 0:
x += ltr ? 0 : width;
break;
case 1:
x += Clazz.doubleToInt (width / 2);
break;
case 2:
x += ltr ? width : 0;
break;
case 3:
break;
case 4:
x += width;
break;
}
var maxAscent = 0;
var nonbaselineHeight = 0;
var baselineOffset = 0;
if (useBaseline) {
var maxDescent = 0;
for (var i = rowStart; i < rowEnd; i++) {
var m = target.getComponent (i);
if (m.visible) {
if (ascent[i] >= 0) {
maxAscent = Math.max (maxAscent, ascent[i]);
maxDescent = Math.max (maxDescent, descent[i]);
} else {
nonbaselineHeight = Math.max (m.getHeight (), nonbaselineHeight);
}}}
height = Math.max (maxAscent + maxDescent, nonbaselineHeight);
baselineOffset = Clazz.doubleToInt ((height - maxAscent - maxDescent) / 2);
}for (var i = rowStart; i < rowEnd; i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var cy;
if (useBaseline && ascent[i] >= 0) {
cy = y + baselineOffset + maxAscent - ascent[i];
} else {
cy = y + Clazz.doubleToInt ((height - m.height) / 2);
}if (ltr) {
m.setLocation (x, cy);
} else {
m.setLocation (target.width - x - m.width, cy);
}x += m.width + this.hgap;
}}
return height;
}, "java.awt.Container,~N,~N,~N,~N,~N,~N,~B,~B,~A,~A");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
{
var insets = target.getInsets ();
var maxwidth = target.width - (insets.left + insets.right + this.hgap * 2);
var nmembers = target.getComponentCount ();
var x = 0;
var y = insets.top + this.vgap;
var rowh = 0;
var start = 0;
var ltr = target.getComponentOrientation ().isLeftToRight ();
var useBaseline = this.getAlignOnBaseline ();
var ascent = null;
var descent = null;
if (useBaseline) {
ascent =  Clazz.newIntArray (nmembers, 0);
descent =  Clazz.newIntArray (nmembers, 0);
}for (var i = 0; i < nmembers; i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
m.setSize (d.width, d.height);
if (useBaseline) {
var baseline = m.getBaseline (d.width, d.height);
if (baseline >= 0) {
ascent[i] = baseline;
descent[i] = d.height - baseline;
} else {
ascent[i] = -1;
}}if ((x == 0) || ((x + d.width) <= maxwidth)) {
if (x > 0) {
x += this.hgap;
}x += d.width;
rowh = Math.max (rowh, d.height);
} else {
rowh = this.moveComponents (target, insets.left + this.hgap, y, maxwidth - x, rowh, start, i, ltr, useBaseline, ascent, descent);
x = d.width;
y += this.vgap + rowh;
rowh = d.height;
start = i;
}}}
this.moveComponents (target, insets.left + this.hgap, y, maxwidth - x, rowh, start, nmembers, ltr, useBaseline, ascent, descent);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "toString", 
function () {
var str = "";
switch (this.align) {
case 0:
str = ",align=left";
break;
case 1:
str = ",align=center";
break;
case 2:
str = ",align=right";
break;
case 3:
str = ",align=leading";
break;
case 4:
str = ",align=trailing";
break;
}
return this.getClass ().getName () + "[hgap=" + this.hgap + ",vgap=" + this.vgap + str + "]";
});
Clazz.defineStatics (c$,
"LEFT", 0,
"CENTER", 1,
"RIGHT", 2,
"LEADING", 3,
"TRAILING", 4);
});
