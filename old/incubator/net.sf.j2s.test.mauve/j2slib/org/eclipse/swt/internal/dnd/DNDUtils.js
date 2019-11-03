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
}if(oThis.hSelectStart==null){
oThis.hSelectStart=$wt.internal.dnd.DNDUtils.$onselectstart;
Clazz.addEvent(document,"selectstart",oThis.hSelectStart);
Clazz.addEvent(evt.target,"selectstart",oThis.hSelectStart);
}oThis.startX=evt.x;
oThis.startY=evt.y;
if(oThis.hMouseMove==null){
oThis.hMouseMove=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousemove,oThis);
Clazz.addEvent(document,"mousemove",oThis.hMouseMove);
}if(oThis.hKeyUp==null){
oThis.hKeyUp=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onkeyup,oThis);
Clazz.addEvent(document,"keyup",oThis.hKeyUp);
}if(oThis.hMouseUp==null){
oThis.hMouseUp=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmouseup,oThis);
Clazz.addEvent(document,"mouseup",oThis.hMouseUp);
}var isOpera=false;
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
