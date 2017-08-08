// var st =Clazz.$new(StackTraceElement.construct ???
// Clazz.newMethod$(c$,"newInstance$OA", function(args){
// Clazz.newMethod$(c$,"invoke$O$OA",

// j2sSwingJSext.js
// fully qualified names for inital class definitions
 
(function(Clazz) {

var c$;

var supportsNativeObject = true;

///////////////////////// private supporting method creation //////////////////////

var hashCode = 0;


var addProto = function(proto, name, func) {
  return proto[name] = func;
};

var declareType = function(prefix, name, clazzSuper, interfacez, superClazzInstance) {
  return Clazz.decorateAsClass(function(){}, prefix, name, clazzSuper, interfacez, superClazzInstance);
};

///////////////// special definitions of standard Java class methods ///////////

Clazz._setDeclared("java.lang.Thread",java.lang.Thread = Thread = function () {});
Clazz.newMethod$(Thread, "construct", function(){}, 1); 
Clazz.newMethod$(Thread, "currentThread", function () {
  return this.J2S_THREAD;
}, 1);
Thread.J2S_THREAD = Thread.prototype.J2S_THREAD = Clazz.$new(Thread);

Clazz._setDeclared("java.lang.System",
java.lang.System = System = {
  props : null, //new java.util.Properties (),
  $props : {},
  arraycopy : function (src, srcPos, dest, destPos, length) {  
    if (src !== dest || srcPos > destPos) {
      for (var i = length; --i >= 0;)
        dest[destPos++] = src[srcPos++];
    } else {
      destPos += length;
      srcPos += length;
      for (var i = length; --i >= 0;)
        src[--destPos] = src[--srcPos];
    }
  },
  
  currentTimeMillis : function () {
    return new Date ().getTime ();
  },
  exit : function() { swingjs.JSToolkit.exit() },
  gc : function() {}, // bh
  getProperties : function () {
    return System.props;
  },
  getProperty : function (key, def) {
    if (System.props)
      return System.props.getProperty (key, def);
    var v = System.$props[key];
    if (typeof v != "undefined")
      return v;
    if (key.indexOf(".") > 0) {
      v = null;    
      switch (key) {
      case "java.class.version":
        v = "50";
        break;
      case "java.version":
        v = "1.6";
        break;
      case "file.separator":
      case "path.separator":
        v = "/";
        break;        
      case "line.separator":
        v = (navigator.userAgent.indexOf("Windows") >= 0 ? "\r\n" : "\n");
        break;
      case "os.name":
      case "os.version":
        v = navigator.userAgent;
        break;
      }
      if (v)
        return System.$props[key] = v;
    }
    return (arguments.length == 1 ? null : def == null ? key : def); // BH
  },
  getSecurityManager : function() { return null },  // bh
  identityHashCode : function(obj){return obj==null ? 0 : obj._$hashcode || (obj._$hashcode = ++hashCode)},
  lineSeparator : function() { return '\n' }, // bh
  nanoTime: function() {
   return Math.round(window.performance.now() * 1e6)
  },  
  setProperties : function (props) {
    System.props = props;
  },
  setProperty : function (key, val) {
    if (!System.props)
      return System.$props[key] = val; // BH
    System.props.setProperty (key, val);
  }
  
});


;(function(Clazz.Console, System) {

Sys.out = new Clazz._O ();
Sys.out.__CLASS_NAME__ = "java.io.PrintStream";


Sys.out.print = function (s) { 
  Con.consoleOutput (s);
};

Sys.out.printf = Sys.out.format = function (f, args) {
  Sys.out.print(String.format.apply(null, arguments));
}

Sys.out.println = function(s) {
  if (Clazz._nooutput) return;
  if (Clazz._traceOutput && s && ("" + s).indexOf(Clazz._traceOutput) >= 0)
    alert(s + "\n\n" + Clazz.getStackTrace());
  Con.consoleOutput(typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n");
};

Sys.out.write = function (buf, offset, len) {
  Sys.out.print(String.instantialize(buf).substring(offset, offset+len));
};

Sys.err = new Clazz._O ();
Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

Sys.err.print = function (s) { 
  Con.consoleOutput (s, "red");
};

Sys.err.printf = Sys.err.format = function (f, args) {
  Sys.out.print(String.format.apply(null, arguments));
}

Sys.err.println = function (s) {
  Con.consoleOutput (typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n", "red");
};

Sys.err.write = function (buf, offset, len) {
  Sys.err.print(String.instantialize(buf).substring(offset, offset+len));
};

})(Clazz.Console, System);


// moved here from package.js
// these classes will be created as objects prior to any others
// and are then available immediately

  Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);

  var sJU = "java.util";

  //var sJU = "JU";  
  //Clazz._Loader.registerPackages (sJU, ["regex", "zip"]);
  //var javautil = JU;

  var javautil = java.util;

  Clazz._Loader.ignore([
    "net.sf.j2s.ajax.HttpRequest",
    sJU + ".MapEntry.Type",
    //"java.net.UnknownServiceException", // unnecessary for Jmol
    "java.lang.Runtime",
    "java.security.AccessController",
    "java.security.PrivilegedExceptionAction",
//    "java.io.File",
//    "java.io.FileInputStream",
//    "java.io.FileWriter",
//    "java.io.OutputStreamWriter",
//    sJU + ".Calendar", // bypassed in ModelCollection
//    "java.text.SimpleDateFormat", // not used
//    "java.text.DateFormat", // not used
    sJU + ".concurrent.Executors"
  ])

Clazz._setDeclared("java.lang.Math", java.lang.Math = Math);

Math.rint || (Math.rint = function(a) {
 var b;
 return Math.round(a) + ((b = a % 1) != 0.5 && b != -0.5 ? 0 : (b = Math.round(a % 2)) > 0 ? b - 2 : b);
});

Math.log10||(Math.log10=function(a){return Math.log(a)/Math.E});

Math.hypot||(Math.hypot=function(x,y){return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))});

Math.toDegrees||(Math.toDegrees=function(angrad){return angrad*180.0/Math.PI;});

Math.toRadians||(Math.toRadians=function(angdeg){return angdeg/180.0*Math.PI});

Math.copySign||(Math.copySign=function(mag,sign){return((sign>0?1:-1)*Math.abs(mag))});

//could use Math.sign(), but this was used to preserve cross-brower compatability (not in Internet Explorer)
Math.signum||(Math.signum=function(d){return(d==0.0||isNaN(d))?d:d < 0 ? -1 : 1});

Math.scalb||(Math.scalb=function(d,scaleFactor){return d*Math.pow(2,scaleFactor)});

//the following Math functions rely on datatypes nonexistant in javascript
Math.nextAfter||(Math.nextAfter=function(start,direction){return 0});
Math.nextUp||(Math.nextUp=function(d){return 0});
Math.ulp||(Math.ulp=function(d){return 0});
Math.getExponent||(Math.getExponent=function(d){return 0});
Math.getIEEEremainder||(Math.getIEEEremainder=function(f1,f2){return 0});
//end datatype reliant math declarations

Clazz._setDeclared("java.lang.Number", java.lang.Number=Number);
Number.prototype._numberToString=Number.prototype.toString;
if(supportsNativeObject){
  // Number and Array are special -- do not override prototype.toString -- "length - 2" here
  for (var i = 0; i < Clazz._extendedObjectMethods.length - 2; i++) {
    var p = Clazz._extendedObjectMethods[i];
    Array.prototype[p] = Clazz._O.prototype[p];
    Number.prototype[p] = Clazz._O.prototype[p];
  }
}
Number.__CLASS_NAME__="Number";
Clazz._implementOf(Number,java.io.Serializable);
Number.equals=inF.equals;
Number.getName=inF.getName;
Number.prototype.compareTo = function(x) { var a = this.valueOf(), b = x.valueOf(); return (a < b ? -1 : a == b ? 0 : 1) };
Number.compare = function(a,b) { return (a < b ? -1 : a == b ? 0 : 1) };

Clazz.newMethod$(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

Clazz.newMethod$(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

Clazz.newMethod$(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.newMethod$(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.newMethod$(Number,"floatValue",
function(){
return this.valueOf();
});
Clazz.newMethod$(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

Clazz.newMethod$(Number,"hashCode",
function(){
return this.valueOf();
});

Clazz._setDeclared("java.lang.Integer", java.lang.Integer=Integer=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

var decorateAsNumber = function (clazzFun, qClazzName) {
  clazzFun.prototype.valueOf=function(){return 0;};
  clazzFun.prototype.__VAL0__ = 1;
  Clazz._extendJO(clazzFun, qClazzName, true);
  Clazz._inheritClass(clazzFun, Number);
  Clazz._implementOf(clazzFun, Comparable);
  return clazzFun;
};

decorateAsNumber(Integer,"Integer");
Integer.toString=Integer.prototype.toString=function(){
  if(arguments.length!=0){
    return "" + arguments[0];
  } 
  if(this===Integer){
    return "class java.lang.Integer";
  }
  return "" + this.valueOf();
};

Clazz.newMethod$(Integer, "constuct", function(v){
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}, 1);

Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.TYPE=Integer.prototype.TYPE=Integer;


Clazz.newMethod$(Integer,"bitCount",
function(i) {
  i = i - ((i >>> 1) & 0x55555555);
  i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
  i = (i + (i >>> 4)) & 0x0f0f0f0f;
  i = i + (i >>> 8);
  i = i + (i >>> 16);
  return i & 0x3f;
});
Integer.bitCount=Integer.prototype.bitCount;

Clazz.newMethod$(Integer,"numberOfLeadingZeros",
function(i) {
 if (i == 0) return 32;
 var n = 1;
 if (i >>> 16 == 0) { n += 16; i <<= 16; }
 if (i >>> 24 == 0) { n +=  8; i <<=  8; }
 if (i >>> 28 == 0) { n +=  4; i <<=  4; }
 if (i >>> 30 == 0) { n +=  2; i <<=  2; }
 n -= i >>> 31;
 return n;
});
Integer.numberOfLeadingZeros=Integer.prototype.numberOfLeadingZeros;

Clazz.newMethod$(Integer,"numberOfTrailingZeros",
function(i) {
  if (i == 0) return 32;
  var n = 31;
  var y = i <<16; if (y != 0) { n = n -16; i = y; }
  y = i << 8; if (y != 0) { n = n - 8; i = y; }
  y = i << 4; if (y != 0) { n = n - 4; i = y; }
  y = i << 2; if (y != 0) { n = n - 2; i = y; }
  return n - ((i << 1) >>> 31);
});
Integer.numberOfTrailingZeros=Integer.prototype.numberOfTrailingZeros;

Clazz.newMethod$(Integer,"parseIntRadix",
function(s,radix){
if(s==null){
throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}if(radix<2){
throw Clazz.$new(NumberFormatException.construct$S, ["radix "+radix+" less than Character.MIN_RADIX"]);
}if(radix>36){
throw Clazz.$new(NumberFormatException.construct$S, ["radix "+radix+" greater than Character.MAX_RADIX"]);
}
if (radix == 10) {
  for (var i = s.length; --i >= 0;) {
    var c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) 
      continue;
    if (i > 0 || c != 43 && c != 45)
      throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
  }
}
var i=parseInt(s,radix);
if(isNaN(i)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return i;
});
Integer.parseIntRadix=Integer.prototype.parseIntRadix;

Clazz.newMethod$(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
});
Integer.parseInt=Integer.prototype.parseInt;

Clazz.newMethod$(Integer,"$valueOf",
function(s){
  return Clazz.$new(Integer.construct, [s]);
});

Integer.$valueOf=Integer.prototype.$valueOf;

Clazz.newMethod$(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
});
Integer.toHexString=Integer.prototype.toHexString=function(d){
if(d.valueOf)d=d.valueOf();
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = "000000" + b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);};
Integer.toOctalString=Integer.prototype.toOctalString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(8);};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(2);};

Integer.decodeRaw=Clazz.newMethod$(Integer,"decodeRaw", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict -- ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8) does.
// need to make sure negative numbers are negative
n = Number(n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
});

Integer.decode=Clazz.newMethod$(Integer,"decode", function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
  throw Clazz.$new(NumberFormatException.construct$S,["Invalid Integer"]);
  returnClazz.$new(Integer.construct, [n]);
});

Clazz.newMethod$(Integer,"hashCode",
function(){
return this.valueOf();
});

// Note that Long is problematic in JavaScript 

Clazz._setDeclared("java.lang.Long", java.lang.Long=Long=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

decorateAsNumber(Long,"Long");
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

Clazz.newMethod$(Long, "construct", function(v){
  v == null && (v = 0);
  v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
  this.valueOf=function(){return v;};
}, 1);

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
Long.TYPE=Long.prototype.TYPE=Long;

Clazz.newMethod$(Long,"parseLong",
function(s,radix){
 return Integer.parseInt(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

Clazz.newMethod$(Long,"$valueOf",
function(s){
return Clazz.$new(Long.construct, [s]);
});

Long.$valueOf=Long.prototype.$valueOf;
Clazz.newMethod$(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
});
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};

Long.decode=Clazz.newMethod$(Long,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n))
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Long"]);
  return Clazz.$new(Long.construct, [n]);
});

decorateAsNumber = function(){}
Clazz._setDeclared("java.lang.Short", java.lang.Short = Short = function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Short, "Short");

Clazz.newMethod$(Short, "construct",
function (v) {
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
}, 1);
Short.prototype.construct = Short.construct;



Short.toString = Short.prototype.toString = function () {
  if (arguments.length != 0) {
    return "" + arguments[0];
  } else if (this === Short) {
    return "class java.lang.Short"; // Short.class.toString
  }
  return "" + this.valueOf ();
};

Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.TYPE = Short.prototype.TYPE = Short;

Clazz.newMethod$(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
});
Short.parseShortRadix = Short.prototype.parseShortRadix;

Clazz.newMethod$(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
});

Short.parseShort = Short.prototype.parseShort;

Clazz.newMethod$(Short, "$valueOf",
function (s) {
  return Clazz.$new(Short.construct, [s]);
});

Short.$valueOf = Short.prototype.$valueOf;
Clazz.newMethod$(Short, "equals",
function (s) {
if(s == null || !Clazz.instanceOf(s, Short) ){
  return false;
}
return s.valueOf()  == this.valueOf();
});
Short.toHexString = Short.prototype.toHexString = function (i) {
  return i.toString (16);
};
Short.toOctalString = Short.prototype.toOctalString = function (i) {
  return i.toString (8);
};
Short.toBinaryString = Short.prototype.toBinaryString = function (i) {
  return i.toString (2);
};
Short.decode = Clazz.newMethod$(Short, "decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -32768|| n > 32767)
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Short"]);
  return Clazz.$new(Short.construct, [n]);
});

Clazz._setDeclared("java.lang.Byte", java.lang.Byte=Byte=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Byte,"Byte");

Clazz.newMethod$(Byte, "construct"
function(v){
 if (typeof v != "number")
   v = Integer.parseIntRadix(v, 10);
 v = v.byteValue();
this.valueOf=function(){
return v;
};
}, 1);

Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
Byte.TYPE=Byte.prototype.TYPE=Byte;

Clazz.newMethod$(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
});
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

Clazz.newMethod$(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
});

Byte.parseByte=Byte.prototype.parseByte;

Clazz.newMethod$(Byte, "$valueOf",
function (s) {
  return Clazz.$new(Byte.construct, [s]);
});

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz.newMethod$(Byte,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
});
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Byte.decode=Clazz.newMethod$(Byte,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -128|| n > 127)
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Byte"]);
  return Clazz.$new(Byte.construct, [n]);
});

Clazz._floatToString = function(f) {
 var s = ""+f
 if (s.indexOf(".") < 0 && s.indexOf("e") < 0)
    s += ".0";
 return s;
}

Clazz._setDeclared("java.lang.Float", java.lang.Float=Float=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Float,"Float");

Clazz.newMethod$(Float, "construct", function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Number(v);
 this.valueOf=function(){return v;}
}, 1);

Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Float){
return"class java.lang.Float";
}
return Clazz._floatToString(this.valueOf());
};

Clazz._a32 = null;

Float.floatToIntBits = function(f) {
var a = Clazz._a32 || (Clazz._a32 = new Float32Array(1));
a[0] = f;
return new Int32Array(a.buffer)[0]; 
}

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
Float.TYPE=Float.prototype.TYPE=Float;

Clazz.newMethod$(Float,"parseFloat",
function(s){
if(s==null){
throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var floatVal=Number(s);
if(isNaN(floatVal)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return floatVal;
});
Float.parseFloat=Float.prototype.parseFloat;

Clazz.newMethod$(Float,"$valueOf",
function(s){
return Clazz.$new(Float.construct, [s]);
});

Float.$valueOf=Float.prototype.$valueOf;

Clazz.newMethod$(Float,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});
Float.isNaN=Float.prototype.isNaN;
Clazz.newMethod$(Float,"isInfinite",
function(num){
return !Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});
Float.isInfinite=Float.prototype.isInfinite;

Clazz.newMethod$(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
});

Clazz._setDeclared("java.lang.Double", java.lang.Double=Double=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Double,"Double");
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

Clazz.newMethod$(Double, "construct", function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Double.parseDouble(v);
 this.valueOf=function(){return v;};
}, 1);

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
Double.TYPE=Double.prototype.TYPE=Double;

Clazz.newMethod$(Double,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});
Double.isNaN=Double.prototype.isNaN;
Clazz.newMethod$(Double,"isInfinite",
function(num){
return!Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});
Double.isInfinite=Double.prototype.isInfinite;

Clazz.newMethod$(Double,"parseDouble",
function(s){
if(s==null){
  throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return doubleVal;
});
Double.parseDouble=Double.prototype.parseDouble;

Clazz.newMethod$(Double,"$valueOf",
function(v){
return Clazz.$new(Double.construct, [v]);
});

Double.$valueOf=Double.prototype.$valueOf;

Clazz.newMethod$(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
});


//java.lang.B00lean = Boolean; ?? BH why this?

Clazz._setDeclared("java.lang.Boolean", 
Boolean = java.lang.Boolean = Boolean || function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

if (supportsNativeObject) {
  for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
    var p = Clazz._extendedObjectMethods[i];
    Boolean.prototype[p] = Clazz._O.prototype[p];
  }
}
Boolean.__CLASS_NAME__="Boolean";
Clazz._implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=inF.equals;
Boolean.getName=inF.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

Clazz.newMethod$(Boolean, "construct",
function(s){
  var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
  this.valueOf=function(){return b;};
}, 1);

Boolean.parseBoolean=Clazz.newMethod$(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
});
Clazz.newMethod$(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Boolean.$valueOf=Clazz.newMethod$(Boolean,"$valueOf",
function(b){
return((typeof b == "string"? "true".equalsIgnoreCase(b) : b)?Boolean.TRUE:Boolean.FALSE);
});

Clazz.newMethod$(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz.newMethod$(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz.newMethod$(Boolean,"equals",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
});
Boolean.getBoolean=Clazz.newMethod$(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
});
Clazz.newMethod$(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
});
Boolean.toBoolean=Clazz.newMethod$(Boolean,"toBoolean",
function(name){
return(typeof name == "string" ? name.equalsIgnoreCase("true") : !!name);
});

// the need is to have new Boolean(string), but that won't work with native Boolean
// so instead we have to do a lexical switch from "new Boolean" to "Boolean.from"
Boolean.from=Clazz.newMethod$(Boolean,"from",
function(name){
return Clazz.$new(Boolean.construct, [typeof name == "string" ? name.equalsIgnoreCase("true") : !!name]);
});

Boolean.TRUE=Boolean.prototype.TRUE=Clazz.$new(Boolean.construct, [true]);
Boolean.FALSE=Boolean.prototype.FALSE=Clazz.$new(Boolean.construct, [false]);
Boolean.TYPE=Boolean.prototype.TYPE=Boolean;


Clazz._Encoding={
  UTF8:"utf-8",
  UTF16:"utf-16",
  ASCII:"ascii"
};







(function(Encoding) {

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
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
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
}else if(charCode<=0x07ff){
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
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){

Clazz._setDeclared("java.lang.String", java.lang.String=String);

if(supportsNativeObject){
for(var i = 0; i < extendedObjectMethods.length; i++) {
var p = extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"hashCode"==p){
continue;
}
String.prototype[p]=Clazz._O.prototype[p];
}
}

// Actually, String does not implement CharSequence because it does not
// implement getSubsequence() or length(). Any use of CharSequence that
// utilizes either of these methods must explicitly check for typeof x.length
// or existance of x.subSequence.  
// classes affected include:
//   java.io.CharArrayWriter,StringWriter,Writer
//   java.lang.AbstractStringBuilder
//   java.util.regex.Matcher,Pattern
 
implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=inF.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

var formatterClass;

if (!String.format)
 String.format = function() {
  if (!formatterClass)
    formatterClass = Class.forName("java.util.Formatter");
  var f = formatterClass.newInstance();
  return f.format.apply(f,arguments).toString();
 }

;(function(sp) {

sp.$replace=function(c1,c2){
  if (c1 == c2 || this.indexOf (c1) < 0) return "" + this;
  if (c1.length == 1) {
    if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0)   
      c1 = "\\" + c1;
  } else {    
    c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){
      return "\\"+$1;
    });
  }
  return this.replace(new RegExp(c1,"gm"),c2);
};
sp.$generateExpFunction=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){ // ' ) {
i++;
var c=str.charAt(i);
if(c=='\\'){ // ' ){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
var f=null;
eval(funStr)
return f;
};

sp.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.matches=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
sp.regionMatches=function(ignoreCase,toffset,
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
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};



sp.$plit=function(regex,limit){
if (!limit && regex == " ")
  return this.split(regex);

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

if (!sp.trim)
sp.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
};

if (!sp.startsWith || !sp.endsWith) {
var sn=function(s, prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>s.length-pc)){
return false;
}
while(--pc>=0){
if(s.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

sp.startsWith=function(prefix){
if(arguments.length==1){
return sn(this,arguments[0],0);
}else if(arguments.length==2){
return sn(this,arguments[0],arguments[1]);
}else{
return false;
}
};

sp.endsWith=function(suffix){
return sn(this, suffix,this.length-suffix.length);
};

}

sp.equals=function(anObject){
return this.valueOf()==anObject;
};

sp.equalsIgnoreCase=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


sp.hash=0;

sp.hashCode=function(){
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

sp.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return arrs;
};

sp.contains = function(a) {return this.indexOf(a) >= 0}  // bh added
sp.compareTo = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added



sp.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return""+o;
};

sp.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

sp.compareToIgnoreCase=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

sp.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

sp.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};
sp.$concat=sp.concat;
sp.concat=function(s){
if(s==null){
throw new NullPointerException();
}
return this.$concat(s);
};

sp.$lastIndexOf=sp.lastIndexOf;
sp.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

sp.intern=function(){
return this.valueOf();
};

String.copyValueOf=sp.copyValueOf=function(){
  if(arguments.length==1){
  return String.instantialize(arguments[0]);
  }else{
  return String.instantialize(arguments[0],arguments[1],arguments[2]);
  }
};

sp.codePointAt || (sp.codePointAt = sp.charCodeAt); // Firefox only


})(String.prototype);

String.instantialize=function(){
switch (arguments.length) {
case 0:
  return new String();
case 1:
  var x=arguments[0];
  if (x.BYTES_PER_ELEMENT || x instanceof Array){
    return (x.length == 0 ? "" : typeof x[0]=="number" ? Encoding.readUTF8(String.fromCharCode.apply(null, x)) : x.join(''));
  }
  if(typeof x=="string"||x instanceof String){
    return new String(x);
  }
  if(x.__CLASS_NAME__=="StringBuffer"||x.__CLASS_NAME__=="java.lang.StringBuffer"){
    var value=x.shareValue();
    var length=x.length();
    var valueCopy=new Array(length);
    for(var i=0;i<length;i++){
      valueCopy[i]=value[i];
    }
    return valueCopy.join('')
  }
  return""+x;
case 2:  
  var x=arguments[0];
  var hibyte=arguments[1];
  if(typeof hibyte=="string"){
    return String.instantialize(x,0,x.length,hibyte);
  }
  return String.instantialize(x,hibyte,0,x.length);
case 3:
  var bytes=arguments[0];
  var offset=arguments[1];
  var length=arguments[2];
  if(arguments[2]instanceof Array){
    bytes=arguments[2];
    offset=arguments[0];
    length=arguments[1];
  }
  var arr=new Array(length);
  if(offset<0||length+offset>bytes.length){
    throw new IndexOutOfBoundsException();
  }
  if(length>0){
    var isChar=(bytes[offset].length!=null);
    if(isChar){
      for(var i=0;i<length;i++){
        arr[i]=bytes[offset+i];
      }
    }else{
      for(var i=0;i<length;i++){
        arr[i]=String.fromCharCode(bytes[offset+i]);
      }
    }
  }
  return arr.join('');
case 4:
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
    var cs=y.toLowerCase();
    if(cs=="utf-8"||cs=="utf8"){
      return Encoding.readUTF8(arr.join(''));
    }
    return arr.join('');
  }
  var count=arguments[3];
  var offset=arguments[2];
  var hibyte=arguments[1];
  var value=new Array(count);
  if(hibyte==0){
    for(var i=count;i-->0;){
      value[i]=String.fromCharCode(bytes[i+offset]&0xff);
    }
  }else{
    hibyte<<=8;
    for(var i=count;i-->0;){
      value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
    }
  }
  return value.join('');
default:
  var s="";
  for(var i=0;i<arguments.length;i++){
    s+=arguments[i];
  }
  return s;
}
};

if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
  String.prototype.toString=function(){return this.valueOf();};
}

}

})(Clazz._Encoding);


c$=Clazz.decorateAsClass(function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
Clazz._setDeclared("java.lang.Character", java.lang.Character); 

Clazz.newMethod$(c$,"construct",
function(value){
this.value=value;
}, 1);

Clazz.newMethod$(c$,"charValue",
function(){
return this.value;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
Clazz.newMethod$(c$,"equals",
function(obj){
if(Clazz.instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
});
Clazz.newMethod$(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
});
c$.toLowerCase=Clazz.newMethod$(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
});
c$.toUpperCase=Clazz.newMethod$(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
});
c$.isDigit=Clazz.newMethod$(c$,"isDigit",
function(c){
c = c.charCodeAt(0);
return (48 <= c && c <= 57);
});
c$.isUpperCase=Clazz.newMethod$(c$,"isUpperCase",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90);
});
c$.isLowerCase=Clazz.newMethod$(c$,"isLowerCase",
function(c){
c = c.charCodeAt(0);
return (97 <= c && c <= 122);
});
c$.isWhitespace=Clazz.newMethod$(c$,"isWhitespace",
function(c){
c = (c).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
  || c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
});
c$.isLetter=Clazz.newMethod$(c$,"isLetter",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
});
c$.isLetterOrDigit=Clazz.newMethod$(c$,"isLetterOrDigit",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
});
c$.isSpaceChar=Clazz.newMethod$(c$,"isSpaceChar",
function(c){
 var i = c.charCodeAt(0);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
});
c$.digit=Clazz.newMethod$(c$,"digit",
function(c,radix){
var i = c.charCodeAt(0);
if(radix >= 2 && radix <= 36){
  if(i < 128){
    var result = -1;
    if(48 <= i && i <= 57){
    result = i - 48;
    }else if(97 <= i && i <= 122){
    result = i - 87;
    }else if(65 <= i && i <= 90){
    result=i-(55);
    }
    return (result < radix ? result : -1);
  }
}
return -1;
});
Clazz.newMethod$(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=Clazz.newMethod$(c$,"toString",
function(c){
{
if(this===Character){
return"class java.lang.Character";
}
}return String.valueOf(c);
});
Clazz.defineStatics(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36,
"TYPE",null);
java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
java.lang.Character.charCount = java.lang.Character.prototype.charCount = function(codePoint){return codePoint >= 0x010000 ? 2 : 1;};

Clazz._ArrayWrapper = function(a, type) {
 return {
   a: a,
   __CLASS_NAME__:"Array",
   superClazz: Array,
   getComponentType: function() {return type},
   instanceOf: function(o) { return  Clazz.instanceOf(type, o) },
   getName: function() { return this.__CLASS_NAME__ }
 };
}
c$=declareType(java.lang.reflect,"Array");
Clazz._setDeclared("java.lang.reflect.Array", java.lang.reflect.Array) 

c$.newInstance=Clazz.newMethod$(c$,"newInstance",
function(componentType,size){
var a = Clazz.newArray(size);
 a.getClass = function() { return new Clazz._ArrayWrapper(this, componentType);};
return a;
});

Clazz._setDeclared("java.util.Date", javautil.Date=Date);
Date.TYPE="javautil.Date";
Date.__CLASS_NAME__="Date";
Clazz._implementOf(Date,[java.io.Serializable,java.lang.Comparable]);

Clazz.newMethod$(javautil.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.newMethod$(javautil.Date,"before",
function(when){
return this.getTime()<when.getTime();
});
Clazz.newMethod$(javautil.Date,"after",
function(when){
return this.getTime()>when.getTime();
});
Clazz.newMethod$(javautil.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,javautil.Date)&&this.getTime()==(obj).getTime();
});
Clazz.newMethod$(javautil.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
});
Clazz.newMethod$(javautil.Date,"compareTo",
function(o){
return this.compareTo(o);
});
Clazz.newMethod$(javautil.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});


var declareType = function(prefix, name, clazzSuper, interfacez, superClazzInstance) {
  return Clazz.decorateAsClass(function(){}, prefix, name, clazzSuper, interfacez, superClazzInstance);
};

c$=declareType(javautil,"EventObject",null,java.io.Serializable);
Clazz._setDeclared("java.util.EventObject", java.util.EventObject); 

Clazz.newMethod$(c$, "construct"
function(source){
this.source=null;
if(arguments.length > 0  && source!=null)this.source=source;
else throw new IllegalArgumentException();
}, 1);

Clazz.newMethod$(c$,"getSource",
function(){
return this.source;
});
Clazz.newMethod$(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
Clazz.declareInterface(javautil,"EventListener");

c$=Clazz.decorateAsClass(function(){
this.listener=null;
Clazz.instantialize(this,arguments);
},javautil,"EventListenerProxy",null,javautil.EventListener);
Clazz.newMethod$(c$, "construct"
function(listener){
this.listener=listener;
},1);

Clazz.newMethod$(c$,"getListener",
function(){
return this.listener;
});
Clazz.declareInterface(javautil,"Iterator");

Clazz.declareInterface(javautil,"ListIterator",javautil.Iterator);
Clazz.declareInterface(javautil,"Enumeration");
Clazz.declareInterface(javautil,"Collection",Iterable);

Clazz.declareInterface(javautil,"Set",javautil.Collection);
Clazz.declareInterface(javautil,"Map");
Clazz.declareInterface(javautil.Map,"Entry");

Clazz.declareInterface(javautil,"List",javautil.Collection);

Clazz.declareInterface(javautil,"Queue",javautil.Collection);
Clazz.declareInterface(javautil,"RandomAccess");

var C$ = Clazz.decorateAsClass (function () {
this.detailMessage = null;
this.cause = this;
this.stackTrace = null;
this.fillInStackTrace ();
Clazz.newInstance$ (this, arguments);
}, java.lang, "Throwable", null, java.io.Serializable);

Clazz.newMethod$ (C$, 'construct', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (message) {
this.detailMessage = message;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Throwable', function (message, cause) {
this.detailMessage = message;
this.cause = cause;
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (cause) {
this.detailMessage = (cause == null ? null : cause.toString ());
this.cause = cause;
}, 1);

Clazz.newMethod$ (C$, 'getMessage', function () {
{
if (typeof this.message != "undefined") {
return this.message;
}
}return this.detailMessage;
});

Clazz.newMethod$ (C$, 'getLocalizedMessage', function () {
return this.getMessage ();
});

Clazz.newMethod$ (C$, 'getCause', function () {
return (this.cause === this ? null : this.cause);
});

Clazz.newMethod$ (C$, 'initCause$Throwable', function (cause) {
if (this.cause !== this) throw Clazz.$new(IllegalStateException.construct$S,["Can't overwrite cause"]);
if (cause === this) throw Clazz.$new(IllegalArgumentException.construct$S,["Self-causation not permitted"]);
this.cause = cause;
return this;
});

Clazz.newMethod$ (C$, 'toString', function () {
var s = this.getClass ().getName ();
var message = this.getLocalizedMessage ();
return (message != null) ? (s + ": " + message) : s;
});

Clazz.newMethod$ (C$, 'printStackTrace', function () {
System.err.println$O (this);
for (var i = 0; i < this.stackTrace.length; i++) {
var t = this.stackTrace[i];
var x = t.methodName.indexOf ("(");
var n = t.methodName.substring (0, x).replace (/\s+/g, "");
if (n != "construct" || t.nativeClazz == null
|| Clazz.getInheritedLevel (t.nativeClazz, Throwable) < 0) {
System.err.println (t);
}
}
});

Clazz.newMethod$ (C$, 'printStackTrace$java_io_PrintStream', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$ (C$, 'printStackTrace$java_io_PrintWriter', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$ (C$, 'fillInStackTrace', function () {
this.stackTrace = new Array();
var caller = arguments.callee.caller;
var superCaller = null;
var callerList = new Array();
var index = Clazz.callingStackTraces.length - 1;
var noLooping = true;
while (index > -1 || caller != null) {
var clazzName = null;
var nativeClazz = null;
if (!noLooping || caller == Clazz.tryToSearchAndExecute || caller == Clazz.superCall || caller == null) {
if (index < 0) {
break;
}
noLooping = true;
superCaller = Clazz.callingStackTraces[index].caller;
nativeClazz = Clazz.callingStackTraces[index].owner;
index--;
} else {
superCaller = caller;
if (superCaller.claxxOwner != null) {
nativeClazz = superCaller.claxxOwner;
} else if (superCaller.exClazz != null) {
nativeClazz = superCaller.exClazz;
}
}
var st =Clazz.$new(StackTraceElement.construct, [
((nativeClazz != null && nativeClazz.__CLASS_NAME__.length != 0) ?
nativeClazz.__CLASS_NAME__ : "anonymous"),
((superCaller.exName == null) ? "anonymous" : superCaller.exName)
+ " (" + Clazz.getParamsType (superCaller.arguments) + ")",
null, -1]);
st.nativeClazz = nativeClazz;
this.stackTrace[this.stackTrace.length] = st;
for (var i = 0; i < callerList.length; i++) {
if (callerList[i] == superCaller) {
// ... stack information lost as recursive invocation existed ...
var st =Clazz.$new(StackTraceElement.construct, ["lost", "missing", null, -3]);
st.nativeClazz = null;
this.stackTrace[this.stackTrace.length] = st;
noLooping = false;
//break;
}
}
if (superCaller != null) {
callerList[callerList.length] = superCaller;
}
//caller = superCaller.arguments.callee.caller;
// Udo
caller = (superCaller && superCaller.arguments && superCaller.arguments.callee) ? superCaller.arguments.callee.caller : null;
}
Clazz.initializingException = false;
return this;
});

Clazz.newMethod$ (C$, 'setStackTrace$StackTraceElementA', function (stackTrace) {
var defensiveCopy = stackTrace.clone ();
for (var i = 0; i < defensiveCopy.length; i++) if (defensiveCopy[i] == null) throw Clazz.$new(NullPointerException.construct$S,["stackTrace[" + i + "]"]);

this.stackTrace = defensiveCopy;
});

//Created 2017-08-07 11:21:25


/*
c$=Clazz.decorateAsClass(function(){
},java.lang,"Throwable",null,java.io.Serializable);

Clazz.newMethod$(c$,"construct",
function(a, b){
  this.detailMessage=null;
  this.stackTrace=null;
  this.cause=this;
  this.fillInStackTrace();
  switch (arguments.length) {
  case 2:
    this.detailMessage=a;
    a = b;
    // fall through
  case 1:
   if (typeof a == "string") {
    this.detailMessage=a;
   } else {
    this.cause=a;
    this.detailMessage=(a==null?null:a.toString());
   }
  }
}, 1);

Clazz.newMethod$(c$,"getMessage",
function(){
return (this.message || this.detailMessage || this.toString());
});
Clazz.newMethod$(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz.newMethod$(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz.newMethod$(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
});
Clazz.newMethod$(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.message || this.detailMessage;
return(message ? s+": "+message : s);
});
Clazz.newMethod$(c$,"printStackTrace",
function(){
System.err.println(this.getStackTrace && this.stackTrace ? this.getStackTrace() : this.message + " " + Clazz.getStackTrace());
});

Clazz.newMethod$(c$,"getStackTrace",
function(){
var s = "" + this + "\n";
if (!this.stackTrace){
debugger;
return s
}
for(var i=0;i<this.stackTrace.length;i++){
 var t=this.stackTrace[i];
  var x=t.methodName.indexOf("(");
  var n=t.methodName.substring(0,x).replace(/\s+/g,"");
  if(n!="construct"||t.nativeClazz==null
     //|| Clazz._getInheritedLevel(t.nativeClazz,Throwable)<0
     ){
        s += t + "\n";
  }
}
return s;
});


Clazz.newMethod$(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz.newMethod$(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz.newMethod$(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz._callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClass=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==Clazz.superCall||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz._callingStackTraces[index].caller;
nativeClass=Clazz._callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.overrider!=null){
nativeClass=superCaller.overrider;
}else if(superCaller.exClazz!=null){
nativeClass=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClass!=null&&nativeClass.__CLASS_NAME__.length!=0)?
nativeClass.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+getParamTypes(superCaller.arguments).typeString+")",
null,-1);
st.nativeClazz=nativeClass;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){
var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz._initializingException=false;
return this;
});
Clazz.newMethod$(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");


*/




c$=Clazz.decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
},java.lang,"StackTraceElement",null,java.io.Serializable);

Clazz.newMethod$(c$, "construct",
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},1);

Clazz.newMethod$(c$,"equals",
function(obj){
if(!(Clazz.instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
});
Clazz.newMethod$(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz.newMethod$(c$,"getFileName",
function(){
return this.fileName;
});
Clazz.newMethod$(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz.newMethod$(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz.newMethod$(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz.newMethod$(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz.newMethod$(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});


TypeError.prototype.getMessage || (TypeError.prototype.getMessage = function(){ return (this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace() : Clazz.getStackTrace())});


Clazz.Error = Error;

declareTypeError = function (prefix, name, clazzParent, interfacez, 
    parentClazzInstance, _declareType) {
  var f = function () {
    Clazz.instantialize (this, arguments);
    return Clazz.Error();
  };
  return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
      parentClazzInstance);
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
Clazz.decorateAsClass (function (){
return Clazz._Error();
}, java.lang, "Error", Throwable);

//c$=declareTypeError(java.lang,"Error",Throwable);

c$=declareType(java.lang,"LinkageError",Error);

c$=declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=declareType(java.lang,"ClassCircularityError",LinkageError);

c$=declareType(java.lang,"ClassFormatError",LinkageError);

c$=declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=declareType(java.lang,"VirtualMachineError",Error);

c$=declareType(java.lang,"InternalError",VirtualMachineError);

c$=declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=declareType(java.lang,"UnknownError",VirtualMachineError);

c$=declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=declareType(java.lang,"VerifyError",LinkageError);

c$=declareType(java.lang,"ThreadDeath",Error);

c$=declareType(java.lang,"Exception",Throwable);

c$=declareType(java.lang,"RuntimeException",Exception);

c$=declareType(java.lang,"ArithmeticException",RuntimeException);

c$=declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
c$.newMethod$(c$, "construct$I", function() {
c$.superClazz.construct$S.apply(this, ["Array index out of range: "+index]);
}, 1);

c$=declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.ex=null;
},java.lang,"ClassNotFoundException",Exception);
Clazz.newMethod$(c$, "construct$S$Throwable", function(detailMessage,exception){
c$.superClazz.construct$S$Throwable.apply(this, arguments);
this.ex=exception;
}, 1);
Clazz.newMethod$(c$,"getException",
function(){
return this.ex;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.ex;
});

c$=declareType(java.lang,"CloneNotSupportedException",Exception);

c$=declareType(java.lang,"IllegalAccessException",Exception);

c$=declareType(java.lang,"IllegalArgumentException",RuntimeException);

c$=declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=declareType(java.lang,"IllegalStateException",RuntimeException);

c$=declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=declareType(java.lang,"InstantiationException",Exception);

c$=declareType(java.lang,"InterruptedException",Exception);

c$=declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=declareType(java.lang,"NoSuchFieldException",Exception);

c$=declareType(java.lang,"NoSuchMethodException",Exception);

c$=declareType(java.lang,"NullPointerException",RuntimeException);

c$=declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=declareType(java.lang,"SecurityException",RuntimeException);

c$=declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.newMethod$(c$, "construct$I", function(index){
c$.superClazz.construct$S.apply(this,["String index out of range: "+index]);
}, 1);

c$=declareType(java.lang,"UnsupportedOperationException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.target=null;
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz.newMethod$(c$, "construct$Throwable", function(exception){
c$.superClazz.construct$Throwable.apply(this, arguments);
this.target=exception;
}, 1);
Clazz.newMethod$(c$, "construct$Throwable$S", function(exception,detailMessage){
c$.superClazz.construct$S$Throwable.apply(this,[detailMessage,exception]);
this.target=exception;
}, 1);
Clazz.newMethod$(c$,"getTargetException",
function(){
return this.target;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.target;
});

c$=Clazz.decorateAsClass(function(){
this.undeclaredThrowable=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
Clazz.makeConstructor(c$,
function(exception,detailMessage){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
Clazz.newMethod$(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=declareType(java.io,"IOException",Exception);


c$=declareType(java.io,"CharConversionException",java.io.IOException);

c$=declareType(java.io,"EOFException",java.io.IOException);

c$=declareType(java.io,"FileNotFoundException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.bytesTransferred=0;
Clazz.instantialize(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=declareType(java.io,"ObjectStreamException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.classname=null;
Clazz.instantialize(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(className,detailMessage){
Clazz.superConstructor(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
Clazz.newMethod$(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=declareType(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=declareType(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=declareType(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=Clazz.decorateAsClass(function(){
this.eof=false;
this.length=0;
Clazz.instantialize(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=declareType(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=declareType(java.io,"SyncFailedException",java.io.IOException);

c$=declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=declareType(java.io,"UTFDataFormatException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.detail=null;
Clazz.instantialize(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(detailMessage,rootCause){
Clazz.superConstructor(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
Clazz.newMethod$(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.WriteAbortedException,"getMessage",[]);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.detail;
});

c$=declareType(javautil,"ConcurrentModificationException",RuntimeException);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,javautil.ConcurrentModificationException,[]);
});

c$=declareType(javautil,"EmptyStackException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz.instantialize(this,arguments);
},javautil,"MissingResourceException",RuntimeException);
Clazz.makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz.superConstructor(this,javautil.ResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz.newMethod$(c$,"getClassName",
function(){
return this.className;
});
Clazz.newMethod$(c$,"getKey",
function(){
return this.key;
});

c$=declareType(javautil,"NoSuchElementException",RuntimeException);

c$=declareType(javautil,"TooManyListenersException",Exception);

c$=declareType(java.lang,"Void");
Clazz.defineStatics(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}Clazz.declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz.declareInterface(java.lang.reflect,"AnnotatedElement");

c$=declareType(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
Clazz.makeConstructor(c$,
function(){
});
Clazz.newMethod$(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=Clazz.newMethod$(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
Clazz.newMethod$(c$,"setAccessible",
function(flag){
return;
},"~B");
Clazz.newMethod$(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
Clazz.newMethod$(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
Clazz.newMethod$(c$,"getAnnotations",
function(){
return new Array(0);
});
Clazz.newMethod$(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=Clazz.newMethod$(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
Clazz.newMethod$(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
Clazz.newMethod$(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
Clazz.newMethod$(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
Clazz.newMethod$(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
Clazz.newMethod$(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
Clazz.newMethod$(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
Clazz.declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz.declareInterface(java.lang.reflect,"Member");
Clazz.defineStatics(c$,
"PUBLIC",0,
"DECLARED",1);

c$=declareType(java.lang.reflect,"Modifier");
Clazz.makeConstructor(c$,
function(){
});
c$.isAbstract=Clazz.newMethod$(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
});
c$.isFinal=Clazz.newMethod$(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
});
c$.isInterface=Clazz.newMethod$(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
});
c$.isNative=Clazz.newMethod$(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
});
c$.isPrivate=Clazz.newMethod$(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
});
c$.isProtected=Clazz.newMethod$(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
});
c$.isPublic=Clazz.newMethod$(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
});
c$.isStatic=Clazz.newMethod$(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
});
c$.isStrict=Clazz.newMethod$(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
});
c$.isSynchronized=Clazz.newMethod$(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
});
c$.isTransient=Clazz.newMethod$(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
});
c$.isVolatile=Clazz.newMethod$(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
});
c$.toString=Clazz.newMethod$(c$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
});
Clazz.defineStatics(c$,
"PUBLIC",0x1,
"PRIVATE",0x2,
"PROTECTED",0x4,
"STATIC",0x8,
"FINAL",0x10,
"SYNCHRONIZED",0x20,
"VOLATILE",0x40,
"TRANSIENT",0x80,
"NATIVE",0x100,
"INTERFACE",0x200,
"ABSTRACT",0x400,
"STRICT",0x800,
"BRIDGE",0x40,
"VARARGS",0x80,
"SYNTHETIC",0x1000,
"ANNOTATION",0x2000,
"ENUM",0x4000);


var newMethodNotFoundException = function (clazz, method) {
  var message = "Method " + Clazz.getClassName (clazz, true) + (method ? "." 
          + method : "") was not found";
  System.out.println(message);
  console.log(message);
  throw Clazz.$new(java.lang.NoSuchMethodException.construct$S, [message]);        
};

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);

Clazz.newMethod$(c$, "construct$Class$ClassA$ClassA$I", function(declaringClass,parameterTypes,checkedExceptions,modifiers){
Clazz.super$(c$, this);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
}, 1);
Clazz.newMethod$(c$,"getTypeParameters",
function(){
return null;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.newMethod$(c$,"isVarArgs",
function(){
return false;
});
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"equals$O",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
});
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.newMethod$(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.newMethod$(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.newMethod$(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
Clazz.newMethod$(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
Clazz.newMethod$(c$,"newInstance$OA", function(args){
var a = (args ? new Array(args.length) : null);
if (args) {
  for (var i = args.length; --i >= 0;) {
    a[i] = (this.parameterTypes[i] == Number ? args[i].valueOf() : args[i]);
  }
}
var instance=new this.clazz(null, Clazz.inheritArgs);
if (instance == null)
  newMethodNotFoundException(this.clazz, "construct", getParamTypes(a).typeString);  
Clazz.instantialize(instance,a);
return instance;
},"~A");
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

c$=declareType(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"isEnumConstant",
function(){
return false;
});
Clazz.newMethod$(c$,"getGenericType",
function(){
return null;
});
Clazz.newMethod$(c$,"equals",
function(object){
return false;
},"~O");
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return null;
});
Clazz.newMethod$(c$,"getName",
function(){
return null;
});
Clazz.newMethod$(c$,"getType",
function(){
return null;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return 0;
});
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz.newMethod$(c$, "construct$Class$S$ClassA$Class$ClassA$I", function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
Clazz.super$(c$, this);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
}, 1);
Clazz.newMethod$(c$,"getTypeParameters",
function(){
return null;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericReturnType",
function(){
return null;
});
Clazz.newMethod$(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.newMethod$(c$,"isVarArgs",
function(){
return false;
});
Clazz.newMethod$(c$,"isBridge",
function(){
return false;
});
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"getDefaultValue",
function(){
return null;
});
Clazz.newMethod$(c$,"equals$O",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
});
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.newMethod$(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.newMethod$(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.newMethod$(c$,"getName",
function(){
return this.name;
});
Clazz.newMethod$(c$,"getParameterTypes",
function(){
return this.parameterTypes; 
});
Clazz.newMethod$(c$,"getReturnType",
function(){
return this.returnType;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
Clazz.newMethod$(c$,"invoke$O$OA",
function(receiver,args){
var name = this.getName();
var m=this.clazz.prototype[name] || this.clazz[name];
if (m == null)
  newMethodNotFoundException(this.clazz, name);
  // must fix [Number,Number...]
var a = (args ? new Array(args.length) : null);
if (a) {
  for (var i = a.length; --i >= 0;) {
    a[i] = (this.parameterTypes[i] == Number ? args[i].valueOf() : args[i]);
  }
}  
return m.apply(receiver,a);
});
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

})(Clazz); // requires JSmolCore.js

