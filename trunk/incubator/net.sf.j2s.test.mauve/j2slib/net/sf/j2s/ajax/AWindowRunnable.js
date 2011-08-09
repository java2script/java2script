$_J("net.sf.j2s.ajax");
c$=$_C(function(){
this.win=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AWindowRunnable",null,Runnable);
$_M(c$,"setWindow",
function(win){
this.win=win;
},"org.eclipse.jface.window.Window");
$_M(c$,"getWindow",
function(){
return this.win;
});
$_M(c$,"getReturnCode",
function(){
return this.win.getReturnCode();
});
