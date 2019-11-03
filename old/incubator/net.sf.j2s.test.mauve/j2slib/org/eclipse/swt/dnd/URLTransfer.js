$_L(["$wt.dnd.ByteArrayTransfer"],"$wt.dnd.URLTransfer",["java.net.URL","$wt.dnd.DND"],function(){
c$=$_T($wt.dnd,"URLTransfer",$wt.dnd.ByteArrayTransfer);
$_K(c$,
($fz=function(){
$_R(this,$wt.dnd.URLTransfer,[]);
},$fz.isPrivate=true,$fz));
c$.getInstance=$_M(c$,"getInstance",
function(){
return $wt.dnd.URLTransfer._instance;
});
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkURL(object)||!this.isSupportedType(transferData)){
$wt.dnd.DND.error(2003);
}},"~O,$wt.dnd.TransferData");
$_V(c$,"nativeToJava",
function(transferData){
if(!this.isSupportedType(transferData)||transferData.pIDataObject==0)return null;
return null;
},"$wt.dnd.TransferData");
$_V(c$,"getTypeIds",
function(){
return[$wt.dnd.URLTransfer.CFSTR_INETURLID];
});
$_V(c$,"getTypeNames",
function(){
return["UniformResourceLocator"];
});
$_M(c$,"checkURL",
function(object){
if(object==null||!($_O(object,Array))||(object).length==0)return false;
var strings=object;
if(strings[0]==null||strings[0].length==0)return false;
try{
new java.net.URL(strings[0]);
}catch(e){
if($_O(e,java.net.MalformedURLException)){
return false;
}else{
throw e;
}
}
return true;
},"~O");
$_V(c$,"validate",
function(object){
return this.checkURL(object);
},"~O");
c$._instance=c$.prototype._instance=new $wt.dnd.URLTransfer();
$_S(c$,
"CFSTR_INETURL","UniformResourceLocator");
c$.CFSTR_INETURLID=c$.prototype.CFSTR_INETURLID=$wt.dnd.Transfer.registerType("UniformResourceLocator");
});
