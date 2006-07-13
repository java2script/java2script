Clazz.load(["$wt.widgets.Item"],"$wt.widgets.TreeColumn",["$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.resizable=false;
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
$_V(c$,"checkSubclass",
function(){
});
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
return 0;
});
$_M(c$,"pack",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return;
var columnWidth=0;
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
},"~S");
$_M(c$,"setWidth",
function(width){
var index=this.parent.indexOf(this);
if(index==-1)return;
},"~N");
});
