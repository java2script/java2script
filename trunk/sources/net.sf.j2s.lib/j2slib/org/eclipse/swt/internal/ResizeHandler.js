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
this.shell.setLocation(-1,d$.body.clientHeight-26);
});
$_M(c$,"updateMaximized",
function(){
var height=d$.body.clientHeight-0;
if(height>w$.screen.availHeight-10){
height=w$.screen.availHeight-10;
}var width=d$.body.clientWidth;
if(width>w$.screen.availWidth){
width=w$.screen.availWidth;
}this.shell.setBounds(this.shell.computeTrim(0,0,width+2,height-18));
d$.body.scrollTop=0;
});
$_M(c$,"updateCentered",
function(){
var size=this.shell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
});
$_M(c$,"getStatus",
function(){
return this.status;
});
