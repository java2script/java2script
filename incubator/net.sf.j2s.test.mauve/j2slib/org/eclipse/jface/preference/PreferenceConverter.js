Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["$wt.graphics.Point", "$.RGB", "$.Rectangle"], "org.eclipse.jface.preference.PreferenceConverter", ["java.lang.StringBuffer", "java.util.Arrays", "$.StringTokenizer", "org.eclipse.jface.resource.JFaceResources", "$.StringConverter", "$wt.graphics.FontData", "$wt.widgets.Display"], function () {
c$ = Clazz.declareType (org.eclipse.jface.preference, "PreferenceConverter");
c$.basicGetColor = Clazz.defineMethod (c$, "basicGetColor", 
($fz = function (value) {
if ("".equals (value)) return org.eclipse.jface.preference.PreferenceConverter.COLOR_DEFAULT_DEFAULT;
var color = org.eclipse.jface.resource.StringConverter.asRGB (value, null);
if (color == null) return org.eclipse.jface.preference.PreferenceConverter.COLOR_DEFAULT_DEFAULT;
return color;
}, $fz.isPrivate = true, $fz), "~S");
c$.basicGetFontData = Clazz.defineMethod (c$, "basicGetFontData", 
function (value) {
if ("".equals (value)) return org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT;
var tokenizer =  new java.util.StringTokenizer (value, ";");
var numTokens = tokenizer.countTokens ();
var fontData =  new Array (numTokens);
for (var i = 0; i < numTokens; i++) {
try {
fontData[i] =  new $wt.graphics.FontData (tokenizer.nextToken ());
} catch (e$$) {
if (Clazz.instanceOf (e$$, $wt.SWTException)) {
var error = e$$;
{
return org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT;
}
} else if (Clazz.instanceOf (e$$, IllegalArgumentException)) {
var error = e$$;
{
return org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT;
}
} else {
throw e$$;
}
}
}
return fontData;
}, "~S");
c$.readFontData = Clazz.defineMethod (c$, "readFontData", 
function (fontDataValue) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetFontData (fontDataValue);
}, "~S");
c$.basicGetPoint = Clazz.defineMethod (c$, "basicGetPoint", 
($fz = function (value) {
var dp =  new $wt.graphics.Point (org.eclipse.jface.preference.PreferenceConverter.POINT_DEFAULT_DEFAULT.x, org.eclipse.jface.preference.PreferenceConverter.POINT_DEFAULT_DEFAULT.y);
if ("".equals (value)) return dp;
return org.eclipse.jface.resource.StringConverter.asPoint (value, dp);
}, $fz.isPrivate = true, $fz), "~S");
c$.basicGetRectangle = Clazz.defineMethod (c$, "basicGetRectangle", 
($fz = function (value) {
var dr =  new $wt.graphics.Rectangle (org.eclipse.jface.preference.PreferenceConverter.RECTANGLE_DEFAULT_DEFAULT.x, org.eclipse.jface.preference.PreferenceConverter.RECTANGLE_DEFAULT_DEFAULT.y, org.eclipse.jface.preference.PreferenceConverter.RECTANGLE_DEFAULT_DEFAULT.width, org.eclipse.jface.preference.PreferenceConverter.RECTANGLE_DEFAULT_DEFAULT.height);
if ("".equals (value)) return dr;
return org.eclipse.jface.resource.StringConverter.asRectangle (value, dr);
}, $fz.isPrivate = true, $fz), "~S");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetColor (store.getString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getDefaultColor = Clazz.defineMethod (c$, "getDefaultColor", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetColor (store.getDefaultString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getDefaultFontDataArray = Clazz.defineMethod (c$, "getDefaultFontDataArray", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetFontData (store.getDefaultString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getDefaultFontData = Clazz.defineMethod (c$, "getDefaultFontData", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.getDefaultFontDataArray (store, name)[0];
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getDefaultPoint = Clazz.defineMethod (c$, "getDefaultPoint", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetPoint (store.getDefaultString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getDefaultRectangle = Clazz.defineMethod (c$, "getDefaultRectangle", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetRectangle (store.getDefaultString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getFontDataArray = Clazz.defineMethod (c$, "getFontDataArray", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetFontData (store.getString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getFontData = Clazz.defineMethod (c$, "getFontData", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.getFontDataArray (store, name)[0];
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getPoint = Clazz.defineMethod (c$, "getPoint", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetPoint (store.getString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.getRectangle = Clazz.defineMethod (c$, "getRectangle", 
function (store, name) {
return org.eclipse.jface.preference.PreferenceConverter.basicGetRectangle (store.getString (name));
}, "org.eclipse.jface.preference.IPreferenceStore,~S");
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (store, name, value) {
var fontDatas =  new Array (1);
fontDatas[0] = value;
org.eclipse.jface.preference.PreferenceConverter.setDefault (store, name, fontDatas);
}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.FontData");
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (store, name, value) {
store.setDefault (name, org.eclipse.jface.preference.PreferenceConverter.getStoredRepresentation (value));
}, "org.eclipse.jface.preference.IPreferenceStore,~S,~A");
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (store, name, value) {
store.setDefault (name, org.eclipse.jface.resource.StringConverter.asString (value));
}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.Point");
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (store, name, value) {
store.setDefault (name, org.eclipse.jface.resource.StringConverter.asString (value));
}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.Rectangle");
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (store, name, value) {
store.setDefault (name, org.eclipse.jface.resource.StringConverter.asString (value));
}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.RGB");
c$.setValue = Clazz.defineMethod (c$, "setValue", 
function (store, name, value) {
org.eclipse.jface.preference.PreferenceConverter.setValue (store, name, [value]);
}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.FontData");
c$.setValue = Clazz.defineMethod (c$, "setValue", 
function (store, name, value) {
var oldValue = org.eclipse.jface.preference.PreferenceConverter.getFontDataArray (store, name);
if (!java.util.Arrays.equals (oldValue, value)) {
store.putValue (name, org.eclipse.jface.preference.PreferenceConverter.getStoredRepresentation (value));
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().put (name, value);
store.firePropertyChangeEvent (name, oldValue, value);
}}, "org.eclipse.jface.preference.IPreferenceStore,~S,~A");
c$.putValue = Clazz.defineMethod (c$, "putValue", 
function (store, name, value) {
var oldValue = org.eclipse.jface.preference.PreferenceConverter.getFontDataArray (store, name);
if (!java.util.Arrays.equals (oldValue, value)) {
store.putValue (name, org.eclipse.jface.preference.PreferenceConverter.getStoredRepresentation (value));
}}, "org.eclipse.jface.preference.IPreferenceStore,~S,~A");
c$.getStoredRepresentation = Clazz.defineMethod (c$, "getStoredRepresentation", 
function (fontData) {
var buffer =  new StringBuffer ();
for (var i = 0; i < fontData.length; i++) {
if (fontData[i] != null) {
buffer.append (fontData[i].toString ());
buffer.append (";");
}}
return buffer.toString ();
}, "~A");
c$.setValue = Clazz.defineMethod (c$, "setValue", 
function (store, name, value) {
var oldValue = org.eclipse.jface.preference.PreferenceConverter.getPoint (store, name);
if (oldValue == null || !oldValue.equals (value)) {
store.putValue (name, org.eclipse.jface.resource.StringConverter.asString (value));
store.firePropertyChangeEvent (name, oldValue, value);
}}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.Point");
c$.setValue = Clazz.defineMethod (c$, "setValue", 
function (store, name, value) {
var oldValue = org.eclipse.jface.preference.PreferenceConverter.getRectangle (store, name);
if (oldValue == null || !oldValue.equals (value)) {
store.putValue (name, org.eclipse.jface.resource.StringConverter.asString (value));
store.firePropertyChangeEvent (name, oldValue, value);
}}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.Rectangle");
c$.setValue = Clazz.defineMethod (c$, "setValue", 
function (store, name, value) {
var oldValue = org.eclipse.jface.preference.PreferenceConverter.getColor (store, name);
if (oldValue == null || !oldValue.equals (value)) {
store.putValue (name, org.eclipse.jface.resource.StringConverter.asString (value));
store.firePropertyChangeEvent (name, oldValue, value);
}}, "org.eclipse.jface.preference.IPreferenceStore,~S,$wt.graphics.RGB");
c$.POINT_DEFAULT_DEFAULT = c$.prototype.POINT_DEFAULT_DEFAULT =  new $wt.graphics.Point (0, 0);
c$.RECTANGLE_DEFAULT_DEFAULT = c$.prototype.RECTANGLE_DEFAULT_DEFAULT =  new $wt.graphics.Rectangle (0, 0, 0, 0);
c$.COLOR_DEFAULT_DEFAULT = c$.prototype.COLOR_DEFAULT_DEFAULT =  new $wt.graphics.RGB (0, 0, 0);
Clazz.defineStatics (c$,
"ENTRY_SEPARATOR", ";",
"FONTDATA_ARRAY_DEFAULT_DEFAULT", null,
"FONTDATA_DEFAULT_DEFAULT", null);
{
var display = $wt.widgets.Display.getCurrent ();
if (display == null) display = $wt.widgets.Display.getDefault ();
($t$ = org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT = display.getSystemFont ().getFontData (), org.eclipse.jface.preference.PreferenceConverter.prototype.FONTDATA_ARRAY_DEFAULT_DEFAULT = org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT, $t$);
($t$ = org.eclipse.jface.preference.PreferenceConverter.FONTDATA_DEFAULT_DEFAULT = org.eclipse.jface.preference.PreferenceConverter.FONTDATA_ARRAY_DEFAULT_DEFAULT[0], org.eclipse.jface.preference.PreferenceConverter.prototype.FONTDATA_DEFAULT_DEFAULT = org.eclipse.jface.preference.PreferenceConverter.FONTDATA_DEFAULT_DEFAULT, $t$);
}});
