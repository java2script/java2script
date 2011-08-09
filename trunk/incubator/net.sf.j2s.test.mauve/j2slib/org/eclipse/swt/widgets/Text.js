$_L(["$wt.widgets.Scrollable"],"$wt.widgets.Text",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Text", ".text-default {\nposition:absolute;\nborder-style:none;\n/*background-color:white;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n/*white-space:nowrap;*/\noverflow:hidden;\n}\n.text-default textarea {\n/*background-color:transparent;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n.text-editable textarea {\n/*background-color:white;*/\n}\n.text-default input {\n/*background-color:transparent;*/\nmargin:0;\npadding:0;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n* html .text-default textarea {\nmargin-top:-1px;\n}\n* html .text-default input {\nmargin-top:-1px;\n}\n.text-editable input {\n/*background-color:white;*/\n}\ntextarea.text-ie-default {\noverflow-y:hidden;\n}\ntextarea.text-v-scroll {\noverflow:scroll;\noverflow-x:hidden;\n}\ntextarea.text-h-scroll {\noverflow:scroll;\noverflow-y:hidden;\n}\n.text-no-border {\nborder-style:none;\nbackground-color:white;\n}\ntextarea.text-no-border, input.text-no-border {\nborder-style:none;\n_padding:0 3px;\n}\n.text-default textarea {\npadding:0;\n_padding:0 1px;\n}\ninput.text-wrap {\npadding:0 3px;\n}\n.text-disabled {\nbackground-color:buttonface;\n}\ninput.text-readonly {\nbackground-color:buttonface;\n}\ntextarea.text-disabled, input.text-disabled {\nbackground-color:buttonface;\n}\n.swt-widgets-text {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.tabs = 0;
this.oldStart = 0;
this.oldEnd = 0;
this.doubleClick = false;
this.ignoreModify = false;
this.ignoreVerify = false;
this.ignoreCharacter = false;
this.keyDownOK = false;
this.textHandle = null;
this.textValue = null;
this.lineHeight = 0;
this.hTextKeyUp = null;
this.hTextKeyPress = null;
this.hTextKeyDown = null;
this.hFocus = null;
this.hModifyFocus = null;
this.hModifyBlur = null;
this.hModifyKeyUp = null;
$_Z (this, arguments);
}, $wt.widgets, "Text", $wt.widgets.Scrollable);
$_V (c$, "createHandle", 
function () {
this.handle = d$.createElement ("DIV");
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
if((this.style&4194304)!=0){
this.textHandle.type="password";
}else{
this.textHandle.type="text";
}}this.textValue="";
var textCSSName=null;
if(O$.isIE){
textCSSName="text-ie-default";
}if((this.style&2048)==0){
if(textCSSName!=null){
textCSSName+=" text-no-border";
}else{
textCSSName="text-no-border";
}}if((this.style&64)!=0){
if(textCSSName!=null){
textCSSName+=" text-wrap";
}else{
textCSSName="text-wrap";
}}if((this.style&8)!=0){
this.textHandle.readOnly=true;
if(textCSSName!=null){
textCSSName+=" text-readonly";
}else{
textCSSName="text-readonly";
}}if((this.style&2)!=0&&(this.style&64)==0){
this.textHandle.setAttribute("wrap","off");
}if(O$.isIE70){
this.textHandle.style.marginTop="-1px";
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
}this.hFocus=$_Q((($_D("$wt.widgets.Text$1")?0:org.eclipse.swt.widgets.Text.$Text$1$()),$_N($wt.widgets.Text$1,this,null)));
Clazz.addEvent(this.handle,"focus",this.hFocus);
this.handle.appendChild(this.textHandle);
});
$_V(c$,"hookKeyDown",
function(){
if(this.hTextKeyDown!=null){
return;
}this.hTextKeyDown=$_Q((($_D("$wt.widgets.Text$2")?0:org.eclipse.swt.widgets.Text.$Text$2$()),$_N($wt.widgets.Text$2,this,null)));
Clazz.addEvent(this.textHandle,"keydown",this.hTextKeyDown);
this.hTextKeyPress=$_Q((($_D("$wt.widgets.Text$3")?0:org.eclipse.swt.widgets.Text.$Text$3$()),$_N($wt.widgets.Text$3,this,null)));
Clazz.addEvent(this.textHandle,"keypress",this.hTextKeyPress);
});
$_V(c$,"hookKeyUp",
function(){
if(this.hTextKeyUp!=null){
return;
}this.hTextKeyUp=$_Q((($_D("$wt.widgets.Text$4")?0:org.eclipse.swt.widgets.Text.$Text$4$()),$_N($wt.widgets.Text$4,this,null)));
Clazz.addEvent(this.textHandle,"keyup",this.hTextKeyUp);
});
$_V(c$,"hookModify",
function(){
if(this.hModifyKeyUp!=null){
return;
}this.hModifyKeyUp=$_Q((($_D("$wt.widgets.Text$5")?0:org.eclipse.swt.widgets.Text.$Text$5$()),$_N($wt.widgets.Text$5,this,null)));
Clazz.addEvent(this.textHandle,"keyup",this.hModifyKeyUp);
Clazz.addEvent(this.textHandle,"change",this.hModifyKeyUp);
this.hModifyBlur=$_Q((($_D("$wt.widgets.Text$6")?0:org.eclipse.swt.widgets.Text.$Text$6$()),$_N($wt.widgets.Text$6,this,null)));
Clazz.addEvent(this.textHandle,"blur",this.hModifyBlur);
this.hModifyFocus=$_Q((($_D("$wt.widgets.Text$7")?0:org.eclipse.swt.widgets.Text.$Text$7$()),$_N($wt.widgets.Text$7,this,null)));
Clazz.addEvent(this.textHandle,"focus",this.hModifyFocus);
});
$_M(c$,"hookMouseDoubleClick",
function(){
$_U(this,$wt.widgets.Text,"hookMouseDoubleClick",[]);
Clazz.addEvent(this.textHandle,"dblclick",this.hMouseDoubleClick);
});
$_M(c$,"hookMouseDown",
function(){
$_U(this,$wt.widgets.Text,"hookMouseDown",[]);
Clazz.addEvent(this.textHandle,"mousedown",this.hMouseDown);
});
$_M(c$,"hookMouseUp",
function(){
$_U(this,$wt.widgets.Text,"hookMouseUp",[]);
Clazz.addEvent(this.textHandle,"mouseup",this.hMouseUp);
});
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
if(string.length>0){
this.textValue=this.textHandle.value;
this.sendEvent(24);
}},"~S");
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
text=text.replaceAll("(^\\s)|(\\s$)","\u00a0").replaceAll("\\s\\s"," \u00a0");
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
$_M(c$,"parseInnerText",
function(s,key){
var s=arguments[0];
var key=arguments[1];
var idx1=s.lastIndexOf("</"+key+">");
if(idx1!=-1){
var idx2=s.lastIndexOf("<"+key,idx1);
if(idx2!=-1){
var idx3=s.indexOf(">",idx2);
if(idx3!=-1){
s=s.substring(idx3+1,idx1);
s=s.replace(/&gt;/g,">")
.replace(/&lt;/g,"<")
.replace(/&quot;/g,"\"")
.replace(/&apos;/g,"\'")
.replace(/&nbsp;/g," ")
.replace(/&amp;/g,"&");

return s;
}
}
}
return null;
},"~S,~S");
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
$_M(c$,"getTextCaretPositionEnd",
function(handle){
var handle=arguments[0];
if(typeof handle.selectionEnd!="undefined"){
return handle.selectionEnd;
}else if(document.selection){
handle.focus();
var workRange=document.selection.createRange();
if(workRange.htmlText!=null){
var s=workRange.htmlText;
var key=handle.nodeName;
var txt=parseInnerText(s,key);
if(txt!=null){
return txt.length;
}
}
return workRange.text.length;
}
return-1;
},"~O");
$_M(c$,"getCharCount",
function(){
return this.textHandle.value.length;
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
return"\r\n";
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
if(this.textValue!==this.textHandle.value){
this.textValue=this.textHandle.value;
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
if(this.handle!=null&&this.hFocus!=null){
Clazz.removeEvent(this.handle,"focus",this.hFocus);
this.hFocus=null;
}if(this.textHandle!=null){
if(this.hMouseDoubleClick!=null){
Clazz.removeEvent(this.textHandle,"dblclick",this.hMouseDoubleClick);
}if(this.hMouseDown!=null){
Clazz.removeEvent(this.textHandle,"mousedown",this.hMouseDown);
}if(this.hMouseUp!=null){
Clazz.removeEvent(this.textHandle,"mouseup",this.hMouseUp);
}if(this.hTextKeyUp!=null){
Clazz.removeEvent(this.textHandle,"keyup",this.hTextKeyUp);
this.hTextKeyUp=null;
}if(this.hTextKeyDown!=null){
Clazz.removeEvent(this.textHandle,"keydown",this.hTextKeyDown);
this.hTextKeyDown=null;
}if(this.hTextKeyPress!=null){
Clazz.removeEvent(this.textHandle,"keypress",this.hTextKeyPress);
this.hTextKeyPress=null;
}if(this.hModifyBlur!=null){
Clazz.removeEvent(this.textHandle,"blur",this.hModifyBlur);
this.hModifyBlur=null;
}if(this.hModifyFocus!=null){
Clazz.removeEvent(this.textHandle,"focus",this.hModifyFocus);
this.hModifyFocus=null;
}if(this.hModifyKeyUp!=null){
Clazz.removeEvent(this.textHandle,"change",this.hModifyKeyUp);
Clazz.removeEvent(this.textHandle,"keyup",this.hModifyKeyUp);
this.hModifyKeyUp=null;
}O$.destroyHandle(this.textHandle);
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
O$.updateCSSClass(this.handle,"text-editable",editable);
},"~B");
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
$wt.widgets.Text.setTextSelection(this.textHandle,start,end);
},"~N,~N");
c$.setTextSelection=$_M(c$,"setTextSelection",
function(handle,start,end){
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
},"~O,~N,~N");
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
if(this.textValue!==string){
this.textValue=string;
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
var b=0;
if((this.style&2048)!=0){
b=4;
if(O$.isFirefox30){
b=2;
}else if((this.style&2)!=0){
b=2;
if(O$.isFirefox10||O$.isFirefox20){
b=4;
}else if(O$.isIE&&!O$.isIE70&&!O$.isIE80){
b=4;
}}}this.textHandle.style.height=(cy-b>0?cy-b:0)+"px";
if((this.style&(66))!=0){
if(O$.isIE&&!O$.isIE70&&!O$.isIE80&&b!=0){
b+=2;
}else if(O$.isIE70){
b-=2;
}}this.textHandle.style.width=(cx-b>0?cx-b:0)+"px";
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
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
$_M(c$,"windowClass",
function(){
return"TEXTAREA";
});
$_V(c$,"enableWidget",
function(enabled){
this.textHandle.disabled=!enabled;
O$.updateCSSClass(this.textHandle,"text-disabled",!enabled);
O$.updateCSSClass(this.handle,"text-disabled",!enabled);
},"~B");
$_M(c$,"forceFocus",
function(){
var ret=$_U(this,$wt.widgets.Text,"forceFocus",[]);
O$.SetFocus(this.textHandle);
return ret;
});
c$.$Text$1$=function(){
$_H();
c$=$_W($wt.widgets,"Text$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
O$.SetFocus(this.b$["$wt.widgets.Text"].textHandle);
});
c$=$_P();
};
c$.$Text$2$=function(){
$_H();
c$=$_W($wt.widgets,"Text$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var verifyHooked=false;
if(this.b$["$wt.widgets.Text"].hooks(25)){
verifyHooked=true;
var evt=this.getEvent();
if(!O$.isInputCharacter(evt.keyCode,evt.shiftKey,evt.altKey,evt.ctrlKey)){
this.toReturn(true);
}else{
var e=new $wt.widgets.Event();
e.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
var txt=""+e.character;
if((e.character).charCodeAt(0)==8||(e.character).charCodeAt(0)==46){
txt="";
}e.keyCode=(e.character).charCodeAt(0);
e.stateMask=(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
var s=this.b$["$wt.widgets.Text"].verifyText(txt,0,0,e);
if(s==null){
this.toReturn(false);
return;
}else if(this.b$["$wt.widgets.Text"].hooks(24)){
if(this.b$["$wt.widgets.Text"].textValue!==this.b$["$wt.widgets.Text"].textHandle.value){
this.b$["$wt.widgets.Text"].textValue=this.b$["$wt.widgets.Text"].textHandle.value;
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
}}}}this.b$["$wt.widgets.Text"].keyDownOK=this.isReturned();
if(!verifyHooked||this.b$["$wt.widgets.Text"].hooks(1)){
var ev=new $wt.widgets.Event();
if(this.b$["$wt.widgets.Text"].textValue!==this.b$["$wt.widgets.Text"].textHandle.value){
this.b$["$wt.widgets.Text"].textValue=this.b$["$wt.widgets.Text"].textHandle.value;
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
}var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Text"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=1;
event.display=this.b$["$wt.widgets.Text"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Text"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
}this.b$["$wt.widgets.Text"].sendEvent(event);
this.toReturn(!(!ev.doit||!event.doit));
this.b$["$wt.widgets.Text"].keyDownOK=ev.doit&&event.doit;
}});
c$=$_P();
};
c$.$Text$3$=function(){
$_H();
c$=$_W($wt.widgets,"Text$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var e=evt.event;
var kc=0;
{
if(e.which){
kc=e.which;
}else{
kc=e.keyCode;
}
}($t$=O$.isCapsLockOn=(kc>64&&kc<91&&!e.shiftKey)||(kc>=97&&kc<=122&&e.shiftKey),O$.prototype.isCapsLockOn=O$.isCapsLockOn,$t$);
if(O$.isOpera){
this.toReturn(this.b$["$wt.widgets.Text"].keyDownOK);
}});
c$=$_P();
};
c$.$Text$4$=function(){
$_H();
c$=$_W($wt.widgets,"Text$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Text"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=2;
event.display=this.b$["$wt.widgets.Text"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Text"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
}this.b$["$wt.widgets.Text"].sendEvent(event);
this.toReturn(event.doit);
});
c$=$_P();
};
c$.$Text$5$=function(){
$_H();
c$=$_W($wt.widgets,"Text$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if((this.b$["$wt.widgets.Text"].style&8)!=0||(this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var newText=this.b$["$wt.widgets.Text"].textHandle.value;
if(newText!=null){
newText=this.b$["$wt.widgets.Text"].verifyText(newText,0,0,null);
if(newText==null){
this.toReturn(true);
return;
}if(this.b$["$wt.widgets.Text"].textValue!==this.b$["$wt.widgets.Text"].textHandle.value){
this.b$["$wt.widgets.Text"].textValue=this.b$["$wt.widgets.Text"].textHandle.value;
var e=new $wt.widgets.Event();
e.type=24;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
}}});
c$=$_P();
};
c$.$Text$6$=function(){
$_H();
c$=$_W($wt.widgets,"Text$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
O$.removeCSSClass(this.b$["$wt.widgets.Text"].handle,"text-focus");
var e=new $wt.widgets.Event();
e.type=16;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
});
c$=$_P();
};
c$.$Text$7$=function(){
$_H();
c$=$_W($wt.widgets,"Text$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
O$.addCSSClass(this.b$["$wt.widgets.Text"].handle,"text-focus");
var e=new $wt.widgets.Event();
e.type=15;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
});
c$=$_P();
};
$_S(c$,
"LIMIT",0x7FFF,
"DELIMITER","\r\n");
});
