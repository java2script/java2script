$_L(["$wt.widgets.Item"],"$wt.widgets.MenuItem",["$wt.graphics.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$.Popup","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.menu=null;
this.id=0;
this.accelerator=0;
this.statusEl=null;
this.imageEl=null;
this.textEl=null;
this.arrowEl=null;
this.mnemonicChar=0;
this.hItemMouseEnter=null;
this.hItemMouseExit=null;
this.hNoTextSelection=null;
this.hNoMenu=null;
$_Z(this,arguments);
},$wt.widgets,"MenuItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
this.configMenuItem();
},"$wt.widgets.Menu,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,index);
this.configMenuItem();
},"$wt.widgets.Menu,~N,~N");
$_K(c$,
function(parent,menu,style,index){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
this.menu=menu;
if(menu!=null)menu.cascade=this;
this.display.addMenuItem(this);
this.configMenuItem();
},"$wt.widgets.Menu,$wt.widgets.Menu,~N,~N");
$_M(c$,"configMenuItem",
function(){
if((this.style&2)!=0)return;
this.hItemMouseEnter=$_Q((($_D("$wt.widgets.MenuItem$1")?0:org.eclipse.swt.widgets.MenuItem.$MenuItem$1$()),$_N($wt.widgets.MenuItem$1,this,null)));
Clazz.addEvent(this.handle,"mouseover",this.hItemMouseEnter);
this.hItemMouseExit=$_Q((($_D("$wt.widgets.MenuItem$2")?0:org.eclipse.swt.widgets.MenuItem.$MenuItem$2$()),$_N($wt.widgets.MenuItem$2,this,null)));
Clazz.addEvent(this.handle,"mouseout",this.hItemMouseExit);
this.checkHookType(13);
this.hNoTextSelection=O$.setTextSelection(this.handle,false);
this.hNoMenu=O$.noReturnCallback;
Clazz.addEvent(this.handle,"contextmenu",this.hNoMenu);
});
$_V(c$,"hookSelection",
function(){
if(this.hSelection!=null){
return;
}this.hSelection=$_Q((($_D("$wt.widgets.MenuItem$3")?0:org.eclipse.swt.widgets.MenuItem.$MenuItem$3$()),$_N($wt.widgets.MenuItem$3,this,null)));
Clazz.addEvent(this.handle,"click",this.hSelection);
});
$_M(c$,"addArmListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(30,typedListener);
},"$wt.events.ArmListener");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,32,16,2,64,0);
},"~N");
$_M(c$,"fixMenus",
function(newParent){
if(this.menu!=null)this.menu.fixMenus(newParent);
},"$wt.widgets.Decorations");
$_M(c$,"getAccelerator",
function(){
return this.accelerator;
});
$_M(c$,"getBounds",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
if((this.parent.style&2)!=0){
var shell=this.parent.parent;
if(shell.menuBar!==this.parent){
return new $wt.graphics.Rectangle(0,0,0,0);
}return new $wt.graphics.Rectangle(0,0,0,0);
}else{
var pt2=O$.calcuateRelativePosition(this.handle,this.parent.handle);
var width=O$.getContainerWidth(this.handle);
var height=O$.getContainerHeight(this.handle);
return new $wt.graphics.Rectangle(pt2.x+2,pt2.y+2,width,height);
}});
$_M(c$,"getEnabled",
function(){
return!O$.existedCSSClass(this.handle,"menu-item-disabled");
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getNameText",
function(){
if((this.style&2)!=0)return"|";
return $_U(this,$wt.widgets.MenuItem,"getNameText",[]);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if((this.style&(48))==0)return false;
var cssKey=((this.style&32)!=0)?"menu-item-checked":"menu-item-selected";
return O$.existedCSSClass(this.statusEl,cssKey);
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.MenuItem,"releaseChild",[]);
if(this.menu!=null)this.menu.dispose();
this.menu=null;
this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.arrowEl!=null){
O$.destroyHandle(this.arrowEl);
this.arrowEl=null;
}if(this.textEl!=null){
O$.destroyHandle(this.textEl);
this.textEl=null;
}if(this.imageEl!=null){
O$.destroyHandle(this.imageEl);
this.imageEl=null;
}if(this.statusEl!=null){
O$.destroyHandle(this.statusEl);
this.statusEl=null;
}if(this.handle!=null){
if(this.hItemMouseEnter!=null){
Clazz.removeEvent(this.handle,"mouseover",this.hItemMouseEnter);
this.hItemMouseEnter=null;
}if(this.hItemMouseExit!=null){
Clazz.removeEvent(this.handle,"mouseout",this.hItemMouseExit);
this.hItemMouseExit=null;
}if(this.hNoMenu!=null){
Clazz.removeEvent(this.handle,"contextmenu",this.hNoMenu);
this.hNoMenu=null;
}if(this.hNoTextSelection!=null){
Clazz.removeEvent(this.handle,"selectstart",this.hNoTextSelection);
this.hNoTextSelection=null;
}}$_U(this,$wt.widgets.MenuItem,"releaseHandle",[]);
});
$_M(c$,"releaseMenu",
function(){
this.menu=null;
});
$_M(c$,"releaseWidget",
function(){
if(this.menu!=null)this.menu.releaseResources();
this.menu=null;
$_U(this,$wt.widgets.MenuItem,"releaseWidget",[]);
if(this.accelerator!=0){
this.parent.destroyAccelerators();
}this.accelerator=0;
this.display.removeMenuItem(this);
this.parent=null;
});
$_M(c$,"removeArmListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(30,listener);
},"$wt.events.ArmListener");
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
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
$_M(c$,"setAccelerator",
function(accelerator){
if(this.accelerator==accelerator)return;
this.accelerator=accelerator;
this.parent.destroyAccelerators();
},"~N");
$_M(c$,"setEnabled",
function(enabled){
O$.updateCSSClass(this.handle,"menu-item-disabled",!enabled);
this.parent.destroyAccelerators();
this.parent.redraw();
},"~B");
$_M(c$,"setImage",
function(image){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.MenuItem,"setImage",[image]);
if(image!=null){
O$.addCSSClass(this.parent.handle,"menu-enable-image");
O$.addCSSClass(this.handle,"menu-item-enable-image");
}else{
var existedImage=false;
for(var i=0;i<this.parent.items.length;i++){
if(this.parent.items[i].image!=null){
existedImage=true;
break;
}}
if(!existedImage){
O$.removeCSSClass(this.parent.handle,"menu-enable-image");
}O$.removeCSSClass(this.handle,"menu-item-enable-image");
}if(this.imageEl!=null){
if(image!=null){
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
O$.clearChildren(this.imageEl);
var handleStyle=this.imageEl.style;
if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
if(this.image.packedURL!=null){
handleStyle.backgroundImage="url(\""+this.image.packedURL+"\")";
handleStyle.backgroundPosition="-"+this.image.packedOffsetX+"px -"+this.image.packedOffsetY+"px";
}else{
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}}}else{
this.imageEl.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.imageEl.style.filter!=null){
this.imageEl.style.filter="";
}}}this.parent.redraw();
},"$wt.graphics.Image");
$_M(c$,"setMenu",
function(menu){
if(menu!=null){
}var oldMenu=this.menu;
if(oldMenu===menu)return;
if(oldMenu!=null)oldMenu.cascade=null;
this.menu=menu;
this.parent.destroyAccelerators();
},"$wt.widgets.Menu");
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
var cssKey=((this.style&32)!=0)?"menu-item-checked":"menu-item-selected";
O$.updateCSSClass(this.statusEl,cssKey,selected);
this.parent.redraw();
},"~B");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.text.equals(string))return;
$_U(this,$wt.widgets.MenuItem,"setText",[string]);
var el=this.textEl;
if(this.textEl==null){
el=this.handle;
}if(el.childNodes!=null&&el.childNodes.length!=0){
O$.clearChildren(el);
}var idx=this.text.indexOf('\t');
var normalText=this.text;
var accelText=null;
if(idx!=-1){
normalText=this.text.substring(0,idx);
accelText=this.text.substring(idx+1);
}if(accelText!=null&&accelText.length!=0){
var accel=d$.createElement("DIV");
accel.className="menu-item-accel";
el.appendChild(accel);
accel.appendChild(d$.createTextNode(accelText));
}var mChar=O$.insertText(el,normalText);
if(mChar!==normalText){
this.mnemonicChar=0+(mChar.toUpperCase().charAt(0)).charCodeAt(0);
}if((this.parent.style&2)==0){
el.style.display="block";
}this.parent.redraw();
},"~S");
$_M(c$,"showSubMenu",
function(){
this.menu.handle.style.left="-10000px";
this.menu.handle.style.top="-10000px";
this.menu.handle.style.display="block";
var bounds=this.menu.getBounds();
var coordinate=O$.calcuateRelativePosition(this.handle,d$.body);
var w=O$.getContainerWidth(this.handle);
var h=O$.getContainerHeight(this.handle);
if(O$.isFirefox){
coordinate.x+=1;
h+=1;
}else if(O$.isIE){
coordinate.x-=1;
coordinate.y-=2;
}var clientArea=this.parent.parent.getMonitor().getClientArea();
clientArea.x+=O$.getFixedBodyOffsetLeft();
clientArea.y+=O$.getFixedBodyOffsetTop();
var rect=$wt.internal.browser.Popup.popupMenu(clientArea,new $wt.graphics.Rectangle(coordinate.x,coordinate.y,w,h),bounds.width,bounds.height,0);
this.menu.handle.style.width=rect.width+"px";
this.menu.x=rect.x;
this.menu.y=rect.y;
this.menu.handle.style.left=rect.x+"px";
this.menu.handle.style.top=rect.y+"px";
this.menu.handle.style.zIndex=w$.currentTopZIndex+1000;
this.menu.handle.style.display="block";
O$.SetFocus(this.menu.btnFocus);
});
c$.$MenuItem$1$=function(){
$_H();
c$=$_W($wt.widgets,"MenuItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var className=this.b$["$wt.widgets.MenuItem"].handle.className;
if(className==null){
return;
}else{
var bar="-";
if(className.indexOf("menu-bar-item")!=-1){
bar="-bar-";
}var cssOver="menu"+bar+"item-hover";
var cssDisabled="menu"+bar+"item-disabled";
var cssDisabledHover="menu"+bar+"item-disabled-hover";
var cssArrowRight="menu"+bar+"item-arrow-right";
var clazz=className.$plit("\\s");
var existed=false;
var disabled=false;
var existedDisabled=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssOver){
existed=true;
}else if(clazz[i]===cssDisabled){
disabled=true;
}else if(clazz[i]===cssDisabledHover){
existedDisabled=true;
}}
if(!existed){
clazz[clazz.length]=cssOver;
}if(disabled&&!existedDisabled){
clazz[clazz.length]=cssDisabledHover;
}if(!existed||(disabled&&!existedDisabled)){
var s="";
{
s=clazz.join(" ");
}this.b$["$wt.widgets.MenuItem"].handle.className=s;
}if(!disabled){
var divs=this.b$["$wt.widgets.MenuItem"].handle.getElementsByTagName("DIV");
var existedArrow=false;
for(var k=0;k<divs.length;k++){
var div=divs[k];
if(div.className===cssArrowRight){
existedArrow=true;
break;
}}
if(existedArrow){
}}}var p=this.b$["$wt.widgets.MenuItem"].parent;
var indexOf=p.indexOf(this.b$["$wt.widgets.MenuItem"]);
if(p.currentIndex!=-1&&p.currentIndex!=indexOf){
var mouseExit=p.items[p.currentIndex].hItemMouseExit;
if(mouseExit!=null){
mouseExit();
}}p.currentIndex=indexOf;
if((this.b$["$wt.widgets.MenuItem"].parent.style&2)!=0){
if(this.b$["$wt.widgets.MenuItem"].parent.handle.className.indexOf("menu-bar-selected")!=-1){
if(this.b$["$wt.widgets.MenuItem"].menu!=null&&!this.b$["$wt.widgets.MenuItem"].menu.isDisposed()){
var evt=this.getEvent();
if(evt!=null){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
this.b$["$wt.widgets.MenuItem"].showSubMenu();
evtHTML.preventDefault();
evtHTML.stopPropagation();
}this.toReturn(false);
}}}});
c$=$_P();
};
c$.$MenuItem$2$=function(){
$_H();
c$=$_W($wt.widgets,"MenuItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var className=this.b$["$wt.widgets.MenuItem"].handle.className;
if(className==null){
return;
}else{
var bar="-";
if(className.indexOf("menu-bar-item")!=-1){
bar="-bar-";
}var cssOver="menu"+bar+"item-hover";
var cssDisabledHover="menu"+bar+"item-disabled-hover";
var clazz=className.$plit("\\s");
var existed=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssOver||clazz[i]===cssDisabledHover){
existed=true;
var k=0;
for(var j=i;j<clazz.length-1;j++){
if(clazz[j]!==cssOver&&clazz[j]!==cssDisabledHover){
clazz[i+k]=clazz[j+1];
k++;
}}
{
clazz.length-=clazz.length-(i+k);
}}}
if(existed){
var s="";
{
s=clazz.join(" ");
}this.b$["$wt.widgets.MenuItem"].handle.className=s;
}}this.b$["$wt.widgets.MenuItem"].parent.currentIndex=-1;
});
c$=$_P();
};
c$.$MenuItem$3$=function(){
$_H();
c$=$_W($wt.widgets,"MenuItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.MenuItem"].isEnabled()){
this.b$["$wt.widgets.MenuItem"].display.timerExec(40,(($_D("$wt.widgets.MenuItem$3$1")?0:org.eclipse.swt.widgets.MenuItem.$MenuItem$3$1$()),$_N($wt.widgets.MenuItem$3$1,this,null)));
return;
}if((this.b$["$wt.widgets.MenuItem"].parent.style&2)!=0){
if(this.b$["$wt.widgets.MenuItem"].menu!=null&&!this.b$["$wt.widgets.MenuItem"].menu.isDisposed()){
var evt=this.getEvent();
if(evt!=null){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
this.b$["$wt.widgets.MenuItem"].showSubMenu();
evtHTML.preventDefault();
evtHTML.stopPropagation();
}this.toReturn(false);
}O$.addCSSClass(this.b$["$wt.widgets.MenuItem"].parent.handle,"menu-bar-selected");
}if((this.b$["$wt.widgets.MenuItem"].style&32)!=0){
this.b$["$wt.widgets.MenuItem"].setSelection(!this.b$["$wt.widgets.MenuItem"].getSelection());
}else{
if((this.b$["$wt.widgets.MenuItem"].style&16)!=0){
if((this.b$["$wt.widgets.MenuItem"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.MenuItem"].setSelection(!this.b$["$wt.widgets.MenuItem"].getSelection());
}else{
this.b$["$wt.widgets.MenuItem"].selectRadio();
}}}var event=new $wt.widgets.Event();
this.b$["$wt.widgets.MenuItem"].postEvent(13,event);
this.b$["$wt.widgets.MenuItem"].parent.lastFocusdTime=-1;
var p=this.b$["$wt.widgets.MenuItem"].parent;
{
p.hMenuBlur();
}});
c$=$_P();
};
c$.$MenuItem$3$1$=function(){
$_H();
c$=$_W($wt.widgets,"MenuItem$3$1",null,Runnable);
$_V(c$,"run",
function(){
O$.SetFocus(this.b$["$wt.widgets.MenuItem"].parent.btnFocus);
});
c$=$_P();
};
});
