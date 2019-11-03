$_L(["$wt.widgets.Control"],"$wt.widgets.Scrollable",["$wt.graphics.Rectangle","$wt.internal.browser.OS","$wt.widgets.ScrollBar"],function(){
c$=$_C(function(){
this.horizontalBar=null;
this.verticalBar=null;
$_Z(this,arguments);
},$wt.widgets,"Scrollable",$wt.widgets.Control);
$_M(c$,"computeTrim",
function(x,y,width,height){
var border=this.getBorderWidth();
var rect=new $wt.graphics.Rectangle(x-border,y-border,width+border*2,height+border*2);
if(this.horizontalBar!=null)rect.height+=O$.getScrollBarHeight();
if(this.verticalBar!=null)rect.width+=O$.getScrollBarWidth();
return rect;
},"~N,~N,~N,~N");
$_M(c$,"useNativeScrollBar",
function(){
return false;
});
$_M(c$,"createScrollBar",
function(type){
if(this.useNativeScrollBar())return null;
var bar=new $wt.widgets.ScrollBar(this,type);
if((this.state&2)!=0){
bar.setMaximum(100);
bar.setThumb(10);
}return bar;
},"~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Scrollable,"createWidget",[]);
if((this.style&256)!=0)this.horizontalBar=this.createScrollBar(256);
if((this.style&512)!=0)this.verticalBar=this.createScrollBar(512);
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var w=-1;
var h=-1;
w=this.width;
h=this.height;
if(this.verticalBar!=null){
w-=O$.getScrollBarWidth();
}if(this.horizontalBar!=null){
h-=O$.getScrollBarHeight();
}if(w<0){
w=64;
}if(h<0){
h=64;
}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"getHorizontalBar",
function(){
return this.horizontalBar;
});
$_M(c$,"getVerticalBar",
function(){
return this.verticalBar;
});
$_M(c$,"releaseWidget",
function(){
if(this.horizontalBar!=null)this.horizontalBar.releaseResources();
if(this.verticalBar!=null)this.verticalBar.releaseResources();
this.horizontalBar=this.verticalBar=null;
$_U(this,$wt.widgets.Scrollable,"releaseWidget",[]);
});
$_M(c$,"scrolledHandle",
function(){
return this.handle;
});
});
