$_L(null,"$wt.graphics.PaletteData",["$wt.graphics.RGB"],function(){
c$=$_C(function(){
this.isDirect=false;
this.colors=null;
this.redMask=0;
this.greenMask=0;
this.blueMask=0;
this.redShift=0;
this.greenShift=0;
this.blueShift=0;
$_Z(this,arguments);
},$wt.graphics,"PaletteData");
$_K(c$,
function(colors){
this.colors=colors;
this.isDirect=false;
},"~A");
$_K(c$,
function(redMask,greenMask,blueMask){
this.redMask=redMask;
this.greenMask=greenMask;
this.blueMask=blueMask;
this.isDirect=true;
this.redShift=this.shiftForMask(redMask);
this.greenShift=this.shiftForMask(greenMask);
this.blueShift=this.shiftForMask(blueMask);
},"~N,~N,~N");
$_M(c$,"getPixel",
function(rgb){
if(this.isDirect){
var pixel=0;
pixel|=(this.redShift<0?rgb.red<<-this.redShift:rgb.red>>>this.redShift)&this.redMask;
pixel|=(this.greenShift<0?rgb.green<<-this.greenShift:rgb.green>>>this.greenShift)&this.greenMask;
pixel|=(this.blueShift<0?rgb.blue<<-this.blueShift:rgb.blue>>>this.blueShift)&this.blueMask;
return pixel;
}else{
for(var i=0;i<this.colors.length;i++){
if(this.colors[i].equals(rgb))return i;
}
{
}return 0;
}},"$wt.graphics.RGB");
$_M(c$,"getRGB",
function(pixel){
if(this.isDirect){
var r=pixel&this.redMask;
r=(this.redShift<0)?r>>>-this.redShift:r<<this.redShift;
var g=pixel&this.greenMask;
g=(this.greenShift<0)?g>>>-this.greenShift:g<<this.greenShift;
var b=pixel&this.blueMask;
b=(this.blueShift<0)?b>>>-this.blueShift:b<<this.blueShift;
return new $wt.graphics.RGB(r,g,b);
}else{
return this.colors[pixel];
}},"~N");
$_M(c$,"getRGBs",
function(){
return this.colors;
});
$_M(c$,"shiftForMask",
function(mask){
for(var i=31;i>=0;i--){
if(((mask>>i)&0x1)!=0)return 7-i;
}
return 32;
},"~N");
});
