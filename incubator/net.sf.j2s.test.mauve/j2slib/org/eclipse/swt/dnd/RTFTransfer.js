$_L(["$wt.dnd.ByteArrayTransfer"],"$wt.dnd.RTFTransfer",["$wt.dnd.DND"],function(){
c$=$_T($wt.dnd,"RTFTransfer",$wt.dnd.ByteArrayTransfer);
$_K(c$,
($fz=function(){
$_R(this,$wt.dnd.RTFTransfer,[]);
},$fz.isPrivate=true,$fz));
c$.getInstance=$_M(c$,"getInstance",
function(){
return $wt.dnd.RTFTransfer._instance;
});
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkRTF(object)||!this.isSupportedType(transferData)){
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
return[$wt.dnd.RTFTransfer.CF_RTFID];
});
$_V(c$,"getTypeNames",
function(){
return["Rich Text Format"];
});
$_M(c$,"checkRTF",
function(object){
return(object!=null&&$_O(object,String)&&(object).length>0);
},"~O");
$_V(c$,"validate",
function(object){
return this.checkRTF(object);
},"~O");
c$._instance=c$.prototype._instance=new $wt.dnd.RTFTransfer();
$_S(c$,
"CF_RTF","Rich Text Format");
c$.CF_RTFID=c$.prototype.CF_RTFID=$wt.dnd.Transfer.registerType("Rich Text Format");
});
