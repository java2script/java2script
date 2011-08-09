/* http://j2s.sf.net/ */$_L(["$wt.widgets.Item"],"$wt.widgets.TrayItem",["$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.id=0;
this.toolTipText=null;
this.visible=true;
this.$handle=null;
$_Z(this,arguments);
},$wt.widgets,"TrayItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TrayItem,[parent,style]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
this.createWidget();
},"$wt.widgets.Tray,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addMenuDetectListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(35,typedListener);
},"$wt.events.MenuDetectListener");
$_M(c$,"createWidget",
function(){
this.$handle=this.parent.addTrayItem();
this.$handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$1")){
$_H();
c$=$_W($wt.widgets,"TrayItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TrayItem"].postEvent(13);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(null);
}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$1,i$,v$);
})(this,null));
this.$handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$2")){
$_H();
c$=$_W($wt.widgets,"TrayItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var ev=new $wt.widgets.Event();
ev.type=35;
ev.widget=this.b$["$wt.widgets.TrayItem"];
ev.display=this.b$["$wt.widgets.TrayItem"].display;
ev.time=this.b$["$wt.widgets.TrayItem"].display.getLastEventTime();
var evt=this.getEvent();
if(evt!=null){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
ev.x=evtHTML.x;
ev.y=evtHTML.y;
this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
evtHTML.preventDefault();
this.toReturn(false);
return;
}this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
this.toReturn(false);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(null);
}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$2,i$,v$);
})(this,null));
if(O$.isOpera){
this.$handle.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$3")){
$_H();
c$=$_W($wt.widgets,"TrayItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
if(evt!=null&&(evt).ctrlKey){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
var ev=new $wt.widgets.Event();
ev.type=35;
ev.widget=this.b$["$wt.widgets.TrayItem"];
ev.display=this.b$["$wt.widgets.TrayItem"].display;
ev.time=this.b$["$wt.widgets.TrayItem"].display.getLastEventTime();
ev.x=evtHTML.x;
ev.y=evtHTML.y;
this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
evtHTML.preventDefault();
this.toReturn(false);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(null);
}}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$3,i$,v$);
})(this,null));
}});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
return this.visible;
});
$_M(c$,"recreate",
function(){
this.createWidget();
if(!this.visible)this.setVisible(false);
if(this.text.length!=0)this.setText(this.text);
if(this.image!=null)this.setImage(this.image);
if(this.toolTipText!=null)this.setToolTipText(this.toolTipText);
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TrayItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TrayItem,"releaseWidget",[]);
this.toolTipText=null;
if(this.$handle!=null){
this.parent.removeTrayItem(this.$handle);
O$.destroyHandle(this.$handle);
this.$handle=null;
}});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeMenuDetectListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(35,listener);
},"$wt.events.MenuDetectListener");
$_M(c$,"setImage",
function(image){
$_U(this,$wt.widgets.TrayItem,"setImage",[image]);
if(image==null){
this.$handle.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.$handle.style.filter!=null){
this.$handle.style.filter="";
}}else{
var handleStyle=this.$handle.style;
if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}},"$wt.graphics.Image");
$_M(c$,"setToolTipText",
function(value){
this.toolTipText=value;
this.$handle.title=value;
},"~S");
$_M(c$,"setVisible",
function(visible){
if(this.visible==visible)return;
if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}this.visible=visible;
if(!visible)this.sendEvent(23);
},"~B");
});
$_L(["$wt.widgets.Widget","$.TrayItem"],"$wt.widgets.Tray",["$wt.internal.browser.OS","$wt.widgets.Display"],function(){
$WTC$$.registerCSS ("$wt.widgets.Tray", ".tray-cell {\nposition: absolute;\nwidth: 0;\nheight: 0;\nfont-size: 0;\nborder-style: solid;\nborder-width: 0;\nborder-top-width: 36px;\nborder-right-width: 36px;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.tray-item {\nposition: absolute;\nwidth: 16px;\nheight: 16px;\nfont-size: 0;\ncursor: default;\nbackground-repeat: no-repeat;\nbackground-position: center center;\n}\n.tray-item-console {\nbackground-position:bottom left !important;\nbackground-image:url(\'images/shell-packed.gif\');\n}\n.tray-minimized {\nleft: 0;\ntop: 0;\nborder-top-width: 16px;\nborder-right-width: 16px;\n}\n.tray-logo-item {\nposition: absolute;\nleft: 0;\ntop: 0;\nwidth: 36px;\nheight: 36px;\ncursor: pointer;\n_cursor: hand;\nbackground-image: url(\'images/z-logo.png\');\nbackground-position: right bottom;\nbackground-repeat: no-repeat;\nopacity:0.85;\nfilter:Alpha(Opacity=85);\n}\n.tray-float-block {\nfloat: left;\nclear: both;\nfont-size: 0;\nheight: 18px;\n}\n.tray-cell-inner-wide-shadow {\nposition:absolute;\nwidth:48px;\nheight:48px;\nbackground-image: url(\'images/strip-inner-wide.png\');\nbackground-position: right bottom;\nbackground-repeat: no-repeat;\n}\n.tray-cell-inner-shadow {\nposition:absolute;\nwidth:36px;\nheight:36px;\nbackground-image: url(\'images/strip-inner.png\');\nbackground-position: right bottom;\nbackground-repeat: no-repeat;\n}\n.tray-cell-outer-wide-shadow {\nposition:absolute;\nwidth:60px;\nheight:60px;\nbackground-color:transparent;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAB7UlEQVR4nGNIS0tjGIT4CBAvBOIOIC4F4lQgDgdibyB2BGJzINYHYnUgVgRiaSAWA2JBIOYFYi4gZgdiViBmBmJGKGYYaI9hwzTzLAgPpMewYZp6FoQHymPYMM09C8ID4TFsmC6eBWF6ewwbpptnQZieHsOG6epZEKaXx7BhunsWhOnhMWx4QDwLwrT2GDY8YJ4FYVp6DBseUM+CMK08hg0PuGdBmBYew4YHhWdBmNoew4YHjWdBmJoew4YHlWdBmFoew4YHnWdBmBoew4YHpWdBmIEahqDhQetZEGaglkFQPKg9C8IMVDRs0HsWhKll0JDwLAhTw5Ah41kQptSAIeVZEKZE85DzLAiTq3FIehaEydE0ZD0LwqRqGNKeBWFSFA95z4IwsQqHhWdBmBhFw8azIExIwbDyLAjjkxx2ngVhXBLD0rMgjE1w2HoWhNEFhrVnQRiZM+w9C8IwxojwLAiDiBHjWRAGESPGsyAMIkaMZ0EYRIwYz4IwiBgxngVhEDFiPAvCIGLEeBaEQcSI8SwIg4gR41kQBhEjxrMgDCJGjGdBGESMGM+CMIgYMZ4FYRAxYjwLwiBixHgWhEHEiPEsCIOIEeNZEAYRI8azIAwiRoxnQRhEjBjPgjCIGDGeBWEQMWI8C8ID7gB6YwDBdJsCtiZfcAAAAABJRU5ErkJggg==);\nbackground-position: left top;\nbackground-repeat: no-repeat;\n}\n.tray-cell-outer-shadow {\nposition:absolute;\nwidth:36px;\nheight:36px;\nbackground-color:transparent;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA4UlEQVR4nGNIS0tjGEx4wB2AjgfcAWh460A7ABlvBeLpA+0IGAY7BogbB9ohIAx3DBDnDyrHAHHCoHIMEAcPKscAsfugcgwQ2w4qxwCxyaByDBDrDCrHALHqoHIMEMsNKscAseSgcgwQiwwqxwAx/6ByDBDzDCrHADHnoHIMELMNKscAMcugcgwQMw0qxwAx46ByTBoFDqKJY0BmDyrHpJHhIJo6Jo1EB9HcMWkkOIgujkkj0kF0c0waEQ6iq2PSCDiI7o5Jw+OgAXFMGg4HDZhj0rA4aEAdk4bmoAF3DAgDACxckICqNdGgAAAAAElFTkSuQmCC);\nbackground-position: left top;\nbackground-repeat: no-repeat;\n}\n.swt-widgets-tray {\nwidth:324px;\n}");

$WTC$$.registerCSS ("$wt.widgets.Tray.IE", "/* IE 7.0 + */\n*:first-child+html .tray-cell-outer-wide-shadow {\nbackground-image: url(\'images/strip-outer-wide.png\');\n}\n*:first-child+html .tray-cell-outer-shadow {\nbackground-image: url(\'images/strip-outer.png\');\n}\n/* IE 6.0 - */\n* html .tray-cell-outer-wide-shadow {\nbackground-image: none;\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/strip-outer-wide.png\', sizingMethod=\'image\');\n}\n* html .tray-cell-outer-shadow {\nbackground-image: none;\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/strip-outer.png\', sizingMethod=\'image\');\n}\n.swt-widgets-tray-ie {\nwidth:324px;\n}\n");
c$=$_C(function(){
this.itemCount=0;
this.items=null;
this.cellLines=0;
this.allCells=null;
this.allItems=null;
this.allFloats=null;
this.outerShadows=null;
this.supportShadow=false;
$_Z(this,arguments);
},$wt.widgets,"Tray",$wt.widgets.Widget);
$_Y(c$,function(){
this.items=new Array(4);
});
$_K(c$,
function(display,style){
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.display=display;
this.items=new Array(4);
this.cellLines=0;
this.allCells=new Array(0);
this.allItems=new Array(0);
this.allFloats=new Array(0);
this.initialize();
},"$wt.widgets.Display,~N");
c$.trayLineColor=$_M(c$,"trayLineColor",
function(line){
if(line<=2){
return"white";
}else{
var gray=line*32;
if(gray>288){
gray=288;
}return"rgb("+(gray-39)+","+(gray-35)+",254)";
}},"~N");
$_M(c$,"addTrayLine",
($fz=function(){
this.cellLines++;
var lineColor=$wt.widgets.Tray.trayLineColor(this.cellLines);
for(var i=0;i<this.cellLines;i++){
var cell=d$.createElement("DIV");
cell.className="tray-cell";
cell.style.left=((this.cellLines-1-i)*36)+"px";
cell.style.top=(i*36)+"px";
cell.style.borderColor=lineColor+" transparent transparent transparent";
if(O$.isIENeedPNGFix){
cell.style.borderRightColor="rgb(0,255,0)";
cell.style.filter="Chroma(Color=#00ff00);";
}cell.title="Doubleclick to set notification area auto-hide";
this.allCells[Math.floor(this.cellLines*(this.cellLines-1)/2)+i]=cell;
if(this.display.trayCorner!=null){
this.display.trayCorner.bindEvents(cell);
}d$.body.appendChild(cell);
}
for(var i=0;i<this.cellLines-1;i++){
var cell=this.allCells[Math.floor((this.cellLines-1)*(this.cellLines-2)/2)+i];
cell.style.borderRightColor=lineColor;
}
if(this.supportShadow){
if(this.cellLines%2==0&&this.outerShadows.length<this.cellLines+1){
var cell=d$.createElement("DIV");
cell.className="tray-cell-outer-shadow";
cell.style.top=(this.cellLines-1)*36+"px";
this.outerShadows[this.outerShadows.length]=cell;
d$.body.appendChild(cell);
cell=d$.createElement("DIV");
cell.className="tray-cell-outer-wide-shadow";
cell.style.top=(this.cellLines*36)+"px";
this.outerShadows[this.outerShadows.length]=cell;
d$.body.appendChild(cell);
}for(var i=0;i<this.outerShadows.length;i++){
var cell=this.outerShadows[i];
cell.style.left=((this.cellLines-i-1)*36-1)+"px";
}
}var supportNotificationCornerFloat=false;
{
supportNotificationCornerFloat=window["swt.notification.corner.float"];
}if(!supportNotificationCornerFloat){
return;
}var floatDiv1=d$.createElement("DIV");
floatDiv1.className="tray-float-block";
var floatDiv2=d$.createElement("DIV");
floatDiv2.className="tray-float-block";
floatDiv1.style.width=this.cellLines*36+"px";
floatDiv2.style.width=(this.cellLines*36-18)+"px";
this.allFloats[this.cellLines*2-2]=floatDiv2;
this.allFloats[this.cellLines*2-1]=floatDiv1;
d$.body.insertBefore(floatDiv2,d$.body.childNodes[0]);
d$.body.insertBefore(floatDiv1,d$.body.childNodes[0]);
},$fz.isPrivate=true,$fz));
$_M(c$,"removeTrayLine",
($fz=function(){
if(this.cellLines<=3){
return;
}for(var i=this.cellLines-1;i>=0;i--){
var index=Math.floor(this.cellLines*(this.cellLines-1)/2)+i;
var cell=this.allCells[index];
cell.onclick=null;
cell.onmouseover=null;
cell.ondblclick=null;
this.allCells[index]=null;
d$.body.removeChild(cell);
}
this.cellLines--;
for(var i=0;i<this.cellLines;i++){
var cell=this.allCells[Math.floor(this.cellLines*(this.cellLines-1)/2)+i];
cell.style.borderRightColor="transparent";
if(O$.isIENeedPNGFix){
cell.style.borderRightColor="rgb(0,255,0)";
cell.style.filter="Chroma(Color=#00ff00);";
}}
if(this.supportShadow){
for(var i=0;i<this.outerShadows.length;i++){
var cell=this.outerShadows[i];
cell.style.left=((this.cellLines-i-1)*36-1)+"px";
}
}var supportNotificationCornerFloat=false;
{
supportNotificationCornerFloat=window["swt.notification.corner.float"];
}if(!supportNotificationCornerFloat){
return;
}d$.body.removeChild(this.allFloats[this.cellLines*2+1]);
this.allFloats[this.cellLines*2+1]=null;
d$.body.removeChild(this.allFloats[this.cellLines*2]);
this.allFloats[this.cellLines*2]=null;
},$fz.isPrivate=true,$fz));
$_M(c$,"initialize",
function(){
{
this.supportShadow=window["swt.disable.shadow"]!=true;
}if(this.supportShadow){
this.outerShadows=new Array(0);
var cell=d$.createElement("DIV");
cell.className="tray-cell-outer-wide-shadow";
cell.style.top="0px";
this.outerShadows[this.outerShadows.length]=cell;
d$.body.appendChild(cell);
}this.addTrayLine();
this.addTrayLine();
this.addTrayLine();
});
$_M(c$,"addTrayItem",
function(){
if(this.allItems.length+6-Math.floor(this.cellLines*(this.cellLines+1)/2)>this.cellLines){
this.addTrayLine();
}var item=d$.createElement("DIV");
item.className="tray-item";
this.allItems[this.allItems.length]=item;
this.orderTrayItem(item,this.allItems.length-1);
var el=this.allCells[0];
if(el.style.zIndex!=null&&"" + el.style.zIndex !== ""){
item.style.zIndex=el.style.zIndex;
}d$.body.appendChild(item);
if(this.display.trayCorner!=null){
this.display.trayCorner.setMinimized(false);
this.display.trayCorner.updateLastModified();
}return item;
});
$_M(c$,"orderTrayItem",
function(item,order){
var index=-1;
var currentLine=-1;
for(var i=this.cellLines;i>=2;i--){
if(order+6>=Math.floor(i*(i+1)/2)){
index=order+6-Math.floor(i*(i+1)/2);
currentLine=i;
break;
}}
var offset=0;
if(currentLine%2==0){
offset=-12;
}if(index%2==0){
offset+=(index+1)*(10+currentLine-3);
}else{
offset+=-index*(10+currentLine-3);
}if(currentLine%2==0){
offset*=-1;
}item.style.left=((currentLine-3)*18+37+offset+"px");
item.style.top=((currentLine-3)*18+37-offset)+"px";
},"$wt.internal.xhtml.Element,~N");
$_M(c$,"removeTrayItem",
function(item){
for(var i=this.allItems.length-1;i>=0;i--){
if(this.allItems[i]===item){
d$.body.removeChild(item);
for(var j=i;j<this.allItems.length-1;j++){
this.allItems[j]=this.allItems[j+1];
this.orderTrayItem(this.allItems[j],j);
}
this.allItems[this.allItems.length-1]=null;
{
this.allItems.length--;
}if(this.allItems.length+6<=Math.floor(this.cellLines*(this.cellLines+1)/2)){
this.removeTrayLine();
}break;
}}
if(this.display.trayCorner!=null){
this.display.trayCorner.setMinimized(false);
this.display.trayCorner.updateLastModified();
}},"$wt.internal.xhtml.Element");
$_M(c$,"createItem",
function(item,index){
if(this.itemCount==this.items.length){
var newItems=new Array(this.items.length+4);
System.arraycopy(this.items,0,newItems,0,this.items.length);
this.items=newItems;
}System.arraycopy(this.items,index,this.items,index+1,this.itemCount++ -index);
this.items[index]=item;
},"$wt.widgets.TrayItem,~N");
$_M(c$,"destroyItem",
function(item){
var index=0;
while(index<this.itemCount){
if(this.items[index]===item)break;
index++;
}
if(index==this.itemCount)return;
System.arraycopy(this.items,index+1,this.items,index,--this.itemCount-index);
this.items[this.itemCount]=null;
},"$wt.widgets.TrayItem");
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.itemCount;
});
$_M(c$,"getItems",
function(){
var result=new Array(this.itemCount);
System.arraycopy(this.items,0,result,0,result.length);
return result;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Tray,"releaseChild",[]);
if(this.display.tray===this)this.display.tray=null;
});
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseResources();
}}
this.items=null;
this.destroyItems(this.allCells);
this.allCells=null;
this.destroyItems(this.allItems);
this.allItems=null;
this.destroyItems(this.allFloats);
this.allFloats=null;
this.destroyItems(this.outerShadows);
this.outerShadows=null;
$_U(this,$wt.widgets.Tray,"releaseWidget",[]);
});
$_M(c$,"destroyItems",
($fz=function(els){
if(els==null)return;
for(var i=0;i<els.length;i++){
var item=els[i];
if(item!=null){
O$.destroyHandle(item);
els[i]=null;
}}
},$fz.isPrivate=true,$fz),"~A");
});
