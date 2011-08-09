$_L(["$wt.widgets.Composite"],"$wt.custom.ScrolledComposite",["$wt.custom.ScrolledCompositeLayout","$wt.graphics.Point","$.Rectangle"],function(){
c$=$_C(function(){
this.content=null;
this.contentListener=null;
this.minHeight=0;
this.minWidth=0;
this.expandHorizontal=false;
this.expandVertical=false;
this.alwaysShowScroll=false;
$_Z(this,arguments);
},$wt.custom,"ScrolledComposite",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.ScrolledComposite,[parent,$wt.custom.ScrolledComposite.checkStyle(style)]);
$_U(this,$wt.custom.ScrolledComposite,"setLayout",[new $wt.custom.ScrolledCompositeLayout()]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=100666112;
return style&mask;
},"~N");
$_M(c$,"getAlwaysShowScrollBars",
function(){
return this.alwaysShowScroll;
});
$_M(c$,"getContent",
function(){
return this.content;
});
$_M(c$,"hScroll",
function(){
if(this.content==null)return;
var location=this.content.getLocation();
var hBar=this.getHorizontalBar();
var hSelection=hBar.getSelection();
this.content.setLocation(-hSelection,location.y);
});
$_M(c$,"needHScroll",
function(contentRect,vVisible){
var hBar=this.getHorizontalBar();
if(hBar==null)return false;
var hostRect=this.getBounds();
var border=this.getBorderWidth();
hostRect.width-=2*border;
var vBar=this.getVerticalBar();
if(vVisible&&vBar!=null)hostRect.width-=vBar.getSize().x;
if(!this.expandHorizontal&&contentRect.width>hostRect.width)return true;
if(this.expandHorizontal&&this.minWidth>hostRect.width)return true;
return false;
},"$wt.graphics.Rectangle,~B");
$_M(c$,"needVScroll",
function(contentRect,hVisible){
var vBar=this.getVerticalBar();
if(vBar==null)return false;
var hostRect=this.getBounds();
var border=this.getBorderWidth();
hostRect.height-=2*border;
var hBar=this.getHorizontalBar();
if(hVisible&&hBar!=null)hostRect.height-=hBar.getSize().y;
if(!this.expandVertical&&contentRect.height>hostRect.height)return true;
if(this.expandVertical&&this.minHeight>hostRect.height)return true;
return false;
},"$wt.graphics.Rectangle,~B");
$_M(c$,"getOrigin",
function(){
if(this.content==null)return new $wt.graphics.Point(0,0);
var location=this.content.getLocation();
return new $wt.graphics.Point(-location.x,-location.y);
});
$_M(c$,"setOrigin",
function(origin){
this.setOrigin(origin.x,origin.y);
},"$wt.graphics.Point");
$_M(c$,"setOrigin",
function(x,y){
if(this.content==null)return;
var hBar=this.getHorizontalBar();
if(hBar!=null){
hBar.setSelection(x);
x=-hBar.getSelection();
}else{
x=0;
}var vBar=this.getVerticalBar();
if(vBar!=null){
vBar.setSelection(y);
y=-vBar.getSelection();
}else{
y=0;
}this.content.setLocation(x,y);
},"~N,~N");
$_M(c$,"setAlwaysShowScrollBars",
function(show){
if(show==this.alwaysShowScroll)return;
this.alwaysShowScroll=show;
var hBar=this.getHorizontalBar();
if(hBar!=null&&this.alwaysShowScroll)hBar.setVisible(true);
var vBar=this.getVerticalBar();
if(vBar!=null&&this.alwaysShowScroll)vBar.setVisible(true);
this.layout(false);
},"~B");
$_M(c$,"setContent",
function(content){
if(this.content!=null&&!this.content.isDisposed()){
this.content.removeListener(11,this.contentListener);
this.content.setBounds(new $wt.graphics.Rectangle(-200,-200,0,0));
}this.content=content;
var vBar=this.getVerticalBar();
var hBar=this.getHorizontalBar();
if(this.content!=null){
if(vBar!=null){
vBar.setMaximum(0);
vBar.setThumb(0);
vBar.setSelection(0);
}if(hBar!=null){
hBar.setMaximum(0);
hBar.setThumb(0);
hBar.setSelection(0);
}content.setLocation(0,0);
this.layout(false);
this.content.addListener(11,this.contentListener);
}else{
if(hBar!=null)hBar.setVisible(this.alwaysShowScroll);
if(vBar!=null)vBar.setVisible(this.alwaysShowScroll);
}},"$wt.widgets.Control");
$_M(c$,"setExpandHorizontal",
function(expand){
if(expand==this.expandHorizontal)return;
this.expandHorizontal=expand;
this.layout(false);
},"~B");
$_M(c$,"setExpandVertical",
function(expand){
if(expand==this.expandVertical)return;
this.expandVertical=expand;
this.layout(false);
},"~B");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMinHeight",
function(height){
this.setMinSize(this.minWidth,height);
},"~N");
$_M(c$,"setMinSize",
function(size){
if(size==null){
this.setMinSize(0,0);
}else{
this.setMinSize(size.x,size.y);
}},"$wt.graphics.Point");
$_M(c$,"setMinSize",
function(width,height){
if(width==this.minWidth&&height==this.minHeight)return;
this.minWidth=Math.max(0,width);
this.minHeight=Math.max(0,height);
this.layout(false);
},"~N,~N");
$_M(c$,"setMinWidth",
function(width){
this.setMinSize(width,this.minHeight);
},"~N");
$_M(c$,"vScroll",
function(){
if(this.content==null)return;
var location=this.content.getLocation();
var vBar=this.getVerticalBar();
var vSelection=vBar.getSelection();
this.content.setLocation(location.x,-vSelection);
});
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
});
