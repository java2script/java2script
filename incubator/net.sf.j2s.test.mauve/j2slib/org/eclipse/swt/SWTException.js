$_L(["java.lang.RuntimeException"],"$wt.SWTException",["$wt.SWT"],function(){
if(typeof window["RuntimeException"]!="undefined"){c$=$_C(function(){
this.code=0;
this.throwable=null;
$_Z(this,arguments);
},$wt,"SWTException",RuntimeException);
$_K(c$,
function(){
this.construct(1);
});
$_K(c$,
function(message){
this.construct(1,message);
},"~S");
$_K(c$,
function(code){
this.construct(code,$WT.findErrorText(code));
},"~N");
$_K(c$,
function(code,message){
$_R(this,$wt.SWTException,[message]);
this.code=code;
},"~N,~S");
$_V(c$,"getCause",
function(){
return this.throwable;
});
$_M(c$,"getMessage",
function(){
if(this.throwable==null)return $_U(this,$wt.SWTException,"getMessage",[]);
return $_U(this,$wt.SWTException,"getMessage",[])+" ("+this.throwable.toString()+")";
});
$_M(c$,"printStackTrace",
function(){
$_U(this,$wt.SWTException,"printStackTrace",[]);
if(this.throwable!=null){
System.err.println("*** Stack trace of contained exception ***");
this.throwable.printStackTrace();
}});

}
});
