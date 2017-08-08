Clazz.declarePackage ("java.awt");
Clazz.load (["java.util.Map", "$.HashMap"], "java.awt.RenderingHints", ["java.lang.IllegalArgumentException", "$.InternalError", "java.util.Collections"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hintmap = null;
Clazz.instantialize (this, arguments);
}, java.awt, "RenderingHints", null, [java.util.Map, Cloneable]);
Clazz.prepareFields (c$, function () {
this.hintmap =  new java.util.HashMap (7);
});
Clazz.overrideMethod (c$, "size", 
function () {
return this.hintmap.size ();
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.hintmap.isEmpty ();
});
Clazz.overrideMethod (c$, "containsKey", 
function (key) {
return this.hintmap.containsKey (key);
}, "~O");
Clazz.overrideMethod (c$, "containsValue", 
function (value) {
return this.hintmap.containsValue (value);
}, "~O");
Clazz.overrideMethod (c$, "get", 
function (key) {
return this.hintmap.get (key);
}, "~O");
Clazz.overrideMethod (c$, "put", 
function (key, value) {
if (!(key).isCompatibleValue (value)) {
throw  new IllegalArgumentException (value + " incompatible with " + key);
}return this.hintmap.put (key, value);
}, "~O,~O");
Clazz.defineMethod (c$, "add", 
function (hints) {
this.hintmap.putAll (hints.hintmap);
}, "java.awt.RenderingHints");
Clazz.overrideMethod (c$, "clear", 
function () {
this.hintmap.clear ();
});
Clazz.overrideMethod (c$, "remove", 
function (key) {
return this.hintmap.remove (key);
}, "~O");
Clazz.overrideMethod (c$, "putAll", 
function (m) {
if (java.awt.RenderingHints.isInstance (m)) {
for (var entry, $entry = m.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.hintmap.put (entry.getKey (), entry.getValue ());

} else {
for (var entry, $entry = m.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.put (entry.getKey (), entry.getValue ());

}}, "java.util.Map");
Clazz.overrideMethod (c$, "keySet", 
function () {
return this.hintmap.keySet ();
});
Clazz.overrideMethod (c$, "values", 
function () {
return this.hintmap.values ();
});
Clazz.overrideMethod (c$, "entrySet", 
function () {
return java.util.Collections.unmodifiableMap (this.hintmap).entrySet ();
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (Clazz.instanceOf (o, java.awt.RenderingHints)) {
return this.hintmap.equals ((o).hintmap);
} else if (Clazz.instanceOf (o, java.util.Map)) {
return this.hintmap.equals (o);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.hintmap.hashCode ();
});
Clazz.overrideMethod (c$, "clone", 
function () {
var rh;
try {
{
rh = Clazz.clone(this);
if (this.hintmap != null) { rh.hintmap =
this.hintmap.cloneHM(); }
}} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
return rh;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.hintmap == null) {
return this.getClass ().getName () + "@" + Integer.toHexString (this.hashCode ()) + " (0 hints)";
}return this.hintmap.toString ();
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.privatekey = 0;
Clazz.instantialize (this, arguments);
}, java.awt.RenderingHints, "Key");
Clazz.defineMethod (c$, "getIdentity", 
 function () {
return this.getClass ().getName () + "@" + Integer.toHexString (System.identityHashCode (this.getClass ())) + ":" + Integer.toHexString (this.privatekey);
});
Clazz.defineMethod (c$, "recordIdentity", 
 function (a) {
var b = a.getIdentity ();
var c = java.awt.RenderingHints.Key.identitymap.get (b);
if (c != null) {
var d = c;
if (d != null && d.getClass () === a.getClass ()) {
throw  new IllegalArgumentException (b + " already registered");
}}java.awt.RenderingHints.Key.identitymap.put (b, a);
}, "java.awt.RenderingHints.Key");
Clazz.makeConstructor (c$, 
function (a) {
this.privatekey = a;
this.recordIdentity (this);
}, "~N");
Clazz.defineMethod (c$, "intKey", 
function () {
return this.privatekey;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
return this === a;
}, "~O");
c$.identitymap = c$.prototype.identitymap =  new java.util.HashMap (17);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.description = null;
Clazz.instantialize (this, arguments);
}, java.awt.RenderingHints, "SunKey", java.awt.RenderingHints.Key);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.RenderingHints.SunKey, [a]);
this.description = b;
}, "~N,~S");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.privatekey;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.description;
});
Clazz.overrideMethod (c$, "isCompatibleValue", 
function (a) {
if (Clazz.instanceOf (a, java.awt.RenderingHints.Value)) {
return (a).isCompatibleKey (this);
}return false;
}, "~O");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.myKey = null;
this.index = 0;
this.description = null;
Clazz.instantialize (this, arguments);
}, java.awt.RenderingHints, "Value");
c$.register = Clazz.defineMethod (c$, "register", 
 function (a, b) {
var c = a.getIndex ();
var d = b.getIndex ();
if (java.awt.RenderingHints.Value.ValueObjects[c][d] != null) {
throw  new InternalError ("duplicate index: " + d);
}java.awt.RenderingHints.Value.ValueObjects[c][d] = b;
}, "java.awt.RenderingHints.SunKey,java.awt.RenderingHints.Value");
c$.get = Clazz.defineMethod (c$, "get", 
function (a, b) {
return java.awt.RenderingHints.Value.ValueObjects[a][b];
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.myKey = a;
this.index = b;
this.description = c;
java.awt.RenderingHints.Value.register (a, this);
}, "java.awt.RenderingHints.SunKey,~N,~S");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.description;
});
Clazz.defineMethod (c$, "isCompatibleKey", 
function (a) {
return this.myKey === a;
}, "java.awt.RenderingHints.SunKey");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.description.hashCode ();
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
return this === a;
}, "~O");
c$.ValueObjects = c$.prototype.ValueObjects =  Clazz.newArray (9, 8, null);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.RenderingHints, "LCDContrastKey", java.awt.RenderingHints.SunKey);
Clazz.overrideMethod (c$, "isCompatibleValue", 
function (a) {
if (Clazz.instanceOf (a, Integer)) {
var b = (a).intValue ();
return b >= 100 && b <= 250;
}return false;
}, "~O");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"NUM_KEYS", 9,
"VALS_PER_KEY", 8,
"INTKEY_RENDERING", 0,
"INTVAL_RENDER_DEFAULT", 0,
"INTVAL_RENDER_SPEED", 1,
"INTVAL_RENDER_QUALITY", 2,
"INTKEY_ANTIALIASING", 1,
"INTVAL_ANTIALIAS_DEFAULT", 0,
"INTVAL_ANTIALIAS_OFF", 1,
"INTVAL_ANTIALIAS_ON", 2,
"INTKEY_TEXT_ANTIALIASING", 2,
"INTVAL_TEXT_ANTIALIAS_DEFAULT", 0,
"INTVAL_TEXT_ANTIALIAS_OFF", 1,
"INTVAL_TEXT_ANTIALIAS_ON", 2,
"INTVAL_TEXT_ANTIALIAS_GASP", 3,
"INTVAL_TEXT_ANTIALIAS_LCD_HRGB", 4,
"INTVAL_TEXT_ANTIALIAS_LCD_HBGR", 5,
"INTVAL_TEXT_ANTIALIAS_LCD_VRGB", 6,
"INTVAL_TEXT_ANTIALIAS_LCD_VBGR", 7,
"INTKEY_FRACTIONALMETRICS", 3,
"INTVAL_FRACTIONALMETRICS_DEFAULT", 0,
"INTVAL_FRACTIONALMETRICS_OFF", 1,
"INTVAL_FRACTIONALMETRICS_ON", 2,
"INTKEY_DITHERING", 4,
"INTVAL_DITHER_DEFAULT", 0,
"INTVAL_DITHER_DISABLE", 1,
"INTVAL_DITHER_ENABLE", 2,
"INTKEY_INTERPOLATION", 5,
"INTVAL_INTERPOLATION_NEAREST_NEIGHBOR", 0,
"INTVAL_INTERPOLATION_BILINEAR", 1,
"INTVAL_INTERPOLATION_BICUBIC", 2,
"INTKEY_ALPHA_INTERPOLATION", 6,
"INTVAL_ALPHA_INTERPOLATION_DEFAULT", 0,
"INTVAL_ALPHA_INTERPOLATION_SPEED", 1,
"INTVAL_ALPHA_INTERPOLATION_QUALITY", 2,
"INTKEY_COLOR_RENDERING", 7,
"INTVAL_COLOR_RENDER_DEFAULT", 0,
"INTVAL_COLOR_RENDER_SPEED", 1,
"INTVAL_COLOR_RENDER_QUALITY", 2,
"INTKEY_STROKE_CONTROL", 8,
"INTVAL_STROKE_DEFAULT", 0,
"INTVAL_STROKE_NORMALIZE", 1,
"INTVAL_STROKE_PURE", 2,
"INTKEY_AATEXT_LCD_CONTRAST", 100);
c$.KEY_RENDERING = c$.prototype.KEY_RENDERING =  new java.awt.RenderingHints.SunKey (0, "Global rendering quality key");
c$.VALUE_RENDER_SPEED = c$.prototype.VALUE_RENDER_SPEED =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_RENDERING, 1, "Fastest rendering methods");
c$.VALUE_RENDER_QUALITY = c$.prototype.VALUE_RENDER_QUALITY =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_RENDERING, 2, "Highest quality rendering methods");
c$.VALUE_RENDER_DEFAULT = c$.prototype.VALUE_RENDER_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_RENDERING, 0, "Default rendering methods");
c$.KEY_ANTIALIASING = c$.prototype.KEY_ANTIALIASING =  new java.awt.RenderingHints.SunKey (1, "Global antialiasing enable key");
c$.VALUE_ANTIALIAS_ON = c$.prototype.VALUE_ANTIALIAS_ON =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ANTIALIASING, 2, "Antialiased rendering mode");
c$.VALUE_ANTIALIAS_OFF = c$.prototype.VALUE_ANTIALIAS_OFF =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ANTIALIASING, 1, "Nonantialiased rendering mode");
c$.VALUE_ANTIALIAS_DEFAULT = c$.prototype.VALUE_ANTIALIAS_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ANTIALIASING, 0, "Default antialiasing rendering mode");
c$.KEY_FRACTIONALMETRICS = c$.prototype.KEY_FRACTIONALMETRICS =  new java.awt.RenderingHints.SunKey (3, "Fractional metrics enable key");
c$.VALUE_FRACTIONALMETRICS_ON = c$.prototype.VALUE_FRACTIONALMETRICS_ON =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_FRACTIONALMETRICS, 2, "Fractional text metrics mode");
c$.VALUE_FRACTIONALMETRICS_OFF = c$.prototype.VALUE_FRACTIONALMETRICS_OFF =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_FRACTIONALMETRICS, 1, "Integer text metrics mode");
c$.VALUE_FRACTIONALMETRICS_DEFAULT = c$.prototype.VALUE_FRACTIONALMETRICS_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_FRACTIONALMETRICS, 0, "Default fractional text metrics mode");
c$.KEY_DITHERING = c$.prototype.KEY_DITHERING =  new java.awt.RenderingHints.SunKey (4, "Dithering quality key");
c$.VALUE_DITHER_ENABLE = c$.prototype.VALUE_DITHER_ENABLE =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_DITHERING, 2, "Dithered rendering mode");
c$.VALUE_DITHER_DISABLE = c$.prototype.VALUE_DITHER_DISABLE =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_DITHERING, 1, "Nondithered rendering mode");
c$.VALUE_DITHER_DEFAULT = c$.prototype.VALUE_DITHER_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_DITHERING, 0, "Default dithering mode");
c$.KEY_INTERPOLATION = c$.prototype.KEY_INTERPOLATION =  new java.awt.RenderingHints.SunKey (5, "Image interpolation method key");
c$.VALUE_INTERPOLATION_NEAREST_NEIGHBOR = c$.prototype.VALUE_INTERPOLATION_NEAREST_NEIGHBOR =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_INTERPOLATION, 0, "Nearest Neighbor image interpolation mode");
c$.VALUE_INTERPOLATION_BILINEAR = c$.prototype.VALUE_INTERPOLATION_BILINEAR =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_INTERPOLATION, 1, "Bilinear image interpolation mode");
c$.VALUE_INTERPOLATION_BICUBIC = c$.prototype.VALUE_INTERPOLATION_BICUBIC =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_INTERPOLATION, 2, "Bicubic image interpolation mode");
c$.KEY_ALPHA_INTERPOLATION = c$.prototype.KEY_ALPHA_INTERPOLATION =  new java.awt.RenderingHints.SunKey (6, "Alpha blending interpolation method key");
c$.VALUE_ALPHA_INTERPOLATION_SPEED = c$.prototype.VALUE_ALPHA_INTERPOLATION_SPEED =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ALPHA_INTERPOLATION, 1, "Fastest alpha blending methods");
c$.VALUE_ALPHA_INTERPOLATION_QUALITY = c$.prototype.VALUE_ALPHA_INTERPOLATION_QUALITY =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ALPHA_INTERPOLATION, 2, "Highest quality alpha blending methods");
c$.VALUE_ALPHA_INTERPOLATION_DEFAULT = c$.prototype.VALUE_ALPHA_INTERPOLATION_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_ALPHA_INTERPOLATION, 0, "Default alpha blending methods");
c$.KEY_COLOR_RENDERING = c$.prototype.KEY_COLOR_RENDERING =  new java.awt.RenderingHints.SunKey (7, "Color rendering quality key");
c$.VALUE_COLOR_RENDER_SPEED = c$.prototype.VALUE_COLOR_RENDER_SPEED =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_COLOR_RENDERING, 1, "Fastest color rendering mode");
c$.VALUE_COLOR_RENDER_QUALITY = c$.prototype.VALUE_COLOR_RENDER_QUALITY =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_COLOR_RENDERING, 2, "Highest quality color rendering mode");
c$.VALUE_COLOR_RENDER_DEFAULT = c$.prototype.VALUE_COLOR_RENDER_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_COLOR_RENDERING, 0, "Default color rendering mode");
c$.KEY_STROKE_CONTROL = c$.prototype.KEY_STROKE_CONTROL =  new java.awt.RenderingHints.SunKey (8, "Stroke normalization control key");
c$.VALUE_STROKE_DEFAULT = c$.prototype.VALUE_STROKE_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_STROKE_CONTROL, 0, "Default stroke normalization");
c$.VALUE_STROKE_NORMALIZE = c$.prototype.VALUE_STROKE_NORMALIZE =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_STROKE_CONTROL, 1, "Normalize strokes for consistent rendering");
c$.VALUE_STROKE_PURE = c$.prototype.VALUE_STROKE_PURE =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_STROKE_CONTROL, 2, "Pure stroke conversion for accurate paths");
c$.KEY_TEXT_ANTIALIASING = c$.prototype.KEY_TEXT_ANTIALIASING =  new java.awt.RenderingHints.SunKey (2, "Text-specific antialiasing enable key");
c$.VALUE_TEXT_ANTIALIAS_ON = c$.prototype.VALUE_TEXT_ANTIALIAS_ON =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 2, "Antialiased text mode");
c$.VALUE_TEXT_ANTIALIAS_OFF = c$.prototype.VALUE_TEXT_ANTIALIAS_OFF =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 1, "Nonantialiased text mode");
c$.VALUE_TEXT_ANTIALIAS_DEFAULT = c$.prototype.VALUE_TEXT_ANTIALIAS_DEFAULT =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 0, "Default antialiasing text mode");
c$.VALUE_TEXT_ANTIALIAS_GASP = c$.prototype.VALUE_TEXT_ANTIALIAS_GASP =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 3, "gasp antialiasing text mode");
c$.VALUE_TEXT_ANTIALIAS_LCD_HRGB = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_HRGB =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 4, "LCD HRGB antialiasing text mode");
c$.VALUE_TEXT_ANTIALIAS_LCD_HBGR = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_HBGR =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 5, "LCD HBGR antialiasing text mode");
c$.VALUE_TEXT_ANTIALIAS_LCD_VRGB = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_VRGB =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 6, "LCD VRGB antialiasing text mode");
c$.VALUE_TEXT_ANTIALIAS_LCD_VBGR = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_VBGR =  new java.awt.RenderingHints.Value (java.awt.RenderingHints.KEY_TEXT_ANTIALIASING, 7, "LCD VBGR antialiasing text mode");
c$.KEY_TEXT_ANTIALIAS_LCD_CONTRAST = c$.prototype.KEY_TEXT_ANTIALIAS_LCD_CONTRAST =  new java.awt.RenderingHints.LCDContrastKey (100, "Text-specific LCD contrast key");
c$.KEY_TEXT_LCD_CONTRAST = c$.prototype.KEY_TEXT_LCD_CONTRAST = java.awt.RenderingHints.KEY_TEXT_ANTIALIAS_LCD_CONTRAST;
});
