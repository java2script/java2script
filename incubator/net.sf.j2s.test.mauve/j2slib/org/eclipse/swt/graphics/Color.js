$_L(["$wt.graphics.Resource"],"$wt.graphics.Color",["$wt.graphics.Device","$.RGB"],function(){
c$=$_C(function(){
this.handle=0;
this.cssHandle=null;
$_Z(this,arguments);
},$wt.graphics,"Color",$wt.graphics.Resource);
$_K(c$,
function(device,red,green,blue){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,red,green,blue);
},"$wt.graphics.Device,~N,~N,~N");
$_K(c$,
function(device,rgb){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,rgb.red,rgb.green,rgb.blue);
},"$wt.graphics.Device,$wt.graphics.RGB");
$_V(c$,"dispose",
function(){
if(this.handle==-1)return;
if(this.device.isDisposed())return;
this.handle=-1;
this.cssHandle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.graphics.Color)))return false;
var color=object;
if(this.device!==color.device)return false;
if(this.cssHandle!=null&&color.cssHandle!=null){
return this.cssHandle===color.cssHandle;
}else if(this.cssHandle!=null){
return(this.rgbHandleFromCSS(this.cssHandle)&0xFFFFFF)==(color.handle&0xFFFFFF);
}else if(color.cssHandle!=null){
return(this.rgbHandleFromCSS(color.cssHandle)&0xFFFFFF)==(this.handle&0xFFFFFF);
}else{
return(this.handle&0xFFFFFF)==(color.handle&0xFFFFFF);
}},"~O");
$_M(c$,"getBlue",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF0000)>>16;
});
$_M(c$,"getGreen",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF00)>>8;
});
$_M(c$,"getRed",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return this.handle&0xFF;
});
$_M(c$,"getRGB",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return new $wt.graphics.RGB(this.handle&0xFF,(this.handle&0xFF00)>>8,(this.handle&0xFF0000)>>16);
});
$_V(c$,"hashCode",
function(){
return this.handle;
});
$_M(c$,"init",
function(device,red,green,blue){
this.device=device;
this.handle=0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
this.cssHandle=null;
},"$wt.graphics.Device,~N,~N,~N");
$_V(c$,"isDisposed",
function(){
return this.handle==-1;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Color {*DISPOSED*}";
if(this.cssHandle!=null)return"Color {\""+this.cssHandle+"\"}";
return"Color {"+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.cssHandle=handle;
this.handle=-2;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"rgbHandleFromCSS",
($fz=function(cssHandle){
if(cssHandle==null)return 0x02000000;
var red=-1;
var green=-1;
var blue=-1;
{
cssHandle.replace(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,function($0,$1,$2,$3){
red=parseInt($1);
green=parseInt($2);
blue=parseInt($3);
return $0;
});
}if(red!=-1&&green!=-1&&blue!=-1){
return 0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
}else{
var intHandle=-2;
{
cssHandle.replace(/#([0-9a-fA-F]{3,6})/,function($0,$1){
if($1.length==3){
var r=$1.charAt(0);
var g=$1.charAt(1);
var b=$1.charAt(2);
intHandle=eval("0x"+b+b+g+g+r+r);
}else if($1.length==6){
intHandle=eval("0x"+$1.substring(4,6)+$1.substring(2,4)+$1.substring(0,2));
}else{


throw"SWT.error (4)";
}
});
}if(intHandle!=-2){
return 0x02000000|intHandle;
}else{
return 0x0F000000;
}}},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getCSSHandle",
function(){
if(this.cssHandle!=null)return this.cssHandle;
return"rgb("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+")";
});
$_M(c$,"isPlatformSpecific",
function(){
if((this.handle<0||this.handle==0x0F000000)&&this.cssHandle!=null){
return this.rgbHandleFromCSS(this.cssHandle)==0x0F000000;
}return false;
});
});
