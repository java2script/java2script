$_L(["$wt.widgets.Layout"],"$wt.custom.SashFormLayout",["$wt.custom.SashFormData","$wt.graphics.Point","$wt.widgets.Sash"],function(){
c$=$_T($wt.custom,"SashFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var sashForm=composite;
var cArray=sashForm.getControls(true);
var width=0;
var height=0;
if(cArray.length==0){
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
}var vertical=sashForm.getOrientation()==512;
var maxIndex=0;
var maxValue=0;
for(var i=0;i<cArray.length;i++){
if(vertical){
var size=cArray[i].computeSize(wHint,-1,flushCache);
if(size.y>maxValue){
maxIndex=i;
maxValue=size.y;
}width=Math.max(width,size.x);
}else{
var size=cArray[i].computeSize(-1,hHint,flushCache);
if(size.x>maxValue){
maxIndex=i;
maxValue=size.x;
}height=Math.max(height,size.y);
}}
var ratios=$_A(cArray.length,0);
var total=0;
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
cArray[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
if(ratios[maxIndex]>0){
var sashwidth=sashForm.sashes.length>0?sashForm.SASH_WIDTH+sashForm.sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(vertical){
height+=(Math.floor(total*maxValue/ratios[maxIndex]))+(cArray.length-1)*sashwidth;
}else{
width+=(Math.floor(total*maxValue/ratios[maxIndex]))+(cArray.length-1)*sashwidth;
}}width+=sashForm.getBorderWidth()*2;
height+=sashForm.getBorderWidth()*2;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var sashForm=composite;
var area=sashForm.getClientArea();
if(area.width<=1||area.height<=1)return;
var newControls=sashForm.getControls(true);
if(sashForm.controls.length==0&&newControls.length==0)return;
sashForm.controls=newControls;
var controls=sashForm.controls;
if(sashForm.maxControl!=null&&!sashForm.maxControl.isDisposed()){
for(var i=0;i<controls.length;i++){
if(controls[i]!==sashForm.maxControl){
controls[i].setBounds(-200,-200,0,0);
}else{
controls[i].setBounds(area);
}}
return;
}if(sashForm.sashes.length<controls.length-1){
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,sashForm.sashes.length);
for(var i=sashForm.sashes.length;i<newSashes.length;i++){
newSashes[i]=new $wt.widgets.Sash(sashForm,sashForm.sashStyle);
newSashes[i].setBackground(sashForm.$background);
newSashes[i].setForeground(sashForm.$foreground);
newSashes[i].addListener(13,sashForm.sashListener);
}
sashForm.sashes=newSashes;
}if(sashForm.sashes.length>controls.length-1){
if(controls.length==0){
for(var i=0;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=new Array(0);
}else{
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,newSashes.length);
for(var i=controls.length-1;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=newSashes;
}}if(controls.length==0)return;
var sashes=sashForm.sashes;
var ratios=$_A(controls.length,0);
var total=0;
for(var i=0;i<controls.length;i++){
var data=controls[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
controls[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
var sashwidth=sashes.length>0?sashForm.SASH_WIDTH+sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(sashForm.getOrientation()==256){
var width=(Math.floor(ratios[0]*(area.width-sashes.length*sashwidth)/total));
var x=area.x;
controls[0].setBounds(x,area.y,width,area.height);
x+=width;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=(Math.floor(ratios[i]*(area.width-sashes.length*sashwidth)/total));
controls[i].setBounds(x,area.y,width,area.height);
x+=width;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=area.width-x;
controls[controls.length-1].setBounds(x,area.y,width,area.height);
}}else{
var height=(Math.floor(ratios[0]*(area.height-sashes.length*sashwidth)/total));
var y=area.y;
controls[0].setBounds(area.x,y,area.width,height);
y+=height;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=(Math.floor(ratios[i]*(area.height-sashes.length*sashwidth)/total));
controls[i].setBounds(area.x,y,area.width,height);
y+=height;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=area.height-y;
controls[controls.length-1].setBounds(area.x,y,area.width,height);
}}},"$wt.widgets.Composite,~B");
});
