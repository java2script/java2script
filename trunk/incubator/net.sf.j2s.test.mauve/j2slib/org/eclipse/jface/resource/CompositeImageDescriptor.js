Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.CompositeImageDescriptor", ["$wt.graphics.ImageData", "$.PaletteData", "$.RGB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.imageData = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "CompositeImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.resource.CompositeImageDescriptor, []);
});
c$.alloc = Clazz.defineMethod (c$, "alloc", 
($fz = function (map, red, green, blue) {
var i;
var c;
for (i = 1; i < map.length && (c = map[i]) != null; i++) if (c.red == red && c.green == green && c.blue == blue) return i;

if (i < map.length - 1) {
map[i] =  new $wt.graphics.RGB (red, green, blue);
return i;
}return 0;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N");
Clazz.defineMethod (c$, "drawImage", 
function (src, ox, oy) {
var out = this.imageData.getRGBs ();
var palette = src.palette;
if (palette.isDirect) {
var mask = src.getTransparencyMask ();
for (var y = 0; y < src.height; y++) {
for (var x = 0; x < src.width; x++) {
if (mask.getPixel (x, y) != 0) {
var xx = x + ox;
var yy = y + oy;
if (xx >= 0 && xx < this.imageData.width && yy >= 0 && yy < this.imageData.height) {
var pixel = src.getPixel (x, y);
var r = pixel & palette.redMask;
r = (palette.redShift < 0) ? r >>> -palette.redShift : r << palette.redShift;
var g = pixel & palette.greenMask;
g = (palette.greenShift < 0) ? g >>> -palette.greenShift : g << palette.greenShift;
var b = pixel & palette.blueMask;
b = (palette.blueShift < 0) ? b >>> -palette.blueShift : b << palette.blueShift;
pixel = org.eclipse.jface.resource.CompositeImageDescriptor.alloc (out, r, g, b);
this.imageData.setPixel (xx, yy, pixel);
}}}
}
return ;
}var map =  Clazz.newArray (256, 0);
for (var i = 0; i < map.length; i++) map[i] = -1;

if (src.getTransparencyType () == 2) {
var mask = src.getTransparencyMask ();
for (var y = 0; y < src.height; y++) {
for (var x = 0; x < src.width; x++) {
if (mask.getPixel (x, y) != 0) {
var xx = x + ox;
var yy = y + oy;
if (xx >= 0 && xx < this.imageData.width && yy >= 0 && yy < this.imageData.height) {
var pixel = src.getPixel (x, y);
var newPixel = map[pixel];
if (newPixel < 0) {
var c = palette.getRGB (pixel);
map[pixel] = newPixel = org.eclipse.jface.resource.CompositeImageDescriptor.alloc (out, c.red, c.green, c.blue);
}this.imageData.setPixel (xx, yy, newPixel);
}}}
}
return ;
}var maskPixel = src.transparentPixel;
for (var y = 0; y < src.height; y++) {
for (var x = 0; x < src.width; x++) {
var pixel = src.getPixel (x, y);
if (maskPixel < 0 || pixel != maskPixel) {
var xx = x + ox;
var yy = y + oy;
if (xx >= 0 && xx < this.imageData.width && yy >= 0 && yy < this.imageData.height) {
var newPixel = map[pixel];
if (newPixel < 0) {
var c = palette.getRGB (pixel);
map[pixel] = newPixel = org.eclipse.jface.resource.CompositeImageDescriptor.alloc (out, c.red, c.green, c.blue);
}this.imageData.setPixel (xx, yy, newPixel);
}}}
}
}, "$wt.graphics.ImageData,~N,~N");
Clazz.overrideMethod (c$, "getImageData", 
function () {
var size = this.getSize ();
var black =  new $wt.graphics.RGB (0, 0, 0);
var rgbs =  new Array (256);
rgbs[0] = black;
rgbs[1] = black;
var dataPalette =  new $wt.graphics.PaletteData (rgbs);
this.imageData =  new $wt.graphics.ImageData (size.x, size.y, 8, dataPalette);
this.imageData.transparentPixel = 0;
this.drawCompositeImage (size.x, size.y);
for (var i = 0; i < rgbs.length; i++) if (rgbs[i] == null) rgbs[i] = black;

return this.imageData;
});
});
