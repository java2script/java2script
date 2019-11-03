$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.CompoundSerializable","$.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeSession",["net.sf.j2s.ajax.SimplePipeHelper","$.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.session=null;
this.parent=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeSession",net.sf.j2s.ajax.SimplePipeRunnable);
$_M(c$,"isPipeLive",
function(){
return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"isPipeLive",[])&&this.session!=null;
});
$_M(c$,"pipeCreated",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSession,"pipeCreated",[]);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}this.updateStatus(true);
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
{
}var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}cp.unweave(this);
}this.session=null;
this.pipeKey=null;
return true;
});
$_M(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
if(cs.session==null||!cs.session.equals(this.session)){
return false;
}return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"deal",[cs]);
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_M(c$,"deal",
function(evt){
if(net.sf.j2s.ajax.SimplePipeRequest.getRequstMode()==2){
this.pipeClosed();
return true;
}this.updateStatus(false);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var p=pipe;
if(p.pipes!=null){
for(var i=0;i<p.pipes.length;i++){
var s=p.pipes[i];
if(s!=null&&s.session.equals(evt.session)){
p.pipes[i]=null;
break;
}}
}}if(pipe!=null&&!pipe.isPipeLive()){
var pipeKey=this.pipeKey;
pipe.pipeDestroy();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(pipeKey);
}this.pipeClosed();
return true;
},"net.sf.j2s.ajax.CompoundPipeSession.PipeSessionClosedEvent");
$_V(c$,"getHttpURL",
function(){
return this.parent.getHttpURL();
});
$_V(c$,"getHttpMethod",
function(){
return this.parent.getHttpMethod();
});
$_V(c$,"getPipeURL",
function(){
return this.parent.getPipeURL();
});
$_V(c$,"getPipeMethod",
function(){
return this.parent.getHttpMethod();
});
$_H();
c$=$_T(net.sf.j2s.ajax.CompoundPipeSession,"PipeSessionClosedEvent",net.sf.j2s.ajax.CompoundSerializable);
c$=$_P();
$_s(c$,"session","s");
});
