$_L(["$wt.widgets.Composite","$wt.graphics.RGB","$.Rectangle"],"$wt.custom.CTabFolder",["java.lang.Character","$wt.SWT","$wt.accessibility.AccessibleAdapter","$.AccessibleControlAdapter","$wt.custom.CTabFolderEvent","$.CTabFolderLayout","$wt.events.SelectionAdapter","$wt.graphics.Color","$.Font","$.GC","$.Point","$.Region","$wt.internal.browser.OS","$wt.widgets.Event","$.Listener","$.Menu","$.MenuItem","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.custom.CTabFolder", ".ctabfolder-border-line, .ctabfolder-border-vline, .ctabfolder-border-pixel,\n.ctabfolder-border-container-top, .ctabfolder-border-container-bottom,\n.ctabfolder-client-area {\nposition:absolute;\nmargin:0;\npadding:0;\nfont-size:0;\nz-index:1;\n}\n.ctabfolder-border-line {\nheight:0;\nborder-top:1px solid #a0a0a0;\nz-index:2;\n}\n.ctabfolder-border-vline {\nwidth:0;\nborder-left:1px solid #a0a0a0;\nz-index:2;\n}\n.ctabfolder-border-pixel {\nheight:1px;\nborder-left:1px solid #a0a0a0;\nborder-right:1px solid #a0a0a0;\nz-index:2;\n}\n.ctabfolder-border-container-top {\nborder:1px solid #a0a0a0;\nborder-top:0 none transparent;\nz-index:2;\n}\n.ctabfolder-border-container-bottom {\nborder:1px solid #a0a0a0;\nborder-bottom:0 none transparent;\nz-index:2;\n}\n.ctabitem-text {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\ncursor:default;\nz-index:5;\n}\n.ctabitem-image, .ctabitem-close, .ctabitem-close-hover, .ctabitem-none {\nposition:absolute;\nfont-size:0;\nwidth:10px;\nheight:10px;\nbackground-repeat:no-repeat;\nbackground-position:center center;\nz-index:3;\n}\n.ctabitem-close {\nbackground-image:url(\'images/ctabitem-close.gif\');\n}\n.ctabitem-close-hover {\nbackground-image:url(\'images/ctabitem-close-hover.gif\');\n}\n.swt-custom-ctabfolder {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.marginWidth = 0;
this.marginHeight = 0;
this.MIN_TAB_WIDTH = 4;
this.xClient = 0;
this.yClient = 0;
this.onBottom = false;
this.single = false;
this.simple = true;
this.fixedTabHeight = -1;
this.tabHeight = 0;
this.minChars = 20;
this.items = null;
this.firstIndex = -1;
this.selectedIndex = -1;
this.priority = null;
this.mru = false;
this.listener = null;
this.folderListeners = null;
this.tabListeners = null;
this.selectionBgImage = null;
this.selectionGradientColors = null;
this.selectionGradientPercents = null;
this.selectionGradientVertical = false;
this.selectionForeground = null;
this.selectionBackground = null;
this.selectionFadeStart = null;
this.selectionHighlightGradientBegin = null;
this.selectionHighlightGradientColorsCache = null;
this.bgImage = null;
this.gradientColors = null;
this.gradientPercents = null;
this.gradientVertical = false;
this.showUnselectedImage = true;
this.showClose = false;
this.showUnselectedClose = true;
this.chevronRect = null;
this.chevronImageState = 1;
this.showChevron = false;
this.$showMenu = null;
this.showMin = false;
this.minRect = null;
this.minimized = false;
this.minImageState = 1;
this.showMax = false;
this.maxRect = null;
this.maximized = false;
this.maxImageState = 1;
this.topRight = null;
this.topRightRect = null;
this.topRightAlignment = 131072;
this.borderLeft = 0;
this.borderRight = 0;
this.borderTop = 0;
this.borderBottom = 0;
this.highlight_margin = 0;
this.highlight_header = 0;
this.curve = null;
this.topCurveHighlightStart = null;
this.topCurveHighlightEnd = null;
this.curveWidth = 0;
this.curveIndent = 0;
this.inDispose = false;
this.oldSize = null;
this.oldFont = null;
this.redrawTick = -1;
this.elements = null;
this.minElements = null;
this.maxElements = null;
this.chevronElements = null;
this.closeElements = null;
this.bgColor = null;
$_Z (this, arguments);
}, $wt.custom, "CTabFolder", $wt.widgets.Composite);
$_Y (c$, function () {
this.items =  new Array (0);
this.priority =  $_A (0, 0);
this.folderListeners =  new Array (0);
this.tabListeners =  new Array (0);
this.chevronRect =  new $wt.graphics.Rectangle (0, 0, 0, 0);
this.minRect =  new $wt.graphics.Rectangle (0, 0, 0, 0);
this.maxRect =  new $wt.graphics.Rectangle (0, 0, 0, 0);
this.topRightRect =  new $wt.graphics.Rectangle (0, 0, 0, 0);
this.elements =  new Array (0);
});
$_K (c$, 
function (parent, style) {
$_R (this, $wt.custom.CTabFolder, [parent, $wt.custom.CTabFolder.checkStyle (parent, style)]);
$_U (this, $wt.custom.CTabFolder, "setLayout", [ new $wt.custom.CTabFolderLayout ()]);
var style2 = $_U (this, $wt.custom.CTabFolder, "getStyle", []);
this.oldFont = this.getFont ();
this.onBottom = (style2 & 1024) != 0;
this.showClose = (style2 & 64) != 0;
this.single = (style2 & 4) != 0;
this.borderLeft = this.borderRight = (style & 2048) != 0 ? 1 : 0;
this.borderTop = this.onBottom ? this.borderLeft : 0;
this.borderBottom = this.onBottom ? 0 : this.borderLeft;
this.highlight_header = (style & 8388608) != 0 ? 1 : 3;
this.highlight_margin = (style & 8388608) != 0 ? 0 : 2;
var display = this.getDisplay ();
this.selectionForeground = display.getSystemColor (24);
this.selectionBackground = display.getSystemColor (25);
($t$ = $wt.custom.CTabFolder.borderColor = display.getSystemColor (18), $wt.custom.CTabFolder.prototype.borderColor = $wt.custom.CTabFolder.borderColor, $t$);
this.updateTabHeight (false);
this.listener = (($_D ("$wt.custom.CTabFolder$1") ? 0 : org.eclipse.swt.custom.CTabFolder.$CTabFolder$1$ ()), $_N ($wt.custom.CTabFolder$1, this, null));
var folderEvents = [12, 29, 15, 16, 1, 8, 3, 6, 7, 5, 4, 9, 11, 31];
for (var i = 0; i < folderEvents.length; i++) {
this.addListener (folderEvents[i], this.listener);
}
}, "$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(parent,style){
var mask=109053126;
style=style&mask;
if((style&128)!=0)style=style&-1025;
if((style&2)!=0)style=style&-5;
style|=1048576;
if((style&67108864)!=0)return style;
if((parent.getStyle()&134217728)!=0&&(style&33554432)==0)return style;
return style|262144;
},"$wt.widgets.Composite,~N");
$_M(c$,"addCTabFolder2Listener",
function(listener){
var newListeners=new Array(this.folderListeners.length+1);
System.arraycopy(this.folderListeners,0,newListeners,0,this.folderListeners.length);
this.folderListeners=newListeners;
this.folderListeners[this.folderListeners.length-1]=listener;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"addCTabFolderListener",
function(listener){
var newTabListeners=new Array(this.tabListeners.length+1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,this.tabListeners.length);
this.tabListeners=newTabListeners;
this.tabListeners[this.tabListeners.length-1]=listener;
if(!this.showClose){
this.showClose=true;
this.updateItems();
this.redraw();
}},"$wt.custom.CTabFolderListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"antialias",
function(shape,lineRGB,innerRGB,outerRGB,gc){
if(this.simple||"carbon".equals($WT.getPlatform())||"wpf".equals($WT.getPlatform()))return;
if(this.getDisplay().getDepth()<15)return;
if(outerRGB!=null){
var index=0;
var left=true;
var oldY=this.onBottom?0:this.getSize().y;
var outer=$_A(shape.length,0);
for(var i=0;i<Math.floor(shape.length/2);i++){
if(left&&(index+3<shape.length)){
left=this.onBottom?oldY<=shape[index+3]:oldY>=shape[index+3];
oldY=shape[index+1];
}outer[index]=shape[index++]+(left?-1:1);
outer[index]=shape[index++];
}
var from=lineRGB;
var to=outerRGB;
var red=from.red+Math.floor(2*(to.red-from.red)/3);
var green=from.green+Math.floor(2*(to.green-from.green)/3);
var blue=from.blue+Math.floor(2*(to.blue-from.blue)/3);
var color=new $wt.graphics.Color(this.getDisplay(),red,green,blue);
gc.setForeground(color);
gc.drawPolyline(outer);
color.dispose();
}if(innerRGB!=null){
var inner=$_A(shape.length,0);
var index=0;
var left=true;
var oldY=this.onBottom?0:this.getSize().y;
for(var i=0;i<Math.floor(shape.length/2);i++){
if(left&&(index+3<shape.length)){
left=this.onBottom?oldY<=shape[index+3]:oldY>=shape[index+3];
oldY=shape[index+1];
}inner[index]=shape[index++]+(left?1:-1);
inner[index]=shape[index++];
}
var from=lineRGB;
var to=innerRGB;
var red=from.red+Math.floor(2*(to.red-from.red)/3);
var green=from.green+Math.floor(2*(to.green-from.green)/3);
var blue=from.blue+Math.floor(2*(to.blue-from.blue)/3);
var color=new $wt.graphics.Color(this.getDisplay(),red,green,blue);
gc.setForeground(color);
gc.drawPolyline(inner);
color.dispose();
}},"~A,$wt.graphics.RGB,$wt.graphics.RGB,$wt.graphics.RGB,$wt.graphics.GC");
$_V(c$,"computeTrim",
function(x,y,width,height){
var trimX=x-this.marginWidth-this.highlight_margin-this.borderLeft;
var trimWidth=width+this.borderLeft+this.borderRight+2*this.marginWidth+2*this.highlight_margin;
if(this.minimized){
var trimY=this.onBottom?y-this.borderTop:y-this.highlight_header-this.tabHeight-this.borderTop;
var trimHeight=this.borderTop+this.borderBottom+this.tabHeight+this.highlight_header;
return new $wt.graphics.Rectangle(trimX,trimY,trimWidth,trimHeight);
}else{
var trimY=this.onBottom?y-this.marginHeight-this.highlight_margin-this.borderTop:y-this.marginHeight-this.highlight_header-this.tabHeight-this.borderTop;
var trimHeight=height+this.borderTop+this.borderBottom+2*this.marginHeight+this.tabHeight+this.highlight_header+this.highlight_margin;
return new $wt.graphics.Rectangle(trimX,trimY,trimWidth,trimHeight);
}},"~N,~N,~N,~N");
$_M(c$,"createItem",
function(item,index){
item.parent=this;
var newItems=new Array(this.items.length+1);
System.arraycopy(this.items,0,newItems,0,index);
newItems[index]=item;
System.arraycopy(this.items,index,newItems,index+1,this.items.length-index);
this.items=newItems;
if(this.selectedIndex>=index)this.selectedIndex++;
var newPriority=$_A(this.priority.length+1,0);
var next=0;
var priorityIndex=this.priority.length;
for(var i=0;i<this.priority.length;i++){
if(!this.mru&&this.priority[i]==index){
priorityIndex=next++;
}newPriority[next++]=this.priority[i]>=index?this.priority[i]+1:this.priority[i];
}
newPriority[priorityIndex]=index;
this.priority=newPriority;
if(this.items.length==1){
if(!this.updateTabHeight(false))this.updateItems();
this.redraw();
}else{
this.updateItems();
this.redrawTabs();
}},"$wt.custom.CTabItem,~N");
$_M(c$,"destroyItem",
function(item){
if(this.inDispose)return;
var index=this.indexOf(item);
if(index==-1)return;
if(this.items.length==1){
this.items=new Array(0);
this.priority=$_A(0,0);
this.firstIndex=-1;
this.selectedIndex=-1;
var control=item.getControl();
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}this.setToolTipText(null);
this.setButtonBounds();
this.redraw();
return;
}var newItems=new Array(this.items.length-1);
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,this.items.length-index-1);
this.items=newItems;
var newPriority=$_A(this.priority.length-1,0);
var next=0;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index)continue;newPriority[next++]=this.priority[i]>index?this.priority[i]-1:this.priority[i];
}
this.priority=newPriority;
if(this.selectedIndex==index){
var control=item.getControl();
this.selectedIndex=-1;
var nextSelection=this.mru?this.priority[0]:Math.max(0,index-1);
this.setSelection(nextSelection,true);
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}else if(this.selectedIndex>index){
this.selectedIndex--;
}this.updateItems();
this.redrawTabs();
},"$wt.custom.CTabItem");
$_M(c$,"drawBackground",
function(gc,shape,selected){
var defaultBackground=selected?this.selectionBackground:this.getBackground();
var image=selected?this.selectionBgImage:this.bgImage;
var colors=selected?this.selectionGradientColors:this.gradientColors;
var percents=selected?this.selectionGradientPercents:this.gradientPercents;
var vertical=selected?this.selectionGradientVertical:this.gradientVertical;
var size=this.getSize();
var width=size.x;
var height=this.tabHeight+this.highlight_header;
var x=0;
if(this.borderLeft>0){
x+=1;
width-=2;
}var y=this.onBottom?size.y-this.borderBottom-height:this.borderTop;
this.drawBackground(gc,shape,x,y,width,height,defaultBackground,image,colors,percents,vertical);
},"$wt.graphics.GC,~A,~B");
$_M(c$,"drawBackground",
function(gc,shape,x,y,width,height,defaultBackground,image,colors,percents,vertical){
var clipping=new $wt.graphics.Region();
gc.getClipping(clipping);
var region=new $wt.graphics.Region();
region.add(shape);
region.intersect(clipping);
gc.setClipping(region);
if(image!=null){
gc.setBackground(defaultBackground);
gc.fillRectangle(x,y,width,height);
var imageRect=image.getBounds();
gc.drawImage(image,imageRect.x,imageRect.y,imageRect.width,imageRect.height,x,y,width,height);
}else if(colors!=null){
if(colors.length==1){
var background=colors[0]!=null?colors[0]:defaultBackground;
gc.setBackground(background);
gc.fillRectangle(x,y,width,height);
}else{
if(vertical){
if(this.onBottom){
var pos=0;
if(percents[percents.length-1]<100){
pos=Math.floor(percents[percents.length-1]*height/100);
gc.setBackground(defaultBackground);
gc.fillRectangle(x,y,width,pos);
}var lastColor=colors[colors.length-1];
if(lastColor==null)lastColor=defaultBackground;
for(var i=percents.length-1;i>=0;i--){
gc.setForeground(lastColor);
lastColor=colors[i];
if(lastColor==null)lastColor=defaultBackground;
gc.setBackground(lastColor);
var gradientHeight=Math.floor(percents[i]*height/100);
gc.fillGradientRectangle(x,y+pos,width,gradientHeight,true);
pos+=gradientHeight;
}
}else{
var lastColor=colors[0];
if(lastColor==null)lastColor=defaultBackground;
var pos=0;
for(var i=0;i<percents.length;i++){
gc.setForeground(lastColor);
lastColor=colors[i+1];
if(lastColor==null)lastColor=defaultBackground;
gc.setBackground(lastColor);
var gradientHeight=Math.floor(percents[i]*height/100);
gc.fillGradientRectangle(x,y+pos,width,gradientHeight,true);
pos+=gradientHeight;
}
if(pos<height){
gc.setBackground(defaultBackground);
gc.fillRectangle(x,pos,width,height-pos+1);
}}}else{
y=0;
height=this.getSize().y;
var lastColor=colors[0];
if(lastColor==null)lastColor=defaultBackground;
var pos=0;
for(var i=0;i<percents.length;++i){
gc.setForeground(lastColor);
lastColor=colors[i+1];
if(lastColor==null)lastColor=defaultBackground;
gc.setBackground(lastColor);
var gradientWidth=(Math.floor(percents[i]*width/100))-pos;
gc.fillGradientRectangle(x+pos,y,gradientWidth,height,false);
pos+=gradientWidth;
}
if(pos<width){
gc.setBackground(defaultBackground);
gc.fillRectangle(x+pos,y,width-pos,height);
}}}}else{
if((this.getStyle()&262144)!=0||!defaultBackground.equals(this.getBackground())){
gc.setBackground(defaultBackground);
gc.fillRectangle(x,y,width,height);
}}gc.setClipping(clipping);
clipping.dispose();
region.dispose();
},"$wt.graphics.GC,~A,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Image,~A,~A,~B");
$_M(c$,"drawBody",
function(event){
var size=this.getSize();
if(this.borderLeft>0){
var x1=this.borderLeft-1;
var x2=size.x-this.borderRight;
var y1=this.onBottom?this.borderTop-1:this.borderTop+this.tabHeight;
var y2=this.onBottom?size.y-this.tabHeight-this.borderBottom-1:size.y-this.borderBottom;
if(this.elements[5]==null){
var el=d$.createElement("DIV");
if(this.onBottom){
el.className="ctabfolder-border-container-bottom";
}else{
el.className="ctabfolder-border-container-top";
}this.handle.appendChild(el);
this.elements[5]=el;
}var s=this.elements[5].style;
s.top=y1+"px";
s.left=x1+"px";
s.width=(x2-x1+1-(!O$.isIE?2:0))+"px";
s.height=(y2-y1+1-(!O$.isIE?1:0))+"px";
}if(!this.minimized){
var width=size.x-this.borderLeft-this.borderRight-2*this.highlight_margin;
var height=size.y-this.borderTop-this.borderBottom-this.tabHeight-this.highlight_header-this.highlight_margin;
if((this.getStyle()&262144)!=0){
if(this.elements[4]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-client-area";
this.handle.appendChild(el);
this.elements[4]=el;
}var s=this.elements[4].style;
s.left=(this.xClient-this.marginWidth)+"px";
s.top=(this.yClient-this.marginHeight)+"px";
s.width=width+"px";
s.height=height+"px";
var bg=this.getBackground();
if(bg!=null){
s.backgroundColor=bg.getCSSHandle();
}else{
s.backgroundColor="transparent";
}}}},"$wt.widgets.Event");
$_M(c$,"drawChevron",
function(gc){
this.checkElements(this.chevronElements,this.showChevron);
if(this.chevronRect.width==0||this.chevronRect.height==0)return;
var display=this.getDisplay();
var borderCSSColor=display.getSystemColor(17).getCSSHandle();
var bgCSSColor=display.getSystemColor(25).getCSSHandle();
var dpi=display.getDPI();
var fontHeight=Math.floor(720/dpi.y);
var fd=this.getFont().getFontData()[0];
fd.setHeight(fontHeight);
var f=new $wt.graphics.Font(display,fd);
var fHeight=Math.floor(f.getFontData()[0].getHeight()*dpi.y/72);
var indent=Math.max(2,Math.floor((this.chevronRect.height-fHeight-4)/2));
var x=this.chevronRect.x+2;
var y=this.chevronRect.y+indent;
var count;
if(this.single){
count=this.selectedIndex==-1?this.items.length:this.items.length-1;
}else{
var showCount=0;
while(showCount<this.priority.length&&this.items[this.priority[showCount]].showing){
showCount++;
}
count=this.items.length-showCount;
}var chevronString=count>99?"99+":String.valueOf(count);
if(this.chevronElements==null){
this.chevronElements=new Array(7);
}switch(this.chevronImageState){
case 1:
{
var chevronBorder=this.single?this.getSelectionForeground():this.getForeground();
var el=this.chevronElements[5];
var text=this.chevronElements[6];
if(el==null){
el=d$.createElement("DIV");
el.style.position="absolute";
el.style.zIndex=4;
el.style.fontSize="7pt";
el.style.fontFamily="Arial";
el.style.fontWeight="bold";
el.style.cursor="default";
el.style.color=chevronBorder.getCSSHandle();
this.handle.appendChild(el);
this.chevronElements[5]=el;
el.appendChild(d$.createTextNode(">>"));
O$.setTextSelection(el,false);
text=d$.createElement("DIV");
text.style.position="absolute";
text.style.fontSize=fHeight+"px";
text.style.fontFamily="Arial";
text.style.zIndex=4;
text.style.cursor="default";
text.style.color=chevronBorder.getCSSHandle();
this.handle.appendChild(text);
this.chevronElements[6]=text;
text.appendChild(d$.createTextNode(chevronString));
O$.setTextSelection(text,false);
}el.style.left=x+"px";
el.style.top=(y-3+1)+"px";
text.style.left=(x+7)+"px";
text.style.top=(y+4+1)+"px";
if(this.chevronElements[0]!=null){
for(var i=0;i<5;i++){
var e=this.chevronElements[i];
if(e!=null){
e.style.display="none";
}}
}break;
}case 2:
{
this.roundRectangleHover(this.chevronElements,this.chevronRect,bgCSSColor,borderCSSColor);
break;
}case 3:
{
this.roundRectangleHover(this.chevronElements,this.chevronRect,bgCSSColor,borderCSSColor);
break;
}}
f.dispose();
},"$wt.graphics.GC");
$_M(c$,"drawMaximize",
function(gc){
this.checkElements(this.maxElements,this.showMax);
if(this.maxRect.width==0||this.maxRect.height==0)return;
var display=this.getDisplay();
var x=this.maxRect.x+4;
var y=this.maxRect.y+3;
var borderCSSColor=display.getSystemColor(17).getCSSHandle();
var bgCSSColor=display.getSystemColor(25).getCSSHandle();
if(this.maxElements==null){
this.maxElements=new Array(7);
}switch(this.maxImageState){
case 1:
{
if(!this.maximized){
var el=this.maxElements[5];
var line=this.maxElements[6];
if(el==null){
el=d$.createElement("DIV");
el.style.position="absolute";
el.style.borderWidth="1px";
el.style.borderStyle="solid";
el.style.zIndex=4;
el.style.borderColor=borderCSSColor;
el.style.backgroundColor=bgCSSColor;
this.handle.appendChild(el);
this.maxElements[5]=el;
line=d$.createElement("DIV");
line.style.position="absolute";
line.style.borderTopWidth="1px";
line.style.borderTopStyle="solid";
line.style.zIndex=4;
line.style.borderTopColor=borderCSSColor;
this.handle.appendChild(line);
this.maxElements[6]=line;
}el.style.left=x+"px";
el.style.top=(y+1)+"px";
el.style.width="8px";
el.style.height="8px";
line.style.left=(x+1)+"px";
line.style.top=(y+2+1)+"px";
line.style.width="8px";
line.style.height="0px";
if(this.maxElements[0]!=null){
for(var i=0;i<5;i++){
var e=this.maxElements[i];
if(e!=null){
e.style.display="none";
}}
}}else{
gc.fillRectangle(x,y+3,5,4);
gc.fillRectangle(x+2,y,5,4);
gc.drawRectangle(x,y+3,5,4);
gc.drawRectangle(x+2,y,5,4);
gc.drawLine(x+3,y+1,x+6,y+1);
gc.drawLine(x+1,y+4,x+4,y+4);
}break;
}case 2:
{
this.roundRectangleHover(this.maxElements,this.maxRect,bgCSSColor,borderCSSColor);
break;
}case 3:
{
this.roundRectangleHover(this.maxElements,this.maxRect,bgCSSColor,borderCSSColor);
break;
}}
},"$wt.graphics.GC");
$_M(c$,"roundRectangleHover",
($fz=function(elements,rect,bgCSSColor,borderCSSColor){
var line1=elements[0];
var line2=elements[1];
var line3=elements[2];
var line4=elements[3];
var line5=elements[4];
if(line1==null){
line1=d$.createElement("DIV");
line1.className="ctabfolder-border-pixel";
this.handle.appendChild(line1);
elements[0]=line1;
line1.style.zIndex=3;
line2=d$.createElement("DIV");
line2.className="ctabfolder-border-pixel";
this.handle.appendChild(line2);
elements[1]=line2;
line2.style.zIndex=3;
line3=d$.createElement("DIV");
line3.className="ctabfolder-border-pixel";
this.handle.appendChild(line3);
elements[2]=line3;
line3.style.zIndex=3;
line4=d$.createElement("DIV");
line4.className="ctabfolder-border-pixel";
this.handle.appendChild(line4);
elements[3]=line4;
line4.style.zIndex=3;
line5=d$.createElement("DIV");
line5.className="ctabfolder-border-pixel";
this.handle.appendChild(line5);
elements[4]=line5;
line5.style.zIndex=3;
}for(var i=0;i<5;i++){
var e=elements[i];
if(e!=null){
e.style.display="";
}}
line1.style.backgroundColor=borderCSSColor;
line1.style.borderColor=borderCSSColor;
line2.style.backgroundColor=bgCSSColor;
line2.style.borderColor=borderCSSColor;
line3.style.backgroundColor=bgCSSColor;
line3.style.borderColor=borderCSSColor;
line4.style.backgroundColor=bgCSSColor;
line4.style.borderColor=borderCSSColor;
line5.style.backgroundColor=borderCSSColor;
line5.style.borderColor=borderCSSColor;
line1.style.left=(rect.x+2)+"px";
line1.style.top=rect.y+"px";
line1.style.width=(rect.width-6)+"px";
line2.style.left=(rect.x+1)+"px";
line2.style.top=(rect.y+1)+"px";
line2.style.width=(rect.width-4)+"px";
line3.style.left=rect.x+"px";
line3.style.top=(rect.y+2)+"px";
line3.style.width=(rect.width-2)+"px";
line3.style.height=(rect.height-4)+"px";
line4.style.left=(rect.x+1)+"px";
line4.style.top=(rect.y+rect.height-2)+"px";
line4.style.width=(rect.width-4)+"px";
line5.style.left=(rect.x+2)+"px";
line5.style.top=(rect.y+rect.height-1)+"px";
line5.style.width=(rect.width-6)+"px";
},$fz.isPrivate=true,$fz),"~A,$wt.graphics.Rectangle,~S,~S");
$_M(c$,"drawMinimize",
function(gc){
this.checkElements(this.minElements,this.showMin);
if(this.minRect.width==0||this.minRect.height==0)return;
var display=this.getDisplay();
var x=this.minRect.x+4;
var y=this.minRect.y+3;
var borderCSSColor=display.getSystemColor(17).getCSSHandle();
var bgCSSColor=display.getSystemColor(25).getCSSHandle();
if(this.minElements==null){
this.minElements=new Array(7);
}switch(this.minImageState){
case 1:
{
if(!this.minimized){
var el=this.minElements[5];
if(el==null){
el=d$.createElement("DIV");
el.style.position="absolute";
el.style.borderWidth="1px";
el.style.borderStyle="solid";
el.style.zIndex=4;
el.style.borderColor=borderCSSColor;
el.style.backgroundColor=bgCSSColor;
this.handle.appendChild(el);
this.minElements[5]=el;
}el.style.left=x+"px";
el.style.top=(y+1)+"px";
el.style.width="8px";
el.style.height="2px";
if(this.minElements[0]!=null){
for(var i=0;i<5;i++){
var e=this.minElements[i];
if(e!=null){
e.style.display="none";
}}
}}else{
gc.fillRectangle(x,y+3,5,4);
gc.fillRectangle(x+2,y,5,4);
gc.drawRectangle(x,y+3,5,4);
gc.drawRectangle(x+2,y,5,4);
gc.drawLine(x+3,y+1,x+6,y+1);
gc.drawLine(x+1,y+4,x+4,y+4);
}break;
}case 2:
{
this.roundRectangleHover(this.minElements,this.minRect,bgCSSColor,borderCSSColor);
break;
}case 3:
{
this.roundRectangleHover(this.minElements,this.minRect,bgCSSColor,borderCSSColor);
break;
}}
},"$wt.graphics.GC");
$_M(c$,"checkElements",
($fz=function(elements,visible){
if(elements!=null){
for(var i=0;i<elements.length;i++){
var el=elements[i];
if(el!=null){
el.style.display=visible?"":"none";
}}
}},$fz.isPrivate=true,$fz),"~A,~B");
$_M(c$,"drawTabArea",
function(event){
var gc=null;
var size=this.getSize();
if(this.tabHeight==0){
return;
}var x=Math.max(0,this.borderLeft-1);
var y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop;
var width=size.x-this.borderLeft-this.borderRight+1;
var height=this.tabHeight-1;
if(this.elements[0]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-line";
this.handle.appendChild(el);
this.elements[0]=el;
}var s=this.elements[0].style;
s.left=(x+2)+"px";
s.top=(this.onBottom?y+height:y)+"px";
s.width=(width+1-2-(!O$.isIE?2:0))+"px";
var bg=this.getBackground();
if(this.borderLeft>0){
s.borderTopColor=$wt.custom.CTabFolder.borderColor.getCSSHandle();
}else if(bg!=null){
s.borderTopColor=bg.getCSSHandle();
}if(this.elements[1]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-pixel";
this.handle.appendChild(el);
this.elements[1]=el;
}s=this.elements[1].style;
s.left=x+1+"px";
s.top=(this.onBottom?y+height-1:y+1)+"px";
s.width=(width+1-2-(!O$.isIE?2:0))+"px";
if(this.borderLeft>0){
s.borderColor=$wt.custom.CTabFolder.borderColor.getCSSHandle();
}else if(bg!=null){
s.borderColor=bg.getCSSHandle();
}if(bg!=null){
s.backgroundColor=bg.getCSSHandle();
}if(this.elements[2]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-pixel";
this.handle.appendChild(el);
this.elements[2]=el;
}s=this.elements[2].style;
s.left=x+"px";
s.top=(this.onBottom?y:y+2)+"px";
s.width=(width+1-(!O$.isIE?2:0))+"px";
s.height=(height-1)+"px";
if(bg!=null){
s.backgroundColor=bg.getCSSHandle();
}if(!this.single){
for(var i=0;i<this.items.length;i++){
if(i!=this.selectedIndex){
this.items[i].onPaint(gc,false);
}}
}if(this.selectedIndex!=-1){
var item=this.items[this.selectedIndex];
gc=new $wt.graphics.GC(this);
item.onPaint(gc,true);
}else{
var x1=this.borderLeft;
var y1=(this.onBottom)?size.y-this.borderBottom-this.tabHeight-1:this.borderTop+this.tabHeight;
var x2=size.x-this.borderRight;
if(this.elements[3]==null){
var el=d$.createElement("DIV");
el.className="ctabfolder-border-line";
this.handle.appendChild(el);
this.elements[3]=el;
}s=this.elements[3].style;
s.left=(x1-1)+"px";
s.top=y1+"px";
s.width=(x2-x1+2)+"px";
s.backgroundColor=$wt.custom.CTabFolder.borderColor.getCSSHandle();
}if(gc==null){
gc=new $wt.graphics.GC(this);
}this.drawChevron(gc);
this.drawMinimize(gc);
this.drawMaximize(gc);
if(gc!=null){
gc.dispose();
}},"$wt.widgets.Event");
$_M(c$,"getBorderVisible",
function(){
return this.borderLeft==1;
});
$_V(c$,"getClientArea",
function(){
if(this.minimized)return new $wt.graphics.Rectangle(this.xClient,this.yClient,0,0);
var size=this.getSize();
var width=size.x-this.borderLeft-this.borderRight-2*this.marginWidth-2*this.highlight_margin;
var height=size.y-this.borderTop-this.borderBottom-2*this.marginHeight-this.highlight_margin-this.highlight_header;
height-=this.tabHeight;
return new $wt.graphics.Rectangle(this.xClient,this.yClient,width,height);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(pt){
if(this.items.length==0)return null;
var size=this.getSize();
if(size.x<=this.borderLeft+this.borderRight)return null;
if(this.showChevron&&this.chevronRect.contains(pt))return null;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
var rect=item.getBounds();
if(rect.contains(pt))return item;
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var tabItems=new Array(this.items.length);
System.arraycopy(this.items,0,tabItems,0,this.items.length);
return tabItems;
});
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return Character.toLowerCase(string.charAt(index));
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"stripMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while((index<length)&&((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0)))index++;

if(++index>=length)return string;
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0)){
return string.substring(0,index-1)+string.substring(index,length);
}index++;
}while(index<length);
return string;
},"~S");
$_M(c$,"getMinimized",
function(){
return this.minimized;
});
$_M(c$,"getMinimizeVisible",
function(){
return this.showMin;
});
$_M(c$,"getMinimumCharacters",
function(){
return this.minChars;
});
$_M(c$,"getMaximized",
function(){
return this.maximized;
});
$_M(c$,"getMaximizeVisible",
function(){
return this.showMax;
});
$_M(c$,"getMRUVisible",
function(){
return this.mru;
});
$_M(c$,"getRightItemEdge",
function(){
var x=this.getSize().x-this.borderRight-3;
if(this.showMin)x-=18;
if(this.showMax)x-=18;
if(this.showChevron)x-=27;
if(this.topRight!=null&&this.topRightAlignment!=4){
var rightSize=this.topRight.computeSize(-1,-1);
x-=rightSize.x+3;
}return Math.max(0,x);
});
$_M(c$,"getSelection",
function(){
if(this.selectedIndex==-1)return null;
return this.items[this.selectedIndex];
});
$_M(c$,"getSelectionBackground",
function(){
return this.selectionBackground;
});
$_M(c$,"getSelectionForeground",
function(){
return this.selectionForeground;
});
$_M(c$,"getSelectionIndex",
function(){
return this.selectedIndex;
});
$_M(c$,"getSimple",
function(){
return this.simple;
});
$_M(c$,"getSingle",
function(){
return this.single;
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
style&=-1153;
style|=this.onBottom?1024:128;
style&=-7;
style|=this.single?4:2;
if(this.borderLeft!=0)style|=2048;
return style;
});
$_M(c$,"getTabHeight",
function(){
if(this.fixedTabHeight!=-1)return this.fixedTabHeight;
return this.tabHeight-1;
});
$_M(c$,"getTabPosition",
function(){
return this.onBottom?1024:128;
});
$_M(c$,"getTopRight",
function(){
return this.topRight;
});
$_M(c$,"getUnselectedCloseVisible",
function(){
return this.showUnselectedClose;
});
$_M(c$,"getUnselectedImageVisible",
function(){
return this.showUnselectedImage;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item)return i;
}
return-1;
},"$wt.custom.CTabItem");
$_M(c$,"initAccessible",
function(){
var accessible=this.getAccessible();
accessible.addAccessibleListener((($_D("$wt.custom.CTabFolder$2")?0:org.eclipse.swt.custom.CTabFolder.$CTabFolder$2$()),$_N($wt.custom.CTabFolder$2,this,null)));
accessible.addAccessibleControlListener((($_D("$wt.custom.CTabFolder$3")?0:org.eclipse.swt.custom.CTabFolder.$CTabFolder$3$()),$_N($wt.custom.CTabFolder$3,this,null)));
this.addListener(13,(($_D("$wt.custom.CTabFolder$4")?0:org.eclipse.swt.custom.CTabFolder.$CTabFolder$4$()),$_N($wt.custom.CTabFolder$4,this,$_F("accessible",accessible))));
this.addListener(15,(($_D("$wt.custom.CTabFolder$5")?0:org.eclipse.swt.custom.CTabFolder.$CTabFolder$5$()),$_N($wt.custom.CTabFolder$5,this,$_F("accessible",accessible))));
});
$_M(c$,"onKeyDown",
function(event){
switch(event.keyCode){
case 16777219:
case 16777220:
var count=this.items.length;
if(count==0)return;
if(this.selectedIndex==-1)return;
var leadKey=(this.getStyle()&67108864)!=0?16777220:16777219;
var offset=event.keyCode==leadKey?-1:1;
var index;
if(!this.mru){
index=this.selectedIndex+offset;
}else{
var visible=$_A(this.items.length,0);
var idx=0;
var current=-1;
for(var i=0;i<this.items.length;i++){
if(this.items[i].showing){
if(i==this.selectedIndex)current=idx;
visible[idx++]=i;
}}
if(current+offset>=0&&current+offset<idx){
index=visible[current+offset];
}else{
if(this.showChevron){
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
e.x=this.chevronRect.x;
e.y=this.chevronRect.y;
e.width=this.chevronRect.width;
e.height=this.chevronRect.height;
e.doit=true;
for(var i=0;i<this.folderListeners.length;i++){
this.folderListeners[i].showList(e);
}
if(e.doit&&!this.isDisposed()){
this.showList(this.chevronRect);
}}return;
}}if(index<0||index>=count)return;
this.setSelection(index,true);
this.forceFocus();
}
},"$wt.widgets.Event");
$_M(c$,"onDispose",
function(event){
this.removeListener(12,this.listener);
this.notifyListeners(12,event);
event.type=0;
this.inDispose=true;
if(this.$showMenu!=null&&!this.$showMenu.isDisposed()){
this.$showMenu.dispose();
this.$showMenu=null;
}var length=this.items.length;
for(var i=0;i<length;i++){
if(this.items[i]!=null){
this.items[i].dispose();
}}
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionBgImage=null;
this.selectionBackground=null;
this.selectionForeground=null;
this.disposeSelectionHighlightGradientColors();
if(this.elements!=null){
for(var i=0;i<this.elements.length;i++){
var el=this.elements[i];
if(el!=null){
O$.destroyHandle(el);
this.elements[i]=null;
}}
this.elements=null;
}if(this.minElements!=null){
for(var i=0;i<this.minElements.length;i++){
var el=this.minElements[i];
if(el!=null){
O$.destroyHandle(el);
this.minElements[i]=null;
}}
this.minElements=null;
}if(this.maxElements!=null){
for(var i=0;i<this.maxElements.length;i++){
var el=this.maxElements[i];
if(el!=null){
O$.destroyHandle(el);
this.maxElements[i]=null;
}}
this.maxElements=null;
}if(this.closeElements!=null){
for(var i=0;i<this.closeElements.length;i++){
var el=this.closeElements[i];
if(el!=null){
O$.destroyHandle(el);
this.closeElements[i]=null;
}}
this.closeElements=null;
}},"$wt.widgets.Event");
$_M(c$,"onDragDetect",
function(event){
var consume=false;
if(this.chevronRect.contains(event.x,event.y)||this.minRect.contains(event.x,event.y)||this.maxRect.contains(event.x,event.y)){
consume=true;
}else{
for(var i=0;i<this.items.length;i++){
if(this.items[i].closeRect.contains(event.x,event.y)){
consume=true;
break;
}}
}if(consume){
event.type=0;
}},"$wt.widgets.Event");
$_M(c$,"onFocus",
function(event){
if(this.selectedIndex>=0){
this.redraw();
}else{
this.setSelection(0,true);
}},"$wt.widgets.Event");
$_M(c$,"onMnemonic",
function(event){
var key=event.character;
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null){
var mnemonic=this._findMnemonic(this.items[i].getText());
if((mnemonic).charCodeAt(0)!=('\0').charCodeAt(0)){
if((Character.toLowerCase(key)).charCodeAt(0)==(mnemonic).charCodeAt(0)){
this.setSelection(i,true);
return true;
}}}}
return false;
},"$wt.widgets.Event");
$_M(c$,"onMouseDoubleClick",
function(event){
if(event.button!=1||(event.stateMask&1048576)!=0||(event.stateMask&2097152)!=0)return;
var e=new $wt.widgets.Event();
e.item=this.getItem(new $wt.graphics.Point(event.x,event.y));
if(e.item!=null){
this.notifyListeners(14,e);
}},"$wt.widgets.Event");
$_M(c$,"onMouse",
function(event){
var x=event.x;
var y=event.y;
var loc=O$.calcuateRelativePosition(this.handle,d$.body);
x-=loc.x;
y-=loc.y;
switch(event.type){
case 6:
{
this.setToolTipText(null);
break;
}case 7:
{
if(this.minImageState!=1){
this.minImageState=1;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
}if(this.maxImageState!=1){
this.maxImageState=1;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
}if(this.chevronImageState!=1){
this.chevronImageState=1;
this.redraw(this.chevronRect.x,this.chevronRect.y,this.chevronRect.width,this.chevronRect.height,false);
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(i!=this.selectedIndex&&item.closeImageState!=0){
item.closeImageState=0;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}if(i==this.selectedIndex&&item.closeImageState!=1){
item.closeImageState=1;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}}
break;
}case 3:
{
if(this.minRect.contains(x,y)){
if(event.button!=1)return;
this.minImageState=3;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
this.update();
return;
}if(this.maxRect.contains(x,y)){
if(event.button!=1)return;
this.maxImageState=3;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
this.update();
return;
}if(this.chevronRect.contains(x,y)){
if(this.chevronImageState!=2){
this.chevronImageState=2;
}else{
this.chevronImageState=3;
}this.redraw(this.chevronRect.x,this.chevronRect.y,this.chevronRect.width,this.chevronRect.height,false);
this.update();
return;
}var item=null;
if(this.single){
if(this.selectedIndex!=-1){
var bounds=this.items[this.selectedIndex].getBounds();
if(bounds.contains(x,y)){
item=this.items[this.selectedIndex];
}}}else{
for(var i=0;i<this.items.length;i++){
var bounds=this.items[i].getBounds();
if(bounds.contains(x,y)){
item=this.items[i];
}}
}if(item!=null){
if(item.closeRect.contains(x,y)){
item.closeImageState=3;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
this.update();
return;
}var index=this.indexOf(item);
if(item.showing){
this.setSelection(index,true);
}return;
}break;
}case 5:
{
this._setToolTipText(event.x,event.y);
var close=false;
var minimize=false;
var maximize=false;
var chevron=false;
if(this.minRect.contains(x,y)){
minimize=true;
if(this.minImageState!=3&&this.minImageState!=2){
this.minImageState=2;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
}}if(this.maxRect.contains(x,y)){
maximize=true;
if(this.maxImageState!=3&&this.maxImageState!=2){
this.maxImageState=2;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
}}if(this.chevronRect.contains(x,y)){
chevron=true;
if(this.chevronImageState!=3&&this.chevronImageState!=2){
this.chevronImageState=2;
this.redraw(this.chevronRect.x,this.chevronRect.y,this.chevronRect.width,this.chevronRect.height,false);
}}if(this.minImageState!=1&&!minimize){
this.minImageState=1;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
}if(this.maxImageState!=1&&!maximize){
this.maxImageState=1;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
}if(this.chevronImageState!=1&&!chevron){
this.chevronImageState=1;
this.redraw(this.chevronRect.x,this.chevronRect.y,this.chevronRect.width,this.chevronRect.height,false);
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
close=false;
if(item.getBounds().contains(x,y)){
close=true;
if(item.closeRect.contains(x,y)){
if(item.closeImageState!=3&&item.closeImageState!=2){
item.closeImageState=2;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}}else{
if(item.closeImageState!=1){
item.closeImageState=1;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}}}if(i!=this.selectedIndex&&item.closeImageState!=0&&!close){
item.closeImageState=0;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}if(i==this.selectedIndex&&item.closeImageState!=1&&!close){
item.closeImageState=1;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
}}
break;
}case 4:
{
if(this.chevronRect.contains(x,y)){
var selected=this.chevronImageState==3;
if(!selected)return;
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
e.x=this.chevronRect.x;
e.y=this.chevronRect.y;
e.width=this.chevronRect.width;
e.height=this.chevronRect.height;
e.doit=true;
for(var i=0;i<this.folderListeners.length;i++){
this.folderListeners[i].showList(e);
}
if(e.doit&&!this.isDisposed()){
this.showList(this.chevronRect);
}return;
}if(this.minRect.contains(x,y)){
var selected=this.minImageState==3;
this.minImageState=2;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
if(!selected)return;
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
for(var i=0;i<this.folderListeners.length;i++){
if(this.minimized){
this.folderListeners[i].restore(e);
}else{
this.folderListeners[i].minimize(e);
}}
return;
}if(this.maxRect.contains(x,y)){
var selected=this.maxImageState==3;
this.maxImageState=2;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
if(!selected)return;
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
for(var i=0;i<this.folderListeners.length;i++){
if(this.maximized){
this.folderListeners[i].restore(e);
}else{
this.folderListeners[i].maximize(e);
}}
return;
}var item=null;
if(this.single){
if(this.selectedIndex!=-1){
var bounds=this.items[this.selectedIndex].getBounds();
if(bounds.contains(x,y)){
item=this.items[this.selectedIndex];
}}}else{
for(var i=0;i<this.items.length;i++){
var bounds=this.items[i].getBounds();
if(bounds.contains(x,y)){
item=this.items[i];
}}
}if(item!=null){
if(item.closeRect.contains(x,y)){
var selected=item.closeImageState==3;
item.closeImageState=2;
this.redraw(item.closeRect.x,item.closeRect.y,item.closeRect.width,item.closeRect.height,false);
if(!selected)return;
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
e.item=item;
e.doit=true;
for(var j=0;j<this.folderListeners.length;j++){
var listener=this.folderListeners[j];
listener.close(e);
}
for(var j=0;j<this.tabListeners.length;j++){
var listener=this.tabListeners[j];
listener.itemClosed(e);
}
if(e.doit){
item.dispose();
var display=this.getDisplay();
var pt=display.getCursorLocation();
pt=display.map(null,this,pt.x,pt.y);
var nextItem=this.getItem(pt);
if(nextItem!=null){
if(nextItem.closeRect.contains(pt)){
if(nextItem.closeImageState!=3&&nextItem.closeImageState!=2){
nextItem.closeImageState=2;
this.redraw(nextItem.closeRect.x,nextItem.closeRect.y,nextItem.closeRect.width,nextItem.closeRect.height,false);
}}else{
if(nextItem.closeImageState!=1){
nextItem.closeImageState=1;
this.redraw(nextItem.closeRect.x,nextItem.closeRect.y,nextItem.closeRect.width,nextItem.closeRect.height,false);
}}}}return;
}}}}
},"$wt.widgets.Event");
$_M(c$,"onPageTraversal",
function(event){
var count=this.items.length;
if(count==0)return false;
var index=this.selectedIndex;
if(index==-1){
index=0;
}else{
var offset=(event.detail==512)?1:-1;
if(!this.mru){
index=(this.selectedIndex+offset+count)%count;
}else{
var visible=$_A(this.items.length,0);
var idx=0;
var current=-1;
for(var i=0;i<this.items.length;i++){
if(this.items[i].showing){
if(i==this.selectedIndex)current=idx;
visible[idx++]=i;
}}
if(current+offset>=0&&current+offset<idx){
index=visible[current+offset];
}else{
if(this.showChevron){
var e=new $wt.custom.CTabFolderEvent(this);
e.widget=this;
e.time=event.time;
e.x=this.chevronRect.x;
e.y=this.chevronRect.y;
e.width=this.chevronRect.width;
e.height=this.chevronRect.height;
e.doit=true;
for(var i=0;i<this.folderListeners.length;i++){
this.folderListeners[i].showList(e);
}
if(e.doit&&!this.isDisposed()){
this.showList(this.chevronRect);
}}return true;
}}}this.setSelection(index,true);
return true;
},"$wt.widgets.Event");
$_M(c$,"onPaint",
function(event){
if(this.inDispose)return;
var font=this.getFont();
if(this.oldFont==null||!this.oldFont.equals(font)){
this.oldFont=font;
if(!this.updateTabHeight(false)){
this.updateItems();
this.redraw();
return;
}}this.drawBody(event);
this.drawTabArea(event);
},"$wt.widgets.Event");
$_M(c$,"onResize",
function(){
if(this.updateItems())this.redrawTabs();
var size=this.getSize();
if(this.oldSize==null){
this.redraw();
}else{
if(this.onBottom&&size.y!=this.oldSize.y){
this.redraw();
}else{
var x1=Math.min(size.x,this.oldSize.x);
if(size.x!=this.oldSize.x)x1-=this.borderRight+this.highlight_margin+2;
if(!this.simple)x1-=5;
var y1=Math.min(size.y,this.oldSize.y);
if(size.y!=this.oldSize.y)y1-=this.borderBottom+this.highlight_margin;
var x2=Math.max(size.x,this.oldSize.x);
var y2=Math.max(size.y,this.oldSize.y);
this.redraw(0,y1,x2,y2-y1,false);
this.redraw(x1,0,x2-x1,y2,false);
}}this.oldSize=size;
});
$_M(c$,"onTraverse",
function(event){
switch(event.detail){
case 2:
case 4:
case 16:
case 8:
var focusControl=this.getDisplay().getFocusControl();
if(focusControl===this)event.doit=true;
break;
case 128:
event.doit=this.onMnemonic(event);
if(event.doit)event.detail=0;
break;
case 512:
case 256:
event.doit=this.onPageTraversal(event);
event.detail=0;
break;
}
},"$wt.widgets.Event");
$_M(c$,"redrawTabs",
function(){
var size=this.getSize();
if(this.onBottom){
this.redraw(0,size.y-this.borderBottom-this.tabHeight-this.highlight_header-1,size.x,this.borderBottom+this.tabHeight+this.highlight_header+1,false);
}else{
this.redraw(0,0,size.x,this.borderTop+this.tabHeight+this.highlight_header+1,false);
}});
$_M(c$,"lazyRedraw",
function(){
this.redrawTick++;
{
window.setTimeout((function(tf,tick){
return function(){
if(tf.redrawTick==tick){
tf.onPaint(null);
if(tf.selectedIndex!=-1){
var control=tf.items[tf.selectedIndex].getControl();
if(control!=null&&!control.isDisposed()){
control.handle.style.zIndex=3;
}
}
}
};
})(this,this.redrawTick),100);
}});
$_M(c$,"redraw",
function(){
$_U(this,$wt.custom.CTabFolder,"redraw",[]);
this.lazyRedraw();
});
$_M(c$,"redraw",
function(x,y,width,height,all){
$_U(this,$wt.custom.CTabFolder,"redraw",[x,y,width,height,all]);
this.lazyRedraw();
},"~N,~N,~N,~N,~B");
$_M(c$,"removeCTabFolder2Listener",
function(listener){
if(this.folderListeners.length==0)return;
var index=-1;
for(var i=0;i<this.folderListeners.length;i++){
if(listener===this.folderListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.folderListeners.length==1){
this.folderListeners=new Array(0);
return;
}var newTabListeners=new Array(this.folderListeners.length-1);
System.arraycopy(this.folderListeners,0,newTabListeners,0,index);
System.arraycopy(this.folderListeners,index+1,newTabListeners,index,this.folderListeners.length-index-1);
this.folderListeners=newTabListeners;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"removeCTabFolderListener",
function(listener){
if(this.tabListeners.length==0)return;
var index=-1;
for(var i=0;i<this.tabListeners.length;i++){
if(listener===this.tabListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.tabListeners.length==1){
this.tabListeners=new Array(0);
return;
}var newTabListeners=new Array(this.tabListeners.length-1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,index);
System.arraycopy(this.tabListeners,index+1,newTabListeners,index,this.tabListeners.length-index-1);
this.tabListeners=newTabListeners;
},"$wt.custom.CTabFolderListener");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setBackground",
function(color){
this.bgColor=color;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.bgImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
if(this.gradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.gradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.bgImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.setBackground(Clazz.castNullAs("org.eclipse.swt.graphics.Color"));
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.gradientColors[i]=colors[i];
}
this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.gradientPercents[i]=percents[i];
}
this.gradientVertical=vertical;
this.setBackground(this.gradientColors[this.gradientColors.length-1]);
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image===this.bgImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.bgImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setBorderVisible",
function(show){
if((this.borderLeft==1)==show)return;
this.borderLeft=this.borderRight=show?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
},"~B");
$_M(c$,"setButtonBounds",
function(){
var size=this.getSize();
var oldX;
var oldY;
var oldWidth;
var oldHeight;
oldX=this.maxRect.x;
oldY=this.maxRect.y;
oldWidth=this.maxRect.width;
oldHeight=this.maxRect.height;
this.maxRect.x=this.maxRect.y=this.maxRect.width=this.maxRect.height=0;
if(this.showMax){
this.maxRect.x=size.x-this.borderRight-18-3;
if(this.borderRight>0)this.maxRect.x+=1;
this.maxRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.maxRect.width=18;
this.maxRect.height=18;
}if(oldX!=this.maxRect.x||oldWidth!=this.maxRect.width||oldY!=this.maxRect.y||oldHeight!=this.maxRect.height){
var left=Math.min(oldX,this.maxRect.x);
var right=Math.max(oldX+oldWidth,this.maxRect.x+this.maxRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.minRect.x;
oldY=this.minRect.y;
oldWidth=this.minRect.width;
oldHeight=this.minRect.height;
this.minRect.x=this.minRect.y=this.minRect.width=this.minRect.height=0;
if(this.showMin){
this.minRect.x=size.x-this.borderRight-this.maxRect.width-18-3;
if(this.borderRight>0)this.minRect.x+=1;
this.minRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.minRect.width=18;
this.minRect.height=18;
}if(oldX!=this.minRect.x||oldWidth!=this.minRect.width||oldY!=this.minRect.y||oldHeight!=this.minRect.height){
var left=Math.min(oldX,this.minRect.x);
var right=Math.max(oldX+oldWidth,this.minRect.x+this.minRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.topRightRect.x;
oldY=this.topRightRect.y;
oldWidth=this.topRightRect.width;
oldHeight=this.topRightRect.height;
this.topRightRect.x=this.topRightRect.y=this.topRightRect.width=this.topRightRect.height=0;
if(this.topRight!=null){
switch(this.topRightAlignment){
case 4:
{
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
if(this.single){
if(this.items.length==0||this.selectedIndex==-1){
this.topRightRect.x=this.borderLeft+3;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}else{
var item=this.items[this.selectedIndex];
if(item.x+item.width+7+27>=rightEdge)break;
this.topRightRect.x=item.x+item.width+7+27;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}}else{
if(this.showChevron)break;
if(this.items.length==0){
this.topRightRect.x=this.borderLeft+3;
}else{
var item=this.items[this.items.length-1];
this.topRightRect.x=item.x+item.width;
if(!this.simple&&this.items.length-1==this.selectedIndex)this.topRightRect.x+=this.curveWidth-this.curveIndent;
}this.topRightRect.width=Math.max(0,rightEdge-this.topRightRect.x);
}this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
break;
}case 131072:
{
var topRightSize=this.topRight.computeSize(-1,this.tabHeight,false);
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
this.topRightRect.x=rightEdge-topRightSize.x;
this.topRightRect.width=topRightSize.x;
this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
}}
this.topRight.setBounds(this.topRightRect);
}if(oldX!=this.topRightRect.x||oldWidth!=this.topRightRect.width||oldY!=this.topRightRect.y||oldHeight!=this.topRightRect.height){
var left=Math.min(oldX,this.topRightRect.x);
var right=Math.max(oldX+oldWidth,this.topRightRect.x+this.topRightRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.chevronRect.x;
oldY=this.chevronRect.y;
oldWidth=this.chevronRect.width;
oldHeight=this.chevronRect.height;
this.chevronRect.x=this.chevronRect.y=this.chevronRect.height=this.chevronRect.width=0;
if(this.single){
if(this.selectedIndex==-1||this.items.length>1){
this.chevronRect.width=27;
this.chevronRect.height=18;
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
if(this.selectedIndex==-1){
this.chevronRect.x=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.topRightRect.width-this.chevronRect.width;
}else{
var item=this.items[this.selectedIndex];
var w=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.chevronRect.width;
if(this.topRightRect.width>0)w-=this.topRightRect.width+3;
this.chevronRect.x=Math.min(item.x+item.width+3,w);
}if(this.borderRight>0)this.chevronRect.x+=1;
}}else{
if(this.showChevron){
this.chevronRect.width=27;
this.chevronRect.height=18;
var i=0;
var lastIndex=-1;
while(i<this.priority.length&&this.items[this.priority[i]].showing){
lastIndex=Math.max(lastIndex,this.priority[i++]);
}
if(lastIndex==-1)lastIndex=this.firstIndex;
var lastItem=this.items[lastIndex];
var w=lastItem.x+lastItem.width+3;
if(!this.simple&&lastIndex==this.selectedIndex)w+=this.curveWidth-2*this.curveIndent;
this.chevronRect.x=Math.min(w,this.getRightItemEdge());
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
}}if(oldX!=this.chevronRect.x||oldWidth!=this.chevronRect.width||oldY!=this.chevronRect.y||oldHeight!=this.chevronRect.height){
var left=Math.min(oldX,this.chevronRect.x);
var right=Math.max(oldX+oldWidth,this.chevronRect.x+this.chevronRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}});
$_M(c$,"setFont",
function(font){
if(font!=null&&font.equals(this.getFont()))return;
$_U(this,$wt.custom.CTabFolder,"setFont",[font]);
this.oldFont=this.getFont();
if(!this.updateTabHeight(false)){
this.updateItems();
this.redraw();
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.CTabFolder,"setForeground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setInsertMark",
function(item,after){
},"$wt.custom.CTabItem,~B");
$_M(c$,"setInsertMark",
function(index,after){
},"~N,~B");
$_M(c$,"setItemLocation",
function(){
var changed=false;
if(this.items.length==0)return false;
var size=this.getSize();
var y=this.onBottom?Math.max(this.borderBottom,size.y-this.borderBottom-this.tabHeight):this.borderTop;
if(this.single){
var defaultX=this.getDisplay().getBounds().width+10;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(i==this.selectedIndex){
this.firstIndex=this.selectedIndex;
var oldX=item.x;
var oldY=item.y;
item.x=this.borderLeft;
item.y=y;
item.showing=true;
if(this.showClose||item.showClose){
item.closeRect.x=this.borderLeft+4;
item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
}if(item.x!=oldX||item.y!=oldY)changed=true;
}else{
item.x=defaultX;
item.showing=false;
}}
}else{
var rightItemEdge=this.getRightItemEdge();
var maxWidth=rightItemEdge-this.borderLeft;
var width=0;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
width+=item.width;
item.showing=i==0?true:item.width>0&&width<=maxWidth;
if(!this.simple&&this.priority[i]==this.selectedIndex)width+=this.curveWidth-2*this.curveIndent;
}
var x=0;
var defaultX=this.getDisplay().getBounds().width+10;
this.firstIndex=this.items.length-1;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(!item.showing){
if(item.x!=defaultX)changed=true;
item.x=defaultX;
}else{
this.firstIndex=Math.min(this.firstIndex,i);
if(item.x!=x||item.y!=y)changed=true;
item.x=x;
item.y=y;
if(i==this.selectedIndex){
var edge=Math.min(item.x+item.width,rightItemEdge);
item.closeRect.x=edge-4-18;
}else{
item.closeRect.x=item.x+item.width-4-18;
}item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
x=x+item.width;
if(!this.simple&&i==this.selectedIndex)x+=this.curveWidth-2*this.curveIndent;
}}
}return changed;
});
$_M(c$,"setItemSize",
function(){
var changed=false;
if(this.isDisposed())return changed;
var size=this.getSize();
if(size.x<=0||size.y<=0)return changed;
this.xClient=this.borderLeft+this.marginWidth+this.highlight_margin;
if(this.onBottom){
this.yClient=this.borderTop+this.highlight_margin+this.marginHeight;
}else{
this.yClient=this.borderTop+this.tabHeight+this.highlight_header+this.marginHeight;
}this.showChevron=false;
if(this.single){
this.showChevron=true;
if(this.selectedIndex!=-1){
var tab=this.items[this.selectedIndex];
var gc=new $wt.graphics.GC(this);
var width=tab.preferredWidth(gc,true,false);
gc.dispose();
width=Math.min(width,this.getRightItemEdge()-this.borderLeft);
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}return changed;
}if(this.items.length==0)return changed;
var widths;
var gc=new $wt.graphics.GC(this);
var tabAreaWidth=size.x-this.borderLeft-this.borderRight-3;
if(this.showMin)tabAreaWidth-=18;
if(this.showMax)tabAreaWidth-=18;
if(this.topRightAlignment==131072&&this.topRight!=null){
var rightSize=this.topRight.computeSize(-1,-1,false);
tabAreaWidth-=rightSize.x+3;
}if(!this.simple)tabAreaWidth-=this.curveWidth-2*this.curveIndent;
tabAreaWidth=Math.max(0,tabAreaWidth);
var minWidth=0;
var minWidths=$_A(this.items.length,0);
for(var i=0;i<this.priority.length;i++){
var index=this.priority[i];
minWidths[index]=this.items[index].preferredWidth(gc,index==this.selectedIndex,true);
minWidth+=minWidths[index];
if(minWidth>tabAreaWidth)break;
}
if(minWidth>tabAreaWidth){
this.showChevron=this.items.length>1;
if(this.showChevron)tabAreaWidth-=27;
widths=minWidths;
var index=this.selectedIndex!=-1?this.selectedIndex:0;
if(tabAreaWidth<widths[index]){
widths[index]=Math.max(0,tabAreaWidth);
}}else{
var maxWidth=0;
var maxWidths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
maxWidths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,false);
maxWidth+=maxWidths[i];
}
if(maxWidth<=tabAreaWidth){
widths=maxWidths;
}else{
var extra=Math.floor((tabAreaWidth-minWidth)/this.items.length);
while(true){
var large=0;
var totalWidth=0;
for(var i=0;i<this.items.length;i++){
if(maxWidths[i]>minWidths[i]+extra){
totalWidth+=minWidths[i]+extra;
large++;
}else{
totalWidth+=maxWidths[i];
}}
if(totalWidth>=tabAreaWidth){
extra--;
break;
}if(large==0||tabAreaWidth-totalWidth<large)break;
extra++;
}
widths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
widths[i]=Math.min(maxWidths[i],minWidths[i]+extra);
}
}}gc.dispose();
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
var width=widths[i];
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
if(i==this.selectedIndex||this.showUnselectedClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}}
return changed;
});
$_M(c$,"setMaximizeVisible",
function(visible){
if(this.showMax==visible)return;
this.showMax=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximized",
function(maximize){
if(this.maximized==maximize)return;
if(maximize&&this.minimized)this.setMinimized(false);
this.maximized=maximize;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
},"~B");
$_M(c$,"setMinimizeVisible",
function(visible){
if(this.showMin==visible)return;
this.showMin=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setMinimized",
function(minimize){
if(this.minimized==minimize)return;
if(minimize&&this.maximized)this.setMaximized(false);
this.minimized=minimize;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
},"~B");
$_M(c$,"setMinimumCharacters",
function(count){
if(this.minChars==count)return;
this.minChars=count;
if(this.updateItems())this.redrawTabs();
},"~N");
$_M(c$,"setMRUVisible",
function(show){
if(this.mru==show)return;
this.mru=show;
if(!this.mru){
var idx=this.firstIndex;
var next=0;
for(var i=this.firstIndex;i<this.items.length;i++){
this.priority[next++]=i;
}
for(var i=0;i<idx;i++){
this.priority[next++]=i;
}
if(this.updateItems())this.redrawTabs();
}},"~B");
$_M(c$,"setSelection",
function(item){
var index=this.indexOf(item);
this.setSelection(index);
},"$wt.custom.CTabItem");
$_M(c$,"setSelection",
function(index){
if(index<0||index>=this.items.length)return;
var selection=this.items[index];
if(this.selectedIndex==index){
this.showItem(selection);
return;
}var oldIndex=this.selectedIndex;
this.selectedIndex=index;
if(oldIndex!=-1){
this.items[oldIndex].closeImageState=0;
}selection.closeImageState=1;
selection.showing=false;
var control=selection.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(oldIndex!=-1){
control=this.items[oldIndex].control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.showItem(selection);
this.redraw();
},"~N");
$_M(c$,"setSelection",
function(index,notify){
var oldSelectedIndex=this.selectedIndex;
this.setSelection(index);
if(notify&&this.selectedIndex!=oldSelectedIndex&&this.selectedIndex!=-1){
var event=new $wt.widgets.Event();
event.item=this.getItem(this.selectedIndex);
this.notifyListeners(13,event);
}},"~N,~B");
$_M(c$,"setSelectionBackground",
function(color){
this.setSelectionHighlightGradientColor(null);
if(this.selectionBackground===color)return;
if(color==null)color=this.getDisplay().getSystemColor(25);
this.selectionBackground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelectionBackground",
function(colors,percents){
this.setSelectionBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setSelectionBackground",
function(colors,percents,vertical){
var colorsLength;
var highlightBeginColor=null;
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(percents.length==colors.length-2){
highlightBeginColor=colors[colors.length-1];
colorsLength=colors.length-1;
}else{
colorsLength=colors.length;
}if(this.getDisplay().getDepth()<15){
colors=[colors[colorsLength-1]];
colorsLength=colors.length;
percents=[];
}}else{
colorsLength=0;
}if(this.selectionBgImage==null){
if((this.selectionGradientColors!=null)&&(colors!=null)&&(this.selectionGradientColors.length==colorsLength)){
var same=false;
for(var i=0;i<this.selectionGradientColors.length;i++){
if(this.selectionGradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.selectionGradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.selectionGradientPercents.length;i++){
same=this.selectionGradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.selectionGradientVertical==vertical)return;
}}else{
this.selectionBgImage=null;
}if(colors==null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.setSelectionBackground(Clazz.castNullAs("org.eclipse.swt.graphics.Color"));
this.setSelectionHighlightGradientColor(null);
}else{
this.selectionGradientColors=new Array(colorsLength);
for(var i=0;i<colorsLength;++i){
this.selectionGradientColors[i]=colors[i];
}
this.selectionGradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.selectionGradientPercents[i]=percents[i];
}
this.selectionGradientVertical=vertical;
this.setSelectionBackground(this.selectionGradientColors[this.selectionGradientColors.length-1]);
this.setSelectionHighlightGradientColor(highlightBeginColor);
}if(this.selectedIndex>-1)this.redraw();
},"~A,~A,~B");
$_M(c$,"setSelectionHighlightGradientColor",
function(start){
this.selectionHighlightGradientBegin=null;
if(start==null)return;
if(this.getDisplay().getDepth()<15)return;
if(this.selectionGradientColors.length<2)return;
this.selectionHighlightGradientBegin=start;
if(!this.isSelectionHighlightColorsCacheHit(start))this.createSelectionHighlightGradientColors(start);
},"$wt.graphics.Color");
$_M(c$,"isSelectionHighlightColorsCacheHit",
function(start){
if(this.selectionHighlightGradientColorsCache==null)return false;
if(this.selectionHighlightGradientColorsCache.length<2)return false;
var highlightBegin=this.selectionHighlightGradientColorsCache[0];
var highlightEnd=this.selectionHighlightGradientColorsCache[this.selectionHighlightGradientColorsCache.length-1];
if(!highlightBegin.equals(start))return false;
if(this.selectionHighlightGradientColorsCache.length!=this.tabHeight)return false;
if(!highlightEnd.equals(this.selectionBackground))return false;
return true;
},"$wt.graphics.Color");
$_M(c$,"setSelectionBackground",
function(image){
this.setSelectionHighlightGradientColor(null);
if(image===this.selectionBgImage)return;
if(image!=null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.disposeSelectionHighlightGradientColors();
}this.selectionBgImage=image;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setSelectionForeground",
function(color){
if(this.selectionForeground===color)return;
if(color==null)color=this.getDisplay().getSystemColor(24);
this.selectionForeground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"createSelectionHighlightGradientColors",
function(start){
this.disposeSelectionHighlightGradientColors();
if(start==null)return;
var fadeGradientSize=this.tabHeight;
var from=start.getRGB();
var to=this.selectionBackground.getRGB();
this.selectionHighlightGradientColorsCache=new Array(fadeGradientSize);
var denom=fadeGradientSize-1;
for(var i=0;i<fadeGradientSize;i++){
var propFrom=denom-i;
var propTo=i;
var red=Math.floor((to.red*propTo+from.red*propFrom)/denom);
var green=Math.floor((to.green*propTo+from.green*propFrom)/denom);
var blue=Math.floor((to.blue*propTo+from.blue*propFrom)/denom);
this.selectionHighlightGradientColorsCache[i]=new $wt.graphics.Color(this.getDisplay(),red,green,blue);
}
},"$wt.graphics.Color");
$_M(c$,"disposeSelectionHighlightGradientColors",
function(){
if(this.selectionHighlightGradientColorsCache==null)return;
for(var i=0;i<this.selectionHighlightGradientColorsCache.length;i++){
this.selectionHighlightGradientColorsCache[i].dispose();
}
this.selectionHighlightGradientColorsCache=null;
});
$_M(c$,"getSelectionBackgroundGradientBegin",
function(){
if(this.selectionGradientColors==null)return this.getSelectionBackground();
if(this.selectionGradientColors.length==0)return this.getSelectionBackground();
return this.selectionGradientColors[0];
});
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setSingle",
function(single){
if(this.single!=single){
this.single=single;
if(!single){
for(var i=0;i<this.items.length;i++){
if(i!=this.selectedIndex&&this.items[i].closeImageState==1){
this.items[i].closeImageState=0;
}}
}var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setTabHeight",
function(height){
this.fixedTabHeight=height;
this.updateTabHeight(false);
},"~N");
$_M(c$,"setTabPosition",
function(position){
if(this.onBottom!=(position==1024)){
this.onBottom=position==1024;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderRight;
this.updateTabHeight(true);
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~N");
$_M(c$,"setTopRight",
function(control){
this.setTopRight(control,131072);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(control,alignment){
this.topRight=control;
this.topRightAlignment=alignment;
if(this.updateItems())this.redraw();
},"$wt.widgets.Control,~N");
$_M(c$,"setUnselectedCloseVisible",
function(visible){
if(this.showUnselectedClose==visible)return;
this.showUnselectedClose=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setUnselectedImageVisible",
function(visible){
if(this.showUnselectedImage==visible)return;
this.showUnselectedImage=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"showItem",
function(item){
var index=this.indexOf(item);
var idx=-1;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index){
idx=i;
break;
}}
if(this.mru){
var newPriority=$_A(this.priority.length,0);
System.arraycopy(this.priority,0,newPriority,1,idx);
System.arraycopy(this.priority,idx+1,newPriority,idx+1,this.priority.length-idx-1);
newPriority[0]=index;
this.priority=newPriority;
}if(item.isShowing())return;
this.updateItems(index);
this.redrawTabs();
},"$wt.custom.CTabItem");
$_M(c$,"showList",
function(rect){
if(this.items.length==0||!this.showChevron)return;
if(this.$showMenu==null||this.$showMenu.isDisposed()){
this.$showMenu=new $wt.widgets.Menu(this);
}else{
var items=this.$showMenu.getItems();
for(var i=0;i<items.length;i++){
items[i].dispose();
}
}var id="CTabFolder_showList_Index";
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
if(tab.showing)continue;var item=new $wt.widgets.MenuItem(this.$showMenu,0);
item.setText(tab.getText());
item.setImage(tab.getImage());
item.setData("CTabFolder_showList_Index",tab);
item.addSelectionListener((($_D("$wt.custom.CTabFolder$6")?0:org.eclipse.swt.custom.CTabFolder.$CTabFolder$6$()),$_N($wt.custom.CTabFolder$6,this,null)));
}
var x=rect.x;
var y=rect.y+rect.height;
var location=this.getDisplay().map(this,null,x,y);
this.$showMenu.setLocation(location.x,location.y);
this.$showMenu.setVisible(true);
},"$wt.graphics.Rectangle");
$_M(c$,"showSelection",
function(){
if(this.selectedIndex!=-1){
this.showItem(this.getSelection());
}});
$_M(c$,"_setToolTipText",
function(x,y){
var oldTip=this.getToolTipText();
var newTip=this._getToolTip(x,y);
if(newTip==null||!newTip.equals(oldTip)){
this.setToolTipText(newTip);
}},"~N,~N");
$_M(c$,"updateItems",
function(){
return this.updateItems(this.selectedIndex);
});
$_M(c$,"updateItems",
function(showIndex){
if(!this.single&&!this.mru&&showIndex!=-1){
var firstIndex=showIndex;
if(this.priority[0]<showIndex){
var maxWidth=this.getRightItemEdge()-this.borderLeft;
if(!this.simple)maxWidth-=this.curveWidth-2*this.curveIndent;
var width=0;
var widths=$_A(this.items.length,0);
var gc=new $wt.graphics.GC(this);
for(var i=this.priority[0];i<=showIndex;i++){
widths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,true);
width+=widths[i];
if(width>maxWidth)break;
}
if(width>maxWidth){
width=0;
for(var i=showIndex;i>=0;i--){
if(widths[i]==0)widths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,true);
width+=widths[i];
if(width>maxWidth)break;
firstIndex=i;
}
}else{
firstIndex=this.priority[0];
for(var i=showIndex+1;i<this.items.length;i++){
widths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,true);
width+=widths[i];
if(width>=maxWidth)break;
}
if(width<maxWidth){
for(var i=this.priority[0]-1;i>=0;i--){
if(widths[i]==0)widths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,true);
width+=widths[i];
if(width>maxWidth)break;
firstIndex=i;
}
}}gc.dispose();
}if(firstIndex!=this.priority[0]){
var index=0;
for(var i=firstIndex;i<this.items.length;i++){
this.priority[index++]=i;
}
for(var i=0;i<firstIndex;i++){
this.priority[index++]=i;
}
}}var oldShowChevron=this.showChevron;
var changed=this.setItemSize();
changed=new Boolean(changed|this.setItemLocation()).valueOf();
this.setButtonBounds();
changed=new Boolean(changed|(this.showChevron!=oldShowChevron)).valueOf();
if(changed&&this.getToolTipText()!=null){
var pt=this.getDisplay().getCursorLocation();
pt=this.toControl(pt);
this._setToolTipText(pt.x,pt.y);
}return changed;
},"~N");
$_M(c$,"updateTabHeight",
function(force){
var style=this.getStyle();
if(this.fixedTabHeight==0&&(style&8388608)!=0&&(style&2048)==0)this.highlight_header=0;
var oldHeight=this.tabHeight;
if(this.fixedTabHeight!=-1){
this.tabHeight=this.fixedTabHeight==0?0:this.fixedTabHeight+1;
}else{
var tempHeight=0;
var gc=new $wt.graphics.GC(this);
if(this.items.length==0){
tempHeight=gc.textExtent("Default",9).y+2+2;
}else{
for(var i=0;i<this.items.length;i++){
tempHeight=Math.max(tempHeight,this.items[i].preferredHeight(gc));
}
}gc.dispose();
this.tabHeight=tempHeight;
}if(!force&&this.tabHeight==oldHeight)return false;
this.oldSize=null;
if(this.onBottom){
var d=this.tabHeight-12;
this.curve=[0,13+d,0,12+d,2,12+d,3,11+d,5,11+d,6,10+d,7,10+d,9,8+d,10,8+d,11,7+d,11+d,7,12+d,6,13+d,6,15+d,4,16+d,4,17+d,3,19+d,3,20+d,2,22+d,2,23+d,1];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
}else{
var d=this.tabHeight-12;
this.curve=[0,0,0,1,2,1,3,2,5,2,6,3,7,3,9,5,10,5,11,6,11+d,6+d,12+d,7+d,13+d,7+d,15+d,9+d,16+d,9+d,17+d,10+d,19+d,10+d,20+d,11+d,22+d,11+d,23+d,12+d];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
this.topCurveHighlightStart=[0,2,1,2,2,2,3,3,4,3,5,3,6,4,7,4,8,5,9,6,10,6];
this.topCurveHighlightEnd=[10+d,6+d,11+d,7+d,12+d,8+d,13+d,8+d,14+d,9+d,15+d,10+d,16+d,10+d,17+d,11+d,18+d,11+d,19+d,11+d,20+d,12+d,21+d,12+d,22+d,12+d];
}this.notifyListeners(11,new $wt.widgets.Event());
return true;
},"~B");
$_M(c$,"_getToolTip",
function(x,y){
if(this.showMin&&this.minRect.contains(x,y))return this.minimized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Minimize");
if(this.showMax&&this.maxRect.contains(x,y))return this.maximized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Maximize");
if(this.showChevron&&this.chevronRect.contains(x,y))return $WT.getMessage("SWT_ShowList");
var item=this.getItem(new $wt.graphics.Point(x,y));
if(item==null)return null;
if(!item.showing)return null;
if((this.showClose||item.showClose)&&item.closeRect.contains(x,y)){
return $WT.getMessage("SWT_Close");
}return item.getToolTipText();
},"~N,~N");
$_V(c$,"getBackground",
function(){
return this.bgColor;
});
c$.$CTabFolder$1$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
switch(event.type){
case 12:
this.b$["$wt.custom.CTabFolder"].onDispose(event);
break;
case 29:
this.b$["$wt.custom.CTabFolder"].onDragDetect(event);
break;
case 15:
this.b$["$wt.custom.CTabFolder"].onFocus(event);
break;
case 16:
this.b$["$wt.custom.CTabFolder"].onFocus(event);
break;
case 1:
this.b$["$wt.custom.CTabFolder"].onKeyDown(event);
break;
case 8:
this.b$["$wt.custom.CTabFolder"].onMouseDoubleClick(event);
break;
case 3:
this.b$["$wt.custom.CTabFolder"].onMouse(event);
break;
case 6:
this.b$["$wt.custom.CTabFolder"].onMouse(event);
break;
case 7:
this.b$["$wt.custom.CTabFolder"].onMouse(event);
break;
case 5:
this.b$["$wt.custom.CTabFolder"].onMouse(event);
break;
case 4:
this.b$["$wt.custom.CTabFolder"].onMouse(event);
break;
case 9:
this.b$["$wt.custom.CTabFolder"].onPaint(event);
break;
case 11:
this.b$["$wt.custom.CTabFolder"].onResize();
break;
case 31:
this.b$["$wt.custom.CTabFolder"].onTraverse(event);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.$CTabFolder$2$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$2",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(e){
var name=null;
var childID=e.childID;
if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
name=this.b$["$wt.custom.CTabFolder"].stripMnemonic(this.b$["$wt.custom.CTabFolder"].items[childID].getText());
}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+0){
name=$WT.getMessage("SWT_ShowList");
}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+1){
name=this.b$["$wt.custom.CTabFolder"].minimized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Minimize");
}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+2){
name=this.b$["$wt.custom.CTabFolder"].maximized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Maximize");
}e.result=name;
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getHelp",
function(e){
var help=null;
var childID=e.childID;
if(childID==-1){
help=this.b$["$wt.custom.CTabFolder"].getToolTipText();
}else if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
help=this.b$["$wt.custom.CTabFolder"].items[childID].getToolTipText();
}e.result=help;
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getKeyboardShortcut",
function(e){
var shortcut=null;
var childID=e.childID;
if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
var text=this.b$["$wt.custom.CTabFolder"].items[childID].getText();
if(text!=null){
var mnemonic=this.b$["$wt.custom.CTabFolder"]._findMnemonic(text);
if((mnemonic).charCodeAt(0)!=('\0').charCodeAt(0)){
shortcut="Alt+"+mnemonic;
}}}e.result=shortcut;
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
};
c$.$CTabFolder$3$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$3",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getChildAtPoint",
function(e){
var testPoint=this.b$["$wt.custom.CTabFolder"].toControl(e.x,e.y);
var childID=-2;
for(var i=0;i<this.b$["$wt.custom.CTabFolder"].items.length;i++){
if(this.b$["$wt.custom.CTabFolder"].items[i].getBounds().contains(testPoint)){
childID=i;
break;
}}
if(childID==-2){
if(this.b$["$wt.custom.CTabFolder"].showChevron&&this.b$["$wt.custom.CTabFolder"].chevronRect.contains(testPoint)){
childID=this.b$["$wt.custom.CTabFolder"].items.length+0;
}else if(this.b$["$wt.custom.CTabFolder"].showMin&&this.b$["$wt.custom.CTabFolder"].minRect.contains(testPoint)){
childID=this.b$["$wt.custom.CTabFolder"].items.length+1;
}else if(this.b$["$wt.custom.CTabFolder"].showMax&&this.b$["$wt.custom.CTabFolder"].maxRect.contains(testPoint)){
childID=this.b$["$wt.custom.CTabFolder"].items.length+2;
}else{
var location=this.b$["$wt.custom.CTabFolder"].getBounds();
location.height=location.height-this.b$["$wt.custom.CTabFolder"].getClientArea().height;
if(location.contains(testPoint)){
childID=-1;
}}}e.childID=childID;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getLocation",
function(e){
var location=null;
var childID=e.childID;
if(childID==-1){
location=this.b$["$wt.custom.CTabFolder"].getBounds();
}else if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
location=this.b$["$wt.custom.CTabFolder"].items[childID].getBounds();
}else if(this.b$["$wt.custom.CTabFolder"].showChevron&&childID==this.b$["$wt.custom.CTabFolder"].items.length+0){
location=this.b$["$wt.custom.CTabFolder"].chevronRect;
}else if(this.b$["$wt.custom.CTabFolder"].showMin&&childID==this.b$["$wt.custom.CTabFolder"].items.length+1){
location=this.b$["$wt.custom.CTabFolder"].minRect;
}else if(this.b$["$wt.custom.CTabFolder"].showMax&&childID==this.b$["$wt.custom.CTabFolder"].items.length+2){
location=this.b$["$wt.custom.CTabFolder"].maxRect;
}if(location!=null){
var pt=this.b$["$wt.custom.CTabFolder"].toDisplay(location.x,location.y);
e.x=pt.x;
e.y=pt.y;
e.width=location.width;
e.height=location.height;
}},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildCount",
function(e){
e.detail=this.b$["$wt.custom.CTabFolder"].items.length+3;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getDefaultAction",
function(e){
var action=null;
var childID=e.childID;
if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
action=$WT.getMessage("SWT_Switch");
}if(childID>=this.b$["$wt.custom.CTabFolder"].items.length&&childID<this.b$["$wt.custom.CTabFolder"].items.length+3){
action=$WT.getMessage("SWT_Press");
}e.result=action;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getFocus",
function(e){
var childID=-2;
if(this.b$["$wt.custom.CTabFolder"].isFocusControl()){
if(this.b$["$wt.custom.CTabFolder"].selectedIndex==-1){
childID=-1;
}else{
childID=this.b$["$wt.custom.CTabFolder"].selectedIndex;
}}e.childID=childID;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getRole",
function(e){
var role=0;
var childID=e.childID;
if(childID==-1){
role=60;
}else if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
role=37;
}else if(childID>=this.b$["$wt.custom.CTabFolder"].items.length&&childID<this.b$["$wt.custom.CTabFolder"].items.length+3){
role=43;
}e.detail=role;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getSelection",
function(e){
e.childID=(this.b$["$wt.custom.CTabFolder"].selectedIndex==-1)?-2:this.b$["$wt.custom.CTabFolder"].selectedIndex;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(e){
var state=0;
var childID=e.childID;
if(childID==-1){
state=0;
}else if(childID>=0&&childID<this.b$["$wt.custom.CTabFolder"].items.length){
state=2097152;
if(this.b$["$wt.custom.CTabFolder"].isFocusControl()){
state|=1048576;
}if(this.b$["$wt.custom.CTabFolder"].selectedIndex==childID){
state|=2;
if(this.b$["$wt.custom.CTabFolder"].isFocusControl()){
state|=4;
}}}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+0){
state=this.b$["$wt.custom.CTabFolder"].showChevron?0:32768;
}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+1){
state=this.b$["$wt.custom.CTabFolder"].showMin?0:32768;
}else if(childID==this.b$["$wt.custom.CTabFolder"].items.length+2){
state=this.b$["$wt.custom.CTabFolder"].showMax?0:32768;
}e.detail=state;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildren",
function(e){
var childIdCount=this.b$["$wt.custom.CTabFolder"].items.length+3;
var children=new Array(childIdCount);
for(var i=0;i<childIdCount;i++){
children[i]=new Integer(i);
}
e.children=children;
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
};
c$.$CTabFolder$4$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$4",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
if(this.b$["$wt.custom.CTabFolder"].isFocusControl()){
if(this.b$["$wt.custom.CTabFolder"].selectedIndex==-1){
this.f$.accessible.setFocus(-1);
}else{
this.f$.accessible.setFocus(this.b$["$wt.custom.CTabFolder"].selectedIndex);
}}},"$wt.widgets.Event");
c$=$_P();
};
c$.$CTabFolder$5$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$5",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
if(this.b$["$wt.custom.CTabFolder"].selectedIndex==-1){
this.f$.accessible.setFocus(-1);
}else{
this.f$.accessible.setFocus(this.b$["$wt.custom.CTabFolder"].selectedIndex);
}},"$wt.widgets.Event");
c$=$_P();
};
c$.$CTabFolder$6$=function(){
$_H();
c$=$_W($wt.custom,"CTabFolder$6",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var menuItem=e.widget;
var index=this.b$["$wt.custom.CTabFolder"].indexOf(menuItem.getData("CTabFolder_showList_Index"));
this.b$["$wt.custom.CTabFolder"].setSelection(index,true);
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"borderColor",null,
"$DEFAULT_WIDTH",64,
"$DEFAULT_HEIGHT",64,
"BUTTON_SIZE",18,
"TOP_LEFT_CORNER",[0,6,1,5,1,4,4,1,5,1,6,0],
"TOP_LEFT_CORNER_HILITE",[5,2,4,2,3,3,2,4,2,5,1,6],
"TOP_RIGHT_CORNER",[-6,0,-5,1,-4,1,-1,4,-1,5,0,6],
"BOTTOM_LEFT_CORNER",[0,-6,1,-5,1,-4,4,-1,5,-1,6,0],
"BOTTOM_RIGHT_CORNER",[-6,0,-5,-1,-4,-1,-1,-4,-1,-5,0,-6],
"SIMPLE_TOP_LEFT_CORNER",[0,2,1,1,2,0],
"SIMPLE_TOP_RIGHT_CORNER",[-2,0,-1,1,0,2],
"SIMPLE_BOTTOM_LEFT_CORNER",[0,-2,1,-1,2,0],
"SIMPLE_BOTTOM_RIGHT_CORNER",[-2,0,-1,-1,0,-2],
"SIMPLE_UNSELECTED_INNER_CORNER",[0,0],
"TOP_LEFT_CORNER_BORDERLESS",[0,6,1,5,1,4,4,1,5,1,6,0],
"TOP_RIGHT_CORNER_BORDERLESS",[-7,0,-6,1,-5,1,-2,4,-2,5,-1,6],
"BOTTOM_LEFT_CORNER_BORDERLESS",[0,-6,1,-6,1,-5,2,-4,4,-2,5,-1,6,-1,6,0],
"BOTTOM_RIGHT_CORNER_BORDERLESS",[-7,0,-7,-1,-6,-1,-5,-2,-3,-4,-2,-5,-2,-6,-1,-6],
"SIMPLE_TOP_LEFT_CORNER_BORDERLESS",[0,2,1,1,2,0],
"SIMPLE_TOP_RIGHT_CORNER_BORDERLESS",[-3,0,-2,1,-1,2],
"SIMPLE_BOTTOM_LEFT_CORNER_BORDERLESS",[0,-3,1,-2,2,-1,3,0],
"SIMPLE_BOTTOM_RIGHT_CORNER_BORDERLESS",[-4,0,-3,-1,-2,-2,-1,-3],
"SELECTION_FOREGROUND",24,
"SELECTION_BACKGROUND",25,
"BORDER1_COLOR",18,
"FOREGROUND",21,
"BACKGROUND",22,
"BUTTON_BORDER",17,
"BUTTON_FILL",25,
"NONE",0,
"NORMAL",1,
"HOT",2,
"SELECTED",3);
c$.CLOSE_FILL=c$.prototype.CLOSE_FILL=new $wt.graphics.RGB(252,160,160);
$_S(c$,
"CHEVRON_CHILD_ID",0,
"MINIMIZE_CHILD_ID",1,
"MAXIMIZE_CHILD_ID",2,
"EXTRA_CHILD_ID_COUNT",3);
});
