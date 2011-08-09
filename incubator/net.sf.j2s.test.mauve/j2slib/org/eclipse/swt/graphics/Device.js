$_L(["$wt.graphics.Drawable"],"$wt.graphics.Device",["$wt.graphics.Color","$.DeviceData","$.Font","$.Point","$.Rectangle"],function(){
c$=$_C(function(){
this.disposed=false;
$_Z(this,arguments);
},$wt.graphics,"Device",null,$wt.graphics.Drawable);
c$.getDevice=$_M(c$,"getDevice",
function(){
return $wt.widgets.Display.getDefault();
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
this.create(data);
this.init();
},"$wt.graphics.DeviceData");
$_M(c$,"create",
function(data){
},"$wt.graphics.DeviceData");
$_M(c$,"destroy",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.release();
this.destroy();
this.disposed=true;
});
$_M(c$,"getBounds",
function(){
var width=w$.screen.availWidth;
var height=w$.screen.availHeight;
return new $wt.graphics.Rectangle(0,0,width,height);
});
$_M(c$,"getDeviceData",
function(){
var data=new $wt.graphics.DeviceData();
return data;
});
$_M(c$,"getClientArea",
function(){
return this.getBounds();
});
$_M(c$,"getDepth",
function(){
return 32;
});
$_M(c$,"getDPI",
function(){
return new $wt.graphics.Point(96,96);
});
$_M(c$,"getFontList",
function(faceName,scalable){
return new Array(0);
},"~S,~B");
$_M(c$,"getSystemColor",
function(id){
var pixel=0x02000000;
switch(id){
case 1:
pixel=0x02FFFFFF;
break;
case 2:
pixel=0x02000000;
break;
case 3:
pixel=0x020000FF;
break;
case 4:
pixel=0x02000080;
break;
case 5:
pixel=0x0200FF00;
break;
case 6:
pixel=0x02008000;
break;
case 7:
pixel=0x0200FFFF;
break;
case 8:
pixel=0x02008080;
break;
case 9:
pixel=0x02FF0000;
break;
case 10:
pixel=0x02800000;
break;
case 11:
pixel=0x02FF00FF;
break;
case 12:
pixel=0x02800080;
break;
case 13:
pixel=0x02FFFF00;
break;
case 14:
pixel=0x02808000;
break;
case 15:
pixel=0x02C0C0C0;
break;
case 16:
pixel=0x02808080;
break;
}
return new $wt.graphics.Color(this,pixel&0x000000FF,(pixel&0x0000FF00)>>8,(pixel&0x00FF0000)>>16);
},"~N");
$_M(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getWarnings",
function(){
return false;
});
$_M(c$,"init",
function(){
});
$_M(c$,"isDisposed",
function(){
return this.disposed;
});
$_M(c$,"release",
function(){
});
$_M(c$,"setWarnings",
function(warnings){
},"~B");
});
