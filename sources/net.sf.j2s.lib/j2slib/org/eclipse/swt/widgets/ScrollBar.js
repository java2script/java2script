Clazz.load(["$wt.widgets.Widget"],"$wt.widgets.ScrollBar",["$wt.graphics.Point","$.Rectangle","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.increment=0;
this.pageIncrement=0;
$_Z(this,arguments);
},$wt.widgets,"ScrollBar",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ScrollBar,[parent,$wt.widgets.ScrollBar.checkStyle(style)]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Scrollable,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"createWidget",
function(){
this.increment=1;
this.pageIncrement=10;
this.state=this.state|16;
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
$_U(this,$wt.widgets.ScrollBar,"dispose",[]);
});
$_M(c$,"getBounds",
function(){
this.parent.forceResize();
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return 100;
});
$_M(c$,"getMinimum",
function(){
return 0;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
return 0;
});
$_M(c$,"getSize",
function(){
this.parent.forceResize();
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getThumb",
function(){
return 10;
});
$_M(c$,"getVisible",
function(){
return(this.state&16)==0;
});
$_M(c$,"hwndScrollBar",
function(){
return this.parent.scrolledHandle();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseChild",[]);
if(this.parent.horizontalBar==this)this.parent.horizontalBar=null;
if(this.parent.verticalBar==this)this.parent.verticalBar=null;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseWidget",[]);
this.parent=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(enabled){
},"~B");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
this.increment=value;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(selection){
},"~N");
$_M(c$,"setThumb",
function(value){
if(value<1)return;
},"~N");
$_M(c$,"setValues",
function(selection,minimum,maximum,thumb,increment,pageIncrement){
if(minimum<0)return;
if(maximum<0)return;
if(thumb<1)return;
if(increment<1)return;
if(pageIncrement<1)return;
this.increment=increment;
this.pageIncrement=pageIncrement;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"setVisible",
function(visible){
var isVisible=(this.state&16)==0;
if(isVisible==visible)return;
if(visible){
this.state=this.state&-17;
}else{
this.state=this.state|16;
}if(this.parent==null||this.parent.handle==null){
return;
}var scrollClass="hscroll-default";
if((this.style&512)!=0){
scrollClass="vscroll-default";
}var className=this.parent.handle.className;
var idx=this.parent.handle.className.indexOf(scrollClass);
if(!visible&&idx!=-1){
className=className.substring(0,idx)+className.substring(idx+scrollClass.length);
}else if(visible&&idx==-1){
className+=" "+scrollClass;
}this.parent.handle.className=className;
},"~B");
});
