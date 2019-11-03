Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ResourceRegistry", "java.util.ArrayList", "$.HashMap"], "org.eclipse.jface.resource.FontRegistry", ["java.util.Arrays", "$.Collections", "$.MissingResourceException", "$.ResourceBundle", "org.eclipse.jface.resource.StringConverter", "org.eclipse.jface.util.Assert", "$wt.SWT", "$wt.graphics.Font", "$.FontData", "$wt.widgets.Display", "$.Shell"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.FontRegistry.FontRecord")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.baseFont = null;
this.boldFont = null;
this.italicFont = null;
this.baseData = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource.FontRegistry, "FontRecord");
Clazz.makeConstructor (c$, 
function (a, b) {
this.baseFont = a;
this.baseData = b;
}, "$wt.graphics.Font,~A");
Clazz.defineMethod (c$, "dispose", 
function () {
this.baseFont.dispose ();
if (this.boldFont != null) this.boldFont.dispose ();
if (this.italicFont != null) this.italicFont.dispose ();
});
Clazz.defineMethod (c$, "getBaseFont", 
function () {
return this.baseFont;
});
Clazz.defineMethod (c$, "getBoldFont", 
function () {
if (this.boldFont != null) return this.boldFont;
var a = this.getModifiedFontData (1);
this.boldFont =  new $wt.graphics.Font ($wt.widgets.Display.getCurrent (), a);
return this.boldFont;
});
Clazz.defineMethod (c$, "getModifiedFontData", 
($fz = function (a) {
var b =  new Array (this.baseData.length);
for (var c = 0; c < b.length; c++) {
var d = this.baseData[c];
b[c] =  new $wt.graphics.FontData (d.getName (), d.getHeight (), d.getStyle () | a);
}
return b;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getItalicFont", 
function () {
if (this.italicFont != null) return this.italicFont;
var a = this.getModifiedFontData (2);
this.italicFont =  new $wt.graphics.Font ($wt.widgets.Display.getCurrent (), a);
return this.italicFont;
});
Clazz.defineMethod (c$, "addAllocatedFontsToStale", 
function (a) {
if (a !== this.baseFont && this.baseFont != null) this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add (this.baseFont);
if (a !== this.boldFont && this.boldFont != null) this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add (this.boldFont);
if (a !== this.italicFont && this.italicFont != null) this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add (this.italicFont);
}, "$wt.graphics.Font");
c$ = Clazz.p0p ();
}
this.stringToFontRecord = null;
this.stringToFontData = null;
this.staleFonts = null;
this.displayRunnable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "FontRegistry", org.eclipse.jface.resource.ResourceRegistry);
Clazz.prepareFields (c$, function () {
this.stringToFontRecord =  new java.util.HashMap (7);
this.stringToFontData =  new java.util.HashMap (7);
this.staleFonts =  new java.util.ArrayList ();
this.displayRunnable = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.resource.FontRegistry$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.resource, "FontRegistry$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.resource.FontRegistry"].clearCaches ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.resource.FontRegistry$1, i$, v$);
}) (this, null);
});
Clazz.makeConstructor (c$, 
function () {
this.construct ($wt.widgets.Display.getCurrent (), true);
});
Clazz.makeConstructor (c$, 
function (location, loader) {
Clazz.superConstructor (this, org.eclipse.jface.resource.FontRegistry, []);
var display = $wt.widgets.Display.getCurrent ();
org.eclipse.jface.util.Assert.isNotNull (display);
this.readResourceBundle (location);
this.hookDisplayDispose (display);
}, "~S,ClassLoader");
Clazz.makeConstructor (c$, 
function (location) {
this.construct (location, null);
}, "~S");
Clazz.defineMethod (c$, "readResourceBundle", 
($fz = function (location) {
var osname = System.getProperty ("os.name").trim ();
var wsname = $WT.getPlatform ();
osname = org.eclipse.jface.resource.StringConverter.removeWhiteSpaces (osname).toLowerCase ();
wsname = org.eclipse.jface.resource.StringConverter.removeWhiteSpaces (wsname).toLowerCase ();
var OSLocation = location;
var WSLocation = location;
var bundle = null;
if (osname != null) {
OSLocation = location + "_" + osname;
if (wsname != null) WSLocation = OSLocation + "_" + wsname;
}try {
bundle = java.util.ResourceBundle.getBundle (WSLocation);
this.readResourceBundle (bundle, WSLocation);
} catch (wsException) {
if (Clazz.instanceOf (wsException, java.util.MissingResourceException)) {
try {
bundle = java.util.ResourceBundle.getBundle (OSLocation);
this.readResourceBundle (bundle, WSLocation);
} catch (osException) {
if (Clazz.instanceOf (osException, java.util.MissingResourceException)) {
if (location !== OSLocation) {
bundle = java.util.ResourceBundle.getBundle (location);
this.readResourceBundle (bundle, WSLocation);
} else throw osException;
} else {
throw osException;
}
}
} else {
throw wsException;
}
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.makeConstructor (c$, 
function (display) {
this.construct (display, true);
}, "$wt.widgets.Display");
Clazz.makeConstructor (c$, 
function (display, cleanOnDisplayDisposal) {
Clazz.superConstructor (this, org.eclipse.jface.resource.FontRegistry, []);
org.eclipse.jface.util.Assert.isNotNull (display);
if (cleanOnDisplayDisposal) this.hookDisplayDispose (display);
}, "$wt.widgets.Display,~B");
Clazz.defineMethod (c$, "bestData", 
function (fonts, display) {
for (var i = 0; i < fonts.length; i++) {
var fd = fonts[i];
if (fd == null) break;
var fixedFonts = display.getFontList (fd.getName (), false);
if (this.isFixedFont (fixedFonts, fd)) {
return fd;
}var scalableFonts = display.getFontList (fd.getName (), true);
if (scalableFonts.length > 0) {
return fd;
}}
if (fonts.length > 0) return fonts[0];
 else return null;
}, "~A,$wt.widgets.Display");
Clazz.defineMethod (c$, "bestDataArray", 
function (fonts, display) {
var bestData = this.bestData (fonts, display);
if (bestData == null) return null;
 else {
var datas =  new Array (1);
datas[0] = bestData;
return datas;
}}, "~A,$wt.widgets.Display");
Clazz.defineMethod (c$, "filterData", 
function (fonts, display) {
var good =  new java.util.ArrayList (fonts.length);
for (var i = 0; i < fonts.length; i++) {
var fd = fonts[i];
if (fd == null) continue ;var fixedFonts = display.getFontList (fd.getName (), false);
if (this.isFixedFont (fixedFonts, fd)) {
good.add (fd);
}var scalableFonts = display.getFontList (fd.getName (), true);
if (scalableFonts.length > 0) {
good.add (fd);
}}
if (good.isEmpty () && fonts.length > 0) {
good.add (fonts[0]);
} else if (fonts.length == 0) {
return null;
}return good.toArray ( new Array (good.size ()));
}, "~A,$wt.widgets.Display");
Clazz.defineMethod (c$, "createFont", 
($fz = function (symbolicName, fonts) {
var display = $wt.widgets.Display.getCurrent ();
if (display == null) return null;
var validData = this.filterData (fonts, display);
if (validData.length == 0) {
return null;
}this.put (symbolicName, validData, false);
var newFont =  new $wt.graphics.Font (display, validData);
return Clazz.innerTypeInstance (org.eclipse.jface.resource.FontRegistry.FontRecord, this, null, newFont, validData);
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineMethod (c$, "calculateDefaultFont", 
function () {
var current = $wt.widgets.Display.getCurrent ();
if (current == null) {
var shell =  new $wt.widgets.Shell ();
var font =  new $wt.graphics.Font (null, shell.getFont ().getFontData ());
shell.dispose ();
return font;
} else return  new $wt.graphics.Font (current, current.getSystemFont ().getFontData ());
});
Clazz.defineMethod (c$, "defaultFont", 
function () {
return this.defaultFontRecord ().getBaseFont ();
});
Clazz.defineMethod (c$, "defaultFontRecord", 
($fz = function () {
var record = this.stringToFontRecord.get ("org.eclipse.jface.defaultfont");
if (record == null) {
var defaultFont = this.calculateDefaultFont ();
record = this.createFont ("org.eclipse.jface.defaultfont", defaultFont.getFontData ());
this.stringToFontRecord.put ("org.eclipse.jface.defaultfont", record);
}return record;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "defaultFontData", 
($fz = function () {
return this.defaultFontRecord ().baseData;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getFontData", 
function (symbolicName) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
var result = this.stringToFontData.get (symbolicName);
if (result == null) return this.defaultFontData ();
return result;
}, "~S");
Clazz.defineMethod (c$, "get", 
function (symbolicName) {
return this.getFontRecord (symbolicName).getBaseFont ();
}, "~S");
Clazz.defineMethod (c$, "getBold", 
function (symbolicName) {
return this.getFontRecord (symbolicName).getBoldFont ();
}, "~S");
Clazz.defineMethod (c$, "getItalic", 
function (symbolicName) {
return this.getFontRecord (symbolicName).getItalicFont ();
}, "~S");
Clazz.defineMethod (c$, "getFontRecord", 
($fz = function (symbolicName) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
var result = this.stringToFontRecord.get (symbolicName);
if (result != null) return result;
result = this.stringToFontData.get (symbolicName);
var fontRecord;
if (result == null) fontRecord = this.defaultFontRecord ();
 else fontRecord = this.createFont (symbolicName, result);
if (fontRecord == null) fontRecord = this.defaultFontRecord ();
this.stringToFontRecord.put (symbolicName, fontRecord);
return fontRecord;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getKeySet", 
function () {
return java.util.Collections.unmodifiableSet (this.stringToFontData.keySet ());
});
Clazz.overrideMethod (c$, "hasValueFor", 
function (fontKey) {
return this.stringToFontData.containsKey (fontKey);
}, "~S");
Clazz.overrideMethod (c$, "clearCaches", 
function () {
var iterator = this.stringToFontRecord.values ().iterator ();
while (iterator.hasNext ()) {
var next = iterator.next ();
(next).dispose ();
}
this.disposeFonts (this.staleFonts.iterator ());
this.stringToFontRecord.clear ();
this.staleFonts.clear ();
});
Clazz.defineMethod (c$, "disposeFonts", 
($fz = function (iterator) {
while (iterator.hasNext ()) {
var next = iterator.next ();
(next).dispose ();
}
}, $fz.isPrivate = true, $fz), "java.util.Iterator");
Clazz.defineMethod (c$, "hookDisplayDispose", 
($fz = function (display) {
display.disposeExec (this.displayRunnable);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Display");
Clazz.defineMethod (c$, "isFixedFont", 
($fz = function (fixedFonts, fd) {
var height = fd.getHeight ();
var name = fd.getName ();
for (var i = 0; i < fixedFonts.length; i++) {
var fixed = fixedFonts[i];
if (fixed.getHeight () == height && fixed.getName ().equals (name)) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A,$wt.graphics.FontData");
Clazz.defineMethod (c$, "makeFontData", 
($fz = function (value) {
try {
return org.eclipse.jface.resource.StringConverter.asFontData (value.trim ());
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DataFormatException)) {
throw  new java.util.MissingResourceException ("Wrong font data format. Value is: \"" + value + "\"", this.getClass ().getName (), value);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "put", 
function (symbolicName, fontData) {
this.put (symbolicName, fontData, true);
}, "~S,~A");
Clazz.defineMethod (c$, "put", 
($fz = function (symbolicName, fontData, update) {
org.eclipse.jface.util.Assert.isNotNull (symbolicName);
org.eclipse.jface.util.Assert.isNotNull (fontData);
var existing = this.stringToFontData.get (symbolicName);
if (java.util.Arrays.equals (existing, fontData)) return ;
var oldFont = this.stringToFontRecord.remove (symbolicName);
this.stringToFontData.put (symbolicName, fontData);
if (update) this.fireMappingChanged (symbolicName, existing, fontData);
if (oldFont != null) oldFont.addAllocatedFontsToStale (this.defaultFontRecord ().getBaseFont ());
}, $fz.isPrivate = true, $fz), "~S,~A,~B");
Clazz.defineMethod (c$, "readResourceBundle", 
($fz = function (bundle, bundleName) {
var keys = bundle.getKeys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
var pos = key.lastIndexOf ('.');
if (pos == -1) {
this.stringToFontData.put (key, [this.makeFontData (bundle.getString (key))]);
} else {
var name = key.substring (0, pos);
var i = 0;
try {
i = Integer.parseInt (key.substring (pos + 1));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
throw  new java.util.MissingResourceException ("Wrong key format ", bundleName, key);
} else {
throw e;
}
}
var elements = this.stringToFontData.get (name);
if (elements == null) {
elements =  new Array (8);
this.stringToFontData.put (name, elements);
}if (i > elements.length) {
var na =  new Array (i + 8);
System.arraycopy (elements, 0, na, 0, elements.length);
elements = na;
this.stringToFontData.put (name, elements);
}elements[i] = this.makeFontData (bundle.getString (key));
}}
}, $fz.isPrivate = true, $fz), "java.util.ResourceBundle,~S");
});
