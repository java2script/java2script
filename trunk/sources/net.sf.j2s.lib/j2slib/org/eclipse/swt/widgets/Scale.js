Clazz.load(["$wt.widgets.Control"],"$wt.widgets.Scale",["$wt.graphics.Point","$wt.internal.dnd.DragAndDrop","$.ScaleDND","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.minimum=0;
this.maximum=0;
this.increment=0;
this.pageIncrement=0;
this.lastX=0;
this.lastY=0;
this.selection=0;
this.thumbHandle=null;
this.trackHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Scale",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Scale,[parent,$wt.widgets.Scale.checkStyle(style)]);
this.minimum=0;
this.maximum=100;
this.pageIncrement=10;
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
var thumbWidth=16;
var thumbHeight=24;
if((this.style&256)!=0){
width+=160;
var scrollY=16;
height+=(thumbHeight*2)+scrollY+(Math.floor(scrollY/3));
}else{
var scrollX=16;
width+=(thumbWidth*2)+scrollX+(Math.floor(scrollX/3));
height+=160;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Scale,"createHandle",[]);
this.handle=d$.createElement("DIV");
this.handle.className="scale-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}if((this.style&2048)!=0){
this.handle.className+=" scale-border";
}this.thumbHandle=d$.createElement("DIV");
this.handle.appendChild(this.thumbHandle);
if((this.style&256)!=0){
this.thumbHandle.className="scale-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="scale-thumb-vertical";
this.thumbHandle.style.top="0px";
}var isHorizontal=(this.style&256)!=0;
this.decorateScale();
this.trackHandle=d$.createElement("DIV");
if(isHorizontal){
this.trackHandle.className="scale-center-block-horizontal";
}else{
this.trackHandle.className="scale-center-block-vertical";
}this.handle.appendChild(this.trackHandle);
var line1=d$.createElement("DIV");
if(isHorizontal){
line1.className="scale-line-polar-top";
}else{
line1.className="scale-line-polar-left";
}this.handle.appendChild(line1);
var line2=d$.createElement("DIV");
if(isHorizontal){
line2.className="scale-line-polar-bottom";
}else{
line2.className="scale-line-polar-right";
}this.handle.appendChild(line2);
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Scale$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Scale$1",$wt.internal.dnd.ScaleDND);
$_M(c$,"dragging",
function(e){
$_U(this,$wt.widgets.Scale$1,"dragging",[e]);
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Scale"].lastX;
event.y=this.b$["$wt.widgets.Scale"].lastY;
var size=this.b$["$wt.widgets.Scale"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Scale"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Scale"];
event.item=this.b$["$wt.widgets.Scale"];
this.b$["$wt.widgets.Scale"].sendEvent(13,event);
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragEnded",
function(e){
$_U(this,$wt.widgets.Scale$1,"dragEnded",[e]);
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Scale"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Scale"].handle.style.left);
event.y=p.y;
}var size=this.b$["$wt.widgets.Scale"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Scale"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Scale"];
event.item=this.b$["$wt.widgets.Scale"];
if((this.b$["$wt.widgets.Scale"].style&65536)==0){
event.detail=1;
}this.b$["$wt.widgets.Scale"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Scale"].lastX=event.x;
this.b$["$wt.widgets.Scale"].lastY=event.y;
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Scale$1,i$,v$);
})(this,null));
dnd.bind(this.thumbHandle);
});
$_M(c$,"clearScaleDecoration",
($fz=function(){
for(var i=0;i<this.handle.childNodes.length;i++){
System.out.println(i+":"+this.handle.childNodes[i].className);
if(this.handle.childNodes[i].className.indexOf("scale-line-decoration")!=-1){
System.out.println(i);
this.handle.removeChild(this.handle.childNodes[i]);
}}
},$fz.isPrivate=true,$fz));
$_M(c$,"decorateScale",
($fz=function(){
var outerSize;
if((this.style&256)!=0){
outerSize=this.getSize().x;
}else{
outerSize=this.getSize().y;
}var pages=Math.floor((this.maximum-this.minimum)/this.pageIncrement);
var thumbSize=16;
for(var j=0;j<=pages;j++){
var line=d$.createElement("DIV");
if((this.style&256)!=0){
line.className="scale-line-decoration-horizontal";
line.style.left=Math.floor(Math.floor((outerSize-thumbSize)*j/ pages) + Math.floor (thumbSize /2))+"px";
}else{
line.className="scale-line-decoration-vertical";
line.style.top=Math.floor(Math.floor((outerSize-thumbSize)*j/ pages) + Math.floor (thumbSize /2))+"px";
}this.handle.appendChild(line);
}
},$fz.isPrivate=true,$fz));
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getSelection",
function(){
if((this.style&256)!=0){
var left=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor(left*this.maximum/(this.getSize().x-12));
}else{
var top=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor(top*this.maximum/(this.getSize().y-12));
}return this.selection;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setIncrement",
function(increment){
if(increment<1)return;
if(increment>this.maximum-this.minimum)return;
if(this.increment==increment)return;
this.increment=increment;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(0<=this.minimum&&this.minimum<value){
if(this.maximum==value)return;
this.maximum=value;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setMinimum",
function(value){
if(0<=value&&value<this.maximum){
if(this.minimum==value)return;
this.minimum=value;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setPageIncrement",
function(pageIncrement){
if(pageIncrement<1)return;
if(pageIncrement>this.maximum-this.minimum)return;
if(this.pageIncrement==pageIncrement)return;
this.pageIncrement=pageIncrement;
this.clearScaleDecoration();
this.decorateScale();
},"~N");
$_M(c$,"setSelection",
function(value){
if(this.selection==value)return;
if(this.minimum<=value&&value<this.maximum){
this.selection=value;
if((this.style&256)!=0){
this.thumbHandle.style.left=Math.round(Math.floor(this.selection*(this.getSize().x-12)/this.maximum))+"px";
}else{
this.thumbHandle.style.top=Math.round(Math.floor(this.selection*(this.getSize().y-12)/this.maximum))+"px";
}}},"~N");
$_M(c$,"windowClass",
function(){
return"DIV";
});
});
