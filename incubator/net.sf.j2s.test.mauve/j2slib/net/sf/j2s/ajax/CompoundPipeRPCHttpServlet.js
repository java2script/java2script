$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRPCHttpServlet"],"net.sf.j2s.ajax.CompoundPipeRPCHttpServlet",["net.sf.j2s.ajax.SimplePipeHelper"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeRPCHttpServlet",net.sf.j2s.ajax.SimplePipeRPCHttpServlet);
$_M(c$,"getRunnableByRequest",
function(request){
var runnable=$_U(this,net.sf.j2s.ajax.CompoundPipeRPCHttpServlet,"getRunnableByRequest",[request]);
if($_O(runnable,net.sf.j2s.ajax.CompoundPipeSession)){
var session=runnable;
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(session.pipeKey);
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var p=pipe;
p.weave(session);
}}return runnable;
},"~S");
$_V(c$,"validateRunnable",
function(clazzName){
if("net.sf.j2s.ajax.CompoundPipeRunnable".equals(clazzName)){
return true;
}return this.runnables.contains(clazzName);
},"~S");
});
