/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=j2s-core-bare.z.js,java/io/Serializable.js,java/lang/CharSequence.js,java/lang/Cloneable.js,java/lang/Comparable.js,java/lang/Runnable.js,java/util/Comparator.js,java/lang/Enum.js,java/lang/Object.js,java/lang/Encoding.js,java/lang/String.js,java/lang/StringBuffer.js,java/lang/Number.js,java/lang/Integer.js,java/lang/Long.js,java/lang/Float.js,java/lang/Double.js,java/util/Date.js,java/util/EventObject.js,java/util/EventListener.js,java/util/EventListenerProxy.js,java/util/Iterator.js,java/util/ListIterator.js,java/util/Enumeration.js,java/util/Collection.js,java/util/Set.js,java/util/Map.js,java/util/List.js,java/util/RandomAccess.js
=*/
$_J("java.io");
$_I(java.io,"Serializable");
$_I(java.lang,"CharSequence");
$_I(java.lang,"Cloneable");
$_I(java.lang,"Comparable");
$_I(java.lang,"Runnable");
$_J("java.util");
$_I(java.util,"Comparator");
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
c$=java.lang.Enum=Enum=function(){
this.$name=null;
this.$ordinal=0;
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(c$,"Enum",null,[Comparable,java.io.Serializable]);
Clazz.defineMethod(c$,"name",
function(){
return this.$name;
});
Clazz.defineMethod(c$,"ordinal",
function(){
return this.$ordinal;
});
Clazz.makeConstructor(c$,
function(name,ordinal){
this.$name=name;
this.$ordinal=ordinal;
},"String, Number");
Clazz.defineMethod(c$,"toString",
function(){
return this.$name;
});
Clazz.defineMethod(c$,"equals",
function(other){
return this==other;
},"Object");
Clazz.defineMethod(c$,"hashCode",
function(){
return System.identityHashCode(this);
});
Clazz.defineMethod(c$,"clone",
function(){
throw new CloneNotSupportedException();
});
Clazz.defineMethod(c$,"compareTo",
function(o){
var other=o;
var self=this;
if(self.getClass()!=other.getClass()&&self.getDeclaringClass()!=other.getDeclaringClass())throw new ClassCastException();
return self.ordinal-other.ordinal;
},"E");
Clazz.defineMethod(c$,"getDeclaringClass",
function(){
var clazz=this.getClass();
var zuper=clazz.getSuperclass();
return(zuper==Enum)?clazz:zuper;
});
Clazz.defineMethod(Enum,"$valueOf",
function(enumType,name){
return enumType.$valueOf(name);
},"Object, String");
Clazz.defineMethod(Enum,"$valueOf",
function(name){
if(name==null)throw new NullPointerException("Name is null");
var vals=this.values();
for(var i=0;i<vals.length;i++){
if(name==vals[i].name()){
return vals[i];
}
}
throw new IllegalArgumentException("No enum const "+enumType+"."+name);
},"String");
Enum.$valueOf=Enum.prototype.$valueOf;
Clazz.defineMethod(Enum,"values",
function(){
if(this.$ALL$ENUMS!=null){
return this.$ALL$ENUMS;
}
this.$ALL$ENUMS=new Array();
var clazzThis=this.getClass();
for(var e in clazzThis){
if(clazzThis[e]!=null&&clazzThis[e].__CLASS_NAME__!=null
&&e!="prototype"
&&Clazz.instanceOf(clazzThis[e],clazzThis)){
this.$ALL$ENUMS[this.$ALL$ENUMS.length]=clazzThis[e];
}
}
return this.$ALL$ENUMS;
});
Enum.values=Enum.prototype.values;

/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Object=Object;


Object.getName=Clazz.innerFunctions.getName;

Object.prototype.equals=function(obj){
return this==obj;
};

Object.prototype.hashCode=function(){
return this.toString().hashCode();
};

Object.prototype.getClass=function(){
return Clazz.getClass(this);
};

Object.prototype.clone=function(){
return this;
};

Object.prototype.finalize=function(){
};

Object.prototype.notify=function(){
};

Object.prototype.notifyAll=function(){
};

Object.prototype.wait=function(){
};

Object.prototype.toString=function(){
if(this.__CLASS_NAME__!=null){
return"["+this.__CLASS_NAME__+" object]";
}else{
return"[object]";
}
};
/* http://j2s.sf.net/ */Encoding=new Object();
Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<=0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.String=String;

Clazz.implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=Clazz.innerFunctions.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

String.prototype.$replace=function(c1,c2){

c1=c1.replace(/([\\\/\$\.\*\+\{\}\?\^\(\)\[\]])/g,function($0,$1){
return"\\"+$1;
});
var regExp=new RegExp(c1,"gm");
return this.replace(regExp,c2);
};
String.prototype.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,str);
};
String.prototype.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,str);
};
String.prototype.matches=function(exp){
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
String.prototype.regionMatches=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=this.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};
String.prototype.$plit=function(regex,limit){

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};

String.prototype.trim=function(){
var len=this.length;
var st=0;

while((st<len)&&(this.charAt(st)<=' ')){
st++;
}
while((st<len)&&(this.charAt(len-1)<=' ')){
len--;
}
return((st>0)||(len<len))?this.substring(st,len):this;
};

String.prototype.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
};


String.prototype.startsWith_string_number=function(prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>this.length-pc)){
return false;
}
while(--pc>=0){
if(this.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

String.prototype.startsWith=function(prefix){
if(arguments.length==1){
return this.startsWith_string_number(arguments[0],0);
}else if(arguments.length==2){
return this.startsWith_string_number(arguments[0],arguments[1]);
}else{
return false;
}
};

String.prototype.endsWith=function(suffix){
return this.startsWith(suffix,this.length-suffix.length);
};

String.prototype.equals=function(anObject){
return this==anObject;
};

String.prototype.equalsIgnoreCase=function(anotherString){
return this==anotherString
||this.toLowerCase()==anotherString.toLowerCase();
};


String.prototype.hash=0;

String.prototype.hashCode=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

String.prototype.getBytes=function(){
var utf8Str=Encoding.convert2UTF8(this);
var arrs=new Array(utf8Str.length);
for(var i=0;i<utf8Str.length;i++){
arrs[i]=utf8Str.charCodeAt(i);
}
return arrs;
};

String.prototype.compareTo=function(anotherString){
var len1=this.length;
var len2=anotherString.length;
var n=Math.min(len1,len2);
var k=0;
while(k<n){
var c1=this.charCodeAt(k);
var c2=anotherString.charCodeAt(k);
if(c1!=c2){
return c1-c2;
}
k++;
}
return len1-len2;
};

String.prototype.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};

String.valueOf=function(o){
return""+o;
};

String.prototype.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

String.prototype.compareToIgnoreCase=function(str){
if(this==str){
return 0;
}else if(this>str){
return 1;
}else{
return-1;
}
};

String.prototype.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=count;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

String.prototype.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};

String.indexOf=function(source,sourceOffset,sourceCount,
target,targetOffset,targetCount,fromIndex){
if(fromIndex>=sourceCount){
return(targetCount==0?sourceCount:-1);
}
if(fromIndex<0){
fromIndex=0;
}
if(targetCount==0){
return fromIndex;
}

var first=target[targetOffset];
var i=sourceOffset+fromIndex;
var max=sourceOffset+(sourceCount-targetCount);

startSearchForFirstChar:
while(true){

while(i<=max&&source[i]!=first){
i++;
}
if(i>max){
return-1;
}


var j=i+1;
var end=j+targetCount-1;
var k=targetOffset+1;
while(j<end){
if(source[j++]!=target[k++]){
i++;

continue startSearchForFirstChar;
}
}
return i-sourceOffset;
}
};

String.instantialize=function(){
if(arguments.length==0){
return new String();
}else if(arguments.length==1){
var x=arguments[0];
if(typeof x=="string"||x instanceof String){
return new String(x);
}else if(x instanceof Array){
if(x.length>0&&typeof x[0]=="number"){
var arr=new Array(x.length);
for(var i=0;i<x.length;i++){
arr[i]=String.fromCharCode(x[i]&0xff);
}
return Encoding.readUTF8(arr.join(''));
}
return x.join('');
}else if(x.__CLASS_NAME__=="StringBuffer"
||x.__CLASS_NAME__=="java.lang.StringBuffer"){
x.setShared();
var value=x.getValue();
var length=x.length();
var valueCopy=new Array(length);
for(var i=0;i<length;i++){
valueCopy[i]=value[i];
}
return valueCopy.join('')

}else{
return""+x;
}
}else if(arguments.length==2){
var x=arguments[0];
var y=arguments[1];
return String.instantialize(x,0,x.length,y);
}else if(arguments.length==3){
var bytes=arguments[0];
var offset=arguments[1];
var length=arguments[2];
var arr=new Array(length);
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
}
return arr.join('');
}else if(arguments.length==4){
var bytes=arguments[0];
var y=arguments[3];
if(typeof y=="string"||y instanceof String){
var offset=arguments[1];
var length=arguments[2];
var arr=new Array(length);
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
if(typeof arr[i]=="number"){
arr[i]=String.fromCharCode(arr[i]&0xff);
}
}
if(y.toLowerCase()=="utf-8"){
return Encoding.readUTF8(arr.join(''));
}else{
return arr.join('');
}
}else{
var value=new Array(count);

if(hibyte==0){
for(var i=count;i-->0;){
value[i]=String.fromCharCode(ascii[i+offset]&0xff);
}
}else{
hibyte<<=8;
for(var i=count;i-->0;){
value[i]=String.fromCharCode(hibyte|(ascii[i+offset]&0xff));
}
}
return value.join('');
}
}else{
var s="";
for(var i=0;i<arguments.length;i++){
s+=arguments[i];
}
return s;
}
};
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
throw new StringIndexOutOfBoundsException(newLength);
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
throw new StringIndexOutOfBoundsException(index);
}return this.value[index];
},"~N");
$_M(c$,"getChars",
function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}if((srcEnd<0)||(srcEnd>this.count)){
throw new StringIndexOutOfBoundsException(srcEnd);
}if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException("srcBegin > srcEnd");
}System.arraycopy(this.value,srcBegin,dst,dstBegin,srcEnd-srcBegin);
},"~N,~N,~A,~N");
$_M(c$,"setCharAt",
function(index,ch){
if((index<0)||(index>=this.count)){
throw new StringIndexOutOfBoundsException(index);
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
if(start<0)throw new StringIndexOutOfBoundsException(start);
if(end>this.count)end=this.count;
if(start>end)throw new StringIndexOutOfBoundsException();
var len=end-start;
if(len>0){
if(this.shared)this.copy();
System.arraycopy(this.value,start+len,this.value,start,this.count-end);
this.count-=len;
}return this;
},"~N,~N");
$_M(c$,"deleteCharAt",
function(index){
if((index<0)||(index>=this.count))throw new StringIndexOutOfBoundsException();
if(this.shared)this.copy();
System.arraycopy(this.value,index+1,this.value,index,this.count-index-1);
this.count--;
return this;
},"~N");
$_M(c$,"replace",
function(start,end,str){
if(start<0)throw new StringIndexOutOfBoundsException(start);
if(end>this.count)end=this.count;
if(start>end)throw new StringIndexOutOfBoundsException();
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
if(start<0)throw new StringIndexOutOfBoundsException(start);
if(end>this.count)throw new StringIndexOutOfBoundsException(end);
if(start>end)throw new StringIndexOutOfBoundsException(end-start);
return String.instantialize(this.value,start,end-start);
},"~N,~N");
$_M(c$,"insert",
function(index,str,offset,len){
if((index<0)||(index>this.count))throw new StringIndexOutOfBoundsException();
if((offset<0)||(offset+len<0)||(offset+len>str.length))throw new StringIndexOutOfBoundsException(offset);
if(len<0)throw new StringIndexOutOfBoundsException(len);
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
throw new StringIndexOutOfBoundsException();
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
throw new StringIndexOutOfBoundsException();
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
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Number=Number;

Number.__CLASS_NAME__="Number";
Clazz.implementOf(Number,java.io.Serializable);
Number.equals=Clazz.innerFunctions.equals;
Number.getName=Clazz.innerFunctions.getName;

Number.serialVersionUID=Number.prototype.serialVersionUID=-8742448824652078965;

Clazz.defineMethod(Number,"shortValue",
function(){
return Math.round(this)&0xffff;
});

Clazz.defineMethod(Number,"byteValue",
function(){
return Math.round(this)&0xff;
});

Clazz.defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.defineMethod(Number,"floatValue",
function(){
return this;
});

Clazz.defineMethod(Number,"doubleValue",
function(){
return this;
});

Clazz.defineMethod(Number,"hashCode",
function(){
return this.valueOf();
});
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Integer=Integer=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Integer,"Integer",Number,Comparable);
Integer.prototype.valueOf=function(){return 0;};
Integer.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Integer,
function(value){
var v=Math.round(value)&0xffffffff;
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Integer,
function(s){
var value=Integer.parseInt(s,10);
this.valueOf=function(){
return value;
};
},"String");
Integer.serialVersionUID=Integer.prototype.serialVersionUID=1360826667806852920;
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;

Clazz.defineMethod(Integer,"parseInt",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
return parseInt(s,radix);
},"String, Number");
Integer.parseInt=Integer.prototype.parseInt;
Clazz.defineMethod(Integer,"parseInt",
function(s){
return Integer.parseInt(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;

Clazz.defineMethod(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Long=Long=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Long,"Long",Number,Comparable);
Long.prototype.valueOf=function(){return 0;};
Long.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Long,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Long,
function(value){
var v=Math.round(value);
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Long,
function(s){
var value=Long.parseLong(s,10);
this.valueOf=function(){
return value;
};
},"String");
Long.serialVersionUID=Long.prototype.serialVersionUID=4290774380558885855;
Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;

Clazz.defineMethod(Long,"parseLong",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
return parseInt(s,radix);
},"String, Number");
Long.parseLong=Long.prototype.parseLong;
Clazz.defineMethod(Long,"parseLong",
function(s){
return Long.parseLong(s,10);
},"String");
Long.parseLong=Long.prototype.parseLong;

Clazz.defineMethod(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Float=Float=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Float,"Float",Number,Comparable);
Float.prototype.valueOf=function(){return 0;};
Float.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Float,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Float,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Float,
function(s){
var value=Float.parseFloat(s,10);
this.valueOf=function(){
return value;
};
},"String");
Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;

Clazz.defineMethod(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
return parseFloat(s);
},"String");
Float.parseFloat=Float.prototype.parseFloat;
Clazz.defineMethod(Float,"isNaN",
function(num){
return isNaN(num);
},"Number");
Float.isNaN=Float.prototype.isNaN;

Clazz.defineMethod(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

/* http://j2s.sf.net/ */Clazz.declarePackage("java.lang");
java.lang.Double=Double=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Double,"Double",Number,Comparable);
Double.prototype.valueOf=function(){return 0;};
Double.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Double,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Double,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Double,
function(s){
var value=Double.parseDouble(s,10);
this.valueOf=function(){
return value;
};
},"String");

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=3.4028235e+38;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.4e-45;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;

Clazz.defineMethod(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
return parseFloat(s);
},"String");
Double.parseDouble=Double.prototype.parseDouble;

Clazz.defineMethod(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");/* http://j2s.sf.net/ */Clazz.declarePackage("java.util");
java.util.Date=Date;
Clazz.decorateAsType(java.util.Date,"java.util.Date",null,[java.io.Serializable,Cloneable,Comparable]);

Clazz.defineMethod(java.util.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.defineMethod(java.util.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,java.util.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz.defineMethod(java.util.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
Clazz.defineMethod(java.util.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

$_J("java.util");
c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.util,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source==null)throw new IllegalArgumentException("null source");
this.source=source;
},"~O");
$_M(c$,"getSource",
function(){
return this.source;
});
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[source="+this.source+"]";
});
$_J("java.util");
$_I(java.util,"EventListener");
$_J("java.util");
c$=$_C(function(){
this.listener=null;
$_Z(this,arguments);
},java.util,"EventListenerProxy",null,java.util.EventListener);
$_K(c$,
function(listener){
this.listener=listener;
},"java.util.EventListener");
$_M(c$,"getListener",
function(){
return this.listener;
});
$_J("java.util");
$_I(java.util,"Iterator");
$_J("java.util");
$_I(java.util,"ListIterator",java.util.Iterator);
$_J("java.util");
$_I(java.util,"Enumeration");
$_J("java.util");
$_I(java.util,"Collection");
$_J("java.util");
$_I(java.util,"Set",java.util.Collection);
$_J("java.util");
$_I(java.util,"Map");
$_I(java.util.Map,"Entry");
$_J("java.util");
$_I(java.util,"List",java.util.Collection);
$_J("java.util");
$_I(java.util,"RandomAccess");
