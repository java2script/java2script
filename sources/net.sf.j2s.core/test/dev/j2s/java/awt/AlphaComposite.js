Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Composite"], "java.awt.AlphaComposite", ["java.lang.Float", "$.IllegalArgumentException", "sun.java2d.SunCompositeContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.extraAlpha = 0;
this.rule = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "AlphaComposite", null, java.awt.Composite);
Clazz.makeConstructor (c$, 
 function (rule) {
this.construct (rule, 1.0);
}, "~N");
Clazz.makeConstructor (c$, 
 function (rule, alpha) {
if (alpha < 0.0 || alpha > 1.0) {
throw  new IllegalArgumentException ("alpha value out of range");
}if (rule < 1 || rule > 12) {
throw  new IllegalArgumentException ("unknown composite rule");
}this.rule = rule;
this.extraAlpha = alpha;
}, "~N,~N");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (rule) {
switch (rule) {
case 1:
return java.awt.AlphaComposite.Clear;
case 2:
return java.awt.AlphaComposite.Src;
case 9:
return java.awt.AlphaComposite.Dst;
case 3:
return java.awt.AlphaComposite.SrcOver;
case 4:
return java.awt.AlphaComposite.DstOver;
case 5:
return java.awt.AlphaComposite.SrcIn;
case 6:
return java.awt.AlphaComposite.DstIn;
case 7:
return java.awt.AlphaComposite.SrcOut;
case 8:
return java.awt.AlphaComposite.DstOut;
case 10:
return java.awt.AlphaComposite.SrcAtop;
case 11:
return java.awt.AlphaComposite.DstAtop;
case 12:
return java.awt.AlphaComposite.Xor;
default:
throw  new IllegalArgumentException ("unknown composite rule");
}
}, "~N");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (rule, alpha) {
if (alpha == 1.0) {
return java.awt.AlphaComposite.getInstance (rule);
}return  new java.awt.AlphaComposite (rule, alpha);
}, "~N,~N");
Clazz.overrideMethod (c$, "createContext", 
function (srcColorModel, dstColorModel, hints) {
return  new sun.java2d.SunCompositeContext (this, srcColorModel, dstColorModel);
}, "java.awt.image.ColorModel,java.awt.image.ColorModel,java.awt.RenderingHints");
Clazz.defineMethod (c$, "getAlpha", 
function () {
return this.extraAlpha;
});
Clazz.defineMethod (c$, "getRule", 
function () {
return this.rule;
});
Clazz.defineMethod (c$, "derive", 
function (rule) {
return (this.rule == rule) ? this : java.awt.AlphaComposite.getInstance (rule, this.extraAlpha);
}, "~N");
Clazz.defineMethod (c$, "derive", 
function (alpha) {
return (this.extraAlpha == alpha) ? this : java.awt.AlphaComposite.getInstance (this.rule, alpha);
}, "~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (Float.floatToIntBits (this.extraAlpha) * 31 + this.rule);
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.AlphaComposite))) {
return false;
}var ac = obj;
if (this.rule != ac.rule) {
return false;
}if (this.extraAlpha != ac.extraAlpha) {
return false;
}return true;
}, "~O");
Clazz.defineStatics (c$,
"CLEAR", 1,
"SRC", 2,
"DST", 9,
"SRC_OVER", 3,
"DST_OVER", 4,
"SRC_IN", 5,
"DST_IN", 6,
"SRC_OUT", 7,
"DST_OUT", 8,
"SRC_ATOP", 10,
"DST_ATOP", 11,
"XOR", 12);
c$.Clear = c$.prototype.Clear =  new java.awt.AlphaComposite (1);
c$.Src = c$.prototype.Src =  new java.awt.AlphaComposite (2);
c$.Dst = c$.prototype.Dst =  new java.awt.AlphaComposite (9);
c$.SrcOver = c$.prototype.SrcOver =  new java.awt.AlphaComposite (3);
c$.DstOver = c$.prototype.DstOver =  new java.awt.AlphaComposite (4);
c$.SrcIn = c$.prototype.SrcIn =  new java.awt.AlphaComposite (5);
c$.DstIn = c$.prototype.DstIn =  new java.awt.AlphaComposite (6);
c$.SrcOut = c$.prototype.SrcOut =  new java.awt.AlphaComposite (7);
c$.DstOut = c$.prototype.DstOut =  new java.awt.AlphaComposite (8);
c$.SrcAtop = c$.prototype.SrcAtop =  new java.awt.AlphaComposite (10);
c$.DstAtop = c$.prototype.DstAtop =  new java.awt.AlphaComposite (11);
c$.Xor = c$.prototype.Xor =  new java.awt.AlphaComposite (12);
Clazz.defineStatics (c$,
"MIN_RULE", 1,
"MAX_RULE", 12);
});
