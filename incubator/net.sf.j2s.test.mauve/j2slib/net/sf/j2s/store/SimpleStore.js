$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore","$.CookieStore","$.HTML5LocalStorage","$.XSSCookieStore"],"net.sf.j2s.store.SimpleStore",null,function(){
c$=$_C(function(){
this.store=null;
$_Z(this,arguments);
},net.sf.j2s.store,"SimpleStore",null,net.sf.j2s.store.IStore);
$_K(c$,
($fz=function(){
{
var ua=navigator.userAgent.toLowerCase();
var isLocalFile=false;
try{
isLocalFile=window.location.protocol=="file:";
}catch(e){
isLocalFile=true;
}
if(window["j2s.html5.store"]&&window["localStorage"]!=null&&(ua.indexOf("gecko/")==-1||!isLocalFile)){
this.store=new net.sf.j2s.store.HTML5LocalStorage();
return;
}
var isLocal=false;
try{
isLocal=window.location.protocol=="file:"
||window.location.host.toLowerCase()=="localhost";
}catch(e){
isLocal=true;
}
var isOldIE=ua.indexOf("msie 5.5")!=-1||ua.indexOf("msie 5.0")!=-1;
var cookieURL=window["j2s.xss.cookie.url"];
if(!isLocal&&cookieURL!=null&&!isOldIE){
this.store=new net.sf.j2s.store.XSSCookieStore(cookieURL);
}else{
this.store=new net.sf.j2s.store.CookieStore();
}
}},$fz.isPrivate=true,$fz));
c$.getDefault=$_M(c$,"getDefault",
function(){
if(net.sf.j2s.store.SimpleStore.singleton==null){
($t$=net.sf.j2s.store.SimpleStore.singleton=new net.sf.j2s.store.SimpleStore(),net.sf.j2s.store.SimpleStore.prototype.singleton=net.sf.j2s.store.SimpleStore.singleton,$t$);
}return net.sf.j2s.store.SimpleStore.singleton;
});
$_M(c$,"getProperty",
function(name){
return this.store.getProperty(name);
},"~S");
$_M(c$,"setProperty",
function(name,value){
this.store.setProperty(name,value);
},"~S,~S");
$_M(c$,"isReady",
function(){
return this.store.isReady();
});
$_M(c$,"execute",
function(runnable){
if($_O(this.store,net.sf.j2s.store.XSSCookieStore)&&!this.store.isReady()){
{
window.xssCookieReadyCallback=(function(r1,r2){
return function(){
net.sf.j2s.store.XSSCookieStore.initialized=true;
if(r1!=null){
try{
r1.run();
}catch(e){
}
}
r2.run();
};
})(window.xssCookieReadyCallback,runnable);
window.setTimeout(function(){
if(!net.sf.j2s.store.XSSCookieStore.initialized
&&window.xssCookieReadyCallback!=null){
window.xssCookieReadyCallback();
}
},10000);
}return;
}runnable.run();
},"Runnable");
$_S(c$,
"singleton",null);
});
