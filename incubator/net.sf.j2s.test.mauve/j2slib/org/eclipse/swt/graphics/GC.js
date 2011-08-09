$_L(["$wt.graphics.Resource"],"$wt.graphics.GC",["$wt.graphics.Color","$.FontMetrics","$.Point","$.Rectangle","$wt.internal.browser.OS","$wt.widgets.Display"],function(){
c$=$_C(function(){
this.handle=null;
this.bgColor=null;
this.fgColor=null;
this.font=null;
this.drawable=null;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"GC",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.GC,[]);
});
$_K(c$,
function(drawable){
this.construct(drawable,0);
},"$wt.graphics.Drawable");
$_K(c$,
function(drawable,style){
$_R(this,$wt.graphics.GC,[]);
if($_O(drawable,$wt.widgets.Control)){
var ctrl=drawable;
this.handle=ctrl.handle;
}else if($_O(drawable,$wt.graphics.Image)){
var img=drawable;
this.handle=img.handle;
img.gcDrawn=true;
img.drawings=$_A(0,5,0);
}else{
this.handle=d$.createElement("DIV");
this.handle.style.position="absolute";
}this.drawable=drawable;
},"$wt.graphics.Drawable,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&33554432)!=0)style&=-67108865;
return style&(100663296);
},"~N");
$_M(c$,"copyArea",
function(image,x,y){
},"$wt.graphics.Image,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY){
this.copyArea(srcX,srcY,width,height,destX,destY,true);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY,paint){
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"createGdipBrush",
function(){
return 0;
});
$_M(c$,"createGdipFont",
function(){
return 0;
});
c$.createGdipFont=$_M(c$,"createGdipFont",
function(hDC,hFont){
return 0;
},"~N,~N");
$_M(c$,"createGdipPen",
function(){
return 0;
});
$_M(c$,"destroyGdipBrush",
function(brush){
},"~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.data==null||this.data.device==null||this.data.device.isDisposed())return;
});
$_M(c$,"drawArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawFocus",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"drawImage",
function(image,x,y){
if(image.handle!=null){
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}},"$wt.graphics.Image,~N,~N");
$_M(c$,"drawImage",
function(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight){
if(srcWidth==0||srcHeight==0||destWidth==0||destHeight==0)return;
this.drawImage(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,false);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawImage",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
var rect=d$.createElement("IMG");
rect.src=srcImage.url;
rect.style.position="absolute";
rect.style.fontSize="0px";
rect.style.left=destX+"px";
rect.style.top=destY+"px";
rect.style.width=destWidth+"px";
rect.style.height=destHeight+"px";
this.handle.appendChild(rect);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawIcon",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmap",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmapTransparentByClipping",
function(srcHdc,maskHdc,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight){
},"~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N");
$_M(c$,"drawBitmapMask",
function(srcImage,srcColor,srcMask,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight,offscreen){
var srcColorY=srcY;
if(srcColor==0){
srcColor=srcMask;
srcColorY+=imgHeight;
}},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N,~B");
$_M(c$,"drawLine",
function(x1,y1,x2,y2){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0px";
if(x1==x2){
rect.style.left=x1+"px";
rect.style.borderLeftStyle="solid";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
}else if(y1==y2){
rect.style.top=x1+"px";
rect.style.borderTopStyle="solid";
rect.style.left=Math.min(x1,x2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
}else{
rect.style.left=Math.min(x1,x2)+"px";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
rect.style.borderStyle="solid";
}rect.style.borderColor=this.fgColor.getCSSHandle();
rect.style.borderWidth="1px";
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"drawOval",
function(x,y,width,height){
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N");
$_M(c$,"drawPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"drawPoint",
function(x,y){
},"~N,~N");
$_M(c$,"drawPolygon",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawPolyline",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawRectangle",
function(x,y,width,height){
if($_O(this.drawable,$wt.graphics.Image)){
var drawing=$_A(5,0);
drawing[0]=1;
drawing[1]=x;
drawing[2]=y;
drawing[3]=width;
drawing[4]=height;
{
drawing[5]=this.fgColor==null?"black":this.fgColor.getCSSHandle();
}var image=this.drawable;
image.drawings[image.drawings.length]=drawing;
}},"~N,~N,~N,~N");
$_M(c$,"drawRectangle",
function(rect){
this.drawRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"drawRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
if(this.data.gdipGraphics!=0){
this.initGdip(true,false);
this.drawRoundRectangleGdip(this.data.gdipGraphics,this.data.gdipPen,x,y,width,height,arcWidth,arcHeight);
return;
}},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawString",
function(string,x,y){
this.drawString(string,x,y,false);
},"~S,~N,~N");
$_M(c$,"drawString",
function(string,x,y,isTransparent){
var length=string.length;
if(length==0)return;
if(length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if(!isTransparent){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y){
this.drawText(string,x,y,6);
},"~S,~N,~N");
$_M(c$,"drawText",
function(string,x,y,isTransparent){
var flags=6;
if(isTransparent)flags|=1;
this.drawText(string,x,y,flags);
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y,flags){
if(string.length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if((flags&1)==0){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}rect.style.color=this.fgColor.getCSSHandle();
this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~N");
$_V(c$,"equals",
function(object){
return(object===this)||(($_O(object,$wt.graphics.GC))&&(this.handle===(object).handle));
},"~O");
$_M(c$,"fillArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillGradientRectangle",
function(x,y,width,height,vertical){
if(width==0||height==0)return;
if(width==0||height==0)return;
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~B");
$_M(c$,"fillOval",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"fillPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"fillPolygon",
function(pointArray){
},"~A");
$_M(c$,"fillRectangle",
function(x,y,width,height){
if($_O(this.drawable,$wt.graphics.Image)){
var drawing=$_A(5,0);
drawing[0]=2;
drawing[1]=x;
drawing[2]=y;
drawing[3]=width;
drawing[4]=height;
{
drawing[5]=this.bgColor==null?"white":this.bgColor.getCSSHandle();
}var image=this.drawable;
image.drawings[image.drawings.length]=drawing;
}},"~N,~N,~N,~N");
$_M(c$,"fillRectangle",
function(rect){
this.fillRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"fillRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"flush",
function(){
});
$_M(c$,"getAdvanceWidth",
function(ch){
return 0;
},"~N");
$_M(c$,"getAdvanced",
function(){
return this.data.gdipGraphics!=0;
});
$_M(c$,"getAlpha",
function(){
return this.data.alpha;
});
$_M(c$,"getAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getBackground",
function(){
if(this.bgColor==null){
this.bgColor=new $wt.graphics.Color(null,"white");
}return this.bgColor;
});
$_M(c$,"getBackgroundPattern",
function(){
return this.data.backgroundPattern;
});
$_M(c$,"getCharWidth",
function(ch){
return 8;
},"~N");
$_M(c$,"getClipping",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClipping",
function(region){
},"$wt.graphics.Region");
$_M(c$,"getCodePage",
function(){
return 0;
});
$_M(c$,"getFillRule",
function(){
return 4;
});
$_M(c$,"getFont",
function(){
return null;
});
$_M(c$,"getFontMetrics",
function(){
return new $wt.graphics.FontMetrics();
});
$_M(c$,"getForeground",
function(){
if(this.fgColor==null){
this.fgColor=new $wt.graphics.Color(null,"black");
}return this.fgColor;
});
$_M(c$,"getForegroundPattern",
function(){
return this.data.foregroundPattern;
});
$_M(c$,"getInterpolation",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getLineCap",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineDash",
function(){
if(this.data.dashes==null)return null;
var dashes=$_A(this.data.dashes.length,0);
System.arraycopy(this.data.dashes,0,dashes,0,dashes.length);
return dashes;
});
$_M(c$,"getLineJoin",
function(){
var style;
var size;
return 3;
});
$_M(c$,"getLineStyle",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineWidth",
function(){
var size;
return 1;
});
$_M(c$,"getStyle",
function(){
return this.data.style;
});
$_M(c$,"getTextAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getTransform",
function(transform){
},"$wt.graphics.Transform");
$_M(c$,"getXORMode",
function(){
var rop2=0;
return false;
});
$_M(c$,"initGdip",
function(draw,fill){
},"~B,~B");
$_M(c$,"init",
function(drawable,data,hDC){
var foreground=data.foreground;
},"$wt.graphics.Drawable,$wt.graphics.GCData,~N");
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_M(c$,"isClipped",
function(){
return false;
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_M(c$,"measureSpace",
function(font,format){
return 1.0;
},"~N,~N");
$_M(c$,"setAdvanced",
function(advanced){
if(advanced&&this.data.gdipGraphics!=0)return;
if(advanced){
try{
this.initGdip(false,false);
}catch(e){
if($_O(e,$wt.SWTException)){
}else{
throw e;
}
}
}else{
}},"~B");
$_M(c$,"setAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
},"~N");
$_M(c$,"setAlpha",
function(alpha){
if(this.data.gdipGraphics==0&&(alpha&0xFF)==0xFF)return;
this.initGdip(false,false);
this.data.alpha=alpha&0xFF;
},"~N");
$_M(c$,"setBackground",
function(color){
this.bgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setBackgroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
this.initGdip(false,false);
if(this.data.gdipBrush!=0)this.destroyGdipBrush(this.data.gdipBrush);
this.data.backgroundPattern=pattern;
},"$wt.graphics.Pattern");
$_M(c$,"setClipping",
function(clipRgn){
},"~N");
$_M(c$,"setClipping",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"setClipping",
function(path){
this.setClipping(0);
},"$wt.graphics.Path");
$_M(c$,"setClipping",
function(rect){
if(rect==null){
this.setClipping(0);
}else{
this.setClipping(rect.x,rect.y,rect.width,rect.height);
}},"$wt.graphics.Rectangle");
$_M(c$,"setClipping",
function(region){
this.setClipping(region!=null?region.handle:0);
},"$wt.graphics.Region");
$_M(c$,"setFillRule",
function(rule){
},"~N");
$_M(c$,"setFont",
function(font){
if(font==null){
font=$wt.widgets.Display.getDefault().getSystemFont();
}else{
this.font=font;
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.fgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setForegroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
},"$wt.graphics.Pattern");
$_M(c$,"setInterpolation",
function(interpolation){
if(this.data.gdipGraphics==0&&interpolation==-1)return;
var mode=0;
},"~N");
$_M(c$,"setLineCap",
function(cap){
var capStyle=0;
this.setPen(-1,-1,-1,capStyle,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineDash",
function(dashes){
if(dashes!=null&&dashes.length>0){
this.data.dashes=$_A(dashes.length,0);
for(var i=0;i<dashes.length;i++){
var dash=dashes[i];
this.data.dashes[i]=dash;
}
}else{
this.data.dashes=null;
}},"~A");
$_M(c$,"setLineJoin",
function(join){
var joinStyle=0;
this.setPen(-1,-1,-1,-1,joinStyle,this.data.dashes);
},"~N");
$_M(c$,"setLineStyle",
function(lineStyle){
var style=-1;
this.setPen(-1,-1,style,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineWidth",
function(lineWidth){
this.setPen(-1,lineWidth,-1,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setPen",
function(newColor,newWidth,lineStyle,capStyle,joinStyle,dashes){
var extPen=false;
var changed=false;
},"~N,~N,~N,~N,~N,~A");
$_M(c$,"setXORMode",
function(xor){
},"~B");
$_M(c$,"setTextAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
var textMode=0;
},"~N");
$_M(c$,"setTransform",
function(transform){
if(this.data.gdipGraphics==0&&transform==null)return;
},"$wt.graphics.Transform");
$_M(c$,"stringExtent",
function(string){
var length=string.length;
if(length==0){
return new $wt.graphics.Point(0,16);
}else{
return O$.getStringPlainSize(string);
}},"~S");
$_M(c$,"textExtent",
function(string){
return this.textExtent(string,6);
},"~S");
$_M(c$,"textExtent",
function(string,flags){
if(string.length==0){
return new $wt.graphics.Point(0,16);
}else{
return O$.getStringPlainSize(string);
}},"~S,~N");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"GC {*DISPOSED*}";
return"GC {"+this.handle+"}";
});
$_S(c$,
"LINE_DOT_ZERO",[3,3],
"LINE_DASH_ZERO",[18,6],
"LINE_DASHDOT_ZERO",[9,6,3,6],
"LINE_DASHDOTDOT_ZERO",[9,3,3,3,3,3]);
});
