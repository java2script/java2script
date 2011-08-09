c$=$_C(function(){
this.width=-1;
this.height=-1;
this.exclude=false;
$_Z(this,arguments);
},$wt.layout,"RowData");
$_K(c$,
function(){
});
$_K(c$,
function(width,height){
this.width=width;
this.height=height;
},"~N,~N");
$_K(c$,
function(point){
this.construct(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.width!=-1)string+="width="+this.width+" ";
if(this.height!=-1)string+="height="+this.height+" ";
if(this.exclude)string+="exclude="+this.exclude+" ";
string=string.trim();
string+="}";
return string;
});
