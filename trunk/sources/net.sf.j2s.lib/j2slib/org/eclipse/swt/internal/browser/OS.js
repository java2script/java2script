$_L(null,"$wt.internal.browser.OS",["$wt.graphics.Point"],function(){
O$=c$=$_T($wt.internal.browser,"OS");
c$.destroyHandle=$_M(c$,"destroyHandle",
function(handle){
if(handle==null){
return;
}var el=handle;
el.onblur=null;
el.onchange=null;
el.onclick=null;
el.oncontextmenu=null;
el.ondblclick=null;
el.onfocus=null;
el.onkeydown=null;
el.onkeypress=null;
el.onkeyup=null;
el.onmousedown=null;
el.onmousemove=null;
el.onmouseout=null;
el.onmouseover=null;
el.onmouseup=null;
el.onselectchange=null;
el.onselectstart=null;
if(el.parentNode!=null){
try{
el.parentNode.removeChild(el);
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~O");
c$.clearChildren=$_M(c$,"clearChildren",
function(handle){
if(handle==null){
return;
}var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
el.removeChild(el.childNodes[i]);
}
},"~O");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(handle,x,y,w,h,flags){
if(handle==null){
return;
}},"~O,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if(O$.invisibleContainer==null){
var el=d$.createElement("DIV");
d$.body.appendChild(el);
var s=el.style;
s.position="absolute";
s.left="-4000px";
s.top="-300px";
s.width="3000px";
s.height="100px";
s.overflow="scroll";
($t$=O$.invisibleContainer=el,O$.prototype.invisibleContainer=O$.invisibleContainer,$t$);
($t$=O$.containers=new Object(),O$.prototype.containers=O$.containers,$t$);
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
if(!((/[\r\n\t&]/g).test(text))){
handle.style.display="inline";
handle.appendChild(document.createTextNode(text));
return;
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
}O$.insertText(f,str);
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
c$.getElementPositionInShell=$_M(c$,"getElementPositionInShell",
function(elem,shellElem){
var currentElem=elem;
var left=0;
var top=0;
while(currentElem!=null&&currentElem!=shellElem){
left+=currentElem.offsetLeft;
top+=currentElem.offsetTop;
currentElem=currentElem.offsetParent;
}
if(O$.isFirefox){
left+=6;
top+=2;
}return new $wt.graphics.Point(left,top+O$.getContainerHeight(elem));
},"$wt.internal.xhtml.Element,$wt.internal.xhtml.Element");
$_S(c$,
"isIE",false,
"isIE60",false,
"isIE55",false,
"isIE50",false,
"isMozilla",false,
"isFirefox",false,
"isSafari",false,
"isOpera",false);
{
var os=$wt.internal.browser.OS;
var dua=navigator.userAgent;
var dav=navigator.appVersion;
os.isOpera=dua.indexOf("Opera")>=0;
var isKHTML=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
os.isSafari=dav.indexOf("Safari")>=0;
var geckoPos=dua.indexOf("Gecko");
os.isMozilla=(geckoPos>=0)&&(!isKHTML);
os.isFirefox=os.isMozilla&&dua.indexOf("Firefox")!=-1;
os.isIE=(document.all)&&(!os.isOpera);
os.isIE50=os.isIE&&dav.indexOf("MSIE 5.0")>=0;
os.isIE55=os.isIE&&dav.indexOf("MSIE 5.5")>=0;
os.isIE60=os.isIE&&dav.indexOf("MSIE 6.0")>=0;
}$_S(c$,
"invisibleContainer",null,
"containers",null,
"lineContainer",null,
"blockContainer",null);
});
