$_L(["$wt.widgets.Composite"],"$wt.widgets.CoolBar",["$wt.graphics.Point","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.CoolBar", ".cool-bar-default {\nposition:absolute;\nbackground-color:buttonface;\ncursor:default;\n/*overflow:visible;\noverflow-x:hidden;*/\n}\n.cool-item-default {\nposition:absolute;\nborder:1px outset white;\ncursor:default;\nmargin:0;\nwhite-space:nowrap;\nheight:24px;\npadding-left:7px;\npadding-right:2px;\n/*float:left;*/\n}\n* html .cool-item-default {\nborder-style:solid;\nborder-color:white gray gray white;\n}\n.cool-item-border-none-none {\nborder-width:0 0 0 0;\n}\n.cool-item-border-none-left {\nborder-width:0 0 0 1px;\n}\n.cool-item-border-none-both {\nborder-width:0 1px 0 1px;\n}\n.cool-item-border-none-right {\nborder-width:0 1px 0 0;\n}\n.cool-item-border-top-none {\nborder-width:1px 0 0 0;\n}\n.cool-item-border-top-left {\nborder-width:1px 0 0 1px;\n}\n.cool-item-border-top-both {\nborder-width:1px 1px 0 1px;\n}\n.cool-item-border-top-right {\nborder-width:1px 1px 0 0;\n}\n.cool-item-border-both-none {\nborder-width:1px 0 1px 0;\n}\n.cool-item-border-both-left {\nborder-width:1px 0 1px 1px;\n}\n.cool-item-border-both-both {\nborder-width:1px 1px 1px 1px;\n}\n.cool-item-border-both-right {\nborder-width:1px 1px 1px 0;\n}\n.cool-item-border-bottom-none {\nborder-width:0 0 1px 0;\n}\n.cool-item-border-bottom-left {\nborder-width:0 0 1px 1px;\n}\n.cool-item-border-bottom-both {\nborder-width:0 1px 1px 1px;\n}\n.cool-item-border-bottom-right {\nborder-width:0 1px 1px 0;\n}\n.cool-bar-flat .cool-item-default {\nmargin:1px;\nborder:0 none transparent;\nborder:0 0 0 0;\n}\n.cool-item-handler {\nposition:absolute;\nleft:0;\nfont-size:0;\nmargin:2px 2px;\npadding:0;\nborder-left:4px ridge #ddd;\nheight:18px;\ncursor:w-resize;\n}\n* html .cool-item-handler {\nborder-left:2px solid white;\nborder-right:2px solid gray;\n}\n.cool-bar-locked .cool-item-handler {\nborder-left:4px solid buttonface;\ncursor:default;\n}\n.cool-item-content {\nposition:absolute;\nleft:10px;\ntop:0;\n}\n.cool-item-more {\ndisplay:none;\nposition:absolute;\nright:1px;\npadding:2px 1px;\nfont-size:7pt;\nfont-family:Arial, sans-serif;\n}\n.cool-item-more .cool-item-more-arrow {\nmargin-left:-2px;\n}\n.cool-item-more-enabled .cool-item-more {\ndisplay:block !important;\nfloat:right;\nborder:1px solid buttonface;\n}\n.cool-item-more-enabled .cool-item-more:hover {\nborder:1px outset white;\n}\n.cool-item-more-enabled {\npadding-right:14px;\n}\n.cool-bar-disabled .cool-item-handler {\ncursor:default;\n}\n.cool-bar-disabled .cool-item-more:hover {\nborder:1px solid buttonface !important;\n}\n.swt-widgets-coolbar {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.items = null;
this.originalItems = null;
this.locked = false;
this.ignoreResize = false;
$_Z (this, arguments);
}, $wt.widgets, "CoolBar", $wt.widgets.Composite);
$_K (c$, 
function (parent, style) {
$_R (this, $wt.widgets.CoolBar, [parent, $wt.widgets.CoolBar.checkStyle (style)]);
}, "$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
var count=this.items.length;
if(count!=0){
this.ignoreResize=true;
var redraw=false;
var rowHeight=0;
var rowWidth=0;
var separator=(this.style&8388608)==0?2:0;
for(var i=0;i<count;i++){
if(this.items[i].wrap){
width=Math.max(width,rowWidth-separator);
rowWidth=0;
height+=rowHeight;
height+=2;
rowHeight=0;
}if(this.items[i].ideal){
rowWidth+=7+2+Math.max(this.items[i].idealWidth,this.items[i].minimumWidth+2)+separator;
if(this.items[i].control==null){
rowHeight=Math.max(rowHeight,4);
}else{
rowHeight=Math.max(rowHeight,this.items[i].idealHeight);
}}else{
if(this.items[i].control!=null){
rowWidth+=this.items[i].control.getSize().x+9+2+2+separator;
}else{
rowWidth+=9+2+2+separator;
rowHeight=Math.max(rowHeight,4);
}}}
width=Math.max(width,rowWidth-separator);
height+=rowHeight;
if(redraw){
}this.ignoreResize=false;
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
height+=border*2;
width+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.CoolBar,"createHandle",[]);
this.state&=-3;
var cssName=" cool-bar-default";
if((this.style&8388608)!=0){
cssName+=" cool-bar-flat";
}this.handle.className+=cssName;
});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=0;
id=this.items.length;
if((item.style&4)!=0){
}var lastIndex=this.getLastIndexOfRow(index-1);
var fixLast=index==lastIndex+1;
if(fixLast){
}if(index==0&&count>0){
this.getItem(0).setWrap(false);
}var el=d$.createElement("DIV");
el.className="cool-item-default";
if(index==count){
this.handle.appendChild(el);
}else{
this.handle.insertBefore(el,this.items[index].handle);
}item.handle=el;
el=d$.createElement("DIV");
el.className="cool-item-handler";
item.handle.appendChild(el);
if((item.style&4)!=0){
el=d$.createElement("DIV");
el.className="cool-item-more";
item.handle.appendChild(el);
item.moreHandle=el;
el=d$.createElement("SPAN");
el.appendChild(d$.createTextNode(">"));
item.moreHandle.appendChild(el);
el=d$.createElement("SPAN");
el.appendChild(d$.createTextNode(">"));
el.className="cool-item-more-arrow";
item.moreHandle.appendChild(el);
item.configure();
}item.configureDND(el);
el=d$.createElement("DIV");
el.className="cool-item-content";
item.handle.appendChild(el);
item.contentHandle=el;
if(fixLast){
this.resizeToPreferredWidth(lastIndex);
}item.wrap=false;
this.items[item.id=id]=item;
var length=this.originalItems.length;
var newOriginals=new Array(length+1);
System.arraycopy(this.originalItems,0,newOriginals,0,index);
System.arraycopy(this.originalItems,index,newOriginals,index+1,length-index);
newOriginals[index]=item;
this.originalItems=newOriginals;
},"$wt.widgets.CoolItem,~N");
$_M(c$,"moveDelta",
function(index,dx,dy){
if(dx==0&&dy==0)return false;
var needResize=false;
var needLayout=false;
if(dy==0){
var ws=$_A(this.items.length,0);
for(var i=0;i<ws.length;i++){
ws[i]=this.items[i].idealWidth;
}
var needCalculate=false;
var item=this.items[index];
if(item.wrap&&(dx<0||this.isLastItemOfRow(index))){
return false;
}if((index==0&&this.items.length>1)||(item.wrap&&!this.isLastItemOfRow(index))){
if(dx>=item.lastCachedWidth){
var next=this.items[index+1];
this.items[index]=next;
this.items[index+1]=item;
if(item.wrap){
next.wrap=true;
item.wrap=false;
}var width=next.idealWidth;
next.idealWidth=item.idealWidth;
item.idealWidth=width;
dx=dx-item.lastCachedWidth;
index++;
needLayout=true;
}}if(dx!=0&&index>0&&!(item.wrap&&!this.isLastItemOfRow(index))){
var cur=item;
var prev=this.items[index-1];
var idx=index-1;
while(dx<0){
if(prev.lastCachedWidth+dx<this.minWidth(prev)){
var ddx=prev.lastCachedWidth-this.minWidth(prev);
prev.idealWidth-=ddx;
item.idealWidth+=ddx;
needCalculate=true;
dx+=ddx;
if(dx<0){
if(idx-1>=0&&!this.items[idx].wrap){
idx--;
prev=this.items[idx];
}else{
if(dx+11<=0){
var swpItem=prev;
var swpIndex=index;
while(dx+this.minWidth(swpItem)<=0){
dx+=this.minWidth(swpItem);
swpItem=this.items[swpIndex-1];
this.items[swpIndex-1]=this.items[swpIndex];
this.items[swpIndex]=swpItem;
if(swpItem.wrap){
this.items[swpIndex-1].wrap=true;
swpItem.wrap=false;
}needLayout=true;
swpIndex--;
if(swpIndex==0||swpItem.wrap){
break;
}}
}dx=0;
break;
}}}else{
break;
}}
var next=null;
idx=index;
while(dx>0&&cur.lastCachedWidth-dx<this.minWidth(cur)){
var dxx=cur.lastCachedWidth-this.minWidth(cur);
prev.idealWidth+=dxx;
cur.idealWidth-=dxx;
needCalculate=true;
dx-=dxx;
if(dx>0){
if(idx+1<this.items.length&&!this.isLastItemOfRow(idx)){
idx++;
cur=this.items[idx];
if(next==null){
next=cur;
}}else{
if(dx>=11&&next!=null){
var swpItem=next;
var swpIndex=index;
while(dx>=this.minWidth(swpItem)){
this.items[swpIndex+1]=this.items[swpIndex];
this.items[swpIndex]=swpItem;
if(swpItem.wrap){
this.items[swpIndex].wrap=true;
swpItem.wrap=false;
}swpItem=this.items[swpIndex+1];
needLayout=true;
dx-=this.minWidth(swpItem);
swpIndex++;
if(swpIndex>=this.items.length||this.isLastItemOfRow(swpIndex)){
break;
}}
}dx=0;
break;
}}}
prev.idealWidth+=dx;
if(dx!=0){
needCalculate=true;
}if(item!==cur){
if(cur.idealWidth-dx<0){
if(cur.idealWidth!=0){
needCalculate=true;
}cur.idealWidth=0;
}else{
cur.idealWidth-=dx;
}}else{
item.idealWidth-=dx;
}}if(needCalculate&&!needLayout){
for(var i=0;i<ws.length;i++){
if(ws[i]!=this.items[i].idealWidth){
needLayout=true;
break;
}}
}}else{
var line=this.verticalLine(index);
if(line+dy<0){
if(index==0&&this.isLastItemOfRow(index)){
}else{
var ci=this.items[index];
if((index==0&&this.items.length>1)||(ci.wrap&&index<this.items.length-1)){
this.items[index+1].wrap=true;
}for(var i=index;i>0;i--){
this.items[i]=this.items[i-1];
}
this.items[0]=ci;
this.items[1].wrap=true;
ci.wrap=false;
needLayout=true;
needResize=true;
}}else if(line+dy<this.getVerticalLines()){
var lineNumber=line+dy;
var i=0;
for(i=0;i<this.items.length;i++){
if(lineNumber==0){
break;
}if(this.items[i].wrap){
lineNumber--;
}}
if(i>0)i--;
var ci=this.items[index];
if(index==0&&this.isLastItemOfRow(index)){
needResize=true;
}if(ci.wrap){
if(this.isLastItemOfRow(index)){
needResize=true;
}if(index<this.items.length-1){
this.items[index+1].wrap=true;
}}var x=ci.getPosition().x+dx;
if(x<=0){
if(i==0){
ci.wrap=false;
}else{
if(index==0&&i==1){
}else{
ci.wrap=true;
}if(i<this.items.length-1){
this.items[i+1].wrap=false;
}}}else{
var rowWidth=0;
var separator=2;
for(;i<this.items.length;i++){
var item=this.items[i];
var minimum=item.minimumWidth+(item.minimumWidth!=0?2:0);
rowWidth+=7+2+Math.max(item.idealWidth,minimum)+separator;
var xx=item.getPosition().x;
if(xx<x&&(x<=rowWidth||this.isLastItemOfRow(i))){
item.idealWidth=Math.max(0,x-xx-(7+2+minimum+separator));
minimum=ci.minimumWidth+(ci.minimumWidth!=0?2:0);
var mw=7+2+minimum+separator;
ci.idealWidth=Math.max(item.minimumWidth,Math.max(ci.idealWidth,rowWidth-x-mw));
if(rowWidth-x-mw<ci.idealWidth){
needResize=true;
}break;
}}
ci.wrap=false;
}if(dy<0&&x>0&&i<this.items.length-1){
i++;
}if(dy>0){
for(var j=index;j<i;j++){
this.items[j]=this.items[j+1];
}
}else{
for(var j=index;j>i;j--){
this.items[j]=this.items[j-1];
}
}this.items[i]=ci;
this.items[0].wrap=false;
needLayout=true;
}else{
if((this.items[index].wrap||index==0)&&this.isLastItemOfRow(index)){
}else{
var ci=this.items[index];
if(index>0&&ci.wrap){
this.items[index+1].wrap=true;
}for(var i=index;i<this.items.length-1;i++){
this.items[i]=this.items[i+1];
}
this.items[this.items.length-1]=ci;
ci.wrap=true;
needLayout=true;
needResize=true;
}}}var w=this.width;
var h=this.height;
if(needResize){
var computeSize=this.computeSize(-1,-1,false);
w=computeSize.x;
h=computeSize.y;
}if(needLayout){
this.SetWindowPos(this.handle,null,this.left,this.top,this.width,h,-1);
}if(w>this.width){
for(var i=index;i<this.items.length;i++){
if(this.isLastItemOfRow(i)){
this.moveDelta(i,this.width-this.height,0);
break;
}}
}if(h!=this.height&&!this.ignoreResize){
this.setBounds(this.left,this.top,Math.max(0,this.width),Math.max(0,h),0);
this.sendEvent(11);
}return needLayout;
},"~N,~N,~N");
$_M(c$,"getVerticalLines",
function(){
var lines=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i].wrap){
lines++;
}}
return lines+1;
});
$_M(c$,"verticalLine",
function(index){
var lines=0;
for(var i=0;i<=index;i++){
if(this.items[i].wrap){
lines++;
}}
return lines;
},"~N");
$_M(c$,"verticalLineByPixel",
function(px){
if(px<0){
return-1;
}var lines=0;
var rowHeight=0;
var height=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i].wrap){
height+=rowHeight+2;
rowHeight=0;
if(px<height){
return lines;
}lines++;
}if(this.items[i].control==null){
rowHeight=Math.max(rowHeight,4);
}else if(this.items[i].ideal){
rowHeight=Math.max(rowHeight,this.items[i].idealHeight);
}}
height+=rowHeight;
if(px<height){
return lines;
}return lines+1;
},"~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.CoolBar,"createWidget",[]);
this.items=new Array(0);
this.originalItems=new Array(0);
});
$_M(c$,"destroyItem",
function(item){
var index=this.indexOf(item);
var count=this.items.length;
if(count!=0){
var lastIndex=this.getLastIndexOfRow(index);
if(index==lastIndex){
this.resizeToMaximumWidth(lastIndex-1);
}}var control=item.control;
var wasVisible=control!=null&&!control.isDisposed()&&control.getVisible();
var nextItem=null;
if(item.getWrap()){
if(index+1<count){
nextItem=this.getItem(index+1);
this.ignoreResize=!nextItem.getWrap();
}}O$.destroyHandle(this.items[index].handle);
this.items[item.id]=null;
item.id=-1;
if(this.ignoreResize){
nextItem.setWrap(true);
this.ignoreResize=false;
}if(wasVisible)control.setVisible(true);
index=0;
while(index<this.originalItems.length){
if(this.originalItems[index]===item)break;
index++;
}
var length=this.originalItems.length-1;
var newOriginals=new Array(length);
System.arraycopy(this.originalItems,0,newOriginals,0,index);
System.arraycopy(this.originalItems,index+1,newOriginals,index,length-index);
this.originalItems=newOriginals;
},"$wt.widgets.CoolItem");
$_M(c$,"getMargin",
function(index){
var margin=0;
margin=9;
if(!this.isLastItemOfRow(index)){
margin+=2;
}return margin;
},"~N");
$_M(c$,"minWidth",
function(item){
return 7+2+item.minimumWidth+(item.minimumWidth!=0?4:0)+(!this.isLastItemOfRow(this.indexOf(item))?2:0);
},"$wt.widgets.CoolItem");
$_V(c$,"enableWidget",
function(enabled){
O$.updateCSSClass(this.handle,"cool-bar-disabled",!enabled);
},"~B");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemOrder",
function(){
var count=this.items.length;
var indices=$_A(count,0);
for(var i=0;i<count;i++){
var item=this.items[i];
var index=0;
while(index<this.originalItems.length){
if(this.originalItems[index]===item)break;
index++;
}
indices[i]=index;
}
return indices;
});
$_M(c$,"getItems",
function(){
var count=this.items.length;
var result=new Array(count);
for(var i=0;i<count;i++){
result[i]=this.items[i];
}
return result;
});
$_M(c$,"getItemSizes",
function(){
var count=this.items.length;
var sizes=new Array(count);
var separator=(this.style&8388608)==0?2:0;
for(var i=0;i<count;i++){
var size=this.items[i].getSize();
if(!this.isLastItemOfRow(i))size.x+=separator;
sizes[i]=size;
}
return sizes;
});
$_M(c$,"getLastIndexOfRow",
function(index){
var count=this.items.length;
if(count==0)return-1;
for(var i=index+1;i<count;i++){
if(this.items[i].wrap){
return i-1;
}}
return count-1;
},"~N");
$_M(c$,"isLastItemOfRow",
function(index){
var count=this.items.length;
if(index+1==count)return true;
return(this.items[index+1].wrap);
},"~N");
$_M(c$,"getLocked",
function(){
return this.locked;
});
$_M(c$,"getWrapIndices",
function(){
var items=this.getItems();
var indices=$_A(items.length,0);
var count=0;
for(var i=0;i<items.length;i++){
if(items[i].getWrap())indices[count++]=i;
}
var result=$_A(count,0);
System.arraycopy(indices,0,result,0,count);
return result;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(item===this.items[i]){
return i;
}}
return-1;
},"$wt.widgets.CoolItem");
$_M(c$,"resizeToPreferredWidth",
function(index){
var count=this.items.length;
if(0<=index&&index<count){
}},"~N");
$_M(c$,"resizeToMaximumWidth",
function(index){
var count=this.items.length;
if(0<=index&&index<count){
}},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
$_U(this,$wt.widgets.CoolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.CoolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control===control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBackgroundPixel",
function(pixel){
if(this.background==pixel)return;
this.background=pixel;
},"~N");
$_M(c$,"setForegroundPixel",
function(pixel){
if(this.foreground==pixel)return;
this.foreground=pixel;
},"~N");
$_M(c$,"setItemColors",
function(foreColor,backColor){
},"~N,~N");
$_M(c$,"setItemLayout",
function(itemOrder,wrapIndices,sizes){
this.setRedraw(false);
this.setItemOrder(itemOrder);
this.setWrapIndices(wrapIndices);
this.setItemSizes(sizes);
this.setRedraw(true);
},"~A,~A,~A");
$_M(c$,"setItemOrder",
function(itemOrder){
var itemCount=this.items.length;
var set=$_A(itemCount,false);
for(var i=0;i<itemOrder.length;i++){
var index=itemOrder[i];
set[index]=true;
}
for(var i=0;i<itemOrder.length;i++){
var id=this.originalItems[itemOrder[i]].id;
var index=id;
if(index!=i){
var lastItemSrcRow=this.getLastIndexOfRow(index);
var lastItemDstRow=this.getLastIndexOfRow(i);
if(index==lastItemSrcRow){
this.resizeToPreferredWidth(index);
}if(i==lastItemDstRow){
this.resizeToPreferredWidth(i);
}if(i==this.handle.childNodes.length-1){
this.handle.appendChild(this.items[index].handle);
}else{
this.handle.insertBefore(this.items[index].handle,this.handle.childNodes[i]);
}if(index==lastItemSrcRow&&index-1>=0){
this.resizeToMaximumWidth(index-1);
}if(i==lastItemDstRow){
this.resizeToMaximumWidth(i);
}}}
},"~A");
$_M(c$,"setItemSizes",
function(sizes){
var count=this.items.length;
for(var i=0;i<count;i++){
this.items[i].setSize(sizes[i].x,sizes[i].y);
}
},"~A");
$_M(c$,"setLocked",
function(locked){
this.locked=locked;
O$.updateCSSClass(this.handle,"cool-bar-locked",locked);
},"~B");
$_M(c$,"setWrapIndices",
function(indices){
if(indices==null)indices=$_A(0,0);
var count=this.getItemCount();
for(var i=0;i<indices.length;i++){
}
this.setRedraw(false);
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(item.getWrap()){
this.resizeToPreferredWidth(i-1);
item.setWrap(false);
}}
this.resizeToMaximumWidth(count-1);
for(var i=0;i<indices.length;i++){
var index=indices[i];
if(0<=index&&index<items.length){
var item=items[index];
item.setWrap(true);
this.resizeToMaximumWidth(index-1);
}}
this.setRedraw(true);
},"~A");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var lines=this.getVerticalLines();
var lineNo=0;
var itemNo=0;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(this.items[i].wrap){
lineNo++;
itemNo=0;
}var s=item.handle.style;
var bounds=item.getBounds();
s.left=bounds.x+"px";
s.top=bounds.y+"px";
var w=bounds.width-11;
s.width=(w>0?w:0)+"px";
s.height=bounds.height+"px";
var hCSS="none";
var vCSS="none";
if(lineNo==0){
if(lines>1){
hCSS="bottom";
}}else if(0<lineNo&&lineNo<lines-1){
hCSS="both";
}else{
hCSS="top";
}if(itemNo==0){
if(!this.isLastItemOfRow(i)){
vCSS="right";
}}else if(0<lineNo&&!this.isLastItemOfRow(i)){
vCSS="both";
}else{
vCSS="left";
}var e=item.handle;
var key="cool-item-border-";
var cssClazz=key+hCSS+"-"+vCSS;
var className=e.className;
if(className==null||className.length==0){
e.className=cssClazz;
}else{
var newClazz=new Array(0);
newClazz[0]=cssClazz;
var clazz=className.$plit("\\s");
for(var k=0;k<clazz.length;k++){
if(clazz[k].indexOf(key)==-1){
newClazz[newClazz.length]=clazz[k];
}}
{
e.className=newClazz.join(" ");
}}if(item.control!=null){
var ww=w-2-(this.isLastItemOfRow(i)?0:2);
var more=false;
if((item.style&4)!=0){
more=item.control.computeSize(-1,bounds.height).x+8>=ww;
O$.updateCSSClass(item.handle,"cool-item-more-enabled",more);
}if(more){
item.moreHandle.style.height=(bounds.height-6>0?bounds.height-6:0)+"px";
s.width=(w-12>0?w-12:0)+"px";
item.control.setSize(ww-8,bounds.height);
}else{
item.control.setSize(ww,bounds.height);
}}itemNo++;
}
if(uFlags==-1){
return false;
}return $_U(this,$wt.widgets.CoolBar,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_S(c$,
"SEPARATOR_WIDTH",2,
"MAX_WIDTH",0x7FFF);
});
