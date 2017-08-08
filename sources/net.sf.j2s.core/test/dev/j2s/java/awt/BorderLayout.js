Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.LayoutManager2"], "java.awt.BorderLayout", ["java.lang.IllegalArgumentException", "java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hgap = 0;
this.vgap = 0;
this.north = null;
this.west = null;
this.east = null;
this.south = null;
this.center = null;
this.firstLine = null;
this.lastLine = null;
this.firstItem = null;
this.lastItem = null;
Clazz.instantialize (this, arguments);
}, java.awt, "BorderLayout", null, [java.awt.LayoutManager2, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0);
});
Clazz.makeConstructor (c$, 
function (hgap, vgap) {
this.hgap = hgap;
this.vgap = vgap;
}, "~N,~N");
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
Clazz.defineMethod (c$, "addLayoutComponent", 
function (comp, constraints) {
{
if ((constraints == null) || (Clazz.instanceOf (constraints, String))) {
this.addLayoutComponent (constraints, comp);
} else {
throw  new IllegalArgumentException ("cannot add to layout: constraint must be a string (or null)");
}}}, "java.awt.Component,~O");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (name, comp) {
{
if (name == null) {
name = "Center";
}if ("Center".equals (name)) {
this.center = comp;
} else if ("North".equals (name)) {
this.north = comp;
} else if ("South".equals (name)) {
this.south = comp;
} else if ("East".equals (name)) {
this.east = comp;
} else if ("West".equals (name)) {
this.west = comp;
} else if ("First".equals (name)) {
this.firstLine = comp;
} else if ("Last".equals (name)) {
this.lastLine = comp;
} else if ("Before".equals (name)) {
this.firstItem = comp;
} else if ("After".equals (name)) {
this.lastItem = comp;
} else {
throw  new IllegalArgumentException ("cannot add to layout: unknown constraint: " + name);
}}}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
{
if (comp === this.center) {
this.center = null;
} else if (comp === this.north) {
this.north = null;
} else if (comp === this.south) {
this.south = null;
} else if (comp === this.east) {
this.east = null;
} else if (comp === this.west) {
this.west = null;
}if (comp === this.firstLine) {
this.firstLine = null;
} else if (comp === this.lastLine) {
this.lastLine = null;
} else if (comp === this.firstItem) {
this.firstItem = null;
} else if (comp === this.lastItem) {
this.lastItem = null;
}}}, "java.awt.Component");
Clazz.defineMethod (c$, "getLayoutComponent", 
function (constraints) {
if ("Center".equals (constraints)) {
return this.center;
} else if ("North".equals (constraints)) {
return this.north;
} else if ("South".equals (constraints)) {
return this.south;
} else if ("West".equals (constraints)) {
return this.west;
} else if ("East".equals (constraints)) {
return this.east;
} else if ("First".equals (constraints)) {
return this.firstLine;
} else if ("Last".equals (constraints)) {
return this.lastLine;
} else if ("Before".equals (constraints)) {
return this.firstItem;
} else if ("After".equals (constraints)) {
return this.lastItem;
} else {
throw  new IllegalArgumentException ("cannot get component: unknown constraint: " + constraints);
}}, "~O");
Clazz.defineMethod (c$, "getLayoutComponent", 
function (target, constraints) {
var ltr = target.getComponentOrientation ().isLeftToRight ();
var result = null;
if ("North".equals (constraints)) {
result = (this.firstLine != null) ? this.firstLine : this.north;
} else if ("South".equals (constraints)) {
result = (this.lastLine != null) ? this.lastLine : this.south;
} else if ("West".equals (constraints)) {
result = ltr ? this.firstItem : this.lastItem;
if (result == null) {
result = this.west;
}} else if ("East".equals (constraints)) {
result = ltr ? this.lastItem : this.firstItem;
if (result == null) {
result = this.east;
}} else if ("Center".equals (constraints)) {
result = this.center;
} else {
throw  new IllegalArgumentException ("cannot get component: invalid constraint: " + constraints);
}return result;
}, "java.awt.Container,~O");
Clazz.defineMethod (c$, "getConstraints", 
function (comp) {
if (comp == null) {
return null;
}if (comp === this.center) {
return "Center";
} else if (comp === this.north) {
return "North";
} else if (comp === this.south) {
return "South";
} else if (comp === this.west) {
return "West";
} else if (comp === this.east) {
return "East";
} else if (comp === this.firstLine) {
return "First";
} else if (comp === this.lastLine) {
return "Last";
} else if (comp === this.firstItem) {
return "Before";
} else if (comp === this.lastItem) {
return "After";
}return null;
}, "java.awt.Component");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
{
var dim =  new java.awt.Dimension (0, 0);
var ltr = target.getComponentOrientation ().isLeftToRight ();
var c = null;
if ((c = this.getChild ("East", ltr)) != null) {
var d = c.getMinimumSize ();
dim.width += d.width + this.hgap;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("West", ltr)) != null) {
var d = c.getMinimumSize ();
dim.width += d.width + this.hgap;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("Center", ltr)) != null) {
var d = c.getMinimumSize ();
dim.width += d.width;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("North", ltr)) != null) {
var d = c.getMinimumSize ();
dim.width = Math.max (d.width, dim.width);
dim.height += d.height + this.vgap;
}if ((c = this.getChild ("South", ltr)) != null) {
var d = c.getMinimumSize ();
dim.width = Math.max (d.width, dim.width);
dim.height += d.height + this.vgap;
}var insets = target.getInsets ();
dim.width += insets.left + insets.right;
dim.height += insets.top + insets.bottom;
return dim;
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
{
var dim =  new java.awt.Dimension (0, 0);
var ltr = target.getComponentOrientation ().isLeftToRight ();
var c = null;
if ((c = this.getChild ("East", ltr)) != null) {
var d = c.getPreferredSize ();
dim.width += d.width + this.hgap;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("West", ltr)) != null) {
var d = c.getPreferredSize ();
dim.width += d.width + this.hgap;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("Center", ltr)) != null) {
var d = c.getPreferredSize ();
dim.width += d.width;
dim.height = Math.max (d.height, dim.height);
}if ((c = this.getChild ("North", ltr)) != null) {
var d = c.getPreferredSize ();
dim.width = Math.max (d.width, dim.width);
dim.height += d.height + this.vgap;
}if ((c = this.getChild ("South", ltr)) != null) {
var d = c.getPreferredSize ();
dim.width = Math.max (d.width, dim.width);
dim.height += d.height + this.vgap;
}var insets = target.getInsets ();
dim.width += insets.left + insets.right;
dim.height += insets.top + insets.bottom;
return dim;
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (target) {
return  new java.awt.Dimension (2147483647, 2147483647);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (parent) {
return 0.5;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (parent) {
return 0.5;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (target) {
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
{
var insets = target.getInsets ();
var top = insets.top;
var bottom = target.height - insets.bottom;
var left = insets.left;
var right = target.width - insets.right;
var ltr = target.getComponentOrientation ().isLeftToRight ();
var c = null;
if ((c = this.getChild ("North", ltr)) != null) {
c.setSize (right - left, c.height);
var d = c.getPreferredSize ();
c.setBounds (left, top, right - left, d.height);
top += d.height + this.vgap;
}if ((c = this.getChild ("South", ltr)) != null) {
c.setSize (right - left, c.height);
var d = c.getPreferredSize ();
c.setBounds (left, bottom - d.height, right - left, d.height);
bottom -= d.height + this.vgap;
}if ((c = this.getChild ("East", ltr)) != null) {
c.setSize (c.width, bottom - top);
var d = c.getPreferredSize ();
c.setBounds (right - d.width, top, d.width, bottom - top);
right -= d.width + this.hgap;
}if ((c = this.getChild ("West", ltr)) != null) {
c.setSize (c.width, bottom - top);
var d = c.getPreferredSize ();
c.setBounds (left, top, d.width, bottom - top);
left += d.width + this.hgap;
}if ((c = this.getChild ("Center", ltr)) != null) {
c.setBounds (left, top, right - left, bottom - top);
}}}, "java.awt.Container");
Clazz.defineMethod (c$, "getChild", 
 function (key, ltr) {
var result = null;
if (key === "North") {
result = (this.firstLine != null) ? this.firstLine : this.north;
} else if (key === "South") {
result = (this.lastLine != null) ? this.lastLine : this.south;
} else if (key === "West") {
result = ltr ? this.firstItem : this.lastItem;
if (result == null) {
result = this.west;
}} else if (key === "East") {
result = ltr ? this.lastItem : this.firstItem;
if (result == null) {
result = this.east;
}} else if (key === "Center") {
result = this.center;
}if (result != null && !result.visible) {
result = null;
}return result;
}, "~S,~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[hgap=" + this.hgap + ",vgap=" + this.vgap + "]";
});
Clazz.defineStatics (c$,
"NORTH", "North",
"SOUTH", "South",
"EAST", "East",
"WEST", "West",
"CENTER", "Center",
"BEFORE_FIRST_LINE", "First",
"AFTER_LAST_LINE", "Last",
"BEFORE_LINE_BEGINS", "Before",
"AFTER_LINE_ENDS", "After");
c$.PAGE_START = c$.prototype.PAGE_START = "First";
c$.PAGE_END = c$.prototype.PAGE_END = "Last";
c$.LINE_START = c$.prototype.LINE_START = "Before";
c$.LINE_END = c$.prototype.LINE_END = "After";
});
