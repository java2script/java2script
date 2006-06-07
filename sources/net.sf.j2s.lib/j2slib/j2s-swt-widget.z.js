/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,org/eclipse/swt/graphics/GC.js,org/eclipse/swt/graphics/Resource.js,org/eclipse/swt/graphics/Color.js,org/eclipse/swt/graphics/Cursor.js,org/eclipse/swt/accessibility/Accessible.js,org/eclipse/swt/graphics/Drawable.js,org/eclipse/swt/graphics/Device.js,org/eclipse/swt/graphics/Font.js,org/eclipse/swt/graphics/FontData.js,org/eclipse/swt/graphics/FontMetrics.js,org/eclipse/swt/widgets/Widget.js,org/eclipse/swt/widgets/Control.js,org/eclipse/swt/widgets/Scrollable.js,org/eclipse/swt/widgets/Composite.js,org/eclipse/swt/widgets/Canvas.js,org/eclipse/swt/widgets/Decorations.js,org/eclipse/swt/widgets/Shell.js,org/eclipse/swt/widgets/Item.js,org/eclipse/swt/widgets/MenuItem.js,org/eclipse/swt/widgets/Menu.js,org/eclipse/swt/widgets/Monitor.js,org/eclipse/swt/widgets/ScrollBar.js,org/eclipse/swt/widgets/Display.js,org/eclipse/swt/widgets/Button.js,org/eclipse/swt/widgets/Label.js,org/eclipse/swt/widgets/Link.js,org/eclipse/swt/widgets/Text.js,org/eclipse/swt/widgets/List.js,org/eclipse/swt/browser/Browser.js,org/eclipse/swt/widgets/TableItem.js,org/eclipse/swt/widgets/TableColumn.js,org/eclipse/swt/widgets/Table.js,org/eclipse/swt/widgets/TabItem.js,org/eclipse/swt/widgets/TabFolder.js,org/eclipse/swt/widgets/Combo.js,org/eclipse/swt/widgets/Group.js,org/eclipse/swt/widgets/TreeItem.js,org/eclipse/swt/widgets/TreeColumn.js,org/eclipse/swt/widgets/Tree.js,org/eclipse/swt/widgets/ProgressBar.js,org/eclipse/swt/widgets/Sash.js,org/eclipse/swt/custom/SashForm.js,org/eclipse/swt/custom/SashFormData.js,org/eclipse/swt/custom/SashFormLayout.js,org/eclipse/swt/custom/StackLayout.js,org/eclipse/swt/widgets/Scale.js,bin/org/eclipse/swt/widgets/ToolBar.js,bin/org/eclipse/swt/widgets/ToolItem.js,bin/org/eclipse/swt/widgets/CoolBar.js,bin/org/eclipse/swt/widgets/CoolItem.js,bin/org/eclipse/swt/widgets/Caret.js,bin/org/eclipse/swt/widgets/Spinner.js,bin/org/eclipse/swt/widgets/Dialog.js,bin/org/eclipse/swt/widgets/ColorDialog.js,bin/org/eclipse/swt/widgets/DirectoryDialog.js,bin/org/eclipse/swt/widgets/FileDialog.js,bin/org/eclipse/swt/widgets/FontDialog.js,org/eclipse/swt/program/Program.js
=*/
$_J("org.eclipse.swt.internal.struct");
c$=$_C(function(){
this.hwnd=null;
this.hwndInsertAfter=null;
this.x=0;
this.y=0;
this.cx=0;
this.cy=0;
this.flags=0;
$_Z(this,arguments);
},$wt.internal.struct,"WINDOWPOS");
$_S(c$,
"sizeof",28);
$_J("org.eclipse.swt.internal.struct");
c$=$_C(function(){
this.control=null;
this.type=0;
this.data=null;
$_Z(this,arguments);
},$wt.internal.struct,"MESSAGE");
$_K(c$,
function(control,type,data){
this.control=control;
this.type=type;
this.data=data;
},"$wt.widgets.Control,~N,Object");
$_S(c$,
"CONTROL_RESIZE",1,
"CONTROL_LAYOUT",2);
$_J("org.eclipse.swt.internal.browser");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.browser,"OS");
c$.destoryHandle=$_M(c$,"destoryHandle",
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
}},"Object");
c$.clearChildren=$_M(c$,"clearChildren",
function(handle){
if(handle==null){
return;
}var el=handle;
for(var i=el.childNodes.length-1;i>=0;i--){
el.removeChild(el.childNodes[i]);
}
},"Object");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(handle,x,y,w,h,flags){
if(handle==null){
return;
}var el=handle;
},"Object,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if($wt.internal.browser.OS.invisibleContainer==null){
var el=d$.createElement("DIV");
d$.body.appendChild(el);
var s=el.style;
s.position="absolute";
s.top="-300px";
s.width="3000px";
s.height="100px";
s.overflow="scroll";
($t$=$wt.internal.browser.OS.invisibleContainer=el,$wt.internal.browser.OS.prototype.invisibleContainer=$wt.internal.browser.OS.invisibleContainer,$t$);
el=d$.createElement("DIV");
$wt.internal.browser.OS.invisibleContainer.appendChild(el);
el.className="system-default";
s=el.style;
s.whiteSpace="nowrap";
s.overflow="visible";
($t$=$wt.internal.browser.OS.lineContainer=el,$wt.internal.browser.OS.prototype.lineContainer=$wt.internal.browser.OS.lineContainer,$t$);
el=d$.createElement("DIV");
$wt.internal.browser.OS.invisibleContainer.appendChild(el);
($t$=$wt.internal.browser.OS.blockContainer=el,$wt.internal.browser.OS.prototype.blockContainer=$wt.internal.browser.OS.blockContainer,$t$);
}},$fz.isPrivate=true,$fz));
c$.resetLineContainer=$_M(c$,"resetLineContainer",
($fz=function(){
var container=$wt.internal.browser.OS.lineContainer;
$wt.internal.browser.OS.clearChildren(container);
container.className="";
var s=container.style;
s.cssText="";
s.whiteSpace="nowrap";
s.overflow="visible";
},$fz.isPrivate=true,$fz));
c$.resetBlockContainer=$_M(c$,"resetBlockContainer",
($fz=function(){
var container=$wt.internal.browser.OS.blockContainer;
$wt.internal.browser.OS.clearChildren(container);
container.className="";
container.style.cssText="";
},$fz.isPrivate=true,$fz));
c$.getContainerWidth=$_M(c$,"getContainerWidth",
function(container){
var el=container;
return Math.max(el.offsetWidth,Math.max(el.clientWidth,el.scrollWidth));
},"Object");
c$.getContainerHeight=$_M(c$,"getContainerHeight",
function(container){
var el=container;
var max=Math.max(el.offsetHeight,Math.max(el.clientHeight,el.scrollHeight));
if($wt.internal.browser.OS.isIE){
max--;
}return max;
},"Object");
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
if(splitNeedFixed){
try{
lines=splitIntoLines(s);
}catch(e){

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
},"Object,~S");
c$.setupAsPlain=$_M(c$,"setupAsPlain",
($fz=function(str){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var c=$wt.internal.browser.OS.lineContainer;
c.className="system-default";
$wt.internal.browser.OS.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S");
c$.setupAsStyled=$_M(c$,"setupAsStyled",
($fz=function(str,className,cssText){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var c=$wt.internal.browser.OS.lineContainer;
if(className!=null&&className.length!=0){
c.className=className;
}if(cssText!=null&&cssText.length!=0){
cssText=cssText.replace(/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'');
c.style.cssText=cssText;
}$wt.internal.browser.OS.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S,~S,~S");
c$.setupAsPlainWrapped=$_M(c$,"setupAsPlainWrapped",
($fz=function(str,wrappedWidth){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetBlockContainer();
var c=$wt.internal.browser.OS.blockContainer;
c.className="system-default";
c.style.width=wrappedWidth+"px";
c.style.overflow="visible";
c.style.whiteSpace="normal";
$wt.internal.browser.OS.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S,~N");
c$.setupAsStyledWrapped=$_M(c$,"setupAsStyledWrapped",
($fz=function(str,className,cssText,wrappedWidth){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var c=$wt.internal.browser.OS.lineContainer;
if(className!=null&&className.length!=0){
c.className=className;
}if(cssText!=null&&cssText.length!=0){
cssText=cssText.replace(/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'');
c.style.cssText=cssText;
}c.style.width=wrappedWidth+"px";
c.style.overflow="visible";
c.style.whiteSpace="normal";
$wt.internal.browser.OS.insertText(c,str);
return c;
},$fz.isPrivate=true,$fz),"~S,~S,~S,~N");
c$.getStringPlainWidth=$_M(c$,"getStringPlainWidth",
function(str){
var c=$wt.internal.browser.OS.setupAsPlain(str);
return $wt.internal.browser.OS.getContainerWidth(c);
},"~S");
c$.getStringStyledWidth=$_M(c$,"getStringStyledWidth",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=$wt.internal.browser.OS.setupAsStyled(str,className,cssText);
return $wt.internal.browser.OS.getContainerWidth(c);
},"~S,~S,~S");
c$.getStringPlainHeight=$_M(c$,"getStringPlainHeight",
function(str){
var c=$wt.internal.browser.OS.setupAsPlain(str);
return $wt.internal.browser.OS.getContainerHeight(c);
},"~S");
c$.getStringPlainWrappedHeight=$_M(c$,"getStringPlainWrappedHeight",
function(str,wrappedWidth){
var c=$wt.internal.browser.OS.setupAsPlainWrapped(str,wrappedWidth);
return $wt.internal.browser.OS.getContainerHeight(c);
},"~S,~N");
c$.getStringStyledHeight=$_M(c$,"getStringStyledHeight",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=$wt.internal.browser.OS.setupAsStyled(str,className,cssText);
return $wt.internal.browser.OS.getContainerHeight(c);
},"~S,~S,~S");
c$.getStringStyledWrappedHeight=$_M(c$,"getStringStyledWrappedHeight",
function(str,className,cssText,wrappedWidth){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return 0;
}
}var c=$wt.internal.browser.OS.setupAsStyledWrapped(str,className,cssText,wrappedWidth);
return $wt.internal.browser.OS.getContainerHeight(c);
},"~S,~S,~S,~N");
c$.getStringPlainSize=$_M(c$,"getStringPlainSize",
function(str){
var c=$wt.internal.browser.OS.setupAsPlain(str);
return new $wt.graphics.Point($wt.internal.browser.OS.getContainerWidth(c),$wt.internal.browser.OS.getContainerHeight(c));
},"~S");
c$.getStringStyledSize=$_M(c$,"getStringStyledSize",
function(str,className,cssText){
{
var r=/display\s*:\s*none/ig;
if(r.test(cssText)){
return new org.eclipse.swt.graphics.Point(0,0);
}
}var c=$wt.internal.browser.OS.setupAsStyled(str,className,cssText);
return new $wt.graphics.Point($wt.internal.browser.OS.getContainerWidth(c),$wt.internal.browser.OS.getContainerHeight(c));
},"~S,~S,~S");
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
"lineContainer",null,
"blockContainer",null);
c$=$_C(function(){
this.accessibleListeners=null;
this.accessibleControlListeners=null;
this.textListeners=null;
this.control=null;
$_Z(this,arguments);
},$wt.accessibility,"Accessible");
$_Y(c$,function(){
this.accessibleListeners=new java.util.Vector();
this.accessibleControlListeners=new java.util.Vector();
this.textListeners=new java.util.Vector();
});
$_M(c$,"addAccessibleListener",
function(listener){
this.accessibleListeners.addElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"addAccessibleControlListener",
function(listener){
this.accessibleControlListeners.addElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"addAccessibleTextListener",
function(listener){
this.textListeners.addElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"removeAccessibleListener",
function(listener){
this.accessibleListeners.removeElement(listener);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"removeAccessibleControlListener",
function(listener){
this.accessibleControlListeners.removeElement(listener);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"removeAccessibleTextListener",
function(listener){
this.textListeners.removeElement(listener);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"selectionChanged",
function(){
});
$_M(c$,"setFocus",
function(childID){
},"~N");
$_M(c$,"textCaretMoved",
function(index){
},"~N");
$_M(c$,"textChanged",
function(type,startIndex,length){
},"~N,~N,~N");
$_M(c$,"textSelectionChanged",
function(){
});
c$=$_C(function(){
this.handle=null;
this.bgColor=null;
this.fgColor=null;
this.font=null;
this.drawable=null;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"GC",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.GC,[]);
});
$_K(c$,
function(drawable){
this.construct(drawable,0);
},"$wt.graphics.Drawable");
$_K(c$,
function(drawable,style){
$_R(this,$wt.graphics.GC,[]);
if($_O(drawable,$wt.widgets.Control)){
var ctrl=drawable;
this.handle=ctrl.handle;
}else if($_O(drawable,$wt.graphics.Image)){
var img=drawable;
this.handle=img.handle;
}else{
this.handle=d$.createElement("DIV");
this.handle.style.position="absolute";
}},"$wt.graphics.Drawable,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&33554432)!=0)style&=-67108865;
return style&(100663296);
},"~N");
$_M(c$,"copyArea",
function(image,x,y){
},"$wt.graphics.Image,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY){
this.copyArea(srcX,srcY,width,height,destX,destY,true);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"copyArea",
function(srcX,srcY,width,height,destX,destY,paint){
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"createGdipBrush",
function(){
return 0;
});
$_M(c$,"createGdipFont",
function(){
return 0;
});
c$.createGdipFont=$_M(c$,"createGdipFont",
function(hDC,hFont){
return 0;
},"~N,~N");
$_M(c$,"createGdipPen",
function(){
return 0;
});
$_M(c$,"destroyGdipBrush",
function(brush){
},"~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.data==null||this.data.device==null||this.data.device.isDisposed())return;
});
$_M(c$,"drawArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawFocus",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"drawImage",
function(image,x,y){
if(image.handle!=null){
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}},"$wt.graphics.Image,~N,~N");
$_M(c$,"drawImage",
function(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight){
if(srcWidth==0||srcHeight==0||destWidth==0||destHeight==0)return;
this.drawImage(image,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,false);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawImage",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
var rect=d$.createElement("IMG");
rect.src=srcImage.url;
rect.style.position="absolute";
rect.style.fontSize="0px";
rect.style.left=destX+"px";
rect.style.top=destY+"px";
rect.style.width=destWidth+"px";
rect.style.height=destHeight+"px";
this.handle.appendChild(rect);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawIcon",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmap",
function(srcImage,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmapTransparentByClipping",
function(srcHdc,maskHdc,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight){
},"~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N");
$_M(c$,"drawBitmapMask",
function(srcImage,srcColor,srcMask,srcX,srcY,srcWidth,srcHeight,destX,destY,destWidth,destHeight,simple,imgWidth,imgHeight,offscreen){
var srcColorY=srcY;
if(srcColor==0){
srcColor=srcMask;
srcColorY+=imgHeight;
}},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N,~B");
$_M(c$,"drawLine",
function(x1,y1,x2,y2){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0px";
if(x1==x2){
rect.style.left=x1+"px";
rect.style.borderLeftStyle="solid";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
}else if(y1==y2){
rect.style.top=x1+"px";
rect.style.borderTopStyle="solid";
rect.style.left=Math.min(x1,x2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
}else{
rect.style.left=Math.min(x1,x2)+"px";
rect.style.top=Math.min(y1,y2)+"px";
rect.style.width=Math.abs(x1-x2)+"px";
rect.style.height=Math.abs(y1-y2)+"px";
rect.style.borderStyle="solid";
}rect.style.borderColor=this.fgColor.getCSSHandle();
rect.style.borderWidth="1px";
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"drawOval",
function(x,y,width,height){
var gdipGraphics=this.data.gdipGraphics;
},"~N,~N,~N,~N");
$_M(c$,"drawPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"drawPoint",
function(x,y){
},"~N,~N");
$_M(c$,"drawPolygon",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawPolyline",
function(pointArray){
var gdipGraphics=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawRectangle",
function(x,y,width,height){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.fontSize="0px";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.width=width+"px";
rect.style.height=height+"px";
if(this.fgColor!=null)rect.style.borderColor=this.fgColor.getCSSHandle();
rect.style.borderStyle="solid";
rect.style.borderWidth="1px";
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"drawRectangle",
function(rect){
this.drawRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"drawRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
if(this.data.gdipGraphics!=0){
this.initGdip(true,false);
this.drawRoundRectangleGdip(this.data.gdipGraphics,this.data.gdipPen,x,y,width,height,arcWidth,arcHeight);
return;
}},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawString",
function(string,x,y){
this.drawString(string,x,y,false);
},"~S,~N,~N");
$_M(c$,"drawString",
function(string,x,y,isTransparent){
var length=string.length;
if(length==0)return;
if(length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if(!isTransparent){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y){
this.drawText(string,x,y,6);
},"~S,~N,~N");
$_M(c$,"drawText",
function(string,x,y,isTransparent){
var flags=6;
if(isTransparent)flags|=1;
this.drawText(string,x,y,flags);
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(string,x,y,flags){
if(string.length==0)return;
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.whiteSpace="nowrap";
if((flags&1)==0){
rect.style.backgroundColor=this.bgColor.getCSSHandle();
}rect.style.color=this.fgColor.getCSSHandle();
this.handle.appendChild(rect);
rect.appendChild(d$.createTextNode(string));
},"~S,~N,~N,~N");
$_V(c$,"equals",
function(object){
return(object==this)||(($_O(object,$wt.graphics.GC))&&(this.handle==(object).handle));
},"Object");
$_M(c$,"fillArc",
function(x,y,width,height,startAngle,arcAngle){
if(width<0){
x=x+width;
width=-width;
}if(height<0){
y=y+height;
height=-height;
}if(width==0||height==0||arcAngle==0)return;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillGradientRectangle",
function(x,y,width,height,vertical){
if(width==0||height==0)return;
if(width==0||height==0)return;
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~B");
$_M(c$,"fillOval",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"fillPath",
function(path){
},"$wt.graphics.Path");
$_M(c$,"fillPolygon",
function(pointArray){
},"~A");
$_M(c$,"fillRectangle",
function(x,y,width,height){
var rect=d$.createElement("DIV");
rect.style.position="absolute";
rect.style.left=x+"px";
rect.style.top=y+"px";
rect.style.width=width+"px";
rect.style.height=height+"px";
rect.style.backgroundColor=this.bgColor.getCSSHandle();
this.handle.appendChild(rect);
},"~N,~N,~N,~N");
$_M(c$,"fillRectangle",
function(rect){
this.fillRectangle(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"fillRoundRectangle",
function(x,y,width,height,arcWidth,arcHeight){
this.fillRectangle(x,y,width,height);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillRoundRectangleGdip",
function(gdipGraphics,brush,x,y,width,height,arcWidth,arcHeight){
var nx=x;
var ny=y;
var nw=width;
var nh=height;
var naw=arcWidth;
var nah=arcHeight;
if(nw<0){
nw=0-nw;
nx=nx-nw;
}if(nh<0){
nh=0-nh;
ny=ny-nh;
}if(naw<0)naw=0-naw;
if(nah<0)nah=0-nah;
var naw2=Math.floor(naw/2);
var nah2=Math.floor(nah/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"flush",
function(){
});
$_M(c$,"getAdvanceWidth",
function(ch){
return 0;
},"~N");
$_M(c$,"getAdvanced",
function(){
return this.data.gdipGraphics!=0;
});
$_M(c$,"getAlpha",
function(){
return this.data.alpha;
});
$_M(c$,"getAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getBackground",
function(){
if(this.bgColor==null){
this.bgColor=new $wt.graphics.Color(null,"white");
}return this.bgColor;
});
$_M(c$,"getBackgroundPattern",
function(){
return this.data.backgroundPattern;
});
$_M(c$,"getCharWidth",
function(ch){
return 8;
},"~N");
$_M(c$,"getClipping",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClipping",
function(region){
},"$wt.graphics.Region");
$_M(c$,"getCodePage",
function(){
return 0;
});
$_M(c$,"getFillRule",
function(){
return 4;
});
$_M(c$,"getFont",
function(){
return null;
});
$_M(c$,"getFontMetrics",
function(){
return new $wt.graphics.FontMetrics();
});
$_M(c$,"getForeground",
function(){
if(this.fgColor==null){
this.fgColor=new $wt.graphics.Color(null,"black");
}return this.fgColor;
});
$_M(c$,"getForegroundPattern",
function(){
return this.data.foregroundPattern;
});
$_M(c$,"getInterpolation",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getLineCap",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineDash",
function(){
if(this.data.dashes==null)return null;
var dashes=$_A(this.data.dashes.length,0);
System.arraycopy(this.data.dashes,0,dashes,0,dashes.length);
return dashes;
});
$_M(c$,"getLineJoin",
function(){
var style;
var size;
return 3;
});
$_M(c$,"getLineStyle",
function(){
var style;
var size;
return 1;
});
$_M(c$,"getLineWidth",
function(){
var size;
return 1;
});
$_M(c$,"getStyle",
function(){
return this.data.style;
});
$_M(c$,"getTextAntialias",
function(){
if(this.data.gdipGraphics==0)return-1;
return-1;
});
$_M(c$,"getTransform",
function(transform){
},"$wt.graphics.Transform");
$_M(c$,"getXORMode",
function(){
var rop2=0;
return false;
});
$_M(c$,"initGdip",
function(draw,fill){
},"~B,~B");
$_M(c$,"init",
function(drawable,data,hDC){
var foreground=data.foreground;
},"$wt.graphics.Drawable,$wt.graphics.GCData,~N");
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_M(c$,"isClipped",
function(){
return false;
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_M(c$,"measureSpace",
function(font,format){
return 1.0;
},"~N,~N");
$_M(c$,"setAdvanced",
function(advanced){
if(advanced&&this.data.gdipGraphics!=0)return;
if(advanced){
try{
this.initGdip(false,false);
}catch(e){
if($_O(e,$wt.SWTException)){
}else{
throw e;
}
}
}else{
}},"~B");
$_M(c$,"setAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
},"~N");
$_M(c$,"setAlpha",
function(alpha){
if(this.data.gdipGraphics==0&&(alpha&0xFF)==0xFF)return;
this.initGdip(false,false);
this.data.alpha=alpha&0xFF;
},"~N");
$_M(c$,"setBackground",
function(color){
this.bgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setBackgroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
this.initGdip(false,false);
if(this.data.gdipBrush!=0)this.destroyGdipBrush(this.data.gdipBrush);
this.data.backgroundPattern=pattern;
},"$wt.graphics.Pattern");
$_M(c$,"setClipping",
function(clipRgn){
var hRgn=clipRgn;
var gdipGraphics=this.data.gdipGraphics;
},"~N");
$_M(c$,"setClipping",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"setClipping",
function(path){
this.setClipping(0);
},"$wt.graphics.Path");
$_M(c$,"setClipping",
function(rect){
if(rect==null){
this.setClipping(0);
}else{
this.setClipping(rect.x,rect.y,rect.width,rect.height);
}},"$wt.graphics.Rectangle");
$_M(c$,"setClipping",
function(region){
this.setClipping(region!=null?region.handle:0);
},"$wt.graphics.Region");
$_M(c$,"setFillRule",
function(rule){
},"~N");
$_M(c$,"setFont",
function(font){
if(font==null){
font=$wt.widgets.Display.getDefault().getSystemFont();
}else{
this.font=font;
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.fgColor=color;
},"$wt.graphics.Color");
$_M(c$,"setForegroundPattern",
function(pattern){
if(this.data.gdipGraphics==0&&pattern==null)return;
},"$wt.graphics.Pattern");
$_M(c$,"setInterpolation",
function(interpolation){
if(this.data.gdipGraphics==0&&interpolation==-1)return;
var mode=0;
},"~N");
$_M(c$,"setLineCap",
function(cap){
var capStyle=0;
this.setPen(-1,-1,-1,capStyle,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineDash",
function(dashes){
if(dashes!=null&&dashes.length>0){
this.data.dashes=$_A(dashes.length,0);
for(var i=0;i<dashes.length;i++){
var dash=dashes[i];
this.data.dashes[i]=dash;
}
}else{
this.data.dashes=null;
}},"~A");
$_M(c$,"setLineJoin",
function(join){
var joinStyle=0;
this.setPen(-1,-1,-1,-1,joinStyle,this.data.dashes);
},"~N");
$_M(c$,"setLineStyle",
function(lineStyle){
var style=-1;
this.setPen(-1,-1,style,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineWidth",
function(lineWidth){
this.setPen(-1,lineWidth,-1,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setPen",
function(newColor,newWidth,lineStyle,capStyle,joinStyle,dashes){
var extPen=false;
var changed=false;
},"~N,~N,~N,~N,~N,~A");
$_M(c$,"setXORMode",
function(xor){
},"~B");
$_M(c$,"setTextAntialias",
function(antialias){
if(this.data.gdipGraphics==0&&antialias==-1)return;
var textMode=0;
},"~N");
$_M(c$,"setTransform",
function(transform){
if(this.data.gdipGraphics==0&&transform==null)return;
},"$wt.graphics.Transform");
$_M(c$,"stringExtent",
function(string){
var length=string.length;
if(length==0){
return new $wt.graphics.Point(0,16);
}else{
return $wt.internal.browser.OS.getStringPlainSize(string);
}},"~S");
$_M(c$,"textExtent",
function(string){
return this.textExtent(string,6);
},"~S");
$_M(c$,"textExtent",
function(string,flags){
if(string.length==0){
return new $wt.graphics.Point(0,16);
}else{
return $wt.internal.browser.OS.getStringPlainSize(string);
}},"~S,~N");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"GC {*DISPOSED*}";
return"GC {"+this.handle+"}";
});
$_S(c$,
"LINE_DOT_ZERO",[3,3],
"LINE_DASH_ZERO",[18,6],
"LINE_DASHDOT_ZERO",[9,6,3,6],
"LINE_DASHDOTDOT_ZERO",[9,3,3,3,3,3]);
c$=$_C(function(){
this.device=null;
$_Z(this,arguments);
},$wt.graphics,"Resource");
c$=$_C(function(){
this.handle=0;
this.cssHandle=null;
$_Z(this,arguments);
},$wt.graphics,"Color",$wt.graphics.Resource);
$_K(c$,
function(device,red,green,blue){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,red,green,blue);
},"$wt.graphics.Device,~N,~N,~N");
$_K(c$,
function(device,rgb){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,rgb.red,rgb.green,rgb.blue);
},"$wt.graphics.Device,$wt.graphics.RGB");
$_V(c$,"dispose",
function(){
if(this.handle==-1)return;
if(this.device.isDisposed())return;
this.handle=-1;
this.cssHandle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Color)))return false;
var color=object;
if(this.device!=color.device)return false;
if(this.cssHandle!=null&&color.cssHandle!=null){
return this.cssHandle==color.cssHandle;
}else if(this.cssHandle!=null){
return(this.rgbHandleFromCSS(this.cssHandle)&0xFFFFFF)==(color.handle&0xFFFFFF);
}else if(color.cssHandle!=null){
return(this.rgbHandleFromCSS(color.cssHandle)&0xFFFFFF)==(this.handle&0xFFFFFF);
}else{
return(this.handle&0xFFFFFF)==(color.handle&0xFFFFFF);
}},"Object");
$_M(c$,"getBlue",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF0000)>>16;
});
$_M(c$,"getGreen",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return(this.handle&0xFF00)>>8;
});
$_M(c$,"getRed",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return this.handle&0xFF;
});
$_M(c$,"getRGB",
function(){
if(this.handle<0)this.handle=this.rgbHandleFromCSS(this.cssHandle);
return new $wt.graphics.RGB(this.handle&0xFF,(this.handle&0xFF00)>>8,(this.handle&0xFF0000)>>16);
});
$_V(c$,"hashCode",
function(){
return this.handle;
});
$_M(c$,"init",
function(device,red,green,blue){
this.device=device;
this.handle=0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
this.cssHandle=null;
},"$wt.graphics.Device,~N,~N,~N");
$_V(c$,"isDisposed",
function(){
return this.handle==-1;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Color {*DISPOSED*}";
if(this.cssHandle!=null)return"Color {\"" + this.cssHandle + "\"}";
return"Color {"+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Color,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.cssHandle=handle;
this.handle=-2;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"rgbHandleFromCSS",
($fz=function(cssHandle){
if(cssHandle==null)return 0x02000000;
var red=-1;
var green=-1;
var blue=-1;
{
cssHandle.replace(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,function($0,$1,$2,$3){
red=parseInt($1);
green=parseInt($2);
blue=parseInt($3);
return $0;
});
}if(red!=-1&&green!=-1&&blue!=-1){
return 0x02000000|(red&0xFF)|((green&0xFF)<<8)|((blue&0xFF)<<16);
}else{
var intHandle=-2;
{
cssHandle.replace(/#([0-9a-fA-F]{3,6})/,function($0,$1){
if($1.length==3){
var r=$1.charAt(0);
var g=$1.charAt(1);
var b=$1.charAt(2);
intHandle=eval("0x"+b+b+g+g+r+r);
}else if($1.length==6){
intHandle=eval("0x"+$1.substring(4,6)+$1.substring(2,4)+$1.substring(0,2));
}else{

$WT.error(4);
}
});
}if(intHandle!=-2){
return 0x02000000|intHandle;
}else{
return 0x0F000000;
}}},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getCSSHandle",
function(){
if(this.cssHandle!=null)return this.cssHandle;
return"rgb("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+")";
});
$_M(c$,"isPlatformSpecific",
function(){
if((this.handle<0||this.handle==0x0F000000)&&this.cssHandle!=null){
return this.rgbHandleFromCSS(this.cssHandle)==0x0F000000;
}return false;
});
c$=$_C(function(){
this.handle=null;
$_Z(this,arguments);
},$wt.graphics,"Cursor",$wt.graphics.Resource);
$_K(c$,
function(device,style){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
switch(style){
case 21:
this.handle="pointer";
break;
case 0:
this.handle="default";
break;
case 1:
this.handle="wait";
break;
case 2:
this.handle="crosshair";
break;
case 3:
this.handle="progress";
break;
case 4:
this.handle="help";
break;
case 5:
this.handle="move";
break;
case 6:
this.handle="move";
break;
case 7:
this.handle="s-resize";
break;
case 8:
this.handle="move";
break;
case 9:
this.handle="e-resize";
break;
case 10:
this.handle="n-resize";
break;
case 11:
this.handle="s-resize";
break;
case 12:
this.handle="e-resize";
break;
case 13:
this.handle="w-resize";
break;
case 14:
this.handle="ne-resize";
break;
case 15:
this.handle="se-resize";
break;
case 16:
this.handle="sw-resize";
break;
case 17:
this.handle="nw-resize";
break;
case 18:
this.handle="default";
break;
case 19:
this.handle="text";
break;
case 20:
this.handle="auto";
break;
default:
$WT.error(5);
}
},"$wt.graphics.Device,~N");
$_K(c$,
function(device,source,mask,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData,~N,~N");
$_K(c$,
function(device,source,hotspotX,hotspotY){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
if(source.url!=null){
this.handle="url(\'"+source.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,~N,~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.device.isDisposed())return;
this.handle=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Cursor)))return false;
var cursor=object;
return this.device==cursor.device&&this.handle==cursor.handle;
},"Object");
$_V(c$,"hashCode",
function(){
return this.handle.hashCode();
});
$_V(c$,"isDisposed",
function(){
return this.handle==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Cursor {*DISPOSED*}";
return"Cursor {"+this.handle+"}";
});
$_K(c$,
function(device,handle){
$_R(this,$wt.graphics.Cursor,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.handle=handle;
this.device=device;
},"$wt.graphics.Device,~S");
$_M(c$,"getCSSHandle",
function(){
return this.handle;
});
$_I($wt.graphics,"Drawable");
c$=$_C(function(){
this.disposed=false;
$_Z(this,arguments);
},$wt.graphics,"Device",null,$wt.graphics.Drawable);
c$.getDevice=$_M(c$,"getDevice",
function(){
return $wt.widgets.Display.getDefault();
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
this.create(data);
this.init();
},"$wt.graphics.DeviceData");
$_M(c$,"checkDevice",
function(){
});
$_M(c$,"create",
function(data){
},"$wt.graphics.DeviceData");
$_M(c$,"destroy",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.release();
this.destroy();
this.disposed=true;
});
$_M(c$,"getBounds",
function(){
var width=w$.screen.availWidth;
var height=w$.screen.availHeight;
return new $wt.graphics.Rectangle(0,0,width,height);
});
$_M(c$,"getDeviceData",
function(){
var data=new $wt.graphics.DeviceData();
return data;
});
$_M(c$,"getClientArea",
function(){
return this.getBounds();
});
$_M(c$,"getDepth",
function(){
return 32;
});
$_M(c$,"getDPI",
function(){
return new $wt.graphics.Point(96,96);
});
$_M(c$,"getFontList",
function(faceName,scalable){
return new Array(0);
},"~S,~B");
$_M(c$,"getSystemColor",
function(id){
var pixel=0x02000000;
switch(id){
case 1:
pixel=0x02FFFFFF;
break;
case 2:
pixel=0x02000000;
break;
case 3:
pixel=0x020000FF;
break;
case 4:
pixel=0x02000080;
break;
case 5:
pixel=0x0200FF00;
break;
case 6:
pixel=0x02008000;
break;
case 7:
pixel=0x0200FFFF;
break;
case 8:
pixel=0x02008080;
break;
case 9:
pixel=0x02FF0000;
break;
case 10:
pixel=0x02800000;
break;
case 11:
pixel=0x02FF00FF;
break;
case 12:
pixel=0x02800080;
break;
case 13:
pixel=0x02FFFF00;
break;
case 14:
pixel=0x02808000;
break;
case 15:
pixel=0x02C0C0C0;
break;
case 16:
pixel=0x02808080;
break;
}
return new $wt.graphics.Color(this,pixel&0x000000FF,(pixel&0x0000FF00)>>8,(pixel&0x00FF00)>>16);
},"~N");
$_M(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getWarnings",
function(){
return false;
});
$_M(c$,"init",
function(){
});
$_M(c$,"isDisposed",
function(){
return this.disposed;
});
$_M(c$,"release",
function(){
});
$_M(c$,"setWarnings",
function(warnings){
},"~B");
c$=$_C(function(){
this.width=0;
this.height=0;
this.depth=0;
this.scanlinePad=0;
this.bytesPerLine=0;
this.data=null;
this.palette=null;
this.transparentPixel=0;
this.maskData=null;
this.maskPad=0;
this.alphaData=null;
this.alpha=0;
this.type=0;
this.x=0;
this.y=0;
this.disposalMethod=0;
this.url=null;
this.delayTime=0;
$_Z(this,arguments);
},$wt.graphics,"ImageData",null,$wt.internal.CloneableCompatibility);
$_K(c$,
function(width,height,depth,palette){
this.construct(width,height,depth,palette,4,null,0,null,null,-1,-1,-1,0,0,0,0);
},"~N,~N,~N,$wt.graphics.PaletteData");
$_K(c$,
function(width,height,depth,palette,scanlinePad,data){
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A");
$_K(c$,
function(stream){
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"java.io.InputStream");
$_K(c$,
function(filename){
this.url=filename;
},"~S");
$_K(c$,
function(){
});
$_K(c$,
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
var bytesPerLine=Math.floor(((Math.floor((width*depth+7)/ 8)) + (scanlinePad - 1)) /scanlinePad)*scanlinePad;
this.setAllFields(width,height,depth,scanlinePad,bytesPerLine,data!=null?data:$_A(bytesPerLine*height,0),palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"setAllFields",
function(width,height,depth,scanlinePad,bytesPerLine,data,palette,transparentPixel,maskData,maskPad,alphaData,alpha,type,x,y,disposalMethod,delayTime){
this.width=width;
this.height=height;
this.depth=depth;
this.scanlinePad=scanlinePad;
this.bytesPerLine=bytesPerLine;
this.data=data;
this.palette=palette;
this.transparentPixel=transparentPixel;
this.maskData=maskData;
this.maskPad=maskPad;
this.alphaData=alphaData;
this.alpha=alpha;
this.type=type;
this.x=x;
this.y=y;
this.disposalMethod=disposalMethod;
this.delayTime=delayTime;
},"~N,~N,~N,~N,~N,~A,$wt.graphics.PaletteData,~N,~A,~N,~A,~N,~N,~N,~N,~N,~N");
c$.internal_new=$_M(c$,"internal_new",
function(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime){
return new $wt.graphics.ImageData(width,height,depth,palette,scanlinePad,data,maskPad,maskData,alphaData,alpha,transparentPixel,type,x,y,disposalMethod,delayTime);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_V(c$,"clone",
function(){
var cloneData=$_A(this.data.length,0);
System.arraycopy(this.data,0,cloneData,0,this.data.length);
var cloneMaskData=null;
if(this.maskData!=null){
cloneMaskData=$_A(this.maskData.length,0);
System.arraycopy(this.maskData,0,cloneMaskData,0,this.maskData.length);
}var cloneAlphaData=null;
if(this.alphaData!=null){
cloneAlphaData=$_A(this.alphaData.length,0);
System.arraycopy(this.alphaData,0,cloneAlphaData,0,this.alphaData.length);
}return new $wt.graphics.ImageData(this.width,this.height,this.depth,this.palette,this.scanlinePad,cloneData,this.maskPad,cloneMaskData,cloneAlphaData,this.alpha,this.transparentPixel,this.type,this.x,this.y,this.disposalMethod,this.delayTime);
});
$_M(c$,"getAlpha",
function(x,y){
if(this.alphaData==null)return 255;
return this.alphaData[y*this.width+x]&0xFF;
},"~N,~N");
$_M(c$,"getAlphas",
function(x,y,getWidth,alphas,startIndex){
if(getWidth==0)return;
if(this.alphaData==null){
var endIndex=startIndex+getWidth;
for(var i=startIndex;i<endIndex;i++){
alphas[i]=parseInt(255);
}
return;
}System.arraycopy(this.alphaData,y*this.width+x,alphas,startIndex,getWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixel",
function(x,y){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
mask=1<<(7-(x&0x7));
if((theByte&mask)==0){
return 0;
}else{
return 1;
}}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset=3-(x%4);
mask=3<<(offset*2);
return(theByte&mask)>>(offset*2);
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
theByte=this.data[index]&0xFF;
if((x&0x1)==0){
return theByte>>4;
}else{
return theByte&0x0F;
}}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
return this.data[index]&0xFF;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
return((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
return((this.data[index]&0xFF)<<16)+((this.data[index+1]&0xFF)<<8)+(this.data[index+2]&0xFF);
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
return((this.data[index]&0xFF)<<24)+((this.data[index+1]&0xFF)<<16)+((this.data[index+2]&0xFF)<<8)+(this.data[index+3]&0xFF);
}$WT.error(38);
return 0;
},"~N,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask=0;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=parseInt((theByte&0x0F));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=parseInt((theByte>>4));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index];
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixels",
function(x,y,getWidth,pixels,startIndex){
if(getWidth==0)return;
var index;
var theByte;
var mask;
var n=getWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index]&0xFF;
while(n>0){
mask=1<<(7-(srcX&0x7));
if((theByte&mask)==0){
pixels[i]=0;
}else{
pixels[i]=1;
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(mask==1){
index++;
if(n>0)theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index]&0xFF;
var offset;
while(n>0){
offset=3-(srcX%4);
mask=3<<(offset*2);
pixels[i]=parseInt(((theByte&mask)>>(offset*2)));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
if(n>0)theByte=this.data[index]&0xFF;
srcX=0;
}else{
if(offset==0){
index++;
theByte=this.data[index]&0xFF;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}while(n>1){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
pixels[i]=theByte&0x0F;
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}}
if(n>0){
theByte=this.data[index]&0xFF;
pixels[i]=theByte>>4;
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<getWidth;j++){
pixels[i]=this.data[index]&0xFF;
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index+1]&0xFF)<<8)+(this.data[index]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=2;
}}
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<16)|((this.data[index+1]&0xFF)<<8)|(this.data[index+2]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=3;
}}
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
i=startIndex;
for(var j=0;j<getWidth;j++){
pixels[i]=((this.data[index]&0xFF)<<24)|((this.data[index+1]&0xFF)<<16)|((this.data[index+2]&0xFF)<<8)|(this.data[index+3]&0xFF);
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index+=4;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getRGBs",
function(){
return this.palette.getRGBs();
});
$_M(c$,"getTransparencyMask",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_M(c$,"getTransparencyType",
function(){
if(this.maskData!=null)return 2;
if(this.transparentPixel!=-1)return 4;
if(this.alphaData!=null)return 1;
return 0;
});
$_M(c$,"scaledTo",
function(width,height){
return null;
},"~N,~N");
$_M(c$,"setAlpha",
function(x,y,alpha){
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
this.alphaData[y*this.width+x]=parseInt(alpha);
},"~N,~N,~N");
$_M(c$,"setAlphas",
function(x,y,putWidth,alphas,startIndex){
if(putWidth==0)return;
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
System.arraycopy(alphas,startIndex,this.alphaData,y*this.width+x,putWidth);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixel",
function(x,y,pixelValue){
var index;
var theByte;
var mask;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
theByte=this.data[index];
mask=1<<(7-(x&0x7));
if((pixelValue&0x1)==1){
this.data[index]=parseInt((theByte|mask));
}else{
this.data[index]=parseInt((theByte&(mask^-1)));
}return;
}if(this.depth==2){
index=(y*this.bytesPerLine)+(x>>2);
theByte=this.data[index];
var offset=3-(x%4);
mask=0xFF^(3<<(offset*2));
this.data[index]=parseInt(((this.data[index]&mask)|(pixelValue<<(offset*2))));
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
if((x&0x1)==0){
this.data[index]=parseInt(((this.data[index]&0x0F)|((pixelValue&0x0F)<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|(pixelValue&0x0F)));
}return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==16){
index=(y*this.bytesPerLine)+(x*2);
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==24){
index=(y*this.bytesPerLine)+(x*3);
this.data[index]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+2]=parseInt((pixelValue&0xFF));
return;
}if(this.depth==32){
index=(y*this.bytesPerLine)+(x*4);
this.data[index]=parseInt(((pixelValue>>24)&0xFF));
this.data[index+1]=parseInt(((pixelValue>>16)&0xFF));
this.data[index+2]=parseInt(((pixelValue>>8)&0xFF));
this.data[index+3]=parseInt((pixelValue&0xFF));
return;
}$WT.error(38);
},"~N,~N,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
if(putWidth==0)return;
var index;
var theByte;
var mask;
var n=putWidth;
var i=startIndex;
var srcX=x;
var srcY=y;
if(this.depth==1){
index=(y*this.bytesPerLine)+(x>>3);
while(n>0){
mask=1<<(7-(srcX&0x7));
if((pixels[i]&0x1)==1){
this.data[index]=parseInt(((this.data[index]&0xFF)|mask));
}else{
this.data[index]=parseInt(((this.data[index]&0xFF)&(mask^-1)));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
if(mask==1){
index++;
}}}
return;
}if(this.depth==2){
var masks=[parseInt(0xFC),parseInt(0xF3),parseInt(0xCF),parseInt(0x3F)];
index=(y*this.bytesPerLine)+(x>>2);
var offset=3-(x%4);
while(n>0){
theByte=pixels[i]&0x3;
this.data[index]=parseInt(((this.data[index]&masks[offset])|(theByte<<(offset*2))));
i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
offset=0;
srcX=0;
}else{
if(offset==0){
index++;
offset=3;
}else{
offset--;
}}}
return;
}if(this.depth==4){
index=(y*this.bytesPerLine)+(x>>1);
var high=(x&0x1)==0;
while(n>0){
theByte=pixels[i]&0x0F;
if(high){
this.data[index]=parseInt(((this.data[index]&0x0F)|(theByte<<4)));
}else{
this.data[index]=parseInt(((this.data[index]&0xF0)|theByte));
}i++;
n--;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
high=true;
srcX=0;
}else{
if(!high)index++;
high=!high;
}}
return;
}if(this.depth==8){
index=(y*this.bytesPerLine)+x;
for(var j=0;j<putWidth;j++){
this.data[index]=parseInt((pixels[i]&0xFF));
i++;
srcX++;
if(srcX>=this.width){
srcY++;
index=srcY*this.bytesPerLine;
srcX=0;
}else{
index++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixels",
function(x,y,putWidth,pixels,startIndex){
},"~N,~N,~N,~A,~N");
c$=$_C(function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=0;
this.repeatCount=0;
this.imageLoaderListeners=null;
$_Z(this,arguments);
},$wt.graphics,"ImageLoader");
$_K(c$,
function(){
this.reset();
});
$_M(c$,"reset",
function(){
this.data=null;
this.logicalScreenWidth=0;
this.logicalScreenHeight=0;
this.backgroundPixel=-1;
this.repeatCount=1;
});
$_M(c$,"load",
function(stream){
this.reset();
this.data=[new $wt.graphics.ImageData(stream)];
return this.data;
},"java.io.InputStream");
$_M(c$,"load",
function(filename){
this.reset();
this.data=[new $wt.graphics.ImageData(filename)];
return this.data;
},"~S");
$_M(c$,"save",
function(stream,format){
},"java.io.OutputStream,~N");
$_M(c$,"save",
function(filename,format){
},"~S,~N");
$_M(c$,"addImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null){
this.imageLoaderListeners=new java.util.Vector();
}this.imageLoaderListeners.addElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"removeImageLoaderListener",
function(listener){
if(this.imageLoaderListeners==null)return;
this.imageLoaderListeners.removeElement(listener);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"hasListeners",
function(){
return this.imageLoaderListeners!=null&&this.imageLoaderListeners.size()>0;
});
$_M(c$,"notifyListeners",
function(event){
if(!this.hasListeners())return;
var size=this.imageLoaderListeners.size();
for(var i=0;i<size;i++){
var listener=this.imageLoaderListeners.elementAt(i);
listener.imageDataLoaded(event);
}
},"$wt.graphics.ImageLoaderEvent");
c$=$_C(function(){
this.url=null;
this.width=0;
this.height=0;
this.imgHandle=null;
this.type=0;
this.handle=null;
this.transparentPixel=-1;
this.memGC=null;
this.alphaData=null;
this.alpha=-1;
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Image",$wt.graphics.Resource,$wt.graphics.Drawable);
$_K(c$,
function(){
$_R(this,$wt.graphics.Image,[]);
});
$_K(c$,
function(device,width,height){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,width,height);
this.width=width;
this.height=height;
},"$wt.graphics.Device,~N,~N");
$_M(c$,"init",
function(device,width,height){
this.type=0;
this.width=width;
this.height=height;
this.handle=d$.createElement("DIV");
this.handle.style.width=width+"px";
this.handle.style.height=height+"px";
this.imgHandle=this.handle;
},"$wt.graphics.Device,~N,~N");
$_K(c$,
function(device,srcImage,flag){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.device=device;
this.url=srcImage.url;
},"$wt.graphics.Device,$wt.graphics.Image,~N");
$_K(c$,
function(device,bounds){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.width=bounds.width;
this.height=bounds.height;
},"$wt.graphics.Device,$wt.graphics.Rectangle");
$_K(c$,
function(device,data){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=data.url;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(device,source,mask){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=source.url;
},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData");
$_K(c$,
function(device,stream){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
var url=null;
if(stream!=null){
url=stream.url;
}this.url=url;
},"$wt.graphics.Device,java.io.InputStream");
$_K(c$,
function(device,filename){
$_R(this,$wt.graphics.Image,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.url=filename;
},"$wt.graphics.Device,~S");
$_V(c$,"dispose",
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Image)))return false;
var image=object;
return this.device==image.device&&this.handle==image.handle;
},"Object");
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.device,"white");
});
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,this.width,this.height);
});
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.url);
});
$_V(c$,"hashCode",
function(){
return this.handle.toString().hashCode();
});
$_V(c$,"isDisposed",
function(){
return false;
});
$_M(c$,"setBackground",
function(color){
},"$wt.graphics.Color");
$_M(c$,"toString",
function(){
if(this.isDisposed())return"Image {*DISPOSED*}";
return"Image {"+this.handle+"}";
});
$_S(c$,
"DEFAULT_SCANLINE_PAD",4);
c$=$_C(function(){
this.data=null;
$_Z(this,arguments);
},$wt.graphics,"Font",$wt.graphics.Resource);
$_K(c$,
function(){
$_R(this,$wt.graphics.Font,[]);
});
$_K(c$,
function(device,fd){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,fd);
},"$wt.graphics.Device,$wt.graphics.FontData");
$_K(c$,
function(device,fds){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
for(var i=0;i<fds.length;i++){
}
this.init(device,fds[0]);
},"$wt.graphics.Device,~A");
$_K(c$,
function(device,name,height,style){
$_R(this,$wt.graphics.Font,[]);
if(device==null)device=$wt.graphics.Device.getDevice();
this.init(device,new $wt.graphics.FontData(name,height,style));
},"$wt.graphics.Device,~S,~N,~N");
$_V(c$,"dispose",
function(){
this.data=null;
this.device=null;
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.Font)))return false;
var font=object;
return font.data.equals(this.data);
},"Object");
$_M(c$,"getFontData",
function(){
var datum=new Array(1);
datum[0]=this.data;
return datum;
});
$_V(c$,"hashCode",
function(){
return this.data.hashCode();
});
$_M(c$,"init",
function(device,fd){
this.data=fd;
this.device=device;
},"$wt.graphics.Device,$wt.graphics.FontData");
$_V(c$,"isDisposed",
function(){
return this.data==null;
});
$_V(c$,"toString",
function(){
if(this.isDisposed())return"Font {*DISPOSED*}";
return"Font {"+this.data+"}";
});
c$=$_C(function(){
this.height=0;
this.style=0;
this.name=null;
this.lang=null;
this.country=null;
this.variant=null;
$_Z(this,arguments);
},$wt.graphics,"FontData");
$_K(c$,
function(){
this.name="Arial";
this.style=0;
this.height=12;
});
$_K(c$,
function(string){
this.name=string;
if(this.name==null){
this.name="Arial";
}this.style=0;
this.height=12;
},"~S");
$_K(c$,
function(name,height,style){
this.setName(name);
this.setHeight(height);
this.setStyle(style);
},"~S,~N,~N");
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.FontData)))return false;
var fd=object;
return this.height==fd.height&&this.style==fd.style&&this.getName().equals(fd.getName());
},"Object");
$_M(c$,"getHeight",
function(){
return this.height;
});
$_M(c$,"getLocale",
function(){
var buffer=new StringBuffer();
var sep='_';
if(this.lang!=null){
buffer.append(this.lang);
buffer.append(sep);
}if(this.country!=null){
buffer.append(this.country);
buffer.append(sep);
}if(this.variant!=null){
buffer.append(this.variant);
}var result=buffer.toString();
var length=result.length;
if(length>0){
if((result.charAt(length-1)).charCodeAt(0)==(sep).charCodeAt(0)){
result=result.substring(0,length-1);
}}return result;
});
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getStyle",
function(){
var style=0;
return style;
});
$_V(c$,"hashCode",
function(){
return this.height^this.style^this.getName().hashCode();
});
$_M(c$,"setHeight",
function(height){
this.height=height;
},"~N");
$_M(c$,"setLocale",
function(locale){
this.lang=this.country=this.variant=null;
if(locale!=null){
var sep='_';
var length=locale.length;
var firstSep;
var secondSep;
firstSep=locale.indexOf(sep);
if(firstSep==-1){
firstSep=secondSep=length;
}else{
secondSep=locale.indexOf(sep,firstSep+1);
if(secondSep==-1)secondSep=length;
}if(firstSep>0)this.lang=locale.substring(0,firstSep);
if(secondSep>firstSep+1)this.country=locale.substring(firstSep+1,secondSep);
if(length>secondSep+1)this.variant=locale.substring(secondSep+1);
}},"~S");
$_M(c$,"setName",
function(name){
this.name=name;
},"~S");
$_M(c$,"setStyle",
function(style){
this.style=style;
},"~N");
$_V(c$,"toString",
function(){
var buffer=new StringBuffer();
buffer.append("1|");
buffer.append(this.getName());
buffer.append("|");
buffer.append(this.getHeight());
buffer.append("|");
buffer.append(this.getStyle());
buffer.append("|");
buffer.append("WINDOWS|1|");
buffer.append(this.getName());
return buffer.toString();
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.graphics,"FontMetrics");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.graphics.FontMetrics)))return false;
return false;
},"Object");
$_M(c$,"getAscent",
function(){
return 0;
});
$_M(c$,"getAverageCharWidth",
function(){
return 9;
});
$_M(c$,"getDescent",
function(){
return 0;
});
$_M(c$,"getHeight",
function(){
return 16;
});
$_M(c$,"getLeading",
function(){
return 0;
});
$_M(c$,"hashCode",
function(){
return $_U(this,$wt.graphics.FontMetrics,"hashCode",[]);
});
c$=$_C(function(){
this.handle=null;
this.style=0;
this.state=0;
this.display=null;
this.eventTable=null;
this.data=null;
this.dragStatus=false;
this.hoverTime=0;
this.hoverTimerID=0;
this.hookedStatus=null;
$_Z(this,arguments);
},$wt.widgets,"Widget");
$_K(c$,
function(parent,style){
this.checkSubclass();
this.checkParent(parent);
this.style=style;
this.display=parent.display;
},"$wt.widgets.Widget,~N");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
this.checkHookType(eventType);
},"~N,$wt.widgets.Listener");
$_M(c$,"addDisposeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(12,typedListener);
},"$wt.events.DisposeListener");
$_M(c$,"callWindowProc",
function(hwnd,msg,wParam,lParam){
return 0;
},"~N,~N,~N,~N");
c$.checkBits=$_M(c$,"checkBits",
function(style,int0,int1,int2,int3,int4,int5){
var mask=int0|int1|int2|int3|int4|int5;
if((style&mask)==0)style|=int0;
if((style&int0)!=0)style=(style&~mask)|int0;
if((style&int1)!=0)style=(style&~mask)|int1;
if((style&int2)!=0)style=(style&~mask)|int2;
if((style&int3)!=0)style=(style&~mask)|int3;
if((style&int4)!=0)style=(style&~mask)|int4;
if((style&int5)!=0)style=(style&~mask)|int5;
return style;
},"~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"checkHookType",
function(eventType){
if(this.hookedStatus==null){
this.hookedStatus=$_A(38,false);
}var hooked=false;
if(eventType>=0&&eventType<=37){
hooked=this.hookedStatus[eventType];
}if(hooked){
return;
}switch(eventType){
case 1:
this.hookKeyDown();
break;
case 2:
this.hookKeyUp();
break;
case 3:
this.hookMouseDown();
break;
case 4:
this.hookMouseUp();
break;
case 5:
this.hookMouseMove();
break;
case 6:
this.hookMouseEnter();
break;
case 7:
this.hookMouseExit();
break;
case 8:
this.hookMouseDoubleClick();
break;
case 13:
this.hookSelection();
break;
case 15:
this.hookFocusIn();
break;
case 16:
this.hookFocusOut();
break;
case 24:
this.hookModify();
break;
case 25:
if(!this.hookedStatus[1])this.hookKeyDown();
this.hookedStatus[1]=true;
break;
case 28:
this.hookHelp();
break;
case 29:
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 30:
this.hookArm();
break;
case 31:
this.hookTraverse();
break;
case 32:
if(!this.hookedStatus[6])this.hookMouseEnter();
if(!this.hookedStatus[7])this.hookMouseExit();
if(!this.hookedStatus[4])this.hookMouseUp();
if(!this.hookedStatus[3])this.hookMouseDown();
if(!this.hookedStatus[5])this.hookMouseMove();
this.hookedStatus[6]=true;
this.hookedStatus[7]=true;
this.hookedStatus[4]=true;
this.hookedStatus[3]=true;
this.hookedStatus[5]=true;
break;
case 35:
this.hookMenuDetect();
break;
case 37:
this.hookMouseWheel();
break;
}
this.hookedStatus[eventType]=true;
},"~N");
$_M(c$,"checkOrientation",
function(parent){
this.style&=-134217729;
if((this.style&(100663296))==0){
if(parent!=null){
if((parent.style&33554432)!=0)this.style|=33554432;
if((parent.style&67108864)!=0)this.style|=67108864;
}}this.style=$wt.widgets.Widget.checkBits(this.style,33554432,67108864,0,0,0,0);
},"$wt.widgets.Widget");
$_M(c$,"checkOpened",
function(){
});
$_M(c$,"checkParent",
function(parent){
parent.checkOpened();
},"$wt.widgets.Widget");
$_M(c$,"checkSubclass",
function(){
});
$_M(c$,"checkWidget",
function(){
var display=this.display;
});
$_M(c$,"destroyWidget",
function(){
this.releaseHandle();
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.releaseChild();
this.releaseWidget();
this.destroyWidget();
});
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"filters",
function(eventType){
return this.display.filters(eventType);
},"~N");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"fixMnemonic",
function(string){
var buffer=$_A(string.length,'\0');
string.getChars(0,string.length,buffer,0);
var i=0;
var j=0;
while(i<buffer.length){
if((buffer[i]).charCodeAt(0)==('&').charCodeAt(0)){
if(i+1<buffer.length&&(buffer[i+1]).charCodeAt(0)==('&').charCodeAt(0)){
buffer[j++]=' ';
i++;
}i++;
}else{
buffer[j++]=buffer[i++];
}}
while(j<buffer.length)buffer[j++]=String.fromCharCode(0);

return buffer;
},"~S");
$_M(c$,"getData",
function(){
return(this.state&4)!=0?(this.data)[0]:this.data;
});
$_M(c$,"getData",
function(key){
if((this.state&4)!=0){
var table=this.data;
for(var i=1;i<table.length;i+=2){
if(key.equals(table[i]))return table[i+1];
}
}return null;
},"~S");
$_M(c$,"getDisplay",
function(){
var display=this.display;
return display;
});
$_M(c$,"getMenu",
function(){
return null;
});
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_M(c$,"getNameText",
function(){
return"";
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"hookKeyDown",
function(){
this.handle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(1);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$1,i$,v$);
})(this,null));
});
$_M(c$,"hookKeyUp",
function(){
this.handle.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if((e.event).keyCode==27){
this.b$["$wt.widgets.Widget"].dragStatus=false;
}this.b$["$wt.widgets.Widget"].sendEvent(2);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$2,i$,v$);
})(this,null));
});
$_M(c$,"mouseHoverProc",
function(){
var hoverHooked=false;
if(this.hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.hoverTimerID);
this.hoverTimerID=0;
}if(hoverHooked||this.hooks(32)){
hoverHooked=true;
this.hoverTimerID=w$.setTimeout($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$3",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(32);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
});
c$=$_P();
}
return $_N($wt.widgets.Widget$3,i$,v$);
})(this,null)),400);
}return hoverHooked;
});
$_M(c$,"hookMouseDown",
function(){
this.handle.onmousedown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(e.leftButtonHold){
this.b$["$wt.widgets.Widget"].dragStatus=true;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(3)){
this.b$["$wt.widgets.Widget"].sendEvent(3);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$4,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseUp",
function(){
this.handle.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
this.b$["$wt.widgets.Widget"].dragStatus=false;
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(4)){
this.b$["$wt.widgets.Widget"].sendEvent(4);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$5,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseMove",
function(){
this.handle.onmousemove=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var dragHooked=false;
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(this.b$["$wt.widgets.Widget"].dragStatus&&e.leftButtonHold&&this.b$["$wt.widgets.Widget"].hooks(29)){
dragHooked=true;
this.b$["$wt.widgets.Widget"].sendEvent(29);
this.b$["$wt.widgets.Widget"].dragStatus=false;
}if((!dragHooked&&!hoverHooked)||this.b$["$wt.widgets.Widget"].hooks(5)){
this.b$["$wt.widgets.Widget"].sendEvent(5);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$6,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseEnter",
function(){
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=this.b$["$wt.widgets.Widget"].mouseHoverProc();
if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(6)){
this.b$["$wt.widgets.Widget"].sendEvent(6);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$7,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseExit",
function(){
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var hoverHooked=false;
if(this.b$["$wt.widgets.Widget"].hoverTimerID!=0){
hoverHooked=true;
w$.clearTimeout(this.b$["$wt.widgets.Widget"].hoverTimerID);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
}if(!hoverHooked||this.b$["$wt.widgets.Widget"].hooks(7)){
this.b$["$wt.widgets.Widget"].sendEvent(7);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$8,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseDoubleClick",
function(){
this.handle.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(8);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$9,i$,v$);
})(this,null));
});
$_M(c$,"hookSelection",
function(){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$10")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$10",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$10,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusIn",
function(){
this.handle.onfocus=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$11")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$11",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(15);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$11,i$,v$);
})(this,null));
});
$_M(c$,"hookFocusOut",
function(){
this.handle.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$12")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$12",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(16);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$12,i$,v$);
})(this,null));
});
$_M(c$,"hookModify",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$13")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$13",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(24);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$13,i$,v$);
})(this,null));
});
$_M(c$,"hookHelp",
function(){
this.handle.onhelp=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$14")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$14",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(28);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$14,i$,v$);
})(this,null));
});
$_M(c$,"hookArm",
function(){
this.handle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$15")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$15",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(30);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$15,i$,v$);
})(this,null));
});
$_M(c$,"hookTraverse",
function(){
this.handle.onkeypress=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$16")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$16",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
});
c$=$_P();
}
return $_N($wt.widgets.Widget$16,i$,v$);
})(this,null));
});
$_M(c$,"hookMenuDetect",
function(){
this.handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$17")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$17",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Widget"].sendEvent(35);
});
c$=$_P();
}
return $_N($wt.widgets.Widget$17,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseWheel",
function(){
});
$_M(c$,"hooks",
function(eventType){
if(this.eventTable==null)return false;
return this.eventTable.hooks(eventType);
},"~N");
$_M(c$,"isDisposed",
function(){
return(this.state&1)!=0;
});
$_M(c$,"isListening",
function(eventType){
return this.hooks(eventType);
},"~N");
$_M(c$,"isValidSubclass",
function(){
return $wt.widgets.Display.isValidClass(this.getClass());
});
$_M(c$,"isValidThread",
function(){
return true;
});
$_M(c$,"mapEvent",
function(hwnd,event){
},"~N,$wt.widgets.Event");
$_M(c$,"notifyListeners",
function(eventType,event){
if(event==null)event=new $wt.widgets.Event();
this.sendEvent(eventType,event);
},"~N,$wt.widgets.Event");
$_M(c$,"postEvent",
function(eventType){
this.sendEvent(eventType,null,false);
},"~N");
$_M(c$,"postEvent",
function(eventType,event){
this.sendEvent(eventType,event,false);
},"~N,$wt.widgets.Event");
$_M(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
this.state|=1;
this.display=null;
});
$_M(c$,"releaseResources",
function(){
this.releaseWidget();
this.releaseHandle();
});
$_M(c$,"releaseWidget",
function(){
this.sendEvent(12);
this.eventTable=null;
this.data=null;
});
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"removeDisposeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(12,listener);
},"$wt.events.DisposeListener");
$_M(c$,"sendEvent",
function(event){
var display=event.display;
if(!display.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType){
this.sendEvent(eventType,null,true);
},"~N");
$_M(c$,"sendEvent",
function(eventType,event){
this.sendEvent(eventType,event,true);
},"~N,$wt.widgets.Event");
$_M(c$,"sendEvent",
function(eventType,event,send){
if(this.eventTable==null&&!this.display.filters(eventType)){
return;
}if(event==null)event=new $wt.widgets.Event();
event.type=eventType;
event.display=this.display;
event.widget=this;
if(event.time==0){
event.time=this.display.getLastEventTime();
}if(send){
this.sendEvent(event);
}else{
this.display.postEvent(event);
}},"~N,$wt.widgets.Event,~B");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam){
var event=new $wt.widgets.Event();
return this.sendKeyEvent(type,msg,wParam,lParam,event);
},"~N,~N,~N,~N");
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
this.sendEvent(type,event);
if(this.isDisposed())return false;
return event.doit;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"sendMouseEvent",
function(type,button,hwnd,x,y){
return this.sendMouseEvent(type,button,0,0,false,hwnd,x,y);
},"~N,~N,Object,~N,~N");
$_M(c$,"sendMouseEvent",
function(type,button,count,detail,send,hwnd,x,y){
if(!this.hooks(type)&&!this.filters(type))return true;
var event=new $wt.widgets.Event();
event.button=button;
event.detail=detail;
event.count=count;
event.x=x;
event.y=y;
switch(type){
case 3:
case 8:
if(event.button==1)event.stateMask&=-524289;
if(event.button==2)event.stateMask&=-1048577;
if(event.button==3)event.stateMask&=-2097153;
if(event.button==4)event.stateMask&=-8388609;
if(event.button==5)event.stateMask&=-33554433;
break;
case 4:
if(event.button==1)event.stateMask|=524288;
if(event.button==2)event.stateMask|=1048576;
if(event.button==3)event.stateMask|=2097152;
if(event.button==4)event.stateMask|=8388608;
if(event.button==5)event.stateMask|=33554432;
break;
}
if(send){
this.sendEvent(type,event);
if(this.isDisposed())return false;
}else{
this.postEvent(type,event);
}return event.doit;
},"~N,~N,~N,~N,~B,Object,~N,~N");
$_M(c$,"setData",
function(data){
if((this.state&4)!=0){
(this.data)[0]=data;
}else{
this.data=data;
}},"Object");
$_M(c$,"setData",
function(key,value){
var index=1;
var table=null;
if((this.state&4)!=0){
table=this.data;
while(index<table.length){
if(key.equals(table[index]))break;
index+=2;
}
}if(value!=null){
if((this.state&4)!=0){
if(index==table.length){
var newTable=new Array(table.length+2);
System.arraycopy(table,0,newTable,0,table.length);
this.data=table=newTable;
}}else{
table=new Array(3);
table[0]=this.data;
this.data=table;
this.state|=4;
}table[index]=key;
table[index+1]=value;
}else{
if((this.state&4)!=0){
if(index!=table.length){
var length=table.length-2;
if(length==1){
this.data=table[0];
this.state&=-5;
}else{
var newTable=new Array(length);
System.arraycopy(table,0,newTable,0,index);
System.arraycopy(table,index+2,newTable,index,length-index);
this.data=newTable;
}}}}},"~S,Object");
$_M(c$,"sendFocusEvent",
function(type){
this.sendEvent(type);
return true;
},"~N");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if(hWnd==null)return true;
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"showMenu",
function(x,y){
var event=new $wt.widgets.Event();
event.x=x;
event.y=y;
this.sendEvent(35,event);
if(!event.doit)return true;
var menu=this.getMenu();
if(menu!=null&&!menu.isDisposed()){
if(x!=event.x||y!=event.y){
menu.setLocation(event.x,event.y);
}menu.setVisible(true);
return true;
}return false;
},"~N,~N");
$_V(c$,"toString",
function(){
var string="*Disposed*";
if(!this.isDisposed()){
string="*Wrong Thread*";
if(this.isValidThread())string=this.getNameText();
}return this.getName()+" {"+string+"}";
});
$_S(c$,
"DISPOSED",1,
"CANVAS",2,
"KEYED_DATA",4,
"DISABLED",8,
"HIDDEN",16,
"LAYOUT_NEEDED",32,
"LAYOUT_CHANGED",64,
"DEFAULT_WIDTH",64,
"DEFAULT_HEIGHT",64);
c$=$_C(function(){
this.parent=null;
this.cursor=null;
this.menu=null;
this.toolTipText=null;
this.layoutData=null;
this.accessible=null;
this.drawCount=0;
this.foreground=0;
this.background=0;
this.left=0;
this.top=0;
this.height=0;
this.width=0;
$_Z(this,arguments);
},$wt.widgets,"Control",$wt.widgets.Widget,$wt.graphics.Drawable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Control,[parent,style]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Composite,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addFocusListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(15,typedListener);
this.addListener(16,typedListener);
},"$wt.events.FocusListener");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addKeyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(2,typedListener);
this.addListener(1,typedListener);
},"$wt.events.KeyListener");
$_M(c$,"addMouseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(3,typedListener);
this.addListener(4,typedListener);
this.addListener(8,typedListener);
},"$wt.events.MouseListener");
$_M(c$,"addMouseTrackListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(6,typedListener);
this.addListener(7,typedListener);
this.addListener(32,typedListener);
},"$wt.events.MouseTrackListener");
$_M(c$,"addMouseMoveListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(5,typedListener);
},"$wt.events.MouseMoveListener");
$_M(c$,"addPaintListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(9,typedListener);
},"$wt.events.PaintListener");
$_M(c$,"addTraverseListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(31,typedListener);
},"$wt.events.TraverseListener");
$_M(c$,"borderHandle",
function(){
return this.handle;
});
$_M(c$,"checkBorder",
function(){
if(this.getBorderWidth()==0)this.style&=-2049;
});
$_M(c$,"checkBuffered",
function(){
this.style&=-536870913;
});
$_M(c$,"checkHandle",
function(hwnd){
return hwnd==this.handle;
},"$wt.internal.xhtml.Element");
$_M(c$,"checkMirrored",
function(){
if((this.style&67108864)!=0){
}});
$_M(c$,"computeSize",
function(wHint,hHint){
return this.computeSize(wHint,hHint,true);
},"~N,~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=64;
var height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTabGroup",
function(){
if(this.isTabGroup())return this;
return this.parent.computeTabGroup();
});
$_M(c$,"computeTabRoot",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
var index=0;
while(index<tabList.length){
if(tabList[index]==this)break;
index++;
}
if(index==tabList.length){
if(this.isTabGroup())return this;
}}return this.parent.computeTabRoot();
});
$_M(c$,"computeTabList",
function(){
if(this.isTabGroup()){
if(this.getVisible()&&this.getEnabled()){
return[this];
}}return new Array(0);
});
$_M(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
});
$_M(c$,"createWidget",
function(){
this.foreground=this.background=-1;
this.checkOrientation(this.parent);
this.createHandle();
this.checkBuffered();
this.register();
this.setDefaultFont();
this.checkMirrored();
this.checkBorder();
});
$_M(c$,"deregister",
function(){
this.display.removeControl(this.handle);
});
$_V(c$,"destroyWidget",
function(){
var hwnd=this.topHandle();
this.releaseHandle();
if(hwnd!=null){
BrowserNative.releaseHandle(hwnd);
}});
$_M(c$,"enableWidget",
function(enabled){
this.handle.disabled=!enabled;
},"~B");
$_M(c$,"findBrush",
function(pixel){
return this.parent.findBrush(pixel);
},"~N");
$_M(c$,"findCursor",
function(){
if(this.cursor!=null)return this.cursor;
return this.parent.findCursor();
});
$_M(c$,"findThemeControl",
function(){
return this.background==-1?this.parent.findThemeControl():null;
});
$_M(c$,"findMenus",
function(control){
if(this.menu!=null&&this!=control)return[this.menu];
return new Array(0);
},"$wt.widgets.Control");
$_M(c$,"findMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"fixChildren",
function(newShell,oldShell,newDecorations,oldDecorations,menus){
oldShell.fixShell(newShell,this);
oldDecorations.fixDecorations(newDecorations,this,menus);
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixFocus",
function(focusControl){
var shell=this.getShell();
var control=this;
while(control!=shell&&(control=control.parent)!=null){
if(control.setFixedFocus())return;
}
shell.setSavedFocus(focusControl);
},"$wt.widgets.Control");
$_M(c$,"forceFocus",
function(){
if(this.display.focusEvent==16)return false;
var shell=this.menuShell();
shell.setSavedFocus(this);
if(!this.isEnabled()||!this.isVisible()||!this.isActive())return false;
if(this.isFocusControl())return true;
shell.setSavedFocus(null);
if(this.isDisposed())return false;
shell.setSavedFocus(this);
return this.isFocusControl();
});
$_M(c$,"forceResize",
function(){
if(this.parent==null)return;
var lpwp=this.parent.lpwp;
if(lpwp==null)return;
for(var i=0;i<lpwp.length;i++){
var wp=lpwp[i];
if(wp!=null&&wp.hwnd==this.handle){
this.SetWindowPos(wp.hwnd,null,wp.x,wp.y,wp.cx,wp.cy,wp.flags);
lpwp[i]=null;
return;
}}
});
$_M(c$,"getAccessible",
function(){
return this.accessible;
});
$_M(c$,"getBackground",
function(){
var bg=this.handle.style.backgroundColor;
if(bg==null||bg.toString().length==0){
return new $wt.graphics.Color(this.display,"menu");
}return new $wt.graphics.Color(this.display,bg);
});
$_M(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 1;
}return 0;
});
$_M(c$,"getBounds",
function(){
this.forceResize();
return new $wt.graphics.Rectangle(this.left,this.top,this.width,this.height);
});
$_M(c$,"getEnabled",
function(){
return!this.handle.disabled;
});
$_M(c$,"getFont",
function(){
var ff=this.handle.style.fontFamily;
if(ff==null||ff.toString().length==0){
ff="Tahoma, Arial, sans-serif";
}var fs=this.handle.style.fontSize;
if(fs==null||fs.toString().length==0){
fs="8";
}return new $wt.graphics.Font(this.display,ff,Integer.parseInt(fs),0);
});
$_M(c$,"getForeground",
function(){
var fg=this.handle.style.color;
if(fg==null||fg.toString().length==0){
return new $wt.graphics.Color(this.display,"black");
}return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"getLayoutData",
function(){
return this.layoutData;
});
$_M(c$,"getLocation",
function(){
this.forceResize();
return new $wt.graphics.Point(this.left,this.top);
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getMonitor",
function(){
return this.display.getPrimaryMonitor();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getPath",
function(){
var count=0;
var shell=this.getShell();
var control=this;
while(control!=shell){
count++;
control=control.parent;
}
control=this;
var result=new Array(count);
while(control!=shell){
result[--count]=control;
control=control.parent;
}
return result;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getSize",
function(){
this.forceResize();
return new $wt.graphics.Point(this.width,this.height);
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
if(this.drawCount!=0)return(this.state&16)==0;
return this.handle.style.visibility!="hidden";
});
$_M(c$,"hasCursor",
function(){
return false;
});
$_M(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"isActive",
function(){
var dialogShell=this.display.getModalDialogShell();
if(dialogShell!=null&&dialogShell!=this.getShell()){
return false;
}var shell=null;
var modalShells=this.display.modalShells;
if(modalShells!=null){
var bits=196608;
var index=modalShells.length;
while(--index>=0){
var modal=modalShells[index];
if(modal!=null){
if((modal.style&bits)!=0){
var control=this;
while(control!=null){
if(control==modal)break;
control=control.parent;
}
if(control!=modal)return false;
break;
}if((modal.style&32768)!=0){
if(shell==null)shell=this.getShell();
if(modal.parent==shell)return false;
}}}
}if(shell==null)shell=this.getShell();
return shell.getEnabled();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isFocusControl",
function(){
return this.hasFocus();
});
$_M(c$,"isFocusAncestor",
function(control){
while(control!=null&&control!=this){
control=control.parent;
}
return control==this;
},"$wt.widgets.Control");
$_M(c$,"isReparentable",
function(){
return true;
});
$_M(c$,"isShowing",
function(){
if(!this.isVisible())return false;
var control=this;
while(control!=null){
var size=control.getSize();
if(size.x==0||size.y==0){
return false;
}control=control.parent;
}
return true;
});
$_M(c$,"isTabGroup",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]==this)return true;
}
}return true;
});
$_M(c$,"isTabItem",
function(){
var tabList=this.parent._getTabList();
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
if(tabList[i]==this)return false;
}
}return false;
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"mapEvent",
function(hwnd,event){
if(hwnd!=this.handle){
}},"$wt.internal.xhtml.Element,$wt.widgets.Event");
$_M(c$,"markLayout",
function(changed,all){
},"~B,~B");
$_M(c$,"menuShell",
function(){
return this.parent.menuShell();
});
$_M(c$,"mnemonicHit",
function(key){
return false;
},"~N");
$_M(c$,"mnemonicMatch",
function(key){
return false;
},"~N");
$_M(c$,"moveAbove",
function(control){
if(control!=null){
if(this.parent!=control.parent)return;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.removeChild(this.handle);
parentHandle.insertBefore(this.handle,control.handle);
}}}},"$wt.widgets.Control");
$_M(c$,"moveBelow",
function(control){
if(control!=null){
if(this.parent!=control.parent)return;
this.parent.handle.removeChild(this.handle);
if(control.handle.nextSibling!=null){
this.parent.handle.insertBefore(this.handle,control.handle.nextSibling);
}else{
this.parent.handle.appendChild(this.handle);
}}},"$wt.widgets.Control");
$_M(c$,"pack",
function(){
this.pack(true);
});
$_M(c$,"pack",
function(changed){
var computeSize=this.computeSize(-1,-1,changed);
System.out.println(computeSize);
this.setSize(computeSize);
},"~B");
$_M(c$,"redraw",
function(){
});
$_M(c$,"redraw",
function(x,y,width,height,all){
if(width<=0||height<=0)return;
},"~N,~N,~N,~N,~B");
$_M(c$,"register",
function(){
this.display.addControl(this.handle,this);
if(this.parent!=null){
this.parent.children[this.parent.children.length]=this;
}});
$_V(c$,"releaseChild",
function(){
this.parent.removeControl(this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Control,"releaseHandle",[]);
if(this.handle!=null){
BrowserNative.releaseHandle(this.handle);
this.handle=null;
}});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Control,"releaseWidget",[]);
if(this.toolTipText!=null){
var shell=this.getShell();
shell.setToolTipText(this.handle,null);
}this.toolTipText=null;
if(this.menu!=null&&!this.menu.isDisposed()){
this.menu.dispose();
}this.menu=null;
this.cursor=null;
this.deregister();
this.parent=null;
this.layoutData=null;
this.accessible=null;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeFocusListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(15,listener);
this.eventTable.unhook(16,listener);
},"$wt.events.FocusListener");
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeKeyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(2,listener);
this.eventTable.unhook(1,listener);
},"$wt.events.KeyListener");
$_M(c$,"removeMouseTrackListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(6,listener);
this.eventTable.unhook(7,listener);
this.eventTable.unhook(32,listener);
},"$wt.events.MouseTrackListener");
$_M(c$,"removeMouseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(3,listener);
this.eventTable.unhook(4,listener);
this.eventTable.unhook(8,listener);
},"$wt.events.MouseListener");
$_M(c$,"removeMouseMoveListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(5,listener);
},"$wt.events.MouseMoveListener");
$_M(c$,"removePaintListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(9,listener);
},"$wt.events.PaintListener");
$_M(c$,"removeTraverseListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(31,listener);
},"$wt.events.TraverseListener");
$_M(c$,"showWidget",
function(visible){
this.handle.style.visibility=visible?"visible":"hidden";
},"~B");
$_V(c$,"sendFocusEvent",
function(type){
var shell=this.getShell();
var display=this.display;
display.focusEvent=type;
display.focusControl=this;
this.sendEvent(type);
display.focusEvent=0;
display.focusControl=null;
if(!shell.isDisposed()){
switch(type){
case 15:
shell.setActiveControl(this);
break;
case 16:
if(shell!=display.getActiveShell()){
shell.setActiveControl(null);
}break;
}
}return true;
},"~N");
$_M(c$,"setBackground",
function(color){
if(color!=null)this.handle.style.backgroundColor=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(x,y,width,height){
var flags=0;
this.setBounds(x,y,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
this.setBounds(x,y,width,height,flags,true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
var topHandle=this.topHandle();
if(defer&&this.parent!=null){
this.forceResize();
var lpwp=this.parent.lpwp;
if(lpwp==null){
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}else{
var index=0;
while(index<lpwp.length){
if(lpwp[index]==null)break;
index++;
}
if(index==lpwp.length){
var newLpwp=new Array(lpwp.length+4);
System.arraycopy(lpwp,0,newLpwp,0,lpwp.length);
this.parent.lpwp=lpwp=newLpwp;
}var wp=new $wt.internal.struct.WINDOWPOS();
wp.hwnd=topHandle;
wp.x=x;
wp.y=y;
wp.cx=width;
wp.cy=height;
wp.flags=flags;
lpwp[index]=wp;
}}else{
if((width!=this.width||height!=this.height)&&$_O(this,$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(topHandle,null,x,y,width,height,flags);
}},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setBounds",
function(rect){
this.setBounds(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setCapture",
function(capture){
},"~B");
$_M(c$,"setCursor",
function(){
});
$_M(c$,"setCursor",
function(cursor){
this.cursor=cursor;
this.handle.style.cursor=cursor.getCSSHandle();
},"$wt.graphics.Cursor");
$_M(c$,"setDefaultFont",
function(){
});
$_M(c$,"setEnabled",
function(enabled){
var control=null;
var fixFocus=false;
if(!enabled){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}this.enableWidget(enabled);
if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFocus",
function(){
if((this.style&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFont",
function(font){
if(font==null||font.data==null)return;
this.handle.style.fontFamily=font.data.name;
this.handle.style.fontSize=font.data.height+"pt";
if((font.data.style&1)!=0){
this.handle.style.fontWeight="bold";
}else{
this.handle.style.fontWeight="normal";
}if((font.data.style&2)!=0){
this.handle.style.fontStyle="italic";
}else{
this.handle.style.fontStyle="normal";
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null)this.handle.style.color=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setLayoutData",
function(layoutData){
this.layoutData=layoutData;
},"Object");
$_M(c$,"setLocation",
function(x,y){
var flags=0;
this.setBounds(x,y,this.width,this.height,flags);
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setMenu",
function(menu){
if(menu!=null){
}this.menu=menu;
if(this.handle.oncontextmenu==null){
this.handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Control$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Control$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Control"].showMenu(0,0);
});
c$=$_P();
}
return $_N($wt.widgets.Control$1,i$,v$);
})(this,null));
}},"$wt.widgets.Menu");
$_M(c$,"setRadioFocus",
function(){
return false;
});
$_M(c$,"setRadioSelection",
function(value){
return false;
},"~B");
$_M(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setSavedFocus",
function(){
return this.forceFocus();
});
$_M(c$,"setSize",
function(width,height){
var flags=0;
this.setBounds(0,0,Math.max(0,width),Math.max(0,height),flags);
},"~N,~N");
$_M(c$,"setSize",
function(size){
System.err.println(size);
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setTabGroupFocus",
function(){
return this.setTabItemFocus();
});
$_M(c$,"setTabItemFocus",
function(){
if(!this.isShowing())return false;
return this.forceFocus();
});
$_M(c$,"setToolTipText",
function(string){
var shell=this.getShell();
shell.setToolTipText(this.handle,this.toolTipText=string);
},"~S");
$_M(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if((this.handle.style.visibility!="hidden")==visible)return;
}if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}var control=null;
var fixFocus=false;
if(!visible){
if(this.display.focusEvent!=16){
control=this.display.getFocusControl();
fixFocus=this.isFocusAncestor(control);
}}if(this.drawCount!=0){
this.state=visible?this.state&-17:this.state|16;
}else{
this.showWidget(visible);
if(this.isDisposed())return;
}if(!visible){
this.sendEvent(23);
if(this.isDisposed())return;
}if(fixFocus)this.fixFocus(control);
},"~B");
$_M(c$,"sort",
function(items){
var length=items.length;
for(var gap=Math.floor(length/ 2); gap > 0; gap /=2){
for(var i=gap;i<length;i++){
for(var j=i-gap;j>=0;j-=gap){
if(items[j]<=items[j+gap]){
var swap=items[j];
items[j]=items[j+gap];
items[j+gap]=swap;
}}
}
}
},"~A");
$_M(c$,"toControl",
function(x,y){
return new $wt.graphics.Point(x,y);
},"~N,~N");
$_M(c$,"toControl",
function(point){
return this.toControl(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"toDisplay",
function(x,y){
return new $wt.graphics.Point(x,y);
},"~N,~N");
$_M(c$,"toDisplay",
function(point){
return this.toDisplay(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"topHandle",
function(){
return this.handle;
});
$_M(c$,"traverse",
function(event){
this.sendEvent(31,event);
if(this.isDisposed())return true;
if(!event.doit)return false;
switch(event.detail){
case 0:
return true;
case 2:
return this.traverseEscape();
case 4:
return this.traverseReturn();
case 16:
return this.traverseGroup(true);
case 8:
return this.traverseGroup(false);
case 64:
return this.traverseItem(true);
case 32:
return this.traverseItem(false);
case 128:
return this.traverseMnemonic(event.character);
case 512:
return this.traversePage(true);
case 256:
return this.traversePage(false);
}
return false;
},"$wt.widgets.Event");
$_M(c$,"traverse",
function(traversal){
var event=new $wt.widgets.Event();
event.doit=true;
event.detail=traversal;
return this.traverse(event);
},"~N");
$_M(c$,"traverseEscape",
function(){
return false;
});
$_M(c$,"traverseGroup",
function(next){
var root=this.computeTabRoot();
var group=this.computeTabGroup();
var list=root.computeTabList();
var length=list.length;
var index=0;
while(index<length){
if(list[index]==group)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=((index+offset+length)%length))!=start){
var control=list[index];
if(!control.isDisposed()&&control.setTabGroupFocus()){
return true;
}}
if(group.isDisposed())return false;
return group.setTabGroupFocus();
},"~B");
$_M(c$,"traverseItem",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]==this)break;
index++;
}
if(index==length)return false;
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&child.isTabItem()){
if(child.setTabItemFocus())return true;
}}
return false;
},"~B");
$_M(c$,"traverseMnemonic",
function(key){
return this.mnemonicHit(key);
},"~N");
$_M(c$,"traversePage",
function(next){
return false;
},"~B");
$_M(c$,"traverseReturn",
function(){
return false;
});
$_M(c$,"update",
function(){
this.update(false);
});
$_M(c$,"update",
function(all){
},"~B");
$_M(c$,"updateFont",
function(oldFont,newFont){
var sameFont=this.getFont().equals(oldFont);
if(sameFont)this.setFont(newFont);
return sameFont;
},"$wt.graphics.Font,$wt.graphics.Font");
$_M(c$,"updateLayout",
function(resize,all){
},"~B,~B");
$_M(c$,"widgetParent",
function(){
if(this.parent==null){
return null;
}return this.parent.handle;
});
$_M(c$,"setParent",
function(parent){
if(this.parent==parent)return true;
if(!this.isReparentable())return false;
this.releaseChild();
var newShell=parent.getShell();
var oldShell=this.getShell();
var newDecorations=parent.menuShell();
var oldDecorations=this.menuShell();
if(oldShell!=newShell||oldDecorations!=newDecorations){
var menus=oldShell.findMenus(this);
this.fixChildren(newShell,oldShell,newDecorations,oldDecorations,menus);
}this.parent=parent;
return true;
},"$wt.widgets.Composite");
c$=$_C(function(){
this.horizontalBar=null;
this.verticalBar=null;
$_Z(this,arguments);
},$wt.widgets,"Scrollable",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Scrollable,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"computeTrim",
function(x,y,width,height){
var border=this.getBorderWidth();
return new $wt.graphics.Rectangle(x-border,y-border,width+border*2,height+border*2);
},"~N,~N,~N,~N");
$_M(c$,"createScrollBar",
function(type){
var bar=new $wt.widgets.ScrollBar(this,type);
if((this.state&2)!=0){
bar.setMaximum(100);
bar.setThumb(10);
}return bar;
},"~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Scrollable,"createWidget",[]);
if((this.style&256)!=0)this.horizontalBar=this.createScrollBar(256);
if((this.style&512)!=0)this.verticalBar=this.createScrollBar(512);
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var w=-1;
var h=-1;
w=this.width;
h=this.height;
if(w<0){
w=64;
}if(h<0){
h=64;
}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"releaseHandle",
function(){
if(this.horizontalBar!=null){
this.horizontalBar.releaseHandle();
this.horizontalBar=null;
}if(this.verticalBar!=null){
this.verticalBar.releaseHandle();
this.verticalBar=null;
}$_U(this,$wt.widgets.Scrollable,"releaseHandle",[]);
});
$_M(c$,"getHorizontalBar",
function(){
return this.horizontalBar;
});
$_M(c$,"getVerticalBar",
function(){
return this.verticalBar;
});
$_M(c$,"releaseWidget",
function(){
if(this.horizontalBar!=null)this.horizontalBar.releaseResources();
if(this.verticalBar!=null)this.verticalBar.releaseResources();
this.horizontalBar=this.verticalBar=null;
$_U(this,$wt.widgets.Scrollable,"releaseWidget",[]);
});
$_M(c$,"scrolledHandle",
function(){
return this.handle;
});
$_M(c$,"windowClass",
function(){
return"DIV";
});
c$=$_C(function(){
this.$layout=null;
this.lpwp=null;
this.tabList=null;
this.layoutCount=0;
this.children=null;
$_Z(this,arguments);
},$wt.widgets,"Composite",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Composite,[parent,style]);
this.children=new Array(0);
},"$wt.widgets.Composite,~N");
$_M(c$,"_getChildren",
function(){
var count=this.children.length;
var index=0;
var newChildren=new Array(0);
for(var i=0;i<count;i++){
var control=this.children[i];
if(control!=null&&control!=this){
newChildren[index++]=control;
}}
return newChildren;
});
$_M(c$,"_getTabList",
function(){
if(this.tabList==null)return this.tabList;
var count=0;
for(var i=0;i<this.tabList.length;i++){
if(!this.tabList[i].isDisposed())count++;
}
if(count==this.tabList.length)return this.tabList;
var newList=new Array(count);
var index=0;
for(var i=0;i<this.tabList.length;i++){
if(!this.tabList[i].isDisposed()){
newList[index++]=this.tabList[i];
}}
this.tabList=newList;
return this.tabList;
});
$_M(c$,"changed",
function(changed){
for(var i=0;i<changed.length;i++){
var control=changed[i];
var ancestor=false;
var composite=control.parent;
while(composite!=null){
ancestor=composite==this;
if(ancestor)break;
composite=composite.parent;
}
}
for(var i=0;i<changed.length;i++){
var child=changed[i];
var composite=child.parent;
while(child!=this){
if(composite.$layout==null||!composite.$layout.flushCache(child)){
composite.state|=64;
}child=composite;
composite=child.parent;
}
}
},"~A");
$_V(c$,"checkBuffered",
function(){
});
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeTabList",
function(){
var result=$_U(this,$wt.widgets.Composite,"computeTabList",[]);
if(result.length==0)return result;
var list=this.tabList!=null?this._getTabList():this._getChildren();
for(var i=0;i<list.length;i++){
var child=list[i];
var childList=child.computeTabList();
if(childList.length!=0){
var newResult=new Array(result.length+childList.length);
System.arraycopy(result,0,newResult,0,result.length);
System.arraycopy(childList,0,newResult,result.length,childList.length);
result=newResult;
}}
return result;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size;
if(this.$layout!=null){
if(wHint==-1||hHint==-1){
changed=new Boolean(changed|((this.state&64)!=0));
this.state&=-65;
size=this.$layout.computeSize(this,wHint,hHint,changed);
}else{
size=new $wt.graphics.Point(wHint,hHint);
}}else{
size=this.minimumSize(wHint,hHint,changed);
}if(size.x==0)size.x=64;
if(size.y==0)size.y=64;
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
var trim=this.computeTrim(0,0,size.x,size.y);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_M(c$,"containerHandle",
function(){
return this.handle;
});
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="composite-default";
if((this.style&2048)!=0){
this.handle.className+=" composite-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.state|=2;
});
$_M(c$,"findMenus",
function(control){
if(control==this)return new Array(0);
var result=$_U(this,$wt.widgets.Composite,"findMenus",[control]);
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
var menuList=child.findMenus(control);
if(menuList.length!=0){
var newResult=new Array(result.length+menuList.length);
System.arraycopy(result,0,newResult,0,result.length);
System.arraycopy(menuList,0,newResult,result.length,menuList.length);
result=newResult;
}}
return result;
},"$wt.widgets.Control");
$_M(c$,"fixChildren",
function(newShell,oldShell,newDecorations,oldDecorations,menus){
$_U(this,$wt.widgets.Composite,"fixChildren",[newShell,oldShell,newDecorations,oldDecorations,menus]);
var children=this._getChildren();
for(var i=0;i<children.length;i++){
children[i].fixChildren(newShell,oldShell,newDecorations,oldDecorations,menus);
}
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixChildrenList",
function(control){
if(this.children==null||this.children.length==0)return;
var newChildren=new Array(0);
for(var i=0;i<this.children.length;i++){
var child=this.children[i];
if(child!=null&&child!=control){
newChildren[newChildren.length]=child;
}}
this.children=newChildren;
},"$wt.widgets.Control");
$_M(c$,"fixTabList",
function(control){
if(this.tabList==null)return;
var count=0;
for(var i=0;i<this.tabList.length;i++){
if(this.tabList[i]==control)count++;
}
if(count==0)return;
var newList=null;
var length=this.tabList.length-count;
if(length!=0){
newList=new Array(length);
var index=0;
for(var i=0;i<this.tabList.length;i++){
if(this.tabList[i]!=control){
newList[index++]=this.tabList[i];
}}
}this.tabList=newList;
},"$wt.widgets.Control");
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getChildren",
function(){
return this._getChildren();
});
$_M(c$,"getChildrenCount",
function(){
if(true)return 0;
return this.children.length;
});
$_M(c$,"getLayout",
function(){
return this.$layout;
});
$_M(c$,"getTabList",
function(){
var tabList=this._getTabList();
if(tabList==null){
var count=0;
var list=this._getChildren();
for(var i=0;i<list.length;i++){
if(list[i].isTabGroup())count++;
}
tabList=new Array(count);
var index=0;
for(var i=0;i<list.length;i++){
if(list[i].isTabGroup()){
tabList[index++]=list[i];
}}
}return tabList;
});
$_M(c$,"hooksKeys",
function(){
return this.hooks(1)||this.hooks(2);
});
$_M(c$,"getLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_M(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0||this.parent.isLayoutDeferred();
});
$_M(c$,"layout",
function(){
this.layout(true);
});
$_M(c$,"layout",
function(changed){
if(this.$layout==null)return;
this.layout(changed,true);
},"~B");
$_M(c$,"layout",
function(changed,all){
if(this.$layout==null&&!all)return;
this.markLayout(changed,all);
this.updateLayout(true,all);
},"~B,~B");
$_M(c$,"layout",
function(changed){
System.out.print("control");
var d=new java.util.Date();
for(var i=0;i<changed.length;i++){
var control=changed[i];
var ancestor=false;
var composite=control.parent;
while(composite!=null){
ancestor=composite==this;
if(ancestor)break;
composite=composite.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
var updateCount=0;
var update=new Array(16);
for(var i=0;i<changed.length;i++){
var child=changed[i];
var composite=child.parent;
while(child!=this){
if(composite.$layout!=null){
composite.state|=32;
if(!composite.$layout.flushCache(child)){
composite.state|=64;
}}if(updateCount==update.length){
var newUpdate=new Array(update.length+16);
System.arraycopy(update,0,newUpdate,0,update.length);
update=newUpdate;
}child=update[updateCount++]=composite;
composite=child.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
for(var i=updateCount-1;i>=0;i--){
update[i].updateLayout(true,false);
}
System.out.println(":::"+(new java.util.Date().getTime()-d.getTime()));
d=new java.util.Date();
},"~A");
$_M(c$,"markLayout",
function(changed,all){
if(this.$layout!=null){
this.state|=32;
if(changed)this.state|=64;
}if(all){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
children[i].markLayout(changed,all);
}
}},"~B,~B");
$_M(c$,"minimumSize",
function(wHint,hHint,changed){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var rect=children[i].getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"releaseChildren",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(!child.isDisposed())child.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseChildren();
$_U(this,$wt.widgets.Composite,"releaseWidget",[]);
if((this.state&2)!=0&&(this.style&16777216)!=0){
}this.children=null;
this.$layout=null;
this.tabList=null;
if(this.lpwp!=null){
for(var i=0;i<this.lpwp.length;i++){
this.lpwp[i].hwnd=null;
this.lpwp[i].hwndInsertAfter=null;
}
}this.lpwp=null;
});
$_M(c$,"removeControl",
function(control){
this.fixTabList(control);
this.fixChildrenList(control);
this.resizeChildren();
},"$wt.widgets.Control");
$_M(c$,"resizeChildren",
function(){
if(this.lpwp==null)return;
do{
var currentLpwp=this.lpwp;
this.lpwp=null;
if(!this.resizeChildren(true,currentLpwp)){
this.resizeChildren(false,currentLpwp);
}}while(this.lpwp!=null);
});
$_M(c$,"resizeChildren",
function(defer,pwp){
if(pwp==null)return true;
var hdwp=0;
if(defer){
if(hdwp==0)return false;
}for(var i=0;i<pwp.length;i++){
var wp=pwp[i];
if(wp!=null){
if(defer){
if(hdwp==0)return false;
}else{
this.SetWindowPos(wp.hwnd,null,wp.x,wp.y,wp.cx,wp.cy,wp.flags);
}}}
return true;
},"~B,~A");
$_M(c$,"setFixedFocus",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setFixedFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFixedFocus",[]);
});
$_M(c$,"setFocus",
function(){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.setFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFocus",[]);
});
$_M(c$,"setLayout",
function(layout){
this.$layout=layout;
},"$wt.widgets.Layout");
$_M(c$,"setLayoutDeferred",
function(defer){
if(!defer){
if(--this.layoutCount==0){
if(!this.isLayoutDeferred())this.updateLayout(true,true);
}}else{
this.layoutCount++;
}},"~B");
$_M(c$,"setTabList",
function(tabList){
if(tabList!=null){
for(var i=0;i<tabList.length;i++){
var control=tabList[i];
}
var newList=new Array(tabList.length);
System.arraycopy(tabList,0,newList,0,tabList.length);
tabList=newList;
}this.tabList=tabList;
},"~A");
$_M(c$,"setResizeChildren",
function(resize){
if(resize){
this.resizeChildren();
}else{
var count=this.getChildrenCount();
if(count>1&&this.lpwp==null){
this.lpwp=new Array(count);
}}},"~B");
$_V(c$,"setTabGroupFocus",
function(){
if(this.isTabItem())return this.setTabItemFocus();
var takeFocus=(this.style&524288)==0;
if((this.state&2)!=0){
takeFocus=this.hooksKeys();
if((this.style&16777216)!=0)takeFocus=true;
}if(takeFocus&&this.setTabItemFocus())return true;
var children=this._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.isTabItem()&&child.setRadioFocus())return true;
}
for(var i=0;i<children.length;i++){
var child=children[i];
if(child.isTabItem()&&child.setTabItemFocus())return true;
}
return false;
});
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_V(c$,"updateLayout",
function(resize,all){
if(this.isLayoutDeferred())return;
if((this.state&32)!=0){
var changed=(this.state&64)!=0;
this.state&=-97;
if(resize)this.setResizeChildren(false);
this.$layout.layout(this,changed);
if(resize)this.setResizeChildren(true);
}if(all){
var children=this._getChildren();
for(var i=0;i<children.length;i++){
if($_O(children[i],$wt.widgets.Composite)){
this.display.sendMessage(new $wt.internal.struct.MESSAGE(children[i],2,[resize,all]));
}}
}},"~B,~B");
c$=$_C(function(){
this.caret=null;
$_Z(this,arguments);
},$wt.widgets,"Canvas",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Canvas,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"clearArea",
function(x,y,width,height){
},"~N,~N,~N,~N");
$_M(c$,"getCaret",
function(){
return this.caret;
});
$_M(c$,"releaseWidget",
function(){
if(this.caret!=null)this.caret.releaseResources();
this.caret=null;
$_U(this,$wt.widgets.Canvas,"releaseWidget",[]);
});
$_M(c$,"scroll",
function(destX,destY,x,y,width,height,all){
this.forceResize();
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"setCaret",
function(caret){
var newCaret=caret;
this.caret=newCaret;
},"$wt.widgets.Caret");
$_M(c$,"setFont",
function(font){
if(this.caret!=null)this.caret.setFont(font);
$_U(this,$wt.widgets.Canvas,"setFont",[font]);
},"$wt.graphics.Font");
c$=$_C(function(){
this.image=null;
this.smallImage=null;
this.largeImage=null;
this.images=null;
this.menuBar=null;
this.menus=null;
this.savedFocus=null;
this.defaultButton=null;
this.saveDefault=null;
this.moved=false;
this.resized=false;
this.opened=false;
this.contentHandle=null;
this.shellTitle=null;
this.modalHandle=null;
this.oldBounds=null;
this.shellMin=null;
this.shellMax=null;
this.shellIcon=null;
this.titleBar=null;
this.shellClose=null;
$_Z(this,arguments);
},$wt.widgets,"Decorations",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Decorations,[parent,$wt.widgets.Decorations.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addMenu",
function(menu){
if(this.menus==null)this.menus=new Array(4);
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]==null){
this.menus[i]=menu;
return;
}}
var newMenus=new Array(this.menus.length+4);
newMenus[this.menus.length]=menu;
System.arraycopy(this.menus,0,newMenus,0,this.menus.length);
this.menus=newMenus;
},"$wt.widgets.Menu");
$_M(c$,"bringToTop",
function(){
this.handle.style.visibility="visible";
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8)!=0){
style&=-3313;
}if((style&(1216))!=0){
style|=32;
}if((style&(1152))!=0)style|=64;
if((style&64)!=0)style|=32;
return style;
},"~N");
$_V(c$,"checkBorder",
function(){
});
$_V(c$,"checkOpened",
function(){
if(!this.opened)this.resized=false;
});
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"closeWidget",
function(){
var event=new $wt.widgets.Event();
event.doit=true;
this.sendEvent(21,event);
if(event.doit&&!this.isDisposed())this.dispose();
});
$_V(c$,"computeTabGroup",
function(){
return this;
});
$_V(c$,"computeTabRoot",
function(){
return this;
});
$_V(c$,"containerHandle",
function(){
return this.contentHandle;
});
$_V(c$,"computeTrim",
function(x,y,width,height){
if((this.style&8)==0){
if((this.style&(1248))!=0){
height+=20;
if(width<105){
width=105;
}}if((this.style&(3296))!=0){
width+=8;
height+=8;
x-=4;
y-=4;
}else{
width+=4;
height+=4;
x-=2;
y-=2;
}}System.err.println(new $wt.graphics.Rectangle(x,y,width,height));
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createAccelerators",
function(){
});
$_M(c$,"createIcon",
function(image){
return null;
},"$wt.graphics.Image");
$_M(c$,"createCSSDiv",
($fz=function(css){
var el=d$.createElement("DIV");
el.className=css;
this.handle.appendChild(el);
return el;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"createResizeHandles",
($fz=function(){
var handles=["shell-left-top","shell-right-top","shell-center-top","shell-left-middle","shell-right-middle","shell-center-middle","shell-left-bottom","shell-right-bottom","shell-center-bottom"];
for(var i=0;i<handles.length;i++){
this.createCSSDiv(handles[i]);
}
},$fz.isPrivate=true,$fz));
$_V(c$,"createHandle",
function(){
if((this.style&65536)!=0||(this.style&32768)!=0){
this.display.timerExec(25,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].addModalLayer();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$1,i$,v$);
})(this,null));
}this.handle=d$.createElement("DIV");
this.handle.className="shell-default";
this.nextWindowLocation();
this.width=768;
this.height=557;
if(new Boolean((this.style&8)==0&(this.style&16)!=0)){
this.handle.className+=" shell-trim";
}d$.body.appendChild(this.handle);
if((this.style&8)==0&&(this.style&16)!=0){
this.createResizeHandles();
}if((this.style&8)==0&&(this.style&(1248))!=0){
this.setSystemMenu();
}this.contentHandle=this.createCSSDiv("shell-content");
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$2",$wt.internal.dnd.ShellFrameDND);
$_M(c$,"isDraggable",
function(e){
if($_U(this,$wt.widgets.Decorations$2,"isDraggable",[e])){
var cssName=e.target.className;
if(cssName.indexOf("shell-title-text")!=-1&&this.b$["$wt.widgets.Decorations"].oldBounds!=null){
return false;
}return true;
}else{
return false;
}},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"updateShellBounds",
function(x,y,width,height){
this.b$["$wt.widgets.Decorations"].setBounds(x,y,width,height);
return true;
},"~N,~N,~N,~N");
c$=$_P();
}
return $_N($wt.widgets.Decorations$2,i$,v$);
})(this,null));
dnd.bind(this.handle);
});
$_M(c$,"nextWindowLocation",
($fz=function(){
if(w$.defaultWindowLeft==null){
w$.defaultWindowLeft="332";
}else{
var num=Integer.parseInt(""+w$.defaultWindowLeft);
num+=32;
if(num>d$.body.clientWidth){
num=32;
}w$.defaultWindowLeft=""+num;
}if(w$.defaultWindowTop==null){
w$.defaultWindowTop="32";
}else{
var num=Integer.parseInt(""+w$.defaultWindowTop);
num+=32;
if(num>d$.body.clientHeight){
num=32;
}w$.defaultWindowTop=""+num;
}if(w$.defaultWindowWidth==null){
w$.defaultWindowWidth="768";
}if(w$.defaultWindowHeight==null){
w$.defaultWindowHeight="557";
}this.left=Integer.parseInt(w$.defaultWindowLeft);
this.top=Integer.parseInt(w$.defaultWindowTop);
this.width=Integer.parseInt(w$.defaultWindowWidth);
this.height=Integer.parseInt(w$.defaultWindowHeight);
},$fz.isPrivate=true,$fz));
$_M(c$,"addModalLayer",
function(){
this.modalHandle=d$.createElement("DIV");
this.modalHandle.className="shell-modal-block";
this.modalHandle.style.zIndex=""+(Integer.parseInt(""+this.handle.style.zIndex)-1);
d$.body.insertBefore(this.modalHandle,this.handle);
});
$_M(c$,"exportHTMLSource",
function(){
var shell=new $wt.widgets.Shell(this.display,66800);
shell.setText("Export HTML Source");
var b=this.contentHandle.innerHTML;
if($wt.internal.browser.OS.isIE){
b=b.replace(/(<\/?)(\w+)(\s|>)/ig,function($0,$1,$2,$3){
return $1+$2.toLowerCase()+$3;
}).replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
if(!((/;$/).test($2))){
$2+=";";
}
return"style=\"" + $2.toLowerCase ().replace (/(:|;)\s+/g, "$1") + "\"";
}).replace(/(\s+(\w+)\s*=\s*)([^\"\s>]+)(\s|>)/ig,function($0,$1,$2,$3,$4){
return" "+$2+"=\"" + $3 + "\""+$4;



});
}else{
b=b.replace(/(style\s*=\s*")([^"]+)(")/ig,function($0,$1,$2,$3){
return"style=\"" + $2.replace (/(:|;)\s+/g, "$1") + "\"";
});
}{
b=b.replace(/(\sclass\s*=\s*)"([^"]*)"(\s|>)/ig,function($0,$1,$2,$3){
$2=$2.replace(/\s\s+/g,' ').replace(/^\s+/,'').replace(/\s+$/g,'');
if($2.length==0){
if($3!=">"){
return $3;
}else{
return">";
}
}else{
return" class=\"" + $2 + "\""+$3;
}
});
}shell.setLayout(new $wt.layout.GridLayout());
var text=new $wt.widgets.Text(shell,2570);
var gd=new $wt.layout.GridData(1808);
gd.widthHint=400;
gd.heightHint=275;
text.setLayoutData(gd);
var rect=this.getClientArea();
var html="<div class=\"shell-content\" style=\"" + "width:" + rect.width + "px;height:" + rect.height + "px;\">"+b+"</div>";
text.setText(html);
new $wt.widgets.Label(shell,258).setLayoutData(new $wt.layout.GridData(768));
var button=new $wt.widgets.Button(shell,8);
button.setText("&OK");
var gridData=new $wt.layout.GridData(128);
gridData.widthHint=80;
button.setLayoutData(gridData);
button.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$3",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.shell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Decorations$3,i$,v$);
})(this,$_F("shell",shell)));
shell.pack();
shell.open();
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Decorations,"createWidget",[]);
});
$_M(c$,"destroyAccelerators",
function(){
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
if(!($_O(this,$wt.widgets.Shell))){
this.setVisible(false);
if(!this.traverseDecorations(false)){
var shell=this.getShell();
shell.setFocus();
}}$_U(this,$wt.widgets.Decorations,"dispose",[]);
});
$_M(c$,"findMenu",
function(hMenu){
if(this.menus==null)return null;
for(var i=0;i<this.menus.length;i++){
var menu=this.menus[i];
if(menu!=null&&hMenu==menu.$handle)return menu;
}
return null;
},"$wt.internal.xhtml.Element");
$_M(c$,"fixDecorations",
function(newDecorations,control,menus){
if(this==newDecorations)return;
if(control==this.savedFocus)this.savedFocus=null;
if(control==this.defaultButton)this.defaultButton=null;
if(control==this.saveDefault)this.saveDefault=null;
if(menus==null)return;
var menu=control.menu;
if(menu!=null){
var index=0;
while(index<menus.length){
if(menus[index]==menu){
control.setMenu(null);
return;
}index++;
}
menu.fixMenus(newDecorations);
this.destroyAccelerators();
newDecorations.destroyAccelerators();
}},"$wt.widgets.Decorations,$wt.widgets.Control,~A");
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Decorations,"getBounds",[]);
});
$_M(c$,"minable",
($fz=function(){
return(this.style&128)!=0&&((this.style&2048)==0||(this.style&16)!=0);
},$fz.isPrivate=true,$fz));
$_V(c$,"getBorderWidth",
function(){
return(this.style&8)!=0?1:0;
});
$_V(c$,"getClientArea",
function(){
var w=this.width;
var h=this.height;
if((this.style&(1248))!=0){
h-=20;
w-=8;
h-=8;
if((this.style&2048)!=0){
w-=4;
h-=4;
}}return new $wt.graphics.Rectangle(0,0,w,h);
});
$_M(c$,"getDefaultButton",
function(){
return this.defaultButton;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getImages",
function(){
if(this.images==null)return new Array(0);
var result=new Array(this.images.length);
System.arraycopy(this.images,0,result,0,this.images.length);
return result;
});
$_V(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.left,this.top);
});
$_M(c$,"getMaximized",
function(){
return false;
});
$_M(c$,"getMenuBar",
function(){
return this.menuBar;
});
$_M(c$,"getMinimized",
function(){
return false;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSize",
function(){
var size=$_U(this,$wt.widgets.Decorations,"getSize",[]);
size.y+=26;
return size;
});
$_M(c$,"getText",
function(){
return null;
});
$_V(c$,"isReparentable",
function(){
return false;
});
$_V(c$,"isTabGroup",
function(){
return true;
});
$_V(c$,"isTabItem",
function(){
return false;
});
$_V(c$,"menuShell",
function(){
return this;
});
$_M(c$,"releaseHandle",
function(){
if(this.shellMin!=null){
BrowserNative.releaseHandle(this.shellMin);
this.shellMin=null;
}if(this.shellMax!=null){
BrowserNative.releaseHandle(this.shellMax);
this.shellMax=null;
}if(this.shellClose!=null){
BrowserNative.releaseHandle(this.shellClose);
this.shellClose=null;
}if(this.shellIcon!=null){
BrowserNative.releaseHandle(this.shellIcon);
this.shellIcon=null;
}if(this.shellTitle!=null){
BrowserNative.releaseHandle(this.shellTitle);
this.shellTitle=null;
}if(this.titleBar!=null){
BrowserNative.releaseHandle(this.titleBar);
this.titleBar=null;
}if(this.contentHandle!=null){
BrowserNative.releaseHandle(this.contentHandle);
this.contentHandle=null;
}if(this.modalHandle!=null){
BrowserNative.releaseHandle(this.modalHandle);
this.modalHandle=null;
}$_U(this,$wt.widgets.Decorations,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
if(this.menuBar!=null)this.menuBar.releaseResources();
this.menuBar=null;
if(this.menus!=null){
do{
var index=0;
while(index<this.menus.length){
var menu=this.menus[index];
if(menu!=null&&!menu.isDisposed()){
while(menu.getParentMenu()!=null){
menu=menu.getParentMenu();
}
menu.dispose();
break;
}index++;
}
if(index==this.menus.length)break;
}while(true);
}this.menus=null;
$_U(this,$wt.widgets.Decorations,"releaseWidget",[]);
if(this.smallImage!=null)this.smallImage.dispose();
if(this.largeImage!=null)this.largeImage.dispose();
this.smallImage=this.largeImage=this.image=null;
this.images=null;
this.savedFocus=null;
this.defaultButton=this.saveDefault=null;
});
$_M(c$,"removeMenu",
function(menu){
if(this.menus==null)return;
for(var i=0;i<this.menus.length;i++){
if(this.menus[i]==menu){
this.menus[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"restoreFocus",
function(){
if(this.display.ignoreRestoreFocus)return true;
if(this.savedFocus!=null&&this.savedFocus.isDisposed())this.savedFocus=null;
if(this.savedFocus!=null&&this.savedFocus.setSavedFocus())return true;
return false;
});
$_M(c$,"saveFocus",
function(){
});
$_V(c$,"setBackground",
function(color){
if(color!=null)this.contentHandle.style.backgroundColor=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Decorations,"setBounds",[x,y,width,height,flags,defer]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setDefaultButton",
function(button){
this.setDefaultButton(button,true);
},"$wt.widgets.Button");
$_M(c$,"setDefaultButton",
function(button,save){
if(button==null){
if(this.defaultButton==this.saveDefault){
if(save)this.saveDefault=null;
return;
}}else{
if((button.style&8)==0)return;
if(button==this.defaultButton)return;
}if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(false);
}if((this.defaultButton=button)==null)this.defaultButton=this.saveDefault;
if(this.defaultButton!=null){
if(!this.defaultButton.isDisposed())this.defaultButton.setDefault(true);
}if(save)this.saveDefault=this.defaultButton;
if(this.saveDefault!=null&&this.saveDefault.isDisposed())this.saveDefault=null;
},"$wt.widgets.Button,~B");
$_V(c$,"setForeground",
function(color){
if(color!=null)this.contentHandle.style.color=color.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setImage",
function(image){
this.image=image;
this.setImages(image,null);
this.image=image;
if(this.shellIcon!=null&&this.image.handle==null){
var iconStyle=this.shellIcon.style;
if(image.url.toLowerCase().endsWith(".png")&&this.contentHandle.style.filter!=null){
iconStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
iconStyle.backgroundRepeat="no-repeat";
iconStyle.backgroundPosition="center center";
iconStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
$_M(c$,"setImages",
function(image,images){
},"$wt.graphics.Image,~A");
$_M(c$,"setImages",
function(images){
for(var i=0;i<images.length;i++){
}
this.images=images;
this.setImage(images[0]);
},"~A");
$_M(c$,"setMaximized",
function(maximized){
if(maximized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var height=d$.body.clientHeight-0;
if(height>w$.screen.availHeight-10){
height=w$.screen.availHeight-10;
}var width=d$.body.clientWidth;
if(width>w$.screen.availWidth){
width=w$.screen.availWidth;
}this.setBounds(this.computeTrim(0,0,width+2,height-18));
d$.body.scrollTop=0;
}if(maximized){
$wt.internal.ResizeSystem.register(this,1024);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"toggleMaximize",
function(){
var key="shell-maximized";
if(this.oldBounds!=null){
this.setBounds(this.oldBounds);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.titleBar.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}this.oldBounds=null;
$wt.internal.ResizeSystem.unregister(this);
}else{
this.setMaximized(true);
var cssName=this.titleBar.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.titleBar.className+=" "+key;
}}});
$_M(c$,"setMenuBar",
function(menu){
if(this.menuBar==menu)return;
if(menu!=null){
}if(this.menuBar==menu)return;
if(menu!=null){
}if(menu!=null)this.display.removeBar(menu);
this.menuBar=menu;
},"$wt.widgets.Menu");
$_M(c$,"setMinimized",
function(minimized){
if(minimized&&this.contentHandle!=null){
if(this.oldBounds==null){
this.oldBounds=this.getBounds();
this.oldBounds.width-=2;
}var width=this.oldBounds.width;
if(width<200){
width=200;
}this.setBounds(-1,d$.body.clientHeight-26,120,0);
}if(minimized){
$wt.internal.ResizeSystem.register(this,128);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setSavedFocus",
function(control){
this.savedFocus=control;
},"$wt.widgets.Control");
$_M(c$,"setSystemMenu",
function(){
this.titleBar=d$.createElement("DIV");
this.titleBar.className="shell-title-bar";
if((this.style&2048)==0||(this.style&16)!=0){
this.shellIcon=d$.createElement("DIV");
this.shellIcon.className="shell-title-icon";
this.titleBar.appendChild(this.shellIcon);
this.shellIcon.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].exportHTMLSource();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$4,i$,v$);
})(this,null));
}if(this.minable()){
this.shellMin=d$.createElement("DIV");
this.shellMin.className="shell-title-min";
this.titleBar.appendChild(this.shellMin);
this.shellMin.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
$wt.internal.ResizeSystem.unregister(this.b$["$wt.widgets.Decorations"]);
this.b$["$wt.widgets.Decorations"].setMinimized(true);
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$5,i$,v$);
})(this,null));
}if((this.style&1024)!=0){
this.shellMax=d$.createElement("DIV");
this.shellMax.className="shell-title-normal-max";
this.titleBar.appendChild(this.shellMax);
this.shellMax.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].toggleMaximize();
this.b$["$wt.widgets.Decorations"].display.timerExec(25,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$6$7",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].layout();
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$6$7,i$,v$);
})(this,null));
});
c$=$_P();
}
return $_N($wt.widgets.Decorations$6,i$,v$);
})(this,null));
}if((this.style&64)!=0){
this.shellClose=d$.createElement("DIV");
this.shellClose.className="shell-title-close";
this.titleBar.appendChild(this.shellClose);
this.shellClose.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if($_O(this.b$["$wt.widgets.Decorations"],$wt.widgets.Shell)){
var shell=this.b$["$wt.widgets.Decorations"];
shell.close();
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$8,i$,v$);
})(this,null));
}this.shellTitle=d$.createElement("DIV");
this.shellTitle.className="shell-title-text";
this.titleBar.appendChild(this.shellTitle);
if((this.style&1024)!=0){
this.titleBar.ondblclick=this.shellMax.onclick;
}this.handle.appendChild(this.titleBar);
this.titleBar.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var fHandleStyle=this.b$["$wt.widgets.Decorations"].handle.style;
if(fHandleStyle.zIndex!=w$.currentTopZIndex){
fHandleStyle.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$9,i$,v$);
})(this,null));
if(w$.currentTopZIndex==null){
this.handle.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.handle.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
$_M(c$,"setText",
function(string){
if(this.shellTitle!=null&&this.shellTitle.childNodes!=null){
for(var i=this.shellTitle.childNodes.length-1;i>=0;i--){
if(this.shellTitle.childNodes[i]!=null){
this.shellTitle.removeChild(this.shellTitle.childNodes[i]);
}}
this.shellTitle.appendChild(d$.createTextNode(string));
}},"~S");
$_V(c$,"setVisible",
function(visible){
if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if(visible==(this.contentHandle.style.visibility!="hidden"))return;
}if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}else{
if(this.isDisposed())return;
this.sendEvent(23);
}},"~B");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&8)==0){
var w=0;
var h=0;
if((this.style&(1248))!=0){
w=113;
h=28;
}if((this.style&2048)!=0){
w+=2;
h+=2;
}if(this.width<w){
this.width=w;
cx=w;
}if(this.height<h){
this.height=h;
cy=h;
}}if((this.style&8)!=0){
this.contentHandle.style.height=this.height+"px";
this.contentHandle.style.width=this.width+"px";
}else if(this.titleBar!=null){
var dw=8;
var dh=28;
var dww=8;
if((this.style&2048)!=0){
dw+=2;
dh+=3;
dww+=2;
}this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=((this.width-dw)>0?this.width-dw:0)+"px";
this.titleBar.style.width=((this.width-dww)>0?this.width-dww:0)+"px";
var ww=18;
var w=ww;
if(this.shellClose!=null){
this.shellClose.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMax!=null){
this.shellMax.style.left=(this.width-8-2-w)+"px";
w+=ww;
}if(this.shellMin!=null){
this.shellMin.style.left=(this.width-8-2-w)+"px";
w+=ww;
}w-=ww;
if(this.shellIcon!=null){
this.shellIcon.style.left=2+"px";
this.shellTitle.style.left=(4+ww)+"px";
w+=ww;
}else{
this.shellTitle.style.left=4+"px";
}this.shellTitle.style.width=(this.width-8-8-w)+"px";
}else{
this.width-=4;
this.height-=4;
cx-=4;
cy-=4;
var dw=7;
var dh=7;
this.contentHandle.style.height=((this.height-dh>=0)?this.height-dh:0)+"px";
this.contentHandle.style.width=(this.width-dw>0?this.width-dw:0)+"px";
this.contentHandle.style.top=2+"px";
this.contentHandle.style.marginRight=1+"px";
}if((this.style&2048)!=0){
cx-=4;
cy-=4;
}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"traverseDecorations",
function(next){
var children=this.parent._getChildren();
var length=children.length;
var index=0;
while(index<length){
if(children[index]==this)break;
index++;
}
var start=index;
var offset=(next)?1:-1;
while((index=(index+offset+length)%length)!=start){
var child=children[index];
if(!child.isDisposed()&&$_O(child,$wt.widgets.Decorations)){
if(child.setFocus())return true;
}}
return false;
},"~B");
c$=$_C(function(){
this.activeMenu=null;
this.minWidth=-1;
this.minHeight=-1;
this.showWithParent=false;
this.lastActive=null;
this.region=null;
$_Z(this,arguments);
},$wt.widgets,"Shell",$wt.widgets.Decorations);
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(style){
this.construct(null,style);
},"~N");
$_K(c$,
function(display){
this.construct(display,1264);
},"$wt.widgets.Display");
$_K(c$,
function(display,style){
this.construct(display,null,style,0);
},"$wt.widgets.Display,~N");
$_K(c$,
function(display,parent,style,handle){
this.checkSubclass();
this.children=new Array(0);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.style=$wt.widgets.Shell.checkStyle(style);
this.parent=parent;
this.display=display;
this.createWidget();
},"$wt.widgets.Display,$wt.widgets.Shell,~N,~N");
$_K(c$,
function(parent){
this.construct(parent,2144);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.construct(parent!=null?parent.display:null,parent,style,0);
},"$wt.widgets.Shell,~N");
c$.win32_new=$_M(c$,"win32_new",
function(display,handle){
return new $wt.widgets.Shell(display,null,8,handle);
},"$wt.widgets.Display,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Decorations.checkStyle(style);
var mask=229376;
var bits=style&~mask;
if((style&131072)!=0)return bits|131072;
if((style&65536)!=0)return bits|65536;
if((style&32768)!=0)return bits|32768;
return bits;
},"~N");
$_M(c$,"addShellListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(21,typedListener);
this.addListener(19,typedListener);
this.addListener(20,typedListener);
this.addListener(26,typedListener);
this.addListener(27,typedListener);
},"$wt.events.ShellListener");
$_M(c$,"close",
function(){
this.closeWidget();
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Shell,"createHandle",[]);
});
$_M(c$,"dispose",
function(){
$_U(this,$wt.widgets.Shell,"dispose",[]);
});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}},"~B");
$_V(c$,"findCursor",
function(){
return this.cursor;
});
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"fixShell",
function(newShell,control){
if(this==newShell)return;
if(control==this.lastActive)this.setActiveControl(null);
newShell.setToolTipText(control.handle,control.toolTipText);
},"$wt.widgets.Shell,$wt.widgets.Control");
$_M(c$,"forceActive",
function(){
if(!this.isVisible())return;
});
$_V(c$,"forceResize",
function(){
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Shell,"getBounds",[]);
});
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getImeInputMode",
function(){
return 0;
});
$_M(c$,"getLocation",
function(){
return $_U(this,$wt.widgets.Shell,"getLocation",[]);
});
$_M(c$,"getMinimumSize",
function(){
var width=Math.max(0,this.minWidth);
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
width=Math.max(width,80);
}var height=Math.max(0,this.minHeight);
if((this.style&8)==0&&(this.style&trim)!=0){
if((this.style&16)!=0){
height=Math.max(height,24);
}else{
height=Math.max(height,24);
}}if((this.style&8)!=0){
return new $wt.graphics.Point(this.minWidth,Math.max(this.minHeight-24,0));
}return new $wt.graphics.Point(width,height);
});
$_M(c$,"getRegion",
function(){
return this.region;
});
$_V(c$,"getShell",
function(){
return this;
});
$_M(c$,"getSize",
function(){
return $_U(this,$wt.widgets.Shell,"getSize",[]);
});
$_M(c$,"getShells",
function(){
var count=0;
var shells=this.display.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this)count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!=this);
if(shell==this){
result[index++]=shells[i];
}}
return result;
});
$_V(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_V(c$,"isEnabled",
function(){
return this.getEnabled();
});
$_V(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"open",
function(){
this.bringToTop();
if(this.isDisposed())return;
this.setVisible(true);
if(this.isDisposed())return;
this.layout();
});
$_V(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Shell,"releaseHandle",[]);
});
$_M(c$,"releaseShells",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseShells();
$_U(this,$wt.widgets.Shell,"releaseWidget",[]);
this.activeMenu=null;
this.display.clearModal(this);
this.lastActive=null;
this.region=null;
});
$_M(c$,"removeMenu",
function(menu){
$_U(this,$wt.widgets.Shell,"removeMenu",[menu]);
if(menu==this.activeMenu)this.activeMenu=null;
},"$wt.widgets.Menu");
$_M(c$,"removeShellListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(21,listener);
this.eventTable.unhook(19,listener);
this.eventTable.unhook(20,listener);
this.eventTable.unhook(26,listener);
this.eventTable.unhook(27,listener);
},"$wt.events.ShellListener");
$_M(c$,"setActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_M(c$,"setActiveControl",
function(control){
if(control!=null&&control.isDisposed())control=null;
if(this.lastActive!=null&&this.lastActive.isDisposed())this.lastActive=null;
if(this.lastActive==control)return;
var activate=(control==null)?new Array(0):control.getPath();
var deactivate=(this.lastActive==null)?new Array(0):this.lastActive.getPath();
this.lastActive=control;
var index=0;
var length=Math.min(activate.length,deactivate.length);
while(index<length){
if(activate[index]!=deactivate[index])break;
index++;
}
for(var i=deactivate.length-1;i>=index;--i){
if(!deactivate[i].isDisposed()){
deactivate[i].sendEvent(27);
}}
for(var i=activate.length-1;i>=index;--i){
if(!activate[i].isDisposed()){
activate[i].sendEvent(26);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Shell,"setBounds",[x,y,width,height,flags,false]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setEnabled",
function(enabled){
if(((this.state&8)==0)==enabled)return;
$_U(this,$wt.widgets.Shell,"setEnabled",[enabled]);
},"~B");
$_M(c$,"setImeInputMode",
function(mode){
},"~N");
$_M(c$,"setMinimumSize",
function(width,height){
var widthLimit=0;
var heightLimit=0;
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
}this.minWidth=Math.max(widthLimit,width);
this.minHeight=Math.max(heightLimit,height);
var size=this.getSize();
var newWidth=Math.max(size.x,this.minWidth);
var newHeight=Math.max(size.y,this.minHeight);
if(this.minWidth<=widthLimit)this.minWidth=-1;
if(this.minHeight<=heightLimit)this.minHeight=-1;
if(newWidth!=size.x||newHeight!=size.y)this.setSize(newWidth,newHeight);
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setItemEnabled",
function(cmd,enabled){
},"~N,~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setRegion",
function(region){
if((this.style&8)==0)return;
},"$wt.graphics.Region");
$_M(c$,"setToolTipText",
function(hwnd,text){
},"$wt.internal.xhtml.Element,~S");
$_M(c$,"setVisible",
function(visible){
$_U(this,$wt.widgets.Shell,"setVisible",[visible]);
if(visible){
this.SetWindowPos(this.handle,null,this.left,this.top,this.width,this.height,0);
}},"~B");
$_V(c$,"traverseEscape",
function(){
if(this.parent==null)return false;
if(!this.isVisible()||!this.isEnabled())return false;
this.close();
return true;
});
$_M(c$,"updateModal",
function(){
});
c$=$_C(function(){
this.text=null;
this.image=null;
$_Z(this,arguments);
},$wt.widgets,"Item",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Item,[parent,style]);
this.text="";
},"$wt.widgets.Widget,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent,style);
},"$wt.widgets.Widget,~N,~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Item,"releaseWidget",[]);
this.text=null;
this.image=null;
});
$_M(c$,"setImage",
function(image){
this.image=image;
},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
this.text=string;
},"~S");
c$=$_C(function(){
this.parent=null;
this.menu=null;
this.id=0;
this.accelerator=0;
$_Z(this,arguments);
},$wt.widgets,"MenuItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.Menu,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.Menu,~N,~N");
$_K(c$,
function(parent,menu,style,index){
$_R(this,$wt.widgets.MenuItem,[parent,$wt.widgets.MenuItem.checkStyle(style)]);
this.parent=parent;
this.menu=menu;
if(menu!=null)menu.cascade=this;
this.display.addMenuItem(this);
},"$wt.widgets.Menu,$wt.widgets.Menu,~N,~N");
$_M(c$,"addArmListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(30,typedListener);
},"$wt.events.ArmListener");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_V(c$,"checkSubclass",
function(){
});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,32,16,2,64,0);
},"~N");
$_M(c$,"fixMenus",
function(newParent){
if(this.menu!=null)this.menu.fixMenus(newParent);
},"$wt.widgets.Decorations");
$_M(c$,"getAccelerator",
function(){
return this.accelerator;
});
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getEnabled",
function(){
return true;
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getNameText",
function(){
if((this.style&2)!=0)return"|";
return $_U(this,$wt.widgets.MenuItem,"getNameText",[]);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if((this.style&(48))==0)return false;
return false;
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.MenuItem,"releaseChild",[]);
if(this.menu!=null)this.menu.dispose();
this.menu=null;
this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.handle!=null){
BrowserNative.releaseHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.MenuItem,"releaseHandle",[]);
});
$_M(c$,"releaseMenu",
function(){
this.menu=null;
});
$_M(c$,"releaseWidget",
function(){
if(this.menu!=null)this.menu.releaseResources();
this.menu=null;
$_U(this,$wt.widgets.MenuItem,"releaseWidget",[]);
if(this.accelerator!=0){
this.parent.destroyAccelerators();
}this.accelerator=0;
this.display.removeMenuItem(this);
this.parent=null;
});
$_M(c$,"removeArmListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(30,listener);
},"$wt.events.ArmListener");
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var index=0;
var items=this.parent.getItems();
while(index<items.length&&items[index]!=this)index++;

var i=index-1;
while(i>=0&&items[i].setRadioSelection(false))--i;

var j=index+1;
while(j<items.length&&items[j].setRadioSelection(false))j++;

this.setSelection(true);
});
$_M(c$,"setAccelerator",
function(accelerator){
if(this.accelerator==accelerator)return;
this.accelerator=accelerator;
this.parent.destroyAccelerators();
},"~N");
$_M(c$,"setEnabled",
function(enabled){
this.parent.destroyAccelerators();
this.parent.redraw();
},"~B");
$_M(c$,"setImage",
function(image){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.MenuItem,"setImage",[image]);
this.parent.redraw();
},"$wt.graphics.Image");
$_M(c$,"setMenu",
function(menu){
if(menu!=null){
}var oldMenu=this.menu;
if(oldMenu==menu)return;
if(oldMenu!=null)oldMenu.cascade=null;
this.menu=menu;
this.parent.destroyAccelerators();
},"$wt.widgets.Menu");
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSelection",
function(selected){
if((this.style&(48))==0)return;
this.parent.redraw();
},"~B");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.text.equals(string))return;
$_U(this,$wt.widgets.MenuItem,"setText",[string]);
this.parent.redraw();
},"~S");
c$=$_C(function(){
this.$handle=null;
this.x=0;
this.y=0;
this.hwndCB=0;
this.id0=0;
this.id1=0;
this.hasLocation=false;
this.cascade=null;
this.parent=null;
this.imageList=null;
$_Z(this,arguments);
},$wt.widgets,"Menu",$wt.widgets.Widget);
$_K(c$,
function(parent){
this.construct($wt.widgets.Menu.checkNull(parent).menuShell(),8);
},"$wt.widgets.Control");
$_K(c$,
function(parent,style){
this.construct(parent,$wt.widgets.Menu.checkStyle(style),null);
},"$wt.widgets.Decorations,~N");
$_K(c$,
function(parentMenu){
this.construct($wt.widgets.Menu.checkNull(parentMenu).parent,4);
},"$wt.widgets.Menu");
$_K(c$,
function(parentItem){
this.construct($wt.widgets.Menu.checkNull(parentItem).parent);
},"$wt.widgets.MenuItem");
$_K(c$,
function(parent,style,handle){
$_R(this,$wt.widgets.Menu,[parent,$wt.widgets.Menu.checkStyle(style)]);
this.parent=parent;
this.$handle=handle;
this.checkOrientation(parent);
this.createWidget();
},"$wt.widgets.Decorations,~N,$wt.internal.xhtml.Element");
$_M(c$,"_setVisible",
function(visible){
if((this.style&(6))!=0)return;
},"~B");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addMenuListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(23,typedListener);
this.addListener(22,typedListener);
},"$wt.events.MenuListener");
c$.checkNull=$_M(c$,"checkNull",
function(control){
return control;
},"$wt.widgets.Control");
c$.checkNull=$_M(c$,"checkNull",
function(menu){
return menu;
},"$wt.widgets.Menu");
c$.checkNull=$_M(c$,"checkNull",
function(item){
return item;
},"$wt.widgets.MenuItem");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,2,4,0,0,0);
},"~N");
$_M(c$,"createHandle",
function(){
if(this.$handle!=null)return;
this.$handle=d$.createElement("DIV");
if(this.parent.handle!=null){
this.parent.handle.appendChild(this.$handle);
}this.$handle.className="tool-bar-default";
if((this.style&2)!=0){
}else{
}});
$_M(c$,"createItem",
function(item,index){
var count=this.GetMenuItemCount(this.$handle);
this.display.addMenuItem(item);
var success=false;
item.handle=d$.createElement("DIV");
item.handle.className="tool-item-default";
this.$handle.appendChild(item.handle);
this.redraw();
},"$wt.widgets.MenuItem,~N");
$_M(c$,"createWidget",
function(){
this.createHandle();
this.parent.addMenu(this);
});
$_M(c$,"destroyAccelerators",
function(){
this.parent.destroyAccelerators();
});
$_M(c$,"destroyItem",
function(item){
this.redraw();
},"$wt.widgets.MenuItem");
$_V(c$,"destroyWidget",
function(){
this.releaseHandle();
});
$_M(c$,"fixMenus",
function(newParent){
var items=this.getItems();
for(var i=0;i<items.length;i++){
items[i].fixMenus(newParent);
}
this.parent.removeMenu(this);
newParent.addMenu(this);
this.parent=newParent;
},"$wt.widgets.Decorations");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getDefaultItem",
function(){
return null;
});
$_M(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getItem",
function(index){
var id=0;
return this.display.getMenuItem(id);
},"~N");
$_M(c$,"getItemCount",
function(){
return this.GetMenuItemCount(this.$handle);
});
$_M(c$,"getItems",
function(){
return new Array(0);
});
$_M(c$,"GetMenuItemCount",
function(handle){
return 0;
},"$wt.internal.xhtml.Element");
$_V(c$,"getNameText",
function(){
var result="";
var items=this.getItems();
var length=items.length;
if(length>0){
for(var i=0;i<length-1;i++){
result=result+items[i].getNameText()+", ";
}
result=result+items[length-1].getNameText();
}return result;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.cascade;
});
$_M(c$,"getParentMenu",
function(){
if(this.cascade!=null)return this.cascade.parent;
return null;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getVisible",
function(){
if((this.style&2)!=0){
return this==this.parent.menuShell().menuBar;
}if((this.style&8)!=0){
var popups=this.display.popups;
if(popups==null)return false;
for(var i=0;i<popups.length;i++){
if(popups[i]==this)return true;
}
}var shell=this.getShell();
var menu=shell.activeMenu;
while(menu!=null&&menu!=this){
menu=menu.getParentMenu();
}
return this==menu;
});
$_M(c$,"imageIndex",
function(image){
var index=this.imageList.indexOf(image);
if(index==-1){
index=this.imageList.add(image);
}else{
this.imageList.put(index,image);
}return index;
},"$wt.graphics.Image");
$_M(c$,"indexOf",
function(item){
if(item.parent!=this)return-1;
return-1;
},"$wt.widgets.MenuItem");
$_M(c$,"isEnabled",
function(){
var parentMenu=this.getParentMenu();
if(parentMenu==null)return this.getEnabled();
return this.getEnabled()&&parentMenu.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"redraw",
function(){
if(!this.isVisible())return;
if((this.style&2)!=0){
this.display.addBar(this);
}else{
this.update();
}});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Menu,"releaseChild",[]);
if(this.cascade!=null)this.cascade.releaseMenu();
if((this.style&2)!=0){
this.display.removeBar(this);
if(this==this.parent.menuBar){
this.parent.setMenuBar(null);
}}else{
if((this.style&8)!=0){
this.display.removePopup(this);
}}});
$_M(c$,"releaseHandle",
function(){
if(this.$handle!=null){
BrowserNative.releaseHandle(this.$handle);
this.$handle=null;
}$_U(this,$wt.widgets.Menu,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(!item.isDisposed()){
item.dispose();
}}
$_U(this,$wt.widgets.Menu,"releaseWidget",[]);
if(this.parent!=null)this.parent.removeMenu(this);
this.parent=null;
this.cascade=null;
});
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeMenuListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(23,listener);
this.eventTable.unhook(22,listener);
},"$wt.events.MenuListener");
$_M(c$,"setDefaultItem",
function(item){
var newID=-1;
if(item!=null){
if(item.parent!=this)return;
newID=item.id;
}this.redraw();
},"$wt.widgets.MenuItem");
$_M(c$,"setEnabled",
function(enabled){
this.state&=-9;
if(!enabled)this.state|=8;
},"~B");
$_M(c$,"setLocation",
function(x,y){
if((this.style&(6))!=0)return;
this.x=x;
this.y=y;
this.hasLocation=true;
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(visible){
if((this.style&(6))!=0)return;
if(visible){
this.display.addPopup(this);
}else{
this.display.removePopup(this);
this._setVisible(false);
}},"~B");
$_M(c$,"update",
function(){
});
$_S(c$,
"ID_PPC",100,
"ID_SPMM",102,
"ID_SPBM",103,
"ID_SPMB",104,
"ID_SPBB",105,
"ID_SPSOFTKEY0",106,
"ID_SPSOFTKEY1",107);
c$=$_C(function(){
this.handle=0;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.clientX=0;
this.clientY=0;
this.clientWidth=0;
this.clientHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Monitor");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(object){
if(object==this)return true;
if(!($_O(object,$wt.widgets.Monitor)))return false;
var monitor=object;
return this.handle==monitor.handle;
},"Object");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"getClientArea",
function(){
return new $wt.graphics.Rectangle(this.clientX,this.clientY,this.clientWidth,this.clientHeight);
});
$_V(c$,"hashCode",
function(){
return this.handle;
});
c$=$_C(function(){
this.parent=null;
this.increment=0;
this.pageIncrement=0;
$_Z(this,arguments);
},$wt.widgets,"ScrollBar",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ScrollBar,[parent,$wt.widgets.ScrollBar.checkStyle(style)]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Scrollable,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"createWidget",
function(){
this.increment=1;
this.pageIncrement=10;
});
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
$_U(this,$wt.widgets.ScrollBar,"dispose",[]);
});
$_M(c$,"getBounds",
function(){
this.parent.forceResize();
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return 100;
});
$_M(c$,"getMinimum",
function(){
return 0;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
return 0;
});
$_M(c$,"getSize",
function(){
this.parent.forceResize();
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getThumb",
function(){
return 10;
});
$_M(c$,"getVisible",
function(){
return(this.state&16)==0;
});
$_M(c$,"hwndScrollBar",
function(){
return this.parent.scrolledHandle();
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseChild",[]);
if(this.parent.horizontalBar==this)this.parent.horizontalBar=null;
if(this.parent.verticalBar==this)this.parent.verticalBar=null;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ScrollBar,"releaseWidget",[]);
this.parent=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(enabled){
},"~B");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
this.increment=value;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(selection){
},"~N");
$_M(c$,"setThumb",
function(value){
if(value<1)return;
},"~N");
$_M(c$,"setValues",
function(selection,minimum,maximum,thumb,increment,pageIncrement){
if(minimum<0)return;
if(maximum<0)return;
if(thumb<1)return;
if(increment<1)return;
if(pageIncrement<1)return;
this.increment=increment;
this.pageIncrement=pageIncrement;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"setVisible",
function(visible){
var isVisible=(this.state&16)==0;
if(isVisible==visible)return;
},"~B");
c$=$_C(function(){
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
this.freeSlot=0;
this.indexTable=null;
this.controlTable=null;
this.focusEvent=0;
this.focusControl=null;
this.bars=null;
this.popups=null;
this.items=null;
this.thread=null;
this.disposeList=null;
this.tray=null;
this.nextTrayId=0;
this.timerIds=null;
this.timerList=null;
this.nextTimerId=0;
this.lastKey=0;
this.lastAscii=0;
this.lastMouse=0;
this.lastVirtual=false;
this.lastNull=false;
this.lastDead=false;
this.keyboard=null;
this.accelKeyHit=false;
this.mnemonicKeyHit=false;
this.lockActiveWindow=false;
this.captureChanged=false;
this.ignoreRestoreFocus=false;
this.lastHittestControl=null;
this.lastHittest=0;
this.cursors=null;
this.imageList=null;
this.toolImageList=null;
this.toolHotImageList=null;
this.toolDisabledImageList=null;
this.lpCustColors=0;
this.data=null;
this.keys=null;
this.values=null;
this.msgs=null;
this.messageProc=0;
this.modalShells=null;
this.modalDialogShell=null;
this.hitCount=0;
$_Z(this,arguments);
},$wt.widgets,"Display",$wt.graphics.Device);
$_Y(c$,function(){
this.keyboard=$_A(256,0);
this.cursors=new Array(22);
});
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
$_R(this,$wt.widgets.Display,[data]);
},"$wt.graphics.DeviceData");
$_M(c$,"addBar",
function(menu){
if(this.bars==null)this.bars=new Array(4);
var length=this.bars.length;
for(var i=0;i<length;i++){
if(this.bars[i]==menu)return;
}
var index=0;
while(index<length){
if(this.bars[index]==null)break;
index++;
}
if(index==length){
var newBars=new Array(length+4);
System.arraycopy(this.bars,0,newBars,0,length);
this.bars=newBars;
}this.bars[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"addControl",
function(handle,control){
if(control==null)return;
this.controlTable[this.controlTable.length]=control;
},"Object,$wt.widgets.Control");
$_M(c$,"addFilter",
function(eventType,listener){
if(this.filterTable==null)this.filterTable=new $wt.widgets.EventTable();
this.filterTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addListener",
function(eventType,listener){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"addMenuItem",
function(item){
if(this.items==null)this.items=new Array(64);
for(var i=0;i<this.items.length;i++){
if(this.items[i]==null){
item.id=i+108;
this.items[i]=item;
return;
}}
item.id=this.items.length+108;
var newItems=new Array(this.items.length+64);
newItems[this.items.length]=item;
System.arraycopy(this.items,0,newItems,0,this.items.length);
this.items=newItems;
},"$wt.widgets.MenuItem");
$_M(c$,"addPopup",
function(menu){
if(this.popups==null)this.popups=new Array(4);
var length=this.popups.length;
for(var i=0;i<length;i++){
if(this.popups[i]==menu)return;
}
var index=0;
while(index<length){
if(this.popups[index]==null)break;
index++;
}
if(index==length){
var newPopups=new Array(length+4);
System.arraycopy(this.popups,0,newPopups,0,length);
this.popups=newPopups;
}this.popups[index]=menu;
},"$wt.widgets.Menu");
$_M(c$,"asciiKey",
function(key){
return 0;
},"~N");
$_M(c$,"asyncExec",
function(runnable){
w$.setTimeout($_Q(runnable),10);
},"Runnable");
$_M(c$,"beep",
function(){
});
$_M(c$,"checkSubclass",
function(){
});
$_V(c$,"checkDevice",
function(){
});
c$.checkDisplay=$_M(c$,"checkDisplay",
function(thread,multiple){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
}}
},"Thread,~B");
$_M(c$,"clearModal",
function(shell){
if(this.modalShells==null)return;
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]==shell)break;
if(this.modalShells[index]==null)return;
index++;
}
if(index==length)return;
System.arraycopy(this.modalShells,index+1,this.modalShells,index,--length-index);
this.modalShells[length]=null;
if(index==0&&this.modalShells[0]==null)this.modalShells=null;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"close",
function(){
var event=new $wt.widgets.Event();
this.sendEvent(21,event);
if(event.doit)this.dispose();
});
$_V(c$,"create",
function(data){
this.checkSubclass();
$wt.widgets.Display.checkDisplay(this.thread=Thread.currentThread(),true);
this.createDisplay(data);
$wt.widgets.Display.register(this);
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=this,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
},"$wt.graphics.DeviceData");
$_M(c$,"createDisplay",
function(data){
},"$wt.graphics.DeviceData");
c$.deregister=$_M(c$,"deregister",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if(display==$wt.widgets.Display.Displays[i])$wt.widgets.Display.Displays[i]=null;
}
},"$wt.widgets.Display");
$_V(c$,"destroy",
function(){
if(this==$wt.widgets.Display.Default)($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
$wt.widgets.Display.deregister(this);
this.destroyDisplay();
});
$_M(c$,"destroyDisplay",
function(){
});
$_M(c$,"disposeExec",
function(runnable){
if(this.disposeList==null)this.disposeList=new Array(4);
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]==null){
this.disposeList[i]=runnable;
return;
}}
var newDisposeList=new Array(this.disposeList.length+4);
System.arraycopy(this.disposeList,0,newDisposeList,0,this.disposeList.length);
newDisposeList[this.disposeList.length]=runnable;
this.disposeList=newDisposeList;
},"Runnable");
$_M(c$,"drawMenuBars",
function(){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
var menu=this.bars[i];
if(menu!=null&&!menu.isDisposed())menu.update();
}
this.bars=null;
});
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"filterEvent",
function(event){
if(this.filterTable!=null)this.filterTable.sendEvent(event);
return false;
},"$wt.widgets.Event");
$_M(c$,"filters",
function(eventType){
if(this.filterTable==null)return false;
return this.filterTable.hooks(eventType);
},"~N");
$_M(c$,"findControl",
function(handle){
if(handle==0)return null;
return null;
},"~N");
$_M(c$,"findWidget",
function(handle){
return null;
},"~N");
$_M(c$,"findWidget",
function(handle,id){
return null;
},"~N,~N");
c$.findDisplay=$_M(c$,"findDisplay",
function(thread){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
var display=$wt.widgets.Display.Displays[i];
if(display!=null&&display.thread==thread){
return display;
}}
return null;
},"Thread");
$_M(c$,"getActiveShell",
function(){
return null;
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Display,"getBounds",[]);
});
c$.getCurrent=$_M(c$,"getCurrent",
function(){
return $wt.widgets.Display.findDisplay(Thread.currentThread());
});
$_M(c$,"getClientArea",
function(){
return $_U(this,$wt.widgets.Display,"getClientArea",[]);
});
$_M(c$,"getControl",
function(handle){
if(handle==null)return null;
for(var i=0;i<this.controlTable.length;i++){
if(this.controlTable[i]!=null&&handle==this.controlTable[i].handle){
return this.controlTable[i];
}}
return null;
},"Object");
$_M(c$,"getCursorControl",
function(){
return null;
});
$_M(c$,"getCursorLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCursorSizes",
function(){
return[new $wt.graphics.Point(16,16)];
});
c$.getDefault=$_M(c$,"getDefault",
function(){
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=new $wt.widgets.Display(),$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
return $wt.widgets.Display.Default;
});
c$.isValidClass=$_M(c$,"isValidClass",
function(clazz){
var name=clazz.getName();
var index=name.lastIndexOf('.');
return name.substring(0,index+1).equals($wt.widgets.Display.PACKAGE_PREFIX);
},"Class");
$_M(c$,"getData",
function(key){
if(this.keys==null)return null;
for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key))return this.values[i];
}
return null;
},"~S");
$_M(c$,"getData",
function(){
return this.data;
});
$_M(c$,"getDismissalAlignment",
function(){
return 16384;
});
$_M(c$,"getDoubleClickTime",
function(){
return 20;
});
$_M(c$,"getFocusControl",
function(){
if(this.focusControl!=null&&!this.focusControl.isDisposed()){
return this.focusControl;
}return null;
});
$_M(c$,"getHighContrast",
function(){
return false;
});
$_M(c$,"getIconDepth",
function(){
return 32;
});
$_M(c$,"getIconSizes",
function(){
return[new $wt.graphics.Point(16,16),new $wt.graphics.Point(32,32)];
});
$_M(c$,"getImageList",
function(style,width,height){
if(this.imageList==null)this.imageList=new Array(4);
var i=0;
var length=this.imageList.length;
while(i<length){
var list=this.imageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.imageList,0,newList,0,length);
this.imageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.imageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBar",
function(style,width,height){
if(this.toolImageList==null)this.toolImageList=new Array(4);
var i=0;
var length=this.toolImageList.length;
while(i<length){
var list=this.toolImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolImageList,0,newList,0,length);
this.toolImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarDisabled",
function(style,width,height){
if(this.toolDisabledImageList==null)this.toolDisabledImageList=new Array(4);
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
var list=this.toolDisabledImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolDisabledImageList,0,newList,0,length);
this.toolDisabledImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolDisabledImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarHot",
function(style,width,height){
if(this.toolHotImageList==null)this.toolHotImageList=new Array(4);
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
var list=this.toolHotImageList[i];
if(list==null)break;
var size=list.getImageSize();
if(size.x==width&&size.y==height){
if(list.getStyle()==style){
list.addRef();
return list;
}}i++;
}
if(i==length){
var newList=new Array(length+4);
System.arraycopy(this.toolHotImageList,0,newList,0,length);
this.toolHotImageList=newList;
}var list=new $wt.widgets.ImageList(style);
this.toolHotImageList[i]=list;
list.addRef();
return list;
},"~N,~N,~N");
$_M(c$,"getLastEventTime",
function(){
return parseInt(new java.util.Date().getTime());
});
$_M(c$,"getMenuItem",
function(id){
if(this.items==null)return null;
id=id-108;
if(0<=id&&id<this.items.length)return this.items[id];
return null;
},"~N");
$_M(c$,"getModalShell",
function(){
if(this.modalShells==null)return null;
var index=this.modalShells.length;
while(--index>=0){
var shell=this.modalShells[index];
if(shell!=null)return shell;
}
return null;
});
$_M(c$,"getModalDialogShell",
function(){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
return this.modalDialogShell;
});
$_M(c$,"getMonitors",
function(){
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return[monitor];
});
$_M(c$,"getPrimaryMonitor",
function(){
var monitor=new $wt.widgets.Monitor();
monitor.handle=220284;
monitor.clientWidth=monitor.width=d$.body.clientWidth;
monitor.clientHeight=monitor.height=d$.body.clientHeight;
monitor.clientX=monitor.x=0;
monitor.clientY=monitor.y=0;
return monitor;
});
$_M(c$,"getShells",
function(){
var count=0;
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell))count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<this.controlTable.length;i++){
var control=this.controlTable[i];
if(control!=null&&$_O(control,$wt.widgets.Shell)){
result[index++]=control;
}}
return result;
});
$_M(c$,"getSyncThread",
function(){
return null;
});
$_M(c$,"getSystemColor",
function(id){
var pixel="#000000";
switch(id){
case 17:
pixel="ThreeDDarkShadow";
break;
case 18:
pixel="ThreeDShadow";
break;
case 19:
pixel="ThreeDLightShadow";
break;
case 20:
pixel="ThreeDHighlight";
break;
case 22:
pixel="ThreeDFace";
break;
case 23:
pixel="WindowFrame";
break;
case 21:
case 24:
pixel="WindowText";
break;
case 25:
pixel="Window";
break;
case 26:
pixel="Highlight";
break;
case 27:
pixel="HighlightText";
break;
case 28:
pixel="InfoText";
break;
case 29:
pixel="InfoBackground";
break;
case 30:
pixel="CaptionText";
break;
case 31:
pixel="ActiveCaption";
break;
case 32:
pixel="ActiveCaption";
break;
case 33:
pixel="InactiveCaptionText";
break;
case 34:
pixel="InactiveCaption";
break;
case 35:
pixel="InactiveCaption";
break;
default:
return $_U(this,$wt.widgets.Display,"getSystemColor",[id]);
}
return new $wt.graphics.Color(null,pixel);
},"~N");
$_M(c$,"getSystemCursor",
function(id){
if(!(0<=id&&id<this.cursors.length))return null;
if(this.cursors[id]==null){
this.cursors[id]=new $wt.graphics.Cursor(this,id);
}return this.cursors[id];
},"~N");
$_V(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getSystemImage",
function(id){
var iconName=null;
switch(id){
case 1:
iconName="error";
break;
case 16:
case 2:
iconName="information";
break;
case 4:
iconName="question";
break;
case 8:
iconName="warning";
break;
}
if(iconName==null)return null;
return new $wt.graphics.Image(this,"j2slib/images/"+iconName+".png");
},"~N");
$_M(c$,"getSystemTray",
function(){
if(this.tray!=null)return this.tray;
return this.tray=new $wt.widgets.Tray(this,0);
});
$_M(c$,"getThread",
function(){
return this.thread;
});
$_M(c$,"init",
function(){
$_U(this,$wt.widgets.Display,"init",[]);
this.indexTable=$_A(1024,0);
this.controlTable=new Array(1024);
for(var i=0;i<1023;i++)this.indexTable[i]=i+1;

this.indexTable[1023]=-1;
this.msgs=new Array(0);
this.messageProc=0;
});
$_M(c$,"isValidThread",
function(){
return this.thread==Thread.currentThread();
});
$_M(c$,"map",
function(from,to,point){
return this.map(from,to,point.x,point.y);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M(c$,"map",
function(from,to,x,y){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Point(0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N");
$_M(c$,"map",
function(from,to,rectangle){
return this.map(from,to,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M(c$,"map",
function(from,to,x,y,width,height){
var hwndFrom=from!=null?from.handle:null;
var hwndTo=to!=null?to.handle:null;
return new $wt.graphics.Rectangle(0,0,0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N,~N,~N");
$_M(c$,"post",
function(event){
var type=event.type;
switch(type){
case 1:
case 2:
{
}case 3:
case 5:
case 4:
{
}}
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$1",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$1,i$,v$);
})(this,null));
return false;
},"$wt.widgets.Event");
$_M(c$,"postEvent",
function(event){
if(this.eventQueue==null)this.eventQueue=new Array(4);
var index=0;
var length=this.eventQueue.length;
while(index<length){
if(this.eventQueue[index]==null)break;
index++;
}
if(index==length){
var newQueue=new Array(length+4);
System.arraycopy(this.eventQueue,0,newQueue,0,length);
this.eventQueue=newQueue;
}this.eventQueue[index]=event;
this.timerExec(1,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$2",null,Runnable);
$_M(c$,"run",
function(){
this.b$["$wt.widgets.Display"].runDeferredEvents();
});
c$=$_P();
}
return $_N($wt.widgets.Display$2,i$,v$);
})(this,null));
},"$wt.widgets.Event");
$_M(c$,"readAndDispatch",
function(){
this.drawMenuBars();
this.runPopups();
this.messageProc=w$.setInterval($_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Display$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Display$3",$wt.internal.RunnableCompatibility);
$_M(c$,"run",
function(){
var msgs=this.b$["$wt.widgets.Display"].msgs;
if(msgs.length!=0){
for(var i=msgs.length-1;i>=0;i--){
var m1=msgs[i];
if(m1==null){
continue;}for(var j=i-1;j>=0;j--){
var m2=msgs[j];
if(m2!=null&&m2.control==m1.control&&m2.type==m1.type){
msgs[j]=null;
break;
}}
}
var time=0;
for(var i=0;i<msgs.length;i++){
var m=msgs[i];
msgs[i]=null;
if(m!=null&&m.type==2){
if(!m.control.isVisible()){
continue;}var d=new java.util.Date();
var c=m.control;
if(m.data!=null){
var bs=m.data;
c.updateLayout(bs[0],bs[1]);
}else{
c.layout();
}time+=new java.util.Date().getTime()-d.getTime();
if(time>100){
for(var j=i+1;j<msgs.length;j++){
msgs[j-i-1]=msgs[j];
}
for(var j=0;j<i;j++){
msgs[msgs.length-1-j]=null;
}
{
msgs.length-=i+1;
}return;
}}}
{
msgs.length=0;
}}});
c$=$_P();
}
return $_N($wt.widgets.Display$3,i$,v$);
})(this,null)),20);
return true;
});
c$.register=$_M(c$,"register",
function(display){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]==null){
$wt.widgets.Display.Displays[i]=display;
return;
}}
var newDisplays=new Array($wt.widgets.Display.Displays.length+4);
System.arraycopy($wt.widgets.Display.Displays,0,newDisplays,0,$wt.widgets.Display.Displays.length);
newDisplays[$wt.widgets.Display.Displays.length]=display;
($t$=$wt.widgets.Display.Displays=newDisplays,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
},"$wt.widgets.Display");
$_M(c$,"release",
function(){
this.sendEvent(12,new $wt.widgets.Event());
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.dispose();
}
if(this.disposeList!=null){
for(var i=0;i<this.disposeList.length;i++){
if(this.disposeList[i]!=null)this.disposeList[i].run();
}
}this.disposeList=null;
this.releaseDisplay();
$_U(this,$wt.widgets.Display,"release",[]);
});
$_M(c$,"releaseDisplay",
function(){
for(var i=0;i<this.cursors.length;i++){
if(this.cursors[i]!=null)this.cursors[i].dispose();
}
this.cursors=null;
this.keyboard=null;
this.modalDialogShell=null;
this.modalShells=null;
this.data=null;
this.keys=null;
this.values=null;
this.bars=this.popups=null;
this.indexTable=null;
this.controlTable=null;
this.lastHittestControl=null;
this.imageList=this.toolImageList=this.toolHotImageList=this.toolDisabledImageList=null;
this.eventQueue=null;
this.eventTable=null;
this.filterTable=null;
if(this.messageProc!=0){
w$.clearInterval(this.messageProc);
}this.msgs=null;
});
$_M(c$,"releaseImageList",
function(list){
var i=0;
var length=this.imageList.length;
while(i<length){
if(this.imageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.imageList,i+1,this.imageList,i,--length-i);
this.imageList[length]=null;
for(var j=0;j<length;j++){
if(this.imageList[j]!=null)return;
}
this.imageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolImageList",
function(list){
var i=0;
var length=this.toolImageList.length;
while(i<length){
if(this.toolImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolImageList,i+1,this.toolImageList,i,--length-i);
this.toolImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolImageList[j]!=null)return;
}
this.toolImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolHotImageList",
function(list){
var i=0;
var length=this.toolHotImageList.length;
while(i<length){
if(this.toolHotImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolHotImageList,i+1,this.toolHotImageList,i,--length-i);
this.toolHotImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolHotImageList[j]!=null)return;
}
this.toolHotImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolDisabledImageList",
function(list){
var i=0;
var length=this.toolDisabledImageList.length;
while(i<length){
if(this.toolDisabledImageList[i]==list){
if(list.removeRef()>0)return;
list.dispose();
System.arraycopy(this.toolDisabledImageList,i+1,this.toolDisabledImageList,i,--length-i);
this.toolDisabledImageList[length]=null;
for(var j=0;j<length;j++){
if(this.toolDisabledImageList[j]!=null)return;
}
this.toolDisabledImageList=null;
return;
}i++;
}
},"$wt.widgets.ImageList");
$_M(c$,"removeFilter",
function(eventType,listener){
if(this.filterTable==null)return;
this.filterTable.unhook(eventType,listener);
if(this.filterTable.size()==0)this.filterTable=null;
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(eventType,listener){
if(this.eventTable==null)return;
this.eventTable.unhook(eventType,listener);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeBar",
function(menu){
if(this.bars==null)return;
for(var i=0;i<this.bars.length;i++){
if(this.bars[i]==menu){
this.bars[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"removeControl",
function(handle){
if(handle==null)return null;
var control=null;
var index=0;
if(0<=index&&index<this.controlTable.length){
control=this.controlTable[index];
this.controlTable[index]=null;
this.indexTable[index]=this.freeSlot;
this.freeSlot=index;
}return control;
},"Object");
$_M(c$,"removeMenuItem",
function(item){
if(this.items==null)return;
this.items[item.id-108]=null;
item.id=-1;
},"$wt.widgets.MenuItem");
$_M(c$,"removePopup",
function(menu){
if(this.popups==null)return;
for(var i=0;i<this.popups.length;i++){
if(this.popups[i]==menu){
this.popups[i]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"runDeferredEvents",
function(){
while(this.eventQueue!=null){
var event=this.eventQueue[0];
if(event==null)break;
var length=this.eventQueue.length;
System.arraycopy(this.eventQueue,1,this.eventQueue,0,--length);
this.eventQueue[length]=null;
var widget=event.widget;
if(widget!=null&&!widget.isDisposed()){
var item=event.item;
if(item==null||!item.isDisposed()){
widget.sendEvent(event);
}}}
this.eventQueue=null;
return true;
});
$_M(c$,"runPopups",
function(){
if(this.popups==null)return false;
var result=false;
while(this.popups!=null){
var menu=this.popups[0];
if(menu==null)break;
var length=this.popups.length;
System.arraycopy(this.popups,1,this.popups,0,--length);
this.popups[length]=null;
this.runDeferredEvents();
menu._setVisible(true);
result=true;
}
this.popups=null;
return result;
});
$_M(c$,"runTimer",
function(id){
if(this.timerList!=null&&this.timerIds!=null){
var index=0;
while(index<this.timerIds.length){
if(this.timerIds[index]==id){
w$.clearInterval(this.timerIds[index]);
this.timerIds[index]=0;
var runnable=this.timerList[index];
this.timerList[index]=null;
if(runnable!=null)runnable.run();
return true;
}index++;
}
}return false;
},"~N");
$_M(c$,"sendEvent",
function(eventType,event){
if(this.eventTable==null&&this.filterTable==null){
return;
}if(event==null)event=new $wt.widgets.Event();
event.display=this;
event.type=eventType;
if(event.time==0)event.time=this.getLastEventTime();
if(!this.filterEvent(event)){
if(this.eventTable!=null)this.eventTable.sendEvent(event);
}},"~N,$wt.widgets.Event");
$_M(c$,"sendMessage",
function(msg){
this.msgs[this.msgs.length]=msg;
},"$wt.internal.struct.MESSAGE");
$_M(c$,"setCursorLocation",
function(x,y){
},"~N,~N");
$_M(c$,"setCursorLocation",
function(point){
this.setCursorLocation(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"setData",
function(key,value){
if(value==null){
if(this.keys==null)return;
var index=0;
while(index<this.keys.length&&!this.keys[index].equals(key))index++;

if(index==this.keys.length)return;
if(this.keys.length==1){
this.keys=null;
this.values=null;
}else{
var newKeys=new Array(this.keys.length-1);
var newValues=new Array(this.values.length-1);
System.arraycopy(this.keys,0,newKeys,0,index);
System.arraycopy(this.keys,index+1,newKeys,index,newKeys.length-index);
System.arraycopy(this.values,0,newValues,0,index);
System.arraycopy(this.values,index+1,newValues,index,newValues.length-index);
this.keys=newKeys;
this.values=newValues;
}return;
}if(this.keys==null){
this.keys=[key];
this.values=[value];
return;
}for(var i=0;i<this.keys.length;i++){
if(this.keys[i].equals(key)){
this.values[i]=value;
return;
}}
var newKeys=new Array(this.keys.length+1);
var newValues=new Array(this.values.length+1);
System.arraycopy(this.keys,0,newKeys,0,this.keys.length);
System.arraycopy(this.values,0,newValues,0,this.values.length);
newKeys[this.keys.length]=key;
newValues[this.values.length]=value;
this.keys=newKeys;
this.values=newValues;
},"~S,Object");
$_M(c$,"setData",
function(data){
this.data=data;
},"Object");
c$.setAppName=$_M(c$,"setAppName",
function(name){
},"~S");
$_M(c$,"setModalDialogShell",
function(modalDailog){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
this.modalDialogShell=modalDailog;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setModalShell",
function(shell){
if(this.modalShells==null)this.modalShells=new Array(4);
var index=0;
var length=this.modalShells.length;
while(index<length){
if(this.modalShells[index]==shell)return;
if(this.modalShells[index]==null)break;
index++;
}
if(index==length){
var newModalShells=new Array(length+4);
System.arraycopy(this.modalShells,0,newModalShells,0,length);
this.modalShells=newModalShells;
}this.modalShells[index]=shell;
var shells=this.getShells();
for(var i=0;i<shells.length;i++)shells[i].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setSynchronizer",
function(synchronizer){
},"$wt.widgets.Synchronizer");
$_M(c$,"sleep",
function(){
return false;
});
$_M(c$,"syncExec",
function(runnable){
runnable.run();
},"Runnable");
$_M(c$,"timerExec",
function(milliseconds,runnable){
if(this.timerList==null)this.timerList=new Array(4);
if(this.timerIds==null)this.timerIds=$_A(4,0);
var index=0;
while(index<this.timerList.length){
if(this.timerList[index]==runnable)break;
index++;
}
var timerId=0;
if(index!=this.timerList.length){
timerId=this.timerIds[index];
if(milliseconds<0){
w$.clearInterval(timerId);
this.timerList[index]=null;
this.timerIds[index]=0;
return;
}}else{
if(milliseconds<0)return;
index=0;
while(index<this.timerList.length){
if(this.timerList[index]==null)break;
index++;
}
this.nextTimerId++;
timerId=this.nextTimerId;
if(index==this.timerList.length){
var newTimerList=new Array(this.timerList.length+4);
System.arraycopy(this.timerList,0,newTimerList,0,this.timerList.length);
this.timerList=newTimerList;
var newTimerIds=$_A(this.timerIds.length+4,0);
System.arraycopy(this.timerIds,0,newTimerIds,0,this.timerIds.length);
this.timerIds=newTimerIds;
}}var newTimerID=w$.setTimeout($_Q(runnable),milliseconds);
if(newTimerID!=0){
this.timerList[index]=runnable;
this.timerIds[index]=newTimerID;
}},"~N,Runnable");
$_M(c$,"update",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.update(true);
}
});
$_M(c$,"wake",
function(){
});
c$.withCrLf=$_M(c$,"withCrLf",
function(string){
var length=string.length;
if(length==0)return string;
var i=string.indexOf('\n',0);
if(i==-1)return string;
if(i>0&&(string.charAt(i-1)).charCodeAt(0)==('\r').charCodeAt(0)){
return string;
}i++;
var count=1;
while(i<length){
if((i=string.indexOf('\n',i))==-1)break;
count++;
i++;
}
count+=length;
i=0;
var result=new StringBuffer(count);
while(i<length){
var j=string.indexOf('\n',i);
if(j==-1)j=length;
result.append(string.substring(i,j));
if((i=j)<length){
result.append("\r\n");
i++;
}}
return result.toString();
},"~S");
c$.releaseAllDisplays=$_M(c$,"releaseAllDisplays",
function(){
if($wt.widgets.Display.Displays!=null){
for(var i=0;i<$wt.widgets.Display.Displays.length;i++){
if($wt.widgets.Display.Displays[i]!=null){
$wt.widgets.Display.Displays[i].dispose();
$wt.widgets.Display.Displays[i]=null;
}}
($t$=$wt.widgets.Display.Displays=null,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
}($t$=$wt.widgets.Display.Default=null,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
});
$_S(c$,
"GROW_SIZE",1024,
"ID_START",108,
"Default",null);
c$.Displays=c$.prototype.Displays=new Array(4);
$_S(c$,
"monitors",null,
"monitorCount",0,
"TrimEnabled",false,
"PACKAGE_PREFIX","org.eclipse.swt.widgets.");
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.hasImage=false;
this.image=null;
this.image2=null;
this.imageList=null;
this.ignoreMouse=false;
this.btnText=null;
this.btnHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Button",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Button,[parent,$wt.widgets.Button.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"_setImage",
function(image){
},"$wt.graphics.Image");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,8,4,32,16,2,0);
if((style&(10))!=0){
return $wt.widgets.Widget.checkBits(style,16777216,16384,131072,0,0,0);
}if((style&(48))!=0){
return $wt.widgets.Widget.checkBits(style,16384,131072,16777216,0,0,0);
}if((style&4)!=0){
style|=524288;
return $wt.widgets.Widget.checkBits(style,128,1024,16384,131072,0,0);
}return style;
},"~N");
$_M(c$,"click",
function(){
this.ignoreMouse=true;
this.ignoreMouse=false;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=0;
var height=0;
if((this.style&4)!=0){
if((this.style&(1152))!=0){
width+=16;
height+=16;
}else{
width+=16;
height+=16;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}var extra=0;
if(!this.hasImage){
if(this.text==null||this.text.length==0){
height+=$wt.internal.browser.OS.getStringStyledHeight(".","button-default",null);
}else{
if(!this.textSizeCached||changed){
var string=this.text.replaceAll("[\r\n]+","");
var cssSize=$wt.internal.browser.OS.getStringStyledSize(string,"button-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
if((this.style&(48))!=0){
width-=5;
}extra=Math.max(8,height);
}}else{
if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}extra=8;
}}if((this.style&(48))!=0){
width+=13+extra;
height=Math.max(height,16);
}if((this.style&(10))!=0){
width+=12;
height+=10;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"enableWidget",
function(enabled){
this.btnHandle.disabled=!enabled;
var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="button-disabled";
var idx=cssName.indexOf(key);
if(!enabled){
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}},"~B");
$_M(c$,"getAlignment",
function(){
if((this.style&4)!=0){
if((this.style&128)!=0)return 128;
if((this.style&1024)!=0)return 1024;
if((this.style&16384)!=0)return 16384;
if((this.style&131072)!=0)return 131072;
return 128;
}if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getDefault",
function(){
if((this.style&8)==0)return false;
return false;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSelection",
function(){
if((this.style&(50))==0)return false;
if((this.style&2)!=0){
System.out.println(this.btnHandle.className);
return(this.btnHandle.className!=null&&this.btnHandle.className.indexOf("button-selected")!=-1);
}else if((this.style&(48))!=0){
return this.btnHandle.checked;
}return false;
});
$_M(c$,"getText",
function(){
if((this.style&4)!=0)return"";
return this.text;
});
$_V(c$,"isEnabled",
function(){
return!this.btnHandle.disabled;
});
$_M(c$,"isTabItem",
function(){
return $_U(this,$wt.widgets.Button,"isTabItem",[]);
});
$_V(c$,"mnemonicHit",
function(ch){
if(!this.setFocus())return false;
if((this.style&16)==0)this.click();
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.btnText!=null){
BrowserNative.releaseHandle(this.btnText);
this.btnText=null;
}if(this.btnHandle!=null){
BrowserNative.releaseHandle(this.btnHandle);
this.btnHandle=null;
}$_U(this,$wt.widgets.Button,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Button,"releaseWidget",[]);
if(this.imageList!=null)this.imageList.dispose();
this.imageList=null;
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var children=this.parent._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(this!=child)child.setRadioSelection(false);
}
this.setSelection(true);
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&4)!=0){
if((this.style&(148608))==0)return;
this.style&=-148609;
this.style|=alignment&(148608);
this.updateArrowStyle();
var cx=this.width;
var cy=this.height;
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}this.updateArrowSize(cx,cy);
return;
}if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&(10))!=0){
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
}else{
handleStyle=this.btnHandle.style;
}if((this.style&16384)!=0){
this.btnText.style.textAlign="left";
handleStyle.backgroundPosition="left center";
}if((this.style&16777216)!=0){
this.btnText.style.textAlign="center";
handleStyle.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.btnText.style.textAlign="right";
handleStyle.backgroundPosition="right center";
}}},"~N");
$_M(c$,"setDefault",
function(value){
if((this.style&8)==0)return;
if(value){
try{
this.handle.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setFixedFocus",[]);
});
$_M(c$,"setImage",
function(image){
if((this.style&4)!=0)return;
this.image=image;
this.hasImage=true;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
$wt.internal.browser.OS.clearChildren(this.btnText);
this.btnText.style.display="";
this.btnText.style.paddingTop="";
this.btnHandle.parentNode.style.bottom="";
this.btnHandle.parentNode.style.top="";
this.btnHandle.style.top="";
this.btnText.parentNode.style.position="";
this.btnText.parentNode.style.top="";
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
handleStyle.display="block";
handleStyle.marginLeft=(16)+"px";
handleStyle.paddingTop=this.image.height+"px";
}else{
handleStyle=this.btnHandle.style;
}if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
var bgXPos="center";
if((this.style&(48))!=0){
if((this.style&131072)!=0){
bgXPos="right";
}else if((this.style&16777216)!=0){
bgXPos="center";
}else{
bgXPos="left";
}}handleStyle.backgroundPosition=bgXPos+" center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
$_V(c$,"setRadioFocus",
function(){
if((this.style&16)==0||!this.getSelection())return false;
return this.setFocus();
});
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSavedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setSavedFocus",[]);
});
$_M(c$,"setSelection",
function(selected){
if((this.style&(50))==0)return;
if((this.style&2)!=0){
var cssName=this.btnHandle.className;
if(cssName==null)cssName="";
var key="button-selected";
var idx=cssName.indexOf(key);
if(selected){
if(idx==-1){
this.btnHandle.className+=" "+key;
}}else{
if(idx!=-1){
this.btnHandle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}}else if((this.style&(48))!=0){
this.btnHandle.checked=selected;
}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&4)!=0)return;
if(string!=this.text){
this.textSizeCached=false;
}$wt.internal.browser.OS.clearChildren(this.btnText);
if(this.hasImage){
this.btnText.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.btnText.style.filter!=null){
this.btnText.style.filter="";
}}this.text=string;
this.hasImage=false;
string=string.replaceAll("(&(&))|([\r\n]+)","$2");
var idx=string.indexOf('&');
if(idx==-1){
this.btnText.appendChild(d$.createTextNode(string));
}else{
this.btnText.appendChild(d$.createTextNode(string.substring(0,idx)));
var underline=d$.createElement("SPAN");
underline.appendChild(d$.createTextNode(string.substring(idx+1,idx+2)));
underline.className="button-text-mnemonics";
this.btnText.appendChild(underline);
this.btnText.appendChild(d$.createTextNode(string.substring(idx+2)));
}},"~S");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}if((this.style&4)!=0){
this.updateArrowSize(cx,cy);
}if((this.style&(48))!=0){
var h=0;
if(!this.hasImage){
if(this.textSizeCached){
this.btnText.style.display="block";
if(this.textHeightCached<13){
this.btnText.style.paddingTop=(Math.floor((13-this.textHeightCached)/2))+"px";
this.btnHandle.parentNode.style.bottom="0";
this.btnHandle.parentNode.style.top="0";
this.btnHandle.style.top="0";
}else{
this.btnText.style.paddingTop="0";
}}h=this.textHeightCached;
}else{
h=this.image.height;
}h=Math.max(16,h);
if(h<cy){
this.btnText.parentNode.style.position="relative";
this.btnText.parentNode.style.top=(Math.floor((cy-h)/2))+"px";
}}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"updateArrowSize",
($fz=function(cx,cy){
var xx=Math.floor(Math.min(cx,cy)/3);
var s=this.btnText.style;
s.borderWidth=(xx>0?xx:0)+"px";
if((this.style&16384)!=0){
s.borderLeftWidth="0";
}else if((this.style&131072)!=0){
s.borderRightWidth="0";
}else if((this.style&128)!=0){
s.borderTopWidth="0";
}else if((this.style&1024)!=0){
if(xx>1){
s.borderWidth=(xx-1)+"px";
}s.borderBottomWidth="0";
}else{
s.borderTopWidth="0";
}var x=Math.floor(cy/6);
xx=Math.floor(cy/3);
s.position="relative";
if((this.style&(147456))!=0){
s.top=(x-3)+"px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.top=(xx-3)+"px";
}else if((this.style&1024)!=0){
s.top=(xx-2)+"px";
}}if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
if((this.style&128)!=0){
s.left="-2px";
}else if((this.style&1024)!=0){
s.left="-1px";
}}if($wt.internal.browser.OS.isFirefox){
if((this.style&(147456))!=0){
s.top="-2px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.left="-2px";
s.top="-1px";
}else if((this.style&1024)!=0){
s.left="-1px";
s.top="-1px";
}}}},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"setCursor",
function(cursor){
if(this.handle!=null){
this.handle.style.cursor=cursor.handle;
}},"$wt.graphics.Cursor");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="button-default";
if((this.style&2048)!=0){
cssName+=" button-border";
}if((this.style&8388608)!=0){
cssName+=" button-flat";
}this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&(48))!=0){
var btnEl=d$.createElement("DIV");
this.handle.appendChild(btnEl);
var btnWrapperEl=d$.createElement("DIV");
btnWrapperEl.className="button-input-wrapper";
btnEl.appendChild(btnWrapperEl);
this.btnHandle=d$.createElement("INPUT");
if((this.style&32)!=0){
btnEl.className="button-check";
this.btnHandle.type="checkbox";
}else{
btnEl.className="button-radio";
this.btnHandle.type="radio";
}btnWrapperEl.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnText.className="button-text";
btnEl.appendChild(this.btnText);
}else{
this.btnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnHandle.appendChild(this.btnText);
if((this.style&2)!=0){
this.btnHandle.className="button-toggle";
}else if((this.style&4)!=0){
this.btnHandle.className="button-arrow";
this.updateArrowStyle();
}else{
this.btnHandle.className="button-push";
}}this.hookSelection();
});
$_M(c$,"updateArrowStyle",
($fz=function(){
if((this.style&16384)!=0){
this.btnText.className="button-arrow-left";
}else if((this.style&131072)!=0){
this.btnText.className="button-arrow-right";
}else if((this.style&128)!=0){
this.btnText.className="button-arrow-up";
}else if((this.style&1024)!=0){
this.btnText.className="button-arrow-down";
}else{
this.btnText.className="button-arrow-up";
}},$fz.isPrivate=true,$fz));
$_V(c$,"hookSelection",
function(){
var eventHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Button$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Button"].isEnabled()){
this.toReturn(false);
return;
}if((this.b$["$wt.widgets.Button"].style&(34))!=0){
var e=this.getEvent();
if((this.b$["$wt.widgets.Button"].style&32)!=0){
if(e.srcElement!=this.b$["$wt.widgets.Button"].btnHandle){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
if((this.b$["$wt.widgets.Button"].style&16)!=0){
if((this.b$["$wt.widgets.Button"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}else{
this.b$["$wt.widgets.Button"].selectRadio();
}}}this.b$["$wt.widgets.Button"].postEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Button$1,i$,v$);
})(this,null));
this.handle.onclick=this.handle.ondblclick=eventHandler;
if((this.style&(48))!=0){
this.btnText.onclick=eventHandler;
}});
$_S(c$,
"CHECK_WIDTH",13,
"CHECK_HEIGHT",13,
"ICON_WIDTH",128,
"ICON_HEIGHT",128);
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.image=null;
this.image2=null;
$_Z(this,arguments);
},$wt.widgets,"Label",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Label,[parent,$wt.widgets.Label.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
if((style&2)!=0){
style=$wt.widgets.Widget.checkBits(style,512,256,0,0,0,0);
return $wt.widgets.Widget.checkBits(style,8,4,32,0,0,0);
}return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
if((this.style&2)!=0){
var lineWidth=1;
if((this.style&256)!=0){
width=64;
height=lineWidth*2;
}else{
width=lineWidth*2;
height=64;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=$wt.internal.browser.OS.getStringStyledWrappedHeight(this.text,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=$wt.internal.browser.OS.getStringStyledSize(this.text,"label-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
}}if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"getAlignment",
function(){
if((this.style&2)!=0)return 0;
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
if((this.style&2)!=0)return"";
return this.text;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Label,"releaseWidget",[]);
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&2)!=0)return;
if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&16384)!=0){
this.handle.style.textAlign="left";
this.handle.style.backgroundPosition="left center";
}else if((this.style&16777216)!=0){
this.handle.style.textAlign="center";
this.handle.style.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.handle.style.textAlign="right";
this.handle.style.backgroundPosition="right center";
}},"~N");
$_M(c$,"setImage",
function(image){
if(image==null)return;
if((this.style&2)!=0)return;
this.image=image;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var handleStyle=this.handle.style;
if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
handleStyle.backgroundPosition="left center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}else if(this.handle.childNodes.length==0){
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.appendChild(image.handle.childNodes[i]);
}
}else{
var txt=this.handle.childNodes[0];
for(var i=0;i<image.handle.childNodes.length;i++){
this.handle.insertBefore(image.handle.childNodes[i],txt);
}
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
if(this.image!=null){
this.handle.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.handle.style.filter!=null){
this.handle.style.filter="";
}}if(string==this.text){
return;
}this.textSizeCached=false;
this.text=string;
$wt.internal.browser.OS.insertText(this.handle,this.text);
},"~S");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="label-default";
if((this.style&2)!=0){
if((this.style&4)!=0){
this.handle.className+=" shadow-in";
}else if((this.style&8)!=0){
this.handle.className+=" shadow-out";
}else{
this.handle.className+=" shadow-none";
}this.handle.style.fontSize="0";
var seperator1=d$.createElement("DIV");
var seperator2=d$.createElement("DIV");
if((this.style&512)!=0){
seperator1.className="label-seperator-vertical-left";
seperator2.className="label-seperator-vertical-right";
}else{
seperator1.className="label-seperator-horizontal-top";
seperator2.className="label-seperator-horizontal-bottom";
}this.handle.appendChild(seperator1);
this.handle.appendChild(seperator2);
}if((this.style&64)!=0){
this.handle.className+=" label-wrap";
}if((this.style&2048)!=0){
this.handle.className+=" label-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Label,"setBounds",[x,y,width,height]);
if((this.style&2)!=0){
var handleStyle=this.handle.childNodes[0].style;
if((this.style&256)!=0){
var h=(Math.floor(height/2))-1;
if($wt.internal.browser.OS.isIE){
h--;
}handleStyle.marginTop=h+"px";
handleStyle.width=width+"px";
this.handle.childNodes[1].style.width=width+"px";
}else{
handleStyle.marginLeft=((Math.floor(width/2))-1)+"px";
handleStyle.height=height+"px";
this.handle.childNodes[1].style.marginLeft=(Math.floor(width/2))+"px";
this.handle.childNodes[1].style.height=height+"px";
}}},"~N,~N,~N,~N");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.widgets.Label,"setEnabled",[enabled]);
if(!enabled){
this.lastColor=this.handle.style.color;
this.handle.style.color="gray";
}else{
this.handle.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.widgets.Label,"setForeground",[color]);
if(this.lastColor!=null){
this.lastColor=this.handle.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(font){
this.textSizeCached=false;
$_U(this,$wt.widgets.Label,"setFont",[font]);
},"$wt.graphics.Font");
c$=$_C(function(){
this.text=null;
this.cachedText=null;
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.anchors=null;
this.offsets=null;
this.selection=null;
this.ids=null;
this.mnemonics=null;
this.focusIndex=0;
this.font=0;
$_Z(this,arguments);
},$wt.widgets,"Link",$wt.widgets.Control);
$_Y(c$,function(){
this.anchors=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Link,[parent,style]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
if(wHint!=-1&&wHint<0)wHint=0;
if(hHint!=-1&&hHint<0)hHint=0;
var width=0;
var height=0;
if(this.text!=null){
if((this.style&64)!=0&&wHint!=-1&&hHint==-1){
height=$wt.internal.browser.OS.getStringStyledWrappedHeight(this.cachedText,"label-default",this.handle.style.cssText,wHint);
}else{
if(!this.textSizeCached||changed){
var cssSize=$wt.internal.browser.OS.getStringStyledSize(this.cachedText,"label-default",this.handle.style.cssText);
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
}}});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Link,"createWidget",[]);
this.text="";
});
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Link,"enableWidget",[enabled]);
},"~B");
$_V(c$,"hookSelection",
function(){
var linkHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.item=this.b$["$wt.widgets.Link"];
e.text=this.b$["$wt.widgets.Link"].text;
e.widget=this.b$["$wt.widgets.Link"];
e.display=this.b$["$wt.widgets.Link"].display;
this.b$["$wt.widgets.Link"].sendEvent(13);
if(!e.doit){
this.toReturn(false);
}});
c$=$_P();
}
return $_N($wt.widgets.Link$1,i$,v$);
})(this,null));
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].href="#";
this.anchors[i].target=null;
this.anchors[i].onclick=linkHandler;
this.anchors[i].ondblclick=linkHandler;
}
});
$_M(c$,"initAccessible",
function(){
var accessible=this.getAccessible();
accessible.addAccessibleListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$2",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(e){
e.result=this.b$["$wt.widgets.Link"].parse(this.b$["$wt.widgets.Link"].text,null);
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
}
return $_N($wt.widgets.Link$2,i$,v$);
})(this,null));
accessible.addAccessibleControlListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$3",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getChildAtPoint",
function(e){
e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getLocation",
function(e){
var rect=this.b$["$wt.widgets.Link"].display.map(this.b$["$wt.widgets.Link"].getParent(),null,this.b$["$wt.widgets.Link"].getBounds());
e.x=rect.x;
e.y=rect.y;
e.width=rect.width;
e.height=rect.height;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildCount",
function(e){
e.detail=0;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getRole",
function(e){
e.detail=30;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(e){
e.detail=1048576;
if(this.b$["$wt.widgets.Link"].hasFocus())e.detail|=4;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getDefaultAction",
function(e){
e.result=$WT.getMessage("SWT_Press");
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getSelection",
function(e){
if(this.b$["$wt.widgets.Link"].hasFocus())e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getFocus",
function(e){
if(this.b$["$wt.widgets.Link"].hasFocus())e.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
}
return $_N($wt.widgets.Link$3,i$,v$);
})(this,null));
});
$_V(c$,"getBorderWidth",
function(){
return 2;
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
var result=new StringBuffer();
var result2=new StringBuffer();
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
if((c).charCodeAt(0)>=('A').charCodeAt(0)&&(c).charCodeAt(0)<=('Z').charCodeAt(0)){
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
var offset=result.length();
var anchor=null;
if(handle!=null){
anchor=d$.createElement("A");
el.appendChild(anchor);
this.anchors[this.anchors.length]=anchor;
}this.parseMnemonics(buffer,linkStart,endtagStart,result,result2,anchor);
this.offsets[linkIndex]=new $wt.graphics.Point(offset,result.length()-1);
if(this.ids[linkIndex]==null){
this.ids[linkIndex]=String.instantialize(buffer,linkStart,endtagStart-linkStart);
}if(anchor!=null){
anchor.href=this.ids[linkIndex];
anchor.target="_blank";
anchor.title=this.ids[linkIndex];
}linkIndex++;
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
}this.cachedText=result2.toString();
return result.toString();
},"~S,Object");
$_M(c$,"parseMnemonics",
function(buffer,start,end,result,result2,handle){
var el=handle;
var mnemonic=-1;
var index=start;
var lastIndex=result.length();
while(index<end){
var c=buffer[index];
result2.append(c);
if((c).charCodeAt(0)==('&').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('&').charCodeAt(0)){
result.append(c);
index++;
}else{
mnemonic=result.length();
if(el!=null){
if((mnemonic>lastIndex)&&(el!=null)){
var len=mnemonic-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,mnemonic,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=mnemonic+1;
var span=d$.createElement("SPAN");
el.appendChild(span);
span.appendChild(d$.createTextNode(""+buffer[index+1]));
}}}else{
result.append(c);
}var lineBreak=false;
if((c).charCodeAt(0)==('\r').charCodeAt(0)){
if(index+1<end&&(buffer[index+1]).charCodeAt(0)==('\n').charCodeAt(0)){
result.append('\n');
index++;
}lineBreak=true;
}if((c).charCodeAt(0)==('\n').charCodeAt(0)){
lineBreak=true;
}if(lineBreak&&el!=null){
var idx=result.length();
if(idx>lastIndex){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,idx,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}lastIndex=idx;
el.appendChild(d$.createElement("BR"));
}index++;
}
var idx=result.length();
if(idx>lastIndex&&el!=null){
var len=idx-lastIndex;
var cs=$_A(len,'\0');
result.getChars(lastIndex,idx,cs,0);
var s=String.instantialize(cs,0,len);
el.appendChild(d$.createTextNode(s));
}return mnemonic;
},"~A,~N,~N,StringBuffer,StringBuffer,Object");
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
var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="link-disabled";
var idx=cssName.indexOf(key);
if(!enabled){
this.lastColor=this.handle.style.color;
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}this.handle.style.color=this.lastColor;
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
this.parse(string,this.handle);
System.out.println(this.cachedText);
System.out.println("ids==");
for(var i=0;i<this.ids.length;i++){
System.out.println(i+"/"+this.ids[i]);
}
System.out.println("mnemonics==");
for(var i=0;i<this.mnemonics.length;i++){
System.out.println(i+"/"+this.mnemonics[i]);
}
System.out.println("offsets==");
for(var i=0;i<this.offsets.length;i++){
System.out.println(i+"/"+this.offsets[i]);
}
},"~S");
$_M(c$,"unhookSelection",
function(){
for(var i=0;i<this.anchors.length;i++){
this.anchors[i].onclick=null;
this.anchors[i].ondblclick=null;
this.anchors[i].href=this.ids[i];
this.anchors[i].target="_blank";
}
});
c$.LINK_FOREGROUND=c$.prototype.LINK_FOREGROUND=new $wt.graphics.RGB(0,51,153);
c$=$_C(function(){
this.tabs=0;
this.oldStart=0;
this.oldEnd=0;
this.doubleClick=false;
this.ignoreModify=false;
this.ignoreVerify=false;
this.ignoreCharacter=false;
this.textHandle=null;
this.lineHeight=0;
$_Z(this,arguments);
},$wt.widgets,"Text",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Text,[parent,$wt.widgets.Text.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="text-default text-editable";
this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.doubleClick=true;
if((this.style&2)!=0){
this.textHandle=d$.createElement("TEXTAREA");
}else{
this.textHandle=d$.createElement("INPUT");
}if($wt.internal.browser.OS.isMozilla){
}var textCSSName=null;
if($wt.internal.browser.OS.isIE){
textCSSName="text-ie-default";
}if((this.style&2048)!=0){
if(textCSSName!=null){
textCSSName+=" text-border";
}else{
textCSSName="text-border";
}}if((this.style&8)!=0){
this.textHandle.readOnly=true;
}if((this.style&512)!=0&&(this.style&256)!=0){
this.textHandle.style.overflow="scroll";
}else{
if((this.style&512)!=0){
if(textCSSName!=null){
textCSSName+=" text-v-scroll";
}else{
textCSSName="text-v-scroll";
}}else if((this.style&256)!=0){
if(textCSSName!=null){
textCSSName+=" text-h-scroll";
}else{
textCSSName="text-h-scroll";
}}}if(textCSSName!=null){
this.textHandle.className=textCSSName;
}this.handle.appendChild(this.textHandle);
});
$_V(c$,"hookKeyDown",
function(){
this.textHandle.onkeydown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Text$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var verifyHooked=false;
if(this.b$["$wt.widgets.Text"].hooks(25)){
verifyHooked=true;
var evt=this.getEvent();
if(!this.b$["$wt.widgets.Text"].isInputCharacter(evt.keyCode,evt.shiftKey,evt.altKey,evt.ctrlKey)){
this.toReturn(true);
}else{
var e=new $wt.widgets.Event();
e.character=this.b$["$wt.widgets.Text"].getInputCharacter(evt.keyCode,evt.shiftKey,false);
var txt=""+e.character;
if((e.character).charCodeAt(0)==8||(e.character).charCodeAt(0)==46){
txt="";
}e.keyCode=evt.keyCode;
e.stateMask=(evt.shiftKey?131072:0)|(evt.ctrlKey?262144:0);
var s=this.b$["$wt.widgets.Text"].verifyText(txt,0,0,e);
if(s==null){
this.toReturn(false);
}else if(this.b$["$wt.widgets.Text"].hooks(24)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
}}}if(!verifyHooked||this.b$["$wt.widgets.Text"].hooks(1)){
var ev=new $wt.widgets.Event();
ev.type=24;
ev.widget=this.b$["$wt.widgets.Text"];
ev.display=this.b$["$wt.widgets.Text"].display;
ev.time=this.b$["$wt.widgets.Text"].display.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(ev);
this.toReturn(ev.doit);
this.b$["$wt.widgets.Text"].sendEvent(1);
}});
c$=$_P();
}
return $_N($wt.widgets.Text$1,i$,v$);
})(this,null));
});
$_V(c$,"hookModify",
function(){
this.textHandle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Text$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Text$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if((this.b$["$wt.widgets.Text"].style&8)!=0||(!this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var newText=this.b$["$wt.widgets.Text"].textHandle.value;
if(newText!=null){
var oldText=newText;
newText=this.b$["$wt.widgets.Text"].verifyText(newText,0,0,null);
if(newText==null){
this.toReturn(true);
return;
}if(!newText.equals(oldText)){
var e=new $wt.widgets.Event();
e.type=24;
e.item=this.b$["$wt.widgets.Text"];
e.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(e);
this.toReturn(e.doit);
}}});
c$=$_P();
}
return $_N($wt.widgets.Text$2,i$,v$);
})(this,null));
});
$_M(c$,"getInputCharacter",
($fz=function(keyCode,shiftKey,capsLockStatus){
var ch='\0';
if(keyCode==10||keyCode==13||keyCode==9||keyCode==32){
ch=String.fromCharCode(keyCode);
}else if(keyCode>=48&&keyCode<58){
if(!shiftKey){
ch=String.fromCharCode(keyCode);
}else{
var chs=[')','!','@','#','$','%','^','&','*','('];
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
if((shiftKey&&capsLockStatus)||(!shiftKey&&!capsLockStatus)){
ch=String.fromCharCode((keyCode+('a').charCodeAt(0)-('A').charCodeAt(0)));
}else{
ch=String.fromCharCode(keyCode);
}}else if(keyCode>=96&&keyCode<=105){
ch=String.fromCharCode((keyCode-96+('0').charCodeAt(0)));
}else if(keyCode>=106&&keyCode<=111&&keyCode!=108){
var chs=['*','+','?','-','.','/'];
ch=chs[keyCode-106];
}else if(keyCode>=186&&keyCode<=192){
if(!shiftKey){
var chs=[';','=',',','-','.','/','`'];
ch=chs[keyCode-186];
}else{
var chs=[':','+','<','_','>','?','~'];
ch=chs[keyCode-186];
}}else if(keyCode>=219&&keyCode<=222){
if(!shiftKey){
var chs=['[','\\',']','\''];
ch=chs[keyCode-219];
}else{
var chs=['{','|','}','\"'];
ch=chs[keyCode-219];
}}else{
ch=String.fromCharCode(keyCode);
}return ch;
},$fz.isPrivate=true,$fz),"~N,~B,~B");
$_M(c$,"isInputCharacter",
($fz=function(keyCode,shiftKey,altKey,ctrlKey){
if(altKey||ctrlKey){
return false;
}if(keyCode==10||keyCode==13||keyCode==9||keyCode==32||keyCode==8||keyCode==46||(keyCode>=48&&keyCode<=57)||keyCode==59||keyCode==61||(keyCode>=65&&keyCode<=90)||(keyCode>=96&&keyCode<=111&&keyCode!=108)||(keyCode>=186&&keyCode<=192)||(keyCode>=218&&keyCode<=222)){
return true;
}return false;
},$fz.isPrivate=true,$fz),"~N,~B,~B,~B");
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_M(c$,"append",
function(string){
this.textHandle.value+=string;
},"~S");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&4)!=0&&(style&2)!=0){
style&=-3;
}style=$wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
if((style&4)!=0)style&=-833;
if((style&64)!=0){
style|=2;
style&=-257;
}if((style&2)!=0)style&=-4194305;
if((style&(6))!=0)return style;
if((style&(768))!=0)return style|2;
return style|4;
},"~N");
$_M(c$,"clearSelection",
function(){
BrowserNative.clearSelection(this.textHandle);
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var height=0;
var width=0;
if(wHint==-1||hHint==-1){
var size=null;
var text=this.getText();
if(text!=null&&text.length!=0){
var wrap=(this.style&2)!=0&&(this.style&64)!=0;
if(wrap&&wHint!=-1&&wHint>0){
size=new $wt.graphics.Point(wHint,$wt.internal.browser.OS.getStringStyledWrappedHeight(text,"text-default",this.handle.style.cssText,wHint));
}else{
size=$wt.internal.browser.OS.getStringStyledSize(text,"text-default",this.handle.style.cssText);
}width=size.x;
height=size.y;
if(height<=0){
height=this.getLineHeight();
}}else{
width=0;
height=this.getLineHeight();
}}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var rect=$_U(this,$wt.widgets.Text,"computeTrim",[x,y,width,height]);
System.out.println(rect);
System.out.println(width+","+height);
if((this.style&2)!=0){
rect.width+=6;
}else{
rect.width+=1;
}if((this.style&256)!=0)rect.width++;
if((this.style&512)!=0){
rect.width+=16;
}if((this.style&256)!=0){
rect.height+=16;
}if((this.style&2048)!=0){
rect.x-=1;
rect.y-=1;
rect.width+=2;
rect.height+=2;
}return rect;
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Text,"createWidget",[]);
this.doubleClick=true;
this.setTabStops(this.tabs=8);
this.fixAlignment();
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"fixAlignment",
function(){
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getCaretLineNumber",
function(){
return BrowserNative.getTextCaretLineNumber(this.textHandle);
});
$_M(c$,"getCaretLocation",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getCaretPosition",
function(){
return BrowserNative.getTextCaretPosition(this.textHandle);
});
$_M(c$,"getCharCount",
function(){
return this.getSelectionCount();
});
$_M(c$,"getDoubleClickEnabled",
function(){
return this.doubleClick;
});
$_M(c$,"getEchoChar",
function(){
return'*';
});
$_M(c$,"getEditable",
function(){
var editableClass="text-editable";
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx!=-1){
return true;
}}return false;
});
$_M(c$,"getLineCount",
function(){
return 0;
});
$_M(c$,"getLineDelimiter",
function(){
return $wt.widgets.Text.DELIMITER;
});
$_M(c$,"getLineHeight",
function(){
if(this.lineHeight!=-1){
this.lineHeight=$wt.internal.browser.OS.getStringStyledHeight(".","text-default",this.handle.style.cssText);
}return this.lineHeight;
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return BrowserNative.getTextSelection(this.textHandle);
});
$_M(c$,"getSelectionCount",
function(){
var selection=this.getSelection();
return selection.y-selection.x;
});
$_M(c$,"getSelectionText",
function(){
return BrowserNative.getSelectionText(this.textHandle);
});
$_M(c$,"getTabs",
function(){
return this.tabs;
});
$_M(c$,"getTabWidth",
function(tabs){
return 64;
},"~N");
$_M(c$,"getText",
function(){
return this.textHandle.value;
});
$_M(c$,"getText",
function(start,end){
var length=this.textHandle.value.length;
start=Math.max(0,start);
end=Math.min(end,length-1);
return this.getText().substring(start,end+1);
},"~N,~N");
$_M(c$,"getTextLimit",
function(){
return 0;
});
$_M(c$,"getTopIndex",
function(){
if((this.style&4)!=0)return 0;
return 0;
});
$_M(c$,"getTopPixel",
function(){
return this.getTopIndex()*this.getLineHeight();
});
$_M(c$,"insert",
function(string){
var sel=BrowserNative.getTextSelection(this.textHandle);
if(this.hooks(25)||this.filters(25)){
string=this.verifyText(string,sel.x,sel.y,null);
if(string==null)return;
}BrowserNative.insertTextString(this.textHandle,string);
if((this.style&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"releaseHandle",
function(){
if(this.textHandle!=null){
BrowserNative.releaseHandle(this.textHandle);
this.textHandle=null;
}$_U(this,$wt.widgets.Text,"releaseHandle",[]);
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"selectAll",
function(){
this.textHandle.select();
});
$_M(c$,"sendKeyEvent",
function(type,msg,wParam,lParam,event){
return false;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Text,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBackground",
function(color){
if(color!=null)this.textHandle.style.backgroundColor=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setBackground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setDoubleClickEnabled",
function(doubleClick){
this.doubleClick=doubleClick;
},"~B");
$_M(c$,"setEchoChar",
function(echo){
if((this.style&2)!=0)return;
try{
this.textHandle.type="password";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
},"~N");
$_M(c$,"setEditable",
function(editable){
this.style&=-9;
if(!editable)this.style|=8;
this.textHandle.readOnly=!editable;
var editableClass="text-editable";
if(!editable){
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx!=-1){
var zzName=this.handle.className.substring(0,idx)+this.textHandle.className.substring(idx+editableClass.length);
this.handle.className=zzName;
}}}else{
if(this.handle.className!=null){
var idx=this.handle.className.indexOf(editableClass);
if(idx==-1){
this.handle.className+=" "+editableClass;
}}}},"~B");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Text,"setFont",[font]);
var tmp=this.handle;
this.handle=this.textHandle;
$_U(this,$wt.widgets.Text,"setFont",[font]);
this.handle=tmp;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
if(color!=null)this.textHandle.style.color=color.getCSSHandle();
$_U(this,$wt.widgets.Text,"setForeground",[color]);
},"$wt.graphics.Color");
$_M(c$,"setOrientation",
function(orientation){
this.fixAlignment();
},"~N");
$_M(c$,"setSelection",
function(start){
this.setSelection(start,this.textHandle.value.length);
},"~N");
$_M(c$,"setSelection",
function(start,end){
BrowserNative.setTextSelection(this.textHandle,start,end);
},"~N,~N");
$_M(c$,"setRedraw",
function(redraw){
$_U(this,$wt.widgets.Text,"setRedraw",[redraw]);
if(this.drawCount!=0)return;
},"~B");
$_M(c$,"setSelection",
function(selection){
this.setSelection(selection.x,selection.y);
},"$wt.graphics.Point");
$_M(c$,"setTabs",
function(tabs){
if(tabs<0)return;
this.tabs=tabs;
},"~N");
$_M(c$,"setTabStops",
function(tabs){
},"~N");
$_M(c$,"setText",
function(string){
this.textHandle.value=string;
if((this.style&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"setTextLimit",
function(limit){
if(limit>32767){
}},"~N");
$_M(c$,"setTopIndex",
function(index){
if((this.style&4)!=0)return;
},"~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}this.textHandle.style.width=(cx>0?cx:0)+"px";
this.textHandle.style.height=(cy>0?cy:0)+"px";
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
if(this.ignoreVerify)return string;
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_V(c$,"windowClass",
function(){
return"TEXTAREA";
});
$_S(c$,
"LIMIT",0x7FFF,
"DELIMITER","\r\n");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.widgets,"List",$wt.widgets.Scrollable);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.List,[parent,$wt.widgets.List.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(string){
if(this.handle!=null){
this.handle.options[this.handle.options.length]=new Option(string,string);
}},"~S");
$_M(c$,"add",
function(string,index){
if(this.handle!=null){
this.handle.options[index]=new Option(string,string);
}},"~S,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2+3;
height+=border*2;
if((this.style&512)!=0){
}if((this.style&256)!=0){
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("SELECT");
this.handle.size=2;
this.handle.className="list-default";
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.List$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"List$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.item=this.b$["$wt.widgets.List"];
e.widget=this.b$["$wt.widgets.List"];
this.b$["$wt.widgets.List"].sendEvent(e);
});
c$=$_P();
}
return $_N($wt.widgets.List$1,i$,v$);
})(this,null));
});
$_M(c$,"deselect",
function(indices){
if(indices.length==0)return;
},"~A");
$_M(c$,"deselect",
function(index){
if(index==-1)return;
if((this.style&4)!=0){
return;
}},"~N");
$_M(c$,"deselect",
function(start,end){
if(start>end)return;
if((this.style&4)!=0){
return;
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
if((this.style&4)!=0){
}else{
}});
$_M(c$,"getFocusIndex",
function(){
return-1;
});
$_M(c$,"getItem",
function(index){
return"";
},"~N");
$_M(c$,"getItemCount",
function(){
return 0;
});
$_M(c$,"getItemHeight",
function(){
return 12;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_M(c$,"getSelection",
function(){
var indices=this.getSelectionIndices();
var result=new Array(indices.length);
for(var i=0;i<indices.length;i++){
result[i]=this.getItem(indices[i]);
}
return result;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getSelectionIndex",
function(){
return 0;
});
$_M(c$,"getSelectionIndices",
function(){
return[this.handle.selectedIndex];
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}var index=start-1;
var last;
return index;
},"~S,~N");
$_M(c$,"isSelected",
function(index){
return false;
},"~N");
$_M(c$,"remove",
function(indices){
if(indices.length==0)return;
var newIndices=$_A(indices.length,0);
System.arraycopy(indices,0,newIndices,0,indices.length);
this.sort(newIndices);
var start=newIndices[newIndices.length-1];
var end=newIndices[0];
},"~A");
$_M(c$,"remove",
function(index){
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(indices){
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices,false);
},"~A");
$_M(c$,"select",
function(indices,scroll){
var i=0;
while(i<indices.length){
var index=indices[i];
if(index!=-1){
this.select(index,false);
}i++;
}
if(scroll)this.showSelection();
},"~A,~B");
$_M(c$,"select",
function(index){
this.select(index,false);
},"~N");
$_M(c$,"select",
function(index,scroll){
if(index<0)return;
},"~N,~B");
$_M(c$,"select",
function(start,end){
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,false);
}else{
this.select(start,end,false);
}},"~N,~N");
$_M(c$,"select",
function(start,end,scroll){
if(start==end){
this.select(start,scroll);
return;
}if(scroll)this.showSelection();
},"~N,~N,~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
},"~N,~N,~N,~N,~N");
$_M(c$,"setFocusIndex",
function(index){
},"~N");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.List,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setItem",
function(index,string){
var topIndex=this.getTopIndex();
var isSelected=this.isSelected(index);
this.remove(index);
this.add(string,index);
if(isSelected)this.select(index,false);
this.setTopIndex(topIndex);
},"~N,~S");
$_M(c$,"setItems",
function(items){
for(var j=this.handle.childNodes.length-1;j>=0;j++){
this.handle.removeChild(this.handle.childNodes[j]);
}
for(var i=0;i<items.length;i++){
var it=d$.createElement("OPTION");
it.appendChild(d$.createTextNode(items[i]));
it.value=items[i];
this.handle.appendChild(it);
}
},"~A");
$_M(c$,"setSelection",
function(indices){
this.deselectAll();
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices,true);
if((this.style&2)!=0){
var focusIndex=indices[0];
}},"~A");
$_M(c$,"setSelection",
function(items){
this.deselectAll();
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1))return;
var focusIndex=-1;
for(var i=length-1;i>=0;--i){
var string=items[i];
var index=0;
if(string!=null){
var localFocus=-1;
while((index=this.indexOf(string,index))!=-1){
if(localFocus==-1)localFocus=index;
this.select(index,false);
if((this.style&4)!=0&&this.isSelected(index)){
this.showSelection();
return;
}index++;
}
if(localFocus!=-1)focusIndex=localFocus;
}}
if((this.style&2)!=0){
}},"~A");
$_M(c$,"setSelection",
function(index){
this.deselectAll();
this.select(index,true);
if((this.style&2)!=0){
}},"~N");
$_M(c$,"setSelection",
function(start,end){
this.deselectAll();
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
if((this.style&4)!=0){
this.select(start,true);
}else{
this.select(start,end,true);
}},"~N,~N");
$_M(c$,"setTopIndex",
function(index){
},"~N");
$_M(c$,"showSelection",
function(){
});
$_V(c$,"windowClass",
function(){
return"SELECT";
});
c$=$_C(function(){
this.$back=false;
this.$forward=false;
this.navigate=false;
this.delaySetText=false;
this.addressBar=true;
this.menuBar=true;
this.statusBar=true;
this.toolBar=true;
this.info=0;
this.globalDispatch=0;
this.html=null;
this.closeWindowListeners=null;
this.locationListeners=null;
this.openWindowListeners=null;
this.progressListeners=null;
this.statusTextListeners=null;
this.titleListeners=null;
this.visibilityWindowListeners=null;
this.url=null;
$_Z(this,arguments);
},$wt.browser,"Browser",$wt.widgets.Composite);
$_Y(c$,function(){
this.closeWindowListeners=new Array(0);
this.locationListeners=new Array(0);
this.openWindowListeners=new Array(0);
this.progressListeners=new Array(0);
this.statusTextListeners=new Array(0);
this.titleListeners=new Array(0);
this.visibilityWindowListeners=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.browser.Browser,[parent,style&-2049]);
this.handle=d$.createElement("IFRAME");
this.handle.style.position="absolute";
this.handle.style.backgroundColor="white";
if(this.handle.style.filter!=null){
this.handle.style.border="2px solid menu";
}if(this.getParent().handle!=null){
this.getParent().handle.appendChild(this.handle);
}},"$wt.widgets.Composite,~N");
$_M(c$,"addCloseWindowListener",
function(listener){
var newCloseWindowListeners=new Array(this.closeWindowListeners.length+1);
System.arraycopy(this.closeWindowListeners,0,newCloseWindowListeners,0,this.closeWindowListeners.length);
this.closeWindowListeners=newCloseWindowListeners;
this.closeWindowListeners[this.closeWindowListeners.length-1]=listener;
},"$wt.browser.CloseWindowListener");
$_M(c$,"addLocationListener",
function(listener){
var newLocationListeners=new Array(this.locationListeners.length+1);
System.arraycopy(this.locationListeners,0,newLocationListeners,0,this.locationListeners.length);
this.locationListeners=newLocationListeners;
this.locationListeners[this.locationListeners.length-1]=listener;
},"$wt.browser.LocationListener");
$_M(c$,"addOpenWindowListener",
function(listener){
var newOpenWindowListeners=new Array(this.openWindowListeners.length+1);
System.arraycopy(this.openWindowListeners,0,newOpenWindowListeners,0,this.openWindowListeners.length);
this.openWindowListeners=newOpenWindowListeners;
this.openWindowListeners[this.openWindowListeners.length-1]=listener;
},"$wt.browser.OpenWindowListener");
$_M(c$,"addProgressListener",
function(listener){
var newProgressListeners=new Array(this.progressListeners.length+1);
System.arraycopy(this.progressListeners,0,newProgressListeners,0,this.progressListeners.length);
this.progressListeners=newProgressListeners;
this.progressListeners[this.progressListeners.length-1]=listener;
},"$wt.browser.ProgressListener");
$_M(c$,"addStatusTextListener",
function(listener){
var newStatusTextListeners=new Array(this.statusTextListeners.length+1);
System.arraycopy(this.statusTextListeners,0,newStatusTextListeners,0,this.statusTextListeners.length);
this.statusTextListeners=newStatusTextListeners;
this.statusTextListeners[this.statusTextListeners.length-1]=listener;
},"$wt.browser.StatusTextListener");
$_M(c$,"addTitleListener",
function(listener){
var newTitleListeners=new Array(this.titleListeners.length+1);
System.arraycopy(this.titleListeners,0,newTitleListeners,0,this.titleListeners.length);
this.titleListeners=newTitleListeners;
this.titleListeners[this.titleListeners.length-1]=listener;
},"$wt.browser.TitleListener");
$_M(c$,"addVisibilityWindowListener",
function(listener){
var newVisibilityWindowListeners=new Array(this.visibilityWindowListeners.length+1);
System.arraycopy(this.visibilityWindowListeners,0,newVisibilityWindowListeners,0,this.visibilityWindowListeners.length);
this.visibilityWindowListeners=newVisibilityWindowListeners;
this.visibilityWindowListeners[this.visibilityWindowListeners.length-1]=listener;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"back",
function(){
if(!this.$back)return false;
if(this.handle!=null&&this.handle.contentWindow!=null){
try{
this.handle.contentWindow.history.back();
this.$forward=true;
return true;
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
}return false;
});
$_V(c$,"checkSubclass",
function(){
var name=this.getClass().getName();
var index=name.lastIndexOf('.');
});
$_M(c$,"execute",
function(script){
return true;
},"~S");
$_M(c$,"forward",
function(){
if(!this.$forward)return false;
if(this.handle!=null&&this.handle.contentWindow!=null){
try{
this.handle.contentWindow.history.forward();
return true;
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
}return false;
});
$_M(c$,"isBackEnabled",
function(){
return this.$back;
});
$_M(c$,"isForwardEnabled",
function(){
return this.$forward;
});
$_M(c$,"getUrl",
function(){
return this.url;
});
$_M(c$,"refresh",
function(){
if(this.handle!=null){
if(this.handle.contentWindow!=null){
this.handle.contentWindow.reload();
}else{
this.handle.src=this.url;
}}});
$_M(c$,"removeCloseWindowListener",
function(listener){
if(this.closeWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.closeWindowListeners.length;i++){
if(listener==this.closeWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.closeWindowListeners.length==1){
this.closeWindowListeners=new Array(0);
return;
}var newCloseWindowListeners=new Array(this.closeWindowListeners.length-1);
System.arraycopy(this.closeWindowListeners,0,newCloseWindowListeners,0,index);
System.arraycopy(this.closeWindowListeners,index+1,newCloseWindowListeners,index,this.closeWindowListeners.length-index-1);
this.closeWindowListeners=newCloseWindowListeners;
},"$wt.browser.CloseWindowListener");
$_M(c$,"removeLocationListener",
function(listener){
if(this.locationListeners.length==0)return;
var index=-1;
for(var i=0;i<this.locationListeners.length;i++){
if(listener==this.locationListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.locationListeners.length==1){
this.locationListeners=new Array(0);
return;
}var newLocationListeners=new Array(this.locationListeners.length-1);
System.arraycopy(this.locationListeners,0,newLocationListeners,0,index);
System.arraycopy(this.locationListeners,index+1,newLocationListeners,index,this.locationListeners.length-index-1);
this.locationListeners=newLocationListeners;
},"$wt.browser.LocationListener");
$_M(c$,"removeOpenWindowListener",
function(listener){
if(this.openWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.openWindowListeners.length;i++){
if(listener==this.openWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.openWindowListeners.length==1){
this.openWindowListeners=new Array(0);
return;
}var newOpenWindowListeners=new Array(this.openWindowListeners.length-1);
System.arraycopy(this.openWindowListeners,0,newOpenWindowListeners,0,index);
System.arraycopy(this.openWindowListeners,index+1,newOpenWindowListeners,index,this.openWindowListeners.length-index-1);
this.openWindowListeners=newOpenWindowListeners;
},"$wt.browser.OpenWindowListener");
$_M(c$,"removeProgressListener",
function(listener){
if(this.progressListeners.length==0)return;
var index=-1;
for(var i=0;i<this.progressListeners.length;i++){
if(listener==this.progressListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.progressListeners.length==1){
this.progressListeners=new Array(0);
return;
}var newProgressListeners=new Array(this.progressListeners.length-1);
System.arraycopy(this.progressListeners,0,newProgressListeners,0,index);
System.arraycopy(this.progressListeners,index+1,newProgressListeners,index,this.progressListeners.length-index-1);
this.progressListeners=newProgressListeners;
},"$wt.browser.ProgressListener");
$_M(c$,"removeStatusTextListener",
function(listener){
if(this.statusTextListeners.length==0)return;
var index=-1;
for(var i=0;i<this.statusTextListeners.length;i++){
if(listener==this.statusTextListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.statusTextListeners.length==1){
this.statusTextListeners=new Array(0);
return;
}var newStatusTextListeners=new Array(this.statusTextListeners.length-1);
System.arraycopy(this.statusTextListeners,0,newStatusTextListeners,0,index);
System.arraycopy(this.statusTextListeners,index+1,newStatusTextListeners,index,this.statusTextListeners.length-index-1);
this.statusTextListeners=newStatusTextListeners;
},"$wt.browser.StatusTextListener");
$_M(c$,"removeTitleListener",
function(listener){
if(this.titleListeners.length==0)return;
var index=-1;
for(var i=0;i<this.titleListeners.length;i++){
if(listener==this.titleListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.titleListeners.length==1){
this.titleListeners=new Array(0);
return;
}var newTitleListeners=new Array(this.titleListeners.length-1);
System.arraycopy(this.titleListeners,0,newTitleListeners,0,index);
System.arraycopy(this.titleListeners,index+1,newTitleListeners,index,this.titleListeners.length-index-1);
this.titleListeners=newTitleListeners;
},"$wt.browser.TitleListener");
$_M(c$,"removeVisibilityWindowListener",
function(listener){
if(this.visibilityWindowListeners.length==0)return;
var index=-1;
for(var i=0;i<this.visibilityWindowListeners.length;i++){
if(listener==this.visibilityWindowListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.visibilityWindowListeners.length==1){
this.visibilityWindowListeners=new Array(0);
return;
}var newVisibilityWindowListeners=new Array(this.visibilityWindowListeners.length-1);
System.arraycopy(this.visibilityWindowListeners,0,newVisibilityWindowListeners,0,index);
System.arraycopy(this.visibilityWindowListeners,index+1,newVisibilityWindowListeners,index,this.visibilityWindowListeners.length-index-1);
this.visibilityWindowListeners=newVisibilityWindowListeners;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"setText",
function(html){
var blankLoading=this.html!=null;
this.html=html;
if(blankLoading)return true;
if(this.handle!=null){
BrowserNative.iframeDocumentWrite(this.handle,html);
}this.html=null;
return true;
},"~S");
$_M(c$,"setUrl",
function(url){
this.html=null;
this.url=url;
if(this.handle!=null){
if(this.handle.contentWindow!=null){
this.handle.contentWindow.location=url;
}else{
this.handle.src=url;
}}this.$back=true;
return true;
},"~S");
$_M(c$,"stop",
function(){
if(this.handle!=null){
if(this.handle.contentWindow!=null){
this.handle.contentWindow.stop();
}else{
}}});
$_M(c$,"setBounds",
function(x,y,width,height){
if(this.handle.style.filter!=null){
$_U(this,$wt.browser.Browser,"setBounds",[x,y,width-2,height-2]);
}else{
$_U(this,$wt.browser.Browser,"setBounds",[x,y,width-4,height-4]);
}},"~N,~N,~N,~N");
$_S(c$,
"BeforeNavigate2",0xfa,
"CommandStateChange",0x69,
"DocumentComplete",0x103,
"NavigateComplete2",0xfc,
"NewWindow2",0xfb,
"OnMenuBar",0x100,
"OnStatusBar",0x101,
"OnToolBar",0xff,
"OnVisible",0xfe,
"ProgressChange",0x6c,
"RegisterAsBrowser",0x228,
"StatusTextChange",0x66,
"TitleChange",0x71,
"WindowClosing",0x107,
"WindowSetHeight",0x10b,
"WindowSetLeft",0x108,
"WindowSetResizable",0x106,
"WindowSetTop",0x109,
"WindowSetWidth",0x10a,
"ABOUT_BLANK","about:blank",
"URL_DIRECTOR","http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab",
"PACKAGE_PREFIX","org.eclipse.swt.browser.");
c$=$_C(function(){
this.parent=null;
this.strings=null;
this.images=null;
this.checked=false;
this.grayed=false;
this.cached=false;
this.imageIndent=0;
this.background=-1;
this.foreground=-1;
this.font=-1;
this.cellBackground=null;
this.cellForeground=null;
this.cellFont=null;
this.index=0;
this.selected=false;
$_Z(this,arguments);
},$wt.widgets,"TableItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
this.construct(parent,style,$wt.widgets.TableItem.checkNull(parent).getItemCount(),true);
},"$wt.widgets.Table,~N");
$_K(c$,
function(parent,style,index){
this.construct(parent,style,index,true);
},"$wt.widgets.Table,~N,~N");
$_K(c$,
function(parent,style,index,create){
$_R(this,$wt.widgets.TableItem,[parent,style]);
this.parent=parent;
if(create)parent.createItem(this,index);
},"$wt.widgets.Table,~N,~N,~B");
c$.checkNull=$_M(c$,"checkNull",
function(control){
return control;
},"$wt.widgets.Table");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"clear",
function(){
this.text="";
this.image=null;
this.strings=null;
this.images=null;
this.imageIndent=0;
this.checked=this.grayed=false;
if((this.parent.style&268435456)!=0)this.cached=false;
});
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
});
$_M(c$,"getBackground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getBackground();
return new $wt.graphics.Color(this.display,this.handle.childNodes[index].style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(index){
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.style&32)==0)return false;
return this.checked;
});
$_M(c$,"getFont",
function(){
return this.display.getSystemFont();
});
$_M(c$,"getFont",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getFont();
return this.display.getSystemFont();
},"~N");
$_M(c$,"getForeground",
function(){
return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"getForeground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getForeground();
return new $wt.graphics.Color(null,this.handle.childNodes[index].style.backgroundColor);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.style&32)==0)return false;
return this.grayed;
});
$_M(c$,"getImage",
function(){
return $_U(this,$wt.widgets.TableItem,"getImage",[]);
});
$_M(c$,"getImage",
function(index){
if(index==0)return this.getImage();
if(this.images!=null){
if(0<=index&&index<this.images.length)return this.images[index];
}return null;
},"~N");
$_M(c$,"getImageBounds",
function(index){
var itemIndex=this.parent.indexOf(this);
if(itemIndex==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getImageIndent",
function(){
return this.imageIndent;
});
$_M(c$,"getNameText",
function(){
if((this.parent.style&268435456)!=0){
if(!this.cached)return"*virtual*";
}return $_U(this,$wt.widgets.TableItem,"getNameText",[]);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getText",
function(){
return $_U(this,$wt.widgets.TableItem,"getText",[]);
});
$_M(c$,"getText",
function(index){
if(index==0)return this.getText();
if(this.strings!=null){
if(0<=index&&index<this.strings.length){
var string=this.strings[index];
return string!=null?string:"";
}}return"";
},"~N");
$_M(c$,"redraw",
function(){
if((this.parent.style&268435456)!=0)this.cached=true;
if(this.parent.currentItem==this||this.parent.drawCount!=0)return;
var index=this.parent.indexOf(this);
if(index==-1)return;
});
$_M(c$,"redraw",
function(column,drawText,drawImage){
if((this.parent.style&268435456)!=0)this.cached=true;
if(this.parent.currentItem==this||this.parent.drawCount!=0)return;
var index=this.parent.indexOf(this);
if(index==-1)return;
},"~N,~B,~B");
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TableItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TableItem,"releaseWidget",[]);
this.parent=null;
this.strings=null;
this.images=null;
});
$_M(c$,"setBackground",
function(color){
var pixel=-1;
if(color!=null){
this.handle.style.backgroundColor=color.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(color!=null){
this.handle.childNodes[index].style.backgroundColor=color.getCSSHandle();
}},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(checked){
if((this.parent.style&32)==0)return;
if(this.checked==checked)return;
this.setChecked(checked,false);
},"~B");
$_M(c$,"setChecked",
function(checked,notify){
this.checked=checked;
if(notify){
var event=new $wt.widgets.Event();
event.item=this;
event.detail=32;
this.parent.postEvent(13,event);
}this.redraw();
},"~B,~B");
$_M(c$,"setFont",
function(font){
var hFont=-1;
if(font!=null){
this.parent.customDraw=true;
}if(this.font==hFont)return;
this.font=hFont;
this.parent.setScrollWidth(this,false);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(index,font){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(font!=null){
this.parent.customDraw=true;
}if(this.cellFont==null){
this.cellFont=$_A(count,0);
for(var i=0;i<count;i++){
this.cellFont[i]=-1;
}
}this.redraw(index,true,false);
},"~N,$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
var pixel=-1;
if(color!=null){
this.handle.style.color=color.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
var pixel=-1;
if(color!=null){
this.handle.childNodes[index].style.color=color.getCSSHandle();
}},"~N,$wt.graphics.Color");
$_M(c$,"setGrayed",
function(grayed){
if((this.parent.style&32)==0)return;
if(this.grayed==grayed)return;
this.grayed=grayed;
this.redraw();
},"~B");
$_M(c$,"setImage",
function(images){
for(var i=0;i<images.length;i++){
this.setImage(i,images[i]);
}
},"~A");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"setImage",
function(index,image){
if(index==0){
if(image!=null&&image.type==1){
if(image.equals(this.image))return;
}$_U(this,$wt.widgets.TableItem,"setImage",[image]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.images==null&&index!=0)this.images=new Array(count);
if(this.images!=null){
if(image!=null&&image.type==1){
if(image.equals(this.images[index]))return;
}this.images[index]=image;
}this.redraw(index,false,true);
},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
this.setImage(0,image);
},"$wt.graphics.Image");
$_M(c$,"setImageIndent",
function(indent){
if(indent<0)return;
if(this.imageIndent==indent)return;
this.imageIndent=indent;
if((this.parent.style&268435456)==0){
var index=this.parent.indexOf(this);
if(index!=-1){
}}this.parent.setScrollWidth(this,false);
this.redraw();
},"~N");
$_M(c$,"setText",
function(strings){
for(var i=0;i<strings.length;i++){
var string=strings[i];
if(string!=null)this.setText(i,string);
}
},"~A");
$_M(c$,"setText",
function(index,string){
if(index==0){
if(string.equals(this.text))return;
$_U(this,$wt.widgets.TableItem,"setText",[string]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.strings==null&&index!=0)this.strings=new Array(count);
if(this.strings!=null){
if(string.equals(this.strings[index]))return;
this.strings[index]=string;
}var tbodyTD=null;
if(index<this.handle.childNodes.length){
if(this.handle.childNodes[index]!=null&&"TD".equals(this.handle.childNodes[index].nodeName)){
tbodyTD=this.handle.childNodes[index];
}}if(tbodyTD==null){
tbodyTD=d$.createElement("TD");
this.handle.appendChild(tbodyTD);
}if(tbodyTD.childNodes!=null){
for(var i=0;i<tbodyTD.childNodes.length;i++){
if(tbodyTD.childNodes[i]!=null){
tbodyTD.removeChild(tbodyTD.childNodes[i]);
}}
}var el=d$.createElement("DIV");
tbodyTD.appendChild(el);
el.className="table-item-cell-default";
if(index==0&&(this.parent.style&32)!=0){
var check=d$.createElement("INPUT");
check.type="checkbox";
el.appendChild(check);
check.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.detail=32;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$1,i$,v$);
})(this,null));
}var text=d$.createElement("DIV");
el.appendChild(text);
text.className="table-item-cell-text-default";
text.appendChild(d$.createTextNode(string));
if((this.parent.style&65536)!=0||index==0){
text.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],evt.ctrlKey,evt.shiftKey);
var e=new $wt.widgets.Event();
e.type=13;
e.detail=0;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$2,i$,v$);
})(this,null));
text.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],evt.ctrlKey,evt.shiftKey);
System.out.println("An event is runned "+evt);
var e=new $wt.widgets.Event();
e.type=14;
e.detail=0;
e.item=this.b$["$wt.widgets.TableItem"];
e.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$3,i$,v$);
})(this,null));
}},"~N,~S");
$_M(c$,"showSelection",
function(selected){
this.selected=selected;
var index=0;
if((this.parent.style&32)!=0){
index++;
}var element=this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className=selected?"table-item-cell-text-selected":"table-item-cell-text-default";
},"~B");
$_M(c$,"isSelected",
function(){
return this.selected;
});
c$=$_C(function(){
this.parent=null;
this.resizable=false;
this.moveable=false;
$_Z(this,arguments);
},$wt.widgets,"TableColumn",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,parent.getColumnCount());
},"$wt.widgets.Table,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TableColumn,[parent,$wt.widgets.TableColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.Table,~N,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getAlignment",
function(){
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getMoveable",
function(){
return this.moveable;
});
$_M(c$,"getResizable",
function(){
return this.resizable;
});
$_M(c$,"getWidth",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return 0;
if(this.handle.style.width!=null&&this.handle.style.width.length!=0){
return Integer.parseInt(this.handle.style.width);
}return $wt.internal.browser.OS.getContainerWidth(this.handle);
});
$_M(c$,"pack",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TableColumn,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TableColumn,"releaseWidget",[]);
this.parent=null;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setAlignment",
function(alignment){
if((alignment&(16924672))==0)return;
var index=this.parent.indexOf(this);
if(index==-1||index==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
},"~N");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TableColumn,"setImage",[image]);
},"$wt.graphics.Image");
$_M(c$,"setMoveable",
function(moveable){
this.moveable=moveable;
this.parent.updateMoveable();
},"~B");
$_M(c$,"setResizable",
function(resizable){
this.resizable=resizable;
},"~B");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TableColumn,"setText",[string]);
if(this.handle.childNodes!=null){
for(var i=0;i<this.handle.childNodes.length;i++){
if(this.handle.childNodes[i]!=null){
this.handle.removeChild(this.handle.childNodes[i]);
}}
}this.handle.appendChild(d$.createTextNode(string));
},"~S");
$_M(c$,"setWidth",
function(width){
var index=this.parent.indexOf(this);
if(index==-1)return;
this.handle.style.width=width+"px";
},"~N");
c$=$_C(function(){
this.items=null;
this.columns=null;
this.imageList=null;
this.currentItem=null;
this.lastSelection=null;
this.selection=null;
this.lastIndexOf=0;
this.lastWidth=0;
this.customDraw=false;
this.cancelMove=false;
this.dragStarted=false;
this.fixScrollWidth=false;
this.tipRequested=false;
this.wasSelected=false;
this.ignoreActivate=false;
this.ignoreSelect=false;
this.ignoreShrink=false;
this.ignoreResize=false;
$_Z(this,arguments);
},$wt.widgets,"Table",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Table,[parent,$wt.widgets.Table.checkStyle(style)]);
this.selection=new Array(0);
this.items=new Array(0);
this.columns=new Array(0);
},"$wt.widgets.Composite,~N");
$_M(c$,"_getItem",
function(index){
if(this.items[index]!=null)return this.items[index];
return this.items[index]=new $wt.widgets.TableItem(this,0,-1,false);
},"~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=768;
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"checkData",
function(item,redraw){
if(item.cached)return true;
if((this.style&268435456)!=0){
item.cached=true;
var event=new $wt.widgets.Event();
event.item=item;
this.currentItem=item;
this.sendEvent(36,event);
this.currentItem=null;
if(this.isDisposed()||item.isDisposed())return false;
if(redraw){
if(!this.setScrollWidth(item,false)){
item.redraw();
}}}return true;
},"$wt.widgets.TableItem,~B");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"clear",
function(index){
var count=this.items.length;
},"~N");
$_M(c$,"clear",
function(start,end){
if(start>end)return;
},"~N,~N");
$_M(c$,"clear",
function(indices){
if(indices.length==0)return;
},"~A");
$_M(c$,"clearAll",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var lineWidth=0;
for(var i=0;i<this.columns.length;i++){
var maxWidth=0;
var t=this.columns[i].getNameText();
var columnWidth=this.getTextWidth(t);
maxWidth=Math.max(maxWidth,columnWidth);
for(var j=0;j<this.items.length;j++){
maxWidth=Math.max(maxWidth,this.getTextWidth(this.items[j].getText(i)));
}
lineWidth+=maxWidth+10;
}
width=lineWidth;
if(this.items.length>0){
var t=this.items[0].getNameText();
System.out.println(t);
height=($wt.internal.browser.OS.getStringPlainHeight(t)+5)*(this.items.length+0);
}else{
height=24;
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Table,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
this.handle.className="table-default";
var table=d$.createElement("TABLE");
this.handle.appendChild(table);
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}});
$_M(c$,"createItem",
function(column,index){
if(this.columns==null){
this.columns=new Array(0);
}if(this.handle==null){
return;
}var table=this.handle.childNodes[0];
var thead=null;
for(var i=0;i<table.childNodes.length;i++){
if("THEAD".equals(table.childNodes[i].nodeName)){
thead=table.childNodes[i];
break;
}}
if(thead==null){
thead=d$.createElement("THEAD");
thead.style.backgroundColor="menu";
table.appendChild(thead);
}var theadTR=null;
if(thead.childNodes!=null&&thead.childNodes.length!=0){
for(var i=0;i<thead.childNodes.length;i++){
if(thead.childNodes[i]!=null&&"TR".equals(thead.childNodes[i].nodeName)){
theadTR=thead.childNodes[i];
}}
}if(theadTR==null){
theadTR=d$.createElement("TR");
thead.appendChild(theadTR);
}var theadTD=d$.createElement("TD");
theadTD.style.whiteSpace="nowrap";
if(index<0||index>=theadTR.childNodes.length){
theadTR.appendChild(theadTD);
this.columns[index]=column;
}else{
theadTR.insertBefore(theadTD,theadTR.childNodes[index]);
for(var i=this.columns.length;i>index;i--){
this.columns[i]=this.columns[i-1];
}
this.columns[index]=column;
for(var i=0;i<this.items.length;i++){
var dataTD=d$.createElement("TD");
this.items[i].handle.insertBefore(dataTD,this.items[i].handle.childNodes[index]);
for(var j=this.items[i].strings.length;j>index;j--){
this.items[i].strings[j]=this.items[i].strings[j-1];
}
this.items[i].strings[index]="";
}
}if(theadTD.childNodes!=null){
for(var i=0;i<theadTD.childNodes.length;i++){
if(theadTD.childNodes[i]!=null){
theadTD.removeChild(theadTD.childNodes[i]);
}}
}theadTD.appendChild(d$.createTextNode(column.getText()));
theadTD.style.margin="0";
theadTD.style.padding="0";
column.handle=theadTD;
},"$wt.widgets.TableColumn,~N");
$_M(c$,"createItem",
function(item,index){
if(this.items==null){
this.items=new Array(0);
}item.index=index;
this.items[index]=item;
if(this.handle==null){
return;
}var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null){
tbody=d$.createElement("TBODY");
table.appendChild(tbody);
}var tbodyTR=d$.createElement("TR");
tbodyTR.className="table-item-default";
if(index<0||index>=tbody.childNodes.length){
tbody.appendChild(tbodyTR);
this.items[index]=item;
}else{
System.out.println("existed");
tbody.insertBefore(tbodyTR,tbody.childNodes[index]);
for(var i=this.items.length;i>index;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
this.items[index]=item;
}item.handle=tbodyTR;
},"$wt.widgets.TableItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Table,"createWidget",[]);
this.items=new Array(0);
this.columns=new Array(0);
if((this.style&268435456)!=0)this.customDraw=true;
});
$_M(c$,"deselect",
function(indices){
if(indices.length==0)return;
for(var i=0;i<indices.length;i++){
if(indices[i]>=0){
this.items[indices[i]].showSelection(false);
}}
this.removeFromSelection(indices);
},"~A");
$_M(c$,"deselect",
function(index){
if(index<0)return;
this.items[index].showSelection(false);
this.removeFromSelection([index]);
},"~N");
$_M(c$,"deselect",
function(start,end){
var count=this.items.length;
if(start==0&&end==count-1){
this.deselectAll();
}else{
start=Math.max(0,start);
var indices=$_A(end-start+1,0);
for(var i=start;i<=end;i++){
this.items[i].showSelection(false);
indices[i-start]=i;
}
this.removeFromSelection(indices);
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
for(var i=0;i<this.items.length;i++){
this.items[i].showSelection(false);
}
this.selection=new Array(0);
});
$_M(c$,"destroyItem",
function(column){
},"$wt.widgets.TableColumn");
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TableItem");
$_M(c$,"fixCheckboxImageList",
function(){
if((this.style&32)==0)return;
});
$_M(c$,"getTextWidth",
($fz=function(t){
var columnWidth=0;
if(t==null||t.length==0){
columnWidth=0;
}else{
columnWidth=$wt.internal.browser.OS.getStringPlainWidth(t);
}return columnWidth;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getColumn",
function(index){
return this.columns[index];
},"~N");
$_M(c$,"getColumnCount",
function(){
if(this.columns==null){
return 0;
}return this.columns.length;
});
$_M(c$,"getColumnOrder",
function(){
return $_A(0,0);
});
$_M(c$,"getColumns",
function(){
var count=this.columns.length;
if(count==1&&this.columns[0]==null)count=0;
var result=new Array(count);
System.arraycopy(this.columns,0,result,0,count);
return result;
});
$_M(c$,"getGridLineWidth",
function(){
return 1;
});
$_M(c$,"getHeaderHeight",
function(){
return 16;
});
$_M(c$,"getHeaderVisible",
function(){
return false;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this._getItem(index);
},"~N");
$_M(c$,"getItem",
function(point){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
if(this.items==null){
return 0;
}return this.items.length;
});
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var count=this.items.length;
var result=new Array(count);
if((this.style&268435456)!=0){
for(var i=0;i<count;i++){
result[i]=this._getItem(i);
}
}else{
System.arraycopy(this.items,0,result,0,count);
}return result;
});
$_M(c$,"getLinesVisible",
function(){
return true;
});
$_M(c$,"getSelection",
function(){
return this.selection;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getSelectionIndex",
function(){
return 0;
});
$_M(c$,"getSelectionIndices",
function(){
var result=$_A(this.selection.length,0);
for(var i=0;i<this.selection.length;i++){
result[i]=0;
}
return result;
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(column){
var count=this.columns.length;
for(var i=0;i<count;i++){
if(this.columns[i]==column)return i;
}
return-1;
},"$wt.widgets.TableColumn");
$_M(c$,"indexOf",
function(item){
var count=this.items.length;
if(1<=this.lastIndexOf&&this.lastIndexOf<count-1){
if(this.items[this.lastIndexOf]==item)return this.lastIndexOf;
if(this.items[this.lastIndexOf+1]==item)return++this.lastIndexOf;
if(this.items[this.lastIndexOf-1]==item)return--this.lastIndexOf;
}if(this.lastIndexOf<Math.floor(count/2)){
for(var i=0;i<count;i++){
if(this.items[i]==item)return this.lastIndexOf=i;
}
}else{
for(var i=count-1;i>=0;--i){
if(this.items[i]==item)return this.lastIndexOf=i;
}
}return-1;
},"$wt.widgets.TableItem");
$_M(c$,"isSelected",
function(index){
return false;
},"~N");
$_M(c$,"removeItems",
function(indices){
if(indices==null&&indices.length>this.items.length)return;
var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
var count=this.items.length;
if(tbody==null)return;
var last=-1;
var newItems=new Array(this.items.length-indices.length);
for(var i=0;i<indices.length;i++){
var index=i;
if(index<0||index>=this.items.length)return;
var item=this.items[index];
if(item==null)return;
if(item!=null){
System.arraycopy(this.items,index+1,this.items,index,--count-index);
this.items[count]=null;
last=index;
}tbody.removeChild(item.handle);
}
},"~A");
$_M(c$,"releaseWidget",
function(){
var columnCount=this.columns.length;
if(columnCount==1&&this.columns[0]==null)columnCount=0;
var itemCount=this.items.length;
for(var i=0;i<itemCount;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed())item.releaseResources();
}
this.customDraw=false;
this.currentItem=null;
this.items=null;
for(var i=0;i<columnCount;i++){
var column=this.columns[i];
if(!column.isDisposed())column.releaseResources();
}
this.columns=null;
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.Table,"releaseWidget",[]);
});
$_M(c$,"remove",
function(indices){
if(indices.length==0)return;
var newIndices=$_A(indices.length,0);
System.arraycopy(indices,0,newIndices,0,indices.length);
var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null)return;
var start=newIndices[newIndices.length-1];
var end=newIndices[0];
var count=this.items.length;
if(!(0<=start&&start<=end&&end<count)){
return;
}this.deselect(indices);
var itemsToBeRemoved=new Array(indices.length);
var last=-1;
for(var i=0;i<newIndices.length;i++){
var index=newIndices[i];
if(index!=last){
var item=this.items[index];
if(item!=null){
tbody.removeChild(item.handle);
item.releaseHandle();
System.arraycopy(this.items,index+1,this.items,index,--count-index);
this.items[count]=null;
last=index;
}}}
var newItems=new Array(indices.length);
System.arraycopy(this.items,0,newItems,0,indices.length);
this.items=newItems;
},"~A");
$_M(c$,"remove",
function(index){
this.remove([index]);
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var count=this.items.length;
if(!(0<=start&&start<=end&&end<count)){
return;
}var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null)return;
this.deselect(start,end);
var index=start;
while(index<=end){
var item=this.items[index];
if(item!=null&&!item.isDisposed()){
tbody.removeChild(item.handle);
item.releaseHandle();
}index++;
}
var newItems=new Array(count-(index-start));
System.arraycopy(this.items,0,newItems,0,start);
System.arraycopy(this.items,index,newItems,start,count-index);
this.items=newItems;
},"~N,~N");
$_M(c$,"removeAll",
function(){
this.remove(0,this.items.length-1);
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(indices){
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
},"~A");
$_M(c$,"select",
function(index){
if(index<0)return;
this.deselectAll();
this.items[index].showSelection(true);
this.selection=new Array(1);
this.selection[0]=this.items[index];
this.items[index].handle.className="table-item-selected";
},"~N");
$_M(c$,"select",
function(start,end){
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
var count=this.items.length;
if(count==0||start>=count)return;
this.deselectAll();
start=Math.max(0,start);
end=Math.min(end,count-1);
if(start==0&&end==count-1){
this.selectAll();
}else{
this.selection=new Array(end-start+1);
for(var i=start;i<=end;i++){
this.items[i].showSelection(true);
this.selection[i-start]=this.items[i];
}
}},"~N,~N");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
this.selection=new Array(this.items.length);
for(var i=0;i<this.items.length;i++){
this.items[i].showSelection(true);
this.selection[i]=this.items[i];
}
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var fixResize=false;
if(fixResize)this.setRedraw(false);
$_U(this,$wt.widgets.Table,"setBounds",[x,y,width,height,flags]);
if(fixResize)this.setRedraw(true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setColumnOrder",
function(order){
},"~A");
$_M(c$,"setCheckboxImageListColor",
function(){
if((this.style&32)==0)return;
});
$_M(c$,"setCheckboxImageList",
function(width,height){
if((this.style&32)==0)return;
var count=4;
},"~N,~N");
$_M(c$,"setFocusIndex",
function(index){
if(index<0)return;
},"~N");
$_M(c$,"setFont",
function(font){
var topIndex=this.getTopIndex();
this.setRedraw(false);
this.setTopIndex(0);
$_U(this,$wt.widgets.Table,"setFont",[font]);
this.setTopIndex(topIndex);
this.setScrollWidth(null,true);
this.setRedraw(true);
this.setItemHeight();
},"$wt.graphics.Font");
$_M(c$,"setHeaderVisible",
function(show){
},"~B");
$_M(c$,"setItemCount",
function(count){
count=Math.max(0,count);
},"~N");
$_M(c$,"setItemHeight",
function(){
});
$_M(c$,"setLinesVisible",
function(show){
var newBits=0;
},"~B");
$_V(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setScrollWidth",
function(item,force){
if(this.currentItem!=null){
if(this.currentItem!=item)this.fixScrollWidth=true;
return false;
}return false;
},"$wt.widgets.TableItem,~B");
$_M(c$,"setSelection",
function(indices){
this.deselectAll();
var length=indices.length;
if(length==0||((this.style&4)!=0&&length>1))return;
this.select(indices);
var focusIndex=indices[0];
if(focusIndex!=-1)this.setFocusIndex(focusIndex);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(items){
this.deselectAll();
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1))return;
var focusIndex=-1;
this.selection=items;
for(var i=length-1;i>=0;--i){
var index=this.indexOf(items[i]);
items[i].showSelection(true);
if(index!=-1){
focusIndex=index;
}}
if(focusIndex!=-1)this.setFocusIndex(focusIndex);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(index){
this.deselectAll();
this.select(index);
this.setFocusIndex(index);
},"~N");
$_M(c$,"setSelection",
function(start,end){
this.deselectAll();
if(end<0||start>end||((this.style&4)!=0&&start!=end))return;
var count=this.items.length;
if(count==0||start>=count)return;
start=Math.max(0,start);
end=Math.min(end,count-1);
this.select(start,end);
this.selection=new Array(end-start+1);
for(var i=start;i<=end;i++){
this.selection[i-start]=this.items[i];
}
this.setFocusIndex(start);
this.showSelection();
},"~N,~N");
$_M(c$,"setTableEmpty",
function(){
});
$_M(c$,"removeFromSelection",
($fz=function(indices){
if(this.selection.length<indices.length){
return;
}var newSelection=new Array(this.selection.length-indices.length);
var j=0;
for(var i=0;i<indices.length;i++){
if(this.selection[i].isSelected()){
newSelection[j++]=this.selection[i];
}}
this.selection=newSelection;
},$fz.isPrivate=true,$fz),"~A");
$_M(c$,"toggleSelection",
function(item,isCtrlKeyHold,isShiftKeyHold){
if(item==null){
return false;
}if((this.style&2)!=0&&(isCtrlKeyHold||isShiftKeyHold)){
if(isCtrlKeyHold){
for(var i=0;i<this.selection.length;i++){
if(item==this.selection[i]){
var newSelections=new Array(this.selection.length);
for(var j=0;j<i;j++){
newSelections[j]=this.selection[j];
}
for(var j=i;j<this.selection.length-1;j++){
newSelections[j]=this.selection[j+1];
}
this.selection=newSelections;
item.showSelection(false);
this.lastSelection=item;
return false;
}}
this.selection[this.selection.length]=item;
this.lastSelection=item;
item.showSelection(true);
}else{
for(var i=0;i<this.selection.length;i++){
if(this.selection[i]!=null){
this.selection[i].showSelection(false);
}}
if(this.lastSelection!=null){
var idx1=Math.min(this.lastSelection.index,item.index);
var idx2=Math.max(this.lastSelection.index,item.index);
System.out.println("here!"+idx1+":"+idx2);
this.selection=new Array(0);
for(var i=idx1;i<=idx2;i++){
var ti=this.items[i];
this.selection[this.selection.length]=ti;
ti.showSelection(true);
}
return true;
}else{
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=item;
}}}else{
item.showSelection(true);
for(var i=0;i<this.selection.length;i++){
if(this.selection[i]!=null&&this.selection[i]!=item){
this.selection[i].showSelection(false);
}}
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=item;
}this.lastSelection=item;
return true;
},"$wt.widgets.TableItem,~B,~B");
$_M(c$,"setTopIndex",
function(index){
},"~N");
$_M(c$,"showColumn",
function(column){
if(column.parent!=this)return;
var index=this.indexOf(column);
if(index==-1)return;
},"$wt.widgets.TableColumn");
$_M(c$,"showItem",
function(index){
},"~N");
$_M(c$,"showItem",
function(item){
var index=this.indexOf(item);
if(index!=-1)this.showItem(index);
},"$wt.widgets.TableItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"updateMoveable",
function(){
});
$_S(c$,
"INSET",4,
"GRID_WIDTH",1,
"HEADER_MARGIN",10);
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.hasImage=false;
this.textEl=null;
$_Z(this,arguments);
},$wt.widgets,"TabItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
var index=parent.getItemCount();
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TabItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
this.configure(index);
},"$wt.widgets.TabFolder,~N,~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"configure",
($fz=function(index){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TabItem"].parent.setSelection(this.f$.index,true);
});
c$=$_P();
}
return $_N($wt.widgets.TabItem$1,i$,v$);
})(this,$_F("index",index)));
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
BrowserNative.releaseHandle(this.textEl);
this.textEl=null;
}if(this.handle!=null){
BrowserNative.releaseHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.TabItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=control;
var index=this.parent.indexOf(this);
if(index!=this.parent.getSelectionIndex()){
if(newControl!=null)newControl.setVisible(false);
return;
}if(newControl!=null){
newControl.setBounds(this.parent.getClientArea());
newControl.setVisible(true);
}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TabItem,"setImage",[image]);
if(image!=null&&image.handle==null&&image.url!=null&&image.url.length!=0){
var handleStyle=this.textEl.style;
if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}else{
this.textEl.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&this.textEl.style.filter!=null){
this.textEl.style.filter="";
}}var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="tab-item-image";
var idx=cssName.indexOf(key);
this.hasImage=image!=null;
if(this.hasImage){
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}},"$wt.graphics.Image");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TabItem,"setText",[string]);
if(this.handle!=null){
$wt.internal.browser.OS.clearChildren(this.handle);
this.textEl=d$.createElement("SPAN");
this.handle.appendChild(this.textEl);
this.textEl.appendChild(d$.createTextNode(string));
}this.text=string;
},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
c$=$_C(function(){
this.items=null;
this.borderFrame=null;
this.borderNW=null;
this.borderNE=null;
this.borderSW=null;
this.borderSE=null;
this.itemMore=null;
this.btnPrevTab=null;
this.btnNextTab=null;
this.contentArea=null;
this.offset=0;
this.imageList=null;
$_Z(this,arguments);
},$wt.widgets,"TabFolder",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TabFolder,[parent,$wt.widgets.TabFolder.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
System.out.println(wHint+","+hHint+","+changed);
var size=$_U(this,$wt.widgets.TabFolder,"computeSize",[wHint,hHint,changed]);
System.out.println("super size of tabfolder:"+size);
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
}}
}if(width<0){
width+=136;
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
System.out.println("in tab folder "+size);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=0;
if(this.items!=null&&this.items.length>0){
lineHeight=$wt.internal.browser.OS.getContainerHeight(this.items[this.offset].handle);
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}if($wt.internal.browser.OS.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}x-=4;
y-=4+lineHeight;
}width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"Object,~S");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="tab-item-default";
this.borderFrame.insertBefore(tab,this.itemMore);
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var key="tab-folder-no-tab";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}item.textEl=d$.createElement("SPAN");
tab.appendChild(item.textEl);
item.textEl.appendChild(d$.createTextNode(item.getNameText()));
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
}},"$wt.widgets.TabItem,~N");
$_V(c$,"createHandle",
function(){
this.items=new Array(0);
var cssName="tab-folder-default";
if((this.style&2048)!=0){
cssName+=" tab-folder-border-default";
}this.handle=this.createCSSElement(this.parent.containerHandle(),cssName);
cssName="tab-folder-no-tab";
if((this.style&1024)!=0){
cssName+=" tab-folder-bottom";
}this.borderFrame=this.createCSSElement(this.handle,cssName);
cssName="tab-folder-border ";
this.itemMore=this.createCSSElement(this.borderFrame,"tab-item-more");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
this.itemMore.style.bottom="6px";
}var el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
el.appendChild(this.btnNextTab);
var arrowRight=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
arrowRight.style.left="-5px";
arrowRight.style.top="0";
}el.onclick=this.btnNextTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabFolder$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset+1>=this.b$["$wt.widgets.TabFolder"].items.length)return;
var w=0;
var ww=$wt.internal.browser.OS.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[this.b$["$wt.widgets.TabFolder"].offset].handle);
var width=this.b$["$wt.widgets.TabFolder"].getSize().x-36;
for(var i=this.b$["$wt.widgets.TabFolder"].offset+1;i<this.b$["$wt.widgets.TabFolder"].items.length;i++){
var x=$wt.internal.browser.OS.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[i].handle);
w+=x;
ww+=x;
if(w>width){
if(i<this.b$["$wt.widgets.TabFolder"].items.length-1){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}}}
if(ww>width){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$1,i$,v$);
})(this,null));
el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
el.appendChild(this.btnPrevTab);
var arrowLeft=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
arrowLeft.style.left="-6px";
arrowLeft.style.top="0";
}el.onclick=this.btnPrevTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabFolder$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("in Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
if(this.b$["$wt.widgets.TabFolder"].offset<=0)return;
this.b$["$wt.widgets.TabFolder"].offset--;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$2,i$,v$);
})(this,null));
this.borderNW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-nw");
this.borderNE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-ne");
this.borderSW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-sw");
this.borderSE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-se");
this.contentArea=this.createCSSElement(this.handle,"tab-folder-content-area");
this.state&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.TabFolder,"createWidget",[]);
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TabItem");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.TabFolder,"setBounds",[x,y,width,height]);
},"~N,~N,~N,~N");
$_M(c$,"setSize",
function(width,height){
$_U(this,$wt.widgets.TabFolder,"setSize",[width,height]);
},"~N,~N");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var selectionIndex=this.getSelectionIndex();
if(selectionIndex!=-1){
var ctrl=this.items[selectionIndex].control;
if(ctrl!=null)ctrl.setBounds(this.getClientArea());
this.setSelection(selectionIndex,false);
}return $_U(this,$wt.widgets.TabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"Object,Object,~N,~N,~N,~N,~N");
$_V(c$,"getClientArea",
function(){
this.forceResize();
var x=4;
var y=4;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=$wt.internal.browser.OS.getContainerHeight(this.items[this.offset].handle);
if($wt.internal.browser.OS.isIE)lineHeight++;
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}h-=lineHeight;
if((this.style&1024)==0){
y+=lineHeight;
}else{
if($wt.internal.browser.OS.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border;
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return new Array(0);
return[this.items[index]];
});
$_M(c$,"getSelectionIndex",
function(){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
System.out.println("The selection is not happend yet!");
return-1;
});
$_M(c$,"indexOf",
function(item){
var count=this.getItemCount();
for(var i=0;i<count;i++){
if(this.items[i]==item)return i;
}
return-1;
},"$wt.widgets.TabItem");
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control==child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.borderNW!=null){
BrowserNative.releaseHandle(this.borderNW);
this.borderNW=null;
}if(this.borderNE!=null){
BrowserNative.releaseHandle(this.borderNE);
this.borderNE=null;
}if(this.borderSW!=null){
BrowserNative.releaseHandle(this.borderSW);
this.borderSW=null;
}if(this.borderSE!=null){
BrowserNative.releaseHandle(this.borderSE);
this.borderSE=null;
}if(this.btnPrevTab!=null){
BrowserNative.releaseHandle(this.btnPrevTab.parentNode);
BrowserNative.releaseHandle(this.btnPrevTab);
this.btnPrevTab=null;
}if(this.btnNextTab!=null){
BrowserNative.releaseHandle(this.btnNextTab.parentNode);
BrowserNative.releaseHandle(this.btnNextTab);
this.btnNextTab=null;
}if(this.itemMore!=null){
BrowserNative.releaseHandle(this.itemMore);
this.itemMore=null;
}if(this.borderFrame!=null){
BrowserNative.releaseHandle(this.borderFrame);
this.borderFrame=null;
}if(this.contentArea!=null){
BrowserNative.releaseHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.widgets.TabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
this.items=null;
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.TabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.TabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control==control)item.setControl(null);
}
},"$wt.widgets.Control");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setSelection",
function(items){
if(items.length==0){
this.setSelection(-1,false);
}else{
for(var i=items.length-1;i>=0;--i){
var index=this.indexOf(items[i]);
if(index!=-1)this.setSelection(index,false);
}
}},"~A");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
System.out.println("set selection is called!");
var oldIndex=this.getSelectionIndex();
if(oldIndex!=-1&&oldIndex!=index){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.updateSelection(index);
var newIndex=index;
if(oldIndex==index){
newIndex=-1;
}if(newIndex!=-1){
var item=this.items[newIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}},"~N,~B");
$_M(c$,"updateSelection",
function(index){
var key="tab-item-selected";
for(var i=0;i<this.offset;i++){
this.items[i].handle.style.display="none";
if(index>=this.offset){
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}}
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
this.items[i].handle.style.display="block";
this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
if(i>index){
}}var w=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}s.left=x+"px";
x+=w;
}
var ww=Integer.parseInt(this.handle.style.width);
if(ww>0){
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var xkey="tab-show-more-item";
var idx=cssName.indexOf(xkey);
if(x>ww||this.offset!=0){
if(idx==-1){
this.borderFrame.className+=" "+xkey;
}}else{
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+xkey.length);
}}}var cssName=this.items[index].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
this.items[index].handle.className+=" "+key;
}this.items[index].handle.style.zIndex=(this.items.length+1)+"";
if(this.width!=0){
var w=$wt.internal.browser.OS.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-((this.style&2048)!=0?4:0));
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}if((this.style&1024)!=0){
this.borderSW.style.width=(left-2)+"px";
this.borderSE.style.width=y+"px";
}else{
this.borderNW.style.width=(left-2)+"px";
this.borderNE.style.width=y+"px";
}}}},"~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
c$=$_C(function(){
this.noSelection=true;
this.ignoreModify=false;
this.ignoreCharacter=false;
this.visibleCount=5;
this.dropDownButton=null;
this.textInput=null;
this.selectInput=null;
this.selectShown=false;
this.isSimple=false;
$_Z(this,arguments);
},$wt.widgets,"Combo",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Combo,[parent,$wt.widgets.Combo.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(string){
if(this.selectInput!=null){
this.selectInput.options[this.selectInput.options.length]=new Option(string,string);
}},"~S");
$_M(c$,"add",
function(string,index){
var count=this.selectInput.options.length;
if(this.selectInput!=null){
this.selectInput.options[index]=new Option(string,string);
}},"~S,~N");
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_V(c$,"checkSubclass",
function(){
});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style&=-2049;
style&=-769;
style=$wt.widgets.Widget.checkBits(style,4,64,0,0,0,0);
if((style&64)!=0)return style&-9;
return style;
},"~N");
$_M(c$,"clearSelection",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(wHint==-1){
if(this.selectInput!=null){
var options=this.selectInput.options;
for(var i=0;i<options.length;i++){
width=Math.max(width,$wt.internal.browser.OS.getStringPlainWidth(options[i].value));
}
}else{
width=64;
}width+=$wt.internal.browser.OS.getContainerWidth(this.dropDownButton);
}if(hHint==-1){
if((this.style&64)!=0){
height=this.computeSelectHeight();
}height+=this.getTextHeight();
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
System.out.println("Combo : "+width+" "+height+" hints "+wHint+" "+hHint);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeSelectHeight",
($fz=function(){
return this.getItemHeight()*this.visibleCount;
},$fz.isPrivate=true,$fz));
$_M(c$,"copy",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Combo,"createHandle",[]);
this.state&=-3;
this.isSimple=(this.style&64)!=0;
this.handle.className+=" combo-default";
this.textInput=d$.createElement("INPUT");
this.textInput.type="text";
this.textInput.className="combo-input-box";
this.textInput.readOnly=(this.style&8)!=0;
this.textInput.size=32767;
this.handle.appendChild(this.textInput);
this.dropDownButton=d$.createElement("BUTTON");
this.dropDownButton.className="combo-button";
this.handle.appendChild(this.dropDownButton);
var height=$wt.internal.browser.OS.getContainerHeight(this.dropDownButton);
this.selectInput=d$.createElement("SELECT");
if(this.isSimple){
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
System.out.println("is Simple "+this.isSimple);
this.selectInput.className="combo-select-box-visible";
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
}else{
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
System.out.println("is Simple "+this.isSimple);
this.selectInput.className="combo-select-box-invisible";
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
}this.dropDownButton.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("button clicked!");
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].show();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$1,i$,v$);
})(this,null));
this.selectInput.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("select changed!"+this.b$["$wt.widgets.Combo"].selectInput.selectedIndex);
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$2,i$,v$);
})(this,null));
this.selectInput.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
System.out.println("handle blurred!");
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$3,i$,v$);
})(this,null));
});
$_M(c$,"hide",
function(){
this.selectShown=false;
this.selectInput.className="combo-select-box-invisible";
});
$_M(c$,"show",
function(){
this.selectShown=true;
this.selectInput.style.zIndex="120";
this.selectInput.className="combo-select-box-visible";
System.out.println("Z "+this.selectInput.style.zIndex);
this.selectInput.focus();
});
$_M(c$,"updateSelection",
function(){
this.textInput.value=this.selectInput.options[this.getSelectionIndex()].value;
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"deregister",
function(){
$_U(this,$wt.widgets.Combo,"deregister",[]);
});
$_M(c$,"deselect",
function(index){
this.selectInput.selectedIndex=-1;
this.sendEvent(24);
},"~N");
$_M(c$,"deselectAll",
function(){
this.selectInput.selectedIndex=-1;
this.sendEvent(24);
});
$_M(c$,"getItem",
function(index){
var options=this.selectInput.options;
return this.selectInput.options[index].value;
},"~N");
$_M(c$,"getItemCount",
function(){
return this.selectInput.options.length;
});
$_M(c$,"getItemHeight",
function(){
return $wt.internal.browser.OS.getStringPlainHeight("A")+1;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getSelectionIndex",
function(){
if(this.noSelection)return-1;
System.out.println("combo selected Index "+this.selectInput.selectedIndex);
return this.selectInput.selectedIndex;
});
$_M(c$,"getText",
function(){
return this.textInput.value;
});
$_M(c$,"getTextHeight",
function(){
return $wt.internal.browser.OS.getStringPlainHeight("A")+6;
});
$_M(c$,"getTextLimit",
function(){
return this.textInput.size;
});
$_M(c$,"getVisibleItemCount",
function(){
return this.visibleCount;
});
$_V(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}return-1;
},"~S,~N");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"register",
function(){
$_U(this,$wt.widgets.Combo,"register",[]);
});
$_M(c$,"remove",
function(index){
var oldOptions=this.selectInput.options;
var newOptions=new Array(oldOptions.length-1);
System.arraycopy(oldOptions,0,newOptions,0,index);
System.arraycopy(oldOptions,index+1,newOptions,index,oldOptions.length-index-1);
this.selectInput.options=newOptions;
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var oldOptions=this.selectInput.options;
var newOptions=new Array(oldOptions.length-(end-start+1));
System.arraycopy(oldOptions,0,newOptions,0,start);
System.arraycopy(oldOptions,end+1,newOptions,start,oldOptions.length-end-1);
this.selectInput.options=newOptions;
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
this.selectInput.options=new Array(0);
this.sendEvent(24);
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"select",
function(index){
if(index>=0&&index<this.selectInput.options.length){
this.selectInput.selectedIndex=index;
}},"~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var buttonHeight=this.getTextHeight();
var buttonWidth=$wt.internal.browser.OS.getContainerWidth(this.dropDownButton);
if(!this.isSimple){
this.left=x;
this.top=y;
this.width=width;
this.height=height;
this.SetWindowPos(this.handle,null,x,y,width,height,flags);
this.textInput.style.height=this.dropDownButton.style.height=Math.min(height,buttonHeight)+"px";
this.dropDownButton.style.width=buttonWidth+"px";
this.textInput.style.width=Math.max(0,width-buttonWidth)+"px";
}else{
$_U(this,$wt.widgets.Combo,"setBounds",[x,y,width,height,flags]);
this.selectInput.style.height=(Math.max(0,height-buttonHeight))+"px";
this.textInput.style.height=this.dropDownButton.style.height=(buttonHeight)+"px";
this.dropDownButton.style.display="none";
this.textInput.style.width=width+"px";
}this.selectInput.style.width=width+"px";
System.out.println("combo left "+this.left+" "+this.top+" textInput "+this.dropDownButton.style.width+" "+this.dropDownButton.style.height);
},"~N,~N,~N,~N,~N");
$_M(c$,"setItem",
function(index,string){
this.remove(index);
if(this.isDisposed())return;
this.add(string,index);
},"~N,~S");
$_M(c$,"setItems",
function(items){
for(var i=0;i<items.length;i++){
}
for(var i=0;i<items.length;i++){
var string=items[i];
this.add(string);
}
this.sendEvent(24);
},"~A");
$_M(c$,"setOrientation",
function(orientation){
},"~N");
$_M(c$,"setSelection",
function(selection){
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
if((this.style&8)!=0){
var index=this.indexOf(string);
if(index!=-1)this.select(index);
return;
}this.textInput.readOnly=false;
this.textInput.value=string;
this.textInput.readOnly=(this.style&8)!=0;
this.sendEvent(24);
},"~S");
$_M(c$,"setTextLimit",
function(limit){
this.textInput.size=limit;
},"~N");
$_M(c$,"setVisibleItemCount",
function(count){
if(count<0)return;
this.visibleCount=count;
this.selectInput.size=count;
if((this.style&4)!=0){
this.forceResize();
}},"~N");
$_M(c$,"traverseEscape",
function(){
if((this.style&4)!=0){
}return $_U(this,$wt.widgets.Combo,"traverseEscape",[]);
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_V(c$,"windowClass",
function(){
return"DIV";
});
$_M(c$,"releaseHandle",
function(){
if(this.selectInput!=null){
BrowserNative.releaseHandle(this.selectInput);
this.selectInput=null;
}if(this.dropDownButton!=null){
BrowserNative.releaseHandle(this.dropDownButton);
this.dropDownButton=null;
}if(this.textInput!=null){
BrowserNative.releaseHandle(this.textInput);
this.textInput=null;
}$_U(this,$wt.widgets.Combo,"releaseHandle",[]);
});
$_S(c$,
"LIMIT",0x7FFF);
c$=$_C(function(){
this.groupText=null;
this.textWidth=0;
this.textHeight=0;
this.borderFrame=null;
this.titleLine=null;
this.leftCorner=null;
this.titleText=null;
this.rightCorner=null;
this.leftSide=null;
this.rightSide=null;
this.bottomLeft=null;
this.bottomRight=null;
this.contentBox=null;
this.content=null;
$_Z(this,arguments);
},$wt.widgets,"Group",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Group,[parent,$wt.widgets.Group.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.Group,"computeSize",[wHint,hHint,changed]);
var length=0;
if(this.groupText!=null){
length=this.groupText.length;
}if(length!=0){
size.x=Math.max(size.x,this.textWidth+18);
}return size;
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.Group,"computeTrim",[x,y,width,height]);
trim.x-=3;
if(this.textHeight<=0){
this.textHeight=$wt.internal.browser.OS.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}trim.y-=this.textHeight;
trim.width+=6;
trim.height+=this.textHeight+3;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.content;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
el.className=css;
(parent).appendChild(el);
return el;
},"Object,~S");
$_V(c$,"createHandle",
function(){
this.state&=-3;
this.handle=d$.createElement("DIV");
if((this.style&2048)!=0){
this.handle.className="group-default group-border-default";
}else{
this.handle.className="group-default";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}var className=null;
if((this.style&16)!=0){
className="group-shadow-etched-in";
}else if((this.style&64)!=0){
className="group-shadow-etched-out";
}else if((this.style&4)!=0){
className="group-shadow-in";
}else if((this.style&8)!=0){
className="group-shadow-out";
}else if((this.style&32)!=0){
className="group-shadow-none";
}if(className==null){
className="group-border-frame group-no-title-text";
}else{
className="group-border-frame group-no-title-text "+className;
}this.borderFrame=this.createCSSElement(this.handle,className);
this.titleLine=this.createCSSElement(this.borderFrame,"group-title-line");
this.leftCorner=this.createCSSElement(this.borderFrame,"group-left-corner");
this.rightCorner=this.createCSSElement(this.borderFrame,"group-right-corner");
this.titleText=this.createCSSElement(this.borderFrame,"group-title-text");
this.leftSide=this.createCSSElement(this.borderFrame,"group-side-line-left");
this.rightSide=this.createCSSElement(this.borderFrame,"group-side-line-right");
this.bottomLeft=this.createCSSElement(this.borderFrame,"group-bottom-line-left");
this.bottomRight=this.createCSSElement(this.borderFrame,"group-bottom-line-right");
this.contentBox=this.createCSSElement(this.handle,"group-content-box");
this.content=this.createCSSElement(this.contentBox,"group-content");
});
$_V(c$,"getClientArea",
function(){
this.forceResize();
if(this.textHeight<=0){
this.textHeight=$wt.internal.browser.OS.getStringStyledHeight(".","group-default",this.handle.style.cssText);
}var x=3;
var y=this.textHeight;
var border=this.getBorderWidth();
var width=this.width-border*2-6;
var height=this.height-border*2-y-3;
return new $wt.graphics.Rectangle(x,y,width,height);
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.groupText;
});
$_V(c$,"mnemonicHit",
function(key){
return this.setFocus();
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.titleLine!=null){
BrowserNative.releaseHandle(this.titleLine);
this.titleLine=null;
}if(this.titleText!=null){
BrowserNative.releaseHandle(this.titleText);
this.titleText=null;
}if(this.leftCorner!=null){
BrowserNative.releaseHandle(this.leftCorner);
this.leftCorner=null;
}if(this.rightCorner!=null){
BrowserNative.releaseHandle(this.rightCorner);
this.rightCorner=null;
}if(this.bottomLeft!=null){
BrowserNative.releaseHandle(this.bottomLeft);
this.bottomLeft=null;
}if(this.bottomRight!=null){
BrowserNative.releaseHandle(this.bottomRight);
this.bottomRight=null;
}if(this.leftSide!=null){
BrowserNative.releaseHandle(this.leftSide);
this.leftSide=null;
}if(this.rightSide!=null){
BrowserNative.releaseHandle(this.rightSide);
this.rightSide=null;
}if(this.borderFrame!=null){
BrowserNative.releaseHandle(this.borderFrame);
this.borderFrame=null;
}if(this.content!=null){
BrowserNative.releaseHandle(this.content);
this.content=null;
}if(this.contentBox!=null){
BrowserNative.releaseHandle(this.contentBox);
this.contentBox=null;
}$_U(this,$wt.widgets.Group,"releaseHandle",[]);
});
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Group,"setBounds",[x,y,width,height]);
if(this.textWidth==0&&this.groupText!=null&&this.groupText.length!=0){
this.textWidth=$wt.internal.browser.OS.getStringStyledWidth(this.groupText,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-12;
if(w<0){
w=0;
}this.rightCorner.style.width=w+"px";
}},"~N,~N,~N,~N");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.Group,"setFont",[font]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(string){
var cssName=this.borderFrame.className;
if(cssName==null)cssName="";
var key="group-no-title-text";
var idx=cssName.indexOf(key);
if(string.length==0){
if(idx==-1){
this.borderFrame.className+=" "+key;
}}else{
if(idx!=-1){
this.borderFrame.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!string.equals(this.groupText)){
for(var i=this.titleText.childNodes.length-1;i>=0;i--){
this.titleText.removeChild(this.titleText.childNodes[i]);
}
this.titleText.appendChild(d$.createTextNode(string));
this.textWidth=$wt.internal.browser.OS.getContainerWidth(this.titleText);
if(this.textWidth==0){
this.textWidth=$wt.internal.browser.OS.getStringStyledWidth(string,"group-default",this.handle.style.cssText);
}if(this.textWidth!=0){
var w=this.width-this.textWidth-24;
if(w>0){
this.rightCorner.style.width=w+"px";
}}}}this.groupText=string;
},"~S");
$_S(c$,
"CLIENT_INSET",3);
c$=$_C(function(){
this.strings=null;
this.images=null;
this.parent=null;
this.parentItem=null;
this.index=0;
this.expandStatus=false;
this.checkElement=null;
$_Z(this,arguments);
},$wt.widgets,"TreeItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
parent.createItem(this,null,-1);
},"$wt.widgets.Tree,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TreeItem,[parent,style]);
this.parent=parent;
parent.createItem(this,null,index);
},"$wt.widgets.Tree,~N,~N");
$_K(c$,
function(parentItem,style){
$_R(this,$wt.widgets.TreeItem,[parentItem.parent,style]);
this.parent=parentItem.parent;
this.parentItem=parentItem;
this.parent.createItem(this,parentItem.handle,-1);
},"$wt.widgets.TreeItem,~N");
$_K(c$,
function(parentItem,style,index){
$_R(this,$wt.widgets.TreeItem,[parentItem.parent,style]);
this.parent=parentItem.parent;
this.parentItem=parentItem;
this.parent.createItem(this,parentItem.handle,index);
},"$wt.widgets.TreeItem,~N,~N");
c$.checkNull=$_M(c$,"checkNull",
function(item){
return item;
},"$wt.widgets.TreeItem");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
});
$_M(c$,"getBackground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getBackground();
return new $wt.graphics.Color(this.display,this.handle.style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(index){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.style&32)==0)return false;
if(this.checkElement!=null){
return this.checkElement.checked;
}return false;
});
$_M(c$,"getExpanded",
function(){
return false;
});
$_M(c$,"getFont",
function(){
return this.display.getSystemFont();
});
$_M(c$,"getFont",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getFont();
return this.display.getSystemFont();
},"~N");
$_M(c$,"getForeground",
function(){
return new $wt.graphics.Color(this.display,this.parent.handle.style.color);
});
$_M(c$,"getForeground",
function(index){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return this.getForeground();
return new $wt.graphics.Color(this.display,this.handle.style.color);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.style&32)==0)return false;
if(this.checkElement!=null){
return this.checkElement.checked;
}return true;
});
$_M(c$,"getItem",
function(index){
return this.parent.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.parent.items.length;
});
$_M(c$,"getItems",
function(){
System.out.println("index: "+this.index);
return this.parent.getItems(this.index);
});
$_M(c$,"getImage",
function(index){
if(index==0)return this.getImage();
if(this.images!=null){
if(0<=index&&index<this.images.length)return this.images[index];
}return null;
},"~N");
$_M(c$,"getImageBounds",
function(index){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.parentItem;
});
$_M(c$,"getText",
function(index){
if(index==0)return this.getText();
if(this.strings!=null){
if(0<=index&&index<this.strings.length){
var string=this.strings[index];
return string!=null?string:"";
}}return"";
},"~N");
$_M(c$,"indexOf",
function(item){
return this.parent.indexOf(this.index,item);
},"$wt.widgets.TreeItem");
$_M(c$,"redraw",
function(){
if(this.parent.drawCount>0)return;
});
$_M(c$,"redraw",
function(column,drawText,drawImage){
if(this.parent.drawCount>0)return;
},"~N,~B,~B");
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseHandle",[]);
this.parent=null;
this.parentItem=null;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TreeItem,"releaseWidget",[]);
this.parent=null;
this.strings=null;
this.images=null;
});
$_M(c$,"removeAll",
function(){
});
$_M(c$,"setBackground",
function(color){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
this.redraw(index,true,true);
},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(checked){
if((this.parent.style&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=checked;
}},"~B");
$_M(c$,"setExpanded",
function(expanded){
this.expandStatus=expanded;
var items=this.parent.getDescendantItems(this.index);
for(var i=0;i<items.length;i++){
if(items[i].parentItem==this){
items[i].expandStatus=this.expandStatus;
}if(items[i].expandStatus){
items[i].handle.style.display=expanded?"":"none";
}else{
items[i].handle.style.display="none";
}}
if(items.length==0){
this.updateModifier(0);
}else{
this.updateModifier(expanded?1:-1);
}},"~B");
$_M(c$,"setFont",
function(font){
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(index,font){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
},"~N,$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(index,color){
var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
this.redraw(index,true,false);
},"~N,$wt.graphics.Color");
$_M(c$,"setGrayed",
function(grayed){
if((this.parent.style&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=grayed;
}},"~B");
$_M(c$,"setImage",
function(images){
for(var i=0;i<images.length;i++){
this.setImage(i,images[i]);
}
},"~A");
$_M(c$,"setImage",
function(index,image){
if(index==0){
if(image!=null&&image.type==1){
if(image.equals(this.image))return;
}$_U(this,$wt.widgets.TreeItem,"setImage",[image]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.images==null&&index!=0)this.images=new Array(count);
if(this.images!=null){
if(image!=null&&image.type==1){
if(image.equals(this.images[index]))return;
}this.images[index]=image;
}},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
this.setImage(0,image);
},"$wt.graphics.Image");
$_M(c$,"setText",
function(strings){
for(var i=0;i<strings.length;i++){
var string=strings[i];
if(string!=null)this.setText(i,string);
}
},"~A");
$_M(c$,"setText",
function(index,string){
if(index==0){
if(string.equals(this.text))return;
$_U(this,$wt.widgets.TreeItem,"setText",[string]);
}var count=Math.max(1,this.parent.getColumnCount());
if(0>index||index>count-1)return;
if(this.strings==null&&index!=0)this.strings=new Array(count);
if(this.strings!=null){
if(string.equals(this.strings[index]))return;
this.strings[index]=string;
}if(index==0){
}var tbodyTD=null;
if(index<this.handle.childNodes.length){
if(this.handle.childNodes[index]!=null&&"TD".equals(this.handle.childNodes[index].nodeName)){
tbodyTD=this.handle.childNodes[index];
}}if(tbodyTD==null){
tbodyTD=d$.createElement("TD");
this.handle.appendChild(tbodyTD);
}if(tbodyTD.childNodes!=null){
for(var i=0;i<tbodyTD.childNodes.length;i++){
if(tbodyTD.childNodes[i]!=null){
tbodyTD.removeChild(tbodyTD.childNodes[i]);
}}
}var hItem=d$.createElement("DIV");
hItem.className="tree-item-default";
var hAnchor=d$.createElement("DIV");
hAnchor.className="tree-item-anchor-default";
hAnchor.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TreeItem"].toggleExpandStatus();
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$1,i$,v$);
})(this,null));
hAnchor.appendChild(d$.createTextNode(""+String.fromCharCode(160)));
hItem.appendChild(hAnchor);
if((this.parent.style&32)!=0){
this.checkElement=d$.createElement("INPUT");
this.checkElement.type="checkbox";
hItem.appendChild(this.checkElement);
this.checkElement.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.widgets.Event();
e.type=13;
e.detail=32;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$2,i$,v$);
})(this,null));
}var s=(index==0)?this.getText():this.strings[index];
var text=d$.createElement("DIV");
text.className="tree-item-text-default";
text.appendChild(d$.createTextNode(s));
text.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
this.b$["$wt.widgets.TreeItem"].parent.toggleSelection(this.b$["$wt.widgets.TreeItem"],evt.ctrlKey,evt.shiftKey);
var e=new $wt.widgets.Event();
e.type=13;
e.detail=0;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$3,i$,v$);
})(this,null));
text.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TreeItem"].toggleExpandStatus();
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$4,i$,v$);
})(this,null));
text.onselectstart=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$5,i$,v$);
})(this,null));
hItem.appendChild(text);
var pItem=this.parentItem;
var padding=0;
while(pItem!=null){
pItem=pItem.parentItem;
padding+=20;
}
hItem.style.marginLeft=padding+"px";
tbodyTD.appendChild(hItem);
},"~N,~S");
$_M(c$,"setText",
function(string){
this.setText(0,string);
},"~S");
$_M(c$,"showSelection",
function(selected){
var index=1;
if((this.parent.style&32)!=0){
index++;
}var element=this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className=selected?"tree-item-text-selected":"tree-item-text-default";
},"~B");
$_M(c$,"toggleExpandStatus",
function(){
var clazzName=this.handle.childNodes[0].childNodes[0].childNodes[0].className;
var type=0;
if(clazzName==null){
type=0;
}else if(clazzName.indexOf("expanded")!=-1){
type=-1;
}else if(clazzName.indexOf("collapsed")!=-1){
type=1;
}if(type==0){
return;
}var toExpand=type>=0;
this.setExpanded(toExpand);
var e=new $wt.widgets.Event();
e.type=toExpand?17:18;
e.item=this;
e.widget=this;
this.parent.sendEvent(e);
});
$_M(c$,"updateModifier",
function(type){
var element=this.handle.childNodes[0].childNodes[0].childNodes[0];
if(type==-1){
element.className="tree-item-anchor-collapsed";
return false;
}else if(type==1){
element.className="tree-item-anchor-expanded";
return true;
}else{
element.className="tree-item-anchor-default";
return true;
}},"~N");
c$=$_C(function(){
this.parent=null;
this.resizable=false;
$_Z(this,arguments);
},$wt.widgets,"TreeColumn",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TreeColumn,[parent,$wt.widgets.TreeColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,parent.getColumnCount());
},"$wt.widgets.Tree,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.TreeColumn,[parent,$wt.widgets.TreeColumn.checkStyle(style)]);
this.resizable=true;
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.Tree,~N,~N");
$_M(c$,"addControlListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(11,typedListener);
this.addListener(10,typedListener);
},"$wt.events.ControlListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,16384,16777216,131072,0,0,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getAlignment",
function(){
if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getResizable",
function(){
return this.resizable;
});
$_M(c$,"getWidth",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return 0;
return 0;
});
$_M(c$,"pack",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return;
var columnWidth=0;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TreeColumn,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TreeColumn,"releaseWidget",[]);
this.parent=null;
});
$_M(c$,"removeControlListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(10,listener);
this.eventTable.unhook(11,listener);
},"$wt.events.ControlListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setAlignment",
function(alignment){
if((alignment&(16924672))==0)return;
var index=this.parent.indexOf(this);
if(index==-1||index==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
},"~N");
$_M(c$,"setImage",
function(image){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TreeColumn,"setImage",[image]);
},"$wt.graphics.Image");
$_M(c$,"setResizable",
function(resizable){
this.resizable=resizable;
},"~B");
$_M(c$,"setText",
function(string){
var index=this.parent.indexOf(this);
if(index==-1)return;
$_U(this,$wt.widgets.TreeColumn,"setText",[string]);
},"~S");
$_M(c$,"setWidth",
function(width){
var index=this.parent.indexOf(this);
if(index==-1)return;
},"~N");
c$=$_C(function(){
this.items=null;
this.columns=null;
this.itemHandles=null;
this.columnHandles=null;
this.imageList=null;
this.dragStarted=false;
this.gestureCompleted=false;
this.insertAfter=false;
this.ignoreSelect=false;
this.ignoreExpand=false;
this.ignoreDeselect=false;
this.ignoreResize=false;
this.lockSelection=false;
this.oldSelected=false;
this.newSelected=false;
this.linesVisible=false;
this.customDraw=false;
this.printClient=false;
this.selections=null;
this.lastSelection=null;
this.hwndParent=null;
this.hwndHeader=null;
this.hAnchor=null;
this.hInsert=null;
$_Z(this,arguments);
},$wt.widgets,"Tree",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Tree,[parent,$wt.widgets.Tree.checkStyle(style)]);
this.selections=new Array(0);
this.items=new Array(0);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=768;
return $wt.widgets.Widget.checkBits(style,4,2,0,0,0,0);
},"~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addTreeListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(17,typedListener);
this.addListener(18,typedListener);
},"$wt.events.TreeListener");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var border=this.getBorderWidth();
width+=border*2;
height+=border*2;
if((this.style&512)!=0){
}if((this.style&256)!=0){
}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Tree,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}this.handle.className="tree-default";
if((this.style&2048)!=0){
this.handle.className+=" tree-border";
}var table=d$.createElement("TABLE");
table.style.backgroundColor="white";
this.handle.appendChild(table);
});
$_M(c$,"createItem",
function(column,index){
},"$wt.widgets.TreeColumn,~N");
$_M(c$,"createItem",
function(item,hParent,index){
if(this.items==null){
this.items=new Array(0);
}var table=this.handle.childNodes[0];
var tbody=null;
for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
tbody=table.childNodes[i];
break;
}}
if(tbody==null){
tbody=d$.createElement("TBODY");
table.appendChild(tbody);
}var idx=-1;
if(hParent!=null){
for(var i=0;i<tbody.childNodes.length;i++){
if(tbody.childNodes[i]==hParent){
idx=i;
break;
}}
}var newTR=d$.createElement("TR");
item.handle=newTR;
var existedIndex=-1;
if(index>=0){
existedIndex=this.findItem(idx,index);
if(existedIndex!=-1){
tbody.insertBefore(newTR,tbody.childNodes[existedIndex]);
for(var i=this.items.length;i>existedIndex;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
item.index=existedIndex;
this.items[existedIndex]=item;
}}if(existedIndex==-1){
if(idx<0){
tbody.appendChild(newTR);
item.index=this.items.length;
this.items[this.items.length]=item;
}else{
var siblingIndex=this.findNextSiblingItem(idx);
if(siblingIndex==-1){
tbody.appendChild(newTR);
item.index=this.items.length;
this.items[this.items.length]=item;
}else{
tbody.insertBefore(newTR,tbody.childNodes[siblingIndex]);
for(var i=this.items.length;i>siblingIndex;i--){
this.items[i]=this.items[i-1];
this.items[i].index=i;
}
item.index=siblingIndex;
this.items[siblingIndex]=item;
}}}if(item.parentItem!=null){
item.handle.style.display="none";
item.parentItem.updateModifier(-1);
}},"$wt.widgets.TreeItem,Object,~N");
$_M(c$,"toggleSelection",
function(item,isCtrlKeyHold,isShiftKeyHold){
if(item==null){
return false;
}if((this.style&2)!=0&&(isCtrlKeyHold||isShiftKeyHold)){
if(isCtrlKeyHold){
for(var i=0;i<this.selections.length;i++){
if(item==this.selections[i]){
var newSelections=new Array(this.selections.length);
for(var j=0;j<i;j++){
newSelections[j]=this.selections[j];
}
for(var j=i;j<this.selections.length-1;j++){
newSelections[j]=this.selections[j+1];
}
this.selections=newSelections;
item.showSelection(false);
this.lastSelection=item;
return false;
}}
this.selections[this.selections.length]=item;
this.lastSelection=item;
item.showSelection(true);
}else{
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null){
this.selections[i].showSelection(false);
}}
if(this.lastSelection!=null){
var idx1=Math.min(this.lastSelection.index,item.index);
var idx2=Math.max(this.lastSelection.index,item.index);
this.selections=new Array(0);
for(var i=idx1;i<=idx2;i++){
var ti=this.items[i];
if(ti.handle.style.display!="none"){
this.selections[this.selections.length]=ti;
ti.showSelection(true);
}}
return true;
}else{
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}}}else{
item.showSelection(true);
for(var i=0;i<this.selections.length;i++){
if(this.selections[i]!=null&&this.selections[i]!=item){
this.selections[i].showSelection(false);
}}
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=item;
}this.lastSelection=item;
return true;
},"$wt.widgets.TreeItem,~B,~B");
$_M(c$,"skipItems",
function(index){
var parentItem=this.items[index];
index++;
while(this.items[index]!=null){
var item=this.items[index];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[index-1]){
index=this.skipItems(index-1);
if(index==-1){
return-1;
}var ti=this.items[index];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti==parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return index;
}}else{
return index;
}}index++;
}
return-1;
},"~N");
$_M(c$,"createParent",
function(){
this.forceResize();
this.register();
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Tree,"createWidget",[]);
this.items=new Array(4);
this.columns=new Array(4);
});
$_M(c$,"deselectAll",
function(){
for(var i=0;i<this.selections.length;i++){
this.selections[i].showSelection(false);
}
});
$_M(c$,"destroyItem",
function(column){
},"$wt.widgets.TreeColumn");
$_M(c$,"destroyItem",
function(item){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Tree,"enableWidget",[enabled]);
},"~B");
$_M(c$,"findItem",
function(id){
return null;
},"~N");
$_M(c$,"getGridLineWidth",
function(){
return 1;
});
$_M(c$,"getHeaderHeight",
function(){
return 16;
});
$_M(c$,"getHeaderVisible",
function(){
return false;
});
$_M(c$,"getImageSize",
function(){
if(this.imageList!=null)return this.imageList.getImageSize();
return new $wt.graphics.Point(0,this.getItemHeight());
});
$_M(c$,"getColumn",
function(index){
return this.columns[index];
},"~N");
$_M(c$,"getColumnCount",
function(){
return 0;
});
$_M(c$,"getColumns",
function(){
return this.columns;
});
$_M(c$,"getDescendantItems",
function(index){
var nextSiblingIdx=this.findNextSiblingItem(index);
if(nextSiblingIdx==-1){
nextSiblingIdx=this.items.length;
}var children=new Array(nextSiblingIdx-index-1);
for(var i=index+1;i<nextSiblingIdx;i++){
children[i-index-1]=this.items[i];
}
return children;
},"~N");
$_M(c$,"findItem",
function(parentIndex,index){
if(parentIndex<0){
for(var i=0;i<this.items.length;i++){
if(this.items[i].parentItem==null){
if(index==0){
return i;
}index--;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}}else{
return-1;
}}else{
if(index==0){
return parentIndex;
}index--;
}parentIndex++;
}
return-1;
},"~N,~N");
$_M(c$,"findNextSiblingItem",
function(parentIndex){
if(parentIndex<0){
parentIndex=0;
}var parentItem=this.items[parentIndex];
parentIndex++;
if(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem.parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}var ti=this.items[parentIndex];
var outOfHierarchies=true;
while(ti!=null){
ti=ti.parentItem;
if(ti==parentItem){
outOfHierarchies=false;
break;
}}
if(outOfHierarchies){
return parentIndex;
}}else{
return parentIndex;
}}else{
return parentIndex;
}}return-1;
},"~N");
$_M(c$,"indexOf",
function(parentIndex,ti){
var index=0;
if(parentIndex<0){
if(ti.parentItem!=null){
return-1;
}for(var i=0;i<this.items.length;i++){
if(this.items[i]==ti){
return index;
}else if(this.items[i].parentItem==null){
index++;
}}
return-1;
}var parentItem=this.items[parentIndex];
parentIndex++;
while(this.items[parentIndex]!=null){
var item=this.items[parentIndex];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[parentIndex-1]){
parentIndex=this.skipItems(parentIndex-1);
if(parentIndex==-1){
return-1;
}if(this.items[parentIndex].parentItem==parentItem.parentItem){
return-1;
}else{
if(this.items[parentIndex]==ti){
return index;
}index++;
}}else{
return-1;
}}else{
if(item==ti){
return index;
}index++;
}parentIndex++;
}
return-1;
},"~N,$wt.widgets.TreeItem");
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemCount",
function(hItem){
var count=0;
return this.items.length;
},"~N");
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var copiedItems=new Array(0);
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].parentItem==null){
copiedItems[copiedItems.length]=this.items[i];
}}
return copiedItems;
});
$_M(c$,"getItems",
function(hTreeItem){
var children=new Array(0);
if(hTreeItem<0){
hTreeItem=0;
}var parentItem=this.items[hTreeItem];
hTreeItem++;
while(this.items[hTreeItem]!=null){
var item=this.items[hTreeItem];
if(item.parentItem!=parentItem){
if(item.parentItem==this.items[hTreeItem-1]){
hTreeItem=this.skipItems(hTreeItem-1);
if(hTreeItem==-1){
return children;
}if(this.items[hTreeItem].parentItem==parentItem.parentItem){
return children;
}else{
children[children.length]=this.items[hTreeItem];
}}else{
return children;
}}else{
children[children.length]=item;
}hTreeItem++;
}
return children;
},"~N");
$_M(c$,"getLinesVisible",
function(){
return this.linesVisible;
});
$_M(c$,"getParentItem",
function(){
return null;
});
$_M(c$,"getSelection",
function(){
return this.selections;
});
$_M(c$,"getSelectionCount",
function(){
return 0;
});
$_M(c$,"getTopItem",
function(){
return this.items[0];
});
$_M(c$,"indexOf",
function(column){
var count=this.columns.length;
for(var i=0;i<count;i++){
if(this.columns[i]==column)return i;
}
return-1;
},"$wt.widgets.TreeColumn");
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]==item){
return i;
}}
return-1;
},"$wt.widgets.TreeItem");
$_M(c$,"releaseWidget",
function(){
var columnCount=this.columns.length;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
for(var i=0;i<columnCount;i++){
var column=this.columns[i];
if(!column.isDisposed())column.releaseResources();
}
this.columns=null;
$_U(this,$wt.widgets.Tree,"releaseWidget",[]);
});
$_M(c$,"removeAll",
function(){
this.ignoreDeselect=this.ignoreSelect=true;
this.updateScrollBar();
});
$_M(c$,"removeSelectionListener",
function(listener){
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeTreeListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(17,listener);
this.eventTable.unhook(18,listener);
},"$wt.events.TreeListener");
$_M(c$,"setInsertMark",
function(item,before){
},"$wt.widgets.TreeItem,~B");
$_M(c$,"setLinesVisible",
function(show){
if(this.linesVisible==show)return;
this.linesVisible=show;
},"~B");
$_M(c$,"selectAll",
function(){
if((this.style&4)!=0)return;
});
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Tree,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setCheckboxImageList",
function(){
if((this.style&32)==0)return;
var count=5;
});
$_M(c$,"setHeaderVisible",
function(show){
this.setScrollWidth();
this.updateScrollBar();
},"~B");
$_V(c$,"setRedraw",
function(redraw){
},"~B");
$_M(c$,"setScrollWidth",
function(){
});
$_M(c$,"setSelection",
function(items){
var length=items.length;
if(length==0||((this.style&4)!=0&&length>1)){
this.deselectAll();
return;
}this.selections=items;
for(var i=0;i<items.length;i++){
items[i].showSelection(true);
}
},"~A");
$_M(c$,"setTopItem",
function(item){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"showItem",
function(hItem){
this.updateScrollBar();
},"$wt.internal.xhtml.Element");
$_M(c$,"showColumn",
function(column){
if(column.parent!=this)return;
var index=this.indexOf(column);
if(index==-1)return;
},"$wt.widgets.TreeColumn");
$_M(c$,"showItem",
function(item){
this.showItem(item.handle);
},"$wt.widgets.TreeItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"showWidget",
function(visible){
$_U(this,$wt.widgets.Tree,"showWidget",[visible]);
},"~B");
$_V(c$,"topHandle",
function(){
return this.hwndParent!=null?this.hwndParent:this.handle;
});
$_M(c$,"updateScrollBar",
function(){
});
$_S(c$,
"INSET",3,
"GRID_WIDTH",1,
"HEADER_MARGIN",10);
c$=$_C(function(){
this.minimum=0;
this.maximum=0;
this.selection=0;
this.innerHandle=null;
$_Z(this,arguments);
},$wt.widgets,"ProgressBar",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ProgressBar,[parent,$wt.widgets.ProgressBar.checkStyle(style)]);
this.minimum=0;
this.maximum=100;
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=160;
height+=16;
}else{
width+=16;
height+=160;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
this.handle.className="progress-bar-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}this.innerHandle=d$.createElement("DIV");
this.handle.appendChild(this.innerHandle);
if((this.style&256)!=0){
this.innerHandle.className="progress-bar-horizontal";
}else{
this.innerHandle.className="progress-bar-vertical";
}this.startTimer();
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getSelection",
function(){
return this.selection;
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ProgressBar,"releaseWidget",[]);
this.stopTimer();
});
$_M(c$,"startTimer",
function(){
if((this.style&2)!=0){
}});
$_M(c$,"stopTimer",
function(){
if((this.style&2)!=0){
}});
$_M(c$,"setMaximum",
function(value){
if(0<=this.minimum&&this.minimum<value){
this.maximum=value;
}},"~N");
$_M(c$,"setMinimum",
function(value){
if(0<=value&&value<this.maximum){
this.minimum=value;
}},"~N");
$_M(c$,"setSelection",
function(value){
this.selection=value;
if((this.style&256)!=0){
this.innerHandle.style.width=Math.round(Math.floor(this.getSize().x*this.selection/this.maximum))+"px";
}else{
this.innerHandle.style.height=Math.round(Math.floor(this.getSize().y*this.selection/this.maximum))+"px";
}},"~N");
$_M(c$,"windowClass",
function(){
return"DIV";
});
$_S(c$,
"DELAY",100,
"TIMER_ID",100,
"MINIMUM_WIDTH",100);
c$=$_C(function(){
this.minimum=0;
this.maximum=0;
this.increment=0;
this.pageIncrement=0;
this.lastX=0;
this.lastY=0;
this.selection=0;
this.thumbHandle=null;
this.trackHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Scale",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Scale,[parent,$wt.widgets.Scale.checkStyle(style)]);
this.minimum=0;
this.maximum=100;
this.pageIncrement=10;
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
var thumbWidth=16;
var thumbHeight=24;
if((this.style&256)!=0){
width+=160;
var scrollY=16;
height+=(thumbHeight*2)+scrollY+(Math.floor(scrollY/3));
}else{
var scrollX=16;
width+=(thumbWidth*2)+scrollX+(Math.floor(scrollX/3));
height+=160;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Scale,"createHandle",[]);
this.handle=d$.createElement("DIV");
this.handle.className="scale-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}if((this.style&2048)!=0){
this.handle.className+=" scale-border";
}this.thumbHandle=d$.createElement("DIV");
this.handle.appendChild(this.thumbHandle);
if((this.style&256)!=0){
this.thumbHandle.className="scale-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="scale-thumb-vertical";
this.thumbHandle.style.top="0px";
}var isHorizontal=(this.style&256)!=0;
this.decorateScale();
this.trackHandle=d$.createElement("DIV");
if(isHorizontal){
this.trackHandle.className="scale-center-block-horizontal";
}else{
this.trackHandle.className="scale-center-block-vertical";
}this.handle.appendChild(this.trackHandle);
var line1=d$.createElement("DIV");
if(isHorizontal){
line1.className="scale-line-polar-top";
}else{
line1.className="scale-line-polar-left";
}this.handle.appendChild(line1);
var line2=d$.createElement("DIV");
if(isHorizontal){
line2.className="scale-line-polar-bottom";
}else{
line2.className="scale-line-polar-right";
}this.handle.appendChild(line2);
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Scale$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Scale$1",$wt.internal.dnd.ScaleDND);
$_M(c$,"dragging",
function(e){
$_U(this,$wt.widgets.Scale$1,"dragging",[e]);
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Scale"].lastX;
event.y=this.b$["$wt.widgets.Scale"].lastY;
var size=this.b$["$wt.widgets.Scale"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Scale"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Scale"];
event.item=this.b$["$wt.widgets.Scale"];
this.b$["$wt.widgets.Scale"].sendEvent(13,event);
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragEnded",
function(e){
$_U(this,$wt.widgets.Scale$1,"dragEnded",[e]);
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Scale"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Scale"].handle.style.left);
event.y=p.y;
}var size=this.b$["$wt.widgets.Scale"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Scale"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Scale"];
event.item=this.b$["$wt.widgets.Scale"];
if((this.b$["$wt.widgets.Scale"].style&65536)==0){
event.detail=1;
}this.b$["$wt.widgets.Scale"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Scale"].lastX=event.x;
this.b$["$wt.widgets.Scale"].lastY=event.y;
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Scale$1,i$,v$);
})(this,null));
dnd.bind(this.thumbHandle);
});
$_M(c$,"clearScaleDecoration",
($fz=function(){
for(var i=0;i<this.handle.childNodes.length;i++){
System.out.println(i+":"+this.handle.childNodes[i].className);
if(this.handle.childNodes[i].className.indexOf("scale-line-decoration")!=-1){
System.out.println(i);
this.handle.removeChild(this.handle.childNodes[i]);
}}
},$fz.isPrivate=true,$fz));
$_M(c$,"decorateScale",
($fz=function(){
var outerSize;
if((this.style&256)!=0){
outerSize=this.getSize().x;
}else{
outerSize=this.getSize().y;
}var pages=Math.floor((this.maximum-this.minimum)/this.pageIncrement);
var thumbSize=16;
for(var j=0;j<=pages;j++){
var line=d$.createElement("DIV");
if((this.style&256)!=0){
line.className="scale-line-decoration-horizontal";
line.style.left=Math.floor(Math.floor((outerSize-thumbSize)*j/ pages) + Math.floor (thumbSize /2))+"px";
}else{
line.className="scale-line-decoration-vertical";
line.style.top=Math.floor(Math.floor((outerSize-thumbSize)*j/ pages) + Math.floor (thumbSize /2))+"px";
}this.handle.appendChild(line);
}
},$fz.isPrivate=true,$fz));
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getSelection",
function(){
if((this.style&256)!=0){
var left=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor(left*this.maximum/(this.getSize().x-12));
}else{
var top=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor(top*this.maximum/(this.getSize().y-12));
}return this.selection;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setIncrement",
function(increment){
if(increment<1)return;
if(increment>this.maximum-this.minimum)return;
if(this.increment==increment)return;
this.increment=increment;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(0<=this.minimum&&this.minimum<value){
if(this.maximum==value)return;
this.maximum=value;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setMinimum",
function(value){
if(0<=value&&value<this.maximum){
if(this.minimum==value)return;
this.minimum=value;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setPageIncrement",
function(pageIncrement){
if(pageIncrement<1)return;
if(pageIncrement>this.maximum-this.minimum)return;
if(this.pageIncrement==pageIncrement)return;
this.pageIncrement=pageIncrement;
this.clearScaleDecoration();
this.decorateScale();
},"~N");
$_M(c$,"setSelection",
function(value){
if(this.selection==value)return;
if(this.minimum<=value&&value<this.maximum){
this.selection=value;
if((this.style&256)!=0){
this.thumbHandle.style.left=Math.round(Math.floor(this.selection*(this.getSize().x-12)/this.maximum))+"px";
}else{
this.thumbHandle.style.top=Math.round(Math.floor(this.selection*(this.getSize().y-12)/this.maximum))+"px";
}}},"~N");
$_M(c$,"windowClass",
function(){
return"DIV";
});
c$=$_C(function(){
this.minimum=0;
this.maximum=0;
this.increment=0;
this.pageIncrement=0;
this.thumb=0;
this.selection=0;
this.decBtnHandle=null;
this.incBtnHandle=null;
this.thumbHandle=null;
this.lastX=0;
this.lastY=0;
$_Z(this,arguments);
},$wt.widgets,"Slider",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Slider,[parent,$wt.widgets.Slider.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
height+=24;
}else{
width+=24;
height+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createWidget",
function(){
this.register();
this.handle=d$.createElement("DIV");
this.handle.className="slider-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}if((this.style&2048)!=0){
this.handle.className+=" slider-border";
}this.decBtnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.decBtnHandle);
if((this.style&256)!=0){
this.decBtnHandle.className="slider-left-button-default";
}else{
this.decBtnHandle.className="slider-top-button-default";
}this.decBtnHandle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Slider$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Slider$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Slider"].setSelection(this.b$["$wt.widgets.Slider"].getSelection()-this.b$["$wt.widgets.Slider"].increment);
var event=new $wt.widgets.Event();
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].style&256)!=0){
event.detail=16777219;
}else{
event.detail=16777217;
}this.b$["$wt.widgets.Slider"].sendEvent(13,event);
});
c$=$_P();
}
return $_N($wt.widgets.Slider$1,i$,v$);
})(this,null));
this.incBtnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.incBtnHandle);
if((this.style&256)!=0){
this.incBtnHandle.className="slider-right-button-default";
}else{
this.incBtnHandle.className="slider-bottom-button-default";
}this.incBtnHandle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Slider$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Slider$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Slider"].setSelection(this.b$["$wt.widgets.Slider"].getSelection()+this.b$["$wt.widgets.Slider"].increment);
var event=new $wt.widgets.Event();
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].style&256)!=0){
event.detail=16777220;
}else{
event.detail=16777218;
}this.b$["$wt.widgets.Slider"].sendEvent(13,event);
});
c$=$_P();
}
return $_N($wt.widgets.Slider$2,i$,v$);
})(this,null));
this.thumbHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.thumbHandle);
if((this.style&256)!=0){
this.thumbHandle.className="slider-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="slider-thumb-vertical";
this.thumbHandle.style.top="0px";
}this.minimum=0;
this.maximum=100;
this.thumb=10;
this.selection=0;
this.increment=1;
this.pageIncrement=10;
var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Slider$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Slider$3",$wt.internal.dnd.SliderDND);
$_V(c$,"dragEnded",
function(e){
this.b$["$wt.widgets.Slider"].caculateSelection();
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Slider"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Slider"].handle.style.left);
event.y=p.y;
}event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
event.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Slider"].lastX=event.x;
this.b$["$wt.widgets.Slider"].lastY=event.y;
}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=Integer.parseInt(e.sourceElement.parentNode.style.height);
var gWidth=Integer.parseInt(e.sourceElement.parentNode.style.width);
var borderWidth=20;
if(this.isHorizontal){
if(gWidth<=64){
borderWidth=Math.floor(gWidth*20/64);
}var thumbWidth=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(gWidth-borderWidth*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}var maxWidth=gWidth-borderWidth-6;
if(xx<borderWidth){
xx=borderWidth;
}else if(xx>maxWidth-thumbWidth){
xx=maxWidth-thumbWidth;
}}else{
if(gHeight<=64){
borderWidth=Math.floor(gHeight*20/64);
}var thumbWidth=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(gWidth-borderWidth*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}var maxHeight=gHeight-borderWidth-6;
if(yy<borderWidth){
yy=borderWidth;
}else if(yy>maxHeight-thumbWidth){
yy=maxHeight-thumbWidth;
}}return new $wt.graphics.Point(xx,yy);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.isHorizontal){
e.sourceElement.style.left=this.currentLocation(e).x+"px";
}else{
e.sourceElement.style.top=this.currentLocation(e).y+"px";
}this.b$["$wt.widgets.Slider"].caculateSelection();
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Slider"].lastX;
event.y=this.b$["$wt.widgets.Slider"].lastY;
event.widget=this.b$["$wt.widgets.Slider"];
event.item=this.b$["$wt.widgets.Slider"];
event.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,event);
return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Slider$3,i$,v$);
})(this,null));
dnd.bind(this.thumbHandle);
this.updateSlider();
});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}this.handle.disabled=enabled;
},"~B");
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getSelection",
function(){
return this.selection;
});
$_M(c$,"caculateSelection",
function(){
var size=this.getSize();
var borderWidth=20;
var trackWidth=0;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}trackWidth=size.x-borderWidth*2;
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.width=thumbWidth+"px";
var thumbPosition=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor((thumbPosition-borderWidth)*(this.maximum-this.minimum)/trackWidth)+this.minimum;
}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}trackWidth=size.y-borderWidth*2;
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.height=thumbWidth+"px";
var thumbPosition=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor((thumbPosition-borderWidth)*(this.maximum-this.minimum)/trackWidth)+this.minimum;
}return this.selection;
});
$_M(c$,"getThumb",
function(){
return this.thumb;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Slider,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
this.increment=value;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
if(value<this.minimum)return;
this.maximum=value;
if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateSlider();
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
if(value>this.maximum)return;
this.minimum=value;
if(this.selection<this.minimum){
this.selection=this.minimum;
}this.updateSlider();
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(value){
if(value<0)return;
if(value<this.minimum){
this.selection=this.minimum;
}else if(value>this.maximum-this.thumb){
this.selection=this.maximum-this.thumb;
}else{
this.selection=value;
}this.updateSlider();
},"~N");
$_M(c$,"setSize",
function(width,height){
$_U(this,$wt.widgets.Slider,"setSize",[width,height]);
this.updateSlider();
},"~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height){
$_U(this,$wt.widgets.Slider,"setBounds",[x,y,width,height]);
this.updateSlider();
},"~N,~N,~N,~N");
$_M(c$,"setThumb",
function(value){
if(value<1)return;
this.thumb=value;
this.updateSlider();
},"~N");
$_M(c$,"getIncrementButtonWidth",
function(){
var size=this.getSize();
var borderWidth=20;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}}return borderWidth;
});
$_M(c$,"updateSlider",
function(){
var size=this.getSize();
var borderWidth=20;
var trackWidth=0;
if((this.style&256)!=0){
if(size.x<=64){
borderWidth=Math.floor(size.x*20/64);
}trackWidth=size.x-borderWidth*2;
var thumbPosition=Math.floor((this.selection-this.minimum)*trackWidth/(this.maximum-this.minimum))+borderWidth;
this.thumbHandle.style.left=thumbPosition+"px";
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.width=thumbWidth+"px";
}else{
if(size.y<=64){
borderWidth=Math.floor(size.y*20/64);
}trackWidth=size.y-borderWidth*2;
var thumbPosition=Math.floor((this.selection-this.minimum)*trackWidth/(this.maximum-this.minimum))+borderWidth;
this.thumbHandle.style.top=thumbPosition+"px";
var thumbWidth=Math.floor(this.thumb*trackWidth/(this.maximum-this.minimum));
if(thumbWidth>16){
thumbWidth-=2;
}else if(thumbWidth>12){
thumbWidth--;
}else if(thumbWidth<8){
thumbWidth=8;
}this.thumbHandle.style.height=thumbWidth+"px";
}});
$_M(c$,"setValues",
function(selection,minimum,maximum,thumb,increment,pageIncrement){
if(minimum<0)return;
if(maximum<0)return;
if(thumb<1)return;
if(increment<1)return;
if(pageIncrement<1)return;
this.increment=increment;
this.pageIncrement=pageIncrement;
this.increment=increment;
this.pageIncrement=pageIncrement;
this.minimum=minimum;
this.maximum=maximum;
this.thumb=thumb;
if(this.selection<this.minimum){
this.selection=this.minimum;
}else if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateSlider();
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"windowClass",
function(){
return"DIV";
});
c$=$_C(function(){
this.dragging=false;
this.lastX=0;
this.lastY=0;
$_Z(this,arguments);
},$wt.widgets,"Sash",$wt.widgets.Control);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Sash,[parent,$wt.widgets.Sash.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=border*2;
var height=border*2;
if((this.style&256)!=0){
width+=64;
height+=3;
}else{
width+=3;
height+=64;
}if(wHint!=-1)width=wHint+(border*2);
if(hHint!=-1)height=hHint+(border*2);
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
if((this.style&256)!=0){
this.handle.className="sash-vertical-default";
}else{
this.handle.className="sash-horizontal-default";
}if((this.style&2048)!=0){
this.handle.className+=" sash-border";
}if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}var dnd=new $wt.internal.dnd.DragAndDrop();
dnd.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Sash$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Sash$1",$wt.internal.dnd.SashDND);
$_M(c$,"dragEnded",
function(e){
$_U(this,$wt.widgets.Sash$1,"dragEnded",[e]);
var event=new $wt.widgets.Event();
event.x=this.b$["$wt.widgets.Sash"].lastX;
event.y=this.b$["$wt.widgets.Sash"].lastY;
var size=this.b$["$wt.widgets.Sash"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Sash"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Sash"];
event.item=this.b$["$wt.widgets.Sash"];
System.out.println("drop");
this.b$["$wt.widgets.Sash"].sendEvent(13,event);
if(event.doit){
if((this.b$["$wt.widgets.Sash"].style&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].handle.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].handle.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragging",
function(e){
$_U(this,$wt.widgets.Sash$1,"dragging",[e]);
var event=new $wt.widgets.Event();
var p=this.currentLocation(e);
if(this.isHorizontal){
event.x=p.x;
event.y=Integer.parseInt(this.b$["$wt.widgets.Sash"].handle.style.top);
}else{
event.x=Integer.parseInt(this.b$["$wt.widgets.Sash"].handle.style.left);
event.y=p.y;
}var size=this.b$["$wt.widgets.Sash"].getSize();
var delta=0;
if((this.b$["$wt.widgets.Sash"].style&2048)!=0){
delta=6;
}var width=size.x+delta;
if(width<2){
width=2;
}event.width=width;
var height=size.y+delta;
if(height<2){
height=2;
}event.height=height;
event.widget=this.b$["$wt.widgets.Sash"];
event.item=this.b$["$wt.widgets.Sash"];
if((this.b$["$wt.widgets.Sash"].style&65536)==0){
event.detail=1;
}this.b$["$wt.widgets.Sash"].sendEvent(13,event);
if(event.doit){
this.b$["$wt.widgets.Sash"].lastX=event.x;
this.b$["$wt.widgets.Sash"].lastY=event.y;
}if((this.b$["$wt.widgets.Sash"].style&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].handle.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].handle.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Sash$1,i$,v$);
})(this,null));
dnd.bind(this.handle);
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"windowClass",
function(){
return"DIV";
});
$_S(c$,
"INCREMENT",1,
"PAGE_INCREMENT",9);
c$=$_C(function(){
this.SASH_WIDTH=3;
this.sashStyle=0;
this.sashes=null;
this.$background=null;
this.$foreground=null;
this.controls=null;
this.maxControl=null;
this.sashListener=null;
$_Z(this,arguments);
},$wt.custom,"SashForm",$wt.widgets.Composite);
$_Y(c$,function(){
this.sashes=new Array(0);
this.controls=new Array(0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.SashForm,[parent,$wt.custom.SashForm.checkStyle(style)]);
$_U(this,$wt.custom.SashForm,"setLayout",[new $wt.custom.SashFormLayout()]);
this.sashStyle=((style&512)!=0)?256:512;
if((style&2048)!=0)this.sashStyle|=2048;
if((style&65536)!=0)this.sashStyle|=65536;
this.sashListener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.SashForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"SashForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
this.b$["$wt.custom.SashForm"].onDragSash(e);
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.SashForm$1,i$,v$);
})(this,null);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=100665344;
return style&mask;
},"~N");
$_M(c$,"getOrientation",
function(){
return(this.sashStyle&512)!=0?256:512;
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.SashForm,"getStyle",[]);
style|=this.getOrientation()==512?512:256;
if((this.sashStyle&65536)!=0)style|=65536;
return style;
});
$_M(c$,"getMaximizedControl",
function(){
return this.maxControl;
});
$_M(c$,"getWeights",
function(){
var cArray=this.getControls(false);
var ratios=$_A(cArray.length,0);
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=parseInt(((data).weight*1000>>16));
}else{
ratios[i]=200;
}}
return ratios;
});
$_M(c$,"getControls",
function(onlyVisible){
var children=this.getChildren();
var result=new Array(0);
for(var i=0;i<children.length;i++){
if($_O(children[i],$wt.widgets.Sash))continue;if(onlyVisible&&!children[i].getVisible())continue;var newResult=new Array(result.length+1);
System.arraycopy(result,0,newResult,0,result.length);
newResult[result.length]=children[i];
result=newResult;
}
return result;
},"~B");
$_M(c$,"onDragSash",
function(event){
var sash=event.widget;
var sashIndex=-1;
for(var i=0;i<this.sashes.length;i++){
if(this.sashes[i]==sash){
sashIndex=i;
break;
}}
if(sashIndex==-1)return;
var c1=this.controls[sashIndex];
var c2=this.controls[sashIndex+1];
var b1=c1.getBounds();
var b2=c2.getBounds();
var sashBounds=sash.getBounds();
var area=this.getClientArea();
var correction=false;
if(this.getOrientation()==256){
correction=b1.width<20||b2.width<20;
var totalWidth=b2.x+b2.width-b1.x;
var shift=event.x-sashBounds.x;
b1.width+=shift;
b2.x+=shift;
b2.width-=shift;
if(b1.width<20){
b1.width=20;
b2.x=b1.x+b1.width+sashBounds.width;
b2.width=totalWidth-b2.x;
event.x=b1.x+b1.width;
event.doit=false;
}if(b2.width<20){
b1.width=totalWidth-20-sashBounds.width;
b2.x=b1.x+b1.width+sashBounds.width;
b2.width=20;
event.x=b1.x+b1.width;
event.doit=false;
}var data1=c1.getLayoutData();
if(data1==null||!($_O(data1,$wt.custom.SashFormData))){
data1=new $wt.custom.SashFormData();
c1.setLayoutData(data1);
}var data2=c2.getLayoutData();
if(data2==null||!($_O(data2,$wt.custom.SashFormData))){
data2=new $wt.custom.SashFormData();
c2.setLayoutData(data2);
}(data1).weight=Math.floor(((parseInt(b1.width)<<16)+area.width-1)/area.width);
(data2).weight=Math.floor(((parseInt(b2.width)<<16)+area.width-1)/area.width);
}else{
correction=b1.height<20||b2.height<20;
var totalHeight=b2.y+b2.height-b1.y;
var shift=event.y-sashBounds.y;
b1.height+=shift;
b2.y+=shift;
b2.height-=shift;
if(b1.height<20){
b1.height=20;
b2.y=b1.y+b1.height+sashBounds.height;
b2.height=totalHeight-b2.y;
event.y=b1.y+b1.height;
event.doit=false;
}if(b2.height<20){
b1.height=totalHeight-20-sashBounds.height;
b2.y=b1.y+b1.height+sashBounds.height;
b2.height=20;
event.y=b1.y+b1.height;
event.doit=false;
}var data1=c1.getLayoutData();
if(data1==null||!($_O(data1,$wt.custom.SashFormData))){
data1=new $wt.custom.SashFormData();
c1.setLayoutData(data1);
}var data2=c2.getLayoutData();
if(data2==null||!($_O(data2,$wt.custom.SashFormData))){
data2=new $wt.custom.SashFormData();
c2.setLayoutData(data2);
}(data1).weight=Math.floor(((parseInt(b1.height)<<16)+area.height-1)/area.height);
(data2).weight=Math.floor(((parseInt(b2.height)<<16)+area.height-1)/area.height);
}if(correction||(event.doit&&event.detail!=1)){
c1.setBounds(b1);
sash.setBounds(event.x,event.y,event.width,event.height);
c2.setBounds(b2);
}},"$wt.widgets.Event");
$_M(c$,"setOrientation",
function(orientation){
if(this.getOrientation()==orientation)return;
this.sashStyle&=-769;
this.sashStyle|=orientation==512?256:512;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].dispose();
this.sashes[i]=new $wt.widgets.Sash(this,this.sashStyle);
this.sashes[i].setBackground(this.$background);
this.sashes[i].setForeground(this.$foreground);
this.sashes[i].addListener(13,this.sashListener);
}
this.layout(false);
},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.SashForm,"setBackground",[color]);
this.$background=color;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setBackground(this.$background);
}
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.SashForm,"setForeground",[color]);
this.$foreground=color;
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setForeground(this.$foreground);
}
},"$wt.graphics.Color");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximizedControl",
function(control){
if(control==null){
if(this.maxControl!=null){
this.maxControl=null;
this.layout(false);
for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setVisible(true);
}
}return;
}for(var i=0;i<this.sashes.length;i++){
this.sashes[i].setVisible(false);
}
this.maxControl=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setWeights",
function(weights){
var cArray=this.getControls(false);
var total=0;
for(var i=0;i<weights.length;i++){
total+=weights[i];
}
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data==null||!($_O(data,$wt.custom.SashFormData))){
data=new $wt.custom.SashFormData();
cArray[i].setLayoutData(data);
}(data).weight=Math.floor(((parseInt(weights[i])<<16)+total-1)/total);
}
this.layout(false);
},"~A");
$_S(c$,
"DRAG_MINIMUM",20);
c$=$_C(function(){
this.weight=0;
$_Z(this,arguments);
},$wt.custom,"SashFormData");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
return this.getName()+" {weight="+this.weight+"}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"SashFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var sashForm=composite;
var cArray=sashForm.getControls(true);
var width=0;
var height=0;
if(cArray.length==0){
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
}var vertical=sashForm.getOrientation()==512;
var maxIndex=0;
var maxValue=0;
for(var i=0;i<cArray.length;i++){
if(vertical){
var size=cArray[i].computeSize(wHint,-1,flushCache);
if(size.y>maxValue){
maxIndex=i;
maxValue=size.y;
}width=Math.max(width,size.x);
}else{
var size=cArray[i].computeSize(-1,hHint,flushCache);
if(size.x>maxValue){
maxIndex=i;
maxValue=size.x;
}height=Math.max(height,size.y);
}}
var ratios=$_A(cArray.length,0);
var total=0;
for(var i=0;i<cArray.length;i++){
var data=cArray[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
cArray[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
if(ratios[maxIndex]>0){
var sashwidth=sashForm.sashes.length>0?sashForm.SASH_WIDTH+sashForm.sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(vertical){
height+=parseInt((Math.floor(total*maxValue/ratios[maxIndex])))+(cArray.length-1)*sashwidth;
}else{
width+=parseInt((Math.floor(total*maxValue/ratios[maxIndex])))+(cArray.length-1)*sashwidth;
}}width+=sashForm.getBorderWidth()*2;
height+=sashForm.getBorderWidth()*2;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var sashForm=composite;
var area=sashForm.getClientArea();
if(area.width<=1||area.height<=1)return;
var newControls=sashForm.getControls(true);
if(sashForm.controls.length==0&&newControls.length==0)return;
sashForm.controls=newControls;
var controls=sashForm.controls;
if(sashForm.maxControl!=null&&!sashForm.maxControl.isDisposed()){
for(var i=0;i<controls.length;i++){
if(controls[i]!=sashForm.maxControl){
controls[i].setBounds(-200,-200,0,0);
}else{
controls[i].setBounds(area);
}}
return;
}if(sashForm.sashes.length<controls.length-1){
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,sashForm.sashes.length);
for(var i=sashForm.sashes.length;i<newSashes.length;i++){
newSashes[i]=new $wt.widgets.Sash(sashForm,sashForm.sashStyle);
newSashes[i].setBackground(sashForm.$background);
newSashes[i].setForeground(sashForm.$foreground);
newSashes[i].addListener(13,sashForm.sashListener);
}
sashForm.sashes=newSashes;
}if(sashForm.sashes.length>controls.length-1){
if(controls.length==0){
for(var i=0;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=new Array(0);
}else{
var newSashes=new Array(controls.length-1);
System.arraycopy(sashForm.sashes,0,newSashes,0,newSashes.length);
for(var i=controls.length-1;i<sashForm.sashes.length;i++){
sashForm.sashes[i].dispose();
}
sashForm.sashes=newSashes;
}}if(controls.length==0)return;
var sashes=sashForm.sashes;
var ratios=$_A(controls.length,0);
var total=0;
for(var i=0;i<controls.length;i++){
var data=controls[i].getLayoutData();
if(data!=null&&$_O(data,$wt.custom.SashFormData)){
ratios[i]=(data).weight;
}else{
data=new $wt.custom.SashFormData();
controls[i].setLayoutData(data);
(data).weight=ratios[i]=13108;
}total+=ratios[i];
}
var sashwidth=sashes.length>0?sashForm.SASH_WIDTH+sashes[0].getBorderWidth()*2:sashForm.SASH_WIDTH;
if(sashForm.getOrientation()==256){
var width=parseInt((Math.floor(ratios[0]*(area.width-sashes.length*sashwidth)/total)));
var x=area.x;
controls[0].setBounds(x,area.y,width,area.height);
x+=width;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=parseInt((Math.floor(ratios[i]*(area.width-sashes.length*sashwidth)/total)));
controls[i].setBounds(x,area.y,width,area.height);
x+=width;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(x,area.y,sashwidth,area.height);
x+=sashwidth;
width=area.width-x;
controls[controls.length-1].setBounds(x,area.y,width,area.height);
}}else{
var height=parseInt((Math.floor(ratios[0]*(area.height-sashes.length*sashwidth)/total)));
var y=area.y;
controls[0].setBounds(area.x,y,area.width,height);
y+=height;
for(var i=1;i<controls.length-1;i++){
sashes[i-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=parseInt((Math.floor(ratios[i]*(area.height-sashes.length*sashwidth)/total)));
controls[i].setBounds(area.x,y,area.width,height);
y+=height;
}
if(controls.length>1){
sashes[sashes.length-1].setBounds(area.x,y,area.width,sashwidth);
y+=sashwidth;
height=area.height-y;
controls[controls.length-1].setBounds(area.x,y,area.width,height);
}}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.topControl=null;
$_Z(this,arguments);
},$wt.custom,"StackLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var children=composite.getChildren();
var maxWidth=0;
var maxHeight=0;
for(var i=0;i<children.length;i++){
var size=children[i].computeSize(wHint,hHint,flushCache);
maxWidth=Math.max(size.x,maxWidth);
maxHeight=Math.max(size.y,maxHeight);
}
var width=maxWidth+2*this.marginWidth;
var height=maxHeight+2*this.marginHeight;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var children=composite.getChildren();
var rect=composite.getClientArea();
rect.x+=this.marginWidth;
rect.y+=this.marginHeight;
rect.width-=2*this.marginWidth;
rect.height-=2*this.marginHeight;
for(var i=0;i<children.length;i++){
children[i].setBounds(rect);
children[i].setVisible(children[i]==this.topControl);
}
},"$wt.widgets.Composite,~B");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.topControl!=null)string+="topControl="+this.topControl+" ";
string=string.trim();
string+="}";
return string;
});
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.horizontalSpacing=1;
this.verticalSpacing=1;
this.topLeft=null;
this.topCenter=null;
this.topRight=null;
this.content=null;
this.separateTopCenter=false;
this.showBorder=false;
this.separator=-1;
this.borderTop=0;
this.borderBottom=0;
this.borderLeft=0;
this.borderRight=0;
this.highlight=0;
this.oldSize=null;
this.selectionBackground=null;
$_Z(this,arguments);
},$wt.custom,"ViewForm",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.ViewForm,[parent,$wt.custom.ViewForm.checkStyle(style)]);
$_U(this,$wt.custom.ViewForm,"setLayout",[new $wt.custom.ViewFormLayout()]);
this.setBorderVisible((style&2048)!=0);
var listener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.ViewForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"ViewForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 12:
this.b$["$wt.custom.ViewForm"].onDispose();
break;
case 9:
this.b$["$wt.custom.ViewForm"].onPaint(e.gc);
break;
case 11:
this.b$["$wt.custom.ViewForm"].onResize();
break;
}
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.ViewForm$1,i$,v$);
})(this,null);
var events=[12,9,11];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=109051904;
return style&mask|1048576;
},"~N");
$_V(c$,"computeTrim",
function(x,y,width,height){
var trimX=x-this.borderLeft-this.highlight;
var trimY=y-this.borderTop-this.highlight;
var trimWidth=width+this.borderLeft+this.borderRight+2*this.highlight;
var trimHeight=height+this.borderTop+this.borderBottom+2*this.highlight;
return new $wt.graphics.Rectangle(trimX,trimY,trimWidth,trimHeight);
},"~N,~N,~N,~N");
$_M(c$,"getClientArea",
function(){
var clientArea=$_U(this,$wt.custom.ViewForm,"getClientArea",[]);
clientArea.x+=this.borderLeft;
clientArea.y+=this.borderTop;
clientArea.width-=this.borderLeft+this.borderRight;
clientArea.height-=this.borderTop+this.borderBottom;
return clientArea;
});
$_M(c$,"getContent",
function(){
return this.content;
});
$_M(c$,"getTopCenter",
function(){
return this.topCenter;
});
$_M(c$,"getTopLeft",
function(){
return this.topLeft;
});
$_M(c$,"getTopRight",
function(){
return this.topRight;
});
$_M(c$,"onDispose",
function(){
this.topLeft=null;
this.topCenter=null;
this.topRight=null;
this.content=null;
this.oldSize=null;
this.selectionBackground=null;
});
$_M(c$,"onPaint",
function(gc){
var gcForeground=gc.getForeground();
var size=this.getSize();
var border=this.getDisplay().getSystemColor(18);
if(this.showBorder){
gc.setForeground(border);
gc.drawRectangle(0,0,size.x-1,size.y-1);
if(this.highlight>0){
var x1=1;
var y1=1;
var x2=size.x-1;
var y2=size.y-1;
var shape=[x1,y1,x2,y1,x2,y2,x1,y2,x1,y1+this.highlight,x1+this.highlight,y1+this.highlight,x1+this.highlight,y2-this.highlight,x2-this.highlight,y2-this.highlight,x2-this.highlight,y1+this.highlight,x1,y1+this.highlight];
var highlightColor=this.getDisplay().getSystemColor(26);
gc.setBackground(highlightColor);
}}if(this.separator>-1){
gc.setForeground(border);
gc.drawLine(this.borderLeft+this.highlight,this.separator,size.x-this.borderLeft-this.borderRight-this.highlight,this.separator);
}gc.setForeground(gcForeground);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
var size=this.getSize();
if(this.oldSize==null||this.oldSize.x==0||this.oldSize.y==0){
this.redraw();
}else{
var width=0;
if(this.oldSize.x<size.x){
width=size.x-this.oldSize.x+this.borderRight+this.highlight;
}else if(this.oldSize.x>size.x){
width=this.borderRight+this.highlight;
}this.redraw(size.x-width,0,width,size.y,false);
var height=0;
if(this.oldSize.y<size.y){
height=size.y-this.oldSize.y+this.borderBottom+this.highlight;
}if(this.oldSize.y>size.y){
height=this.borderBottom+this.highlight;
}this.redraw(0,size.y-height,size.x,height,false);
}this.oldSize=size;
});
$_M(c$,"setContent",
function(content){
if(this.content!=null&&!this.content.isDisposed()){
this.content.setBounds(-200,-200,0,0);
}this.content=content;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setSelectionBackground",
function(color){
if(this.selectionBackground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(25);
this.selectionBackground=color;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setTopCenter",
function(topCenter){
if(this.topCenter!=null&&!this.topCenter.isDisposed()){
var size=this.topCenter.getSize();
this.topCenter.setLocation(-200-size.x,-200-size.y);
}this.topCenter=topCenter;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopLeft",
function(c){
if(this.topLeft!=null&&!this.topLeft.isDisposed()){
var size=this.topLeft.getSize();
this.topLeft.setLocation(-200-size.x,-200-size.y);
}this.topLeft=c;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(c){
if(this.topRight!=null&&!this.topRight.isDisposed()){
var size=this.topRight.getSize();
this.topRight.setLocation(-200-size.x,-200-size.y);
}this.topRight=c;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setBorderVisible",
function(show){
if(this.showBorder==show)return;
this.showBorder=show;
if(this.showBorder){
this.borderLeft=this.borderTop=this.borderRight=this.borderBottom=1;
if((this.getStyle()&8388608)==0)this.highlight=2;
}else{
this.borderBottom=this.borderTop=this.borderLeft=this.borderRight=0;
this.highlight=0;
}this.layout(false);
this.redraw();
},"~B");
$_M(c$,"setTopCenterSeparate",
function(show){
this.separateTopCenter=show;
this.layout(false);
},"~B");
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"OFFSCREEN",-200,
"BORDER1_COLOR",18,
"SELECTION_BACKGROUND",25);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"ViewFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var form=composite;
var left=form.topLeft;
var center=form.topCenter;
var right=form.topRight;
var content=form.content;
var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
leftSize=this.computeChildSize(left,-1,-1,flushCache);
}var centerSize=new $wt.graphics.Point(0,0);
if(center!=null){
centerSize=this.computeChildSize(center,-1,-1,flushCache);
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
rightSize=this.computeChildSize(right,-1,-1,flushCache);
}var size=new $wt.graphics.Point(0,0);
if(form.separateTopCenter||(wHint!=-1&&leftSize.x+centerSize.x+rightSize.x>wHint)){
size.x=leftSize.x+rightSize.x;
if(leftSize.x>0&&rightSize.x>0)size.x+=form.horizontalSpacing;
size.x=Math.max(centerSize.x,size.x);
size.y=Math.max(leftSize.y,rightSize.y);
if(center!=null){
size.y+=centerSize.y;
if(left!=null||right!=null)size.y+=form.verticalSpacing;
}}else{
size.x=leftSize.x+centerSize.x+rightSize.x;
var count=-1;
if(leftSize.x>0)count++;
if(centerSize.x>0)count++;
if(rightSize.x>0)count++;
if(count>0)size.x+=count*form.horizontalSpacing;
size.y=Math.max(leftSize.y,Math.max(centerSize.y,rightSize.y));
}if(content!=null){
if(left!=null||right!=null||center!=null)size.y+=1;
var contentSize=new $wt.graphics.Point(0,0);
contentSize=this.computeChildSize(content,-1,-1,flushCache);
size.x=Math.max(size.x,contentSize.x);
size.y+=contentSize.y;
if(size.y>contentSize.y)size.y+=form.verticalSpacing;
}size.x+=2*form.marginWidth;
size.y+=2*form.marginHeight;
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
return size;
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(control,wHint,hHint,flushCache){
var data=control.getLayoutData();
if(data==null||!($_O(data,$wt.custom.CLayoutData))){
data=new $wt.custom.CLayoutData();
control.setLayoutData(data);
}return(data).computeSize(control,wHint,hHint,flushCache);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(c){
if($_O(c,$wt.widgets.Scrollable)){
var rect=(c).computeTrim(0,0,0,0);
return rect.width;
}return c.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null&&$_O(data,$wt.custom.CLayoutData))(data).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var form=composite;
var left=form.topLeft;
var center=form.topCenter;
var right=form.topRight;
var content=form.content;
var rect=composite.getClientArea();
var leftSize=new $wt.graphics.Point(0,0);
if(left!=null&&!left.isDisposed()){
leftSize=this.computeChildSize(left,-1,-1,flushCache);
}var centerSize=new $wt.graphics.Point(0,0);
if(center!=null&&!center.isDisposed()){
centerSize=this.computeChildSize(center,-1,-1,flushCache);
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null&&!right.isDisposed()){
rightSize=this.computeChildSize(right,-1,-1,flushCache);
}var minTopWidth=leftSize.x+centerSize.x+rightSize.x+2*form.marginWidth+2*form.highlight;
var count=-1;
if(leftSize.x>0)count++;
if(centerSize.x>0)count++;
if(rightSize.x>0)count++;
if(count>0)minTopWidth+=count*form.horizontalSpacing;
var x=rect.x+rect.width-form.marginWidth-form.highlight;
var y=rect.y+form.marginHeight+form.highlight;
var top=false;
if(form.separateTopCenter||minTopWidth>rect.width){
var topHeight=Math.max(rightSize.y,leftSize.y);
if(right!=null&&!right.isDisposed()){
top=true;
x-=rightSize.x;
right.setBounds(x,y,rightSize.x,topHeight);
x-=form.horizontalSpacing;
}if(left!=null&&!left.isDisposed()){
top=true;
var trim=this.computeTrim(left);
var leftW=x-rect.x-form.marginWidth-form.highlight-trim;
leftSize=this.computeChildSize(left,leftW,-1,false);
left.setBounds(rect.x+form.marginWidth+form.highlight,y,leftSize.x,topHeight);
}if(top)y+=topHeight+form.verticalSpacing;
if(center!=null&&!center.isDisposed()){
top=true;
var trim=this.computeTrim(center);
var w=rect.width-2*form.marginWidth-2*form.highlight-trim;
centerSize=this.computeChildSize(center,w,-1,false);
center.setBounds(rect.x+rect.width-form.marginWidth-form.highlight-centerSize.x,y,centerSize.x,centerSize.y);
y+=centerSize.y+form.verticalSpacing;
}}else{
var topHeight=Math.max(rightSize.y,Math.max(centerSize.y,leftSize.y));
if(right!=null&&!right.isDisposed()){
top=true;
x-=rightSize.x;
right.setBounds(x,y,rightSize.x,topHeight);
x-=form.horizontalSpacing;
}if(center!=null&&!center.isDisposed()){
top=true;
x-=centerSize.x;
center.setBounds(x,y,centerSize.x,topHeight);
x-=form.horizontalSpacing;
}if(left!=null&&!left.isDisposed()){
top=true;
var trim=$_O(left,$wt.widgets.Composite)?(left).computeTrim(0,0,0,0):new $wt.graphics.Rectangle(0,0,0,0);
var w=x-rect.x-form.marginWidth-form.highlight-trim.width;
var h=topHeight-trim.height;
leftSize=this.computeChildSize(left,w,h,false);
left.setBounds(rect.x+form.marginWidth+form.highlight,y,leftSize.x,topHeight);
}if(top)y+=topHeight+form.verticalSpacing;
}var oldSeperator=form.separator;
form.separator=-1;
if(content!=null&&!content.isDisposed()){
if(left!=null||right!=null||center!=null){
form.separator=y;
y++;
}content.setBounds(rect.x+form.marginWidth+form.highlight,y,rect.width-2*form.marginWidth-2*form.highlight,rect.y+rect.height-y-form.marginHeight-form.highlight);
}if(oldSeperator!=-1&&form.separator!=-1){
var t=Math.min(form.separator,oldSeperator);
var b=Math.max(form.separator,oldSeperator);
form.redraw(form.borderLeft,t,form.getSize().x-form.borderLeft-form.borderRight,b-t,false);
}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.align=16384;
this.hIndent=3;
this.vIndent=3;
this.text=null;
this.image=null;
this.appToolTipText=null;
this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
$_Z(this,arguments);
},$wt.custom,"CLabel",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CLabel,[parent,$wt.custom.CLabel.checkStyle(style)]);
if((style&(16908288))==0)style|=16384;
if((style&16777216)!=0)this.align=16777216;
if((style&131072)!=0)this.align=131072;
if((style&16384)!=0)this.align=16384;
this.addPaintListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$1",null,$wt.events.PaintListener);
$_V(c$,"paintControl",
function(event){
this.b$["$wt.custom.CLabel"].onPaint(event);
},"$wt.events.PaintEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$1,i$,v$);
})(this,null));
this.addDisposeListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$2",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(event){
this.b$["$wt.custom.CLabel"].onDispose(event);
},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$2,i$,v$);
})(this,null));
this.addTraverseListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$3",null,$wt.events.TraverseListener);
$_V(c$,"keyTraversed",
function(event){
if(event.detail==128){
this.b$["$wt.custom.CLabel"].onMnemonic(event);
}},"$wt.events.TraverseEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$3,i$,v$);
})(this,null));
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
if((style&2048)!=0)style|=4;
var mask=100663340;
style=style&mask;
style|=524288;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
return style|262144;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var e=this.getTotalSize(this.image,this.text);
if(wHint==-1){
e.x+=2*this.hIndent;
}else{
e.x=wHint;
}if(hHint==-1){
e.y+=2*this.vIndent;
}else{
e.y=hHint;
}return e;
},"~N,~N,~B");
$_M(c$,"drawBevelRect",
($fz=function(gc,x,y,w,h,topleft,bottomright){
gc.setForeground(bottomright);
gc.drawLine(x+w,y,x+w,y+h);
gc.drawLine(x,y+h,x+w,y+h);
gc.setForeground(topleft);
gc.drawLine(x,y,x+w-1,y);
gc.drawLine(x,y,x,y+h-1);
},$fz.isPrivate=true,$fz),"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"getAlignment",
function(){
return this.align;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getTotalSize",
($fz=function(image,text){
var size=new $wt.graphics.Point(0,0);
if(image!=null){
var r=image.getBounds();
size.x+=r.width;
size.y+=r.height;
}var gc=new $wt.graphics.GC(this);
if(text!=null&&text.length>0){
var e=gc.textExtent(text,$wt.custom.CLabel.DRAW_FLAGS);
size.x+=e.x;
size.y=Math.max(size.y,e.y);
if(image!=null)size.x+=5;
}else{
size.y=Math.max(size.y,gc.getFontMetrics().getHeight());
}gc.dispose();
return size;
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~S");
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CLabel,"getStyle",[]);
switch(this.align){
case 131072:
style|=131072;
break;
case 16777216:
style|=16777216;
break;
case 16384:
style|=16384;
break;
}
return style;
});
$_M(c$,"getText",
function(){
return this.text;
});
$_M(c$,"getToolTipText",
function(){
return this.appToolTipText;
});
$_M(c$,"onDispose",
function(event){
this.gradientColors=null;
this.gradientPercents=null;
this.backgroundImage=null;
this.text=null;
this.image=null;
this.appToolTipText=null;
},"$wt.events.DisposeEvent");
$_M(c$,"onMnemonic",
function(event){
var mnemonic=this._findMnemonic(this.text);
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return;
if((Character.toUpperCase(event.character)).charCodeAt(0)!=(Character.toUpperCase(mnemonic)).charCodeAt(0))return;
var control=this.getParent();
while(control!=null){
var children=control.getChildren();
var index=0;
while(index<children.length){
if(children[index]==this)break;
index++;
}
index++;
if(index<children.length){
if(children[index].setFocus()){
event.doit=true;
event.detail=0;
}}control=control.getParent();
}
},"$wt.events.TraverseEvent");
$_M(c$,"onPaint",
function(event){
var rect=this.getClientArea();
for(var i=this.handle.childNodes.length-1;i>=0;i--){
this.handle.removeChild(this.handle.childNodes[i]);
}
if(rect.width==0||rect.height==0)return;
var shortenText=false;
var t=this.text;
var img=this.image;
var availableWidth=Math.max(0,rect.width-2*this.hIndent);
var extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
img=null;
extent=this.getTotalSize(img,t);
if(extent.x>availableWidth){
shortenText=true;
}}var gc=event.gc;
var lines=this.text==null?null:this.splitString(this.text);
if(shortenText){
extent.x=0;
for(var i=0;i<lines.length;i++){
var e=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS);
if(e.x>availableWidth){
lines[i]=this.shortenText(gc,lines[i],availableWidth);
extent.x=Math.max(extent.x,this.getTotalSize(null,lines[i]).x);
}else{
extent.x=Math.max(extent.x,e.x);
}}
if(this.appToolTipText==null){
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.text]);
}}else{
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.appToolTipText]);
}var x=rect.x+this.hIndent;
if(this.align==16777216){
x=Math.floor((rect.width-extent.x)/2);
}if(this.align==131072){
x=rect.width-this.hIndent-extent.x;
}try{
if(this.backgroundImage!=null){
var imageRect=this.backgroundImage.getBounds();
gc.setBackground(this.getBackground());
gc.fillRectangle(rect);
var xPos=0;
while(xPos<rect.width){
var yPos=0;
while(yPos<rect.height){
gc.drawImage(this.backgroundImage,xPos,yPos);
yPos+=imageRect.height;
}
xPos+=imageRect.width;
}
}else if(this.gradientColors!=null){
var oldBackground=gc.getBackground();
if(this.gradientColors.length==1){
if(this.gradientColors[0]!=null)gc.setBackground(this.gradientColors[0]);
gc.fillRectangle(0,0,rect.width,rect.height);
}else{
var oldForeground=gc.getForeground();
var lastColor=this.gradientColors[0];
if(lastColor==null)lastColor=oldBackground;
var pos=0;
for(var i=0;i<this.gradientPercents.length;++i){
gc.setForeground(lastColor);
lastColor=this.gradientColors[i+1];
if(lastColor==null)lastColor=oldBackground;
gc.setBackground(lastColor);
if(this.gradientVertical){
var gradientHeight=(Math.floor(this.gradientPercents[i]*rect.height/100))-pos;
gc.fillGradientRectangle(0,pos,rect.width,gradientHeight,true);
pos+=gradientHeight;
}else{
var gradientWidth=(Math.floor(this.gradientPercents[i]*rect.width/100))-pos;
gc.fillGradientRectangle(pos,0,gradientWidth,rect.height,false);
pos+=gradientWidth;
}}
if(this.gradientVertical&&pos<rect.height){
gc.setBackground(this.getBackground());
System.out.println("$$$$$$$$$$$$$");
gc.fillRectangle(0,pos,rect.width,rect.height-pos);
}if(!this.gradientVertical&&pos<rect.width){
gc.setBackground(this.getBackground());
System.out.println("***********");
gc.fillRectangle(pos,0,rect.width-pos,rect.height);
}gc.setForeground(oldForeground);
}gc.setBackground(oldBackground);
}else{
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("============"+rect);
gc.fillRectangle(rect);
}}}catch(e){
if($_O(e,$wt.SWTException)){
if((this.getStyle()&262144)!=0){
gc.setBackground(this.getBackground());
System.out.println("--------");
gc.fillRectangle(rect);
}}else{
throw e;
}
}
var style=this.getStyle();
if((style&4)!=0||(style&8)!=0){
this.paintBorder(gc,rect);
}if(img!=null){
var imageRect=img.getBounds();
gc.drawImage(img,0,0,imageRect.width,imageRect.height,x,Math.floor((rect.height-imageRect.height)/2),imageRect.width,imageRect.height);
x+=imageRect.width+5;
extent.x-=imageRect.width+5;
}if(lines!=null){
var lineHeight=gc.getFontMetrics().getHeight();
var textHeight=lines.length*lineHeight;
var lineY=Math.max(this.vIndent,rect.y+Math.floor((rect.height-textHeight)/2));
gc.setForeground(this.getForeground());
for(var i=0;i<lines.length;i++){
var lineX=x;
if(lines.length>1){
if(this.align==16777216){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=x+Math.max(0,Math.floor((extent.x-lineWidth)/2));
}if(this.align==131072){
var lineWidth=gc.textExtent(lines[i],$wt.custom.CLabel.DRAW_FLAGS).x;
lineX=Math.max(x,rect.x+rect.width-this.hIndent-lineWidth);
}}gc.drawText(lines[i],lineX,lineY,$wt.custom.CLabel.DRAW_FLAGS);
lineY+=lineHeight;
}
}System.out.println("end on paint");
System.out.println(this.getSize());
},"$wt.events.PaintEvent");
$_M(c$,"paintBorder",
($fz=function(gc,r){
var disp=this.getDisplay();
var c1=null;
var c2=null;
var style=this.getStyle();
if((style&4)!=0){
c1=disp.getSystemColor(18);
c2=disp.getSystemColor(20);
}if((style&8)!=0){
c1=disp.getSystemColor(19);
c2=disp.getSystemColor(18);
}if(c1!=null&&c2!=null){
gc.setLineWidth(1);
this.drawBevelRect(gc,r.x,r.y,r.width-1,r.height-1,c1,c2);
}},$fz.isPrivate=true,$fz),"$wt.graphics.GC,$wt.graphics.Rectangle");
$_M(c$,"setAlignment",
function(align){
if(this.align!=align){
this.align=align;
this.redraw();
}},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CLabel,"setBackground",[color]);
if(color!=null&&this.backgroundImage==null&&this.gradientColors==null&&this.gradientPercents==null){
var background=this.getBackground();
if(color.equals(background)){
return;
}}this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}for(var i=0;i<percents.length;i++){
}
}var background=this.getBackground();
if(this.backgroundImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
same=(this.gradientColors[i]==colors[i])||((this.gradientColors[i]==null)&&(colors[i]==background))||((this.gradientColors[i]==background)&&(colors[i]==null));
if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.backgroundImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i)this.gradientColors[i]=(colors[i]!=null)?colors[i]:background;

this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i)this.gradientPercents[i]=percents[i];

this.gradientVertical=vertical;
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image==this.backgroundImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.backgroundImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.custom.CLabel,"setFont",[font]);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
if(image!=this.image){
this.image=image;
this.redraw();
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(text){
if(text==null)text="";
if(!text.equals(this.text)){
this.text=text;
this.redraw();
}},"~S");
$_M(c$,"setToolTipText",
function(string){
$_U(this,$wt.custom.CLabel,"setToolTipText",[string]);
this.appToolTipText=$_U(this,$wt.custom.CLabel,"getToolTipText",[]);
},"~S");
$_M(c$,"shortenText",
function(gc,t,width){
if(t==null)return null;
var w=gc.textExtent($wt.custom.CLabel.ELLIPSIS,$wt.custom.CLabel.DRAW_FLAGS).x;
var l=t.length;
var pivot=Math.floor(l/2);
var s=pivot;
var e=pivot+1;
while(s>=0&&e<l){
var s1=t.substring(0,s);
var s2=t.substring(e,l);
var l1=gc.textExtent(s1,$wt.custom.CLabel.DRAW_FLAGS).x;
var l2=gc.textExtent(s2,$wt.custom.CLabel.DRAW_FLAGS).x;
if(l1+w+l2<width){
t=s1+$wt.custom.CLabel.ELLIPSIS+s2;
break;
}s--;
e++;
}
return t;
},"$wt.graphics.GC,~S,~N");
$_M(c$,"splitString",
($fz=function(text){
var lines=new Array(1);
var start=0;
var pos;
do{
pos=text.indexOf('\n',start);
if(pos==-1){
lines[lines.length-1]=text.substring(start);
}else{
var crlf=(pos>0)&&((text.charAt(pos-1)).charCodeAt(0)==('\r').charCodeAt(0));
lines[lines.length-1]=text.substring(start,pos-(crlf?1:0));
start=pos+1;
var newLines=new Array(lines.length+1);
System.arraycopy(lines,0,newLines,0,lines.length);
lines=newLines;
}}while(pos!=-1);
return lines;
},$fz.isPrivate=true,$fz),"~S");
$_S(c$,
"GAP",5,
"INDENT",3,
"ELLIPSIS","...",
"DRAW_FLAGS",15);
c$=$_C(function(){
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.custom,"CLayoutData");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(flushCache)this.flushCache();
if(wHint==-1&&hHint==-1){
if(this.defaultWidth==-1||this.defaultHeight==-1){
var size=control.computeSize(wHint,hHint,flushCache);
this.defaultWidth=size.x;
this.defaultHeight=size.y;
}return new $wt.graphics.Point(this.defaultWidth,this.defaultHeight);
}if(this.currentWidth==-1||this.currentHeight==-1||wHint!=this.currentWhint||hHint!=this.currentHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.currentWhint=wHint;
this.currentHhint=hHint;
this.currentWidth=size.x;
this.currentHeight=size.y;
}return new $wt.graphics.Point(this.currentWidth,this.currentHeight);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
c$=$_C(function(){
this.$left=null;
this.right=null;
this.bottom=null;
this.simple=true;
this.curve=null;
this.curveStart=0;
this.curveRect=null;
this.curve_width=5;
this.curve_indent=-2;
this.rightWidth=-1;
this.rightMinWidth=-1;
this.rightMinHeight=-1;
this.resizeCursor=null;
this.dragging=false;
this.rightDragDisplacement=0;
$_Z(this,arguments);
},$wt.custom,"CBanner",$wt.widgets.Composite);
$_Y(c$,function(){
this.curveRect=new $wt.graphics.Rectangle(0,0,0,0);
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CBanner,[parent,$wt.custom.CBanner.checkStyle(style)]);
$_U(this,$wt.custom.CBanner,"setLayout",[new $wt.custom.CBannerLayout()]);
this.updateCurve(25);
this.resizeCursor=new $wt.graphics.Cursor(this.getDisplay(),9);
var listener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CBanner$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CBanner$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 12:
this.b$["$wt.custom.CBanner"].onDispose();
break;
case 3:
this.b$["$wt.custom.CBanner"].onMouseDown(e.x,e.y);
break;
case 7:
this.b$["$wt.custom.CBanner"].onMouseExit();
break;
case 5:
this.b$["$wt.custom.CBanner"].onMouseMove(e.x,e.y);
break;
case 4:
this.b$["$wt.custom.CBanner"].onMouseUp();
break;
case 9:
this.b$["$wt.custom.CBanner"].onPaint(e.gc);
break;
case 11:
this.b$["$wt.custom.CBanner"].onResize();
break;
}
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.CBanner$1,i$,v$);
})(this,null);
var events=[12,3,7,5,4,9,11];
for(var i=0;i<events.length;i++){
this.addListener(events[i],listener);
}
},"$wt.widgets.Composite,~N");
c$.bezier=$_M(c$,"bezier",
function(x0,y0,x1,y1,x2,y2,x3,y3,count){
var a0=x0;
var a1=3*(x1-x0);
var a2=3*(x0+x2-2*x1);
var a3=x3-x0+3*x1-3*x2;
var b0=y0;
var b1=3*(y1-y0);
var b2=3*(y0+y2-2*y1);
var b3=y3-y0+3*y1-3*y2;
var polygon=$_A(2*count+2,0);
for(var i=0;i<=count;i++){
var t=i/count;
polygon[2*i]=parseInt((a0+a1*t+a2*t*t+a3*t*t*t));
polygon[2*i+1]=parseInt((b0+b1*t+b2*t*t+b3*t*t*t));
}
return polygon;
},"~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return 0;
},"~N");
$_M(c$,"getBottom",
function(){
return this.bottom;
});
$_V(c$,"getClientArea",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getLeft",
function(){
return this.$left;
});
$_M(c$,"getRight",
function(){
return this.right;
});
$_M(c$,"getRightMinimumSize",
function(){
return new $wt.graphics.Point(this.rightMinWidth,this.rightMinHeight);
});
$_M(c$,"getRightWidth",
function(){
if(this.right==null)return 0;
if(this.rightWidth==-1){
var size=this.right.computeSize(-1,this.getSize().y,false);
return size.x;
}return this.rightWidth;
});
$_M(c$,"getSimple",
function(){
return this.simple;
});
$_M(c$,"onDispose",
function(){
if(this.resizeCursor!=null)this.resizeCursor.dispose();
this.resizeCursor=null;
this.$left=null;
this.right=null;
});
$_M(c$,"onMouseDown",
function(x,y){
if(this.curveRect.contains(x,y)){
this.dragging=true;
this.rightDragDisplacement=this.curveStart-x+this.curve_width-this.curve_indent;
}},"~N,~N");
$_M(c$,"onMouseExit",
function(){
if(!this.dragging)this.setCursor(null);
});
$_M(c$,"onMouseMove",
function(x,y){
if(this.dragging){
var size=this.getSize();
if(!(0<x&&x<size.x))return;
this.rightWidth=Math.max(0,size.x-x-this.rightDragDisplacement);
if(this.rightMinWidth!=-1){
this.rightWidth=Math.max(this.rightMinWidth,this.rightWidth);
}this.layout(false);
return;
}if(this.curveRect.contains(x,y)){
this.setCursor(this.resizeCursor);
}else{
this.setCursor(null);
}},"~N,~N");
$_M(c$,"onMouseUp",
function(){
this.dragging=false;
});
$_M(c$,"onPaint",
function(gc){
var size=this.getSize();
var border1=this.getDisplay().getSystemColor($wt.custom.CBanner.BORDER1);
if(this.bottom!=null&&(this.$left!=null||this.right!=null)){
gc.setForeground(border1);
var y=this.bottom.getBounds().y-1-1;
gc.drawLine(0,y,size.x,y);
}if(this.$left==null||this.right==null)return;
var line1=$_A(this.curve.length+6,0);
var index=0;
var x=this.curveStart;
var y=0;
line1[index++]=x+1;
line1[index++]=size.y-1;
for(var i=0;i<Math.floor(this.curve.length/2);i++){
line1[index++]=x+this.curve[2*i];
line1[index++]=y+this.curve[2*i+1];
}
line1[index++]=x+this.curve_width;
line1[index++]=0;
line1[index++]=size.x;
line1[index++]=0;
var background=this.getBackground();
if(this.getDisplay().getDepth()>=15){
var line2=$_A(line1.length,0);
index=0;
for(var i=0;i<Math.floor(line1.length/2);i++){
line2[index]=line1[index++]-1;
line2[index]=line1[index++];
}
var line3=$_A(line1.length,0);
index=0;
for(var i=0;i<Math.floor(line1.length/2);i++){
line3[index]=line1[index++]+1;
line3[index]=line1[index++];
}
var from=border1.getRGB();
var to=background.getRGB();
var red=from.red+Math.floor(3*(to.red-from.red)/4);
var green=from.green+Math.floor(3*(to.green-from.green)/4);
var blue=from.blue+Math.floor(3*(to.blue-from.blue)/4);
var color=new $wt.graphics.Color(this.getDisplay(),red,green,blue);
gc.setForeground(color);
color.dispose();
var x1=Math.max(0,this.curveStart-200);
gc.setForeground(background);
gc.setBackground(border1);
gc.fillGradientRectangle(x1,size.y-1,this.curveStart-x1+1,1,false);
}else{
var x1=Math.max(0,this.curveStart-200);
gc.setForeground(border1);
gc.drawLine(x1,size.y-1,this.curveStart+1,size.y-1);
}gc.setForeground(border1);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
this.updateCurve(this.getSize().y);
});
$_M(c$,"setBottom",
function(control){
if(this.bottom!=null&&!this.bottom.isDisposed()){
var size=this.bottom.getSize();
this.bottom.setLocation(-200-size.x,-200-size.y);
}this.bottom=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setLeft",
function(control){
if(this.$left!=null&&!this.$left.isDisposed()){
var size=this.$left.getSize();
this.$left.setLocation(-200-size.x,-200-size.y);
}this.$left=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRight",
function(control){
if(this.right!=null&&!this.right.isDisposed()){
var size=this.right.getSize();
this.right.setLocation(-200-size.x,-200-size.y);
}this.right=control;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRightMinimumSize",
function(size){
this.rightMinWidth=size.x;
this.rightMinHeight=size.y;
},"$wt.graphics.Point");
$_M(c$,"setRightWidth",
function(width){
this.rightWidth=width;
this.layout(false);
},"~N");
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
if(simple){
this.curve_width=5;
this.curve_indent=-2;
}else{
this.curve_width=50;
this.curve_indent=5;
}this.updateCurve(this.getSize().y);
this.layout(false);
this.redraw();
}},"~B");
$_M(c$,"updateCurve",
function(height){
var h=height-1;
if(this.simple){
this.curve=[0,h,1,h,2,h-1,3,h-2,3,2,4,1,5,0];
}else{
this.curve=$wt.custom.CBanner.bezier(0,h+1,30,h+1,this.curve_width-30,0,this.curve_width,0,this.curve_width);
}},"~N");
$_S(c$,
"OFFSCREEN",-200,
"BORDER_BOTTOM",2,
"BORDER_TOP",3,
"BORDER_STRIPE",1,
"CURVE_TAIL",200,
"BEZIER_RIGHT",30,
"BEZIER_LEFT",30,
"MIN_LEFT",10,
"BORDER1",20);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CBannerLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var banner=composite;
var left=banner.$left;
var right=banner.right;
var bottom=banner.bottom;
var showCurve=left!=null&&right!=null;
var height=hHint;
var width=wHint;
var bottomSize=new $wt.graphics.Point(0,0);
if(bottom!=null){
var trim=this.computeTrim(bottom);
var w=wHint==-1?-1:width-trim;
bottomSize=this.computeChildSize(bottom,w,-1,flushCache);
if(hHint!=-1){
bottomSize.y=Math.min(bottomSize.y,height);
height-=bottomSize.y+3+1+2;
}}if(showCurve&&hHint!=-1){
height-=7;
}var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
var trim=this.computeTrim(right);
var w=banner.rightWidth==-1?-1:banner.rightWidth-trim;
var h=banner.rightWidth==-1?-1:height;
rightSize=this.computeChildSize(right,w,h,flushCache);
if(wHint!=-1){
rightSize.x=Math.min(rightSize.x,width);
width-=rightSize.x+banner.curve_width-2*banner.curve_indent;
width=Math.max(width,10);
}}var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
var trim=this.computeTrim(left);
var w=wHint==-1?-1:width-trim;
leftSize=this.computeChildSize(left,w,-1,flushCache);
}width=leftSize.x+rightSize.x;
height=bottomSize.y;
if(bottom!=null){
height+=3;
}if(left!=null){
height+=right==null?leftSize.y:Math.max(leftSize.y,banner.rightMinHeight);
}else{
height+=rightSize.y;
}if(showCurve){
width+=banner.curve_width-2*banner.curve_indent;
height+=7;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(control,wHint,hHint,flushCache){
var data=control.getLayoutData();
if(data==null||!($_O(data,$wt.custom.CLayoutData))){
data=new $wt.custom.CLayoutData();
control.setLayoutData(data);
}return(data).computeSize(control,wHint,hHint,flushCache);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(c){
if($_O(c,$wt.widgets.Scrollable)){
var rect=(c).computeTrim(0,0,0,0);
return rect.width;
}return c.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null&&$_O(data,$wt.custom.CLayoutData))(data).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var banner=composite;
var left=banner.$left;
var right=banner.right;
var bottom=banner.bottom;
var size=banner.getSize();
var showCurve=left!=null&&right!=null;
var width=size.x;
var height=size.y;
var bottomSize=new $wt.graphics.Point(0,0);
if(bottom!=null){
var trim=this.computeTrim(bottom);
var w=width-trim;
bottomSize=this.computeChildSize(bottom,w,-1,flushCache);
bottomSize.y=Math.min(bottomSize.y,height);
height-=bottomSize.y+3+2+1;
}if(showCurve)height-=7;
height=Math.max(0,height);
var rightSize=new $wt.graphics.Point(0,0);
if(right!=null){
var trimX=0;
var trimY=0;
if($_O(right,$wt.widgets.Scrollable)){
var rect=(right).computeTrim(0,0,0,0);
trimX=rect.width;
trimY=rect.height;
}else{
trimX=trimY=right.getBorderWidth()*2;
}var rightW=banner.rightWidth==-1?-1:banner.rightWidth-trimX;
var rightH=banner.rightWidth==-1?-1:height-trimY;
rightSize=this.computeChildSize(right,rightW,rightH,flushCache);
rightSize.x=Math.min(rightSize.x,width);
width-=rightSize.x+banner.curve_width-2*banner.curve_indent;
width=Math.max(width,10);
}var leftSize=new $wt.graphics.Point(0,0);
if(left!=null){
var trim=this.computeTrim(left);
leftSize=this.computeChildSize(left,width-trim,-1,flushCache);
}var x=0;
var y=0;
var oldStart=banner.curveStart;
var leftRect=null;
var rightRect=null;
var bottomRect=null;
if(bottom!=null){
bottomRect=new $wt.graphics.Rectangle(x,y+size.y-bottomSize.y,bottomSize.x,bottomSize.y);
}if(showCurve)y+=4;
if(left!=null){
leftRect=new $wt.graphics.Rectangle(x,y,leftSize.x,leftSize.y);
banner.curveStart=x+leftSize.x-banner.curve_indent;
x+=leftSize.x+banner.curve_width-2*banner.curve_indent;
}if(right!=null){
rightRect=new $wt.graphics.Rectangle(x,y,rightSize.x,rightSize.y);
}if(banner.curveStart<oldStart){
banner.redraw(banner.curveStart-200,0,oldStart+banner.curve_width-banner.curveStart+200+5,size.y,false);
}if(banner.curveStart>oldStart){
banner.redraw(oldStart-200,0,banner.curveStart+banner.curve_width-oldStart+200+5,size.y,false);
}banner.update();
banner.curveRect=new $wt.graphics.Rectangle(banner.curveStart,0,banner.curve_width,size.y);
if(bottomRect!=null)bottom.setBounds(bottomRect);
if(rightRect!=null)right.setBounds(rightRect);
if(leftRect!=null)left.setBounds(leftRect);
},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.parent=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.shortenedTextWidth=0;
this.hasImage=false;
this.textEl=null;
this.rightEl=null;
this.isSelected=false;
this.font=null;
this.disabledImage=null;
this.closeRect=null;
this.closeImageState=0;
this.showClose=false;
this.showing=false;
$_Z(this,arguments);
},$wt.custom,"CTabItem",$wt.widgets.Item);
$_Y(c$,function(){
this.closeRect=new $wt.graphics.Rectangle(0,0,0,0);
});
$_K(c$,
function(parent,style){
this.construct(parent,style,parent.getItemCount());
},"$wt.custom.CTabFolder,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.custom.CTabItem,[parent,$wt.custom.CTabItem.checkStyle(style)]);
this.parent=parent;
this.showClose=parent.showClose;
System.out.println("after sw"+this.showClose+" "+(style&64)+" "+style);
parent.createItem(this,index);
System.out.println("handle "+this.handle);
this.configure(index);
},"$wt.custom.CTabFolder,~N,~N");
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"configure",
($fz=function(index){
this.handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].parent.setSelection(this.b$["$wt.custom.CTabItem"]);
System.out.println("An item is selected "+this.b$["$wt.custom.CTabItem"]);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$1,i$,v$);
})(this,null));
if(this.parent.showClose){
this.handle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(true);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$2,i$,v$);
})(this,null));
this.handle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.custom.CTabItem"].prepareCloseBtn(false);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$3,i$,v$);
})(this,null));
}},$fz.isPrivate=true,$fz),"~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return 0;
},"~N");
c$.shortenText=$_M(c$,"shortenText",
function(gc,text,width){
if(gc.textExtent(text,9).x<=width)return text;
var ellipseWidth=gc.textExtent($wt.custom.CTabItem.ELLIPSIS,9).x;
var length=text.length;
var end=length-1;
while(end>0){
text=text.substring(0,end);
var l=gc.textExtent(text,9).x;
if(l+ellipseWidth<=width){
return text+$wt.custom.CTabItem.ELLIPSIS;
}end--;
}
return text.substring(0,1);
},"$wt.graphics.GC,~S,~N");
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
this.parent.destroyItem(this);
$_U(this,$wt.custom.CTabItem,"dispose",[]);
this.parent=null;
this.control=null;
this.toolTipText=null;
this.shortenedText=null;
this.font=null;
});
$_M(c$,"drawClose",
function(gc){
if(this.closeRect.width==0||this.closeRect.height==0)return;
var display=this.getDisplay();
var indent=Math.max(1,4);
var x=this.closeRect.x+indent;
var y=this.closeRect.y+indent;
y+=this.parent.onBottom?-1:1;
var closeBorder=display.getSystemColor(17);
switch(this.closeImageState){
case 1:
{
var shape=[x,y,x+2,y,x+4,y+2,x+5,y+2,x+7,y,x+9,y,x+9,y+2,x+7,y+4,x+7,y+5,x+9,y+7,x+9,y+9,x+7,y+9,x+5,y+7,x+4,y+7,x+2,y+9,x,y+9,x,y+7,x+2,y+5,x+2,y+4,x,y+2];
gc.setBackground(display.getSystemColor(25));
gc.fillPolygon(shape);
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 2:
{
var shape=[x,y,x+2,y,x+4,y+2,x+5,y+2,x+7,y,x+9,y,x+9,y+2,x+7,y+4,x+7,y+5,x+9,y+7,x+9,y+9,x+7,y+9,x+5,y+7,x+4,y+7,x+2,y+9,x,y+9,x,y+7,x+2,y+5,x+2,y+4,x,y+2];
var fill=new $wt.graphics.Color(display,$wt.custom.CTabFolder.CLOSE_FILL);
gc.setBackground(fill);
gc.fillPolygon(shape);
fill.dispose();
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 3:
{
var shape=[x+1,y+1,x+3,y+1,x+5,y+3,x+6,y+3,x+8,y+1,x+10,y+1,x+10,y+3,x+8,y+5,x+8,y+6,x+10,y+8,x+10,y+10,x+8,y+10,x+6,y+8,x+5,y+8,x+3,y+10,x+1,y+10,x+1,y+8,x+3,y+6,x+3,y+5,x+1,y+3];
var fill=new $wt.graphics.Color(display,$wt.custom.CTabFolder.CLOSE_FILL);
gc.setBackground(fill);
gc.fillPolygon(shape);
fill.dispose();
gc.setForeground(closeBorder);
gc.drawPolygon(shape);
break;
}case 0:
{
var shape=[x,y,x+10,y,x+10,y+10,x,y+10];
if(this.parent.gradientColors!=null&&!this.parent.gradientVertical){
}else{
var defaultBackground=this.parent.getBackground();
var image=this.parent.bgImage;
var colors=this.parent.gradientColors;
var percents=this.parent.gradientPercents;
var vertical=this.parent.gradientVertical;
}break;
}}
},"$wt.graphics.GC");
$_M(c$,"getBounds",
function(){
var w=this.width;
if(!this.parent.simple&&!this.parent.single&&this.parent.indexOf(this)==this.parent.selectedIndex)w+=this.parent.curveWidth-this.parent.curveIndent;
return new $wt.graphics.Rectangle(this.x,this.y,w,this.height);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getDisabledImage",
function(){
return this.disabledImage;
});
$_M(c$,"getFont",
function(){
if(this.font!=null)return this.font;
return this.parent.getFont();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getToolTipText",
function(){
if(this.toolTipText==null&&this.shortenedText!=null){
var text=this.getText();
if(!this.shortenedText.equals(text))return text;
}return this.toolTipText;
});
$_M(c$,"isShowing",
function(){
return this.showing;
});
$_M(c$,"preferredHeight",
function(gc){
var image=this.getImage();
var h=(image==null)?0:image.getBounds().height;
var text=this.getText();
if(this.font==null){
h=Math.max(h,gc.textExtent(text,9).y);
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
h=Math.max(h,gc.textExtent(text,9).y);
gc.setFont(gcFont);
}return h+2+2;
},"$wt.graphics.GC");
$_M(c$,"preferredWidth",
function(gc,isSelected,minimum){
if(this.isDisposed())return 0;
var w=0;
var image=this.getImage();
if(image!=null&&(isSelected||this.parent.showUnselectedImage)){
w+=image.getBounds().width;
}var text=null;
if(minimum){
var minChars=this.parent.minChars;
text=minChars==0?null:this.getText();
if(text!=null&&text.length>minChars){
var end=minChars<$wt.custom.CTabItem.ELLIPSIS.length+1?minChars:minChars-$wt.custom.CTabItem.ELLIPSIS.length;
text=text.substring(0,end);
if(minChars>$wt.custom.CTabItem.ELLIPSIS.length+1)text+=$wt.custom.CTabItem.ELLIPSIS;
}}else{
text=this.getText();
}if(text!=null){
if(w>0)w+=4;
if(this.font==null){
w+=gc.textExtent(text,9).x;
}else{
var gcFont=gc.getFont();
gc.setFont(this.font);
w+=gc.textExtent(text,9).x;
gc.setFont(gcFont);
}}if(this.parent.showClose||this.showClose){
if(isSelected||this.parent.showUnselectedClose){
if(w>0)w+=4;
w+=18;
}}return w+4+4;
},"$wt.graphics.GC,~B,~B");
$_M(c$,"setControl",
function(control){
if(control!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=control;
var index=this.parent.indexOf(this);
if(index!=this.parent.getSelectionIndex()){
if(newControl!=null)newControl.setVisible(false);
return;
}if(newControl!=null){
var clientArea=this.parent.getClientArea();
if(clientArea.height<=0||clientArea.width<=0){
System.out.println("client area has trouble");
}else{
newControl.setBounds(clientArea);
newControl.setVisible(true);
System.out.println("bounds "+clientArea);
}}if(oldControl!=null)oldControl.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setDisabledImage",
function(image){
this.disabledImage=image;
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(font){
if(font==null&&this.font==null)return;
if(font!=null&&font.equals(this.font))return;
this.font=font;
if(!this.parent.updateTabHeight(false)){
this.parent.updateItems();
}},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
var oldImage=this.getImage();
if(image==null&&oldImage==null)return;
if(image!=null&&image.equals(oldImage))return;
$_U(this,$wt.custom.CTabItem,"setImage",[image]);
if(!this.parent.updateTabHeight(false)){
if(oldImage!=null&&image!=null){
var oldBounds=oldImage.getBounds();
var bounds=image.getBounds();
if(bounds.width==oldBounds.width&&bounds.height==oldBounds.height){
if(this.showing)this.parent.redraw(this.x,this.y,this.width,this.height,false);
return;
}}this.parent.updateItems();
}},"$wt.graphics.Image");
$_V(c$,"setText",
function(string){
if(this.handle!=null){
$wt.internal.browser.OS.clearChildren(this.handle);
this.textEl=d$.createElement("DIV");
this.textEl.className="ctab-item-main-default-left";
this.textEl.appendChild(d$.createTextNode(string));
this.handle.appendChild(this.textEl);
this.rightEl=d$.createElement("DIV");
this.rightEl.className=this.cssClassForRight();
this.handle.appendChild(this.rightEl);
this.configureRightEl();
}this.text=string;
},"~S");
$_M(c$,"configureRightEl",
function(){
System.out.println("Show close : "+this.showClose);
if(this.showClose)this.rightEl.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabItem$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabItem$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.custom.CTabFolderEvent(this.b$["$wt.custom.CTabItem"].parent);
e.widget=this.b$["$wt.custom.CTabItem"].parent;
e.time=this.b$["$wt.custom.CTabItem"].display.getLastEventTime();
e.item=this.b$["$wt.custom.CTabItem"];
e.doit=true;
for(var j=0;j<this.b$["$wt.custom.CTabItem"].parent.folderListeners.length;j++){
var listener=this.b$["$wt.custom.CTabItem"].parent.folderListeners[j];
listener.close(e);
}
for(var j=0;j<this.b$["$wt.custom.CTabItem"].parent.tabListeners.length;j++){
var listener=this.b$["$wt.custom.CTabItem"].parent.tabListeners[j];
listener.itemClosed(e);
}
if(e.doit){
this.b$["$wt.custom.CTabItem"].parent.destroyItem(this.b$["$wt.custom.CTabItem"]);
}System.out.println("An item is closed "+this.b$["$wt.custom.CTabItem"]);
});
c$=$_P();
}
return $_N($wt.custom.CTabItem$4,i$,v$);
})(this,null));
});
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.custom.CTabItem,"releaseChild",[]);
var index=this.parent.indexOf(this);
if(index==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.custom.CTabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
BrowserNative.releaseHandle(this.textEl);
this.textEl=null;
}if(this.rightEl!=null){
BrowserNative.releaseHandle(this.rightEl);
this.rightEl=null;
}if(this.handle!=null){
BrowserNative.releaseHandle(this.handle);
this.handle=null;
}$_U(this,$wt.custom.CTabItem,"releaseHandle",[]);
});
$_M(c$,"prepareCloseBtn",
function($in){
var key="ctab-item-attach-close-right";
if(this.isSelected||!this.parent.showClose){
return;
}var idx=this.rightEl.className.indexOf(key);
if(idx!=-1){
this.rightEl.className=this.rightEl.className.substring(0,idx)+this.rightEl.className.substring(idx+key.length);
}if($in){
this.rightEl.className+=" ctab-item-attach-close-right ";
}this.handle.style.height=($wt.internal.browser.OS.getContainerHeight(this.textEl)+1)+"px";
this.rightEl.style.height=($wt.internal.browser.OS.getContainerHeight(this.textEl)+1)+"px";
},"~B");
$_M(c$,"showCloseFocus",
function(){
});
$_M(c$,"cssClassForRight",
function(){
var cssName="ctab-item-attach-";
cssName+=this.parent.simple?"":"rounded-";
cssName+=this.parent.showClose?"default-":"noextrapos-";
cssName+="right";
return cssName;
});
$_S(c$,
"TOP_MARGIN",2,
"BOTTOM_MARGIN",2,
"LEFT_MARGIN",4,
"RIGHT_MARGIN",4,
"INTERNAL_SPACING",4,
"FLAGS",9,
"ELLIPSIS","...");
$_I($wt.custom,"CTabFolderListener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolderLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var folder=composite;
var items=folder.items;
var tabW=0;
var gc=new $wt.graphics.GC(folder);
for(var i=0;i<items.length;i++){
if(folder.single){
tabW=Math.max(tabW,items[i].preferredWidth(gc,true,false));
}else{
tabW+=items[i].preferredWidth(gc,i==folder.selectedIndex,false);
}}
gc.dispose();
tabW+=3;
if(folder.showMax)tabW+=18;
if(folder.showMin)tabW+=18;
if(folder.single)tabW+=27;
if(folder.topRight!=null){
var pt=folder.topRight.computeSize(-1,folder.tabHeight,flushCache);
tabW+=3+pt.x;
}if(!folder.single&&!folder.simple)tabW+=folder.curveWidth-2*folder.curveIndent;
var controlW=0;
var controlH=0;
for(var i=0;i<items.length;i++){
var control=items[i].getControl();
if(control!=null&&!control.isDisposed()){
var size=control.computeSize(wHint,hHint,flushCache);
controlW=Math.max(controlW,size.x);
controlH=Math.max(controlH,size.y);
}}
var minWidth=Math.max(tabW,controlW);
var minHeight=(folder.minimized)?0:controlH;
if(minWidth==0)minWidth=64;
if(minHeight==0)minHeight=64;
if(wHint!=-1)minWidth=wHint;
if(hHint!=-1)minHeight=hHint;
return new $wt.graphics.Point(minWidth,minHeight);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var folder=composite;
if(folder.selectedIndex!=-1){
var control=folder.items[folder.selectedIndex].getControl();
if(control!=null&&!control.isDisposed()){
control.setBounds(folder.getClientArea());
}}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.item=null;
this.doit=false;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
$_Z(this,arguments);
},$wt.custom,"CTabFolderEvent",$wt.events.TypedEvent);
$_K(c$,
function(w){
$_R(this,$wt.custom.CTabFolderEvent,[w]);
},"$wt.widgets.Widget");
$_M(c$,"toString",
function(){
var string=$_U(this,$wt.custom.CTabFolderEvent,"toString",[]);
return string.substring(0,string.length-1)+" item="+this.item+" doit="+this.doit+" x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+"}";
});
$_S(c$,
"serialVersionUID",3760566386225066807);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolderAdapter",null,$wt.custom.CTabFolderListener);
$_V(c$,"itemClosed",
function(event){
},"$wt.custom.CTabFolderEvent");
$_I($wt.custom,"CTabFolder2Listener",$wt.internal.SWTEventListener);
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"CTabFolder2Adapter",null,$wt.custom.CTabFolder2Listener);
$_V(c$,"close",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"minimize",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"maximize",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"restore",
function(event){
},"$wt.custom.CTabFolderEvent");
$_V(c$,"showList",
function(event){
},"$wt.custom.CTabFolderEvent");
c$=$_C(function(){
this.itemMore=null;
this.contentArea=null;
this.offset=0;
this.marginWidth=0;
this.marginHeight=0;
this.MIN_TAB_WIDTH=4;
this.xClient=0;
this.yClient=0;
this.onBottom=false;
this.single=false;
this.simple=true;
this.fixedTabHeight=-1;
this.tabHeight=0;
this.minChars=20;
this.imageList=null;
this.items=null;
this.firstIndex=-1;
this.selectedIndex=-1;
this.priority=null;
this.mru=false;
this.folderListeners=null;
this.tabListeners=null;
this.selectionBgImage=null;
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.selectionForeground=null;
this.selectionBackground=null;
this.bgImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.showUnselectedImage=true;
this.showClose=false;
this.showUnselectedClose=true;
this.chevronRect=null;
this.chevronImageState=1;
this.showChevron=false;
this.$showMenu=null;
this.showMin=false;
this.minRect=null;
this.minimized=false;
this.minImageState=1;
this.showMax=false;
this.maxRect=null;
this.maximized=false;
this.maxImageState=1;
this.topRight=null;
this.topRightRect=null;
this.topRightAlignment=131072;
this.borderLeft=0;
this.borderRight=0;
this.borderTop=0;
this.borderBottom=0;
this.highlight_margin=0;
this.highlight_header=0;
this.curve=null;
this.curveWidth=0;
this.curveIndent=0;
this.inDispose=false;
this.oldSize=null;
this.oldFont=null;
this.toolTipEvents=null;
this.toolTipListener=null;
this.toolTipShell=null;
this.toolTipLabel=null;
this.buttonArea=null;
this.nwCorner=null;
this.neCorner=null;
$_Z(this,arguments);
},$wt.custom,"CTabFolder",$wt.widgets.Composite);
$_Y(c$,function(){
this.priority=$_A(0,0);
this.folderListeners=new Array(0);
this.tabListeners=new Array(0);
this.chevronRect=new $wt.graphics.Rectangle(0,0,0,0);
this.minRect=new $wt.graphics.Rectangle(0,0,0,0);
this.maxRect=new $wt.graphics.Rectangle(0,0,0,0);
this.topRightRect=new $wt.graphics.Rectangle(0,0,0,0);
this.toolTipEvents=[7,32,5,3,29];
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CTabFolder,[parent,$wt.custom.CTabFolder.checkStyle(parent,style)]);
$_U(this,$wt.custom.CTabFolder,"setLayout",[new $wt.custom.CTabFolderLayout()]);
var style2=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
this.oldFont=this.getFont();
this.onBottom=(style2&1024)!=0;
this.showClose=(style2&64)!=0;
this.single=(style2&4)!=0;
this.borderLeft=this.borderRight=(style&2048)!=0?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
this.highlight_header=(style&8388608)!=0?1:3;
this.highlight_margin=(style&8388608)!=0?0:2;
var display=this.getDisplay();
this.selectionForeground=display.getSystemColor(24);
this.selectionBackground=display.getSystemColor(25);
($t$=$wt.custom.CTabFolder.borderColor=display.getSystemColor(18),$wt.custom.CTabFolder.prototype.borderColor=$wt.custom.CTabFolder.borderColor,$t$);
this.updateTabHeight(false);
this.initAccessible();
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(parent,style){
var mask=109053126;
style=style&mask;
if((style&128)!=0)style=style&-1025;
if((style&2)!=0)style=style&-5;
style|=1048576;
var platform=$WT.getPlatform();
if("carbon".equals(platform)||"gtk".equals(platform))return style;
if((style&67108864)!=0)return style;
if((parent.getStyle()&134217728)!=0&&(style&33554432)==0)return style;
return style|262144;
},"$wt.widgets.Composite,~N");
c$.fillRegion=$_M(c$,"fillRegion",
function(gc,region){
var clipping=new $wt.graphics.Region();
gc.getClipping(clipping);
region.intersect(clipping);
gc.setClipping(region);
gc.fillRectangle(region.getBounds());
gc.setClipping(clipping);
clipping.dispose();
},"$wt.graphics.GC,$wt.graphics.Region");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"addCTabFolder2Listener",
function(listener){
var newListeners=new Array(this.folderListeners.length+1);
System.arraycopy(this.folderListeners,0,newListeners,0,this.folderListeners.length);
this.folderListeners=newListeners;
this.folderListeners[this.folderListeners.length-1]=listener;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"addCTabFolderListener",
function(listener){
var newTabListeners=new Array(this.tabListeners.length+1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,this.tabListeners.length);
this.tabListeners=newTabListeners;
this.tabListeners[this.tabListeners.length-1]=listener;
if(!this.showClose){
this.showClose=true;
this.updateItems();
this.redraw();
}},"$wt.custom.CTabFolderListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.custom.CTabFolder,"computeSize",[wHint,hHint,changed]);
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
}}
}if(width<0){
width+=136;
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=$wt.internal.browser.OS.getContainerHeight(this.buttonArea);
if($wt.internal.browser.OS.isIE){
lineHeight++;
}else{
if((this.style&1024)!=0){
lineHeight--;
}}System.err.println("]"+lineHeight);
x-=4;
y-=4+lineHeight;
width+=8;
height+=8+lineHeight;
var border=this.getBorderWidth();
x-=border;
y-=border;
width+=border*2;
height+=border*2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="ctab-item-default";
this.buttonArea.insertBefore(tab,this.itemMore);
item.textEl=d$.createElement("DIV");
item.textEl.className="ctab-item-main-default-left";
tab.appendChild(item.textEl);
item.rightEl=d$.createElement("DIV");
item.rightEl.className=item.cssClassForRight();
tab.appendChild(item.rightEl);
item.configureRightEl();
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
}}
}if(width<2){
width=2;
}tab.style.left=width+"px";
this.items[index]=item;
this.items[index].handle=tab;
this.priority[index]=0;
if(count==0){
this.setSelection(0,false);
var event=new $wt.widgets.Event();
event.item=this.items[0];
this.sendEvent(13,event);
}},"$wt.custom.CTabItem,~N");
$_M(c$,"destroyItem",
function(item){
if(this.inDispose)return;
var index=this.indexOf(item);
if(index==-1)return;
if(this.items.length==1){
this.items=new Array(0);
this.priority=$_A(0,0);
this.firstIndex=-1;
this.selectedIndex=-1;
var control=item.getControl();
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}this.hideToolTip();
this.setButtonBounds();
item.dispose();
this.redraw();
return;
}var newItems=new Array(this.items.length-1);
System.arraycopy(this.items,0,newItems,0,index);
System.arraycopy(this.items,index+1,newItems,index,this.items.length-index-1);
this.items=newItems;
var newPriority=$_A(this.priority.length-1,0);
var next=0;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index)continue;newPriority[next++]=this.priority[i]>index?this.priority[i]-1:this.priority[i];
}
this.priority=newPriority;
if(this.selectedIndex==index){
var control=item.getControl();
this.selectedIndex=-1;
var nextSelection=this.mru?this.priority[0]:Math.max(0,index-1);
this.setSelection(nextSelection,true);
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}else{
if(this.selectedIndex>index){
this.selectedIndex--;
}var left=-2;
var x=2;
for(var i=0;i<this.items.length;i++){
var w=$wt.internal.browser.OS.getContainerWidth(this.items[i].handle);
if(i<this.selectedIndex){
left+=w;
}var s=this.items[i].handle.style;
if(i==this.selectedIndex){
x-=2;
}if(i==this.selectedIndex+1&&!this.simple){
x+=15;
}s.left=x+"px";
x+=w;
}
}item.dispose();
this.updateItems();
},"$wt.custom.CTabItem");
$_M(c$,"getBorderVisible",
function(){
return this.borderLeft==1;
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var x=2;
var y=2;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=$wt.internal.browser.OS.getContainerHeight(this.items[0].handle);
if($wt.internal.browser.OS.isIE)lineHeight++;
h-=lineHeight;
if(this.getSelectionIndex()==0){
h+=2;
}if((this.style&1024)==0){
y+=lineHeight;
}else{
if($wt.internal.browser.OS.isIE)h--;
}}var border=this.getBorderWidth();
x+=border;
y+=border-$wt.internal.browser.OS.getContainerHeight(this.buttonArea);
w-=border*2;
h-=border*2;
return new $wt.graphics.Rectangle(x,y,w,h);
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(pt){
if(this.items.length==0)return null;
var size=this.getSize();
if(size.x<=this.borderLeft+this.borderRight)return null;
if(this.showChevron&&this.chevronRect.contains(pt))return null;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
var rect=item.getBounds();
if(rect.contains(pt))return item;
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_M(c$,"_findMnemonic",
function(string){
if(string==null)return'\0';
var index=0;
var length=string.length;
do{
while(index<length&&(string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"getMinimized",
function(){
return this.minimized;
});
$_M(c$,"getMinimizeVisible",
function(){
return this.showMin;
});
$_M(c$,"getMinimumCharacters",
function(){
return this.minChars;
});
$_M(c$,"getMaximized",
function(){
return this.maximized;
});
$_M(c$,"getMaximizeVisible",
function(){
return this.showMax;
});
$_M(c$,"getMRUVisible",
function(){
return this.mru;
});
$_M(c$,"getRightItemEdge",
function(){
var x=this.getSize().x-this.borderRight-3;
if(this.showMin)x-=18;
if(this.showMax)x-=18;
if(this.showChevron)x-=27;
if(this.topRight!=null&&this.topRightAlignment!=4){
var rightSize=this.topRight.computeSize(-1,-1,true);
x-=rightSize.x+3;
}return Math.max(0,x);
});
$_M(c$,"getSelection",
function(){
var index=this.getSelectionIndex();
if(index==-1)return null;
return this.items[index];
});
$_M(c$,"getSelectionBackground",
function(){
return this.selectionBackground;
});
$_M(c$,"getSelectionForeground",
function(){
return this.selectionForeground;
});
$_M(c$,"getSelectionIndex",
function(){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].handle!=null&&this.items[i].handle.className!=null&&this.items[i].handle.className.indexOf("selected")!=-1){
return i;
}}
return-1;
});
$_M(c$,"getSimple",
function(){
return this.simple;
});
$_M(c$,"getSingle",
function(){
return this.single;
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CTabFolder,"getStyle",[]);
style&=-1153;
style|=this.onBottom?1024:128;
style&=-7;
style|=this.single?4:2;
if(this.borderLeft!=0)style|=2048;
return style;
});
$_M(c$,"getTabHeight",
function(){
if(this.fixedTabHeight!=-1)return this.fixedTabHeight;
return this.tabHeight-1;
});
$_M(c$,"getTabPosition",
function(){
return this.onBottom?1024:128;
});
$_M(c$,"getTopRight",
function(){
return this.topRight;
});
$_M(c$,"getUnselectedCloseVisible",
function(){
return this.showUnselectedClose;
});
$_M(c$,"getUnselectedImageVisible",
function(){
return this.showUnselectedImage;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(this.items[i]==item)return i;
}
return-1;
},"$wt.custom.CTabItem");
$_M(c$,"initAccessible",
function(){
});
$_M(c$,"removeCTabFolder2Listener",
function(listener){
if(this.folderListeners.length==0)return;
var index=-1;
for(var i=0;i<this.folderListeners.length;i++){
if(listener==this.folderListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.folderListeners.length==1){
this.folderListeners=new Array(0);
return;
}var newTabListeners=new Array(this.folderListeners.length-1);
System.arraycopy(this.folderListeners,0,newTabListeners,0,index);
System.arraycopy(this.folderListeners,index+1,newTabListeners,index,this.folderListeners.length-index-1);
this.folderListeners=newTabListeners;
},"$wt.custom.CTabFolder2Listener");
$_M(c$,"removeCTabFolderListener",
function(listener){
if(this.tabListeners.length==0)return;
var index=-1;
for(var i=0;i<this.tabListeners.length;i++){
if(listener==this.tabListeners[i]){
index=i;
break;
}}
if(index==-1)return;
if(this.tabListeners.length==1){
this.tabListeners=new Array(0);
return;
}var newTabListeners=new Array(this.tabListeners.length-1);
System.arraycopy(this.tabListeners,0,newTabListeners,0,index);
System.arraycopy(this.tabListeners,index+1,newTabListeners,index,this.tabListeners.length-index-1);
this.tabListeners=newTabListeners;
},"$wt.custom.CTabFolderListener");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CTabFolder,"setBackground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(colors,percents){
this.setBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setBackground",
function(colors,percents,vertical){
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.bgImage==null){
if((this.gradientColors!=null)&&(colors!=null)&&(this.gradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.gradientColors.length;i++){
if(this.gradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.gradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.gradientPercents.length;i++){
same=this.gradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.gradientVertical==vertical)return;
}}else{
this.bgImage=null;
}if(colors==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
this.setBackground(null);
}else{
this.gradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.gradientColors[i]=colors[i];
}
this.gradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.gradientPercents[i]=percents[i];
}
this.gradientVertical=vertical;
this.setBackground(this.gradientColors[this.gradientColors.length-1]);
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(image){
if(image==this.bgImage)return;
if(image!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.bgImage=image;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setBorderVisible",
function(show){
if((this.borderLeft==1)==show)return;
this.borderLeft=this.borderRight=show?1:0;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderLeft;
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
},"~B");
$_M(c$,"setButtonBounds",
function(){
var size=this.getSize();
var oldX;
var oldY;
var oldWidth;
var oldHeight;
oldX=this.maxRect.x;
oldY=this.maxRect.y;
oldWidth=this.maxRect.width;
oldHeight=this.maxRect.height;
this.maxRect.x=this.maxRect.y=this.maxRect.width=this.maxRect.height=0;
if(this.showMax){
this.maxRect.x=size.x-this.borderRight-18-3;
if(this.borderRight>0)this.maxRect.x+=1;
this.maxRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.maxRect.width=18;
this.maxRect.height=18;
}if(oldX!=this.maxRect.x||oldWidth!=this.maxRect.width||oldY!=this.maxRect.y||oldHeight!=this.maxRect.height){
var left=Math.min(oldX,this.maxRect.x);
var right=Math.max(oldX+oldWidth,this.maxRect.x+this.maxRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.minRect.x;
oldY=this.minRect.y;
oldWidth=this.minRect.width;
oldHeight=this.minRect.height;
this.minRect.x=this.minRect.y=this.minRect.width=this.minRect.height=0;
if(this.showMin){
this.minRect.x=size.x-this.borderRight-this.maxRect.width-18-3;
if(this.borderRight>0)this.minRect.x+=1;
this.minRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
this.minRect.width=18;
this.minRect.height=18;
}if(oldX!=this.minRect.x||oldWidth!=this.minRect.width||oldY!=this.minRect.y||oldHeight!=this.minRect.height){
var left=Math.min(oldX,this.minRect.x);
var right=Math.max(oldX+oldWidth,this.minRect.x+this.minRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.topRightRect.x;
oldY=this.topRightRect.y;
oldWidth=this.topRightRect.width;
oldHeight=this.topRightRect.height;
this.topRightRect.x=this.topRightRect.y=this.topRightRect.width=this.topRightRect.height=0;
if(this.topRight!=null){
switch(this.topRightAlignment){
case 4:
{
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
if(this.single){
if(this.items.length==0||this.selectedIndex==-1){
this.topRightRect.x=this.borderLeft+3;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}else{
var item=this.items[this.selectedIndex];
if(item.x+item.width+7+27>=rightEdge)break;
this.topRightRect.x=item.x+item.width+7+27;
this.topRightRect.width=rightEdge-this.topRightRect.x;
}}else{
if(this.showChevron)break;
if(this.items.length==0){
this.topRightRect.x=this.borderLeft+3;
}else{
var item=this.items[this.items.length-1];
this.topRightRect.x=item.x+item.width;
if(!this.simple&&this.items.length-1==this.selectedIndex)this.topRightRect.x+=this.curveWidth-this.curveIndent;
}this.topRightRect.width=Math.max(0,rightEdge-this.topRightRect.x);
}this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
break;
}case 131072:
{
var topRightSize=this.topRight.computeSize(-1,this.tabHeight,false);
var rightEdge=size.x-this.borderRight-3-this.maxRect.width-this.minRect.width;
if(!this.simple&&this.borderRight>0&&!this.showMax&&!this.showMin)rightEdge-=2;
this.topRightRect.x=rightEdge-topRightSize.x;
this.topRightRect.width=topRightSize.x;
this.topRightRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.topRightRect.height=this.tabHeight-1;
}}
this.topRight.setBounds(this.topRightRect);
}if(oldX!=this.topRightRect.x||oldWidth!=this.topRightRect.width||oldY!=this.topRightRect.y||oldHeight!=this.topRightRect.height){
var left=Math.min(oldX,this.topRightRect.x);
var right=Math.max(oldX+oldWidth,this.topRightRect.x+this.topRightRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}oldX=this.chevronRect.x;
oldY=this.chevronRect.y;
oldWidth=this.chevronRect.width;
oldHeight=this.chevronRect.height;
this.chevronRect.x=this.chevronRect.y=this.chevronRect.height=this.chevronRect.width=0;
if(this.single){
if(this.selectedIndex==-1||this.items.length>1){
this.chevronRect.width=27;
this.chevronRect.height=18;
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
if(this.selectedIndex==-1){
this.chevronRect.x=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.topRightRect.width-this.chevronRect.width;
}else{
var item=this.items[this.selectedIndex];
var w=size.x-this.borderRight-3-this.minRect.width-this.maxRect.width-this.chevronRect.width;
if(this.topRightRect.width>0)w-=this.topRightRect.width+3;
this.chevronRect.x=Math.min(item.x+item.width+3,w);
}if(this.borderRight>0)this.chevronRect.x+=1;
}}else{
if(this.showChevron){
this.chevronRect.width=27;
this.chevronRect.height=18;
var i=0;
var lastIndex=-1;
while(i<this.priority.length&&this.items[this.priority[i]].showing){
lastIndex=Math.max(lastIndex,this.priority[i++]);
}
if(lastIndex==-1)lastIndex=this.firstIndex;
var lastItem=this.items[lastIndex];
var w=lastItem.x+lastItem.width+3;
if(!this.simple&&lastIndex==this.selectedIndex)w+=this.curveWidth-2*this.curveIndent;
this.chevronRect.x=Math.min(w,this.getRightItemEdge());
this.chevronRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-this.chevronRect.height)/ 2) : this.borderTop + Math.floor ((this.tabHeight - this.chevronRect.height) /2);
}}if(oldX!=this.chevronRect.x||oldWidth!=this.chevronRect.width||oldY!=this.chevronRect.y||oldHeight!=this.chevronRect.height){
var left=Math.min(oldX,this.chevronRect.x);
var right=Math.max(oldX+oldWidth,this.chevronRect.x+this.chevronRect.width);
var top=this.onBottom?size.y-this.borderBottom-this.tabHeight:this.borderTop+1;
this.redraw(left,top,right-left,this.tabHeight,false);
}});
$_M(c$,"setFont",
function(font){
if(font!=null&&font.equals(this.getFont()))return;
$_U(this,$wt.custom.CTabFolder,"setFont",[font]);
this.oldFont=this.getFont();
if(!this.updateTabHeight(false)){
this.updateItems();
this.redraw();
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.CTabFolder,"setForeground",[color]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setInsertMark",
function(item,after){
},"$wt.custom.CTabItem,~B");
$_M(c$,"setInsertMark",
function(index,after){
},"~N,~B");
$_M(c$,"setItemLocation",
function(){
var changed=false;
if(this.items.length==0)return false;
var size=this.getSize();
var y=this.onBottom?Math.max(this.borderBottom,size.y-this.borderBottom-this.tabHeight):this.borderTop;
if(this.single){
var defaultX=this.getDisplay().getBounds().width+10;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(i==this.selectedIndex){
this.firstIndex=this.selectedIndex;
var oldX=item.x;
var oldY=item.y;
item.x=this.borderLeft;
item.y=y;
item.showing=true;
if(this.showClose||item.showClose){
item.closeRect.x=this.borderLeft+4;
item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
}if(item.x!=oldX||item.y!=oldY)changed=true;
}else{
item.x=defaultX;
item.showing=false;
}}
}else{
var rightItemEdge=this.getRightItemEdge();
var maxWidth=rightItemEdge-this.borderLeft;
var width=0;
for(var i=0;i<this.priority.length;i++){
var item=this.items[this.priority[i]];
width+=item.width;
item.showing=i==0?true:item.width>0&&width<=maxWidth;
if(!this.simple&&this.priority[i]==this.selectedIndex)width+=this.curveWidth-2*this.curveIndent;
}
var x=0;
var defaultX=this.getDisplay().getBounds().width+10;
this.firstIndex=this.items.length-1;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(!item.showing){
if(item.x!=defaultX)changed=true;
item.x=defaultX;
}else{
this.firstIndex=Math.min(this.firstIndex,i);
if(item.x!=x||item.y!=y)changed=true;
item.x=x;
item.y=y;
if(i==this.selectedIndex){
var edge=Math.min(item.x+item.width,rightItemEdge);
item.closeRect.x=edge-4-18;
}else{
item.closeRect.x=item.x+item.width-4-18;
}item.closeRect.y=this.onBottom?size.y-this.borderBottom-this.tabHeight+Math.floor((this.tabHeight-18)/ 2) : this.borderTop + Math.floor ((this.tabHeight - 18) /2);
x=x+item.width;
if(!this.simple&&i==this.selectedIndex)x+=this.curveWidth-2*this.curveIndent;
}}
}return changed;
});
$_M(c$,"setItemSize",
function(){
var changed=false;
if(this.isDisposed())return changed;
var size=this.getSize();
if(size.x<=0||size.y<=0)return changed;
this.xClient=this.borderLeft+this.marginWidth+this.highlight_margin;
if(this.onBottom){
this.yClient=this.borderTop+this.highlight_margin+this.marginHeight;
}else{
this.yClient=this.borderTop+this.tabHeight+this.highlight_header+this.marginHeight;
}this.showChevron=false;
if(this.single){
this.showChevron=true;
if(this.selectedIndex!=-1){
var tab=this.items[this.selectedIndex];
var gc=new $wt.graphics.GC(this);
var width=tab.preferredWidth(gc,true,false);
gc.dispose();
width=Math.min(width,this.getRightItemEdge()-this.borderLeft);
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}return changed;
}if(this.items.length==0)return changed;
var widths;
var gc=new $wt.graphics.GC(this);
var tabAreaWidth=size.x-this.borderLeft-this.borderRight-3;
if(this.showMin)tabAreaWidth-=18;
if(this.showMax)tabAreaWidth-=18;
if(this.topRightAlignment==131072&&this.topRight!=null){
var rightSize=this.topRight.computeSize(-1,-1,false);
tabAreaWidth-=rightSize.x+3;
}if(!this.simple)tabAreaWidth-=this.curveWidth-2*this.curveIndent;
tabAreaWidth=Math.max(0,tabAreaWidth);
var minWidth=0;
var minWidths=$_A(this.items.length,0);
for(var i=0;i<this.priority.length;i++){
var index=this.priority[i];
minWidths[index]=this.items[index].preferredWidth(gc,index==this.selectedIndex,true);
minWidth+=minWidths[index];
if(minWidth>tabAreaWidth)break;
}
if(minWidth>tabAreaWidth){
this.showChevron=this.items.length>1;
if(this.showChevron)tabAreaWidth-=27;
widths=minWidths;
var index=this.selectedIndex!=-1?this.selectedIndex:0;
if(tabAreaWidth<widths[index]){
widths[index]=Math.max(0,tabAreaWidth);
}}else{
var maxWidth=0;
var maxWidths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
maxWidths[i]=this.items[i].preferredWidth(gc,i==this.selectedIndex,false);
maxWidth+=maxWidths[i];
}
if(maxWidth<=tabAreaWidth){
widths=maxWidths;
}else{
var extra=Math.floor((tabAreaWidth-minWidth)/this.items.length);
while(true){
var large=0;
var totalWidth=0;
for(var i=0;i<this.items.length;i++){
if(maxWidths[i]>minWidths[i]+extra){
totalWidth+=minWidths[i]+extra;
large++;
}else{
totalWidth+=maxWidths[i];
}}
if(totalWidth>=tabAreaWidth){
extra--;
break;
}if(large==0||tabAreaWidth-totalWidth<large)break;
extra++;
}
widths=$_A(this.items.length,0);
for(var i=0;i<this.items.length;i++){
widths[i]=Math.min(maxWidths[i],minWidths[i]+extra);
}
}}gc.dispose();
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
var width=widths[i];
if(tab.height!=this.tabHeight||tab.width!=width){
changed=true;
tab.shortenedText=null;
tab.shortenedTextWidth=0;
tab.height=this.tabHeight;
tab.width=width;
tab.closeRect.width=tab.closeRect.height=0;
if(this.showClose||tab.showClose){
if(i==this.selectedIndex||this.showUnselectedClose){
tab.closeRect.width=18;
tab.closeRect.height=18;
}}}}
return changed;
});
$_M(c$,"setMaximizeVisible",
function(visible){
if(this.showMax==visible)return;
this.showMax=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximized",
function(maximize){
if(this.maximized==maximize)return;
if(maximize&&this.minimized)this.setMinimized(false);
this.maximized=maximize;
this.redraw(this.maxRect.x,this.maxRect.y,this.maxRect.width,this.maxRect.height,false);
},"~B");
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
this.setSelection(this.getSelectionIndex(),false);
return $_U(this,$wt.custom.CTabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height){
this.contentArea.style.height=(height-$wt.internal.browser.OS.getContainerHeight(this.buttonArea)-6)+"px";
this.contentArea.style.width=(width-6)+"px";
this.buttonArea.style.width=(width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setBounds",[x,y,width,height]);
},"~N,~N,~N,~N");
$_M(c$,"setMinimizeVisible",
function(visible){
if(this.showMin==visible)return;
this.showMin=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setMinimized",
function(minimize){
if(this.minimized==minimize)return;
if(minimize&&this.maximized)this.setMaximized(false);
this.minimized=minimize;
this.redraw(this.minRect.x,this.minRect.y,this.minRect.width,this.minRect.height,false);
},"~B");
$_M(c$,"setMinimumCharacters",
function(count){
if(this.minChars==count)return;
this.minChars=count;
},"~N");
$_M(c$,"setMRUVisible",
function(show){
if(this.mru==show)return;
this.mru=show;
if(!this.mru){
var idx=this.firstIndex;
var next=0;
for(var i=this.firstIndex;i<this.items.length;i++){
this.priority[next++]=i;
}
for(var i=0;i<idx;i++){
this.priority[next++]=i;
}
}},"~B");
$_M(c$,"setSelection",
function(item){
var index=this.indexOf(item);
if(index!=-1)this.setSelection(index,false);
},"$wt.custom.CTabItem");
$_M(c$,"setSelection",
function(index){
var count=this.getItemCount();
if(!(0<=index&&index<count))return;
this.setSelection(index,false);
},"~N");
$_M(c$,"setSelection",
function(index,notify){
var oldIndex=this.getSelectionIndex();
if(oldIndex==index){
return;
}if(oldIndex!=-1){
var item=this.items[oldIndex];
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setVisible(false);
}}this.updateSelection(index);
var newIndex=index;
if(newIndex!=-1){
var item=this.items[newIndex];
this.selectedIndex=newIndex;
var control=item.control;
if(control!=null&&!control.isDisposed()){
control.setBounds(this.getClientArea());
control.setVisible(true);
}if(notify){
var event=new $wt.widgets.Event();
event.item=item;
this.sendEvent(13,event);
}}this.layout();
},"~N,~B");
$_M(c$,"updateSelection",
function(index){
var key=this.simple?"ctab-item-selected":"ctab-item-rounded-selected";
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
this.items[i].handle.style.display="block";
this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].rightEl.className=this.items[i].cssClassForRight();
this.items[i].handle.style.height=($wt.internal.browser.OS.getContainerHeight(this.buttonArea)-3)+"px";
this.items[i].isSelected=false;
if(i>index){
}}var w=$wt.internal.browser.OS.getContainerWidth(this.items[i].rightEl)+$wt.internal.browser.OS.getContainerWidth(this.items[i].textEl);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}if(i==index+1&&!this.simple){
x+=24;
}s.left=x+"px";
s.width=w+"px";
x+=w+2;
}
var ww=Integer.parseInt(this.handle.style.width);
if(ww>0){
}var cssName=this.items[index].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx==-1){
var w=$wt.internal.browser.OS.getContainerWidth(this.items[index].rightEl)+$wt.internal.browser.OS.getContainerWidth(this.items[index].textEl);
this.items[index].handle.className+=" "+key;
this.items[index].rightEl.className=this.items[index].cssClassForRight();
this.items[index].handle.style.height=($wt.internal.browser.OS.getContainerHeight(this.buttonArea)+3)+"px";
this.items[index].rightEl.style.height=this.items[index].handle.style.height;
this.items[index].isSelected=true;
if(!this.simple){
w+=24;
}var s=this.items[index].handle.style;
s.width=w+"px";
}this.items[index].handle.style.zIndex=(this.items.length+1)+"";
if(this.width!=0){
var w=$wt.internal.browser.OS.getContainerWidth(this.items[index].handle);
left+=4;
var y=(this.width-left-4);
if(index>=this.offset){
y-=w;
}if(y<0){
y=0;
}if(left<2){
left=2;
}}}var after=false;
for(var i=0;i<this.offset;i++){
this.items[i].handle.style.display="none";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
this.items[i].handle.style.height=($wt.internal.browser.OS.getContainerHeight(this.items[i].handle)-3)+"px";
}}
},"~N");
$_M(c$,"setSelectionBackground",
function(color){
if(this.selectionBackground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(25);
this.selectionBackground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelectionBackground",
function(colors,percents){
this.setSelectionBackground(colors,percents,false);
},"~A,~A");
$_M(c$,"setSelectionBackground",
function(colors,percents,vertical){
if(colors!=null){
for(var i=0;i<percents.length;i++){
}
if(this.getDisplay().getDepth()<15){
colors=[colors[colors.length-1]];
percents=[];
}}if(this.selectionBgImage==null){
if((this.selectionGradientColors!=null)&&(colors!=null)&&(this.selectionGradientColors.length==colors.length)){
var same=false;
for(var i=0;i<this.selectionGradientColors.length;i++){
if(this.selectionGradientColors[i]==null){
same=colors[i]==null;
}else{
same=this.selectionGradientColors[i].equals(colors[i]);
}if(!same)break;
}
if(same){
for(var i=0;i<this.selectionGradientPercents.length;i++){
same=this.selectionGradientPercents[i]==percents[i];
if(!same)break;
}
}if(same&&this.selectionGradientVertical==vertical)return;
}}else{
this.selectionBgImage=null;
}if(colors==null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
this.selectionGradientVertical=false;
this.setSelectionBackground(null);
}else{
this.selectionGradientColors=new Array(colors.length);
for(var i=0;i<colors.length;++i){
this.selectionGradientColors[i]=colors[i];
}
this.selectionGradientPercents=$_A(percents.length,0);
for(var i=0;i<percents.length;++i){
this.selectionGradientPercents[i]=percents[i];
}
this.selectionGradientVertical=vertical;
this.setSelectionBackground(this.selectionGradientColors[this.selectionGradientColors.length-1]);
}if(this.selectedIndex>-1)this.redraw();
},"~A,~A,~B");
$_M(c$,"setSelectionBackground",
function(image){
if(image==this.selectionBgImage)return;
if(image!=null){
this.selectionGradientColors=null;
this.selectionGradientPercents=null;
}this.selectionBgImage=image;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setSelectionForeground",
function(color){
if(this.selectionForeground==color)return;
if(color==null)color=this.getDisplay().getSystemColor(24);
this.selectionForeground=color;
if(this.selectedIndex>-1)this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSize",
function(width,height){
this.contentArea.style.height=(height-$wt.internal.browser.OS.getContainerHeight(this.buttonArea)-6)+"px";
this.contentArea.style.width=(width-6)+"px";
this.buttonArea.style.width=(width-4)+"px";
$_U(this,$wt.custom.CTabFolder,"setSize",[width,height]);
},"~N,~N");
$_M(c$,"setSimple",
function(simple){
if(this.simple!=simple){
this.simple=simple;
var key="ctab-folder-content-area-border-blue";
var cssName=this.contentArea.className;
var idx=cssName.indexOf(key);
if(simple&&idx!=-1){
this.contentArea.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}if(!simple&&idx==-1){
this.contentArea.className=cssName+" "+key;
}var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setSingle",
function(single){
if(this.single!=single){
this.single=single;
if(!single){
for(var i=0;i<this.items.length;i++){
if(i!=this.selectedIndex&&this.items[i].closeImageState==1){
this.items[i].closeImageState=0;
}}
}var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~B");
$_M(c$,"setTabHeight",
function(height){
this.fixedTabHeight=height;
this.updateTabHeight(false);
},"~N");
$_M(c$,"setTabPosition",
function(position){
if(this.onBottom!=(position==1024)){
this.onBottom=position==1024;
this.borderTop=this.onBottom?this.borderLeft:0;
this.borderBottom=this.onBottom?0:this.borderRight;
this.updateTabHeight(true);
var rectBefore=this.getClientArea();
this.updateItems();
var rectAfter=this.getClientArea();
if(!rectBefore.equals(rectAfter)){
this.notifyListeners(11,new $wt.widgets.Event());
}this.redraw();
}},"~N");
$_M(c$,"setTopRight",
function(control){
this.setTopRight(control,131072);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(control,alignment){
this.topRight=control;
this.topRightAlignment=alignment;
if(this.updateItems())this.redraw();
},"$wt.widgets.Control,~N");
$_M(c$,"setUnselectedCloseVisible",
function(visible){
if(this.showUnselectedClose==visible)return;
this.showUnselectedClose=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"setUnselectedImageVisible",
function(visible){
if(this.showUnselectedImage==visible)return;
this.showUnselectedImage=visible;
this.updateItems();
this.redraw();
},"~B");
$_M(c$,"showItem",
function(item){
var index=this.indexOf(item);
var idx=-1;
for(var i=0;i<this.priority.length;i++){
if(this.priority[i]==index){
idx=i;
break;
}}
if(this.mru){
var newPriority=$_A(this.priority.length,0);
System.arraycopy(this.priority,0,newPriority,1,idx);
System.arraycopy(this.priority,idx+1,newPriority,idx+1,this.priority.length-idx-1);
newPriority[0]=index;
this.priority=newPriority;
}if(item.isShowing())return;
this.updateItems(index);
},"$wt.custom.CTabItem");
$_M(c$,"showList",
function(rect){
if(this.items.length==0||!this.showChevron)return;
if(this.$showMenu==null||this.$showMenu.isDisposed()){
this.$showMenu=new $wt.widgets.Menu(this);
}else{
var items=this.$showMenu.getItems();
for(var i=0;i<items.length;i++){
items[i].dispose();
}
}var id="CTabFolder_showList_Index";
for(var i=0;i<this.items.length;i++){
var tab=this.items[i];
if(tab.showing)continue;var item=new $wt.widgets.MenuItem(this.$showMenu,0);
item.setText(tab.getText());
item.setImage(tab.getImage());
item.setData(id,tab);
item.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CTabFolder$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CTabFolder$1",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
var menuItem=e.widget;
var index=this.b$["$wt.custom.CTabFolder"].indexOf(menuItem.getData(this.f$.id));
this.b$["$wt.custom.CTabFolder"].setSelection(index,true);
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.custom.CTabFolder$1,i$,v$);
})(this,$_F("id",id)));
}
var x=rect.x;
var y=rect.y+rect.height;
var location=this.getDisplay().map(this,null,x,y);
this.$showMenu.setLocation(location.x,location.y);
this.$showMenu.setVisible(true);
},"$wt.graphics.Rectangle");
$_M(c$,"showSelection",
function(){
if(this.selectedIndex!=-1){
this.showItem(this.getSelection());
}});
$_M(c$,"hideToolTip",
function(){
if(this.toolTipShell==null)return;
for(var i=0;i<this.toolTipEvents.length;i++){
this.removeListener(this.toolTipEvents[i],this.toolTipListener);
}
this.toolTipShell.dispose();
this.toolTipShell=null;
this.toolTipLabel=null;
});
$_M(c$,"showToolTip",
function(x,y){
if(this.toolTipShell==null){
this.toolTipShell=new $wt.widgets.Shell(this.getShell(),16388);
this.toolTipLabel=new $wt.widgets.Label(this.toolTipShell,16777216);
var display=this.toolTipShell.getDisplay();
this.toolTipLabel.setForeground(display.getSystemColor(28));
this.toolTipLabel.setBackground(display.getSystemColor(29));
for(var i=0;i<this.toolTipEvents.length;i++){
this.addListener(this.toolTipEvents[i],this.toolTipListener);
}
}if(this.updateToolTip(x,y)){
this.toolTipShell.setVisible(true);
}else{
this.hideToolTip();
}},"~N,~N");
$_M(c$,"updateItems",
function(){
return this.updateItems(this.selectedIndex);
});
$_M(c$,"updateItems",
function(showIndex){
return false;
},"~N");
$_M(c$,"updateTabHeight",
function(force){
var oldHeight=this.tabHeight;
if(this.fixedTabHeight!=-1){
this.tabHeight=this.fixedTabHeight==0?0:this.fixedTabHeight+1;
}else{
var tempHeight=0;
var gc=new $wt.graphics.GC(this);
if(this.items.length==0){
tempHeight=gc.textExtent("Default",9).y+2+2;
}else{
for(var i=0;i<this.items.length;i++){
tempHeight=Math.max(tempHeight,this.items[i].preferredHeight(gc));
}
}gc.dispose();
this.tabHeight=tempHeight;
}if(!force&&this.tabHeight==oldHeight)return false;
this.oldSize=null;
if(this.onBottom){
var d=this.tabHeight-12;
this.curve=[0,13+d,0,12+d,2,12+d,3,11+d,5,11+d,6,10+d,7,10+d,9,8+d,10,8+d,11,7+d,11+d,7,12+d,6,13+d,6,15+d,4,16+d,4,17+d,3,19+d,3,20+d,2,22+d,2,23+d,1];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
}else{
var d=this.tabHeight-12;
this.curve=[0,0,0,1,2,1,3,2,5,2,6,3,7,3,9,5,10,5,11,6,11+d,6+d,12+d,7+d,13+d,7+d,15+d,9+d,16+d,9+d,17+d,10+d,19+d,10+d,20+d,11+d,22+d,11+d,23+d,12+d];
this.curveWidth=26+d;
this.curveIndent=Math.floor(this.curveWidth/3);
}this.notifyListeners(11,new $wt.widgets.Event());
return true;
},"~B");
$_M(c$,"_getToolTip",
function(x,y){
if(this.showMin&&this.minRect.contains(x,y))return this.minimized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Minimize");
if(this.showMax&&this.maxRect.contains(x,y))return this.maximized?$WT.getMessage("SWT_Restore"):$WT.getMessage("SWT_Maximize");
if(this.showChevron&&this.chevronRect.contains(x,y))return $WT.getMessage("SWT_ShowList");
var item=this.getItem(new $wt.graphics.Point(x,y));
if(item==null)return null;
if(!item.showing)return null;
if((this.showClose||item.showClose)&&item.closeRect.contains(x,y)){
return $WT.getMessage("SWT_Close");
}return item.getToolTipText();
},"~N,~N");
$_M(c$,"updateToolTip",
function(x,y){
var tooltip=this._getToolTip(x,y);
if(tooltip==null)return false;
if(tooltip.equals(this.toolTipLabel.getText()))return true;
this.toolTipLabel.setText(tooltip);
var labelSize=this.toolTipLabel.computeSize(-1,-1,true);
labelSize.x+=2;
labelSize.y+=2;
this.toolTipLabel.setSize(labelSize);
this.toolTipShell.pack();
var area=this.toolTipShell.getClientArea();
this.toolTipLabel.setSize(area.width,area.height);
var cursorLocation=this.getDisplay().getCursorLocation();
var cursorHeight=21;
var size=this.toolTipShell.getSize();
var rect=this.getMonitor().getBounds();
var pt=new $wt.graphics.Point(cursorLocation.x,cursorLocation.y+cursorHeight+2);
pt.x=Math.max(pt.x,rect.x);
if(pt.x+size.x>rect.x+rect.width)pt.x=rect.x+rect.width-size.x;
if(pt.y+size.y>rect.y+rect.height){
pt.y=cursorLocation.y-2-size.y;
}this.toolTipShell.setLocation(pt);
return true;
},"~N,~N");
$_M(c$,"releaseHandle",
function(){
if(this.itemMore!=null){
BrowserNative.releaseHandle(this.itemMore);
this.itemMore=null;
}if(this.contentArea!=null){
BrowserNative.releaseHandle(this.contentArea);
this.contentArea=null;
}$_U(this,$wt.custom.CTabFolder,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(!item.isDisposed())item.releaseResources();
}
if(this.imageList!=null){
this.display.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.custom.CTabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.custom.CTabFolder,"removeControl",[control]);
var count=this.getItemCount();
for(var i=0;i<count;i++){
var item=this.items[i];
if(item.control==control)item.setControl(null);
}
},"$wt.widgets.Control");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_V(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(parent,css){
var el=d$.createElement("DIV");
if(css!=null){
el.className=css;
}if(parent!=null){
(parent).appendChild(el);
}return el;
},"Object,~S");
$_V(c$,"createHandle",
function(){
this.items=new Array(0);
var cssName="ctab-folder-default";
var roundTheCorners=false;
if((this.style&2048)!=0){
cssName+=" ctab-folder-border-default";
roundTheCorners=true;
}this.handle=this.createCSSElement(this.parent.handle,cssName);
cssName="tab-folder-no-tab";
this.buttonArea=this.createCSSElement(this.handle,"ctab-folder-button-area");
this.contentArea=this.createCSSElement(this.handle,"ctab-folder-content-area");
this.itemMore=this.createCSSElement(this.buttonArea,"ctab-item-more");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
this.itemMore.style.bottom="6px";
}var clientArea=this.parent.getClientArea();
if(clientArea.height<=0||clientArea.width<=0){
System.out.println("client area has troubl xxxxxxxxxxxxx e");
}else{
}this.state&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.custom.CTabFolder,"createWidget",[]);
});
$_V(c$,"minimumSize",
function(wHint,hHint,flushCache){
var children=this._getChildren();
var width=0;
var height=0;
for(var i=0;i<children.length;i++){
var child=children[i];
var index=0;
var count=this.getItemCount();
while(index<count){
if(this.items[index].control==child)break;
index++;
}
if(index==count){
var rect=child.getBounds();
width=Math.max(width,rect.x+rect.width);
height=Math.max(height,rect.y+rect.height);
}else{
var size=child.computeSize(wHint,hHint,flushCache);
width=Math.max(width,size.x);
height=Math.max(height,size.y);
}}
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(key){
var selection=this.getSelectionIndex();
for(var i=0;i<this.items.length;i++){
if(i!=selection){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(i,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
var ch=this.findMnemonic(item.getText());
if((Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(ch)).charCodeAt(0)){
return true;
}}}
return false;
},"~N");
$_V(c$,"traversePage",
function(next){
var count=this.getItemCount();
if(count<=1)return false;
var index=this.getSelectionIndex();
if(index==-1){
index=0;
}else{
var offset=(next)?1:-1;
index=(index+offset+count)%count;
}this.setSelection(index,true);
return index==this.getSelectionIndex();
},"~B");
c$.borderInsideRGB=c$.prototype.borderInsideRGB=new $wt.graphics.RGB(132,130,132);
c$.borderMiddleRGB=c$.prototype.borderMiddleRGB=new $wt.graphics.RGB(143,141,138);
c$.borderOutsideRGB=c$.prototype.borderOutsideRGB=new $wt.graphics.RGB(171,168,165);
$_S(c$,
"borderColor",null,
"$DEFAULT_WIDTH",64,
"$DEFAULT_HEIGHT",64,
"BUTTON_SIZE",18,
"TOP_LEFT_CORNER",[0,6,1,5,1,4,4,1,5,1,6,0],
"TOP_RIGHT_CORNER",[-6,0,-5,1,-4,1,-1,4,-1,5,0,6],
"BOTTOM_LEFT_CORNER",[0,-6,1,-5,1,-4,4,-1,5,-1,6,0],
"BOTTOM_RIGHT_CORNER",[-6,0,-5,-1,-4,-1,-1,-4,-1,-5,0,-6],
"SIMPLE_TOP_LEFT_CORNER",[0,2,1,1,2,0],
"SIMPLE_TOP_RIGHT_CORNER",[-2,0,-1,1,0,2],
"SIMPLE_BOTTOM_LEFT_CORNER",[0,-2,1,-1,2,0],
"SIMPLE_BOTTOM_RIGHT_CORNER",[-2,0,-1,-1,0,-2],
"SELECTION_FOREGROUND",24,
"SELECTION_BACKGROUND",25,
"BORDER1_COLOR",18,
"FOREGROUND",21,
"BACKGROUND",22,
"BUTTON_BORDER",17,
"BUTTON_FILL",25,
"NONE",0,
"NORMAL",1,
"HOT",2,
"SELECTED",3);
c$.CLOSE_FILL=c$.prototype.CLOSE_FILL=new $wt.graphics.RGB(252,160,160);
c$=$_C(function(){
this.lastFocusId=0;
this.items=null;
this.ignoreResize=false;
this.ignoreMouse=false;
this.imageList=null;
this.disabledImageList=null;
this.hotImageList=null;
$_Z(this,arguments);
},$wt.widgets,"ToolBar",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ToolBar,[parent,$wt.widgets.ToolBar.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8388608)==0)style|=524288;
if((style&512)!=0)style&=-65;
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if((this.style&512)!=0){
var count=this.items.length;
for(var i=0;i<count;i++){
var rect=this.items[i].getBounds();
height+=rect.height;
if((this.items[i].style&2)!=0){
width=Math.max(width,24);
}else{
width=Math.max(width,rect.width);
}}
}else{
var count=this.items.length;
for(var i=0;i<count;i++){
var rect=this.items[i].getBounds();
System.out.println(rect);
height=Math.max(height,rect.height);
width+=rect.width;
}
}if(width==0)width=24;
if(height==0)height=22;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
width=trim.width;
height=trim.height;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.ToolBar,"computeTrim",[x,y,width,height]);
trim.height+=2;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.ToolBar,"createHandle",[]);
this.state&=-3;
this.items=new Array(0);
this.lastFocusId=-1;
this.handle=d$.createElement("DIV");
if(this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}this.handle.className="tool-bar-default";
if((this.style&2048)!=0){
this.handle.className+=" tool-bar-border";
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=this.items.length;
this.items[item.id=id]=item;
item.handle=d$.createElement("DIV");
item.handle.className="tool-item-default";
this.handle.appendChild(item.handle);
if((this.style&512)!=0)this.setRowCount(count+1);
this.layoutItems();
},"$wt.widgets.ToolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.ToolBar,"createWidget",[]);
this.items=new Array(0);
this.lastFocusId=-1;
});
$_M(c$,"destroyItem",
function(item){
this.layoutItems();
},"$wt.widgets.ToolItem");
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.ToolBar,"enableWidget",[enabled]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
if((item.style&(48))!=0){
item.updateImages(enabled&&item.getEnabled());
}}}
},"~B");
$_M(c$,"getDisabledImageList",
function(){
return this.disabledImageList;
});
$_M(c$,"getHotImageList",
function(){
return this.hotImageList;
});
$_M(c$,"getImageList",
function(){
return this.imageList;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
var items=this.getItems();
for(var i=0;i<items.length;i++){
var rect=items[i].getBounds();
if(rect.contains(point))return items[i];
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
return this.items;
});
$_M(c$,"getRowCount",
function(){
return 1;
});
$_M(c$,"indexOf",
function(item){
return 0;
},"$wt.widgets.ToolItem");
$_M(c$,"layoutItems",
function(){
if((this.style&64)!=0){
try{
this.handle.style.whiteSpace="wrap";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}if((this.style&512)!=0){
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null)item.resizeControl();
}
});
$_V(c$,"mnemonicHit",
function(ch){
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(ch){
return false;
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseImages();
item.releaseResources();
}}
this.items=null;
this.imageList=this.hotImageList=this.disabledImageList=null;
$_U(this,$wt.widgets.ToolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.ToolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control==control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
if(this.parent.lpwp!=null){
}$_U(this,$wt.widgets.ToolBar,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setDefaultFont",
function(){
$_U(this,$wt.widgets.ToolBar,"setDefaultFont",[]);
});
$_M(c$,"setDisabledImageList",
function(imageList){
if(this.disabledImageList==imageList)return;
var hImageList=0;
if((this.disabledImageList=imageList)!=null){
hImageList=this.disabledImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.ToolBar,"setFont",[font]);
var index=0;
var mask=60;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&mask)!=0)break;
index++;
}
if(index==this.items.length){
}this.layoutItems();
},"$wt.graphics.Font");
$_M(c$,"setHotImageList",
function(imageList){
if(this.hotImageList==imageList)return;
var hImageList=0;
if((this.hotImageList=imageList)!=null){
hImageList=this.hotImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setImageList",
function(imageList){
if(this.imageList==imageList)return;
var hImageList=0;
if((this.imageList=imageList)!=null){
hImageList=imageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setParent",
function(parent){
if(!$_U(this,$wt.widgets.ToolBar,"setParent",[parent]))return false;
return true;
},"$wt.widgets.Composite");
$_M(c$,"setRowCount",
function(count){
},"~N");
$_M(c$,"setTabItemFocus",
function(){
var index=0;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&2)==0){
if(item.getEnabled())break;
}index++;
}
if(index==this.items.length)return false;
return $_U(this,$wt.widgets.ToolBar,"setTabItemFocus",[]);
});
$_S(c$,
"$DEFAULT_WIDTH",24,
"$DEFAULT_HEIGHT",22);
c$=$_C(function(){
this.parent=null;
this.control=null;
this.toolTipText=null;
this.disabledImage=null;
this.hotImage=null;
this.disabledImage2=null;
this.id=0;
$_Z(this,arguments);
},$wt.widgets,"ToolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.ToolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.ToolItem,[parent,$wt.widgets.ToolItem.checkStyle(style)]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.ToolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,32,16,2,4,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"click",
function(dropDown){
},"~B");
$_M(c$,"createDisabledImage",
function(image,color){
return new $wt.graphics.Image(this.display,image,1);
},"$wt.graphics.Image,$wt.graphics.Color");
$_M(c$,"getBounds",
function(){
var x=0;
var y=0;
var left=this.handle.style.left;
if(left!=null&&left.length!=0){
x=Integer.parseInt(left);
}var top=this.handle.style.top;
if(top!=null&&top.length!=0){
y=Integer.parseInt(top);
}var w=64;
var h=64;
var width=this.handle.style.width;
if(width!=null&&width.length!=0){
w=Integer.parseInt(width);
}else if(this.text!=null&&this.text.length!=0){
w=$wt.internal.browser.OS.getStringPlainWidth(this.text);
}var height=this.handle.style.height;
if(height!=null&&height.length!=0){
h=Integer.parseInt(height);
}else if(this.text!=null&&this.text.length!=0){
h=$wt.internal.browser.OS.getStringPlainHeight(this.text);
}return new $wt.graphics.Rectangle(x,y,w+6,h+6);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getDisabledImage",
function(){
return this.disabledImage;
});
$_M(c$,"getEnabled",
function(){
if((this.style&2)!=0){
return(this.state&8)==0;
}return true;
});
$_M(c$,"getHotImage",
function(){
return this.hotImage;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if((this.style&(48))==0)return false;
return true;
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getWidth",
function(){
return 24;
});
$_M(c$,"isEnabled",
function(){
return this.getEnabled()&&this.parent.isEnabled();
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.ToolItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.ToolItem,"releaseWidget",[]);
this.parent=null;
this.control=null;
this.toolTipText=null;
this.disabledImage=this.hotImage=null;
if(this.disabledImage2!=null)this.disabledImage2.dispose();
this.disabledImage2=null;
});
$_M(c$,"releaseImages",
function(){
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"resizeControl",
function(){
if(this.control!=null&&!this.control.isDisposed()){
var itemRect=this.getBounds();
this.control.setSize(itemRect.width,itemRect.height);
var rect=this.control.getBounds();
rect.x=itemRect.x+Math.floor((itemRect.width-rect.width)/2);
rect.y=itemRect.y+Math.floor((itemRect.height-rect.height)/2);
this.control.setLocation(rect.x,rect.y);
}});
$_M(c$,"selectRadio",
function(){
var index=0;
var items=this.parent.getItems();
while(index<items.length&&items[index]!=this)index++;

var i=index-1;
while(i>=0&&items[i].setRadioSelection(false))--i;

var j=index+1;
while(j<items.length&&items[j].setRadioSelection(false))j++;

this.setSelection(true);
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}if((this.style&2)==0)return;
this.control=control;
if((this.parent.style&(576))!=0){
}this.resizeControl();
},"$wt.widgets.Control");
$_M(c$,"setEnabled",
function(enabled){
if(this.image!=null)this.updateImages(enabled&&this.parent.getEnabled());
},"~B");
$_M(c$,"setDisabledImage",
function(image){
if((this.style&2)!=0)return;
this.disabledImage=image;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setHotImage",
function(image){
if((this.style&2)!=0)return;
this.hotImage=image;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setImage",
function(image){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setImage",[image]);
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSelection",
function(selected){
if((this.style&(48))==0)return;
if((this.style&(48))!=0){
if(!this.getEnabled()||!this.parent.getEnabled()){
this.updateImages(false);
}}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setText",[string]);
if(this.handle!=null){
this.handle.appendChild(d$.createTextNode(string));
}this.parent.layoutItems();
},"~S");
$_M(c$,"setToolTipText",
function(string){
this.toolTipText=string;
},"~S");
$_M(c$,"setWidth",
function(width){
if((this.style&2)==0)return;
if(width<0)return;
this.parent.layoutItems();
},"~N");
$_M(c$,"updateImages",
function(enabled){
this.parent.layoutItems();
},"~B");
c$=$_C(function(){
this.items=null;
this.itemHandles=null;
this.originalItems=null;
this.locked=false;
this.ignoreResize=false;
$_Z(this,arguments);
},$wt.widgets,"CoolBar",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.CoolBar,[parent,$wt.widgets.CoolBar.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style|=524288;
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var border=this.getBorderWidth();
var newWidth=wHint==-1?0x3FFF:wHint+(border*2);
var newHeight=hHint==-1?0x3FFF:hHint+(border*2);
if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
height+=border*2;
width+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.CoolBar,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
if(this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}this.handle.className="cool-bar-default";
if((this.style&2048)!=0){
this.handle.className+=" cool-bar-border";
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=this.items.length;
this.items[item.id=id]=item;
this.itemHandles[id]=d$.createElement("DIV");
var handle=this.itemHandles[id];
handle.className="cool-item-default";
if(index==count){
handle.appendChild(handle);
}else{
handle.insertBefore(handle,this.itemHandles[index]);
}},"$wt.widgets.CoolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.CoolBar,"createWidget",[]);
this.items=new Array(4);
this.originalItems=new Array(0);
this.items=new Array(0);
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.CoolItem");
$_M(c$,"getMargin",
function(index){
var margin=0;
if((this.style&8388608)!=0){
margin+=12;
}else{
margin+=16;
}return margin;
},"~N");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemOrder",
function(){
return $_A(0,0);
});
$_M(c$,"getItems",
function(){
return this.items;
});
$_M(c$,"getItemSizes",
function(){
return null;
});
$_M(c$,"getLastIndexOfRow",
function(index){
return 0;
},"~N");
$_M(c$,"isLastItemOfRow",
function(index){
return false;
},"~N");
$_M(c$,"getLocked",
function(){
return this.locked;
});
$_M(c$,"getWrapIndices",
function(){
var items=this.getItems();
var indices=$_A(items.length,0);
var count=0;
for(var i=0;i<items.length;i++){
if(items[i].getWrap())indices[count++]=i;
}
var result=$_A(count,0);
System.arraycopy(indices,0,result,0,count);
return result;
});
$_M(c$,"indexOf",
function(item){
for(var i=0;i<this.items.length;i++){
if(item==this.items[i]){
return i;
}}
return-1;
},"$wt.widgets.CoolItem");
$_M(c$,"resizeToPreferredWidth",
function(index){
},"~N");
$_M(c$,"resizeToMaximumWidth",
function(index){
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
$_U(this,$wt.widgets.CoolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.CoolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control==control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBackgroundPixel",
function(pixel){
if(this.background==pixel)return;
this.background=pixel;
},"~N");
$_M(c$,"setForegroundPixel",
function(pixel){
if(this.foreground==pixel)return;
this.foreground=pixel;
},"~N");
$_M(c$,"setItemColors",
function(foreColor,backColor){
},"~N,~N");
$_M(c$,"setItemLayout",
function(itemOrder,wrapIndices,sizes){
this.setRedraw(false);
this.setItemOrder(itemOrder);
this.setWrapIndices(wrapIndices);
this.setItemSizes(sizes);
this.setRedraw(true);
},"~A,~A,~A");
$_M(c$,"setItemOrder",
function(itemOrder){
},"~A");
$_M(c$,"setItemSizes",
function(sizes){
},"~A");
$_M(c$,"setLocked",
function(locked){
this.locked=locked;
},"~B");
$_M(c$,"setWrapIndices",
function(indices){
if(indices==null)indices=$_A(0,0);
var count=this.getItemCount();
for(var i=0;i<indices.length;i++){
}
this.setRedraw(false);
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(item.getWrap()){
this.resizeToPreferredWidth(i-1);
item.setWrap(false);
}}
this.resizeToMaximumWidth(count-1);
for(var i=0;i<indices.length;i++){
var index=indices[i];
if(0<=index&&index<items.length){
var item=items[index];
item.setWrap(true);
this.resizeToMaximumWidth(index-1);
}}
this.setRedraw(true);
},"~A");
$_S(c$,
"SEPARATOR_WIDTH",2,
"MAX_WIDTH",0x7FFF);
c$=$_C(function(){
this.parent=null;
this.control=null;
this.id=0;
this.ideal=false;
this.minimum=false;
$_Z(this,arguments);
},$wt.widgets,"CoolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.CoolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.CoolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
var width=wHint;
var height=hHint;
if(wHint==-1)width=32;
if(hHint==-1)height=32;
width+=this.parent.getMargin(index);
return new $wt.graphics.Point(width,height);
},"~N,~N");
$_M(c$,"getBounds",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClientArea",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}var index=this.parent.indexOf(this);
if(index==-1)return;
if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=newControl;
},"$wt.widgets.Control");
$_M(c$,"getPreferredSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setPreferredSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.ideal=true;
var handle=this.parent.itemHandles[this.parent.indexOf(this)];
handle.style.width=width+"px";
handle.style.height=height+"px";
},"~N,~N");
$_M(c$,"setPreferredSize",
function(size){
this.setPreferredSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.CoolItem,"setText",[string]);
var handle=this.parent.itemHandles[this.parent.indexOf(this)];
if(handle!=null){
handle.appendChild(d$.createTextNode(string));
}},"~S");
$_M(c$,"getSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getMinimumSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(32,16);
});
$_M(c$,"setMinimumSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.minimum=true;
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getWrap",
function(){
var index=this.parent.indexOf(this);
return false;
});
$_M(c$,"setWrap",
function(wrap){
var index=this.parent.indexOf(this);
},"~B");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
c$=$_C(function(){
this.parent=null;
this.x=0;
this.y=0;
this.width=0;
this.height=0;
this.moved=false;
this.resized=false;
this.$isVisible=false;
this.image=null;
this.font=null;
$_Z(this,arguments);
},$wt.widgets,"Caret",$wt.widgets.Widget);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Caret,[parent,style]);
this.parent=parent;
this.createWidget();
},"$wt.widgets.Canvas,~N");
$_M(c$,"createWidget",
function(){
this.$isVisible=true;
if(this.parent.getCaret()==null){
this.parent.setCaret(this);
}});
$_M(c$,"getBounds",
function(){
if(this.image!=null){
var rect=this.image.getBounds();
return new $wt.graphics.Rectangle(this.x,this.y,rect.width,rect.height);
}return new $wt.graphics.Rectangle(this.x,this.y,this.width,this.height);
});
$_M(c$,"getFont",
function(){
if(this.font==null){
}return this.font;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_M(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.x,this.y);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSize",
function(){
if(this.image!=null){
var rect=this.image.getBounds();
return new $wt.graphics.Point(rect.width,rect.height);
}return new $wt.graphics.Point(this.width,this.height);
});
$_M(c$,"getVisible",
function(){
return this.$isVisible;
});
$_M(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"isFocusCaret",
function(){
return this.parent.caret==this&&this.hasFocus();
});
$_M(c$,"isVisible",
function(){
return this.$isVisible&&this.parent.isVisible()&&this.hasFocus();
});
$_M(c$,"killFocus",
function(){
});
$_M(c$,"move",
function(){
this.moved=false;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Caret,"releaseChild",[]);
if(this==this.parent.getCaret())this.parent.setCaret(null);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Caret,"releaseWidget",[]);
this.parent=null;
this.image=null;
this.font=null;
});
$_M(c$,"resize",
function(){
this.resized=false;
this.move();
});
$_M(c$,"setBounds",
function(x,y,width,height){
var samePosition=this.x==x&&this.y==y;
var sameExtent=this.width==width&&this.height==height;
if(samePosition&&sameExtent)return;
this.x=x;
this.y=y;
this.width=width;
this.height=height;
if(sameExtent){
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
}else{
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
}},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(rect){
this.setBounds(rect.x,rect.y,rect.width,rect.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setFocus",
function(){
});
$_M(c$,"setFont",
function(font){
this.font=font;
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(image){
this.image=image;
if(this.$isVisible&&this.hasFocus())this.resize();
},"$wt.graphics.Image");
$_M(c$,"setLocation",
function(x,y){
if(this.x==x&&this.y==y)return;
this.x=x;
this.y=y;
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setSize",
function(width,height){
if(this.width==width&&this.height==height)return;
this.width=width;
this.height=height;
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(visible){
if(visible==this.$isVisible)return;
this.$isVisible=visible;
},"~B");
c$=$_C(function(){
this.hwndText=null;
this.hwndUpDown=null;
this.ignoreModify=false;
this.pageIncrement=0;
this.digits=0;
this.minimum=0;
this.maximum=0;
this.increment=0;
this.textHandle=null;
this.updownHandle=null;
this.textInputHandle=null;
this.downBtnHandle=null;
this.upBtnHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Spinner",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Spinner,[parent,$wt.widgets.Spinner.checkStyle(style)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return style&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Spinner,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
this.handle.className="spinner-default";
if(this.parent!=null&&this.parent.handle!=null){
this.parent.handle.appendChild(this.handle);
}if((this.style&2048)!=0){
this.handle.className+=" spinner-border";
}this.updownHandle=d$.createElement("DIV");
this.handle.appendChild(this.updownHandle);
this.updownHandle.className="spinner-up-down-default";
this.upBtnHandle=d$.createElement("BUTTON");
this.updownHandle.appendChild(this.upBtnHandle);
this.upBtnHandle.className="spinner-up-button-default";
this.upBtnHandle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Spinner$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Spinner$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()+this.b$["$wt.widgets.Spinner"].increment,true);
});
c$=$_P();
}
return $_N($wt.widgets.Spinner$1,i$,v$);
})(this,null));
this.downBtnHandle=d$.createElement("BUTTON");
this.updownHandle.appendChild(this.downBtnHandle);
this.downBtnHandle.className="spinner-down-button-default";
this.downBtnHandle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Spinner$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Spinner$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()-this.b$["$wt.widgets.Spinner"].increment,true);
});
c$=$_P();
}
return $_N($wt.widgets.Spinner$2,i$,v$);
})(this,null));
this.textHandle=d$.createElement("DIV");
this.handle.appendChild(this.textHandle);
this.textHandle.className="spinner-text-default";
this.textInputHandle=d$.createElement("INPUT");
this.textInputHandle.className="spinner-text-field-default";
this.textHandle.appendChild(this.textInputHandle);
this.textInputHandle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Spinner$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Spinner$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
});
c$=$_P();
}
return $_N($wt.widgets.Spinner$3,i$,v$);
})(this,null));
});
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(wHint==-1||hHint==-1){
var string=null;
if(this.digits>0){
var leading=Math.floor(this.maximum/parseInt(Math.pow(10,this.digits)));
var buffer=""+leading;
buffer+=this.getDecimalSeparator();
var count=this.digits-buffer.length+1;
while(count>=0){
buffer+="0";
count--;
}
string=buffer;
System.out.println(buffer);
}else{
string=""+this.maximum;
}var size=$wt.internal.browser.OS.getStringPlainSize(string);
width=size.x;
height=size.y;
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
System.err.println(trim);
return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var margins=4;
x-=margins&0xFFFF;
width+=(margins&0xFFFF)+((margins>>16)&0xFFFF);
if((this.style&2048)!=0){
x-=1;
y-=1;
width+=2;
height+=2;
}width+=2;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Spinner,"enableWidget",[enabled]);
},"~B");
$_M(c$,"deregister",
function(){
$_U(this,$wt.widgets.Spinner,"deregister",[]);
this.display.removeControl(this.hwndText);
this.display.removeControl(this.hwndUpDown);
});
$_V(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"getDigits",
function(){
return this.digits;
});
$_M(c$,"getDecimalSeparator",
function(){
return".";
});
$_M(c$,"getIncrement",
function(){
return this.increment;
});
$_M(c$,"getMaximum",
function(){
return this.maximum;
});
$_M(c$,"getMinimum",
function(){
return this.minimum;
});
$_M(c$,"getPageIncrement",
function(){
return this.pageIncrement;
});
$_M(c$,"getSelection",
function(){
return Integer.parseInt(this.textInputHandle.value);
});
$_M(c$,"getSelectionText",
function(){
return 0;
});
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"register",
function(){
$_U(this,$wt.widgets.Spinner,"register",[]);
this.display.addControl(this.hwndText,this);
this.display.addControl(this.hwndUpDown,this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Spinner,"releaseHandle",[]);
this.hwndText=this.hwndUpDown=null;
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"setDigits",
function(value){
if(value==this.digits)return;
this.digits=value;
},"~N");
$_M(c$,"setIncrement",
function(value){
if(value<1)return;
this.increment=value;
},"~N");
$_M(c$,"setMaximum",
function(value){
if(value<0)return;
this.maximum=value;
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
this.minimum=value;
},"~N");
$_M(c$,"setPageIncrement",
function(value){
if(value<1)return;
this.pageIncrement=value;
},"~N");
$_M(c$,"setSelection",
function(value){
var max=$_A(1,0);
var min=$_A(1,0);
value=Math.min(Math.max(min[0],value),max[0]);
this.setSelection(value,false);
},"~N");
$_M(c$,"setSelection",
function(value,notify){
var string=String.valueOf(value);
if(this.digits>0){
var decimalSeparator=this.getDecimalSeparator();
var index=string.length-this.digits;
var buffer=new StringBuffer();
if(index>0){
buffer.append(string.substring(0,index));
buffer.append(decimalSeparator);
buffer.append(string.substring(index));
}else{
buffer.append("0");
buffer.append(decimalSeparator);
while(index++<0)buffer.append("0");

buffer.append(string);
}string=buffer.toString();
}if(this.hooks(25)||this.filters(25)){
var length=this.textInputHandle.value.length;
string=this.verifyText(string,0,length,null);
if(string==null)return;
}if(this.textInputHandle!=null){
this.textInputHandle.value=""+value;
}if(notify)this.sendEvent(13);
},"~N,~B");
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}var index=0;
if(this.digits>0){
var decimalSeparator=this.getDecimalSeparator();
index=string.indexOf(decimalSeparator);
if(index!=-1){
string=string.substring(0,index)+string.substring(index+1);
}index=0;
}while(index<string.length){
if(!Character.isDigit(string.charAt(index)))break;
index++;
}
event.doit=index==string.length;
this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_M(c$,"setSize",
function(width,height){
$_U(this,$wt.widgets.Spinner,"setSize",[width,height]);
this.textInputHandle.style.width=(width-28)+"px";
this.textInputHandle.style.height=((height-2)>24?20:height-2)+"px";
},"~N,~N");
c$=$_C(function(){
this.style=0;
this.parent=null;
this.title=null;
$_Z(this,arguments);
},$wt.widgets,"Dialog");
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.checkParent(parent);
this.parent=parent;
this.style=style;
this.title="";
},"$wt.widgets.Shell,~N");
$_M(c$,"checkSubclass",
function(){
if(!$wt.widgets.Display.isValidClass(this.getClass())){
this.error(43);
}});
$_M(c$,"checkParent",
function(parent){
if(parent==null)this.error(4);
},"$wt.widgets.Shell");
$_M(c$,"error",
function(code){
$WT.error(code);
},"~N");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"getText",
function(){
return this.title;
});
$_M(c$,"setText",
function(string){
if(string==null)this.error(4);
this.title=string;
},"~S");
$_M(c$,"dialogUnimplemented",
function(){
var dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|2048);
dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.Dialog$1,i$,v$);
})(this,null));
dialogShell.setText(this.title);
dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var icon=new $wt.widgets.Label(dialogShell,0);
icon.setImage(new $wt.graphics.Image(dialogShell.display,"j2slib/images/warning.png"));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
var label=new $wt.widgets.Label(dialogShell,0);
label.setText("Not implemented yet.");
var buttonPanel=new $wt.widgets.Composite(dialogShell,0);
var gd=new $wt.layout.GridData(3,2,false,false);
gd.horizontalSpan=2;
buttonPanel.setLayoutData(gd);
buttonPanel.setLayout(new $wt.layout.GridLayout());
var btn=new $wt.widgets.Button(buttonPanel,8);
btn.setText("&OK");
btn.setLayoutData(new $wt.layout.GridData(75,24));
btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Dialog$2,i$,v$);
})(this,$_F("dialogShell",dialogShell)));
dialogShell.pack();
dialogShell.open();
var size=dialogShell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}dialogShell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(dialogShell,16777216);
});
c$=$_C(function(){
this.message="";
this.buttonPanel=null;
this.dialogShell=null;
this.btn=null;
this.returnCode=0;
$_Z(this,arguments);
},$wt.widgets,"MessageBox",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,65570);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.MessageBox,[parent,$wt.widgets.MessageBox.checkStyle(style)]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&(229376))==0)style|=65536;
var mask=(4064);
var bits=style&mask;
if(bits==32||bits==256||bits==(288))return style;
if(bits==64||bits==128||bits==(192)||bits==(448))return style;
if(bits==(1280)||bits==(3584))return style;
style=(style&~mask)|32;
return style;
},"~N");
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.returnCode=-1;
this.dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|2048);
this.dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.widgets.MessageBox"].updateReturnCode();
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$1,i$,v$);
})(this,null));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var iconName=null;
if((this.style&1)!=0){
iconName="error";
}else if((this.style&2)!=0){
iconName="information";
}else if((this.style&4)!=0){
iconName="question";
}else if((this.style&8)!=0){
iconName="warning";
}else if((this.style&16)!=0){
iconName="information";
}if(iconName!=null){
var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout());
var gd=new $wt.layout.GridData(48,48);
composite.setLayoutData(gd);
var icon=new $wt.widgets.Label(composite,0);
icon.setImage(new $wt.graphics.Image(this.dialogShell.display,"j2slib/images/"+iconName+".png"));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
}var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout(2,false));
var gd=new $wt.layout.GridData(1812);
if(iconName==null){
gd.horizontalSpan=2;
}gd.grabExcessVerticalSpace=true;
gd.heightHint=48;
var labelGD=new $wt.layout.GridData(4);
var wHint=$wt.internal.browser.OS.getStringPlainWidth(this.message);
if(wHint>480){
labelGD.widthHint=480;
var hHint=$wt.internal.browser.OS.getStringPlainWrappedHeight(this.message,labelGD.widthHint);
if(hHint>48){
gd.heightHint=hHint;
}}else if(wHint<64){
labelGD.widthHint=64;
}else{
labelGD.widthHint=wHint;
}composite.setLayoutData(gd);
var messageLabel=new $wt.widgets.Label(composite,64);
messageLabel.setText(this.message);
messageLabel.setLayoutData(labelGD);
var gd2=new $wt.layout.GridData();
gd2.grabExcessVerticalSpace=true;
new $wt.widgets.Label(composite,0).setLayoutData(gd2);
this.buttonPanel=new $wt.widgets.Composite(this.dialogShell,0);
var count=0;
count+=this.createButton(64,"&Yes")==null?0:1;
count+=this.createButton(128,"&No")==null?0:1;
count+=this.createButton(1024,"&Retry")==null?0:1;
count+=this.createButton(512,"&Abort")==null?0:1;
count+=this.createButton(2048,"&Ignore")==null?0:1;
count+=this.createButton(32,"&OK")==null?0:1;
count+=this.createButton(256,"&Cancel")==null?0:1;
if(count==0){
this.createButton(32,"&OK",true);
count=1;
}var gridData=new $wt.layout.GridData(2,2,false,false);
gridData.horizontalSpan=2;
this.buttonPanel.setLayoutData(gridData);
this.buttonPanel.setLayout(new $wt.layout.GridLayout(count,true));
this.dialogShell.pack();
this.dialogShell.open();
var size=this.dialogShell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
return 256;
});
$_M(c$,"createButton",
function(btnStyle,btnLabel){
return this.createButton(btnStyle,btnLabel,false);
},"~N,~S");
$_M(c$,"createButton",
function(btnStyle,btnLabel,forced){
if((this.style&btnStyle)!=0||forced){
this.btn=new $wt.widgets.Button(this.buttonPanel,8);
this.btn.setText(btnLabel);
var gridData=new $wt.layout.GridData(75,24);
this.btn.setLayoutData(gridData);
this.btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.MessageBox"].returnCode=this.f$.btnStyle;
this.b$["$wt.widgets.MessageBox"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$2,i$,v$);
})(this,$_F("btnStyle",btnStyle)));
return this.btn;
}else{
return null;
}},"~N,~S,~B");
$_M(c$,"setMessage",
function(string){
if(string==null)this.error(4);
this.message=string;
},"~S");
$_M(c$,"updateReturnCode",
($fz=function(){
if(this.returnCode==-1){
this.returnCode=256;
if((this.style&32)==32)this.returnCode=32;
if((this.style&(288))==(288))this.returnCode=256;
if((this.style&(192))==(192))this.returnCode=128;
if((this.style&(448))==(448))this.returnCode=256;
if((this.style&(1280))==(1280))this.returnCode=256;
if((this.style&(3584))==(3584))this.returnCode=2048;
}},$fz.isPrivate=true,$fz));
c$=$_C(function(){
this.rgb=null;
$_Z(this,arguments);
},$wt.widgets,"ColorDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ColorDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.rgb;
});
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
c$=$_C(function(){
this.message="";
this.filterPath="";
this.directoryPath=null;
$_Z(this,arguments);
},$wt.widgets,"DirectoryDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.DirectoryDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getFilterPath",
function(){
return this.filterPath;
});
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.directoryPath;
});
$_M(c$,"setFilterPath",
function(string){
this.filterPath=string;
},"~S");
$_M(c$,"setMessage",
function(string){
if(string==null)this.error(4);
this.message=string;
},"~S");
c$=$_C(function(){
this.filterNames=null;
this.filterExtensions=null;
this.fileNames=null;
this.filterPath="";
this.fileName="";
$_Z(this,arguments);
},$wt.widgets,"FileDialog",$wt.widgets.Dialog);
$_Y(c$,function(){
this.filterNames=new Array(0);
this.filterExtensions=new Array(0);
this.fileNames=new Array(0);
});
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.FileDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getFileName",
function(){
return this.fileName;
});
$_M(c$,"getFileNames",
function(){
return this.fileNames;
});
$_M(c$,"getFilterExtensions",
function(){
return this.filterExtensions;
});
$_M(c$,"getFilterNames",
function(){
return this.filterNames;
});
$_M(c$,"getFilterPath",
function(){
return this.filterPath;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return null;
});
$_M(c$,"setFileName",
function(string){
this.fileName=string;
},"~S");
$_M(c$,"setFilterExtensions",
function(extensions){
this.filterExtensions=extensions;
},"~A");
$_M(c$,"setFilterNames",
function(names){
this.filterNames=names;
},"~A");
$_M(c$,"setFilterPath",
function(string){
this.filterPath=string;
},"~S");
$_S(c$,
"FILTER","*.*",
"BUFFER_SIZE",32768);
c$=$_C(function(){
this.fontData=null;
this.rgb=null;
$_Z(this,arguments);
},$wt.widgets,"FontDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.FontDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getFontData",
function(){
return this.fontData;
});
$_M(c$,"getFontList",
function(){
if(this.fontData==null)return null;
var result=new Array(1);
result[0]=this.fontData;
return result;
});
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.fontData;
});
$_M(c$,"setFontData",
function(fontData){
this.fontData=fontData;
},"$wt.graphics.FontData");
$_M(c$,"setFontList",
function(fontData){
if(fontData!=null&&fontData.length>0){
this.fontData=fontData[0];
}else{
this.fontData=null;
}},"~A");
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
$_J("org.eclipse.swt.program");
c$=$_C(function(){
this.name=null;
this.command=null;
this.iconName=null;
$_Z(this,arguments);
},$wt.program,"Program");
$_K(c$,
function(){
});
c$.findProgram=$_M(c$,"findProgram",
function(extension){
if(extension.length==0)return null;
if((extension.charAt(0)).charCodeAt(0)!=('.').charCodeAt(0))extension="."+extension;
extension=extension.toLowerCase();
var program=new $wt.program.Program();
if(".js".equalsIgnoreCase(extension)){
program.name="Java2Script Pacemaker";
program.command="$wt.program.Program.loadJavaScript(\"%1\")";
program.iconName="images/z-logo.gif";
}else{
program.name="Embeded Browser";
program.command="window.open(\"%1\")";
program.iconName="images/browser.gif";
}return program;
},"~S");
c$.getExtensions=$_M(c$,"getExtensions",
function(){
return[".js",".html",".htm",".xhtml","xml",".png",".gif",".jpg",".jpeg"];
});
c$.getPrograms=$_M(c$,"getPrograms",
function(){
var j2s=new $wt.program.Program();
j2s.name="Java2Script Pacemaker";
j2s.command="$wt.program.Program.loadJavaScript(\"%1\")";
j2s.iconName="images/z-logo.gif";
var browser=new $wt.program.Program();
browser.name="Embeded Browser";
browser.command="window.open(\"%1\")";
browser.iconName="images/browser.gif";
return[j2s,browser];
});
c$.loadJavaScript=$_M(c$,"loadJavaScript",
function(url){
var script=document.createElement("SCRIPT");
script.src=url;
document.body.appendChild(script);
},"~S");
c$.launch=$_M(c$,"launch",
function(fileName){
if(fileName.endsWith(".js")){
$wt.program.Program.findProgram(".js").execute(fileName);
}else{
$wt.program.Program.findProgram(fileName).execute(fileName);
}return true;
},"~S");
$_M(c$,"execute",
function(fileName){
var quote=true;
var prefix=this.command;
var suffix="";
var index=this.command.indexOf("%1");
if(index!=-1){
var count=0;
var i=index+2;
var length=this.command.length;
while(i<length){
if((this.command.charAt(i)).charCodeAt(0)==('"').charCodeAt(0))count++;
i++;
}
quote=count%2==0;
prefix=this.command.substring(0,index);
suffix=this.command.substring(index+2,length);
}if(!fileName.startsWith("/")&&!fileName.startsWith("\\")&&(fileName.charAt(1)).charCodeAt(0)==(':').charCodeAt(0)){
fileName="file:///"+fileName;
}if(quote)fileName="\"" + fileName + "\"";
try{
eval((prefix+fileName+suffix).replace(/\\/g,"\\\\"));
}catch(e){
if($_O(e,Error)){
return false;
}else{
throw e;
}
}
return true;
},"~S");
$_M(c$,"getImageData",
function(){
return new $wt.graphics.ImageData(this.iconName);
});
$_M(c$,"getName",
function(){
return this.name;
});
$_V(c$,"equals",
function(other){
if(this==other)return true;
if($_O(other,$wt.program.Program)){
var program=other;
return this.name.equals(program.name)&&this.command.equals(program.command)&&this.iconName.equals(program.iconName);
}return false;
},"Object");
$_V(c$,"hashCode",
function(){
return this.name.hashCode()^this.command.hashCode()^this.iconName.hashCode();
});
$_V(c$,"toString",
function(){
return"Program {"+this.name+"}";
});
c$=$_C(function(){
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=false;
this.event=null;
this.type=0;
$_Z(this,arguments);
},$wt.internal.dnd,"HTMLEventWrapper");
$_K(c$,
function(event){
this.event=event;
this.wrapEvent(event);
},"Object");
$_M(c$,"wrapEvent",
function(event){
},"Object");
$_M(c$,"stopPropagation",
function(){
});
$_M(c$,"preventDefault",
function(){
});
$_I($wt.internal.dnd,"DragListener");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.dnd,"DragAdapter",null,$wt.internal.dnd.DragListener);
$_V(c$,"dragBegan",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"isDraggable",
function(e){
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
c$=$_C(function(){
this.event=null;
this.sourceElement=null;
this.startX=0;
this.startY=0;
this.currentX=0;
this.currentY=0;
$_Z(this,arguments);
},$wt.internal.dnd,"DragEvent");
$_K(c$,
function(evt,src,x,y){
this.event=evt;
this.sourceElement=src;
this.startX=x;
this.startY=y;
},"$wt.internal.dnd.HTMLEventWrapper,$wt.internal.xhtml.Element,~N,~N");
$_M(c$,"deltaX",
function(){
return this.currentX-this.startX;
});
$_M(c$,"deltaY",
function(){
return this.currentY-this.startY;
});
$_M(c$,"mouseMoveTo",
function(currentX,currentY){
this.currentX=currentX;
this.currentY=currentY;
},"~N,~N");
$_V(c$,"toString",
function(){
return"DragEvent {"+this.sourceElement+"#"+"("+this.startX+","+this.startY+")->"+"("+this.currentX+","+this.currentY+")}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.dnd,"DNDUtils");
c$.bindFunctionWith=$_M(c$,"bindFunctionWith",
function(aFun,obj){
return obj;
},"Object,Object");
c$.onselectstart=$_M(c$,"onselectstart",
function(e){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
evt.preventDefault();
evt.stopPropagation();
return false;
},"Object");
c$.onmousemove=$_M(c$,"onmousemove",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if(!evt.leftButtonHold){
if(oThis.status!=0){
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragEnded(dndEvt);
oThis.status=0;
}oThis.reset();
return false;
}var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
if(oThis.status==0){
oThis.status=1;
oThis.startX=evt.x;
oThis.startY=evt.y;
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragBegan(dndEvt);
}dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragging(dndEvt);
return true;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onmousedown=$_M(c$,"onmousedown",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if(!oThis.checkDraggable(evt)){
return true;
}d$.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
evt.target.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
d$.onmousemove=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousemove,oThis);
d$.onkeyup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onkeyup,oThis);
d$.onmouseup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmouseup,oThis);
evt.preventDefault();
evt.stopPropagation();
return false;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onkeyup=$_M(c$,"onkeyup",
function(e,oThis){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
if((evt.event).keyCode==27){
if(oThis.status!=0){
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragCanceled(dndEvt);
oThis.status=0;
}oThis.reset();
return false;
}return true;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onmouseup=$_M(c$,"onmouseup",
function(e,oThis){
if(oThis.status!=0){
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
var dndEvt=new $wt.internal.dnd.DragEvent(evt,oThis.element,oThis.startX,oThis.startY);
dndEvt.mouseMoveTo(evt.x,evt.y);
oThis.notifyDragEnded(dndEvt);
oThis.status=0;
}oThis.reset();
var evt=new $wt.internal.dnd.HTMLEventWrapper(e);
evt.preventDefault();
evt.stopPropagation();
return false;
},"Object,$wt.internal.dnd.DragAndDrop");
$_S(c$,
"$onselectstart",null,
"$onmousemove",null,
"$onmousedown",null,
"$onmouseup",null,
"$onkeyup",null);
c$=$_C(function(){
this.status=0;
this.element=null;
this.startX=0;
this.startY=0;
this.listeners=null;
$_Z(this,arguments);
},$wt.internal.dnd,"DragAndDrop");
$_Y(c$,function(){
this.listeners=new Array(0);
});
$_M(c$,"reset",
function(){
this.status=0;
d$.onmousemove=null;
d$.onmouseup=null;
d$.onselectstart=null;
d$.onkeyup=null;
if(this.element!=null){
this.element.onselectstart=null;
}});
$_M(c$,"bind",
function(el){
this.element=el;
el.onmousedown=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousedown,this);
},"$wt.internal.xhtml.Element");
$_M(c$,"checkDraggable",
function(e){
for(var i=0;i<this.listeners.length;i++){
if(!this.listeners[i].isDraggable(e)){
return false;
}}
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
$_M(c$,"notifyDragBegan",
function(e){
for(var i=0;i<this.listeners.length;i++){
if(!this.listeners[i].dragBegan(e)){
return false;
}}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragging",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragging(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragEnded",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragEnded(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragCanceled",
function(e){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i].dragCanceled(e);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"addDragListener",
function(listener){
for(var i=0;i<this.listeners.length;i++){
if(this.listeners[i]==listener){
return;
}}
this.listeners[this.listeners.length]=listener;
},"$wt.internal.dnd.DragListener");
$_M(c$,"removeDragListener",
function(listener){
for(var i=0;i<this.listeners.length;i++){
if(this.listeners[i]==listener){
for(var j=i+1;j<this.listeners.length;j++){
this.listeners[j-1]=this.listeners[j];
}
var oldListeners=this.listeners;
this.listeners=new Array(oldListeners.length-1);
for(var j=0;j<oldListeners.length-1;j++){
this.listeners[j]=oldListeners[j];
}
return listener;
}}
return null;
},"$wt.internal.dnd.DragListener");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.sourceWidth=0;
this.sourceHeight=0;
this.resize=null;
this.frame=null;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"ShellFrameDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"isDraggable",
function(e){
var cssName=e.target.className;
if(cssName!=null){
if(cssName.indexOf("shell")==0&&(cssName.indexOf("top")!=-1||cssName.indexOf("middle")!=-1||cssName.indexOf("bottom")!=-1)){
this.resize=cssName.substring(6);
return true;
}else if(cssName.indexOf("shell-title-text")!=-1){
return true;
}}return false;
},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"dragBegan",
function(e){
var firstTime=false;
if(this.frame==null){
this.frame=d$.createElement("DIV");
this.frame.className="shell-handle";
this.frame.style.backgroundColor="transparent";
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.zIndex=""+(Integer.parseInt(w$.currentTopZIndex)+100);
d$.body.appendChild(this.frame);
var existedTitleBar=false;
var els=e.sourceElement.getElementsByTagName("DIV");
for(var i=0;i<els.length;i++){
if(els[i].className.indexOf("shell-title-bar")!=-1){
existedTitleBar=true;
break;
}}
if(existedTitleBar){
var titleBar=d$.createElement("DIV");
titleBar.className="shell-title-bar opacity";
titleBar.style.paddingTop="4px";
this.frame.appendChild(titleBar);
}firstTime=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
this.sourceWidth=Integer.parseInt(e.sourceElement.style.width);
this.sourceHeight=Integer.parseInt(e.sourceElement.style.height);
e.startX=e.currentX;
e.startY=e.currentY;
if(firstTime){
this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
}var frames=d$.getElementsByTagName("IFRAME");
if(frames.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.resize!=null){
var xx=this.sourceX;
var yy=this.sourceY;
var ww=this.sourceWidth;
var hh=this.sourceHeight;
if(this.resize=="left-top"){
xx+=e.deltaX();
yy+=e.deltaY();
ww-=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize=="center-top"){
yy+=e.deltaY();
hh-=e.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize=="right-top"){
yy+=e.deltaY();
ww+=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize=="left-middle"){
xx+=e.deltaX();
ww-=e.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize=="right-middle"){
ww+=e.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize=="left-bottom"){
xx+=e.deltaX();
ww-=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize=="center-bottom"){
hh+=e.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize=="right-bottom"){
ww+=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="se-resize";
}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
this.frame.style.width=((ww>16)?ww:16)+"px";
this.frame.style.height=((hh>16)?hh:16)+"px";
return true;
}var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=d$.body.clientHeight;
var gWidth=d$.body.clientWidth;
var dWidth=Integer.parseInt(e.sourceElement.style.width);
if(xx<-dWidth){
xx=-dWidth;
}else if(xx>gWidth-2){
xx=gWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight+18){
yy=gHeight+18;
}if(!(e.event.event).ctrlKey){
if(Math.abs(xx-gWidth+dWidth)<10){
xx=gWidth-dWidth;
}else if(Math.abs(xx)<10){
xx=0;
}var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(Math.abs(yy-gHeight+dHeight+2)<10){
yy=gHeight-dHeight-2;
}else if(Math.abs(yy-(-1))<10){
yy=-1;
}}this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
if(d$.body.scrollLeft!=0){
d$.body.scrollLeft=0;
}if(d$.body.scrollTop!=0){
d$.body.scrollTop=0;
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
var x=Integer.parseInt(this.frame.style.left);
var y=Integer.parseInt(this.frame.style.top);
var width=Integer.parseInt(this.frame.style.width);
var height=Integer.parseInt(this.frame.style.height);
var shell=e.sourceElement;
shell.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
this.updateShellBounds(x,y,width,height);
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
($fz=function(){
this.frame.style.display="none";
d$.body.style.cursor="auto";
this.resize=null;
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"updateShellBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
c$.fixShellHeight=$_M(c$,"fixShellHeight",
function(shell){
var height=Integer.parseInt((shell).style.height);
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
if(div.className!=null){
if(div.className.indexOf("middle")!=-1){
if(height-40>=0){
div.style.height=(height-40)+"px";
}else{
div.style.height="0px";
}}else if(div.className.indexOf("shell-content")!=-1){
div.style.height=((height-30>=0)?height-30:0)+"px";
}}}
},"Object");
c$.fixShellWidth=$_M(c$,"fixShellWidth",
function(shell){
var needToFixedWidth=true;
var width=Integer.parseInt((shell).style.width)-6;
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
var cssName=div.className;
if(cssName!=null){
if(cssName.indexOf("shell-center-")!=-1){
if(needToFixedWidth){
div.style.width=(width-46)+"px";
}}else if(cssName.indexOf("shell-content")!=-1){
div.style.width=width+"px";
}else if(cssName.indexOf("shell-title-bar")!=-1){
div.style.width=width+"px";
}}}
},"Object");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.thumb=null;
this.isHorizontal=false;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"SashDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
this.thumb=d$.createElement("DIV");
var cssName=e.sourceElement.className;
this.thumb.className=cssName;
if(cssName!=null&&cssName.indexOf("sash-mouse-down")==-1){
this.thumb.className+=" sash-mouse-down";
}if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.thumb.style.left=e.sourceElement.style.left;
this.thumb.style.top=e.sourceElement.style.top;
this.thumb.style.width=e.sourceElement.style.width;
this.thumb.style.height=e.sourceElement.style.height;
this.thumb.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
if(e.sourceElement.nextSibling!=null){
e.sourceElement.parentNode.insertBefore(this.thumb,e.sourceElement.nextSibling);
}else{
e.sourceElement.parentNode.appendChild(this.thumb);
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
e.startX=e.currentX;
e.startY=e.currentY;
var frames=d$.getElementsByTagName("IFRAME");
if(frames.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
function(){
this.thumb.style.display="none";
d$.body.style.cursor="auto";
this.thumb.parentNode.removeChild(this.thumb);
if(this.overFrameHandle!=null){
d$.body.removeChild(this.overFrameHandle);
this.overFrameHandle=null;
}});
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=Integer.parseInt(e.sourceElement.parentNode.style.height);
var gWidth=Integer.parseInt(e.sourceElement.parentNode.style.width);
var dWidth=Integer.parseInt(e.sourceElement.style.width);
var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(xx<0){
xx=0;
}else if(xx>gWidth-dWidth-2){
xx=gWidth-dWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight-dHeight-2){
yy=gHeight-dHeight-2;
}return new $wt.graphics.Point(xx,yy);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.isHorizontal){
d$.body.style.cursor="e-resize";
this.thumb.style.cursor="e-resize";
}else{
d$.body.style.cursor="s-resize";
this.thumb.style.cursor="s-resize";
}if(this.isHorizontal){
this.thumb.style.left=this.currentLocation(e).x+"px";
}else{
this.thumb.style.top=this.currentLocation(e).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"ScaleDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
var cssName=e.sourceElement.className;
if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
e.startX=e.currentX;
e.startY=e.currentY;
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(e){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(e){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(e){
var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
var gHeight=Integer.parseInt(e.sourceElement.parentNode.style.height);
var gWidth=Integer.parseInt(e.sourceElement.parentNode.style.width);
var dWidth=Integer.parseInt(e.sourceElement.style.width);
var dHeight=Integer.parseInt(e.sourceElement.style.height);
if(this.isHorizontal){
dWidth=10;
dHeight=18;
}else{
dWidth=18;
dHeight=10;
}if(xx<0){
xx=0;
}else if(xx>gWidth-dWidth-2){
xx=gWidth-dWidth-2;
}if(yy<0){
yy=0;
}else if(yy>gHeight-dHeight-2){
yy=gHeight-dHeight-2;
}return new $wt.graphics.Point(xx,yy);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
if(this.isHorizontal){
e.sourceElement.style.left=this.currentLocation(e).x+"px";
}else{
e.sourceElement.style.top=this.currentLocation(e).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"SliderDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(e){
var cssName=e.sourceElement.className;
if(cssName.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.sourceX=Integer.parseInt(e.sourceElement.style.left);
this.sourceY=Integer.parseInt(e.sourceElement.style.top);
e.startX=e.currentX;
e.startY=e.currentY;
return true;
},"$wt.internal.dnd.DragEvent");
var methods = ["onmousedown", "onmouseup", "onmousemove",
		"onkeyup", "onselectstart"];
for (var i = 0; i < methods.length; i++) {
	org.eclipse.swt.internal.dnd.DNDUtils["$" + methods[i]] =
			org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
org.eclipse.swt.internal.dnd.DNDUtils.bindFunctionWith = function (aFun, obj) {
	var xFun = null;
	eval ("xFun = " + aFun + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, obj);
};
org.eclipse.swt.internal.dnd.HTMLEventWrapper.prototype.wrapEvent = null;
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = 0;
Clazz.defineMethod (org.eclipse.swt.internal.dnd.HTMLEventWrapper, "wrapEvent",
function (e) {
	this.target = null;
	this.x = 0;
	this.y = 0;
	this.leftButtonHold = true;
	this.event = null;
	this.type = 0;

	/*
	 * See more about Event properties at 
	 * http://www.quirksmode.org/js/events_properties.html
	 */
	if (!e) {
		e = window.event;
		this.stopPropagation = function () {
			this.event.cancelBubble = true;
		};
		this.preventDefault = function () {
			this.event.returnValue = false;
		};
	} else {
		this.stopPropagation = function () {
			this.event.stopPropagation ();
		};
		this.preventDefault = function () {
			this.event.preventDefault ();
		};
	}
	this.event = e;
	this.type = e.type;
	if (e.target) {
		this.target = e.target;
	} else if (e.srcElement) {
		this.target = e.srcElement;
	}
	if (e.pageX || e.pageY) {
		this.x = e.pageX;
		this.y = e.pageY;
	} else if (e.clientX || e.clientY) {
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
	}

	if (e.which) {
		this.leftButtonHold = (e.which == 1);
		if (e.which == 19 || e.which == 65536 || e.which > 8) {
			this.leftButtonHold = (org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton == 1);
		} else {
			org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = e.which;
		}
	} else if (e.button) {
		this.leftButtonHold = (e.button == 1);
	}
}, "Object");c$=$_C(function(){
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
this.shell.setLocation(-1,d$.body.clientHeight-26);
});
$_M(c$,"updateMaximized",
function(){
var height=d$.body.clientHeight-0;
if(height>w$.screen.availHeight-10){
height=w$.screen.availHeight-10;
}var width=d$.body.clientWidth;
if(width>w$.screen.availWidth){
width=w$.screen.availWidth;
}this.shell.setBounds(this.shell.computeTrim(0,0,width+2,height-18));
d$.body.scrollTop=0;
});
$_M(c$,"updateCentered",
function(){
var size=this.shell.getSize();
var y=Math.floor((d$.body.clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.shell.setLocation(Math.floor((d$.body.clientWidth-size.x)/2),y);
});
$_M(c$,"getStatus",
function(){
return this.status;
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal,"ResizeSystem");
c$.register=$_M(c$,"register",
function(shell,status){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell==shell){
return;
}}
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]==null){
$wt.internal.ResizeSystem.handlers[i]=new $wt.internal.ResizeHandler(shell,status);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(shell,status);
return;
},"$wt.widgets.Decorations,~N");
c$.unregister=$_M(c$,"unregister",
function(shell){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
if($wt.internal.ResizeSystem.handlers[i]!=null&&$wt.internal.ResizeSystem.handlers[i].shell==shell){
$wt.internal.ResizeSystem.handlers[i]=null;
return;
}}
},"$wt.widgets.Decorations");
c$.updateResize=$_M(c$,"updateResize",
function(){
for(var i=0;i<$wt.internal.ResizeSystem.handlers.length;i++){
var hdl=$wt.internal.ResizeSystem.handlers[i];
if(hdl!=null){
var status=hdl.getStatus();
if(status==1024){
hdl.updateMaximized();
}else if(status==128){
hdl.updateMinimized();
}else if(status==16777216){
hdl.updateCentered();
}}}
});
c$.handlers=c$.prototype.handlers=new Array(5);
Sync2Async = {};
Sync2Async.block = function (shell, oThis, runnable) {
shell.addDisposeListener ((function (innerThis, finalVars) {
if (!Clazz.isClassDefined ("Sync2Async$1")) {
Clazz.pu$h ();
cla$$ = Sync2Async$1 = function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "Sync2Async$1", null, $wt.events.DisposeListener);
Clazz.defineMethod (cla$$, "widgetDisposed", 
function (e) {
var $runnable = this.f$.runnable;
var $oThis = this.f$.oThis;
window.setTimeout (function () {
$runnable.apply ($oThis);
}, 0);
//this.f$.runnable.apply (this.f$.oThis);
}, "$wt.events.DisposeEvent");
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (Sync2Async$1, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", runnable, "oThis", oThis)));
shell.getDisplay ().readAndDispatch ();
};