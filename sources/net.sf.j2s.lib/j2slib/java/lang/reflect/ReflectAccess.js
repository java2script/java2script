Clazz.load(["sun.reflect.LangReflectAccess"],"java.lang.reflect.ReflectAccess",["java.lang.reflect.Constructor","$.Field","$.Method"],function(){
c$=$_C(function(){
$_Z(this,arguments);
},reflect,"ReflectAccess",null,sun.reflect.LangReflectAccess);
$_V(c$,"newField",
function(declaringClass,name,type,modifiers,slot){
return new java.lang.reflect.Field(declaringClass,name,type,modifiers,slot);
},"Class,~S,Class,~N,~N");
$_V(c$,"newMethod",
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers,slot){
return new java.lang.reflect.Method(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers,slot);
},"Class,~S,~A,Class,~A,~N,~N");
$_V(c$,"newConstructor",
function(declaringClass,parameterTypes,checkedExceptions,modifiers,slot){
return new java.lang.reflect.Constructor(declaringClass,parameterTypes,checkedExceptions,modifiers,slot);
},"Class,~A,~A,~N,~N");
$_V(c$,"getMethodAccessor",
function(m){
return m.getMethodAccessor();
},"java.lang.reflect.Method");
$_V(c$,"setMethodAccessor",
function(m,accessor){
m.setMethodAccessor(accessor);
},"java.lang.reflect.Method,sun.reflect.MethodAccessor");
$_V(c$,"getConstructorAccessor",
function(c){
return c.getConstructorAccessor();
},"java.lang.reflect.Constructor");
$_V(c$,"setConstructorAccessor",
function(c,accessor){
c.setConstructorAccessor(accessor);
},"java.lang.reflect.Constructor,sun.reflect.ConstructorAccessor");
$_V(c$,"getConstructorSlot",
function(c){
return c.getSlot();
},"java.lang.reflect.Constructor");
$_V(c$,"copyMethod",
function(arg){
return arg.copy();
},"java.lang.reflect.Method");
$_V(c$,"copyField",
function(arg){
return arg.copy();
},"java.lang.reflect.Field");
$_V(c$,"copyConstructor",
function(arg){
return arg.copy();
},"java.lang.reflect.Constructor");
});
