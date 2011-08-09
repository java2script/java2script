$_L(["$wt.widgets.Item"],"$wt.widgets.ToolItem",["$wt.graphics.Image","$.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.disabledImage=null;
this.hotImage=null;
this.disabledImage2=null;
this.id=0;
this.cachedTextWidth=0;
this.cachedTextHeight=0;
this.isInnerBounds=false;
this.seperatorWidth=0;
this.dropDownEl=null;
this.hItemSelection=null;
this.hItemMouseDown=null;
this.hItemMouseUp=null;
this.hArrowSelection=null;
this.hToolMouseDown=null;
this.hToolMouseUp=null;
$_Z(this,arguments);
},$wt.widgets,"ToolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
this.configureItem();
},"$wt.widgets.ToolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,index);
this.configureItem();
},"$wt.widgets.ToolBar,~N,~N");
$_M(c$,"configureItem",
function(){
this.hItemSelection=$_Q((($_D("$wt.widgets.ToolItem$1")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$1$()),$_N($wt.widgets.ToolItem$1,this,null)));
Clazz.addEvent(this.handle,"click",this.hItemSelection);
Clazz.addEvent(this.handle,"dblclick",this.hItemSelection);
if((this.style&2)==0){
if(this.dropDownEl!=null){
var arrow=this.dropDownEl.childNodes[0];
this.hItemMouseDown=$_Q((($_D("$wt.widgets.ToolItem$2")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$2$()),$_N($wt.widgets.ToolItem$2,this,null)));
Clazz.addEvent(this.handle,"mousedown",this.hItemMouseDown);
Clazz.addEvent(arrow,"mousedown",this.hItemMouseDown);
Clazz.addEvent(this.dropDownEl,"mousedown",this.hItemMouseDown);
this.hItemMouseUp=$_Q((($_D("$wt.widgets.ToolItem$3")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$3$()),$_N($wt.widgets.ToolItem$3,this,null)));
Clazz.addEvent(this.handle,"mouseup",this.hItemMouseUp);
Clazz.addEvent(arrow,"mouseup",this.hItemMouseUp);
Clazz.addEvent(this.dropDownEl,"mouseup",this.hItemMouseUp);
Clazz.addEvent(this.handle,"mouseout",this.hItemMouseUp);
Clazz.addEvent(arrow,"mouseout",this.hItemMouseUp);
Clazz.addEvent(this.dropDownEl,"mouseout",this.hItemMouseUp);
this.hArrowSelection=$_Q((($_D("$wt.widgets.ToolItem$4")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$4$()),$_N($wt.widgets.ToolItem$4,this,null)));
Clazz.addEvent(arrow,"click",this.hArrowSelection);
Clazz.addEvent(this.dropDownEl,"click",this.hArrowSelection);
}else{
this.hToolMouseDown=$_Q((($_D("$wt.widgets.ToolItem$5")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$5$()),$_N($wt.widgets.ToolItem$5,this,null)));
Clazz.addEvent(this.handle,"mousedown",this.hToolMouseDown);
this.hToolMouseUp=$_Q((($_D("$wt.widgets.ToolItem$6")?0:org.eclipse.swt.widgets.ToolItem.$ToolItem$6$()),$_N($wt.widgets.ToolItem$6,this,null)));
Clazz.addEvent(this.handle,"mouseup",this.hToolMouseUp);
Clazz.addEvent(this.handle,"mouseout",this.hToolMouseUp);
}}});
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
var pt=this.getLocation();
var x=pt.x;
var y=pt.y;
var p=this.parent;
var w=0;
var h=0;
if(p.containsImage&&p.imgMaxHeight==0&&p.imgMaxWidth==0){
p.calculateImagesMaxSize();
}if(p.containsText&&p.txtMaxHeight==0&&p.txtMaxWidth==0){
p.calculateTextsMaxSize();
}var hasText=this.text!=null&&this.text.length!=0;
var hasImage=this.image!=null;
var border=3;
if((p.style&8388608)!=0){
border=2;
}if(p.containsImage){
if(p.containsText){
if((p.style&131072)!=0){
h=Math.max(p.imgMaxHeight,p.txtMaxHeight)+5+border;
if(hasImage&&hasText){
w=p.imgMaxWidth+this.cachedTextWidth+8+border;
}else if(!hasImage&&hasText){
w=this.cachedTextWidth+8+border;
}else if(hasImage&&!hasText){
w=p.imgMaxWidth+4+border;
}else{
if((this.style&2)!=0){
if((p.style&512)!=0){
w=-1;
}else{
w=8;
}}else{
w=p.imgMaxWidth+p.txtMaxWidth+8+border;
}}}else{
h=p.imgMaxHeight+p.txtMaxHeight+4+border;
if(hasImage&&hasText){
w=Math.max(p.imgMaxWidth,this.cachedTextWidth)+8+border;
}else if(!hasImage&&hasText){
w=this.cachedTextWidth+8+border;
}else if(hasImage&&!hasText){
w=p.imgMaxWidth+4+border;
}else{
if((this.style&2)!=0){
if((p.style&512)!=0){
w=-1;
}else{
w=8;
}}else{
w=Math.max(p.imgMaxWidth,p.txtMaxWidth)+8+border;
}}}}else{
w=p.imgMaxWidth+4+border;
h=p.imgMaxHeight+3+border;
if((p.style&512)!=0){
w+=4;
}if((this.style&2)!=0){
if((p.style&512)!=0){
h=8;
}else{
w=8;
}}}}else{
if(p.containsText){
if(hasText){
w=this.cachedTextWidth+8+border;
h=this.cachedTextHeight+5+border;
}else{
if((this.style&2)!=0){
if((p.style&512)!=0){
w=p.txtMaxWidth+8+border;
w+=p.getBorderWidth()*2;
;if(this.control!=null){
h=21;
}else{
h=8;
}}else{
w=8;
h=p.txtMaxHeight+5+border;
}}else{
w=p.txtMaxWidth+4+border;
h=p.txtMaxHeight+5+border;
if((this.style&4)!=0){
if((p.style&512)!=0){
w+=4;
}}}}}else{
w=21;
h=21;
}}if((this.style&2)!=0&&this.control!=null){
var ww=(this.seperatorWidth!=-1)?-1:w;
if(ww==-1){
var computeSize=this.control.computeSize(ww,h);
w=computeSize.x-1;
}}if((this.style&4)!=0){
w+=8+2+border;
}if((p.style&8388608)!=0){
if((p.style&512)==0||(this.style&2)==0){
h+=1;
}if((this.style&2)==0){
w+=1;
}if((this.style&4)!=0){
w+=1;
}}if((p.style&512)!=0){
if((this.style&4)!=0){
w+=1;
}w-=4;
if(!this.isInnerBounds){
w=this.parent.cachedMaxItemWidth;
if((this.style&2)!=0){
w+=p.getBorderWidth()*2;
}}y+=x;
x=0;
}return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getLocation",
function(){
var p=this.parent;
var x=0;
var y=0;
var pos=O$.calcuateRelativePosition(this.handle,this.parent.handle);
if((this.parent.style&8388608)!=0){
var idx=p.indexOf(this);
pos.x+=idx;
}x=pos.x;
y=pos.y;
if((this.parent.style&8)!=0){
y-=O$.isIE?4:2;
}if((this.parent.style&2048)!=0){
if(O$.isOpera){
x-=2;
y-=2;
}else if(!O$.isIE){
x+=2;
y+=2;
}}if((this.style&2)!=0){
if(this.control==null){
if((this.parent.style&512)!=0){
y-=3;
}else{
x-=3;
}}else{
}}return new $wt.graphics.Point(x,y);
});
$_M(c$,"updateItemBounds",
function(w,h){
var p=this.parent;
var hasText=this.text!=null&&this.text.length!=0;
var hasImage=this.image!=null;
var border=3;
if((p.style&8388608)!=0){
border=2;
}var s=this.handle.style;
s.width=Math.max(0,w-8-border)+"px";
s.height=Math.max(0,h-5-border)+"px";
if((this.style&2)!=0){
if(this.control!=null){
s.width=w+"px";
s.height=h+"px";
this.control.setSize(w,h);
var pt=this.getLocation();
this.control.left=pt.x;
this.control.top=pt.y;
}else{
s.height=(h-6)+"px";
}}else if(!hasText){
s.width=Math.max(0,w-8-border)+"px";
s.height=Math.max(0,h-5-border)+"px";
if(O$.isIE&&(p.style&131072)==0){
if(p.containsImage){
s.fontSize="0";
if(hasImage&&p.containsText){
s.height=Math.max(0,h-5-border-2)+"px";
}else{
s.height=Math.max(0,h-5-border-1)+"px";
}}else{
s.fontSize="0";
s.height=Math.max(0,h-5-border+1)+"px";
}}if(!p.containsText){
s.backgroundPosition="center center";
}else if((this.parent.style&131072)==0){
s.backgroundPosition="center top";
}else{
s.backgroundPosition="left center";
}}if(O$.isIE&&this.dropDownEl!=null){
this.dropDownEl.style.height=(h-border+1)+"px";
if(hasImage&&(p.style&131072)==0){
this.dropDownEl.style.height=Math.max(0,h-2-border)+"px";
}}},"~N,~N");
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
}return!O$.existedCSSClass(this.handle,"tool-item-disabled");
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
return O$.existedCSSClass(this.handle,"tool-item-selected");
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
$_M(c$,"releaseHandle",
function(){
if(this.dropDownEl!=null){
var arrow=this.dropDownEl.childNodes[0];
if(this.hItemMouseDown!=null){
Clazz.removeEvent(this.dropDownEl,"mousedown",this.hItemMouseDown);
Clazz.removeEvent(arrow,"mousedown",this.hItemMouseDown);
}if(this.hItemMouseUp!=null){
Clazz.removeEvent(this.dropDownEl,"mouseup",this.hItemMouseUp);
Clazz.removeEvent(this.dropDownEl,"mouseout",this.hItemMouseUp);
Clazz.removeEvent(arrow,"mouseup",this.hItemMouseUp);
Clazz.removeEvent(arrow,"mouseout",this.hItemMouseUp);
}if(this.hArrowSelection!=null){
Clazz.removeEvent(this.dropDownEl,"click",this.hArrowSelection);
Clazz.removeEvent(arrow,"click",this.hArrowSelection);
this.hArrowSelection=null;
}O$.destroyHandle(this.dropDownEl);
this.dropDownEl=null;
}if(this.handle!=null){
if(this.hItemSelection!=null){
Clazz.removeEvent(this.handle,"click",this.hItemSelection);
Clazz.removeEvent(this.handle,"dblclick",this.hItemSelection);
this.hItemSelection=null;
}if(this.hItemMouseDown!=null){
Clazz.removeEvent(this.handle,"mousedown",this.hItemMouseDown);
}if(this.hItemMouseUp!=null){
Clazz.removeEvent(this.handle,"mouseup",this.hItemMouseUp);
Clazz.removeEvent(this.handle,"mouseout",this.hItemMouseUp);
}if(this.hToolMouseDown!=null){
Clazz.removeEvent(this.handle,"mousedown",this.hToolMouseDown);
this.hToolMouseDown=null;
}if(this.hToolMouseUp!=null){
Clazz.removeEvent(this.handle,"mouseup",this.hToolMouseUp);
Clazz.removeEvent(this.handle,"mouseout",this.hToolMouseUp);
this.hToolMouseUp=null;
}this.hItemMouseDown=null;
this.hItemMouseUp=null;
}$_U(this,$wt.widgets.ToolItem,"releaseHandle",[]);
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
if((this.style&4)!=0){
this.handle.style.width=(itemRect.width-8-4-1)+"px";
}else{
this.handle.style.width=itemRect.width+"px";
}this.handle.style.height=itemRect.height+"px";
}});
$_M(c$,"selectRadio",
function(){
var index=0;
var items=this.parent.getItems();
while(index<items.length&&items[index]!==this)index++;

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
if(control!=null){
O$.removeCSSClass(this.handle,"tool-item-seperator");
O$.addCSSClass(this.handle,"tool-item-inner-control");
this.handle.appendChild(control.handle);
}else{
O$.addCSSClass(this.handle,"tool-item-seperator");
O$.removeCSSClass(this.handle,"tool-item-inner-control");
}if((this.parent.style&(576))!=0){
}this.resizeControl();
},"$wt.widgets.Control");
$_M(c$,"setEnabled",
function(enabled){
O$.updateCSSClass(this.handle,"tool-item-disabled",!enabled);
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
this.parent.imgMaxHeight=0;
this.parent.imgMaxWidth=0;
this.parent.containsImage=this.image!=null;
if(!this.parent.containsImage){
for(var i=0;i<this.parent.items.length;i++){
if(this.parent.items[i].image!=null){
this.parent.containsImage=true;
break;
}}
}this.updateImages(this.getEnabled()&&this.parent.getEnabled());
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
O$.updateCSSClass(this.handle,"tool-item-selected",selected);
if((this.style&(48))!=0){
if(!this.getEnabled()||!this.parent.getEnabled()){
this.updateImages(false);
}}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setText",[string]);
this.cachedTextHeight=0;
this.cachedTextWidth=0;
this.parent.txtMaxHeight=0;
this.parent.txtMaxWidth=0;
this.parent.containsText=string!=null&&string.length!=0;
if(!this.parent.containsText){
for(var i=0;i<this.parent.items.length;i++){
var txt=this.parent.items[i].text;
if(txt!=null&&txt.length!=0){
this.parent.containsImage=true;
break;
}}
}if(this.handle!=null){
var textEl=null;
if(this.handle.childNodes.length==0){
textEl=d$.createElement("DIV");
textEl.className="tool-item-text";
this.handle.appendChild(textEl);
}else{
if(O$.existedCSSClass(this.handle.childNodes[0],"tool-item-text")){
textEl=this.handle.childNodes[0];
}else{
textEl=d$.createElement("DIV");
textEl.className="tool-item-text";
this.handle.insertBefore(textEl,this.handle.childNodes[0]);
}O$.clearChildren(textEl);
}textEl.appendChild(d$.createTextNode(string));
O$.setTextSelection(textEl,false);
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
this.seperatorWidth=width;
this.parent.layoutItems();
},"~N");
$_M(c$,"updateImages",
function(enabled){
if(this.image!=null){
O$.addCSSClass(this.parent.handle,"tool-item-enable-image");
O$.addCSSClass(this.handle,"tool-item-enable-image");
}else{
var existedImage=false;
for(var i=0;i<this.parent.items.length;i++){
if(this.parent.items[i].image!=null){
existedImage=true;
break;
}}
if(!existedImage){
O$.removeCSSClass(this.parent.handle,"tool-item-enable-image");
}O$.removeCSSClass(this.handle,"tool-item-enable-image");
}if(this.image!=null){
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var handleStyle=this.handle.style;
if(O$.isIENeedPNGFix&&this.image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}}else{
var handleStyle=this.handle.style;
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="";
}this.parent.layoutItems();
},"~B");
c$.$ToolItem$1$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}if((this.b$["$wt.widgets.ToolItem"].style&32)!=0){
this.b$["$wt.widgets.ToolItem"].setSelection(!this.b$["$wt.widgets.ToolItem"].getSelection());
}else{
if((this.b$["$wt.widgets.ToolItem"].style&16)!=0){
if((this.b$["$wt.widgets.ToolItem"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.ToolItem"].setSelection(!this.b$["$wt.widgets.ToolItem"].getSelection());
}else{
this.b$["$wt.widgets.ToolItem"].selectRadio();
}}}this.b$["$wt.widgets.ToolItem"].postEvent(13);
});
c$=$_P();
};
c$.$ToolItem$2$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}O$.addCSSClass(this.b$["$wt.widgets.ToolItem"].handle,"tool-item-down");
O$.addCSSClass(this.b$["$wt.widgets.ToolItem"].dropDownEl,"tool-item-drop-down-button-down");
});
c$=$_P();
};
c$.$ToolItem$3$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}O$.removeCSSClass(this.b$["$wt.widgets.ToolItem"].handle,"tool-item-down");
O$.removeCSSClass(this.b$["$wt.widgets.ToolItem"].dropDownEl,"tool-item-drop-down-button-down");
});
c$=$_P();
};
c$.$ToolItem$4$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}var event=new $wt.widgets.Event();
event.detail=4;
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
event.x=e.x;
event.y=e.y;
this.b$["$wt.widgets.ToolItem"].postEvent(13,event);
});
c$=$_P();
};
c$.$ToolItem$5$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}O$.addCSSClass(this.b$["$wt.widgets.ToolItem"].handle,"tool-item-down");
});
c$=$_P();
};
c$.$ToolItem$6$=function(){
$_H();
c$=$_W($wt.widgets,"ToolItem$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.ToolItem"].isEnabled()){
this.toReturn(false);
return;
}O$.removeCSSClass(this.b$["$wt.widgets.ToolItem"].handle,"tool-item-down");
});
c$=$_P();
};
});
