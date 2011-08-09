$_L(["$wt.internal.dnd.DragAdapter"],"$wt.internal.dnd.TableColumnDND",["$wt.graphics.Point","$wt.internal.browser.OS","$wt.internal.dnd.DNDUtils"],function(){
c$=$_C(function(){
this.sourceX=0;
this.thumb=null;
this.hSelectStart=null;
$_Z(this,arguments);
},$wt.internal.dnd,"TableColumnDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
this.thumb=d$.createElement("DIV");
var cssName=e.sourceElement.className;
this.thumb.className=cssName;
if(cssName!=null&&cssName.indexOf("sash-mouse-down")==-1){
this.thumb.className+=" sash-mouse-down";
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
e.startX=e.currentX;
return true;
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
if(this.hSelectStart!=null){
Clazz.removeEvent(this.thumb,"selectstart",this.hSelectStart);
this.hSelectStart=null;
}d$.body.style.cursor="auto";
O$.destroyHandle(this.thumb);
});
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var parentStyle=e.sourceElement.parentNode.style;
var gWidth=parentStyle.width.length>0?Integer.parseInt(parentStyle.width):0;
var style=e.sourceElement.style;
var dWidth=style.width.length>0?Integer.parseInt(style.width):0;
if(xx<0){
xx=0;
}else if(xx>gWidth-dWidth-2){
xx=gWidth-dWidth-2;
}return new $wt.graphics.Point(xx,0);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
d$.body.style.cursor="e-resize";
this.thumb.style.cursor="e-resize";
this.thumb.style.left=this.currentLocation(e).x+"px";
return true;
},"$wt.internal.dnd.DragEvent");
});
