$_L(["$wt.widgets.Layout"],"$wt.custom.CTabFolderLayout",["$wt.graphics.GC","$.Point"],function(){
c$=$_T($wt.custom,"CTabFolderLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var folder=composite;
var items=folder.items;
var tabW=0;
var gc=new $wt.graphics.GC(folder);
for(var i=0;i<items.length;i++){
if(folder.single){
tabW=Math.max(tabW,items[i].preferredWidth(gc,true,false));
}else{
tabW+=items[i].preferredWidth(gc,i==folder.selectedIndex,false);
}}
gc.dispose();
tabW+=3;
if(folder.showMax)tabW+=18;
if(folder.showMin)tabW+=18;
if(folder.single)tabW+=27;
if(folder.topRight!=null){
var pt=folder.topRight.computeSize(-1,folder.tabHeight,flushCache);
tabW+=3+pt.x;
}if(!folder.single&&!folder.simple)tabW+=folder.curveWidth-2*folder.curveIndent;
var controlW=0;
var controlH=0;
for(var i=0;i<items.length;i++){
var control=items[i].getControl();
if(control!=null&&!control.isDisposed()){
var size=control.computeSize(wHint,hHint,flushCache);
controlW=Math.max(controlW,size.x);
controlH=Math.max(controlH,size.y);
}}
var minWidth=Math.max(tabW,controlW);
var minHeight=(folder.minimized)?0:controlH;
if(minWidth==0)minWidth=64;
if(minHeight==0)minHeight=64;
if(wHint!=-1)minWidth=wHint;
if(hHint!=-1)minHeight=hHint;
return new $wt.graphics.Point(minWidth,minHeight);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var folder=composite;
if(folder.selectedIndex!=-1){
var control=folder.items[folder.selectedIndex].getControl();
if(control!=null&&!control.isDisposed()){
control.setBounds(folder.getClientArea());
}}},"$wt.widgets.Composite,~B");
});
