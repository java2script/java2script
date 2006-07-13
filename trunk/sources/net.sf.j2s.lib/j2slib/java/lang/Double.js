/* http://j2s.sf.net/ */Clazz.load(["java.lang.Comparable","$.Number"],"java.lang.Double",null,function(){
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
});