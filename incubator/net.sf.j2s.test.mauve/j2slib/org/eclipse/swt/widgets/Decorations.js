$_L(["$wt.widgets.Canvas","$wt.internal.browser.OS"],"$wt.widgets.Decorations",["$wt.graphics.Point","$.Rectangle","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.dnd.DragAndDrop","$.HTMLEventWrapper","$.ShellFrameDND","$wt.widgets.Dialog","$.Display","$.Event"],function(){
c$=$_C(function(){
this.image=null;
this.smallImage=null;
this.largeImage=null;
this.images=null;
this.menuBar=null;
this.menus=null;
this.savedFocus=null;
this.defaultButton=null;
this.saveDefault=null;
this.moved=false;
this.resized=false;
this.opened=false;
this.maximized=false;
this.minimized=false;
this.contentHandle=null;
this.shellTitle=null;
this.shellIcon=null;
this.modalHandle=null;
this.oldBounds=null;
this.lastClientAreaCSSText=null;
this.lastBodyCSSText=null;
this.lastBodyScrollLeft=0;
this.lastBodyScrollTop=0;
this.shellMin=null;
this.shellMax=null;
this.shellClose=null;
this.titleBar=null;
this.shellMenuBar=null;
this.shellToolBar=null;
this.shellFrameDND=null;
this.hContentKeyDown=null;
this.hIconClick=null;
this.hMinClick=null;
this.hMaxClick=null;
this.hCloseClick=null;
this.hTitleBarClick=null;
this.hNoTextSelection=null;
this.dnd=null;
$_Z(this,arguments);
},$wt.widgets,"Decorations",$wt.widgets.Canvas);
$_M(c$,"addMenu",
function(menu){
if(this.menus==null)this.menus=new Array(4);
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]==null){
this.menus[i]=menu;
return;
}}
var newMenus=new Array(this.menus.length+4);
newMenus[this.menus.length]=menu;
System.arraycopy(this.menus,0,newMenus,0,this.menus.length);
this.menus=newMenus;
},"$wt.widgets.Menu");
$_M(c$,"bringToTop",
function(){
this.bringToTop(true,true);
});
$_M(c$,"bringToTop",
function(parentShell,childShells){
($t$=$wt.widgets.Display.topMaxShell=null,$wt.widgets.Display.prototype.topMaxShell=$wt.widgets.Display.topMaxShell,$t$);
($t$=$wt.widgets.Display.topMaxShellNeedUpdated=true,$wt.widgets.Display.prototype.topMaxShellNeedUpdated=$wt.widgets.Display.topMaxShellNeedUpdated,$t$);
if(parentShell&&childShells){
$wt.widgets.Display.deactivateAllTitleBarShells();
}if(parentShell&&this.parent!=null&&$_O(this.parent,$wt.widgets.Decorations)){
(this.parent).bringToTop(true,false);
}if(this.titleBar!=null){
this.titleBar.style.backgroundColor="activecaption";
this.shellTitle.style.color="captiontext";
}var style=this.handle.style;
if(style.zIndex!=w$.currentTopZIndex){
style.zIndex=w$.currentTopZIndex=w$.currentTopZIndex+2;
}if((style.width==null||style.width.length==0)&&(style.height==null||style.height.length==0)){
this.setSize(this.width,this.height);
}this.setLocation(this.left,this.top);
if((this.style&4)==0){
var title=this.getText();
if(title!=null){

if(window["document.title"]==null){
window["document.title"]=document.title;
}
if(window["document.title.setter"]==null){
document.title=title;
}else{

window["document.title.setter"](title);
}
}
}var count=this.children.length;
for(var i=0;i<count;i++){
var control=this.children[i];
if(control!=null&&control!==this&&control.handle!=null&&($_O(control,$wt.widgets.Shell))){
style=control.handle.style;
if(style!=null&&style.zIndex!=w$.currentTopZIndex){
style.zIndex=w$.currentTopZIndex=w$.currentTopZIndex+2;
}}}
if(childShells&&$_O(this,$wt.widgets.Shell)){
var sh=this;
var children=sh.getShells();
for(var i=0;i<children.length;i++){
var s=children[i];
if((s.style&(229376))!=0&&s.isVisible()&&!s.isDisposed()){
s.bringToTop(false,true);
}}
$wt.widgets.Dialog.checkExistedDialogs(this);
}if(this.modalHandle!=null){
this.modalHandle.style.zIndex=this.handle.style.zIndex-1;
}},"~B,~B");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8)!=0){
style&=-3313;
}if((style&(1216))!=0){
style|=32;
}if((style&(1152))!=0)style|=64;
if((style&64)!=0)style|=32;
return style;
},"~N");
$_V(c$,"checkBorder",
function(){
});
$_V(c$,"checkOpened",
function(){
if(!this.opened)this.resized=false;
});
$_M(c$,"closeWidget",
function(){
var event=new $wt.widgets.Event();
event.doit=true;
this.sendEvent(21,event);
if(event.doit&&!this.isDisposed())this.dispose();
});
$_V(c$,"computeTabGroup",
function(){
return this;
});
$_V(c$,"computeTabRoot",
function(){
return this;
});
$_V(c$,"containerHandle",
function(){
return this.contentHandle;
});
$_V(c$,"computeTrim",
function(x,y,width,height){
if((this.style&8)==0){
if((this.style&(1248))!=0){
height+=Math.max(O$.getContainerHeight(this.titleBar),19);
if(width<105){
width=105;
}}if((this.style&(3296))!=0){
width+=8;
height+=5;
x-=4;
y-=3;
if(O$.isIE50||O$.isIE55||O$.isIE60){
y-=2;
}}else{
width+=6;
height+=6;
x-=3;
y-=3;
}if((this.style&2048)!=0){
width+=4;
height+=2;
x+=1;
}}return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createAccelerators",
function(){
});
$_M(c$,"createIcon",
function(image){
return null;
},"$wt.graphics.Image");
c$.createCSSDiv=$_M(c$,"createCSSDiv",
($fz=function(handle,css){
var el=d$.createElement("DIV");
el.className=css;
handle.appendChild(el);
return el;
},$fz.isPrivate=true,$fz),"Element,~S");
c$.createResizeHandles=$_M(c$,"createResizeHandles",
function(handle){
var handles=["shell-left-top","shell-right-top","shell-center-top","shell-left-middle","shell-right-middle","shell-center-middle","shell-left-bottom","shell-right-bottom","shell-center-bottom"];
for(var i=0;i<handles.length;i++){
$wt.widgets.Decorations.createCSSDiv(handle,handles[i]);
}
},"Element");
c$.appendShadowHandles=$_M(c$,"appendShadowHandles",
function(handle,top,right,bottom,left){
var handles=[left&&top?"shadow-left-top":null,right&&top?"shadow-right-top":null,top?"shadow-center-top":null,left?"shadow-left-middle":null,right?"shadow-right-middle":null,"shadow-center-middle",left&&bottom?"shadow-left-bottom":null,right&&bottom?"shadow-right-bottom":null,bottom?"shadow-center-bottom":null];
for(var i=0;i<handles.length;i++){
if(handles[i]!=null){
$wt.widgets.Decorations.createCSSDiv(handle,handles[i]);
}}
if(O$.isChrome10){
handle.style.opacity="1";
}if(O$.isIE){
handle.style.filter="";
}},"Element,~B,~B,~B,~B");
c$.createShadowHandles=$_M(c$,"createShadowHandles",
function(handle){
$wt.widgets.Decorations.appendShadowHandles(handle,true,true,true,true);
},"Element");
c$.createNarrowShadowHandles=$_M(c$,"createNarrowShadowHandles",
function(handle){
var handles=["shadow-narrow-left-top","shadow-narrow-right-top","shadow-narrow-center-top","shadow-narrow-left-middle","shadow-narrow-right-middle","shadow-narrow-center-middle","shadow-narrow-left-bottom","shadow-narrow-right-bottom","shadow-narrow-center-bottom"];
for(var i=0;i<handles.length;i++){
$wt.widgets.Decorations.createCSSDiv(handle,handles[i]);
}
if(O$.isChrome10){
handle.style.opacity="1";
}if(O$.isIE){
handle.style.filter="";
}},"Element");
$_V(c$,"createHandle",
function(){
if((this.style&65536)!=0||(this.style&32768)!=0){
this.display.timerExec(10,(($_D("$wt.widgets.Decorations$1")?0:org.eclipse.swt.widgets.Decorations.$Decorations$1$()),$_N($wt.widgets.Decorations$1,this,null)));
}this.handle=d$.createElement("DIV");
this.handle.className="shell-default shell-trim";
this.handle.style.lineHeight="16px";
this.handle.style.visibility="hidden";
if(w$.defaultWindowWidth==null){
w$.defaultWindowWidth="768";
}if(w$.defaultWindowHeight==null){
w$.defaultWindowHeight="558";
}this.width=Integer.parseInt(w$.defaultWindowWidth);
this.height=Integer.parseInt(w$.defaultWindowHeight);
this.width=768;
this.height=558;
this.getMonitor().handle.appendChild(this.handle);
if((this.style&8)==0&&(this.style&16)!=0){
$wt.widgets.Decorations.createResizeHandles(this.handle);
}var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.createShadowHandles(this.handle);
}if((this.style&8)==0&&(this.style&(1248))!=0){
this.setSystemMenu();
}var contentCSS="shell-content";
if((this.style&4)!=0){
contentCSS+=" shell-tool";
}this.contentHandle=$wt.widgets.Decorations.createCSSDiv(this.handle,contentCSS);
if($wt.internal.dnd.DragAndDrop!=null){
this.dnd=new $wt.internal.dnd.DragAndDrop();
this.shellFrameDND=(($_D("$wt.widgets.Decorations$2")?0:org.eclipse.swt.widgets.Decorations.$Decorations$2$()),$_N($wt.widgets.Decorations$2,this,null));
this.dnd.addDragListener(this.shellFrameDND);
this.dnd.bind(this.handle);
}this.hContentKeyDown=$_Q((($_D("$wt.widgets.Decorations$3")?0:org.eclipse.swt.widgets.Decorations.$Decorations$3$()),$_N($wt.widgets.Decorations$3,this,null)));
Clazz.addEvent(this.contentHandle,"keydown",this.hContentKeyDown);
});
$_M(c$,"nextWindowLocation",
function(wHint,hHint){
if(this.locationSet){
return;
}var delta=O$.getStringPlainHeight("A")+4+6+1;
if(w$.defaultWindowLeft==null){
w$.defaultWindowLeft="160";
}else{
var num=Integer.parseInt(""+w$.defaultWindowLeft);
num+=delta;
if(num+wHint>this.getMonitor().clientWidth){
num=delta;
}w$.defaultWindowLeft=""+num;
}if(w$.defaultWindowTop==null){
w$.defaultWindowTop="48";
}else{
var num=Integer.parseInt(""+w$.defaultWindowTop);
num+=delta;
if(num+hHint>this.getMonitor().clientHeight){
num=delta;
}w$.defaultWindowTop=""+num;
}this.left=Integer.parseInt(w$.defaultWindowLeft);
this.top=Integer.parseInt(w$.defaultWindowTop);
this.left+=O$.getFixedBodyOffsetLeft();
this.top+=O$.getFixedBodyOffsetTop();
},"~N,~N");
$_M(c$,"addModalLayer",
function(){
this.modalHandle=d$.createElement("DIV");
this.modalHandle.className="shell-modal-block";
this.modalHandle.style.zIndex=this.handle.style.zIndex-1;
this.getMonitor().handle.insertBefore(this.modalHandle,this.handle);
});
$_M(c$,"exportHTMLSource",
function(onlyContent){
ClazzLoader.loadClass("org.eclipse.swt.widgets.HTMLSource",(function(o){return function(){
new $wt.widgets.HTMLSource().exportSource(o,onlyContent);
};})(this));
},"~B");
$_M(c$,"openAboutJava2Script",
function(){
ClazzLoader.loadClass("org.eclipse.swt.widgets.About",(function(o){return function(){
$wt.widgets.About.openAbout(o);
};})(this));
});
$_M(c$,"destroyAccelerators",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
if(!($_O(this,$wt.widgets.Shell))){
this.setVisible(false);
if(!this.traverseDecorations(false)){
var shell=this.getShell();
shell.setFocus();
}}if(this.shellFrameDND!=null){
this.shellFrameDND.dispose();
this.shellFrameDND=null;
}if((this.style&4)==0){
if(window["document.title"]!=null){
document.title=window["document.title"];
}
}if((this.getStyle()&4)==0&&this.display.taskBar!=null){
this.display.taskBar.removeShellItem(this);
}$_U(this,$wt.widgets.Decorations,"dispose",[]);
});
$_M(c$,"findMenu",
function(hMenu){
if(this.menus==null)return null;
for(var i=0;i<this.menus.length;i++){
var menu=this.menus[i];
if(menu!=null&&hMenu===menu.handle)return menu;
}
return null;
},"Element");
$_M(c$,"fixDecorations",
function(newDecorations,control,menus){
if(this===newDecorations)return;
if(control===this.savedFocus)this.savedFocus=null;
if(control===this.defaultButton)this.defaultButton=null;
if(control===this.saveDefault)this.saveDefault=null;
if(menus==null)return;
var menu=control.menu;
if(menu!=null){
var index=0;
while(index<menus.length){
if(menus[index]===menu){
control.setMenu(null);
return;
}index++;
}
menu.fixMenus(newDecorations);
this.destroyAccelerators();
newDecorations.destroyAccelerators();
}},"$wt.widgets.Decorations,$wt.widgets.Control,~A");
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Decorations,"getBounds",[]);
});
$_M(c$,"minable",
($fz=function(){
return(this.style&128)!=0&&((this.style&2048)==0||(this.style&16)!=0);
},$fz.isPrivate=true,$fz));
$_V(c$,"getBorderWidth",
function(){
return(this.style&8)!=0?1:0;
});
$_V(c$,"getClientArea",
function(){
var w=this.width;
var h=this.height;
if((this.style&(1248))!=0){
h-=Math.max(O$.getContainerHeight(this.titleBar),19)+2;
w-=8;
h-=5;
if((this.style&2048)!=0){
w-=4;
h-=4;
}if(O$.existedCSSClass(this.handle,"shell-menu-bar")){
h-=1+O$.getContainerHeight(this.shellMenuBar);
}}else if((this.style&4)!=0){
h-=2;
w-=2;
}else{
h-=6;
w-=6;
}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"getDefaultButton",
function(){
return this.defaultButton;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getImages",
function(){
if(this.images==null)return new Array(0);
var result=new Array(this.images.length);
System.arraycopy(this.images,0,result,0,this.images.length);
return result;
});
$_V(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.left,this.top);
});
$_M(c$,"getMaximized",
function(){
return this.oldBounds!=null;
});
$_M(c$,"getMenuBar",
function(){
return this.menuBar;
});
$_M(c$,"getMinimized",
function(){
if(this.parent==null){
return this.handle.style.display==="none";
}return this.minimized;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSize",
function(){
return $_U(this,$wt.widgets.Decorations,"getSize",[]);
});
$_M(c$,"getText",
function(){
if(this.shellTitle==null){
return"";
}var children=this.shellTitle.childNodes;
if(children.length<=0){
return"";
}var text=children[0].nodeValue;
return text==null?"":text;
});
$_V(c$,"isReparentable",
function(){
return false;
});
$_V(c$,"isTabGroup",
function(){
return true;
});
$_V(c$,"isTabItem",
function(){
return false;
});
$_V(c$,"menuShell",
function(){
return this;
});
$_M(c$,"releaseHandle",
function(){
if(this.dnd!=null){
this.dnd.unbind();
this.dnd=null;
}if(this.shellMin!=null){
if(this.hMinClick!=null){
Clazz.removeEvent(this.shellMin,"click",this.hMinClick);
this.hMinClick=null;
}O$.destroyHandle(this.shellMin);
this.shellMin=null;
}if(this.shellMax!=null){
if(this.hMaxClick!=null){
Clazz.removeEvent(this.shellMax,"click",this.hMaxClick);
}O$.destroyHandle(this.shellMax);
this.shellMax=null;
}if(this.shellClose!=null){
if(this.hCloseClick!=null){
Clazz.removeEvent(this.shellClose,"click",this.hCloseClick);
this.hCloseClick=null;
}O$.destroyHandle(this.shellClose);
this.shellClose=null;
}if(this.shellIcon!=null){
if(this.hIconClick!=null){
Clazz.removeEvent(this.shellIcon,"click",this.hIconClick);
this.hIconClick=null;
}O$.destroyHandle(this.shellIcon);
this.shellIcon=null;
}if(this.shellTitle!=null){
O$.destroyHandle(this.shellTitle);
this.shellTitle=null;
}if(this.titleBar!=null){
if((this.style&1024)!=0&&this.hMaxClick!=null){
Clazz.removeEvent(this.titleBar,"click",this.hMaxClick);
}if(this.hTitleBarClick!=null){
Clazz.removeEvent(this.titleBar,"click",this.hTitleBarClick);
this.hTitleBarClick=null;
}if(this.hNoTextSelection!=null){
Clazz.removeEvent(this.titleBar,"selectstart",this.hNoTextSelection);
this.hNoTextSelection=null;
}O$.destroyHandle(this.titleBar);
this.titleBar=null;
}if(this.shellMenuBar!=null){
O$.destroyHandle(this.shellMenuBar);
this.shellMenuBar=null;
}if(this.shellToolBar!=null){
O$.destroyHandle(this.shellToolBar);
this.shellToolBar=null;
}if(this.contentHandle!=null){
if(this.hContentKeyDown!=null){
Clazz.removeEvent(this.contentHandle,"keydown",this.hContentKeyDown);
this.hContentKeyDown=null;
}O$.destroyHandle(this.contentHandle);
this.contentHandle=null;
}if(this.modalHandle!=null){
O$.destroyHandle(this.modalHandle);
this.modalHandle=null;
}this.hMaxClick=null;
$_U(this,$wt.widgets.Decorations,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
if(this.menuBar!=null)this.menuBar.releaseResources();
this.menuBar=null;
if(this.menus!=null){
do{
var index=0;
while(index<this.menus.length){
var menu=this.menus[index];
if(menu!=null&&!menu.isDisposed()){
while(menu.getParentMenu()!=null){
menu=menu.getParentMenu();
}
menu.dispose();
break;
}index++;
}
if(index==this.menus.length)break;
}while(true);
}this.menus=null;
$_U(this,$wt.widgets.Decorations,"releaseWidget",[]);
if(this.smallImage!=null)this.smallImage.dispose();
if(this.largeImage!=null)this.largeImage.dispose();
this.smallImage=this.largeImage=this.image=null;
this.images=null;
this.savedFocus=null;
this.defaultButton=this.saveDefault=null;
});
$_M(c$,"removeMenu",
function(menu){
if(this.menus==null)return;
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]===menu){
this.menus[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"restoreFocus",
function(){
if(this.display.ignoreRestoreFocus)return true;
if(this.savedFocus!=null&&this.savedFocus.isDisposed())this.savedFocus=null;
if(this.savedFocus!=null&&this.savedFocus.setSavedFocus())return true;
return false;
});
$_M(c$,"saveFocus",
function(){
});
$_V(c$,"setBackground",
function(color){
if(color!=null)this.contentHandle.style.backgroundColor=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setDefaultButton",
function(button){
this.setDefaultButton(button,true);
},"$wt.widgets.Button");
$_M(c$,"setDefaultButton",
function(button,save){
if(button==null){
if(this.defaultButton===this.saveDefault){
if(save)this.saveDefault=null;
return;
}}else{
if((button.style&8)==0)return;
if(button===this.defaultButton)return;
}if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(false);
}if((this.defaultButton=button)==null)this.defaultButton=this.saveDefault;
if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(true);
}if(save)this.saveDefault=this.defaultButton;
if(this.saveDefault!=null&&this.saveDefault.isDisposed())this.saveDefault=null;
},"$wt.widgets.Button,~B");
$_V(c$,"setForeground",
function(color){
if(color!=null)this.contentHandle.style.color=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setImage",
function(image){
this.image=image;
this.setImages(image,null);
this.image=image;
if(image==null){
this.shellIcon.style.backgroundImage="";
this.shellIcon.style.backgroundPosition="";
if(O$.isIENeedPNGFix&&this.shellIcon.style.filter!=null){
this.shellIcon.style.filter="";
}return;
}if(this.shellIcon!=null&&this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var iconStyle=this.shellIcon.style;
if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&this.contentHandle.style.filter!=null){
iconStyle.backgroundImage="url(\"about:blank\")";
iconStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&iconStyle.filter!=null)iconStyle.filter="";
iconStyle.backgroundRepeat="no-repeat";
if(this.image.packedURL!=null){
iconStyle.backgroundImage="url(\""+this.image.packedURL+"\")";
var y=this.image.packedOffsetY;
if(this.image.packedItemHeight<=20){
y-=Math.floor((20-this.image.packedItemHeight)/2);
}iconStyle.backgroundPosition="-"+this.image.packedOffsetX+"px -"+y+"px";
}else{
iconStyle.backgroundPosition="center center";
iconStyle.backgroundImage="url(\""+this.image.url+"\")";
}}}},"$wt.graphics.Image");
$_M(c$,"setImages",
function(image,images){
},"$wt.graphics.Image,~A");
$_M(c$,"setImages",
function(images){
for(var i=0;i<images.length;i++){
}
this.images=images;
this.setImage(images[0]);
},"~A");
$_M(c$,"setMaximized",
function(maximized){
($t$=$wt.widgets.Display.topMaxShell=null,$wt.widgets.Display.prototype.topMaxShell=$wt.widgets.Display.topMaxShell,$t$);
($t$=$wt.widgets.Display.topMaxShellNeedUpdated=true,$wt.widgets.Display.prototype.topMaxShellNeedUpdated=$wt.widgets.Display.topMaxShellNeedUpdated,$t$);
this.maximized=maximized;
var key="shell-maximized";
var b=d$.body;
var isStrictMode=b.parentNode.clientHeight!=0;
var node=b;
if(((O$.isFirefox&&node.scrollLeft==0&&node.scrollTop==0)||O$.isIE)&&isStrictMode){
node=b.parentNode;
}var monitor=this.getMonitor();
var updateBody=(monitor.handle===d$.body);
if(maximized){
if(updateBody){
this.lastBodyScrollLeft=node.scrollLeft;
this.lastBodyScrollTop=node.scrollTop;
this.lastClientAreaCSSText=node.style.cssText;
this.lastBodyCSSText=b.style.cssText;
node.style.border="0 none transparent";
node.style.overflow="hidden";
b.style.margin="0";
b.style.padding="0";
node.scrollLeft=0;
node.scrollTop=0;
}if(this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
}var height=monitor.clientHeight;
var width=monitor.clientWidth;
if(monitor.handle===d$.body){
width=d$.body.parentNode.clientWidth;
height=O$.getFixedBodyClientHeight();
}var titleHeight=((this.style&32)!=0)?O$.getContainerHeight(this.titleBar):0;
var trim=this.computeTrim(0,-titleHeight,width,height);
this.setBounds(trim.x,trim.y,trim.width,trim.height);
}$wt.internal.ResizeSystem.register(this,1024);
if(this.titleBar!=null){
O$.addCSSClass(this.titleBar,key);
if(this.shellMax!=null){
this.shellMax.title="Restore";
}}w$.currentTopZIndex++;
this.handle.style.zIndex=w$.currentTopZIndex;
if(this.contentHandle!=null){
w$.setTimeout($_Q((($_D("$wt.widgets.Decorations$4")?0:org.eclipse.swt.widgets.Decorations.$Decorations$4$()),$_N($wt.widgets.Decorations$4,this,null))),250);
}}else{
this.setBounds(this.oldBounds);
if(this.titleBar!=null){
O$.removeCSSClass(this.titleBar,key);
if(this.shellMax!=null){
this.shellMax.title="Maximize";
}}this.oldBounds=null;
$wt.internal.ResizeSystem.unregister(this,1024);
if(updateBody){
node.style.cssText=this.lastClientAreaCSSText;
b.style.cssText=this.lastBodyCSSText;
if(O$.isOpera){
var ofl=node.style.overflow;
if(ofl==null||ofl.length==0){
node.style.overflow="auto";
}ofl=node.style.overflow;
if(ofl==null||ofl.length==0){
b.style.overflow="auto";
}}node.scrollLeft=this.lastBodyScrollLeft;
node.scrollTop=this.lastBodyScrollTop;
}}},"~B");
$_M(c$,"setMenuBar",
function(menu){
if(this.menuBar===menu)return;
if(menu!=null){
}if(this.menuBar===menu)return;
if(menu!=null){
}if(menu!=null)this.display.removeBar(menu);
this.menuBar=menu;
},"$wt.widgets.Menu");
$_M(c$,"setMinimized",
function(minimized){
($t$=$wt.widgets.Display.topMaxShell=null,$wt.widgets.Display.prototype.topMaxShell=$wt.widgets.Display.topMaxShell,$t$);
($t$=$wt.widgets.Display.topMaxShellNeedUpdated=true,$wt.widgets.Display.prototype.topMaxShellNeedUpdated=$wt.widgets.Display.topMaxShellNeedUpdated,$t$);
if(!minimized){
if(this.maximized){
this.minimized=minimized;
if(this.display.taskBar!=null){
this.handle.style.display=minimized?"none":"";
}return;
}}if(this.display.taskBar!=null){
this.handle.style.display=minimized?"none":"";
if(this.minimized!=minimized){
this.display.taskBar.handleApproaching();
this.display.taskBar.setMinimized(false);
this.display.taskBar.updateLastModified();
this.display.taskBar.updateLayout();
}if(!minimized){
this.bringToTop();
}else{
var topShell=$wt.widgets.Display.getTopShell();
if(topShell!=null){
topShell.bringToTop();
topShell.forceFocus();
}else{
if(window["document.title"]!=null){
document.title=window["document.title"];
}
}}this.minimized=minimized;
return;
}this.minimized=minimized;
if(minimized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var width=this.oldBounds.width;
if(width<200){
width=200;
}this.setBounds(-1,this.getMonitor().clientHeight-6-(this.titleBar!=null?O$.getContainerHeight(this.titleBar):0),120,0);
}else if(!minimized){
this.bringToTop();
}if(minimized){
$wt.internal.ResizeSystem.register(this,128);
}else{
$wt.internal.ResizeSystem.unregister(this,128);
}},"~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setSavedFocus",
function(control){
this.savedFocus=control;
},"$wt.widgets.Control");
$_M(c$,"setSystemMenu",
function(){
this.titleBar=d$.createElement("DIV");
this.titleBar.className="shell-title-bar";
this.hNoTextSelection=O$.setTextSelection(this.titleBar,false);
if((this.style&4)==0&&(this.style&(1216))!=0){
this.shellIcon=d$.createElement("DIV");
this.shellIcon.className="shell-title-icon";
this.titleBar.appendChild(this.shellIcon);
this.hIconClick=$_Q((($_D("$wt.widgets.Decorations$5")?0:org.eclipse.swt.widgets.Decorations.$Decorations$5$()),$_N($wt.widgets.Decorations$5,this,null)));
Clazz.addEvent(this.shellIcon,"click",this.hIconClick);
}if(this.minable()){
this.shellMin=d$.createElement("DIV");
this.shellMin.className="shell-title-min";
this.shellMin.title="Minimze";
this.titleBar.appendChild(this.shellMin);
this.hMinClick=$_Q((($_D("$wt.widgets.Decorations$6")?0:org.eclipse.swt.widgets.Decorations.$Decorations$6$()),$_N($wt.widgets.Decorations$6,this,null)));
Clazz.addEvent(this.shellMin,"click",this.hMinClick);
}if((this.style&1024)!=0){
this.shellMax=d$.createElement("DIV");
this.shellMax.className="shell-title-normal-max";
this.shellMax.title="Maximize";
this.titleBar.appendChild(this.shellMax);
this.hMaxClick=$_Q((($_D("$wt.widgets.Decorations$7")?0:org.eclipse.swt.widgets.Decorations.$Decorations$7$()),$_N($wt.widgets.Decorations$7,this,null)));
Clazz.addEvent(this.shellMax,"click",this.hMaxClick);
}if((this.style&64)!=0){
this.shellClose=d$.createElement("DIV");
this.shellClose.className="shell-title-close";
this.shellClose.title="Close";
this.titleBar.appendChild(this.shellClose);
this.hCloseClick=$_Q((($_D("$wt.widgets.Decorations$8")?0:org.eclipse.swt.widgets.Decorations.$Decorations$8$()),$_N($wt.widgets.Decorations$8,this,null)));
Clazz.addEvent(this.shellClose,"click",this.hCloseClick);
}this.shellTitle=d$.createElement("DIV");
this.shellTitle.className="shell-title-text";
{
if(window["ubuntu.css.colors.fixed"]==null
&&navigator.userAgent.indexOf("Ubuntu")!=-1){
this.titleBar.style.backgroundColor="highlight";
this.shellTitle.style.color="highlighttext";
}
}this.titleBar.appendChild(this.shellTitle);
if((this.style&1024)!=0){
Clazz.addEvent(this.titleBar,"dblclick",this.hMaxClick);
}this.handle.appendChild(this.titleBar);
this.hTitleBarClick=$_Q((($_D("$wt.widgets.Decorations$9")?0:org.eclipse.swt.widgets.Decorations.$Decorations$9$()),$_N($wt.widgets.Decorations$9,this,null)));
Clazz.addEvent(this.titleBar,"click",this.hTitleBarClick);
w$.currentTopZIndex+=2;
this.handle.style.zIndex=w$.currentTopZIndex;
});
$_M(c$,"setText",
function(string){
if(this.shellTitle!=null&&this.shellTitle.childNodes!=null){
O$.clearChildren(this.shellTitle);
this.shellTitle.appendChild(d$.createTextNode(string));
if((this.style&4)==0&&$wt.widgets.Display.getTopShell()===this){
var title=this.getText();
if(title!=null){

if(window["document.title"]==null){
window["document.title"]=document.title;
}
if(window["document.title.setter"]==null){
document.title=title;
}else{

window["document.title.setter"](title);
}
}
}if(this.parent==null&&(this.getStyle()&4)==0&&this.display.taskBar!=null){
this.display.taskBar.handleApproaching();
}if(this.display.taskBar!=null){
w$.setTimeout($_Q((($_D("$wt.widgets.Decorations$10")?0:org.eclipse.swt.widgets.Decorations.$Decorations$10$()),$_N($wt.widgets.Decorations$10,this,null))),50);
}}},"~S");
$_V(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if(visible==(this.handle.style.visibility!=="hidden"))return;
}this.handle.style.visibility=visible?"":"hidden";
this.handle.style.display=visible?"":"none";
if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}else{
if(this.isDisposed())return;
this.sendEvent(23);
}},"~B");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&8)==0){
var w=0;
var h=0;
if((this.style&(1248))!=0){
w=113;
h=8+O$.getContainerHeight(this.titleBar);
}if((this.style&2048)!=0){
w+=2;
h+=2;
}if(this.width<w){
this.width=w;
cx=w;
}if(this.height<h){
this.height=h;
cy=h;
}}if(this.titleBar!=null){
var dw=8;
var tbh=O$.getContainerHeight(this.titleBar);
if(tbh==0||tbh==20||tbh>30){
tbh=22;
}if(O$.isIE&&(tbh==19)){
tbh=21;
}var dh=5+tbh+2;
var dww=8;
if((this.style&2048)!=0){
dw+=4;
dh+=4;
dww+=4;
}if(O$.existedCSSClass(this.handle,"shell-menu-bar")){
this.shellMenuBar.style.top=(3+tbh)+"px";
var mbh=O$.getContainerHeight(this.shellMenuBar);
if(mbh<20){
mbh=tbh-2;
}dh+=mbh+1;
tbh+=mbh+1;
}this.contentHandle.style.top=(((this.style&2048)!=0?1:1)+tbh+2)+"px";
this.contentHandle.style.left=(((this.style&2048)!=0?1:1)+2)+"px";
this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=((this.width-dw)>0?this.width-dw:0)+"px";
this.titleBar.style.width=((this.width-dww)>0?this.width-dww:0)+"px";
this.updateShellTitle(this.width-dww+8);
}else{
this.contentHandle.style.top="0px";
this.contentHandle.style.left="0px";
var dw=8;
var dh=8;
if((this.style&8)!=0){
dw=0;
dh=0;
}else if((this.style&4)!=0){
dw=4;
dh=2;
cx-=2;
cy-=2;
}else{
dw=6;
dh=4;
cx-=4;
cy-=4;
}this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=(this.width-dw>0?this.width-dw:0)+"px";
}if((this.style&2048)!=0){
cx-=6;
cy-=4;
}else if((this.style&8)==0){
cx-=2;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"updateShellTitle",
function(width){
var ww=18;
var w=ww;
if(this.shellClose!=null){
this.shellClose.style.left=(width-8-2-w)+"px";
w+=ww;
}if(this.shellMax!=null){
this.shellMax.style.left=(width-8-2-w)+"px";
w+=ww;
}if(this.shellMin!=null){
this.shellMin.style.left=(width-8-2-w)+"px";
w+=ww;
}w-=ww;
if(this.shellIcon!=null){
this.shellIcon.style.left="2px";
this.shellTitle.style.left=(4+ww)+"px";
w+=ww;
}else{
this.shellTitle.style.left="4px";
}this.shellTitle.style.width=(width-8-8-w)+"px";
},"~N");
$_M(c$,"traverseDecorations",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]===this)break;
index++;
}
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&$_O(child,$wt.widgets.Decorations)){
if(child.setFocus())return true;
}}
return false;
},"~B");
$_M(c$,"_updateMonitorSize",
function(){
var monitor=this.getMonitor();
var el=monitor.handle;
if(el===d$.body){
monitor.clientWidth=O$.getFixedBodyClientWidth();
monitor.clientHeight=O$.getFixedBodyClientHeight();
monitor.x=0;
monitor.y=0;
monitor.width=w$.screen.availWidth;
monitor.height=w$.screen.availHeight;
}else{
}});
c$.$Decorations$1$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].addModalLayer();
});
c$=$_P();
};
c$.$Decorations$2$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.deltaWidth=0;
this.deltaHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Decorations$2",$wt.internal.dnd.ShellFrameDND);
$_M(c$,"isDraggable",
function(e){
if($_U(this,$wt.widgets.Decorations$2,"isDraggable",[e])&&!this.b$["$wt.widgets.Decorations"].getMaximized()){
var cssName=e.target.className;
if(cssName.indexOf("shell-title-text")!=-1&&this.b$["$wt.widgets.Decorations"].oldBounds!=null){
return false;
}return true;
}else{
return false;
}},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"initFrameBounds",
function(x,y,width,height){
var bs=this.b$["$wt.widgets.Decorations"].getBounds();
this.deltaWidth=this.sourceWidth-bs.width;
this.deltaHeight=this.sourceHeight-bs.height;
return true;
},"~N,~N,~N,~N");
$_V(c$,"updateShellBounds",
function(x,y,w,h){
var moved=(x!=this.b$["$wt.widgets.Decorations"].left||y!=this.b$["$wt.widgets.Decorations"].top);
w-=this.deltaWidth;
h-=this.deltaHeight;
var resized=(w!=this.b$["$wt.widgets.Decorations"].width||h!=this.b$["$wt.widgets.Decorations"].height);
this.b$["$wt.widgets.Decorations"].setBounds(x,y,w,h);
if(moved){
this.b$["$wt.widgets.Decorations"].sendEvent(10);
}if(resized){
this.b$["$wt.widgets.Decorations"].sendEvent(11);
}this.b$["$wt.widgets.Decorations"].bringToTop();
return true;
},"~N,~N,~N,~N");
c$=$_P();
};
c$.$Decorations$3$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
if(this.b$["$wt.widgets.Decorations"].defaultButton==null){
return;
}if(e.keyCode==13){
if(!this.b$["$wt.widgets.Decorations"].defaultButton.isEnabled()){
this.toReturn(true);
return;
}if((this.b$["$wt.widgets.Decorations"].defaultButton.style&(34))!=0){
if((this.b$["$wt.widgets.Decorations"].defaultButton.style&32)!=0){
if(e.srcElement!==this.b$["$wt.widgets.Decorations"].defaultButton.btnHandle&&e.target!==this.b$["$wt.widgets.Decorations"].defaultButton.btnHandle){
this.b$["$wt.widgets.Decorations"].defaultButton.setSelection(!this.b$["$wt.widgets.Decorations"].defaultButton.getSelection());
}}else{
this.b$["$wt.widgets.Decorations"].defaultButton.setSelection(!this.b$["$wt.widgets.Decorations"].defaultButton.getSelection());
}}else{
if((this.b$["$wt.widgets.Decorations"].defaultButton.style&16)!=0){
if((this.b$["$wt.widgets.Decorations"].defaultButton.parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.Decorations"].defaultButton.setSelection(!this.b$["$wt.widgets.Decorations"].defaultButton.getSelection());
}else{
this.b$["$wt.widgets.Decorations"].defaultButton.selectRadio();
}}}this.b$["$wt.widgets.Decorations"].defaultButton.postEvent(13);
this.toReturn(true);
}});
c$=$_P();
};
c$.$Decorations$4$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$4",null,Runnable);
$_V(c$,"run",
function(){
var lastShell=$wt.widgets.Display.getTopMaximizedShell();
if(lastShell==null||lastShell.titleBar==null)return;
if(this.b$["$wt.widgets.Decorations"].display.topBar!=null){
var topBar=this.b$["$wt.widgets.Decorations"].display.topBar;
topBar.handleApproaching();
topBar.updateLayout();
topBar.updateLastModified();
}});
c$=$_P();
};
c$.$Decorations$5$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
if(e==null||(!e.ctrlKey&&!e.altKey&&!e.shiftKey)){
this.b$["$wt.widgets.Decorations"].openAboutJava2Script();
}else{
this.b$["$wt.widgets.Decorations"].exportHTMLSource(e.shiftKey);
}});
c$=$_P();
};
c$.$Decorations$6$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var shell=this.b$["$wt.widgets.Decorations"];
$wt.internal.ResizeSystem.unregister(shell,128);
this.b$["$wt.widgets.Decorations"].setMinimized(true);
if(this.b$["$wt.widgets.Decorations"].display.topBar!=null){
this.b$["$wt.widgets.Decorations"].display.topBar.returnTopMaximized(shell);
}this.toReturn(false);
new $wt.internal.dnd.HTMLEventWrapper(this.getEvent()).stopPropagation();
});
c$=$_P();
};
c$.$Decorations$7$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var cur=!this.b$["$wt.widgets.Decorations"].getMaximized();
this.b$["$wt.widgets.Decorations"].setMaximized(cur);
var shell=this.b$["$wt.widgets.Decorations"];
if(!cur&&this.b$["$wt.widgets.Decorations"].display.topBar!=null){
this.b$["$wt.widgets.Decorations"].display.topBar.returnTopMaximized(shell);
}this.b$["$wt.widgets.Decorations"].display.timerExec(25,(($_D("$wt.widgets.Decorations$7$1")?0:org.eclipse.swt.widgets.Decorations.$Decorations$7$1$()),$_N($wt.widgets.Decorations$7$1,this,null)));
});
c$=$_P();
};
c$.$Decorations$7$1$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$7$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].layout();
});
c$=$_P();
};
c$.$Decorations$8$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if($_O(this.b$["$wt.widgets.Decorations"],$wt.widgets.Shell)){
var shell=this.b$["$wt.widgets.Decorations"];
if(this.b$["$wt.widgets.Decorations"].display.topBar!=null){
this.b$["$wt.widgets.Decorations"].display.topBar.returnTopMaximized(shell);
}shell.close();
}this.toReturn(false);
});
c$=$_P();
};
c$.$Decorations$9$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.Decorations"].isVisible()){
this.b$["$wt.widgets.Decorations"].bringToTop();
this.b$["$wt.widgets.Decorations"].forceFocus();
}this.toReturn(true);
});
c$=$_P();
};
c$.$Decorations$10$=function(){
$_H();
c$=$_W($wt.widgets,"Decorations$10",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].display.taskBar.updateLayout();
});
c$=$_P();
};
});
