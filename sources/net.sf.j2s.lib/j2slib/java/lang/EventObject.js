$_L(["java.io.Serializable"],"java.lang.EventObject",["java.lang.IllegalArgumentException"],function(){
c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.lang,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
$_M(c$,"getSource",
function(){
return this.source;
});
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
$_S(c$,
"serialVersionUID",5516075349620653480);
});
