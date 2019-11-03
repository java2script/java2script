$_L(["java.lang.Error"],"$wt.SWTError",["$wt.SWT"],function(){
c$=$_C(function(){
this.code=0;
this.throwable=null;
$_Z(this,arguments);
},$wt,"SWTError",Error);
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
$_R(this,$wt.SWTError,[message]);
this.code=code;
},"~N,~S");
$_V(c$,"getCause",
function(){
return this.throwable;
});
$_M(c$,"getMessage",
function(){
if(this.throwable==null)return $_U(this,$wt.SWTError,"getMessage",[]);
return $_U(this,$wt.SWTError,"getMessage",[])+" ("+this.throwable.toString()+")";
});
$_M(c$,"printStackTrace",
function(){
$_U(this,$wt.SWTError,"printStackTrace",[]);
if(this.throwable!=null){
System.err.println("*** Stack trace of contained error ***");
this.throwable.printStackTrace();
}});
});
