$_L(["$wt.dnd.ByteArrayTransfer"],"$wt.dnd.TextTransfer",["$wt.dnd.DND"],function(){
c$=$_T($wt.dnd,"TextTransfer",$wt.dnd.ByteArrayTransfer);
$_K(c$,
($fz=function(){
$_R(this,$wt.dnd.TextTransfer,[]);
},$fz.isPrivate=true,$fz));
c$.getInstance=$_M(c$,"getInstance",
function(){
return $wt.dnd.TextTransfer._instance;
});
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkText(object)||!this.isSupportedType(transferData)){
$wt.dnd.DND.error(2003);
}},"~O,$wt.dnd.TransferData");
$_V(c$,"nativeToJava",
function(transferData){
if(!this.isSupportedType(transferData)||transferData.pIDataObject==0)return null;
return null;
},"$wt.dnd.TransferData");
$_V(c$,"getTypeIds",
function(){
return[222222,111111];
});
$_V(c$,"getTypeNames",
function(){
return["CF_UNICODETEXT","CF_TEXT"];
});
$_M(c$,"checkText",
function(object){
return(object!=null&&$_O(object,String)&&(object).length>0);
},"~O");
$_V(c$,"validate",
function(object){
return this.checkText(object);
},"~O");
c$._instance=c$.prototype._instance=new $wt.dnd.TextTransfer();
$_S(c$,
"CF_UNICODETEXT","CF_UNICODETEXT",
"CF_TEXT","CF_TEXT",
"CF_UNICODETEXTID",222222,
"CF_TEXTID",111111);
});
