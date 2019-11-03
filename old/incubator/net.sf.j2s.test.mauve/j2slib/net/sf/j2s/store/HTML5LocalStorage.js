$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.HTML5LocalStorage",null,function(){
c$=$_T(net.sf.j2s.store,"HTML5LocalStorage",null,net.sf.j2s.store.IStore);
$_V(c$,"getProperty",
function(name){
return localStorage.getItem(name);
},"~S");
$_V(c$,"isReady",
function(){
return true;
});
$_V(c$,"setProperty",
function(name,value){
localStorage.setItem(name,value);
},"~S,~S");
});
