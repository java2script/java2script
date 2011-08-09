$_L(["$wt.events.KeyEvent"],"$wt.events.VerifyEvent",null,function(){
c$=$_C(function(){
this.start=0;
this.end=0;
this.text=null;
$_Z(this,arguments);
},$wt.events,"VerifyEvent",$wt.events.KeyEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.VerifyEvent,[e]);
this.character=e.character;
this.keyCode=e.keyCode;
this.stateMask=e.stateMask;
this.start=e.start;
this.end=e.end;
this.text=e.text;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.VerifyEvent,"toString",[]);
return string.substring(0,string.length-1)+" start="+this.start+" end="+this.end+" text="+this.text+"}";
});
});
