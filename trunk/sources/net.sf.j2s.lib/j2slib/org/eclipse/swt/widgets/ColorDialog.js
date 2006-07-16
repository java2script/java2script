Clazz.load(["$wt.widgets.Dialog"],"$wt.widgets.ColorDialog",null,function(){
c$=$_C(function(){
this.rgb=null;
$_Z(this,arguments);
},$wt.widgets,"ColorDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ColorDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.rgb;
});
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
});
