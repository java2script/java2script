$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.SashDND",["$wt.graphics.Point","$wt.internal.browser.OS","$wt.internal.dnd.DNDUtils"],function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.thumb=null;
this.isHorizontal=false;
this.overFrameHandle=null;
this.hSelectStart=null;
$_Z(this,arguments);
},$wt.internal.dnd,"SashDND",null,$wt.internal.dnd.DragListener);
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
if(this.hSelectStart==null){
this.hSelectStart=$wt.internal.dnd.DNDUtils.$onselectstart;
Clazz.addEvent(this.thumb,"selectstart",this.hSelectStart);
}if(e.sourceElement.nextSibling!=null){
e.sourceElement.parentNode.insertBefore(this.thumb,e.sourceElement.nextSibling);
}else{
e.sourceElement.parentNode.appendChild(this.thumb);
}var style=e.sourceElement.style;
this.sourceX=style.left.length>0?Integer.parseInt(style.left):0;
this.sourceY=style.top.length>0?Integer.parseInt(style.top):0;
e.startX=e.currentX;
e.startY=e.currentY;
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
if(this.hSelectStart!=null){
Clazz.removeEvent(this.thumb,"selectstart",this.hSelectStart);
this.hSelectStart=null;
}O$.destroyHandle(this.thumb);
if(this.overFrameHandle!=null){
O$.destroyHandle(this.overFrameHandle);
this.overFrameHandle=null;
}});
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=0;
var parentStyle=e.sourceElement.parentNode.style;
if(parentStyle.height.length>0){
gHeight=Integer.parseInt(parentStyle.height);
}var gWidth=0;
if(parentStyle.width.length>0){
gWidth=Integer.parseInt(parentStyle.width);
}var style=e.sourceElement.style;
var dWidth=style.width.length>0?Integer.parseInt(style.width):0;
var dHeight=style.height.length>0?Integer.parseInt(style.height):0;
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
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
});
