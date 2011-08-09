$_L(["$wt.widgets.Canvas"],"$wt.custom.CLabel",["$wt.events.DisposeListener","$wt.graphics.Color","$.Point","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.custom.CLabel", ".clabel-icon {\nposition:absolute;\nbackground-position:center center;\nbackground-repeat:no-repeat;\nz-index:2;\n}\n.clabel-text {\ncursor:default;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nz-index:3;\n}\n.clabel-line {\nz-index:4;\n}\n.clabel-border {\nborder-style:solid;\nborder-width:1px;\nfont-size:0;\nposition:absolute;\n}\n.clabel-background {\nposition:absolute;\nfont-size:0;\nmargin:0;\npadding:0;\nz-index:1;\n}\n.clabel-background-block {\nposition:absolute;\nfont-size:0;\nmargin:0;\npadding:0;\nz-index:0;\n}\n.swt-custom-clabel {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.align = 16384;
this.hIndent = 3;
this.vIndent = 3;
this.text = null;
this.image = null;
this.appToolTipText = null;
this.backgroundImage = null;
this.gradientColors = null;
this.gradientPercents = null;
this.gradientVertical = false;
this.$background = null;
this.imageHandle = null;
this.textHandle = null;
this.bgHandle = null;
this.$borderHandle = null;
$_Z (this, arguments);
}, $wt.custom, "CLabel", $wt.widgets.Canvas);
$_K (c$, 
function (parent, style) {
$_R (this, $wt.custom.CLabel, [parent, $wt.custom.CLabel.checkStyle (style)]);
if ((style & (16908288)) == 0) style |= 16384;
if ((style & 16777216) != 0) this.align = 16777216;
if ((style & 131072) != 0) this.align = 131072;
if ((style & 16384) != 0) this.align = 16384;
this.addDisposeListener ((($_D ("$wt.custom.CLabel$1") ? 0 : org.eclipse.swt.custom.CLabel.$CLabel$1$ ()), $_N ($wt.custom.CLabel$1, this, null)));
}, "$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
if((style&2048)!=0)style|=4;
var mask=100663340;
style=style&mask;
style|=524288;
return style|262144;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var e=this.getTotalSize(this.image,this.text);
if(wHint==-1){
e.x+=2*this.hIndent;
}else{
e.x=wHint;
}if(hHint==-1){
e.y+=2*this.vIndent;
}else{
e.y=hHint;
}return e;
},"~N,~N,~B");
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"getAlignment",
function(){
return this.align;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getTotalSize",
($fz=function(image,text){
var size=new $wt.graphics.Point(0,0);
if(image!=null){
var r=image.getBounds();
if(r.width==0&&r.height==0){
r.width=16;
r.height=16;
}size.x+=r.width;
size.y+=r.height;
}if(text!=null&&text.length>0){
var e=this.textExtent(text,$wt.custom.CLabel.DRAW_FLAGS);
size.x+=e.x;
size.y=Math.max(size.y,e.y);
if(image!=null)size.x+=5;
}else{
size.y=Math.max(size.y,O$.getStringStyledHeight("A","clabel-text",null));
}return size;
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~S");
$_M(c$,"textExtent",
($fz=function(text,flags){
return O$.getStringStyledSize(text,"clabel-text",null);
},$fz.isPrivate=true,$fz),"~S,~N");
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CLabel,"getStyle",[]);
switch(this.align){
case 131072:
style|=131072;
break;
case 16777216:
style|=16777216;
break;
case 16384:
style|=16384;
break;
}
return style;
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"getToolTipText",
function(){
return this.appToolTipText;
});
$_M(c$,"onDispose",
function(event){
this.gradientColors=null;
this.gradientPercents=null;
this.backgroundImage=null;
this.text=null;
this.image=null;
this.appToolTipText=null;
},"$wt.events.DisposeEvent");
$_M(c$,"redraw",
function(){
$_U(this,$wt.custom.CLabel,"redraw",[]);
if(this.image!=null){
if(this.imageHandle==null){
this.imageHandle=d$.createElement("DIV");
this.imageHandle.className="clabel-icon";
if(this.textHandle!=null){
this.containerHandle().insertBefore(this.imageHandle,this.textHandle);
}else{
this.containerHandle().appendChild(this.imageHandle);
}}}else{
if(this.imageHandle!=null){
O$.destroyHandle(this.imageHandle);
this.imageHandle=null;
}}if(this.text!=null){
if(this.textHandle==null){
this.textHandle=d$.createElement("DIV");
this.textHandle.className="clabel-text";
this.containerHandle().appendChild(this.textHandle);
O$.setTextSelection(this.textHandle,false);
}O$.clearChildren(this.textHandle);
}else{
if(this.textHandle!=null){
O$.clearChildren(this.textHandle);
}}if(this.bgHandle!=null){
O$.clearChildren(this.bgHandle);
}this.onPaint(null);
});
$_M(c$,"onPaint",
function(event){
var rect=this.getClientArea();
if(rect.width==0||rect.height==0)return;
var shortenText=false;
var t=this.text;
var img=this.image;
var availableWidth=Math.max(0,rect.width-2*this.hIndent);
var extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
img=null;
extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
shortenText=true;
}}var lines=this.text==null?null:this.splitString(this.text);
if(shortenText){
extent.x=0;
for(var i=0;i<lines.length;i++){
var e=this.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS);
if(e.x>availableWidth){
lines[i]=this.shortenText(lines[i],availableWidth);
extent.x=Math.max(extent.x,this.getTotalSize(null,lines[i]).x);
}else{
extent.x=Math.max(extent.x,e.x);
}}
if(this.appToolTipText==null){
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.text]);
}}else{
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.appToolTipText]);
}var x=rect.x+this.hIndent;
if(this.align==16777216){
x=Math.floor((rect.width-extent.x)/2);
}if(this.align==131072){
x=rect.width-this.hIndent-extent.x;
}try{
if(this.backgroundImage!=null){
var imageRect=this.backgroundImage.getBounds();
var xPos=0;
while(xPos<rect.width){
var yPos=0;
while(yPos<rect.height){
yPos+=imageRect.height;
}
xPos+=imageRect.width;
}
}else if(this.gradientColors!=null){
var oldBackground=this.getComputedBackground();
if(this.gradientColors.length==1){
if(this.gradientColors[0]!=null)this.setBackground(this.gradientColors[0]);
}else{
var lastColor=this.gradientColors[0];
if(lastColor==null)lastColor=oldBackground;
var pos=0;
for(var i=0;i<this.gradientPercents.length;++i){
var lastColorOld=lastColor;
lastColor=this.gradientColors[i+1];
if(lastColor==null)lastColor=oldBackground;
if(this.gradientVertical){
var gradientHeight=(Math.floor(this.gradientPercents[i]*rect.height/100))-pos;
this.fillGradientRectangle(0,pos,rect.width,gradientHeight,true,lastColorOld,lastColor);
pos+=gradientHeight;
}else{
var gradientWidth=(Math.floor(this.gradientPercents[i]*rect.width/100))-pos;
this.fillGradientRectangle(pos,0,gradientWidth,rect.height,false,lastColorOld,lastColor);
pos+=gradientWidth;
}}
if(this.gradientVertical&&pos<rect.height){
this.fillRectangle(0,pos,rect.width,rect.height-pos,oldBackground);
}if(!this.gradientVertical&&pos<rect.width){
this.fillRectangle(pos,0,rect.width-pos,rect.height,oldBackground);
}}}else{
if((this.getStyle()&262144)!=0){
this.fillRectangle(rect.x,rect.y,rect.width,rect.height,this.getBackground());
}}}catch(e){
if($_O(e,$wt.SWTException)){
if((this.getStyle()&262144)!=0){
this.fillRectangle(rect.x,rect.y,rect.width,rect.height,this.getBackground());
}}else{
throw e;
}
}
var style=this.getStyle();
if((style&4)!=0||(style&8)!=0){
this.paintBorder(rect);
}if(img!=null){
var imageRect=img.getBounds();
if(imageRect.width==0&&imageRect.height==0){
imageRect.width=16;
imageRect.height=16;
}this.drawImage(img,0,0,imageRect.width,imageRect.height,x,Math.floor((rect.height-imageRect.height)/2),imageRect.width,imageRect.height);
x+=imageRect.width+5;
extent.x-=imageRect.width+5;
}else{
if(this.imageHandle!=null){
this.imageHandle.style.display="none";
}}if(lines!=null){
var lineHeight=O$.getStringStyledHeight("A","clabel-text",null);
var textHeight=lines.length*lineHeight;
var lineY=Math.max(this.vIndent,rect.y+Math.floor((rect.height-textHeight)/2));
for(var i=0;i<lines.length;i++){
var lineX=x;
if(lines.length>1){
if(this.align==16777216){
var lineWidth=this.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=x+Math.max(0,Math.floor((extent.x-lineWidth)/2));
}if(this.align==131072){
var lineWidth=this.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=Math.max(x,rect.x+rect.width-this.hIndent-lineWidth);
}}this.drawText(lines[i],lineX,lineY,$wt.custom.CLabel.DRAW_FLAGS);
lineY+=lineHeight;
}
}},"$wt.events.PaintEvent");
$_M(c$,"getComputedBackground",
($fz=function(){
var bg=null;
{
if(O$.isIE){


var oRG=document.body.createTextRange();
oRG.moveToElementText(this.handle);
var iClr=oRG.queryCommandValue("BackColor");
bg="rgb("+(iClr&0xFF)+", "+((iClr&0xFF00)>>8)+", "+((iClr&0xFF0000)>>16)+")";
}else{
bg=document.defaultView.getComputedStyle(this.handle,null).backgroundColor;
}
}if(bg==null||(""+bg).length==0){
return new $wt.graphics.Color(this.display,"menu");
}return new $wt.graphics.Color(this.display,bg);
},$fz.isPrivate=true,$fz));
$_M(c$,"fillRectangle",
($fz=function(x,y,width,height,oldBackground){
if(this.bgHandle==null){
this.bgHandle=d$.createElement("DIV");
this.bgHandle.className="clabel-background";
this.containerHandle().appendChild(this.bgHandle);
}var block=d$.createElement("DIV");
block.style.backgroundColor=oldBackground.getCSSHandle();
block.className="clabel-background-block";
block.style.left=x+"px";
block.style.top=y+"px";
block.style.width=width+"px";
block.style.height=height+"px";
this.bgHandle.appendChild(block);
},$fz.isPrivate=true,$fz),"~N,~N,~N,~N,$wt.graphics.Color");
$_M(c$,"fillGradientRectangle",
($fz=function(x,y,width,height,vertical,colorBegin,colorEnd){
var gradientSteps=7;
{
var steps=window["swt.clabel.gradient.steps"];
if(steps!=null&&!isNaN(steps)){
gradientSteps=steps;
}
}var inc=0;
var r1=colorBegin.getRed();
var r2=colorEnd.getRed();
var g1=colorBegin.getGreen();
var g2=colorEnd.getGreen();
var b1=colorBegin.getBlue();
var b2=colorEnd.getBlue();
for(var i=0;i<gradientSteps+1;i++){
var red=r1+Math.floor(i*(r2-r1)/gradientSteps);
var green=g1+Math.floor(i*(g2-g1)/gradientSteps);
var blue=b1+Math.floor(i*(b2-b1)/gradientSteps);
var color=new $wt.graphics.Color(null,red,green,blue);
var delta=-1;
if(vertical){
delta=i==gradientSteps?height-inc:Math.floor((i+1)*height/(gradientSteps+1))-inc;
this.fillRectangle(x,y+inc,width,delta,color);
}else{
delta=i==gradientSteps?width-inc:Math.floor((i+1)*width/(gradientSteps+1))-inc;
this.fillRectangle(x+inc,y,delta,height,color);
}inc+=delta;
}
},$fz.isPrivate=true,$fz),"~N,~N,~N,~N,~B,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"drawImage",
($fz=function(img,i,j,width,height,x,y,width2,height2){
this.imageHandle.style.backgroundImage="url('"+img.url+"')";
this.imageHandle.style.width=width+"px";
this.imageHandle.style.height=width+"px";
this.imageHandle.style.left=x+"px";
this.imageHandle.style.top=y+"px";
this.imageHandle.style.display="";
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawText",
($fz=function(string,lineX,lineY,flags){
var lineEl=d$.createElement("DIV");
lineEl.className="clabel-line";
lineEl.appendChild(d$.createTextNode(string));
lineEl.style.left=lineX+"px";
lineEl.style.top=lineY+"px";
lineEl.style.position="absolute";
this.textHandle.appendChild(lineEl);
},$fz.isPrivate=true,$fz),"~S,~N,~N,~N");
$_M(c$,"paintBorder",
($fz=function(r){
var disp=this.getDisplay();
var c1=null;
var c2=null;
var style=this.getStyle();
if((style&4)!=0){
c1=disp.getSystemColor(18);
c2=disp.getSystemColor(20);
}if((style&8)!=0){
c1=disp.getSystemColor(19);
c2=disp.getSystemColor(18);
}if(c1!=null&&c2!=null){
this.drawBevelRect(r.x,r.y,r.width-1,r.height-1,c1,c2);
}},$fz.isPrivate=true,$fz),"$wt.graphics.Rectangle");
$_M(c$,"drawBevelRect",
($fz=function(x,y,width,height,c1,c2){
if(this.$borderHandle==null){
this.$borderHandle=d$.createElement("DIV");
this.$borderHandle.className="clabel-border";
this.containerHandle().appendChild(this.$borderHandle);
}this.$borderHandle.style.left=x+"px";
this.$borderHandle.style.top=y+"px";
if(O$.isIE50||O$.isIE55||O$.isIE60){
width+=1;
height+=1;
}this.$borderHandle.style.width=(width-1)+"px";
this.$borderHandle.style.height=(height-1)+"px";
this.$borderHandle.style.borderLeftColor=c1.getCSSHandle();
this.$borderHandle.style.borderTopColor=c1.getCSSHandle();
this.$borderHandle.style.borderRightColor=c2.getCSSHandle();
this.$borderHandle.style.borderBottomColor=c2.getCSSHandle();
},$fz.isPrivate=true,$fz),"~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"setAlignment",
function(align){
if(this.align!=align){
this.align=align;
this.redraw();
}},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CLabel,"setBackground",[color]);
if(this.backgroundImage==null&&this.gradientColors==null&&this.gradientPercents==null){
if(color==null){
if(this.$background==null)return;
}else{
if(color.equals(this.$background))return;
}}this.$background=color;
this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}for(var i=0;i<percents.length;i++){
}
}var background=this.getComputedBackground();
if(this.backgroundImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
same=(this.gradientColors[i]===colors[i])||((this.gradientColors[i]==null)&&(colors[i]===background))||((this.gradientColors[i]===background)&&(colors[i]==null));
if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.backgroundImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i)this.gradientColors[i]=(colors[i]!=null)?colors[i]:background;

this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i)this.gradientPercents[i]=percents[i];

this.gradientVertical=vertical;
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image===this.backgroundImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.backgroundImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.custom.CLabel,"setFont",[font]);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
if(image!==this.image){
this.image=image;
this.redraw();
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(text){
if(text==null)text="";
if(!text.equals(this.text)){
this.text=text;
this.redraw();
}},"~S");
$_M(c$,"setToolTipText",
function(string){
$_U(this,$wt.custom.CLabel,"setToolTipText",[string]);
this.appToolTipText=$_U(this,$wt.custom.CLabel,"getToolTipText",[]);
},"~S");
$_M(c$,"shortenText",
function(t,width){
if(t==null)return null;
var w=this.textExtent("...",$wt.custom.CLabel.DRAW_FLAGS).x;
var l=t.length;
var pivot=Math.floor(l/2);
var s=pivot;
var e=pivot+1;
while(s>=0&&e<l){
var s1=t.substring(0,s);
var s2=t.substring(e,l);
var l1=this.textExtent(s1,$wt.custom.CLabel.DRAW_FLAGS).x;
var l2=this.textExtent(s2,$wt.custom.CLabel.DRAW_FLAGS).x;
if(l1+w+l2<width){
t=s1+"..."+s2;
break;
}s--;
e++;
}
return t;
},"~S,~N");
$_M(c$,"splitString",
($fz=function(text){
var lines=new Array(1);
var start=0;
var pos;
do{
pos=text.indexOf('\n',start);
if(pos==-1){
lines[lines.length-1]=text.substring(start);
}else{
var crlf=(pos>0)&&((text.charAt(pos-1)).charCodeAt(0)==('\r').charCodeAt(0));
lines[lines.length-1]=text.substring(start,pos-(crlf?1:0));
start=pos+1;
var newLines=new Array(lines.length+1);
System.arraycopy(lines,0,newLines,0,lines.length);
lines=newLines;
}}while(pos!=-1);
return lines;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"SetWindowPos",
function(wnd,wndInsertAfter,X,Y,cx,cy,flags){
var ok=$_U(this,$wt.custom.CLabel,"SetWindowPos",[wnd,wndInsertAfter,X,Y,cx,cy,flags]);
if(ok){
this.redraw();
}return ok;
},"~O,~O,~N,~N,~N,~N,~N");
c$.$CLabel$1$=function(){
$_H();
c$=$_W($wt.custom,"CLabel$1",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(event){
this.b$["$wt.custom.CLabel"].onDispose(event);
},"$wt.events.DisposeEvent");
c$=$_P();
};
$_S(c$,
"GAP",5,
"INDENT",3,
"ELLIPSIS","...",
"DRAW_FLAGS",15);
});
