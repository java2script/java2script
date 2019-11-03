$_L(["$wt.custom.StyledTextRenderer"],"$wt.custom.DisplayRenderer",["$wt.graphics.GC"],function(){
c$=$_C(function(){
this.parent=null;
this.topIndex=-1;
this.layouts=null;
$_Z(this,arguments);
},$wt.custom,"DisplayRenderer",$wt.custom.StyledTextRenderer);
$_K(c$,
function(device,regularFont,parent,tabLength){
$_R(this,$wt.custom.DisplayRenderer,[device,regularFont]);
this.parent=parent;
this.calculateLineHeight();
this.setTabLength(tabLength);
},"$wt.graphics.Device,$wt.graphics.Font,$wt.custom.StyledText,~N");
$_M(c$,"dispose",
function(){
$_U(this,$wt.custom.DisplayRenderer,"dispose",[]);
if(this.layouts!=null){
for(var i=0;i<this.layouts.length;i++){
var layout=this.layouts[i];
if(layout!=null)$_U(this,$wt.custom.DisplayRenderer,"disposeTextLayout",[layout]);
}
this.topIndex=-1;
this.layouts=null;
}});
$_V(c$,"disposeGC",
function(gc){
gc.dispose();
},"$wt.graphics.GC");
$_V(c$,"drawLineBreakSelection",
function(line,lineOffset,paintX,paintY,gc){
var selection=this.parent.internalGetSelection();
var lineLength=line.length;
var selectionStart=Math.max(0,selection.x-lineOffset);
var selectionEnd=selection.y-lineOffset;
var lineEndSpaceWidth=this.getLineEndSpaceWidth();
var lineHeight=this.getLineHeight();
if(selectionEnd==selectionStart||selectionEnd<0||selectionStart>lineLength||selectionEnd<=lineLength){
return;
}gc.setBackground(this.parent.getSelectionBackground());
gc.setForeground(this.parent.getSelectionForeground());
if((this.parent.getStyle()&65536)!=0){
var rect=this.getClientArea();
gc.fillRectangle(paintX,paintY,rect.width-paintX,lineHeight);
}else{
var isWrappedLine=false;
if(this.parent.internalGetWordWrap()){
var content=this.getContent();
var lineEnd=lineOffset+lineLength;
var lineIndex=content.getLineAtOffset(lineEnd);
if(lineIndex<content.getLineCount()-1&&content.getOffsetAtLine(lineIndex+1)==lineEnd){
isWrappedLine=true;
}}if(isWrappedLine==false){
gc.fillRectangle(paintX,paintY,lineEndSpaceWidth,lineHeight);
}}},"~S,~N,~N,~N,$wt.graphics.GC");
$_V(c$,"getBidiSegments",
function(lineOffset,lineText){
if(!this.parent.isBidi())return null;
return this.parent.getBidiSegments(lineOffset,lineText);
},"~N,~S");
$_V(c$,"getClientArea",
function(){
return this.parent.getClientArea();
});
$_V(c$,"getContent",
function(){
return this.parent.internalGetContent();
});
$_V(c$,"getGC",
function(){
return new $wt.graphics.GC(this.parent);
});
$_V(c$,"getHorizontalPixel",
function(){
return this.parent.internalGetHorizontalPixel();
});
$_V(c$,"getLeftMargin",
function(){
return this.parent.leftMargin;
});
$_V(c$,"getLineBackgroundData",
function(lineOffset,line){
return this.parent.getLineBackgroundData(lineOffset,line);
},"~N,~S");
$_M(c$,"getLineStyleData",
function(lineOffset,line){
var logicalLineEvent=this.parent.getLineStyleData(lineOffset,line);
if(logicalLineEvent!=null){
logicalLineEvent=this.getLineStyleData(logicalLineEvent,lineOffset,line);
}return logicalLineEvent;
},"~N,~S");
$_V(c$,"getOrientation",
function(){
return this.parent.getOrientation();
});
$_V(c$,"getRightMargin",
function(){
return this.parent.rightMargin;
});
$_V(c$,"getSelectionBackground",
function(){
return this.parent.getSelectionBackground();
});
$_V(c$,"getSelectionForeground",
function(){
return this.parent.getSelectionForeground();
});
$_V(c$,"getSelection",
function(){
return this.parent.internalGetSelection();
});
$_V(c$,"getWordWrap",
function(){
return this.parent.getWordWrap();
});
$_V(c$,"isFullLineSelection",
function(){
return(this.parent.getStyle()&65536)!=0;
});
$_M(c$,"createTextLayout",
function(lineOffset){
if(!this.parent.internalGetWordWrap()){
var lineIndex=this.getContent().getLineAtOffset(lineOffset);
this.updateTopIndex();
if(this.layouts!=null){
var layoutIndex=lineIndex-this.topIndex;
if(0<=layoutIndex&&layoutIndex<this.layouts.length){
var layout=this.layouts[layoutIndex];
if(layout!=null)return layout;
return this.layouts[layoutIndex]=$_U(this,$wt.custom.DisplayRenderer,"createTextLayout",[lineIndex]);
}}}return $_U(this,$wt.custom.DisplayRenderer,"createTextLayout",[lineOffset]);
},"~N");
$_M(c$,"disposeTextLayout",
function(layout){
if(this.layouts!=null){
for(var i=0;i<this.layouts.length;i++){
if(this.layouts[i]===layout)return;
}
}$_U(this,$wt.custom.DisplayRenderer,"disposeTextLayout",[layout]);
},"$wt.graphics.TextLayout");
$_M(c$,"updateTopIndex",
function(){
var verticalIncrement=this.parent.getVerticalIncrement();
var topIndex=verticalIncrement==0?0:Math.floor(this.parent.verticalScrollOffset/verticalIncrement);
var newLength=Math.max(1,this.parent.getPartialBottomIndex()-topIndex+1);
if(this.layouts==null||topIndex!=this.topIndex||newLength!=this.layouts.length){
var newLayouts=new Array(newLength);
if(this.layouts!=null){
for(var i=0;i<this.layouts.length;i++){
var layout=this.layouts[i];
if(layout!=null){
var layoutIndex=(i+this.topIndex)-topIndex;
if(0<=layoutIndex&&layoutIndex<newLayouts.length){
newLayouts[layoutIndex]=layout;
}else{
$_U(this,$wt.custom.DisplayRenderer,"disposeTextLayout",[layout]);
}}}
}this.topIndex=topIndex;
this.layouts=newLayouts;
}});
});
