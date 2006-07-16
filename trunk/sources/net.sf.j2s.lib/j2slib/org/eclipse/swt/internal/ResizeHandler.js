c$=$_C(function(){
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
this.shell.setLocation(-1,this.shell.getMonitor().getClientArea().height-26);
});
$_M(c$,"updateMaximized",
function(){
var monitor=this.shell.getMonitor();
var clientArea=monitor.getClientArea();
var bounds=monitor.getBounds();
var height=clientArea.height-0;
if(height>bounds.height-10){
height=bounds.height-10;
}var width=clientArea.width;
if(width>bounds.width){
width=bounds.width;
}this.shell.setBounds(this.shell.computeTrim(0,0,width+2,height-18));
});
$_M(c$,"updateCentered",
function(){
var monitor=this.shell.getMonitor();
var size=this.shell.getSize();
var y=Math.floor((monitor.getClientArea().height-size.y)/2)-20;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((monitor.getClientArea().width-size.x)/2),y);
});
$_M(c$,"getStatus",
function(){
return this.status;
});
