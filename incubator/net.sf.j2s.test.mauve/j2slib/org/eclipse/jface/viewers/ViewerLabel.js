Clazz.declarePackage ("org.eclipse.jface.viewers");
c$ = Clazz.decorateAsClass (function () {
this.newText = null;
this.newImage = null;
this.imageUpdated = false;
this.textUpdated = false;
this.background = null;
this.foreground = null;
this.font = null;
this.startText = null;
this.startImage = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ViewerLabel");
Clazz.makeConstructor (c$, 
function (initialText, initialImage) {
this.startText = initialText;
this.startImage = initialImage;
}, "~S,$wt.graphics.Image");
Clazz.defineMethod (c$, "getImage", 
function () {
if (this.imageUpdated) return this.newImage;
return this.startImage;
});
Clazz.defineMethod (c$, "setImage", 
function (image) {
this.imageUpdated = true;
this.newImage = image;
}, "$wt.graphics.Image");
Clazz.defineMethod (c$, "getText", 
function () {
if (this.textUpdated) return this.newText;
return this.startText;
});
Clazz.defineMethod (c$, "setText", 
function (text) {
this.newText = text;
this.textUpdated = true;
}, "~S");
Clazz.defineMethod (c$, "hasNewImage", 
function () {
if (this.startImage == null) return this.newImage != null;
if (this.imageUpdated) return !(this.startImage.equals (this.newImage));
return false;
});
Clazz.defineMethod (c$, "hasNewText", 
function () {
if (this.startText == null) return this.newText != null;
if (this.textUpdated) return !(this.startText.equals (this.newText));
return false;
});
Clazz.defineMethod (c$, "hasNewBackground", 
function () {
return this.background != null;
});
Clazz.defineMethod (c$, "hasNewForeground", 
function () {
return this.foreground != null;
});
Clazz.defineMethod (c$, "hasNewFont", 
function () {
return this.font != null;
});
Clazz.defineMethod (c$, "getBackground", 
function () {
return this.background;
});
Clazz.defineMethod (c$, "setBackground", 
function (background) {
this.background = background;
}, "$wt.graphics.Color");
Clazz.defineMethod (c$, "getFont", 
function () {
return this.font;
});
Clazz.defineMethod (c$, "setFont", 
function (font) {
this.font = font;
}, "$wt.graphics.Font");
Clazz.defineMethod (c$, "getForeground", 
function () {
return this.foreground;
});
Clazz.defineMethod (c$, "setForeground", 
function (foreground) {
this.foreground = foreground;
}, "$wt.graphics.Color");
