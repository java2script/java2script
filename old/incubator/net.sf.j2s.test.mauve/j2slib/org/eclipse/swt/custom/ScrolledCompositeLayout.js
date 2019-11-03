$_L(["$wt.widgets.Layout"],"$wt.custom.ScrolledCompositeLayout",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.inLayout=false;
$_Z(this,arguments);
},$wt.custom,"ScrolledCompositeLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var sc=composite;
if(sc.content==null){
var w=(wHint!=-1)?wHint:64;
var h=(hHint!=-1)?hHint:64;
return new $wt.graphics.Point(w,h);
}var size=sc.content.computeSize(wHint,hHint,flushCache);
if(sc.alwaysShowScroll){
var hBar=sc.getHorizontalBar();
var vBar=sc.getVerticalBar();
if(hBar!=null)size.y+=hBar.getSize().y;
if(vBar!=null)size.x+=vBar.getSize().x;
}return size;
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
if(this.inLayout)return;
var sc=composite;
if(sc.content==null)return;
this.inLayout=true;
var contentRect=sc.content.getBounds();
var hBar=sc.getHorizontalBar();
var vBar=sc.getVerticalBar();
if(!sc.alwaysShowScroll){
var hVisible=sc.needHScroll(contentRect,false);
var vVisible=sc.needVScroll(contentRect,hVisible);
if(!hVisible&&vVisible)hVisible=sc.needHScroll(contentRect,vVisible);
if(hBar!=null)hBar.setVisible(hVisible);
if(vBar!=null)vBar.setVisible(vVisible);
}var hostRect=sc.getClientArea();
if(sc.expandHorizontal){
contentRect.width=Math.max(sc.minWidth,hostRect.width);
}if(sc.expandVertical){
contentRect.height=Math.max(sc.minHeight,hostRect.height);
}if(hBar!=null){
hBar.setMaximum(contentRect.width);
hBar.setThumb(Math.min(contentRect.width,hostRect.width));
var hPage=contentRect.width-hostRect.width;
var hSelection=hBar.getSelection();
if(hSelection>=hPage){
if(hPage<=0){
hSelection=0;
hBar.setSelection(0);
}contentRect.x=-hSelection;
}}if(vBar!=null){
vBar.setMaximum(contentRect.height);
vBar.setThumb(Math.min(contentRect.height,hostRect.height));
var vPage=contentRect.height-hostRect.height;
var vSelection=vBar.getSelection();
if(vSelection>=vPage){
if(vPage<=0){
vSelection=0;
vBar.setSelection(0);
}contentRect.y=-vSelection;
}}sc.content.setBounds(contentRect);
this.inLayout=false;
},"$wt.widgets.Composite,~B");
$_S(c$,
"DEFAULT_WIDTH",64,
"DEFAULT_HEIGHT",64);
});
