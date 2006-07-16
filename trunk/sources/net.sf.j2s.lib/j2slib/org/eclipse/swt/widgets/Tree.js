Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.Tree",["$wt.SWT","$wt.graphics.Point","$wt.widgets.TreeColumn","$.TreeItem","$.TypedListener"],function(){
c$=$_C(function(){
this.items=null;
this.columns=null;
this.itemHandles=null;
this.columnHandles=null;
this.imageList=null;
this.dragStarted=false;
this.gestureCompleted=false;
this.insertAfter=false;
this.ignoreSelect=false;
this.ignoreExpand=false;
this.ignoreDeselect=false;
this.ignoreResize=false;
this.lockSelection=false;
this.oldSelected=false;
this.newSelected=false;
this.linesVisible=false;
this.customDraw=false;
this.printClient=false;
this.selections=null;
this.lastSelection=null;
this.hwndParent=null;
this.hwndHeader=null;
this.hAnchor=null;
this.hInsert=null;
$_Z(this,arguments);
},$wt.widgets,"Tree",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Tree,[parent,$wt.widgets.Tree.checkStyle(style)]);
this.selections=new Array(0);
this.items=new Array(0);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=768;
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addTreeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(17,typedListener);
this.addListener(18,typedListener);
},"$wt.events.TreeListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
if((this.style&512)!=0){
}if((this.style&256)!=0){
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Tree,"createHandle",[]);
this.state&=-3;
this.handle.className+=" tree-default";
if((this.style&2048)!=0){
this.handle.className+=" tree-border";
}var table=d$.createElement("TABLE");
table.style.backgroundColor="white";
this.handle.appendChild(table);
});
$_M(c$,"createItem",
function(column,index){
},"$wt.widgets.TreeColumn,~N");
$_M(c$,"createItem",
function(item,hParent,index){
if(this.items==null){
this.items=new Array(0);
}var count=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i].handle==null){
this.items[i]=null;
count++;
}}
if(count==this.items.length){
this.items=new Array(0);
}var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null){
tbody=d$.createElement("TBODY");
table.appendChild(tbody);
}var idx=-1;
if(hParent!=null){
for(var i=0;i<tbody.childNodes.length;i++){
if(tbody.childNodes[i]==hParent){
idx=i;
break;
}}
}var newTR=d$.createElement("TR");
item.handle=newTR;
var existedIndex=-1;
if(index>=0){
existedIndex=this.findItem(idx,index);
if(existedIndex!=-1){
tbody.insertBefore(newTR,tbody.childNodes[existedIndex]);
for(var i=this.items.length;i>existedIndex;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
item.index=existedIndex;
this.items[existedIndex]=item;
}}if(existedIndex==-1){
if(idx<0){
tbody.appendChild(newTR);
item.index=this.items.length;
this.items[this.items.length]=item;
}else{
var siblingIndex=this.findNextSiblingItem(idx);
if(siblingIndex==-1){
tbody.appendChild(newTR);
item.index=this.items.length;
this.items[this.items.length]=item;
}else{
tbody.insertBefore(newTR,tbody.childNodes[siblingIndex]);
for(var i=this.items.length;i>siblingIndex;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
item.index=siblingIndex;
this.items[siblingIndex]=item;
}}}if(item.parentItem!=null){
item.handle.style.display="none";
item.parentItem.updateModifier(-1);
}},"$wt.widgets.TreeItem,~O,~N");
$_M(c$,"toggleSelection",
function(item,isCtrlKeyHold,isShiftKeyHold){
if(item==null){
return false;
}if((this.style&2)!=0&&(isCtrlKeyHold||isShiftKeyHold)){
if(isCtrlKeyHold){
for(var i=0;i<this.selections.length;i++){
if(item==this.selections[i]){
var newSelections=new Array(this.selections.length);
for(var j=0;j<i;j++){
newSelections[j]=this.selections[j];
}
for(var j=i;j<this.selections.length-1;j++){
newSelections[j]=this.selections[j+1];
}
this.selections=newSelections;
item.showSelection(false);
this.lastSelection=item;
return false;
}}
this.selections[this.selections.length]=item;
this.lastSelection=item;
item.showSelection(true);
}else{
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null){
this.selections[i].showSelection(false);
}}
if(this.lastSelection!=null){
var idx1=Math.min(this.lastSelection.index,item.index);
var idx2=Math.max(this.lastSelection.index,item.index);
this.selections=new Array(0);
for(var i=idx1;i<=idx2;i++){
var ti=this.items[i];
if(ti.handle.style.display!="none"){
this.selections[this.selections.length]=ti;
ti.showSelection(true);
}}
return true;
}else{
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}}}else{
item.showSelection(true);
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null&&this.selections[i]!=item){
this.selections[i].showSelection(false);
}}
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}this.lastSelection=item;
return true;
},"$wt.widgets.TreeItem,~B,~B");
$_M(c$,"skipItems",
function(index){
var parentItem=this.items[index];
index++;
while(this.items[index]!=null){
var item=this.items[index];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[index-1]){
index=this.skipItems(index-1);
if(index==-1){
return-1;
}var ti=this.items[index];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti==parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return index;
}}else{
return index;
}}index++;
}
return-1;
},"~N");
$_M(c$,"createParent",
function(){
this.forceResize();
this.register();
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Tree,"createWidget",[]);
this.items=new Array(0);
this.columns=new Array(0);
});
$_M(c$,"deselectAll",
function(){
for(var i=0;i<this.selections.length;i++){
this.selections[i].showSelection(false);
}
});
$_M(c$,"destroyItem",
function(column){
},"$wt.widgets.TreeColumn");
$_M(c$,"destroyItem",
function(item){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Tree,"enableWidget",[enabled]);
},"~B");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"getGridLineWidth",
function(){
return 1;
});
$_M(c$,"getHeaderHeight",
function(){
return 16;
});
$_M(c$,"getHeaderVisible",
function(){
return false;
});
$_M(c$,"getImageSize",
function(){
if(this.imageList!=null)return this.imageList.getImageSize();
return new $wt.graphics.Point(0,this.getItemHeight());
});
$_M(c$,"getColumn",
function(index){
return this.columns[index];
},"~N");
$_M(c$,"getColumnCount",
function(){
return 0;
});
$_M(c$,"getColumns",
function(){
return this.columns;
});
$_M(c$,"getDescendantItems",
function(index){
var nextSiblingIdx=this.findNextSiblingItem(index);
if(nextSiblingIdx==-1){
nextSiblingIdx=this.items.length;
}var children=new Array(nextSiblingIdx-index-1);
for(var i=index+1;i<nextSiblingIdx;i++){
children[i-index-1]=this.items[i];
}
return children;
},"~N");
$_M(c$,"findItem",
function(parentIndex,index){
if(parentIndex<0){
for(var i=0;i<this.items.length;i++){
if(this.items[i].parentItem==null){
if(index==0){
return i;
}index--;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}}else{
return-1;
}}else{
if(index==0){
return parentIndex;
}index--;
}parentIndex++;
}
return-1;
},"~N,~N");
$_M(c$,"findNextSiblingItem",
function(parentIndex){
if(parentIndex<0){
parentIndex=0;
}var parentItem=this.items[parentIndex];
parentIndex++;
if(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem.parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}var ti=this.items[parentIndex];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti==parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return parentIndex;
}}else{
return parentIndex;
}}else{
return parentIndex;
}}return-1;
},"~N");
$_M(c$,"indexOf",
function(parentIndex,ti){
var index=0;
if(parentIndex<0){
if(ti.parentItem!=null){
return-1;
}for(var i=0;i<this.items.length;i++){
if(this.items[i]==ti){
return index;
}else if(this.items[i].parentItem==null){
index++;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}if(this.items[parentIndex].parentItem==parentItem.parentItem){
return-1;
}else{
if(this.items[parentIndex]==ti){
return index;
}index++;
}}else{
return-1;
}}else{
if(item==ti){
return index;
}index++;
}parentIndex++;
}
return-1;
},"~N,$wt.widgets.TreeItem");
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemCount",
function(hItem){
var count=0;
return this.items.length;
},"~N");
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var copiedItems=new Array(0);
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].parentItem==null){
copiedItems[copiedItems.length]=this.items[i];
}}
return copiedItems;
});
$_M(c$,"getItems",
function(hTreeItem){
var children=new Array(0);
if(hTreeItem<0){
hTreeItem=0;
}var parentItem=this.items[hTreeItem];
hTreeItem++;
while(this.items[hTreeItem]!=null){
var item=this.items[hTreeItem];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[hTreeItem-1]){
hTreeItem=this.skipItems(hTreeItem-1);
if(hTreeItem==-1){
return children;
}if(this.items[hTreeItem].parentItem==parentItem.parentItem){
return children;
}else{
children[children.length]=this.items[hTreeItem];
}}else{
return children;
}}else{
children[children.length]=item;
}hTreeItem++;
}
return children;
},"~N");
$_M(c$,"getLinesVisible",
function(){
return this.linesVisible;
});
$_M(c$,"getParentItem",
function(){
return null;
});
$_M(c$,"getSelection",
function(){
return this.selections;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getTopItem",
function(){
return this.items[0];
});
$_M(c$,"indexOf",
function(column){
var count=this.columns.length;
for(var i=0;i<count;i++){
if(this.columns[i]==column)return i;
}
return-1;
},"$wt.widgets.TreeColumn");
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]==item){
return i;
}}
return-1;
},"$wt.widgets.TreeItem");
$_M(c$,"releaseWidget",
function(){
var columnCount=this.columns.length;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
for(var i=0;i<columnCount;i++){
var column=this.columns[i];
if(!column.isDisposed())column.releaseResources();
}
this.columns=null;
$_U(this,$wt.widgets.Tree,"releaseWidget",[]);
});
$_M(c$,"removeAll",
function(){
this.ignoreDeselect=this.ignoreSelect=true;
this.updateScrollBar();
});
$_M(c$,"removeSelectionListener",
function(listener){
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeTreeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(17,listener);
this.eventTable.unhook(18,listener);
},"$wt.events.TreeListener");
$_M(c$,"setInsertMark",
function(item,before){
},"$wt.widgets.TreeItem,~B");
$_M(c$,"setLinesVisible",
function(show){
if(this.linesVisible==show)return;
this.linesVisible=show;
},"~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Tree,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setCheckboxImageList",
function(){
if((this.style&32)==0)return;
var count=5;
});
$_M(c$,"setHeaderVisible",
function(show){
this.setScrollWidth();
this.updateScrollBar();
},"~B");
$_V(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setScrollWidth",
function(){
});
$_M(c$,"setSelection",
function(items){
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1)){
this.deselectAll();
return;
}this.selections=items;
for(var i=0;i<items.length;i++){
items[i].showSelection(true);
}
},"~A");
$_M(c$,"setTopItem",
function(item){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"showItem",
function(hItem){
this.updateScrollBar();
},"$wt.internal.xhtml.Element");
$_M(c$,"showColumn",
function(column){
if(column.parent!=this)return;
var index=this.indexOf(column);
if(index==-1)return;
},"$wt.widgets.TreeColumn");
$_M(c$,"showItem",
function(item){
this.showItem(item.handle);
},"$wt.widgets.TreeItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"showWidget",
function(visible){
$_U(this,$wt.widgets.Tree,"showWidget",[visible]);
},"~B");
$_V(c$,"topHandle",
function(){
return this.hwndParent!=null?this.hwndParent:this.handle;
});
$_M(c$,"updateScrollBar",
function(){
});
$_S(c$,
"INSET",3,
"GRID_WIDTH",1,
"HEADER_MARGIN",10);
});
