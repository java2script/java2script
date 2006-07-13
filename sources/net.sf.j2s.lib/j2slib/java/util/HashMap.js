Clazz.load(["java.io.Serializable","java.lang.Cloneable","java.util.AbstractCollection","$.AbstractMap","$.AbstractSet","$.Iterator","$.Map"],"java.util.HashMap",["java.lang.Float","$.IllegalArgumentException","$.IllegalStateException","java.util.ConcurrentModificationException","$.NoSuchElementException"],function(){
c$=$_C(function(){
this.table=null;
this.$size=0;
this.threshold=0;
this.$loadFactor=0;
this.modCount=0;
if(!$_D("java.util.HashMap.HashIterator")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.$next=null;
this.expectedModCount=0;
this.index=0;
this.current=null;
$_Z(this,arguments);
},java.util.HashMap,"HashIterator",null,java.util.Iterator);
$_K(c$,
function(){
this.expectedModCount=this.b$["java.util.HashMap"].modCount;
var a=this.b$["java.util.HashMap"].table;
var b=a.length;
var c=null;
if(this.b$["java.util.HashMap"].$size!=0){
while(b>0&&(c=a[--b])==null);
}this.$next=c;
this.index=b;
});
$_V(c$,"hasNext",
function(){
return this.$next!=null;
});
$_M(c$,"nextEntry",
function(){
if(this.b$["java.util.HashMap"].modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
var a=this.$next;
if(a==null)throw new java.util.NoSuchElementException();
var b=a.next;
var c=this.b$["java.util.HashMap"].table;
var d=this.index;
while(b==null&&d>0)b=c[--d];

this.index=d;
this.$next=b;
return this.current=a;
});
$_V(c$,"remove",
function(){
if(this.current==null)throw new IllegalStateException();
if(this.b$["java.util.HashMap"].modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
var a=this.current.key;
this.current=null;
this.b$["java.util.HashMap"].removeEntryForKey(a);
this.expectedModCount=this.b$["java.util.HashMap"].modCount;
});
c$=$_P();
}
if(!$_D("java.util.HashMap.ValueIterator")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"ValueIterator",java.util.HashMap.HashIterator,null,$_N(java.util.HashMap.HashIterator,this,null,$_G));
$_V(c$,"next",
function(){
return this.nextEntry().value;
});
c$=$_P();
}
if(!$_D("java.util.HashMap.KeyIterator")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"KeyIterator",java.util.HashMap.HashIterator,null,$_N(java.util.HashMap.HashIterator,this,null,$_G));
$_V(c$,"next",
function(){
return this.nextEntry().getKey();
});
c$=$_P();
}
if(!$_D("java.util.HashMap.EntryIterator")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"EntryIterator",java.util.HashMap.HashIterator,null,$_N(java.util.HashMap.HashIterator,this,null,$_G));
$_V(c$,"next",
function(){
return this.nextEntry();
});
c$=$_P();
}
this.$entrySet=null;
if(!$_D("java.util.HashMap.KeySet")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"KeySet",java.util.AbstractSet);
$_V(c$,"iterator",
function(){
return this.b$["java.util.HashMap"].newKeyIterator();
});
$_V(c$,"size",
function(){
return this.b$["java.util.HashMap"].$size;
});
$_V(c$,"contains",
function(a){
return this.b$["java.util.HashMap"].containsKey(a);
},"~O");
$_V(c$,"remove",
function(a){
return this.b$["java.util.HashMap"].removeEntryForKey(a)!=null;
},"~O");
$_V(c$,"clear",
function(){
this.b$["java.util.HashMap"].clear();
});
c$=$_P();
}
if(!$_D("java.util.HashMap.Values")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"Values",java.util.AbstractCollection);
$_V(c$,"iterator",
function(){
return this.b$["java.util.HashMap"].newValueIterator();
});
$_V(c$,"size",
function(){
return this.b$["java.util.HashMap"].$size;
});
$_V(c$,"contains",
function(a){
return this.b$["java.util.HashMap"].containsValue(a);
},"~O");
$_V(c$,"clear",
function(){
this.b$["java.util.HashMap"].clear();
});
c$=$_P();
}
if(!$_D("java.util.HashMap.EntrySet")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.HashMap,"EntrySet",java.util.AbstractSet);
$_V(c$,"iterator",
function(){
return this.b$["java.util.HashMap"].newEntryIterator();
});
$_V(c$,"contains",
function(a){
if(!($_O(a,java.util.Map.Entry)))return false;
var b=a;
var c=this.b$["java.util.HashMap"].getEntry(b.getKey());
return c!=null&&c.equals(b);
},"~O");
$_V(c$,"remove",
function(a){
return this.b$["java.util.HashMap"].removeMapping(a)!=null;
},"~O");
$_V(c$,"size",
function(){
return this.b$["java.util.HashMap"].$size;
});
$_V(c$,"clear",
function(){
this.b$["java.util.HashMap"].clear();
});
c$=$_P();
}
$_Z(this,arguments);
},java.util,"HashMap",java.util.AbstractMap,[java.util.Map,Cloneable,java.io.Serializable]);
$_H();
c$=$_C(function(){
this.key=null;
this.value=null;
this.hash=0;
this.next=null;
$_Z(this,arguments);
},java.util.HashMap,"Entry",null,java.util.Map.Entry);
$_K(c$,
function(a,b,c,d){
this.value=c;
this.next=d;
this.key=b;
this.hash=a;
},"~N,~O,~O,java.util.HashMap.Entry");
$_M(c$,"getKey",
function(){
return java.util.HashMap.unmaskNull(this.key);
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
var c=this.getKey();
var d=b.getKey();
if(c==d||(c!=null&&c.equals(d))){
var e=this.getValue();
var f=b.getValue();
if(e==f||(e!=null&&e.equals(f)))return true;
}return false;
},"~O");
$_V(c$,"hashCode",
function(){
return(this.key==java.util.HashMap.NULL_KEY?0:this.key.hashCode())^(this.value==null?0:this.value.hashCode());
});
$_V(c$,"toString",
function(){
return this.getKey()+"="+this.getValue();
});
$_M(c$,"recordAccess",
function(a){
},"java.util.HashMap");
$_M(c$,"recordRemoval",
function(a){
},"java.util.HashMap");
c$=$_P();
$_K(c$,
function(initialCapacity,loadFactor){
$_R(this,java.util.HashMap,[]);
if(initialCapacity<0)throw new IllegalArgumentException("Illegal initial capacity: "+initialCapacity);
if(initialCapacity>1073741824)initialCapacity=1073741824;
if(loadFactor<=0||Float.isNaN(loadFactor))throw new IllegalArgumentException("Illegal load factor: "+loadFactor);
var capacity=1;
while(capacity<initialCapacity)capacity<<=1;

this.$loadFactor=loadFactor;
this.threshold=parseInt((capacity*loadFactor));
this.table=new Array(capacity);
this.init();
},"~N,~N");
$_K(c$,
function(initialCapacity){
this.construct(initialCapacity,0.75);
},"~N");
$_K(c$,
function(){
$_R(this,java.util.HashMap,[]);
this.$loadFactor=0.75;
this.threshold=parseInt((12.0));
this.table=new Array(16);
this.init();
});
$_K(c$,
function(m){
this.construct(Math.max(parseInt((m.size()/0.75))+1,16),0.75);
this.putAllForCreate(m);
},"java.util.Map");
$_M(c$,"init",
function(){
});
c$.maskNull=$_M(c$,"maskNull",
function(key){
return(key==null?java.util.HashMap.NULL_KEY:key);
},"~O");
c$.unmaskNull=$_M(c$,"unmaskNull",
function(key){
return(key==java.util.HashMap.NULL_KEY?null:key);
},"~O");
c$.hash=$_M(c$,"hash",
function(x){
var h=x.hashCode();
h+=~(h<<9);
h^=(h>>>14);
h+=(h<<4);
h^=(h>>>10);
return h;
},"~O");
c$.eq=$_M(c$,"eq",
function(x,y){
return x==y||x.equals(y);
},"~O,~O");
c$.indexFor=$_M(c$,"indexFor",
function(h,length){
return h&(length-1);
},"~N,~N");
$_M(c$,"size",
function(){
return this.$size;
});
$_V(c$,"isEmpty",
function(){
return this.$size==0;
});
$_V(c$,"get",
function(key){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
var e=this.table[i];
while(true){
if(e==null)return e;
if(e.hash==hash&&java.util.HashMap.eq(k,e.key))return e.value;
e=e.next;
}
},"~O");
$_V(c$,"containsKey",
function(key){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
var e=this.table[i];
while(e!=null){
if(e.hash==hash&&java.util.HashMap.eq(k,e.key))return true;
e=e.next;
}
return false;
},"~O");
$_M(c$,"getEntry",
function(key){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
var e=this.table[i];
while(e!=null&&!(e.hash==hash&&java.util.HashMap.eq(k,e.key)))e=e.next;

return e;
},"~O");
$_V(c$,"put",
function(key,value){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
for(var e=this.table[i];e!=null;e=e.next){
if(e.hash==hash&&java.util.HashMap.eq(k,e.key)){
var oldValue=e.value;
e.value=value;
e.recordAccess(this);
return oldValue;
}}
this.modCount++;
this.addEntry(hash,k,value,i);
return null;
},"~O,~O");
$_M(c$,"putForCreate",
($fz=function(key,value){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
for(var e=this.table[i];e!=null;e=e.next){
if(e.hash==hash&&java.util.HashMap.eq(k,e.key)){
e.value=value;
return;
}}
this.createEntry(hash,k,value,i);
},$fz.isPrivate=true,$fz),"~O,~O");
$_M(c$,"putAllForCreate",
function(m){
for(var i=m.entrySet().iterator();i.hasNext();){
var e=i.next();
this.putForCreate(e.getKey(),e.getValue());
}
},"java.util.Map");
$_M(c$,"resize",
function(newCapacity){
var oldTable=this.table;
var oldCapacity=oldTable.length;
if(oldCapacity==1073741824){
this.threshold=2147483647;
return;
}var newTable=new Array(newCapacity);
this.transfer(newTable);
this.table=newTable;
this.threshold=parseInt((newCapacity*this.$loadFactor));
},"~N");
$_M(c$,"transfer",
function(newTable){
var src=this.table;
var newCapacity=newTable.length;
for(var j=0;j<src.length;j++){
var e=src[j];
if(e!=null){
src[j]=null;
do{
var next=e.next;
var i=java.util.HashMap.indexFor(e.hash,newCapacity);
e.next=newTable[i];
newTable[i]=e;
e=next;
}while(e!=null);
}}
},"~A");
$_V(c$,"putAll",
function(m){
var numKeysToBeAdded=m.size();
if(numKeysToBeAdded==0)return;
if(numKeysToBeAdded>this.threshold){
var targetCapacity=parseInt((numKeysToBeAdded/this.$loadFactor+1));
if(targetCapacity>1073741824)targetCapacity=1073741824;
var newCapacity=this.table.length;
while(newCapacity<targetCapacity)newCapacity<<=1;

if(newCapacity>this.table.length)this.resize(newCapacity);
}for(var i=m.entrySet().iterator();i.hasNext();){
var e=i.next();
this.put(e.getKey(),e.getValue());
}
},"java.util.Map");
$_V(c$,"remove",
function(key){
var e=this.removeEntryForKey(key);
return(e==null?e:e.value);
},"~O");
$_M(c$,"removeEntryForKey",
function(key){
var k=java.util.HashMap.maskNull(key);
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
var prev=this.table[i];
var e=prev;
while(e!=null){
var next=e.next;
if(e.hash==hash&&java.util.HashMap.eq(k,e.key)){
this.modCount++;
this.$size--;
if(prev==e)this.table[i]=next;
else prev.next=next;
e.recordRemoval(this);
return e;
}prev=e;
e=next;
}
return e;
},"~O");
$_M(c$,"removeMapping",
function(o){
if(!($_O(o,java.util.Map.Entry)))return null;
var entry=o;
var k=java.util.HashMap.maskNull(entry.getKey());
var hash=java.util.HashMap.hash(k);
var i=java.util.HashMap.indexFor(hash,this.table.length);
var prev=this.table[i];
var e=prev;
while(e!=null){
var next=e.next;
if(e.hash==hash&&e.equals(entry)){
this.modCount++;
this.$size--;
if(prev==e)this.table[i]=next;
else prev.next=next;
e.recordRemoval(this);
return e;
}prev=e;
e=next;
}
return e;
},"~O");
$_V(c$,"clear",
function(){
this.modCount++;
var tab=this.table;
for(var i=0;i<tab.length;i++)tab[i]=null;

this.$size=0;
});
$_V(c$,"containsValue",
function(value){
if(value==null)return this.containsNullValue();
var tab=this.table;
for(var i=0;i<tab.length;i++)for(var e=tab[i];e!=null;e=e.next)if(value.equals(e.value))return true;


return false;
},"~O");
$_M(c$,"containsNullValue",
($fz=function(){
var tab=this.table;
for(var i=0;i<tab.length;i++)for(var e=tab[i];e!=null;e=e.next)if(e.value==null)return true;


return false;
},$fz.isPrivate=true,$fz));
$_M(c$,"clone",
function(){
var result=null;
try{
result=$_U(this,java.util.HashMap,"clone",[]);
}catch(e){
if($_O(e,CloneNotSupportedException)){
}else{
throw e;
}
}
result.table=new Array(this.table.length);
result.$entrySet=null;
result.modCount=0;
result.$size=0;
result.init();
result.putAllForCreate(this);
return result;
});
$_M(c$,"addEntry",
function(hash,key,value,bucketIndex){
this.table[bucketIndex]=new java.util.HashMap.Entry(hash,key,value,this.table[bucketIndex]);
if(this.$size++>=this.threshold)this.resize(2*this.table.length);
},"~N,~O,~O,~N");
$_M(c$,"createEntry",
function(hash,key,value,bucketIndex){
this.table[bucketIndex]=new java.util.HashMap.Entry(hash,key,value,this.table[bucketIndex]);
this.$size++;
},"~N,~O,~O,~N");
$_M(c$,"newKeyIterator",
function(){
return $_N(java.util.HashMap.KeyIterator,this,null);
});
$_M(c$,"newValueIterator",
function(){
return $_N(java.util.HashMap.ValueIterator,this,null);
});
$_M(c$,"newEntryIterator",
function(){
return $_N(java.util.HashMap.EntryIterator,this,null);
});
$_V(c$,"keySet",
function(){
var ks=this.$keySet;
return(ks!=null?ks:(this.$keySet=$_N(java.util.HashMap.KeySet,this,null)));
});
$_V(c$,"values",
function(){
var vs=this.$values;
return(vs!=null?vs:(this.$values=$_N(java.util.HashMap.Values,this,null)));
});
$_M(c$,"entrySet",
function(){
var es=this.$entrySet;
return(es!=null?es:(this.$entrySet=$_N(java.util.HashMap.EntrySet,this,null)));
});
$_M(c$,"capacity",
function(){
return this.table.length;
});
$_M(c$,"loadFactor",
function(){
return this.$loadFactor;
});
$_S(c$,
"DEFAULT_INITIAL_CAPACITY",16,
"MAXIMUM_CAPACITY",1073741824,
"DEFAULT_LOAD_FACTOR",0.75);
c$.NULL_KEY=c$.prototype.NULL_KEY=new Object();
$_S(c$,
"serialVersionUID",362498820763181265);
});
