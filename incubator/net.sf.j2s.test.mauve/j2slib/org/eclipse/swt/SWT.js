$_L(null,"$wt.SWT",["java.lang.IllegalArgumentException","$wt.SWTError","$.SWTException"],function(){
$WT=c$=$_T($wt,"SWT");
c$.findErrorText=$_M(c$,"findErrorText",
function(code){
switch(code){
case 1:
return"Unspecified error";
case 2:
return"No more handles";
case 3:
return"No more callbacks";
case 4:
return"Argument cannot be null";
case 5:
return"Argument not valid";
case 6:
return"Index out of bounds";
case 7:
return"Argument cannot be zero";
case 8:
return"Cannot get item";
case 9:
return"Cannot get selection";
case 11:
return"Cannot get item height";
case 12:
return"Cannot get text";
case 13:
return"Cannot set text";
case 14:
return"Item not added";
case 15:
return"Item not removed";
case 20:
return"Not implemented";
case 21:
return"Menu must be a drop down";
case 22:
return"Invalid thread access";
case 24:
return"Widget is disposed";
case 27:
return"Menu item is not a CASCADE";
case 28:
return"Cannot set selection";
case 29:
return"Cannot set menu";
case 30:
return"Cannot set the enabled state";
case 31:
return"Cannot get the enabled state";
case 32:
return"Widget has the wrong parent";
case 33:
return"Menu is not a BAR";
case 36:
return"Cannot get count";
case 37:
return"Menu is not a POP_UP";
case 38:
return"Unsupported color depth";
case 39:
return"i/o error";
case 40:
return"Invalid image";
case 42:
return"Unsupported or unrecognized format";
case 43:
return"Subclassing not allowed";
case 44:
return"Graphic is disposed";
case 45:
return"Device is disposed";
case 46:
return"Failed to execute runnable";
case 47:
return"Unable to load library";
case 10:
return"Cannot invert matrix";
case 16:
return"Unable to load graphics library";
case 48:
return"Font not valid";
}
return"Unknown error";
},"~N");
c$.getMessage=$_M(c$,"getMessage",
function(key){
return"!"+key+"!";
},"~S");
c$.getPlatform=$_M(c$,"getPlatform",
function(){
return"win32";
});
c$.getVersion=$_M(c$,"getVersion",
function(){
return 3139;
});
c$.error=$_M(c$,"error",
function(code){
{
var m=Clazz.getMixedCallerMethod(arguments);
if(m!=null){
var args=m.caller.arguments;
var clazzName=null;
if(m.caller.claxxOwner!=null){
clazzName=Clazz.getClassName(m.caller.claxxOwner);
}else if(m.caller.stacks!=null){
clazzName=Clazz.getClassName(m.caller.stacks[m.caller.stacks.length-1]);
}
var str="SWT.error is called from ";
if(clazzName!=null&&clazzName.length!=0){
str+=clazzName+".";
}
str+=(m.caller.exName==null)?"anonymous":m.caller.exName;
str+=" ("+Clazz.getParamsType(args)+") ~ [";
for(var i=0;i<args.length;i++){
str+=args[i];
str+=(i<args.length-1)?",":"";
}
str+="]";
window.error(str);
window.log((""+m.caller).trim());
}
}$WT.error(code,null);
},"~N");
c$.error=$_M(c$,"error",
function(code,throwable){
$WT.error(code,throwable,null);
},"~N,Throwable");
c$.error=$_M(c$,"error",
function(code,throwable,detail){
if($_O(throwable,$wt.SWTError))throw throwable;
if($_O(throwable,$wt.SWTException))throw throwable;
var message=$WT.findErrorText(code);
if(detail!=null)message+=detail;
switch(code){
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
throw new IllegalArgumentException(message);
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
var exception=new $wt.SWTException(code,message);
exception.throwable=throwable;
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
var error=new $wt.SWTError(code,message);
error.throwable=throwable;
throw error;
}}
var error=new $wt.SWTError(code,message);
error.throwable=throwable;
throw error;
},"~N,Throwable,~S");
$_S(c$,
"None",0,
"KeyDown",1,
"KeyUp",2,
"MouseDown",3,
"MouseUp",4,
"MouseMove",5,
"MouseEnter",6,
"MouseExit",7,
"MouseDoubleClick",8,
"Paint",9,
"Move",10,
"Resize",11,
"Dispose",12,
"Selection",13,
"DefaultSelection",14,
"FocusIn",15,
"FocusOut",16,
"Expand",17,
"Collapse",18,
"Iconify",19,
"Deiconify",20,
"Close",21,
"Show",22,
"Hide",23,
"Modify",24,
"Verify",25,
"Activate",26,
"Deactivate",27,
"Help",28,
"DragDetect",29,
"Arm",30,
"Traverse",31,
"MouseHover",32,
"HardKeyDown",33,
"HardKeyUp",34,
"MenuDetect",35,
"SetData",36,
"MouseWheel",37,
"NONE",0,
"DRAG",1,
"NULL",0,
"DEFAULT",-1,
"OFF",0,
"ON",1,
"LOW",1,
"HIGH",2,
"BAR",2,
"DROP_DOWN",4,
"POP_UP",8,
"SEPARATOR",2,
"TOGGLE",2,
"ARROW",4,
"PUSH",8,
"RADIO",16,
"CHECK",32,
"CASCADE",64,
"MULTI",2,
"SINGLE",4,
"READ_ONLY",8,
"WRAP",64,
"SIMPLE",64,
"PASSWORD",4194304,
"SHADOW_IN",4,
"SHADOW_OUT",8,
"SHADOW_ETCHED_IN",16,
"SHADOW_ETCHED_OUT",64,
"SHADOW_NONE",32,
"INDETERMINATE",2,
"TOOL",4,
"NO_TRIM",8,
"RESIZE",16,
"TITLE",32,
"CLOSE",64,
"MENU",64,
"MIN",128,
"MAX",1024,
"H_SCROLL",256,
"V_SCROLL",512,
"BORDER",2048,
"CLIP_CHILDREN",4096,
"CLIP_SIBLINGS",8192,
"ON_TOP",16384,
"SHELL_TRIM",1264,
"DIALOG_TRIM",2144,
"MODELESS",0,
"PRIMARY_MODAL",32768,
"APPLICATION_MODAL",65536,
"SYSTEM_MODAL",131072,
"HIDE_SELECTION",32768,
"FULL_SELECTION",65536,
"FLAT",8388608,
"SMOOTH",65536,
"NO_BACKGROUND",262144,
"NO_FOCUS",524288,
"NO_REDRAW_RESIZE",1048576,
"NO_MERGE_PAINTS",2097152,
"NO_RADIO_GROUP",4194304,
"LEFT_TO_RIGHT",33554432,
"RIGHT_TO_LEFT",67108864,
"MIRRORED",134217728,
"EMBEDDED",16777216,
"VIRTUAL",268435456,
"DOUBLE_BUFFERED",536870912,
"UP",128,
"TOP",128,
"DOWN",1024,
"BOTTOM",1024,
"LEAD",16384,
"LEFT",16384,
"TRAIL",131072,
"RIGHT",131072,
"CENTER",16777216,
"HORIZONTAL",256,
"VERTICAL",512,
"BEGINNING",1,
"FILL",4,
"DBCS",2,
"ALPHA",4,
"NATIVE",8,
"PHONETIC",16,
"ROMAN",32,
"BS",'\b',
"CR",'\r',
"DEL",0x7F,
"ESC",0x1B,
"LF",'\n',
"TAB",'\t',
"ALT",65536,
"SHIFT",131072,
"CTRL",262144,
"CONTROL",262144,
"COMMAND",4194304,
"MODIFIER_MASK",0,
"BUTTON1",524288,
"BUTTON2",1048576,
"BUTTON3",2097152,
"BUTTON4",8388608,
"BUTTON5",33554432,
"BUTTON_MASK",0,
"MOD1",0,
"MOD2",0,
"MOD3",0,
"MOD4",0,
"SCROLL_LINE",1,
"SCROLL_PAGE",2,
"KEYCODE_BIT",(16777216),
"KEY_MASK",16842751,
"ARROW_UP",16777217,
"ARROW_DOWN",16777218,
"ARROW_LEFT",16777219,
"ARROW_RIGHT",16777220,
"PAGE_UP",16777221,
"PAGE_DOWN",16777222,
"HOME",16777223,
"END",16777224,
"INSERT",16777225,
"F1",16777226,
"F2",16777227,
"F3",16777228,
"F4",16777229,
"F5",16777230,
"F6",16777231,
"F7",16777232,
"F8",16777233,
"F9",16777234,
"F10",16777235,
"F11",16777236,
"F12",16777237,
"F13",16777238,
"F14",16777239,
"F15",16777240,
"KEYPAD_MULTIPLY",16777258,
"KEYPAD_ADD",16777259,
"KEYPAD_SUBTRACT",16777261,
"KEYPAD_DECIMAL",16777262,
"KEYPAD_DIVIDE",16777263,
"KEYPAD_0",16777264,
"KEYPAD_1",16777265,
"KEYPAD_2",16777266,
"KEYPAD_3",16777267,
"KEYPAD_4",16777268,
"KEYPAD_5",16777269,
"KEYPAD_6",16777270,
"KEYPAD_7",16777271,
"KEYPAD_8",16777272,
"KEYPAD_9",16777273,
"KEYPAD_EQUAL",16777277,
"KEYPAD_CR",16777296,
"HELP",16777297,
"CAPS_LOCK",16777298,
"NUM_LOCK",16777299,
"SCROLL_LOCK",16777300,
"PAUSE",16777301,
"BREAK",16777302,
"PRINT_SCREEN",16777303,
"ICON_ERROR",1,
"ICON_INFORMATION",2,
"ICON_QUESTION",4,
"ICON_WARNING",8,
"ICON_WORKING",16,
"OK",32,
"YES",64,
"NO",128,
"CANCEL",256,
"ABORT",512,
"RETRY",1024,
"IGNORE",2048,
"OPEN",4096,
"SAVE",8192,
"COLOR_WHITE",1,
"COLOR_BLACK",2,
"COLOR_RED",3,
"COLOR_DARK_RED",4,
"COLOR_GREEN",5,
"COLOR_DARK_GREEN",6,
"COLOR_YELLOW",7,
"COLOR_DARK_YELLOW",8,
"COLOR_BLUE",9,
"COLOR_DARK_BLUE",10,
"COLOR_MAGENTA",11,
"COLOR_DARK_MAGENTA",12,
"COLOR_CYAN",13,
"COLOR_DARK_CYAN",14,
"COLOR_GRAY",15,
"COLOR_DARK_GRAY",16,
"COLOR_WIDGET_DARK_SHADOW",17,
"COLOR_WIDGET_NORMAL_SHADOW",18,
"COLOR_WIDGET_LIGHT_SHADOW",19,
"COLOR_WIDGET_HIGHLIGHT_SHADOW",20,
"COLOR_WIDGET_FOREGROUND",21,
"COLOR_WIDGET_BACKGROUND",22,
"COLOR_WIDGET_BORDER",23,
"COLOR_LIST_FOREGROUND",24,
"COLOR_LIST_BACKGROUND",25,
"COLOR_LIST_SELECTION",26,
"COLOR_LIST_SELECTION_TEXT",27,
"COLOR_INFO_FOREGROUND",28,
"COLOR_INFO_BACKGROUND",29,
"COLOR_TITLE_FOREGROUND",30,
"COLOR_TITLE_BACKGROUND",31,
"COLOR_TITLE_BACKGROUND_GRADIENT",32,
"COLOR_TITLE_INACTIVE_FOREGROUND",33,
"COLOR_TITLE_INACTIVE_BACKGROUND",34,
"COLOR_TITLE_INACTIVE_BACKGROUND_GRADIENT",35,
"DRAW_TRANSPARENT",1,
"DRAW_DELIMITER",2,
"DRAW_TAB",4,
"DRAW_MNEMONIC",8,
"ERROR_UNSPECIFIED",1,
"ERROR_NO_HANDLES",2,
"ERROR_NO_MORE_CALLBACKS",3,
"ERROR_NULL_ARGUMENT",4,
"ERROR_INVALID_ARGUMENT",5,
"ERROR_INVALID_RANGE",6,
"ERROR_CANNOT_BE_ZERO",7,
"ERROR_CANNOT_GET_ITEM",8,
"ERROR_CANNOT_GET_SELECTION",9,
"ERROR_CANNOT_INVERT_MATRIX",10,
"ERROR_CANNOT_GET_ITEM_HEIGHT",11,
"ERROR_CANNOT_GET_TEXT",12,
"ERROR_CANNOT_SET_TEXT",13,
"ERROR_ITEM_NOT_ADDED",14,
"ERROR_ITEM_NOT_REMOVED",15,
"ERROR_NO_GRAPHICS_LIBRARY",16,
"ERROR_NOT_IMPLEMENTED",20,
"ERROR_MENU_NOT_DROP_DOWN",21,
"ERROR_THREAD_INVALID_ACCESS",22,
"ERROR_WIDGET_DISPOSED",24,
"ERROR_MENUITEM_NOT_CASCADE",27,
"ERROR_CANNOT_SET_SELECTION",28,
"ERROR_CANNOT_SET_MENU",29,
"ERROR_CANNOT_SET_ENABLED",30,
"ERROR_CANNOT_GET_ENABLED",31,
"ERROR_INVALID_PARENT",32,
"ERROR_MENU_NOT_BAR",33,
"ERROR_CANNOT_GET_COUNT",36,
"ERROR_MENU_NOT_POP_UP",37,
"ERROR_UNSUPPORTED_DEPTH",38,
"ERROR_IO",39,
"ERROR_INVALID_IMAGE",40,
"ERROR_UNSUPPORTED_FORMAT",42,
"ERROR_INVALID_SUBCLASS",43,
"ERROR_GRAPHIC_DISPOSED",44,
"ERROR_DEVICE_DISPOSED",45,
"ERROR_FAILED_EXEC",46,
"ERROR_FAILED_LOAD_LIBRARY",47,
"ERROR_INVALID_FONT",48,
"TRAVERSE_NONE",0,
"TRAVERSE_ESCAPE",2,
"TRAVERSE_RETURN",4,
"TRAVERSE_TAB_PREVIOUS",8,
"TRAVERSE_TAB_NEXT",16,
"TRAVERSE_ARROW_PREVIOUS",32,
"TRAVERSE_ARROW_NEXT",64,
"TRAVERSE_MNEMONIC",128,
"TRAVERSE_PAGE_PREVIOUS",256,
"TRAVERSE_PAGE_NEXT",512,
"BITMAP",0,
"ICON",1,
"IMAGE_COPY",0,
"IMAGE_DISABLE",1,
"IMAGE_GRAY",2,
"NORMAL",0,
"BOLD",1,
"ITALIC",2,
"CURSOR_ARROW",0,
"CURSOR_WAIT",1,
"CURSOR_CROSS",2,
"CURSOR_APPSTARTING",3,
"CURSOR_HELP",4,
"CURSOR_SIZEALL",5,
"CURSOR_SIZENESW",6,
"CURSOR_SIZENS",7,
"CURSOR_SIZENWSE",8,
"CURSOR_SIZEWE",9,
"CURSOR_SIZEN",10,
"CURSOR_SIZES",11,
"CURSOR_SIZEE",12,
"CURSOR_SIZEW",13,
"CURSOR_SIZENE",14,
"CURSOR_SIZESE",15,
"CURSOR_SIZESW",16,
"CURSOR_SIZENW",17,
"CURSOR_UPARROW",18,
"CURSOR_IBEAM",19,
"CURSOR_NO",20,
"CURSOR_HAND",21,
"CAP_FLAT",1,
"CAP_ROUND",2,
"CAP_SQUARE",3,
"JOIN_MITER",1,
"JOIN_ROUND",2,
"JOIN_BEVEL",3,
"LINE_SOLID",1,
"LINE_DASH",2,
"LINE_DOT",3,
"LINE_DASHDOT",4,
"LINE_DASHDOTDOT",5,
"LINE_CUSTOM",6,
"PATH_MOVE_TO",1,
"PATH_LINE_TO",2,
"PATH_QUAD_TO",3,
"PATH_CUBIC_TO",4,
"PATH_CLOSE",5,
"FILL_EVEN_ODD",1,
"FILL_WINDING",2,
"IMAGE_UNDEFINED",-1,
"IMAGE_BMP",0,
"IMAGE_BMP_RLE",1,
"IMAGE_GIF",2,
"IMAGE_ICO",3,
"IMAGE_JPEG",4,
"IMAGE_PNG",5,
"IMAGE_TIFF",6,
"IMAGE_OS2_BMP",7,
"DM_UNSPECIFIED",0x0,
"DM_FILL_NONE",0x1,
"DM_FILL_BACKGROUND",0x2,
"DM_FILL_PREVIOUS",0x3,
"TRANSPARENCY_NONE",0x0,
"TRANSPARENCY_ALPHA",1,
"TRANSPARENCY_MASK",2,
"TRANSPARENCY_PIXEL",4,
"MOVEMENT_CHAR",1,
"MOVEMENT_CLUSTER",2,
"MOVEMENT_WORD",4);
{
($t$=$WT.BUTTON_MASK=45613056,$WT.prototype.BUTTON_MASK=$WT.BUTTON_MASK,$t$);
($t$=$WT.MODIFIER_MASK=4653056,$WT.prototype.MODIFIER_MASK=$WT.MODIFIER_MASK,$t$);
var platform=$WT.getPlatform();
if("carbon".equals(platform)){
($t$=$WT.MOD1=4194304,$WT.prototype.MOD1=$WT.MOD1,$t$);
($t$=$WT.MOD2=131072,$WT.prototype.MOD2=$WT.MOD2,$t$);
($t$=$WT.MOD3=65536,$WT.prototype.MOD3=$WT.MOD3,$t$);
($t$=$WT.MOD4=262144,$WT.prototype.MOD4=$WT.MOD4,$t$);
}else{
($t$=$WT.MOD1=262144,$WT.prototype.MOD1=$WT.MOD1,$t$);
($t$=$WT.MOD2=131072,$WT.prototype.MOD2=$WT.MOD2,$t$);
($t$=$WT.MOD3=65536,$WT.prototype.MOD3=$WT.MOD3,$t$);
($t$=$WT.MOD4=0,$WT.prototype.MOD4=$WT.MOD4,$t$);
}}});
