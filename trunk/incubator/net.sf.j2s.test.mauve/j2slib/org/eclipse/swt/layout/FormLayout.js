$_L(["$wt.widgets.Layout"],"$wt.layout.FormLayout",["$wt.graphics.Point","$.Rectangle","$wt.layout.FormData"],function(){
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.marginLeft=0;
this.marginTop=0;
this.marginRight=0;
this.marginBottom=0;
this.spacing=0;
$_Z(this,arguments);
},$wt.layout,"FormLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.FormLayout,[]);
});
$_M(c$,"computeHeight",
function(control,data,flushCache){
var top=data.getTopAttachment(control,this.spacing,flushCache);
var bottom=data.getBottomAttachment(control,this.spacing,flushCache);
var height=bottom.minus(top);
if(height.numerator==0){
if(bottom.numerator==0)return bottom.offset;
if(bottom.numerator==bottom.denominator)return-top.offset;
if(bottom.offset<=0){
return Math.floor(-top.offset*top.denominator/bottom.numerator);
}var divider=bottom.denominator-bottom.numerator;
return Math.floor(bottom.denominator*bottom.offset/divider);
}return height.solveY(data.getHeight(control,flushCache));
},"$wt.widgets.Control,$wt.layout.FormData,~B");
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var size=this.layout(composite,false,0,0,wHint,hHint,flushCache);
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
return size;
},"$wt.widgets.Composite,~N,~N,~B");
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
$_M(c$,"computeWidth",
function(control,data,flushCache){
var left=data.getLeftAttachment(control,this.spacing,flushCache);
var right=data.getRightAttachment(control,this.spacing,flushCache);
var width=right.minus(left);
if(width.numerator==0){
if(right.numerator==0)return right.offset;
if(right.numerator==right.denominator)return-left.offset;
if(right.offset<=0){
return Math.floor(-left.offset*left.denominator/left.numerator);
}var divider=right.denominator-right.numerator;
return Math.floor(right.denominator*right.offset/divider);
}return width.solveY(data.getWidth(control,flushCache));
},"$wt.widgets.Control,$wt.layout.FormData,~B");
$_M(c$,"layout",
function(composite,flushCache){
var rect=composite.getClientArea();
var x=rect.x+this.marginLeft+this.marginWidth;
var y=rect.y+this.marginTop+this.marginHeight;
var width=Math.max(0,rect.width-this.marginLeft-2*this.marginWidth-this.marginRight);
var height=Math.max(0,rect.height-this.marginLeft-2*this.marginHeight-this.marginBottom);
this.layout(composite,true,x,y,width,height,flushCache);
},"$wt.widgets.Composite,~B");
$_M(c$,"layout",
function(composite,move,x,y,width,height,flushCache){
var children=composite.getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
var data=child.getLayoutData();
if(data==null)child.setLayoutData(data=new $wt.layout.FormData());
if(flushCache)data.flushCache();
data.cacheLeft=data.cacheRight=data.cacheTop=data.cacheBottom=null;
}
var flush=null;
var bounds=null;
var w=0;
var h=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var data=child.getLayoutData();
if(width!=-1){
data.needed=false;
var left=data.getLeftAttachment(child,this.spacing,flushCache);
var right=data.getRightAttachment(child,this.spacing,flushCache);
var x1=left.solveX(width);
var x2=right.solveX(width);
if(data.height==-1&&!data.needed){
var trim=0;
if($_O(child,$wt.widgets.Scrollable)){
var rect=(child).computeTrim(0,0,0,0);
trim=rect.width;
}else{
trim=child.getBorderWidth()*2;
}data.cacheWidth=data.cacheHeight=-1;
var currentWidth=Math.max(0,x2-x1-trim);
data.computeSize(child,currentWidth,data.height,flushCache);
if(flush==null)flush=$_A(children.length,false);
flush[i]=true;
}w=Math.max(x2,w);
if(move){
if(bounds==null)bounds=new Array(children.length);
bounds[i]=new $wt.graphics.Rectangle(0,0,0,0);
bounds[i].x=x+x1;
bounds[i].width=x2-x1;
}}else{
w=Math.max(this.computeWidth(child,data,flushCache),w);
}}
for(var i=0;i<children.length;i++){
var child=children[i];
var data=child.getLayoutData();
if(height!=-1){
var y1=data.getTopAttachment(child,this.spacing,flushCache).solveX(height);
var y2=data.getBottomAttachment(child,this.spacing,flushCache).solveX(height);
h=Math.max(y2,h);
if(move){
bounds[i].y=y+y1;
bounds[i].height=y2-y1;
}}else{
h=Math.max(this.computeHeight(child,data,flushCache),h);
}}
for(var i=0;i<children.length;i++){
var child=children[i];
var data=child.getLayoutData();
if(flush!=null&&flush[i])data.cacheWidth=data.cacheHeight=-1;
data.cacheLeft=data.cacheRight=data.cacheTop=data.cacheBottom=null;
}
if(move){
for(var i=0;i<children.length;i++){
children[i].setBounds(bounds[i]);
}
}w+=this.marginLeft+this.marginWidth*2+this.marginRight;
h+=this.marginTop+this.marginHeight*2+this.marginBottom;
return new $wt.graphics.Point(w,h);
},"$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)string+="marginLeft="+this.marginLeft+" ";
if(this.marginRight!=0)string+="marginRight="+this.marginRight+" ";
if(this.marginTop!=0)string+="marginTop="+this.marginTop+" ";
if(this.marginBottom!=0)string+="marginBottom="+this.marginBottom+" ";
if(this.spacing!=0)string+="spacing="+this.spacing+" ";
string=string.trim();
string+="}";
return string;
});
});
