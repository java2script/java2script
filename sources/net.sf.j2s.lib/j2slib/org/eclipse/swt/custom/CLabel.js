$_L(["$wt.widgets.Canvas"],"$wt.custom.CLabel",["java.lang.Character","$wt.SWT","$wt.accessibility.AccessibleAdapter","$.AccessibleControlAdapter","$wt.events.DisposeListener","$.PaintListener","$.TraverseListener","$wt.graphics.Color","$.GC","$.Point"],function(){
c$=$_C(function(){
this.align=16384;
this.hIndent=3;
this.vIndent=3;
this.text=null;
this.image=null;
this.appToolTipText=null;
this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
$_Z(this,arguments);
},$wt.custom,"CLabel",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CLabel,[parent,$wt.custom.CLabel.checkStyle(style)]);
if((style&(16908288))==0)style|=16384;
if((style&16777216)!=0)this.align=16777216;
if((style&131072)!=0)this.align=131072;
if((style&16384)!=0)this.align=16384;
this.addPaintListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$1")){
$_H();
c$=$_W($wt.custom,"CLabel$1",null,$wt.events.PaintListener);
$_V(c$,"paintControl",
function(event){
this.b$["$wt.custom.CLabel"].onPaint(event);
},"$wt.events.PaintEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$1,i$,v$);
})(this,null));
this.addDisposeListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$2")){
$_H();
c$=$_W($wt.custom,"CLabel$2",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(event){
this.b$["$wt.custom.CLabel"].onDispose(event);
},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$2,i$,v$);
})(this,null));
this.addTraverseListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$3")){
$_H();
c$=$_W($wt.custom,"CLabel$3",null,$wt.events.TraverseListener);
$_V(c$,"keyTraversed",
function(event){
if(event.detail==128){
this.b$["$wt.custom.CLabel"].onMnemonic(event);
}},"$wt.events.TraverseEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$3,i$,v$);
})(this,null));
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
if((style&2048)!=0)style|=4;
var mask=100663340;
style=style&mask;
style|=524288;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
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
$_M(c$,"drawBevelRect",
($fz=function(gc,x,y,w,h,topleft,bottomright){
gc.setForeground(bottomright);
gc.drawLine(x+w,y,x+w,y+h);
gc.drawLine(x,y+h,x+w,y+h);
gc.setForeground(topleft);
gc.drawLine(x,y,x+w-1,y);
gc.drawLine(x,y,x,y+h-1);
},$fz.isPrivate=true,$fz),"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
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
size.x+=r.width;
size.y+=r.height;
}var gc=new $wt.graphics.GC(this);
if(text!=null&&text.length>0){
var e=gc.textExtent(text,$wt.custom.CLabel.DRAW_FLAGS);
size.x+=e.x;
size.y=Math.max(size.y,e.y);
if(image!=null)size.x+=5;
}else{
size.y=Math.max(size.y,gc.getFontMetrics().getHeight());
}gc.dispose();
return size;
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~S");
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
$_M(c$,"onMnemonic",
function(event){
var mnemonic=this._findMnemonic(this.text);
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return;
if((Character.toUpperCase(event.character)).charCodeAt(0)!=(Character.toUpperCase(mnemonic)).charCodeAt(0))return;
var control=this.getParent();
while(control!=null){
var children=control.getChildren();
var index=0;
while(index<children.length){
if(children[index]==this)break;
index++;
}
index++;
if(index<children.length){
if(children[index].setFocus()){
event.doit=true;
event.detail=0;
}}control=control.getParent();
}
},"$wt.events.TraverseEvent");
$_M(c$,"onPaint",
function(event){
var rect=this.getClientArea();
for(var i=this.handle.childNodes.length-1;i>=0;i--){
this.handle.removeChild(this.handle.childNodes[i]);
}
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
}}var gc=event.gc;
var lines=this.text==null?null:this.splitString(this.text);
if(shortenText){
extent.x=0;
for(var i=0;i<lines.length;i++){
var e=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS);
if(e.x>availableWidth){
lines[i]=this.shortenText(gc,lines[i],availableWidth);
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
gc.setBackground(this.getBackground());
gc.fillRectangle(rect);
var xPos=0;
while(xPos<rect.width){
var yPos=0;
while(yPos<rect.height){
gc.drawImage(this.backgroundImage,xPos,yPos);
yPos+=imageRect.height;
}
xPos+=imageRect.width;
}
}else if(this.gradientColors!=null){
var oldBackground=gc.getBackground();
if(this.gradientColors.length==1){
if(this.gradientColors[0]!=null)gc.setBackground(this.gradientColors[0]);
gc.fillRectangle(0,0,rect.width,rect.height);
}else{
var oldForeground=gc.getForeground();
var lastColor=this.gradientColors[0];
if(lastColor==null)lastColor=oldBackground;
var pos=0;
for(var i=0;i<this.gradientPercents.length;++i){
gc.setForeground(lastColor);
lastColor=this.gradientColors[i+1];
if(lastColor==null)lastColor=oldBackground;
gc.setBackground(lastColor);
if(this.gradientVertical){
var gradientHeight=(Math.floor(this.gradientPercents[i]*rect.height/100))-pos;
gc.fillGradientRectangle(0,pos,rect.width,gradientHeight,true);
pos+=gradientHeight;
}else{
var gradientWidth=(Math.floor(this.gradientPercents[i]*rect.width/100))-pos;
gc.fillGradientRectangle(pos,0,gradientWidth,rect.height,false);
pos+=gradientWidth;
}}
if(this.gradientVertical&&pos<rect.height){
gc.setBackground(this.getBackground());
System.out.println("$$$$$$$$$$$$$");
gc.fillRectangle(0,pos,rect.width,rect.height-pos);
}if(!this.gradientVertical&&pos<rect.width){
gc.setBackground(this.getBackground());
System.out.println("***********");
gc.fillRectangle(pos,0,rect.width-pos,rect.height);
}gc.setForeground(oldForeground);
}gc.setBackground(oldBackground);
}else{
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("============"+rect);
gc.fillRectangle(rect);
}}}catch(e){
if($_O(e,$wt.SWTException)){
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("--------");
gc.fillRectangle(rect);
}}else{
throw e;
}
}
var style=this.getStyle();
if((style&4)!=0||(style&8)!=0){
this.paintBorder(gc,rect);
}if(img!=null){
var imageRect=img.getBounds();
gc.drawImage(img,0,0,imageRect.width,imageRect.height,x,Math.floor((rect.height-imageRect.height)/2),imageRect.width,imageRect.height);
x+=imageRect.width+5;
extent.x-=imageRect.width+5;
}if(lines!=null){
var lineHeight=gc.getFontMetrics().getHeight();
var textHeight=lines.length*lineHeight;
var lineY=Math.max(this.vIndent,rect.y+Math.floor((rect.height-textHeight)/2));
gc.setForeground(this.getForeground());
for(var i=0;i<lines.length;i++){
var lineX=x;
if(lines.length>1){
if(this.align==16777216){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=x+Math.max(0,Math.floor((extent.x-lineWidth)/2));
}if(this.align==131072){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=Math.max(x,rect.x+rect.width-this.hIndent-lineWidth);
}}gc.drawText(lines[i],lineX,lineY,$wt.custom.CLabel.DRAW_FLAGS);
lineY+=lineHeight;
}
}System.out.println("end on paint");
System.out.println(this.getSize());
},"$wt.events.PaintEvent");
$_M(c$,"paintBorder",
($fz=function(gc,r){
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
gc.setLineWidth(1);
this.drawBevelRect(gc,r.x,r.y,r.width-1,r.height-1,c1,c2);
}},$fz.isPrivate=true,$fz),"$wt.graphics.GC,$wt.graphics.Rectangle");
$_M(c$,"setAlignment",
function(align){
if(this.align!=align){
this.align=align;
this.redraw();
}},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CLabel,"setBackground",[color]);
if(color!=null&&this.backgroundImage==null&&this.gradientColors==null&&this.gradientPercents==null){
var background=this.getBackground();
if(color.equals(background)){
return;
}}this.backgroundImage=null;
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
}var background=this.getBackground();
if(this.backgroundImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
same=(this.gradientColors[i]==colors[i])||((this.gradientColors[i]==null)&&(colors[i]==background))||((this.gradientColors[i]==background)&&(colors[i]==null));
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
if(image==this.backgroundImage)return;
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
if(image!=this.image){
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
function(gc,t,width){
if(t==null)return null;
var w=gc.textExtent($wt.custom.CLabel.ELLIPSIS,$wt.custom.CLabel.DRAW_FLAGS).x;
var l=t.length;
var pivot=Math.floor(l/2);
var s=pivot;
var e=pivot+1;
while(s>=0&&e<l){
var s1=t.substring(0,s);
var s2=t.substring(e,l);
var l1=gc.textExtent(s1,$wt.custom.CLabel.DRAW_FLAGS).x;
var l2=gc.textExtent(s2,$wt.custom.CLabel.DRAW_FLAGS).x;
if(l1+w+l2<width){
t=s1+$wt.custom.CLabel.ELLIPSIS+s2;
break;
}s--;
e++;
}
return t;
},"$wt.graphics.GC,~S,~N");
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
$_S(c$,
"GAP",5,
"INDENT",3,
"ELLIPSIS","...",
"DRAW_FLAGS",15);
});
