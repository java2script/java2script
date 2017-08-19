Clazz.declarePackage ("sun.awt.image");
Clazz.load (["java.awt.image.BufferedImage"], "sun.awt.image.OffScreenImage", ["java.awt.Font", "$.GraphicsEnvironment"], function () {
c$ = Clazz.decorateAsClass (function () {
this.c = null;
this.$osis = null;
this.defaultFont = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "OffScreenImage", java.awt.image.BufferedImage);
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return this.createGraphics ();
});
Clazz.overrideMethod (c$, "createGraphics", 
function () {
if (this.c == null) {
var env = java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ();
return env.createGraphics (this);
}var bg = this.c.getBackground ();
var fg = this.c.getForeground ();
var font = this.c.getFont ();
if (font == null) {
if (this.defaultFont == null) {
this.defaultFont =  new java.awt.Font ("Dialog", 0, 12);
}font = this.defaultFont;
}return null;
});
Clazz.overrideMethod (c$, "getSource", 
function () {
return null;
});
});
