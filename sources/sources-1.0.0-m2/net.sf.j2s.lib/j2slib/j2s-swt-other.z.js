/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,j2s-swt-basic.z.js,j2s-swt-event.z.js,j2s-swt-layout.z.js,j2s-swt-widget.z.js,org/eclipse/swt/browser/Browser.js,org/eclipse/swt/program/Program.js,org/eclipse/swt/printing/Printer.js,org/eclipse/swt/printing/PrinterData.js,org/eclipse/swt/printing/PrintDialog.js
=*/
c$=$_C(function(){
this.$back=false;
this.$forward=false;
this.navigate=false;
this.delaySetText=false;
this.addressBar=true;
this.menuBar=true;
this.statusBar=true;
this.toolBar=true;
this.info=0;
this.globalDispatch=0;
this.html=null;
this.closeWindowListeners=null;
this.locationListeners=null;
this.openWindowListeners=null;
this.progressListeners=null;
this.statusTextListeners=null;
this.titleListeners=null;
this.visibilityWindowListeners=null;
this.url=null;
this.browserHandle=null;
$_Z(this,arguments);
},$wt.browser,"Browser",$wt.widgets.Composite);
$_Y(c$,function(){
this.closeWindowListeners=new Array(0);
this.locationListeners=new Array(0);
this.openWindowListeners=new Array(0);
this.progressListeners=new Array(0);
this.statusTextListeners=new Array(0);
this.titleListeners=new Array(0);
this.visibilityWindowListeners=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.browser.Browser,[parent,style&-2049]);
},"$wt.widgets.Composite,~N");
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
$_V(c$,"checkSubclass",
function(){
var name=this.getClass().getName();
var index=name.lastIndexOf('.');
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.browser.Browser,"createHandle",[]);
this.browserHandle=d$.createElement("IFRAME");
this.browserHandle.className="browser-default";
this.handle.appendChild(this.browserHandle);
});
$_M(c$,"execute",
function(script){
return true;
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
return this.url;
});
$_M(c$,"refresh",
function(){
if(this.browserHandle!=null){
if(this.browserHandle.contentWindow!=null){
this.browserHandle.contentWindow.reload();
}else{
this.browserHandle.src=this.url;
}}});
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
if(listener==this.closeWindowListeners[i]){
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
if(listener==this.locationListeners[i]){
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
if(listener==this.openWindowListeners[i]){
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
if(listener==this.progressListeners[i]){
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
if(listener==this.statusTextListeners[i]){
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
if(listener==this.titleListeners[i]){
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
if(listener==this.visibilityWindowListeners[i]){
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
$_M(c$,"iframeDocumentWrite",
($fz=function(handle,html){
var handle=arguments[0];
var html=arguments[1];
if(handle.contentWindow!=null){
handle.contentWindow.location="about:blank";
}else{
handle.src="about:blank";
}
try{
handle.contentWindow.document.write(html);
handle.contentWindow.document.close();
}catch(e){
window.setTimeout((function(){
return function(){
handle.contentWindow.document.write(html);
handle.contentWindow.document.close();
};
})(),25);
}
},$fz.isPrivate=true,$fz),"~O,~S");
$_M(c$,"setUrl",
function(url){
this.html=null;
this.url=url;
if(this.browserHandle!=null){
if(this.browserHandle.contentWindow!=null){
this.browserHandle.contentWindow.location=url;
}else{
this.browserHandle.src=url;
}}this.$back=true;
return true;
},"~S");
$_M(c$,"stop",
function(){
if(this.browserHandle!=null){
if(this.browserHandle.contentWindow!=null){
this.browserHandle.contentWindow.stop();
}else{
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.browser.Browser,"setBounds",[x,y,width,height]);
if(this.handle.style.filter!=null){
this.browserHandle.style.width=(width-2>0?width-2:0)+"px";
this.browserHandle.style.height=(height-2>0?height-2:0)+"px";
}else{
this.browserHandle.style.width=(width-4>0?width-4:0)+"px";
this.browserHandle.style.height=(height-4>0?height-4:0)+"px";
}},"~N,~N,~N,~N");
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
$_J("org.eclipse.swt.program");
c$=$_C(function(){
this.name=null;
this.command=null;
this.iconName=null;
$_Z(this,arguments);
},$wt.program,"Program");
$_K(c$,
function(){
});
c$.findProgram=$_M(c$,"findProgram",
function(extension){
if(extension.length==0)return null;
if((extension.charAt(0)).charCodeAt(0)!=('.').charCodeAt(0))extension="."+extension;
extension=extension.toLowerCase();
var program=new $wt.program.Program();
if(".js".equalsIgnoreCase(extension)){
program.name="Java2Script Pacemaker";
program.command="$wt.program.Program.loadJavaScript(\"%1\")";
program.iconName="images/z-logo.gif";
}else{
program.name="Embeded Browser";
program.command="window.open(\"%1\")";
program.iconName="images/browser.gif";
}return program;
},"~S");
c$.getExtensions=$_M(c$,"getExtensions",
function(){
return[".js",".html",".htm",".xhtml","xml",".png",".gif",".jpg",".jpeg"];
});
c$.getPrograms=$_M(c$,"getPrograms",
function(){
var j2s=new $wt.program.Program();
j2s.name="Java2Script Pacemaker";
j2s.command="$wt.program.Program.loadJavaScript(\"%1\")";
j2s.iconName="images/z-logo.gif";
var browser=new $wt.program.Program();
browser.name="Embeded Browser";
browser.command="window.open(\"%1\")";
browser.iconName="images/browser.gif";
return[j2s,browser];
});
c$.loadJavaScript=$_M(c$,"loadJavaScript",
function(url){
var script=document.createElement("SCRIPT");
script.src=url;
document.body.appendChild(script);
},"~S");
c$.launch=$_M(c$,"launch",
function(fileName){
if(fileName.endsWith(".js")){
$wt.program.Program.findProgram(".js").execute(fileName);
}else{
$wt.program.Program.findProgram(fileName).execute(fileName);
}return true;
},"~S");
$_M(c$,"execute",
function(fileName){
var quote=true;
var prefix=this.command;
var suffix="";
var index=this.command.indexOf("%1");
if(index!=-1){
var count=0;
var i=index+2;
var length=this.command.length;
while(i<length){
if((this.command.charAt(i)).charCodeAt(0)==('"').charCodeAt(0))count++;
i++;
}
quote=count%2==0;
prefix=this.command.substring(0,index);
suffix=this.command.substring(index+2,length);
}if(!fileName.startsWith("/")&&!fileName.startsWith("\\")&&(fileName.charAt(1)).charCodeAt(0)==(':').charCodeAt(0)){
fileName="file:///"+fileName;
}if(quote)fileName="\"" + fileName + "\"";
try{
eval((prefix+fileName+suffix).replace(/\\/g,"\\\\"));
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
return true;
},"~S");
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.iconName);
});
$_M(c$,"getName",
function(){
return this.name;
});
$_V(c$,"equals",
function(other){
if(this==other)return true;
if($_O(other,$wt.program.Program)){
var program=other;
return this.name.equals(program.name)&&this.command.equals(program.command)&&this.iconName.equals(program.iconName);
}return false;
},"~O");
$_V(c$,"hashCode",
function(){
return this.name.hashCode()^this.command.hashCode()^this.iconName.hashCode();
});
$_V(c$,"toString",
function(){
return"Program {"+this.name+"}";
});
$_J("org.eclipse.swt.printing");
c$=$_C(function(){
this.handle=0;
this.data=null;
$_Z(this,arguments);
},$wt.printing,"Printer",$wt.graphics.Device);
c$.getPrinterList=$_M(c$,"getPrinterList",
function(){
return null;
});
c$.getDefaultPrinterData=$_M(c$,"getDefaultPrinterData",
function(){
return null;
});
c$.checkNull=$_M(c$,"checkNull",
function(data){
if(data==null)data=new $wt.printing.PrinterData();
if(data.driver==null||data.name==null){
var defaultPrinter=$wt.printing.Printer.getDefaultPrinterData();
data.driver=defaultPrinter.driver;
data.name=defaultPrinter.name;
}return data;
},"$wt.printing.PrinterData");
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
$_R(this,$wt.printing.Printer,[$wt.printing.Printer.checkNull(data)]);
},"$wt.printing.PrinterData");
$_V(c$,"create",
function(deviceData){
},"$wt.graphics.DeviceData");
$_M(c$,"startJob",
function(jobName){
this.checkDevice();
return false;
},"~S");
$_M(c$,"endJob",
function(){
this.checkDevice();
});
$_M(c$,"cancelJob",
function(){
this.checkDevice();
});
$_M(c$,"startPage",
function(){
this.checkDevice();
return false;
});
$_M(c$,"endPage",
function(){
this.checkDevice();
});
$_V(c$,"getDPI",
function(){
this.checkDevice();
return null;
});
$_V(c$,"getBounds",
function(){
this.checkDevice();
return null;
});
$_V(c$,"getClientArea",
function(){
this.checkDevice();
return null;
});
$_M(c$,"computeTrim",
function(x,y,width,height){
this.checkDevice();
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N,~N,~N,~N");
$_M(c$,"getPrinterData",
function(){
return this.data;
});
$_V(c$,"checkDevice",
function(){
});
$_M(c$,"release",
function(){
$_U(this,$wt.printing.Printer,"release",[]);
this.data=null;
});
$_V(c$,"destroy",
function(){
this.handle=0;
});
$_J("org.eclipse.swt.printing");
c$=$_C(function(){
this.driver=null;
this.name=null;
this.scope=0;
this.startPage=0;
this.endPage=0;
this.printToFile=false;
this.fileName=null;
this.copyCount=1;
this.collate=false;
this.otherData=null;
$_Z(this,arguments);
},$wt.printing,"PrinterData",$wt.graphics.DeviceData);
$_K(c$,
function(){
$_R(this,$wt.printing.PrinterData,[]);
});
$_K(c$,
function(driver,name){
$_R(this,$wt.printing.PrinterData,[]);
this.driver=driver;
this.name=name;
},"~S,~S");
$_V(c$,"toString",
function(){
return"PrinterData {"+"driver = "+this.driver+", name = "+this.name+"}";
});
$_S(c$,
"ALL_PAGES",0,
"PAGE_RANGE",1,
"SELECTION",2);
$_J("org.eclipse.swt.printing");
c$=$_C(function(){
this.scope=0;
this.startPage=1;
this.endPage=1;
this.printToFile=false;
$_Z(this,arguments);
},$wt.printing,"PrintDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.printing.PrintDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getScope",
function(){
return this.scope;
});
$_M(c$,"setScope",
function(scope){
this.scope=scope;
},"~N");
$_M(c$,"getStartPage",
function(){
return this.startPage;
});
$_M(c$,"setStartPage",
function(startPage){
this.startPage=startPage;
},"~N");
$_M(c$,"getEndPage",
function(){
return this.endPage;
});
$_M(c$,"setEndPage",
function(endPage){
this.endPage=endPage;
},"~N");
$_M(c$,"getPrintToFile",
function(){
return this.printToFile;
});
$_M(c$,"setPrintToFile",
function(printToFile){
this.printToFile=printToFile;
},"~B");
$_V(c$,"checkSubclass",
function(){
var name=this.getClass().getName();
var validName=$wt.printing.PrintDialog.getName();
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return null;
});
