$_L(["$wt.graphics.Drawable","$.Resource"],"$wt.graphics.Image",["$wt.graphics.Color","$.Device","$.ImageData","$.Rectangle","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.url=null;
this.hash=0;
this.packedURL=null;
this.packedOffsetX=0;
this.packedOffsetY=0;
this.packedItemWidth=0;
this.packedItemHeight=0;
this.width=0;
this.height=0;
this.type=0;
this.handle=null;
this.gcDrawn=false;
this.drawings=null;
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
},"$wt.graphics.Device,~N,~N");
$_M(c$,"setSize",
function(width,height){
this.width=width;
this.height=height;
},"~N,~N");
$_K(c$,
function(device,srcImage,flag){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.url=srcImage.url;
this.hash=srcImage.hash;
this.width=srcImage.width;
this.height=srcImage.height;
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
this.hash=data.hash;
this.width=data.width;
this.height=data.height;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(device,source,mask){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=source.url;
this.hash=source.hash;
this.width=source.width;
this.height=source.height;
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
if(object===this)return true;
if(!($_O(object,$wt.graphics.Image)))return false;
var image=object;
return this.device===image.device&&this.handle===image.handle;
},"~O");
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.device,"white");
});
$_M(c$,"getBounds",
function(){
if(this.width==0||this.height==0){
return new $wt.graphics.Rectangle(0,0,16,16);
}return new $wt.graphics.Rectangle(0,0,this.width,this.height);
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
$_M(c$,"draw",
function(handle){
O$.clearChildren(handle);
if(this.drawings!=null){
var rect=null;
for(var i=0;i<this.drawings.length;i++){
var drawing=this.drawings[i];
var type=drawing[0];
switch(type){
case 1:
rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left=drawing[1]+"px";
if(O$.isFirefox&&handle.nodeName==="BUTTON"){
rect.style.top=(drawing[2]-Math.floor(drawing[4]/2)-3)+"px";
}else{
rect.style.top=drawing[2]+"px";
}rect.style.width=drawing[3]+"px";
rect.style.height=drawing[4]+"px";
rect.style.borderColor=""+drawing[5];
rect.style.borderStyle="solid";
rect.style.borderWidth="1px";
handle.appendChild(rect);
break;
case 2:
rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left=drawing[1]+"px";
if(O$.isFirefox){
rect.style.top=(drawing[2]-Math.floor(drawing[4]/2)-1)+"px";
}else{
rect.style.top=drawing[2]+"px";
}rect.style.width=drawing[3]+"px";
rect.style.height=drawing[4]+"px";
rect.style.backgroundColor=""+drawing[5];
handle.appendChild(rect);
break;
default:
;}
}
}else{
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0";
rect.style.left="0px";
rect.style.top="0px";
rect.style.width=this.width+"px";
rect.style.height=this.height+"px";
rect.style.backgroundColor="black";
handle.appendChild(rect);
}},"Element");
$_S(c$,
"DEFAULT_SCANLINE_PAD",4);
});
