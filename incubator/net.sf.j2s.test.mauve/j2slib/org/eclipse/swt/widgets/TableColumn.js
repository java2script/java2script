$_L(["$wt.widgets.Item"],"$wt.widgets.TableColumn",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.colWidth=0;
this.parent=null;
this.resizable=false;
this.moveable=false;
this.resizeHandle=null;
this.hColumnSelection=null;
$_Z(this,arguments);
},$wt.widgets,"TableColumn",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,parent.getColumnCount());
this.configureColumn();
},"$wt.widgets.Table,~N");
$_M(c$,"configureColumn",
($fz=function(){
this.hColumnSelection=$_Q((($_D("$wt.widgets.TableColumn$1")?0:org.eclipse.swt.widgets.TableColumn.$TableColumn$1$()),$_N($wt.widgets.TableColumn$1,this,null)));
Clazz.addEvent(this.handle,"dblclick",this.hColumnSelection);
},$fz.isPrivate=true,$fz));
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,index);
this.configureColumn();
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
if(!this.parent.headerVisible){
return this.colWidth;
}if(this.handle.style.width!=null&&this.handle.style.width.length!=0){
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
}if(this.handle!=null){
if(this.hColumnSelection!=null){
Clazz.removeEvent(this.handle,"click",this.hColumnSelection);
this.hColumnSelection=null;
}O$.deepClearChildren(this.handle);
O$.destroyHandle(this.handle);
this.handle=null;
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
var text=this.handle.childNodes[0];
O$.clearChildren(text);
if(string.length==0)string="\u00a0";
text.appendChild(d$.createTextNode(string));
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
this.colWidth=width;
var tempWidth=width;
if(this.text!=null){
tempWidth=Math.max(O$.getStringPlainWidth(this.text),width);
}this.handle.style.width=tempWidth+"px";
},"~N");
c$.$TableColumn$1$=function(){
$_H();
c$=$_W($wt.widgets,"TableColumn$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TableColumn"].sendEvent(14);
});
c$=$_P();
};
});
