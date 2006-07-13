Clazz.load(null,"$wt.widgets.Widget",["java.lang.Runnable","$.Thread","$wt.SWT","$wt.internal.RunnableCompatibility","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Display","$.Event","$.EventTable","$.TypedListener"],function(){
c$=$_C(function(){
this.handle=null;
this.style=0;
this.state=0;
this.display=null;
this.eventTable=null;
this.data=null;
this.dragStatus=false;
this.hoverTime=0;
this.hoverTimerID=0;
this.hookedStatus=null;
$_Z(this,arguments);
},$wt.widgets,"Widget");
$_K(c$,
function(parent,style){
this.checkSubclass();
this.checkParent(parent);
this.style=style;
this.display=parent.display;
},"$wt.widgets.Widget,~N");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
this.checkHookType(eventType);
},"~N,$wt.widgets.Listener");
$_M(c$,"addDisposeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(12,typedListener);
},"$wt.events.DisposeListener");
$_M(c$,"callWindowProc",
function(hwnd,msg,wParam,lParam){
return 0;
},"~N,~N,~N,~N");
c$.checkBits=$_M(c$,"checkBits",
function(style,int0,int1,int2,int3,int4,int5){
var mask=int0|int1|int2|int3|int4|int5;
if((style&mask)==0)style|=int0;
if((style&int0)!=0)style=(style&~mask)|int0;
if((style&int1)!=0)style=(style&~mask)|int1;
if((style&int2)!=0)style=(style&~mask)|int2;
if((style&int3)!=0)style=(style&~mask)|int3;
if((style&int4)!=0)style=(style&~mask)|int4;
if((style&int5)!=0)style=(style&~mask)|int5;
return style;
},"~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"checkHookType",
function(eventType){
if(this.hookedStatus==null){
this.hookedStatus=$_A(38,false);
}var hooked=false;
if(eventType>=0&&eventType<=37){
hooked=this.hookedStatus[eventType];
}if(hooked){
return;
}switch(eventType){
case 1:
this.hookKeyDown();
break;
case 2:
this.hookKeyUp();
break;
case 3:
this.hookMouseDown();
break;
case 4:
this.hookMouseUp();
break;
case 5:
this.hookMouseMove();
break;
case 6:
this.hookMouseEnter();
break;
case 7:
this.hookMouseExit();
break;
case 8:
this.hookMouseDoubleClick();
break;
case 13:
this.hookSelection();
break;
case 15:
this.hookFocusIn();
break;
case 16:
this.hookFocusOut();
break;
case 24:
this.hookModify();
break;
case 25:
if(!this.hookedStatus[1])this.hookKeyDown();
this.hookedStatus[1]=true;
break;
case 28:
this.hookHelp();
break;
case 29:
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 30:
this.hookArm();
break;
case 31:
this.hookTraverse();
break;
case 32:
if(!this.hookedStatus[6])this.hookMouseEnter();
if(!this.hookedStatus[7])this.hookMouseExit();
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[6]=true;
this.hookedStatus[7]=true;
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 35:
this.hookMenuDetect();
break;
case 37:
this.hookMouseWheel();
break;
}
this.hookedStatus[eventType]=true;
},"~N");
$_M(c$,"checkOrientation",
function(parent){
this.style&=-134217729;
if((this.style&(100663296))==0){
if(parent!=null){
if((parent.style&33554432)!=0)this.style|=33554432;
if((parent.style&67108864)!=0)this.style|=67108864;
}}this.style=$wt.widgets.Widget.checkBits(this.style,33554432,67108864,0,0,0,0);
},"$wt.widgets.Widget");
$_M(c$,"checkOpened",
function(){
});
$_M(c$,"checkParent",
function(parent){
parent.checkOpened();
},"$wt.widgets.Widget");
$_M(c$,"checkSubclass",
function(){
});
$_M(c$,"checkWidget",
function(){
var display=this.display;
});
$_M(c$,"destroyWidget",
function(){
this.releaseHandle();
if(this.hoverTimerID!=0){
w$.clearTimeout(this.hoverTimerID);
}});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.releaseChild();
this.releaseWidget();
this.destroyWidget();
});
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"filters",
function(eventType){
return this.display.filters(eventType);
},"~N");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"fixMnemonic",
function(string){
var buffer=$_A(string.length,'\0');
string.getChars(0,string.length,buffer,0);
var i=0;
var j=0;
while(i<buffer.length){
if((buffer[i]).charCodeAt(0)==('&').charCodeAt(0)){
if(i+1<buffer.length&&(buffer[i+1]).charCodeAt(0)==('&').charCodeAt(0)){
buffer[j++]=' ';
i++;
}i++;
}else{
buffer[j++]=buffer[i++];
}}
while(j<buffer.length)buffer[j++]=String.fromCharCode(0);

return buffer;
},"~S");
$_M(c$,"getData",
function(){
return(this.state&4)!=0?(this.data)[0]:this.data;
});
$_M(c$,"getData",
function(key){
if((this.state&4)!=0){
var table=this.data;
for(var i=1;i<table.length;i+=2){
if(key.equals(table[i]))return table[i+1];
}
}return null;
},"~S");
$_M(c$,"getDisplay",
function(){
var display=this.display;
return display;
});
$_M(c$,"getMenu",
function(){
return null;
});
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_M(c$,"getNameText",
function(){
return"";
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"hookKeyDown",
function(){
this.handle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(1);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$1,i$,v$);
})(this,null));
});
$_M(c$,"hookKeyUp",
function(){
this.handle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if((e.event).keyCode==27){
this.b$["$wt.widgets.Widget"].dragStatus=false;
}this.b$["$wt.widgets.Widget"].sendEvent(2);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$2,i$,v$);
})(this,null));
});
$_M(c$,"mouseHoverProc",
function(){
var hoverHooked=false;
if(this.hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.hoverTimerID);
this.hoverTimerID=0;
}if(hoverHooked||this.hooks(32)){
hoverHooked=true;
this.hoverTimerID=w$.setTimeout($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$3",null,Runnable);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Widget"].isDisposed()){
this.b$["$wt.widgets.Widget"].sendEvent(32);
}this.b$["$wt.widgets.Widget"].hoverTimerID=0;
});
c$=$_P();
}
return $_N($wt.widgets.Widget$3,i$,v$);
})(this,null)),400);
}return hoverHooked;
});
$_M(c$,"hookMouseDown",
function(){
this.handle.onmousedown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(e.leftButtonHold){
this.b$["$wt.widgets.Widget"].dragStatus=true;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(3)){
this.b$["$wt.widgets.Widget"].sendEvent(3);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$4,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseUp",
function(){
this.handle.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
this.b$["$wt.widgets.Widget"].dragStatus=false;
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(4)){
this.b$["$wt.widgets.Widget"].sendEvent(4);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$5,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseMove",
function(){
this.handle.onmousemove=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var dragHooked=false;
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(this.b$["$wt.widgets.Widget"].dragStatus&&e.leftButtonHold&&this.b$["$wt.widgets.Widget"].hooks(29)){
dragHooked=true;
this.b$["$wt.widgets.Widget"].sendEvent(29);
this.b$["$wt.widgets.Widget"].dragStatus=false;
}if((!dragHooked&&!hoverHooked)||this.b$["$wt.widgets.Widget"].hooks(5)){
this.b$["$wt.widgets.Widget"].sendEvent(5);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$6,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseEnter",
function(){
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(6)){
this.b$["$wt.widgets.Widget"].sendEvent(6);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$7,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseExit",
function(){
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=false;
if(this.b$["$wt.widgets.Widget"].hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.b$["$wt.widgets.Widget"].hoverTimerID);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(7)){
this.b$["$wt.widgets.Widget"].sendEvent(7);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$8,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseDoubleClick",
function(){
this.handle.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(8);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$9,i$,v$);
})(this,null));
});
$_M(c$,"hookSelection",
function(){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$10")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$10",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$10,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusIn",
function(){
this.handle.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$11")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$11",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(15);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$11,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusOut",
function(){
this.handle.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$12")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$12",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(16);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$12,i$,v$);
})(this,null));
});
$_M(c$,"hookModify",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$13")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$13",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(24);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$13,i$,v$);
})(this,null));
});
$_M(c$,"hookHelp",
function(){
this.handle.onhelp=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$14")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$14",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(28);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$14,i$,v$);
})(this,null));
});
$_M(c$,"hookArm",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$15")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$15",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(30);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$15,i$,v$);
})(this,null));
});
$_M(c$,"hookTraverse",
function(){
this.handle.onkeypress=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$16")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$16",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
});
c$=$_P();
}
return $_N($wt.widgets.Widget$16,i$,v$);
})(this,null));
});
$_M(c$,"hookMenuDetect",
function(){
this.handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$17")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$17",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(35);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$17,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseWheel",
function(){
});
$_M(c$,"hooks",
function(eventType){
if(this.eventTable==null)return false;
return this.eventTable.hooks(eventType);
},"~N");
$_M(c$,"isDisposed",
function(){
return(this.state&1)!=0;
});
$_M(c$,"isListening",
function(eventType){
return this.hooks(eventType);
},"~N");
$_M(c$,"isValidSubclass",
function(){
return $wt.widgets.Display.isValidClass(this.getClass());
});
$_M(c$,"isValidThread",
function(){
return true;
});
$_M(c$,"mapEvent",
function(hwnd,event){
},"~N,$wt.widgets.Event");
$_M(c$,"notifyListeners",
function(eventType,event){
if(event==null)event=new $wt.widgets.Event();
this.sendEvent(eventType,event);
},"~N,$wt.widgets.Event");
$_M(c$,"postEvent",
function(eventType){
this.sendEvent(eventType,null,false);
},"~N");
$_M(c$,"postEvent",
function(eventType,event){
this.sendEvent(eventType,event,false);
},"~N,$wt.widgets.Event");
$_M(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
this.state|=1;
this.display=null;
});
$_M(c$,"releaseResources",
function(){
this.releaseWidget();
this.releaseHandle();
});
$_M(c$,"releaseWidget",
function(){
this.sendEvent(12);
this.eventTable=null;
this.data=null;
});
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"removeDisposeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(12,listener);
},"$wt.events.DisposeListener");
$_M(c$,"sendEvent",
function(event){
var display=event.display;
if(display==null){
event.display=display=this.display;
}if(!display.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType){
this.sendEvent(eventType,null,true);
},"~N");
$_M(c$,"sendEvent",
function(eventType,event){
this.sendEvent(eventType,event,true);
},"~N,$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType,event,send){
if(this.eventTable==null&&!this.display.filters(eventType)){
return;
}if(event==null)event=new $wt.widgets.Event();
event.type=eventType;
event.display=this.display;
event.widget=this;
if(event.time==0){
event.time=this.display.getLastEventTime();
}if(send){
this.sendEvent(event);
}else{
this.display.postEvent(event);
}},"~N,$wt.widgets.Event,~B");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam){
var event=new $wt.widgets.Event();
return this.sendKeyEvent(type,msg,wParam,lParam,event);
},"~N,~N,~N,~N");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
this.sendEvent(type,event);
if(this.isDisposed())return false;
return event.doit;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"sendMouseEvent",
function(type,button,hwnd,x,y){
return this.sendMouseEvent(type,button,0,0,false,hwnd,x,y);
},"~N,~N,~O,~N,~N");
$_M(c$,"sendMouseEvent",
function(type,button,count,detail,send,hwnd,x,y){
if(!this.hooks(type)&&!this.filters(type))return true;
var event=new $wt.widgets.Event();
event.button=button;
event.detail=detail;
event.count=count;
event.x=x;
event.y=y;
switch(type){
case 3:
case 8:
if(event.button==1)event.stateMask&=-524289;
if(event.button==2)event.stateMask&=-1048577;
if(event.button==3)event.stateMask&=-2097153;
if(event.button==4)event.stateMask&=-8388609;
if(event.button==5)event.stateMask&=-33554433;
break;
case 4:
if(event.button==1)event.stateMask|=524288;
if(event.button==2)event.stateMask|=1048576;
if(event.button==3)event.stateMask|=2097152;
if(event.button==4)event.stateMask|=8388608;
if(event.button==5)event.stateMask|=33554432;
break;
}
if(send){
this.sendEvent(type,event);
if(this.isDisposed())return false;
}else{
this.postEvent(type,event);
}return event.doit;
},"~N,~N,~N,~N,~B,~O,~N,~N");
$_M(c$,"setData",
function(data){
if((this.state&4)!=0){
(this.data)[0]=data;
}else{
this.data=data;
}},"~O");
$_M(c$,"setData",
function(key,value){
var index=1;
var table=null;
if((this.state&4)!=0){
table=this.data;
while(index<table.length){
if(key.equals(table[index]))break;
index+=2;
}
}if(value!=null){
if((this.state&4)!=0){
if(index==table.length){
var newTable=new Array(table.length+2);
System.arraycopy(table,0,newTable,0,table.length);
this.data=table=newTable;
}}else{
table=new Array(3);
table[0]=this.data;
this.data=table;
this.state|=4;
}table[index]=key;
table[index+1]=value;
}else{
if((this.state&4)!=0){
if(index!=table.length){
var length=table.length-2;
if(length==1){
this.data=table[0];
this.state&=-5;
}else{
var newTable=new Array(length);
System.arraycopy(table,0,newTable,0,index);
System.arraycopy(table,index+2,newTable,index,length-index);
this.data=newTable;
}}}}},"~S,~O");
$_M(c$,"sendFocusEvent",
function(type){
this.sendEvent(type);
return true;
},"~N");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if(hWnd==null)return true;
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"showMenu",
function(x,y){
var event=new $wt.widgets.Event();
event.x=x;
event.y=y;
this.sendEvent(35,event);
if(!event.doit)return true;
var menu=this.getMenu();
if(menu!=null&&!menu.isDisposed()){
if(x!=event.x||y!=event.y){
menu.setLocation(event.x,event.y);
}menu.setVisible(true);
return true;
}return false;
},"~N,~N");
$_V(c$,"toString",
function(){
var string="*Disposed*";
if(!this.isDisposed()){
string="*Wrong Thread*";
if(this.isValidThread())string=this.getNameText();
}return this.getName()+" {"+string+"}";
});
$_S(c$,
"DISPOSED",1,
"CANVAS",2,
"KEYED_DATA",4,
"DISABLED",8,
"HIDDEN",16,
"LAYOUT_NEEDED",32,
"LAYOUT_CHANGED",64,
"DEFAULT_WIDTH",64,
"DEFAULT_HEIGHT",64);
});
