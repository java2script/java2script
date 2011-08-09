$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.SimpleRPCRequest",["java.net.URLEncoder","net.sf.j2s.ajax.HttpRequest","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRequest");
c$.getRequstMode=$_M(c$,"getRequstMode",
function(){
return net.sf.j2s.ajax.SimpleRPCRequest.runningMode;
});
c$.switchToAJAXMode=$_M(c$,"switchToAJAXMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.switchToLocalJavaThreadMode=$_M(c$,"switchToLocalJavaThreadMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=2,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.request=$_M(c$,"request",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.getClassNameURL=$_M(c$,"getClassNameURL",
function(runnable){
var oClass=runnable.getClass();
var name=oClass.getName();
while(name.indexOf('$')!=-1){
oClass=oClass.getSuperclass();
if(oClass==null){
return null;
}name=oClass.getName();
}
return name;
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.ajaxRequest=$_M(c$,"ajaxRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
if(url==null){
url="";
}var method=runnable.getHttpMethod();
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
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCRequest$2")?0:net.sf.j2s.ajax.SimpleRPCRequest.$SimpleRPCRequest$2$()),$_N(net.sf.j2s.ajax.SimpleRPCRequest$2,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.adjustRequestURL=$_M(c$,"adjustRequestURL",
function(method,url,serialize){
if("GET".equals(method.toUpperCase())){
try{
var query=java.net.URLEncoder.encode(serialize,"UTF-8");
if(url.indexOf('?')!=-1){
url+="&jzz="+query;
}else{
url+="?"+query;
}}catch(e){
if($_O(e,java.io.UnsupportedEncodingException)){
}else{
throw e;
}
}
}return url;
},"~S,~S,~S");
c$.isXSSMode=$_M(c$,"isXSSMode",
function(url){
if(url!=null&&(url.indexOf("http://")==0
||url.indexOf("https://")==0)){
var host=null;
var idx1=url.indexOf("//")+2;
var idx2=url.indexOf('/',9);
if(idx2!=-1){
host=url.substring(idx1,idx2);
}else{
host=url.substring(idx1);
}
var protocol=null;
var idx0=url.indexOf("://");
if(idx0!=-1){
protocol=url.substring(0,idx0+1);
}else{
protocol=window.location.protocol;
}
var port=null;
var idx3=host.indexOf(':');
if(idx3!=-1){
port=parseInt(host.substring(idx3+1));
host=host.substring(0,idx3);
}else{
if("http:"==protocol){
port=80;
}else if("https:"==protocol){
port=443;
}else{
port=window.location.port;
if(port!=""){
port=parseInt(port);
}
}
}
var loc=window.location;
var locPort=loc.port;
if(locPort==""){
if("http:"==loc.protocol){
locPort=80;
}else if("https:"==loc.protocol){
locPort=443;
}
}else{
locPort=parseInt(locPort);
}
var locHost=null;
try{
locHost=loc.host;
}catch(e){
if(arguments.length==2){
return false;
}
return true;
}
var idx4=locHost.indexOf(":");
if(idx4!=-1){
locHost=locHost.substring(0,idx4);
}
if(arguments.length==2){
var idx5=host.indexOf("."+locHost);
return idx5!=-1&&idx5==host.length-locHost.length-1
&&locPort==port&&loc.protocol==protocol&&loc.protocol!="file:";
}
return(locHost!=host||locPort!=port
||loc.protocol!=protocol||loc.protocol=="file:");
}
return false;
},"~S");
c$.isSubdomain=$_M(c$,"isSubdomain",
function(url){
return window["j2s.disable.subdomain.xss"]!=true
&&net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url,true);
},"~S");
c$.checkXSS=$_M(c$,"checkXSS",
function(url,serialize,runnable){
{
if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
if(runnable.$fai13d$==true){
runnable.$fai13d$=false;
}
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet==null){
g.idSet=new Object();
}
var rnd=null;
while(true){
var rnd=Math.random()+"0000000.*";
rnd=rnd.substring(2,8);
if(g.idSet["o"+rnd]==null){
g.idSet["o"+rnd]=runnable;
break;
}
}
var limit=7168;
if(window["script.get.url.limit"]!=null){
limit=window["script.get.url.limit"];
}
var ua=navigator.userAgent.toLowerCase();
if(ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
limit=2048-44;
}
limit-=url.length+36;
var contents=[];
var content=encodeURIComponent(serialize);
if(content.length>limit){
parts=Math.ceil(content.length/limit);
var lastEnd=0;
for(var i=0;i<parts;i++){
var end=(i+1)*limit;
if(end>content.length){
end=content.length;
}else{
for(var j=0;j<3;j++){
var ch=content.charAt(end-j);
if(ch=='%'){
end-=j;
break;
}
}
}
contents[i]=content.substring(lastEnd,end);
lastEnd=end;
}
}else{
contents[0]=content;
}
if(contents.length>1){
g.idSet["x"+rnd]=contents;
}


net.sf.j2s.ajax.SimpleRPCRequest.callByScript(rnd,contents.length,0,contents[0]);
contents[0]=null;
return true;
}
}return false;
},"~S,~S,net.sf.j2s.ajax.SimpleRPCRunnable");
c$.cleanUp=$_M(c$,"cleanUp",
function(scriptObj){
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
if(isIE){
if(scriptObj.onreadystatechange==null){
return false;
}
var done=false;
var state=""+scriptObj.readyState;
if(state=="loaded"||state=="complete"){
scriptObj.onreadystatechange=null;
done=true;
}
return done;
}else{
if(scriptObj.onerror==null){
return false;
}
scriptObj.onerror=null;
scriptObj.onload=null;
return true;
}
},"~O");
c$.generateCallback4Script=$_M(c$,"generateCallback4Script",
function(script,rnd,error){
return function(){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(!g.cleanUp(script)){
return;
}
if(error){
var src=script.src;
var idx=src.indexOf("jzn=");
var rid=src.substring(idx+4,src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
}
if(script.onerror!=null){
script.onerror=script.onload=null;
}else{
script.onreadystatechange=null;
}
document.getElementsByTagName("HEAD")[0].removeChild(script);
script=null;
};
},"~O,~S,~B");
c$.callByScript=$_M(c$,"callByScript",
function(rnd,length,i,content){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var runnable=g.idSet["o"+rnd];
if(runnable==null)return;
var url=runnable.getHttpURL();
var session=g.idSet["s"+rnd];
if(session!=null&&window["script.get.session.url"]!=false){
url+=";jsessionid="+session;
}
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url+"?jzn="+rnd
+(length==1?"":("&jzp="+length+(i==0?"":"&jzc="+(i+1))))
+"&jzz="+content;
var okFun=g.generateCallback4Script(script,rnd,false);
var errFun=g.generateCallback4Script(script,rnd,true);
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
script.defer=true;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onerror=errFun;
script.onload=okFun;
}else{
script.onreadystatechange=okFun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
var timeout=30000;
if(window["j2s.ajax.reqeust.timeout"]!=null){
timeout=window["j2s.ajax.reqeust.timeout"];
}
if(timeout<1000){
timeout=1000;
}
g.idSet["h"+rnd]=window.setTimeout(errFun,timeout);
},"~S,~S,~S,~S");
c$.ieScriptCleanup=$_M(c$,"ieScriptCleanup",
function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
});
c$.xssNotify=$_M(c$,"xssNotify",
function(nameID,response,session){
{
var ua=navigator.userAgent.toLowerCase();
if(response!=null&&ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1
&&s.readyState=="interactive"){
s.onreadystatechange=net.sf.j2s.ajax.SimpleRPCRequest.ieScriptCleanup;
}
}
}
var hKey="h"+nameID;
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet[hKey]!=null){
window.clearTimeout(g.idSet[hKey]);
delete g.idSet[hKey];
}
}if(response==="continue"){
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(session!=null){
g.idSet["s"+nameID]=session;
}
var k="x"+nameID;
var xcontent=g.idSet[k];
if(xcontent!=null){

for(var i=0;i<xcontent.length;i++){
if(xcontent[i]!=null){
g.callByScript(nameID,xcontent.length,i,xcontent[i]);
xcontent[i]=null;
break;
}
}
var more=false;
for(var i=xcontent.length-1;i>=0;i--){
if(xcontent[i]!=null){
more=true;
break;
}
}
if(!more){
g.idSet[k]=null;
delete g.idSet[k];
}
}
}return;
}var runnable=null;
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var oK="o"+nameID;
runnable=g.idSet[oK];
g.idSet[oK]=null;
delete g.idSet[oK];
var sK="s"+nameID;
if(g.idSet[sK]!=null){
g.idSet[sK]=null;
delete g.idSet[sK];
}
if(response==null&&runnable!=null){
runnable.$fai13d$=true;
runnable.ajaxFail();
return;
}
}if(response==="unsupported"||response==="exceedrequestlimit"||response==="error"){
var src=null;
{
var existed=false;
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1){
src=s.src;
existed=true;
s.onreadystatechange=null;
s.onerror=null;
s.onload=null;
document.getElementsByTagName("HEAD")[0].removeChild(s);
}
}
if(!existed&&runnable==null){
return;
}
}if(runnable!=null){
runnable.ajaxFail();
}else{
if(response==="error"){
System.err.println("[Java2Script] Sever error: URL \""+src+"\" is semantically incorrect!");
}else if(response==="unsupported"){
System.err.println("[Java2Script] Sever error: Cross site script is not supported!");
}else{
System.err.println("[Java2Script] Sever error: Exceed cross site script request limit!");
}}return;
}if(runnable!=null){
{
if(runnable.$fai13d$==true){
return;
}
}runnable.deserialize(response);
runnable.ajaxOut();
}},"~S,~S,~S");
c$.$SimpleRPCRequest$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCRequest$2",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
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
$_S(c$,
"MODE_AJAX",1,
"MODE_LOCAL_JAVA_THREAD",2,
"runningMode",2);
{
var ajax=false;
{
ajax=true;
}if(ajax){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
}}});
