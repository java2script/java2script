$_L(null,"java.lang.reflect.AccessibleObject",["java.lang.SecurityException"],function(){
c$=$_C(function(){
this.securityCheckCache=null;
this.override=false;
$_Z(this,arguments);
},reflect,"AccessibleObject");
c$.setAccessible=$_M(c$,"setAccessible",
function(array,flag){
var sm=System.getSecurityManager();
for(var i=0;i<array.length;i++){
java.lang.reflect.AccessibleObject.setAccessible0(array[i],flag);
}
},"~A,~B");
$_M(c$,"setAccessible",
function(flag){
var sm=System.getSecurityManager();
java.lang.reflect.AccessibleObject.setAccessible0(this,flag);
},"~B");
c$.setAccessible0=$_M(c$,"setAccessible0",
($fz=function(obj,flag){
if($_O(obj,java.lang.reflect.Constructor)&&flag==true){
var c=obj;
if(c.getDeclaringClass()==Class){
throw new SecurityException("Can not make a java.lang.Class"+" constructor accessible");
}}obj.override=flag;
},$fz.isPrivate=true,$fz),"java.lang.reflect.AccessibleObject,~B");
$_M(c$,"isAccessible",
function(){
return this.override;
});
$_K(c$,
function(){
});
});
