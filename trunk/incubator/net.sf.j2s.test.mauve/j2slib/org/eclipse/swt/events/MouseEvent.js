$_L(["$wt.events.TypedEvent"],"$wt.events.MouseEvent",null,function(){
c$=$_C(function(){
this.button=0;
this.stateMask=0;
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.events,"MouseEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.MouseEvent,[e]);
this.x=e.x;
this.y=e.y;
this.button=e.button;
this.stateMask=e.stateMask;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.MouseEvent,"toString",[]);
return string.substring(0,string.length-1)+" button="+this.button+" stateMask="+this.stateMask+" x="+this.x+" y="+this.y+"}";
});
});
