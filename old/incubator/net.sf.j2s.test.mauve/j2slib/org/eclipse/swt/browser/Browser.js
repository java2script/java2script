$_L(["$wt.widgets.Composite"],"$wt.browser.Browser",["$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.browser.Browser", ".browser-default {\nwidth:100%;\nheight:100%;\nbackground-color:white;\n}\n* html .browser-default {\nborder:2px solid menu;\n}\n.swt-browser-browser {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.$back = false;
this.$forward = false;
this.navigate = false;
this.delaySetText = false;
this.addressBar = true;
this.menuBar = true;
this.statusBar = true;
this.toolBar = true;
this.info = 0;
this.globalDispatch = 0;
this.html = null;
this.closeWindowListeners = null;
this.locationListeners = null;
this.openWindowListeners = null;
this.progressListeners = null;
this.statusTextListeners = null;
this.titleListeners = null;
this.visibilityWindowListeners = null;
this.url = null;
this.browserHandle = null;
$_Z (this, arguments);
}, $wt.browser, "Browser", $wt.widgets.Composite);
$_Y (c$, function () {
this.closeWindowListeners =  new Array (0);
this.locationListeners =  new Array (0);
this.openWindowListeners =  new Array (0);
this.progressListeners =  new Array (0);
this.statusTextListeners =  new Array (0);
this.titleListeners =  new Array (0);
this.visibilityWindowListeners =  new Array (0);
});
$_K (c$, 
function (parent, style) {
$_R (this, $wt.browser.Browser, [parent, style & -2049]);
}, "$wt.widgets.Composite,~N");
$_M(c$,"addCloseWindowListener",
function(listener){
var newCloseWindowListeners=new Array(this.closeWindowListeners.length+1);
System.arraycopy(this.closeWindowListeners,0,newCloseWindowListeners,0,this.closeWindowListeners.length);
this.closeWindowListeners=newCloseWindowListeners;
this.closeWindowListeners[this.closeWindowListeners.length-1]=listener;
},"$wt.browser.CloseWindowListener");
$_M(c$,"addLocationListener",
function(listener){
var newLocationListeners=new Array(this.locationListeners.length+1);
System.arraycopy(this.locationListeners,0,newLocationListeners,0,this.locationListeners.length);
this.locationListeners=newLocationListeners;
this.locationListeners[this.locationListeners.length-1]=listener;
},"$wt.browser.LocationListener");
$_M(c$,"addOpenWindowListener",
function(listener){
var newOpenWindowListeners=new Array(this.openWindowListeners.length+1);
System.arraycopy(this.openWindowListeners,0,newOpenWindowListeners,0,this.openWindowListeners.length);
this.openWindowListeners=newOpenWindowListeners;
this.openWindowListeners[this.openWindowListeners.length-1]=listener;
},"$wt.browser.OpenWindowListener");
$_M(c$,"addProgressListener",
function(listener){
var newProgressListeners=new Array(this.progressListeners.length+1);
System.arraycopy(this.progressListeners,0,newProgressListeners,0,this.progressListeners.length);
this.progressListeners=newProgressListeners;
this.progressListeners[this.progressListeners.length-1]=listener;
},"$wt.browser.ProgressListener");
$_M(c$,"addStatusTextListener",
function(listener){
var newStatusTextListeners=new Array(this.statusTextListeners.length+1);
System.arraycopy(this.statusTextListeners,0,newStatusTextListeners,0,this.statusTextListeners.length);
this.statusTextListeners=newStatusTextListeners;
this.statusTextListeners[this.statusTextListeners.length-1]=listener;
},"$wt.browser.StatusTextListener");
$_M(c$,"addTitleListener",
function(listener){
var newTitleListeners=new Array(this.titleListeners.length+1);
System.arraycopy(this.titleListeners,0,newTitleListeners,0,this.titleListeners.length);
this.titleListeners=newTitleListeners;
this.titleListeners[this.titleListeners.length-1]=listener;
},"$wt.browser.TitleListener");
$_M(c$,"addVisibilityWindowListener",
function(listener){
var newVisibilityWindowListeners=new Array(this.visibilityWindowListeners.length+1);
System.arraycopy(this.visibilityWindowListeners,0,newVisibilityWindowListeners,0,this.visibilityWindowListeners.length);
this.visibilityWindowListeners=newVisibilityWindowListeners;
this.visibilityWindowListeners[this.visibilityWindowListeners.length-1]=listener;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"back",
function(){
if(!this.$back)return false;
if(this.browserHandle!=null&&this.browserHandle.contentWindow!=null){
try{
this.browserHandle.contentWindow.history.back();
this.$forward=true;
return true;
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
}return false;
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.browser.Browser,"createHandle",[]);
this.browserHandle=d$.createElement("IFRAME");
this.browserHandle.className="browser-default";
this.browserHandle.style.border="0 none transparent";
if(O$.isIE){
this.browserHandle.setAttribute("frameBorder","0");
}this.handle.appendChild(this.browserHandle);
});
$_M(c$,"execute",
function(script){
{
try{
this.browserHandle.contentWindow.eval(script);
}catch(e){
return false;
}
}return true;
},"~S");
$_M(c$,"forward",
function(){
if(!this.$forward)return false;
if(this.browserHandle!=null&&this.browserHandle.contentWindow!=null){
try{
this.browserHandle.contentWindow.history.forward();
return true;
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
}return false;
});
$_M(c$,"isBackEnabled",
function(){
return this.$back;
});
$_M(c$,"isForwardEnabled",
function(){
return this.$forward;
});
$_M(c$,"getUrl",
function(){
return this.handle.contentWindow.location;
});
$_M(c$,"refresh",
function(){
if(this.browserHandle!=null){
try{
var win=this.browserHandle.contentWindow;
if(win!=null){
win.reload();
}else{
this.browserHandle.src=this.url;
}
}catch(e){
this.browserHandle.src=this.url;
}
}});
$_M(c$,"releaseHandle",
function(){
if(this.browserHandle!=null){
O$.destroyHandle(this.browserHandle);
this.browserHandle=null;
}$_U(this,$wt.browser.Browser,"releaseHandle",[]);
});
$_M(c$,"removeCloseWindowListener",
function(listener){
if(this.closeWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.closeWindowListeners.length;i++){
if(listener===this.closeWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.closeWindowListeners.length==1){
this.closeWindowListeners=new Array(0);
return;
}var newCloseWindowListeners=new Array(this.closeWindowListeners.length-1);
System.arraycopy(this.closeWindowListeners,0,newCloseWindowListeners,0,index);
System.arraycopy(this.closeWindowListeners,index+1,newCloseWindowListeners,index,this.closeWindowListeners.length-index-1);
this.closeWindowListeners=newCloseWindowListeners;
},"$wt.browser.CloseWindowListener");
$_M(c$,"removeLocationListener",
function(listener){
if(this.locationListeners.length==0)return;
var index=-1;
for(var i=0;i<this.locationListeners.length;i++){
if(listener===this.locationListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.locationListeners.length==1){
this.locationListeners=new Array(0);
return;
}var newLocationListeners=new Array(this.locationListeners.length-1);
System.arraycopy(this.locationListeners,0,newLocationListeners,0,index);
System.arraycopy(this.locationListeners,index+1,newLocationListeners,index,this.locationListeners.length-index-1);
this.locationListeners=newLocationListeners;
},"$wt.browser.LocationListener");
$_M(c$,"removeOpenWindowListener",
function(listener){
if(this.openWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.openWindowListeners.length;i++){
if(listener===this.openWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.openWindowListeners.length==1){
this.openWindowListeners=new Array(0);
return;
}var newOpenWindowListeners=new Array(this.openWindowListeners.length-1);
System.arraycopy(this.openWindowListeners,0,newOpenWindowListeners,0,index);
System.arraycopy(this.openWindowListeners,index+1,newOpenWindowListeners,index,this.openWindowListeners.length-index-1);
this.openWindowListeners=newOpenWindowListeners;
},"$wt.browser.OpenWindowListener");
$_M(c$,"removeProgressListener",
function(listener){
if(this.progressListeners.length==0)return;
var index=-1;
for(var i=0;i<this.progressListeners.length;i++){
if(listener===this.progressListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.progressListeners.length==1){
this.progressListeners=new Array(0);
return;
}var newProgressListeners=new Array(this.progressListeners.length-1);
System.arraycopy(this.progressListeners,0,newProgressListeners,0,index);
System.arraycopy(this.progressListeners,index+1,newProgressListeners,index,this.progressListeners.length-index-1);
this.progressListeners=newProgressListeners;
},"$wt.browser.ProgressListener");
$_M(c$,"removeStatusTextListener",
function(listener){
if(this.statusTextListeners.length==0)return;
var index=-1;
for(var i=0;i<this.statusTextListeners.length;i++){
if(listener===this.statusTextListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.statusTextListeners.length==1){
this.statusTextListeners=new Array(0);
return;
}var newStatusTextListeners=new Array(this.statusTextListeners.length-1);
System.arraycopy(this.statusTextListeners,0,newStatusTextListeners,0,index);
System.arraycopy(this.statusTextListeners,index+1,newStatusTextListeners,index,this.statusTextListeners.length-index-1);
this.statusTextListeners=newStatusTextListeners;
},"$wt.browser.StatusTextListener");
$_M(c$,"removeTitleListener",
function(listener){
if(this.titleListeners.length==0)return;
var index=-1;
for(var i=0;i<this.titleListeners.length;i++){
if(listener===this.titleListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.titleListeners.length==1){
this.titleListeners=new Array(0);
return;
}var newTitleListeners=new Array(this.titleListeners.length-1);
System.arraycopy(this.titleListeners,0,newTitleListeners,0,index);
System.arraycopy(this.titleListeners,index+1,newTitleListeners,index,this.titleListeners.length-index-1);
this.titleListeners=newTitleListeners;
},"$wt.browser.TitleListener");
$_M(c$,"removeVisibilityWindowListener",
function(listener){
if(this.visibilityWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.visibilityWindowListeners.length;i++){
if(listener===this.visibilityWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.visibilityWindowListeners.length==1){
this.visibilityWindowListeners=new Array(0);
return;
}var newVisibilityWindowListeners=new Array(this.visibilityWindowListeners.length-1);
System.arraycopy(this.visibilityWindowListeners,0,newVisibilityWindowListeners,0,index);
System.arraycopy(this.visibilityWindowListeners,index+1,newVisibilityWindowListeners,index,this.visibilityWindowListeners.length-index-1);
this.visibilityWindowListeners=newVisibilityWindowListeners;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"setText",
function(html){
var blankLoading=this.html!=null;
this.html=html;
if(blankLoading)return true;
if(this.browserHandle!=null){
this.iframeDocumentWrite(this.browserHandle,html);
}this.html=null;
return true;
},"~S");
$_M(c$,"generateLazyIframeWriting",
function(handle,domain,html){
return function(){
try{
var doc=handle.contentWindow.document;
doc.open();
if(O$.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
doc.domain=domain;
}
doc.write(html);
doc.close();
handle=null;
}catch(e){
window.setTimeout(arguments.callee,25);
}
};
},"~O,~S,~S");
$_M(c$,"iframeDocumentWrite",
($fz=function(handle,html){
var handle=arguments[0];
var html=arguments[1];
var domain=null;
try{
domain=document.domain;
}catch(e){}
if(O$.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
document.domain=domain;
}
if(handle.contentWindow!=null){
if(O$.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
handle.contentWindow.location="javascript:document.open();document.domain='"+domain+"';document.close();void(0);";
}else{
handle.contentWindow.location="about:blank";
}
}else{
handle.src="about:blank";
}
try{
var doc=handle.contentWindow.document;
doc.open();
if(O$.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
doc.domain=domain;
}
doc.write(html);
doc.close();
}catch(e){
if(O$.isIE&&(domain==null||domain.length==0)
&&e.message!=null&&e.message.indexOf("Access is denied")!=-1){
var jsHTML=html.replaceAll("\\\\", "\\\\\\\\")
.replaceAll("\r","\\\\r")
.replaceAll("\n","\\\\n")
.replaceAll("\"","\\\\\"");
handle.src="javascript:document.open();document.write (\""+jsHTML+"\");document.close();void(0);";

}else{
window.setTimeout(this.generateLazyIframeWriting(handle,domain,html),25);
}
}
},$fz.isPrivate=true,$fz),"~O,~S");
$_M(c$,"setUrl",
function(url){
this.html=null;
this.url=url;
if(this.browserHandle!=null){
try{
var win=this.browserHandle.contentWindow;
if(win!=null){
win.location=this.url;
}else{
this.browserHandle.src=this.url;
}
}catch(e){
this.browserHandle.src=this.url;
}
}this.$back=true;
return true;
},"~S");
$_M(c$,"stop",
function(){
if(this.browserHandle!=null){
if(this.browserHandle.contentWindow!=null){
this.browserHandle.contentWindow.stop();
}else{
}}});
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
$_S(c$,
"BeforeNavigate2",0xfa,
"CommandStateChange",0x69,
"DocumentComplete",0x103,
"NavigateComplete2",0xfc,
"NewWindow2",0xfb,
"OnMenuBar",0x100,
"OnStatusBar",0x101,
"OnToolBar",0xff,
"OnVisible",0xfe,
"ProgressChange",0x6c,
"RegisterAsBrowser",0x228,
"StatusTextChange",0x66,
"TitleChange",0x71,
"WindowClosing",0x107,
"WindowSetHeight",0x10b,
"WindowSetLeft",0x108,
"WindowSetResizable",0x106,
"WindowSetTop",0x109,
"WindowSetWidth",0x10a,
"ABOUT_BLANK","about:blank",
"URL_DIRECTOR","http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab",
"PACKAGE_PREFIX","org.eclipse.swt.browser.");
});
