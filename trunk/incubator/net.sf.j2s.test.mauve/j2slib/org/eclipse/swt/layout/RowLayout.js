$_L(["$wt.widgets.Layout"],"$wt.layout.RowLayout",["$wt.graphics.Point","$.Rectangle"],function(){
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
});
