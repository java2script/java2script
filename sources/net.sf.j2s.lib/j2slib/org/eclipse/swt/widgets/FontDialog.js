$_L(["$wt.widgets.Dialog"],"$wt.widgets.FontDialog",["$wt.graphics.FontData"],function(){
c$=$_C(function(){
this.fontData=null;
this.rgb=null;
$_Z(this,arguments);
},$wt.widgets,"FontDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.FontDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getFontData",
function(){
return this.fontData;
});
$_M(c$,"getFontList",
function(){
if(this.fontData==null)return null;
var result=new Array(1);
result[0]=this.fontData;
return result;
});
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.fontData;
});
$_M(c$,"setFontData",
function(fontData){
this.fontData=fontData;
},"$wt.graphics.FontData");
$_M(c$,"setFontList",
function(fontData){
if(fontData!=null&&fontData.length>0){
this.fontData=fontData[0];
}else{
this.fontData=null;
}},"~A");
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
});
