Clazz.load(["java.util.Vector"],"java.util.Stack",["java.util.EmptyStackException"],function(){
c$=$_C(function(){
$_Z(this,arguments);
},java.util,"Stack",java.util.Vector);
$_K(c$,
function(){
$_R(this,java.util.Stack,[]);
});
$_M(c$,"push",
function(item){
this.addElement(item);
return item;
},"~O");
$_M(c$,"pop",
function(){
var obj;
var len=this.size();
obj=this.peek();
this.removeElementAt(len-1);
return obj;
});
$_M(c$,"peek",
function(){
var len=this.size();
if(len==0)throw new java.util.EmptyStackException();
return this.elementAt(len-1);
});
$_M(c$,"empty",
function(){
return this.size()==0;
});
$_M(c$,"search",
function(o){
var i=this.lastIndexOf(o);
if(i>=0){
return this.size()-i;
}return-1;
},"~O");
$_S(c$,
"serialVersionUID",1224463164541339165);
});
