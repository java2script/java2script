$_L(["$wt.graphics.Drawable","$wt.widgets.Widget"],"$wt.widgets.Control",["$wt.accessibility.Accessible","$wt.graphics.Color","$.Font","$.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$.Popup","$wt.internal.dnd.HTMLEventWrapper","$wt.internal.struct.MESSAGE","$.WINDOWPOS","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.cursor=null;
this.menu=null;
this.toolTipText=null;
this.layoutData=null;
this.accessible=null;
this.drawCount=0;
this.foreground=0;
this.background=0;
this.left=0;
this.top=0;
this.height=0;
this.width=0;
this.locationSet=false;
this.hOperaMouseUp=null;
this.hControlMenuDetect=null;
$_Z(this,arguments);
},$wt.widgets,"Control",$wt.widgets.Widget,$wt.graphics.Drawable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Control,[parent,style]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Composite,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addFocusListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(15,typedListener);
this.addListener(16,typedListener);
},"$wt.events.FocusListener");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addKeyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(2,typedListener);
this.addListener(1,typedListener);
},"$wt.events.KeyListener");
$_M(c$,"addMouseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(3,typedListener);
this.addListener(4,typedListener);
this.addListener(8,typedListener);
},"$wt.events.MouseListener");
$_M(c$,"addMouseTrackListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(6,typedListener);
this.addListener(7,typedListener);
this.addListener(32,typedListener);
},"$wt.events.MouseTrackListener");
$_M(c$,"addMouseMoveListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(5,typedListener);
},"$wt.events.MouseMoveListener");
$_M(c$,"addPaintListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(9,typedListener);
},"$wt.events.PaintListener");
$_M(c$,"addTraverseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(31,typedListener);
},"$wt.events.TraverseListener");
$_M(c$,"borderHandle",
function(){
return this.handle;
});
$_M(c$,"checkBorder",
function(){
if(this.getBorderWidth()==0)this.style&=-2049;
});
$_M(c$,"checkBuffered",
function(){
this.style&=-536870913;
});
$_M(c$,"checkHandle",
function(hwnd){
return hwnd===this.handle;
},"Element");
$_M(c$,"checkMirrored",
function(){
if((this.style&67108864)!=0){
}});
$_M(c$,"computeSize",
function(wHint,hHint){
return this.computeSize(wHint,hHint,true);
},"~N,~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=64;
var height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTabGroup",
function(){
if(this.isTabGroup())return this;
return this.parent.computeTabGroup();
});
$_M(c$,"computeTabRoot",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
var index=0;
while(index<tabList.length){
if(tabList[index]===this)break;
index++;
}
if(index==tabList.length){
if(this.isTabGroup())return this;
}}return this.parent.computeTabRoot();
});
$_M(c$,"computeTabList",
function(){
if(this.isTabGroup()){
if(this.getVisible()&&this.getEnabled()){
return[this];
}}return new Array(0);
});
$_M(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
});
$_M(c$,"createWidget",
function(){
this.foreground=this.background=-1;
this.checkOrientation(this.parent);
this.createHandle();
this.checkBuffered();
this.register();
this.setDefaultFont();
this.checkMirrored();
this.checkBorder();
this._updateOrientation();
});
$_M(c$,"deregister",
function(){
this.display.removeControl(this.handle);
});
$_V(c$,"destroyWidget",
function(){
var hwnd=this.topHandle();
this.releaseHandle();
if(hwnd!=null){
O$.destroyHandle(hwnd);
}});
$_M(c$,"enableWidget",
function(enabled){
this.handle.disabled=!enabled;
},"~B");
$_M(c$,"findBrush",
function(pixel){
return this.parent.findBrush(pixel);
},"~N");
$_M(c$,"findCursor",
function(){
if(this.cursor!=null)return this.cursor;
return this.parent.findCursor();
});
$_M(c$,"findThemeControl",
function(){
return this.background==-1?this.parent.findThemeControl():null;
});
$_M(c$,"findMenus",
function(control){
if(this.menu!=null&&this!==control)return[this.menu];
return new Array(0);
},"$wt.widgets.Control");
$_M(c$,"findMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"fixChildren",
function(newShell,oldShell,newDecorations,oldDecorations,menus){
oldShell.fixShell(newShell,this);
oldDecorations.fixDecorations(newDecorations,this,menus);
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixFocus",
function(focusControl){
var shell=this.getShell();
var control=this;
while(control!==shell&&(control=control.parent)!=null){
if(control.setFixedFocus())return;
}
shell.setSavedFocus(focusControl);
},"$wt.widgets.Control");
$_M(c$,"forceFocus",
function(){
if(this.display.focusEvent==16)return false;
var shell=this.menuShell();
shell.setSavedFocus(this);
if(!this.isEnabled()||!this.isVisible()||!this.j2sIsActive())return false;
if(this.isFocusControl())return true;
shell.setSavedFocus(null);
if(this.isDisposed())return false;
O$.SetFocus(this.handle);
shell.setSavedFocus(this);
return this.isFocusControl();
});
$_M(c$,"forceResize",
function(){
if(this.parent==null)return;
var lpwp=this.parent.lpwp;
if(lpwp==null)return;
var length=lpwp.length;
for(var i=0;i<length;i++){
var wp=lpwp[i];
if(wp!=null&&wp.hwnd===this.handle){
this.SetWindowPos(wp.hwnd,null,wp.x,wp.y,wp.cx,wp.cy,wp.flags);
lpwp[i]=null;
return;
}}
});
$_M(c$,"getAccessible",
function(){
if(this.accessible==null)this.accessible=new $wt.accessibility.Accessible(this);
return this.accessible;
});
$_M(c$,"getBackground",
function(){
var bg=this.handle.style.backgroundColor;
if(bg==null||(""+bg).length==0){
return new $wt.graphics.Color(this.display,"menu");
}return new $wt.graphics.Color(this.display,bg);
});
$_M(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 1;
}return 0;
});
$_M(c$,"getBounds",
function(){
this.forceResize();
return new $wt.graphics.Rectangle(this.left,this.top,this.width,this.height);
});
$_M(c$,"getEnabled",
function(){
return!this.handle.disabled;
});
$_M(c$,"getFont",
function(){
var ff=this.handle.style.fontFamily;
if(ff==null||(""+ff).length==0){
ff=null;
}var fs=this.handle.style.fontSize;
if(fs==null||(""+fs).length==0){
fs="8";
}return new $wt.graphics.Font(this.display,ff,Integer.parseInt(fs),0);
});
$_M(c$,"getForeground",
function(){
var fg=this.handle.style.color;
if(fg==null||(""+fg).length==0){
return new $wt.graphics.Color(this.display,"black");
}return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"getLayoutData",
function(){
return this.layoutData;
});
$_M(c$,"getLocation",
function(){
this.forceResize();
return new $wt.graphics.Point(this.left,this.top);
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getMonitor",
function(){
return this.display.getPrimaryMonitor();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getPath",
function(){
var count=0;
var shell=this.getShell();
var control=this;
while(control!==shell){
count++;
control=control.parent;
}
control=this;
var result=new Array(count);
while(control!==shell){
result[--count]=control;
control=control.parent;
}
return result;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getSize",
function(){
this.forceResize();
return new $wt.graphics.Point(this.width,this.height);
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
if(this.drawCount!=0)return(this.state&16)==0;
if(this.handle==null){
return false;
}return this.handle.style.visibility!=="hidden";
});
$_M(c$,"hasCursor",
function(){
return false;
});
$_M(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"j2sIsActive",
function(){
var dialogShell=this.display.getModalDialogShell();
if(dialogShell!=null&&dialogShell!==this.getShell()){
return false;
}var shell=null;
var modalShells=this.display.modalShells;
if(modalShells!=null){
var bits=196608;
var index=modalShells.length;
while(--index>=0){
var modal=modalShells[index];
if(modal!=null){
if((modal.style&bits)!=0){
var control=this;
while(control!=null){
if(control===modal)break;
control=control.parent;
}
if(control!==modal)return false;
break;
}if((modal.style&32768)!=0){
if(shell==null)shell=this.getShell();
if(modal.parent===shell)return false;
}}}
}if(shell==null)shell=this.getShell();
return shell.getEnabled();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isFocusControl",
function(){
var focusControl=this.display.focusControl;
if(focusControl!=null&&!focusControl.isDisposed()){
return this===focusControl;
}return this.hasFocus();
});
$_M(c$,"isFocusAncestor",
function(control){
while(control!=null&&control!==this){
control=control.parent;
}
return control===this;
},"$wt.widgets.Control");
$_M(c$,"isReparentable",
function(){
return true;
});
$_M(c$,"isShowing",
function(){
if(!this.isVisible())return false;
var control=this;
while(control!=null){
var size=control.getSize();
if(size.x==0||size.y==0){
return false;
}control=control.parent;
}
return true;
});
$_M(c$,"isTabGroup",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]===this)return true;
}
}return true;
});
$_M(c$,"isTabItem",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]===this)return false;
}
}return false;
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"mapEvent",
function(hwnd,event){
if(hwnd!==this.handle){
}},"Element,$wt.widgets.Event");
$_M(c$,"markLayout",
function(changed,all){
},"~B,~B");
$_M(c$,"menuShell",
function(){
return this.parent.menuShell();
});
$_M(c$,"mnemonicHit",
function(key){
return false;
},"~N");
$_M(c$,"mnemonicMatch",
function(key){
return false;
},"~N");
$_M(c$,"moveAbove",
function(control){
if(control!=null){
if(this.parent!==control.parent)return;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.removeChild(this.handle);
parentHandle.insertBefore(this.handle,control.handle);
}}}},"$wt.widgets.Control");
$_M(c$,"moveBelow",
function(control){
if(control!=null){
if(this.parent!==control.parent)return;
this.parent.handle.removeChild(this.handle);
if(control.handle.nextSibling!=null){
this.parent.handle.insertBefore(this.handle,control.handle.nextSibling);
}else{
this.parent.handle.appendChild(this.handle);
}}},"$wt.widgets.Control");
$_M(c$,"pack",
function(){
this.pack(true);
});
$_M(c$,"pack",
function(changed){
var computeSize=this.computeSize(-1,-1,changed);
this.setSize(computeSize);
},"~B");
$_M(c$,"redraw",
function(){
});
$_M(c$,"redraw",
function(x,y,width,height,all){
if(width<=0||height<=0)return;
},"~N,~N,~N,~N,~B");
$_M(c$,"register",
function(){
this.display.addControl(this.handle,this);
if(this.parent!=null){
this.parent.children[this.parent.children.length]=this;
}});
$_V(c$,"releaseChild",
function(){
this.parent.removeControl(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.hOperaMouseUp!=null||this.hControlMenuDetect!=null){
var el=null;
if($_O(this,$wt.widgets.Composite)){
el=(this).containerHandle();
}else{
el=this.handle;
}if(this.hOperaMouseUp!=null){
Clazz.removeEvent(el,"mouseup",this.hOperaMouseUp);
this.hOperaMouseUp=null;
}if(this.hControlMenuDetect!=null){
Clazz.removeEvent(el,"contextmenu",this.hControlMenuDetect);
this.hControlMenuDetect=null;
}}$_U(this,$wt.widgets.Control,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Control,"releaseWidget",[]);
if(this.toolTipText!=null){
var shell=this.getShell();
shell.setToolTipText(this.handle,null);
}this.toolTipText=null;
if(this.menu!=null&&!this.menu.isDisposed()){
this.menu.dispose();
}this.menu=null;
this.cursor=null;
this.deregister();
this.parent=null;
this.layoutData=null;
this.accessible=null;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeFocusListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(15,listener);
this.eventTable.unhook(16,listener);
},"$wt.events.FocusListener");
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeKeyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(2,listener);
this.eventTable.unhook(1,listener);
},"$wt.events.KeyListener");
$_M(c$,"removeMouseTrackListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(6,listener);
this.eventTable.unhook(7,listener);
this.eventTable.unhook(32,listener);
},"$wt.events.MouseTrackListener");
$_M(c$,"removeMouseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(3,listener);
this.eventTable.unhook(4,listener);
this.eventTable.unhook(8,listener);
},"$wt.events.MouseListener");
$_M(c$,"removeMouseMoveListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(5,listener);
},"$wt.events.MouseMoveListener");
$_M(c$,"removePaintListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(9,listener);
},"$wt.events.PaintListener");
$_M(c$,"removeTraverseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(31,listener);
},"$wt.events.TraverseListener");
$_M(c$,"showWidget",
function(visible){
this.handle.style.visibility=visible?"visible":"hidden";
},"~B");
$_V(c$,"sendFocusEvent",
function(type){
var shell=this.getShell();
var display=this.display;
display.focusEvent=type;
display.focusControl=this;
this.sendEvent(type);
display.focusEvent=0;
display.focusControl=null;
if(!shell.isDisposed()){
switch(type){
case 15:
shell.setActiveControl(this);
break;
case 16:
if(shell!==display.getActiveShell()){
shell.setActiveControl(null);
}break;
}
}return true;
},"~N");
$_M(c$,"setBackground",
function(color){
if(color!=null){
this.handle.style.backgroundColor=color.getCSSHandle();
}else{
this.handle.style.backgroundColor="";
}},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(x,y,width,height){
var flags=0;
this.setBounds(x,y,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
this.setBounds(x,y,width,height,flags,true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
var resized=this.width!=width||this.height!=height;
var moved=this.left!=x||this.top!=y;
if(!this.locationSet){
this.locationSet=moved;
}var tempX=x;
if(this.parent!=null){
if((this.parent.style&67108864)!=0){
x=Math.max(0,this.parent.getClientArea().width-x-width);
}}var topHandle=this.topHandle();
if(defer&&this.parent!=null){
this.forceResize();
var lpwp=this.parent.lpwp;
if(lpwp==null){
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}else{
var index=0;
while(index<lpwp.length){
if(lpwp[index]==null)break;
index++;
}
if(index==lpwp.length){
var newLpwp=new Array(lpwp.length+4);
System.arraycopy(lpwp,0,newLpwp,0,lpwp.length);
this.parent.lpwp=lpwp=newLpwp;
}var wp=new $wt.internal.struct.WINDOWPOS();
wp.hwnd=topHandle;
wp.x=x;
wp.y=y;
wp.cx=width;
wp.cy=height;
wp.flags=flags;
lpwp[index]=wp;
}}else{
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}this.left=tempX;
if(resized&&this.hooks(11))this.sendEvent(11);
if(moved&&this.hooks(10))this.sendEvent(10);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setBounds",
function(rect){
this.setBounds(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setCapture",
function(capture){
},"~B");
$_M(c$,"setCursor",
function(){
});
$_M(c$,"setCursor",
function(cursor){
this.cursor=cursor;
this.handle.style.cursor=(cursor==null)?"":cursor.getCSSHandle();
},"$wt.graphics.Cursor");
$_M(c$,"setDefaultFont",
function(){
});
$_M(c$,"setEnabled",
function(enabled){
var control=null;
var fixFocus=false;
if(!enabled){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}this.enableWidget(enabled);
if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"fontHandle",
function(){
return this.handle;
});
$_M(c$,"setFont",
function(font){
var handle=this.fontHandle();
if(font==null||font.data==null){
handle.style.fontFamily="";
handle.style.fontSize="";
handle.style.fontWeight="";
handle.style.fontStyle="";
handle.style.textDecoration="";
return;
}if(font.data.name!=null){
handle.style.fontFamily=font.data.name;
}handle.style.fontSize=font.data.height+"pt";
if((font.data.style&1)!=0){
handle.style.fontWeight="bold";
}else{
handle.style.fontWeight="normal";
}if((font.data.style&2)!=0){
handle.style.fontStyle="italic";
}else{
handle.style.fontStyle="normal";
}var td="";
if(font.data.isStrikeout){
td="line-through";
}if(font.data.isUnderline){
if(td.length>0){
td+=" underline";
}else{
td="underline";
}}handle.style.textDecoration=td;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null){
this.handle.style.color=color.getCSSHandle();
}else{
this.handle.style.color="";
}},"$wt.graphics.Color");
$_M(c$,"setLayoutData",
function(layoutData){
this.layoutData=layoutData;
},"~O");
$_M(c$,"setLocation",
function(x,y){
var flags=0;
this.setBounds(x,y,this.width,this.height,flags);
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setMenu",
function(menu){
if(menu!=null){
}this.menu=menu;
var el=null;
if($_O(this,$wt.widgets.Composite)){
el=(this).containerHandle();
}else{
el=this.handle;
}if(O$.isOpera){
if(this.hOperaMouseUp==null){
this.hOperaMouseUp=$_Q((($_D("$wt.widgets.Control$1")?0:org.eclipse.swt.widgets.Control.$Control$1$()),$_N($wt.widgets.Control$1,this,null)));
Clazz.addEvent(el,"mouseup",this.hOperaMouseUp);
}}if(this.hControlMenuDetect==null){
this.hControlMenuDetect=$_Q((($_D("$wt.widgets.Control$2")?0:org.eclipse.swt.widgets.Control.$Control$2$()),$_N($wt.widgets.Control$2,this,null)));
Clazz.addEvent(el,"contextmenu",this.hControlMenuDetect);
}},"$wt.widgets.Menu");
$_M(c$,"setRadioFocus",
function(){
return false;
});
$_M(c$,"setRadioSelection",
function(value){
return false;
},"~B");
$_M(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setSavedFocus",
function(){
return this.forceFocus();
});
$_M(c$,"setSize",
function(width,height){
var flags=0;
this.setBounds(this.left,this.top,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setTabGroupFocus",
function(){
return this.setTabItemFocus();
});
$_M(c$,"setTabItemFocus",
function(){
if(!this.isShowing())return false;
return this.forceFocus();
});
$_M(c$,"setToolTipText",
function(string){
var shell=this.getShell();
shell.setToolTipText(this.handle,this.toolTipText=string);
},"~S");
$_M(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if((this.handle.style.visibility!=="hidden")==visible)return;
}if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
if($_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}}this.handle.style.visibility=visible?"":"hidden";
this.handle.style.display=visible?"":"none";
var control=null;
var fixFocus=false;
if(!visible){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}if(this.drawCount!=0){
this.state=visible?this.state&-17:this.state|16;
}else{
this.showWidget(visible);
if(this.isDisposed())return;
}if(!visible){
this.sendEvent(23);
if(this.isDisposed())return;
}if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"sort",
function(items){
var length=items.length;
for(var gap=Math.floor(length/ 2); gap > 0; gap /=2){
for(var i=gap;i<length;i++){
for(var j=i-gap;j>=0;j-=gap){
if(items[j]<=items[j+gap]){
var swap=items[j];
items[j]=items[j+gap];
items[j+gap]=swap;
}}
}
}
},"~A");
$_M(c$,"toControl",
function(x,y){
return new $wt.graphics.Point(x,y);
},"~N,~N");
$_M(c$,"toControl",
function(point){
return this.toControl(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"toDisplay",
function(x,y){
var pt=O$.calcuateRelativePosition(this.handle,d$.body);
return new $wt.graphics.Point(pt.x+x,pt.y+y);
},"~N,~N");
$_M(c$,"toDisplay",
function(point){
return this.toDisplay(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"topHandle",
function(){
return this.handle;
});
$_M(c$,"traverse",
function(event){
this.sendEvent(31,event);
if(this.isDisposed())return true;
if(!event.doit)return false;
switch(event.detail){
case 0:
return true;
case 2:
return this.traverseEscape();
case 4:
return this.traverseReturn();
case 16:
return this.traverseGroup(true);
case 8:
return this.traverseGroup(false);
case 64:
return this.traverseItem(true);
case 32:
return this.traverseItem(false);
case 128:
return this.traverseMnemonic(event.character);
case 512:
return this.traversePage(true);
case 256:
return this.traversePage(false);
}
return false;
},"$wt.widgets.Event");
$_M(c$,"traverse",
function(traversal){
var event=new $wt.widgets.Event();
event.doit=true;
event.detail=traversal;
return this.traverse(event);
},"~N");
$_M(c$,"traverseEscape",
function(){
return false;
});
$_M(c$,"traverseGroup",
function(next){
var root=this.computeTabRoot();
var group=this.computeTabGroup();
var list=root.computeTabList();
var length=list.length;
var index=0;
while(index<length){
if(list[index]===group)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=((index+offset+length)%length))!=start){
var control=list[index];
if(!control.isDisposed()&&control.setTabGroupFocus()){
return true;
}}
if(group.isDisposed())return false;
return group.setTabGroupFocus();
},"~B");
$_M(c$,"traverseItem",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]===this)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&child.isTabItem()){
if(child.setTabItemFocus())return true;
}}
return false;
},"~B");
$_M(c$,"traverseMnemonic",
function(key){
return this.mnemonicHit(key);
},"~N");
$_M(c$,"traversePage",
function(next){
return false;
},"~B");
$_M(c$,"traverseReturn",
function(){
return false;
});
$_M(c$,"update",
function(){
this.update(false);
});
$_M(c$,"update",
function(all){
},"~B");
$_M(c$,"updateFont",
function(oldFont,newFont){
var sameFont=this.getFont().equals(oldFont);
if(sameFont)this.setFont(newFont);
return sameFont;
},"$wt.graphics.Font,$wt.graphics.Font");
$_M(c$,"updateLayout",
function(resize,all){
},"~B,~B");
$_M(c$,"widgetParent",
function(){
if(this.parent==null){
return null;
}return this.parent.handle;
});
$_M(c$,"setParent",
function(parent){
if(this.parent===parent)return true;
if(!this.isReparentable())return false;
this.releaseChild();
var newShell=parent.getShell();
var oldShell=this.getShell();
var newDecorations=parent.menuShell();
var oldDecorations=this.menuShell();
if(oldShell!==newShell||oldDecorations!==newDecorations){
var menus=oldShell.findMenus(this);
this.fixChildren(newShell,oldShell,newDecorations,oldDecorations,menus);
}var children=parent.children;
children[children.length+1]=this;
var topHandle=this.topHandle();
topHandle.parentNode.removeChild(this.handle);
parent.containerHandle().appendChild(this.handle);
var oldParent=this.parent;
this.parent=parent;
this.display.sendMessage(new $wt.internal.struct.MESSAGE(oldParent,2,null));
this.display.sendMessage(new $wt.internal.struct.MESSAGE(parent,2,null));
return true;
},"$wt.widgets.Composite");
c$.$Control$1$=function(){
$_H();
c$=$_W($wt.widgets,"Control$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
if(evt!=null&&(evt).ctrlKey){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
if(!evtHTML.leftButtonHold){
var menu=this.b$["$wt.widgets.Control"].getMenu();
if(menu!=null&&!menu.isDisposed()){
menu.handle.style.left="-10000px";
menu.handle.style.top="-10000px";
menu.handle.style.display="block";
var bounds=menu.getBounds();
var clientArea=this.b$["$wt.widgets.Control"].getMonitor().getClientArea();
clientArea.x+=O$.getFixedBodyOffsetLeft();
clientArea.y+=O$.getFixedBodyOffsetTop();
var rect=$wt.internal.browser.Popup.popupMenu(clientArea,new $wt.graphics.Rectangle(evtHTML.x,evtHTML.y,0,0),bounds.width,bounds.height,0);
menu.handle.style.width=rect.width+"px";
menu.setLocation(rect.x,rect.y);
this.b$["$wt.widgets.Control"].showMenu(rect.x,rect.y);
}evtHTML.preventDefault();
evtHTML.stopPropagation();
this.toReturn(false);
}}});
c$=$_P();
};
c$.$Control$2$=function(){
$_H();
c$=$_W($wt.widgets,"Control$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
if(evt!=null){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
var menu=this.b$["$wt.widgets.Control"].getMenu();
if(menu!=null&&!menu.isDisposed()){
menu.handle.style.left="-10000px";
menu.handle.style.top="-10000px";
menu.handle.style.display="block";
var bounds=menu.getBounds();
var clientArea=this.b$["$wt.widgets.Control"].getMonitor().getClientArea();
clientArea.x+=O$.getFixedBodyOffsetLeft();
clientArea.y+=O$.getFixedBodyOffsetTop();
var rect=$wt.internal.browser.Popup.popupMenu(clientArea,new $wt.graphics.Rectangle(evtHTML.x,evtHTML.y,0,0),bounds.width,bounds.height,0);
menu.handle.style.width=rect.width+"px";
menu.setLocation(rect.x,rect.y);
this.b$["$wt.widgets.Control"].showMenu(rect.x,rect.y);
}evtHTML.preventDefault();
evtHTML.stopPropagation();
}this.toReturn(false);
});
c$=$_P();
};
});
