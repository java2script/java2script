Clazz.load(["java.lang.reflect.AccessibleObject","$.Member"],"java.lang.reflect.Field",["java.lang.StringBuffer","java.lang.reflect.Modifier","sun.reflect.Reflection"],function(){
c$=$_C(function(){
this.clazz=null;
this.slot=0;
this.name=null;
this.type=null;
this.modifiers=0;
this.fieldAccessor=null;
this.root=null;
this.securityCheckTargetClassCache=null;
$_Z(this,arguments);
},reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
$_K(c$,
function(declaringClass,name,type,modifiers,slot){
$_R(this,java.lang.reflect.Field,[]);
this.clazz=declaringClass;
this.name=name;
this.type=type;
this.modifiers=modifiers;
this.slot=slot;
},"Class,~S,Class,~N,~N");
$_M(c$,"copy",
function(){
var res=new java.lang.reflect.Field(this.clazz,this.name,this.type,this.modifiers,this.slot);
res.root=this;
res.fieldAccessor=this.fieldAccessor;
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
$_M(c$,"getType",
function(){
return this.type;
});
$_V(c$,"equals",
function(obj){
if(obj!=null&&$_O(obj,java.lang.reflect.Field)){
var other=obj;
return(this.getDeclaringClass()==other.getDeclaringClass())&&(this.getName()==other.getName())&&(this.getType()==other.getType());
}return false;
},"~O");
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
$_V(c$,"toString",
function(){
var mod=this.getModifiers();
return(((mod==0)?"":(java.lang.reflect.Modifier.toString(mod)+" "))+java.lang.reflect.Field.getTypeName(this.getType())+" "+java.lang.reflect.Field.getTypeName(this.getDeclaringClass())+"."+this.getName());
});
$_M(c$,"get",
function(obj){
return this.getFieldAccessor(obj).get(obj);
},"~O");
$_M(c$,"getBoolean",
function(obj){
return this.getFieldAccessor(obj).getBoolean(obj);
},"~O");
$_M(c$,"getByte",
function(obj){
return this.getFieldAccessor(obj).getByte(obj);
},"~O");
$_M(c$,"getChar",
function(obj){
return this.getFieldAccessor(obj).getChar(obj);
},"~O");
$_M(c$,"getShort",
function(obj){
return this.getFieldAccessor(obj).getShort(obj);
},"~O");
$_M(c$,"getInt",
function(obj){
return this.getFieldAccessor(obj).getInt(obj);
},"~O");
$_M(c$,"getLong",
function(obj){
return this.getFieldAccessor(obj).getLong(obj);
},"~O");
$_M(c$,"getFloat",
function(obj){
return this.getFieldAccessor(obj).getFloat(obj);
},"~O");
$_M(c$,"getDouble",
function(obj){
return this.getFieldAccessor(obj).getDouble(obj);
},"~O");
$_M(c$,"set",
function(obj,value){
this.getFieldAccessor(obj).set(obj,value);
},"~O,~O");
$_M(c$,"setBoolean",
function(obj,z){
this.getFieldAccessor(obj).setBoolean(obj,z);
},"~O,~B");
$_M(c$,"setByte",
function(obj,b){
this.getFieldAccessor(obj).setByte(obj,b);
},"~O,~N");
$_M(c$,"setChar",
function(obj,c){
this.getFieldAccessor(obj).setChar(obj,c);
},"~O,~N");
$_M(c$,"setShort",
function(obj,s){
this.getFieldAccessor(obj).setShort(obj,s);
},"~O,~N");
$_M(c$,"setInt",
function(obj,i){
this.getFieldAccessor(obj).setInt(obj,i);
},"~O,~N");
$_M(c$,"setLong",
function(obj,l){
this.getFieldAccessor(obj).setLong(obj,l);
},"~O,~N");
$_M(c$,"setFloat",
function(obj,f){
this.getFieldAccessor(obj).setFloat(obj,f);
},"~O,~N");
$_M(c$,"setDouble",
function(obj,d){
this.getFieldAccessor(obj).setDouble(obj,d);
},"~O,~N");
$_M(c$,"acquireFieldAccessor",
($fz=function(){
var tmp=null;
if(this.root!=null)tmp=this.root.getFieldAccessor();
if(tmp!=null){
this.fieldAccessor=tmp;
return;
}},$fz.isPrivate=true,$fz));
c$.getTypeName=$_M(c$,"getTypeName",
function(type){
if(type.isArray()){
try{
var cl=type;
var dimensions=0;
while(cl.isArray()){
dimensions++;
cl=cl.getComponentType();
}
var sb=new StringBuffer();
sb.append(cl.getName());
for(var i=0;i<dimensions;i++){
sb.append("[]");
}
return sb.toString();
}catch(e){
if($_O(e,Throwable)){
}else{
throw e;
}
}
}return type.getName();
},"Class");
});
