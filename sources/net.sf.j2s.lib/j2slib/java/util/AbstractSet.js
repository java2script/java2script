$_L(["java.util.AbstractCollection","$.Set"],"java.util.AbstractSet",null,function(){
c$=$_T(java.util,"AbstractSet",java.util.AbstractCollection,java.util.Set);
$_K(c$,
function(){
$_R(this,java.util.AbstractSet,[]);
});
$_V(c$,"equals",
function(o){
if(o==this)return true;
if(!($_O(o,java.util.Set)))return false;
var c=o;
if(c.size()!=this.size())return false;
try{
return this.containsAll(c);
}catch(e){
if($_O(e,ClassCastException)){
return false;
}else if($_O(e,NullPointerException)){
return false;
}else{
throw e;
}
}
},"~O");
$_V(c$,"hashCode",
function(){
var h=0;
var i=this.iterator();
while(i.hasNext()){
var obj=i.next();
if(obj!=null)h+=obj.hashCode();
}
return h;
});
$_V(c$,"removeAll",
function(c){
var modified=false;
if(this.size()>c.size()){
for(var i=c.iterator();i.hasNext();)modified=new Boolean(modified|this.remove(i.next())).valueOf();

}else{
for(var i=this.iterator();i.hasNext();){
if(c.contains(i.next())){
i.remove();
modified=true;
}}
}return modified;
},"java.util.Collection");
});
