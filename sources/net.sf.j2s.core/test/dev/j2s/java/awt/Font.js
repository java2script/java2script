Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.Font", ["JU.SB", "java.awt.font.TextAttribute", "java.awt.geom.AffineTransform", "$.Rectangle2D", "swingjs.JSFontMetrics", "$.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fm = null;
this.family = null;
this.name = null;
this.style = 0;
this.size = 0;
this.pointSize = 0;
this.$hasLayoutAttributes = false;
this.nonIdentityTx = false;
this.hash = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "Font");
Clazz.defineMethod (c$, "getFontMetrics", 
function () {
if (this.fm == null) ((this.fm =  new swingjs.JSFontMetrics ())).setFont (this);
return this.fm;
});
Clazz.defineMethod (c$, "setFontMetrics", 
function (fm) {
this.fm = fm;
}, "java.awt.FontMetrics");
Clazz.makeConstructor (c$, 
function (name, style, size) {
this.name = (name != null) ? name : "Default";
this.style = (style & -4) == 0 ? style : 0;
this.size = size;
this.pointSize = size;
}, "~S,~N,~N");
Clazz.makeConstructor (c$, 
function (font) {
this.name = font.name;
this.style = font.style;
this.size = font.size;
this.pointSize = font.pointSize;
}, "java.awt.Font");
Clazz.defineMethod (c$, "getTransform", 
function () {
return  new java.awt.geom.AffineTransform ();
});
Clazz.defineMethod (c$, "getFamily", 
function () {
return (this.family == null ? this.family = swingjs.JSToolkit.getFontFamily (this) : this.family);
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getFontName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getStyle", 
function () {
return this.style;
});
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "getSize2D", 
function () {
return this.pointSize;
});
Clazz.defineMethod (c$, "isPlain", 
function () {
return this.style == 0;
});
Clazz.defineMethod (c$, "isBold", 
function () {
return (this.style & 1) != 0;
});
Clazz.defineMethod (c$, "isItalic", 
function () {
return (this.style & 2) != 0;
});
Clazz.defineMethod (c$, "isTransformed", 
function () {
return this.nonIdentityTx;
});
Clazz.defineMethod (c$, "hasLayoutAttributes", 
function () {
return this.$hasLayoutAttributes;
});
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (nm) {
return java.awt.Font.getFont (nm, null);
}, "~S");
c$.decode = Clazz.defineMethod (c$, "decode", 
function (str) {
var fontName = str;
var styleName = "";
var fontSize = 12;
var fontStyle = 0;
if (str == null) {
return  new java.awt.Font ("Dialog", fontStyle, fontSize);
}var lastHyphen = str.lastIndexOf ('-');
var lastSpace = str.lastIndexOf (' ');
var sepChar = (lastHyphen > lastSpace) ? '-' : ' ';
var sizeIndex = str.lastIndexOf (sepChar);
var styleIndex = str.lastIndexOf (sepChar, sizeIndex - 1);
var strlen = str.length;
if (sizeIndex > 0 && sizeIndex + 1 < strlen) {
try {
fontSize = Integer.$valueOf (str.substring (sizeIndex + 1)).intValue ();
if (fontSize <= 0) {
fontSize = 12;
}} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
styleIndex = sizeIndex;
sizeIndex = strlen;
if (str.charAt (sizeIndex - 1) == sepChar) {
sizeIndex--;
}} else {
throw e;
}
}
}if (styleIndex >= 0 && styleIndex + 1 < strlen) {
styleName = str.substring (styleIndex + 1, sizeIndex);
styleName = styleName.toLowerCase ();
if (styleName.equals ("bolditalic")) {
fontStyle = 3;
} else if (styleName.equals ("italic")) {
fontStyle = 2;
} else if (styleName.equals ("bold")) {
fontStyle = 1;
} else if (styleName.equals ("plain")) {
fontStyle = 0;
} else {
styleIndex = sizeIndex;
if (str.charAt (styleIndex - 1) == sepChar) {
styleIndex--;
}}fontName = str.substring (0, styleIndex);
} else {
var fontEnd = strlen;
if (styleIndex > 0) {
fontEnd = styleIndex;
} else if (sizeIndex > 0) {
fontEnd = sizeIndex;
}if (fontEnd > 0 && str.charAt (fontEnd - 1) == sepChar) {
fontEnd--;
}fontName = str.substring (0, fontEnd);
}return  new java.awt.Font (fontName, fontStyle, fontSize);
}, "~S");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (nm, font) {
var str = null;
try {
str = System.getProperty (nm);
} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
} else {
throw e;
}
}
if (str == null) {
return font;
}return java.awt.Font.decode (str);
}, "~S,java.awt.Font");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.hash == 0) {
this.hash = this.name.hashCode () ^ this.style ^ this.size;
}return this.hash;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (obj != null) {
try {
var font = obj;
if (this.size == font.size && this.style == font.style && this.nonIdentityTx == font.nonIdentityTx && this.$hasLayoutAttributes == font.$hasLayoutAttributes && this.pointSize == font.pointSize && this.name.equals (font.name)) {
return true;
}} catch (e) {
if (Clazz.exceptionOf (e, ClassCastException)) {
} else {
throw e;
}
}
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var strStyle;
if (this.isBold ()) {
strStyle = this.isItalic () ? "bolditalic" : "bold";
} else {
strStyle = this.isItalic () ? "italic" : "plain";
}return this.getClass ().getName () + "[family=" + this.getFamily () + ",name=" + this.name + ",style=" + strStyle + ",size=" + this.size + "]";
});
Clazz.defineMethod (c$, "getAvailableAttributes", 
function () {
var attributes =  Clazz.newArray (-1, [java.awt.font.TextAttribute.FAMILY, java.awt.font.TextAttribute.WEIGHT, java.awt.font.TextAttribute.WIDTH, java.awt.font.TextAttribute.SIZE, java.awt.font.TextAttribute.UNDERLINE, java.awt.font.TextAttribute.STRIKETHROUGH]);
return attributes;
});
Clazz.defineMethod (c$, "deriveFont", 
function (style, sizePts) {
var f =  new java.awt.Font (this.name, style, Clazz.doubleToInt (sizePts + 0.5));
f.pointSize = sizePts;
return f;
}, "~N,~N");
Clazz.defineMethod (c$, "deriveFont", 
function (sizePts) {
var f =  new java.awt.Font (this.name, this.style, Clazz.doubleToInt (sizePts + 0.5));
f.pointSize = sizePts;
return f;
}, "~N");
Clazz.defineMethod (c$, "deriveFont", 
function (style) {
return  new java.awt.Font (this.name, style, this.size);
}, "~N");
Clazz.defineMethod (c$, "hasUniformLineMetrics", 
function () {
return false;
});
Clazz.defineMethod (c$, "getStringBounds", 
function (str, frc) {
return this.getStringBoundsStr (str, 0, -1);
}, "~S,java.awt.font.FontRenderContext");
Clazz.defineMethod (c$, "getStringBounds", 
function (str, beginIndex, limit, frc) {
return this.getStringBoundsStr (str, beginIndex, limit);
}, "~S,~N,~N,java.awt.font.FontRenderContext");
Clazz.defineMethod (c$, "getStringBounds", 
function (chars, beginIndex, limit, frc) {
var sb =  new JU.SB ();
sb.appendCB (chars, beginIndex, limit);
return this.getStringBoundsStr (sb.toString (), 0, -1);
}, "~A,~N,~N,java.awt.font.FontRenderContext");
Clazz.defineMethod (c$, "getStringBoundsStr", 
function (s, i, j) {
if (j >= i) s = s.substring (i, j);
var fm = this.getFontMetrics ();
var dec = fm.getDescent ();
var asc = fm.getAscent ();
var width = fm.stringWidth (s);
return  new java.awt.geom.Rectangle2D.Float (0, -dec, width, asc + dec);
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "finalize", 
function () {
});
Clazz.defineStatics (c$,
"DIALOG", "Dialog",
"DIALOG_INPUT", "DialogInput",
"SANS_SERIF", "SansSerif",
"SERIF", "Serif",
"MONOSPACED", "Monospaced",
"PLAIN", 0,
"BOLD", 1,
"ITALIC", 2,
"ROMAN_BASELINE", 0,
"CENTER_BASELINE", 1,
"HANGING_BASELINE", 2,
"TRUETYPE_FONT", 0,
"TYPE1_FONT", 1,
"LAYOUT_LEFT_TO_RIGHT", 0,
"LAYOUT_RIGHT_TO_LEFT", 1,
"LAYOUT_NO_START_CONTEXT", 2,
"LAYOUT_NO_LIMIT_CONTEXT", 4);
});
