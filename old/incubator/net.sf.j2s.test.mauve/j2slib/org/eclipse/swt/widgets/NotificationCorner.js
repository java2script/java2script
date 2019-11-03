$_L(["$wt.widgets.DesktopItem"],"$wt.widgets.NotificationCorner",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Display","$.Tray"],function(){
c$=$_C(function(){
this.tray=null;
this.mouseClick=null;
this.mouseOver=null;
this.mouseDoubleClick=null;
this.hLogoClick=null;
this.minimizedEl=null;
this.alreadyInitialized=false;
this.currentZIndex=0;
$_Z(this,arguments);
},$wt.widgets,"NotificationCorner",$wt.widgets.DesktopItem);
$_K(c$,
function(display){
$_R(this,$wt.widgets.NotificationCorner);
this.display=display;
this.isAutoHide=false;
this.alreadyInitialized=false;
},"$wt.widgets.Display");
$_V(c$,"initialize",
function(){
var existed=false;
var containers=new Array(2);
containers[0]=d$.body;
containers[1]=d$.getElementById("swt-desktop-panel");
for(var k=0;k<containers.length;k++){
var container=containers[k];
if(containers[k]==null){
continue;}var divs=container.childNodes;
for(var i=0;i<divs.length;i++){
if(divs[i].className==="powered"){
O$.destroyHandle(divs[i]);
existed=true;
{
if(window["swt.notification.corner.float"]==null){
window["swt.notification.corner.float"]=true;
}
}break;
}}
if(existed){
break;
}}
if(existed){
($t$=$wt.widgets.NotificationCorner.defaultNotificationCorner=this,$wt.widgets.NotificationCorner.prototype.defaultNotificationCorner=$wt.widgets.NotificationCorner.defaultNotificationCorner,$t$);
}if(this.tray==null){
{
this.tray=new Object();
}this.tray=$wt.widgets.Display.getDefault().getSystemTray();
}if(this.alreadyInitialized){
this.handle.style.display="block";
d$.body.removeChild(this.minimizedEl);
d$.body.removeChild(this.handle);
d$.body.appendChild(this.minimizedEl);
d$.body.appendChild(this.handle);
return;
}this.alreadyInitialized=true;
this.minimizedEl=d$.createElement("DIV");
this.minimizedEl.className="tray-cell tray-minimized";
this.minimizedEl.title="Doubleclick to set notification area always-visible";
this.minimizedEl.style.display="none";
var lineColor=$wt.widgets.Tray.trayLineColor(3);
this.minimizedEl.style.borderColor=lineColor+" transparent transparent transparent";
if(O$.isIENeedPNGFix){
this.minimizedEl.style.borderRightColor="rgb(0,255,0)";
this.minimizedEl.style.filter="Chroma(Color=#00ff00);";
}d$.body.appendChild(this.minimizedEl);
this.handle=d$.createElement("DIV");
this.handle.className="tray-logo-item";
this.handle.title="Powered by Java2Script";
var needFixing=O$.isFirefox;
{
needFixing&=(navigator.userAgent.indexOf("Firefox/2.0")!=-1);
}if(needFixing){
this.handle.style.backgroundColor="white";
}d$.body.appendChild(this.handle);
this.hLogoClick=$_Q((($_D("$wt.widgets.NotificationCorner$1")?0:org.eclipse.swt.widgets.NotificationCorner.$NotificationCorner$1$()),$_N($wt.widgets.NotificationCorner$1,this,null)));
Clazz.addEvent(this.handle,"click",this.hLogoClick);
if(this.mouseOver==null){
this.mouseOver=$_Q((($_D("$wt.widgets.NotificationCorner$2")?0:org.eclipse.swt.widgets.NotificationCorner.$NotificationCorner$2$()),$_N($wt.widgets.NotificationCorner$2,this,null)));
}if(this.mouseClick==null){
this.mouseClick=$_Q((($_D("$wt.widgets.NotificationCorner$3")?0:org.eclipse.swt.widgets.NotificationCorner.$NotificationCorner$3$()),$_N($wt.widgets.NotificationCorner$3,this,null)));
}if(this.mouseDoubleClick==null){
this.mouseDoubleClick=$_Q((($_D("$wt.widgets.NotificationCorner$4")?0:org.eclipse.swt.widgets.NotificationCorner.$NotificationCorner$4$()),$_N($wt.widgets.NotificationCorner$4,this,null)));
}if(this.handle!=null){
Clazz.addEvent(this.handle,"mouseover",this.mouseOver);
}this.updateEvents();
this.bringToTop(w$.currentTopZIndex);
});
c$.openAbout=$_M(c$,"openAbout",
function(){
ClazzLoader.loadClass("org.eclipse.swt.widgets.About",(function(){return function(){
$wt.widgets.About.openAbout(null);
};})());
});
$_M(c$,"updateEvents",
function(){
for(var i=0;i<this.tray.allCells.length;i++){
var cell=this.tray.allCells[i];
if(cell!=null){
this.bindEvents(cell);
}}
this.bindEvents(this.minimizedEl);
});
$_M(c$,"unbindAllEvents",
($fz=function(){
if(this.tray!=null&&this.tray.allCells!=null){
for(var i=0;i<this.tray.allCells.length;i++){
var cell=this.tray.allCells[i];
if(cell!=null){
this.unbindEvents(cell);
}}
}if(this.minimizedEl!=null){
this.unbindEvents(this.minimizedEl);
}},$fz.isPrivate=true,$fz));
$_M(c$,"bindEvents",
function(cell){
if(this.mouseClick!=null){
Clazz.addEvent(cell,"click",this.mouseClick);
}if(this.mouseOver!=null){
Clazz.addEvent(cell,"mouseover",this.mouseOver);
}if(this.mouseDoubleClick!=null){
Clazz.addEvent(cell,"dblclick",this.mouseDoubleClick);
}},"Element");
$_M(c$,"unbindEvents",
function(cell){
if(cell==null){
return;
}Clazz.removeEvent(cell,"click",this.mouseClick);
Clazz.removeEvent(cell,"mouseover",this.mouseOver);
Clazz.removeEvent(cell,"dblclick",this.mouseDoubleClick);
},"Element");
$_M(c$,"handleApproaching",
function(){
if(this.handle==null){
return;
}var zIndex=w$.currentTopZIndex+1;
if(this.handle.style.zIndex!=zIndex){
this.layerZIndex=this.handle.style.zIndex;
if(!this.isAutoHide){
this.setMinimized(false);
}this.bringToTop(zIndex);
}});
$_V(c$,"handleLeaving",
function(){
if(this.handle==null){
return;
}if(this.layerZIndex!=-1){
this.bringToTop(this.layerZIndex);
this.layerZIndex=-1;
}if(this.isAutoHide){
this.setMinimized(true);
}});
$_M(c$,"isApproaching",
function(now,x,y,ctrlKey){
return!ctrlKey&&this.isAround(x,y);
},"~N,~N,~N,~B");
$_M(c$,"isLeaving",
function(now,x,y,ctrlKey){
return!this.isAroundCorner(x,y);
},"~N,~N,~N,~B");
$_M(c$,"isAround",
function(x,y){
var range=32;
if(x+y<range){
return true;
}return false;
},"~N,~N");
$_M(c$,"isAroundCorner",
function(x,y){
var range=32;
var tray=$wt.widgets.Display.getTray();
if(tray!=null){
range=this.getRange()+16;
}if(x+y<range){
return true;
}return false;
},"~N,~N");
$_M(c$,"setZIndex",
function(zIdx){
if(this.currentZIndex==zIdx){
return;
}this.currentZIndex=zIdx;
if(zIdx==-1&&!O$.isIE){
zIdx="";
}if(this.isMinimized()){
this.minimizedEl.style.zIndex=zIdx;
return;
}for(var i=0;i<this.tray.allCells.length;i++){
var cell=this.tray.allCells[i];
if(cell!=null){
cell.style.zIndex=zIdx;
}}
for(var i=0;i<this.tray.allItems.length;i++){
var item=this.tray.allItems[i];
if(item!=null){
item.style.zIndex=zIdx;
}}
if(this.tray.supportShadow&&this.tray.outerShadows!=null){
for(var i=0;i<this.tray.outerShadows.length;i++){
var item=this.tray.outerShadows[i];
if(item!=null){
item.style.zIndex=zIdx;
}}
}if(this.handle!=null){
this.handle.style.zIndex=zIdx;
}if(this.minimizedEl!=null){
this.minimizedEl.style.zIndex=zIdx;
}},"~N");
$_M(c$,"isMinimized",
function(){
return this.minimizedEl.style.display!=="none";
});
$_M(c$,"setMinimized",
function(minimized){
if(minimized==this.isMinimized()){
return false;
}this.minimizedEl.style.display=!minimized?"none":"block";
for(var i=0;i<this.tray.allCells.length;i++){
var cell=this.tray.allCells[i];
if(cell!=null){
cell.style.display=minimized?"none":"block";
}}
for(var i=0;i<this.tray.allFloats.length;i++){
var divFloat=this.tray.allFloats[i];
if(divFloat!=null){
divFloat.style.display=minimized?"none":"block";
}}
for(var i=0;i<this.tray.allItems.length;i++){
var item=this.tray.allItems[i];
if(item!=null){
item.style.display=minimized?"none":"block";
}}
if(this.tray.supportShadow){
for(var i=0;i<this.tray.outerShadows.length;i++){
var cell=this.tray.outerShadows[i];
if(cell!=null){
if(minimized){
cell.style.left=(-i*36-21)+"px";
}else{
cell.style.left=((this.tray.cellLines-i-1)*36-1)+"px";
}}}
}this.handle.style.display=minimized?"none":"block";
return true;
},"~B");
$_M(c$,"getRange",
function(){
return this.tray.cellLines*36;
});
$_V(c$,"bringToTop",
function(zIdx){
if(this.tray==null){
return;
}var zIndex=-1;
if(zIdx==-1){
w$.currentTopZIndex++;
zIndex=w$.currentTopZIndex;
if($wt.widgets.Display.getTopMaximizedShell()==null){
this.layerZIndex=zIndex;
}}else{
zIndex=zIdx;
}this.setZIndex(zIndex);
},"~N");
$_V(c$,"updateLayout",
function(){
});
$_V(c$,"releaseWidget",
function(){
this.tray=null;
if($wt.widgets.NotificationCorner.defaultNotificationCorner!=null){
return;
}this.unbindAllEvents();
if(this.minimizedEl!=null){
O$.destroyHandle(this.minimizedEl);
this.minimizedEl=null;
}if(this.handle!=null){
if(this.hLogoClick!=null){
Clazz.removeEvent(this.handle,"click",this.hLogoClick);
this.hLogoClick=null;
}Clazz.removeEvent(this.handle,"mouseover",this.mouseOver);
O$.destroyHandle(this.handle);
this.handle=null;
}this.mouseOver=null;
this.mouseClick=null;
this.mouseDoubleClick=null;
});
$_M(c$,"toggleAutoHide",
function(){
this.isAutoHide=!this.isAutoHide;
this.minimizedEl.title=this.isAutoHide?"Doubleclick to set notification area always-visible":"Doubleclick to set notification area auto-hide";
this.setMinimized(this.isAutoHide);
if(this.isJustUpdated){
return;
}this.bringToTop(-1);
});
c$.$NotificationCorner$1$=function(){
$_H();
c$=$_W($wt.widgets,"NotificationCorner$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.NotificationCorner"].display!=null&&!this.b$["$wt.widgets.NotificationCorner"].display.isDisposed()){
if(this.b$["$wt.widgets.NotificationCorner"].display.trayCorner!=null){
this.b$["$wt.widgets.NotificationCorner"].display.trayCorner.bringToTop(-1);
}var shell=this.b$["$wt.widgets.NotificationCorner"].display.getActiveShell();
if(shell!=null){
shell.openAboutJava2Script();
return;
}else{
var shells=this.b$["$wt.widgets.NotificationCorner"].display.getShells();
for(var i=0;i<shells.length;i++){
if(shells[i]!=null&&!shells[i].isDisposed()){
shells[i].openAboutJava2Script();
return;
}}
}}$wt.widgets.NotificationCorner.openAbout();
});
c$=$_P();
};
c$.$NotificationCorner$2$=function(){
$_H();
c$=$_W($wt.widgets,"NotificationCorner$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.NotificationCorner"].isAutoHide){
this.b$["$wt.widgets.NotificationCorner"].setMinimized(false);
}var zIndex=w$.currentTopZIndex+1;
if(this.b$["$wt.widgets.NotificationCorner"].handle.style.zIndex!=zIndex){
this.b$["$wt.widgets.NotificationCorner"].layerZIndex=this.b$["$wt.widgets.NotificationCorner"].handle.style.zIndex;
this.b$["$wt.widgets.NotificationCorner"].bringToTop(zIndex);
}});
c$=$_P();
};
c$.$NotificationCorner$3$=function(){
$_H();
c$=$_W($wt.widgets,"NotificationCorner$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.NotificationCorner"].setMinimized(false)){
this.b$["$wt.widgets.NotificationCorner"].isJustUpdated=true;
w$.setTimeout($_Q((($_D("$wt.widgets.NotificationCorner$3$1")?0:org.eclipse.swt.widgets.NotificationCorner.$NotificationCorner$3$1$()),$_N($wt.widgets.NotificationCorner$3$1,this,null))),500);
}this.b$["$wt.widgets.NotificationCorner"].bringToTop(-1);
});
c$=$_P();
};
c$.$NotificationCorner$3$1$=function(){
$_H();
c$=$_W($wt.widgets,"NotificationCorner$3$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.NotificationCorner"].isJustUpdated=false;
});
c$=$_P();
};
c$.$NotificationCorner$4$=function(){
$_H();
c$=$_W($wt.widgets,"NotificationCorner$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.NotificationCorner"].toggleAutoHide();
});
c$=$_P();
};
$_S(c$,
"defaultNotificationCorner",null);
});
