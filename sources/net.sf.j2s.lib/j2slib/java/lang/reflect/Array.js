c$=$_C(function(){
$_Z(this,arguments);
},reflect,"Array");
c$.newInstance=$_M(c$,"newInstance",
function(componentType,length){
return java.lang.reflect.Array.newArray(componentType,length);
},"Class,~N");
c$.newInstance=$_M(c$,"newInstance",
function(componentType,dimensions){
return java.lang.reflect.Array.multiNewArray(componentType,dimensions);
},"Class,~A");
