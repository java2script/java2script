$_L(["$wt.events.TypedEvent"],"$wt.events.PaintEvent",null,function(){
c$=$_C(function(){
this.gc=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.count=0;
$_Z(this,arguments);
},$wt.events,"PaintEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.events.PaintEvent,[e]);
this.gc=e.gc;
this.x=e.x;
this.y=e.y;
this.width=e.width;
this.height=e.height;
this.count=e.count;
},"$wt.widgets.Event");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.events.PaintEvent,"toString",[]);
return string.substring(0,string.length-1)+" gc="+this.gc+" x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" count="+this.count+"}";
});
});
