/* http://j2s.sf.net/ */$_L(["$wt.widgets.Item"],"$wt.widgets.MenuItem",["$wt.graphics.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$.Popup","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
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
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MenuItem$1")){
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
var el=p.items[p.currentIndex].handle;
{
el.onmouseout();
}}p.currentIndex=indexOf;
if((this.b$["$wt.widgets.MenuItem"].parent.style&2)!=0){
if(this.b$["$wt.widgets.MenuItem"].parent.$handle.className.indexOf("menu-bar-selected")!=-1){
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
}
return $_N($wt.widgets.MenuItem$1,i$,v$);
})(this,null));
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MenuItem$2")){
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
}
return $_N($wt.widgets.MenuItem$2,i$,v$);
})(this,null));
this.checkHookType(13);
{
this.handle.onselectstart=function(){
return false;
};
this.handle.oncontextmenu=function(){
return false;
};
if(typeof this.handle.style.MozUserSelect!="undefined"){
this.handle.style.MozUserSelect="none";
}else if(typeof this.handle.style.KhtmlUserSelect!="undefined"){
this.handle.style.KhtmlUserSelect="none";
}
}});
$_V(c$,"hookSelection",
function(){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MenuItem$3")){
$_H();
c$=$_W($wt.widgets,"MenuItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.MenuItem"].isEnabled()){
this.b$["$wt.widgets.MenuItem"].display.timerExec(40,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MenuItem$3$4")){
$_H();
c$=$_W($wt.widgets,"MenuItem$3$4",null,Runnable);
$_V(c$,"run",
function(){
try{
this.b$["$wt.widgets.MenuItem"].parent.btnFocus.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
});
c$=$_P();
}
return $_N($wt.widgets.MenuItem$3$4,i$,v$);
})(this,null));
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
}O$.addCSSClass(this.b$["$wt.widgets.MenuItem"].parent.$handle,"menu-bar-selected");
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
var btn=this.b$["$wt.widgets.MenuItem"].parent.btnFocus;
{
btn.onblur();
}});
c$=$_P();
}
return $_N($wt.widgets.MenuItem$3,i$,v$);
})(this,null));
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
var pt2=O$.calcuateRelativePosition(this.handle,this.parent.$handle);
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
O$.destroyHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.MenuItem,"releaseHandle",[]);
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
O$.addCSSClass(this.parent.$handle,"menu-enable-image");
O$.addCSSClass(this.handle,"menu-item-enable-image");
}else{
var existedImage=false;
for(var i=0;i<this.parent.items.length;i++){
if(this.parent.items[i].image!=null){
existedImage=true;
break;
}}
if(!existedImage){
O$.removeCSSClass(this.parent.$handle,"menu-enable-image");
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
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}}else{
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
this.menu.$handle.style.left="-10000px";
this.menu.$handle.style.top="-10000px";
this.menu.$handle.style.display="block";
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
this.menu.$handle.style.width=rect.width+"px";
this.menu.x=rect.x;
this.menu.y=rect.y;
this.menu.$handle.style.left=rect.x+"px";
this.menu.$handle.style.top=rect.y+"px";
this.menu.$handle.style.zIndex="1"+w$.currentTopZIndex;
this.menu.$handle.style.display="block";
try{
this.menu.btnFocus.focus();
}catch(err){
if($_O(err,Error)){
}else{
throw err;
}
}
});
});
$_L(["$wt.widgets.Widget"],"$wt.widgets.Menu",["java.util.Date","$wt.graphics.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Decorations","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Menu", ".menu-default {\nposition:absolute;\nborder-width:2px;\nborder-style:groove solid solid groove;\nborder-color:white gray gray white;\nbackground-color:menu;\ncursor:default;\npadding:1px 0 1px 1px;\ndisplay:none;\ntext-align:left;\nfont-size:0;\nmargin:0;\n}\n* html .menu-default {\npadding-left:0;\n}\n.menu-item {\nposition:relative;\noverflow:hidden;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nmargin:0 2px 0 1px;\npadding:2px;\nheight:13px;\nheight:1.5em;\n}\n.menu-item-enable-image {\nheight:18px;\n}\n.menu-item-hover {\nbackground-color:highlight;\n}\n.menu-item-hover .menu-item-text {\ncolor:highlighttext;\n}\n.menu-item-disabled .menu-item-text {\ncolor:graytext;\n}\n.menu-item-disabled .menu-item-accel {\ncolor:graytext;\n}\n.menu-item-text span span {\ntext-decoration:underline;\n}\n.menu-item-text {\noverflow:hidden;\nwhite-space:nowrap;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\ncolor:menutext;\n}\n.menu-item-enable-image .menu-item-text {\npadding:1px;\n}\n.menu-item-arrow {\nposition:absolute;\nright:2px;\ntop:2px;\nwidth:16px;\nheight:16px;\nmargin-left:2px;\n}\n.menu-item-arrow-right {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid none solid solid;\nborder-color:menu;\nborder-left-color:black;\nborder-right-width:0;\n}\n.menu-item-disabled .menu-item-arrow-right {\nborder-left-color:gray;\n}\n.menu-item-hover .menu-item-arrow-right {\nborder-color:highlight;\nborder-left-color:highlighttext;\n}\n.menu-item-disabled-hover .menu-item-arrow-right {\nborder-left-color:gray;\n}\n.menu-item-arrow-right {\nposition:relative;\nborder-width:4px;\nborder-right-width:0;\ntop:2px;\nleft:2px;\n}\n.menu-item-enable-image .menu-item-arrow-right {\ntop:4px;\n}\n.menu-item-status {\nfloat:left;\n}\n.menu-item-image {\nfloat:left;\n}\n.menu-item-status {\nwidth:16px;\nheight:14px;\nbackground-repeat:no-repeat;\nbackground-position:center center;\n}\n.menu-item-enable-image .menu-item-status {\nheight:16px;\n}\n.menu-item-selected {\nmargin:5px 5px !important;\nwidth:4px !important;\nheight:4px !important;\nfont-size:0;\nbackground-color:black;\n}\n.menu-item-enable-image .menu-item-selected {\nmargin-top:6px !important;\nmargin-bottom:6px !important;\n}\n* html .menu-item-selected {\nmargin:5px 6px 5px 3px !important;\n}\n* html .menu-item-enable-image .menu-item-selected {\nmargin-top:6px !important;\nmargin-bottom:6px !important;\n}\n.menu-item-hover .menu-item-selected {\nbackground-color:highlighttext;\n}\n.menu-item-disabled .menu-item-selected {\nbackground-color:gray;\n}\n.menu-item-checked {\nbackground-image:url(\'images/menu-packed.gif\');\nbackground-position:left top;\n}\n.menu-item-hover .menu-item-checked {\nbackground-image:url(\'images/menu-packed.gif\');\nbackground-position:center top;\n}\n.menu-item-disabled .menu-item-checked {\nbackground-image:url(\'images/menu-packed.gif\');\nbackground-position:right top;\n}\n.menu-enable-image .menu-item-status {\nwidth:0;\nheight:0;\n}\n.menu-enable-status .menu-item-status {\nwidth:16px;\nheight:16px;\n}\n.menu-enable-image .menu-item-image {\nwidth:16px;\nheight:16px;\nmargin:1px 2px 1px 0;\nbackground-repeat:no-repeat;\nbackground-position:center center;\n}\n.menu-item-accel {\nfloat:right;\nmargin-right:16px;\n}\n* html .menu-item-accel {\nmargin-right:8px;\n}\n.menu-item-enable-image .menu-item-accel span {\npadding:1px;\n}\n.menu-item-seperator {\nborder-style:groove none none none;\nborder-width:2px 0 0 0;\nborder-color:white;\nmargin:3px 2px;\npadding:0;\nheight:0;\n}\n.menu-item-enable-image .menu-item-seperator {\nheight:0;\n}\n.menu-item-up, .menu-item-down {\ndisplay:none;\n}\n.menu-scroll .menu-item-up {\ndisplay:block;\nheight:6px;\n}\n.menu-scroll .menu-item-down {\ndisplay:block;\nheight:6px;\n}\n.menu-item-arrow-up {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:none solid solid solid;\nborder-color:menu;\nborder-bottom-color:black;\nborder-top-width:0;\nborder-width:4px;\nborder-top-width:0;\n}\n.menu-item-arrow-down {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid none solid;\nborder-color:menu;\nborder-top-color:black;\nborder-bottom-width:0;\nborder-width:3px;\nborder-bottom-width:0;\nposition:relative;\ntop:2px;\n}\n.menu-item-hover .menu-item-arrow-up {\nborder-color:highlight;\nborder-bottom-color:highlighttext;\n}\n.menu-item-hover .menu-item-arrow-down {\nborder-color:highlight;\nborder-top-color:highlighttext;\n}\n.menu-focus {\nposition:absolute;\nwidth:1px;\nheight:1px;\noverflow:hidden;\nfont-size:0;\nmargin:0;\npadding:0;\nborder:0 none transparent;\nbackground-color:transparent;\n}\n.opera-hide-context-menu {\nposition:absolute;\nwidth:8px;\nheight:8px;\nfont-size:0;\nborder-style:none;\nz-index:4321;\n}\n.menu-bar {\nposition:absolute;\nbackground-color:menu;\noverflow:visible;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\ncursor:default;\npadding:4px 0;\nz-index:9;\nmargin:1px 2px;\nmin-height:16px;\n}\n.menu-bar-item {\ndisplay:inline;\nmargin:0;\npadding:3px 6px;\nborder:1px solid menu;\nwhite-space:nowrap;\n}\n.menu-bar-item-hover {\nborder:1px outset white;\n}\n.menu-bar-selected .menu-bar-item-hover {\nborder:1px inset white !important;\n}\n.menu-bar-item span span {\ntext-decoration:underline;\n}\n.swt-widgets-menu {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.$handle=null;
this.x=0;
this.y=0;
this.hwndCB=0;
this.id0=0;
this.id1=0;
this.hasLocation=false;
this.cascade=null;
this.parent=null;
this.imageList=null;
this.items=null;
this.defaultItem=null;
this.btnFocus=null;
this.currentIndex=0;
this.lastFocusdTime=0;
this.acceleratorTable=null;
$_Z(this,arguments);
},$wt.widgets,"Menu",$wt.widgets.Widget);
$_K(c$,
function(parent){
this.construct($wt.widgets.Menu.checkNull(parent).menuShell(),8);
},"$wt.widgets.Control");
$_K(c$,
function(parent,style){
this.construct(parent,$wt.widgets.Menu.checkStyle(style),null);
},"$wt.widgets.Decorations,~N");
$_K(c$,
function(parentMenu){
this.construct($wt.widgets.Menu.checkNull(parentMenu).parent,4);
},"$wt.widgets.Menu");
$_K(c$,
function(parentItem){
this.construct($wt.widgets.Menu.checkNull(parentItem).parent);
},"$wt.widgets.MenuItem");
$_K(c$,
function(parent,style,handle){
$_R(this,$wt.widgets.Menu,[parent,$wt.widgets.Menu.checkStyle(style)]);
this.parent=parent;
this.$handle=handle;
this.checkOrientation(parent);
this.createWidget();
},"$wt.widgets.Decorations,~N,$wt.internal.xhtml.Element");
$_M(c$,"_setVisible",
function(visible){
if((this.style&(6))!=0)return;
var style=this.$handle.style;
if(visible){
var clientArea=this.getDisplay().getPrimaryMonitor().getClientArea();
style.zIndex="1"+w$.currentTopZIndex;
style.display="block";
this.$handle.style.height="";
var height=O$.getContainerHeight(this.$handle);
if(O$.isIE||O$.isOpera){
var maxWidth=0;
var hasImage=false;
var hasSelection=false;
var children=this.getItems();
for(var i=0;i<children.length;i++){
var item=children[i];
var width=O$.getStringStyledWidth(item.getText(),"menu-item-text",null);
if(item.getImage()!=null){
hasImage=true;
}if((item.getStyle()&(48))!=0){
hasImage=true;
}maxWidth=Math.max(maxWidth,width);
}
this.$handle.style.width=(maxWidth+(hasImage?18:0)+(hasSelection?18:0)+32+"px");
}else{
this.$handle.style.width="";
var width=O$.getContainerWidth(this.$handle);
this.$handle.style.width=(width+32)+"px";
}this.$handle.style.height=height+"px";
var width=O$.getContainerWidth(this.$handle);
var left=this.x;
var top=this.y;
if(this.y+height>clientArea.y+clientArea.height){
if(this.y+height-clientArea.y-clientArea.height>height-this.y){
top=this.y-height;
}}if(this.x+width>clientArea.x+clientArea.width){
if(this.x+width-clientArea.x-clientArea.width>width-this.x){
left=this.x-width;
}}style.left=left+"px";
style.top=top+"px";
try{
this.btnFocus.focus();
}catch(err){
if($_O(err,Error)){
}else{
throw err;
}
}
if(this.hooks(22))this.sendEvent(22);
}else{
style.display="none";
style.width="";
if(this.hooks(23))this.sendEvent(23);
}},"~B");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addMenuListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(23,typedListener);
this.addListener(22,typedListener);
},"$wt.events.MenuListener");
c$.checkNull=$_M(c$,"checkNull",
function(control){
return control;
},"$wt.widgets.Control");
c$.checkNull=$_M(c$,"checkNull",
function(menu){
return menu;
},"$wt.widgets.Menu");
c$.checkNull=$_M(c$,"checkNull",
function(item){
return item;
},"$wt.widgets.MenuItem");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,2,4,0,0,0);
},"~N");
$_M(c$,"nextMenuItemIndex",
function(dir){
var index=this.currentIndex;
var menuItems=this.items;
var tested=0;
var length=menuItems.length;
if(index==-1){
index=dir<0?length-1:0;
while(tested<length&&(menuItems[index].style&2)!=0){
tested++;
index+=dir;
}
return index;
}else{
index+=dir;
if(index==-1||index==length){
index=dir<0?length-1:0;
}while(tested<length&&(menuItems[index].style&2)!=0){
tested++;
index+=dir;
}
}if(index==length){
index=-1;
}return index;
},"~N");
$_M(c$,"createHandle",
function(){
this.items=new Array(0);
this.currentIndex=-1;
this.lastFocusdTime=-1;
if(this.$handle!=null)return;
this.$handle=d$.createElement("DIV");
if((this.style&2)!=0){
this.$handle.className="menu-bar";
O$.addCSSClass(this.parent.handle,"shell-menu-bar");
var top=3;
if(this.parent.titleBar!=null){
top=3+O$.getContainerHeight(this.parent.titleBar);
}this.$handle.style.top=top+"px";
this.parent.handle.appendChild(this.$handle);
this.parent.shellMenuBar=this.$handle;
}else{
d$.body.appendChild(this.$handle);
this.$handle.className="menu-default";
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.createNarrowShadowHandles(this.$handle);
}}this.btnFocus=d$.createElement("BUTTON");
this.btnFocus.className="menu-focus";
this.$handle.appendChild(this.btnFocus);
this.btnFocus.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Menu$1")){
$_H();
c$=$_W($wt.widgets,"Menu$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
var menuItems=this.b$["$wt.widgets.Menu"].items;
var index=this.b$["$wt.widgets.Menu"].currentIndex;
if(evt.keyCode==13||evt.keyCode==10){
if(index!=-1){
var target=menuItems[index].handle;
if(menuItems[index].isEnabled()&&target.onclick!=null){
target.onclick(evt);
}}}else if(evt.keyCode==38||evt.keyCode==104){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var el=menuItems[index].handle;
{
el.onmouseover();
}}else{
var e=menuItems[index].handle;
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var el=menuItems[index].handle;
{
e.onmouseout();
el.onmouseover();
}}}else if(evt.keyCode==40||evt.keyCode==98){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var el=menuItems[index].handle;
{
el.onmouseover();
}}else{
var e=menuItems[index].handle;
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var el=menuItems[index].handle;
{
e.onmouseout();
el.onmouseover();
}}}else if(evt.keyCode==37||evt.keyCode==100){
if((this.b$["$wt.widgets.Menu"].style&2)!=0){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var el=menuItems[index].handle;
{
el.onmouseover();
}}else{
var e=menuItems[index].handle;
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var el=menuItems[index].handle;
{
e.onmouseout();
el.onmouseover();
}}}}else if(evt.keyCode==39||evt.keyCode==102){
if((this.b$["$wt.widgets.Menu"].style&2)!=0){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var el=menuItems[index].handle;
{
el.onmouseover();
}}else{
var e=menuItems[index].handle;
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var el=menuItems[index].handle;
{
e.onmouseout();
el.onmouseover();
}}}}else{
for(var i=0;i<menuItems.length;i++){
if(menuItems[i]!=null&&menuItems[i].mnemonicChar==evt.keyCode){
var e=menuItems[i].handle;
{
e.onclick();
}break;
}}
}this.b$["$wt.widgets.Menu"].currentIndex=index;
});
c$=$_P();
}
return $_N($wt.widgets.Menu$1,i$,v$);
})(this,null));
this.btnFocus.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Menu$2")){
$_H();
c$=$_W($wt.widgets,"Menu$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var time=new java.util.Date().getTime();
if(time-this.b$["$wt.widgets.Menu"].lastFocusdTime>20){
if((this.b$["$wt.widgets.Menu"].style&2)==0){
this.b$["$wt.widgets.Menu"].$handle.style.display="none";
this.b$["$wt.widgets.Menu"].sendEvent(23);
}else{
}}});
c$=$_P();
}
return $_N($wt.widgets.Menu$2,i$,v$);
})(this,null));
this.btnFocus.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Menu$3")){
$_H();
c$=$_W($wt.widgets,"Menu$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Menu"].lastFocusdTime=new java.util.Date().getTime();
});
c$=$_P();
}
return $_N($wt.widgets.Menu$3,i$,v$);
})(this,null));
this.$handle.onmousedown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Menu$4")){
$_H();
c$=$_W($wt.widgets,"Menu$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Menu"].lastFocusdTime=new java.util.Date().getTime();
});
c$=$_P();
}
return $_N($wt.widgets.Menu$4,i$,v$);
})(this,null));
if((this.style&2)!=0){
}else{
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
return;
}}
this.items[this.items.length]=item;
this.display.addMenuItem(item);
item.handle=d$.createElement("DIV");
item.handle.className=((this.style&2)!=0)?"menu-bar-item":"menu-item";
this.$handle.appendChild(item.handle);
if((item.style&2)==0){
if((item.style&(48))!=0){
O$.addCSSClass(this.$handle,"menu-enable-status");
}if((this.style&2)==0){
var el=d$.createElement("DIV");
el.className="menu-item-status";
item.handle.appendChild(el);
item.statusEl=el;
el=d$.createElement("DIV");
el.className="menu-item-image";
item.handle.appendChild(el);
item.imageEl=el;
el=d$.createElement("DIV");
el.className="menu-item-text";
item.handle.appendChild(el);
item.textEl=el;
el=d$.createElement("DIV");
el.className="menu-item-arrow";
item.handle.appendChild(el);
item.arrowEl=el;
if((item.style&64)!=0){
el=d$.createElement("DIV");
el.className="menu-item-arrow-right";
item.arrowEl.appendChild(el);
}}}else{
item.handle.className+=" menu-item-seperator";
}this.redraw();
},"$wt.widgets.MenuItem,~N");
$_M(c$,"createWidget",
function(){
this.createHandle();
this.parent.addMenu(this);
});
$_M(c$,"destroyAccelerators",
function(){
this.parent.destroyAccelerators();
});
$_M(c$,"registerAccelerator",
function(accelerator,item){
if(this.acceleratorTable==null){
this.acceleratorTable=new Array(0);
}var size=this.acceleratorTable.length;
this.acceleratorTable[size]=new Integer(accelerator);
this.acceleratorTable[size+1]=item;
},"~N,$wt.widgets.MenuItem");
$_M(c$,"isAccelerated",
function(keyEvent){
var size=this.acceleratorTable.length;
for(var i=0;i<size;i+=2){
var acclCode=(this.acceleratorTable[i]).intValue();
if((((acclCode&262144)!=0&&keyEvent.ctrlKey)||((acclCode&262144)==0))&&(((acclCode&65536)!=0&&keyEvent.altKey)||((acclCode&65536)==0))&&((acclCode&131072)!=0&&keyEvent.shiftKey)||((acclCode&131072)==0)){
acclCode&=-458753;
if(acclCode==keyEvent.keyCode){
var item=this.acceleratorTable[i+1];
{
item.handle.onclick();
}}}}
return false;
},"$wt.internal.xhtml.HTMLEvent");
$_M(c$,"destroyItem",
function(item){
try{
this.$handle.removeChild(item.handle);
}catch(e){
if($_O(e,Throwable)){
}else{
throw e;
}
}
this.redraw();
},"$wt.widgets.MenuItem");
$_V(c$,"destroyWidget",
function(){
this.releaseHandle();
if(this.$handle!=null){
O$.destroyHandle(this.$handle);
this.$handle=null;
}});
$_M(c$,"fixMenus",
function(newParent){
var items=this.getItems();
for(var i=0;i<items.length;i++){
items[i].fixMenus(newParent);
}
this.parent.removeMenu(this);
newParent.addMenu(this);
this.parent=newParent;
},"$wt.widgets.Decorations");
$_M(c$,"getBounds",
function(){
if((this.style&2)!=0){
if(this.parent.menuBar!==this){
return new $wt.graphics.Rectangle(0,0,0,0);
}}else{
var count=this.items.length;
if(count!=0){
var x;
var y;
var w;
var h;
var hdl1=this.items[0].handle;
var pt1=O$.calcuateRelativePosition(hdl1,d$.body);
x=pt1.x;
y=pt1.y;
var textWidth=0;
var accelWidth=0;
for(var i=0;i<count;i++){
var text=this.items[i].text;
if(text==null){
continue;}var idx=text.indexOf('\t');
var normalText=text;
var accelText=null;
if(idx!=-1){
normalText=text.substring(0,idx);
accelText=text.substring(idx+1);
}if(accelText!=null&&accelText.length!=0){
var width=O$.getStringStyledWidth(accelText,"menu-item-text",null);
if(width>accelWidth){
accelWidth=width;
}}var width=O$.getStringStyledWidth(normalText,"menu-item-text",null);
if(width>textWidth){
textWidth=width;
}}
w=16+textWidth+16+accelWidth+16+8;
if(this.$handle.className.indexOf("menu-enable-status")!=-1&&this.$handle.className.indexOf("menu-enable-image")!=-1){
w+=16;
}if(count==1){
h=O$.getContainerHeight(hdl1);
}else{
var hdl2=this.items[count-1].handle;
var pt2=O$.calcuateRelativePosition(hdl2,d$.body);
h=pt2.y-pt1.y+O$.getContainerHeight(hdl2);
}return new $wt.graphics.Rectangle(x-2,y-2,w+4,h+4);
}}return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getDefaultItem",
function(){
return this.defaultItem;
});
$_M(c$,"getEnabled",
function(){
return(this.state&8)==0;
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
var count=this.items.length;
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_V(c$,"getNameText",
function(){
var result="";
var items=this.getItems();
var length=items.length;
if(length>0){
for(var i=0;i<length-1;i++){
result=result+items[i].getNameText()+", ";
}
result=result+items[length-1].getNameText();
}return result;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.cascade;
});
$_M(c$,"getParentMenu",
function(){
if(this.cascade!=null)return this.cascade.parent;
return null;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getVisible",
function(){
if((this.style&2)!=0){
return this===this.parent.menuShell().menuBar;
}if((this.style&8)!=0){
var popups=this.display.popups;
if(popups==null)return false;
for(var i=0;i<popups.length;i++){
if(popups[i]===this)return true;
}
}var shell=this.getShell();
var menu=shell.activeMenu;
while(menu!=null&&menu!==this){
menu=menu.getParentMenu();
}
return this===menu;
});
$_M(c$,"imageIndex",
function(image){
var index=this.imageList.indexOf(image);
if(index==-1){
index=this.imageList.add(image);
}else{
this.imageList.put(index,image);
}return index;
},"$wt.graphics.Image");
$_M(c$,"indexOf",
function(item){
if(item.parent!==this)return-1;
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
return i;
}}
return-1;
},"$wt.widgets.MenuItem");
$_M(c$,"isEnabled",
function(){
var parentMenu=this.getParentMenu();
if(parentMenu==null)return this.getEnabled();
return this.getEnabled()&&parentMenu.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"redraw",
function(){
if(!this.isVisible())return;
if((this.style&2)!=0){
this.display.addBar(this);
}else{
this.update();
}});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Menu,"releaseChild",[]);
if(this.cascade!=null)this.cascade.releaseMenu();
if((this.style&2)!=0){
this.display.removeBar(this);
if(this===this.parent.menuBar){
this.parent.setMenuBar(null);
}}else{
if((this.style&8)!=0){
this.display.removePopup(this);
}}});
$_M(c$,"releaseHandle",
function(){
if(this.$handle!=null){
O$.destroyHandle(this.$handle);
this.$handle=null;
}$_U(this,$wt.widgets.Menu,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(!item.isDisposed()){
item.releaseResources();
}this.items[i]=null;
}
this.items=new Array(0);
$_U(this,$wt.widgets.Menu,"releaseWidget",[]);
if(this.parent!=null)this.parent.removeMenu(this);
this.parent=null;
this.cascade=null;
});
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeMenuListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(23,listener);
this.eventTable.unhook(22,listener);
},"$wt.events.MenuListener");
$_M(c$,"setDefaultItem",
function(item){
this.defaultItem=item;
this.redraw();
},"$wt.widgets.MenuItem");
$_M(c$,"setEnabled",
function(enabled){
this.state&=-9;
if(!enabled)this.state|=8;
},"~B");
$_M(c$,"setLocation",
function(x,y){
if((this.style&(6))!=0)return;
this.x=x;
this.y=y;
this.hasLocation=true;
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(visible){
if((this.style&(6))!=0)return;
if(visible){
this.display.addPopup(this);
}else{
this.display.removePopup(this);
this._setVisible(false);
}},"~B");
$_M(c$,"update",
function(){
var hasCheck=false;
var hasImage=false;
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(item.image!=null){
if((hasImage=true)&&hasCheck)break;
}if((item.style&(48))!=0){
if((hasCheck=true)&&hasImage)break;
}}
});
$_S(c$,
"ID_PPC",100,
"ID_SPMM",102,
"ID_SPBM",103,
"ID_SPMB",104,
"ID_SPBB",105,
"ID_SPSOFTKEY0",106,
"ID_SPSOFTKEY1",107,
"GROWTH_RATE",5);
});
