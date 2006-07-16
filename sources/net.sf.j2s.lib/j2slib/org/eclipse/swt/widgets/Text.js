Clazz.load(["$wt.widgets.Scrollable"],"$wt.widgets.Text",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.tabs=0;
this.oldStart=0;
this.oldEnd=0;
this.doubleClick=false;
this.ignoreModify=false;
this.ignoreVerify=false;
this.ignoreCharacter=false;
this.textHandle=null;
this.lineHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Text",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Text,[parent,$wt.widgets.Text.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="text-default text-editable";
this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.doubleClick=true;
if((this.style&2)!=0){
this.textHandle=d$.createElement("TEXTAREA");
}else{
this.textHandle=d$.createElement("INPUT");
}if(O$.isMozilla){
}var textCSSName=null;
if(O$.isIE){
textCSSName="text-ie-default";
}if((this.style&2048)!=0){
if(textCSSName!=null){
textCSSName+=" text-border";
}else{
textCSSName="text-border";
}}if((this.style&8)!=0){
this.textHandle.readOnly=true;
}if((this.style&512)!=0&&(this.style&256)!=0){
this.textHandle.style.overflow="scroll";
}else{
if((this.style&512)!=0){
if(textCSSName!=null){
textCSSName+=" text-v-scroll";
}else{
textCSSName="text-v-scroll";
}}else if((this.style&256)!=0){
if(textCSSName!=null){
textCSSName+=" text-h-scroll";
}else{
textCSSName="text-h-scroll";
}}}if(textCSSName!=null){
this.textHandle.className=textCSSName;
}this.handle.appendChild(this.textHandle);
});
$_V(c$,"hookKeyDown",
function(){
this.textHandle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Text$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var verifyHooked=false;
if(this.b$["$wt.widgets.Text"].hooks(25)){
verifyHooked=true;
var evt=this.getEvent();
if(!this.b$["$wt.widgets.Text"].isInputCharacter(evt.keyCode,evt.shiftKey,evt.altKey,evt.ctrlKey)){
this.toReturn(true);
}else{
var e=new $wt.widgets.Event();
e.character=this.b$["$wt.widgets.Text"].getInputCharacter(evt.keyCode,evt.shiftKey,false);
var txt=""+e.character;
if((e.character).charCodeAt(0)==8||(e.character).charCodeAt(0)==46){
txt="";
}e.keyCode=evt.keyCode;
e.stateMask=(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
var s=this.b$["$wt.widgets.Text"].verifyText(txt,0,0,e);
if(s==null){
this.toReturn(false);
}else if(this.b$["$wt.widgets.Text"].hooks(24)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
}}}if(!verifyHooked||this.b$["$wt.widgets.Text"].hooks(1)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
this.b$["$wt.widgets.Text"].sendEvent(1);
}});
c$=$_P();
}
return $_N($wt.widgets.Text$1,i$,v$);
})(this,null));
});
$_V(c$,"hookModify",
function(){
this.textHandle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Text$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if((this.b$["$wt.widgets.Text"].style&8)!=0||(this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var newText=this.b$["$wt.widgets.Text"].textHandle.value;
if(newText!=null){
var oldText=newText;
newText=this.b$["$wt.widgets.Text"].verifyText(newText,0,0,null);
if(newText==null){
this.toReturn(true);
return;
}var e=new $wt.widgets.Event();
e.type=24;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
}});
c$=$_P();
}
return $_N($wt.widgets.Text$2,i$,v$);
})(this,null));
});
$_M(c$,"getInputCharacter",
($fz=function(keyCode,shiftKey,capsLockStatus){
var ch='\0';
if(keyCode==10||keyCode==13||keyCode==9||keyCode==32){
ch=String.fromCharCode(keyCode);
}else if(keyCode>=48&&keyCode<58){
if(!shiftKey){
ch=String.fromCharCode(keyCode);
}else{
var chs=[')','!','@','#','$','%','^','&','*','('];
ch=chs[keyCode-48];
}}else if(keyCode==61){
if(!shiftKey){
ch='=';
}else{
ch='+';
}}else if(keyCode==59){
if(!shiftKey){
ch=';';
}else{
ch=':';
}}else if(keyCode>=65&&keyCode<=90){
if((shiftKey&&capsLockStatus)||(!shiftKey&&!capsLockStatus)){
ch=String.fromCharCode((keyCode+('a').charCodeAt(0)-('A').charCodeAt(0)));
}else{
ch=String.fromCharCode(keyCode);
}}else if(keyCode>=96&&keyCode<=105){
ch=String.fromCharCode((keyCode-96+('0').charCodeAt(0)));
}else if(keyCode>=106&&keyCode<=111&&keyCode!=108){
var chs=['*','+','?','-','.','/'];
ch=chs[keyCode-106];
}else if(keyCode>=186&&keyCode<=192){
if(!shiftKey){
var chs=[';','=',',','-','.','/','`'];
ch=chs[keyCode-186];
}else{
var chs=[':','+','<','_','>','?','~'];
ch=chs[keyCode-186];
}}else if(keyCode>=219&&keyCode<=222){
if(!shiftKey){
var chs=['[','\\',']','\''];
ch=chs[keyCode-219];
}else{
var chs=['{','|','}','\"'];
ch=chs[keyCode-219];
}}else{
ch=String.fromCharCode(keyCode);
}return ch;
},$fz.isPrivate=true,$fz),"~N,~B,~B");
$_M(c$,"isInputCharacter",
($fz=function(keyCode,shiftKey,altKey,ctrlKey){
if(altKey||ctrlKey){
return false;
}if(keyCode==10||keyCode==13||keyCode==9||keyCode==32||keyCode==8||keyCode==46||(keyCode>=48&&keyCode<=57)||keyCode==59||keyCode==61||(keyCode>=65&&keyCode<=90)||(keyCode>=96&&keyCode<=111&&keyCode!=108)||(keyCode>=186&&keyCode<=192)||(keyCode>=218&&keyCode<=222)){
return true;
}return false;
},$fz.isPrivate=true,$fz),"~N,~B,~B,~B");
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_M(c$,"append",
function(string){
this.textHandle.value+=string;
},"~S");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&4)!=0&&(style&2)!=0){
style&=-3;
}style=$wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
if((style&4)!=0)style&=-833;
if((style&64)!=0){
style|=2;
style&=-257;
}if((style&2)!=0)style&=-4194305;
if((style&(6))!=0)return style;
if((style&(768))!=0)return style|2;
return style|4;
},"~N");
$_M(c$,"clearSelection",
function(){
this.clearSelection(this.textHandle);
});
$_M(c$,"clearSelection",
($fz=function(handle){
var handle=arguments[0];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
handle.setSelectionRange(start,start);
}else if(document.selection){
var workRange=document.selection.createRange();
workRange.text=workRange.text;
workRange.select();
}
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var height=0;
var width=0;
if(wHint==-1||hHint==-1){
var size=null;
var text=this.getText();
if(text!=null&&text.length!=0){
var wrap=(this.style&2)!=0&&(this.style&64)!=0;
if(wrap&&wHint!=-1&&wHint>0){
size=new $wt.graphics.Point(wHint,O$.getStringStyledWrappedHeight(text,"text-default",this.handle.style.cssText,wHint));
}else{
size=O$.getStringStyledSize(text,"text-default",this.handle.style.cssText);
}width=size.x;
height=size.y;
if(height<=0){
height=this.getLineHeight();
}}else{
width=0;
height=this.getLineHeight();
}}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var rect=$_U(this,$wt.widgets.Text,"computeTrim",[x,y,width,height]);
if((this.style&2)!=0){
rect.width+=6;
}else{
rect.width+=1;
}if((this.style&256)!=0)rect.width++;
if((this.style&512)!=0){
rect.width+=16;
}if((this.style&256)!=0){
rect.height+=16;
}if((this.style&2048)!=0){
rect.x-=1;
rect.y-=1;
rect.width+=2;
rect.height+=2;
}return rect;
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Text,"createWidget",[]);
this.doubleClick=true;
this.setTabStops(this.tabs=8);
this.fixAlignment();
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"fixAlignment",
function(){
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getCaretLineNumber",
function(){
return this.getTextCaretLineNumber(this.textHandle);
});
$_M(c$,"getTextCaretLineNumber",
($fz=function(textHandle){
var handle=arguments[0];
var txt="";
if(typeof handle.selectionStart!="undefined"){
txt=handle.value.substring(0,handle.selectionStart);
}else if(document.selection){
handle.focus();
var workRange=document.selection.createRange();
workRange.moveStart("character",-65535);
if(workRange.htmlText!=null){
var s=workRange.htmlText;
var key=handle.nodeName;
txt=this.parseInnerText(s,key);
}else{
txt=workRange.text;
}
}
return txt.split(/\r\n|\r|\n/g).length;
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getCaretLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCaretPosition",
function(){
return this.getTextCaretPosition(this.textHandle);
});
$_M(c$,"getTextCaretPosition",
($fz=function(handle){
var handle=arguments[0];
if(typeof handle.selectionStart!="undefined"){
return handle.selectionStart;
}else if(document.selection){
handle.focus();
var workRange=document.selection.createRange();
workRange.moveStart("character",-32767);
if(workRange.htmlText!=null){
var s=workRange.htmlText;
var key=handle.nodeName;
var txt=this.parseInnerText(s,key);
if(txt!=null){
return txt.length;
}
}
return workRange.text.length;
}
return-1;
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getCharCount",
function(){
return this.getSelectionCount();
});
$_M(c$,"getDoubleClickEnabled",
function(){
return this.doubleClick;
});
$_M(c$,"getEchoChar",
function(){
return'*';
});
$_M(c$,"getEditable",
function(){
var editableClass="text-editable";
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx!=-1){
return true;
}}return false;
});
$_M(c$,"getLineCount",
function(){
return 0;
});
$_M(c$,"getLineDelimiter",
function(){
return $wt.widgets.Text.DELIMITER;
});
$_M(c$,"getLineHeight",
function(){
if(this.lineHeight!=-1){
this.lineHeight=O$.getStringStyledHeight(".","text-default",this.handle.style.cssText);
}return this.lineHeight;
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return this.getTextSelection(this.textHandle);
});
$_M(c$,"getTextSelection",
($fz=function(textHandle){
var handle=arguments[0];
if(typeof handle.selectionStart!="undefined"){
return new org.eclipse.swt.graphics.Point(handle.selectionStart,
handle.selectionEnd);
}else if(document.selection){
return new org.eclipse.swt.graphics.Point(
this.getTextCaretPosition(handle),
this.getTextCaretPositionEnd(handle));
}
return new new org.eclipse.swt.graphics.Point(0,0);
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getSelectionCount",
function(){
var selection=this.getSelection();
return selection.y-selection.x;
});
$_M(c$,"getSelectionText",
function(){
return this.getSelectionText(this.textHandle);
});
$_M(c$,"getSelectionText",
($fz=function(textHandle){
var handle=arguments[0];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
return handle.value.substring(start,handle.selectionEnd);
}else if(document.selection){
var workRange=document.selection.createRange();
return workRange.text;
}
return"";
},$fz.isPrivate=true,$fz),"~O");
$_M(c$,"getTabs",
function(){
return this.tabs;
});
$_M(c$,"getTabWidth",
function(tabs){
return 64;
},"~N");
$_M(c$,"getText",
function(){
return this.textHandle.value;
});
$_M(c$,"getText",
function(start,end){
var length=this.textHandle.value.length;
start=Math.max(0,start);
end=Math.min(end,length-1);
return this.getText().substring(start,end+1);
},"~N,~N");
$_M(c$,"getTextLimit",
function(){
return 0;
});
$_M(c$,"getTopIndex",
function(){
if((this.style&4)!=0)return 0;
return 0;
});
$_M(c$,"getTopPixel",
function(){
return this.getTopIndex()*this.getLineHeight();
});
$_M(c$,"insert",
function(string){
var sel=this.getTextSelection(this.textHandle);
if(this.hooks(25)||this.filters(25)){
string=this.verifyText(string,sel.x,sel.y,null);
if(string==null)return;
}this.insertTextString(this.textHandle,string);
if((this.style&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"insertTextString",
($fz=function(textHandle,string){
var handle=arguments[0];
var str=arguments[1];
handle.focus();
if(typeof handle.selectionStart!="undefined"){
var start=handle.selectionStart;
handle.value=handle.value.substring(0,start)+str+handle.value.substring(handle.selectionEnd);
handle.setSelectionRange(start+str.length,start+str.length);
}else if(document.selection){
var workRange=document.selection.createRange();
workRange.text=str;
workRange.select();
}
},$fz.isPrivate=true,$fz),"~O,~S");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"releaseHandle",
function(){
if(this.textHandle!=null){
O$.destroyHandle(this.textHandle);
this.textHandle=null;
}$_U(this,$wt.widgets.Text,"releaseHandle",[]);
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"selectAll",
function(){
this.textHandle.select();
});
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
return false;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Text,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBackground",
function(color){
if(color!=null)this.textHandle.style.backgroundColor=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setBackground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setDoubleClickEnabled",
function(doubleClick){
this.doubleClick=doubleClick;
},"~B");
$_M(c$,"setEchoChar",
function(echo){
if((this.style&2)!=0)return;
try{
this.textHandle.type="password";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
},"~N");
$_M(c$,"setEditable",
function(editable){
this.style&=-9;
if(!editable)this.style|=8;
this.textHandle.readOnly=!editable;
var editableClass="text-editable";
if(!editable){
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx!=-1){
var zzName=this.handle.className.substring(0,idx)+this.textHandle.className.substring(idx+editableClass.length);
this.handle.className=zzName;
}}}else{
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx==-1){
this.handle.className+=" "+editableClass;
}}}},"~B");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Text,"setFont",[font]);
var tmp=this.handle;
this.handle=this.textHandle;
$_U(this,$wt.widgets.Text,"setFont",[font]);
this.handle=tmp;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null)this.textHandle.style.color=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setForeground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setOrientation",
function(orientation){
this.fixAlignment();
},"~N");
$_M(c$,"setSelection",
function(start){
this.setSelection(start,this.textHandle.value.length);
},"~N");
$_M(c$,"setSelection",
function(start,end){
this.setTextSelection(this.textHandle,start,end);
},"~N,~N");
$_M(c$,"setTextSelection",
($fz=function(handle,start,end){
var handle=arguments[0];
var start=arguments[1];
var end=arguments[2];
handle.focus();
if(!(handle.setSelectionRange&&handle.createTextRange)){
var s=handle.value.substring(0,start);
var count=s.split(/\r\n|\r|\n/g).length;
start-=count;
end-=count;
s=handle.value.substring(start,end);
end-=s.split(/\r\n|\r|\n/g).length;
}
if(handle.setSelectionRange){
handle.setSelectionRange(start,end);
}else if(handle.createTextRange){
var range=handle.createTextRange();
range.collapse(true);
range.moveStart("character",start);
range.moveEnd("character",end-start+1);
range.select();
}
handle.focus();
},$fz.isPrivate=true,$fz),"~O,~N,~N");
$_M(c$,"setRedraw",
function(redraw){
$_U(this,$wt.widgets.Text,"setRedraw",[redraw]);
if(this.drawCount!=0)return;
},"~B");
$_M(c$,"setSelection",
function(selection){
this.setSelection(selection.x,selection.y);
},"$wt.graphics.Point");
$_M(c$,"setTabs",
function(tabs){
if(tabs<0)return;
this.tabs=tabs;
},"~N");
$_M(c$,"setTabStops",
function(tabs){
},"~N");
$_M(c$,"setText",
function(string){
this.textHandle.value=string;
if((this.style&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"setTextLimit",
function(limit){
if(limit>32767){
}},"~N");
$_M(c$,"setTopIndex",
function(index){
if((this.style&4)!=0)return;
},"~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}this.textHandle.style.width=(cx>0?cx:0)+"px";
this.textHandle.style.height=(cy>0?cy:0)+"px";
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
if(this.ignoreVerify)return string;
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_M(c$,"windowClass",
function(){
return"TEXTAREA";
});
$_S(c$,
"LIMIT",0x7FFF,
"DELIMITER","\r\n");
});
