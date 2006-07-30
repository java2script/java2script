$_L(["java.io.Serializable"],"$wt.internal.SerializableCompatibility",null,function(){
$_I($wt.internal,"SerializableCompatibility",java.io.Serializable);
});
$_L(["java.lang.Cloneable"],"$wt.internal.CloneableCompatibility",null,function(){
$_I($wt.internal,"CloneableCompatibility",Cloneable);
});
$_L(["java.lang.Runnable"],"$wt.internal.RunnableCompatibility",null,function(){
c$=$_C(function(){
this.returnSet=0;
this.returnBoolean=false;
this.returnNumber=0;
this.returnObject=null;
this.event=null;
$_Z(this,arguments);
},$wt.internal,"RunnableCompatibility",null,Runnable);
$_M(c$,"getEvent",
function(){
return this.event;
});
$_M(c$,"setEvent",
function(event){
this.event=event;
},"~O");
$_M(c$,"toReturn",
function(val){
this.returnSet=1;
this.returnNumber=val;
this.returnObject=null;
},"~N");
$_M(c$,"toReturn",
function(val){
this.returnSet=2;
this.returnBoolean=val;
this.returnNumber=0;
this.returnObject=null;
},"~B");
$_M(c$,"toReturn",
function(val){
this.returnSet=3;
this.returnObject=val;
this.returnNumber=0;
this.returnBoolean=false;
},"~O");
$_M(c$,"isReturned",
function(){
return this.returnSet!=0;
});
});
c$=$_C(function(){
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=false;
this.event=null;
this.type=0;
$_Z(this,arguments);
},$wt.internal.dnd,"HTMLEventWrapper");
$_K(c$,
function(event){
this.event=event;
this.wrapEvent(event);
},"~O");
$_M(c$,"wrapEvent",
function(a){
var e=a;
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=true;
this.event=null;
this.type=0;


if(!e){
e=window.event;
this.stopPropagation=function(){
this.event.cancelBubble=true;
};
this.preventDefault=function(){
this.event.returnValue=false;
};
}else{
this.stopPropagation=function(){
this.event.stopPropagation();
};
this.preventDefault=function(){
this.event.preventDefault();
};
}
this.event=e;
this.type=e.type;
if(e.target){
this.target=e.target;
}else if(e.srcElement){
this.target=e.srcElement;
}
if(e.pageX||e.pageY){
this.x=e.pageX;
this.y=e.pageY;
}else if(e.clientX||e.clientY){
this.x=e.clientX+document.body.scrollLeft;
this.y=e.clientY+document.body.scrollTop;
}
if(e.which){
this.leftButtonHold=(e.which==1);
if(e.which==19||e.which==65536||e.which>8){
this.leftButtonHold=(org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton==1);
}else{
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=e.which;
}
}else if(e.button){
this.leftButtonHold=(e.button==1);
}
},"~O");
$_M(c$,"stopPropagation",
function(){
});
$_M(c$,"preventDefault",
function(){
});

org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=0;
$_I($wt.internal.dnd,"DragListener");
$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.DragAdapter",null,function(){
c$=$_T($wt.internal.dnd,"DragAdapter",null,$wt.internal.dnd.DragListener);
$_V(c$,"dragBegan",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
});
c$=$_C(function(){
this.event=null;
this.sourceElement=null;
this.startX=0;
this.startY=0;
this.currentX=0;
this.currentY=0;
$_Z(this,arguments);
},$wt.internal.dnd,"DragEvent");
$_K(c$,
function(evt,src,x,y){
this.event=evt;
this.sourceElement=src;
this.startX=x;
this.startY=y;
},"$wt.internal.dnd.HTMLEventWrapper,$wt.internal.xhtml.Element,~N,~N");
$_M(c$,"deltaX",
function(){
return this.currentX-this.startX;
});
$_M(c$,"deltaY",
function(){
return this.currentY-this.startY;
});
$_M(c$,"mouseMoveTo",
function(currentX,currentY){
this.currentX=currentX;
this.currentY=currentY;
},"~N,~N");
$_V(c$,"toString",
function(){
return"DragEvent {"+this.sourceElement+"#"+"("+this.startX+","+this.startY+")->"+"("+this.currentX+","+this.currentY+")}";
});
c$=$_C(function(){
this.hwnd=null;
this.hwndInsertAfter=null;
this.x=0;
this.y=0;
this.cx=0;
this.cy=0;
this.flags=0;
$_Z(this,arguments);
},$wt.internal.struct,"WINDOWPOS");
$_S(c$,
"sizeof",28);
c$=$_C(function(){
this.defer=false;
this.control=null;
this.type=0;
this.data=null;
$_Z(this,arguments);
},$wt.internal.struct,"MESSAGE");
$_K(c$,
function(control,type,data){
this.control=control;
this.type=type;
this.data=data;
},"$wt.widgets.Control,~N,~O");
$_S(c$,
"CONTROL_RESIZE",1,
"CONTROL_LAYOUT",2);
$_L(["java.util.Vector"],"$wt.accessibility.Accessible",["$wt.SWT"],function(){
c$=$_C(function(){
this.accessibleListeners=null;
this.accessibleControlListeners=null;
this.textListeners=null;
this.control=null;
$_Z(this,arguments);
},$wt.accessibility,"Accessible");
$_Y(c$,function(){
this.accessibleListeners=new java.util.Vector();
this.accessibleControlListeners=new java.util.Vector();
this.textListeners=new java.util.Vector();
});
$_M(c$,"addAccessibleListener",
function(listener){
this.accessibleListeners.addElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"addAccessibleControlListener",
function(listener){
this.accessibleControlListeners.addElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"addAccessibleTextListener",
function(listener){
this.textListeners.addElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"removeAccessibleListener",
function(listener){
this.accessibleListeners.removeElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"removeAccessibleControlListener",
function(listener){
this.accessibleControlListeners.removeElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"removeAccessibleTextListener",
function(listener){
this.textListeners.removeElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"selectionChanged",
function(){
});
$_M(c$,"setFocus",
function(childID){
},"~N");
$_M(c$,"textCaretMoved",
function(index){
},"~N");
$_M(c$,"textChanged",
function(type,startIndex,length){
},"~N,~N,~N");
$_M(c$,"textSelectionChanged",
function(){
});
});
$_L(["$wt.internal.SerializableCompatibility"],"$wt.graphics.Point",null,function(){
c$=$_C(function(){
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.graphics,"Point",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(x,y){
this.x=x;
this.y=y;
},"~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Point)))return false;
var p=object;
return(p.x==this.x)&&(p.y==this.y);
},"~O");
$_V(c$,"hashCode",
function(){
return this.x^this.y;
});
$_V(c$,"toString",
function(){
return"Point {"+this.x+", "+this.y+"}";
});
});
$_L(["$wt.internal.SerializableCompatibility"],"$wt.graphics.Rectangle",["$wt.SWT"],function(){
c$=$_C(function(){
this.x=0;
this.y=0;
this.width=0;
this.height=0;
$_Z(this,arguments);
},$wt.graphics,"Rectangle",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(x,y,width,height){
this.x=x;
this.y=y;
this.width=width;
this.height=height;
},"~N,~N,~N,~N");
$_M(c$,"add",
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
this.x=left;
this.y=top;
this.width=right-left;
this.height=bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"contains",
function(x,y){
return(x>=this.x)&&(y>=this.y)&&((x-this.x)<this.width)&&((y-this.y)<this.height);
},"~N,~N");
$_M(c$,"contains",
function(pt){
return this.contains(pt.x,pt.y);
},"$wt.graphics.Point");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Rectangle)))return false;
var r=object;
return(r.x==this.x)&&(r.y==this.y)&&(r.width==this.width)&&(r.height==this.height);
},"~O");
$_V(c$,"hashCode",
function(){
return this.x^this.y^this.width^this.height;
});
$_M(c$,"intersect",
function(rect){
if(this==rect)return;
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
this.x=right<left?0:left;
this.y=bottom<top?0:top;
this.width=right<left?0:right-left;
this.height=bottom<top?0:bottom-top;
},"$wt.graphics.Rectangle");
$_M(c$,"intersection",
function(rect){
if(this==rect)return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
var left=this.x>rect.x?this.x:rect.x;
var top=this.y>rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs<rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs<rhs?lhs:rhs;
return new $wt.graphics.Rectangle(right<left?0:left,bottom<top?0:top,right<left?0:right-left,bottom<top?0:bottom-top);
},"$wt.graphics.Rectangle");
$_M(c$,"intersects",
function(x,y,width,height){
return(x<this.x+this.width)&&(y<this.y+this.height)&&(x+width>this.x)&&(y+height>this.y);
},"~N,~N,~N,~N");
$_M(c$,"intersects",
function(rect){
return rect==this||this.intersects(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"isEmpty",
function(){
return(this.width<=0)||(this.height<=0);
});
$_V(c$,"toString",
function(){
return"Rectangle {"+this.x+", "+this.y+", "+this.width+", "+this.height+"}";
});
$_M(c$,"union",
function(rect){
var left=this.x<rect.x?this.x:rect.x;
var top=this.y<rect.y?this.y:rect.y;
var lhs=this.x+this.width;
var rhs=rect.x+rect.width;
var right=lhs>rhs?lhs:rhs;
lhs=this.y+this.height;
rhs=rect.y+rect.height;
var bottom=lhs>rhs?lhs:rhs;
return new $wt.graphics.Rectangle(left,top,right-left,bottom-top);
},"$wt.graphics.Rectangle");
});
$_L(["$wt.internal.SerializableCompatibility"],"$wt.graphics.RGB",["$wt.SWT"],function(){
c$=$_C(function(){
this.red=0;
this.green=0;
this.blue=0;
$_Z(this,arguments);
},$wt.graphics,"RGB",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(red,green,blue){
this.red=red;
this.green=green;
this.blue=blue;
},"~N,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.RGB)))return false;
var rgb=object;
return(rgb.red==this.red)&&(rgb.green==this.green)&&(rgb.blue==this.blue);
},"~O");
$_V(c$,"hashCode",
function(){
return(this.blue<<16)|(this.green<<8)|this.red;
});
$_V(c$,"toString",
function(){
return"RGB {"+this.red+", "+this.green+", "+this.blue+"}";
});
});
c$=$_C(function(){
this.device=null;
$_Z(this,arguments);
},$wt.graphics,"Resource");
$_L(["$wt.graphics.Resource"],"$wt.graphics.Color",["$wt.SWT","$wt.graphics.Device","$.RGB"],function(){
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
if(object==this)return true;
if(!($_O(object,$wt.graphics.Color)))return false;
var color=object;
if(this.device!=color.device)return false;
if(this.cssHandle!=null&&color.cssHandle!=null){
return this.cssHandle==color.cssHandle;
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
if(this.cssHandle!=null)return"Color {\"" + this.cssHandle + "\"}";
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

$WT.error(4);
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
$_L(["$wt.graphics.Resource"],"$wt.graphics.Cursor",["$wt.SWT","$wt.graphics.Device"],function(){
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
$WT.error(5);
}
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
if(object==this)return true;
if(!($_O(object,$wt.graphics.Cursor)))return false;
var cursor=object;
return this.device==cursor.device&&this.handle==cursor.handle;
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
$_I($wt.graphics,"Drawable");
$_L(["$wt.graphics.Drawable"],"$wt.graphics.Device",["$wt.SWT","$wt.graphics.Color","$.DeviceData","$.Font","$.FontData","$.Point","$.Rectangle"],function(){
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
return new $wt.graphics.Color(this,pixel&0x000000FF,(pixel&0x0000FF00)>>8,(pixel&0x00FF00)>>16);
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
c$=$_C(function(){
this.debug=false;
this.tracking=false;
this.errors=null;
this.objects=null;
$_Z(this,arguments);
},$wt.graphics,"DeviceData");
$_L(null,"$wt.widgets.Monitor",["$wt.graphics.Rectangle"],function(){
c$=$_C(function(){
this.handle=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.clientX=0;
this.clientY=0;
this.clientWidth=0;
this.clientHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Monitor");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.widgets.Monitor)))return false;
var monitor=object;
return this.handle==monitor.handle;
},"~O");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"getClientArea",
function(){
return new $wt.graphics.Rectangle(this.clientX,this.clientY,this.clientWidth,this.clientHeight);
});
$_V(c$,"hashCode",
function(){
if(this.handle.id==null||this.handle.id.length==0){
var random=Math.random();
var code=Math.round(random)*1000000;
this.handle.id=""+code;
return code;
}else{
var code=Integer.parseInt(this.handle.id);
if(this.handle.id==""+code){
return code;
}else{
return this.handle.id.hashCode();
}}});
});
