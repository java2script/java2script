Clazz.load(["java.util.AbstractCollection","$.Iterator","$.List","$.ListIterator","$.RandomAccess"],["java.util.AbstractList","$.RandomAccessSubList","$.SubList"],["java.lang.IllegalArgumentException","$.IllegalStateException","$.IndexOutOfBoundsException","$.UnsupportedOperationException","java.util.ConcurrentModificationException","$.NoSuchElementException"],function(){
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
});
