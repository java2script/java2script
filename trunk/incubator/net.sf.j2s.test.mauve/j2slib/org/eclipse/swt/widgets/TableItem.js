$_L(["$wt.widgets.Item"],"$wt.widgets.TableItem",["$wt.graphics.Color","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event"],function(){
c$=$_C(function(){
this.parent=null;
this.strings=null;
this.images=null;
this.checked=false;
this.grayed=false;
this.cached=false;
this.imageIndent=0;
this.background=-1;
this.foreground=-1;
this.font=-1;
this.cellBackground=null;
this.cellForeground=null;
this.cellFont=null;
this.index=0;
this.selected=false;
this.check=null;
this.hCheckSelection=null;
this.hItemDefaultSelection=null;
this.hItemSelection=null;
$_Z(this,arguments);
},$wt.widgets,"TableItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
this.construct(parent,style,$wt.widgets.TableItem.checkNull(parent).getItemCount(),true);
},"$wt.widgets.Table,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent,style,index,true);
},"$wt.widgets.Table,~N,~N");
$_K(c$,
function(parent,style,index,create){
$_R(this,$wt.widgets.TableItem,[parent,style]);
this.parent=parent;
if(create)parent.createItem(this,index);
this.configureItem();
},"$wt.widgets.Table,~N,~N,~B");
$_M(c$,"configureItem",
($fz=function(){
if((this.parent.style&32)!=0&&this.check!=null){
this.hCheckSelection=$_Q((($_D("$wt.widgets.TableItem$1")?0:org.eclipse.swt.widgets.TableItem.$TableItem$1$()),$_N($wt.widgets.TableItem$1,this,null)));
Clazz.addEvent(this.check,"click",this.hCheckSelection);
}this.hItemSelection=$_Q((($_D("$wt.widgets.TableItem$2")?0:org.eclipse.swt.widgets.TableItem.$TableItem$2$()),$_N($wt.widgets.TableItem$2,this,null)));
Clazz.addEvent(this.handle,"click",this.hItemSelection);
this.hItemDefaultSelection=$_Q((($_D("$wt.widgets.TableItem$3")?0:org.eclipse.swt.widgets.TableItem.$TableItem$3$()),$_N($wt.widgets.TableItem$3,this,null)));
Clazz.addEvent(this.handle,"dblclick",this.hItemDefaultSelection);
},$fz.isPrivate=true,$fz));
c$.checkNull=$_M(c$,"checkNull",
function(control){
return control;
},"$wt.widgets.Table");
$_M(c$,"clear",
function(){
this.text="";
this.image=null;
this.strings=null;
this.images=null;
this.imageIndent=0;
this.checked=this.grayed=false;
if((this.parent.style&268435456)!=0)this.cached=false;
});
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
});
$_M(c$,"getBackground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getBackground();
return new $wt.graphics.Color(this.display,this.handle.childNodes[index].style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(index){
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.style&32)==0)return false;
return this.checked;
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
return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"getForeground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getForeground();
return new $wt.graphics.Color(null,this.handle.childNodes[index].style.backgroundColor);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.style&32)==0)return false;
return this.grayed;
});
$_M(c$,"getImage",
function(){
return $_U(this,$wt.widgets.TableItem,"getImage",[]);
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
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getImageIndent",
function(){
return this.imageIndent;
});
$_M(c$,"getNameText",
function(){
if((this.parent.style&268435456)!=0){
if(!this.cached)return"*virtual*";
}return $_U(this,$wt.widgets.TableItem,"getNameText",[]);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getText",
function(){
return $_U(this,$wt.widgets.TableItem,"getText",[]);
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
$_M(c$,"redraw",
function(){
if((this.parent.style&268435456)!=0)this.cached=true;
if(this.parent.currentItem===this||this.parent.drawCount!=0)return;
var index=this.parent.indexOf(this);
if(index==-1)return;
});
$_M(c$,"redraw",
function(column,drawText,drawImage){
if((this.parent.style&268435456)!=0)this.cached=true;
if(this.parent.currentItem===this||this.parent.drawCount!=0)return;
var index=this.parent.indexOf(this);
if(index==-1)return;
},"~N,~B,~B");
$_M(c$,"releaseHandle",
function(){
if(this.check!=null){
if(this.hCheckSelection!=null){
Clazz.removeEvent(this.check,"click",this.hCheckSelection);
this.hCheckSelection=null;
}O$.destroyHandle(this.check);
this.check=null;
}if(this.handle!=null){
if(this.hItemSelection!=null){
Clazz.removeEvent(this.handle,"click",this.hItemSelection);
this.hItemSelection=null;
}if(this.hItemDefaultSelection!=null){
Clazz.removeEvent(this.handle,"dblclick",this.hItemDefaultSelection);
this.hItemDefaultSelection=null;
}O$.deepClearChildren(this.handle);
}$_U(this,$wt.widgets.TableItem,"releaseHandle",[]);
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TableItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TableItem,"releaseWidget",[]);
this.parent=null;
this.strings=null;
this.images=null;
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
}},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(checked){
if((this.parent.style&32)==0)return;
if(this.checked==checked)return;
this.setChecked(checked,false);
},"~B");
$_M(c$,"setChecked",
function(checked,notify){
this.checked=checked;
if(this.check!=null){
this.check.checked=this.checked;
}if(notify){
var event=new $wt.widgets.Event();
event.item=this;
event.detail=32;
this.parent.postEvent(13,event);
}this.redraw();
},"~B,~B");
$_M(c$,"setFont",
function(font){
var hFont=-1;
if(font!=null){
this.parent.customDraw=true;
}if(this.font==hFont)return;
this.font=hFont;
this.parent.setScrollWidth(this,false);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(index,font){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(font!=null){
this.parent.customDraw=true;
}if(this.cellFont==null){
this.cellFont=$_A(count,0);
for(var i=0;i<count;i++){
this.cellFont[i]=-1;
}
}this.redraw(index,true,false);
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
if(this.grayed==grayed)return;
this.grayed=grayed;
this.redraw();
},"~B");
$_M(c$,"setImage",
function(images){
for(var i=0;i<images.length;i++){
this.setImage(i,images[i]);
}
},"~A");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"setImage",
function(index,image){
if(index==0){
if(image!=null&&image.type==1){
if(image.equals(this.image))return;
}$_U(this,$wt.widgets.TableItem,"setImage",[image]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.images==null&&index!=0)this.images=new Array(count);
if(this.images!=null){
if(image!=null&&image.type==1){
if(image.equals(this.images[index]))return;
}this.images[index]=image;
}if(index==0){
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var text=this.handle.childNodes[index].childNodes[0];
var els=text.childNodes;
var handleStyle=this.handle.style;
if(els.length==1||!O$.existedCSSClass(els[els.length-2],"table-image")){
var div=d$.createElement("DIV");
div.className="table-image image-p-4 image-n-5";
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
}}O$.addCSSClass(this.handle.parentNode,"table-image");
}this.redraw(index,false,true);
},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
this.setImage(0,image);
},"$wt.graphics.Image");
$_M(c$,"setImageIndent",
function(indent){
if(indent<0)return;
if(this.imageIndent==indent)return;
this.imageIndent=indent;
if((this.parent.style&268435456)==0){
var index=this.parent.indexOf(this);
if(index!=-1){
}}this.parent.setScrollWidth(this,false);
this.redraw();
},"~N");
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
$_U(this,$wt.widgets.TableItem,"setText",[string]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.strings==null&&index!=0)this.strings=new Array(count);
if(this.strings!=null){
if(string.equals(this.strings[index]))return;
this.strings[index]=string;
}var text=this.handle.childNodes[index].childNodes[0];
if(index==0){
text=text.childNodes[text.childNodes.length-1];
}text.innerHTML=string;
var columnMaxWidth=this.parent.columnMaxWidth;
var width=O$.getContainerWidth(text.parentNode);
if(columnMaxWidth.length>index){
if(columnMaxWidth[index]<width){
this.parent.lineWidth=this.parent.lineWidth+width-columnMaxWidth[index];
columnMaxWidth[index]=width;
}}else{
this.parent.lineWidth=this.parent.lineWidth+width;
columnMaxWidth[index]=width;
}},"~N,~S");
$_M(c$,"showSelection",
function(selected){
this.selected=selected;
O$.updateCSSClass(this.handle,"table-item-selected",selected);
if(O$.isIE){
var tmpDiv=d$.createElement("DIV");
tmpDiv.style.width="1px";
this.handle.childNodes[0].appendChild(tmpDiv);
O$.destroyHandle(tmpDiv);
}},"~B");
$_M(c$,"isSelected",
function(){
return this.selected;
});
$_M(c$,"enableWidget",
function(enabled){
this.handle.disabled=!enabled;
if(this.check!=null){
this.check.disabled=!enabled;
}},"~B");
c$.$TableItem$1$=function(){
$_H();
c$=$_W($wt.widgets,"TableItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TableItem"].display;
e.type=13;
e.detail=32;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
this.b$["$wt.widgets.TableItem"].setChecked(!this.b$["$wt.widgets.TableItem"].checked);
});
c$=$_P();
};
c$.$TableItem$2$=function(){
$_H();
c$=$_W($wt.widgets,"TableItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TableItem"].handle.disabled){
return;
}O$.SetFocus(this.b$["$wt.widgets.TableItem"].parent.handle);
var evt=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],evt.ctrlKey,evt.shiftKey);
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TableItem"].display;
e.type=13;
e.detail=0;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
this.b$["$wt.widgets.TableItem"].parent.setFocusIndex(this.b$["$wt.widgets.TableItem"].parent.indexOf(this.b$["$wt.widgets.TableItem"]));
this.toReturn(false);
});
c$=$_P();
};
c$.$TableItem$3$=function(){
$_H();
c$=$_W($wt.widgets,"TableItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TableItem"].handle.disabled){
return;
}var evt=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],evt.ctrlKey,evt.shiftKey);
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TableItem"].display;
e.type=14;
e.detail=0;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
};
});
