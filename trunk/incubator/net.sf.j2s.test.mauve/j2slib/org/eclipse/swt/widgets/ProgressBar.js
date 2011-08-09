$_L(["$wt.widgets.Control"],"$wt.widgets.ProgressBar",["$wt.graphics.Point","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.ProgressBar", ".progress-bar-default {\nposition:absolute;\nmargin:0;\npadding:0;\nborder:1px inset white;\noverflow:hidden;\n}\n.progress-bar-horizontal {\nbackground-color:highlight;\nwidth:0;\nfont-size:0;\nposition:absolute;\ntop:1px;\nleft:1px;\n}\n.progress-bar-vertical {\nbackground-color:highlight;\nheight:0;\nfont-size:0;\nposition:absolute;\nbottom:1px;\nleft:1px;\n}\n.swt-widgets-progressbar {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.minimum = 0;
this.maximum = 0;
this.selection = 0;
this.innerHandles = null;
this.timer = null;
$_Z (this, arguments);
}, $wt.widgets, "ProgressBar", $wt.widgets.Control);
c$.checkStyle = $_M (c$, "checkStyle", 
function (style) {
style |= 524288;
return $wt.widgets.Widget.checkBits (style, 256, 512, 0, 0, 0, 0);
}, "~N");
$_V(c$,"getBorderWidth",
function(){
return 1;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=160;
height+=16;
}else{
width+=16;
height+=160;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.minimum=0;
this.maximum=100;
this.handle=d$.createElement("DIV");
this.handle.className="progress-bar-default";
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.innerHandles=new Array(1);
this.innerHandles[0]=d$.createElement("DIV");
this.handle.appendChild(this.innerHandles[0]);
if((this.style&256)!=0){
this.innerHandles[0].className="progress-bar-horizontal";
}else{
this.innerHandles[0].className="progress-bar-vertical";
}this.startTimer();
});
$_M(c$,"releaseHandle",
function(){
if(this.innerHandles!=null){
for(var i=0;i<this.innerHandles.length;i++){
O$.destroyHandle(this.innerHandles[i]);
this.innerHandles[i]=null;
}
}$_U(this,$wt.widgets.ProgressBar,"releaseHandle",[]);
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getSelection",
function(){
return this.selection;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ProgressBar,"releaseWidget",[]);
this.stopTimer();
});
$_M(c$,"startTimer",
function(){
if((this.style&2)!=0){
this.timer=(($_D("$wt.widgets.ProgressBar$1")?0:org.eclipse.swt.widgets.ProgressBar.$ProgressBar$1$()),$_N($wt.widgets.ProgressBar$1,this,null));
this.display.timerExec(100,this.timer);
}});
$_M(c$,"stopTimer",
function(){
if((this.style&2)!=0){
if(this.timer!=null){
this.display.timerExec(-1,this.timer);
}}});
$_M(c$,"setMaximum",
function(value){
if(0<=this.minimum&&this.minimum<value&&this.maximum!=value){
this.maximum=value;
this.setSelection(this.selection);
}},"~N");
$_M(c$,"setMinimum",
function(value){
if(0<=value&&value<this.maximum&&this.minimum!=value){
this.minimum=value;
this.setSelection(this.selection);
}},"~N");
$_M(c$,"setSelection",
function(value){
if(value<this.minimum){
this.selection=this.minimum;
}else if(value>this.maximum){
this.selection=this.maximum;
}else{
this.selection=value;
}this.updateSelection(this.selection);
},"~N");
$_M(c$,"updateSelection",
function(selection){
var isHr=(this.style&256)!=0;
var w=isHr?this.width:this.height;
var blockSize=Math.round((isHr?this.height:this.width)*0.668)-2;
w=Math.round(Math.floor((w-2)*selection/this.maximum));
if(w<0){
w=0;
}if((this.style&65536)!=0){
if(isHr){
this.innerHandles[0].style.width=w+"px";
this.innerHandles[0].style.height=((this.height-2)<0?0:this.height-2)+"px";
}else{
this.innerHandles[0].style.width=((this.width-2)<0?0:(this.width-2))+"px";
this.innerHandles[0].style.height=w+"px";
}}else{
var blocks=Math.round(Math.floor(w/(blockSize+2))+0.5);
if(w==0){
blocks=0;
}for(var i=blocks;i<this.innerHandles.length;i++){
if(this.innerHandles[i]!=null){
this.innerHandles[i].style.display="none";
}}
for(var i=0;i<blocks;i++){
var el=this.innerHandles[i];
if(el==null){
el=d$.createElement("DIV");
this.handle.appendChild(el);
if(isHr){
el.className="progress-bar-horizontal";
el.style.left=(i*(blockSize+2)+1)+"px";
}else{
el.className="progress-bar-vertical";
el.style.bottom=(i*(blockSize+2)+1)+"px";
}this.innerHandles[i]=el;
}else{
el.style.display="block";
}if(isHr){
el.style.height=((this.height-2)<0?0:this.height-2)+"px";
if((i+1)*(blockSize+2)<=this.width-2){
el.style.width=blockSize+"px";
}else{
el.style.width=(w-i*(blockSize+2))+"px";
}}else{
el.style.width=((this.width-2)<0?0:(this.width-2))+"px";
if((i+1)*(blockSize+2)<=this.height-2){
el.style.height=blockSize+"px";
}else{
el.style.height=(w-i*(blockSize+2))+"px";
}}}
}},"~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
cx-=2;
cy-=2;
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
c$.$ProgressBar$1$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.timerSelection=-1;
this.lastSelection=0;
$_Z(this,arguments);
},$wt.widgets,"ProgressBar$1",null,Runnable);
$_Y(c$,function(){
this.lastSelection=this.b$["$wt.widgets.ProgressBar"].selection;
});
$_V(c$,"run",
function(){
var range=this.b$["$wt.widgets.ProgressBar"].maximum-this.b$["$wt.widgets.ProgressBar"].minimum;
if(this.timerSelection==-1||this.lastSelection!=this.b$["$wt.widgets.ProgressBar"].selection){
this.timerSelection=this.b$["$wt.widgets.ProgressBar"].selection;
this.lastSelection=this.b$["$wt.widgets.ProgressBar"].selection;
}this.timerSelection+=Math.round(Math.floor(range/10));
if(this.timerSelection>this.b$["$wt.widgets.ProgressBar"].maximum){
this.timerSelection=this.b$["$wt.widgets.ProgressBar"].minimum;
}this.b$["$wt.widgets.ProgressBar"].updateSelection(this.timerSelection);
this.b$["$wt.widgets.ProgressBar"].display.timerExec(100,this);
});
c$=$_P();
};
$_S(c$,
"DELAY",100,
"TIMER_ID",100,
"MINIMUM_WIDTH",100);
});
