$_L(["$wt.graphics.Resource"],"$wt.graphics.Font",["$wt.graphics.Device","$.FontData"],function(){
c$=$_C(function(){
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Font",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.Font,[]);
});
$_K(c$,
function(device,fd){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,fd);
},"$wt.graphics.Device,$wt.graphics.FontData");
$_K(c$,
function(device,fds){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
for(var i=0;i<fds.length;i++){
}
this.init(device,fds[0]);
},"$wt.graphics.Device,~A");
$_K(c$,
function(device,name,height,style){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,new $wt.graphics.FontData(name,height,style));
},"$wt.graphics.Device,~S,~N,~N");
$_V(c$,"dispose",
function(){
this.data=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.graphics.Font)))return false;
var font=object;
return font.data.equals(this.data);
},"~O");
$_M(c$,"getFontData",
function(){
var datum=new Array(1);
datum[0]=this.data;
return datum;
});
$_V(c$,"hashCode",
function(){
return this.data.hashCode();
});
$_M(c$,"init",
function(device,fd){
this.data=fd;
this.device=device;
},"$wt.graphics.Device,$wt.graphics.FontData");
$_V(c$,"isDisposed",
function(){
return this.data==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Font {*DISPOSED*}";
return"Font {"+this.data+"}";
});
});
