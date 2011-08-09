$_J("java.net");
$_L(["java.net.NetPermission","java.util.Hashtable"],"java.net.URL",["java.io.IOException","java.lang.Error","$.IllegalArgumentException","$.NullPointerException","java.net.MalformedURLException","$.URI","org.apache.harmony.luni.util.Msg"],function(){
c$=$_C(function(){
this.$hashCode=0;
this.file=null;
this.protocol=null;
this.host=null;
this.port=-1;
this.authority=null;
this.userInfo=null;
this.path=null;
this.query=null;
this.ref=null;
this.strmHandler=null;
$_Z(this,arguments);
},java.net,"URL",null,java.io.Serializable);
c$.setURLStreamHandlerFactory=$_M(c$,"setURLStreamHandlerFactory",
function(streamFactory){
if(java.net.URL.streamHandlerFactory!=null){
throw new Error(org.apache.harmony.luni.util.Msg.getString("K004b"));
}var sm=System.getSecurityManager();
if(sm!=null){
sm.checkSetFactory();
}java.net.URL.streamHandlers.clear();
($t$=java.net.URL.streamHandlerFactory=streamFactory,java.net.URL.prototype.streamHandlerFactory=java.net.URL.streamHandlerFactory,$t$);
},"java.net.URLStreamHandlerFactory");
$_K(c$,
function(spec){
this.construct(Clazz.castNullAs("java.net.URL"),spec,Clazz.castNullAs("java.net.URLStreamHandler"));
},"~S");
$_K(c$,
function(context,spec){
this.construct(context,spec,Clazz.castNullAs("java.net.URLStreamHandler"));
},"java.net.URL,~S");
$_K(c$,
function(context,spec,handler){
if(handler!=null){
var sm=System.getSecurityManager();
if(sm!=null){
sm.checkPermission(java.net.URL.specifyStreamHandlerPermission);
}this.strmHandler=handler;
}if(spec==null){
throw new java.net.MalformedURLException();
}spec=spec.trim();
var index;
try{
index=spec.indexOf(':');
}catch(e){
if($_O(e,NullPointerException)){
throw new java.net.MalformedURLException(e.toString());
}else{
throw e;
}
}
var startIPv6Addr=spec.indexOf('[');
if(index>=0){
if((startIPv6Addr==-1)||(index<startIPv6Addr)){
this.protocol=spec.substring(0,index);
if(!this.protocol.matches("\\A\\p{Alpha}[\\p{Alnum}+-.]*\\z")||this.protocol.indexOf('/')>=0){
this.protocol=null;
index=-1;
}else{
this.protocol=this.protocol.toLowerCase();
}}}if(this.protocol!=null){
if(context!=null&&this.protocol.equals(context.getProtocol())){
var cPath=context.getPath();
if(cPath!=null&&cPath.startsWith("/")){
this.set(this.protocol,context.getHost(),context.getPort(),context.getAuthority(),context.getUserInfo(),cPath,context.getQuery(),null);
}if(this.strmHandler==null){
this.strmHandler=context.strmHandler;
}}}else{
if(context==null){
throw new java.net.MalformedURLException(org.apache.harmony.luni.util.Msg.getString("K00d8",spec));
}this.set(context.getProtocol(),context.getHost(),context.getPort(),context.getAuthority(),context.getUserInfo(),context.getPath(),context.getQuery(),null);
if(this.strmHandler==null){
this.strmHandler=context.strmHandler;
}}if(this.strmHandler==null){
if(this.strmHandler==null){
throw new java.net.MalformedURLException(org.apache.harmony.luni.util.Msg.getString("K00b3",this.protocol));
}}try{
this.strmHandler.parseURL(this,spec,++index,spec.length);
}catch(e){
if($_O(e,Exception)){
throw new java.net.MalformedURLException(e.toString());
}else{
throw e;
}
}
if(this.port<-1){
throw new java.net.MalformedURLException(org.apache.harmony.luni.util.Msg.getString("K0325",this.port));
}},"java.net.URL,~S,java.net.URLStreamHandler");
$_K(c$,
function(protocol,host,file){
this.construct(protocol,host,-1,file,Clazz.castNullAs("java.net.URLStreamHandler"));
},"~S,~S,~S");
$_K(c$,
function(protocol,host,port,file){
this.construct(protocol,host,port,file,Clazz.castNullAs("java.net.URLStreamHandler"));
},"~S,~S,~N,~S");
$_K(c$,
function(protocol,host,port,file,handler){
if(port<-1){
throw new java.net.MalformedURLException(org.apache.harmony.luni.util.Msg.getString("K0325",port));
}if(host!=null&&host.indexOf(":")!=-1&&(host.charAt(0)).charCodeAt(0)!=('[').charCodeAt(0)){
host="["+host+"]";
}if(protocol!=null){
this.protocol=protocol;
}else{
throw new NullPointerException(org.apache.harmony.luni.util.Msg.getString("K00b3",protocol));
}this.host=host;
this.port=port;
var index=-1;
index=file.indexOf("#",file.lastIndexOf("/"));
if(index>=0){
this.file=file.substring(0,index);
this.ref=file.substring(index+1);
}else{
this.file=file;
}this.fixURL(false);
if(handler==null){
if(this.strmHandler==null){
throw new java.net.MalformedURLException(org.apache.harmony.luni.util.Msg.getString("K00b3",protocol));
}}else{
var sm=System.getSecurityManager();
if(sm!=null){
sm.checkPermission(java.net.URL.specifyStreamHandlerPermission);
}this.strmHandler=handler;
}},"~S,~S,~N,~S,java.net.URLStreamHandler");
$_M(c$,"fixURL",
function(fixHost){
var index;
if(this.host!=null&&this.host.length>0){
this.authority=this.host;
if(this.port!=-1){
this.authority=this.authority+":"+this.port;
}}if(fixHost){
if(this.host!=null&&(index=this.host.lastIndexOf('@'))>-1){
this.userInfo=this.host.substring(0,index);
this.host=this.host.substring(index+1);
}else{
this.userInfo=null;
}}if(this.file!=null&&(index=this.file.indexOf('?'))>-1){
this.query=this.file.substring(index+1);
this.path=this.file.substring(0,index);
}else{
this.query=null;
this.path=this.file;
}},"~B");
$_M(c$,"set",
function(protocol,host,port,file,ref){
if(this.protocol==null){
this.protocol=protocol;
}this.host=host;
this.file=file;
this.port=port;
this.ref=ref;
this.$hashCode=0;
this.fixURL(true);
},"~S,~S,~N,~S,~S");
$_V(c$,"equals",
function(o){
if(o==null){
return false;
}if(this===o){
return true;
}if(this.getClass()!==o.getClass()){
return false;
}return this.strmHandler.equals(this,o);
},"~O");
$_M(c$,"sameFile",
function(otherURL){
return this.strmHandler.sameFile(this,otherURL);
},"java.net.URL");
$_V(c$,"hashCode",
function(){
if(this.$hashCode==0){
this.$hashCode=this.strmHandler.hashCode(this);
}return this.$hashCode;
});
$_M(c$,"getContent",
function(){
return this.openConnection().getContent();
});
$_M(c$,"getContent",
function(types){
return this.openConnection().getContent(types);
},"~A");
$_M(c$,"openStream",
function(){
return this.openConnection().getInputStream();
});
$_M(c$,"openConnection",
function(){
return this.strmHandler.openConnection(this);
});
$_M(c$,"toURI",
function(){
return new java.net.URI(this.toExternalForm());
});
$_M(c$,"openConnection",
function(proxy){
if(null==proxy){
throw new IllegalArgumentException(org.apache.harmony.luni.util.Msg.getString("K034c"));
}return this.strmHandler.openConnection(this,proxy);
},"java.net.Proxy");
$_V(c$,"toString",
function(){
return this.toExternalForm();
});
$_M(c$,"toExternalForm",
function(){
if(this.strmHandler==null){
return"unknown protocol("+this.protocol+")://"+this.host+this.file;
}return this.strmHandler.toExternalForm(this);
});
$_M(c$,"getFile",
function(){
return this.file;
});
$_M(c$,"getHost",
function(){
return this.host;
});
$_M(c$,"getPort",
function(){
return this.port;
});
$_M(c$,"getProtocol",
function(){
return this.protocol;
});
$_M(c$,"getRef",
function(){
return this.ref;
});
$_M(c$,"getQuery",
function(){
return this.query;
});
$_M(c$,"getPath",
function(){
return this.path;
});
$_M(c$,"getUserInfo",
function(){
return this.userInfo;
});
$_M(c$,"getAuthority",
function(){
return this.authority;
});
$_M(c$,"set",
function(protocol,host,port,authority,userInfo,path,query,ref){
var file=path;
if(query!=null&&!query.equals("")){
if(file!=null){
file=file+"?"+query;
}else{
file="?"+query;
}}this.set(protocol,host,port,file,ref);
this.authority=authority;
this.userInfo=userInfo;
this.path=path;
this.query=query;
},"~S,~S,~N,~S,~S,~S,~S,~S");
$_M(c$,"getStreamHandler",
function(){
return this.strmHandler;
});
$_M(c$,"getDefaultPort",
function(){
return this.strmHandler.getDefaultPort();
});
c$.specifyStreamHandlerPermission=c$.prototype.specifyStreamHandlerPermission=new java.net.NetPermission("specifyStreamHandler");
c$.streamHandlers=c$.prototype.streamHandlers=new java.util.Hashtable();
$_S(c$,
"streamHandlerFactory",null);
});
