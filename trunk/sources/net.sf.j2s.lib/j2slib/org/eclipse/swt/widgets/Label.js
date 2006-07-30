$_L(["$wt.widgets.Control"],"$wt.widgets.Label",["$wt.graphics.Point","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.image=null;
this.image2=null;
$_Z(this,arguments);
},$wt.widgets,"Label",$wt.widgets.Control);
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
if((style&2)!=0){
style=$wt.widgets.Widget.checkBits(style,512,256,0,0,0,0);
return $wt.widgets.Widget.checkBits(style,8,4,32,0,0,0);
}return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
if((this.style&2)!=0){
var lineWidth=1;
if((this.style&256)!=0){
width=64;
height=lineWidth*2;
}else{
width=lineWidth*2;
height=64;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=O$.getStringStyledWrappedHeight(this.text,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=O$.getStringStyledSize(this.text,"label-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"getAlignment",
function(){
if((this.style&2)!=0)return 0;
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
if((this.style&2)!=0)return"";
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Label,"releaseWidget",[]);
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&2)!=0)return;
if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&16384)!=0){
this.handle.style.textAlign="left";
this.handle.style.backgroundPosition="left center";
}else if((this.style&16777216)!=0){
this.handle.style.textAlign="center";
this.handle.style.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.handle.style.textAlign="right";
this.handle.style.backgroundPosition="right center";
}},"~N");
$_M(c$,"setImage",
function(image){
if(image==null)return;
if((this.style&2)!=0)return;
this.image=image;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var handleStyle=this.handle.style;
if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
handleStyle.backgroundPosition="left center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}else if(this.handle.childNodes.length==0){
if(image.handle==null)return;
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}else{
if(image.handle==null)return;
var txt=this.handle.childNodes[0];
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.insertBefore(image.handle.childNodes[i],txt);
}
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.image!=null){
this.handle.style.backgroundImage="";
if(O$.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.handle.style.filter!=null){
this.handle.style.filter="";
}}if(string==this.text){
return;
}this.textSizeCached=false;
this.text=string;
var children=this.handle.childNodes;
if(children!=null){
for(var i=0;i<children.length;i++){
this.handle.removeChild(children[i]);
}
}O$.insertText(this.handle,this.text);
},"~S");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="label-default";
if((this.style&2)!=0){
if((this.style&4)!=0){
this.handle.className+=" shadow-in";
}else if((this.style&8)!=0){
this.handle.className+=" shadow-out";
}else{
this.handle.className+=" shadow-none";
}this.handle.style.fontSize="0";
var seperator1=d$.createElement("DIV");
var seperator2=d$.createElement("DIV");
if((this.style&512)!=0){
seperator1.className="label-seperator-vertical-left";
seperator2.className="label-seperator-vertical-right";
}else{
seperator1.className="label-seperator-horizontal-top";
seperator2.className="label-seperator-horizontal-bottom";
}this.handle.appendChild(seperator1);
this.handle.appendChild(seperator2);
}if((this.style&64)!=0){
this.handle.className+=" label-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" label-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Label,"setBounds",[x,y,width,height]);
if((this.style&2)!=0){
var handleStyle=this.handle.childNodes[0].style;
if((this.style&256)!=0){
var h=(Math.floor(height/2))-1;
if(O$.isIE){
h--;
}handleStyle.marginTop=h+"px";
handleStyle.width=width+"px";
this.handle.childNodes[1].style.width=width+"px";
}else{
handleStyle.marginLeft=((Math.floor(width/2))-1)+"px";
handleStyle.height=height+"px";
this.handle.childNodes[1].style.marginLeft=(Math.floor(width/2))+"px";
this.handle.childNodes[1].style.height=height+"px";
}}},"~N,~N,~N,~N");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Label,"setEnabled",[enabled]);
if(!enabled){
this.lastColor=this.handle.style.color;
this.handle.style.color="gray";
}else{
this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Label,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Label,"setFont",[font]);
},"$wt.graphics.Font");
});
