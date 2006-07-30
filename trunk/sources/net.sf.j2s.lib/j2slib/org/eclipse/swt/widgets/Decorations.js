$_L(["$wt.widgets.Canvas"],"$wt.widgets.Decorations",["java.lang.Runnable","$wt.graphics.Image","$.Point","$.Rectangle","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.DragAndDrop","$.ShellFrameDND","$wt.widgets.Event","$.Menu"],function(){
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
this.contentHandle=null;
this.shellTitle=null;
this.modalHandle=null;
this.oldBounds=null;
this.shellMin=null;
this.shellMax=null;
this.shellIcon=null;
this.titleBar=null;
this.shellClose=null;
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
this.handle.style.visibility="visible";
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
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
height+=20;
if(width<105){
width=105;
}}if((this.style&(3296))!=0){
width+=8;
height+=8;
x-=4;
y-=4;
}else{
width+=4;
height+=4;
x-=2;
y-=2;
}}return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createAccelerators",
function(){
});
$_M(c$,"createIcon",
function(image){
return null;
},"$wt.graphics.Image");
$_M(c$,"createCSSDiv",
($fz=function(css){
var el=d$.createElement("DIV");
el.className=css;
this.handle.appendChild(el);
return el;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"createResizeHandles",
($fz=function(){
var handles=["shell-left-top","shell-right-top","shell-center-top","shell-left-middle","shell-right-middle","shell-center-middle","shell-left-bottom","shell-right-bottom","shell-center-bottom"];
for(var i=0;i<handles.length;i++){
this.createCSSDiv(handles[i]);
}
},$fz.isPrivate=true,$fz));
$_V(c$,"createHandle",
function(){
if((this.style&65536)!=0||(this.style&32768)!=0){
this.display.timerExec(10,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$1")){
$_H();
c$=$_W($wt.widgets,"Decorations$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].addModalLayer();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$1,i$,v$);
})(this,null));
}this.handle=d$.createElement("DIV");
this.handle.className="shell-default";
this.nextWindowLocation();
this.width=768;
this.height=557;
if(new Boolean((this.style&8)==0&(this.style&16)!=0).valueOf()){
this.handle.className+=" shell-trim";
}this.getMonitor().handle.appendChild(this.handle);
if((this.style&8)==0&&(this.style&16)!=0){
this.createResizeHandles();
}if((this.style&8)==0&&(this.style&(1248))!=0){
this.setSystemMenu();
}this.contentHandle=this.createCSSDiv("shell-content");
if($wt.internal.dnd.DragAndDrop!=null){
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$2")){
$_H();
c$=$_W($wt.widgets,"Decorations$2",$wt.internal.dnd.ShellFrameDND);
$_M(c$,"isDraggable",
function(e){
if($_U(this,$wt.widgets.Decorations$2,"isDraggable",[e])){
var cssName=e.target.className;
if(cssName.indexOf("shell-title-text")!=-1&&this.b$["$wt.widgets.Decorations"].oldBounds!=null){
return false;
}return true;
}else{
return false;
}},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"updateShellBounds",
function(x,y,width,height){
this.b$["$wt.widgets.Decorations"].setBounds(x,y,width,height);
return true;
},"~N,~N,~N,~N");
c$=$_P();
}
return $_N($wt.widgets.Decorations$2,i$,v$);
})(this,null));
dnd.bind(this.handle);
}});
$_M(c$,"nextWindowLocation",
($fz=function(){
if(w$.defaultWindowLeft==null){
w$.defaultWindowLeft="332";
}else{
var num=Integer.parseInt(""+w$.defaultWindowLeft);
num+=32;
if(num>this.getMonitor().clientWidth){
num=32;
}w$.defaultWindowLeft=""+num;
}if(w$.defaultWindowTop==null){
w$.defaultWindowTop="32";
}else{
var num=Integer.parseInt(""+w$.defaultWindowTop);
num+=32;
if(num>this.getMonitor().clientHeight){
num=32;
}w$.defaultWindowTop=""+num;
}if(w$.defaultWindowWidth==null){
w$.defaultWindowWidth="768";
}if(w$.defaultWindowHeight==null){
w$.defaultWindowHeight="557";
}this.left=Integer.parseInt(w$.defaultWindowLeft);
this.top=Integer.parseInt(w$.defaultWindowTop);
this.width=Integer.parseInt(w$.defaultWindowWidth);
this.height=Integer.parseInt(w$.defaultWindowHeight);
},$fz.isPrivate=true,$fz));
$_M(c$,"addModalLayer",
function(){
this.modalHandle=d$.createElement("DIV");
this.modalHandle.className="shell-modal-block";
this.modalHandle.style.zIndex=""+(Integer.parseInt(""+this.handle.style.zIndex)-1);
this.getMonitor().handle.insertBefore(this.modalHandle,this.handle);
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Decorations,"createWidget",[]);
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
}}$_U(this,$wt.widgets.Decorations,"dispose",[]);
});
$_M(c$,"findMenu",
function(hMenu){
if(this.menus==null)return null;
for(var i=0;i<this.menus.length;i++){
var menu=this.menus[i];
if(menu!=null&&hMenu==menu.$handle)return menu;
}
return null;
},"$wt.internal.xhtml.Element");
$_M(c$,"fixDecorations",
function(newDecorations,control,menus){
if(this==newDecorations)return;
if(control==this.savedFocus)this.savedFocus=null;
if(control==this.defaultButton)this.defaultButton=null;
if(control==this.saveDefault)this.saveDefault=null;
if(menus==null)return;
var menu=control.menu;
if(menu!=null){
var index=0;
while(index<menus.length){
if(menus[index]==menu){
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
h-=20;
w-=8;
h-=8;
if((this.style&2048)!=0){
w-=4;
h-=4;
}}return new $wt.graphics.Rectangle(0,0,w,h);
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
return false;
});
$_M(c$,"getMenuBar",
function(){
return this.menuBar;
});
$_M(c$,"getMinimized",
function(){
return false;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSize",
function(){
var size=$_U(this,$wt.widgets.Decorations,"getSize",[]);
size.y+=26;
return size;
});
$_M(c$,"getText",
function(){
return null;
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
if(this.shellMin!=null){
O$.destroyHandle(this.shellMin);
this.shellMin=null;
}if(this.shellMax!=null){
O$.destroyHandle(this.shellMax);
this.shellMax=null;
}if(this.shellClose!=null){
O$.destroyHandle(this.shellClose);
this.shellClose=null;
}if(this.shellIcon!=null){
O$.destroyHandle(this.shellIcon);
this.shellIcon=null;
}if(this.shellTitle!=null){
O$.destroyHandle(this.shellTitle);
this.shellTitle=null;
}if(this.titleBar!=null){
O$.destroyHandle(this.titleBar);
this.titleBar=null;
}if(this.contentHandle!=null){
O$.destroyHandle(this.contentHandle);
this.contentHandle=null;
}if(this.modalHandle!=null){
O$.destroyHandle(this.modalHandle);
this.modalHandle=null;
}$_U(this,$wt.widgets.Decorations,"releaseHandle",[]);
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
if(this.menus[i]==menu){
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
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Decorations,"setBounds",[x,y,width,height,flags,defer]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setDefaultButton",
function(button){
this.setDefaultButton(button,true);
},"$wt.widgets.Button");
$_M(c$,"setDefaultButton",
function(button,save){
if(button==null){
if(this.defaultButton==this.saveDefault){
if(save)this.saveDefault=null;
return;
}}else{
if((button.style&8)==0)return;
if(button==this.defaultButton)return;
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
if(this.shellIcon!=null&&this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var iconStyle=this.shellIcon.style;
if(image.url.toLowerCase().endsWith(".png")&&this.contentHandle.style.filter!=null){
iconStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
iconStyle.backgroundRepeat="no-repeat";
iconStyle.backgroundPosition="center center";
iconStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
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
if(maximized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=4;
}var height=this.getMonitor().clientHeight-0;
var width=this.getMonitor().clientWidth;
if(width>this.getMonitor().width){
width=this.getMonitor().width;
}var titleHeight=((this.style&32)!=0)?20:0;
this.setBounds(this.computeTrim(0,0,width+4,height-titleHeight+6));
}if(maximized){
$wt.internal.ResizeSystem.register(this,1024);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"toggleMaximize",
function(){
var key="shell-maximized";
if(this.oldBounds!=null){
this.setBounds(this.oldBounds);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.titleBar.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}this.oldBounds=null;
$wt.internal.ResizeSystem.unregister(this);
}else{
this.setMaximized(true);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.titleBar.className+=" "+key;
}}});
$_M(c$,"setMenuBar",
function(menu){
if(this.menuBar==menu)return;
if(menu!=null){
}if(this.menuBar==menu)return;
if(menu!=null){
}if(menu!=null)this.display.removeBar(menu);
this.menuBar=menu;
},"$wt.widgets.Menu");
$_M(c$,"setMinimized",
function(minimized){
if(minimized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var width=this.oldBounds.width;
if(width<200){
width=200;
}this.setBounds(-1,this.getMonitor().clientHeight-26,120,0);
}if(minimized){
$wt.internal.ResizeSystem.register(this,128);
}else{
$wt.internal.ResizeSystem.unregister(this);
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
if((this.style&2048)==0||(this.style&16)!=0){
this.shellIcon=d$.createElement("DIV");
this.shellIcon.className="shell-title-icon";
this.titleBar.appendChild(this.shellIcon);
}if(this.minable()){
this.shellMin=d$.createElement("DIV");
this.shellMin.className="shell-title-min";
this.titleBar.appendChild(this.shellMin);
this.shellMin.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$3")){
$_H();
c$=$_W($wt.widgets,"Decorations$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
$wt.internal.ResizeSystem.unregister(this.b$["$wt.widgets.Decorations"]);
this.b$["$wt.widgets.Decorations"].setMinimized(true);
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$3,i$,v$);
})(this,null));
}if((this.style&1024)!=0){
this.shellMax=d$.createElement("DIV");
this.shellMax.className="shell-title-normal-max";
this.titleBar.appendChild(this.shellMax);
this.shellMax.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$4")){
$_H();
c$=$_W($wt.widgets,"Decorations$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].toggleMaximize();
this.b$["$wt.widgets.Decorations"].display.timerExec(25,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$4$5")){
$_H();
c$=$_W($wt.widgets,"Decorations$4$5",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].layout();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$4$5,i$,v$);
})(this,null));
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$4,i$,v$);
})(this,null));
}if((this.style&64)!=0){
this.shellClose=d$.createElement("DIV");
this.shellClose.className="shell-title-close";
this.titleBar.appendChild(this.shellClose);
this.shellClose.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6")){
$_H();
c$=$_W($wt.widgets,"Decorations$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if($_O(this.b$["$wt.widgets.Decorations"],$wt.widgets.Shell)){
var shell=this.b$["$wt.widgets.Decorations"];
shell.close();
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$6,i$,v$);
})(this,null));
}this.shellTitle=d$.createElement("DIV");
this.shellTitle.className="shell-title-text";
this.titleBar.appendChild(this.shellTitle);
if((this.style&1024)!=0){
this.titleBar.ondblclick=this.shellMax.onclick;
}this.handle.appendChild(this.titleBar);
this.titleBar.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$7")){
$_H();
c$=$_W($wt.widgets,"Decorations$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var fHandleStyle=this.b$["$wt.widgets.Decorations"].handle.style;
if(fHandleStyle.zIndex!=w$.currentTopZIndex){
fHandleStyle.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$7,i$,v$);
})(this,null));
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
$_M(c$,"setText",
function(string){
if(this.shellTitle!=null&&this.shellTitle.childNodes!=null){
for(var i=this.shellTitle.childNodes.length-1;i>=0;i--){
if(this.shellTitle.childNodes[i]!=null){
this.shellTitle.removeChild(this.shellTitle.childNodes[i]);
}}
this.shellTitle.appendChild(d$.createTextNode(string));
}},"~S");
$_V(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if(visible==(this.contentHandle.style.visibility!="hidden"))return;
}if(visible){
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
h=28;
}if((this.style&2048)!=0){
w+=2;
h+=2;
}if(this.width<w){
this.width=w;
cx=w;
}if(this.height<h){
this.height=h;
cy=h;
}}if((this.style&8)!=0){
this.contentHandle.style.height=this.height+"px";
this.contentHandle.style.width=this.width+"px";
}else if(this.titleBar!=null){
var dw=8;
var dh=28;
var dww=8;
if((this.style&2048)!=0){
dw+=2;
dh+=3;
dww+=2;
}this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=((this.width-dw)>0?this.width-dw:0)+"px";
this.titleBar.style.width=((this.width-dww)>0?this.width-dww:0)+"px";
var ww=18;
var w=ww;
if(this.shellClose!=null){
this.shellClose.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMax!=null){
this.shellMax.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMin!=null){
this.shellMin.style.left=(this.width-8-2-w)+"px";
w+=ww;
}w-=ww;
if(this.shellIcon!=null){
this.shellIcon.style.left=2+"px";
this.shellTitle.style.left=(4+ww)+"px";
w+=ww;
}else{
this.shellTitle.style.left=4+"px";
}this.shellTitle.style.width=(this.width-8-8-w)+"px";
}else{
this.width-=4;
this.height-=4;
cx-=4;
cy-=4;
var dw=7;
var dh=7;
this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=(this.width-dw>0?this.width-dw:0)+"px";
this.contentHandle.style.top=2+"px";
this.contentHandle.style.marginRight=1+"px";
}if((this.style&2048)!=0){
cx-=4;
cy-=4;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"traverseDecorations",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]==this)break;
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
});
