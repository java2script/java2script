$_L(["$wt.widgets.DesktopItem"],"$wt.widgets.QuickLaunch",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Decorations","$.Display"],function(){
$WTC$$.registerCSS ("$wt.widgets.QuickLaunch", ".shortcut-bar {\nposition:absolute;\nbottom:0;\nheight:32px;\nbackground-color:rgb(57,61,254);\nmargin:0;\npadding:0;\nfont-size:0;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.shortcut-item {\nposition:absolute;\nbottom:12px;\nheight:40px;\nwidth:40px;\nbackground-color:menu;\nbackground-repeat:no-repeat;\nbackground-position:-44px -44px;\nbackground-image: url(\'images/packed.gif\');\nborder:1px solid buttonshadow;\nmargin:0;\npadding:0;\nfont-size:0;\nopacity:0.6;\nfilter:Alpha(Opacity=60);\ntext-align:left;\n}\n.shortcut-bar-minimized {\nposition:absolute;\nbottom:0;\nheight:8px;\nbackground-color:rgb(57,61,254);\nmargin:0;\npadding:0;\nfont-size:0;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n* html .shortcut-bar {\nbottom:-1px;\n}\n* html .shortcut-bar-minimized {\nbottom:-1px;\n}\n.shortcut-item:hover, a.shortcut-item:hover .shortcut-item-highlight {\nborder:1px solid navy;\nbackground-color:highlight;\ncolor:highlighttext;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.shortcut-active-item {\n/*border:1px solid darkred;*/\nopacity:1;\nfilter:Alpha(Opacity=100);\n}\n.shortcut-active-item:hover, a.shortcut-active-item:hover {\n/*border:1px solid navy;*/\nbackground-color:highlight;\ncolor:highlighttext;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.swt-widgets-quicklaunch {\nwidth:324px;\n}");
 c$ = $_C (function () {
this.shortcutCount = 0;
this.shortcutItems = null;
this.alreadyInitialized = false;
this.hLaunchMouseEnter = null;
this.hLaunchClick = null;
this.hLaunchToggle = null;
$_Z (this, arguments);
}, $wt.widgets, "QuickLaunch", $wt.widgets.DesktopItem);
$_Y (c$, function () {
this.shortcutItems =  new Array (0);
});
$_K (c$, 
function (display) {
$_R (this, $wt.widgets.QuickLaunch);
this.display = display;
this.isAutoHide = false;
}, "$wt.widgets.Display");
$_V(c$,"initialize",
function(){
if(this.alreadyInitialized){
return;
}this.alreadyInitialized=true;
if($wt.widgets.Display.bodyOverflow==null){
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
}}this.handle=d$.createElement("DIV");
this.handle.className="shortcut-bar";
d$.body.appendChild(this.handle);
this.hLaunchMouseEnter=$_Q((($_D("$wt.widgets.QuickLaunch$1")?0:org.eclipse.swt.widgets.QuickLaunch.$QuickLaunch$1$()),$_N($wt.widgets.QuickLaunch$1,this,null)));
Clazz.addEvent(this.handle,"mouseover",this.hLaunchMouseEnter);
this.hLaunchClick=$_Q((($_D("$wt.widgets.QuickLaunch$2")?0:org.eclipse.swt.widgets.QuickLaunch.$QuickLaunch$2$()),$_N($wt.widgets.QuickLaunch$2,this,null)));
Clazz.addEvent(this.handle,"click",this.hLaunchClick);
this.handle.title="Doubleclick to hide shortcuts";
this.hLaunchToggle=$_Q((($_D("$wt.widgets.QuickLaunch$3")?0:org.eclipse.swt.widgets.QuickLaunch.$QuickLaunch$3$()),$_N($wt.widgets.QuickLaunch$3,this,null)));
Clazz.addEvent(this.handle,"dblclick",this.hLaunchToggle);
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.appendShadowHandles(this.handle,true,true,false,true);
}var childNodes=d$.body.childNodes;
var children=new Array(childNodes.length);
for(var i=0;i<childNodes.length;i++){
children[i]=childNodes[i];
}
var panel=d$.getElementById("swt-desktop-panel");
if(panel!=null){
var offset=children.length;
childNodes=panel.childNodes;
for(var i=0;i<childNodes.length;i++){
children[offset+i]=childNodes[i];
}
}var qlContainer=d$.getElementById("quick-launch");
if(qlContainer!=null){
childNodes=qlContainer.childNodes;
var length=children.length;
for(var i=0;i<childNodes.length;i++){
children[i+length]=childNodes[i];
}
}var existed=false;
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.nodeName==="A"&&child.className!=null&&child.className.indexOf("alaa")!=-1&&child.className.indexOf("ignored")==-1){
existed=true;
var icon=null;
for(var j=0;j<child.childNodes.length;j++){
var item=child.childNodes[j];
if(item!=null&&item.className!=null&&item.className.indexOf("alaa-icon")!=-1){
icon=item.style.backgroundImage;
if(icon!=null){
if(icon.indexOf("url(")==0){
icon=icon.substring(4,icon.length-1);
}var ch=icon.charAt(0);
if((ch).charCodeAt(0)==('\'').charCodeAt (0) || (ch).charCodeAt (0) == ('\"').charCodeAt(0)){
icon=icon.substring(1,icon.length-1);
}}break;
}}
var shortcut=this.addShortcut(child.text!=null?child.text:child.innerText,icon,child.href);
var id=child.id;
O$.destroyHandle(child);
if(id!=null&&id.length>0){
shortcut.id=id;
}}}
if(existed){
($t$=$wt.widgets.QuickLaunch.defaultQuickLaunch=this,$wt.widgets.QuickLaunch.prototype.defaultQuickLaunch=$wt.widgets.QuickLaunch.defaultQuickLaunch,$t$);
}else{
this.handle.style.display="none";
}});
$_M(c$,"setMinimized",
function(minimized){
var alreadyMinimized=this.handle.className.indexOf("minimized")!=-1;
if(alreadyMinimized==minimized)return false;
this.handle.className="shortcut-bar"+(minimized?"-minimized":"");
this.setShortcutsVisible(!minimized);
return true;
},"~B");
$_M(c$,"setShortcutsVisible",
function(visible){
if(this.shortcutCount<=0){
return;
}for(var i=0;i<this.shortcutCount;i++){
this.shortcutItems[i].style.display=visible?"":"none";
}
},"~B");
$_V(c$,"bringToTop",
function(zIdx){
if(this.shortcutCount<=0){
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
for(var i=0;i<this.shortcutCount;i++){
this.shortcutItems[i].style.zIndex=zIndex;
}
},"~N");
$_V(c$,"updateLayout",
function(){
if(this.shortcutCount<=0){
return;
}var barWidth=20+this.shortcutCount*60;
var barOffset=Math.floor((O$.getFixedBodyClientWidth()-barWidth)/2);
if(this.handle!=null){
this.handle.style.left=barOffset+10+"px";
this.handle.style.width=barWidth+"px";
}for(var i=0;i<this.shortcutCount;i++){
this.shortcutItems[i].style.left=(barOffset+20+10+i*60)+"px";
}
});
$_M(c$,"addShortcut",
function(name,icon,href){
{
if(window["swt.shortcut.bar"]==false){
return false;
}
}if(this.handle==null){
this.initialize();
}var tag="A";
var itemDiv=d$.createElement(tag);
itemDiv.className="shortcut-item";
if(O$.isIENeedPNGFix){
if(icon!=null&&icon.length!=0){
itemDiv.style.backgroundImage="url('"+icon+"')";
}itemDiv.href=href;
}else{
if(icon!=null&&icon.length!=0){
itemDiv.style.backgroundImage="url('"+icon+"')";
}itemDiv.href=href;
}itemDiv.title=name;
d$.body.appendChild(itemDiv);
Clazz.addEvent(itemDiv,"mouseover",this.hLaunchMouseEnter);
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.createNarrowShadowHandles(itemDiv);
}this.shortcutItems[this.shortcutCount]=itemDiv;
this.shortcutCount++;
this.bringToTop(-1);
this.updateLayout();
this.setMinimized(false);
this.updateLastModified();
return itemDiv;
},"~S,~S,~S");
$_M(c$,"markActiveItem",
function(item){
if(this.shortcutCount<=0||item==null){
return;
}for(var i=0;i<this.shortcutCount;i++){
var itemDiv=this.shortcutItems[i];
if(item===itemDiv){
O$.addCSSClass(itemDiv,"shortcut-active-item");
}else{
O$.removeCSSClass(itemDiv,"shortcut-active-item");
}}
},"Element");
$_M(c$,"isAround",
function(x,y){
var barWidth=20+this.shortcutCount*60;
var width=O$.getFixedBodyClientWidth();
var offset=Math.round(Math.floor((width-barWidth)/2));
var x1=offset-72;
var x2=offset+barWidth+72;
return(x>=x1&&x<=x2);
},"~N,~N");
$_M(c$,"isApproaching",
function(now,x,y,ctrlKey){
return(!ctrlKey&&y>=O$.getFixedBodyClientHeight()-8&&this.isAround(x,y));
},"~N,~N,~N,~B");
$_M(c$,"isLeaving",
function(now,x,y,ctrlKey){
return(y<=O$.getFixedBodyClientHeight()-70||!this.isAround(x,y));
},"~N,~N,~N,~B");
$_M(c$,"handleApproaching",
function(){
var zIndex=w$.currentTopZIndex+1;
if(this.handle.style.zIndex!=zIndex){
this.layerZIndex=this.handle.style.zIndex;
this.bringToTop(zIndex);
}});
$_V(c$,"handleLeaving",
function(){
if(this.layerZIndex!=-1){
this.bringToTop(this.layerZIndex);
this.layerZIndex=-1;
}if(this.isAutoHide){
this.setMinimized(true);
}});
$_V(c$,"releaseWidget",
function(){
if($wt.widgets.QuickLaunch.defaultQuickLaunch!=null){
return;
}if(this.shortcutItems!=null){
for(var i=0;i<this.shortcutItems.length;i++){
var item=this.shortcutItems[i];
if(item!=null){
Clazz.removeEvent(item,"mouseover",this.hLaunchMouseEnter);
O$.destroyHandle(item);
}}
this.shortcutItems=null;
this.shortcutCount=0;
}if(this.handle!=null){
if(this.hLaunchToggle!=null){
Clazz.removeEvent(this.handle,"dblclick",this.hLaunchToggle);
this.hLaunchToggle=null;
}if(this.hLaunchClick!=null){
Clazz.removeEvent(this.handle,"click",this.hLaunchClick);
this.hLaunchClick=null;
}if(this.hLaunchMouseEnter!=null){
Clazz.removeEvent(this.handle,"mouseover",this.hLaunchMouseEnter);
this.hLaunchMouseEnter=null;
}O$.destroyHandle(this.handle);
this.handle=null;
}});
$_M(c$,"toggleAutoHide",
function(){
this.isAutoHide=!this.isAutoHide;
this.handle.title=this.isAutoHide?"Doubleclick to set quicklaunch always-visible":"Doubleclick to set quicklaunch auto-hide";
this.setMinimized(this.isAutoHide);
if(this.isJustUpdated){
return;
}this.bringToTop(-1);
});
c$.$QuickLaunch$1$=function(){
$_H();
c$=$_W($wt.widgets,"QuickLaunch$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.QuickLaunch"].isAutoHide){
this.b$["$wt.widgets.QuickLaunch"].setMinimized(false);
}var zIndex=w$.currentTopZIndex+1;
if(this.b$["$wt.widgets.QuickLaunch"].handle.style.zIndex!=zIndex){
this.b$["$wt.widgets.QuickLaunch"].layerZIndex=this.b$["$wt.widgets.QuickLaunch"].handle.style.zIndex;
this.b$["$wt.widgets.QuickLaunch"].bringToTop(zIndex);
}});
c$=$_P();
};
c$.$QuickLaunch$2$=function(){
$_H();
c$=$_W($wt.widgets,"QuickLaunch$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.QuickLaunch"].setMinimized(false)){
this.b$["$wt.widgets.QuickLaunch"].isJustUpdated=true;
w$.setTimeout($_Q((($_D("$wt.widgets.QuickLaunch$2$1")?0:org.eclipse.swt.widgets.QuickLaunch.$QuickLaunch$2$1$()),$_N($wt.widgets.QuickLaunch$2$1,this,null))),500);
}this.b$["$wt.widgets.QuickLaunch"].bringToTop(-1);
});
c$=$_P();
};
c$.$QuickLaunch$2$1$=function(){
$_H();
c$=$_W($wt.widgets,"QuickLaunch$2$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.QuickLaunch"].isJustUpdated=false;
});
c$=$_P();
};
c$.$QuickLaunch$3$=function(){
$_H();
c$=$_W($wt.widgets,"QuickLaunch$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.QuickLaunch"].toggleAutoHide();
});
c$=$_P();
};
$_S(c$,
"defaultQuickLaunch",null);
});
