$_L(null,"$wt.internal.ResizeHandler",["$wt.internal.browser.OS"],function(){
c$=$_C(function(){
this.monitor=null;
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(monitor){
this.monitor=monitor;
},"$wt.widgets.Monitor");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
var tb=null;
{
tb=this.shell.titleBar;
}var h=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
this.shell.setLocation(-1,this.shell.getMonitor().getClientArea().height-h-6);
});
$_M(c$,"updateMaximized",
function(){
var monitor=this.shell.getMonitor();
var area=monitor.getClientArea();
var height=area.height;
var width=area.width;
var isBodyMonitor=false;
{
isBodyMonitor=monitor.handle==document.body;
}if(isBodyMonitor){
width=d$.body.parentNode.clientWidth;
height=O$.getFixedBodyClientHeight();
}var tb=null;
{
tb=this.shell.titleBar;
}var titleHeight=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
this.shell.setBounds(this.shell.computeTrim(0,-titleHeight,width,height));
});
$_M(c$,"updateCentered",
function(){
var tb=null;
{
tb=this.shell.titleBar;
}var h=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):20;
var monitor=this.shell.getMonitor();
var size=this.shell.getSize();
var y=Math.floor((monitor.getClientArea().height-size.y)/2)-h;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((monitor.getClientArea().width-size.x)/2),y);
});
$_M(c$,"updateMonitor",
function(){
this.monitor.clientWidth=document.body.parentNode.clientWidth;
this.monitor.clientHeight=O$.getFixedBodyClientHeight();
});
$_M(c$,"getStatus",
function(){
return this.status;
});
});
