$_L(["$wt.widgets.Composite","$wt.custom.CTabFolder2Listener","$.CTabFolderListener","$wt.graphics.RGB","$.Rectangle"],"$wt.custom.CTabFolder",["java.lang.Character","$wt.SWT","$wt.custom.CTabFolderLayout","$.CTabItem","$wt.events.SelectionAdapter","$wt.graphics.Color","$.GC","$.Point","$.Region","$wt.internal.browser.OS","$wt.widgets.Event","$.Label","$.Menu","$.MenuItem","$.Shell","$.TypedListener"],function(){
c$=$_C(function(){
this.itemMore=null;
this.contentArea=null;
this.offset=0;
this.marginWidth=0;
this.marginHeight=0;
this.MIN_TAB_WIDTH=4;
this.xClient=0;
this.yClient=0;
this.onBottom=false;
this.single=false;
this.simple=true;
this.fixedTabHeight=-1;
this.tabHeight=0;
this.minChars=20;
this.imageList=null;
this.items=null;
this.firstIndex=-1;
this.selectedIndex=-1;
this.priority=null;
this.mru=false;
this.folderListeners=null;
this.tabListeners=null;
this.selectionBgImage=null;
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.selectionForeground=null;
this.selectionBackground=null;
this.bgImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.showUnselectedImage=true;
this.showClose=false;
this.showUnselectedClose=true;
this.chevronRect=null;
this.chevronImageState=1;
this.showChevron=false;
this.$showMenu=null;
this.showMin=false;
this.minRect=null;
this.minimized=false;
this.minImageState=1;
this.showMax=false;
this.maxRect=null;
this.maximized=false;
this.maxImageState=1;
this.topRight=null;
this.topRightRect=null;
this.topRightAlignment=131072;
this.borderLeft=0;
this.borderRight=0;
this.borderTop=0;
this.borderBottom=0;
this.highlight_margin=0;
this.highlight_header=0;
this.curve=null;
this.curveWidth=0;
this.curveIndent=0;
this.inDispose=false;
this.oldSize=null;
this.oldFont=null;
this.toolTipEvents=null;
this.toolTipListener=null;
this.toolTipShell=null;
this.toolTipLabel=null;
this.buttonArea=null;
this.nwCorner=null;
this.neCorner=null;
$_Z(this,arguments);
},$wt.custom,"CTabFolder",$wt.widgets.Composite);
$_Y(c$,function(){
this.priority=$_A(0,0);
this.folderListeners=new Array(0);
this.tabListeners=new Array(0);
this.chevronRect=new $wt.graphics.Rectangle(0,0,0,0);
this.minRect=new $wt.graphics.Rectangle(0,0,0,0);
this.maxRect=new $wt.graphics.Rectangle(0,0,0,0);
this.topRightRect=new $wt.graphics.Rectangle(0,0,0,0);
this.toolTipEvents=[7,32,5,3,29];
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CTabFolder,[parent,$wt.custom.CTabFolder.checkStyle(parent,style)]);
$_U(this,$wt.custom.CTabFolder,"setLayout",[new $wt.custom.CTabFolderLayout()]);
var style2=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
this.oldFont=this.getFont();
this.onBottom=(style2&1024)!=0;
this.showClose=(style2&64)!=0;
this.single=(style2&4)!=0;
this.borderLeft=this.borderRight=(style&2048)!=0?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
this.highlight_header=(style&8388608)!=0?1:3;
this.highlight_margin=(style&8388608)!=0?0:2;
var display=this.getDisplay();
this.selectionForeground=display.getSystemColor(24);
this.selectionBackground=display.getSystemColor(25);
($t$=$wt.custom.CTabFolder.borderColor=display.getSystemColor(18),$wt.custom.CTabFolder.prototype.borderColor=$wt.custom.CTabFolder.borderColor,$t$);
this.updateTabHeight(false);
this.initAccessible();
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(parent,style){
var mask=109053126;
style=style&mask;
if((style&128)!=0)style=style&-1025;
if((style&2)!=0)style=style&-5;
style|=1048576;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
if((style&67108864)!=0)return style;
if((parent.getStyle()&134217728)!=0&&(style&33554432)==0)return style;
return style|262144;
},"$wt.widgets.Composite,~N");
c$.fillRegion=$_M(c$,"fillRegion",
function(gc,region){
var clipping=new $wt.graphics.Region();
gc.getClipping(clipping);
region.intersect(clipping);
gc.setClipping(region);
gc.fillRectangle(region.getBounds());
gc.setClipping(clipping);
clipping.dispose();
},"$wt.graphics.GC,$wt.graphics.Region");
$_V(c$,"findThemeControl",
function(){
return null;
});
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
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.custom.CTabFolder,"computeSize",[wHint,hHint,changed]);
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<0){
width+=136;
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=O$.getContainerHeight(this.buttonArea);
if(O$.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}x-=4;
y-=4+lineHeight;
width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="ctab-item-default";
this.buttonArea.insertBefore(tab,this.itemMore);
item.textEl=d$.createElement("DIV");
item.textEl.className="ctab-item-main-default-left";
tab.appendChild(item.textEl);
item.rightEl=d$.createElement("DIV");
item.rightEl.className=item.cssClassForRight();
tab.appendChild(item.rightEl);
item.configureRightEl();
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
this.priority[index]=0;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
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
}this.hideToolTip();
this.setButtonBounds();
item.dispose();
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
}}else{
if(this.selectedIndex>index){
this.selectedIndex--;
}var left=-2;
var x=2;
for(var i=0;i<this.items.length;i++){
var w=O$.getContainerWidth(this.items[i].handle);
if(i<this.selectedIndex){
left+=w;
}var s=this.items[i].handle.style;
if(i==this.selectedIndex){
x-=2;
}if(i==this.selectedIndex+1&&!this.simple){
x+=15;
}s.left=x+"px";
x+=w;
}
}item.dispose();
this.updateItems();
},"$wt.custom.CTabItem");
$_M(c$,"getBorderVisible",
function(){
return this.borderLeft==1;
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var x=2;
var y=2;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=O$.getContainerHeight(this.items[0].handle);
if(O$.isIE)lineHeight++;
h-=lineHeight;
if(this.getSelectionIndex()==0){
h+=2;
}if((this.style&1024)==0){
y+=lineHeight;
}else{
if(O$.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border-O$.getContainerHeight(this.buttonArea);
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
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
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
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
var rightSize=this.topRight.computeSize(-1,-1,true);
x-=rightSize.x+3;
}return Math.max(0,x);
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return null;
return this.items[index];
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
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
return-1;
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
if(this.items[i]==item)return i;
}
return-1;
},"$wt.custom.CTabItem");
$_M(c$,"initAccessible",
function(){
});
$_M(c$,"removeCTabFolder2Listener",
function(listener){
if(this.folderListeners.length==0)return;
var index=-1;
for(var i=0;i<this.folderListeners.length;i++){
if(listener==this.folderListeners[i]){
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
if(listener==this.tabListeners[i]){
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
$_U(this,$wt.custom.CTabFolder,"setBackground",[color]);
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
this.setBackground(null);
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
if(image==this.bgImage)return;
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
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
this.setSelection(this.getSelectionIndex(),false);
return $_U(this,$wt.custom.CTabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height){
var h=(height-O$.getContainerHeight(this.buttonArea)-6);
this.contentArea.style.height=Math.max(h,0)+"px";
this.contentArea.style.width=Math.max(0,width-6)+"px";
this.buttonArea.style.width=Math.max(0,width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setBounds",[x,y,width,height]);
if(this.selectedIndex!=-1){
var control=this.items[this.selectedIndex].control;
if(control!=null&&control.isDisposed()){
control.setBounds(this.getClientArea());
}}},"~N,~N,~N,~N");
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
}},"~B");
$_M(c$,"setSelection",
function(item){
var index=this.indexOf(item);
if(index!=-1)this.setSelection(index,false);
},"$wt.custom.CTabItem");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
var oldIndex=this.getSelectionIndex();
if(oldIndex!=-1&&oldIndex!=index){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.updateSelection(index);
var newIndex=index;
if(oldIndex==index){
newIndex=-1;
}if(newIndex!=-1){
var item=this.items[newIndex];
this.selectedIndex=newIndex;
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}},"~N,~B");
$_M(c$,"updateSelection",
function(index){
var key=this.simple?"ctab-item-selected":"ctab-item-rounded-selected";
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
var control=this.items[i].control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].rightEl.className=this.items[i].cssClassForRight();
var el=this.buttonArea;
this.items[i].handle.style.height=(O$.getContainerHeight(this.buttonArea)-3)+"px";
this.items[i].isSelected=false;
if(i>index){
}}var w=O$.getContainerWidth(this.items[i].rightEl)+O$.getContainerWidth(this.items[i].textEl);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}if(i==index+1&&!this.simple){
x+=24;
}s.left=x+"px";
s.width=w+"px";
x+=w+2;
}
var ww=Integer.parseInt(this.handle.style.width);
if(ww>0){
}var cssName=this.items[index].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
var control=this.items[index].control;
if(control!=null&&!control.isDisposed()){
control.setVisible(true);
}this.items[index].handle.className+=" "+key;
this.items[index].rightEl.className=this.items[index].cssClassForRight();
this.items[index].handle.style.height=(O$.getContainerHeight(this.buttonArea)+3)+"px";
this.items[index].rightEl.style.height=this.items[index].handle.style.height;
this.items[index].isSelected=true;
var w=O$.getContainerWidth(this.items[index].rightEl)+O$.getContainerWidth(this.items[index].textEl);
if(!this.simple){
}var s=this.items[index].handle.style;
s.width=w+"px";
}this.items[index].handle.style.zIndex=(this.items.length+1)+"";
if(this.width!=0){
var w=O$.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-4);
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}}}var after=false;
for(var i=0;i<this.offset;i++){
if(this.items[i].control!=null){
this.items[i].control.setVisible(false);
}var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].handle.style.height=(O$.getContainerHeight(this.items[i].handle)-3)+"px";
}}
},"~N");
$_M(c$,"setSelectionBackground",
function(color){
if(this.selectionBackground==color)return;
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
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.selectionBgImage==null){
if((this.selectionGradientColors!=null)&&(colors!=null)&&(this.selectionGradientColors.length==colors.length)){
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
this.setSelectionBackground(null);
}else{
this.selectionGradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.selectionGradientColors[i]=colors[i];
}
this.selectionGradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.selectionGradientPercents[i]=percents[i];
}
this.selectionGradientVertical=vertical;
this.setSelectionBackground(this.selectionGradientColors[this.selectionGradientColors.length-1]);
}if(this.selectedIndex>-1)this.redraw();
},"~A,~A,~B");
$_M(c$,"setSelectionBackground",
function(image){
if(image==this.selectionBgImage)return;
if(image!=null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
}this.selectionBgImage=image;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setSelectionForeground",
function(color){
if(this.selectionForeground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(24);
this.selectionForeground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSize",
function(width,height){
this.contentArea.style.height=(height-O$.getContainerHeight(this.buttonArea)-6)+"px";
this.contentArea.style.width=(width-6)+"px";
this.buttonArea.style.width=(width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setSize",[width,height]);
},"~N,~N");
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
var key="ctab-folder-content-area-border-blue";
var cssName=this.contentArea.className;
var idx=cssName.indexOf(key);
if(simple&&idx!=-1){
this.contentArea.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!simple&&idx==-1){
this.contentArea.className=cssName+" "+key;
}var rectBefore=this.getClientArea();
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
item.setData(id,tab);
item.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabFolder$1")){
$_H();
c$=$_W($wt.custom,"CTabFolder$1",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var menuItem=e.widget;
var index=this.b$["$wt.custom.CTabFolder"].indexOf(menuItem.getData(this.f$.id));
this.b$["$wt.custom.CTabFolder"].setSelection(index,true);
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.custom.CTabFolder$1,i$,v$);
})(this,$_F("id",id)));
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
$_M(c$,"hideToolTip",
function(){
if(this.toolTipShell==null)return;
for(var i=0;i<this.toolTipEvents.length;i++){
this.removeListener(this.toolTipEvents[i],this.toolTipListener);
}
this.toolTipShell.dispose();
this.toolTipShell=null;
this.toolTipLabel=null;
});
$_M(c$,"showToolTip",
function(x,y){
if(this.toolTipShell==null){
this.toolTipShell=new $wt.widgets.Shell(this.getShell(),16388);
this.toolTipLabel=new $wt.widgets.Label(this.toolTipShell,16777216);
var display=this.toolTipShell.getDisplay();
this.toolTipLabel.setForeground(display.getSystemColor(28));
this.toolTipLabel.setBackground(display.getSystemColor(29));
for(var i=0;i<this.toolTipEvents.length;i++){
this.addListener(this.toolTipEvents[i],this.toolTipListener);
}
}if(this.updateToolTip(x,y)){
this.toolTipShell.setVisible(true);
}else{
this.hideToolTip();
}},"~N,~N");
$_M(c$,"updateItems",
function(){
return this.updateItems(this.selectedIndex);
});
$_M(c$,"updateItems",
function(showIndex){
return false;
},"~N");
$_M(c$,"updateTabHeight",
function(force){
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
$_M(c$,"updateToolTip",
function(x,y){
var tooltip=this._getToolTip(x,y);
if(tooltip==null)return false;
if(tooltip.equals(this.toolTipLabel.getText()))return true;
this.toolTipLabel.setText(tooltip);
var labelSize=this.toolTipLabel.computeSize(-1,-1,true);
labelSize.x+=2;
labelSize.y+=2;
this.toolTipLabel.setSize(labelSize);
this.toolTipShell.pack();
var area=this.toolTipShell.getClientArea();
this.toolTipLabel.setSize(area.width,area.height);
var cursorLocation=this.getDisplay().getCursorLocation();
var cursorHeight=21;
var size=this.toolTipShell.getSize();
var rect=this.getMonitor().getBounds();
var pt=new $wt.graphics.Point(cursorLocation.x,cursorLocation.y+cursorHeight+2);
pt.x=Math.max(pt.x,rect.x);
if(pt.x+size.x>rect.x+rect.width)pt.x=rect.x+rect.width-size.x;
if(pt.y+size.y>rect.y+rect.height){
pt.y=cursorLocation.y-2-size.y;
}this.toolTipShell.setLocation(pt);
return true;
},"~N,~N");
$_M(c$,"releaseHandle",
function(){
if(this.itemMore!=null){
O$.destroyHandle(this.itemMore);
this.itemMore=null;
}if(this.contentArea!=null){
O$.destroyHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.custom.CTabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.custom.CTabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.custom.CTabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control==control)item.setControl(null);
}
},"$wt.widgets.Control");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_V(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"~O,~S");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.custom.CTabFolder,"createHandle",[]);
this.state&=-3;
this.items=new Array(0);
var cssName="ctab-folder-default";
var roundTheCorners=false;
if((this.style&2048)!=0){
cssName+=" ctab-folder-border-default";
roundTheCorners=true;
}this.handle.className+=" "+cssName;
cssName="tab-folder-no-tab";
this.buttonArea=this.createCSSElement(this.handle,"ctab-folder-button-area");
this.contentArea=this.createCSSElement(this.handle,"ctab-folder-content-area");
this.itemMore=this.createCSSElement(this.buttonArea,"ctab-item-more");
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var clientArea=this.parent.getClientArea();
if(clientArea.height<=0||clientArea.width<=0){
System.out.println("client area has troubl xxxxxxxxxxxxx e");
}else{
}this.state&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.custom.CTabFolder,"createWidget",[]);
});
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control==child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"borderColor",null,
"$DEFAULT_WIDTH",64,
"$DEFAULT_HEIGHT",64,
"BUTTON_SIZE",18,
"TOP_LEFT_CORNER",[0,6,1,5,1,4,4,1,5,1,6,0],
"TOP_RIGHT_CORNER",[-6,0,-5,1,-4,1,-1,4,-1,5,0,6],
"BOTTOM_LEFT_CORNER",[0,-6,1,-5,1,-4,4,-1,5,-1,6,0],
"BOTTOM_RIGHT_CORNER",[-6,0,-5,-1,-4,-1,-1,-4,-1,-5,0,-6],
"SIMPLE_TOP_LEFT_CORNER",[0,2,1,1,2,0],
"SIMPLE_TOP_RIGHT_CORNER",[-2,0,-1,1,0,2],
"SIMPLE_BOTTOM_LEFT_CORNER",[0,-2,1,-1,2,0],
"SIMPLE_BOTTOM_RIGHT_CORNER",[-2,0,-1,-1,0,-2],
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
});
