$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SWTHelper");
c$.syncExec=$_M(c$,"syncExec",
function(disp,runnable){
if(disp==null||disp.isDisposed()){
runnable.run();
}else{
try{
disp.syncExec(runnable);
}catch(e){
if($_O(e,NullPointerException)){
runnable.run();
}else{
throw e;
}
}
}},"$wt.widgets.Display,Runnable");
