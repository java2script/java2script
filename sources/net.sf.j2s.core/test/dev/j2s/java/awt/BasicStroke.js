Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Stroke"], "java.awt.BasicStroke", ["java.lang.Float", "$.IllegalArgumentException", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.join = 0;
this.cap = 0;
this.miterlimit = 0;
this.dash = null;
this.dash_phase = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "BasicStroke", null, [java.awt.Stroke, Cloneable]);
Clazz.makeConstructor (c$, 
function (width, cap, join, miterlimit, dash, dash_phase) {
if (width < 0.0) {
throw  new IllegalArgumentException ("negative width");
}if (cap != 0 && cap != 1 && cap != 2) {
throw  new IllegalArgumentException ("illegal end cap value");
}if (join == 0) {
if (miterlimit < 1.0) {
throw  new IllegalArgumentException ("miter limit < 1");
}} else if (join != 1 && join != 2) {
throw  new IllegalArgumentException ("illegal line join value");
}if (dash != null) {
if (dash_phase < 0.0) {
throw  new IllegalArgumentException ("negative dash phase");
}var allzero = true;
for (var i = 0; i < dash.length; i++) {
var d = dash[i];
if (d > 0.0) {
allzero = false;
} else if (d < 0.0) {
throw  new IllegalArgumentException ("negative dash length");
}}
if (allzero) {
throw  new IllegalArgumentException ("dash lengths all zero");
}}this.width = width;
this.cap = cap;
this.join = join;
this.miterlimit = miterlimit;
if (dash != null) {
this.dash = dash.clone ();
}this.dash_phase = dash_phase;
}, "~N,~N,~N,~N,~A,~N");
Clazz.makeConstructor (c$, 
function (width, cap, join, miterlimit) {
this.construct (width, cap, join, miterlimit, null, 0.0);
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (width, cap, join) {
this.construct (width, cap, join, 10.0, null, 0.0);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (width) {
this.construct (width, 2, 0, 10.0, null, 0.0);
}, "~N");
Clazz.makeConstructor (c$, 
function () {
this.construct (1.0, 2, 0, 10.0, null, 0.0);
});
Clazz.overrideMethod (c$, "createStrokedShape", 
function (s) {
return s;
}, "java.awt.Shape");
Clazz.defineMethod (c$, "getLineWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getEndCap", 
function () {
return this.cap;
});
Clazz.defineMethod (c$, "getLineJoin", 
function () {
return this.join;
});
Clazz.defineMethod (c$, "getMiterLimit", 
function () {
return this.miterlimit;
});
Clazz.defineMethod (c$, "getDashArray", 
function () {
if (this.dash == null) {
return null;
}return this.dash.clone ();
});
Clazz.defineMethod (c$, "getDashPhase", 
function () {
return this.dash_phase;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = Float.floatToIntBits (this.width);
hash = hash * 31 + this.join;
hash = hash * 31 + this.cap;
hash = hash * 31 + Float.floatToIntBits (this.miterlimit);
if (this.dash != null) {
hash = hash * 31 + Float.floatToIntBits (this.dash_phase);
for (var i = 0; i < this.dash.length; i++) {
hash = hash * 31 + Float.floatToIntBits (this.dash[i]);
}
}return hash;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.BasicStroke))) {
return false;
}var bs = obj;
if (this.width != bs.width) {
return false;
}if (this.join != bs.join) {
return false;
}if (this.cap != bs.cap) {
return false;
}if (this.miterlimit != bs.miterlimit) {
return false;
}if (this.dash != null) {
if (this.dash_phase != bs.dash_phase) {
return false;
}if (!java.util.Arrays.equals (this.dash, bs.dash)) {
return false;
}} else if (bs.dash != null) {
return false;
}return true;
}, "~O");
Clazz.overrideMethod (c$, "clone", 
function () {
return  new java.awt.BasicStroke (this.width, this.cap, this.join, this.miterlimit, this.dash, this.dash_phase);
});
Clazz.defineStatics (c$,
"JOIN_MITER", 0,
"JOIN_ROUND", 1,
"JOIN_BEVEL", 2,
"CAP_BUTT", 0,
"CAP_ROUND", 1,
"CAP_SQUARE", 2);
});
