$_L(null,"$wt.internal.browser.Popup",["$wt.graphics.Rectangle"],function(){
c$=$_T($wt.internal.browser,"Popup");
c$.popupList=$_M(c$,"popupList",
function(bounds,rect,height){
if(height<=0){
return null;
}var x;
var y;
var w;
var h=height;
if(bounds==null){
if(rect==null){
x=y=0;
w=100;
}else{
x=rect.x;
y=rect.y+height;
w=rect.width;
}}else{
if(rect==null){
x=bounds.x+Math.floor(bounds.width/4);
y=bounds.y+Math.floor((bounds.height-height)/2);
w=Math.floor(bounds.width/2);
}else{
x=rect.x;
w=rect.width;
if(rect.y+rect.height+height>bounds.y+bounds.height){
if(rect.y-height>=bounds.y){
y=rect.y-height;
}else{
if(bounds.height<height){
y=bounds.y;
h=bounds.height;
}else{
if(Math.abs(bounds.y+bounds.height-height-rect.y)>Math.abs(bounds.y+height-rect.y-rect.height)){
y=bounds.y;
}else{
y=bounds.y+bounds.height-height;
}}}}else{
y=rect.y+rect.height;
}}}return new $wt.graphics.Rectangle(x,y,w,h);
},"$wt.graphics.Rectangle,$wt.graphics.Rectangle,~N");
c$.popupMenu=$_M(c$,"popupMenu",
function(bounds,rect,width,height,preferredDirection){
if(height<=0||width<=0){
return null;
}var x;
var y;
var w=width;
var h=height;
if(bounds==null){
if(rect==null){
x=y=0;
}else{
x=rect.x;
y=rect.y+height;
}}else{
if(rect==null){
x=bounds.x+Math.floor(bounds.width/4);
y=bounds.y+Math.floor((bounds.height-height)/2);
}else{
if(rect.y+rect.height+height>bounds.y+bounds.height){
if(rect.y-height>=bounds.y){
y=rect.y-height;
}else{
if(bounds.height<height){
y=bounds.y;
h=bounds.height;
}else{
if(Math.abs(bounds.y+bounds.height-height-rect.y)>Math.abs(bounds.y+height-rect.y-rect.height)){
y=bounds.y;
}else{
y=bounds.y+bounds.height-height;
}}}}else{
y=rect.y+rect.height;
}if(rect.x+rect.width+width>bounds.x+bounds.width){
if(rect.x-width>=bounds.x){
x=rect.x-width;
}else{
if(bounds.width<width){
x=bounds.x;
w=bounds.width;
}else{
if(Math.abs(bounds.x+bounds.width-width-rect.x)>Math.abs(bounds.x+width-rect.x-rect.width)){
x=bounds.x;
}else{
x=bounds.x+bounds.width-width;
}}}}else{
x=rect.x;
}}}return new $wt.graphics.Rectangle(x,y,w,h);
},"$wt.graphics.Rectangle,$wt.graphics.Rectangle,~N,~N,~N");
});
