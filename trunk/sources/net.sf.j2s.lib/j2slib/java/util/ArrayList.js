$_L(["java.io.Serializable","java.lang.Cloneable","java.util.AbstractList","$.List","$.RandomAccess"],"java.util.ArrayList",["java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.InternalError","java.lang.reflect.Array"],function(){
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
this.elementData=new Array(Math.min(Math.floor((this.$size*110)/100),2147483647));
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
});
