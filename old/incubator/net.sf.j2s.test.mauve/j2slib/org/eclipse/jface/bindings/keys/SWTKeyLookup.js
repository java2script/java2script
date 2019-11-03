Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.keys.IKeyLookup", "java.util.HashMap"], "org.eclipse.jface.bindings.keys.SWTKeyLookup", ["$wt.SWT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modifierKeyTable = null;
this.nameTable = null;
this.naturalKeyTable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys, "SWTKeyLookup", null, org.eclipse.jface.bindings.keys.IKeyLookup);
Clazz.prepareFields (c$, function () {
this.modifierKeyTable =  new java.util.HashMap ();
this.nameTable =  new java.util.HashMap ();
this.naturalKeyTable =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function () {
var alt =  new Integer (65536);
var command =  new Integer (4194304);
var ctrl =  new Integer (262144);
var shift =  new Integer (131072);
this.modifierKeyTable.put ("ALT", alt);
this.nameTable.put (alt, "ALT");
this.modifierKeyTable.put ("COMMAND", command);
this.nameTable.put (command, "COMMAND");
this.modifierKeyTable.put ("CTRL", ctrl);
this.nameTable.put (ctrl, "CTRL");
this.modifierKeyTable.put ("SHIFT", shift);
this.nameTable.put (shift, "SHIFT");
this.modifierKeyTable.put ("M1", "carbon".equals ($WT.getPlatform ()) ? command : ctrl);
this.modifierKeyTable.put ("M2", shift);
this.modifierKeyTable.put ("M3", alt);
this.modifierKeyTable.put ("M4", "carbon".equals ($WT.getPlatform ()) ? ctrl : command);
var arrowDown =  new Integer (16777218);
this.naturalKeyTable.put ("ARROW_DOWN", arrowDown);
this.nameTable.put (arrowDown, "ARROW_DOWN");
var arrowLeft =  new Integer (16777219);
this.naturalKeyTable.put ("ARROW_LEFT", arrowLeft);
this.nameTable.put (arrowLeft, "ARROW_LEFT");
var arrowRight =  new Integer (16777220);
this.naturalKeyTable.put ("ARROW_RIGHT", arrowRight);
this.nameTable.put (arrowRight, "ARROW_RIGHT");
var arrowUp =  new Integer (16777217);
this.naturalKeyTable.put ("ARROW_UP", arrowUp);
this.nameTable.put (arrowUp, "ARROW_UP");
var breakKey =  new Integer (16777302);
this.naturalKeyTable.put ("BREAK", breakKey);
this.nameTable.put (breakKey, "BREAK");
var bs =  new Integer ('\u0008'.charCodeAt (0));
this.naturalKeyTable.put ("BS", bs);
this.nameTable.put (bs, "BS");
this.naturalKeyTable.put ("BACKSPACE", bs);
var capsLock =  new Integer (16777298);
this.naturalKeyTable.put ("CAPS_LOCK", capsLock);
this.nameTable.put (capsLock, "CAPS_LOCK");
var cr =  new Integer ('\u000d'.charCodeAt (0));
this.naturalKeyTable.put ("CR", cr);
this.nameTable.put (cr, "CR");
this.naturalKeyTable.put ("ENTER", cr);
this.naturalKeyTable.put ("RETURN", cr);
var del =  new Integer (''.charCodeAt (0));
this.naturalKeyTable.put ("DEL", del);
this.nameTable.put (del, "DEL");
this.naturalKeyTable.put ("DELETE", del);
var end =  new Integer (16777224);
this.naturalKeyTable.put ("END", end);
this.nameTable.put (end, "END");
var esc =  new Integer ('\u001b'.charCodeAt (0));
this.naturalKeyTable.put ("ESC", esc);
this.nameTable.put (esc, "ESC");
this.naturalKeyTable.put ("ESCAPE", esc);
var f1 =  new Integer (16777226);
this.naturalKeyTable.put ("F1", f1);
this.nameTable.put (f1, "F1");
var f2 =  new Integer (16777227);
this.naturalKeyTable.put ("F2",  new Integer (16777227));
this.nameTable.put (f2, "F2");
var f3 =  new Integer (16777228);
this.naturalKeyTable.put ("F3",  new Integer (16777228));
this.nameTable.put (f3, "F3");
var f4 =  new Integer (16777229);
this.naturalKeyTable.put ("F4",  new Integer (16777229));
this.nameTable.put (f4, "F4");
var f5 =  new Integer (16777230);
this.naturalKeyTable.put ("F5",  new Integer (16777230));
this.nameTable.put (f5, "F5");
var f6 =  new Integer (16777231);
this.naturalKeyTable.put ("F6",  new Integer (16777231));
this.nameTable.put (f6, "F6");
var f7 =  new Integer (16777232);
this.naturalKeyTable.put ("F7",  new Integer (16777232));
this.nameTable.put (f7, "F7");
var f8 =  new Integer (16777233);
this.naturalKeyTable.put ("F8",  new Integer (16777233));
this.nameTable.put (f8, "F8");
var f9 =  new Integer (16777234);
this.naturalKeyTable.put ("F9",  new Integer (16777234));
this.nameTable.put (f9, "F9");
var f10 =  new Integer (16777235);
this.naturalKeyTable.put ("F10",  new Integer (16777235));
this.nameTable.put (f10, "F10");
var f11 =  new Integer (16777236);
this.naturalKeyTable.put ("F11",  new Integer (16777236));
this.nameTable.put (f11, "F11");
var f12 =  new Integer (16777237);
this.naturalKeyTable.put ("F12",  new Integer (16777237));
this.nameTable.put (f12, "F12");
var f13 =  new Integer (16777238);
this.naturalKeyTable.put ("F13",  new Integer (16777238));
this.nameTable.put (f13, "F13");
var f14 =  new Integer (16777239);
this.naturalKeyTable.put ("F14",  new Integer (16777239));
this.nameTable.put (f14, "F14");
var f15 =  new Integer (16777240);
this.naturalKeyTable.put ("F15",  new Integer (16777240));
this.nameTable.put (f15, "F15");
var ff =  new Integer (12);
this.naturalKeyTable.put ("FF", ff);
this.nameTable.put (ff, "FF");
var home =  new Integer (16777223);
this.naturalKeyTable.put ("HOME", home);
this.nameTable.put (home, "HOME");
var insert =  new Integer (16777225);
this.naturalKeyTable.put ("INSERT", insert);
this.nameTable.put (insert, "INSERT");
var lf =  new Integer ('\u000a'.charCodeAt (0));
this.naturalKeyTable.put ("LF", lf);
this.nameTable.put (lf, "LF");
var nul =  new Integer (0);
this.naturalKeyTable.put ("NUL", nul);
this.nameTable.put (nul, "NUL");
var numLock =  new Integer (16777299);
this.naturalKeyTable.put ("NUM_LOCK", numLock);
this.nameTable.put (numLock, "NUM_LOCK");
var keypad0 =  new Integer (16777264);
this.naturalKeyTable.put ("NUMPAD_0", keypad0);
this.nameTable.put (keypad0, "NUMPAD_0");
var keypad1 =  new Integer (16777265);
this.naturalKeyTable.put ("NUMPAD_1", keypad1);
this.nameTable.put (keypad1, "NUMPAD_1");
var keypad2 =  new Integer (16777266);
this.naturalKeyTable.put ("NUMPAD_2", keypad2);
this.nameTable.put (keypad2, "NUMPAD_2");
var keypad3 =  new Integer (16777267);
this.naturalKeyTable.put ("NUMPAD_3", keypad3);
this.nameTable.put (keypad3, "NUMPAD_3");
var keypad4 =  new Integer (16777268);
this.naturalKeyTable.put ("NUMPAD_4", keypad4);
this.nameTable.put (keypad4, "NUMPAD_4");
var keypad5 =  new Integer (16777269);
this.naturalKeyTable.put ("NUMPAD_5", keypad5);
this.nameTable.put (keypad5, "NUMPAD_5");
var keypad6 =  new Integer (16777270);
this.naturalKeyTable.put ("NUMPAD_6", keypad6);
this.nameTable.put (keypad6, "NUMPAD_6");
var keypad7 =  new Integer (16777271);
this.naturalKeyTable.put ("NUMPAD_7", keypad7);
this.nameTable.put (keypad7, "NUMPAD_7");
var keypad8 =  new Integer (16777272);
this.naturalKeyTable.put ("NUMPAD_8", keypad8);
this.nameTable.put (keypad8, "NUMPAD_8");
var keypad9 =  new Integer (16777273);
this.naturalKeyTable.put ("NUMPAD_9", keypad9);
this.nameTable.put (keypad9, "NUMPAD_9");
var keypadAdd =  new Integer (16777259);
this.naturalKeyTable.put ("NUMPAD_ADD", keypadAdd);
this.nameTable.put (keypadAdd, "NUMPAD_ADD");
var keypadDecimal =  new Integer (16777262);
this.naturalKeyTable.put ("NUMPAD_DECIMAL", keypadDecimal);
this.nameTable.put (keypadDecimal, "NUMPAD_DECIMAL");
var keypadDivide =  new Integer (16777263);
this.naturalKeyTable.put ("NUMPAD_DIVIDE", keypadDivide);
this.nameTable.put (keypadDivide, "NUMPAD_DIVIDE");
var keypadCr =  new Integer (16777296);
this.naturalKeyTable.put ("NUMPAD_ENTER", keypadCr);
this.nameTable.put (keypadCr, "NUMPAD_ENTER");
var keypadEqual =  new Integer (16777277);
this.naturalKeyTable.put ("NUMPAD_EQUAL", keypadEqual);
this.nameTable.put (keypadEqual, "NUMPAD_EQUAL");
var keypadMultiply =  new Integer (16777258);
this.naturalKeyTable.put ("NUMPAD_MULTIPLY", keypadMultiply);
this.nameTable.put (keypadMultiply, "NUMPAD_MULTIPLY");
var keypadSubtract =  new Integer (16777261);
this.naturalKeyTable.put ("NUMPAD_SUBTRACT", keypadSubtract);
this.nameTable.put (keypadSubtract, "NUMPAD_SUBTRACT");
var pageDown =  new Integer (16777222);
this.naturalKeyTable.put ("PAGE_DOWN", pageDown);
this.nameTable.put (pageDown, "PAGE_DOWN");
var pageUp =  new Integer (16777221);
this.naturalKeyTable.put ("PAGE_UP", pageUp);
this.nameTable.put (pageUp, "PAGE_UP");
var pause =  new Integer (16777301);
this.naturalKeyTable.put ("PAUSE", pause);
this.nameTable.put (pause, "PAUSE");
var printScreen =  new Integer (16777303);
this.naturalKeyTable.put ("PRINT_SCREEN", printScreen);
this.nameTable.put (printScreen, "PRINT_SCREEN");
var scrollLock =  new Integer (16777300);
this.naturalKeyTable.put ("SCROLL_LOCK", scrollLock);
this.nameTable.put (scrollLock, "SCROLL_LOCK");
var space =  new Integer (' '.charCodeAt (0));
this.naturalKeyTable.put ("SPACE", space);
this.nameTable.put (space, "SPACE");
var tab =  new Integer ('\u0009'.charCodeAt (0));
this.naturalKeyTable.put ("TAB", tab);
this.nameTable.put (tab, "TAB");
var vt =  new Integer (11);
this.naturalKeyTable.put ("VT", vt);
this.nameTable.put (vt, "VT");
});
Clazz.overrideMethod (c$, "formalKeyLookup", 
function (name) {
var value = this.naturalKeyTable.get (name);
if (Clazz.instanceOf (value, Integer)) {
return (value).intValue ();
}return name.charAt (0);
}, "~S");
Clazz.overrideMethod (c$, "formalKeyLookupInteger", 
function (name) {
var value = this.naturalKeyTable.get (name);
if (Clazz.instanceOf (value, Integer)) {
return value;
}return  new Integer (name.charAt (0).charCodeAt (0));
}, "~S");
Clazz.overrideMethod (c$, "formalModifierLookup", 
function (name) {
var value = this.modifierKeyTable.get (name);
if (Clazz.instanceOf (value, Integer)) {
return (value).intValue ();
}return 0;
}, "~S");
Clazz.overrideMethod (c$, "formalNameLookup", 
function (key) {
var keyObject =  new Integer (key);
var value = this.nameTable.get (keyObject);
if (Clazz.instanceOf (value, String)) {
return value;
}return "" + (String.fromCharCode (key));
}, "~N");
Clazz.overrideMethod (c$, "getAlt", 
function () {
return 65536;
});
Clazz.overrideMethod (c$, "getCommand", 
function () {
return 4194304;
});
Clazz.overrideMethod (c$, "getCtrl", 
function () {
return 262144;
});
Clazz.overrideMethod (c$, "getShift", 
function () {
return 131072;
});
Clazz.overrideMethod (c$, "isModifierKey", 
function (key) {
return ((key & $WT.MODIFIER_MASK) != 0);
}, "~N");
});
