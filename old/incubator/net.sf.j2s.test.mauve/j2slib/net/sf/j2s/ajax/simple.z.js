$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"IXHRCallback");
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SWTHelper");
c$.syncExec=$_M(c$,"syncExec",
function(disp,runnable){
if(disp==null||disp.isDisposed()){
runnable.run();
}else{
try{
disp.syncExec(runnable);
}catch(e){
if($_O(e,NullPointerException)){
runnable.run();
}else{
throw e;
}
}
}},"$wt.widgets.Display,Runnable");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_V(c$,"onLoaded",
function(){
});
$_V(c$,"onReceiving",
function(){
});
$_V(c$,"onSent",
function(){
});
$_V(c$,"onOpen",
function(){
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackSWTAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackSWTAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_M(c$,"swtOnLoaded",
function(){
});
$_M(c$,"swtOnReceiving",
function(){
});
$_M(c$,"swtOnSent",
function(){
});
$_M(c$,"swtOnOpen",
function(){
});
$_V(c$,"onLoaded",
function(){
this.swtOnLoaded();
});
$_V(c$,"onReceiving",
function(){
this.swtOnReceiving();
});
$_V(c$,"onSent",
function(){
this.swtOnSent();
});
$_V(c$,"onOpen",
function(){
this.swtOnOpen();
});
});
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimpleSerializable",null,Cloneable);
$_M(c$,"serialize",
function(){
var baseChar='B'.charCodeAt(0);
var buffer=[];
buffer[0]="WLL101";
var oClass=this.getClass();
var clazz=oClass;
var clazzName=clazz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charCodeAt(idx+1);
if(ch<48||ch>=58){
break;
}
}
clazz=clazz.getSuperclass();
if(clazz==null){
break;
}
clazzName=clazz.getName();
}
buffer[1]=clazzName;
buffer[2]='#';
buffer[3]="00000000$"
var headSize=buffer.join('').length;
var fields=oClass.declared$Fields;
if(fields==null){
fields=[];
}
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
buffer[buffer.length]=String.fromCharCode(baseChar+name.length);
buffer[buffer.length]=name;
var type=field.type;
if(type=='F' || type == 'D' || type == 'I' || type == 'L'
||type=='S' || type == 'B' || type == 'b'){
buffer[buffer.length]=type;
var value=""+this[name];
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='C'){
buffer[buffer.length]=type;
var value="";
if(typeof this[name]=='number'){
value+=this[name];
}else{
value+=this[name].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='s'){
this.serializeString(buffer,this[name]);
}else if(type.charAt(0)=='A'){
buffer[buffer.length]=type;
if(this[name]==null){
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
var l4=this[name].length;
if(l4>52){
if(l4>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
var t=type.charAt(1);
var arr=this[name];
for(var j=0;j<arr.length;j++){
if(t=='F' || t == 'D' || t == 'I' || t == 'L'
||t=='S' || t == 'B' || t == 'b'){
var value=""+arr[j];
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='C'){
var value="";
if(typeof arr[j]=='number'){
value+=arr[j];
}else{
value+=arr[j].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='X'){
this.serializeString(buffer,arr[j]);
}
}
}
}
}
var strBuf=buffer.join('');
var size=strBuf.length;
if(size>0x1000000){
throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr=""+(size-headSize);
strBuf=strBuf.substring(0,headSize-sizeStr.length-1)+sizeStr+strBuf.substring(headSize-1);
return strBuf;
});
$_M(c$,"serializeString",
($fz=function(buffer,s){
var baseChar='B'.charCodeAt(0);
if(s==null){
buffer[buffer.length]='s';
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
var normal=/^[\r\n\t\u0020-\u007e]*$/.test(s);
if(normal){
buffer[buffer.length]='s';
}else{
buffer[buffer.length]='u';
s=Encoding.encodeBase64(Encoding.convert2UTF8(s));
}
var l4=s.length;
if(l4>52){
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
buffer[buffer.length]=s;
}
},$fz.isPrivate=true,$fz),"StringBuffer,~S");
$_M(c$,"deserialize",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
var baseChar='B'.charCodeAt(0);
if(str==null||start<0)return false;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return false;
var index=str.indexOf('#',start);
if(index==-1)return false;
index++;
if(index>=length+start)return false;
var size=0;
var nextCharCode=str.charCodeAt(index);
if(nextCharCode>=48&&nextCharCode<=57){
var last=index;
index=str.indexOf('$',last);
if(index==-1)return false;
var sizeStr=str.substring(last+1,index);
sizeStr=sizeStr.replace(/^0+/,'');
if(sizeStr.length!=0){
try{
size=parseInt(sizeStr);
}catch(e){}
}
index++;
if(size==0||size>length+start-index)return false;
}
var fieldMap=[];
var fields=this.getClass().declared$Fields;
if(fields==null)return false;
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
fieldMap[name]=true;
}
var end=index+size;
while(index<start+length&&index<end){
var c1=str.charCodeAt(index++);
var l1=c1-baseChar;
if(l1<0)return true;
var fieldName=str.substring(index,index+l1);
index+=l1;
var c2=str.charAt(index++);
if(c2=='A'){
var field=fieldMap[fieldName];
c2=str.charAt(index++);
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
if(l2<0&&l2!=-2){
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=null;
}else{
if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
l2=parseInt(str.substring(index,index+l3));
if(l2>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
index+=l3;
}
var arr=new Array(l2);
var type=c2;
for(var i=0;i<l2;i++){
var s=null;
var c4=str.charCodeAt(index++);
if(c2!='X'){
var l3=c4-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}
}else{
var c5=str.charCodeAt(index++);
var l3=c5-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}else if(l3==-2){
var c6=str.charCodeAt(index++);
var l4=c6-baseChar;
if(l4<0)return true;
var l5=parseInt(str.substring(index,index+l4));
if(l5<0)return true;
index+=l4;
s=str.substring(index,index+l5);
index+=l5;
}
if(c4==117){
s=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(c4==85){
s=Encoding.readUTF8(s);
}
}
if(type=='F' || type == 'D'){
arr[i]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
arr[i]=parseInt(s);
}else if(type=='C'){
arr[i]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
arr[i]=(s=="true");
}else if(type=='X'){
arr[i]=s;
}
}
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=arr;
}
}else{
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
var s=null;
if(l2>0){
s=str.substring(index,index+l2);
index+=l2;
}else if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
var l4=parseInt(str.substring(index,index+l3));
if(l4<0)return true;
index+=l3;
s=str.substring(index,index+l4);
index+=l4;
}
if(!fieldMap[fieldName]){
continue;
}
var type=c2;
if(type=='F' || type == 'D'){
this[fieldName]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
this[fieldName]=parseInt(s);
}else if(type=='C'){
this[fieldName]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
this[fieldName]=(s=="true");
}else if(type=='s'){
this[fieldName]=s;
}else if(type=='u'){
this[fieldName]=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(type=='U'){
this[fieldName]=Encoding.readUTF8(s);
}
}
}
return true;
},"~S");
c$.parseInstance=$_M(c$,"parseInstance",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
if(str==null||start<0)return null;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return null;
var index=str.indexOf('#',start);
if(index==-1)return null;
var clazzName=str.substring(start+6,index);
clazzName=clazzName.replace(/\$/g,'.');
var runnableClass=null;
if($_D(clazzName)){
runnableClass=Clazz.evalType(clazzName);
}
if(runnableClass!=null){
var obj=new runnableClass($_G);
if(obj!=null&&$_O(obj,
net.sf.j2s.ajax.SimpleSerializable)){
return obj;
}
}
return null;
},"~S");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.SimpleRPCRunnable",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRunnable",net.sf.j2s.ajax.SimpleSerializable);
$_M(c$,"getHttpURL",
function(){
return"simplerpc";
});
$_M(c$,"getHttpMethod",
function(){
return"POST";
});
$_M(c$,"ajaxIn",
function(){
});
$_M(c$,"ajaxOut",
function(){
});
$_M(c$,"ajaxFail",
function(){
});
});
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
request.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimpleRPCRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCRequest$1",net.sf.j2s.ajax.XHRCallbackAdapter);
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
}
return $_N(net.sf.j2s.ajax.SimpleRPCRequest$1,i$,v$);
})(this,$_F("request",request,"runnable",runnable)));
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
var locHost=loc.host;
var idx4=locHost.indexOf(":");
if(idx4!=-1){
locHost=locHost.substring(0,idx4);
}
return(locHost!=host||locPort!=port
||loc.protocol!=protocol||loc.protocol=="file:");
}
return false;
},"~S");
c$.checkXSS=$_M(c$,"checkXSS",
function(url,serialize,runnable){
{
if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
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
limit=2048;
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
g.idSet["x"+rnd]=contents;


net.sf.j2s.ajax.SimpleRPCRequest.callByScript(rnd,contents.length,0,contents[0]);
contents[0]=null;
return true;
}
}return false;
},"~S,~S,net.sf.j2s.ajax.SimpleRPCRunnable");
c$.callByScript=$_M(c$,"callByScript",
function(rnd,length,i,content){
{
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
script.src=url+"?jzn="+rnd+"&jzp="+length
+"&jzc="+(i+1)+"&jzz="+content;
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onerror=function(){
this.onerror=null;
var idx=this.src.indexOf("jzn=");
var rid=this.src.substring(idx+4,this.src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
document.getElementsByTagName("HEAD")[0].removeChild(this);
};
script.onload=function(){
this.onload=null;
if(navigator.userAgent.indexOf("Opera")>=0){
var idx=this.src.indexOf("jzn=");
var rid=this.src.substring(idx+4,this.src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
}
document.getElementsByTagName("HEAD")[0].removeChild(this);
};
}else{
script.defer=true;
script.onreadystatechange=function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
var idx=this.src.indexOf("jzn=");
var rid=this.src.substring(idx+4,this.src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
};
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
}},"~S,~S,~S,~S");
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
s.onreadystatechange=function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
};
}
}
}
}if(response==="continue"){
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(session!=null){
g.idSet["s"+nameID]=session;
}
var xcontent=g.idSet["x"+nameID];
if(xcontent!=null){

if(xcontent!=null){
for(var i=0;i<xcontent.length;i++){
if(xcontent[i]!=null){
g.callByScript(nameID,xcontent.length,i,xcontent[i]);
xcontent[i]=null;
}
}
g.idSet["x"+nameID]=null;
}
}
}return;
}var runnable=null;
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
runnable=g.idSet["o"+nameID];
g.idSet["o"+nameID]=null;
if(g.idSet["s"+nameID]!=null){
g.idSet["s"+nameID]=null;
}
if(response==null&&runnable!=null){
runnable.ajaxFail();
return;
}
}if(response==="unsupported"||response==="exceedrequestlimit"){
{
var existed=false;
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1){
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
if(response==="unsupported"){
System.err.println("[Java2Script] Sever error: Cross site script is not supported!");
}else{
System.err.println("[Java2Script] Sever error: Exceed cross site script request limit!");
}}return;
}if(runnable!=null){
runnable.deserialize(response);
runnable.ajaxOut();
}},"~S,~S,~S");
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
request.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimpleRPCSWTRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCSWTRequest$1",net.sf.j2s.ajax.XHRCallbackSWTAdapter);
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
}
return $_N(net.sf.j2s.ajax.SimpleRPCSWTRequest$1,i$,v$);
})(this,$_F("request",request,"runnable",runnable)));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRunnable"],"net.sf.j2s.ajax.SimplePipeRunnable",null,function(){
c$=$_C(function(){
this.pipeKey=null;
this.pipeAlive=false;
this.helper=null;
this.closer=null;
this.destroyed=false;
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
}this.destroyed=true;
return true;
});
$_M(c$,"pipeInit",
function(){
});
$_M(c$,"pipeCreated",
function(){
this.destroyed=false;
});
$_M(c$,"pipeFailed",
function(){
});
$_M(c$,"pipeLost",
function(){
});
$_M(c$,"pipeClosed",
function(){
});
$_M(c$,"isPipeLive",
function(){
return this.pipeAlive;
});
$_M(c$,"keepPipeLive",
function(){
});
$_M(c$,"pipeWaitClosingInterval",
function(){
return 5000;
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
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimplePipeHelper");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeThrough");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeClosing");
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
$_S(c$,
"pipeMap",null,
"pipes",null);
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimplePipeRequest",["net.sf.j2s.ajax.HttpRequest","$.SimplePipeHelper","$.SimpleSerializable","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.getPipeMode=$_M(c$,"getPipeMode",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeMode;
});
c$.getQueryInterval=$_M(c$,"getQueryInterval",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval;
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=1000,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(ms){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
if(ms<0){
ms=1000;
}($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=ms,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
},"~N");
c$.switchToContinuumMode=$_M(c$,"switchToContinuumMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=4,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
});
c$.constructRequest=$_M(c$,"constructRequest",
function(pipeKey,pipeRequestType,rand){
($t$=net.sf.j2s.ajax.SimplePipeRequest.reqCount++,net.sf.j2s.ajax.SimplePipeRequest.prototype.reqCount=net.sf.j2s.ajax.SimplePipeRequest.reqCount,$t$);
return"k"+"="+pipeKey+"&"+"t"+"="+pipeRequestType+(rand?"&"+"r"+"="+net.sf.j2s.ajax.SimplePipeRequest.reqCount:"");
},"~S,~S,~B");
c$.sendRequest=$_M(c$,"sendRequest",
function(request,method,url,data,async){
if("GET".equals(method.toUpperCase())){
request.open(method,url+(url.indexOf('?')!=-1?"&":"?")+data,async);
request.send(null);
}else{
request.open(method,url,async);
request.send(data);
}},"net.sf.j2s.ajax.HttpRequest,~S,~S,~S,~B");
c$.pipe=$_M(c$,"pipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeRequest=$_M(c$,"pipeRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}var ajaxOut=null;
{
ajaxOut=runnable.ajaxOut;
runnable.ajaxOut=(function(aO,r){
return function(){
aO.apply(r,[]);
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(r);
};
})(ajaxOut,runnable);
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}{
runnable.ajaxOut=ajaxOut;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimplePipeRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$1",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(this.f$.runnable);
});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.SimplePipeRequest$1,i$,v$);
})(this,$_F("request",request,"runnable",runnable)));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimplePipeRunnable");
c$.loadPipeScript=$_M(c$,"loadPipeScript",
function(url){
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url;
var iframeID=arguments[1];
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onerror=function(){
this.onerror=null;
if(iframeID!=null){
if(window.parent==null||window.parent["net"]==null)return;
window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=window.parent.document.getElementById(iframeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
return;
}
if(window==null||window["net"]==null)return;
net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
};
script.onload=function(){
this.onload=null;
if(iframeID!=null){
if(window.parent==null||window.parent["net"]==null)return;
window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=window.parent.document.getElementById(iframeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
return;
}
if(window==null||window["net"]==null)return;
net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
};
}else{
script.defer=true;
script.onreadystatechange=function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
if(iframeID!=null){
if(window.parent==null||window.parent["net"]==null)return;
window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=window.parent.document.getElementById(iframeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
return;
}
if(window==null||window["net"]==null)return;
net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
};
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
},"~S");
c$.loadPipeIFrameScript=$_M(c$,"loadPipeIFrameScript",
function(url){
var iframe=document.createElement("IFRAME");
iframe.style.display="none";
var iframeID=null;
do{
iframeID="pipe-script-"+Math.round(10000000*Math.random());
}while(document.getElementById(iframeID)!=null);
iframe.id=iframeID;
document.body.appendChild(iframe);
var html="<html><head><title></title>";
html+="<script type=\"text/javascript\">\r\n";
html+="window[\"$p1p3p$\"] = function (string) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.parseReceived (string);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="window[\"$p1p3b$\"] = function (key, result) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack (key, result);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="</scr"+"ipt></head><body><script type=\"text/javascript\">\r\n";
if(ClassLoader.isOpera)
html+="window.setTimeout (function () {\r\n";
html+="("+net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript+") (";
html+="\""+url.replace(/"/g,"\\\"")+"\", \""+iframeID+"\"";
html+=");\r\n";
if(ClassLoader.isOpera)
html+="}, "+(net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval>>2)+");\r\n";
html+="</scr"+"ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite(iframe,html);
},"~S");
c$.iframeDocumentWrite=$_M(c$,"iframeDocumentWrite",
($fz=function(handle,html){
var handle=arguments[0];
var html=arguments[1];
if(handle.contentWindow!=null){
handle.contentWindow.location="about:blank";
}else{
handle.src="about:blank";
}
try{
var doc=handle.contentWindow.document;
doc.open();
doc.write(html);
doc.close();

document.title=document.title;
}catch(e){
window.setTimeout((function(handle,html){
return function(){
var doc=handle.contentWindow.document;
doc.open();
doc.write(html);
doc.close();

document.title=document.title;
};
})(handle,html),25);
}
},$fz.isPrivate=true,$fz),"~O,~S");
c$.pipeScript=$_M(c$,"pipeScript",
function(runnable){
var url=runnable.getPipeURL();
var requestURL=url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"x",true);
if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
net.sf.j2s.ajax.SimplePipeRequest.loadPipeIFrameScript(requestURL);
return;
}net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(requestURL);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeNotify=$_M(c$,"pipeNotify",
function(runnable){
var url=runnable.getPipeURL();
net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"n",true));
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeNotifyCallBack=$_M(c$,"pipeNotifyCallBack",
function(key,result){
if("l".equals(result)){
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeLost();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}}},"~S,~S");
c$.pipeQuery=$_M(c$,"pipeQuery",
function(runnable){
var pipeRequest=new net.sf.j2s.ajax.HttpRequest();
var pipeKey=runnable.pipeKey;
var pipeMethod=runnable.getPipeMethod();
var pipeURL=runnable.getPipeURL();
pipeRequest.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimplePipeRequest$2")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$2",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
{
if(window==null||window["net"]==null)return;
}var responseText=this.f$.pipeRequest.getResponseText();
if(responseText!=null){
var retStr=net.sf.j2s.ajax.SimplePipeRequest.parseReceived(responseText);
if(retStr!=null&&retStr.length>0){
var destroyedKey="d";
if(retStr.indexOf(destroyedKey)==0){
var beginIndex=destroyedKey.length+1;
var pipeKeyStr=retStr.substring(beginIndex,beginIndex+6);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(pipeKeyStr);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(pipeKeyStr);
}}}}{
net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived=true;
}});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.SimplePipeRequest$2,i$,v$);
})(this,$_F("pipeRequest",pipeRequest)));
var async=false;
{
async=true;
}var pipeRequestData=net.sf.j2s.ajax.SimplePipeRequest.constructRequest(pipeKey,"q",true);
net.sf.j2s.ajax.SimplePipeRequest.sendRequest(pipeRequest,pipeMethod,pipeURL,pipeRequestData,async);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeContinuum=$_M(c$,"pipeContinuum",
function(runnable){
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var url=runnable.getPipeURL();
ifr.src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SCRIPT,true);
document.body.appendChild(ifr);
var threadFun=function(pipeFun,key){
return function(){
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;

pipeFun(runnable);


window.setTimeout(arguments.callee,spr.pipeLiveNotifyInterval);
}
};
};

var fun=threadFun(spr.pipeNotify,runnable.pipeKey);
window.setTimeout(fun,spr.pipeLiveNotifyInterval);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.parseReceived=$_M(c$,"parseReceived",
function(string){
var ss=null;
var start=0;
while(string.length>start+6){
var destroyedKey="d";
var end=start+6;
if(destroyedKey.equals(string.substring(end,end+destroyedKey.length))){
{
var key=string.substring(start,end);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key)
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeClosed();
}
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}return destroyedKey+":"+string.substring(start,end)+":"+string.substring(end+destroyedKey.length);
}if((ss=net.sf.j2s.ajax.SimpleSerializable.parseInstance(string,end))==null||!ss.deserialize(string,end)){
break;
}var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.deal(ss);
}start=net.sf.j2s.ajax.SimplePipeRequest.restStringIndex(string,start);
}
if(start!=0){
return string.substring(start);
}return string;
},"~S");
c$.restStringIndex=$_M(c$,"restStringIndex",
function(string,start){
var idx1=string.indexOf('#',start)+1;
var idx2=string.indexOf('$',idx1);
var sizeStr=string.substring(idx1,idx2);
sizeStr=sizeStr.replaceFirst("^0+","");
var size=0;
if(sizeStr.length!=0){
try{
size=Integer.parseInt(sizeStr);
}catch(e){
if($_O(e,NumberFormatException)){
}else{
throw e;
}
}
}var end=idx2+size+1;
if(end<=string.length){
return end;
}else{
return start;
}},"~S,~N");
c$.ajaxPipe=$_M(c$,"ajaxPipe",
function(runnable){
net.sf.j2s.ajax.SimplePipeHelper.registerPipe(runnable.pipeKey,runnable);
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(runnable.getPipeURL());
if(!isXSS&&net.sf.j2s.ajax.SimplePipeRequest.pipeMode==4){
net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum(runnable);
}else{
var spr=net.sf.j2s.ajax.SimplePipeRequest;
spr.lastQueryReceived=true;
if(spr.queryTimeoutHandle!=null){
window.clearTimeout(spr.queryTimeoutHandle);
spr.queryTimeoutHandle=null;
}
(function(pipeFun,key){
return function(){
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
if(spr.lastQueryReceived){
spr.lastQueryReceived=false;
pipeFun(runnable);
}
spr.queryTimeoutHandle=window.setTimeout(arguments.callee,spr.pipeQueryInterval);
}
};
})((!isXSS)?spr.pipeQuery:spr.pipeScript,runnable.pipeKey)()
}},"net.sf.j2s.ajax.SimplePipeRunnable");
$_S(c$,
"PIPE_STATUS_OK","o",
"PIPE_STATUS_DESTROYED","d",
"PIPE_STATUS_LOST","l",
"PIPE_TYPE_QUERY","q",
"PIPE_TYPE_NOTIFY","n",
"PIPE_TYPE_SCRIPT","s",
"PIPE_TYPE_XSS","x",
"PIPE_TYPE_CONTINUUM","c",
"FORM_PIPE_KEY","k",
"FORM_PIPE_TYPE","t",
"FORM_PIPE_RANDOM","r",
"PIPE_KEY_LENGTH",6,
"MODE_PIPE_QUERY",3,
"MODE_PIPE_CONTINUUM",4,
"pipeMode",4,
"pipeQueryInterval",1000,
"pipeLiveNotifyInterval",25000,
"reqCount",0);

window["$p1p3p$"]=net.sf.j2s.ajax.SimplePipeRequest.parseReceived;
window["$p1p3b$"]=net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack;
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.SimplePipeSWTRequest",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtPipe=$_M(c$,"swtPipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.CompoundSerializable",null,function(){
c$=$_C(function(){
this.session=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundSerializable",net.sf.j2s.ajax.SimpleSerializable);
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.CompoundSerializable","$.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeSession",["net.sf.j2s.ajax.CompoundPipeRequest","$.SimplePipeHelper","$.SimplePipeRequest"],function(){
c$=$_C(function(){
this.session=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeSession",net.sf.j2s.ajax.SimplePipeRunnable);
$_H();
c$=$_T(net.sf.j2s.ajax.CompoundPipeSession,"PipeSessionClosedEvent",net.sf.j2s.ajax.CompoundSerializable);
c$=$_P();
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
if(!$_U(this,net.sf.j2s.ajax.CompoundPipeSession,"pipeDestroy",[]))return false;
var evt=new net.sf.j2s.ajax.CompoundPipeSession.PipeSessionClosedEvent();
evt.session=this.session;
this.pipeThrough([evt]);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
cp.unweave(this);
}return true;
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
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var p=pipe;
if(p.pipes!=null){
for(var i=0;i<p.pipes.length;i++){
var s=p.pipes[i];
if(s!=null&&s.session.equals(evt.session)){
p.pipes[i]=null;
break;
}}
}if(!p.isPipeLive()){
p.pipeDestroy();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(this.pipeKey);
}}return true;
},"net.sf.j2s.ajax.CompoundPipeSession.PipeSessionClosedEvent");
$_V(c$,"getHttpURL",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.rpcURL;
});
$_V(c$,"getHttpMethod",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.rpcMethod;
});
$_V(c$,"getPipeURL",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.pipeURL;
});
$_V(c$,"getPipeMethod",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.pipeMethod;
});
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeRunnable",["net.sf.j2s.ajax.CompoundPipeRequest"],function(){
c$=$_C(function(){
this.pipes=null;
this.status=0;
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
this.pipes=new Array(100);
this.status=0;
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
if(!$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeDestroy",[]))return false;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeDestroy();
}}
return true;
});
$_M(c$,"isPipeLive",
function(){
if(this.status<3){
return true;
}if($_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"isPipeLive",[])){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
if(this.pipes[i].isPipeLive()){
return true;
}}}
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
});
$_M(c$,"pipeLost",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeLost();
this.pipes[i]=null;
}}
});
$_M(c$,"keepPipeLive",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].keepPipeLive();
}}
});
$_M(c$,"weave",
function(pipe){
{
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]){
return;
}}
var added=false;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]==null){
this.pipes[i]=pipe;
added=true;
break;
}}
if(!added){
var newPipes=new Array(this.pipes.length+100);
System.arraycopy(this.pipes,0,newPipes,0,this.pipes.length);
newPipes[this.pipes.length]=pipe;
}}while(pipe.session==null){
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
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"unweave",
function(pipe){
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]){
this.pipes[i]=null;
break;
}}
},"net.sf.j2s.ajax.CompoundPipeSession");
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
return net.sf.j2s.ajax.CompoundPipeRequest.rpcURL;
});
$_V(c$,"getHttpMethod",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.rpcMethod;
});
$_V(c$,"getPipeURL",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.pipeURL;
});
$_V(c$,"getPipeMethod",
function(){
return net.sf.j2s.ajax.CompoundPipeRequest.pipeMethod;
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeRequest",["java.util.Date","net.sf.j2s.ajax.CompoundPipeRunnable","$.SimpleRPCRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.weave=$_M(c$,"weave",
function(p){
if(net.sf.j2s.ajax.CompoundPipeRequest.$pipe==null||!net.sf.j2s.ajax.CompoundPipeRequest.$pipe.isPipeLive()){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.$pipe=(function(i$,v$){
if(!$_D("net.sf.j2s.ajax.CompoundPipeRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeRequest$1",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRequest$1,"ajaxOut",[]);
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=net.sf.j2s.ajax.CompoundPipeRequest.$pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(this.pipes[i]);
if(net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status<2){
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.CompoundPipeRequest$1,i$,v$);
})(this,null),net.sf.j2s.ajax.CompoundPipeRequest.prototype.$pipe=net.sf.j2s.ajax.CompoundPipeRequest.$pipe,$t$);
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.weave(p);
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.updateStatus(true);
net.sf.j2s.ajax.SimplePipeRequest.pipe(net.sf.j2s.ajax.CompoundPipeRequest.$pipe);
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status=1;
}else{
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.weave(p);
if(net.sf.j2s.ajax.CompoundPipeRequest.$pipe.pipeKey!=null){
p.pipeKey=net.sf.j2s.ajax.CompoundPipeRequest.$pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(p);
if(net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status<2){
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status=2;
}}}},"net.sf.j2s.ajax.CompoundPipeSession");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=new java.util.Date().getTime();
if(now-net.sf.j2s.ajax.CompoundPipeRequest.lastTried>300000){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.count=0,net.sf.j2s.ajax.CompoundPipeRequest.prototype.count=net.sf.j2s.ajax.CompoundPipeRequest.count,$t$);
}($t$=net.sf.j2s.ajax.CompoundPipeRequest.count++,net.sf.j2s.ajax.CompoundPipeRequest.prototype.count=net.sf.j2s.ajax.CompoundPipeRequest.count,$t$);
if(net.sf.j2s.ajax.CompoundPipeRequest.count<=3){
pipe.updateStatus(true);
($t$=net.sf.j2s.ajax.CompoundPipeRequest.lastTried=now,net.sf.j2s.ajax.CompoundPipeRequest.prototype.lastTried=net.sf.j2s.ajax.CompoundPipeRequest.lastTried,$t$);
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}pipe.pipes[i]=null;
}
pipe=null;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(pipeURL,pipeMethod,rpcURL,rpcMethod){
if(pipeURL!=null){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.pipeURL=pipeURL,net.sf.j2s.ajax.CompoundPipeRequest.prototype.pipeURL=net.sf.j2s.ajax.CompoundPipeRequest.pipeURL,$t$);
}if(pipeMethod!=null){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.pipeMethod=pipeMethod,net.sf.j2s.ajax.CompoundPipeRequest.prototype.pipeMethod=net.sf.j2s.ajax.CompoundPipeRequest.pipeMethod,$t$);
}if(rpcURL!=null){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.rpcURL=rpcURL,net.sf.j2s.ajax.CompoundPipeRequest.prototype.rpcURL=net.sf.j2s.ajax.CompoundPipeRequest.rpcURL,$t$);
}if(rpcMethod!=null){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.rpcMethod=rpcMethod,net.sf.j2s.ajax.CompoundPipeRequest.prototype.rpcMethod=net.sf.j2s.ajax.CompoundPipeRequest.rpcMethod,$t$);
}},"~S,~S,~S,~S");
$_S(c$,
"$pipe",null,
"count",0,
"lastTried",0,
"pipeMethod","GET",
"rpcMethod","POST",
"pipeURL","simplepipe",
"rpcURL","piperpc");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeSWTRequest",["java.util.Date","net.sf.j2s.ajax.CompoundPipeRequest","$.CompoundPipeRunnable","$.SimplePipeSWTRequest","$.SimpleRPCSWTRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtWeave=$_M(c$,"swtWeave",
function(p){
{
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.$pipe;
if(pipe==null||!pipe.isPipeLive()){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.$pipe=(function(i$,v$){
if(!$_D("net.sf.j2s.ajax.CompoundPipeSWTRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeSWTRequest$1",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSWTRequest$1,"ajaxOut",[]);
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=net.sf.j2s.ajax.CompoundPipeRequest.$pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(this.pipes[i]);
if(net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status<2){
net.sf.j2s.ajax.CompoundPipeRequest.$pipe.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeSWTRequest.pipeFailed(this);
});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.CompoundPipeSWTRequest$1,i$,v$);
})(this,null),net.sf.j2s.ajax.CompoundPipeRequest.prototype.$pipe=net.sf.j2s.ajax.CompoundPipeRequest.$pipe,$t$);
pipe=net.sf.j2s.ajax.CompoundPipeRequest.$pipe;
pipe.weave(p);
pipe.updateStatus(true);
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
pipe.status=1;
}else{
pipe.weave(p);
if(pipe.pipeKey!=null){
p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(p);
if(pipe.status<2){
pipe.status=2;
}}}},"net.sf.j2s.ajax.CompoundPipeSession");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=new java.util.Date().getTime();
if(now-net.sf.j2s.ajax.CompoundPipeRequest.lastTried>300000){
($t$=net.sf.j2s.ajax.CompoundPipeRequest.count=0,net.sf.j2s.ajax.CompoundPipeRequest.prototype.count=net.sf.j2s.ajax.CompoundPipeRequest.count,$t$);
}($t$=net.sf.j2s.ajax.CompoundPipeRequest.count++,net.sf.j2s.ajax.CompoundPipeRequest.prototype.count=net.sf.j2s.ajax.CompoundPipeRequest.count,$t$);
if(net.sf.j2s.ajax.CompoundPipeRequest.count<=3){
pipe.updateStatus(true);
($t$=net.sf.j2s.ajax.CompoundPipeRequest.lastTried=now,net.sf.j2s.ajax.CompoundPipeRequest.prototype.lastTried=net.sf.j2s.ajax.CompoundPipeRequest.lastTried,$t$);
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}pipe.pipes[i]=null;
}
($t$=net.sf.j2s.ajax.CompoundPipeRequest.$pipe=null,net.sf.j2s.ajax.CompoundPipeRequest.prototype.$pipe=net.sf.j2s.ajax.CompoundPipeRequest.$pipe,$t$);
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(pipeURL,pipeMethod,rpcURL,rpcMethod){
net.sf.j2s.ajax.CompoundPipeRequest.configure(pipeURL,pipeMethod,rpcURL,rpcMethod);
},"~S,~S,~S,~S");
$_S(c$,
"pipeClosingWrapper",null);
});
