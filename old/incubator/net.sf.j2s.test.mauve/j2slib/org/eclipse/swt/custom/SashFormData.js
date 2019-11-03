c$=$_C(function(){
this.weight=0;
$_Z(this,arguments);
},$wt.custom,"SashFormData");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
return this.getName()+" {weight="+this.weight+"}";
});
