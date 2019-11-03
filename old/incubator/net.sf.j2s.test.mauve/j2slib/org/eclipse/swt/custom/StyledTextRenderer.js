$_L(null,"$wt.custom.StyledTextRenderer",["java.lang.StringBuffer","$wt.graphics.Font","$.TextLayout","$.TextStyle"],function(){
c$=$_C(function(){
this.device=null;
this.regularFont=null;
this.boldFont=null;
this.italicFont=null;
this.boldItalicFont=null;
this.tabWidth=0;
this.ascent=0;
this.descent=0;
this.lineEndSpaceWidth=0;
$_Z(this,arguments);
},$wt.custom,"StyledTextRenderer");
$_K(c$,
function(device,regularFont){
this.device=device;
this.regularFont=regularFont;
},"$wt.graphics.Device,$wt.graphics.Font");
$_M(c$,"calculateLineHeight",
function(){
var gc=this.getGC();
this.lineEndSpaceWidth=gc.stringExtent(" ").x;
var originalFont=gc.getFont();
var metrics=gc.getFontMetrics();
this.ascent=Math.max(this.ascent,metrics.getAscent()+metrics.getLeading());
this.descent=Math.max(this.descent,metrics.getDescent());
gc.setFont(this.getFont(1));
metrics=gc.getFontMetrics();
this.ascent=Math.max(this.ascent,metrics.getAscent()+metrics.getLeading());
this.descent=Math.max(this.descent,metrics.getDescent());
gc.setFont(this.getFont(2));
metrics=gc.getFontMetrics();
this.ascent=Math.max(this.ascent,metrics.getAscent()+metrics.getLeading());
this.descent=Math.max(this.descent,metrics.getDescent());
gc.setFont(this.getFont(3));
metrics=gc.getFontMetrics();
this.ascent=Math.max(this.ascent,metrics.getAscent()+metrics.getLeading());
this.descent=Math.max(this.descent,metrics.getDescent());
gc.setFont(originalFont);
this.disposeGC(gc);
if(this.boldFont!=null)this.boldFont.dispose();
if(this.italicFont!=null)this.italicFont.dispose();
if(this.boldItalicFont!=null)this.boldItalicFont.dispose();
this.boldFont=this.italicFont=this.boldItalicFont=null;
});
$_M(c$,"dispose",
function(){
if(this.boldFont!=null)this.boldFont.dispose();
if(this.italicFont!=null)this.italicFont.dispose();
if(this.boldItalicFont!=null)this.boldItalicFont.dispose();
this.boldFont=this.italicFont=this.boldItalicFont=null;
});
$_M(c$,"drawLine",
function(line,lineIndex,paintY,gc,widgetBackground,widgetForeground,clearBackground){
var lineOffset=this.getContent().getOffsetAtLine(lineIndex);
var lineLength=line.length;
var selection=this.getSelection();
var selectionStart=selection.x;
var selectionEnd=selection.y;
var leftMargin=this.getLeftMargin();
var lineBackground=null;
var layout=this.getTextLayout(line,lineOffset);
var client=this.getClientArea();
var event=this.getLineBackgroundData(lineOffset,line);
if(event!=null){
lineBackground=event.lineBackground;
}if(lineBackground==null){
lineBackground=widgetBackground;
}if(clearBackground&&(this.isFullLineSelection()==false||selectionStart>lineOffset||selectionEnd<=lineOffset+lineLength)){
gc.setBackground(lineBackground);
gc.setForeground(lineBackground);
gc.fillRectangle(client.x+leftMargin,paintY,client.width,this.ascent+this.descent);
}var paintX=client.x+leftMargin-this.getHorizontalPixel();
if(selectionStart!=selectionEnd){
var rect=layout.getLineBounds(0);
this.drawLineBreakSelection(line,lineOffset,paintX+rect.x+rect.width,paintY,gc);
}gc.setForeground(widgetForeground);
gc.setBackground(lineBackground);
if(selectionStart==selectionEnd||(selectionEnd<=lineOffset&&selectionStart>lineOffset+lineLength-1)){
layout.draw(gc,paintX,paintY);
}else{
var start=Math.max(0,selectionStart-lineOffset);
var end=Math.min(lineLength,selectionEnd-lineOffset);
layout.draw(gc,paintX,paintY,start,end-1,this.getSelectionForeground(),this.getSelectionBackground());
}this.disposeTextLayout(layout);
},"~S,~N,~N,$wt.graphics.GC,$wt.graphics.Color,$wt.graphics.Color,~B");
$_M(c$,"getDevice",
function(){
return this.device;
});
$_M(c$,"getBaseline",
function(){
return this.ascent;
});
$_M(c$,"getFont",
function(style){
switch(style){
case 1:
if(this.boldFont!=null)return this.boldFont;
return this.boldFont=new $wt.graphics.Font(this.device,this.getFontData(style));
case 2:
if(this.italicFont!=null)return this.italicFont;
return this.italicFont=new $wt.graphics.Font(this.device,this.getFontData(style));
case 3:
if(this.boldItalicFont!=null)return this.boldItalicFont;
return this.boldItalicFont=new $wt.graphics.Font(this.device,this.getFontData(style));
default:
return this.regularFont;
}
},"~N");
$_M(c$,"getFontData",
function(style){
var fontDatas=this.regularFont.getFontData();
for(var i=0;i<fontDatas.length;i++){
fontDatas[i].setStyle(style);
}
return fontDatas;
},"~N");
$_M(c$,"getLeftMargin",
function(){
return 0;
});
$_M(c$,"getLineEndSpaceWidth",
function(){
return this.lineEndSpaceWidth;
});
$_M(c$,"getLineHeight",
function(){
return this.ascent+this.descent;
});
$_M(c$,"getLineStyleData",
function(event,lineOffset,line){
var lineLength=line.length;
if(event.styles!=null&&this.getWordWrap()){
event.styles=this.getVisualLineStyleData(event.styles,lineOffset,lineLength);
}if(event.styles==null){
event.styles=new Array(0);
}return event;
},"$wt.custom.StyledTextEvent,~N,~S");
$_M(c$,"getRightMargin",
function(){
return 0;
});
$_M(c$,"getVisualLineStyleData",
function(logicalStyles,lineOffset,lineLength){
var lineEnd=lineOffset+lineLength;
var oldStyleCount=logicalStyles.length;
var newStyleCount=0;
for(var i=0;i<oldStyleCount;i++){
var style=logicalStyles[i];
if(style.start<lineEnd&&style.start+style.length>lineOffset){
newStyleCount++;
}}
if(newStyleCount!=oldStyleCount){
var newStyles=new Array(newStyleCount);
for(var i=0,j=0;i<oldStyleCount;i++){
var style=logicalStyles[i];
if(style.start<lineEnd&&style.start+style.length>lineOffset){
newStyles[j++]=logicalStyles[i];
}}
logicalStyles=newStyles;
}return logicalStyles;
},"~A,~N,~N");
$_M(c$,"setTabLength",
function(tabLength){
var gc=this.getGC();
var tabBuffer=new StringBuffer(tabLength);
for(var i=0;i<tabLength;i++){
tabBuffer.append(' ');
}
this.tabWidth=gc.stringExtent(tabBuffer.toString()).x;
this.disposeGC(gc);
},"~N");
$_M(c$,"getTextLayout",
function(line,lineOffset){
var layout=this.createTextLayout(lineOffset);
layout.setFont(this.regularFont);
layout.setAscent(this.ascent);
layout.setDescent(this.descent);
layout.setText(line);
layout.setOrientation(this.getOrientation());
layout.setSegments(this.getBidiSegments(lineOffset,line));
layout.setTabs([this.tabWidth]);
var length=line.length;
var event=this.getLineStyleData(lineOffset,line);
var styles=event!=null?event.styles:null;
var lastOffset=0;
if(styles!=null){
for(var styleIndex=0;styleIndex<styles.length;styleIndex++){
var style=styles[styleIndex];
if(style.isUnstyled())continue;var start;
var end;
if(lineOffset>style.start){
start=0;
end=Math.min(length,style.length-lineOffset+style.start);
}else{
start=style.start-lineOffset;
end=Math.min(length,start+style.length);
}if(start>=length)break;
if(lastOffset<start){
layout.setStyle(null,lastOffset,start-1);
}var textStyle=new $wt.graphics.TextStyle(this.getFont(style.fontStyle),style.foreground,style.background);
textStyle.underline=style.underline;
textStyle.strikeout=style.strikeout;
layout.setStyle(textStyle,start,end-1);
lastOffset=Math.max(lastOffset,end);
}
}if(lastOffset<length)layout.setStyle(null,lastOffset,length);
return layout;
},"~S,~N");
$_M(c$,"createTextLayout",
function(lineOffset){
return new $wt.graphics.TextLayout(this.device);
},"~N");
$_M(c$,"disposeTextLayout",
function(layout){
layout.dispose();
},"$wt.graphics.TextLayout");
});
