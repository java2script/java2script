$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.CookieStore",null,function(){
c$=$_T(net.sf.j2s.store,"CookieStore",null,net.sf.j2s.store.IStore);
$_V(c$,"getProperty",
function(name){
var prefix=name+"=";
var allCookies=document.cookie.split(';');
for(var i=0;i<allCookies.length;i++){
var item=allCookies[i].replace(/^\s*/,"");
if(item.indexOf(prefix)==0){
return item.substring(prefix.length,item.length);
}
}
return null;
},"~S");
$_V(c$,"setProperty",
function(name,value){
var toExpire=new Date();
if(value==null){
value="";
toExpire.setTime(new Date().getTime()-24*3600*1000);
}else{
toExpire.setTime(new Date().getTime()+365*24*3600*1000);
}
document.cookie=name+"="+value
+"; expires="+toExpire.toGMTString()
+"; path=/";
},"~S,~S");
$_V(c$,"isReady",
function(){
return true;
});
});
