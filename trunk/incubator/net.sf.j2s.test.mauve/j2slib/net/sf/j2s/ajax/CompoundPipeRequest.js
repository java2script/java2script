$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeRequest",["net.sf.j2s.ajax.CompoundPipeRunnable","$.SimpleRPCRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.weave=$_M(c$,"weave",
function(id,p){
var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipe.status==0||!pipe.isPipeLive()){
pipe.weave(p);
pipe.updateStatus(true);
if(pipe.status==0){
pipe.status=1;
pipe.pipeKey=null;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}}else{
if(!pipe.weave(p)&&p.isPipeLive()){
return;
}p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(p);
if(pipe.status<2){
pipe.status=2;
}}},"~S,net.sf.j2s.ajax.CompoundPipeSession");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=System.currentTimeMillis();
if(now-pipe.lastSetupRetried>300000){
pipe.setupFailedRetries=0;
}pipe.setupFailedRetries++;
if(pipe.setupFailedRetries<=3){
pipe.updateStatus(true);
pipe.lastSetupRetried=now;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}}
pipe.setupFailedRetries=0;
pipe.status=0;
pipe.lastSetupRetried=0;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(id,pipeURL,pipeMethod,rpcURL,rpcMethod){
var cfg=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipeURL!=null){
cfg.pipeURL=pipeURL;
}if(pipeMethod!=null){
cfg.pipeMethod=pipeMethod;
}if(rpcURL!=null){
cfg.rpcURL=rpcURL;
}if(rpcMethod!=null){
cfg.rpcMethod=rpcMethod;
}},"~S,~S,~S,~S,~S");
c$.retrievePipe=$_M(c$,"retrievePipe",
function(id,createNew){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
if(!createNew){
return null;
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.createPipe(id);
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"~S,~B");
c$.createPipe=$_M(c$,"createPipe",
($fz=function(id){
var pipe=(($_D("net.sf.j2s.ajax.CompoundPipeRequest$1")?0:net.sf.j2s.ajax.CompoundPipeRequest.$CompoundPipeRequest$1$()),$_N(net.sf.j2s.ajax.CompoundPipeRequest$1,this,null));
pipe.id=id;
return pipe;
},$fz.isPrivate=true,$fz),"~S");
c$.addPipe=$_M(c$,"addPipe",
($fz=function(pipe){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]==null){
allPipes[i]=pipe;
return;
}}
var newPipes=new Array(allPipes.length+100);
System.arraycopy(allPipes,0,newPipes,0,allPipes.length);
newPipes[allPipes.length]=pipe;
($t$=net.sf.j2s.ajax.CompoundPipeRequest.pipes=newPipes,net.sf.j2s.ajax.CompoundPipeRequest.prototype.pipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes,$t$);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.registerPipe=$_M(c$,"registerPipe",
function(pipe){
if(pipe==null)return null;
var id=pipe.id;
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.unregisterPipe=$_M(c$,"unregisterPipe",
function(id){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
var pipe=allPipes[i];
allPipes[i]=null;
return pipe;
}}
return null;
}},"~S");
c$.$CompoundPipeRequest$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeRequest$1",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRequest$1,"ajaxOut",[]);
if(!this.pipeAlive){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
return;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=this.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(this.pipes[i]);
if(this.status<2){
this.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
});
c$=$_P();
};
c$.pipes=c$.prototype.pipes=new Array(3);
});
