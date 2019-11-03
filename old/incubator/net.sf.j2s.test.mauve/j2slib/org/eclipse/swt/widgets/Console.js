$_L(["$wt.widgets.Shell"],"$wt.widgets.Console",["$wt.events.ShellAdapter","$wt.graphics.Point","$wt.internal.browser.OS","$wt.layout.GridData","$.GridLayout","$wt.widgets.Composite","$.Display"],function(){
c$=$_C(function(){
this.consoleWrapper=null;
$_Z(this,arguments);
},$wt.widgets,"Console",$wt.widgets.Shell);
c$.openConsole=$_M(c$,"openConsole",
function(){
if($wt.widgets.Console.console!=null&&!$wt.widgets.Console.console.isDisposed()){
$wt.widgets.Console.console.setMinimized(false);
$wt.widgets.Console.console.setVisible(true);
$wt.widgets.Console.console.bringToTop();
return;
}try{
var display=$wt.widgets.Display.getDefault();
($t$=$wt.widgets.Console.console=new $wt.widgets.Console(display,1264),$wt.widgets.Console.prototype.console=$wt.widgets.Console.console,$t$);
$wt.widgets.Console.console.addShellListener((($_D("$wt.widgets.Console$1")?0:org.eclipse.swt.widgets.Console.$Console$1$()),$_N($wt.widgets.Console$1,this,null)));
$wt.widgets.Console.console.open();
if($wt.widgets.Console.lastBounds!=null){
$wt.widgets.Console.console.setBounds($wt.widgets.Console.lastBounds);
}else{
$wt.widgets.Console.console.pack();
}$wt.widgets.Console.console.layout();
if($wt.widgets.Console.scrollOffset!=null){
$wt.widgets.Console.console.getDisplay().timerExec(50,(($_D("$wt.widgets.Console$2")?0:org.eclipse.swt.widgets.Console.$Console$2$()),$_N($wt.widgets.Console$2,this,null)));
}Sync2Async.block($wt.widgets.Console.console,this,function(){
if(display.shortcutBar==null||display.shortcutBar.shortcutCount==0){
display.dispose();
}});
return;
}catch(e){
if($_O(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
});
$_K(c$,
function(display,style){
$_R(this,$wt.widgets.Console,[display,style]);
this.createContents();
var gridLayout=new $wt.layout.GridLayout();
gridLayout.marginWidth=0;
gridLayout.marginHeight=0;
gridLayout.horizontalSpacing=0;
gridLayout.verticalSpacing=0;
this.setLayout(gridLayout);
},"$wt.widgets.Display,~N");
$_M(c$,"createContents",
function(){
this.setText("Console");
this.shellIcon.className="shell-title-icon shell-title-icon-console";
this.consoleWrapper=new $wt.widgets.Composite(this,0);
this.consoleWrapper.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
var str="0123456789";
str+=str;
str+=str;
str+=str;
var defaultSize=O$.getStringStyledSize(str,null,"font-size:10pt;font-family:monospace,Arial,sans-serif;");
var gridData=new $wt.layout.GridData(1808);
gridData.widthHint=defaultSize.x+O$.getScrollBarWidth();
gridData.heightHint=defaultSize.y*25+O$.getScrollBarHeight();
this.consoleWrapper.setLayoutData(gridData);
this.consoleWrapper.handle.style.overflow="scroll";
this.consoleWrapper.handle.style.backgroundColor="black";
this.consoleWrapper.handle.style.color="white";
var el=d$.getElementById("_console_");
if(el==null){
el=d$.createElement("DIV");
el.id="_console_";
el.style.fontFamily="monospace,Arial,sans-serif";
}else{
el.parentNode.removeChild(el);
el.style.display="";
if(O$.isIE){
el.style.position="";
el.style.width="";
el.style.height="";
el.style.left="";
el.style.top="";
el.style.overflow="";
}}el.style.fontSize="10pt";
this.consoleWrapper.handle.appendChild(el);
});
c$.$Console$1$=function(){
$_H();
c$=$_W($wt.widgets,"Console$1",$wt.events.ShellAdapter);
$_V(c$,"shellClosed",
function(e){
($t$=$wt.widgets.Console.lastBounds=$wt.widgets.Console.console.getBounds(),$wt.widgets.Console.prototype.lastBounds=$wt.widgets.Console.lastBounds,$t$);
var wrapperEl=$wt.widgets.Console.console.consoleWrapper.handle;
($t$=$wt.widgets.Console.scrollOffset=new $wt.graphics.Point(wrapperEl.scrollLeft,wrapperEl.scrollTop),$wt.widgets.Console.prototype.scrollOffset=$wt.widgets.Console.scrollOffset,$t$);
var el=d$.getElementById("_console_");
if(el!=null){
el.parentNode.removeChild(el);
if(O$.isIE){
el.style.display="block";
el.style.position="absolute";
el.style.width="200px";
el.style.height="200px";
el.style.left="-400px";
el.style.top="-400px";
el.style.overflow="hidden";
}else{
el.style.display="none";
}el.style.fontSize="";
d$.body.appendChild(el);
}($t$=$wt.widgets.Console.console=null,$wt.widgets.Console.prototype.console=$wt.widgets.Console.console,$t$);
},"$wt.events.ShellEvent");
c$=$_P();
};
c$.$Console$2$=function(){
$_H();
c$=$_W($wt.widgets,"Console$2",null,Runnable);
$_V(c$,"run",
function(){
var wrapperEl=$wt.widgets.Console.console.consoleWrapper.handle;
wrapperEl.scrollLeft=$wt.widgets.Console.scrollOffset.x;
wrapperEl.scrollTop=$wt.widgets.Console.scrollOffset.y;
});
c$=$_P();
};
$_S(c$,
"console",null,
"lastBounds",null,
"scrollOffset",null);
});
