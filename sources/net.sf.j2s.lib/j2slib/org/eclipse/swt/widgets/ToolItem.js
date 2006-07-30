$_L(["$wt.widgets.Item"],"$wt.widgets.ToolItem",["$wt.graphics.Image","$.Rectangle","$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.disabledImage=null;
this.hotImage=null;
this.disabledImage2=null;
this.id=0;
$_Z(this,arguments);
},$wt.widgets,"ToolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.ToolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.ToolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,32,16,2,4,0);
},"~N");
$_M(c$,"click",
function(dropDown){
},"~B");
$_M(c$,"createDisabledImage",
function(image,color){
return new $wt.graphics.Image(this.display,image,1);
},"$wt.graphics.Image,$wt.graphics.Color");
$_M(c$,"getBounds",
function(){
var x=0;
var y=0;
var left=this.handle.style.left;
if(left!=null&&left.length!=0){
x=Integer.parseInt(left);
}var top=this.handle.style.top;
if(top!=null&&top.length!=0){
y=Integer.parseInt(top);
}var w=64;
var h=64;
var width=this.handle.style.width;
if(width!=null&&width.length!=0){
w=Integer.parseInt(width);
}else if(this.text!=null&&this.text.length!=0){
w=O$.getStringPlainWidth(this.text);
}var height=this.handle.style.height;
if(height!=null&&height.length!=0){
h=Integer.parseInt(height);
}else if(this.text!=null&&this.text.length!=0){
h=O$.getStringPlainHeight(this.text);
}return new $wt.graphics.Rectangle(x,y,w+6,h+6);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getDisabledImage",
function(){
return this.disabledImage;
});
$_M(c$,"getEnabled",
function(){
if((this.style&2)!=0){
return(this.state&8)==0;
}return true;
});
$_M(c$,"getHotImage",
function(){
return this.hotImage;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if((this.style&(48))==0)return false;
return true;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getWidth",
function(){
return 24;
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.ToolItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ToolItem,"releaseWidget",[]);
this.parent=null;
this.control=null;
this.toolTipText=null;
this.disabledImage=this.hotImage=null;
if(this.disabledImage2!=null)this.disabledImage2.dispose();
this.disabledImage2=null;
});
$_M(c$,"releaseImages",
function(){
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"resizeControl",
function(){
if(this.control!=null&&!this.control.isDisposed()){
var itemRect=this.getBounds();
this.control.setSize(itemRect.width,itemRect.height);
var rect=this.control.getBounds();
rect.x=itemRect.x+Math.floor((itemRect.width-rect.width)/2);
rect.y=itemRect.y+Math.floor((itemRect.height-rect.height)/2);
this.control.setLocation(rect.x,rect.y);
}});
$_M(c$,"selectRadio",
function(){
var index=0;
var items=this.parent.getItems();
while(index<items.length&&items[index]!=this)index++;

var i=index-1;
while(i>=0&&items[i].setRadioSelection(false))--i;

var j=index+1;
while(j<items.length&&items[j].setRadioSelection(false))j++;

this.setSelection(true);
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if((this.style&2)==0)return;
this.control=control;
if((this.parent.style&(576))!=0){
}this.resizeControl();
},"$wt.widgets.Control");
$_M(c$,"setEnabled",
function(enabled){
if(this.image!=null)this.updateImages(enabled&&this.parent.getEnabled());
},"~B");
$_M(c$,"setDisabledImage",
function(image){
if((this.style&2)!=0)return;
this.disabledImage=image;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setHotImage",
function(image){
if((this.style&2)!=0)return;
this.hotImage=image;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setImage",[image]);
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSelection",
function(selected){
if((this.style&(48))==0)return;
if((this.style&(48))!=0){
if(!this.getEnabled()||!this.parent.getEnabled()){
this.updateImages(false);
}}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setText",[string]);
if(this.handle!=null){
this.handle.appendChild(d$.createTextNode(string));
}this.parent.layoutItems();
},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
$_M(c$,"setWidth",
function(width){
if((this.style&2)==0)return;
if(width<0)return;
this.parent.layoutItems();
},"~N");
$_M(c$,"updateImages",
function(enabled){
this.parent.layoutItems();
},"~B");
});
