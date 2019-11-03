$_L(["$wt.graphics.Resource"],"$wt.graphics.Transform",["$wt.graphics.Device"],function(){
c$=$_C(function(){
this.handle=0;
$_Z(this,arguments);
},$wt.graphics,"Transform",$wt.graphics.Resource);
$_K(c$,
function(device){
this.construct(device,1,0,0,1,0,0);
},"$wt.graphics.Device");
$_K(c$,
function(device,elements){
this.construct(device,$wt.graphics.Transform.checkTransform(elements)[0],elements[1],elements[2],elements[3],elements[4],elements[5]);
},"$wt.graphics.Device,~A");
$_K(c$,
function(device,m11,m12,m21,m22,dx,dy){
$_R(this,$wt.graphics.Transform,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
},"$wt.graphics.Device,~N,~N,~N,~N,~N,~N");
c$.checkTransform=$_M(c$,"checkTransform",
function(elements){
return elements;
},"~A");
$_V(c$,"dispose",
function(){
if(this.handle==0)return;
if(this.device.isDisposed())return;
});
$_M(c$,"getElements",
function(elements){
},"~A");
$_M(c$,"invert",
function(){
});
$_V(c$,"isDisposed",
function(){
return this.handle==0;
});
$_M(c$,"isIdentity",
function(){
return false;
});
$_M(c$,"multiply",
function(matrix){
},"$wt.graphics.Transform");
$_M(c$,"rotate",
function(angle){
},"~N");
$_M(c$,"scale",
function(scaleX,scaleY){
},"~N,~N");
$_M(c$,"setElements",
function(m11,m12,m21,m22,dx,dy){
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"transform",
function(pointArray){
},"~A");
$_M(c$,"translate",
function(offsetX,offsetY){
},"~N,~N");
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Transform {*DISPOSED*}";
var elements=$_A(6,0);
this.getElements(elements);
return"Transform {"+elements[0]+","+elements[1]+","+elements[2]+","+elements[3]+","+elements[4]+","+elements[5]+"}";
});
});
