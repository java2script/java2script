Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.font.FontRenderContext"], "java.awt.FontMetrics", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.font = null;
Clazz.instantialize (this, arguments);
}, java.awt, "FontMetrics");
Clazz.makeConstructor (c$, 
function (font) {
this.font = font;
}, "java.awt.Font");
Clazz.defineMethod (c$, "getFont", 
function () {
return this.font;
});
Clazz.defineMethod (c$, "getFontRenderContext", 
function () {
return java.awt.FontMetrics.DEFAULT_FRC;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.getLeading () + this.getAscent () + this.getDescent ();
});
Clazz.defineMethod (c$, "getMaxAscent", 
function () {
return this.getAscent ();
});
Clazz.defineMethod (c$, "getMaxDescent", 
function () {
return this.getDescent ();
});
Clazz.defineMethod (c$, "getMaxAdvance", 
function () {
return this.charWidth ('M');
});
Clazz.defineMethod (c$, "charsWidth", 
function (data, off, len) {
return this.stringWidth ( String.instantialize (data, off, len));
}, "~A,~N,~N");
Clazz.defineMethod (c$, "bytesWidth", 
function (data, off, len) {
return this.stringWidth ( String.instantialize (data, 0, off, len));
}, "~A,~N,~N");
Clazz.defineMethod (c$, "getStringBounds", 
function (str, context) {
return this.font.getStringBounds (str, this.myFRC (context));
}, "~S,java.awt.Graphics");
Clazz.defineMethod (c$, "getStringBounds", 
function (str, beginIndex, limit, context) {
return this.font.getStringBounds (str, beginIndex, limit, this.myFRC (context));
}, "~S,~N,~N,java.awt.Graphics");
Clazz.defineMethod (c$, "getStringBounds", 
function (chars, beginIndex, limit, context) {
return this.font.getStringBounds (chars, beginIndex, limit, this.myFRC (context));
}, "~A,~N,~N,java.awt.Graphics");
Clazz.defineMethod (c$, "myFRC", 
 function (context) {
return null;
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[font=" + this.getFont () + "ascent=" + this.getAscent () + ", descent=" + this.getDescent () + ", height=" + this.getHeight () + "]";
});
c$.DEFAULT_FRC = c$.prototype.DEFAULT_FRC =  new java.awt.font.FontRenderContext (null, false, false);
});
