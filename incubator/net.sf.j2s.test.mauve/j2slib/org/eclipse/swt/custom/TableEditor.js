$_L(["$wt.custom.ControlEditor"],"$wt.custom.TableEditor",["$wt.events.ControlListener","$wt.graphics.Rectangle"],function(){
c$=$_C(function(){
this.table=null;
this.item=null;
this.column=-1;
this.columnListener=null;
$_Z(this,arguments);
},$wt.custom,"TableEditor",$wt.custom.ControlEditor);
$_K(c$,
function(table){
$_R(this,$wt.custom.TableEditor,[table]);
this.table=table;
this.columnListener=(($_D("$wt.custom.TableEditor$1")?0:org.eclipse.swt.custom.TableEditor.$TableEditor$1$()),$_N($wt.custom.TableEditor$1,this,null));
this.grabVertical=true;
},"$wt.widgets.Table");
$_V(c$,"computeBounds",
function(){
if(this.item==null||this.column==-1||this.item.isDisposed())return new $wt.graphics.Rectangle(0,0,0,0);
var cell=this.item.getBounds(this.column);
var rect=this.item.getImageBounds(this.column);
cell.x=rect.x+rect.width;
cell.width-=rect.width;
var area=this.table.getClientArea();
if(cell.x<area.x+area.width){
if(cell.x+cell.width>area.x+area.width){
cell.width=area.x+area.width-cell.x;
}}var editorRect=new $wt.graphics.Rectangle(cell.x,cell.y,this.minimumWidth,this.minimumHeight);
if(this.grabHorizontal){
editorRect.width=Math.max(cell.width,this.minimumWidth);
}if(this.grabVertical){
editorRect.height=Math.max(cell.height,this.minimumHeight);
}if(this.horizontalAlignment==131072){
editorRect.x+=cell.width-editorRect.width;
}else if(this.horizontalAlignment==16384){
}else{
editorRect.x+=Math.floor((cell.width-editorRect.width)/2);
}if(this.verticalAlignment==1024){
editorRect.y+=cell.height-editorRect.height;
}else if(this.verticalAlignment==128){
}else{
editorRect.y+=Math.floor((cell.height-editorRect.height)/2);
}return editorRect;
});
$_M(c$,"dispose",
function(){
if(this.column>-1&&this.column<this.table.getColumnCount()){
var tableColumn=this.table.getColumn(this.column);
tableColumn.removeControlListener(this.columnListener);
}this.columnListener=null;
this.table=null;
this.item=null;
this.column=-1;
$_U(this,$wt.custom.TableEditor,"dispose",[]);
});
$_M(c$,"getColumn",
function(){
return this.column;
});
$_M(c$,"getItem",
function(){
return this.item;
});
$_M(c$,"setColumn",
function(column){
var columnCount=this.table.getColumnCount();
if(columnCount==0){
this.column=(column==0)?0:-1;
this.resize();
return;
}if(this.column>-1&&this.column<columnCount){
var tableColumn=this.table.getColumn(this.column);
tableColumn.removeControlListener(this.columnListener);
this.column=-1;
}if(column<0||column>=this.table.getColumnCount())return;
this.column=column;
var tableColumn=this.table.getColumn(this.column);
tableColumn.addControlListener(this.columnListener);
this.resize();
},"~N");
$_M(c$,"setItem",
function(item){
this.item=item;
this.resize();
},"$wt.widgets.TableItem");
$_M(c$,"setEditor",
function(editor,item,column){
this.setItem(item);
this.setColumn(column);
this.setEditor(editor);
},"$wt.widgets.Control,$wt.widgets.TableItem,~N");
$_M(c$,"resize",
function(){
if(this.table.isDisposed())return;
if(this.item==null||this.item.isDisposed())return;
var columnCount=this.table.getColumnCount();
if(columnCount==0&&this.column!=0)return;
if(columnCount>0&&(this.column<0||this.column>=columnCount))return;
$_U(this,$wt.custom.TableEditor,"resize",[]);
});
c$.$TableEditor$1$=function(){
$_H();
c$=$_W($wt.custom,"TableEditor$1",null,$wt.events.ControlListener);
$_V(c$,"controlMoved",
function(e){
this.b$["$wt.custom.TableEditor"].resize();
},"$wt.events.ControlEvent");
$_V(c$,"controlResized",
function(e){
this.b$["$wt.custom.TableEditor"].resize();
},"$wt.events.ControlEvent");
c$=$_P();
};
});
