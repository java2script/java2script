/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,j2s-swt-basic.z.js,j2s-swt-event.z.js,j2s-swt-layout.z.js,j2s-swt-widget.z.js,org/eclipse/swt/custom/SashForm.js,org/eclipse/swt/custom/SashFormData.js,org/eclipse/swt/custom/SashFormLayout.js,org/eclipse/swt/custom/StackLayout.js,org/eclipse/swt/custom/ViewForm.js,org/eclipse/swt/custom/ViewFormLayout.js,org/eclipse/swt/custom/CLabel.js,org/eclipse/swt/custom/CLayoutData.js,org/eclipse/swt/custom/CBanner.js,org/eclipse/swt/custom/CBannerLayout.js,org/eclipse/swt/custom/CTabFolderEvent.js,org/eclipse/swt/custom/CTabFolderListener.js,org/eclipse/swt/custom/CTabFolderLayout.js,org/eclipse/swt/custom/CTabFolderAdapter.js,org/eclipse/swt/custom/CTabFolder2Listener.js,org/eclipse/swt/custom/CTabFolder2Adapter.js,org/eclipse/swt/custom/CTabItem.js,org/eclipse/swt/custom/CTabFolder.js
=*/
c$=$_C(function(){
this.SASH_WIDTH=3;
this.sashStyle=0;
this.sashes=null;
this.$background=null;
this.$foreground=null;
this.controls=null;
this.maxControl=null;
this.sashListener=null;
$_Z(this,arguments);
},$wt.custom,"SashForm",$wt.widgets.Composite);
$_Y(c$,function(){
this.sashes=new Array(0);
this.controls=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.SashForm,[parent,$wt.custom.SashForm.checkStyle(style)]);
$_U(this,$wt.custom.SashForm,"setLayout",[new $wt.custom.SashFormLayout()]);
this.sashStyle=((style&512)!=0)?256:512;
if((style&2048)!=0)this.sashStyle|=2048;
if((style&65536)!=0)this.sashStyle|=65536;
this.sashListener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.SashForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"SashForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
this.b$["$wt.custom.SashForm"].onDragSash(e);
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.SashForm$1,i$,v$);
})(this,null);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=100665344;
return style&mask;
},"~N");
$_M(c$,"getOrientation",
function(){
return(this.sashStyle&512)!=0?256:512;
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.SashForm,"getStyle",[]);
style|=this.getOrientation()==512?512:256;
if((this.sashStyle&65536)!=0)style|=65536;
return style;
});
$_M(c$,"getMaximizedControl",
function(){
return this.maxControl;
});
$_M(c$,"getWeights",
function(){
var cArray=this.getControls(false);
var ratios=$_A(cArray.length,0);
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=parseInt(((data).weight*1000>>16));
}else{
ratios[i]=200;
}}
return ratios;
});
$_M(c$,"getControls",
function(onlyVisible){
var children=this.getChildren();
var result=new Array(0);
for(var i=0;i<children.length;i++){
if($_O(children[i],$wt.widgets.Sash))continue;if(onlyVisible&&!children[i].getVisible())continue;var newResult=new Array(result.length+1);
System.arraycopy(result,0,newResult,0,result.length);
newResult[result.length]=children[i];
result=newResult;
}
return result;
},"~B");
$_M(c$,"onDragSash",
function(event){
var sash=event.widget;
var sashIndex=-1;
for(var i=0;i<this.sashes.length;i++){
if(this.sashes[i]==sash){
sashIndex=i;
break;
}}
if(sashIndex==-1)return;
var c1=this.controls[sashIndex];
var c2=this.controls[sashIndex+1];
var b1=c1.getBounds();
var b2=c2.getBounds();
var sashBounds=sash.getBounds();
var area=this.getClientArea();
var correction=false;
if(this.getOrientation()==256){
correction=b1.width<20||b2.width<20;
var totalWidth=b2.x+b2.width-b1.x;
var shift=event.x-sashBounds.x;
b1.width+=shift;
b2.x+=shift;
b2.width-=shift;
if(b1.width<20){
b1.width=20;
b2.x=b1.x+b1.width+sashBounds.width;
b2.width=totalWidth-b2.x;
event.x=b1.x+b1.width;
event.doit=false;
}if(b2.width<20){
b1.width=totalWidth-20-sashBounds.width;
b2.x=b1.x+b1.width+sashBounds.width;
b2.width=20;
event.x=b1.x+b1.width;
event.doit=false;
}var data1=c1.getLayoutData();
if(data1==null||!($_O(data1,$wt.custom.SashFormData))){
data1=new $wt.custom.SashFormData();
c1.setLayoutData(data1);
}var data2=c2.getLayoutData();
if(data2==null||!($_O(data2,$wt.custom.SashFormData))){
data2=new $wt.custom.SashFormData();
c2.setLayoutData(data2);
}(data1).weight=Math.floor(((parseInt(b1.width)<<16)+area.width-1)/area.width);
(data2).weight=Math.floor(((parseInt(b2.width)<<16)+area.width-1)/area.width);
}else{
correction=b1.height<20||b2.height<20;
var totalHeight=b2.y+b2.height-b1.y;
var shift=event.y-sashBounds.y;
b1.height+=shift;
b2.y+=shift;
b2.height-=shift;
if(b1.height<20){
b1.height=20;
b2.y=b1.y+b1.height+sashBounds.height;
b2.height=totalHeight-b2.y;
event.y=b1.y+b1.height;
event.doit=false;
}if(b2.height<20){
b1.height=totalHeight-20-sashBounds.height;
b2.y=b1.y+b1.height+sashBounds.height;
b2.height=20;
event.y=b1.y+b1.height;
event.doit=false;
}var data1=c1.getLayoutData();
if(data1==null||!($_O(data1,$wt.custom.SashFormData))){
data1=new $wt.custom.SashFormData();
c1.setLayoutData(data1);
}var data2=c2.getLayoutData();
if(data2==null||!($_O(data2,$wt.custom.SashFormData))){
data2=new $wt.custom.SashFormData();
c2.setLayoutData(data2);
}(data1).weight=Math.floor(((parseInt(b1.height)<<16)+area.height-1)/area.height);
(data2).weight=Math.floor(((parseInt(b2.height)<<16)+area.height-1)/area.height);
}if(correction||(event.doit&&event.detail!=1)){
c1.setBounds(b1);
sash.setBounds(event.x,event.y,event.width,event.height);
c2.setBounds(b2);
}},"$wt.widgets.Event");
$_M(c$,"setOrientation",
function(orientation){
if(this.getOrientation()==orientation)return;
this.sashStyle&=-769;
this.sashStyle|=orientation==512?256:512;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].dispose();
this.sashes[i]=new $wt.widgets.Sash(this,this.sashStyle);
this.sashes[i].setBackground(this.$background);
this.sashes[i].setForeground(this.$foreground);
this.sashes[i].addListener(13,this.sashListener);
}
this.layout(false);
},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.SashForm,"setBackground",[color]);
this.$background=color;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setBackground(this.$background);
}
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.SashForm,"setForeground",[color]);
this.$foreground=color;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setForeground(this.$foreground);
}
},"$wt.graphics.Color");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximizedControl",
function(control){
if(control==null){
if(this.maxControl!=null){
this.maxControl=null;
this.layout(false);
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setVisible(true);
}
}return;
}for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setVisible(false);
}
this.maxControl=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setWeights",
function(weights){
var cArray=this.getControls(false);
var total=0;
for(var i=0;i<weights.length;i++){
total+=weights[i];
}
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data==null||!($_O(data,$wt.custom.SashFormData))){
data=new $wt.custom.SashFormData();
cArray[i].setLayoutData(data);
}(data).weight=Math.floor(((parseInt(weights[i])<<16)+total-1)/total);
}
this.layout(false);
},"~A");
$_S(c$,
"DRAG_MINIMUM",20);
c$=$_C(function(){
this.weight=0;
$_Z(this,arguments);
},$wt.custom,"SashFormData");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
return this.getName()+" {weight="+this.weight+"}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"SashFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var sashForm=composite;
var cArray=sashForm.getControls(true);
var width=0;
var height=0;
if(cArray.length==0){
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
}var vertical=sashForm.getOrientation()==512;
var maxIndex=0;
var maxValue=0;
for(var i=0;i<cArray.length;i++){
if(vertical){
var size=cArray[i].computeSize(wHint,-1,flushCache);
if(size.y>maxValue){
maxIndex=i;
maxValue=size.y;
}width=Math.max(width,size.x);
}else{
var size=cArray[i].computeSize(-1,hHint,flushCache);
if(size.x>maxValue){
maxIndex=i;
maxValue=size.x;
}height=Math.max(height,size.y);
}}
var ratios=$_A(cArray.length,0);
var total=0;
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
cArray[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
if(ratios[maxIndex]>0){
var sashwidth=sashForm.sashes.length>0?sashForm.SASH_WIDTH+sashForm.sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(vertical){
height+=parseInt((Math.floor(total*maxValue/ratios[maxIndex])))+(cArray.length-1)*sashwidth;
}else{
width+=parseInt((Math.floor(total*maxValue/ratios[maxIndex])))+(cArray.length-1)*sashwidth;
}}width+=sashForm.getBorderWidth()*2;
height+=sashForm.getBorderWidth()*2;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var sashForm=composite;
var area=sashForm.getClientArea();
if(area.width<=1||area.height<=1)return;
var newControls=sashForm.getControls(true);
if(sashForm.controls.length==0&&newControls.length==0)return;
sashForm.controls=newControls;
var controls=sashForm.controls;
if(sashForm.maxControl!=null&&!sashForm.maxControl.isDisposed()){
for(var i=0;i<controls.length;i++){
if(controls[i]!=sashForm.maxControl){
controls[i].setBounds(-200,-200,0,0);
}else{
controls[i].setBounds(area);
}}
return;
}if(sashForm.sashes.length<controls.length-1){
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,sashForm.sashes.length);
for(var i=sashForm.sashes.length;i<newSashes.length;i++){
newSashes[i]=new $wt.widgets.Sash(sashForm,sashForm.sashStyle);
newSashes[i].setBackground(sashForm.$background);
newSashes[i].setForeground(sashForm.$foreground);
newSashes[i].addListener(13,sashForm.sashListener);
}
sashForm.sashes=newSashes;
}if(sashForm.sashes.length>controls.length-1){
if(controls.length==0){
for(var i=0;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=new Array(0);
}else{
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,newSashes.length);
for(var i=controls.length-1;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=newSashes;
}}if(controls.length==0)return;
var sashes=sashForm.sashes;
var ratios=$_A(controls.length,0);
var total=0;
for(var i=0;i<controls.length;i++){
var data=controls[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
controls[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
var sashwidth=sashes.length>0?sashForm.SASH_WIDTH+sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(sashForm.getOrientation()==256){
var width=parseInt((Math.floor(ratios[0]*(area.width-sashes.length*sashwidth)/total)));
var x=area.x;
controls[0].setBounds(x,area.y,width,area.height);
x+=width;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=parseInt((Math.floor(ratios[i]*(area.width-sashes.length*sashwidth)/total)));
controls[i].setBounds(x,area.y,width,area.height);
x+=width;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=area.width-x;
controls[controls.length-1].setBounds(x,area.y,width,area.height);
}}else{
var height=parseInt((Math.floor(ratios[0]*(area.height-sashes.length*sashwidth)/total)));
var y=area.y;
controls[0].setBounds(area.x,y,area.width,height);
y+=height;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=parseInt((Math.floor(ratios[i]*(area.height-sashes.length*sashwidth)/total)));
controls[i].setBounds(area.x,y,area.width,height);
y+=height;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=area.height-y;
controls[controls.length-1].setBounds(area.x,y,area.width,height);
}}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.topControl=null;
$_Z(this,arguments);
},$wt.custom,"StackLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var children=composite.getChildren();
var maxWidth=0;
var maxHeight=0;
for(var i=0;i<children.length;i++){
var size=children[i].computeSize(wHint,hHint,flushCache);
maxWidth=Math.max(size.x,maxWidth);
maxHeight=Math.max(size.y,maxHeight);
}
var width=maxWidth+2*this.marginWidth;
var height=maxHeight+2*this.marginHeight;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var children=composite.getChildren();
var rect=composite.getClientArea();
rect.x+=this.marginWidth;
rect.y+=this.marginHeight;
rect.width-=2*this.marginWidth;
rect.height-=2*this.marginHeight;
for(var i=0;i<children.length;i++){
if(children[i]!=this.topControl){
children[i].handle.style.display="none";
}else{
children[i].setBounds(rect);
children[i].handle.style.display="block";
}}
},"$wt.widgets.Composite,~B");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.topControl!=null)string+="topControl="+this.topControl+" ";
string=string.trim();
string+="}";
return string;
});
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.horizontalSpacing=1;
this.verticalSpacing=1;
this.topLeft=null;
this.topCenter=null;
this.topRight=null;
this.content=null;
this.separateTopCenter=false;
this.showBorder=false;
this.separator=-1;
this.borderTop=0;
this.borderBottom=0;
this.borderLeft=0;
this.borderRight=0;
this.highlight=0;
this.oldSize=null;
this.selectionBackground=null;
$_Z(this,arguments);
},$wt.custom,"ViewForm",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.ViewForm,[parent,$wt.custom.ViewForm.checkStyle(style)]);
$_U(this,$wt.custom.ViewForm,"setLayout",[new $wt.custom.ViewFormLayout()]);
this.setBorderVisible((style&2048)!=0);
var listener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.ViewForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"ViewForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 12:
this.b$["$wt.custom.ViewForm"].onDispose();
break;
case 9:
this.b$["$wt.custom.ViewForm"].onPaint(e.gc);
break;
case 11:
this.b$["$wt.custom.ViewForm"].onResize();
break;
}
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.ViewForm$1,i$,v$);
})(this,null);
var events=[12,9,11];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=109051904;
return style&mask|1048576;
},"~N");
$_V(c$,"computeTrim",
function(x,y,width,height){
var trimX=x-this.borderLeft-this.highlight;
var trimY=y-this.borderTop-this.highlight;
var trimWidth=width+this.borderLeft+this.borderRight+2*this.highlight;
var trimHeight=height+this.borderTop+this.borderBottom+2*this.highlight;
return new $wt.graphics.Rectangle(trimX,trimY,trimWidth,trimHeight);
},"~N,~N,~N,~N");
$_M(c$,"getClientArea",
function(){
var clientArea=$_U(this,$wt.custom.ViewForm,"getClientArea",[]);
clientArea.x+=this.borderLeft;
clientArea.y+=this.borderTop;
clientArea.width-=this.borderLeft+this.borderRight;
clientArea.height-=this.borderTop+this.borderBottom;
return clientArea;
});
$_M(c$,"getContent",
function(){
return this.content;
});
$_M(c$,"getTopCenter",
function(){
return this.topCenter;
});
$_M(c$,"getTopLeft",
function(){
return this.topLeft;
});
$_M(c$,"getTopRight",
function(){
return this.topRight;
});
$_M(c$,"onDispose",
function(){
this.topLeft=null;
this.topCenter=null;
this.topRight=null;
this.content=null;
this.oldSize=null;
this.selectionBackground=null;
});
$_M(c$,"onPaint",
function(gc){
var gcForeground=gc.getForeground();
var size=this.getSize();
var border=this.getDisplay().getSystemColor(18);
if(this.showBorder){
gc.setForeground(border);
gc.drawRectangle(0,0,size.x-1,size.y-1);
if(this.highlight>0){
var x1=1;
var y1=1;
var x2=size.x-1;
var y2=size.y-1;
var shape=[x1,y1,x2,y1,x2,y2,x1,y2,x1,y1+this.highlight,x1+this.highlight,y1+this.highlight,x1+this.highlight,y2-this.highlight,x2-this.highlight,y2-this.highlight,x2-this.highlight,y1+this.highlight,x1,y1+this.highlight];
var highlightColor=this.getDisplay().getSystemColor(26);
gc.setBackground(highlightColor);
}}if(this.separator>-1){
gc.setForeground(border);
gc.drawLine(this.borderLeft+this.highlight,this.separator,size.x-this.borderLeft-this.borderRight-this.highlight,this.separator);
}gc.setForeground(gcForeground);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
var size=this.getSize();
if(this.oldSize==null||this.oldSize.x==0||this.oldSize.y==0){
this.redraw();
}else{
var width=0;
if(this.oldSize.x<size.x){
width=size.x-this.oldSize.x+this.borderRight+this.highlight;
}else if(this.oldSize.x>size.x){
width=this.borderRight+this.highlight;
}this.redraw(size.x-width,0,width,size.y,false);
var height=0;
if(this.oldSize.y<size.y){
height=size.y-this.oldSize.y+this.borderBottom+this.highlight;
}if(this.oldSize.y>size.y){
height=this.borderBottom+this.highlight;
}this.redraw(0,size.y-height,size.x,height,false);
}this.oldSize=size;
});
$_M(c$,"setContent",
function(content){
if(this.content!=null&&!this.content.isDisposed()){
this.content.setBounds(-200,-200,0,0);
}this.content=content;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setSelectionBackground",
function(color){
if(this.selectionBackground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(25);
this.selectionBackground=color;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setTopCenter",
function(topCenter){
if(this.topCenter!=null&&!this.topCenter.isDisposed()){
var size=this.topCenter.getSize();
this.topCenter.setLocation(-200-size.x,-200-size.y);
}this.topCenter=topCenter;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopLeft",
function(c){
if(this.topLeft!=null&&!this.topLeft.isDisposed()){
var size=this.topLeft.getSize();
this.topLeft.setLocation(-200-size.x,-200-size.y);
}this.topLeft=c;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(c){
if(this.topRight!=null&&!this.topRight.isDisposed()){
var size=this.topRight.getSize();
this.topRight.setLocation(-200-size.x,-200-size.y);
}this.topRight=c;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setBorderVisible",
function(show){
if(this.showBorder==show)return;
this.showBorder=show;
if(this.showBorder){
this.borderLeft=this.borderTop=this.borderRight=this.borderBottom=1;
if((this.getStyle()&8388608)==0)this.highlight=2;
}else{
this.borderBottom=this.borderTop=this.borderLeft=this.borderRight=0;
this.highlight=0;
}this.layout(false);
this.redraw();
},"~B");
$_M(c$,"setTopCenterSeparate",
function(show){
this.separateTopCenter=show;
this.layout(false);
},"~B");
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"OFFSCREEN",-200,
"BORDER1_COLOR",18,
"SELECTION_BACKGROUND",25);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"ViewFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var form=composite;
var left=form.topLeft;
var center=form.topCenter;
var right=form.topRight;
var content=form.content;
var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
leftSize=this.computeChildSize(left,-1,-1,flushCache);
}var centerSize=new $wt.graphics.Point(0,0);
if(center!=null){
centerSize=this.computeChildSize(center,-1,-1,flushCache);
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
rightSize=this.computeChildSize(right,-1,-1,flushCache);
}var size=new $wt.graphics.Point(0,0);
if(form.separateTopCenter||(wHint!=-1&&leftSize.x+centerSize.x+rightSize.x>wHint)){
size.x=leftSize.x+rightSize.x;
if(leftSize.x>0&&rightSize.x>0)size.x+=form.horizontalSpacing;
size.x=Math.max(centerSize.x,size.x);
size.y=Math.max(leftSize.y,rightSize.y);
if(center!=null){
size.y+=centerSize.y;
if(left!=null||right!=null)size.y+=form.verticalSpacing;
}}else{
size.x=leftSize.x+centerSize.x+rightSize.x;
var count=-1;
if(leftSize.x>0)count++;
if(centerSize.x>0)count++;
if(rightSize.x>0)count++;
if(count>0)size.x+=count*form.horizontalSpacing;
size.y=Math.max(leftSize.y,Math.max(centerSize.y,rightSize.y));
}if(content!=null){
if(left!=null||right!=null||center!=null)size.y+=1;
var contentSize=new $wt.graphics.Point(0,0);
contentSize=this.computeChildSize(content,-1,-1,flushCache);
size.x=Math.max(size.x,contentSize.x);
size.y+=contentSize.y;
if(size.y>contentSize.y)size.y+=form.verticalSpacing;
}size.x+=2*form.marginWidth;
size.y+=2*form.marginHeight;
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
return size;
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(control,wHint,hHint,flushCache){
var data=control.getLayoutData();
if(data==null||!($_O(data,$wt.custom.CLayoutData))){
data=new $wt.custom.CLayoutData();
control.setLayoutData(data);
}return(data).computeSize(control,wHint,hHint,flushCache);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(c){
if($_O(c,$wt.widgets.Scrollable)){
var rect=(c).computeTrim(0,0,0,0);
return rect.width;
}return c.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null&&$_O(data,$wt.custom.CLayoutData))(data).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var form=composite;
var left=form.topLeft;
var center=form.topCenter;
var right=form.topRight;
var content=form.content;
var rect=composite.getClientArea();
var leftSize=new $wt.graphics.Point(0,0);
if(left!=null&&!left.isDisposed()){
leftSize=this.computeChildSize(left,-1,-1,flushCache);
}var centerSize=new $wt.graphics.Point(0,0);
if(center!=null&&!center.isDisposed()){
centerSize=this.computeChildSize(center,-1,-1,flushCache);
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null&&!right.isDisposed()){
rightSize=this.computeChildSize(right,-1,-1,flushCache);
}var minTopWidth=leftSize.x+centerSize.x+rightSize.x+2*form.marginWidth+2*form.highlight;
var count=-1;
if(leftSize.x>0)count++;
if(centerSize.x>0)count++;
if(rightSize.x>0)count++;
if(count>0)minTopWidth+=count*form.horizontalSpacing;
var x=rect.x+rect.width-form.marginWidth-form.highlight;
var y=rect.y+form.marginHeight+form.highlight;
var top=false;
if(form.separateTopCenter||minTopWidth>rect.width){
var topHeight=Math.max(rightSize.y,leftSize.y);
if(right!=null&&!right.isDisposed()){
top=true;
x-=rightSize.x;
right.setBounds(x,y,rightSize.x,topHeight);
x-=form.horizontalSpacing;
}if(left!=null&&!left.isDisposed()){
top=true;
var trim=this.computeTrim(left);
var leftW=x-rect.x-form.marginWidth-form.highlight-trim;
leftSize=this.computeChildSize(left,leftW,-1,false);
left.setBounds(rect.x+form.marginWidth+form.highlight,y,leftSize.x,topHeight);
}if(top)y+=topHeight+form.verticalSpacing;
if(center!=null&&!center.isDisposed()){
top=true;
var trim=this.computeTrim(center);
var w=rect.width-2*form.marginWidth-2*form.highlight-trim;
centerSize=this.computeChildSize(center,w,-1,false);
center.setBounds(rect.x+rect.width-form.marginWidth-form.highlight-centerSize.x,y,centerSize.x,centerSize.y);
y+=centerSize.y+form.verticalSpacing;
}}else{
var topHeight=Math.max(rightSize.y,Math.max(centerSize.y,leftSize.y));
if(right!=null&&!right.isDisposed()){
top=true;
x-=rightSize.x;
right.setBounds(x,y,rightSize.x,topHeight);
x-=form.horizontalSpacing;
}if(center!=null&&!center.isDisposed()){
top=true;
x-=centerSize.x;
center.setBounds(x,y,centerSize.x,topHeight);
x-=form.horizontalSpacing;
}if(left!=null&&!left.isDisposed()){
top=true;
var trim=$_O(left,$wt.widgets.Composite)?(left).computeTrim(0,0,0,0):new $wt.graphics.Rectangle(0,0,0,0);
var w=x-rect.x-form.marginWidth-form.highlight-trim.width;
var h=topHeight-trim.height;
leftSize=this.computeChildSize(left,w,h,false);
left.setBounds(rect.x+form.marginWidth+form.highlight,y,leftSize.x,topHeight);
}if(top)y+=topHeight+form.verticalSpacing;
}var oldSeperator=form.separator;
form.separator=-1;
if(content!=null&&!content.isDisposed()){
if(left!=null||right!=null||center!=null){
form.separator=y;
y++;
}content.setBounds(rect.x+form.marginWidth+form.highlight,y,rect.width-2*form.marginWidth-2*form.highlight,rect.y+rect.height-y-form.marginHeight-form.highlight);
}if(oldSeperator!=-1&&form.separator!=-1){
var t=Math.min(form.separator,oldSeperator);
var b=Math.max(form.separator,oldSeperator);
form.redraw(form.borderLeft,t,form.getSize().x-form.borderLeft-form.borderRight,b-t,false);
}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.align=16384;
this.hIndent=3;
this.vIndent=3;
this.text=null;
this.image=null;
this.appToolTipText=null;
this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
$_Z(this,arguments);
},$wt.custom,"CLabel",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CLabel,[parent,$wt.custom.CLabel.checkStyle(style)]);
if((style&(16908288))==0)style|=16384;
if((style&16777216)!=0)this.align=16777216;
if((style&131072)!=0)this.align=131072;
if((style&16384)!=0)this.align=16384;
this.addPaintListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$1",null,$wt.events.PaintListener);
$_V(c$,"paintControl",
function(event){
this.b$["$wt.custom.CLabel"].onPaint(event);
},"$wt.events.PaintEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$1,i$,v$);
})(this,null));
this.addDisposeListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$2",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(event){
this.b$["$wt.custom.CLabel"].onDispose(event);
},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$2,i$,v$);
})(this,null));
this.addTraverseListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$3",null,$wt.events.TraverseListener);
$_V(c$,"keyTraversed",
function(event){
if(event.detail==128){
this.b$["$wt.custom.CLabel"].onMnemonic(event);
}},"$wt.events.TraverseEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$3,i$,v$);
})(this,null));
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
if((style&2048)!=0)style|=4;
var mask=100663340;
style=style&mask;
style|=524288;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
return style|262144;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var e=this.getTotalSize(this.image,this.text);
if(wHint==-1){
e.x+=2*this.hIndent;
}else{
e.x=wHint;
}if(hHint==-1){
e.y+=2*this.vIndent;
}else{
e.y=hHint;
}return e;
},"~N,~N,~B");
$_M(c$,"drawBevelRect",
($fz=function(gc,x,y,w,h,topleft,bottomright){
gc.setForeground(bottomright);
gc.drawLine(x+w,y,x+w,y+h);
gc.drawLine(x,y+h,x+w,y+h);
gc.setForeground(topleft);
gc.drawLine(x,y,x+w-1,y);
gc.drawLine(x,y,x,y+h-1);
},$fz.isPrivate=true,$fz),"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
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
$_M(c$,"getAlignment",
function(){
return this.align;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getTotalSize",
($fz=function(image,text){
var size=new $wt.graphics.Point(0,0);
if(image!=null){
var r=image.getBounds();
size.x+=r.width;
size.y+=r.height;
}var gc=new $wt.graphics.GC(this);
if(text!=null&&text.length>0){
var e=gc.textExtent(text,$wt.custom.CLabel.DRAW_FLAGS);
size.x+=e.x;
size.y=Math.max(size.y,e.y);
if(image!=null)size.x+=5;
}else{
size.y=Math.max(size.y,gc.getFontMetrics().getHeight());
}gc.dispose();
return size;
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~S");
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CLabel,"getStyle",[]);
switch(this.align){
case 131072:
style|=131072;
break;
case 16777216:
style|=16777216;
break;
case 16384:
style|=16384;
break;
}
return style;
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"getToolTipText",
function(){
return this.appToolTipText;
});
$_M(c$,"onDispose",
function(event){
this.gradientColors=null;
this.gradientPercents=null;
this.backgroundImage=null;
this.text=null;
this.image=null;
this.appToolTipText=null;
},"$wt.events.DisposeEvent");
$_M(c$,"onMnemonic",
function(event){
var mnemonic=this._findMnemonic(this.text);
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return;
if((Character.toUpperCase(event.character)).charCodeAt(0)!=(Character.toUpperCase(mnemonic)).charCodeAt(0))return;
var control=this.getParent();
while(control!=null){
var children=control.getChildren();
var index=0;
while(index<children.length){
if(children[index]==this)break;
index++;
}
index++;
if(index<children.length){
if(children[index].setFocus()){
event.doit=true;
event.detail=0;
}}control=control.getParent();
}
},"$wt.events.TraverseEvent");
$_M(c$,"onPaint",
function(event){
var rect=this.getClientArea();
for(var i=this.handle.childNodes.length-1;i>=0;i--){
this.handle.removeChild(this.handle.childNodes[i]);
}
if(rect.width==0||rect.height==0)return;
var shortenText=false;
var t=this.text;
var img=this.image;
var availableWidth=Math.max(0,rect.width-2*this.hIndent);
var extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
img=null;
extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
shortenText=true;
}}var gc=event.gc;
var lines=this.text==null?null:this.splitString(this.text);
if(shortenText){
extent.x=0;
for(var i=0;i<lines.length;i++){
var e=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS);
if(e.x>availableWidth){
lines[i]=this.shortenText(gc,lines[i],availableWidth);
extent.x=Math.max(extent.x,this.getTotalSize(null,lines[i]).x);
}else{
extent.x=Math.max(extent.x,e.x);
}}
if(this.appToolTipText==null){
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.text]);
}}else{
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.appToolTipText]);
}var x=rect.x+this.hIndent;
if(this.align==16777216){
x=Math.floor((rect.width-extent.x)/2);
}if(this.align==131072){
x=rect.width-this.hIndent-extent.x;
}try{
if(this.backgroundImage!=null){
var imageRect=this.backgroundImage.getBounds();
gc.setBackground(this.getBackground());
gc.fillRectangle(rect);
var xPos=0;
while(xPos<rect.width){
var yPos=0;
while(yPos<rect.height){
gc.drawImage(this.backgroundImage,xPos,yPos);
yPos+=imageRect.height;
}
xPos+=imageRect.width;
}
}else if(this.gradientColors!=null){
var oldBackground=gc.getBackground();
if(this.gradientColors.length==1){
if(this.gradientColors[0]!=null)gc.setBackground(this.gradientColors[0]);
gc.fillRectangle(0,0,rect.width,rect.height);
}else{
var oldForeground=gc.getForeground();
var lastColor=this.gradientColors[0];
if(lastColor==null)lastColor=oldBackground;
var pos=0;
for(var i=0;i<this.gradientPercents.length;++i){
gc.setForeground(lastColor);
lastColor=this.gradientColors[i+1];
if(lastColor==null)lastColor=oldBackground;
gc.setBackground(lastColor);
if(this.gradientVertical){
var gradientHeight=(Math.floor(this.gradientPercents[i]*rect.height/100))-pos;
gc.fillGradientRectangle(0,pos,rect.width,gradientHeight,true);
pos+=gradientHeight;
}else{
var gradientWidth=(Math.floor(this.gradientPercents[i]*rect.width/100))-pos;
gc.fillGradientRectangle(pos,0,gradientWidth,rect.height,false);
pos+=gradientWidth;
}}
if(this.gradientVertical&&pos<rect.height){
gc.setBackground(this.getBackground());
System.out.println("$$$$$$$$$$$$$");
gc.fillRectangle(0,pos,rect.width,rect.height-pos);
}if(!this.gradientVertical&&pos<rect.width){
gc.setBackground(this.getBackground());
System.out.println("***********");
gc.fillRectangle(pos,0,rect.width-pos,rect.height);
}gc.setForeground(oldForeground);
}gc.setBackground(oldBackground);
}else{
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("============"+rect);
gc.fillRectangle(rect);
}}}catch(e){
if($_O(e,$wt.SWTException)){
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("--------");
gc.fillRectangle(rect);
}}else{
throw e;
}
}
var style=this.getStyle();
if((style&4)!=0||(style&8)!=0){
this.paintBorder(gc,rect);
}if(img!=null){
var imageRect=img.getBounds();
gc.drawImage(img,0,0,imageRect.width,imageRect.height,x,Math.floor((rect.height-imageRect.height)/2),imageRect.width,imageRect.height);
x+=imageRect.width+5;
extent.x-=imageRect.width+5;
}if(lines!=null){
var lineHeight=gc.getFontMetrics().getHeight();
var textHeight=lines.length*lineHeight;
var lineY=Math.max(this.vIndent,rect.y+Math.floor((rect.height-textHeight)/2));
gc.setForeground(this.getForeground());
for(var i=0;i<lines.length;i++){
var lineX=x;
if(lines.length>1){
if(this.align==16777216){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=x+Math.max(0,Math.floor((extent.x-lineWidth)/2));
}if(this.align==131072){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=Math.max(x,rect.x+rect.width-this.hIndent-lineWidth);
}}gc.drawText(lines[i],lineX,lineY,$wt.custom.CLabel.DRAW_FLAGS);
lineY+=lineHeight;
}
}System.out.println("end on paint");
System.out.println(this.getSize());
},"$wt.events.PaintEvent");
$_M(c$,"paintBorder",
($fz=function(gc,r){
var disp=this.getDisplay();
var c1=null;
var c2=null;
var style=this.getStyle();
if((style&4)!=0){
c1=disp.getSystemColor(18);
c2=disp.getSystemColor(20);
}if((style&8)!=0){
c1=disp.getSystemColor(19);
c2=disp.getSystemColor(18);
}if(c1!=null&&c2!=null){
gc.setLineWidth(1);
this.drawBevelRect(gc,r.x,r.y,r.width-1,r.height-1,c1,c2);
}},$fz.isPrivate=true,$fz),"$wt.graphics.GC,$wt.graphics.Rectangle");
$_M(c$,"setAlignment",
function(align){
if(this.align!=align){
this.align=align;
this.redraw();
}},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CLabel,"setBackground",[color]);
if(color!=null&&this.backgroundImage==null&&this.gradientColors==null&&this.gradientPercents==null){
var background=this.getBackground();
if(color.equals(background)){
return;
}}this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}for(var i=0;i<percents.length;i++){
}
}var background=this.getBackground();
if(this.backgroundImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
same=(this.gradientColors[i]==colors[i])||((this.gradientColors[i]==null)&&(colors[i]==background))||((this.gradientColors[i]==background)&&(colors[i]==null));
if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.backgroundImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i)this.gradientColors[i]=(colors[i]!=null)?colors[i]:background;

this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i)this.gradientPercents[i]=percents[i];

this.gradientVertical=vertical;
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image==this.backgroundImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.backgroundImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.custom.CLabel,"setFont",[font]);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
if(image!=this.image){
this.image=image;
this.redraw();
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(text){
if(text==null)text="";
if(!text.equals(this.text)){
this.text=text;
this.redraw();
}},"~S");
$_M(c$,"setToolTipText",
function(string){
$_U(this,$wt.custom.CLabel,"setToolTipText",[string]);
this.appToolTipText=$_U(this,$wt.custom.CLabel,"getToolTipText",[]);
},"~S");
$_M(c$,"shortenText",
function(gc,t,width){
if(t==null)return null;
var w=gc.textExtent($wt.custom.CLabel.ELLIPSIS,$wt.custom.CLabel.DRAW_FLAGS).x;
var l=t.length;
var pivot=Math.floor(l/2);
var s=pivot;
var e=pivot+1;
while(s>=0&&e<l){
var s1=t.substring(0,s);
var s2=t.substring(e,l);
var l1=gc.textExtent(s1,$wt.custom.CLabel.DRAW_FLAGS).x;
var l2=gc.textExtent(s2,$wt.custom.CLabel.DRAW_FLAGS).x;
if(l1+w+l2<width){
t=s1+$wt.custom.CLabel.ELLIPSIS+s2;
break;
}s--;
e++;
}
return t;
},"$wt.graphics.GC,~S,~N");
$_M(c$,"splitString",
($fz=function(text){
var lines=new Array(1);
var start=0;
var pos;
do{
pos=text.indexOf('\n',start);
if(pos==-1){
lines[lines.length-1]=text.substring(start);
}else{
var crlf=(pos>0)&&((text.charAt(pos-1)).charCodeAt(0)==('\r').charCodeAt(0));
lines[lines.length-1]=text.substring(start,pos-(crlf?1:0));
start=pos+1;
var newLines=new Array(lines.length+1);
System.arraycopy(lines,0,newLines,0,lines.length);
lines=newLines;
}}while(pos!=-1);
return lines;
},$fz.isPrivate=true,$fz),"~S");
$_S(c$,
"GAP",5,
"INDENT",3,
"ELLIPSIS","...",
"DRAW_FLAGS",15);
c$=$_C(function(){
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.custom,"CLayoutData");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(flushCache)this.flushCache();
if(wHint==-1&&hHint==-1){
if(this.defaultWidth==-1||this.defaultHeight==-1){
var size=control.computeSize(wHint,hHint,flushCache);
this.defaultWidth=size.x;
this.defaultHeight=size.y;
}return new $wt.graphics.Point(this.defaultWidth,this.defaultHeight);
}if(this.currentWidth==-1||this.currentHeight==-1||wHint!=this.currentWhint||hHint!=this.currentHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.currentWhint=wHint;
this.currentHhint=hHint;
this.currentWidth=size.x;
this.currentHeight=size.y;
}return new $wt.graphics.Point(this.currentWidth,this.currentHeight);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
c$=$_C(function(){
this.$left=null;
this.right=null;
this.bottom=null;
this.simple=true;
this.curve=null;
this.curveStart=0;
this.curveRect=null;
this.curve_width=5;
this.curve_indent=-2;
this.rightWidth=-1;
this.rightMinWidth=-1;
this.rightMinHeight=-1;
this.resizeCursor=null;
this.dragging=false;
this.rightDragDisplacement=0;
$_Z(this,arguments);
},$wt.custom,"CBanner",$wt.widgets.Composite);
$_Y(c$,function(){
this.curveRect=new $wt.graphics.Rectangle(0,0,0,0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CBanner,[parent,$wt.custom.CBanner.checkStyle(style)]);
$_U(this,$wt.custom.CBanner,"setLayout",[new $wt.custom.CBannerLayout()]);
this.updateCurve(25);
this.resizeCursor=new $wt.graphics.Cursor(this.getDisplay(),9);
var listener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CBanner$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CBanner$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 12:
this.b$["$wt.custom.CBanner"].onDispose();
break;
case 3:
this.b$["$wt.custom.CBanner"].onMouseDown(e.x,e.y);
break;
case 7:
this.b$["$wt.custom.CBanner"].onMouseExit();
break;
case 5:
this.b$["$wt.custom.CBanner"].onMouseMove(e.x,e.y);
break;
case 4:
this.b$["$wt.custom.CBanner"].onMouseUp();
break;
case 9:
this.b$["$wt.custom.CBanner"].onPaint(e.gc);
break;
case 11:
this.b$["$wt.custom.CBanner"].onResize();
break;
}
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.CBanner$1,i$,v$);
})(this,null);
var events=[12,3,7,5,4,9,11];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
},"$wt.widgets.Composite,~N");
c$.bezier=$_M(c$,"bezier",
function(x0,y0,x1,y1,x2,y2,x3,y3,count){
var a0=x0;
var a1=3*(x1-x0);
var a2=3*(x0+x2-2*x1);
var a3=x3-x0+3*x1-3*x2;
var b0=y0;
var b1=3*(y1-y0);
var b2=3*(y0+y2-2*y1);
var b3=y3-y0+3*y1-3*y2;
var polygon=$_A(2*count+2,0);
for(var i=0;i<=count;i++){
var t=i/count;
polygon[2*i]=parseInt((a0+a1*t+a2*t*t+a3*t*t*t));
polygon[2*i+1]=parseInt((b0+b1*t+b2*t*t+b3*t*t*t));
}
return polygon;
},"~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return 0;
},"~N");
$_M(c$,"getBottom",
function(){
return this.bottom;
});
$_V(c$,"getClientArea",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getLeft",
function(){
return this.$left;
});
$_M(c$,"getRight",
function(){
return this.right;
});
$_M(c$,"getRightMinimumSize",
function(){
return new $wt.graphics.Point(this.rightMinWidth,this.rightMinHeight);
});
$_M(c$,"getRightWidth",
function(){
if(this.right==null)return 0;
if(this.rightWidth==-1){
var size=this.right.computeSize(-1,this.getSize().y,false);
return size.x;
}return this.rightWidth;
});
$_M(c$,"getSimple",
function(){
return this.simple;
});
$_M(c$,"onDispose",
function(){
if(this.resizeCursor!=null)this.resizeCursor.dispose();
this.resizeCursor=null;
this.$left=null;
this.right=null;
});
$_M(c$,"onMouseDown",
function(x,y){
if(this.curveRect.contains(x,y)){
this.dragging=true;
this.rightDragDisplacement=this.curveStart-x+this.curve_width-this.curve_indent;
}},"~N,~N");
$_M(c$,"onMouseExit",
function(){
if(!this.dragging)this.setCursor(null);
});
$_M(c$,"onMouseMove",
function(x,y){
if(this.dragging){
var size=this.getSize();
if(!(0<x&&x<size.x))return;
this.rightWidth=Math.max(0,size.x-x-this.rightDragDisplacement);
if(this.rightMinWidth!=-1){
this.rightWidth=Math.max(this.rightMinWidth,this.rightWidth);
}this.layout(false);
return;
}if(this.curveRect.contains(x,y)){
this.setCursor(this.resizeCursor);
}else{
this.setCursor(null);
}},"~N,~N");
$_M(c$,"onMouseUp",
function(){
this.dragging=false;
});
$_M(c$,"onPaint",
function(gc){
var size=this.getSize();
var border1=this.getDisplay().getSystemColor($wt.custom.CBanner.BORDER1);
if(this.bottom!=null&&(this.$left!=null||this.right!=null)){
gc.setForeground(border1);
var y=this.bottom.getBounds().y-1-1;
gc.drawLine(0,y,size.x,y);
}if(this.$left==null||this.right==null)return;
var line1=$_A(this.curve.length+6,0);
var index=0;
var x=this.curveStart;
var y=0;
line1[index++]=x+1;
line1[index++]=size.y-1;
for(var i=0;i<Math.floor(this.curve.length/2);i++){
line1[index++]=x+this.curve[2*i];
line1[index++]=y+this.curve[2*i+1];
}
line1[index++]=x+this.curve_width;
line1[index++]=0;
line1[index++]=size.x;
line1[index++]=0;
var background=this.getBackground();
if(this.getDisplay().getDepth()>=15){
var line2=$_A(line1.length,0);
index=0;
for(var i=0;i<Math.floor(line1.length/2);i++){
line2[index]=line1[index++]-1;
line2[index]=line1[index++];
}
var line3=$_A(line1.length,0);
index=0;
for(var i=0;i<Math.floor(line1.length/2);i++){
line3[index]=line1[index++]+1;
line3[index]=line1[index++];
}
var from=border1.getRGB();
var to=background.getRGB();
var red=from.red+Math.floor(3*(to.red-from.red)/4);
var green=from.green+Math.floor(3*(to.green-from.green)/4);
var blue=from.blue+Math.floor(3*(to.blue-from.blue)/4);
var color=new $wt.graphics.Color(this.getDisplay(),red,green,blue);
gc.setForeground(color);
color.dispose();
var x1=Math.max(0,this.curveStart-200);
gc.setForeground(background);
gc.setBackground(border1);
gc.fillGradientRectangle(x1,size.y-1,this.curveStart-x1+1,1,false);
}else{
var x1=Math.max(0,this.curveStart-200);
gc.setForeground(border1);
gc.drawLine(x1,size.y-1,this.curveStart+1,size.y-1);
}gc.setForeground(border1);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
this.updateCurve(this.getSize().y);
});
$_M(c$,"setBottom",
function(control){
if(this.bottom!=null&&!this.bottom.isDisposed()){
var size=this.bottom.getSize();
this.bottom.setLocation(-200-size.x,-200-size.y);
}this.bottom=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setLeft",
function(control){
if(this.$left!=null&&!this.$left.isDisposed()){
var size=this.$left.getSize();
this.$left.setLocation(-200-size.x,-200-size.y);
}this.$left=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRight",
function(control){
if(this.right!=null&&!this.right.isDisposed()){
var size=this.right.getSize();
this.right.setLocation(-200-size.x,-200-size.y);
}this.right=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRightMinimumSize",
function(size){
this.rightMinWidth=size.x;
this.rightMinHeight=size.y;
},"$wt.graphics.Point");
$_M(c$,"setRightWidth",
function(width){
this.rightWidth=width;
this.layout(false);
},"~N");
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
if(simple){
this.curve_width=5;
this.curve_indent=-2;
}else{
this.curve_width=50;
this.curve_indent=5;
}this.updateCurve(this.getSize().y);
this.layout(false);
this.redraw();
}},"~B");
$_M(c$,"updateCurve",
function(height){
var h=height-1;
if(this.simple){
this.curve=[0,h,1,h,2,h-1,3,h-2,3,2,4,1,5,0];
}else{
this.curve=$wt.custom.CBanner.bezier(0,h+1,30,h+1,this.curve_width-30,0,this.curve_width,0,this.curve_width);
}},"~N");
$_S(c$,
"OFFSCREEN",-200,
"BORDER_BOTTOM",2,
"BORDER_TOP",3,
"BORDER_STRIPE",1,
"CURVE_TAIL",200,
"BEZIER_RIGHT",30,
"BEZIER_LEFT",30,
"MIN_LEFT",10,
"BORDER1",20);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CBannerLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var banner=composite;
var left=banner.$left;
var right=banner.right;
var bottom=banner.bottom;
var showCurve=left!=null&&right!=null;
var height=hHint;
var width=wHint;
var bottomSize=new $wt.graphics.Point(0,0);
if(bottom!=null){
var trim=this.computeTrim(bottom);
var w=wHint==-1?-1:width-trim;
bottomSize=this.computeChildSize(bottom,w,-1,flushCache);
if(hHint!=-1){
bottomSize.y=Math.min(bottomSize.y,height);
height-=bottomSize.y+3+1+2;
}}if(showCurve&&hHint!=-1){
height-=7;
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
var trim=this.computeTrim(right);
var w=banner.rightWidth==-1?-1:banner.rightWidth-trim;
var h=banner.rightWidth==-1?-1:height;
rightSize=this.computeChildSize(right,w,h,flushCache);
if(wHint!=-1){
rightSize.x=Math.min(rightSize.x,width);
width-=rightSize.x+banner.curve_width-2*banner.curve_indent;
width=Math.max(width,10);
}}var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
var trim=this.computeTrim(left);
var w=wHint==-1?-1:width-trim;
leftSize=this.computeChildSize(left,w,-1,flushCache);
}width=leftSize.x+rightSize.x;
height=bottomSize.y;
if(bottom!=null){
height+=3;
}if(left!=null){
height+=right==null?leftSize.y:Math.max(leftSize.y,banner.rightMinHeight);
}else{
height+=rightSize.y;
}if(showCurve){
width+=banner.curve_width-2*banner.curve_indent;
height+=7;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(control,wHint,hHint,flushCache){
var data=control.getLayoutData();
if(data==null||!($_O(data,$wt.custom.CLayoutData))){
data=new $wt.custom.CLayoutData();
control.setLayoutData(data);
}return(data).computeSize(control,wHint,hHint,flushCache);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(c){
if($_O(c,$wt.widgets.Scrollable)){
var rect=(c).computeTrim(0,0,0,0);
return rect.width;
}return c.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null&&$_O(data,$wt.custom.CLayoutData))(data).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var banner=composite;
var left=banner.$left;
var right=banner.right;
var bottom=banner.bottom;
var size=banner.getSize();
var showCurve=left!=null&&right!=null;
var width=size.x;
var height=size.y;
var bottomSize=new $wt.graphics.Point(0,0);
if(bottom!=null){
var trim=this.computeTrim(bottom);
var w=width-trim;
bottomSize=this.computeChildSize(bottom,w,-1,flushCache);
bottomSize.y=Math.min(bottomSize.y,height);
height-=bottomSize.y+3+2+1;
}if(showCurve)height-=7;
height=Math.max(0,height);
var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
var trimX=0;
var trimY=0;
if($_O(right,$wt.widgets.Scrollable)){
var rect=(right).computeTrim(0,0,0,0);
trimX=rect.width;
trimY=rect.height;
}else{
trimX=trimY=right.getBorderWidth()*2;
}var rightW=banner.rightWidth==-1?-1:banner.rightWidth-trimX;
var rightH=banner.rightWidth==-1?-1:height-trimY;
rightSize=this.computeChildSize(right,rightW,rightH,flushCache);
rightSize.x=Math.min(rightSize.x,width);
width-=rightSize.x+banner.curve_width-2*banner.curve_indent;
width=Math.max(width,10);
}var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
var trim=this.computeTrim(left);
leftSize=this.computeChildSize(left,width-trim,-1,flushCache);
}var x=0;
var y=0;
var oldStart=banner.curveStart;
var leftRect=null;
var rightRect=null;
var bottomRect=null;
if(bottom!=null){
bottomRect=new $wt.graphics.Rectangle(x,y+size.y-bottomSize.y,bottomSize.x,bottomSize.y);
}if(showCurve)y+=4;
if(left!=null){
leftRect=new $wt.graphics.Rectangle(x,y,leftSize.x,leftSize.y);
banner.curveStart=x+leftSize.x-banner.curve_indent;
x+=leftSize.x+banner.curve_width-2*banner.curve_indent;
}if(right!=null){
rightRect=new $wt.graphics.Rectangle(x,y,rightSize.x,rightSize.y);
}if(banner.curveStart<oldStart){
banner.redraw(banner.curveStart-200,0,oldStart+banner.curve_width-banner.curveStart+200+5,size.y,false);
}if(banner.curveStart>oldStart){
banner.redraw(oldStart-200,0,banner.curveStart+banner.curve_width-oldStart+200+5,size.y,false);
}banner.update();
banner.curveRect=new $wt.graphics.Rectangle(banner.curveStart,0,banner.curve_width,size.y);
if(bottomRect!=null)bottom.setBounds(bottomRect);
if(rightRect!=null)right.setBounds(rightRect);
if(leftRect!=null)left.setBounds(leftRect);
},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.item=null;
this.doit=false;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
$_Z(this,arguments);
},$wt.custom,"CTabFolderEvent",$wt.events.TypedEvent);
$_K(c$,
function(w){
$_R(this,$wt.custom.CTabFolderEvent,[w]);
},"$wt.widgets.Widget");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.custom.CTabFolderEvent,"toString",[]);
return string.substring(0,string.length-1)+" item="+this.item+" doit="+this.doit+" x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+"}";
});
$_S(c$,
"serialVersionUID",3760566386225066807);
$_I($wt.custom,"CTabFolderListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolderLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var folder=composite;
var items=folder.items;
var tabW=0;
var gc=new $wt.graphics.GC(folder);
for(var i=0;i<items.length;i++){
if(folder.single){
tabW=Math.max(tabW,items[i].preferredWidth(gc,true,false));
}else{
tabW+=items[i].preferredWidth(gc,i==folder.selectedIndex,false);
}}
gc.dispose();
tabW+=3;
if(folder.showMax)tabW+=18;
if(folder.showMin)tabW+=18;
if(folder.single)tabW+=27;
if(folder.topRight!=null){
var pt=folder.topRight.computeSize(-1,folder.tabHeight,flushCache);
tabW+=3+pt.x;
}if(!folder.single&&!folder.simple)tabW+=folder.curveWidth-2*folder.curveIndent;
var controlW=0;
var controlH=0;
for(var i=0;i<items.length;i++){
var control=items[i].getControl();
if(control!=null&&!control.isDisposed()){
var size=control.computeSize(wHint,hHint,flushCache);
controlW=Math.max(controlW,size.x);
controlH=Math.max(controlH,size.y);
}}
var minWidth=Math.max(tabW,controlW);
var minHeight=(folder.minimized)?0:controlH;
if(minWidth==0)minWidth=64;
if(minHeight==0)minHeight=64;
if(wHint!=-1)minWidth=wHint;
if(hHint!=-1)minHeight=hHint;
return new $wt.graphics.Point(minWidth,minHeight);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var folder=composite;
if(folder.selectedIndex!=-1){
var control=folder.items[folder.selectedIndex].getControl();
if(control!=null&&!control.isDisposed()){
control.setBounds(folder.getClientArea());
}}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolderAdapter",null,$wt.custom.CTabFolderListener);
$_V(c$,"itemClosed",
function(event){
},"$wt.custom.CTabFolderEvent");
$_I($wt.custom,"CTabFolder2Listener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolder2Adapter",null,$wt.custom.CTabFolder2Listener);
$_V(c$,"close",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"minimize",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"maximize",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"restore",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"showList",
function(event){
},"$wt.custom.CTabFolderEvent");
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
System.out.println("after sw"+this.showClose+" "+(style&64)+" "+style);
parent.createItem(this,index);
System.out.println("handle "+this.handle);
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
System.out.println("An item is selected "+this.b$["$wt.custom.CTabItem"]);
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
System.out.println("client area has trouble");
}else{
newControl.setBounds(clientArea);
newControl.setVisible(true);
System.out.println("bounds "+clientArea);
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
System.out.println("Show close : "+this.showClose);
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
for(var j=0;j<this.b$["$wt.custom.CTabItem"].parent.folderListeners.length;j++){
var listener=this.b$["$wt.custom.CTabItem"].parent.folderListeners[j];
listener.close(e);
}
for(var j=0;j<this.b$["$wt.custom.CTabItem"].parent.tabListeners.length;j++){
var listener=this.b$["$wt.custom.CTabItem"].parent.tabListeners[j];
listener.itemClosed(e);
}
if(e.doit){
this.b$["$wt.custom.CTabItem"].parent.destroyItem(this.b$["$wt.custom.CTabItem"]);
}System.out.println("An item is closed "+this.b$["$wt.custom.CTabItem"]);
});
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
c$=$_C(function(){
this.itemMore=null;
this.contentArea=null;
this.offset=0;
this.marginWidth=0;
this.marginHeight=0;
this.MIN_TAB_WIDTH=4;
this.xClient=0;
this.yClient=0;
this.onBottom=false;
this.single=false;
this.simple=true;
this.fixedTabHeight=-1;
this.tabHeight=0;
this.minChars=20;
this.imageList=null;
this.items=null;
this.firstIndex=-1;
this.selectedIndex=-1;
this.priority=null;
this.mru=false;
this.folderListeners=null;
this.tabListeners=null;
this.selectionBgImage=null;
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.selectionForeground=null;
this.selectionBackground=null;
this.bgImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.showUnselectedImage=true;
this.showClose=false;
this.showUnselectedClose=true;
this.chevronRect=null;
this.chevronImageState=1;
this.showChevron=false;
this.$showMenu=null;
this.showMin=false;
this.minRect=null;
this.minimized=false;
this.minImageState=1;
this.showMax=false;
this.maxRect=null;
this.maximized=false;
this.maxImageState=1;
this.topRight=null;
this.topRightRect=null;
this.topRightAlignment=131072;
this.borderLeft=0;
this.borderRight=0;
this.borderTop=0;
this.borderBottom=0;
this.highlight_margin=0;
this.highlight_header=0;
this.curve=null;
this.curveWidth=0;
this.curveIndent=0;
this.inDispose=false;
this.oldSize=null;
this.oldFont=null;
this.toolTipEvents=null;
this.toolTipListener=null;
this.toolTipShell=null;
this.toolTipLabel=null;
this.buttonArea=null;
this.nwCorner=null;
this.neCorner=null;
$_Z(this,arguments);
},$wt.custom,"CTabFolder",$wt.widgets.Composite);
$_Y(c$,function(){
this.priority=$_A(0,0);
this.folderListeners=new Array(0);
this.tabListeners=new Array(0);
this.chevronRect=new $wt.graphics.Rectangle(0,0,0,0);
this.minRect=new $wt.graphics.Rectangle(0,0,0,0);
this.maxRect=new $wt.graphics.Rectangle(0,0,0,0);
this.topRightRect=new $wt.graphics.Rectangle(0,0,0,0);
this.toolTipEvents=[7,32,5,3,29];
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CTabFolder,[parent,$wt.custom.CTabFolder.checkStyle(parent,style)]);
$_U(this,$wt.custom.CTabFolder,"setLayout",[new $wt.custom.CTabFolderLayout()]);
var style2=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
this.oldFont=this.getFont();
this.onBottom=(style2&1024)!=0;
this.showClose=(style2&64)!=0;
this.single=(style2&4)!=0;
this.borderLeft=this.borderRight=(style&2048)!=0?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
this.highlight_header=(style&8388608)!=0?1:3;
this.highlight_margin=(style&8388608)!=0?0:2;
var display=this.getDisplay();
this.selectionForeground=display.getSystemColor(24);
this.selectionBackground=display.getSystemColor(25);
($t$=$wt.custom.CTabFolder.borderColor=display.getSystemColor(18),$wt.custom.CTabFolder.prototype.borderColor=$wt.custom.CTabFolder.borderColor,$t$);
this.updateTabHeight(false);
this.initAccessible();
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(parent,style){
var mask=109053126;
style=style&mask;
if((style&128)!=0)style=style&-1025;
if((style&2)!=0)style=style&-5;
style|=1048576;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
if((style&67108864)!=0)return style;
if((parent.getStyle()&134217728)!=0&&(style&33554432)==0)return style;
return style|262144;
},"$wt.widgets.Composite,~N");
c$.fillRegion=$_M(c$,"fillRegion",
function(gc,region){
var clipping=new $wt.graphics.Region();
gc.getClipping(clipping);
region.intersect(clipping);
gc.setClipping(region);
gc.fillRectangle(region.getBounds());
gc.setClipping(clipping);
clipping.dispose();
},"$wt.graphics.GC,$wt.graphics.Region");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"addCTabFolder2Listener",
function(listener){
var newListeners=new Array(this.folderListeners.length+1);
System.arraycopy(this.folderListeners,0,newListeners,0,this.folderListeners.length);
this.folderListeners=newListeners;
this.folderListeners[this.folderListeners.length-1]=listener;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"addCTabFolderListener",
function(listener){
var newTabListeners=new Array(this.tabListeners.length+1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,this.tabListeners.length);
this.tabListeners=newTabListeners;
this.tabListeners[this.tabListeners.length-1]=listener;
if(!this.showClose){
this.showClose=true;
this.updateItems();
this.redraw();
}},"$wt.custom.CTabFolderListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.custom.CTabFolder,"computeSize",[wHint,hHint,changed]);
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<0){
width+=136;
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=O$.getContainerHeight(this.buttonArea);
if(O$.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}System.err.println("]"+lineHeight);
x-=4;
y-=4+lineHeight;
width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="ctab-item-default";
this.buttonArea.insertBefore(tab,this.itemMore);
item.textEl=d$.createElement("DIV");
item.textEl.className="ctab-item-main-default-left";
tab.appendChild(item.textEl);
item.rightEl=d$.createElement("DIV");
item.rightEl.className=item.cssClassForRight();
tab.appendChild(item.rightEl);
item.configureRightEl();
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
this.priority[index]=0;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
}},"$wt.custom.CTabItem,~N");
$_M(c$,"destroyItem",
function(item){
if(this.inDispose)return;
var index=this.indexOf(item);
if(index==-1)return;
if(this.items.length==1){
this.items=new Array(0);
this.priority=$_A(0,0);
this.firstIndex=-1;
this.selectedIndex=-1;
var control=item.getControl();
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}this.hideToolTip();
this.setButtonBounds();
item.dispose();
this.redraw();
return;
}var newItems=new Array(this.items.length-1);
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,this.items.length-index-1);
this.items=newItems;
var newPriority=$_A(this.priority.length-1,0);
var next=0;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index)continue;newPriority[next++]=this.priority[i]>index?this.priority[i]-1:this.priority[i];
}
this.priority=newPriority;
if(this.selectedIndex==index){
var control=item.getControl();
this.selectedIndex=-1;
var nextSelection=this.mru?this.priority[0]:Math.max(0,index-1);
this.setSelection(nextSelection,true);
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}else{
if(this.selectedIndex>index){
this.selectedIndex--;
}var left=-2;
var x=2;
for(var i=0;i<this.items.length;i++){
var w=O$.getContainerWidth(this.items[i].handle);
if(i<this.selectedIndex){
left+=w;
}var s=this.items[i].handle.style;
if(i==this.selectedIndex){
x-=2;
}if(i==this.selectedIndex+1&&!this.simple){
x+=15;
}s.left=x+"px";
x+=w;
}
}item.dispose();
this.updateItems();
},"$wt.custom.CTabItem");
$_M(c$,"getBorderVisible",
function(){
return this.borderLeft==1;
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var x=2;
var y=2;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=O$.getContainerHeight(this.items[0].handle);
if(O$.isIE)lineHeight++;
h-=lineHeight;
if(this.getSelectionIndex()==0){
h+=2;
}if((this.style&1024)==0){
y+=lineHeight;
}else{
if(O$.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border-O$.getContainerHeight(this.buttonArea);
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(pt){
if(this.items.length==0)return null;
var size=this.getSize();
if(size.x<=this.borderLeft+this.borderRight)return null;
if(this.showChevron&&this.chevronRect.contains(pt))return null;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
var rect=item.getBounds();
if(rect.contains(pt))return item;
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
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
$_M(c$,"getMinimized",
function(){
return this.minimized;
});
$_M(c$,"getMinimizeVisible",
function(){
return this.showMin;
});
$_M(c$,"getMinimumCharacters",
function(){
return this.minChars;
});
$_M(c$,"getMaximized",
function(){
return this.maximized;
});
$_M(c$,"getMaximizeVisible",
function(){
return this.showMax;
});
$_M(c$,"getMRUVisible",
function(){
return this.mru;
});
$_M(c$,"getRightItemEdge",
function(){
var x=this.getSize().x-this.borderRight-3;
if(this.showMin)x-=18;
if(this.showMax)x-=18;
if(this.showChevron)x-=27;
if(this.topRight!=null&&this.topRightAlignment!=4){
var rightSize=this.topRight.computeSize(-1,-1,true);
x-=rightSize.x+3;
}return Math.max(0,x);
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return null;
return this.items[index];
});
$_M(c$,"getSelectionBackground",
function(){
return this.selectionBackground;
});
$_M(c$,"getSelectionForeground",
function(){
return this.selectionForeground;
});
$_M(c$,"getSelectionIndex",
function(){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
return-1;
});
$_M(c$,"getSimple",
function(){
return this.simple;
});
$_M(c$,"getSingle",
function(){
return this.single;
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
style&=-1153;
style|=this.onBottom?1024:128;
style&=-7;
style|=this.single?4:2;
if(this.borderLeft!=0)style|=2048;
return style;
});
$_M(c$,"getTabHeight",
function(){
if(this.fixedTabHeight!=-1)return this.fixedTabHeight;
return this.tabHeight-1;
});
$_M(c$,"getTabPosition",
function(){
return this.onBottom?1024:128;
});
$_M(c$,"getTopRight",
function(){
return this.topRight;
});
$_M(c$,"getUnselectedCloseVisible",
function(){
return this.showUnselectedClose;
});
$_M(c$,"getUnselectedImageVisible",
function(){
return this.showUnselectedImage;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]==item)return i;
}
return-1;
},"$wt.custom.CTabItem");
$_M(c$,"initAccessible",
function(){
});
$_M(c$,"removeCTabFolder2Listener",
function(listener){
if(this.folderListeners.length==0)return;
var index=-1;
for(var i=0;i<this.folderListeners.length;i++){
if(listener==this.folderListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.folderListeners.length==1){
this.folderListeners=new Array(0);
return;
}var newTabListeners=new Array(this.folderListeners.length-1);
System.arraycopy(this.folderListeners,0,newTabListeners,0,index);
System.arraycopy(this.folderListeners,index+1,newTabListeners,index,this.folderListeners.length-index-1);
this.folderListeners=newTabListeners;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"removeCTabFolderListener",
function(listener){
if(this.tabListeners.length==0)return;
var index=-1;
for(var i=0;i<this.tabListeners.length;i++){
if(listener==this.tabListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.tabListeners.length==1){
this.tabListeners=new Array(0);
return;
}var newTabListeners=new Array(this.tabListeners.length-1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,index);
System.arraycopy(this.tabListeners,index+1,newTabListeners,index,this.tabListeners.length-index-1);
this.tabListeners=newTabListeners;
},"$wt.custom.CTabFolderListener");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CTabFolder,"setBackground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.bgImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
if(this.gradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.gradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.bgImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.setBackground(null);
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.gradientColors[i]=colors[i];
}
this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.gradientPercents[i]=percents[i];
}
this.gradientVertical=vertical;
this.setBackground(this.gradientColors[this.gradientColors.length-1]);
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image==this.bgImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.bgImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setBorderVisible",
function(show){
if((this.borderLeft==1)==show)return;
this.borderLeft=this.borderRight=show?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
},"~B");
$_M(c$,"setButtonBounds",
function(){
var size=this.getSize();
var oldX;
var oldY;
var oldWidth;
var oldHeight;
oldX=this.maxRect.x;
oldY=this.maxRect.y;
oldWidth=this.maxRect.width;
oldHeight=this.maxRect.height;
this.maxRect.x=this.maxRect.y=this.maxRect.width=this.maxRect.height=0;
if(this.showMax){
this.maxRect.x=size.x-this.borderRight-18-3;
if(this.borderRight>0)this.maxRect.x+=1;
this.maxRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.maxRect.width=18;
this.maxRect.height=18;
}if(oldX!=this.maxRect.x||oldWidth!=this.maxRect.width||oldY!=this.maxRect.y||oldHeight!=this.maxRect.height){
var left=Math.min(oldX,this.maxRect.x);
var right=Math.max(oldX+oldWidth,this.maxRect.x+this.maxRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.minRect.x;
oldY=this.minRect.y;
oldWidth=this.minRect.width;
oldHeight=this.minRect.height;
this.minRect.x=this.minRect.y=this.minRect.width=this.minRect.height=0;
if(this.showMin){
this.minRect.x=size.x-this.borderRight-this.maxRect.width-18-3;
if(this.borderRight>0)this.minRect.x+=1;
this.minRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.minRect.width=18;
this.minRect.height=18;
}if(oldX!=this.minRect.x||oldWidth!=this.minRect.width||oldY!=this.minRect.y||oldHeight!=this.minRect.height){
var left=Math.min(oldX,this.minRect.x);
var right=Math.max(oldX+oldWidth,this.minRect.x+this.minRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.topRightRect.x;
oldY=this.topRightRect.y;
oldWidth=this.topRightRect.width;
oldHeight=this.topRightRect.height;
this.topRightRect.x=this.topRightRect.y=this.topRightRect.width=this.topRightRect.height=0;
if(this.topRight!=null){
switch(this.topRightAlignment){
case 4:
{
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
if(this.single){
if(this.items.length==0||this.selectedIndex==-1){
this.topRightRect.x=this.borderLeft+3;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}else{
var item=this.items[this.selectedIndex];
if(item.x+item.width+7+27>=rightEdge)break;
this.topRightRect.x=item.x+item.width+7+27;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}}else{
if(this.showChevron)break;
if(this.items.length==0){
this.topRightRect.x=this.borderLeft+3;
}else{
var item=this.items[this.items.length-1];
this.topRightRect.x=item.x+item.width;
if(!this.simple&&this.items.length-1==this.selectedIndex)this.topRightRect.x+=this.curveWidth-this.curveIndent;
}this.topRightRect.width=Math.max(0,rightEdge-this.topRightRect.x);
}this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
break;
}case 131072:
{
var topRightSize=this.topRight.computeSize(-1,this.tabHeight,false);
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
this.topRightRect.x=rightEdge-topRightSize.x;
this.topRightRect.width=topRightSize.x;
this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
}}
this.topRight.setBounds(this.topRightRect);
}if(oldX!=this.topRightRect.x||oldWidth!=this.topRightRect.width||oldY!=this.topRightRect.y||oldHeight!=this.topRightRect.height){
var left=Math.min(oldX,this.topRightRect.x);
var right=Math.max(oldX+oldWidth,this.topRightRect.x+this.topRightRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.chevronRect.x;
oldY=this.chevronRect.y;
oldWidth=this.chevronRect.width;
oldHeight=this.chevronRect.height;
this.chevronRect.x=this.chevronRect.y=this.chevronRect.height=this.chevronRect.width=0;
if(this.single){
if(this.selectedIndex==-1||this.items.length>1){
this.chevronRect.width=27;
this.chevronRect.height=18;
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
if(this.selectedIndex==-1){
this.chevronRect.x=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.topRightRect.width-this.chevronRect.width;
}else{
var item=this.items[this.selectedIndex];
var w=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.chevronRect.width;
if(this.topRightRect.width>0)w-=this.topRightRect.width+3;
this.chevronRect.x=Math.min(item.x+item.width+3,w);
}if(this.borderRight>0)this.chevronRect.x+=1;
}}else{
if(this.showChevron){
this.chevronRect.width=27;
this.chevronRect.height=18;
var i=0;
var lastIndex=-1;
while(i<this.priority.length&&this.items[this.priority[i]].showing){
lastIndex=Math.max(lastIndex,this.priority[i++]);
}
if(lastIndex==-1)lastIndex=this.firstIndex;
var lastItem=this.items[lastIndex];
var w=lastItem.x+lastItem.width+3;
if(!this.simple&&lastIndex==this.selectedIndex)w+=this.curveWidth-2*this.curveIndent;
this.chevronRect.x=Math.min(w,this.getRightItemEdge());
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
}}if(oldX!=this.chevronRect.x||oldWidth!=this.chevronRect.width||oldY!=this.chevronRect.y||oldHeight!=this.chevronRect.height){
var left=Math.min(oldX,this.chevronRect.x);
var right=Math.max(oldX+oldWidth,this.chevronRect.x+this.chevronRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}});
$_M(c$,"setFont",
function(font){
if(font!=null&&font.equals(this.getFont()))return;
$_U(this,$wt.custom.CTabFolder,"setFont",[font]);
this.oldFont=this.getFont();
if(!this.updateTabHeight(false)){
this.updateItems();
this.redraw();
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.CTabFolder,"setForeground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setInsertMark",
function(item,after){
},"$wt.custom.CTabItem,~B");
$_M(c$,"setInsertMark",
function(index,after){
},"~N,~B");
$_M(c$,"setItemLocation",
function(){
var changed=false;
if(this.items.length==0)return false;
var size=this.getSize();
var y=this.onBottom?Math.max(this.borderBottom,size.y-this.borderBottom-this.tabHeight):this.borderTop;
if(this.single){
var defaultX=this.getDisplay().getBounds().width+10;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(i==this.selectedIndex){
this.firstIndex=this.selectedIndex;
var oldX=item.x;
var oldY=item.y;
item.x=this.borderLeft;
item.y=y;
item.showing=true;
if(this.showClose||item.showClose){
item.closeRect.x=this.borderLeft+4;
item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
}if(item.x!=oldX||item.y!=oldY)changed=true;
}else{
item.x=defaultX;
item.showing=false;
}}
}else{
var rightItemEdge=this.getRightItemEdge();
var maxWidth=rightItemEdge-this.borderLeft;
var width=0;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
width+=item.width;
item.showing=i==0?true:item.width>0&&width<=maxWidth;
if(!this.simple&&this.priority[i]==this.selectedIndex)width+=this.curveWidth-2*this.curveIndent;
}
var x=0;
var defaultX=this.getDisplay().getBounds().width+10;
this.firstIndex=this.items.length-1;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(!item.showing){
if(item.x!=defaultX)changed=true;
item.x=defaultX;
}else{
this.firstIndex=Math.min(this.firstIndex,i);
if(item.x!=x||item.y!=y)changed=true;
item.x=x;
item.y=y;
if(i==this.selectedIndex){
var edge=Math.min(item.x+item.width,rightItemEdge);
item.closeRect.x=edge-4-18;
}else{
item.closeRect.x=item.x+item.width-4-18;
}item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
x=x+item.width;
if(!this.simple&&i==this.selectedIndex)x+=this.curveWidth-2*this.curveIndent;
}}
}return changed;
});
$_M(c$,"setItemSize",
function(){
var changed=false;
if(this.isDisposed())return changed;
var size=this.getSize();
if(size.x<=0||size.y<=0)return changed;
this.xClient=this.borderLeft+this.marginWidth+this.highlight_margin;
if(this.onBottom){
this.yClient=this.borderTop+this.highlight_margin+this.marginHeight;
}else{
this.yClient=this.borderTop+this.tabHeight+this.highlight_header+this.marginHeight;
}this.showChevron=false;
if(this.single){
this.showChevron=true;
if(this.selectedIndex!=-1){
var tab=this.items[this.selectedIndex];
var gc=new $wt.graphics.GC(this);
var width=tab.preferredWidth(gc,true,false);
gc.dispose();
width=Math.min(width,this.getRightItemEdge()-this.borderLeft);
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}return changed;
}if(this.items.length==0)return changed;
var widths;
var gc=new $wt.graphics.GC(this);
var tabAreaWidth=size.x-this.borderLeft-this.borderRight-3;
if(this.showMin)tabAreaWidth-=18;
if(this.showMax)tabAreaWidth-=18;
if(this.topRightAlignment==131072&&this.topRight!=null){
var rightSize=this.topRight.computeSize(-1,-1,false);
tabAreaWidth-=rightSize.x+3;
}if(!this.simple)tabAreaWidth-=this.curveWidth-2*this.curveIndent;
tabAreaWidth=Math.max(0,tabAreaWidth);
var minWidth=0;
var minWidths=$_A(this.items.length,0);
for(var i=0;i<this.priority.length;i++){
var index=this.priority[i];
minWidths[index]=this.items[index].preferredWidth(gc,index==this.selectedIndex,true);
minWidth+=minWidths[index];
if(minWidth>tabAreaWidth)break;
}
if(minWidth>tabAreaWidth){
this.showChevron=this.items.length>1;
if(this.showChevron)tabAreaWidth-=27;
widths=minWidths;
var index=this.selectedIndex!=-1?this.selectedIndex:0;
if(tabAreaWidth<widths[index]){
widths[index]=Math.max(0,tabAreaWidth);
}}else{
var maxWidth=0;
var maxWidths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
maxWidths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,false);
maxWidth+=maxWidths[i];
}
if(maxWidth<=tabAreaWidth){
widths=maxWidths;
}else{
var extra=Math.floor((tabAreaWidth-minWidth)/this.items.length);
while(true){
var large=0;
var totalWidth=0;
for(var i=0;i<this.items.length;i++){
if(maxWidths[i]>minWidths[i]+extra){
totalWidth+=minWidths[i]+extra;
large++;
}else{
totalWidth+=maxWidths[i];
}}
if(totalWidth>=tabAreaWidth){
extra--;
break;
}if(large==0||tabAreaWidth-totalWidth<large)break;
extra++;
}
widths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
widths[i]=Math.min(maxWidths[i],minWidths[i]+extra);
}
}}gc.dispose();
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
var width=widths[i];
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
if(i==this.selectedIndex||this.showUnselectedClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}}
return changed;
});
$_M(c$,"setMaximizeVisible",
function(visible){
if(this.showMax==visible)return;
this.showMax=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximized",
function(maximize){
if(this.maximized==maximize)return;
if(maximize&&this.minimized)this.setMinimized(false);
this.maximized=maximize;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
},"~B");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
this.setSelection(this.getSelectionIndex(),false);
return $_U(this,$wt.custom.CTabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height){
this.contentArea.style.height=(height-O$.getContainerHeight(this.buttonArea)-6)+"px";
this.contentArea.style.width=(width-6)+"px";
this.buttonArea.style.width=(width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setBounds",[x,y,width,height]);
},"~N,~N,~N,~N");
$_M(c$,"setMinimizeVisible",
function(visible){
if(this.showMin==visible)return;
this.showMin=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setMinimized",
function(minimize){
if(this.minimized==minimize)return;
if(minimize&&this.maximized)this.setMaximized(false);
this.minimized=minimize;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
},"~B");
$_M(c$,"setMinimumCharacters",
function(count){
if(this.minChars==count)return;
this.minChars=count;
},"~N");
$_M(c$,"setMRUVisible",
function(show){
if(this.mru==show)return;
this.mru=show;
if(!this.mru){
var idx=this.firstIndex;
var next=0;
for(var i=this.firstIndex;i<this.items.length;i++){
this.priority[next++]=i;
}
for(var i=0;i<idx;i++){
this.priority[next++]=i;
}
}},"~B");
$_M(c$,"setSelection",
function(item){
var index=this.indexOf(item);
if(index!=-1)this.setSelection(index,false);
},"$wt.custom.CTabItem");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
var oldIndex=this.getSelectionIndex();
System.out.println("setselection called! at "+oldIndex+" at "+index);
if(oldIndex==index){
return;
}if(oldIndex!=-1){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
control.handle.style.display="none";
}}this.updateSelection(index);
var newIndex=index;
if(newIndex!=-1){
var item=this.items[newIndex];
this.selectedIndex=newIndex;
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
control.handle.style.display="block";
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}this.layout();
},"~N,~B");
$_M(c$,"updateSelection",
function(index){
var key=this.simple?"ctab-item-selected":"ctab-item-rounded-selected";
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
this.items[i].handle.style.display="block";
this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].rightEl.className=this.items[i].cssClassForRight();
var el=this.buttonArea;
this.items[i].handle.style.height=(O$.getContainerHeight(this.buttonArea)-3)+"px";
this.items[i].isSelected=false;
if(i>index){
}}var w=O$.getContainerWidth(this.items[i].rightEl)+O$.getContainerWidth(this.items[i].textEl);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}if(i==index+1&&!this.simple){
x+=24;
}s.left=x+"px";
s.width=w+"px";
x+=w+2;
}
var ww=Integer.parseInt(this.handle.style.width);
if(ww>0){
}var cssName=this.items[index].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.items[index].handle.className+=" "+key;
this.items[index].rightEl.className=this.items[index].cssClassForRight();
this.items[index].handle.style.height=(O$.getContainerHeight(this.buttonArea)+3)+"px";
this.items[index].rightEl.style.height=this.items[index].handle.style.height;
this.items[index].isSelected=true;
var w=O$.getContainerWidth(this.items[index].rightEl)+O$.getContainerWidth(this.items[index].textEl);
if(!this.simple){
}var s=this.items[index].handle.style;
s.width=w+"px";
}this.items[index].handle.style.zIndex=(this.items.length+1)+"";
if(this.width!=0){
var w=O$.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-4);
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}}}var after=false;
for(var i=0;i<this.offset;i++){
this.items[i].handle.style.display="none";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].handle.style.height=(O$.getContainerHeight(this.items[i].handle)-3)+"px";
}}
},"~N");
$_M(c$,"setSelectionBackground",
function(color){
if(this.selectionBackground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(25);
this.selectionBackground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelectionBackground",
function(colors,percents){
this.setSelectionBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setSelectionBackground",
function(colors,percents,vertical){
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.selectionBgImage==null){
if((this.selectionGradientColors!=null)&&(colors!=null)&&(this.selectionGradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.selectionGradientColors.length;i++){
if(this.selectionGradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.selectionGradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.selectionGradientPercents.length;i++){
same=this.selectionGradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.selectionGradientVertical==vertical)return;
}}else{
this.selectionBgImage=null;
}if(colors==null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.setSelectionBackground(null);
}else{
this.selectionGradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.selectionGradientColors[i]=colors[i];
}
this.selectionGradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.selectionGradientPercents[i]=percents[i];
}
this.selectionGradientVertical=vertical;
this.setSelectionBackground(this.selectionGradientColors[this.selectionGradientColors.length-1]);
}if(this.selectedIndex>-1)this.redraw();
},"~A,~A,~B");
$_M(c$,"setSelectionBackground",
function(image){
if(image==this.selectionBgImage)return;
if(image!=null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
}this.selectionBgImage=image;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setSelectionForeground",
function(color){
if(this.selectionForeground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(24);
this.selectionForeground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSize",
function(width,height){
this.contentArea.style.height=(height-O$.getContainerHeight(this.buttonArea)-6)+"px";
this.contentArea.style.width=(width-6)+"px";
this.buttonArea.style.width=(width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setSize",[width,height]);
},"~N,~N");
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
var key="ctab-folder-content-area-border-blue";
var cssName=this.contentArea.className;
var idx=cssName.indexOf(key);
if(simple&&idx!=-1){
this.contentArea.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!simple&&idx==-1){
this.contentArea.className=cssName+" "+key;
}var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setSingle",
function(single){
if(this.single!=single){
this.single=single;
if(!single){
for(var i=0;i<this.items.length;i++){
if(i!=this.selectedIndex&&this.items[i].closeImageState==1){
this.items[i].closeImageState=0;
}}
}var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setTabHeight",
function(height){
this.fixedTabHeight=height;
this.updateTabHeight(false);
},"~N");
$_M(c$,"setTabPosition",
function(position){
if(this.onBottom!=(position==1024)){
this.onBottom=position==1024;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderRight;
this.updateTabHeight(true);
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~N");
$_M(c$,"setTopRight",
function(control){
this.setTopRight(control,131072);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(control,alignment){
this.topRight=control;
this.topRightAlignment=alignment;
if(this.updateItems())this.redraw();
},"$wt.widgets.Control,~N");
$_M(c$,"setUnselectedCloseVisible",
function(visible){
if(this.showUnselectedClose==visible)return;
this.showUnselectedClose=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setUnselectedImageVisible",
function(visible){
if(this.showUnselectedImage==visible)return;
this.showUnselectedImage=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"showItem",
function(item){
var index=this.indexOf(item);
var idx=-1;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index){
idx=i;
break;
}}
if(this.mru){
var newPriority=$_A(this.priority.length,0);
System.arraycopy(this.priority,0,newPriority,1,idx);
System.arraycopy(this.priority,idx+1,newPriority,idx+1,this.priority.length-idx-1);
newPriority[0]=index;
this.priority=newPriority;
}if(item.isShowing())return;
this.updateItems(index);
},"$wt.custom.CTabItem");
$_M(c$,"showList",
function(rect){
if(this.items.length==0||!this.showChevron)return;
if(this.$showMenu==null||this.$showMenu.isDisposed()){
this.$showMenu=new $wt.widgets.Menu(this);
}else{
var items=this.$showMenu.getItems();
for(var i=0;i<items.length;i++){
items[i].dispose();
}
}var id="CTabFolder_showList_Index";
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
if(tab.showing)continue;var item=new $wt.widgets.MenuItem(this.$showMenu,0);
item.setText(tab.getText());
item.setImage(tab.getImage());
item.setData(id,tab);
item.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabFolder$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabFolder$1",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var menuItem=e.widget;
var index=this.b$["$wt.custom.CTabFolder"].indexOf(menuItem.getData(this.f$.id));
this.b$["$wt.custom.CTabFolder"].setSelection(index,true);
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.custom.CTabFolder$1,i$,v$);
})(this,$_F("id",id)));
}
var x=rect.x;
var y=rect.y+rect.height;
var location=this.getDisplay().map(this,null,x,y);
this.$showMenu.setLocation(location.x,location.y);
this.$showMenu.setVisible(true);
},"$wt.graphics.Rectangle");
$_M(c$,"showSelection",
function(){
if(this.selectedIndex!=-1){
this.showItem(this.getSelection());
}});
$_M(c$,"hideToolTip",
function(){
if(this.toolTipShell==null)return;
for(var i=0;i<this.toolTipEvents.length;i++){
this.removeListener(this.toolTipEvents[i],this.toolTipListener);
}
this.toolTipShell.dispose();
this.toolTipShell=null;
this.toolTipLabel=null;
});
$_M(c$,"showToolTip",
function(x,y){
if(this.toolTipShell==null){
this.toolTipShell=new $wt.widgets.Shell(this.getShell(),16388);
this.toolTipLabel=new $wt.widgets.Label(this.toolTipShell,16777216);
var display=this.toolTipShell.getDisplay();
this.toolTipLabel.setForeground(display.getSystemColor(28));
this.toolTipLabel.setBackground(display.getSystemColor(29));
for(var i=0;i<this.toolTipEvents.length;i++){
this.addListener(this.toolTipEvents[i],this.toolTipListener);
}
}if(this.updateToolTip(x,y)){
this.toolTipShell.setVisible(true);
}else{
this.hideToolTip();
}},"~N,~N");
$_M(c$,"updateItems",
function(){
return this.updateItems(this.selectedIndex);
});
$_M(c$,"updateItems",
function(showIndex){
return false;
},"~N");
$_M(c$,"updateTabHeight",
function(force){
var oldHeight=this.tabHeight;
if(this.fixedTabHeight!=-1){
this.tabHeight=this.fixedTabHeight==0?0:this.fixedTabHeight+1;
}else{
var tempHeight=0;
var gc=new $wt.graphics.GC(this);
if(this.items.length==0){
tempHeight=gc.textExtent("Default",9).y+2+2;
}else{
for(var i=0;i<this.items.length;i++){
tempHeight=Math.max(tempHeight,this.items[i].preferredHeight(gc));
}
}gc.dispose();
this.tabHeight=tempHeight;
}if(!force&&this.tabHeight==oldHeight)return false;
this.oldSize=null;
if(this.onBottom){
var d=this.tabHeight-12;
this.curve=[0,13+d,0,12+d,2,12+d,3,11+d,5,11+d,6,10+d,7,10+d,9,8+d,10,8+d,11,7+d,11+d,7,12+d,6,13+d,6,15+d,4,16+d,4,17+d,3,19+d,3,20+d,2,22+d,2,23+d,1];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
}else{
var d=this.tabHeight-12;
this.curve=[0,0,0,1,2,1,3,2,5,2,6,3,7,3,9,5,10,5,11,6,11+d,6+d,12+d,7+d,13+d,7+d,15+d,9+d,16+d,9+d,17+d,10+d,19+d,10+d,20+d,11+d,22+d,11+d,23+d,12+d];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
}this.notifyListeners(11,new $wt.widgets.Event());
return true;
},"~B");
$_M(c$,"_getToolTip",
function(x,y){
if(this.showMin&&this.minRect.contains(x,y))return this.minimized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Minimize");
if(this.showMax&&this.maxRect.contains(x,y))return this.maximized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Maximize");
if(this.showChevron&&this.chevronRect.contains(x,y))return $WT.getMessage("SWT_ShowList");
var item=this.getItem(new $wt.graphics.Point(x,y));
if(item==null)return null;
if(!item.showing)return null;
if((this.showClose||item.showClose)&&item.closeRect.contains(x,y)){
return $WT.getMessage("SWT_Close");
}return item.getToolTipText();
},"~N,~N");
$_M(c$,"updateToolTip",
function(x,y){
var tooltip=this._getToolTip(x,y);
if(tooltip==null)return false;
if(tooltip.equals(this.toolTipLabel.getText()))return true;
this.toolTipLabel.setText(tooltip);
var labelSize=this.toolTipLabel.computeSize(-1,-1,true);
labelSize.x+=2;
labelSize.y+=2;
this.toolTipLabel.setSize(labelSize);
this.toolTipShell.pack();
var area=this.toolTipShell.getClientArea();
this.toolTipLabel.setSize(area.width,area.height);
var cursorLocation=this.getDisplay().getCursorLocation();
var cursorHeight=21;
var size=this.toolTipShell.getSize();
var rect=this.getMonitor().getBounds();
var pt=new $wt.graphics.Point(cursorLocation.x,cursorLocation.y+cursorHeight+2);
pt.x=Math.max(pt.x,rect.x);
if(pt.x+size.x>rect.x+rect.width)pt.x=rect.x+rect.width-size.x;
if(pt.y+size.y>rect.y+rect.height){
pt.y=cursorLocation.y-2-size.y;
}this.toolTipShell.setLocation(pt);
return true;
},"~N,~N");
$_M(c$,"releaseHandle",
function(){
if(this.itemMore!=null){
O$.destroyHandle(this.itemMore);
this.itemMore=null;
}if(this.contentArea!=null){
O$.destroyHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.custom.CTabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.custom.CTabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.custom.CTabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control==control)item.setControl(null);
}
},"$wt.widgets.Control");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_V(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"~O,~S");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.custom.CTabFolder,"createHandle",[]);
this.state&=-3;
this.items=new Array(0);
var cssName="ctab-folder-default";
var roundTheCorners=false;
if((this.style&2048)!=0){
cssName+=" ctab-folder-border-default";
roundTheCorners=true;
}this.handle.className+=" "+cssName;
cssName="tab-folder-no-tab";
this.buttonArea=this.createCSSElement(this.handle,"ctab-folder-button-area");
this.contentArea=this.createCSSElement(this.handle,"ctab-folder-content-area");
this.itemMore=this.createCSSElement(this.buttonArea,"ctab-item-more");
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var clientArea=this.parent.getClientArea();
if(clientArea.height<=0||clientArea.width<=0){
System.out.println("client area has troubl xxxxxxxxxxxxx e");
}else{
}this.state&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.custom.CTabFolder,"createWidget",[]);
});
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control==child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"borderColor",null,
"$DEFAULT_WIDTH",64,
"$DEFAULT_HEIGHT",64,
"BUTTON_SIZE",18,
"TOP_LEFT_CORNER",[0,6,1,5,1,4,4,1,5,1,6,0],
"TOP_RIGHT_CORNER",[-6,0,-5,1,-4,1,-1,4,-1,5,0,6],
"BOTTOM_LEFT_CORNER",[0,-6,1,-5,1,-4,4,-1,5,-1,6,0],
"BOTTOM_RIGHT_CORNER",[-6,0,-5,-1,-4,-1,-1,-4,-1,-5,0,-6],
"SIMPLE_TOP_LEFT_CORNER",[0,2,1,1,2,0],
"SIMPLE_TOP_RIGHT_CORNER",[-2,0,-1,1,0,2],
"SIMPLE_BOTTOM_LEFT_CORNER",[0,-2,1,-1,2,0],
"SIMPLE_BOTTOM_RIGHT_CORNER",[-2,0,-1,-1,0,-2],
"SELECTION_FOREGROUND",24,
"SELECTION_BACKGROUND",25,
"BORDER1_COLOR",18,
"FOREGROUND",21,
"BACKGROUND",22,
"BUTTON_BORDER",17,
"BUTTON_FILL",25,
"NONE",0,
"NORMAL",1,
"HOT",2,
"SELECTED",3);
c$.CLOSE_FILL=c$.prototype.CLOSE_FILL=new $wt.graphics.RGB(252,160,160);
