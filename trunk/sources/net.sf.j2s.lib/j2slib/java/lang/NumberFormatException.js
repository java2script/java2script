Clazz.load(["java.lang.IllegalArgumentException"],"java.lang.NumberFormatException",null,function(){
c$=$_C(function(){
$_Z(this,arguments);
},java.lang,"NumberFormatException",java.lang.IllegalArgumentException);
$_K(c$,
function(){
alert ("Call null");
$_R(this,NumberFormatException);
});
$_K(c$,
function(s){
alert ("call from :" + s);
$_R(this,NumberFormatException,[s]);
},"~S");
c$.forInputString=$_M(c$,"forInputString",
function(s){
return new java.lang.NumberFormatException("For input string: \"" + s + "\"");
},"~S");
$_V(c$, "toString", function() {
	return this.detailMessage;
});
$_S(c$,
"serialVersionUID",-2848938806368998894);
});
