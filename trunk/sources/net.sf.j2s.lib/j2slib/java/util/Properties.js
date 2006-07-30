$_L(["java.util.Hashtable"],"java.util.Properties",["java.io.BufferedReader","$.BufferedWriter","$.InputStreamReader","$.OutputStreamWriter","java.lang.IllegalArgumentException","$.StringBuffer","java.util.Date"],function(){
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
"keyValueSeparators","=: \t\r\n\f",
"strictKeyValueSeparators","=:",
"specialSaveChars","=: \t\r\n\f#!",
"whiteSpaceChars"," \t\r\n\f",
"hexDigit",['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']);
});
