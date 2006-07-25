Clazz.load(null,"java.lang.reflect.Modifier",["java.lang.StringBuffer","java.lang.reflect.Method"],function(){
c$=$_C(function(){
$_Z(this,arguments);
},reflect,"Modifier");
c$.isPublic=$_M(c$,"isPublic",
function(mod){
return(mod&1)!=0;
},"~N");
c$.isPrivate=$_M(c$,"isPrivate",
function(mod){
return(mod&2)!=0;
},"~N");
c$.isProtected=$_M(c$,"isProtected",
function(mod){
return(mod&4)!=0;
},"~N");
c$.isStatic=$_M(c$,"isStatic",
function(mod){
return(mod&8)!=0;
},"~N");
c$.isFinal=$_M(c$,"isFinal",
function(mod){
return(mod&16)!=0;
},"~N");
c$.isSynchronized=$_M(c$,"isSynchronized",
function(mod){
return(mod&32)!=0;
},"~N");
c$.isVolatile=$_M(c$,"isVolatile",
function(mod){
return(mod&64)!=0;
},"~N");
c$.isTransient=$_M(c$,"isTransient",
function(mod){
return(mod&128)!=0;
},"~N");
c$.isNative=$_M(c$,"isNative",
function(mod){
return(mod&256)!=0;
},"~N");
c$.isInterface=$_M(c$,"isInterface",
function(mod){
return(mod&512)!=0;
},"~N");
c$.isAbstract=$_M(c$,"isAbstract",
function(mod){
return(mod&1024)!=0;
},"~N");
c$.isStrict=$_M(c$,"isStrict",
function(mod){
return(mod&2048)!=0;
},"~N");
c$.toString=$_M(c$,"toString",
function(mod){
var sb=new StringBuffer();
var len;
if((mod&1)!=0)sb.append("public ");
if((mod&4)!=0)sb.append("protected ");
if((mod&2)!=0)sb.append("private ");
if((mod&1024)!=0)sb.append("abstract ");
if((mod&8)!=0)sb.append("static ");
if((mod&16)!=0)sb.append("final ");
if((mod&128)!=0)sb.append("transient ");
if((mod&64)!=0)sb.append("volatile ");
if((mod&32)!=0)sb.append("synchronized ");
if((mod&256)!=0)sb.append("native ");
if((mod&2048)!=0)sb.append("strictfp ");
if((mod&512)!=0)sb.append("interface ");
if((len=sb.length())>0)return sb.toString().substring(0,len-1);
return"";
},"~N");
$_S(c$,
"PUBLIC",0x00000001,
"PRIVATE",0x00000002,
"PROTECTED",0x00000004,
"STATIC",0x00000008,
"FINAL",0x00000010,
"SYNCHRONIZED",0x00000020,
"VOLATILE",0x00000040,
"TRANSIENT",0x00000080,
"NATIVE",0x00000100,
"INTERFACE",0x00000200,
"ABSTRACT",0x00000400,
"STRICT",0x00000800);
});
