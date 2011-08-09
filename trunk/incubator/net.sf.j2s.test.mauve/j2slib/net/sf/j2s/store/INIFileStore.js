$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.INIFileStore",["java.io.File","$.FileInputStream","$.FileOutputStream","java.util.Properties"],function(){
c$=$_C(function(){
this.file=null;
this.properties=null;
this.lastUpdated=0;
$_Z(this,arguments);
},net.sf.j2s.store,"INIFileStore",null,net.sf.j2s.store.IStore);
$_K(c$,
function(path){
this.file=new java.io.File(path);
this.load();
},"~S");
$_M(c$,"load",
($fz=function(){
this.properties=new java.util.Properties();
var fis=null;
try{
fis=new java.io.FileInputStream(this.file);
this.properties.load(fis);
}catch(e$$){
if($_O(e$$,java.io.FileNotFoundException)){
var e=e$$;
{
}
}else if($_O(e$$,java.io.IOException)){
var e=e$$;
{
}
}else{
throw e$$;
}
}finally{
if(fis!=null){
try{
fis.close();
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
}}
this.lastUpdated=System.currentTimeMillis();
},$fz.isPrivate=true,$fz));
$_V(c$,"getProperty",
function(name){
var lastModified=this.file.lastModified();
if(lastModified>this.lastUpdated){
this.load();
}return this.properties.getProperty(name);
},"~S");
$_V(c$,"setProperty",
function(name,value){
var lastModified=this.file.lastModified();
if(lastModified>this.lastUpdated){
this.load();
}if(value==null){
this.properties.remove(name);
}else{
this.properties.setProperty(name,value);
}this.save();
},"~S,~S");
$_M(c$,"save",
($fz=function(){
var fos=null;
try{
fos=new java.io.FileOutputStream(this.file);
this.properties.store(fos,"Java2Script Simple Store");
}catch(e$$){
if($_O(e$$,java.io.FileNotFoundException)){
var e=e$$;
{
}
}else if($_O(e$$,java.io.IOException)){
var e=e$$;
{
}
}else{
throw e$$;
}
}finally{
if(fos!=null){
try{
fos.close();
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
}}
this.lastUpdated=System.currentTimeMillis();
},$fz.isPrivate=true,$fz));
$_V(c$,"isReady",
function(){
return true;
});
});
