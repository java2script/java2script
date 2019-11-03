$_L(["$wt.widgets.Widget"],"$wt.widgets.Caret",["$wt.graphics.Point","$.Rectangle"],function(){
c$=$_C(function(){
this.parent=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.moved=false;
this.resized=false;
this.$isVisible=false;
this.image=null;
this.font=null;
$_Z(this,arguments);
},$wt.widgets,"Caret",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Caret,[parent,style]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Canvas,~N");
$_M(c$,"createWidget",
function(){
this.$isVisible=true;
if(this.parent.getCaret()==null){
this.parent.setCaret(this);
}});
$_M(c$,"getBounds",
function(){
if(this.image!=null){
var rect=this.image.getBounds();
return new $wt.graphics.Rectangle(this.x,this.y,rect.width,rect.height);
}return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"getFont",
function(){
if(this.font==null){
}return this.font;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.x,this.y);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSize",
function(){
if(this.image!=null){
var rect=this.image.getBounds();
return new $wt.graphics.Point(rect.width,rect.height);
}return new $wt.graphics.Point(this.width,this.height);
});
$_M(c$,"getVisible",
function(){
return this.$isVisible;
});
$_M(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"isFocusCaret",
function(){
return this.parent.caret===this&&this.hasFocus();
});
$_M(c$,"isVisible",
function(){
return this.$isVisible&&this.parent.isVisible()&&this.hasFocus();
});
$_M(c$,"killFocus",
function(){
});
$_M(c$,"move",
function(){
this.moved=false;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Caret,"releaseChild",[]);
if(this===this.parent.getCaret())this.parent.setCaret(null);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Caret,"releaseWidget",[]);
this.parent=null;
this.image=null;
this.font=null;
});
$_M(c$,"resize",
function(){
this.resized=false;
this.move();
});
$_M(c$,"setBounds",
function(x,y,width,height){
var samePosition=this.x==x&&this.y==y;
var sameExtent=this.width==width&&this.height==height;
if(samePosition&&sameExtent)return;
this.x=x;
this.y=y;
this.width=width;
this.height=height;
if(sameExtent){
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
}else{
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
}},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(rect){
this.setBounds(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setFocus",
function(){
});
$_M(c$,"setFont",
function(font){
this.font=font;
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
this.image=image;
if(this.$isVisible&&this.hasFocus())this.resize();
},"$wt.graphics.Image");
$_M(c$,"setLocation",
function(x,y){
if(this.x==x&&this.y==y)return;
this.x=x;
this.y=y;
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setSize",
function(width,height){
if(this.width==width&&this.height==height)return;
this.width=width;
this.height=height;
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(visible){
if(visible==this.$isVisible)return;
this.$isVisible=visible;
},"~B");
});
