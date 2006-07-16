Clazz.load(["$wt.widgets.Item","$wt.graphics.Rectangle"],"$wt.custom.CTabItem",["$wt.SWT","$wt.custom.CTabFolderEvent","$wt.graphics.Color","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.parent=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.shortenedTextWidth=0;
this.hasImage=false;
this.textEl=null;
this.rightEl=null;
this.isSelected=false;
this.font=null;
this.disabledImage=null;
this.closeRect=null;
this.closeImageState=0;
this.showClose=false;
this.showing=false;
$_Z(this,arguments);
},$wt.custom,"CTabItem",$wt.widgets.Item);
$_Y(c$,function(){
this.closeRect=new $wt.graphics.Rectangle(0,0,0,0);
});
$_K(c$,
function(parent,style){
this.construct(parent,style,parent.getItemCount());
},"$wt.custom.CTabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.custom.CTabItem,[parent,$wt.custom.CTabItem.checkStyle(style)]);
this.parent=parent;
this.showClose=parent.showClose;
parent.createItem(this,index);
this.configure(index);
},"$wt.custom.CTabFolder,~N,~N");
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"configure",
($fz=function(index){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].parent.setSelection(this.b$["$wt.custom.CTabItem"]);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$1,i$,v$);
})(this,null));
if(this.parent.showClose){
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(true);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$2,i$,v$);
})(this,null));
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(false);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$3,i$,v$);
})(this,null));
}},$fz.isPrivate=true,$fz),"~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return 0;
},"~N");
c$.shortenText=$_M(c$,"shortenText",
function(gc,text,width){
if(gc.textExtent(text,9).x<=width)return text;
var ellipseWidth=gc.textExtent($wt.custom.CTabItem.ELLIPSIS,9).x;
var length=text.length;
var end=length-1;
while(end>0){
text=text.substring(0,end);
var l=gc.textExtent(text,9).x;
if(l+ellipseWidth<=width){
return text+$wt.custom.CTabItem.ELLIPSIS;
}end--;
}
return text.substring(0,1);
},"$wt.graphics.GC,~S,~N");
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.parent.destroyItem(this);
$_U(this,$wt.custom.CTabItem,"dispose",[]);
this.parent=null;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.font=null;
});
$_M(c$,"drawClose",
function(gc){
if(this.closeRect.width==0||this.closeRect.height==0)return;
var display=this.getDisplay();
var indent=Math.max(1,4);
var x=this.closeRect.x+indent;
var y=this.closeRect.y+indent;
y+=this.parent.onBottom?-1:1;
var closeBorder=display.getSystemColor(17);
switch(this.closeImageState){
case 1:
{
var shape=[x,y,x+2,y,x+4,y+2,x+5,y+2,x+7,y,x+9,y,x+9,y+2,x+7,y+4,x+7,y+5,x+9,y+7,x+9,y+9,x+7,y+9,x+5,y+7,x+4,y+7,x+2,y+9,x,y+9,x,y+7,x+2,y+5,x+2,y+4,x,y+2];
gc.setBackground(display.getSystemColor(25));
gc.fillPolygon(shape);
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 2:
{
var shape=[x,y,x+2,y,x+4,y+2,x+5,y+2,x+7,y,x+9,y,x+9,y+2,x+7,y+4,x+7,y+5,x+9,y+7,x+9,y+9,x+7,y+9,x+5,y+7,x+4,y+7,x+2,y+9,x,y+9,x,y+7,x+2,y+5,x+2,y+4,x,y+2];
var fill=new $wt.graphics.Color(display,$wt.custom.CTabFolder.CLOSE_FILL);
gc.setBackground(fill);
gc.fillPolygon(shape);
fill.dispose();
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 3:
{
var shape=[x+1,y+1,x+3,y+1,x+5,y+3,x+6,y+3,x+8,y+1,x+10,y+1,x+10,y+3,x+8,y+5,x+8,y+6,x+10,y+8,x+10,y+10,x+8,y+10,x+6,y+8,x+5,y+8,x+3,y+10,x+1,y+10,x+1,y+8,x+3,y+6,x+3,y+5,x+1,y+3];
var fill=new $wt.graphics.Color(display,$wt.custom.CTabFolder.CLOSE_FILL);
gc.setBackground(fill);
gc.fillPolygon(shape);
fill.dispose();
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 0:
{
var shape=[x,y,x+10,y,x+10,y+10,x,y+10];
if(this.parent.gradientColors!=null&&!this.parent.gradientVertical){
}else{
var defaultBackground=this.parent.getBackground();
var image=this.parent.bgImage;
var colors=this.parent.gradientColors;
var percents=this.parent.gradientPercents;
var vertical=this.parent.gradientVertical;
}break;
}}
},"$wt.graphics.GC");
$_M(c$,"getBounds",
function(){
var w=this.width;
if(!this.parent.simple&&!this.parent.single&&this.parent.indexOf(this)==this.parent.selectedIndex)w+=this.parent.curveWidth-this.parent.curveIndent;
return new $wt.graphics.Rectangle(this.x,this.y,w,this.height);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getDisabledImage",
function(){
return this.disabledImage;
});
$_M(c$,"getFont",
function(){
if(this.font!=null)return this.font;
return this.parent.getFont();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
if(this.toolTipText==null&&this.shortenedText!=null){
var text=this.getText();
if(!this.shortenedText.equals(text))return text;
}return this.toolTipText;
});
$_M(c$,"isShowing",
function(){
return this.showing;
});
$_M(c$,"preferredHeight",
function(gc){
var image=this.getImage();
var h=(image==null)?0:image.getBounds().height;
var text=this.getText();
if(this.font==null){
h=Math.max(h,gc.textExtent(text,9).y);
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
h=Math.max(h,gc.textExtent(text,9).y);
gc.setFont(gcFont);
}return h+2+2;
},"$wt.graphics.GC");
$_M(c$,"preferredWidth",
function(gc,isSelected,minimum){
if(this.isDisposed())return 0;
var w=0;
var image=this.getImage();
if(image!=null&&(isSelected||this.parent.showUnselectedImage)){
w+=image.getBounds().width;
}var text=null;
if(minimum){
var minChars=this.parent.minChars;
text=minChars==0?null:this.getText();
if(text!=null&&text.length>minChars){
var end=minChars<$wt.custom.CTabItem.ELLIPSIS.length+1?minChars:minChars-$wt.custom.CTabItem.ELLIPSIS.length;
text=text.substring(0,end);
if(minChars>$wt.custom.CTabItem.ELLIPSIS.length+1)text+=$wt.custom.CTabItem.ELLIPSIS;
}}else{
text=this.getText();
}if(text!=null){
if(w>0)w+=4;
if(this.font==null){
w+=gc.textExtent(text,9).x;
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
w+=gc.textExtent(text,9).x;
gc.setFont(gcFont);
}}if(this.parent.showClose||this.showClose){
if(isSelected||this.parent.showUnselectedClose){
if(w>0)w+=4;
w+=18;
}}return w+4+4;
},"$wt.graphics.GC,~B,~B");
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
var clientArea=this.parent.getClientArea();
if(clientArea.height<=0||clientArea.width<=0){
}else{
if(this.isSelected){
newControl.setBounds(clientArea);
}newControl.setVisible(true);
}}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setDisabledImage",
function(image){
this.disabledImage=image;
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
if(font==null&&this.font==null)return;
if(font!=null&&font.equals(this.font))return;
this.font=font;
if(!this.parent.updateTabHeight(false)){
this.parent.updateItems();
}},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
var oldImage=this.getImage();
if(image==null&&oldImage==null)return;
if(image!=null&&image.equals(oldImage))return;
$_U(this,$wt.custom.CTabItem,"setImage",[image]);
if(!this.parent.updateTabHeight(false)){
if(oldImage!=null&&image!=null){
var oldBounds=oldImage.getBounds();
var bounds=image.getBounds();
if(bounds.width==oldBounds.width&&bounds.height==oldBounds.height){
if(this.showing)this.parent.redraw(this.x,this.y,this.width,this.height,false);
return;
}}this.parent.updateItems();
}},"$wt.graphics.Image");
$_V(c$,"setText",
function(string){
if(this.handle!=null){
O$.clearChildren(this.handle);
this.textEl=d$.createElement("DIV");
this.textEl.className="ctab-item-main-default-left";
this.textEl.appendChild(d$.createTextNode(string));
this.handle.appendChild(this.textEl);
this.rightEl=d$.createElement("DIV");
this.rightEl.className=this.cssClassForRight();
this.handle.appendChild(this.rightEl);
this.configureRightEl();
this.parent.updateSelection(this.parent.getSelectionIndex());
}this.text=string;
},"~S");
$_M(c$,"configureRightEl",
function(){
if(this.showClose){
this.rightEl.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.custom.CTabFolderEvent(this.b$["$wt.custom.CTabItem"].parent);
e.widget=this.b$["$wt.custom.CTabItem"].parent;
e.time=this.b$["$wt.custom.CTabItem"].display.getLastEventTime();
e.item=this.b$["$wt.custom.CTabItem"];
e.doit=true;
var parent=this.b$["$wt.custom.CTabItem"].parent;
for(var j=0;j<parent.folderListeners.length;j++){
var listener=parent.folderListeners[j];
listener.close(e);
}
for(var j=0;j<parent.tabListeners.length;j++){
var listener=parent.tabListeners[j];
listener.itemClosed(e);
}
if(e.doit){
parent.destroyItem(this.b$["$wt.custom.CTabItem"]);
}});
c$=$_P();
}
return $_N($wt.custom.CTabItem$4,i$,v$);
})(this,null));
this.rightEl.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(true);
this.b$["$wt.custom.CTabItem"].rightEl.className=this.b$["$wt.custom.CTabItem"].rightEl.className.trim()+"-hover";
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$5,i$,v$);
})(this,null));
this.rightEl.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(false);
var idx=this.b$["$wt.custom.CTabItem"].rightEl.className.indexOf("-hover");
if(idx>=0){
this.b$["$wt.custom.CTabItem"].rightEl.className=this.b$["$wt.custom.CTabItem"].rightEl.className.substring(0,idx);
}});
c$=$_P();
}
return $_N($wt.custom.CTabItem$6,i$,v$);
})(this,null));
}});
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.custom.CTabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.custom.CTabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
O$.destroyHandle(this.textEl);
this.textEl=null;
}if(this.rightEl!=null){
O$.destroyHandle(this.rightEl);
this.rightEl=null;
}if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}$_U(this,$wt.custom.CTabItem,"releaseHandle",[]);
});
$_M(c$,"prepareCloseBtn",
function($in){
var key=" ctab-item-attach-close-right";
if(this.isSelected||!this.parent.showClose){
return;
}var idx=this.rightEl.className.indexOf(key);
if(idx!=-1){
this.rightEl.className=this.rightEl.className.substring(0,idx)+this.rightEl.className.substring(idx+key.length);
}if($in){
this.rightEl.className+=" ctab-item-attach-close-right";
}this.handle.style.height=(O$.getContainerHeight(this.textEl)+1)+"px";
this.rightEl.style.height=(O$.getContainerHeight(this.textEl)+1)+"px";
},"~B");
$_M(c$,"showCloseFocus",
function(){
});
$_M(c$,"cssClassForRight",
function(){
var cssName="ctab-item-attach-";
cssName+=this.parent.simple?"":"rounded-";
cssName+=this.parent.showClose?"default-":"noextrapos-";
cssName+="right";
return cssName;
});
$_S(c$,
"TOP_MARGIN",2,
"BOTTOM_MARGIN",2,
"LEFT_MARGIN",4,
"RIGHT_MARGIN",4,
"INTERNAL_SPACING",4,
"FLAGS",9,
"ELLIPSIS","...");
});
