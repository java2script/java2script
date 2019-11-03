$_L(null,"$wt.graphics.ImageLoader",["java.util.Vector","$wt.graphics.ImageData"],function(){
c$=$_C(function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=0;
this.repeatCount=0;
this.imageLoaderListeners=null;
$_Z(this,arguments);
},$wt.graphics,"ImageLoader");
$_K(c$,
function(){
this.reset();
});
$_M(c$,"reset",
function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=-1;
this.repeatCount=1;
});
$_M(c$,"load",
function(stream){
this.reset();
this.data=[new $wt.graphics.ImageData(stream)];
return this.data;
},"java.io.InputStream");
$_M(c$,"load",
function(filename){
this.reset();
this.data=[new $wt.graphics.ImageData(filename)];
return this.data;
},"~S");
$_M(c$,"save",
function(stream,format){
},"java.io.OutputStream,~N");
$_M(c$,"save",
function(filename,format){
},"~S,~N");
$_M(c$,"addImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null){
this.imageLoaderListeners=new java.util.Vector();
}this.imageLoaderListeners.addElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"removeImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null)return;
this.imageLoaderListeners.removeElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"hasListeners",
function(){
return this.imageLoaderListeners!=null&&this.imageLoaderListeners.size()>0;
});
$_M(c$,"notifyListeners",
function(event){
if(!this.hasListeners())return;
var size=this.imageLoaderListeners.size();
for(var i=0;i<size;i++){
var listener=this.imageLoaderListeners.elementAt(i);
listener.imageDataLoaded(event);
}
},"$wt.graphics.ImageLoaderEvent");
});
