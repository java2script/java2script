/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=java/lang/Class.js,java/io/Serializable.js,java/lang/CharSequence.js,java/lang/Cloneable.js,java/lang/Comparable.js,java/lang/Runnable.js,java/util/Comparator.js,java/lang/Enum.js,java/lang/Object.js,java/lang/Encoding.js,java/lang/String.js,java/lang/StringBuffer.js
=*/
/* http://j2s.sf.net/ */




function Clazz(){
};

function NullObject(){
};


InternalFunction=Object;



Clazz.getClassName=function(clazzHost){
if(clazzHost==null){

return"NullObject";
}
if(typeof clazzHost=="function"){
var clazz=clazzHost;
if(clazz.__CLASS_NAME__!=null){

return clazz.__CLASS_NAME__;
}
var clazzStr=clazz.toString();
var idx0=clazzStr.indexOf("function");
if(idx0==-1){


if(clazzStr.charAt(0)=='['){
return clazzStr.substring(1,clazzStr.length-1);
}else{
return clazzStr.replace(/[^a-zA-Z0-9]/g,'');
}
}
var idx1=idx0+8;
var idx2=clazzStr.indexOf("(",idx1);
var clazzName=clazzStr.substring(idx1,idx2)
.replace(/^\s+/,"").replace(/\s+$/,"");
if(clazzName=="anonymous"){
return"Function";
}else{
return clazzName;
}
}else{
var obj=clazzHost;
if(obj instanceof Clazz.CastedNull){
return obj.clazzName;
}else{
var objType=typeof obj;
if(objType=="string"){

return"String";
}else if(objType=="object"){
if(obj.__CLASS_NAME__!=null){

return obj.__CLASS_NAME__;
}else if(obj.constructor==null){
return"Object";
}else{
return Clazz.getClassName(obj.constructor);
}
}else if(objType=="number"){
return"Number";
}else if(objType=="boolean"){
return"Boolean";
}
return Clazz.getClassName(obj.constructor);
}
}
};


Clazz.getClass=function(clazzHost){
if(clazzHost==null){

return Object;
}
if(typeof clazzHost=="function"){
return clazzHost;
}else{
var clazzName=null;
var obj=clazzHost;
if(obj instanceof Clazz.CastedNull){
clazzName=obj.clazzName;
}else{
var objType=typeof obj;
if(objType=="string"){
return String;
}else if(typeof obj=="object"){

if(obj.__CLASS_NAME__!=null){
clazzName=obj.__CLASS_NAME__;
}else if(obj.constructor==null){
return Object;
}else{
return obj.constructor;
}
}
}
if(clazzName!=null){



return Clazz.evalType(clazzName,true);
}else{
return obj.constructor;
}
}
};



Clazz.extendsProperties=function(hostThis,hostSuper){
for(var o in hostSuper){
if(o!="prototype"&&o!="superClazz"
&&o!="__CLASS_NAME__"&&o!="implementz"
&&!Clazz.checkInnerFunction(hostSuper,o)){
hostThis[o]=hostSuper[o];
}
}
};


Clazz.checkInnerFunction=function(hostSuper,funName){
for(var k=0;k<Clazz.innerFunctionNames.length;k++){
if(funName==Clazz.innerFunctionNames[k]&&
Clazz.innerFunctions[funName]==hostSuper[funName]){
return true;
}
}
return false;
};



Clazz.implementsProperties=function(hostThis,hostSuper){
for(var o in hostSuper){
if(o!="prototype"&&o!="superClazz"
&&o!="__CLASS_NAME__"&&o!="implementz"){
if(typeof hostSuper[o]=="function"){

if(Clazz.checkInnerFunction(hostSuper,o)){
continue;
}
}
hostThis[o]=hostSuper[o];
hostThis.prototype[o]=hostSuper[o];
}
}


};

Clazz.args4InheritClass=function(){
};
Clazz.inheritArgs=new Clazz.args4InheritClass();



Clazz.inheritClass=function(clazzThis,clazzSuper,objSuper){

Clazz.extendsProperties(clazzThis,clazzSuper);
if(objSuper!=null){





clazzThis.prototype=objSuper;
}else if(clazzSuper!=Number){
clazzThis.prototype=new clazzSuper(Clazz.inheritArgs);
}else{
clazzThis.prototype=new Number();
}
clazzThis.superClazz=clazzSuper;


clazzThis.prototype.__CLASS_NAME__=clazzThis.__CLASS_NAME__;
};



Clazz.implementOf=function(clazzThis,interfacez){
if(arguments.length>=2){
if(clazzThis.implementz==null){
clazzThis.implementz=new Array();
}
var impls=clazzThis.implementz;
if(arguments.length==2){
if(typeof interfacez=="function"){
impls[impls.length]=interfacez;
Clazz.implementsProperties(clazzThis,interfacez);
}else if(interfacez instanceof Array){
for(var i=0;i<interfacez.length;i++){
impls[impls.length]=interfacez[i];
Clazz.implementsProperties(clazzThis,interfacez[i]);
}
}
}else{
for(var i=1;i<arguments.length;i++){
impls[impls.length]=arguments[i];
Clazz.implementsProperties(clazzThis,arguments[i]);
}
}
}
};



Clazz.extendInterface=Clazz.implementOf;


Clazz.equalsOrExtendsLevel=function(clazzThis,clazzAncestor){
if(clazzThis==clazzAncestor){
return 0;
}
if(clazzThis.implementz!=null){
var impls=clazzThis.implementz;
for(var i=0;i<impls.length;i++){
var level=Clazz.equalsOrExtendsLevel(impls[i],clazzAncestor);
if(level>=0){
return level+1;
}
}
}
return-1;
};





Clazz.getInheritedLevel=function(clazzTarget,clazzBase){
if(clazzTarget==clazzBase){
return 0;
}
var isTgtStr=(typeof clazzTarget=="string");
var isBaseStr=(typeof clazzBase=="string");
if((isTgtStr&&("void"==clazzTarget||"unknown"==clazzTarget))
||(isBaseStr&&("void"==clazzBase
||"unknown"==clazzBase))){
return-1;
}

if((isTgtStr&&"NullObject"==clazzTarget)
||NullObject==clazzTarget){
if(clazzBase!=Number&&clazzBase!=Boolean
&&clazzBase!=NullObject){
return 0;
}
}
if(isTgtStr){

clazzTarget=Clazz.evalType(clazzTarget);
}
if(isBaseStr){

clazzBase=Clazz.evalType(clazzBase);
}
if(clazzBase==null||clazzTarget==null){
return-1;
}
var level=0;
var zzalc=clazzTarget;
while(zzalc!=clazzBase&&level<10){

if(zzalc.implementz!=null){
var impls=zzalc.implementz;
for(var i=0;i<impls.length;i++){
var implsLevel=Clazz.equalsOrExtendsLevel(impls[i],
clazzBase);
if(implsLevel>=0){
return level+implsLevel+1;
}
}
}

zzalc=zzalc.superClazz;
if(zzalc==null){
if(clazzBase==Object){
return level+1;
}else{
return-1;
}
}
level++;
}
return level;
};



Clazz.instanceOf=function(obj,clazz){
if(obj==null){
return clazz==undefined;
}
if(clazz==null){
return false;
}
if(obj instanceof clazz){
return true;
}else{

var clazzName=Clazz.getClassName(obj);
return Clazz.getInheritedLevel(clazzName,clazz)>=0;
}
};



Clazz.superCall=function(objThis,clazzThis,funName,funParams){
var fx=null;
var i=-1;
var clazzFun=objThis[funName];
if(clazzFun!=null){
if(clazzFun.claxxOwner!=null){

if(clazzFun.claxxOwner!=clazzThis){

fx=clazzFun;
}
}else{
var stacks=clazzFun.stacks;
var length=stacks.length;
for(i=length-1;i>=0;i--){


if(clazzThis==stacks[i]){
if(i>0){
i--;
fx=stacks[i].prototype[funName];
}else{

fx=stacks[0].prototype[funName]["\\unknown"];
}
break;
}else if(Clazz.getInheritedLevel(clazzThis,
stacks[i])>0){
fx=stacks[i].prototype[funName];
break;
}
}
}
}
if(fx!=null){

if(i==0&&funName=="construct"){
var ss=clazzFun.stacks;
if(ss!=null&&ss[0].superClazz==null
&&ss[0].con$truct!=null){
ss[0].con$truct.apply(objThis,[]);
}
}
if(Clazz.tracingCalling){
var caller=arguments.callee.caller;
if(caller==Clazz.superConstructor){
caller=caller.arguments.callee.caller;
}
Clazz.pu$hCalling(new Clazz.callingStack(caller,clazzThis));
var ret=fx.apply(objThis,(funParams==null)?[]:funParams);
Clazz.p0pCalling();
return ret;
}
return fx.apply(objThis,(funParams==null)?[]:funParams);
}else if(funName=="construct"){



return;
}
throw new Clazz.MethodNotFoundException(objThis,clazzThis,funName,
Clazz.getParamsType(funParams).typeString);
};



Clazz.superConstructor=function(objThis,clazzThis,funParams){
Clazz.superCall(objThis,clazzThis,"construct",funParams);

if(clazzThis.con$truct!=null){
clazzThis.con$truct.apply(objThis,[]);
}
};



Clazz.CastedNull=function(asClazz){
if(asClazz!=null){
if(asClazz instanceof String){
this.clazzName=asClazz;
}else if(asClazz instanceof Function){
this.clazzName=Clazz.getClassName(asClazz);
}else{
this.clazzName=""+asClazz;
}
}else{
this.clazzName="Object";
}
this.toString=function(){
return null;
};
this.valueOf=function(){
return null;
};
};



Clazz.castNullAs=function(asClazz){
return new Clazz.CastedNull(asClazz);
};



Clazz.MethodException=function(){

};

Clazz.MethodNotFoundException=function(){
this.toString=function(){
return"MethodNotFoundException";
};
};


Clazz.getParamsType=function(funParams){
var params=new Array();
params.hasCastedNull=false;
if(funParams!=null){
for(var i=0;i<funParams.length;i++){
params[i]=Clazz.getClassName(funParams[i]);
if(funParams[i]instanceof Clazz.CastedNull){
params.hasCastedNull=true;
}
}
}
if(params.length==0){
params[0]="void";
}
params.typeString="\\"+params.join('\\');

return params;
};


Clazz.searchAndExecuteMethod=function(objThis,claxxRef,fxName,funParams){
var params=Clazz.getParamsType(funParams);
var fx=objThis[fxName];

if(fx.lastParams==params.typeString&&fx.lastClaxxRef==claxxRef){
var methodParams=null;
if(params.hasCastedNull){
methodParams=new Array();
for(var k=0;k<funParams.length;k++){
if(funParams[k]instanceof Clazz.CastedNull){

methodParams[k]=null;
}else{
methodParams[k]=funParams[k];
}
}
}else{
methodParams=funParams;
}
return fx.lastMethod.apply(objThis,methodParams);
}
fx.lastParams=params.typeString;
fx.lastClaxxRef=claxxRef;

var stacks=fx.stacks;
var length=stacks.length;

var began=false;
for(var i=length-1;i>-1;i--){


if(began||stacks[i]==claxxRef){

var clazzFun=stacks[i].prototype[fxName];
















var ret=Clazz.tryToSearchAndExecute(objThis,clazzFun,params,
funParams,fx);
if(!(ret instanceof Clazz.MethodException)){
return ret;
}

began=true;
}
}
if("construct"==fxName){

return;
}

throw new Clazz.MethodNotFoundException(objThis,claxxRef,
fxName,params.typeString);
};

var fNullCount=0;



Clazz.ie$plit="\\2".split(/\\/).length==1;

Clazz.tracingCalling=false;


Clazz.tryToSearchAndExecute=function(objThis,clazzFun,params,funParams,fx){
var methods=new Array();

var generic=true;
for(var fn in clazzFun){

if(fn.charCodeAt(0)==92){
var ps=(Clazz.ie$plit?fn:fn.substring(1)).split(/\\/);
if(ps.length==params.length){
methods[methods.length]=ps;
}
generic=false;
continue;
}


if(generic&&fn=="funParams"&&clazzFun.funParams!=null){

fn=clazzFun.funParams;
var ps=(Clazz.ie$plit?fn:fn.substring(1)).split(/\\/);
if(ps.length==params.length){
methods[0]=ps;
}
break;
}
}
if(methods.length==0){

return new Clazz.MethodException();
}



var method=Clazz.searchMethod(methods,params);
if(method!=null){
var f=null;
if(generic){

f=clazzFun;
}else{
f=clazzFun["\\"+method];
}

var methodParams=null;
if(params.hasCastedNull){
methodParams=new Array();
for(var k=0;k<funParams.length;k++){
if(funParams[k]instanceof Clazz.CastedNull){

methodParams[k]=null;
}else{
methodParams[k]=funParams[k];
}
}
}else{
methodParams=funParams;
}
if(Clazz.tracingCalling){
var caller=arguments.callee.caller;
caller=caller.arguments.callee.caller;
caller=caller.arguments.callee.caller;
var xpushed=f.exName=="construct"
&&Clazz.getInheritedLevel(f.exClazz,Throwable)>=0
&&!Clazz.initializingException;
if(xpushed){
Clazz.initializingException=true;

var xcaller=caller.arguments.callee.caller
.arguments.callee.caller;
var fun=xcaller.arguments.callee;
var owner=fun.claxxReference;
if(owner==null){
owner=fun.exClazz;
}
if(owner==null){
owner=fun.claxxOwner;
}

Clazz.pu$hCalling(new Clazz.callingStack(xcaller,owner));
}

var noInnerWrapper=caller!=Clazz.instantialize
&&caller!=Clazz.superCall;
if(noInnerWrapper){
var fun=caller.arguments.callee;
var owner=fun.claxxReference;
if(owner==null){
owner=fun.exClazz;
}
if(owner==null){
owner=fun.claxxOwner;
}
Clazz.pu$hCalling(new Clazz.callingStack(caller,owner));
}
fx.lastMethod=f;
var ret=f.apply(objThis,methodParams);
if(noInnerWrapper){
Clazz.p0pCalling();
}
if(xpushed){
Clazz.p0pCalling();
}
return ret;
}
fx.lastMethod=f;
return f.apply(objThis,methodParams);

}

return new Clazz.MethodException();
};

Clazz.initializingException=false;



Clazz.searchMethod=function(roundOne,paramTypes){



var roundTwo=new Array();
for(var i=0;i<roundOne.length;i++){
var fittedLevel=new Array();
var isFitted=true;
for(var j=0;j<roundOne[i].length;j++){
fittedLevel[j]=Clazz.getInheritedLevel(paramTypes[j],
roundOne[i][j]);
if(fittedLevel[j]<0){
isFitted=false;
break;
}
}
if(isFitted){
fittedLevel[paramTypes.length]=i;
roundTwo[roundTwo.length]=fittedLevel;
}
}
if(roundTwo.length==0){
return null;
}

var resultTwo=roundTwo;
var min=resultTwo[0];
for(var i=1;i<resultTwo.length;i++){
var isVectorLesser=true;
for(var j=0;j<paramTypes.length;j++){
if(min[j]<resultTwo[i][j]){
isVectorLesser=false;;
break;
}
}
if(isVectorLesser){
min=resultTwo[i];
}
}
var index=min[paramTypes.length];
return roundOne[index].join('\\');



};



Clazz.generateDelegatingMethod=function(claxxRef,funName){

var delegating=function(){
var r=arguments;
return SAEM(this,r.callee.claxxReference,r.callee.methodName,r);
};
delegating.methodName=funName;
delegating.claxxReference=claxxRef;
return delegating;
};

SAEM=Clazz.searchAndExecuteMethod;



Clazz.formatParameters=function(funParams){
if(funParams!=null&&funParams.length!=0){



var s=funParams.toString();
s=s.replace(/~([NABSO])/g,function($0,$1){
if($1=='N'){
return"Number";
}else if($1=='B'){
return"Boolean"
}else if($1=='S'){
return"String";
}else if($1=='O'){
return"Object";
}else if($1=='A'){
return"Array"
}
return"Unknown";
});
return"\\"+s.replace(/\s+/g,"").replace(/,/g,"\\");
}else{
return"\\void";
}
};


Clazz.overrideMethod=function(clazzThis,funName,funBody,funParams){
funBody.exName=funName;
var fpName=Clazz.formatParameters(funParams);


funBody.funParams=fpName;
funBody.claxxOwner=clazzThis;
clazzThis.prototype[funName]=funBody;
return funBody;
};



Clazz.defineMethod=function(clazzThis,funName,funBody,funParams){
funBody.exName=funName;
var fpName=Clazz.formatParameters(funParams);

var f$=clazzThis.prototype[funName];
if(f$==null){


funBody.funParams=fpName;
funBody.claxxOwner=clazzThis;
clazzThis.prototype[funName]=funBody;
funBody.exClazz=clazzThis;
return funBody;

}else if(f$.claxxOwner==clazzThis
&&f$.funParams==fpName){
return f$;
}
var oldFun=null;
var oldStacks=new Array();

if(f$.stacks==null){

oldFun=f$;
if(f$.claxxOwner!=null){
oldStacks[0]=oldFun.claxxOwner;
}
}else{
oldStacks=f$.stacks;
}














if(f$.stacks==null
||f$.claxxReference!=clazzThis){

f$=clazzThis.prototype[funName]=Clazz
.generateDelegatingMethod(clazzThis,funName);



var arr=new Array();
for(var i=0;i<oldStacks.length;i++){
arr[i]=oldStacks[i];
}
f$.stacks=arr;
}
var ss=f$.stacks;

if(ss.length==0){
ss[ss.length]=clazzThis;
}else{
var existed=false;
for(var i=ss.length-1;i>=0;i--){
if(ss[i]==clazzThis){
existed=true;
break;
}
}
if(!existed){
ss[ss.length]=clazzThis;
}
}

if(oldFun!=null){
if(oldFun.claxxOwner==clazzThis){
f$[oldFun.funParams]=oldFun;
oldFun.claxxOwner=null;

oldFun.funParams=null;
}else if(oldFun.claxxOwner==null){

f$["\\unknown"]=oldFun;
}
}
funBody.exClazz=clazzThis;
f$[fpName]=funBody;
return f$;
};



Clazz.makeConstructor=function(clazzThis,funBody,funParams){
var funName="construct";
Clazz.defineMethod(clazzThis,funName,funBody,funParams);
if(clazzThis.con$truct!=null){
clazzThis.con$truct.index=clazzThis.con$truct.stacks.length;
}

};


Clazz.allPackage=new Object();

Clazz.lastPackageName=null;
Clazz.lastPackage=null;


Clazz.declarePackage=function(pkgName){
if(Clazz.lastPackageName==pkgName){
return Clazz.lastPackage;
}
if(pkgName!=null&&pkgName.length!=0){
var pkgFrags=pkgName.split(/\./);
var pkg=Clazz.allPackage;
for(var i=0;i<pkgFrags.length;i++){
if(pkg[pkgFrags[i]]==null){
pkg[pkgFrags[i]]={
__PKG_NAME__:((pkg.__PKG_NAME__!=null)?
pkg.__PKG_NAME__+"."+pkgFrags[i]:pkgFrags[i])
};

if(i==0){

window[pkgFrags[i]]=pkg[pkgFrags[i]];
}
}
pkg=pkg[pkgFrags[i]]
}
Clazz.lastPackageName=pkgName;
Clazz.lastPackage=pkg;
return pkg;
}
};


Clazz.evalType=function(typeStr,isQualified){

var idx=typeStr.lastIndexOf(".");
if(idx!=-1){
var pkgName=typeStr.substring(0,idx);
var pkg=Clazz.declarePackage(pkgName);
var clazzName=typeStr.substring(idx+1);
return pkg[clazzName];


}else if(isQualified){
return window[typeStr];
}else if(typeStr=="number"){
return Number;
}else if(typeStr=="object"){
return Object;
}else if(typeStr=="string"){
return String;
}else if(typeStr=="boolean"){
return Boolean;
}else if(typeStr=="function"){
return Function;
}else if(typeStr=="void"||typeStr=="undefined"
||typeStr=="unknown"){
return typeStr;
}else if(typeStr=="NullObject"){
return NullObject;
}else{
return window[typeStr];
}
};



Clazz.defineType=function(qClazzName,clazzFun,clazzParent,interfacez){
var idx=qClazzName.lastIndexOf(".");
if(idx!=-1){
var pkgName=qClazzName.substring(0,idx);
var pkg=Clazz.declarePackage(pkgName);
var clazzName=qClazzName.substring(idx+1);
if(pkg[clazzName]!=null){

return pkg[clazzName];
}
pkg[clazzName]=clazzFun;
}else{
if(window[qClazzName]!=null){

return window[qClazzName];
}
window[qClazzName]=clazzFun;
}
Clazz.decorateAsType(clazzFun,qClazzName,clazzParent,interfacez);
var iFun=Clazz.innerFunctions;
clazzFun.defineMethod=iFun.defineMethod;
clazzFun.defineStaticMethod=iFun.defineStaticMethod;
clazzFun.makeConstructor=iFun.makeConstructor;
return clazzFun;
};


Clazz.instantialize=function(objThis,args){
if(args!=null&&args.length==1&&args[0]!=null
&&args[0]instanceof Clazz.args4InheritClass){
return;
}

var c=objThis.construct;
if(c!=null){
if(objThis.con$truct==null){
c.apply(objThis,args);
}else if(objThis.getClass().superClazz==null){
objThis.con$truct.apply(objThis,[]);
c.apply(objThis,args);
}else if((c.claxxOwner!=null
&&c.claxxOwner==objThis.getClass())
||(c.stacks!=null
&&c.stacks[c.stacks.length-1]==objThis.getClass())){

c.apply(objThis,args);
}else{
if(c.claxxOwner!=null&&c.claxxOwner.superClazz==null
&&c.claxxOwner.con$truct!=null){
c.claxxOwner.con$truct.apply(objThis,[]);
}else if(c.stacks!=null&&c.stacks.length==1
&&c.stacks[0].superClazz==null){
c.stacks[0].con$truct.apply(objThis,[]);
}
c.apply(objThis,args);
objThis.con$truct.apply(objThis,[]);
}
}else if(objThis.con$truct!=null){
objThis.con$truct.apply(objThis,[]);
}
};




Clazz.innerFunctionNames=[
"equals","getName","defineMethod","defineStaticMethod",
"makeConstructor"
];


Clazz.innerFunctions={

equals:function(aFun){
return this==aFun;
},


getName:function(){
return Clazz.getClassName(this);
},

getResourceAsStream:function(name){
var is=null;
if(java.io.InputStream!=null){
is=new java.io.InputStream();
}else{
is=new Object();
is.close=function(){};
}
is.read=function(){return 0;};
name=name.replace(/\\/g,'/');
if(name.indexOf('/')==0){
is.url=name.substring(1);
}else{
var baseFolder=window.binaryFolder;
if(baseFolder==null||baseFolder.length==0){
baseFolder="bin/";
}
baseFolder=baseFolder.replace(/\\/g,'/');
var length=baseFolder.length;
var lastChar=baseFolder.charAt(length-1);
if(lastChar!='/'){
baseFolder+="/";
}
if(baseFolder.indexOf('/')==0){
baseFolder=baseFolder.substring(1);
}
var clazzName=this.__CLASS_NAME__;
var idx=clazzName.lastIndexOf('.');
if(idx==-1){
is.url=baseFolder+name;
}else{
is.url=baseFolder+clazzName.substring(0,idx)
.replace(/\./g,'/')+"/"+name;
}
}
return is;
},

defineMethod:function(methodName,funBody,paramTypes){
Clazz.defineMethod(this,methodName,funBody,paramTypes);
},


defineStaticMethod:function(methodName,funBody,paramTypes){
Clazz.defineMethod(this,methodName,funBody,paramTypes);
this[methodName]=this.prototype[methodName];
},


makeConstructor:function(funBody,paramTypes){
Clazz.makeConstructor(this,funBody,paramTypes);
}
};


Clazz.decorateFunction=function(clazzFun,prefix,name){
var qName=null;
if(prefix==null){


qName=name;
window[name]=clazzFun;
}else if(prefix.__PKG_NAME__!=null){


qName=prefix.__PKG_NAME__+"."+name;
prefix[name]=clazzFun;
if(prefix==java.lang){
window[name]=clazzFun;
}
}else{


qName=prefix.__CLASS_NAME__+"."+name;
prefix[name]=clazzFun;
}
clazzFun.__CLASS_NAME__=qName;
clazzFun.prototype.__CLASS_NAME__=qName;
clazzFun.equals=Clazz.innerFunctions.equals;
clazzFun.getName=Clazz.innerFunctions.getName;
clazzFun.getResourceAsStream=Clazz.innerFunctions.getResourceAsStream;
};


Clazz.declareInterface=function(prefix,name,interfacez){
var clazzFun=function(){};
Clazz.decorateFunction(clazzFun,prefix,name);
if(interfacez!=null){
Clazz.implementOf(clazzFun,interfacez);
}
return clazzFun;
};


Clazz.decorateAsClass=function(clazzFun,prefix,name,clazzParent,
interfacez,clazzParentInstance){
var qName=null;
Clazz.decorateFunction(clazzFun,prefix,name);
if(clazzParentInstance!=null){
Clazz.inheritClass(clazzFun,clazzParent,clazzParentInstance);
}else if(clazzParent!=null){
Clazz.inheritClass(clazzFun,clazzParent);
}
if(interfacez!=null){
Clazz.implementOf(clazzFun,interfacez);
}
return clazzFun;
};


Clazz.decorateAsType=function(clazzFun,qClazzName,clazzParent,
interfacez,clazzParentInstance){
clazzFun.__CLASS_NAME__=qClazzName;


clazzFun.prototype.__CLASS_NAME__=qClazzName;

clazzFun.equals=Clazz.innerFunctions.equals;
clazzFun.getName=Clazz.innerFunctions.getName;

if(clazzParentInstance!=null){
Clazz.inheritClass(clazzFun,clazzParent,clazzParentInstance);
}else if(clazzParent!=null){
Clazz.inheritClass(clazzFun,clazzParent);
}
if(interfacez!=null){
Clazz.implementOf(clazzFun,interfacez);
}
return clazzFun;
};

Clazz.declarePackage("java.lang");
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

w$=window;
d$=document;

$_J=Clazz.declarePackage;$_C=Clazz.decorateAsClass;$_Z=Clazz.instantialize;$_I=Clazz.declareInterface;$_D=Clazz.isClassDefined;$_H=Clazz.pu$h;$_P=Clazz.p0p;$_B=Clazz.prepareCallback;$_N=Clazz.innerTypeInstance;$_K=Clazz.makeConstructor;$_U=Clazz.superCall;$_R=Clazz.superConstructor;$_M=Clazz.defineMethod;$_V=Clazz.overrideMethod;$_S=Clazz.defineStatics;$_E=Clazz.defineEnumConstant;$_F=Clazz.cloneFinals;$_Y=Clazz.prepareFields;$_A=Clazz.newArray;$_O=Clazz.instanceOf;$_G=Clazz.inheritArgs;$_X=Clazz.checkPrivateMethod;$_Q=Clazz.makeFunction;

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
this.c=null;
this.a=0;
this.b=false;
$_Z(this,arguments);
},java.lang,"StringBuffer",null,[java.io.Serializable,CharSequence]);
$_K(c$,
function(){
this.construct(16);
});
$_K(c$,
function(a){
this.c=$_A(a,'\0');
this.b=false;
},"~N");
$_K(c$,
function(a){
this.construct(a.length+16);
this.append(a);
},"~S");
$_V(c$,"length",
function(){
return this.a;
});
$_M(c$,"capacity",
function(){
return this.c.length;
});
$_M(c$,"copy",
($fz=function(){
var a=$_A(this.c.length,'\0');
System.arraycopy(this.c,0,a,0,this.a);
this.c=a;
this.b=false;
},$fz.isPrivate=true,$fz));
$_M(c$,"ensureCapacity",
function(a){
if(a>this.c.length){
this.expandCapacity(a);
}},"~N");
$_M(c$,"expandCapacity",
($fz=function(a){
var b=(this.c.length+1)*2;
if(b<0){
b=2147483647;
}else if(a>b){
b=a;
}var c=$_A(b,'\0');
System.arraycopy(this.c,0,c,0,this.a);
this.c=c;
this.b=false;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"setLength",
function(a){
if(a<0){
throw new StringIndexOutOfBoundsException(a);
}if(a>this.c.length){
this.expandCapacity(a);
}if(this.a<a){
if(this.b)this.copy();
for(;this.a<a;this.a++){
this.c[this.a]='\0';
}
}else{
this.a=a;
if(this.b){
if(a>0){
this.copy();
}else{
this.c=$_A(16,'\0');
this.b=false;
}}}},"~N");
$_V(c$,"charAt",
function(a){
if((a<0)||(a>=this.a)){
throw new StringIndexOutOfBoundsException(a);
}return this.c[a];
},"~N");
$_M(c$,"getChars",
function(a,b,c,d){
if(a<0){
throw new StringIndexOutOfBoundsException(a);
}if((b<0)||(b>this.a)){
throw new StringIndexOutOfBoundsException(b);
}if(a>b){
throw new StringIndexOutOfBoundsException("srcBegin > srcEnd");
}System.arraycopy(this.c,a,c,d,b-a);
},"~N,~N,~A,~N");
$_M(c$,"setCharAt",
function(a,b){
if((a<0)||(a>=this.a)){
throw new StringIndexOutOfBoundsException(a);
}if(this.b)this.copy();
this.c[a]=b;
},"~N,~N");
$_M(c$,"append",
function(a){
return this.append(String.valueOf(a));
},"Object");
$_M(c$,"append",
function(a){
if(a==null){
a=String.valueOf(a);
}var b=a.length;
var c=this.a+b;
if(c>this.c.length)this.expandCapacity(c);
a.getChars(0,b,this.c,this.a);
this.a=c;
return this;
},"~S");
$_M(c$,"append",
function(a){
if(a==null){
a=StringBuffer.NULL;
}var b=a.length();
var c=this.a+b;
if(c>this.c.length)this.expandCapacity(c);
a.getChars(0,b,this.c,this.a);
this.a=c;
return this;
},"StringBuffer");
$_M(c$,"append",
function(a){
var b=a.length;
var c=this.a+b;
if(c>this.c.length)this.expandCapacity(c);
System.arraycopy(a,0,this.c,this.a,b);
this.a=c;
return this;
},"~A");
$_M(c$,"append",
function(a,b,c){
var d=this.a+c;
if(d>this.c.length)this.expandCapacity(d);
System.arraycopy(a,b,this.c,this.a,c);
this.a=d;
return this;
},"~A,~N,~N");
$_M(c$,"append",
function(a){
if(a){
var b=this.a+4;
if(b>this.c.length)this.expandCapacity(b);
this.c[this.a++]='t';
this.c[this.a++]='r';
this.c[this.a++]='u';
this.c[this.a++]='e';
}else{
var b=this.a+5;
if(b>this.c.length)this.expandCapacity(b);
this.c[this.a++]='f';
this.c[this.a++]='a';
this.c[this.a++]='l';
this.c[this.a++]='s';
this.c[this.a++]='e';
}return this;
},"~B");
$_M(c$,"append",
function(a){
var b=this.a+1;
if(b>this.c.length)this.expandCapacity(b);
this.c[this.a++]=a;
return this;
},"~N");
$_M(c$,"append",
function(a){
this.append(""+a);
return this;
},"~N");
$_M(c$,"append",
function(a){
this.append(""+a);
return this;
},"~N");
$_M(c$,"append",
function(a){
this.append(""+a);
return this;
},"~N");
$_M(c$,"append",
function(a){
this.append(""+a);
return this;
},"~N");
$_M(c$,"$delete",
function(a,b){
if(a<0)throw new StringIndexOutOfBoundsException(a);
if(b>this.a)b=this.a;
if(a>b)throw new StringIndexOutOfBoundsException();
var c=b-a;
if(c>0){
if(this.b)this.copy();
System.arraycopy(this.c,a+c,this.c,a,this.a-b);
this.a-=c;
}return this;
},"~N,~N");
$_M(c$,"deleteCharAt",
function(a){
if((a<0)||(a>=this.a))throw new StringIndexOutOfBoundsException();
if(this.b)this.copy();
System.arraycopy(this.c,a+1,this.c,a,this.a-a-1);
this.a--;
return this;
},"~N");
$_M(c$,"replace",
function(a,b,c){
if(a<0)throw new StringIndexOutOfBoundsException(a);
if(b>this.a)b=this.a;
if(a>b)throw new StringIndexOutOfBoundsException();
var d=c.length;
var e=this.a+d-(b-a);
if(e>this.c.length)this.expandCapacity(e);
else if(this.b)this.copy();
System.arraycopy(this.c,b,this.c,a+d,this.a-b);
c.getChars(0,d,this.c,a);
this.a=e;
return this;
},"~N,~N,~S");
$_M(c$,"substring",
function(a){
return this.substring(a,this.a);
},"~N");
$_V(c$,"subSequence",
function(a,b){
return this.substring(a,b);
},"~N,~N");
$_M(c$,"substring",
function(a,b){
if(a<0)throw new StringIndexOutOfBoundsException(a);
if(b>this.a)throw new StringIndexOutOfBoundsException(b);
if(a>b)throw new StringIndexOutOfBoundsException(b-a);
return String.instantialize(this.c,a,b-a);
},"~N,~N");
$_M(c$,"insert",
function(a,b,c,d){
if((a<0)||(a>this.a))throw new StringIndexOutOfBoundsException();
if((c<0)||(c+d<0)||(c+d>b.length))throw new StringIndexOutOfBoundsException(c);
if(d<0)throw new StringIndexOutOfBoundsException(d);
var e=this.a+d;
if(e>this.c.length)this.expandCapacity(e);
else if(this.b)this.copy();
System.arraycopy(this.c,a,this.c,a+d,this.a-a);
System.arraycopy(b,c,this.c,a,d);
this.a=e;
return this;
},"~N,~A,~N,~N");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,Object");
$_M(c$,"insert",
function(a,b){
if((a<0)||(a>this.a)){
throw new StringIndexOutOfBoundsException();
}if(b==null){
b=String.valueOf(b);
}var c=b.length;
var d=this.a+c;
if(d>this.c.length)this.expandCapacity(d);
else if(this.b)this.copy();
System.arraycopy(this.c,a,this.c,a+c,this.a-a);
b.getChars(0,c,this.c,a);
this.a=d;
return this;
},"~N,~S");
$_M(c$,"insert",
function(a,b){
if((a<0)||(a>this.a)){
throw new StringIndexOutOfBoundsException();
}var c=b.length;
var d=this.a+c;
if(d>this.c.length)this.expandCapacity(d);
else if(this.b)this.copy();
System.arraycopy(this.c,a,this.c,a+c,this.a-a);
System.arraycopy(b,0,this.c,a,c);
this.a=d;
return this;
},"~N,~A");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,~B");
$_M(c$,"insert",
function(a,b){
var c=this.a+1;
if(c>this.c.length)this.expandCapacity(c);
else if(this.b)this.copy();
System.arraycopy(this.c,a,this.c,a+1,this.a-a);
this.c[a]=b;
this.a=c;
return this;
},"~N,~N");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,~N");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,~N");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,~N");
$_M(c$,"insert",
function(a,b){
return this.insert(a,String.valueOf(b));
},"~N,~N");
$_M(c$,"indexOf",
function(a){
return this.indexOf(a,0);
},"~S");
$_M(c$,"indexOf",
function(a,b){
return String.indexOf(this.c,0,this.a,a.toCharArray(),0,a.length,b);
},"~S,~N");
$_M(c$,"lastIndexOf",
function(a){
return this.lastIndexOf(a,this.a);
},"~S");
$_M(c$,"lastIndexOf",
function(a,b){
return String.lastIndexOf(this.c,0,this.a,a.toCharArray(),0,a.length,b);
},"~S,~N");
$_M(c$,"reverse",
function(){
if(this.b)this.copy();
var a=this.a-1;
for(var b=(a-1)>>1;b>=0;--b){
var c=this.c[b];
this.c[b]=this.c[a-b];
this.c[a-b]=c;
}
return this;
});
$_V(c$,"toString",
function(){
return String.instantialize(this);
});
$_M(c$,"setShared",
function(){
this.b=true;
});
$_M(c$,"getValue",
function(){
return this.c;
});
$_S(c$,
"serialVersionUID",3388685877147921107);
c$.NULL=c$.prototype.NULL=new StringBuffer("null");
