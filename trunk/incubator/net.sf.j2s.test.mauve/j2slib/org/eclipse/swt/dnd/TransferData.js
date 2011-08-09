c$=$_C(function(){
this.type=0;
this.result=0;
this.pIDataObject=0;
$_Z(this,arguments);
},$wt.dnd,"TransferData");
c$.sameType=$_M(c$,"sameType",
function(data1,data2){
if(data1===data2)return true;
if(data1==null||data2==null)return false;
return(data1.type==data2.type);
},"$wt.dnd.TransferData,$wt.dnd.TransferData");
