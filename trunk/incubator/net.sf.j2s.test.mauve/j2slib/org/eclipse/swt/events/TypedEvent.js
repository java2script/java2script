$_L(["$wt.internal.SWTEventObject"],"$wt.events.TypedEvent",null,function(){
c$=$_C(function(){
this.display=null;
this.widget=null;
this.time=0;
this.data=null;
$_Z(this,arguments);
},$wt.events,"TypedEvent",$wt.internal.SWTEventObject);
$_K(c$,
function(e){
$_R(this,$wt.events.TypedEvent,[e.widget]);
this.display=e.display;
this.widget=e.widget;
this.time=e.time;
this.data=e.data;
},"$wt.widgets.Event");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
return this.getName()+"{"+this.widget+" time="+this.time+" data="+this.data+"}";
});
});
