$_I(java.io,"Serializable");
$_I(java.lang,"CharSequence");
$_I(java.lang,"Cloneable");
$_I(java.lang,"Comparable");
$_I(java.lang,"Runnable");
$_I(java.util,"Comparator");
/* http://j2s.sf.net/ */Clazz.load(["java.io.Serializable"],"java.lang.Number",null,function(){
java.lang.Number=Number;

Number.__CLASS_NAME__="Number";
Clazz.implementOf(Number,java.io.Serializable);
Number.equals=Clazz.innerFunctions.equals;
Number.getName=Clazz.innerFunctions.getName;

Number.serialVersionUID=Number.prototype.serialVersionUID=-8742448824652078965;

Clazz.defineMethod(Number,"shortValue",
function(){
return Math.round(this)&0xffff;
});

Clazz.defineMethod(Number,"byteValue",
function(){
return Math.round(this)&0xff;
});

Clazz.defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.defineMethod(Number,"floatValue",
function(){
return this;
});

Clazz.defineMethod(Number,"doubleValue",
function(){
return this;
});

Clazz.defineMethod(Number,"hashCode",
function(){
return this.valueOf();
});
});/* http://j2s.sf.net/ */Clazz.load(["java.lang.Comparable","$.Number"],"java.lang.Integer",null,function(){
java.lang.Integer=Integer=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Integer,"Integer",Number,Comparable);
Integer.prototype.valueOf=function(){return 0;};
Integer.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Integer,
function(value){
var v=Math.round(value)&0xffffffff;
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Integer,
function(s){
var value=Integer.parseInt(s,10);
this.valueOf=function(){
return value;
};
},"String");
Integer.serialVersionUID=Integer.prototype.serialVersionUID=1360826667806852920;
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;

Clazz.defineMethod(Integer,"parseInt",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
return parseInt(s,radix);
},"String, Number");
Integer.parseInt=Integer.prototype.parseInt;
Clazz.defineMethod(Integer,"parseInt",
function(s){
return Integer.parseInt(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;

Clazz.defineMethod(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
});/* http://j2s.sf.net/ */Clazz.load(["java.lang.Comparable","$.Number"],"java.lang.Long",null,function(){
java.lang.Long=Long=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Long,"Long",Number,Comparable);
Long.prototype.valueOf=function(){return 0;};
Long.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Long,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Long,
function(value){
var v=Math.round(value);
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Long,
function(s){
var value=Long.parseLong(s,10);
this.valueOf=function(){
return value;
};
},"String");
Long.serialVersionUID=Long.prototype.serialVersionUID=4290774380558885855;
Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;

Clazz.defineMethod(Long,"parseLong",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
return parseInt(s,radix);
},"String, Number");
Long.parseLong=Long.prototype.parseLong;
Clazz.defineMethod(Long,"parseLong",
function(s){
return Long.parseLong(s,10);
},"String");
Long.parseLong=Long.prototype.parseLong;

Clazz.defineMethod(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
});/* http://j2s.sf.net/ */Clazz.load(["java.lang.Comparable","$.Number"],"java.lang.Float",null,function(){
java.lang.Float=Float=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Float,"Float",Number,Comparable);
Float.prototype.valueOf=function(){return 0;};
Float.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Float,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Float,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Float,
function(s){
var value=Float.parseFloat(s,10);
this.valueOf=function(){
return value;
};
},"String");
Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;

Clazz.defineMethod(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
return parseFloat(s);
},"String");
Float.parseFloat=Float.prototype.parseFloat;
Clazz.defineMethod(Float,"isNaN",
function(num){
return isNaN(num);
},"Number");
Float.isNaN=Float.prototype.isNaN;

Clazz.defineMethod(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
});/* http://j2s.sf.net/ */Clazz.load(["java.lang.Comparable","$.Number"],"java.lang.Double",null,function(){
java.lang.Double=Double=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Double,"Double",Number,Comparable);
Double.prototype.valueOf=function(){return 0;};
Double.prototype.toString=function(){
return""+this.valueOf();
};
Clazz.makeConstructor(Double,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Double,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Double,
function(s){
var value=Double.parseDouble(s,10);
this.valueOf=function(){
return value;
};
},"String");

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=3.4028235e+38;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.4e-45;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;

Clazz.defineMethod(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
return parseFloat(s);
},"String");
Double.parseDouble=Double.prototype.parseDouble;

Clazz.defineMethod(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
});/* http://j2s.sf.net/ */Clazz.load(["java.io.Serializable","java.lang.Cloneable","$.Comparable"],"java.util.Date",["java.lang.IllegalArgumentException","java.lang.ref.SoftReference","java.text.DateFormat","$.SimpleDateFormat","java.util.GregorianCalendar","$.TimeZone"],function(){
java.util.Date=Date;
Clazz.decorateAsType(java.util.Date,"java.util.Date",null,[java.io.Serializable,Cloneable,Comparable]);

Clazz.defineMethod(java.util.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.defineMethod(java.util.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,java.util.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz.defineMethod(java.util.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
Clazz.defineMethod(java.util.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});
});Clazz.load(["java.io.Serializable"],"java.util.EventObject",["java.lang.IllegalArgumentException"],function(){
c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.util,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source==null)throw new IllegalArgumentException("null source");
this.source=source;
},"~O");
$_M(c$,"getSource",
function(){
return this.source;
});
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[source="+this.source+"]";
});
});
$_I(java.util,"EventListener");
Clazz.load(["java.util.EventListener"],"java.util.EventListenerProxy",null,function(){
c$=$_C(function(){
this.listener=null;
$_Z(this,arguments);
},java.util,"EventListenerProxy",null,java.util.EventListener);
$_K(c$,
function(listener){
this.listener=listener;
},"java.util.EventListener");
$_M(c$,"getListener",
function(){
return this.listener;
});
});
$_I(java.util,"Iterator");
Clazz.load(["java.util.Iterator"],"java.util.ListIterator",null,function(){
$_I(java.util,"ListIterator",java.util.Iterator);
});
$_I(java.util,"Enumeration");
$_I(java.util,"Collection");
Clazz.load(["java.util.Collection"],"java.util.Set",null,function(){
$_I(java.util,"Set",java.util.Collection);
});
$_I(java.util,"Map");
$_I(java.util.Map,"Entry");
Clazz.load(["java.util.Collection"],"java.util.List",null,function(){
$_I(java.util,"List",java.util.Collection);
});
$_I(java.util,"RandomAccess");
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
},net.sf.j2s.ajax,"HttpRequest");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"IXHRCallback");
$_J("net.sf.j2s.ajax");
Clazz.load(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackAdapter",null,function(){
c$=$_C(function(){
$_Z(this,arguments);
},net.sf.j2s.ajax,"XHRCallbackAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_V(c$,"onComplete",
function(){
});
$_V(c$,"onInteractive",
function(){
});
$_V(c$,"onLoaded",
function(){
});
$_V(c$,"onLoading",
function(){
});
});
$_J("net.sf.j2s.ajax");
Clazz.load(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackSWTAdapter",null,function(){
c$=$_C(function(){
$_Z(this,arguments);
},net.sf.j2s.ajax,"XHRCallbackSWTAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_M(c$,"swtOnComplete",
function(){
});
$_M(c$,"swtOnInteractive",
function(){
});
$_M(c$,"swtOnLoaded",
function(){
});
$_M(c$,"swtOnLoading",
function(){
});
$_V(c$,"onComplete",
function(){
this.swtOnComplete();
});
$_V(c$,"onInteractive",
function(){
this.swtOnInteractive();
});
$_V(c$,"onLoaded",
function(){
this.swtOnLoaded();
});
$_V(c$,"onLoading",
function(){
this.swtOnLoading();
});
});
