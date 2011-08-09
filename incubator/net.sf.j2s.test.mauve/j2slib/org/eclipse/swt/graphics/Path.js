$_L(["$wt.graphics.Resource"],"$wt.graphics.Path",["$wt.graphics.Device"],function(){
c$=$_C(function(){
this.handle=0;
$_Z(this,arguments);
},$wt.graphics,"Path",$wt.graphics.Resource);
$_K(c$,
function(device){
$_R(this,$wt.graphics.Path,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
},"$wt.graphics.Device");
$_M(c$,"addArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"addPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"addRectangle",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"addString",
function(string,x,y,font){
var length=string.length;
var buffer=$_A(length,'\0');
string.getChars(0,length,buffer,0);
},"~S,~N,~N,$wt.graphics.Font");
$_M(c$,"close",
function(){
});
$_M(c$,"contains",
function(x,y,gc,outline){
return false;
},"~N,~N,$wt.graphics.GC,~B");
$_M(c$,"cubicTo",
function(cx1,cy1,cx2,cy2,x,y){
},"~N,~N,~N,~N,~N,~N");
$_V(c$,"dispose",
function(){
if(this.handle==0)return;
if(this.device.isDisposed())return;
this.device=null;
});
$_M(c$,"getBounds",
function(bounds){
},"~A");
$_M(c$,"getCurrentPoint",
function(point){
},"~A");
$_M(c$,"getPathData",
function(){
return null;
});
$_M(c$,"lineTo",
function(x,y){
},"~N,~N");
$_V(c$,"isDisposed",
function(){
return this.handle==0;
});
$_M(c$,"moveTo",
function(x,y){
},"~N,~N");
$_M(c$,"quadTo",
function(cx,cy,x,y){
},"~N,~N,~N,~N");
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Path {*DISPOSED*}";
return"Path {"+this.handle+"}";
});
});
