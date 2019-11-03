$_L(["$wt.custom.StyledTextContent","java.util.Vector"],"$wt.custom.DefaultContent",["java.lang.StringBuffer","$wt.SWT","$wt.custom.StyledTextEvent","$.StyledTextListener","$wt.internal.Compatibility"],function(){
c$=$_C(function(){
this.textListeners=null;
this.textStore=null;
this.gapStart=-1;
this.gapEnd=-1;
this.gapLine=-1;
this.highWatermark=300;
this.lowWatermark=50;
this.lines=null;
this.$lineCount=0;
this.expandExp=1;
this.replaceExpandExp=1;
$_Z(this,arguments);
},$wt.custom,"DefaultContent",null,$wt.custom.StyledTextContent);
$_Y(c$,function(){
this.textListeners=new java.util.Vector();
this.textStore=$_A(0,'\0');
this.lines=$_A(50,2,0);
});
$_K(c$,
function(){
this.setText("");
});
$_M(c$,"addLineIndex",
function(start,length){
var size=this.lines.length;
if(this.$lineCount==size){
var newLines=$_A(size+$wt.internal.Compatibility.pow2(this.expandExp),2,0);
System.arraycopy(this.lines,0,newLines,0,size);
this.lines=newLines;
this.expandExp++;
}var range=[start,length];
this.lines[this.$lineCount]=range;
this.$lineCount++;
},"~N,~N");
$_M(c$,"addLineIndex",
function(start,length,linesArray,count){
var size=linesArray.length;
var newLines=linesArray;
if(count==size){
newLines=$_A(size+$wt.internal.Compatibility.pow2(this.replaceExpandExp),2,0);
this.replaceExpandExp++;
System.arraycopy(linesArray,0,newLines,0,size);
}var range=[start,length];
newLines[count]=range;
return newLines;
},"~N,~N,~A,~N");
$_V(c$,"addTextChangeListener",
function(listener){
if(listener==null)this.error(4);
var typedListener=new $wt.custom.StyledTextListener(listener);
this.textListeners.addElement(typedListener);
},"$wt.custom.TextChangeListener");
$_M(c$,"adjustGap",
function(position,sizeHint,line){
if(position==this.gapStart){
var size=(this.gapEnd-this.gapStart)-sizeHint;
if(this.lowWatermark<=size&&size<=this.highWatermark)return;
}else if((position+sizeHint==this.gapStart)&&(sizeHint<0)){
var size=(this.gapEnd-this.gapStart)-sizeHint;
if(this.lowWatermark<=size&&size<=this.highWatermark)return;
}this.moveAndResizeGap(position,sizeHint,line);
},"~N,~N,~N");
$_M(c$,"indexLines",
function(){
var start=0;
this.$lineCount=0;
var textLength=this.textStore.length;
var i;
for(i=start;i<textLength;i++){
var ch=this.textStore[i];
if((ch).charCodeAt(0)==('\u000d').charCodeAt(0)){
if(i+1<textLength){
ch=this.textStore[i+1];
if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
i++;
}}this.addLineIndex(start,i-start+1);
start=i+1;
}else if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
this.addLineIndex(start,i-start+1);
start=i+1;
}}
this.addLineIndex(start,i-start);
});
$_M(c$,"isDelimiter",
function(ch){
if((ch).charCodeAt(0)==('\u000d').charCodeAt(0))return true;
if((ch).charCodeAt(0)==('\u000a').charCodeAt(0))return true;
return false;
},"~N");
$_M(c$,"isValidReplace",
function(start,replaceLength,newText){
if(replaceLength==0){
if(start==0)return true;
if(start==this.getCharCount())return true;
var before=this.getTextRange(start-1,1).charAt(0);
if((before).charCodeAt(0)==('\r').charCodeAt(0)){
var after=this.getTextRange(start,1).charAt(0);
if((after).charCodeAt(0)==('\n').charCodeAt(0))return false;
}}else{
var startChar=this.getTextRange(start,1).charAt(0);
if((startChar).charCodeAt(0)==('\n').charCodeAt(0)){
if(start!=0){
var before=this.getTextRange(start-1,1).charAt(0);
if((before).charCodeAt(0)==('\r').charCodeAt(0))return false;
}}var endChar=this.getTextRange(start+replaceLength-1,1).charAt(0);
if((endChar).charCodeAt(0)==('\r').charCodeAt(0)){
if(start+replaceLength!=this.getCharCount()){
var after=this.getTextRange(start+replaceLength,1).charAt(0);
if((after).charCodeAt(0)==('\n').charCodeAt(0))return false;
}}}return true;
},"~N,~N,~S");
$_M(c$,"indexLines",
function(offset,length,numLines){
var indexedLines=$_A(numLines,2,0);
var start=0;
var lineCnt=0;
var i;
this.replaceExpandExp=1;
for(i=start;i<length;i++){
var location=i+offset;
if((location>=this.gapStart)&&(location<this.gapEnd)){
}else{
var ch=this.textStore[location];
if((ch).charCodeAt(0)==('\u000d').charCodeAt(0)){
if(location+1<this.textStore.length){
ch=this.textStore[location+1];
if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
i++;
}}indexedLines=this.addLineIndex(start,i-start+1,indexedLines,lineCnt);
lineCnt++;
start=i+1;
}else if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
indexedLines=this.addLineIndex(start,i-start+1,indexedLines,lineCnt);
lineCnt++;
start=i+1;
}}}
var newLines=$_A(lineCnt+1,2,0);
System.arraycopy(indexedLines,0,newLines,0,lineCnt);
var range=[start,i-start];
newLines[lineCnt]=range;
return newLines;
},"~N,~N,~N");
$_M(c$,"insert",
function(position,text){
if(text.length==0)return;
var startLine=this.getLineAtOffset(position);
var change=text.length;
var endInsert=position==this.getCharCount();
this.adjustGap(position,change,startLine);
var startLineOffset=this.getOffsetAtLine(startLine);
var startLineLength=this.getPhysicalLine(startLine).length;
if(change>0){
this.gapStart+=(change);
for(var i=0;i<text.length;i++)this.textStore[position+i]=text.charAt(i);

}var newLines=this.indexLines(startLineOffset,startLineLength,10);
var numNewLines=newLines.length-1;
if(newLines[numNewLines][1]==0){
if(endInsert){
numNewLines+=1;
}else{
numNewLines-=1;
}}this.expandLinesBy(numNewLines);
for(var i=this.$lineCount-1;i>startLine;i--){
this.lines[i+numNewLines]=this.lines[i];
}
for(var i=0;i<numNewLines;i++){
newLines[i][0]+=startLineOffset;
this.lines[startLine+i]=newLines[i];
}
if(numNewLines<newLines.length){
newLines[numNewLines][0]+=startLineOffset;
this.lines[startLine+numNewLines]=newLines[numNewLines];
}this.$lineCount+=numNewLines;
this.gapLine=this.getLineAtPhysicalOffset(this.gapStart);
},"~N,~S");
$_M(c$,"moveAndResizeGap",
function(position,size,newGapLine){
var content=null;
var oldSize=this.gapEnd-this.gapStart;
var newSize;
if(size>0){
newSize=this.highWatermark+size;
}else{
newSize=this.lowWatermark-size;
}if(this.gapExists()){
this.lines[this.gapLine][1]=this.lines[this.gapLine][1]-oldSize;
for(var i=this.gapLine+1;i<this.$lineCount;i++){
this.lines[i][0]=this.lines[i][0]-oldSize;
}
}if(newSize<0){
if(oldSize>0){
content=$_A(this.textStore.length-oldSize,'\0');
System.arraycopy(this.textStore,0,content,0,this.gapStart);
System.arraycopy(this.textStore,this.gapEnd,content,this.gapStart,content.length-this.gapStart);
this.textStore=content;
}this.gapStart=this.gapEnd=position;
return;
}content=$_A(this.textStore.length+(newSize-oldSize),'\0');
var newGapStart=position;
var newGapEnd=newGapStart+newSize;
if(oldSize==0){
System.arraycopy(this.textStore,0,content,0,newGapStart);
System.arraycopy(this.textStore,newGapStart,content,newGapEnd,content.length-newGapEnd);
}else if(newGapStart<this.gapStart){
var delta=this.gapStart-newGapStart;
System.arraycopy(this.textStore,0,content,0,newGapStart);
System.arraycopy(this.textStore,newGapStart,content,newGapEnd,delta);
System.arraycopy(this.textStore,this.gapEnd,content,newGapEnd+delta,this.textStore.length-this.gapEnd);
}else{
var delta=newGapStart-this.gapStart;
System.arraycopy(this.textStore,0,content,0,this.gapStart);
System.arraycopy(this.textStore,this.gapEnd,content,this.gapStart,delta);
System.arraycopy(this.textStore,this.gapEnd+delta,content,newGapEnd,content.length-newGapEnd);
}this.textStore=content;
this.gapStart=newGapStart;
this.gapEnd=newGapEnd;
if(this.gapExists()){
this.gapLine=newGapLine;
var gapLength=this.gapEnd-this.gapStart;
this.lines[this.gapLine][1]=this.lines[this.gapLine][1]+(gapLength);
for(var i=this.gapLine+1;i<this.$lineCount;i++){
this.lines[i][0]=this.lines[i][0]+gapLength;
}
}},"~N,~N,~N");
$_M(c$,"lineCount",
function(startOffset,length){
if(length==0){
return 0;
}var lineCnt=0;
var count=0;
var i=startOffset;
if(i>=this.gapStart){
i+=this.gapEnd-this.gapStart;
}while(count<length){
if((i>=this.gapStart)&&(i<this.gapEnd)){
}else{
var ch=this.textStore[i];
if((ch).charCodeAt(0)==('\u000d').charCodeAt(0)){
if(i+1<this.textStore.length){
ch=this.textStore[i+1];
if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
i++;
count++;
}}lineCnt++;
}else if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
lineCnt++;
}count++;
}i++;
}
return lineCnt;
},"~N,~N");
$_M(c$,"lineCount",
function(text){
var lineCount=0;
var length=text.length;
for(var i=0;i<length;i++){
var ch=text.charAt(i);
if((ch).charCodeAt(0)==('\u000d').charCodeAt(0)){
if(i+1<length&&(text.charAt(i+1)).charCodeAt(0)==('\u000a').charCodeAt(0)){
i++;
}lineCount++;
}else if((ch).charCodeAt(0)==('\u000a').charCodeAt(0)){
lineCount++;
}}
return lineCount;
},"~S");
$_V(c$,"getCharCount",
function(){
var length=this.gapEnd-this.gapStart;
return(this.textStore.length-length);
});
$_V(c$,"getLine",
function(index){
if((index>=this.$lineCount)||(index<0))this.error(5);
var start=this.lines[index][0];
var length=this.lines[index][1];
var end=start+length-1;
if(!this.gapExists()||(end<this.gapStart)||(start>=this.gapEnd)){
while((length-1>=0)&&this.isDelimiter(this.textStore[start+length-1])){
length--;
}
return String.instantialize(this.textStore,start,length);
}else{
var buf=new StringBuffer();
var gapLength=this.gapEnd-this.gapStart;
buf.append(this.textStore,start,this.gapStart-start);
buf.append(this.textStore,this.gapEnd,length-gapLength-(this.gapStart-start));
length=buf.length();
while((length-1>=0)&&this.isDelimiter(buf.charAt(length-1))){
length--;
}
return buf.toString().substring(0,length);
}},"~N");
$_V(c$,"getLineDelimiter",
function(){
return $wt.custom.DefaultContent.LineDelimiter;
});
$_M(c$,"getFullLine",
function(index){
var start=this.lines[index][0];
var length=this.lines[index][1];
var end=start+length-1;
if(!this.gapExists()||(end<this.gapStart)||(start>=this.gapEnd)){
return String.instantialize(this.textStore,start,length);
}else{
var buf=new StringBuffer();
var gapLength=this.gapEnd-this.gapStart;
buf.append(this.textStore,start,this.gapStart-start);
buf.append(this.textStore,this.gapEnd,length-gapLength-(this.gapStart-start));
return buf.toString();
}},"~N");
$_M(c$,"getPhysicalLine",
function(index){
var start=this.lines[index][0];
var length=this.lines[index][1];
return this.getPhysicalText(start,length);
},"~N");
$_V(c$,"getLineCount",
function(){
return this.$lineCount;
});
$_V(c$,"getLineAtOffset",
function(charPosition){
var position;
if((charPosition>this.getCharCount())||(charPosition<0))this.error(5);
if(charPosition<this.gapStart){
position=charPosition;
}else{
position=charPosition+(this.gapEnd-this.gapStart);
}if(this.$lineCount>0){
var lastLine=this.$lineCount-1;
if(position==this.lines[lastLine][0]+this.lines[lastLine][1])return lastLine;
}var high=this.$lineCount;
var low=-1;
var index=this.$lineCount;
while(high-low>1){
index=Math.floor((high+low)/2);
var lineStart=this.lines[index][0];
var lineEnd=lineStart+this.lines[index][1]-1;
if(position<=lineStart){
high=index;
}else if(position<=lineEnd){
high=index;
break;
}else{
low=index;
}}
return high;
},"~N");
$_M(c$,"getLineAtPhysicalOffset",
function(position){
var high=this.$lineCount;
var low=-1;
var index=this.$lineCount;
while(high-low>1){
index=Math.floor((high+low)/2);
var lineStart=this.lines[index][0];
var lineEnd=lineStart+this.lines[index][1]-1;
if(position<=lineStart){
high=index;
}else if(position<=lineEnd){
high=index;
break;
}else{
low=index;
}}
return high;
},"~N");
$_V(c$,"getOffsetAtLine",
function(lineIndex){
if(lineIndex==0)return 0;
if((lineIndex>=this.$lineCount)||(lineIndex<0))this.error(5);
var start=this.lines[lineIndex][0];
if(start>this.gapEnd){
return start-(this.gapEnd-this.gapStart);
}else{
return start;
}},"~N");
$_M(c$,"expandLinesBy",
function(numLines){
var size=this.lines.length;
if(size-this.$lineCount>=numLines){
return;
}var newLines=$_A(size+Math.max(10,numLines),2,0);
System.arraycopy(this.lines,0,newLines,0,size);
this.lines=newLines;
},"~N");
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"gapExists",
function(){
return this.gapStart!=this.gapEnd;
});
$_M(c$,"getPhysicalText",
function(start,length){
return String.instantialize(this.textStore,start,length);
},"~N,~N");
$_V(c$,"getTextRange",
function(start,length){
if(this.textStore==null)return"";
if(length==0)return"";
var end=start+length;
if(!this.gapExists()||(end<this.gapStart))return String.instantialize(this.textStore,start,length);
if(this.gapStart<start){
var gapLength=this.gapEnd-this.gapStart;
return String.instantialize(this.textStore,start+gapLength,length);
}var buf=new StringBuffer();
buf.append(this.textStore,start,this.gapStart-start);
buf.append(this.textStore,this.gapEnd,end-this.gapStart);
return buf.toString();
},"~N,~N");
$_V(c$,"removeTextChangeListener",
function(listener){
if(listener==null)this.error(4);
for(var i=0;i<this.textListeners.size();i++){
var typedListener=this.textListeners.elementAt(i);
if(typedListener.getEventListener()===listener){
this.textListeners.removeElementAt(i);
break;
}}
},"$wt.custom.TextChangeListener");
$_V(c$,"replaceTextRange",
function(start,replaceLength,newText){
var event=new $wt.custom.StyledTextEvent(this);
event.type=3003;
event.start=start;
event.replaceLineCount=this.lineCount(start,replaceLength);
event.text=newText;
event.newLineCount=this.lineCount(newText);
event.replaceCharCount=replaceLength;
event.newCharCount=newText.length;
this.sendTextEvent(event);
this.$delete(start,replaceLength,event.replaceLineCount+1);
this.insert(start,newText);
event=new $wt.custom.StyledTextEvent(this);
event.type=3006;
this.sendTextEvent(event);
},"~N,~N,~S");
$_M(c$,"sendTextEvent",
function(event){
for(var i=0;i<this.textListeners.size();i++){
(this.textListeners.elementAt(i)).handleEvent(event);
}
},"$wt.custom.StyledTextEvent");
$_V(c$,"setText",
function(text){
this.textStore=text.toCharArray();
this.gapStart=-1;
this.gapEnd=-1;
this.expandExp=1;
this.indexLines();
var event=new $wt.custom.StyledTextEvent(this);
event.type=3004;
event.text="";
this.sendTextEvent(event);
},"~S");
$_M(c$,"$delete",
function(position,length,numLines){
if(length==0)return;
var startLine=this.getLineAtOffset(position);
var startLineOffset=this.getOffsetAtLine(startLine);
var endLine=this.getLineAtOffset(position+length);
var endText="";
var splittingDelimiter=false;
if(position+length<this.getCharCount()){
endText=this.getTextRange(position+length-1,2);
if(((endText.charAt(0)).charCodeAt(0)==('\u000d').charCodeAt (0)) && ((endText.charAt (1)).charCodeAt (0) == ('\u000a').charCodeAt(0))){
splittingDelimiter=true;
}}this.adjustGap(position+length,-length,startLine);
var oldLines=this.indexLines(position,length+(this.gapEnd-this.gapStart),numLines);
if(position+length==this.gapStart){
this.gapStart-=length;
}else{
this.gapEnd+=length;
}var j=position;
var eol=false;
while(j<this.textStore.length&&!eol){
if(j<this.gapStart||j>=this.gapEnd){
var ch=this.textStore[j];
if(this.isDelimiter(ch)){
if(j+1<this.textStore.length)if((ch).charCodeAt(0)==('\u000d').charCodeAt (0) && ((this.textStore[j + 1]).charCodeAt (0) == ('\u000a').charCodeAt(0)))j++;
eol=true;
}}j++;
}
this.lines[startLine][1]=(position-startLineOffset)+(j-position);
var numOldLines=oldLines.length-1;
if(splittingDelimiter)numOldLines-=1;
for(var i=endLine+1;i<this.$lineCount;i++){
this.lines[i-numOldLines]=this.lines[i];
}
this.$lineCount-=numOldLines;
this.gapLine=this.getLineAtPhysicalOffset(this.gapStart);
},"~N,~N,~N");
c$.LineDelimiter=c$.prototype.LineDelimiter=System.getProperty("line.separator");
});
