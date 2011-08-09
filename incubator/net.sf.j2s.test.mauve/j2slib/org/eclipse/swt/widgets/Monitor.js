$_L(null,"$wt.widgets.Monitor",["$wt.graphics.Rectangle"],function(){
c$=$_C(function(){
this.handle=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.clientX=0;
this.clientY=0;
this.clientWidth=0;
this.clientHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Monitor");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(!($_O(object,$wt.widgets.Monitor)))return false;
var monitor=object;
return this.handle===monitor.handle;
},"~O");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"getClientArea",
function(){
return new $wt.graphics.Rectangle(this.clientX,this.clientY,this.clientWidth,this.clientHeight);
});
$_V(c$,"hashCode",
function(){
if(this.handle.id==null||this.handle.id.length==0){
var random=Math.random();
var code=Math.round(random)*1000000;
this.handle.id=""+code;
return code;
}else{
var code=Integer.parseInt(this.handle.id);
if(this.handle.id===""+code){
return code;
}else{
return this.handle.id.hashCode();
}}});
});
