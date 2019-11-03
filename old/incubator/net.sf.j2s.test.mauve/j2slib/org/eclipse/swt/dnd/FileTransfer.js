$_L(["$wt.dnd.ByteArrayTransfer"],"$wt.dnd.FileTransfer",["java.lang.StringBuffer","$wt.dnd.DND"],function(){
c$=$_T($wt.dnd,"FileTransfer",$wt.dnd.ByteArrayTransfer);
$_K(c$,
($fz=function(){
$_R(this,$wt.dnd.FileTransfer,[]);
},$fz.isPrivate=true,$fz));
c$.getInstance=$_M(c$,"getInstance",
function(){
return $wt.dnd.FileTransfer._instance;
});
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkFile(object)||!this.isSupportedType(transferData)){
$wt.dnd.DND.error(2003);
}var fileNames=object;
var allFiles=new StringBuffer();
for(var i=0;i<fileNames.length;i++){
allFiles.append(fileNames[i]);
allFiles.append("\u0000");
}
},"~O,$wt.dnd.TransferData");
$_V(c$,"nativeToJava",
function(transferData){
if(!this.isSupportedType(transferData)||transferData.pIDataObject==0)return null;
return null;
},"$wt.dnd.TransferData");
$_V(c$,"getTypeIds",
function(){
return[333333];
});
$_V(c$,"getTypeNames",
function(){
return["CF_HDROP "];
});
$_M(c$,"checkFile",
function(object){
if(object==null||!($_O(object,Array))||(object).length==0)return false;
var strings=object;
for(var i=0;i<strings.length;i++){
if(strings[i]==null||strings[i].length==0)return false;
}
return true;
},"~O");
$_V(c$,"validate",
function(object){
return this.checkFile(object);
},"~O");
c$._instance=c$.prototype._instance=new $wt.dnd.FileTransfer();
$_S(c$,
"CF_HDROP","CF_HDROP ",
"CF_HDROPID",333333,
"CF_HDROP_SEPARATOR","\0");
});
