$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRunnable"],"net.sf.j2s.ajax.SimplePipeRunnable",["net.sf.j2s.ajax.SimplePipeHelper","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipeKey=null;
this.pipeAlive=false;
this.destroyed=false;
this.queryFailedRetries=0;
this.queryEnded=false;
this.lastPipeDataReceived=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimplePipeRunnable",net.sf.j2s.ajax.SimpleRPCRunnable);
$_M(c$,"getPipeURL",
function(){
return"simplepipe";
});
$_M(c$,"getPipeMethod",
function(){
return"GET";
});
$_V(c$,"ajaxIn",
function(){
this.pipeInit();
});
$_V(c$,"ajaxFail",
function(){
this.pipeFailed();
});
$_V(c$,"ajaxOut",
function(){
if(this.pipeAlive){
this.pipeCreated();
}else{
this.pipeFailed();
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
if(this.pipeKey!=null){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(this.pipeKey);
this.pipeKey=null;
}return true;
});
$_M(c$,"pipeInit",
function(){
this.queryFailedRetries=0;
this.lastPipeDataReceived=-1;
});
$_M(c$,"pipeCreated",
function(){
this.destroyed=false;
});
$_M(c$,"pipeFailed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeLost",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeClosed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeReset",
function(){
this.destroyed=false;
});
$_M(c$,"isPipeLive",
function(){
return this.pipeAlive&&!this.destroyed&&this.pipeKey!=null;
});
$_M(c$,"keepPipeLive",
function(){
});
$_M(c$,"updateStatus",
function(live){
if(live){
this.keepPipeLive();
this.pipeAlive=true;
}else if(this.isPipeLive()){
this.pipeDestroy();
this.pipeAlive=false;
}},"~B");
$_M(c$,"deal",
function(ss){
try{
var clazz=ss.getClass();
if("net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())){
return true;
}var method=null;
var clzz=this.getClass();
var clazzName=clzz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charAt(idx+1);
if((ch).charCodeAt(0)<('0').charCodeAt (0) || (ch).charCodeAt (0) > ('9').charCodeAt(0)){
break;
}}clzz=clzz.getSuperclass();
if(clzz==null){
break;
}clazzName=clzz.getName();
}
if(clzz!=null){
method=clzz.getMethod("deal",[clazz]);
if(method!=null){
var returnType=method.getReturnType();
if(returnType===Boolean){
var result=method.invoke(this,[ss]);
return(result).booleanValue();
}}}}catch(e){
if($_O(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_s(c$,"pipeKey","s","pipeAlive","b");
});
