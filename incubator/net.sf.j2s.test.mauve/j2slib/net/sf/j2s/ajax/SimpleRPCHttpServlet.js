$_J("net.sf.j2s.ajax");
$_L(["javax.servlet.http.HttpServlet","java.util.HashSet"],"net.sf.j2s.ajax.SimpleRPCHttpServlet",["java.io.ByteArrayOutputStream","java.lang.Long","$.StringBuffer","java.net.URLDecoder","java.util.Arrays","net.sf.j2s.ajax.SimpleFilter","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.runnables=null;
this.postLimit=0x1000000;
this.supportXSS=true;
this.xssPartLimit=128;
this.xssLatency=60000;
this.managingPipe=false;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimpleRPCHttpServlet",javax.servlet.http.HttpServlet);
$_Y(c$,function(){
this.runnables=new java.util.HashSet();
});
$_M(c$,"maxPostLimit",
function(){
return this.postLimit;
});
$_M(c$,"supportXSSRequest",
function(){
return this.supportXSS;
});
$_M(c$,"maxXSSRequestParts",
function(){
return this.xssPartLimit;
});
$_M(c$,"maxXSSRequestLatency",
function(){
return this.xssLatency;
});
$_M(c$,"getRunnableByRequest",
function(request){
var instance=net.sf.j2s.ajax.SimpleSerializable.parseInstance(request,(($_D("net.sf.j2s.ajax.SimpleRPCHttpServlet$1")?0:net.sf.j2s.ajax.SimpleRPCHttpServlet.$SimpleRPCHttpServlet$1$()),$_N(net.sf.j2s.ajax.SimpleRPCHttpServlet$1,this,null)));
if($_O(instance,net.sf.j2s.ajax.SimpleRPCRunnable)){
instance.deserialize(request);
return instance;
}return null;
},"~S");
$_M(c$,"init",
function(){
var runnableStr=this.getInitParameter("simple.rpc.runnables");
if(runnableStr!=null){
var splits=runnableStr.trim().$plit("\\s*[,;:]\\s*");
for(var i=0;i<splits.length;i++){
var trim=splits[i].trim();
if(trim.length!=0){
this.runnables.add(trim);
}}
}var postLimitStr=this.getInitParameter("simple.rpc.post.limit");
if(postLimitStr!=null){
try{
this.postLimit=Long.parseLong(postLimitStr);
if(this.postLimit<=0){
this.postLimit=9223372036854775807;
}}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var xssSupportStr=this.getInitParameter("simple.rpc.xss.support");
if(xssSupportStr!=null){
this.supportXSS="true".equals(xssSupportStr);
}var xssLatencytStr=this.getInitParameter("simple.rpc.xss.max.latency");
if(xssLatencytStr!=null){
try{
this.xssLatency=Long.parseLong(xssLatencytStr);
}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var xssPartsStr=this.getInitParameter("simple.rpc.xss.max.parts");
if(xssPartsStr!=null){
try{
this.xssPartLimit=Integer.parseInt(xssPartsStr);
}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var managablePipeStr=this.getInitParameter("simple.pipe.managable");
if(managablePipeStr!=null){
this.managingPipe="true".equals(managablePipeStr);
}$_U(this,net.sf.j2s.ajax.SimpleRPCHttpServlet,"init",[]);
});
$_M(c$,"validateRunnable",
function(clazzName){
return this.runnables.contains(clazzName);
},"~S");
$_V(c$,"doPost",
function(req,resp){
var request=null;
var baos=new java.io.ByteArrayOutputStream();
var buf=$_A(1024,0);
var read=0;
var res=req.getInputStream();
while(true){
try{
read=res.read(buf);
}catch(e){
if($_O(e,java.io.IOException)){
resp.sendError(400);
res.close();
return;
}else{
throw e;
}
}
if(read==-1){
break;
}baos.write(buf,0,read);
if(baos.size()>this.maxPostLimit()){
resp.sendError(403,"Data size reaches the limit of Java2Script Simple RPC!");
res.close();
return;
}}
request=baos.toString();
res.close();
var runnable=this.getRunnableByRequest(request);
if(runnable==null){
resp.sendError(404);
return;
}resp.setHeader("Pragma","no-cache");
resp.setHeader("Cache-Control","no-cache");
resp.setDateHeader("Expires",0);
resp.setContentType("text/plain; charset=utf-8");
var writer=resp.getWriter();
var clonedRunnable=null;
try{
clonedRunnable=runnable.clone();
}catch(e){
if($_O(e,CloneNotSupportedException)){
}else{
throw e;
}
}
runnable.ajaxRun();
var diffs=this.compareDiffs(runnable,clonedRunnable);
var serialize=runnable.serialize((($_D("net.sf.j2s.ajax.SimpleRPCHttpServlet$2")?0:net.sf.j2s.ajax.SimpleRPCHttpServlet.$SimpleRPCHttpServlet$2$()),$_N(net.sf.j2s.ajax.SimpleRPCHttpServlet$2,this,$_F("diffs",diffs))));
writer.write(serialize);
runnable.ajaxOut();
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
$_V(c$,"doGet",
function(req,resp){
var request=req.getQueryString();
if(request==null||request.length<4){
resp.sendError(400);
return;
}var isScriptReuest=false;
var requestID=null;
if((request.charAt(3)).charCodeAt(0)==('=').charCodeAt(0)){
request=req.getParameter("jzz");
if(request==null||request.trim().length==0){
resp.sendError(400);
return;
}requestID=req.getParameter("jzn");
if(requestID!=null&&requestID.length!=0){
isScriptReuest=true;
request=this.prepareScriptRequest(req,resp,requestID,request);
if(request==null){
return;
}}}else{
request=java.net.URLDecoder.decode(request,"UTF-8");
}var runnable=this.getRunnableByRequest(request);
if(runnable==null){
resp.sendError(404);
return;
}var clonedRunnable=null;
try{
clonedRunnable=runnable.clone();
}catch(e){
if($_O(e,CloneNotSupportedException)){
}else{
throw e;
}
}
runnable.ajaxRun();
var diffs=this.compareDiffs(runnable,clonedRunnable);
var serialize=runnable.serialize((($_D("net.sf.j2s.ajax.SimpleRPCHttpServlet$3")?0:net.sf.j2s.ajax.SimpleRPCHttpServlet.$SimpleRPCHttpServlet$3$()),$_N(net.sf.j2s.ajax.SimpleRPCHttpServlet$3,this,$_F("diffs",diffs))));
resp.setHeader("Pragma","no-cache");
resp.setHeader("Cache-Control","no-cache");
resp.setDateHeader("Expires",0);
if(isScriptReuest){
resp.setContentType("text/javascript; charset=utf-8");
var writer=resp.getWriter();
writer.write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(");
writer.write("\""+requestID+"\", \"");
writer.write(serialize.replaceAll("\\\\", "\\\\\\\\").replaceAll ("\r", "\\\\r").replaceAll ("\n", "\\\\n").replaceAll ("\"","\\\\\""));
writer.write("\");");
runnable.ajaxOut();
return;
}resp.setContentType("text/plain; charset=utf-8");
var writer=resp.getWriter();
writer.write(serialize);
runnable.ajaxOut();
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
$_M(c$,"prepareScriptRequest",
($fz=function(req,resp,scriptRequestID,request){
if(!scriptRequestID.matches("\\d{6,}")){
resp.sendError(400);
return null;
}if(!this.supportXSSRequest()){
resp.setContentType("text/javascript");
resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(\""+scriptRequestID+"\", \"unsupported\");");
return null;
}var count=req.getParameter("jzp");
if(count==null||!count.matches("[1-9]\\d{0,2}")){
resp.sendError(400);
return null;
}var partsCount=Integer.parseInt(count);
if(partsCount==1){
return request;
}var current=req.getParameter("jzc");
if(current==null||!current.matches("[1-9]\\d{0,2}")){
resp.sendError(400);
return null;
}var curPart=Integer.parseInt(current);
if(partsCount<1||curPart>partsCount){
resp.sendError(400);
return null;
}if(partsCount>this.maxXSSRequestParts()){
resp.setContentType("text/javascript");
resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(\""+scriptRequestID+"\", \"exceedrequestlimit\");");
return null;
}var attrName="jzn"+scriptRequestID;
var attrTime="jzt"+scriptRequestID;
var parts=null;
var badRequest=false;
var toContinue=false;
var session=req.getSession();
{
this.cleanSession(session);
var attr=session.getAttribute(attrName);
if(attr==null){
parts=new Array(partsCount);
session.setAttribute(attrName,parts);
session.setAttribute(attrTime,new Long(System.currentTimeMillis()));
}else{
parts=attr;
if(partsCount!=parts.length){
badRequest=true;
}}if(!badRequest){
parts[curPart-1]=request;
for(var i=0;i<parts.length;i++){
if(parts[i]==null){
toContinue=true;
break;
}}
if(!toContinue){
session.removeAttribute(attrName);
session.removeAttribute(attrTime);
}}}if(badRequest){
resp.sendError(400);
return null;
}if(toContinue){
resp.setContentType("text/javascript");
resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(\""+scriptRequestID+"\", \"continue\""+((curPart==1)?", \""+session.getId()+"\");":");"));
return null;
}var buf=new StringBuffer();
for(var i=0;i<parts.length;i++){
buf.append(parts[i]);
parts[i]=null;
}
return buf.toString();
},$fz.isPrivate=true,$fz),"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse,~S,~S");
$_M(c$,"cleanSession",
($fz=function(ses){
var attrNames=ses.getAttributeNames();
while(attrNames.hasMoreElements()){
var name=attrNames.nextElement();
if(name.startsWith("jzt")){
var time=ses.getAttribute(name);
if(System.currentTimeMillis()-time.longValue()>this.maxXSSRequestLatency()){
ses.removeAttribute(name);
ses.removeAttribute("jzn"+name.substring(3));
}}}
},$fz.isPrivate=true,$fz),"javax.servlet.http.HttpSession");
$_M(c$,"compareDiffs",
function(runnable1,runnable2){
var diffSet=new java.util.HashSet();
var fieldSet=new java.util.HashSet();
var clazz=runnable1.getClass();
while(clazz!=null&&!"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())){
var fields=clazz.getDeclaredFields();
for(var i=0;i<fields.length;i++){
fieldSet.add(fields[i]);
}
clazz=clazz.getSuperclass();
}
var fields=fieldSet.toArray(new Array(0));
for(var i=0;i<fields.length;i++){
var field=fields[i];
var modifiers=field.getModifiers();
if((modifiers&(5))!=0&&(modifiers&128)==0&&(modifiers&8)==0){
var name=field.getName();
var field1=null;
try{
field1=field.get(runnable1);
}catch(e$$){
if($_O(e$$,IllegalArgumentException)){
var e1=e$$;
{
}
}else if($_O(e$$,IllegalAccessException)){
var e1=e$$;
{
}
}else{
throw e$$;
}
}
var field2=null;
try{
field2=field.get(runnable2);
}catch(e$$){
if($_O(e$$,IllegalArgumentException)){
var e=e$$;
{
}
}else if($_O(e$$,IllegalAccessException)){
var e=e$$;
{
}
}else{
throw e$$;
}
}
if(field1==null){
if(field2!=null){
diffSet.add(name);
}}else if(field1.getClass().getName().startsWith("[")){
var type=field.getType();
if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}else if(type===Array){
if(!java.util.Arrays.equals(field1,field2)){
diffSet.add(name);
}}}else if(!field1.equals(field2)){
diffSet.add(name);
}}}
return diffSet.toArray(new Array(diffSet.size()));
},"net.sf.j2s.ajax.SimpleRPCRunnable,net.sf.j2s.ajax.SimpleRPCRunnable");
c$.$SimpleRPCHttpServlet$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCHttpServlet$1",null,net.sf.j2s.ajax.SimpleFilter);
$_V(c$,"accept",
function(clazzName){
return this.b$["net.sf.j2s.ajax.SimpleRPCHttpServlet"].validateRunnable(clazzName);
},"~S");
$_V(c$,"ignoreDefaultFields",
function(){
return false;
});
c$=$_P();
};
c$.$SimpleRPCHttpServlet$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCHttpServlet$2",null,net.sf.j2s.ajax.SimpleFilter);
$_V(c$,"accept",
function(field){
for(var i=0;i<this.f$.diffs.length;i++){
if(this.f$.diffs[i].equals(field)){
return true;
}}
return false;
},"~S");
$_V(c$,"ignoreDefaultFields",
function(){
return false;
});
c$=$_P();
};
c$.$SimpleRPCHttpServlet$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCHttpServlet$3",null,net.sf.j2s.ajax.SimpleFilter);
$_V(c$,"accept",
function(field){
for(var i=0;i<this.f$.diffs.length;i++){
if(this.f$.diffs[i].equals(field)){
return true;
}}
return false;
},"~S");
$_V(c$,"ignoreDefaultFields",
function(){
return false;
});
c$=$_P();
};
});
