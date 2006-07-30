$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.SashDND",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.thumb=null;
this.isHorizontal=false;
this.overFrameHandle=null;
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
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
});
