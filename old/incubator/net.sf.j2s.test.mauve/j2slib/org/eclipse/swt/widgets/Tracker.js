$_L(["$wt.widgets.Widget"],"$wt.widgets.Tracker",["$wt.graphics.Point","$.Rectangle","$wt.widgets.Display","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.tracking=false;
this.cancelled=false;
this.stippled=false;
this.rectangles=null;
this.proportions=null;
this.bounds=null;
this.resizeCursor=0;
this.clientCursor=0;
this.cursorOrientation=0;
this.inEvent=false;
this.oldProc=0;
this.oldX=0;
this.oldY=0;
$_Z(this,arguments);
},$wt.widgets,"Tracker",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Tracker,[parent,$wt.widgets.Tracker.checkStyle(style)]);
this.parent=parent;
},"$wt.widgets.Composite,~N");
$_K(c$,
function(display,style){
$_R(this,$wt.widgets.Tracker,[]);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.style=$wt.widgets.Tracker.checkStyle(style);
this.display=display;
},"$wt.widgets.Display,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addKeyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(2,typedListener);
this.addListener(1,typedListener);
},"$wt.events.KeyListener");
$_M(c$,"adjustMoveCursor",
function(){
var newX=this.bounds.x+Math.floor(this.bounds.width/2);
var newY=this.bounds.y;
return new $wt.graphics.Point(newX,newY);
});
$_M(c$,"adjustResizeCursor",
function(){
var newX;
var newY;
if((this.cursorOrientation&16384)!=0){
newX=this.bounds.x;
}else if((this.cursorOrientation&131072)!=0){
newX=this.bounds.x+this.bounds.width;
}else{
newX=this.bounds.x+Math.floor(this.bounds.width/2);
}if((this.cursorOrientation&128)!=0){
newY=this.bounds.y;
}else if((this.cursorOrientation&1024)!=0){
newY=this.bounds.y+this.bounds.height;
}else{
newY=this.bounds.y+Math.floor(this.bounds.height/2);
}return new $wt.graphics.Point(newX,newY);
});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&(148608))==0){
style|=148608;
}return style;
},"~N");
$_M(c$,"close",
function(){
this.tracking=false;
});
$_M(c$,"computeBounds",
function(){
var xMin=this.rectangles[0].x;
var yMin=this.rectangles[0].y;
var xMax=this.rectangles[0].x+this.rectangles[0].width;
var yMax=this.rectangles[0].y+this.rectangles[0].height;
for(var i=1;i<this.rectangles.length;i++){
if(this.rectangles[i].x<xMin)xMin=this.rectangles[i].x;
if(this.rectangles[i].y<yMin)yMin=this.rectangles[i].y;
var rectRight=this.rectangles[i].x+this.rectangles[i].width;
if(rectRight>xMax)xMax=rectRight;
var rectBottom=this.rectangles[i].y+this.rectangles[i].height;
if(rectBottom>yMax)yMax=rectBottom;
}
return new $wt.graphics.Rectangle(xMin,yMin,xMax-xMin,yMax-yMin);
});
$_M(c$,"computeProportions",
function(rects){
var result=new Array(rects.length);
this.bounds=this.computeBounds();
for(var i=0;i<rects.length;i++){
var x=0;
var y=0;
var width=0;
var height=0;
if(this.bounds.width!=0){
x=Math.floor((rects[i].x-this.bounds.x)*100/this.bounds.width);
width=Math.floor(rects[i].width*100/this.bounds.width);
}else{
width=100;
}if(this.bounds.height!=0){
y=Math.floor((rects[i].y-this.bounds.y)*100/this.bounds.height);
height=Math.floor(rects[i].height*100/this.bounds.height);
}else{
height=100;
}result[i]=new $wt.graphics.Rectangle(x,y,width,height);
}
return result;
},"~A");
$_M(c$,"drawRectangles",
function(rects,stippled){
},"~A,~B");
$_M(c$,"getRectangles",
function(){
var length=0;
if(this.rectangles!=null)length=this.rectangles.length;
var result=new Array(length);
for(var i=0;i<length;i++){
var current=this.rectangles[i];
result[i]=new $wt.graphics.Rectangle(current.x,current.y,current.width,current.height);
}
return result;
});
$_M(c$,"getStippled",
function(){
return this.stippled;
});
$_M(c$,"moveRectangles",
function(xChange,yChange){
if(xChange<0&&((this.style&16384)==0))xChange=0;
if(xChange>0&&((this.style&131072)==0))xChange=0;
if(yChange<0&&((this.style&128)==0))yChange=0;
if(yChange>0&&((this.style&1024)==0))yChange=0;
if(xChange==0&&yChange==0)return;
this.bounds.x+=xChange;
this.bounds.y+=yChange;
for(var i=0;i<this.rectangles.length;i++){
this.rectangles[i].x+=xChange;
this.rectangles[i].y+=yChange;
}
},"~N,~N");
$_M(c$,"open",
function(){
if(this.rectangles==null)return false;
this.cancelled=false;
this.tracking=true;
var vStyle=this.style&(1152);
if(vStyle==128||vStyle==1024){
this.cursorOrientation|=vStyle;
}var hStyle=this.style&(147456);
if(hStyle==16384||hStyle==131072){
this.cursorOrientation|=hStyle;
}this.tracking=false;
return!this.cancelled;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(11,listener);
this.eventTable.unhook(10,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeKeyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(2,listener);
this.eventTable.unhook(1,listener);
},"$wt.events.KeyListener");
$_M(c$,"resizeRectangles",
function(xChange,yChange){
if(xChange<0&&((this.style&16384)!=0)&&((this.cursorOrientation&131072)==0)){
this.cursorOrientation|=16384;
}if(xChange>0&&((this.style&131072)!=0)&&((this.cursorOrientation&16384)==0)){
this.cursorOrientation|=131072;
}if(yChange<0&&((this.style&128)!=0)&&((this.cursorOrientation&1024)==0)){
this.cursorOrientation|=128;
}if(yChange>0&&((this.style&1024)!=0)&&((this.cursorOrientation&128)==0)){
this.cursorOrientation|=1024;
}if((this.cursorOrientation&16384)!=0){
if(xChange>this.bounds.width){
if((this.style&131072)==0)return;
this.cursorOrientation|=131072;
this.cursorOrientation&=-16385;
this.bounds.x+=this.bounds.width;
xChange-=this.bounds.width;
this.bounds.width=0;
if(this.proportions.length>1){
for(var i=0;i<this.proportions.length;i++){
var proportion=this.proportions[i];
proportion.x=100-proportion.x-proportion.width;
}
}}}else if((this.cursorOrientation&131072)!=0){
if(this.bounds.width<-xChange){
if((this.style&16384)==0)return;
this.cursorOrientation|=16384;
this.cursorOrientation&=-131073;
xChange+=this.bounds.width;
this.bounds.width=0;
if(this.proportions.length>1){
for(var i=0;i<this.proportions.length;i++){
var proportion=this.proportions[i];
proportion.x=100-proportion.x-proportion.width;
}
}}}if((this.cursorOrientation&128)!=0){
if(yChange>this.bounds.height){
if((this.style&1024)==0)return;
this.cursorOrientation|=1024;
this.cursorOrientation&=-129;
this.bounds.y+=this.bounds.height;
yChange-=this.bounds.height;
this.bounds.height=0;
if(this.proportions.length>1){
for(var i=0;i<this.proportions.length;i++){
var proportion=this.proportions[i];
proportion.y=100-proportion.y-proportion.height;
}
}}}else if((this.cursorOrientation&1024)!=0){
if(this.bounds.height<-yChange){
if((this.style&128)==0)return;
this.cursorOrientation|=128;
this.cursorOrientation&=-1025;
yChange+=this.bounds.height;
this.bounds.height=0;
if(this.proportions.length>1){
for(var i=0;i<this.proportions.length;i++){
var proportion=this.proportions[i];
proportion.y=100-proportion.y-proportion.height;
}
}}}if((this.cursorOrientation&16384)!=0){
this.bounds.x+=xChange;
this.bounds.width-=xChange;
}else if((this.cursorOrientation&131072)!=0){
this.bounds.width+=xChange;
}if((this.cursorOrientation&128)!=0){
this.bounds.y+=yChange;
this.bounds.height-=yChange;
}else if((this.cursorOrientation&1024)!=0){
this.bounds.height+=yChange;
}var newRects=new Array(this.rectangles.length);
for(var i=0;i<this.rectangles.length;i++){
var proportion=this.proportions[i];
newRects[i]=new $wt.graphics.Rectangle(Math.floor(proportion.x*this.bounds.width/ 100) + this.bounds.x, Math.floor (proportion.y * this.bounds.height /100)+this.bounds.y,Math.floor(proportion.width*this.bounds.width/ 100), Math.floor (proportion.height * this.bounds.height /100));
}
this.rectangles=newRects;
},"~N,~N");
$_M(c$,"setCursor",
function(newCursor){
this.clientCursor=0;
if(newCursor!=null){
}},"$wt.graphics.Cursor");
$_M(c$,"setRectangles",
function(rectangles){
var length=rectangles.length;
this.rectangles=new Array(length);
for(var i=0;i<length;i++){
var current=rectangles[i];
this.rectangles[i]=new $wt.graphics.Rectangle(current.x,current.y,current.width,current.height);
}
this.proportions=this.computeProportions(rectangles);
},"~A");
$_M(c$,"setStippled",
function(stippled){
this.stippled=stippled;
},"~B");
$_M(c$,"update",
function(){
if(this.parent!=null){
if(this.parent.isDisposed())return;
var shell=this.parent.getShell();
shell.update(true);
}else{
this.display.update();
}});
$_S(c$,
"STEPSIZE_SMALL",1,
"STEPSIZE_LARGE",9);
});
