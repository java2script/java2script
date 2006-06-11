/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=console.css,j2s-core-bare.z.js,j2s-core-basic.z.js,java/lang/System.js,java/lang/ThreadGroup.js,java/lang/Thread.js,java/util/ResourceBundle.js,net/sf/j2s/ajax/HttpRequest.js,net/sf/j2s/ajax/IXHRCallback.js,net/sf/j2s/ajax/XHRCallbackAdapter.js
=*/
/* http://j2s.sf.net/ */

var maxTotalLines=1000;
var linesCount=0;
var metLineBreak=false;

var splitNeedFixed="\n".split(/\n/).length!=2;

function splitIntoLineByR(s){
var arr=new Array();
var i=0;
var last=-1;
while(true){
i=s.indexOf('\r',last+1);
if(i!=-1){
arr[arr.length]=s.substring(last+1,i);
last=i;
if(last+1==s.length){
arr[arr.length]="";
break;
}
}else{
arr[arr.length]=s.substring(last+1);
break;
}
}
return arr;
}
function splitIntoLines(s){
var arr=new Array();
if(s==null){
return arr;
}
var i=0;
var last=-1;
while(true){
i=s.indexOf('\n',last+1);
var str=null;
if(i!=-1){
if(i>0&&s.charAt(i-1)=='\r'){
str=s.substring(last+1,i-1);
}else{
str=s.substring(last+1,i);
}
last=i;
}else{
str=s.substring(last+1);
}
var rArr=splitIntoLineByR(str);
for(var k=0;k<rArr.length;k++){
arr[arr.length]=rArr[k];
}
if(i==-1){
break;
}else if(last+1==s.length){
arr[arr.length]="";
break;
}
}
return arr;
}
var consoleBuffer=new Array();
function loopConsole(){
if(consoleBuffer.length==0){
return;
}
var console=document.getElementById("_console_");;
if(console==null){
if(document.body==null){
window.setTimeout("loopConsole ();",100);
return;
}
}
consoleOutput();
}
function consoleOutput(s,color,isBuffered){
var console=document.getElementById("_console_");;
if(console==null){
if(document.body==null){
consoleBuffer[consoleBuffer.length]={
message:s,
color:color
};
window.setTimeout("loopConsole ();",100);
return false;
}else{
console=document.createElement("div");
console.id="_console_";
console.className="consolewindow";
document.body.appendChild(console);
}
}
if(!isBuffered&&consoleBuffer.length!=0){
for(var i=0;i<consoleBuffer.length;i++){
var o=consoleBuffer[i];
consoleOutput(o.message,o.color,true);
}
consoleBuffer=new Array();
}
if(typeof s=="undefined"){
s="";
}else if(s==null){
s="null";
}else{
s=""+s;
}
if(linesCount>maxTotalLines){

for(var i=0;i<linesCount-maxTotalLines;i++){

console.removeChild(console.childNodes[0]);

}
linesCount=maxTotalLines;
}
var willMeetLineBreak=false;
if(s.length>0){
var lastChar=s.charAt(s.length-1);
if(lastChar=='\n'){
if(s.length>1){
var preLastChar=s.charAt(s.length-2);
if(preLastChar=='\r'){
s=s.substring(0,s.length-2);
}else{
s=s.substring(0,s.length-1);
}
}else{
s="";
}
willMeetLineBreak=true;
}else if(lastChar=='\r'){
s=s.substring(0,s.length-1);
willMeetLineBreak=true;
}
}

var lines=null;
var c160=String.fromCharCode(160);
s=s.replace(/\t/g,c160+c160+c160+c160+c160+c160+c160+c160);
if(splitNeedFixed){
try{
lines=splitIntoLines(s);
}catch(e){
popupAlert(e.message);
}
}else{
lines=s.split(/\r\n|\r|\n/g);
}
for(var i=0;i<lines.length;i++){
var lastLineEl=null;
if(metLineBreak||linesCount==0||console.childNodes.length<1){
lastLineEl=document.createElement("DIV");
console.appendChild(lastLineEl);
lastLineEl.style.whiteSpace="nowrap";
linesCount++;
}else{
try{
lastLineEl=console.childNodes[console.childNodes.length-1];
}catch(e){
lastLineEl=document.createElement("DIV");
console.appendChild(lastLineEl);
lastLineEl.style.whiteSpace="nowrap";
linesCount++;
}
}
var el=document.createElement("SPAN");
lastLineEl.appendChild(el);
el.style.whiteSpace="nowrap";
if(color!=null){
el.style.color=color;
}
if(lines[i].length==0){
lines[i]=String.fromCharCode(160);

}
el.appendChild(document.createTextNode(lines[i]));
console.scrollTop+=100;

if(i!=lines.length-1){
metLineBreak=true;
}else{
metLineBreak=willMeetLineBreak;
}
}
};

window.popupAlert=window.alert;

window.alert=function(s){
consoleOutput(s+"\r\n");
};

window.error=function(s){
consoleOutput(s+"\r\n","red");
};

window.log=function(s){
consoleOutput(s+"\r\n","yellow");
};

window.assert=function(){
var b=true;
if(arguments.length==1){
b=arguments[0];
}else if(arguments.length==2){
var x1=arguments[0];
var x2=arguments[1];
b=(x1==x2);
}else{
var x1=arguments[0];
var x2=arguments[1];
var delta=arguments[2];
b=Math.abs(x1-x2)<Math.abs(delta);
}
if(b){
consoleOutput("Passed\r\n","green");
}else{
if(arguments.length>=2){
consoleOutput("Failed: expecting "+arguments[1]
+", but "+arguments[0]+" !\r\n","red");
}else{
consoleOutput("Failed\r\n","red");
}
}
};


System=new Object();

System.arraycopy=function(src,srcPos,dest,destPos,length){
for(var i=0;i<length;i++){
dest[destPos+i]=src[srcPos+i];
}
};

System.out=new Object();

System.out.print=function(s){
consoleOutput(s);
};

System.out.println=function(s){
if(typeof s=="undefined"){
s="\r\n";
}else if(s==null){
s="null\r\n";
}else{
s=s+"\r\n";
}
consoleOutput(s);
};
System.out.printf=function(format,args){
if(format==null||format.length==0){
return;
}
var xargs=new Array();
if(arguments.length!=2){
for(var i=1;i<arguments.length;i++){
xargs[i-1]=arguments[i];
}
}else if(arguments[1]instanceof Array){
xargs=arguments[1];
}else{
xargs=[args];
}

var index=0;
var str=format.replace(/%(\d+\$)?([-#+ 0,\(<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/g,
function($0,$1,$2,$3,$4,$5,$6){
var o=null;
if($1!=null&&$1.length!=0){
var i=parseInt($1)-1;
o=xargs[i];
}else if($2!=null&&$2.length!=0){
o=xargs[index-1];
}else if($5!=null&&$5.length!=0){
o=System.out.formatTime(xargs[index],$6);
index++;
}else if($6=="n"){
o="\r\n";
}else if($6=="%"){
o="%";
}else{
o=xargs[index];
index++;
}
return o.toString();
});
this.print(str);
};
System.out.formatTime=function(t,p){
var o=t;
if(p=="H"){
o=""+t.getHours();
if(o.lenght<2){
o="0"+o;
}
}else if(p=="I"){
o=""+(t.getHours()%12);
if(o.lenght<2){
o="0"+o;
}
}else if(p=="k"){
o=""+t.getHours();
}else if(p=="l"){
o=""+(t.getHours()%12);
}else if(p=="M"){
o=""+t.getMinutes();
if(o.lenght<2){
o="0"+o;
}
}else if(p=="S"){
o=""+t.getSeconds();
if(o.lenght<2){
o="0"+o;
}
}else if(p=="L"){
o="000";
}else if(p=="N"){
o="000000000";
}else if(p=="k"){
o=(t.getHours()>12)?"pm":"am";
}else if(p=="z"){
o="+0800";

}
return o;
};

System.err=new Object();

System.err.print=function(s){
consoleOutput(s,"red");
};

System.err.println=function(s){
if(typeof s=="undefined"){
s="\r\n";
}else if(s==null){
s="null\r\n";
}else{
s=s+"\r\n";
}
consoleOutput(s,"red");
};

System.err.printf=System.out.printf;c$=$_C(function(){
this.parent=null;
this.name=null;
this.maxPriority=0;
$_Z(this,arguments);
},java.lang,"ThreadGroup");
$_K(c$,
function(){
this.name="system";
this.maxPriority=10;
});
$_K(c$,
function(name){
this.construct(Thread.currentThread().getThreadGroup(),name);
},"~S");
$_K(c$,
function(parent,name){
if(parent==null){
throw new NullPointerException();
}this.name=name;
this.parent=parent;
this.maxPriority=10;
},"ThreadGroup,~S");
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getMaxPriority",
function(){
return this.maxPriority;
});
c$=$_C(function(){
this.target=null;
this.group=null;
this.name=null;
this.priority=0;
$_Z(this,arguments);
},java.lang,"Thread",null,Runnable);
c$.currentThread=$_M(c$,"currentThread",
function(){
if(Thread.J2S_THREAD==null){
($t$=Thread.J2S_THREAD=new Thread(),Thread.prototype.J2S_THREAD=Thread.J2S_THREAD,$t$);
}return Thread.J2S_THREAD;
});
c$.sleep=$_M(c$,"sleep",
function(millis){
alert("Thread.sleep is not implemented in Java2Script!");
},"~N");
$_K(c$,
function(){
});
$_K(c$,
function(target){
this.init(null,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"Runnable");
$_K(c$,
function(group,target){
this.init(group,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"ThreadGroup,Runnable");
$_K(c$,
function(name){
this.init(null,null,name,0);
},"~S");
$_K(c$,
function(group,name){
this.init(group,null,name,0);
},"ThreadGroup,~S");
$_K(c$,
function(target,name){
this.init(null,target,name,0);
},"Runnable,~S");
$_K(c$,
function(group,target,name){
this.init(group,target,name,0);
},"ThreadGroup,Runnable,~S");
$_K(c$,
function(group,target,name,stackSize){
this.init(group,target,name,stackSize);
},"ThreadGroup,Runnable,~S,~N");
$_M(c$,"init",
($fz=function(g,target,name,stackSize){
if(g==null){
g=new ThreadGroup();
}this.group=g;
this.target=target;
this.name=name;
this.priority=5;
},$fz.isPrivate=true,$fz),"ThreadGroup,Runnable,~S,~N");
$_M(c$,"start",
function(){
window.setTimeout((function(runnable){
return function(){
runnable.run();
};
})(this),0);
});
$_M(c$,"run",
function(){
if(this.target!=null){
this.target.run();
}});
$_M(c$,"setPriority",
function(newPriority){
if(newPriority>10||newPriority<1){
throw new IllegalArgumentException();
}this.priority=newPriority;
},"~N");
$_M(c$,"getPriority",
function(){
return this.priority;
});
$_M(c$,"setName",
function(name){
this.name=name;
},"~S");
$_M(c$,"getName",
function(){
return String.valueOf(this.name);
});
$_M(c$,"getThreadGroup",
function(){
return this.group;
});
$_V(c$,"toString",
function(){
var group=this.getThreadGroup();
if(group!=null){
return"Thread["+this.getName()+","+this.getPriority()+","+group.getName()+"]";
}else{
return"Thread["+this.getName()+","+this.getPriority()+","+""+"]";
}});
$_S(c$,
"MIN_PRIORITY",1,
"NORM_PRIORITY",5,
"MAX_PRIORITY",10,
"J2S_THREAD",null);
$_J("java.util");
c$=$_C(function(){
this.parent=null;
this.locale=null;
this.bundleName=null;
$_Z(this,arguments);
},java.util,"ResourceBundle");
$_H();
c$=$_C(function(){
this.map=null;
this.keys=null;
this.content=null;
this.initialized=false;
$_Z(this,arguments);
},java.util.ResourceBundle,"TextResourceBundle",java.util.ResourceBundle);
$_Y(c$,function(){
this.map=new Array(0);
this.keys=new Array(0);
});
$_K(c$,
function(a){
$_R(this,java.util.ResourceBundle.TextResourceBundle,[]);
this.bundleName=a;
},"~S");
$_K(c$,
function(a,b){
$_R(this,java.util.ResourceBundle.TextResourceBundle,[]);
this.bundleName=a;
this.content=b;
},"~S,~S");
$_M(c$,"evalString",
function(a){
var r=new Array();
var b=false;
var x=0;
for(var i=0;i<a.length;i++){
var c=a.charAt(i);
if(b){
if(c=='f')r[r.length]='\f';
else if(c=='t')r[r.length]='\t';
else if(c=='r')r[r.length]='\r';
else if(c=='n')r[r.length]='\n';
else if(c=='\'') r[r.length] = '\'';
else if(c=='\"')r[r.length]='\"';
else if(c=='\\')r[r.length]='\\';
else if(c=='u'){
r[r.length]=eval("\"\\u" + a.substring (i + 1, i + 5) + "\"");
i+=4;
}
x=i+1;
b=false;
}else if(c=='\\'){
if(x!=i){
r[r.length]=a.substring(x,i);
}
b=true;
}
}
if(!b){
r[r.length]=a.substring(x,a.length);
}
return r.join('');
},"~S");
$_M(c$,"initBundle",
($fz=function(){
if(this.initialized){
return;
}this.initialized=true;
var a=null;
var b=this.bundleName;
if(this.content==null){
var n=b.replace(/\./g,'/')+".properties";
var p=["bin/","","j2slib/"];
var r=new net.sf.j2s.ajax.HttpRequest();
var x=0;
while(a==null&&x<p.length){
r.open("GET",p[x]+n,false);
try{
r.send();
a=r.getResponseText();
}catch(e){
r=new net.sf.j2s.ajax.HttpRequest();
}
x++;
}
}this.content=a;
if(this.content==null){
return;
}var c=this.content.$plit("\n");
for(var d=0;d<c.length;d++){
var e=c[d].trim();
if(!e.startsWith("#")){
var f=e.indexOf('=');
if(f!=-1){
var g=e.substring(0,f).trim();
var h=e.substring(f+1).trim();
if(h.indexOf('\\')!=-1){
h=this.evalString(h);
}var i=this.map;
var j=this.keys;
{
if(i[g]==null){
j[j.length]=g;
}
i[g]=h;
}}}}
},$fz.isPrivate=true,$fz));
$_V(c$,"getKeys",
function(){
return(function(i$,v$){
if(!$_D("java.util.ResourceBundle.TextResourceBundle$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.index=-1;
$_Z(this,arguments);
},java.util.ResourceBundle,"TextResourceBundle$1",null,java.util.Enumeration);
$_V(c$,"nextElement",
function(){
this.index++;
return this.b$["java.util.ResourceBundle.TextResourceBundle"].keys[this.index];
});
$_V(c$,"hasMoreElements",
function(){
return this.index<this.b$["java.util.ResourceBundle.TextResourceBundle"].keys.length-1;
});
c$=$_P();
}
return $_N(java.util.ResourceBundle.TextResourceBundle$1,i$,v$);
})(this,null);
});
$_V(c$,"handleGetObject",
function(a){
if(!this.initialized){
this.initBundle();
}var b=this.map;
{
return b[a];
}return b;
},"~S");
c$=$_P();
$_K(c$,
function(){
});
$_M(c$,"getString",
function(key){
return this.getObject(key);
},"~S");
$_M(c$,"getStringArray",
function(key){
return this.getObject(key);
},"~S");
$_M(c$,"getObject",
function(key){
var obj=this.handleGetObject(key);
if(obj==null){
if(this.parent!=null){
obj=this.parent.getObject(key);
}if(obj==null)throw new java.util.MissingResourceException("Can't find resource for bundle "+this.getClass().getName()+", key "+key,this.getClass().getName(),key);
}return obj;
},"~S");
$_M(c$,"getLocale",
function(){
return this.locale;
});
$_M(c$,"setParent",
function(parent){
this.parent=parent;
},"java.util.ResourceBundle");
c$.getBundle=$_M(c$,"getBundle",
function(baseName){
return java.util.ResourceBundle.getBundleImpl(baseName,null,null);
},"~S");
c$.getBundle=$_M(c$,"getBundle",
function(baseName,locale){
return java.util.ResourceBundle.getBundleImpl(baseName,locale,null);
},"~S,java.util.Locale");
c$.getBundle=$_M(c$,"getBundle",
function(baseName,locale,loader){
if(loader==null){
throw new NullPointerException();
}return java.util.ResourceBundle.getBundleImpl(baseName,locale,loader);
},"~S,java.util.Locale,ClassLoader");
c$.getBundleImpl=$_M(c$,"getBundleImpl",
($fz=function(baseName,locale,loader){
if(baseName==null){
throw new NullPointerException();
}for(var i=0;i<java.util.ResourceBundle.caches.length;i++){
if(java.util.ResourceBundle.caches[i].bundleName==baseName){
return java.util.ResourceBundle.caches[i];
}}
var bundle=new java.util.ResourceBundle.TextResourceBundle(baseName);
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length]=bundle;
return bundle;
},$fz.isPrivate=true,$fz),"~S,java.util.Locale,ClassLoader");
c$.registerBundle=$_M(c$,"registerBundle",
function(baseName,content){
for(var i=0;i<java.util.ResourceBundle.caches.length;i++){
if(java.util.ResourceBundle.caches[i].bundleName==baseName){
return;
}}
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length]=new java.util.ResourceBundle.TextResourceBundle(baseName,content);
},"~S,~S");
c$.caches=c$.prototype.caches=new Array(0);
/* http://j2s.sf.net/ */Clazz.declarePackage("net.sf.j2s.ajax");
c$=Clazz.decorateAsClass(function(){
this.transport=null;
if(window.XMLHttpRequest){
this.transport=new XMLHttpRequest();
}else{
try{
this.transport=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
this.transport=new ActiveXObject("Microsoft.XMLHTTP");
}
}
this.getReadyState=function(){
return this.transport.readyState;
};
this.getResponseText=function(){
return this.transport.responseText;
};
this.getResponseXML=function(){
return this.transport.responseXML;
};
this.getResponseCode=function(){
return this.transport.status;
};
this.registerOnReadyStateChange=function(handler){
this.transport.onreadystatechange=(function(transport,handler){
return function(){
var state=transport.readyState;
if(handler!=null){
if(state==1){
handler.onLoading();
}else if(state==2){
handler.onLoaded();
}else if(state==3){
handler.onLoaded();
}else if(state==4){
handler.onComplete();
transport.onreadystatechange=function(){};
}
}
};
})(this.transport,handler);
};
this.setRequestHeader=function(key,value){
this.transport.setRequestHeader(key,value);
};
this.getResponseHeader=function(key){
return this.transport.getResponseHeader(key);
};
this.open=function(method,url){
this.open(method,url,false);
};
this.open=function(method,url,async){
this.transport.open(method,url,async);
this.transport.setRequestHeader("User-Agent",
"Java2Script-Pacemaker/1.0 (+http://j2s.sourceforge.net)");
if(method!=null&&method.toLowerCase()=="post"){
this.transport.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");


if(this.transport.overrideMimeType){
this.transport.setRequestHeader("Connection","close");
}
}
};
this.send=function(){
this.send(null);
};
this.send=function(str){
this.transport.send(str);
};
},net.sf.j2s.ajax,"HttpRequest",null,Runnable);
Clazz.declarePackage ("net.sf.j2s.ajax");
Clazz.declareInterface (net.sf.j2s.ajax, "IXHRCallback");
Clazz.declarePackage ("net.sf.j2s.ajax");
c$ = Clazz.decorateAsClass (function () {
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ajax, "XHRCallbackAdapter", null, net.sf.j2s.ajax.IXHRCallback);
Clazz.overrideMethod (c$, "onComplete", 
function () {
});
Clazz.overrideMethod (c$, "onInteractive", 
function () {
});
Clazz.overrideMethod (c$, "onLoaded", 
function () {
});
Clazz.overrideMethod (c$, "onLoading", 
function () {
});
Clazz.overrideMethod (c$, "onUninitialized", 
function () {
});
