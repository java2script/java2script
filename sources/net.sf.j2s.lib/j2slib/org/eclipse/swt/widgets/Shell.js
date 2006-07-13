Clazz.load(["$wt.widgets.Decorations"],"$wt.widgets.Shell",["$wt.graphics.Point","$wt.widgets.Control","$.Display","$.TypedListener"],function(){
c$=$_C(function(){
this.activeMenu=null;
this.minWidth=-1;
this.minHeight=-1;
this.showWithParent=false;
this.lastActive=null;
this.region=null;
$_Z(this,arguments);
},$wt.widgets,"Shell",$wt.widgets.Decorations);
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(style){
this.construct(null,style);
},"~N");
$_K(c$,
function(display){
this.construct(display,1264);
},"$wt.widgets.Display");
$_K(c$,
function(display,style){
this.construct(display,null,style,0);
},"$wt.widgets.Display,~N");
$_K(c$,
function(display,parent,style,handle){
this.checkSubclass();
this.children=new Array(0);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.style=$wt.widgets.Shell.checkStyle(style);
this.parent=parent;
this.display=display;
this.createWidget();
},"$wt.widgets.Display,$wt.widgets.Shell,~N,~N");
$_K(c$,
function(parent){
this.construct(parent,2144);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.construct(parent!=null?parent.display:null,parent,style,0);
},"$wt.widgets.Shell,~N");
c$.win32_new=$_M(c$,"win32_new",
function(display,handle){
return new $wt.widgets.Shell(display,null,8,handle);
},"$wt.widgets.Display,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Decorations.checkStyle(style);
var mask=229376;
var bits=style&~mask;
if((style&131072)!=0)return bits|131072;
if((style&65536)!=0)return bits|65536;
if((style&32768)!=0)return bits|32768;
return bits;
},"~N");
$_M(c$,"addShellListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(21,typedListener);
this.addListener(19,typedListener);
this.addListener(20,typedListener);
this.addListener(26,typedListener);
this.addListener(27,typedListener);
},"$wt.events.ShellListener");
$_M(c$,"close",
function(){
this.closeWidget();
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Shell,"createHandle",[]);
});
$_M(c$,"dispose",
function(){
$_U(this,$wt.widgets.Shell,"dispose",[]);
});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}},"~B");
$_V(c$,"findCursor",
function(){
return this.cursor;
});
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"fixShell",
function(newShell,control){
if(this==newShell)return;
if(control==this.lastActive)this.setActiveControl(null);
newShell.setToolTipText(control.handle,control.toolTipText);
},"$wt.widgets.Shell,$wt.widgets.Control");
$_M(c$,"forceActive",
function(){
if(!this.isVisible())return;
});
$_V(c$,"forceResize",
function(){
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Shell,"getBounds",[]);
});
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getImeInputMode",
function(){
return 0;
});
$_M(c$,"getLocation",
function(){
return $_U(this,$wt.widgets.Shell,"getLocation",[]);
});
$_M(c$,"getMinimumSize",
function(){
var width=Math.max(0,this.minWidth);
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
width=Math.max(width,80);
}var height=Math.max(0,this.minHeight);
if((this.style&8)==0&&(this.style&trim)!=0){
if((this.style&16)!=0){
height=Math.max(height,24);
}else{
height=Math.max(height,24);
}}if((this.style&8)!=0){
return new $wt.graphics.Point(this.minWidth,Math.max(this.minHeight-24,0));
}return new $wt.graphics.Point(width,height);
});
$_M(c$,"getRegion",
function(){
return this.region;
});
$_V(c$,"getShell",
function(){
return this;
});
$_M(c$,"getSize",
function(){
return $_U(this,$wt.widgets.Shell,"getSize",[]);
});
$_M(c$,"getShells",
function(){
var count=0;
var shells=this.display.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this)count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this){
result[index++]=shells[i];
}}
return result;
});
$_V(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_V(c$,"isEnabled",
function(){
return this.getEnabled();
});
$_V(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"open",
function(){
this.bringToTop();
if(this.isDisposed())return;
this.setVisible(true);
if(this.isDisposed())return;
this.layout();
});
$_V(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Shell,"releaseHandle",[]);
});
$_M(c$,"releaseShells",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseShells();
$_U(this,$wt.widgets.Shell,"releaseWidget",[]);
this.activeMenu=null;
this.display.clearModal(this);
this.lastActive=null;
this.region=null;
});
$_M(c$,"removeMenu",
function(menu){
$_U(this,$wt.widgets.Shell,"removeMenu",[menu]);
if(menu==this.activeMenu)this.activeMenu=null;
},"$wt.widgets.Menu");
$_M(c$,"removeShellListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(21,listener);
this.eventTable.unhook(19,listener);
this.eventTable.unhook(20,listener);
this.eventTable.unhook(26,listener);
this.eventTable.unhook(27,listener);
},"$wt.events.ShellListener");
$_M(c$,"setActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_M(c$,"setActiveControl",
function(control){
if(control!=null&&control.isDisposed())control=null;
if(this.lastActive!=null&&this.lastActive.isDisposed())this.lastActive=null;
if(this.lastActive==control)return;
var activate=(control==null)?new Array(0):control.getPath();
var deactivate=(this.lastActive==null)?new Array(0):this.lastActive.getPath();
this.lastActive=control;
var index=0;
var length=Math.min(activate.length,deactivate.length);
while(index<length){
if(activate[index]!=deactivate[index])break;
index++;
}
for(var i=deactivate.length-1;i>=index;--i){
if(!deactivate[i].isDisposed()){
deactivate[i].sendEvent(27);
}}
for(var i=activate.length-1;i>=index;--i){
if(!activate[i].isDisposed()){
activate[i].sendEvent(26);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Shell,"setBounds",[x,y,width,height,flags,false]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setEnabled",
function(enabled){
if(((this.state&8)==0)==enabled)return;
$_U(this,$wt.widgets.Shell,"setEnabled",[enabled]);
},"~B");
$_M(c$,"setImeInputMode",
function(mode){
},"~N");
$_M(c$,"setMinimumSize",
function(width,height){
var widthLimit=0;
var heightLimit=0;
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
}this.minWidth=Math.max(widthLimit,width);
this.minHeight=Math.max(heightLimit,height);
var size=this.getSize();
var newWidth=Math.max(size.x,this.minWidth);
var newHeight=Math.max(size.y,this.minHeight);
if(this.minWidth<=widthLimit)this.minWidth=-1;
if(this.minHeight<=heightLimit)this.minHeight=-1;
if(newWidth!=size.x||newHeight!=size.y)this.setSize(newWidth,newHeight);
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setItemEnabled",
function(cmd,enabled){
},"~N,~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setRegion",
function(region){
if((this.style&8)==0)return;
},"$wt.graphics.Region");
$_M(c$,"setToolTipText",
function(hwnd,text){
},"$wt.internal.xhtml.Element,~S");
$_M(c$,"setVisible",
function(visible){
$_U(this,$wt.widgets.Shell,"setVisible",[visible]);
if(visible){
this.SetWindowPos(this.handle,null,this.left,this.top,this.width,this.height,0);
}},"~B");
$_V(c$,"traverseEscape",
function(){
if(this.parent==null)return false;
if(!this.isVisible()||!this.isEnabled())return false;
this.close();
return true;
});
$_M(c$,"updateModal",
function(){
});

Sync2Async={};
Sync2Async.block=function(shell,oThis,runnable){
shell.addDisposeListener((function(i$,v$){
if(!$_D("Sync2Async$1")){
$_H();
c$=Sync2Async$1=function(){
$_B(this,arguments);
$_Z(this,arguments);
};
Clazz.decorateAsType(c$,"Sync2Async$1",null,$wt.events.DisposeListener);
$_M(c$,"widgetDisposed",
function(e){
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);

},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N(Sync2Async$1,i$,v$);
})(this,$_F("runnable",runnable,"oThis",oThis)));
shell.getDisplay().readAndDispatch();
};
});
