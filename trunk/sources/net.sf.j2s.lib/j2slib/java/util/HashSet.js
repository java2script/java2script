Clazz.load(["java.io.Serializable","java.lang.Cloneable","java.util.AbstractSet","$.Set"],"java.util.HashSet",["java.lang.InternalError","java.util.HashMap","$.LinkedHashMap"],function(){
c$=$_C(function(){
this.map=null;
$_Z(this,arguments);
},java.util,"HashSet",java.util.AbstractSet,[java.util.Set,Cloneable,java.io.Serializable]);
$_K(c$,
function(){
$_R(this,java.util.HashSet,[]);
this.map=new java.util.HashMap();
});
$_K(c$,
function(c){
$_R(this,java.util.HashSet,[]);
this.map=new java.util.HashMap(Math.max(parseInt((c.size()/.75))+1,16));
this.addAll(c);
},"java.util.Collection");
$_K(c$,
function(initialCapacity,loadFactor){
$_R(this,java.util.HashSet,[]);
this.map=new java.util.HashMap(initialCapacity,loadFactor);
},"~N,~N");
$_K(c$,
function(initialCapacity){
$_R(this,java.util.HashSet,[]);
this.map=new java.util.HashMap(initialCapacity);
},"~N");
$_K(c$,
function(initialCapacity,loadFactor,dummy){
$_R(this,java.util.HashSet,[]);
this.map=new java.util.LinkedHashMap(initialCapacity,loadFactor);
},"~N,~N,~B");
$_M(c$,"iterator",
function(){
return this.map.keySet().iterator();
});
$_V(c$,"size",
function(){
return this.map.size();
});
$_V(c$,"isEmpty",
function(){
return this.map.isEmpty();
});
$_V(c$,"contains",
function(o){
return this.map.containsKey(o);
},"~O");
$_V(c$,"add",
function(o){
return this.map.put(o,java.util.HashSet.PRESENT)==null;
},"~O");
$_V(c$,"remove",
function(o){
return this.map.remove(o)==java.util.HashSet.PRESENT;
},"~O");
$_V(c$,"clear",
function(){
this.map.clear();
});
$_M(c$,"clone",
function(){
try{
var newSet=$_U(this,java.util.HashSet,"clone",[]);
newSet.map=this.map.clone();
return newSet;
}catch(e){
if($_O(e,CloneNotSupportedException)){
throw new InternalError();
}else{
throw e;
}
}
});
$_S(c$,
"serialVersionUID",-5024744406713321676);
c$.PRESENT=c$.prototype.PRESENT=new Object();
});
