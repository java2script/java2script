$_L(["$wt.widgets.Control"],"$wt.widgets.Slider",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.dnd.DragAndDrop","$.SliderDND","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Slider", ".slider-default {\nposition:absolute;\nbackground-color:#e0e0e0;\n}\n.slider-border {\nborder: 1px inset white;\n}\n.slider-thumb-pressed {\nbackground-color:#e0e0e0;\n}\n.slider-thumb-horizontal {\nposition:absolute;\n/*margin:0 20px;*/\nborder:2px outset white;\nheight:100%;\nwidth:20px;\nbackground-color:buttonface;\npadding:0;\nmargin:0;\n}\n.slider-thumb-vertical {\nposition:absolute;\n/*margin:20px 0;*/\nwidth:100%;\nheight:20px;\nborder:2px outset white;\nbackground-color:buttonface;\npadding:0;\nmargin:0;\n}\n.slider-left-button-default {\ndisplay:block;\nfloat:left;\nheight:100%;\nwidth:20px;\nbackground-image:url(\'images/arrow-left.png\');\nbackground-repeat:no-repeat;\nbackground-position:center center;\nmargin:0;\npadding:0;\n}\n.slider-right-button-default {\ndisplay:block;\nheight:100%;\nwidth:20px;\nfloat:right;\nbackground-image:url(\'images/arrow-right.png\');\nbackground-repeat:no-repeat;\nbackground-position:center center;\nmargin:0;\npadding:0;\n}\n.slider-top-button-default {\nposition:absolute;\ntop:0;\ndisplay:block;\nheight:20px;\nwidth:100%;\nbackground-image:url(\'images/arrow-up.png\');\nbackground-repeat:no-repeat;\nbackground-position:center center;\nmargin:0;\npadding:0;\n}\n.slider-bottom-button-default {\nposition:absolute;\nbottom:0;\ndisplay:block;\nheight:20px;\nwidth:100%;\nbackground-image:url(\'images/arrow-down.png\');\nbackground-repeat:no-repeat;\nbackground-position:center center;\nmargin:0;\npadding:0;\n}\n.swt-widgets-slider {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.pageIncrement = 0;
this.thumb = 0;
this.selection = 0;
this.decBtnHandle = null;
this.incBtnHandle = null;
this.thumbHandle = null;
this.lastX = 0;
this.lastY = 0;
this.hIncreaseClick = null;
this.hDecreaseClick = null;
this.dnd = null;
$_Z (this, arguments);
}, $wt.widgets, "Slider", $wt.widgets.Control);
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
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
height+=24;
}else{
width+=24;
height+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createWidget",
function(){
this.register();
this.handle=d$.createElement("DIV");
this.handle.className="slider-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}if((this.style&2048)!=0){
this.handle.className+=" slider-border";
}this.decBtnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.decBtnHandle);
if((this.style&256)!=0){
this.decBtnHandle.className="slider-left-button-default";
}else{
this.decBtnHandle.className="slider-top-button-default";
}this.hDecreaseClick=$_Q((($_D("$wt.widgets.Slider$1")?0:org.eclipse.swt.widgets.Slider.$Slider$1$()),$_N($wt.widgets.Slider$1,this,null)));
Clazz.addEvent(this.decBtnHandle,"click",this.hDecreaseClick);
this.incBtnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.incBtnHandle);
if((this.style&256)!=0){
this.incBtnHandle.className="slider-right-button-default";
}else{
this.incBtnHandle.className="slider-bottom-button-default";
}this.hIncreaseClick=$_Q((($_D("$wt.widgets.Slider$2")?0:org.eclipse.swt.widgets.Slider.$Slider$2$()),$_N($wt.widgets.Slider$2,this,null)));
Clazz.addEvent(this.incBtnHandle,"click",this.hIncreaseClick);
this.thumbHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.thumbHandle);
if((this.style&256)!=0){
this.thumbHandle.className="slider-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="slider-thumb-vertical";
this.thumbHandle.style.top="0px";
}this.minimum=0;
this.maximum=100;
this.thumb=10;
this.selection=0;
this.increment=1;
this.pageIncrement=10;
this.dnd=new $wt.internal.dnd.DragAndDrop();
this.dnd.addDragListener((($_D("$wt.widgets.Slider$3")?0:org.eclipse.swt.widgets.Slider.$Slider$3$()),$_N($wt.widgets.Slider$3,this,null)));
this.dnd.bind(this.thumbHandle);
this.updateSlider();
});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}this.handle.disabled=enabled;
},"~B");
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
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
return this.selection;
});
$_M(c$,"caculateSelection",
function(){
var size=this.getSize();
var borderWidth=20;
var trackWidth=0;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}trackWidth=size.x-borderWidth*2;
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.width=thumbWidth+"px";
var thumbPosition=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor((thumbPosition-borderWidth)*(this.maximum-this.minimum)/trackWidth)+this.minimum;
}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}trackWidth=size.y-borderWidth*2;
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.height=thumbWidth+"px";
var thumbPosition=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor((thumbPosition-borderWidth)*(this.maximum-this.minimum)/trackWidth)+this.minimum;
}return this.selection;
});
$_M(c$,"getThumb",
function(){
return this.thumb;
});
$_M(c$,"releaseHandle",
function(){
if(this.dnd!=null){
this.dnd.unbind();
this.dnd=null;
}if(this.decBtnHandle!=null&&this.hDecreaseClick!=null){
Clazz.removeEvent(this.decBtnHandle,"click",this.hDecreaseClick);
this.hDecreaseClick=null;
}if(this.incBtnHandle!=null&&this.hIncreaseClick!=null){
Clazz.removeEvent(this.incBtnHandle,"click",this.hIncreaseClick);
this.hIncreaseClick=null;
}$_U(this,$wt.widgets.Slider,"releaseHandle",[]);
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
this.increment=value;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
if(value<this.minimum)return;
this.maximum=value;
if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateSlider();
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
if(value>this.maximum)return;
this.minimum=value;
if(this.selection<this.minimum){
this.selection=this.minimum;
}this.updateSlider();
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(value){
if(value<0)return;
if(value<this.minimum){
this.selection=this.minimum;
}else if(value>this.maximum-this.thumb){
this.selection=this.maximum-this.thumb;
}else{
this.selection=value;
}this.updateSlider();
},"~N");
$_M(c$,"setSize",
function(width,height){
$_U(this,$wt.widgets.Slider,"setSize",[width,height]);
this.updateSlider();
},"~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Slider,"setBounds",[x,y,width,height]);
this.updateSlider();
},"~N,~N,~N,~N");
$_M(c$,"setThumb",
function(value){
if(value<1)return;
this.thumb=value;
this.updateSlider();
},"~N");
$_M(c$,"getIncrementButtonWidth",
function(){
var size=this.getSize();
var borderWidth=20;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}}return borderWidth;
});
$_M(c$,"updateSlider",
function(){
var size=this.getSize();
var borderWidth=20;
var trackWidth=0;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}trackWidth=size.x-borderWidth*2;
var thumbPosition=Math.floor((this.selection-this.minimum)*trackWidth/(this.maximum-this.minimum))+borderWidth;
this.thumbHandle.style.left=thumbPosition+"px";
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.width=thumbWidth+"px";
}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}trackWidth=size.y-borderWidth*2;
var thumbPosition=Math.floor((this.selection-this.minimum)*trackWidth/(this.maximum-this.minimum))+borderWidth;
this.thumbHandle.style.top=thumbPosition+"px";
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.height=thumbWidth+"px";
}});
$_M(c$,"setValues",
function(selection,minimum,maximum,thumb,increment,pageIncrement){
if(minimum<0)return;
if(maximum<0)return;
if(thumb<1)return;
if(increment<1)return;
if(pageIncrement<1)return;
this.increment=increment;
this.pageIncrement=pageIncrement;
this.minimum=minimum;
this.maximum=maximum;
this.thumb=thumb;
if(this.selection<this.minimum){
this.selection=this.minimum;
}else if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateSlider();
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"windowClass",
function(){
return"DIV";
});
c$.$Slider$1$=function(){
$_H();
c$=$_W($wt.widgets,"Slider$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Slider"].setSelection(this.b$["$wt.widgets.Slider"].getSelection()-this.b$["$wt.widgets.Slider"].increment);
var event=new $wt.widgets.Event();
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].style&256)!=0){
event.detail=16777219;
}else{
event.detail=16777217;
}this.b$["$wt.widgets.Slider"].sendEvent(13,event);
});
c$=$_P();
};
c$.$Slider$2$=function(){
$_H();
c$=$_W($wt.widgets,"Slider$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Slider"].setSelection(this.b$["$wt.widgets.Slider"].getSelection()+this.b$["$wt.widgets.Slider"].increment);
var event=new $wt.widgets.Event();
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].style&256)!=0){
event.detail=16777220;
}else{
event.detail=16777218;
}this.b$["$wt.widgets.Slider"].sendEvent(13,event);
});
c$=$_P();
};
c$.$Slider$3$=function(){
$_H();
c$=$_W($wt.widgets,"Slider$3",$wt.internal.dnd.SliderDND);
$_V(c$,"dragEnded",
function(e){
this.b$["$wt.widgets.Slider"].caculateSelection();
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Slider"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Slider"].handle.style.left);
event.y=p.y;
}event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
event.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Slider"].lastX=event.x;
this.b$["$wt.widgets.Slider"].lastY=event.y;
}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var parentStyle=e.sourceElement.parentNode.style;
var gHeight=parentStyle.height.length>0?Integer.parseInt(parentStyle.height):0;
var gWidth=parentStyle.width.length>0?Integer.parseInt(parentStyle.width):0;
var borderWidth=20;
if(this.isHorizontal){
if(gWidth<=64){
borderWidth=Math.floor(gWidth*20/64);
}var thumbWidth=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(gWidth-borderWidth*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}var maxWidth=gWidth-borderWidth-6;
if(xx<borderWidth){
xx=borderWidth;
}else if(xx>maxWidth-thumbWidth){
xx=maxWidth-thumbWidth;
}}else{
if(gHeight<=64){
borderWidth=Math.floor(gHeight*20/64);
}var thumbWidth=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(gWidth-borderWidth*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}var maxHeight=gHeight-borderWidth-6;
if(yy<borderWidth){
yy=borderWidth;
}else if(yy>maxHeight-thumbWidth){
yy=maxHeight-thumbWidth;
}}return new $wt.graphics.Point(xx,yy);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.isHorizontal){
e.sourceElement.style.left=this.currentLocation(e).x+"px";
}else{
e.sourceElement.style.top=this.currentLocation(e).y+"px";
}this.b$["$wt.widgets.Slider"].caculateSelection();
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Slider"].lastX;
event.y=this.b$["$wt.widgets.Slider"].lastY;
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
event.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,event);
return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
};
});
