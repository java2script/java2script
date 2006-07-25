Clazz.load(["java.io.Serializable"],"java.util.EventObject",["java.lang.IllegalArgumentException"],function(){
c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.util,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source==null)throw new java.lang.IllegalArgumentException("null source");
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
