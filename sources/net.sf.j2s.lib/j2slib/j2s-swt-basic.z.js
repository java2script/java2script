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
c$=$_C(function(){
$_Z(this,arguments);
},$wt,"SWT");
c$.findErrorText=$_M(c$,"findErrorText",
function(a){
switch(a){
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
function(a){
return"!"+a+"!";
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
function(a){
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
}$WT.error(a,null);
},"~N");
c$.error=$_M(c$,"error",
function(a,b){
$WT.error(a,b,null);
},"~N,Throwable");
c$.error=$_M(c$,"error",
function(a,b,c){
if($_O(b,$wt.SWTError))throw b;
if($_O(b,$wt.SWTException))throw b;
var d=$WT.findErrorText(a);
if(c!=null)d+=c;
switch(a){
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
throw new IllegalArgumentException(d);
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
var e=new $wt.SWTException(a,d);
e.throwable=b;
throw e;
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
var e=new $wt.SWTError(a,d);
e.throwable=b;
throw e;
}}
var e=new $wt.SWTError(a,d);
e.throwable=b;
throw e;
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
var a=$WT.getPlatform();
if("carbon".equals(a)){
($t$=$WT.MOD1=4194304,$WT.prototype.MOD1=$WT.MOD1,$t$);
($t$=$WT.MOD2=131072,$WT.prototype.MOD2=$WT.MOD2,$t$);
($t$=$WT.MOD3=65536,$WT.prototype.MOD3=$WT.MOD3,$t$);
($t$=$WT.MOD4=262144,$WT.prototype.MOD4=$WT.MOD4,$t$);
}else{
($t$=$WT.MOD1=262144,$WT.prototype.MOD1=$WT.MOD1,$t$);
($t$=$WT.MOD2=131072,$WT.prototype.MOD2=$WT.MOD2,$t$);
($t$=$WT.MOD3=65536,$WT.prototype.MOD3=$WT.MOD3,$t$);
($t$=$WT.MOD4=0,$WT.prototype.MOD4=$WT.MOD4,$t$);
}}c$=$_C(function(){
this.code=0;
this.throwable=null;
$_Z(this,arguments);
},$wt,"SWTError",Error);
$_K(c$,
function(){
this.construct(1);
});
$_K(c$,
function(a){
this.construct(1,a);
},"~S");
$_K(c$,
function(a){
this.construct(a,$WT.findErrorText(a));
},"~N");
$_K(c$,
function(a,b){
$_R(this,$wt.SWTError,[b]);
this.code=a;
},"~N,~S");
$_V(c$,"getCause",
function(){
return this.throwable;
});
$_M(c$,"getMessage",
function(){
if(this.throwable==null)return $_U(this,$wt.SWTError,"getMessage",[]);
return $_U(this,$wt.SWTError,"getMessage",[])+" ("+this.throwable.toString()+")";
});
$_M(c$,"printStackTrace",
function(){
$_U(this,$wt.SWTError,"printStackTrace",[]);
if(this.throwable!=null){
System.err.println("*** Stack trace of contained error ***");
this.throwable.printStackTrace();
}});
$_S(c$,
"serialVersionUID",3833467327105808433);
c$=$_C(function(){
this.code=0;
this.throwable=null;
$_Z(this,arguments);
},$wt,"SWTException",RuntimeException);
$_K(c$,
function(){
this.construct(1);
});
$_K(c$,
function(a){
this.construct(1,a);
},"~S");
$_K(c$,
function(a){
this.construct(a,$WT.findErrorText(a));
},"~N");
$_K(c$,
function(a,b){
$_R(this,$wt.SWTException,[b]);
this.code=a;
},"~N,~S");
$_V(c$,"getCause",
function(){
return this.throwable;
});
$_M(c$,"getMessage",
function(){
if(this.throwable==null)return $_U(this,$wt.SWTException,"getMessage",[]);
return $_U(this,$wt.SWTException,"getMessage",[])+" ("+this.throwable.toString()+")";
});
$_M(c$,"printStackTrace",
function(){
$_U(this,$wt.SWTException,"printStackTrace",[]);
if(this.throwable!=null){
System.err.println("*** Stack trace of contained exception ***");
this.throwable.printStackTrace();
}});
$_S(c$,
"serialVersionUID",3257282552304842547);
$_I($wt.internal,"SWTEventListener",java.util.EventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal,"SWTEventObject",java.util.EventObject);
$_K(c$,
function(a){
$_R(this,$wt.internal.SWTEventObject,[a]);
},"Object");
$_S(c$,
"serialVersionUID",3258125873411470903);
$_I($wt.internal,"SerializableCompatibility",java.io.Serializable);
$_I($wt.internal,"CloneableCompatibility",Cloneable);
c$=$_C(function(){
this.returnSet=0;
this.returnBoolean=false;
this.returnNumber=0;
this.returnObject=null;
this.event=null;
$_Z(this,arguments);
},$wt.internal,"RunnableCompatibility",null,Runnable);
$_M(c$,"getEvent",
function(){
return this.event;
});
$_M(c$,"setEvent",
function(a){
this.event=a;
},"Object");
$_M(c$,"toReturn",
function(a){
this.returnSet=1;
this.returnNumber=a;
this.returnObject=null;
},"~N");
$_M(c$,"toReturn",
function(a){
this.returnSet=2;
this.returnBoolean=a;
this.returnNumber=0;
this.returnObject=null;
},"~B");
$_M(c$,"toReturn",
function(a){
this.returnSet=3;
this.returnObject=a;
this.returnNumber=0;
this.returnBoolean=false;
},"Object");
$_M(c$,"isReturned",
function(){
return this.returnSet!=0;
});
c$=$_C(function(){
this.display=null;
this.widget=null;
this.type=0;
this.detail=0;
this.item=null;
this.gc=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.count=0;
this.time=0;
this.button=0;
this.character=0;
this.keyCode=0;
this.stateMask=0;
this.start=0;
this.end=0;
this.text=null;
this.doit=true;
this.data=null;
$_Z(this,arguments);
},$wt.widgets,"Event");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"setBounds",
function(a){
this.x=a.x;
this.y=a.y;
this.width=a.width;
this.height=a.height;
},"$wt.graphics.Rectangle");
$_V(c$,"toString",
function(){
return"Event {type="+this.type+",widget="+this.widget+",x="+this.x+",y="+this.y+",width="+this.width+",height="+this.height+"}";
});
$_M(c$,"releaseResource",
function(){
this.gc=null;
this.data=null;
this.item=null;
this.widget=null;
this.display=null;
});
c$=$_C(function(){
this.display=null;
this.widget=null;
this.time=0;
this.data=null;
$_Z(this,arguments);
},$wt.events,"TypedEvent",$wt.internal.SWTEventObject);
$_K(c$,
function(a){
$_R(this,$wt.events.TypedEvent,[a]);
},"Object");
$_K(c$,
function(a){
$_R(this,$wt.events.TypedEvent,[a.widget]);
this.display=a.display;
this.widget=a.widget;
this.time=a.time;
this.data=a.data;
},"$wt.widgets.Event");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
return this.getName()+"{"+this.widget+" time="+this.time+" data="+this.data+"}";
});
$_S(c$,
"serialVersionUID",3257285846578377524);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"ArmEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.ArmEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3258126964249212217);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"ControlEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.ControlEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3258132436155119161);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"DisposeEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.DisposeEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3257566187633521206);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"FocusEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.FocusEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3258134643684227381);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"HelpEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.HelpEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3257001038606251315);
c$=$_C(function(){
this.character=0;
this.keyCode=0;
this.stateMask=0;
this.doit=false;
$_Z(this,arguments);
},$wt.events,"KeyEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.KeyEvent,[a]);
this.character=a.character;
this.keyCode=a.keyCode;
this.stateMask=a.stateMask;
this.doit=a.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.KeyEvent,"toString",[]);
return a.substring(0,a.length-1)+" character='"+(((this.character).charCodeAt(0)==0)?"\\0":""+this.character)+"'"+" keyCode="+this.keyCode+" stateMask="+this.stateMask+" doit="+this.doit+"}";
});
$_S(c$,
"serialVersionUID",3256442491011412789);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"MenuEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.MenuEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3258132440332383025);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"ModifyEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.ModifyEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3258129146227011891);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"MouseAdapter",null,$wt.events.MouseListener);
$_V(c$,"mouseDoubleClick",
function(a){
},"$wt.events.MouseEvent");
$_V(c$,"mouseDown",
function(a){
},"$wt.events.MouseEvent");
$_V(c$,"mouseUp",
function(a){
},"$wt.events.MouseEvent");
c$=$_C(function(){
this.button=0;
this.stateMask=0;
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.events,"MouseEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.MouseEvent,[a]);
this.x=a.x;
this.y=a.y;
this.button=a.button;
this.stateMask=a.stateMask;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.MouseEvent,"toString",[]);
return a.substring(0,a.length-1)+" button="+this.button+" stateMask="+this.stateMask+" x="+this.x+" y="+this.y+"}";
});
$_S(c$,
"serialVersionUID",3257288037011566898);
c$=$_C(function(){
this.gc=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.count=0;
$_Z(this,arguments);
},$wt.events,"PaintEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.PaintEvent,[a]);
this.gc=a.gc;
this.x=a.x;
this.y=a.y;
this.width=a.width;
this.height=a.height;
this.count=a.count;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.PaintEvent,"toString",[]);
return a.substring(0,a.length-1)+" gc="+this.gc+" x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" count="+this.count+"}";
});
$_S(c$,
"serialVersionUID",3256446919205992497);
c$=$_C(function(){
this.item=null;
this.detail=0;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.stateMask=0;
this.text=null;
this.doit=false;
$_Z(this,arguments);
},$wt.events,"SelectionEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.SelectionEvent,[a]);
this.item=a.item;
this.x=a.x;
this.y=a.y;
this.width=a.width;
this.height=a.height;
this.detail=a.detail;
this.stateMask=a.stateMask;
this.text=a.text;
this.doit=a.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.SelectionEvent,"toString",[]);
return a.substring(0,a.length-1)+" item="+this.item+" detail="+this.detail+" x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" stateMask="+this.stateMask+" text="+this.text+" doit="+this.doit+"}";
});
$_S(c$,
"serialVersionUID",3976735856884987953);
c$=$_C(function(){
this.doit=false;
$_Z(this,arguments);
},$wt.events,"ShellEvent",$wt.events.TypedEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.ShellEvent,[a]);
this.doit=a.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.ShellEvent,"toString",[]);
return a.substring(0,a.length-1)+" doit="+this.doit+"}";
});
$_S(c$,
"serialVersionUID",3257569490479888441);
c$=$_C(function(){
this.detail=0;
$_Z(this,arguments);
},$wt.events,"TraverseEvent",$wt.events.KeyEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.TraverseEvent,[a]);
this.detail=a.detail;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.TraverseEvent,"toString",[]);
return a.substring(0,a.length-1)+" detail="+this.detail+"}";
});
$_S(c$,
"serialVersionUID",3257565105301239349);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"TreeEvent",$wt.events.SelectionEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.TreeEvent,[a]);
},"$wt.widgets.Event");
$_S(c$,
"serialVersionUID",3257282548009677109);
c$=$_C(function(){
this.start=0;
this.end=0;
this.text=null;
$_Z(this,arguments);
},$wt.events,"VerifyEvent",$wt.events.KeyEvent);
$_K(c$,
function(a){
$_R(this,$wt.events.VerifyEvent,[a]);
this.character=a.character;
this.keyCode=a.keyCode;
this.stateMask=a.stateMask;
this.start=a.start;
this.end=a.end;
this.text=a.text;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var a=$_U(this,$wt.events.VerifyEvent,"toString",[]);
return a.substring(0,a.length-1)+" start="+this.start+" end="+this.end+" text="+this.text+"}";
});
$_S(c$,
"serialVersionUID",3257003246269577014);
$_I($wt.widgets,"Listener");
c$=$_C(function(){
this.eventListener=null;
$_Z(this,arguments);
},$wt.widgets,"TypedListener",null,$wt.widgets.Listener);
$_K(c$,
function(a){
this.eventListener=a;
},"$wt.internal.SWTEventListener");
$_M(c$,"getEventListener",
function(){
return this.eventListener;
});
$_V(c$,"handleEvent",
function(a){
switch(a.type){
case 9:
{
var b=new $wt.events.PaintEvent(a);
(this.eventListener).paintControl(b);
a.gc=b.gc;
break;
}case 13:
{
var b=new $wt.events.SelectionEvent(a);
(this.eventListener).widgetSelected(b);
a.x=b.x;
a.y=b.y;
a.doit=b.doit;
break;
}case 14:
{
(this.eventListener).widgetDefaultSelected(new $wt.events.SelectionEvent(a));
break;
}case 12:
{
(this.eventListener).widgetDisposed(new $wt.events.DisposeEvent(a));
break;
}case 15:
{
(this.eventListener).focusGained(new $wt.events.FocusEvent(a));
break;
}case 16:
{
(this.eventListener).focusLost(new $wt.events.FocusEvent(a));
break;
}case 23:
{
(this.eventListener).menuHidden(new $wt.events.MenuEvent(a));
break;
}case 22:
{
(this.eventListener).menuShown(new $wt.events.MenuEvent(a));
break;
}case 1:
{
var b=new $wt.events.KeyEvent(a);
(this.eventListener).keyPressed(b);
a.doit=b.doit;
break;
}case 2:
{
var b=new $wt.events.KeyEvent(a);
(this.eventListener).keyReleased(b);
a.doit=b.doit;
break;
}case 3:
{
(this.eventListener).mouseDown(new $wt.events.MouseEvent(a));
break;
}case 4:
{
(this.eventListener).mouseUp(new $wt.events.MouseEvent(a));
break;
}case 8:
{
(this.eventListener).mouseDoubleClick(new $wt.events.MouseEvent(a));
break;
}case 5:
{
(this.eventListener).mouseMove(new $wt.events.MouseEvent(a));
return;
}case 11:
{
(this.eventListener).controlResized(new $wt.events.ControlEvent(a));
break;
}case 10:
{
(this.eventListener).controlMoved(new $wt.events.ControlEvent(a));
break;
}case 21:
{
var b=new $wt.events.ShellEvent(a);
(this.eventListener).shellClosed(b);
a.doit=b.doit;
break;
}case 26:
{
(this.eventListener).shellActivated(new $wt.events.ShellEvent(a));
break;
}case 27:
{
(this.eventListener).shellDeactivated(new $wt.events.ShellEvent(a));
break;
}case 19:
{
(this.eventListener).shellIconified(new $wt.events.ShellEvent(a));
break;
}case 20:
{
(this.eventListener).shellDeiconified(new $wt.events.ShellEvent(a));
break;
}case 17:
{
(this.eventListener).treeExpanded(new $wt.events.TreeEvent(a));
break;
}case 18:
{
(this.eventListener).treeCollapsed(new $wt.events.TreeEvent(a));
break;
}case 24:
{
(this.eventListener).modifyText(new $wt.events.ModifyEvent(a));
break;
}case 25:
{
var b=new $wt.events.VerifyEvent(a);
(this.eventListener).verifyText(b);
a.text=b.text;
a.doit=b.doit;
break;
}case 28:
{
(this.eventListener).helpRequested(new $wt.events.HelpEvent(a));
break;
}case 30:
{
(this.eventListener).widgetArmed(new $wt.events.ArmEvent(a));
break;
}case 7:
{
(this.eventListener).mouseExit(new $wt.events.MouseEvent(a));
break;
}case 6:
{
(this.eventListener).mouseEnter(new $wt.events.MouseEvent(a));
break;
}case 32:
{
(this.eventListener).mouseHover(new $wt.events.MouseEvent(a));
break;
}case 31:
{
var b=new $wt.events.TraverseEvent(a);
(this.eventListener).keyTraversed(b);
a.detail=b.detail;
a.doit=b.doit;
break;
}}
},"$wt.widgets.Event");
$_I($wt.events,"ArmListener",$wt.internal.SWTEventListener);
$_I($wt.events,"ControlListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"ControlAdapter",null,$wt.events.ControlListener);
$_V(c$,"controlMoved",
function(a){
},"$wt.events.ControlEvent");
$_V(c$,"controlResized",
function(a){
},"$wt.events.ControlEvent");
$_I($wt.events,"DisposeListener",$wt.internal.SWTEventListener);
$_I($wt.events,"FocusListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"FocusAdapter",null,$wt.events.FocusListener);
$_V(c$,"focusGained",
function(a){
},"$wt.events.FocusEvent");
$_V(c$,"focusLost",
function(a){
},"$wt.events.FocusEvent");
$_I($wt.events,"HelpListener",$wt.internal.SWTEventListener);
$_I($wt.events,"KeyListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"KeyAdapter",null,$wt.events.KeyListener);
$_V(c$,"keyPressed",
function(a){
},"$wt.events.KeyEvent");
$_V(c$,"keyReleased",
function(a){
},"$wt.events.KeyEvent");
$_I($wt.events,"MenuListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"MenuAdapter",null,$wt.events.MenuListener);
$_V(c$,"menuHidden",
function(a){
},"$wt.events.MenuEvent");
$_V(c$,"menuShown",
function(a){
},"$wt.events.MenuEvent");
$_I($wt.events,"ModifyListener",$wt.internal.SWTEventListener);
$_I($wt.events,"MouseListener",$wt.internal.SWTEventListener);
$_I($wt.events,"MouseMoveListener",$wt.internal.SWTEventListener);
$_I($wt.events,"MouseTrackListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"MouseTrackAdapter",null,$wt.events.MouseTrackListener);
$_V(c$,"mouseEnter",
function(a){
},"$wt.events.MouseEvent");
$_V(c$,"mouseExit",
function(a){
},"$wt.events.MouseEvent");
$_V(c$,"mouseHover",
function(a){
},"$wt.events.MouseEvent");
$_I($wt.events,"PaintListener",$wt.internal.SWTEventListener);
$_I($wt.events,"SelectionListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"SelectionAdapter",null,$wt.events.SelectionListener);
$_V(c$,"widgetSelected",
function(a){
},"$wt.events.SelectionEvent");
$_V(c$,"widgetDefaultSelected",
function(a){
},"$wt.events.SelectionEvent");
$_I($wt.events,"ShellListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"ShellAdapter",null,$wt.events.ShellListener);
$_V(c$,"shellActivated",
function(a){
},"$wt.events.ShellEvent");
$_V(c$,"shellClosed",
function(a){
},"$wt.events.ShellEvent");
$_V(c$,"shellDeactivated",
function(a){
},"$wt.events.ShellEvent");
$_V(c$,"shellDeiconified",
function(a){
},"$wt.events.ShellEvent");
$_V(c$,"shellIconified",
function(a){
},"$wt.events.ShellEvent");
$_I($wt.events,"TraverseListener",$wt.internal.SWTEventListener);
$_I($wt.events,"TreeListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.events,"TreeAdapter",null,$wt.events.TreeListener);
$_V(c$,"treeCollapsed",
function(a){
},"$wt.events.TreeEvent");
$_V(c$,"treeExpanded",
function(a){
},"$wt.events.TreeEvent");
$_I($wt.events,"VerifyListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
this.types=null;
this.listeners=null;
this.level=0;
$_Z(this,arguments);
},$wt.widgets,"EventTable");
$_M(c$,"hook",
function(a,b){
if(this.types==null)this.types=$_A(4,0);
if(this.listeners==null)this.listeners=new Array(4);
var c=this.types.length;
var d=c-1;
while(d>=0){
if(this.types[d]!=0)break;
--d;
}
d++;
if(d==c){
var e=$_A(c+4,0);
System.arraycopy(this.types,0,e,0,c);
this.types=e;
var f=new Array(c+4);
System.arraycopy(this.listeners,0,f,0,c);
this.listeners=f;
}this.types[d]=a;
this.listeners[d]=b;
},"~N,$wt.widgets.Listener");
$_M(c$,"hooks",
function(a){
if(this.types==null)return false;
for(var b=0;b<this.types.length;b++){
if(this.types[b]==a)return true;
}
return false;
},"~N");
$_M(c$,"sendEvent",
function(a){
if(this.types==null)return;
this.level+=this.level>=0?1:-1;
try{
for(var b=0;b<this.types.length;b++){
if(a.type==0)return;
if(this.types[b]==a.type){
var c=this.listeners[b];
if(c!=null)c.handleEvent(a);
}}
}finally{
var b=this.level<0;
this.level-=this.level>=0?1:-1;
if(b&&this.level==0){
var c=0;
for(var d=0;d<this.types.length;d++){
if(this.types[d]!=0){
this.types[c]=this.types[d];
this.listeners[c]=this.listeners[d];
c++;
}}
for(var e=c;e<this.types.length;e++){
this.types[e]=0;
this.listeners[e]=null;
}
}}
},"$wt.widgets.Event");
$_M(c$,"size",
function(){
if(this.types==null)return 0;
var a=0;
for(var b=0;b<this.types.length;b++){
if(this.types[b]!=0)a++;
}
return a;
});
$_M(c$,"remove",
function(a){
if(this.level==0){
var b=this.types.length-1;
System.arraycopy(this.types,a+1,this.types,a,b-a);
System.arraycopy(this.listeners,a+1,this.listeners,a,b-a);
a=b;
}else{
if(this.level>0)this.level=-this.level;
}this.types[a]=0;
this.listeners[a]=null;
},"~N");
$_M(c$,"unhook",
function(a,b){
if(this.types==null)return;
for(var c=0;c<this.types.length;c++){
if(this.types[c]==a&&this.listeners[c]==b){
this.remove(c);
return;
}}
},"~N,$wt.widgets.Listener");
$_M(c$,"unhook",
function(a,b){
if(this.types==null)return;
for(var c=0;c<this.types.length;c++){
if(this.types[c]==a){
if($_O(this.listeners[c],$wt.widgets.TypedListener)){
var d=this.listeners[c];
if(d.getEventListener()==b){
this.remove(c);
return;
}}}}
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"releaseResource",
function(){
if(this.listeners!=null){
for(var a=0;a<this.listeners.length;a++){
this.listeners[a]=null;
}
this.listeners=null;
}});
c$=$_C(function(){
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.graphics,"Point",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(a,b){
this.x=a;
this.y=b;
},"~N,~N");
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Point)))return false;
var b=a;
return(b.x==this.x)&&(b.y==this.y);
},"Object");
$_V(c$,"hashCode",
function(){
return this.x^this.y;
});
$_V(c$,"toString",
function(){
return"Point {"+this.x+", "+this.y+"}";
});
$_S(c$,
"serialVersionUID",3257002163938146354);
c$=$_C(function(){
this.x=0;
this.y=0;
this.width=0;
this.height=0;
$_Z(this,arguments);
},$wt.graphics,"Rectangle",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(a,b,c,d){
this.x=a;
this.y=b;
this.width=c;
this.height=d;
},"~N,~N,~N,~N");
$_M(c$,"add",
function(a){
var b=this.x<a.x?this.x:a.x;
var c=this.y<a.y?this.y:a.y;
var d=this.x+this.width;
var e=a.x+a.width;
var f=d>e?d:e;
d=this.y+this.height;
e=a.y+a.height;
var g=d>e?d:e;
this.x=b;
this.y=c;
this.width=f-b;
this.height=g-c;
},"$wt.graphics.Rectangle");
$_M(c$,"contains",
function(a,b){
return(a>=this.x)&&(b>=this.y)&&((a-this.x)<this.width)&&((b-this.y)<this.height);
},"~N,~N");
$_M(c$,"contains",
function(a){
return this.contains(a.x,a.y);
},"$wt.graphics.Point");
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Rectangle)))return false;
var b=a;
return(b.x==this.x)&&(b.y==this.y)&&(b.width==this.width)&&(b.height==this.height);
},"Object");
$_V(c$,"hashCode",
function(){
return this.x^this.y^this.width^this.height;
});
$_M(c$,"intersect",
function(a){
if(this==a)return;
var b=this.x>a.x?this.x:a.x;
var c=this.y>a.y?this.y:a.y;
var d=this.x+this.width;
var e=a.x+a.width;
var f=d<e?d:e;
d=this.y+this.height;
e=a.y+a.height;
var g=d<e?d:e;
this.x=f<b?0:b;
this.y=g<c?0:c;
this.width=f<b?0:f-b;
this.height=g<c?0:g-c;
},"$wt.graphics.Rectangle");
$_M(c$,"intersection",
function(a){
if(this==a)return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
var b=this.x>a.x?this.x:a.x;
var c=this.y>a.y?this.y:a.y;
var d=this.x+this.width;
var e=a.x+a.width;
var f=d<e?d:e;
d=this.y+this.height;
e=a.y+a.height;
var g=d<e?d:e;
return new $wt.graphics.Rectangle(f<b?0:b,g<c?0:c,f<b?0:f-b,g<c?0:g-c);
},"$wt.graphics.Rectangle");
$_M(c$,"intersects",
function(a,b,c,d){
return(a<this.x+this.width)&&(b<this.y+this.height)&&(a+c>this.x)&&(b+d>this.y);
},"~N,~N,~N,~N");
$_M(c$,"intersects",
function(a){
return a==this||this.intersects(a.x,a.y,a.width,a.height);
},"$wt.graphics.Rectangle");
$_M(c$,"isEmpty",
function(){
return(this.width<=0)||(this.height<=0);
});
$_V(c$,"toString",
function(){
return"Rectangle {"+this.x+", "+this.y+", "+this.width+", "+this.height+"}";
});
$_M(c$,"union",
function(a){
var b=this.x<a.x?this.x:a.x;
var c=this.y<a.y?this.y:a.y;
var d=this.x+this.width;
var e=a.x+a.width;
var f=d>e?d:e;
d=this.y+this.height;
e=a.y+a.height;
var g=d>e?d:e;
return new $wt.graphics.Rectangle(b,c,f-b,g-c);
},"$wt.graphics.Rectangle");
$_S(c$,
"serialVersionUID",3256439218279428914);
c$=$_C(function(){
this.red=0;
this.green=0;
this.blue=0;
$_Z(this,arguments);
},$wt.graphics,"RGB",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(a,b,c){
this.red=a;
this.green=b;
this.blue=c;
},"~N,~N,~N");
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.RGB)))return false;
var b=a;
return(b.red==this.red)&&(b.green==this.green)&&(b.blue==this.blue);
},"Object");
$_V(c$,"hashCode",
function(){
return(this.blue<<16)|(this.green<<8)|this.red;
});
$_V(c$,"toString",
function(){
return"RGB {"+this.red+", "+this.green+", "+this.blue+"}";
});
$_S(c$,
"serialVersionUID",3258415023461249074);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.widgets,"Layout");
$_M(c$,"flushCache",
function(a){
return false;
},"$wt.widgets.Control");
c$=$_C(function(){
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.layout,"FillData");
$_M(c$,"computeSize",
function(a,b,c,d){
if(d)this.flushCache();
if(b==-1&&c==-1){
if(this.defaultWidth==-1||this.defaultHeight==-1){
var e=a.computeSize(b,c,d);
this.defaultWidth=e.x;
this.defaultHeight=e.y;
}return new $wt.graphics.Point(this.defaultWidth,this.defaultHeight);
}if(this.currentWidth==-1||this.currentHeight==-1||b!=this.currentWhint||c!=this.currentHhint){
var e=a.computeSize(b,c,d);
this.currentWhint=b;
this.currentHhint=c;
this.currentWidth=e.x;
this.currentHeight=e.y;
}return new $wt.graphics.Point(this.currentWidth,this.currentHeight);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
c$=$_C(function(){
this.width=-1;
this.height=-1;
this.left=null;
this.right=null;
this.top=null;
this.bottom=null;
this.cacheWidth=-1;
this.cacheHeight=-1;
this.defaultWhint=0;
this.defaultHhint=0;
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
this.cacheLeft=null;
this.cacheRight=null;
this.cacheTop=null;
this.cacheBottom=null;
this.isVisited=false;
this.needed=false;
$_Z(this,arguments);
},$wt.layout,"FormData");
$_K(c$,
function(){
});
$_K(c$,
function(a,b){
this.width=a;
this.height=b;
},"~N,~N");
$_M(c$,"computeSize",
function(a,b,c,d){
if(this.cacheWidth!=-1&&this.cacheHeight!=-1)return;
if(b==this.width&&c==this.height){
if(this.defaultWidth==-1||this.defaultHeight==-1||b!=this.defaultWhint||c!=this.defaultHhint){
var e=a.computeSize(b,c,d);
this.defaultWhint=b;
this.defaultHhint=c;
this.defaultWidth=e.x;
this.defaultHeight=e.y;
}this.cacheWidth=this.defaultWidth;
this.cacheHeight=this.defaultHeight;
return;
}if(this.currentWidth==-1||this.currentHeight==-1||b!=this.currentWhint||c!=this.currentHhint){
var e=a.computeSize(b,c,d);
this.currentWhint=b;
this.currentHhint=c;
this.currentWidth=e.x;
this.currentHeight=e.y;
}this.cacheWidth=this.currentWidth;
this.cacheHeight=this.currentHeight;
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.cacheWidth=this.cacheHeight=-1;
this.defaultHeight=this.defaultWidth=-1;
this.currentHeight=this.currentWidth=-1;
});
$_M(c$,"getWidth",
function(a,b){
this.needed=true;
this.computeSize(a,this.width,this.height,b);
return this.cacheWidth;
},"$wt.widgets.Control,~B");
$_M(c$,"getHeight",
function(a,b){
this.computeSize(a,this.width,this.height,b);
return this.cacheHeight;
},"$wt.widgets.Control,~B");
$_M(c$,"getBottomAttachment",
function(a,b,c){
if(this.cacheBottom!=null)return this.cacheBottom;
if(this.isVisited)return this.cacheBottom=new $wt.layout.FormAttachment(0,this.getHeight(a,c));
if(this.bottom==null){
if(this.top==null)return this.cacheBottom=new $wt.layout.FormAttachment(0,this.getHeight(a,c));
return this.cacheBottom=this.getTopAttachment(a,b,c).plus(this.getHeight(a,c));
}var d=this.bottom.control;
if(d!=null){
if(d.isDisposed()){
this.bottom.control=d=null;
}else{
if(d.getParent()!=a.getParent()){
d=null;
}}}if(d==null)return this.cacheBottom=this.bottom;
this.isVisited=true;
var e=d.getLayoutData();
var f=e.getBottomAttachment(d,b,c);
switch(this.bottom.alignment){
case 1024:
this.cacheBottom=f.plus(this.bottom.offset);
break;
case 16777216:
{
var g=e.getTopAttachment(d,b,c);
var h=f.minus(g);
this.cacheBottom=f.minus(h.minus(this.getHeight(a,c)).divide(2));
break;
}default:
{
var g=e.getTopAttachment(d,b,c);
this.cacheBottom=g.plus(this.bottom.offset-b);
break;
}}
this.isVisited=false;
return this.cacheBottom;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getLeftAttachment",
function(a,b,c){
if(this.cacheLeft!=null)return this.cacheLeft;
if(this.isVisited)return this.cacheLeft=new $wt.layout.FormAttachment(0,0);
if(this.left==null){
if(this.right==null)return this.cacheLeft=new $wt.layout.FormAttachment(0,0);
return this.cacheLeft=this.getRightAttachment(a,b,c).minus(this.getWidth(a,c));
}var d=this.left.control;
if(d!=null){
if(d.isDisposed()){
this.left.control=d=null;
}else{
if(d.getParent()!=a.getParent()){
d=null;
}}}if(d==null)return this.cacheLeft=this.left;
this.isVisited=true;
var e=d.getLayoutData();
var f=e.getLeftAttachment(d,b,c);
switch(this.left.alignment){
case 16384:
this.cacheLeft=f.plus(this.left.offset);
break;
case 16777216:
{
var g=e.getRightAttachment(d,b,c);
var h=g.minus(f);
this.cacheLeft=f.plus(h.minus(this.getWidth(a,c)).divide(2));
break;
}default:
{
var g=e.getRightAttachment(d,b,c);
this.cacheLeft=g.plus(this.left.offset+b);
}}
this.isVisited=false;
return this.cacheLeft;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_M(c$,"getRightAttachment",
function(a,b,c){
if(this.cacheRight!=null)return this.cacheRight;
if(this.isVisited)return this.cacheRight=new $wt.layout.FormAttachment(0,this.getWidth(a,c));
if(this.right==null){
if(this.left==null)return this.cacheRight=new $wt.layout.FormAttachment(0,this.getWidth(a,c));
return this.cacheRight=this.getLeftAttachment(a,b,c).plus(this.getWidth(a,c));
}var d=this.right.control;
if(d!=null){
if(d.isDisposed()){
this.right.control=d=null;
}else{
if(d.getParent()!=a.getParent()){
d=null;
}}}if(d==null)return this.cacheRight=this.right;
this.isVisited=true;
var e=d.getLayoutData();
var f=e.getRightAttachment(d,b,c);
switch(this.right.alignment){
case 131072:
this.cacheRight=f.plus(this.right.offset);
break;
case 16777216:
{
var g=e.getLeftAttachment(d,b,c);
var h=f.minus(g);
this.cacheRight=f.minus(h.minus(this.getWidth(a,c)).divide(2));
break;
}default:
{
var g=e.getLeftAttachment(d,b,c);
this.cacheRight=g.plus(this.right.offset-b);
break;
}}
this.isVisited=false;
return this.cacheRight;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getTopAttachment",
function(a,b,c){
if(this.cacheTop!=null)return this.cacheTop;
if(this.isVisited)return this.cacheTop=new $wt.layout.FormAttachment(0,0);
if(this.top==null){
if(this.bottom==null)return this.cacheTop=new $wt.layout.FormAttachment(0,0);
return this.cacheTop=this.getBottomAttachment(a,b,c).minus(this.getHeight(a,c));
}var d=this.top.control;
if(d!=null){
if(d.isDisposed()){
this.top.control=d=null;
}else{
if(d.getParent()!=a.getParent()){
d=null;
}}}if(d==null)return this.cacheTop=this.top;
this.isVisited=true;
var e=d.getLayoutData();
var f=e.getTopAttachment(d,b,c);
switch(this.top.alignment){
case 128:
this.cacheTop=f.plus(this.top.offset);
break;
case 16777216:
{
var g=e.getBottomAttachment(d,b,c);
var h=g.minus(f);
this.cacheTop=f.plus(h.minus(this.getHeight(a,c)).divide(2));
break;
}default:
{
var g=e.getBottomAttachment(d,b,c);
this.cacheTop=g.plus(this.top.offset+b);
break;
}}
this.isVisited=false;
return this.cacheTop;
},"$wt.widgets.Control,~N,~B");
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
if(this.width!=-1)a+="width="+this.width+" ";
if(this.height!=-1)a+="height="+this.height+" ";
if(this.left!=null)a+="left="+this.left+" ";
if(this.right!=null)a+="right="+this.right+" ";
if(this.top!=null)a+="top="+this.top+" ";
if(this.bottom!=null)a+="bottom="+this.bottom+" ";
a=a.trim();
a+="}";
return a;
});
c$=$_C(function(){
this.verticalAlignment=2;
this.horizontalAlignment=1;
this.widthHint=-1;
this.heightHint=-1;
this.horizontalIndent=0;
this.verticalIndent=0;
this.horizontalSpan=1;
this.verticalSpan=1;
this.grabExcessHorizontalSpace=false;
this.grabExcessVerticalSpace=false;
this.minimumWidth=0;
this.minimumHeight=0;
this.exclude=false;
this.cacheWidth=-1;
this.cacheHeight=-1;
this.defaultWhint=0;
this.defaultHhint=0;
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.layout,"GridData");
$_K(c$,
function(){
});
$_K(c$,
function(a){
if((a&2)!=0)this.verticalAlignment=1;
if((a&4)!=0)this.verticalAlignment=2;
if((a&16)!=0)this.verticalAlignment=4;
if((a&8)!=0)this.verticalAlignment=3;
if((a&32)!=0)this.horizontalAlignment=1;
if((a&64)!=0)this.horizontalAlignment=2;
if((a&256)!=0)this.horizontalAlignment=4;
if((a&128)!=0)this.horizontalAlignment=3;
this.grabExcessHorizontalSpace=(a&512)!=0;
this.grabExcessVerticalSpace=(a&1024)!=0;
},"~N");
$_K(c$,
function(a,b,c,d){
this.construct(a,b,c,d,1,1);
},"~N,~N,~B,~B");
$_K(c$,
function(a,b,c,d,e,f){
this.horizontalAlignment=a;
this.verticalAlignment=b;
this.grabExcessHorizontalSpace=c;
this.grabExcessVerticalSpace=d;
this.horizontalSpan=e;
this.verticalSpan=f;
},"~N,~N,~B,~B,~N,~N");
$_K(c$,
function(a,b){
this.widthHint=a;
this.heightHint=b;
},"~N,~N");
$_M(c$,"computeSize",
function(a,b,c,d){
if(this.cacheWidth!=-1&&this.cacheHeight!=-1)return;
if(b==this.widthHint&&c==this.heightHint){
if(this.defaultWidth==-1||this.defaultHeight==-1||b!=this.defaultWhint||c!=this.defaultHhint){
var e=a.computeSize(b,c,d);
this.defaultWhint=b;
this.defaultHhint=c;
this.defaultWidth=e.x;
this.defaultHeight=e.y;
}this.cacheWidth=this.defaultWidth;
this.cacheHeight=this.defaultHeight;
return;
}if(this.currentWidth==-1||this.currentHeight==-1||b!=this.currentWhint||c!=this.currentHhint){
var e=a.computeSize(b,c,d);
this.currentWhint=b;
this.currentHhint=c;
this.currentWidth=e.x;
this.currentHeight=e.y;
}this.cacheWidth=this.currentWidth;
this.cacheHeight=this.currentHeight;
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.cacheWidth=this.cacheHeight=-1;
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
var a="";
switch(this.horizontalAlignment){
case 4:
a="SWT.FILL";
break;
case 1:
a="SWT.BEGINNING";
break;
case 16384:
a="SWT.LEFT";
break;
case 16777224:
a="SWT.END";
break;
case 3:
a="GridData.END";
break;
case 131072:
a="SWT.RIGHT";
break;
case 16777216:
a="SWT.CENTER";
break;
case 2:
a="GridData.CENTER";
break;
default:
a="Undefined "+this.horizontalAlignment;
break;
}
var b="";
switch(this.verticalAlignment){
case 4:
b="SWT.FILL";
break;
case 1:
b="SWT.BEGINNING";
break;
case 128:
b="SWT.TOP";
break;
case 16777224:
b="SWT.END";
break;
case 3:
b="GridData.END";
break;
case 1024:
b="SWT.BOTTOM";
break;
case 16777216:
b="SWT.CENTER";
break;
case 2:
b="GridData.CENTER";
break;
default:
b="Undefined "+this.verticalAlignment;
break;
}
var c=this.getName()+" {";
c+="horizontalAlignment="+a+" ";
if(this.horizontalIndent!=0)c+="horizontalIndent="+this.horizontalIndent+" ";
if(this.horizontalSpan!=1)c+="horizontalSpan="+this.horizontalSpan+" ";
if(this.grabExcessHorizontalSpace)c+="grabExcessHorizontalSpace="+this.grabExcessHorizontalSpace+" ";
if(this.widthHint!=-1)c+="widthHint="+this.widthHint+" ";
if(this.minimumWidth!=0)c+="minimumWidth="+this.minimumWidth+" ";
c+="verticalAlignment="+b+" ";
if(this.verticalIndent!=0)c+="verticalIndent="+this.verticalIndent+" ";
if(this.verticalSpan!=1)c+="verticalSpan="+this.verticalSpan+" ";
if(this.grabExcessVerticalSpace)c+="grabExcessVerticalSpace="+this.grabExcessVerticalSpace+" ";
if(this.heightHint!=-1)c+="heightHint="+this.heightHint+" ";
if(this.minimumHeight!=0)c+="minimumHeight="+this.minimumHeight+" ";
if(this.exclude)c+="exclude="+this.exclude+" ";
c=c.trim();
c+="}";
return c;
});
$_S(c$,
"BEGINNING",1,
"CENTER",2,
"END",3,
"FILL",4,
"VERTICAL_ALIGN_BEGINNING",2,
"VERTICAL_ALIGN_CENTER",4,
"VERTICAL_ALIGN_END",8,
"VERTICAL_ALIGN_FILL",16,
"HORIZONTAL_ALIGN_BEGINNING",32,
"HORIZONTAL_ALIGN_CENTER",64,
"HORIZONTAL_ALIGN_END",128,
"HORIZONTAL_ALIGN_FILL",256,
"GRAB_HORIZONTAL",512,
"GRAB_VERTICAL",1024,
"FILL_VERTICAL",1040,
"FILL_HORIZONTAL",768,
"FILL_BOTH",1808);
c$=$_C(function(){
this.width=-1;
this.height=-1;
this.exclude=false;
$_Z(this,arguments);
},$wt.layout,"RowData");
$_K(c$,
function(){
});
$_K(c$,
function(a,b){
this.width=a;
this.height=b;
},"~N,~N");
$_K(c$,
function(a){
this.construct(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
if(this.width!=-1)a+="width="+this.width+" ";
if(this.height!=-1)a+="height="+this.height+" ";
if(this.exclude)a+="exclude="+this.exclude+" ";
a=a.trim();
a+="}";
return a;
});
c$=$_C(function(){
this.numerator=0;
this.denominator=100;
this.offset=0;
this.control=null;
this.alignment=0;
$_Z(this,arguments);
},$wt.layout,"FormAttachment");
$_K(c$,
function(){
});
$_K(c$,
function(a){
this.construct(a,100,0);
},"~N");
$_K(c$,
function(a,b){
this.construct(a,100,b);
},"~N,~N");
$_K(c$,
function(a,b,c){
this.numerator=a;
this.denominator=b;
this.offset=c;
},"~N,~N,~N");
$_K(c$,
function(a){
this.construct(a,0,-1);
},"$wt.widgets.Control");
$_K(c$,
function(a,b){
this.construct(a,b,-1);
},"$wt.widgets.Control,~N");
$_K(c$,
function(a,b,c){
this.control=a;
this.offset=b;
this.alignment=c;
},"$wt.widgets.Control,~N,~N");
$_M(c$,"divide",
function(a){
return new $wt.layout.FormAttachment(this.numerator,this.denominator*a,Math.floor(this.offset/a));
},"~N");
$_M(c$,"gcd",
function(a,b){
var c;
a=Math.abs(a);
b=Math.abs(b);
if(a<b){
c=a;
a=b;
b=c;
}while(b!=0){
c=a;
a=b;
b=c%b;
}
return a;
},"~N,~N");
$_M(c$,"minus",
function(a){
var b=new $wt.layout.FormAttachment();
b.numerator=this.numerator*a.denominator-this.denominator*a.numerator;
b.denominator=this.denominator*a.denominator;
var c=this.gcd(b.denominator,b.numerator);
b.numerator=Math.floor(b.numerator/c);
b.denominator=Math.floor(b.denominator/c);
b.offset=this.offset-a.offset;
return b;
},"$wt.layout.FormAttachment");
$_M(c$,"minus",
function(a){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset-a);
},"~N");
$_M(c$,"plus",
function(a){
var b=new $wt.layout.FormAttachment();
b.numerator=this.numerator*a.denominator+this.denominator*a.numerator;
b.denominator=this.denominator*a.denominator;
var c=this.gcd(b.denominator,b.numerator);
b.numerator=Math.floor(b.numerator/c);
b.denominator=Math.floor(b.denominator/c);
b.offset=this.offset+a.offset;
return b;
},"$wt.layout.FormAttachment");
$_M(c$,"plus",
function(a){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset+a);
},"~N");
$_M(c$,"solveX",
function(a){
return(Math.floor((this.numerator*a)/this.denominator))+this.offset;
},"~N");
$_M(c$,"solveY",
function(a){
return Math.floor((a-this.offset)*this.denominator/this.numerator);
},"~N");
$_V(c$,"toString",
function(){
var a=this.control!=null?this.control.toString():this.numerator+"/"+this.denominator;
return"{y = ("+a+(this.offset>=0?")x + "+this.offset:")x - "+(-this.offset))+"}";
});
c$=$_C(function(){
this.type=256;
this.marginWidth=0;
this.marginHeight=0;
this.spacing=0;
$_Z(this,arguments);
},$wt.layout,"FillLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.FillLayout,[]);
});
$_K(c$,
function(a){
$_R(this,$wt.layout.FillLayout,[]);
this.type=a;
},"~N");
$_V(c$,"computeSize",
function(a,b,c,d){
var e=a.getChildren();
var f=e.length;
var g=0;
var h=0;
for(var i=0;i<f;i++){
var j=e[i];
var k=b;
var l=c;
if(f>0){
if(this.type==256&&b!=-1){
k=Math.max(0,Math.floor((b-(f-1)*this.spacing)/f));
}if(this.type==512&&c!=-1){
l=Math.max(0,Math.floor((c-(f-1)*this.spacing)/f));
}}var m=this.computeChildSize(j,k,l,d);
g=Math.max(g,m.x);
h=Math.max(h,m.y);
}
var j=0;
var k=0;
if(this.type==256){
j=f*g;
if(f!=0)j+=(f-1)*this.spacing;
k=h;
}else{
j=g;
k=f*h;
if(f!=0)k+=(f-1)*this.spacing;
}j+=this.marginWidth*2;
k+=this.marginHeight*2;
if(b!=-1)j=b;
if(c!=-1)k=c;
return new $wt.graphics.Point(j,k);
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(a,b,c,d){
var e=a.getLayoutData();
if(e==null){
e=new $wt.layout.FillData();
a.setLayoutData(e);
}var f=null;
if(b==-1&&c==-1){
f=e.computeSize(a,b,c,d);
}else{
var g;
var h;
if($_O(a,$wt.widgets.Scrollable)){
var i=(a).computeTrim(0,0,0,0);
g=i.width;
h=i.height;
}else{
g=h=a.getBorderWidth()*2;
}var i=b==-1?b:Math.max(0,b-g);
var j=c==-1?c:Math.max(0,c-h);
f=e.computeSize(a,i,j,d);
}return f;
},"$wt.widgets.Control,~N,~N,~B");
$_V(c$,"flushCache",
function(a){
var b=a.getLayoutData();
if(b!=null)(b).flushCache();
return true;
},"$wt.widgets.Control");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"layout",
function(a,b){
var c=a.getClientArea();
var d=a.getChildren();
var e=d.length;
if(e==0)return;
var f=c.width-this.marginWidth*2;
var g=c.height-this.marginHeight*2;
if(this.type==256){
f-=(e-1)*this.spacing;
var h=c.x+this.marginWidth;
var i=f%e;
var j=c.y+this.marginHeight;
var k=Math.floor(f/e);
for(var l=0;l<e;l++){
var m=d[l];
var n=k;
if(l==0){
n+=Math.floor(i/2);
}else{
if(l==e-1)n+=Math.floor((i+1)/2);
}m.setBounds(h,j,n,g);
h+=n+this.spacing;
}
}else{
g-=(e-1)*this.spacing;
var h=c.x+this.marginWidth;
var i=Math.floor(g/e);
var j=c.y+this.marginHeight;
var k=g%e;
for(var l=0;l<e;l++){
var m=d[l];
var n=i;
if(l==0){
n+=Math.floor(k/2);
}else{
if(l==e-1)n+=Math.floor((k+1)/2);
}m.setBounds(h,j,f,n);
j+=n+this.spacing;
}
}},"$wt.widgets.Composite,~B");
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
a+="type="+((this.type==512)?"SWT.VERTICAL":"SWT.HORIZONTAL")+" ";
if(this.marginWidth!=0)a+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)a+="marginHeight="+this.marginHeight+" ";
if(this.spacing!=0)a+="spacing="+this.spacing+" ";
a=a.trim();
a+="}";
return a;
});
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.marginLeft=0;
this.marginTop=0;
this.marginRight=0;
this.marginBottom=0;
this.spacing=0;
$_Z(this,arguments);
},$wt.layout,"FormLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.FormLayout,[]);
});
$_M(c$,"computeHeight",
function(a,b,c){
var d=b.getTopAttachment(a,this.spacing,c);
var e=b.getBottomAttachment(a,this.spacing,c);
var f=e.minus(d);
if(f.numerator==0){
if(e.numerator==0)return e.offset;
if(e.numerator==e.denominator)return-d.offset;
if(e.offset<=0){
return Math.floor(-d.offset*d.denominator/e.numerator);
}var g=e.denominator-e.numerator;
return Math.floor(e.denominator*e.offset/g);
}return f.solveY(b.getHeight(a,c));
},"$wt.widgets.Control,$wt.layout.FormData,~B");
$_V(c$,"computeSize",
function(a,b,c,d){
var e=this.layout(a,false,0,0,b,c,d);
if(b!=-1)e.x=b;
if(c!=-1)e.y=c;
return e;
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(a){
var b=a.getLayoutData();
if(b!=null)(b).flushCache();
return true;
},"$wt.widgets.Control");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_M(c$,"computeWidth",
function(a,b,c){
var d=b.getLeftAttachment(a,this.spacing,c);
var e=b.getRightAttachment(a,this.spacing,c);
var f=e.minus(d);
if(f.numerator==0){
if(e.numerator==0)return e.offset;
if(e.numerator==e.denominator)return-d.offset;
if(e.offset<=0){
return Math.floor(-d.offset*d.denominator/d.numerator);
}var g=e.denominator-e.numerator;
return Math.floor(e.denominator*e.offset/g);
}return f.solveY(b.getWidth(a,c));
},"$wt.widgets.Control,$wt.layout.FormData,~B");
$_M(c$,"layout",
function(a,b){
var c=a.getClientArea();
var d=c.x+this.marginLeft+this.marginWidth;
var e=c.y+this.marginTop+this.marginHeight;
var f=Math.max(0,c.width-this.marginLeft-2*this.marginWidth-this.marginRight);
var g=Math.max(0,c.height-this.marginLeft-2*this.marginHeight-this.marginBottom);
this.layout(a,true,d,e,f,g,b);
},"$wt.widgets.Composite,~B");
$_M(c$,"layout",
function(a,b,c,d,e,f,g){
var h=a.getChildren();
for(var i=0;i<h.length;i++){
var j=h[i];
var k=j.getLayoutData();
if(k==null)j.setLayoutData(k=new $wt.layout.FormData());
if(g)k.flushCache();
k.cacheLeft=k.cacheRight=k.cacheTop=k.cacheBottom=null;
}
var j=null;
var k=null;
var l=0;
var m=0;
for(var n=0;n<h.length;n++){
var o=h[n];
var p=o.getLayoutData();
if(e!=-1){
p.needed=false;
var q=p.getLeftAttachment(o,this.spacing,g);
var r=p.getRightAttachment(o,this.spacing,g);
var s=q.solveX(e);
var t=r.solveX(e);
if(p.height==-1&&!p.needed){
var u=0;
if($_O(o,$wt.widgets.Scrollable)){
var v=(o).computeTrim(0,0,0,0);
u=v.width;
}else{
u=o.getBorderWidth()*2;
}p.cacheWidth=p.cacheHeight=-1;
var v=Math.max(0,t-s-u);
p.computeSize(o,v,p.height,g);
if(j==null)j=$_A(h.length,false);
j[n]=true;
}l=Math.max(t,l);
if(b){
if(k==null)k=new Array(h.length);
k[n]=new $wt.graphics.Rectangle(0,0,0,0);
k[n].x=c+s;
k[n].width=t-s;
}}else{
l=Math.max(this.computeWidth(o,p,g),l);
}}
for(var o=0;o<h.length;o++){
var p=h[o];
var q=p.getLayoutData();
if(f!=-1){
var r=q.getTopAttachment(p,this.spacing,g).solveX(f);
var s=q.getBottomAttachment(p,this.spacing,g).solveX(f);
m=Math.max(s,m);
if(b){
k[o].y=d+r;
k[o].height=s-r;
}}else{
m=Math.max(this.computeHeight(p,q,g),m);
}}
for(var p=0;p<h.length;p++){
var q=h[p];
var r=q.getLayoutData();
if(j!=null&&j[p])r.cacheWidth=r.cacheHeight=-1;
r.cacheLeft=r.cacheRight=r.cacheTop=r.cacheBottom=null;
}
if(b){
for(var q=0;q<h.length;q++){
h[q].setBounds(k[q]);
}
}l+=this.marginLeft+this.marginWidth*2+this.marginRight;
m+=this.marginTop+this.marginHeight*2+this.marginBottom;
return new $wt.graphics.Point(l,m);
},"$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
if(this.marginWidth!=0)a+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)a+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)a+="marginLeft="+this.marginLeft+" ";
if(this.marginRight!=0)a+="marginRight="+this.marginRight+" ";
if(this.marginTop!=0)a+="marginTop="+this.marginTop+" ";
if(this.marginBottom!=0)a+="marginBottom="+this.marginBottom+" ";
if(this.spacing!=0)a+="spacing="+this.spacing+" ";
a=a.trim();
a+="}";
return a;
});
c$=$_C(function(){
this.numColumns=1;
this.makeColumnsEqualWidth=false;
this.marginWidth=5;
this.marginHeight=5;
this.marginLeft=0;
this.marginTop=0;
this.marginRight=0;
this.marginBottom=0;
this.horizontalSpacing=5;
this.verticalSpacing=5;
$_Z(this,arguments);
},$wt.layout,"GridLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.GridLayout,[]);
});
$_K(c$,
function(a,b){
$_R(this,$wt.layout.GridLayout,[]);
this.numColumns=a;
this.makeColumnsEqualWidth=b;
},"~N,~B");
$_V(c$,"computeSize",
function(a,b,c,d){
var e=this.layout(a,false,0,0,b,c,d);
if(b!=-1)e.x=b;
if(c!=-1)e.y=c;
return e;
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(a){
var b=a.getLayoutData();
if(b!=null)(b).flushCache();
return true;
},"$wt.widgets.Control");
$_M(c$,"getData",
function(a,b,c,d,e,f){
var g=a[b][c];
if(g!=null){
var h=g.getLayoutData();
var i=Math.max(1,Math.min(h.horizontalSpan,e));
var j=Math.max(1,h.verticalSpan);
var k=f?b+j-1:b-j+1;
var l=f?c+i-1:c-i+1;
if(0<=k&&k<d){
if(0<=l&&l<e){
if(g==a[k][l])return h;
}}}return null;
},"~A,~N,~N,~N,~N,~B");
$_M(c$,"layout",
function(a,b){
var c=a.getClientArea();
this.layout(a,true,c.x,c.y,c.width,c.height,b);
},"$wt.widgets.Composite,~B");
$_M(c$,"layout",
function(a,b,c,d,e,f,g){
if(this.numColumns<1){
return new $wt.graphics.Point(this.marginLeft+this.marginWidth*2+this.marginRight,this.marginTop+this.marginHeight*2+this.marginBottom);
}var h=0;
var i=a.getChildren();
for(var j=0;j<i.length;j++){
var k=i[j];
var l=k.getLayoutData();
if(l==null||!l.exclude){
i[h++]=i[j];
}}
for(var k=0;k<h;k++){
var l=i[k];
var m=l.getLayoutData();
if(m==null)l.setLayoutData(m=new $wt.layout.GridData());
if(g)m.flushCache();
m.computeSize(l,m.widthHint,m.heightHint,g);
if(m.grabExcessHorizontalSpace&&m.minimumWidth>0){
if(m.cacheWidth<m.minimumWidth){
var n=0;
if($_O(l,$wt.widgets.Scrollable)){
var o=(l).computeTrim(0,0,0,0);
n=o.width;
}else{
n=l.getBorderWidth()*2;
}m.cacheWidth=m.cacheHeight=-1;
m.computeSize(l,Math.max(0,m.minimumWidth-n),m.heightHint,false);
}}if(m.grabExcessVerticalSpace&&m.minimumHeight>0){
m.cacheHeight=Math.max(m.cacheHeight,m.minimumHeight);
}}
var l=0;
var m=0;
var n=0;
var o=this.numColumns;
var p=$_A(4,o,null);
for(var q=0;q<h;q++){
var r=i[q];
var s=r.getLayoutData();
var t=Math.max(1,Math.min(s.horizontalSpan,o));
var u=Math.max(1,s.verticalSpan);
while(true){
var v=l+u;
if(v>=p.length){
var w=$_A(v+4,o,null);
System.arraycopy(p,0,w,0,p.length);
p=w;
}if(p[l]==null){
p[l]=new Array(o);
}while(m<o&&p[l][m]!=null){
m++;
}
var w=m+t;
if(w<=o){
var x=m;
while(x<w&&p[l][x]==null){
x++;
}
if(x==w)break;
m=x;
}if(m+t>=o){
m=0;
l++;
}}
for(var v=0;v<u;v++){
if(p[l+v]==null){
p[l+v]=new Array(o);
}for(var w=0;w<t;w++){
p[l+v][m+w]=r;
}
}
n=Math.max(n,l+u);
m+=t;
}
var r=e-this.horizontalSpacing*(o-1)-(this.marginLeft+this.marginWidth*2+this.marginRight);
var s=0;
var t=$_A(o,0);
var u=$_A(o,0);
var v=$_A(o,false);
for(var w=0;w<o;w++){
for(var x=0;x<n;x++){
var y=this.getData(p,x,w,n,o,true);
if(y!=null){
var z=Math.max(1,Math.min(y.horizontalSpan,o));
if(z==1){
var A=y.cacheWidth+y.horizontalIndent;
t[w]=Math.max(t[w],A);
if(y.grabExcessHorizontalSpace){
if(!v[w])s++;
v[w]=true;
}if(!y.grabExcessHorizontalSpace||y.minimumWidth!=0){
A=!y.grabExcessHorizontalSpace||y.minimumWidth==-1?y.cacheWidth:y.minimumWidth;
A+=y.horizontalIndent;
u[w]=Math.max(u[w],A);
}}}}
for(var y=0;y<n;y++){
var z=this.getData(p,y,w,n,o,false);
if(z!=null){
var A=Math.max(1,Math.min(z.horizontalSpan,o));
if(A>1){
var B=0;
var C=0;
var D=0;
for(var E=0;E<A;E++){
B+=t[w-E];
C+=u[w-E];
if(v[w-E])D++;
}
if(z.grabExcessHorizontalSpace&&D==0){
s++;
v[w]=true;
}var F=z.cacheWidth+z.horizontalIndent-B-(A-1)*this.horizontalSpacing;
if(F>0){
if(D==0){
t[w]+=F;
}else{
var G=Math.floor(F/D);
var H=F%D;
var I=-1;
for(var J=0;J<A;J++){
if(v[w-J]){
t[I=w-J]+=G;
}}
if(I>-1)t[I]+=H;
}}if(!z.grabExcessHorizontalSpace||z.minimumWidth!=0){
F=!z.grabExcessHorizontalSpace||z.minimumWidth==-1?z.cacheWidth:z.minimumWidth;
F+=z.horizontalIndent-C-(A-1)*this.horizontalSpacing;
if(F>0){
if(D==0){
u[w]+=F;
}else{
var G=Math.floor(F/D);
var H=F%D;
var I=-1;
for(var J=0;J<A;J++){
if(v[w-J]){
u[I=w-J]+=G;
}}
if(I>-1)u[I]+=H;
}}}}}}
}
if(this.makeColumnsEqualWidth){
var x=0;
var y=0;
for(var z=0;z<o;z++){
x=Math.max(x,u[z]);
y=Math.max(y,t[z]);
}
y=e==-1||s==0?y:Math.max(x,Math.floor(r/o));
for(var A=0;A<o;A++){
v[A]=s>0;
t[A]=y;
}
}else{
if(e!=-1&&s>0){
var x=0;
for(var y=0;y<o;y++){
x+=t[y];
}
var z=s;
var A=Math.floor((r-x)/z);
var B=(r-x)%z;
var C=-1;
while(x!=r){
for(var D=0;D<o;D++){
if(v[D]){
if(t[D]+A>u[D]){
t[C=D]=t[D]+A;
}else{
t[D]=u[D];
v[D]=false;
z--;
}}}
if(C>-1)t[C]+=B;
for(var E=0;E<o;E++){
for(var F=0;F<n;F++){
var G=this.getData(p,F,E,n,o,false);
if(G!=null){
var H=Math.max(1,Math.min(G.horizontalSpan,o));
if(H>1){
if(!G.grabExcessHorizontalSpace||G.minimumWidth!=0){
var I=0;
var J=0;
for(var K=0;K<H;K++){
I+=t[E-K];
if(v[E-K])J++;
}
var L=!G.grabExcessHorizontalSpace||G.minimumWidth==-1?G.cacheWidth:G.minimumWidth;
L+=G.horizontalIndent-I-(H-1)*this.horizontalSpacing;
if(L>0){
if(J==0){
t[E]+=L;
}else{
var M=Math.floor(L/J);
var N=L%J;
var O=-1;
for(var P=0;P<H;P++){
if(v[E-P]){
t[O=E-P]+=M;
}}
if(O>-1)t[O]+=N;
}}}}}}
}
if(z==0)break;
x=0;
for(var F=0;F<o;F++){
x+=t[F];
}
A=Math.floor((r-x)/z);
B=(r-x)%z;
C=-1;
}
}}var x=null;
var y=0;
if(e!=-1){
for(var z=0;z<o;z++){
for(var A=0;A<n;A++){
var B=this.getData(p,A,z,n,o,false);
if(B!=null){
if(B.heightHint==-1){
var C=p[A][z];
var D=Math.max(1,Math.min(B.horizontalSpan,o));
var E=0;
for(var F=0;F<D;F++){
E+=t[z-F];
}
E+=(D-1)*this.horizontalSpacing-B.horizontalIndent;
if((E!=B.cacheWidth&&B.horizontalAlignment==4)||(B.cacheWidth>E)){
var G=0;
if($_O(C,$wt.widgets.Scrollable)){
var H=(C).computeTrim(0,0,0,0);
G=H.width;
}else{
G=C.getBorderWidth()*2;
}B.cacheWidth=B.cacheHeight=-1;
B.computeSize(C,Math.max(0,E-G),B.heightHint,false);
if(B.grabExcessVerticalSpace&&B.minimumHeight>0){
B.cacheHeight=Math.max(B.cacheHeight,B.minimumHeight);
}if(x==null)x=new Array(h);
x[y++]=B;
}}}}
}
}var z=f-this.verticalSpacing*(n-1)-(this.marginTop+this.marginHeight*2+this.marginBottom);
s=0;
var A=$_A(n,0);
var B=$_A(n,0);
var C=$_A(n,false);
for(var D=0;D<n;D++){
for(var E=0;E<o;E++){
var F=this.getData(p,D,E,n,o,true);
if(F!=null){
var G=Math.max(1,Math.min(F.verticalSpan,n));
if(G==1){
var H=F.cacheHeight+F.verticalIndent;
A[D]=Math.max(A[D],H);
if(F.grabExcessVerticalSpace){
if(!C[D])s++;
C[D]=true;
}if(!F.grabExcessVerticalSpace||F.minimumHeight!=0){
H=!F.grabExcessVerticalSpace||F.minimumHeight==-1?F.cacheHeight:F.minimumHeight;
H+=F.verticalIndent;
B[D]=Math.max(B[D],H);
}}}}
for(var F=0;F<o;F++){
var G=this.getData(p,D,F,n,o,false);
if(G!=null){
var H=Math.max(1,Math.min(G.verticalSpan,n));
if(H>1){
var I=0;
var J=0;
var K=0;
for(var L=0;L<H;L++){
I+=A[D-L];
J+=B[D-L];
if(C[D-L])K++;
}
if(G.grabExcessVerticalSpace&&K==0){
s++;
C[D]=true;
}var M=G.cacheHeight+G.verticalIndent-I-(H-1)*this.verticalSpacing;
if(M>0){
if(K==0){
A[D]+=M;
}else{
var N=Math.floor(M/K);
var O=M%K;
var P=-1;
for(var Q=0;Q<H;Q++){
if(C[D-Q]){
A[P=D-Q]+=N;
}}
if(P>-1)A[P]+=O;
}}if(!G.grabExcessVerticalSpace||G.minimumHeight!=0){
M=!G.grabExcessVerticalSpace||G.minimumHeight==-1?G.cacheHeight:G.minimumHeight;
M+=G.verticalIndent-J-(H-1)*this.verticalSpacing;
if(M>0){
if(K==0){
B[D]+=M;
}else{
var N=Math.floor(M/K);
var O=M%K;
var P=-1;
for(var Q=0;Q<H;Q++){
if(C[D-Q]){
B[P=D-Q]+=N;
}}
if(P>-1)B[P]+=O;
}}}}}}
}
if(f!=-1&&s>0){
var E=0;
for(var F=0;F<n;F++){
E+=A[F];
}
var G=s;
var H=Math.floor((z-E)/G);
var I=(z-E)%G;
var J=-1;
while(E!=z){
for(var K=0;K<n;K++){
if(C[K]){
if(A[K]+H>B[K]){
A[J=K]=A[K]+H;
}else{
A[K]=B[K];
C[K]=false;
G--;
}}}
if(J>-1)A[J]+=I;
for(var L=0;L<n;L++){
for(var M=0;M<o;M++){
var N=this.getData(p,L,M,n,o,false);
if(N!=null){
var O=Math.max(1,Math.min(N.verticalSpan,n));
if(O>1){
if(!N.grabExcessVerticalSpace||N.minimumHeight!=0){
var P=0;
var Q=0;
for(var R=0;R<O;R++){
P+=A[L-R];
if(C[L-R])Q++;
}
var S=!N.grabExcessVerticalSpace||N.minimumHeight==-1?N.cacheHeight:N.minimumHeight;
S+=N.verticalIndent-P-(O-1)*this.verticalSpacing;
if(S>0){
if(Q==0){
A[L]+=S;
}else{
var T=Math.floor(S/Q);
var U=S%Q;
var V=-1;
for(var W=0;W<O;W++){
if(C[L-W]){
A[V=L-W]+=T;
}}
if(V>-1)A[V]+=U;
}}}}}}
}
if(G==0)break;
E=0;
for(var M=0;M<n;M++){
E+=A[M];
}
H=Math.floor((z-E)/G);
I=(z-E)%G;
J=-1;
}
}if(b){
var E=d+this.marginTop+this.marginHeight;
for(var F=0;F<n;F++){
var G=c+this.marginLeft+this.marginWidth;
for(var H=0;H<o;H++){
var I=this.getData(p,F,H,n,o,true);
if(I!=null){
var J=Math.max(1,Math.min(I.horizontalSpan,o));
var K=Math.max(1,I.verticalSpan);
var L=0;
var M=0;
for(var N=0;N<J;N++){
L+=t[H+N];
}
for(var O=0;O<K;O++){
M+=A[F+O];
}
L+=this.horizontalSpacing*(J-1);
var P=G+I.horizontalIndent;
var Q=Math.min(I.cacheWidth,L);
switch(I.horizontalAlignment){
case 16777216:
case 2:
P+=Math.max(0,Math.floor((L-I.horizontalIndent-Q)/2));
break;
case 131072:
case 16777224:
case 3:
P+=Math.max(0,L-I.horizontalIndent-Q);
break;
case 4:
Q=L-I.horizontalIndent;
break;
}
M+=this.verticalSpacing*(K-1);
var R=E+I.verticalIndent;
var S=Math.min(I.cacheHeight,M);
switch(I.verticalAlignment){
case 16777216:
case 2:
R+=Math.max(0,Math.floor((M-I.verticalIndent-S)/2));
break;
case 1024:
case 16777224:
case 3:
R+=Math.max(0,M-I.verticalIndent-S);
break;
case 4:
S=M-I.verticalIndent;
break;
}
var T=p[F][H];
if(T!=null){
T.setBounds(P,R,Q,S);
}}G+=t[H]+this.horizontalSpacing;
}
E+=A[F]+this.verticalSpacing;
}
}for(var E=0;E<y;E++){
x[E].cacheWidth=x[E].cacheHeight=-1;
}
var F=0;
var G=0;
for(var H=0;H<o;H++){
F+=t[H];
}
for(var I=0;I<n;I++){
G+=A[I];
}
F+=this.horizontalSpacing*(o-1)+this.marginLeft+this.marginWidth*2+this.marginRight;
G+=this.verticalSpacing*(n-1)+this.marginTop+this.marginHeight*2+this.marginBottom;
return new $wt.graphics.Point(F,G);
},"$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
if(this.numColumns!=1)a+="numColumns="+this.numColumns+" ";
if(this.makeColumnsEqualWidth)a+="makeColumnsEqualWidth="+this.makeColumnsEqualWidth+" ";
if(this.marginWidth!=0)a+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)a+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)a+="marginLeft="+this.marginLeft+" ";
if(this.marginRight!=0)a+="marginRight="+this.marginRight+" ";
if(this.marginTop!=0)a+="marginTop="+this.marginTop+" ";
if(this.marginBottom!=0)a+="marginBottom="+this.marginBottom+" ";
if(this.horizontalSpacing!=0)a+="horizontalSpacing="+this.horizontalSpacing+" ";
if(this.verticalSpacing!=0)a+="verticalSpacing="+this.verticalSpacing+" ";
a=a.trim();
a+="}";
return a;
});
c$=$_C(function(){
this.type=256;
this.marginWidth=0;
this.marginHeight=0;
this.spacing=3;
this.wrap=true;
this.pack=true;
this.fill=false;
this.justify=false;
this.marginLeft=3;
this.marginTop=3;
this.marginRight=3;
this.marginBottom=3;
$_Z(this,arguments);
},$wt.layout,"RowLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.RowLayout,[]);
});
$_K(c$,
function(a){
$_R(this,$wt.layout.RowLayout,[]);
this.type=a;
},"~N");
$_M(c$,"computeSize",
function(a,b,c,d){
var e;
if(this.type==256){
e=this.layoutHorizontal(a,false,(b!=-1)&&this.wrap,b,d);
}else{
e=this.layoutVertical(a,false,(c!=-1)&&this.wrap,c,d);
}if(b!=-1)e.x=b;
if(c!=-1)e.y=c;
return e;
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeSize",
function(a,b){
var c=-1;
var d=-1;
var e=a.getLayoutData();
if(e!=null){
c=e.width;
d=e.height;
}return a.computeSize(c,d,b);
},"$wt.widgets.Control,~B");
$_V(c$,"flushCache",
function(a){
return true;
},"$wt.widgets.Control");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"layout",
function(a,b){
var c=a.getClientArea();
if(this.type==256){
this.layoutHorizontal(a,true,this.wrap,c.width,b);
}else{
this.layoutVertical(a,true,this.wrap,c.height,b);
}},"$wt.widgets.Composite,~B");
$_M(c$,"layoutHorizontal",
function(a,b,c,d,e){
var f=0;
var g=a.getChildren();
for(var h=0;h<g.length;h++){
var i=g[h];
var j=i.getLayoutData();
if(j==null||!j.exclude){
g[f++]=g[h];
}}
var i=0;
var j=0;
var k=0;
if(!this.pack){
for(var l=0;l<f;l++){
var m=g[l];
var n=this.computeSize(m,e);
i=Math.max(i,n.x);
j=Math.max(j,n.y);
}
k=j;
}var l=0;
var m=0;
if(b){
var n=a.getClientArea();
l=n.x;
m=n.y;
}var n=null;
var o=false;
var p=null;
if(b&&(this.justify||this.fill)){
p=new Array(f);
n=$_A(f,0);
}var q=0;
var r=this.marginLeft+this.marginWidth;
var s=this.marginTop+this.marginHeight;
for(var t=0;t<f;t++){
var u=g[t];
if(this.pack){
var v=this.computeSize(u,e);
i=v.x;
j=v.y;
}if(c&&(t!=0)&&(r+i>d)){
o=true;
if(b&&(this.justify||this.fill))n[t-1]=k;
r=this.marginLeft+this.marginWidth;
s+=this.spacing+k;
if(this.pack)k=0;
}if(this.pack||this.fill){
k=Math.max(k,j);
}if(b){
var v=r+l;
var w=s+m;
if(this.justify||this.fill){
p[t]=new $wt.graphics.Rectangle(v,w,i,j);
}else{
u.setBounds(v,w,i,j);
}}r+=this.spacing+i;
q=Math.max(q,r);
}
q=Math.max(l+this.marginLeft+this.marginWidth,q-this.spacing);
if(!o)q+=this.marginRight+this.marginWidth;
if(b&&(this.justify||this.fill)){
var u=0;
var v=0;
if(!o){
u=Math.max(0,Math.floor((d-q)/(f+1)));
v=Math.max(0,Math.floor(((d-q)%(f+1))/2));
}else{
if(this.fill||this.justify){
var w=0;
if(f>0)n[f-1]=k;
for(var x=0;x<f;x++){
if(n[x]!=0){
var y=x-w+1;
if(this.justify){
var z=0;
for(var A=w;A<=x;A++){
z+=p[A].width+this.spacing;
}
u=Math.max(0,Math.floor((d-z)/(y+1)));
v=Math.max(0,Math.floor(((d-z)%(y+1))/2));
}for(var z=w;z<=x;z++){
if(this.justify)p[z].x+=(u*(z-w+1))+v;
if(this.fill)p[z].height=n[x];
}
w=x+1;
}}
}}for(var w=0;w<f;w++){
if(!o){
if(this.justify)p[w].x+=(u*(w+1))+v;
if(this.fill)p[w].height=k;
}g[w].setBounds(p[w]);
}
}return new $wt.graphics.Point(q,s+k+this.marginBottom+this.marginHeight);
},"$wt.widgets.Composite,~B,~B,~N,~B");
$_M(c$,"layoutVertical",
function(a,b,c,d,e){
var f=0;
var g=a.getChildren();
for(var h=0;h<g.length;h++){
var i=g[h];
var j=i.getLayoutData();
if(j==null||!j.exclude){
g[f++]=g[h];
}}
var i=0;
var j=0;
var k=0;
if(!this.pack){
for(var l=0;l<f;l++){
var m=g[l];
var n=this.computeSize(m,e);
i=Math.max(i,n.x);
j=Math.max(j,n.y);
}
k=i;
}var l=0;
var m=0;
if(b){
var n=a.getClientArea();
l=n.x;
m=n.y;
}var n=null;
var o=false;
var p=null;
if(b&&(this.justify||this.fill)){
p=new Array(f);
n=$_A(f,0);
}var q=0;
var r=this.marginLeft+this.marginWidth;
var s=this.marginTop+this.marginHeight;
for(var t=0;t<f;t++){
var u=g[t];
if(this.pack){
var v=this.computeSize(u,e);
i=v.x;
j=v.y;
}if(c&&(t!=0)&&(s+j>d)){
o=true;
if(b&&(this.justify||this.fill))n[t-1]=k;
r+=this.spacing+k;
s=this.marginTop+this.marginHeight;
if(this.pack)k=0;
}if(this.pack||this.fill){
k=Math.max(k,i);
}if(b){
var v=r+l;
var w=s+m;
if(this.justify||this.fill){
p[t]=new $wt.graphics.Rectangle(v,w,i,j);
}else{
u.setBounds(v,w,i,j);
}}s+=this.spacing+j;
q=Math.max(q,s);
}
q=Math.max(m+this.marginTop+this.marginHeight,q-this.spacing);
if(!o)q+=this.marginBottom+this.marginHeight;
if(b&&(this.justify||this.fill)){
var u=0;
var v=0;
if(!o){
u=Math.max(0,Math.floor((d-q)/(f+1)));
v=Math.max(0,Math.floor(((d-q)%(f+1))/2));
}else{
if(this.fill||this.justify){
var w=0;
if(f>0)n[f-1]=k;
for(var x=0;x<f;x++){
if(n[x]!=0){
var y=x-w+1;
if(this.justify){
var z=0;
for(var A=w;A<=x;A++){
z+=p[A].height+this.spacing;
}
u=Math.max(0,Math.floor((d-z)/(y+1)));
v=Math.max(0,Math.floor(((d-z)%(y+1))/2));
}for(var z=w;z<=x;z++){
if(this.justify)p[z].y+=(u*(z-w+1))+v;
if(this.fill)p[z].width=n[x];
}
w=x+1;
}}
}}for(var w=0;w<f;w++){
if(!o){
if(this.justify)p[w].y+=(u*(w+1))+v;
if(this.fill)p[w].width=k;
}g[w].setBounds(p[w]);
}
}return new $wt.graphics.Point(r+k+this.marginRight+this.marginWidth,q);
},"$wt.widgets.Composite,~B,~B,~N,~B");
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
a+="type="+((this.type!=256)?"SWT.VERTICAL":"SWT.HORIZONTAL")+" ";
if(this.marginWidth!=0)a+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)a+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)a+="marginLeft="+this.marginLeft+" ";
if(this.marginTop!=0)a+="marginTop="+this.marginTop+" ";
if(this.marginRight!=0)a+="marginRight="+this.marginRight+" ";
if(this.marginBottom!=0)a+="marginBottom="+this.marginBottom+" ";
if(this.spacing!=0)a+="spacing="+this.spacing+" ";
a+="wrap="+this.wrap+" ";
a+="pack="+this.pack+" ";
a+="fill="+this.fill+" ";
a+="justify="+this.justify+" ";
a=a.trim();
a+="}";
return a;
});
