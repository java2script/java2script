$_L(null,"$wt.internal.dnd.DragAndDrop",["$wt.internal.dnd.DNDUtils"],function(){
c$=$_C(function(){
this.status=0;
this.element=null;
this.startX=0;
this.startY=0;
this.listeners=null;
this.hSelectStart=null;
this.hMouseDown=null;
this.hMouseUp=null;
this.hMouseMove=null;
this.hKeyUp=null;
$_Z(this,arguments);
},$wt.internal.dnd,"DragAndDrop");
$_Y(c$,function(){
this.listeners=new Array(0);
});
$_M(c$,"reset",
function(){
this.status=0;
if(this.hMouseMove!=null){
Clazz.removeEvent(document,"mousemove",this.hMouseMove);
this.hMouseMove=null;
}if(this.hMouseUp!=null){
Clazz.removeEvent(document,"mouseup",this.hMouseUp);
this.hMouseUp=null;
}if(this.hKeyUp!=null){
Clazz.removeEvent(document,"keyup",this.hKeyUp);
this.hKeyUp=null;
}if(this.element!=null&&this.hSelectStart!=null){
Clazz.removeEvent(this.element,"selectstart",this.hSelectStart);
}if(this.hSelectStart!=null){
Clazz.removeEvent(document,"selectstart",this.hSelectStart);
this.hSelectStart=null;
}});
$_M(c$,"bind",
function(el){
this.element=el;
if(this.hMouseDown==null){
this.hMouseDown=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousedown,this);
Clazz.addEvent(el,"mousedown",this.hMouseDown);
}},"Element");
$_M(c$,"unbind",
function(){
if(this.hMouseDown!=null){
Clazz.removeEvent(this.element,"mouseover",this.hMouseDown);
this.hMouseDown=null;
}this.element=null;
});
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
