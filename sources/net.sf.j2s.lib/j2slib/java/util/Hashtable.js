$_L(["java.io.Serializable","java.lang.Cloneable","java.util.AbstractCollection","$.AbstractSet","$.Dictionary","$.Enumeration","$.Iterator","$.Map"],"java.util.Hashtable",["java.lang.Float","$.IllegalArgumentException","$.IllegalStateException","$.InternalError","$.NullPointerException","$.StringBuffer","$.UnsupportedOperationException","java.util.Collections","$.ConcurrentModificationException","$.NoSuchElementException"],function(){
c$=$_C(function(){
this.table=null;
this.count=0;
this.threshold=0;
this.loadFactor=0;
this.modCount=0;
this.$keySet=null;
this.$entrySet=null;
this.$values=null;
if(!$_D("java.util.Hashtable.KeySet")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.Hashtable,"KeySet",java.util.AbstractSet);
$_V(c$,"iterator",
function(){
return this.b$["java.util.Hashtable"].getIterator(0);
});
$_V(c$,"size",
function(){
return this.b$["java.util.Hashtable"].count;
});
$_V(c$,"contains",
function(a){
return this.b$["java.util.Hashtable"].containsKey(a);
},"~O");
$_V(c$,"remove",
function(a){
return this.b$["java.util.Hashtable"].remove(a)!=null;
},"~O");
$_V(c$,"clear",
function(){
this.b$["java.util.Hashtable"].clear();
});
c$=$_P();
}
if(!$_D("java.util.Hashtable.EntrySet")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.Hashtable,"EntrySet",java.util.AbstractSet);
$_V(c$,"iterator",
function(){
return this.b$["java.util.Hashtable"].getIterator(2);
});
$_V(c$,"contains",
function(a){
if(!($_O(a,java.util.Map.Entry)))return false;
var b=a;
var c=b.getKey();
var d=this.b$["java.util.Hashtable"].table;
var e=c.hashCode();
var f=(e&0x7FFFFFFF)%d.length;
for(var g=d[f];g!=null;g=g.next)if(g.hash==e&&g.equals(b))return true;

return false;
},"~O");
$_V(c$,"remove",
function(a){
if(!($_O(a,java.util.Map.Entry)))return false;
var b=a;
var c=b.getKey();
var d=this.b$["java.util.Hashtable"].table;
var e=c.hashCode();
var f=(e&0x7FFFFFFF)%d.length;
for(var g=d[f],h=null;g!=null;h=g,g=g.next){
if(g.hash==e&&g.equals(b)){
this.b$["java.util.Hashtable"].modCount++;
if(h!=null)h.next=g.next;
else d[f]=g.next;
this.b$["java.util.Hashtable"].count--;
g.value=null;
return true;
}}
return false;
},"~O");
$_V(c$,"size",
function(){
return this.b$["java.util.Hashtable"].count;
});
$_V(c$,"clear",
function(){
this.b$["java.util.Hashtable"].clear();
});
c$=$_P();
}
if(!$_D("java.util.Hashtable.ValueCollection")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.Hashtable,"ValueCollection",java.util.AbstractCollection);
$_V(c$,"iterator",
function(){
return this.b$["java.util.Hashtable"].getIterator(1);
});
$_V(c$,"size",
function(){
return this.b$["java.util.Hashtable"].count;
});
$_V(c$,"contains",
function(a){
return this.b$["java.util.Hashtable"].containsValue(a);
},"~O");
$_V(c$,"clear",
function(){
this.b$["java.util.Hashtable"].clear();
});
c$=$_P();
}
if(!$_D("java.util.Hashtable.Enumerator")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.table=null;
this.index=0;
this.entry=null;
this.lastReturned=null;
this.type=0;
this.iterator=false;
this.expectedModCount=0;
$_Z(this,arguments);
},java.util.Hashtable,"Enumerator",null,[java.util.Enumeration,java.util.Iterator]);
$_Y(c$,function(){
this.table=this.b$["java.util.Hashtable"].table;
this.index=this.table.length;
this.expectedModCount=this.b$["java.util.Hashtable"].modCount;
});
$_K(c$,
function(a,b){
this.type=a;
this.iterator=b;
},"~N,~B");
$_V(c$,"hasMoreElements",
function(){
var a=this.entry;
var b=this.index;
var c=this.table;
while(a==null&&b>0){
a=c[--b];
}
this.entry=a;
this.index=b;
return a!=null;
});
$_V(c$,"nextElement",
function(){
var a=this.entry;
var b=this.index;
var c=this.table;
while(a==null&&b>0){
a=c[--b];
}
this.entry=a;
this.index=b;
if(a!=null){
var d=this.lastReturned=this.entry;
this.entry=d.next;
return this.type==0?d.key:(this.type==1?d.value:d);
}throw new java.util.NoSuchElementException("Hashtable Enumerator");
});
$_V(c$,"hasNext",
function(){
return this.hasMoreElements();
});
$_V(c$,"next",
function(){
if(this.b$["java.util.Hashtable"].modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
return this.nextElement();
});
$_V(c$,"remove",
function(){
if(!this.iterator)throw new UnsupportedOperationException();
if(this.lastReturned==null)throw new IllegalStateException("Hashtable Enumerator");
if(this.b$["java.util.Hashtable"].modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
{
var a=this.b$["java.util.Hashtable"].table;
var b=(this.lastReturned.hash&0x7FFFFFFF)%a.length;
for(var c=a[b],d=null;c!=null;d=c,c=c.next){
if(c==this.lastReturned){
this.b$["java.util.Hashtable"].modCount++;
this.expectedModCount++;
if(d==null)a[b]=c.next;
else d.next=c.next;
this.b$["java.util.Hashtable"].count--;
this.lastReturned=null;
return;
}}
throw new java.util.ConcurrentModificationException();
}});
c$=$_P();
}
$_Z(this,arguments);
},java.util,"Hashtable",java.util.Dictionary,[java.util.Map,Cloneable,java.io.Serializable]);
$_H();
c$=$_C(function(){
this.hash=0;
this.key=null;
this.value=null;
this.next=null;
$_Z(this,arguments);
},java.util.Hashtable,"Entry",null,java.util.Map.Entry);
$_K(c$,
function(a,b,c,d){
this.hash=a;
this.key=b;
this.value=c;
this.next=d;
},"~N,~O,~O,java.util.Hashtable.Entry");
$_V(c$,"clone",
function(){
return new java.util.Hashtable.Entry(this.hash,this.key,this.value,(this.next==null?null:this.next.clone()));
});
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
if(a==null)throw new NullPointerException();
var b=this.value;
this.value=a;
return b;
},"~O");
$_V(c$,"equals",
function(a){
if(!($_O(a,java.util.Map.Entry)))return false;
var b=a;
return(this.key==null?b.getKey()==null:this.key.equals(b.getKey()))&&(this.value==null?b.getValue()==null:this.value.equals(b.getValue()));
},"~O");
$_V(c$,"hashCode",
function(){
return this.hash^(this.value==null?0:this.value.hashCode());
});
$_M(c$,"toString",
function(){
return this.key.toString()+"="+this.value.toString();
});
c$=$_P();
$_H();
c$=$_T(java.util.Hashtable,"EmptyEnumerator",null,java.util.Enumeration);
$_K(c$,
function(){
});
$_V(c$,"hasMoreElements",
function(){
return false;
});
$_V(c$,"nextElement",
function(){
throw new java.util.NoSuchElementException("Hashtable Enumerator");
});
c$=$_P();
$_H();
c$=$_T(java.util.Hashtable,"EmptyIterator",null,java.util.Iterator);
$_K(c$,
function(){
});
$_V(c$,"hasNext",
function(){
return false;
});
$_V(c$,"next",
function(){
throw new java.util.NoSuchElementException("Hashtable Iterator");
});
$_V(c$,"remove",
function(){
throw new IllegalStateException("Hashtable Iterator");
});
c$=$_P();
$_K(c$,
function(initialCapacity,loadFactor){
$_R(this,java.util.Hashtable,[]);
if(initialCapacity<0)throw new IllegalArgumentException("Illegal Capacity: "+initialCapacity);
if(loadFactor<=0||Float.isNaN(loadFactor))throw new IllegalArgumentException("Illegal Load: "+loadFactor);
if(initialCapacity==0)initialCapacity=1;
this.loadFactor=loadFactor;
this.table=new Array(initialCapacity);
this.threshold=Math.round((initialCapacity*loadFactor));
},"~N,~N");
$_K(c$,
function(initialCapacity){
this.construct(initialCapacity,0.75);
},"~N");
$_K(c$,
function(){
this.construct(11,0.75);
});
$_K(c$,
function(t){
this.construct(Math.max(2*t.size(),11),0.75);
this.putAll(t);
},"java.util.Map");
$_M(c$,"size",
function(){
return this.count;
});
$_V(c$,"isEmpty",
function(){
return this.count==0;
});
$_V(c$,"keys",
function(){
return this.getEnumeration(0);
});
$_V(c$,"elements",
function(){
return this.getEnumeration(1);
});
$_M(c$,"contains",
function(value){
if(value==null){
throw new NullPointerException();
}var tab=this.table;
for(var i=tab.length;i-->0;){
for(var e=tab[i];e!=null;e=e.next){
if(e.value.equals(value)){
return true;
}}
}
return false;
},"~O");
$_V(c$,"containsValue",
function(value){
return this.contains(value);
},"~O");
$_M(c$,"containsKey",
function(key){
var tab=this.table;
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%tab.length;
for(var e=tab[index];e!=null;e=e.next){
if((e.hash==hash)&&e.key.equals(key)){
return true;
}}
return false;
},"~O");
$_M(c$,"get",
function(key){
var tab=this.table;
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%tab.length;
for(var e=tab[index];e!=null;e=e.next){
if((e.hash==hash)&&e.key.equals(key)){
return e.value;
}}
return null;
},"~O");
$_M(c$,"rehash",
function(){
var oldCapacity=this.table.length;
var oldMap=this.table;
var newCapacity=oldCapacity*2+1;
var newMap=new Array(newCapacity);
this.modCount++;
this.threshold=Math.round((newCapacity*this.loadFactor));
this.table=newMap;
for(var i=oldCapacity;i-->0;){
for(var old=oldMap[i];old!=null;){
var e=old;
old=old.next;
var index=(e.hash&0x7FFFFFFF)%newCapacity;
e.next=newMap[index];
newMap[index]=e;
}
}
});
$_V(c$,"put",
function(key,value){
if(value==null){
throw new NullPointerException();
}var tab=this.table;
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%tab.length;
for(var e=tab[index];e!=null;e=e.next){
if((e.hash==hash)&&e.key.equals(key)){
var old=e.value;
e.value=value;
return old;
}}
this.modCount++;
if(this.count>=this.threshold){
this.rehash();
tab=this.table;
index=(hash&0x7FFFFFFF)%tab.length;
}var e=new java.util.Hashtable.Entry(hash,key,value,tab[index]);
tab[index]=e;
this.count++;
return null;
},"~O,~O");
$_V(c$,"remove",
function(key){
var tab=this.table;
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%tab.length;
for(var e=tab[index],prev=null;e!=null;prev=e,e=e.next){
if((e.hash==hash)&&e.key.equals(key)){
this.modCount++;
if(prev!=null){
prev.next=e.next;
}else{
tab[index]=e.next;
}this.count--;
var oldValue=e.value;
e.value=null;
return oldValue;
}}
return null;
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
var tab=this.table;
this.modCount++;
for(var index=tab.length;--index>=0;)tab[index]=null;

this.count=0;
});
$_M(c$,"clone",
function(){
try{
var t=$_U(this,java.util.Hashtable,"clone",[]);
t.table=new Array(this.table.length);
for(var i=this.table.length;i-->0;){
t.table[i]=(this.table[i]!=null)?this.table[i].clone():null;
}
t.$keySet=null;
t.$entrySet=null;
t.$values=null;
t.modCount=0;
return t;
}catch(e){
if($_O(e,CloneNotSupportedException)){
throw new InternalError();
}else{
throw e;
}
}
});
$_M(c$,"toString",
function(){
var max=this.size()-1;
var buf=new StringBuffer();
var it=this.entrySet().iterator();
buf.append("{");
for(var i=0;i<=max;i++){
var e=(it.next());
var key=e.getKey();
var value=e.getValue();
buf.append((key==this?"(this Map)":key)+"="+(value==this?"(this Map)":value));
if(i<max)buf.append(", ");
}
buf.append("}");
return buf.toString();
});
$_M(c$,"getEnumeration",
($fz=function(type){
if(this.count==0){
return java.util.Hashtable.emptyEnumerator;
}else{
return $_N(java.util.Hashtable.Enumerator,this,null,type,false);
}},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getIterator",
($fz=function(type){
if(this.count==0){
return java.util.Hashtable.emptyIterator;
}else{
return $_N(java.util.Hashtable.Enumerator,this,null,type,true);
}},$fz.isPrivate=true,$fz),"~N");
$_V(c$,"keySet",
function(){
if(this.$keySet==null)this.$keySet=java.util.Collections.synchronizedSet($_N(java.util.Hashtable.KeySet,this,null),this);
return this.$keySet;
});
$_M(c$,"entrySet",
function(){
if(this.$entrySet==null)this.$entrySet=java.util.Collections.synchronizedSet($_N(java.util.Hashtable.EntrySet,this,null),this);
return this.$entrySet;
});
$_V(c$,"values",
function(){
if(this.$values==null)this.$values=java.util.Collections.synchronizedCollection($_N(java.util.Hashtable.ValueCollection,this,null),this);
return this.$values;
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
if($_O(e,ClassCastException)){
return false;
}else if($_O(e,NullPointerException)){
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
if(this.count==0||this.loadFactor<0)return h;
this.loadFactor=-this.loadFactor;
var tab=this.table;
for(var i=0;i<tab.length;i++)for(var e=tab[i];e!=null;e=e.next)h+=e.key.hashCode()^e.value.hashCode();


this.loadFactor=-this.loadFactor;
return h;
});
$_S(c$,
"KEYS",0,
"VALUES",1,
"ENTRIES",2);
c$.emptyEnumerator=c$.prototype.emptyEnumerator=new java.util.Hashtable.EmptyEnumerator();
c$.emptyIterator=c$.prototype.emptyIterator=new java.util.Hashtable.EmptyIterator();
});
