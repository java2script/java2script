/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=console.css,j2s-core-bare.z.js,j2s-core-basic.z.js,java/util/AbstractCollection.js,java/util/AbstractSet.js,java/util/AbstractMap.js,java/util/AbstractList.js,java/util/ArrayList.js,java/util/HashMap.js,java/util/HashSet.js
=*/
$_J("java.util");
$_J("java.lang.reflect");
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
$_J("java.util");
c$=$_C(function(){
$_Z(this,arguments);
},java.util,"AbstractSet",java.util.AbstractCollection,java.util.Set);
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
for(var i=c.iterator();i.hasNext();)modified=new Boolean(modified|this.remove(i.next()));

}else{
for(var i=this.iterator();i.hasNext();){
if(c.contains(i.next())){
i.remove();
modified=true;
}}
}return modified;
},"java.util.Collection");
$_J("java.util");
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
throw new UnsupportedOperationException();
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
$_J("java.util");
c$=$_C(function(){
if(!$_D("java.util.AbstractList.Itr")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.cursor=0;
this.lastRet=-1;
this.expectedModCount=0;
$_Z(this,arguments);
},java.util.AbstractList,"Itr",null,java.util.Iterator);
$_Y(c$,function(){
this.expectedModCount=this.b$["java.util.AbstractList"].modCount;
});
$_V(c$,"hasNext",
function(){
return this.cursor!=this.b$["java.util.AbstractList"].size();
});
$_V(c$,"next",
function(){
this.checkForComodification();
try{
var a=this.b$["java.util.AbstractList"].get(this.cursor);
this.lastRet=this.cursor++;
return a;
}catch(e){
if($_O(e,IndexOutOfBoundsException)){
this.checkForComodification();
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
});
$_V(c$,"remove",
function(){
if(this.lastRet==-1)throw new IllegalStateException();
this.checkForComodification();
try{
this.b$["java.util.AbstractList"].remove(this.lastRet);
if(this.lastRet<this.cursor)this.cursor--;
this.lastRet=-1;
this.expectedModCount=this.b$["java.util.AbstractList"].modCount;
}catch(e){
if($_O(e,IndexOutOfBoundsException)){
throw new java.util.ConcurrentModificationException();
}else{
throw e;
}
}
});
$_M(c$,"checkForComodification",
function(){
if(this.b$["java.util.AbstractList"].modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
});
c$=$_P();
}
if(!$_D("java.util.AbstractList.ListItr")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},java.util.AbstractList,"ListItr",java.util.AbstractList.Itr,java.util.ListIterator,$_N(java.util.AbstractList.Itr,this,null,$_G));
$_K(c$,
function(a){
$_R(this,java.util.AbstractList.ListItr,[]);
this.cursor=a;
},"~N");
$_V(c$,"hasPrevious",
function(){
return this.cursor!=0;
});
$_V(c$,"previous",
function(){
this.checkForComodification();
try{
var a=this.cursor-1;
var b=this.b$["java.util.AbstractList"].get(a);
this.lastRet=this.cursor=a;
return b;
}catch(e){
if($_O(e,IndexOutOfBoundsException)){
this.checkForComodification();
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
});
$_V(c$,"nextIndex",
function(){
return this.cursor;
});
$_V(c$,"previousIndex",
function(){
return this.cursor-1;
});
$_V(c$,"set",
function(a){
if(this.lastRet==-1)throw new IllegalStateException();
this.checkForComodification();
try{
this.b$["java.util.AbstractList"].set(this.lastRet,a);
this.expectedModCount=this.b$["java.util.AbstractList"].modCount;
}catch(e){
if($_O(e,IndexOutOfBoundsException)){
throw new java.util.ConcurrentModificationException();
}else{
throw e;
}
}
},"~O");
$_V(c$,"add",
function(a){
this.checkForComodification();
try{
this.b$["java.util.AbstractList"].add(this.cursor++,a);
this.lastRet=-1;
this.expectedModCount=this.b$["java.util.AbstractList"].modCount;
}catch(e){
if($_O(e,IndexOutOfBoundsException)){
throw new java.util.ConcurrentModificationException();
}else{
throw e;
}
}
},"~O");
c$=$_P();
}
this.modCount=0;
$_Z(this,arguments);
},java.util,"AbstractList",java.util.AbstractCollection,java.util.List);
$_K(c$,
function(){
$_R(this,java.util.AbstractList,[]);
});
$_M(c$,"add",
function(o){
this.add(this.size(),o);
return true;
},"~O");
$_V(c$,"set",
function(index,element){
throw new UnsupportedOperationException();
},"~N,~O");
$_M(c$,"add",
function(index,element){
throw new UnsupportedOperationException();
},"~N,~O");
$_M(c$,"remove",
function(index){
throw new UnsupportedOperationException();
},"~N");
$_V(c$,"indexOf",
function(o){
var e=this.listIterator();
if(o==null){
while(e.hasNext())if(e.next()==null)return e.previousIndex();

}else{
while(e.hasNext())if(o.equals(e.next()))return e.previousIndex();

}return-1;
},"~O");
$_V(c$,"lastIndexOf",
function(o){
var e=this.listIterator(this.size());
if(o==null){
while(e.hasPrevious())if(e.previous()==null)return e.nextIndex();

}else{
while(e.hasPrevious())if(o.equals(e.previous()))return e.nextIndex();

}return-1;
},"~O");
$_V(c$,"clear",
function(){
this.removeRange(0,this.size());
});
$_M(c$,"addAll",
function(index,c){
var modified=false;
var e=c.iterator();
while(e.hasNext()){
this.add(index++,e.next());
modified=true;
}
return modified;
},"~N,java.util.Collection");
$_V(c$,"iterator",
function(){
return $_N(java.util.AbstractList.Itr,this,null);
});
$_M(c$,"listIterator",
function(){
return this.listIterator(0);
});
$_M(c$,"listIterator",
function(index){
if(index<0||index>this.size())throw new IndexOutOfBoundsException("Index: "+index);
return $_N(java.util.AbstractList.ListItr,this,null,index);
},"~N");
$_V(c$,"subList",
function(fromIndex,toIndex){
return($_O(this,java.util.RandomAccess)?new java.util.RandomAccessSubList(this,fromIndex,toIndex):new java.util.SubList(this,fromIndex,toIndex));
},"~N,~N");
$_V(c$,"equals",
function(o){
if(o==this)return true;
if(!($_O(o,java.util.List)))return false;
var e1=this.listIterator();
var e2=(o).listIterator();
while(e1.hasNext()&&e2.hasNext()){
var o1=e1.next();
var o2=e2.next();
if(!(o1==null?o2==null:o1.equals(o2)))return false;
}
return!(e1.hasNext()||e2.hasNext());
},"~O");
$_V(c$,"hashCode",
function(){
var hashCode=1;
var i=this.iterator();
while(i.hasNext()){
var obj=i.next();
hashCode=31*hashCode+(obj==null?0:obj.hashCode());
}
return hashCode;
});
$_M(c$,"removeRange",
function(fromIndex,toIndex){
var it=this.listIterator(fromIndex);
for(var i=0,n=toIndex-fromIndex;i<n;i++){
it.next();
it.remove();
}
},"~N,~N");
c$=$_C(function(){
this.l=null;
this.offset=0;
this.$size=0;
this.expectedModCount=0;
$_Z(this,arguments);
},java.util,"SubList",java.util.AbstractList);
$_K(c$,
function(list,fromIndex,toIndex){
$_R(this,java.util.SubList,[]);
if(fromIndex<0)throw new IndexOutOfBoundsException("fromIndex = "+fromIndex);
if(toIndex>list.size())throw new IndexOutOfBoundsException("toIndex = "+toIndex);
if(fromIndex>toIndex)throw new IllegalArgumentException("fromIndex("+fromIndex+") > toIndex("+toIndex+")");
this.l=list;
this.offset=fromIndex;
this.$size=toIndex-fromIndex;
this.expectedModCount=this.l.modCount;
},"java.util.AbstractList,~N,~N");
$_M(c$,"set",
function(index,element){
this.rangeCheck(index);
this.checkForComodification();
return this.l.set(index+this.offset,element);
},"~N,~O");
$_M(c$,"get",
function(index){
this.rangeCheck(index);
this.checkForComodification();
return this.l.get(index+this.offset);
},"~N");
$_V(c$,"size",
function(){
this.checkForComodification();
return this.$size;
});
$_M(c$,"add",
function(index,element){
if(index<0||index>this.$size)throw new IndexOutOfBoundsException();
this.checkForComodification();
this.l.add(index+this.offset,element);
this.expectedModCount=this.l.modCount;
this.$size++;
this.modCount++;
},"~N,~O");
$_M(c$,"remove",
function(index){
this.rangeCheck(index);
this.checkForComodification();
var result=this.l.remove(index+this.offset);
this.expectedModCount=this.l.modCount;
this.$size--;
this.modCount++;
return result;
},"~N");
$_M(c$,"removeRange",
function(fromIndex,toIndex){
this.checkForComodification();
this.l.removeRange(fromIndex+this.offset,toIndex+this.offset);
this.expectedModCount=this.l.modCount;
this.$size-=(toIndex-fromIndex);
this.modCount++;
},"~N,~N");
$_M(c$,"addAll",
function(c){
return this.addAll(this.$size,c);
},"java.util.Collection");
$_M(c$,"addAll",
function(index,c){
if(index<0||index>this.$size)throw new IndexOutOfBoundsException("Index: "+index+", Size: "+this.$size);
var cSize=c.size();
if(cSize==0)return false;
this.checkForComodification();
this.l.addAll(this.offset+index,c);
this.expectedModCount=this.l.modCount;
this.$size+=cSize;
this.modCount++;
return true;
},"~N,java.util.Collection");
$_V(c$,"iterator",
function(){
return this.listIterator();
});
$_M(c$,"listIterator",
function(index){
this.checkForComodification();
if(index<0||index>this.$size)throw new IndexOutOfBoundsException("Index: "+index+", Size: "+this.$size);
return(function(i$,v$){
if(!$_D("java.util.SubList$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.i=null;
$_Z(this,arguments);
},java.util,"SubList$1",null,java.util.ListIterator);
$_Y(c$,function(){
this.i=this.b$["java.util.SubList"].l.listIterator(index+this.b$["java.util.SubList"].offset);
});
$_V(c$,"hasNext",
function(){
return this.nextIndex()<this.b$["java.util.SubList"].$size;
});
$_M(c$,"next",
function(){
if(this.hasNext())return this.i.next();
else throw new java.util.NoSuchElementException();
});
$_V(c$,"hasPrevious",
function(){
return this.previousIndex()>=0;
});
$_M(c$,"previous",
function(){
if(this.hasPrevious())return this.i.previous();
else throw new java.util.NoSuchElementException();
});
$_M(c$,"nextIndex",
function(){
return this.i.nextIndex()-this.b$["java.util.SubList"].offset;
});
$_M(c$,"previousIndex",
function(){
return this.i.previousIndex()-this.b$["java.util.SubList"].offset;
});
$_M(c$,"remove",
function(){
this.i.remove();
this.b$["java.util.SubList"].expectedModCount=this.b$["java.util.SubList"].l.modCount;
this.b$["java.util.SubList"].$size--;
this.b$["java.util.SubList"].modCount++;
});
$_M(c$,"set",
function(o){
this.i.set(o);
},"~O");
$_M(c$,"add",
function(o){
this.i.add(o);
this.b$["java.util.SubList"].expectedModCount=this.b$["java.util.SubList"].l.modCount;
this.b$["java.util.SubList"].$size++;
this.b$["java.util.SubList"].modCount++;
},"~O");
c$=$_P();
}
return $_N(java.util.SubList$1,i$,v$);
})(this,null);
},"~N");
$_V(c$,"subList",
function(fromIndex,toIndex){
return new java.util.SubList(this,fromIndex,toIndex);
},"~N,~N");
$_M(c$,"rangeCheck",
($fz=function(index){
if(index<0||index>=this.$size)throw new IndexOutOfBoundsException("Index: "+index+",Size: "+this.$size);
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"checkForComodification",
($fz=function(){
if(this.l.modCount!=this.expectedModCount)throw new java.util.ConcurrentModificationException();
},$fz.isPrivate=true,$fz));
c$=$_C(function(){
$_Z(this,arguments);
},java.util,"RandomAccessSubList",java.util.SubList,java.util.RandomAccess);
$_K(c$,
function(list,fromIndex,toIndex){
$_R(this,java.util.RandomAccessSubList,[list,fromIndex,toIndex]);
},"java.util.AbstractList,~N,~N");
$_V(c$,"subList",
function(fromIndex,toIndex){
return new java.util.RandomAccessSubList(this,fromIndex,toIndex);
},"~N,~N");
$_J("java.util");
c$=$_C(function(){
this.elementData=null;
this.$size=0;
$_Z(this,arguments);
},java.util,"ArrayList",java.util.AbstractList,[java.util.List,java.util.RandomAccess,Cloneable,java.io.Serializable]);
$_K(c$,
function(initialCapacity){
$_R(this,java.util.ArrayList);
if(initialCapacity<0)throw new IllegalArgumentException("Illegal Capacity: "+initialCapacity);
this.elementData=new Array(initialCapacity);
},"~N");
$_K(c$,
function(){
this.construct(10);
});
$_K(c$,
function(c){
$_R(this,java.util.ArrayList,[]);
this.$size=c.size();
this.elementData=new Array(parseInt(Math.min(Math.floor((this.$size*110)/100),2147483647)));
c.toArray(this.elementData);
},"java.util.Collection");
$_M(c$,"trimToSize",
function(){
this.modCount++;
var oldCapacity=this.elementData.length;
if(this.$size<oldCapacity){
var oldData=this.elementData;
this.elementData=new Array(this.$size);
System.arraycopy(oldData,0,this.elementData,0,this.$size);
}});
$_M(c$,"ensureCapacity",
function(minCapacity){
this.modCount++;
var oldCapacity=this.elementData.length;
if(minCapacity>oldCapacity){
var oldData=this.elementData;
var newCapacity=Math.floor((oldCapacity*3)/2)+1;
if(newCapacity<minCapacity)newCapacity=minCapacity;
this.elementData=new Array(newCapacity);
System.arraycopy(oldData,0,this.elementData,0,this.$size);
}},"~N");
$_V(c$,"size",
function(){
return this.$size;
});
$_V(c$,"isEmpty",
function(){
return this.$size==0;
});
$_V(c$,"contains",
function(elem){
return this.indexOf(elem)>=0;
},"~O");
$_V(c$,"indexOf",
function(elem){
if(elem==null){
for(var i=0;i<this.$size;i++)if(this.elementData[i]==null)return i;

}else{
for(var i=0;i<this.$size;i++)if(elem.equals(this.elementData[i]))return i;

}return-1;
},"~O");
$_V(c$,"lastIndexOf",
function(elem){
if(elem==null){
for(var i=this.$size-1;i>=0;i--)if(this.elementData[i]==null)return i;

}else{
for(var i=this.$size-1;i>=0;i--)if(elem.equals(this.elementData[i]))return i;

}return-1;
},"~O");
$_M(c$,"clone",
function(){
try{
var v=$_U(this,java.util.ArrayList,"clone",[]);
v.elementData=new Array(this.$size);
System.arraycopy(this.elementData,0,v.elementData,0,this.$size);
v.modCount=0;
return v;
}catch(e){
if($_O(e,CloneNotSupportedException)){
throw new InternalError();
}else{
throw e;
}
}
});
$_M(c$,"toArray",
function(){
var result=new Array(this.$size);
System.arraycopy(this.elementData,0,result,0,this.$size);
return result;
});
$_M(c$,"toArray",
function(a){
if(a.length<this.$size)a=java.lang.reflect.Array.newInstance(a.getClass().getComponentType(),this.$size);
System.arraycopy(this.elementData,0,a,0,this.$size);
if(a.length>this.$size)a[this.$size]=null;
return a;
},"~A");
$_V(c$,"get",
function(index){
this.RangeCheck(index);
return this.elementData[index];
},"~N");
$_V(c$,"set",
function(index,element){
this.RangeCheck(index);
var oldValue=this.elementData[index];
this.elementData[index]=element;
return oldValue;
},"~N,~O");
$_M(c$,"add",
function(o){
this.ensureCapacity(this.$size+1);
this.elementData[this.$size++]=o;
return true;
},"~O");
$_M(c$,"add",
function(index,element){
if(index>this.$size||index<0)throw new IndexOutOfBoundsException("Index: "+index+", Size: "+this.$size);
this.ensureCapacity(this.$size+1);
System.arraycopy(this.elementData,index,this.elementData,index+1,this.$size-index);
this.elementData[index]=element;
this.$size++;
},"~N,~O");
$_M(c$,"remove",
function(index){
this.RangeCheck(index);
this.modCount++;
var oldValue=this.elementData[index];
var numMoved=this.$size-index-1;
if(numMoved>0)System.arraycopy(this.elementData,index+1,this.elementData,index,numMoved);
this.elementData[--this.$size]=null;
return oldValue;
},"~N");
$_V(c$,"clear",
function(){
this.modCount++;
for(var i=0;i<this.$size;i++)this.elementData[i]=null;

this.$size=0;
});
$_M(c$,"addAll",
function(c){
var a=c.toArray();
var numNew=a.length;
this.ensureCapacity(this.$size+numNew);
System.arraycopy(a,0,this.elementData,this.$size,numNew);
this.$size+=numNew;
return numNew!=0;
},"java.util.Collection");
$_M(c$,"addAll",
function(index,c){
if(index>this.$size||index<0)throw new IndexOutOfBoundsException("Index: "+index+", Size: "+this.$size);
var a=c.toArray();
var numNew=a.length;
this.ensureCapacity(this.$size+numNew);
var numMoved=this.$size-index;
if(numMoved>0)System.arraycopy(this.elementData,index,this.elementData,index+numNew,numMoved);
System.arraycopy(a,0,this.elementData,index,numNew);
this.$size+=numNew;
return numNew!=0;
},"~N,java.util.Collection");
$_V(c$,"removeRange",
function(fromIndex,toIndex){
this.modCount++;
var numMoved=this.$size-toIndex;
System.arraycopy(this.elementData,toIndex,this.elementData,fromIndex,numMoved);
var newSize=this.$size-(toIndex-fromIndex);
while(this.$size!=newSize)this.elementData[--this.$size]=null;

},"~N,~N");
$_M(c$,"RangeCheck",
($fz=function(index){
if(index>=this.$size)throw new IndexOutOfBoundsException("Index: "+index+", Size: "+this.$size);
},$fz.isPrivate=true,$fz),"~N");
$_S(c$,
"serialVersionUID",8683452581122892189);
$_J("java.util");
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
$_J("java.util");
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
