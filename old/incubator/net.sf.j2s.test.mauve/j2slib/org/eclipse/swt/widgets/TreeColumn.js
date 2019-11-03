$_L(["$wt.widgets.Item"],"$wt.widgets.TreeColumn",["$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.resizable=false;
this.colWidth=0;
this.cachedWidth=0;
$_Z(this,arguments);
},$wt.widgets,"TreeColumn",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TreeColumn,[parent,$wt.widgets.TreeColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,parent.getColumnCount());
},"$wt.widgets.Tree,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TreeColumn,[parent,$wt.widgets.TreeColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.Tree,~N,~N");
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
$_M(c$,"getResizable",
function(){
return this.resizable;
});
$_M(c$,"getWidth",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return 0;
var items=this.parent.items;
var maxWidth=0;
for(var i=0;i<items.length;i++){
var width=0;
if(index==0){
width=(19)*items[i].depth;
}var innerChildren=items[i].handle.childNodes[index].childNodes;
if(index==0){
innerChildren=innerChildren[0].childNodes[0].childNodes;
}if(items[i].text==null||items[i].text.length==0){
width+=(index==0?5:0);
}else{
var text0=innerChildren[innerChildren.length-1];
width+=O$.getContainerWidth(text0);
}maxWidth=Math.max(maxWidth,width);
}
if(!this.parent.headerVisible){
if(this.colWidth<=0||(index==0&&this.parent.columns.length==1)){
return Math.max(this.colWidth,maxWidth-1);
}else{
return this.colWidth;
}}if(this.handle.style.width!=null&&this.handle.style.width.length!=0){
var styleWidth=Integer.parseInt(this.handle.style.width);
return this.text!=null?Math.max(O$.getStringPlainWidth(this.text),styleWidth):styleWidth;
}return maxWidth;
});
$_M(c$,"pack",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return;
});
$_M(c$,"releaseHandle",
function(){
if(this.handle!=null){
O$.deepClearChildren(this.handle);
}$_U(this,$wt.widgets.TreeColumn,"releaseHandle",[]);
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TreeColumn,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TreeColumn,"releaseWidget",[]);
this.parent=null;
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
$_U(this,$wt.widgets.TreeColumn,"setImage",[image]);
},"$wt.graphics.Image");
$_M(c$,"setResizable",
function(resizable){
this.resizable=resizable;
},"~B");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TreeColumn,"setText",[string]);
var text=this.handle.childNodes[0];
O$.clearChildren(text);
if(string.length==0)string="\u00a0";
text.appendChild(d$.createTextNode(string));
},"~S");
$_M(c$,"setWidth",
function(width){
var index=this.parent.indexOf(this);
if(index==-1)return;
this.colWidth=width;
this.cachedWidth=width;
if(this.text!=null){
this.cachedWidth=Math.max(O$.getStringPlainWidth(this.text),width);
}this.handle.style.width=this.cachedWidth+"px";
if(O$.isIE){
for(var i=0;i<this.parent.items.length;i++){
this.parent.items[i].handle.childNodes[0].childNodes[0].style.width=this.cachedWidth+"px";
}
}},"~N");
});
