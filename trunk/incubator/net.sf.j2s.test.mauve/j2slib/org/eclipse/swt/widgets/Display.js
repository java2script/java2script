$_L(["$wt.graphics.Device","$wt.widgets.Tray"],"$wt.widgets.Display",["$wt.events.SelectionAdapter","$wt.graphics.Color","$.Cursor","$.Font","$.Image","$.Point","$.Rectangle","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.EventTable","$.MaximizedTitle","$.Monitor","$.NotificationCorner","$.QuickLaunch","$.TaskBar","$.TrayItem"],function(){
c$=$_C(function(){
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
this.freeSlot=0;
this.indexTable=null;
this.controlTable=null;
this.focusEvent=0;
this.focusControl=null;
this.bars=null;
this.popups=null;
this.items=null;
this.thread=null;
this.disposeList=null;
this.tray=null;
this.nextTrayId=0;
this.timerIds=null;
this.timerList=null;
this.nextTimerId=0;
this.lastKey=0;
this.lastAscii=0;
this.lastMouse=0;
this.lastVirtual=false;
this.lastNull=false;
this.lastDead=false;
this.keyboard=null;
this.accelKeyHit=false;
this.mnemonicKeyHit=false;
this.lockActiveWindow=false;
this.captureChanged=false;
this.ignoreRestoreFocus=false;
this.lastHittestControl=null;
this.lastHittest=0;
this.cursors=null;
this.imageList=null;
this.toolImageList=null;
this.toolHotImageList=null;
this.toolDisabledImageList=null;
this.lpCustColors=0;
this.data=null;
this.keys=null;
this.values=null;
this.msgs=null;
this.messageProc=0;
this.currentMonitor=null;
this.modalShells=null;
this.modalDialogShell=null;
this.taskBar=null;
this.topBar=null;
this.shortcutBar=null;
this.trayCorner=null;
this.hitCount=0;
this.mouseMoveListener=null;
$_Z(this,arguments);
},$wt.widgets,"Display",$wt.graphics.Device);
$_Y(c$,function(){
this.keyboard=$_A(256,0);
this.cursors=new Array(22);
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
$_R(this,$wt.widgets.Display,[data]);
},"$wt.graphics.DeviceData");
$_M(c$,"addBar",
function(menu){
if(this.bars==null)this.bars=new Array(4);
var length=this.bars.length;
for(var i=0;i<length;i++){
if(this.bars[i]===menu)return;
}
var index=0;
while(index<length){
if(this.bars[index]==null)break;
index++;
}
if(index==length){
var newBars=new Array(length+4);
System.arraycopy(this.bars,0,newBars,0,length);
this.bars=newBars;
}this.bars[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"addControl",
function(handle,control){
if(control==null)return;
this.controlTable[this.controlTable.length]=control;
},"~O,$wt.widgets.Control");
$_M(c$,"addFilter",
function(eventType,listener){
if(this.filterTable==null)this.filterTable=new $wt.widgets.EventTable();
this.filterTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addMenuItem",
function(item){
if(this.items==null)this.items=new Array(64);
for(var i=0;i<this.items.length;i++){
if(this.items[i]==null){
item.id=i+108;
this.items[i]=item;
return;
}}
item.id=this.items.length+108;
var newItems=new Array(this.items.length+64);
newItems[this.items.length]=item;
System.arraycopy(this.items,0,newItems,0,this.items.length);
this.items=newItems;
},"$wt.widgets.MenuItem");
$_M(c$,"addPopup",
function(menu){
if(this.popups==null)this.popups=new Array(4);
var length=this.popups.length;
for(var i=0;i<length;i++){
if(this.popups[i]===menu)return;
}
var index=0;
while(index<length){
if(this.popups[index]==null)break;
index++;
}
if(index==length){
var newPopups=new Array(length+4);
System.arraycopy(this.popups,0,newPopups,0,length);
this.popups=newPopups;
}this.popups[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"asciiKey",
function(key){
return 0;
},"~N");
$_M(c$,"asyncExec",
function(runnable){
w$.setTimeout($_Q(runnable),10);
},"Runnable");
$_M(c$,"beep",
function(){
});
$_M(c$,"checkSubclass",
function(){
});
c$.checkDisplay=$_M(c$,"checkDisplay",
function(thread,multiple){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
}}
},"Thread,~B");
$_M(c$,"clearModal",
function(shell){
if(this.modalShells==null)return;
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]===shell)break;
if(this.modalShells[index]==null)return;
index++;
}
if(index==length)return;
System.arraycopy(this.modalShells,index+1,this.modalShells,index,--length-index);
this.modalShells[length]=null;
if(index==0&&this.modalShells[0]==null)this.modalShells=null;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"close",
function(){
var event=new $wt.widgets.Event();
this.sendEvent(21,event);
if(event.doit)this.dispose();
});
$_V(c$,"create",
function(data){
this.checkSubclass();
this.createDisplay(data);
$wt.widgets.Display.register(this);
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=this,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
},"$wt.graphics.DeviceData");
$_M(c$,"createDisplay",
function(data){
},"$wt.graphics.DeviceData");
c$.deregister=$_M(c$,"deregister",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if(display===$wt.widgets.Display.Displays[i])$wt.widgets.Display.Displays[i]=null;
}
},"$wt.widgets.Display");
$_V(c$,"destroy",
function(){
if(this===$wt.widgets.Display.Default)($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
$wt.widgets.Display.deregister(this);
this.destroyDisplay();
});
$_M(c$,"destroyDisplay",
function(){
});
$_M(c$,"dispose",
function(){
if($wt.widgets.Display.disposing){
$_U(this,$wt.widgets.Display,"dispose",[]);
return;
}var shells=this.getShells();
if(shells==null||shells.length==0){
if(this.shortcutBar==null||this.shortcutBar.shortcutCount==0){
$_U(this,$wt.widgets.Display,"dispose",[]);
}}});
$_M(c$,"disposeExec",
function(runnable){
if(this.disposeList==null)this.disposeList=new Array(4);
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]==null){
this.disposeList[i]=runnable;
return;
}}
var newDisposeList=new Array(this.disposeList.length+4);
System.arraycopy(this.disposeList,0,newDisposeList,0,this.disposeList.length);
newDisposeList[this.disposeList.length]=runnable;
this.disposeList=newDisposeList;
},"Runnable");
$_M(c$,"drawMenuBars",
function(){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
var menu=this.bars[i];
if(menu!=null&&!menu.isDisposed())menu.update();
}
this.bars=null;
});
$_M(c$,"error",
function(code){
throw"SWT.error ("+code+")";
},"~N");
$_M(c$,"filterEvent",
function(event){
if(this.filterTable!=null)this.filterTable.sendEvent(event);
return false;
},"$wt.widgets.Event");
$_M(c$,"filters",
function(eventType){
if(this.filterTable==null)return false;
return this.filterTable.hooks(eventType);
},"~N");
$_M(c$,"findControl",
function(handle){
if(handle==0)return null;
return null;
},"~N");
$_M(c$,"findWidget",
function(handle){
return null;
},"~N");
$_M(c$,"findWidget",
function(handle,id){
return null;
},"~N,~N");
c$.findDisplay=$_M(c$,"findDisplay",
function(thread){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var display=$wt.widgets.Display.Displays[i];
if(display!=null&&display.thread===thread){
return display;
}}
return null;
},"Thread");
$_M(c$,"getActiveShell",
function(){
return $wt.widgets.Display.getTopShell();
});
c$.getCurrent=$_M(c$,"getCurrent",
function(){
return $wt.widgets.Display.getDefault();
});
$_M(c$,"getControl",
function(handle){
if(handle==null)return null;
for(var i=0;i<this.controlTable.length;i++){
if(this.controlTable[i]!=null&&handle===this.controlTable[i].handle){
return this.controlTable[i];
}}
return null;
},"~O");
$_M(c$,"getCursorControl",
function(){
return null;
});
$_M(c$,"getCursorLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCursorSizes",
function(){
return[new $wt.graphics.Point(16,16)];
});
c$.getDefault=$_M(c$,"getDefault",
function(){
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=new $wt.widgets.Display(),$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
return $wt.widgets.Display.Default;
});
c$.isValidClass=$_M(c$,"isValidClass",
function(clazz){
var name=clazz.getName();
var index=name.lastIndexOf('.');
return name.substring(0,index+1).equals("org.eclipse.swt.widgets.");
},"Class");
$_M(c$,"getData",
function(key){
if(this.keys==null)return null;
for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key))return this.values[i];
}
return null;
},"~S");
$_M(c$,"getData",
function(){
return this.data;
});
$_M(c$,"getDismissalAlignment",
function(){
return 16384;
});
$_M(c$,"getDoubleClickTime",
function(){
return 20;
});
$_M(c$,"getFocusControl",
function(){
if(this.focusControl!=null&&!this.focusControl.isDisposed()){
return this.focusControl;
}return null;
});
$_M(c$,"getHighContrast",
function(){
return false;
});
$_M(c$,"getIconDepth",
function(){
return 32;
});
$_M(c$,"getIconSizes",
function(){
return[new $wt.graphics.Point(16,16),new $wt.graphics.Point(32,32)];
});
$_M(c$,"getLastEventTime",
function(){
return System.currentTimeMillis();
});
$_M(c$,"getMenuItem",
function(id){
if(this.items==null)return null;
id=id-108;
if(0<=id&&id<this.items.length)return this.items[id];
return null;
},"~N");
$_M(c$,"getModalShell",
function(){
if(this.modalShells==null)return null;
var index=this.modalShells.length;
while(--index>=0){
var shell=this.modalShells[index];
if(shell!=null)return shell;
}
return null;
});
$_M(c$,"getModalDialogShell",
function(){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
return this.modalDialogShell;
});
$_M(c$,"getMonitors",
function(){
if($wt.widgets.Display.monitors==null){
var monitor=new $wt.widgets.Monitor();
monitor.handle=d$.body;
monitor.clientWidth=O$.getFixedBodyClientWidth();
var parentWidth=O$.getContainerWidth(d$.body.parentNode);
if(parentWidth-8>monitor.clientWidth&&parentWidth<=w$.screen.availWidth){
monitor.clientWidth=parentWidth;
}monitor.width=w$.screen.availWidth;
monitor.clientHeight=O$.getFixedBodyClientHeight();
monitor.height=w$.screen.availHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
($t$=$wt.widgets.Display.monitors=[monitor],$wt.widgets.Display.prototype.monitors=$wt.widgets.Display.monitors,$t$);
($t$=$wt.widgets.Display.monitorCount=1,$wt.widgets.Display.prototype.monitorCount=$wt.widgets.Display.monitorCount,$t$);
}return $wt.widgets.Display.monitors;
});
c$.registerElementAsMonitor=$_M(c$,"registerElementAsMonitor",
function(el){
if(el==null){
return;
}if($wt.widgets.Display.monitors!=null){
for(var i=0;i<$wt.widgets.Display.monitors.length;i++){
if($wt.widgets.Display.monitors[i].handle===el){
return;
}}
}else{
var monitor=new $wt.widgets.Monitor();
monitor.handle=d$.body;
monitor.clientWidth=O$.getFixedBodyClientWidth();
monitor.width=w$.screen.availWidth;
monitor.clientHeight=O$.getFixedBodyClientHeight();
monitor.height=w$.screen.availHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
($t$=$wt.widgets.Display.monitors=[monitor],$wt.widgets.Display.prototype.monitors=$wt.widgets.Display.monitors,$t$);
($t$=$wt.widgets.Display.monitorCount=1,$wt.widgets.Display.prototype.monitorCount=$wt.widgets.Display.monitorCount,$t$);
}var monitor=new $wt.widgets.Monitor();
monitor.handle=el;
monitor.clientX=0;
monitor.clientY=0;
if(el===d$.body){
monitor.clientWidth=O$.getFixedBodyClientWidth();
monitor.clientHeight=O$.getFixedBodyClientHeight();
monitor.x=0;
monitor.y=0;
monitor.width=w$.screen.availWidth;
monitor.height=w$.screen.availHeight;
}else{
var pt=O$.calcuateRelativePosition(el,d$.body);
el.style.position="absolute";
monitor.x=pt.x;
monitor.y=pt.y;
monitor.width=monitor.clientWidth=O$.getContainerWidth(el);
monitor.height=monitor.clientHeight=O$.getContainerHeight(el);
}$wt.widgets.Display.monitors[$wt.widgets.Display.monitors.length]=monitor;
($t$=$wt.widgets.Display.monitorCount=$wt.widgets.Display.monitors.length,$wt.widgets.Display.prototype.monitorCount=$wt.widgets.Display.monitorCount,$t$);
},"Element");
$_M(c$,"getPrimaryMonitor",
function(){
if(this.currentMonitor!=null){
return this.currentMonitor;
}{
var ms=this.getMonitors();
var key="current.monitor.id";
if(window[key]!=null){
var x=parseInt(window[key]);
if(""+x==window[key]){
if(x<0||x>=ms.length){
x=0;
}
this.bindMonitor(ms[x]);
return ms[x];
}else{
var el=document.getElementById(window[key]);
if(el!=null){
for(var i=0;i<ms.length;i++){
if(ms[i].handle==el){
this.bindMonitor(ms[i]);
return ms[i];
}
}
}
}
}
}this.bindMonitor(this.getMonitors()[0]);
return this.getMonitors()[0];
});
$_M(c$,"bindMonitor",
function(m){
this.currentMonitor=m;
$wt.internal.ResizeSystem.register(m);
},"$wt.widgets.Monitor");
$_M(c$,"getShells",
function(){
if(this.controlTable==null){
return null;
}var count=0;
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell))count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell)){
result[index++]=control;
}}
return result;
});
$_M(c$,"getSyncThread",
function(){
return null;
});
$_M(c$,"getSystemColor",
function(id){
var pixel="#000000";
switch(id){
case 17:
pixel="ThreeDDarkShadow";
break;
case 18:
pixel="ThreeDShadow";
break;
case 19:
pixel="ThreeDLightShadow";
break;
case 20:
pixel="ThreeDHighlight";
break;
case 22:
pixel="ThreeDFace";
break;
case 23:
pixel="WindowFrame";
break;
case 21:
case 24:
pixel="WindowText";
break;
case 25:
pixel="Window";
break;
case 26:
pixel="Highlight";
break;
case 27:
pixel="HighlightText";
break;
case 28:
pixel="InfoText";
break;
case 29:
pixel="InfoBackground";
break;
case 30:
pixel="CaptionText";
break;
case 31:
pixel="ActiveCaption";
break;
case 32:
pixel="ActiveCaption";
break;
case 33:
pixel="InactiveCaptionText";
break;
case 34:
pixel="InactiveCaption";
break;
case 35:
pixel="InactiveCaption";
break;
default:
return $_U(this,$wt.widgets.Display,"getSystemColor",[id]);
}
return new $wt.graphics.Color(null,pixel);
},"~N");
$_M(c$,"getSystemCursor",
function(id){
if(!(0<=id&&id<this.cursors.length))return null;
if(this.cursors[id]==null){
this.cursors[id]=new $wt.graphics.Cursor(this,id);
}return this.cursors[id];
},"~N");
$_V(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getSystemImage",
function(id){
var iconName=null;
switch(id){
case 1:
iconName="error";
break;
case 16:
case 2:
iconName="information";
break;
case 4:
iconName="question";
break;
case 8:
iconName="warning";
break;
}
if(iconName==null)return null;
return new $wt.graphics.Image(this,$wt.widgets.Display.getResourceAsStream("images/"+iconName+".png"));
},"~N");
$_M(c$,"getSystemTray",
function(){
if(this.tray!=null)return this.tray;
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!=null&&disp.tray!=null&&!disp.tray.isDisposed()){
this.tray=disp.tray;
if(disp.trayCorner!=null){
disp.trayCorner.tray=this.tray;
}return this.tray;
}}
this.tray=new $wt.widgets.Tray(this,0);
if(this.trayCorner!=null){
this.trayCorner.tray=this.tray;
this.trayCorner.initialize();
}return this.tray;
});
$_M(c$,"getThread",
function(){
return this.thread;
});
$_M(c$,"init",
function(){
$_U(this,$wt.widgets.Display,"init",[]);
this.indexTable=$_A(1024,0);
this.controlTable=new Array(1024);
for(var i=0;i<1023;i++)this.indexTable[i]=i+1;

this.indexTable[1023]=-1;
this.msgs=new Array(0);
this.messageProc=0;
{
FontSizeSystem.monitorFontSize();
}$wt.widgets.Display.initializeZOrdering();
this.initializeDekstop();
});
$_M(c$,"initializeDekstop",
function(){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!==this&&disp!=null&&!disp.isDisposed()&&disp.taskBar!=null&&disp.topBar!=null){
this.taskBar=disp.taskBar;
this.topBar=disp.topBar;
this.shortcutBar=disp.shortcutBar;
this.trayCorner=disp.trayCorner;
return;
}}
if(this.taskBar!=null)return;
var panel=d$.getElementById("swt-desktop-panel");
var needScrolling=false;
var injecting=false;
if(panel==null){
var forceInsertingPanel=true;
{
forceInsertingPanel=(window["swt.desktop.panel"]!=false);
}if(forceInsertingPanel){
injecting=true;
panel=d$.createElement("DIV");
panel.id="swt-desktop-panel";
{
panel.style.overflowX="hidden";
}var childNodes=d$.body.childNodes;
if(childNodes.length>0){
d$.body.insertBefore(panel,childNodes[0]);
}else{
d$.body.appendChild(panel);
}childNodes=d$.body.childNodes;
var removedChildren=new Array(0);
for(var i=childNodes.length-1;i>=0;i--){
var child=childNodes[i];
var okToMove=false;
if(child.nodeName==null){
okToMove=true;
}else if(!"SCRIPT".equalsIgnoreCase(child.nodeName)){
okToMove=true;
var id=child.id;
if(id!=null){
if("swt-desktop-panel".equalsIgnoreCase(id)){
okToMove=false;
}else if("xss-cookie".equalsIgnoreCase(id)){
okToMove=false;
}else if("clazzloader-status".equalsIgnoreCase(id)){
okToMove=false;
}else if("swt-font-monitor".equalsIgnoreCase(id)){
okToMove=false;
}else if("swt-invisible-container".equalsIgnoreCase(id)){
okToMove=false;
}else if("_console_".equalsIgnoreCase(id)){
okToMove=false;
}else if(id.startsWith("alaa-")){
okToMove=false;
}}else{
var cssClass=child.className;
if(cssClass!=null){
var allSWTClasses=["tray-cell","tray-item","tray-logo-item","shell-manager","shortcut-bar","shell-default","shell-trim"];
for(var j=0;j<allSWTClasses.length;j++){
if(cssClass.indexOf(allSWTClasses[j])!=-1){
okToMove=false;
break;
}}
}}}if(okToMove){
removedChildren[removedChildren.length]=child;
d$.body.removeChild(child);
}}
for(var i=removedChildren.length-1;i>=0;i--){
panel.appendChild(removedChildren[i]);
}
d$.body.style.overflow="hidden";
d$.body.style.padding="0";
d$.body.style.margin="0";
needScrolling=true;
}}if(panel!=null){
d$.body.style.overflow="hidden";
var height=O$.getFixedBodyClientHeight();
var width=O$.getFixedBodyClientWidth();
panel.style.position="absolute";
if(!injecting){
panel.style.backgroundColor="white";
}{
var vsb=window["swt.desktop.vscrollbar"];
if(vsb!=null&&(vsb==true||vsb=="true"||vsb=="enable")){
panel.style.overflowY="auto";
}
var hsb=window["swt.desktop.hscrollbar"];
if(hsb!=null&&(hsb==true||hsb=="true"||hsb=="enable")){
panel.style.overflowX="auto";
}
}panel.style.paddingBottom="80px";
if(!O$.isIE||O$.isIE70||O$.isIE80||O$.isIE90){
var div=d$.createElement("DIV");
div.id="page-bottom-end";
if(O$.isIE){
div.style.styleFloat="left";
}else{
div.style.cssFloat="left";
}div.style.height="80px";
div.style.width="1px";
div.style.marginLeft="-1px";
panel.appendChild(div);
}panel.style.left="0";
panel.style.top="0";
panel.style.width=width+"px";
panel.style.height=(height-80)+"px";
if(needScrolling){
panel.scrollTop=panel.scrollHeight;
}}this.taskBar=new $wt.widgets.TaskBar(this);
this.topBar=new $wt.widgets.MaximizedTitle(this);
if($wt.widgets.QuickLaunch.defaultQuickLaunch!=null){
this.shortcutBar=$wt.widgets.QuickLaunch.defaultQuickLaunch;
}else{
this.shortcutBar=new $wt.widgets.QuickLaunch(this);
}if($wt.widgets.NotificationCorner.defaultNotificationCorner!=null){
this.trayCorner=$wt.widgets.NotificationCorner.defaultNotificationCorner;
}else{
this.trayCorner=new $wt.widgets.NotificationCorner(this);
}this.taskBar.initialize();
this.topBar.initialize();
this.shortcutBar.initialize();
this.trayCorner.initialize();
{
var autoHide=window["swt.notification.corner.autohide"];
if(autoHide!=null&&(autoHide==true||autoHide=="true")){
this.trayCorner.toggleAutoHide();
}
autoHide=window["swt.quick.launch.autohide"];
if(autoHide!=null&&(autoHide==true||autoHide=="true")){
this.shortcutBar.toggleAutoHide();
}
autoHide=window["swt.task.bar.autohide"];
if(autoHide!=null&&(autoHide==false||autoHide=="false")){
this.taskBar.toggleAutoHide();
}
}this.mouseMoveListener=$_Q((($_D("$wt.widgets.Display$1")?0:org.eclipse.swt.widgets.Display.$Display$1$()),$_N($wt.widgets.Display$1,this,null)));
Clazz.addEvent(document,"mousemove",this.mouseMoveListener);
var el=d$.getElementById("_console_");
if(el!=null){
el.style.display="none";
{
window.setTimeout(org.eclipse.swt.widgets.Display.insertOpenConsoleLink,500);
}}else{
if(window["C_$"]==null&&Console!=null){
C_$=Console;
C_$.createC_$Window=Console.createConsoleWindow;
}
if(Console==null)Console=C_$;
if(C_$.createC_$Window.wrapped==null){
C_$.createC_$Window_=Console.createC_$Window;
C_$.createConsoleWindow=C_$.createC_$Window=function(parentEl){
var console=C_$.createC_$Window_(parentEl);
if(O$.isIE){
var consoleStyle=console.style;
consoleStyle.display="block";
consoleStyle.position="absolute";
consoleStyle.width="200px";
consoleStyle.height="200px";
consoleStyle.left="-400px";
consoleStyle.top="-400px";
consoleStyle.overflow="hidden";
}else{
console.style.display="none";
}
$wt.widgets.Display.insertOpenConsoleLink(console);
return console;
};
C_$.createC_$Window.wrapped=true;
}
}});
c$.insertOpenConsoleLink=$_M(c$,"insertOpenConsoleLink",
function(){
var t=$wt.widgets.Display.getTray();
if(t==null||t.isDisposed()){
t=$wt.widgets.Display.Default.getSystemTray();
}var item=new $wt.widgets.TrayItem(t,0);
item.setText("Console");
item.handle.className="tray-item tray-item-console";
item.setToolTipText("Console");
item.addSelectionListener((($_D("$wt.widgets.Display$2")?0:org.eclipse.swt.widgets.Display.$Display$2$()),$_N($wt.widgets.Display$2,this,null)));
});
$_M(c$,"isValidThread",
function(){
return true;
});
$_M(c$,"map",
function(from,to,point){
return this.map(from,to,point.x,point.y);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M(c$,"map",
function(from,to,x,y){
if(from===to)return new $wt.graphics.Point(x,y);
var hwndFrom=from!=null?from.handle:d$.body;
var hwndTo=to!=null?to.handle:d$.body;
var p=O$.calcuateRelativePosition(hwndFrom,hwndTo);
p.x+=x;
p.y+=y;
return p;
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N");
$_M(c$,"map",
function(from,to,rectangle){
return this.map(from,to,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M(c$,"map",
function(from,to,x,y,width,height){
if(from===to)return new $wt.graphics.Rectangle(x,y,width,height);
var hwndFrom=from!=null?from.handle:d$.body;
var hwndTo=to!=null?to.handle:d$.body;
var p=O$.calcuateRelativePosition(hwndFrom,hwndTo);
p.x+=x;
p.y+=y;
return new $wt.graphics.Rectangle(p.x+x,p.y+y,O$.getContainerWidth(hwndTo),O$.getContainerHeight(hwndTo));
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N,~N,~N");
$_M(c$,"post",
function(event){
var type=event.type;
switch(type){
case 1:
case 2:
{
}case 3:
case 5:
case 4:
{
}}
{
window.setTimeout(function(disp){
return function(){
disp.runDeferredEvents();
};
}(this),1);
}return false;
},"$wt.widgets.Event");
$_M(c$,"postEvent",
function(event){
if(this.eventQueue==null)this.eventQueue=new Array(4);
var index=0;
var length=this.eventQueue.length;
while(index<length){
if(this.eventQueue[index]==null)break;
index++;
}
if(index==length){
var newQueue=new Array(length+4);
System.arraycopy(this.eventQueue,0,newQueue,0,length);
this.eventQueue=newQueue;
}this.eventQueue[index]=event;
{
window.setTimeout(function(disp){
return function(){
disp.runDeferredEvents();
};
}(this),1);
}},"$wt.widgets.Event");
$_M(c$,"readAndDispatch",
function(){
this.drawMenuBars();
this.runPopups();
if(this.messageProc!=0){
return true;
}this.messageProc=w$.setInterval($_Q((($_D("$wt.widgets.Display$3")?0:org.eclipse.swt.widgets.Display.$Display$3$()),$_N($wt.widgets.Display$3,this,null))),100);
return true;
});
c$.register=$_M(c$,"register",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]==null){
$wt.widgets.Display.Displays[i]=display;
return;
}}
var newDisplays=new Array($wt.widgets.Display.Displays.length+4);
System.arraycopy($wt.widgets.Display.Displays,0,newDisplays,0,$wt.widgets.Display.Displays.length);
newDisplays[$wt.widgets.Display.Displays.length]=display;
($t$=$wt.widgets.Display.Displays=newDisplays,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
},"$wt.widgets.Display");
$_M(c$,"release",
function(){
this.sendEvent(12,new $wt.widgets.Event());
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.dispose();
}
var trayRefs=1;
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!==this&&disp!=null&&!disp.isDisposed()){
if(disp.tray!=null){
trayRefs++;
}}}
if(this.tray!=null&&trayRefs<2)this.tray.dispose();
this.tray=null;
if(this.disposeList!=null){
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]!=null)this.disposeList[i].run();
}
}this.disposeList=null;
if(this.timerIds!=null){
for(var i=0;i<this.timerIds.length;i++){
if(this.timerIds[i]!=0)w$.clearInterval(this.timerIds[i]);
}
}this.timerIds=null;
if(this.timerList!=null){
for(var i=0;i<this.timerList.length;i++){
if(this.timerList[i]!=null)this.timerList[i]=null;
}
}this.timerList=null;
if($wt.widgets.NotificationCorner.defaultNotificationCorner!=null){
($t$=$wt.widgets.NotificationCorner.defaultNotificationCorner=null,$wt.widgets.NotificationCorner.prototype.defaultNotificationCorner=$wt.widgets.NotificationCorner.defaultNotificationCorner,$t$);
}if($wt.widgets.QuickLaunch.defaultQuickLaunch!=null){
($t$=$wt.widgets.QuickLaunch.defaultQuickLaunch=null,$wt.widgets.QuickLaunch.prototype.defaultQuickLaunch=$wt.widgets.QuickLaunch.defaultQuickLaunch,$t$);
}if($wt.widgets.NotificationCorner.defaultNotificationCorner==null&&$wt.widgets.QuickLaunch.defaultQuickLaunch==null){
if($wt.widgets.Display.htmlOverflow!=null){
d$.body.parentNode.style.overflow=$wt.widgets.Display.htmlOverflow;
($t$=$wt.widgets.Display.htmlOverflow=null,$wt.widgets.Display.prototype.htmlOverflow=$wt.widgets.Display.htmlOverflow,$t$);
}if($wt.widgets.Display.bodyOverflow!=null){
d$.body.style.overflow=$wt.widgets.Display.bodyOverflow;
($t$=$wt.widgets.Display.bodyOverflow=null,$wt.widgets.Display.prototype.bodyOverflow=$wt.widgets.Display.bodyOverflow,$t$);
}if($wt.widgets.Display.bodyHeight!=null){
d$.body.style.height=$wt.widgets.Display.bodyHeight;
($t$=$wt.widgets.Display.bodyHeight=null,$wt.widgets.Display.prototype.bodyHeight=$wt.widgets.Display.bodyHeight,$t$);
}d$.body.parentNode.scrollLeft=$wt.widgets.Display.htmlScrollLeft;
d$.body.parentNode.scrollTop=$wt.widgets.Display.htmlScrollTop;
d$.body.scrollLeft=$wt.widgets.Display.bodyScrollLeft;
d$.body.scrollTop=$wt.widgets.Display.bodyScrollTop;
}this.releaseDesktop();
this.releaseDisplay();
$_U(this,$wt.widgets.Display,"release",[]);
});
$_M(c$,"releaseDesktop",
function(){
var existed=false;
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!==this&&disp!=null&&!disp.isDisposed()){
existed=true;
break;
}}
if(existed){
existed=false;
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!==this&&disp!=null&&!disp.isDisposed()&&disp.tray!=null&&!disp.tray.isDisposed()){
existed=true;
break;
}}
if(!existed&&this.trayCorner.handle!=null){
this.trayCorner.handle.style.display="none";
}}var trayRefs=1;
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!==this&&disp!=null&&!disp.isDisposed()){
if(disp.tray!=null){
trayRefs++;
}}}
if(this.taskBar!=null){
this.taskBar.releaseWidget();
this.taskBar=null;
}if(this.topBar!=null){
this.topBar.releaseWidget();
this.topBar=null;
}if(this.shortcutBar!=null){
this.shortcutBar.releaseWidget();
this.shortcutBar=null;
}if(this.trayCorner!=null){
if(trayRefs<=1)this.trayCorner.releaseWidget();
this.trayCorner=null;
}if(this.mouseMoveListener!=null){
Clazz.removeEvent(document,"mousemove",this.mouseMoveListener);
this.mouseMoveListener=null;
}});
$_M(c$,"releaseDisplay",
function(){
for(var i=0;i<this.cursors.length;i++){
if(this.cursors[i]!=null)this.cursors[i].dispose();
}
this.cursors=null;
this.keyboard=null;
this.modalDialogShell=null;
this.modalShells=null;
this.data=null;
this.keys=null;
this.values=null;
this.bars=this.popups=null;
this.indexTable=null;
this.controlTable=null;
this.lastHittestControl=null;
this.imageList=this.toolImageList=this.toolHotImageList=this.toolDisabledImageList=null;
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
if(this.messageProc!=0){
w$.clearInterval(this.messageProc);
this.messageProc=0;
}this.msgs=null;
});
$_M(c$,"releaseImageList",
function(list){
{}
},"$wt.widgets.ImageList");
$_M(c$,"removeFilter",
function(eventType,listener){
if(this.filterTable==null)return;
this.filterTable.unhook(eventType,listener);
if(this.filterTable.size()==0)this.filterTable=null;
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeBar",
function(menu){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
if(this.bars[i]===menu){
this.bars[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"removeControl",
function(handle){
if(handle==null)return null;
var control=null;
var index=-1;
for(var i=0;i<this.controlTable.length;i++){
var ctrl=this.controlTable[i];
if(ctrl!=null&&ctrl.handle===handle){
index=i;
break;
}}
if(0<=index&&index<this.controlTable.length){
control=this.controlTable[index];
this.controlTable[index]=null;
this.indexTable[index]=this.freeSlot;
this.freeSlot=index;
}return control;
},"~O");
$_M(c$,"removeMenuItem",
function(item){
if(this.items==null)return;
this.items[item.id-108]=null;
item.id=-1;
},"$wt.widgets.MenuItem");
$_M(c$,"removePopup",
function(menu){
if(this.popups==null)return;
for(var i=0;i<this.popups.length;i++){
if(this.popups[i]===menu){
this.popups[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"runDeferredEvents",
function(){
while(this.eventQueue!=null){
var event=this.eventQueue[0];
if(event==null)break;
var length=this.eventQueue.length;
System.arraycopy(this.eventQueue,1,this.eventQueue,0,--length);
this.eventQueue[length]=null;
var widget=event.widget;
if(widget!=null&&!widget.isDisposed()){
var item=event.item;
if(item==null||!item.isDisposed()){
widget.sendEvent(event);
}}}
this.eventQueue=null;
return true;
});
$_M(c$,"runPopups",
function(){
if(this.popups==null)return false;
var result=false;
while(this.popups!=null){
var menu=this.popups[0];
if(menu==null)break;
var length=this.popups.length;
System.arraycopy(this.popups,1,this.popups,0,--length);
this.popups[length]=null;
this.runDeferredEvents();
menu._setVisible(true);
result=true;
}
this.popups=null;
return result;
});
$_M(c$,"sendEvent",
function(eventType,event){
if(this.eventTable==null&&this.filterTable==null){
return;
}if(event==null)event=new $wt.widgets.Event();
event.display=this;
event.type=eventType;
if(event.time==0)event.time=this.getLastEventTime();
if(!this.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"~N,$wt.widgets.Event");
$_M(c$,"sendMessage",
function(msg){
this.msgs[this.msgs.length]=msg;
},"$wt.internal.struct.MESSAGE");
$_M(c$,"setCursorLocation",
function(x,y){
},"~N,~N");
$_M(c$,"setCursorLocation",
function(point){
this.setCursorLocation(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"setData",
function(key,value){
if(value==null){
if(this.keys==null)return;
var index=0;
while(index<this.keys.length&&!this.keys[index].equals(key))index++;

if(index==this.keys.length)return;
if(this.keys.length==1){
this.keys=null;
this.values=null;
}else{
var newKeys=new Array(this.keys.length-1);
var newValues=new Array(this.values.length-1);
System.arraycopy(this.keys,0,newKeys,0,index);
System.arraycopy(this.keys,index+1,newKeys,index,newKeys.length-index);
System.arraycopy(this.values,0,newValues,0,index);
System.arraycopy(this.values,index+1,newValues,index,newValues.length-index);
this.keys=newKeys;
this.values=newValues;
}return;
}if(this.keys==null){
this.keys=[key];
this.values=[value];
return;
}for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key)){
this.values[i]=value;
return;
}}
var newKeys=new Array(this.keys.length+1);
var newValues=new Array(this.values.length+1);
System.arraycopy(this.keys,0,newKeys,0,this.keys.length);
System.arraycopy(this.values,0,newValues,0,this.values.length);
newKeys[this.keys.length]=key;
newValues[this.values.length]=value;
this.keys=newKeys;
this.values=newValues;
},"~S,~O");
$_M(c$,"setData",
function(data){
this.data=data;
},"~O");
c$.setAppName=$_M(c$,"setAppName",
function(name){
},"~S");
$_M(c$,"setModalDialogShell",
function(modalDailog){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
this.modalDialogShell=modalDailog;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setModalShell",
function(shell){
if(this.modalShells==null)this.modalShells=new Array(4);
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]===shell)return;
if(this.modalShells[index]==null)break;
index++;
}
if(index==length){
var newModalShells=new Array(length+4);
System.arraycopy(this.modalShells,0,newModalShells,0,length);
this.modalShells=newModalShells;
}this.modalShells[index]=shell;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setSynchronizer",
function(synchronizer){
},"$wt.widgets.Synchronizer");
$_M(c$,"sleep",
function(){
return false;
});
$_M(c$,"syncExec",
function(runnable){
runnable.run();
},"Runnable");
$_M(c$,"timerExec",
function(milliseconds,runnable){
if(this.timerList==null)this.timerList=new Array(4);
if(this.timerIds==null)this.timerIds=$_A(4,0);
var index=0;
while(index<this.timerList.length){
if(this.timerList[index]===runnable)break;
index++;
}
var timerId=0;
if(index!=this.timerList.length){
timerId=this.timerIds[index];
if(milliseconds<0&&this.timerIds[index]!=0){
w$.clearTimeout(timerId);
this.timerList[index]=null;
this.timerIds[index]=0;
return;
}}else{
if(milliseconds<0)return;
index=0;
while(index<this.timerList.length){
if(this.timerList[index]==null)break;
index++;
}
this.nextTimerId++;
timerId=this.nextTimerId;
if(index==this.timerList.length){
var newTimerList=new Array(this.timerList.length+4);
System.arraycopy(this.timerList,0,newTimerList,0,this.timerList.length);
this.timerList=newTimerList;
var newTimerIds=$_A(this.timerIds.length+4,0);
System.arraycopy(this.timerIds,0,newTimerIds,0,this.timerIds.length);
this.timerIds=newTimerIds;
}}var fun=null;
{
fun=(function(jsr,idx,disp){
return function(){
try{
jsr.run();
}finally{
disp.timerList[idx]=null;
disp.timerIds[idx]=0;
}
};
})(runnable,index,this);
}var newTimerID=w$.setTimeout(fun,milliseconds);
if(newTimerID!=0){
this.timerList[index]=runnable;
this.timerIds[index]=newTimerID;
}},"~N,Runnable");
$_M(c$,"update",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.update(true);
}
});
$_M(c$,"wake",
function(){
});
c$.getTray=$_M(c$,"getTray",
function(){
var tray=null;
if($wt.widgets.Display.Default!=null){
tray=$wt.widgets.Display.Default.tray;
}if(tray==null||tray.isDisposed()){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var disp=$wt.widgets.Display.Displays[i];
if(disp!=null&&disp.tray!=null&&!disp.tray.isDisposed()){
tray=disp.tray;
break;
}}
}return tray;
});
c$.getAllVisibleShells=$_M(c$,"getAllVisibleShells",
function(){
var shells=new Array(0);
var orders=$_A(0,0);
var disps=$wt.widgets.Display.Displays;
for(var k=0;k<disps.length;k++){
if(disps[k]==null)continue;var ss=disps[k].getShells();
for(var i=0;i<ss.length;i++){
if(!ss[i].isDisposed()&&ss[i].isVisible()&&ss[i].handle.style.display!=="none"){
shells[shells.length]=ss[i];
var idx=""+ss[i].handle.style.zIndex;
var zidx=0;
if(idx==null||idx.length==0){
zidx=0;
}else{
zidx=Integer.parseInt(idx);
}orders[orders.length]=zidx;
}}
}
for(var i=0;i<shells.length;i++){
for(var j=i+1;j<shells.length;j++){
if(orders[i]<orders[j]){
var s=shells[i];
shells[i]=shells[j];
shells[j]=s;
var idx=orders[i];
orders[i]=orders[j];
orders[j]=idx;
}}
}
return shells;
});
c$.getTopShell=$_M(c$,"getTopShell",
function(){
var lastShell=null;
var lastZIndex=0;
var disps=$wt.widgets.Display.Displays;
for(var k=0;k<disps.length;k++){
if(disps[k]==null)continue;var ss=disps[k].getShells();
for(var i=0;i<ss.length;i++){
if(!ss[i].isDisposed()&&ss[i].isVisible()&&ss[i].handle.style.display!=="none"){
var idx=""+ss[i].handle.style.zIndex;
var zidx=0;
if(idx==null||idx.length==0){
zidx=0;
}else{
zidx=Integer.parseInt(idx);
}if(zidx>lastZIndex){
lastZIndex=zidx;
lastShell=ss[i];
}}}
}
return lastShell;
});
c$.deactivateAllTitleBarShells=$_M(c$,"deactivateAllTitleBarShells",
function(){
var disps=$wt.widgets.Display.Displays;
for(var k=0;k<disps.length;k++){
if(disps[k]==null)continue;var ss=disps[k].getShells();
for(var i=0;i<ss.length;i++){
if(!ss[i].isDisposed()&&ss[i].titleBar!=null&&ss[i].handle.style.display!=="none"){
ss[i].titleBar.style.backgroundColor="inactivecaption";
ss[i].shellTitle.style.color="inactivecaptiontext";
}}
}
});
c$.getTopMaximizedShell=$_M(c$,"getTopMaximizedShell",
function(){
if(!$wt.widgets.Display.topMaxShellNeedUpdated){
return $wt.widgets.Display.topMaxShell;
}var lastShell=null;
var lastMaxZIndex=0;
var disps=$wt.widgets.Display.Displays;
for(var k=0;k<disps.length;k++){
if(disps[k]==null)continue;var ss=disps[k].getShells();
for(var i=0;i<ss.length;i++){
if(!ss[i].isDisposed()&&ss[i].getMaximized()&&ss[i].handle.style.display!=="none"){
var idx=""+ss[i].handle.style.zIndex;
var zidx=0;
if(idx==null||idx.length==0){
zidx=0;
}else{
zidx=Integer.parseInt(idx);
}if(zidx>lastMaxZIndex){
lastMaxZIndex=zidx;
lastShell=ss[i];
}}}
}
($t$=$wt.widgets.Display.topMaxShell=lastShell,$wt.widgets.Display.prototype.topMaxShell=$wt.widgets.Display.topMaxShell,$t$);
($t$=$wt.widgets.Display.topMaxShellNeedUpdated=false,$wt.widgets.Display.prototype.topMaxShellNeedUpdated=$wt.widgets.Display.topMaxShellNeedUpdated,$t$);
return lastShell;
});
$_M(c$,"updateLayout",
function(){
if(this.taskBar!=null){
this.taskBar.updateLayout();
this.topBar.updateLayout();
this.shortcutBar.updateLayout();
this.trayCorner.updateLayout();
var panel=d$.getElementById("swt-desktop-panel");
if(panel!=null){
var height=O$.getFixedBodyClientHeight();
var width=O$.getFixedBodyClientWidth();
panel.style.width=width+"px";
panel.style.height=(height-80)+"px";
}}});
c$.updateMonitor=$_M(c$,"updateMonitor",
function(){
var disp=$wt.widgets.Display.Default;
if(disp==null||disp.isDisposed()){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
disp=$wt.widgets.Display.Displays[i];
if(disp!=null&&!disp.isDisposed()){
break;
}}
}if(disp!=null){
disp.updateLayout();
}});
c$.releaseAllDisplays=$_M(c$,"releaseAllDisplays",
function(){
($t$=$wt.widgets.Display.disposing=true,$wt.widgets.Display.prototype.disposing=$wt.widgets.Display.disposing,$t$);
var first=true;
if($wt.widgets.Display.Displays!=null){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var d=$wt.widgets.Display.Displays[i];
if(d!=null){
d.dispose();
if(first){
first=false;
if(d.trayCorner!=null){
d.trayCorner.releaseWidget();
d.trayCorner=null;
}if(d.taskBar!=null){
d.taskBar.releaseWidget();
d.taskBar=null;
}if(d.shortcutBar!=null){
d.shortcutBar.releaseWidget();
d.shortcutBar=null;
}if(d.topBar!=null){
d.topBar.releaseWidget();
d.topBar=null;
}if(d.tray!=null){
d.tray.dispose();
d.tray=null;
}}$wt.widgets.Display.Displays[i]=null;
}}
}($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
($t$=$wt.widgets.Display.topMaxShell=null,$wt.widgets.Display.prototype.topMaxShell=$wt.widgets.Display.topMaxShell,$t$);
if($wt.widgets.Display.hShellZOrdering!=null){
Clazz.removeEvent(document,"click",$wt.widgets.Display.hShellZOrdering);
($t$=$wt.widgets.Display.hShellZOrdering=null,$wt.widgets.Display.prototype.hShellZOrdering=$wt.widgets.Display.hShellZOrdering,$t$);
}O$.dispose();
});
c$.updateAllShellLayouts=$_M(c$,"updateAllShellLayouts",
function(){
if($wt.widgets.Display.Displays!=null){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var display=$wt.widgets.Display.Displays[i];
if(display!=null&&!display.isDisposed()){
var existedMaximized=false;
var shells=display.getShells();
for(var j=0;j<shells.length;j++){
var shell=shells[j];
if(shell!=null&&!shell.isDisposed()){
if((shell.style&(1248))!=0){
var bounds=shell.getBounds();
if(shell.getMaximized()&&shell.titleBar!=null){
shell.setMaximized(true);
existedMaximized=true;
continue;}else{
shell.SetWindowPos(shell.handle,null,bounds.x,bounds.y,bounds.width,bounds.height,0);
}}shell.layout(true,true);
}}
if(existedMaximized&&display.topBar!=null){
var topBar=display.topBar;
if(topBar.isVisible()){
topBar.returnTopMaximized(null);
topBar.updateLayout();
}}}}
}});
c$.initializeZOrdering=$_M(c$,"initializeZOrdering",
function(){
if($wt.widgets.Display.hShellZOrdering!=null){
return;
}($t$=$wt.widgets.Display.hShellZOrdering=$_Q((($_D("$wt.widgets.Display$4")?0:org.eclipse.swt.widgets.Display.$Display$4$()),$_N($wt.widgets.Display$4,this,null))),$wt.widgets.Display.prototype.hShellZOrdering=$wt.widgets.Display.hShellZOrdering,$t$);
Clazz.addEvent(document,"click",$wt.widgets.Display.hShellZOrdering);
});
c$.$Display$1$=function(){
$_H();
c$=$_W($wt.widgets,"Display$1",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
var e=this.getEvent();
var bottom=this.b$["$wt.widgets.Display"].getPrimaryMonitor().clientHeight-128;
var x=e.clientX;
var y=e.clientY;
if(x>264&&y>=100&&y<=bottom){
return;
}var now=System.currentTimeMillis();
var ctrlKey=e.ctrlKey;
this.b$["$wt.widgets.Display"].taskBar.mouseAlreadyMoved=true;
this.b$["$wt.widgets.Display"].shortcutBar.mouseAlreadyMoved=true;
this.b$["$wt.widgets.Display"].trayCorner.mouseAlreadyMoved=true;
this.b$["$wt.widgets.Display"].topBar.mouseAlreadyMoved=true;
var inDelay=(now-this.b$["$wt.widgets.Display"].taskBar.lastUpdated<=2000);
if(this.b$["$wt.widgets.Display"].taskBar.barEl!=null&&x<264){
if(this.b$["$wt.widgets.Display"].taskBar.isApproaching(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].taskBar.handleApproaching();
}else if(!inDelay&&this.b$["$wt.widgets.Display"].taskBar.isLeaving(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].taskBar.handleLeaving();
}}if(y>bottom){
if(this.b$["$wt.widgets.Display"].shortcutBar.isApproaching(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].shortcutBar.handleApproaching();
}else if(!inDelay&&this.b$["$wt.widgets.Display"].shortcutBar.isLeaving(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].shortcutBar.handleLeaving();
}}if(x+y<200){
if(this.b$["$wt.widgets.Display"].trayCorner.isApproaching(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].trayCorner.handleApproaching();
}else if(!inDelay&&this.b$["$wt.widgets.Display"].trayCorner.isLeaving(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].trayCorner.handleLeaving();
}}if(y<100){
if(this.b$["$wt.widgets.Display"].topBar.isApproaching(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].topBar.handleApproaching();
}else if(!inDelay&&this.b$["$wt.widgets.Display"].topBar.isLeaving(now,x,y,ctrlKey)){
this.b$["$wt.widgets.Display"].topBar.handleLeaving();
}}});
c$=$_P();
};
c$.$Display$2$=function(){
$_H();
c$=$_W($wt.widgets,"Display$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
ClazzLoader.loadClass('org.eclipse.swt.widgets.Console',function(){$wt.widgets.Console.openConsole();});
},"$wt.events.SelectionEvent");
c$=$_P();
};
c$.$Display$3$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.messageLoop=false;
$_Z(this,arguments);
},$wt.widgets,"Display$3",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runPopups();
var msgs=this.b$["$wt.widgets.Display"].msgs;
if(msgs.length==0&&this.messageLoop){
var layoutFinished=window["j2s.swt.shell.finish.layout"];
if(layoutFinished!=null){
layoutFinished();
}
this.messageLoop=false;
}if(msgs.length!=0){
this.messageLoop=true;
var idx=0;
for(var i=msgs.length-1;i>=0;i--){
var m1=msgs[i];
if(m1==null){
continue;}m1.defer=false;
for(var j=i-1;j>=0;j--){
var m2=msgs[j];
if(m2!=null&&m2.control===m1.control&&m2.type==m1.type){
msgs[j]=null;
}}
if(m1.type==2){
var p=m1.control.parent;
if(p!=null&&p.waitingForLayout){
m1.defer=true;
}}}
var time=0;
var deferred=false;
for(var i=0;i<msgs.length;i++){
var m=msgs[i];
if(m!=null&&m.defer){
deferred=true;
continue;}msgs[i]=null;
if(m!=null&&m.type==2){
m.control.waitingForLayout=false;
if(!m.control.isVisible()){
continue;}var d=System.currentTimeMillis();
var c=m.control;
if(c.waitingForLayoutWithResize){
c.setResizeChildren(false);
}if(c.$layout!=null){
c.$layout.layout(c,(c.state&64)!=0);
c.state&=-97;
}if(c.waitingForLayoutWithResize){
c.setResizeChildren(true);
c.waitingForLayoutWithResize=false;
}if(m.data!=null){
var bs=m.data;
c.updateLayout(bs[0],bs[1]);
}else{
c.layout();
}time+=System.currentTimeMillis()-d;
if(time>200){
idx=0;
if(deferred){
for(var j=0;j<i+1;j++){
m=msgs[j];
if(m!=null&&m.defer){
msgs[idx++]=m;
}msgs[j]=null;
}
}for(var j=i+1;j<msgs.length;j++){
msgs[idx++]=msgs[j];
msgs[j]=null;
}
{
msgs.length=idx;
}return;
}}}
idx=0;
if(deferred){
for(var j=0;j<msgs.length;j++){
var m=msgs[j];
if(m!=null&&m.defer){
msgs[idx++]=m;
}}
}{
msgs.length=idx;
}}});
c$=$_P();
};
c$.$Display$4$=function(){
$_H();
c$=$_W($wt.widgets,"Display$4",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
var evt=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var src=evt.target;
while(src!=null){
var className=src.className;
if(className!=null&&className.indexOf("shadow-")!=-1){
var allVisibleShells=$wt.widgets.Display.getAllVisibleShells();
for(var i=0;i<allVisibleShells.length;i++){
var bounds=allVisibleShells[i].getBounds();
if(evt.x>=bounds.x+2&&evt.x<=bounds.x+bounds.width-4&&evt.y>=bounds.y+2&&evt.y<=bounds.y+bounds.height-4){
allVisibleShells[i].bringToTop();
return;
}}
}if(O$.existedCSSClass(src,"shell-default")){
var displs=$wt.widgets.Display.Displays;
if(displs!=null){
for(var i=0;i<displs.length;i++){
var disp=displs[i];
if(disp!=null&&!disp.isDisposed()){
var ctrl=disp.getControl(src);
if(ctrl!=null&&$_O(ctrl,$wt.widgets.Shell)&&ctrl.isVisible()){
(ctrl).bringToTop();
}}}
}break;
}src=src.parentNode;
}
});
c$=$_P();
};
$_S(c$,
"GROW_SIZE",1024,
"ID_START",108,
"Default",null);
c$.Displays=c$.prototype.Displays=new Array(4);
$_S(c$,
"disposing",false,
"monitors",null,
"monitorCount",0,
"TrimEnabled",false,
"bodyHeight",null,
"bodyOverflow",null,
"htmlOverflow",null,
"bodyScrollTop",0,
"bodyScrollLeft",0,
"htmlScrollTop",0,
"htmlScrollLeft",0,
"AUTO_HIDE_DELAY",2000,
"topMaxShellNeedUpdated",true,
"topMaxShell",null,
"PACKAGE_PREFIX","org.eclipse.swt.widgets.",
"hShellZOrdering",null);


var cleanUpObject=new Object();
var f=function(){
try{
org.eclipse.swt.widgets.Display.releaseAllDisplays();
}catch(e){
}
O$.deepClearChildren(FontSizeSystem.monitorEl);
O$.destroyHandle(FontSizeSystem.monitorEl);
FontSizeSystem.monitorEl=null;
Clazz.removeEvent(window,"unload",cleanUpObject.f);
return true;
};
cleanUpObject.f=f;
Clazz.addEvent(window,"unload",f);
FontSizeSystem=new Object();
var fss=FontSizeSystem;
fss.monitorEl=null;
fss.cachedFontSize=10;
fss.isMonitoring=false;
fss.initialize=function(){
this.monitorEl=document.createElement("DIV");
this.monitorEl.id="swt-font-monitor";
this.monitorEl.style.cssText="position:absolute;top:-1000px;left:-1000px;font-family:Arial, sans-serif;font-size:10pt;overflow:visible;";
document.body.appendChild(this.monitorEl);
this.monitorEl.appendChild(document.createTextNode("Java2Script"));
this.cachedFontSize=this.getActualFontSize();
};
fss.getActualFontSize=function(){
var el=this.monitorEl;
return Math.max(el.offsetHeight,Math.max(el.clientHeight,el.scrollHeight));
};
fss.monitorFontSize=function(looping){
if(looping!=true&&this.isMonitoring){
return;
}
var el=this.monitorEl;
if(el==null){
this.initialize();
}else{
var width=this.getActualFontSize();
if(width!=this.cachedFontSize){
this.cachedFontSize=width;
org.eclipse.swt.widgets.Display.updateAllShellLayouts();
}
}
this.isMonitoring=true;
window.setTimeout(function(){
FontSizeSystem.monitorFontSize(true)
},250);
};
window.currentTopZIndex=1000;
});
