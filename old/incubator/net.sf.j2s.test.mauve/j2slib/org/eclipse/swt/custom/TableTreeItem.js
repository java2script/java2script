$_L(["$wt.widgets.Item","$wt.custom.TableTree"],"$wt.custom.TableTreeItem",["$wt.graphics.GC","$.Image","$.Rectangle","$wt.widgets.Event","$.TableItem"],function(){
c$=$_C(function(){
this.tableItem=null;
this.parent=null;
this.parentItem=null;
this.items=null;
this.texts=null;
this.images=null;
this.background=null;
this.foreground=null;
this.font=null;
this.expanded=false;
this.checked=false;
this.grayed=false;
$_Z(this,arguments);
},$wt.custom,"TableTreeItem",$wt.widgets.Item);
$_Y(c$,function(){
this.items=$wt.custom.TableTree.EMPTY_ITEMS;
this.texts=$wt.custom.TableTree.EMPTY_TEXTS;
this.images=$wt.custom.TableTree.EMPTY_IMAGES;
});
$_K(c$,
function(parent,style){
this.construct(parent,style,parent.getItemCount());
},"$wt.custom.TableTree,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent,null,style,index);
},"$wt.custom.TableTree,~N,~N");
$_K(c$,
function(parent,style){
this.construct(parent,style,parent.getItemCount());
},"$wt.custom.TableTreeItem,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent.getParent(),parent,style,index);
},"$wt.custom.TableTreeItem,~N,~N");
$_K(c$,
function(parent,parentItem,style,index){
$_R(this,$wt.custom.TableTreeItem,[parent,style]);
this.parent=parent;
this.parentItem=parentItem;
if(parentItem==null){
var tableIndex=parent.addItem(this,index);
this.tableItem=new $wt.widgets.TableItem(parent.getTable(),style,tableIndex);
this.tableItem.setData("TableTreeItemID",this);
this.addCheck();
if(parent.sizeImage==null){
var itemHeight=parent.getItemHeight();
parent.sizeImage=new $wt.graphics.Image(null,itemHeight,itemHeight);
var gc=new $wt.graphics.GC(parent.sizeImage);
gc.setBackground(parent.getBackground());
gc.fillRectangle(0,0,itemHeight,itemHeight);
gc.dispose();
this.tableItem.setImage(0,parent.sizeImage);
}}else{
parentItem.addItem(this,index);
}},"$wt.custom.TableTree,$wt.custom.TableTreeItem,~N,~N");
$_M(c$,"addCheck",
function(){
var table=this.parent.getTable();
if((table.getStyle()&32)==0)return;
this.tableItem.setChecked(this.checked);
this.tableItem.setGrayed(this.grayed);
});
$_M(c$,"addItem",
function(item,index){
if(this.items.length==0&&index==0){
if(this.tableItem!=null){
var image=this.expanded?this.parent.getMinusImage():this.parent.getPlusImage();
this.tableItem.setImage(0,image);
}}var newItems=new Array(this.items.length+1);
System.arraycopy(this.items,0,newItems,0,index);
newItems[index]=item;
System.arraycopy(this.items,index,newItems,index+1,this.items.length-index);
this.items=newItems;
if(this.expanded)item.setVisible(true);
},"$wt.custom.TableTreeItem,~N");
$_M(c$,"getBackground",
function(){
return(this.background==null)?this.parent.getBackground():this.background;
});
$_M(c$,"getBounds",
function(index){
if(this.tableItem!=null){
return this.tableItem.getBounds(index);
}else{
return new $wt.graphics.Rectangle(0,0,0,0);
}},"~N");
$_M(c$,"getChecked",
function(){
if(this.tableItem==null)return this.checked;
return this.tableItem.getChecked();
});
$_M(c$,"getGrayed",
function(){
if(this.tableItem==null)return this.grayed;
return this.tableItem.getGrayed();
});
$_M(c$,"getExpanded",
function(){
return this.expanded;
});
$_M(c$,"getFont",
function(){
return(this.font==null)?this.parent.getFont():this.font;
});
$_M(c$,"getForeground",
function(){
return(this.foreground==null)?this.parent.getForeground():this.foreground;
});
$_M(c$,"getImage",
function(){
return this.getImage(0);
});
$_M(c$,"getImage",
function(index){
if(0<index&&index<this.images.length)return this.images[index];
return null;
},"~N");
$_M(c$,"getIndent",
function(){
if(this.parentItem==null)return 0;
return this.parentItem.getIndent()+1;
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
$_M(c$,"getItems",
function(){
var newItems=new Array(this.items.length);
System.arraycopy(this.items,0,newItems,0,this.items.length);
return newItems;
});
$_M(c$,"getItem",
function(tableItem){
if(tableItem==null)return null;
if(this.tableItem===tableItem)return this;
for(var i=0;i<this.items.length;i++){
var item=this.items[i].getItem(tableItem);
if(item!=null)return item;
}
return null;
},"$wt.widgets.TableItem");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.parentItem;
});
$_M(c$,"getText",
function(){
return this.getText(0);
});
$_M(c$,"getText",
function(index){
if(0<=index&&index<this.texts.length)return this.texts[index];
return null;
},"~N");
$_M(c$,"getVisible",
function(){
return this.tableItem!=null;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item)return i;
}
return-1;
},"$wt.custom.TableTreeItem");
$_M(c$,"expandAll",
function(notify){
if(this.items.length==0)return;
if(!this.expanded){
this.setExpanded(true);
if(notify){
var event=new $wt.widgets.Event();
event.item=this;
this.parent.notifyListeners(17,event);
}}for(var i=0;i<this.items.length;i++){
this.items[i].expandAll(notify);
}
},"~B");
$_M(c$,"expandedIndexOf",
function(item){
var index=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item)return index;
if(this.items[i].expanded)index+=this.items[i].visibleChildrenCount();
index++;
}
return-1;
},"$wt.custom.TableTreeItem");
$_M(c$,"visibleChildrenCount",
function(){
var count=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i].getVisible()){
count+=1+this.items[i].visibleChildrenCount();
}}
return count;
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
for(var i=this.items.length-1;i>=0;i--){
this.items[i].dispose();
}
$_U(this,$wt.custom.TableTreeItem,"dispose",[]);
if(!this.parent.inDispose){
if(this.parentItem!=null){
this.parentItem.removeItem(this);
}else{
this.parent.removeItem(this);
}if(this.tableItem!=null)this.tableItem.dispose();
}this.items=null;
this.parentItem=null;
this.parent=null;
this.images=null;
this.texts=null;
this.tableItem=null;
this.foreground=null;
this.background=null;
this.font=null;
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
if(this.items.length==0){
if(this.tableItem!=null)this.tableItem.setImage(0,null);
}},"$wt.custom.TableTreeItem");
$_M(c$,"setBackground",
function(color){
if(this.tableItem!=null){
this.tableItem.setBackground(color);
}this.background=color;
},"$wt.graphics.Color");
$_M(c$,"setChecked",
function(checked){
var table=this.parent.getTable();
if((table.getStyle()&32)==0)return;
if(this.tableItem!=null){
this.tableItem.setChecked(checked);
}this.checked=checked;
},"~B");
$_M(c$,"setGrayed",
function(grayed){
var table=this.parent.getTable();
if((table.getStyle()&32)==0)return;
if(this.tableItem!=null){
this.tableItem.setGrayed(grayed);
}this.grayed=grayed;
},"~B");
$_M(c$,"setExpanded",
function(expanded){
if(this.items.length==0)return;
if(this.expanded==expanded)return;
this.expanded=expanded;
if(this.tableItem==null)return;
this.parent.setRedraw(false);
for(var i=0;i<this.items.length;i++){
this.items[i].setVisible(expanded);
}
var image=expanded?this.parent.getMinusImage():this.parent.getPlusImage();
this.tableItem.setImage(0,image);
this.parent.setRedraw(true);
},"~B");
$_M(c$,"setFont",
function(font){
if(this.tableItem!=null){
this.tableItem.setFont(font);
}this.font=font;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(this.tableItem!=null){
this.tableItem.setForeground(color);
}this.foreground=color;
},"$wt.graphics.Color");
$_M(c$,"setImage",
function(index,image){
var columnCount=Math.max(this.parent.getTable().getColumnCount(),1);
if(index<=0||index>=columnCount)return;
if(this.images.length<columnCount){
var newImages=new Array(columnCount);
System.arraycopy(this.images,0,newImages,0,this.images.length);
this.images=newImages;
}this.images[index]=image;
if(this.tableItem!=null)this.tableItem.setImage(index,image);
},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
this.setImage(0,image);
},"$wt.graphics.Image");
$_M(c$,"setText",
function(index,text){
var columnCount=Math.max(this.parent.getTable().getColumnCount(),1);
if(index<0||index>=columnCount)return;
if(this.texts.length<columnCount){
var newTexts=new Array(columnCount);
System.arraycopy(this.texts,0,newTexts,0,this.texts.length);
this.texts=newTexts;
}this.texts[index]=text;
if(this.tableItem!=null)this.tableItem.setText(index,text);
},"~N,~S");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"setVisible",
function(show){
if(this.parentItem==null)return;
if(this.getVisible()==show)return;
if(show){
if(!this.parentItem.getVisible())return;
var table=this.parent.getTable();
var parentIndex=table.indexOf(this.parentItem.tableItem);
var index=this.parentItem.expandedIndexOf(this)+parentIndex+1;
if(index<0)return;
this.tableItem=new $wt.widgets.TableItem(table,this.getStyle(),index);
this.tableItem.setData("TableTreeItemID",this);
this.tableItem.setImageIndent(this.getIndent());
if(this.background!=null)this.tableItem.setBackground(this.background);
if(this.foreground!=null)this.tableItem.setForeground(this.foreground);
if(this.font!=null)this.tableItem.setFont(this.font);
this.addCheck();
var columnCount=Math.max(table.getColumnCount(),1);
for(var i=0;i<columnCount;i++){
if(i<this.texts.length&&this.texts[i]!=null)this.setText(i,this.texts[i]);
if(i<this.images.length&&this.images[i]!=null)this.setImage(i,this.images[i]);
}
if(this.items.length!=0){
if(this.expanded){
this.tableItem.setImage(0,this.parent.getMinusImage());
for(var i=0,length=this.items.length;i<length;i++){
this.items[i].setVisible(true);
}
}else{
this.tableItem.setImage(0,this.parent.getPlusImage());
}}}else{
for(var i=0,length=this.items.length;i<length;i++){
this.items[i].setVisible(false);
}
this.tableItem.dispose();
this.tableItem=null;
}},"~B");
});
