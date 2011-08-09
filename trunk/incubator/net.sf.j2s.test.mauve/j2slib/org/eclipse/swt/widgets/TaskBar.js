$_L(["$wt.widgets.DesktopItem"],"$wt.widgets.TaskBar",["java.util.Date","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Decorations","$.Dialog","$.Display"],function(){
$WTC$$.registerCSS ("$wt.widgets.TaskBar", ".shell-manager-sidebar {\nposition:absolute;\ntop:0;\nleft:0;\n/*z-index:3690;*/\n}\n.shell-manager-bar {\nposition:absolute;\nleft:0;\nwidth:48px;\nbackground-color:rgb(57,61,254);\nborder-style:solid solid solid none;\nborder-width:1px;\nborder-color:buttonshadow;\nfont-size:0;\nmargin:0;\npadding:0;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.shell-manager-bar-minimized {\nposition:absolute;\nleft:0;\nwidth:8px;\nfont-size:0;\nmargin:0;\npadding:0;\nbackground-color:rgb(57,61,254);\nborder-style:solid solid solid none;\nborder-width:1px;\nborder-color:buttonshadow;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.shell-item, a.shell-item {\ndisplay:block;\ntext-decoration:none;\ncursor:default;\nposition:absolute;\nleft:16px;\nwidth:150px;\nheight:26px;\nfont-size:0;\nmargin:0;\npadding:0;\nbackground-color:buttonface;\nborder:1px solid navy;\nopacity:0.75;\nfilter:Alpha(Opacity=75);\n}\n.shell-item:hover, a.shell-item:hover {\nbackground-color:highlight;\ncolor:highlighttext;\nborder:1px solid navy;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.shell-top-item {\n/*border:1px solid darkred;*/\nopacity:1;\nfilter:Alpha(Opacity=100);\n}\n.shell-top-item:hover, a.shell-top-item:hover {\n/*border:1px solid navy;*/\nbackground-color:highlight;\ncolor:highlighttext;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n/*opacity:0.75;\nfilter:Alpha(Opacity=75);*/\n}\na.shell-item:focus {\nbackground-color:buttonhighlight;\n}\n.shell-item-icon {\nfloat:left;\n/*background-color:buttonface;*/\nbackground-repeat:no-repeat;\nbackground-position:-16px -17px;\nbackground-image:url(\'images/packed.gif\');\nwidth:16px;\nheight:16px;\nposition:relative;\nleft:8px;\ntop:50%;\nmargin-top:-7px;\n_margin-top:-8px;\n}\n.shell-item-icon-console {\nbackground-position:0px -32px !important;\n}\n*:first-child+html .shell-item-icon { /* IE7 */\nmargin-top:-8px;\n}\n.shell-item-text {\nposition:relative;\ntext-align:left;\nfont-family:Arial, sans-serif;\nfont-size:10pt;\ncolor:buttontext;\n/*width:108px;*/\noverflow:hidden;\nheight:1.5em;\nwhite-space:nowrap;\ntop:50%;\nleft:36px;\n_left:18px;\nmargin-top:-0.6em;\n}\n*:first-child+html .shell-item-text { /* IE7 */\nleft:18px;\n}\n.swt-widgets-taskbar {\nwidth:324px;\n}");
 c$ = $_C (function () {
this.barEl = null;
this.items = null;
this.hBarToggle = null;
this.hBarClick = null;
this.hBarMouesEnter = null;
$_Z (this, arguments);
}, $wt.widgets, "TaskBar", $wt.widgets.DesktopItem);
$_Y (c$, function () {
this.items =  new Array (0);
});
$_K (c$, 
function (display) {
$_R (this, $wt.widgets.TaskBar);
this.display = display;
}, "$wt.widgets.Display");
$_M(c$,"setTasksVisible",
function(visible){
if(this.items.length<=0){
return;
}for(var i=0;i<this.items.length;i++){
var itemDiv=this.items[i].itemHandle;
itemDiv.style.display=visible?"":"none";
}
},"~B");
$_V(c$,"bringToTop",
function(zIdx){
if(this.items.length<=0){
return;
}var zIndex=-1;
if(zIdx==-1){
w$.currentTopZIndex++;
zIndex=w$.currentTopZIndex;
if($wt.widgets.Display.getTopMaximizedShell()==null){
this.layerZIndex=zIndex;
}}else{
zIndex=zIdx;
}if(zIndex==-1&&!O$.isIE){
zIndex="";
}this.handle.style.zIndex=zIndex;
},"~N");
$_V(c$,"updateLayout",
function(){
this.updateItems();
});
$_M(c$,"createShellItem",
function(shell){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.shell===shell){
return;
}}
if($wt.widgets.Dialog.isDialog(shell)){
return;
}if(this.handle==null){
this.initialize();
}var text=null;
{
if(window["swt.task.bar"]==false){
return;
}
if(typeof shell=="string"){
text=shell;
shell=null;
}else{
text=shell.getText();
}
}if(text==null){
text="Java2Script";
}var tag="A";
if(!O$.isIENeedPNGFix){
tag="DIV";
}var si=d$.createElement(tag);
si.className="shell-item";
if(tag==="A"){
si.href="#";
}si.title=text;
if(this.barEl.style.display==="none"){
this.barEl.style.display="";
}if(this.barEl.className.indexOf("minimized")!=-1){
si.style.display="none";
}Clazz.addEvent(si,"mouseover",this.hBarMouesEnter);
this.handle.appendChild(si);
var icon=d$.createElement("DIV");
icon.className="shell-item-icon";
si.appendChild(icon);
var div=d$.createElement("DIV");
div.className="shell-item-text";
var hNoTextSelection=O$.setTextSelection(div,false);
si.appendChild(div);
div.appendChild(d$.createTextNode(text));
var w=O$.getStringStyledWidth(text,"shell-item-text","")+8;
if(w>120){
w=120;
}div.style.width=w+"px";
si.style.width=(w+48)+"px";
if(O$.isIE80){
div.style.top="1em";
div.style.left="20px";
}var hShellItemClick=null;
if(shell!=null){
hShellItemClick=$_Q((($_D("$wt.widgets.TaskBar$1")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$1$()),$_N($wt.widgets.TaskBar$1,this,$_F("shell",shell))));
Clazz.addEvent(si,"click",hShellItemClick);
}this.items[this.items.length]=new $wt.widgets.TaskBar.TaskItem(shell,text,si,div,icon,hShellItemClick,hNoTextSelection);
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.createNarrowShadowHandles(si);
}this.updateItems();
this.keepAutoHide();
},"$wt.widgets.Shell");
$_M(c$,"keepAutoHide",
function(){
var taskBar=this.display.taskBar;
if(taskBar!=null&&taskBar.isAutoHide){
var createdTime=new java.util.Date().getTime();
taskBar.lastUpdated=createdTime;
this.display.timerExec(2000,(($_D("$wt.widgets.TaskBar$2")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$2$()),$_N($wt.widgets.TaskBar$2,this,$_F("createdTime",createdTime))));
}});
$_M(c$,"removeShellItem",
function(shell){
if(this.items==null){
return;
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.shell===shell){
item.releaseFromBar(this);
this.items[i]=null;
break;
}}
if(shell.getMaximized()&&this.display.topBar!=null){
this.display.topBar.hide();
}{
if(window["swt.task.bar"]==false){return;}
}this.syncItems();
this.updateItems();
if(this.items.length==0){
this.handle.style.display="none";
this.barEl.style.display="none";
}this.keepAutoHide();
},"$wt.widgets.Shell");
$_M(c$,"syncItems",
function(){
if(this.barEl==null){
return;
}var delta=0;
for(var i=0;i<this.items.length-delta;i++){
while(this.items[i+delta]==null&&i+delta<this.items.length){
delta++;
}
this.items[i]=this.items[i+delta];
}
{
this.items.length-=delta;
}});
$_M(c$,"isAround",
function(x,y){
var barHeight=0;
this.syncItems();
var length=this.items.length;
if(length==0){
barHeight=36;
}else{
var si=this.items[0].itemHandle;
var hh=Math.max(Math.max(si.scrollHeight,si.offsetHeight),si.clientHeight)+12;
barHeight=(length*hh+36);
}var height=O$.getFixedBodyClientHeight();
var offset=O$.getFixedBodyOffsetTop()+Math.round(Math.floor((height-barHeight)/2));
var y1=offset-72;
var y2=offset+barHeight+72;
return(y>=y1&&y<=y2);
},"~N,~N");
$_M(c$,"updateItems",
function(){
if(this.barEl==null){
return;
}this.syncItems();
{
if(window["swt.task.bar"]==false){
return;
}
}var length=this.items.length;
if(length==0){
this.barEl.style.height="36px";
var offset=0;
var height=O$.getFixedBodyClientHeight();
offset=O$.getFixedBodyOffsetTop()+Math.round(Math.floor((height-36)/2));
this.barEl.style.top=offset+"px";
return;
}var si=this.items[0].itemHandle;
var alreadyHidden=false;
if(si.style.display==="none"){
si.style.display="";
alreadyHidden=true;
}var hh=Math.max(Math.max(si.scrollHeight,si.offsetHeight),si.clientHeight)+12;
if(alreadyHidden){
si.style.display="none";
}var height=O$.getFixedBodyClientHeight();
var offset=O$.getFixedBodyOffsetTop()+Math.round(Math.floor((height-(length*hh+36))/2));
var topShell=$wt.widgets.Display.getTopShell();
for(var i=0;i<length;i++){
var item=this.items[i];
item.itemHandle.style.top=offset+(i*hh+24)+"px";
if(item.shell!=null){
var text=item.shell.getText();
if(text!==item.text){
O$.clearChildren(item.textHandle);
item.textHandle.appendChild(d$.createTextNode(text));
item.itemHandle.title=text;
item.text=text;
}var image=item.shell.getImage();
var handleStyle=item.iconHandle.style;
if(image!=null){
if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="url(\"about:blank\")";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
if(image.packedURL!=null){
handleStyle.backgroundImage="url(\""+image.packedURL+"\")";
handleStyle.backgroundPosition="-"+image.packedOffsetX+"px -"+image.packedOffsetY+"px";
}else{
handleStyle.backgroundPosition="";
handleStyle.backgroundImage="url(\""+image.url+"\")";
}}}else{
var cssClazzName=null;
if(item.shell.shellIcon!=null){
cssClazzName=item.shell.shellIcon.className;
}if(cssClazzName!=null&&cssClazzName.indexOf("shell-title-icon-console")!=-1){
O$.addCSSClass(item.iconHandle,"shell-item-icon-console");
}handleStyle.backgroundImage="";
if(O$.isIENeedPNGFix&&handleStyle.filter!=null){
handleStyle.filter="";
}}item.itemHandle.style.borderColor=item.shell.getMinimized()?"buttonshadow":"";
var isTopShell=item.shell===topShell;
var sh=topShell;
while(!isTopShell&&sh!=null){
isTopShell=item.shell===sh;
sh=sh.parent;
}
if(isTopShell){
O$.addCSSClass(item.itemHandle,"shell-top-item");
}else{
O$.removeCSSClass(item.itemHandle,"shell-top-item");
}}}
this.barEl.style.height=(length*hh+36)+"px";
this.barEl.style.top=offset+"px";
offset=O$.getFixedBodyOffsetLeft();
this.handle.style.left=offset+"px";
});
$_V(c$,"initialize",
function(){
{
if(window["swt.task.bar"]==false){
return;
}
}if($wt.widgets.Display.bodyOverflow==null){
var body=d$.body;
($t$=$wt.widgets.Display.bodyOverflow=body.style.overflow,$wt.widgets.Display.prototype.bodyOverflow=$wt.widgets.Display.bodyOverflow,$t$);
($t$=$wt.widgets.Display.bodyHeight=body.style.height,$wt.widgets.Display.prototype.bodyHeight=$wt.widgets.Display.bodyHeight,$t$);
($t$=$wt.widgets.Display.htmlOverflow=body.parentNode.style.overflow,$wt.widgets.Display.prototype.htmlOverflow=$wt.widgets.Display.htmlOverflow,$t$);
($t$=$wt.widgets.Display.bodyScrollLeft=body.scrollLeft,$wt.widgets.Display.prototype.bodyScrollLeft=$wt.widgets.Display.bodyScrollLeft,$t$);
($t$=$wt.widgets.Display.bodyScrollTop=body.scrollTop,$wt.widgets.Display.prototype.bodyScrollTop=$wt.widgets.Display.bodyScrollTop,$t$);
($t$=$wt.widgets.Display.htmlScrollLeft=body.parentNode.scrollLeft,$wt.widgets.Display.prototype.htmlScrollLeft=$wt.widgets.Display.htmlScrollLeft,$t$);
($t$=$wt.widgets.Display.htmlScrollTop=body.parentNode.scrollTop,$wt.widgets.Display.prototype.htmlScrollTop=$wt.widgets.Display.htmlScrollTop,$t$);
body.parentNode.scrollLeft=0;
body.parentNode.scrollTop=0;
body.scrollLeft=0;
body.scrollTop=0;
if(body.style.overflow!=="hidden"){
body.style.overflow="hidden";
}if(body.style.height!=="100%"){
body.style.height="100%";
}if(body.parentNode.style.overflow!=="hidden"){
body.parentNode.style.overflow="hidden";
}}if(this.handle!=null)return;
var sb=d$.createElement("DIV");
sb.className="shell-manager-sidebar";
sb.style.lineHeight="16px";
sb.style.display="none";
d$.body.appendChild(sb);
this.handle=sb;
var bb=d$.createElement("DIV");
bb.className="shell-manager-bar";
sb.appendChild(bb);
this.barEl=bb;
this.hBarMouesEnter=$_Q((($_D("$wt.widgets.TaskBar$3")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$3$()),$_N($wt.widgets.TaskBar$3,this,null)));
Clazz.addEvent(this.barEl,"mouseover",this.hBarMouesEnter);
this.hBarClick=$_Q((($_D("$wt.widgets.TaskBar$4")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$4$()),$_N($wt.widgets.TaskBar$4,this,null)));
Clazz.addEvent(this.barEl,"click",this.hBarClick);
this.hBarToggle=$_Q((($_D("$wt.widgets.TaskBar$5")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$5$()),$_N($wt.widgets.TaskBar$5,this,null)));
Clazz.addEvent(this.barEl,"dblclick",this.hBarToggle);
this.barEl.title="Doubleclick to set taskbar auto-hide";
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.appendShadowHandles(this.barEl,true,true,true,false);
}});
$_M(c$,"setMinimized",
function(minimized){
var alreadyMinimized=this.barEl.className.indexOf("minimized")!=-1;
if(alreadyMinimized==minimized)return false;
this.barEl.className="shell-manager-bar"+(minimized?"-minimized":"");
this.setTasksVisible(!minimized);
return true;
},"~B");
$_M(c$,"handleApproaching",
function(){
if(this.barEl==null){
return;
}if(this.items.length!=0){
this.handle.style.display="block";
var zIndex=w$.currentTopZIndex+1;
if(this.handle.style.zIndex!=zIndex){
this.layerZIndex=this.handle.style.zIndex;
this.bringToTop(zIndex);
}this.updateItems();
}});
$_V(c$,"handleLeaving",
function(){
if(this.barEl==null){
return;
}if(this.items.length==0){
this.handle.style.display="none";
}if(this.layerZIndex!=-1){
this.bringToTop(this.layerZIndex);
this.layerZIndex=-1;
}if(this.isAutoHide){
this.setMinimized(true);
}});
$_M(c$,"isApproaching",
function(now,x,y,ctrlKey){
return!ctrlKey&&x<=8&&this.isAround(x,y);
},"~N,~N,~N,~B");
$_M(c$,"isLeaving",
function(now,x,y,ctrlKey){
return ctrlKey||x>200||!this.isAround(x,y);
},"~N,~N,~N,~B");
$_V(c$,"releaseWidget",
function(){
if(this.items!=null){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
item.releaseFromBar(this);
this.items[i]=null;
break;
}}
this.items=null;
}if(this.barEl!=null){
if(this.hBarClick!=null){
Clazz.removeEvent(this.barEl,"click",this.hBarClick);
this.hBarClick=null;
}if(this.hBarToggle!=null){
Clazz.removeEvent(this.barEl,"dblclick",this.hBarToggle);
this.hBarToggle=null;
}if(this.hBarMouesEnter!=null){
Clazz.removeEvent(this.barEl,"mouseover",this.hBarMouesEnter);
this.hBarMouesEnter=null;
}O$.destroyHandle(this.barEl);
this.barEl=null;
}if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}});
$_M(c$,"toggleAutoHide",
function(){
this.isAutoHide=!this.isAutoHide;
this.barEl.title=this.isAutoHide?"Doubleclick to set taskbar always-visible":"Doubleclick to set taskbar auto-hide";
this.setMinimized(this.isAutoHide);
if(this.isJustUpdated){
return;
}this.bringToTop(-1);
});
c$.$TaskBar$1$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.f$.shell.getMinimized()){
this.f$.shell.setMinimized(false);
this.f$.shell.bringToTop();
}else{
var lastShell=$wt.widgets.Display.getTopShell();
if(this.f$.shell===lastShell){
$wt.internal.ResizeSystem.unregister(this.f$.shell,128);
this.f$.shell.setMinimized(true);
if(this.b$["$wt.widgets.TaskBar"].display.topBar!=null){
this.b$["$wt.widgets.TaskBar"].display.topBar.returnTopMaximized(this.f$.shell);
}}else{
this.f$.shell.bringToTop();
}}this.b$["$wt.widgets.TaskBar"].updateItems();
this.toReturn(false);
});
c$=$_P();
};
c$.$TaskBar$2$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$2",null,Runnable);
$_V(c$,"run",
function(){
var taskBar=this.b$["$wt.widgets.TaskBar"].display.taskBar;
if(Math.abs(taskBar.lastUpdated-this.f$.createdTime)<250){
taskBar.setMinimized(taskBar.isAutoHide);
}});
c$=$_P();
};
c$.$TaskBar$3$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TaskBar"].isAutoHide){
this.b$["$wt.widgets.TaskBar"].setMinimized(false);
}var zIndex=w$.currentTopZIndex+1;
if(this.b$["$wt.widgets.TaskBar"].handle.style.zIndex!=zIndex){
this.b$["$wt.widgets.TaskBar"].layerZIndex=this.b$["$wt.widgets.TaskBar"].handle.style.zIndex;
this.b$["$wt.widgets.TaskBar"].bringToTop(zIndex);
}});
c$=$_P();
};
c$.$TaskBar$4$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TaskBar"].setMinimized(false)){
this.b$["$wt.widgets.TaskBar"].isJustUpdated=true;
w$.setTimeout($_Q((($_D("$wt.widgets.TaskBar$4$1")?0:org.eclipse.swt.widgets.TaskBar.$TaskBar$4$1$()),$_N($wt.widgets.TaskBar$4$1,this,null))),500);
}this.b$["$wt.widgets.TaskBar"].bringToTop(-1);
});
c$=$_P();
};
c$.$TaskBar$4$1$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$4$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TaskBar"].isJustUpdated=false;
});
c$=$_P();
};
c$.$TaskBar$5$=function(){
$_H();
c$=$_W($wt.widgets,"TaskBar$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TaskBar"].toggleAutoHide();
});
c$=$_P();
};
$_H();
c$=$_C(function(){
this.shell=null;
this.text=null;
this.itemHandle=null;
this.textHandle=null;
this.iconHandle=null;
this.hShellItemClick=null;
this.hTextSelection=null;
$_Z(this,arguments);
},$wt.widgets.TaskBar,"TaskItem");
$_K(c$,
function(a,b,c,d,e,f,g){
this.shell=a;
this.text=b;
this.itemHandle=c;
this.textHandle=d;
this.iconHandle=e;
this.hShellItemClick=f;
this.hTextSelection=g;
},"$wt.widgets.Shell,~S,Element,Element,Element,~O,~O");
$_M(c$,"releaseFromBar",
function(a){
this.shell=null;
if(this.hShellItemClick!=null){
Clazz.removeEvent(this.itemHandle,"click",this.hShellItemClick);
this.hShellItemClick=null;
}if(this.hTextSelection!=null){
Clazz.removeEvent(this.textHandle,"selectstart",this.hTextSelection);
this.hTextSelection=null;
}if(a.hBarMouesEnter!=null){
Clazz.removeEvent(this.itemHandle,"mouseover",a.hBarMouesEnter);
}if(this.textHandle!=null){
O$.destroyHandle(this.textHandle);
this.textHandle=null;
}if(this.iconHandle!=null){
O$.destroyHandle(this.iconHandle);
this.iconHandle=null;
}if(this.itemHandle!=null){
O$.destroyHandle(this.itemHandle);
this.itemHandle=null;
}},"$wt.widgets.TaskBar");
c$=$_P();
});
