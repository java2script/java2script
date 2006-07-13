$_J("net.sf.j2s.ajax");
Clazz.load(["org.eclipse.jdt.core.ClasspathVariableInitializer"],["net.sf.j2s.ajax.AjaxPlugin","org.eclipse.core.resources.ResourcesPlugin","org.eclipse.core.runtime.NullProgressMonitor","$.Path","$.Platform","org.eclipse.jdt.core.JavaCore","org.eclipse.jdt.internal.launching.LaunchingPlugin"],function(){
c$=$_C(function(){
this.fMonitor=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AJAXVariableInitializer",org.eclipse.jdt.core.ClasspathVariableInitializer);
$_V(c$,"initialize",
function(variable){
var newPath=null;
var starterURL=net.sf.j2s.ajax.AjaxPlugin.getDefault().getBundle().getEntry("/"+java.io.File.separator);
var root=".";
try{
root=org.eclipse.core.runtime.Platform.asLocalURL(starterURL).getFile();
}catch(e){
if($_O(e,java.io.IOException)){
e1.printStackTrace();
}else{
throw e;
}
}
if("AJAX_CORE".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxcore.jar");
}else if("AJAX_SWT".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxswt.jar");
}else if("AJAX_CORE_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxcoresrc.zip");
}else if("AJAX_SWT_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxswtsrc.zip");
}if(newPath==null){
return;
}var workspace=org.eclipse.core.resources.ResourcesPlugin.getWorkspace();
var wsDescription=workspace.getDescription();
var wasAutobuild=wsDescription.isAutoBuilding();
try{
this.setAutobuild(workspace,false);
this.setJREVariable(newPath,variable);
}catch(e){
if($_O(e,org.eclipse.core.runtime.CoreException)){
org.eclipse.jdt.internal.launching.LaunchingPlugin.log(ce);
return;
}else{
throw e;
}
}finally{
try{
this.setAutobuild(workspace,wasAutobuild);
}catch(e){
if($_O(e,org.eclipse.core.runtime.CoreException)){
org.eclipse.jdt.internal.launching.LaunchingPlugin.log(ce);
}else{
throw e;
}
}
}
},"~S");
$_M(c$,"setJREVariable",
($fz=function(newPath,$var){
org.eclipse.jdt.core.JavaCore.setClasspathVariable($var,newPath,this.getMonitor());
},$fz.isPrivate=true,$fz),"org.eclipse.core.runtime.IPath,~S");
$_M(c$,"setAutobuild",
($fz=function(ws,newState){
var wsDescription=ws.getDescription();
var oldState=wsDescription.isAutoBuilding();
if(oldState!=newState){
wsDescription.setAutoBuilding(newState);
ws.setDescription(wsDescription);
}return oldState;
},$fz.isPrivate=true,$fz),"org.eclipse.core.resources.IWorkspace,~B");
$_M(c$,"getMonitor",
function(){
if(this.fMonitor==null){
return new org.eclipse.core.runtime.NullProgressMonitor();
}return this.fMonitor;
});
});
