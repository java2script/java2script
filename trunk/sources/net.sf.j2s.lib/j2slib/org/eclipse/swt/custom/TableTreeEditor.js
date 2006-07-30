$_L(["$wt.custom.ControlEditor"],"$wt.custom.TableTreeEditor",["java.lang.Runnable","$wt.events.ControlListener","$.TreeListener","$wt.graphics.Rectangle"],function(){
c$=$_C(function(){
this.tableTree=null;
this.item=null;
this.column=-1;
this.columnListener=null;
this.treeListener=null;
$_Z(this,arguments);
},$wt.custom,"TableTreeEditor",$wt.custom.ControlEditor);
$_K(c$,
function(tableTree){
$_R(this,$wt.custom.TableTreeEditor,[tableTree.getTable()]);
this.tableTree=tableTree;
this.treeListener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.TableTreeEditor$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.runnable=null;
$_Z(this,arguments);
},$wt.custom,"TableTreeEditor$1",null,$wt.events.TreeListener);
$_Y(c$,function(){
this.runnable=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.TableTreeEditor$1$2")){
$_H();
c$=$_W($wt.custom,"TableTreeEditor$1$2",null,Runnable);
$_V(c$,"run",
function(){
if(this.b$["$wt.custom.TableTreeEditor"].editor==null||this.b$["$wt.custom.TableTreeEditor"].editor.isDisposed())return;
if(this.b$["$wt.custom.TableTreeEditor"].tableTree.isDisposed())return;
this.b$["$wt.custom.TableTreeEditor"].resize();
this.b$["$wt.custom.TableTreeEditor"].editor.setVisible(true);
});
c$=$_P();
}
return $_N($wt.custom.TableTreeEditor$1$2,i$,v$);
})(this,null);
});
$_V(c$,"treeCollapsed",
function(e){
if(this.b$["$wt.custom.TableTreeEditor"].editor==null||this.b$["$wt.custom.TableTreeEditor"].editor.isDisposed())return;
this.b$["$wt.custom.TableTreeEditor"].editor.setVisible(false);
e.display.asyncExec(this.runnable);
},"$wt.events.TreeEvent");
$_V(c$,"treeExpanded",
function(e){
if(this.b$["$wt.custom.TableTreeEditor"].editor==null||this.b$["$wt.custom.TableTreeEditor"].editor.isDisposed())return;
this.b$["$wt.custom.TableTreeEditor"].editor.setVisible(false);
e.display.asyncExec(this.runnable);
},"$wt.events.TreeEvent");
c$=$_P();
}
return $_N($wt.custom.TableTreeEditor$1,i$,v$);
})(this,null);
tableTree.addTreeListener(this.treeListener);
this.columnListener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.TableTreeEditor$3")){
$_H();
c$=$_W($wt.custom,"TableTreeEditor$3",null,$wt.events.ControlListener);
$_V(c$,"controlMoved",
function(e){
this.b$["$wt.custom.TableTreeEditor"].resize();
},"$wt.events.ControlEvent");
$_V(c$,"controlResized",
function(e){
this.b$["$wt.custom.TableTreeEditor"].resize();
},"$wt.events.ControlEvent");
c$=$_P();
}
return $_N($wt.custom.TableTreeEditor$3,i$,v$);
})(this,null);
this.grabVertical=true;
},"$wt.custom.TableTree");
$_V(c$,"computeBounds",
function(){
if(this.item==null||this.column==-1||this.item.isDisposed()||this.item.tableItem==null)return new $wt.graphics.Rectangle(0,0,0,0);
var cell=this.item.getBounds(this.column);
var area=this.tableTree.getClientArea();
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
if(this.treeListener!=null)this.tableTree.removeTreeListener(this.treeListener);
this.treeListener=null;
var table=this.tableTree.getTable();
if(this.column>-1&&this.column<table.getColumnCount()){
var tableColumn=table.getColumn(this.column);
tableColumn.removeControlListener(this.columnListener);
}this.tableTree=null;
this.item=null;
this.column=-1;
$_U(this,$wt.custom.TableTreeEditor,"dispose",[]);
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
var table=this.tableTree.getTable();
var columnCount=table.getColumnCount();
if(columnCount==0){
this.column=(column==0)?0:-1;
this.resize();
return;
}if(this.column>-1&&this.column<columnCount){
var tableColumn=table.getColumn(this.column);
tableColumn.removeControlListener(this.columnListener);
this.column=-1;
}if(column<0||column>=table.getColumnCount())return;
this.column=column;
var tableColumn=table.getColumn(this.column);
tableColumn.addControlListener(this.columnListener);
this.resize();
},"~N");
$_M(c$,"setItem",
function(item){
this.item=item;
this.resize();
},"$wt.custom.TableTreeItem");
$_M(c$,"setEditor",
function(editor,item,column){
this.setItem(item);
this.setColumn(column);
this.setEditor(editor);
},"$wt.widgets.Control,$wt.custom.TableTreeItem,~N");
$_M(c$,"resize",
function(){
if(this.tableTree.isDisposed())return;
if(this.item==null||this.item.isDisposed())return;
var table=this.tableTree.getTable();
var columnCount=table.getColumnCount();
if(columnCount==0&&this.column!=0)return;
if(columnCount>0&&(this.column<0||this.column>=columnCount))return;
$_U(this,$wt.custom.TableTreeEditor,"resize",[]);
});
});
