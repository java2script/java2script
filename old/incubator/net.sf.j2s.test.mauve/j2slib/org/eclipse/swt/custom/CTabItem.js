$_L(["$wt.widgets.Item","$wt.graphics.Rectangle"],"$wt.custom.CTabItem",["$wt.custom.CTabFolder","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.parent=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.shortenedTextWidth=0;
this.font=null;
this.disabledImage=null;
this.closeRect=null;
this.closeImageState=0;
this.showClose=false;
this.showing=false;
this.seperatorLine=null;
this.imageHandle=null;
this.textHandle=null;
this.closeBtn=null;
this.elements=null;
$_Z(this,arguments);
},$wt.custom,"CTabItem",$wt.widgets.Item);
$_Y(c$,function(){
this.closeRect=new $wt.graphics.Rectangle(0,0,0,0);
this.elements=new Array(0);
});
$_K(c$,
function(parent,style){
this.construct(parent,style,parent.getItemCount());
},"$wt.custom.CTabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.custom.CTabItem,[parent,$wt.custom.CTabItem.checkStyle(style)]);
this.showClose=(style&64)!=0;
parent.createItem(this,index);
},"$wt.custom.CTabFolder,~N,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return 0;
},"~N");
$_M(c$,"useEllipses",
function(){
return this.parent.simple;
});
$_M(c$,"shortenText",
function(text,width){
return this.useEllipses()?this.shortenText(text,width,"..."):this.shortenText(text,width,"");
},"~S,~N");
$_M(c$,"textExtent",
($fz=function(text,flags){
return O$.getStringStyledSize(text,"ctabitem-text",null);
},$fz.isPrivate=true,$fz),"~S,~N");
$_M(c$,"shortenText",
function(text,width,ellipses){
if(this.textExtent(text,9).x<=width)return text;
var ellipseWidth=this.textExtent(ellipses,9).x;
var length=text.length;
var end=length-1;
while(end>0){
text=text.substring(0,end);
var l=this.textExtent(text,9).x;
if(l+ellipseWidth<=width){
return text+ellipses;
}end--;
}
return text.substring(0,1);
},"~S,~N,~S");
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
if(this.closeBtn!=null){
O$.destroyHandle(this.closeBtn);
this.closeBtn=null;
}if(this.textHandle!=null){
O$.destroyHandle(this.textHandle);
this.textHandle=null;
}if(this.imageHandle!=null){
O$.destroyHandle(this.imageHandle);
this.imageHandle=null;
}if(this.elements!=null){
for(var i=0;i<this.elements.length;i++){
var el=this.elements[i];
if(el!=null){
O$.destroyHandle(el);
this.elements[i]=null;
}}
this.elements=null;
}this.parent.destroyItem(this);
$_U(this,$wt.custom.CTabItem,"dispose",[]);
this.parent=null;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.font=null;
});
$_M(c$,"drawClose",
function(gc){
if(this.closeBtn!=null){
this.closeBtn.style.display=this.parent.showClose?"":"none";
}if(this.closeRect.width==0||this.closeRect.height==0)return;
var indent=Math.max(1,4);
var x=this.closeRect.x+indent;
var y=this.closeRect.y+indent;
y+=this.parent.onBottom?-1:1;
if(this.closeBtn==null){
this.closeBtn=d$.createElement("DIV");
this.parent.handle.appendChild(this.closeBtn);
this.closeBtn.title="Close";
}this.closeBtn.style.left=x+"px";
this.closeBtn.style.top=y+"px";
switch(this.closeImageState){
case 1:
{
this.closeBtn.className="ctabitem-close";
break;
}case 2:
{
this.closeBtn.className="ctabitem-close-hover";
break;
}case 3:
{
this.closeBtn.className="ctabitem-close";
break;
}case 0:
{
this.closeBtn.className="ctabitem-none";
break;
}}
},"$wt.graphics.GC");
$_M(c$,"drawSelected",
function(gc){
if(this.textHandle!=null){
this.textHandle.style.display="";
}if(this.imageHandle!=null){
this.imageHandle.style.display="";
}if(this.seperatorLine!=null){
this.seperatorLine.style.display="";
}if(this.closeBtn!=null){
this.closeBtn.style.display="";
}var size=this.parent.getSize();
var rightEdge=Math.min(this.x+this.width,this.parent.getRightItemEdge());
var xx=this.parent.borderLeft;
var yy=this.parent.onBottom?size.y-this.parent.borderBottom-this.parent.tabHeight-this.parent.highlight_header:this.parent.borderTop+this.parent.tabHeight+1;
var ww=size.x-this.parent.borderLeft-this.parent.borderRight;
var hh=this.parent.highlight_header-1;
var shape=[xx,yy,xx+ww,yy,xx+ww,yy+hh,xx,yy+hh];
if(this.parent.selectionGradientColors!=null&&!this.parent.selectionGradientVertical){
this.parent.drawBackground(gc,shape,true);
}else{
}if(this.elements[0]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-line";
this.parent.handle.appendChild(el);
this.elements[0]=el;
}var s=this.elements[0].style;
s.left=(this.x+2)+"px";
s.top=(this.parent.onBottom?this.y+this.height-1:this.y)+"px";
s.width=(this.width+1-2-(!O$.isIE?2:0))+"px";
s.backgroundColor=$wt.custom.CTabFolder.borderColor.getCSSHandle();
if(this.elements[1]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-pixel";
this.parent.handle.appendChild(el);
this.elements[1]=el;
}s=this.elements[1].style;
s.left=this.x+1+"px";
s.top=(this.parent.onBottom?this.y+this.height-2:this.y+1)+"px";
s.width=(this.width+1-2-(!O$.isIE?2:0))+"px";
s.backgroundColor=this.parent.selectionBackground.getCSSHandle();
if(this.elements[2]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-pixel";
this.parent.handle.appendChild(el);
this.elements[2]=el;
}s=this.elements[2].style;
s.left=this.x+"px";
s.top=(this.parent.onBottom?this.y-1:this.y+2)+"px";
s.width=(this.width+1-(!O$.isIE?2:0))+"px";
s.height=(this.height-1)+"px";
s.backgroundColor=this.parent.selectionBackground.getCSSHandle();
for(var i=0;i<this.elements.length;i++){
if(this.elements[i]!=null){
this.elements[i].style.display="";
}}
if(this.seperatorLine!=null){
this.seperatorLine.style.display="none";
}var xDraw=this.x+4;
if(this.parent.single&&(this.parent.showClose||this.showClose))xDraw+=18;
var image=this.getImage();
if(image!=null){
var imageBounds=image.getBounds();
var maxImageWidth=rightEdge-xDraw-4;
if(!this.parent.single&&this.closeRect.width>0)maxImageWidth-=this.closeRect.width+4;
if(imageBounds.width<maxImageWidth){
var imageX=xDraw;
var imageY=this.y+Math.floor((this.height-imageBounds.height)/2);
imageY+=this.parent.onBottom?-1:1;
this.drawImage(image,imageX,imageY,imageBounds.width,imageBounds.height);
xDraw+=imageBounds.width+4;
}}var textWidth=rightEdge-xDraw-4;
if(!this.parent.single&&this.closeRect.width>0)textWidth-=this.closeRect.width+4;
if(textWidth>0){
if(this.shortenedText==null||this.shortenedTextWidth!=textWidth){
this.shortenedText=this.shortenText(this.getText(),textWidth);
this.shortenedTextWidth=textWidth;
}var extent=this.textExtent(this.shortenedText,9);
var textY=this.y+Math.floor((this.height-extent.y)/2);
textY+=this.parent.onBottom?-1:1;
this.drawText(this.shortenedText,xDraw,textY,9);
}if(this.parent.showClose||this.showClose)this.drawClose(gc);
},"$wt.graphics.GC");
$_M(c$,"drawHighlight",
function(gc,rightEdge){
if(this.parent.simple||this.parent.onBottom)return;
if(this.parent.selectionHighlightGradientBegin==null)return;
var gradients=this.parent.selectionHighlightGradientColorsCache;
if(gradients==null)return;
var gradientsSize=gradients.length;
if(gradientsSize==0)return;
gc.setForeground(gradients[0]);
gc.drawLine($wt.custom.CTabFolder.TOP_LEFT_CORNER_HILITE[0]+this.x+1,1+this.y,rightEdge-this.parent.curveIndent,1+this.y);
var leftHighlightCurve=$wt.custom.CTabFolder.TOP_LEFT_CORNER_HILITE;
var d=this.parent.tabHeight-Math.floor(this.parent.topCurveHighlightEnd.length/2);
var lastX=0;
var lastY=0;
var lastColorIndex=0;
for(var i=0;i<Math.floor(leftHighlightCurve.length/2);i++){
var rawX=leftHighlightCurve[i*2];
var rawY=leftHighlightCurve[i*2+1];
lastX=rawX+this.x;
lastY=rawY+this.y;
lastColorIndex=rawY-1;
gc.setForeground(gradients[lastColorIndex]);
gc.drawPoint(lastX,lastY);
}
for(var i=lastColorIndex;i<gradientsSize;i++){
gc.setForeground(gradients[i]);
gc.drawPoint(lastX,1+lastY++);
}
var rightEdgeOffset=rightEdge-this.parent.curveIndent;
for(var i=0;i<Math.floor(this.parent.topCurveHighlightStart.length/2);i++){
var rawX=this.parent.topCurveHighlightStart[i*2];
var rawY=this.parent.topCurveHighlightStart[i*2+1];
lastX=rawX+rightEdgeOffset;
lastY=rawY+this.y;
lastColorIndex=rawY-1;
if(lastColorIndex>=gradientsSize)break;
gc.setForeground(gradients[lastColorIndex]);
gc.drawPoint(lastX,lastY);
}
for(var i=lastColorIndex;i<lastColorIndex+d;i++){
if(i>=gradientsSize)break;
gc.setForeground(gradients[i]);
gc.drawPoint(1+lastX++,1+lastY++);
}
for(var i=0;i<Math.floor(this.parent.topCurveHighlightEnd.length/2);i++){
var rawX=this.parent.topCurveHighlightEnd[i*2];
var rawY=this.parent.topCurveHighlightEnd[i*2+1];
lastX=rawX+rightEdgeOffset;
lastY=rawY+this.y;
lastColorIndex=rawY-1;
if(lastColorIndex>=gradientsSize)break;
gc.setForeground(gradients[lastColorIndex]);
gc.drawPoint(lastX,lastY);
}
},"$wt.graphics.GC,~N");
$_M(c$,"drawRightUnselectedBorder",
function(gc){
if(this.parent.simple){
if(this.seperatorLine==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-vline";
this.parent.handle.appendChild(el);
this.seperatorLine=el;
}var s=this.seperatorLine.style;
s.left=(this.x+this.width-1)+"px";
s.top=this.y+"px";
s.height=this.height+"px";
}else{
}},"$wt.graphics.GC");
$_M(c$,"drawBorder",
function(gc,shape){
gc.setForeground($wt.custom.CTabFolder.borderColor);
gc.drawPolyline(shape);
},"$wt.graphics.GC,~A");
$_M(c$,"drawLeftUnselectedBorder",
function(gc){
if(this.parent.simple){
if(this.seperatorLine==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-vline";
this.parent.handle.appendChild(el);
this.seperatorLine=el;
}var s=this.seperatorLine.style;
s.left=this.x+"px";
s.top=this.y+"px";
s.height=this.height+"px";
}else{
}},"$wt.graphics.GC");
$_M(c$,"drawUnselected",
function(gc){
var displayStr=this.showing?"":"none";
if(this.textHandle!=null){
this.textHandle.style.display=displayStr;
}if(this.imageHandle!=null){
this.imageHandle.style.display=displayStr;
}if(this.seperatorLine!=null){
this.seperatorLine.style.display=displayStr;
}if(this.closeBtn!=null){
this.closeBtn.style.display=displayStr;
}if(!this.showing)return;
var index=this.parent.indexOf(this);
if(index>0&&index<this.parent.selectedIndex)this.drawLeftUnselectedBorder(gc);
if(index>this.parent.selectedIndex)this.drawRightUnselectedBorder(gc);
if(this.seperatorLine!=null){
this.seperatorLine.style.display="";
if(index==0&&index<this.parent.selectedIndex){
this.seperatorLine.style.display="none";
}}for(var i=0;i<this.elements.length;i++){
if(this.elements[i]!=null){
this.elements[i].style.display="none";
}}
var xDraw=this.x+4;
var image=this.getImage();
if(image!=null&&this.parent.showUnselectedImage){
var imageBounds=image.getBounds();
var maxImageWidth=this.x+this.width-xDraw-4;
if(this.parent.showUnselectedClose&&(this.parent.showClose||this.showClose)){
maxImageWidth-=this.closeRect.width+4;
}if(imageBounds.width<maxImageWidth){
var imageX=xDraw;
var imageHeight=imageBounds.height;
var imageY=this.y+Math.floor((this.height-imageHeight)/2);
imageY+=this.parent.onBottom?-1:1;
var imageWidth=Math.floor(imageBounds.width*imageHeight/imageBounds.height);
this.drawImage(image,imageX,imageY,imageWidth,imageHeight);
xDraw+=imageWidth+4;
}}else{
if(this.imageHandle!=null){
this.handle.style.display="none";
}}var textWidth=this.x+this.width-xDraw-4;
if(this.parent.showUnselectedClose&&(this.parent.showClose||this.showClose)){
textWidth-=this.closeRect.width+4;
}if(textWidth>0){
if(this.shortenedText==null||this.shortenedTextWidth!=textWidth){
this.shortenedText=this.shortenText(this.getText(),textWidth);
this.shortenedTextWidth=textWidth;
}var extent=this.textExtent(this.shortenedText,9);
var textY=this.y+Math.floor((this.height-extent.y)/2);
textY+=this.parent.onBottom?-1:1;
this.drawText(this.shortenedText,xDraw,textY,9);
}if(this.parent.showUnselectedClose&&(this.parent.showClose||this.showClose))this.drawClose(gc);
},"$wt.graphics.GC");
$_M(c$,"drawImage",
($fz=function(image,imageX,imageY,imageWidth,imageHeight){
if(this.imageHandle==null){
this.imageHandle=d$.createElement("DIV");
this.parent.handle.appendChild(this.imageHandle);
this.imageHandle.className="ctabitem-image";
}var handleStyle=this.imageHandle.style;
handleStyle.left=imageX+"px";
handleStyle.top=imageY+"px";
handleStyle.width=imageWidth+"px";
handleStyle.height=imageHeight+"px";
if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+image.url+"\")";
}},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~N,~N,~N,~N");
$_M(c$,"drawText",
($fz=function(string,lineX,lineY,flags){
if(this.textHandle==null){
var textEl=d$.createElement("DIV");
textEl.className="ctabitem-text";
textEl.style.position="absolute";
this.parent.handle.appendChild(textEl);
this.textHandle=textEl;
O$.setTextSelection(textEl,false);
}if(this.textHandle.childNodes.length==0||this.textHandle.childNodes[0].nodeValue!==string){
O$.clearChildren(this.textHandle);
this.textHandle.appendChild(d$.createTextNode(string));
}this.textHandle.style.left=lineX+"px";
this.textHandle.style.top=lineY+"px";
},$fz.isPrivate=true,$fz),"~S,~N,~N,~N");
$_M(c$,"getBounds",
function(){
var w=this.width;
if(!this.parent.simple&&!this.parent.single&&this.parent.indexOf(this)==this.parent.selectedIndex)w+=this.parent.curveWidth-this.parent.curveIndent;
return new $wt.graphics.Rectangle(this.x,this.y,w,this.height);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getDisabledImage",
function(){
return this.disabledImage;
});
$_M(c$,"getFont",
function(){
if(this.font!=null)return this.font;
return this.parent.getFont();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
if(this.toolTipText==null&&this.shortenedText!=null){
var text=this.getText();
if(!this.shortenedText.equals(text))return text;
}return this.toolTipText;
});
$_M(c$,"isShowing",
function(){
return this.showing;
});
$_M(c$,"onPaint",
function(gc,isSelected){
if(this.width==0||this.height==0)return;
if(isSelected){
this.drawSelected(gc);
}else{
this.drawUnselected(gc);
}},"$wt.graphics.GC,~B");
$_M(c$,"preferredHeight",
function(gc){
var image=this.getImage();
var h=(image==null)?0:image.getBounds().height;
var text=this.getText();
if(this.font==null){
h=Math.max(h,gc.textExtent(text,9).y);
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
h=Math.max(h,gc.textExtent(text,9).y);
gc.setFont(gcFont);
}return h+2+2;
},"$wt.graphics.GC");
$_M(c$,"preferredWidth",
function(gc,isSelected,minimum){
if(this.isDisposed())return 0;
var w=0;
var image=this.getImage();
if(image!=null&&(isSelected||this.parent.showUnselectedImage)){
w+=image.getBounds().width;
}var text=null;
if(minimum){
var minChars=this.parent.minChars;
text=minChars==0?null:this.getText();
if(text!=null&&text.length>minChars){
if(this.useEllipses()){
var end=minChars<"...".length+1?minChars:minChars-"...".length;
text=text.substring(0,end);
if(minChars>"...".length+1)text+="...";
}else{
var end=minChars;
text=text.substring(0,end);
}}}else{
text=this.getText();
}if(text!=null){
if(w>0)w+=4;
if(this.font==null){
w+=gc.textExtent(text,9).x;
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
w+=gc.textExtent(text,9).x;
gc.setFont(gcFont);
}}if(this.parent.showClose||this.showClose){
if(isSelected||this.parent.showUnselectedClose){
if(w>0)w+=4;
w+=18;
}}return w+4+4;
},"$wt.graphics.GC,~B,~B");
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&!this.control.isDisposed()){
this.control.setVisible(false);
}this.control=control;
if(this.control!=null){
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
this.control.setBounds(this.parent.getClientArea());
this.control.setVisible(true);
}else{
this.control.setVisible(false);
}}},"$wt.widgets.Control");
$_M(c$,"setDisabledImage",
function(image){
this.disabledImage=image;
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
if(font==null&&this.font==null)return;
if(font!=null&&font.equals(this.font))return;
this.font=font;
if(!this.parent.updateTabHeight(false)){
this.parent.updateItems();
this.parent.redrawTabs();
}},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
var oldImage=this.getImage();
if(image==null&&oldImage==null)return;
if(image!=null&&image.equals(oldImage))return;
$_U(this,$wt.custom.CTabItem,"setImage",[image]);
if(!this.parent.updateTabHeight(false)){
if(oldImage!=null&&image!=null){
var oldBounds=oldImage.getBounds();
var bounds=image.getBounds();
if(bounds.width==oldBounds.width&&bounds.height==oldBounds.height){
if(this.showing){
var selected=this.parent.indexOf(this)==this.parent.selectedIndex;
if(selected||this.parent.showUnselectedImage){
var imageX=this.x+4;
var maxImageWidth;
if(selected){
if(this.parent.single&&(this.parent.showClose||this.showClose))imageX+=18;
var rightEdge=Math.min(this.x+this.width,this.parent.getRightItemEdge());
maxImageWidth=rightEdge-imageX-4;
if(!this.parent.single&&this.closeRect.width>0)maxImageWidth-=this.closeRect.width+4;
}else{
maxImageWidth=this.x+this.width-imageX-4;
if(this.parent.showUnselectedClose&&(this.parent.showClose||this.showClose)){
maxImageWidth-=this.closeRect.width+4;
}}if(bounds.width<maxImageWidth){
var imageY=this.y+Math.floor((this.height-bounds.height)/2)+(this.parent.onBottom?-1:1);
this.parent.redraw(imageX,imageY,bounds.width,bounds.height,false);
}}}return;
}}this.parent.updateItems();
this.parent.redrawTabs();
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
if(string.equals(this.getText()))return;
$_U(this,$wt.custom.CTabItem,"setText",[string]);
this.shortenedText=null;
this.shortenedTextWidth=0;
if(!this.parent.updateTabHeight(false)){
this.parent.updateItems();
this.parent.redrawTabs();
}},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
$_S(c$,
"TOP_MARGIN",2,
"BOTTOM_MARGIN",2,
"LEFT_MARGIN",4,
"RIGHT_MARGIN",4,
"INTERNAL_SPACING",4,
"FLAGS",9,
"ELLIPSIS","...");
});
