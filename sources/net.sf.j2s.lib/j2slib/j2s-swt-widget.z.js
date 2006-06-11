/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,j2s-swt-basic.z.js,j2s-swt-event.z.js,j2s-swt-layout.z.js,org/eclipse/swt/internal/browser/OS.js,org/eclipse/swt/widgets/Widget.js,org/eclipse/swt/widgets/Control.js,org/eclipse/swt/widgets/Scrollable.js,org/eclipse/swt/widgets/Composite.js,org/eclipse/swt/widgets/Canvas.js,org/eclipse/swt/internal/dnd/HTMLEventWrapper.js,org/eclipse/swt/internal/dnd/DragListener.js,org/eclipse/swt/internal/dnd/DragAdapter.js,org/eclipse/swt/internal/dnd/DragEvent.js,org/eclipse/swt/internal/dnd/DNDUtils.js,org/eclipse/swt/internal/dnd/DragAndDrop.js,org/eclipse/swt/widgets/Decorations.js,org/eclipse/swt/widgets/Shell.js,org/eclipse/swt/internal/dnd/ShellFrameDND.js,org/eclipse/swt/internal/ResizeHandler.js,org/eclipse/swt/internal/ResizeSystem.js,org/eclipse/swt/widgets/Item.js,org/eclipse/swt/widgets/Display.js,org/eclipse/swt/widgets/Label.js,org/eclipse/swt/widgets/Link.js,org/eclipse/swt/widgets/Group.js,org/eclipse/swt/widgets/Button.js,org/eclipse/swt/widgets/Text.js,org/eclipse/swt/widgets/TabItem.js,org/eclipse/swt/widgets/TabFolder.js,org/eclipse/swt/widgets/List.js,org/eclipse/swt/widgets/Combo.js,org/eclipse/swt/widgets/Sash.js,org/eclipse/swt/internal/dnd/SashDND.js,org/eclipse/swt/widgets/Dialog.js,org/eclipse/swt/widgets/MessageBox.js,net/sf/j2s/ajax/XHRCallbackSWTAdapter.js
=*/
$_J("org.eclipse.swt.internal.browser");
O$=c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.browser,"OS");
c$.destroyHandle=$_M(c$,"destroyHandle",
function(handle){
if(handle==null){
return;
}var el=handle;
el.onblur=null;
el.onchange=null;
el.onclick=null;
el.oncontextmenu=null;
el.ondblclick=null;
el.onfocus=null;
el.onkeydown=null;
el.onkeypress=null;
el.onkeyup=null;
el.onmousedown=null;
el.onmousemove=null;
el.onmouseout=null;
el.onmouseover=null;
el.onmouseup=null;
el.onselectchange=null;
el.onselectstart=null;
if(el.parentNode!=null){
try{
el.parentNode.removeChild(el);
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~O");
c$.clearChildren=$_M(c$,"clearChildren",
function(handle){
if(handle==null){
return;
}var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
el.removeChild(el.childNodes[i]);
}
},"~O");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(handle,x,y,w,h,flags){
if(handle==null){
return;
}var el=handle;
},"~O,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if(O$.invisibleContainer==null){
var el=d$.createElement("DIV");
d$.body.appendChild(el);
var s=el.style;
s.position="absolute";
s.top="-300px";
s.width="3000px";
s.height="100px";
s.overflow="scroll";
($t$=O$.invisibleContainer=el,O$.prototype.invisibleContainer=O$.invisibleContainer,$t$);
($t$=O$.containers=new Object(),O$.prototype.containers=O$.containers,$t$);
el=d$.createElement("DIV");
O$.invisibleContainer.appendChild(el);
el.className="system-default";
el.style.whiteSpace="nowrap";
el.style.overflow="visible";
($t$=O$.lineContainer=el,O$.prototype.lineContainer=O$.lineContainer,$t$);
el=d$.createElement("DIV");
O$.invisibleContainer.appendChild(el);
el.style.overflow="visible";
el.style.whiteSpace="normal";
($t$=O$.blockContainer=el,O$.prototype.blockContainer=O$.blockContainer,$t$);
}},$fz.isPrivate=true,$fz));
c$.getContainerWidth=$_M(c$,"getContainerWidth",
function(container){
var el=container;
return Math.max(el.offsetWidth,Math.max(el.clientWidth,el.scrollWidth));
},"~O");
c$.getContainerHeight=$_M(c$,"getContainerHeight",
function(container){
var el=container;
var max=Math.max(el.offsetHeight,Math.max(el.clientHeight,el.scrollHeight));
if(O$.isIE){
max--;
}return max;
},"~O");
c$.insertText=$_M(c$,"insertText",
function(el,text){
var lines=null;
var handle=el;
{
if(!((/[\r\n\t&]/g).test(text))){
handle.style.display="inline";
handle.appendChild(document.createTextNode(text));
return;
}
var c160=String.fromCharCode(160);
var c160x8=c160+c160+c160+c160+c160+c160+c160+c160;
var s=text.replace(/\t/g,c160x8);
if(splitNeedFixed){
try{
lines=splitIntoLines(s);
}catch(e){

}
}else{
lines=s.split(/\r\n|\r|\n/g);
}
}for(var i=0;i<lines.length;i++){
if(i>0){
handle.appendChild(d$.createElement("BR"));
}var line=lines[i];
if(line.length==0){
line=c160;
}var lastIndex=0;
var idx=line.indexOf('&');
var lineEl=d$.createElement("SPAN");
handle.appendChild(lineEl);
while(idx!=-1){
if(idx<line.length-1){
var c=line.charAt(idx+1);
if((c).charCodeAt(0)==('&').charCodeAt(0)){
idx=line.indexOf('&',idx+2);
continue;}else{
var chs=line.substring(lastIndex,idx);
if(chs.length!=0){
lineEl.appendChild(d$.createTextNode(chs));
}var span=d$.createElement("SPAN");
lineEl.appendChild(span);
span.appendChild(d$.createTextNode(""+c));
lastIndex=idx+2;
idx=line.indexOf('&',lastIndex);
}}else{
break;
}}
var s=null;
{
if(lastIndex==0){
s=lines[i].replace(/&&/g,'&');
}else{
s=lines[i].substring(lastIndex,lines[i].length).replace(/&&/g,'&');
}
}lineEl.appendChild(d$.createTextNode(s));
}
},"~O,~S");
c$.wrapCSS=$_M(c$,"wrapCSS",
($fz=function(a){
if(a==null){
return null;
}else{
a=a.replace(/(^|[^-])(left|top|right|bottom|height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'$1');
a=a.replace(/background(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig,'');
a=a.replace(/visibility(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig,'');
a=a.trim();
return a;
}},$fz.isPrivate=true,$fz),"~S");
c$.setupAsPlain=$_M(c$,"setupAsPlain",
($fz=function(str,wrappedWidth){
O$.init();
var c=null;
if(wrappedWidth>0){
c=O$.blockContainer;
c.style.width=wrappedWidth+"px";
}else{
c=O$.lineContainer;
}O$.clearChildren(c);
O$.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S,~N");
c$.setupAsStyled=$_M(c$,"setupAsStyled",
($fz=function(str,className,cssText,wrappedWidth){
O$.init();
cssText=O$.wrapCSS(cssText);
var e=O$.containers;
var f=null;
var g=null;
if(wrappedWidth>0){
g="+"+className+"|"+cssText;
}else{
g="~"+className+"|"+cssText;
}{
f=e[g];
}if(f!=null){
O$.clearChildren(f);
}else{
f=d$.createElement("DIV");
O$.invisibleContainer.appendChild(f);
var x=f.style;
f.className=className;
x.cssText=cssText;
if(wrappedWidth>0){
x.whiteSpace="normal";
}else{
x.whiteSpace="nowrap";
}x.overflow="visible";
{
e[g]=f;
}}if(wrappedWidth>0){
f.style.width=wrappedWidth+"px";
}O$.insertText(f,str);
return f;
},$fz.isPrivate=true,$fz),"~S,~S,~S,~N");
c$.getStringPlainWidth=$_M(c$,"getStringPlainWidth",
function(str){
var c=O$.setupAsPlain(str,-1);
return O$.getContainerWidth(c);
},"~S");
c$.getStringStyledWidth=$_M(c$,"getStringStyledWidth",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return O$.getContainerWidth(c);
},"~S,~S,~S");
c$.getStringPlainHeight=$_M(c$,"getStringPlainHeight",
function(str){
var c=O$.setupAsPlain(str,-1);
return O$.getContainerHeight(c);
},"~S");
c$.getStringPlainWrappedHeight=$_M(c$,"getStringPlainWrappedHeight",
function(str,wrappedWidth){
var c=O$.setupAsPlain(str,wrappedWidth);
return O$.getContainerHeight(c);
},"~S,~N");
c$.getStringStyledHeight=$_M(c$,"getStringStyledHeight",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return O$.getContainerHeight(c);
},"~S,~S,~S");
c$.getStringStyledWrappedHeight=$_M(c$,"getStringStyledWrappedHeight",
function(str,className,cssText,wrappedWidth){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,wrappedWidth);
return O$.getContainerHeight(c);
},"~S,~S,~S,~N");
c$.getStringPlainSize=$_M(c$,"getStringPlainSize",
function(str){
var c=O$.setupAsPlain(str,-1);
return new $wt.graphics.Point(O$.getContainerWidth(c),O$.getContainerHeight(c));
},"~S");
c$.getStringStyledSize=$_M(c$,"getStringStyledSize",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return new org.eclipse.swt.graphics.Point(0,0);
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return new $wt.graphics.Point(O$.getContainerWidth(c),O$.getContainerHeight(c));
},"~S,~S,~S");
$_S(c$,
"isIE",false,
"isIE60",false,
"isIE55",false,
"isIE50",false,
"isMozilla",false,
"isFirefox",false,
"isSafari",false,
"isOpera",false);
{
var os=$wt.internal.browser.OS;
var dua=navigator.userAgent;
var dav=navigator.appVersion;
os.isOpera=dua.indexOf("Opera")>=0;
var isKHTML=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
os.isSafari=dav.indexOf("Safari")>=0;
var geckoPos=dua.indexOf("Gecko");
os.isMozilla=(geckoPos>=0)&&(!isKHTML);
os.isFirefox=os.isMozilla&&dua.indexOf("Firefox")!=-1;
os.isIE=(document.all)&&(!os.isOpera);
os.isIE50=os.isIE&&dav.indexOf("MSIE 5.0")>=0;
os.isIE55=os.isIE&&dav.indexOf("MSIE 5.5")>=0;
os.isIE60=os.isIE&&dav.indexOf("MSIE 6.0")>=0;
}$_S(c$,
"invisibleContainer",null,
"containers",null,
"lineContainer",null,
"blockContainer",null);
c$=$_C(function(){
this.handle=null;
this.style=0;
this.state=0;
this.display=null;
this.eventTable=null;
this.data=null;
this.dragStatus=false;
this.hoverTime=0;
this.hoverTimerID=0;
this.hookedStatus=null;
$_Z(this,arguments);
},$wt.widgets,"Widget");
$_K(c$,
function(parent,style){
this.checkSubclass();
this.checkParent(parent);
this.style=style;
this.display=parent.display;
},"$wt.widgets.Widget,~N");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
this.checkHookType(eventType);
},"~N,$wt.widgets.Listener");
$_M(c$,"addDisposeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(12,typedListener);
},"$wt.events.DisposeListener");
$_M(c$,"callWindowProc",
function(hwnd,msg,wParam,lParam){
return 0;
},"~N,~N,~N,~N");
c$.checkBits=$_M(c$,"checkBits",
function(style,int0,int1,int2,int3,int4,int5){
var mask=int0|int1|int2|int3|int4|int5;
if((style&mask)==0)style|=int0;
if((style&int0)!=0)style=(style&~mask)|int0;
if((style&int1)!=0)style=(style&~mask)|int1;
if((style&int2)!=0)style=(style&~mask)|int2;
if((style&int3)!=0)style=(style&~mask)|int3;
if((style&int4)!=0)style=(style&~mask)|int4;
if((style&int5)!=0)style=(style&~mask)|int5;
return style;
},"~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"checkHookType",
function(eventType){
if(this.hookedStatus==null){
this.hookedStatus=$_A(38,false);
}var hooked=false;
if(eventType>=0&&eventType<=37){
hooked=this.hookedStatus[eventType];
}if(hooked){
return;
}switch(eventType){
case 1:
this.hookKeyDown();
break;
case 2:
this.hookKeyUp();
break;
case 3:
this.hookMouseDown();
break;
case 4:
this.hookMouseUp();
break;
case 5:
this.hookMouseMove();
break;
case 6:
this.hookMouseEnter();
break;
case 7:
this.hookMouseExit();
break;
case 8:
this.hookMouseDoubleClick();
break;
case 13:
this.hookSelection();
break;
case 15:
this.hookFocusIn();
break;
case 16:
this.hookFocusOut();
break;
case 24:
this.hookModify();
break;
case 25:
if(!this.hookedStatus[1])this.hookKeyDown();
this.hookedStatus[1]=true;
break;
case 28:
this.hookHelp();
break;
case 29:
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 30:
this.hookArm();
break;
case 31:
this.hookTraverse();
break;
case 32:
if(!this.hookedStatus[6])this.hookMouseEnter();
if(!this.hookedStatus[7])this.hookMouseExit();
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[6]=true;
this.hookedStatus[7]=true;
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 35:
this.hookMenuDetect();
break;
case 37:
this.hookMouseWheel();
break;
}
this.hookedStatus[eventType]=true;
},"~N");
$_M(c$,"checkOrientation",
function(parent){
this.style&=-134217729;
if((this.style&(100663296))==0){
if(parent!=null){
if((parent.style&33554432)!=0)this.style|=33554432;
if((parent.style&67108864)!=0)this.style|=67108864;
}}this.style=$wt.widgets.Widget.checkBits(this.style,33554432,67108864,0,0,0,0);
},"$wt.widgets.Widget");
$_M(c$,"checkOpened",
function(){
});
$_M(c$,"checkParent",
function(parent){
parent.checkOpened();
},"$wt.widgets.Widget");
$_M(c$,"checkSubclass",
function(){
});
$_M(c$,"checkWidget",
function(){
var display=this.display;
});
$_M(c$,"destroyWidget",
function(){
this.releaseHandle();
if(this.hoverTimerID!=0){
w$.clearTimeout(this.hoverTimerID);
}});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.releaseChild();
this.releaseWidget();
this.destroyWidget();
});
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"filters",
function(eventType){
return this.display.filters(eventType);
},"~N");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"fixMnemonic",
function(string){
var buffer=$_A(string.length,'\0');
string.getChars(0,string.length,buffer,0);
var i=0;
var j=0;
while(i<buffer.length){
if((buffer[i]).charCodeAt(0)==('&').charCodeAt(0)){
if(i+1<buffer.length&&(buffer[i+1]).charCodeAt(0)==('&').charCodeAt(0)){
buffer[j++]=' ';
i++;
}i++;
}else{
buffer[j++]=buffer[i++];
}}
while(j<buffer.length)buffer[j++]=String.fromCharCode(0);

return buffer;
},"~S");
$_M(c$,"getData",
function(){
return(this.state&4)!=0?(this.data)[0]:this.data;
});
$_M(c$,"getData",
function(key){
if((this.state&4)!=0){
var table=this.data;
for(var i=1;i<table.length;i+=2){
if(key.equals(table[i]))return table[i+1];
}
}return null;
},"~S");
$_M(c$,"getDisplay",
function(){
var display=this.display;
return display;
});
$_M(c$,"getMenu",
function(){
return null;
});
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_M(c$,"getNameText",
function(){
return"";
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"hookKeyDown",
function(){
this.handle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(1);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$1,i$,v$);
})(this,null));
});
$_M(c$,"hookKeyUp",
function(){
this.handle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if((e.event).keyCode==27){
this.b$["$wt.widgets.Widget"].dragStatus=false;
}this.b$["$wt.widgets.Widget"].sendEvent(2);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$2,i$,v$);
})(this,null));
});
$_M(c$,"mouseHoverProc",
function(){
var hoverHooked=false;
if(this.hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.hoverTimerID);
this.hoverTimerID=0;
}if(hoverHooked||this.hooks(32)){
hoverHooked=true;
this.hoverTimerID=w$.setTimeout($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$3",null,Runnable);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Widget"].isDisposed()){
this.b$["$wt.widgets.Widget"].sendEvent(32);
}this.b$["$wt.widgets.Widget"].hoverTimerID=0;
});
c$=$_P();
}
return $_N($wt.widgets.Widget$3,i$,v$);
})(this,null)),400);
}return hoverHooked;
});
$_M(c$,"hookMouseDown",
function(){
this.handle.onmousedown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(e.leftButtonHold){
this.b$["$wt.widgets.Widget"].dragStatus=true;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(3)){
this.b$["$wt.widgets.Widget"].sendEvent(3);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$4,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseUp",
function(){
this.handle.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
this.b$["$wt.widgets.Widget"].dragStatus=false;
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(4)){
this.b$["$wt.widgets.Widget"].sendEvent(4);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$5,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseMove",
function(){
this.handle.onmousemove=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var dragHooked=false;
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(this.b$["$wt.widgets.Widget"].dragStatus&&e.leftButtonHold&&this.b$["$wt.widgets.Widget"].hooks(29)){
dragHooked=true;
this.b$["$wt.widgets.Widget"].sendEvent(29);
this.b$["$wt.widgets.Widget"].dragStatus=false;
}if((!dragHooked&&!hoverHooked)||this.b$["$wt.widgets.Widget"].hooks(5)){
this.b$["$wt.widgets.Widget"].sendEvent(5);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$6,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseEnter",
function(){
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(6)){
this.b$["$wt.widgets.Widget"].sendEvent(6);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$7,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseExit",
function(){
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=false;
if(this.b$["$wt.widgets.Widget"].hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.b$["$wt.widgets.Widget"].hoverTimerID);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(7)){
this.b$["$wt.widgets.Widget"].sendEvent(7);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$8,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseDoubleClick",
function(){
this.handle.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(8);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$9,i$,v$);
})(this,null));
});
$_M(c$,"hookSelection",
function(){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$10")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$10",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$10,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusIn",
function(){
this.handle.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$11")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$11",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(15);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$11,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusOut",
function(){
this.handle.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$12")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$12",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(16);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$12,i$,v$);
})(this,null));
});
$_M(c$,"hookModify",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$13")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$13",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(24);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$13,i$,v$);
})(this,null));
});
$_M(c$,"hookHelp",
function(){
this.handle.onhelp=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$14")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$14",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(28);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$14,i$,v$);
})(this,null));
});
$_M(c$,"hookArm",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$15")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$15",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(30);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$15,i$,v$);
})(this,null));
});
$_M(c$,"hookTraverse",
function(){
this.handle.onkeypress=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$16")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$16",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
});
c$=$_P();
}
return $_N($wt.widgets.Widget$16,i$,v$);
})(this,null));
});
$_M(c$,"hookMenuDetect",
function(){
this.handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$17")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$17",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(35);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$17,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseWheel",
function(){
});
$_M(c$,"hooks",
function(eventType){
if(this.eventTable==null)return false;
return this.eventTable.hooks(eventType);
},"~N");
$_M(c$,"isDisposed",
function(){
return(this.state&1)!=0;
});
$_M(c$,"isListening",
function(eventType){
return this.hooks(eventType);
},"~N");
$_M(c$,"isValidSubclass",
function(){
return $wt.widgets.Display.isValidClass(this.getClass());
});
$_M(c$,"isValidThread",
function(){
return true;
});
$_M(c$,"mapEvent",
function(hwnd,event){
},"~N,$wt.widgets.Event");
$_M(c$,"notifyListeners",
function(eventType,event){
if(event==null)event=new $wt.widgets.Event();
this.sendEvent(eventType,event);
},"~N,$wt.widgets.Event");
$_M(c$,"postEvent",
function(eventType){
this.sendEvent(eventType,null,false);
},"~N");
$_M(c$,"postEvent",
function(eventType,event){
this.sendEvent(eventType,event,false);
},"~N,$wt.widgets.Event");
$_M(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
this.state|=1;
this.display=null;
});
$_M(c$,"releaseResources",
function(){
this.releaseWidget();
this.releaseHandle();
});
$_M(c$,"releaseWidget",
function(){
this.sendEvent(12);
this.eventTable=null;
this.data=null;
});
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"removeDisposeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(12,listener);
},"$wt.events.DisposeListener");
$_M(c$,"sendEvent",
function(event){
var display=event.display;
if(display==null){
event.display=display=this.display;
}if(!display.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType){
this.sendEvent(eventType,null,true);
},"~N");
$_M(c$,"sendEvent",
function(eventType,event){
this.sendEvent(eventType,event,true);
},"~N,$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType,event,send){
if(this.eventTable==null&&!this.display.filters(eventType)){
return;
}if(event==null)event=new $wt.widgets.Event();
event.type=eventType;
event.display=this.display;
event.widget=this;
if(event.time==0){
event.time=this.display.getLastEventTime();
}if(send){
this.sendEvent(event);
}else{
this.display.postEvent(event);
}},"~N,$wt.widgets.Event,~B");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam){
var event=new $wt.widgets.Event();
return this.sendKeyEvent(type,msg,wParam,lParam,event);
},"~N,~N,~N,~N");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
this.sendEvent(type,event);
if(this.isDisposed())return false;
return event.doit;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"sendMouseEvent",
function(type,button,hwnd,x,y){
return this.sendMouseEvent(type,button,0,0,false,hwnd,x,y);
},"~N,~N,~O,~N,~N");
$_M(c$,"sendMouseEvent",
function(type,button,count,detail,send,hwnd,x,y){
if(!this.hooks(type)&&!this.filters(type))return true;
var event=new $wt.widgets.Event();
event.button=button;
event.detail=detail;
event.count=count;
event.x=x;
event.y=y;
switch(type){
case 3:
case 8:
if(event.button==1)event.stateMask&=-524289;
if(event.button==2)event.stateMask&=-1048577;
if(event.button==3)event.stateMask&=-2097153;
if(event.button==4)event.stateMask&=-8388609;
if(event.button==5)event.stateMask&=-33554433;
break;
case 4:
if(event.button==1)event.stateMask|=524288;
if(event.button==2)event.stateMask|=1048576;
if(event.button==3)event.stateMask|=2097152;
if(event.button==4)event.stateMask|=8388608;
if(event.button==5)event.stateMask|=33554432;
break;
}
if(send){
this.sendEvent(type,event);
if(this.isDisposed())return false;
}else{
this.postEvent(type,event);
}return event.doit;
},"~N,~N,~N,~N,~B,~O,~N,~N");
$_M(c$,"setData",
function(data){
if((this.state&4)!=0){
(this.data)[0]=data;
}else{
this.data=data;
}},"~O");
$_M(c$,"setData",
function(key,value){
var index=1;
var table=null;
if((this.state&4)!=0){
table=this.data;
while(index<table.length){
if(key.equals(table[index]))break;
index+=2;
}
}if(value!=null){
if((this.state&4)!=0){
if(index==table.length){
var newTable=new Array(table.length+2);
System.arraycopy(table,0,newTable,0,table.length);
this.data=table=newTable;
}}else{
table=new Array(3);
table[0]=this.data;
this.data=table;
this.state|=4;
}table[index]=key;
table[index+1]=value;
}else{
if((this.state&4)!=0){
if(index!=table.length){
var length=table.length-2;
if(length==1){
this.data=table[0];
this.state&=-5;
}else{
var newTable=new Array(length);
System.arraycopy(table,0,newTable,0,index);
System.arraycopy(table,index+2,newTable,index,length-index);
this.data=newTable;
}}}}},"~S,~O");
$_M(c$,"sendFocusEvent",
function(type){
this.sendEvent(type);
return true;
},"~N");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if(hWnd==null)return true;
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"showMenu",
function(x,y){
var event=new $wt.widgets.Event();
event.x=x;
event.y=y;
this.sendEvent(35,event);
if(!event.doit)return true;
var menu=this.getMenu();
if(menu!=null&&!menu.isDisposed()){
if(x!=event.x||y!=event.y){
menu.setLocation(event.x,event.y);
}menu.setVisible(true);
return true;
}return false;
},"~N,~N");
$_V(c$,"toString",
function(){
var string="*Disposed*";
if(!this.isDisposed()){
string="*Wrong Thread*";
if(this.isValidThread())string=this.getNameText();
}return this.getName()+" {"+string+"}";
});
$_S(c$,
"DISPOSED",1,
"CANVAS",2,
"KEYED_DATA",4,
"DISABLED",8,
"HIDDEN",16,
"LAYOUT_NEEDED",32,
"LAYOUT_CHANGED",64,
"DEFAULT_WIDTH",64,
"DEFAULT_HEIGHT",64);
c$=$_C(function(){
this.parent=null;
this.cursor=null;
this.menu=null;
this.toolTipText=null;
this.layoutData=null;
this.accessible=null;
this.drawCount=0;
this.foreground=0;
this.background=0;
this.left=0;
this.top=0;
this.height=0;
this.width=0;
$_Z(this,arguments);
},$wt.widgets,"Control",$wt.widgets.Widget,$wt.graphics.Drawable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Control,[parent,style]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Composite,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addFocusListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(15,typedListener);
this.addListener(16,typedListener);
},"$wt.events.FocusListener");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addKeyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(2,typedListener);
this.addListener(1,typedListener);
},"$wt.events.KeyListener");
$_M(c$,"addMouseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(3,typedListener);
this.addListener(4,typedListener);
this.addListener(8,typedListener);
},"$wt.events.MouseListener");
$_M(c$,"addMouseTrackListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(6,typedListener);
this.addListener(7,typedListener);
this.addListener(32,typedListener);
},"$wt.events.MouseTrackListener");
$_M(c$,"addMouseMoveListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(5,typedListener);
},"$wt.events.MouseMoveListener");
$_M(c$,"addPaintListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(9,typedListener);
},"$wt.events.PaintListener");
$_M(c$,"addTraverseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(31,typedListener);
},"$wt.events.TraverseListener");
$_M(c$,"borderHandle",
function(){
return this.handle;
});
$_M(c$,"checkBorder",
function(){
if(this.getBorderWidth()==0)this.style&=-2049;
});
$_M(c$,"checkBuffered",
function(){
this.style&=-536870913;
});
$_M(c$,"checkHandle",
function(hwnd){
return hwnd==this.handle;
},"$wt.internal.xhtml.Element");
$_M(c$,"checkMirrored",
function(){
if((this.style&67108864)!=0){
}});
$_M(c$,"computeSize",
function(wHint,hHint){
return this.computeSize(wHint,hHint,true);
},"~N,~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=64;
var height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTabGroup",
function(){
if(this.isTabGroup())return this;
return this.parent.computeTabGroup();
});
$_M(c$,"computeTabRoot",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
var index=0;
while(index<tabList.length){
if(tabList[index]==this)break;
index++;
}
if(index==tabList.length){
if(this.isTabGroup())return this;
}}return this.parent.computeTabRoot();
});
$_M(c$,"computeTabList",
function(){
if(this.isTabGroup()){
if(this.getVisible()&&this.getEnabled()){
return[this];
}}return new Array(0);
});
$_M(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
});
$_M(c$,"createWidget",
function(){
this.foreground=this.background=-1;
this.checkOrientation(this.parent);
this.createHandle();
this.checkBuffered();
this.register();
this.setDefaultFont();
this.checkMirrored();
this.checkBorder();
});
$_M(c$,"deregister",
function(){
this.display.removeControl(this.handle);
});
$_V(c$,"destroyWidget",
function(){
var hwnd=this.topHandle();
this.releaseHandle();
if(hwnd!=null){
O$.destroyHandle(hwnd);
}});
$_M(c$,"enableWidget",
function(enabled){
this.handle.disabled=!enabled;
},"~B");
$_M(c$,"findBrush",
function(pixel){
return this.parent.findBrush(pixel);
},"~N");
$_M(c$,"findCursor",
function(){
if(this.cursor!=null)return this.cursor;
return this.parent.findCursor();
});
$_M(c$,"findThemeControl",
function(){
return this.background==-1?this.parent.findThemeControl():null;
});
$_M(c$,"findMenus",
function(control){
if(this.menu!=null&&this!=control)return[this.menu];
return new Array(0);
},"$wt.widgets.Control");
$_M(c$,"findMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"fixChildren",
function(newShell,oldShell,newDecorations,oldDecorations,menus){
oldShell.fixShell(newShell,this);
oldDecorations.fixDecorations(newDecorations,this,menus);
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixFocus",
function(focusControl){
var shell=this.getShell();
var control=this;
while(control!=shell&&(control=control.parent)!=null){
if(control.setFixedFocus())return;
}
shell.setSavedFocus(focusControl);
},"$wt.widgets.Control");
$_M(c$,"forceFocus",
function(){
if(this.display.focusEvent==16)return false;
var shell=this.menuShell();
shell.setSavedFocus(this);
if(!this.isEnabled()||!this.isVisible()||!this.isActive())return false;
if(this.isFocusControl())return true;
shell.setSavedFocus(null);
if(this.isDisposed())return false;
shell.setSavedFocus(this);
return this.isFocusControl();
});
$_M(c$,"forceResize",
function(){
if(this.parent==null)return;
var lpwp=this.parent.lpwp;
if(lpwp==null)return;
for(var i=0;i<lpwp.length;i++){
var wp=lpwp[i];
if(wp!=null&&wp.hwnd==this.handle){
this.SetWindowPos(wp.hwnd,null,wp.x,wp.y,wp.cx,wp.cy,wp.flags);
lpwp[i]=null;
return;
}}
});
$_M(c$,"getAccessible",
function(){
return this.accessible;
});
$_M(c$,"getBackground",
function(){
var bg=this.handle.style.backgroundColor;
if(bg==null||bg.toString().length==0){
return new $wt.graphics.Color(this.display,"menu");
}return new $wt.graphics.Color(this.display,bg);
});
$_M(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 1;
}return 0;
});
$_M(c$,"getBounds",
function(){
this.forceResize();
return new $wt.graphics.Rectangle(this.left,this.top,this.width,this.height);
});
$_M(c$,"getEnabled",
function(){
return!this.handle.disabled;
});
$_M(c$,"getFont",
function(){
var ff=this.handle.style.fontFamily;
if(ff==null||ff.toString().length==0){
ff="Tahoma, Arial, sans-serif";
}var fs=this.handle.style.fontSize;
if(fs==null||fs.toString().length==0){
fs="8";
}return new $wt.graphics.Font(this.display,ff,Integer.parseInt(fs),0);
});
$_M(c$,"getForeground",
function(){
var fg=this.handle.style.color;
if(fg==null||fg.toString().length==0){
return new $wt.graphics.Color(this.display,"black");
}return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"getLayoutData",
function(){
return this.layoutData;
});
$_M(c$,"getLocation",
function(){
this.forceResize();
return new $wt.graphics.Point(this.left,this.top);
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getMonitor",
function(){
return this.display.getPrimaryMonitor();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getPath",
function(){
var count=0;
var shell=this.getShell();
var control=this;
while(control!=shell){
count++;
control=control.parent;
}
control=this;
var result=new Array(count);
while(control!=shell){
result[--count]=control;
control=control.parent;
}
return result;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getSize",
function(){
this.forceResize();
return new $wt.graphics.Point(this.width,this.height);
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
if(this.drawCount!=0)return(this.state&16)==0;
return this.handle.style.visibility!="hidden";
});
$_M(c$,"hasCursor",
function(){
return false;
});
$_M(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"isActive",
function(){
var dialogShell=this.display.getModalDialogShell();
if(dialogShell!=null&&dialogShell!=this.getShell()){
return false;
}var shell=null;
var modalShells=this.display.modalShells;
if(modalShells!=null){
var bits=196608;
var index=modalShells.length;
while(--index>=0){
var modal=modalShells[index];
if(modal!=null){
if((modal.style&bits)!=0){
var control=this;
while(control!=null){
if(control==modal)break;
control=control.parent;
}
if(control!=modal)return false;
break;
}if((modal.style&32768)!=0){
if(shell==null)shell=this.getShell();
if(modal.parent==shell)return false;
}}}
}if(shell==null)shell=this.getShell();
return shell.getEnabled();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isFocusControl",
function(){
return this.hasFocus();
});
$_M(c$,"isFocusAncestor",
function(control){
while(control!=null&&control!=this){
control=control.parent;
}
return control==this;
},"$wt.widgets.Control");
$_M(c$,"isReparentable",
function(){
return true;
});
$_M(c$,"isShowing",
function(){
if(!this.isVisible())return false;
var control=this;
while(control!=null){
var size=control.getSize();
if(size.x==0||size.y==0){
return false;
}control=control.parent;
}
return true;
});
$_M(c$,"isTabGroup",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]==this)return true;
}
}return true;
});
$_M(c$,"isTabItem",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]==this)return false;
}
}return false;
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"mapEvent",
function(hwnd,event){
if(hwnd!=this.handle){
}},"$wt.internal.xhtml.Element,$wt.widgets.Event");
$_M(c$,"markLayout",
function(changed,all){
},"~B,~B");
$_M(c$,"menuShell",
function(){
return this.parent.menuShell();
});
$_M(c$,"mnemonicHit",
function(key){
return false;
},"~N");
$_M(c$,"mnemonicMatch",
function(key){
return false;
},"~N");
$_M(c$,"moveAbove",
function(control){
if(control!=null){
if(this.parent!=control.parent)return;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.removeChild(this.handle);
parentHandle.insertBefore(this.handle,control.handle);
}}}},"$wt.widgets.Control");
$_M(c$,"moveBelow",
function(control){
if(control!=null){
if(this.parent!=control.parent)return;
this.parent.handle.removeChild(this.handle);
if(control.handle.nextSibling!=null){
this.parent.handle.insertBefore(this.handle,control.handle.nextSibling);
}else{
this.parent.handle.appendChild(this.handle);
}}},"$wt.widgets.Control");
$_M(c$,"pack",
function(){
this.pack(true);
});
$_M(c$,"pack",
function(changed){
var computeSize=this.computeSize(-1,-1,changed);
System.out.println(computeSize);
this.setSize(computeSize);
},"~B");
$_M(c$,"redraw",
function(){
});
$_M(c$,"redraw",
function(x,y,width,height,all){
if(width<=0||height<=0)return;
},"~N,~N,~N,~N,~B");
$_M(c$,"register",
function(){
this.display.addControl(this.handle,this);
if(this.parent!=null){
this.parent.children[this.parent.children.length]=this;
}});
$_V(c$,"releaseChild",
function(){
this.parent.removeControl(this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Control,"releaseHandle",[]);
if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Control,"releaseWidget",[]);
if(this.toolTipText!=null){
var shell=this.getShell();
shell.setToolTipText(this.handle,null);
}this.toolTipText=null;
if(this.menu!=null&&!this.menu.isDisposed()){
this.menu.dispose();
}this.menu=null;
this.cursor=null;
this.deregister();
this.parent=null;
this.layoutData=null;
this.accessible=null;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeFocusListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(15,listener);
this.eventTable.unhook(16,listener);
},"$wt.events.FocusListener");
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeKeyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(2,listener);
this.eventTable.unhook(1,listener);
},"$wt.events.KeyListener");
$_M(c$,"removeMouseTrackListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(6,listener);
this.eventTable.unhook(7,listener);
this.eventTable.unhook(32,listener);
},"$wt.events.MouseTrackListener");
$_M(c$,"removeMouseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(3,listener);
this.eventTable.unhook(4,listener);
this.eventTable.unhook(8,listener);
},"$wt.events.MouseListener");
$_M(c$,"removeMouseMoveListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(5,listener);
},"$wt.events.MouseMoveListener");
$_M(c$,"removePaintListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(9,listener);
},"$wt.events.PaintListener");
$_M(c$,"removeTraverseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(31,listener);
},"$wt.events.TraverseListener");
$_M(c$,"showWidget",
function(visible){
this.handle.style.visibility=visible?"visible":"hidden";
},"~B");
$_V(c$,"sendFocusEvent",
function(type){
var shell=this.getShell();
var display=this.display;
display.focusEvent=type;
display.focusControl=this;
this.sendEvent(type);
display.focusEvent=0;
display.focusControl=null;
if(!shell.isDisposed()){
switch(type){
case 15:
shell.setActiveControl(this);
break;
case 16:
if(shell!=display.getActiveShell()){
shell.setActiveControl(null);
}break;
}
}return true;
},"~N");
$_M(c$,"setBackground",
function(color){
if(color!=null)this.handle.style.backgroundColor=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(x,y,width,height){
var flags=0;
this.setBounds(x,y,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
this.setBounds(x,y,width,height,flags,true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
var topHandle=this.topHandle();
if(defer&&this.parent!=null){
this.forceResize();
var lpwp=this.parent.lpwp;
if(lpwp==null){
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}else{
var index=0;
while(index<lpwp.length){
if(lpwp[index]==null)break;
index++;
}
if(index==lpwp.length){
var newLpwp=new Array(lpwp.length+4);
System.arraycopy(lpwp,0,newLpwp,0,lpwp.length);
this.parent.lpwp=lpwp=newLpwp;
}var wp=new $wt.internal.struct.WINDOWPOS();
wp.hwnd=topHandle;
wp.x=x;
wp.y=y;
wp.cx=width;
wp.cy=height;
wp.flags=flags;
lpwp[index]=wp;
}}else{
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setBounds",
function(rect){
this.setBounds(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setCapture",
function(capture){
},"~B");
$_M(c$,"setCursor",
function(){
});
$_M(c$,"setCursor",
function(cursor){
this.cursor=cursor;
this.handle.style.cursor=cursor.getCSSHandle();
},"$wt.graphics.Cursor");
$_M(c$,"setDefaultFont",
function(){
});
$_M(c$,"setEnabled",
function(enabled){
var control=null;
var fixFocus=false;
if(!enabled){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}this.enableWidget(enabled);
if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFont",
function(font){
if(font==null||font.data==null)return;
this.handle.style.fontFamily=font.data.name;
this.handle.style.fontSize=font.data.height+"pt";
if((font.data.style&1)!=0){
this.handle.style.fontWeight="bold";
}else{
this.handle.style.fontWeight="normal";
}if((font.data.style&2)!=0){
this.handle.style.fontStyle="italic";
}else{
this.handle.style.fontStyle="normal";
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null)this.handle.style.color=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setLayoutData",
function(layoutData){
this.layoutData=layoutData;
},"~O");
$_M(c$,"setLocation",
function(x,y){
var flags=0;
this.setBounds(x,y,this.width,this.height,flags);
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setMenu",
function(menu){
if(menu!=null){
}this.menu=menu;
if(this.handle.oncontextmenu==null){
this.handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Control$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Control$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Control"].showMenu(0,0);
});
c$=$_P();
}
return $_N($wt.widgets.Control$1,i$,v$);
})(this,null));
}},"$wt.widgets.Menu");
$_M(c$,"setRadioFocus",
function(){
return false;
});
$_M(c$,"setRadioSelection",
function(value){
return false;
},"~B");
$_M(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setSavedFocus",
function(){
return this.forceFocus();
});
$_M(c$,"setSize",
function(width,height){
var flags=0;
this.setBounds(0,0,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N");
$_M(c$,"setSize",
function(size){
System.err.println(size);
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setTabGroupFocus",
function(){
return this.setTabItemFocus();
});
$_M(c$,"setTabItemFocus",
function(){
if(!this.isShowing())return false;
return this.forceFocus();
});
$_M(c$,"setToolTipText",
function(string){
var shell=this.getShell();
shell.setToolTipText(this.handle,this.toolTipText=string);
},"~S");
$_M(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if((this.handle.style.visibility!="hidden")==visible)return;
}if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}var control=null;
var fixFocus=false;
if(!visible){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}if(this.drawCount!=0){
this.state=visible?this.state&-17:this.state|16;
}else{
this.showWidget(visible);
if(this.isDisposed())return;
}if(!visible){
this.sendEvent(23);
if(this.isDisposed())return;
}if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"sort",
function(items){
var length=items.length;
for(var gap=Math.floor(length/ 2); gap > 0; gap /=2){
for(var i=gap;i<length;i++){
for(var j=i-gap;j>=0;j-=gap){
if(items[j]<=items[j+gap]){
var swap=items[j];
items[j]=items[j+gap];
items[j+gap]=swap;
}}
}
}
},"~A");
$_M(c$,"toControl",
function(x,y){
return new $wt.graphics.Point(x,y);
},"~N,~N");
$_M(c$,"toControl",
function(point){
return this.toControl(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"toDisplay",
function(x,y){
return new $wt.graphics.Point(x,y);
},"~N,~N");
$_M(c$,"toDisplay",
function(point){
return this.toDisplay(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"topHandle",
function(){
return this.handle;
});
$_M(c$,"traverse",
function(event){
this.sendEvent(31,event);
if(this.isDisposed())return true;
if(!event.doit)return false;
switch(event.detail){
case 0:
return true;
case 2:
return this.traverseEscape();
case 4:
return this.traverseReturn();
case 16:
return this.traverseGroup(true);
case 8:
return this.traverseGroup(false);
case 64:
return this.traverseItem(true);
case 32:
return this.traverseItem(false);
case 128:
return this.traverseMnemonic(event.character);
case 512:
return this.traversePage(true);
case 256:
return this.traversePage(false);
}
return false;
},"$wt.widgets.Event");
$_M(c$,"traverse",
function(traversal){
var event=new $wt.widgets.Event();
event.doit=true;
event.detail=traversal;
return this.traverse(event);
},"~N");
$_M(c$,"traverseEscape",
function(){
return false;
});
$_M(c$,"traverseGroup",
function(next){
var root=this.computeTabRoot();
var group=this.computeTabGroup();
var list=root.computeTabList();
var length=list.length;
var index=0;
while(index<length){
if(list[index]==group)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=((index+offset+length)%length))!=start){
var control=list[index];
if(!control.isDisposed()&&control.setTabGroupFocus()){
return true;
}}
if(group.isDisposed())return false;
return group.setTabGroupFocus();
},"~B");
$_M(c$,"traverseItem",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]==this)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&child.isTabItem()){
if(child.setTabItemFocus())return true;
}}
return false;
},"~B");
$_M(c$,"traverseMnemonic",
function(key){
return this.mnemonicHit(key);
},"~N");
$_M(c$,"traversePage",
function(next){
return false;
},"~B");
$_M(c$,"traverseReturn",
function(){
return false;
});
$_M(c$,"update",
function(){
this.update(false);
});
$_M(c$,"update",
function(all){
},"~B");
$_M(c$,"updateFont",
function(oldFont,newFont){
var sameFont=this.getFont().equals(oldFont);
if(sameFont)this.setFont(newFont);
return sameFont;
},"$wt.graphics.Font,$wt.graphics.Font");
$_M(c$,"updateLayout",
function(resize,all){
},"~B,~B");
$_M(c$,"widgetParent",
function(){
if(this.parent==null){
return null;
}return this.parent.handle;
});
$_M(c$,"setParent",
function(parent){
if(this.parent==parent)return true;
if(!this.isReparentable())return false;
this.releaseChild();
var newShell=parent.getShell();
var oldShell=this.getShell();
var newDecorations=parent.menuShell();
var oldDecorations=this.menuShell();
if(oldShell!=newShell||oldDecorations!=newDecorations){
var menus=oldShell.findMenus(this);
this.fixChildren(newShell,oldShell,newDecorations,oldDecorations,menus);
}this.parent=parent;
return true;
},"$wt.widgets.Composite");
c$=$_C(function(){
this.horizontalBar=null;
this.verticalBar=null;
$_Z(this,arguments);
},$wt.widgets,"Scrollable",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Scrollable,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"computeTrim",
function(x,y,width,height){
var border=this.getBorderWidth();
return new $wt.graphics.Rectangle(x-border,y-border,width+border*2,height+border*2);
},"~N,~N,~N,~N");
$_M(c$,"createScrollBar",
function(type){
var bar=new $wt.widgets.ScrollBar(this,type);
if((this.state&2)!=0){
bar.setMaximum(100);
bar.setThumb(10);
}return bar;
},"~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Scrollable,"createWidget",[]);
if((this.style&256)!=0)this.horizontalBar=this.createScrollBar(256);
if((this.style&512)!=0)this.verticalBar=this.createScrollBar(512);
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var w=-1;
var h=-1;
w=this.width;
h=this.height;
if(w<0){
w=64;
}if(h<0){
h=64;
}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"releaseHandle",
function(){
if(this.horizontalBar!=null){
this.horizontalBar.releaseHandle();
this.horizontalBar=null;
}if(this.verticalBar!=null){
this.verticalBar.releaseHandle();
this.verticalBar=null;
}$_U(this,$wt.widgets.Scrollable,"releaseHandle",[]);
});
$_M(c$,"getHorizontalBar",
function(){
return this.horizontalBar;
});
$_M(c$,"getVerticalBar",
function(){
return this.verticalBar;
});
$_M(c$,"releaseWidget",
function(){
if(this.horizontalBar!=null)this.horizontalBar.releaseResources();
if(this.verticalBar!=null)this.verticalBar.releaseResources();
this.horizontalBar=this.verticalBar=null;
$_U(this,$wt.widgets.Scrollable,"releaseWidget",[]);
});
$_M(c$,"scrolledHandle",
function(){
return this.handle;
});
c$=$_C(function(){
this.$layout=null;
this.lpwp=null;
this.tabList=null;
this.layoutCount=0;
this.children=null;
$_Z(this,arguments);
},$wt.widgets,"Composite",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Composite,[parent,style]);
this.children=new Array(0);
},"$wt.widgets.Composite,~N");
$_M(c$,"_getChildren",
function(){
var count=this.children.length;
var index=0;
var newChildren=new Array(0);
for(var i=0;i<count;i++){
var control=this.children[i];
if(control!=null&&control!=this){
newChildren[index++]=control;
}}
return newChildren;
});
$_M(c$,"_getTabList",
function(){
if(this.tabList==null)return this.tabList;
var count=0;
for(var i=0;i<this.tabList.length;i++){
if(!this.tabList[i].isDisposed())count++;
}
if(count==this.tabList.length)return this.tabList;
var newList=new Array(count);
var index=0;
for(var i=0;i<this.tabList.length;i++){
if(!this.tabList[i].isDisposed()){
newList[index++]=this.tabList[i];
}}
this.tabList=newList;
return this.tabList;
});
$_M(c$,"changed",
function(changed){
for(var i=0;i<changed.length;i++){
var control=changed[i];
var ancestor=false;
var composite=control.parent;
while(composite!=null){
ancestor=composite==this;
if(ancestor)break;
composite=composite.parent;
}
}
for(var i=0;i<changed.length;i++){
var child=changed[i];
var composite=child.parent;
while(child!=this){
if(composite.$layout==null||!composite.$layout.flushCache(child)){
composite.state|=64;
}child=composite;
composite=child.parent;
}
}
},"~A");
$_V(c$,"checkBuffered",
function(){
});
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeTabList",
function(){
var result=$_U(this,$wt.widgets.Composite,"computeTabList",[]);
if(result.length==0)return result;
var list=this.tabList!=null?this._getTabList():this._getChildren();
for(var i=0;i<list.length;i++){
var child=list[i];
var childList=child.computeTabList();
if(childList.length!=0){
var newResult=new Array(result.length+childList.length);
System.arraycopy(result,0,newResult,0,result.length);
System.arraycopy(childList,0,newResult,result.length,childList.length);
result=newResult;
}}
return result;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size;
if(this.$layout!=null){
if(wHint==-1||hHint==-1){
changed=new Boolean(changed|((this.state&64)!=0));
this.state&=-65;
size=this.$layout.computeSize(this,wHint,hHint,changed);
}else{
size=new $wt.graphics.Point(wHint,hHint);
}}else{
size=this.minimumSize(wHint,hHint,changed);
}if(size.x==0)size.x=64;
if(size.y==0)size.y=64;
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
var trim=this.computeTrim(0,0,size.x,size.y);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_M(c$,"containerHandle",
function(){
return this.handle;
});
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="composite-default";
if((this.style&2048)!=0){
this.handle.className+=" composite-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.state|=2;
});
$_M(c$,"findMenus",
function(control){
if(control==this)return new Array(0);
var result=$_U(this,$wt.widgets.Composite,"findMenus",[control]);
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
var menuList=child.findMenus(control);
if(menuList.length!=0){
var newResult=new Array(result.length+menuList.length);
System.arraycopy(result,0,newResult,0,result.length);
System.arraycopy(menuList,0,newResult,result.length,menuList.length);
result=newResult;
}}
return result;
},"$wt.widgets.Control");
$_M(c$,"fixChildren",
function(newShell,oldShell,newDecorations,oldDecorations,menus){
$_U(this,$wt.widgets.Composite,"fixChildren",[newShell,oldShell,newDecorations,oldDecorations,menus]);
var children=this._getChildren();
for(var i=0;i<children.length;i++){
children[i].fixChildren(newShell,oldShell,newDecorations,oldDecorations,menus);
}
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixChildrenList",
function(control){
if(this.children==null||this.children.length==0)return;
var newChildren=new Array(0);
for(var i=0;i<this.children.length;i++){
var child=this.children[i];
if(child!=null&&child!=control){
newChildren[newChildren.length]=child;
}}
this.children=newChildren;
},"$wt.widgets.Control");
$_M(c$,"fixTabList",
function(control){
if(this.tabList==null)return;
var count=0;
for(var i=0;i<this.tabList.length;i++){
if(this.tabList[i]==control)count++;
}
if(count==0)return;
var newList=null;
var length=this.tabList.length-count;
if(length!=0){
newList=new Array(length);
var index=0;
for(var i=0;i<this.tabList.length;i++){
if(this.tabList[i]!=control){
newList[index++]=this.tabList[i];
}}
}this.tabList=newList;
},"$wt.widgets.Control");
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getChildren",
function(){
return this._getChildren();
});
$_M(c$,"getChildrenCount",
function(){
if(true)return 0;
return this.children.length;
});
$_M(c$,"getLayout",
function(){
return this.$layout;
});
$_M(c$,"getTabList",
function(){
var tabList=this._getTabList();
if(tabList==null){
var count=0;
var list=this._getChildren();
for(var i=0;i<list.length;i++){
if(list[i].isTabGroup())count++;
}
tabList=new Array(count);
var index=0;
for(var i=0;i<list.length;i++){
if(list[i].isTabGroup()){
tabList[index++]=list[i];
}}
}return tabList;
});
$_M(c$,"hooksKeys",
function(){
return this.hooks(1)||this.hooks(2);
});
$_M(c$,"getLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_M(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0||this.parent.isLayoutDeferred();
});
$_M(c$,"layout",
function(){
this.layout(true);
});
$_M(c$,"layout",
function(changed){
if(this.$layout==null)return;
this.layout(changed,true);
},"~B");
$_M(c$,"layout",
function(changed,all){
if(this.$layout==null&&!all)return;
this.markLayout(changed,all);
this.updateLayout(true,all);
},"~B,~B");
$_M(c$,"layout",
function(changed){
System.out.print("control");
var d=new java.util.Date();
for(var i=0;i<changed.length;i++){
var control=changed[i];
var ancestor=false;
var composite=control.parent;
while(composite!=null){
ancestor=composite==this;
if(ancestor)break;
composite=composite.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
var updateCount=0;
var update=new Array(16);
for(var i=0;i<changed.length;i++){
var child=changed[i];
var composite=child.parent;
while(child!=this){
if(composite.$layout!=null){
composite.state|=32;
if(!composite.$layout.flushCache(child)){
composite.state|=64;
}}if(updateCount==update.length){
var newUpdate=new Array(update.length+16);
System.arraycopy(update,0,newUpdate,0,update.length);
update=newUpdate;
}child=update[updateCount++]=composite;
composite=child.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
for(var i=updateCount-1;i>=0;i--){
update[i].updateLayout(true,false);
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
},"~A");
$_M(c$,"markLayout",
function(changed,all){
if(this.$layout!=null){
this.state|=32;
if(changed)this.state|=64;
}if(all){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
children[i].markLayout(changed,all);
}
}},"~B,~B");
$_M(c$,"minimumSize",
function(wHint,hHint,changed){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var rect=children[i].getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"releaseChildren",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(!child.isDisposed())child.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseChildren();
$_U(this,$wt.widgets.Composite,"releaseWidget",[]);
if((this.state&2)!=0&&(this.style&16777216)!=0){
}this.children=null;
this.$layout=null;
this.tabList=null;
if(this.lpwp!=null){
for(var i=0;i<this.lpwp.length;i++){
this.lpwp[i].hwnd=null;
this.lpwp[i].hwndInsertAfter=null;
}
}this.lpwp=null;
});
$_M(c$,"removeControl",
function(control){
this.fixTabList(control);
this.fixChildrenList(control);
this.resizeChildren();
},"$wt.widgets.Control");
$_M(c$,"resizeChildren",
function(){
if(this.lpwp==null)return;
do{
var currentLpwp=this.lpwp;
this.lpwp=null;
if(!this.resizeChildren(true,currentLpwp)){
this.resizeChildren(false,currentLpwp);
}}while(this.lpwp!=null);
});
$_M(c$,"resizeChildren",
function(defer,pwp){
if(pwp==null)return true;
var hdwp=0;
if(defer){
if(hdwp==0)return false;
}for(var i=0;i<pwp.length;i++){
var wp=pwp[i];
if(wp!=null){
if(defer){
if(hdwp==0)return false;
}else{
this.SetWindowPos(wp.hwnd,null,wp.x,wp.y,wp.cx,wp.cy,wp.flags);
}}}
return true;
},"~B,~A");
$_M(c$,"setFixedFocus",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setFixedFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFixedFocus",[]);
});
$_M(c$,"setFocus",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFocus",[]);
});
$_M(c$,"setLayout",
function(layout){
this.$layout=layout;
},"$wt.widgets.Layout");
$_M(c$,"setLayoutDeferred",
function(defer){
if(!defer){
if(--this.layoutCount==0){
if(!this.isLayoutDeferred())this.updateLayout(true,true);
}}else{
this.layoutCount++;
}},"~B");
$_M(c$,"setTabList",
function(tabList){
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
var control=tabList[i];
}
var newList=new Array(tabList.length);
System.arraycopy(tabList,0,newList,0,tabList.length);
tabList=newList;
}this.tabList=tabList;
},"~A");
$_M(c$,"setResizeChildren",
function(resize){
if(resize){
this.resizeChildren();
}else{
var count=this.getChildrenCount();
if(count>1&&this.lpwp==null){
this.lpwp=new Array(count);
}}},"~B");
$_V(c$,"setTabGroupFocus",
function(){
if(this.isTabItem())return this.setTabItemFocus();
var takeFocus=(this.style&524288)==0;
if((this.state&2)!=0){
takeFocus=this.hooksKeys();
if((this.style&16777216)!=0)takeFocus=true;
}if(takeFocus&&this.setTabItemFocus())return true;
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.isTabItem()&&child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.isTabItem()&&child.setTabItemFocus())return true;
}
return false;
});
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_V(c$,"updateLayout",
function(resize,all){
if(this.isLayoutDeferred())return;
if((this.state&32)!=0){
var changed=(this.state&64)!=0;
this.state&=-97;
if(resize)this.setResizeChildren(false);
this.$layout.layout(this,changed);
if(resize)this.setResizeChildren(true);
}if(all){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
if($_O(children[i],$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(children[i],2,[resize,all]));
}}
}},"~B,~B");
c$=$_C(function(){
this.caret=null;
$_Z(this,arguments);
},$wt.widgets,"Canvas",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Canvas,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"clearArea",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"getCaret",
function(){
return this.caret;
});
$_M(c$,"releaseWidget",
function(){
if(this.caret!=null)this.caret.releaseResources();
this.caret=null;
$_U(this,$wt.widgets.Canvas,"releaseWidget",[]);
});
$_M(c$,"scroll",
function(destX,destY,x,y,width,height,all){
this.forceResize();
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"setCaret",
function(caret){
var newCaret=caret;
this.caret=newCaret;
},"$wt.widgets.Caret");
$_M(c$,"setFont",
function(font){
if(this.caret!=null)this.caret.setFont(font);
$_U(this,$wt.widgets.Canvas,"setFont",[font]);
},"$wt.graphics.Font");
c$=$_C(function(){
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=false;
this.event=null;
this.type=0;
$_Z(this,arguments);
},$wt.internal.dnd,"HTMLEventWrapper");
$_K(c$,
function(event){
this.event=event;
this.wrapEvent(event);
},"~O");
$_M(c$,"wrapEvent",
function(event){
},"~O");
$_M(c$,"stopPropagation",
function(){
});
$_M(c$,"preventDefault",
function(){
});
$_I($wt.internal.dnd,"DragListener");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.dnd,"DragAdapter",null,$wt.internal.dnd.DragListener);
$_V(c$,"dragBegan",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
c$=$_C(function(){
this.event=null;
this.sourceElement=null;
this.startX=0;
this.startY=0;
this.currentX=0;
this.currentY=0;
$_Z(this,arguments);
},$wt.internal.dnd,"DragEvent");
$_K(c$,
function(evt,src,x,y){
this.event=evt;
this.sourceElement=src;
this.startX=x;
this.startY=y;
},"$wt.internal.dnd.HTMLEventWrapper,$wt.internal.xhtml.Element,~N,~N");
$_M(c$,"deltaX",
function(){
return this.currentX-this.startX;
});
$_M(c$,"deltaY",
function(){
return this.currentY-this.startY;
});
$_M(c$,"mouseMoveTo",
function(currentX,currentY){
this.currentX=currentX;
this.currentY=currentY;
},"~N,~N");
$_V(c$,"toString",
function(){
return"DragEvent {"+this.sourceElement+"#"+"("+this.startX+","+this.startY+")->"+"("+this.currentX+","+this.currentY+")}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.dnd,"DNDUtils");
c$.bindFunctionWith=$_M(c$,"bindFunctionWith",
function(aFun,obj){
return obj;
},"~O,~O");
c$.onselectstart=$_M(c$,"onselectstart",
function(e){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
evt.preventDefault();
evt.stopPropagation();
return false;
},"~O");
c$.onmousemove=$_M(c$,"onmousemove",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if(!evt.leftButtonHold){
if(oThis.status!=0){
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragEnded(dndEvt);
oThis.status=0;
}oThis.reset();
return false;
}var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
if(oThis.status==0){
oThis.status=1;
oThis.startX=evt.x;
oThis.startY=evt.y;
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragBegan(dndEvt);
}dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragging(dndEvt);
return true;
},"~O,$wt.internal.dnd.DragAndDrop");
c$.onmousedown=$_M(c$,"onmousedown",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if(!oThis.checkDraggable(evt)){
return true;
}d$.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
evt.target.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
d$.onmousemove=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousemove,oThis);
d$.onkeyup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onkeyup,oThis);
d$.onmouseup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmouseup,oThis);
evt.preventDefault();
evt.stopPropagation();
return false;
},"~O,$wt.internal.dnd.DragAndDrop");
c$.onkeyup=$_M(c$,"onkeyup",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if((evt.event).keyCode==27){
if(oThis.status!=0){
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragCanceled(dndEvt);
oThis.status=0;
}oThis.reset();
return false;
}return true;
},"~O,$wt.internal.dnd.DragAndDrop");
c$.onmouseup=$_M(c$,"onmouseup",
function(e,oThis){
if(oThis.status!=0){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragEnded(dndEvt);
oThis.status=0;
}oThis.reset();
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
evt.preventDefault();
evt.stopPropagation();
return false;
},"~O,$wt.internal.dnd.DragAndDrop");
$_S(c$,
"$onselectstart",null,
"$onmousemove",null,
"$onmousedown",null,
"$onmouseup",null,
"$onkeyup",null);

var methods=["onmousedown","onmouseup","onmousemove",
"onkeyup","onselectstart"];
for(var i=0;i<methods.length;i++){
org.eclipse.swt.internal.dnd.DNDUtils["$"+methods[i]]=
org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
org.eclipse.swt.internal.dnd.DNDUtils.bindFunctionWith=function(aFun,obj){
var xFun=null;
eval("xFun = "+aFun+";");
return(function(yFun,o){
return function(e){
return yFun(e,o);
}
})(xFun,obj);
};
org.eclipse.swt.internal.dnd.HTMLEventWrapper.prototype.wrapEvent=null;
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=0;
$_M(org.eclipse.swt.internal.dnd.HTMLEventWrapper,"wrapEvent",
function(e){
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=true;
this.event=null;
this.type=0;


if(!e){
e=window.event;
this.stopPropagation=function(){
this.event.cancelBubble=true;
};
this.preventDefault=function(){
this.event.returnValue=false;
};
}else{
this.stopPropagation=function(){
this.event.stopPropagation();
};
this.preventDefault=function(){
this.event.preventDefault();
};
}
this.event=e;
this.type=e.type;
if(e.target){
this.target=e.target;
}else if(e.srcElement){
this.target=e.srcElement;
}
if(e.pageX||e.pageY){
this.x=e.pageX;
this.y=e.pageY;
}else if(e.clientX||e.clientY){
this.x=e.clientX+document.body.scrollLeft;
this.y=e.clientY+document.body.scrollTop;
}
if(e.which){
this.leftButtonHold=(e.which==1);
if(e.which==19||e.which==65536||e.which>8){
this.leftButtonHold=(org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton==1);
}else{
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=e.which;
}
}else if(e.button){
this.leftButtonHold=(e.button==1);
}
},"Object");
c$=$_C(function(){
this.status=0;
this.element=null;
this.startX=0;
this.startY=0;
this.listeners=null;
$_Z(this,arguments);
},$wt.internal.dnd,"DragAndDrop");
$_Y(c$,function(){
this.listeners=new Array(0);
});
$_M(c$,"reset",
function(){
this.status=0;
d$.onmousemove=null;
d$.onmouseup=null;
d$.onselectstart=null;
d$.onkeyup=null;
if(this.element!=null){
this.element.onselectstart=null;
}});
$_M(c$,"bind",
function(el){
this.element=el;
el.onmousedown=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousedown,this);
},"$wt.internal.xhtml.Element");
$_M(c$,"checkDraggable",
function(e){
for(var i=0;i<this.listeners.length;i++){
if(!this.listeners[i].isDraggable(e)){
return false;
}}
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
$_M(c$,"notifyDragBegan",
function(e){
for(var i=0;i<this.listeners.length;i++){
if(!this.listeners[i].dragBegan(e)){
return false;
}}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragging",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragging(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragEnded",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragEnded(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragCanceled",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragCanceled(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"addDragListener",
function(listener){
for(var i=0;i<this.listeners.length;i++){
if(this.listeners[i]==listener){
return;
}}
this.listeners[this.listeners.length]=listener;
},"$wt.internal.dnd.DragListener");
$_M(c$,"removeDragListener",
function(listener){
for(var i=0;i<this.listeners.length;i++){
if(this.listeners[i]==listener){
for(var j=i+1;j<this.listeners.length;j++){
this.listeners[j-1]=this.listeners[j];
}
var oldListeners=this.listeners;
this.listeners=new Array(oldListeners.length-1);
for(var j=0;j<oldListeners.length-1;j++){
this.listeners[j]=oldListeners[j];
}
return listener;
}}
return null;
},"$wt.internal.dnd.DragListener");
c$=$_C(function(){
this.image=null;
this.smallImage=null;
this.largeImage=null;
this.images=null;
this.menuBar=null;
this.menus=null;
this.savedFocus=null;
this.defaultButton=null;
this.saveDefault=null;
this.moved=false;
this.resized=false;
this.opened=false;
this.contentHandle=null;
this.shellTitle=null;
this.modalHandle=null;
this.oldBounds=null;
this.shellMin=null;
this.shellMax=null;
this.shellIcon=null;
this.titleBar=null;
this.shellClose=null;
$_Z(this,arguments);
},$wt.widgets,"Decorations",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Decorations,[parent,$wt.widgets.Decorations.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addMenu",
function(menu){
if(this.menus==null)this.menus=new Array(4);
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]==null){
this.menus[i]=menu;
return;
}}
var newMenus=new Array(this.menus.length+4);
newMenus[this.menus.length]=menu;
System.arraycopy(this.menus,0,newMenus,0,this.menus.length);
this.menus=newMenus;
},"$wt.widgets.Menu");
$_M(c$,"bringToTop",
function(){
this.handle.style.visibility="visible";
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8)!=0){
style&=-3313;
}if((style&(1216))!=0){
style|=32;
}if((style&(1152))!=0)style|=64;
if((style&64)!=0)style|=32;
return style;
},"~N");
$_V(c$,"checkBorder",
function(){
});
$_V(c$,"checkOpened",
function(){
if(!this.opened)this.resized=false;
});
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"closeWidget",
function(){
var event=new $wt.widgets.Event();
event.doit=true;
this.sendEvent(21,event);
if(event.doit&&!this.isDisposed())this.dispose();
});
$_V(c$,"computeTabGroup",
function(){
return this;
});
$_V(c$,"computeTabRoot",
function(){
return this;
});
$_V(c$,"containerHandle",
function(){
return this.contentHandle;
});
$_V(c$,"computeTrim",
function(x,y,width,height){
if((this.style&8)==0){
if((this.style&(1248))!=0){
height+=20;
if(width<105){
width=105;
}}if((this.style&(3296))!=0){
width+=8;
height+=8;
x-=4;
y-=4;
}else{
width+=4;
height+=4;
x-=2;
y-=2;
}}System.err.println(new $wt.graphics.Rectangle(x,y,width,height));
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createAccelerators",
function(){
});
$_M(c$,"createIcon",
function(image){
return null;
},"$wt.graphics.Image");
$_M(c$,"createCSSDiv",
($fz=function(css){
var el=d$.createElement("DIV");
el.className=css;
this.handle.appendChild(el);
return el;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"createResizeHandles",
($fz=function(){
var handles=["shell-left-top","shell-right-top","shell-center-top","shell-left-middle","shell-right-middle","shell-center-middle","shell-left-bottom","shell-right-bottom","shell-center-bottom"];
for(var i=0;i<handles.length;i++){
this.createCSSDiv(handles[i]);
}
},$fz.isPrivate=true,$fz));
$_V(c$,"createHandle",
function(){
if((this.style&65536)!=0||(this.style&32768)!=0){
this.display.timerExec(25,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].addModalLayer();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$1,i$,v$);
})(this,null));
}this.handle=d$.createElement("DIV");
this.handle.className="shell-default";
this.nextWindowLocation();
this.width=768;
this.height=557;
if(new Boolean((this.style&8)==0&(this.style&16)!=0)){
this.handle.className+=" shell-trim";
}d$.body.appendChild(this.handle);
if((this.style&8)==0&&(this.style&16)!=0){
this.createResizeHandles();
}if((this.style&8)==0&&(this.style&(1248))!=0){
this.setSystemMenu();
}this.contentHandle=this.createCSSDiv("shell-content");
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$2",$wt.internal.dnd.ShellFrameDND);
$_M(c$,"isDraggable",
function(e){
if($_U(this,$wt.widgets.Decorations$2,"isDraggable",[e])){
var cssName=e.target.className;
if(cssName.indexOf("shell-title-text")!=-1&&this.b$["$wt.widgets.Decorations"].oldBounds!=null){
return false;
}return true;
}else{
return false;
}},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"updateShellBounds",
function(x,y,width,height){
this.b$["$wt.widgets.Decorations"].setBounds(x,y,width,height);
return true;
},"~N,~N,~N,~N");
c$=$_P();
}
return $_N($wt.widgets.Decorations$2,i$,v$);
})(this,null));
dnd.bind(this.handle);
});
$_M(c$,"nextWindowLocation",
($fz=function(){
if(w$.defaultWindowLeft==null){
w$.defaultWindowLeft="332";
}else{
var num=Integer.parseInt(""+w$.defaultWindowLeft);
num+=32;
if(num>d$.body.clientWidth){
num=32;
}w$.defaultWindowLeft=""+num;
}if(w$.defaultWindowTop==null){
w$.defaultWindowTop="32";
}else{
var num=Integer.parseInt(""+w$.defaultWindowTop);
num+=32;
if(num>d$.body.clientHeight){
num=32;
}w$.defaultWindowTop=""+num;
}if(w$.defaultWindowWidth==null){
w$.defaultWindowWidth="768";
}if(w$.defaultWindowHeight==null){
w$.defaultWindowHeight="557";
}this.left=Integer.parseInt(w$.defaultWindowLeft);
this.top=Integer.parseInt(w$.defaultWindowTop);
this.width=Integer.parseInt(w$.defaultWindowWidth);
this.height=Integer.parseInt(w$.defaultWindowHeight);
},$fz.isPrivate=true,$fz));
$_M(c$,"addModalLayer",
function(){
this.modalHandle=d$.createElement("DIV");
this.modalHandle.className="shell-modal-block";
this.modalHandle.style.zIndex=""+(Integer.parseInt(""+this.handle.style.zIndex)-1);
d$.body.insertBefore(this.modalHandle,this.handle);
});
$_M(c$,"exportHTMLSource",
function(){
var shell=new $wt.widgets.Shell(this.display,66800);
shell.setText("Export HTML Source");
var b=this.contentHandle.innerHTML;
if(O$.isIE){
b=b.replace(/(<\/?)(\w+)(\s|>)/ig,function($0,$1,$2,$3){
return $1+$2.toLowerCase()+$3;
}).replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
if(!((/;$/).test($2))){
$2+=";";
}
return"style=\"" + $2.toLowerCase ().replace (/(:|;)\s+/g, "$1") + "\"";
}).replace(/(\s+(\w+)\s*=\s*)([^\"\s>]+)(\s|>)/ig,function($0,$1,$2,$3,$4){
return" "+$2+"=\"" + $3 + "\""+$4;



});
}else{
b=b.replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
return"style=\"" + $2.replace (/(:|;)\s+/g, "$1") + "\"";
});
}{
b=b.replace(/(\sclass\s*=\s*)"([^"]*)"(\s|>)/ig,function($0,$1,$2,$3){
$2=$2.replace(/\s\s+/g,' ').replace(/^\s+/,'').replace(/\s+$/g,'');
if($2.length==0){
if($3!=">"){
return $3;
}else{
return">";
}
}else{
return" class=\"" + $2 + "\""+$3;
}
});
}shell.setLayout(new $wt.layout.GridLayout());
var text=new $wt.widgets.Text(shell,2570);
var gd=new $wt.layout.GridData(1808);
gd.widthHint=400;
gd.heightHint=275;
text.setLayoutData(gd);
var rect=this.getClientArea();
var html="<div class=\"shell-content\" style=\"" + "width:" + rect.width + "px;height:" + rect.height + "px;\">"+b+"</div>";
text.setText(html);
new $wt.widgets.Label(shell,258).setLayoutData(new $wt.layout.GridData(768));
var button=new $wt.widgets.Button(shell,8);
button.setText("&OK");
var gridData=new $wt.layout.GridData(128);
gridData.widthHint=80;
button.setLayoutData(gridData);
button.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$3",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.shell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Decorations$3,i$,v$);
})(this,$_F("shell",shell)));
shell.pack();
shell.open();
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Decorations,"createWidget",[]);
});
$_M(c$,"destroyAccelerators",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
if(!($_O(this,$wt.widgets.Shell))){
this.setVisible(false);
if(!this.traverseDecorations(false)){
var shell=this.getShell();
shell.setFocus();
}}$_U(this,$wt.widgets.Decorations,"dispose",[]);
});
$_M(c$,"findMenu",
function(hMenu){
if(this.menus==null)return null;
for(var i=0;i<this.menus.length;i++){
var menu=this.menus[i];
if(menu!=null&&hMenu==menu.$handle)return menu;
}
return null;
},"$wt.internal.xhtml.Element");
$_M(c$,"fixDecorations",
function(newDecorations,control,menus){
if(this==newDecorations)return;
if(control==this.savedFocus)this.savedFocus=null;
if(control==this.defaultButton)this.defaultButton=null;
if(control==this.saveDefault)this.saveDefault=null;
if(menus==null)return;
var menu=control.menu;
if(menu!=null){
var index=0;
while(index<menus.length){
if(menus[index]==menu){
control.setMenu(null);
return;
}index++;
}
menu.fixMenus(newDecorations);
this.destroyAccelerators();
newDecorations.destroyAccelerators();
}},"$wt.widgets.Decorations,$wt.widgets.Control,~A");
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Decorations,"getBounds",[]);
});
$_M(c$,"minable",
($fz=function(){
return(this.style&128)!=0&&((this.style&2048)==0||(this.style&16)!=0);
},$fz.isPrivate=true,$fz));
$_V(c$,"getBorderWidth",
function(){
return(this.style&8)!=0?1:0;
});
$_V(c$,"getClientArea",
function(){
var w=this.width;
var h=this.height;
if((this.style&(1248))!=0){
h-=20;
w-=8;
h-=8;
if((this.style&2048)!=0){
w-=4;
h-=4;
}}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"getDefaultButton",
function(){
return this.defaultButton;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getImages",
function(){
if(this.images==null)return new Array(0);
var result=new Array(this.images.length);
System.arraycopy(this.images,0,result,0,this.images.length);
return result;
});
$_V(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.left,this.top);
});
$_M(c$,"getMaximized",
function(){
return false;
});
$_M(c$,"getMenuBar",
function(){
return this.menuBar;
});
$_M(c$,"getMinimized",
function(){
return false;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSize",
function(){
var size=$_U(this,$wt.widgets.Decorations,"getSize",[]);
size.y+=26;
return size;
});
$_M(c$,"getText",
function(){
return null;
});
$_V(c$,"isReparentable",
function(){
return false;
});
$_V(c$,"isTabGroup",
function(){
return true;
});
$_V(c$,"isTabItem",
function(){
return false;
});
$_V(c$,"menuShell",
function(){
return this;
});
$_M(c$,"releaseHandle",
function(){
if(this.shellMin!=null){
O$.destroyHandle(this.shellMin);
this.shellMin=null;
}if(this.shellMax!=null){
O$.destroyHandle(this.shellMax);
this.shellMax=null;
}if(this.shellClose!=null){
O$.destroyHandle(this.shellClose);
this.shellClose=null;
}if(this.shellIcon!=null){
O$.destroyHandle(this.shellIcon);
this.shellIcon=null;
}if(this.shellTitle!=null){
O$.destroyHandle(this.shellTitle);
this.shellTitle=null;
}if(this.titleBar!=null){
O$.destroyHandle(this.titleBar);
this.titleBar=null;
}if(this.contentHandle!=null){
O$.destroyHandle(this.contentHandle);
this.contentHandle=null;
}if(this.modalHandle!=null){
O$.destroyHandle(this.modalHandle);
this.modalHandle=null;
}$_U(this,$wt.widgets.Decorations,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
if(this.menuBar!=null)this.menuBar.releaseResources();
this.menuBar=null;
if(this.menus!=null){
do{
var index=0;
while(index<this.menus.length){
var menu=this.menus[index];
if(menu!=null&&!menu.isDisposed()){
while(menu.getParentMenu()!=null){
menu=menu.getParentMenu();
}
menu.dispose();
break;
}index++;
}
if(index==this.menus.length)break;
}while(true);
}this.menus=null;
$_U(this,$wt.widgets.Decorations,"releaseWidget",[]);
if(this.smallImage!=null)this.smallImage.dispose();
if(this.largeImage!=null)this.largeImage.dispose();
this.smallImage=this.largeImage=this.image=null;
this.images=null;
this.savedFocus=null;
this.defaultButton=this.saveDefault=null;
});
$_M(c$,"removeMenu",
function(menu){
if(this.menus==null)return;
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]==menu){
this.menus[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"restoreFocus",
function(){
if(this.display.ignoreRestoreFocus)return true;
if(this.savedFocus!=null&&this.savedFocus.isDisposed())this.savedFocus=null;
if(this.savedFocus!=null&&this.savedFocus.setSavedFocus())return true;
return false;
});
$_M(c$,"saveFocus",
function(){
});
$_V(c$,"setBackground",
function(color){
if(color!=null)this.contentHandle.style.backgroundColor=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Decorations,"setBounds",[x,y,width,height,flags,defer]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setDefaultButton",
function(button){
this.setDefaultButton(button,true);
},"$wt.widgets.Button");
$_M(c$,"setDefaultButton",
function(button,save){
if(button==null){
if(this.defaultButton==this.saveDefault){
if(save)this.saveDefault=null;
return;
}}else{
if((button.style&8)==0)return;
if(button==this.defaultButton)return;
}if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(false);
}if((this.defaultButton=button)==null)this.defaultButton=this.saveDefault;
if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(true);
}if(save)this.saveDefault=this.defaultButton;
if(this.saveDefault!=null&&this.saveDefault.isDisposed())this.saveDefault=null;
},"$wt.widgets.Button,~B");
$_V(c$,"setForeground",
function(color){
if(color!=null)this.contentHandle.style.color=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setImage",
function(image){
this.image=image;
this.setImages(image,null);
this.image=image;
if(this.shellIcon!=null&&this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var iconStyle=this.shellIcon.style;
if(image.url.toLowerCase().endsWith(".png")&&this.contentHandle.style.filter!=null){
iconStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
iconStyle.backgroundRepeat="no-repeat";
iconStyle.backgroundPosition="center center";
iconStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
$_M(c$,"setImages",
function(image,images){
},"$wt.graphics.Image,~A");
$_M(c$,"setImages",
function(images){
for(var i=0;i<images.length;i++){
}
this.images=images;
this.setImage(images[0]);
},"~A");
$_M(c$,"setMaximized",
function(maximized){
if(maximized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var height=d$.body.clientHeight-0;
if(height>w$.screen.availHeight-10){
height=w$.screen.availHeight-10;
}var width=d$.body.clientWidth;
if(width>w$.screen.availWidth){
width=w$.screen.availWidth;
}this.setBounds(this.computeTrim(0,0,width+2,height-18));
d$.body.scrollTop=0;
}if(maximized){
$wt.internal.ResizeSystem.register(this,1024);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"toggleMaximize",
function(){
var key="shell-maximized";
if(this.oldBounds!=null){
this.setBounds(this.oldBounds);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.titleBar.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}this.oldBounds=null;
$wt.internal.ResizeSystem.unregister(this);
}else{
this.setMaximized(true);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.titleBar.className+=" "+key;
}}});
$_M(c$,"setMenuBar",
function(menu){
if(this.menuBar==menu)return;
if(menu!=null){
}if(this.menuBar==menu)return;
if(menu!=null){
}if(menu!=null)this.display.removeBar(menu);
this.menuBar=menu;
},"$wt.widgets.Menu");
$_M(c$,"setMinimized",
function(minimized){
if(minimized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var width=this.oldBounds.width;
if(width<200){
width=200;
}this.setBounds(-1,d$.body.clientHeight-26,120,0);
}if(minimized){
$wt.internal.ResizeSystem.register(this,128);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setSavedFocus",
function(control){
this.savedFocus=control;
},"$wt.widgets.Control");
$_M(c$,"setSystemMenu",
function(){
this.titleBar=d$.createElement("DIV");
this.titleBar.className="shell-title-bar";
if((this.style&2048)==0||(this.style&16)!=0){
this.shellIcon=d$.createElement("DIV");
this.shellIcon.className="shell-title-icon";
this.titleBar.appendChild(this.shellIcon);
this.shellIcon.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].exportHTMLSource();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$4,i$,v$);
})(this,null));
}if(this.minable()){
this.shellMin=d$.createElement("DIV");
this.shellMin.className="shell-title-min";
this.titleBar.appendChild(this.shellMin);
this.shellMin.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
$wt.internal.ResizeSystem.unregister(this.b$["$wt.widgets.Decorations"]);
this.b$["$wt.widgets.Decorations"].setMinimized(true);
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$5,i$,v$);
})(this,null));
}if((this.style&1024)!=0){
this.shellMax=d$.createElement("DIV");
this.shellMax.className="shell-title-normal-max";
this.titleBar.appendChild(this.shellMax);
this.shellMax.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].toggleMaximize();
this.b$["$wt.widgets.Decorations"].display.timerExec(25,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$6$7",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].layout();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$6$7,i$,v$);
})(this,null));
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$6,i$,v$);
})(this,null));
}if((this.style&64)!=0){
this.shellClose=d$.createElement("DIV");
this.shellClose.className="shell-title-close";
this.titleBar.appendChild(this.shellClose);
this.shellClose.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if($_O(this.b$["$wt.widgets.Decorations"],$wt.widgets.Shell)){
var shell=this.b$["$wt.widgets.Decorations"];
shell.close();
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$8,i$,v$);
})(this,null));
}this.shellTitle=d$.createElement("DIV");
this.shellTitle.className="shell-title-text";
this.titleBar.appendChild(this.shellTitle);
if((this.style&1024)!=0){
this.titleBar.ondblclick=this.shellMax.onclick;
}this.handle.appendChild(this.titleBar);
this.titleBar.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var fHandleStyle=this.b$["$wt.widgets.Decorations"].handle.style;
if(fHandleStyle.zIndex!=w$.currentTopZIndex){
fHandleStyle.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$9,i$,v$);
})(this,null));
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
$_M(c$,"setText",
function(string){
if(this.shellTitle!=null&&this.shellTitle.childNodes!=null){
for(var i=this.shellTitle.childNodes.length-1;i>=0;i--){
if(this.shellTitle.childNodes[i]!=null){
this.shellTitle.removeChild(this.shellTitle.childNodes[i]);
}}
this.shellTitle.appendChild(d$.createTextNode(string));
}},"~S");
$_V(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if(visible==(this.contentHandle.style.visibility!="hidden"))return;
}if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}else{
if(this.isDisposed())return;
this.sendEvent(23);
}},"~B");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&8)==0){
var w=0;
var h=0;
if((this.style&(1248))!=0){
w=113;
h=28;
}if((this.style&2048)!=0){
w+=2;
h+=2;
}if(this.width<w){
this.width=w;
cx=w;
}if(this.height<h){
this.height=h;
cy=h;
}}if((this.style&8)!=0){
this.contentHandle.style.height=this.height+"px";
this.contentHandle.style.width=this.width+"px";
}else if(this.titleBar!=null){
var dw=8;
var dh=28;
var dww=8;
if((this.style&2048)!=0){
dw+=2;
dh+=3;
dww+=2;
}this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=((this.width-dw)>0?this.width-dw:0)+"px";
this.titleBar.style.width=((this.width-dww)>0?this.width-dww:0)+"px";
var ww=18;
var w=ww;
if(this.shellClose!=null){
this.shellClose.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMax!=null){
this.shellMax.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMin!=null){
this.shellMin.style.left=(this.width-8-2-w)+"px";
w+=ww;
}w-=ww;
if(this.shellIcon!=null){
this.shellIcon.style.left=2+"px";
this.shellTitle.style.left=(4+ww)+"px";
w+=ww;
}else{
this.shellTitle.style.left=4+"px";
}this.shellTitle.style.width=(this.width-8-8-w)+"px";
}else{
this.width-=4;
this.height-=4;
cx-=4;
cy-=4;
var dw=7;
var dh=7;
this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=(this.width-dw>0?this.width-dw:0)+"px";
this.contentHandle.style.top=2+"px";
this.contentHandle.style.marginRight=1+"px";
}if((this.style&2048)!=0){
cx-=4;
cy-=4;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"traverseDecorations",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]==this)break;
index++;
}
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&$_O(child,$wt.widgets.Decorations)){
if(child.setFocus())return true;
}}
return false;
},"~B");
c$=$_C(function(){
this.activeMenu=null;
this.minWidth=-1;
this.minHeight=-1;
this.showWithParent=false;
this.lastActive=null;
this.region=null;
$_Z(this,arguments);
},$wt.widgets,"Shell",$wt.widgets.Decorations);
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(style){
this.construct(null,style);
},"~N");
$_K(c$,
function(display){
this.construct(display,1264);
},"$wt.widgets.Display");
$_K(c$,
function(display,style){
this.construct(display,null,style,0);
},"$wt.widgets.Display,~N");
$_K(c$,
function(display,parent,style,handle){
this.checkSubclass();
this.children=new Array(0);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.style=$wt.widgets.Shell.checkStyle(style);
this.parent=parent;
this.display=display;
this.createWidget();
},"$wt.widgets.Display,$wt.widgets.Shell,~N,~N");
$_K(c$,
function(parent){
this.construct(parent,2144);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.construct(parent!=null?parent.display:null,parent,style,0);
},"$wt.widgets.Shell,~N");
c$.win32_new=$_M(c$,"win32_new",
function(display,handle){
return new $wt.widgets.Shell(display,null,8,handle);
},"$wt.widgets.Display,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Decorations.checkStyle(style);
var mask=229376;
var bits=style&~mask;
if((style&131072)!=0)return bits|131072;
if((style&65536)!=0)return bits|65536;
if((style&32768)!=0)return bits|32768;
return bits;
},"~N");
$_M(c$,"addShellListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(21,typedListener);
this.addListener(19,typedListener);
this.addListener(20,typedListener);
this.addListener(26,typedListener);
this.addListener(27,typedListener);
},"$wt.events.ShellListener");
$_M(c$,"close",
function(){
this.closeWidget();
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Shell,"createHandle",[]);
});
$_M(c$,"dispose",
function(){
$_U(this,$wt.widgets.Shell,"dispose",[]);
});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}},"~B");
$_V(c$,"findCursor",
function(){
return this.cursor;
});
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"fixShell",
function(newShell,control){
if(this==newShell)return;
if(control==this.lastActive)this.setActiveControl(null);
newShell.setToolTipText(control.handle,control.toolTipText);
},"$wt.widgets.Shell,$wt.widgets.Control");
$_M(c$,"forceActive",
function(){
if(!this.isVisible())return;
});
$_V(c$,"forceResize",
function(){
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Shell,"getBounds",[]);
});
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getImeInputMode",
function(){
return 0;
});
$_M(c$,"getLocation",
function(){
return $_U(this,$wt.widgets.Shell,"getLocation",[]);
});
$_M(c$,"getMinimumSize",
function(){
var width=Math.max(0,this.minWidth);
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
width=Math.max(width,80);
}var height=Math.max(0,this.minHeight);
if((this.style&8)==0&&(this.style&trim)!=0){
if((this.style&16)!=0){
height=Math.max(height,24);
}else{
height=Math.max(height,24);
}}if((this.style&8)!=0){
return new $wt.graphics.Point(this.minWidth,Math.max(this.minHeight-24,0));
}return new $wt.graphics.Point(width,height);
});
$_M(c$,"getRegion",
function(){
return this.region;
});
$_V(c$,"getShell",
function(){
return this;
});
$_M(c$,"getSize",
function(){
return $_U(this,$wt.widgets.Shell,"getSize",[]);
});
$_M(c$,"getShells",
function(){
var count=0;
var shells=this.display.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this)count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this){
result[index++]=shells[i];
}}
return result;
});
$_V(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_V(c$,"isEnabled",
function(){
return this.getEnabled();
});
$_V(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"open",
function(){
this.bringToTop();
if(this.isDisposed())return;
this.setVisible(true);
if(this.isDisposed())return;
this.layout();
});
$_V(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Shell,"releaseHandle",[]);
});
$_M(c$,"releaseShells",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseShells();
$_U(this,$wt.widgets.Shell,"releaseWidget",[]);
this.activeMenu=null;
this.display.clearModal(this);
this.lastActive=null;
this.region=null;
});
$_M(c$,"removeMenu",
function(menu){
$_U(this,$wt.widgets.Shell,"removeMenu",[menu]);
if(menu==this.activeMenu)this.activeMenu=null;
},"$wt.widgets.Menu");
$_M(c$,"removeShellListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(21,listener);
this.eventTable.unhook(19,listener);
this.eventTable.unhook(20,listener);
this.eventTable.unhook(26,listener);
this.eventTable.unhook(27,listener);
},"$wt.events.ShellListener");
$_M(c$,"setActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_M(c$,"setActiveControl",
function(control){
if(control!=null&&control.isDisposed())control=null;
if(this.lastActive!=null&&this.lastActive.isDisposed())this.lastActive=null;
if(this.lastActive==control)return;
var activate=(control==null)?new Array(0):control.getPath();
var deactivate=(this.lastActive==null)?new Array(0):this.lastActive.getPath();
this.lastActive=control;
var index=0;
var length=Math.min(activate.length,deactivate.length);
while(index<length){
if(activate[index]!=deactivate[index])break;
index++;
}
for(var i=deactivate.length-1;i>=index;--i){
if(!deactivate[i].isDisposed()){
deactivate[i].sendEvent(27);
}}
for(var i=activate.length-1;i>=index;--i){
if(!activate[i].isDisposed()){
activate[i].sendEvent(26);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Shell,"setBounds",[x,y,width,height,flags,false]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setEnabled",
function(enabled){
if(((this.state&8)==0)==enabled)return;
$_U(this,$wt.widgets.Shell,"setEnabled",[enabled]);
},"~B");
$_M(c$,"setImeInputMode",
function(mode){
},"~N");
$_M(c$,"setMinimumSize",
function(width,height){
var widthLimit=0;
var heightLimit=0;
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
}this.minWidth=Math.max(widthLimit,width);
this.minHeight=Math.max(heightLimit,height);
var size=this.getSize();
var newWidth=Math.max(size.x,this.minWidth);
var newHeight=Math.max(size.y,this.minHeight);
if(this.minWidth<=widthLimit)this.minWidth=-1;
if(this.minHeight<=heightLimit)this.minHeight=-1;
if(newWidth!=size.x||newHeight!=size.y)this.setSize(newWidth,newHeight);
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setItemEnabled",
function(cmd,enabled){
},"~N,~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setRegion",
function(region){
if((this.style&8)==0)return;
},"$wt.graphics.Region");
$_M(c$,"setToolTipText",
function(hwnd,text){
},"$wt.internal.xhtml.Element,~S");
$_M(c$,"setVisible",
function(visible){
$_U(this,$wt.widgets.Shell,"setVisible",[visible]);
if(visible){
this.SetWindowPos(this.handle,null,this.left,this.top,this.width,this.height,0);
}},"~B");
$_V(c$,"traverseEscape",
function(){
if(this.parent==null)return false;
if(!this.isVisible()||!this.isEnabled())return false;
this.close();
return true;
});
$_M(c$,"updateModal",
function(){
});

Sync2Async={};
Sync2Async.block=function(shell,oThis,runnable){
shell.addDisposeListener((function(i$,v$){
if(!$_D("Sync2Async$1")){
$_H();
c$=Sync2Async$1=function(){
$_B(this,arguments);
$_Z(this,arguments);
};
Clazz.decorateAsType(c$,"Sync2Async$1",null,$wt.events.DisposeListener);
$_M(c$,"widgetDisposed",
function(e){
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);

},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N(Sync2Async$1,i$,v$);
})(this,$_F("runnable",runnable,"oThis",oThis)));
shell.getDisplay().readAndDispatch();
};
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.sourceWidth=0;
this.sourceHeight=0;
this.resize=null;
this.frame=null;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"ShellFrameDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"isDraggable",
function(e){
var cssName=e.target.className;
if(cssName!=null){
if(cssName.indexOf("shell")==0&&(cssName.indexOf("top")!=-1||cssName.indexOf("middle")!=-1||cssName.indexOf("bottom")!=-1)){
this.resize=cssName.substring(6);
return true;
}else if(cssName.indexOf("shell-title-text")!=-1){
return true;
}}return false;
},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"dragBegan",
function(e){
var firstTime=false;
if(this.frame==null){
this.frame=d$.createElement("DIV");
this.frame.className="shell-handle";
this.frame.style.backgroundColor="transparent";
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.zIndex=""+(Integer.parseInt(w$.currentTopZIndex)+100);
d$.body.appendChild(this.frame);
var existedTitleBar=false;
var els=e.sourceElement.getElementsByTagName("DIV");
for(var i=0;i<els.length;i++){
if(els[i].className.indexOf("shell-title-bar")!=-1){
existedTitleBar=true;
break;
}}
if(existedTitleBar){
var titleBar=d$.createElement("DIV");
titleBar.className="shell-title-bar opacity";
titleBar.style.paddingTop="4px";
this.frame.appendChild(titleBar);
}firstTime=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
this.sourceWidth=Integer.parseInt(e.sourceElement.style.width);
this.sourceHeight=Integer.parseInt(e.sourceElement.style.height);
e.startX=e.currentX;
e.startY=e.currentY;
if(firstTime){
this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
}var frames=d$.getElementsByTagName("IFRAME");
if(frames.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.resize!=null){
var xx=this.sourceX;
var yy=this.sourceY;
var ww=this.sourceWidth;
var hh=this.sourceHeight;
if(this.resize=="left-top"){
xx+=e.deltaX();
yy+=e.deltaY();
ww-=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize=="center-top"){
yy+=e.deltaY();
hh-=e.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize=="right-top"){
yy+=e.deltaY();
ww+=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize=="left-middle"){
xx+=e.deltaX();
ww-=e.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize=="right-middle"){
ww+=e.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize=="left-bottom"){
xx+=e.deltaX();
ww-=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize=="center-bottom"){
hh+=e.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize=="right-bottom"){
ww+=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="se-resize";
}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
this.frame.style.width=((ww>16)?ww:16)+"px";
this.frame.style.height=((hh>16)?hh:16)+"px";
return true;
}var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=d$.body.clientHeight;
var gWidth=d$.body.clientWidth;
var dWidth=Integer.parseInt(e.sourceElement.style.width);
if(xx<-dWidth){
xx=-dWidth;
}else if(xx>gWidth-2){
xx=gWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight+18){
yy=gHeight+18;
}if(!(e.event.event).ctrlKey){
if(Math.abs(xx-gWidth+dWidth)<10){
xx=gWidth-dWidth;
}else if(Math.abs(xx)<10){
xx=0;
}var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(Math.abs(yy-gHeight+dHeight+2)<10){
yy=gHeight-dHeight-2;
}else if(Math.abs(yy-(-1))<10){
yy=-1;
}}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
if(d$.body.scrollLeft!=0){
d$.body.scrollLeft=0;
}if(d$.body.scrollTop!=0){
d$.body.scrollTop=0;
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
var x=Integer.parseInt(this.frame.style.left);
var y=Integer.parseInt(this.frame.style.top);
var width=Integer.parseInt(this.frame.style.width);
var height=Integer.parseInt(this.frame.style.height);
var shell=e.sourceElement;
shell.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
this.updateShellBounds(x,y,width,height);
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
($fz=function(){
this.frame.style.display="none";
d$.body.style.cursor="auto";
this.resize=null;
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"updateShellBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
c$.fixShellHeight=$_M(c$,"fixShellHeight",
function(shell){
var height=Integer.parseInt((shell).style.height);
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
if(div.className!=null){
if(div.className.indexOf("middle")!=-1){
if(height-40>=0){
div.style.height=(height-40)+"px";
}else{
div.style.height="0px";
}}else if(div.className.indexOf("shell-content")!=-1){
div.style.height=((height-30>=0)?height-30:0)+"px";
}}}
},"~O");
c$.fixShellWidth=$_M(c$,"fixShellWidth",
function(shell){
var needToFixedWidth=true;
var width=Integer.parseInt((shell).style.width)-6;
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
var cssName=div.className;
if(cssName!=null){
if(cssName.indexOf("shell-center-")!=-1){
if(needToFixedWidth){
div.style.width=(width-46)+"px";
}}else if(cssName.indexOf("shell-content")!=-1){
div.style.width=width+"px";
}else if(cssName.indexOf("shell-title-bar")!=-1){
div.style.width=width+"px";
}}}
},"~O");
c$=$_C(function(){
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
this.shell.setLocation(-1,d$.body.clientHeight-26);
});
$_M(c$,"updateMaximized",
function(){
var height=d$.body.clientHeight-0;
if(height>w$.screen.availHeight-10){
height=w$.screen.availHeight-10;
}var width=d$.body.clientWidth;
if(width>w$.screen.availWidth){
width=w$.screen.availWidth;
}this.shell.setBounds(this.shell.computeTrim(0,0,width+2,height-18));
d$.body.scrollTop=0;
});
$_M(c$,"updateCentered",
function(){
var size=this.shell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
});
$_M(c$,"getStatus",
function(){
return this.status;
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal,"ResizeSystem");
c$.register=$_M(c$,"register",
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell==shell){
return;
}}
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]==null){
$wt.internal.ResizeSystem.handlers[i]=new $wt.internal.ResizeHandler(shell,status);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(shell,status);
return;
},"$wt.widgets.Decorations,~N");
c$.unregister=$_M(c$,"unregister",
function(shell){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell==shell){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Decorations");
c$.updateResize=$_M(c$,"updateResize",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
var hdl=$wt.internal.ResizeSystem.handlers[i];
if(hdl!=null){
var status=hdl.getStatus();
if(status==1024){
hdl.updateMaximized();
}else if(status==128){
hdl.updateMinimized();
}else if(status==16777216){
hdl.updateCentered();
}}}
});
c$.handlers=c$.prototype.handlers=new Array(5);

var $browserResizingHandle=null;
$browserLayoutResize=function(){
if($browserResizingHandle!=null){
window.clearTimeout($browserResizingHandle);
}
$browserResizingHandle=window.setTimeout(function(){
org.eclipse.swt.internal.ResizeSystem.updateResize();
},50);
};
try{
window.addEventListener('resize',$browserLayoutResize,true);
}catch(e){
window.onresize=$browserLayoutResize;
}
c$=$_C(function(){
this.text=null;
this.image=null;
$_Z(this,arguments);
},$wt.widgets,"Item",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Item,[parent,style]);
this.text="";
},"$wt.widgets.Widget,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent,style);
},"$wt.widgets.Widget,~N,~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Item,"releaseWidget",[]);
this.text=null;
this.image=null;
});
$_M(c$,"setImage",
function(image){
this.image=image;
},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
this.text=string;
},"~S");
c$=$_C(function(){
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
this.freeSlot=0;
this.indexTable=null;
this.controlTable=null;
this.focusEvent=0;
this.focusControl=null;
this.bars=null;
this.popups=null;
this.items=null;
this.thread=null;
this.disposeList=null;
this.tray=null;
this.nextTrayId=0;
this.timerIds=null;
this.timerList=null;
this.nextTimerId=0;
this.lastKey=0;
this.lastAscii=0;
this.lastMouse=0;
this.lastVirtual=false;
this.lastNull=false;
this.lastDead=false;
this.keyboard=null;
this.accelKeyHit=false;
this.mnemonicKeyHit=false;
this.lockActiveWindow=false;
this.captureChanged=false;
this.ignoreRestoreFocus=false;
this.lastHittestControl=null;
this.lastHittest=0;
this.cursors=null;
this.imageList=null;
this.toolImageList=null;
this.toolHotImageList=null;
this.toolDisabledImageList=null;
this.lpCustColors=0;
this.data=null;
this.keys=null;
this.values=null;
this.msgs=null;
this.messageProc=0;
this.modalShells=null;
this.modalDialogShell=null;
this.hitCount=0;
$_Z(this,arguments);
},$wt.widgets,"Display",$wt.graphics.Device);
$_Y(c$,function(){
this.keyboard=$_A(256,0);
this.cursors=new Array(22);
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
$_R(this,$wt.widgets.Display,[data]);
},"$wt.graphics.DeviceData");
$_M(c$,"addBar",
function(menu){
if(this.bars==null)this.bars=new Array(4);
var length=this.bars.length;
for(var i=0;i<length;i++){
if(this.bars[i]==menu)return;
}
var index=0;
while(index<length){
if(this.bars[index]==null)break;
index++;
}
if(index==length){
var newBars=new Array(length+4);
System.arraycopy(this.bars,0,newBars,0,length);
this.bars=newBars;
}this.bars[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"addControl",
function(handle,control){
if(control==null)return;
this.controlTable[this.controlTable.length]=control;
},"~O,$wt.widgets.Control");
$_M(c$,"addFilter",
function(eventType,listener){
if(this.filterTable==null)this.filterTable=new $wt.widgets.EventTable();
this.filterTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addMenuItem",
function(item){
if(this.items==null)this.items=new Array(64);
for(var i=0;i<this.items.length;i++){
if(this.items[i]==null){
item.id=i+108;
this.items[i]=item;
return;
}}
item.id=this.items.length+108;
var newItems=new Array(this.items.length+64);
newItems[this.items.length]=item;
System.arraycopy(this.items,0,newItems,0,this.items.length);
this.items=newItems;
},"$wt.widgets.MenuItem");
$_M(c$,"addPopup",
function(menu){
if(this.popups==null)this.popups=new Array(4);
var length=this.popups.length;
for(var i=0;i<length;i++){
if(this.popups[i]==menu)return;
}
var index=0;
while(index<length){
if(this.popups[index]==null)break;
index++;
}
if(index==length){
var newPopups=new Array(length+4);
System.arraycopy(this.popups,0,newPopups,0,length);
this.popups=newPopups;
}this.popups[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"asciiKey",
function(key){
return 0;
},"~N");
$_M(c$,"asyncExec",
function(runnable){
w$.setTimeout($_Q(runnable),10);
},"Runnable");
$_M(c$,"beep",
function(){
});
$_M(c$,"checkSubclass",
function(){
});
$_V(c$,"checkDevice",
function(){
});
c$.checkDisplay=$_M(c$,"checkDisplay",
function(thread,multiple){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
}}
},"Thread,~B");
$_M(c$,"clearModal",
function(shell){
if(this.modalShells==null)return;
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]==shell)break;
if(this.modalShells[index]==null)return;
index++;
}
if(index==length)return;
System.arraycopy(this.modalShells,index+1,this.modalShells,index,--length-index);
this.modalShells[length]=null;
if(index==0&&this.modalShells[0]==null)this.modalShells=null;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"close",
function(){
var event=new $wt.widgets.Event();
this.sendEvent(21,event);
if(event.doit)this.dispose();
});
$_V(c$,"create",
function(data){
this.checkSubclass();
$wt.widgets.Display.checkDisplay(this.thread=Thread.currentThread(),true);
this.createDisplay(data);
$wt.widgets.Display.register(this);
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=this,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
},"$wt.graphics.DeviceData");
$_M(c$,"createDisplay",
function(data){
},"$wt.graphics.DeviceData");
c$.deregister=$_M(c$,"deregister",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if(display==$wt.widgets.Display.Displays[i])$wt.widgets.Display.Displays[i]=null;
}
},"$wt.widgets.Display");
$_V(c$,"destroy",
function(){
if(this==$wt.widgets.Display.Default)($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
$wt.widgets.Display.deregister(this);
this.destroyDisplay();
});
$_M(c$,"destroyDisplay",
function(){
});
$_M(c$,"disposeExec",
function(runnable){
if(this.disposeList==null)this.disposeList=new Array(4);
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]==null){
this.disposeList[i]=runnable;
return;
}}
var newDisposeList=new Array(this.disposeList.length+4);
System.arraycopy(this.disposeList,0,newDisposeList,0,this.disposeList.length);
newDisposeList[this.disposeList.length]=runnable;
this.disposeList=newDisposeList;
},"Runnable");
$_M(c$,"drawMenuBars",
function(){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
var menu=this.bars[i];
if(menu!=null&&!menu.isDisposed())menu.update();
}
this.bars=null;
});
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"filterEvent",
function(event){
if(this.filterTable!=null)this.filterTable.sendEvent(event);
return false;
},"$wt.widgets.Event");
$_M(c$,"filters",
function(eventType){
if(this.filterTable==null)return false;
return this.filterTable.hooks(eventType);
},"~N");
$_M(c$,"findControl",
function(handle){
if(handle==0)return null;
return null;
},"~N");
$_M(c$,"findWidget",
function(handle){
return null;
},"~N");
$_M(c$,"findWidget",
function(handle,id){
return null;
},"~N,~N");
c$.findDisplay=$_M(c$,"findDisplay",
function(thread){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var display=$wt.widgets.Display.Displays[i];
if(display!=null&&display.thread==thread){
return display;
}}
return null;
},"Thread");
$_M(c$,"getActiveShell",
function(){
return null;
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Display,"getBounds",[]);
});
c$.getCurrent=$_M(c$,"getCurrent",
function(){
return $wt.widgets.Display.findDisplay(Thread.currentThread());
});
$_M(c$,"getClientArea",
function(){
return $_U(this,$wt.widgets.Display,"getClientArea",[]);
});
$_M(c$,"getControl",
function(handle){
if(handle==null)return null;
for(var i=0;i<this.controlTable.length;i++){
if(this.controlTable[i]!=null&&handle==this.controlTable[i].handle){
return this.controlTable[i];
}}
return null;
},"~O");
$_M(c$,"getCursorControl",
function(){
return null;
});
$_M(c$,"getCursorLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCursorSizes",
function(){
return[new $wt.graphics.Point(16,16)];
});
c$.getDefault=$_M(c$,"getDefault",
function(){
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=new $wt.widgets.Display(),$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
return $wt.widgets.Display.Default;
});
c$.isValidClass=$_M(c$,"isValidClass",
function(clazz){
var name=clazz.getName();
var index=name.lastIndexOf('.');
return name.substring(0,index+1).equals($wt.widgets.Display.PACKAGE_PREFIX);
},"Class");
$_M(c$,"getData",
function(key){
if(this.keys==null)return null;
for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key))return this.values[i];
}
return null;
},"~S");
$_M(c$,"getData",
function(){
return this.data;
});
$_M(c$,"getDismissalAlignment",
function(){
return 16384;
});
$_M(c$,"getDoubleClickTime",
function(){
return 20;
});
$_M(c$,"getFocusControl",
function(){
if(this.focusControl!=null&&!this.focusControl.isDisposed()){
return this.focusControl;
}return null;
});
$_M(c$,"getHighContrast",
function(){
return false;
});
$_M(c$,"getIconDepth",
function(){
return 32;
});
$_M(c$,"getIconSizes",
function(){
return[new $wt.graphics.Point(16,16),new $wt.graphics.Point(32,32)];
});
$_M(c$,"getImageList",
function(style,width,height){
if(this.imageList==null)this.imageList=new Array(4);
var i=0;
var length=this.imageList.length;
while(i<length){
var list=this.imageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.imageList,0,newList,0,length);
this.imageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.imageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBar",
function(style,width,height){
if(this.toolImageList==null)this.toolImageList=new Array(4);
var i=0;
var length=this.toolImageList.length;
while(i<length){
var list=this.toolImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolImageList,0,newList,0,length);
this.toolImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarDisabled",
function(style,width,height){
if(this.toolDisabledImageList==null)this.toolDisabledImageList=new Array(4);
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
var list=this.toolDisabledImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolDisabledImageList,0,newList,0,length);
this.toolDisabledImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolDisabledImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarHot",
function(style,width,height){
if(this.toolHotImageList==null)this.toolHotImageList=new Array(4);
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
var list=this.toolHotImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolHotImageList,0,newList,0,length);
this.toolHotImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolHotImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getLastEventTime",
function(){
return parseInt(new java.util.Date().getTime());
});
$_M(c$,"getMenuItem",
function(id){
if(this.items==null)return null;
id=id-108;
if(0<=id&&id<this.items.length)return this.items[id];
return null;
},"~N");
$_M(c$,"getModalShell",
function(){
if(this.modalShells==null)return null;
var index=this.modalShells.length;
while(--index>=0){
var shell=this.modalShells[index];
if(shell!=null)return shell;
}
return null;
});
$_M(c$,"getModalDialogShell",
function(){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
return this.modalDialogShell;
});
$_M(c$,"getMonitors",
function(){
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return[monitor];
});
$_M(c$,"getPrimaryMonitor",
function(){
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return monitor;
});
$_M(c$,"getShells",
function(){
var count=0;
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell))count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell)){
result[index++]=control;
}}
return result;
});
$_M(c$,"getSyncThread",
function(){
return null;
});
$_M(c$,"getSystemColor",
function(id){
var pixel="#000000";
switch(id){
case 17:
pixel="ThreeDDarkShadow";
break;
case 18:
pixel="ThreeDShadow";
break;
case 19:
pixel="ThreeDLightShadow";
break;
case 20:
pixel="ThreeDHighlight";
break;
case 22:
pixel="ThreeDFace";
break;
case 23:
pixel="WindowFrame";
break;
case 21:
case 24:
pixel="WindowText";
break;
case 25:
pixel="Window";
break;
case 26:
pixel="Highlight";
break;
case 27:
pixel="HighlightText";
break;
case 28:
pixel="InfoText";
break;
case 29:
pixel="InfoBackground";
break;
case 30:
pixel="CaptionText";
break;
case 31:
pixel="ActiveCaption";
break;
case 32:
pixel="ActiveCaption";
break;
case 33:
pixel="InactiveCaptionText";
break;
case 34:
pixel="InactiveCaption";
break;
case 35:
pixel="InactiveCaption";
break;
default:
return $_U(this,$wt.widgets.Display,"getSystemColor",[id]);
}
return new $wt.graphics.Color(null,pixel);
},"~N");
$_M(c$,"getSystemCursor",
function(id){
if(!(0<=id&&id<this.cursors.length))return null;
if(this.cursors[id]==null){
this.cursors[id]=new $wt.graphics.Cursor(this,id);
}return this.cursors[id];
},"~N");
$_V(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getSystemImage",
function(id){
var iconName=null;
switch(id){
case 1:
iconName="error";
break;
case 16:
case 2:
iconName="information";
break;
case 4:
iconName="question";
break;
case 8:
iconName="warning";
break;
}
if(iconName==null)return null;
return new $wt.graphics.Image(this,"j2slib/images/"+iconName+".png");
},"~N");
$_M(c$,"getSystemTray",
function(){
if(this.tray!=null)return this.tray;
return this.tray=new $wt.widgets.Tray(this,0);
});
$_M(c$,"getThread",
function(){
return this.thread;
});
$_M(c$,"init",
function(){
$_U(this,$wt.widgets.Display,"init",[]);
this.indexTable=$_A(1024,0);
this.controlTable=new Array(1024);
for(var i=0;i<1023;i++)this.indexTable[i]=i+1;

this.indexTable[1023]=-1;
this.msgs=new Array(0);
this.messageProc=0;
});
$_M(c$,"isValidThread",
function(){
return this.thread==Thread.currentThread();
});
$_M(c$,"map",
function(from,to,point){
return this.map(from,to,point.x,point.y);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M(c$,"map",
function(from,to,x,y){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Point(0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N");
$_M(c$,"map",
function(from,to,rectangle){
return this.map(from,to,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M(c$,"map",
function(from,to,x,y,width,height){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Rectangle(0,0,0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N,~N,~N");
$_M(c$,"post",
function(event){
var type=event.type;
switch(type){
case 1:
case 2:
{
}case 3:
case 5:
case 4:
{
}}
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$1",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$1,i$,v$);
})(this,null));
return false;
},"$wt.widgets.Event");
$_M(c$,"postEvent",
function(event){
if(this.eventQueue==null)this.eventQueue=new Array(4);
var index=0;
var length=this.eventQueue.length;
while(index<length){
if(this.eventQueue[index]==null)break;
index++;
}
if(index==length){
var newQueue=new Array(length+4);
System.arraycopy(this.eventQueue,0,newQueue,0,length);
this.eventQueue=newQueue;
}this.eventQueue[index]=event;
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$2",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$2,i$,v$);
})(this,null));
},"$wt.widgets.Event");
$_M(c$,"readAndDispatch",
function(){
this.drawMenuBars();
this.runPopups();
this.messageProc=w$.setInterval($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$3",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
var msgs=this.b$["$wt.widgets.Display"].msgs;
if(msgs.length!=0){
for(var i=msgs.length-1;i>=0;i--){
var m1=msgs[i];
if(m1==null){
continue;}for(var j=i-1;j>=0;j--){
var m2=msgs[j];
if(m2!=null&&m2.control==m1.control&&m2.type==m1.type){
msgs[j]=null;
break;
}}
}
var time=0;
for(var i=0;i<msgs.length;i++){
var m=msgs[i];
msgs[i]=null;
if(m!=null&&m.type==2){
if(!m.control.isVisible()){
continue;}var d=new java.util.Date();
var c=m.control;
if(m.data!=null){
var bs=m.data;
c.updateLayout(bs[0],bs[1]);
}else{
c.layout();
}time+=new java.util.Date().getTime()-d.getTime();
if(time>100){
for(var j=i+1;j<msgs.length;j++){
msgs[j-i-1]=msgs[j];
}
for(var j=0;j<i;j++){
msgs[msgs.length-1-j]=null;
}
{
msgs.length-=i+1;
}return;
}}}
{
msgs.length=0;
}}});
c$=$_P();
}
return $_N($wt.widgets.Display$3,i$,v$);
})(this,null)),20);
return true;
});
c$.register=$_M(c$,"register",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]==null){
$wt.widgets.Display.Displays[i]=display;
return;
}}
var newDisplays=new Array($wt.widgets.Display.Displays.length+4);
System.arraycopy($wt.widgets.Display.Displays,0,newDisplays,0,$wt.widgets.Display.Displays.length);
newDisplays[$wt.widgets.Display.Displays.length]=display;
($t$=$wt.widgets.Display.Displays=newDisplays,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
},"$wt.widgets.Display");
$_M(c$,"release",
function(){
this.sendEvent(12,new $wt.widgets.Event());
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.dispose();
}
if(this.disposeList!=null){
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]!=null)this.disposeList[i].run();
}
}this.disposeList=null;
this.releaseDisplay();
$_U(this,$wt.widgets.Display,"release",[]);
});
$_M(c$,"releaseDisplay",
function(){
for(var i=0;i<this.cursors.length;i++){
if(this.cursors[i]!=null)this.cursors[i].dispose();
}
this.cursors=null;
this.keyboard=null;
this.modalDialogShell=null;
this.modalShells=null;
this.data=null;
this.keys=null;
this.values=null;
this.bars=this.popups=null;
this.indexTable=null;
this.controlTable=null;
this.lastHittestControl=null;
this.imageList=this.toolImageList=this.toolHotImageList=this.toolDisabledImageList=null;
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
if(this.messageProc!=0){
w$.clearInterval(this.messageProc);
}this.msgs=null;
});
$_M(c$,"releaseImageList",
function(list){
var i=0;
var length=this.imageList.length;
while(i<length){
if(this.imageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.imageList,i+1,this.imageList,i,--length-i);
this.imageList[length]=null;
for(var j=0;j<length;j++){
if(this.imageList[j]!=null)return;
}
this.imageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolImageList",
function(list){
var i=0;
var length=this.toolImageList.length;
while(i<length){
if(this.toolImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolImageList,i+1,this.toolImageList,i,--length-i);
this.toolImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolImageList[j]!=null)return;
}
this.toolImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolHotImageList",
function(list){
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
if(this.toolHotImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolHotImageList,i+1,this.toolHotImageList,i,--length-i);
this.toolHotImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolHotImageList[j]!=null)return;
}
this.toolHotImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolDisabledImageList",
function(list){
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
if(this.toolDisabledImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolDisabledImageList,i+1,this.toolDisabledImageList,i,--length-i);
this.toolDisabledImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolDisabledImageList[j]!=null)return;
}
this.toolDisabledImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"removeFilter",
function(eventType,listener){
if(this.filterTable==null)return;
this.filterTable.unhook(eventType,listener);
if(this.filterTable.size()==0)this.filterTable=null;
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeBar",
function(menu){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
if(this.bars[i]==menu){
this.bars[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"removeControl",
function(handle){
if(handle==null)return null;
var control=null;
var index=0;
if(0<=index&&index<this.controlTable.length){
control=this.controlTable[index];
this.controlTable[index]=null;
this.indexTable[index]=this.freeSlot;
this.freeSlot=index;
}return control;
},"~O");
$_M(c$,"removeMenuItem",
function(item){
if(this.items==null)return;
this.items[item.id-108]=null;
item.id=-1;
},"$wt.widgets.MenuItem");
$_M(c$,"removePopup",
function(menu){
if(this.popups==null)return;
for(var i=0;i<this.popups.length;i++){
if(this.popups[i]==menu){
this.popups[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"runDeferredEvents",
function(){
while(this.eventQueue!=null){
var event=this.eventQueue[0];
if(event==null)break;
var length=this.eventQueue.length;
System.arraycopy(this.eventQueue,1,this.eventQueue,0,--length);
this.eventQueue[length]=null;
var widget=event.widget;
if(widget!=null&&!widget.isDisposed()){
var item=event.item;
if(item==null||!item.isDisposed()){
widget.sendEvent(event);
}}}
this.eventQueue=null;
return true;
});
$_M(c$,"runPopups",
function(){
if(this.popups==null)return false;
var result=false;
while(this.popups!=null){
var menu=this.popups[0];
if(menu==null)break;
var length=this.popups.length;
System.arraycopy(this.popups,1,this.popups,0,--length);
this.popups[length]=null;
this.runDeferredEvents();
menu._setVisible(true);
result=true;
}
this.popups=null;
return result;
});
$_M(c$,"runTimer",
function(id){
if(this.timerList!=null&&this.timerIds!=null){
var index=0;
while(index<this.timerIds.length){
if(this.timerIds[index]==id){
w$.clearInterval(this.timerIds[index]);
this.timerIds[index]=0;
var runnable=this.timerList[index];
this.timerList[index]=null;
if(runnable!=null)runnable.run();
return true;
}index++;
}
}return false;
},"~N");
$_M(c$,"sendEvent",
function(eventType,event){
if(this.eventTable==null&&this.filterTable==null){
return;
}if(event==null)event=new $wt.widgets.Event();
event.display=this;
event.type=eventType;
if(event.time==0)event.time=this.getLastEventTime();
if(!this.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"~N,$wt.widgets.Event");
$_M(c$,"sendMessage",
function(msg){
this.msgs[this.msgs.length]=msg;
},"$wt.internal.struct.MESSAGE");
$_M(c$,"setCursorLocation",
function(x,y){
},"~N,~N");
$_M(c$,"setCursorLocation",
function(point){
this.setCursorLocation(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"setData",
function(key,value){
if(value==null){
if(this.keys==null)return;
var index=0;
while(index<this.keys.length&&!this.keys[index].equals(key))index++;

if(index==this.keys.length)return;
if(this.keys.length==1){
this.keys=null;
this.values=null;
}else{
var newKeys=new Array(this.keys.length-1);
var newValues=new Array(this.values.length-1);
System.arraycopy(this.keys,0,newKeys,0,index);
System.arraycopy(this.keys,index+1,newKeys,index,newKeys.length-index);
System.arraycopy(this.values,0,newValues,0,index);
System.arraycopy(this.values,index+1,newValues,index,newValues.length-index);
this.keys=newKeys;
this.values=newValues;
}return;
}if(this.keys==null){
this.keys=[key];
this.values=[value];
return;
}for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key)){
this.values[i]=value;
return;
}}
var newKeys=new Array(this.keys.length+1);
var newValues=new Array(this.values.length+1);
System.arraycopy(this.keys,0,newKeys,0,this.keys.length);
System.arraycopy(this.values,0,newValues,0,this.values.length);
newKeys[this.keys.length]=key;
newValues[this.values.length]=value;
this.keys=newKeys;
this.values=newValues;
},"~S,~O");
$_M(c$,"setData",
function(data){
this.data=data;
},"~O");
c$.setAppName=$_M(c$,"setAppName",
function(name){
},"~S");
$_M(c$,"setModalDialogShell",
function(modalDailog){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
this.modalDialogShell=modalDailog;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setModalShell",
function(shell){
if(this.modalShells==null)this.modalShells=new Array(4);
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]==shell)return;
if(this.modalShells[index]==null)break;
index++;
}
if(index==length){
var newModalShells=new Array(length+4);
System.arraycopy(this.modalShells,0,newModalShells,0,length);
this.modalShells=newModalShells;
}this.modalShells[index]=shell;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setSynchronizer",
function(synchronizer){
},"$wt.widgets.Synchronizer");
$_M(c$,"sleep",
function(){
return false;
});
$_M(c$,"syncExec",
function(runnable){
runnable.run();
},"Runnable");
$_M(c$,"timerExec",
function(milliseconds,runnable){
if(this.timerList==null)this.timerList=new Array(4);
if(this.timerIds==null)this.timerIds=$_A(4,0);
var index=0;
while(index<this.timerList.length){
if(this.timerList[index]==runnable)break;
index++;
}
var timerId=0;
if(index!=this.timerList.length){
timerId=this.timerIds[index];
if(milliseconds<0){
w$.clearInterval(timerId);
this.timerList[index]=null;
this.timerIds[index]=0;
return;
}}else{
if(milliseconds<0)return;
index=0;
while(index<this.timerList.length){
if(this.timerList[index]==null)break;
index++;
}
this.nextTimerId++;
timerId=this.nextTimerId;
if(index==this.timerList.length){
var newTimerList=new Array(this.timerList.length+4);
System.arraycopy(this.timerList,0,newTimerList,0,this.timerList.length);
this.timerList=newTimerList;
var newTimerIds=$_A(this.timerIds.length+4,0);
System.arraycopy(this.timerIds,0,newTimerIds,0,this.timerIds.length);
this.timerIds=newTimerIds;
}}var newTimerID=w$.setTimeout($_Q(runnable),milliseconds);
if(newTimerID!=0){
this.timerList[index]=runnable;
this.timerIds[index]=newTimerID;
}},"~N,Runnable");
$_M(c$,"update",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.update(true);
}
});
$_M(c$,"wake",
function(){
});
c$.withCrLf=$_M(c$,"withCrLf",
function(string){
var length=string.length;
if(length==0)return string;
var i=string.indexOf('\n',0);
if(i==-1)return string;
if(i>0&&(string.charAt(i-1)).charCodeAt(0)==('\r').charCodeAt(0)){
return string;
}i++;
var count=1;
while(i<length){
if((i=string.indexOf('\n',i))==-1)break;
count++;
i++;
}
count+=length;
i=0;
var result=new StringBuffer(count);
while(i<length){
var j=string.indexOf('\n',i);
if(j==-1)j=length;
result.append(string.substring(i,j));
if((i=j)<length){
result.append("\r\n");
i++;
}}
return result.toString();
},"~S");
c$.releaseAllDisplays=$_M(c$,"releaseAllDisplays",
function(){
if($wt.widgets.Display.Displays!=null){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
$wt.widgets.Display.Displays[i].dispose();
$wt.widgets.Display.Displays[i]=null;
}}
($t$=$wt.widgets.Display.Displays=null,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
}($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
});
$_S(c$,
"GROW_SIZE",1024,
"ID_START",108,
"Default",null);
c$.Displays=c$.prototype.Displays=new Array(4);
$_S(c$,
"monitors",null,
"monitorCount",0,
"TrimEnabled",false,
"PACKAGE_PREFIX","org.eclipse.swt.widgets.");


if(window.attachEvent){
window.attachEvent("onunload",function(){
try{
org.eclipse.swt.widgets.Display.releaseAllDisplays();

}catch(e){


}
return true;
});
}
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.image=null;
this.image2=null;
$_Z(this,arguments);
},$wt.widgets,"Label",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Label,[parent,$wt.widgets.Label.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
if((style&2)!=0){
style=$wt.widgets.Widget.checkBits(style,512,256,0,0,0,0);
return $wt.widgets.Widget.checkBits(style,8,4,32,0,0,0);
}return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
if((this.style&2)!=0){
var lineWidth=1;
if((this.style&256)!=0){
width=64;
height=lineWidth*2;
}else{
width=lineWidth*2;
height=64;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=O$.getStringStyledWrappedHeight(this.text,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=O$.getStringStyledSize(this.text,"label-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"getAlignment",
function(){
if((this.style&2)!=0)return 0;
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
if((this.style&2)!=0)return"";
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Label,"releaseWidget",[]);
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&2)!=0)return;
if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&16384)!=0){
this.handle.style.textAlign="left";
this.handle.style.backgroundPosition="left center";
}else if((this.style&16777216)!=0){
this.handle.style.textAlign="center";
this.handle.style.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.handle.style.textAlign="right";
this.handle.style.backgroundPosition="right center";
}},"~N");
$_M(c$,"setImage",
function(image){
if(image==null)return;
if((this.style&2)!=0)return;
this.image=image;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var handleStyle=this.handle.style;
if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
handleStyle.backgroundPosition="left center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}else if(this.handle.childNodes.length==0){
if(image.handle==null)return;
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}else{
if(image.handle==null)return;
var txt=this.handle.childNodes[0];
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.insertBefore(image.handle.childNodes[i],txt);
}
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.image!=null){
this.handle.style.backgroundImage="";
if(O$.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.handle.style.filter!=null){
this.handle.style.filter="";
}}if(string==this.text){
return;
}this.textSizeCached=false;
this.text=string;
O$.insertText(this.handle,this.text);
},"~S");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="label-default";
if((this.style&2)!=0){
if((this.style&4)!=0){
this.handle.className+=" shadow-in";
}else if((this.style&8)!=0){
this.handle.className+=" shadow-out";
}else{
this.handle.className+=" shadow-none";
}this.handle.style.fontSize="0";
var seperator1=d$.createElement("DIV");
var seperator2=d$.createElement("DIV");
if((this.style&512)!=0){
seperator1.className="label-seperator-vertical-left";
seperator2.className="label-seperator-vertical-right";
}else{
seperator1.className="label-seperator-horizontal-top";
seperator2.className="label-seperator-horizontal-bottom";
}this.handle.appendChild(seperator1);
this.handle.appendChild(seperator2);
}if((this.style&64)!=0){
this.handle.className+=" label-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" label-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Label,"setBounds",[x,y,width,height]);
if((this.style&2)!=0){
var handleStyle=this.handle.childNodes[0].style;
if((this.style&256)!=0){
var h=(Math.floor(height/2))-1;
if(O$.isIE){
h--;
}handleStyle.marginTop=h+"px";
handleStyle.width=width+"px";
this.handle.childNodes[1].style.width=width+"px";
}else{
handleStyle.marginLeft=((Math.floor(width/2))-1)+"px";
handleStyle.height=height+"px";
this.handle.childNodes[1].style.marginLeft=(Math.floor(width/2))+"px";
this.handle.childNodes[1].style.height=height+"px";
}}},"~N,~N,~N,~N");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Label,"setEnabled",[enabled]);
if(!enabled){
this.lastColor=this.handle.style.color;
this.handle.style.color="gray";
}else{
this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Label,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Label,"setFont",[font]);
},"$wt.graphics.Font");
c$=$_C(function(){
this.text=null;
this.cachedText=null;
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.anchors=null;
this.offsets=null;
this.selection=null;
this.ids=null;
this.mnemonics=null;
this.focusIndex=0;
this.font=0;
$_Z(this,arguments);
},$wt.widgets,"Link",$wt.widgets.Control);
$_Y(c$,function(){
this.anchors=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Link,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
if(wHint!=-1&&wHint<0)wHint=0;
if(hHint!=-1&&hHint<0)hHint=0;
var width=0;
var height=0;
if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=O$.getStringStyledWrappedHeight(this.cachedText,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=O$.getStringStyledSize(this.cachedText,"label-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}var border=this.getBorderWidth();
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="link-default";
if((this.style&64)!=0){
this.handle.className+=" link-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" link-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Link,"createWidget",[]);
this.text="";
});
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Link,"enableWidget",[enabled]);
},"~B");
$_V(c$,"hookSelection",
function(){
var linkHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.item=this.b$["$wt.widgets.Link"];
e.text=this.b$["$wt.widgets.Link"].text;
e.widget=this.b$["$wt.widgets.Link"];
e.display=this.b$["$wt.widgets.Link"].display;
this.b$["$wt.widgets.Link"].sendEvent(13);
if(!e.doit){
this.toReturn(false);
}});
c$=$_P();
}
return $_N($wt.widgets.Link$1,i$,v$);
})(this,null));
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].href="#";
this.anchors[i].target=null;
this.anchors[i].onclick=linkHandler;
this.anchors[i].ondblclick=linkHandler;
}
});
$_M(c$,"initAccessible",
function(){
var accessible=this.getAccessible();
accessible.addAccessibleListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$2",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(e){
e.result=this.b$["$wt.widgets.Link"].parse(this.b$["$wt.widgets.Link"].text,null);
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
}
return $_N($wt.widgets.Link$2,i$,v$);
})(this,null));
accessible.addAccessibleControlListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$3",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getChildAtPoint",
function(e){
e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getLocation",
function(e){
var rect=this.b$["$wt.widgets.Link"].display.map(this.b$["$wt.widgets.Link"].getParent(),null,this.b$["$wt.widgets.Link"].getBounds());
e.x=rect.x;
e.y=rect.y;
e.width=rect.width;
e.height=rect.height;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildCount",
function(e){
e.detail=0;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getRole",
function(e){
e.detail=30;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(e){
e.detail=1048576;
if(this.b$["$wt.widgets.Link"].hasFocus())e.detail|=4;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getDefaultAction",
function(e){
e.result=$WT.getMessage("SWT_Press");
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getSelection",
function(e){
if(this.b$["$wt.widgets.Link"].hasFocus())e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getFocus",
function(e){
if(this.b$["$wt.widgets.Link"].hasFocus())e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
}
return $_N($wt.widgets.Link$3,i$,v$);
})(this,null));
});
$_V(c$,"getBorderWidth",
function(){
return 2;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"parse",
function(string,handle){
var el=handle;
var length=string.length;
this.offsets=new Array(Math.floor(length/4));
this.ids=new Array(Math.floor(length/4));
this.mnemonics=$_A(Math.floor(length/4)+1,0);
var result=new StringBuffer();
var result2=new StringBuffer();
var buffer=$_A(length,'\0');
string.getChars(0,string.length,buffer,0);
var index=0;
var state=0;
var linkIndex=0;
var start=0;
var tagStart=0;
var linkStart=0;
var endtagStart=0;
var refStart=0;
while(index<length){
var c=buffer[index];
if((c).charCodeAt(0)>=('A').charCodeAt(0)&&(c).charCodeAt(0)<=('Z').charCodeAt(0)){
c=String.fromCharCode((c).charCodeAt(0)+(32));
}switch(state){
case 0:
if((c).charCodeAt(0)==('<').charCodeAt(0)){
tagStart=index;
state++;
}break;
case 1:
if((c).charCodeAt(0)==('a').charCodeAt(0))state++;
break;
case 2:
switch(c){
case'h':
state=7;
break;
case'>':
linkStart=index+1;
state++;
break;
default:
if((c).charCodeAt(0)==32||(c).charCodeAt(0)==160)break;
else state=13;
}
break;
case 3:
if((c).charCodeAt(0)==('<').charCodeAt(0)){
endtagStart=index;
state++;
}break;
case 4:
state=(c).charCodeAt(0)==('/').charCodeAt(0)?state+1:3;
break;
case 5:
state=(c).charCodeAt(0)==('a').charCodeAt(0)?state+1:3;
break;
case 6:
if((c).charCodeAt(0)==('>').charCodeAt(0)){
this.mnemonics[linkIndex]=this.parseMnemonics(buffer,start,tagStart,result,result2,handle);
var offset=result.length();
var anchor=null;
if(handle!=null){
anchor=d$.createElement("A");
el.appendChild(anchor);
this.anchors[this.anchors.length]=anchor;
}this.parseMnemonics(buffer,linkStart,endtagStart,result,result2,anchor);
this.offsets[linkIndex]=new $wt.graphics.Point(offset,result.length()-1);
if(this.ids[linkIndex]==null){
this.ids[linkIndex]=String.instantialize(buffer,linkStart,endtagStart-linkStart);
}if(anchor!=null){
anchor.href=this.ids[linkIndex];
anchor.target="_blank";
anchor.title=this.ids[linkIndex];
}linkIndex++;
start=tagStart=linkStart=endtagStart=refStart=index+1;
state=0;
}else{
state=3;
}break;
case 7:
state=(c).charCodeAt(0)==('r').charCodeAt(0)?state+1:0;
break;
case 8:
state=(c).charCodeAt(0)==('e').charCodeAt(0)?state+1:0;
break;
case 9:
state=(c).charCodeAt(0)==('f').charCodeAt(0)?state+1:0;
break;
case 10:
state=(c).charCodeAt(0)==('=').charCodeAt(0)?state+1:0;
break;
case 11:
if((c).charCodeAt(0)==('"').charCodeAt(0)){
state++;
refStart=index+1;
}else{
state=0;
}break;
case 12:
if((c).charCodeAt(0)==('"').charCodeAt(0)){
this.ids[linkIndex]=String.instantialize(buffer,refStart,index-refStart);
state=2;
}break;
case 13:
if(Character.isWhitespace(c)){
state=0;
}else if((c).charCodeAt(0)==('=').charCodeAt(0)){
state++;
}break;
case 14:
state=(c).charCodeAt(0)==('"').charCodeAt(0)?state+1:0;
break;
case 15:
if((c).charCodeAt(0)==('"').charCodeAt(0))state=2;
break;
default:
state=0;
break;
}
index++;
}
if(start<length){
var tmp=this.parseMnemonics(buffer,start,tagStart,result,result2,handle);
var mnemonic=this.parseMnemonics(buffer,linkStart,index,result,result2,handle);
if(mnemonic==-1)mnemonic=tmp;
this.mnemonics[linkIndex]=mnemonic;
}else{
this.mnemonics[linkIndex]=-1;
}if(this.offsets.length!=linkIndex){
var newOffsets=new Array(linkIndex);
System.arraycopy(this.offsets,0,newOffsets,0,linkIndex);
this.offsets=newOffsets;
var newIDs=new Array(linkIndex);
System.arraycopy(this.ids,0,newIDs,0,linkIndex);
this.ids=newIDs;
var newMnemonics=$_A(linkIndex+1,0);
System.arraycopy(this.mnemonics,0,newMnemonics,0,linkIndex+1);
this.mnemonics=newMnemonics;
}this.cachedText=result2.toString();
return result.toString();
},"~S,~O");
$_M(c$,"parseMnemonics",
function(buffer,start,end,result,result2,handle){
var el=handle;
var mnemonic=-1;
var index=start;
var lastIndex=result.length();
while(index<end){
var c=buffer[index];
result2.append(c);
if((c).charCodeAt(0)==('&').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('&').charCodeAt(0)){
result.append(c);
index++;
}else{
mnemonic=result.length();
if(el!=null){
if((mnemonic>lastIndex)&&(el!=null)){
var len=mnemonic-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,mnemonic,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=mnemonic+1;
var span=d$.createElement("SPAN");
el.appendChild(span);
span.appendChild(d$.createTextNode(""+buffer[index+1]));
}}}else{
result.append(c);
}var lineBreak=false;
if((c).charCodeAt(0)==('\r').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('\n').charCodeAt(0)){
result.append('\n');
index++;
}lineBreak=true;
}if((c).charCodeAt(0)==('\n').charCodeAt(0)){
lineBreak=true;
}if(lineBreak&&el!=null){
var idx=result.length();
if(idx>lastIndex){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,idx,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=idx;
el.appendChild(d$.createElement("BR"));
}index++;
}
var idx=result.length();
if(idx>lastIndex&&el!=null){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,idx,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}return mnemonic;
},"~A,~N,~N,StringBuffer,StringBuffer,~O");
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Link,"releaseWidget",[]);
this.offsets=null;
this.ids=null;
this.mnemonics=null;
this.text=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
if(!this.hooks(13)&&!this.hooks(14)){
this.unhookSelection();
}},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Link,"setEnabled",[enabled]);
var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="link-disabled";
var idx=cssName.indexOf(key);
if(!enabled){
this.lastColor=this.handle.style.color;
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Link,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Link,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(string){
if(string.equals(this.text))return;
this.text=string;
this.textSizeCached=false;
this.parse(string,this.handle);
System.out.println(this.cachedText);
System.out.println("ids==");
for(var i=0;i<this.ids.length;i++){
System.out.println(i+"/"+this.ids[i]);
}
System.out.println("mnemonics==");
for(var i=0;i<this.mnemonics.length;i++){
System.out.println(i+"/"+this.mnemonics[i]);
}
System.out.println("offsets==");
for(var i=0;i<this.offsets.length;i++){
System.out.println(i+"/"+this.offsets[i]);
}
},"~S");
$_M(c$,"unhookSelection",
function(){
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].onclick=null;
this.anchors[i].ondblclick=null;
this.anchors[i].href=this.ids[i];
this.anchors[i].target="_blank";
}
});
c$.LINK_FOREGROUND=c$.prototype.LINK_FOREGROUND=new $wt.graphics.RGB(0,51,153);
c$=$_C(function(){
this.groupText=null;
this.textWidth=0;
this.textHeight=0;
this.borderFrame=null;
this.titleLine=null;
this.leftCorner=null;
this.titleText=null;
this.rightCorner=null;
this.leftSide=null;
this.rightSide=null;
this.bottomLeft=null;
this.bottomRight=null;
this.contentBox=null;
this.content=null;
$_Z(this,arguments);
},$wt.widgets,"Group",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Group,[parent,$wt.widgets.Group.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.Group,"computeSize",[wHint,hHint,changed]);
var length=0;
if(this.groupText!=null){
length=this.groupText.length;
}if(length!=0){
size.x=Math.max(size.x,this.textWidth+18);
}return size;
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.Group,"computeTrim",[x,y,width,height]);
trim.x-=3;
if(this.textHeight<=0){
this.textHeight=O$.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}trim.y-=this.textHeight;
trim.width+=6;
trim.height+=this.textHeight+3;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.content;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
el.className=css;
(parent).appendChild(el);
return el;
},"~O,~S");
$_V(c$,"createHandle",
function(){
this.state&=-3;
this.handle=d$.createElement("DIV");
if((this.style&2048)!=0){
this.handle.className="group-default group-border-default";
}else{
this.handle.className="group-default";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}var className=null;
if((this.style&16)!=0){
className="group-shadow-etched-in";
}else if((this.style&64)!=0){
className="group-shadow-etched-out";
}else if((this.style&4)!=0){
className="group-shadow-in";
}else if((this.style&8)!=0){
className="group-shadow-out";
}else if((this.style&32)!=0){
className="group-shadow-none";
}if(className==null){
className="group-border-frame group-no-title-text";
}else{
className="group-border-frame group-no-title-text "+className;
}this.borderFrame=this.createCSSElement(this.handle,className);
this.titleLine=this.createCSSElement(this.borderFrame,"group-title-line");
this.leftCorner=this.createCSSElement(this.borderFrame,"group-left-corner");
this.rightCorner=this.createCSSElement(this.borderFrame,"group-right-corner");
this.titleText=this.createCSSElement(this.borderFrame,"group-title-text");
this.leftSide=this.createCSSElement(this.borderFrame,"group-side-line-left");
this.rightSide=this.createCSSElement(this.borderFrame,"group-side-line-right");
this.bottomLeft=this.createCSSElement(this.borderFrame,"group-bottom-line-left");
this.bottomRight=this.createCSSElement(this.borderFrame,"group-bottom-line-right");
this.contentBox=this.createCSSElement(this.handle,"group-content-box");
this.content=this.createCSSElement(this.contentBox,"group-content");
});
$_V(c$,"getClientArea",
function(){
this.forceResize();
if(this.textHeight<=0){
this.textHeight=O$.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}var x=3;
var y=this.textHeight;
var border=this.getBorderWidth();
var width=this.width-border*2-6;
var height=this.height-border*2-y-3;
return new $wt.graphics.Rectangle(x,y,width,height);
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.groupText;
});
$_V(c$,"mnemonicHit",
function(key){
return this.setFocus();
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.titleLine!=null){
O$.destroyHandle(this.titleLine);
this.titleLine=null;
}if(this.titleText!=null){
O$.destroyHandle(this.titleText);
this.titleText=null;
}if(this.leftCorner!=null){
O$.destroyHandle(this.leftCorner);
this.leftCorner=null;
}if(this.rightCorner!=null){
O$.destroyHandle(this.rightCorner);
this.rightCorner=null;
}if(this.bottomLeft!=null){
O$.destroyHandle(this.bottomLeft);
this.bottomLeft=null;
}if(this.bottomRight!=null){
O$.destroyHandle(this.bottomRight);
this.bottomRight=null;
}if(this.leftSide!=null){
O$.destroyHandle(this.leftSide);
this.leftSide=null;
}if(this.rightSide!=null){
O$.destroyHandle(this.rightSide);
this.rightSide=null;
}if(this.borderFrame!=null){
O$.destroyHandle(this.borderFrame);
this.borderFrame=null;
}if(this.content!=null){
O$.destroyHandle(this.content);
this.content=null;
}if(this.contentBox!=null){
O$.destroyHandle(this.contentBox);
this.contentBox=null;
}$_U(this,$wt.widgets.Group,"releaseHandle",[]);
});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Group,"setBounds",[x,y,width,height]);
if(this.textWidth==0&&this.groupText!=null&&this.groupText.length!=0){
this.textWidth=O$.getStringStyledWidth(this.groupText,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-12;
if(w<0){
w=0;
}this.rightCorner.style.width=w+"px";
}},"~N,~N,~N,~N");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Group,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(string){
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var key="group-no-title-text";
var idx=cssName.indexOf(key);
if(string.length==0){
if(idx==-1){
this.borderFrame.className+=" "+key;
}}else{
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!string.equals(this.groupText)){
for(var i=this.titleText.childNodes.length-1;i>=0;i--){
this.titleText.removeChild(this.titleText.childNodes[i]);
}
this.titleText.appendChild(d$.createTextNode(string));
this.textWidth=O$.getContainerWidth(this.titleText);
if(this.textWidth==0){
this.textWidth=O$.getStringStyledWidth(string,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-24;
if(w>0){
this.rightCorner.style.width=w+"px";
}}}}this.groupText=string;
},"~S");
$_S(c$,
"CLIENT_INSET",3);
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.hasImage=false;
this.image=null;
this.image2=null;
this.imageList=null;
this.ignoreMouse=false;
this.btnText=null;
this.btnHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Button",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Button,[parent,$wt.widgets.Button.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"_setImage",
function(image){
},"$wt.graphics.Image");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,8,4,32,16,2,0);
if((style&(10))!=0){
return $wt.widgets.Widget.checkBits(style,16777216,16384,131072,0,0,0);
}if((style&(48))!=0){
return $wt.widgets.Widget.checkBits(style,16384,131072,16777216,0,0,0);
}if((style&4)!=0){
style|=524288;
return $wt.widgets.Widget.checkBits(style,128,1024,16384,131072,0,0);
}return style;
},"~N");
$_M(c$,"click",
function(){
this.ignoreMouse=true;
this.ignoreMouse=false;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=0;
var height=0;
if((this.style&4)!=0){
if((this.style&(1152))!=0){
width+=16;
height+=16;
}else{
width+=16;
height+=16;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}var extra=0;
if(!this.hasImage){
if(this.text==null||this.text.length==0){
height+=O$.getStringStyledHeight(".","button-default",null);
}else{
if(!this.textSizeCached||changed){
var string=this.text.replaceAll("[\r\n]+","");
var cssSize=O$.getStringStyledSize(string,"button-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
if((this.style&(48))!=0){
width-=5;
}extra=Math.max(8,height);
}}else{
if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}extra=8;
}}if((this.style&(48))!=0){
width+=13+extra;
height=Math.max(height,16);
}if((this.style&(10))!=0){
width+=12;
height+=10;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"enableWidget",
function(enabled){
this.btnHandle.disabled=!enabled;
var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="button-disabled";
var idx=cssName.indexOf(key);
if(!enabled){
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}},"~B");
$_M(c$,"getAlignment",
function(){
if((this.style&4)!=0){
if((this.style&128)!=0)return 128;
if((this.style&1024)!=0)return 1024;
if((this.style&16384)!=0)return 16384;
if((this.style&131072)!=0)return 131072;
return 128;
}if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getDefault",
function(){
if((this.style&8)==0)return false;
return false;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSelection",
function(){
if((this.style&(50))==0)return false;
if((this.style&2)!=0){
System.out.println(this.btnHandle.className);
return(this.btnHandle.className!=null&&this.btnHandle.className.indexOf("button-selected")!=-1);
}else if((this.style&(48))!=0){
return this.btnHandle.checked;
}return false;
});
$_M(c$,"getText",
function(){
if((this.style&4)!=0)return"";
return this.text;
});
$_V(c$,"isEnabled",
function(){
return!this.btnHandle.disabled;
});
$_M(c$,"isTabItem",
function(){
return $_U(this,$wt.widgets.Button,"isTabItem",[]);
});
$_V(c$,"mnemonicHit",
function(ch){
if(!this.setFocus())return false;
if((this.style&16)==0)this.click();
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.btnText!=null){
O$.destroyHandle(this.btnText);
this.btnText=null;
}if(this.btnHandle!=null){
O$.destroyHandle(this.btnHandle);
this.btnHandle=null;
}$_U(this,$wt.widgets.Button,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Button,"releaseWidget",[]);
if(this.imageList!=null)this.imageList.dispose();
this.imageList=null;
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var children=this.parent._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(this!=child)child.setRadioSelection(false);
}
this.setSelection(true);
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&4)!=0){
if((this.style&(148608))==0)return;
this.style&=-148609;
this.style|=alignment&(148608);
this.updateArrowStyle();
var cx=this.width;
var cy=this.height;
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}this.updateArrowSize(cx,cy);
return;
}if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&(10))!=0){
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
}else{
handleStyle=this.btnHandle.style;
}if((this.style&16384)!=0){
this.btnText.style.textAlign="left";
handleStyle.backgroundPosition="left center";
}if((this.style&16777216)!=0){
this.btnText.style.textAlign="center";
handleStyle.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.btnText.style.textAlign="right";
handleStyle.backgroundPosition="right center";
}}},"~N");
$_M(c$,"setDefault",
function(value){
if((this.style&8)==0)return;
if(value){
try{
this.handle.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setFixedFocus",[]);
});
$_M(c$,"setImage",
function(image){
if((this.style&4)!=0)return;
this.image=image;
this.hasImage=true;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
O$.clearChildren(this.btnText);
this.btnText.style.display="";
this.btnText.style.paddingTop="";
this.btnHandle.parentNode.style.bottom="";
this.btnHandle.parentNode.style.top="";
this.btnHandle.style.top="";
this.btnText.parentNode.style.position="";
this.btnText.parentNode.style.top="";
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
handleStyle.display="block";
handleStyle.marginLeft=(16)+"px";
handleStyle.paddingTop=this.image.height+"px";
}else{
handleStyle=this.btnHandle.style;
}if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
var bgXPos="center";
if((this.style&(48))!=0){
if((this.style&131072)!=0){
bgXPos="right";
}else if((this.style&16777216)!=0){
bgXPos="center";
}else{
bgXPos="left";
}}handleStyle.backgroundPosition=bgXPos+" center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
$_V(c$,"setRadioFocus",
function(){
if((this.style&16)==0||!this.getSelection())return false;
return this.setFocus();
});
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSavedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setSavedFocus",[]);
});
$_M(c$,"setSelection",
function(selected){
if((this.style&(50))==0)return;
if((this.style&2)!=0){
var cssName=this.btnHandle.className;
if(cssName==null)cssName="";
var key="button-selected";
var idx=cssName.indexOf(key);
if(selected){
if(idx==-1){
this.btnHandle.className+=" "+key;
}}else{
if(idx!=-1){
this.btnHandle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}}else if((this.style&(48))!=0){
this.btnHandle.checked=selected;
}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&4)!=0)return;
if(string!=this.text){
this.textSizeCached=false;
}O$.clearChildren(this.btnText);
if(this.hasImage){
this.btnText.style.backgroundImage="";
if(O$.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.btnText.style.filter!=null){
this.btnText.style.filter="";
}}this.text=string;
this.hasImage=false;
string=string.replaceAll("(&(&))|([\r\n]+)","$2");
var idx=string.indexOf('&');
if(idx==-1){
this.btnText.appendChild(d$.createTextNode(string));
}else{
this.btnText.appendChild(d$.createTextNode(string.substring(0,idx)));
var underline=d$.createElement("SPAN");
underline.appendChild(d$.createTextNode(string.substring(idx+1,idx+2)));
underline.className="button-text-mnemonics";
this.btnText.appendChild(underline);
this.btnText.appendChild(d$.createTextNode(string.substring(idx+2)));
}},"~S");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}if((this.style&4)!=0){
this.updateArrowSize(cx,cy);
}if((this.style&(48))!=0){
var h=0;
if(!this.hasImage){
if(this.textSizeCached){
this.btnText.style.display="block";
if(this.textHeightCached<13){
this.btnText.style.paddingTop=(Math.floor((13-this.textHeightCached)/2))+"px";
this.btnHandle.parentNode.style.bottom="0";
this.btnHandle.parentNode.style.top="0";
this.btnHandle.style.top="0";
}else{
this.btnText.style.paddingTop="0";
}}h=this.textHeightCached;
}else{
h=this.image.height;
}h=Math.max(16,h);
if(h<cy){
this.btnText.parentNode.style.position="relative";
this.btnText.parentNode.style.top=(Math.floor((cy-h)/2))+"px";
}}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"updateArrowSize",
($fz=function(cx,cy){
var xx=Math.floor(Math.min(cx,cy)/3);
var s=this.btnText.style;
s.borderWidth=(xx>0?xx:0)+"px";
if((this.style&16384)!=0){
s.borderLeftWidth="0";
}else if((this.style&131072)!=0){
s.borderRightWidth="0";
}else if((this.style&128)!=0){
s.borderTopWidth="0";
}else if((this.style&1024)!=0){
if(xx>1){
s.borderWidth=(xx-1)+"px";
}s.borderBottomWidth="0";
}else{
s.borderTopWidth="0";
}var x=Math.floor(cy/6);
xx=Math.floor(cy/3);
s.position="relative";
if((this.style&(147456))!=0){
s.top=(x-3)+"px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.top=(xx-3)+"px";
}else if((this.style&1024)!=0){
s.top=(xx-2)+"px";
}}if(O$.isMozilla&&!O$.isFirefox){
if((this.style&128)!=0){
s.left="-2px";
}else if((this.style&1024)!=0){
s.left="-1px";
}}if(O$.isFirefox){
if((this.style&(147456))!=0){
s.top="-2px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.left="-2px";
s.top="-1px";
}else if((this.style&1024)!=0){
s.left="-1px";
s.top="-1px";
}}}},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"setCursor",
function(cursor){
if(this.handle!=null){
this.handle.style.cursor=cursor.handle;
}},"$wt.graphics.Cursor");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="button-default";
if((this.style&2048)!=0){
cssName+=" button-border";
}if((this.style&8388608)!=0){
cssName+=" button-flat";
}this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&(48))!=0){
var btnEl=d$.createElement("DIV");
this.handle.appendChild(btnEl);
var btnWrapperEl=d$.createElement("DIV");
btnWrapperEl.className="button-input-wrapper";
btnEl.appendChild(btnWrapperEl);
this.btnHandle=d$.createElement("INPUT");
if((this.style&32)!=0){
btnEl.className="button-check";
this.btnHandle.type="checkbox";
}else{
btnEl.className="button-radio";
this.btnHandle.type="radio";
}btnWrapperEl.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnText.className="button-text";
btnEl.appendChild(this.btnText);
}else{
this.btnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnHandle.appendChild(this.btnText);
if((this.style&2)!=0){
this.btnHandle.className="button-toggle";
}else if((this.style&4)!=0){
this.btnHandle.className="button-arrow";
this.updateArrowStyle();
}else{
this.btnHandle.className="button-push";
}}this.hookSelection();
});
$_M(c$,"updateArrowStyle",
($fz=function(){
if((this.style&16384)!=0){
this.btnText.className="button-arrow-left";
}else if((this.style&131072)!=0){
this.btnText.className="button-arrow-right";
}else if((this.style&128)!=0){
this.btnText.className="button-arrow-up";
}else if((this.style&1024)!=0){
this.btnText.className="button-arrow-down";
}else{
this.btnText.className="button-arrow-up";
}},$fz.isPrivate=true,$fz));
$_V(c$,"hookSelection",
function(){
var eventHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Button$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Button"].isEnabled()){
this.toReturn(false);
return;
}if((this.b$["$wt.widgets.Button"].style&(34))!=0){
var e=this.getEvent();
if((this.b$["$wt.widgets.Button"].style&32)!=0){
if(e.srcElement!=this.b$["$wt.widgets.Button"].btnHandle){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
if((this.b$["$wt.widgets.Button"].style&16)!=0){
if((this.b$["$wt.widgets.Button"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}else{
this.b$["$wt.widgets.Button"].selectRadio();
}}}this.b$["$wt.widgets.Button"].postEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Button$1,i$,v$);
})(this,null));
this.handle.onclick=this.handle.ondblclick=eventHandler;
if((this.style&(48))!=0){
this.btnText.onclick=eventHandler;
}});
$_S(c$,
"CHECK_WIDTH",13,
"CHECK_HEIGHT",13,
"ICON_WIDTH",128,
"ICON_HEIGHT",128);
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
this.textHandle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Text$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if((this.b$["$wt.widgets.Text"].style&8)!=0||(!this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var newText=this.b$["$wt.widgets.Text"].textHandle.value;
if(newText!=null){
var oldText=newText;
newText=this.b$["$wt.widgets.Text"].verifyText(newText,0,0,null);
if(newText==null){
this.toReturn(true);
return;
}if(!newText.equals(oldText)){
var e=new $wt.widgets.Event();
e.type=24;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
}}});
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
System.out.println(rect);
System.out.println(width+","+height);
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
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.hasImage=false;
this.textEl=null;
$_Z(this,arguments);
},$wt.widgets,"TabItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
var index=parent.getItemCount();
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N,~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"configure",
($fz=function(index){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TabItem"].parent.setSelection(this.f$.index,true);
});
c$=$_P();
}
return $_N($wt.widgets.TabItem$1,i$,v$);
})(this,$_F("index",index)));
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
O$.destroyHandle(this.textEl);
this.textEl=null;
}if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.TabItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=control;
var index=this.parent.indexOf(this);
if(index!=this.parent.getSelectionIndex()){
if(newControl!=null)newControl.setVisible(false);
return;
}if(newControl!=null){
newControl.setBounds(this.parent.getClientArea());
newControl.setVisible(true);
}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TabItem,"setImage",[image]);
if(image!=null&&image.handle==null&&image.url!=null&&image.url.length!=0){
var handleStyle=this.textEl.style;
if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}else{
this.textEl.style.backgroundImage="";
if(O$.isIE&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&this.textEl.style.filter!=null){
this.textEl.style.filter="";
}}var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="tab-item-image";
var idx=cssName.indexOf(key);
this.hasImage=image!=null;
if(this.hasImage){
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TabItem,"setText",[string]);
if(this.handle!=null){
O$.clearChildren(this.handle);
this.textEl=d$.createElement("SPAN");
this.handle.appendChild(this.textEl);
this.textEl.appendChild(d$.createTextNode(string));
}this.text=string;
},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
c$=$_C(function(){
this.items=null;
this.borderFrame=null;
this.borderNW=null;
this.borderNE=null;
this.borderSW=null;
this.borderSE=null;
this.itemMore=null;
this.btnPrevTab=null;
this.btnNextTab=null;
this.contentArea=null;
this.offset=0;
this.imageList=null;
$_Z(this,arguments);
},$wt.widgets,"TabFolder",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabFolder,[parent,$wt.widgets.TabFolder.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
System.out.println(wHint+","+hHint+","+changed);
var size=$_U(this,$wt.widgets.TabFolder,"computeSize",[wHint,hHint,changed]);
System.out.println("super size of tabfolder:"+size);
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<0){
width+=136;
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
System.out.println("in tab folder "+size);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=0;
if(this.items!=null&&this.items.length>0){
lineHeight=O$.getContainerHeight(this.items[this.offset].handle);
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}if(O$.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}x-=4;
y-=4+lineHeight;
}width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"~O,~S");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="tab-item-default";
this.borderFrame.insertBefore(tab,this.itemMore);
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var key="tab-folder-no-tab";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}item.textEl=d$.createElement("SPAN");
tab.appendChild(item.textEl);
item.textEl.appendChild(d$.createTextNode(item.getNameText()));
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
}},"$wt.widgets.TabItem,~N");
$_V(c$,"createHandle",
function(){
this.items=new Array(0);
var cssName="tab-folder-default";
if((this.style&2048)!=0){
cssName+=" tab-folder-border-default";
}this.handle=this.createCSSElement(this.parent.containerHandle(),cssName);
cssName="tab-folder-no-tab";
if((this.style&1024)!=0){
cssName+=" tab-folder-bottom";
}this.borderFrame=this.createCSSElement(this.handle,cssName);
cssName="tab-folder-border ";
this.itemMore=this.createCSSElement(this.borderFrame,"tab-item-more");
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
el.appendChild(this.btnNextTab);
var arrowRight=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if(O$.isMozilla&&!O$.isFirefox){
arrowRight.style.left="-5px";
arrowRight.style.top="0";
}el.onclick=this.btnNextTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabFolder$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset+1>=this.b$["$wt.widgets.TabFolder"].items.length)return;
var w=0;
var ww=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[this.b$["$wt.widgets.TabFolder"].offset].handle);
var width=this.b$["$wt.widgets.TabFolder"].getSize().x-36;
for(var i=this.b$["$wt.widgets.TabFolder"].offset+1;i<this.b$["$wt.widgets.TabFolder"].items.length;i++){
var x=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[i].handle);
w+=x;
ww+=x;
if(w>width){
if(i<this.b$["$wt.widgets.TabFolder"].items.length-1){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}}}
if(ww>width){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$1,i$,v$);
})(this,null));
el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
el.appendChild(this.btnPrevTab);
var arrowLeft=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if(O$.isMozilla&&!O$.isFirefox){
arrowLeft.style.left="-6px";
arrowLeft.style.top="0";
}el.onclick=this.btnPrevTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabFolder$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("in Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
if(this.b$["$wt.widgets.TabFolder"].offset<=0)return;
this.b$["$wt.widgets.TabFolder"].offset--;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$2,i$,v$);
})(this,null));
this.borderNW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-nw");
this.borderNE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-ne");
this.borderSW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-sw");
this.borderSE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-se");
this.contentArea=this.createCSSElement(this.handle,"tab-folder-content-area");
this.state&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.TabFolder,"createWidget",[]);
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TabItem");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.TabFolder,"setBounds",[x,y,width,height]);
},"~N,~N,~N,~N");
$_M(c$,"setSize",
function(width,height){
$_U(this,$wt.widgets.TabFolder,"setSize",[width,height]);
},"~N,~N");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var selectionIndex=this.getSelectionIndex();
if(selectionIndex!=-1){
var ctrl=this.items[selectionIndex].control;
if(ctrl!=null)ctrl.setBounds(this.getClientArea());
this.setSelection(selectionIndex,false);
}return $_U(this,$wt.widgets.TabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_V(c$,"getClientArea",
function(){
this.forceResize();
var x=4;
var y=4;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=O$.getContainerHeight(this.items[this.offset].handle);
if(O$.isIE)lineHeight++;
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}h-=lineHeight;
if((this.style&1024)==0){
y+=lineHeight;
}else{
if(O$.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border;
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return new Array(0);
return[this.items[index]];
});
$_M(c$,"getSelectionIndex",
function(){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
System.out.println("The selection is not happend yet!");
return-1;
});
$_M(c$,"indexOf",
function(item){
var count=this.getItemCount();
for(var i=0;i<count;i++){
if(this.items[i]==item)return i;
}
return-1;
},"$wt.widgets.TabItem");
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control==child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.borderNW!=null){
O$.destroyHandle(this.borderNW);
this.borderNW=null;
}if(this.borderNE!=null){
O$.destroyHandle(this.borderNE);
this.borderNE=null;
}if(this.borderSW!=null){
O$.destroyHandle(this.borderSW);
this.borderSW=null;
}if(this.borderSE!=null){
O$.destroyHandle(this.borderSE);
this.borderSE=null;
}if(this.btnPrevTab!=null){
O$.destroyHandle(this.btnPrevTab.parentNode);
O$.destroyHandle(this.btnPrevTab);
this.btnPrevTab=null;
}if(this.btnNextTab!=null){
O$.destroyHandle(this.btnNextTab.parentNode);
O$.destroyHandle(this.btnNextTab);
this.btnNextTab=null;
}if(this.itemMore!=null){
O$.destroyHandle(this.itemMore);
this.itemMore=null;
}if(this.borderFrame!=null){
O$.destroyHandle(this.borderFrame);
this.borderFrame=null;
}if(this.contentArea!=null){
O$.destroyHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.widgets.TabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
this.items=null;
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.TabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.TabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control==control)item.setControl(null);
}
},"$wt.widgets.Control");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setSelection",
function(items){
if(items.length==0){
this.setSelection(-1,false);
}else{
for(var i=items.length-1;i>=0;--i){
var index=this.indexOf(items[i]);
if(index!=-1)this.setSelection(index,false);
}
}},"~A");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
System.out.println("set selection is called!");
var oldIndex=this.getSelectionIndex();
if(oldIndex!=-1&&oldIndex!=index){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.updateSelection(index);
var newIndex=index;
if(oldIndex==index){
newIndex=-1;
}if(newIndex!=-1){
var item=this.items[newIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}},"~N,~B");
$_M(c$,"updateSelection",
function(index){
var key="tab-item-selected";
for(var i=0;i<this.offset;i++){
this.items[i].handle.style.display="none";
if(index>=this.offset){
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}}
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
this.items[i].handle.style.display="block";
this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
if(i>index){
}}var w=O$.getContainerWidth(this.items[i].handle);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}s.left=x+"px";
x+=w;
}
var ww=Integer.parseInt(this.handle.style.width);
if(ww>0){
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var xkey="tab-show-more-item";
var idx=cssName.indexOf(xkey);
if(x>ww||this.offset!=0){
if(idx==-1){
this.borderFrame.className+=" "+xkey;
}}else{
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+xkey.length);
}}}var cssName=this.items[index].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.items[index].handle.className+=" "+key;
}this.items[index].handle.style.zIndex=(this.items.length+1)+"";
if(this.width!=0){
var w=O$.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-((this.style&2048)!=0?4:0));
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}if((this.style&1024)!=0){
this.borderSW.style.width=(left-2)+"px";
this.borderSE.style.width=y+"px";
}else{
this.borderNW.style.width=(left-2)+"px";
this.borderNE.style.width=y+"px";
}}}},"~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.widgets,"List",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.List,[parent,$wt.widgets.List.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(string){
if(this.handle!=null){
this.handle.options[this.handle.options.length]=new Option(string,string);
}},"~S");
$_M(c$,"add",
function(string,index){
if(this.handle!=null){
this.handle.options[index]=new Option(string,string);
}},"~S,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2+3;
height+=border*2;
if((this.style&512)!=0){
}if((this.style&256)!=0){
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("SELECT");
this.handle.size=2;
this.handle.className="list-default";
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.List$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"List$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.item=this.b$["$wt.widgets.List"];
e.widget=this.b$["$wt.widgets.List"];
this.b$["$wt.widgets.List"].sendEvent(e);
});
c$=$_P();
}
return $_N($wt.widgets.List$1,i$,v$);
})(this,null));
});
$_M(c$,"deselect",
function(indices){
if(indices.length==0)return;
},"~A");
$_M(c$,"deselect",
function(index){
if(index==-1)return;
if((this.style&4)!=0){
return;
}},"~N");
$_M(c$,"deselect",
function(start,end){
if(start>end)return;
if((this.style&4)!=0){
return;
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
if((this.style&4)!=0){
}else{
}});
$_M(c$,"getFocusIndex",
function(){
return-1;
});
$_M(c$,"getItem",
function(index){
return"";
},"~N");
$_M(c$,"getItemCount",
function(){
return 0;
});
$_M(c$,"getItemHeight",
function(){
return 12;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_M(c$,"getSelection",
function(){
var indices=this.getSelectionIndices();
var result=new Array(indices.length);
for(var i=0;i<indices.length;i++){
result[i]=this.getItem(indices[i]);
}
return result;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getSelectionIndex",
function(){
return 0;
});
$_M(c$,"getSelectionIndices",
function(){
return[this.handle.selectedIndex];
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}var index=start-1;
var last;
return index;
},"~S,~N");
$_M(c$,"isSelected",
function(index){
return false;
},"~N");
$_M(c$,"remove",
function(indices){
if(indices.length==0)return;
var newIndices=$_A(indices.length,0);
System.arraycopy(indices,0,newIndices,0,indices.length);
this.sort(newIndices);
var start=newIndices[newIndices.length-1];
var end=newIndices[0];
},"~A");
$_M(c$,"remove",
function(index){
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(indices){
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices,false);
},"~A");
$_M(c$,"select",
function(indices,scroll){
var i=0;
while(i<indices.length){
var index=indices[i];
if(index!=-1){
this.select(index,false);
}i++;
}
if(scroll)this.showSelection();
},"~A,~B");
$_M(c$,"select",
function(index){
this.select(index,false);
},"~N");
$_M(c$,"select",
function(index,scroll){
if(index<0)return;
},"~N,~B");
$_M(c$,"select",
function(start,end){
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,false);
}else{
this.select(start,end,false);
}},"~N,~N");
$_M(c$,"select",
function(start,end,scroll){
if(start==end){
this.select(start,scroll);
return;
}if(scroll)this.showSelection();
},"~N,~N,~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
},"~N,~N,~N,~N,~N");
$_M(c$,"setFocusIndex",
function(index){
},"~N");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.List,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setItem",
function(index,string){
var topIndex=this.getTopIndex();
var isSelected=this.isSelected(index);
this.remove(index);
this.add(string,index);
if(isSelected)this.select(index,false);
this.setTopIndex(topIndex);
},"~N,~S");
$_M(c$,"setItems",
function(items){
for(var j=this.handle.childNodes.length-1;j>=0;j++){
this.handle.removeChild(this.handle.childNodes[j]);
}
for(var i=0;i<items.length;i++){
var it=d$.createElement("OPTION");
it.appendChild(d$.createTextNode(items[i]));
it.value=items[i];
this.handle.appendChild(it);
}
},"~A");
$_M(c$,"setSelection",
function(indices){
this.deselectAll();
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices,true);
if((this.style&2)!=0){
var focusIndex=indices[0];
}},"~A");
$_M(c$,"setSelection",
function(items){
this.deselectAll();
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1))return;
var focusIndex=-1;
for(var i=length-1;i>=0;--i){
var string=items[i];
var index=0;
if(string!=null){
var localFocus=-1;
while((index=this.indexOf(string,index))!=-1){
if(localFocus==-1)localFocus=index;
this.select(index,false);
if((this.style&4)!=0&&this.isSelected(index)){
this.showSelection();
return;
}index++;
}
if(localFocus!=-1)focusIndex=localFocus;
}}
if((this.style&2)!=0){
}},"~A");
$_M(c$,"setSelection",
function(index){
this.deselectAll();
this.select(index,true);
if((this.style&2)!=0){
}},"~N");
$_M(c$,"setSelection",
function(start,end){
this.deselectAll();
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,true);
}else{
this.select(start,end,true);
}},"~N,~N");
$_M(c$,"setTopIndex",
function(index){
},"~N");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"windowClass",
function(){
return"SELECT";
});
c$=$_C(function(){
this.noSelection=true;
this.ignoreModify=false;
this.ignoreCharacter=false;
this.visibleCount=5;
this.dropDownButton=null;
this.textInput=null;
this.selectInput=null;
this.selectShown=false;
this.isSimple=false;
$_Z(this,arguments);
},$wt.widgets,"Combo",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Combo,[parent,$wt.widgets.Combo.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(string){
if(this.selectInput!=null){
this.selectInput.options[this.selectInput.options.length]=new Option(string,string);
}},"~S");
$_M(c$,"add",
function(string,index){
var count=this.selectInput.options.length;
if(this.selectInput!=null){
this.selectInput.options[index]=new Option(string,string);
}},"~S,~N");
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
$_V(c$,"checkSubclass",
function(){
});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style&=-2049;
style&=-769;
style=$wt.widgets.Widget.checkBits(style,4,64,0,0,0,0);
if((style&64)!=0)return style&-9;
return style;
},"~N");
$_M(c$,"clearSelection",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(wHint==-1){
if(this.selectInput!=null){
var options=this.selectInput.options;
for(var i=0;i<options.length;i++){
width=Math.max(width,O$.getStringPlainWidth(options[i].value));
}
}else{
width=64;
}width+=O$.getContainerWidth(this.dropDownButton);
}if(hHint==-1){
if((this.style&64)!=0){
height=this.computeSelectHeight();
}height+=this.getTextHeight();
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
System.out.println("Combo : "+width+" "+height+" hints "+wHint+" "+hHint);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeSelectHeight",
($fz=function(){
return this.getItemHeight()*this.visibleCount;
},$fz.isPrivate=true,$fz));
$_M(c$,"copy",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Combo,"createHandle",[]);
this.state&=-3;
this.isSimple=(this.style&64)!=0;
this.handle.className+=" combo-default";
this.textInput=d$.createElement("INPUT");
this.textInput.type="text";
this.textInput.className="combo-input-box";
this.textInput.readOnly=(this.style&8)!=0;
this.textInput.size=32767;
this.handle.appendChild(this.textInput);
this.dropDownButton=d$.createElement("BUTTON");
this.dropDownButton.className="combo-button";
this.handle.appendChild(this.dropDownButton);
var height=O$.getContainerHeight(this.dropDownButton);
this.selectInput=d$.createElement("SELECT");
if(this.isSimple){
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
System.out.println("is Simple "+this.isSimple);
this.selectInput.className="combo-select-box-visible";
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
}else{
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
System.out.println("is Simple "+this.isSimple);
this.selectInput.className="combo-select-box-invisible";
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
}this.dropDownButton.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("button clicked!");
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].show();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$1,i$,v$);
})(this,null));
this.selectInput.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("select changed!"+this.b$["$wt.widgets.Combo"].selectInput.selectedIndex);
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$2,i$,v$);
})(this,null));
this.selectInput.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("handle blurred!");
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$3,i$,v$);
})(this,null));
});
$_M(c$,"hide",
function(){
this.selectShown=false;
this.selectInput.className="combo-select-box-invisible";
});
$_M(c$,"show",
function(){
this.selectShown=true;
this.selectInput.style.zIndex="120";
this.selectInput.className="combo-select-box-visible";
System.out.println("Z "+this.selectInput.style.zIndex);
this.selectInput.focus();
});
$_M(c$,"updateSelection",
function(){
this.textInput.value=this.selectInput.options[this.getSelectionIndex()].value;
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"deregister",
function(){
$_U(this,$wt.widgets.Combo,"deregister",[]);
});
$_M(c$,"deselect",
function(index){
this.selectInput.selectedIndex=-1;
this.sendEvent(24);
},"~N");
$_M(c$,"deselectAll",
function(){
this.selectInput.selectedIndex=-1;
this.sendEvent(24);
});
$_M(c$,"getItem",
function(index){
var options=this.selectInput.options;
return this.selectInput.options[index].value;
},"~N");
$_M(c$,"getItemCount",
function(){
return this.selectInput.options.length;
});
$_M(c$,"getItemHeight",
function(){
return O$.getStringPlainHeight("A")+1;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getSelectionIndex",
function(){
if(this.noSelection)return-1;
System.out.println("combo selected Index "+this.selectInput.selectedIndex);
return this.selectInput.selectedIndex;
});
$_M(c$,"getText",
function(){
return this.textInput.value;
});
$_M(c$,"getTextHeight",
function(){
return O$.getStringPlainHeight("A")+6;
});
$_M(c$,"getTextLimit",
function(){
return this.textInput.size;
});
$_M(c$,"getVisibleItemCount",
function(){
return this.visibleCount;
});
$_V(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}return-1;
},"~S,~N");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"register",
function(){
$_U(this,$wt.widgets.Combo,"register",[]);
});
$_M(c$,"remove",
function(index){
var oldOptions=this.selectInput.options;
var newOptions=new Array(oldOptions.length-1);
System.arraycopy(oldOptions,0,newOptions,0,index);
System.arraycopy(oldOptions,index+1,newOptions,index,oldOptions.length-index-1);
this.selectInput.options=newOptions;
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var oldOptions=this.selectInput.options;
var newOptions=new Array(oldOptions.length-(end-start+1));
System.arraycopy(oldOptions,0,newOptions,0,start);
System.arraycopy(oldOptions,end+1,newOptions,start,oldOptions.length-end-1);
this.selectInput.options=newOptions;
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
this.selectInput.options=new Array(0);
this.sendEvent(24);
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
$_M(c$,"select",
function(index){
if(index>=0&&index<this.selectInput.options.length){
this.selectInput.selectedIndex=index;
}},"~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var buttonHeight=this.getTextHeight();
var buttonWidth=O$.getContainerWidth(this.dropDownButton);
if(!this.isSimple){
this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(this.handle,null,x,y,width,height,flags);
this.textInput.style.height=this.dropDownButton.style.height=Math.min(height,buttonHeight)+"px";
this.dropDownButton.style.width=buttonWidth+"px";
this.textInput.style.width=Math.max(0,width-buttonWidth)+"px";
}else{
$_U(this,$wt.widgets.Combo,"setBounds",[x,y,width,height,flags]);
this.selectInput.style.height=(Math.max(0,height-buttonHeight))+"px";
this.textInput.style.height=this.dropDownButton.style.height=(buttonHeight)+"px";
this.dropDownButton.style.display="none";
this.textInput.style.width=width+"px";
}this.selectInput.style.width=width+"px";
System.out.println("combo left "+this.left+" "+this.top+" textInput "+this.dropDownButton.style.width+" "+this.dropDownButton.style.height);
},"~N,~N,~N,~N,~N");
$_M(c$,"setItem",
function(index,string){
this.remove(index);
if(this.isDisposed())return;
this.add(string,index);
},"~N,~S");
$_M(c$,"setItems",
function(items){
for(var i=0;i<items.length;i++){
}
for(var i=0;i<items.length;i++){
var string=items[i];
this.add(string);
}
this.sendEvent(24);
},"~A");
$_M(c$,"setOrientation",
function(orientation){
},"~N");
$_M(c$,"setSelection",
function(selection){
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
if((this.style&8)!=0){
var index=this.indexOf(string);
if(index!=-1)this.select(index);
return;
}this.textInput.readOnly=false;
this.textInput.value=string;
this.textInput.readOnly=(this.style&8)!=0;
this.sendEvent(24);
},"~S");
$_M(c$,"setTextLimit",
function(limit){
this.textInput.size=limit;
},"~N");
$_M(c$,"setVisibleItemCount",
function(count){
if(count<0)return;
this.visibleCount=count;
this.selectInput.size=count;
if((this.style&4)!=0){
this.forceResize();
}},"~N");
$_M(c$,"traverseEscape",
function(){
if((this.style&4)!=0){
}return $_U(this,$wt.widgets.Combo,"traverseEscape",[]);
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
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
return"DIV";
});
$_M(c$,"releaseHandle",
function(){
if(this.selectInput!=null){
O$.destroyHandle(this.selectInput);
this.selectInput=null;
}if(this.dropDownButton!=null){
O$.destroyHandle(this.dropDownButton);
this.dropDownButton=null;
}if(this.textInput!=null){
O$.destroyHandle(this.textInput);
this.textInput=null;
}$_U(this,$wt.widgets.Combo,"releaseHandle",[]);
});
$_S(c$,
"LIMIT",0x7FFF);
c$=$_C(function(){
this.dragging=false;
this.lastX=0;
this.lastY=0;
$_Z(this,arguments);
},$wt.widgets,"Sash",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Sash,[parent,$wt.widgets.Sash.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=64;
height+=3;
}else{
width+=3;
height+=64;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
if((this.style&256)!=0){
this.handle.className="sash-vertical-default";
}else{
this.handle.className="sash-horizontal-default";
}if((this.style&2048)!=0){
this.handle.className+=" sash-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Sash$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Sash$1",$wt.internal.dnd.SashDND);
$_M(c$,"dragEnded",
function(e){
$_U(this,$wt.widgets.Sash$1,"dragEnded",[e]);
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Sash"].lastX;
event.y=this.b$["$wt.widgets.Sash"].lastY;
var size=this.b$["$wt.widgets.Sash"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Sash"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Sash"];
event.item=this.b$["$wt.widgets.Sash"];
System.out.println("drop");
this.b$["$wt.widgets.Sash"].sendEvent(13,event);
if(event.doit){
if((this.b$["$wt.widgets.Sash"].style&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].handle.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].handle.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragging",
function(e){
$_U(this,$wt.widgets.Sash$1,"dragging",[e]);
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Sash"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Sash"].handle.style.left);
event.y=p.y;
}var size=this.b$["$wt.widgets.Sash"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Sash"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Sash"];
event.item=this.b$["$wt.widgets.Sash"];
if((this.b$["$wt.widgets.Sash"].style&65536)==0){
event.detail=1;
}this.b$["$wt.widgets.Sash"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Sash"].lastX=event.x;
this.b$["$wt.widgets.Sash"].lastY=event.y;
}if((this.b$["$wt.widgets.Sash"].style&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].handle.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].handle.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Sash$1,i$,v$);
})(this,null));
dnd.bind(this.handle);
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"windowClass",
function(){
return"DIV";
});
$_S(c$,
"INCREMENT",1,
"PAGE_INCREMENT",9);
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.thumb=null;
this.isHorizontal=false;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"SashDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
this.thumb=d$.createElement("DIV");
var cssName=e.sourceElement.className;
this.thumb.className=cssName;
if(cssName!=null&&cssName.indexOf("sash-mouse-down")==-1){
this.thumb.className+=" sash-mouse-down";
}if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.thumb.style.left=e.sourceElement.style.left;
this.thumb.style.top=e.sourceElement.style.top;
this.thumb.style.width=e.sourceElement.style.width;
this.thumb.style.height=e.sourceElement.style.height;
this.thumb.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
if(e.sourceElement.nextSibling!=null){
e.sourceElement.parentNode.insertBefore(this.thumb,e.sourceElement.nextSibling);
}else{
e.sourceElement.parentNode.appendChild(this.thumb);
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
e.startX=e.currentX;
e.startY=e.currentY;
var frames=d$.getElementsByTagName("IFRAME");
if(frames.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
function(){
this.thumb.style.display="none";
d$.body.style.cursor="auto";
this.thumb.parentNode.removeChild(this.thumb);
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}});
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=Integer.parseInt(e.sourceElement.parentNode.style.height);
var gWidth=Integer.parseInt(e.sourceElement.parentNode.style.width);
var dWidth=Integer.parseInt(e.sourceElement.style.width);
var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(xx<0){
xx=0;
}else if(xx>gWidth-dWidth-2){
xx=gWidth-dWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight-dHeight-2){
yy=gHeight-dHeight-2;
}return new $wt.graphics.Point(xx,yy);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.isHorizontal){
d$.body.style.cursor="e-resize";
this.thumb.style.cursor="e-resize";
}else{
d$.body.style.cursor="s-resize";
this.thumb.style.cursor="s-resize";
}if(this.isHorizontal){
this.thumb.style.left=this.currentLocation(e).x+"px";
}else{
this.thumb.style.top=this.currentLocation(e).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_C(function(){
this.style=0;
this.parent=null;
this.title=null;
$_Z(this,arguments);
},$wt.widgets,"Dialog");
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.checkParent(parent);
this.parent=parent;
this.style=style;
this.title="";
},"$wt.widgets.Shell,~N");
$_M(c$,"checkSubclass",
function(){
if(!$wt.widgets.Display.isValidClass(this.getClass())){
this.error(43);
}});
$_M(c$,"checkParent",
function(parent){
if(parent==null)this.error(4);
},"$wt.widgets.Shell");
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"getText",
function(){
return this.title;
});
$_M(c$,"setText",
function(string){
if(string==null)this.error(4);
this.title=string;
},"~S");
$_M(c$,"dialogUnimplemented",
function(){
var dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|2048);
dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.Dialog$1,i$,v$);
})(this,null));
dialogShell.setText(this.title);
dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var icon=new $wt.widgets.Label(dialogShell,0);
icon.setImage(new $wt.graphics.Image(dialogShell.display,"j2slib/images/warning.png"));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
var label=new $wt.widgets.Label(dialogShell,0);
label.setText("Not implemented yet.");
var buttonPanel=new $wt.widgets.Composite(dialogShell,0);
var gd=new $wt.layout.GridData(3,2,false,false);
gd.horizontalSpan=2;
buttonPanel.setLayoutData(gd);
buttonPanel.setLayout(new $wt.layout.GridLayout());
var btn=new $wt.widgets.Button(buttonPanel,8);
btn.setText("&OK");
btn.setLayoutData(new $wt.layout.GridData(75,24));
btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Dialog$2,i$,v$);
})(this,$_F("dialogShell",dialogShell)));
dialogShell.pack();
dialogShell.open();
var size=dialogShell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}dialogShell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(dialogShell,16777216);
});
c$=$_C(function(){
this.message="";
this.buttonPanel=null;
this.dialogShell=null;
this.btn=null;
this.returnCode=0;
$_Z(this,arguments);
},$wt.widgets,"MessageBox",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,65570);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.MessageBox,[parent,$wt.widgets.MessageBox.checkStyle(style)]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&(229376))==0)style|=65536;
var mask=(4064);
var bits=style&mask;
if(bits==32||bits==256||bits==(288))return style;
if(bits==64||bits==128||bits==(192)||bits==(448))return style;
if(bits==(1280)||bits==(3584))return style;
style=(style&~mask)|32;
return style;
},"~N");
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.returnCode=-1;
this.dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|2048);
this.dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.widgets.MessageBox"].updateReturnCode();
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$1,i$,v$);
})(this,null));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var iconName=null;
if((this.style&1)!=0){
iconName="error";
}else if((this.style&2)!=0){
iconName="information";
}else if((this.style&4)!=0){
iconName="question";
}else if((this.style&8)!=0){
iconName="warning";
}else if((this.style&16)!=0){
iconName="information";
}if(iconName!=null){
var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout());
var gd=new $wt.layout.GridData(48,48);
composite.setLayoutData(gd);
var icon=new $wt.widgets.Label(composite,0);
icon.setImage(new $wt.graphics.Image(this.dialogShell.display,"j2slib/images/"+iconName+".png"));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
}var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout(2,false));
var gd=new $wt.layout.GridData(1812);
if(iconName==null){
gd.horizontalSpan=2;
}gd.grabExcessVerticalSpace=true;
gd.heightHint=48;
var labelGD=new $wt.layout.GridData(4);
var wHint=O$.getStringPlainWidth(this.message);
if(wHint>480){
labelGD.widthHint=480;
var hHint=O$.getStringPlainWrappedHeight(this.message,labelGD.widthHint);
if(hHint>48){
gd.heightHint=hHint;
}}else if(wHint<64){
labelGD.widthHint=64;
}else{
labelGD.widthHint=wHint;
}composite.setLayoutData(gd);
var messageLabel=new $wt.widgets.Label(composite,64);
messageLabel.setText(this.message);
messageLabel.setLayoutData(labelGD);
var gd2=new $wt.layout.GridData();
gd2.grabExcessVerticalSpace=true;
new $wt.widgets.Label(composite,0).setLayoutData(gd2);
this.buttonPanel=new $wt.widgets.Composite(this.dialogShell,0);
var count=0;
count+=this.createButton(64,"&Yes")==null?0:1;
count+=this.createButton(128,"&No")==null?0:1;
count+=this.createButton(1024,"&Retry")==null?0:1;
count+=this.createButton(512,"&Abort")==null?0:1;
count+=this.createButton(2048,"&Ignore")==null?0:1;
count+=this.createButton(32,"&OK")==null?0:1;
count+=this.createButton(256,"&Cancel")==null?0:1;
if(count==0){
this.createButton(32,"&OK",true);
count=1;
}var gridData=new $wt.layout.GridData(2,2,false,false);
gridData.horizontalSpan=2;
this.buttonPanel.setLayoutData(gridData);
this.buttonPanel.setLayout(new $wt.layout.GridLayout(count,true));
this.dialogShell.pack();
this.dialogShell.open();
var size=this.dialogShell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
return 256;
});
$_M(c$,"createButton",
function(btnStyle,btnLabel){
return this.createButton(btnStyle,btnLabel,false);
},"~N,~S");
$_M(c$,"createButton",
function(btnStyle,btnLabel,forced){
if((this.style&btnStyle)!=0||forced){
this.btn=new $wt.widgets.Button(this.buttonPanel,8);
this.btn.setText(btnLabel);
var gridData=new $wt.layout.GridData(75,24);
this.btn.setLayoutData(gridData);
this.btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.MessageBox"].returnCode=this.f$.btnStyle;
this.b$["$wt.widgets.MessageBox"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$2,i$,v$);
})(this,$_F("btnStyle",btnStyle)));
return this.btn;
}else{
return null;
}},"~N,~S,~B");
$_M(c$,"setMessage",
function(string){
if(string==null)this.error(4);
this.message=string;
},"~S");
$_M(c$,"updateReturnCode",
($fz=function(){
if(this.returnCode==-1){
this.returnCode=256;
if((this.style&32)==32)this.returnCode=32;
if((this.style&(288))==(288))this.returnCode=256;
if((this.style&(192))==(192))this.returnCode=128;
if((this.style&(448))==(448))this.returnCode=256;
if((this.style&(1280))==(1280))this.returnCode=256;
if((this.style&(3584))==(3584))this.returnCode=2048;
}},$fz.isPrivate=true,$fz));
Clazz.declarePackage ("net.sf.j2s.ajax");
c$ = Clazz.decorateAsClass (function () {
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter", null, net.sf.j2s.ajax.IXHRCallback);
Clazz.defineMethod (c$, "swtOnComplete", 
function () {
});
Clazz.defineMethod (c$, "swtOnInteractive", 
function () {
});
Clazz.defineMethod (c$, "swtOnLoaded", 
function () {
});
Clazz.defineMethod (c$, "swtOnLoading", 
function () {
});
Clazz.defineMethod (c$, "swtOnUninitialized", 
function () {
});
Clazz.overrideMethod (c$, "onComplete", 
function () {
$wt.widgets.Display.getDefault ().syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("net.sf.j2s.ajax.XHRCallbackSWTAdapter$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ajax.XHRCallbackSWTAdapter"].swtOnComplete ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (net.sf.j2s.ajax.XHRCallbackSWTAdapter$1, i$, v$);
}) (this, null));
});
Clazz.overrideMethod (c$, "onInteractive", 
function () {
$wt.widgets.Display.getDefault ().syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("net.sf.j2s.ajax.XHRCallbackSWTAdapter$2")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ajax.XHRCallbackSWTAdapter"].swtOnInteractive ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (net.sf.j2s.ajax.XHRCallbackSWTAdapter$2, i$, v$);
}) (this, null));
});
Clazz.overrideMethod (c$, "onLoaded", 
function () {
$wt.widgets.Display.getDefault ().syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("net.sf.j2s.ajax.XHRCallbackSWTAdapter$3")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ajax.XHRCallbackSWTAdapter"].swtOnLoaded ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (net.sf.j2s.ajax.XHRCallbackSWTAdapter$3, i$, v$);
}) (this, null));
});
Clazz.overrideMethod (c$, "onLoading", 
function () {
$wt.widgets.Display.getDefault ().syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("net.sf.j2s.ajax.XHRCallbackSWTAdapter$4")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter$4", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ajax.XHRCallbackSWTAdapter"].swtOnLoading ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (net.sf.j2s.ajax.XHRCallbackSWTAdapter$4, i$, v$);
}) (this, null));
});
Clazz.overrideMethod (c$, "onUninitialized", 
function () {
$wt.widgets.Display.getDefault ().syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("net.sf.j2s.ajax.XHRCallbackSWTAdapter$5")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackSWTAdapter$5", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ajax.XHRCallbackSWTAdapter"].swtOnUninitialized ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (net.sf.j2s.ajax.XHRCallbackSWTAdapter$5, i$, v$);
}) (this, null));
});
