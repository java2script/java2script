$_L(["$wt.widgets.Control"],"$wt.widgets.Scale",["$wt.graphics.Point","$wt.internal.browser.OS","$wt.internal.dnd.DragAndDrop","$.ScaleDND","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Scale", ".scale-default {\nposition:absolute;\n}\n.scale-border {\nborder-width:2px;\nborder-style:inset;\n}\n.scale-thumb-pressed {\nbackground-color:#e0e0e0;\n}\n.scale-thumb-horizontal {\nposition:absolute;\nwidth:10px;\nheight:18px;\ntop:14px;\ncursor:default;\nfont-size:0;\nz-index:4;\nbackground-color:buttonface;\nborder-width:1px;\nborder-style:outset;\n}\n.scale-line-decoration-horizontal {\nposition:absolute;\ntop:8px;\nfont-size:0;\nmargin:0;\npadding:0;\nwidth:0;\nheight:32px;\nborder-left:1px solid black;\nz-index:1;\n}\n.scale-center-block-horizontal {\nposition:absolute;\ntop:12px;\nfont-size:0;\nmargin:0;\npadding:0;\nheight:24px;\nbackground-color:buttonface;\nwidth:100%;\nz-index:2;\n}\n.scale-line-polar-top {\nposition:absolute;\ntop:23px;\nfont-size:0;\nmargin:0;\npadding:0;\nheight:0;\nwidth:100%;\nborder-bottom:1px solid gray;\nz-index:3;\n}\n.scale-line-polar-bottom {\nposition:absolute;\ntop:24px;\nfont-size:0;\nmargin:0;\npadding:0;\nheight:0;\nwidth:100%;\nborder-top:1px solid white;\nz-index:3;\n}\n* html .scale-line-polar-top {\ntop:21px;\n}\n* html .scale-line-polar-bottom {\ntop:24px;\n}\n.scale-thumb-vertical {\nposition:absolute;\nwidth:18px;\nheight:10px;\nleft:14px;\ncursor:default;\nfont-size:0;\nz-index:4;\nbackground-color:buttonface;\nborder-width:1px;\nborder-style:outset;\n}\n.scale-line-decoration-vertical {\nposition:absolute;\nleft:8px;\nfont-size:0;\nmargin:0;\npadding:0;\nwidth:32px;\nheight:0;\nborder-bottom:1px solid black;\nz-index:1;\n}\n.scale-center-block-vertical {\nposition:absolute;\nleft:12px;\nfont-size:0;\nmargin:0;\npadding:0;\nwidth:24px;\nbackground-color:buttonface;\nheight:100%;\nz-index:2;\n}\n.scale-line-polar-left {\nposition:absolute;\nleft:23px;\nfont-size:0;\nmargin:0;\npadding:0;\nheight:100%;\nwidth:0;\nborder-right:1px solid gray;\nz-index:3;\n}\n.scale-line-polar-right {\nposition:absolute;\nleft:24px;\nfont-size:0;\nmargin:0;\npadding:0;\nheight:100%;\nwidth:0;\nborder-left:1px solid white;\nz-index:3;\n}\n.swt-widgets-scale {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.pageIncrement = 0;
this.lastX = 0;
this.lastY = 0;
this.selection = 0;
this.thumbHandle = null;
this.trackHandle = null;
this.lines = null;
this.dnd = null;
$_Z (this, arguments);
}, $wt.widgets, "Scale", $wt.widgets.Control);
$_M (c$, "addSelectionListener", 
function (listener) {
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener (13, typedListener);
this.addListener (14, typedListener);
}, "$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
var thumbWidth=10;
var thumbHeight=10;
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
$_V(c$,"createHandle",
function(){
this.minimum=0;
this.maximum=100;
this.pageIncrement=10;
this.handle=d$.createElement("DIV");
this.handle.className="scale-default";
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&2048)!=0){
this.handle.className+=" scale-border";
}this.thumbHandle=d$.createElement("DIV");
this.handle.appendChild(this.thumbHandle);
if((this.style&256)!=0){
this.thumbHandle.className="scale-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="scale-thumb-vertical";
this.thumbHandle.style.top="0px";
}this.lines=new Array(0);
var isHorizontal=(this.style&256)!=0;
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
this.dnd=new $wt.internal.dnd.DragAndDrop();
this.dnd.addDragListener((($_D("$wt.widgets.Scale$1")?0:org.eclipse.swt.widgets.Scale.$Scale$1$()),$_N($wt.widgets.Scale$1,this,null)));
this.dnd.bind(this.thumbHandle);
});
$_M(c$,"releaseHandle",
function(){
if(this.dnd!=null){
this.dnd.unbind();
this.dnd=null;
}if(this.lines!=null){
for(var i=0;i<this.lines.length;i++){
O$.destroyHandle(this.lines[i]);
this.lines[i]=null;
}
}if(this.thumbHandle!=null){
O$.destroyHandle(this.thumbHandle);
this.thumbHandle=null;
}if(this.trackHandle!=null){
O$.destroyHandle(this.trackHandle);
this.trackHandle=null;
}$_U(this,$wt.widgets.Scale,"releaseHandle",[]);
});
$_M(c$,"decorateScale",
($fz=function(){
var outerSize;
if((this.style&256)!=0){
outerSize=this.getSize().x;
}else{
outerSize=this.getSize().y;
}var pages=Math.floor((this.maximum-this.minimum)/this.pageIncrement);
for(var i=pages;i<this.lines.length;i++){
if(this.lines[i]!=null){
this.lines[i].style.display="none";
}}
var thumbSize=16;
var range=outerSize-thumbSize+pages;
for(var i=0;i<pages;i++){
var line=this.lines[i];
if(line==null){
line=d$.createElement("DIV");
this.handle.appendChild(line);
if((this.style&256)!=0){
line.className="scale-line-decoration-horizontal";
}else{
line.className="scale-line-decoration-vertical";
}this.lines[i]=line;
}else{
line.style.display="block";
}if((this.style&256)!=0){
line.style.left=Math.floor(Math.floor(range*i/ pages) + Math.floor (thumbSize /2))+"px";
}else{
line.style.top=Math.floor(Math.floor(range*i/ pages) + Math.floor (thumbSize /2))+"px";
}}
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
var thumbStyle=this.thumbHandle.style;
if((this.style&256)!=0){
var left=thumbStyle.left.length>0?Integer.parseInt(thumbStyle.left):0;
this.selection=Math.floor(left*this.maximum/(this.getSize().x-12));
}else{
var top=thumbStyle.top.length>0?Integer.parseInt(thumbStyle.top):0;
this.selection=this.maximum-Math.floor(top*this.maximum/(this.getSize().y-12));
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
this.decorateScale();
this.setSelection(this.selection);
}},"~N");
$_M(c$,"setMinimum",
function(value){
if(0<=value&&value<this.maximum){
if(this.minimum==value)return;
this.minimum=value;
this.decorateScale();
this.setSelection(this.selection);
}},"~N");
$_M(c$,"setPageIncrement",
function(pageIncrement){
if(pageIncrement<1)return;
if(pageIncrement>this.maximum-this.minimum)return;
if(this.pageIncrement==pageIncrement)return;
this.pageIncrement=pageIncrement;
this.decorateScale();
},"~N");
$_M(c$,"setSelection",
function(value){
if(value<this.minimum){
this.selection=this.minimum;
}else if(value>this.maximum){
this.selection=this.maximum;
}else{
this.selection=value;
}if((this.style&256)!=0){
this.thumbHandle.style.left=Math.round(Math.floor(this.selection*(this.getSize().x-12)/this.maximum))+"px";
}else{
this.thumbHandle.style.top=Math.round(Math.floor((this.maximum-this.selection)*(this.getSize().y-12)/this.maximum))+"px";
}},"~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
this.decorateScale();
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
this.setSelection(this.selection);
return true;
},"~O,~O,~N,~N,~N,~N,~N");
c$.$Scale$1$=function(){
$_H();
c$=$_W($wt.widgets,"Scale$1",$wt.internal.dnd.ScaleDND);
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
};
});
