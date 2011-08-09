$_L(null,"$wt.layout.FormData",["$wt.layout.FormAttachment"],function(){
c$=$_C(function(){
this.width=-1;
this.height=-1;
this.left=null;
this.right=null;
this.top=null;
this.bottom=null;
this.cacheWidth=-1;
this.cacheHeight=-1;
this.defaultWhint=0;
this.defaultHhint=0;
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
this.cacheLeft=null;
this.cacheRight=null;
this.cacheTop=null;
this.cacheBottom=null;
this.isVisited=false;
this.needed=false;
$_Z(this,arguments);
},$wt.layout,"FormData");
$_K(c$,
function(){
});
$_K(c$,
function(width,height){
this.width=width;
this.height=height;
},"~N,~N");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(this.cacheWidth!=-1&&this.cacheHeight!=-1)return;
if(wHint==this.width&&hHint==this.height){
if(this.defaultWidth==-1||this.defaultHeight==-1||wHint!=this.defaultWhint||hHint!=this.defaultHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.defaultWhint=wHint;
this.defaultHhint=hHint;
this.defaultWidth=size.x;
this.defaultHeight=size.y;
}this.cacheWidth=this.defaultWidth;
this.cacheHeight=this.defaultHeight;
return;
}if(this.currentWidth==-1||this.currentHeight==-1||wHint!=this.currentWhint||hHint!=this.currentHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.currentWhint=wHint;
this.currentHhint=hHint;
this.currentWidth=size.x;
this.currentHeight=size.y;
}this.cacheWidth=this.currentWidth;
this.cacheHeight=this.currentHeight;
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.cacheWidth=this.cacheHeight=-1;
this.defaultHeight=this.defaultWidth=-1;
this.currentHeight=this.currentWidth=-1;
});
$_M(c$,"getWidth",
function(control,flushCache){
this.needed=true;
this.computeSize(control,this.width,this.height,flushCache);
return this.cacheWidth;
},"$wt.widgets.Control,~B");
$_M(c$,"getHeight",
function(control,flushCache){
this.computeSize(control,this.width,this.height,flushCache);
return this.cacheHeight;
},"$wt.widgets.Control,~B");
$_M(c$,"getBottomAttachment",
function(control,spacing,flushCache){
if(this.cacheBottom!=null)return this.cacheBottom;
if(this.isVisited)return this.cacheBottom=new $wt.layout.FormAttachment(0,this.getHeight(control,flushCache));
if(this.bottom==null){
if(this.top==null)return this.cacheBottom=new $wt.layout.FormAttachment(0,this.getHeight(control,flushCache));
return this.cacheBottom=this.getTopAttachment(control,spacing,flushCache).plus(this.getHeight(control,flushCache));
}var bottomControl=this.bottom.control;
if(bottomControl!=null){
if(bottomControl.isDisposed()){
this.bottom.control=bottomControl=null;
}else{
if(bottomControl.getParent()!==control.getParent()){
bottomControl=null;
}}}if(bottomControl==null)return this.cacheBottom=this.bottom;
this.isVisited=true;
var bottomData=bottomControl.getLayoutData();
var bottomAttachment=bottomData.getBottomAttachment(bottomControl,spacing,flushCache);
switch(this.bottom.alignment){
case 1024:
this.cacheBottom=bottomAttachment.plus(this.bottom.offset);
break;
case 16777216:
{
var topAttachment=bottomData.getTopAttachment(bottomControl,spacing,flushCache);
var bottomHeight=bottomAttachment.minus(topAttachment);
this.cacheBottom=bottomAttachment.minus(bottomHeight.minus(this.getHeight(control,flushCache)).divide(2));
break;
}default:
{
var topAttachment=bottomData.getTopAttachment(bottomControl,spacing,flushCache);
this.cacheBottom=topAttachment.plus(this.bottom.offset-spacing);
break;
}}
this.isVisited=false;
return this.cacheBottom;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getLeftAttachment",
function(control,spacing,flushCache){
if(this.cacheLeft!=null)return this.cacheLeft;
if(this.isVisited)return this.cacheLeft=new $wt.layout.FormAttachment(0,0);
if(this.left==null){
if(this.right==null)return this.cacheLeft=new $wt.layout.FormAttachment(0,0);
return this.cacheLeft=this.getRightAttachment(control,spacing,flushCache).minus(this.getWidth(control,flushCache));
}var leftControl=this.left.control;
if(leftControl!=null){
if(leftControl.isDisposed()){
this.left.control=leftControl=null;
}else{
if(leftControl.getParent()!==control.getParent()){
leftControl=null;
}}}if(leftControl==null)return this.cacheLeft=this.left;
this.isVisited=true;
var leftData=leftControl.getLayoutData();
var leftAttachment=leftData.getLeftAttachment(leftControl,spacing,flushCache);
switch(this.left.alignment){
case 16384:
this.cacheLeft=leftAttachment.plus(this.left.offset);
break;
case 16777216:
{
var rightAttachment=leftData.getRightAttachment(leftControl,spacing,flushCache);
var leftWidth=rightAttachment.minus(leftAttachment);
this.cacheLeft=leftAttachment.plus(leftWidth.minus(this.getWidth(control,flushCache)).divide(2));
break;
}default:
{
var rightAttachment=leftData.getRightAttachment(leftControl,spacing,flushCache);
this.cacheLeft=rightAttachment.plus(this.left.offset+spacing);
}}
this.isVisited=false;
return this.cacheLeft;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_M(c$,"getRightAttachment",
function(control,spacing,flushCache){
if(this.cacheRight!=null)return this.cacheRight;
if(this.isVisited)return this.cacheRight=new $wt.layout.FormAttachment(0,this.getWidth(control,flushCache));
if(this.right==null){
if(this.left==null)return this.cacheRight=new $wt.layout.FormAttachment(0,this.getWidth(control,flushCache));
return this.cacheRight=this.getLeftAttachment(control,spacing,flushCache).plus(this.getWidth(control,flushCache));
}var rightControl=this.right.control;
if(rightControl!=null){
if(rightControl.isDisposed()){
this.right.control=rightControl=null;
}else{
if(rightControl.getParent()!==control.getParent()){
rightControl=null;
}}}if(rightControl==null)return this.cacheRight=this.right;
this.isVisited=true;
var rightData=rightControl.getLayoutData();
var rightAttachment=rightData.getRightAttachment(rightControl,spacing,flushCache);
switch(this.right.alignment){
case 131072:
this.cacheRight=rightAttachment.plus(this.right.offset);
break;
case 16777216:
{
var leftAttachment=rightData.getLeftAttachment(rightControl,spacing,flushCache);
var rightWidth=rightAttachment.minus(leftAttachment);
this.cacheRight=rightAttachment.minus(rightWidth.minus(this.getWidth(control,flushCache)).divide(2));
break;
}default:
{
var leftAttachment=rightData.getLeftAttachment(rightControl,spacing,flushCache);
this.cacheRight=leftAttachment.plus(this.right.offset-spacing);
break;
}}
this.isVisited=false;
return this.cacheRight;
},"$wt.widgets.Control,~N,~B");
$_M(c$,"getTopAttachment",
function(control,spacing,flushCache){
if(this.cacheTop!=null)return this.cacheTop;
if(this.isVisited)return this.cacheTop=new $wt.layout.FormAttachment(0,0);
if(this.top==null){
if(this.bottom==null)return this.cacheTop=new $wt.layout.FormAttachment(0,0);
return this.cacheTop=this.getBottomAttachment(control,spacing,flushCache).minus(this.getHeight(control,flushCache));
}var topControl=this.top.control;
if(topControl!=null){
if(topControl.isDisposed()){
this.top.control=topControl=null;
}else{
if(topControl.getParent()!==control.getParent()){
topControl=null;
}}}if(topControl==null)return this.cacheTop=this.top;
this.isVisited=true;
var topData=topControl.getLayoutData();
var topAttachment=topData.getTopAttachment(topControl,spacing,flushCache);
switch(this.top.alignment){
case 128:
this.cacheTop=topAttachment.plus(this.top.offset);
break;
case 16777216:
{
var bottomAttachment=topData.getBottomAttachment(topControl,spacing,flushCache);
var topHeight=bottomAttachment.minus(topAttachment);
this.cacheTop=topAttachment.plus(topHeight.minus(this.getHeight(control,flushCache)).divide(2));
break;
}default:
{
var bottomAttachment=topData.getBottomAttachment(topControl,spacing,flushCache);
this.cacheTop=bottomAttachment.plus(this.top.offset+spacing);
break;
}}
this.isVisited=false;
return this.cacheTop;
},"$wt.widgets.Control,~N,~B");
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.width!=-1)string+="width="+this.width+" ";
if(this.height!=-1)string+="height="+this.height+" ";
if(this.left!=null)string+="left="+this.left+" ";
if(this.right!=null)string+="right="+this.right+" ";
if(this.top!=null)string+="top="+this.top+" ";
if(this.bottom!=null)string+="bottom="+this.bottom+" ";
string=string.trim();
string+="}";
return string;
});
});
