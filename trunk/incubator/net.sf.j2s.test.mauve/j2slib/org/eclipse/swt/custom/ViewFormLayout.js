$_L(["$wt.widgets.Layout"],"$wt.custom.ViewFormLayout",["$wt.custom.CLayoutData","$wt.graphics.Point","$.Rectangle"],function(){
c$=$_T($wt.custom,"ViewFormLayout",$wt.widgets.Layout);
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
});
