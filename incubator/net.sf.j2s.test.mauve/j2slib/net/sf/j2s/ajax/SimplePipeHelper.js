$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimplePipeHelper");
c$.registerPipe=$_M(c$,"registerPipe",
function(key,pipe){
if(key==null||pipe==null)return;
if(net.sf.j2s.ajax.SimplePipeHelper.pipes==null){
net.sf.j2s.ajax.SimplePipeHelper.pipes=new Object();
}
net.sf.j2s.ajax.SimplePipeHelper.pipes[key]=pipe;
},"~S,net.sf.j2s.ajax.SimplePipeRunnable");
c$.removePipe=$_M(c$,"removePipe",
function(key){
delete net.sf.j2s.ajax.SimplePipeHelper.pipes[key];
},"~S");
c$.getPipe=$_M(c$,"getPipe",
function(key){
var ps=net.sf.j2s.ajax.SimplePipeHelper.pipes;
if(ps==null||key==null)return null;
return ps[key];
},"~S");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeThrough");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeClosing");
$_S(c$,
"pipes",null);
