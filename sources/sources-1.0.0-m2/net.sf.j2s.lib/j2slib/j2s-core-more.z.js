/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=console.css,j2s-core-bare.z.js,j2s-core-basic.z.js,j2s-core-util.z.js,java/lang/Class.js,java/io/Serializable.js,java/lang/CharSequence.js,java/lang/Cloneable.js,java/lang/Comparable.js,java/lang/Runnable.js,java/util/Comparator.js,java/lang/Enum.js,java/lang/Object.js,java/lang/String.js,java/lang/StringBuffer.js,java/lang/Number.js,java/lang/Integer.js,java/lang/Long.js,java/lang/Float.js,java/lang/Double.js,java/lang/ThreadGroup.js,java/lang/Thread.js,java/util/Date.js,java/util/Iterator.js,java/util/ListIterator.js,java/util/Enumeration.js,java/util/Collection.js,java/util/Set.js,java/util/Map.js,java/util/List.js,java/util/RandomAccess.js,java/util/AbstractCollection.js,java/util/AbstractSet.js,java/util/AbstractMap.js,java/util/AbstractList.js,java/util/ArrayList.js,java/util/HashMap.js,java/util/HashSet.js,java/util/Dictionary.js,java/util/Hashtable.js,java/util/Properties.js,java/util/Vector.js,java/util/Stack.js,java/util/EventObject.js,java/util/EventListener.js,java/util/EventListenerProxy.js
=*/
$_J("java.util");
c$=$_C(function(){
$_Z(this,arguments);
},java.util,"Dictionary");
$_K(c$,
function(){
});
$_J("java.util");
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
c$=$_C(function(){
$_Z(this,arguments);
},java.util.Hashtable,"EmptyEnumerator",null,java.util.Enumeration);
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
c$=$_C(function(){
$_Z(this,arguments);
},java.util.Hashtable,"EmptyIterator",null,java.util.Iterator);
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
this.threshold=parseInt((initialCapacity*loadFactor));
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
this.threshold=parseInt((newCapacity*this.loadFactor));
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
"serialVersionUID",1421746759512286392,
"KEYS",0,
"VALUES",1,
"ENTRIES",2);
c$.emptyEnumerator=c$.prototype.emptyEnumerator=new java.util.Hashtable.EmptyEnumerator();
c$.emptyIterator=c$.prototype.emptyIterator=new java.util.Hashtable.EmptyIterator();
$_J("java.util");
c$=$_C(function(){
this.defaults=null;
$_Z(this,arguments);
},java.util,"Properties",java.util.Hashtable);
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(defaults){
$_R(this,java.util.Properties,[]);
this.defaults=defaults;
},"java.util.Properties");
$_M(c$,"setProperty",
function(key,value){
return this.put(key,value);
},"~S,~S");
$_M(c$,"load",
function(inStream){
var $in=new java.io.BufferedReader(new java.io.InputStreamReader(inStream,"8859_1"));
while(true){
var line=$in.readLine();
if(line==null)return;
if(line.length>0){
var len=line.length;
var keyStart;
for(keyStart=0;keyStart<len;keyStart++)if(java.util.Properties.whiteSpaceChars.indexOf(line.charAt(keyStart))==-1)break;

if(keyStart==len)continue;var firstChar=line.charAt(keyStart);
if(((firstChar).charCodeAt(0)!=('#').charCodeAt(0))&&((firstChar).charCodeAt(0)!=('!').charCodeAt(0))){
while(this.continueLine(line)){
var nextLine=$in.readLine();
if(nextLine==null)nextLine="";
var loppedLine=line.substring(0,len-1);
var startIndex;
for(startIndex=0;startIndex<nextLine.length;startIndex++)if(java.util.Properties.whiteSpaceChars.indexOf(nextLine.charAt(startIndex))==-1)break;

nextLine=nextLine.substring(startIndex,nextLine.length);
line=String.instantialize(loppedLine+nextLine);
len=line.length;
}
var separatorIndex;
for(separatorIndex=keyStart;separatorIndex<len;separatorIndex++){
var currentChar=line.charAt(separatorIndex);
if((currentChar).charCodeAt(0)==('\\').charCodeAt(0))separatorIndex++;
else if(java.util.Properties.keyValueSeparators.indexOf(currentChar)!=-1)break;
}
var valueIndex;
for(valueIndex=separatorIndex;valueIndex<len;valueIndex++)if(java.util.Properties.whiteSpaceChars.indexOf(line.charAt(valueIndex))==-1)break;

if(valueIndex<len)if(java.util.Properties.strictKeyValueSeparators.indexOf(line.charAt(valueIndex))!=-1)valueIndex++;
while(valueIndex<len){
if(java.util.Properties.whiteSpaceChars.indexOf(line.charAt(valueIndex))==-1)break;
valueIndex++;
}
var key=line.substring(keyStart,separatorIndex);
var value=(separatorIndex<len)?line.substring(valueIndex,len):"";
key=this.loadConvert(key);
value=this.loadConvert(value);
this.put(key,value);
}}}
},"java.io.InputStream");
$_M(c$,"continueLine",
($fz=function(line){
var slashCount=0;
var index=line.length-1;
while((index>=0)&&((line.charAt(index--)).charCodeAt(0)==('\\').charCodeAt(0)))slashCount++;

return(slashCount%2==1);
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"loadConvert",
($fz=function(theString){
var aChar;
var len=theString.length;
var outBuffer=new StringBuffer(len);
for(var x=0;x<len;){
aChar=theString.charAt(x++);
if((aChar).charCodeAt(0)==('\\').charCodeAt(0)){
aChar=theString.charAt(x++);
if((aChar).charCodeAt(0)==('u').charCodeAt(0)){
var value=0;
for(var i=0;i<4;i++){
aChar=theString.charAt(x++);
switch(aChar){
case'0':
case'1':
case'2':
case'3':
case'4':
case'5':
case'6':
case'7':
case'8':
case'9':
value=(value<<4)+(aChar).charCodeAt(0)-('0').charCodeAt(0);
break;
case'a':
case'b':
case'c':
case'd':
case'e':
case'f':
value=(value<<4)+10+(aChar).charCodeAt(0)-('a').charCodeAt(0);
break;
case'A':
case'B':
case'C':
case'D':
case'E':
case'F':
value=(value<<4)+10+(aChar).charCodeAt(0)-('A').charCodeAt(0);
break;
default:
throw new IllegalArgumentException("Malformed \\uxxxx encoding.");
}
}
outBuffer.append(String.fromCharCode(value));
}else{
if((aChar).charCodeAt(0)==('t').charCodeAt(0))aChar='\t';
else if((aChar).charCodeAt(0)==('r').charCodeAt(0))aChar='\r';
else if((aChar).charCodeAt(0)==('n').charCodeAt(0))aChar='\n';
else if((aChar).charCodeAt(0)==('f').charCodeAt(0))aChar='\f';
outBuffer.append(aChar);
}}else outBuffer.append(aChar);
}
return outBuffer.toString();
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"saveConvert",
($fz=function(theString,escapeSpace){
var len=theString.length;
var outBuffer=new StringBuffer(len*2);
for(var x=0;x<len;x++){
var aChar=theString.charAt(x);
switch(aChar){
case' ':
if(x==0||escapeSpace)outBuffer.append('\\');
outBuffer.append(' ');
break;
case'\\':
outBuffer.append('\\');
outBuffer.append('\\');
break;
case'\t':
outBuffer.append('\\');
outBuffer.append('t');
break;
case'\n':
outBuffer.append('\\');
outBuffer.append('n');
break;
case'\r':
outBuffer.append('\\');
outBuffer.append('r');
break;
case'\f':
outBuffer.append('\\');
outBuffer.append('f');
break;
default:
if(((aChar).charCodeAt(0)<0x0020)||((aChar).charCodeAt(0)>0x007e)){
outBuffer.append('\\');
outBuffer.append('u');
outBuffer.append(java.util.Properties.toHex(((aChar).charCodeAt(0)>>12)&0xF));
outBuffer.append(java.util.Properties.toHex(((aChar).charCodeAt(0)>>8)&0xF));
outBuffer.append(java.util.Properties.toHex(((aChar).charCodeAt(0)>>4)&0xF));
outBuffer.append(java.util.Properties.toHex((aChar).charCodeAt(0)&0xF));
}else{
if(java.util.Properties.specialSaveChars.indexOf(aChar)!=-1)outBuffer.append('\\');
outBuffer.append(aChar);
}}
}
return outBuffer.toString();
},$fz.isPrivate=true,$fz),"~S,~B");
$_M(c$,"save",
function(out,header){
try{
this.store(out,header);
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
},"java.io.OutputStream,~S");
$_M(c$,"store",
function(out,header){
var awriter;
awriter=new java.io.BufferedWriter(new java.io.OutputStreamWriter(out,"8859_1"));
if(header!=null)java.util.Properties.writeln(awriter,"#"+header);
java.util.Properties.writeln(awriter,"#"+new java.util.Date().toString());
for(var e=this.keys();e.hasMoreElements();){
var key=e.nextElement();
var val=this.get(key);
key=this.saveConvert(key,true);
val=this.saveConvert(val,false);
java.util.Properties.writeln(awriter,key+"="+val);
}
awriter.flush();
},"java.io.OutputStream,~S");
c$.writeln=$_M(c$,"writeln",
($fz=function(bw,s){
bw.write(s);
bw.newLine();
},$fz.isPrivate=true,$fz),"java.io.BufferedWriter,~S");
$_M(c$,"getProperty",
function(key){
var oval=$_U(this,java.util.Properties,"get",[key]);
var sval=($_O(oval,String))?oval:null;
return((sval==null)&&(this.defaults!=null))?this.defaults.getProperty(key):sval;
},"~S");
$_M(c$,"getProperty",
function(key,defaultValue){
var val=this.getProperty(key);
return(val==null)?defaultValue:val;
},"~S,~S");
$_M(c$,"propertyNames",
function(){
var h=new java.util.Hashtable();
this.enumerate(h);
return h.keys();
});
$_M(c$,"list",
function(out){
out.println("-- listing properties --");
var h=new java.util.Hashtable();
this.enumerate(h);
for(var e=h.keys();e.hasMoreElements();){
var key=e.nextElement();
var val=h.get(key);
if(val.length>40){
val=val.substring(0,37)+"...";
}out.println(key+"="+val);
}
},"java.io.PrintStream");
$_M(c$,"list",
function(out){
out.println("-- listing properties --");
var h=new java.util.Hashtable();
this.enumerate(h);
for(var e=h.keys();e.hasMoreElements();){
var key=e.nextElement();
var val=h.get(key);
if(val.length>40){
val=val.substring(0,37)+"...";
}out.println(key+"="+val);
}
},"java.io.PrintWriter");
$_M(c$,"enumerate",
($fz=function(h){
if(this.defaults!=null){
this.defaults.enumerate(h);
}for(var e=this.keys();e.hasMoreElements();){
var key=e.nextElement();
h.put(key,this.get(key));
}
},$fz.isPrivate=true,$fz),"java.util.Hashtable");
c$.toHex=$_M(c$,"toHex",
($fz=function(nibble){
return java.util.Properties.hexDigit[(nibble&0xF)];
},$fz.isPrivate=true,$fz),"~N");
$_S(c$,
"serialVersionUID",4112578634029874840,
"keyValueSeparators","=: \t\r\n\f",
"strictKeyValueSeparators","=:",
"specialSaveChars","=: \t\r\n\f#!",
"whiteSpaceChars"," \t\r\n\f",
"hexDigit",['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']);
$_J("java.util");
c$=$_C(function(){
this.elementData=null;
this.elementCount=0;
this.capacityIncrement=0;
$_Z(this,arguments);
},java.util,"Vector",java.util.AbstractList,[java.util.List,java.util.RandomAccess,Cloneable,java.io.Serializable]);
$_K(c$,
function(initialCapacity,capacityIncrement){
$_R(this,java.util.Vector);
if(initialCapacity<0)throw new IllegalArgumentException("Illegal Capacity: "+initialCapacity);
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
this.elementData=new Array(parseInt(Math.min(Math.floor((this.elementCount*110)/100),2147483647)));
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
if(index>=this.elementCount)throw new IndexOutOfBoundsException(index+" >= "+this.elementCount);
if(elem==null){
for(var i=index;i>=0;i--)if(this.elementData[i]==null)return i;

}else{
for(var i=index;i>=0;i--)if(elem.equals(this.elementData[i]))return i;

}return-1;
},"~O,~N");
$_M(c$,"elementAt",
function(index){
if(index>=this.elementCount){
throw new ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
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
throw new ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
}this.elementData[index]=obj;
},"~O,~N");
$_M(c$,"removeElementAt",
function(index){
this.modCount++;
if(index>=this.elementCount){
throw new ArrayIndexOutOfBoundsException(index+" >= "+this.elementCount);
}else if(index<0){
throw new ArrayIndexOutOfBoundsException(index);
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
throw new ArrayIndexOutOfBoundsException(index+" > "+this.elementCount);
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
if($_O(e,CloneNotSupportedException)){
throw new InternalError();
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
if(index>=this.elementCount)throw new ArrayIndexOutOfBoundsException(index);
return this.elementData[index];
},"~N");
$_V(c$,"set",
function(index,element){
if(index>=this.elementCount)throw new ArrayIndexOutOfBoundsException(index);
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
if(index>=this.elementCount)throw new ArrayIndexOutOfBoundsException(index);
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
if(index<0||index>this.elementCount)throw new ArrayIndexOutOfBoundsException(index);
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
$_J("java.util");
c$=$_C(function(){
$_Z(this,arguments);
},java.util,"Stack",java.util.Vector);
$_K(c$,
function(){
$_R(this,java.util.Stack,[]);
});
$_M(c$,"push",
function(item){
this.addElement(item);
return item;
},"~O");
$_M(c$,"pop",
function(){
var obj;
var len=this.size();
obj=this.peek();
this.removeElementAt(len-1);
return obj;
});
$_M(c$,"peek",
function(){
var len=this.size();
if(len==0)throw new java.util.EmptyStackException();
return this.elementAt(len-1);
});
$_M(c$,"empty",
function(){
return this.size()==0;
});
$_M(c$,"search",
function(o){
var i=this.lastIndexOf(o);
if(i>=0){
return this.size()-i;
}return-1;
},"~O");
$_S(c$,
"serialVersionUID",1224463164541339165);
