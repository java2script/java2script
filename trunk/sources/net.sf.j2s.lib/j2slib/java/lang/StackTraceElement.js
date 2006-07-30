$_L(["java.io.Serializable"],"java.lang.StackTraceElement",null,function(){
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
});
