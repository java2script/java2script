$_L(["java.io.Serializable","java.lang.reflect.InvocationHandler","java.util.Collections","$.WeakHashMap"],"java.lang.reflect.Proxy",["java.lang.IllegalArgumentException","$.InternalError","$.NullPointerException","$.StringBuffer","java.lang.ref.WeakReference","java.lang.reflect.Modifier","java.util.HashMap","sun.misc.ProxyGenerator"],function(){
c$=$_C(function(){
this.h=null;
$_Z(this,arguments);
},reflect,"Proxy",null,java.io.Serializable);
$_K(c$,
function(h){
this.h=h;
},"java.lang.reflect.InvocationHandler");
c$.getProxyClass=$_M(c$,"getProxyClass",
function(loader,interfaces){
var proxyClass=null;
var keyBuffer=new StringBuffer();
for(var i=0;i<interfaces.length;i++){
var interfaceClass=null;
try{
interfaceClass=Class.forName(interfaces[i].getName(),false,loader);
}catch(e){
if($_O(e,ClassNotFoundException)){
}else{
throw e;
}
}
if(interfaceClass!=interfaces[i]){
throw new IllegalArgumentException(interfaces[i]+" is not visible from class loader");
}if(!interfaceClass.isInterface()){
throw new IllegalArgumentException(interfaceClass.getName()+" is not an interface");
}keyBuffer.append(interfaces[i].getName()).append(';');
}
var key=keyBuffer.toString();
var cache;
{
cache=java.lang.reflect.Proxy.loaderToCache.get(loader);
if(cache==null){
cache=new java.util.HashMap(3);
java.lang.reflect.Proxy.loaderToCache.put(loader,cache);
}}{
do{
var value=cache.get(key);
if($_O(value,java.lang.ref.Reference)){
proxyClass=(value).get();
}if(proxyClass!=null){
return proxyClass;
}else if(value==java.lang.reflect.Proxy.pendingGenerationMarker){
try{
cache.wait();
}catch(e){
if($_O(e,InterruptedException)){
}else{
throw e;
}
}
continue;}else{
cache.put(key,java.lang.reflect.Proxy.pendingGenerationMarker);
break;
}}while(true);
}try{
var proxyPkg=null;
for(var i=0;i<interfaces.length;i++){
var flags=interfaces[i].getModifiers();
if(!java.lang.reflect.Modifier.isPublic(flags)){
var name=interfaces[i].getName();
var n=name.lastIndexOf('.');
var pkg=((n==-1)?"":name.substring(0,n+1));
if(proxyPkg==null){
proxyPkg=pkg;
}else if(!pkg.equals(proxyPkg)){
throw new IllegalArgumentException("non-public interfaces from different packages");
}}}
if(proxyPkg==null){
proxyPkg="";
}{
var num;
{
num=($t$=java.lang.reflect.Proxy.nextUniqueNumber++,java.lang.reflect.Proxy.prototype.nextUniqueNumber=java.lang.reflect.Proxy.nextUniqueNumber,$t$);
}var proxyName=proxyPkg+java.lang.reflect.Proxy.proxyClassNamePrefix+num;
var proxyClassFile=sun.misc.ProxyGenerator.generateProxyClass(proxyName,interfaces);
try{
proxyClass=java.lang.reflect.Proxy.defineClass0(loader,proxyName,proxyClassFile,0,proxyClassFile.length);
}catch(e){
if($_O(e,ClassFormatError)){
throw new IllegalArgumentException(e.toString());
}else{
throw e;
}
}
}java.lang.reflect.Proxy.proxyClasses.put(proxyClass,null);
}finally{
{
if(proxyClass!=null){
cache.put(key,new java.lang.ref.WeakReference(proxyClass));
}else{
cache.remove(key);
}cache.notifyAll();
}}
return proxyClass;
},"ClassLoader,~A");
c$.newProxyInstance=$_M(c$,"newProxyInstance",
function(loader,interfaces,h){
if(h==null){
throw new NullPointerException();
}var cl=java.lang.reflect.Proxy.getProxyClass(loader,interfaces);
try{
var cons=cl.getConstructor(java.lang.reflect.Proxy.constructorParams);
return cons.newInstance([h]);
}catch(e){
if($_O(e,NoSuchMethodException)){
throw new InternalError(e.toString());
}else if($_O(e,IllegalAccessException)){
throw new InternalError(e.toString());
}else if($_O(e,InstantiationException)){
throw new InternalError(e.toString());
}else if($_O(e,java.lang.reflect.InvocationTargetException)){
throw new InternalError(e.toString());
}else{
throw e;
}
}
},"ClassLoader,~A,java.lang.reflect.InvocationHandler");
c$.isProxyClass=$_M(c$,"isProxyClass",
function(cl){
if(cl==null){
throw new NullPointerException();
}return java.lang.reflect.Proxy.proxyClasses.containsKey(cl);
},"Class");
c$.getInvocationHandler=$_M(c$,"getInvocationHandler",
function(proxy){
if(!java.lang.reflect.Proxy.isProxyClass(proxy.getClass())){
throw new IllegalArgumentException("not a proxy instance");
}var p=proxy;
return p.h;
},"~O");
$_S(c$,
"proxyClassNamePrefix","$Proxy");
c$.constructorParams=c$.prototype.constructorParams=[java.lang.reflect.InvocationHandler];
c$.loaderToCache=c$.prototype.loaderToCache=new java.util.WeakHashMap(3);
c$.pendingGenerationMarker=c$.prototype.pendingGenerationMarker=new Object();
$_S(c$,
"nextUniqueNumber",0);
c$.nextUniqueNumberLock=c$.prototype.nextUniqueNumberLock=new Object();
c$.proxyClasses=c$.prototype.proxyClasses=java.util.Collections.synchronizedMap(new java.util.WeakHashMap(3));
});
