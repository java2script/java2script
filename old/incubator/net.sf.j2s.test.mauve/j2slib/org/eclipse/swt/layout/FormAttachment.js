c$=$_C(function(){
this.numerator=0;
this.denominator=100;
this.offset=0;
this.control=null;
this.alignment=0;
$_Z(this,arguments);
},$wt.layout,"FormAttachment");
$_K(c$,
function(){
});
$_K(c$,
function(numerator){
this.construct(numerator,100,0);
},"~N");
$_K(c$,
function(numerator,offset){
this.construct(numerator,100,offset);
},"~N,~N");
$_K(c$,
function(numerator,denominator,offset){
this.numerator=numerator;
this.denominator=denominator;
this.offset=offset;
},"~N,~N,~N");
$_K(c$,
function(control){
this.construct(control,0,-1);
},"$wt.widgets.Control");
$_K(c$,
function(control,offset){
this.construct(control,offset,-1);
},"$wt.widgets.Control,~N");
$_K(c$,
function(control,offset,alignment){
this.control=control;
this.offset=offset;
this.alignment=alignment;
},"$wt.widgets.Control,~N,~N");
$_M(c$,"divide",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator*value,Math.floor(this.offset/value));
},"~N");
$_M(c$,"gcd",
function(m,n){
var temp;
m=Math.abs(m);
n=Math.abs(n);
if(m<n){
temp=m;
m=n;
n=temp;
}while(n!=0){
temp=m;
m=n;
n=temp%n;
}
return m;
},"~N,~N");
$_M(c$,"minus",
function(attachment){
var solution=new $wt.layout.FormAttachment();
solution.numerator=this.numerator*attachment.denominator-this.denominator*attachment.numerator;
solution.denominator=this.denominator*attachment.denominator;
var gcd=this.gcd(solution.denominator,solution.numerator);
solution.numerator=Math.floor(solution.numerator/gcd);
solution.denominator=Math.floor(solution.denominator/gcd);
solution.offset=this.offset-attachment.offset;
return solution;
},"$wt.layout.FormAttachment");
$_M(c$,"minus",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset-value);
},"~N");
$_M(c$,"plus",
function(attachment){
var solution=new $wt.layout.FormAttachment();
solution.numerator=this.numerator*attachment.denominator+this.denominator*attachment.numerator;
solution.denominator=this.denominator*attachment.denominator;
var gcd=this.gcd(solution.denominator,solution.numerator);
solution.numerator=Math.floor(solution.numerator/gcd);
solution.denominator=Math.floor(solution.denominator/gcd);
solution.offset=this.offset+attachment.offset;
return solution;
},"$wt.layout.FormAttachment");
$_M(c$,"plus",
function(value){
return new $wt.layout.FormAttachment(this.numerator,this.denominator,this.offset+value);
},"~N");
$_M(c$,"solveX",
function(value){
return(Math.floor((this.numerator*value)/this.denominator))+this.offset;
},"~N");
$_M(c$,"solveY",
function(value){
return Math.floor((value-this.offset)*this.denominator/this.numerator);
},"~N");
$_V(c$,"toString",
function(){
var string=this.control!=null?this.control.toString():this.numerator+"/"+this.denominator;
return"{y = ("+string+(this.offset>=0?")x + "+this.offset:")x - "+(-this.offset))+"}";
});
