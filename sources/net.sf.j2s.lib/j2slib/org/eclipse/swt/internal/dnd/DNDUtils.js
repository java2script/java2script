Clazz.load(null,"$wt.internal.dnd.DNDUtils",["$wt.internal.dnd.DragEvent","$.HTMLEventWrapper"],function(){
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
});
