/* http://j2s.sf.net/ */$_L(null,"$wt.layout.FillData",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.layout,"FillData");
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
});
$_L(["$wt.widgets.Layout"],"$wt.layout.FillLayout",["$wt.graphics.Point","$wt.layout.FillData"],function(){
c$=$_C(function(){
this.type=256;
this.marginWidth=0;
this.marginHeight=0;
this.spacing=0;
$_Z(this,arguments);
},$wt.layout,"FillLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.FillLayout,[]);
});
$_K(c$,
function(type){
$_R(this,$wt.layout.FillLayout,[]);
this.type=type;
},"~N");
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var children=composite.getChildren();
var count=children.length;
var maxWidth=0;
var maxHeight=0;
for(var i=0;i<count;i++){
var child=children[i];
var w=wHint;
var h=hHint;
if(count>0){
if(this.type==256&&wHint!=-1){
w=Math.max(0,Math.floor((wHint-(count-1)*this.spacing)/count));
}if(this.type==512&&hHint!=-1){
h=Math.max(0,Math.floor((hHint-(count-1)*this.spacing)/count));
}}var size=this.computeChildSize(child,w,h,flushCache);
maxWidth=Math.max(maxWidth,size.x);
maxHeight=Math.max(maxHeight,size.y);
}
var width=0;
var height=0;
if(this.type==256){
width=count*maxWidth;
if(count!=0)width+=(count-1)*this.spacing;
height=maxHeight;
}else{
width=maxWidth;
height=count*maxHeight;
if(count!=0)height+=(count-1)*this.spacing;
}width+=this.marginWidth*2;
height+=this.marginHeight*2;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(control,wHint,hHint,flushCache){
var data=control.getLayoutData();
if(data==null){
data=new $wt.layout.FillData();
control.setLayoutData(data);
}var size=null;
if(wHint==-1&&hHint==-1){
size=data.computeSize(control,wHint,hHint,flushCache);
}else{
var trimX;
var trimY;
if($_O(control,$wt.widgets.Scrollable)){
var rect=(control).computeTrim(0,0,0,0);
trimX=rect.width;
trimY=rect.height;
}else{
trimX=trimY=control.getBorderWidth()*2;
}var w=wHint==-1?wHint:Math.max(0,wHint-trimX);
var h=hHint==-1?hHint:Math.max(0,hHint-trimY);
size=data.computeSize(control,w,h,flushCache);
}return size;
},"$wt.widgets.Control,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null)(data).flushCache();
return true;
},"$wt.widgets.Control");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"layout",
function(composite,flushCache){
var rect=composite.getClientArea();
var children=composite.getChildren();
var count=children.length;
if(count==0)return;
var width=rect.width-this.marginWidth*2;
var height=rect.height-this.marginHeight*2;
if(this.type==256){
width-=(count-1)*this.spacing;
var x=rect.x+this.marginWidth;
var extra=width%count;
var y=rect.y+this.marginHeight;
var cellWidth=Math.floor(width/count);
for(var i=0;i<count;i++){
var child=children[i];
var childWidth=cellWidth;
if(i==0){
childWidth+=Math.floor(extra/2);
}else{
if(i==count-1)childWidth+=Math.floor((extra+1)/2);
}child.setBounds(x,y,childWidth,height);
x+=childWidth+this.spacing;
}
}else{
height-=(count-1)*this.spacing;
var x=rect.x+this.marginWidth;
var cellHeight=Math.floor(height/count);
var y=rect.y+this.marginHeight;
var extra=height%count;
for(var i=0;i<count;i++){
var child=children[i];
var childHeight=cellHeight;
if(i==0){
childHeight+=Math.floor(extra/2);
}else{
if(i==count-1)childHeight+=Math.floor((extra+1)/2);
}child.setBounds(x,y,width,childHeight);
y+=childHeight+this.spacing;
}
}},"$wt.widgets.Composite,~B");
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
string+="type="+((this.type==512)?"SWT.VERTICAL":"SWT.HORIZONTAL")+" ";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.spacing!=0)string+="spacing="+this.spacing+" ";
string=string.trim();
string+="}";
return string;
});
});
