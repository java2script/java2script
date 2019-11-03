$_L(["$wt.events.TypedEvent"],"$wt.events.MenuDetectEvent",null,function(){
c$=$_C(function(){
this.x=0;
this.y=0;
this.doit=false;
$_Z(this,arguments);
},$wt.events,"MenuDetectEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.MenuDetectEvent,[e]);
this.x=e.x;
this.y=e.y;
this.doit=e.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.MenuDetectEvent,"toString",[]);
return string.substring(0,string.length-1)+" x="+this.x+" y="+this.y+" doit="+this.doit+"}";
});
});
