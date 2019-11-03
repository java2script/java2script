$_L(null,"$wt.layout.FillData",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.layout,"FillData");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(flushCache)this.flushCache();
if(wHint==-1&&hHint==-1){
if(this.defaultWidth==-1||this.defaultHeight==-1){
var size=control.computeSize(wHint,hHint,flushCache);
this.defaultWidth=size.x;
this.defaultHeight=size.y;
}return new $wt.graphics.Point(this.defaultWidth,this.defaultHeight);
}if(this.currentWidth==-1||this.currentHeight==-1||wHint!=this.currentWhint||hHint!=this.currentHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.currentWhint=wHint;
this.currentHhint=hHint;
this.currentWidth=size.x;
this.currentHeight=size.y;
}return new $wt.graphics.Point(this.currentWidth,this.currentHeight);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
});
