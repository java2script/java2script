$_L(["$wt.widgets.Widget"],"$wt.widgets.ScrollBar",["$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.ScrollBar", "/* scrolled composite */\n.vscroll-default{\noverflow-y:scroll;\n}\n.hscroll-default{\noverflow-x:scroll;\n}\n.swt-widgets-scrollbar {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.parent = null;
this.increment = 0;
this.pageIncrement = 0;
this.minimum = 0;
this.maximum = 0;
this.thumb = 0;
this.selection = 0;
this.size = 0;
this.outerHandle = null;
this.sbHandle = null;
this.innerHandle = null;
this.hScroll = null;
$_Z (this, arguments);
}, $wt.widgets, "ScrollBar", $wt.widgets.Widget);
$_K (c$, 
function (parent, style) {
$_R (this, $wt.widgets.ScrollBar, [parent, $wt.widgets.ScrollBar.checkStyle (style)]);
this.parent = parent;
this.createWidget ();
}, "$wt.widgets.Scrollable,~N");
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
$_M(c$,"createWidget",
function(){
this.increment=1;
this.pageIncrement=10;
this.state=this.state|16;
this.minimum=0;
this.maximum=100;
this.thumb=10;
this.selection=0;
this.increment=1;
this.pageIncrement=10;
this.size=100;
if((this.style&256)!=0){
this.createHorizontalScrollBar(this.parent.scrolledHandle(),this.size,Math.floor(this.size*(this.maximum-this.minimum)/this.thumb));
}else{
this.createVerticalScrollBar(this.parent.scrolledHandle(),this.size,Math.floor(this.size*(this.maximum-this.minimum)/this.thumb));
}this.hScroll=$_Q((($_D("$wt.widgets.ScrollBar$1")?0:org.eclipse.swt.widgets.ScrollBar.$ScrollBar$1$()),$_N($wt.widgets.ScrollBar$1,this,null)));
Clazz.addEvent(this.sbHandle,"scroll",this.hScroll);
});
$_M(c$,"createVerticalScrollBar",
function(parent,sbOuterHeight,sbInnerHeight){
this.outerHandle=d$.createElement("DIV");
parent.appendChild(this.outerHandle);
var style=this.outerHandle.style;
style.position="absolute";
style.margin="0";
style.padding="0";
style.borderStyle="none";
style.overflow="hidden";
style.zIndex=1;
var sbWidth=O$.getScrollBarWidth();
style.width=sbWidth+"px";
style.height=sbOuterHeight+"px";
this.sbHandle=d$.createElement("DIV");
this.sbHandle.style.backgroundColor="blue";
this.sbHandle.style.overflow="auto";
this.sbHandle.style.cssText=this.sbHandle.style.cssText+";overflow-x:hidden;overflow-y:scroll;";
if(O$.isIE){
this.sbHandle.style.width=(sbWidth+1)+"px";
this.sbHandle.style.marginLeft="-1px";
}else{
var needFixing=O$.isFirefox;
{
needFixing&=(navigator.userAgent.indexOf("Firefox/2.0")!=-1);
}this.sbHandle.style.width=(sbWidth+(needFixing?0.1:0))+"px";
}this.sbHandle.style.height=sbOuterHeight+"px";
this.sbHandle.style.fontSize=Math.floor(this.increment*(this.maximum-this.minimum)/this.thumb)+"px";
this.outerHandle.appendChild(this.sbHandle);
this.innerHandle=d$.createElement("DIV");
this.innerHandle.style.height=sbInnerHeight+"px";
this.innerHandle.style.fontSize="1px";
this.sbHandle.appendChild(this.innerHandle);
this.innerHandle.appendChild(d$.createTextNode("."));
},"Element,~N,~N");
$_M(c$,"createHorizontalScrollBar",
function(parent,sbOuterWidth,sbInnerWidth){
this.outerHandle=d$.createElement("DIV");
parent.appendChild(this.outerHandle);
var style=this.outerHandle.style;
style.position="absolute";
style.margin="0";
style.padding="0";
style.borderStyle="none";
style.overflow="hidden";
style.zIndex=1;
style.width=sbOuterWidth+"px";
var sbHeight=O$.getScrollBarHeight();
style.height=sbHeight+"px";
this.sbHandle=d$.createElement("DIV");
this.sbHandle.style.backgroundColor="blue";
this.sbHandle.style.overflow="auto";
this.sbHandle.style.cssText=this.sbHandle.style.cssText+";overflow-x:scroll;overflow-y:hidden;";
if(O$.isIE||O$.isOpera){
this.sbHandle.style.height=(sbHeight+1)+"px";
this.sbHandle.style.marginTop="-1px";
}else{
this.sbHandle.style.height=sbHeight+"px";
}this.sbHandle.style.width=sbOuterWidth+"px";
this.outerHandle.appendChild(this.sbHandle);
this.innerHandle=d$.createElement("DIV");
this.innerHandle.style.width=sbInnerWidth+"px";
this.innerHandle.style.fontSize="1px";
if(O$.isOpera){
this.innerHandle.style.lineHeight="1px";
this.innerHandle.style.height="1px";
}this.sbHandle.appendChild(this.innerHandle);
this.innerHandle.appendChild(d$.createTextNode("."));
},"Element,~N,~N");
$_M(c$,"updateSizeBinding",
function(size){
this.size=size;
if((this.style&256)!=0){
this.outerHandle.style.width=(size>0?size:0)+"px";
this.sbHandle.style.width=(size>0?size:0)+"px";
}else{
this.outerHandle.style.height=(size>0?size:0)+"px";
this.sbHandle.style.height=(size>0?size:0)+"px";
}this.updateScrollBar();
},"~N");
$_M(c$,"updateScrollBar",
function(){
var innerSize=Math.round(Math.floor(this.size*(this.maximum-this.minimum)/this.thumb));
if((this.style&512)!=0){
this.innerHandle.style.height=innerSize+"px";
this.sbHandle.style.fontSize=Math.floor(this.increment*(this.maximum-this.minimum)/this.thumb)+"px";
}else{
this.innerHandle.style.width=innerSize+"px";
}if(this.maximum!=this.minimum){
if((this.style&256)!=0){
this.sbHandle.scrollLeft=Math.floor((this.selection-this.minimum)*this.sbHandle.scrollWidth/(this.maximum-this.minimum));
}else{
this.sbHandle.scrollTop=Math.floor((this.selection-this.minimum)*this.sbHandle.scrollHeight/(this.maximum-this.minimum));
}}});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
$_U(this,$wt.widgets.ScrollBar,"dispose",[]);
if(this.innerHandle!=null){
O$.destroyHandle(this.innerHandle);
this.innerHandle=null;
}if(this.sbHandle!=null){
O$.destroyHandle(this.sbHandle);
this.sbHandle=null;
}if(this.outerHandle!=null){
O$.destroyHandle(this.outerHandle);
this.outerHandle=null;
}});
$_M(c$,"getBounds",
function(){
this.parent.forceResize();
return new $wt.graphics.Rectangle(0,0,O$.getContainerWidth(this.outerHandle),O$.getContainerHeight(this.outerHandle));
});
$_M(c$,"getEnabled",
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
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if(this.maximum!=this.minimum){
if((this.style&256)!=0){
this.selection=this.minimum+Math.floor(this.sbHandle.scrollLeft*(this.maximum-this.minimum)/this.sbHandle.scrollWidth);
}else{
this.selection=this.minimum+Math.floor(this.sbHandle.scrollTop*(this.maximum-this.minimum)/this.sbHandle.scrollHeight);
}}return this.selection;
});
$_M(c$,"getSize",
function(){
this.parent.forceResize();
var width;
var height;
if((this.style&256)!=0){
width=this.size;
height=O$.getScrollBarHeight();
}else{
width=O$.getScrollBarWidth();
height=this.size;
}return new $wt.graphics.Point(width,height);
});
$_M(c$,"getThumb",
function(){
return this.thumb;
});
$_M(c$,"getVisible",
function(){
return(this.state&16)==0;
});
$_M(c$,"hwndScrollBar",
function(){
return this.parent.scrolledHandle();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseChild",[]);
if(this.parent.horizontalBar===this)this.parent.horizontalBar=null;
if(this.parent.verticalBar===this)this.parent.verticalBar=null;
});
$_M(c$,"releaseHandle",
function(){
if(this.sbHandle!=null&&this.hScroll!=null){
Clazz.removeEvent(this.sbHandle,"scroll",this.hScroll);
this.hScroll=null;
}if(this.innerHandle!=null){
O$.destroyHandle(this.innerHandle);
this.innerHandle=null;
}if(this.sbHandle!=null){
O$.destroyHandle(this.sbHandle);
this.sbHandle=null;
}if(this.outerHandle!=null){
O$.destroyHandle(this.outerHandle);
this.outerHandle=null;
}$_U(this,$wt.widgets.ScrollBar,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseWidget",[]);
this.parent=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(enabled){
},"~B");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
if(this.increment==value)return;
this.increment=value;
this.updateScrollBar();
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
if(value<this.minimum)return;
if(this.maximum==value)return;
this.maximum=value;
if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateScrollBar();
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
if(value>this.maximum)return;
if(this.minimum==value)return;
this.minimum=value;
if(this.selection<this.minimum){
this.selection=this.minimum;
}this.updateScrollBar();
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(selection){
if(selection<0)return;
if(this.selection==selection)return;
if(selection<this.minimum){
this.selection=this.minimum;
}else if(selection>this.maximum-this.thumb){
this.selection=this.maximum-this.thumb;
}else{
this.selection=selection;
}this.updateScrollBar();
},"~N");
$_M(c$,"setThumb",
function(value){
if(value<1)return;
if(this.thumb==value)return;
this.thumb=value;
this.updateScrollBar();
},"~N");
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
}this.updateScrollBar();
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"setVisible",
function(visible){
var isVisible=(this.state&16)==0;
if(isVisible==visible)return;
if(visible){
this.state=this.state&-17;
}else{
this.state=this.state|16;
}if(this.parent==null||this.parent.handle==null){
return;
}var scrollClass="hscroll-default";
if((this.style&512)!=0){
scrollClass="vscroll-default";
}var className=this.parent.handle.className;
var idx=this.parent.handle.className.indexOf(scrollClass);
if(!visible&&idx!=-1){
className=className.substring(0,idx)+className.substring(idx+scrollClass.length);
}else if(visible&&idx==-1){
className+=" "+scrollClass;
}this.parent.handle.className=className;
},"~B");
c$.$ScrollBar$1$=function(){
$_H();
c$=$_W($wt.widgets,"ScrollBar$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var event=new $wt.widgets.Event();
event.detail=0;
this.b$["$wt.widgets.ScrollBar"].sendEvent(13,event);
});
c$=$_P();
};
});
