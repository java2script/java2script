Clazz.load(["$wt.graphics.Device","$.Cursor"],"$wt.widgets.Display",["java.lang.Runnable","$.StringBuffer","$.Thread","java.util.Date","$wt.SWT","$wt.graphics.Color","$.Font","$.Image","$.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.struct.MESSAGE","$wt.widgets.Control","$.Event","$.EventTable","$.ImageList","$.Menu","$.MenuItem","$.Monitor","$.Shell","$.Tray"],function(){
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
this.modalShells=null;
this.modalDialogShell=null;
this.hitCount=0;
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
if(this.bars[i]==menu)return;
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
if(this.popups[i]==menu)return;
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
$_V(c$,"checkDevice",
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
if(this.modalShells[index]==shell)break;
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
$wt.widgets.Display.checkDisplay(this.thread=Thread.currentThread(),true);
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
if(display==$wt.widgets.Display.Displays[i])$wt.widgets.Display.Displays[i]=null;
}
},"$wt.widgets.Display");
$_V(c$,"destroy",
function(){
if(this==$wt.widgets.Display.Default)($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
$wt.widgets.Display.deregister(this);
this.destroyDisplay();
});
$_M(c$,"destroyDisplay",
function(){
});
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
$WT.error(code);
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
if(display!=null&&display.thread==thread){
return display;
}}
return null;
},"Thread");
$_M(c$,"getActiveShell",
function(){
return null;
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Display,"getBounds",[]);
});
c$.getCurrent=$_M(c$,"getCurrent",
function(){
return $wt.widgets.Display.findDisplay(Thread.currentThread());
});
$_M(c$,"getClientArea",
function(){
return $_U(this,$wt.widgets.Display,"getClientArea",[]);
});
$_M(c$,"getControl",
function(handle){
if(handle==null)return null;
for(var i=0;i<this.controlTable.length;i++){
if(this.controlTable[i]!=null&&handle==this.controlTable[i].handle){
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
return name.substring(0,index+1).equals($wt.widgets.Display.PACKAGE_PREFIX);
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
$_M(c$,"getImageList",
function(style,width,height){
if(this.imageList==null)this.imageList=new Array(4);
var i=0;
var length=this.imageList.length;
while(i<length){
var list=this.imageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.imageList,0,newList,0,length);
this.imageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.imageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBar",
function(style,width,height){
if(this.toolImageList==null)this.toolImageList=new Array(4);
var i=0;
var length=this.toolImageList.length;
while(i<length){
var list=this.toolImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolImageList,0,newList,0,length);
this.toolImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarDisabled",
function(style,width,height){
if(this.toolDisabledImageList==null)this.toolDisabledImageList=new Array(4);
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
var list=this.toolDisabledImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolDisabledImageList,0,newList,0,length);
this.toolDisabledImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolDisabledImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarHot",
function(style,width,height){
if(this.toolHotImageList==null)this.toolHotImageList=new Array(4);
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
var list=this.toolHotImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolHotImageList,0,newList,0,length);
this.toolHotImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolHotImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getLastEventTime",
function(){
return parseInt(new java.util.Date().getTime());
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
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return[monitor];
});
$_M(c$,"getPrimaryMonitor",
function(){
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return monitor;
});
$_M(c$,"getShells",
function(){
var count=0;
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
return new $wt.graphics.Image(this,"j2slib/images/"+iconName+".png");
},"~N");
$_M(c$,"getSystemTray",
function(){
if(this.tray!=null)return this.tray;
return this.tray=new $wt.widgets.Tray(this,0);
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
});
$_M(c$,"isValidThread",
function(){
return this.thread==Thread.currentThread();
});
$_M(c$,"map",
function(from,to,point){
return this.map(from,to,point.x,point.y);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M(c$,"map",
function(from,to,x,y){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Point(0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N");
$_M(c$,"map",
function(from,to,rectangle){
return this.map(from,to,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M(c$,"map",
function(from,to,x,y,width,height){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Rectangle(0,0,0,0);
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
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$1",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$1,i$,v$);
})(this,null));
return false;
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
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$2",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$2,i$,v$);
})(this,null));
},"$wt.widgets.Event");
$_M(c$,"readAndDispatch",
function(){
this.drawMenuBars();
this.runPopups();
this.messageProc=w$.setInterval($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$3",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
var msgs=this.b$["$wt.widgets.Display"].msgs;
if(msgs.length!=0){
for(var i=msgs.length-1;i>=0;i--){
var m1=msgs[i];
if(m1==null){
continue;}for(var j=i-1;j>=0;j--){
var m2=msgs[j];
if(m2!=null&&m2.control==m1.control&&m2.type==m1.type){
msgs[j]=null;
break;
}}
}
var time=0;
for(var i=0;i<msgs.length;i++){
var m=msgs[i];
msgs[i]=null;
if(m!=null&&m.type==2){
if(!m.control.isVisible()){
continue;}var d=new java.util.Date();
var c=m.control;
if(m.data!=null){
var bs=m.data;
c.updateLayout(bs[0],bs[1]);
}else{
c.layout();
}time+=new java.util.Date().getTime()-d.getTime();
if(time>100){
for(var j=i+1;j<msgs.length;j++){
msgs[j-i-1]=msgs[j];
}
for(var j=0;j<i;j++){
msgs[msgs.length-1-j]=null;
}
{
msgs.length-=i+1;
}return;
}}}
{
msgs.length=0;
}}});
c$=$_P();
}
return $_N($wt.widgets.Display$3,i$,v$);
})(this,null)),20);
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
if(this.disposeList!=null){
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]!=null)this.disposeList[i].run();
}
}this.disposeList=null;
this.releaseDisplay();
$_U(this,$wt.widgets.Display,"release",[]);
});
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
}this.msgs=null;
});
$_M(c$,"releaseImageList",
function(list){
var i=0;
var length=this.imageList.length;
while(i<length){
if(this.imageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.imageList,i+1,this.imageList,i,--length-i);
this.imageList[length]=null;
for(var j=0;j<length;j++){
if(this.imageList[j]!=null)return;
}
this.imageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolImageList",
function(list){
var i=0;
var length=this.toolImageList.length;
while(i<length){
if(this.toolImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolImageList,i+1,this.toolImageList,i,--length-i);
this.toolImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolImageList[j]!=null)return;
}
this.toolImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolHotImageList",
function(list){
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
if(this.toolHotImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolHotImageList,i+1,this.toolHotImageList,i,--length-i);
this.toolHotImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolHotImageList[j]!=null)return;
}
this.toolHotImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolDisabledImageList",
function(list){
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
if(this.toolDisabledImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolDisabledImageList,i+1,this.toolDisabledImageList,i,--length-i);
this.toolDisabledImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolDisabledImageList[j]!=null)return;
}
this.toolDisabledImageList=null;
return;
}i++;
}
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
if(this.bars[i]==menu){
this.bars[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"removeControl",
function(handle){
if(handle==null)return null;
var control=null;
var index=0;
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
if(this.popups[i]==menu){
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
$_M(c$,"runTimer",
function(id){
if(this.timerList!=null&&this.timerIds!=null){
var index=0;
while(index<this.timerIds.length){
if(this.timerIds[index]==id){
w$.clearInterval(this.timerIds[index]);
this.timerIds[index]=0;
var runnable=this.timerList[index];
this.timerList[index]=null;
if(runnable!=null)runnable.run();
return true;
}index++;
}
}return false;
},"~N");
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
if(this.modalShells[index]==shell)return;
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
if(this.timerList[index]==runnable)break;
index++;
}
var timerId=0;
if(index!=this.timerList.length){
timerId=this.timerIds[index];
if(milliseconds<0){
w$.clearInterval(timerId);
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
}}var newTimerID=w$.setTimeout($_Q(runnable),milliseconds);
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
c$.withCrLf=$_M(c$,"withCrLf",
function(string){
var length=string.length;
if(length==0)return string;
var i=string.indexOf('\n',0);
if(i==-1)return string;
if(i>0&&(string.charAt(i-1)).charCodeAt(0)==('\r').charCodeAt(0)){
return string;
}i++;
var count=1;
while(i<length){
if((i=string.indexOf('\n',i))==-1)break;
count++;
i++;
}
count+=length;
i=0;
var result=new StringBuffer(count);
while(i<length){
var j=string.indexOf('\n',i);
if(j==-1)j=length;
result.append(string.substring(i,j));
if((i=j)<length){
result.append("\r\n");
i++;
}}
return result.toString();
},"~S");
c$.releaseAllDisplays=$_M(c$,"releaseAllDisplays",
function(){
if($wt.widgets.Display.Displays!=null){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
$wt.widgets.Display.Displays[i].dispose();
$wt.widgets.Display.Displays[i]=null;
}}
($t$=$wt.widgets.Display.Displays=null,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
}($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
});
$_S(c$,
"GROW_SIZE",1024,
"ID_START",108,
"Default",null);
c$.Displays=c$.prototype.Displays=new Array(4);
$_S(c$,
"monitors",null,
"monitorCount",0,
"TrimEnabled",false,
"PACKAGE_PREFIX","org.eclipse.swt.widgets.");


if(window.attachEvent){
window.attachEvent("onunload",function(){
try{
org.eclipse.swt.widgets.Display.releaseAllDisplays();

}catch(e){


}
return true;
});
}
});
