Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.DialogCellEditor", "$wt.widgets.Layout"], "org.eclipse.jface.viewers.ColorCellEditor", ["$wt.graphics.GC", "$.Image", "$.ImageData", "$.PaletteData", "$.Point", "$.RGB", "$wt.widgets.ColorDialog", "$.Composite", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.composite = null;
this.colorLabel = null;
this.rgbLabel = null;
this.image = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ColorCellEditor.ColorCellLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.ColorCellEditor, "ColorCellLayout", $wt.widgets.Layout);
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e = this.b$["org.eclipse.jface.viewers.ColorCellEditor"].colorLabel.computeSize (-1, -1, d);
var f = this.b$["org.eclipse.jface.viewers.ColorCellEditor"].rgbLabel.computeSize (-1, -1, d);
return  new $wt.graphics.Point (e.x + 6 + f.x, Math.max (e.y, f.y));
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
var c = a.getClientArea ();
var d = this.b$["org.eclipse.jface.viewers.ColorCellEditor"].colorLabel.computeSize (-1, -1, b);
var e = this.b$["org.eclipse.jface.viewers.ColorCellEditor"].rgbLabel.computeSize (-1, -1, b);
var f = Math.floor ((c.height - e.y) / 2);
if (f < 0) f = 0;
this.b$["org.eclipse.jface.viewers.ColorCellEditor"].colorLabel.setBounds (-1, 0, d.x, d.y);
this.b$["org.eclipse.jface.viewers.ColorCellEditor"].rgbLabel.setBounds (d.x + 6 - 1, f, c.width - d.x - 6, c.height);
}, "$wt.widgets.Composite,~B");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ColorCellEditor", org.eclipse.jface.viewers.DialogCellEditor);
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 0);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ColorCellEditor, [parent, style]);
this.doSetValue ( new $wt.graphics.RGB (0, 0, 0));
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "createColorImage", 
($fz = function (w, color) {
var gc =  new $wt.graphics.GC (w);
var fm = gc.getFontMetrics ();
var size = fm.getAscent ();
gc.dispose ();
var indent = 6;
var extent = 16;
if (Clazz.instanceOf (w, $wt.widgets.Table)) extent = (w).getItemHeight () - 1;
 else if (Clazz.instanceOf (w, $wt.widgets.Tree)) extent = (w).getItemHeight () - 1;
 else if (Clazz.instanceOf (w, $wt.custom.TableTree)) extent = (w).getItemHeight () - 1;
if (size > extent) size = extent;
var width = indent + size;
var height = extent;
var xoffset = indent;
var yoffset = Math.floor ((height - size) / 2);
var black =  new $wt.graphics.RGB (0, 0, 0);
var dataPalette =  new $wt.graphics.PaletteData ([black, black, color]);
var data =  new $wt.graphics.ImageData (width, height, 4, dataPalette);
data.transparentPixel = 0;
var end = size - 1;
for (var y = 0; y < size; y++) {
for (var x = 0; x < size; x++) {
if (x == 0 || y == 0 || x == end || y == end) data.setPixel (x + xoffset, y + yoffset, 1);
 else data.setPixel (x + xoffset, y + yoffset, 2);
}
}
return data;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control,$wt.graphics.RGB");
Clazz.overrideMethod (c$, "createContents", 
function (cell) {
var bg = cell.getBackground ();
this.composite =  new $wt.widgets.Composite (cell, this.getStyle ());
this.composite.setBackground (bg);
this.composite.setLayout (Clazz.innerTypeInstance (org.eclipse.jface.viewers.ColorCellEditor.ColorCellLayout, this, null));
this.colorLabel =  new $wt.widgets.Label (this.composite, 16384);
this.colorLabel.setBackground (bg);
this.rgbLabel =  new $wt.widgets.Label (this.composite, 16384);
this.rgbLabel.setBackground (bg);
this.rgbLabel.setFont (cell.getFont ());
return this.composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.image != null) {
this.image.dispose ();
this.image = null;
}Clazz.superCall (this, org.eclipse.jface.viewers.ColorCellEditor, "dispose", []);
});
Clazz.overrideMethod (c$, "openDialogBox", 
function (cellEditorWindow) {
var dialog =  new $wt.widgets.ColorDialog (cellEditorWindow.getShell ());
var value = this.getValue ();
if (value != null) dialog.setRGB (value);
DialogSync2Async.block (dialog, this, function () {
value = dialog.dialogReturn;
return dialog.getRGB ();
});
return;
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "updateContents", 
function (value) {
var rgb = value;
if (rgb == null) {
rgb =  new $wt.graphics.RGB (0, 0, 0);
}if (this.image != null) this.image.dispose ();
var id = this.createColorImage (this.colorLabel.getParent ().getParent (), rgb);
var mask = id.getTransparencyMask ();
this.image =  new $wt.graphics.Image (this.colorLabel.getDisplay (), id, mask);
this.colorLabel.setImage (this.image);
this.rgbLabel.setText ("(" + rgb.red + "," + rgb.green + "," + rgb.blue + ")");
}, "~O");
Clazz.defineStatics (c$,
"DEFAULT_EXTENT", 16,
"GAP", 6);
});
