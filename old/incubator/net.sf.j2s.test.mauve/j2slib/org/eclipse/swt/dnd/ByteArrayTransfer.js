$_L(["$wt.dnd.Transfer"],"$wt.dnd.ByteArrayTransfer",["$wt.dnd.DND","$.TransferData"],function(){
c$=$_T($wt.dnd,"ByteArrayTransfer",$wt.dnd.Transfer);
$_V(c$,"getSupportedTypes",
function(){
var types=this.getTypeIds();
var data=new Array(types.length);
for(var i=0;i<types.length;i++){
data[i]=new $wt.dnd.TransferData();
data[i].type=types[i];
}
return data;
});
$_V(c$,"isSupportedType",
function(transferData){
if(transferData==null)return false;
var types=this.getTypeIds();
for(var i=0;i<types.length;i++){
}
return false;
},"$wt.dnd.TransferData");
$_V(c$,"javaToNative",
function(object,transferData){
if(!this.checkByteArray(object)||!this.isSupportedType(transferData)){
$wt.dnd.DND.error(2003);
}var data=object;
var size=data.length;
},"~O,$wt.dnd.TransferData");
$_V(c$,"nativeToJava",
function(transferData){
if(!this.isSupportedType(transferData)||transferData.pIDataObject==0)return null;
return null;
},"$wt.dnd.TransferData");
$_M(c$,"checkByteArray",
function(object){
return(object!=null&&$_O(object,Array)&&(object).length>0);
},"~O");
});
