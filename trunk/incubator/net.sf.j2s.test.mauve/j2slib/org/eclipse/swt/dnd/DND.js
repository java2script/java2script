$_L(null,"$wt.dnd.DND",["$wt.SWTError","$.SWTException"],function(){
c$=$_T($wt.dnd,"DND");
c$.error=$_M(c$,"error",
function(code){
$wt.dnd.DND.error(code,0);
},"~N");
c$.error=$_M(c$,"error",
function(code,hresult){
switch(code){
case 2000:
{
var msg="Cannot initialize Drag";
if(hresult!=0)msg+=" result = "+hresult;
throw new $wt.SWTError(code,msg);
}case 2001:
{
var msg="Cannot initialize Drop";
if(hresult!=0)msg+=" result = "+hresult;
throw new $wt.SWTError(code,msg);
}case 2002:
{
var msg="Cannot set data in clipboard";
if(hresult!=0)msg+=" result = "+hresult;
throw new $wt.SWTError(code,msg);
}case 2003:
{
var msg="Data does not have correct format for type";
if(hresult!=0)msg+=" result = "+hresult;
throw new $wt.SWTException(code,msg);
}}
{
throw"SWT.error ("+code+")";
}},"~N,~N");
$_S(c$,
"CLIPBOARD",1,
"SELECTION_CLIPBOARD",2,
"DROP_NONE",0,
"DROP_COPY",1,
"DROP_MOVE",2,
"DROP_LINK",4,
"DROP_TARGET_MOVE",8,
"DROP_DEFAULT",16,
"DragEnd",2000,
"DragSetData",2001,
"DragEnter",2002,
"DragLeave",2003,
"DragOver",2004,
"DragOperationChanged",2005,
"Drop",2006,
"DropAccept",2007,
"DragStart",2008,
"FEEDBACK_NONE",0,
"FEEDBACK_SELECT",1,
"FEEDBACK_INSERT_BEFORE",2,
"FEEDBACK_INSERT_AFTER",4,
"FEEDBACK_SCROLL",8,
"FEEDBACK_EXPAND",16,
"ERROR_CANNOT_INIT_DRAG",2000,
"ERROR_CANNOT_INIT_DROP",2001,
"ERROR_CANNOT_SET_CLIPBOARD",2002,
"ERROR_INVALID_DATA",2003,
"INIT_DRAG_MESSAGE","Cannot initialize Drag",
"INIT_DROP_MESSAGE","Cannot initialize Drop",
"CANNOT_SET_CLIPBOARD_MESSAGE","Cannot set data in clipboard",
"INVALID_DATA_MESSAGE","Data does not have correct format for type");
});
