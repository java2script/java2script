$_L(["$wt.widgets.Item"],"$wt.widgets.TreeItem",["$wt.graphics.Color","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event"],function(){
c$=$_C(function(){
this.parent=null;
this.strings=null;
this.images=null;
this.parentItem=null;
this.items=null;
this.index=0;
this.depth=0;
this.expandStatus=false;
this.selected=false;
this.checkElement=null;
this.hAnchorToggle=null;
this.hCheckSelection=null;
this.hTextSelection=null;
this.hTextDefaultSelection=null;
this.hNoTextSelection=null;
this.anchorElement=null;
$_Z(this,arguments);
},$wt.widgets,"TreeItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
this.items=new Array(0);
parent.createItem(this,null,-1);
this.configureItem();
},"$wt.widgets.Tree,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
this.items=new Array(0);
parent.createItem(this,null,index);
this.configureItem();
},"$wt.widgets.Tree,~N,~N");
$_K(c$,
function(parentItem,style){
$_R(this,$wt.widgets.TreeItem,[$wt.widgets.TreeItem.checkNull(parentItem).parent,style]);
this.parent=parentItem.parent;
this.parentItem=parentItem;
this.items=new Array(0);
this.parent.createItem(this,parentItem,-1);
this.configureItem();
},"$wt.widgets.TreeItem,~N");
$_K(c$,
function(parentItem,style,index){
$_R(this,$wt.widgets.TreeItem,[$wt.widgets.TreeItem.checkNull(parentItem).parent,style]);
this.parent=parentItem.parent;
this.items=new Array(0);
this.parentItem=parentItem;
this.parent.createItem(this,parentItem,index);
this.configureItem();
},"$wt.widgets.TreeItem,~N,~N");
$_M(c$,"configureItem",
function(){
var innerChildren=this.handle.childNodes[0].childNodes[0].childNodes[0].childNodes;
for(var i=0;i<innerChildren.length-1;i++){
var hAnchor=innerChildren[i];
var css=hAnchor.childNodes[1].className;
if(css.indexOf("plus")!=-1||css.indexOf("minus")!=-1){
this.anchorElement=hAnchor;
this.hAnchorToggle=$_Q((($_D("$wt.widgets.TreeItem$1")?0:org.eclipse.swt.widgets.TreeItem.$TreeItem$1$()),$_N($wt.widgets.TreeItem$1,this,null)));
Clazz.addEvent(hAnchor,"click",this.hAnchorToggle);
break;
}}
if((this.parent.style&32)!=0){
this.hCheckSelection=$_Q((($_D("$wt.widgets.TreeItem$2")?0:org.eclipse.swt.widgets.TreeItem.$TreeItem$2$()),$_N($wt.widgets.TreeItem$2,this,null)));
Clazz.addEvent(this.checkElement,"click",this.hCheckSelection);
}var text=innerChildren[innerChildren.length-1];
this.hTextSelection=$_Q((($_D("$wt.widgets.TreeItem$3")?0:org.eclipse.swt.widgets.TreeItem.$TreeItem$3$()),$_N($wt.widgets.TreeItem$3,this,null)));
Clazz.addEvent(text,"click",this.hTextSelection);
this.hTextDefaultSelection=$_Q((($_D("$wt.widgets.TreeItem$4")?0:org.eclipse.swt.widgets.TreeItem.$TreeItem$4$()),$_N($wt.widgets.TreeItem$4,this,null)));
Clazz.addEvent(text,"dblclick",this.hTextDefaultSelection);
this.hNoTextSelection=O$.setTextSelection(text,false);
});
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
return this.expandStatus;
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
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
return this.items;
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
var children=this.getItems();
for(var i=0;i<children.length;i++){
children[i].dispose();
}
this.parent.destroyItem(this);
if(this.parentItem!=null){
this.parentItem.destroyItem(this);
}});
$_M(c$,"destroyItem",
($fz=function(item){
var length=this.items.length;
var index=-1;
for(var i=0;i<length;i++){
if(this.items[i].equals(item)){
index=i;
}}
if(index>-1){
var newItems=new Array(0);
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,this.items.length-index-1);
this.items=newItems;
}},$fz.isPrivate=true,$fz),"$wt.widgets.TreeItem");
$_M(c$,"releaseHandle",
function(){
if(this.text!=null){
if(this.hNoTextSelection!=null){
Clazz.removeEvent(this.text,"selectstart",this.hNoTextSelection);
this.hNoTextSelection=null;
}if(this.hTextSelection!=null){
Clazz.removeEvent(this.text,"click",this.hTextSelection);
this.hTextSelection=null;
}if(this.hTextDefaultSelection!=null){
Clazz.removeEvent(this.text,"dblclick",this.hTextDefaultSelection);
this.hTextDefaultSelection=null;
}O$.destroyHandle(this.text);
this.text=null;
}if(this.hCheckSelection!=null){
Clazz.removeEvent(this.checkElement,"click",this.hCheckSelection);
this.hCheckSelection=null;
}if(this.anchorElement!=null&&this.hAnchorToggle!=null){
Clazz.removeEvent(this.anchorElement,"click",this.hAnchorToggle);
this.anchorElement=null;
this.hAnchorToggle=null;
}if(this.checkElement!=null){
O$.destroyHandle(this.checkElement);
this.checkElement=null;
}if(this.handle!=null){
O$.deepClearChildren(this.handle);
}$_U(this,$wt.widgets.TreeItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseWidget",[]);
this.parent=null;
this.parentItem=null;
this.items=null;
});
$_M(c$,"removeAll",
function(){
var items=this.getItems();
var length=items.length;
for(var i=0;i<length;i++){
items[i].dispose();
}
this.items=new Array(0);
O$.replaceCSSClassInDepth(this.handle,"tree-anchor-plus","tree-anchor-line");
O$.replaceCSSClassInDepth(this.handle,"tree-anchor-minus","tree-anchor-line");
});
$_M(c$,"setBackground",
function(color){
if(color!=null){
this.handle.style.backgroundColor=color.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(color!=null){
this.handle.childNodes[index].style.backgroundColor=color.getCSSHandle();
}this.redraw(index,true,true);
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
var items=this.parent.getDescendantItems(this.index);
for(var i=0;i<items.length;i++){
if(items[i]==null)continue;if(items[i].parentItem===this){
items[i].expandStatus=this.expandStatus;
}if(items[i].expandStatus){
items[i].handle.style.display=expanded?"":"none";
}else{
items[i].handle.style.display="none";
}}
var innerChildren=this.handle.childNodes[0].childNodes[0].childNodes[0].childNodes;
var hAnchor=innerChildren[innerChildren.length-2].childNodes[1];
if(expanded){
hAnchor.className="tree-anchor-h tree-anchor-minus";
}else{
hAnchor.className="tree-anchor-h tree-anchor-plus";
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
if(color!=null){
this.handle.style.color=color.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(color!=null){
this.handle.childNodes[index].style.color=color.getCSSHandle();
}},"~N,$wt.graphics.Color");
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
}if(index==0){
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var innerChildren=this.handle.childNodes[index].childNodes;
if(index==0){
innerChildren=innerChildren[0].childNodes[0].childNodes;
}var text=innerChildren[innerChildren.length-1];
var els=text.childNodes;
var handleStyle=this.handle.style;
if(els.length==1||!O$.existedCSSClass(els[els.length-2],"tree-image-icon")){
var div=d$.createElement("DIV");
div.className="tree-image-icon image-p-4 image-n-5";
text.insertBefore(div,els[els.length-1]);
handleStyle=div.style;
}else{
handleStyle=els[els.length-2].style;
}if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}O$.addCSSClass(this.handle.parentNode,"tree-image");
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
}var innerChildren=this.handle.childNodes[index].childNodes;
if(index==0){
innerChildren=innerChildren[0].childNodes[0].childNodes;
}var text0=innerChildren[innerChildren.length-1];
if(index==0){
text0=text0.childNodes[text0.childNodes.length-1];
}O$.clearChildren(text0);
text0.appendChild(d$.createTextNode(string));
},"~N,~S");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"showSelection",
function(selected){
this.selected=selected;
O$.updateCSSClass(this.handle,"tree-item-selected",selected);
if(O$.isIE){
var tmpDiv=d$.createElement("DIV");
tmpDiv.style.width="1px";
tmpDiv.style.height="1px";
var tempElem=this.handle.childNodes[0].childNodes[0].childNodes[0];
var innerEl=tempElem.childNodes[tempElem.childNodes.length-1].childNodes[0];
innerEl.style.hasLayout=true;
innerEl.appendChild(tmpDiv);
O$.destroyHandle(tmpDiv);
innerEl.style.display="inline-block";
if((this.style&67108864)!=0){
innerEl.style.left="0px";
tempElem.childNodes[tempElem.childNodes.length-1].style.left="0px";
}}},"~B");
$_M(c$,"toggleExpandStatus",
function(){
var innerChildren=this.handle.childNodes[0].childNodes[0].childNodes[0].childNodes;
var clazzName=innerChildren[innerChildren.length-2].childNodes[1].className;
var type=0;
if(clazzName==null){
type=0;
}else if(clazzName.indexOf("minus")!=-1){
type=-1;
}else if(clazzName.indexOf("plus")!=-1){
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
$_M(c$,"addItem",
function(item,index){
if(index==-1||index==this.items.length){
this.items[this.items.length]=item;
}else{
var newItem=new Array(0);
System.arraycopy(this.items,0,newItem,0,index);
System.arraycopy(this.items,index,newItem,index+1,this.items.length-index);
newItem[index]=item;
this.items=newItem;
}},"$wt.widgets.TreeItem,~N");
$_M(c$,"isSelected",
function(){
return this.selected;
});
$_M(c$,"enableWidget",
function(enabled){
this.handle.disabled=!enabled;
if(this.checkElement!=null){
this.checkElement.disabled=!enabled;
}},"~B");
c$.$TreeItem$1$=function(){
$_H();
c$=$_W($wt.widgets,"TreeItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TreeItem"].toggleExpandStatus();
});
c$=$_P();
};
c$.$TreeItem$2$=function(){
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
};
c$.$TreeItem$3$=function(){
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
};
c$.$TreeItem$4$=function(){
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
e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TreeItem"].display;
e.type=8;
e.detail=0;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
};
});
