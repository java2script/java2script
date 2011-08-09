$_L(null,"$wt.widgets.ImageList",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.handle=0;
this.style=0;
this.refCount=0;
this.images=null;
$_Z(this,arguments);
},$wt.widgets,"ImageList");
$_K(c$,
function(style){
this.style=style;
this.images=new Array(4);
},"~N");
$_M(c$,"add",
function(image){
var count=this.images.length;
var index=0;
while(index<count){
if(this.images[index]!=null){
if(this.images[index].isDisposed())this.images[index]=null;
}if(this.images[index]==null)break;
index++;
}
if(count==0){
}this.set(index,image,count);
if(index==this.images.length){
var newImages=new Array(this.images.length+4);
System.arraycopy(this.images,0,newImages,0,this.images.length);
this.images=newImages;
}this.images[index]=image;
return index;
},"$wt.graphics.Image");
$_M(c$,"addRef",
function(){
return++this.refCount;
});
$_M(c$,"dispose",
function(){
this.handle=0;
this.images=null;
});
$_M(c$,"get",
function(index){
return this.images[index];
},"~N");
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"getHandle",
function(){
return this.handle;
});
$_M(c$,"getImageSize",
function(){
var cx=$_A(1,0);
var cy=$_A(1,0);
return new $wt.graphics.Point(cx[0],cy[0]);
});
$_M(c$,"indexOf",
function(image){
var count=this.images.length;
for(var i=0;i<count;i++){
if(this.images[i]!=null){
if(this.images[i].isDisposed())this.images[i]=null;
if(this.images[i]!=null&&this.images[i].equals(image))return i;
}}
return-1;
},"$wt.graphics.Image");
$_M(c$,"put",
function(index,image){
var count=this.images.length;
if(!(0<=index&&index<count))return;
if(image!=null)this.set(index,image,count);
this.images[index]=image;
},"~N,$wt.graphics.Image");
$_M(c$,"remove",
function(index){
var count=this.images.length;
if(!(0<=index&&index<count))return;
System.arraycopy(this.images,index+1,this.images,index,--count-index);
this.images[index]=null;
},"~N");
$_M(c$,"removeRef",
function(){
return--this.refCount;
});
$_M(c$,"set",
function(index,image,count){
},"~N,$wt.graphics.Image,~N");
$_M(c$,"size",
function(){
var result=0;
var count=this.images.length;
for(var i=0;i<count;i++){
if(this.images[i]!=null){
if(this.images[i].isDisposed())this.images[i]=null;
if(this.images[i]!=null)result++;
}}
return result;
});
});
