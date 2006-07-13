Clazz.load(["$wt.internal.dnd.DragAdapter"],"$wt.internal.dnd.ShellFrameDND",null,function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.sourceWidth=0;
this.sourceHeight=0;
this.resize=null;
this.frame=null;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"ShellFrameDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"isDraggable",
function(e){
var cssName=e.target.className;
if(cssName!=null){
if(cssName.indexOf("shell")==0&&(cssName.indexOf("top")!=-1||cssName.indexOf("middle")!=-1||cssName.indexOf("bottom")!=-1)){
this.resize=cssName.substring(6);
return true;
}else if(cssName.indexOf("shell-title-text")!=-1){
return true;
}}return false;
},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"dragBegan",
function(e){
var firstTime=false;
if(this.frame==null){
this.frame=d$.createElement("DIV");
this.frame.className="shell-handle";
this.frame.style.backgroundColor="transparent";
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.zIndex=""+(Integer.parseInt(w$.currentTopZIndex)+100);
d$.body.appendChild(this.frame);
var existedTitleBar=false;
var els=e.sourceElement.getElementsByTagName("DIV");
for(var i=0;i<els.length;i++){
if(els[i].className.indexOf("shell-title-bar")!=-1){
existedTitleBar=true;
break;
}}
if(existedTitleBar){
var titleBar=d$.createElement("DIV");
titleBar.className="shell-title-bar opacity";
titleBar.style.paddingTop="4px";
this.frame.appendChild(titleBar);
}firstTime=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
this.sourceWidth=Integer.parseInt(e.sourceElement.style.width);
this.sourceHeight=Integer.parseInt(e.sourceElement.style.height);
e.startX=e.currentX;
e.startY=e.currentY;
if(firstTime){
this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
}var frames=d$.getElementsByTagName("IFRAME");
if(frames.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.resize!=null){
var xx=this.sourceX;
var yy=this.sourceY;
var ww=this.sourceWidth;
var hh=this.sourceHeight;
if(this.resize=="left-top"){
xx+=e.deltaX();
yy+=e.deltaY();
ww-=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize=="center-top"){
yy+=e.deltaY();
hh-=e.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize=="right-top"){
yy+=e.deltaY();
ww+=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize=="left-middle"){
xx+=e.deltaX();
ww-=e.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize=="right-middle"){
ww+=e.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize=="left-bottom"){
xx+=e.deltaX();
ww-=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize=="center-bottom"){
hh+=e.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize=="right-bottom"){
ww+=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="se-resize";
}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
this.frame.style.width=((ww>16)?ww:16)+"px";
this.frame.style.height=((hh>16)?hh:16)+"px";
return true;
}var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=d$.body.clientHeight;
var gWidth=d$.body.clientWidth;
var dWidth=Integer.parseInt(e.sourceElement.style.width);
if(xx<-dWidth){
xx=-dWidth;
}else if(xx>gWidth-2){
xx=gWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight+18){
yy=gHeight+18;
}if(!(e.event.event).ctrlKey){
if(Math.abs(xx-gWidth+dWidth)<10){
xx=gWidth-dWidth;
}else if(Math.abs(xx)<10){
xx=0;
}var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(Math.abs(yy-gHeight+dHeight+2)<10){
yy=gHeight-dHeight-2;
}else if(Math.abs(yy-(-1))<10){
yy=-1;
}}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
if(d$.body.scrollLeft!=0){
d$.body.scrollLeft=0;
}if(d$.body.scrollTop!=0){
d$.body.scrollTop=0;
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
var x=Integer.parseInt(this.frame.style.left);
var y=Integer.parseInt(this.frame.style.top);
var width=Integer.parseInt(this.frame.style.width);
var height=Integer.parseInt(this.frame.style.height);
var shell=e.sourceElement;
shell.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
this.updateShellBounds(x,y,width,height);
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
($fz=function(){
this.frame.style.display="none";
d$.body.style.cursor="auto";
this.resize=null;
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"updateShellBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
c$.fixShellHeight=$_M(c$,"fixShellHeight",
function(shell){
var height=Integer.parseInt((shell).style.height);
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
if(div.className!=null){
if(div.className.indexOf("middle")!=-1){
if(height-40>=0){
div.style.height=(height-40)+"px";
}else{
div.style.height="0px";
}}else if(div.className.indexOf("shell-content")!=-1){
div.style.height=((height-30>=0)?height-30:0)+"px";
}}}
},"~O");
c$.fixShellWidth=$_M(c$,"fixShellWidth",
function(shell){
var needToFixedWidth=true;
var width=Integer.parseInt((shell).style.width)-6;
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
var cssName=div.className;
if(cssName!=null){
if(cssName.indexOf("shell-center-")!=-1){
if(needToFixedWidth){
div.style.width=(width-46)+"px";
}}else if(cssName.indexOf("shell-content")!=-1){
div.style.width=width+"px";
}else if(cssName.indexOf("shell-title-bar")!=-1){
div.style.width=width+"px";
}}}
},"~O");
});
