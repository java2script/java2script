$_L(["$wt.graphics.Resource"],"$wt.graphics.Pattern",["$wt.graphics.Device"],function(){
c$=$_C(function(){
this.handle=0;
$_Z(this,arguments);
},$wt.graphics,"Pattern",$wt.graphics.Resource);
$_K(c$,
function(device,image){
$_R(this,$wt.graphics.Pattern,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
},"$wt.graphics.Device,$wt.graphics.Image");
$_K(c$,
function(device,x1,y1,x2,y2,color1,color2){
$_R(this,$wt.graphics.Pattern,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
},"$wt.graphics.Device,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_V(c$,"dispose",
function(){
if(this.handle==0)return;
if(this.device.isDisposed())return;
});
$_V(c$,"isDisposed",
function(){
return this.handle==0;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Pattern {*DISPOSED*}";
return"Pattern {"+this.handle+"}";
});
});
