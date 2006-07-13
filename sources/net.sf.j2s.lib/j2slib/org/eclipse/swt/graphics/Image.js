Clazz.load(["$wt.graphics.Drawable","$.Resource"],"$wt.graphics.Image",["$wt.SWT","$wt.graphics.Color","$.Device","$.ImageData","$.Rectangle"],function(){
c$=$_C(function(){
this.url=null;
this.width=0;
this.height=0;
this.imgHandle=null;
this.type=0;
this.handle=null;
this.transparentPixel=-1;
this.memGC=null;
this.alphaData=null;
this.alpha=-1;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Image",$wt.graphics.Resource,$wt.graphics.Drawable);
$_K(c$,
function(){
$_R(this,$wt.graphics.Image,[]);
});
$_K(c$,
function(device,width,height){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,width,height);
this.width=width;
this.height=height;
},"$wt.graphics.Device,~N,~N");
$_M(c$,"init",
function(device,width,height){
this.type=0;
this.width=width;
this.height=height;
this.handle=d$.createElement("DIV");
this.handle.style.width=width+"px";
this.handle.style.height=height+"px";
this.imgHandle=this.handle;
},"$wt.graphics.Device,~N,~N");
$_K(c$,
function(device,srcImage,flag){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.url=srcImage.url;
},"$wt.graphics.Device,$wt.graphics.Image,~N");
$_K(c$,
function(device,bounds){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.width=bounds.width;
this.height=bounds.height;
},"$wt.graphics.Device,$wt.graphics.Rectangle");
$_K(c$,
function(device,data){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=data.url;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(device,source,mask){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=source.url;
},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData");
$_K(c$,
function(device,stream){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"$wt.graphics.Device,java.io.InputStream");
$_K(c$,
function(device,filename){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=filename;
},"$wt.graphics.Device,~S");
$_V(c$,"dispose",
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Image)))return false;
var image=object;
return this.device==image.device&&this.handle==image.handle;
},"~O");
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.device,"white");
});
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,this.width,this.height);
});
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_V(c$,"isDisposed",
function(){
return false;
});
$_M(c$,"setBackground",
function(color){
},"$wt.graphics.Color");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"Image {*DISPOSED*}";
return"Image {"+this.handle+"}";
});
$_S(c$,
"DEFAULT_SCANLINE_PAD",4);
});
