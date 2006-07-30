$_L(["java.lang.reflect.AccessibleObject","$.Member","java.lang.Void"],"java.lang.reflect.Method",["java.lang.StringBuffer","java.lang.reflect.Field","$.Modifier","sun.reflect.Reflection"],function(){
c$=$_C(function(){
this.clazz=null;
this.slot=0;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
this.methodAccessor=null;
this.root=null;
this.securityCheckTargetClassCache=null;
$_Z(this,arguments);
},reflect,"Method",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
$_K(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers,slot){
$_R(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
this.slot=slot;
},"Class,~S,~A,Class,~A,~N,~N");
$_M(c$,"copy",
function(){
var res=new java.lang.reflect.Method(this.clazz,this.name,this.parameterTypes,this.returnType,this.exceptionTypes,this.modifiers,this.slot);
res.root=this;
res.methodAccessor=this.methodAccessor;
return res;
});
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_V(c$,"getName",
function(){
return this.name;
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
});
$_M(c$,"getReturnType",
function(){
return this.returnType;
});
$_M(c$,"getParameterTypes",
function(){
return java.lang.reflect.Method.copy(this.parameterTypes);
});
$_M(c$,"getExceptionTypes",
function(){
return java.lang.reflect.Method.copy(this.exceptionTypes);
});
$_V(c$,"equals",
function(obj){
if(obj!=null&&$_O(obj,java.lang.reflect.Method)){
var other=obj;
if((this.getDeclaringClass()==other.getDeclaringClass())&&(this.getName()==other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!=params2[i])return false;
}
return true;
}}}return false;
},"~O");
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
$_V(c$,"toString",
function(){
try{
var sb=new StringBuffer();
var mod=this.getModifiers();
if(mod!=0){
sb.append(java.lang.reflect.Modifier.toString(mod)+" ");
}sb.append(java.lang.reflect.Field.getTypeName(this.getReturnType())+" ");
sb.append(java.lang.reflect.Field.getTypeName(this.getDeclaringClass())+".");
sb.append(this.getName()+"(");
var params=this.parameterTypes;
for(var j=0;j<params.length;j++){
sb.append(java.lang.reflect.Field.getTypeName(params[j]));
if(j<(params.length-1))sb.append(",");
}
sb.append(")");
var exceptions=this.exceptionTypes;
if(exceptions.length>0){
sb.append(" throws ");
for(var k=0;k<exceptions.length;k++){
sb.append(exceptions[k].getName());
if(k<(exceptions.length-1))sb.append(",");
}
}return sb.toString();
}catch(e){
if($_O(e,Exception)){
return"<"+e+">";
}else{
throw e;
}
}
});
$_M(c$,"invoke",
function(obj,args){
var m=this.clazz.prototype[this.name];
if(m==null){
m=this.clazz[this.name];
}
if(m!=null){
m.apply(obj,args);
}else{

}
},"~O,~A");
c$.copy=$_M(c$,"copy",
function($in){
var l=$in.length;
if(l==0)return $in;
var out=new Array(l);
for(var i=0;i<l;i++)out[i]=$in[i];

return out;
},"~A");
});
