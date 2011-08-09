$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCHttpServlet"],"net.sf.j2s.ajax.SimplePipeRPCHttpServlet",["net.sf.j2s.ajax.SimplePipeHelper","net.sf.j2s.ajax.SimplePipeHelper.IPipeThrough"],function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeRPCHttpServlet",net.sf.j2s.ajax.SimpleRPCHttpServlet);
$_M(c$,"getRunnableByRequest",
function(request){
var runnable=$_U(this,net.sf.j2s.ajax.SimplePipeRPCHttpServlet,"getRunnableByRequest",[request]);
if($_O(runnable,net.sf.j2s.ajax.SimplePipeRunnable)){
var pipeRunnable=runnable;
pipeRunnable.setPipeHelper((($_D("net.sf.j2s.ajax.SimplePipeRPCHttpServlet$1")?0:net.sf.j2s.ajax.SimplePipeRPCHttpServlet.$SimplePipeRPCHttpServlet$1$()),$_N(net.sf.j2s.ajax.SimplePipeRPCHttpServlet$1,this,null)));
pipeRunnable.pipeManaged=this.managingPipe;
}return runnable;
},"~S");
c$.$SimplePipeRPCHttpServlet$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRPCHttpServlet$1",null,net.sf.j2s.ajax.SimplePipeHelper.IPipeThrough);
$_V(c$,"helpThrough",
function(pipe,objs){
net.sf.j2s.ajax.SimplePipeHelper.pipeIn(pipe.pipeKey,objs);
},"net.sf.j2s.ajax.SimplePipeRunnable,~A");
c$=$_P();
};
});
