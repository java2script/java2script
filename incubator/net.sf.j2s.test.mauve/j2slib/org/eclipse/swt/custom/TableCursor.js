$_L(["$wt.widgets.Canvas"],"$wt.custom.TableCursor",["$wt.SWT","$wt.graphics.Point","$wt.widgets.Event","$.Listener","$.TypedListener"],function(){
c$=$_C(function(){
this.table=null;
this.row=null;
this.column=null;
this.tableListener=null;
this.resizeListener=null;
this.disposeItemListener=null;
this.disposeColumnListener=null;
$_Z(this,arguments);
},$wt.custom,"TableCursor",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.TableCursor,[parent,style]);
this.table=parent;
this.setBackground(null);
this.setForeground(null);
var listener=(($_D("$wt.custom.TableCursor$1")?0:org.eclipse.swt.custom.TableCursor.$TableCursor$1$()),$_N($wt.custom.TableCursor$1,this,null));
var events=[12,15,16,1,9,31];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
this.tableListener=(($_D("$wt.custom.TableCursor$2")?0:org.eclipse.swt.custom.TableCursor.$TableCursor$2$()),$_N($wt.custom.TableCursor$2,this,null));
this.table.addListener(15,this.tableListener);
this.table.addListener(3,this.tableListener);
this.disposeItemListener=(($_D("$wt.custom.TableCursor$3")?0:org.eclipse.swt.custom.TableCursor.$TableCursor$3$()),$_N($wt.custom.TableCursor$3,this,null));
this.disposeColumnListener=(($_D("$wt.custom.TableCursor$4")?0:org.eclipse.swt.custom.TableCursor.$TableCursor$4$()),$_N($wt.custom.TableCursor$4,this,null));
this.resizeListener=(($_D("$wt.custom.TableCursor$5")?0:org.eclipse.swt.custom.TableCursor.$TableCursor$5$()),$_N($wt.custom.TableCursor$5,this,null));
var hBar=this.table.getHorizontalBar();
if(hBar!=null){
hBar.addListener(13,this.resizeListener);
}var vBar=this.table.getVerticalBar();
if(vBar!=null){
vBar.addListener(13,this.resizeListener);
}},"$wt.widgets.Table,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"dispose",
function(event){
this.table.removeListener(15,this.tableListener);
this.table.removeListener(3,this.tableListener);
if(this.column!=null){
this.column.removeListener(12,this.disposeColumnListener);
this.column.removeListener(10,this.resizeListener);
this.column.removeListener(11,this.resizeListener);
this.column=null;
}if(this.row!=null){
this.row.removeListener(12,this.disposeItemListener);
this.row=null;
}var hBar=this.table.getHorizontalBar();
if(hBar!=null){
hBar.removeListener(13,this.resizeListener);
}var vBar=this.table.getVerticalBar();
if(vBar!=null){
vBar.removeListener(13,this.resizeListener);
}},"$wt.widgets.Event");
$_M(c$,"keyDown",
function(event){
if(this.row==null)return;
switch(event.character){
case'\u000d':
this.notifyListeners(14,new $wt.widgets.Event());
return;
}
var rowIndex=this.table.indexOf(this.row);
var columnIndex=this.column==null?0:this.table.indexOf(this.column);
switch(event.keyCode){
case 16777217:
this.setRowColumn(Math.max(0,rowIndex-1),columnIndex,true);
break;
case 16777218:
this.setRowColumn(Math.min(rowIndex+1,this.table.getItemCount()-1),columnIndex,true);
break;
case 16777219:
case 16777220:
{
var columnCount=this.table.getColumnCount();
if(columnCount==0)break;
var order=this.table.getColumnOrder();
var index=0;
while(index<order.length){
if(order[index]==columnIndex)break;
index++;
}
if(index==order.length)index=0;
var leadKey=(this.getStyle()&67108864)!=0?16777220:16777219;
if(event.keyCode==leadKey){
this.setRowColumn(rowIndex,order[Math.max(0,index-1)],true);
}else{
this.setRowColumn(rowIndex,order[Math.min(columnCount-1,index+1)],true);
}break;
}case 16777223:
this.setRowColumn(0,columnIndex,true);
break;
case 16777224:
{
var i=this.table.getItemCount()-1;
this.setRowColumn(i,columnIndex,true);
break;
}case 16777221:
{
var index=this.table.getTopIndex();
if(index==rowIndex){
var rect=this.table.getClientArea();
var item=this.table.getItem(index);
var itemRect=item.getBounds(0);
rect.height-=itemRect.y;
var height=this.table.getItemHeight();
var page=Math.max(1,Math.floor(rect.height/height));
index=Math.max(0,index-page+1);
}this.setRowColumn(index,columnIndex,true);
break;
}case 16777222:
{
var index=this.table.getTopIndex();
var rect=this.table.getClientArea();
var item=this.table.getItem(index);
var itemRect=item.getBounds(0);
rect.height-=itemRect.y;
var height=this.table.getItemHeight();
var page=Math.max(1,Math.floor(rect.height/height));
var end=this.table.getItemCount()-1;
index=Math.min(end,index+page-1);
if(index==rowIndex){
index=Math.min(end,index+page-1);
}this.setRowColumn(index,columnIndex,true);
break;
}}
},"$wt.widgets.Event");
$_M(c$,"paint",
function(event){
if(this.row==null)return;
var columnIndex=this.column==null?0:this.table.indexOf(this.column);
var gc=event.gc;
var display=this.getDisplay();
gc.setBackground(this.getBackground());
gc.setForeground(this.getForeground());
gc.fillRectangle(event.x,event.y,event.width,event.height);
var x=0;
var size=this.getSize();
var image=this.row.getImage(columnIndex);
if(image!=null){
var imageSize=image.getBounds();
var imageY=Math.floor((size.y-imageSize.height)/2);
gc.drawImage(image,x,imageY);
x+=imageSize.width;
}var text=this.row.getText(columnIndex);
if(text!==""){
var bounds=this.row.getBounds(columnIndex);
var extent=gc.stringExtent(text);
var platform=$WT.getPlatform();
if("win32".equals(platform)){
if(this.table.getColumnCount()==0||columnIndex==0){
x+=2;
}else{
var alignmnent=this.column.getAlignment();
switch(alignmnent){
case 16384:
x+=6;
break;
case 131072:
x=bounds.width-extent.x-6;
break;
case 16777216:
x+=Math.floor((bounds.width-x-extent.x)/2);
break;
}
}}else{
if(this.table.getColumnCount()==0){
x+=5;
}else{
var alignmnent=this.column.getAlignment();
switch(alignmnent){
case 16384:
x+=5;
break;
case 131072:
x=bounds.width-extent.x-2;
break;
case 16777216:
x+=Math.floor((bounds.width-x-extent.x)/2)+2;
break;
}
}}var textY=Math.floor((size.y-extent.y)/2);
gc.drawString(text,x,textY);
}if(this.isFocusControl()){
gc.setBackground(display.getSystemColor(2));
gc.setForeground(display.getSystemColor(1));
gc.drawFocus(0,0,size.x,size.y);
}},"$wt.widgets.Event");
$_M(c$,"tableFocusIn",
function(event){
if(this.isDisposed())return;
if(this.isVisible())this.setFocus();
},"$wt.widgets.Event");
$_M(c$,"tableMouseDown",
function(event){
if(this.isDisposed()||!this.isVisible())return;
var pt=new $wt.graphics.Point(event.x,event.y);
var clientRect=this.table.getClientArea();
var columnCount=this.table.getColumnCount();
var maxColumnIndex=columnCount==0?0:columnCount-1;
var start=this.table.getTopIndex();
var end=this.table.getItemCount();
for(var i=start;i<end;i++){
var item=this.table.getItem(i);
for(var j=0;j<=maxColumnIndex;j++){
var rect=item.getBounds(j);
if(rect.y>clientRect.y+clientRect.height)return;
if(rect.contains(pt)){
this.setRowColumn(i,j,true);
this.setFocus();
return;
}}
}
},"$wt.widgets.Event");
$_M(c$,"traverse",
function(event){
switch(event.detail){
case 64:
case 32:
case 4:
event.doit=false;
return;
}
event.doit=true;
},"$wt.widgets.Event");
$_M(c$,"setRowColumn",
function(row,column,notify){
var item=row==-1?null:this.table.getItem(row);
var col=column==-1||this.table.getColumnCount()==0?null:this.table.getColumn(column);
this.setRowColumn(item,col,notify);
},"~N,~N,~B");
$_M(c$,"setRowColumn",
function(row,column,notify){
if(this.row===row&&this.column===column){
return;
}if(this.row!=null&&this.row!==row){
this.row.removeListener(12,this.disposeItemListener);
this.row=null;
}if(this.column!=null&&this.column!==column){
this.column.removeListener(12,this.disposeColumnListener);
this.column.removeListener(10,this.resizeListener);
this.column.removeListener(11,this.resizeListener);
this.column=null;
}if(row!=null){
if(this.row!==row){
this.row=row;
row.addListener(12,this.disposeItemListener);
this.table.showItem(row);
}if(this.column!==column&&column!=null){
this.column=column;
column.addListener(12,this.disposeColumnListener);
column.addListener(10,this.resizeListener);
column.addListener(11,this.resizeListener);
this.table.showColumn(column);
}var columnIndex=column==null?0:this.table.indexOf(column);
this.setBounds(row.getBounds(columnIndex));
this.redraw();
if(notify){
this.notifyListeners(13,new $wt.widgets.Event());
}}},"$wt.widgets.TableItem,$wt.widgets.TableColumn,~B");
$_M(c$,"setVisible",
function(visible){
if(visible)this.resize();
$_U(this,$wt.custom.TableCursor,"setVisible",[visible]);
},"~B");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"resize",
function(){
if(this.row==null){
this.setBounds(-200,-200,0,0);
}else{
var columnIndex=this.column==null?0:this.table.indexOf(this.column);
this.setBounds(this.row.getBounds(columnIndex));
}});
$_M(c$,"getColumn",
function(){
return this.column==null?0:this.table.indexOf(this.column);
});
$_M(c$,"getRow",
function(){
return this.row;
});
$_M(c$,"setBackground",
function(color){
if(color==null)color=this.getDisplay().getSystemColor(27);
$_U(this,$wt.custom.TableCursor,"setBackground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(color){
if(color==null)color=this.getDisplay().getSystemColor(26);
$_U(this,$wt.custom.TableCursor,"setForeground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelection",
function(row,column){
var columnCount=this.table.getColumnCount();
var maxColumnIndex=columnCount==0?0:columnCount-1;
this.setRowColumn(row,column,false);
},"~N,~N");
$_M(c$,"setSelection",
function(row,column){
var columnCount=this.table.getColumnCount();
var maxColumnIndex=columnCount==0?0:columnCount-1;
this.setRowColumn(this.table.indexOf(row),column,false);
},"$wt.widgets.TableItem,~N");
c$.$TableCursor$1$=function(){
$_H();
c$=$_W($wt.custom,"TableCursor$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
switch(event.type){
case 12:
this.b$["$wt.custom.TableCursor"].dispose(event);
break;
case 15:
case 16:
this.b$["$wt.custom.TableCursor"].redraw();
break;
case 1:
this.b$["$wt.custom.TableCursor"].keyDown(event);
break;
case 9:
this.b$["$wt.custom.TableCursor"].paint(event);
break;
case 31:
this.b$["$wt.custom.TableCursor"].traverse(event);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.$TableCursor$2$=function(){
$_H();
c$=$_W($wt.custom,"TableCursor$2",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
switch(event.type){
case 3:
this.b$["$wt.custom.TableCursor"].tableMouseDown(event);
break;
case 15:
this.b$["$wt.custom.TableCursor"].tableFocusIn(event);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.$TableCursor$3$=function(){
$_H();
c$=$_W($wt.custom,"TableCursor$3",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.custom.TableCursor"].row=null;
this.b$["$wt.custom.TableCursor"].column=null;
this.b$["$wt.custom.TableCursor"].resize();
},"$wt.widgets.Event");
c$=$_P();
};
c$.$TableCursor$4$=function(){
$_H();
c$=$_W($wt.custom,"TableCursor$4",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.custom.TableCursor"].row=null;
this.b$["$wt.custom.TableCursor"].column=null;
this.b$["$wt.custom.TableCursor"].resize();
},"$wt.widgets.Event");
c$=$_P();
};
c$.$TableCursor$5$=function(){
$_H();
c$=$_W($wt.custom,"TableCursor$5",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.custom.TableCursor"].resize();
},"$wt.widgets.Event");
c$=$_P();
};
$_S(c$,
"BACKGROUND",27,
"FOREGROUND",26);
});
