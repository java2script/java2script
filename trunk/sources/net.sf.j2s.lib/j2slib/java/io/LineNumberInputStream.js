$_L(["java.io.FilterInputStream"],"java.io.LineNumberInputStream",["java.lang.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.pushBack=-1;
this.lineNumber=0;
this.markLineNumber=0;
this.markPushBack=-1;
$_Z(this,arguments);
},java.io,"LineNumberInputStream",java.io.FilterInputStream);
$_M(c$,"read",
function(){
var c=this.pushBack;
if(c!=-1){
this.pushBack=-1;
}else{
c=this.$in.read();
}switch(c){
case'\r':
this.pushBack=this.$in.read();
if(this.pushBack==('\n').charCodeAt(0)){
this.pushBack=-1;
}case'\n':
this.lineNumber++;
return'\n';
}
return c;
});
$_M(c$,"read",
function(b,off,len){
if(b==null){
throw new NullPointerException();
}else if((off<0)||(off>b.length)||(len<0)||((off+len)>b.length)||((off+len)<0)){
throw new IndexOutOfBoundsException();
}else if(len==0){
return 0;
}var c=this.read();
if(c==-1){
return-1;
}b[off]=c;
var i=1;
try{
for(;i<len;i++){
c=this.read();
if(c==-1){
break;
}if(b!=null){
b[off+i]=c;
}}
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
return i;
},"~A,~N,~N");
$_V(c$,"skip",
function(n){
var chunk=2048;
var remaining=n;
var data;
var nr;
if(n<=0){
return 0;
}data=$_A(chunk,0);
while(remaining>0){
nr=this.read(data,0,Math.min(chunk,remaining));
if(nr<0){
break;
}remaining-=nr;
}
return n-remaining;
},"~N");
$_M(c$,"setLineNumber",
function(lineNumber){
this.lineNumber=lineNumber;
},"~N");
$_M(c$,"getLineNumber",
function(){
return this.lineNumber;
});
$_M(c$,"available",
function(){
return(this.pushBack==-1)?Math.floor($_U(this,java.io.LineNumberInputStream,"available",[])/ 2) : Math.floor ($_U (this, java.io.LineNumberInputStream, "available", []) /2)+1;
});
$_V(c$,"mark",
function(readlimit){
this.markLineNumber=this.lineNumber;
this.markPushBack=this.pushBack;
this.$in.mark(readlimit);
},"~N");
$_V(c$,"reset",
function(){
this.lineNumber=this.markLineNumber;
this.pushBack=this.markPushBack;
this.$in.reset();
});
});
