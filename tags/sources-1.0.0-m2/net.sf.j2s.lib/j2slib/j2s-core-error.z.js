/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=j2s-core-bare.z.js,j2s-core-basic.z.js,java/lang/Throwable.js,java/lang/StackTraceElement.js,java/lang/Exception.js,java/lang/Error.js,java/lang/RuntimeException.js,java/lang/NullPointerException.js,java/lang/IllegalArgumentException.js,java/util/MissingResourceException.js
=*/
c$=$_C(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
$_Z(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
$_Y(c$,function(){
this.cause=this;
});
$_K(c$,
function(){
this.fillInStackTrace();
});
$_K(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
$_K(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
$_K(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
$_M(c$,"getMessage",
function(){
return this.detailMessage;
});
$_M(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
$_M(c$,"getCause",
function(){
return(this.cause==this?null:this.cause);
});
$_M(c$,"initCause",
function(cause){
if(this.cause!=this)throw new IllegalStateException("Can't overwrite cause");
if(cause==this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
$_V(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.getLocalizedMessage();
return(message!=null)?(s+": "+message):s;
});
$_M(c$,"printStackTrace",
function(){
System.err.println(this);
for(var i=0;i<this.stackTrace.length;i++){
var t=this.stackTrace[i];
var x=t.methodName.indexOf("(");
var n=t.methodName.substring(0,x).replace(/\s+/g,"");
if(n!="construct"||t.nativeClazz==null
||Clazz.getInheritedLevel(t.nativeClazz,Throwable)<0){
System.err.println(t);
}
}
});
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
$_M(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz.callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClazz=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==$_U||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz.callingStackTraces[index].caller;
nativeClazz=Clazz.callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClazz=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClazz=superCaller.exClazz;
}
}
var st=new StackTraceElement();
st.nativeClazz=nativeClazz;
st.declaringClass=(nativeClazz!=null
&&nativeClazz.__CLASS_NAME__.length!=0)?
nativeClazz.__CLASS_NAME__:"anonymous";
st.methodName=((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz.getParamsType(superCaller.arguments)+")";
st.fileName=null;
st.lineNumber=-1;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement();
st.nativeClazz=null;
st.declaringClass="lost";
st.methodName="missing";
st.fileName=null;
st.lineNumber=-3;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz.initializingException=false;
return this;
});
$_M(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");
$_S(c$,
"serialVersionUID",-3042686055658047285);
c$=$_C(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
$_Z(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
$_M(c$,"getFileName",
function(){
return this.fileName;
});
$_M(c$,"getLineNumber",
function(){
return this.lineNumber;
});
$_M(c$,"getClassName",
function(){
return this.declaringClass;
});
$_M(c$,"getMethodName",
function(){
return this.methodName;
});
$_M(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
$_V(c$,"toString",
function(){
if(this.lineNumber==-3){
return"... stack information lost as recursive invocation existed ...";
}return this.getClassName()+"."+this.methodName;
});
$_M(c$,"equals",
function(obj){
if(obj==this)return true;
if(!($_O(obj,StackTraceElement)))return false;
var e=obj;
return e.declaringClass.equals(this.declaringClass)&&e.lineNumber==this.lineNumber&&StackTraceElement.eq(this.methodName,e.methodName)&&StackTraceElement.eq(this.fileName,e.fileName);
},"~O");
c$.eq=$_M(c$,"eq",
($fz=function(a,b){
return a==b||(a!=null&&a.equals(b));
},$fz.isPrivate=true,$fz),"~O,~O");
$_V(c$,"hashCode",
function(){
var result=31*this.declaringClass.hashCode()+this.methodName.hashCode();
result=31*result+(this.fileName==null?0:this.fileName.hashCode());
result=31*result+this.lineNumber;
return result;
});
$_S(c$,
"serialVersionUID",6992337162326171013);
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"Exception",Throwable);
$_K(c$,
function(){
$_R(this,Exception);
});
$_K(c$,
function(message){
$_R(this,Exception,[message]);
},"~S");
$_K(c$,
function(message,cause){
$_R(this,Exception,[message,cause]);
},"~S,Throwable");
$_K(c$,
function(cause){
$_R(this,Exception,[cause]);
},"Throwable");
$_S(c$,
"serialVersionUID",-3387516993124229948);
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"Error",Throwable);
$_K(c$,
function(){
$_R(this,Error);
});
$_K(c$,
function(message){
$_R(this,Error,[message]);
},"~S");
$_K(c$,
function(message,cause){
$_R(this,Error,[message,cause]);
},"~S,Throwable");
$_K(c$,
function(cause){
$_R(this,Error,[cause]);
},"Throwable");
$_S(c$,
"serialVersionUID",4980196508277280342);
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"RuntimeException",Exception);
$_K(c$,
function(){
$_R(this,RuntimeException);
});
$_K(c$,
function(message){
$_R(this,RuntimeException,[message]);
},"~S");
$_K(c$,
function(message,cause){
$_R(this,RuntimeException,[message,cause]);
},"~S,Throwable");
$_K(c$,
function(cause){
$_R(this,RuntimeException,[cause]);
},"Throwable");
$_S(c$,
"serialVersionUID",-7034897190745766939);
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"NullPointerException",RuntimeException);
$_K(c$,
function(){
$_R(this,NullPointerException);
});
$_K(c$,
function(s){
$_R(this,NullPointerException,[s]);
},"~S");
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"IllegalArgumentException",RuntimeException);
$_K(c$,
function(){
$_R(this,IllegalArgumentException);
});
$_K(c$,
function(s){
$_R(this,IllegalArgumentException,[s]);
},"~S");
$_J("java.util");
c$=$_C(function(){
this.className=null;
this.key=null;
$_Z(this,arguments);
},java.util,"MissingResourceException",RuntimeException);
$_K(c$,
function(s,className,key){
$_R(this,java.util.MissingResourceException,[s]);
this.className=className;
this.key=key;
},"~S,~S,~S");
$_M(c$,"getClassName",
function(){
return this.className;
});
$_M(c$,"getKey",
function(){
return this.key;
});
