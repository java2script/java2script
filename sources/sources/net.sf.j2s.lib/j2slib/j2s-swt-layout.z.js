/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=j2s-swt-basic.z.js,j2s-swt-event.z.js,org/eclipse/swt/widgets/Layout.js,org/eclipse/swt/layout/FillData.js,org/eclipse/swt/layout/FormData.js,org/eclipse/swt/layout/GridData.js,org/eclipse/swt/layout/RowData.js,org/eclipse/swt/layout/FormAttachment.js,org/eclipse/swt/layout/FillLayout.js,org/eclipse/swt/layout/FormLayout.js,org/eclipse/swt/layout/GridLayout.js,org/eclipse/swt/layout/RowLayout.js
=*/
c$=$_C(function(){
$_Z(this,arguments);
},$wt.widgets,"Layout");
$_M(c$,"flushCache",
function(control){
return false;
},"$wt.widgets.Control");
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
if(bottomControl.getParent()!=control.getParent()){
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
if(leftControl.getParent()!=control.getParent()){
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
if(rightControl.getParent()!=control.getParent()){
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
if(topControl.getParent()!=control.getParent()){
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
c$=$_C(function(){
this.verticalAlignment=2;
this.horizontalAlignment=1;
this.widthHint=-1;
this.heightHint=-1;
this.horizontalIndent=0;
this.verticalIndent=0;
this.horizontalSpan=1;
this.verticalSpan=1;
this.grabExcessHorizontalSpace=false;
this.grabExcessVerticalSpace=false;
this.minimumWidth=0;
this.minimumHeight=0;
this.exclude=false;
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
$_Z(this,arguments);
},$wt.layout,"GridData");
$_K(c$,
function(){
});
$_K(c$,
function(style){
if((style&2)!=0)this.verticalAlignment=1;
if((style&4)!=0)this.verticalAlignment=2;
if((style&16)!=0)this.verticalAlignment=4;
if((style&8)!=0)this.verticalAlignment=3;
if((style&32)!=0)this.horizontalAlignment=1;
if((style&64)!=0)this.horizontalAlignment=2;
if((style&256)!=0)this.horizontalAlignment=4;
if((style&128)!=0)this.horizontalAlignment=3;
this.grabExcessHorizontalSpace=(style&512)!=0;
this.grabExcessVerticalSpace=(style&1024)!=0;
},"~N");
$_K(c$,
function(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace){
this.construct(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace,1,1);
},"~N,~N,~B,~B");
$_K(c$,
function(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace,horizontalSpan,verticalSpan){
this.horizontalAlignment=horizontalAlignment;
this.verticalAlignment=verticalAlignment;
this.grabExcessHorizontalSpace=grabExcessHorizontalSpace;
this.grabExcessVerticalSpace=grabExcessVerticalSpace;
this.horizontalSpan=horizontalSpan;
this.verticalSpan=verticalSpan;
},"~N,~N,~B,~B,~N,~N");
$_K(c$,
function(width,height){
this.widthHint=width;
this.heightHint=height;
},"~N,~N");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(this.cacheWidth!=-1&&this.cacheHeight!=-1)return;
if(wHint==this.widthHint&&hHint==this.heightHint){
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
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var hAlign="";
switch(this.horizontalAlignment){
case 4:
hAlign="SWT.FILL";
break;
case 1:
hAlign="SWT.BEGINNING";
break;
case 16384:
hAlign="SWT.LEFT";
break;
case 16777224:
hAlign="SWT.END";
break;
case 3:
hAlign="GridData.END";
break;
case 131072:
hAlign="SWT.RIGHT";
break;
case 16777216:
hAlign="SWT.CENTER";
break;
case 2:
hAlign="GridData.CENTER";
break;
default:
hAlign="Undefined "+this.horizontalAlignment;
break;
}
var vAlign="";
switch(this.verticalAlignment){
case 4:
vAlign="SWT.FILL";
break;
case 1:
vAlign="SWT.BEGINNING";
break;
case 128:
vAlign="SWT.TOP";
break;
case 16777224:
vAlign="SWT.END";
break;
case 3:
vAlign="GridData.END";
break;
case 1024:
vAlign="SWT.BOTTOM";
break;
case 16777216:
vAlign="SWT.CENTER";
break;
case 2:
vAlign="GridData.CENTER";
break;
default:
vAlign="Undefined "+this.verticalAlignment;
break;
}
var string=this.getName()+" {";
string+="horizontalAlignment="+hAlign+" ";
if(this.horizontalIndent!=0)string+="horizontalIndent="+this.horizontalIndent+" ";
if(this.horizontalSpan!=1)string+="horizontalSpan="+this.horizontalSpan+" ";
if(this.grabExcessHorizontalSpace)string+="grabExcessHorizontalSpace="+this.grabExcessHorizontalSpace+" ";
if(this.widthHint!=-1)string+="widthHint="+this.widthHint+" ";
if(this.minimumWidth!=0)string+="minimumWidth="+this.minimumWidth+" ";
string+="verticalAlignment="+vAlign+" ";
if(this.verticalIndent!=0)string+="verticalIndent="+this.verticalIndent+" ";
if(this.verticalSpan!=1)string+="verticalSpan="+this.verticalSpan+" ";
if(this.grabExcessVerticalSpace)string+="grabExcessVerticalSpace="+this.grabExcessVerticalSpace+" ";
if(this.heightHint!=-1)string+="heightHint="+this.heightHint+" ";
if(this.minimumHeight!=0)string+="minimumHeight="+this.minimumHeight+" ";
if(this.exclude)string+="exclude="+this.exclude+" ";
string=string.trim();
string+="}";
return string;
});
$_S(c$,
"BEGINNING",1,
"CENTER",2,
"END",3,
"FILL",4,
"VERTICAL_ALIGN_BEGINNING",2,
"VERTICAL_ALIGN_CENTER",4,
"VERTICAL_ALIGN_END",8,
"VERTICAL_ALIGN_FILL",16,
"HORIZONTAL_ALIGN_BEGINNING",32,
"HORIZONTAL_ALIGN_CENTER",64,
"HORIZONTAL_ALIGN_END",128,
"HORIZONTAL_ALIGN_FILL",256,
"GRAB_HORIZONTAL",512,
"GRAB_VERTICAL",1024,
"FILL_VERTICAL",1040,
"FILL_HORIZONTAL",768,
"FILL_BOTH",1808);
c$=$_C(function(){
this.width=-1;
this.height=-1;
this.exclude=false;
$_Z(this,arguments);
},$wt.layout,"RowData");
$_K(c$,
function(){
});
$_K(c$,
function(width,height){
this.width=width;
this.height=height;
},"~N,~N");
$_K(c$,
function(point){
this.construct(point.x,point.y);
},"$wt.graphics.Point");
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
if(this.width!=-1)string+="width="+this.width+" ";
if(this.height!=-1)string+="height="+this.height+" ";
if(this.exclude)string+="exclude="+this.exclude+" ";
string=string.trim();
string+="}";
return string;
});
c$=$_C(function(){
this.numerator=0;
this.denominator=100;
this.offset=0;
this.control=null;
this.alignment=0;
$_Z(this,arguments);
},$wt.layout,"FormAttachment");
$_K(c$,
function(){
});
$_K(c$,
function(numerator){
this.construct(numerator,100,0);
},"~N");
$_K(c$,
function(numerator,offset){
this.construct(numerator,100,offset);
},"~N,~N");
$_K(c$,
function(numerator,denominator,offset){
this.numerator=numerator;
this.denominator=denominator;
this.offset=offset;
},"~N,~N,~N");
$_K(c$,
function(control){
this.construct(control,0,-1);
},"$wt.widgets.Control");
$_K(c$,
function(control,offset){
this.construct(control,offset,-1);
},"$wt.widgets.Control,~N");
$_K(c$,
function(control,offset,alignment){
this.control=control;
this.offset=offset;
this.alignment=alignment;
},"$wt.widgets.Control,~N,~N");
$_M(c$,"divide",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator*value,Math.floor(this.offset/value));
},"~N");
$_M(c$,"gcd",
function(m,n){
var temp;
m=Math.abs(m);
n=Math.abs(n);
if(m<n){
temp=m;
m=n;
n=temp;
}while(n!=0){
temp=m;
m=n;
n=temp%n;
}
return m;
},"~N,~N");
$_M(c$,"minus",
function(attachment){
var solution=new $wt.layout.FormAttachment();
solution.numerator=this.numerator*attachment.denominator-this.denominator*attachment.numerator;
solution.denominator=this.denominator*attachment.denominator;
var gcd=this.gcd(solution.denominator,solution.numerator);
solution.numerator=Math.floor(solution.numerator/gcd);
solution.denominator=Math.floor(solution.denominator/gcd);
solution.offset=this.offset-attachment.offset;
return solution;
},"$wt.layout.FormAttachment");
$_M(c$,"minus",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset-value);
},"~N");
$_M(c$,"plus",
function(attachment){
var solution=new $wt.layout.FormAttachment();
solution.numerator=this.numerator*attachment.denominator+this.denominator*attachment.numerator;
solution.denominator=this.denominator*attachment.denominator;
var gcd=this.gcd(solution.denominator,solution.numerator);
solution.numerator=Math.floor(solution.numerator/gcd);
solution.denominator=Math.floor(solution.denominator/gcd);
solution.offset=this.offset+attachment.offset;
return solution;
},"$wt.layout.FormAttachment");
$_M(c$,"plus",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset+value);
},"~N");
$_M(c$,"solveX",
function(value){
return(Math.floor((this.numerator*value)/this.denominator))+this.offset;
},"~N");
$_M(c$,"solveY",
function(value){
return Math.floor((value-this.offset)*this.denominator/this.numerator);
},"~N");
$_V(c$,"toString",
function(){
var string=this.control!=null?this.control.toString():this.numerator+"/"+this.denominator;
return"{y = ("+string+(this.offset>=0?")x + "+this.offset:")x - "+(-this.offset))+"}";
});
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
c$=$_C(function(){
this.numColumns=1;
this.makeColumnsEqualWidth=false;
this.marginWidth=5;
this.marginHeight=5;
this.marginLeft=0;
this.marginTop=0;
this.marginRight=0;
this.marginBottom=0;
this.horizontalSpacing=5;
this.verticalSpacing=5;
$_Z(this,arguments);
},$wt.layout,"GridLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.GridLayout,[]);
});
$_K(c$,
function(numColumns,makeColumnsEqualWidth){
$_R(this,$wt.layout.GridLayout,[]);
this.numColumns=numColumns;
this.makeColumnsEqualWidth=makeColumnsEqualWidth;
},"~N,~B");
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
$_M(c$,"getData",
function(grid,row,column,rowCount,columnCount,first){
var control=grid[row][column];
if(control!=null){
var data=control.getLayoutData();
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
var i=first?row+vSpan-1:row-vSpan+1;
var j=first?column+hSpan-1:column-hSpan+1;
if(0<=i&&i<rowCount){
if(0<=j&&j<columnCount){
if(control==grid[i][j])return data;
}}}return null;
},"~A,~N,~N,~N,~N,~B");
$_M(c$,"layout",
function(composite,flushCache){
var rect=composite.getClientArea();
this.layout(composite,true,rect.x,rect.y,rect.width,rect.height,flushCache);
},"$wt.widgets.Composite,~B");
$_M(c$,"layout",
function(composite,move,x,y,width,height,flushCache){
if(this.numColumns<1){
return new $wt.graphics.Point(this.marginLeft+this.marginWidth*2+this.marginRight,this.marginTop+this.marginHeight*2+this.marginBottom);
}var count=0;
var children=composite.getChildren();
for(var i=0;i<children.length;i++){
var control=children[i];
var data=control.getLayoutData();
if(data==null||!data.exclude){
children[count++]=children[i];
}}
for(var i=0;i<count;i++){
var child=children[i];
var data=child.getLayoutData();
if(data==null)child.setLayoutData(data=new $wt.layout.GridData());
if(flushCache)data.flushCache();
data.computeSize(child,data.widthHint,data.heightHint,flushCache);
if(data.grabExcessHorizontalSpace&&data.minimumWidth>0){
if(data.cacheWidth<data.minimumWidth){
var trim=0;
if($_O(child,$wt.widgets.Scrollable)){
var rect=(child).computeTrim(0,0,0,0);
trim=rect.width;
}else{
trim=child.getBorderWidth()*2;
}data.cacheWidth=data.cacheHeight=-1;
data.computeSize(child,Math.max(0,data.minimumWidth-trim),data.heightHint,false);
}}if(data.grabExcessVerticalSpace&&data.minimumHeight>0){
data.cacheHeight=Math.max(data.cacheHeight,data.minimumHeight);
}}
var row=0;
var column=0;
var rowCount=0;
var columnCount=this.numColumns;
var grid=$_A(4,columnCount,null);
for(var i=0;i<count;i++){
var child=children[i];
var data=child.getLayoutData();
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
while(true){
var lastRow=row+vSpan;
if(lastRow>=grid.length){
var newGrid=$_A(lastRow+4,columnCount,null);
System.arraycopy(grid,0,newGrid,0,grid.length);
grid=newGrid;
}if(grid[row]==null){
grid[row]=new Array(columnCount);
}while(column<columnCount&&grid[row][column]!=null){
column++;
}
var endCount=column+hSpan;
if(endCount<=columnCount){
var index=column;
while(index<endCount&&grid[row][index]==null){
index++;
}
if(index==endCount)break;
column=index;
}if(column+hSpan>=columnCount){
column=0;
row++;
}}
for(var j=0;j<vSpan;j++){
if(grid[row+j]==null){
grid[row+j]=new Array(columnCount);
}for(var k=0;k<hSpan;k++){
grid[row+j][column+k]=child;
}
}
rowCount=Math.max(rowCount,row+vSpan);
column+=hSpan;
}
var availableWidth=width-this.horizontalSpacing*(columnCount-1)-(this.marginLeft+this.marginWidth*2+this.marginRight);
var expandCount=0;
var widths=$_A(columnCount,0);
var minWidths=$_A(columnCount,0);
var expandColumn=$_A(columnCount,false);
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan==1){
var w=data.cacheWidth+data.horizontalIndent;
widths[j]=Math.max(widths[j],w);
if(data.grabExcessHorizontalSpace){
if(!expandColumn[j])expandCount++;
expandColumn[j]=true;
}if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent;
minWidths[j]=Math.max(minWidths[j],w);
}}}}
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan>1){
var spanWidth=0;
var spanMinWidth=0;
var spanExpandCount=0;
for(var k=0;k<hSpan;k++){
spanWidth+=widths[j-k];
spanMinWidth+=minWidths[j-k];
if(expandColumn[j-k])spanExpandCount++;
}
if(data.grabExcessHorizontalSpace&&spanExpandCount==0){
expandCount++;
expandColumn[j]=true;
}var w=data.cacheWidth+data.horizontalIndent-spanWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
widths[j]+=w;
}else{
var delta=Math.floor(w/spanExpandCount);
var remainder=w%spanExpandCount;
var last=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
widths[last=j-k]+=delta;
}}
if(last>-1)widths[last]+=remainder;
}}if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent-spanMinWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
minWidths[j]+=w;
}else{
var delta=Math.floor(w/spanExpandCount);
var remainder=w%spanExpandCount;
var last=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
minWidths[last=j-k]+=delta;
}}
if(last>-1)minWidths[last]+=remainder;
}}}}}}
}
if(this.makeColumnsEqualWidth){
var minColumnWidth=0;
var columnWidth=0;
for(var i=0;i<columnCount;i++){
minColumnWidth=Math.max(minColumnWidth,minWidths[i]);
columnWidth=Math.max(columnWidth,widths[i]);
}
columnWidth=width==-1||expandCount==0?columnWidth:Math.max(minColumnWidth,Math.floor(availableWidth/columnCount));
for(var i=0;i<columnCount;i++){
expandColumn[i]=expandCount>0;
widths[i]=columnWidth;
}
}else{
if(width!=-1&&expandCount>0){
var totalWidth=0;
for(var i=0;i<columnCount;i++){
totalWidth+=widths[i];
}
var c=expandCount;
var delta=Math.floor((availableWidth-totalWidth)/c);
var remainder=(availableWidth-totalWidth)%c;
var last=-1;
while(totalWidth!=availableWidth){
for(var j=0;j<columnCount;j++){
if(expandColumn[j]){
if(widths[j]+delta>minWidths[j]){
widths[last=j]=widths[j]+delta;
}else{
widths[j]=minWidths[j];
expandColumn[j]=false;
c--;
}}}
if(last>-1)widths[last]+=remainder;
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan>1){
if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
var spanWidth=0;
var spanExpandCount=0;
for(var k=0;k<hSpan;k++){
spanWidth+=widths[j-k];
if(expandColumn[j-k])spanExpandCount++;
}
var w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent-spanWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
widths[j]+=w;
}else{
var delta2=Math.floor(w/spanExpandCount);
var remainder2=w%spanExpandCount;
var last2=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
widths[last2=j-k]+=delta2;
}}
if(last2>-1)widths[last2]+=remainder2;
}}}}}}
}
if(c==0)break;
totalWidth=0;
for(var i=0;i<columnCount;i++){
totalWidth+=widths[i];
}
delta=Math.floor((availableWidth-totalWidth)/c);
remainder=(availableWidth-totalWidth)%c;
last=-1;
}
}}var flush=null;
var flushLength=0;
if(width!=-1){
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
if(data.heightHint==-1){
var child=grid[i][j];
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var currentWidth=0;
for(var k=0;k<hSpan;k++){
currentWidth+=widths[j-k];
}
currentWidth+=(hSpan-1)*this.horizontalSpacing-data.horizontalIndent;
if((currentWidth!=data.cacheWidth&&data.horizontalAlignment==4)||(data.cacheWidth>currentWidth)){
var trim=0;
if($_O(child,$wt.widgets.Scrollable)){
var rect=(child).computeTrim(0,0,0,0);
trim=rect.width;
}else{
trim=child.getBorderWidth()*2;
}data.cacheWidth=data.cacheHeight=-1;
data.computeSize(child,Math.max(0,currentWidth-trim),data.heightHint,false);
if(data.grabExcessVerticalSpace&&data.minimumHeight>0){
data.cacheHeight=Math.max(data.cacheHeight,data.minimumHeight);
}if(flush==null)flush=new Array(count);
flush[flushLength++]=data;
}}}}
}
}var availableHeight=height-this.verticalSpacing*(rowCount-1)-(this.marginTop+this.marginHeight*2+this.marginBottom);
expandCount=0;
var heights=$_A(rowCount,0);
var minHeights=$_A(rowCount,0);
var expandRow=$_A(rowCount,false);
for(var i=0;i<rowCount;i++){
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan==1){
var h=data.cacheHeight+data.verticalIndent;
heights[i]=Math.max(heights[i],h);
if(data.grabExcessVerticalSpace){
if(!expandRow[i])expandCount++;
expandRow[i]=true;
}if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent;
minHeights[i]=Math.max(minHeights[i],h);
}}}}
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan>1){
var spanHeight=0;
var spanMinHeight=0;
var spanExpandCount=0;
for(var k=0;k<vSpan;k++){
spanHeight+=heights[i-k];
spanMinHeight+=minHeights[i-k];
if(expandRow[i-k])spanExpandCount++;
}
if(data.grabExcessVerticalSpace&&spanExpandCount==0){
expandCount++;
expandRow[i]=true;
}var h=data.cacheHeight+data.verticalIndent-spanHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
heights[i]+=h;
}else{
var delta=Math.floor(h/spanExpandCount);
var remainder=h%spanExpandCount;
var last=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
heights[last=i-k]+=delta;
}}
if(last>-1)heights[last]+=remainder;
}}if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent-spanMinHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
minHeights[i]+=h;
}else{
var delta=Math.floor(h/spanExpandCount);
var remainder=h%spanExpandCount;
var last=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
minHeights[last=i-k]+=delta;
}}
if(last>-1)minHeights[last]+=remainder;
}}}}}}
}
if(height!=-1&&expandCount>0){
var totalHeight=0;
for(var i=0;i<rowCount;i++){
totalHeight+=heights[i];
}
var c=expandCount;
var delta=Math.floor((availableHeight-totalHeight)/c);
var remainder=(availableHeight-totalHeight)%c;
var last=-1;
while(totalHeight!=availableHeight){
for(var i=0;i<rowCount;i++){
if(expandRow[i]){
if(heights[i]+delta>minHeights[i]){
heights[last=i]=heights[i]+delta;
}else{
heights[i]=minHeights[i];
expandRow[i]=false;
c--;
}}}
if(last>-1)heights[last]+=remainder;
for(var i=0;i<rowCount;i++){
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan>1){
if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
var spanHeight=0;
var spanExpandCount=0;
for(var k=0;k<vSpan;k++){
spanHeight+=heights[i-k];
if(expandRow[i-k])spanExpandCount++;
}
var h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent-spanHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
heights[i]+=h;
}else{
var delta2=Math.floor(h/spanExpandCount);
var remainder2=h%spanExpandCount;
var last2=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
heights[last2=i-k]+=delta2;
}}
if(last2>-1)heights[last2]+=remainder2;
}}}}}}
}
if(c==0)break;
totalHeight=0;
for(var i=0;i<rowCount;i++){
totalHeight+=heights[i];
}
delta=Math.floor((availableHeight-totalHeight)/c);
remainder=(availableHeight-totalHeight)%c;
last=-1;
}
}if(move){
var gridY=y+this.marginTop+this.marginHeight;
for(var i=0;i<rowCount;i++){
var gridX=x+this.marginLeft+this.marginWidth;
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
var cellWidth=0;
var cellHeight=0;
for(var k=0;k<hSpan;k++){
cellWidth+=widths[j+k];
}
for(var k=0;k<vSpan;k++){
cellHeight+=heights[i+k];
}
cellWidth+=this.horizontalSpacing*(hSpan-1);
var childX=gridX+data.horizontalIndent;
var childWidth=Math.min(data.cacheWidth,cellWidth);
switch(data.horizontalAlignment){
case 16777216:
case 2:
childX+=Math.max(0,Math.floor((cellWidth-data.horizontalIndent-childWidth)/2));
break;
case 131072:
case 16777224:
case 3:
childX+=Math.max(0,cellWidth-data.horizontalIndent-childWidth);
break;
case 4:
childWidth=cellWidth-data.horizontalIndent;
break;
}
cellHeight+=this.verticalSpacing*(vSpan-1);
var childY=gridY+data.verticalIndent;
var childHeight=Math.min(data.cacheHeight,cellHeight);
switch(data.verticalAlignment){
case 16777216:
case 2:
childY+=Math.max(0,Math.floor((cellHeight-data.verticalIndent-childHeight)/2));
break;
case 1024:
case 16777224:
case 3:
childY+=Math.max(0,cellHeight-data.verticalIndent-childHeight);
break;
case 4:
childHeight=cellHeight-data.verticalIndent;
break;
}
var child=grid[i][j];
if(child!=null){
child.setBounds(childX,childY,childWidth,childHeight);
}}gridX+=widths[j]+this.horizontalSpacing;
}
gridY+=heights[i]+this.verticalSpacing;
}
}for(var i=0;i<flushLength;i++){
flush[i].cacheWidth=flush[i].cacheHeight=-1;
}
var totalDefaultWidth=0;
var totalDefaultHeight=0;
for(var i=0;i<columnCount;i++){
totalDefaultWidth+=widths[i];
}
for(var i=0;i<rowCount;i++){
totalDefaultHeight+=heights[i];
}
totalDefaultWidth+=this.horizontalSpacing*(columnCount-1)+this.marginLeft+this.marginWidth*2+this.marginRight;
totalDefaultHeight+=this.verticalSpacing*(rowCount-1)+this.marginTop+this.marginHeight*2+this.marginBottom;
return new $wt.graphics.Point(totalDefaultWidth,totalDefaultHeight);
},"$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
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
if(this.numColumns!=1)string+="numColumns="+this.numColumns+" ";
if(this.makeColumnsEqualWidth)string+="makeColumnsEqualWidth="+this.makeColumnsEqualWidth+" ";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)string+="marginLeft="+this.marginLeft+" ";
if(this.marginRight!=0)string+="marginRight="+this.marginRight+" ";
if(this.marginTop!=0)string+="marginTop="+this.marginTop+" ";
if(this.marginBottom!=0)string+="marginBottom="+this.marginBottom+" ";
if(this.horizontalSpacing!=0)string+="horizontalSpacing="+this.horizontalSpacing+" ";
if(this.verticalSpacing!=0)string+="verticalSpacing="+this.verticalSpacing+" ";
string=string.trim();
string+="}";
return string;
});
c$=$_C(function(){
this.type=256;
this.marginWidth=0;
this.marginHeight=0;
this.spacing=3;
this.wrap=true;
this.pack=true;
this.fill=false;
this.justify=false;
this.marginLeft=3;
this.marginTop=3;
this.marginRight=3;
this.marginBottom=3;
$_Z(this,arguments);
},$wt.layout,"RowLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.RowLayout,[]);
});
$_K(c$,
function(type){
$_R(this,$wt.layout.RowLayout,[]);
this.type=type;
},"~N");
$_M(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var extent;
if(this.type==256){
extent=this.layoutHorizontal(composite,false,(wHint!=-1)&&this.wrap,wHint,flushCache);
}else{
extent=this.layoutVertical(composite,false,(hHint!=-1)&&this.wrap,hHint,flushCache);
}if(wHint!=-1)extent.x=wHint;
if(hHint!=-1)extent.y=hHint;
return extent;
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeSize",
function(control,flushCache){
var wHint=-1;
var hHint=-1;
var data=control.getLayoutData();
if(data!=null){
wHint=data.width;
hHint=data.height;
}return control.computeSize(wHint,hHint,flushCache);
},"$wt.widgets.Control,~B");
$_V(c$,"flushCache",
function(control){
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
var clientArea=composite.getClientArea();
if(this.type==256){
this.layoutHorizontal(composite,true,this.wrap,clientArea.width,flushCache);
}else{
this.layoutVertical(composite,true,this.wrap,clientArea.height,flushCache);
}},"$wt.widgets.Composite,~B");
$_M(c$,"layoutHorizontal",
function(composite,move,wrap,width,flushCache){
var count=0;
var children=composite.getChildren();
for(var i=0;i<children.length;i++){
var control=children[i];
var data=control.getLayoutData();
if(data==null||!data.exclude){
children[count++]=children[i];
}}
var childWidth=0;
var childHeight=0;
var maxHeight=0;
if(!this.pack){
for(var i=0;i<count;i++){
var child=children[i];
var size=this.computeSize(child,flushCache);
childWidth=Math.max(childWidth,size.x);
childHeight=Math.max(childHeight,size.y);
}
maxHeight=childHeight;
}var clientX=0;
var clientY=0;
if(move){
var rect=composite.getClientArea();
clientX=rect.x;
clientY=rect.y;
}var wraps=null;
var wrapped=false;
var bounds=null;
if(move&&(this.justify||this.fill)){
bounds=new Array(count);
wraps=$_A(count,0);
}var maxX=0;
var x=this.marginLeft+this.marginWidth;
var y=this.marginTop+this.marginHeight;
for(var i=0;i<count;i++){
var child=children[i];
if(this.pack){
var size=this.computeSize(child,flushCache);
childWidth=size.x;
childHeight=size.y;
}if(wrap&&(i!=0)&&(x+childWidth>width)){
wrapped=true;
if(move&&(this.justify||this.fill))wraps[i-1]=maxHeight;
x=this.marginLeft+this.marginWidth;
y+=this.spacing+maxHeight;
if(this.pack)maxHeight=0;
}if(this.pack||this.fill){
maxHeight=Math.max(maxHeight,childHeight);
}if(move){
var childX=x+clientX;
var childY=y+clientY;
if(this.justify||this.fill){
bounds[i]=new $wt.graphics.Rectangle(childX,childY,childWidth,childHeight);
}else{
child.setBounds(childX,childY,childWidth,childHeight);
}}x+=this.spacing+childWidth;
maxX=Math.max(maxX,x);
}
maxX=Math.max(clientX+this.marginLeft+this.marginWidth,maxX-this.spacing);
if(!wrapped)maxX+=this.marginRight+this.marginWidth;
if(move&&(this.justify||this.fill)){
var space=0;
var margin=0;
if(!wrapped){
space=Math.max(0,Math.floor((width-maxX)/(count+1)));
margin=Math.max(0,Math.floor(((width-maxX)%(count+1))/2));
}else{
if(this.fill||this.justify){
var last=0;
if(count>0)wraps[count-1]=maxHeight;
for(var i=0;i<count;i++){
if(wraps[i]!=0){
var wrapCount=i-last+1;
if(this.justify){
var wrapX=0;
for(var j=last;j<=i;j++){
wrapX+=bounds[j].width+this.spacing;
}
space=Math.max(0,Math.floor((width-wrapX)/(wrapCount+1)));
margin=Math.max(0,Math.floor(((width-wrapX)%(wrapCount+1))/2));
}for(var j=last;j<=i;j++){
if(this.justify)bounds[j].x+=(space*(j-last+1))+margin;
if(this.fill)bounds[j].height=wraps[i];
}
last=i+1;
}}
}}for(var i=0;i<count;i++){
if(!wrapped){
if(this.justify)bounds[i].x+=(space*(i+1))+margin;
if(this.fill)bounds[i].height=maxHeight;
}children[i].setBounds(bounds[i]);
}
}return new $wt.graphics.Point(maxX,y+maxHeight+this.marginBottom+this.marginHeight);
},"$wt.widgets.Composite,~B,~B,~N,~B");
$_M(c$,"layoutVertical",
function(composite,move,wrap,height,flushCache){
var count=0;
var children=composite.getChildren();
for(var i=0;i<children.length;i++){
var control=children[i];
var data=control.getLayoutData();
if(data==null||!data.exclude){
children[count++]=children[i];
}}
var childWidth=0;
var childHeight=0;
var maxWidth=0;
if(!this.pack){
for(var i=0;i<count;i++){
var child=children[i];
var size=this.computeSize(child,flushCache);
childWidth=Math.max(childWidth,size.x);
childHeight=Math.max(childHeight,size.y);
}
maxWidth=childWidth;
}var clientX=0;
var clientY=0;
if(move){
var rect=composite.getClientArea();
clientX=rect.x;
clientY=rect.y;
}var wraps=null;
var wrapped=false;
var bounds=null;
if(move&&(this.justify||this.fill)){
bounds=new Array(count);
wraps=$_A(count,0);
}var maxY=0;
var x=this.marginLeft+this.marginWidth;
var y=this.marginTop+this.marginHeight;
for(var i=0;i<count;i++){
var child=children[i];
if(this.pack){
var size=this.computeSize(child,flushCache);
childWidth=size.x;
childHeight=size.y;
}if(wrap&&(i!=0)&&(y+childHeight>height)){
wrapped=true;
if(move&&(this.justify||this.fill))wraps[i-1]=maxWidth;
x+=this.spacing+maxWidth;
y=this.marginTop+this.marginHeight;
if(this.pack)maxWidth=0;
}if(this.pack||this.fill){
maxWidth=Math.max(maxWidth,childWidth);
}if(move){
var childX=x+clientX;
var childY=y+clientY;
if(this.justify||this.fill){
bounds[i]=new $wt.graphics.Rectangle(childX,childY,childWidth,childHeight);
}else{
child.setBounds(childX,childY,childWidth,childHeight);
}}y+=this.spacing+childHeight;
maxY=Math.max(maxY,y);
}
maxY=Math.max(clientY+this.marginTop+this.marginHeight,maxY-this.spacing);
if(!wrapped)maxY+=this.marginBottom+this.marginHeight;
if(move&&(this.justify||this.fill)){
var space=0;
var margin=0;
if(!wrapped){
space=Math.max(0,Math.floor((height-maxY)/(count+1)));
margin=Math.max(0,Math.floor(((height-maxY)%(count+1))/2));
}else{
if(this.fill||this.justify){
var last=0;
if(count>0)wraps[count-1]=maxWidth;
for(var i=0;i<count;i++){
if(wraps[i]!=0){
var wrapCount=i-last+1;
if(this.justify){
var wrapY=0;
for(var j=last;j<=i;j++){
wrapY+=bounds[j].height+this.spacing;
}
space=Math.max(0,Math.floor((height-wrapY)/(wrapCount+1)));
margin=Math.max(0,Math.floor(((height-wrapY)%(wrapCount+1))/2));
}for(var j=last;j<=i;j++){
if(this.justify)bounds[j].y+=(space*(j-last+1))+margin;
if(this.fill)bounds[j].width=wraps[i];
}
last=i+1;
}}
}}for(var i=0;i<count;i++){
if(!wrapped){
if(this.justify)bounds[i].y+=(space*(i+1))+margin;
if(this.fill)bounds[i].width=maxWidth;
}children[i].setBounds(bounds[i]);
}
}return new $wt.graphics.Point(x+maxWidth+this.marginRight+this.marginWidth,maxY);
},"$wt.widgets.Composite,~B,~B,~N,~B");
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
string+="type="+((this.type!=256)?"SWT.VERTICAL":"SWT.HORIZONTAL")+" ";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)string+="marginLeft="+this.marginLeft+" ";
if(this.marginTop!=0)string+="marginTop="+this.marginTop+" ";
if(this.marginRight!=0)string+="marginRight="+this.marginRight+" ";
if(this.marginBottom!=0)string+="marginBottom="+this.marginBottom+" ";
if(this.spacing!=0)string+="spacing="+this.spacing+" ";
string+="wrap="+this.wrap+" ";
string+="pack="+this.pack+" ";
string+="fill="+this.fill+" ";
string+="justify="+this.justify+" ";
string=string.trim();
string+="}";
return string;
});
