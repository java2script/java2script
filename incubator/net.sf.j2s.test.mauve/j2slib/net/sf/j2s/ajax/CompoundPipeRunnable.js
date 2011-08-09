$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeRunnable",["net.sf.j2s.ajax.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipes=null;
this.status=0;
this.id=null;
this.pipeMethod=null;
this.rpcMethod=null;
this.pipeURL=null;
this.rpcURL=null;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.lastSetup=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeRunnable",net.sf.j2s.ajax.SimplePipeRunnable);
c$.nextSessionKey=$_M(c$,"nextSessionKey",
($fz=function(){
var hexStr="0123456789abcdef";
var key="";
for(var i=0;i<4;i++){
var hex=Math.round(15*Math.random());
key+=""+hexStr.charAt(hex);
}
return key;
},$fz.isPrivate=true,$fz));
$_K(c$,
function(){
$_R(this,net.sf.j2s.ajax.CompoundPipeRunnable,[]);
this.pipes=new Array(4);
this.status=0;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.pipeMethod="GET";
this.rpcMethod="POST";
this.pipeURL="simplepipe";
this.rpcURL="piperpc";
this.lastSetup=System.currentTimeMillis();
});
$_M(c$,"getSession",
function(session){
if(session==null){
return null;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&session.equals(this.pipes[i].session)){
return this.pipes[i];
}}
return null;
},"~S");
$_M(c$,"pipeDestroy",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeDestroy();
}}
this.status=0;
return $_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeDestroy",[]);
});
$_M(c$,"pipeInit",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeInit",[]);
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeInit();
}}
});
$_M(c$,"isPipeLive",
function(){
if(this.pipeAlive&&this.status<3){
return true;
}if(this.status==3&&System.currentTimeMillis()-this.lastSetup<=3*net.sf.j2s.ajax.SimplePipeRequest.pipeLiveNotifyInterval){
return true;
}if($_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"isPipeLive",[])){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
return true;
}}
}return false;
});
$_M(c$,"pipeClosed",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
if(this.pipes[i].closer!=null){
this.pipes[i].closer.helpClosing(this.pipes[i]);
}else{
this.pipes[i].pipeClosed();
}this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeClosed",[]);
});
$_M(c$,"pipeLost",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeLost();
this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeLost",[]);
});
$_M(c$,"keepPipeLive",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
this.pipes[i].keepPipeLive();
}}
});
$_M(c$,"updateStatus",
function(live){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].updateStatus(live);
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"updateStatus",[live]);
},"~B");
$_M(c$,"weave",
function(pipe){
pipe.pipeReset();
{
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]){
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return false;
}}
for(var i=0;i<this.pipes.length;i++){
if(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session)){
if(this.pipes[i].isPipeLive()){
System.out.println("pipe session "+this.pipes[i].session+" is still live!!");
}this.pipes[i]=pipe;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
return true;
}}
var added=false;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]==null){
this.pipes[i]=pipe;
added=true;
break;
}}
if(!added){
var newPipes=new Array(this.pipes.length+4);
System.arraycopy(this.pipes,0,newPipes,0,this.pipes.length);
newPipes[this.pipes.length]=pipe;
this.lastSetup=System.currentTimeMillis();
}}pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return true;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"initPipeSession",
($fz=function(pipe){
while(pipe.session==null){
var key=net.sf.j2s.ajax.CompoundPipeRunnable.nextSessionKey();
var isKeyOK=true;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&key.equals(this.pipes[i].session)){
isKeyOK=false;
break;
}}
if(isKeyOK){
pipe.session=key;
break;
}}
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"unweave",
function(pipe){
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]||(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session))){
this.pipes[i]=null;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=null;
return true;
}}
return false;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"getActivePipeSessionCount",
function(){
var count=0;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
count++;
}}
return count;
});
$_M(c$,"isEmpty",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
return false;
}}
return true;
});
$_V(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
var clazz=cs.getClass();
if("net.sf.j2s.ajax.CompoundSerializable".equals(clazz.getName())){
return true;
}for(var i=0;i<this.pipes.length;i++){
var p=this.pipes[i];
if(p!=null&&p.session!=null&&p.session.equals(cs.session)&&p.deal(cs)){
return true;
}}
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_V(c$,"getHttpURL",
function(){
return this.rpcURL;
});
$_V(c$,"getHttpMethod",
function(){
return this.rpcMethod;
});
$_V(c$,"getPipeURL",
function(){
return this.pipeURL;
});
$_V(c$,"getPipeMethod",
function(){
return this.pipeMethod;
});
});
