$_L(["$wt.widgets.Widget"],"$wt.dnd.DropTarget",["java.util.Date","$wt.dnd.DND","$.DNDEvent","$.DNDListener","$.TransferData","$wt.graphics.Point","$wt.widgets.Listener"],function(){
c$=$_C(function(){
this.control=null;
this.controlListener=null;
this.transferAgents=null;
this.selectedDataType=null;
this.selectedOperation=0;
this.keyOperation=-1;
this.iDataObject=0;
this.refCount=0;
$_Z(this,arguments);
},$wt.dnd,"DropTarget",$wt.widgets.Widget);
$_Y(c$,function(){
this.transferAgents=new Array(0);
});
$_K(c$,
function(control,style){
$_R(this,$wt.dnd.DropTarget,[control,$wt.dnd.DropTarget.checkStyle(style)]);
this.control=control;
if(control.getData("DropTarget")!=null){
$wt.dnd.DND.error(2001);
}control.setData("DropTarget",this);
this.AddRef();
this.controlListener=(($_D("$wt.dnd.DropTarget$1")?0:org.eclipse.swt.dnd.DropTarget.$DropTarget$1$()),$_N($wt.dnd.DropTarget$1,this,null));
control.addListener(12,this.controlListener);
this.addListener(12,(($_D("$wt.dnd.DropTarget$2")?0:org.eclipse.swt.dnd.DropTarget.$DropTarget$2$()),$_N($wt.dnd.DropTarget$2,this,null)));
},"$wt.widgets.Control,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if(style==0)return 2;
return style;
},"~N");
$_M(c$,"addDropListener",
function(listener){
if(listener==null)$wt.dnd.DND.error(4);
var typedListener=new $wt.dnd.DNDListener(listener);
this.addListener(2002,typedListener);
this.addListener(2003,typedListener);
this.addListener(2004,typedListener);
this.addListener(2005,typedListener);
this.addListener(2006,typedListener);
this.addListener(2007,typedListener);
},"$wt.dnd.DropTargetListener");
$_M(c$,"AddRef",
($fz=function(){
this.refCount++;
return this.refCount;
},$fz.isPrivate=true,$fz));
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getTransfer",
function(){
return this.transferAgents;
});
$_M(c$,"notifyListeners",
function(eventType,event){
var coordinates=new $wt.graphics.Point(event.x,event.y);
coordinates=this.control.toControl(coordinates);
if($_O(this.control,$wt.widgets.Tree)){
var tree=this.control;
event.item=tree.getItem(coordinates);
if(event.item==null){
var area=tree.getClientArea();
if(area.contains(coordinates)){
for(var x1=area.x;x1<area.x+area.width;x1++){
var pt=new $wt.graphics.Point(x1,coordinates.y);
event.item=tree.getItem(pt);
if(event.item!=null){
break;
}}
}}}if($_O(this.control,$wt.widgets.Table)){
var table=this.control;
event.item=table.getItem(coordinates);
if(event.item==null){
var area=table.getClientArea();
if(area.contains(coordinates)){
for(var x1=area.x;x1<area.x+area.width;x1++){
var pt=new $wt.graphics.Point(x1,coordinates.y);
event.item=table.getItem(pt);
if(event.item!=null){
break;
}}
}}}$_U(this,$wt.dnd.DropTarget,"notifyListeners",[eventType,event]);
},"~N,$wt.widgets.Event");
$_M(c$,"onDispose",
($fz=function(){
if(this.control==null)return;
if(this.controlListener!=null)this.control.removeListener(12,this.controlListener);
this.controlListener=null;
this.control.setData("DropTarget",null);
this.transferAgents=null;
this.control=null;
},$fz.isPrivate=true,$fz));
$_M(c$,"removeDropListener",
function(listener){
if(listener==null)$wt.dnd.DND.error(4);
this.removeListener(2002,listener);
this.removeListener(2003,listener);
this.removeListener(2004,listener);
this.removeListener(2005,listener);
this.removeListener(2006,listener);
this.removeListener(2007,listener);
},"$wt.dnd.DropTargetListener");
$_M(c$,"setTransfer",
function(transferAgents){
if(transferAgents==null)$wt.dnd.DND.error(4);
this.transferAgents=transferAgents;
},"~A");
c$.$DropTarget$1$=function(){
$_H();
c$=$_W($wt.dnd,"DropTarget$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
if(!this.b$["$wt.dnd.DropTarget"].isDisposed()){
this.b$["$wt.dnd.DropTarget"].dispose();
}},"$wt.widgets.Event");
c$=$_P();
};
c$.$DropTarget$2$=function(){
$_H();
c$=$_W($wt.dnd,"DropTarget$2",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.dnd.DropTarget"].onDispose();
},"$wt.widgets.Event");
c$=$_P();
};
$_S(c$,
"DROPTARGETID","DropTarget");
});
