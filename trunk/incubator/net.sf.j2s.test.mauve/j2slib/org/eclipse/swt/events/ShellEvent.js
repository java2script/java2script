$_L(["$wt.events.TypedEvent"],"$wt.events.ShellEvent",null,function(){
c$=$_C(function(){
this.doit=false;
$_Z(this,arguments);
},$wt.events,"ShellEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.ShellEvent,[e]);
this.doit=e.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.ShellEvent,"toString",[]);
return string.substring(0,string.length-1)+" doit="+this.doit+"}";
});
});
