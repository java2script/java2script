Clazz.declarePackage ("java.awt");
c$ = Clazz.declareType (java.awt, "Graphics");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "create", 
function (x, y, width, height) {
return this.create4 (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "create4", 
function (x, y, width, height) {
var g = this.create ();
if (g == null) return null;
g.translate (x, y);
g.clipRect (0, 0, width, height);
return g;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getFontMetrics", 
function () {
return this.getFontMetrics (this.getFont ());
});
Clazz.defineMethod (c$, "drawRect", 
function (x, y, width, height) {
if ((width < 0) || (height < 0)) {
return;
}if (height == 0 || width == 0) {
this.drawLine (x, y, x + width, y + height);
} else {
this.drawLine (x, y, x + width - 1, y);
this.drawLine (x + width, y, x + width, y + height - 1);
this.drawLine (x + width, y + height, x + 1, y + height);
this.drawLine (x, y + height, x, y + 1);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "draw3DRect", 
function (x, y, width, height, raised) {
var c = this.getColor ();
var brighter = c.brighter ();
var darker = c.darker ();
this.setColor (raised ? brighter : darker);
this.drawLine (x, y, x, y + height);
this.drawLine (x + 1, y, x + width - 1, y);
this.setColor (raised ? darker : brighter);
this.drawLine (x + 1, y + height, x + width, y + height);
this.drawLine (x + width, y, x + width, y + height - 1);
this.setColor (c);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "fill3DRect", 
function (x, y, width, height, raised) {
var c = this.getColor ();
var brighter = c.brighter ();
var darker = c.darker ();
if (!raised) {
this.setColor (darker);
}this.fillRect (x + 1, y + 1, width - 2, height - 2);
this.setColor (raised ? brighter : darker);
this.drawLine (x, y, x, y + height - 1);
this.drawLine (x + 1, y, x + width - 2, y);
this.setColor (raised ? darker : brighter);
this.drawLine (x + 1, y + height - 1, x + width - 1, y + height - 1);
this.drawLine (x + width - 1, y, x + width - 1, y + height - 2);
this.setColor (c);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "drawPolygon", 
function (p) {
this.drawPolygon (p.xpoints, p.ypoints, p.npoints);
}, "java.awt.Polygon");
Clazz.defineMethod (c$, "fillPolygon", 
function (p) {
this.fillPolygon (p.xpoints, p.ypoints, p.npoints);
}, "java.awt.Polygon");
Clazz.defineMethod (c$, "drawChars", 
function (data, offset, length, x, y) {
this.drawString ( String.instantialize (data, offset, length), x, y);
}, "~A,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawBytes", 
function (data, offset, length, x, y) {
this.drawString ( String.instantialize (data, 0, offset, length), x, y);
}, "~A,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "finalize", 
function () {
this.dispose ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[font=" + this.getFont () + ",color=" + this.getColor () + "]";
});
Clazz.defineMethod (c$, "getClipRect", 
function () {
return this.getClipBounds ();
});
Clazz.defineMethod (c$, "hitClip", 
function (x, y, width, height) {
var clipRect = this.getClipBounds ();
if (clipRect == null) {
return true;
}return clipRect.intersects (x, y, width, height);
}, "~N,~N,~N,~N");
