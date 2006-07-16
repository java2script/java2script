Clazz.load(["$wt.widgets.Item"],"$wt.widgets.TableColumn",["$wt.internal.browser.OS","$wt.internal.dnd.DragAndDrop","$.TableColumnDND","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.lastX=0;
this.lastY=0;
this.parent=null;
this.resizable=false;
this.moveable=false;
this.resizeHandle=null;
$_Z(this,arguments);
},$wt.widgets,"TableColumn",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,parent.getColumnCount());
},"$wt.widgets.Table,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.Table,~N,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"getAlignment",
function(){
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getMoveable",
function(){
return this.moveable;
});
$_M(c$,"getResizable",
function(){
return this.resizable;
});
$_M(c$,"getWidth",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return 0;
if(this.handle.style.width!=null&&this.handle.style.width.length!=0){
var styleWidth=Integer.parseInt(this.handle.style.width);
return this.text!=null?Math.max(O$.getStringPlainWidth(this.text),styleWidth):styleWidth;
}return O$.getContainerWidth(this.handle);
});
$_M(c$,"pack",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TableColumn,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.resizeHandle!=null){
O$.destroyHandle(this.resizeHandle);
this.resizeHandle=null;
}$_U(this,$wt.widgets.TableColumn,"releaseHandle",[]);
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setAlignment",
function(alignment){
if((alignment&(16924672))==0)return;
var index=this.parent.indexOf(this);
if(index==-1||index==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
},"~N");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TableColumn,"setImage",[image]);
},"$wt.graphics.Image");
$_M(c$,"setMoveable",
function(moveable){
this.moveable=moveable;
this.parent.updateMoveable();
},"~B");
$_M(c$,"setResizable",
function(resizable){
this.resizable=resizable;
},"~B");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TableColumn,"setText",[string]);
if(this.handle.childNodes!=null){
for(var i=0;i<this.handle.childNodes.length;i++){
if(this.handle.childNodes[i]!=null){
this.handle.removeChild(this.handle.childNodes[i]);
}}
}this.handle.appendChild(d$.createTextNode(string));
var columnMaxWidth=this.parent.columnMaxWidth;
var width=O$.getContainerWidth(this.handle);
if(columnMaxWidth.length>index){
if(columnMaxWidth[index]<width){
this.parent.lineWidth+=width-columnMaxWidth[index];
columnMaxWidth[index]=width;
}}else{
this.parent.lineWidth+=width;
columnMaxWidth[index]=width;
}},"~S");
$_M(c$,"setWidth",
function(width){
var index=this.parent.indexOf(this);
if(index==-1)return;
var tempWidth=width;
if(this.text!=null){
tempWidth=Math.max(O$.getStringPlainWidth(this.text),width);
}this.handle.style.width=tempWidth+"px";
},"~N");
});
