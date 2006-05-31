/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=org/eclipse/swt/internal/SWTEventListener.js,org/eclipse/swt/internal/SWTEventObject.js,org/eclipse/swt/internal/SerializableCompatibility.js,org/eclipse/swt/internal/CloneableCompatibility.js,org/eclipse/swt/internal/RunnableCompatibility.js,org/eclipse/swt/SWT.js,org/eclipse/swt/widgets/Event.js,org/eclipse/swt/events/TypedEvent.js,org/eclipse/swt/events/ArmEvent.js,org/eclipse/swt/events/ControlEvent.js,org/eclipse/swt/events/DisposeEvent.js,org/eclipse/swt/events/FocusEvent.js,org/eclipse/swt/events/HelpEvent.js,org/eclipse/swt/events/KeyEvent.js,org/eclipse/swt/events/MenuEvent.js,org/eclipse/swt/events/ModifyEvent.js,org/eclipse/swt/events/MouseAdapter.js,org/eclipse/swt/events/MouseEvent.js,org/eclipse/swt/events/PaintEvent.js,org/eclipse/swt/events/SelectionEvent.js,org/eclipse/swt/events/ShellEvent.js,org/eclipse/swt/events/TraverseEvent.js,org/eclipse/swt/events/TreeEvent.js,org/eclipse/swt/events/VerifyEvent.js,org/eclipse/swt/widgets/Listener.js,org/eclipse/swt/widgets/TypedListener.js,org/eclipse/swt/events/ArmListener.js,org/eclipse/swt/events/ControlListener.js,org/eclipse/swt/events/ControlAdapter.js,org/eclipse/swt/events/DisposeListener.js,org/eclipse/swt/events/FocusListener.js,org/eclipse/swt/events/FocusAdapter.js,org/eclipse/swt/events/HelpListener.js,org/eclipse/swt/events/KeyListener.js,org/eclipse/swt/events/KeyAdapter.js,org/eclipse/swt/events/MenuListener.js,org/eclipse/swt/events/MenuAdapter.js,org/eclipse/swt/events/ModifyListener.js,org/eclipse/swt/events/MouseListener.js,org/eclipse/swt/events/MouseMoveListener.js,org/eclipse/swt/events/MouseTrackListener.js,org/eclipse/swt/events/MouseTrackAdapter.js,org/eclipse/swt/events/PaintListener.js,org/eclipse/swt/events/SelectionListener.js,org/eclipse/swt/events/SelectionAdapter.js,org/eclipse/swt/events/ShellListener.js,org/eclipse/swt/events/ShellAdapter.js,org/eclipse/swt/events/TraverseListener.js,org/eclipse/swt/events/TreeListener.js,org/eclipse/swt/events/TreeAdapter.js,org/eclipse/swt/events/VerifyListener.js,org/eclipse/swt/widgets/EventTable.js,org/eclipse/swt/graphics/Point.js,org/eclipse/swt/graphics/Rectangle.js,org/eclipse/swt/graphics/RGB.js,org/eclipse/swt/widgets/Layout.js,org/eclipse/swt/layout/FillData.js,org/eclipse/swt/layout/FormData.js,org/eclipse/swt/layout/GridData.js,org/eclipse/swt/layout/RowData.js,org/eclipse/swt/layout/FormAttachment.js,org/eclipse/swt/layout/FillLayout.js,org/eclipse/swt/layout/FormLayout.js,org/eclipse/swt/layout/GridLayout.js,org/eclipse/swt/layout/RowLayout.js
=*/
Clazz.declarePackage ("org.eclipse.swt");
$wt = org.eclipse.swt;
var swtSubPackages = [
"accessibility", 
"browser", 
"custom", 
"dnd",
"events", 
"graphics", 
"internal", 
"internal.dnd", 
"layout", 
"widgets"
];
for (var i = 0; i < swtSubPackages.length; i++) {
Clazz.declarePackage ("org.eclipse.swt." + swtSubPackages[i]);
}
Clazz.formatParameters = function (funParams) {
if (funParams == null || funParams.length == 0) {
return "\\void";
} else {
var s = funParams.toString ();
s = s.replace (/~([NABSO])/g, function ($0, $1) {
if ($1 == 'N') {
return "Number";
} else if ($1 == 'B') {
return "Boolean"
} else if ($1 == 'S') {
return "String";
} else if ($1 == 'O') {
return "Object";
} else if ($1 == 'A') {
return "Array"
}
return "Unknown";
});
return "\\" + s.replace (/\s+/g, "").replace (/,/g, "\\")
.replace (/\$wt\./g, "org.eclipse.swt.");
}
};
$WT = 
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt, "SWT");
cla$$.findErrorText = $_M (cla$$, "findErrorText", 
function (code) {
switch (code) {
case 1:
return "Unspecified error";
case 2:
return "No more handles";
case 3:
return "No more callbacks";
case 4:
return "Argument cannot be null";
case 5:
return "Argument not valid";
case 6:
return "Index out of bounds";
case 7:
return "Argument cannot be zero";
case 8:
return "Cannot get item";
case 9:
return "Cannot get selection";
case 11:
return "Cannot get item height";
case 12:
return "Cannot get text";
case 13:
return "Cannot set text";
case 14:
return "Item not added";
case 15:
return "Item not removed";
case 20:
return "Not implemented";
case 21:
return "Menu must be a drop down";
case 22:
return "Invalid thread access";
case 24:
return "Widget is disposed";
case 27:
return "Menu item is not a CASCADE";
case 28:
return "Cannot set selection";
case 29:
return "Cannot set menu";
case 30:
return "Cannot set the enabled state";
case 31:
return "Cannot get the enabled state";
case 32:
return "Widget has the wrong parent";
case 33:
return "Menu is not a BAR";
case 36:
return "Cannot get count";
case 37:
return "Menu is not a POP_UP";
case 38:
return "Unsupported color depth";
case 39:
return "i/o error";
case 40:
return "Invalid image";
case 42:
return "Unsupported or unrecognized format";
case 43:
return "Subclassing not allowed";
case 44:
return "Graphic is disposed";
case 45:
return "Device is disposed";
case 46:
return "Failed to execute runnable";
case 47:
return "Unable to load library";
case 10:
return "Cannot invert matrix";
case 16:
return "Unable to load graphics library";
case 48:
return "Font not valid";
}
return "Unknown error";
}, "~N");
cla$$.getMessage = $_M (cla$$, "getMessage", 
function (key) {
return "!" + key + "!";
}, "~S");
cla$$.getPlatform = $_M (cla$$, "getPlatform", 
function () {
return "win32";
});
cla$$.getVersion = $_M (cla$$, "getVersion", 
function () {
return 3139;
});
cla$$.error = $_M (cla$$, "error", 
function (code) {
var m = Clazz.getMixedCallerMethod (arguments);
if (m != null) {
var args = m.caller.arguments;
var clazzName = null;
if (m.caller.claxxOwner != null) {
clazzName = Clazz.getClassName (m.caller.claxxOwner);
} else if (m.caller.stacks != null) {
clazzName = Clazz.getClassName (m.caller.stacks[m.caller.stacks.length - 1]);
}
var str = "SWT.error is called from ";
if (clazzName != null && clazzName.length != 0) {
str += clazzName + ".";
}
str += (m.caller.exName == null) ? "anonymous" : m.caller.exName;
str += " (" + Clazz.getParamsType (args) + ") ~ [";
for (var i = 0; i <args.length; i++) {
str += args[i];
str += (i < args.length - 1) ? "," : "";
}
str += "]";
window.error (str);
window.log (("" + m.caller).trim ());
}
$WT.error (code, null);
}, "~N");
cla$$.error = $_M (cla$$, "error", 
function (code, throwable) {
$WT.error (code, throwable, null);
}, "~N,Throwable");
cla$$.error = $_M (cla$$, "error", 
function (code, throwable, detail) {
if ($_O (throwable, $wt.SWTError)) throw throwable;
if ($_O (throwable, $wt.SWTException)) throw throwable;
var message = $WT.findErrorText (code);
if (detail != null) message += detail;
switch (code) {
case 4:
case 7:
case 5:
case 33:
case 21:
case 37:
case 27:
case 32:
case 6:
{
throw  new IllegalArgumentException (message);
}case 43:
case 22:
case 24:
case 44:
case 45:
case 40:
case 38:
case 42:
case 46:
case 10:
case 16:
case 39:
{
var exception =  new $wt.SWTException (code, message);
exception.throwable = throwable;
throw exception;
}case 36:
case 31:
case 8:
case 11:
case 9:
case 12:
case 30:
case 29:
case 28:
case 13:
case 14:
case 15:
case 2:
case 47:
case 3:
case 20:
case 1:
{
var error =  new $wt.SWTError (code, message);
error.throwable = throwable;
throw error;
}}
var error =  new $wt.SWTError (code, message);
error.throwable = throwable;
throw error;
}, "~N,Throwable,~S");
$_S (cla$$,
"None", 0,
"KeyDown", 1,
"KeyUp", 2,
"MouseDown", 3,
"MouseUp", 4,
"MouseMove", 5,
"MouseEnter", 6,
"MouseExit", 7,
"MouseDoubleClick", 8,
"Paint", 9,
"Move", 10,
"Resize", 11,
"Dispose", 12,
"Selection", 13,
"DefaultSelection", 14,
"FocusIn", 15,
"FocusOut", 16,
"Expand", 17,
"Collapse", 18,
"Iconify", 19,
"Deiconify", 20,
"Close", 21,
"Show", 22,
"Hide", 23,
"Modify", 24,
"Verify", 25,
"Activate", 26,
"Deactivate", 27,
"Help", 28,
"DragDetect", 29,
"Arm", 30,
"Traverse", 31,
"MouseHover", 32,
"HardKeyDown", 33,
"HardKeyUp", 34,
"MenuDetect", 35,
"SetData", 36,
"MouseWheel", 37,
"NONE", 0,
"DRAG", 1,
"NULL", 0,
"DEFAULT", -1,
"OFF", 0,
"ON", 1,
"LOW", 1,
"HIGH", 2,
"BAR", 2,
"DROP_DOWN", 4,
"POP_UP", 8,
"SEPARATOR", 2,
"TOGGLE", 2,
"ARROW", 4,
"PUSH", 8,
"RADIO", 16,
"CHECK", 32,
"CASCADE", 64,
"MULTI", 2,
"SINGLE", 4,
"READ_ONLY", 8,
"WRAP", 64,
"SIMPLE", 64,
"PASSWORD", 4194304,
"SHADOW_IN", 4,
"SHADOW_OUT", 8,
"SHADOW_ETCHED_IN", 16,
"SHADOW_ETCHED_OUT", 64,
"SHADOW_NONE", 32,
"INDETERMINATE", 2,
"TOOL", 4,
"NO_TRIM", 8,
"RESIZE", 16,
"TITLE", 32,
"CLOSE", 64,
"MENU", 64,
"MIN", 128,
"MAX", 1024,
"H_SCROLL", 256,
"V_SCROLL", 512,
"BORDER", 2048,
"CLIP_CHILDREN", 4096,
"CLIP_SIBLINGS", 8192,
"ON_TOP", 16384,
"SHELL_TRIM", 1264,
"DIALOG_TRIM", 2144,
"MODELESS", 0,
"PRIMARY_MODAL", 32768,
"APPLICATION_MODAL", 65536,
"SYSTEM_MODAL", 131072,
"HIDE_SELECTION", 32768,
"FULL_SELECTION", 65536,
"FLAT", 8388608,
"SMOOTH", 65536,
"NO_BACKGROUND", 262144,
"NO_FOCUS", 524288,
"NO_REDRAW_RESIZE", 1048576,
"NO_MERGE_PAINTS", 2097152,
"NO_RADIO_GROUP", 4194304,
"LEFT_TO_RIGHT", 33554432,
"RIGHT_TO_LEFT", 67108864,
"MIRRORED", 134217728,
"EMBEDDED", 16777216,
"VIRTUAL", 268435456,
"DOUBLE_BUFFERED", 536870912,
"UP", 128,
"TOP", 128,
"DOWN", 1024,
"BOTTOM", 1024,
"LEAD", 16384,
"LEFT", 16384,
"TRAIL", 131072,
"RIGHT", 131072,
"CENTER", 16777216,
"HORIZONTAL", 256,
"VERTICAL", 512,
"BEGINNING", 1,
"FILL", 4,
"DBCS", 2,
"ALPHA", 4,
"NATIVE", 8,
"PHONETIC", 16,
"ROMAN", 32,
"BS", '\b',
"CR", '\r',
"DEL", 0x7F,
"ESC", 0x1B,
"LF", '\n',
"TAB", '\t',
"ALT", 65536,
"SHIFT", 131072,
"CTRL", 262144,
"CONTROL", 262144,
"COMMAND", 4194304,
"MODIFIER_MASK", 0,
"BUTTON1", 524288,
"BUTTON2", 1048576,
"BUTTON3", 2097152,
"BUTTON4", 8388608,
"BUTTON5", 33554432,
"BUTTON_MASK", 0,
"MOD1", 0,
"MOD2", 0,
"MOD3", 0,
"MOD4", 0,
"SCROLL_LINE", 1,
"SCROLL_PAGE", 2,
"KEYCODE_BIT", (16777216),
"KEY_MASK", 16842751,
"ARROW_UP", 16777217,
"ARROW_DOWN", 16777218,
"ARROW_LEFT", 16777219,
"ARROW_RIGHT", 16777220,
"PAGE_UP", 16777221,
"PAGE_DOWN", 16777222,
"HOME", 16777223,
"END", 16777224,
"INSERT", 16777225,
"F1", 16777226,
"F2", 16777227,
"F3", 16777228,
"F4", 16777229,
"F5", 16777230,
"F6", 16777231,
"F7", 16777232,
"F8", 16777233,
"F9", 16777234,
"F10", 16777235,
"F11", 16777236,
"F12", 16777237,
"F13", 16777238,
"F14", 16777239,
"F15", 16777240,
"KEYPAD_MULTIPLY", 16777258,
"KEYPAD_ADD", 16777259,
"KEYPAD_SUBTRACT", 16777261,
"KEYPAD_DECIMAL", 16777262,
"KEYPAD_DIVIDE", 16777263,
"KEYPAD_0", 16777264,
"KEYPAD_1", 16777265,
"KEYPAD_2", 16777266,
"KEYPAD_3", 16777267,
"KEYPAD_4", 16777268,
"KEYPAD_5", 16777269,
"KEYPAD_6", 16777270,
"KEYPAD_7", 16777271,
"KEYPAD_8", 16777272,
"KEYPAD_9", 16777273,
"KEYPAD_EQUAL", 16777277,
"KEYPAD_CR", 16777296,
"HELP", 16777297,
"CAPS_LOCK", 16777298,
"NUM_LOCK", 16777299,
"SCROLL_LOCK", 16777300,
"PAUSE", 16777301,
"BREAK", 16777302,
"PRINT_SCREEN", 16777303,
"ICON_ERROR", 1,
"ICON_INFORMATION", 2,
"ICON_QUESTION", 4,
"ICON_WARNING", 8,
"ICON_WORKING", 16,
"OK", 32,
"YES", 64,
"NO", 128,
"CANCEL", 256,
"ABORT", 512,
"RETRY", 1024,
"IGNORE", 2048,
"OPEN", 4096,
"SAVE", 8192,
"COLOR_WHITE", 1,
"COLOR_BLACK", 2,
"COLOR_RED", 3,
"COLOR_DARK_RED", 4,
"COLOR_GREEN", 5,
"COLOR_DARK_GREEN", 6,
"COLOR_YELLOW", 7,
"COLOR_DARK_YELLOW", 8,
"COLOR_BLUE", 9,
"COLOR_DARK_BLUE", 10,
"COLOR_MAGENTA", 11,
"COLOR_DARK_MAGENTA", 12,
"COLOR_CYAN", 13,
"COLOR_DARK_CYAN", 14,
"COLOR_GRAY", 15,
"COLOR_DARK_GRAY", 16,
"COLOR_WIDGET_DARK_SHADOW", 17,
"COLOR_WIDGET_NORMAL_SHADOW", 18,
"COLOR_WIDGET_LIGHT_SHADOW", 19,
"COLOR_WIDGET_HIGHLIGHT_SHADOW", 20,
"COLOR_WIDGET_FOREGROUND", 21,
"COLOR_WIDGET_BACKGROUND", 22,
"COLOR_WIDGET_BORDER", 23,
"COLOR_LIST_FOREGROUND", 24,
"COLOR_LIST_BACKGROUND", 25,
"COLOR_LIST_SELECTION", 26,
"COLOR_LIST_SELECTION_TEXT", 27,
"COLOR_INFO_FOREGROUND", 28,
"COLOR_INFO_BACKGROUND", 29,
"COLOR_TITLE_FOREGROUND", 30,
"COLOR_TITLE_BACKGROUND", 31,
"COLOR_TITLE_BACKGROUND_GRADIENT", 32,
"COLOR_TITLE_INACTIVE_FOREGROUND", 33,
"COLOR_TITLE_INACTIVE_BACKGROUND", 34,
"COLOR_TITLE_INACTIVE_BACKGROUND_GRADIENT", 35,
"DRAW_TRANSPARENT", 1,
"DRAW_DELIMITER", 2,
"DRAW_TAB", 4,
"DRAW_MNEMONIC", 8,
"ERROR_UNSPECIFIED", 1,
"ERROR_NO_HANDLES", 2,
"ERROR_NO_MORE_CALLBACKS", 3,
"ERROR_NULL_ARGUMENT", 4,
"ERROR_INVALID_ARGUMENT", 5,
"ERROR_INVALID_RANGE", 6,
"ERROR_CANNOT_BE_ZERO", 7,
"ERROR_CANNOT_GET_ITEM", 8,
"ERROR_CANNOT_GET_SELECTION", 9,
"ERROR_CANNOT_INVERT_MATRIX", 10,
"ERROR_CANNOT_GET_ITEM_HEIGHT", 11,
"ERROR_CANNOT_GET_TEXT", 12,
"ERROR_CANNOT_SET_TEXT", 13,
"ERROR_ITEM_NOT_ADDED", 14,
"ERROR_ITEM_NOT_REMOVED", 15,
"ERROR_NO_GRAPHICS_LIBRARY", 16,
"ERROR_NOT_IMPLEMENTED", 20,
"ERROR_MENU_NOT_DROP_DOWN", 21,
"ERROR_THREAD_INVALID_ACCESS", 22,
"ERROR_WIDGET_DISPOSED", 24,
"ERROR_MENUITEM_NOT_CASCADE", 27,
"ERROR_CANNOT_SET_SELECTION", 28,
"ERROR_CANNOT_SET_MENU", 29,
"ERROR_CANNOT_SET_ENABLED", 30,
"ERROR_CANNOT_GET_ENABLED", 31,
"ERROR_INVALID_PARENT", 32,
"ERROR_MENU_NOT_BAR", 33,
"ERROR_CANNOT_GET_COUNT", 36,
"ERROR_MENU_NOT_POP_UP", 37,
"ERROR_UNSUPPORTED_DEPTH", 38,
"ERROR_IO", 39,
"ERROR_INVALID_IMAGE", 40,
"ERROR_UNSUPPORTED_FORMAT", 42,
"ERROR_INVALID_SUBCLASS", 43,
"ERROR_GRAPHIC_DISPOSED", 44,
"ERROR_DEVICE_DISPOSED", 45,
"ERROR_FAILED_EXEC", 46,
"ERROR_FAILED_LOAD_LIBRARY", 47,
"ERROR_INVALID_FONT", 48,
"TRAVERSE_NONE", 0,
"TRAVERSE_ESCAPE", 2,
"TRAVERSE_RETURN", 4,
"TRAVERSE_TAB_PREVIOUS", 8,
"TRAVERSE_TAB_NEXT", 16,
"TRAVERSE_ARROW_PREVIOUS", 32,
"TRAVERSE_ARROW_NEXT", 64,
"TRAVERSE_MNEMONIC", 128,
"TRAVERSE_PAGE_PREVIOUS", 256,
"TRAVERSE_PAGE_NEXT", 512,
"BITMAP", 0,
"ICON", 1,
"IMAGE_COPY", 0,
"IMAGE_DISABLE", 1,
"IMAGE_GRAY", 2,
"NORMAL", 0,
"BOLD", 1,
"ITALIC", 2,
"CURSOR_ARROW", 0,
"CURSOR_WAIT", 1,
"CURSOR_CROSS", 2,
"CURSOR_APPSTARTING", 3,
"CURSOR_HELP", 4,
"CURSOR_SIZEALL", 5,
"CURSOR_SIZENESW", 6,
"CURSOR_SIZENS", 7,
"CURSOR_SIZENWSE", 8,
"CURSOR_SIZEWE", 9,
"CURSOR_SIZEN", 10,
"CURSOR_SIZES", 11,
"CURSOR_SIZEE", 12,
"CURSOR_SIZEW", 13,
"CURSOR_SIZENE", 14,
"CURSOR_SIZESE", 15,
"CURSOR_SIZESW", 16,
"CURSOR_SIZENW", 17,
"CURSOR_UPARROW", 18,
"CURSOR_IBEAM", 19,
"CURSOR_NO", 20,
"CURSOR_HAND", 21,
"CAP_FLAT", 1,
"CAP_ROUND", 2,
"CAP_SQUARE", 3,
"JOIN_MITER", 1,
"JOIN_ROUND", 2,
"JOIN_BEVEL", 3,
"LINE_SOLID", 1,
"LINE_DASH", 2,
"LINE_DOT", 3,
"LINE_DASHDOT", 4,
"LINE_DASHDOTDOT", 5,
"LINE_CUSTOM", 6,
"PATH_MOVE_TO", 1,
"PATH_LINE_TO", 2,
"PATH_QUAD_TO", 3,
"PATH_CUBIC_TO", 4,
"PATH_CLOSE", 5,
"FILL_EVEN_ODD", 1,
"FILL_WINDING", 2,
"IMAGE_UNDEFINED", -1,
"IMAGE_BMP", 0,
"IMAGE_BMP_RLE", 1,
"IMAGE_GIF", 2,
"IMAGE_ICO", 3,
"IMAGE_JPEG", 4,
"IMAGE_PNG", 5,
"IMAGE_TIFF", 6,
"IMAGE_OS2_BMP", 7,
"DM_UNSPECIFIED", 0x0,
"DM_FILL_NONE", 0x1,
"DM_FILL_BACKGROUND", 0x2,
"DM_FILL_PREVIOUS", 0x3,
"TRANSPARENCY_NONE", 0x0,
"TRANSPARENCY_ALPHA", 1,
"TRANSPARENCY_MASK", 2,
"TRANSPARENCY_PIXEL", 4,
"MOVEMENT_CHAR", 1,
"MOVEMENT_CLUSTER", 2,
"MOVEMENT_WORD", 4);
{
($t$ = $WT.BUTTON_MASK = 45613056, $WT.prototype.BUTTON_MASK = $WT.BUTTON_MASK, $t$);
($t$ = $WT.MODIFIER_MASK = 4653056, $WT.prototype.MODIFIER_MASK = $WT.MODIFIER_MASK, $t$);
var platform = $WT.getPlatform ();
if ("carbon".equals (platform)) {
($t$ = $WT.MOD1 = 4194304, $WT.prototype.MOD1 = $WT.MOD1, $t$);
($t$ = $WT.MOD2 = 131072, $WT.prototype.MOD2 = $WT.MOD2, $t$);
($t$ = $WT.MOD3 = 65536, $WT.prototype.MOD3 = $WT.MOD3, $t$);
($t$ = $WT.MOD4 = 262144, $WT.prototype.MOD4 = $WT.MOD4, $t$);
} else {
($t$ = $WT.MOD1 = 262144, $WT.prototype.MOD1 = $WT.MOD1, $t$);
($t$ = $WT.MOD2 = 131072, $WT.prototype.MOD2 = $WT.MOD2, $t$);
($t$ = $WT.MOD3 = 65536, $WT.prototype.MOD3 = $WT.MOD3, $t$);
($t$ = $WT.MOD4 = 0, $WT.prototype.MOD4 = $WT.MOD4, $t$);
}}cla$$ = $_C (function () {
this.code = 0;
this.throwable = null;
$_Z (this, arguments);
}, $wt, "SWTError", Error);
$_K (cla$$, 
function () {
this.construct (1);
});
$_K (cla$$, 
function (message) {
this.construct (1, message);
}, "~S");
$_K (cla$$, 
function (code) {
this.construct (code, $WT.findErrorText (code));
}, "~N");
$_K (cla$$, 
function (code, message) {
$_R (this, $wt.SWTError, [message]);
this.code = code;
}, "~N,~S");
$_V (cla$$, "getCause", 
function () {
return this.throwable;
});
$_M (cla$$, "getMessage", 
function () {
if (this.throwable == null) return $_U (this, $wt.SWTError, "getMessage", []);
return $_U (this, $wt.SWTError, "getMessage", []) + " (" + this.throwable.toString () + ")";
});
$_M (cla$$, "printStackTrace", 
function () {
$_U (this, $wt.SWTError, "printStackTrace", []);
if (this.throwable != null) {
System.err.println ("*** Stack trace of contained error ***");
this.throwable.printStackTrace ();
}});
$_S (cla$$,
"serialVersionUID", 3833467327105808433);
cla$$ = $_C (function () {
this.code = 0;
this.throwable = null;
$_Z (this, arguments);
}, $wt, "SWTException", RuntimeException);
$_K (cla$$, 
function () {
this.construct (1);
});
$_K (cla$$, 
function (message) {
this.construct (1, message);
}, "~S");
$_K (cla$$, 
function (code) {
this.construct (code, $WT.findErrorText (code));
}, "~N");
$_K (cla$$, 
function (code, message) {
$_R (this, $wt.SWTException, [message]);
this.code = code;
}, "~N,~S");
$_V (cla$$, "getCause", 
function () {
return this.throwable;
});
$_M (cla$$, "getMessage", 
function () {
if (this.throwable == null) return $_U (this, $wt.SWTException, "getMessage", []);
return $_U (this, $wt.SWTException, "getMessage", []) + " (" + this.throwable.toString () + ")";
});
$_M (cla$$, "printStackTrace", 
function () {
$_U (this, $wt.SWTException, "printStackTrace", []);
if (this.throwable != null) {
System.err.println ("*** Stack trace of contained exception ***");
this.throwable.printStackTrace ();
}});
$_S (cla$$,
"serialVersionUID", 3257282552304842547);
$_I ($wt.internal, "SWTEventListener", java.util.EventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.internal, "SWTEventObject", java.util.EventObject);
$_K (cla$$, 
function (source) {
$_R (this, $wt.internal.SWTEventObject, [source]);
}, "Object");
$_S (cla$$,
"serialVersionUID", 3258125873411470903);
$_I ($wt.internal, "SerializableCompatibility", java.io.Serializable);
$_I ($wt.internal, "CloneableCompatibility", Cloneable);
cla$$ = $_C (function () {
this.returnSet = 0;
this.returnBoolean = false;
this.returnNumber = 0;
this.returnObject = null;
this.event = null;
$_Z (this, arguments);
}, $wt.internal, "RunnableCompatibility", null, Runnable);
$_M (cla$$, "getEvent", 
function () {
return this.event;
});
$_M (cla$$, "setEvent", 
function (event) {
this.event = event;
}, "Object");
$_M (cla$$, "toReturn", 
function (val) {
this.returnSet = 1;
this.returnNumber = val;
this.returnObject = null;
}, "~N");
$_M (cla$$, "toReturn", 
function (val) {
this.returnSet = 2;
this.returnBoolean = val;
this.returnNumber = 0;
this.returnObject = null;
}, "~B");
$_M (cla$$, "toReturn", 
function (val) {
this.returnSet = 3;
this.returnObject = val;
this.returnNumber = 0;
this.returnBoolean = false;
}, "Object");
$_M (cla$$, "isReturned", 
function () {
return this.returnSet != 0;
});
cla$$ = $_C (function () {
this.display = null;
this.widget = null;
this.type = 0;
this.detail = 0;
this.item = null;
this.gc = null;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.count = 0;
this.time = 0;
this.button = 0;
this.character = 0;
this.keyCode = 0;
this.stateMask = 0;
this.start = 0;
this.end = 0;
this.text = null;
this.doit = true;
this.data = null;
$_Z (this, arguments);
}, $wt.widgets, "Event");
$_M (cla$$, "getBounds", 
function () {
return  new $wt.graphics.Rectangle (this.x, this.y, this.width, this.height);
});
$_M (cla$$, "setBounds", 
function (rect) {
this.x = rect.x;
this.y = rect.y;
this.width = rect.width;
this.height = rect.height;
}, "$wt.graphics.Rectangle");
$_V (cla$$, "toString", 
function () {
return "Event {type=" + this.type + ",widget=" + this.widget + ",x=" + this.x + ",y=" + this.y + ",width=" + this.width + ",height=" + this.height + "}";
});
$_M (cla$$, "releaseResource", 
function () {
this.gc = null;
this.data = null;
this.item = null;
this.widget = null;
this.display = null;
});
cla$$ = $_C (function () {
this.display = null;
this.widget = null;
this.time = 0;
this.data = null;
$_Z (this, arguments);
}, $wt.events, "TypedEvent", $wt.internal.SWTEventObject);
$_K (cla$$, 
function (object) {
$_R (this, $wt.events.TypedEvent, [object]);
}, "Object");
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.TypedEvent, [e.widget]);
this.display = e.display;
this.widget = e.widget;
this.time = e.time;
this.data = e.data;
}, "$wt.widgets.Event");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
return this.getName () + "{" + this.widget + " time=" + this.time + " data=" + this.data + "}";
});
$_S (cla$$,
"serialVersionUID", 3257285846578377524);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "ArmEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.ArmEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3258126964249212217);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "ControlEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.ControlEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3258132436155119161);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "DisposeEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.DisposeEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3257566187633521206);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "FocusEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.FocusEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3258134643684227381);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "HelpEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.HelpEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3257001038606251315);
cla$$ = $_C (function () {
this.character = 0;
this.keyCode = 0;
this.stateMask = 0;
this.doit = false;
$_Z (this, arguments);
}, $wt.events, "KeyEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.KeyEvent, [e]);
this.character = e.character;
this.keyCode = e.keyCode;
this.stateMask = e.stateMask;
this.doit = e.doit;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.KeyEvent, "toString", []);
return string.substring (0, string.length - 1) + " character='" + (((this.character).charCodeAt (0) == 0) ? "\\0" : "" + this.character) + "'" + " keyCode=" + this.keyCode + " stateMask=" + this.stateMask + " doit=" + this.doit + "}";
});
$_S (cla$$,
"serialVersionUID", 3256442491011412789);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "MenuEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.MenuEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3258132440332383025);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "ModifyEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.ModifyEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3258129146227011891);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "MouseAdapter", null, $wt.events.MouseListener);
$_V (cla$$, "mouseDoubleClick", 
function (e) {
}, "$wt.events.MouseEvent");
$_V (cla$$, "mouseDown", 
function (e) {
}, "$wt.events.MouseEvent");
$_V (cla$$, "mouseUp", 
function (e) {
}, "$wt.events.MouseEvent");
cla$$ = $_C (function () {
this.button = 0;
this.stateMask = 0;
this.x = 0;
this.y = 0;
$_Z (this, arguments);
}, $wt.events, "MouseEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.MouseEvent, [e]);
this.x = e.x;
this.y = e.y;
this.button = e.button;
this.stateMask = e.stateMask;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.MouseEvent, "toString", []);
return string.substring (0, string.length - 1) + " button=" + this.button + " stateMask=" + this.stateMask + " x=" + this.x + " y=" + this.y + "}";
});
$_S (cla$$,
"serialVersionUID", 3257288037011566898);
cla$$ = $_C (function () {
this.gc = null;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.count = 0;
$_Z (this, arguments);
}, $wt.events, "PaintEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.PaintEvent, [e]);
this.gc = e.gc;
this.x = e.x;
this.y = e.y;
this.width = e.width;
this.height = e.height;
this.count = e.count;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.PaintEvent, "toString", []);
return string.substring (0, string.length - 1) + " gc=" + this.gc + " x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " count=" + this.count + "}";
});
$_S (cla$$,
"serialVersionUID", 3256446919205992497);
cla$$ = $_C (function () {
this.item = null;
this.detail = 0;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.stateMask = 0;
this.text = null;
this.doit = false;
$_Z (this, arguments);
}, $wt.events, "SelectionEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.SelectionEvent, [e]);
this.item = e.item;
this.x = e.x;
this.y = e.y;
this.width = e.width;
this.height = e.height;
this.detail = e.detail;
this.stateMask = e.stateMask;
this.text = e.text;
this.doit = e.doit;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.SelectionEvent, "toString", []);
return string.substring (0, string.length - 1) + " item=" + this.item + " detail=" + this.detail + " x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " stateMask=" + this.stateMask + " text=" + this.text + " doit=" + this.doit + "}";
});
$_S (cla$$,
"serialVersionUID", 3976735856884987953);
cla$$ = $_C (function () {
this.doit = false;
$_Z (this, arguments);
}, $wt.events, "ShellEvent", $wt.events.TypedEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.ShellEvent, [e]);
this.doit = e.doit;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.ShellEvent, "toString", []);
return string.substring (0, string.length - 1) + " doit=" + this.doit + "}";
});
$_S (cla$$,
"serialVersionUID", 3257569490479888441);
cla$$ = $_C (function () {
this.detail = 0;
$_Z (this, arguments);
}, $wt.events, "TraverseEvent", $wt.events.KeyEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.TraverseEvent, [e]);
this.detail = e.detail;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.TraverseEvent, "toString", []);
return string.substring (0, string.length - 1) + " detail=" + this.detail + "}";
});
$_S (cla$$,
"serialVersionUID", 3257565105301239349);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "TreeEvent", $wt.events.SelectionEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.TreeEvent, [e]);
}, "$wt.widgets.Event");
$_S (cla$$,
"serialVersionUID", 3257282548009677109);
cla$$ = $_C (function () {
this.start = 0;
this.end = 0;
this.text = null;
$_Z (this, arguments);
}, $wt.events, "VerifyEvent", $wt.events.KeyEvent);
$_K (cla$$, 
function (e) {
$_R (this, $wt.events.VerifyEvent, [e]);
this.character = e.character;
this.keyCode = e.keyCode;
this.stateMask = e.stateMask;
this.start = e.start;
this.end = e.end;
this.text = e.text;
}, "$wt.widgets.Event");
$_M (cla$$, "toString", 
function () {
var string = $_U (this, $wt.events.VerifyEvent, "toString", []);
return string.substring (0, string.length - 1) + " start=" + this.start + " end=" + this.end + " text=" + this.text + "}";
});
$_S (cla$$,
"serialVersionUID", 3257003246269577014);
$_I ($wt.widgets, "Listener");
cla$$ = $_C (function () {
this.eventListener = null;
$_Z (this, arguments);
}, $wt.widgets, "TypedListener", null, $wt.widgets.Listener);
$_K (cla$$, 
function (listener) {
this.eventListener = listener;
}, "$wt.internal.SWTEventListener");
$_M (cla$$, "getEventListener", 
function () {
return this.eventListener;
});
$_V (cla$$, "handleEvent", 
function (e) {
switch (e.type) {
case 9:
{
var event =  new $wt.events.PaintEvent (e);
(this.eventListener).paintControl (event);
e.gc = event.gc;
break;
}case 13:
{
var event =  new $wt.events.SelectionEvent (e);
(this.eventListener).widgetSelected (event);
e.x = event.x;
e.y = event.y;
e.doit = event.doit;
break;
}case 14:
{
(this.eventListener).widgetDefaultSelected ( new $wt.events.SelectionEvent (e));
break;
}case 12:
{
(this.eventListener).widgetDisposed ( new $wt.events.DisposeEvent (e));
break;
}case 15:
{
(this.eventListener).focusGained ( new $wt.events.FocusEvent (e));
break;
}case 16:
{
(this.eventListener).focusLost ( new $wt.events.FocusEvent (e));
break;
}case 23:
{
(this.eventListener).menuHidden ( new $wt.events.MenuEvent (e));
break;
}case 22:
{
(this.eventListener).menuShown ( new $wt.events.MenuEvent (e));
break;
}case 1:
{
var event =  new $wt.events.KeyEvent (e);
(this.eventListener).keyPressed (event);
e.doit = event.doit;
break;
}case 2:
{
var event =  new $wt.events.KeyEvent (e);
(this.eventListener).keyReleased (event);
e.doit = event.doit;
break;
}case 3:
{
(this.eventListener).mouseDown ( new $wt.events.MouseEvent (e));
break;
}case 4:
{
(this.eventListener).mouseUp ( new $wt.events.MouseEvent (e));
break;
}case 8:
{
(this.eventListener).mouseDoubleClick ( new $wt.events.MouseEvent (e));
break;
}case 5:
{
(this.eventListener).mouseMove ( new $wt.events.MouseEvent (e));
return ;
}case 11:
{
(this.eventListener).controlResized ( new $wt.events.ControlEvent (e));
break;
}case 10:
{
(this.eventListener).controlMoved ( new $wt.events.ControlEvent (e));
break;
}case 21:
{
var event =  new $wt.events.ShellEvent (e);
(this.eventListener).shellClosed (event);
e.doit = event.doit;
break;
}case 26:
{
(this.eventListener).shellActivated ( new $wt.events.ShellEvent (e));
break;
}case 27:
{
(this.eventListener).shellDeactivated ( new $wt.events.ShellEvent (e));
break;
}case 19:
{
(this.eventListener).shellIconified ( new $wt.events.ShellEvent (e));
break;
}case 20:
{
(this.eventListener).shellDeiconified ( new $wt.events.ShellEvent (e));
break;
}case 17:
{
(this.eventListener).treeExpanded ( new $wt.events.TreeEvent (e));
break;
}case 18:
{
(this.eventListener).treeCollapsed ( new $wt.events.TreeEvent (e));
break;
}case 24:
{
(this.eventListener).modifyText ( new $wt.events.ModifyEvent (e));
break;
}case 25:
{
var event =  new $wt.events.VerifyEvent (e);
(this.eventListener).verifyText (event);
e.text = event.text;
e.doit = event.doit;
break;
}case 28:
{
(this.eventListener).helpRequested ( new $wt.events.HelpEvent (e));
break;
}case 30:
{
(this.eventListener).widgetArmed ( new $wt.events.ArmEvent (e));
break;
}case 7:
{
(this.eventListener).mouseExit ( new $wt.events.MouseEvent (e));
break;
}case 6:
{
(this.eventListener).mouseEnter ( new $wt.events.MouseEvent (e));
break;
}case 32:
{
(this.eventListener).mouseHover ( new $wt.events.MouseEvent (e));
break;
}case 31:
{
var event =  new $wt.events.TraverseEvent (e);
(this.eventListener).keyTraversed (event);
e.detail = event.detail;
e.doit = event.doit;
break;
}}
}, "$wt.widgets.Event");
$_I ($wt.events, "ArmListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "ControlListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "ControlAdapter", null, $wt.events.ControlListener);
$_V (cla$$, "controlMoved", 
function (e) {
}, "$wt.events.ControlEvent");
$_V (cla$$, "controlResized", 
function (e) {
}, "$wt.events.ControlEvent");
$_I ($wt.events, "DisposeListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "FocusListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "FocusAdapter", null, $wt.events.FocusListener);
$_V (cla$$, "focusGained", 
function (e) {
}, "$wt.events.FocusEvent");
$_V (cla$$, "focusLost", 
function (e) {
}, "$wt.events.FocusEvent");
$_I ($wt.events, "HelpListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "KeyListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "KeyAdapter", null, $wt.events.KeyListener);
$_V (cla$$, "keyPressed", 
function (e) {
}, "$wt.events.KeyEvent");
$_V (cla$$, "keyReleased", 
function (e) {
}, "$wt.events.KeyEvent");
$_I ($wt.events, "MenuListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "MenuAdapter", null, $wt.events.MenuListener);
$_V (cla$$, "menuHidden", 
function (e) {
}, "$wt.events.MenuEvent");
$_V (cla$$, "menuShown", 
function (e) {
}, "$wt.events.MenuEvent");
$_I ($wt.events, "ModifyListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "MouseListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "MouseMoveListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "MouseTrackListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "MouseTrackAdapter", null, $wt.events.MouseTrackListener);
$_V (cla$$, "mouseEnter", 
function (e) {
}, "$wt.events.MouseEvent");
$_V (cla$$, "mouseExit", 
function (e) {
}, "$wt.events.MouseEvent");
$_V (cla$$, "mouseHover", 
function (e) {
}, "$wt.events.MouseEvent");
$_I ($wt.events, "PaintListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "SelectionListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "SelectionAdapter", null, $wt.events.SelectionListener);
$_V (cla$$, "widgetSelected", 
function (e) {
}, "$wt.events.SelectionEvent");
$_V (cla$$, "widgetDefaultSelected", 
function (e) {
}, "$wt.events.SelectionEvent");
$_I ($wt.events, "ShellListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "ShellAdapter", null, $wt.events.ShellListener);
$_V (cla$$, "shellActivated", 
function (e) {
}, "$wt.events.ShellEvent");
$_V (cla$$, "shellClosed", 
function (e) {
}, "$wt.events.ShellEvent");
$_V (cla$$, "shellDeactivated", 
function (e) {
}, "$wt.events.ShellEvent");
$_V (cla$$, "shellDeiconified", 
function (e) {
}, "$wt.events.ShellEvent");
$_V (cla$$, "shellIconified", 
function (e) {
}, "$wt.events.ShellEvent");
$_I ($wt.events, "TraverseListener", $wt.internal.SWTEventListener);
$_I ($wt.events, "TreeListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.events, "TreeAdapter", null, $wt.events.TreeListener);
$_V (cla$$, "treeCollapsed", 
function (e) {
}, "$wt.events.TreeEvent");
$_V (cla$$, "treeExpanded", 
function (e) {
}, "$wt.events.TreeEvent");
$_I ($wt.events, "VerifyListener", $wt.internal.SWTEventListener);
cla$$ = $_C (function () {
this.types = null;
this.listeners = null;
this.level = 0;
$_Z (this, arguments);
}, $wt.widgets, "EventTable");
$_M (cla$$, "hook", 
function (eventType, listener) {
if (this.types == null) this.types =  $_A (4, 0);
if (this.listeners == null) this.listeners =  new Array (4);
var length = this.types.length;
var index = length - 1;
while (index >= 0) {
if (this.types[index] != 0) break;
--index;
}
index++;
if (index == length) {
var newTypes =  $_A (length + 4, 0);
System.arraycopy (this.types, 0, newTypes, 0, length);
this.types = newTypes;
var newListeners =  new Array (length + 4);
System.arraycopy (this.listeners, 0, newListeners, 0, length);
this.listeners = newListeners;
}this.types[index] = eventType;
this.listeners[index] = listener;
}, "~N,$wt.widgets.Listener");
$_M (cla$$, "hooks", 
function (eventType) {
if (this.types == null) return false;
for (var i = 0; i < this.types.length; i++) {
if (this.types[i] == eventType) return true;
}
return false;
}, "~N");
$_M (cla$$, "sendEvent", 
function (event) {
if (this.types == null) return ;
this.level += this.level >= 0 ? 1 : -1;
try {
for (var i = 0; i < this.types.length; i++) {
if (event.type == 0) return ;
if (this.types[i] == event.type) {
var listener = this.listeners[i];
if (listener != null) listener.handleEvent (event);
}}
} finally {
var compact = this.level < 0;
this.level -= this.level >= 0 ? 1 : -1;
if (compact && this.level == 0) {
var index = 0;
for (var i = 0; i < this.types.length; i++) {
if (this.types[i] != 0) {
this.types[index] = this.types[i];
this.listeners[index] = this.listeners[i];
index++;
}}
for (var i = index; i < this.types.length; i++) {
this.types[i] = 0;
this.listeners[i] = null;
}
}}
}, "$wt.widgets.Event");
$_M (cla$$, "size", 
function () {
if (this.types == null) return 0;
var count = 0;
for (var i = 0; i < this.types.length; i++) {
if (this.types[i] != 0) count++;
}
return count;
});
$_M (cla$$, "remove", 
function (index) {
if (this.level == 0) {
var end = this.types.length - 1;
System.arraycopy (this.types, index + 1, this.types, index, end - index);
System.arraycopy (this.listeners, index + 1, this.listeners, index, end - index);
index = end;
} else {
if (this.level > 0) this.level = -this.level;
}this.types[index] = 0;
this.listeners[index] = null;
}, "~N");
$_M (cla$$, "unhook", 
function (eventType, listener) {
if (this.types == null) return ;
for (var i = 0; i < this.types.length; i++) {
if (this.types[i] == eventType && this.listeners[i] == listener) {
this.remove (i);
return ;
}}
}, "~N,$wt.widgets.Listener");
$_M (cla$$, "unhook", 
function (eventType, listener) {
if (this.types == null) return ;
for (var i = 0; i < this.types.length; i++) {
if (this.types[i] == eventType) {
if ($_O (this.listeners[i], $wt.widgets.TypedListener)) {
var typedListener = this.listeners[i];
if (typedListener.getEventListener () == listener) {
this.remove (i);
return ;
}}}}
}, "~N,$wt.internal.SWTEventListener");
$_M (cla$$, "releaseResource", 
function () {
if (this.listeners != null) {
for (var i = 0; i < this.listeners.length; i++) {
this.listeners[i] = null;
}
this.listeners = null;
}});
cla$$ = $_C (function () {
this.x = 0;
this.y = 0;
$_Z (this, arguments);
}, $wt.graphics, "Point", null, $wt.internal.SerializableCompatibility);
$_K (cla$$, 
function (x, y) {
this.x = x;
this.y = y;
}, "~N,~N");
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.Point))) return false;
var p = object;
return (p.x == this.x) && (p.y == this.y);
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return this.x ^ this.y;
});
$_V (cla$$, "toString", 
function () {
return "Point {" + this.x + ", " + this.y + "}";
});
$_S (cla$$,
"serialVersionUID", 3257002163938146354);
cla$$ = $_C (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
$_Z (this, arguments);
}, $wt.graphics, "Rectangle", null, $wt.internal.SerializableCompatibility);
$_K (cla$$, 
function (x, y, width, height) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
}, "~N,~N,~N,~N");
$_M (cla$$, "add", 
function (rect) {
var left = this.x < rect.x ? this.x : rect.x;
var top = this.y < rect.y ? this.y : rect.y;
var lhs = this.x + this.width;
var rhs = rect.x + rect.width;
var right = lhs > rhs ? lhs : rhs;
lhs = this.y + this.height;
rhs = rect.y + rect.height;
var bottom = lhs > rhs ? lhs : rhs;
this.x = left;
this.y = top;
this.width = right - left;
this.height = bottom - top;
}, "$wt.graphics.Rectangle");
$_M (cla$$, "contains", 
function (x, y) {
return (x >= this.x) && (y >= this.y) && ((x - this.x) < this.width) && ((y - this.y) < this.height);
}, "~N,~N");
$_M (cla$$, "contains", 
function (pt) {
return this.contains (pt.x, pt.y);
}, "$wt.graphics.Point");
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.Rectangle))) return false;
var r = object;
return (r.x == this.x) && (r.y == this.y) && (r.width == this.width) && (r.height == this.height);
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return this.x ^ this.y ^ this.width ^ this.height;
});
$_M (cla$$, "intersect", 
function (rect) {
if (this == rect) return ;
var left = this.x > rect.x ? this.x : rect.x;
var top = this.y > rect.y ? this.y : rect.y;
var lhs = this.x + this.width;
var rhs = rect.x + rect.width;
var right = lhs < rhs ? lhs : rhs;
lhs = this.y + this.height;
rhs = rect.y + rect.height;
var bottom = lhs < rhs ? lhs : rhs;
this.x = right < left ? 0 : left;
this.y = bottom < top ? 0 : top;
this.width = right < left ? 0 : right - left;
this.height = bottom < top ? 0 : bottom - top;
}, "$wt.graphics.Rectangle");
$_M (cla$$, "intersection", 
function (rect) {
if (this == rect) return  new $wt.graphics.Rectangle (this.x, this.y, this.width, this.height);
var left = this.x > rect.x ? this.x : rect.x;
var top = this.y > rect.y ? this.y : rect.y;
var lhs = this.x + this.width;
var rhs = rect.x + rect.width;
var right = lhs < rhs ? lhs : rhs;
lhs = this.y + this.height;
rhs = rect.y + rect.height;
var bottom = lhs < rhs ? lhs : rhs;
return  new $wt.graphics.Rectangle (right < left ? 0 : left, bottom < top ? 0 : top, right < left ? 0 : right - left, bottom < top ? 0 : bottom - top);
}, "$wt.graphics.Rectangle");
$_M (cla$$, "intersects", 
function (x, y, width, height) {
return (x < this.x + this.width) && (y < this.y + this.height) && (x + width > this.x) && (y + height > this.y);
}, "~N,~N,~N,~N");
$_M (cla$$, "intersects", 
function (rect) {
return rect == this || this.intersects (rect.x, rect.y, rect.width, rect.height);
}, "$wt.graphics.Rectangle");
$_M (cla$$, "isEmpty", 
function () {
return (this.width <= 0) || (this.height <= 0);
});
$_V (cla$$, "toString", 
function () {
return "Rectangle {" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + "}";
});
$_M (cla$$, "union", 
function (rect) {
var left = this.x < rect.x ? this.x : rect.x;
var top = this.y < rect.y ? this.y : rect.y;
var lhs = this.x + this.width;
var rhs = rect.x + rect.width;
var right = lhs > rhs ? lhs : rhs;
lhs = this.y + this.height;
rhs = rect.y + rect.height;
var bottom = lhs > rhs ? lhs : rhs;
return  new $wt.graphics.Rectangle (left, top, right - left, bottom - top);
}, "$wt.graphics.Rectangle");
$_S (cla$$,
"serialVersionUID", 3256439218279428914);
cla$$ = $_C (function () {
this.red = 0;
this.green = 0;
this.blue = 0;
$_Z (this, arguments);
}, $wt.graphics, "RGB", null, $wt.internal.SerializableCompatibility);
$_K (cla$$, 
function (red, green, blue) {
this.red = red;
this.green = green;
this.blue = blue;
}, "~N,~N,~N");
$_V (cla$$, "equals", 
function (object) {
if (object == this) return true;
if (!($_O (object, $wt.graphics.RGB))) return false;
var rgb = object;
return (rgb.red == this.red) && (rgb.green == this.green) && (rgb.blue == this.blue);
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return (this.blue << 16) | (this.green << 8) | this.red;
});
$_V (cla$$, "toString", 
function () {
return "RGB {" + this.red + ", " + this.green + ", " + this.blue + "}";
});
$_S (cla$$,
"serialVersionUID", 3258415023461249074);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, $wt.widgets, "Layout");
$_M (cla$$, "flushCache", 
function (control) {
return false;
}, "$wt.widgets.Control");
cla$$ = $_C (function () {
this.defaultWidth = -1;
this.defaultHeight = -1;
this.currentWhint = 0;
this.currentHhint = 0;
this.currentWidth = -1;
this.currentHeight = -1;
$_Z (this, arguments);
}, $wt.layout, "FillData");
$_M (cla$$, "computeSize", 
function (control, wHint, hHint, flushCache) {
if (flushCache) this.flushCache ();
if (wHint == -1 && hHint == -1) {
if (this.defaultWidth == -1 || this.defaultHeight == -1) {
var size = control.computeSize (wHint, hHint, flushCache);
this.defaultWidth = size.x;
this.defaultHeight = size.y;
}return  new $wt.graphics.Point (this.defaultWidth, this.defaultHeight);
}if (this.currentWidth == -1 || this.currentHeight == -1 || wHint != this.currentWhint || hHint != this.currentHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.currentWhint = wHint;
this.currentHhint = hHint;
this.currentWidth = size.x;
this.currentHeight = size.y;
}return  new $wt.graphics.Point (this.currentWidth, this.currentHeight);
}, "$wt.widgets.Control,~N,~N,~B");
$_M (cla$$, "flushCache", 
function () {
this.defaultWidth = this.defaultHeight = -1;
this.currentWidth = this.currentHeight = -1;
});
cla$$ = $_C (function () {
this.width = -1;
this.height = -1;
this.left = null;
this.right = null;
this.top = null;
this.bottom = null;
this.cacheWidth = -1;
this.cacheHeight = -1;
this.defaultWhint = 0;
this.defaultHhint = 0;
this.defaultWidth = -1;
this.defaultHeight = -1;
this.currentWhint = 0;
this.currentHhint = 0;
this.currentWidth = -1;
this.currentHeight = -1;
this.cacheLeft = null;
this.cacheRight = null;
this.cacheTop = null;
this.cacheBottom = null;
this.isVisited = false;
this.needed = false;
$_Z (this, arguments);
}, $wt.layout, "FormData");
$_K (cla$$, 
function () {
});
$_K (cla$$, 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
$_M (cla$$, "computeSize", 
function (control, wHint, hHint, flushCache) {
if (this.cacheWidth != -1 && this.cacheHeight != -1) return ;
if (wHint == this.width && hHint == this.height) {
if (this.defaultWidth == -1 || this.defaultHeight == -1 || wHint != this.defaultWhint || hHint != this.defaultHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.defaultWhint = wHint;
this.defaultHhint = hHint;
this.defaultWidth = size.x;
this.defaultHeight = size.y;
}this.cacheWidth = this.defaultWidth;
this.cacheHeight = this.defaultHeight;
return ;
}if (this.currentWidth == -1 || this.currentHeight == -1 || wHint != this.currentWhint || hHint != this.currentHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.currentWhint = wHint;
this.currentHhint = hHint;
this.currentWidth = size.x;
this.currentHeight = size.y;
}this.cacheWidth = this.currentWidth;
this.cacheHeight = this.currentHeight;
}, "$wt.widgets.Control,~N,~N,~B");
$_M (cla$$, "flushCache", 
function () {
this.cacheWidth = this.cacheHeight = -1;
this.defaultHeight = this.defaultWidth = -1;
this.currentHeight = this.currentWidth = -1;
});
$_M (cla$$, "getWidth", 
function (control, flushCache) {
this.needed = true;
this.computeSize (control, this.width, this.height, flushCache);
return this.cacheWidth;
}, "$wt.widgets.Control,~B");
$_M (cla$$, "getHeight", 
function (control, flushCache) {
this.computeSize (control, this.width, this.height, flushCache);
return this.cacheHeight;
}, "$wt.widgets.Control,~B");
$_M (cla$$, "getBottomAttachment", 
function (control, spacing, flushCache) {
if (this.cacheBottom != null) return this.cacheBottom;
if (this.isVisited) return this.cacheBottom =  new $wt.layout.FormAttachment (0, this.getHeight (control, flushCache));
if (this.bottom == null) {
if (this.top == null) return this.cacheBottom =  new $wt.layout.FormAttachment (0, this.getHeight (control, flushCache));
return this.cacheBottom = this.getTopAttachment (control, spacing, flushCache).plus (this.getHeight (control, flushCache));
}var bottomControl = this.bottom.control;
if (bottomControl != null) {
if (bottomControl.isDisposed ()) {
this.bottom.control = bottomControl = null;
} else {
if (bottomControl.getParent () != control.getParent ()) {
bottomControl = null;
}}}if (bottomControl == null) return this.cacheBottom = this.bottom;
this.isVisited = true;
var bottomData = bottomControl.getLayoutData ();
var bottomAttachment = bottomData.getBottomAttachment (bottomControl, spacing, flushCache);
switch (this.bottom.alignment) {
case 1024:
this.cacheBottom = bottomAttachment.plus (this.bottom.offset);
break;
case 16777216:
{
var topAttachment = bottomData.getTopAttachment (bottomControl, spacing, flushCache);
var bottomHeight = bottomAttachment.minus (topAttachment);
this.cacheBottom = bottomAttachment.minus (bottomHeight.minus (this.getHeight (control, flushCache)).divide (2));
break;
}default:
{
var topAttachment = bottomData.getTopAttachment (bottomControl, spacing, flushCache);
this.cacheBottom = topAttachment.plus (this.bottom.offset - spacing);
break;
}}
this.isVisited = false;
return this.cacheBottom;
}, "$wt.widgets.Control,~N,~B");
$_M (cla$$, "getLeftAttachment", 
function (control, spacing, flushCache) {
if (this.cacheLeft != null) return this.cacheLeft;
if (this.isVisited) return this.cacheLeft =  new $wt.layout.FormAttachment (0, 0);
if (this.left == null) {
if (this.right == null) return this.cacheLeft =  new $wt.layout.FormAttachment (0, 0);
return this.cacheLeft = this.getRightAttachment (control, spacing, flushCache).minus (this.getWidth (control, flushCache));
}var leftControl = this.left.control;
if (leftControl != null) {
if (leftControl.isDisposed ()) {
this.left.control = leftControl = null;
} else {
if (leftControl.getParent () != control.getParent ()) {
leftControl = null;
}}}if (leftControl == null) return this.cacheLeft = this.left;
this.isVisited = true;
var leftData = leftControl.getLayoutData ();
var leftAttachment = leftData.getLeftAttachment (leftControl, spacing, flushCache);
switch (this.left.alignment) {
case 16384:
this.cacheLeft = leftAttachment.plus (this.left.offset);
break;
case 16777216:
{
var rightAttachment = leftData.getRightAttachment (leftControl, spacing, flushCache);
var leftWidth = rightAttachment.minus (leftAttachment);
this.cacheLeft = leftAttachment.plus (leftWidth.minus (this.getWidth (control, flushCache)).divide (2));
break;
}default:
{
var rightAttachment = leftData.getRightAttachment (leftControl, spacing, flushCache);
this.cacheLeft = rightAttachment.plus (this.left.offset + spacing);
}}
this.isVisited = false;
return this.cacheLeft;
}, "$wt.widgets.Control,~N,~B");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_M (cla$$, "getRightAttachment", 
function (control, spacing, flushCache) {
if (this.cacheRight != null) return this.cacheRight;
if (this.isVisited) return this.cacheRight =  new $wt.layout.FormAttachment (0, this.getWidth (control, flushCache));
if (this.right == null) {
if (this.left == null) return this.cacheRight =  new $wt.layout.FormAttachment (0, this.getWidth (control, flushCache));
return this.cacheRight = this.getLeftAttachment (control, spacing, flushCache).plus (this.getWidth (control, flushCache));
}var rightControl = this.right.control;
if (rightControl != null) {
if (rightControl.isDisposed ()) {
this.right.control = rightControl = null;
} else {
if (rightControl.getParent () != control.getParent ()) {
rightControl = null;
}}}if (rightControl == null) return this.cacheRight = this.right;
this.isVisited = true;
var rightData = rightControl.getLayoutData ();
var rightAttachment = rightData.getRightAttachment (rightControl, spacing, flushCache);
switch (this.right.alignment) {
case 131072:
this.cacheRight = rightAttachment.plus (this.right.offset);
break;
case 16777216:
{
var leftAttachment = rightData.getLeftAttachment (rightControl, spacing, flushCache);
var rightWidth = rightAttachment.minus (leftAttachment);
this.cacheRight = rightAttachment.minus (rightWidth.minus (this.getWidth (control, flushCache)).divide (2));
break;
}default:
{
var leftAttachment = rightData.getLeftAttachment (rightControl, spacing, flushCache);
this.cacheRight = leftAttachment.plus (this.right.offset - spacing);
break;
}}
this.isVisited = false;
return this.cacheRight;
}, "$wt.widgets.Control,~N,~B");
$_M (cla$$, "getTopAttachment", 
function (control, spacing, flushCache) {
if (this.cacheTop != null) return this.cacheTop;
if (this.isVisited) return this.cacheTop =  new $wt.layout.FormAttachment (0, 0);
if (this.top == null) {
if (this.bottom == null) return this.cacheTop =  new $wt.layout.FormAttachment (0, 0);
return this.cacheTop = this.getBottomAttachment (control, spacing, flushCache).minus (this.getHeight (control, flushCache));
}var topControl = this.top.control;
if (topControl != null) {
if (topControl.isDisposed ()) {
this.top.control = topControl = null;
} else {
if (topControl.getParent () != control.getParent ()) {
topControl = null;
}}}if (topControl == null) return this.cacheTop = this.top;
this.isVisited = true;
var topData = topControl.getLayoutData ();
var topAttachment = topData.getTopAttachment (topControl, spacing, flushCache);
switch (this.top.alignment) {
case 128:
this.cacheTop = topAttachment.plus (this.top.offset);
break;
case 16777216:
{
var bottomAttachment = topData.getBottomAttachment (topControl, spacing, flushCache);
var topHeight = bottomAttachment.minus (topAttachment);
this.cacheTop = topAttachment.plus (topHeight.minus (this.getHeight (control, flushCache)).divide (2));
break;
}default:
{
var bottomAttachment = topData.getBottomAttachment (topControl, spacing, flushCache);
this.cacheTop = bottomAttachment.plus (this.top.offset + spacing);
break;
}}
this.isVisited = false;
return this.cacheTop;
}, "$wt.widgets.Control,~N,~B");
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
if (this.width != -1) string += "width=" + this.width + " ";
if (this.height != -1) string += "height=" + this.height + " ";
if (this.left != null) string += "left=" + this.left + " ";
if (this.right != null) string += "right=" + this.right + " ";
if (this.top != null) string += "top=" + this.top + " ";
if (this.bottom != null) string += "bottom=" + this.bottom + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.verticalAlignment = 2;
this.horizontalAlignment = 1;
this.widthHint = -1;
this.heightHint = -1;
this.horizontalIndent = 0;
this.verticalIndent = 0;
this.horizontalSpan = 1;
this.verticalSpan = 1;
this.grabExcessHorizontalSpace = false;
this.grabExcessVerticalSpace = false;
this.minimumWidth = 0;
this.minimumHeight = 0;
this.exclude = false;
this.cacheWidth = -1;
this.cacheHeight = -1;
this.defaultWhint = 0;
this.defaultHhint = 0;
this.defaultWidth = -1;
this.defaultHeight = -1;
this.currentWhint = 0;
this.currentHhint = 0;
this.currentWidth = -1;
this.currentHeight = -1;
$_Z (this, arguments);
}, $wt.layout, "GridData");
$_K (cla$$, 
function () {
});
$_K (cla$$, 
function (style) {
if ((style & 2) != 0) this.verticalAlignment = 1;
if ((style & 4) != 0) this.verticalAlignment = 2;
if ((style & 16) != 0) this.verticalAlignment = 4;
if ((style & 8) != 0) this.verticalAlignment = 3;
if ((style & 32) != 0) this.horizontalAlignment = 1;
if ((style & 64) != 0) this.horizontalAlignment = 2;
if ((style & 256) != 0) this.horizontalAlignment = 4;
if ((style & 128) != 0) this.horizontalAlignment = 3;
this.grabExcessHorizontalSpace = (style & 512) != 0;
this.grabExcessVerticalSpace = (style & 1024) != 0;
}, "~N");
$_K (cla$$, 
function (horizontalAlignment, verticalAlignment, grabExcessHorizontalSpace, grabExcessVerticalSpace) {
this.construct (horizontalAlignment, verticalAlignment, grabExcessHorizontalSpace, grabExcessVerticalSpace, 1, 1);
}, "~N,~N,~B,~B");
$_K (cla$$, 
function (horizontalAlignment, verticalAlignment, grabExcessHorizontalSpace, grabExcessVerticalSpace, horizontalSpan, verticalSpan) {
this.horizontalAlignment = horizontalAlignment;
this.verticalAlignment = verticalAlignment;
this.grabExcessHorizontalSpace = grabExcessHorizontalSpace;
this.grabExcessVerticalSpace = grabExcessVerticalSpace;
this.horizontalSpan = horizontalSpan;
this.verticalSpan = verticalSpan;
}, "~N,~N,~B,~B,~N,~N");
$_K (cla$$, 
function (width, height) {
this.widthHint = width;
this.heightHint = height;
}, "~N,~N");
$_M (cla$$, "computeSize", 
function (control, wHint, hHint, flushCache) {
if (this.cacheWidth != -1 && this.cacheHeight != -1) return ;
if (wHint == this.widthHint && hHint == this.heightHint) {
if (this.defaultWidth == -1 || this.defaultHeight == -1 || wHint != this.defaultWhint || hHint != this.defaultHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.defaultWhint = wHint;
this.defaultHhint = hHint;
this.defaultWidth = size.x;
this.defaultHeight = size.y;
}this.cacheWidth = this.defaultWidth;
this.cacheHeight = this.defaultHeight;
return ;
}if (this.currentWidth == -1 || this.currentHeight == -1 || wHint != this.currentWhint || hHint != this.currentHhint) {
var size = control.computeSize (wHint, hHint, flushCache);
this.currentWhint = wHint;
this.currentHhint = hHint;
this.currentWidth = size.x;
this.currentHeight = size.y;
}this.cacheWidth = this.currentWidth;
this.cacheHeight = this.currentHeight;
}, "$wt.widgets.Control,~N,~N,~B");
$_M (cla$$, "flushCache", 
function () {
this.cacheWidth = this.cacheHeight = -1;
this.defaultWidth = this.defaultHeight = -1;
this.currentWidth = this.currentHeight = -1;
});
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
var hAlign = "";
switch (this.horizontalAlignment) {
case 4:
hAlign = "SWT.FILL";
break;
case 1:
hAlign = "SWT.BEGINNING";
break;
case 16384:
hAlign = "SWT.LEFT";
break;
case 16777224:
hAlign = "SWT.END";
break;
case 3:
hAlign = "GridData.END";
break;
case 131072:
hAlign = "SWT.RIGHT";
break;
case 16777216:
hAlign = "SWT.CENTER";
break;
case 2:
hAlign = "GridData.CENTER";
break;
default:
hAlign = "Undefined " + this.horizontalAlignment;
break;
}
var vAlign = "";
switch (this.verticalAlignment) {
case 4:
vAlign = "SWT.FILL";
break;
case 1:
vAlign = "SWT.BEGINNING";
break;
case 128:
vAlign = "SWT.TOP";
break;
case 16777224:
vAlign = "SWT.END";
break;
case 3:
vAlign = "GridData.END";
break;
case 1024:
vAlign = "SWT.BOTTOM";
break;
case 16777216:
vAlign = "SWT.CENTER";
break;
case 2:
vAlign = "GridData.CENTER";
break;
default:
vAlign = "Undefined " + this.verticalAlignment;
break;
}
var string = this.getName () + " {";
string += "horizontalAlignment=" + hAlign + " ";
if (this.horizontalIndent != 0) string += "horizontalIndent=" + this.horizontalIndent + " ";
if (this.horizontalSpan != 1) string += "horizontalSpan=" + this.horizontalSpan + " ";
if (this.grabExcessHorizontalSpace) string += "grabExcessHorizontalSpace=" + this.grabExcessHorizontalSpace + " ";
if (this.widthHint != -1) string += "widthHint=" + this.widthHint + " ";
if (this.minimumWidth != 0) string += "minimumWidth=" + this.minimumWidth + " ";
string += "verticalAlignment=" + vAlign + " ";
if (this.verticalIndent != 0) string += "verticalIndent=" + this.verticalIndent + " ";
if (this.verticalSpan != 1) string += "verticalSpan=" + this.verticalSpan + " ";
if (this.grabExcessVerticalSpace) string += "grabExcessVerticalSpace=" + this.grabExcessVerticalSpace + " ";
if (this.heightHint != -1) string += "heightHint=" + this.heightHint + " ";
if (this.minimumHeight != 0) string += "minimumHeight=" + this.minimumHeight + " ";
if (this.exclude) string += "exclude=" + this.exclude + " ";
string = string.trim ();
string += "}";
return string;
});
$_S (cla$$,
"BEGINNING", 1,
"CENTER", 2,
"END", 3,
"FILL", 4,
"VERTICAL_ALIGN_BEGINNING", 2,
"VERTICAL_ALIGN_CENTER", 4,
"VERTICAL_ALIGN_END", 8,
"VERTICAL_ALIGN_FILL", 16,
"HORIZONTAL_ALIGN_BEGINNING", 32,
"HORIZONTAL_ALIGN_CENTER", 64,
"HORIZONTAL_ALIGN_END", 128,
"HORIZONTAL_ALIGN_FILL", 256,
"GRAB_HORIZONTAL", 512,
"GRAB_VERTICAL", 1024,
"FILL_VERTICAL", 1040,
"FILL_HORIZONTAL", 768,
"FILL_BOTH", 1808);
cla$$ = $_C (function () {
this.width = -1;
this.height = -1;
this.exclude = false;
$_Z (this, arguments);
}, $wt.layout, "RowData");
$_K (cla$$, 
function () {
});
$_K (cla$$, 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
$_K (cla$$, 
function (point) {
this.construct (point.x, point.y);
}, "$wt.graphics.Point");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
if (this.width != -1) string += "width=" + this.width + " ";
if (this.height != -1) string += "height=" + this.height + " ";
if (this.exclude) string += "exclude=" + this.exclude + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.numerator = 0;
this.denominator = 100;
this.offset = 0;
this.control = null;
this.alignment = 0;
$_Z (this, arguments);
}, $wt.layout, "FormAttachment");
$_K (cla$$, 
function () {
});
$_K (cla$$, 
function (numerator) {
this.construct (numerator, 100, 0);
}, "~N");
$_K (cla$$, 
function (numerator, offset) {
this.construct (numerator, 100, offset);
}, "~N,~N");
$_K (cla$$, 
function (numerator, denominator, offset) {
this.numerator = numerator;
this.denominator = denominator;
this.offset = offset;
}, "~N,~N,~N");
$_K (cla$$, 
function (control) {
this.construct (control, 0, -1);
}, "$wt.widgets.Control");
$_K (cla$$, 
function (control, offset) {
this.construct (control, offset, -1);
}, "$wt.widgets.Control,~N");
$_K (cla$$, 
function (control, offset, alignment) {
this.control = control;
this.offset = offset;
this.alignment = alignment;
}, "$wt.widgets.Control,~N,~N");
$_M (cla$$, "divide", 
function (value) {
return  new $wt.layout.FormAttachment (this.numerator, this.denominator * value, Math.floor (this.offset / value));
}, "~N");
$_M (cla$$, "gcd", 
function (m, n) {
var temp;
m = Math.abs (m);
n = Math.abs (n);
if (m < n) {
temp = m;
m = n;
n = temp;
}while (n != 0) {
temp = m;
m = n;
n = temp % n;
}
return m;
}, "~N,~N");
$_M (cla$$, "minus", 
function (attachment) {
var solution =  new $wt.layout.FormAttachment ();
solution.numerator = this.numerator * attachment.denominator - this.denominator * attachment.numerator;
solution.denominator = this.denominator * attachment.denominator;
var gcd = this.gcd (solution.denominator, solution.numerator);
solution.numerator = Math.floor (solution.numerator / gcd);
solution.denominator = Math.floor (solution.denominator / gcd);
solution.offset = this.offset - attachment.offset;
return solution;
}, "$wt.layout.FormAttachment");
$_M (cla$$, "minus", 
function (value) {
return  new $wt.layout.FormAttachment (this.numerator, this.denominator, this.offset - value);
}, "~N");
$_M (cla$$, "plus", 
function (attachment) {
var solution =  new $wt.layout.FormAttachment ();
solution.numerator = this.numerator * attachment.denominator + this.denominator * attachment.numerator;
solution.denominator = this.denominator * attachment.denominator;
var gcd = this.gcd (solution.denominator, solution.numerator);
solution.numerator = Math.floor (solution.numerator / gcd);
solution.denominator = Math.floor (solution.denominator / gcd);
solution.offset = this.offset + attachment.offset;
return solution;
}, "$wt.layout.FormAttachment");
$_M (cla$$, "plus", 
function (value) {
return  new $wt.layout.FormAttachment (this.numerator, this.denominator, this.offset + value);
}, "~N");
$_M (cla$$, "solveX", 
function (value) {
return (Math.floor ((this.numerator * value) / this.denominator)) + this.offset;
}, "~N");
$_M (cla$$, "solveY", 
function (value) {
return Math.floor ((value - this.offset) * this.denominator / this.numerator);
}, "~N");
$_V (cla$$, "toString", 
function () {
var string = this.control != null ? this.control.toString () : this.numerator + "/" + this.denominator;
return "{y = (" + string + (this.offset >= 0 ? ")x + " + this.offset : ")x - " + (-this.offset)) + "}";
});
cla$$ = $_C (function () {
this.type = 256;
this.marginWidth = 0;
this.marginHeight = 0;
this.spacing = 0;
$_Z (this, arguments);
}, $wt.layout, "FillLayout", $wt.widgets.Layout);
$_K (cla$$, 
function () {
$_R (this, $wt.layout.FillLayout, []);
});
$_K (cla$$, 
function (type) {
$_R (this, $wt.layout.FillLayout, []);
this.type = type;
}, "~N");
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var children = composite.getChildren ();
var count = children.length;
var maxWidth = 0;
var maxHeight = 0;
for (var i = 0; i < count; i++) {
var child = children[i];
var w = wHint;
var h = hHint;
if (count > 0) {
if (this.type == 256 && wHint != -1) {
w = Math.max (0, Math.floor ((wHint - (count - 1) * this.spacing) / count));
}if (this.type == 512 && hHint != -1) {
h = Math.max (0, Math.floor ((hHint - (count - 1) * this.spacing) / count));
}}var size = this.computeChildSize (child, w, h, flushCache);
maxWidth = Math.max (maxWidth, size.x);
maxHeight = Math.max (maxHeight, size.y);
}
var width = 0;
var height = 0;
if (this.type == 256) {
width = count * maxWidth;
if (count != 0) width += (count - 1) * this.spacing;
height = maxHeight;
} else {
width = maxWidth;
height = count * maxHeight;
if (count != 0) height += (count - 1) * this.spacing;
}width += this.marginWidth * 2;
height += this.marginHeight * 2;
if (wHint != -1) width = wHint;
if (hHint != -1) height = hHint;
return  new $wt.graphics.Point (width, height);
}, "$wt.widgets.Composite,~N,~N,~B");
$_M (cla$$, "computeChildSize", 
function (control, wHint, hHint, flushCache) {
var data = control.getLayoutData ();
if (data == null) {
data =  new $wt.layout.FillData ();
control.setLayoutData (data);
}var size = null;
if (wHint == -1 && hHint == -1) {
size = data.computeSize (control, wHint, hHint, flushCache);
} else {
var trimX;
var trimY;
if ($_O (control, $wt.widgets.Scrollable)) {
var rect = (control).computeTrim (0, 0, 0, 0);
trimX = rect.width;
trimY = rect.height;
} else {
trimX = trimY = control.getBorderWidth () * 2;
}var w = wHint == -1 ? wHint : Math.max (0, wHint - trimX);
var h = hHint == -1 ? hHint : Math.max (0, hHint - trimY);
size = data.computeSize (control, w, h, flushCache);
}return size;
}, "$wt.widgets.Control,~N,~N,~B");
$_V (cla$$, "flushCache", 
function (control) {
var data = control.getLayoutData ();
if (data != null) (data).flushCache ();
return true;
}, "$wt.widgets.Control");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "layout", 
function (composite, flushCache) {
var rect = composite.getClientArea ();
var children = composite.getChildren ();
var count = children.length;
if (count == 0) return ;
var width = rect.width - this.marginWidth * 2;
var height = rect.height - this.marginHeight * 2;
if (this.type == 256) {
width -= (count - 1) * this.spacing;
var x = rect.x + this.marginWidth;
var extra = width % count;
var y = rect.y + this.marginHeight;
var cellWidth = Math.floor (width / count);
for (var i = 0; i < count; i++) {
var child = children[i];
var childWidth = cellWidth;
if (i == 0) {
childWidth += Math.floor (extra / 2);
} else {
if (i == count - 1) childWidth += Math.floor ((extra + 1) / 2);
}child.setBounds (x, y, childWidth, height);
x += childWidth + this.spacing;
}
} else {
height -= (count - 1) * this.spacing;
var x = rect.x + this.marginWidth;
var cellHeight = Math.floor (height / count);
var y = rect.y + this.marginHeight;
var extra = height % count;
for (var i = 0; i < count; i++) {
var child = children[i];
var childHeight = cellHeight;
if (i == 0) {
childHeight += Math.floor (extra / 2);
} else {
if (i == count - 1) childHeight += Math.floor ((extra + 1) / 2);
}child.setBounds (x, y, width, childHeight);
y += childHeight + this.spacing;
}
}}, "$wt.widgets.Composite,~B");
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
string += "type=" + ((this.type == 512) ? "SWT.VERTICAL" : "SWT.HORIZONTAL") + " ";
if (this.marginWidth != 0) string += "marginWidth=" + this.marginWidth + " ";
if (this.marginHeight != 0) string += "marginHeight=" + this.marginHeight + " ";
if (this.spacing != 0) string += "spacing=" + this.spacing + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.marginWidth = 0;
this.marginHeight = 0;
this.marginLeft = 0;
this.marginTop = 0;
this.marginRight = 0;
this.marginBottom = 0;
this.spacing = 0;
$_Z (this, arguments);
}, $wt.layout, "FormLayout", $wt.widgets.Layout);
$_K (cla$$, 
function () {
$_R (this, $wt.layout.FormLayout, []);
});
$_M (cla$$, "computeHeight", 
function (control, data, flushCache) {
var top = data.getTopAttachment (control, this.spacing, flushCache);
var bottom = data.getBottomAttachment (control, this.spacing, flushCache);
var height = bottom.minus (top);
if (height.numerator == 0) {
if (bottom.numerator == 0) return bottom.offset;
if (bottom.numerator == bottom.denominator) return -top.offset;
if (bottom.offset <= 0) {
return Math.floor (-top.offset * top.denominator / bottom.numerator);
}var divider = bottom.denominator - bottom.numerator;
return Math.floor (bottom.denominator * bottom.offset / divider);
}return height.solveY (data.getHeight (control, flushCache));
}, "$wt.widgets.Control,$wt.layout.FormData,~B");
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var size = this.layout (composite, false, 0, 0, wHint, hHint, flushCache);
if (wHint != -1) size.x = wHint;
if (hHint != -1) size.y = hHint;
return size;
}, "$wt.widgets.Composite,~N,~N,~B");
$_V (cla$$, "flushCache", 
function (control) {
var data = control.getLayoutData ();
if (data != null) (data).flushCache ();
return true;
}, "$wt.widgets.Control");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_M (cla$$, "computeWidth", 
function (control, data, flushCache) {
var left = data.getLeftAttachment (control, this.spacing, flushCache);
var right = data.getRightAttachment (control, this.spacing, flushCache);
var width = right.minus (left);
if (width.numerator == 0) {
if (right.numerator == 0) return right.offset;
if (right.numerator == right.denominator) return -left.offset;
if (right.offset <= 0) {
return Math.floor (-left.offset * left.denominator / left.numerator);
}var divider = right.denominator - right.numerator;
return Math.floor (right.denominator * right.offset / divider);
}return width.solveY (data.getWidth (control, flushCache));
}, "$wt.widgets.Control,$wt.layout.FormData,~B");
$_M (cla$$, "layout", 
function (composite, flushCache) {
var rect = composite.getClientArea ();
var x = rect.x + this.marginLeft + this.marginWidth;
var y = rect.y + this.marginTop + this.marginHeight;
var width = Math.max (0, rect.width - this.marginLeft - 2 * this.marginWidth - this.marginRight);
var height = Math.max (0, rect.height - this.marginLeft - 2 * this.marginHeight - this.marginBottom);
this.layout (composite, true, x, y, width, height, flushCache);
}, "$wt.widgets.Composite,~B");
$_M (cla$$, "layout", 
function (composite, move, x, y, width, height, flushCache) {
var children = composite.getChildren ();
for (var i = 0; i < children.length; i++) {
var child = children[i];
var data = child.getLayoutData ();
if (data == null) child.setLayoutData (data =  new $wt.layout.FormData ());
if (flushCache) data.flushCache ();
data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
}
var flush = null;
var bounds = null;
var w = 0;
var h = 0;
for (var i = 0; i < children.length; i++) {
var child = children[i];
var data = child.getLayoutData ();
if (width != -1) {
data.needed = false;
var left = data.getLeftAttachment (child, this.spacing, flushCache);
var right = data.getRightAttachment (child, this.spacing, flushCache);
var x1 = left.solveX (width);
var x2 = right.solveX (width);
if (data.height == -1 && !data.needed) {
var trim = 0;
if ($_O (child, $wt.widgets.Scrollable)) {
var rect = (child).computeTrim (0, 0, 0, 0);
trim = rect.width;
} else {
trim = child.getBorderWidth () * 2;
}data.cacheWidth = data.cacheHeight = -1;
var currentWidth = Math.max (0, x2 - x1 - trim);
data.computeSize (child, currentWidth, data.height, flushCache);
if (flush == null) flush =  $_A (children.length, false);
flush[i] = true;
}w = Math.max (x2, w);
if (move) {
if (bounds == null) bounds =  new Array (children.length);
bounds[i] =  new $wt.graphics.Rectangle (0, 0, 0, 0);
bounds[i].x = x + x1;
bounds[i].width = x2 - x1;
}} else {
w = Math.max (this.computeWidth (child, data, flushCache), w);
}}
for (var i = 0; i < children.length; i++) {
var child = children[i];
var data = child.getLayoutData ();
if (height != -1) {
var y1 = data.getTopAttachment (child, this.spacing, flushCache).solveX (height);
var y2 = data.getBottomAttachment (child, this.spacing, flushCache).solveX (height);
h = Math.max (y2, h);
if (move) {
bounds[i].y = y + y1;
bounds[i].height = y2 - y1;
}} else {
h = Math.max (this.computeHeight (child, data, flushCache), h);
}}
for (var i = 0; i < children.length; i++) {
var child = children[i];
var data = child.getLayoutData ();
if (flush != null && flush[i]) data.cacheWidth = data.cacheHeight = -1;
data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
}
if (move) {
for (var i = 0; i < children.length; i++) {
children[i].setBounds (bounds[i]);
}
}w += this.marginLeft + this.marginWidth * 2 + this.marginRight;
h += this.marginTop + this.marginHeight * 2 + this.marginBottom;
return  new $wt.graphics.Point (w, h);
}, "$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
if (this.marginWidth != 0) string += "marginWidth=" + this.marginWidth + " ";
if (this.marginHeight != 0) string += "marginHeight=" + this.marginHeight + " ";
if (this.marginLeft != 0) string += "marginLeft=" + this.marginLeft + " ";
if (this.marginRight != 0) string += "marginRight=" + this.marginRight + " ";
if (this.marginTop != 0) string += "marginTop=" + this.marginTop + " ";
if (this.marginBottom != 0) string += "marginBottom=" + this.marginBottom + " ";
if (this.spacing != 0) string += "spacing=" + this.spacing + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.numColumns = 1;
this.makeColumnsEqualWidth = false;
this.marginWidth = 5;
this.marginHeight = 5;
this.marginLeft = 0;
this.marginTop = 0;
this.marginRight = 0;
this.marginBottom = 0;
this.horizontalSpacing = 5;
this.verticalSpacing = 5;
$_Z (this, arguments);
}, $wt.layout, "GridLayout", $wt.widgets.Layout);
$_K (cla$$, 
function () {
$_R (this, $wt.layout.GridLayout, []);
});
$_K (cla$$, 
function (numColumns, makeColumnsEqualWidth) {
$_R (this, $wt.layout.GridLayout, []);
this.numColumns = numColumns;
this.makeColumnsEqualWidth = makeColumnsEqualWidth;
}, "~N,~B");
$_V (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var size = this.layout (composite, false, 0, 0, wHint, hHint, flushCache);
if (wHint != -1) size.x = wHint;
if (hHint != -1) size.y = hHint;
return size;
}, "$wt.widgets.Composite,~N,~N,~B");
$_V (cla$$, "flushCache", 
function (control) {
var data = control.getLayoutData ();
if (data != null) (data).flushCache ();
return true;
}, "$wt.widgets.Control");
$_M (cla$$, "getData", 
function (grid, row, column, rowCount, columnCount, first) {
var control = grid[row][column];
if (control != null) {
var data = control.getLayoutData ();
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
var vSpan = Math.max (1, data.verticalSpan);
var i = first ? row + vSpan - 1 : row - vSpan + 1;
var j = first ? column + hSpan - 1 : column - hSpan + 1;
if (0 <= i && i < rowCount) {
if (0 <= j && j < columnCount) {
if (control == grid[i][j]) return data;
}}}return null;
}, "Array,~N,~N,~N,~N,~B");
$_M (cla$$, "layout", 
function (composite, flushCache) {
var rect = composite.getClientArea ();
this.layout (composite, true, rect.x, rect.y, rect.width, rect.height, flushCache);
}, "$wt.widgets.Composite,~B");
$_M (cla$$, "layout", 
function (composite, move, x, y, width, height, flushCache) {
if (this.numColumns < 1) {
return  new $wt.graphics.Point (this.marginLeft + this.marginWidth * 2 + this.marginRight, this.marginTop + this.marginHeight * 2 + this.marginBottom);
}var count = 0;
var children = composite.getChildren ();
for (var i = 0; i < children.length; i++) {
var control = children[i];
var data = control.getLayoutData ();
if (data == null || !data.exclude) {
children[count++] = children[i];
}}
for (var i = 0; i < count; i++) {
var child = children[i];
var data = child.getLayoutData ();
if (data == null) child.setLayoutData (data =  new $wt.layout.GridData ());
if (flushCache) data.flushCache ();
data.computeSize (child, data.widthHint, data.heightHint, flushCache);
if (data.grabExcessHorizontalSpace && data.minimumWidth > 0) {
if (data.cacheWidth < data.minimumWidth) {
var trim = 0;
if ($_O (child, $wt.widgets.Scrollable)) {
var rect = (child).computeTrim (0, 0, 0, 0);
trim = rect.width;
} else {
trim = child.getBorderWidth () * 2;
}data.cacheWidth = data.cacheHeight = -1;
data.computeSize (child, Math.max (0, data.minimumWidth - trim), data.heightHint, false);
}}if (data.grabExcessVerticalSpace && data.minimumHeight > 0) {
data.cacheHeight = Math.max (data.cacheHeight, data.minimumHeight);
}}
var row = 0;
var column = 0;
var rowCount = 0;
var columnCount = this.numColumns;
var grid =  $_A (4, columnCount, null);
for (var i = 0; i < count; i++) {
var child = children[i];
var data = child.getLayoutData ();
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
var vSpan = Math.max (1, data.verticalSpan);
while (true) {
var lastRow = row + vSpan;
if (lastRow >= grid.length) {
var newGrid =  $_A (lastRow + 4, columnCount, null);
System.arraycopy (grid, 0, newGrid, 0, grid.length);
grid = newGrid;
}if (grid[row] == null) {
grid[row] =  new Array (columnCount);
}while (column < columnCount && grid[row][column] != null) {
column++;
}
var endCount = column + hSpan;
if (endCount <= columnCount) {
var index = column;
while (index < endCount && grid[row][index] == null) {
index++;
}
if (index == endCount) break;
column = index;
}if (column + hSpan >= columnCount) {
column = 0;
row++;
}}
for (var j = 0; j < vSpan; j++) {
if (grid[row + j] == null) {
grid[row + j] =  new Array (columnCount);
}for (var k = 0; k < hSpan; k++) {
grid[row + j][column + k] = child;
}
}
rowCount = Math.max (rowCount, row + vSpan);
column += hSpan;
}
var availableWidth = width - this.horizontalSpacing * (columnCount - 1) - (this.marginLeft + this.marginWidth * 2 + this.marginRight);
var expandCount = 0;
var widths =  $_A (columnCount, 0);
var minWidths =  $_A (columnCount, 0);
var expandColumn =  $_A (columnCount, false);
for (var j = 0; j < columnCount; j++) {
for (var i = 0; i < rowCount; i++) {
var data = this.getData (grid, i, j, rowCount, columnCount, true);
if (data != null) {
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
if (hSpan == 1) {
var w = data.cacheWidth + data.horizontalIndent;
widths[j] = Math.max (widths[j], w);
if (data.grabExcessHorizontalSpace) {
if (!expandColumn[j]) expandCount++;
expandColumn[j] = true;
}if (!data.grabExcessHorizontalSpace || data.minimumWidth != 0) {
w = !data.grabExcessHorizontalSpace || data.minimumWidth == -1 ? data.cacheWidth : data.minimumWidth;
w += data.horizontalIndent;
minWidths[j] = Math.max (minWidths[j], w);
}}}}
for (var i = 0; i < rowCount; i++) {
var data = this.getData (grid, i, j, rowCount, columnCount, false);
if (data != null) {
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
if (hSpan > 1) {
var spanWidth = 0;
var spanMinWidth = 0;
var spanExpandCount = 0;
for (var k = 0; k < hSpan; k++) {
spanWidth += widths[j - k];
spanMinWidth += minWidths[j - k];
if (expandColumn[j - k]) spanExpandCount++;
}
if (data.grabExcessHorizontalSpace && spanExpandCount == 0) {
expandCount++;
expandColumn[j] = true;
}var w = data.cacheWidth + data.horizontalIndent - spanWidth - (hSpan - 1) * this.horizontalSpacing;
if (w > 0) {
if (spanExpandCount == 0) {
widths[j] += w;
} else {
var delta = Math.floor (w / spanExpandCount);
var remainder = w % spanExpandCount;
var last = -1;
for (var k = 0; k < hSpan; k++) {
if (expandColumn[j - k]) {
widths[last = j - k] += delta;
}}
if (last > -1) widths[last] += remainder;
}}if (!data.grabExcessHorizontalSpace || data.minimumWidth != 0) {
w = !data.grabExcessHorizontalSpace || data.minimumWidth == -1 ? data.cacheWidth : data.minimumWidth;
w += data.horizontalIndent - spanMinWidth - (hSpan - 1) * this.horizontalSpacing;
if (w > 0) {
if (spanExpandCount == 0) {
minWidths[j] += w;
} else {
var delta = Math.floor (w / spanExpandCount);
var remainder = w % spanExpandCount;
var last = -1;
for (var k = 0; k < hSpan; k++) {
if (expandColumn[j - k]) {
minWidths[last = j - k] += delta;
}}
if (last > -1) minWidths[last] += remainder;
}}}}}}
}
if (this.makeColumnsEqualWidth) {
var minColumnWidth = 0;
var columnWidth = 0;
for (var i = 0; i < columnCount; i++) {
minColumnWidth = Math.max (minColumnWidth, minWidths[i]);
columnWidth = Math.max (columnWidth, widths[i]);
}
columnWidth = width == -1 || expandCount == 0 ? columnWidth : Math.max (minColumnWidth, Math.floor (availableWidth / columnCount));
for (var i = 0; i < columnCount; i++) {
expandColumn[i] = expandCount > 0;
widths[i] = columnWidth;
}
} else {
if (width != -1 && expandCount > 0) {
var totalWidth = 0;
for (var i = 0; i < columnCount; i++) {
totalWidth += widths[i];
}
var c = expandCount;
var delta = Math.floor ((availableWidth - totalWidth) / c);
var remainder = (availableWidth - totalWidth) % c;
var last = -1;
while (totalWidth != availableWidth) {
for (var j = 0; j < columnCount; j++) {
if (expandColumn[j]) {
if (widths[j] + delta > minWidths[j]) {
widths[last = j] = widths[j] + delta;
} else {
widths[j] = minWidths[j];
expandColumn[j] = false;
c--;
}}}
if (last > -1) widths[last] += remainder;
for (var j = 0; j < columnCount; j++) {
for (var i = 0; i < rowCount; i++) {
var data = this.getData (grid, i, j, rowCount, columnCount, false);
if (data != null) {
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
if (hSpan > 1) {
if (!data.grabExcessHorizontalSpace || data.minimumWidth != 0) {
var spanWidth = 0;
var spanExpandCount = 0;
for (var k = 0; k < hSpan; k++) {
spanWidth += widths[j - k];
if (expandColumn[j - k]) spanExpandCount++;
}
var w = !data.grabExcessHorizontalSpace || data.minimumWidth == -1 ? data.cacheWidth : data.minimumWidth;
w += data.horizontalIndent - spanWidth - (hSpan - 1) * this.horizontalSpacing;
if (w > 0) {
if (spanExpandCount == 0) {
widths[j] += w;
} else {
var delta2 = Math.floor (w / spanExpandCount);
var remainder2 = w % spanExpandCount;
var last2 = -1;
for (var k = 0; k < hSpan; k++) {
if (expandColumn[j - k]) {
widths[last2 = j - k] += delta2;
}}
if (last2 > -1) widths[last2] += remainder2;
}}}}}}
}
if (c == 0) break;
totalWidth = 0;
for (var i = 0; i < columnCount; i++) {
totalWidth += widths[i];
}
delta = Math.floor ((availableWidth - totalWidth) / c);
remainder = (availableWidth - totalWidth) % c;
last = -1;
}
}}var flush = null;
var flushLength = 0;
if (width != -1) {
for (var j = 0; j < columnCount; j++) {
for (var i = 0; i < rowCount; i++) {
var data = this.getData (grid, i, j, rowCount, columnCount, false);
if (data != null) {
if (data.heightHint == -1) {
var child = grid[i][j];
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
var currentWidth = 0;
for (var k = 0; k < hSpan; k++) {
currentWidth += widths[j - k];
}
currentWidth += (hSpan - 1) * this.horizontalSpacing - data.horizontalIndent;
if ((currentWidth != data.cacheWidth && data.horizontalAlignment == 4) || (data.cacheWidth > currentWidth)) {
var trim = 0;
if ($_O (child, $wt.widgets.Scrollable)) {
var rect = (child).computeTrim (0, 0, 0, 0);
trim = rect.width;
} else {
trim = child.getBorderWidth () * 2;
}data.cacheWidth = data.cacheHeight = -1;
data.computeSize (child, Math.max (0, currentWidth - trim), data.heightHint, false);
if (data.grabExcessVerticalSpace && data.minimumHeight > 0) {
data.cacheHeight = Math.max (data.cacheHeight, data.minimumHeight);
}if (flush == null) flush =  new Array (count);
flush[flushLength++] = data;
}}}}
}
}var availableHeight = height - this.verticalSpacing * (rowCount - 1) - (this.marginTop + this.marginHeight * 2 + this.marginBottom);
expandCount = 0;
var heights =  $_A (rowCount, 0);
var minHeights =  $_A (rowCount, 0);
var expandRow =  $_A (rowCount, false);
for (var i = 0; i < rowCount; i++) {
for (var j = 0; j < columnCount; j++) {
var data = this.getData (grid, i, j, rowCount, columnCount, true);
if (data != null) {
var vSpan = Math.max (1, Math.min (data.verticalSpan, rowCount));
if (vSpan == 1) {
var h = data.cacheHeight + data.verticalIndent;
heights[i] = Math.max (heights[i], h);
if (data.grabExcessVerticalSpace) {
if (!expandRow[i]) expandCount++;
expandRow[i] = true;
}if (!data.grabExcessVerticalSpace || data.minimumHeight != 0) {
h = !data.grabExcessVerticalSpace || data.minimumHeight == -1 ? data.cacheHeight : data.minimumHeight;
h += data.verticalIndent;
minHeights[i] = Math.max (minHeights[i], h);
}}}}
for (var j = 0; j < columnCount; j++) {
var data = this.getData (grid, i, j, rowCount, columnCount, false);
if (data != null) {
var vSpan = Math.max (1, Math.min (data.verticalSpan, rowCount));
if (vSpan > 1) {
var spanHeight = 0;
var spanMinHeight = 0;
var spanExpandCount = 0;
for (var k = 0; k < vSpan; k++) {
spanHeight += heights[i - k];
spanMinHeight += minHeights[i - k];
if (expandRow[i - k]) spanExpandCount++;
}
if (data.grabExcessVerticalSpace && spanExpandCount == 0) {
expandCount++;
expandRow[i] = true;
}var h = data.cacheHeight + data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
if (h > 0) {
if (spanExpandCount == 0) {
heights[i] += h;
} else {
var delta = Math.floor (h / spanExpandCount);
var remainder = h % spanExpandCount;
var last = -1;
for (var k = 0; k < vSpan; k++) {
if (expandRow[i - k]) {
heights[last = i - k] += delta;
}}
if (last > -1) heights[last] += remainder;
}}if (!data.grabExcessVerticalSpace || data.minimumHeight != 0) {
h = !data.grabExcessVerticalSpace || data.minimumHeight == -1 ? data.cacheHeight : data.minimumHeight;
h += data.verticalIndent - spanMinHeight - (vSpan - 1) * this.verticalSpacing;
if (h > 0) {
if (spanExpandCount == 0) {
minHeights[i] += h;
} else {
var delta = Math.floor (h / spanExpandCount);
var remainder = h % spanExpandCount;
var last = -1;
for (var k = 0; k < vSpan; k++) {
if (expandRow[i - k]) {
minHeights[last = i - k] += delta;
}}
if (last > -1) minHeights[last] += remainder;
}}}}}}
}
if (height != -1 && expandCount > 0) {
var totalHeight = 0;
for (var i = 0; i < rowCount; i++) {
totalHeight += heights[i];
}
var c = expandCount;
var delta = Math.floor ((availableHeight - totalHeight) / c);
var remainder = (availableHeight - totalHeight) % c;
var last = -1;
while (totalHeight != availableHeight) {
for (var i = 0; i < rowCount; i++) {
if (expandRow[i]) {
if (heights[i] + delta > minHeights[i]) {
heights[last = i] = heights[i] + delta;
} else {
heights[i] = minHeights[i];
expandRow[i] = false;
c--;
}}}
if (last > -1) heights[last] += remainder;
for (var i = 0; i < rowCount; i++) {
for (var j = 0; j < columnCount; j++) {
var data = this.getData (grid, i, j, rowCount, columnCount, false);
if (data != null) {
var vSpan = Math.max (1, Math.min (data.verticalSpan, rowCount));
if (vSpan > 1) {
if (!data.grabExcessVerticalSpace || data.minimumHeight != 0) {
var spanHeight = 0;
var spanExpandCount = 0;
for (var k = 0; k < vSpan; k++) {
spanHeight += heights[i - k];
if (expandRow[i - k]) spanExpandCount++;
}
var h = !data.grabExcessVerticalSpace || data.minimumHeight == -1 ? data.cacheHeight : data.minimumHeight;
h += data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
if (h > 0) {
if (spanExpandCount == 0) {
heights[i] += h;
} else {
var delta2 = Math.floor (h / spanExpandCount);
var remainder2 = h % spanExpandCount;
var last2 = -1;
for (var k = 0; k < vSpan; k++) {
if (expandRow[i - k]) {
heights[last2 = i - k] += delta2;
}}
if (last2 > -1) heights[last2] += remainder2;
}}}}}}
}
if (c == 0) break;
totalHeight = 0;
for (var i = 0; i < rowCount; i++) {
totalHeight += heights[i];
}
delta = Math.floor ((availableHeight - totalHeight) / c);
remainder = (availableHeight - totalHeight) % c;
last = -1;
}
}if (move) {
var gridY = y + this.marginTop + this.marginHeight;
for (var i = 0; i < rowCount; i++) {
var gridX = x + this.marginLeft + this.marginWidth;
for (var j = 0; j < columnCount; j++) {
var data = this.getData (grid, i, j, rowCount, columnCount, true);
if (data != null) {
var hSpan = Math.max (1, Math.min (data.horizontalSpan, columnCount));
var vSpan = Math.max (1, data.verticalSpan);
var cellWidth = 0;
var cellHeight = 0;
for (var k = 0; k < hSpan; k++) {
cellWidth += widths[j + k];
}
for (var k = 0; k < vSpan; k++) {
cellHeight += heights[i + k];
}
cellWidth += this.horizontalSpacing * (hSpan - 1);
var childX = gridX + data.horizontalIndent;
var childWidth = Math.min (data.cacheWidth, cellWidth);
switch (data.horizontalAlignment) {
case 16777216:
case 2:
childX += Math.max (0, Math.floor ((cellWidth - data.horizontalIndent - childWidth) / 2));
break;
case 131072:
case 16777224:
case 3:
childX += Math.max (0, cellWidth - data.horizontalIndent - childWidth);
break;
case 4:
childWidth = cellWidth - data.horizontalIndent;
break;
}
cellHeight += this.verticalSpacing * (vSpan - 1);
var childY = gridY + data.verticalIndent;
var childHeight = Math.min (data.cacheHeight, cellHeight);
switch (data.verticalAlignment) {
case 16777216:
case 2:
childY += Math.max (0, Math.floor ((cellHeight - data.verticalIndent - childHeight) / 2));
break;
case 1024:
case 16777224:
case 3:
childY += Math.max (0, cellHeight - data.verticalIndent - childHeight);
break;
case 4:
childHeight = cellHeight - data.verticalIndent;
break;
}
var child = grid[i][j];
if (child != null) {
child.setBounds (childX, childY, childWidth, childHeight);
}}gridX += widths[j] + this.horizontalSpacing;
}
gridY += heights[i] + this.verticalSpacing;
}
}for (var i = 0; i < flushLength; i++) {
flush[i].cacheWidth = flush[i].cacheHeight = -1;
}
var totalDefaultWidth = 0;
var totalDefaultHeight = 0;
for (var i = 0; i < columnCount; i++) {
totalDefaultWidth += widths[i];
}
for (var i = 0; i < rowCount; i++) {
totalDefaultHeight += heights[i];
}
totalDefaultWidth += this.horizontalSpacing * (columnCount - 1) + this.marginLeft + this.marginWidth * 2 + this.marginRight;
totalDefaultHeight += this.verticalSpacing * (rowCount - 1) + this.marginTop + this.marginHeight * 2 + this.marginBottom;
return  new $wt.graphics.Point (totalDefaultWidth, totalDefaultHeight);
}, "$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
if (this.numColumns != 1) string += "numColumns=" + this.numColumns + " ";
if (this.makeColumnsEqualWidth) string += "makeColumnsEqualWidth=" + this.makeColumnsEqualWidth + " ";
if (this.marginWidth != 0) string += "marginWidth=" + this.marginWidth + " ";
if (this.marginHeight != 0) string += "marginHeight=" + this.marginHeight + " ";
if (this.marginLeft != 0) string += "marginLeft=" + this.marginLeft + " ";
if (this.marginRight != 0) string += "marginRight=" + this.marginRight + " ";
if (this.marginTop != 0) string += "marginTop=" + this.marginTop + " ";
if (this.marginBottom != 0) string += "marginBottom=" + this.marginBottom + " ";
if (this.horizontalSpacing != 0) string += "horizontalSpacing=" + this.horizontalSpacing + " ";
if (this.verticalSpacing != 0) string += "verticalSpacing=" + this.verticalSpacing + " ";
string = string.trim ();
string += "}";
return string;
});
cla$$ = $_C (function () {
this.type = 256;
this.marginWidth = 0;
this.marginHeight = 0;
this.spacing = 3;
this.wrap = true;
this.pack = true;
this.fill = false;
this.justify = false;
this.marginLeft = 3;
this.marginTop = 3;
this.marginRight = 3;
this.marginBottom = 3;
$_Z (this, arguments);
}, $wt.layout, "RowLayout", $wt.widgets.Layout);
$_K (cla$$, 
function () {
$_R (this, $wt.layout.RowLayout, []);
});
$_K (cla$$, 
function (type) {
$_R (this, $wt.layout.RowLayout, []);
this.type = type;
}, "~N");
$_M (cla$$, "computeSize", 
function (composite, wHint, hHint, flushCache) {
var extent;
if (this.type == 256) {
extent = this.layoutHorizontal (composite, false, (wHint != -1) && this.wrap, wHint, flushCache);
} else {
extent = this.layoutVertical (composite, false, (hHint != -1) && this.wrap, hHint, flushCache);
}if (wHint != -1) extent.x = wHint;
if (hHint != -1) extent.y = hHint;
return extent;
}, "$wt.widgets.Composite,~N,~N,~B");
$_M (cla$$, "computeSize", 
function (control, flushCache) {
var wHint = -1;
var hHint = -1;
var data = control.getLayoutData ();
if (data != null) {
wHint = data.width;
hHint = data.height;
}return control.computeSize (wHint, hHint, flushCache);
}, "$wt.widgets.Control,~B");
$_V (cla$$, "flushCache", 
function (control) {
return true;
}, "$wt.widgets.Control");
$_M (cla$$, "getName", 
function () {
var string = this.getClass ().getName ();
var index = string.lastIndexOf ('.');
if (index == -1) return string;
return string.substring (index + 1, string.length);
});
$_V (cla$$, "layout", 
function (composite, flushCache) {
var clientArea = composite.getClientArea ();
if (this.type == 256) {
this.layoutHorizontal (composite, true, this.wrap, clientArea.width, flushCache);
} else {
this.layoutVertical (composite, true, this.wrap, clientArea.height, flushCache);
}}, "$wt.widgets.Composite,~B");
$_M (cla$$, "layoutHorizontal", 
function (composite, move, wrap, width, flushCache) {
var count = 0;
var children = composite.getChildren ();
for (var i = 0; i < children.length; i++) {
var control = children[i];
var data = control.getLayoutData ();
if (data == null || !data.exclude) {
children[count++] = children[i];
}}
var childWidth = 0;
var childHeight = 0;
var maxHeight = 0;
if (!this.pack) {
for (var i = 0; i < count; i++) {
var child = children[i];
var size = this.computeSize (child, flushCache);
childWidth = Math.max (childWidth, size.x);
childHeight = Math.max (childHeight, size.y);
}
maxHeight = childHeight;
}var clientX = 0;
var clientY = 0;
if (move) {
var rect = composite.getClientArea ();
clientX = rect.x;
clientY = rect.y;
}var wraps = null;
var wrapped = false;
var bounds = null;
if (move && (this.justify || this.fill)) {
bounds =  new Array (count);
wraps =  $_A (count, 0);
}var maxX = 0;
var x = this.marginLeft + this.marginWidth;
var y = this.marginTop + this.marginHeight;
for (var i = 0; i < count; i++) {
var child = children[i];
if (this.pack) {
var size = this.computeSize (child, flushCache);
childWidth = size.x;
childHeight = size.y;
}if (wrap && (i != 0) && (x + childWidth > width)) {
wrapped = true;
if (move && (this.justify || this.fill)) wraps[i - 1] = maxHeight;
x = this.marginLeft + this.marginWidth;
y += this.spacing + maxHeight;
if (this.pack) maxHeight = 0;
}if (this.pack || this.fill) {
maxHeight = Math.max (maxHeight, childHeight);
}if (move) {
var childX = x + clientX;
var childY = y + clientY;
if (this.justify || this.fill) {
bounds[i] =  new $wt.graphics.Rectangle (childX, childY, childWidth, childHeight);
} else {
child.setBounds (childX, childY, childWidth, childHeight);
}}x += this.spacing + childWidth;
maxX = Math.max (maxX, x);
}
maxX = Math.max (clientX + this.marginLeft + this.marginWidth, maxX - this.spacing);
if (!wrapped) maxX += this.marginRight + this.marginWidth;
if (move && (this.justify || this.fill)) {
var space = 0;
var margin = 0;
if (!wrapped) {
space = Math.max (0, Math.floor ((width - maxX) / (count + 1)));
margin = Math.max (0, Math.floor (((width - maxX) % (count + 1)) / 2));
} else {
if (this.fill || this.justify) {
var last = 0;
if (count > 0) wraps[count - 1] = maxHeight;
for (var i = 0; i < count; i++) {
if (wraps[i] != 0) {
var wrapCount = i - last + 1;
if (this.justify) {
var wrapX = 0;
for (var j = last; j <= i; j++) {
wrapX += bounds[j].width + this.spacing;
}
space = Math.max (0, Math.floor ((width - wrapX) / (wrapCount + 1)));
margin = Math.max (0, Math.floor (((width - wrapX) % (wrapCount + 1)) / 2));
}for (var j = last; j <= i; j++) {
if (this.justify) bounds[j].x += (space * (j - last + 1)) + margin;
if (this.fill) bounds[j].height = wraps[i];
}
last = i + 1;
}}
}}for (var i = 0; i < count; i++) {
if (!wrapped) {
if (this.justify) bounds[i].x += (space * (i + 1)) + margin;
if (this.fill) bounds[i].height = maxHeight;
}children[i].setBounds (bounds[i]);
}
}return  new $wt.graphics.Point (maxX, y + maxHeight + this.marginBottom + this.marginHeight);
}, "$wt.widgets.Composite,~B,~B,~N,~B");
$_M (cla$$, "layoutVertical", 
function (composite, move, wrap, height, flushCache) {
var count = 0;
var children = composite.getChildren ();
for (var i = 0; i < children.length; i++) {
var control = children[i];
var data = control.getLayoutData ();
if (data == null || !data.exclude) {
children[count++] = children[i];
}}
var childWidth = 0;
var childHeight = 0;
var maxWidth = 0;
if (!this.pack) {
for (var i = 0; i < count; i++) {
var child = children[i];
var size = this.computeSize (child, flushCache);
childWidth = Math.max (childWidth, size.x);
childHeight = Math.max (childHeight, size.y);
}
maxWidth = childWidth;
}var clientX = 0;
var clientY = 0;
if (move) {
var rect = composite.getClientArea ();
clientX = rect.x;
clientY = rect.y;
}var wraps = null;
var wrapped = false;
var bounds = null;
if (move && (this.justify || this.fill)) {
bounds =  new Array (count);
wraps =  $_A (count, 0);
}var maxY = 0;
var x = this.marginLeft + this.marginWidth;
var y = this.marginTop + this.marginHeight;
for (var i = 0; i < count; i++) {
var child = children[i];
if (this.pack) {
var size = this.computeSize (child, flushCache);
childWidth = size.x;
childHeight = size.y;
}if (wrap && (i != 0) && (y + childHeight > height)) {
wrapped = true;
if (move && (this.justify || this.fill)) wraps[i - 1] = maxWidth;
x += this.spacing + maxWidth;
y = this.marginTop + this.marginHeight;
if (this.pack) maxWidth = 0;
}if (this.pack || this.fill) {
maxWidth = Math.max (maxWidth, childWidth);
}if (move) {
var childX = x + clientX;
var childY = y + clientY;
if (this.justify || this.fill) {
bounds[i] =  new $wt.graphics.Rectangle (childX, childY, childWidth, childHeight);
} else {
child.setBounds (childX, childY, childWidth, childHeight);
}}y += this.spacing + childHeight;
maxY = Math.max (maxY, y);
}
maxY = Math.max (clientY + this.marginTop + this.marginHeight, maxY - this.spacing);
if (!wrapped) maxY += this.marginBottom + this.marginHeight;
if (move && (this.justify || this.fill)) {
var space = 0;
var margin = 0;
if (!wrapped) {
space = Math.max (0, Math.floor ((height - maxY) / (count + 1)));
margin = Math.max (0, Math.floor (((height - maxY) % (count + 1)) / 2));
} else {
if (this.fill || this.justify) {
var last = 0;
if (count > 0) wraps[count - 1] = maxWidth;
for (var i = 0; i < count; i++) {
if (wraps[i] != 0) {
var wrapCount = i - last + 1;
if (this.justify) {
var wrapY = 0;
for (var j = last; j <= i; j++) {
wrapY += bounds[j].height + this.spacing;
}
space = Math.max (0, Math.floor ((height - wrapY) / (wrapCount + 1)));
margin = Math.max (0, Math.floor (((height - wrapY) % (wrapCount + 1)) / 2));
}for (var j = last; j <= i; j++) {
if (this.justify) bounds[j].y += (space * (j - last + 1)) + margin;
if (this.fill) bounds[j].width = wraps[i];
}
last = i + 1;
}}
}}for (var i = 0; i < count; i++) {
if (!wrapped) {
if (this.justify) bounds[i].y += (space * (i + 1)) + margin;
if (this.fill) bounds[i].width = maxWidth;
}children[i].setBounds (bounds[i]);
}
}return  new $wt.graphics.Point (x + maxWidth + this.marginRight + this.marginWidth, maxY);
}, "$wt.widgets.Composite,~B,~B,~N,~B");
$_V (cla$$, "toString", 
function () {
var string = this.getName () + " {";
string += "type=" + ((this.type != 256) ? "SWT.VERTICAL" : "SWT.HORIZONTAL") + " ";
if (this.marginWidth != 0) string += "marginWidth=" + this.marginWidth + " ";
if (this.marginHeight != 0) string += "marginHeight=" + this.marginHeight + " ";
if (this.marginLeft != 0) string += "marginLeft=" + this.marginLeft + " ";
if (this.marginTop != 0) string += "marginTop=" + this.marginTop + " ";
if (this.marginRight != 0) string += "marginRight=" + this.marginRight + " ";
if (this.marginBottom != 0) string += "marginBottom=" + this.marginBottom + " ";
if (this.spacing != 0) string += "spacing=" + this.spacing + " ";
string += "wrap=" + this.wrap + " ";
string += "pack=" + this.pack + " ";
string += "fill=" + this.fill + " ";
string += "justify=" + this.justify + " ";
string = string.trim ();
string += "}";
return string;
});
