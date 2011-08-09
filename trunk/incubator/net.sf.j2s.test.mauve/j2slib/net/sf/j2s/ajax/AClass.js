$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"AClass");
c$.load=$_M(c$,"load",
function(clazzName,afterLoaded){
ClazzLoader.loadClass(clazzName,afterLoaded==null?null:function(){
if(afterLoaded!=null&&$_O(afterLoaded,net.sf.j2s.ajax.ARunnable)){
var clz=Clazz.evalType(clazzName);
afterLoaded.setClazz(clz);
}
if(afterLoaded!=null)afterLoaded.run();
},false,true);
},"~S,Runnable");
