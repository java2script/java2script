$_L(["$wt.widgets.DesktopItem"],"$wt.widgets.MaximizedTitle",["$wt.internal.browser.OS","$wt.widgets.Decorations","$.Display"],function(){
$WTC$$.registerCSS ("$wt.widgets.MaximizedTitle", ".shell-manager-topbar-container {\nposition:absolute;\nleft:0;\ntop:0;\nborder:1px solid windowframe;\nborder-top:0 none transparent;\nbackground-color:buttonface;\npadding:2px;\nheight:24px;\n/*font-size:10pt;\nheight:1.6em;\nmin-height:24px;\n_height:1.7em;*/\nwidth:320px;\nz-index:6174;\ntext-align:left;\nfont-size:0;\nmargin:0;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n*:first-child+html .shell-manager-topbar-container { /* IE7 */\n/*height:1.7em;*/\n}\n.swt-widgets-maximizedtitle {\nwidth:324px;\n}");
 c$ = $_C (function () {
this.lastMaximizedShell = null;
this.topbarEl = null;
this.hMaxClick = null;
$_Z (this, arguments);
}, $wt.widgets, "MaximizedTitle", $wt.widgets.DesktopItem);
$_K (c$, 
function (display) {
$_R (this, $wt.widgets.MaximizedTitle);
this.display = display;
}, "$wt.widgets.Display");
$_V(c$,"updateLayout",
function(){
var lastShell=$wt.widgets.Display.getTopMaximizedShell();
if(lastShell==null||lastShell.titleBar==null)return;
this.lastMaximizedShell=lastShell;
var els=new Array(0);
for(var i=0;i<lastShell.titleBar.childNodes.length;i++){
els[i]=lastShell.titleBar.childNodes[i];
}
for(var i=0;i<els.length;i++){
lastShell.titleBar.removeChild(els[i]);
this.topbarEl.appendChild(els[i]);
}
this.handle.style.left=Math.round(Math.floor((O$.getFixedBodyClientWidth()-320)/2))+"px";
this.topbarEl.style.width="316px";
if(O$.isIE){
this.topbarEl.style.left="1px";
}else{
this.topbarEl.style.left="2px";
}this.topbarEl.style.top="1px";
this.hMaxClick=lastShell.hMaxClick;
if(this.hMaxClick!=null){
Clazz.addEvent(this.handle,"dblclick",this.hMaxClick);
}lastShell.updateShellTitle(324);
});
$_M(c$,"returnTopMaximized",
function(shell){
var lastShell=this.lastMaximizedShell;
if(shell!=null&&lastShell!==shell)return;
if(lastShell==null||lastShell.titleBar==null)return;
var els=new Array(0);
for(var i=0;i<this.topbarEl.childNodes.length;i++){
els[i]=this.topbarEl.childNodes[i];
}
for(var i=0;i<els.length;i++){
lastShell.titleBar.appendChild(els[i]);
}
if(shell!=null){
this.handle.style.display="none";
}},"$wt.widgets.Shell");
$_V(c$,"initialize",
function(){
if(this.handle!=null)return;
var tbc=d$.createElement("DIV");
tbc.className="shell-manager-topbar-container";
d$.body.appendChild(tbc);
tbc.style.lineHeight="16px";
tbc.style.display="none";
this.handle=tbc;
var supportShadow=false;
{
supportShadow=window["swt.disable.shadow"]!=true;
}if(supportShadow){
$wt.widgets.Decorations.appendShadowHandles(this.handle,false,true,true,true);
}var tb=d$.createElement("DIV");
tb.className="shell-title-bar shell-maximized";
this.handle.appendChild(tb);
this.topbarEl=tb;
});
$_M(c$,"isAround",
function(now,x,y){
if(now-this.lastUpdated<1000){
return true;
}var barWidth=320;
var width=O$.getFixedBodyClientWidth();
var offset=Math.round(Math.floor((width-barWidth)/2));
var x1=offset-72;
var x2=offset+barWidth+72;
return(x>=x1&&x<=x2);
},"~N,~N,~N");
$_M(c$,"hide",
function(){
var smStyle=this.handle.style;
if(smStyle.display==="block"){
smStyle.display="none";
}});
$_M(c$,"handleApproaching",
function(){
var topbar=this.handle;
if(topbar==null)return;
if(topbar.style.display!=="block"){
var lastShell=$wt.widgets.Display.getTopMaximizedShell();
if(lastShell!=null&&lastShell.titleBar!=null){
topbar.style.display="block";
this.updateLayout();
}}});
$_V(c$,"handleLeaving",
function(){
var topbar=this.handle;
if(topbar==null)return;
if(topbar.style.display!=="none"){
topbar.style.display="none";
this.returnTopMaximized(null);
}});
$_M(c$,"isApproaching",
function(now,x,y,ctrlKey){
return(y<=8&&!ctrlKey)&&this.isAround(now,x,y);
},"~N,~N,~N,~B");
$_M(c$,"isLeaving",
function(now,x,y,ctrlKey){
var topShell=$wt.widgets.Display.getTopMaximizedShell();
if(topShell==null)return false;
return!this.isAround(now,x,y)||ctrlKey||y>12+((topShell.titleBar!=null)?O$.getContainerHeight(topShell.titleBar):20);
},"~N,~N,~N,~B");
$_V(c$,"bringToTop",
function(index){
},"~N");
$_M(c$,"isVisible",
function(){
return this.handle.style.display!=="none";
});
$_V(c$,"releaseWidget",
function(){
if(this.handle!=null){
if(this.hMaxClick!=null){
Clazz.removeEvent(this.handle,"dblclick",this.hMaxClick);
this.hMaxClick=null;
}O$.destroyHandle(this.handle);
this.handle=null;
}if(this.topbarEl!=null){
O$.destroyHandle(this.topbarEl);
this.topbarEl=null;
}});
});
