Clazz.load(["$wt.widgets.Item"],"$wt.widgets.CoolItem",["$wt.graphics.Point","$.Rectangle","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.id=0;
this.ideal=false;
this.minimum=false;
$_Z(this,arguments);
},$wt.widgets,"CoolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.CoolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.CoolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
var width=wHint;
var height=hHint;
if(wHint==-1)width=32;
if(hHint==-1)height=32;
width+=this.parent.getMargin(index);
return new $wt.graphics.Point(width,height);
},"~N,~N");
$_M(c$,"getBounds",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClientArea",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}var index=this.parent.indexOf(this);
if(index==-1)return;
if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=newControl;
},"$wt.widgets.Control");
$_M(c$,"getPreferredSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setPreferredSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.ideal=true;
var handle=this.parent.itemHandles[this.parent.indexOf(this)];
handle.style.width=width+"px";
handle.style.height=height+"px";
},"~N,~N");
$_M(c$,"setPreferredSize",
function(size){
this.setPreferredSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.CoolItem,"setText",[string]);
var handle=this.parent.itemHandles[this.parent.indexOf(this)];
if(handle!=null){
handle.appendChild(d$.createTextNode(string));
}},"~S");
$_M(c$,"getSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getMinimumSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(32,16);
});
$_M(c$,"setMinimumSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.minimum=true;
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getWrap",
function(){
var index=this.parent.indexOf(this);
return false;
});
$_M(c$,"setWrap",
function(wrap){
var index=this.parent.indexOf(this);
},"~B");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
});
