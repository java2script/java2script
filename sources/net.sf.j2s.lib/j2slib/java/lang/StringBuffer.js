Clazz.load(["java.io.Serializable","java.lang.CharSequence"],"java.lang.StringBuffer",["java.lang.StringIndexOutOfBoundsException"],function(){
c$=$_C(function(){
this.value=null;
this.count=0;
this.shared=false;
$_Z(this,arguments);
},java.lang,"StringBuffer",null,[java.io.Serializable,CharSequence]);
$_K(c$,
function(){
this.construct(16);
});
$_K(c$,
function(length){
this.value=$_A(length,'\0');
this.shared=false;
},"~N");
$_K(c$,
function(str){
this.construct(str.length+16);
this.append(str);
},"~S");
$_V(c$,"length",
function(){
return this.count;
});
$_M(c$,"capacity",
function(){
return this.value.length;
});
$_M(c$,"copy",
($fz=function(){
var newValue=$_A(this.value.length,'\0');
System.arraycopy(this.value,0,newValue,0,this.count);
this.value=newValue;
this.shared=false;
},$fz.isPrivate=true,$fz));
$_M(c$,"ensureCapacity",
function(minimumCapacity){
if(minimumCapacity>this.value.length){
this.expandCapacity(minimumCapacity);
}},"~N");
$_M(c$,"expandCapacity",
($fz=function(minimumCapacity){
var newCapacity=(this.value.length+1)*2;
if(newCapacity<0){
newCapacity=2147483647;
}else if(minimumCapacity>newCapacity){
newCapacity=minimumCapacity;
}var newValue=$_A(newCapacity,'\0');
System.arraycopy(this.value,0,newValue,0,this.count);
this.value=newValue;
this.shared=false;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"setLength",
function(newLength){
if(newLength<0){
throw new java.lang.StringIndexOutOfBoundsException(newLength);
}if(newLength>this.value.length){
this.expandCapacity(newLength);
}if(this.count<newLength){
if(this.shared)this.copy();
for(;this.count<newLength;this.count++){
this.value[this.count]='\0';
}
}else{
this.count=newLength;
if(this.shared){
if(newLength>0){
this.copy();
}else{
this.value=$_A(16,'\0');
this.shared=false;
}}}},"~N");
$_V(c$,"charAt",
function(index){
if((index<0)||(index>=this.count)){
throw new java.lang.StringIndexOutOfBoundsException(index);
}return this.value[index];
},"~N");
$_M(c$,"getChars",
function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new java.lang.StringIndexOutOfBoundsException(srcBegin);
}if((srcEnd<0)||(srcEnd>this.count)){
throw new java.lang.StringIndexOutOfBoundsException(srcEnd);
}if(srcBegin>srcEnd){
throw new java.lang.StringIndexOutOfBoundsException("srcBegin > srcEnd");
}System.arraycopy(this.value,srcBegin,dst,dstBegin,srcEnd-srcBegin);
},"~N,~N,~A,~N");
$_M(c$,"setCharAt",
function(index,ch){
if((index<0)||(index>=this.count)){
throw new java.lang.StringIndexOutOfBoundsException(index);
}if(this.shared)this.copy();
this.value[index]=ch;
},"~N,~N");
$_M(c$,"append",
function(obj){
return this.append(String.valueOf(obj));
},"~O");
$_M(c$,"append",
function(str){
if(str==null){
str=String.valueOf(str);
}var len=str.length;
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
str.getChars(0,len,this.value,this.count);
this.count=newcount;
return this;
},"~S");
$_M(c$,"append",
function(sb){
if(sb==null){
sb=StringBuffer.NULL;
}var len=sb.length();
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
sb.getChars(0,len,this.value,this.count);
this.count=newcount;
return this;
},"StringBuffer");
$_M(c$,"append",
function(str){
var len=str.length;
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
System.arraycopy(str,0,this.value,this.count,len);
this.count=newcount;
return this;
},"~A");
$_M(c$,"append",
function(str,offset,len){
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
System.arraycopy(str,offset,this.value,this.count,len);
this.count=newcount;
return this;
},"~A,~N,~N");
$_M(c$,"append",
function(b){
if(b){
var newcount=this.count+4;
if(newcount>this.value.length)this.expandCapacity(newcount);
this.value[this.count++]='t';
this.value[this.count++]='r';
this.value[this.count++]='u';
this.value[this.count++]='e';
}else{
var newcount=this.count+5;
if(newcount>this.value.length)this.expandCapacity(newcount);
this.value[this.count++]='f';
this.value[this.count++]='a';
this.value[this.count++]='l';
this.value[this.count++]='s';
this.value[this.count++]='e';
}return this;
},"~B");
$_M(c$,"append",
function(c){
var newcount=this.count+1;
if(newcount>this.value.length)this.expandCapacity(newcount);
this.value[this.count++]=c;
return this;
},"~N");
$_M(c$,"append",
function(i){
this.append(""+i);
return this;
},"~N");
$_M(c$,"append",
function(l){
this.append(""+l);
return this;
},"~N");
$_M(c$,"append",
function(f){
this.append(""+f);
return this;
},"~N");
$_M(c$,"append",
function(d){
this.append(""+d);
return this;
},"~N");
$_M(c$,"$delete",
function(start,end){
if(start<0)throw new java.lang.StringIndexOutOfBoundsException(start);
if(end>this.count)end=this.count;
if(start>end)throw new java.lang.StringIndexOutOfBoundsException();
var len=end-start;
if(len>0){
if(this.shared)this.copy();
System.arraycopy(this.value,start+len,this.value,start,this.count-end);
this.count-=len;
}return this;
},"~N,~N");
$_M(c$,"deleteCharAt",
function(index){
if((index<0)||(index>=this.count))throw new java.lang.StringIndexOutOfBoundsException();
if(this.shared)this.copy();
System.arraycopy(this.value,index+1,this.value,index,this.count-index-1);
this.count--;
return this;
},"~N");
$_M(c$,"replace",
function(start,end,str){
if(start<0)throw new java.lang.StringIndexOutOfBoundsException(start);
if(end>this.count)end=this.count;
if(start>end)throw new java.lang.StringIndexOutOfBoundsException();
var len=str.length;
var newCount=this.count+len-(end-start);
if(newCount>this.value.length)this.expandCapacity(newCount);
else if(this.shared)this.copy();
System.arraycopy(this.value,end,this.value,start+len,this.count-end);
str.getChars(0,len,this.value,start);
this.count=newCount;
return this;
},"~N,~N,~S");
$_M(c$,"substring",
function(start){
return this.substring(start,this.count);
},"~N");
$_V(c$,"subSequence",
function(start,end){
return this.substring(start,end);
},"~N,~N");
$_M(c$,"substring",
function(start,end){
if(start<0)throw new java.lang.StringIndexOutOfBoundsException(start);
if(end>this.count)throw new java.lang.StringIndexOutOfBoundsException(end);
if(start>end)throw new java.lang.StringIndexOutOfBoundsException(end-start);
return String.instantialize(this.value,start,end-start);
},"~N,~N");
$_M(c$,"insert",
function(index,str,offset,len){
if((index<0)||(index>this.count))throw new java.lang.StringIndexOutOfBoundsException();
if((offset<0)||(offset+len<0)||(offset+len>str.length))throw new java.lang.StringIndexOutOfBoundsException(offset);
if(len<0)throw new java.lang.StringIndexOutOfBoundsException(len);
var newCount=this.count+len;
if(newCount>this.value.length)this.expandCapacity(newCount);
else if(this.shared)this.copy();
System.arraycopy(this.value,index,this.value,index+len,this.count-index);
System.arraycopy(str,offset,this.value,index,len);
this.count=newCount;
return this;
},"~N,~A,~N,~N");
$_M(c$,"insert",
function(offset,obj){
return this.insert(offset,String.valueOf(obj));
},"~N,~O");
$_M(c$,"insert",
function(offset,str){
if((offset<0)||(offset>this.count)){
throw new java.lang.StringIndexOutOfBoundsException();
}if(str==null){
str=String.valueOf(str);
}var len=str.length;
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
else if(this.shared)this.copy();
System.arraycopy(this.value,offset,this.value,offset+len,this.count-offset);
str.getChars(0,len,this.value,offset);
this.count=newcount;
return this;
},"~N,~S");
$_M(c$,"insert",
function(offset,str){
if((offset<0)||(offset>this.count)){
throw new java.lang.StringIndexOutOfBoundsException();
}var len=str.length;
var newcount=this.count+len;
if(newcount>this.value.length)this.expandCapacity(newcount);
else if(this.shared)this.copy();
System.arraycopy(this.value,offset,this.value,offset+len,this.count-offset);
System.arraycopy(str,0,this.value,offset,len);
this.count=newcount;
return this;
},"~N,~A");
$_M(c$,"insert",
function(offset,b){
return this.insert(offset,String.valueOf(b));
},"~N,~B");
$_M(c$,"insert",
function(offset,c){
var newcount=this.count+1;
if(newcount>this.value.length)this.expandCapacity(newcount);
else if(this.shared)this.copy();
System.arraycopy(this.value,offset,this.value,offset+1,this.count-offset);
this.value[offset]=c;
this.count=newcount;
return this;
},"~N,~N");
$_M(c$,"insert",
function(offset,i){
return this.insert(offset,String.valueOf(i));
},"~N,~N");
$_M(c$,"insert",
function(offset,l){
return this.insert(offset,String.valueOf(l));
},"~N,~N");
$_M(c$,"insert",
function(offset,f){
return this.insert(offset,String.valueOf(f));
},"~N,~N");
$_M(c$,"insert",
function(offset,d){
return this.insert(offset,String.valueOf(d));
},"~N,~N");
$_M(c$,"indexOf",
function(str){
return this.indexOf(str,0);
},"~S");
$_M(c$,"indexOf",
function(str,fromIndex){
return String.indexOf(this.value,0,this.count,str.toCharArray(),0,str.length,fromIndex);
},"~S,~N");
$_M(c$,"lastIndexOf",
function(str){
return this.lastIndexOf(str,this.count);
},"~S");
$_M(c$,"lastIndexOf",
function(str,fromIndex){
return String.lastIndexOf(this.value,0,this.count,str.toCharArray(),0,str.length,fromIndex);
},"~S,~N");
$_M(c$,"reverse",
function(){
if(this.shared)this.copy();
var n=this.count-1;
for(var j=(n-1)>>1;j>=0;--j){
var temp=this.value[j];
this.value[j]=this.value[n-j];
this.value[n-j]=temp;
}
return this;
});
$_V(c$,"toString",
function(){
return String.instantialize(this);
});
$_M(c$,"setShared",
function(){
this.shared=true;
});
$_M(c$,"getValue",
function(){
return this.value;
});
$_S(c$,
"serialVersionUID",3388685877147921107);
c$.NULL=c$.prototype.NULL=new StringBuffer("null");
});
