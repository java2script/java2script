$_L(["$wt.dnd.ByteArrayTransfer"],"$wt.dnd.HTMLTransfer",["$wt.dnd.DND"],function(){
c$=$_T($wt.dnd,"HTMLTransfer",$wt.dnd.ByteArrayTransfer);
$_K(c$,
($fz=function(){
$_R(this,$wt.dnd.HTMLTransfer,[]);
},$fz.isPrivate=true,$fz));
c$.getInstance=$_M(c$,"getInstance",
function(){
return $wt.dnd.HTMLTransfer._instance;
});
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkHTML(object)||!this.isSupportedType(transferData)){
$wt.dnd.DND.error(2003);
}var string=object;
var count=string.length;
var chars=$_A(count+1,'\0');
string.getChars(0,count,chars,0);
},"~O,$wt.dnd.TransferData");
$_V(c$,"nativeToJava",
function(transferData){
if(!this.isSupportedType(transferData)||transferData.pIDataObject==0)return null;
return null;
},"$wt.dnd.TransferData");
$_V(c$,"getTypeIds",
function(){
return[$wt.dnd.HTMLTransfer.HTML_FORMATID];
});
$_V(c$,"getTypeNames",
function(){
return["HTML Format"];
});
$_M(c$,"checkHTML",
function(object){
return(object!=null&&$_O(object,String)&&(object).length>0);
},"~O");
$_V(c$,"validate",
function(object){
return this.checkHTML(object);
},"~O");
c$._instance=c$.prototype._instance=new $wt.dnd.HTMLTransfer();
$_S(c$,
"HTML_FORMAT","HTML Format");
c$.HTML_FORMATID=c$.prototype.HTML_FORMATID=$wt.dnd.Transfer.registerType("HTML Format");
});
