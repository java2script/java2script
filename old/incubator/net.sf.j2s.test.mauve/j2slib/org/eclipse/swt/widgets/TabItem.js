$_L(["$wt.widgets.Item"],"$wt.widgets.TabItem",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.hasImage=false;
this.textEl=null;
this.hItemSelection=null;
$_Z(this,arguments);
},$wt.widgets,"TabItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
var index=parent.getItemCount();
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N,~N");
$_M(c$,"configure",
($fz=function(index){
this.hItemSelection=$_Q((($_D("$wt.widgets.TabItem$1")?0:org.eclipse.swt.widgets.TabItem.$TabItem$1$()),$_N($wt.widgets.TabItem$1,this,$_F("index",index))));
Clazz.addEvent(this.textEl,"click",this.hItemSelection);
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
if(this.hItemSelection!=null){
Clazz.removeEvent(this.textEl,"click",this.hItemSelection);
this.hItemSelection=null;
}O$.destroyHandle(this.textEl);
this.textEl=null;
}$_U(this,$wt.widgets.TabItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=control;
var index=this.parent.indexOf(this);
if(index!=this.parent.getSelectionIndex()){
if(newControl!=null)newControl.setVisible(false);
return;
}if(newControl!=null){
newControl.setBounds(this.parent.getClientArea());
newControl.setVisible(true);
}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
var boundsChanged=(image!=null&&this.image==null)||(image==null&&this.image!=null);
$_U(this,$wt.widgets.TabItem,"setImage",[image]);
if(image!=null&&image.handle==null&&image.url!=null&&image.url.length!=0){
var handleStyle=this.textEl.style;
if(O$.isIENeedPNGFix&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}else{
this.textEl.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.textEl.style.filter!=null){
this.textEl.style.filter="";
}}this.hasImage=image!=null;
O$.updateCSSClass(this.handle,"tab-item-image",this.hasImage);
if(boundsChanged){
this.parent.updateSelection(this.parent.getSelectionIndex());
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
var boundsChanged=string!==this.text;
$_U(this,$wt.widgets.TabItem,"setText",[string]);
if(this.handle!=null){
O$.clearChildren(this.handle);
this.textEl=d$.createElement("SPAN");
this.handle.appendChild(this.textEl);
this.textEl.appendChild(d$.createTextNode(string));
this.handle.style.height="14px";
}this.text=string;
this.configure(index);
if(boundsChanged){
this.parent.updateSelection(this.parent.getSelectionIndex());
}},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
c$.$TabItem$1$=function(){
$_H();
c$=$_W($wt.widgets,"TabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TabItem"].parent.setSelection(this.f$.index,true);
});
c$=$_P();
};
});
