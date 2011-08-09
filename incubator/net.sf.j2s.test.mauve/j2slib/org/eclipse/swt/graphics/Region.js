$_L(["$wt.graphics.Resource"],"$wt.graphics.Region",["$wt.graphics.Device"],function(){
c$=$_C(function(){
this.handle=0;
$_Z(this,arguments);
},$wt.graphics,"Region",$wt.graphics.Resource);
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(device){
$_R(this,$wt.graphics.Region,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
},"$wt.graphics.Device");
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Region,[]);
this.device=device;
this.handle=handle;
},"$wt.graphics.Device,~N");
$_M(c$,"add",
function(pointArray){
},"~A");
$_M(c$,"add",
function(rect){
this.add(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"add",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"add",
function(region){
},"$wt.graphics.Region");
$_M(c$,"contains",
function(x,y){
return false;
},"~N,~N");
$_M(c$,"contains",
function(pt){
return this.contains(pt.x,pt.y);
},"$wt.graphics.Point");
$_V(c$,"dispose",
function(){
if(this.handle==0)return;
if(this.device.isDisposed())return;
this.handle=0;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(this===object)return true;
if(!($_O(object,$wt.graphics.Region)))return false;
var rgn=object;
return this.handle==rgn.handle;
},"~O");
$_M(c$,"getBounds",
function(){
return null;
});
$_V(c$,"hashCode",
function(){
return this.handle;
});
$_M(c$,"intersect",
function(rect){
this.intersect(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"intersect",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"intersect",
function(region){
},"$wt.graphics.Region");
$_M(c$,"intersects",
function(x,y,width,height){
return false;
},"~N,~N,~N,~N");
$_M(c$,"intersects",
function(rect){
return this.intersects(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_V(c$,"isDisposed",
function(){
return this.handle==0;
});
$_M(c$,"isEmpty",
function(){
return false;
});
$_M(c$,"subtract",
function(pointArray){
},"~A");
$_M(c$,"subtract",
function(rect){
this.subtract(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"subtract",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"subtract",
function(region){
},"$wt.graphics.Region");
$_M(c$,"translate",
function(x,y){
},"~N,~N");
$_M(c$,"translate",
function(pt){
this.translate(pt.x,pt.y);
},"$wt.graphics.Point");
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Region {*DISPOSED*}";
return"Region {"+this.handle+"}";
});
c$.win32_new=$_M(c$,"win32_new",
function(device,handle){
return new $wt.graphics.Region(device,handle);
},"$wt.graphics.Device,~N");
});
