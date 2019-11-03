$_L(null,"$wt.widgets.Widget",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Display","$.Event","$.EventTable","$.TypedListener"],function(){
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
this.waitingForLayout=false;
this.hookedStatus=null;
this.styleChecked=false;
this.hKeyPress=null;
this.hKeyDown=null;
this.hKeyUp=null;
this.hFocusIn=null;
this.hFocusOut=null;
this.hMouseMove=null;
this.hMouseDown=null;
this.hMouseUp=null;
this.hMouseEnter=null;
this.hMouseExit=null;
this.hMouseDoubleClick=null;
this.hMouseWheel=null;
this.hSelection=null;
this.hModify=null;
this.hMenuDetect=null;
this.hHelp=null;
$_Z(this,arguments);
},$wt.widgets,"Widget");
$_K(c$,
function(parent,style){
this.checkParent(parent);
this.style=style;
{
if(!this.styleChecked&&this.checkStyle!=null
&&this.checkStyle.funParams=="\Number"){
this.style=this.checkStyle(this.style);
this.styleChecked=true;
}
}this.display=parent.display;
this.waitingForLayout=true;
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
}if(hooked||this.handle==null){
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
$_M(c$,"_updateOrientation",
function(){
if((this.style&67108864)!=0){
this.handle.style.direction="rtl";
}else{
this.handle.style.direction="ltr";
}});
$_M(c$,"checkOpened",
function(){
});
$_M(c$,"checkParent",
function(parent){
parent.checkOpened();
},"$wt.widgets.Widget");
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
throw"SWT.error ("+code+")";
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
if(this.hKeyDown!=null){
return;
}this.hKeyDown=$_Q((($_D("$wt.widgets.Widget$1")?0:org.eclipse.swt.widgets.Widget.$Widget$1$()),$_N($wt.widgets.Widget$1,this,null)));
Clazz.addEvent(this.handle,"keydown",this.hKeyDown);
this.hookKeyPress();
});
$_M(c$,"hookKeyPress",
($fz=function(){
if(this.hKeyPress!=null){
return;
}this.hKeyPress=$_Q((($_D("$wt.widgets.Widget$2")?0:org.eclipse.swt.widgets.Widget.$Widget$2$()),$_N($wt.widgets.Widget$2,this,null)));
Clazz.addEvent(this.handle,"keypress",this.hKeyPress);
},$fz.isPrivate=true,$fz));
$_M(c$,"hookKeyUp",
function(){
if(this.hKeyUp!=null){
return;
}this.hKeyUp=$_Q((($_D("$wt.widgets.Widget$3")?0:org.eclipse.swt.widgets.Widget.$Widget$3$()),$_N($wt.widgets.Widget$3,this,null)));
Clazz.addEvent(this.handle,"keyup",this.hKeyUp);
this.hookKeyPress();
});
$_M(c$,"mouseHoverProc",
function(clear){
var hoverHooked=false;
if(this.hoverTimerID!=0&&clear){
hoverHooked=true;
w$.clearTimeout(this.hoverTimerID);
this.hoverTimerID=0;
}if(hoverHooked||this.hooks(32)){
hoverHooked=true;
if(this.hoverTimerID==0){
this.hoverTimerID=w$.setTimeout($_Q((($_D("$wt.widgets.Widget$4")?0:org.eclipse.swt.widgets.Widget.$Widget$4$()),$_N($wt.widgets.Widget$4,this,null))),400);
}}return hoverHooked;
},"~B");
$_M(c$,"hookMouseDown",
function(){
if(this.hMouseDown!=null){
return;
}this.hMouseDown=$_Q((($_D("$wt.widgets.Widget$5")?0:org.eclipse.swt.widgets.Widget.$Widget$5$()),$_N($wt.widgets.Widget$5,this,null)));
Clazz.addEvent(this.handle,"mousedown",this.hMouseDown);
});
$_M(c$,"hookMouseUp",
function(){
if(this.hMouseUp!=null){
return;
}this.hMouseUp=$_Q((($_D("$wt.widgets.Widget$6")?0:org.eclipse.swt.widgets.Widget.$Widget$6$()),$_N($wt.widgets.Widget$6,this,null)));
Clazz.addEvent(this.handle,"mouseup",this.hMouseUp);
});
$_M(c$,"hookMouseMove",
function(){
if(this.hMouseMove!=null){
return;
}this.hMouseMove=$_Q((($_D("$wt.widgets.Widget$7")?0:org.eclipse.swt.widgets.Widget.$Widget$7$()),$_N($wt.widgets.Widget$7,this,null)));
Clazz.addEvent(this.handle,"mousemove",this.hMouseMove);
});
$_M(c$,"hookMouseEnter",
function(){
if(this.hMouseEnter!=null){
return;
}this.hMouseEnter=$_Q((($_D("$wt.widgets.Widget$8")?0:org.eclipse.swt.widgets.Widget.$Widget$8$()),$_N($wt.widgets.Widget$8,this,null)));
Clazz.addEvent(this.handle,"mouseover",this.hMouseEnter);
});
$_M(c$,"hookMouseExit",
function(){
if(this.hMouseExit!=null){
return;
}this.hMouseExit=$_Q((($_D("$wt.widgets.Widget$9")?0:org.eclipse.swt.widgets.Widget.$Widget$9$()),$_N($wt.widgets.Widget$9,this,null)));
Clazz.addEvent(this.handle,"mouseout",this.hMouseExit);
});
$_M(c$,"hookMouseDoubleClick",
function(){
if(this.hMouseDoubleClick!=null){
return;
}this.hMouseDoubleClick=$_Q((($_D("$wt.widgets.Widget$10")?0:org.eclipse.swt.widgets.Widget.$Widget$10$()),$_N($wt.widgets.Widget$10,this,null)));
Clazz.addEvent(this.handle,"dblclick",this.hMouseDoubleClick);
});
$_M(c$,"hookSelection",
function(){
if(this.hSelection!=null){
return;
}this.hSelection=$_Q((($_D("$wt.widgets.Widget$11")?0:org.eclipse.swt.widgets.Widget.$Widget$11$()),$_N($wt.widgets.Widget$11,this,null)));
Clazz.addEvent(this.handle,"click",this.hSelection);
});
$_M(c$,"hookFocusIn",
function(){
if(this.hFocusIn!=null){
return;
}this.hFocusIn=$_Q((($_D("$wt.widgets.Widget$12")?0:org.eclipse.swt.widgets.Widget.$Widget$12$()),$_N($wt.widgets.Widget$12,this,null)));
Clazz.addEvent(this.handle,"focus",this.hFocusIn);
});
$_M(c$,"hookFocusOut",
function(){
if(this.hFocusOut!=null){
return;
}this.hFocusOut=$_Q((($_D("$wt.widgets.Widget$13")?0:org.eclipse.swt.widgets.Widget.$Widget$13$()),$_N($wt.widgets.Widget$13,this,null)));
Clazz.addEvent(this.handle,"blur",this.hFocusOut);
});
$_M(c$,"hookModify",
function(){
if(this.hModify!=null){
return;
}this.hModify=$_Q((($_D("$wt.widgets.Widget$14")?0:org.eclipse.swt.widgets.Widget.$Widget$14$()),$_N($wt.widgets.Widget$14,this,null)));
Clazz.addEvent(this.handle,"change",this.hModify);
});
$_M(c$,"hookHelp",
function(){
if(this.hHelp!=null){
return;
}this.hHelp=$_Q((($_D("$wt.widgets.Widget$15")?0:org.eclipse.swt.widgets.Widget.$Widget$15$()),$_N($wt.widgets.Widget$15,this,null)));
Clazz.addEvent(this.handle,"help",this.hHelp);
});
$_M(c$,"hookArm",
function(){
});
$_M(c$,"hookTraverse",
function(){
});
$_M(c$,"hookMenuDetect",
function(){
if(this.hMenuDetect!=null){
return;
}this.hMenuDetect=$_Q((($_D("$wt.widgets.Widget$16")?0:org.eclipse.swt.widgets.Widget.$Widget$16$()),$_N($wt.widgets.Widget$16,this,null)));
Clazz.addEvent(this.handle,"contextmenu",this.hMenuDetect);
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
if(this.handle!=null){
if(this.hFocusIn!=null){
Clazz.removeEvent(this.handle,"focus",this.hFocusIn);
this.hFocusIn=null;
}if(this.hFocusOut!=null){
Clazz.removeEvent(this.handle,"blur",this.hFocusOut);
this.hFocusOut=null;
}if(this.hKeyDown!=null){
Clazz.removeEvent(this.handle,"keydown",this.hKeyDown);
this.hKeyDown=null;
}if(this.hKeyUp!=null){
Clazz.removeEvent(this.handle,"keyup",this.hKeyUp);
this.hKeyUp=null;
}if(this.hKeyPress!=null){
Clazz.removeEvent(this.handle,"keypress",this.hKeyPress);
this.hKeyPress=null;
}if(this.hMouseDown!=null){
Clazz.removeEvent(this.handle,"mousedown",this.hMouseDown);
this.hMouseDown=null;
}if(this.hMouseUp!=null){
Clazz.removeEvent(this.handle,"mouseup",this.hMouseUp);
this.hMouseUp=null;
}if(this.hMouseEnter!=null){
Clazz.removeEvent(this.handle,"mouseover",this.hMouseEnter);
this.hMouseEnter=null;
}if(this.hMouseExit!=null){
Clazz.removeEvent(this.handle,"mouseout",this.hMouseExit);
this.hMouseExit=null;
}if(this.hMouseDoubleClick!=null){
Clazz.removeEvent(this.handle,"dblclick",this.hMouseDoubleClick);
this.hMouseDoubleClick=null;
}if(this.hMouseMove!=null){
Clazz.removeEvent(this.handle,"mousemove",this.hMouseMove);
this.hMouseMove=null;
}if(this.hMouseWheel!=null){
Clazz.removeEvent(this.handle,"scroll",this.hMouseWheel);
this.hMouseWheel=null;
}if(this.hSelection!=null){
Clazz.removeEvent(this.handle,"click",this.hSelection);
this.hSelection=null;
}if(this.hMenuDetect!=null){
Clazz.removeEvent(this.handle,"contextmenu",this.hMenuDetect);
this.hMenuDetect=null;
}if(this.hModify!=null){
Clazz.removeEvent(this.handle,"change",this.hModify);
this.hModify=null;
}if(this.hHelp!=null){
Clazz.removeEvent(this.handle,"help",this.hHelp);
this.hHelp=null;
}O$.destroyHandle(this.handle);
this.handle=null;
}});
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
if(table==null)return;
while(index<table.length){
if(key.equals(table[index]))break;
index+=2;
}
}if(value!=null){
if((this.state&4)!=0){
if(table==null)return;
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
if(table==null)return;
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
c$.$Widget$1$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Widget"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=1;
event.display=this.b$["$wt.widgets.Widget"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Widget"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Widget"].display.getLastEventTime();
}this.b$["$wt.widgets.Widget"].sendEvent(event);
});
c$=$_P();
};
c$.$Widget$2$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var e=evt.event;
var kc=0;
{
if(e.which){
kc=e.which;
}else{
kc=e.keyCode;
}
}($t$=O$.isCapsLockOn=(kc>64&&kc<91&&!e.shiftKey)||(kc>=97&&kc<=122&&e.shiftKey),O$.prototype.isCapsLockOn=O$.isCapsLockOn,$t$);
});
c$=$_P();
};
c$.$Widget$3$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var evt=e.event;
var keyCode=evt.keyCode;
if(keyCode==27){
this.b$["$wt.widgets.Widget"].dragStatus=false;
}var event=new $wt.widgets.Event();
event.character=O$.getInputCharacter(evt.keyCode,evt.shiftKey);
event.keyCode=(event.character).charCodeAt(0);
event.type=2;
event.display=this.b$["$wt.widgets.Widget"].display;
event.stateMask=(evt.altKey?65536:0)|(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
event.widget=this.b$["$wt.widgets.Widget"];
if(event.time==0){
event.time=this.b$["$wt.widgets.Widget"].display.getLastEventTime();
}this.b$["$wt.widgets.Widget"].sendEvent(event);
});
c$=$_P();
};
c$.$Widget$4$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$4",null,Runnable);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Widget"].isDisposed()){
this.b$["$wt.widgets.Widget"].sendEvent(32);
}this.b$["$wt.widgets.Widget"].hoverTimerID=0;
});
c$=$_P();
};
c$.$Widget$5$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc(true);
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(e.leftButtonHold){
this.b$["$wt.widgets.Widget"].dragStatus=true;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(3)){
this.b$["$wt.widgets.Widget"].sendMouseEvent(3,(this.getEvent()).button,e.target,e.x,e.y);
}});
c$=$_P();
};
c$.$Widget$6$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc(true);
this.b$["$wt.widgets.Widget"].dragStatus=false;
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(4)){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
this.b$["$wt.widgets.Widget"].sendMouseEvent(4,(this.getEvent()).button,e.target,e.x,e.y);
}});
c$=$_P();
};
c$.$Widget$7$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var widgetThis=this.b$["$wt.widgets.Widget"];
{
if(O$.isIE){
if(e.x==widgetThis.lastMouseMoveX&&e.y==widgetThis.lastMouseMoveY){
return true;
}
widgetThis.lastMouseMoveX=e.x;
widgetThis.lastMouseMoveY=e.y;
}
}var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc(false);
var dragHooked=false;
if(this.b$["$wt.widgets.Widget"].dragStatus&&e.leftButtonHold&&this.b$["$wt.widgets.Widget"].hooks(29)){
dragHooked=true;
this.b$["$wt.widgets.Widget"].sendEvent(29);
this.b$["$wt.widgets.Widget"].dragStatus=false;
}if((!dragHooked&&!hoverHooked)||this.b$["$wt.widgets.Widget"].hooks(5)){
this.b$["$wt.widgets.Widget"].sendMouseEvent(5,(this.getEvent()).button,e.target,e.x,e.y);
}this.toReturn(true);
});
c$=$_P();
};
c$.$Widget$8$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc(true);
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(6)){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
this.b$["$wt.widgets.Widget"].sendMouseEvent(6,(this.getEvent()).button,e.target,e.x,e.y);
}});
c$=$_P();
};
c$.$Widget$9$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=false;
if(this.b$["$wt.widgets.Widget"].hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.b$["$wt.widgets.Widget"].hoverTimerID);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(7)){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
this.b$["$wt.widgets.Widget"].sendMouseEvent(7,(this.getEvent()).button,e.target,e.x,e.y);
}});
c$=$_P();
};
c$.$Widget$10$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$10",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
this.b$["$wt.widgets.Widget"].sendMouseEvent(8,(this.getEvent()).button,e.target,e.x,e.y);
});
c$=$_P();
};
c$.$Widget$11$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$11",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(13);
});
c$=$_P();
};
c$.$Widget$12$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$12",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(15);
});
c$=$_P();
};
c$.$Widget$13$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$13",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(16);
});
c$=$_P();
};
c$.$Widget$14$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$14",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(24);
});
c$=$_P();
};
c$.$Widget$15$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$15",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(28);
});
c$=$_P();
};
c$.$Widget$16$=function(){
$_H();
c$=$_W($wt.widgets,"Widget$16",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(35);
});
c$=$_P();
};
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
