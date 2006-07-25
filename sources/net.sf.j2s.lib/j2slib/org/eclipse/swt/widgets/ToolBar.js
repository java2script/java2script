Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.ToolBar",["$wt.graphics.Point","$wt.widgets.ToolItem"],function(){
c$=$_C(function(){
this.lastFocusId=0;
this.items=null;
this.ignoreResize=false;
this.ignoreMouse=false;
this.imageList=null;
this.disabledImageList=null;
this.hotImageList=null;
$_Z(this,arguments);
},$wt.widgets,"ToolBar",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ToolBar,[parent,$wt.widgets.ToolBar.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8388608)==0)style|=524288;
if((style&512)!=0)style&=-65;
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if((this.style&512)!=0){
var count=this.items.length;
for(var i=0;i<count;i++){
var rect=this.items[i].getBounds();
height+=rect.height;
if((this.items[i].style&2)!=0){
width=Math.max(width,24);
}else{
width=Math.max(width,rect.width);
}}
}else{
var count=this.items.length;
for(var i=0;i<count;i++){
var rect=this.items[i].getBounds();
height=Math.max(height,rect.height);
width+=rect.width;
}
}if(width==0)width=24;
if(height==0)height=22;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
width=trim.width;
height=trim.height;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.ToolBar,"computeTrim",[x,y,width,height]);
trim.height+=2;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.ToolBar,"createHandle",[]);
this.state&=-3;
this.items=new Array(0);
this.lastFocusId=-1;
this.handle=d$.createElement("DIV");
if(this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}this.handle.className="tool-bar-default";
if((this.style&2048)!=0){
this.handle.className+=" tool-bar-border";
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=this.items.length;
this.items[item.id=id]=item;
item.handle=d$.createElement("DIV");
item.handle.className="tool-item-default";
this.handle.appendChild(item.handle);
if((this.style&512)!=0)this.setRowCount(count+1);
this.layoutItems();
},"$wt.widgets.ToolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.ToolBar,"createWidget",[]);
this.items=new Array(0);
this.lastFocusId=-1;
});
$_M(c$,"destroyItem",
function(item){
this.layoutItems();
},"$wt.widgets.ToolItem");
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.ToolBar,"enableWidget",[enabled]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
if((item.style&(48))!=0){
item.updateImages(enabled&&item.getEnabled());
}}}
},"~B");
$_M(c$,"getDisabledImageList",
function(){
return this.disabledImageList;
});
$_M(c$,"getHotImageList",
function(){
return this.hotImageList;
});
$_M(c$,"getImageList",
function(){
return this.imageList;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
var items=this.getItems();
for(var i=0;i<items.length;i++){
var rect=items[i].getBounds();
if(rect.contains(point))return items[i];
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
return this.items;
});
$_M(c$,"getRowCount",
function(){
return 1;
});
$_M(c$,"indexOf",
function(item){
return 0;
},"$wt.widgets.ToolItem");
$_M(c$,"layoutItems",
function(){
if((this.style&64)!=0){
try{
this.handle.style.whiteSpace="wrap";
}catch(e){
if($_O(e,java.lang.Exception)){
}else{
throw e;
}
}
}if((this.style&512)!=0){
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null)item.resizeControl();
}
});
$_V(c$,"mnemonicHit",
function(ch){
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(ch){
return false;
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseImages();
item.releaseResources();
}}
this.items=null;
this.imageList=this.hotImageList=this.disabledImageList=null;
$_U(this,$wt.widgets.ToolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.ToolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control==control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
if(this.parent.lpwp!=null){
}$_U(this,$wt.widgets.ToolBar,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setDefaultFont",
function(){
$_U(this,$wt.widgets.ToolBar,"setDefaultFont",[]);
});
$_M(c$,"setDisabledImageList",
function(imageList){
if(this.disabledImageList==imageList)return;
var hImageList=0;
if((this.disabledImageList=imageList)!=null){
hImageList=this.disabledImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.ToolBar,"setFont",[font]);
var index=0;
var mask=60;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&mask)!=0)break;
index++;
}
if(index==this.items.length){
}this.layoutItems();
},"$wt.graphics.Font");
$_M(c$,"setHotImageList",
function(imageList){
if(this.hotImageList==imageList)return;
var hImageList=0;
if((this.hotImageList=imageList)!=null){
hImageList=this.hotImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setImageList",
function(imageList){
if(this.imageList==imageList)return;
var hImageList=0;
if((this.imageList=imageList)!=null){
hImageList=imageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setParent",
function(parent){
if(!$_U(this,$wt.widgets.ToolBar,"setParent",[parent]))return false;
return true;
},"$wt.widgets.Composite");
$_M(c$,"setRowCount",
function(count){
},"~N");
$_M(c$,"setTabItemFocus",
function(){
var index=0;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&2)==0){
if(item.getEnabled())break;
}index++;
}
if(index==this.items.length)return false;
return $_U(this,$wt.widgets.ToolBar,"setTabItemFocus",[]);
});
$_S(c$,
"$DEFAULT_WIDTH",24,
"$DEFAULT_HEIGHT",22);
});
