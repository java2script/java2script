$_J("net.sf.j2s.ajax");
$_L(["java.util.Collections","$.HashMap"],"net.sf.j2s.ajax.PipeManager",["net.sf.j2s.ajax.SimplePipeHelper"],function(){
c$=$_T(net.sf.j2s.ajax,"PipeManager");
c$.registerPipeObject=$_M(c$,"registerPipeObject",
function(pipe){
var key=net.sf.j2s.ajax.SimplePipeHelper.nextPipeKey();
while(net.sf.j2s.ajax.PipeManager.pipes.get(key)!=null){
key=net.sf.j2s.ajax.SimplePipeHelper.nextPipeKey();
;}
net.sf.j2s.ajax.PipeManager.pipes.put(key,pipe);
return key;
},"net.sf.j2s.ajax.PipeObject");
c$.registerPipeObject=$_M(c$,"registerPipeObject",
function(key,pipe){
net.sf.j2s.ajax.PipeManager.pipes.put(key,pipe);
},"~S,net.sf.j2s.ajax.PipeObject");
c$.unregisterPipeObject=$_M(c$,"unregisterPipeObject",
function(key){
return net.sf.j2s.ajax.PipeManager.pipes.remove(key);
},"~S");
c$.getPipe=$_M(c$,"getPipe",
function(key){
var pipeObject=net.sf.j2s.ajax.PipeManager.pipes.get(key);
if(pipeObject==null){
return null;
}return pipeObject.getPipe();
},"~S");
c$.getPipeObject=$_M(c$,"getPipeObject",
function(key){
return net.sf.j2s.ajax.PipeManager.pipes.get(key);
},"~S");
c$.pipes=c$.prototype.pipes=java.util.Collections.synchronizedMap(new java.util.HashMap());
});
