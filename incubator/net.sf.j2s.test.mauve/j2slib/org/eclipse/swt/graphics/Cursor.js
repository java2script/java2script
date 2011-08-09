$_L(["$wt.graphics.Resource"],"$wt.graphics.Cursor",["$wt.graphics.Device"],function(){
c$=$_C(function(){
this.handle=null;
$_Z(this,arguments);
},$wt.graphics,"Cursor",$wt.graphics.Resource);
$_K(c$,
function(device,style){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
switch(style){
case 21:
this.handle="pointer";
break;
case 0:
this.handle="default";
break;
case 1:
this.handle="wait";
break;
case 2:
this.handle="crosshair";
break;
case 3:
this.handle="progress";
break;
case 4:
this.handle="help";
break;
case 5:
this.handle="move";
break;
case 6:
this.handle="move";
break;
case 7:
this.handle="s-resize";
break;
case 8:
this.handle="move";
break;
case 9:
this.handle="e-resize";
break;
case 10:
this.handle="n-resize";
break;
case 11:
this.handle="s-resize";
break;
case 12:
this.handle="e-resize";
break;
case 13:
this.handle="w-resize";
break;
case 14:
this.handle="ne-resize";
break;
case 15:
this.handle="se-resize";
break;
case 16:
this.handle="sw-resize";
break;
case 17:
this.handle="nw-resize";
break;
case 18:
this.handle="default";
break;
case 19:
this.handle="text";
break;
case 20:
this.handle="auto";
break;
default:
;}
},"$wt.graphics.Device,~N");
$_K(c$,
function(device,source,mask,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData,~N,~N");
$_K(c$,
function(device,source,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,~N,~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.device.isDisposed())return;
this.handle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.graphics.Cursor)))return false;
var cursor=object;
return this.device===cursor.device&&this.handle===cursor.handle;
},"~O");
$_V(c$,"hashCode",
function(){
return this.handle.hashCode();
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Cursor {*DISPOSED*}";
return"Cursor {"+this.handle+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.handle=handle;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"getCSSHandle",
function(){
return this.handle;
});
});
