Clazz.load(["java.io.Serializable","java.lang.Cloneable","java.util.AbstractList","$.List","$.RandomAccess"],"java.util.Vector",["java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.IndexOutOfBoundsException","$.InternalError","java.lang.reflect.Array","java.util.Collections","$.Enumeration","$.NoSuchElementException"],function(){
c$=$_C(function(){
this.elementData=null;
this.elementCount=0;
this.capacityIncrement=0;
$_Z(this,arguments);
},java.util,"Vector",java.util.AbstractList,[java.util.List,java.util.RandomAccess,Cloneable,java.io.Serializable]);
$_K(c$,
function(initialCapacity,capacityIncrement){
$_R(this,java.util.Vector);
if(initialCapacity<0)throw new java.lang.IllegalArgumentException("Illegal Capacity: "+initialCapacity);
this.elementData=new Array(initialCapacity);
this.capacityIncrement=capacityIncrement;
},"~N,~N");
$_K(c$,
function(initialCapacity){
this.construct(initialCapacity,0);
},"~N");
$_K(c$,
function(){
this.construct(10);
});
$_K(c$,
function(c){
$_R(this,java.util.Vector,[]);
this.elementCount=c.size();
this.elementData=new Array(Math.min(Math.floor((this.elementCount*110)/100),2147483647));
c.toArray(this.elementData);
},"java.util.Collection");
$_M(c$,"copyInto",
function(anArray){
System.arraycopy(this.elementData,0,anArray,0,this.elementCount);
},"~A");
$_M(c$,"trimToSize",
function(){
this.modCount++;
var oldCapacity=this.elementData.length;
if(this.elementCount<oldCapacity){
var oldData=this.elementData;
this.elementData=new Array(this.elementCount);
System.arraycopy(oldData,0,this.elementData,0,this.elementCount);
}});
$_M(c$,"ensureCapacity",
function(minCapacity){
this.modCount++;
this.ensureCapacityHelper(minCapacity);
},"~N");
$_M(c$,"ensureCapacityHelper",
($fz=function(minCapacity){
var oldCapacity=this.elementData.length;
if(minCapacity>oldCapacity){
var oldData=this.elementData;
var newCapacity=(this.capacityIncrement>0)?(oldCapacity+this.capacityIncrement):(oldCapacity*2);
if(newCapacity<minCapacity){
newCapacity=minCapacity;
}this.elementData=new Array(newCapacity);
System.arraycopy(oldData,0,this.elementData,0,this.elementCount);
}},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"setSize",
function(newSize){
this.modCount++;
if(newSize>this.elementCount){
this.ensureCapacityHelper(newSize);
}else{
for(var i=newSize;i<this.elementCount;i++){
this.elementData[i]=null;
}
}this.elementCount=newSize;
},"~N");
$_M(c$,"capacity",
function(){
return this.elementData.length;
});
$_V(c$,"size",
function(){
return this.elementCount;
});
$_V(c$,"isEmpty",
function(){
return this.elementCount==0;
});
$_M(c$,"elements",
function(){
return(function(i$,v$){
if(!$_D("java.util.Vector$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.count=0;
$_Z(this,arguments);
},java.util,"Vector$1",null,java.util.Enumeration);
$_V(c$,"hasMoreElements",
function(){
return this.count<this.b$["java.util.Vector"].elementCount;
});
$_V(c$,"nextElement",
function(){
{
if(this.count<this.b$["java.util.Vector"].elementCount){
return this.b$["java.util.Vector"].elementData[this.count++];
}}throw new java.util.NoSuchElementException("Vector Enumeration");
});
c$=$_P();
}
return $_N(java.util.Vector$1,i$,v$);
})(this,null);
});
$_V(c$,"contains",
function(elem){
return this.indexOf(elem,0)>=0;
},"~O");
$_M(c$,"indexOf",
function(elem){
return this.indexOf(elem,0);
},"~O");
$_M(c$,"indexOf",
function(elem,index){
if(elem==null){
for(var i=index;i<this.elementCount;i++)if(this.elementData[i]==null)return i;

}else{
for(var i=index;i<this.elementCount;i++)if(elem.equals(this.elementData[i]))return i;

}return-1;
},"~O,~N");
$_M(c$,"lastIndexOf",
function(elem){
return this.lastIndexOf(elem,this.elementCount-1);
},"~O");
$_M(c$,"lastIndexOf",
function(elem,index){
if(index>=this.elementCount)throw new java.lang.IndexOutOfBoundsException(index+" >= "+this.elementCount);
if(elem==null){
for(var i=index;i>=0;i--)if(this.elementData[i]==null)return i;

}else{
for(var i=index;i>=0;i--)if(elem.equals(this.elementData[i]))return i;

}return-1;
},"~O,~N");
$_M(c$,"elementAt",
function(index){
if(index>=this.elementCount){
throw new java.lang.ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
}return this.elementData[index];
},"~N");
$_M(c$,"firstElement",
function(){
if(this.elementCount==0){
throw new java.util.NoSuchElementException();
}return this.elementData[0];
});
$_M(c$,"lastElement",
function(){
if(this.elementCount==0){
throw new java.util.NoSuchElementException();
}return this.elementData[this.elementCount-1];
});
$_M(c$,"setElementAt",
function(obj,index){
if(index>=this.elementCount){
throw new java.lang.ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
}this.elementData[index]=obj;
},"~O,~N");
$_M(c$,"removeElementAt",
function(index){
this.modCount++;
if(index>=this.elementCount){
throw new java.lang.ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
}else if(index<0){
throw new java.lang.ArrayIndexOutOfBoundsException(index);
}var j=this.elementCount-index-1;
if(j>0){
System.arraycopy(this.elementData,index+1,this.elementData,index,j);
}this.elementCount--;
this.elementData[this.elementCount]=null;
},"~N");
$_M(c$,"insertElementAt",
function(obj,index){
this.modCount++;
if(index>this.elementCount){
throw new java.lang.ArrayIndexOutOfBoundsException(index+" > "+this.elementCount);
}this.ensureCapacityHelper(this.elementCount+1);
System.arraycopy(this.elementData,index,this.elementData,index+1,this.elementCount-index);
this.elementData[index]=obj;
this.elementCount++;
},"~O,~N");
$_M(c$,"addElement",
function(obj){
this.modCount++;
this.ensureCapacityHelper(this.elementCount+1);
this.elementData[this.elementCount++]=obj;
},"~O");
$_M(c$,"removeElement",
function(obj){
this.modCount++;
var i=this.indexOf(obj);
if(i>=0){
this.removeElementAt(i);
return true;
}return false;
},"~O");
$_M(c$,"removeAllElements",
function(){
this.modCount++;
for(var i=0;i<this.elementCount;i++)this.elementData[i]=null;

this.elementCount=0;
});
$_M(c$,"clone",
function(){
try{
var v=$_U(this,java.util.Vector,"clone",[]);
v.elementData=new Array(this.elementCount);
System.arraycopy(this.elementData,0,v.elementData,0,this.elementCount);
v.modCount=0;
return v;
}catch(e){
if($_O(e,java.lang.CloneNotSupportedException)){
throw new java.lang.InternalError();
}else{
throw e;
}
}
});
$_M(c$,"toArray",
function(){
var result=new Array(this.elementCount);
System.arraycopy(this.elementData,0,result,0,this.elementCount);
return result;
});
$_M(c$,"toArray",
function(a){
if(a.length<this.elementCount)a=java.lang.reflect.Array.newInstance(a.getClass().getComponentType(),this.elementCount);
System.arraycopy(this.elementData,0,a,0,this.elementCount);
if(a.length>this.elementCount)a[this.elementCount]=null;
return a;
},"~A");
$_V(c$,"get",
function(index){
if(index>=this.elementCount)throw new java.lang.ArrayIndexOutOfBoundsException(index);
return this.elementData[index];
},"~N");
$_V(c$,"set",
function(index,element){
if(index>=this.elementCount)throw new java.lang.ArrayIndexOutOfBoundsException(index);
var oldValue=this.elementData[index];
this.elementData[index]=element;
return oldValue;
},"~N,~O");
$_M(c$,"add",
function(o){
this.modCount++;
this.ensureCapacityHelper(this.elementCount+1);
this.elementData[this.elementCount++]=o;
return true;
},"~O");
$_M(c$,"remove",
function(o){
return this.removeElement(o);
},"~O");
$_M(c$,"add",
function(index,element){
this.insertElementAt(element,index);
},"~N,~O");
$_M(c$,"remove",
function(index){
this.modCount++;
if(index>=this.elementCount)throw new java.lang.ArrayIndexOutOfBoundsException(index);
var oldValue=this.elementData[index];
var numMoved=this.elementCount-index-1;
if(numMoved>0)System.arraycopy(this.elementData,index+1,this.elementData,index,numMoved);
this.elementData[--this.elementCount]=null;
return oldValue;
},"~N");
$_V(c$,"clear",
function(){
this.removeAllElements();
});
$_V(c$,"containsAll",
function(c){
return $_U(this,java.util.Vector,"containsAll",[c]);
},"java.util.Collection");
$_M(c$,"addAll",
function(c){
this.modCount++;
var a=c.toArray();
var numNew=a.length;
this.ensureCapacityHelper(this.elementCount+numNew);
System.arraycopy(a,0,this.elementData,this.elementCount,numNew);
this.elementCount+=numNew;
return numNew!=0;
},"java.util.Collection");
$_V(c$,"removeAll",
function(c){
return $_U(this,java.util.Vector,"removeAll",[c]);
},"java.util.Collection");
$_V(c$,"retainAll",
function(c){
return $_U(this,java.util.Vector,"retainAll",[c]);
},"java.util.Collection");
$_M(c$,"addAll",
function(index,c){
this.modCount++;
if(index<0||index>this.elementCount)throw new java.lang.ArrayIndexOutOfBoundsException(index);
var a=c.toArray();
var numNew=a.length;
this.ensureCapacityHelper(this.elementCount+numNew);
var numMoved=this.elementCount-index;
if(numMoved>0)System.arraycopy(this.elementData,index,this.elementData,index+numNew,numMoved);
System.arraycopy(a,0,this.elementData,index,numNew);
this.elementCount+=numNew;
return numNew!=0;
},"~N,java.util.Collection");
$_V(c$,"equals",
function(o){
return $_U(this,java.util.Vector,"equals",[o]);
},"~O");
$_V(c$,"hashCode",
function(){
return $_U(this,java.util.Vector,"hashCode",[]);
});
$_M(c$,"toString",
function(){
return $_U(this,java.util.Vector,"toString",[]);
});
$_V(c$,"subList",
function(fromIndex,toIndex){
return java.util.Collections.synchronizedList($_U(this,java.util.Vector,"subList",[fromIndex,toIndex]),this);
},"~N,~N");
$_V(c$,"removeRange",
function(fromIndex,toIndex){
this.modCount++;
var numMoved=this.elementCount-toIndex;
System.arraycopy(this.elementData,toIndex,this.elementData,fromIndex,numMoved);
var newElementCount=this.elementCount-(toIndex-fromIndex);
while(this.elementCount!=newElementCount)this.elementData[--this.elementCount]=null;

},"~N,~N");
$_S(c$,
"serialVersionUID",-2767605614048989439);
});
