Clazz.load(null,"$wt.widgets.Monitor",["$wt.graphics.Rectangle"],function(){
c$=$_C(function(){
this.handle=0;
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
if(object==this)return true;
if(!($_O(object,$wt.widgets.Monitor)))return false;
var monitor=object;
return this.handle==monitor.handle;
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
return this.handle;
});
});
