Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.Table",["$wt.graphics.Point","$wt.internal.browser.OS","$wt.widgets.Control","$.Event","$.TableColumn","$.TableItem","$.TypedListener"],function(){
c$=$_C(function(){
this.items=null;
this.columns=null;
this.imageList=null;
this.currentItem=null;
this.tbody=null;
this.lastSelection=null;
this.selection=null;
this.lastIndexOf=0;
this.lastWidth=0;
this.customDraw=false;
this.cancelMove=false;
this.dragStarted=false;
this.fixScrollWidth=false;
this.tipRequested=false;
this.wasSelected=false;
this.ignoreActivate=false;
this.ignoreSelect=false;
this.ignoreShrink=false;
this.ignoreResize=false;
this.tbodyTRTemplate=null;
this.lineWidth=0;
this.columnMaxWidth=null;
$_Z(this,arguments);
},$wt.widgets,"Table",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Table,[parent,$wt.widgets.Table.checkStyle(style)]);
this.selection=new Array(0);
this.items=new Array(0);
this.columns=new Array(0);
this.columnMaxWidth=$_A(0,0);
this.lineWidth=0;
this.tbody=null;
},"$wt.widgets.Composite,~N");
$_M(c$,"_getItem",
function(index){
if(this.items[index]!=null)return this.items[index];
return this.items[index]=new $wt.widgets.TableItem(this,0,-1,false);
},"~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=768;
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"checkData",
function(item,redraw){
if(item.cached)return true;
if((this.style&268435456)!=0){
item.cached=true;
var event=new $wt.widgets.Event();
event.display=this.display;
event.item=item;
this.currentItem=item;
this.sendEvent(36,event);
this.currentItem=null;
if(this.isDisposed()||item.isDisposed())return false;
if(redraw){
if(!this.setScrollWidth(item,false)){
item.redraw();
}}}return true;
},"$wt.widgets.TableItem,~B");
$_M(c$,"clear",
function(index){
var count=this.items.length;
},"~N");
$_M(c$,"clear",
function(start,end){
if(start>end)return;
},"~N,~N");
$_M(c$,"clear",
function(indices){
if(indices.length==0)return;
},"~A");
$_M(c$,"clearAll",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=this.lineWidth;
var height=0;
if(this.items.length>0){
var t=this.items[0].getNameText();
height=(O$.getStringPlainHeight(t)+5)*(this.items.length+0);
}else{
height=24;
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Table,"createHandle",[]);
this.state&=-3;
this.handle.className+=" table-default";
var table=d$.createElement("TABLE");
this.handle.appendChild(table);
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"createItem",
function(column,index){
if(this.columns==null){
this.columns=new Array(0);
}if(this.handle==null){
return;
}var table=this.handle.childNodes[0];
var thead=null;
for(var i=0;i<table.childNodes.length;i++){
if("THEAD".equals(table.childNodes[i].nodeName)){
thead=table.childNodes[i];
break;
}}
if(thead==null){
thead=d$.createElement("THEAD");
thead.style.backgroundColor="menu";
table.appendChild(thead);
}var theadTR=null;
if(thead.childNodes!=null&&thead.childNodes.length!=0){
for(var i=0;i<thead.childNodes.length;i++){
if(thead.childNodes[i]!=null&&"TR".equals(thead.childNodes[i].nodeName)){
theadTR=thead.childNodes[i];
}}
}if(theadTR==null){
theadTR=d$.createElement("TR");
thead.appendChild(theadTR);
}var theadTD=d$.createElement("TD");
theadTD.className="table-column-default";
theadTD.style.whiteSpace="nowrap";
if(index<0||index>=theadTR.childNodes.length){
theadTR.appendChild(theadTD);
this.columns[index]=column;
}else{
theadTR.insertBefore(theadTD,theadTR.childNodes[index]);
for(var i=this.columns.length;i>index;i--){
this.columns[i]=this.columns[i-1];
}
this.columns[index]=column;
for(var i=0;i<this.items.length;i++){
var dataTD=d$.createElement("TD");
this.items[i].handle.insertBefore(dataTD,this.items[i].handle.childNodes[index]);
for(var j=this.items[i].strings.length;j>index;j--){
this.items[i].strings[j]=this.items[i].strings[j-1];
}
this.items[i].strings[index]="";
}
}if(theadTD.childNodes!=null){
for(var i=0;i<theadTD.childNodes.length;i++){
if(theadTD.childNodes[i]!=null){
theadTD.removeChild(theadTD.childNodes[i]);
}}
}theadTD.appendChild(d$.createTextNode(column.getText()));
theadTD.style.margin="0";
theadTD.style.padding="0";
column.handle=theadTD;
},"$wt.widgets.TableColumn,~N");
$_M(c$,"createItem",
function(item,index){
if(this.items==null){
this.items=new Array(0);
}item.index=index;
this.items[index]=item;
if(this.handle==null){
return;
}var table=this.handle.childNodes[0];
if(this.tbody==null)for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
this.tbody=table.childNodes[i];
break;
}}
if(this.tbody==null){
this.tbody=d$.createElement("TBODY");
table.appendChild(this.tbody);
}if(this.tbodyTRTemplate==null){
this.tbodyTRTemplate=d$.createElement("TR");
this.tbodyTRTemplate.className="table-item-default";
var length=this.columns.length;
for(var i=0;i<length;i++){
var td=d$.createElement("TD");
this.tbodyTRTemplate.appendChild(td);
var el=d$.createElement("DIV");
td.appendChild(el);
el.className="table-item-cell-default";
if(index==0&&(this.style&32)!=0){
var check=d$.createElement("INPUT");
check.type="checkbox";
el.appendChild(check);
item.check=check;
}var text=d$.createElement("DIV");
el.appendChild(text);
text.className="table-item-cell-text-default";
}
}var tbodyTR=this.tbodyTRTemplate.cloneNode(true);
if(index<0||index>=this.tbody.childNodes.length){
this.tbody.appendChild(tbodyTR);
this.items[index]=item;
}else{
this.tbody.insertBefore(tbodyTR,this.tbody.childNodes[index]);
for(var i=this.items.length;i>index;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
this.items[index]=item;
}item.handle=tbodyTR;
},"$wt.widgets.TableItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Table,"createWidget",[]);
this.items=new Array(0);
this.columns=new Array(0);
if((this.style&268435456)!=0)this.customDraw=true;
});
$_M(c$,"deselect",
function(indices){
if(indices.length==0)return;
for(var i=0;i<indices.length;i++){
if(indices[i]>=0){
this.items[indices[i]].showSelection(false);
}}
this.removeFromSelection(indices);
},"~A");
$_M(c$,"deselect",
function(index){
if(index<0)return;
this.items[index].showSelection(false);
this.removeFromSelection([index]);
},"~N");
$_M(c$,"deselect",
function(start,end){
var count=this.items.length;
if(start==0&&end==count-1){
this.deselectAll();
}else{
start=Math.max(0,start);
var indices=$_A(end-start+1,0);
for(var i=start;i<=end;i++){
this.items[i].showSelection(false);
indices[i-start]=i;
}
this.removeFromSelection(indices);
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
var items=this.getSelection();
for(var i=0;i<items.length;i++){
items[i].showSelection(false);
}
this.selection=new Array(0);
});
$_M(c$,"destroyItem",
function(column){
},"$wt.widgets.TableColumn");
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TableItem");
$_M(c$,"fixCheckboxImageList",
function(){
if((this.style&32)==0)return;
});
$_M(c$,"getTextWidth",
function(t){
var columnWidth=0;
if(t==null||t.length==0){
columnWidth=0;
}else{
columnWidth=O$.getStringPlainWidth(t);
}return columnWidth;
},"~S");
$_M(c$,"getColumn",
function(index){
return this.columns[index];
},"~N");
$_M(c$,"getColumnCount",
function(){
if(this.columns==null){
return 0;
}return this.columns.length;
});
$_M(c$,"getColumnOrder",
function(){
return $_A(0,0);
});
$_M(c$,"getColumns",
function(){
var count=this.columns.length;
if(count==1&&this.columns[0]==null)count=0;
var result=new Array(count);
System.arraycopy(this.columns,0,result,0,count);
return result;
});
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
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this._getItem(index);
},"~N");
$_M(c$,"getItem",
function(point){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
if(this.items==null){
return 0;
}return this.items.length;
});
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var count=this.items.length;
var result=new Array(count);
if((this.style&268435456)!=0){
for(var i=0;i<count;i++){
result[i]=this._getItem(i);
}
}else{
System.arraycopy(this.items,0,result,0,count);
}return result;
});
$_M(c$,"getLinesVisible",
function(){
return true;
});
$_M(c$,"getSelection",
function(){
return this.selection;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getSelectionIndex",
function(){
return 0;
});
$_M(c$,"getSelectionIndices",
function(){
var result=$_A(this.selection.length,0);
for(var i=0;i<this.selection.length;i++){
result[i]=0;
}
return result;
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(column){
var count=this.columns.length;
for(var i=0;i<count;i++){
if(this.columns[i]==column)return i;
}
return-1;
},"$wt.widgets.TableColumn");
$_M(c$,"indexOf",
function(item){
var count=this.items.length;
if(1<=this.lastIndexOf&&this.lastIndexOf<count-1){
if(this.items[this.lastIndexOf]==item)return this.lastIndexOf;
if(this.items[this.lastIndexOf+1]==item)return++this.lastIndexOf;
if(this.items[this.lastIndexOf-1]==item)return--this.lastIndexOf;
}if(this.lastIndexOf<Math.floor(count/2)){
for(var i=0;i<count;i++){
if(this.items[i]==item)return this.lastIndexOf=i;
}
}else{
for(var i=count-1;i>=0;--i){
if(this.items[i]==item)return this.lastIndexOf=i;
}
}return-1;
},"$wt.widgets.TableItem");
$_M(c$,"isSelected",
function(index){
return false;
},"~N");
$_M(c$,"removeItems",
function(indices){
if(indices==null&&indices.length>this.items.length)return;
var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
var count=this.items.length;
if(tbody==null)return;
var last=-1;
var newItems=new Array(this.items.length-indices.length);
for(var i=0;i<indices.length;i++){
var index=i;
if(index<0||index>=this.items.length)return;
var item=this.items[index];
if(item==null)return;
if(item!=null){
System.arraycopy(this.items,index+1,this.items,index,--count-index);
this.items[count]=null;
last=index;
}tbody.removeChild(item.handle);
}
},"~A");
$_M(c$,"releaseWidget",
function(){
var columnCount=this.columns.length;
if(columnCount==1&&this.columns[0]==null)columnCount=0;
var itemCount=this.items.length;
for(var i=0;i<itemCount;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed())item.releaseResources();
}
this.customDraw=false;
this.currentItem=null;
this.items=null;
for(var i=0;i<columnCount;i++){
var column=this.columns[i];
if(!column.isDisposed())column.releaseResources();
}
this.columns=null;
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.Table,"releaseWidget",[]);
});
$_M(c$,"remove",
function(indices){
if(indices.length==0)return;
var newIndices=$_A(indices.length,0);
System.arraycopy(indices,0,newIndices,0,indices.length);
var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null)return;
var start=newIndices[newIndices.length-1];
var end=newIndices[0];
var count=this.items.length;
if(!(0<=start&&start<=end&&end<count)){
return;
}this.deselect(indices);
var itemsToBeRemoved=new Array(indices.length);
var newItems=new Array(count-1);
var last=-1;
for(var i=0;i<newIndices.length;i++){
var index=newIndices[i];
if(index!=last){
var item=this.items[index];
if(item!=null){
tbody.removeChild(item.handle);
item.releaseHandle();
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,--count-index);
this.items=newItems;
newItems=new Array(count-1);
last=index;
}}}
},"~A");
$_M(c$,"remove",
function(index){
this.remove([index]);
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var count=this.items.length;
if(!(0<=start&&start<=end&&end<count)){
return;
}var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null)return;
this.deselect(start,end);
var index=start;
while(index<=end){
var item=this.items[index];
if(item!=null&&!item.isDisposed()){
tbody.removeChild(item.handle);
item.releaseHandle();
}index++;
}
var newItems=new Array(count-(index-start));
System.arraycopy(this.items,0,newItems,0,start);
System.arraycopy(this.items,index,newItems,start,count-index);
this.items=newItems;
},"~N,~N");
$_M(c$,"removeAll",
function(){
this.remove(0,this.items.length-1);
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(indices){
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
},"~A");
$_M(c$,"select",
function(index){
if(index<0)return;
this.deselectAll();
this.items[index].showSelection(true);
this.selection=new Array(1);
this.selection[0]=this.items[index];
this.items[index].handle.className="table-item-selected";
},"~N");
$_M(c$,"select",
function(start,end){
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
var count=this.items.length;
if(count==0||start>=count)return;
this.deselectAll();
start=Math.max(0,start);
end=Math.min(end,count-1);
if(start==0&&end==count-1){
this.selectAll();
}else{
this.selection=new Array(end-start+1);
for(var i=start;i<=end;i++){
this.items[i].showSelection(true);
this.selection[i-start]=this.items[i];
}
}},"~N,~N");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
this.selection=new Array(this.items.length);
for(var i=0;i<this.items.length;i++){
this.items[i].showSelection(true);
this.selection[i]=this.items[i];
}
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var fixResize=false;
if(fixResize)this.setRedraw(false);
$_U(this,$wt.widgets.Table,"setBounds",[x,y,width,height,flags]);
if(fixResize)this.setRedraw(true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setColumnOrder",
function(order){
},"~A");
$_M(c$,"setCheckboxImageListColor",
function(){
if((this.style&32)==0)return;
});
$_M(c$,"setCheckboxImageList",
function(width,height){
if((this.style&32)==0)return;
var count=4;
},"~N,~N");
$_M(c$,"setFocusIndex",
function(index){
if(index<0)return;
},"~N");
$_M(c$,"setFont",
function(font){
var topIndex=this.getTopIndex();
this.setRedraw(false);
this.setTopIndex(0);
$_U(this,$wt.widgets.Table,"setFont",[font]);
this.setTopIndex(topIndex);
this.setScrollWidth(null,true);
this.setRedraw(true);
this.setItemHeight();
},"$wt.graphics.Font");
$_M(c$,"setHeaderVisible",
function(show){
},"~B");
$_M(c$,"setItemCount",
function(count){
count=Math.max(0,count);
},"~N");
$_M(c$,"setItemHeight",
function(){
});
$_M(c$,"setLinesVisible",
function(show){
var newBits=0;
},"~B");
$_V(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setScrollWidth",
function(item,force){
if(this.currentItem!=null){
if(this.currentItem!=item)this.fixScrollWidth=true;
return false;
}return false;
},"$wt.widgets.TableItem,~B");
$_M(c$,"setSelection",
function(indices){
this.deselectAll();
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices);
var focusIndex=indices[0];
if(focusIndex!=-1)this.setFocusIndex(focusIndex);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(items){
this.deselectAll();
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1))return;
var focusIndex=-1;
this.selection=items;
for(var i=length-1;i>=0;--i){
var index=this.indexOf(items[i]);
items[i].showSelection(true);
if(index!=-1){
focusIndex=index;
}}
if(focusIndex!=-1)this.setFocusIndex(focusIndex);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(index){
this.deselectAll();
this.select(index);
this.setFocusIndex(index);
},"~N");
$_M(c$,"setSelection",
function(start,end){
this.deselectAll();
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
var count=this.items.length;
if(count==0||start>=count)return;
start=Math.max(0,start);
end=Math.min(end,count-1);
this.select(start,end);
this.selection=new Array(end-start+1);
for(var i=start;i<=end;i++){
this.selection[i-start]=this.items[i];
}
this.setFocusIndex(start);
this.showSelection();
},"~N,~N");
$_M(c$,"setTableEmpty",
function(){
});
$_M(c$,"removeFromSelection",
($fz=function(indices){
if(this.selection.length<indices.length){
return;
}var newSelection=new Array(this.selection.length-indices.length);
var j=0;
for(var i=0;i<indices.length;i++){
if(this.selection[i].isSelected()){
newSelection[j++]=this.selection[i];
}}
this.selection=newSelection;
},$fz.isPrivate=true,$fz),"~A");
$_M(c$,"toggleSelection",
function(item,isCtrlKeyHold,isShiftKeyHold){
if(item==null){
return false;
}if((this.style&2)!=0&&(isCtrlKeyHold||isShiftKeyHold)){
if(isCtrlKeyHold){
for(var i=0;i<this.selection.length;i++){
if(item==this.selection[i]){
var newSelections=new Array(this.selection.length);
for(var j=0;j<i;j++){
newSelections[j]=this.selection[j];
}
for(var j=i;j<this.selection.length-1;j++){
newSelections[j]=this.selection[j+1];
}
this.selection=newSelections;
item.showSelection(false);
this.lastSelection=item;
return false;
}}
this.selection[this.selection.length]=item;
this.lastSelection=item;
item.showSelection(true);
}else{
for(var i=0;i<this.selection.length;i++){
if(this.selection[i]!=null){
this.selection[i].showSelection(false);
}}
if(this.lastSelection!=null){
var idx1=Math.min(this.lastSelection.index,item.index);
var idx2=Math.max(this.lastSelection.index,item.index);
this.selection=new Array(0);
for(var i=idx1;i<=idx2;i++){
var ti=this.items[i];
this.selection[this.selection.length]=ti;
ti.showSelection(true);
}
return true;
}else{
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=item;
}}}else{
item.showSelection(true);
for(var i=0;i<this.selection.length;i++){
if(this.selection[i]!=null&&this.selection[i]!=item){
this.selection[i].showSelection(false);
}}
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=item;
}this.lastSelection=item;
return true;
},"$wt.widgets.TableItem,~B,~B");
$_M(c$,"setTopIndex",
function(index){
},"~N");
$_M(c$,"showColumn",
function(column){
if(column.parent!=this)return;
var index=this.indexOf(column);
if(index==-1)return;
},"$wt.widgets.TableColumn");
$_M(c$,"showItem",
function(index){
},"~N");
$_M(c$,"showItem",
function(item){
var index=this.indexOf(item);
if(index!=-1)this.showItem(index);
},"$wt.widgets.TableItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"updateMoveable",
function(){
});
$_V(c$,"_getChildren",
function(){
return new Array(0);
});
$_S(c$,
"INSET",4,
"GRID_WIDTH",1,
"HEADER_MARGIN",10);
});
