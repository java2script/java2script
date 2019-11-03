$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.AWindowDelegate",["$wt.events.DisposeListener","$wt.widgets.Display"],function(){
c$=$_C(function(){
this.win=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AWindowDelegate");
$_K(c$,
function(win){
this.win=win;
},"org.eclipse.jface.window.Window");
c$.open=$_M(c$,"open",
function(win,runnable){
win.setBlockOnOpen(false);
new net.sf.j2s.ajax.AWindowDelegate(win).nonBlockOpen(null,runnable);
},"org.eclipse.jface.window.Window,net.sf.j2s.ajax.AWindowRunnable");
c$.asyncOpen=$_M(c$,"asyncOpen",
function(win,oThis,runnable){
win.setBlockOnOpen(false);
new net.sf.j2s.ajax.AWindowDelegate(win).nonBlockOpen(oThis,runnable);
},"org.eclipse.jface.window.Window,~O,net.sf.j2s.ajax.AWindowRunnable");
$_M(c$,"nonBlockOpen",
function(oThis,runnable){
if($_O(runnable,net.sf.j2s.ajax.AWindowRunnable)){
runnable.setWindow(this.win);
}var isJ2SEnv=false;
{
isJ2SEnv=true;
}if(isJ2SEnv){
{
this.win.open();
}((($_D("net.sf.j2s.ajax.AWindowDelegate$1")?0:net.sf.j2s.ajax.AWindowDelegate.$AWindowDelegate$1$()),$_N(net.sf.j2s.ajax.AWindowDelegate$1,this,$_F("oThis",oThis,"runnable",runnable)))).run();
}else{
}},"~O,net.sf.j2s.ajax.AWindowRunnable");
$_M(c$,"getActiveDisplay",
function(){
var display=null;
var shell=this.win.getShell();
if(shell!=null){
display=shell.getDisplay();
}if(display==null){
display=$wt.widgets.Display.getCurrent();
}if(display==null){
display=$wt.widgets.Display.getDefault();
}return display;
});
c$.$AWindowDelegate$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"AWindowDelegate$1",null,Runnable);
$_M(c$,"run",
function(){
var shell=this.b$["net.sf.j2s.ajax.AWindowDelegate"].win.getShell();
if(shell==null){
this.b$["net.sf.j2s.ajax.AWindowDelegate"].getActiveDisplay().timerExec(10,this);
return;
}shell.addDisposeListener((($_D("net.sf.j2s.ajax.AWindowDelegate$1$1")?0:net.sf.j2s.ajax.AWindowDelegate.$AWindowDelegate$1$1$()),$_N(net.sf.j2s.ajax.AWindowDelegate$1$1,this,$_F("oThis",this.f$.oThis,"runnable",this.f$.runnable))));
shell.getDisplay().readAndDispatch();
});
c$=$_P();
};
c$.$AWindowDelegate$1$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"AWindowDelegate$1$1",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(e){
e.display.update();
if(this.f$.oThis==null){
e.display.timerExec(5,this.f$.runnable);
}else{
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);
}},"$wt.events.DisposeEvent");
c$=$_P();
};
});
