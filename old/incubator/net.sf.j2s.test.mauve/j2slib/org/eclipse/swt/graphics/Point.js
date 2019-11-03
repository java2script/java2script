$_L(["$wt.internal.SerializableCompatibility"],"$wt.graphics.Point",null,function(){
c$=$_C(function(){
this.x=0;
this.y=0;
$_Z(this,arguments);
},$wt.graphics,"Point",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(x,y){
this.x=x;
this.y=y;
},"~N,~N");
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.graphics.Point)))return false;
var p=object;
return(p.x==this.x)&&(p.y==this.y);
},"~O");
$_V(c$,"hashCode",
function(){
return this.x^this.y;
});
$_V(c$,"toString",
function(){
return"Point {"+this.x+", "+this.y+"}";
});
});
