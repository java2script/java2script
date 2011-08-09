$_L(["$wt.custom.StyledTextContent"],"$wt.custom.WrappedContent",null,function(){
c$=$_C(function(){
this.renderer=null;
this.logicalContent=null;
this.visualLines=null;
this.visualLineCount=0;
$_Z(this,arguments);
},$wt.custom,"WrappedContent",null,$wt.custom.StyledTextContent);
$_K(c$,
function(renderer,logicalContent){
this.renderer=renderer;
this.logicalContent=logicalContent;
},"$wt.custom.StyledTextRenderer,$wt.custom.StyledTextContent");
$_M(c$,"addTextChangeListener",
function(listener){
this.logicalContent.addTextChangeListener(listener);
},"$wt.custom.TextChangeListener");
$_M(c$,"ensureSize",
($fz=function(numLines){
var size=this.visualLines.length;
if(size>=numLines){
return;
}var newLines=$_A(Math.max(size*2,numLines),2,0);
System.arraycopy(this.visualLines,0,newLines,0,size);
this.visualLines=newLines;
this.resetVisualLines(size,this.visualLines.length-size);
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getCharCount",
function(){
return this.logicalContent.getCharCount();
});
$_M(c$,"getLine",
function(lineIndex){
var line;
if(this.visualLineCount==0){
line=this.logicalContent.getLine(lineIndex);
}else{
line=this.logicalContent.getTextRange(this.visualLines[lineIndex][0],this.visualLines[lineIndex][1]);
}return line;
},"~N");
$_M(c$,"getLineAtOffset",
function(offset){
var lastLine=this.visualLineCount-1;
var lastChar;
if(this.visualLineCount==0){
return this.logicalContent.getLineAtOffset(offset);
}lastChar=this.visualLines[lastLine][0]+this.visualLines[lastLine][1];
if(offset==lastChar){
return lastLine;
}var high=this.visualLineCount;
var low=-1;
var index=this.visualLineCount;
while(high-low>1){
index=Math.floor((high+low)/2);
var lineStart=this.visualLines[index][0];
if(offset>=lineStart){
var lineEnd=lineStart+this.visualLines[index][1];
low=index;
if(offset<=lineEnd){
break;
}}else{
high=index;
}}
if(low>0&&offset==this.visualLines[low-1][0]+this.visualLines[low-1][1]){
low--;
}return low;
},"~N");
$_M(c$,"getLineCount",
function(){
var lineCount=this.visualLineCount;
if(this.visualLineCount==0){
lineCount=this.logicalContent.getLineCount();
}return lineCount;
});
$_M(c$,"getLineDelimiter",
function(){
return this.logicalContent.getLineDelimiter();
});
$_M(c$,"getOffsetAtLine",
function(lineIndex){
var offset;
if(this.visualLineCount==0){
offset=this.logicalContent.getOffsetAtLine(lineIndex);
}else{
offset=this.visualLines[lineIndex][0];
}return offset;
},"~N");
$_M(c$,"getTextRange",
function(start,length){
return this.logicalContent.getTextRange(start,length);
},"~N,~N");
$_M(c$,"getVisualLineCount",
function(){
return this.visualLineCount;
});
$_M(c$,"removeTextChangeListener",
function(listener){
this.logicalContent.removeTextChangeListener(listener);
},"$wt.custom.TextChangeListener");
$_M(c$,"reset",
function(startLine,lineCount){
if(lineCount<=0||this.visualLineCount==0){
return;
}this.reset(startLine,lineCount,true);
},"~N,~N");
$_M(c$,"reset",
($fz=function(startLine,lineCount,wrap){
if(lineCount<=0){
return startLine;
}var visualFirstLineOffset=this.getOffsetAtLine(startLine);
var logicalFirstLine=this.logicalContent.getLineAtOffset(visualFirstLineOffset);
var logicalFirstLineOffset=this.logicalContent.getOffsetAtLine(logicalFirstLine);
var visualFirstLine=this.getLineAtOffset(logicalFirstLineOffset);
lineCount+=startLine-visualFirstLine;
startLine=visualFirstLine;
var lastLine=startLine+lineCount-1;
var lastLineEnd=this.visualLines[lastLine][0]+this.visualLines[lastLine][1];
var logicalEndLine=0;
while(lastLine<this.visualLineCount-1&&lastLineEnd==this.visualLines[lastLine+1][0]){
lastLine++;
lastLineEnd=this.visualLines[lastLine][0]+this.visualLines[lastLine][1];
}
if(wrap){
if(lastLine==this.visualLineCount-1){
logicalEndLine=this.logicalContent.getLineCount();
}else{
logicalEndLine=this.logicalContent.getLineAtOffset(this.visualLines[lastLine+1][0]);
}}lineCount=lastLine-startLine+1;
this.resetVisualLines(startLine,lineCount);
this.visualLineCount-=lineCount;
if(wrap){
this.wrapLineRange(logicalFirstLine,logicalEndLine,startLine);
}return startLine;
},$fz.isPrivate=true,$fz),"~N,~N,~B");
$_M(c$,"resetVisualLines",
($fz=function(startLine,lineCount){
var endLine=startLine+lineCount;
for(var i=startLine;i<endLine;i++){
this.visualLines[i]=[-1,-1];
}
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"replaceTextRange",
function(start,replaceLength,text){
this.logicalContent.replaceTextRange(start,replaceLength,text);
},"~N,~N,~S");
$_M(c$,"setText",
function(text){
this.logicalContent.setText(text);
},"~S");
$_M(c$,"setVisualLine",
($fz=function(visualLineIndex,visualLineOffset,visualLineLength){
this.ensureSize(this.visualLineCount+1);
if(this.visualLines[visualLineIndex][0]!=-1){
System.arraycopy(this.visualLines,visualLineIndex,this.visualLines,visualLineIndex+1,this.visualLineCount-visualLineIndex);
this.visualLines[visualLineIndex]=$_A(2,0);
}this.visualLines[visualLineIndex][0]=visualLineOffset;
this.visualLines[visualLineIndex][1]=visualLineLength;
this.visualLineCount++;
},$fz.isPrivate=true,$fz),"~N,~N,~N");
$_M(c$,"textChanged",
function(startOffset,newLineCount,replaceLineCount,newCharCount,replaceCharCount){
if(this.visualLineCount==0){
return;
}var logicalStartLine=this.logicalContent.getLineAtOffset(startOffset);
var visualStartLine=this.getLineAtOffset(startOffset);
var visualReplaceLastLine=this.visualLineCount-1;
var textChangeDelta=newCharCount-replaceCharCount;
if(replaceLineCount>0){
visualReplaceLastLine=this.getLineAtOffset(startOffset+replaceCharCount);
if((visualReplaceLastLine==0||this.visualLines[visualReplaceLastLine][0]==this.visualLines[visualReplaceLastLine-1][0]+this.visualLines[visualReplaceLastLine-1][1])&&visualReplaceLastLine!=this.visualLineCount-1){
visualReplaceLastLine++;
}visualStartLine=this.reset(visualStartLine,visualReplaceLastLine-visualStartLine+1,false);
}else{
visualStartLine=this.reset(visualStartLine,1,false);
}visualReplaceLastLine=this.wrapLineRange(logicalStartLine,logicalStartLine+1+newLineCount,visualStartLine);
for(var i=visualReplaceLastLine;i<this.visualLineCount;i++){
this.visualLines[i][0]+=textChangeDelta;
}
},"~N,~N,~N,~N,~N");
$_M(c$,"wrapLineRange",
($fz=function(startLine,endLine,visualLineIndex){
var emptyLineCount=0;
var width=this.renderer.getClientArea().width-this.renderer.getLeftMargin()-this.renderer.getRightMargin();
visualLineIndex=this.wrapLineRange(startLine,endLine,visualLineIndex,width);
for(var i=visualLineIndex;i<this.visualLines.length;i++,emptyLineCount++){
if(this.visualLines[i][0]!=-1){
break;
}}
if(emptyLineCount>0){
var copyLineCount=this.visualLineCount-visualLineIndex;
System.arraycopy(this.visualLines,visualLineIndex+emptyLineCount,this.visualLines,visualLineIndex,copyLineCount);
this.resetVisualLines(visualLineIndex+copyLineCount,emptyLineCount);
}return visualLineIndex;
},$fz.isPrivate=true,$fz),"~N,~N,~N");
$_M(c$,"wrapLineRange",
($fz=function(startLine,endLine,visualLineIndex,width){
if(this.visualLineCount==0&&width==0){
return visualLineIndex;
}for(var i=startLine;i<endLine;i++){
var line=this.logicalContent.getLine(i);
var lineOffset=this.logicalContent.getOffsetAtLine(i);
var lineLength=line.length;
if(lineLength==0){
this.setVisualLine(visualLineIndex,lineOffset,0);
visualLineIndex++;
continue;}var layout=this.renderer.getTextLayout(line,lineOffset);
layout.setWidth(Math.max(1,width));
var offsets=layout.getLineOffsets();
for(var j=0;j<offsets.length-1;j++){
this.setVisualLine(visualLineIndex++,lineOffset+offsets[j],offsets[j+1]-offsets[j]);
}
this.renderer.disposeTextLayout(layout);
}
return visualLineIndex;
},$fz.isPrivate=true,$fz),"~N,~N,~N,~N");
$_M(c$,"wrapLines",
function(){
var width=this.renderer.getClientArea().width-this.renderer.getLeftMargin()-this.renderer.getRightMargin();
this.wrapLines(width);
});
$_M(c$,"wrapLines",
function(width){
var lineCount=this.logicalContent.getLineCount();
this.visualLineCount=0;
this.visualLines=$_A(lineCount,2,0);
this.resetVisualLines(0,this.visualLines.length);
this.wrapLineRange(0,lineCount,0,width);
},"~N");
$_S(c$,
"LINE_OFFSET",0,
"LINE_LENGTH",1);
});
