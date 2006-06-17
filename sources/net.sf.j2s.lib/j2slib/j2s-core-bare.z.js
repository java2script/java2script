/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=java/lang/Class.js
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
if(idx2==-1){
return"Object";
}
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
if(obj.constructor.__CLASS_NAME__==null){
if(obj instanceof Number){
return"Number";
}else if(obj instanceof Boolean){
return"Boolean";
}else if(obj instanceof Array){
return"Array";
}
}
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

