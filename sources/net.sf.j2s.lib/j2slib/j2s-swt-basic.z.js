/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=org/eclipse/swt/SWT.js,org/eclipse/swt/SWTError.js,org/eclipse/swt/SWTException.js,org/eclipse/swt/internal/SWTEventListener.js,org/eclipse/swt/internal/SWTEventObject.js,org/eclipse/swt/internal/SerializableCompatibility.js,org/eclipse/swt/internal/CloneableCompatibility.js,org/eclipse/swt/internal/RunnableCompatibility.js,org/eclipse/swt/accessibility/Accessible.js,org/eclipse/swt/graphics/Point.js,org/eclipse/swt/graphics/Rectangle.js,org/eclipse/swt/graphics/RGB.js,org/eclipse/swt/graphics/GC.js,org/eclipse/swt/graphics/Resource.js,org/eclipse/swt/graphics/Color.js,org/eclipse/swt/graphics/Cursor.js,org/eclipse/swt/graphics/Drawable.js,org/eclipse/swt/graphics/Device.js,org/eclipse/swt/graphics/ImageData.js,org/eclipse/swt/graphics/ImageLoader.js,org/eclipse/swt/graphics/Image.js,org/eclipse/swt/graphics/Font.js,org/eclipse/swt/graphics/FontData.js,org/eclipse/swt/graphics/FontMetrics.js,org/eclipse/swt/internal/struct/WINDOWPOS.js,org/eclipse/swt/internal/struct/MESSAGE.js
=*/
$_J("org.eclipse.swt");
$wt=org.eclipse.swt;
var swtSubPackages=[
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
for(var i=0;i<swtSubPackages.length;i++){
$_J("org.eclipse.swt."+swtSubPackages[i]);
}
Clazz.formatParameters=function(funParams){
if(funParams==null||funParams.length==0){
return"\\void";
}else{
var s=funParams.toString();
s=s.replace(/~([NABSO])/g,function($0,$1){
if($1=='N'){
return"Number";
}else if($1=='B'){
return"Boolean"
}else if($1=='S'){
return"String";
}else if($1=='O'){
return"Object";
}else if($1=='A'){
return"Array"
}
return"Unknown";
});
return s.replace(/^|,/g,"\\").replace(/\$/g,"org.eclipse.s");


}
};
$WT=c$=$_C(function(){
$_Z(this,arguments);
},$wt,"SWT");
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
function(message){
this.construct(1,message);
},"~S");
$_K(c$,
function(code){
this.construct(code,$WT.findErrorText(code));
},"~N");
$_K(c$,
function(code,message){
$_R(this,$wt.SWTError,[message]);
this.code=code;
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
if(typeof window["RuntimeException"]!="undefined"){c$=$_C(function(){
this.code=0;
this.throwable=null;
$_Z(this,arguments);
},$wt,"SWTException",RuntimeException);
$_K(c$,
function(){
this.construct(1);
});
$_K(c$,
function(message){
this.construct(1,message);
},"~S");
$_K(c$,
function(code){
this.construct(code,$WT.findErrorText(code));
},"~N");
$_K(c$,
function(code,message){
$_R(this,$wt.SWTException,[message]);
this.code=code;
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

}
$_I($wt.internal,"SWTEventListener",java.util.EventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal,"SWTEventObject",java.util.EventObject);
$_K(c$,
function(source){
$_R(this,$wt.internal.SWTEventObject,[source]);
},"~O");
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
function(event){
this.event=event;
},"~O");
$_M(c$,"toReturn",
function(val){
this.returnSet=1;
this.returnNumber=val;
this.returnObject=null;
},"~N");
$_M(c$,"toReturn",
function(val){
this.returnSet=2;
this.returnBoolean=val;
this.returnNumber=0;
this.returnObject=null;
},"~B");
$_M(c$,"toReturn",
function(val){
this.returnSet=3;
this.returnObject=val;
this.returnNumber=0;
this.returnBoolean=false;
},"~O");
$_M(c$,"isReturned",
function(){
return this.returnSet!=0;
});
c$=$_C(function(){
this.accessibleListeners=null;
this.accessibleControlListeners=null;
this.textListeners=null;
this.control=null;
$_Z(this,arguments);
},$wt.accessibility,"Accessible");
$_Y(c$,function(){
this.accessibleListeners=new java.util.Vector();
this.accessibleControlListeners=new java.util.Vector();
this.textListeners=new java.util.Vector();
});
$_M(c$,"addAccessibleListener",
function(listener){
this.accessibleListeners.addElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"addAccessibleControlListener",
function(listener){
this.accessibleControlListeners.addElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"addAccessibleTextListener",
function(listener){
this.textListeners.addElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"removeAccessibleListener",
function(listener){
this.accessibleListeners.removeElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"removeAccessibleControlListener",
function(listener){
this.accessibleControlListeners.removeElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"removeAccessibleTextListener",
function(listener){
this.textListeners.removeElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"selectionChanged",
function(){
});
$_M(c$,"setFocus",
function(childID){
},"~N");
$_M(c$,"textCaretMoved",
function(index){
},"~N");
$_M(c$,"textChanged",
function(type,startIndex,length){
},"~N,~N,~N");
$_M(c$,"textSelectionChanged",
function(){
});
c$=$_C(function(){
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.graphics,"Point",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(x,y){
this.x=x;
this.y=y;
},"~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Point)))return false;
var p=object;
return(p.x==this.x)&&(p.y==this.y);
},"~O");
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
function(x,y,width,height){
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},"~N,~N,~N,~N");
$_M(c$,"add",
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
this.x=left;
this.y=top;
this.width=right-left;
this.height=bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"contains",
function(x,y){
return(x>=this.x)&&(y>=this.y)&&((x-this.x)<this.width)&&((y-this.y)<this.height);
},"~N,~N");
$_M(c$,"contains",
function(pt){
return this.contains(pt.x,pt.y);
},"$wt.graphics.Point");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Rectangle)))return false;
var r=object;
return(r.x==this.x)&&(r.y==this.y)&&(r.width==this.width)&&(r.height==this.height);
},"~O");
$_V(c$,"hashCode",
function(){
return this.x^this.y^this.width^this.height;
});
$_M(c$,"intersect",
function(rect){
if(this==rect)return;
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
this.x=right<left?0:left;
this.y=bottom<top?0:top;
this.width=right<left?0:right-left;
this.height=bottom<top?0:bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"intersection",
function(rect){
if(this==rect)return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
return new $wt.graphics.Rectangle(right<left?0:left,bottom<top?0:top,right<left?0:right-left,bottom<top?0:bottom-top);
},"$wt.graphics.Rectangle");
$_M(c$,"intersects",
function(x,y,width,height){
return(x<this.x+this.width)&&(y<this.y+this.height)&&(x+width>this.x)&&(y+height>this.y);
},"~N,~N,~N,~N");
$_M(c$,"intersects",
function(rect){
return rect==this||this.intersects(rect.x,rect.y,rect.width,rect.height);
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
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
return new $wt.graphics.Rectangle(left,top,right-left,bottom-top);
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
function(red,green,blue){
this.red=red;
this.green=green;
this.blue=blue;
},"~N,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.RGB)))return false;
var rgb=object;
return(rgb.red==this.red)&&(rgb.green==this.green)&&(rgb.blue==this.blue);
},"~O");
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
this.handle=null;
this.bgColor=null;
this.fgColor=null;
this.font=null;
this.drawable=null;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"GC",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.GC,[]);
});
$_K(c$,
function(drawable){
this.construct(drawable,0);
},"$wt.graphics.Drawable");
$_K(c$,
function(drawable,style){
$_R(this,$wt.graphics.GC,[]);
if($_O(drawable,$wt.widgets.Control)){
var ctrl=drawable;
this.handle=ctrl.handle;
}else if($_O(drawable,$wt.graphics.Image)){
var img=drawable;
this.handle=img.handle;
}else{
this.handle=d$.createElement("DIV");
this.handle.style.position="absolute";
}},"$wt.graphics.Drawable,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&33554432)!=0)style&=-67108865;
return style&(100663296);
},"~N");
$_M(c$,"copyArea",
function(image,x,y){
},"$wt.graphics.Image,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY){
this.copyArea(srcX,srcY,width,height,destX,destY,true);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY,paint){
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"createGdipBrush",
function(){
return 0;
});
$_M(c$,"createGdipFont",
function(){
return 0;
});
c$.createGdipFont=$_M(c$,"createGdipFont",
function(hDC,hFont){
return 0;
},"~N,~N");
$_M(c$,"createGdipPen",
function(){
return 0;
});
$_M(c$,"destroyGdipBrush",
function(brush){
},"~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.data==null||this.data.device==null||this.data.device.isDisposed())return;
});
$_M(c$,"drawArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawFocus",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"drawImage",
function(image,x,y){
if(image.handle!=null){
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}},"$wt.graphics.Image,~N,~N");
$_M(c$,"drawImage",
function(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight){
if(srcWidth==0||srcHeight==0||destWidth==0||destHeight==0)return;
this.drawImage(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,false);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawImage",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
var rect=d$.createElement("IMG");
rect.src=srcImage.url;
rect.style.position="absolute";
rect.style.fontSize="0px";
rect.style.left=destX+"px";
rect.style.top=destY+"px";
rect.style.width=destWidth+"px";
rect.style.height=destHeight+"px";
this.handle.appendChild(rect);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawIcon",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmap",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmapTransparentByClipping",
function(srcHdc,maskHdc,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight){
},"~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N");
$_M(c$,"drawBitmapMask",
function(srcImage,srcColor,srcMask,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight,offscreen){
var srcColorY=srcY;
if(srcColor==0){
srcColor=srcMask;
srcColorY+=imgHeight;
}},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N,~B");
$_M(c$,"drawLine",
function(x1,y1,x2,y2){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0px";
if(x1==x2){
rect.style.left=x1+"px";
rect.style.borderLeftStyle="solid";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
}else if(y1==y2){
rect.style.top=x1+"px";
rect.style.borderTopStyle="solid";
rect.style.left=Math.min(x1,x2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
}else{
rect.style.left=Math.min(x1,x2)+"px";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
rect.style.borderStyle="solid";
}rect.style.borderColor=this.fgColor.getCSSHandle();
rect.style.borderWidth="1px";
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"drawOval",
function(x,y,width,height){
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N");
$_M(c$,"drawPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"drawPoint",
function(x,y){
},"~N,~N");
$_M(c$,"drawPolygon",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawPolyline",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawRectangle",
function(x,y,width,height){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0px";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.width=width+"px";
rect.style.height=height+"px";
if(this.fgColor!=null)rect.style.borderColor=this.fgColor.getCSSHandle();
rect.style.borderStyle="solid";
rect.style.borderWidth="1px";
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"drawRectangle",
function(rect){
this.drawRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"drawRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
if(this.data.gdipGraphics!=0){
this.initGdip(true,false);
this.drawRoundRectangleGdip(this.data.gdipGraphics,this.data.gdipPen,x,y,width,height,arcWidth,arcHeight);
return;
}},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawString",
function(string,x,y){
this.drawString(string,x,y,false);
},"~S,~N,~N");
$_M(c$,"drawString",
function(string,x,y,isTransparent){
var length=string.length;
if(length==0)return;
if(length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if(!isTransparent){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y){
this.drawText(string,x,y,6);
},"~S,~N,~N");
$_M(c$,"drawText",
function(string,x,y,isTransparent){
var flags=6;
if(isTransparent)flags|=1;
this.drawText(string,x,y,flags);
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y,flags){
if(string.length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if((flags&1)==0){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}rect.style.color=this.fgColor.getCSSHandle();
this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~N");
$_V(c$,"equals",
function(object){
return(object==this)||(($_O(object,$wt.graphics.GC))&&(this.handle==(object).handle));
},"~O");
$_M(c$,"fillArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillGradientRectangle",
function(x,y,width,height,vertical){
if(width==0||height==0)return;
if(width==0||height==0)return;
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~B");
$_M(c$,"fillOval",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"fillPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"fillPolygon",
function(pointArray){
},"~A");
$_M(c$,"fillRectangle",
function(x,y,width,height){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.width=width+"px";
rect.style.height=height+"px";
rect.style.backgroundColor=this.bgColor.getCSSHandle();
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"fillRectangle",
function(rect){
this.fillRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"fillRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"flush",
function(){
});
$_M(c$,"getAdvanceWidth",
function(ch){
return 0;
},"~N");
$_M(c$,"getAdvanced",
function(){
return this.data.gdipGraphics!=0;
});
$_M(c$,"getAlpha",
function(){
return this.data.alpha;
});
$_M(c$,"getAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getBackground",
function(){
if(this.bgColor==null){
this.bgColor=new $wt.graphics.Color(null,"white");
}return this.bgColor;
});
$_M(c$,"getBackgroundPattern",
function(){
return this.data.backgroundPattern;
});
$_M(c$,"getCharWidth",
function(ch){
return 8;
},"~N");
$_M(c$,"getClipping",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClipping",
function(region){
},"$wt.graphics.Region");
$_M(c$,"getCodePage",
function(){
return 0;
});
$_M(c$,"getFillRule",
function(){
return 4;
});
$_M(c$,"getFont",
function(){
return null;
});
$_M(c$,"getFontMetrics",
function(){
return new $wt.graphics.FontMetrics();
});
$_M(c$,"getForeground",
function(){
if(this.fgColor==null){
this.fgColor=new $wt.graphics.Color(null,"black");
}return this.fgColor;
});
$_M(c$,"getForegroundPattern",
function(){
return this.data.foregroundPattern;
});
$_M(c$,"getInterpolation",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getLineCap",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineDash",
function(){
if(this.data.dashes==null)return null;
var dashes=$_A(this.data.dashes.length,0);
System.arraycopy(this.data.dashes,0,dashes,0,dashes.length);
return dashes;
});
$_M(c$,"getLineJoin",
function(){
var style;
var size;
return 3;
});
$_M(c$,"getLineStyle",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineWidth",
function(){
var size;
return 1;
});
$_M(c$,"getStyle",
function(){
return this.data.style;
});
$_M(c$,"getTextAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getTransform",
function(transform){
},"$wt.graphics.Transform");
$_M(c$,"getXORMode",
function(){
var rop2=0;
return false;
});
$_M(c$,"initGdip",
function(draw,fill){
},"~B,~B");
$_M(c$,"init",
function(drawable,data,hDC){
var foreground=data.foreground;
},"$wt.graphics.Drawable,$wt.graphics.GCData,~N");
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_M(c$,"isClipped",
function(){
return false;
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_M(c$,"measureSpace",
function(font,format){
return 1.0;
},"~N,~N");
$_M(c$,"setAdvanced",
function(advanced){
if(advanced&&this.data.gdipGraphics!=0)return;
if(advanced){
try{
this.initGdip(false,false);
}catch(e){
if($_O(e,$wt.SWTException)){
}else{
throw e;
}
}
}else{
}},"~B");
$_M(c$,"setAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
},"~N");
$_M(c$,"setAlpha",
function(alpha){
if(this.data.gdipGraphics==0&&(alpha&0xFF)==0xFF)return;
this.initGdip(false,false);
this.data.alpha=alpha&0xFF;
},"~N");
$_M(c$,"setBackground",
function(color){
this.bgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setBackgroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
this.initGdip(false,false);
if(this.data.gdipBrush!=0)this.destroyGdipBrush(this.data.gdipBrush);
this.data.backgroundPattern=pattern;
},"$wt.graphics.Pattern");
$_M(c$,"setClipping",
function(clipRgn){
var hRgn=clipRgn;
var gdipGraphics=this.data.gdipGraphics;
},"~N");
$_M(c$,"setClipping",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"setClipping",
function(path){
this.setClipping(0);
},"$wt.graphics.Path");
$_M(c$,"setClipping",
function(rect){
if(rect==null){
this.setClipping(0);
}else{
this.setClipping(rect.x,rect.y,rect.width,rect.height);
}},"$wt.graphics.Rectangle");
$_M(c$,"setClipping",
function(region){
this.setClipping(region!=null?region.handle:0);
},"$wt.graphics.Region");
$_M(c$,"setFillRule",
function(rule){
},"~N");
$_M(c$,"setFont",
function(font){
if(font==null){
font=$wt.widgets.Display.getDefault().getSystemFont();
}else{
this.font=font;
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.fgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setForegroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
},"$wt.graphics.Pattern");
$_M(c$,"setInterpolation",
function(interpolation){
if(this.data.gdipGraphics==0&&interpolation==-1)return;
var mode=0;
},"~N");
$_M(c$,"setLineCap",
function(cap){
var capStyle=0;
this.setPen(-1,-1,-1,capStyle,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineDash",
function(dashes){
if(dashes!=null&&dashes.length>0){
this.data.dashes=$_A(dashes.length,0);
for(var i=0;i<dashes.length;i++){
var dash=dashes[i];
this.data.dashes[i]=dash;
}
}else{
this.data.dashes=null;
}},"~A");
$_M(c$,"setLineJoin",
function(join){
var joinStyle=0;
this.setPen(-1,-1,-1,-1,joinStyle,this.data.dashes);
},"~N");
$_M(c$,"setLineStyle",
function(lineStyle){
var style=-1;
this.setPen(-1,-1,style,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineWidth",
function(lineWidth){
this.setPen(-1,lineWidth,-1,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setPen",
function(newColor,newWidth,lineStyle,capStyle,joinStyle,dashes){
var extPen=false;
var changed=false;
},"~N,~N,~N,~N,~N,~A");
$_M(c$,"setXORMode",
function(xor){
},"~B");
$_M(c$,"setTextAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
var textMode=0;
},"~N");
$_M(c$,"setTransform",
function(transform){
if(this.data.gdipGraphics==0&&transform==null)return;
},"$wt.graphics.Transform");
$_M(c$,"stringExtent",
function(string){
var length=string.length;
if(length==0){
return new $wt.graphics.Point(0,16);
}else{
return O$.getStringPlainSize(string);
}},"~S");
$_M(c$,"textExtent",
function(string){
return this.textExtent(string,6);
},"~S");
$_M(c$,"textExtent",
function(string,flags){
if(string.length==0){
return new $wt.graphics.Point(0,16);
}else{
return O$.getStringPlainSize(string);
}},"~S,~N");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"GC {*DISPOSED*}";
return"GC {"+this.handle+"}";
});
$_S(c$,
"LINE_DOT_ZERO",[3,3],
"LINE_DASH_ZERO",[18,6],
"LINE_DASHDOT_ZERO",[9,6,3,6],
"LINE_DASHDOTDOT_ZERO",[9,3,3,3,3,3]);
c$=$_C(function(){
this.device=null;
$_Z(this,arguments);
},$wt.graphics,"Resource");
c$=$_C(function(){
this.handle=0;
this.cssHandle=null;
$_Z(this,arguments);
},$wt.graphics,"Color",$wt.graphics.Resource);
$_K(c$,
function(device,red,green,blue){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,red,green,blue);
},"$wt.graphics.Device,~N,~N,~N");
$_K(c$,
function(device,rgb){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,rgb.red,rgb.green,rgb.blue);
},"$wt.graphics.Device,$wt.graphics.RGB");
$_V(c$,"dispose",
function(){
if(this.handle==-1)return;
if(this.device.isDisposed())return;
this.handle=-1;
this.cssHandle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Color)))return false;
var color=object;
if(this.device!=color.device)return false;
if(this.cssHandle!=null&&color.cssHandle!=null){
return this.cssHandle==color.cssHandle;
}else if(this.cssHandle!=null){
return(this.rgbHandleFromCSS(this.cssHandle)&0xFFFFFF)==(color.handle&0xFFFFFF);
}else if(color.cssHandle!=null){
return(this.rgbHandleFromCSS(color.cssHandle)&0xFFFFFF)==(this.handle&0xFFFFFF);
}else{
return(this.handle&0xFFFFFF)==(color.handle&0xFFFFFF);
}},"~O");
$_M(c$,"getBlue",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF0000)>>16;
});
$_M(c$,"getGreen",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF00)>>8;
});
$_M(c$,"getRed",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return this.handle&0xFF;
});
$_M(c$,"getRGB",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return new $wt.graphics.RGB(this.handle&0xFF,(this.handle&0xFF00)>>8,(this.handle&0xFF0000)>>16);
});
$_V(c$,"hashCode",
function(){
return this.handle;
});
$_M(c$,"init",
function(device,red,green,blue){
this.device=device;
this.handle=0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
this.cssHandle=null;
},"$wt.graphics.Device,~N,~N,~N");
$_V(c$,"isDisposed",
function(){
return this.handle==-1;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Color {*DISPOSED*}";
if(this.cssHandle!=null)return"Color {\"" + this.cssHandle + "\"}";
return"Color {"+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.cssHandle=handle;
this.handle=-2;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"rgbHandleFromCSS",
($fz=function(cssHandle){
if(cssHandle==null)return 0x02000000;
var red=-1;
var green=-1;
var blue=-1;
{
cssHandle.replace(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,function($0,$1,$2,$3){
red=parseInt($1);
green=parseInt($2);
blue=parseInt($3);
return $0;
});
}if(red!=-1&&green!=-1&&blue!=-1){
return 0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
}else{
var intHandle=-2;
{
cssHandle.replace(/#([0-9a-fA-F]{3,6})/,function($0,$1){
if($1.length==3){
var r=$1.charAt(0);
var g=$1.charAt(1);
var b=$1.charAt(2);
intHandle=eval("0x"+b+b+g+g+r+r);
}else if($1.length==6){
intHandle=eval("0x"+$1.substring(4,6)+$1.substring(2,4)+$1.substring(0,2));
}else{

$WT.error(4);
}
});
}if(intHandle!=-2){
return 0x02000000|intHandle;
}else{
return 0x0F000000;
}}},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getCSSHandle",
function(){
if(this.cssHandle!=null)return this.cssHandle;
return"rgb("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+")";
});
$_M(c$,"isPlatformSpecific",
function(){
if((this.handle<0||this.handle==0x0F000000)&&this.cssHandle!=null){
return this.rgbHandleFromCSS(this.cssHandle)==0x0F000000;
}return false;
});
c$=$_C(function(){
this.handle=null;
$_Z(this,arguments);
},$wt.graphics,"Cursor",$wt.graphics.Resource);
$_K(c$,
function(device,style){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
switch(style){
case 21:
this.handle="pointer";
break;
case 0:
this.handle="default";
break;
case 1:
this.handle="wait";
break;
case 2:
this.handle="crosshair";
break;
case 3:
this.handle="progress";
break;
case 4:
this.handle="help";
break;
case 5:
this.handle="move";
break;
case 6:
this.handle="move";
break;
case 7:
this.handle="s-resize";
break;
case 8:
this.handle="move";
break;
case 9:
this.handle="e-resize";
break;
case 10:
this.handle="n-resize";
break;
case 11:
this.handle="s-resize";
break;
case 12:
this.handle="e-resize";
break;
case 13:
this.handle="w-resize";
break;
case 14:
this.handle="ne-resize";
break;
case 15:
this.handle="se-resize";
break;
case 16:
this.handle="sw-resize";
break;
case 17:
this.handle="nw-resize";
break;
case 18:
this.handle="default";
break;
case 19:
this.handle="text";
break;
case 20:
this.handle="auto";
break;
default:
$WT.error(5);
}
},"$wt.graphics.Device,~N");
$_K(c$,
function(device,source,mask,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData,~N,~N");
$_K(c$,
function(device,source,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,~N,~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.device.isDisposed())return;
this.handle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Cursor)))return false;
var cursor=object;
return this.device==cursor.device&&this.handle==cursor.handle;
},"~O");
$_V(c$,"hashCode",
function(){
return this.handle.hashCode();
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Cursor {*DISPOSED*}";
return"Cursor {"+this.handle+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.handle=handle;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"getCSSHandle",
function(){
return this.handle;
});
$_I($wt.graphics,"Drawable");
c$=$_C(function(){
this.disposed=false;
$_Z(this,arguments);
},$wt.graphics,"Device",null,$wt.graphics.Drawable);
c$.getDevice=$_M(c$,"getDevice",
function(){
return $wt.widgets.Display.getDefault();
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
this.create(data);
this.init();
},"$wt.graphics.DeviceData");
$_M(c$,"checkDevice",
function(){
});
$_M(c$,"create",
function(data){
},"$wt.graphics.DeviceData");
$_M(c$,"destroy",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.release();
this.destroy();
this.disposed=true;
});
$_M(c$,"getBounds",
function(){
var width=w$.screen.availWidth;
var height=w$.screen.availHeight;
return new $wt.graphics.Rectangle(0,0,width,height);
});
$_M(c$,"getDeviceData",
function(){
var data=new $wt.graphics.DeviceData();
return data;
});
$_M(c$,"getClientArea",
function(){
return this.getBounds();
});
$_M(c$,"getDepth",
function(){
return 32;
});
$_M(c$,"getDPI",
function(){
return new $wt.graphics.Point(96,96);
});
$_M(c$,"getFontList",
function(faceName,scalable){
return new Array(0);
},"~S,~B");
$_M(c$,"getSystemColor",
function(id){
var pixel=0x02000000;
switch(id){
case 1:
pixel=0x02FFFFFF;
break;
case 2:
pixel=0x02000000;
break;
case 3:
pixel=0x020000FF;
break;
case 4:
pixel=0x02000080;
break;
case 5:
pixel=0x0200FF00;
break;
case 6:
pixel=0x02008000;
break;
case 7:
pixel=0x0200FFFF;
break;
case 8:
pixel=0x02008080;
break;
case 9:
pixel=0x02FF0000;
break;
case 10:
pixel=0x02800000;
break;
case 11:
pixel=0x02FF00FF;
break;
case 12:
pixel=0x02800080;
break;
case 13:
pixel=0x02FFFF00;
break;
case 14:
pixel=0x02808000;
break;
case 15:
pixel=0x02C0C0C0;
break;
case 16:
pixel=0x02808080;
break;
}
return new $wt.graphics.Color(this,pixel&0x000000FF,(pixel&0x0000FF00)>>8,(pixel&0x00FF00)>>16);
},"~N");
$_M(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getWarnings",
function(){
return false;
});
$_M(c$,"init",
function(){
});
$_M(c$,"isDisposed",
function(){
return this.disposed;
});
$_M(c$,"release",
function(){
});
$_M(c$,"setWarnings",
function(warnings){
},"~B");
c$=$_C(function(){
this.width=0;
this.height=0;
this.depth=0;
this.scanlinePad=0;
this.bytesPerLine=0;
this.data=null;
this.palette=null;
this.transparentPixel=0;
this.maskData=null;
this.maskPad=0;
this.alphaData=null;
this.alpha=0;
this.type=0;
this.x=0;
this.y=0;
this.disposalMethod=0;
this.url=null;
this.delayTime=0;
$_Z(this,arguments);
},$wt.graphics,"ImageData",null,$wt.internal.CloneableCompatibility);
$_K(c$,
function(width,height,depth,palette){
this.construct(width,height,depth,palette,4,null,0,null,null,-1,-1,-1,0,0,0,0);
},"~N,~N,~N,$wt.graphics.PaletteData");
$_K(c$,
function(width,height,depth,palette,scanlinePad,data){
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A");
$_K(c$,
function(stream){
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"java.io.InputStream");
$_K(c$,
function(filename){
this.url=filename;
},"~S");
$_K(c$,
function(){
});
$_K(c$,
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
var bytesPerLine=Math.floor(((Math.floor((width*depth+7)/ 8)) + (scanlinePad - 1)) /scanlinePad)*scanlinePad;
this.setAllFields(width,height,depth,scanlinePad,bytesPerLine,data!=null?data:$_A(bytesPerLine*height,0),palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"setAllFields",
function(width,height,depth,scanlinePad,bytesPerLine,data,palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime){
this.width=width;
this.height=height;
this.depth=depth;
this.scanlinePad=scanlinePad;
this.bytesPerLine=bytesPerLine;
this.data=data;
this.palette=palette;
this.transparentPixel=transparentPixel;
this.maskData=maskData;
this.maskPad=maskPad;
this.alphaData=alphaData;
this.alpha=alpha;
this.type=type;
this.x=x;
this.y=y;
this.disposalMethod=disposalMethod;
this.delayTime=delayTime;
},"~N,~N,~N,~N,~N,~A,$wt.graphics.PaletteData,~N,~A,~N,~A,~N,~N,~N,~N,~N,~N");
c$.internal_new=$_M(c$,"internal_new",
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
return new $wt.graphics.ImageData(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_V(c$,"clone",
function(){
var cloneData=$_A(this.data.length,0);
System.arraycopy(this.data,0,cloneData,0,this.data.length);
var cloneMaskData=null;
if(this.maskData!=null){
cloneMaskData=$_A(this.maskData.length,0);
System.arraycopy(this.maskData,0,cloneMaskData,0,this.maskData.length);
}var cloneAlphaData=null;
if(this.alphaData!=null){
cloneAlphaData=$_A(this.alphaData.length,0);
System.arraycopy(this.alphaData,0,cloneAlphaData,0,this.alphaData.length);
}return new $wt.graphics.ImageData(this.width,this.height,this.depth,this.palette,this.scanlinePad,cloneData,this.maskPad,cloneMaskData,cloneAlphaData,this.alpha,this.transparentPixel,this.type,this.x,this.y,this.disposalMethod,this.delayTime);
});
$_M(c$,"getAlpha",
function(x,y){
if(this.alphaData==null)return 255;
return this.alphaData[y*this.width+x]&0xFF;
},"~N,~N");
$_M(c$,"getAlphas",
function(x,y,getWidth,alphas,startIndex){
if(getWidth==0)return;
if(this.alphaData==null){
var endIndex=startIndex+getWidth;
for(var i=startIndex;i<endIndex;i++){
alphas[i]=parseInt(255);
}
return;
}System.arraycopy(this.alphaData,y*this.width+x,alphas,startIndex,getWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixel",
function(x,y){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
mask=1<<(7-(x&0x7));
if((theByte&mask)==0){
return 0;
}else{
return 1;
}}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset=3-(x%4);
mask=3<<(offset*2);
return(theByte&mask)>>(offset*2);
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
theByte=this.data[index]&0xFF;
if((x&0x1)==0){
return theByte>>4;
}else{
return theByte&0x0F;
}}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
return this.data[index]&0xFF;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
return((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
return((this.data[index]&0xFF)<<16)+((this.data[index+1]&0xFF)<<8)+(this.data[index+2]&0xFF);
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
return((this.data[index]&0xFF)<<24)+((this.data[index+1]&0xFF)<<16)+((this.data[index+2]&0xFF)<<8)+(this.data[index+3]&0xFF);
}$WT.error(38);
return 0;
},"~N,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask=0;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index];
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index]&0xFF;
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=2;
}}
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<16)|((this.data[index+1]&0xFF)<<8)|(this.data[index+2]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=3;
}}
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
i=startIndex;
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<24)|((this.data[index+1]&0xFF)<<16)|((this.data[index+2]&0xFF)<<8)|(this.data[index+3]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=4;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getRGBs",
function(){
return this.palette.getRGBs();
});
$_M(c$,"getTransparencyMask",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_M(c$,"getTransparencyType",
function(){
if(this.maskData!=null)return 2;
if(this.transparentPixel!=-1)return 4;
if(this.alphaData!=null)return 1;
return 0;
});
$_M(c$,"scaledTo",
function(width,height){
return null;
},"~N,~N");
$_M(c$,"setAlpha",
function(x,y,alpha){
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
this.alphaData[y*this.width+x]=parseInt(alpha);
},"~N,~N,~N");
$_M(c$,"setAlphas",
function(x,y,putWidth,alphas,startIndex){
if(putWidth==0)return;
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
System.arraycopy(alphas,startIndex,this.alphaData,y*this.width+x,putWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixel",
function(x,y,pixelValue){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index];
mask=1<<(7-(x&0x7));
if((pixelValue&0x1)==1){
this.data[index]=parseInt((theByte|mask));
}else{
this.data[index]=parseInt((theByte&(mask^-1)));
}return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index];
var offset=3-(x%4);
mask=0xFF^(3<<(offset*2));
this.data[index]=parseInt(((this.data[index]&mask)|(pixelValue<<(offset*2))));
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==0){
this.data[index]=parseInt(((this.data[index]&0x0F)|((pixelValue&0x0F)<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|(pixelValue&0x0F)));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
this.data[index]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+2]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
this.data[index]=parseInt(((pixelValue>>24)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+2]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+3]=parseInt((pixelValue&0xFF));
return;
}$WT.error(38);
},"~N,~N,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
if(putWidth==0)return;
var index;
var theByte;
var mask;
var n=putWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
while(n>0){
mask=1<<(7-(srcX&0x7));
if((pixels[i]&0x1)==1){
this.data[index]=parseInt(((this.data[index]&0xFF)|mask));
}else{
this.data[index]=parseInt(((this.data[index]&0xFF)&(mask^-1)));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
if(mask==1){
index++;
}}}
return;
}if(this.depth==2){
var masks=[parseInt(0xFC),parseInt(0xF3),parseInt(0xCF),parseInt(0x3F)];
index=(y*this.bytesPerLine)+(x>>2);
var offset=3-(x%4);
while(n>0){
theByte=pixels[i]&0x3;
this.data[index]=parseInt(((this.data[index]&masks[offset])|(theByte<<(offset*2))));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
offset=0;
srcX=0;
}else{
if(offset==0){
index++;
offset=3;
}else{
offset--;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
var high=(x&0x1)==0;
while(n>0){
theByte=pixels[i]&0x0F;
if(high){
this.data[index]=parseInt(((this.data[index]&0x0F)|(theByte<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|theByte));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
high=true;
srcX=0;
}else{
if(!high)index++;
high=!high;
}}
return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<putWidth;j++){
this.data[index]=parseInt((pixels[i]&0xFF));
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
c$=$_C(function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=0;
this.repeatCount=0;
this.imageLoaderListeners=null;
$_Z(this,arguments);
},$wt.graphics,"ImageLoader");
$_K(c$,
function(){
this.reset();
});
$_M(c$,"reset",
function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=-1;
this.repeatCount=1;
});
$_M(c$,"load",
function(stream){
this.reset();
this.data=[new $wt.graphics.ImageData(stream)];
return this.data;
},"java.io.InputStream");
$_M(c$,"load",
function(filename){
this.reset();
this.data=[new $wt.graphics.ImageData(filename)];
return this.data;
},"~S");
$_M(c$,"save",
function(stream,format){
},"java.io.OutputStream,~N");
$_M(c$,"save",
function(filename,format){
},"~S,~N");
$_M(c$,"addImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null){
this.imageLoaderListeners=new java.util.Vector();
}this.imageLoaderListeners.addElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"removeImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null)return;
this.imageLoaderListeners.removeElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"hasListeners",
function(){
return this.imageLoaderListeners!=null&&this.imageLoaderListeners.size()>0;
});
$_M(c$,"notifyListeners",
function(event){
if(!this.hasListeners())return;
var size=this.imageLoaderListeners.size();
for(var i=0;i<size;i++){
var listener=this.imageLoaderListeners.elementAt(i);
listener.imageDataLoaded(event);
}
},"$wt.graphics.ImageLoaderEvent");
c$=$_C(function(){
this.url=null;
this.width=0;
this.height=0;
this.imgHandle=null;
this.type=0;
this.handle=null;
this.transparentPixel=-1;
this.memGC=null;
this.alphaData=null;
this.alpha=-1;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Image",$wt.graphics.Resource,$wt.graphics.Drawable);
$_K(c$,
function(){
$_R(this,$wt.graphics.Image,[]);
});
$_K(c$,
function(device,width,height){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,width,height);
this.width=width;
this.height=height;
},"$wt.graphics.Device,~N,~N");
$_M(c$,"init",
function(device,width,height){
this.type=0;
this.width=width;
this.height=height;
this.handle=d$.createElement("DIV");
this.handle.style.width=width+"px";
this.handle.style.height=height+"px";
this.imgHandle=this.handle;
},"$wt.graphics.Device,~N,~N");
$_K(c$,
function(device,srcImage,flag){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.url=srcImage.url;
},"$wt.graphics.Device,$wt.graphics.Image,~N");
$_K(c$,
function(device,bounds){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.width=bounds.width;
this.height=bounds.height;
},"$wt.graphics.Device,$wt.graphics.Rectangle");
$_K(c$,
function(device,data){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=data.url;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(device,source,mask){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=source.url;
},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData");
$_K(c$,
function(device,stream){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"$wt.graphics.Device,java.io.InputStream");
$_K(c$,
function(device,filename){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=filename;
},"$wt.graphics.Device,~S");
$_V(c$,"dispose",
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Image)))return false;
var image=object;
return this.device==image.device&&this.handle==image.handle;
},"~O");
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.device,"white");
});
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,this.width,this.height);
});
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_V(c$,"isDisposed",
function(){
return false;
});
$_M(c$,"setBackground",
function(color){
},"$wt.graphics.Color");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"Image {*DISPOSED*}";
return"Image {"+this.handle+"}";
});
$_S(c$,
"DEFAULT_SCANLINE_PAD",4);
c$=$_C(function(){
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Font",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.Font,[]);
});
$_K(c$,
function(device,fd){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,fd);
},"$wt.graphics.Device,$wt.graphics.FontData");
$_K(c$,
function(device,fds){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
for(var i=0;i<fds.length;i++){
}
this.init(device,fds[0]);
},"$wt.graphics.Device,~A");
$_K(c$,
function(device,name,height,style){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,new $wt.graphics.FontData(name,height,style));
},"$wt.graphics.Device,~S,~N,~N");
$_V(c$,"dispose",
function(){
this.data=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Font)))return false;
var font=object;
return font.data.equals(this.data);
},"~O");
$_M(c$,"getFontData",
function(){
var datum=new Array(1);
datum[0]=this.data;
return datum;
});
$_V(c$,"hashCode",
function(){
return this.data.hashCode();
});
$_M(c$,"init",
function(device,fd){
this.data=fd;
this.device=device;
},"$wt.graphics.Device,$wt.graphics.FontData");
$_V(c$,"isDisposed",
function(){
return this.data==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Font {*DISPOSED*}";
return"Font {"+this.data+"}";
});
c$=$_C(function(){
this.height=0;
this.style=0;
this.name=null;
this.lang=null;
this.country=null;
this.variant=null;
$_Z(this,arguments);
},$wt.graphics,"FontData");
$_K(c$,
function(){
this.name="Arial";
this.style=0;
this.height=12;
});
$_K(c$,
function(string){
this.name=string;
if(this.name==null){
this.name="Arial";
}this.style=0;
this.height=12;
},"~S");
$_K(c$,
function(name,height,style){
this.setName(name);
this.setHeight(height);
this.setStyle(style);
},"~S,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.FontData)))return false;
var fd=object;
return this.height==fd.height&&this.style==fd.style&&this.getName().equals(fd.getName());
},"~O");
$_M(c$,"getHeight",
function(){
return this.height;
});
$_M(c$,"getLocale",
function(){
var buffer=new StringBuffer();
var sep='_';
if(this.lang!=null){
buffer.append(this.lang);
buffer.append(sep);
}if(this.country!=null){
buffer.append(this.country);
buffer.append(sep);
}if(this.variant!=null){
buffer.append(this.variant);
}var result=buffer.toString();
var length=result.length;
if(length>0){
if((result.charAt(length-1)).charCodeAt(0)==(sep).charCodeAt(0)){
result=result.substring(0,length-1);
}}return result;
});
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getStyle",
function(){
var style=0;
return style;
});
$_V(c$,"hashCode",
function(){
return this.height^this.style^this.getName().hashCode();
});
$_M(c$,"setHeight",
function(height){
this.height=height;
},"~N");
$_M(c$,"setLocale",
function(locale){
this.lang=this.country=this.variant=null;
if(locale!=null){
var sep='_';
var length=locale.length;
var firstSep;
var secondSep;
firstSep=locale.indexOf(sep);
if(firstSep==-1){
firstSep=secondSep=length;
}else{
secondSep=locale.indexOf(sep,firstSep+1);
if(secondSep==-1)secondSep=length;
}if(firstSep>0)this.lang=locale.substring(0,firstSep);
if(secondSep>firstSep+1)this.country=locale.substring(firstSep+1,secondSep);
if(length>secondSep+1)this.variant=locale.substring(secondSep+1);
}},"~S");
$_M(c$,"setName",
function(name){
this.name=name;
},"~S");
$_M(c$,"setStyle",
function(style){
this.style=style;
},"~N");
$_V(c$,"toString",
function(){
var buffer=new StringBuffer();
buffer.append("1|");
buffer.append(this.getName());
buffer.append("|");
buffer.append(this.getHeight());
buffer.append("|");
buffer.append(this.getStyle());
buffer.append("|");
buffer.append("WINDOWS|1|");
buffer.append(this.getName());
return buffer.toString();
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.graphics,"FontMetrics");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.FontMetrics)))return false;
return false;
},"~O");
$_M(c$,"getAscent",
function(){
return 0;
});
$_M(c$,"getAverageCharWidth",
function(){
return 9;
});
$_M(c$,"getDescent",
function(){
return 0;
});
$_M(c$,"getHeight",
function(){
return 16;
});
$_M(c$,"getLeading",
function(){
return 0;
});
$_M(c$,"hashCode",
function(){
return $_U(this,$wt.graphics.FontMetrics,"hashCode",[]);
});
$_J("org.eclipse.swt.internal.struct");
c$=$_C(function(){
this.hwnd=null;
this.hwndInsertAfter=null;
this.x=0;
this.y=0;
this.cx=0;
this.cy=0;
this.flags=0;
$_Z(this,arguments);
},$wt.internal.struct,"WINDOWPOS");
$_S(c$,
"sizeof",28);
$_J("org.eclipse.swt.internal.struct");
c$=$_C(function(){
this.control=null;
this.type=0;
this.data=null;
$_Z(this,arguments);
},$wt.internal.struct,"MESSAGE");
$_K(c$,
function(control,type,data){
this.control=control;
this.type=type;
this.data=data;
},"$wt.widgets.Control,~N,~O");
$_S(c$,
"CONTROL_RESIZE",1,
"CONTROL_LAYOUT",2);
