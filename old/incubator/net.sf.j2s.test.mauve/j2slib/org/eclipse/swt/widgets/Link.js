$_L(["$wt.widgets.Control","$wt.graphics.RGB"],"$wt.widgets.Link",["java.lang.Character","$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Link", ".link-default {\nposition:absolute;\nleft:0;\ntop:0;\ncursor:default;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nwhite-space:normal;\noverflow:hidden;\nbackground-color:buttonface;\n}\n.link-default a {\ncolor:rgb(0,51,153);\n}\n.link-disabled a {\ncolor:gray;\ncursor:default;\n}\n.link-default span {\ntext-decoration:underline;\n}\n.link-default a span {\ntext-decoration:underline;\n}\n.link-wrap {\nwhite-space:normal;\noverflow:hidden;\n}\n.link-border {\nborder-style:inset;\nborder-width:2px;\nborder-color:white;\n}\n.swt-widgets-link {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.text = null;
this.cachedText = null;
this.textSizeCached = false;
this.textWidthCached = 0;
this.textHeightCached = 0;
this.lastColor = null;
this.anchors = null;
this.offsets = null;
this.selection = null;
this.ids = null;
this.mnemonics = null;
this.focusIndex = 0;
this.font = 0;
this.hLinkSelectionHandler = null;
$_Z (this, arguments);
}, $wt.widgets, "Link", $wt.widgets.Control);
$_Y (c$, function () {
this.anchors =  new Array (0);
});
$_M (c$, "addSelectionListener", 
function (listener) {
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener (13, typedListener);
this.addListener (14, typedListener);
}, "$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
if(wHint!=-1&&wHint<0)wHint=0;
if(hHint!=-1&&hHint<0)hHint=0;
var width=0;
var height=0;
if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=O$.getStringStyledWrappedHeight(this.cachedText,"link-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=O$.getStringStyledSize(this.cachedText,"link-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}var border=this.getBorderWidth();
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="link-default";
if((this.style&64)!=0){
this.handle.className+=" link-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" link-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}O$.setTextSelection(this.handle,false);
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Link,"createWidget",[]);
this.text="";
});
$_V(c$,"hookSelection",
function(){
if(this.anchors==null||this.anchors.length==0){
return;
}if(this.hLinkSelectionHandler!=null){
return;
}this.hLinkSelectionHandler=$_Q((($_D("$wt.widgets.Link$1")?0:org.eclipse.swt.widgets.Link.$Link$1$()),$_N($wt.widgets.Link$1,this,null)));
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].href=O$.isIE?"#":"javascript:void(0);";
this.anchors[i].target="_self";
Clazz.addEvent(this.anchors[i],"click",this.hLinkSelectionHandler);
Clazz.addEvent(this.anchors[i],"dblclick",this.hLinkSelectionHandler);
}
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"parse",
function(string,handle){
var el=handle;
var length=string.length;
this.offsets=new Array(Math.floor(length/4));
this.ids=new Array(Math.floor(length/4));
this.mnemonics=$_A(Math.floor(length/4)+1,0);
var result=$_A(0,'\0');
var result2=$_A(0,'\0');
var buffer=$_A(length,'\0');
string.getChars(0,string.length,buffer,0);
var index=0;
var state=0;
var linkIndex=0;
var start=0;
var tagStart=0;
var linkStart=0;
var endtagStart=0;
var refStart=0;
while(index<length){
var c=buffer[index];
if((c).charCodeAt(0)>=('A').charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt(0)){
c=String.fromCharCode((c).charCodeAt(0)+(32));
}switch(state){
case 0:
if((c).charCodeAt(0)==('<').charCodeAt(0)){
tagStart=index;
state++;
}break;
case 1:
if((c).charCodeAt(0)==('a').charCodeAt(0))state++;
break;
case 2:
switch(c){
case'h':
state=7;
break;
case'>':
linkStart=index+1;
state++;
break;
default:
if((c).charCodeAt(0)==32||(c).charCodeAt(0)==160)break;
else state=13;
}
break;
case 3:
if((c).charCodeAt(0)==('<').charCodeAt(0)){
endtagStart=index;
state++;
}break;
case 4:
state=(c).charCodeAt(0)==('/').charCodeAt(0)?state+1:3;
break;
case 5:
state=(c).charCodeAt(0)==('a').charCodeAt(0)?state+1:3;
break;
case 6:
if((c).charCodeAt(0)==('>').charCodeAt(0)){
this.mnemonics[linkIndex]=this.parseMnemonics(buffer,start,tagStart,result,result2,handle);
var offset=result.length;
var anchor=null;
if(handle!=null){
anchor=d$.createElement("A");
el.appendChild(anchor);
this.anchors[this.anchors.length]=anchor;
}this.parseMnemonics(buffer,linkStart,endtagStart,result,result2,anchor);
this.offsets[linkIndex]=new $wt.graphics.Point(offset,result.length-1);
if(this.ids[linkIndex]==null){
this.ids[linkIndex]=String.instantialize(buffer,linkStart,endtagStart-linkStart);
}if(anchor!=null){
if("#".equals(this.ids[linkIndex])){
anchor.href=O$.isIE?"#":"javascript:void(0);";
anchor.target="_self";
}else{
if(O$.isIE&&this.ids[linkIndex]!=null&&this.ids[linkIndex].startsWith("http")){
anchor.href=" "+this.ids[linkIndex];
}else{
anchor.href=this.ids[linkIndex];
}anchor.target="_blank";
}var title=this.ids[linkIndex];
if(title!=null&&title.length>0&&!title.startsWith("#")&&!title.startsWith("javascript:")){
anchor.title=this.ids[linkIndex];
}}linkIndex++;
start=tagStart=linkStart=endtagStart=refStart=index+1;
state=0;
}else{
state=3;
}break;
case 7:
state=(c).charCodeAt(0)==('r').charCodeAt(0)?state+1:0;
break;
case 8:
state=(c).charCodeAt(0)==('e').charCodeAt(0)?state+1:0;
break;
case 9:
state=(c).charCodeAt(0)==('f').charCodeAt(0)?state+1:0;
break;
case 10:
state=(c).charCodeAt(0)==('=').charCodeAt(0)?state+1:0;
break;
case 11:
if((c).charCodeAt(0)==('"').charCodeAt(0)){
state++;
refStart=index+1;
}else{
state=0;
}break;
case 12:
if((c).charCodeAt(0)==('"').charCodeAt(0)){
this.ids[linkIndex]=String.instantialize(buffer,refStart,index-refStart);
state=2;
}break;
case 13:
if(Character.isWhitespace(c)){
state=0;
}else if((c).charCodeAt(0)==('=').charCodeAt(0)){
state++;
}break;
case 14:
state=(c).charCodeAt(0)==('"').charCodeAt(0)?state+1:0;
break;
case 15:
if((c).charCodeAt(0)==('"').charCodeAt(0))state=2;
break;
default:
state=0;
break;
}
index++;
}
if(start<length){
var tmp=this.parseMnemonics(buffer,start,tagStart,result,result2,handle);
var mnemonic=this.parseMnemonics(buffer,linkStart,index,result,result2,handle);
if(mnemonic==-1)mnemonic=tmp;
this.mnemonics[linkIndex]=mnemonic;
}else{
this.mnemonics[linkIndex]=-1;
}if(this.offsets.length!=linkIndex){
var newOffsets=new Array(linkIndex);
System.arraycopy(this.offsets,0,newOffsets,0,linkIndex);
this.offsets=newOffsets;
var newIDs=new Array(linkIndex);
System.arraycopy(this.ids,0,newIDs,0,linkIndex);
this.ids=newIDs;
var newMnemonics=$_A(linkIndex+1,0);
System.arraycopy(this.mnemonics,0,newMnemonics,0,linkIndex+1);
this.mnemonics=newMnemonics;
}{
this.cachedText=result2.join('');
}if(this.anchors!=null&&this.anchors.length>0&&(this.hooks(13)||this.hooks(14))){
this.hookSelection();
}{
return result.join('');
}return result.toString();
},"~S,~O");
$_M(c$,"parseMnemonics",
function(buffer,start,end,result,result2,handle){
var el=handle;
var mnemonic=-1;
var index=start;
var lastIndex=result.length;
while(index<end){
var c=buffer[index];
result2[result2.length]=c;
if((c).charCodeAt(0)==('&').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('&').charCodeAt(0)){
result[result.length]=c;
index++;
}else{
mnemonic=result.length;
if(el!=null){
if((mnemonic>lastIndex)&&(el!=null)){
var len=mnemonic-lastIndex;
var cs=$_A(len,'\0');
for(var i=0;i<cs.length;i++){
cs[i]=result[lastIndex+i];
}
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=mnemonic+1;
var span=d$.createElement("SPAN");
el.appendChild(span);
span.appendChild(d$.createTextNode(""+buffer[index+1]));
}}}else{
result[result.length]=c;
}var lineBreak=false;
if((c).charCodeAt(0)==('\r').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('\n').charCodeAt(0)){
result[result.length]='\n';
index++;
}lineBreak=true;
}if((c).charCodeAt(0)==('\n').charCodeAt(0)){
lineBreak=true;
}if(lineBreak&&el!=null){
var idx=result.length;
if(idx>lastIndex){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
for(var i=0;i<cs.length;i++){
cs[i]=result[lastIndex+i];
}
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=idx;
el.appendChild(d$.createElement("BR"));
}index++;
}
var idx=result.length;
if(idx>lastIndex&&el!=null){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
for(var i=0;i<cs.length;i++){
cs[i]=result[lastIndex+i];
}
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}return mnemonic;
},"~A,~N,~N,~A,~A,~O");
$_M(c$,"releaseHandle",
function(){
for(var i=0;i<this.anchors.length;i++){
var anchor=this.anchors[i];
if(anchor==null){
continue;}if(this.hLinkSelectionHandler!=null){
Clazz.removeEvent(anchor,"click",this.hLinkSelectionHandler);
Clazz.removeEvent(anchor,"dblclick",this.hLinkSelectionHandler);
}O$.destroyHandle(anchor);
this.anchors[i]=null;
}
this.hLinkSelectionHandler=null;
$_U(this,$wt.widgets.Link,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Link,"releaseWidget",[]);
this.offsets=null;
this.ids=null;
this.mnemonics=null;
this.text=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
if(!this.hooks(13)&&!this.hooks(14)){
this.unhookSelection();
}},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Link,"setEnabled",[enabled]);
O$.updateCSSClass(this.handle,"link-disabled",!enabled);
if(!enabled){
this.lastColor=this.handle.style.color;
}else{
this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Link,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Link,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(string){
if(string.equals(this.text))return;
this.text=string;
this.textSizeCached=false;
this.anchors=new Array(0);
if(this.hLinkSelectionHandler!=null){
for(var i=0;i<this.anchors.length;i++){
var anchor=this.anchors[i];
Clazz.removeEvent(anchor,"click",this.hLinkSelectionHandler);
Clazz.removeEvent(anchor,"dblclick",this.hLinkSelectionHandler);
if(this.ids!=null){
if("#".equals(this.ids[i])){
anchor.href=O$.isIE?"#":"javascript:void(0);";
anchor.target="_self";
}else{
anchor.href=this.ids[i];
anchor.target="_blank";
}}}
}O$.clearChildren(this.handle);
this.parse(string,this.handle);
if(this.hLinkSelectionHandler!=null){
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].href=O$.isIE?"#":"javascript:void(0);";
this.anchors[i].target="_self";
Clazz.addEvent(this.anchors[i],"click",this.hLinkSelectionHandler);
Clazz.addEvent(this.anchors[i],"dblclick",this.hLinkSelectionHandler);
}
}},"~S");
$_M(c$,"unhookSelection",
function(){
if(this.hLinkSelectionHandler==null){
return;
}for(var i=0;i<this.anchors.length;i++){
var anchor=this.anchors[i];
Clazz.removeEvent(anchor,"click",this.hLinkSelectionHandler);
Clazz.removeEvent(anchor,"dblclick",this.hLinkSelectionHandler);
if(this.ids!=null){
if("#".equals(this.ids[i])){
anchor.href=O$.isIE?"#":"javascript:void(0);";
anchor.target="_self";
}else{
anchor.href=this.ids[i];
anchor.target="_blank";
}}}
this.hLinkSelectionHandler=null;
});
c$.$Link$1$=function(){
$_H();
c$=$_W($wt.widgets,"Link$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.item=this.b$["$wt.widgets.Link"];
e.text=this.b$["$wt.widgets.Link"].text;
e.widget=this.b$["$wt.widgets.Link"];
e.display=this.b$["$wt.widgets.Link"].display;
this.b$["$wt.widgets.Link"].sendEvent(13);
this.toReturn(false);
{
var evt=this.getEvent();
evt.cancelBubble=true;
evt.returnValue=false;
}});
c$=$_P();
};
c$.LINK_FOREGROUND=c$.prototype.LINK_FOREGROUND=new $wt.graphics.RGB(0,51,153);
});
