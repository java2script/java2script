$_L(["$wt.custom.StyledTextRenderer"],"$wt.custom.PrintRenderer",["$wt.custom.StyledTextEvent","$.WrappedContent","$wt.graphics.Point"],function(){
c$=$_C(function(){
this.logicalContent=null;
this.content=null;
this.clientArea=null;
this.gc=null;
this.lineBackgrounds=null;
this.lineStyles=null;
this.bidiSegments=null;
$_Z(this,arguments);
},$wt.custom,"PrintRenderer",$wt.custom.StyledTextRenderer);
$_K(c$,
function(device,regularFont,gc,logicalContent,lineBackgrounds,lineStyles,bidiSegments,tabLength,clientArea){
$_R(this,$wt.custom.PrintRenderer,[device,regularFont]);
this.logicalContent=logicalContent;
this.lineBackgrounds=lineBackgrounds;
this.lineStyles=lineStyles;
this.bidiSegments=bidiSegments;
this.clientArea=clientArea;
this.gc=gc;
this.calculateLineHeight();
this.setTabLength(tabLength);
this.content=new $wt.custom.WrappedContent(this,logicalContent);
this.content.wrapLines();
},"$wt.graphics.Device,$wt.graphics.Font,$wt.graphics.GC,$wt.custom.StyledTextContent,java.util.Hashtable,java.util.Hashtable,java.util.Hashtable,~N,$wt.graphics.Rectangle");
$_M(c$,"dispose",
function(){
this.content=null;
$_U(this,$wt.custom.PrintRenderer,"dispose",[]);
});
$_V(c$,"disposeGC",
function(gc){
},"$wt.graphics.GC");
$_V(c$,"drawLineBreakSelection",
function(line,lineOffset,paintX,paintY,gc){
},"~S,~N,~N,~N,$wt.graphics.GC");
$_V(c$,"getBidiSegments",
function(lineOffset,lineText){
var lineLength=lineText.length;
var logicalLineOffset=this.getLogicalLineOffset(lineOffset);
var segments=this.bidiSegments.get(new Integer(logicalLineOffset));
if(segments==null){
segments=[0,lineLength];
}else{
var logicalLineIndex=this.logicalContent.getLineAtOffset(lineOffset);
var logicalLineLength=this.logicalContent.getLine(logicalLineIndex).length;
if(lineOffset!=logicalLineOffset||lineLength!=logicalLineLength){
var lineOffsetDelta=lineOffset-logicalLineOffset;
var newSegmentCount=0;
var newSegments=$_A(segments.length,0);
for(var i=0;i<segments.length;i++){
newSegments[i]=Math.max(0,segments[i]-lineOffsetDelta);
if(newSegments[i]>lineLength){
newSegments[i]=lineLength;
newSegmentCount++;
break;
}if(i==0||newSegments[i]>0){
newSegmentCount++;
}}
segments=$_A(newSegmentCount,0);
for(var i=0,newIndex=0;i<newSegments.length&&newIndex<newSegmentCount;i++){
if(i==0||newSegments[i]>0){
segments[newIndex++]=newSegments[i];
}}
}}return segments;
},"~N,~S");
$_V(c$,"getClientArea",
function(){
return this.clientArea;
});
$_V(c$,"getContent",
function(){
return this.content;
});
$_V(c$,"getGC",
function(){
return this.gc;
});
$_V(c$,"getHorizontalPixel",
function(){
return 0;
});
$_M(c$,"getLogicalLineOffset",
($fz=function(visualLineOffset){
var logicalLineIndex=this.logicalContent.getLineAtOffset(visualLineOffset);
return this.logicalContent.getOffsetAtLine(logicalLineIndex);
},$fz.isPrivate=true,$fz),"~N");
$_V(c$,"getOrientation",
function(){
var mask=100663296;
return this.gc.getStyle()&mask;
});
$_V(c$,"getSelectionBackground",
function(){
return null;
});
$_V(c$,"getSelectionForeground",
function(){
return null;
});
$_V(c$,"getLineBackgroundData",
function(lineOffset,line){
var logicalLineOffset=this.getLogicalLineOffset(lineOffset);
return this.lineBackgrounds.get(new Integer(logicalLineOffset));
},"~N,~S");
$_M(c$,"getLineStyleData",
function(lineOffset,line){
var logicalLineOffset=this.getLogicalLineOffset(lineOffset);
var logicalLineEvent=this.lineStyles.get(new Integer(logicalLineOffset));
if(logicalLineEvent!=null){
var clone=new $wt.custom.StyledTextEvent(logicalLineEvent.data);
clone.detail=logicalLineEvent.detail;
clone.styles=logicalLineEvent.styles;
clone.text=logicalLineEvent.text;
logicalLineEvent=this.getLineStyleData(clone,lineOffset,line);
}return logicalLineEvent;
},"~N,~S");
$_V(c$,"getSelection",
function(){
return new $wt.graphics.Point(0,0);
});
$_V(c$,"getWordWrap",
function(){
return true;
});
$_V(c$,"isFullLineSelection",
function(){
return false;
});
});
