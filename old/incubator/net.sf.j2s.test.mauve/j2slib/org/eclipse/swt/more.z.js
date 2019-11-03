/* http://j2s.sf.net/ */$_L(null,"$wt.internal.ResizeHandler",["$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.monitor=null;
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(monitor){
this.monitor=monitor;
},"$wt.widgets.Monitor");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
var tb=null;
{
tb=this.shell.titleBar;
}var h=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
this.shell.setLocation(-1,this.shell.getMonitor().getClientArea().height-h-6);
});
$_M(c$,"updateMaximized",
function(){
var monitor=this.shell.getMonitor();
var area=monitor.getClientArea();
var height=area.height;
var width=area.width;
var isBodyMonitor=false;
{
isBodyMonitor=monitor.handle==document.body;
}if(isBodyMonitor){
width=d$.body.parentNode.clientWidth;
height=O$.getFixedBodyClientHeight();
}var tb=null;
{
tb=this.shell.titleBar;
}var titleHeight=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
this.shell.setBounds(this.shell.computeTrim(0,-titleHeight,width,height));
});
$_M(c$,"updateCentered",
function(){
var tb=null;
{
tb=this.shell.titleBar;
}var h=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):20;
var monitor=this.shell.getMonitor();
var size=this.shell.getSize();
var y=Math.floor((monitor.getClientArea().height-size.y)/2)-h;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((monitor.getClientArea().width-size.x)/2),y);
});
$_M(c$,"updateMonitor",
function(){
this.monitor.clientWidth=document.body.parentNode.clientWidth;
this.monitor.clientHeight=O$.getFixedBodyClientHeight();
});
$_M(c$,"getStatus",
function(){
return this.status;
});
});
$_L(null,"$wt.internal.ResizeSystem",["$wt.internal.ResizeHandler","$wt.widgets.Display"],function(){
c$=$_T($wt.internal,"ResizeSystem");
c$.register=$_M(c$,"register",
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell===shell&&$wt.internal.ResizeSystem.handlers[i].status==status){
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
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell===shell&&$wt.internal.ResizeSystem.handlers[i].status==status){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Decorations,~N");
c$.register=$_M(c$,"register",
function(monitor){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].monitor===monitor){
return;
}}
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]==null){
$wt.internal.ResizeSystem.handlers[i]=new $wt.internal.ResizeHandler(monitor);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(monitor);
return;
},"$wt.widgets.Monitor");
c$.unregister=$_M(c$,"unregister",
function(monitor){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].monitor===monitor){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Monitor");
c$.reset=$_M(c$,"reset",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null){
$wt.internal.ResizeSystem.handlers[i].shell=null;
$wt.internal.ResizeSystem.handlers[i].monitor=null;
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
($t$=$wt.internal.ResizeSystem.handlers=new Array(0),$wt.internal.ResizeSystem.prototype.handlers=$wt.internal.ResizeSystem.handlers,$t$);
});
c$.updateResize=$_M(c$,"updateResize",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
var hdl=$wt.internal.ResizeSystem.handlers[i];
if(hdl!=null&&hdl.shell!=null&&hdl.shell.handle!=null){
hdl.shell._updateMonitorSize();
var status=hdl.getStatus();
if(status==1024){
hdl.updateMaximized();
}else if(status==128){
hdl.updateMinimized();
}else if(status==16777216){
hdl.updateCentered();
}}else if(hdl!=null&&hdl.monitor!=null){
hdl.updateMonitor();
}}
$wt.widgets.Display.updateMonitor();
});
c$.handlers=c$.prototype.handlers=new Array(0);

var $browserResizingHandle=null;
$browserLayoutResize=function(){
if($browserResizingHandle!=null){
window.clearTimeout($browserResizingHandle);
}
$browserResizingHandle=window.setTimeout(function(){
org.eclipse.swt.internal.ResizeSystem.updateResize();
},50);
};
if(document.addEventListener){
window.addEventListener('resize',$browserLayoutResize,true);
}else if(document.attachEvent){
document.attachEvent('onresize',$browserLayoutResize);
}
});
$_L(null,"$wt.internal.dnd.DragAndDrop",["$wt.internal.dnd.DNDUtils"],function(){
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
if(this.listeners[i]===listener){
return;
}}
this.listeners[this.listeners.length]=listener;
},"$wt.internal.dnd.DragListener");
$_M(c$,"removeDragListener",
function(listener){
for(var i=0;i<this.listeners.length;i++){
if(this.listeners[i]===listener){
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
});
$_L(null,"$wt.internal.dnd.DNDUtils",["$wt.internal.dnd.DragEvent","$.HTMLEventWrapper"],function(){
c$=$_T($wt.internal.dnd,"DNDUtils");
c$.bindFunctionWith=$_M(c$,"bindFunctionWith",
function(aFun,obj){
var xFun=null;
eval("xFun = "+aFun+";");
return(function(yFun,o){
return function(e){
return yFun(e,o);
}
})(xFun,obj);
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
dndEvt.startX=oThis.startX;
dndEvt.startY=oThis.startY;
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
oThis.startX=evt.x;
oThis.startY=evt.y;
d$.onmousemove=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousemove,oThis);
d$.onkeyup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onkeyup,oThis);
d$.onmouseup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmouseup,oThis);
var isOpera=false;
{
var dua=navigator.userAgent;
isOpera=dua.indexOf("Opera")>=0;
}if(isOpera){
evt.preventDefault();
evt.stopPropagation();
return false;
}return true;
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
});
$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.ShellFrameDND",["$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.sourceWidth=0;
this.sourceHeight=0;
this.resize=null;
this.frame=null;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"ShellFrameDND",null,$wt.internal.dnd.DragListener);
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
this.frame.className="shell-handle shell-opacity";
this.frame.style.backgroundColor="menu";
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
titleBar.className="shell-title-bar";
titleBar.style.margin="4px 0";
titleBar.style.width="100%";
this.frame.appendChild(titleBar);
}firstTime=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}var style=e.sourceElement.style;
this.sourceX=style.left.length>0?Integer.parseInt(style.left):0;
this.sourceY=style.top.length>0?Integer.parseInt(style.top):0;
this.sourceWidth=style.width.length>0?Integer.parseInt(style.width):0;
this.sourceHeight=style.height.length>0?Integer.parseInt(style.height):0;
e.startX=e.currentX;
e.startY=e.currentY;
if(firstTime){
this.initFrameBounds(this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight);
}this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
var frames=d$.getElementsByTagName("IFRAME");
var needOverIFrameLayer=false;
for(var i=0;i<frames.length;i++){
if(frames[i].style.display!=="none"){
needOverIFrameLayer=true;
break;
}}
if(needOverIFrameLayer){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
var gHeight=O$.getFixedBodyClientHeight();
var gWidth=d$.body.clientWidth;
var noScroll=(d$.body.style.overflow==="hidden");
{
noScroll=noScroll||document.body.style.overflowX=="hidden";
}if(noScroll){
gWidth=d$.body.parentNode.clientWidth;
}var style=e.sourceElement.style;
var dWidth=style.width.length>0?Integer.parseInt(style.width):0;
var dHeight=style.height.length>0?Integer.parseInt(style.height):0;
var dX=style.left.length>0?Integer.parseInt(style.left):0;
var dY=style.top.length>0?Integer.parseInt(style.top):0;
if(this.resize!=null){
var xx=this.sourceX;
var yy=this.sourceY;
var ww=this.sourceWidth;
var hh=this.sourceHeight;
if(this.resize==="left-top"){
xx+=e.deltaX();
yy+=e.deltaY();
ww-=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize==="center-top"){
yy+=e.deltaY();
hh-=e.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize==="right-top"){
yy+=e.deltaY();
ww+=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize==="left-middle"){
xx+=e.deltaX();
ww-=e.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize==="right-middle"){
ww+=e.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize==="left-bottom"){
xx+=e.deltaX();
ww-=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize==="center-bottom"){
hh+=e.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize==="right-bottom"){
ww+=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="se-resize";
}xx=this.adjustX(e,xx,gWidth,dWidth);
yy=this.adjustY(e,yy,gHeight,dHeight);
ww=this.adjustW(e,ww,gWidth,dX);
hh=this.adjustH(e,hh,gHeight,dY);
this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
this.frame.style.width=((ww>16)?ww:16)+"px";
this.frame.style.height=((hh>16)?hh:16)+"px";
return true;
}var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
xx=this.adjustX(e,xx,gWidth,dWidth);
yy=this.adjustY(e,yy,gHeight,dHeight);
this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"adjustY",
($fz=function(e,yy,gHeight,dHeight){
if(yy<0){
yy=0;
}if(!(e.event.event).ctrlKey){
var dTop=Math.abs(yy);
var dBottom=Math.abs(yy-gHeight+dHeight+2);
if(dBottom<10){
if(dBottom<dTop){
yy=gHeight-dHeight-2;
}else{
yy=0;
}}else if(dTop<10){
yy=0;
}}return yy;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N");
$_M(c$,"adjustX",
($fz=function(e,xx,gWidth,dWidth){
if(xx<-dWidth){
xx=-dWidth;
}if(!(e.event.event).ctrlKey){
var dLeft=Math.abs(xx);
var dRight=Math.abs(xx-gWidth+dWidth+2);
if(dRight<10){
if(dRight<dLeft){
xx=gWidth-dWidth-2;
}else{
xx=0;
}}else if(dLeft<10){
xx=0;
}}return xx;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N");
$_M(c$,"adjustH",
($fz=function(e,hh,gHeight,dY){
if(hh<0){
hh=16;
}if(!(e.event.event).ctrlKey){
var dBottom=Math.abs(dY+hh-gHeight+2);
if(dBottom<10){
hh=gHeight-dY-2;
}}return hh;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N");
$_M(c$,"adjustW",
($fz=function(e,ww,gWidth,dX){
if(ww<16){
ww=16;
}if(!(e.event.event).ctrlKey){
var dRight=Math.abs(dX+ww-gWidth+2);
if(dRight<10){
ww=gWidth-dX-2;
}}return ww;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N");
$_V(c$,"dragEnded",
function(e){
var style=this.frame.style;
var x=Integer.parseInt(style.left);
var y=Integer.parseInt(style.top);
var width=Integer.parseInt(style.width);
var height=Integer.parseInt(style.height);
var shell=e.sourceElement;
shell.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
this.updateShellBounds(x,y,width,height);
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
($fz=function(){
if(this.frame!=null){
this.frame.style.display="none";
}d$.body.style.cursor="auto";
this.resize=null;
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"dispose",
function(){
this.clean();
if(this.frame!=null){
this.frame.parentNode.removeChild(this.frame);
this.frame=null;
}});
$_M(c$,"initFrameBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
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
var style=(shell).style;
var height=style.height.length>0?Integer.parseInt(style.height):0;
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
var style=(shell).style;
var width=style.width.length>0?Integer.parseInt(style.width)-6:0;
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
});
$_L(null,"$wt.internal.browser.OS",["$wt.graphics.Point"],function(){
O$=c$=$_T($wt.internal.browser,"OS");
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
if(handle==null||(handle).nodeType!=1){
return;
}var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
el.removeChild(el.childNodes[i]);
}
},"~O");
c$.deepClearChildren=$_M(c$,"deepClearChildren",
function(handle){
if(handle==null){
return;
}var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
var child=el.childNodes[i];
if(child.nodeType==1){
O$.deepClearChildren(child);
O$.destroyHandle(child);
}else{
el.removeChild(child);
}}
},"~O");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(handle,x,y,w,h,flags){
if(handle==null){
return;
}},"~O,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if(O$.invisibleContainer==null){
var el=d$.createElement("DIV");
d$.body.appendChild(el);
var s=el.style;
s.position="absolute";
s.left="-4000px";
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
c$.checkScrollBar=$_M(c$,"checkScrollBar",
($fz=function(){
var el=d$.createElement("DIV");
var s=el.style;
s.position="absolute";
s.left="-4000px";
s.top="-1000px";
s.overflow="scroll";
s.width="324px";
s.height="324px";
d$.body.appendChild(el);
($t$=O$.wScrollBar=el.offsetWidth-el.clientWidth,O$.prototype.wScrollBar=O$.wScrollBar,$t$);
($t$=O$.hScrollBar=el.offsetHeight-el.clientHeight,O$.prototype.hScrollBar=O$.hScrollBar,$t$);
d$.body.removeChild(el);
},$fz.isPrivate=true,$fz));
c$.getScrollBarWidth=$_M(c$,"getScrollBarWidth",
function(){
if(O$.wScrollBar==-1){
O$.checkScrollBar();
}return O$.wScrollBar;
});
c$.getScrollBarHeight=$_M(c$,"getScrollBarHeight",
function(){
if(O$.hScrollBar==-1){
O$.checkScrollBar();
}return O$.hScrollBar;
});
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
if(!((/[\r\n\t&]/).test(text))){
handle.style.display="inline";
handle.appendChild(document.createTextNode(text));
return text;
}
var c160=String.fromCharCode(160);
var c160x8=c160+c160+c160+c160+c160+c160+c160+c160;
var s=text.replace(/\t/g,c160x8);
if(window["Console"]!=null&&Console.splitNeedFixed){
try{
lines=Console.splitIntoLines(s);
}catch(e){
lines=s.split(/\r\n|\r|\n/g);
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
text=""+c;
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
return text;
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
c.style.display="inline";
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
}var childNodes=O$.invisibleContainer.childNodes;
for(var i=0;i<childNodes.length;i++){
var s=childNodes[i].style;
if(childNodes[i]!==f){
if(s.display!=="none"){
O$.oldDisplays[i]=s.display;
s.display="none";
}}else{
if(O$.oldDisplays[i]!=null){
s.display=O$.oldDisplays[i];
}}}
O$.insertText(f,str);
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
c$.calcuateRelativePosition=$_M(c$,"calcuateRelativePosition",
function(el,relativeEl){
var srcEl=el;
var left=0;
var top=0;
while(el!=null&&el!==relativeEl){
left+=el.offsetLeft-el.scrollLeft;
top+=el.offsetTop-el.scrollTop;
if(el!==srcEl){
var style=null;
if(document.defaultView!=null){
style=document.defaultView.getComputedStyle(el,null);
}else if(el.currentStyle!=null){
style=el.currentStyle;
}
if(!O$.isOpera&&style!=null){
var w=0;
var bw=style.borderLeftWidth;
if(bw.length!=0){
w=parseInt(bw);
if(!isNaN(w)){
left+=w;
}
}
bw=style.borderTopWidth;
if(bw.length!=0){
w=parseInt(bw);
if(!isNaN(w)){
top+=w;
}
}
}
}el=el.offsetParent;
}
return new $wt.graphics.Point(left,top);
},"$wt.internal.xhtml.Element,$wt.internal.xhtml.Element");
c$.updateArrowSize=$_M(c$,"updateArrowSize",
function(el,style,cx,cy){
var xx=Math.floor(Math.min(cx,cy)/4);
var s=(el).style;
s.borderWidth=(xx>0?xx:0)+"px";
if((style&16384)!=0){
s.borderLeftWidth="0";
}else if((style&131072)!=0){
s.borderRightWidth="0";
}else if((style&128)!=0){
s.borderTopWidth="0";
}else if((style&1024)!=0){
if(xx>1){
s.borderWidth=(xx-1)+"px";
}s.borderBottomWidth="0";
}else{
s.borderTopWidth="0";
}var x=Math.floor(cy/6);
xx=Math.floor(cy/3);
s.position="relative";
if((style&(147456))!=0){
s.top=(x-2)+"px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
s.top=(xx-3)+"px";
}else if((style&1024)!=0){
s.top=(xx-2)+"px";
}}if(O$.isMozilla&&!O$.isFirefox){
if((style&128)!=0){
s.left="-2px";
}else if((style&1024)!=0){
s.left="-1px";
}}if(O$.isFirefox){
if((style&(147456))!=0){
s.top="-2px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
if(Math.min(cx,cy)<=12){
s.left="-1px";
}else{
s.left="-2px";
}s.top="-1px";
}else if((style&1024)!=0){
s.left="-1px";
s.top="-1px";
}}}else if(O$.isSafari){
if((style&(147456))!=0){
s.top="1px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
s.left="-1px";
s.top="0";
}else if((style&1024)!=0){
s.left="0";
s.top="1px";
}}}},"~O,~N,~N,~N");
c$.existedCSSClass=$_M(c$,"existedCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
return true;
}}
return false;
},"~O,~S");
c$.replaceCSSClassInDepth=$_M(c$,"replaceCSSClassInDepth",
function(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz){
var e=el;
if(toBeRemovedCSSClazz==null||toBeRemovedCSSClazz.length==0||toBeInsertedCSSClazz==null){
return false;
}O$.replaceCSSClass(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz);
var length=e.childNodes.length;
var replaced=false;
for(var i=0;i<length;i++){
replaced=replaced||O$.replaceCSSClassInDepth(e.childNodes[i],toBeRemovedCSSClazz,toBeInsertedCSSClazz);
}
return replaced;
},"~O,~S,~S");
c$.replaceCSSClass=$_M(c$,"replaceCSSClass",
function(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
var existed=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===toBeRemovedCSSClazz){
existed=true;
clazz[i]=toBeInsertedCSSClazz;
break;
}}
if(existed){
e.className=clazz.join(" ");
}return existed;
},"~O,~S,~S");
c$.removeCSSClassInDepth=$_M(c$,"removeCSSClassInDepth",
function(el,cssClazz){
var e=el;
if(cssClazz==null||cssClazz.length==0){
return false;
}O$.removeCSSClass(el,cssClazz);
var length=e.childNodes.length;
var removed=false;
for(var i=0;i<length;i++){
removed=removed||O$.removeCSSClassInDepth(e.childNodes[i],cssClazz);
}
return removed;
},"~O,~S");
c$.removeCSSClass=$_M(c$,"removeCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
var existed=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
existed=true;
for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
}break;
}}
if(existed){
e.className=clazz.join(" ");
}return existed;
},"~O,~S");
c$.addCSSClass=$_M(c$,"addCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
e.className=cssClazz;
return true;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
return false;
}}
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}return true;
},"~O,~S");
c$.toggleCSSClass=$_M(c$,"toggleCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
e.className=cssClazz;
return;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
e.className=clazz.join(" ");
}return;
}}
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}},"~O,~S");
c$.updateCSSClass=$_M(c$,"updateCSSClass",
function(el,cssClazz,kept){
var e=el;
var className=e.className;
if(className==null||className.length==0){
if(kept){
e.className=cssClazz;
}return;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
if(kept){
return;
}for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
e.className=clazz.join(" ");
}return;
}}
if(kept){
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}}},"~O,~S,~B");
c$.getFixedBodyClientWidth=$_M(c$,"getFixedBodyClientWidth",
function(){
var b=d$.body;
var p=b.parentNode;
var bcWidth=b.clientWidth;
var pcWidth=p.clientWidth;
if(O$.isIE){
return(pcWidth==0)?bcWidth:pcWidth;
}else if(O$.isFirefox||O$.isSafari){
return(pcWidth==p.offsetWidth&&pcWidth==p.scrollWidth)?bcWidth:pcWidth;
}return bcWidth;
});
c$.getFixedBodyClientHeight=$_M(c$,"getFixedBodyClientHeight",
function(){
var b=d$.body;
var p=b.parentNode;
var bcHeight=b.clientHeight;
var pcHeight=p.clientHeight;
if(O$.isIE){
return(pcHeight==0)?bcHeight:pcHeight;
}else if(O$.isFirefox||O$.isSafari){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcHeight:pcHeight;
}else if(O$.isOpera){
return pcHeight;
}return bcHeight;
});
c$.getFixedBodyOffsetTop=$_M(c$,"getFixedBodyOffsetTop",
function(){
var b=d$.body;
var p=b.parentNode;
var pcHeight=p.clientHeight;
var bcScrollTop=b.scrollTop+b.offsetTop;
var pcScrollTop=p.scrollTop+p.offsetTop;
if(O$.isIE){
return(pcHeight==0)?bcScrollTop:pcScrollTop;
}else if(O$.isFirefox){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcScrollTop:pcScrollTop;
}return bcScrollTop;
});
c$.getFixedBodyOffsetLeft=$_M(c$,"getFixedBodyOffsetLeft",
function(){
var b=d$.body;
var p=b.parentNode;
var pcHeight=p.clientHeight;
var bcScrollLeft=b.scrollLeft+b.offsetLeft;
var pcScrollLeft=p.scrollLeft+p.offsetLeft;
if(O$.isIE){
return(pcHeight==0)?bcScrollLeft:pcScrollLeft;
}else if(O$.isFirefox){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcScrollLeft:pcScrollLeft;
}return bcScrollLeft;
});
c$.getImageSize=$_M(c$,"getImageSize",
function(image){
var w=16;
var h=16;
if(image.width==0&&image.height==0){
if(image.url!=null&&image.url.length!=0){
var img=new Image();
img.src=image.url;
image.width=img.width;
image.height=img.height;
w=img.width;
h=img.height;
}}else{
w=image.width;
h=image.height;
}return new $wt.graphics.Point(w,h);
},"$wt.graphics.Image");
c$.SetFocus=$_M(c$,"SetFocus",
function(handle){
handle.focus();
},"$wt.internal.xhtml.Element");
c$.getInputCharacter=$_M(c$,"getInputCharacter",
function(keyCode,shiftKey){
var ch='\0';
if(keyCode==10||keyCode==13||keyCode==9||keyCode==32){
ch=String.fromCharCode(keyCode);
}else if(keyCode>=48&&keyCode<58){
if(!shiftKey){
ch=String.fromCharCode(keyCode);
}else{
var chs=[')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
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
if((shiftKey&&O$.isCapsLockOn)||(!shiftKey&&!O$.isCapsLockOn)){
ch=String.fromCharCode((keyCode+('a').charCodeAt (0) - ('A').charCodeAt(0)));
}else{
ch=String.fromCharCode(keyCode);
}}else if(keyCode>=96&&keyCode<=105){
ch=String.fromCharCode((keyCode-96+('0').charCodeAt(0)));
}else if(keyCode>=106&&keyCode<=111&&keyCode!=108){
var chs=['*', '+', '?', '-', '.', '/'];
ch=chs[keyCode-106];
}else if(keyCode>=186&&keyCode<=192){
if(!shiftKey){
var chs=[';', '=', ',', '-', '.', '/', '`'];
ch=chs[keyCode-186];
}else{
var chs=[':', '+', '<', '_', '>', '?', '~'];
ch=chs[keyCode-186];
}}else if(keyCode>=219&&keyCode<=222){
if(!shiftKey){
var chs=['[', '\\', ']', '\''];
ch=chs[keyCode-219];
}else{
var chs=['{', '|', '}', '\"'];
ch=chs[keyCode-219];
}}else{
ch=String.fromCharCode(keyCode);
}return ch;
},"~N,~B");
c$.isInputCharacter=$_M(c$,"isInputCharacter",
function(keyCode,shiftKey,altKey,ctrlKey){
if(altKey||ctrlKey){
return false;
}if(keyCode==10||keyCode==13||keyCode==9||keyCode==32||keyCode==8||keyCode==46||(keyCode>=48&&keyCode<=57)||keyCode==59||keyCode==61||(keyCode>=65&&keyCode<=90)||(keyCode>=96&&keyCode<=111&&keyCode!=108)||(keyCode>=186&&keyCode<=192)||(keyCode>=218&&keyCode<=222)){
return true;
}return false;
},"~N,~B,~B,~B");
$_S(c$,
"isIE",false,
"isIE80",false,
"isIE70",false,
"isIE60",false,
"isIE55",false,
"isIE50",false,
"isIENeedPNGFix",false,
"isMozilla",false,
"isFirefox",false,
"isSafari",false,
"isOpera",false,
"isChrome",false,
"isCapsLockOn",false);
{
var os=$wt.internal.browser.OS;
var dua=navigator.userAgent;
var dav=navigator.appVersion;
os.isOpera=dua.indexOf("Opera")>=0;
var isKHTML=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
os.isSafari=dav.indexOf("Safari")>=0;
os.isChrome=dav.indexOf("Chrome")>=0;
var geckoPos=dua.indexOf("Gecko");
os.isMozilla=(geckoPos>=0)&&(!isKHTML);
os.isFirefox=os.isMozilla&&dua.indexOf("Firefox")!=-1;
os.isIE=(document.all!=null)&&(!os.isOpera);
os.isIE50=os.isIE&&dav.indexOf("MSIE 5.0")>=0;
os.isIE55=os.isIE&&dav.indexOf("MSIE 5.5")>=0;
os.isIE60=os.isIE&&dav.indexOf("MSIE 6.0")>=0;
os.isIE70=os.isIE&&dav.indexOf("MSIE 7.0")>=0;
os.isIE80=os.isIE&&dav.indexOf("MSIE 8.0")>=0;
os.isIENeedPNGFix=os.isIE50||os.isIE55||os.isIE60;
}$_S(c$,
"invisibleContainer",null,
"containers",null,
"lineContainer",null,
"blockContainer",null,
"wScrollBar",-1,
"hScrollBar",-1);
c$.oldDisplays=c$.prototype.oldDisplays=new Array(0);
});
$_L(null,"$wt.internal.browser.Popup",["$wt.graphics.Rectangle"],function(){
c$=$_T($wt.internal.browser,"Popup");
c$.popupList=$_M(c$,"popupList",
function(bounds,rect,height){
if(height<=0){
return null;
}var x;
var y;
var w;
var h=height;
if(bounds==null){
if(rect==null){
x=y=0;
w=100;
}else{
x=rect.x;
y=rect.y+height;
w=rect.width;
}}else{
if(rect==null){
x=bounds.x+Math.floor(bounds.width/4);
y=bounds.y+Math.floor((bounds.height-height)/2);
w=Math.floor(bounds.width/2);
}else{
x=rect.x;
w=rect.width;
if(rect.y+rect.height+height>bounds.y+bounds.height){
if(rect.y-height>=bounds.y){
y=rect.y-height;
}else{
if(bounds.height<height){
y=bounds.y;
h=bounds.height;
}else{
if(Math.abs(bounds.y+bounds.height-height-rect.y)>Math.abs(bounds.y+height-rect.y-rect.height)){
y=bounds.y;
}else{
y=bounds.y+bounds.height-height;
}}}}else{
y=rect.y+rect.height;
}}}return new $wt.graphics.Rectangle(x,y,w,h);
},"$wt.graphics.Rectangle,$wt.graphics.Rectangle,~N");
c$.popupMenu=$_M(c$,"popupMenu",
function(bounds,rect,width,height,preferredDirection){
if(height<=0||width<=0){
return null;
}var x;
var y;
var w=width;
var h=height;
if(bounds==null){
if(rect==null){
x=y=0;
}else{
x=rect.x;
y=rect.y+height;
}}else{
if(rect==null){
x=bounds.x+Math.floor(bounds.width/4);
y=bounds.y+Math.floor((bounds.height-height)/2);
}else{
if(rect.y+rect.height+height>bounds.y+bounds.height){
if(rect.y-height>=bounds.y){
y=rect.y-height;
}else{
if(bounds.height<height){
y=bounds.y;
h=bounds.height;
}else{
if(Math.abs(bounds.y+bounds.height-height-rect.y)>Math.abs(bounds.y+height-rect.y-rect.height)){
y=bounds.y;
}else{
y=bounds.y+bounds.height-height;
}}}}else{
y=rect.y+rect.height;
}if(rect.x+rect.width+width>bounds.x+bounds.width){
if(rect.x-width>=bounds.x){
x=rect.x-width;
}else{
if(bounds.width<width){
x=bounds.x;
w=bounds.width;
}else{
if(Math.abs(bounds.x+bounds.width-width-rect.x)>Math.abs(bounds.x+width-rect.x-rect.width)){
x=bounds.x;
}else{
x=bounds.x+bounds.width-width;
}}}}else{
x=rect.x;
}}}return new $wt.graphics.Rectangle(x,y,w,h);
},"$wt.graphics.Rectangle,$wt.graphics.Rectangle,~N,~N,~N");
});
$_L(["$wt.graphics.Drawable","$.Resource"],"$wt.graphics.Image",["$wt.graphics.Color","$.Device","$.ImageData","$.Rectangle","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.url=null;
this.hash=0;
this.width=0;
this.height=0;
this.type=0;
this.handle=null;
this.gcDrawn=false;
this.drawings=null;
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
},"$wt.graphics.Device,~N,~N");
$_M(c$,"setSize",
function(width,height){
this.width=width;
this.height=height;
},"~N,~N");
$_K(c$,
function(device,srcImage,flag){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.url=srcImage.url;
this.hash=srcImage.hash;
this.width=srcImage.width;
this.height=srcImage.height;
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
this.hash=data.hash;
this.width=data.width;
this.height=data.height;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(device,source,mask){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=source.url;
this.hash=source.hash;
this.width=source.width;
this.height=source.height;
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
if(object===this)return true;
if(!($_O(object,$wt.graphics.Image)))return false;
var image=object;
return this.device===image.device&&this.handle===image.handle;
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
$_M(c$,"draw",
function(handle){
O$.clearChildren(handle);
if(this.drawings!=null){
var rect=null;
for(var i=0;i<this.drawings.length;i++){
var drawing=this.drawings[i];
var type=drawing[0];
switch(type){
case 1:
rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left=drawing[1]+"px";
if(O$.isFirefox&&handle.nodeName==="BUTTON"){
rect.style.top=(drawing[2]-Math.floor(drawing[4]/2)-3)+"px";
}else{
rect.style.top=drawing[2]+"px";
}rect.style.width=drawing[3]+"px";
rect.style.height=drawing[4]+"px";
rect.style.borderColor=""+drawing[5];
rect.style.borderStyle="solid";
rect.style.borderWidth="1px";
handle.appendChild(rect);
break;
case 2:
rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left=drawing[1]+"px";
if(O$.isFirefox){
rect.style.top=(drawing[2]-Math.floor(drawing[4]/2)-1)+"px";
}else{
rect.style.top=drawing[2]+"px";
}rect.style.width=drawing[3]+"px";
rect.style.height=drawing[4]+"px";
rect.style.backgroundColor=""+drawing[5];
handle.appendChild(rect);
break;
default:
;}
}
}else{
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left="0px";
rect.style.top="0px";
rect.style.width=this.width+"px";
rect.style.height=this.height+"px";
rect.style.backgroundColor="black";
handle.appendChild(rect);
}},"$wt.internal.xhtml.Element");
$_S(c$,
"DEFAULT_SCANLINE_PAD",4);
});
$_L(["$wt.internal.CloneableCompatibility"],"$wt.graphics.ImageData",null,function(){
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
this.hash=0;
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
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"setAllFields",
function(width,height,depth,scanlinePad,bytesPerLine,data,palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime){
},"~N,~N,~N,~N,~N,~A,$wt.graphics.PaletteData,~N,~A,~N,~A,~N,~N,~N,~N,~N,~N");
$_V(c$,"clone",
function(){
return this.clone();
});
$_M(c$,"getAlpha",
function(x,y){
return 0;
},"~N,~N");
$_M(c$,"getAlphas",
function(x,y,getWidth,alphas,startIndex){
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixel",
function(x,y){
return 0;
},"~N,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
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
},"~N,~N,~N");
$_M(c$,"setAlphas",
function(x,y,putWidth,alphas,startIndex){
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixel",
function(x,y,pixelValue){
},"~N,~N,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
});
$_L(["$wt.widgets.Widget"],"$wt.widgets.Item",null,function(){
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
});
c$=$_T($wt.widgets,"Layout");
$_M(c$,"flushCache",
function(control){
return false;
},"$wt.widgets.Control");
