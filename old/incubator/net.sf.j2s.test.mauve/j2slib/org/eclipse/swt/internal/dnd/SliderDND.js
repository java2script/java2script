$_L(["$wt.internal.dnd.DragAdapter"],"$wt.internal.dnd.SliderDND",null,function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"SliderDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
var cssName=e.sourceElement.className;
if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}var style=e.sourceElement.style;
this.sourceX=style.left.length>0?Integer.parseInt(e.sourceElement.style.left):0;
this.sourceY=style.top.length>0?Integer.parseInt(e.sourceElement.style.top):0;
e.startX=e.currentX;
e.startY=e.currentY;
return true;
},"$wt.internal.dnd.DragEvent");
});
