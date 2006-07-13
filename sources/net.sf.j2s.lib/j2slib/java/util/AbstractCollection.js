Clazz.load(["java.util.Collection"],"java.util.AbstractCollection",["java.lang.StringBuffer","$.UnsupportedOperationException","java.lang.reflect.Array"],function(){
java.lang.reflect.Array={
newInstance:function(type,size){
return new Array(size);
}
};
Array.getComponentType=function(){
return Object;
};c$=$_C(function(){
$_Z(this,arguments);
},java.util,"AbstractCollection",null,java.util.Collection);
$_K(c$,
function(){
});
$_V(c$,"isEmpty",
function(){
return this.size()==0;
});
$_M(c$,"contains",
function(o){
var e=this.iterator();
if(o==null){
while(e.hasNext())if(e.next()==null)return true;

}else{
while(e.hasNext())if(o.equals(e.next()))return true;

}return false;
},"~O");
$_M(c$,"toArray",
function(){
var result=new Array(this.size());
var e=this.iterator();
for(var i=0;e.hasNext();i++)result[i]=e.next();

return result;
});
$_M(c$,"toArray",
function(a){
var size=this.size();
if(a.length<size)a=java.lang.reflect.Array.newInstance(a.getClass().getComponentType(),size);
var it=this.iterator();
for(var i=0;i<size;i++)a[i]=it.next();

if(a.length>size)a[size]=null;
return a;
},"~A");
$_V(c$,"add",
function(o){
throw new UnsupportedOperationException();
},"~O");
$_V(c$,"remove",
function(o){
var e=this.iterator();
if(o==null){
while(e.hasNext()){
if(e.next()==null){
e.remove();
return true;
}}
}else{
while(e.hasNext()){
if(o.equals(e.next())){
e.remove();
return true;
}}
}return false;
},"~O");
$_V(c$,"containsAll",
function(c){
var e=c.iterator();
while(e.hasNext())if(!this.contains(e.next()))return false;

return true;
},"java.util.Collection");
$_V(c$,"addAll",
function(c){
var modified=false;
var e=c.iterator();
while(e.hasNext()){
if(this.add(e.next()))modified=true;
}
return modified;
},"java.util.Collection");
$_V(c$,"removeAll",
function(c){
var modified=false;
var e=this.iterator();
while(e.hasNext()){
if(c.contains(e.next())){
e.remove();
modified=true;
}}
return modified;
},"java.util.Collection");
$_V(c$,"retainAll",
function(c){
var modified=false;
var e=this.iterator();
while(e.hasNext()){
if(!c.contains(e.next())){
e.remove();
modified=true;
}}
return modified;
},"java.util.Collection");
$_V(c$,"clear",
function(){
var e=this.iterator();
while(e.hasNext()){
e.next();
e.remove();
}
});
$_V(c$,"toString",
function(){
var buf=new StringBuffer();
buf.append("[");
var i=this.iterator();
var hasNext=i.hasNext();
while(hasNext){
var o=i.next();
buf.append(o==this?"(this Collection)":String.valueOf(o));
hasNext=i.hasNext();
if(hasNext)buf.append(", ");
}
buf.append("]");
return buf.toString();
});
});
