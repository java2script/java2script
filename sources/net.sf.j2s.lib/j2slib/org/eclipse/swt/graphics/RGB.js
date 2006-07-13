Clazz.load(["$wt.internal.SerializableCompatibility"],"$wt.graphics.RGB",["$wt.SWT"],function(){
c$=$_C(function(){
this.red=0;
this.green=0;
this.blue=0;
$_Z(this,arguments);
},$wt.graphics,"RGB",null,$wt.internal.SerializableCompatibility);
$_K(c$,
function(red,green,blue){
this.red=red;
this.green=green;
this.blue=blue;
},"~N,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.RGB)))return false;
var rgb=object;
return(rgb.red==this.red)&&(rgb.green==this.green)&&(rgb.blue==this.blue);
},"~O");
$_V(c$,"hashCode",
function(){
return(this.blue<<16)|(this.green<<8)|this.red;
});
$_V(c$,"toString",
function(){
return"RGB {"+this.red+", "+this.green+", "+this.blue+"}";
});
$_S(c$,
"serialVersionUID",3258415023461249074);
});
