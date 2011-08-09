$_L(null,"$wt.internal.browser.OS",["$wt.graphics.Point","$wt.internal.dnd.HTMLEventWrapper"],function(){
O$=c$=$_T($wt.internal.browser,"OS");
c$.destroyHandle=$_M(c$,"destroyHandle",
function(handle){
if(handle==null){
return;
}var el=handle;
if(el.parentNode!=null){
try{
el.parentNode.removeChild(el);
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}if(O$.isIE){
O$.initGC();
O$.gcContainer.appendChild(el);
el=null;
O$.gcContainer.innerHTML="";
}},"~O");
c$.clearChildren=$_M(c$,"clearChildren",
function(handle){
if(handle==null||(handle).nodeType!=1){
return;
}O$.initGC();
var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
var child=el.childNodes[i];
el.removeChild(child);
if(O$.isIE){
O$.gcContainer.appendChild(child);
child=null;
}}
if(O$.isIE){
O$.gcContainer.innerHTML="";
}},"~O");
c$.deepClearChildren=$_M(c$,"deepClearChildren",
function(handle){
if(handle==null){
return;
}O$.initGC();
var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
var child=el.childNodes[i];
if(child.nodeType==1){
O$.deepClearChildren(child);
O$.destroyHandle(child);
}else{
el.removeChild(child);
if(O$.isIE){
O$.gcContainer.appendChild(child);
child=null;
}}}
if(O$.isIE){
O$.gcContainer.innerHTML="";
}},"~O");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(handle,x,y,w,h,flags){
if(handle==null){
return;
}},"~O,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if(O$.invisibleContainer==null){
var el=d$.createElement("DIV");
el.id="swt-invisible-container";
d$.body.appendChild(el);
var s=el.style;
s.position="absolute";
s.left="-4000px";
s.top="-300px";
s.width="3000px";
s.height="100px";
s.overflow="scroll";
s.lineHeight="16px";
($t$=O$.invisibleContainer=el,O$.prototype.invisibleContainer=O$.invisibleContainer,$t$);
O$.setTextSelection(el,false);
($t$=O$.containers=new JavaObject(),O$.prototype.containers=O$.containers,$t$);
el=d$.createElement("DIV");
O$.invisibleContainer.appendChild(el);
el.className="system-default";
el.style.whiteSpace="nowrap";
el.style.overflow="visible";
($t$=O$.lineContainer=el,O$.prototype.lineContainer=O$.lineContainer,$t$);
el=d$.createElement("DIV");
O$.invisibleContainer.appendChild(el);
el.style.overflow="visible";
el.style.whiteSpace="normal";
($t$=O$.blockContainer=el,O$.prototype.blockContainer=O$.blockContainer,$t$);
}},$fz.isPrivate=true,$fz));
c$.initGC=$_M(c$,"initGC",
($fz=function(){
if(O$.isIE){
if(O$.gcContainer==null){
var gc=d$.createElement("DIV");
gc.style.display="none";
gc.id="gc";
d$.body.appendChild(gc);
($t$=O$.gcContainer=gc,O$.prototype.gcContainer=O$.gcContainer,$t$);
}}},$fz.isPrivate=true,$fz));
c$.dispose=$_M(c$,"dispose",
function(){
if(O$.blockContainer!=null){
O$.deepClearChildren(O$.blockContainer);
O$.destroyHandle(O$.blockContainer);
($t$=O$.blockContainer=null,O$.prototype.blockContainer=O$.blockContainer,$t$);
}if(O$.lineContainer!=null){
O$.deepClearChildren(O$.lineContainer);
O$.destroyHandle(O$.lineContainer);
($t$=O$.lineContainer=null,O$.prototype.lineContainer=O$.lineContainer,$t$);
}if(O$.invisibleContainer!=null){
O$.deepClearChildren(O$.invisibleContainer);
O$.destroyHandle(O$.invisibleContainer);
($t$=O$.invisibleContainer=null,O$.prototype.invisibleContainer=O$.invisibleContainer,$t$);
}if(O$.containers!=null){
var c=O$.containers;
{
for(var p in c){
try{
c[p]=null;
delete c[p];
}catch(e){}
}
}}if(O$.gcContainer!=null){
O$.gcContainer.parentNode.removeChild(O$.gcContainer);
($t$=O$.gcContainer=null,O$.prototype.gcContainer=O$.gcContainer,$t$);
}});
c$.checkScrollBar=$_M(c$,"checkScrollBar",
($fz=function(){
var el=d$.createElement("DIV");
var s=el.style;
s.position="absolute";
s.left="-4000px";
s.top="-1000px";
s.overflow="scroll";
s.width="324px";
s.height="324px";
d$.body.appendChild(el);
($t$=O$.wScrollBar=el.offsetWidth-el.clientWidth,O$.prototype.wScrollBar=O$.wScrollBar,$t$);
($t$=O$.hScrollBar=el.offsetHeight-el.clientHeight,O$.prototype.hScrollBar=O$.hScrollBar,$t$);
O$.destroyHandle(el);
},$fz.isPrivate=true,$fz));
c$.getScrollBarWidth=$_M(c$,"getScrollBarWidth",
function(){
if(O$.wScrollBar==-1){
O$.checkScrollBar();
}return O$.wScrollBar;
});
c$.getScrollBarHeight=$_M(c$,"getScrollBarHeight",
function(){
if(O$.hScrollBar==-1){
O$.checkScrollBar();
}return O$.hScrollBar;
});
c$.getContainerWidth=$_M(c$,"getContainerWidth",
function(container){
var el=container;
return Math.max(el.offsetWidth,Math.max(el.clientWidth,el.scrollWidth));
},"~O");
c$.getContainerHeight=$_M(c$,"getContainerHeight",
function(container){
var el=container;
var max=Math.max(el.offsetHeight,Math.max(el.clientHeight,el.scrollHeight));
if(O$.isIE){
max--;
}return max;
},"~O");
c$.insertText=$_M(c$,"insertText",
function(el,text){
var lines=null;
var handle=el;
{
if(!((/[\r\n\t&]/).test(text))){
handle.style.display="inline";
handle.appendChild(document.createTextNode(text));
return text;
}
var c160=String.fromCharCode(160);
var c160x8=c160+c160+c160+c160+c160+c160+c160+c160;
var s=text.replace(/\t/g,c160x8);
if(window["Console"]!=null&&Console.splitNeedFixed){
try{
lines=Console.splitIntoLines(s);
}catch(e){
lines=s.split(/\r\n|\r|\n/g);
}
}else{
lines=s.split(/\r\n|\r|\n/g);
}
}for(var i=0;i<lines.length;i++){
if(i>0){
handle.appendChild(d$.createElement("BR"));
}var line=lines[i];
if(line.length==0){
line=c160;
}var lastIndex=0;
var idx=line.indexOf('&');
var lineEl=d$.createElement("SPAN");
handle.appendChild(lineEl);
while(idx!=-1){
if(idx<line.length-1){
var c=line.charAt(idx+1);
if((c).charCodeAt(0)==('&').charCodeAt(0)){
idx=line.indexOf('&',idx+2);
continue;}else{
var chs=line.substring(lastIndex,idx);
if(chs.length!=0){
lineEl.appendChild(d$.createTextNode(chs));
}var span=d$.createElement("SPAN");
lineEl.appendChild(span);
span.appendChild(d$.createTextNode(""+c));
text=""+c;
lastIndex=idx+2;
idx=line.indexOf('&',lastIndex);
}}else{
break;
}}
var s=null;
{
if(lastIndex==0){
s=lines[i].replace(/&&/g,'&');
}else{
s=lines[i].substring(lastIndex,lines[i].length).replace(/&&/g,'&');
}
}lineEl.appendChild(d$.createTextNode(s));
}
return text;
},"~O,~S");
c$.wrapCSS=$_M(c$,"wrapCSS",
($fz=function(a){
if(a==null){
return null;
}else{
a=a.replace(/(^|[^-])(left|top|right|bottom|height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'$1');
a=a.replace(/background(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig,'');
a=a.replace(/visibility(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig,'');
a=a.trim();
return a;
}},$fz.isPrivate=true,$fz),"~S");
c$.setupAsPlain=$_M(c$,"setupAsPlain",
($fz=function(str,wrappedWidth){
O$.init();
var c=null;
if(wrappedWidth>0){
c=O$.blockContainer;
c.style.width=wrappedWidth+"px";
}else{
c=O$.lineContainer;
}O$.clearChildren(c);
c.style.display="inline";
O$.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S,~N");
c$.setupAsStyled=$_M(c$,"setupAsStyled",
($fz=function(str,className,cssText,wrappedWidth){
O$.init();
cssText=O$.wrapCSS(cssText);
var e=O$.containers;
var f=null;
var g=null;
if(wrappedWidth>0){
g="+"+className+"|"+cssText;
}else{
g="~"+className+"|"+cssText;
}{
f=e[g];
}if(f!=null){
O$.clearChildren(f);
}else{
f=d$.createElement("DIV");
O$.invisibleContainer.appendChild(f);
var x=f.style;
f.className=className;
x.cssText=cssText;
if(wrappedWidth>0){
x.whiteSpace="normal";
}else{
x.whiteSpace="nowrap";
}x.overflow="visible";
{
e[g]=f;
}}if(wrappedWidth>0){
f.style.width=wrappedWidth+"px";
}var childNodes=O$.invisibleContainer.childNodes;
for(var i=0;i<childNodes.length;i++){
var s=childNodes[i].style;
if(childNodes[i]!==f){
if(s.display!=="none"){
O$.oldDisplays[i]=s.display;
s.display="none";
}}else{
if(O$.oldDisplays[i]!=null){
s.display=O$.oldDisplays[i];
}}}
O$.insertText(f,str);
return f;
},$fz.isPrivate=true,$fz),"~S,~S,~S,~N");
c$.getStringPlainWidth=$_M(c$,"getStringPlainWidth",
function(str){
var c=O$.setupAsPlain(str,-1);
return O$.getContainerWidth(c);
},"~S");
c$.getStringStyledWidth=$_M(c$,"getStringStyledWidth",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return O$.getContainerWidth(c);
},"~S,~S,~S");
c$.getStringPlainHeight=$_M(c$,"getStringPlainHeight",
function(str){
var c=O$.setupAsPlain(str,-1);
return O$.getContainerHeight(c);
},"~S");
c$.getStringPlainWrappedHeight=$_M(c$,"getStringPlainWrappedHeight",
function(str,wrappedWidth){
var c=O$.setupAsPlain(str,wrappedWidth);
return O$.getContainerHeight(c);
},"~S,~N");
c$.getStringStyledHeight=$_M(c$,"getStringStyledHeight",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return O$.getContainerHeight(c);
},"~S,~S,~S");
c$.getStringStyledWrappedHeight=$_M(c$,"getStringStyledWrappedHeight",
function(str,className,cssText,wrappedWidth){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=O$.setupAsStyled(str,className,cssText,wrappedWidth);
return O$.getContainerHeight(c);
},"~S,~S,~S,~N");
c$.getStringPlainSize=$_M(c$,"getStringPlainSize",
function(str){
var c=O$.setupAsPlain(str,-1);
return new $wt.graphics.Point(O$.getContainerWidth(c),O$.getContainerHeight(c));
},"~S");
c$.getStringStyledSize=$_M(c$,"getStringStyledSize",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return new org.eclipse.swt.graphics.Point(0,0);
}
}var c=O$.setupAsStyled(str,className,cssText,-1);
return new $wt.graphics.Point(O$.getContainerWidth(c),O$.getContainerHeight(c));
},"~S,~S,~S");
c$.calcuateRelativePosition=$_M(c$,"calcuateRelativePosition",
function(el,relativeEl){
var srcEl=el;
var left=0;
var top=0;
while(el!=null&&el!==relativeEl){
left+=el.offsetLeft-el.scrollLeft;
top+=el.offsetTop-el.scrollTop;
if(el!==srcEl){
var style=null;
if(document.defaultView!=null){
style=document.defaultView.getComputedStyle(el,null);
}else if(el.currentStyle!=null){
style=el.currentStyle;
}
if(!O$.isOpera&&style!=null){
var w=0;
var bw=style.borderLeftWidth;
if(bw.length!=0){
w=parseInt(bw);
if(!isNaN(w)){
left+=w;
}
}
bw=style.borderTopWidth;
if(bw.length!=0){
w=parseInt(bw);
if(!isNaN(w)){
top+=w;
}
}
}
}el=el.offsetParent;
}
return new $wt.graphics.Point(left,top);
},"Element,Element");
c$.updateArrowSize=$_M(c$,"updateArrowSize",
function(el,style,cx,cy){
var xx=Math.floor(Math.min(cx,cy)/4);
var s=(el).style;
s.borderWidth=(xx>0?xx:0)+"px";
if((style&16384)!=0){
s.borderLeftWidth="0";
}else if((style&131072)!=0){
s.borderRightWidth="0";
}else if((style&128)!=0){
s.borderTopWidth="0";
}else if((style&1024)!=0){
if(xx>1){
s.borderWidth=(xx-1)+"px";
}s.borderBottomWidth="0";
}else{
s.borderTopWidth="0";
}var x=Math.floor(cy/6);
xx=Math.floor(cy/3);
s.position="relative";
if((style&(147456))!=0){
s.top=(x-2)+"px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
s.top=(xx-3)+"px";
}else if((style&1024)!=0){
s.top=(xx-2)+"px";
}}if(O$.isMozilla&&!O$.isFirefox){
if((style&128)!=0){
s.left="-2px";
}else if((style&1024)!=0){
s.left="-1px";
}}if(O$.isFirefox){
if((style&(147456))!=0){
s.top="-2px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
if(Math.min(cx,cy)<=12){
s.left="-1px";
}else{
s.left="-2px";
}s.top="-1px";
}else if((style&1024)!=0){
s.left="-1px";
s.top="-1px";
}}}else if(O$.isSafari||O$.isIE80){
if((style&(147456))!=0){
s.top="1px";
if((style&131072)!=0){
s.left="1px";
}}else{
if((style&128)!=0){
s.left="-1px";
s.top="0";
}else if((style&1024)!=0){
s.left="0";
s.top="1px";
}}}},"~O,~N,~N,~N");
c$.existedCSSClass=$_M(c$,"existedCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
return true;
}}
return false;
},"~O,~S");
c$.replaceCSSClassInDepth=$_M(c$,"replaceCSSClassInDepth",
function(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz){
var e=el;
if(toBeRemovedCSSClazz==null||toBeRemovedCSSClazz.length==0||toBeInsertedCSSClazz==null){
return false;
}O$.replaceCSSClass(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz);
var length=e.childNodes.length;
var replaced=false;
for(var i=0;i<length;i++){
replaced=replaced||O$.replaceCSSClassInDepth(e.childNodes[i],toBeRemovedCSSClazz,toBeInsertedCSSClazz);
}
return replaced;
},"~O,~S,~S");
c$.replaceCSSClass=$_M(c$,"replaceCSSClass",
function(el,toBeRemovedCSSClazz,toBeInsertedCSSClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
var existed=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===toBeRemovedCSSClazz){
existed=true;
clazz[i]=toBeInsertedCSSClazz;
break;
}}
if(existed){
e.className=clazz.join(" ");
}return existed;
},"~O,~S,~S");
c$.removeCSSClassInDepth=$_M(c$,"removeCSSClassInDepth",
function(el,cssClazz){
var e=el;
if(cssClazz==null||cssClazz.length==0){
return false;
}O$.removeCSSClass(el,cssClazz);
var length=e.childNodes.length;
var removed=false;
for(var i=0;i<length;i++){
removed=removed||O$.removeCSSClassInDepth(e.childNodes[i],cssClazz);
}
return removed;
},"~O,~S");
c$.removeCSSClass=$_M(c$,"removeCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
return false;
}var clazz=className.$plit("\\s");
var existed=false;
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
existed=true;
for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
}break;
}}
if(existed){
e.className=clazz.join(" ");
}return existed;
},"~O,~S");
c$.addCSSClass=$_M(c$,"addCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
e.className=cssClazz;
return true;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
return false;
}}
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}return true;
},"~O,~S");
c$.toggleCSSClass=$_M(c$,"toggleCSSClass",
function(el,cssClazz){
var e=el;
var className=e.className;
if(className==null||className.length==0){
e.className=cssClazz;
return;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
e.className=clazz.join(" ");
}return;
}}
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}},"~O,~S");
c$.updateCSSClass=$_M(c$,"updateCSSClass",
function(el,cssClazz,kept){
var e=el;
var className=e.className;
if(className==null||className.length==0){
if(kept){
e.className=cssClazz;
}return;
}var clazz=className.$plit("\\s");
for(var i=0;i<clazz.length;i++){
if(clazz[i]===cssClazz){
if(kept){
return;
}for(var j=i;j<clazz.length-1;j++){
clazz[j]=clazz[j+1];
}
{
clazz.length--;
e.className=clazz.join(" ");
}return;
}}
if(kept){
clazz[clazz.length]=cssClazz;
{
e.className=clazz.join(" ");
}}},"~O,~S,~B");
c$.getFixedBodyClientWidth=$_M(c$,"getFixedBodyClientWidth",
function(){
var b=d$.body;
var p=b.parentNode;
var bcWidth=b.clientWidth;
var pcWidth=p.clientWidth;
if(O$.isIE){
return(pcWidth==0)?bcWidth:pcWidth;
}else if(O$.isFirefox||O$.isSafari||O$.isOpera){
return pcWidth;
}return bcWidth;
});
c$.getFixedBodyClientHeight=$_M(c$,"getFixedBodyClientHeight",
function(){
var b=d$.body;
var p=b.parentNode;
var bcHeight=b.clientHeight;
var pcHeight=p.clientHeight;
if(O$.isIE){
return(pcHeight==0)?bcHeight:pcHeight;
}else if(O$.isFirefox||O$.isSafari){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcHeight:pcHeight;
}else if(O$.isOpera){
return pcHeight;
}return bcHeight;
});
c$.getFixedBodyOffsetTop=$_M(c$,"getFixedBodyOffsetTop",
function(){
var b=d$.body;
var p=b.parentNode;
var pcHeight=p.clientHeight;
var bcScrollTop=b.scrollTop+b.offsetTop;
var pcScrollTop=p.scrollTop+p.offsetTop;
if(O$.isIE){
return(pcHeight==0)?bcScrollTop:pcScrollTop;
}else if(O$.isFirefox){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcScrollTop:pcScrollTop;
}return bcScrollTop;
});
c$.getFixedBodyOffsetLeft=$_M(c$,"getFixedBodyOffsetLeft",
function(){
var b=d$.body;
var p=b.parentNode;
var pcHeight=p.clientHeight;
var bcScrollLeft=b.scrollLeft+b.offsetLeft;
var pcScrollLeft=p.scrollLeft+p.offsetLeft;
if(O$.isIE){
return(pcHeight==0)?bcScrollLeft:pcScrollLeft;
}else if(O$.isFirefox){
return(pcHeight==p.offsetHeight&&pcHeight==p.scrollHeight)?bcScrollLeft:pcScrollLeft;
}return bcScrollLeft;
});
c$.getImageSize=$_M(c$,"getImageSize",
function(image){
var w=16;
var h=16;
if(image.packedURL!=null){
w=image.packedItemWidth;
h=image.packedItemHeight;
}else if(image.width==0&&image.height==0){
if(image.url!=null&&image.url.length!=0){
var img=null;
{
img=O$.imageCaches[image.url];
}if(img==null){
img=new Image();
img.src=image.url;
}image.width=img.width;
image.height=img.height;
w=img.width;
h=img.height;
{
O$.imageCaches[image.url]=img;
}}}else{
w=image.width;
h=image.height;
}return new $wt.graphics.Point(w,h);
},"$wt.graphics.Image");
c$.SetFocus=$_M(c$,"SetFocus",
function(handle){
try{
handle.focus();
}catch(e){}
},"Element");
c$.getInputCharacter=$_M(c$,"getInputCharacter",
function(keyCode,shiftKey){
var ch='\0';
if(keyCode==10||keyCode==13||keyCode==9||keyCode==32){
ch=String.fromCharCode(keyCode);
}else if(keyCode>=48&&keyCode<58){
if(!shiftKey){
ch=String.fromCharCode(keyCode);
}else{
var chs=[')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
ch=chs[keyCode-48];
}}else if(keyCode==61){
if(!shiftKey){
ch='=';
}else{
ch='+';
}}else if(keyCode==59){
if(!shiftKey){
ch=';';
}else{
ch=':';
}}else if(keyCode>=65&&keyCode<=90){
if((shiftKey&&O$.isCapsLockOn)||(!shiftKey&&!O$.isCapsLockOn)){
ch=String.fromCharCode((keyCode+('a').charCodeAt (0) - ('A').charCodeAt(0)));
}else{
ch=String.fromCharCode(keyCode);
}}else if(keyCode>=96&&keyCode<=105){
ch=String.fromCharCode((keyCode-96+('0').charCodeAt(0)));
}else if(keyCode>=106&&keyCode<=111&&keyCode!=108){
var chs=['*', '+', '?', '-', '.', '/'];
ch=chs[keyCode-106];
}else if(keyCode>=186&&keyCode<=192){
if(!shiftKey){
var chs=[';', '=', ',', '-', '.', '/', '`'];
ch=chs[keyCode-186];
}else{
var chs=[':', '+', '<', '_', '>', '?', '~'];
ch=chs[keyCode-186];
}}else if(keyCode>=219&&keyCode<=222){
if(!shiftKey){
var chs=['[', '\\', ']', '\''];
ch=chs[keyCode-219];
}else{
var chs=['{', '|', '}', '\"'];
ch=chs[keyCode-219];
}}else{
ch=String.fromCharCode(keyCode);
}return ch;
},"~N,~B");
c$.isInputCharacter=$_M(c$,"isInputCharacter",
function(keyCode,shiftKey,altKey,ctrlKey){
if(altKey||ctrlKey){
return false;
}if(keyCode==10||keyCode==13||keyCode==9||keyCode==32||keyCode==8||keyCode==46||(keyCode>=48&&keyCode<=57)||keyCode==59||keyCode==61||(keyCode>=65&&keyCode<=90)||(keyCode>=96&&keyCode<=111&&keyCode!=108)||(keyCode>=186&&keyCode<=192)||(keyCode>=218&&keyCode<=222)){
return true;
}return false;
},"~N,~B,~B,~B");
c$.setTextSelection=$_M(c$,"setTextSelection",
function(handle,enabled){
if(O$.isMozilla||O$.isFirefox){
handle.style.MozUserSelect=enabled?"all":"none";
}else if(typeof handle.style.KhtmlUserSelect!="undefined"){
handle.style.KhtmlUserSelect="none";
}else if(typeof handle.onselectstart!="undefined"){
handle.onselectstart=enabled?null:O$.noReturnCallbackFunction;
return O$.noReturnCallbackFunction;
}
return null;
},"Element,~B");
c$.noReturnCallbackFunction=$_M(c$,"noReturnCallbackFunction",
function(e){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
evt.preventDefault();
evt.stopPropagation();
return false;
},"~O");
$_S(c$,
"isIE",false,
"isIE90",false,
"isIE80",false,
"isIE70",false,
"isIE60",false,
"isIE55",false,
"isIE50",false,
"isIENeedPNGFix",false,
"isMozilla",false,
"isFirefox",false,
"isFirefox10",false,
"isFirefox20",false,
"isFirefox30",false,
"isSafari",false,
"isOpera",false,
"isChrome",false,
"isChrome10",false,
"isChrome20",false,
"isChrome30",false,
"isCapsLockOn",false,
"noReturnCallback",null);
{
var os=$wt.internal.browser.OS;
var dua=navigator.userAgent;
os.isOpera=dua.indexOf("Opera")>=0;
var isKHTML=dua.indexOf("Konqueror")>=0||dua.indexOf("Safari")>=0;
os.isSafari=dua.indexOf("Safari")>=0;
os.isChrome=dua.indexOf("Chrome")>=0;
os.isChrome10=dua.indexOf("Chrome/1.")>=0||dua.indexOf("Chrome/0.")>=0;
os.isChrome20=dua.indexOf("Chrome/2.")>=0;
os.isChrome30=dua.indexOf("Chrome/3.")>=0;
var geckoPos=dua.indexOf("Gecko");
os.isMozilla=geckoPos>=0&&!isKHTML;
os.isFirefox=os.isMozilla&&dua.indexOf("Firefox")!=-1;
os.isFirefox10=os.isFirefox&&(dua.indexOf("Firefox/1.")!=-1||dua.indexOf("Firefox/0.")!=-1);
os.isFirefox20=os.isFirefox&&dua.indexOf("Firefox/2.")!=-1;
os.isFirefox30=os.isFirefox&&dua.indexOf("Firefox/3.")!=-1;
os.isIE=document.all!=null&&!os.isOpera;
os.isIE50=os.isIE&&dua.indexOf("MSIE 5.0")>=0;
os.isIE55=os.isIE&&dua.indexOf("MSIE 5.5")>=0;
os.isIE60=os.isIE&&dua.indexOf("MSIE 6.0")>=0;
os.isIE70=os.isIE&&dua.indexOf("MSIE 7.0")>=0;
os.isIE80=os.isIE&&dua.indexOf("MSIE 8.0")>=0;
os.isIE90=os.isIE&&dua.indexOf("MSIE 9.0")>=0;
os.isIENeedPNGFix=os.isIE50||os.isIE55||os.isIE60;
os.noReturnCallback=os.noReturnCallbackFunction;
}$_S(c$,
"gcContainer",null,
"invisibleContainer",null,
"containers",null,
"lineContainer",null,
"blockContainer",null,
"wScrollBar",-1,
"hScrollBar",-1);
c$.oldDisplays=c$.prototype.oldDisplays=new Array(0);
c$.imageCaches=c$.prototype.imageCaches=new JavaObject();
});
