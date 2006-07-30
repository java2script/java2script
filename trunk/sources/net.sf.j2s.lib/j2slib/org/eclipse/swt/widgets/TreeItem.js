$_L(["$wt.widgets.Item"],"$wt.widgets.TreeItem",["$wt.SWT","$wt.graphics.Color","$.Image","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event"],function(){
c$=$_C(function(){
this.strings=null;
this.images=null;
this.parent=null;
this.parentItem=null;
this.index=0;
this.expandStatus=false;
this.checkElement=null;
$_Z(this,arguments);
},$wt.widgets,"TreeItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
parent.createItem(this,null,-1);
},"$wt.widgets.Tree,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
parent.createItem(this,null,index);
},"$wt.widgets.Tree,~N,~N");
$_K(c$,
function(parentItem,style){
$_R(this,$wt.widgets.TreeItem,[parentItem.parent,style]);
this.parent=parentItem.parent;
this.parentItem=parentItem;
this.parent.createItem(this,parentItem.handle,-1);
},"$wt.widgets.TreeItem,~N");
$_K(c$,
function(parentItem,style,index){
$_R(this,$wt.widgets.TreeItem,[parentItem.parent,style]);
this.parent=parentItem.parent;
this.parentItem=parentItem;
this.parent.createItem(this,parentItem.handle,index);
},"$wt.widgets.TreeItem,~N,~N");
c$.checkNull=$_M(c$,"checkNull",
function(item){
return item;
},"$wt.widgets.TreeItem");
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
});
$_M(c$,"getBackground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getBackground();
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(index){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.style&32)==0)return false;
if(this.checkElement!=null){
return this.checkElement.checked;
}return false;
});
$_M(c$,"getExpanded",
function(){
return false;
});
$_M(c$,"getFont",
function(){
return this.display.getSystemFont();
});
$_M(c$,"getFont",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getFont();
return this.display.getSystemFont();
},"~N");
$_M(c$,"getForeground",
function(){
return new $wt.graphics.Color(this.display,this.parent.handle.style.color);
});
$_M(c$,"getForeground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getForeground();
return new $wt.graphics.Color(this.display,this.handle.style.color);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.style&32)==0)return false;
if(this.checkElement!=null){
return this.checkElement.checked;
}return true;
});
$_M(c$,"getItem",
function(index){
return this.parent.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.parent.items.length;
});
$_M(c$,"getItems",
function(){
return this.parent.getItems(this.index);
});
$_M(c$,"getImage",
function(index){
if(index==0)return this.getImage();
if(this.images!=null){
if(0<=index&&index<this.images.length)return this.images[index];
}return null;
},"~N");
$_M(c$,"getImageBounds",
function(index){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.parentItem;
});
$_M(c$,"getText",
function(index){
if(index==0)return this.getText();
if(this.strings!=null){
if(0<=index&&index<this.strings.length){
var string=this.strings[index];
return string!=null?string:"";
}}return"";
},"~N");
$_M(c$,"indexOf",
function(item){
return this.parent.indexOf(this.index,item);
},"$wt.widgets.TreeItem");
$_M(c$,"redraw",
function(){
if(this.parent.drawCount>0)return;
});
$_M(c$,"redraw",
function(column,drawText,drawImage){
if(this.parent.drawCount>0)return;
},"~N,~B,~B");
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseHandle",[]);
if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}this.parent=null;
this.parentItem=null;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseWidget",[]);
this.parent=null;
this.strings=null;
this.images=null;
});
$_M(c$,"removeAll",
function(){
});
$_M(c$,"setBackground",
function(color){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
this.redraw(index,true,true);
},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(checked){
if((this.parent.style&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=checked;
}},"~B");
$_M(c$,"setExpanded",
function(expanded){
this.expandStatus=expanded;
if(this.getItemCount()==0){
return;
}var items=this.parent.getDescendantItems(this.index);
for(var i=0;i<items.length;i++){
if(items[i].parentItem==this){
items[i].expandStatus=this.expandStatus;
}if(items[i].expandStatus){
items[i].handle.style.display=expanded?"":"none";
}else{
items[i].handle.style.display="none";
}}
if(items.length==0){
this.updateModifier(0);
}else{
this.updateModifier(expanded?1:-1);
}},"~B");
$_M(c$,"setFont",
function(font){
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(index,font){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
},"~N,$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
this.redraw(index,true,false);
},"~N,$wt.graphics.Color");
$_M(c$,"setGrayed",
function(grayed){
if((this.parent.style&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=grayed;
}},"~B");
$_M(c$,"setImage",
function(images){
for(var i=0;i<images.length;i++){
this.setImage(i,images[i]);
}
},"~A");
$_M(c$,"setImage",
function(index,image){
if(index==0){
if(image!=null&&image.type==1){
if(image.equals(this.image))return;
}$_U(this,$wt.widgets.TreeItem,"setImage",[image]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.images==null&&index!=0)this.images=new Array(count);
if(this.images!=null){
if(image!=null&&image.type==1){
if(image.equals(this.images[index]))return;
}this.images[index]=image;
}},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
this.setImage(0,image);
},"$wt.graphics.Image");
$_M(c$,"setText",
function(strings){
for(var i=0;i<strings.length;i++){
var string=strings[i];
if(string!=null)this.setText(i,string);
}
},"~A");
$_M(c$,"setText",
function(index,string){
if(index==0){
if(string.equals(this.text))return;
$_U(this,$wt.widgets.TreeItem,"setText",[string]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.strings==null&&index!=0)this.strings=new Array(count);
if(this.strings!=null){
if(string.equals(this.strings[index]))return;
this.strings[index]=string;
}if(index==0){
}var tbodyTD=null;
if(index<this.handle.childNodes.length){
if(this.handle.childNodes[index]!=null&&"TD".equals(this.handle.childNodes[index].nodeName)){
tbodyTD=this.handle.childNodes[index];
}}if(tbodyTD==null){
tbodyTD=d$.createElement("TD");
this.handle.appendChild(tbodyTD);
}if(tbodyTD.childNodes!=null){
O$.clearChildren(tbodyTD);
}var hItem=d$.createElement("DIV");
hItem.className="tree-item-default";
var hAnchor=d$.createElement("DIV");
hAnchor.className="tree-item-anchor-default";
hAnchor.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$1")){
$_H();
c$=$_W($wt.widgets,"TreeItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TreeItem"].toggleExpandStatus();
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$1,i$,v$);
})(this,null));
hAnchor.appendChild(d$.createTextNode(""+String.fromCharCode(160)));
hItem.appendChild(hAnchor);
if((this.parent.style&32)!=0){
this.checkElement=d$.createElement("INPUT");
this.checkElement.type="checkbox";
hItem.appendChild(this.checkElement);
this.checkElement.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$2")){
$_H();
c$=$_W($wt.widgets,"TreeItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TreeItem"].display;
e.type=13;
e.detail=32;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$2,i$,v$);
})(this,null));
}var s=(index==0)?this.getText():this.strings[index];
var text=d$.createElement("DIV");
text.className="tree-item-text-default";
text.appendChild(d$.createTextNode(s));
text.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$3")){
$_H();
c$=$_W($wt.widgets,"TreeItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
this.b$["$wt.widgets.TreeItem"].parent.toggleSelection(this.b$["$wt.widgets.TreeItem"],evt.ctrlKey,evt.shiftKey);
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TreeItem"].display;
e.type=13;
e.detail=0;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$3,i$,v$);
})(this,null));
text.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$4")){
$_H();
c$=$_W($wt.widgets,"TreeItem$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TreeItem"].toggleExpandStatus();
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TreeItem"].display;
e.type=14;
e.detail=0;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$4,i$,v$);
})(this,null));
text.onselectstart=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$5")){
$_H();
c$=$_W($wt.widgets,"TreeItem$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$5,i$,v$);
})(this,null));
hItem.appendChild(text);
var pItem=this.parentItem;
var padding=0;
while(pItem!=null){
pItem=pItem.parentItem;
padding+=20;
}
hItem.style.marginLeft=padding+"px";
tbodyTD.appendChild(hItem);
},"~N,~S");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"showSelection",
function(selected){
var index=1;
if((this.parent.style&32)!=0){
index++;
}var element=this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className=selected?"tree-item-text-selected":"tree-item-text-default";
},"~B");
$_M(c$,"toggleExpandStatus",
function(){
var clazzName=this.handle.childNodes[0].childNodes[0].childNodes[0].className;
var type=0;
if(clazzName==null){
type=0;
}else if(clazzName.indexOf("expanded")!=-1){
type=-1;
}else if(clazzName.indexOf("collapsed")!=-1){
type=1;
}if(type==0){
return;
}var toExpand=type>=0;
this.setExpanded(toExpand);
var e=new $wt.widgets.Event();
e.type=toExpand?17:18;
e.display=this.display;
e.item=this;
e.widget=this;
this.parent.sendEvent(e);
});
$_M(c$,"updateModifier",
function(type){
var element=this.handle.childNodes[0].childNodes[0].childNodes[0];
if(type==-1){
element.className="tree-item-anchor-collapsed";
return false;
}else if(type==1){
element.className="tree-item-anchor-expanded";
return true;
}else{
element.className="tree-item-anchor-default";
return true;
}},"~N");
});
