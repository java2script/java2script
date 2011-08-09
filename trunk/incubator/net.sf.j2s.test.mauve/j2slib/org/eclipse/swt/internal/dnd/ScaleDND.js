$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.ScaleDND",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"ScaleDND",null,$wt.internal.dnd.DragListener);
$_V(c$,"dragBegan",
function(e){
var cssName=e.sourceElement.className;
if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}var style=e.sourceElement.style;
this.sourceX=style.left.length>0?Integer.parseInt(style.left):0;
this.sourceY=style.top.length>0?Integer.parseInt(style.top):0;
e.startX=e.currentX;
e.startY=e.currentY;
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var parentStyle=e.sourceElement.parentNode.style;
var gHeight=parentStyle.height.length>0?Integer.parseInt(parentStyle.height):0;
var gWidth=parentStyle.width.length>0?Integer.parseInt(parentStyle.width):0;
var style=e.sourceElement.style;
var dWidth=style.width.length>0?Integer.parseInt(style.width):0;
var dHeight=style.height.length>0?Integer.parseInt(style.height):0;
if(this.isHorizontal){
dWidth=10;
dHeight=18;
}else{
dWidth=18;
dHeight=10;
}if(xx<0){
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
e.sourceElement.style.left=this.currentLocation(e).x+"px";
}else{
e.sourceElement.style.top=this.currentLocation(e).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
});
