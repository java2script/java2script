$_L(["$wt.events.TypedEvent"],"$wt.events.KeyEvent",null,function(){
c$=$_C(function(){
this.character=0;
this.keyCode=0;
this.stateMask=0;
this.doit=false;
$_Z(this,arguments);
},$wt.events,"KeyEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.KeyEvent,[e]);
this.character=e.character;
this.keyCode=e.keyCode;
this.stateMask=e.stateMask;
this.doit=e.doit;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.KeyEvent,"toString",[]);
return string.substring(0,string.length-1)+" character='"+(((this.character).charCodeAt(0)==0)?"\\0":""+this.character)+"'"+" keyCode="+this.keyCode+" stateMask="+this.stateMask+" doit="+this.doit+"}";
});
});
