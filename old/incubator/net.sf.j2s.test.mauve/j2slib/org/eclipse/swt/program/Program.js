$_J("org.eclipse.swt.program");
$_L(null,"$wt.program.Program",["$wt.graphics.ImageData"],function(){
c$=$_C(function(){
this.name=null;
this.command=null;
this.iconName=null;
$_Z(this,arguments);
},$wt.program,"Program");
$_K(c$,
function(){
});
c$.findProgram=$_M(c$,"findProgram",
function(extension){
if(extension.length==0)return null;
if((extension.charAt(0)).charCodeAt(0)!=('.').charCodeAt(0))extension="."+extension;
extension=extension.toLowerCase();
var program=new $wt.program.Program();
if(".js".equalsIgnoreCase(extension)){
program.name="Java2Script Pacemaker";
program.command="$wt.program.Program.loadJavaScript(\"%1\")";
program.iconName="images/z-logo.gif";
}else{
program.name="Embeded Browser";
program.command="window.open(\"%1\")";
program.iconName="images/browser.gif";
}return program;
},"~S");
c$.getExtensions=$_M(c$,"getExtensions",
function(){
return[".js",".html",".htm",".xhtml","xml",".png",".gif",".jpg",".jpeg"];
});
c$.getPrograms=$_M(c$,"getPrograms",
function(){
var j2s=new $wt.program.Program();
j2s.name="Java2Script Pacemaker";
j2s.command="$wt.program.Program.loadJavaScript(\"%1\")";
j2s.iconName="images/z-logo.gif";
var browser=new $wt.program.Program();
browser.name="Embeded Browser";
browser.command="window.open(\"%1\")";
browser.iconName="images/browser.gif";
return[j2s,browser];
});
c$.loadJavaScript=$_M(c$,"loadJavaScript",
function(url){
var script=document.createElement("SCRIPT");
script.src=url;
document.body.appendChild(script);
},"~S");
c$.launch=$_M(c$,"launch",
function(fileName){
if(fileName.endsWith(".js")){
$wt.program.Program.findProgram(".js").execute(fileName);
}else{
$wt.program.Program.findProgram(fileName).execute(fileName);
}return true;
},"~S");
$_M(c$,"execute",
function(fileName){
var quote=true;
var prefix=this.command;
var suffix="";
var index=this.command.indexOf("%1");
if(index!=-1){
var count=0;
var i=index+2;
var length=this.command.length;
while(i<length){
if((this.command.charAt(i)).charCodeAt(0)==('"').charCodeAt(0))count++;
i++;
}
quote=count%2==0;
prefix=this.command.substring(0,index);
suffix=this.command.substring(index+2,length);
}if(!fileName.startsWith("/")&&!fileName.startsWith("\\")&&(fileName.charAt(1)).charCodeAt(0)==(':').charCodeAt(0)){
fileName="file:///"+fileName;
}if(quote)fileName="\""+fileName+"\"";
try{
eval((prefix+fileName+suffix).replace(/\\/g,"\\\\"));
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
return true;
},"~S");
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.iconName);
});
$_M(c$,"getName",
function(){
return this.name;
});
$_V(c$,"equals",
function(other){
if(this===other)return true;
if($_O(other,$wt.program.Program)){
var program=other;
return this.name.equals(program.name)&&this.command.equals(program.command)&&this.iconName.equals(program.iconName);
}return false;
},"~O");
$_V(c$,"hashCode",
function(){
return this.name.hashCode()^this.command.hashCode()^this.iconName.hashCode();
});
$_V(c$,"toString",
function(){
return"Program {"+this.name+"}";
});
});
