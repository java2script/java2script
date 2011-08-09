$_L(null,"$wt.custom.ControlEditor",["$wt.graphics.Rectangle","$wt.widgets.Listener"],function(){
c$=$_C(function(){
this.horizontalAlignment=16777216;
this.grabHorizontal=false;
this.minimumWidth=0;
this.verticalAlignment=16777216;
this.grabVertical=false;
this.minimumHeight=0;
this.parent=null;
this.editor=null;
this.hadFocus=false;
this.tableListener=null;
this.scrollbarListener=null;
$_Z(this,arguments);
},$wt.custom,"ControlEditor");
$_K(c$,
function(parent){
this.parent=parent;
this.tableListener=(($_D("$wt.custom.ControlEditor$1")?0:org.eclipse.swt.custom.ControlEditor.$ControlEditor$1$()),$_N($wt.custom.ControlEditor$1,this,null));
parent.addListener(11,this.tableListener);
this.scrollbarListener=(($_D("$wt.custom.ControlEditor$2")?0:org.eclipse.swt.custom.ControlEditor.$ControlEditor$2$()),$_N($wt.custom.ControlEditor$2,this,null));
var hBar=parent.getHorizontalBar();
if(hBar!=null)hBar.addListener(13,this.scrollbarListener);
var vBar=parent.getVerticalBar();
if(vBar!=null)vBar.addListener(13,this.scrollbarListener);
},"$wt.widgets.Composite");
$_M(c$,"computeBounds",
function(){
var clientArea=this.parent.getClientArea();
var editorRect=new $wt.graphics.Rectangle(clientArea.x,clientArea.y,this.minimumWidth,this.minimumHeight);
if(this.grabHorizontal)editorRect.width=Math.max(clientArea.width,this.minimumWidth);
if(this.grabVertical)editorRect.height=Math.max(clientArea.height,this.minimumHeight);
switch(this.horizontalAlignment){
case 131072:
editorRect.x+=clientArea.width-editorRect.width;
break;
case 16384:
break;
default:
editorRect.x+=Math.floor((clientArea.width-editorRect.width)/2);
}
switch(this.verticalAlignment){
case 1024:
editorRect.y+=clientArea.height-editorRect.height;
break;
case 128:
break;
default:
editorRect.y+=Math.floor((clientArea.height-editorRect.height)/2);
}
return editorRect;
});
$_M(c$,"dispose",
function(){
if(!this.parent.isDisposed()){
this.parent.removeListener(11,this.tableListener);
var hBar=this.parent.getHorizontalBar();
if(hBar!=null)hBar.removeListener(13,this.scrollbarListener);
var vBar=this.parent.getVerticalBar();
if(vBar!=null)vBar.removeListener(13,this.scrollbarListener);
}this.parent=null;
this.editor=null;
this.hadFocus=false;
this.tableListener=null;
this.scrollbarListener=null;
});
$_M(c$,"getEditor",
function(){
return this.editor;
});
$_M(c$,"layout",
function(){
this.resize();
});
$_M(c$,"resize",
function(){
if(this.editor==null||this.editor.isDisposed())return;
if(this.editor.getVisible()){
this.hadFocus=this.editor.isFocusControl();
}this.editor.setBounds(this.computeBounds());
if(this.hadFocus){
if(this.editor==null||this.editor.isDisposed())return;
this.editor.setFocus();
}});
$_M(c$,"scroll",
function(e){
if(this.editor==null||this.editor.isDisposed())return;
this.editor.setBounds(this.computeBounds());
},"$wt.widgets.Event");
$_M(c$,"setEditor",
function(editor){
if(editor==null){
this.editor=null;
return;
}this.editor=editor;
this.resize();
if(editor==null||editor.isDisposed())return;
editor.setVisible(true);
},"$wt.widgets.Control");
c$.$ControlEditor$1$=function(){
$_H();
c$=$_W($wt.custom,"ControlEditor$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
this.b$["$wt.custom.ControlEditor"].resize();
},"$wt.widgets.Event");
c$=$_P();
};
c$.$ControlEditor$2$=function(){
$_H();
c$=$_W($wt.custom,"ControlEditor$2",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
this.b$["$wt.custom.ControlEditor"].scroll(e);
},"$wt.widgets.Event");
c$=$_P();
};
});
