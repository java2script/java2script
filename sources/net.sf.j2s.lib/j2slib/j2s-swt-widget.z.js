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
$_J("org.eclipse.swt.internal.browser");
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.browser,"OS");
c$.destoryHandle=$_M(c$,"destoryHandle",
function(a){
if(a==null){
return;
}var b=a;
b.onblur=null;
b.onchange=null;
b.onclick=null;
b.oncontextmenu=null;
b.ondblclick=null;
b.onfocus=null;
b.onkeydown=null;
b.onkeypress=null;
b.onkeyup=null;
b.onmousedown=null;
b.onmousemove=null;
b.onmouseout=null;
b.onmouseover=null;
b.onmouseup=null;
b.onselectchange=null;
b.onselectstart=null;
if(b.parentNode!=null){
try{
b.parentNode.removeChild(b);
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"Object");
c$.clearChildren=$_M(c$,"clearChildren",
function(a){
if(a==null){
return;
}var b=a;
for(var c=b.childNodes.length-1;c>=0;c--){
b.removeChild(b.childNodes[c]);
}
},"Object");
c$.SetWindowPos=$_M(c$,"SetWindowPos",
function(a,b,c,d,e,f){
if(a==null){
return;
}var g=a;
},"Object,~N,~N,~N,~N,~N");
c$.init=$_M(c$,"init",
($fz=function(){
if($wt.internal.browser.OS.invisibleContainer==null){
var a=d$.createElement("DIV");
d$.body.appendChild(a);
var b=a.style;
b.position="absolute";
b.top="-300px";
b.width="3000px";
b.height="100px";
b.overflow="scroll";
($t$=$wt.internal.browser.OS.invisibleContainer=a,$wt.internal.browser.OS.prototype.invisibleContainer=$wt.internal.browser.OS.invisibleContainer,$t$);
a=d$.createElement("DIV");
$wt.internal.browser.OS.invisibleContainer.appendChild(a);
a.className="system-default";
b=a.style;
b.whiteSpace="nowrap";
b.overflow="visible";
($t$=$wt.internal.browser.OS.lineContainer=a,$wt.internal.browser.OS.prototype.lineContainer=$wt.internal.browser.OS.lineContainer,$t$);
a=d$.createElement("DIV");
$wt.internal.browser.OS.invisibleContainer.appendChild(a);
($t$=$wt.internal.browser.OS.blockContainer=a,$wt.internal.browser.OS.prototype.blockContainer=$wt.internal.browser.OS.blockContainer,$t$);
}},$fz.isPrivate=true,$fz));
c$.resetLineContainer=$_M(c$,"resetLineContainer",
($fz=function(){
var a=$wt.internal.browser.OS.lineContainer;
$wt.internal.browser.OS.clearChildren(a);
a.className="";
var b=a.style;
b.cssText="";
b.whiteSpace="nowrap";
b.overflow="visible";
},$fz.isPrivate=true,$fz));
c$.resetBlockContainer=$_M(c$,"resetBlockContainer",
($fz=function(){
var a=$wt.internal.browser.OS.blockContainer;
$wt.internal.browser.OS.clearChildren(a);
a.className="";
a.style.cssText="";
},$fz.isPrivate=true,$fz));
c$.getContainerWidth=$_M(c$,"getContainerWidth",
function(a){
var b=a;
return Math.max(b.offsetWidth,Math.max(b.clientWidth,b.scrollWidth));
},"Object");
c$.getContainerHeight=$_M(c$,"getContainerHeight",
function(a){
var b=a;
var c=Math.max(b.offsetHeight,Math.max(b.clientHeight,b.scrollHeight));
if($wt.internal.browser.OS.isIE){
c--;
}return c;
},"Object");
c$.insertText=$_M(c$,"insertText",
function(a,b){
var c=null;
var d=a;
{
if(!((/[\r\n\t&]/g).test(b))){
d.style.display="inline";
d.appendChild(document.createTextNode(b));
return;
}
var z=String.fromCharCode(160);
var w=z+z+z+z+z+z+z+z;
var s=b.replace(/\t/g,w);
if(splitNeedFixed){
try{
c=splitIntoLines(s);
}catch(e){

}
}else{
c=s.split(/\r\n|\r|\n/g);
}
}for(var e=0;e<c.length;e++){
if(e>0){
d.appendChild(d$.createElement("BR"));
}var f=c[e];
if(f.length==0){
f=z;
}var g=0;
var h=f.indexOf('&');
var i=d$.createElement("SPAN");
d.appendChild(i);
while(h!=-1){
if(h<f.length-1){
var j=f.charAt(h+1);
if((j).charCodeAt(0)==('&').charCodeAt(0)){
h=f.indexOf('&',h+2);
continue;}else{
var k=f.substring(g,h);
if(k.length!=0){
i.appendChild(d$.createTextNode(k));
}var l=d$.createElement("SPAN");
i.appendChild(l);
l.appendChild(d$.createTextNode(""+j));
g=h+2;
h=f.indexOf('&',g);
}}else{
break;
}}
var j=null;
{
if(g==0){
j=c[i].replace(/&&/g,'&');
}else{
j=c[i].substring(g,c[i].length).replace(/&&/g,'&');
}
}i.appendChild(d$.createTextNode(j));
}
},"Object,~S");
c$.setupAsPlain=$_M(c$,"setupAsPlain",
($fz=function(a){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var b=$wt.internal.browser.OS.lineContainer;
b.className="system-default";
$wt.internal.browser.OS.insertText(b,a);
return b;
},$fz.isPrivate=true,$fz),"~S");
c$.setupAsStyled=$_M(c$,"setupAsStyled",
($fz=function(a,b,c){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var d=$wt.internal.browser.OS.lineContainer;
if(b!=null&&b.length!=0){
d.className=b;
}if(c!=null&&c.length!=0){
c=c.replace(/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'');
d.style.cssText=c;
}$wt.internal.browser.OS.insertText(d,a);
return d;
},$fz.isPrivate=true,$fz),"~S,~S,~S");
c$.setupAsPlainWrapped=$_M(c$,"setupAsPlainWrapped",
($fz=function(a,b){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetBlockContainer();
var c=$wt.internal.browser.OS.blockContainer;
c.className="system-default";
c.style.width=b+"px";
c.style.overflow="visible";
c.style.whiteSpace="normal";
$wt.internal.browser.OS.insertText(c,a);
return c;
},$fz.isPrivate=true,$fz),"~S,~N");
c$.setupAsStyledWrapped=$_M(c$,"setupAsStyledWrapped",
($fz=function(a,b,c,d){
$wt.internal.browser.OS.init();
$wt.internal.browser.OS.resetLineContainer();
var e=$wt.internal.browser.OS.lineContainer;
if(b!=null&&b.length!=0){
e.className=b;
}if(c!=null&&c.length!=0){
c=c.replace(/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'');
d.style.cssText=c;
}e.style.width=d+"px";
e.style.overflow="visible";
e.style.whiteSpace="normal";
$wt.internal.browser.OS.insertText(e,a);
return e;
},$fz.isPrivate=true,$fz),"~S,~S,~S,~N");
c$.getStringPlainWidth=$_M(c$,"getStringPlainWidth",
function(a){
var b=$wt.internal.browser.OS.setupAsPlain(a);
return $wt.internal.browser.OS.getContainerWidth(b);
},"~S");
c$.getStringStyledWidth=$_M(c$,"getStringStyledWidth",
function(a,b,c){
{
var r=/display\s*:\s*none/ig;
if(r.test(c)){
return 0;
}
}var d=$wt.internal.browser.OS.setupAsStyled(a,b,c);
return $wt.internal.browser.OS.getContainerWidth(d);
},"~S,~S,~S");
c$.getStringPlainHeight=$_M(c$,"getStringPlainHeight",
function(a){
var b=$wt.internal.browser.OS.setupAsPlain(a);
return $wt.internal.browser.OS.getContainerHeight(b);
},"~S");
c$.getStringPlainWrappedHeight=$_M(c$,"getStringPlainWrappedHeight",
function(a,b){
var c=$wt.internal.browser.OS.setupAsPlainWrapped(a,b);
return $wt.internal.browser.OS.getContainerHeight(c);
},"~S,~N");
c$.getStringStyledHeight=$_M(c$,"getStringStyledHeight",
function(a,b,c){
{
var r=/display\s*:\s*none/ig;
if(r.test(c)){
return 0;
}
}var d=$wt.internal.browser.OS.setupAsStyled(a,b,c);
return $wt.internal.browser.OS.getContainerHeight(d);
},"~S,~S,~S");
c$.getStringStyledWrappedHeight=$_M(c$,"getStringStyledWrappedHeight",
function(a,b,c,d){
{
var r=/display\s*:\s*none/ig;
if(r.test(c)){
return 0;
}
}var e=$wt.internal.browser.OS.setupAsStyledWrapped(a,b,c,d);
return $wt.internal.browser.OS.getContainerHeight(e);
},"~S,~S,~S,~N");
c$.getStringPlainSize=$_M(c$,"getStringPlainSize",
function(a){
var b=$wt.internal.browser.OS.setupAsPlain(a);
return new $wt.graphics.Point($wt.internal.browser.OS.getContainerWidth(b),$wt.internal.browser.OS.getContainerHeight(b));
},"~S");
c$.getStringStyledSize=$_M(c$,"getStringStyledSize",
function(a,b,c){
{
var r=/display\s*:\s*none/ig;
if(r.test(c)){
return new org.eclipse.swt.graphics.Point(0,0);
}
}var d=$wt.internal.browser.OS.setupAsStyled(a,b,c);
return new $wt.graphics.Point($wt.internal.browser.OS.getContainerWidth(d),$wt.internal.browser.OS.getContainerHeight(d));
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
function(a){
this.accessibleListeners.addElement(a);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"addAccessibleControlListener",
function(a){
this.accessibleControlListeners.addElement(a);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"addAccessibleTextListener",
function(a){
this.textListeners.addElement(a);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"removeAccessibleListener",
function(a){
this.accessibleListeners.removeElement(a);
},"$wt.accessibility.AccessibleListener");
$_M(c$,"removeAccessibleControlListener",
function(a){
this.accessibleControlListeners.removeElement(a);
},"$wt.accessibility.AccessibleControlListener");
$_M(c$,"removeAccessibleTextListener",
function(a){
this.textListeners.removeElement(a);
},"$wt.accessibility.AccessibleTextListener");
$_M(c$,"selectionChanged",
function(){
});
$_M(c$,"setFocus",
function(a){
},"~N");
$_M(c$,"textCaretMoved",
function(a){
},"~N");
$_M(c$,"textChanged",
function(a,b,c){
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
function(a){
this.construct(a,0);
},"$wt.graphics.Drawable");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.GC,[]);
if($_O(a,$wt.widgets.Control)){
var c=a;
this.handle=c.e;
}else if($_O(a,$wt.graphics.Image)){
var c=a;
this.handle=c.handle;
}else{
this.handle=d$.createElement("DIV");
this.handle.style.position="absolute";
}},"$wt.graphics.Drawable,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
if((a&33554432)!=0)a&=-67108865;
return a&(100663296);
},"~N");
$_M(c$,"copyArea",
function(a,b,c){
},"$wt.graphics.Image,~N,~N");
$_M(c$,"copyArea",
function(a,b,c,d,e,f){
this.copyArea(a,b,c,d,e,f,true);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"copyArea",
function(a,b,c,d,e,f,g){
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
function(a,b){
return 0;
},"~N,~N");
$_M(c$,"createGdipPen",
function(){
return 0;
});
$_M(c$,"destroyGdipBrush",
function(a){
},"~N");
$_V(c$,"dispose",
function(){
if(this.handle==null)return;
if(this.data==null||this.data.device==null||this.data.device.isDisposed())return;
});
$_M(c$,"drawArc",
function(a,b,c,d,e,f){
if(c<0){
a=a+c;
c=-c;
}if(d<0){
b=b+d;
d=-d;
}if(c==0||d==0||f==0)return;
var g=this.data.gdipGraphics;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawFocus",
function(a,b,c,d){
},"~N,~N,~N,~N");
$_M(c$,"drawImage",
function(a,b,c){
if(a.handle!=null){
for(var d=0;d<a.handle.childNodes.length;d++){
this.handle.appendChild(a.handle.childNodes[d]);
}
}},"$wt.graphics.Image,~N,~N");
$_M(c$,"drawImage",
function(a,b,c,d,e,f,g,h,i){
if(d==0||e==0||h==0||i==0)return;
this.drawImage(a,b,c,d,e,f,g,h,i,false);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawImage",
function(a,b,c,d,e,f,g,h,i,j){
var k=d$.createElement("IMG");
k.src=a.url;
k.style.position="absolute";
k.style.fontSize="0px";
k.style.left=f+"px";
k.style.top=g+"px";
k.style.width=h+"px";
k.style.height=i+"px";
this.handle.appendChild(k);
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawIcon",
function(a,b,c,d,e,f,g,h,i,j){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmap",
function(a,b,c,d,e,f,g,h,i,j){
},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"drawBitmapTransparentByClipping",
function(a,b,c,d,e,f,g,h,i,j,k,l,m){
},"~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N");
$_M(c$,"drawBitmapMask",
function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
var p=e;
if(b==0){
b=c;
p+=n;
}},"$wt.graphics.Image,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N,~B");
$_M(c$,"drawLine",
function(a,b,c,d){
var e=d$.createElement("DIV");
e.style.position="absolute";
e.style.fontSize="0px";
if(a==c){
e.style.left=a+"px";
e.style.borderLeftStyle="solid";
e.style.top=Math.min(b,d)+"px";
e.style.height=Math.abs(b-d)+"px";
}else if(b==d){
e.style.top=a+"px";
e.style.borderTopStyle="solid";
e.style.left=Math.min(a,c)+"px";
e.style.width=Math.abs(a-c)+"px";
}else{
e.style.left=Math.min(a,c)+"px";
e.style.top=Math.min(b,d)+"px";
e.style.width=Math.abs(a-c)+"px";
e.style.height=Math.abs(b-d)+"px";
e.style.borderStyle="solid";
}e.style.borderColor=this.fgColor.getCSSHandle();
e.style.borderWidth="1px";
this.handle.appendChild(e);
},"~N,~N,~N,~N");
$_M(c$,"drawOval",
function(a,b,c,d){
var e=this.data.gdipGraphics;
},"~N,~N,~N,~N");
$_M(c$,"drawPath",
function(a){
},"$wt.graphics.Path");
$_M(c$,"drawPoint",
function(a,b){
},"~N,~N");
$_M(c$,"drawPolygon",
function(a){
var b=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawPolyline",
function(a){
var b=this.data.gdipGraphics;
},"~A");
$_M(c$,"drawRectangle",
function(a,b,c,d){
var e=d$.createElement("DIV");
e.style.position="absolute";
e.style.fontSize="0px";
e.style.left=a+"px";
e.style.top=b+"px";
e.style.width=c+"px";
e.style.height=d+"px";
if(this.fgColor!=null)e.style.borderColor=this.fgColor.getCSSHandle();
e.style.borderStyle="solid";
e.style.borderWidth="1px";
this.handle.appendChild(e);
},"~N,~N,~N,~N");
$_M(c$,"drawRectangle",
function(a){
this.drawRectangle(a.x,a.y,a.width,a.height);
},"$wt.graphics.Rectangle");
$_M(c$,"drawRoundRectangle",
function(a,b,c,d,e,f){
if(this.data.gdipGraphics!=0){
this.initGdip(true,false);
this.drawRoundRectangleGdip(this.data.gdipGraphics,this.data.gdipPen,a,b,c,d,e,f);
return;
}},"~N,~N,~N,~N,~N,~N");
$_M(c$,"drawRoundRectangleGdip",
function(a,b,c,d,e,f,g,h){
var i=c;
var j=d;
var k=e;
var l=f;
var m=g;
var n=h;
if(k<0){
k=0-k;
i=i-k;
}if(l<0){
l=0-l;
j=j-l;
}if(m<0)m=0-m;
if(n<0)n=0-n;
var o=Math.floor(m/2);
var p=Math.floor(n/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"drawString",
function(a,b,c){
this.drawString(a,b,c,false);
},"~S,~N,~N");
$_M(c$,"drawString",
function(a,b,c,d){
var e=a.length;
if(e==0)return;
if(e==0)return;
var f=d$.createElement("DIV");
f.style.position="absolute";
f.style.left=b+"px";
f.style.top=c+"px";
f.style.whiteSpace="nowrap";
if(!d){
f.style.backgroundColor=this.bgColor.getCSSHandle();
}this.handle.appendChild(f);
f.appendChild(d$.createTextNode(a));
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(a,b,c){
this.drawText(a,b,c,6);
},"~S,~N,~N");
$_M(c$,"drawText",
function(a,b,c,d){
var e=6;
if(d)e|=1;
this.drawText(a,b,c,e);
},"~S,~N,~N,~B");
$_M(c$,"drawText",
function(a,b,c,d){
if(a.length==0)return;
var e=d$.createElement("DIV");
e.style.position="absolute";
e.style.left=b+"px";
e.style.top=c+"px";
e.style.whiteSpace="nowrap";
if((d&1)==0){
e.style.backgroundColor=this.bgColor.getCSSHandle();
}e.style.color=this.fgColor.getCSSHandle();
this.handle.appendChild(e);
e.appendChild(d$.createTextNode(a));
},"~S,~N,~N,~N");
$_V(c$,"equals",
function(a){
return(a==this)||(($_O(a,$wt.graphics.GC))&&(this.handle==(a).handle));
},"Object");
$_M(c$,"fillArc",
function(a,b,c,d,e,f){
if(c<0){
a=a+c;
c=-c;
}if(d<0){
b=b+d;
d=-d;
}if(c==0||d==0||f==0)return;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillGradientRectangle",
function(a,b,c,d,e){
if(c==0||d==0)return;
if(c==0||d==0)return;
this.fillRectangle(a,b,c,d);
},"~N,~N,~N,~N,~B");
$_M(c$,"fillOval",
function(a,b,c,d){
},"~N,~N,~N,~N");
$_M(c$,"fillPath",
function(a){
},"$wt.graphics.Path");
$_M(c$,"fillPolygon",
function(a){
},"~A");
$_M(c$,"fillRectangle",
function(a,b,c,d){
var e=d$.createElement("DIV");
e.style.position="absolute";
e.style.left=a+"px";
e.style.top=b+"px";
e.style.width=c+"px";
e.style.height=d+"px";
e.style.backgroundColor=this.bgColor.getCSSHandle();
this.handle.appendChild(e);
},"~N,~N,~N,~N");
$_M(c$,"fillRectangle",
function(a){
this.fillRectangle(a.x,a.y,a.width,a.height);
},"$wt.graphics.Rectangle");
$_M(c$,"fillRoundRectangle",
function(a,b,c,d,e,f){
this.fillRectangle(a,b,c,d);
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"fillRoundRectangleGdip",
function(a,b,c,d,e,f,g,h){
var i=c;
var j=d;
var k=e;
var l=f;
var m=g;
var n=h;
if(k<0){
k=0-k;
i=i-k;
}if(l<0){
l=0-l;
j=j-l;
}if(m<0)m=0-m;
if(n<0)n=0-n;
var o=Math.floor(m/2);
var p=Math.floor(n/2);
},"~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"flush",
function(){
});
$_M(c$,"getAdvanceWidth",
function(a){
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
function(a){
return 8;
},"~N");
$_M(c$,"getClipping",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClipping",
function(a){
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
var a;
var b;
return 1;
});
$_M(c$,"getLineDash",
function(){
if(this.data.dashes==null)return null;
var a=$_A(this.data.dashes.length,0);
System.arraycopy(this.data.dashes,0,a,0,a.length);
return a;
});
$_M(c$,"getLineJoin",
function(){
var a;
var b;
return 3;
});
$_M(c$,"getLineStyle",
function(){
var a;
var b;
return 1;
});
$_M(c$,"getLineWidth",
function(){
var a;
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
function(a){
},"$wt.graphics.Transform");
$_M(c$,"getXORMode",
function(){
var a=0;
return false;
});
$_M(c$,"initGdip",
function(a,b){
},"~B,~B");
$_M(c$,"init",
function(a,b,c){
var d=b.foreground;
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
function(a,b){
return 1.0;
},"~N,~N");
$_M(c$,"setAdvanced",
function(a){
if(a&&this.data.gdipGraphics!=0)return;
if(a){
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
function(a){
if(this.data.gdipGraphics==0&&a==-1)return;
},"~N");
$_M(c$,"setAlpha",
function(a){
if(this.data.gdipGraphics==0&&(a&0xFF)==0xFF)return;
this.initGdip(false,false);
this.data.alpha=a&0xFF;
},"~N");
$_M(c$,"setBackground",
function(a){
this.bgColor=a;
},"$wt.graphics.Color");
$_M(c$,"setBackgroundPattern",
function(a){
if(this.data.gdipGraphics==0&&a==null)return;
this.initGdip(false,false);
if(this.data.gdipBrush!=0)this.destroyGdipBrush(this.data.gdipBrush);
this.data.backgroundPattern=a;
},"$wt.graphics.Pattern");
$_M(c$,"setClipping",
function(a){
var b=a;
var c=this.data.gdipGraphics;
},"~N");
$_M(c$,"setClipping",
function(a,b,c,d){
},"~N,~N,~N,~N");
$_M(c$,"setClipping",
function(a){
this.setClipping(0);
},"$wt.graphics.Path");
$_M(c$,"setClipping",
function(a){
if(a==null){
this.setClipping(0);
}else{
this.setClipping(a.x,a.y,a.width,a.height);
}},"$wt.graphics.Rectangle");
$_M(c$,"setClipping",
function(a){
this.setClipping(a!=null?a.handle:0);
},"$wt.graphics.Region");
$_M(c$,"setFillRule",
function(a){
},"~N");
$_M(c$,"setFont",
function(a){
if(a==null){
a=$wt.widgets.Display.getDefault().getSystemFont();
}else{
this.font=a;
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(a){
this.fgColor=a;
},"$wt.graphics.Color");
$_M(c$,"setForegroundPattern",
function(a){
if(this.data.gdipGraphics==0&&a==null)return;
},"$wt.graphics.Pattern");
$_M(c$,"setInterpolation",
function(a){
if(this.data.gdipGraphics==0&&a==-1)return;
var b=0;
},"~N");
$_M(c$,"setLineCap",
function(a){
var b=0;
this.setPen(-1,-1,-1,b,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineDash",
function(a){
if(a!=null&&a.length>0){
this.data.dashes=$_A(a.length,0);
for(var b=0;b<a.length;b++){
var c=a[b];
this.data.dashes[b]=c;
}
}else{
this.data.dashes=null;
}},"~A");
$_M(c$,"setLineJoin",
function(a){
var b=0;
this.setPen(-1,-1,-1,-1,b,this.data.dashes);
},"~N");
$_M(c$,"setLineStyle",
function(a){
var b=-1;
this.setPen(-1,-1,b,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setLineWidth",
function(a){
this.setPen(-1,a,-1,-1,-1,this.data.dashes);
},"~N");
$_M(c$,"setPen",
function(a,b,c,d,e,f){
var g=false;
var h=false;
},"~N,~N,~N,~N,~N,~A");
$_M(c$,"setXORMode",
function(a){
},"~B");
$_M(c$,"setTextAntialias",
function(a){
if(this.data.gdipGraphics==0&&a==-1)return;
var b=0;
},"~N");
$_M(c$,"setTransform",
function(a){
if(this.data.gdipGraphics==0&&a==null)return;
},"$wt.graphics.Transform");
$_M(c$,"stringExtent",
function(a){
var b=a.length;
if(b==0){
return new $wt.graphics.Point(0,16);
}else{
return $wt.internal.browser.OS.getStringPlainSize(a);
}},"~S");
$_M(c$,"textExtent",
function(a){
return this.textExtent(a,6);
},"~S");
$_M(c$,"textExtent",
function(a,b){
if(a.length==0){
return new $wt.graphics.Point(0,16);
}else{
return $wt.internal.browser.OS.getStringPlainSize(a);
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
function(a,b,c,d){
$_R(this,$wt.graphics.Color,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.init(a,b,c,d);
},"$wt.graphics.Device,~N,~N,~N");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Color,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.init(a,b.red,b.green,b.blue);
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
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Color)))return false;
var b=a;
if(this.device!=b.device)return false;
if(this.cssHandle!=null&&b.cssHandle!=null){
return this.cssHandle==b.cssHandle;
}else if(this.cssHandle!=null){
return(this.rgbHandleFromCSS(this.cssHandle)&0xFFFFFF)==(b.handle&0xFFFFFF);
}else if(b.cssHandle!=null){
return(this.rgbHandleFromCSS(b.cssHandle)&0xFFFFFF)==(this.handle&0xFFFFFF);
}else{
return(this.handle&0xFFFFFF)==(b.handle&0xFFFFFF);
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
function(a,b,c,d){
this.device=a;
this.handle=0x02000000|(b&0xFF)|((c&0xFF)<<8)|((d&0xFF)<<16);
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
function(a,b){
$_R(this,$wt.graphics.Color,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.cssHandle=b;
this.handle=-2;
this.device=a;
},"$wt.graphics.Device,~S");
$_M(c$,"rgbHandleFromCSS",
($fz=function(a){
if(a==null)return 0x02000000;
var b=-1;
var c=-1;
var d=-1;
{
a.replace(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,function($0,$1,$2,$3){
b=parseInt($1);
c=parseInt($2);
d=parseInt($3);
return $0;
});
}if(b!=-1&&c!=-1&&d!=-1){
return 0x02000000|(b&0xFF)|((c&0xFF)<<8)|((d&0xFF)<<16);
}else{
var e=-2;
{
a.replace(/#([0-9a-fA-F]{3,6})/,function($0,$1){
if($1.length==3){
var r=$1.charAt(0);
var g=$1.charAt(1);
var b=$1.charAt(2);
e=eval("0x"+b+b+g+g+r+r);
}else if($1.length==6){
e=eval("0x"+$1.substring(4,6)+$1.substring(2,4)+$1.substring(0,2));
}else{
$WT.error(4);
}
});
}if(e!=-2){
return 0x02000000|e;
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
function(a,b){
$_R(this,$wt.graphics.Cursor,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.device=a;
switch(b){
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
function(a,b,c,d,e){
$_R(this,$wt.graphics.Cursor,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.device=a;
if(b.url!=null){
this.handle="url(\'"+b.url+"\'),default";
}else{
this.handle="default";
}},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData,~N,~N");
$_K(c$,
function(a,b,c,d){
$_R(this,$wt.graphics.Cursor,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.device=a;
if(b.url!=null){
this.handle="url(\'"+b.url+"\'),default";
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
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Cursor)))return false;
var b=a;
return this.device==b.device&&this.handle==b.handle;
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
function(a,b){
$_R(this,$wt.graphics.Cursor,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.handle=b;
this.device=a;
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
function(a){
this.create(a);
this.init();
},"$wt.graphics.DeviceData");
$_M(c$,"checkDevice",
function(){
});
$_M(c$,"create",
function(a){
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
var a=w$.screen.availWidth;
var b=w$.screen.availHeight;
return new $wt.graphics.Rectangle(0,0,a,b);
});
$_M(c$,"getDeviceData",
function(){
var a=new $wt.graphics.DeviceData();
return a;
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
function(a,b){
return new Array(0);
},"~S,~B");
$_M(c$,"getSystemColor",
function(a){
var b=0x02000000;
switch(a){
case 1:
b=0x02FFFFFF;
break;
case 2:
b=0x02000000;
break;
case 3:
b=0x020000FF;
break;
case 4:
b=0x02000080;
break;
case 5:
b=0x0200FF00;
break;
case 6:
b=0x02008000;
break;
case 7:
b=0x0200FFFF;
break;
case 8:
b=0x02008080;
break;
case 9:
b=0x02FF0000;
break;
case 10:
b=0x02800000;
break;
case 11:
b=0x02FF00FF;
break;
case 12:
b=0x02800080;
break;
case 13:
b=0x02FFFF00;
break;
case 14:
b=0x02808000;
break;
case 15:
b=0x02C0C0C0;
break;
case 16:
b=0x02808080;
break;
}
return new $wt.graphics.Color(this,b&0x000000FF,(b&0x0000FF00)>>8,(b&0x00FF00)>>16);
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
function(a){
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
function(a,b,c,d){
this.construct(a,b,c,d,4,null,0,null,null,-1,-1,-1,0,0,0,0);
},"~N,~N,~N,$wt.graphics.PaletteData");
$_K(c$,
function(a,b,c,d,e,f){
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A");
$_K(c$,
function(a){
var b=null;
if(a!=null){
b=a.url;
}this.url=b;
},"java.io.InputStream");
$_K(c$,
function(a){
this.url=a;
},"~S");
$_K(c$,
function(){
});
$_K(c$,
function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
var q=Math.floor(((Math.floor((a*c+7)/ 8)) + (e - 1)) /e)*e;
this.setAllFields(a,b,c,e,q,f!=null?f:$_A(q*b,0),d,k,h,g,i,j,l,m,n,o,p);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"setAllFields",
function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
this.width=a;
this.height=b;
this.depth=c;
this.scanlinePad=d;
this.bytesPerLine=e;
this.data=f;
this.palette=g;
this.transparentPixel=h;
this.maskData=i;
this.maskPad=j;
this.alphaData=k;
this.alpha=l;
this.type=m;
this.x=n;
this.y=o;
this.disposalMethod=p;
this.delayTime=q;
},"~N,~N,~N,~N,~N,~A,$wt.graphics.PaletteData,~N,~A,~N,~A,~N,~N,~N,~N,~N,~N");
c$.internal_new=$_M(c$,"internal_new",
function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
return new $wt.graphics.ImageData(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
},"~N,~N,~N,$wt.graphics.PaletteData,~N,~A,~N,~A,~A,~N,~N,~N,~N,~N,~N,~N");
$_V(c$,"clone",
function(){
var a=$_A(this.data.length,0);
System.arraycopy(this.data,0,a,0,this.data.length);
var b=null;
if(this.maskData!=null){
b=$_A(this.maskData.length,0);
System.arraycopy(this.maskData,0,b,0,this.maskData.length);
}var c=null;
if(this.alphaData!=null){
c=$_A(this.alphaData.length,0);
System.arraycopy(this.alphaData,0,c,0,this.alphaData.length);
}return new $wt.graphics.ImageData(this.width,this.height,this.depth,this.palette,this.scanlinePad,a,this.maskPad,b,c,this.alpha,this.transparentPixel,this.type,this.x,this.y,this.disposalMethod,this.delayTime);
});
$_M(c$,"getAlpha",
function(a,b){
if(this.alphaData==null)return 255;
return this.alphaData[b*this.width+a]&0xFF;
},"~N,~N");
$_M(c$,"getAlphas",
function(a,b,c,d,e){
if(c==0)return;
if(this.alphaData==null){
var f=e+c;
for(var g=e;g<f;g++){
d[g]=parseInt(255);
}
return;
}System.arraycopy(this.alphaData,b*this.width+a,d,e,c);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixel",
function(a,b){
var c;
var d;
var e;
if(this.depth==1){
c=(b*this.bytesPerLine)+(a>>3);
d=this.data[c]&0xFF;
e=1<<(7-(a&0x7));
if((d&e)==0){
return 0;
}else{
return 1;
}}if(this.depth==2){
c=(b*this.bytesPerLine)+(a>>2);
d=this.data[c]&0xFF;
var f=3-(a%4);
e=3<<(f*2);
return(d&e)>>(f*2);
}if(this.depth==4){
c=(b*this.bytesPerLine)+(a>>1);
d=this.data[c]&0xFF;
if((a&0x1)==0){
return d>>4;
}else{
return d&0x0F;
}}if(this.depth==8){
c=(b*this.bytesPerLine)+a;
return this.data[c]&0xFF;
}if(this.depth==16){
c=(b*this.bytesPerLine)+(a*2);
return((this.data[c+1]&0xFF)<<8)+(this.data[c]&0xFF);
}if(this.depth==24){
c=(b*this.bytesPerLine)+(a*3);
return((this.data[c]&0xFF)<<16)+((this.data[c+1]&0xFF)<<8)+(this.data[c+2]&0xFF);
}if(this.depth==32){
c=(b*this.bytesPerLine)+(a*4);
return((this.data[c]&0xFF)<<24)+((this.data[c+1]&0xFF)<<16)+((this.data[c+2]&0xFF)<<8)+(this.data[c+3]&0xFF);
}$WT.error(38);
return 0;
},"~N,~N");
$_M(c$,"getPixels",
function(a,b,c,d,e){
if(c==0)return;
var f;
var g;
var h=0;
var i=c;
var j=e;
var k=a;
var l=b;
if(this.depth==1){
f=(b*this.bytesPerLine)+(a>>3);
g=this.data[f]&0xFF;
while(i>0){
h=1<<(7-(k&0x7));
if((g&h)==0){
d[j]=0;
}else{
d[j]=1;
}j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
if(i>0)g=this.data[f]&0xFF;
k=0;
}else{
if(h==1){
f++;
if(i>0)g=this.data[f]&0xFF;
}}}
return;
}if(this.depth==2){
f=(b*this.bytesPerLine)+(a>>2);
g=this.data[f]&0xFF;
var m;
while(i>0){
m=3-(k%4);
h=3<<(m*2);
d[j]=parseInt(((g&h)>>(m*2)));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
if(i>0)g=this.data[f]&0xFF;
k=0;
}else{
if(m==0){
f++;
g=this.data[f]&0xFF;
}}}
return;
}if(this.depth==4){
f=(b*this.bytesPerLine)+(a>>1);
if((a&0x1)==1){
g=this.data[f]&0xFF;
d[j]=parseInt((g&0x0F));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}while(i>1){
g=this.data[f]&0xFF;
d[j]=parseInt((g>>4));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
d[j]=parseInt((g&0x0F));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}}
if(i>0){
g=this.data[f]&0xFF;
d[j]=parseInt((g>>4));
}return;
}if(this.depth==8){
f=(b*this.bytesPerLine)+a;
for(var m=0;m<c;m++){
d[j]=this.data[f];
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"getPixels",
function(a,b,c,d,e){
if(c==0)return;
var f;
var g;
var h;
var i=c;
var j=e;
var k=a;
var l=b;
if(this.depth==1){
f=(b*this.bytesPerLine)+(a>>3);
g=this.data[f]&0xFF;
while(i>0){
h=1<<(7-(k&0x7));
if((g&h)==0){
d[j]=0;
}else{
d[j]=1;
}j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
if(i>0)g=this.data[f]&0xFF;
k=0;
}else{
if(h==1){
f++;
if(i>0)g=this.data[f]&0xFF;
}}}
return;
}if(this.depth==2){
f=(b*this.bytesPerLine)+(a>>2);
g=this.data[f]&0xFF;
var m;
while(i>0){
m=3-(k%4);
h=3<<(m*2);
d[j]=parseInt(((g&h)>>(m*2)));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
if(i>0)g=this.data[f]&0xFF;
k=0;
}else{
if(m==0){
f++;
g=this.data[f]&0xFF;
}}}
return;
}if(this.depth==4){
f=(b*this.bytesPerLine)+(a>>1);
if((a&0x1)==1){
g=this.data[f]&0xFF;
d[j]=g&0x0F;
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}while(i>1){
g=this.data[f]&0xFF;
d[j]=g>>4;
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
d[j]=g&0x0F;
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}}
if(i>0){
g=this.data[f]&0xFF;
d[j]=g>>4;
}return;
}if(this.depth==8){
f=(b*this.bytesPerLine)+a;
for(var m=0;m<c;m++){
d[j]=this.data[f]&0xFF;
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}
return;
}if(this.depth==16){
f=(b*this.bytesPerLine)+(a*2);
for(var m=0;m<c;m++){
d[j]=((this.data[f+1]&0xFF)<<8)+(this.data[f]&0xFF);
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f+=2;
}}
return;
}if(this.depth==24){
f=(b*this.bytesPerLine)+(a*3);
for(var m=0;m<c;m++){
d[j]=((this.data[f]&0xFF)<<16)|((this.data[f+1]&0xFF)<<8)|(this.data[f+2]&0xFF);
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f+=3;
}}
return;
}if(this.depth==32){
f=(b*this.bytesPerLine)+(a*4);
j=e;
for(var m=0;m<c;m++){
d[j]=((this.data[f]&0xFF)<<24)|((this.data[f+1]&0xFF)<<16)|((this.data[f+2]&0xFF)<<8)|(this.data[f+3]&0xFF);
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f+=4;
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
function(a,b){
return null;
},"~N,~N");
$_M(c$,"setAlpha",
function(a,b,c){
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
this.alphaData[b*this.width+a]=parseInt(c);
},"~N,~N,~N");
$_M(c$,"setAlphas",
function(a,b,c,d,e){
if(c==0)return;
if(this.alphaData==null)this.alphaData=$_A(this.width*this.height,0);
System.arraycopy(d,e,this.alphaData,b*this.width+a,c);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixel",
function(a,b,c){
var d;
var e;
var f;
if(this.depth==1){
d=(b*this.bytesPerLine)+(a>>3);
e=this.data[d];
f=1<<(7-(a&0x7));
if((c&0x1)==1){
this.data[d]=parseInt((e|f));
}else{
this.data[d]=parseInt((e&(f^-1)));
}return;
}if(this.depth==2){
d=(b*this.bytesPerLine)+(a>>2);
e=this.data[d];
var g=3-(a%4);
f=0xFF^(3<<(g*2));
this.data[d]=parseInt(((this.data[d]&f)|(c<<(g*2))));
return;
}if(this.depth==4){
d=(b*this.bytesPerLine)+(a>>1);
if((a&0x1)==0){
this.data[d]=parseInt(((this.data[d]&0x0F)|((c&0x0F)<<4)));
}else{
this.data[d]=parseInt(((this.data[d]&0xF0)|(c&0x0F)));
}return;
}if(this.depth==8){
d=(b*this.bytesPerLine)+a;
this.data[d]=parseInt((c&0xFF));
return;
}if(this.depth==16){
d=(b*this.bytesPerLine)+(a*2);
this.data[d+1]=parseInt(((c>>8)&0xFF));
this.data[d]=parseInt((c&0xFF));
return;
}if(this.depth==24){
d=(b*this.bytesPerLine)+(a*3);
this.data[d]=parseInt(((c>>16)&0xFF));
this.data[d+1]=parseInt(((c>>8)&0xFF));
this.data[d+2]=parseInt((c&0xFF));
return;
}if(this.depth==32){
d=(b*this.bytesPerLine)+(a*4);
this.data[d]=parseInt(((c>>24)&0xFF));
this.data[d+1]=parseInt(((c>>16)&0xFF));
this.data[d+2]=parseInt(((c>>8)&0xFF));
this.data[d+3]=parseInt((c&0xFF));
return;
}$WT.error(38);
},"~N,~N,~N");
$_M(c$,"setPixels",
function(a,b,c,d,e){
if(c==0)return;
var f;
var g;
var h;
var i=c;
var j=e;
var k=a;
var l=b;
if(this.depth==1){
f=(b*this.bytesPerLine)+(a>>3);
while(i>0){
h=1<<(7-(k&0x7));
if((d[j]&0x1)==1){
this.data[f]=parseInt(((this.data[f]&0xFF)|h));
}else{
this.data[f]=parseInt(((this.data[f]&0xFF)&(h^-1)));
}j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
if(h==1){
f++;
}}}
return;
}if(this.depth==2){
var m=[parseInt(0xFC),parseInt(0xF3),parseInt(0xCF),parseInt(0x3F)];
f=(b*this.bytesPerLine)+(a>>2);
var n=3-(a%4);
while(i>0){
g=d[j]&0x3;
this.data[f]=parseInt(((this.data[f]&m[n])|(g<<(n*2))));
j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
n=0;
k=0;
}else{
if(n==0){
f++;
n=3;
}else{
n--;
}}}
return;
}if(this.depth==4){
f=(b*this.bytesPerLine)+(a>>1);
var m=(a&0x1)==0;
while(i>0){
g=d[j]&0x0F;
if(m){
this.data[f]=parseInt(((this.data[f]&0x0F)|(g<<4)));
}else{
this.data[f]=parseInt(((this.data[f]&0xF0)|g));
}j++;
i--;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
m=true;
k=0;
}else{
if(!m)f++;
m=!m;
}}
return;
}if(this.depth==8){
f=(b*this.bytesPerLine)+a;
for(var m=0;m<c;m++){
this.data[f]=parseInt((d[j]&0xFF));
j++;
k++;
if(k>=this.width){
l++;
f=l*this.bytesPerLine;
k=0;
}else{
f++;
}}
return;
}$WT.error(38);
},"~N,~N,~N,~A,~N");
$_M(c$,"setPixels",
function(a,b,c,d,e){
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
function(a){
this.reset();
this.data=[new $wt.graphics.ImageData(a)];
return this.data;
},"java.io.InputStream");
$_M(c$,"load",
function(a){
this.reset();
this.data=[new $wt.graphics.ImageData(a)];
return this.data;
},"~S");
$_M(c$,"save",
function(a,b){
},"java.io.OutputStream,~N");
$_M(c$,"save",
function(a,b){
},"~S,~N");
$_M(c$,"addImageLoaderListener",
function(a){
if(this.imageLoaderListeners==null){
this.imageLoaderListeners=new java.util.Vector();
}this.imageLoaderListeners.addElement(a);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"removeImageLoaderListener",
function(a){
if(this.imageLoaderListeners==null)return;
this.imageLoaderListeners.removeElement(a);
},"$wt.graphics.ImageLoaderListener");
$_M(c$,"hasListeners",
function(){
return this.imageLoaderListeners!=null&&this.imageLoaderListeners.size()>0;
});
$_M(c$,"notifyListeners",
function(a){
if(!this.hasListeners())return;
var b=this.imageLoaderListeners.size();
for(var c=0;c<b;c++){
var d=this.imageLoaderListeners.elementAt(c);
d.imageDataLoaded(a);
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
function(a,b,c){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.init(a,b,c);
this.width=b;
this.height=c;
},"$wt.graphics.Device,~N,~N");
$_M(c$,"init",
function(a,b,c){
this.type=0;
this.width=b;
this.height=c;
this.handle=d$.createElement("DIV");
this.handle.style.width=b+"px";
this.handle.style.height=c+"px";
this.imgHandle=this.handle;
},"$wt.graphics.Device,~N,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.device=a;
this.url=b.url;
},"$wt.graphics.Device,$wt.graphics.Image,~N");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.width=b.width;
this.height=b.height;
},"$wt.graphics.Device,$wt.graphics.Rectangle");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.url=b.url;
},"$wt.graphics.Device,$wt.graphics.ImageData");
$_K(c$,
function(a,b,c){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.url=b.url;
},"$wt.graphics.Device,$wt.graphics.ImageData,$wt.graphics.ImageData");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
var c=null;
if(b!=null){
c=b.url;
}this.url=c;
},"$wt.graphics.Device,java.io.InputStream");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Image,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.url=b;
},"$wt.graphics.Device,~S");
$_V(c$,"dispose",
function(){
});
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Image)))return false;
var b=a;
return this.device==b.device&&this.handle==b.handle;
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
function(a){
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
function(a,b){
$_R(this,$wt.graphics.Font,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.init(a,b);
},"$wt.graphics.Device,$wt.graphics.FontData");
$_K(c$,
function(a,b){
$_R(this,$wt.graphics.Font,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
for(var c=0;c<b.length;c++){
}
this.init(a,b[0]);
},"$wt.graphics.Device,~A");
$_K(c$,
function(a,b,c,d){
$_R(this,$wt.graphics.Font,[]);
if(a==null)a=$wt.graphics.Device.getDevice();
this.init(a,new $wt.graphics.FontData(b,c,d));
},"$wt.graphics.Device,~S,~N,~N");
$_V(c$,"dispose",
function(){
this.data=null;
this.device=null;
});
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.Font)))return false;
var b=a;
return b.data.equals(this.data);
},"Object");
$_M(c$,"getFontData",
function(){
var a=new Array(1);
a[0]=this.data;
return a;
});
$_V(c$,"hashCode",
function(){
return this.data.hashCode();
});
$_M(c$,"init",
function(a,b){
this.data=b;
this.device=a;
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
function(a){
this.name=a;
if(this.name==null){
this.name="Arial";
}this.style=0;
this.height=12;
},"~S");
$_K(c$,
function(a,b,c){
this.setName(a);
this.setHeight(b);
this.setStyle(c);
},"~S,~N,~N");
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.FontData)))return false;
var b=a;
return this.height==b.height&&this.style==b.style&&this.getName().equals(b.getName());
},"Object");
$_M(c$,"getHeight",
function(){
return this.height;
});
$_M(c$,"getLocale",
function(){
var a=new StringBuffer();
var b='_';
if(this.lang!=null){
a.append(this.lang);
a.append(b);
}if(this.country!=null){
a.append(this.country);
a.append(b);
}if(this.variant!=null){
a.append(this.variant);
}var c=a.toString();
var d=c.length;
if(d>0){
if((c.charAt(d-1)).charCodeAt(0)==(b).charCodeAt(0)){
c=c.substring(0,d-1);
}}return c;
});
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getStyle",
function(){
var a=0;
return a;
});
$_V(c$,"hashCode",
function(){
return this.height^this.style^this.getName().hashCode();
});
$_M(c$,"setHeight",
function(a){
this.height=a;
},"~N");
$_M(c$,"setLocale",
function(a){
this.lang=this.country=this.variant=null;
if(a!=null){
var b='_';
var c=a.length;
var d;
var e;
d=a.indexOf(b);
if(d==-1){
d=e=c;
}else{
e=a.indexOf(b,d+1);
if(e==-1)e=c;
}if(d>0)this.lang=a.substring(0,d);
if(e>d+1)this.country=a.substring(d+1,e);
if(c>e+1)this.variant=a.substring(e+1);
}},"~S");
$_M(c$,"setName",
function(a){
this.name=a;
},"~S");
$_M(c$,"setStyle",
function(a){
this.style=a;
},"~N");
$_V(c$,"toString",
function(){
var a=new StringBuffer();
a.append("1|");
a.append(this.getName());
a.append("|");
a.append(this.getHeight());
a.append("|");
a.append(this.getStyle());
a.append("|");
a.append("WINDOWS|1|");
a.append(this.getName());
return a.toString();
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.graphics,"FontMetrics");
$_K(c$,
function(){
});
$_V(c$,"equals",
function(a){
if(a==this)return true;
if(!($_O(a,$wt.graphics.FontMetrics)))return false;
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
this.e=null;
this.i=0;
this.h=0;
this.b=null;
this.d=null;
this.a=null;
this.dragStatus=false;
this.hoverTime=0;
this.hoverTimerID=0;
this.hookedStatus=null;
$_Z(this,arguments);
},$wt.widgets,"Widget");
$_K(c$,
function(a,b){
this.checkSubclass();
this.checkParent(a);
this.i=b;
this.b=a.b;
},"$wt.widgets.Widget,~N");
$_M(c$,"addListener",
function(a,b){
if(this.d==null)this.d=new $wt.widgets.EventTable();
this.d.hook(a,b);
this.checkHookType(a);
},"~N,$wt.widgets.Listener");
$_M(c$,"addDisposeListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(12,b);
},"$wt.events.DisposeListener");
$_M(c$,"callWindowProc",
function(a,b,c,d){
return 0;
},"~N,~N,~N,~N");
c$.checkBits=$_M(c$,"checkBits",
function(a,b,c,d,e,f,g){
var h=b|c|d|e|f|g;
if((a&h)==0)a|=b;
if((a&b)!=0)a=(a&~h)|b;
if((a&c)!=0)a=(a&~h)|c;
if((a&d)!=0)a=(a&~h)|d;
if((a&e)!=0)a=(a&~h)|e;
if((a&f)!=0)a=(a&~h)|f;
if((a&g)!=0)a=(a&~h)|g;
return a;
},"~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"checkHookType",
function(a){
if(this.hookedStatus==null){
this.hookedStatus=$_A(38,false);
}var b=false;
if(a>=0&&a<=37){
b=this.hookedStatus[a];
}if(b){
return;
}switch(a){
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
this.hookedStatus[a]=true;
},"~N");
$_M(c$,"checkOrientation",
function(a){
this.i&=-134217729;
if((this.i&(100663296))==0){
if(a!=null){
if((a.i&33554432)!=0)this.i|=33554432;
if((a.i&67108864)!=0)this.i|=67108864;
}}this.i=$wt.widgets.Widget.checkBits(this.i,33554432,67108864,0,0,0,0);
},"$wt.widgets.Widget");
$_M(c$,"checkOpened",
function(){
});
$_M(c$,"checkParent",
function(a){
a.checkOpened();
},"$wt.widgets.Widget");
$_M(c$,"checkSubclass",
function(){
});
$_M(c$,"checkWidget",
function(){
var a=this.b;
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
function(a){
$WT.error(a);
},"~N");
$_M(c$,"filters",
function(a){
return this.b.filters(a);
},"~N");
$_M(c$,"findItem",
function(a){
return null;
},"~N");
$_M(c$,"fixMnemonic",
function(a){
var b=$_A(a.length,'\0');
a.getChars(0,a.length,b,0);
var c=0;
var d=0;
while(c<b.length){
if((b[c]).charCodeAt(0)==('&').charCodeAt(0)){
if(c+1<b.length&&(b[c+1]).charCodeAt(0)==('&').charCodeAt(0)){
b[d++]=' ';
c++;
}c++;
}else{
b[d++]=b[c++];
}}
while(d<b.length)b[d++]=String.fromCharCode(0);

return b;
},"~S");
$_M(c$,"getData",
function(){
return(this.h&4)!=0?(this.a)[0]:this.a;
});
$_M(c$,"getData",
function(a){
if((this.h&4)!=0){
var b=this.a;
for(var c=1;c<b.length;c+=2){
if(a.equals(b[c]))return b[c+1];
}
}return null;
},"~S");
$_M(c$,"getDisplay",
function(){
var a=this.b;
return a;
});
$_M(c$,"getMenu",
function(){
return null;
});
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_M(c$,"getNameText",
function(){
return"";
});
$_M(c$,"getStyle",
function(){
return this.i;
});
$_M(c$,"hookKeyDown",
function(){
this.e.onkeydown=$_Q((function(i$,v$){
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
this.e.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if((a.event).keyCode==27){
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
var a=false;
if(this.hoverTimerID!=0){
a=true;
w$.clearTimeout(this.hoverTimerID);
this.hoverTimerID=0;
}if(a||this.hooks(32)){
a=true;
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
}return a;
});
$_M(c$,"hookMouseDown",
function(){
this.e.onmousedown=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var b=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(b.leftButtonHold){
this.b$["$wt.widgets.Widget"].dragStatus=true;
}if(!a||this.b$["$wt.widgets.Widget"].hooks(3)){
this.b$["$wt.widgets.Widget"].sendEvent(3);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$4,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseUp",
function(){
this.e.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$5")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.b$["$wt.widgets.Widget"].mouseHoverProc();
this.b$["$wt.widgets.Widget"].dragStatus=false;
if(!a||this.b$["$wt.widgets.Widget"].hooks(4)){
this.b$["$wt.widgets.Widget"].sendEvent(4);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$5,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseMove",
function(){
this.e.onmousemove=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.b$["$wt.widgets.Widget"].mouseHoverProc();
var b=false;
var c=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
if(this.b$["$wt.widgets.Widget"].dragStatus&&c.leftButtonHold&&this.b$["$wt.widgets.Widget"].hooks(29)){
b=true;
this.b$["$wt.widgets.Widget"].sendEvent(29);
this.b$["$wt.widgets.Widget"].dragStatus=false;
}if((!b&&!a)||this.b$["$wt.widgets.Widget"].hooks(5)){
this.b$["$wt.widgets.Widget"].sendEvent(5);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$6,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseEnter",
function(){
this.e.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$7")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.b$["$wt.widgets.Widget"].mouseHoverProc();
if(!a||this.b$["$wt.widgets.Widget"].hooks(6)){
this.b$["$wt.widgets.Widget"].sendEvent(6);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$7,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseExit",
function(){
this.e.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Widget$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Widget$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=false;
if(this.b$["$wt.widgets.Widget"].hoverTimerID!=0){
a=true;
w$.clearTimeout(this.b$["$wt.widgets.Widget"].hoverTimerID);
this.b$["$wt.widgets.Widget"].hoverTimerID=0;
}if(!a||this.b$["$wt.widgets.Widget"].hooks(7)){
this.b$["$wt.widgets.Widget"].sendEvent(7);
}});
c$=$_P();
}
return $_N($wt.widgets.Widget$8,i$,v$);
})(this,null));
});
$_M(c$,"hookMouseDoubleClick",
function(){
this.e.ondblclick=$_Q((function(i$,v$){
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
this.e.onclick=$_Q((function(i$,v$){
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
this.e.onfocus=$_Q((function(i$,v$){
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
this.e.onblur=$_Q((function(i$,v$){
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
this.e.onchange=$_Q((function(i$,v$){
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
this.e.onhelp=$_Q((function(i$,v$){
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
this.e.onchange=$_Q((function(i$,v$){
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
this.e.onkeypress=$_Q((function(i$,v$){
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
this.e.oncontextmenu=$_Q((function(i$,v$){
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
function(a){
if(this.d==null)return false;
return this.d.hooks(a);
},"~N");
$_M(c$,"isDisposed",
function(){
return(this.h&1)!=0;
});
$_M(c$,"isListening",
function(a){
return this.hooks(a);
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
function(a,b){
},"~N,$wt.widgets.Event");
$_M(c$,"notifyListeners",
function(a,b){
if(b==null)b=new $wt.widgets.Event();
this.sendEvent(a,b);
},"~N,$wt.widgets.Event");
$_M(c$,"postEvent",
function(a){
this.sendEvent(a,null,false);
},"~N");
$_M(c$,"postEvent",
function(a,b){
this.sendEvent(a,b,false);
},"~N,$wt.widgets.Event");
$_M(c$,"releaseChild",
function(){
});
$_M(c$,"releaseHandle",
function(){
this.h|=1;
this.b=null;
});
$_M(c$,"releaseResources",
function(){
this.releaseWidget();
this.releaseHandle();
});
$_M(c$,"releaseWidget",
function(){
this.sendEvent(12);
this.d=null;
this.a=null;
});
$_M(c$,"removeListener",
function(a,b){
if(this.d==null)return;
this.d.unhook(a,b);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(a,b){
if(this.d==null)return;
this.d.unhook(a,b);
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"removeDisposeListener",
function(a){
if(this.d==null)return;
this.d.unhook(12,a);
},"$wt.events.DisposeListener");
$_M(c$,"sendEvent",
function(a){
var b=a.display;
if(!b.filterEvent(a)){
if(this.d!=null)this.d.sendEvent(a);
}},"$wt.widgets.Event");
$_M(c$,"sendEvent",
function(a){
this.sendEvent(a,null,true);
},"~N");
$_M(c$,"sendEvent",
function(a,b){
this.sendEvent(a,b,true);
},"~N,$wt.widgets.Event");
$_M(c$,"sendEvent",
function(a,b,c){
if(this.d==null&&!this.b.filters(a)){
return;
}if(b==null)b=new $wt.widgets.Event();
b.type=a;
b.display=this.b;
b.widget=this;
if(b.time==0){
b.time=this.b.getLastEventTime();
}if(c){
this.sendEvent(b);
}else{
this.b.postEvent(b);
}},"~N,$wt.widgets.Event,~B");
$_M(c$,"sendKeyEvent",
function(a,b,c,d){
var e=new $wt.widgets.Event();
return this.sendKeyEvent(a,b,c,d,e);
},"~N,~N,~N,~N");
$_M(c$,"sendKeyEvent",
function(a,b,c,d,e){
this.sendEvent(a,e);
if(this.isDisposed())return false;
return e.doit;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"sendMouseEvent",
function(a,b,c,d,e){
return this.sendMouseEvent(a,b,0,0,false,c,d,e);
},"~N,~N,Object,~N,~N");
$_M(c$,"sendMouseEvent",
function(a,b,c,d,e,f,g,h){
if(!this.hooks(a)&&!this.filters(a))return true;
var i=new $wt.widgets.Event();
i.button=b;
i.detail=d;
i.count=c;
i.x=g;
i.y=h;
switch(a){
case 3:
case 8:
if(i.button==1)i.stateMask&=-524289;
if(i.button==2)i.stateMask&=-1048577;
if(i.button==3)i.stateMask&=-2097153;
if(i.button==4)i.stateMask&=-8388609;
if(i.button==5)i.stateMask&=-33554433;
break;
case 4:
if(i.button==1)i.stateMask|=524288;
if(i.button==2)i.stateMask|=1048576;
if(i.button==3)i.stateMask|=2097152;
if(i.button==4)i.stateMask|=8388608;
if(i.button==5)i.stateMask|=33554432;
break;
}
if(e){
this.sendEvent(a,i);
if(this.isDisposed())return false;
}else{
this.postEvent(a,i);
}return i.doit;
},"~N,~N,~N,~N,~B,Object,~N,~N");
$_M(c$,"setData",
function(a){
if((this.h&4)!=0){
(this.a)[0]=a;
}else{
this.a=a;
}},"Object");
$_M(c$,"setData",
function(a,b){
var c=1;
var d=null;
if((this.h&4)!=0){
d=this.a;
while(c<d.length){
if(a.equals(d[c]))break;
c+=2;
}
}if(b!=null){
if((this.h&4)!=0){
if(c==d.length){
var e=new Array(d.length+2);
System.arraycopy(d,0,e,0,d.length);
this.a=d=e;
}}else{
d=new Array(3);
d[0]=this.a;
this.a=d;
this.h|=4;
}d[c]=a;
d[c+1]=b;
}else{
if((this.h&4)!=0){
if(c!=d.length){
var e=d.length-2;
if(e==1){
this.a=d[0];
this.h&=-5;
}else{
var f=new Array(e);
System.arraycopy(d,0,f,0,c);
System.arraycopy(d,c+2,f,c,e-c);
this.a=f;
}}}}},"~S,Object");
$_M(c$,"sendFocusEvent",
function(a){
this.sendEvent(a);
return true;
},"~N");
$_M(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
if(a==null)return true;
var h=a;
h.style.left=c+"px";
h.style.top=d+"px";
h.style.width=(e>0?e:0)+"px";
h.style.height=(f>0?f:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"showMenu",
function(a,b){
var c=new $wt.widgets.Event();
c.x=a;
c.y=b;
this.sendEvent(35,c);
if(!c.doit)return true;
var d=this.getMenu();
if(d!=null&&!d.isDisposed()){
if(a!=c.x||b!=c.y){
d.setLocation(c.x,c.y);
}d.setVisible(true);
return true;
}return false;
},"~N,~N");
$_V(c$,"toString",
function(){
var a="*Disposed*";
if(!this.isDisposed()){
a="*Wrong Thread*";
if(this.isValidThread())a=this.getNameText();
}return this.getName()+" {"+a+"}";
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
this.l=null;
this.accessible=null;
this.drawCount=0;
this.foreground=0;
this.background=0;
this.z=0;
this.y=0;
this.w=0;
this.x=0;
$_Z(this,arguments);
},$wt.widgets,"Control",$wt.widgets.Widget,$wt.graphics.Drawable);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Control,[a,b]);
this.parent=a;
this.createWidget();
},"$wt.widgets.Composite,~N");
$_M(c$,"addControlListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(11,b);
this.addListener(10,b);
},"$wt.events.ControlListener");
$_M(c$,"addFocusListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(15,b);
this.addListener(16,b);
},"$wt.events.FocusListener");
$_M(c$,"addHelpListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(28,b);
},"$wt.events.HelpListener");
$_M(c$,"addKeyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(2,b);
this.addListener(1,b);
},"$wt.events.KeyListener");
$_M(c$,"addMouseListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(3,b);
this.addListener(4,b);
this.addListener(8,b);
},"$wt.events.MouseListener");
$_M(c$,"addMouseTrackListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(6,b);
this.addListener(7,b);
this.addListener(32,b);
},"$wt.events.MouseTrackListener");
$_M(c$,"addMouseMoveListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(5,b);
},"$wt.events.MouseMoveListener");
$_M(c$,"addPaintListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(9,b);
},"$wt.events.PaintListener");
$_M(c$,"addTraverseListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(31,b);
},"$wt.events.TraverseListener");
$_M(c$,"borderHandle",
function(){
return this.e;
});
$_M(c$,"checkBorder",
function(){
if(this.getBorderWidth()==0)this.i&=-2049;
});
$_M(c$,"checkBuffered",
function(){
this.i&=-536870913;
});
$_M(c$,"checkHandle",
function(a){
return a==this.e;
},"$wt.internal.xhtml.Element");
$_M(c$,"checkMirrored",
function(){
if((this.i&67108864)!=0){
}});
$_M(c$,"computeSize",
function(a,b){
return this.computeSize(a,b,true);
},"~N,~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=64;
var e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
var f=this.getBorderWidth();
d+=f*2;
e+=f*2;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"computeTabGroup",
function(){
if(this.isTabGroup())return this;
return this.parent.computeTabGroup();
});
$_M(c$,"computeTabRoot",
function(){
var a=this.parent._getTabList();
if(a!=null){
var b=0;
while(b<a.length){
if(a[b]==this)break;
b++;
}
if(b==a.length){
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
this.e=d$.createElement("DIV");
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
this.b.removeControl(this.e);
});
$_V(c$,"destroyWidget",
function(){
var a=this.topHandle();
this.releaseHandle();
if(a!=null){
BrowserNative.releaseHandle(a);
}});
$_M(c$,"enableWidget",
function(a){
this.e.disabled=!a;
},"~B");
$_M(c$,"findBrush",
function(a){
return this.parent.findBrush(a);
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
function(a){
if(this.menu!=null&&this!=a)return[this.menu];
return new Array(0);
},"$wt.widgets.Control");
$_M(c$,"findMnemonic",
function(a){
var b=0;
var c=a.length;
do{
while(b<c&&(a.charAt(b)).charCodeAt(0)!=('&').charCodeAt(0))b++;

if(++b>=c)return'\0';
if((a.charAt(b)).charCodeAt(0)!=('&').charCodeAt(0))return a.charAt(b);
b++;
}while(b<c);
return'\0';
},"~S");
$_M(c$,"fixChildren",
function(a,b,c,d,e){
b.fixShell(a,this);
d.fixDecorations(c,this,e);
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixFocus",
function(a){
var b=this.getShell();
var c=this;
while(c!=b&&(c=c.parent)!=null){
if(c.setFixedFocus())return;
}
b.setSavedFocus(a);
},"$wt.widgets.Control");
$_M(c$,"forceFocus",
function(){
if(this.b.focusEvent==16)return false;
var a=this.menuShell();
a.setSavedFocus(this);
if(!this.isEnabled()||!this.isVisible()||!this.isActive())return false;
if(this.isFocusControl())return true;
a.setSavedFocus(null);
if(this.isDisposed())return false;
a.setSavedFocus(this);
return this.isFocusControl();
});
$_M(c$,"forceResize",
function(){
if(this.parent==null)return;
var a=this.parent.L;
if(a==null)return;
for(var b=0;b<a.length;b++){
var c=a[b];
if(c!=null&&c.hwnd==this.e){
this.SetWindowPos(c.hwnd,null,c.x,c.y,c.cx,c.cy,c.flags);
a[b]=null;
return;
}}
});
$_M(c$,"getAccessible",
function(){
return this.accessible;
});
$_M(c$,"getBackground",
function(){
var a=this.e.style.backgroundColor;
if(a==null||a.toString().length==0){
return new $wt.graphics.Color(this.b,"menu");
}return new $wt.graphics.Color(this.b,a);
});
$_M(c$,"getBorderWidth",
function(){
if((this.i&2048)!=0){
return 1;
}return 0;
});
$_M(c$,"getBounds",
function(){
this.forceResize();
return new $wt.graphics.Rectangle(this.z,this.y,this.x,this.w);
});
$_M(c$,"getEnabled",
function(){
return!this.e.disabled;
});
$_M(c$,"getFont",
function(){
var a=this.e.style.fontFamily;
if(a==null||a.toString().length==0){
a="Tahoma, Arial, sans-serif";
}var b=this.e.style.fontSize;
if(b==null||b.toString().length==0){
b="8";
}return new $wt.graphics.Font(this.b,a,Integer.parseInt(b),0);
});
$_M(c$,"getForeground",
function(){
var a=this.e.style.color;
if(a==null||a.toString().length==0){
return new $wt.graphics.Color(this.b,"black");
}return new $wt.graphics.Color(this.b,this.e.style.color);
});
$_M(c$,"getLayoutData",
function(){
return this.l;
});
$_M(c$,"getLocation",
function(){
this.forceResize();
return new $wt.graphics.Point(this.z,this.y);
});
$_V(c$,"getMenu",
function(){
return this.menu;
});
$_M(c$,"getMonitor",
function(){
return this.b.getPrimaryMonitor();
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getPath",
function(){
var a=0;
var b=this.getShell();
var c=this;
while(c!=b){
a++;
c=c.parent;
}
c=this;
var d=new Array(a);
while(c!=b){
d[--a]=c;
c=c.parent;
}
return d;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getSize",
function(){
this.forceResize();
return new $wt.graphics.Point(this.x,this.w);
});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
if(this.drawCount!=0)return(this.h&16)==0;
return this.e.style.visibility!="hidden";
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
var a=this.b.getModalDialogShell();
if(a!=null&&a!=this.getShell()){
return false;
}var b=null;
var c=this.b.modalShells;
if(c!=null){
var d=196608;
var e=c.length;
while(--e>=0){
var f=c[e];
if(f!=null){
if((f.i&d)!=0){
var g=this;
while(g!=null){
if(g==f)break;
g=g.parent;
}
if(g!=f)return false;
break;
}if((f.i&32768)!=0){
if(b==null)b=this.getShell();
if(f.parent==b)return false;
}}}
}if(b==null)b=this.getShell();
return b.getEnabled();
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
function(a){
while(a!=null&&a!=this){
a=a.parent;
}
return a==this;
},"$wt.widgets.Control");
$_M(c$,"isReparentable",
function(){
return true;
});
$_M(c$,"isShowing",
function(){
if(!this.isVisible())return false;
var a=this;
while(a!=null){
var b=a.getSize();
if(b.x==0||b.y==0){
return false;
}a=a.parent;
}
return true;
});
$_M(c$,"isTabGroup",
function(){
var a=this.parent._getTabList();
if(a!=null){
for(var b=0;b<a.length;b++){
if(a[b]==this)return true;
}
}return true;
});
$_M(c$,"isTabItem",
function(){
var a=this.parent._getTabList();
if(a!=null){
for(var b=0;b<a.length;b++){
if(a[b]==this)return false;
}
}return false;
});
$_M(c$,"isVisible",
function(){
return this.getVisible()&&this.parent.isVisible();
});
$_M(c$,"mapEvent",
function(a,b){
if(a!=this.e){
}},"$wt.internal.xhtml.Element,$wt.widgets.Event");
$_M(c$,"markLayout",
function(a,b){
},"~B,~B");
$_M(c$,"menuShell",
function(){
return this.parent.menuShell();
});
$_M(c$,"mnemonicHit",
function(a){
return false;
},"~N");
$_M(c$,"mnemonicMatch",
function(a){
return false;
},"~N");
$_M(c$,"moveAbove",
function(a){
if(a!=null){
if(this.parent!=a.parent)return;
if(this.parent!=null){
var b=this.parent.containerHandle();
if(b!=null){
b.removeChild(this.e);
b.insertBefore(this.e,a.e);
}}}},"$wt.widgets.Control");
$_M(c$,"moveBelow",
function(a){
if(a!=null){
if(this.parent!=a.parent)return;
this.parent.e.removeChild(this.e);
if(a.e.nextSibling!=null){
this.parent.e.insertBefore(this.e,a.e.nextSibling);
}else{
this.parent.e.appendChild(this.e);
}}},"$wt.widgets.Control");
$_M(c$,"pack",
function(){
this.pack(true);
});
$_M(c$,"pack",
function(a){
var b=this.computeSize(-1,-1,a);
System.out.println(b);
this.setSize(b);
},"~B");
$_M(c$,"redraw",
function(){
});
$_M(c$,"redraw",
function(a,b,c,d,e){
if(c<=0||d<=0)return;
},"~N,~N,~N,~N,~B");
$_M(c$,"register",
function(){
this.b.addControl(this.e,this);
if(this.parent!=null){
this.parent.K[this.parent.K.length]=this;
}});
$_V(c$,"releaseChild",
function(){
this.parent.removeControl(this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Control,"releaseHandle",[]);
if(this.e!=null){
BrowserNative.releaseHandle(this.e);
this.e=null;
}});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Control,"releaseWidget",[]);
if(this.toolTipText!=null){
var a=this.getShell();
a.setToolTipText(this.e,null);
}this.toolTipText=null;
if(this.menu!=null&&!this.menu.isDisposed()){
this.menu.dispose();
}this.menu=null;
this.cursor=null;
this.deregister();
this.parent=null;
this.l=null;
this.accessible=null;
});
$_M(c$,"removeControlListener",
function(a){
if(this.d==null)return;
this.d.unhook(10,a);
this.d.unhook(11,a);
},"$wt.events.ControlListener");
$_M(c$,"removeFocusListener",
function(a){
if(this.d==null)return;
this.d.unhook(15,a);
this.d.unhook(16,a);
},"$wt.events.FocusListener");
$_M(c$,"removeHelpListener",
function(a){
if(this.d==null)return;
this.d.unhook(28,a);
},"$wt.events.HelpListener");
$_M(c$,"removeKeyListener",
function(a){
if(this.d==null)return;
this.d.unhook(2,a);
this.d.unhook(1,a);
},"$wt.events.KeyListener");
$_M(c$,"removeMouseTrackListener",
function(a){
if(this.d==null)return;
this.d.unhook(6,a);
this.d.unhook(7,a);
this.d.unhook(32,a);
},"$wt.events.MouseTrackListener");
$_M(c$,"removeMouseListener",
function(a){
if(this.d==null)return;
this.d.unhook(3,a);
this.d.unhook(4,a);
this.d.unhook(8,a);
},"$wt.events.MouseListener");
$_M(c$,"removeMouseMoveListener",
function(a){
if(this.d==null)return;
this.d.unhook(5,a);
},"$wt.events.MouseMoveListener");
$_M(c$,"removePaintListener",
function(a){
if(this.d==null)return;
this.d.unhook(9,a);
},"$wt.events.PaintListener");
$_M(c$,"removeTraverseListener",
function(a){
if(this.d==null)return;
this.d.unhook(31,a);
},"$wt.events.TraverseListener");
$_M(c$,"showWidget",
function(a){
this.e.style.visibility=a?"visible":"hidden";
},"~B");
$_V(c$,"sendFocusEvent",
function(a){
var b=this.getShell();
var c=this.b;
c.focusEvent=a;
c.focusControl=this;
this.sendEvent(a);
c.focusEvent=0;
c.focusControl=null;
if(!b.isDisposed()){
switch(a){
case 15:
b.setActiveControl(this);
break;
case 16:
if(b!=c.getActiveShell()){
b.setActiveControl(null);
}break;
}
}return true;
},"~N");
$_M(c$,"setBackground",
function(a){
if(a!=null)this.e.style.backgroundColor=a.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(a,b,c,d){
var e=0;
this.setBounds(a,b,Math.max(0,c),Math.max(0,d),e);
},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(a,b,c,d,e){
this.setBounds(a,b,c,d,e,true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBounds",
function(a,b,c,d,e,f){
var g=this.topHandle();
if(f&&this.parent!=null){
this.forceResize();
var h=this.parent.L;
if(h==null){
if((c!=this.x||d!=this.w)&&$_O(this,$wt.widgets.Composite)){
this.b.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.z=a;
this.y=b;
this.x=c;
this.w=d;
this.SetWindowPos(g,null,a,b,c,d,e);
}else{
var i=0;
while(i<h.length){
if(h[i]==null)break;
i++;
}
if(i==h.length){
var j=new Array(h.length+4);
System.arraycopy(h,0,j,0,h.length);
this.parent.L=h=j;
}var j=new $wt.internal.struct.WINDOWPOS();
j.hwnd=g;
j.x=a;
j.y=b;
j.cx=c;
j.cy=d;
j.flags=e;
h[i]=j;
}}else{
if((c!=this.x||d!=this.w)&&$_O(this,$wt.widgets.Composite)){
this.b.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.z=a;
this.y=b;
this.x=c;
this.w=d;
this.SetWindowPos(g,null,a,b,c,d,e);
}},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setBounds",
function(a){
this.setBounds(a.x,a.y,a.width,a.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setCapture",
function(a){
},"~B");
$_M(c$,"setCursor",
function(){
});
$_M(c$,"setCursor",
function(a){
this.cursor=a;
this.e.style.cursor=a.getCSSHandle();
},"$wt.graphics.Cursor");
$_M(c$,"setDefaultFont",
function(){
});
$_M(c$,"setEnabled",
function(a){
var b=null;
var c=false;
if(!a){
if(this.b.focusEvent!=16){
b=this.b.getFocusControl();
c=this.isFocusAncestor(b);
}}this.enableWidget(a);
if(c)this.fixFocus(b);
},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.i&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFocus",
function(){
if((this.i&524288)!=0)return false;
return this.forceFocus();
});
$_M(c$,"setFont",
function(a){
if(a==null||a.data==null)return;
this.e.style.fontFamily=a.data.name;
this.e.style.fontSize=a.data.height+"pt";
if((a.data.style&1)!=0){
this.e.style.fontWeight="bold";
}else{
this.e.style.fontWeight="normal";
}if((a.data.style&2)!=0){
this.e.style.fontStyle="italic";
}else{
this.e.style.fontStyle="normal";
}},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(a){
if(a!=null)this.e.style.color=a.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setLayoutData",
function(a){
this.l=a;
},"Object");
$_M(c$,"setLocation",
function(a,b){
var c=0;
this.setBounds(a,b,this.x,this.w,c);
},"~N,~N");
$_M(c$,"setLocation",
function(a){
this.setLocation(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setMenu",
function(a){
if(a!=null){
}this.menu=a;
if(this.e.oncontextmenu==null){
this.e.oncontextmenu=$_Q((function(i$,v$){
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
function(a){
return false;
},"~B");
$_M(c$,"setRedraw",
function(a){
},"~B");
$_M(c$,"setSavedFocus",
function(){
return this.forceFocus();
});
$_M(c$,"setSize",
function(a,b){
var c=0;
this.setBounds(0,0,Math.max(0,a),Math.max(0,b),c);
},"~N,~N");
$_M(c$,"setSize",
function(a){
System.err.println(a);
this.setSize(a.x,a.y);
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
function(a){
var b=this.getShell();
b.setToolTipText(this.e,this.toolTipText=a);
},"~S");
$_M(c$,"setVisible",
function(a){
if(this.drawCount!=0){
if(((this.h&16)==0)==a)return;
}else{
if((this.e.style.visibility!="hidden")==a)return;
}if(a){
this.sendEvent(22);
if(this.isDisposed())return;
}var b=null;
var c=false;
if(!a){
if(this.b.focusEvent!=16){
b=this.b.getFocusControl();
c=this.isFocusAncestor(b);
}}if(this.drawCount!=0){
this.h=a?this.h&-17:this.h|16;
}else{
this.showWidget(a);
if(this.isDisposed())return;
}if(!a){
this.sendEvent(23);
if(this.isDisposed())return;
}if(c)this.fixFocus(b);
},"~B");
$_M(c$,"sort",
function(a){
var b=a.length;
for(var c=Math.floor(b/ 2); c > 0; c /=2){
for(var d=c;d<b;d++){
for(var e=d-c;e>=0;e-=c){
if(a[e]<=a[e+c]){
var f=a[e];
a[e]=a[e+c];
a[e+c]=f;
}}
}
}
},"~A");
$_M(c$,"toControl",
function(a,b){
return new $wt.graphics.Point(a,b);
},"~N,~N");
$_M(c$,"toControl",
function(a){
return this.toControl(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"toDisplay",
function(a,b){
return new $wt.graphics.Point(a,b);
},"~N,~N");
$_M(c$,"toDisplay",
function(a){
return this.toDisplay(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"topHandle",
function(){
return this.e;
});
$_M(c$,"traverse",
function(a){
this.sendEvent(31,a);
if(this.isDisposed())return true;
if(!a.doit)return false;
switch(a.detail){
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
return this.traverseMnemonic(a.character);
case 512:
return this.traversePage(true);
case 256:
return this.traversePage(false);
}
return false;
},"$wt.widgets.Event");
$_M(c$,"traverse",
function(a){
var b=new $wt.widgets.Event();
b.doit=true;
b.detail=a;
return this.traverse(b);
},"~N");
$_M(c$,"traverseEscape",
function(){
return false;
});
$_M(c$,"traverseGroup",
function(a){
var b=this.computeTabRoot();
var c=this.computeTabGroup();
var d=b.computeTabList();
var e=d.length;
var f=0;
while(f<e){
if(d[f]==c)break;
f++;
}
if(f==e)return false;
var g=f;
var h=(a)?1:-1;
while((f=((f+h+e)%e))!=g){
var i=d[f];
if(!i.isDisposed()&&i.setTabGroupFocus()){
return true;
}}
if(c.isDisposed())return false;
return c.setTabGroupFocus();
},"~B");
$_M(c$,"traverseItem",
function(a){
var b=this.parent._getChildren();
var c=b.length;
var d=0;
while(d<c){
if(b[d]==this)break;
d++;
}
if(d==c)return false;
var e=d;
var f=(a)?1:-1;
while((d=(d+f+c)%c)!=e){
var g=b[d];
if(!g.isDisposed()&&g.isTabItem()){
if(g.setTabItemFocus())return true;
}}
return false;
},"~B");
$_M(c$,"traverseMnemonic",
function(a){
return this.mnemonicHit(a);
},"~N");
$_M(c$,"traversePage",
function(a){
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
function(a){
},"~B");
$_M(c$,"updateFont",
function(a,b){
var c=this.getFont().equals(a);
if(c)this.setFont(b);
return c;
},"$wt.graphics.Font,$wt.graphics.Font");
$_M(c$,"updateLayout",
function(a,b){
},"~B,~B");
$_M(c$,"widgetParent",
function(){
if(this.parent==null){
return null;
}return this.parent.e;
});
$_M(c$,"setParent",
function(a){
if(this.parent==a)return true;
if(!this.isReparentable())return false;
this.releaseChild();
var b=a.getShell();
var c=this.getShell();
var d=a.menuShell();
var e=this.menuShell();
if(c!=b||e!=d){
var f=c.findMenus(this);
this.fixChildren(b,c,d,e,f);
}this.parent=a;
return true;
},"$wt.widgets.Composite");
c$=$_C(function(){
this.horizontalBar=null;
this.verticalBar=null;
$_Z(this,arguments);
},$wt.widgets,"Scrollable",$wt.widgets.Control);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Scrollable,[a,b]);
},"$wt.widgets.Composite,~N");
$_M(c$,"computeTrim",
function(a,b,c,d){
var e=this.getBorderWidth();
return new $wt.graphics.Rectangle(a-e,b-e,c+e*2,d+e*2);
},"~N,~N,~N,~N");
$_M(c$,"createScrollBar",
function(a){
var b=new $wt.widgets.ScrollBar(this,a);
if((this.h&2)!=0){
b.setMaximum(100);
b.setThumb(10);
}return b;
},"~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Scrollable,"createWidget",[]);
if((this.i&256)!=0)this.horizontalBar=this.createScrollBar(256);
if((this.i&512)!=0)this.verticalBar=this.createScrollBar(512);
});
$_M(c$,"getClientArea",
function(){
this.forceResize();
var a=-1;
var b=-1;
a=this.x;
b=this.w;
if(a<0){
a=64;
}if(b<0){
b=64;
}return new $wt.graphics.Rectangle(0,0,a,b);
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
return this.e;
});
$_M(c$,"windowClass",
function(){
return"DIV";
});
c$=$_C(function(){
this.$layout=null;
this.L=null;
this.M=null;
this.J=0;
this.K=null;
$_Z(this,arguments);
},$wt.widgets,"Composite",$wt.widgets.Scrollable);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Composite,[a,b]);
this.K=new Array(0);
},"$wt.widgets.Composite,~N");
$_M(c$,"_getChildren",
function(){
var a=this.K.length;
var b=0;
var c=new Array(0);
for(var d=0;d<a;d++){
var e=this.K[d];
if(e!=null&&e!=this){
c[b++]=e;
}}
return c;
});
$_M(c$,"_getTabList",
function(){
if(this.M==null)return this.M;
var a=0;
for(var b=0;b<this.M.length;b++){
if(!this.M[b].isDisposed())a++;
}
if(a==this.M.length)return this.M;
var c=new Array(a);
var d=0;
for(var e=0;e<this.M.length;e++){
if(!this.M[e].isDisposed()){
c[d++]=this.M[e];
}}
this.M=c;
return this.M;
});
$_M(c$,"changed",
function(a){
for(var b=0;b<a.length;b++){
var c=a[b];
var d=false;
var e=c.parent;
while(e!=null){
d=e==this;
if(d)break;
e=e.parent;
}
}
for(var c=0;c<a.length;c++){
var d=a[c];
var e=d.parent;
while(d!=this){
if(e.$layout==null||!e.$layout.flushCache(d)){
e.h|=64;
}d=e;
e=d.parent;
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
var a=$_U(this,$wt.widgets.Composite,"computeTabList",[]);
if(a.length==0)return a;
var b=this.M!=null?this._getTabList():this._getChildren();
for(var c=0;c<b.length;c++){
var d=b[c];
var e=d.computeTabList();
if(e.length!=0){
var f=new Array(a.length+e.length);
System.arraycopy(a,0,f,0,a.length);
System.arraycopy(e,0,f,a.length,e.length);
a=f;
}}
return a;
});
$_M(c$,"computeSize",
function(a,b,c){
var d;
if(this.$layout!=null){
if(a==-1||b==-1){
c=new Boolean(c|((this.h&64)!=0));
this.h&=-65;
d=this.$layout.computeSize(this,a,b,c);
}else{
d=new $wt.graphics.Point(a,b);
}}else{
d=this.minimumSize(a,b,c);
}if(d.x==0)d.x=64;
if(d.y==0)d.y=64;
if(a!=-1)d.x=a;
if(b!=-1)d.y=b;
var e=this.computeTrim(0,0,d.x,d.y);
return new $wt.graphics.Point(e.width,e.height);
},"~N,~N,~B");
$_M(c$,"containerHandle",
function(){
return this.e;
});
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
this.e.className="composite-default";
if((this.i&2048)!=0){
this.e.className+=" composite-border";
}if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}this.h|=2;
});
$_M(c$,"findMenus",
function(a){
if(a==this)return new Array(0);
var b=$_U(this,$wt.widgets.Composite,"findMenus",[a]);
var c=this._getChildren();
for(var d=0;d<c.length;d++){
var e=c[d];
var f=e.findMenus(a);
if(f.length!=0){
var g=new Array(b.length+f.length);
System.arraycopy(b,0,g,0,b.length);
System.arraycopy(f,0,g,b.length,f.length);
b=g;
}}
return b;
},"$wt.widgets.Control");
$_M(c$,"fixChildren",
function(a,b,c,d,e){
$_U(this,$wt.widgets.Composite,"fixChildren",[a,b,c,d,e]);
var f=this._getChildren();
for(var g=0;g<f.length;g++){
f[g].fixChildren(a,b,c,d,e);
}
},"$wt.widgets.Shell,$wt.widgets.Shell,$wt.widgets.Decorations,$wt.widgets.Decorations,~A");
$_M(c$,"fixChildrenList",
function(a){
if(this.K==null||this.K.length==0)return;
var b=new Array(0);
for(var c=0;c<this.K.length;c++){
var d=this.K[c];
if(d!=null&&d!=a){
b[b.length]=d;
}}
this.K=b;
},"$wt.widgets.Control");
$_M(c$,"fixTabList",
function(a){
if(this.M==null)return;
var b=0;
for(var c=0;c<this.M.length;c++){
if(this.M[c]==a)b++;
}
if(b==0)return;
var d=null;
var e=this.M.length-b;
if(e!=0){
d=new Array(e);
var f=0;
for(var g=0;g<this.M.length;g++){
if(this.M[g]!=a){
d[f++]=this.M[g];
}}
}this.M=d;
},"$wt.widgets.Control");
$_V(c$,"getBorderWidth",
function(){
if((this.i&2048)!=0){
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
return this.K.length;
});
$_M(c$,"getLayout",
function(){
return this.$layout;
});
$_M(c$,"getTabList",
function(){
var a=this._getTabList();
if(a==null){
var b=0;
var c=this._getChildren();
for(var d=0;d<c.length;d++){
if(c[d].isTabGroup())b++;
}
a=new Array(b);
var e=0;
for(var f=0;f<c.length;f++){
if(c[f].isTabGroup()){
a[e++]=c[f];
}}
}return a;
});
$_M(c$,"hooksKeys",
function(){
return this.hooks(1)||this.hooks(2);
});
$_M(c$,"getLayoutDeferred",
function(){
return this.J>0;
});
$_M(c$,"isLayoutDeferred",
function(){
return this.J>0||this.parent.isLayoutDeferred();
});
$_M(c$,"layout",
function(){
this.layout(true);
});
$_M(c$,"layout",
function(a){
if(this.$layout==null)return;
this.layout(a,true);
},"~B");
$_M(c$,"layout",
function(a,b){
if(this.$layout==null&&!b)return;
this.markLayout(a,b);
this.updateLayout(true,b);
},"~B,~B");
$_M(c$,"layout",
function(a){
System.out.print("control");
var b=new java.util.Date();
for(var c=0;c<a.length;c++){
var d=a[c];
var e=false;
var f=d.parent;
while(f!=null){
e=f==this;
if(e)break;
f=f.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-b.getTime()));
b=new java.util.Date();
var d=0;
var e=new Array(16);
for(var f=0;f<a.length;f++){
var g=a[f];
var h=g.parent;
while(g!=this){
if(h.$layout!=null){
h.h|=32;
if(!h.$layout.flushCache(g)){
h.h|=64;
}}if(d==e.length){
var i=new Array(e.length+16);
System.arraycopy(e,0,i,0,e.length);
e=i;
}g=e[d++]=h;
h=g.parent;
}
}
System.out.println(":::"+(new java.util.Date().getTime()-b.getTime()));
b=new java.util.Date();
for(var g=d-1;g>=0;g--){
e[g].updateLayout(true,false);
}
System.out.println(":::"+(new java.util.Date().getTime()-b.getTime()));
b=new java.util.Date();
},"~A");
$_M(c$,"markLayout",
function(a,b){
if(this.$layout!=null){
this.h|=32;
if(a)this.h|=64;
}if(b){
var c=this._getChildren();
for(var d=0;d<c.length;d++){
c[d].markLayout(a,b);
}
}},"~B,~B");
$_M(c$,"minimumSize",
function(a,b,c){
var d=this._getChildren();
var e=0;
var f=0;
for(var g=0;g<d.length;g++){
var h=d[g].getBounds();
e=Math.max(e,h.x+h.width);
f=Math.max(f,h.y+h.height);
}
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_M(c$,"releaseChildren",
function(){
var a=this._getChildren();
for(var b=0;b<a.length;b++){
var c=a[b];
if(!c.isDisposed())c.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseChildren();
$_U(this,$wt.widgets.Composite,"releaseWidget",[]);
if((this.h&2)!=0&&(this.i&16777216)!=0){
}this.K=null;
this.$layout=null;
this.M=null;
if(this.L!=null){
for(var a=0;a<this.L.length;a++){
this.L[a].hwnd=null;
this.L[a].hwndInsertAfter=null;
}
}this.L=null;
});
$_M(c$,"removeControl",
function(a){
this.fixTabList(a);
this.fixChildrenList(a);
this.resizeChildren();
},"$wt.widgets.Control");
$_M(c$,"resizeChildren",
function(){
if(this.L==null)return;
do{
var a=this.L;
this.L=null;
if(!this.resizeChildren(true,a)){
this.resizeChildren(false,a);
}}while(this.L!=null);
});
$_M(c$,"resizeChildren",
function(a,b){
if(b==null)return true;
var c=0;
if(a){
if(c==0)return false;
}for(var d=0;d<b.length;d++){
var e=b[d];
if(e!=null){
if(a){
if(c==0)return false;
}else{
this.SetWindowPos(e.hwnd,null,e.x,e.y,e.cx,e.cy,e.flags);
}}}
return true;
},"~B,~A");
$_M(c$,"setFixedFocus",
function(){
var a=this._getChildren();
for(var b=0;b<a.length;b++){
var c=a[b];
if(c.setRadioFocus())return true;
}
for(var c=0;c<a.length;c++){
var d=a[c];
if(d.setFixedFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFixedFocus",[]);
});
$_M(c$,"setFocus",
function(){
var a=this._getChildren();
for(var b=0;b<a.length;b++){
var c=a[b];
if(c.setRadioFocus())return true;
}
for(var c=0;c<a.length;c++){
var d=a[c];
if(d.setFocus())return true;
}
return $_U(this,$wt.widgets.Composite,"setFocus",[]);
});
$_M(c$,"setLayout",
function(a){
this.$layout=a;
},"$wt.widgets.Layout");
$_M(c$,"setLayoutDeferred",
function(a){
if(!a){
if(--this.J==0){
if(!this.isLayoutDeferred())this.updateLayout(true,true);
}}else{
this.J++;
}},"~B");
$_M(c$,"setTabList",
function(a){
if(a!=null){
for(var b=0;b<a.length;b++){
var c=a[b];
}
var c=new Array(a.length);
System.arraycopy(a,0,c,0,a.length);
a=c;
}this.M=a;
},"~A");
$_M(c$,"setResizeChildren",
function(a){
if(a){
this.resizeChildren();
}else{
var b=this.getChildrenCount();
if(b>1&&this.L==null){
this.L=new Array(b);
}}},"~B");
$_V(c$,"setTabGroupFocus",
function(){
if(this.isTabItem())return this.setTabItemFocus();
var a=(this.i&524288)==0;
if((this.h&2)!=0){
a=this.hooksKeys();
if((this.i&16777216)!=0)a=true;
}if(a&&this.setTabItemFocus())return true;
var b=this._getChildren();
for(var c=0;c<b.length;c++){
var d=b[c];
if(d.isTabItem()&&d.setRadioFocus())return true;
}
for(var d=0;d<b.length;d++){
var e=b[d];
if(e.isTabItem()&&e.setTabItemFocus())return true;
}
return false;
});
$_V(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
if((this.i&2048)!=0){
e-=4;
f-=4;
}var h=a;
h.style.left=c+"px";
h.style.top=d+"px";
h.style.width=(e>0?e:0)+"px";
h.style.height=(f>0?f:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_V(c$,"updateLayout",
function(a,b){
if(this.isLayoutDeferred())return;
if((this.h&32)!=0){
var c=(this.h&64)!=0;
this.h&=-97;
if(a)this.setResizeChildren(false);
this.$layout.layout(this,c);
if(a)this.setResizeChildren(true);
}if(b){
var c=this._getChildren();
for(var d=0;d<c.length;d++){
if($_O(c[d],$wt.widgets.Composite)){
this.b.sendMessage(new $wt.internal.struct.MESSAGE(c[d],2,[a,b]));
}}
}},"~B,~B");
c$=$_C(function(){
this.caret=null;
$_Z(this,arguments);
},$wt.widgets,"Canvas",$wt.widgets.Composite);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Canvas,[a,b]);
},"$wt.widgets.Composite,~N");
$_M(c$,"clearArea",
function(a,b,c,d){
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
function(a,b,c,d,e,f,g){
this.forceResize();
},"~N,~N,~N,~N,~N,~N,~B");
$_M(c$,"setCaret",
function(a){
var b=a;
this.caret=b;
},"$wt.widgets.Caret");
$_M(c$,"setFont",
function(a){
if(this.caret!=null)this.caret.setFont(a);
$_U(this,$wt.widgets.Canvas,"setFont",[a]);
},"$wt.graphics.Font");
c$=$_C(function(){
this.H=null;
this.Y=null;
this.$J=null;
this.I=null;
this.$K=null;
this.$L=null;
this.S=null;
this.G=null;
this.R=null;
this.N=false;
this.Q=false;
this.P=false;
this.F=null;
this.X=null;
this.$M=null;
this.O=null;
this.W=null;
this.V=null;
this.U=null;
this.Z=null;
this.T=null;
$_Z(this,arguments);
},$wt.widgets,"Decorations",$wt.widgets.Canvas);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Decorations,[a,$wt.widgets.Decorations.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addMenu",
function(a){
if(this.$L==null)this.$L=new Array(4);
for(var b=0;b<this.$L.length;b++){
if(this.$L[b]==null){
this.$L[b]=a;
return;
}}
var c=new Array(this.$L.length+4);
c[this.$L.length]=a;
System.arraycopy(this.$L,0,c,0,this.$L.length);
this.$L=c;
},"$wt.widgets.Menu");
$_M(c$,"bringToTop",
function(){
this.e.style.visibility="visible";
if(w$.currentTopZIndex==null){
this.e.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.e.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
if((a&8)!=0){
a&=-3313;
}if((a&(1216))!=0){
a|=32;
}if((a&(1152))!=0)a|=64;
if((a&64)!=0)a|=32;
return a;
},"~N");
$_V(c$,"checkBorder",
function(){
});
$_V(c$,"checkOpened",
function(){
if(!this.P)this.Q=false;
});
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"closeWidget",
function(){
var a=new $wt.widgets.Event();
a.doit=true;
this.sendEvent(21,a);
if(a.doit&&!this.isDisposed())this.dispose();
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
return this.F;
});
$_V(c$,"computeTrim",
function(a,b,c,d){
if((this.i&8)==0){
if((this.i&(1248))!=0){
d+=20;
if(c<105){
c=105;
}}if((this.i&(3296))!=0){
c+=8;
d+=8;
a-=4;
b-=4;
}else{
c+=4;
d+=4;
a-=2;
b-=2;
}}System.err.println(new $wt.graphics.Rectangle(a,b,c,d));
return new $wt.graphics.Rectangle(a,b,c,d);
},"~N,~N,~N,~N");
$_M(c$,"createAccelerators",
function(){
});
$_M(c$,"createIcon",
function(a){
return null;
},"$wt.graphics.Image");
$_M(c$,"createCSSDiv",
($fz=function(a){
var b=d$.createElement("DIV");
b.className=a;
this.e.appendChild(b);
return b;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"createResizeHandles",
($fz=function(){
var a=["shell-left-top","shell-right-top","shell-center-top","shell-left-middle","shell-right-middle","shell-center-middle","shell-left-bottom","shell-right-bottom","shell-center-bottom"];
for(var b=0;b<a.length;b++){
this.createCSSDiv(a[b]);
}
},$fz.isPrivate=true,$fz));
$_V(c$,"createHandle",
function(){
if((this.i&65536)!=0||(this.i&32768)!=0){
this.b.timerExec(25,(function(i$,v$){
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
}this.e=d$.createElement("DIV");
this.e.className="shell-default";
this.nextWindowLocation();
this.x=768;
this.w=557;
if(new Boolean((this.i&8)==0&(this.i&16)!=0)){
this.e.className+=" shell-trim";
}d$.body.appendChild(this.e);
if((this.i&8)==0&&(this.i&16)!=0){
this.createResizeHandles();
}if((this.i&8)==0&&(this.i&(1248))!=0){
this.setSystemMenu();
}this.F=this.createCSSDiv("shell-content");
var a=new $wt.internal.dnd.DragAndDrop();
a.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$2",$wt.internal.dnd.ShellFrameDND);
$_M(c$,"isDraggable",
function(a){
if($_U(this,$wt.widgets.Decorations$2,"isDraggable",[a])){
var b=a.target.className;
if(b.indexOf("shell-title-text")!=-1&&this.b$["$wt.widgets.Decorations"].O!=null){
return false;
}return true;
}else{
return false;
}},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"updateShellBounds",
function(a,b,c,d){
this.b$["$wt.widgets.Decorations"].setBounds(a,b,c,d);
return true;
},"~N,~N,~N,~N");
c$=$_P();
}
return $_N($wt.widgets.Decorations$2,i$,v$);
})(this,null));
a.bind(this.e);
});
$_M(c$,"nextWindowLocation",
($fz=function(){
if(w$.defaultWindowLeft==null){
w$.defaultWindowLeft="332";
}else{
var a=Integer.parseInt(""+w$.defaultWindowLeft);
a+=32;
if(a>d$.body.clientWidth){
a=32;
}w$.defaultWindowLeft=""+a;
}if(w$.defaultWindowTop==null){
w$.defaultWindowTop="32";
}else{
var a=Integer.parseInt(""+w$.defaultWindowTop);
a+=32;
if(a>d$.body.clientHeight){
a=32;
}w$.defaultWindowTop=""+a;
}if(w$.defaultWindowWidth==null){
w$.defaultWindowWidth="768";
}if(w$.defaultWindowHeight==null){
w$.defaultWindowHeight="557";
}this.z=Integer.parseInt(w$.defaultWindowLeft);
this.y=Integer.parseInt(w$.defaultWindowTop);
this.x=Integer.parseInt(w$.defaultWindowWidth);
this.w=Integer.parseInt(w$.defaultWindowHeight);
},$fz.isPrivate=true,$fz));
$_M(c$,"addModalLayer",
function(){
this.$M=d$.createElement("DIV");
this.$M.className="shell-modal-block";
this.$M.style.zIndex=""+(Integer.parseInt(""+this.e.style.zIndex)-1);
d$.body.insertBefore(this.$M,this.e);
});
$_M(c$,"exportHTMLSource",
function(){
var a=new $wt.widgets.Shell(this.b,66800);
a.setText("Export HTML Source");
var b=this.F.innerHTML;
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
}a.setLayout(new $wt.layout.GridLayout());
var c=new $wt.widgets.Text(a,2570);
var d=new $wt.layout.GridData(1808);
d.widthHint=400;
d.heightHint=275;
c.setLayoutData(d);
var e=this.getClientArea();
var f="<div class=\"shell-content\" style=\"" + "width:" + e.width + "px;height:" + e.height + "px;\">"+b+"</div>";
c.setText(f);
new $wt.widgets.Label(a,258).setLayoutData(new $wt.layout.GridData(768));
var g=new $wt.widgets.Button(a,8);
g.setText("&OK");
var h=new $wt.layout.GridData(128);
h.widthHint=80;
g.setLayoutData(h);
g.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$3",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(a){
this.f$.a.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Decorations$3,i$,v$);
})(this,$_F("a",a)));
a.pack();
a.open();
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
var a=this.getShell();
a.setFocus();
}}$_U(this,$wt.widgets.Decorations,"dispose",[]);
});
$_M(c$,"findMenu",
function(a){
if(this.$L==null)return null;
for(var b=0;b<this.$L.length;b++){
var c=this.$L[b];
if(c!=null&&a==c.handle)return c;
}
return null;
},"$wt.internal.xhtml.Element");
$_M(c$,"fixDecorations",
function(a,b,c){
if(this==a)return;
if(b==this.S)this.S=null;
if(b==this.G)this.G=null;
if(b==this.R)this.R=null;
if(c==null)return;
var d=b.menu;
if(d!=null){
var e=0;
while(e<c.length){
if(c[e]==d){
b.setMenu(null);
return;
}e++;
}
d.fixMenus(a);
this.destroyAccelerators();
a.destroyAccelerators();
}},"$wt.widgets.Decorations,$wt.widgets.Control,~A");
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Decorations,"getBounds",[]);
});
$_M(c$,"minable",
($fz=function(){
return(this.i&128)!=0&&((this.i&2048)==0||(this.i&16)!=0);
},$fz.isPrivate=true,$fz));
$_V(c$,"getBorderWidth",
function(){
return(this.i&8)!=0?1:0;
});
$_V(c$,"getClientArea",
function(){
var a=this.x;
var b=this.w;
if((this.i&(1248))!=0){
b-=20;
a-=8;
b-=8;
if((this.i&2048)!=0){
a-=4;
b-=4;
}}return new $wt.graphics.Rectangle(0,0,a,b);
});
$_M(c$,"getDefaultButton",
function(){
return this.G;
});
$_M(c$,"getImage",
function(){
return this.H;
});
$_M(c$,"getImages",
function(){
if(this.I==null)return new Array(0);
var a=new Array(this.I.length);
System.arraycopy(this.I,0,a,0,this.I.length);
return a;
});
$_V(c$,"getLocation",
function(){
return new $wt.graphics.Point(this.z,this.y);
});
$_M(c$,"getMaximized",
function(){
return false;
});
$_M(c$,"getMenuBar",
function(){
return this.$K;
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
var a=$_U(this,$wt.widgets.Decorations,"getSize",[]);
a.y+=26;
return a;
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
if(this.W!=null){
BrowserNative.releaseHandle(this.W);
this.W=null;
}if(this.V!=null){
BrowserNative.releaseHandle(this.V);
this.V=null;
}if(this.T!=null){
BrowserNative.releaseHandle(this.T);
this.T=null;
}if(this.U!=null){
BrowserNative.releaseHandle(this.U);
this.U=null;
}if(this.X!=null){
BrowserNative.releaseHandle(this.X);
this.X=null;
}if(this.Z!=null){
BrowserNative.releaseHandle(this.Z);
this.Z=null;
}if(this.F!=null){
BrowserNative.releaseHandle(this.F);
this.F=null;
}if(this.$M!=null){
BrowserNative.releaseHandle(this.$M);
this.$M=null;
}$_U(this,$wt.widgets.Decorations,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
if(this.$K!=null)this.$K.releaseResources();
this.$K=null;
if(this.$L!=null){
do{
var a=0;
while(a<this.$L.length){
var b=this.$L[a];
if(b!=null&&!b.isDisposed()){
while(b.getParentMenu()!=null){
b=b.getParentMenu();
}
b.dispose();
break;
}a++;
}
if(a==this.$L.length)break;
}while(true);
}this.$L=null;
$_U(this,$wt.widgets.Decorations,"releaseWidget",[]);
if(this.Y!=null)this.Y.dispose();
if(this.$J!=null)this.$J.dispose();
this.Y=this.$J=this.H=null;
this.I=null;
this.S=null;
this.G=this.R=null;
});
$_M(c$,"removeMenu",
function(a){
if(this.$L==null)return;
for(var b=0;b<this.$L.length;b++){
if(this.$L[b]==a){
this.$L[b]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"restoreFocus",
function(){
if(this.b.ignoreRestoreFocus)return true;
if(this.S!=null&&this.S.isDisposed())this.S=null;
if(this.S!=null&&this.S.setSavedFocus())return true;
return false;
});
$_M(c$,"saveFocus",
function(){
});
$_V(c$,"setBackground",
function(a){
if(a!=null)this.F.style.backgroundColor=a.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setBounds",
function(a,b,c,d,e,f){
$_U(this,$wt.widgets.Decorations,"setBounds",[a,b,c,d,e,f]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setDefaultButton",
function(a){
this.setDefaultButton(a,true);
},"$wt.widgets.Button");
$_M(c$,"setDefaultButton",
function(a,b){
if(a==null){
if(this.G==this.R){
if(b)this.R=null;
return;
}}else{
if((a.i&8)==0)return;
if(a==this.G)return;
}if(this.G!=null){
if(!this.G.isDisposed())this.G.setDefault(false);
}if((this.G=a)==null)this.G=this.R;
if(this.G!=null){
if(!this.G.isDisposed())this.G.setDefault(true);
}if(b)this.R=this.G;
if(this.R!=null&&this.R.isDisposed())this.R=null;
},"$wt.widgets.Button,~B");
$_V(c$,"setForeground",
function(a){
if(a!=null)this.F.style.color=a.getCSSHandle();
},"$wt.graphics.Color");
$_M(c$,"setImage",
function(a){
this.H=a;
this.setImages(a,null);
this.H=a;
if(this.U!=null&&this.H.handle==null){
var b=this.U.style;
if(a.url.toLowerCase().endsWith(".png")&&this.F.style.filter!=null){
b.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.H.url + "\", sizingMethod=\"image\")";
}else{
b.backgroundRepeat="no-repeat";
b.backgroundPosition="center center";
b.backgroundImage="url(\"" + this.H.url + "\")";
}}},"$wt.graphics.Image");
$_M(c$,"setImages",
function(a,b){
},"$wt.graphics.Image,~A");
$_M(c$,"setImages",
function(a){
for(var b=0;b<a.length;b++){
}
this.I=a;
this.setImage(a[0]);
},"~A");
$_M(c$,"setMaximized",
function(a){
if(a&&this.F!=null){
if(this.O==null){
this.O=this.getBounds();
this.O.width-=2;
}var b=d$.body.clientHeight-0;
if(b>w$.screen.availHeight-10){
b=w$.screen.availHeight-10;
}var c=d$.body.clientWidth;
if(c>w$.screen.availWidth){
c=w$.screen.availWidth;
}this.setBounds(this.computeTrim(0,0,c+2,b-18));
d$.body.scrollTop=0;
}if(a){
$wt.internal.ResizeSystem.register(this,1024);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"toggleMaximize",
function(){
var a="shell-maximized";
if(this.O!=null){
this.setBounds(this.O);
var b=this.Z.className;
if(b==null)b="";
var c=b.indexOf(a);
if(c!=-1){
this.Z.className=b.substring(0,c)+b.substring(c+a.length);
}this.O=null;
$wt.internal.ResizeSystem.unregister(this);
}else{
this.setMaximized(true);
var b=this.Z.className;
if(b==null)b="";
var c=b.indexOf(a);
if(c==-1){
this.Z.className+=" "+a;
}}});
$_M(c$,"setMenuBar",
function(a){
if(this.$K==a)return;
if(a!=null){
}if(this.$K==a)return;
if(a!=null){
}if(a!=null)this.b.removeBar(a);
this.$K=a;
},"$wt.widgets.Menu");
$_M(c$,"setMinimized",
function(a){
if(a&&this.F!=null){
if(this.O==null){
this.O=this.getBounds();
this.O.width-=2;
}var b=this.O.width;
if(b<200){
b=200;
}this.setBounds(-1,d$.body.clientHeight-26,120,0);
}if(a){
$wt.internal.ResizeSystem.register(this,128);
}else{
$wt.internal.ResizeSystem.unregister(this);
}},"~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setSavedFocus",
function(a){
this.S=a;
},"$wt.widgets.Control");
$_M(c$,"setSystemMenu",
function(){
this.Z=d$.createElement("DIV");
this.Z.className="shell-title-bar";
if((this.i&2048)==0||(this.i&16)!=0){
this.U=d$.createElement("DIV");
this.U.className="shell-title-icon";
this.Z.appendChild(this.U);
this.U.onclick=$_Q((function(i$,v$){
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
this.W=d$.createElement("DIV");
this.W.className="shell-title-min";
this.Z.appendChild(this.W);
this.W.onclick=$_Q((function(i$,v$){
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
}if((this.i&1024)!=0){
this.V=d$.createElement("DIV");
this.V.className="shell-title-normal-max";
this.Z.appendChild(this.V);
this.V.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$6")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Decorations"].toggleMaximize();
this.b$["$wt.widgets.Decorations"].b.timerExec(25,(function(i$,v$){
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
}if((this.i&64)!=0){
this.T=d$.createElement("DIV");
this.T.className="shell-title-close";
this.Z.appendChild(this.T);
this.T.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$8")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if($_O(this.b$["$wt.widgets.Decorations"],$wt.widgets.Shell)){
var a=this.b$["$wt.widgets.Decorations"];
a.close();
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$8,i$,v$);
})(this,null));
}this.X=d$.createElement("DIV");
this.X.className="shell-title-text";
this.Z.appendChild(this.X);
if((this.i&1024)!=0){
this.Z.ondblclick=this.V.onclick;
}this.e.appendChild(this.Z);
this.Z.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Decorations$9")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Decorations$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.b$["$wt.widgets.Decorations"].e.style;
if(a.zIndex!=w$.currentTopZIndex){
a.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
c$=$_P();
}
return $_N($wt.widgets.Decorations$9,i$,v$);
})(this,null));
if(w$.currentTopZIndex==null){
this.e.style.zIndex=w$.currentTopZIndex="1000";
}else{
this.e.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
}});
$_M(c$,"setText",
function(a){
if(this.X!=null&&this.X.childNodes!=null){
for(var b=this.X.childNodes.length-1;b>=0;b--){
if(this.X.childNodes[b]!=null){
this.X.removeChild(this.X.childNodes[b]);
}}
this.X.appendChild(d$.createTextNode(a));
}},"~S");
$_V(c$,"setVisible",
function(a){
if(this.drawCount!=0){
if(((this.h&16)==0)==a)return;
}else{
if(a==(this.F.style.visibility!="hidden"))return;
}if(a){
this.sendEvent(22);
if(this.isDisposed())return;
}else{
if(this.isDisposed())return;
this.sendEvent(23);
}},"~B");
$_V(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
if((this.i&8)==0){
var h=0;
var i=0;
if((this.i&(1248))!=0){
h=113;
i=28;
}if((this.i&2048)!=0){
h+=2;
i+=2;
}if(this.x<h){
this.x=h;
e=h;
}if(this.w<i){
this.w=i;
f=i;
}}if((this.i&8)!=0){
this.F.style.height=this.w+"px";
this.F.style.width=this.x+"px";
}else if(this.Z!=null){
var h=8;
var i=28;
var j=8;
if((this.i&2048)!=0){
h+=2;
i+=3;
j+=2;
}this.F.style.height=((this.w-i>=0)?this.w-i:0)+"px";
this.F.style.width=((this.x-h)>0?this.x-h:0)+"px";
this.Z.style.width=((this.x-j)>0?this.x-j:0)+"px";
var k=18;
var l=k;
if(this.T!=null){
this.T.style.left=(this.x-8-2-l)+"px";
l+=k;
}if(this.V!=null){
this.V.style.left=(this.x-8-2-l)+"px";
l+=k;
}if(this.W!=null){
this.W.style.left=(this.x-8-2-l)+"px";
l+=k;
}l-=k;
if(this.U!=null){
this.U.style.left=2+"px";
this.X.style.left=(4+k)+"px";
l+=k;
}else{
this.X.style.left=4+"px";
}this.X.style.width=(this.x-8-8-l)+"px";
}else{
this.x-=4;
this.w-=4;
e-=4;
f-=4;
var h=7;
var i=7;
this.F.style.height=((this.w-i>=0)?this.w-i:0)+"px";
this.F.style.width=(this.x-h>0?this.x-h:0)+"px";
this.F.style.top=2+"px";
this.F.style.marginRight=1+"px";
}if((this.i&2048)!=0){
e-=4;
f-=4;
}var h=a;
h.style.left=c+"px";
h.style.top=d+"px";
h.style.width=(e>0?e:0)+"px";
h.style.height=(f>0?f:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"traverseDecorations",
function(a){
var b=this.parent._getChildren();
var c=b.length;
var d=0;
while(d<c){
if(b[d]==this)break;
d++;
}
var e=d;
var f=(a)?1:-1;
while((d=(d+f+c)%c)!=e){
var g=b[d];
if(!g.isDisposed()&&$_O(g,$wt.widgets.Decorations)){
if(g.setFocus())return true;
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
function(a){
this.construct(null,a);
},"~N");
$_K(c$,
function(a){
this.construct(a,1264);
},"$wt.widgets.Display");
$_K(c$,
function(a,b){
this.construct(a,null,b,0);
},"$wt.widgets.Display,~N");
$_K(c$,
function(a,b,c,d){
this.checkSubclass();
this.K=new Array(0);
if(a==null)a=$wt.widgets.Display.getCurrent();
if(a==null)a=$wt.widgets.Display.getDefault();
this.i=$wt.widgets.Shell.checkStyle(c);
this.parent=b;
this.b=a;
this.createWidget();
},"$wt.widgets.Display,$wt.widgets.Shell,~N,~N");
$_K(c$,
function(a){
this.construct(a,2144);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
this.construct(a!=null?a.b:null,a,b,0);
},"$wt.widgets.Shell,~N");
c$.win32_new=$_M(c$,"win32_new",
function(a,b){
return new $wt.widgets.Shell(a,null,8,b);
},"$wt.widgets.Display,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a=$wt.widgets.Decorations.checkStyle(a);
var b=229376;
var c=a&~b;
if((a&131072)!=0)return c|131072;
if((a&65536)!=0)return c|65536;
if((a&32768)!=0)return c|32768;
return c;
},"~N");
$_M(c$,"addShellListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(21,b);
this.addListener(19,b);
this.addListener(20,b);
this.addListener(26,b);
this.addListener(27,b);
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
function(a){
if(a){
this.h&=-9;
}else{
this.h|=8;
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
function(a,b){
if(this==a)return;
if(b==this.lastActive)this.setActiveControl(null);
a.setToolTipText(b.e,b.toolTipText);
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
return(this.h&8)==0;
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
var a=Math.max(0,this.minWidth);
var b=1248;
if((this.i&8)==0&&(this.i&b)!=0){
a=Math.max(a,80);
}var c=Math.max(0,this.minHeight);
if((this.i&8)==0&&(this.i&b)!=0){
if((this.i&16)!=0){
c=Math.max(c,24);
}else{
c=Math.max(c,24);
}}if((this.i&8)!=0){
return new $wt.graphics.Point(this.minWidth,Math.max(this.minHeight-24,0));
}return new $wt.graphics.Point(a,c);
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
var a=0;
var b=this.b.getShells();
for(var c=0;c<b.length;c++){
var d=b[c];
do{
d=d.parent;
}while(d!=null&&d!=this);
if(d==this)a++;
}
var d=0;
var e=new Array(a);
for(var f=0;f<b.length;f++){
var g=b[f];
do{
g=g.parent;
}while(g!=null&&g!=this);
if(g==this){
e[d++]=b[f];
}}
return e;
});
$_V(c$,"isLayoutDeferred",
function(){
return this.J>0;
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
var a=this.getShells();
for(var b=0;b<a.length;b++){
var c=a[b];
if(!c.isDisposed())c.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseShells();
$_U(this,$wt.widgets.Shell,"releaseWidget",[]);
this.activeMenu=null;
this.b.clearModal(this);
this.lastActive=null;
this.region=null;
});
$_M(c$,"removeMenu",
function(a){
$_U(this,$wt.widgets.Shell,"removeMenu",[a]);
if(a==this.activeMenu)this.activeMenu=null;
},"$wt.widgets.Menu");
$_M(c$,"removeShellListener",
function(a){
if(this.d==null)return;
this.d.unhook(21,a);
this.d.unhook(19,a);
this.d.unhook(20,a);
this.d.unhook(26,a);
this.d.unhook(27,a);
},"$wt.events.ShellListener");
$_M(c$,"setActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_M(c$,"setActiveControl",
function(a){
if(a!=null&&a.isDisposed())a=null;
if(this.lastActive!=null&&this.lastActive.isDisposed())this.lastActive=null;
if(this.lastActive==a)return;
var b=(a==null)?new Array(0):a.getPath();
var c=(this.lastActive==null)?new Array(0):this.lastActive.getPath();
this.lastActive=a;
var d=0;
var e=Math.min(b.length,c.length);
while(d<e){
if(b[d]!=c[d])break;
d++;
}
for(var f=c.length-1;f>=d;--f){
if(!c[f].isDisposed()){
c[f].sendEvent(27);
}}
for(var g=b.length-1;g>=d;--g){
if(!b[g].isDisposed()){
b[g].sendEvent(26);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(a,b,c,d,e,f){
$_U(this,$wt.widgets.Shell,"setBounds",[a,b,c,d,e,false]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setEnabled",
function(a){
if(((this.h&8)==0)==a)return;
$_U(this,$wt.widgets.Shell,"setEnabled",[a]);
},"~B");
$_M(c$,"setImeInputMode",
function(a){
},"~N");
$_M(c$,"setMinimumSize",
function(a,b){
var c=0;
var d=0;
var e=1248;
if((this.i&8)==0&&(this.i&e)!=0){
}this.minWidth=Math.max(c,a);
this.minHeight=Math.max(d,b);
var f=this.getSize();
var g=Math.max(f.x,this.minWidth);
var h=Math.max(f.y,this.minHeight);
if(this.minWidth<=c)this.minWidth=-1;
if(this.minHeight<=d)this.minHeight=-1;
if(g!=f.x||h!=f.y)this.setSize(g,h);
},"~N,~N");
$_M(c$,"setMinimumSize",
function(a){
this.setMinimumSize(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setItemEnabled",
function(a,b){
},"~N,~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setRegion",
function(a){
if((this.i&8)==0)return;
},"$wt.graphics.Region");
$_M(c$,"setToolTipText",
function(a,b){
},"$wt.internal.xhtml.Element,~S");
$_M(c$,"setVisible",
function(a){
$_U(this,$wt.widgets.Shell,"setVisible",[a]);
if(a){
this.SetWindowPos(this.e,null,this.z,this.y,this.x,this.w,0);
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
function(a,b){
$_R(this,$wt.widgets.Item,[a,b]);
this.text="";
},"$wt.widgets.Widget,~N");
$_K(c$,
function(a,b,c){
this.construct(a,b);
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
function(a){
this.image=a;
},"$wt.graphics.Image");
$_M(c$,"setText",
function(a){
this.text=a;
},"~S");
c$=$_C(function(){
this.parent=null;
this.menu=null;
this.id=0;
this.accelerator=0;
$_Z(this,arguments);
},$wt.widgets,"MenuItem",$wt.widgets.Item);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.MenuItem,[a,$wt.widgets.MenuItem.checkStyle(b)]);
this.parent=a;
a.createItem(this,a.getItemCount());
},"$wt.widgets.Menu,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.MenuItem,[a,$wt.widgets.MenuItem.checkStyle(b)]);
this.parent=a;
a.createItem(this,c);
},"$wt.widgets.Menu,~N,~N");
$_K(c$,
function(a,b,c,d){
$_R(this,$wt.widgets.MenuItem,[a,$wt.widgets.MenuItem.checkStyle(c)]);
this.parent=a;
this.menu=b;
if(b!=null)b.cascade=this;
this.b.addMenuItem(this);
},"$wt.widgets.Menu,$wt.widgets.Menu,~N,~N");
$_M(c$,"addArmListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(30,b);
},"$wt.events.ArmListener");
$_M(c$,"addHelpListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(28,b);
},"$wt.events.HelpListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_V(c$,"checkSubclass",
function(){
});
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,8,32,16,2,64,0);
},"~N");
$_M(c$,"fixMenus",
function(a){
if(this.menu!=null)this.menu.fixMenus(a);
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
if((this.i&2)!=0)return"|";
return $_U(this,$wt.widgets.MenuItem,"getNameText",[]);
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getSelection",
function(){
if((this.i&(48))==0)return false;
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
if(this.e!=null){
BrowserNative.releaseHandle(this.e);
this.e=null;
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
this.b.removeMenuItem(this);
this.parent=null;
});
$_M(c$,"removeArmListener",
function(a){
if(this.d==null)return;
this.d.unhook(30,a);
},"$wt.events.ArmListener");
$_M(c$,"removeHelpListener",
function(a){
if(this.d==null)return;
this.d.unhook(28,a);
},"$wt.events.HelpListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var a=0;
var b=this.parent.getItems();
while(a<b.length&&b[a]!=this)a++;

var c=a-1;
while(c>=0&&b[c].setRadioSelection(false))--c;

var d=a+1;
while(d<b.length&&b[d].setRadioSelection(false))d++;

this.setSelection(true);
});
$_M(c$,"setAccelerator",
function(a){
if(this.accelerator==a)return;
this.accelerator=a;
this.parent.destroyAccelerators();
},"~N");
$_M(c$,"setEnabled",
function(a){
this.parent.destroyAccelerators();
this.parent.redraw();
},"~B");
$_M(c$,"setImage",
function(a){
if((this.i&2)!=0)return;
$_U(this,$wt.widgets.MenuItem,"setImage",[a]);
this.parent.redraw();
},"$wt.graphics.Image");
$_M(c$,"setMenu",
function(a){
if(a!=null){
}var b=this.menu;
if(b==a)return;
if(b!=null)b.cascade=null;
this.menu=a;
this.parent.destroyAccelerators();
},"$wt.widgets.Menu");
$_M(c$,"setRadioSelection",
function(a){
if((this.i&16)==0)return false;
if(this.getSelection()!=a){
this.setSelection(a);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSelection",
function(a){
if((this.i&(48))==0)return;
this.parent.redraw();
},"~B");
$_M(c$,"setText",
function(a){
if((this.i&2)!=0)return;
if(this.text.equals(a))return;
$_U(this,$wt.widgets.MenuItem,"setText",[a]);
this.parent.redraw();
},"~S");
c$=$_C(function(){
this.handle=null;
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
function(a){
this.construct($wt.widgets.Menu.checkNull(a).menuShell(),8);
},"$wt.widgets.Control");
$_K(c$,
function(a,b){
this.construct(a,$wt.widgets.Menu.checkStyle(b),null);
},"$wt.widgets.Decorations,~N");
$_K(c$,
function(a){
this.construct($wt.widgets.Menu.checkNull(a).parent,4);
},"$wt.widgets.Menu");
$_K(c$,
function(a){
this.construct($wt.widgets.Menu.checkNull(a).parent);
},"$wt.widgets.MenuItem");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.Menu,[a,$wt.widgets.Menu.checkStyle(b)]);
this.parent=a;
this.handle=c;
this.checkOrientation(a);
this.createWidget();
},"$wt.widgets.Decorations,~N,$wt.internal.xhtml.Element");
$_M(c$,"_setVisible",
function(a){
if((this.i&(6))!=0)return;
},"~B");
$_M(c$,"addHelpListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(28,b);
},"$wt.events.HelpListener");
$_M(c$,"addMenuListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(23,b);
this.addListener(22,b);
},"$wt.events.MenuListener");
c$.checkNull=$_M(c$,"checkNull",
function(a){
return a;
},"$wt.widgets.Control");
c$.checkNull=$_M(c$,"checkNull",
function(a){
return a;
},"$wt.widgets.Menu");
c$.checkNull=$_M(c$,"checkNull",
function(a){
return a;
},"$wt.widgets.MenuItem");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,8,2,4,0,0,0);
},"~N");
$_M(c$,"createHandle",
function(){
if(this.handle!=null)return;
this.handle=d$.createElement("DIV");
if(this.parent.e!=null){
this.parent.e.appendChild(this.handle);
}this.handle.className="tool-bar-default";
if((this.i&2)!=0){
}else{
}});
$_M(c$,"createItem",
function(a,b){
var c=this.GetMenuItemCount(this.handle);
this.b.addMenuItem(a);
var d=false;
a.e=d$.createElement("DIV");
a.e.className="tool-item-default";
this.handle.appendChild(a.e);
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
function(a){
this.redraw();
},"$wt.widgets.MenuItem");
$_V(c$,"destroyWidget",
function(){
this.releaseHandle();
});
$_M(c$,"fixMenus",
function(a){
var b=this.getItems();
for(var c=0;c<b.length;c++){
b[c].fixMenus(a);
}
this.parent.removeMenu(this);
a.addMenu(this);
this.parent=a;
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
return(this.h&8)==0;
});
$_M(c$,"getItem",
function(a){
var b=0;
return this.b.getMenuItem(b);
},"~N");
$_M(c$,"getItemCount",
function(){
return this.GetMenuItemCount(this.handle);
});
$_M(c$,"getItems",
function(){
return new Array(0);
});
$_M(c$,"GetMenuItemCount",
function(a){
return 0;
},"$wt.internal.xhtml.Element");
$_V(c$,"getNameText",
function(){
var a="";
var b=this.getItems();
var c=b.length;
if(c>0){
for(var d=0;d<c-1;d++){
a=a+b[d].getNameText()+", ";
}
a=a+b[c-1].getNameText();
}return a;
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
if((this.i&2)!=0){
return this==this.parent.menuShell().$K;
}if((this.i&8)!=0){
var a=this.b.popups;
if(a==null)return false;
for(var b=0;b<a.length;b++){
if(a[b]==this)return true;
}
}var a=this.getShell();
var b=a.activeMenu;
while(b!=null&&b!=this){
b=b.getParentMenu();
}
return this==b;
});
$_M(c$,"imageIndex",
function(a){
var b=this.imageList.indexOf(a);
if(b==-1){
b=this.imageList.add(a);
}else{
this.imageList.put(b,a);
}return b;
},"$wt.graphics.Image");
$_M(c$,"indexOf",
function(a){
if(a.parent!=this)return-1;
return-1;
},"$wt.widgets.MenuItem");
$_M(c$,"isEnabled",
function(){
var a=this.getParentMenu();
if(a==null)return this.getEnabled();
return this.getEnabled()&&a.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"redraw",
function(){
if(!this.isVisible())return;
if((this.i&2)!=0){
this.b.addBar(this);
}else{
this.update();
}});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Menu,"releaseChild",[]);
if(this.cascade!=null)this.cascade.releaseMenu();
if((this.i&2)!=0){
this.b.removeBar(this);
if(this==this.parent.$K){
this.parent.setMenuBar(null);
}}else{
if((this.i&8)!=0){
this.b.removePopup(this);
}}});
$_M(c$,"releaseHandle",
function(){
if(this.handle!=null){
BrowserNative.releaseHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.Menu,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
var a=this.getItems();
for(var b=0;b<a.length;b++){
var c=a[b];
if(!c.isDisposed()){
c.dispose();
}}
$_U(this,$wt.widgets.Menu,"releaseWidget",[]);
if(this.parent!=null)this.parent.removeMenu(this);
this.parent=null;
this.cascade=null;
});
$_M(c$,"removeHelpListener",
function(a){
if(this.d==null)return;
this.d.unhook(28,a);
},"$wt.events.HelpListener");
$_M(c$,"removeMenuListener",
function(a){
if(this.d==null)return;
this.d.unhook(23,a);
this.d.unhook(22,a);
},"$wt.events.MenuListener");
$_M(c$,"setDefaultItem",
function(a){
var b=-1;
if(a!=null){
if(a.parent!=this)return;
b=a.id;
}this.redraw();
},"$wt.widgets.MenuItem");
$_M(c$,"setEnabled",
function(a){
this.h&=-9;
if(!a)this.h|=8;
},"~B");
$_M(c$,"setLocation",
function(a,b){
if((this.i&(6))!=0)return;
this.x=a;
this.y=b;
this.hasLocation=true;
},"~N,~N");
$_M(c$,"setLocation",
function(a){
this.setLocation(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(a){
if((this.i&(6))!=0)return;
if(a){
this.b.addPopup(this);
}else{
this.b.removePopup(this);
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
function(a){
if(a==this)return true;
if(!($_O(a,$wt.widgets.Monitor)))return false;
var b=a;
return this.handle==b.handle;
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
function(a,b){
$_R(this,$wt.widgets.ScrollBar,[a,$wt.widgets.ScrollBar.checkStyle(b)]);
this.parent=a;
this.createWidget();
},"$wt.widgets.Scrollable,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,256,512,0,0,0,0);
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
return(this.h&8)==0;
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
return(this.h&16)==0;
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
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(a){
},"~B");
$_M(c$,"setIncrement",
function(a){
if(a<1)return;
this.increment=a;
},"~N");
$_M(c$,"setMaximum",
function(a){
if(a<0)return;
},"~N");
$_M(c$,"setMinimum",
function(a){
if(a<0)return;
},"~N");
$_M(c$,"setPageIncrement",
function(a){
if(a<1)return;
this.pageIncrement=a;
},"~N");
$_M(c$,"setSelection",
function(a){
},"~N");
$_M(c$,"setThumb",
function(a){
if(a<1)return;
},"~N");
$_M(c$,"setValues",
function(a,b,c,d,e,f){
if(b<0)return;
if(c<0)return;
if(d<1)return;
if(e<1)return;
if(f<1)return;
this.increment=e;
this.pageIncrement=f;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"setVisible",
function(a){
var b=(this.h&16)==0;
if(b==a)return;
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
function(a){
$_R(this,$wt.widgets.Display,[a]);
},"$wt.graphics.DeviceData");
$_M(c$,"addBar",
function(a){
if(this.bars==null)this.bars=new Array(4);
var b=this.bars.length;
for(var c=0;c<b;c++){
if(this.bars[c]==a)return;
}
var d=0;
while(d<b){
if(this.bars[d]==null)break;
d++;
}
if(d==b){
var e=new Array(b+4);
System.arraycopy(this.bars,0,e,0,b);
this.bars=e;
}this.bars[d]=a;
},"$wt.widgets.Menu");
$_M(c$,"addControl",
function(a,b){
if(b==null)return;
this.controlTable[this.controlTable.length]=b;
},"Object,$wt.widgets.Control");
$_M(c$,"addFilter",
function(a,b){
if(this.filterTable==null)this.filterTable=new $wt.widgets.EventTable();
this.filterTable.hook(a,b);
},"~N,$wt.widgets.Listener");
$_M(c$,"addListener",
function(a,b){
if(this.eventTable==null)this.eventTable=new $wt.widgets.EventTable();
this.eventTable.hook(a,b);
},"~N,$wt.widgets.Listener");
$_M(c$,"addMenuItem",
function(a){
if(this.items==null)this.items=new Array(64);
for(var b=0;b<this.items.length;b++){
if(this.items[b]==null){
a.id=b+108;
this.items[b]=a;
return;
}}
a.id=this.items.length+108;
var c=new Array(this.items.length+64);
c[this.items.length]=a;
System.arraycopy(this.items,0,c,0,this.items.length);
this.items=c;
},"$wt.widgets.MenuItem");
$_M(c$,"addPopup",
function(a){
if(this.popups==null)this.popups=new Array(4);
var b=this.popups.length;
for(var c=0;c<b;c++){
if(this.popups[c]==a)return;
}
var d=0;
while(d<b){
if(this.popups[d]==null)break;
d++;
}
if(d==b){
var e=new Array(b+4);
System.arraycopy(this.popups,0,e,0,b);
this.popups=e;
}this.popups[d]=a;
},"$wt.widgets.Menu");
$_M(c$,"asciiKey",
function(a){
return 0;
},"~N");
$_M(c$,"asyncExec",
function(a){
w$.setTimeout($_Q(a),10);
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
function(a,b){
for(var c=0;c<$wt.widgets.Display.Displays.length;c++){
if($wt.widgets.Display.Displays[c]!=null){
}}
},"Thread,~B");
$_M(c$,"clearModal",
function(a){
if(this.modalShells==null)return;
var b=0;
var c=this.modalShells.length;
while(b<c){
if(this.modalShells[b]==a)break;
if(this.modalShells[b]==null)return;
b++;
}
if(b==c)return;
System.arraycopy(this.modalShells,b+1,this.modalShells,b,--c-b);
this.modalShells[c]=null;
if(b==0&&this.modalShells[0]==null)this.modalShells=null;
var d=this.getShells();
for(var e=0;e<d.length;e++)d[e].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"close",
function(){
var a=new $wt.widgets.Event();
this.sendEvent(21,a);
if(a.doit)this.dispose();
});
$_V(c$,"create",
function(a){
this.checkSubclass();
$wt.widgets.Display.checkDisplay(this.thread=Thread.currentThread(),true);
this.createDisplay(a);
$wt.widgets.Display.register(this);
if($wt.widgets.Display.Default==null)($t$=$wt.widgets.Display.Default=this,$wt.widgets.Display.prototype.Default=$wt.widgets.Display.Default,$t$);
},"$wt.graphics.DeviceData");
$_M(c$,"createDisplay",
function(a){
},"$wt.graphics.DeviceData");
c$.deregister=$_M(c$,"deregister",
function(a){
for(var b=0;b<$wt.widgets.Display.Displays.length;b++){
if(a==$wt.widgets.Display.Displays[b])$wt.widgets.Display.Displays[b]=null;
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
function(a){
if(this.disposeList==null)this.disposeList=new Array(4);
for(var b=0;b<this.disposeList.length;b++){
if(this.disposeList[b]==null){
this.disposeList[b]=a;
return;
}}
var c=new Array(this.disposeList.length+4);
System.arraycopy(this.disposeList,0,c,0,this.disposeList.length);
c[this.disposeList.length]=a;
this.disposeList=c;
},"Runnable");
$_M(c$,"drawMenuBars",
function(){
if(this.bars==null)return;
for(var a=0;a<this.bars.length;a++){
var b=this.bars[a];
if(b!=null&&!b.isDisposed())b.update();
}
this.bars=null;
});
$_M(c$,"error",
function(a){
$WT.error(a);
},"~N");
$_M(c$,"filterEvent",
function(a){
if(this.filterTable!=null)this.filterTable.sendEvent(a);
return false;
},"$wt.widgets.Event");
$_M(c$,"filters",
function(a){
if(this.filterTable==null)return false;
return this.filterTable.hooks(a);
},"~N");
$_M(c$,"findControl",
function(a){
if(a==0)return null;
return null;
},"~N");
$_M(c$,"findWidget",
function(a){
return null;
},"~N");
$_M(c$,"findWidget",
function(a,b){
return null;
},"~N,~N");
c$.findDisplay=$_M(c$,"findDisplay",
function(a){
for(var b=0;b<$wt.widgets.Display.Displays.length;b++){
var c=$wt.widgets.Display.Displays[b];
if(c!=null&&c.thread==a){
return c;
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
function(a){
if(a==null)return null;
for(var b=0;b<this.controlTable.length;b++){
if(this.controlTable[b]!=null&&a==this.controlTable[b].e){
return this.controlTable[b];
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
function(a){
var b=a.getName();
var c=b.lastIndexOf('.');
return b.substring(0,c+1).equals($wt.widgets.Display.PACKAGE_PREFIX);
},"Class");
$_M(c$,"getData",
function(a){
if(this.keys==null)return null;
for(var b=0;b<this.keys.length;b++){
if(this.keys[b].equals(a))return this.values[b];
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
function(a,b,c){
if(this.imageList==null)this.imageList=new Array(4);
var d=0;
var e=this.imageList.length;
while(d<e){
var f=this.imageList[d];
if(f==null)break;
var g=f.getImageSize();
if(g.x==b&&g.y==c){
if(f.getStyle()==a){
f.addRef();
return f;
}}d++;
}
if(d==e){
var f=new Array(e+4);
System.arraycopy(this.imageList,0,f,0,e);
this.imageList=f;
}var f=new $wt.widgets.ImageList(a);
this.imageList[d]=f;
f.addRef();
return f;
},"~N,~N,~N");
$_M(c$,"getImageListToolBar",
function(a,b,c){
if(this.toolImageList==null)this.toolImageList=new Array(4);
var d=0;
var e=this.toolImageList.length;
while(d<e){
var f=this.toolImageList[d];
if(f==null)break;
var g=f.getImageSize();
if(g.x==b&&g.y==c){
if(f.getStyle()==a){
f.addRef();
return f;
}}d++;
}
if(d==e){
var f=new Array(e+4);
System.arraycopy(this.toolImageList,0,f,0,e);
this.toolImageList=f;
}var f=new $wt.widgets.ImageList(a);
this.toolImageList[d]=f;
f.addRef();
return f;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarDisabled",
function(a,b,c){
if(this.toolDisabledImageList==null)this.toolDisabledImageList=new Array(4);
var d=0;
var e=this.toolDisabledImageList.length;
while(d<e){
var f=this.toolDisabledImageList[d];
if(f==null)break;
var g=f.getImageSize();
if(g.x==b&&g.y==c){
if(f.getStyle()==a){
f.addRef();
return f;
}}d++;
}
if(d==e){
var f=new Array(e+4);
System.arraycopy(this.toolDisabledImageList,0,f,0,e);
this.toolDisabledImageList=f;
}var f=new $wt.widgets.ImageList(a);
this.toolDisabledImageList[d]=f;
f.addRef();
return f;
},"~N,~N,~N");
$_M(c$,"getImageListToolBarHot",
function(a,b,c){
if(this.toolHotImageList==null)this.toolHotImageList=new Array(4);
var d=0;
var e=this.toolHotImageList.length;
while(d<e){
var f=this.toolHotImageList[d];
if(f==null)break;
var g=f.getImageSize();
if(g.x==b&&g.y==c){
if(f.getStyle()==a){
f.addRef();
return f;
}}d++;
}
if(d==e){
var f=new Array(e+4);
System.arraycopy(this.toolHotImageList,0,f,0,e);
this.toolHotImageList=f;
}var f=new $wt.widgets.ImageList(a);
this.toolHotImageList[d]=f;
f.addRef();
return f;
},"~N,~N,~N");
$_M(c$,"getLastEventTime",
function(){
return parseInt(new java.util.Date().getTime());
});
$_M(c$,"getMenuItem",
function(a){
if(this.items==null)return null;
a=a-108;
if(0<=a&&a<this.items.length)return this.items[a];
return null;
},"~N");
$_M(c$,"getModalShell",
function(){
if(this.modalShells==null)return null;
var a=this.modalShells.length;
while(--a>=0){
var b=this.modalShells[a];
if(b!=null)return b;
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
var a=new $wt.widgets.Monitor();
a.handle=220284;
a.clientWidth=a.width=d$.body.clientWidth;
a.clientHeight=a.height=d$.body.clientHeight;
a.clientX=a.x=0;
a.clientY=a.y=0;
return[a];
});
$_M(c$,"getPrimaryMonitor",
function(){
var a=new $wt.widgets.Monitor();
a.handle=220284;
a.clientWidth=a.width=d$.body.clientWidth;
a.clientHeight=a.height=d$.body.clientHeight;
a.clientX=a.x=0;
a.clientY=a.y=0;
return a;
});
$_M(c$,"getShells",
function(){
var a=0;
for(var b=0;b<this.controlTable.length;b++){
var c=this.controlTable[b];
if(c!=null&&$_O(c,$wt.widgets.Shell))a++;
}
var c=0;
var d=new Array(a);
for(var e=0;e<this.controlTable.length;e++){
var f=this.controlTable[e];
if(f!=null&&$_O(f,$wt.widgets.Shell)){
d[c++]=f;
}}
return d;
});
$_M(c$,"getSyncThread",
function(){
return null;
});
$_M(c$,"getSystemColor",
function(a){
var b="#000000";
switch(a){
case 17:
b="ThreeDDarkShadow";
break;
case 18:
b="ThreeDShadow";
break;
case 19:
b="ThreeDLightShadow";
break;
case 20:
b="ThreeDHighlight";
break;
case 22:
b="ThreeDFace";
break;
case 23:
b="WindowFrame";
break;
case 21:
case 24:
b="WindowText";
break;
case 25:
b="Window";
break;
case 26:
b="Highlight";
break;
case 27:
b="HighlightText";
break;
case 28:
b="InfoText";
break;
case 29:
b="InfoBackground";
break;
case 30:
b="CaptionText";
break;
case 31:
b="ActiveCaption";
break;
case 32:
b="ActiveCaption";
break;
case 33:
b="InactiveCaptionText";
break;
case 34:
b="InactiveCaption";
break;
case 35:
b="InactiveCaption";
break;
default:
return $_U(this,$wt.widgets.Display,"getSystemColor",[a]);
}
return new $wt.graphics.Color(null,b);
},"~N");
$_M(c$,"getSystemCursor",
function(a){
if(!(0<=a&&a<this.cursors.length))return null;
if(this.cursors[a]==null){
this.cursors[a]=new $wt.graphics.Cursor(this,a);
}return this.cursors[a];
},"~N");
$_V(c$,"getSystemFont",
function(){
return new $wt.graphics.Font(this,"Tahoma,Arial",10,0);
});
$_M(c$,"getSystemImage",
function(a){
var b=null;
switch(a){
case 1:
b="error";
break;
case 16:
case 2:
b="information";
break;
case 4:
b="question";
break;
case 8:
b="warning";
break;
}
if(b==null)return null;
return new $wt.graphics.Image(this,"j2slib/images/"+b+".png");
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
for(var a=0;a<1023;a++)this.indexTable[a]=a+1;

this.indexTable[1023]=-1;
this.msgs=new Array(0);
this.messageProc=0;
});
$_M(c$,"isValidThread",
function(){
return this.thread==Thread.currentThread();
});
$_M(c$,"map",
function(a,b,c){
return this.map(a,b,c.x,c.y);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Point");
$_M(c$,"map",
function(a,b,c,d){
var e=a!=null?a.e:null;
var f=b!=null?b.e:null;
return new $wt.graphics.Point(0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N");
$_M(c$,"map",
function(a,b,c){
return this.map(a,b,c.x,c.y,c.width,c.height);
},"$wt.widgets.Control,$wt.widgets.Control,$wt.graphics.Rectangle");
$_M(c$,"map",
function(a,b,c,d,e,f){
var g=a!=null?a.e:null;
var h=b!=null?b.e:null;
return new $wt.graphics.Rectangle(0,0,0,0);
},"$wt.widgets.Control,$wt.widgets.Control,~N,~N,~N,~N");
$_M(c$,"post",
function(a){
var b=a.type;
switch(b){
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
function(a){
if(this.eventQueue==null)this.eventQueue=new Array(4);
var b=0;
var c=this.eventQueue.length;
while(b<c){
if(this.eventQueue[b]==null)break;
b++;
}
if(b==c){
var d=new Array(c+4);
System.arraycopy(this.eventQueue,0,d,0,c);
this.eventQueue=d;
}this.eventQueue[b]=a;
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
var a=this.b$["$wt.widgets.Display"].msgs;
if(a.length!=0){
for(var b=a.length-1;b>=0;b--){
var c=a[b];
if(c==null){
continue;}for(var d=b-1;d>=0;d--){
var e=a[d];
if(e!=null&&e.control==c.control&&e.type==c.type){
a[d]=null;
break;
}}
}
var c=0;
for(var d=0;d<a.length;d++){
var e=a[d];
a[d]=null;
if(e!=null&&e.type==2){
if(!e.control.isVisible()){
continue;}var f=new java.util.Date();
var g=e.control;
if(e.data!=null){
var h=e.data;
g.updateLayout(h[0],h[1]);
}else{
g.layout();
}c+=new java.util.Date().getTime()-f.getTime();
if(c>100){
for(var h=d+1;h<a.length;h++){
a[h-d-1]=a[h];
}
for(var i=0;i<d;i++){
a[a.length-1-i]=null;
}
{
a.length-=d+1;
}return;
}}}
{
a.length=0;
}}});
c$=$_P();
}
return $_N($wt.widgets.Display$3,i$,v$);
})(this,null)),20);
return true;
});
c$.register=$_M(c$,"register",
function(a){
for(var b=0;b<$wt.widgets.Display.Displays.length;b++){
if($wt.widgets.Display.Displays[b]==null){
$wt.widgets.Display.Displays[b]=a;
return;
}}
var c=new Array($wt.widgets.Display.Displays.length+4);
System.arraycopy($wt.widgets.Display.Displays,0,c,0,$wt.widgets.Display.Displays.length);
c[$wt.widgets.Display.Displays.length]=a;
($t$=$wt.widgets.Display.Displays=c,$wt.widgets.Display.prototype.Displays=$wt.widgets.Display.Displays,$t$);
},"$wt.widgets.Display");
$_M(c$,"release",
function(){
this.sendEvent(12,new $wt.widgets.Event());
var a=this.getShells();
for(var b=0;b<a.length;b++){
var c=a[b];
if(!c.isDisposed())c.dispose();
}
if(this.disposeList!=null){
for(var c=0;c<this.disposeList.length;c++){
if(this.disposeList[c]!=null)this.disposeList[c].run();
}
}this.disposeList=null;
this.releaseDisplay();
$_U(this,$wt.widgets.Display,"release",[]);
});
$_M(c$,"releaseDisplay",
function(){
for(var a=0;a<this.cursors.length;a++){
if(this.cursors[a]!=null)this.cursors[a].dispose();
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
function(a){
var b=0;
var c=this.imageList.length;
while(b<c){
if(this.imageList[b]==a){
if(a.removeRef()>0)return;
a.dispose();
System.arraycopy(this.imageList,b+1,this.imageList,b,--c-b);
this.imageList[c]=null;
for(var d=0;d<c;d++){
if(this.imageList[d]!=null)return;
}
this.imageList=null;
return;
}b++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolImageList",
function(a){
var b=0;
var c=this.toolImageList.length;
while(b<c){
if(this.toolImageList[b]==a){
if(a.removeRef()>0)return;
a.dispose();
System.arraycopy(this.toolImageList,b+1,this.toolImageList,b,--c-b);
this.toolImageList[c]=null;
for(var d=0;d<c;d++){
if(this.toolImageList[d]!=null)return;
}
this.toolImageList=null;
return;
}b++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolHotImageList",
function(a){
var b=0;
var c=this.toolHotImageList.length;
while(b<c){
if(this.toolHotImageList[b]==a){
if(a.removeRef()>0)return;
a.dispose();
System.arraycopy(this.toolHotImageList,b+1,this.toolHotImageList,b,--c-b);
this.toolHotImageList[c]=null;
for(var d=0;d<c;d++){
if(this.toolHotImageList[d]!=null)return;
}
this.toolHotImageList=null;
return;
}b++;
}
},"$wt.widgets.ImageList");
$_M(c$,"releaseToolDisabledImageList",
function(a){
var b=0;
var c=this.toolDisabledImageList.length;
while(b<c){
if(this.toolDisabledImageList[b]==a){
if(a.removeRef()>0)return;
a.dispose();
System.arraycopy(this.toolDisabledImageList,b+1,this.toolDisabledImageList,b,--c-b);
this.toolDisabledImageList[c]=null;
for(var d=0;d<c;d++){
if(this.toolDisabledImageList[d]!=null)return;
}
this.toolDisabledImageList=null;
return;
}b++;
}
},"$wt.widgets.ImageList");
$_M(c$,"removeFilter",
function(a,b){
if(this.filterTable==null)return;
this.filterTable.unhook(a,b);
if(this.filterTable.size()==0)this.filterTable=null;
},"~N,$wt.widgets.Listener");
$_M(c$,"removeListener",
function(a,b){
if(this.eventTable==null)return;
this.eventTable.unhook(a,b);
},"~N,$wt.widgets.Listener");
$_M(c$,"removeBar",
function(a){
if(this.bars==null)return;
for(var b=0;b<this.bars.length;b++){
if(this.bars[b]==a){
this.bars[b]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"removeControl",
function(a){
if(a==null)return null;
var b=null;
var c=0;
if(0<=c&&c<this.controlTable.length){
b=this.controlTable[c];
this.controlTable[c]=null;
this.indexTable[c]=this.freeSlot;
this.freeSlot=c;
}return b;
},"Object");
$_M(c$,"removeMenuItem",
function(a){
if(this.items==null)return;
this.items[a.id-108]=null;
a.id=-1;
},"$wt.widgets.MenuItem");
$_M(c$,"removePopup",
function(a){
if(this.popups==null)return;
for(var b=0;b<this.popups.length;b++){
if(this.popups[b]==a){
this.popups[b]=null;
return;
}}
},"$wt.widgets.Menu");
$_M(c$,"runDeferredEvents",
function(){
while(this.eventQueue!=null){
var a=this.eventQueue[0];
if(a==null)break;
var b=this.eventQueue.length;
System.arraycopy(this.eventQueue,1,this.eventQueue,0,--b);
this.eventQueue[b]=null;
var c=a.widget;
if(c!=null&&!c.isDisposed()){
var d=a.item;
if(d==null||!d.isDisposed()){
c.sendEvent(a);
}}}
this.eventQueue=null;
return true;
});
$_M(c$,"runPopups",
function(){
if(this.popups==null)return false;
var a=false;
while(this.popups!=null){
var b=this.popups[0];
if(b==null)break;
var c=this.popups.length;
System.arraycopy(this.popups,1,this.popups,0,--c);
this.popups[c]=null;
this.runDeferredEvents();
b._setVisible(true);
a=true;
}
this.popups=null;
return a;
});
$_M(c$,"runTimer",
function(a){
if(this.timerList!=null&&this.timerIds!=null){
var b=0;
while(b<this.timerIds.length){
if(this.timerIds[b]==a){
w$.clearInterval(this.timerIds[b]);
this.timerIds[b]=0;
var c=this.timerList[b];
this.timerList[b]=null;
if(c!=null)c.run();
return true;
}b++;
}
}return false;
},"~N");
$_M(c$,"sendEvent",
function(a,b){
if(this.eventTable==null&&this.filterTable==null){
return;
}if(b==null)b=new $wt.widgets.Event();
b.display=this;
b.type=a;
if(b.time==0)b.time=this.getLastEventTime();
if(!this.filterEvent(b)){
if(this.eventTable!=null)this.eventTable.sendEvent(b);
}},"~N,$wt.widgets.Event");
$_M(c$,"sendMessage",
function(a){
this.msgs[this.msgs.length]=a;
},"$wt.internal.struct.MESSAGE");
$_M(c$,"setCursorLocation",
function(a,b){
},"~N,~N");
$_M(c$,"setCursorLocation",
function(a){
this.setCursorLocation(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setData",
function(a,b){
if(b==null){
if(this.keys==null)return;
var c=0;
while(c<this.keys.length&&!this.keys[c].equals(a))c++;

if(c==this.keys.length)return;
if(this.keys.length==1){
this.keys=null;
this.values=null;
}else{
var d=new Array(this.keys.length-1);
var e=new Array(this.values.length-1);
System.arraycopy(this.keys,0,d,0,c);
System.arraycopy(this.keys,c+1,d,c,d.length-c);
System.arraycopy(this.values,0,e,0,c);
System.arraycopy(this.values,c+1,e,c,e.length-c);
this.keys=d;
this.values=e;
}return;
}if(this.keys==null){
this.keys=[a];
this.values=[b];
return;
}for(var c=0;c<this.keys.length;c++){
if(this.keys[c].equals(a)){
this.values[c]=b;
return;
}}
var d=new Array(this.keys.length+1);
var e=new Array(this.values.length+1);
System.arraycopy(this.keys,0,d,0,this.keys.length);
System.arraycopy(this.values,0,e,0,this.values.length);
d[this.keys.length]=a;
e[this.values.length]=b;
this.keys=d;
this.values=e;
},"~S,Object");
$_M(c$,"setData",
function(a){
this.data=a;
},"Object");
c$.setAppName=$_M(c$,"setAppName",
function(a){
},"~S");
$_M(c$,"setModalDialogShell",
function(a){
if(this.modalDialogShell!=null&&this.modalDialogShell.isDisposed())this.modalDialogShell=null;
this.modalDialogShell=a;
var b=this.getShells();
for(var c=0;c<b.length;c++)b[c].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setModalShell",
function(a){
if(this.modalShells==null)this.modalShells=new Array(4);
var b=0;
var c=this.modalShells.length;
while(b<c){
if(this.modalShells[b]==a)return;
if(this.modalShells[b]==null)break;
b++;
}
if(b==c){
var d=new Array(c+4);
System.arraycopy(this.modalShells,0,d,0,c);
this.modalShells=d;
}this.modalShells[b]=a;
var d=this.getShells();
for(var e=0;e<d.length;e++)d[e].updateModal();

},"$wt.widgets.Shell");
$_M(c$,"setSynchronizer",
function(a){
},"$wt.widgets.Synchronizer");
$_M(c$,"sleep",
function(){
return false;
});
$_M(c$,"syncExec",
function(a){
a.run();
},"Runnable");
$_M(c$,"timerExec",
function(a,b){
if(this.timerList==null)this.timerList=new Array(4);
if(this.timerIds==null)this.timerIds=$_A(4,0);
var c=0;
while(c<this.timerList.length){
if(this.timerList[c]==b)break;
c++;
}
var d=0;
if(c!=this.timerList.length){
d=this.timerIds[c];
if(a<0){
w$.clearInterval(d);
this.timerList[c]=null;
this.timerIds[c]=0;
return;
}}else{
if(a<0)return;
c=0;
while(c<this.timerList.length){
if(this.timerList[c]==null)break;
c++;
}
this.nextTimerId++;
d=this.nextTimerId;
if(c==this.timerList.length){
var e=new Array(this.timerList.length+4);
System.arraycopy(this.timerList,0,e,0,this.timerList.length);
this.timerList=e;
var f=$_A(this.timerIds.length+4,0);
System.arraycopy(this.timerIds,0,f,0,this.timerIds.length);
this.timerIds=f;
}}var e=w$.setTimeout($_Q(b),a);
if(e!=0){
this.timerList[c]=b;
this.timerIds[c]=e;
}},"~N,Runnable");
$_M(c$,"update",
function(){
var a=this.getShells();
for(var b=0;b<a.length;b++){
var c=a[b];
if(!c.isDisposed())c.update(true);
}
});
$_M(c$,"wake",
function(){
});
c$.withCrLf=$_M(c$,"withCrLf",
function(a){
var b=a.length;
if(b==0)return a;
var c=a.indexOf('\n',0);
if(c==-1)return a;
if(c>0&&(a.charAt(c-1)).charCodeAt(0)==('\r').charCodeAt(0)){
return a;
}c++;
var d=1;
while(c<b){
if((c=a.indexOf('\n',c))==-1)break;
d++;
c++;
}
d+=b;
c=0;
var e=new StringBuffer(d);
while(c<b){
var f=a.indexOf('\n',c);
if(f==-1)f=b;
e.append(a.substring(c,f));
if((c=f)<b){
e.append("\r\n");
c++;
}}
return e.toString();
},"~S");
c$.releaseAllDisplays=$_M(c$,"releaseAllDisplays",
function(){
if($wt.widgets.Display.Displays!=null){
for(var a=0;a<$wt.widgets.Display.Displays.length;a++){
if($wt.widgets.Display.Displays[a]!=null){
$wt.widgets.Display.Displays[a].dispose();
$wt.widgets.Display.Displays[a]=null;
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
this.W="";
this.Y=false;
this.Z=0;
this.X=0;
this.V=null;
this.Q=false;
this.S=null;
this.T=null;
this.U=null;
this.R=false;
this.P=null;
this.O=null;
$_Z(this,arguments);
},$wt.widgets,"Button",$wt.widgets.Control);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Button,[a,$wt.widgets.Button.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"_setImage",
function(a){
},"$wt.graphics.Image");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a=$wt.widgets.Widget.checkBits(a,8,4,32,16,2,0);
if((a&(10))!=0){
return $wt.widgets.Widget.checkBits(a,16777216,16384,131072,0,0,0);
}if((a&(48))!=0){
return $wt.widgets.Widget.checkBits(a,16384,131072,16777216,0,0,0);
}if((a&4)!=0){
a|=524288;
return $wt.widgets.Widget.checkBits(a,128,1024,16384,131072,0,0);
}return a;
},"~N");
$_M(c$,"click",
function(){
this.R=true;
this.R=false;
});
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getBorderWidth();
var e=0;
var f=0;
if((this.i&4)!=0){
if((this.i&(1152))!=0){
e+=16;
f+=16;
}else{
e+=16;
f+=16;
}if(a!=-1)e=a;
if(b!=-1)f=b;
e+=d*2;
f+=d*2;
return new $wt.graphics.Point(e,f);
}var g=0;
if(!this.Q){
if(this.W==null||this.W.length==0){
f+=$wt.internal.browser.OS.getStringStyledHeight(".","button-default",null);
}else{
if(!this.Y||c){
var h=this.W.replaceAll("[\r\n]+","");
var i=$wt.internal.browser.OS.getStringStyledSize(h,"button-default",this.e.style.cssText);
this.Y=true;
this.Z=i.x;
this.X=i.y;
}e=this.Z;
f=this.X;
if((this.i&(48))!=0){
e-=5;
}g=Math.max(8,f);
}}else{
if(this.S!=null){
if(this.S.width==0&&this.S.height==0){
if(this.S.url!=null&&this.S.url.length!=0){
var h=new Image();
h.src=this.S.url;
this.S.width=h.width;
this.S.height=h.height;
e+=h.width;
f=Math.max(h.height,f);
}else{
e+=16;
f=Math.max(16,f);
}}else{
e+=this.S.width;
f=Math.max(this.S.height,f);
}g=8;
}}if((this.i&(48))!=0){
e+=13+g;
f=Math.max(f,16);
}if((this.i&(10))!=0){
e+=12;
f+=10;
}if(a!=-1)e=a;
if(b!=-1)f=b;
e+=d*2;
f+=d*2;
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_V(c$,"enableWidget",
function(a){
this.O.disabled=!a;
var b=this.e.className;
if(b==null)b="";
var c="button-disabled";
var d=b.indexOf(c);
if(!a){
if(d==-1){
this.e.className+=" "+c;
}}else{
if(d!=-1){
this.e.className=b.substring(0,d)+b.substring(d+c.length);
}}},"~B");
$_M(c$,"getAlignment",
function(){
if((this.i&4)!=0){
if((this.i&128)!=0)return 128;
if((this.i&1024)!=0)return 1024;
if((this.i&16384)!=0)return 16384;
if((this.i&131072)!=0)return 131072;
return 128;
}if((this.i&16384)!=0)return 16384;
if((this.i&16777216)!=0)return 16777216;
if((this.i&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getBorderWidth",
function(){
if((this.i&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getDefault",
function(){
if((this.i&8)==0)return false;
return false;
});
$_M(c$,"getImage",
function(){
return this.S;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSelection",
function(){
if((this.i&(50))==0)return false;
if((this.i&2)!=0){
System.out.println(this.O.className);
return(this.O.className!=null&&this.O.className.indexOf("button-selected")!=-1);
}else if((this.i&(48))!=0){
return this.O.checked;
}return false;
});
$_M(c$,"getText",
function(){
if((this.i&4)!=0)return"";
return this.W;
});
$_V(c$,"isEnabled",
function(){
return!this.O.disabled;
});
$_M(c$,"isTabItem",
function(){
return $_U(this,$wt.widgets.Button,"isTabItem",[]);
});
$_V(c$,"mnemonicHit",
function(a){
if(!this.setFocus())return false;
if((this.i&16)==0)this.click();
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(a){
var b=this.findMnemonic(this.getText());
if((b).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(a)).charCodeAt(0)==(Character.toUpperCase(b)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.P!=null){
BrowserNative.releaseHandle(this.P);
this.P=null;
}if(this.O!=null){
BrowserNative.releaseHandle(this.O);
this.O=null;
}$_U(this,$wt.widgets.Button,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Button,"releaseWidget",[]);
if(this.U!=null)this.U.dispose();
this.U=null;
if(this.T!=null)this.T.dispose();
this.T=null;
this.W=null;
this.S=null;
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var a=this.parent._getChildren();
for(var b=0;b<a.length;b++){
var c=a[b];
if(this!=c)c.setRadioSelection(false);
}
this.setSelection(true);
});
$_M(c$,"setAlignment",
function(a){
if((this.i&4)!=0){
if((this.i&(148608))==0)return;
this.i&=-148609;
this.i|=a&(148608);
this.updateArrowStyle();
var b=this.x;
var c=this.w;
if((this.i&2048)!=0){
b-=4;
c-=4;
}this.updateArrowSize(b,c);
return;
}if((a&(16924672))==0)return;
this.i&=-16924673;
this.i|=a&(16924672);
if((this.i&(10))!=0){
var b=null;
if((this.i&(48))!=0){
b=this.P.style;
}else{
b=this.O.style;
}if((this.i&16384)!=0){
this.P.style.textAlign="left";
b.backgroundPosition="left center";
}if((this.i&16777216)!=0){
this.P.style.textAlign="center";
b.backgroundPosition="center center";
}else if((this.i&131072)!=0){
this.P.style.textAlign="right";
b.backgroundPosition="right center";
}}},"~N");
$_M(c$,"setDefault",
function(a){
if((this.i&8)==0)return;
if(a){
try{
this.e.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.i&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setFixedFocus",[]);
});
$_M(c$,"setImage",
function(a){
if((this.i&4)!=0)return;
this.S=a;
this.Q=true;
if(this.S.handle==null&&this.S.url!=null&&this.S.url.length!=0){
$wt.internal.browser.OS.clearChildren(this.P);
this.P.style.display="";
this.P.style.paddingTop="";
this.O.parentNode.style.bottom="";
this.O.parentNode.style.top="";
this.O.style.top="";
this.P.parentNode.style.position="";
this.P.parentNode.style.top="";
var b=null;
if((this.i&(48))!=0){
b=this.P.style;
var c=new Image();
c.src=this.S.url;
this.S.width=c.width;
this.S.height=c.height;
b.display="block";
b.marginLeft=(16)+"px";
b.paddingTop=this.S.height+"px";
}else{
b=this.O.style;
}if(a.url.toLowerCase().endsWith(".png")&&b.filter!=null){
b.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.S.url + "\", sizingMethod=\"image\")";
}else{
b.backgroundRepeat="no-repeat";
var c="center";
if((this.i&(48))!=0){
if((this.i&131072)!=0){
c="right";
}else if((this.i&16777216)!=0){
c="center";
}else{
c="left";
}}b.backgroundPosition=c+" center";
b.backgroundImage="url(\"" + this.S.url + "\")";
}}},"$wt.graphics.Image");
$_V(c$,"setRadioFocus",
function(){
if((this.i&16)==0||!this.getSelection())return false;
return this.setFocus();
});
$_M(c$,"setRadioSelection",
function(a){
if((this.i&16)==0)return false;
if(this.getSelection()!=a){
this.setSelection(a);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSavedFocus",
function(){
if((this.i&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setSavedFocus",[]);
});
$_M(c$,"setSelection",
function(a){
if((this.i&(50))==0)return;
if((this.i&2)!=0){
var b=this.O.className;
if(b==null)b="";
var c="button-selected";
var d=b.indexOf(c);
if(a){
if(d==-1){
this.O.className+=" "+c;
}}else{
if(d!=-1){
this.O.className=b.substring(0,d)+b.substring(d+c.length);
}}}else if((this.i&(48))!=0){
this.O.checked=a;
}},"~B");
$_M(c$,"setText",
function(a){
if((this.i&4)!=0)return;
if(a!=this.W){
this.Y=false;
}$wt.internal.browser.OS.clearChildren(this.P);
if(this.Q){
this.P.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&this.S.url!=null&&this.S.url.toLowerCase().endsWith(".png")&&this.P.style.filter!=null){
this.P.style.filter="";
}}this.W=a;
this.Q=false;
a=a.replaceAll("(&(&))|([\r\n]+)","$2");
var b=a.indexOf('&');
if(b==-1){
this.P.appendChild(d$.createTextNode(a));
}else{
this.P.appendChild(d$.createTextNode(a.substring(0,b)));
var c=d$.createElement("SPAN");
c.appendChild(d$.createTextNode(a.substring(b+1,b+2)));
c.className="button-text-mnemonics";
this.P.appendChild(c);
this.P.appendChild(d$.createTextNode(a.substring(b+2)));
}},"~S");
$_V(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
if((this.i&2048)!=0){
e-=4;
f-=4;
}if((this.i&4)!=0){
this.updateArrowSize(e,f);
}if((this.i&(48))!=0){
var h=0;
if(!this.Q){
if(this.Y){
this.P.style.display="block";
if(this.X<13){
this.P.style.paddingTop=(Math.floor((13-this.X)/2))+"px";
this.O.parentNode.style.bottom="0";
this.O.parentNode.style.top="0";
this.O.style.top="0";
}else{
this.P.style.paddingTop="0";
}}h=this.X;
}else{
h=this.S.height;
}h=Math.max(16,h);
if(h<f){
this.P.parentNode.style.position="relative";
this.P.parentNode.style.top=(Math.floor((f-h)/2))+"px";
}}var h=a;
h.style.left=c+"px";
h.style.top=d+"px";
h.style.width=(e>0?e:0)+"px";
h.style.height=(f>0?f:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"updateArrowSize",
($fz=function(a,b){
var c=Math.floor(Math.min(a,b)/3);
var d=this.P.style;
d.borderWidth=(c>0?c:0)+"px";
if((this.i&16384)!=0){
d.borderLeftWidth="0";
}else if((this.i&131072)!=0){
d.borderRightWidth="0";
}else if((this.i&128)!=0){
d.borderTopWidth="0";
}else if((this.i&1024)!=0){
if(c>1){
d.borderWidth=(c-1)+"px";
}d.borderBottomWidth="0";
}else{
d.borderTopWidth="0";
}var e=Math.floor(b/6);
c=Math.floor(b/3);
d.position="relative";
if((this.i&(147456))!=0){
d.top=(e-3)+"px";
if((this.i&131072)!=0){
d.left="1px";
}}else{
if((this.i&128)!=0){
d.top=(c-3)+"px";
}else if((this.i&1024)!=0){
d.top=(c-2)+"px";
}}if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
if((this.i&128)!=0){
d.left="-2px";
}else if((this.i&1024)!=0){
d.left="-1px";
}}if($wt.internal.browser.OS.isFirefox){
if((this.i&(147456))!=0){
d.top="-2px";
if((this.i&131072)!=0){
d.left="1px";
}}else{
if((this.i&128)!=0){
d.left="-2px";
d.top="-1px";
}else if((this.i&1024)!=0){
d.left="-1px";
d.top="-1px";
}}}},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"setCursor",
function(a){
if(this.e!=null){
this.e.style.cursor=a.handle;
}},"$wt.graphics.Cursor");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
var a="button-default";
if((this.i&2048)!=0){
a+=" button-border";
}if((this.i&8388608)!=0){
a+=" button-flat";
}this.e.className=a;
if(this.parent!=null){
var b=this.parent.containerHandle();
if(b!=null){
b.appendChild(this.e);
}}if((this.i&(48))!=0){
var b=d$.createElement("DIV");
this.e.appendChild(b);
var c=d$.createElement("DIV");
c.className="button-input-wrapper";
b.appendChild(c);
this.O=d$.createElement("INPUT");
if((this.i&32)!=0){
b.className="button-check";
this.O.type="checkbox";
}else{
b.className="button-radio";
this.O.type="radio";
}c.appendChild(this.O);
this.P=d$.createElement("DIV");
this.P.className="button-text";
b.appendChild(this.P);
}else{
this.O=d$.createElement("BUTTON");
this.e.appendChild(this.O);
this.P=d$.createElement("DIV");
this.O.appendChild(this.P);
if((this.i&2)!=0){
this.O.className="button-toggle";
}else if((this.i&4)!=0){
this.O.className="button-arrow";
this.updateArrowStyle();
}else{
this.O.className="button-push";
}}this.hookSelection();
});
$_M(c$,"updateArrowStyle",
($fz=function(){
if((this.i&16384)!=0){
this.P.className="button-arrow-left";
}else if((this.i&131072)!=0){
this.P.className="button-arrow-right";
}else if((this.i&128)!=0){
this.P.className="button-arrow-up";
}else if((this.i&1024)!=0){
this.P.className="button-arrow-down";
}else{
this.P.className="button-arrow-up";
}},$fz.isPrivate=true,$fz));
$_V(c$,"hookSelection",
function(){
var a=$_Q((function(i$,v$){
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
}if((this.b$["$wt.widgets.Button"].i&(34))!=0){
var a=this.getEvent();
if((this.b$["$wt.widgets.Button"].i&32)!=0){
if(a.srcElement!=this.b$["$wt.widgets.Button"].O){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
if((this.b$["$wt.widgets.Button"].i&16)!=0){
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
this.e.onclick=this.e.ondblclick=a;
if((this.i&(48))!=0){
this.P.onclick=a;
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
function(a,b){
$_R(this,$wt.widgets.Label,[a,$wt.widgets.Label.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=524288;
if((a&2)!=0){
a=$wt.widgets.Widget.checkBits(a,512,256,0,0,0,0);
return $wt.widgets.Widget.checkBits(a,8,4,32,0,0,0);
}return $wt.widgets.Widget.checkBits(a,16384,16777216,131072,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
var f=this.getBorderWidth();
if((this.i&2)!=0){
var g=1;
if((this.i&256)!=0){
d=64;
e=g*2;
}else{
d=g*2;
e=64;
}if(a!=-1)d=a;
if(b!=-1)e=b;
d+=f*2;
e+=f*2;
return new $wt.graphics.Point(d,e);
}if(this.text!=null){
if((this.i&64)!=0&&a!=-1&&b==-1){
e=$wt.internal.browser.OS.getStringStyledWrappedHeight(this.text,"label-default",this.e.style.cssText,a);
}else{
if(!this.textSizeCached||c){
var g=$wt.internal.browser.OS.getStringStyledSize(this.text,"label-default",this.e.style.cssText);
this.textSizeCached=true;
this.textWidthCached=g.x;
this.textHeightCached=g.y;
}d=this.textWidthCached;
e=this.textHeightCached;
}}if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var g=new Image();
g.src=this.image.url;
this.image.width=g.width;
this.image.height=g.height;
d+=g.width;
e=Math.max(g.height,e);
}else{
d+=16;
e=Math.max(16,e);
}}else{
d+=this.image.width;
e=Math.max(this.image.height,e);
}}if(a!=-1)d=a;
if(b!=-1)e=b;
d+=f*2;
e+=f*2;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"getAlignment",
function(){
if((this.i&2)!=0)return 0;
if((this.i&16384)!=0)return 16384;
if((this.i&16777216)!=0)return 16777216;
if((this.i&131072)!=0)return 131072;
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
if((this.i&2)!=0)return"";
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
function(a){
if((this.i&2)!=0)return;
if((a&(16924672))==0)return;
this.i&=-16924673;
this.i|=a&(16924672);
if((this.i&16384)!=0){
this.e.style.textAlign="left";
this.e.style.backgroundPosition="left center";
}else if((this.i&16777216)!=0){
this.e.style.textAlign="center";
this.e.style.backgroundPosition="center center";
}else if((this.i&131072)!=0){
this.e.style.textAlign="right";
this.e.style.backgroundPosition="right center";
}},"~N");
$_M(c$,"setImage",
function(a){
if(a==null)return;
if((this.i&2)!=0)return;
this.image=a;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
var b=this.e.style;
if(a.url.toLowerCase().endsWith(".png")&&b.filter!=null){
b.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
b.backgroundRepeat="no-repeat";
b.backgroundPosition="left center";
b.backgroundImage="url(\"" + this.image.url + "\")";
}}else if(this.e.childNodes.length==0){
for(var b=0;b<a.handle.childNodes.length;b++){
this.e.appendChild(a.handle.childNodes[b]);
}
}else{
var b=this.e.childNodes[0];
for(var c=0;c<a.handle.childNodes.length;c++){
this.e.insertBefore(a.handle.childNodes[c],b);
}
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(a){
if((this.i&2)!=0)return;
if(this.image!=null){
this.e.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.e.style.filter!=null){
this.e.style.filter="";
}}if(a==this.text){
return;
}this.textSizeCached=false;
this.text=a;
$wt.internal.browser.OS.insertText(this.e,this.text);
},"~S");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
this.e.className="label-default";
if((this.i&2)!=0){
if((this.i&4)!=0){
this.e.className+=" shadow-in";
}else if((this.i&8)!=0){
this.e.className+=" shadow-out";
}else{
this.e.className+=" shadow-none";
}this.e.style.fontSize="0";
var a=d$.createElement("DIV");
var b=d$.createElement("DIV");
if((this.i&512)!=0){
a.className="label-seperator-vertical-left";
b.className="label-seperator-vertical-right";
}else{
a.className="label-seperator-horizontal-top";
b.className="label-seperator-horizontal-bottom";
}this.e.appendChild(a);
this.e.appendChild(b);
}if((this.i&64)!=0){
this.e.className+=" label-wrap";
}if((this.i&2048)!=0){
this.e.className+=" label-border";
}if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}});
$_M(c$,"setBounds",
function(a,b,c,d){
$_U(this,$wt.widgets.Label,"setBounds",[a,b,c,d]);
if((this.i&2)!=0){
var e=this.e.childNodes[0].style;
if((this.i&256)!=0){
var f=(Math.floor(d/2))-1;
if($wt.internal.browser.OS.isIE){
f--;
}e.marginTop=f+"px";
e.width=c+"px";
this.e.childNodes[1].style.width=c+"px";
}else{
e.marginLeft=((Math.floor(c/2))-1)+"px";
e.height=d+"px";
this.e.childNodes[1].style.marginLeft=(Math.floor(c/2))+"px";
this.e.childNodes[1].style.height=d+"px";
}}},"~N,~N,~N,~N");
$_M(c$,"setEnabled",
function(a){
$_U(this,$wt.widgets.Label,"setEnabled",[a]);
if(!a){
this.lastColor=this.e.style.color;
this.e.style.color="gray";
}else{
this.e.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(a){
$_U(this,$wt.widgets.Label,"setForeground",[a]);
if(this.lastColor!=null){
this.lastColor=this.e.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(a){
this.textSizeCached=false;
$_U(this,$wt.widgets.Label,"setFont",[a]);
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
function(a,b){
$_R(this,$wt.widgets.Link,[a,b]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(a,b,c){
if(a!=-1&&a<0)a=0;
if(b!=-1&&b<0)b=0;
var d=0;
var e=0;
if(this.text!=null){
if((this.i&64)!=0&&a!=-1&&b==-1){
e=$wt.internal.browser.OS.getStringStyledWrappedHeight(this.cachedText,"label-default",this.e.style.cssText,a);
}else{
if(!this.textSizeCached||c){
var f=$wt.internal.browser.OS.getStringStyledSize(this.cachedText,"label-default",this.e.style.cssText);
this.textSizeCached=true;
this.textWidthCached=f.x;
this.textHeightCached=f.y;
}d=this.textWidthCached;
e=this.textHeightCached;
}}var f=this.getBorderWidth();
if(a!=-1)d=a;
if(b!=-1)e=b;
d+=f*2;
e+=f*2;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
this.e.className="link-default";
if((this.i&64)!=0){
this.e.className+=" link-wrap";
}if((this.i&2048)!=0){
this.e.className+=" link-border";
}if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Link,"createWidget",[]);
this.text="";
});
$_M(c$,"enableWidget",
function(a){
$_U(this,$wt.widgets.Link,"enableWidget",[a]);
},"~B");
$_V(c$,"hookSelection",
function(){
var a=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=new $wt.widgets.Event();
a.type=13;
a.item=this.b$["$wt.widgets.Link"];
a.text=this.b$["$wt.widgets.Link"].text;
a.widget=this.b$["$wt.widgets.Link"];
a.display=this.b$["$wt.widgets.Link"].b;
this.b$["$wt.widgets.Link"].sendEvent(13);
if(!a.doit){
this.toReturn(false);
}});
c$=$_P();
}
return $_N($wt.widgets.Link$1,i$,v$);
})(this,null));
for(var b=0;b<this.anchors.length;b++){
this.anchors[b].href="#";
this.anchors[b].target=null;
this.anchors[b].onclick=a;
this.anchors[b].ondblclick=a;
}
});
$_M(c$,"initAccessible",
function(){
var a=this.getAccessible();
a.addAccessibleListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$2",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(a){
a.result=this.b$["$wt.widgets.Link"].parse(this.b$["$wt.widgets.Link"].text,null);
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
}
return $_N($wt.widgets.Link$2,i$,v$);
})(this,null));
a.addAccessibleControlListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Link$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Link$3",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getChildAtPoint",
function(a){
a.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getLocation",
function(a){
var b=this.b$["$wt.widgets.Link"].b.map(this.b$["$wt.widgets.Link"].getParent(),null,this.b$["$wt.widgets.Link"].getBounds());
a.x=b.x;
a.y=b.y;
a.width=b.width;
a.height=b.height;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildCount",
function(a){
a.detail=0;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getRole",
function(a){
a.detail=30;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(a){
a.detail=1048576;
if(this.b$["$wt.widgets.Link"].hasFocus())a.detail|=4;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getDefaultAction",
function(a){
a.result=$WT.getMessage("SWT_Press");
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getSelection",
function(a){
if(this.b$["$wt.widgets.Link"].hasFocus())a.childID=-1;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getFocus",
function(a){
if(this.b$["$wt.widgets.Link"].hasFocus())a.childID=-1;
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
function(a,b){
var c=b;
var d=a.length;
this.offsets=new Array(Math.floor(d/4));
this.ids=new Array(Math.floor(d/4));
this.mnemonics=$_A(Math.floor(d/4)+1,0);
var e=new StringBuffer();
var f=new StringBuffer();
var g=$_A(d,'\0');
a.getChars(0,a.length,g,0);
var h=0;
var i=0;
var j=0;
var k=0;
var l=0;
var m=0;
var n=0;
var o=0;
while(h<d){
var p=g[h];
if((p).charCodeAt(0)>=('A').charCodeAt(0)&&(p).charCodeAt(0)<=('Z').charCodeAt(0)){
p=String.fromCharCode((p).charCodeAt(0)+(32));
}switch(i){
case 0:
if((p).charCodeAt(0)==('<').charCodeAt(0)){
l=h;
i++;
}break;
case 1:
if((p).charCodeAt(0)==('a').charCodeAt(0))i++;
break;
case 2:
switch(p){
case'h':
i=7;
break;
case'>':
m=h+1;
i++;
break;
default:
if((p).charCodeAt(0)==32||(p).charCodeAt(0)==160)break;
else i=13;
}
break;
case 3:
if((p).charCodeAt(0)==('<').charCodeAt(0)){
n=h;
i++;
}break;
case 4:
i=(p).charCodeAt(0)==('/').charCodeAt(0)?i+1:3;
break;
case 5:
i=(p).charCodeAt(0)==('a').charCodeAt(0)?i+1:3;
break;
case 6:
if((p).charCodeAt(0)==('>').charCodeAt(0)){
this.mnemonics[j]=this.parseMnemonics(g,k,l,e,f,b);
var q=e.length();
var r=null;
if(b!=null){
r=d$.createElement("A");
c.appendChild(r);
this.anchors[this.anchors.length]=r;
}this.parseMnemonics(g,m,n,e,f,r);
this.offsets[j]=new $wt.graphics.Point(q,e.length()-1);
if(this.ids[j]==null){
this.ids[j]=String.instantialize(g,m,n-m);
}if(r!=null){
r.href=this.ids[j];
r.target="_blank";
r.title=this.ids[j];
}j++;
k=l=m=n=o=h+1;
i=0;
}else{
i=3;
}break;
case 7:
i=(p).charCodeAt(0)==('r').charCodeAt(0)?i+1:0;
break;
case 8:
i=(p).charCodeAt(0)==('e').charCodeAt(0)?i+1:0;
break;
case 9:
i=(p).charCodeAt(0)==('f').charCodeAt(0)?i+1:0;
break;
case 10:
i=(p).charCodeAt(0)==('=').charCodeAt(0)?i+1:0;
break;
case 11:
if((p).charCodeAt(0)==('"').charCodeAt(0)){
i++;
o=h+1;
}else{
i=0;
}break;
case 12:
if((p).charCodeAt(0)==('"').charCodeAt(0)){
this.ids[j]=String.instantialize(g,o,h-o);
i=2;
}break;
case 13:
if(Character.isWhitespace(p)){
i=0;
}else if((p).charCodeAt(0)==('=').charCodeAt(0)){
i++;
}break;
case 14:
i=(p).charCodeAt(0)==('"').charCodeAt(0)?i+1:0;
break;
case 15:
if((p).charCodeAt(0)==('"').charCodeAt(0))i=2;
break;
default:
i=0;
break;
}
h++;
}
if(k<d){
var p=this.parseMnemonics(g,k,l,e,f,b);
var q=this.parseMnemonics(g,m,h,e,f,b);
if(q==-1)q=p;
this.mnemonics[j]=q;
}else{
this.mnemonics[j]=-1;
}if(this.offsets.length!=j){
var p=new Array(j);
System.arraycopy(this.offsets,0,p,0,j);
this.offsets=p;
var q=new Array(j);
System.arraycopy(this.ids,0,q,0,j);
this.ids=q;
var r=$_A(j+1,0);
System.arraycopy(this.mnemonics,0,r,0,j+1);
this.mnemonics=r;
}this.cachedText=f.toString();
return e.toString();
},"~S,Object");
$_M(c$,"parseMnemonics",
function(a,b,c,d,e,f){
var g=f;
var h=-1;
var i=b;
var j=d.length();
while(i<c){
var k=a[i];
e.append(k);
if((k).charCodeAt(0)==('&').charCodeAt(0)){
if(i+1<c&&(a[i+1]).charCodeAt(0)==('&').charCodeAt(0)){
d.append(k);
i++;
}else{
h=d.length();
if(g!=null){
if((h>j)&&(g!=null)){
var l=h-j;
var m=$_A(l,'\0');
d.getChars(j,h,m,0);
var n=String.instantialize(m,0,l);
g.appendChild(d$.createTextNode(n));
}j=h+1;
var l=d$.createElement("SPAN");
g.appendChild(l);
l.appendChild(d$.createTextNode(""+a[i+1]));
}}}else{
d.append(k);
}var l=false;
if((k).charCodeAt(0)==('\r').charCodeAt(0)){
if(i+1<c&&(a[i+1]).charCodeAt(0)==('\n').charCodeAt(0)){
d.append('\n');
i++;
}l=true;
}if((k).charCodeAt(0)==('\n').charCodeAt(0)){
l=true;
}if(l&&g!=null){
var m=d.length();
if(m>j){
var n=m-j;
var o=$_A(n,'\0');
d.getChars(j,m,o,0);
var p=String.instantialize(o,0,n);
g.appendChild(d$.createTextNode(p));
}j=m;
g.appendChild(d$.createElement("BR"));
}i++;
}
var k=d.length();
if(k>j&&g!=null){
var l=k-j;
var m=$_A(l,'\0');
d.getChars(j,k,m,0);
var n=String.instantialize(m,0,l);
g.appendChild(d$.createTextNode(n));
}return h;
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
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
if(!this.hooks(13)&&!this.hooks(14)){
this.unhookSelection();
}},"$wt.events.SelectionListener");
$_M(c$,"setEnabled",
function(a){
$_U(this,$wt.widgets.Link,"setEnabled",[a]);
var b=this.e.className;
if(b==null)b="";
var c="link-disabled";
var d=b.indexOf(c);
if(!a){
this.lastColor=this.e.style.color;
if(d==-1){
this.e.className+=" "+c;
}}else{
if(d!=-1){
this.e.className=b.substring(0,d)+b.substring(d+c.length);
}this.e.style.color=this.lastColor;
this.lastColor=null;
}},"~B");
$_M(c$,"setForeground",
function(a){
$_U(this,$wt.widgets.Link,"setForeground",[a]);
if(this.lastColor!=null){
this.lastColor=this.e.style.color;
}},"$wt.graphics.Color");
$_M(c$,"setFont",
function(a){
this.textSizeCached=false;
$_U(this,$wt.widgets.Link,"setFont",[a]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(a){
if(a.equals(this.text))return;
this.text=a;
this.textSizeCached=false;
this.parse(a,this.e);
System.out.println(this.cachedText);
System.out.println("ids==");
for(var b=0;b<this.ids.length;b++){
System.out.println(b+"/"+this.ids[b]);
}
System.out.println("mnemonics==");
for(var c=0;c<this.mnemonics.length;c++){
System.out.println(c+"/"+this.mnemonics[c]);
}
System.out.println("offsets==");
for(var d=0;d<this.offsets.length;d++){
System.out.println(d+"/"+this.offsets[d]);
}
},"~S");
$_M(c$,"unhookSelection",
function(){
for(var a=0;a<this.anchors.length;a++){
this.anchors[a].onclick=null;
this.anchors[a].ondblclick=null;
this.anchors[a].href=this.ids[a];
this.anchors[a].target="_blank";
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
function(a,b){
$_R(this,$wt.widgets.Text,[a,$wt.widgets.Text.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
var a="text-default text-editable";
this.e.className=a;
if(this.parent!=null){
var b=this.parent.containerHandle();
if(b!=null){
b.appendChild(this.e);
}}this.doubleClick=true;
if((this.i&2)!=0){
this.textHandle=d$.createElement("TEXTAREA");
}else{
this.textHandle=d$.createElement("INPUT");
}if($wt.internal.browser.OS.isMozilla){
}var b=null;
if($wt.internal.browser.OS.isIE){
b="text-ie-default";
}if((this.i&2048)!=0){
if(b!=null){
b+=" text-border";
}else{
b="text-border";
}}if((this.i&8)!=0){
this.textHandle.readOnly=true;
}if((this.i&512)!=0&&(this.i&256)!=0){
this.textHandle.style.overflow="scroll";
}else{
if((this.i&512)!=0){
if(b!=null){
b+=" text-v-scroll";
}else{
b="text-v-scroll";
}}else if((this.i&256)!=0){
if(b!=null){
b+=" text-h-scroll";
}else{
b="text-h-scroll";
}}}if(b!=null){
this.textHandle.className=b;
}this.e.appendChild(this.textHandle);
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
var a=false;
if(this.b$["$wt.widgets.Text"].hooks(25)){
a=true;
var b=this.getEvent();
if(!this.b$["$wt.widgets.Text"].isInputCharacter(b.keyCode,b.shiftKey,b.altKey,b.ctrlKey)){
this.toReturn(true);
}else{
var c=new $wt.widgets.Event();
c.character=this.b$["$wt.widgets.Text"].getInputCharacter(b.keyCode,b.shiftKey,false);
var d=""+c.character;
if((c.character).charCodeAt(0)==8||(c.character).charCodeAt(0)==46){
d="";
}c.keyCode=b.keyCode;
c.stateMask=(b.shiftKey?131072:0)|(b.ctrlKey?262144:0);
var e=this.b$["$wt.widgets.Text"].verifyText(d,0,0,c);
if(e==null){
this.toReturn(false);
}else if(this.b$["$wt.widgets.Text"].hooks(24)){
var f=new $wt.widgets.Event();
f.type=24;
f.widget=this.b$["$wt.widgets.Text"];
f.display=this.b$["$wt.widgets.Text"].b;
f.time=this.b$["$wt.widgets.Text"].b.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(f);
this.toReturn(f.doit);
}}}if(!a||this.b$["$wt.widgets.Text"].hooks(1)){
var b=new $wt.widgets.Event();
b.type=24;
b.widget=this.b$["$wt.widgets.Text"];
b.display=this.b$["$wt.widgets.Text"].b;
b.time=this.b$["$wt.widgets.Text"].b.getLastEventTime();
this.b$["$wt.widgets.Text"].sendEvent(b);
this.toReturn(b.doit);
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
if((this.b$["$wt.widgets.Text"].i&8)!=0||(!this.b$["$wt.widgets.Text"].hooks(25)&&!this.b$["$wt.widgets.Text"].filters(25))){
this.toReturn(true);
return;
}var a=this.b$["$wt.widgets.Text"].textHandle.value;
if(a!=null){
var b=a;
a=this.b$["$wt.widgets.Text"].verifyText(a,0,0,null);
if(a==null){
this.toReturn(true);
return;
}if(!a.equals(b)){
var c=new $wt.widgets.Event();
c.type=24;
c.item=this.b$["$wt.widgets.Text"];
c.widget=this.b$["$wt.widgets.Text"];
this.b$["$wt.widgets.Text"].sendEvent(c);
this.toReturn(c.doit);
}}});
c$=$_P();
}
return $_N($wt.widgets.Text$2,i$,v$);
})(this,null));
});
$_M(c$,"getInputCharacter",
($fz=function(a,b,c){
var d='\0';
if(a==10||a==13||a==9||a==32){
d=String.fromCharCode(a);
}else if(a>=48&&a<58){
if(!b){
d=String.fromCharCode(a);
}else{
var e=[')','!','@','#','$','%','^','&','*','('];
d=e[a-48];
}}else if(a==61){
if(!b){
d='=';
}else{
d='+';
}}else if(a==59){
if(!b){
d=';';
}else{
d=':';
}}else if(a>=65&&a<=90){
if((b&&c)||(!b&&!c)){
d=String.fromCharCode((a+('a').charCodeAt(0)-('A').charCodeAt(0)));
}else{
d=String.fromCharCode(a);
}}else if(a>=96&&a<=105){
d=String.fromCharCode((a-96+('0').charCodeAt(0)));
}else if(a>=106&&a<=111&&a!=108){
var e=['*','+','?','-','.','/'];
d=e[a-106];
}else if(a>=186&&a<=192){
if(!b){
var e=[';','=',',','-','.','/','`'];
d=e[a-186];
}else{
var e=[':','+','<','_','>','?','~'];
d=e[a-186];
}}else if(a>=219&&a<=222){
if(!b){
var e=['[','\\',']','\''];
d=e[a-219];
}else{
var e=['{','|','}','\"'];
d=e[a-219];
}}else{
d=String.fromCharCode(a);
}return d;
},$fz.isPrivate=true,$fz),"~N,~B,~B");
$_M(c$,"isInputCharacter",
($fz=function(a,b,c,d){
if(c||d){
return false;
}if(a==10||a==13||a==9||a==32||a==8||a==46||(a>=48&&a<=57)||a==59||a==61||(a>=65&&a<=90)||(a>=96&&a<=111&&a!=108)||(a>=186&&a<=192)||(a>=218&&a<=222)){
return true;
}return false;
},$fz.isPrivate=true,$fz),"~N,~B,~B,~B");
$_M(c$,"addModifyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(24,b);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(25,b);
},"$wt.events.VerifyListener");
$_M(c$,"append",
function(a){
this.textHandle.value+=a;
},"~S");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
if((a&4)!=0&&(a&2)!=0){
a&=-3;
}a=$wt.widgets.Widget.checkBits(a,16384,16777216,131072,0,0,0);
if((a&4)!=0)a&=-833;
if((a&64)!=0){
a|=2;
a&=-257;
}if((a&2)!=0)a&=-4194305;
if((a&(6))!=0)return a;
if((a&(768))!=0)return a|2;
return a|4;
},"~N");
$_M(c$,"clearSelection",
function(){
BrowserNative.clearSelection(this.textHandle);
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if(a==-1||b==-1){
var f=null;
var g=this.getText();
if(g!=null&&g.length!=0){
var h=(this.i&2)!=0&&(this.i&64)!=0;
if(h&&a!=-1&&a>0){
f=new $wt.graphics.Point(a,$wt.internal.browser.OS.getStringStyledWrappedHeight(g,"text-default",this.e.style.cssText,a));
}else{
f=$wt.internal.browser.OS.getStringStyledSize(g,"text-default",this.e.style.cssText);
}e=f.x;
d=f.y;
if(d<=0){
d=this.getLineHeight();
}}else{
e=0;
d=this.getLineHeight();
}}if(e==0)e=64;
if(d==0)d=64;
if(a!=-1)e=a;
if(b!=-1)d=b;
var f=this.computeTrim(0,0,e,d);
return new $wt.graphics.Point(f.width,f.height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(a,b,c,d){
var e=$_U(this,$wt.widgets.Text,"computeTrim",[a,b,c,d]);
System.out.println(e);
System.out.println(c+","+d);
if((this.i&2)!=0){
e.width+=6;
}else{
e.width+=1;
}if((this.i&256)!=0)e.width++;
if((this.i&512)!=0){
e.width+=16;
}if((this.i&256)!=0){
e.height+=16;
}if((this.i&2048)!=0){
e.x-=1;
e.y-=1;
e.width+=2;
e.height+=2;
}return e;
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
if((this.i&8)!=0)return;
});
$_M(c$,"fixAlignment",
function(){
});
$_V(c$,"getBorderWidth",
function(){
if((this.i&2048)!=0){
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
var a="text-editable";
if(this.e.className!=null){
var b=this.e.className.indexOf(a);
if(b!=-1){
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
this.lineHeight=$wt.internal.browser.OS.getStringStyledHeight(".","text-default",this.e.style.cssText);
}return this.lineHeight;
});
$_M(c$,"getOrientation",
function(){
return this.i&(100663296);
});
$_M(c$,"getSelection",
function(){
return BrowserNative.getTextSelection(this.textHandle);
});
$_M(c$,"getSelectionCount",
function(){
var a=this.getSelection();
return a.y-a.x;
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
function(a){
return 64;
},"~N");
$_M(c$,"getText",
function(){
return this.textHandle.value;
});
$_M(c$,"getText",
function(a,b){
var c=this.textHandle.value.length;
a=Math.max(0,a);
b=Math.min(b,c-1);
return this.getText().substring(a,b+1);
},"~N,~N");
$_M(c$,"getTextLimit",
function(){
return 0;
});
$_M(c$,"getTopIndex",
function(){
if((this.i&4)!=0)return 0;
return 0;
});
$_M(c$,"getTopPixel",
function(){
return this.getTopIndex()*this.getLineHeight();
});
$_M(c$,"insert",
function(a){
var b=BrowserNative.getTextSelection(this.textHandle);
if(this.hooks(25)||this.filters(25)){
a=this.verifyText(a,b.x,b.y,null);
if(a==null)return;
}BrowserNative.insertTextString(this.textHandle,a);
if((this.i&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"paste",
function(){
if((this.i&8)!=0)return;
});
$_M(c$,"releaseHandle",
function(){
if(this.textHandle!=null){
BrowserNative.releaseHandle(this.textHandle);
this.textHandle=null;
}$_U(this,$wt.widgets.Text,"releaseHandle",[]);
});
$_M(c$,"removeModifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(24,a);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(25,a);
},"$wt.events.VerifyListener");
$_M(c$,"selectAll",
function(){
this.textHandle.select();
});
$_M(c$,"sendKeyEvent",
function(a,b,c,d,e){
return false;
},"~N,~N,~N,~N,$wt.widgets.Event");
$_M(c$,"setBounds",
function(a,b,c,d,e){
$_U(this,$wt.widgets.Text,"setBounds",[a,b,c,d,e]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setBackground",
function(a){
if(a!=null)this.textHandle.style.backgroundColor=a.getCSSHandle();
$_U(this,$wt.widgets.Text,"setBackground",[a]);
},"$wt.graphics.Color");
$_M(c$,"setDoubleClickEnabled",
function(a){
this.doubleClick=a;
},"~B");
$_M(c$,"setEchoChar",
function(a){
if((this.i&2)!=0)return;
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
function(a){
this.i&=-9;
if(!a)this.i|=8;
this.textHandle.readOnly=!a;
var b="text-editable";
if(!a){
if(this.e.className!=null){
var c=this.e.className.indexOf(b);
if(c!=-1){
var d=this.e.className.substring(0,c)+this.textHandle.className.substring(c+b.length);
this.e.className=d;
}}}else{
if(this.e.className!=null){
var c=this.e.className.indexOf(b);
if(c==-1){
this.e.className+=" "+b;
}}}},"~B");
$_M(c$,"setFont",
function(a){
$_U(this,$wt.widgets.Text,"setFont",[a]);
var b=this.e;
this.e=this.textHandle;
$_U(this,$wt.widgets.Text,"setFont",[a]);
this.e=b;
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(a){
if(a!=null)this.textHandle.style.color=a.getCSSHandle();
$_U(this,$wt.widgets.Text,"setForeground",[a]);
},"$wt.graphics.Color");
$_M(c$,"setOrientation",
function(a){
this.fixAlignment();
},"~N");
$_M(c$,"setSelection",
function(a){
this.setSelection(a,this.textHandle.value.length);
},"~N");
$_M(c$,"setSelection",
function(a,b){
BrowserNative.setTextSelection(this.textHandle,a,b);
},"~N,~N");
$_M(c$,"setRedraw",
function(a){
$_U(this,$wt.widgets.Text,"setRedraw",[a]);
if(this.drawCount!=0)return;
},"~B");
$_M(c$,"setSelection",
function(a){
this.setSelection(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setTabs",
function(a){
if(a<0)return;
this.tabs=a;
},"~N");
$_M(c$,"setTabStops",
function(a){
},"~N");
$_M(c$,"setText",
function(a){
this.textHandle.value=a;
if((this.i&2)!=0){
this.sendEvent(24);
}},"~S");
$_M(c$,"setTextLimit",
function(a){
if(a>32767){
}},"~N");
$_M(c$,"setTopIndex",
function(a){
if((this.i&4)!=0)return;
},"~N");
$_V(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
if((this.i&2048)!=0){
e-=4;
f-=4;
}this.textHandle.style.width=(e>0?e:0)+"px";
this.textHandle.style.height=(f>0?f:0)+"px";
var h=a;
h.style.left=c+"px";
h.style.top=d+"px";
h.style.width=(e>0?e:0)+"px";
h.style.height=(f>0?f:0)+"px";
return true;
},"Object,Object,~N,~N,~N,~N,~N");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"verifyText",
function(a,b,c,d){
if(this.ignoreVerify)return a;
var e=new $wt.widgets.Event();
e.text=a;
e.start=b;
e.end=c;
if(d!=null){
e.character=d.character;
e.keyCode=d.keyCode;
e.stateMask=d.stateMask;
}this.sendEvent(25,e);
if(!e.doit||this.isDisposed())return null;
return e.text;
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
function(a,b){
$_R(this,$wt.widgets.List,[a,$wt.widgets.List.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(a){
if(this.e!=null){
this.e.options[this.e.options.length]=new Option(a,a);
}},"~S");
$_M(c$,"add",
function(a,b){
if(this.e!=null){
this.e.options[b]=new Option(a,a);
}},"~S,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,4,2,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
var f=this.getBorderWidth();
d+=f*2+3;
e+=f*2;
if((this.i&512)!=0){
}if((this.i&256)!=0){
}return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("SELECT");
this.e.size=2;
this.e.className="list-default";
if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}this.e.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.List$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"List$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=new $wt.widgets.Event();
a.type=13;
a.item=this.b$["$wt.widgets.List"];
a.widget=this.b$["$wt.widgets.List"];
this.b$["$wt.widgets.List"].sendEvent(a);
});
c$=$_P();
}
return $_N($wt.widgets.List$1,i$,v$);
})(this,null));
});
$_M(c$,"deselect",
function(a){
if(a.length==0)return;
},"~A");
$_M(c$,"deselect",
function(a){
if(a==-1)return;
if((this.i&4)!=0){
return;
}},"~N");
$_M(c$,"deselect",
function(a,b){
if(a>b)return;
if((this.i&4)!=0){
return;
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
if((this.i&4)!=0){
}else{
}});
$_M(c$,"getFocusIndex",
function(){
return-1;
});
$_M(c$,"getItem",
function(a){
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
var a=this.getItemCount();
var b=new Array(a);
for(var c=0;c<a;c++)b[c]=this.getItem(c);

return b;
});
$_M(c$,"getSelection",
function(){
var a=this.getSelectionIndices();
var b=new Array(a.length);
for(var c=0;c<a.length;c++){
b[c]=this.getItem(a[c]);
}
return b;
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
return[this.e.selectedIndex];
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(a){
return this.indexOf(a,0);
},"~S");
$_M(c$,"indexOf",
function(a,b){
if(a.length==0){
var c=this.getItemCount();
for(var d=b;d<c;d++){
if(a.equals(this.getItem(d)))return d;
}
return-1;
}var c=b-1;
var d;
return c;
},"~S,~N");
$_M(c$,"isSelected",
function(a){
return false;
},"~N");
$_M(c$,"remove",
function(a){
if(a.length==0)return;
var b=$_A(a.length,0);
System.arraycopy(a,0,b,0,a.length);
this.sort(b);
var c=b[b.length-1];
var d=b[0];
},"~A");
$_M(c$,"remove",
function(a){
},"~N");
$_M(c$,"remove",
function(a,b){
if(a>b)return;
},"~N,~N");
$_M(c$,"remove",
function(a){
var b=this.indexOf(a,0);
this.remove(b);
},"~S");
$_M(c$,"removeAll",
function(){
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(a){
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
this.select(a,false);
},"~A");
$_M(c$,"select",
function(a,b){
var c=0;
while(c<a.length){
var d=a[c];
if(d!=-1){
this.select(d,false);
}c++;
}
if(b)this.showSelection();
},"~A,~B");
$_M(c$,"select",
function(a){
this.select(a,false);
},"~N");
$_M(c$,"select",
function(a,b){
if(a<0)return;
},"~N,~B");
$_M(c$,"select",
function(a,b){
if(b<0||a>b||((this.i&4)!=0&&a!=b))return;
if((this.i&4)!=0){
this.select(a,false);
}else{
this.select(a,b,false);
}},"~N,~N");
$_M(c$,"select",
function(a,b,c){
if(a==b){
this.select(a,c);
return;
}if(c)this.showSelection();
},"~N,~N,~B");
$_M(c$,"selectAll",
function(){
if((this.i&4)!=0)return;
});
$_M(c$,"setBounds",
function(a,b,c,d,e){
},"~N,~N,~N,~N,~N");
$_M(c$,"setFocusIndex",
function(a){
},"~N");
$_M(c$,"setFont",
function(a){
$_U(this,$wt.widgets.List,"setFont",[a]);
},"$wt.graphics.Font");
$_M(c$,"setItem",
function(a,b){
var c=this.getTopIndex();
var d=this.isSelected(a);
this.remove(a);
this.add(b,a);
if(d)this.select(a,false);
this.setTopIndex(c);
},"~N,~S");
$_M(c$,"setItems",
function(a){
for(var b=this.e.childNodes.length-1;b>=0;b++){
this.e.removeChild(this.e.childNodes[b]);
}
for(var c=0;c<a.length;c++){
var d=d$.createElement("OPTION");
d.appendChild(d$.createTextNode(a[c]));
d.value=a[c];
this.e.appendChild(d);
}
},"~A");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
this.select(a,true);
if((this.i&2)!=0){
var c=a[0];
}},"~A");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
var c=-1;
for(var d=b-1;d>=0;--d){
var e=a[d];
var f=0;
if(e!=null){
var g=-1;
while((f=this.indexOf(e,f))!=-1){
if(g==-1)g=f;
this.select(f,false);
if((this.i&4)!=0&&this.isSelected(f)){
this.showSelection();
return;
}f++;
}
if(g!=-1)c=g;
}}
if((this.i&2)!=0){
}},"~A");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
this.select(a,true);
if((this.i&2)!=0){
}},"~N");
$_M(c$,"setSelection",
function(a,b){
this.deselectAll();
if(b<0||a>b||((this.i&4)!=0&&a!=b))return;
if((this.i&4)!=0){
this.select(a,true);
}else{
this.select(a,b,true);
}},"~N,~N");
$_M(c$,"setTopIndex",
function(a){
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
function(a,b){
$_R(this,$wt.browser.Browser,[a,b&-2049]);
this.e=d$.createElement("IFRAME");
this.e.style.position="absolute";
this.e.style.backgroundColor="white";
if(this.e.style.filter!=null){
this.e.style.border="2px solid menu";
}if(this.getParent().e!=null){
this.getParent().e.appendChild(this.e);
}},"$wt.widgets.Composite,~N");
$_M(c$,"addCloseWindowListener",
function(a){
var b=new Array(this.closeWindowListeners.length+1);
System.arraycopy(this.closeWindowListeners,0,b,0,this.closeWindowListeners.length);
this.closeWindowListeners=b;
this.closeWindowListeners[this.closeWindowListeners.length-1]=a;
},"$wt.browser.CloseWindowListener");
$_M(c$,"addLocationListener",
function(a){
var b=new Array(this.locationListeners.length+1);
System.arraycopy(this.locationListeners,0,b,0,this.locationListeners.length);
this.locationListeners=b;
this.locationListeners[this.locationListeners.length-1]=a;
},"$wt.browser.LocationListener");
$_M(c$,"addOpenWindowListener",
function(a){
var b=new Array(this.openWindowListeners.length+1);
System.arraycopy(this.openWindowListeners,0,b,0,this.openWindowListeners.length);
this.openWindowListeners=b;
this.openWindowListeners[this.openWindowListeners.length-1]=a;
},"$wt.browser.OpenWindowListener");
$_M(c$,"addProgressListener",
function(a){
var b=new Array(this.progressListeners.length+1);
System.arraycopy(this.progressListeners,0,b,0,this.progressListeners.length);
this.progressListeners=b;
this.progressListeners[this.progressListeners.length-1]=a;
},"$wt.browser.ProgressListener");
$_M(c$,"addStatusTextListener",
function(a){
var b=new Array(this.statusTextListeners.length+1);
System.arraycopy(this.statusTextListeners,0,b,0,this.statusTextListeners.length);
this.statusTextListeners=b;
this.statusTextListeners[this.statusTextListeners.length-1]=a;
},"$wt.browser.StatusTextListener");
$_M(c$,"addTitleListener",
function(a){
var b=new Array(this.titleListeners.length+1);
System.arraycopy(this.titleListeners,0,b,0,this.titleListeners.length);
this.titleListeners=b;
this.titleListeners[this.titleListeners.length-1]=a;
},"$wt.browser.TitleListener");
$_M(c$,"addVisibilityWindowListener",
function(a){
var b=new Array(this.visibilityWindowListeners.length+1);
System.arraycopy(this.visibilityWindowListeners,0,b,0,this.visibilityWindowListeners.length);
this.visibilityWindowListeners=b;
this.visibilityWindowListeners[this.visibilityWindowListeners.length-1]=a;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"back",
function(){
if(!this.$back)return false;
if(this.e!=null&&this.e.contentWindow!=null){
try{
this.e.contentWindow.history.back();
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
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
});
$_M(c$,"execute",
function(a){
return true;
},"~S");
$_M(c$,"forward",
function(){
if(!this.$forward)return false;
if(this.e!=null&&this.e.contentWindow!=null){
try{
this.e.contentWindow.history.forward();
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
if(this.e!=null){
if(this.e.contentWindow!=null){
this.e.contentWindow.reload();
}else{
this.e.src=this.url;
}}});
$_M(c$,"removeCloseWindowListener",
function(a){
if(this.closeWindowListeners.length==0)return;
var b=-1;
for(var c=0;c<this.closeWindowListeners.length;c++){
if(a==this.closeWindowListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.closeWindowListeners.length==1){
this.closeWindowListeners=new Array(0);
return;
}var d=new Array(this.closeWindowListeners.length-1);
System.arraycopy(this.closeWindowListeners,0,d,0,b);
System.arraycopy(this.closeWindowListeners,b+1,d,b,this.closeWindowListeners.length-b-1);
this.closeWindowListeners=d;
},"$wt.browser.CloseWindowListener");
$_M(c$,"removeLocationListener",
function(a){
if(this.locationListeners.length==0)return;
var b=-1;
for(var c=0;c<this.locationListeners.length;c++){
if(a==this.locationListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.locationListeners.length==1){
this.locationListeners=new Array(0);
return;
}var d=new Array(this.locationListeners.length-1);
System.arraycopy(this.locationListeners,0,d,0,b);
System.arraycopy(this.locationListeners,b+1,d,b,this.locationListeners.length-b-1);
this.locationListeners=d;
},"$wt.browser.LocationListener");
$_M(c$,"removeOpenWindowListener",
function(a){
if(this.openWindowListeners.length==0)return;
var b=-1;
for(var c=0;c<this.openWindowListeners.length;c++){
if(a==this.openWindowListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.openWindowListeners.length==1){
this.openWindowListeners=new Array(0);
return;
}var d=new Array(this.openWindowListeners.length-1);
System.arraycopy(this.openWindowListeners,0,d,0,b);
System.arraycopy(this.openWindowListeners,b+1,d,b,this.openWindowListeners.length-b-1);
this.openWindowListeners=d;
},"$wt.browser.OpenWindowListener");
$_M(c$,"removeProgressListener",
function(a){
if(this.progressListeners.length==0)return;
var b=-1;
for(var c=0;c<this.progressListeners.length;c++){
if(a==this.progressListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.progressListeners.length==1){
this.progressListeners=new Array(0);
return;
}var d=new Array(this.progressListeners.length-1);
System.arraycopy(this.progressListeners,0,d,0,b);
System.arraycopy(this.progressListeners,b+1,d,b,this.progressListeners.length-b-1);
this.progressListeners=d;
},"$wt.browser.ProgressListener");
$_M(c$,"removeStatusTextListener",
function(a){
if(this.statusTextListeners.length==0)return;
var b=-1;
for(var c=0;c<this.statusTextListeners.length;c++){
if(a==this.statusTextListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.statusTextListeners.length==1){
this.statusTextListeners=new Array(0);
return;
}var d=new Array(this.statusTextListeners.length-1);
System.arraycopy(this.statusTextListeners,0,d,0,b);
System.arraycopy(this.statusTextListeners,b+1,d,b,this.statusTextListeners.length-b-1);
this.statusTextListeners=d;
},"$wt.browser.StatusTextListener");
$_M(c$,"removeTitleListener",
function(a){
if(this.titleListeners.length==0)return;
var b=-1;
for(var c=0;c<this.titleListeners.length;c++){
if(a==this.titleListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.titleListeners.length==1){
this.titleListeners=new Array(0);
return;
}var d=new Array(this.titleListeners.length-1);
System.arraycopy(this.titleListeners,0,d,0,b);
System.arraycopy(this.titleListeners,b+1,d,b,this.titleListeners.length-b-1);
this.titleListeners=d;
},"$wt.browser.TitleListener");
$_M(c$,"removeVisibilityWindowListener",
function(a){
if(this.visibilityWindowListeners.length==0)return;
var b=-1;
for(var c=0;c<this.visibilityWindowListeners.length;c++){
if(a==this.visibilityWindowListeners[c]){
b=c;
break;
}}
if(b==-1)return;
if(this.visibilityWindowListeners.length==1){
this.visibilityWindowListeners=new Array(0);
return;
}var d=new Array(this.visibilityWindowListeners.length-1);
System.arraycopy(this.visibilityWindowListeners,0,d,0,b);
System.arraycopy(this.visibilityWindowListeners,b+1,d,b,this.visibilityWindowListeners.length-b-1);
this.visibilityWindowListeners=d;
},"$wt.browser.VisibilityWindowListener");
$_M(c$,"setText",
function(a){
var b=this.html!=null;
this.html=a;
if(b)return true;
if(this.e!=null){
BrowserNative.iframeDocumentWrite(this.e,a);
}this.html=null;
return true;
},"~S");
$_M(c$,"setUrl",
function(a){
this.html=null;
this.url=a;
if(this.e!=null){
if(this.e.contentWindow!=null){
this.e.contentWindow.location=a;
}else{
this.e.src=a;
}}this.$back=true;
return true;
},"~S");
$_M(c$,"stop",
function(){
if(this.e!=null){
if(this.e.contentWindow!=null){
this.e.contentWindow.stop();
}else{
}}});
$_M(c$,"setBounds",
function(a,b,c,d){
if(this.e.style.filter!=null){
$_U(this,$wt.browser.Browser,"setBounds",[a,b,c-2,d-2]);
}else{
$_U(this,$wt.browser.Browser,"setBounds",[a,b,c-4,d-4]);
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
function(a,b){
this.construct(a,b,$wt.widgets.TableItem.checkNull(a).getItemCount(),true);
},"$wt.widgets.Table,~N");
$_K(c$,
function(a,b,c){
this.construct(a,b,c,true);
},"$wt.widgets.Table,~N,~N");
$_K(c$,
function(a,b,c,d){
$_R(this,$wt.widgets.TableItem,[a,b]);
this.parent=a;
if(d)a.createItem(this,c);
},"$wt.widgets.Table,~N,~N,~B");
c$.checkNull=$_M(c$,"checkNull",
function(a){
return a;
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
if((this.parent.i&268435456)!=0)this.cached=false;
});
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.b,this.e.style.backgroundColor);
});
$_M(c$,"getBackground",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getBackground();
return new $wt.graphics.Color(this.b,this.e.childNodes[a].style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.i&32)==0)return false;
return this.checked;
});
$_M(c$,"getFont",
function(){
return this.b.getSystemFont();
});
$_M(c$,"getFont",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getFont();
return this.b.getSystemFont();
},"~N");
$_M(c$,"getForeground",
function(){
return new $wt.graphics.Color(this.b,this.e.style.color);
});
$_M(c$,"getForeground",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getForeground();
return new $wt.graphics.Color(null,this.e.childNodes[a].style.backgroundColor);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.i&32)==0)return false;
return this.grayed;
});
$_M(c$,"getImage",
function(){
return $_U(this,$wt.widgets.TableItem,"getImage",[]);
});
$_M(c$,"getImage",
function(a){
if(a==0)return this.getImage();
if(this.images!=null){
if(0<=a&&a<this.images.length)return this.images[a];
}return null;
},"~N");
$_M(c$,"getImageBounds",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getImageIndent",
function(){
return this.imageIndent;
});
$_M(c$,"getNameText",
function(){
if((this.parent.i&268435456)!=0){
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
function(a){
if(a==0)return this.getText();
if(this.strings!=null){
if(0<=a&&a<this.strings.length){
var b=this.strings[a];
return b!=null?b:"";
}}return"";
},"~N");
$_M(c$,"redraw",
function(){
if((this.parent.i&268435456)!=0)this.cached=true;
if(this.parent.currentItem==this||this.parent.drawCount!=0)return;
var a=this.parent.indexOf(this);
if(a==-1)return;
});
$_M(c$,"redraw",
function(a,b,c){
if((this.parent.i&268435456)!=0)this.cached=true;
if(this.parent.currentItem==this||this.parent.drawCount!=0)return;
var d=this.parent.indexOf(this);
if(d==-1)return;
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
function(a){
var b=-1;
if(a!=null){
this.e.style.backgroundColor=a.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(b!=null){
this.e.childNodes[a].style.backgroundColor=b.getCSSHandle();
}},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(a){
if((this.parent.i&32)==0)return;
if(this.checked==a)return;
this.setChecked(a,false);
},"~B");
$_M(c$,"setChecked",
function(a,b){
this.checked=a;
if(b){
var c=new $wt.widgets.Event();
c.item=this;
c.detail=32;
this.parent.postEvent(13,c);
}this.redraw();
},"~B,~B");
$_M(c$,"setFont",
function(a){
var b=-1;
if(a!=null){
this.parent.customDraw=true;
}if(this.font==b)return;
this.font=b;
this.parent.setScrollWidth(this,false);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(b!=null){
this.parent.customDraw=true;
}if(this.cellFont==null){
this.cellFont=$_A(c,0);
for(var d=0;d<c;d++){
this.cellFont[d]=-1;
}
}this.redraw(a,true,false);
},"~N,$wt.graphics.Font");
$_M(c$,"setForeground",
function(a){
var b=-1;
if(a!=null){
this.e.style.color=a.getCSSHandle();
}},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
var d=-1;
if(b!=null){
this.e.childNodes[a].style.color=b.getCSSHandle();
}},"~N,$wt.graphics.Color");
$_M(c$,"setGrayed",
function(a){
if((this.parent.i&32)==0)return;
if(this.grayed==a)return;
this.grayed=a;
this.redraw();
},"~B");
$_M(c$,"setImage",
function(a){
for(var b=0;b<a.length;b++){
this.setImage(b,a[b]);
}
},"~A");
$_M(c$,"setText",
function(a){
this.setText(0,a);
},"~S");
$_M(c$,"setImage",
function(a,b){
if(a==0){
if(b!=null&&b.type==1){
if(b.equals(this.image))return;
}$_U(this,$wt.widgets.TableItem,"setImage",[b]);
}var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(this.images==null&&a!=0)this.images=new Array(c);
if(this.images!=null){
if(b!=null&&b.type==1){
if(b.equals(this.images[a]))return;
}this.images[a]=b;
}this.redraw(a,false,true);
},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(a){
this.setImage(0,a);
},"$wt.graphics.Image");
$_M(c$,"setImageIndent",
function(a){
if(a<0)return;
if(this.imageIndent==a)return;
this.imageIndent=a;
if((this.parent.i&268435456)==0){
var b=this.parent.indexOf(this);
if(b!=-1){
}}this.parent.setScrollWidth(this,false);
this.redraw();
},"~N");
$_M(c$,"setText",
function(a){
for(var b=0;b<a.length;b++){
var c=a[b];
if(c!=null)this.setText(b,c);
}
},"~A");
$_M(c$,"setText",
function(a,b){
if(a==0){
if(b.equals(this.text))return;
$_U(this,$wt.widgets.TableItem,"setText",[b]);
}var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(this.strings==null&&a!=0)this.strings=new Array(c);
if(this.strings!=null){
if(b.equals(this.strings[a]))return;
this.strings[a]=b;
}var d=null;
if(a<this.e.childNodes.length){
if(this.e.childNodes[a]!=null&&"TD".equals(this.e.childNodes[a].nodeName)){
d=this.e.childNodes[a];
}}if(d==null){
d=d$.createElement("TD");
this.e.appendChild(d);
}if(d.childNodes!=null){
for(var e=0;e<d.childNodes.length;e++){
if(d.childNodes[e]!=null){
d.removeChild(d.childNodes[e]);
}}
}var e=d$.createElement("DIV");
d.appendChild(e);
e.className="table-item-cell-default";
if(a==0&&(this.parent.i&32)!=0){
var f=d$.createElement("INPUT");
f.type="checkbox";
e.appendChild(f);
f.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=new $wt.widgets.Event();
a.type=13;
a.detail=32;
a.item=this.b$["$wt.widgets.TableItem"];
a.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(a);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$1,i$,v$);
})(this,null));
}var f=d$.createElement("DIV");
e.appendChild(f);
f.className="table-item-cell-text-default";
f.appendChild(d$.createTextNode(b));
if((this.parent.i&65536)!=0||a==0){
f.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],a.ctrlKey,a.shiftKey);
var b=new $wt.widgets.Event();
b.type=13;
b.detail=0;
b.item=this.b$["$wt.widgets.TableItem"];
b.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(b);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$2,i$,v$);
})(this,null));
f.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TableItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TableItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.getEvent();
this.b$["$wt.widgets.TableItem"].parent.toggleSelection(this.b$["$wt.widgets.TableItem"],a.ctrlKey,a.shiftKey);
System.out.println("An event is runned "+a);
var b=new $wt.widgets.Event();
b.type=14;
b.detail=0;
b.item=this.b$["$wt.widgets.TableItem"];
b.widget=this.b$["$wt.widgets.TableItem"];
this.b$["$wt.widgets.TableItem"].parent.sendEvent(b);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TableItem$3,i$,v$);
})(this,null));
}},"~N,~S");
$_M(c$,"showSelection",
function(a){
this.selected=a;
var b=0;
if((this.parent.i&32)!=0){
b++;
}var c=this.e.childNodes[0].childNodes[0].childNodes[b];
c.className=a?"table-item-cell-text-selected":"table-item-cell-text-default";
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
function(a,b){
$_R(this,$wt.widgets.TableColumn,[a,$wt.widgets.TableColumn.checkStyle(b)]);
this.resizable=true;
this.parent=a;
a.createItem(this,a.getColumnCount());
},"$wt.widgets.Table,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.TableColumn,[a,$wt.widgets.TableColumn.checkStyle(b)]);
this.resizable=true;
this.parent=a;
a.createItem(this,c);
},"$wt.widgets.Table,~N,~N");
$_M(c$,"addControlListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(11,b);
this.addListener(10,b);
},"$wt.events.ControlListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,16384,16777216,131072,0,0,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getAlignment",
function(){
if((this.i&16384)!=0)return 16384;
if((this.i&16777216)!=0)return 16777216;
if((this.i&131072)!=0)return 131072;
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
var a=this.parent.indexOf(this);
if(a==-1)return 0;
if(this.e.style.width!=null&&this.e.style.width.length!=0){
return Integer.parseInt(this.e.style.width);
}return $wt.internal.browser.OS.getContainerWidth(this.e);
});
$_M(c$,"pack",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return;
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
function(a){
if(this.d==null)return;
this.d.unhook(10,a);
this.d.unhook(11,a);
},"$wt.events.ControlListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setAlignment",
function(a){
if((a&(16924672))==0)return;
var b=this.parent.indexOf(this);
if(b==-1||b==0)return;
this.i&=-16924673;
this.i|=a&(16924672);
},"~N");
$_M(c$,"setImage",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TableColumn,"setImage",[a]);
},"$wt.graphics.Image");
$_M(c$,"setMoveable",
function(a){
this.moveable=a;
this.parent.updateMoveable();
},"~B");
$_M(c$,"setResizable",
function(a){
this.resizable=a;
},"~B");
$_M(c$,"setText",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TableColumn,"setText",[a]);
if(this.e.childNodes!=null){
for(var c=0;c<this.e.childNodes.length;c++){
if(this.e.childNodes[c]!=null){
this.e.removeChild(this.e.childNodes[c]);
}}
}this.e.appendChild(d$.createTextNode(a));
},"~S");
$_M(c$,"setWidth",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
this.e.style.width=a+"px";
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
function(a,b){
$_R(this,$wt.widgets.Table,[a,$wt.widgets.Table.checkStyle(b)]);
this.selection=new Array(0);
this.items=new Array(0);
this.columns=new Array(0);
},"$wt.widgets.Composite,~N");
$_M(c$,"_getItem",
function(a){
if(this.items[a]!=null)return this.items[a];
return this.items[a]=new $wt.widgets.TableItem(this,0,-1,false);
},"~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=768;
return $wt.widgets.Widget.checkBits(a,4,2,0,0,0,0);
},"~N");
$_M(c$,"checkData",
function(a,b){
if(a.cached)return true;
if((this.i&268435456)!=0){
a.cached=true;
var c=new $wt.widgets.Event();
c.item=a;
this.currentItem=a;
this.sendEvent(36,c);
this.currentItem=null;
if(this.isDisposed()||a.isDisposed())return false;
if(b){
if(!this.setScrollWidth(a,false)){
a.redraw();
}}}return true;
},"$wt.widgets.TableItem,~B");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"clear",
function(a){
var b=this.items.length;
},"~N");
$_M(c$,"clear",
function(a,b){
if(a>b)return;
},"~N,~N");
$_M(c$,"clear",
function(a){
if(a.length==0)return;
},"~A");
$_M(c$,"clearAll",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
var f=0;
for(var g=0;g<this.columns.length;g++){
var h=0;
var i=this.columns[g].getNameText();
var j=this.getTextWidth(i);
h=Math.max(h,j);
for(var k=0;k<this.items.length;k++){
h=Math.max(h,this.getTextWidth(this.items[k].getText(g)));
}
f+=h+10;
}
d=f;
if(this.items.length>0){
var h=this.items[0].getNameText();
System.out.println(h);
e=($wt.internal.browser.OS.getStringPlainHeight(h)+5)*(this.items.length+0);
}else{
e=24;
}if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
var h=this.getBorderWidth();
d+=h*2;
e+=h*2;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Table,"createHandle",[]);
this.h&=-3;
this.e=d$.createElement("DIV");
this.e.className="table-default";
var a=d$.createElement("TABLE");
this.e.appendChild(a);
if(this.parent!=null){
var b=this.parent.containerHandle();
if(b!=null){
b.appendChild(this.e);
}}});
$_M(c$,"createItem",
function(a,b){
if(this.columns==null){
this.columns=new Array(0);
}if(this.e==null){
return;
}var c=this.e.childNodes[0];
var d=null;
for(var e=0;e<c.childNodes.length;e++){
if("THEAD".equals(c.childNodes[e].nodeName)){
d=c.childNodes[e];
break;
}}
if(d==null){
d=d$.createElement("THEAD");
d.style.backgroundColor="menu";
c.appendChild(d);
}var f=null;
if(d.childNodes!=null&&d.childNodes.length!=0){
for(var g=0;g<d.childNodes.length;g++){
if(d.childNodes[g]!=null&&"TR".equals(d.childNodes[g].nodeName)){
f=d.childNodes[g];
}}
}if(f==null){
f=d$.createElement("TR");
d.appendChild(f);
}var g=d$.createElement("TD");
g.style.whiteSpace="nowrap";
if(b<0||b>=f.childNodes.length){
f.appendChild(g);
this.columns[b]=a;
}else{
f.insertBefore(g,f.childNodes[b]);
for(var h=this.columns.length;h>b;h--){
this.columns[h]=this.columns[h-1];
}
this.columns[b]=a;
for(var i=0;i<this.items.length;i++){
var j=d$.createElement("TD");
this.items[i].e.insertBefore(j,this.items[i].e.childNodes[b]);
for(var k=this.items[i].strings.length;k>b;k--){
this.items[i].strings[k]=this.items[i].strings[k-1];
}
this.items[i].strings[b]="";
}
}if(g.childNodes!=null){
for(var h=0;h<g.childNodes.length;h++){
if(g.childNodes[h]!=null){
g.removeChild(g.childNodes[h]);
}}
}g.appendChild(d$.createTextNode(a.getText()));
g.style.margin="0";
g.style.padding="0";
a.e=g;
},"$wt.widgets.TableColumn,~N");
$_M(c$,"createItem",
function(a,b){
if(this.items==null){
this.items=new Array(0);
}a.index=b;
this.items[b]=a;
if(this.e==null){
return;
}var c=this.e.childNodes[0];
var d=null;
for(var e=0;e<c.childNodes.length;e++){
if("TBODY".equals(c.childNodes[e].nodeName)){
d=c.childNodes[e];
break;
}}
if(d==null){
d=d$.createElement("TBODY");
c.appendChild(d);
}var f=d$.createElement("TR");
f.className="table-item-default";
if(b<0||b>=d.childNodes.length){
d.appendChild(f);
this.items[b]=a;
}else{
System.out.println("existed");
d.insertBefore(f,d.childNodes[b]);
for(var g=this.items.length;g>b;g--){
this.items[g]=this.items[g-1];
this.items[g].index=g;
}
this.items[b]=a;
}a.e=f;
},"$wt.widgets.TableItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.Table,"createWidget",[]);
this.items=new Array(0);
this.columns=new Array(0);
if((this.i&268435456)!=0)this.customDraw=true;
});
$_M(c$,"deselect",
function(a){
if(a.length==0)return;
for(var b=0;b<a.length;b++){
if(a[b]>=0){
this.items[a[b]].showSelection(false);
}}
this.removeFromSelection(a);
},"~A");
$_M(c$,"deselect",
function(a){
if(a<0)return;
this.items[a].showSelection(false);
this.removeFromSelection([a]);
},"~N");
$_M(c$,"deselect",
function(a,b){
var c=this.items.length;
if(a==0&&b==c-1){
this.deselectAll();
}else{
a=Math.max(0,a);
var d=$_A(b-a+1,0);
for(var e=a;e<=b;e++){
this.items[e].showSelection(false);
d[e-a]=e;
}
this.removeFromSelection(d);
}},"~N,~N");
$_M(c$,"deselectAll",
function(){
for(var a=0;a<this.items.length;a++){
this.items[a].showSelection(false);
}
this.selection=new Array(0);
});
$_M(c$,"destroyItem",
function(a){
},"$wt.widgets.TableColumn");
$_M(c$,"destroyItem",
function(a){
},"$wt.widgets.TableItem");
$_M(c$,"fixCheckboxImageList",
function(){
if((this.i&32)==0)return;
});
$_M(c$,"getTextWidth",
($fz=function(a){
var b=0;
if(a==null||a.length==0){
b=0;
}else{
b=$wt.internal.browser.OS.getStringPlainWidth(a);
}return b;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getColumn",
function(a){
return this.columns[a];
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
var a=this.columns.length;
if(a==1&&this.columns[0]==null)a=0;
var b=new Array(a);
System.arraycopy(this.columns,0,b,0,a);
return b;
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
function(a){
var b=this.items.length;
return this._getItem(a);
},"~N");
$_M(c$,"getItem",
function(a){
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
var a=this.items.length;
var b=new Array(a);
if((this.i&268435456)!=0){
for(var c=0;c<a;c++){
b[c]=this._getItem(c);
}
}else{
System.arraycopy(this.items,0,b,0,a);
}return b;
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
var a=$_A(this.selection.length,0);
for(var b=0;b<this.selection.length;b++){
a[b]=0;
}
return a;
});
$_M(c$,"getTopIndex",
function(){
return 0;
});
$_M(c$,"indexOf",
function(a){
var b=this.columns.length;
for(var c=0;c<b;c++){
if(this.columns[c]==a)return c;
}
return-1;
},"$wt.widgets.TableColumn");
$_M(c$,"indexOf",
function(a){
var b=this.items.length;
if(1<=this.lastIndexOf&&this.lastIndexOf<b-1){
if(this.items[this.lastIndexOf]==a)return this.lastIndexOf;
if(this.items[this.lastIndexOf+1]==a)return++this.lastIndexOf;
if(this.items[this.lastIndexOf-1]==a)return--this.lastIndexOf;
}if(this.lastIndexOf<Math.floor(b/2)){
for(var c=0;c<b;c++){
if(this.items[c]==a)return this.lastIndexOf=c;
}
}else{
for(var c=b-1;c>=0;--c){
if(this.items[c]==a)return this.lastIndexOf=c;
}
}return-1;
},"$wt.widgets.TableItem");
$_M(c$,"isSelected",
function(a){
return false;
},"~N");
$_M(c$,"removeItems",
function(a){
if(a==null&&a.length>this.items.length)return;
var b=this.e.childNodes[0];
var c=null;
for(var d=0;d<b.childNodes.length;d++){
if("TBODY".equals(b.childNodes[d].nodeName)){
c=b.childNodes[d];
break;
}}
var e=this.items.length;
if(c==null)return;
var f=-1;
var g=new Array(this.items.length-a.length);
for(var h=0;h<a.length;h++){
var i=h;
if(i<0||i>=this.items.length)return;
var j=this.items[i];
if(j==null)return;
if(j!=null){
System.arraycopy(this.items,i+1,this.items,i,--e-i);
this.items[e]=null;
f=i;
}c.removeChild(j.e);
}
},"~A");
$_M(c$,"releaseWidget",
function(){
var a=this.columns.length;
if(a==1&&this.columns[0]==null)a=0;
var b=this.items.length;
for(var c=0;c<b;c++){
var d=this.items[c];
if(d!=null&&!d.isDisposed())d.releaseResources();
}
this.customDraw=false;
this.currentItem=null;
this.items=null;
for(var d=0;d<a;d++){
var e=this.columns[d];
if(!e.isDisposed())e.releaseResources();
}
this.columns=null;
if(this.imageList!=null){
this.b.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.Table,"releaseWidget",[]);
});
$_M(c$,"remove",
function(a){
if(a.length==0)return;
var b=$_A(a.length,0);
System.arraycopy(a,0,b,0,a.length);
var c=this.e.childNodes[0];
var d=null;
for(var e=0;e<c.childNodes.length;e++){
if("TBODY".equals(c.childNodes[e].nodeName)){
d=c.childNodes[e];
break;
}}
if(d==null)return;
var f=b[b.length-1];
var g=b[0];
var h=this.items.length;
if(!(0<=f&&f<=g&&g<h)){
return;
}this.deselect(a);
var i=new Array(a.length);
var j=-1;
for(var k=0;k<b.length;k++){
var l=b[k];
if(l!=j){
var m=this.items[l];
if(m!=null){
d.removeChild(m.e);
m.releaseHandle();
System.arraycopy(this.items,l+1,this.items,l,--h-l);
this.items[h]=null;
j=l;
}}}
var l=new Array(a.length);
System.arraycopy(this.items,0,l,0,a.length);
this.items=l;
},"~A");
$_M(c$,"remove",
function(a){
this.remove([a]);
},"~N");
$_M(c$,"remove",
function(a,b){
if(a>b)return;
var c=this.items.length;
if(!(0<=a&&a<=b&&b<c)){
return;
}var d=this.e.childNodes[0];
var e=null;
for(var f=0;f<d.childNodes.length;f++){
if("TBODY".equals(d.childNodes[f].nodeName)){
e=d.childNodes[f];
break;
}}
if(e==null)return;
this.deselect(a,b);
var g=a;
while(g<=b){
var h=this.items[g];
if(h!=null&&!h.isDisposed()){
e.removeChild(h.e);
h.releaseHandle();
}g++;
}
var h=new Array(c-(g-a));
System.arraycopy(this.items,0,h,0,a);
System.arraycopy(this.items,g,h,a,c-g);
this.items=h;
},"~N,~N");
$_M(c$,"removeAll",
function(){
this.remove(0,this.items.length-1);
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(a){
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
},"~A");
$_M(c$,"select",
function(a){
if(a<0)return;
this.deselectAll();
this.items[a].showSelection(true);
this.selection=new Array(1);
this.selection[0]=this.items[a];
this.items[a].e.className="table-item-selected";
},"~N");
$_M(c$,"select",
function(a,b){
if(b<0||a>b||((this.i&4)!=0&&a!=b))return;
var c=this.items.length;
if(c==0||a>=c)return;
this.deselectAll();
a=Math.max(0,a);
b=Math.min(b,c-1);
if(a==0&&b==c-1){
this.selectAll();
}else{
this.selection=new Array(b-a+1);
for(var d=a;d<=b;d++){
this.items[d].showSelection(true);
this.selection[d-a]=this.items[d];
}
}},"~N,~N");
$_M(c$,"selectAll",
function(){
if((this.i&4)!=0)return;
this.selection=new Array(this.items.length);
for(var a=0;a<this.items.length;a++){
this.items[a].showSelection(true);
this.selection[a]=this.items[a];
}
});
$_M(c$,"setBounds",
function(a,b,c,d,e){
var f=false;
if(f)this.setRedraw(false);
$_U(this,$wt.widgets.Table,"setBounds",[a,b,c,d,e]);
if(f)this.setRedraw(true);
},"~N,~N,~N,~N,~N");
$_M(c$,"setColumnOrder",
function(a){
},"~A");
$_M(c$,"setCheckboxImageListColor",
function(){
if((this.i&32)==0)return;
});
$_M(c$,"setCheckboxImageList",
function(a,b){
if((this.i&32)==0)return;
var c=4;
},"~N,~N");
$_M(c$,"setFocusIndex",
function(a){
if(a<0)return;
},"~N");
$_M(c$,"setFont",
function(a){
var b=this.getTopIndex();
this.setRedraw(false);
this.setTopIndex(0);
$_U(this,$wt.widgets.Table,"setFont",[a]);
this.setTopIndex(b);
this.setScrollWidth(null,true);
this.setRedraw(true);
this.setItemHeight();
},"$wt.graphics.Font");
$_M(c$,"setHeaderVisible",
function(a){
},"~B");
$_M(c$,"setItemCount",
function(a){
a=Math.max(0,a);
},"~N");
$_M(c$,"setItemHeight",
function(){
});
$_M(c$,"setLinesVisible",
function(a){
var b=0;
},"~B");
$_V(c$,"setRedraw",
function(a){
},"~B");
$_M(c$,"setScrollWidth",
function(a,b){
if(this.currentItem!=null){
if(this.currentItem!=a)this.fixScrollWidth=true;
return false;
}return false;
},"$wt.widgets.TableItem,~B");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
this.select(a);
var c=a[0];
if(c!=-1)this.setFocusIndex(c);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1))return;
var c=-1;
this.selection=a;
for(var d=b-1;d>=0;--d){
var e=this.indexOf(a[d]);
a[d].showSelection(true);
if(e!=-1){
c=e;
}}
if(c!=-1)this.setFocusIndex(c);
this.showSelection();
},"~A");
$_M(c$,"setSelection",
function(a){
this.deselectAll();
this.select(a);
this.setFocusIndex(a);
},"~N");
$_M(c$,"setSelection",
function(a,b){
this.deselectAll();
if(b<0||a>b||((this.i&4)!=0&&a!=b))return;
var c=this.items.length;
if(c==0||a>=c)return;
a=Math.max(0,a);
b=Math.min(b,c-1);
this.select(a,b);
this.selection=new Array(b-a+1);
for(var d=a;d<=b;d++){
this.selection[d-a]=this.items[d];
}
this.setFocusIndex(a);
this.showSelection();
},"~N,~N");
$_M(c$,"setTableEmpty",
function(){
});
$_M(c$,"removeFromSelection",
($fz=function(a){
if(this.selection.length<a.length){
return;
}var b=new Array(this.selection.length-a.length);
var c=0;
for(var d=0;d<a.length;d++){
if(this.selection[d].isSelected()){
b[c++]=this.selection[d];
}}
this.selection=b;
},$fz.isPrivate=true,$fz),"~A");
$_M(c$,"toggleSelection",
function(a,b,c){
if(a==null){
return false;
}if((this.i&2)!=0&&(b||c)){
if(b){
for(var d=0;d<this.selection.length;d++){
if(a==this.selection[d]){
var e=new Array(this.selection.length);
for(var f=0;f<d;f++){
e[f]=this.selection[f];
}
for(var g=d;g<this.selection.length-1;g++){
e[g]=this.selection[g+1];
}
this.selection=e;
a.showSelection(false);
this.lastSelection=a;
return false;
}}
this.selection[this.selection.length]=a;
this.lastSelection=a;
a.showSelection(true);
}else{
for(var d=0;d<this.selection.length;d++){
if(this.selection[d]!=null){
this.selection[d].showSelection(false);
}}
if(this.lastSelection!=null){
var e=Math.min(this.lastSelection.index,a.index);
var f=Math.max(this.lastSelection.index,a.index);
System.out.println("here!"+e+":"+f);
this.selection=new Array(0);
for(var g=e;g<=f;g++){
var h=this.items[g];
this.selection[this.selection.length]=h;
h.showSelection(true);
}
return true;
}else{
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=a;
}}}else{
a.showSelection(true);
for(var d=0;d<this.selection.length;d++){
if(this.selection[d]!=null&&this.selection[d]!=a){
this.selection[d].showSelection(false);
}}
if(this.selection.length!=1){
this.selection=new Array(1);
}this.selection[0]=a;
}this.lastSelection=a;
return true;
},"$wt.widgets.TableItem,~B,~B");
$_M(c$,"setTopIndex",
function(a){
},"~N");
$_M(c$,"showColumn",
function(a){
if(a.parent!=this)return;
var b=this.indexOf(a);
if(b==-1)return;
},"$wt.widgets.TableColumn");
$_M(c$,"showItem",
function(a){
},"~N");
$_M(c$,"showItem",
function(a){
var b=this.indexOf(a);
if(b!=-1)this.showItem(b);
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
function(a,b){
$_R(this,$wt.widgets.TabItem,[a,b]);
this.parent=a;
var c=a.getItemCount();
a.createItem(this,c);
this.configure(c);
},"$wt.widgets.TabFolder,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.TabItem,[a,b]);
this.parent=a;
a.createItem(this,c);
this.configure(c);
},"$wt.widgets.TabFolder,~N,~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"configure",
($fz=function(a){
this.e.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabItem$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TabItem"].parent.setSelection(this.f$.a,true);
});
c$=$_P();
}
return $_N($wt.widgets.TabItem$1,i$,v$);
})(this,$_F("a",a)));
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
var a=this.parent.indexOf(this);
if(a==this.parent.getSelectionIndex()){
if(this.control!=null)this.control.setVisible(false);
}this.parent.destroyItem(this);
});
$_M(c$,"releaseHandle",
function(){
if(this.textEl!=null){
BrowserNative.releaseHandle(this.textEl);
this.textEl=null;
}if(this.e!=null){
BrowserNative.releaseHandle(this.e);
this.e=null;
}$_U(this,$wt.widgets.TabItem,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TabItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(a){
if(a!=null){
}if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var b=this.control;
var c=a;
this.control=a;
var d=this.parent.indexOf(this);
if(d!=this.parent.getSelectionIndex()){
if(c!=null)c.setVisible(false);
return;
}if(c!=null){
c.setBounds(this.parent.getClientArea());
c.setVisible(true);
}if(b!=null)b.setVisible(false);
},"$wt.widgets.Control");
$_M(c$,"setImage",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TabItem,"setImage",[a]);
if(a!=null&&a.handle==null&&a.url!=null&&a.url.length!=0){
var c=this.textEl.style;
if(a.url.toLowerCase().endsWith(".png")&&c.filter!=null){
c.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
c.backgroundImage="url(\"" + this.image.url + "\")";
}}else{
this.textEl.style.backgroundImage="";
if($wt.internal.browser.OS.isIE&&a.url!=null&&a.url.toLowerCase().endsWith(".png")&&this.textEl.style.filter!=null){
this.textEl.style.filter="";
}}var c=this.e.className;
if(c==null)c="";
var d="tab-item-image";
var e=c.indexOf(d);
this.hasImage=a!=null;
if(this.hasImage){
if(e==-1){
this.e.className+=" "+d;
}}else{
if(e!=-1){
this.e.className=c.substring(0,e)+c.substring(e+d.length);
}}},"$wt.graphics.Image");
$_M(c$,"setText",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TabItem,"setText",[a]);
if(this.e!=null){
$wt.internal.browser.OS.clearChildren(this.e);
this.textEl=d$.createElement("SPAN");
this.e.appendChild(this.textEl);
this.textEl.appendChild(d$.createTextNode(a));
}this.text=a;
},"~S");
$_M(c$,"setToolTipText",
function(a){
this.toolTipText=a;
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
function(a,b){
$_R(this,$wt.widgets.TabFolder,[a,$wt.widgets.TabFolder.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a=$wt.widgets.Widget.checkBits(a,128,1024,0,0,0,0);
return a&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
System.out.println(a+","+b+","+c);
var d=$_U(this,$wt.widgets.TabFolder,"computeSize",[a,b,c]);
System.out.println("super size of tabfolder:"+d);
var e=-124;
if(this.items!=null&&this.items.length!=0){
for(var f=0;f<this.items.length;f++){
if(this.items[f]!=null&&!this.items[f].isDisposed()){
e+=$wt.internal.browser.OS.getContainerWidth(this.items[f].e);
}}
}if(e<0){
e+=136;
}var f=this.getBorderWidth();
e+=f*2;
d.x=Math.max(e,d.x);
System.out.println("in tab folder "+d);
return d;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(a,b,c,d){
var e=0;
if(this.items!=null&&this.items.length>0){
e=$wt.internal.browser.OS.getContainerHeight(this.items[this.offset].e);
if(this.getSelectionIndex()==this.offset){
e-=2;
}if($wt.internal.browser.OS.isIE){
e++;
}else{
if((this.i&1024)!=0){
e--;
}}a-=4;
b-=4+e;
}c+=8;
d+=8+e;
var f=this.getBorderWidth();
a-=f;
b-=f;
c+=f*2;
d+=f*2;
return new $wt.graphics.Rectangle(a,b,c,d);
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.contentArea;
});
$_M(c$,"createCSSElement",
function(a,b){
var c=d$.createElement("DIV");
if(b!=null){
c.className=b;
}if(a!=null){
(a).appendChild(c);
}return c;
},"Object,~S");
$_M(c$,"createItem",
function(a,b){
var c=this.items.length;
var d=d$.createElement("DIV");
d.className="tab-item-default";
this.borderFrame.insertBefore(d,this.itemMore);
var e=this.borderFrame.className;
if(e==null)e="";
var f="tab-folder-no-tab";
var g=e.indexOf(f);
if(g!=-1){
this.borderFrame.className=e.substring(0,g)+e.substring(g+f.length);
}a.textEl=d$.createElement("SPAN");
d.appendChild(a.textEl);
a.textEl.appendChild(d$.createTextNode(a.getNameText()));
var h=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<b;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
h+=$wt.internal.browser.OS.getContainerWidth(this.items[i].e);
}}
}if(h<2){
h=2;
}d.style.left=h+"px";
this.items[b]=a;
this.items[b].e=d;
if(c==0){
this.setSelection(0,false);
var i=new $wt.widgets.Event();
i.item=this.items[0];
this.sendEvent(13,i);
}},"$wt.widgets.TabItem,~N");
$_V(c$,"createHandle",
function(){
this.items=new Array(0);
var a="tab-folder-default";
if((this.i&2048)!=0){
a+=" tab-folder-border-default";
}this.e=this.createCSSElement(this.parent.containerHandle(),a);
a="tab-folder-no-tab";
if((this.i&1024)!=0){
a+=" tab-folder-bottom";
}this.borderFrame=this.createCSSElement(this.e,a);
a="tab-folder-border ";
this.itemMore=this.createCSSElement(this.borderFrame,"tab-item-more");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
this.itemMore.style.bottom="6px";
}var b=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
b.appendChild(this.btnNextTab);
var c=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
c.style.left="-5px";
c.style.top="0";
}b.onclick=this.btnNextTab.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TabFolder$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TabFolder$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset+1>=this.b$["$wt.widgets.TabFolder"].items.length)return;
var a=0;
var b=$wt.internal.browser.OS.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[this.b$["$wt.widgets.TabFolder"].offset].e);
var c=this.b$["$wt.widgets.TabFolder"].getSize().x-36;
for(var d=this.b$["$wt.widgets.TabFolder"].offset+1;d<this.b$["$wt.widgets.TabFolder"].items.length;d++){
var e=$wt.internal.browser.OS.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[d].e);
a+=e;
b+=e;
if(a>c){
if(d<this.b$["$wt.widgets.TabFolder"].items.length-1){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}}}
if(b>c){
this.b$["$wt.widgets.TabFolder"].offset++;
System.out.println("Offset:"+this.b$["$wt.widgets.TabFolder"].offset);
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}});
c$=$_P();
}
return $_N($wt.widgets.TabFolder$1,i$,v$);
})(this,null));
b=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
b.appendChild(this.btnPrevTab);
var d=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if($wt.internal.browser.OS.isMozilla&&!$wt.internal.browser.OS.isFirefox){
d.style.left="-6px";
d.style.top="0";
}b.onclick=this.btnPrevTab.onclick=$_Q((function(i$,v$){
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
this.borderNW=this.createCSSElement(this.borderFrame,a+"tab-folder-border-nw");
this.borderNE=this.createCSSElement(this.borderFrame,a+"tab-folder-border-ne");
this.borderSW=this.createCSSElement(this.borderFrame,a+"tab-folder-border-sw");
this.borderSE=this.createCSSElement(this.borderFrame,a+"tab-folder-border-se");
this.contentArea=this.createCSSElement(this.e,"tab-folder-content-area");
this.h&=-3;
});
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.TabFolder,"createWidget",[]);
});
$_M(c$,"destroyItem",
function(a){
},"$wt.widgets.TabItem");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"setBounds",
function(a,b,c,d){
$_U(this,$wt.widgets.TabFolder,"setBounds",[a,b,c,d]);
},"~N,~N,~N,~N");
$_M(c$,"setSize",
function(a,b){
$_U(this,$wt.widgets.TabFolder,"setSize",[a,b]);
},"~N,~N");
$_M(c$,"SetWindowPos",
function(a,b,c,d,e,f,g){
var h=this.getSelectionIndex();
if(h!=-1){
var i=this.items[h].control;
if(i!=null)i.setBounds(this.getClientArea());
this.setSelection(h,false);
}return $_U(this,$wt.widgets.TabFolder,"SetWindowPos",[a,b,c,d,e,f,g]);
},"Object,Object,~N,~N,~N,~N,~N");
$_V(c$,"getClientArea",
function(){
this.forceResize();
var a=4;
var b=4;
var c=this.w-8;
var d=this.x-8;
if(this.items!=null&&this.items.length!=0){
var e=$wt.internal.browser.OS.getContainerHeight(this.items[this.offset].e);
if($wt.internal.browser.OS.isIE)e++;
if(this.getSelectionIndex()==this.offset){
e-=2;
}c-=e;
if((this.i&1024)==0){
b+=e;
}else{
if($wt.internal.browser.OS.isIE)c--;
}}var e=this.getBorderWidth();
a+=e;
b+=e;
d-=e*2;
c-=e*2;
return new $wt.graphics.Rectangle(a,b,d,c);
});
$_M(c$,"getItem",
function(a){
return this.items[a];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var a=this.getItemCount();
var b=new Array(a);
System.arraycopy(this.items,0,b,0,a);
return b;
});
$_M(c$,"getSelection",
function(){
var a=this.getSelectionIndex();
if(a==-1)return new Array(0);
return[this.items[a]];
});
$_M(c$,"getSelectionIndex",
function(){
for(var a=0;a<this.items.length;a++){
if(this.items[a]!=null&&this.items[a].e!=null&&this.items[a].e.className!=null&&this.items[a].e.className.indexOf("selected")!=-1){
return a;
}}
System.out.println("The selection is not happend yet!");
return-1;
});
$_M(c$,"indexOf",
function(a){
var b=this.getItemCount();
for(var c=0;c<b;c++){
if(this.items[c]==a)return c;
}
return-1;
},"$wt.widgets.TabItem");
$_V(c$,"minimumSize",
function(a,b,c){
var d=this._getChildren();
var e=0;
var f=0;
for(var g=0;g<d.length;g++){
var h=d[g];
var i=0;
var j=this.getItemCount();
while(i<j){
if(this.items[i].control==h)break;
i++;
}
if(i==j){
var k=h.getBounds();
e=Math.max(e,k.x+k.width);
f=Math.max(f,k.y+k.height);
}else{
var k=h.computeSize(a,b,c);
e=Math.max(e,k.x);
f=Math.max(f,k.y);
}}
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_V(c$,"mnemonicHit",
function(a){
var b=this.getSelectionIndex();
for(var c=0;c<this.items.length;c++){
if(c!=b){
var d=this.items[c];
if(d!=null){
var e=this.findMnemonic(d.getText());
if((Character.toUpperCase(a)).charCodeAt(0)==(Character.toUpperCase(e)).charCodeAt(0)){
if(this.setFocus()){
this.setSelection(c,true);
return true;
}}}}}
return false;
},"~N");
$_V(c$,"mnemonicMatch",
function(a){
for(var b=0;b<this.items.length;b++){
var c=this.items[b];
if(c!=null){
var d=this.findMnemonic(c.getText());
if((Character.toUpperCase(a)).charCodeAt(0)==(Character.toUpperCase(d)).charCodeAt(0)){
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
var a=this.getItemCount();
for(var b=0;b<a;b++){
var c=this.items[b];
if(!c.isDisposed())c.releaseResources();
}
this.items=null;
if(this.imageList!=null){
this.b.releaseImageList(this.imageList);
}this.imageList=null;
$_U(this,$wt.widgets.TabFolder,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(a){
$_U(this,$wt.widgets.TabFolder,"removeControl",[a]);
var b=this.getItemCount();
for(var c=0;c<b;c++){
var d=this.items[c];
if(d.control==a)d.setControl(null);
}
},"$wt.widgets.Control");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setSelection",
function(a){
if(a.length==0){
this.setSelection(-1,false);
}else{
for(var b=a.length-1;b>=0;--b){
var c=this.indexOf(a[b]);
if(c!=-1)this.setSelection(c,false);
}
}},"~A");
$_M(c$,"setSelection",
function(a){
var b=this.getItemCount();
if(!(0<=a&&a<b))return;
this.setSelection(a,false);
},"~N");
$_M(c$,"setSelection",
function(a,b){
System.out.println("set selection is called!");
var c=this.getSelectionIndex();
if(c!=-1&&c!=a){
var d=this.items[c];
var e=d.control;
if(e!=null&&!e.isDisposed()){
e.setVisible(false);
}}this.updateSelection(a);
var d=a;
if(c==a){
d=-1;
}if(d!=-1){
var e=this.items[d];
var f=e.control;
if(f!=null&&!f.isDisposed()){
f.setBounds(this.getClientArea());
f.setVisible(true);
}if(b){
var g=new $wt.widgets.Event();
g.item=e;
this.sendEvent(13,g);
}}},"~N,~B");
$_M(c$,"updateSelection",
function(a){
var b="tab-item-selected";
for(var c=0;c<this.offset;c++){
this.items[c].e.style.display="none";
if(a>=this.offset){
var d=this.items[c].e.className;
if(d==null)d="";
var e=d.indexOf(b);
if(e!=-1){
this.items[c].e.className=d.substring(0,e)+d.substring(e+b.length);
}}}
if(this.items[a]!=null){
var d=-2;
var e=2;
for(var f=this.offset;f<this.items.length;f++){
this.items[f].e.style.display="block";
this.items[f].e.style.zIndex=(f+1)+"";
var g=this.items[f].e.className;
if(g==null)g="";
var h=g.indexOf(b);
if(h!=-1){
this.items[f].e.className=g.substring(0,h)+g.substring(h+b.length);
if(f>a){
}}var i=$wt.internal.browser.OS.getContainerWidth(this.items[f].e);
if(f<a){
d+=i;
}var j=this.items[f].e.style;
if(f==a){
e-=2;
}j.left=e+"px";
e+=i;
}
var g=Integer.parseInt(this.e.style.width);
if(g>0){
var h=this.borderFrame.className;
if(h==null)h="";
var i="tab-show-more-item";
var j=h.indexOf(i);
if(e>g||this.offset!=0){
if(j==-1){
this.borderFrame.className+=" "+i;
}}else{
if(j!=-1){
this.borderFrame.className=h.substring(0,j)+h.substring(j+i.length);
}}}var h=this.items[a].e.className;
if(h==null)h="";
var i=h.indexOf(b);
if(i==-1){
this.items[a].e.className+=" "+b;
}this.items[a].e.style.zIndex=(this.items.length+1)+"";
if(this.x!=0){
var j=$wt.internal.browser.OS.getContainerWidth(this.items[a].e);
d+=4;
var k=(this.x-d-((this.i&2048)!=0?4:0));
if(a>=this.offset){
k-=j;
}if(k<0){
k=0;
}if(d<2){
d=2;
}if((this.i&1024)!=0){
this.borderSW.style.width=(d-2)+"px";
this.borderSE.style.width=k+"px";
}else{
this.borderNW.style.width=(d-2)+"px";
this.borderNE.style.width=k+"px";
}}}},"~N");
$_V(c$,"traversePage",
function(a){
var b=this.getItemCount();
if(b<=1)return false;
var c=this.getSelectionIndex();
if(c==-1){
c=0;
}else{
var d=(a)?1:-1;
c=(c+d+b)%b;
}this.setSelection(c,true);
return c==this.getSelectionIndex();
},"~B");
c$=$_C(function(){
this.noSelection=false;
this.ignoreModify=false;
this.ignoreCharacter=false;
this.visibleCount=5;
$_Z(this,arguments);
},$wt.widgets,"Combo",$wt.widgets.Composite);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Combo,[a,$wt.widgets.Combo.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(a){
if(this.e!=null){
this.e.options[this.e.options.length]=new Option(a,a);
}},"~S");
$_M(c$,"add",
function(a,b){
if(this.e!=null){
this.e.options[b]=new Option(a,a);
}},"~S,~N");
$_M(c$,"addModifyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(24,b);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(25,b);
},"$wt.events.VerifyListener");
$_V(c$,"checkSubclass",
function(){
});
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a&=-2049;
a&=-769;
a=$wt.widgets.Widget.checkBits(a,4,64,0,0,0,0);
if((a&64)!=0)return a&-9;
return a;
},"~N");
$_M(c$,"clearSelection",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if(a==-1){
}if(b==-1){
if((this.i&64)!=0){
}}if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
if((this.i&8)!=0){
d+=8;
}else{
}System.out.println("Combo : "+d+" "+e);
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"copy",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Combo,"createHandle",[]);
this.h&=-3;
this.e=d$.createElement("SELECT");
if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}});
$_M(c$,"cut",
function(){
if((this.i&8)!=0)return;
});
$_M(c$,"deregister",
function(){
$_U(this,$wt.widgets.Combo,"deregister",[]);
});
$_M(c$,"deselect",
function(a){
this.sendEvent(24);
},"~N");
$_M(c$,"deselectAll",
function(){
this.sendEvent(24);
});
$_M(c$,"getItem",
function(a){
return"";
},"~N");
$_M(c$,"getItemCount",
function(){
return 0;
});
$_M(c$,"getItemHeight",
function(){
return 0;
});
$_M(c$,"getItems",
function(){
var a=this.getItemCount();
var b=new Array(a);
for(var c=0;c<a;c++)b[c]=this.getItem(c);

return b;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getOrientation",
function(){
return this.i&(100663296);
});
$_M(c$,"getSelection",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getSelectionIndex",
function(){
if(this.noSelection)return-1;
return 0;
});
$_M(c$,"getText",
function(){
return"";
});
$_M(c$,"getTextHeight",
function(){
return 0;
});
$_M(c$,"getTextLimit",
function(){
return 0;
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
function(a){
return this.indexOf(a,0);
},"~S");
$_M(c$,"indexOf",
function(a,b){
if(a.length==0){
var c=this.getItemCount();
for(var d=b;d<c;d++){
if(a.equals(this.getItem(d)))return d;
}
return-1;
}return-1;
},"~S,~N");
$_M(c$,"paste",
function(){
if((this.i&8)!=0)return;
});
$_M(c$,"register",
function(){
$_U(this,$wt.widgets.Combo,"register",[]);
});
$_M(c$,"remove",
function(a){
},"~N");
$_M(c$,"remove",
function(a,b){
if(a>b)return;
},"~N,~N");
$_M(c$,"remove",
function(a){
var b=this.indexOf(a,0);
this.remove(b);
},"~S");
$_M(c$,"removeAll",
function(){
this.sendEvent(24);
});
$_M(c$,"removeModifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(24,a);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(25,a);
},"$wt.events.VerifyListener");
$_M(c$,"select",
function(a){
},"~N");
$_M(c$,"setBounds",
function(a,b,c,d,e){
if((this.i&4)!=0){
d=this.getTextHeight()+(this.getItemHeight()*this.visibleCount)+2;
if((c!=this.x||d!=this.w)&&$_O(this,$wt.widgets.Composite)){
this.b.sendMessage(new $wt.internal.struct.MESSAGE(this,2,null));
}this.z=a;
this.y=b;
this.x=c;
this.w=d;
this.SetWindowPos(this.e,null,a,b,c,d,e);
}else{
$_U(this,$wt.widgets.Combo,"setBounds",[a,b,c,d,e]);
}System.out.println("left "+this.z+" "+this.y+" width "+c+" height "+d);
},"~N,~N,~N,~N,~N");
$_M(c$,"setItem",
function(a,b){
if(this.isDisposed())return;
this.add(b,a);
},"~N,~S");
$_M(c$,"setItems",
function(a){
for(var b=0;b<a.length;b++){
}
for(var c=0;c<a.length;c++){
var d=a[c];
this.add(d);
}
this.sendEvent(24);
},"~A");
$_M(c$,"setOrientation",
function(a){
},"~N");
$_M(c$,"setSelection",
function(a){
},"$wt.graphics.Point");
$_M(c$,"setText",
function(a){
if((this.i&8)!=0){
var b=this.indexOf(a);
if(b!=-1)this.select(b);
return;
}this.sendEvent(24);
},"~S");
$_M(c$,"setTextLimit",
function(a){
},"~N");
$_M(c$,"setVisibleItemCount",
function(a){
if(a<0)return;
this.visibleCount=a;
if((this.i&4)!=0){
this.forceResize();
}},"~N");
$_M(c$,"traverseEscape",
function(){
if((this.i&4)!=0){
}return $_U(this,$wt.widgets.Combo,"traverseEscape",[]);
});
$_M(c$,"verifyText",
function(a,b,c,d){
var e=new $wt.widgets.Event();
e.text=a;
e.start=b;
e.end=c;
if(d!=null){
e.character=d.character;
e.keyCode=d.keyCode;
e.stateMask=d.stateMask;
}this.sendEvent(25,e);
if(!e.doit||this.isDisposed())return null;
return e.text;
},"~S,~N,~N,$wt.widgets.Event");
$_V(c$,"windowClass",
function(){
return"DIV";
});
$_S(c$,
"LIMIT",0x7FFF);
c$=$_C(function(){
this.F=null;
this.$L=0;
this.$K=0;
this.A=null;
this.$M=null;
this.G=null;
this.N=null;
this.I=null;
this.H=null;
this.$J=null;
this.B=null;
this.C=null;
this.E=null;
this.D=null;
$_Z(this,arguments);
},$wt.widgets,"Group",$wt.widgets.Composite);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.Group,[a,$wt.widgets.Group.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=524288;
return a&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=$_U(this,$wt.widgets.Group,"computeSize",[a,b,c]);
var e=0;
if(this.F!=null){
e=this.F.length;
}if(e!=0){
d.x=Math.max(d.x,this.$L+18);
}return d;
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(a,b,c,d){
var e=$_U(this,$wt.widgets.Group,"computeTrim",[a,b,c,d]);
e.x-=3;
if(this.$K<=0){
this.$K=$wt.internal.browser.OS.getStringStyledHeight(".","group-default",this.e.style.cssText);
}e.y-=this.$K;
e.width+=6;
e.height+=this.$K+3;
return e;
},"~N,~N,~N,~N");
$_M(c$,"containerHandle",
function(){
return this.D;
});
$_M(c$,"createCSSElement",
function(a,b){
var c=d$.createElement("DIV");
c.className=b;
(a).appendChild(c);
return c;
},"Object,~S");
$_V(c$,"createHandle",
function(){
this.h&=-3;
this.e=d$.createElement("DIV");
if((this.i&2048)!=0){
this.e.className="group-default group-border-default";
}else{
this.e.className="group-default";
}if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}var a=null;
if((this.i&16)!=0){
a="group-shadow-etched-in";
}else if((this.i&64)!=0){
a="group-shadow-etched-out";
}else if((this.i&4)!=0){
a="group-shadow-in";
}else if((this.i&8)!=0){
a="group-shadow-out";
}else if((this.i&32)!=0){
a="group-shadow-none";
}if(a==null){
a="group-border-frame group-no-title-text";
}else{
a="group-border-frame group-no-title-text "+a;
}this.A=this.createCSSElement(this.e,a);
this.$M=this.createCSSElement(this.A,"group-title-line");
this.G=this.createCSSElement(this.A,"group-left-corner");
this.I=this.createCSSElement(this.A,"group-right-corner");
this.N=this.createCSSElement(this.A,"group-title-text");
this.H=this.createCSSElement(this.A,"group-side-line-left");
this.$J=this.createCSSElement(this.A,"group-side-line-right");
this.B=this.createCSSElement(this.A,"group-bottom-line-left");
this.C=this.createCSSElement(this.A,"group-bottom-line-right");
this.E=this.createCSSElement(this.e,"group-content-box");
this.D=this.createCSSElement(this.E,"group-content");
});
$_V(c$,"getClientArea",
function(){
this.forceResize();
if(this.$K<=0){
this.$K=$wt.internal.browser.OS.getStringStyledHeight(".","group-default",this.e.style.cssText);
}var a=3;
var b=this.$K;
var c=this.getBorderWidth();
var d=this.x-c*2-6;
var e=this.w-c*2-b-3;
return new $wt.graphics.Rectangle(a,b,d,e);
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getText",
function(){
return this.F;
});
$_V(c$,"mnemonicHit",
function(a){
return this.setFocus();
},"~N");
$_V(c$,"mnemonicMatch",
function(a){
var b=this.findMnemonic(this.getText());
if((b).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(a)).charCodeAt(0)==(Character.toUpperCase(b)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.$M!=null){
BrowserNative.releaseHandle(this.$M);
this.$M=null;
}if(this.N!=null){
BrowserNative.releaseHandle(this.N);
this.N=null;
}if(this.G!=null){
BrowserNative.releaseHandle(this.G);
this.G=null;
}if(this.I!=null){
BrowserNative.releaseHandle(this.I);
this.I=null;
}if(this.B!=null){
BrowserNative.releaseHandle(this.B);
this.B=null;
}if(this.C!=null){
BrowserNative.releaseHandle(this.C);
this.C=null;
}if(this.H!=null){
BrowserNative.releaseHandle(this.H);
this.H=null;
}if(this.$J!=null){
BrowserNative.releaseHandle(this.$J);
this.$J=null;
}if(this.A!=null){
BrowserNative.releaseHandle(this.A);
this.A=null;
}if(this.D!=null){
BrowserNative.releaseHandle(this.D);
this.D=null;
}if(this.E!=null){
BrowserNative.releaseHandle(this.E);
this.E=null;
}$_U(this,$wt.widgets.Group,"releaseHandle",[]);
});
$_M(c$,"setBounds",
function(a,b,c,d){
$_U(this,$wt.widgets.Group,"setBounds",[a,b,c,d]);
if(this.$L==0&&this.F!=null&&this.F.length!=0){
this.$L=$wt.internal.browser.OS.getStringStyledWidth(this.F,"group-default",this.e.style.cssText);
}if(this.$L!=0){
var e=this.x-this.$L-12;
if(e<0){
e=0;
}this.I.style.width=e+"px";
}},"~N,~N,~N,~N");
$_M(c$,"setFont",
function(a){
$_U(this,$wt.widgets.Group,"setFont",[a]);
},"$wt.graphics.Font");
$_M(c$,"setText",
function(a){
var b=this.A.className;
if(b==null)b="";
var c="group-no-title-text";
var d=b.indexOf(c);
if(a.length==0){
if(d==-1){
this.A.className+=" "+c;
}}else{
if(d!=-1){
this.A.className=b.substring(0,d)+b.substring(d+c.length);
}if(!a.equals(this.F)){
for(var e=this.N.childNodes.length-1;e>=0;e--){
this.N.removeChild(this.N.childNodes[e]);
}
this.N.appendChild(d$.createTextNode(a));
this.$L=$wt.internal.browser.OS.getContainerWidth(this.N);
if(this.$L==0){
this.$L=$wt.internal.browser.OS.getStringStyledWidth(a,"group-default",this.e.style.cssText);
}if(this.$L!=0){
var f=this.x-this.$L-24;
if(f>0){
this.I.style.width=f+"px";
}}}}this.F=a;
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
function(a,b){
$_R(this,$wt.widgets.TreeItem,[a,b]);
this.parent=a;
a.createItem(this,null,-1);
},"$wt.widgets.Tree,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.TreeItem,[a,b]);
this.parent=a;
a.createItem(this,null,c);
},"$wt.widgets.Tree,~N,~N");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.TreeItem,[a.parent,b]);
this.parent=a.parent;
this.parentItem=a;
this.parent.createItem(this,a.e,-1);
},"$wt.widgets.TreeItem,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.TreeItem,[a.parent,b]);
this.parent=a.parent;
this.parentItem=a;
this.parent.createItem(this,a.e,c);
},"$wt.widgets.TreeItem,~N,~N");
c$.checkNull=$_M(c$,"checkNull",
function(a){
return a;
},"$wt.widgets.TreeItem");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getBackground",
function(){
return new $wt.graphics.Color(this.b,this.e.style.backgroundColor);
});
$_M(c$,"getBackground",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getBackground();
return new $wt.graphics.Color(this.b,this.e.style.backgroundColor);
},"~N");
$_M(c$,"getBounds",
function(){
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getBounds",
function(a){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N");
$_M(c$,"getChecked",
function(){
if((this.parent.i&32)==0)return false;
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
return this.b.getSystemFont();
});
$_M(c$,"getFont",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getFont();
return this.b.getSystemFont();
},"~N");
$_M(c$,"getForeground",
function(){
return new $wt.graphics.Color(this.b,this.parent.e.style.color);
});
$_M(c$,"getForeground",
function(a){
var b=Math.max(1,this.parent.getColumnCount());
if(0>a||a>b-1)return this.getForeground();
return new $wt.graphics.Color(this.b,this.e.style.color);
},"~N");
$_M(c$,"getGrayed",
function(){
if((this.parent.i&32)==0)return false;
if(this.checkElement!=null){
return this.checkElement.checked;
}return true;
});
$_M(c$,"getItem",
function(a){
return this.parent.items[a];
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
function(a){
if(a==0)return this.getImage();
if(this.images!=null){
if(0<=a&&a<this.images.length)return this.images[a];
}return null;
},"~N");
$_M(c$,"getImageBounds",
function(a){
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
function(a){
if(a==0)return this.getText();
if(this.strings!=null){
if(0<=a&&a<this.strings.length){
var b=this.strings[a];
return b!=null?b:"";
}}return"";
},"~N");
$_M(c$,"indexOf",
function(a){
return this.parent.indexOf(this.index,a);
},"$wt.widgets.TreeItem");
$_M(c$,"redraw",
function(){
if(this.parent.drawCount>0)return;
});
$_M(c$,"redraw",
function(a,b,c){
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
function(a){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
this.redraw(a,true,true);
},"~N,$wt.graphics.Color");
$_M(c$,"setChecked",
function(a){
if((this.parent.i&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=a;
}},"~B");
$_M(c$,"setExpanded",
function(a){
this.expandStatus=a;
var b=this.parent.getDescendantItems(this.index);
for(var c=0;c<b.length;c++){
if(b[c].parentItem==this){
b[c].expandStatus=this.expandStatus;
}if(b[c].expandStatus){
b[c].e.style.display=a?"":"none";
}else{
b[c].e.style.display="none";
}}
if(b.length==0){
this.updateModifier(0);
}else{
this.updateModifier(a?1:-1);
}},"~B");
$_M(c$,"setFont",
function(a){
},"$wt.graphics.Font");
$_M(c$,"setFont",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
},"~N,$wt.graphics.Font");
$_M(c$,"setForeground",
function(a){
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(a,b){
var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
this.redraw(a,true,false);
},"~N,$wt.graphics.Color");
$_M(c$,"setGrayed",
function(a){
if((this.parent.i&32)==0)return;
if(this.checkElement!=null){
this.checkElement.checked=a;
}},"~B");
$_M(c$,"setImage",
function(a){
for(var b=0;b<a.length;b++){
this.setImage(b,a[b]);
}
},"~A");
$_M(c$,"setImage",
function(a,b){
if(a==0){
if(b!=null&&b.type==1){
if(b.equals(this.image))return;
}$_U(this,$wt.widgets.TreeItem,"setImage",[b]);
}var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(this.images==null&&a!=0)this.images=new Array(c);
if(this.images!=null){
if(b!=null&&b.type==1){
if(b.equals(this.images[a]))return;
}this.images[a]=b;
}},"~N,$wt.graphics.Image");
$_M(c$,"setImage",
function(a){
this.setImage(0,a);
},"$wt.graphics.Image");
$_M(c$,"setText",
function(a){
for(var b=0;b<a.length;b++){
var c=a[b];
if(c!=null)this.setText(b,c);
}
},"~A");
$_M(c$,"setText",
function(a,b){
if(a==0){
if(b.equals(this.text))return;
$_U(this,$wt.widgets.TreeItem,"setText",[b]);
}var c=Math.max(1,this.parent.getColumnCount());
if(0>a||a>c-1)return;
if(this.strings==null&&a!=0)this.strings=new Array(c);
if(this.strings!=null){
if(b.equals(this.strings[a]))return;
this.strings[a]=b;
}if(a==0){
}var d=null;
if(a<this.e.childNodes.length){
if(this.e.childNodes[a]!=null&&"TD".equals(this.e.childNodes[a].nodeName)){
d=this.e.childNodes[a];
}}if(d==null){
d=d$.createElement("TD");
this.e.appendChild(d);
}if(d.childNodes!=null){
for(var e=0;e<d.childNodes.length;e++){
if(d.childNodes[e]!=null){
d.removeChild(d.childNodes[e]);
}}
}var e=d$.createElement("DIV");
e.className="tree-item-default";
var f=d$.createElement("DIV");
f.className="tree-item-anchor-default";
f.onclick=$_Q((function(i$,v$){
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
f.appendChild(d$.createTextNode(""+String.fromCharCode(160)));
e.appendChild(f);
if((this.parent.i&32)!=0){
this.checkElement=d$.createElement("INPUT");
this.checkElement.type="checkbox";
e.appendChild(this.checkElement);
this.checkElement.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=new $wt.widgets.Event();
a.type=13;
a.detail=32;
a.item=this.b$["$wt.widgets.TreeItem"];
a.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(a);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$2,i$,v$);
})(this,null));
}var g=(a==0)?this.getText():this.strings[a];
var h=d$.createElement("DIV");
h.className="tree-item-text-default";
h.appendChild(d$.createTextNode(g));
h.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TreeItem$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"TreeItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var a=this.getEvent();
this.b$["$wt.widgets.TreeItem"].parent.toggleSelection(this.b$["$wt.widgets.TreeItem"],a.ctrlKey,a.shiftKey);
var b=new $wt.widgets.Event();
b.type=13;
b.detail=0;
b.item=this.b$["$wt.widgets.TreeItem"];
b.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(b);
this.toReturn(false);
});
c$=$_P();
}
return $_N($wt.widgets.TreeItem$3,i$,v$);
})(this,null));
h.ondblclick=$_Q((function(i$,v$){
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
h.onselectstart=$_Q((function(i$,v$){
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
e.appendChild(h);
var i=this.parentItem;
var j=0;
while(i!=null){
i=i.parentItem;
j+=20;
}
e.style.marginLeft=j+"px";
d.appendChild(e);
},"~N,~S");
$_M(c$,"setText",
function(a){
this.setText(0,a);
},"~S");
$_M(c$,"showSelection",
function(a){
var b=1;
if((this.parent.i&32)!=0){
b++;
}var c=this.e.childNodes[0].childNodes[0].childNodes[b];
c.className=a?"tree-item-text-selected":"tree-item-text-default";
},"~B");
$_M(c$,"toggleExpandStatus",
function(){
var a=this.e.childNodes[0].childNodes[0].childNodes[0].className;
var b=0;
if(a==null){
b=0;
}else if(a.indexOf("expanded")!=-1){
b=-1;
}else if(a.indexOf("collapsed")!=-1){
b=1;
}if(b==0){
return;
}var c=b>=0;
this.setExpanded(c);
var d=new $wt.widgets.Event();
d.type=c?17:18;
d.item=this;
d.widget=this;
this.parent.sendEvent(d);
});
$_M(c$,"updateModifier",
function(a){
var b=this.e.childNodes[0].childNodes[0].childNodes[0];
if(a==-1){
b.className="tree-item-anchor-collapsed";
return false;
}else if(a==1){
b.className="tree-item-anchor-expanded";
return true;
}else{
b.className="tree-item-anchor-default";
return true;
}},"~N");
c$=$_C(function(){
this.parent=null;
this.resizable=false;
$_Z(this,arguments);
},$wt.widgets,"TreeColumn",$wt.widgets.Item);
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.TreeColumn,[a,$wt.widgets.TreeColumn.checkStyle(b)]);
this.resizable=true;
this.parent=a;
a.createItem(this,a.getColumnCount());
},"$wt.widgets.Tree,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.TreeColumn,[a,$wt.widgets.TreeColumn.checkStyle(b)]);
this.resizable=true;
this.parent=a;
a.createItem(this,c);
},"$wt.widgets.Tree,~N,~N");
$_M(c$,"addControlListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(11,b);
this.addListener(10,b);
},"$wt.events.ControlListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,16384,16777216,131072,0,0,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"getAlignment",
function(){
if((this.i&16384)!=0)return 16384;
if((this.i&16777216)!=0)return 16777216;
if((this.i&131072)!=0)return 131072;
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
var a=this.parent.indexOf(this);
if(a==-1)return 0;
return 0;
});
$_M(c$,"pack",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return;
var b=0;
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
function(a){
if(this.d==null)return;
this.d.unhook(10,a);
this.d.unhook(11,a);
},"$wt.events.ControlListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setAlignment",
function(a){
if((a&(16924672))==0)return;
var b=this.parent.indexOf(this);
if(b==-1||b==0)return;
this.i&=-16924673;
this.i|=a&(16924672);
},"~N");
$_M(c$,"setImage",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TreeColumn,"setImage",[a]);
},"$wt.graphics.Image");
$_M(c$,"setResizable",
function(a){
this.resizable=a;
},"~B");
$_M(c$,"setText",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
$_U(this,$wt.widgets.TreeColumn,"setText",[a]);
},"~S");
$_M(c$,"setWidth",
function(a){
var b=this.parent.indexOf(this);
if(b==-1)return;
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
function(a,b){
$_R(this,$wt.widgets.Tree,[a,$wt.widgets.Tree.checkStyle(b)]);
this.selections=new Array(0);
this.items=new Array(0);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=768;
return $wt.widgets.Widget.checkBits(a,4,2,0,0,0,0);
},"~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_M(c$,"addTreeListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(17,b);
this.addListener(18,b);
},"$wt.events.TreeListener");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
var f=this.getBorderWidth();
d+=f*2;
e+=f*2;
if((this.i&512)!=0){
}if((this.i&256)!=0){
}return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Tree,"createHandle",[]);
this.h&=-3;
this.e=d$.createElement("DIV");
if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}this.e.className="tree-default";
if((this.i&2048)!=0){
this.e.className+=" tree-border";
}var a=d$.createElement("TABLE");
a.style.backgroundColor="white";
this.e.appendChild(a);
});
$_M(c$,"createItem",
function(a,b){
},"$wt.widgets.TreeColumn,~N");
$_M(c$,"createItem",
function(a,b,c){
if(this.items==null){
this.items=new Array(0);
}var d=this.e.childNodes[0];
var e=null;
for(var f=0;f<d.childNodes.length;f++){
if("TBODY".equals(d.childNodes[f].nodeName)){
e=d.childNodes[f];
break;
}}
if(e==null){
e=d$.createElement("TBODY");
d.appendChild(e);
}var g=-1;
if(b!=null){
for(var h=0;h<e.childNodes.length;h++){
if(e.childNodes[h]==b){
g=h;
break;
}}
}var h=d$.createElement("TR");
a.e=h;
var i=-1;
if(c>=0){
i=this.findItem(g,c);
if(i!=-1){
e.insertBefore(h,e.childNodes[i]);
for(var j=this.items.length;j>i;j--){
this.items[j]=this.items[j-1];
this.items[j].index=j;
}
a.index=i;
this.items[i]=a;
}}if(i==-1){
if(g<0){
e.appendChild(h);
a.index=this.items.length;
this.items[this.items.length]=a;
}else{
var j=this.findNextSiblingItem(g);
if(j==-1){
e.appendChild(h);
a.index=this.items.length;
this.items[this.items.length]=a;
}else{
e.insertBefore(h,e.childNodes[j]);
for(var k=this.items.length;k>j;k--){
this.items[k]=this.items[k-1];
this.items[k].index=k;
}
a.index=j;
this.items[j]=a;
}}}if(a.parentItem!=null){
a.e.style.display="none";
a.parentItem.updateModifier(-1);
}},"$wt.widgets.TreeItem,Object,~N");
$_M(c$,"toggleSelection",
function(a,b,c){
if(a==null){
return false;
}if((this.i&2)!=0&&(b||c)){
if(b){
for(var d=0;d<this.selections.length;d++){
if(a==this.selections[d]){
var e=new Array(this.selections.length);
for(var f=0;f<d;f++){
e[f]=this.selections[f];
}
for(var g=d;g<this.selections.length-1;g++){
e[g]=this.selections[g+1];
}
this.selections=e;
a.showSelection(false);
this.lastSelection=a;
return false;
}}
this.selections[this.selections.length]=a;
this.lastSelection=a;
a.showSelection(true);
}else{
for(var d=0;d<this.selections.length;d++){
if(this.selections[d]!=null){
this.selections[d].showSelection(false);
}}
if(this.lastSelection!=null){
var e=Math.min(this.lastSelection.index,a.index);
var f=Math.max(this.lastSelection.index,a.index);
this.selections=new Array(0);
for(var g=e;g<=f;g++){
var h=this.items[g];
if(h.e.style.display!="none"){
this.selections[this.selections.length]=h;
h.showSelection(true);
}}
return true;
}else{
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=a;
}}}else{
a.showSelection(true);
for(var d=0;d<this.selections.length;d++){
if(this.selections[d]!=null&&this.selections[d]!=a){
this.selections[d].showSelection(false);
}}
if(this.selections.length!=1){
this.selections=new Array(1);
}this.selections[0]=a;
}this.lastSelection=a;
return true;
},"$wt.widgets.TreeItem,~B,~B");
$_M(c$,"skipItems",
function(a){
var b=this.items[a];
a++;
while(this.items[a]!=null){
var c=this.items[a];
if(c.parentItem!=b){
if(c.parentItem==this.items[a-1]){
a=this.skipItems(a-1);
if(a==-1){
return-1;
}var d=this.items[a];
var e=true;
while(d!=null){
d=d.parentItem;
if(d==b){
e=false;
break;
}}
if(e){
return a;
}}else{
return a;
}}a++;
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
for(var a=0;a<this.selections.length;a++){
this.selections[a].showSelection(false);
}
});
$_M(c$,"destroyItem",
function(a){
},"$wt.widgets.TreeColumn");
$_M(c$,"destroyItem",
function(a){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"enableWidget",
function(a){
$_U(this,$wt.widgets.Tree,"enableWidget",[a]);
},"~B");
$_M(c$,"findItem",
function(a){
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
function(a){
return this.columns[a];
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
function(a){
var b=this.findNextSiblingItem(a);
if(b==-1){
b=this.items.length;
}var c=new Array(b-a-1);
for(var d=a+1;d<b;d++){
c[d-a-1]=this.items[d];
}
return c;
},"~N");
$_M(c$,"findItem",
function(a,b){
if(a<0){
for(var c=0;c<this.items.length;c++){
if(this.items[c].parentItem==null){
if(b==0){
return c;
}b--;
}}
return-1;
}var c=this.items[a];
a++;
while(this.items[a]!=null){
var d=this.items[a];
if(d.parentItem!=c){
if(d.parentItem==this.items[a-1]){
a=this.skipItems(a-1);
if(a==-1){
return-1;
}}else{
return-1;
}}else{
if(b==0){
return a;
}b--;
}a++;
}
return-1;
},"~N,~N");
$_M(c$,"findNextSiblingItem",
function(a){
if(a<0){
a=0;
}var b=this.items[a];
a++;
if(this.items[a]!=null){
var c=this.items[a];
if(c.parentItem!=b.parentItem){
if(c.parentItem==this.items[a-1]){
a=this.skipItems(a-1);
if(a==-1){
return-1;
}var d=this.items[a];
var e=true;
while(d!=null){
d=d.parentItem;
if(d==b){
e=false;
break;
}}
if(e){
return a;
}}else{
return a;
}}else{
return a;
}}return-1;
},"~N");
$_M(c$,"indexOf",
function(a,b){
var c=0;
if(a<0){
if(b.parentItem!=null){
return-1;
}for(var d=0;d<this.items.length;d++){
if(this.items[d]==b){
return c;
}else if(this.items[d].parentItem==null){
c++;
}}
return-1;
}var d=this.items[a];
a++;
while(this.items[a]!=null){
var e=this.items[a];
if(e.parentItem!=d){
if(e.parentItem==this.items[a-1]){
a=this.skipItems(a-1);
if(a==-1){
return-1;
}if(this.items[a].parentItem==d.parentItem){
return-1;
}else{
if(this.items[a]==b){
return c;
}c++;
}}else{
return-1;
}}else{
if(e==b){
return c;
}c++;
}a++;
}
return-1;
},"~N,$wt.widgets.TreeItem");
$_M(c$,"getItem",
function(a){
return this.items[a];
},"~N");
$_M(c$,"getItem",
function(a){
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItemCount",
function(a){
var b=0;
return this.items.length;
},"~N");
$_M(c$,"getItemHeight",
function(){
return 16;
});
$_M(c$,"getItems",
function(){
var a=new Array(0);
for(var b=0;b<this.items.length;b++){
if(this.items[b]!=null&&this.items[b].parentItem==null){
a[a.length]=this.items[b];
}}
return a;
});
$_M(c$,"getItems",
function(a){
var b=new Array(0);
if(a<0){
a=0;
}var c=this.items[a];
a++;
while(this.items[a]!=null){
var d=this.items[a];
if(d.parentItem!=c){
if(d.parentItem==this.items[a-1]){
a=this.skipItems(a-1);
if(a==-1){
return b;
}if(this.items[a].parentItem==c.parentItem){
return b;
}else{
b[b.length]=this.items[a];
}}else{
return b;
}}else{
b[b.length]=d;
}a++;
}
return b;
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
function(a){
var b=this.columns.length;
for(var c=0;c<b;c++){
if(this.columns[c]==a)return c;
}
return-1;
},"$wt.widgets.TreeColumn");
$_M(c$,"indexOf",
function(a){
for(var b=0;b<this.items.length;b++){
if(this.items[b]==a){
return b;
}}
return-1;
},"$wt.widgets.TreeItem");
$_M(c$,"releaseWidget",
function(){
var a=this.columns.length;
for(var b=0;b<this.items.length;b++){
var c=this.items[b];
if(c!=null&&!c.isDisposed()){
c.releaseResources();
}}
this.items=null;
for(var c=0;c<a;c++){
var d=this.columns[c];
if(!d.isDisposed())d.releaseResources();
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
function(a){
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"removeTreeListener",
function(a){
if(this.d==null)return;
this.d.unhook(17,a);
this.d.unhook(18,a);
},"$wt.events.TreeListener");
$_M(c$,"setInsertMark",
function(a,b){
},"$wt.widgets.TreeItem,~B");
$_M(c$,"setLinesVisible",
function(a){
if(this.linesVisible==a)return;
this.linesVisible=a;
},"~B");
$_M(c$,"selectAll",
function(){
if((this.i&4)!=0)return;
});
$_M(c$,"setBounds",
function(a,b,c,d,e){
$_U(this,$wt.widgets.Tree,"setBounds",[a,b,c,d,e]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setCheckboxImageList",
function(){
if((this.i&32)==0)return;
var a=5;
});
$_M(c$,"setHeaderVisible",
function(a){
this.setScrollWidth();
this.updateScrollBar();
},"~B");
$_V(c$,"setRedraw",
function(a){
},"~B");
$_M(c$,"setScrollWidth",
function(){
});
$_M(c$,"setSelection",
function(a){
var b=a.length;
if(b==0||((this.i&4)!=0&&b>1)){
this.deselectAll();
return;
}this.selections=a;
for(var c=0;c<a.length;c++){
a[c].showSelection(true);
}
},"~A");
$_M(c$,"setTopItem",
function(a){
this.updateScrollBar();
},"$wt.widgets.TreeItem");
$_M(c$,"showItem",
function(a){
this.updateScrollBar();
},"$wt.internal.xhtml.Element");
$_M(c$,"showColumn",
function(a){
if(a.parent!=this)return;
var b=this.indexOf(a);
if(b==-1)return;
},"$wt.widgets.TreeColumn");
$_M(c$,"showItem",
function(a){
this.showItem(a.e);
},"$wt.widgets.TreeItem");
$_M(c$,"showSelection",
function(){
});
$_M(c$,"showWidget",
function(a){
$_U(this,$wt.widgets.Tree,"showWidget",[a]);
},"~B");
$_V(c$,"topHandle",
function(){
return this.hwndParent!=null?this.hwndParent:this.e;
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
function(a,b){
$_R(this,$wt.widgets.ProgressBar,[a,$wt.widgets.ProgressBar.checkStyle(b)]);
this.minimum=0;
this.maximum=100;
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=524288;
return $wt.widgets.Widget.checkBits(a,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getBorderWidth();
var e=d*2;
var f=d*2;
if((this.i&256)!=0){
e+=160;
f+=16;
}else{
e+=16;
f+=160;
}if(a!=-1)e=a+(d*2);
if(b!=-1)f=b+(d*2);
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
this.e.className="progress-bar-default";
if(this.parent!=null&&this.parent.e!=null){
this.parent.e.appendChild(this.e);
}this.innerHandle=d$.createElement("DIV");
this.e.appendChild(this.innerHandle);
if((this.i&256)!=0){
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
if((this.i&2)!=0){
}});
$_M(c$,"stopTimer",
function(){
if((this.i&2)!=0){
}});
$_M(c$,"setMaximum",
function(a){
if(0<=this.minimum&&this.minimum<a){
this.maximum=a;
}},"~N");
$_M(c$,"setMinimum",
function(a){
if(0<=a&&a<this.maximum){
this.minimum=a;
}},"~N");
$_M(c$,"setSelection",
function(a){
this.selection=a;
if((this.i&256)!=0){
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
function(a,b){
$_R(this,$wt.widgets.Scale,[a,$wt.widgets.Scale.checkStyle(b)]);
this.minimum=0;
this.maximum=100;
this.pageIncrement=10;
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getBorderWidth();
var e=d*2;
var f=d*2;
var g=16;
var h=24;
if((this.i&256)!=0){
e+=160;
var i=16;
f+=(h*2)+i+(Math.floor(i/3));
}else{
var i=16;
e+=(g*2)+i+(Math.floor(i/3));
f+=160;
}if(a!=-1)e=a+(d*2);
if(b!=-1)f=b+(d*2);
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Scale,"createHandle",[]);
this.e=d$.createElement("DIV");
this.e.className="scale-default";
if(this.parent!=null&&this.parent.e!=null){
this.parent.e.appendChild(this.e);
}if((this.i&2048)!=0){
this.e.className+=" scale-border";
}this.thumbHandle=d$.createElement("DIV");
this.e.appendChild(this.thumbHandle);
if((this.i&256)!=0){
this.thumbHandle.className="scale-thumb-horizontal";
this.thumbHandle.style.left="0px";
}else{
this.thumbHandle.className="scale-thumb-vertical";
this.thumbHandle.style.top="0px";
}var a=(this.i&256)!=0;
this.decorateScale();
this.trackHandle=d$.createElement("DIV");
if(a){
this.trackHandle.className="scale-center-block-horizontal";
}else{
this.trackHandle.className="scale-center-block-vertical";
}this.e.appendChild(this.trackHandle);
var b=d$.createElement("DIV");
if(a){
b.className="scale-line-polar-top";
}else{
b.className="scale-line-polar-left";
}this.e.appendChild(b);
var c=d$.createElement("DIV");
if(a){
c.className="scale-line-polar-bottom";
}else{
c.className="scale-line-polar-right";
}this.e.appendChild(c);
var d=new $wt.internal.dnd.DragAndDrop();
d.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Scale$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Scale$1",$wt.internal.dnd.ScaleDND);
$_M(c$,"dragging",
function(a){
$_U(this,$wt.widgets.Scale$1,"dragging",[a]);
var b=new $wt.widgets.Event();
b.x=this.b$["$wt.widgets.Scale"].lastX;
b.y=this.b$["$wt.widgets.Scale"].lastY;
var c=this.b$["$wt.widgets.Scale"].getSize();
var d=0;
if((this.b$["$wt.widgets.Scale"].i&2048)!=0){
d=6;
}var e=c.x+d;
if(e<2){
e=2;
}b.width=e;
var f=c.y+d;
if(f<2){
f=2;
}b.height=f;
b.widget=this.b$["$wt.widgets.Scale"];
b.item=this.b$["$wt.widgets.Scale"];
this.b$["$wt.widgets.Scale"].sendEvent(13,b);
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragEnded",
function(a){
$_U(this,$wt.widgets.Scale$1,"dragEnded",[a]);
var b=new $wt.widgets.Event();
var c=this.currentLocation(a);
if(this.isHorizontal){
b.x=c.x;
b.y=Integer.parseInt(this.b$["$wt.widgets.Scale"].e.style.top);
}else{
b.x=Integer.parseInt(this.b$["$wt.widgets.Scale"].e.style.left);
b.y=c.y;
}var d=this.b$["$wt.widgets.Scale"].getSize();
var e=0;
if((this.b$["$wt.widgets.Scale"].i&2048)!=0){
e=6;
}var f=d.x+e;
if(f<2){
f=2;
}b.width=f;
var g=d.y+e;
if(g<2){
g=2;
}b.height=g;
b.widget=this.b$["$wt.widgets.Scale"];
b.item=this.b$["$wt.widgets.Scale"];
if((this.b$["$wt.widgets.Scale"].i&65536)==0){
b.detail=1;
}this.b$["$wt.widgets.Scale"].sendEvent(13,b);
if(b.doit){
this.b$["$wt.widgets.Scale"].lastX=b.x;
this.b$["$wt.widgets.Scale"].lastY=b.y;
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Scale$1,i$,v$);
})(this,null));
d.bind(this.thumbHandle);
});
$_M(c$,"clearScaleDecoration",
($fz=function(){
for(var a=0;a<this.e.childNodes.length;a++){
System.out.println(a+":"+this.e.childNodes[a].className);
if(this.e.childNodes[a].className.indexOf("scale-line-decoration")!=-1){
System.out.println(a);
this.e.removeChild(this.e.childNodes[a]);
}}
},$fz.isPrivate=true,$fz));
$_M(c$,"decorateScale",
($fz=function(){
var a;
if((this.i&256)!=0){
a=this.getSize().x;
}else{
a=this.getSize().y;
}var b=Math.floor((this.maximum-this.minimum)/this.pageIncrement);
var c=16;
for(var d=0;d<=b;d++){
var e=d$.createElement("DIV");
if((this.i&256)!=0){
e.className="scale-line-decoration-horizontal";
e.style.left=Math.floor(Math.floor((a-c)*d/ b) + Math.floor (c /2))+"px";
}else{
e.className="scale-line-decoration-vertical";
e.style.top=Math.floor(Math.floor((a-c)*d/ b) + Math.floor (c /2))+"px";
}this.e.appendChild(e);
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
if((this.i&256)!=0){
var a=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor(a*this.maximum/(this.getSize().x-12));
}else{
var a=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor(a*this.maximum/(this.getSize().y-12));
}return this.selection;
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setIncrement",
function(a){
if(a<1)return;
if(a>this.maximum-this.minimum)return;
if(this.increment==a)return;
this.increment=a;
},"~N");
$_M(c$,"setMaximum",
function(a){
if(0<=this.minimum&&this.minimum<a){
if(this.maximum==a)return;
this.maximum=a;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setMinimum",
function(a){
if(0<=a&&a<this.maximum){
if(this.minimum==a)return;
this.minimum=a;
this.clearScaleDecoration();
this.decorateScale();
}},"~N");
$_M(c$,"setPageIncrement",
function(a){
if(a<1)return;
if(a>this.maximum-this.minimum)return;
if(this.pageIncrement==a)return;
this.pageIncrement=a;
this.clearScaleDecoration();
this.decorateScale();
},"~N");
$_M(c$,"setSelection",
function(a){
if(this.selection==a)return;
if(this.minimum<=a&&a<this.maximum){
this.selection=a;
if((this.i&256)!=0){
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
function(a,b){
$_R(this,$wt.widgets.Slider,[a,$wt.widgets.Slider.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getBorderWidth();
var e=d*2;
var f=d*2;
if((this.i&256)!=0){
e+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
f+=24;
}else{
e+=24;
f+=Math.floor(16*(this.maximum-this.minimum)/this.pageIncrement);
}if(a!=-1)e=a+(d*2);
if(b!=-1)f=b+(d*2);
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_V(c$,"createWidget",
function(){
this.register();
this.e=d$.createElement("DIV");
this.e.className="slider-default";
if(this.parent!=null&&this.parent.e!=null){
this.parent.e.appendChild(this.e);
}if((this.i&2048)!=0){
this.e.className+=" slider-border";
}this.decBtnHandle=d$.createElement("BUTTON");
this.e.appendChild(this.decBtnHandle);
if((this.i&256)!=0){
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
var a=new $wt.widgets.Event();
a.widget=this.b$["$wt.widgets.Slider"];
a.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].i&256)!=0){
a.detail=16777219;
}else{
a.detail=16777217;
}this.b$["$wt.widgets.Slider"].sendEvent(13,a);
});
c$=$_P();
}
return $_N($wt.widgets.Slider$1,i$,v$);
})(this,null));
this.incBtnHandle=d$.createElement("BUTTON");
this.e.appendChild(this.incBtnHandle);
if((this.i&256)!=0){
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
var a=new $wt.widgets.Event();
a.widget=this.b$["$wt.widgets.Slider"];
a.item=this.b$["$wt.widgets.Slider"];
if((this.b$["$wt.widgets.Slider"].i&256)!=0){
a.detail=16777220;
}else{
a.detail=16777218;
}this.b$["$wt.widgets.Slider"].sendEvent(13,a);
});
c$=$_P();
}
return $_N($wt.widgets.Slider$2,i$,v$);
})(this,null));
this.thumbHandle=d$.createElement("BUTTON");
this.e.appendChild(this.thumbHandle);
if((this.i&256)!=0){
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
var a=new $wt.internal.dnd.DragAndDrop();
a.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Slider$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Slider$3",$wt.internal.dnd.SliderDND);
$_V(c$,"dragEnded",
function(a){
this.b$["$wt.widgets.Slider"].caculateSelection();
var b=new $wt.widgets.Event();
var c=this.currentLocation(a);
if(this.isHorizontal){
b.x=c.x;
b.y=Integer.parseInt(this.b$["$wt.widgets.Slider"].e.style.top);
}else{
b.x=Integer.parseInt(this.b$["$wt.widgets.Slider"].e.style.left);
b.y=c.y;
}b.widget=this.b$["$wt.widgets.Slider"];
b.item=this.b$["$wt.widgets.Slider"];
b.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,b);
if(b.doit){
this.b$["$wt.widgets.Slider"].lastX=b.x;
this.b$["$wt.widgets.Slider"].lastY=b.y;
}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(a){
var b=this.sourceX+a.deltaX();
var c=this.sourceY+a.deltaY();
var d=Integer.parseInt(a.sourceElement.parentNode.style.height);
var e=Integer.parseInt(a.sourceElement.parentNode.style.width);
var f=20;
if(this.isHorizontal){
if(e<=64){
f=Math.floor(e*20/64);
}var g=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(e-f*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(g>16){
g-=2;
}else if(g>12){
g--;
}else if(g<8){
g=8;
}var h=e-f-6;
if(b<f){
b=f;
}else if(b>h-g){
b=h-g;
}}else{
if(d<=64){
f=Math.floor(d*20/64);
}var g=Math.floor(this.b$["$wt.widgets.Slider"].thumb*(e-f*2)/(this.b$["$wt.widgets.Slider"].maximum-this.b$["$wt.widgets.Slider"].minimum));
if(g>16){
g-=2;
}else if(g>12){
g--;
}else if(g<8){
g=8;
}var h=d-f-6;
if(c<f){
c=f;
}else if(c>h-g){
c=h-g;
}}return new $wt.graphics.Point(b,c);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(a){
if(this.isHorizontal){
a.sourceElement.style.left=this.currentLocation(a).x+"px";
}else{
a.sourceElement.style.top=this.currentLocation(a).y+"px";
}this.b$["$wt.widgets.Slider"].caculateSelection();
var b=new $wt.widgets.Event();
b.x=this.b$["$wt.widgets.Slider"].lastX;
b.y=this.b$["$wt.widgets.Slider"].lastY;
b.widget=this.b$["$wt.widgets.Slider"];
b.item=this.b$["$wt.widgets.Slider"];
b.detail=1;
this.b$["$wt.widgets.Slider"].sendEvent(13,b);
return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Slider$3,i$,v$);
})(this,null));
a.bind(this.thumbHandle);
this.updateSlider();
});
$_V(c$,"enableWidget",
function(a){
if(a){
this.h&=-9;
}else{
this.h|=8;
}this.e.disabled=a;
},"~B");
$_V(c$,"getEnabled",
function(){
return(this.h&8)==0;
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
var a=this.getSize();
var b=20;
var c=0;
if((this.i&256)!=0){
if(a.x<=64){
b=Math.floor(a.x*20/64);
}c=a.x-b*2;
var d=Math.floor(this.thumb*c/(this.maximum-this.minimum));
if(d>16){
d-=2;
}else if(d>12){
d--;
}else if(d<8){
d=8;
}this.thumbHandle.style.width=d+"px";
var e=Integer.parseInt(this.thumbHandle.style.left);
this.selection=Math.floor((e-b)*(this.maximum-this.minimum)/c)+this.minimum;
}else{
if(a.y<=64){
b=Math.floor(a.y*20/64);
}c=a.y-b*2;
var d=Math.floor(this.thumb*c/(this.maximum-this.minimum));
if(d>16){
d-=2;
}else if(d>12){
d--;
}else if(d<8){
d=8;
}this.thumbHandle.style.height=d+"px";
var e=Integer.parseInt(this.thumbHandle.style.top);
this.selection=Math.floor((e-b)*(this.maximum-this.minimum)/c)+this.minimum;
}return this.selection;
});
$_M(c$,"getThumb",
function(){
return this.thumb;
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"setBounds",
function(a,b,c,d,e){
$_U(this,$wt.widgets.Slider,"setBounds",[a,b,c,d,e]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setIncrement",
function(a){
if(a<1)return;
this.increment=a;
},"~N");
$_M(c$,"setMaximum",
function(a){
if(a<0)return;
if(a<this.minimum)return;
this.maximum=a;
if(this.selection>this.maximum){
this.selection=this.maximum;
}this.updateSlider();
},"~N");
$_M(c$,"setMinimum",
function(a){
if(a<0)return;
if(a>this.maximum)return;
this.minimum=a;
if(this.selection<this.minimum){
this.selection=this.minimum;
}this.updateSlider();
},"~N");
$_M(c$,"setPageIncrement",
function(a){
if(a<1)return;
this.pageIncrement=a;
},"~N");
$_M(c$,"setSelection",
function(a){
if(a<0)return;
if(a<this.minimum){
this.selection=this.minimum;
}else if(a>this.maximum-this.thumb){
this.selection=this.maximum-this.thumb;
}else{
this.selection=a;
}this.updateSlider();
},"~N");
$_M(c$,"setSize",
function(a,b){
$_U(this,$wt.widgets.Slider,"setSize",[a,b]);
this.updateSlider();
},"~N,~N");
$_M(c$,"setBounds",
function(a,b,c,d){
$_U(this,$wt.widgets.Slider,"setBounds",[a,b,c,d]);
this.updateSlider();
},"~N,~N,~N,~N");
$_M(c$,"setThumb",
function(a){
if(a<1)return;
this.thumb=a;
this.updateSlider();
},"~N");
$_M(c$,"getIncrementButtonWidth",
function(){
var a=this.getSize();
var b=20;
if((this.i&256)!=0){
if(a.x<=64){
b=Math.floor(a.x*20/64);
}}else{
if(a.y<=64){
b=Math.floor(a.y*20/64);
}}return b;
});
$_M(c$,"updateSlider",
function(){
var a=this.getSize();
var b=20;
var c=0;
if((this.i&256)!=0){
if(a.x<=64){
b=Math.floor(a.x*20/64);
}c=a.x-b*2;
var d=Math.floor((this.selection-this.minimum)*c/(this.maximum-this.minimum))+b;
this.thumbHandle.style.left=d+"px";
var e=Math.floor(this.thumb*c/(this.maximum-this.minimum));
if(e>16){
e-=2;
}else if(e>12){
e--;
}else if(e<8){
e=8;
}this.thumbHandle.style.width=e+"px";
}else{
if(a.y<=64){
b=Math.floor(a.y*20/64);
}c=a.y-b*2;
var d=Math.floor((this.selection-this.minimum)*c/(this.maximum-this.minimum))+b;
this.thumbHandle.style.top=d+"px";
var e=Math.floor(this.thumb*c/(this.maximum-this.minimum));
if(e>16){
e-=2;
}else if(e>12){
e--;
}else if(e<8){
e=8;
}this.thumbHandle.style.height=e+"px";
}});
$_M(c$,"setValues",
function(a,b,c,d,e,f){
if(b<0)return;
if(c<0)return;
if(d<1)return;
if(e<1)return;
if(f<1)return;
this.increment=e;
this.pageIncrement=f;
this.increment=e;
this.pageIncrement=f;
this.minimum=b;
this.maximum=c;
this.thumb=d;
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
function(a,b){
$_R(this,$wt.widgets.Sash,[a,$wt.widgets.Sash.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,256,512,0,0,0,0);
},"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getBorderWidth();
var e=d*2;
var f=d*2;
if((this.i&256)!=0){
e+=64;
f+=3;
}else{
e+=3;
f+=64;
}if(a!=-1)e=a+(d*2);
if(b!=-1)f=b+(d*2);
return new $wt.graphics.Point(e,f);
},"~N,~N,~B");
$_V(c$,"createHandle",
function(){
this.e=d$.createElement("DIV");
if((this.i&256)!=0){
this.e.className="sash-vertical-default";
}else{
this.e.className="sash-horizontal-default";
}if((this.i&2048)!=0){
this.e.className+=" sash-border";
}if(this.parent!=null){
var a=this.parent.containerHandle();
if(a!=null){
a.appendChild(this.e);
}}var a=new $wt.internal.dnd.DragAndDrop();
a.addDragListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Sash$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Sash$1",$wt.internal.dnd.SashDND);
$_M(c$,"dragEnded",
function(a){
$_U(this,$wt.widgets.Sash$1,"dragEnded",[a]);
var b=new $wt.widgets.Event();
b.x=this.b$["$wt.widgets.Sash"].lastX;
b.y=this.b$["$wt.widgets.Sash"].lastY;
var c=this.b$["$wt.widgets.Sash"].getSize();
var d=0;
if((this.b$["$wt.widgets.Sash"].i&2048)!=0){
d=6;
}var e=c.x+d;
if(e<2){
e=2;
}b.width=e;
var f=c.y+d;
if(f<2){
f=2;
}b.height=f;
b.widget=this.b$["$wt.widgets.Sash"];
b.item=this.b$["$wt.widgets.Sash"];
System.out.println("drop");
this.b$["$wt.widgets.Sash"].sendEvent(13,b);
if(b.doit){
if((this.b$["$wt.widgets.Sash"].i&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].e.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].e.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}}return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"dragging",
function(a){
$_U(this,$wt.widgets.Sash$1,"dragging",[a]);
var b=new $wt.widgets.Event();
var c=this.currentLocation(a);
if(this.isHorizontal){
b.x=c.x;
b.y=Integer.parseInt(this.b$["$wt.widgets.Sash"].e.style.top);
}else{
b.x=Integer.parseInt(this.b$["$wt.widgets.Sash"].e.style.left);
b.y=c.y;
}var d=this.b$["$wt.widgets.Sash"].getSize();
var e=0;
if((this.b$["$wt.widgets.Sash"].i&2048)!=0){
e=6;
}var f=d.x+e;
if(f<2){
f=2;
}b.width=f;
var g=d.y+e;
if(g<2){
g=2;
}b.height=g;
b.widget=this.b$["$wt.widgets.Sash"];
b.item=this.b$["$wt.widgets.Sash"];
if((this.b$["$wt.widgets.Sash"].i&65536)==0){
b.detail=1;
}this.b$["$wt.widgets.Sash"].sendEvent(13,b);
if(b.doit){
this.b$["$wt.widgets.Sash"].lastX=b.x;
this.b$["$wt.widgets.Sash"].lastY=b.y;
}if((this.b$["$wt.widgets.Sash"].i&65536)!=0){
if(this.isHorizontal){
this.b$["$wt.widgets.Sash"].e.style.left=this.b$["$wt.widgets.Sash"].lastX+"px";
}else{
this.b$["$wt.widgets.Sash"].e.style.top=this.b$["$wt.widgets.Sash"].lastY+"px";
}}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
}
return $_N($wt.widgets.Sash$1,i$,v$);
})(this,null));
a.bind(this.e);
});
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
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
function(a,b){
$_R(this,$wt.custom.SashForm,[a,$wt.custom.SashForm.checkStyle(b)]);
$_U(this,$wt.custom.SashForm,"setLayout",[new $wt.custom.SashFormLayout()]);
this.sashStyle=((b&512)!=0)?256:512;
if((b&2048)!=0)this.sashStyle|=2048;
if((b&65536)!=0)this.sashStyle|=65536;
this.sashListener=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.SashForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"SashForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(a){
this.b$["$wt.custom.SashForm"].onDragSash(a);
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.custom.SashForm$1,i$,v$);
})(this,null);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
var b=100665344;
return a&b;
},"~N");
$_M(c$,"getOrientation",
function(){
return(this.sashStyle&512)!=0?256:512;
});
$_M(c$,"getStyle",
function(){
var a=$_U(this,$wt.custom.SashForm,"getStyle",[]);
a|=this.getOrientation()==512?512:256;
if((this.sashStyle&65536)!=0)a|=65536;
return a;
});
$_M(c$,"getMaximizedControl",
function(){
return this.maxControl;
});
$_M(c$,"getWeights",
function(){
var a=this.getControls(false);
var b=$_A(a.length,0);
for(var c=0;c<a.length;c++){
var d=a[c].getLayoutData();
if(d!=null&&$_O(d,$wt.custom.SashFormData)){
b[c]=parseInt(((d).weight*1000>>16));
}else{
b[c]=200;
}}
return b;
});
$_M(c$,"getControls",
function(a){
var b=this.getChildren();
var c=new Array(0);
for(var d=0;d<b.length;d++){
if($_O(b[d],$wt.widgets.Sash))continue;if(a&&!b[d].getVisible())continue;var e=new Array(c.length+1);
System.arraycopy(c,0,e,0,c.length);
e[c.length]=b[d];
c=e;
}
return c;
},"~B");
$_M(c$,"onDragSash",
function(a){
var b=a.widget;
var c=-1;
for(var d=0;d<this.sashes.length;d++){
if(this.sashes[d]==b){
c=d;
break;
}}
if(c==-1)return;
var e=this.controls[c];
var f=this.controls[c+1];
var g=e.getBounds();
var h=f.getBounds();
var i=b.getBounds();
var j=this.getClientArea();
var k=false;
if(this.getOrientation()==256){
k=g.width<20||h.width<20;
var l=h.x+h.width-g.x;
var m=a.x-i.x;
g.width+=m;
h.x+=m;
h.width-=m;
if(g.width<20){
g.width=20;
h.x=g.x+g.width+i.width;
h.width=l-h.x;
a.x=g.x+g.width;
a.doit=false;
}if(h.width<20){
g.width=l-20-i.width;
h.x=g.x+g.width+i.width;
h.width=20;
a.x=g.x+g.width;
a.doit=false;
}var n=e.getLayoutData();
if(n==null||!($_O(n,$wt.custom.SashFormData))){
n=new $wt.custom.SashFormData();
e.setLayoutData(n);
}var o=f.getLayoutData();
if(o==null||!($_O(o,$wt.custom.SashFormData))){
o=new $wt.custom.SashFormData();
f.setLayoutData(o);
}(n).weight=Math.floor(((parseInt(g.width)<<16)+j.width-1)/j.width);
(o).weight=Math.floor(((parseInt(h.width)<<16)+j.width-1)/j.width);
}else{
k=g.height<20||h.height<20;
var l=h.y+h.height-g.y;
var m=a.y-i.y;
g.height+=m;
h.y+=m;
h.height-=m;
if(g.height<20){
g.height=20;
h.y=g.y+g.height+i.height;
h.height=l-h.y;
a.y=g.y+g.height;
a.doit=false;
}if(h.height<20){
g.height=l-20-i.height;
h.y=g.y+g.height+i.height;
h.height=20;
a.y=g.y+g.height;
a.doit=false;
}var n=e.getLayoutData();
if(n==null||!($_O(n,$wt.custom.SashFormData))){
n=new $wt.custom.SashFormData();
e.setLayoutData(n);
}var o=f.getLayoutData();
if(o==null||!($_O(o,$wt.custom.SashFormData))){
o=new $wt.custom.SashFormData();
f.setLayoutData(o);
}(n).weight=Math.floor(((parseInt(g.height)<<16)+j.height-1)/j.height);
(o).weight=Math.floor(((parseInt(h.height)<<16)+j.height-1)/j.height);
}if(k||(a.doit&&a.detail!=1)){
e.setBounds(g);
b.setBounds(a.x,a.y,a.width,a.height);
f.setBounds(h);
}},"$wt.widgets.Event");
$_M(c$,"setOrientation",
function(a){
if(this.getOrientation()==a)return;
this.sashStyle&=-769;
this.sashStyle|=a==512?256:512;
for(var b=0;b<this.sashes.length;b++){
this.sashes[b].dispose();
this.sashes[b]=new $wt.widgets.Sash(this,this.sashStyle);
this.sashes[b].setBackground(this.$background);
this.sashes[b].setForeground(this.$foreground);
this.sashes[b].addListener(13,this.sashListener);
}
this.layout(false);
},"~N");
$_M(c$,"setBackground",
function(a){
$_U(this,$wt.custom.SashForm,"setBackground",[a]);
this.$background=a;
for(var b=0;b<this.sashes.length;b++){
this.sashes[b].setBackground(this.$background);
}
},"$wt.graphics.Color");
$_M(c$,"setForeground",
function(a){
$_U(this,$wt.custom.SashForm,"setForeground",[a]);
this.$foreground=a;
for(var b=0;b<this.sashes.length;b++){
this.sashes[b].setForeground(this.$foreground);
}
},"$wt.graphics.Color");
$_M(c$,"setLayout",
function(a){
return;
},"$wt.widgets.Layout");
$_M(c$,"setMaximizedControl",
function(a){
if(a==null){
if(this.maxControl!=null){
this.maxControl=null;
this.layout(false);
for(var b=0;b<this.sashes.length;b++){
this.sashes[b].setVisible(true);
}
}return;
}for(var b=0;b<this.sashes.length;b++){
this.sashes[b].setVisible(false);
}
this.maxControl=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setWeights",
function(a){
var b=this.getControls(false);
var c=0;
for(var d=0;d<a.length;d++){
c+=a[d];
}
for(var e=0;e<b.length;e++){
var f=b[e].getLayoutData();
if(f==null||!($_O(f,$wt.custom.SashFormData))){
f=new $wt.custom.SashFormData();
b[e].setLayoutData(f);
}(f).weight=Math.floor(((parseInt(a[e])<<16)+c-1)/c);
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
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
return this.getName()+" {weight="+this.weight+"}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.custom,"SashFormLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(a,b,c,d){
var e=a;
var f=e.getControls(true);
var g=0;
var h=0;
if(f.length==0){
if(b!=-1)g=b;
if(c!=-1)h=c;
return new $wt.graphics.Point(g,h);
}var i=e.getOrientation()==512;
var j=0;
var k=0;
for(var l=0;l<f.length;l++){
if(i){
var m=f[l].computeSize(b,-1,d);
if(m.y>k){
j=l;
k=m.y;
}g=Math.max(g,m.x);
}else{
var m=f[l].computeSize(-1,c,d);
if(m.x>k){
j=l;
k=m.x;
}h=Math.max(h,m.y);
}}
var m=$_A(f.length,0);
var n=0;
for(var o=0;o<f.length;o++){
var p=f[o].getLayoutData();
if(p!=null&&$_O(p,$wt.custom.SashFormData)){
m[o]=(p).weight;
}else{
p=new $wt.custom.SashFormData();
f[o].setLayoutData(p);
(p).weight=m[o]=13108;
}n+=m[o];
}
if(m[j]>0){
var p=e.sashes.length>0?e.SASH_WIDTH+e.sashes[0].getBorderWidth()*2:e.SASH_WIDTH;
if(i){
h+=parseInt((Math.floor(n*k/m[j])))+(f.length-1)*p;
}else{
g+=parseInt((Math.floor(n*k/m[j])))+(f.length-1)*p;
}}g+=e.getBorderWidth()*2;
h+=e.getBorderWidth()*2;
if(b!=-1)g=b;
if(c!=-1)h=c;
return new $wt.graphics.Point(g,h);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(a){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(a,b){
var c=a;
var d=c.getClientArea();
if(d.width<=1||d.height<=1)return;
var e=c.getControls(true);
if(c.controls.length==0&&e.length==0)return;
c.controls=e;
var f=c.controls;
if(c.maxControl!=null&&!c.maxControl.isDisposed()){
for(var g=0;g<f.length;g++){
if(f[g]!=c.maxControl){
f[g].setBounds(-200,-200,0,0);
}else{
f[g].setBounds(d);
}}
return;
}if(c.sashes.length<f.length-1){
var g=new Array(f.length-1);
System.arraycopy(c.sashes,0,g,0,c.sashes.length);
for(var h=c.sashes.length;h<g.length;h++){
g[h]=new $wt.widgets.Sash(c,c.sashStyle);
g[h].setBackground(c.$background);
g[h].setForeground(c.$foreground);
g[h].addListener(13,c.sashListener);
}
c.sashes=g;
}if(c.sashes.length>f.length-1){
if(f.length==0){
for(var g=0;g<c.sashes.length;g++){
c.sashes[g].dispose();
}
c.sashes=new Array(0);
}else{
var g=new Array(f.length-1);
System.arraycopy(c.sashes,0,g,0,g.length);
for(var h=f.length-1;h<c.sashes.length;h++){
c.sashes[h].dispose();
}
c.sashes=g;
}}if(f.length==0)return;
var g=c.sashes;
var h=$_A(f.length,0);
var i=0;
for(var j=0;j<f.length;j++){
var k=f[j].getLayoutData();
if(k!=null&&$_O(k,$wt.custom.SashFormData)){
h[j]=(k).weight;
}else{
k=new $wt.custom.SashFormData();
f[j].setLayoutData(k);
(k).weight=h[j]=13108;
}i+=h[j];
}
var k=g.length>0?c.SASH_WIDTH+g[0].getBorderWidth()*2:c.SASH_WIDTH;
if(c.getOrientation()==256){
var l=parseInt((Math.floor(h[0]*(d.width-g.length*k)/i)));
var m=d.x;
f[0].setBounds(m,d.y,l,d.height);
m+=l;
for(var n=1;n<f.length-1;n++){
g[n-1].setBounds(m,d.y,k,d.height);
m+=k;
l=parseInt((Math.floor(h[n]*(d.width-g.length*k)/i)));
f[n].setBounds(m,d.y,l,d.height);
m+=l;
}
if(f.length>1){
g[g.length-1].setBounds(m,d.y,k,d.height);
m+=k;
l=d.width-m;
f[f.length-1].setBounds(m,d.y,l,d.height);
}}else{
var l=parseInt((Math.floor(h[0]*(d.height-g.length*k)/i)));
var m=d.y;
f[0].setBounds(d.x,m,d.width,l);
m+=l;
for(var n=1;n<f.length-1;n++){
g[n-1].setBounds(d.x,m,d.width,k);
m+=k;
l=parseInt((Math.floor(h[n]*(d.height-g.length*k)/i)));
f[n].setBounds(d.x,m,d.width,l);
m+=l;
}
if(f.length>1){
g[g.length-1].setBounds(d.x,m,d.width,k);
m+=k;
l=d.height-m;
f[f.length-1].setBounds(d.x,m,d.width,l);
}}},"$wt.widgets.Composite,~B");
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.topControl=null;
$_Z(this,arguments);
},$wt.custom,"StackLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(a,b,c,d){
var e=a.getChildren();
var f=0;
var g=0;
for(var h=0;h<e.length;h++){
var i=e[h].computeSize(b,c,d);
f=Math.max(i.x,f);
g=Math.max(i.y,g);
}
var i=f+2*this.marginWidth;
var j=g+2*this.marginHeight;
if(b!=-1)i=b;
if(c!=-1)j=c;
return new $wt.graphics.Point(i,j);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(a){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(a,b){
var c=a.getChildren();
var d=a.getClientArea();
d.x+=this.marginWidth;
d.y+=this.marginHeight;
d.width-=2*this.marginWidth;
d.height-=2*this.marginHeight;
for(var e=0;e<c.length;e++){
c[e].setBounds(d);
c[e].setVisible(c[e]==this.topControl);
}
},"$wt.widgets.Composite,~B");
$_M(c$,"getName",
function(){
var a=this.getClass().getName();
var b=a.lastIndexOf('.');
if(b==-1)return a;
return a.substring(b+1,a.length);
});
$_V(c$,"toString",
function(){
var a=this.getName()+" {";
if(this.marginWidth!=0)a+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)a+="marginHeight="+this.marginHeight+" ";
if(this.topControl!=null)a+="topControl="+this.topControl+" ";
a=a.trim();
a+="}";
return a;
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
function(a,b){
$_R(this,$wt.custom.ViewForm,[a,$wt.custom.ViewForm.checkStyle(b)]);
$_U(this,$wt.custom.ViewForm,"setLayout",[new $wt.custom.ViewFormLayout()]);
this.setBorderVisible((b&2048)!=0);
var c=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.ViewForm$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"ViewForm$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(a){
switch(a.type){
case 12:
this.b$["$wt.custom.ViewForm"].onDispose();
break;
case 9:
this.b$["$wt.custom.ViewForm"].onPaint(a.gc);
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
var d=[12,9,11];
for(var e=0;e<d.length;e++){
this.addListener(d[e],c);
}
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
var b=109051904;
return a&b|1048576;
},"~N");
$_V(c$,"computeTrim",
function(a,b,c,d){
var e=a-this.borderLeft-this.highlight;
var f=b-this.borderTop-this.highlight;
var g=c+this.borderLeft+this.borderRight+2*this.highlight;
var h=d+this.borderTop+this.borderBottom+2*this.highlight;
return new $wt.graphics.Rectangle(e,f,g,h);
},"~N,~N,~N,~N");
$_M(c$,"getClientArea",
function(){
var a=$_U(this,$wt.custom.ViewForm,"getClientArea",[]);
a.x+=this.borderLeft;
a.y+=this.borderTop;
a.width-=this.borderLeft+this.borderRight;
a.height-=this.borderTop+this.borderBottom;
return a;
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
function(a){
var b=a.getForeground();
var c=this.getSize();
var d=this.getDisplay().getSystemColor(18);
if(this.showBorder){
a.setForeground(d);
a.drawRectangle(0,0,c.x-1,c.y-1);
if(this.highlight>0){
var e=1;
var f=1;
var g=c.x-1;
var h=c.y-1;
var i=[e,f,g,f,g,h,e,h,e,f+this.highlight,e+this.highlight,f+this.highlight,e+this.highlight,h-this.highlight,g-this.highlight,h-this.highlight,g-this.highlight,f+this.highlight,e,f+this.highlight];
var j=this.getDisplay().getSystemColor(26);
a.setBackground(j);
}}if(this.separator>-1){
a.setForeground(d);
a.drawLine(this.borderLeft+this.highlight,this.separator,c.x-this.borderLeft-this.borderRight-this.highlight,this.separator);
}a.setForeground(b);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
var a=this.getSize();
if(this.oldSize==null||this.oldSize.x==0||this.oldSize.y==0){
this.redraw();
}else{
var b=0;
if(this.oldSize.x<a.x){
b=a.x-this.oldSize.x+this.borderRight+this.highlight;
}else if(this.oldSize.x>a.x){
b=this.borderRight+this.highlight;
}this.redraw(a.x-b,0,b,a.y,false);
var c=0;
if(this.oldSize.y<a.y){
c=a.y-this.oldSize.y+this.borderBottom+this.highlight;
}if(this.oldSize.y>a.y){
c=this.borderBottom+this.highlight;
}this.redraw(0,a.y-c,a.x,c,false);
}this.oldSize=a;
});
$_M(c$,"setContent",
function(a){
if(this.content!=null&&!this.content.isDisposed()){
this.content.setBounds(-200,-200,0,0);
}this.content=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(a){
return;
},"$wt.widgets.Layout");
$_M(c$,"setSelectionBackground",
function(a){
if(this.selectionBackground==a)return;
if(a==null)a=this.getDisplay().getSystemColor(25);
this.selectionBackground=a;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setTopCenter",
function(a){
if(this.topCenter!=null&&!this.topCenter.isDisposed()){
var b=this.topCenter.getSize();
this.topCenter.setLocation(-200-b.x,-200-b.y);
}this.topCenter=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopLeft",
function(a){
if(this.topLeft!=null&&!this.topLeft.isDisposed()){
var b=this.topLeft.getSize();
this.topLeft.setLocation(-200-b.x,-200-b.y);
}this.topLeft=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setTopRight",
function(a){
if(this.topRight!=null&&!this.topRight.isDisposed()){
var b=this.topRight.getSize();
this.topRight.setLocation(-200-b.x,-200-b.y);
}this.topRight=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setBorderVisible",
function(a){
if(this.showBorder==a)return;
this.showBorder=a;
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
function(a){
this.separateTopCenter=a;
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
function(a,b,c,d){
var e=a;
var f=e.topLeft;
var g=e.topCenter;
var h=e.topRight;
var i=e.content;
var j=new $wt.graphics.Point(0,0);
if(f!=null){
j=this.computeChildSize(f,-1,-1,d);
}var k=new $wt.graphics.Point(0,0);
if(g!=null){
k=this.computeChildSize(g,-1,-1,d);
}var l=new $wt.graphics.Point(0,0);
if(h!=null){
l=this.computeChildSize(h,-1,-1,d);
}var m=new $wt.graphics.Point(0,0);
if(e.separateTopCenter||(b!=-1&&j.x+k.x+l.x>b)){
m.x=j.x+l.x;
if(j.x>0&&l.x>0)m.x+=e.horizontalSpacing;
m.x=Math.max(k.x,m.x);
m.y=Math.max(j.y,l.y);
if(g!=null){
m.y+=k.y;
if(f!=null||h!=null)m.y+=e.verticalSpacing;
}}else{
m.x=j.x+k.x+l.x;
var n=-1;
if(j.x>0)n++;
if(k.x>0)n++;
if(l.x>0)n++;
if(n>0)m.x+=n*e.horizontalSpacing;
m.y=Math.max(j.y,Math.max(k.y,l.y));
}if(i!=null){
if(f!=null||h!=null||g!=null)m.y+=1;
var n=new $wt.graphics.Point(0,0);
n=this.computeChildSize(i,-1,-1,d);
m.x=Math.max(m.x,n.x);
m.y+=n.y;
if(m.y>n.y)m.y+=e.verticalSpacing;
}m.x+=2*e.marginWidth;
m.y+=2*e.marginHeight;
if(b!=-1)m.x=b;
if(c!=-1)m.y=c;
return m;
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(a,b,c,d){
var e=a.getLayoutData();
if(e==null||!($_O(e,$wt.custom.CLayoutData))){
e=new $wt.custom.CLayoutData();
a.setLayoutData(e);
}return(e).computeSize(a,b,c,d);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(a){
if($_O(a,$wt.widgets.Scrollable)){
var b=(a).computeTrim(0,0,0,0);
return b.width;
}return a.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(a){
var b=a.getLayoutData();
if(b!=null&&$_O(b,$wt.custom.CLayoutData))(b).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(a,b){
var c=a;
var d=c.topLeft;
var e=c.topCenter;
var f=c.topRight;
var g=c.content;
var h=a.getClientArea();
var i=new $wt.graphics.Point(0,0);
if(d!=null&&!d.isDisposed()){
i=this.computeChildSize(d,-1,-1,b);
}var j=new $wt.graphics.Point(0,0);
if(e!=null&&!e.isDisposed()){
j=this.computeChildSize(e,-1,-1,b);
}var k=new $wt.graphics.Point(0,0);
if(f!=null&&!f.isDisposed()){
k=this.computeChildSize(f,-1,-1,b);
}var l=i.x+j.x+k.x+2*c.marginWidth+2*c.highlight;
var m=-1;
if(i.x>0)m++;
if(j.x>0)m++;
if(k.x>0)m++;
if(m>0)l+=m*c.horizontalSpacing;
var n=h.x+h.width-c.marginWidth-c.highlight;
var o=h.y+c.marginHeight+c.highlight;
var p=false;
if(c.separateTopCenter||l>h.width){
var q=Math.max(k.y,i.y);
if(f!=null&&!f.isDisposed()){
p=true;
n-=k.x;
f.setBounds(n,o,k.x,q);
n-=c.horizontalSpacing;
}if(d!=null&&!d.isDisposed()){
p=true;
var r=this.computeTrim(d);
var s=n-h.x-c.marginWidth-c.highlight-r;
i=this.computeChildSize(d,s,-1,false);
d.setBounds(h.x+c.marginWidth+c.highlight,o,i.x,q);
}if(p)o+=q+c.verticalSpacing;
if(e!=null&&!e.isDisposed()){
p=true;
var r=this.computeTrim(e);
var s=h.width-2*c.marginWidth-2*c.highlight-r;
j=this.computeChildSize(e,s,-1,false);
e.setBounds(h.x+h.width-c.marginWidth-c.highlight-j.x,o,j.x,j.y);
o+=j.y+c.verticalSpacing;
}}else{
var q=Math.max(k.y,Math.max(j.y,i.y));
if(f!=null&&!f.isDisposed()){
p=true;
n-=k.x;
f.setBounds(n,o,k.x,q);
n-=c.horizontalSpacing;
}if(e!=null&&!e.isDisposed()){
p=true;
n-=j.x;
e.setBounds(n,o,j.x,q);
n-=c.horizontalSpacing;
}if(d!=null&&!d.isDisposed()){
p=true;
var r=$_O(d,$wt.widgets.Composite)?(d).computeTrim(0,0,0,0):new $wt.graphics.Rectangle(0,0,0,0);
var s=n-h.x-c.marginWidth-c.highlight-r.width;
var t=q-r.height;
i=this.computeChildSize(d,s,t,false);
d.setBounds(h.x+c.marginWidth+c.highlight,o,i.x,q);
}if(p)o+=q+c.verticalSpacing;
}var q=c.separator;
c.separator=-1;
if(g!=null&&!g.isDisposed()){
if(d!=null||f!=null||e!=null){
c.separator=o;
o++;
}g.setBounds(h.x+c.marginWidth+c.highlight,o,h.width-2*c.marginWidth-2*c.highlight,h.y+h.height-o-c.marginHeight-c.highlight);
}if(q!=-1&&c.separator!=-1){
var r=Math.min(c.separator,q);
var s=Math.max(c.separator,q);
c.redraw(c.borderLeft,r,c.getSize().x-c.borderLeft-c.borderRight,s-r,false);
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
function(a,b){
$_R(this,$wt.custom.CLabel,[a,$wt.custom.CLabel.checkStyle(b)]);
if((b&(16908288))==0)b|=16384;
if((b&16777216)!=0)this.align=16777216;
if((b&131072)!=0)this.align=131072;
if((b&16384)!=0)this.align=16384;
this.addPaintListener((function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CLabel$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CLabel$1",null,$wt.events.PaintListener);
$_V(c$,"paintControl",
function(a){
this.b$["$wt.custom.CLabel"].onPaint(a);
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
function(a){
this.b$["$wt.custom.CLabel"].onDispose(a);
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
function(a){
if(a.detail==128){
this.b$["$wt.custom.CLabel"].onMnemonic(a);
}},"$wt.events.TraverseEvent");
c$=$_P();
}
return $_N($wt.custom.CLabel$3,i$,v$);
})(this,null));
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(a){
if((a&2048)!=0)a|=4;
var b=100663340;
a=a&b;
a|=524288;
var c=$WT.getPlatform();
if("carbon".equals(c)||"gtk".equals(c))return a;
return a|262144;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"computeSize",
function(a,b,c){
var d=this.getTotalSize(this.image,this.text);
if(a==-1){
d.x+=2*this.hIndent;
}else{
d.x=a;
}if(b==-1){
d.y+=2*this.vIndent;
}else{
d.y=b;
}return d;
},"~N,~N,~B");
$_M(c$,"drawBevelRect",
($fz=function(a,b,c,d,e,f,g){
a.setForeground(g);
a.drawLine(b+d,c,b+d,c+e);
a.drawLine(b,c+e,b+d,c+e);
a.setForeground(f);
a.drawLine(b,c,b+d-1,c);
a.drawLine(b,c,b,c+e-1);
},$fz.isPrivate=true,$fz),"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"_findMnemonic",
function(a){
if(a==null)return'\0';
var b=0;
var c=a.length;
do{
while(b<c&&(a.charAt(b)).charCodeAt(0)!=('&').charCodeAt(0))b++;

if(++b>=c)return'\0';
if((a.charAt(b)).charCodeAt(0)!=('&').charCodeAt(0))return a.charAt(b);
b++;
}while(b<c);
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
($fz=function(a,b){
var c=new $wt.graphics.Point(0,0);
if(a!=null){
var d=a.getBounds();
c.x+=d.width;
c.y+=d.height;
}var d=new $wt.graphics.GC(this);
if(b!=null&&b.length>0){
var e=d.textExtent(b,$wt.custom.CLabel.DRAW_FLAGS);
c.x+=e.x;
c.y=Math.max(c.y,e.y);
if(a!=null)c.x+=5;
}else{
c.y=Math.max(c.y,d.getFontMetrics().getHeight());
}d.dispose();
return c;
},$fz.isPrivate=true,$fz),"$wt.graphics.Image,~S");
$_M(c$,"getStyle",
function(){
var a=$_U(this,$wt.custom.CLabel,"getStyle",[]);
switch(this.align){
case 131072:
a|=131072;
break;
case 16777216:
a|=16777216;
break;
case 16384:
a|=16384;
break;
}
return a;
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
function(a){
this.gradientColors=null;
this.gradientPercents=null;
this.backgroundImage=null;
this.text=null;
this.image=null;
this.appToolTipText=null;
},"$wt.events.DisposeEvent");
$_M(c$,"onMnemonic",
function(a){
var b=this._findMnemonic(this.text);
if((b).charCodeAt(0)==('\0').charCodeAt(0))return;
if((Character.toUpperCase(a.character)).charCodeAt(0)!=(Character.toUpperCase(b)).charCodeAt(0))return;
var c=this.getParent();
while(c!=null){
var d=c.getChildren();
var e=0;
while(e<d.length){
if(d[e]==this)break;
e++;
}
e++;
if(e<d.length){
if(d[e].setFocus()){
a.doit=true;
a.detail=0;
}}c=c.getParent();
}
},"$wt.events.TraverseEvent");
$_M(c$,"onPaint",
function(a){
var b=this.getClientArea();
for(var c=this.e.childNodes.length-1;c>=0;c--){
this.e.removeChild(this.e.childNodes[c]);
}
if(b.width==0||b.height==0)return;
var d=false;
var e=this.text;
var f=this.image;
var g=Math.max(0,b.width-2*this.hIndent);
var h=this.getTotalSize(f,e);
if(h.x>g){
f=null;
h=this.getTotalSize(f,e);
if(h.x>g){
d=true;
}}var i=a.gc;
var j=this.text==null?null:this.splitString(this.text);
if(d){
h.x=0;
for(var k=0;k<j.length;k++){
var l=i.textExtent(j[k],$wt.custom.CLabel.DRAW_FLAGS);
if(l.x>g){
j[k]=this.shortenText(i,j[k],g);
h.x=Math.max(h.x,this.getTotalSize(null,j[k]).x);
}else{
h.x=Math.max(h.x,l.x);
}}
if(this.appToolTipText==null){
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.text]);
}}else{
$_U(this,$wt.custom.CLabel,"setToolTipText",[this.appToolTipText]);
}var k=b.x+this.hIndent;
if(this.align==16777216){
k=Math.floor((b.width-h.x)/2);
}if(this.align==131072){
k=b.width-this.hIndent-h.x;
}try{
if(this.backgroundImage!=null){
var l=this.backgroundImage.getBounds();
i.setBackground(this.getBackground());
i.fillRectangle(b);
var m=0;
while(m<b.width){
var n=0;
while(n<b.height){
i.drawImage(this.backgroundImage,m,n);
n+=l.height;
}
m+=l.width;
}
}else if(this.gradientColors!=null){
var l=i.getBackground();
if(this.gradientColors.length==1){
if(this.gradientColors[0]!=null)i.setBackground(this.gradientColors[0]);
i.fillRectangle(0,0,b.width,b.height);
}else{
var m=i.getForeground();
var n=this.gradientColors[0];
if(n==null)n=l;
var o=0;
for(var p=0;p<this.gradientPercents.length;++p){
i.setForeground(n);
n=this.gradientColors[p+1];
if(n==null)n=l;
i.setBackground(n);
if(this.gradientVertical){
var q=(Math.floor(this.gradientPercents[p]*b.height/100))-o;
i.fillGradientRectangle(0,o,b.width,q,true);
o+=q;
}else{
var q=(Math.floor(this.gradientPercents[p]*b.width/100))-o;
i.fillGradientRectangle(o,0,q,b.height,false);
o+=q;
}}
if(this.gradientVertical&&o<b.height){
i.setBackground(this.getBackground());
System.out.println("$$$$$$$$$$$$$");
i.fillRectangle(0,o,b.width,b.height-o);
}if(!this.gradientVertical&&o<b.width){
i.setBackground(this.getBackground());
System.out.println("***********");
i.fillRectangle(o,0,b.width-o,b.height);
}i.setForeground(m);
}i.setBackground(l);
}else{
if((this.getStyle()&262144)!=0){
i.setBackground(this.getBackground());
System.out.println("============"+b);
i.fillRectangle(b);
}}}catch(e){
if($_O(e,$wt.SWTException)){
if((this.getStyle()&262144)!=0){
i.setBackground(this.getBackground());
System.out.println("--------");
i.fillRectangle(b);
}}else{
throw e;
}
}
var l=this.getStyle();
if((l&4)!=0||(l&8)!=0){
this.paintBorder(i,b);
}if(f!=null){
var m=f.getBounds();
i.drawImage(f,0,0,m.width,m.height,k,Math.floor((b.height-m.height)/2),m.width,m.height);
k+=m.width+5;
h.x-=m.width+5;
}if(j!=null){
var m=i.getFontMetrics().getHeight();
var n=j.length*m;
var o=Math.max(this.vIndent,b.y+Math.floor((b.height-n)/2));
i.setForeground(this.getForeground());
for(var p=0;p<j.length;p++){
var q=k;
if(j.length>1){
if(this.align==16777216){
var r=i.textExtent(j[p],$wt.custom.CLabel.DRAW_FLAGS).x;
q=k+Math.max(0,Math.floor((h.x-r)/2));
}if(this.align==131072){
var r=i.textExtent(j[p],$wt.custom.CLabel.DRAW_FLAGS).x;
q=Math.max(k,b.x+b.width-this.hIndent-r);
}}i.drawText(j[p],q,o,$wt.custom.CLabel.DRAW_FLAGS);
o+=m;
}
}System.out.println("end on paint");
System.out.println(this.getSize());
},"$wt.events.PaintEvent");
$_M(c$,"paintBorder",
($fz=function(a,b){
var c=this.getDisplay();
var d=null;
var e=null;
var f=this.getStyle();
if((f&4)!=0){
d=c.getSystemColor(18);
e=c.getSystemColor(20);
}if((f&8)!=0){
d=c.getSystemColor(19);
e=c.getSystemColor(18);
}if(d!=null&&e!=null){
a.setLineWidth(1);
this.drawBevelRect(a,b.x,b.y,b.width-1,b.height-1,d,e);
}},$fz.isPrivate=true,$fz),"$wt.graphics.GC,$wt.graphics.Rectangle");
$_M(c$,"setAlignment",
function(a){
if(this.align!=a){
this.align=a;
this.redraw();
}},"~N");
$_M(c$,"setBackground",
function(a){
$_U(this,$wt.custom.CLabel,"setBackground",[a]);
if(a!=null&&this.backgroundImage==null&&this.gradientColors==null&&this.gradientPercents==null){
var b=this.getBackground();
if(a.equals(b)){
return;
}}this.backgroundImage=null;
this.gradientColors=null;
this.gradientPercents=null;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBackground",
function(a,b){
this.setBackground(a,b,false);
},"~A,~A");
$_M(c$,"setBackground",
function(a,b,c){
if(a!=null){
if(this.getDisplay().getDepth()<15){
a=[a[a.length-1]];
b=[];
}for(var d=0;d<b.length;d++){
}
}var d=this.getBackground();
if(this.backgroundImage==null){
if((this.gradientColors!=null)&&(a!=null)&&(this.gradientColors.length==a.length)){
var e=false;
for(var f=0;f<this.gradientColors.length;f++){
e=(this.gradientColors[f]==a[f])||((this.gradientColors[f]==null)&&(a[f]==d))||((this.gradientColors[f]==d)&&(a[f]==null));
if(!e)break;
}
if(e){
for(var g=0;g<this.gradientPercents.length;g++){
e=this.gradientPercents[g]==b[g];
if(!e)break;
}
}if(e&&this.gradientVertical==c)return;
}}else{
this.backgroundImage=null;
}if(a==null){
this.gradientColors=null;
this.gradientPercents=null;
this.gradientVertical=false;
}else{
this.gradientColors=new Array(a.length);
for(var e=0;e<a.length;++e)this.gradientColors[e]=(a[e]!=null)?a[e]:d;

this.gradientPercents=$_A(b.length,0);
for(var f=0;f<b.length;++f)this.gradientPercents[f]=b[f];

this.gradientVertical=c;
}this.redraw();
},"~A,~A,~B");
$_M(c$,"setBackground",
function(a){
if(a==this.backgroundImage)return;
if(a!=null){
this.gradientColors=null;
this.gradientPercents=null;
}this.backgroundImage=a;
this.redraw();
},"$wt.graphics.Image");
$_M(c$,"setFont",
function(a){
$_U(this,$wt.custom.CLabel,"setFont",[a]);
this.redraw();
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(a){
if(a!=this.image){
this.image=a;
this.redraw();
}},"$wt.graphics.Image");
$_M(c$,"setText",
function(a){
if(a==null)a="";
if(!a.equals(this.text)){
this.text=a;
this.redraw();
}},"~S");
$_M(c$,"setToolTipText",
function(a){
$_U(this,$wt.custom.CLabel,"setToolTipText",[a]);
this.appToolTipText=$_U(this,$wt.custom.CLabel,"getToolTipText",[]);
},"~S");
$_M(c$,"shortenText",
function(a,b,c){
if(b==null)return null;
var d=a.textExtent($wt.custom.CLabel.ELLIPSIS,$wt.custom.CLabel.DRAW_FLAGS).x;
var e=b.length;
var f=Math.floor(e/2);
var g=f;
var h=f+1;
while(g>=0&&h<e){
var i=b.substring(0,g);
var j=b.substring(h,e);
var k=a.textExtent(i,$wt.custom.CLabel.DRAW_FLAGS).x;
var l=a.textExtent(j,$wt.custom.CLabel.DRAW_FLAGS).x;
if(k+d+l<c){
b=i+$wt.custom.CLabel.ELLIPSIS+j;
break;
}g--;
h++;
}
return b;
},"$wt.graphics.GC,~S,~N");
$_M(c$,"splitString",
($fz=function(a){
var b=new Array(1);
var c=0;
var d;
do{
d=a.indexOf('\n',c);
if(d==-1){
b[b.length-1]=a.substring(c);
}else{
var e=(d>0)&&((a.charAt(d-1)).charCodeAt(0)==('\r').charCodeAt(0));
b[b.length-1]=a.substring(c,d-(e?1:0));
c=d+1;
var f=new Array(b.length+1);
System.arraycopy(b,0,f,0,b.length);
b=f;
}}while(d!=-1);
return b;
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
function(a,b,c,d){
if(d)this.flushCache();
if(b==-1&&c==-1){
if(this.defaultWidth==-1||this.defaultHeight==-1){
var e=a.computeSize(b,c,d);
this.defaultWidth=e.x;
this.defaultHeight=e.y;
}return new $wt.graphics.Point(this.defaultWidth,this.defaultHeight);
}if(this.currentWidth==-1||this.currentHeight==-1||b!=this.currentWhint||c!=this.currentHhint){
var e=a.computeSize(b,c,d);
this.currentWhint=b;
this.currentHhint=c;
this.currentWidth=e.x;
this.currentHeight=e.y;
}return new $wt.graphics.Point(this.currentWidth,this.currentHeight);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
c$=$_C(function(){
this.left=null;
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
function(a,b){
$_R(this,$wt.custom.CBanner,[a,$wt.custom.CBanner.checkStyle(b)]);
$_U(this,$wt.custom.CBanner,"setLayout",[new $wt.custom.CBannerLayout()]);
this.updateCurve(25);
this.resizeCursor=new $wt.graphics.Cursor(this.getDisplay(),9);
var c=(function(i$,v$){
if(!$_D("org.eclipse.swt.custom.CBanner$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.custom,"CBanner$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(a){
switch(a.type){
case 12:
this.b$["$wt.custom.CBanner"].onDispose();
break;
case 3:
this.b$["$wt.custom.CBanner"].onMouseDown(a.x,a.y);
break;
case 7:
this.b$["$wt.custom.CBanner"].onMouseExit();
break;
case 5:
this.b$["$wt.custom.CBanner"].onMouseMove(a.x,a.y);
break;
case 4:
this.b$["$wt.custom.CBanner"].onMouseUp();
break;
case 9:
this.b$["$wt.custom.CBanner"].onPaint(a.gc);
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
var d=[12,3,7,5,4,9,11];
for(var e=0;e<d.length;e++){
this.addListener(d[e],c);
}
},"$wt.widgets.Composite,~N");
c$.bezier=$_M(c$,"bezier",
function(a,b,c,d,e,f,g,h,i){
var j=a;
var k=3*(c-a);
var l=3*(a+e-2*c);
var m=g-a+3*c-3*e;
var n=b;
var o=3*(d-b);
var p=3*(b+f-2*d);
var q=h-b+3*d-3*f;
var r=$_A(2*i+2,0);
for(var s=0;s<=i;s++){
var t=s/i;
r[2*s]=parseInt((j+k*t+l*t*t+m*t*t*t));
r[2*s+1]=parseInt((n+o*t+p*t*t+q*t*t*t));
}
return r;
},"~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
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
return this.left;
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
var a=this.right.computeSize(-1,this.getSize().y,false);
return a.x;
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
this.left=null;
this.right=null;
});
$_M(c$,"onMouseDown",
function(a,b){
if(this.curveRect.contains(a,b)){
this.dragging=true;
this.rightDragDisplacement=this.curveStart-a+this.curve_width-this.curve_indent;
}},"~N,~N");
$_M(c$,"onMouseExit",
function(){
if(!this.dragging)this.setCursor(null);
});
$_M(c$,"onMouseMove",
function(a,b){
if(this.dragging){
var c=this.getSize();
if(!(0<a&&a<c.x))return;
this.rightWidth=Math.max(0,c.x-a-this.rightDragDisplacement);
if(this.rightMinWidth!=-1){
this.rightWidth=Math.max(this.rightMinWidth,this.rightWidth);
}this.layout(false);
return;
}if(this.curveRect.contains(a,b)){
this.setCursor(this.resizeCursor);
}else{
this.setCursor(null);
}},"~N,~N");
$_M(c$,"onMouseUp",
function(){
this.dragging=false;
});
$_M(c$,"onPaint",
function(a){
var b=this.getSize();
var c=this.getDisplay().getSystemColor($wt.custom.CBanner.BORDER1);
if(this.bottom!=null&&(this.left!=null||this.right!=null)){
a.setForeground(c);
var d=this.bottom.getBounds().y-1-1;
a.drawLine(0,d,b.x,d);
}if(this.left==null||this.right==null)return;
var d=$_A(this.curve.length+6,0);
var e=0;
var f=this.curveStart;
var g=0;
d[e++]=f+1;
d[e++]=b.y-1;
for(var h=0;h<Math.floor(this.curve.length/2);h++){
d[e++]=f+this.curve[2*h];
d[e++]=g+this.curve[2*h+1];
}
d[e++]=f+this.curve_width;
d[e++]=0;
d[e++]=b.x;
d[e++]=0;
var i=this.getBackground();
if(this.getDisplay().getDepth()>=15){
var j=$_A(d.length,0);
e=0;
for(var k=0;k<Math.floor(d.length/2);k++){
j[e]=d[e++]-1;
j[e]=d[e++];
}
var l=$_A(d.length,0);
e=0;
for(var m=0;m<Math.floor(d.length/2);m++){
l[e]=d[e++]+1;
l[e]=d[e++];
}
var n=c.getRGB();
var o=i.getRGB();
var p=n.red+Math.floor(3*(o.red-n.red)/4);
var q=n.green+Math.floor(3*(o.green-n.green)/4);
var r=n.blue+Math.floor(3*(o.blue-n.blue)/4);
var s=new $wt.graphics.Color(this.getDisplay(),p,q,r);
a.setForeground(s);
s.dispose();
var t=Math.max(0,this.curveStart-200);
a.setForeground(i);
a.setBackground(c);
a.fillGradientRectangle(t,b.y-1,this.curveStart-t+1,1,false);
}else{
var j=Math.max(0,this.curveStart-200);
a.setForeground(c);
a.drawLine(j,b.y-1,this.curveStart+1,b.y-1);
}a.setForeground(c);
},"$wt.graphics.GC");
$_M(c$,"onResize",
function(){
this.updateCurve(this.getSize().y);
});
$_M(c$,"setBottom",
function(a){
if(this.bottom!=null&&!this.bottom.isDisposed()){
var b=this.bottom.getSize();
this.bottom.setLocation(-200-b.x,-200-b.y);
}this.bottom=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setLayout",
function(a){
return;
},"$wt.widgets.Layout");
$_M(c$,"setLeft",
function(a){
if(this.left!=null&&!this.left.isDisposed()){
var b=this.left.getSize();
this.left.setLocation(-200-b.x,-200-b.y);
}this.left=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRight",
function(a){
if(this.right!=null&&!this.right.isDisposed()){
var b=this.right.getSize();
this.right.setLocation(-200-b.x,-200-b.y);
}this.right=a;
this.layout(false);
},"$wt.widgets.Control");
$_M(c$,"setRightMinimumSize",
function(a){
this.rightMinWidth=a.x;
this.rightMinHeight=a.y;
},"$wt.graphics.Point");
$_M(c$,"setRightWidth",
function(a){
this.rightWidth=a;
this.layout(false);
},"~N");
$_M(c$,"setSimple",
function(a){
if(this.simple!=a){
this.simple=a;
if(a){
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
function(a){
var b=a-1;
if(this.simple){
this.curve=[0,b,1,b,2,b-1,3,b-2,3,2,4,1,5,0];
}else{
this.curve=$wt.custom.CBanner.bezier(0,b+1,30,b+1,this.curve_width-30,0,this.curve_width,0,this.curve_width);
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
function(a,b,c,d){
var e=a;
var f=e.left;
var g=e.right;
var h=e.bottom;
var i=f!=null&&g!=null;
var j=c;
var k=b;
var l=new $wt.graphics.Point(0,0);
if(h!=null){
var m=this.computeTrim(h);
var n=b==-1?-1:k-m;
l=this.computeChildSize(h,n,-1,d);
if(c!=-1){
l.y=Math.min(l.y,j);
j-=l.y+3+1+2;
}}if(i&&c!=-1){
j-=7;
}var m=new $wt.graphics.Point(0,0);
if(g!=null){
var n=this.computeTrim(g);
var o=e.rightWidth==-1?-1:e.rightWidth-n;
var p=e.rightWidth==-1?-1:j;
m=this.computeChildSize(g,o,p,d);
if(b!=-1){
m.x=Math.min(m.x,k);
k-=m.x+e.curve_width-2*e.curve_indent;
k=Math.max(k,10);
}}var n=new $wt.graphics.Point(0,0);
if(f!=null){
var o=this.computeTrim(f);
var p=b==-1?-1:k-o;
n=this.computeChildSize(f,p,-1,d);
}k=n.x+m.x;
j=l.y;
if(h!=null){
j+=3;
}if(f!=null){
j+=g==null?n.y:Math.max(n.y,e.rightMinHeight);
}else{
j+=m.y;
}if(i){
k+=e.curve_width-2*e.curve_indent;
j+=7;
}if(b!=-1)k=b;
if(c!=-1)j=c;
return new $wt.graphics.Point(k,j);
},"$wt.widgets.Composite,~N,~N,~B");
$_M(c$,"computeChildSize",
function(a,b,c,d){
var e=a.getLayoutData();
if(e==null||!($_O(e,$wt.custom.CLayoutData))){
e=new $wt.custom.CLayoutData();
a.setLayoutData(e);
}return(e).computeSize(a,b,c,d);
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"computeTrim",
function(a){
if($_O(a,$wt.widgets.Scrollable)){
var b=(a).computeTrim(0,0,0,0);
return b.width;
}return a.getBorderWidth()*2;
},"$wt.widgets.Control");
$_V(c$,"flushCache",
function(a){
var b=a.getLayoutData();
if(b!=null&&$_O(b,$wt.custom.CLayoutData))(b).flushCache();
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(a,b){
var c=a;
var d=c.left;
var e=c.right;
var f=c.bottom;
var g=c.getSize();
var h=d!=null&&e!=null;
var i=g.x;
var j=g.y;
var k=new $wt.graphics.Point(0,0);
if(f!=null){
var l=this.computeTrim(f);
var m=i-l;
k=this.computeChildSize(f,m,-1,b);
k.y=Math.min(k.y,j);
j-=k.y+3+2+1;
}if(h)j-=7;
j=Math.max(0,j);
var l=new $wt.graphics.Point(0,0);
if(e!=null){
var m=0;
var n=0;
if($_O(e,$wt.widgets.Scrollable)){
var o=(e).computeTrim(0,0,0,0);
m=o.width;
n=o.height;
}else{
m=n=e.getBorderWidth()*2;
}var o=c.rightWidth==-1?-1:c.rightWidth-m;
var p=c.rightWidth==-1?-1:j-n;
l=this.computeChildSize(e,o,p,b);
l.x=Math.min(l.x,i);
i-=l.x+c.curve_width-2*c.curve_indent;
i=Math.max(i,10);
}var m=new $wt.graphics.Point(0,0);
if(d!=null){
var n=this.computeTrim(d);
m=this.computeChildSize(d,i-n,-1,b);
}var n=0;
var o=0;
var p=c.curveStart;
var q=null;
var r=null;
var s=null;
if(f!=null){
s=new $wt.graphics.Rectangle(n,o+g.y-k.y,k.x,k.y);
}if(h)o+=4;
if(d!=null){
q=new $wt.graphics.Rectangle(n,o,m.x,m.y);
c.curveStart=n+m.x-c.curve_indent;
n+=m.x+c.curve_width-2*c.curve_indent;
}if(e!=null){
r=new $wt.graphics.Rectangle(n,o,l.x,l.y);
}if(c.curveStart<p){
c.redraw(c.curveStart-200,0,p+c.curve_width-c.curveStart+200+5,g.y,false);
}if(c.curveStart>p){
c.redraw(p-200,0,c.curveStart+c.curve_width-p+200+5,g.y,false);
}c.update();
c.curveRect=new $wt.graphics.Rectangle(c.curveStart,0,c.curve_width,g.y);
if(s!=null)f.setBounds(s);
if(r!=null)e.setBounds(r);
if(q!=null)d.setBounds(q);
},"$wt.widgets.Composite,~B");
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
function(a,b){
$_R(this,$wt.widgets.ToolBar,[a,$wt.widgets.ToolBar.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
if((a&8388608)==0)a|=524288;
if((a&512)!=0)a&=-65;
return a&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if((this.i&512)!=0){
var f=this.items.length;
for(var g=0;g<f;g++){
var h=this.items[g].getBounds();
e+=h.height;
if((this.items[g].i&2)!=0){
d=Math.max(d,24);
}else{
d=Math.max(d,h.width);
}}
}else{
var f=this.items.length;
for(var g=0;g<f;g++){
var h=this.items[g].getBounds();
System.out.println(h);
e=Math.max(e,h.height);
d+=h.width;
}
}if(d==0)d=24;
if(e==0)e=22;
if(a!=-1)d=a;
if(b!=-1)e=b;
var f=this.computeTrim(0,0,d,e);
d=f.width;
e=f.height;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(a,b,c,d){
var e=$_U(this,$wt.widgets.ToolBar,"computeTrim",[a,b,c,d]);
e.height+=2;
return e;
},"~N,~N,~N,~N");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.ToolBar,"createHandle",[]);
this.h&=-3;
this.items=new Array(0);
this.lastFocusId=-1;
this.e=d$.createElement("DIV");
if(this.parent.e!=null){
this.parent.e.appendChild(this.e);
}this.e.className="tool-bar-default";
if((this.i&2048)!=0){
this.e.className+=" tool-bar-border";
}});
$_M(c$,"createItem",
function(a,b){
var c=this.items.length;
var d=this.items.length;
this.items[a.id=d]=a;
a.e=d$.createElement("DIV");
a.e.className="tool-item-default";
this.e.appendChild(a.e);
if((this.i&512)!=0)this.setRowCount(c+1);
this.layoutItems();
},"$wt.widgets.ToolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.ToolBar,"createWidget",[]);
this.items=new Array(0);
this.lastFocusId=-1;
});
$_M(c$,"destroyItem",
function(a){
this.layoutItems();
},"$wt.widgets.ToolItem");
$_M(c$,"enableWidget",
function(a){
$_U(this,$wt.widgets.ToolBar,"enableWidget",[a]);
for(var b=0;b<this.items.length;b++){
var c=this.items[b];
if(c!=null){
if((c.i&(48))!=0){
c.updateImages(a&&c.getEnabled());
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
function(a){
var b=this.items.length;
return this.items[a];
},"~N");
$_M(c$,"getItem",
function(a){
var b=this.getItems();
for(var c=0;c<b.length;c++){
var d=b[c].getBounds();
if(d.contains(a))return b[c];
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
function(a){
return 0;
},"$wt.widgets.ToolItem");
$_M(c$,"layoutItems",
function(){
if((this.i&64)!=0){
try{
this.e.style.whiteSpace="wrap";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}if((this.i&512)!=0){
}for(var a=0;a<this.items.length;a++){
var b=this.items[a];
if(b!=null)b.resizeControl();
}
});
$_V(c$,"mnemonicHit",
function(a){
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(a){
return false;
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var a=0;a<this.items.length;a++){
var b=this.items[a];
if(b!=null&&!b.isDisposed()){
b.releaseImages();
b.releaseResources();
}}
this.items=null;
this.imageList=this.hotImageList=this.disabledImageList=null;
$_U(this,$wt.widgets.ToolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(a){
$_U(this,$wt.widgets.ToolBar,"removeControl",[a]);
for(var b=0;b<this.items.length;b++){
var c=this.items[b];
if(c!=null&&c.control==a){
c.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(a,b,c,d,e){
if(this.parent.L!=null){
}$_U(this,$wt.widgets.ToolBar,"setBounds",[a,b,c,d,e]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setDefaultFont",
function(){
$_U(this,$wt.widgets.ToolBar,"setDefaultFont",[]);
});
$_M(c$,"setDisabledImageList",
function(a){
if(this.disabledImageList==a)return;
var b=0;
if((this.disabledImageList=a)!=null){
b=this.disabledImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setFont",
function(a){
$_U(this,$wt.widgets.ToolBar,"setFont",[a]);
var b=0;
var c=60;
while(b<this.items.length){
var d=this.items[b];
if(d!=null&&(d.i&c)!=0)break;
b++;
}
if(b==this.items.length){
}this.layoutItems();
},"$wt.graphics.Font");
$_M(c$,"setHotImageList",
function(a){
if(this.hotImageList==a)return;
var b=0;
if((this.hotImageList=a)!=null){
b=this.hotImageList.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setImageList",
function(a){
if(this.imageList==a)return;
var b=0;
if((this.imageList=a)!=null){
b=a.getHandle();
}},"$wt.widgets.ImageList");
$_M(c$,"setParent",
function(a){
if(!$_U(this,$wt.widgets.ToolBar,"setParent",[a]))return false;
return true;
},"$wt.widgets.Composite");
$_M(c$,"setRowCount",
function(a){
},"~N");
$_M(c$,"setTabItemFocus",
function(){
var a=0;
while(a<this.items.length){
var b=this.items[a];
if(b!=null&&(b.i&2)==0){
if(b.getEnabled())break;
}a++;
}
if(a==this.items.length)return false;
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
function(a,b){
$_R(this,$wt.widgets.ToolItem,[a,$wt.widgets.ToolItem.checkStyle(b)]);
this.parent=a;
a.createItem(this,a.getItemCount());
},"$wt.widgets.ToolBar,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.ToolItem,[a,$wt.widgets.ToolItem.checkStyle(b)]);
this.parent=a;
a.createItem(this,c);
},"$wt.widgets.ToolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return $wt.widgets.Widget.checkBits(a,8,32,16,2,4,0);
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"click",
function(a){
},"~B");
$_M(c$,"createDisabledImage",
function(a,b){
return new $wt.graphics.Image(this.b,a,1);
},"$wt.graphics.Image,$wt.graphics.Color");
$_M(c$,"getBounds",
function(){
var a=0;
var b=0;
var c=this.e.style.left;
if(c!=null&&c.length!=0){
a=Integer.parseInt(c);
}var d=this.e.style.top;
if(d!=null&&d.length!=0){
b=Integer.parseInt(d);
}var e=64;
var f=64;
var g=this.e.style.width;
if(g!=null&&g.length!=0){
e=Integer.parseInt(g);
}else if(this.text!=null&&this.text.length!=0){
e=$wt.internal.browser.OS.getStringPlainWidth(this.text);
}var h=this.e.style.height;
if(h!=null&&h.length!=0){
f=Integer.parseInt(h);
}else if(this.text!=null&&this.text.length!=0){
f=$wt.internal.browser.OS.getStringPlainHeight(this.text);
}return new $wt.graphics.Rectangle(a,b,e+6,f+6);
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
if((this.i&2)!=0){
return(this.h&8)==0;
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
if((this.i&(48))==0)return false;
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
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"resizeControl",
function(){
if(this.control!=null&&!this.control.isDisposed()){
var a=this.getBounds();
this.control.setSize(a.width,a.height);
var b=this.control.getBounds();
b.x=a.x+Math.floor((a.width-b.width)/2);
b.y=a.y+Math.floor((a.height-b.height)/2);
this.control.setLocation(b.x,b.y);
}});
$_M(c$,"selectRadio",
function(){
var a=0;
var b=this.parent.getItems();
while(a<b.length&&b[a]!=this)a++;

var c=a-1;
while(c>=0&&b[c].setRadioSelection(false))--c;

var d=a+1;
while(d<b.length&&b[d].setRadioSelection(false))d++;

this.setSelection(true);
});
$_M(c$,"setControl",
function(a){
if(a!=null){
}if((this.i&2)==0)return;
this.control=a;
if((this.parent.i&(576))!=0){
}this.resizeControl();
},"$wt.widgets.Control");
$_M(c$,"setEnabled",
function(a){
if(this.image!=null)this.updateImages(a&&this.parent.getEnabled());
},"~B");
$_M(c$,"setDisabledImage",
function(a){
if((this.i&2)!=0)return;
this.disabledImage=a;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setHotImage",
function(a){
if((this.i&2)!=0)return;
this.hotImage=a;
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setImage",
function(a){
if((this.i&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setImage",[a]);
this.updateImages(this.getEnabled()&&this.parent.getEnabled());
},"$wt.graphics.Image");
$_M(c$,"setRadioSelection",
function(a){
if((this.i&16)==0)return false;
if(this.getSelection()!=a){
this.setSelection(a);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSelection",
function(a){
if((this.i&(48))==0)return;
if((this.i&(48))!=0){
if(!this.getEnabled()||!this.parent.getEnabled()){
this.updateImages(false);
}}},"~B");
$_M(c$,"setText",
function(a){
if((this.i&2)!=0)return;
$_U(this,$wt.widgets.ToolItem,"setText",[a]);
if(this.e!=null){
this.e.appendChild(d$.createTextNode(a));
}this.parent.layoutItems();
},"~S");
$_M(c$,"setToolTipText",
function(a){
this.toolTipText=a;
},"~S");
$_M(c$,"setWidth",
function(a){
if((this.i&2)==0)return;
if(a<0)return;
this.parent.layoutItems();
},"~N");
$_M(c$,"updateImages",
function(a){
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
function(a,b){
$_R(this,$wt.widgets.CoolBar,[a,$wt.widgets.CoolBar.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
a|=524288;
return a&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
var f=this.getBorderWidth();
var g=a==-1?0x3FFF:a+(f*2);
var h=b==-1?0x3FFF:b+(f*2);
if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
e+=f*2;
d+=f*2;
return new $wt.graphics.Point(d,e);
},"~N,~N,~B");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.CoolBar,"createHandle",[]);
this.h&=-3;
this.e=d$.createElement("DIV");
if(this.parent.e!=null){
this.parent.e.appendChild(this.e);
}this.e.className="cool-bar-default";
if((this.i&2048)!=0){
this.e.className+=" cool-bar-border";
}});
$_M(c$,"createItem",
function(a,b){
var c=this.items.length;
var d=this.items.length;
this.items[a.id=d]=a;
this.itemHandles[d]=d$.createElement("DIV");
var e=this.itemHandles[d];
e.className="cool-item-default";
if(b==c){
e.appendChild(e);
}else{
e.insertBefore(e,this.itemHandles[b]);
}},"$wt.widgets.CoolItem,~N");
$_M(c$,"createWidget",
function(){
$_U(this,$wt.widgets.CoolBar,"createWidget",[]);
this.items=new Array(4);
this.originalItems=new Array(0);
this.items=new Array(0);
});
$_M(c$,"destroyItem",
function(a){
},"$wt.widgets.CoolItem");
$_M(c$,"getMargin",
function(a){
var b=0;
if((this.i&8388608)!=0){
b+=12;
}else{
b+=16;
}return b;
},"~N");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"getItem",
function(a){
var b=this.items.length;
return this.items[a];
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
function(a){
return 0;
},"~N");
$_M(c$,"isLastItemOfRow",
function(a){
return false;
},"~N");
$_M(c$,"getLocked",
function(){
return this.locked;
});
$_M(c$,"getWrapIndices",
function(){
var a=this.getItems();
var b=$_A(a.length,0);
var c=0;
for(var d=0;d<a.length;d++){
if(a[d].getWrap())b[c++]=d;
}
var e=$_A(c,0);
System.arraycopy(b,0,e,0,c);
return e;
});
$_M(c$,"indexOf",
function(a){
for(var b=0;b<this.items.length;b++){
if(a==this.items[b]){
return b;
}}
return-1;
},"$wt.widgets.CoolItem");
$_M(c$,"resizeToPreferredWidth",
function(a){
},"~N");
$_M(c$,"resizeToMaximumWidth",
function(a){
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var a=0;a<this.items.length;a++){
var b=this.items[a];
if(b!=null&&!b.isDisposed()){
b.releaseResources();
}}
this.items=null;
$_U(this,$wt.widgets.CoolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(a){
$_U(this,$wt.widgets.CoolBar,"removeControl",[a]);
for(var b=0;b<this.items.length;b++){
var c=this.items[b];
if(c!=null&&c.control==a){
c.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBackgroundPixel",
function(a){
if(this.background==a)return;
this.background=a;
},"~N");
$_M(c$,"setForegroundPixel",
function(a){
if(this.foreground==a)return;
this.foreground=a;
},"~N");
$_M(c$,"setItemColors",
function(a,b){
},"~N,~N");
$_M(c$,"setItemLayout",
function(a,b,c){
this.setRedraw(false);
this.setItemOrder(a);
this.setWrapIndices(b);
this.setItemSizes(c);
this.setRedraw(true);
},"~A,~A,~A");
$_M(c$,"setItemOrder",
function(a){
},"~A");
$_M(c$,"setItemSizes",
function(a){
},"~A");
$_M(c$,"setLocked",
function(a){
this.locked=a;
},"~B");
$_M(c$,"setWrapIndices",
function(a){
if(a==null)a=$_A(0,0);
var b=this.getItemCount();
for(var c=0;c<a.length;c++){
}
this.setRedraw(false);
var d=this.getItems();
for(var e=0;e<d.length;e++){
var f=d[e];
if(f.getWrap()){
this.resizeToPreferredWidth(e-1);
f.setWrap(false);
}}
this.resizeToMaximumWidth(b-1);
for(var f=0;f<a.length;f++){
var g=a[f];
if(0<=g&&g<d.length){
var h=d[g];
h.setWrap(true);
this.resizeToMaximumWidth(g-1);
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
function(a,b){
$_R(this,$wt.widgets.CoolItem,[a,b]);
this.parent=a;
a.createItem(this,a.getItemCount());
},"$wt.widgets.CoolBar,~N");
$_K(c$,
function(a,b,c){
$_R(this,$wt.widgets.CoolItem,[a,b]);
this.parent=a;
a.createItem(this,c);
},"$wt.widgets.CoolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"computeSize",
function(a,b){
var c=this.parent.indexOf(this);
if(c==-1)return new $wt.graphics.Point(0,0);
var d=a;
var e=b;
if(a==-1)d=32;
if(b==-1)e=32;
d+=this.parent.getMargin(c);
return new $wt.graphics.Point(d,e);
},"~N,~N");
$_M(c$,"getBounds",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getClientArea",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return new $wt.graphics.Rectangle(0,0,0,0);
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
function(a){
if(a!=null){
}var b=this.parent.indexOf(this);
if(b==-1)return;
if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var c=this.control;
var d=a;
this.control=d;
},"$wt.widgets.Control");
$_M(c$,"getPreferredSize",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setPreferredSize",
function(a,b){
var c=this.parent.indexOf(this);
if(c==-1)return;
a=Math.max(0,a);
b=Math.max(0,b);
this.ideal=true;
var d=this.parent.itemHandles[this.parent.indexOf(this)];
d.style.width=a+"px";
d.style.height=b+"px";
},"~N,~N");
$_M(c$,"setPreferredSize",
function(a){
this.setPreferredSize(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setText",
function(a){
if((this.i&2)!=0)return;
$_U(this,$wt.widgets.CoolItem,"setText",[a]);
var b=this.parent.itemHandles[this.parent.indexOf(this)];
if(b!=null){
b.appendChild(d$.createTextNode(a));
}},"~S");
$_M(c$,"getSize",
function(){
var a=this.parent.indexOf(this);
if(a==-1)new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(0,0);
});
$_M(c$,"setSize",
function(a,b){
var c=this.parent.indexOf(this);
if(c==-1)return;
a=Math.max(0,a);
b=Math.max(0,b);
},"~N,~N");
$_M(c$,"setSize",
function(a){
this.setSize(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"getMinimumSize",
function(){
var a=this.parent.indexOf(this);
if(a==-1)return new $wt.graphics.Point(0,0);
return new $wt.graphics.Point(32,16);
});
$_M(c$,"setMinimumSize",
function(a,b){
var c=this.parent.indexOf(this);
if(c==-1)return;
a=Math.max(0,a);
b=Math.max(0,b);
this.minimum=true;
},"~N,~N");
$_M(c$,"setMinimumSize",
function(a){
this.setMinimumSize(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"getWrap",
function(){
var a=this.parent.indexOf(this);
return false;
});
$_M(c$,"setWrap",
function(a){
var b=this.parent.indexOf(this);
},"~B");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
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
function(a,b){
$_R(this,$wt.widgets.Caret,[a,b]);
this.parent=a;
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
var a=this.image.getBounds();
return new $wt.graphics.Rectangle(this.x,this.y,a.width,a.height);
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
var a=this.image.getBounds();
return new $wt.graphics.Point(a.width,a.height);
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
function(a,b,c,d){
var e=this.x==a&&this.y==b;
var f=this.width==c&&this.height==d;
if(e&&f)return;
this.x=a;
this.y=b;
this.width=c;
this.height=d;
if(f){
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
}else{
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
}},"~N,~N,~N,~N");
$_M(c$,"setBounds",
function(a){
this.setBounds(a.x,a.y,a.width,a.height);
},"$wt.graphics.Rectangle");
$_M(c$,"setFocus",
function(){
});
$_M(c$,"setFont",
function(a){
this.font=a;
},"$wt.graphics.Font");
$_M(c$,"setImage",
function(a){
this.image=a;
if(this.$isVisible&&this.hasFocus())this.resize();
},"$wt.graphics.Image");
$_M(c$,"setLocation",
function(a,b){
if(this.x==a&&this.y==b)return;
this.x=a;
this.y=b;
this.moved=true;
if(this.$isVisible&&this.hasFocus())this.move();
},"~N,~N");
$_M(c$,"setLocation",
function(a){
this.setLocation(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setSize",
function(a,b){
if(this.width==a&&this.height==b)return;
this.width=a;
this.height=b;
this.resized=true;
if(this.$isVisible&&this.hasFocus())this.resize();
},"~N,~N");
$_M(c$,"setSize",
function(a){
this.setSize(a.x,a.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(a){
if(a==this.$isVisible)return;
this.$isVisible=a;
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
function(a,b){
$_R(this,$wt.widgets.Spinner,[a,$wt.widgets.Spinner.checkStyle(b)]);
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
return a&-769;
},"~N");
$_V(c$,"checkSubclass",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Spinner,"createHandle",[]);
this.h&=-3;
this.e=d$.createElement("DIV");
this.e.className="spinner-default";
if(this.parent!=null&&this.parent.e!=null){
this.parent.e.appendChild(this.e);
}if((this.i&2048)!=0){
this.e.className+=" spinner-border";
}this.updownHandle=d$.createElement("DIV");
this.e.appendChild(this.updownHandle);
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
this.e.appendChild(this.textHandle);
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
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(24,b);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(13,b);
this.addListener(14,b);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(a){
var b=new $wt.widgets.TypedListener(a);
this.addListener(25,b);
},"$wt.events.VerifyListener");
$_M(c$,"computeSize",
function(a,b,c){
var d=0;
var e=0;
if(a==-1||b==-1){
var f=null;
if(this.digits>0){
var g=Math.floor(this.maximum/parseInt(Math.pow(10,this.digits)));
var h=""+g;
h+=this.getDecimalSeparator();
var i=this.digits-h.length+1;
while(i>=0){
h+="0";
i--;
}
f=h;
System.out.println(h);
}else{
f=""+this.maximum;
}var g=$wt.internal.browser.OS.getStringPlainSize(f);
d=g.x;
e=g.y;
}if(d==0)d=64;
if(e==0)e=64;
if(a!=-1)d=a;
if(b!=-1)e=b;
var f=this.computeTrim(0,0,d,e);
System.err.println(f);
return new $wt.graphics.Point(f.width,f.height);
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(a,b,c,d){
var e=4;
a-=e&0xFFFF;
c+=(e&0xFFFF)+((e>>16)&0xFFFF);
if((this.i&2048)!=0){
a-=1;
b-=1;
c+=2;
d+=2;
}c+=2;
return new $wt.graphics.Rectangle(a,b,c,d);
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"cut",
function(){
if((this.i&8)!=0)return;
});
$_M(c$,"enableWidget",
function(a){
$_U(this,$wt.widgets.Spinner,"enableWidget",[a]);
},"~B");
$_M(c$,"deregister",
function(){
$_U(this,$wt.widgets.Spinner,"deregister",[]);
this.b.removeControl(this.hwndText);
this.b.removeControl(this.hwndUpDown);
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
if((this.i&8)!=0)return;
});
$_M(c$,"register",
function(){
$_U(this,$wt.widgets.Spinner,"register",[]);
this.b.addControl(this.hwndText,this);
this.b.addControl(this.hwndUpDown,this);
});
$_M(c$,"releaseHandle",
function(){
$_U(this,$wt.widgets.Spinner,"releaseHandle",[]);
this.hwndText=this.hwndUpDown=null;
});
$_M(c$,"removeModifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(24,a);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(a){
if(this.d==null)return;
this.d.unhook(13,a);
this.d.unhook(14,a);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(a){
if(this.d==null)return;
this.d.unhook(25,a);
},"$wt.events.VerifyListener");
$_M(c$,"setDigits",
function(a){
if(a==this.digits)return;
this.digits=a;
},"~N");
$_M(c$,"setIncrement",
function(a){
if(a<1)return;
this.increment=a;
},"~N");
$_M(c$,"setMaximum",
function(a){
if(a<0)return;
this.maximum=a;
},"~N");
$_M(c$,"setMinimum",
function(a){
if(a<0)return;
this.minimum=a;
},"~N");
$_M(c$,"setPageIncrement",
function(a){
if(a<1)return;
this.pageIncrement=a;
},"~N");
$_M(c$,"setSelection",
function(a){
var b=$_A(1,0);
var c=$_A(1,0);
a=Math.min(Math.max(c[0],a),b[0]);
this.setSelection(a,false);
},"~N");
$_M(c$,"setSelection",
function(a,b){
var c=String.valueOf(a);
if(this.digits>0){
var d=this.getDecimalSeparator();
var e=c.length-this.digits;
var f=new StringBuffer();
if(e>0){
f.append(c.substring(0,e));
f.append(d);
f.append(c.substring(e));
}else{
f.append("0");
f.append(d);
while(e++<0)f.append("0");

f.append(c);
}c=f.toString();
}if(this.hooks(25)||this.filters(25)){
var d=this.textInputHandle.value.length;
c=this.verifyText(c,0,d,null);
if(c==null)return;
}if(this.textInputHandle!=null){
this.textInputHandle.value=""+a;
}if(b)this.sendEvent(13);
},"~N,~B");
$_M(c$,"verifyText",
function(a,b,c,d){
var e=new $wt.widgets.Event();
e.text=a;
e.start=b;
e.end=c;
if(d!=null){
e.character=d.character;
e.keyCode=d.keyCode;
e.stateMask=d.stateMask;
}var f=0;
if(this.digits>0){
var g=this.getDecimalSeparator();
f=a.indexOf(g);
if(f!=-1){
a=a.substring(0,f)+a.substring(f+1);
}f=0;
}while(f<a.length){
if(!Character.isDigit(a.charAt(f)))break;
f++;
}
e.doit=f==a.length;
this.sendEvent(25,e);
if(!e.doit||this.isDisposed())return null;
return e.text;
},"~S,~N,~N,$wt.widgets.Event");
$_M(c$,"setSize",
function(a,b){
$_U(this,$wt.widgets.Spinner,"setSize",[a,b]);
this.textInputHandle.style.width=(a-28)+"px";
this.textInputHandle.style.height=((b-2)>24?20:b-2)+"px";
},"~N,~N");
c$=$_C(function(){
this.style=0;
this.parent=null;
this.title=null;
$_Z(this,arguments);
},$wt.widgets,"Dialog");
$_K(c$,
function(a){
this.construct(a,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
this.checkParent(a);
this.parent=a;
this.style=b;
this.title="";
},"$wt.widgets.Shell,~N");
$_M(c$,"checkSubclass",
function(){
if(!$wt.widgets.Display.isValidClass(this.getClass())){
this.error(43);
}});
$_M(c$,"checkParent",
function(a){
if(a==null)this.error(4);
},"$wt.widgets.Shell");
$_M(c$,"error",
function(a){
$WT.error(a);
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
function(a){
if(a==null)this.error(4);
this.title=a;
},"~S");
$_M(c$,"dialogUnimplemented",
function(){
var a=new $wt.widgets.Shell(this.parent.b,this.style|64|2048);
a.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(a){
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.Dialog$1,i$,v$);
})(this,null));
a.setText(this.title);
a.setLayout(new $wt.layout.GridLayout(2,false));
var b=new $wt.widgets.Label(a,0);
b.setImage(new $wt.graphics.Image(a.b,"j2slib/images/warning.png"));
var c=new $wt.layout.GridData(32,32);
b.setLayoutData(c);
var d=new $wt.widgets.Label(a,0);
d.setText("Not implemented yet.");
var e=new $wt.widgets.Composite(a,0);
var f=new $wt.layout.GridData(3,2,false,false);
f.horizontalSpan=2;
e.setLayoutData(f);
e.setLayout(new $wt.layout.GridLayout());
var g=new $wt.widgets.Button(e,8);
g.setText("&OK");
g.setLayoutData(new $wt.layout.GridData(75,24));
g.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(a){
this.f$.a.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Dialog$2,i$,v$);
})(this,$_F("a",a)));
a.pack();
a.open();
var h=a.getSize();
var i=Math.floor((d$.body.clientHeight-h.y)/2)-20;
if(i<0){
i=0;
}a.setLocation(Math.floor((d$.body.clientWidth-h.x)/2),i);
$wt.internal.ResizeSystem.register(a,16777216);
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
function(a){
this.construct(a,65570);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.MessageBox,[a,$wt.widgets.MessageBox.checkStyle(b)]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(a){
if((a&(229376))==0)a|=65536;
var b=(4064);
var c=a&b;
if(c==32||c==256||c==(288))return a;
if(c==64||c==128||c==(192)||c==(448))return a;
if(c==(1280)||c==(3584))return a;
a=(a&~b)|32;
return a;
},"~N");
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.returnCode=-1;
this.dialogShell=new $wt.widgets.Shell(this.parent.b,this.style|64|2048);
this.dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(a){
this.b$["$wt.widgets.MessageBox"].updateReturnCode();
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$1,i$,v$);
})(this,null));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var a=null;
if((this.style&1)!=0){
a="error";
}else if((this.style&2)!=0){
a="information";
}else if((this.style&4)!=0){
a="question";
}else if((this.style&8)!=0){
a="warning";
}else if((this.style&16)!=0){
a="information";
}if(a!=null){
var b=new $wt.widgets.Composite(this.dialogShell,0);
b.setLayout(new $wt.layout.GridLayout());
var c=new $wt.layout.GridData(48,48);
b.setLayoutData(c);
var d=new $wt.widgets.Label(b,0);
d.setImage(new $wt.graphics.Image(this.dialogShell.b,"j2slib/images/"+a+".png"));
var e=new $wt.layout.GridData(32,32);
d.setLayoutData(e);
}var b=new $wt.widgets.Composite(this.dialogShell,0);
b.setLayout(new $wt.layout.GridLayout(2,false));
var c=new $wt.layout.GridData(1812);
if(a==null){
c.horizontalSpan=2;
}c.grabExcessVerticalSpace=true;
c.heightHint=48;
var d=new $wt.layout.GridData(4);
var e=$wt.internal.browser.OS.getStringPlainWidth(this.message);
if(e>480){
d.widthHint=480;
var f=$wt.internal.browser.OS.getStringPlainWrappedHeight(this.message,d.widthHint);
if(f>48){
c.heightHint=f;
}}else if(e<64){
d.widthHint=64;
}else{
d.widthHint=e;
}b.setLayoutData(c);
var f=new $wt.widgets.Label(b,64);
f.setText(this.message);
f.setLayoutData(d);
var g=new $wt.layout.GridData();
g.grabExcessVerticalSpace=true;
new $wt.widgets.Label(b,0).setLayoutData(g);
this.buttonPanel=new $wt.widgets.Composite(this.dialogShell,0);
var h=0;
h+=this.createButton(64,"&Yes")==null?0:1;
h+=this.createButton(128,"&No")==null?0:1;
h+=this.createButton(1024,"&Retry")==null?0:1;
h+=this.createButton(512,"&Abort")==null?0:1;
h+=this.createButton(2048,"&Ignore")==null?0:1;
h+=this.createButton(32,"&OK")==null?0:1;
h+=this.createButton(256,"&Cancel")==null?0:1;
if(h==0){
this.createButton(32,"&OK",true);
h=1;
}var i=new $wt.layout.GridData(2,2,false,false);
i.horizontalSpan=2;
this.buttonPanel.setLayoutData(i);
this.buttonPanel.setLayout(new $wt.layout.GridLayout(h,true));
this.dialogShell.pack();
this.dialogShell.open();
var j=this.dialogShell.getSize();
var k=Math.floor((d$.body.clientHeight-j.y)/2)-20;
if(k<0){
k=0;
}this.dialogShell.setLocation(Math.floor((d$.body.clientWidth-j.x)/2),k);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
return 256;
});
$_M(c$,"createButton",
function(a,b){
return this.createButton(a,b,false);
},"~N,~S");
$_M(c$,"createButton",
function(a,b,c){
if((this.style&a)!=0||c){
this.btn=new $wt.widgets.Button(this.buttonPanel,8);
this.btn.setText(b);
var d=new $wt.layout.GridData(75,24);
this.btn.setLayoutData(d);
this.btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.MessageBox$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"MessageBox$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(a){
this.b$["$wt.widgets.MessageBox"].returnCode=this.f$.a;
this.b$["$wt.widgets.MessageBox"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.MessageBox$2,i$,v$);
})(this,$_F("a",a)));
return this.btn;
}else{
return null;
}},"~N,~S,~B");
$_M(c$,"setMessage",
function(a){
if(a==null)this.error(4);
this.message=a;
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
function(a){
this.construct(a,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.ColorDialog,[a,b]);
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
function(a){
this.rgb=a;
},"$wt.graphics.RGB");
c$=$_C(function(){
this.message="";
this.filterPath="";
this.directoryPath=null;
$_Z(this,arguments);
},$wt.widgets,"DirectoryDialog",$wt.widgets.Dialog);
$_K(c$,
function(a){
this.construct(a,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.DirectoryDialog,[a,b]);
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
function(a){
this.filterPath=a;
},"~S");
$_M(c$,"setMessage",
function(a){
if(a==null)this.error(4);
this.message=a;
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
function(a){
this.construct(a,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.FileDialog,[a,b]);
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
function(a){
this.fileName=a;
},"~S");
$_M(c$,"setFilterExtensions",
function(a){
this.filterExtensions=a;
},"~A");
$_M(c$,"setFilterNames",
function(a){
this.filterNames=a;
},"~A");
$_M(c$,"setFilterPath",
function(a){
this.filterPath=a;
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
function(a){
this.construct(a,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(a,b){
$_R(this,$wt.widgets.FontDialog,[a,b]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getFontData",
function(){
return this.fontData;
});
$_M(c$,"getFontList",
function(){
if(this.fontData==null)return null;
var a=new Array(1);
a[0]=this.fontData;
return a;
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
function(a){
this.fontData=a;
},"$wt.graphics.FontData");
$_M(c$,"setFontList",
function(a){
if(a!=null&&a.length>0){
this.fontData=a[0];
}else{
this.fontData=null;
}},"~A");
$_M(c$,"setRGB",
function(a){
this.rgb=a;
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
function(a){
if(a.length==0)return null;
if((a.charAt(0)).charCodeAt(0)!=('.').charCodeAt(0))a="."+a;
a=a.toLowerCase();
var b=new $wt.program.Program();
if(".js".equalsIgnoreCase(a)){
b.name="Java2Script Pacemaker";
b.command="$wt.program.Program.loadJavaScript(\"%1\")";
b.iconName="images/z-logo.gif";
}else{
b.name="Embeded Browser";
b.command="window.open(\"%1\")";
b.iconName="images/browser.gif";
}return b;
},"~S");
c$.getExtensions=$_M(c$,"getExtensions",
function(){
return[".js",".html",".htm",".xhtml","xml",".png",".gif",".jpg",".jpeg"];
});
c$.getPrograms=$_M(c$,"getPrograms",
function(){
var a=new $wt.program.Program();
a.name="Java2Script Pacemaker";
a.command="$wt.program.Program.loadJavaScript(\"%1\")";
a.iconName="images/z-logo.gif";
var b=new $wt.program.Program();
b.name="Embeded Browser";
b.command="window.open(\"%1\")";
b.iconName="images/browser.gif";
return[a,b];
});
c$.loadJavaScript=$_M(c$,"loadJavaScript",
function(a){
var b=document.createElement("SCRIPT");
b.src=a;
document.body.appendChild(b);
},"~S");
c$.launch=$_M(c$,"launch",
function(a){
if(a.endsWith(".js")){
$wt.program.Program.findProgram(".js").execute(a);
}else{
$wt.program.Program.findProgram(a).execute(a);
}return true;
},"~S");
$_M(c$,"execute",
function(a){
var b=true;
var c=this.command;
var d="";
var e=this.command.indexOf("%1");
if(e!=-1){
var f=0;
var g=e+2;
var h=this.command.length;
while(g<h){
if((this.command.charAt(g)).charCodeAt(0)==('"').charCodeAt(0))f++;
g++;
}
b=f%2==0;
c=this.command.substring(0,e);
d=this.command.substring(e+2,h);
}if(!a.startsWith("/")&&!a.startsWith("\\")&&(a.charAt(1)).charCodeAt(0)==(':').charCodeAt(0)){
a="file:///"+a;
}if(b)a="\"" + a + "\"";
try{
eval((c+a+d).replace(/\\/g,"\\\\"));
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
function(a){
if(this==a)return true;
if($_O(a,$wt.program.Program)){
var b=a;
return this.name.equals(b.name)&&this.command.equals(b.command)&&this.iconName.equals(b.iconName);
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
function(a){
this.event=a;
this.wrapEvent(a);
},"Object");
$_M(c$,"wrapEvent",
function(a){
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
function(a){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(a){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(a){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(a){
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"isDraggable",
function(a){
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
function(a,b,c,d){
this.event=a;
this.sourceElement=b;
this.startX=c;
this.startY=d;
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
function(a,b){
this.currentX=a;
this.currentY=b;
},"~N,~N");
$_V(c$,"toString",
function(){
return"DragEvent {"+this.sourceElement+"#"+"("+this.startX+","+this.startY+")->"+"("+this.currentX+","+this.currentY+")}";
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal.dnd,"DNDUtils");
c$.bindFunctionWith=$_M(c$,"bindFunctionWith",
function(a,b){
return b;
},"Object,Object");
c$.onselectstart=$_M(c$,"onselectstart",
function(a){
var b=new $wt.internal.dnd.HTMLEventWrapper(a);
b.preventDefault();
b.stopPropagation();
return false;
},"Object");
c$.onmousemove=$_M(c$,"onmousemove",
function(a,b){
var c=new $wt.internal.dnd.HTMLEventWrapper(a);
if(!c.leftButtonHold){
if(b.status!=0){
var d=new $wt.internal.dnd.DragEvent(c,b.element,b.startX,b.startY);
d.mouseMoveTo(c.x,c.y);
b.notifyDragEnded(d);
b.status=0;
}b.reset();
return false;
}var d=new $wt.internal.dnd.DragEvent(c,b.element,b.startX,b.startY);
if(b.status==0){
b.status=1;
b.startX=c.x;
b.startY=c.y;
d.mouseMoveTo(c.x,c.y);
b.notifyDragBegan(d);
}d.mouseMoveTo(c.x,c.y);
b.notifyDragging(d);
return true;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onmousedown=$_M(c$,"onmousedown",
function(a,b){
var c=new $wt.internal.dnd.HTMLEventWrapper(a);
if(!b.checkDraggable(c)){
return true;
}d$.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
c.target.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
d$.onmousemove=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousemove,b);
d$.onkeyup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onkeyup,b);
d$.onmouseup=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmouseup,b);
c.preventDefault();
c.stopPropagation();
return false;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onkeyup=$_M(c$,"onkeyup",
function(a,b){
var c=new $wt.internal.dnd.HTMLEventWrapper(a);
if((c.event).keyCode==27){
if(b.status!=0){
var d=new $wt.internal.dnd.DragEvent(c,b.element,b.startX,b.startY);
d.mouseMoveTo(c.x,c.y);
b.notifyDragCanceled(d);
b.status=0;
}b.reset();
return false;
}return true;
},"Object,$wt.internal.dnd.DragAndDrop");
c$.onmouseup=$_M(c$,"onmouseup",
function(a,b){
if(b.status!=0){
var c=new $wt.internal.dnd.HTMLEventWrapper(a);
var d=new $wt.internal.dnd.DragEvent(c,b.element,b.startX,b.startY);
d.mouseMoveTo(c.x,c.y);
b.notifyDragEnded(d);
b.status=0;
}b.reset();
var c=new $wt.internal.dnd.HTMLEventWrapper(a);
c.preventDefault();
c.stopPropagation();
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
function(a){
this.element=a;
a.onmousedown=$wt.internal.dnd.DNDUtils.bindFunctionWith($wt.internal.dnd.DNDUtils.$onmousedown,this);
},"$wt.internal.xhtml.Element");
$_M(c$,"checkDraggable",
function(a){
for(var b=0;b<this.listeners.length;b++){
if(!this.listeners[b].isDraggable(a)){
return false;
}}
return true;
},"$wt.internal.dnd.HTMLEventWrapper");
$_M(c$,"notifyDragBegan",
function(a){
for(var b=0;b<this.listeners.length;b++){
if(!this.listeners[b].dragBegan(a)){
return false;
}}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragging",
function(a){
for(var b=0;b<this.listeners.length;b++){
this.listeners[b].dragging(a);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragEnded",
function(a){
for(var b=0;b<this.listeners.length;b++){
this.listeners[b].dragEnded(a);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"notifyDragCanceled",
function(a){
for(var b=0;b<this.listeners.length;b++){
this.listeners[b].dragCanceled(a);
}
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"addDragListener",
function(a){
for(var b=0;b<this.listeners.length;b++){
if(this.listeners[b]==a){
return;
}}
this.listeners[this.listeners.length]=a;
},"$wt.internal.dnd.DragListener");
$_M(c$,"removeDragListener",
function(a){
for(var b=0;b<this.listeners.length;b++){
if(this.listeners[b]==a){
for(var c=b+1;c<this.listeners.length;c++){
this.listeners[c-1]=this.listeners[c];
}
var d=this.listeners;
this.listeners=new Array(d.length-1);
for(var e=0;e<d.length-1;e++){
this.listeners[e]=d[e];
}
return a;
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
function(a){
var b=a.target.className;
if(b!=null){
if(b.indexOf("shell")==0&&(b.indexOf("top")!=-1||b.indexOf("middle")!=-1||b.indexOf("bottom")!=-1)){
this.resize=b.substring(6);
return true;
}else if(b.indexOf("shell-title-text")!=-1){
return true;
}}return false;
},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"dragBegan",
function(a){
var b=false;
if(this.frame==null){
this.frame=d$.createElement("DIV");
this.frame.className="shell-handle";
this.frame.style.backgroundColor="transparent";
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.zIndex=""+(Integer.parseInt(w$.currentTopZIndex)+100);
d$.body.appendChild(this.frame);
var c=false;
var d=a.sourceElement.getElementsByTagName("DIV");
for(var e=0;e<d.length;e++){
if(d[e].className.indexOf("shell-title-bar")!=-1){
c=true;
break;
}}
if(c){
var f=d$.createElement("DIV");
f.className="shell-title-bar opacity";
f.style.paddingTop="4px";
this.frame.appendChild(f);
}b=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}this.sourceX=Integer.parseInt(a.sourceElement.style.left);
this.sourceY=Integer.parseInt(a.sourceElement.style.top);
this.sourceWidth=Integer.parseInt(a.sourceElement.style.width);
this.sourceHeight=Integer.parseInt(a.sourceElement.style.height);
a.startX=a.currentX;
a.startY=a.currentY;
if(b){
this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
}var c=d$.getElementsByTagName("IFRAME");
if(c.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(a){
if(this.resize!=null){
var b=this.sourceX;
var c=this.sourceY;
var d=this.sourceWidth;
var e=this.sourceHeight;
if(this.resize=="left-top"){
b+=a.deltaX();
c+=a.deltaY();
d-=a.deltaX();
e-=a.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize=="center-top"){
c+=a.deltaY();
e-=a.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize=="right-top"){
c+=a.deltaY();
d+=a.deltaX();
e-=a.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize=="left-middle"){
b+=a.deltaX();
d-=a.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize=="right-middle"){
d+=a.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize=="left-bottom"){
b+=a.deltaX();
d-=a.deltaX();
e+=a.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize=="center-bottom"){
e+=a.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize=="right-bottom"){
d+=a.deltaX();
e+=a.deltaY();
d$.body.style.cursor="se-resize";
}this.frame.style.left=b+"px";
this.frame.style.top=c+"px";
this.frame.style.width=((d>16)?d:16)+"px";
this.frame.style.height=((e>16)?e:16)+"px";
return true;
}var b=this.sourceX+a.deltaX();
var c=this.sourceY+a.deltaY();
var d=d$.body.clientHeight;
var e=d$.body.clientWidth;
var f=Integer.parseInt(a.sourceElement.style.width);
if(b<-f){
b=-f;
}else if(b>e-2){
b=e-2;
}if(c<0){
c=0;
}else if(c>d+18){
c=d+18;
}if(!(a.event.event).ctrlKey){
if(Math.abs(b-e+f)<10){
b=e-f;
}else if(Math.abs(b)<10){
b=0;
}var g=Integer.parseInt(a.sourceElement.style.height);
if(Math.abs(c-d+g+2)<10){
c=d-g-2;
}else if(Math.abs(c-(-1))<10){
c=-1;
}}this.frame.style.left=b+"px";
this.frame.style.top=c+"px";
if(d$.body.scrollLeft!=0){
d$.body.scrollLeft=0;
}if(d$.body.scrollTop!=0){
d$.body.scrollTop=0;
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(a){
var b=Integer.parseInt(this.frame.style.left);
var c=Integer.parseInt(this.frame.style.top);
var d=Integer.parseInt(this.frame.style.width);
var e=Integer.parseInt(this.frame.style.height);
var f=a.sourceElement;
f.style.zIndex=w$.currentTopZIndex=""+(Integer.parseInt(w$.currentTopZIndex)+2);
this.updateShellBounds(b,c,d,e);
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
function(a,b,c,d){
return true;
},"~N,~N,~N,~N");
$_V(c$,"dragCanceled",
function(a){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
c$.fixShellHeight=$_M(c$,"fixShellHeight",
function(a){
var b=Integer.parseInt((a).style.height);
var c=(a).getElementsByTagName("DIV");
for(var d=0;d<c.length;d++){
var e=c[d];
if(e.className!=null){
if(e.className.indexOf("middle")!=-1){
if(b-40>=0){
e.style.height=(b-40)+"px";
}else{
e.style.height="0px";
}}else if(e.className.indexOf("shell-content")!=-1){
e.style.height=((b-30>=0)?b-30:0)+"px";
}}}
},"Object");
c$.fixShellWidth=$_M(c$,"fixShellWidth",
function(a){
var b=true;
var c=Integer.parseInt((a).style.width)-6;
var d=(a).getElementsByTagName("DIV");
for(var e=0;e<d.length;e++){
var f=d[e];
var g=f.className;
if(g!=null){
if(g.indexOf("shell-center-")!=-1){
if(b){
f.style.width=(c-46)+"px";
}}else if(g.indexOf("shell-content")!=-1){
f.style.width=c+"px";
}else if(g.indexOf("shell-title-bar")!=-1){
f.style.width=c+"px";
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
function(a){
this.thumb=d$.createElement("DIV");
var b=a.sourceElement.className;
this.thumb.className=b;
if(b!=null&&b.indexOf("sash-mouse-down")==-1){
this.thumb.className+=" sash-mouse-down";
}if(b.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.thumb.style.left=a.sourceElement.style.left;
this.thumb.style.top=a.sourceElement.style.top;
this.thumb.style.width=a.sourceElement.style.width;
this.thumb.style.height=a.sourceElement.style.height;
this.thumb.onselectstart=$wt.internal.dnd.DNDUtils.$onselectstart;
if(a.sourceElement.nextSibling!=null){
a.sourceElement.parentNode.insertBefore(this.thumb,a.sourceElement.nextSibling);
}else{
a.sourceElement.parentNode.appendChild(this.thumb);
}this.sourceX=Integer.parseInt(a.sourceElement.style.left);
this.sourceY=Integer.parseInt(a.sourceElement.style.top);
a.startX=a.currentX;
a.startY=a.currentY;
var c=d$.getElementsByTagName("IFRAME");
if(c.length!=0){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(a){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(a){
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
function(a){
var b=this.sourceX+a.deltaX();
var c=this.sourceY+a.deltaY();
var d=Integer.parseInt(a.sourceElement.parentNode.style.height);
var e=Integer.parseInt(a.sourceElement.parentNode.style.width);
var f=Integer.parseInt(a.sourceElement.style.width);
var g=Integer.parseInt(a.sourceElement.style.height);
if(b<0){
b=0;
}else if(b>e-f-2){
b=e-f-2;
}if(c<0){
c=0;
}else if(c>d-g-2){
c=d-g-2;
}return new $wt.graphics.Point(b,c);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(a){
if(this.isHorizontal){
d$.body.style.cursor="e-resize";
this.thumb.style.cursor="e-resize";
}else{
d$.body.style.cursor="s-resize";
this.thumb.style.cursor="s-resize";
}if(this.isHorizontal){
this.thumb.style.left=this.currentLocation(a).x+"px";
}else{
this.thumb.style.top=this.currentLocation(a).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"ScaleDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(a){
var b=a.sourceElement.className;
if(b.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.sourceX=Integer.parseInt(a.sourceElement.style.left);
this.sourceY=Integer.parseInt(a.sourceElement.style.top);
a.startX=a.currentX;
a.startY=a.currentY;
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragCanceled",
function(a){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragEnded",
function(a){
d$.body.style.cursor="auto";
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"currentLocation",
function(a){
var b=this.sourceX+a.deltaX();
var c=this.sourceY+a.deltaY();
var d=Integer.parseInt(a.sourceElement.parentNode.style.height);
var e=Integer.parseInt(a.sourceElement.parentNode.style.width);
var f=Integer.parseInt(a.sourceElement.style.width);
var g=Integer.parseInt(a.sourceElement.style.height);
if(this.isHorizontal){
f=10;
g=18;
}else{
f=18;
g=10;
}if(b<0){
b=0;
}else if(b>e-f-2){
b=e-f-2;
}if(c<0){
c=0;
}else if(c>d-g-2){
c=d-g-2;
}return new $wt.graphics.Point(b,c);
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(a){
if(this.isHorizontal){
a.sourceElement.style.left=this.currentLocation(a).x+"px";
}else{
a.sourceElement.style.top=this.currentLocation(a).y+"px";
}return true;
},"$wt.internal.dnd.DragEvent");
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.isHorizontal=false;
$_Z(this,arguments);
},$wt.internal.dnd,"SliderDND",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragBegan",
function(a){
var b=a.sourceElement.className;
if(b.indexOf("horizontal")!=-1){
this.isHorizontal=true;
}else{
this.isHorizontal=false;
}this.sourceX=Integer.parseInt(a.sourceElement.style.left);
this.sourceY=Integer.parseInt(a.sourceElement.style.top);
a.startX=a.currentX;
a.startY=a.currentY;
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
function(a,b){
this.shell=a;
this.status=b;
},"$wt.widgets.Decorations,~N");
$_M(c$,"updateMinimized",
function(){
this.shell.setLocation(-1,d$.body.clientHeight-26);
});
$_M(c$,"updateMaximized",
function(){
var a=d$.body.clientHeight-0;
if(a>w$.screen.availHeight-10){
a=w$.screen.availHeight-10;
}var b=d$.body.clientWidth;
if(b>w$.screen.availWidth){
b=w$.screen.availWidth;
}this.shell.setBounds(this.shell.computeTrim(0,0,b+2,a-18));
d$.body.scrollTop=0;
});
$_M(c$,"updateCentered",
function(){
var a=this.shell.getSize();
var b=Math.floor((d$.body.clientHeight-a.y)/2)-20;
if(b<0){
b=0;
}this.shell.setLocation(Math.floor((d$.body.clientWidth-a.x)/2),b);
});
$_M(c$,"getStatus",
function(){
return this.status;
});
c$=$_C(function(){
$_Z(this,arguments);
},$wt.internal,"ResizeSystem");
c$.register=$_M(c$,"register",
function(a,b){
for(var c=0;c<$wt.internal.ResizeSystem.handlers.length;c++){
if($wt.internal.ResizeSystem.handlers[c]!=null&&$wt.internal.ResizeSystem.handlers[c].shell==a){
return;
}}
for(var d=0;d<$wt.internal.ResizeSystem.handlers.length;d++){
if($wt.internal.ResizeSystem.handlers[d]==null){
$wt.internal.ResizeSystem.handlers[d]=new $wt.internal.ResizeHandler(a,b);
return;
}}
$wt.internal.ResizeSystem.handlers[$wt.internal.ResizeSystem.handlers.length]=new $wt.internal.ResizeHandler(a,b);
return;
},"$wt.widgets.Decorations,~N");
c$.unregister=$_M(c$,"unregister",
function(a){
for(var b=0;b<$wt.internal.ResizeSystem.handlers.length;b++){
if($wt.internal.ResizeSystem.handlers[b]!=null&&$wt.internal.ResizeSystem.handlers[b].shell==a){
$wt.internal.ResizeSystem.handlers[b]=null;
return;
}}
},"$wt.widgets.Decorations");
c$.updateResize=$_M(c$,"updateResize",
function(){
for(var a=0;a<$wt.internal.ResizeSystem.handlers.length;a++){
var b=$wt.internal.ResizeSystem.handlers[a];
if(b!=null){
var c=b.getStatus();
if(c==1024){
b.updateMaximized();
}else if(c==128){
b.updateMinimized();
}else if(c==16777216){
b.updateCentered();
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
var $runnable = this.$finals.runnable;
var $oThis = this.$finals.oThis;
window.setTimeout (function () {
$runnable.apply ($oThis);
}, 0);
//this.$finals.runnable.apply (this.$finals.oThis);
}, "$wt.events.DisposeEvent");
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (Sync2Async$1, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", runnable, "oThis", oThis)));
shell.getDisplay ().readAndDispatch ();
};