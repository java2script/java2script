$_L(["$wt.custom.LineBackgroundListener","$.LineStyleListener"],"$wt.custom.DefaultLineStyler",["java.util.Vector","$wt.custom.StyleRange","$wt.graphics.Point","$wt.internal.Compatibility"],function(){
c$=$_C(function(){
this.content=null;
this.styles=null;
this.styleCount=0;
this.lineExpandExp=1;
this.lineCount=0;
this.lineBackgrounds=null;
$_Z(this,arguments);
},$wt.custom,"DefaultLineStyler",null,[$wt.custom.LineStyleListener,$wt.custom.LineBackgroundListener]);
$_Y(c$,function(){
this.styles=new Array(0);
});
$_K(c$,
function(content){
this.content=content;
this.lineCount=content.getLineCount();
this.lineBackgrounds=new Array(this.lineCount);
},"$wt.custom.StyledTextContent");
$_M(c$,"insertStyle",
function(style,index){
this.insertStyles([style],index);
},"$wt.custom.StyleRange,~N");
$_M(c$,"insertStyles",
function(insertStyles,index){
var size=this.styles.length;
var insertCount=insertStyles.length;
var spaceNeeded=this.styleCount+insertCount-size;
if(spaceNeeded>0){
var newStyles=new Array(size+spaceNeeded);
System.arraycopy(this.styles,0,newStyles,0,size);
this.styles=newStyles;
}System.arraycopy(this.styles,index,this.styles,index+insertCount,this.styleCount-index);
System.arraycopy(insertStyles,0,this.styles,index,insertCount);
this.styleCount=this.styleCount+insertCount;
},"~A,~N");
$_M(c$,"insertMergeStyle",
function(style,index){
if(this.mergeStyleBefore(style,index))return false;
if(this.mergeStyleAfter(style,index))return false;
this.insertStyle(style,index);
return true;
},"$wt.custom.StyleRange,~N");
$_M(c$,"mergeStyleBefore",
function(style,index){
if(index>0){
var previous=this.styles[index-1];
if(style.similarTo(previous)){
var previousEnd=previous.start+previous.length;
if((style.start<=previousEnd)&&(style.start>=previous.start)){
var styleEnd=style.start+style.length;
if((index==this.styleCount)||(styleEnd<=this.styles[index].start)){
previous.length=style.start+style.length-previous.start;
return true;
}}}}return false;
},"$wt.custom.StyleRange,~N");
$_M(c$,"mergeStyleAfter",
function(style,index){
if(index<this.styleCount){
var next=this.styles[index];
if(style.similarTo(next)){
var styleEnd=style.start+style.length;
var nextEnd=next.start+next.length;
if((styleEnd<=nextEnd)&&(styleEnd>=next.start)){
if((index==0)||(style.start>=this.styles[index-1].start+this.styles[index-1].length)){
next.length=next.start+next.length-style.start;
next.start=style.start;
return true;
}}}}return false;
},"$wt.custom.StyleRange,~N");
$_M(c$,"clearStyle",
function(clearStyle){
var pt=this.getOverlappingStyles(clearStyle.start,clearStyle.length);
var clearStyleEnd=clearStyle.start+clearStyle.length-1;
if((pt==null)||(pt.y==0))return;
var count=0;
var deleteStyle=-1;
var deleteCount=0;
for(var i=pt.x;count<pt.y;i++){
var overlap=this.styles[i];
var overlapEnd=overlap.start+overlap.length-1;
if(overlap.start<clearStyle.start){
if(overlapEnd<=clearStyleEnd){
overlap.length=clearStyle.start-overlap.start;
}else{
var endStyle=overlap.clone();
endStyle.start=clearStyleEnd+1;
endStyle.length=overlapEnd-clearStyleEnd;
overlap.length=clearStyle.start-overlap.start;
this.insertStyle(endStyle,i+1);
break;
}}else{
if(overlapEnd<=clearStyleEnd){
if(deleteStyle==-1){
deleteStyle=i;
}deleteCount++;
}else{
overlap.start=clearStyleEnd+1;
overlap.length=overlapEnd-overlap.start+1;
break;
}}count++;
}
this.deleteStyles(deleteStyle,deleteCount);
},"$wt.custom.StyleRange");
$_M(c$,"expandLinesBy",
function(numLines){
var size=this.lineBackgrounds.length;
if(size-this.lineCount>=numLines){
return;
}var newLines=new Array(size+Math.max($wt.internal.Compatibility.pow2(this.lineExpandExp),numLines));
System.arraycopy(this.lineBackgrounds,0,newLines,0,size);
this.lineBackgrounds=newLines;
this.lineExpandExp++;
},"~N");
$_M(c$,"deleteStyle",
function(index){
this.deleteStyles(index,1);
},"~N");
$_M(c$,"deleteStyles",
function(index,count){
if((count==0)||(index<0))return;
System.arraycopy(this.styles,index+count,this.styles,index,this.styleCount-(index+count));
for(var i=0;i<count;i++){
this.styles[this.styleCount-i-1]=null;
}
this.styleCount=this.styleCount-count;
},"~N,~N");
$_M(c$,"getStyleRanges",
function(){
var newStyles=new Array(this.styleCount);
System.arraycopy(this.styles,0,newStyles,0,this.styleCount);
return newStyles;
});
$_V(c$,"lineGetBackground",
function(event){
var lineIndex=this.content.getLineAtOffset(event.lineOffset);
event.lineBackground=this.lineBackgrounds[lineIndex];
},"$wt.custom.LineBackgroundEvent");
$_V(c$,"lineGetStyle",
function(event){
var lineStart=event.lineOffset;
var lineEnd=lineStart+event.lineText.length;
var high=this.searchForStyle(lineStart,lineEnd);
var style=null;
var lineStyles=new java.util.Vector();
for(var index=high;index<this.styleCount;index++){
style=this.styles[index];
if(style.start>lineEnd)break;
var styleEnd=style.start+style.length-1;
if(styleEnd>=lineStart)lineStyles.addElement(style);
}
event.styles=new Array(lineStyles.size());
lineStyles.copyInto(event.styles);
},"$wt.custom.LineStyleEvent");
$_M(c$,"searchForStyle",
function(start,end){
var high=this.styleCount;
var low=-1;
var index=high;
while(high-low>1){
index=Math.floor((high+low)/2);
var style=this.styles[index];
var styleEnd=style.start+style.length-1;
if(start<=style.start||end<=styleEnd||(start>style.start&&styleEnd>=start&&styleEnd<end)){
high=index;
}else{
low=index;
}}
return high;
},"~N,~N");
$_M(c$,"setLineBackground",
function(startLine,count,background){
for(var i=startLine;i<startLine+count;i++){
this.lineBackgrounds[i]=background;
}
},"~N,~N,$wt.graphics.Color");
$_M(c$,"setStyleRange",
function(newStyle){
if(newStyle==null){
this.styles=new Array(0);
this.styleCount=0;
return;
}if(newStyle.length==0)return;
if(newStyle.isUnstyled()){
this.clearStyle(newStyle);
return;
}var pt=this.getOverlappingStyles(newStyle.start,newStyle.length);
var newStyleEnd=newStyle.start+newStyle.length-1;
if(pt==null){
this.insertStyle(newStyle,0);
return;
}if(pt.y==0){
this.insertMergeStyle(newStyle,pt.x);
return;
}var added=false;
var count=0;
for(var i=pt.x;count<pt.y;i++){
var overlap=this.styles[i];
var overlapEnd=overlap.start+overlap.length-1;
if(overlap.start<newStyle.start){
if(overlapEnd<=newStyleEnd){
if(newStyle.similarTo(overlap)){
overlap.length=newStyle.start+newStyle.length-overlap.start;
}else{
overlap.length=newStyle.start-overlap.start;
if(this.mergeStyleAfter(newStyle,i+1))break;
this.insertStyle(newStyle,i+1);
i++;
}added=true;
}else{
if(newStyle.similarTo(overlap))break;
var endStyle=overlap.clone();
endStyle.start=newStyleEnd+1;
endStyle.length=overlapEnd-newStyleEnd;
overlap.length=newStyle.start-overlap.start;
this.insertStyle(newStyle,i+1);
i++;
this.insertStyle(endStyle,i+1);
break;
}}else{
if(overlapEnd<=newStyleEnd){
if(!added){
this.styles[i]=newStyle;
added=true;
}else{
this.deleteStyle(i);
i--;
}}else{
overlap.start=newStyleEnd+1;
overlap.length=overlapEnd-overlap.start+1;
if(!added){
this.insertMergeStyle(newStyle,i);
}break;
}}count++;
}
},"$wt.custom.StyleRange");
$_M(c$,"replaceStyleRanges",
function(start,length,ranges){
this.clearStyle(new $wt.custom.StyleRange(start,length,null,null));
var high=this.styleCount;
var low=-1;
var index=high;
while(high-low>1){
index=Math.floor((high+low)/2);
var style=this.styles[index];
if(start<=style.start){
high=index;
}else{
low=index;
}}
this.insertStyles(ranges,high);
},"~N,~N,~A");
$_M(c$,"setStyleRanges",
function(styles){
this.styles=new Array(styles.length);
System.arraycopy(styles,0,this.styles,0,styles.length);
this.styleCount=styles.length;
},"~A");
$_M(c$,"textChanging",
function(event){
var startLine=this.content.getLineAtOffset(event.start);
var startLineOffset=this.content.getOffsetAtLine(startLine);
this.textChanging(event.start,-event.replaceCharCount);
this.textChanging(event.start,event.newCharCount);
if(event.replaceCharCount==this.content.getCharCount()){
this.linesChanging(0,-this.lineCount);
this.linesChanging(0,this.content.getLineCount()-event.replaceLineCount+event.newLineCount);
return;
}if(event.start!=startLineOffset){
startLine=startLine+1;
}this.linesChanging(startLine,-event.replaceLineCount);
this.linesChanging(startLine,event.newLineCount);
},"$wt.custom.TextChangingEvent");
$_M(c$,"linesChanging",
function(start,delta){
if(delta==0)return;
var inserting=delta>0;
if(inserting){
this.expandLinesBy(delta);
for(var i=this.lineCount-1;i>=start;i--){
this.lineBackgrounds[i+delta]=this.lineBackgrounds[i];
}
for(var i=start;i<start+delta;i++){
this.lineBackgrounds[i]=null;
}
}else{
for(var i=start-delta;i<this.lineCount;i++){
this.lineBackgrounds[i+delta]=this.lineBackgrounds[i];
}
}this.lineCount+=delta;
},"~N,~N");
$_M(c$,"textChanging",
function(start,delta){
if(delta==0)return;
var style;
var end;
var deleteStart=-1;
var deleteCount=0;
var inserting=delta>0;
if(inserting){
end=(start+delta)-1;
}else{
end=(start-delta)-1;
}var high=this.searchForStyle(start,end);
var index;
for(index=high;index<this.styleCount;index++){
style=this.styles[index];
if(inserting){
if(style.start>=start)break;
var beforeStyle=style.clone();
beforeStyle.length=start-style.start;
style.start=start;
style.length=style.length-beforeStyle.length;
if(beforeStyle.length!=0)this.insertStyle(beforeStyle,index);
index++;
break;
}else{
var styleEnd=style.start+style.length-1;
if(style.start>end)break;
if(style.start<start){
if(styleEnd<=end){
style.length=start-style.start;
}else{
style.length=style.length+delta;
index++;
break;
}}else{
if(styleEnd<=end){
if(deleteStart==-1){
deleteStart=index;
}deleteCount++;
}else{
style.start=start;
style.length=styleEnd-end;
index++;
break;
}}}}
this.deleteStyles(deleteStart,deleteCount);
for(var i=index-deleteCount;i<this.styleCount;i++){
style=this.styles[i];
style.start=style.start+delta;
}
},"~N,~N");
$_M(c$,"getOverlappingStyles",
function(start,length){
var style;
if(this.styleCount==0)return null;
var end=start+length-1;
var high=this.searchForStyle(start,end);
var count=0;
for(var index=high;index<this.styleCount;index++){
style=this.styles[index];
var styleEnd=style.start+style.length-1;
if(style.start>end)break;
if(styleEnd>=start)count++;
}
return new $wt.graphics.Point(high,count);
},"~N,~N");
$_M(c$,"getLineBackground",
function(index){
return this.lineBackgrounds[index];
},"~N");
$_M(c$,"getStyleRangeAtOffset",
function(offset){
if(this.styleCount==0)return null;
var pt=this.getOverlappingStyles(offset,1);
if(pt==null||pt.y==0)return null;
var newStyle=this.styles[pt.x].clone();
newStyle.start=offset;
newStyle.length=1;
return newStyle;
},"~N");
$_M(c$,"getStyleRangesFor",
function(offset,length){
if(this.styleCount==0)return null;
var pt=this.getOverlappingStyles(offset,length);
if(pt==null||pt.y==0)return null;
var ranges=new Array(pt.y);
for(var i=0;i<pt.y;i++){
var newStyle=this.styles[pt.x+i];
ranges[i]=newStyle;
}
return ranges;
},"~N,~N");
$_M(c$,"release",
function(){
this.styles=null;
});
});
