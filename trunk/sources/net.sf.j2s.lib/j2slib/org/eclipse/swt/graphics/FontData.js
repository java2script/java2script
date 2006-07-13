Clazz.load(null,"$wt.graphics.FontData",["java.lang.StringBuffer","$wt.SWT"],function(){
c$=$_C(function(){
this.height=0;
this.style=0;
this.name=null;
this.lang=null;
this.country=null;
this.variant=null;
$_Z(this,arguments);
},$wt.graphics,"FontData");
$_K(c$,
function(){
this.name="Arial";
this.style=0;
this.height=12;
});
$_K(c$,
function(string){
this.name=string;
if(this.name==null){
this.name="Arial";
}this.style=0;
this.height=12;
},"~S");
$_K(c$,
function(name,height,style){
this.setName(name);
this.setHeight(height);
this.setStyle(style);
},"~S,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.FontData)))return false;
var fd=object;
return this.height==fd.height&&this.style==fd.style&&this.getName().equals(fd.getName());
},"~O");
$_M(c$,"getHeight",
function(){
return this.height;
});
$_M(c$,"getLocale",
function(){
var buffer=new StringBuffer();
var sep='_';
if(this.lang!=null){
buffer.append(this.lang);
buffer.append(sep);
}if(this.country!=null){
buffer.append(this.country);
buffer.append(sep);
}if(this.variant!=null){
buffer.append(this.variant);
}var result=buffer.toString();
var length=result.length;
if(length>0){
if((result.charAt(length-1)).charCodeAt(0)==(sep).charCodeAt(0)){
result=result.substring(0,length-1);
}}return result;
});
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getStyle",
function(){
var style=0;
return style;
});
$_V(c$,"hashCode",
function(){
return this.height^this.style^this.getName().hashCode();
});
$_M(c$,"setHeight",
function(height){
this.height=height;
},"~N");
$_M(c$,"setLocale",
function(locale){
this.lang=this.country=this.variant=null;
if(locale!=null){
var sep='_';
var length=locale.length;
var firstSep;
var secondSep;
firstSep=locale.indexOf(sep);
if(firstSep==-1){
firstSep=secondSep=length;
}else{
secondSep=locale.indexOf(sep,firstSep+1);
if(secondSep==-1)secondSep=length;
}if(firstSep>0)this.lang=locale.substring(0,firstSep);
if(secondSep>firstSep+1)this.country=locale.substring(firstSep+1,secondSep);
if(length>secondSep+1)this.variant=locale.substring(secondSep+1);
}},"~S");
$_M(c$,"setName",
function(name){
this.name=name;
},"~S");
$_M(c$,"setStyle",
function(style){
this.style=style;
},"~N");
$_V(c$,"toString",
function(){
var buffer=new StringBuffer();
buffer.append("1|");
buffer.append(this.getName());
buffer.append("|");
buffer.append(this.getHeight());
buffer.append("|");
buffer.append(this.getStyle());
buffer.append("|");
buffer.append("WINDOWS|1|");
buffer.append(this.getName());
return buffer.toString();
});
});
