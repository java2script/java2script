$_L(["$wt.graphics.Resource"],"$wt.graphics.TextLayout",["$wt.graphics.Device","$.Point","$.Rectangle"],function(){
c$=$_C(function(){
this.font=null;
this.text=null;
this.segmentsText=null;
this.lineSpacing=0;
this.ascent=0;
this.descent=0;
this.alignment=0;
this.wrapWidth=0;
this.orientation=0;
this.tabs=null;
this.segments=null;
this.lineOffset=null;
this.lineY=null;
this.lineWidth=null;
this.mLangFontLink2=0;
$_Z(this,arguments);
},$wt.graphics,"TextLayout",$wt.graphics.Resource);
$_K(c$,
function(device){
$_R(this,$wt.graphics.TextLayout,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.wrapWidth=this.ascent=this.descent=-1;
this.lineSpacing=0;
this.orientation=33554432;
},"$wt.graphics.Device");
$_M(c$,"checkLayout",
function(){
});
$_V(c$,"dispose",
function(){
if(this.device==null)return;
this.freeRuns();
this.font=null;
this.text=null;
this.segmentsText=null;
this.tabs=null;
});
$_M(c$,"draw",
function(gc,x,y){
this.draw(gc,x,y,-1,-1,null,null);
},"$wt.graphics.GC,~N,~N");
$_M(c$,"draw",
function(gc,x,y,selectionStart,selectionEnd,selectionForeground,selectionBackground){
this.checkLayout();
},"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"freeRuns",
function(){
});
$_M(c$,"getAlignment",
function(){
this.checkLayout();
return this.alignment;
});
$_M(c$,"getAscent",
function(){
this.checkLayout();
return this.ascent;
});
$_M(c$,"getBounds",
function(){
this.checkLayout();
var width=0;
if(this.wrapWidth!=-1){
width=this.wrapWidth;
}else{
}return new $wt.graphics.Rectangle(0,0,width,this.lineY[this.lineY.length-1]);
});
$_M(c$,"getBounds",
function(start,end){
this.checkLayout();
var length=this.text.length;
if(length==0)return new $wt.graphics.Rectangle(0,0,0,0);
if(start>end)return new $wt.graphics.Rectangle(0,0,0,0);
start=Math.min(Math.max(0,start),length-1);
end=Math.min(Math.max(0,end),length-1);
start=this.translateOffset(start);
end=this.translateOffset(end);
var left=0x7fffffff;
var right=0;
var top=0x7fffffff;
var bottom=0;
var lineIndex=0;
var isRTL=(this.orientation&67108864)!=0;
return new $wt.graphics.Rectangle(left,top,right-left,bottom-top);
},"~N,~N");
$_M(c$,"getDescent",
function(){
this.checkLayout();
return this.descent;
});
$_M(c$,"getFont",
function(){
this.checkLayout();
return this.font;
});
$_M(c$,"getLevel",
function(offset){
this.checkLayout();
return(this.orientation&67108864)!=0?1:0;
},"~N");
$_M(c$,"getLineBounds",
function(lineIndex){
this.checkLayout();
var x=0;
var y=this.lineY[lineIndex];
var width=this.lineWidth[lineIndex];
var height=this.lineY[lineIndex+1]-y;
if(this.wrapWidth!=-1){
switch(this.alignment){
case 16777216:
x=Math.floor((this.wrapWidth-width)/2);
break;
case 131072:
x=this.wrapWidth-width;
break;
}
}return new $wt.graphics.Rectangle(x,y,width,height);
},"~N");
$_M(c$,"getLineCount",
function(){
this.checkLayout();
return 0;
});
$_M(c$,"getLineIndex",
function(offset){
this.checkLayout();
return 0;
},"~N");
$_M(c$,"getLineMetrics",
function(lineIndex){
this.checkLayout();
return null;
},"~N");
$_M(c$,"getLineOffsets",
function(){
this.checkLayout();
var offsets=$_A(this.lineOffset.length,0);
for(var i=0;i<offsets.length;i++){
offsets[i]=this.untranslateOffset(this.lineOffset[i]);
}
return offsets;
});
$_M(c$,"getLocation",
function(offset,trailing){
this.checkLayout();
return new $wt.graphics.Point(0,0);
},"~N,~B");
$_M(c$,"getNextOffset",
function(offset,movement){
this.checkLayout();
return this._getOffset(offset,movement,true);
},"~N,~N");
$_M(c$,"_getOffset",
function(offset,movement,forward){
return 0;
},"~N,~N,~B");
$_M(c$,"getOffset",
function(point,trailing){
this.checkLayout();
return this.getOffset(point.x,point.y,trailing);
},"$wt.graphics.Point,~A");
$_M(c$,"getOffset",
function(x,y,trailing){
this.checkLayout();
return 0;
},"~N,~N,~A");
$_M(c$,"getOrientation",
function(){
this.checkLayout();
return this.orientation;
});
$_M(c$,"getPreviousOffset",
function(offset,movement){
this.checkLayout();
return this._getOffset(offset,movement,false);
},"~N,~N");
$_M(c$,"getSegments",
function(){
this.checkLayout();
return this.segments;
});
$_M(c$,"getSegmentsText",
function(){
if(this.segments==null)return this.text;
var nSegments=this.segments.length;
if(nSegments<=1)return this.text;
var length=this.text.length;
if(length==0)return this.text;
if(nSegments==2){
if(this.segments[0]==0&&this.segments[1]==length)return this.text;
}var oldChars=$_A(length,'\0');
this.text.getChars(0,length,oldChars,0);
var newChars=$_A(length+nSegments,'\0');
var charCount=0;
var segmentCount=0;
var separator=this.orientation==67108864?'\u200f' : '\u200e';
while(charCount<length){
if(segmentCount<nSegments&&charCount==this.segments[segmentCount]){
newChars[charCount+segmentCount++]=separator;
}else{
newChars[charCount+segmentCount]=oldChars[charCount++];
}}
if(segmentCount<nSegments){
this.segments[segmentCount]=charCount;
newChars[charCount+segmentCount++]=separator;
}return String.instantialize(newChars,0,Math.min(charCount+segmentCount,newChars.length));
});
$_M(c$,"getSpacing",
function(){
this.checkLayout();
return this.lineSpacing;
});
$_M(c$,"getStyle",
function(offset){
this.checkLayout();
var length=this.text.length;
return null;
},"~N");
$_M(c$,"getTabs",
function(){
this.checkLayout();
return this.tabs;
});
$_M(c$,"getText",
function(){
this.checkLayout();
return this.text;
});
$_M(c$,"getWidth",
function(){
this.checkLayout();
return this.wrapWidth;
});
$_V(c$,"isDisposed",
function(){
return this.device==null;
});
$_M(c$,"setAlignment",
function(alignment){
this.checkLayout();
var mask=16924672;
alignment&=mask;
if(alignment==0)return;
if((alignment&16384)!=0)alignment=16384;
if((alignment&131072)!=0)alignment=131072;
this.alignment=alignment;
},"~N");
$_M(c$,"setAscent",
function(ascent){
this.checkLayout();
if(this.ascent==ascent)return;
this.freeRuns();
this.ascent=ascent;
},"~N");
$_M(c$,"setDescent",
function(descent){
this.checkLayout();
if(this.descent==descent)return;
this.freeRuns();
this.descent=descent;
},"~N");
$_M(c$,"setFont",
function(font){
this.checkLayout();
if(this.font===font)return;
if(font!=null&&font.equals(this.font))return;
this.freeRuns();
this.font=font;
},"$wt.graphics.Font");
$_M(c$,"setOrientation",
function(orientation){
this.checkLayout();
var mask=100663296;
orientation&=mask;
if(orientation==0)return;
if((orientation&33554432)!=0)orientation=33554432;
if(this.orientation==orientation)return;
this.orientation=orientation;
this.freeRuns();
},"~N");
$_M(c$,"setSegments",
function(segments){
this.checkLayout();
if(this.segments==null&&segments==null)return;
if(this.segments!=null&&segments!=null){
if(this.segments.length==segments.length){
var i;
for(i=0;i<segments.length;i++){
if(this.segments[i]!=segments[i])break;
}
if(i==segments.length)return;
}}this.freeRuns();
this.segments=segments;
},"~A");
$_M(c$,"setSpacing",
function(spacing){
this.checkLayout();
if(this.lineSpacing==spacing)return;
this.freeRuns();
this.lineSpacing=spacing;
},"~N");
$_M(c$,"setStyle",
function(style,start,end){
this.checkLayout();
var length=this.text.length;
if(length==0)return;
if(start>end)return;
start=Math.min(Math.max(0,start),length-1);
end=Math.min(Math.max(0,end),length-1);
var low=-1;
},"$wt.graphics.TextStyle,~N,~N");
$_M(c$,"setTabs",
function(tabs){
this.checkLayout();
if(this.tabs==null&&tabs==null)return;
if(this.tabs!=null&&tabs!=null){
if(this.tabs.length==tabs.length){
var i;
for(i=0;i<tabs.length;i++){
if(this.tabs[i]!=tabs[i])break;
}
if(i==tabs.length)return;
}}this.freeRuns();
this.tabs=tabs;
},"~A");
$_M(c$,"setText",
function(text){
this.checkLayout();
if(text.equals(this.text))return;
this.freeRuns();
this.text=text;
},"~S");
$_M(c$,"setWidth",
function(width){
this.checkLayout();
if(this.wrapWidth==width)return;
this.freeRuns();
this.wrapWidth=width;
},"~N");
$_V(c$,"toString",
function(){
if(this.isDisposed())return"TextLayout {*DISPOSED*}";
return"TextLayout {}";
});
$_M(c$,"translateOffset",
function(offset){
if(this.segments==null)return offset;
var nSegments=this.segments.length;
if(nSegments<=1)return offset;
var length=this.text.length;
if(length==0)return offset;
if(nSegments==2){
if(this.segments[0]==0&&this.segments[1]==length)return offset;
}for(var i=0;i<nSegments&&offset-i>=this.segments[i];i++){
offset++;
}
return offset;
},"~N");
$_M(c$,"untranslateOffset",
function(offset){
if(this.segments==null)return offset;
var nSegments=this.segments.length;
if(nSegments<=1)return offset;
var length=this.text.length;
if(length==0)return offset;
if(nSegments==2){
if(this.segments[0]==0&&this.segments[1]==length)return offset;
}for(var i=0;i<nSegments&&offset>this.segments[i];i++){
offset--;
}
return offset;
},"~N");
$_S(c$,
"LTR_MARK",'\u200E',
"RTL_MARK",'\u200F',
"SCRIPT_VISATTR_SIZEOF",2,
"GOFFSET_SIZEOF",8);
});
