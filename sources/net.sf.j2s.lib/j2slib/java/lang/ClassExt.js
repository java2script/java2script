/* http://j2s.sf.net/ */







Clazz.MethodNotFoundException=function(obj,clazz,method,params){
var paramStr="";
if(params!=null){
paramStr=params.substring(1).replace(/\\/g,",");
}
var leadingStr="";
if(method!=null&&method!="construct"){
leadingStr="Method";
}else{
leadingStr="Constructor";
}
this.message=leadingStr+" "+Clazz.getClassName(clazz)+"."
+method+"("+paramStr+") is not found!";
this.toString=function(){
return"MethodNotFoundException:"+this.message;
}
};



Clazz.prepareCallback=function(objThis,args){
var classThisObj=args[0];
var cbName="b$";
if(objThis!=null&&classThisObj!=null&&classThisObj!=window){
var obs=objThis[cbName];
if(obs==null){
obs=new Array();
objThis[cbName]=obs;
}
var className=Clazz.getClassName(classThisObj);


obs[className.replace(/org\.eclipse\.swt\./,"$wt.")]=classThisObj;
var clazz=Clazz.getClass(classThisObj);
while(clazz.superClazz!=null){
clazz=clazz.superClazz;

obs[Clazz.getClassName(clazz)
.replace(/org\.eclipse\.swt\./,"$wt.")]=classThisObj;
}

var cbs=classThisObj[cbName];
if(cbs!=null&&cbs instanceof Array){
for(var s in cbs){
if(s!="length"){
obs[s]=cbs[s];
}
}
}
}

for(var i=0;i<args.length-1;i++){
args[i]=args[i+1];
}
args.length--;

};



Clazz.innerTypeInstance=function(clazzInner,objThis,finalVars){
var obj=null;
if(arguments.length==3){
obj=new clazzInner(objThis);
}else if(arguments.length==4){
obj=new clazzInner(objThis,arguments[3]);
}else if(arguments.length==5){
obj=new clazzInner(objThis,arguments[3],arguments[4]);
}else if(arguments.length==6){
obj=new clazzInner(objThis,arguments[3],arguments[4],
arguments[5]);
}else if(arguments.length==7){
obj=new clazzInner(objThis,arguments[3],arguments[4],
arguments[5],arguments[6]);
}else if(arguments.length==8){
obj=new clazzInner(objThis,arguments[3],arguments[4],
arguments[5],arguments[6],arguments[7]);
}else if(arguments.length==9){
obj=new clazzInner(objThis,arguments[3],arguments[4],
arguments[5],arguments[6],arguments[7],arguments[8]);
}else if(arguments.length==10){
obj=new clazzInner(objThis,arguments[3],arguments[4],
arguments[5],arguments[6],arguments[7],arguments[8],
arguments[9]);
}else{

obj=new clazzInner();
if(obj.construct==null){
throw new String("No support anonymous class constructor with "
+"more than 7 parameters.");
}
var args=new Array();
for(var i=3;i<arguments.length;i++){
args[i-3]=arguments[i];
}
obj.construct.apply(obj,args);
}

if(finalVars!=null&&objThis.f$==null){
obj.f$=finalVars;
}else if(finalVars==null&&objThis.f$!=null){
obj.f$=objThis.f$;
}else if(finalVars!=null&&objThis.f$!=null){
var o=new Object();
for(var attr in objThis.f$){
o[attr]=objThis.f$[attr];
}
for(var attr in finalVars){
o[attr]=finalVars[attr];
}
obj.f$=o;
}


return obj;
};



Clazz.cloneFinals=function(){
var o=new Object();
var length=arguments.length/2;
for(var i=0;i<length;i++){
o[arguments[i+i]]=arguments[i+i+1];
}
return o;
};


Clazz.isClassDefined=Clazz.isDefinedClass=function(clazzName){
if(clazzName!=null&&clazzName.length!=0){
var pkgFrags=clazzName.split(/\./);
var pkg=null;
for(var i=0;i<pkgFrags.length;i++){
if(pkg==null){
if(Clazz.allPackage[pkgFrags[0]]==null){

return false;
}
pkg=Clazz.allPackage[pkgFrags[0]];
}else{
if(pkg[pkgFrags[i]]==null){

return false;
}
pkg=pkg[pkgFrags[i]]
}
}

return pkg!=null;
}else{

return false;
}
};


Clazz.defineEnumConstant=function(clazzEnum,enumName,enumOrdinal,initialParams,clazzEnumExt){
var o=null;
if(clazzEnumExt!=null){
o=new clazzEnumExt();
}else{
o=new clazzEnum();
}
Clazz.superConstructor(o,clazzEnum,[enumName,enumOrdinal]);
if(initialParams!=null&&initialParams.length!=0){
o.construct.apply(o,initialParams);
}
clazzEnum[enumName]=o;
clazzEnum.prototype[enumName]=o;
return o;
};



Clazz.newArray=function(){
var args=arguments;
if(arguments.length==1){
if(arguments[0]instanceof Array){
args=arguments[0];
}
}
if(args.length<=1){
return new Array();
}else if(args.length==2){
var dim=args[0];
if(typeof dim=="string"){
dim=dim.charCodeAt(0);
}
var val=args[1];
var arr=new Array(dim);
for(var i=0;i<dim;i++){
arr[i]=val;
}
return arr;
}else{
var dim=args[0];
if(typeof dim=="string"){
dim=dim.charCodeAt(0);
}
var len=args.length-1;
var xargs=new Array(len);
for(var i=0;i<len;i++){
xargs[i]=args[i+1];
}
var arr=new Array(dim);
for(var i=0;i<dim;i++){

arr[i]=Clazz.newArray(xargs);
}
return arr;
}
};



Clazz.makeFunction=function(jsr){
return function(e){
if(e==null){
e=window.event;
}
if(jsr.setEvent!=null){
jsr.setEvent(e);
}
jsr.run();
if(e!=null){

e.cancelBubble=true;
if(e.stopPropagation){
e.stopPropagation();
}
}
if(jsr.returnSet==1){
return jsr.returnNumber;
}else if(jsr.returnSet==2){
return jsr.returnBoolean;
}else if(jsr.returnSet==3){
return jsr.returnObject;
}
};
};


Clazz.defineStatics=function(clazz){
for(var i=0;i<(arguments.length-1)/2;i++){
var name=arguments[i+i+1];
clazz[name]=clazz.prototype[name]=arguments[i+i+2];
}
};


Clazz.prepareFields=function(clazz,fieldsFun){
var stacks=new Array();
if(clazz.con$truct!=null){
var ss=clazz.con$truct.stacks;
var idx=clazz.con$truct.index;
for(var i=idx;i<ss.length;i++){
stacks[i]=ss[i];
}
}
clazz.con$truct=clazz.prototype.con$truct=function(){
var stacks=arguments.callee.stacks;
if(stacks!=null){
for(var i=0;i<stacks.length;i++){
stacks[i].apply(this,[]);
}
}
};
stacks[stacks.length]=fieldsFun;
clazz.con$truct.stacks=stacks;
clazz.con$truct.index=0;
};



Clazz.getMixedCallerMethod=function(args){
var o=new Object();
var argc=args.callee.caller;
if(argc==null)return null;
if(argc!=Clazz.tryToSearchAndExecute){
argc=argc.arguments.callee.caller;
if(argc==null)return null;
}
if(argc!=Clazz.tryToSearchAndExecute)return null;
argc=argc.arguments.callee.caller;
if(argc==null||argc!=Clazz.searchAndExecuteMethod)return null;
o.claxxRef=argc.arguments[1];
o.fxName=argc.arguments[2];
o.paramTypes=Clazz.getParamsType(argc.arguments[3]);
argc=argc.arguments.callee.caller;
if(argc==null)return null;
argc=argc.arguments.callee.caller;
if(argc==null)return null;
o.caller=argc;
return o;
};



Clazz.checkPrivateMethod=function(args){
var m=Clazz.getMixedCallerMethod(args);
if(m==null)return null;
var callerFx=m.claxxRef.prototype[m.caller.exName];
if(callerFx==null)return null;
var ppFun=null;
if(callerFx.claxxOwner!=null){
ppFun=callerFx.claxxOwner.prototype[m.fxName];
}else{
var stacks=callerFx.stacks;
for(var i=stacks.length-1;i>=0;i--){
var fx=stacks[i].prototype[m.caller.exName];
if(fx==m.caller){
ppFun=stacks[i].prototype[m.fxName];
}else if(fx!=null){
for(var fn in fx){
if(fn.indexOf('\\')==0&&fx[fn]==m.caller){
ppFun=stacks[i].prototype[m.fxName];
break;
}
}
}
if(ppFun!=null){
break;
}
}
}
if(ppFun!=null&&ppFun.claxxOwner==null){
ppFun=ppFun["\\"+m.paramTypes];
}
if(ppFun!=null&&ppFun.isPrivate&&ppFun!=args.callee){
return ppFun;
}
return null;
};
var $fz=null;

var c$=null;
Clazz.cla$$$tack=new Array();
Clazz.pu$h=function(){
if(c$!=null){
Clazz.cla$$$tack[Clazz.cla$$$tack.length]=c$;
}
};
Clazz.p0p=function(){
if(Clazz.cla$$$tack.length>0){
var clazz=Clazz.cla$$$tack[Clazz.cla$$$tack.length-1];
Clazz.cla$$$tack.length--;
return clazz;
}else{
return null;
}
};



Clazz.tracingCalling=false;



Clazz.initializingException=false;


Clazz.callingStack=function(caller,owner){
this.caller=caller;
this.owner=owner;
};
Clazz.callingStackTraces=new Array();
Clazz.pu$hCalling=function(stack){
Clazz.callingStackTraces[Clazz.callingStackTraces.length]=stack;
};
Clazz.p0pCalling=function(){
var length=Clazz.callingStackTraces.length;
if(length>0){
var stack=Clazz.callingStackTraces[length-1];
Clazz.callingStackTraces.length--;
return stack;
}else{
return null;
}
};



if(window["ClazzLoader"]!=null&&ClazzLoader.binaryFolders!=null){
Clazz.binaryFolders=ClazzLoader.binaryFolders;
}else{
Clazz.binaryFolders=["bin/","","j2slib/"];
}

Clazz.addBinaryFolder=function(bin){
if(bin!=null){
var bins=Clazz.binaryFolders;
for(var i=0;i<bins.length;i++){
if(bins[i]==bin){
return;
}
}
bins[bins.length]=bin;
}
};
Clazz.removeBinaryFolder=function(bin){
if(bin!=null){
var bins=Clazz.binaryFolders;
for(var i=0;i<bins.length;i++){
if(bins[i]==bin){
for(var j=i;j<bins.length-1;j++){
bins[j]=bins[j+1];
}
bins.length--;
return bin;
}
}
}
return null;
};
Clazz.setPrimaryFolder=function(bin){
if(bin!=null){
Clazz.removeBinaryFolder(bin);
var bins=Clazz.binaryFolders;
for(var i=bins.length-1;i>=0;i--){
bins[i+1]=bins[i];
}
bins[0]=bin;
}
};



Clazz.load=function(musts,clazz,optionals,declaration){
if(declaration!=null){
declaration();
}
};


w$=window;
d$=document;
System={
out:{
print:function(){},
printf:function(){},
println:function(){}
},
err:{
print:function(){},
printf:function(){},
println:function(){}
},
arraycopy:function(src,srcPos,dest,destPos,length){
for(var i=0;i<length;i++){
dest[destPos+i]=src[srcPos+i];
}
}
};
log=error=window.alert;

Thread=function(){};
Thread.J2S_THREAD=Thread.prototype.J2S_THREAD=new Thread();
Thread.currentThread=Thread.prototype.currentThread=function(){
return this.J2S_THREAD;
};


$_J=Clazz.declarePackage;$_C=Clazz.decorateAsClass;$_Z=Clazz.instantialize;$_I=Clazz.declareInterface;$_D=Clazz.isClassDefined;$_H=Clazz.pu$h;$_P=Clazz.p0p;$_B=Clazz.prepareCallback;$_N=Clazz.innerTypeInstance;$_K=Clazz.makeConstructor;$_U=Clazz.superCall;$_R=Clazz.superConstructor;$_M=Clazz.defineMethod;$_V=Clazz.overrideMethod;$_S=Clazz.defineStatics;$_E=Clazz.defineEnumConstant;$_F=Clazz.cloneFinals;$_Y=Clazz.prepareFields;$_A=Clazz.newArray;$_O=Clazz.instanceOf;$_G=Clazz.inheritArgs;$_X=Clazz.checkPrivateMethod;$_Q=Clazz.makeFunction;

