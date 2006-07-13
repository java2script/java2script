Clazz.load(["$wt.internal.CloneableCompatibility"],"$wt.graphics.ImageData",["$wt.SWT"],function(){
c$=$_C(function(){
this.width=0;
this.height=0;
this.depth=0;
this.scanlinePad=0;
this.bytesPerLine=0;
this.data=null;
this.palette=null;
this.transparentPixel=0;
this.maskData=null;
this.maskPad=0;
this.alphaData=null;
this.alpha=0;
this.type=0;
this.x=0;
this.y=0;
this.disposalMethod=0;
this.url=null;
this.delayTime=0;
$_Z(this,arguments);
},$wt.graphics,"ImageData",null,$wt.internal.CloneableCompatibility);
$_K(c$,
function(width,height,depth,palette){
this.construct(width,height,depth,palette,4,null,0,null,null,-1,-1,-1,0,0,0,0);
},"~N,~N,~N,$wt.graphics.PaletteData");
$_K(c$,
function(width,height,depth,palette,scanlinePad,data){
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A");
$_K(c$,
function(stream){
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"java.io.InputStream");
$_K(c$,
function(filename){
this.url=filename;
},"~S");
$_K(c$,
function(){
});
$_K(c$,
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
var bytesPerLine=Math.floor(((Math.floor((width*depth+7)/ 8)) + (scanlinePad - 1)) /scanlinePad)*scanlinePad;
this.setAllFields(width,height,depth,scanlinePad,bytesPerLine,data!=null?data:$_A(bytesPerLine*height,0),palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"setAllFields",
function(width,height,depth,scanlinePad,bytesPerLine,data,palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime){
this.width=width;
this.height=height;
this.depth=depth;
this.scanlinePad=scanlinePad;
this.bytesPerLine=bytesPerLine;
this.data=data;
this.palette=palette;
this.transparentPixel=transparentPixel;
this.maskData=maskData;
this.maskPad=maskPad;
this.alphaData=alphaData;
this.alpha=alpha;
this.type=type;
this.x=x;
this.y=y;
this.disposalMethod=disposalMethod;
this.delayTime=delayTime;
},"~N,~N,~N,~N,~N,~A,$wt.graphics.PaletteData,~N,~A,~N,~A,~N,~N,~N,~N,~N,~N");
c$.internal_new=$_M(c$,"internal_new",
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
return new $wt.graphics.ImageData(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_V(c$,"clone",
function(){
var cloneData=$_A(this.data.length,0);
System.arraycopy(this.data,0,cloneData,0,this.data.length);
var cloneMaskData=null;
if(this.maskData!=null){
cloneMaskData=$_A(this.maskData.length,0);
System.arraycopy(this.maskData,0,cloneMaskData,0,this.maskData.length);
}var cloneAlphaData=null;
if(this.alphaData!=null){
cloneAlphaData=$_A(this.alphaData.length,0);
System.arraycopy(this.alphaData,0,cloneAlphaData,0,this.alphaData.length);
}return new $wt.graphics.ImageData(this.width,this.height,this.depth,this.palette,this.scanlinePad,cloneData,this.maskPad,cloneMaskData,cloneAlphaData,this.alpha,this.transparentPixel,this.type,this.x,this.y,this.disposalMethod,this.delayTime);
});
$_M(c$,"getAlpha",
function(x,y){
if(this.alphaData==null)return 255;
return this.alphaData[y*this.width+x]&0xFF;
},"~N,~N");
$_M(c$,"getAlphas",
function(x,y,getWidth,alphas,startIndex){
if(getWidth==0)return;
if(this.alphaData==null){
var endIndex=startIndex+getWidth;
for(var i=startIndex;i<endIndex;i++){
alphas[i]=parseInt(255);
}
return;
}System.arraycopy(this.alphaData,y*this.width+x,alphas,startIndex,getWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixel",
function(x,y){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
mask=1<<(7-(x&0x7));
if((theByte&mask)==0){
return 0;
}else{
return 1;
}}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset=3-(x%4);
mask=3<<(offset*2);
return(theByte&mask)>>(offset*2);
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
theByte=this.data[index]&0xFF;
if((x&0x1)==0){
return theByte>>4;
}else{
return theByte&0x0F;
}}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
return this.data[index]&0xFF;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
return((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
return((this.data[index]&0xFF)<<16)+((this.data[index+1]&0xFF)<<8)+(this.data[index+2]&0xFF);
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
return((this.data[index]&0xFF)<<24)+((this.data[index+1]&0xFF)<<16)+((this.data[index+2]&0xFF)<<8)+(this.data[index+3]&0xFF);
}$WT.error(38);
return 0;
},"~N,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask=0;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index];
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index]&0xFF;
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=2;
}}
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<16)|((this.data[index+1]&0xFF)<<8)|(this.data[index+2]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=3;
}}
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
i=startIndex;
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<24)|((this.data[index+1]&0xFF)<<16)|((this.data[index+2]&0xFF)<<8)|(this.data[index+3]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=4;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getRGBs",
function(){
return this.palette.getRGBs();
});
$_M(c$,"getTransparencyMask",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_M(c$,"getTransparencyType",
function(){
if(this.maskData!=null)return 2;
if(this.transparentPixel!=-1)return 4;
if(this.alphaData!=null)return 1;
return 0;
});
$_M(c$,"scaledTo",
function(width,height){
return null;
},"~N,~N");
$_M(c$,"setAlpha",
function(x,y,alpha){
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
this.alphaData[y*this.width+x]=parseInt(alpha);
},"~N,~N,~N");
$_M(c$,"setAlphas",
function(x,y,putWidth,alphas,startIndex){
if(putWidth==0)return;
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
System.arraycopy(alphas,startIndex,this.alphaData,y*this.width+x,putWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixel",
function(x,y,pixelValue){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index];
mask=1<<(7-(x&0x7));
if((pixelValue&0x1)==1){
this.data[index]=parseInt((theByte|mask));
}else{
this.data[index]=parseInt((theByte&(mask^-1)));
}return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index];
var offset=3-(x%4);
mask=0xFF^(3<<(offset*2));
this.data[index]=parseInt(((this.data[index]&mask)|(pixelValue<<(offset*2))));
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==0){
this.data[index]=parseInt(((this.data[index]&0x0F)|((pixelValue&0x0F)<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|(pixelValue&0x0F)));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
this.data[index]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+2]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
this.data[index]=parseInt(((pixelValue>>24)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+2]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+3]=parseInt((pixelValue&0xFF));
return;
}$WT.error(38);
},"~N,~N,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
if(putWidth==0)return;
var index;
var theByte;
var mask;
var n=putWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
while(n>0){
mask=1<<(7-(srcX&0x7));
if((pixels[i]&0x1)==1){
this.data[index]=parseInt(((this.data[index]&0xFF)|mask));
}else{
this.data[index]=parseInt(((this.data[index]&0xFF)&(mask^-1)));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
if(mask==1){
index++;
}}}
return;
}if(this.depth==2){
var masks=[parseInt(0xFC),parseInt(0xF3),parseInt(0xCF),parseInt(0x3F)];
index=(y*this.bytesPerLine)+(x>>2);
var offset=3-(x%4);
while(n>0){
theByte=pixels[i]&0x3;
this.data[index]=parseInt(((this.data[index]&masks[offset])|(theByte<<(offset*2))));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
offset=0;
srcX=0;
}else{
if(offset==0){
index++;
offset=3;
}else{
offset--;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
var high=(x&0x1)==0;
while(n>0){
theByte=pixels[i]&0x0F;
if(high){
this.data[index]=parseInt(((this.data[index]&0x0F)|(theByte<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|theByte));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
high=true;
srcX=0;
}else{
if(!high)index++;
high=!high;
}}
return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<putWidth;j++){
this.data[index]=parseInt((pixels[i]&0xFF));
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
});
