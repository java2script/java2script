c$=$_C(function(){
this.event=null;
this.sourceElement=null;
this.startX=0;
this.startY=0;
this.currentX=0;
this.currentY=0;
$_Z(this,arguments);
},$wt.internal.dnd,"DragEvent");
$_K(c$,
function(evt,src,x,y){
this.event=evt;
this.sourceElement=src;
this.startX=x;
this.startY=y;
},"$wt.internal.dnd.HTMLEventWrapper,Element,~N,~N");
$_M(c$,"deltaX",
function(){
return this.currentX-this.startX;
});
$_M(c$,"deltaY",
function(){
return this.currentY-this.startY;
});
$_M(c$,"mouseMoveTo",
function(currentX,currentY){
this.currentX=currentX;
this.currentY=currentY;
},"~N,~N");
$_V(c$,"toString",
function(){
return"DragEvent {"+this.sourceElement+"#"+"("+this.startX+","+this.startY+")->"+"("+this.currentX+","+this.currentY+")}";
});
