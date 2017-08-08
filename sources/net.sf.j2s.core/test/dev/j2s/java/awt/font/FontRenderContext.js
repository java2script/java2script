Clazz.declarePackage ("java.awt.font");
Clazz.load (null, "java.awt.font.FontRenderContext", ["java.awt.RenderingHints", "java.awt.geom.AffineTransform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tx = null;
this.aaHintValue = null;
this.fmHintValue = null;
this.defaulting = false;
Clazz.instantialize (this, arguments);
}, java.awt.font, "FontRenderContext");
Clazz.makeConstructor (c$, 
function () {
this.defaulting = true;
});
Clazz.makeConstructor (c$, 
function (tx, isAntiAliased, usesFractionalMetrics) {
if (tx != null && !tx.isIdentity ()) {
this.tx =  new java.awt.geom.AffineTransform (tx);
}}, "java.awt.geom.AffineTransform,~B,~B");
Clazz.makeConstructor (c$, 
function (tx, aaHint, fmHint) {
if (tx != null && !tx.isIdentity ()) {
this.tx =  new java.awt.geom.AffineTransform (tx);
}this.aaHintValue = aaHint;
this.fmHintValue = fmHint;
}, "java.awt.geom.AffineTransform,~O,~O");
Clazz.defineMethod (c$, "isTransformed", 
function () {
if (!this.defaulting) {
return this.tx != null;
} else {
return !this.getTransform ().isIdentity ();
}});
Clazz.defineMethod (c$, "getTransformType", 
function () {
if (!this.defaulting) {
if (this.tx == null) {
return 0;
} else {
return this.tx.getType ();
}} else {
return this.getTransform ().getType ();
}});
Clazz.defineMethod (c$, "getTransform", 
function () {
return (this.tx == null) ?  new java.awt.geom.AffineTransform () :  new java.awt.geom.AffineTransform (this.tx);
});
Clazz.defineMethod (c$, "isAntiAliased", 
function () {
return !(this.aaHintValue === java.awt.RenderingHints.VALUE_TEXT_ANTIALIAS_OFF || this.aaHintValue === java.awt.RenderingHints.VALUE_TEXT_ANTIALIAS_DEFAULT);
});
Clazz.defineMethod (c$, "usesFractionalMetrics", 
function () {
return !(this.fmHintValue === java.awt.RenderingHints.VALUE_FRACTIONALMETRICS_OFF || this.fmHintValue === java.awt.RenderingHints.VALUE_FRACTIONALMETRICS_DEFAULT);
});
Clazz.defineMethod (c$, "getAntiAliasingHint", 
function () {
if (this.defaulting) {
if (this.isAntiAliased ()) {
return java.awt.RenderingHints.VALUE_TEXT_ANTIALIAS_ON;
} else {
return java.awt.RenderingHints.VALUE_TEXT_ANTIALIAS_OFF;
}}return this.aaHintValue;
});
Clazz.defineMethod (c$, "getFractionalMetricsHint", 
function () {
if (this.defaulting) {
if (this.usesFractionalMetrics ()) {
return java.awt.RenderingHints.VALUE_FRACTIONALMETRICS_ON;
} else {
return java.awt.RenderingHints.VALUE_FRACTIONALMETRICS_OFF;
}}return this.fmHintValue;
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
try {
return this.equals (obj);
} catch (e) {
if (Clazz.exceptionOf (e, ClassCastException)) {
return false;
} else {
throw e;
}
}
}, "~O");
Clazz.defineMethod (c$, "equals", 
function (rhs) {
if (this === rhs) {
return true;
}if (rhs == null) {
return false;
}if (!rhs.defaulting && !this.defaulting) {
if (rhs.aaHintValue === this.aaHintValue && rhs.fmHintValue === this.fmHintValue) {
return this.tx == null ? rhs.tx == null : this.tx.equals (rhs.tx);
}return false;
} else {
return rhs.getAntiAliasingHint () === this.getAntiAliasingHint () && rhs.getFractionalMetricsHint () === this.getFractionalMetricsHint () && rhs.getTransform ().equals (this.getTransform ());
}}, "java.awt.font.FontRenderContext");
Clazz.defineMethod (c$, "hashCode", 
function () {
var hash = this.tx == null ? 0 : this.tx.hashCode ();
if (this.defaulting) {
hash += this.getAntiAliasingHint ().hashCode ();
hash += this.getFractionalMetricsHint ().hashCode ();
} else {
hash += this.aaHintValue.hashCode ();
hash += this.fmHintValue.hashCode ();
}return hash;
});
});
