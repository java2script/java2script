$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimpleRPCSWTRequest",["net.sf.j2s.ajax.HttpRequest","$.XHRCallbackSWTAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCSWTRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.swtRequest=$_M(c$,"swtRequest",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.swtAJAXRequest=$_M(c$,"swtAJAXRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCSWTRequest$3")?0:net.sf.j2s.ajax.SimpleRPCSWTRequest.$SimpleRPCSWTRequest$3$()),$_N(net.sf.j2s.ajax.SimpleRPCSWTRequest$3,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.$SimpleRPCSWTRequest$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCSWTRequest$3",net.sf.j2s.ajax.XHRCallbackSWTAdapter);
$_V(c$,"swtOnLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
});
c$=$_P();
};
});
