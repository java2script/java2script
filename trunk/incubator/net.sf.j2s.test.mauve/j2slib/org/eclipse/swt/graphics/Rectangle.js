$_L(["$wt.internal.SerializableCompatibility"],"$wt.graphics.Rectangle",null,function(){
c$=$_C(function(){
this.x=0;
this.y=0;
this.width=0;
this.height=0;
$_Z(this,arguments);
},$wt.graphics,"Rectangle",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(x,y,width,height){
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},"~N,~N,~N,~N");
$_M(c$,"add",
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
this.x=left;
this.y=top;
this.width=right-left;
this.height=bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"contains",
function(x,y){
return(x>=this.x)&&(y>=this.y)&&((x-this.x)<this.width)&&((y-this.y)<this.height);
},"~N,~N");
$_M(c$,"contains",
function(pt){
return this.contains(pt.x,pt.y);
},"$wt.graphics.Point");
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.graphics.Rectangle)))return false;
var r=object;
return(r.x==this.x)&&(r.y==this.y)&&(r.width==this.width)&&(r.height==this.height);
},"~O");
$_V(c$,"hashCode",
function(){
return this.x^this.y^this.width^this.height;
});
$_M(c$,"intersect",
function(rect){
if(this===rect)return;
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
this.x=right<left?0:left;
this.y=bottom<top?0:top;
this.width=right<left?0:right-left;
this.height=bottom<top?0:bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"intersection",
function(rect){
if(this===rect)return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
return new $wt.graphics.Rectangle(right<left?0:left,bottom<top?0:top,right<left?0:right-left,bottom<top?0:bottom-top);
},"$wt.graphics.Rectangle");
$_M(c$,"intersects",
function(x,y,width,height){
return(x<this.x+this.width)&&(y<this.y+this.height)&&(x+width>this.x)&&(y+height>this.y);
},"~N,~N,~N,~N");
$_M(c$,"intersects",
function(rect){
return rect===this||this.intersects(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"isEmpty",
function(){
return(this.width<=0)||(this.height<=0);
});
$_V(c$,"toString",
function(){
return"Rectangle {"+this.x+", "+this.y+", "+this.width+", "+this.height+"}";
});
$_M(c$,"union",
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
return new $wt.graphics.Rectangle(left,top,right-left,bottom-top);
},"$wt.graphics.Rectangle");
});
