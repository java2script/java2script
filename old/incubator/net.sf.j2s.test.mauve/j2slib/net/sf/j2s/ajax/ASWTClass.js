$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.AClass"],"net.sf.j2s.ajax.ASWTClass",null,function(){
c$=$_T(net.sf.j2s.ajax,"ASWTClass",net.sf.j2s.ajax.AClass);
c$.swtLoad=$_M(c$,"swtLoad",
function(clazzName,afterLoaded){
var display=null;
{
}net.sf.j2s.ajax.ASWTClass.objectLoad(display,clazzName,afterLoaded);
},"~S,Runnable");
c$.objectLoad=$_M(c$,"objectLoad",
function(display,clazzName,afterLoaded){
ClazzLoader.loadClass(clazzName,afterLoaded==null?null:function(){
if(afterLoaded!=null&&$_O(afterLoaded,net.sf.j2s.ajax.ARunnable)){
var clz=Clazz.evalType(clazzName);
afterLoaded.setClazz(clz);
}
if(afterLoaded!=null)afterLoaded.run();
},false,true);
},"~O,~S,Runnable");
c$.displayLoad=$_M(c$,"displayLoad",
function(display,clazzName,afterLoaded){
net.sf.j2s.ajax.ASWTClass.objectLoad(display,clazzName,afterLoaded);
},"$wt.widgets.Display,~S,Runnable");
c$.shellLoad=$_M(c$,"shellLoad",
function(shell,clazzName,afterLoaded){
net.sf.j2s.ajax.ASWTClass.objectLoad(shell.getDisplay(),clazzName,afterLoaded);
},"$wt.widgets.Shell,~S,Runnable");
});
