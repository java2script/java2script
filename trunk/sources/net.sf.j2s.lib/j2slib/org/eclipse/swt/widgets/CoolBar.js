$_L(["$wt.widgets.Composite"],"$wt.widgets.CoolBar",["$wt.graphics.Point","$wt.widgets.CoolItem"],function(){
c$=$_C(function(){
this.items=null;
this.itemHandles=null;
this.originalItems=null;
this.locked=false;
this.ignoreResize=false;
$_Z(this,arguments);
},$wt.widgets,"CoolBar",$wt.widgets.Composite);
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
var newWidth=wHint==-1?0x3FFF:wHint+(border*2);
var newHeight=hHint==-1?0x3FFF:hHint+(border*2);
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
height+=border*2;
width+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.CoolBar,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
if(this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}this.handle.className="cool-bar-default";
if((this.style&2048)!=0){
this.handle.className+=" cool-bar-border";
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=this.items.length;
this.items[item.id=id]=item;
this.itemHandles[id]=d$.createElement("DIV");
var handle=this.itemHandles[id];
handle.className="cool-item-default";
if(index==count){
handle.appendChild(handle);
}else{
handle.insertBefore(handle,this.itemHandles[index]);
}},"$wt.widgets.CoolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.CoolBar,"createWidget",[]);
this.items=new Array(4);
this.originalItems=new Array(0);
this.items=new Array(0);
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.CoolItem");
$_M(c$,"getMargin",
function(index){
var margin=0;
if((this.style&8388608)!=0){
margin+=12;
}else{
margin+=16;
}return margin;
},"~N");
$_V(c$,"findThemeControl",
function(){
return null;
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
$_M(c$,"getItemOrder",
function(){
return $_A(0,0);
});
$_M(c$,"getItems",
function(){
return this.items;
});
$_M(c$,"getItemSizes",
function(){
return null;
});
$_M(c$,"getLastIndexOfRow",
function(index){
return 0;
},"~N");
$_M(c$,"isLastItemOfRow",
function(index){
return false;
},"~N");
$_M(c$,"getLocked",
function(){
return this.locked;
});
$_M(c$,"getWrapIndices",
function(){
var items=this.getItems();
var indices=$_A(items.length,0);
var count=0;
for(var i=0;i<items.length;i++){
if(items[i].getWrap())indices[count++]=i;
}
var result=$_A(count,0);
System.arraycopy(indices,0,result,0,count);
return result;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(item==this.items[i]){
return i;
}}
return-1;
},"$wt.widgets.CoolItem");
$_M(c$,"resizeToPreferredWidth",
function(index){
},"~N");
$_M(c$,"resizeToMaximumWidth",
function(index){
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
$_U(this,$wt.widgets.CoolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.CoolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control==control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBackgroundPixel",
function(pixel){
if(this.background==pixel)return;
this.background=pixel;
},"~N");
$_M(c$,"setForegroundPixel",
function(pixel){
if(this.foreground==pixel)return;
this.foreground=pixel;
},"~N");
$_M(c$,"setItemColors",
function(foreColor,backColor){
},"~N,~N");
$_M(c$,"setItemLayout",
function(itemOrder,wrapIndices,sizes){
this.setRedraw(false);
this.setItemOrder(itemOrder);
this.setWrapIndices(wrapIndices);
this.setItemSizes(sizes);
this.setRedraw(true);
},"~A,~A,~A");
$_M(c$,"setItemOrder",
function(itemOrder){
},"~A");
$_M(c$,"setItemSizes",
function(sizes){
},"~A");
$_M(c$,"setLocked",
function(locked){
this.locked=locked;
},"~B");
$_M(c$,"setWrapIndices",
function(indices){
if(indices==null)indices=$_A(0,0);
var count=this.getItemCount();
for(var i=0;i<indices.length;i++){
}
this.setRedraw(false);
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(item.getWrap()){
this.resizeToPreferredWidth(i-1);
item.setWrap(false);
}}
this.resizeToMaximumWidth(count-1);
for(var i=0;i<indices.length;i++){
var index=indices[i];
if(0<=index&&index<items.length){
var item=items[index];
item.setWrap(true);
this.resizeToMaximumWidth(index-1);
}}
this.setRedraw(true);
},"~A");
$_S(c$,
"SEPARATOR_WIDTH",2,
"MAX_WIDTH",0x7FFF);
});
