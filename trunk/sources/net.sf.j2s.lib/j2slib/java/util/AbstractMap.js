Clazz.load(["java.util.Map"],"java.util.AbstractMap",["java.lang.StringBuffer","$.UnsupportedOperationException","java.util.AbstractCollection","$.AbstractSet","$.Iterator"],function(){
c$=$_C(function(){
this.$keySet=null;
this.$values=null;
$_Z(this,arguments);
},java.util,"AbstractMap",null,java.util.Map);
$_H();
c$=$_C(function(){
this.key=null;
this.value=null;
$_Z(this,arguments);
},java.util.AbstractMap,"SimpleEntry",null,java.util.Map.Entry);
$_K(c$,
function(a,b){
this.key=a;
this.value=b;
},"~O,~O");
$_K(c$,
function(a){
this.key=a.getKey();
this.value=a.getValue();
},"java.util.Map.Entry");
$_M(c$,"getKey",
function(){
return this.key;
});
$_M(c$,"getValue",
function(){
return this.value;
});
$_V(c$,"setValue",
function(a){
var b=this.value;
this.value=a;
return b;
},"~O");
$_V(c$,"equals",
function(a){
if(!($_O(a,java.util.Map.Entry)))return false;
var b=a;
return java.util.AbstractMap.SimpleEntry.eq(this.key,b.getKey())&&java.util.AbstractMap.SimpleEntry.eq(this.value,b.getValue());
},"~O");
$_V(c$,"hashCode",
function(){
var a;
return((this.key==null)?0:this.key.hashCode())^((this.value==null)?0:this.value.hashCode());
});
$_V(c$,"toString",
function(){
return this.key+"="+this.value;
});
c$.eq=$_M(c$,"eq",
($fz=function(a,b){
return(a==null?b==null:a.equals(b));
},$fz.isPrivate=true,$fz),"~O,~O");
c$=$_P();
$_K(c$,
function(){
});
$_M(c$,"size",
function(){
return this.entrySet().size();
});
$_V(c$,"isEmpty",
function(){
return this.size()==0;
});
$_V(c$,"containsValue",
function(value){
var i=this.entrySet().iterator();
if(value==null){
while(i.hasNext()){
var e=i.next();
if(e.getValue()==null)return true;
}
}else{
while(i.hasNext()){
var e=i.next();
if(value.equals(e.getValue()))return true;
}
}return false;
},"~O");
$_M(c$,"containsKey",
function(key){
var i=this.entrySet().iterator();
if(key==null){
while(i.hasNext()){
var e=i.next();
if(e.getKey()==null)return true;
}
}else{
while(i.hasNext()){
var e=i.next();
if(key.equals(e.getKey()))return true;
}
}return false;
},"~O");
$_M(c$,"get",
function(key){
var i=this.entrySet().iterator();
if(key==null){
while(i.hasNext()){
var e=i.next();
if(e.getKey()==null)return e.getValue();
}
}else{
while(i.hasNext()){
var e=i.next();
if(key.equals(e.getKey()))return e.getValue();
}
}return null;
},"~O");
$_V(c$,"put",
function(key,value){
throw new java.lang.UnsupportedOperationException();
},"~O,~O");
$_V(c$,"remove",
function(key){
var i=this.entrySet().iterator();
var correctEntry=null;
if(key==null){
while(correctEntry==null&&i.hasNext()){
var e=i.next();
if(e.getKey()==null)correctEntry=e;
}
}else{
while(correctEntry==null&&i.hasNext()){
var e=i.next();
if(key.equals(e.getKey()))correctEntry=e;
}
}var oldValue=null;
if(correctEntry!=null){
oldValue=correctEntry.getValue();
i.remove();
}return oldValue;
},"~O");
$_V(c$,"putAll",
function(t){
var i=t.entrySet().iterator();
while(i.hasNext()){
var e=i.next();
this.put(e.getKey(),e.getValue());
}
},"java.util.Map");
$_V(c$,"clear",
function(){
this.entrySet().clear();
});
$_V(c$,"keySet",
function(){
if(this.$keySet==null){
this.$keySet=(function(i$,v$){
if(!$_D("java.util.AbstractMap$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util,"AbstractMap$1",java.util.AbstractSet);
$_M(c$,"iterator",
function(){
return(function(i$,v$){
if(!$_D("java.util.AbstractMap$1$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.i=null;
$_Z(this,arguments);
},java.util,"AbstractMap$1$2",null,java.util.Iterator);
$_Y(c$,function(){
this.i=this.b$["java.util.AbstractMap"].entrySet().iterator();
});
$_M(c$,"hasNext",
function(){
return this.i.hasNext();
});
$_M(c$,"next",
function(){
return(this.i.next()).getKey();
});
$_M(c$,"remove",
function(){
this.i.remove();
});
c$=$_P();
}
return $_N(java.util.AbstractMap$1$2,i$,v$);
})(this,null);
});
$_M(c$,"size",
function(){
return this.b$["java.util.AbstractMap"].size();
});
$_V(c$,"contains",
function(k){
return this.b$["java.util.AbstractMap"].containsKey(k);
},"~O");
c$=$_P();
}
return $_N(java.util.AbstractMap$1,i$,v$);
})(this,null);
}return this.$keySet;
});
$_V(c$,"values",
function(){
if(this.$values==null){
this.$values=(function(i$,v$){
if(!$_D("java.util.AbstractMap$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util,"AbstractMap$3",java.util.AbstractCollection);
$_V(c$,"iterator",
function(){
return(function(i$,v$){
if(!$_D("java.util.AbstractMap$3$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.i=null;
$_Z(this,arguments);
},java.util,"AbstractMap$3$4",null,java.util.Iterator);
$_Y(c$,function(){
this.i=this.b$["java.util.AbstractMap"].entrySet().iterator();
});
$_M(c$,"hasNext",
function(){
return this.i.hasNext();
});
$_M(c$,"next",
function(){
return(this.i.next()).getValue();
});
$_M(c$,"remove",
function(){
this.i.remove();
});
c$=$_P();
}
return $_N(java.util.AbstractMap$3$4,i$,v$);
})(this,null);
});
$_V(c$,"size",
function(){
return this.b$["java.util.AbstractMap"].size();
});
$_V(c$,"contains",
function(v){
return this.b$["java.util.AbstractMap"].containsValue(v);
},"~O");
c$=$_P();
}
return $_N(java.util.AbstractMap$3,i$,v$);
})(this,null);
}return this.$values;
});
$_V(c$,"equals",
function(o){
if(o==this)return true;
if(!($_O(o,java.util.Map)))return false;
var t=o;
if(t.size()!=this.size())return false;
try{
var i=this.entrySet().iterator();
while(i.hasNext()){
var e=i.next();
var key=e.getKey();
var value=e.getValue();
if(value==null){
if(!(t.get(key)==null&&t.containsKey(key)))return false;
}else{
if(!value.equals(t.get(key)))return false;
}}
}catch(e){
if($_O(e,java.lang.ClassCastException)){
return false;
}else if($_O(e,java.lang.NullPointerException)){
return false;
}else{
throw e;
}
}
return true;
},"~O");
$_V(c$,"hashCode",
function(){
var h=0;
var i=this.entrySet().iterator();
while(i.hasNext())h+=i.next().hashCode();

return h;
});
$_V(c$,"toString",
function(){
var buf=new StringBuffer();
buf.append("{");
var i=this.entrySet().iterator();
var hasNext=i.hasNext();
while(hasNext){
var e=(i.next());
var key=e.getKey();
var value=e.getValue();
buf.append((key==this?"(this Map)":key)+"="+(value==this?"(this Map)":value));
hasNext=i.hasNext();
if(hasNext)buf.append(", ");
}
buf.append("}");
return buf.toString();
});
$_M(c$,"clone",
function(){
var result=$_U(this,java.util.AbstractMap,"clone",[]);
result.$keySet=null;
result.$values=null;
return result;
});
});
