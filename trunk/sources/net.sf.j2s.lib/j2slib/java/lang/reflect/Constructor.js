Clazz.load(["java.lang.reflect.AccessibleObject","$.Member","java.lang.Void"],"java.lang.reflect.Constructor",["java.lang.StringBuffer","java.lang.reflect.Field","$.Method","$.Modifier","sun.reflect.Reflection"],function(){
c$=$_C(function(){
this.clazz=null;
this.slot=0;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
this.constructorAccessor=null;
this.root=null;
$_Z(this,arguments);
},reflect,"Constructor",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
$_K(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers,slot){
$_R(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
this.slot=slot;
},"Class,~A,~A,~N,~N");
$_M(c$,"copy",
function(){
var res=new java.lang.reflect.Constructor(this.clazz,this.parameterTypes,this.exceptionTypes,this.modifiers,this.slot);
res.root=this;
res.constructorAccessor=this.constructorAccessor;
return res;
});
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_V(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
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
if(obj!=null&&$_O(obj,java.lang.reflect.Constructor)){
var other=obj;
if(this.getDeclaringClass()==other.getDeclaringClass()){
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
return this.getDeclaringClass().getName().hashCode();
});
$_V(c$,"toString",
function(){
try{
var sb=new StringBuffer();
var mod=this.getModifiers();
if(mod!=0){
sb.append(java.lang.reflect.Modifier.toString(mod)+" ");
}sb.append(java.lang.reflect.Field.getTypeName(this.getDeclaringClass()));
sb.append("(");
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
if($_O(e,java.lang.Exception)){
return"<"+e+">";
}else{
throw e;
}
}
});
$_M(c$,"newInstance",
function(initargs){
var instance=new this.clazz($_G);
$_Z(instance,initargs);
return instance;
},"~A");
});
