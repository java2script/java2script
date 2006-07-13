Clazz.load(["$wt.widgets.Control"],"$wt.widgets.Sash",["$wt.graphics.Point","$wt.internal.dnd.DragAndDrop","$.SashDND","$wt.widgets.Event","$.TypedListener"],function(){
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
});
