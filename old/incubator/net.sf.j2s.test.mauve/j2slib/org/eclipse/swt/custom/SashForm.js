$_L(["$wt.widgets.Composite"],"$wt.custom.SashForm",["$wt.custom.SashFormData","$.SashFormLayout","$wt.widgets.Listener","$.Sash"],function(){
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
this.sashListener=(($_D("$wt.custom.SashForm$1")?0:org.eclipse.swt.custom.SashForm.$SashForm$1$()),$_N($wt.custom.SashForm$1,this,null));
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
ratios[i]=((data).weight*1000>>16);
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
if(this.sashes[i]===sash){
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
}(data1).weight=Math.floor(((b1.width<<16)+area.width-1)/area.width);
(data2).weight=Math.floor(((b2.width<<16)+area.width-1)/area.width);
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
}(data1).weight=Math.floor(((b1.height<<16)+area.height-1)/area.height);
(data2).weight=Math.floor(((b2.height<<16)+area.height-1)/area.height);
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
}(data).weight=Math.floor(((weights[i]<<16)+total-1)/total);
}
this.layout(false);
},"~A");
c$.$SashForm$1$=function(){
$_H();
c$=$_W($wt.custom,"SashForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
this.b$["$wt.custom.SashForm"].onDragSash(e);
},"$wt.widgets.Event");
c$=$_P();
};
$_S(c$,
"DRAG_MINIMUM",20);
});
