$_L(["java.lang.RuntimeException"],"java.lang.annotation.IncompleteAnnotationException",["org.apache.harmony.luni.util.Msg"],function(){
c$=$_C(function(){
this.$annotationType=null;
this.$elementName=null;
$_Z(this,arguments);
},java.lang.annotation,"IncompleteAnnotationException",RuntimeException);
$_K(c$,
function(annotationType,elementName){
$_R(this,java.lang.annotation.IncompleteAnnotationException,[org.apache.harmony.luni.util.Msg.getString("annotation.0",elementName,annotationType)]);
this.$annotationType=annotationType;
this.$elementName=elementName;
},"Class,~S");
$_M(c$,"annotationType",
function(){
return this.$annotationType;
});
$_M(c$,"elementName",
function(){
return this.$elementName;
});
});
