$_L(["$wt.events.KeyEvent"],"$wt.events.TraverseEvent",null,function(){
c$=$_C(function(){
this.detail=0;
$_Z(this,arguments);
},$wt.events,"TraverseEvent",$wt.events.KeyEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.TraverseEvent,[e]);
this.detail=e.detail;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.TraverseEvent,"toString",[]);
return string.substring(0,string.length-1)+" detail="+this.detail+"}";
});
});
