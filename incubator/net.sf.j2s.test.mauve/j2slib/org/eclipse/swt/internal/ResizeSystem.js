$_L(null,"$wt.internal.ResizeSystem",["$wt.internal.ResizeHandler","$wt.widgets.Display"],function(){
c$=$_T($wt.internal,"ResizeSystem");
c$.register=$_M(c$,"register",
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell===shell&&$wt.internal.ResizeSystem.handlers[i].status==status){
return;
}}
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]==null){
$wt.internal.ResizeSystem.handlers[i]=new $wt.internal.ResizeHandler(shell,status);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(shell,status);
return;
},"$wt.widgets.Decorations,~N");
c$.unregister=$_M(c$,"unregister",
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell===shell&&$wt.internal.ResizeSystem.handlers[i].status==status){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Decorations,~N");
c$.register=$_M(c$,"register",
function(monitor){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].monitor===monitor){
return;
}}
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]==null){
$wt.internal.ResizeSystem.handlers[i]=new $wt.internal.ResizeHandler(monitor);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(monitor);
return;
},"$wt.widgets.Monitor");
c$.unregister=$_M(c$,"unregister",
function(monitor){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].monitor===monitor){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Monitor");
c$.reset=$_M(c$,"reset",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null){
$wt.internal.ResizeSystem.handlers[i].shell=null;
$wt.internal.ResizeSystem.handlers[i].monitor=null;
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
($t$=$wt.internal.ResizeSystem.handlers=new Array(0),$wt.internal.ResizeSystem.prototype.handlers=$wt.internal.ResizeSystem.handlers,$t$);
});
c$.updateResize=$_M(c$,"updateResize",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
var hdl=$wt.internal.ResizeSystem.handlers[i];
if(hdl!=null&&hdl.shell!=null&&hdl.shell.handle!=null){
hdl.shell._updateMonitorSize();
var status=hdl.getStatus();
if(status==1024){
hdl.updateMaximized();
}else if(status==128){
hdl.updateMinimized();
}else if(status==16777216){
hdl.updateCentered();
}}else if(hdl!=null&&hdl.monitor!=null){
hdl.updateMonitor();
}}
$wt.widgets.Display.updateMonitor();
});
c$.handlers=c$.prototype.handlers=new Array(0);

var $browserResizingHandle=null;
$browserLayoutResize=function(){
if($browserResizingHandle!=null){
window.clearTimeout($browserResizingHandle);
}
$browserResizingHandle=window.setTimeout(function(){
org.eclipse.swt.internal.ResizeSystem.updateResize();
},50);
};
if(document.addEventListener){
window.addEventListener('resize',$browserLayoutResize,true);
}else if(document.attachEvent){
window.attachEvent('onresize',$browserLayoutResize);
}
});
