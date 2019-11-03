$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimpleSerializable",null,Cloneable);
$_M(c$,"serialize",
function(){
var baseChar='B'.charCodeAt(0);
var buffer=[];
buffer[0]="WLL201";
var oClass=this.getClass();
var clazz=oClass;
var clazzName=clazz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charCodeAt(idx+1);
if(ch<48||ch>=58){
break;
}
}
clazz=clazz.getSuperclass();
if(clazz==null){
break;
}
clazzName=clazz.getName();
}
buffer[1]=clazzName;
buffer[2]='#';
buffer[3]="00000000$";
var headSize=buffer.join('').length;
var fields=oClass.declared$Fields;
if(fields==null){
fields=[];
}
var filter=arguments[0];
var ignoring=(filter==null||filter.ignoreDefaultFields());
var fMap=this.fieldMapping();
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
if(filter!=null&&!filter.accept(name))continue;
var fName=name;
if(fMap!=null&&fMap.length>1){
for(var j=0;j<fMap.length/2;j++){
if(name==fMap[j+j]){
var newName=fMap[j+j+1];
if(newName!=null&&newName.length>0){
fName=newName;
}
break;
}
}
}
var nameStr=String.fromCharCode(baseChar+fName.length)+fName;
var type=field.type;
if(type=='F' || type == 'D' || type == 'I' || type == 'L'
||type=='S' || type == 'B' || type == 'b'){
if(ignoring&&this[name]==0
&&(type=='F' || type == 'D' || type == 'I'
||type=='L' || type == 'S' || type == 'B')){
continue;
}
if(ignoring&&this[name]==false&&type=='b'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value=null;
if(type=='b'){
value=(this[name]==true)?"1":"0";
}else{
value=""+this[name];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='C'){
if(ignoring&&this[name]==0||this[name]=='\0'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value="";
if(typeof this[name]=='number'){
value+=this[name];
}else{
value+=this[name].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='s'){
if(ignoring&&this[name]==null){
continue;
}
buffer[buffer.length]=nameStr;
this.serializeString(buffer,this[name]);
}else if(type.charAt(0)=='A'){
if(this[name]==null){
if(ignoring){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var l4=this[name].length;
if(l4>52){
if(l4>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
var t=type.charAt(1);
var arr=this[name];
for(var j=0;j<arr.length;j++){
if(t=='F' || t == 'D' || t == 'I' || t == 'L'
||t=='S' || t == 'B' || t == 'b'){
var value=null;
if(type=='b'){
value=(arr[j]==true)?"1":"0";
}else{
value=""+arr[j];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='C'){
var value="";
if(typeof arr[j]=='number'){
value+=arr[j];
}else{
value+=arr[j].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='X'){
this.serializeString(buffer,arr[j]);
}
}
}
}
}
var strBuf=buffer.join('');
var size=strBuf.length;
if(size>0x1000000){
throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr=""+(size-headSize);
strBuf=strBuf.substring(0,headSize-sizeStr.length-1)+sizeStr+strBuf.substring(headSize-1);
return strBuf;
});
$_M(c$,"serializeString",
($fz=function(buffer,s){
var baseChar='B'.charCodeAt(0);
if(s==null){
buffer[buffer.length]='s';
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
var normal=/^[\r\n\t\u0020-\u007e]*$/.test(s);
if(normal){
buffer[buffer.length]='s';
}else{
buffer[buffer.length]='u';
s=Encoding.encodeBase64(Encoding.convert2UTF8(s));
}
var l4=s.length;
if(l4>52){
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
buffer[buffer.length]=s;
}
},$fz.isPrivate=true,$fz),"StringBuffer,~S");
$_M(c$,"deserialize",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
var baseChar='B'.charCodeAt(0);
if(str==null||start<0)return false;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return false;
var index=str.indexOf('#',start);
if(index==-1)return false;
index++;
if(index>=length+start)return false;
var size=0;
var nextCharCode=str.charCodeAt(index);
if(nextCharCode>=48&&nextCharCode<=57){
var last=index;
index=str.indexOf('$',last);
if(index==-1)return false;
var sizeStr=str.substring(last+1,index);
sizeStr=sizeStr.replace(/^0+/,'');
if(sizeStr.length!=0){
try{
size=parseInt(sizeStr);
}catch(e){}
}

if(size==0)return true;
index++;
if(size>length+start-index)return false;
}
var fieldMap=[];
var fields=this.getClass().declared$Fields;
if(fields==null)return false;
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
fieldMap[name]=true;
}
var end=index+size;
var fMap=this.fieldMapping();
while(index<start+length&&index<end){
var c1=str.charCodeAt(index++);
var l1=c1-baseChar;
if(l1<0)return true;
var fieldName=str.substring(index,index+l1);
if(fMap!=null&&fMap.length>1){
for(var i=0;i<fMap.length/2;i++){
if(fieldName==fMap[i+i+1]){
var trueName=fMap[i+i];
if(trueName!=null&&trueName.length>0){
fieldName=trueName;
}
break;
}
}
}
var count=0;
while(!fieldMap[fieldName]&&count++<=3){
fieldName="$"+fieldName;
}
index+=l1;
var c2=str.charAt(index++);
if(c2=='A'){
var field=fieldMap[fieldName];
c2=str.charAt(index++);
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
if(l2<0&&l2!=-2){
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=null;
}else{
if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
l2=parseInt(str.substring(index,index+l3));
if(l2>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
index+=l3;
}
var arr=new Array(l2);
var type=c2;
for(var i=0;i<l2;i++){
var s=null;
var c4=str.charCodeAt(index++);
if(c2!='X'){
var l3=c4-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}else if(l3==0){
s="";
}
}else{
var c5=str.charCodeAt(index++);
var l3=c5-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}else if(l3==0){
s="";
}else if(l3==-2){
var c6=str.charCodeAt(index++);
var l4=c6-baseChar;
if(l4<0)return true;
var l5=parseInt(str.substring(index,index+l4));
if(l5<0)return true;
index+=l4;
s=str.substring(index,index+l5);
index+=l5;
}
if(c4==117){
s=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(c4==85){
s=Encoding.readUTF8(s);
}
}
if(type=='F' || type == 'D'){
arr[i]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
arr[i]=parseInt(s);
}else if(type=='C'){
arr[i]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
arr[i]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='X'){
arr[i]=s;
}
}
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=arr;
}
}else{
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
var s=null;
if(l2>0){
s=str.substring(index,index+l2);
index+=l2;
}else if(l2==0){
s="";
}else if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
var l4=parseInt(str.substring(index,index+l3));
if(l4<0)return true;
index+=l3;
s=str.substring(index,index+l4);
index+=l4;
}
if(!fieldMap[fieldName]){
continue;
}
var type=c2;
if(type=='F' || type == 'D'){
this[fieldName]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
this[fieldName]=parseInt(s);
}else if(type=='C'){
this[fieldName]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
this[fieldName]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='s'){
this[fieldName]=s;
}else if(type=='u'){
this[fieldName]=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(type=='U'){
this[fieldName]=Encoding.readUTF8(s);
}
}
}
return true;
},"~S");
$_M(c$,"fieldMapping",
function(){
return null;
});
c$.parseInstance=$_M(c$,"parseInstance",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
if(str==null||start<0)return null;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return null;
var index=str.indexOf('#',start);
if(index==-1)return null;
var clazzName=str.substring(start+6,index);
clazzName=clazzName.replace(/\$/g,'.');
var runnableClass=null;
if($_D(clazzName)){
runnableClass=Clazz.evalType(clazzName);
}
if(runnableClass!=null){
var obj=new runnableClass($_G);
if(obj!=null&&$_O(obj,
net.sf.j2s.ajax.SimpleSerializable)){
return obj;
}
}
return null;
},"~S");
