$_L(["$wt.widgets.Composite"],"$wt.custom.TableTree",["$wt.graphics.GC","$.Image","$.ImageData","$.PaletteData","$wt.widgets.Event","$.Listener","$.Table","$.TypedListener"],function(){
c$=$_C(function(){
this.table=null;
this.items=null;
this.plusImage=null;
this.minusImage=null;
this.sizeImage=null;
this.inDispose=false;
$_Z(this,arguments);
},$wt.custom,"TableTree",$wt.widgets.Composite);
$_Y(c$,function(){
this.items=$wt.custom.TableTree.EMPTY_ITEMS;
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.TableTree,[parent,$wt.custom.TableTree.checkStyle(style)]);
this.table=new $wt.widgets.Table(this,style);
var tableListener=(($_D("$wt.custom.TableTree$1")?0:org.eclipse.swt.custom.TableTree.$TableTree$1$()),$_N($wt.custom.TableTree$1,this,null));
var tableEvents=[3,13,14,1];
for(var i=0;i<tableEvents.length;i++){
this.table.addListener(tableEvents[i],tableListener);
}
var listener=(($_D("$wt.custom.TableTree$2")?0:org.eclipse.swt.custom.TableTree.$TableTree$2$()),$_N($wt.custom.TableTree$2,this,null));
var events=[12,11,15];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
},"$wt.widgets.Composite,~N");
$_M(c$,"addItem",
function(item,index){
var newItems=new Array(this.items.length+1);
System.arraycopy(this.items,0,newItems,0,index);
newItems[index]=item;
System.arraycopy(this.items,index,newItems,index+1,this.items.length-index);
this.items=newItems;
if(index==this.items.length-1)return this.table.getItemCount();
else return this.table.indexOf(this.items[index+1].tableItem);
},"$wt.custom.TableTreeItem,~N");
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
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
var mask=100663296;
style=style&mask;
return style;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
return this.table.computeSize(wHint,hHint,changed);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
return this.table.computeTrim(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"deselectAll",
function(){
this.table.deselectAll();
});
$_M(c$,"expandItem",
function(item){
if(item==null)return;
this.expandItem(item.parentItem);
if(!item.getVisible())item.setVisible(true);
if(!item.expanded&&item.items.length>0){
item.setExpanded(true);
var event=new $wt.widgets.Event();
event.item=item;
this.notifyListeners(17,event);
}},"$wt.custom.TableTreeItem");
$_M(c$,"getBackground",
function(){
return this.table.getBackground();
});
$_M(c$,"getClientArea",
function(){
return this.table.getClientArea();
});
$_M(c$,"getForeground",
function(){
return this.table.getForeground();
});
$_M(c$,"getFont",
function(){
return this.table.getFont();
});
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemHeight",
function(){
return this.table.getItemHeight();
});
$_M(c$,"getItems",
function(){
var newItems=new Array(this.items.length);
System.arraycopy(this.items,0,newItems,0,this.items.length);
return newItems;
});
$_M(c$,"getSelection",
function(){
var selection=this.table.getSelection();
var result=new Array(selection.length);
for(var i=0;i<selection.length;i++){
result[i]=selection[i].getData("TableTreeItemID");
}
return result;
});
$_M(c$,"getSelectionCount",
function(){
return this.table.getSelectionCount();
});
$_M(c$,"getStyle",
function(){
return this.table.getStyle();
});
$_M(c$,"getTable",
function(){
return this.table;
});
$_M(c$,"createImages",
function(){
var itemHeight=this.sizeImage.getBounds().height;
var indent=Math.min(6,Math.floor((itemHeight-9)/2));
indent=Math.max(0,indent);
var size=Math.max(10,itemHeight-2*indent);
size=(Math.floor((size+1)/2))*2;
var midpoint=indent+Math.floor(size/2);
var foreground=this.getForeground();
var plusMinus=this.getDisplay().getSystemColor(18);
var background=this.getBackground();
var palette=new $wt.graphics.PaletteData([foreground.getRGB(),background.getRGB(),plusMinus.getRGB()]);
var imageData=new $wt.graphics.ImageData(itemHeight,itemHeight,4,palette);
imageData.transparentPixel=1;
this.plusImage=new $wt.graphics.Image(this.getDisplay(),imageData);
var gc=new $wt.graphics.GC(this.plusImage);
gc.setBackground(background);
gc.fillRectangle(0,0,itemHeight,itemHeight);
gc.setForeground(plusMinus);
gc.drawRectangle(indent,indent,size,size);
gc.setForeground(foreground);
gc.drawLine(midpoint,indent+2,midpoint,indent+size-2);
gc.drawLine(indent+2,midpoint,indent+size-2,midpoint);
gc.dispose();
palette=new $wt.graphics.PaletteData([foreground.getRGB(),background.getRGB(),plusMinus.getRGB()]);
imageData=new $wt.graphics.ImageData(itemHeight,itemHeight,4,palette);
imageData.transparentPixel=1;
this.minusImage=new $wt.graphics.Image(this.getDisplay(),imageData);
gc=new $wt.graphics.GC(this.minusImage);
gc.setBackground(background);
gc.fillRectangle(0,0,itemHeight,itemHeight);
gc.setForeground(plusMinus);
gc.drawRectangle(indent,indent,size,size);
gc.setForeground(foreground);
gc.drawLine(indent+2,midpoint,indent+size-2,midpoint);
gc.dispose();
});
$_M(c$,"getPlusImage",
function(){
if(this.plusImage==null)this.createImages();
return this.plusImage;
});
$_M(c$,"getMinusImage",
function(){
if(this.minusImage==null)this.createImages();
return this.minusImage;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(item===this.items[i])return i;
}
return-1;
},"$wt.custom.TableTreeItem");
$_M(c$,"onDispose",
function(e){
this.inDispose=true;
for(var i=0;i<this.items.length;i++){
this.items[i].dispose();
}
this.inDispose=false;
if(this.plusImage!=null)this.plusImage.dispose();
if(this.minusImage!=null)this.minusImage.dispose();
if(this.sizeImage!=null)this.sizeImage.dispose();
this.plusImage=this.minusImage=this.sizeImage=null;
},"$wt.widgets.Event");
$_M(c$,"onResize",
function(e){
var size=this.getSize();
this.table.setBounds(0,0,size.x,size.y);
},"$wt.widgets.Event");
$_M(c$,"onSelection",
function(e){
var event=new $wt.widgets.Event();
var tableItem=e.item;
var item=this.getItem(tableItem);
event.item=item;
if(e.type==13&&e.detail==32&&item!=null){
event.detail=32;
item.checked=tableItem.getChecked();
}this.notifyListeners(e.type,event);
},"$wt.widgets.Event");
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
var item=this.table.getItem(point);
if(item==null)return null;
return this.getItem(item);
},"$wt.graphics.Point");
$_M(c$,"getItem",
function(tableItem){
if(tableItem==null)return null;
for(var i=0;i<this.items.length;i++){
var item=this.items[i].getItem(tableItem);
if(item!=null)return item;
}
return null;
},"$wt.widgets.TableItem");
$_M(c$,"onFocusIn",
function(e){
this.table.setFocus();
},"$wt.widgets.Event");
$_M(c$,"onKeyDown",
function(e){
var selection=this.getSelection();
if(selection.length==0)return;
var item=selection[0];
var type=0;
if(e.keyCode==16777220||e.keyCode==16777219){
var trailKey=(this.getStyle()&134217728)!=0?16777219:16777220;
if(e.keyCode==trailKey){
if(item.getItemCount()==0)return;
if(item.getExpanded()){
var newSelection=item.getItems()[0];
this.table.setSelection([newSelection.tableItem]);
this.showItem(newSelection);
type=13;
}else{
item.setExpanded(true);
type=17;
}}else{
if(item.getExpanded()){
item.setExpanded(false);
type=18;
}else{
var parent=item.getParentItem();
if(parent!=null){
var index=parent.indexOf(item);
if(index!=0)return;
this.table.setSelection([parent.tableItem]);
type=13;
}}}}if((e.character).charCodeAt(0)==('*').charCodeAt(0)){
item.expandAll(true);
}if((e.character).charCodeAt(0)==('-').charCodeAt(0)){
if(item.getExpanded()){
item.setExpanded(false);
type=18;
}}if((e.character).charCodeAt(0)==('+').charCodeAt(0)){
if(item.getItemCount()>0&&!item.getExpanded()){
item.setExpanded(true);
type=17;
}}if(type==0)return;
var event=new $wt.widgets.Event();
event.item=item;
this.notifyListeners(type,event);
},"$wt.widgets.Event");
$_M(c$,"onMouseDown",
function(event){
var items=this.table.getItems();
for(var i=0;i<items.length;i++){
var rect=items[i].getImageBounds(0);
if(rect.contains(event.x,event.y)){
var item=items[i].getData("TableTreeItemID");
event=new $wt.widgets.Event();
event.item=item;
item.setExpanded(!item.getExpanded());
if(item.getExpanded()){
this.notifyListeners(17,event);
}else{
this.notifyListeners(18,event);
}return;
}}
},"$wt.widgets.Event");
$_M(c$,"removeAll",
function(){
this.setRedraw(false);
for(var i=this.items.length-1;i>=0;i--){
this.items[i].dispose();
}
this.items=$wt.custom.TableTree.EMPTY_ITEMS;
this.setRedraw(true);
});
$_M(c$,"removeItem",
function(item){
var index=0;
while(index<this.items.length&&this.items[index]!==item)index++;

if(index==this.items.length)return;
var newItems=new Array(this.items.length-1);
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,this.items.length-index-1);
this.items=newItems;
},"$wt.custom.TableTreeItem");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeTreeListener",
function(listener){
this.removeListener(17,listener);
this.removeListener(18,listener);
},"$wt.events.TreeListener");
$_M(c$,"selectAll",
function(){
this.table.selectAll();
});
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.TableTree,"setBackground",[color]);
this.table.setBackground(color);
if(this.sizeImage!=null){
var gc=new $wt.graphics.GC(this.sizeImage);
gc.setBackground(this.getBackground());
var size=this.sizeImage.getBounds();
gc.fillRectangle(size);
gc.dispose();
}},"$wt.graphics.Color");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.custom.TableTree,"setEnabled",[enabled]);
this.table.setEnabled(enabled);
},"~B");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.custom.TableTree,"setFont",[font]);
this.table.setFont(font);
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.TableTree,"setForeground",[color]);
this.table.setForeground(color);
},"$wt.graphics.Color");
$_M(c$,"setMenu",
function(menu){
$_U(this,$wt.custom.TableTree,"setMenu",[menu]);
this.table.setMenu(menu);
},"$wt.widgets.Menu");
$_M(c$,"setSelection",
function(items){
var length=items.length;
if(length==0||((this.table.getStyle()&4)!=0&&length>1)){
this.deselectAll();
return;
}var tableItems=new Array(length);
for(var i=0;i<length;i++){
if(!items[i].getVisible())this.expandItem(items[i]);
tableItems[i]=items[i].tableItem;
}
this.table.setSelection(tableItems);
},"~A");
$_M(c$,"setToolTipText",
function(string){
$_U(this,$wt.custom.TableTree,"setToolTipText",[string]);
this.table.setToolTipText(string);
},"~S");
$_M(c$,"showItem",
function(item){
if(!item.getVisible())this.expandItem(item);
var tableItem=item.tableItem;
this.table.showItem(tableItem);
},"$wt.custom.TableTreeItem");
$_M(c$,"showSelection",
function(){
this.table.showSelection();
});
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
c$.$TableTree$1$=function(){
$_H();
c$=$_W($wt.custom,"TableTree$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 3:
this.b$["$wt.custom.TableTree"].onMouseDown(e);
break;
case 13:
this.b$["$wt.custom.TableTree"].onSelection(e);
break;
case 14:
this.b$["$wt.custom.TableTree"].onSelection(e);
break;
case 1:
this.b$["$wt.custom.TableTree"].onKeyDown(e);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.$TableTree$2$=function(){
$_H();
c$=$_W($wt.custom,"TableTree$2",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 12:
this.b$["$wt.custom.TableTree"].onDispose(e);
break;
case 11:
this.b$["$wt.custom.TableTree"].onResize(e);
break;
case 15:
this.b$["$wt.custom.TableTree"].onFocusIn(e);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.EMPTY_ITEMS=c$.prototype.EMPTY_ITEMS=new Array(0);
c$.EMPTY_TEXTS=c$.prototype.EMPTY_TEXTS=new Array(0);
c$.EMPTY_IMAGES=c$.prototype.EMPTY_IMAGES=new Array(0);
$_S(c$,
"ITEMID","TableTreeItemID");
});
