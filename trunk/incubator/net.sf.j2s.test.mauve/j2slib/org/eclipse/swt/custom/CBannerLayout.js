$_L(["$wt.widgets.Layout"],"$wt.custom.CBannerLayout",["$wt.custom.CLayoutData","$wt.graphics.Point","$.Rectangle"],function(){
c$=$_T($wt.custom,"CBannerLayout",$wt.widgets.Layout);
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
});
