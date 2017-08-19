Clazz.declarePackage ("sun.font");
Clazz.load (["java.awt.FontMetrics", "java.util.Hashtable"], "sun.font.FontDesignMetrics", ["java.lang.Character", "$.IndexOutOfBoundsException", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ascent = 0;
this.descent = 0;
this.leading = 0;
this.height = -1;
Clazz.instantialize (this, arguments);
}, sun.font, "FontDesignMetrics", java.awt.FontMetrics);
c$.getMetrics = Clazz.defineMethod (c$, "getMetrics", 
function (font) {
var m = null;
var r;
r = sun.font.FontDesignMetrics.metricsCache.get (font);
if (r != null) {
m = r.get ();
}if (m == null) {
m =  new sun.font.FontDesignMetrics (font);
sun.font.FontDesignMetrics.metricsCache.put (font,  new sun.font.FontDesignMetrics.KeyReference (font, m));
}for (var i = 0; i < sun.font.FontDesignMetrics.recentMetrics.length; i++) {
if (sun.font.FontDesignMetrics.recentMetrics[i] === m) {
return m;
}}
{
sun.font.FontDesignMetrics.recentMetrics[sun.font.FontDesignMetrics.recentIndex++] = m;
if (sun.font.FontDesignMetrics.recentIndex == 5) {
sun.font.FontDesignMetrics.recentIndex = 0;
}}return m;
}, "java.awt.Font");
Clazz.makeConstructor (c$, 
 function (font) {
Clazz.superConstructor (this, sun.font.FontDesignMetrics, [font]);
this.font = font;
this.initMatrixAndMetrics ();
}, "java.awt.Font");
Clazz.defineMethod (c$, "initMatrixAndMetrics", 
 function () {
{
//need to calculate ascent, descent, leading, and maxAdvance
}});
Clazz.defineMethod (c$, "charWidth", 
function (ch) {
var s = "";
{
s = "" + ch;
}return this.stringWidth (s);
}, "~S");
Clazz.overrideMethod (c$, "stringWidth", 
function (str) {
return Clazz.doubleToInt (0.5 + this.getWidth (str));
}, "~S");
Clazz.defineMethod (c$, "getWidth", 
 function (str) {
return swingjs.JSToolkit.getStringWidth (null, this.font, str);
}, "~S");
Clazz.overrideMethod (c$, "charsWidth", 
function (data, off, len) {
var width = 0;
if (len < 0) {
throw  new IndexOutOfBoundsException ("len=" + len);
}var limit = off + len;
for (var i = off; i < limit; i++) {
var ch = data[i];
width += this.stringWidth ("" + ch);
}
return Clazz.doubleToInt (0.5 + width);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "getWidths", 
function () {
var widths =  Clazz.newIntArray (256, 0);
return widths;
});
Clazz.defineMethod (c$, "getAscent", 
function () {
if (this.ascent == 0) this.ascent = this.font.getFontMetrics ().getAscent ();
return Clazz.floatToInt (sun.font.FontDesignMetrics.roundingUpValue + this.ascent);
});
Clazz.defineMethod (c$, "getDescent", 
function () {
if (this.descent == 0) this.descent = this.font.getFontMetrics ().getDescent ();
return Clazz.floatToInt (sun.font.FontDesignMetrics.roundingUpValue + this.descent);
});
Clazz.overrideMethod (c$, "getLeading", 
function () {
return Clazz.floatToInt (sun.font.FontDesignMetrics.roundingUpValue + this.descent + this.leading) - Clazz.floatToInt (sun.font.FontDesignMetrics.roundingUpValue + this.descent);
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
if (this.height < 0) {
this.height = this.getAscent () + Clazz.floatToInt (sun.font.FontDesignMetrics.roundingUpValue + this.descent + this.leading);
}return this.height;
});
Clazz.defineMethod (c$, "charWidth", 
function (codePoint) {
if (!Character.isValidCodePoint (codePoint)) {
codePoint = 0xffff;
}if (codePoint < 256) {
return this.getWidths ()[codePoint];
} else {
var buffer =  Clazz.newCharArray (2, '\0');
var len = Character.toChars (codePoint, buffer, 0);
return this.charsWidth (buffer, 0, len);
}}, "~N");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.val = null;
Clazz.instantialize (this, arguments);
}, sun.font.FontDesignMetrics, "KeyReference");
Clazz.makeConstructor (c$, 
function (a, b) {
this.key = a;
this.val = b;
}, "~O,~O");
Clazz.defineMethod (c$, "get", 
function () {
return this.val;
});
Clazz.defineMethod (c$, "dispose", 
function () {
if (sun.font.FontDesignMetrics.metricsCache.get (this.key) === this) {
sun.font.FontDesignMetrics.metricsCache.remove (this.key);
}});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"roundingUpValue", 0.95);
c$.metricsCache = c$.prototype.metricsCache =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"MAXRECENT", 5);
c$.recentMetrics = c$.prototype.recentMetrics =  new Array (5);
Clazz.defineStatics (c$,
"recentIndex", 0);
});
