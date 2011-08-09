$_L(["$wt.widgets.Composite"],"$wt.widgets.TabFolder",["java.lang.Character","$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.TabFolder", ".tab-folder-default {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nposition:absolute;\noverflow:hidden;\n}\n.tab-folder-border-default {\nborder:2px inset #ccc;\n}\n.tab-folder-border {\nposition:absolute;\nwidth:50%;\nheight:50%;\nborder-width:2px;\nborder-color:white;\nz-index:100;\n}\n.tab-folder-border-nw {\ntop:7px;\nborder-style:outset none none outset;\nborder-left:1px solid white;\nborder-top:1px solid white;\nmargin-top:1.2em;\n}\nbody:nth-of-type(1) .tab-folder-border-nw {\ntop:8px;\n}\n* html .tab-folder-border-nw {\ntop:6px;\nmargin-top:1.3em;\n}\n.tab-folder-border-sw {\nbottom:0;\nborder-style:none none outset outset;\nborder-left:1px solid white;\n}\n.tab-folder-border-ne {\nright:0;\ntop:7px;\nborder-style:outset outset none none;\nborder-top:1px solid white;\nmargin-top:1.2em;\n}\nbody:nth-of-type(1) .tab-folder-border-ne {\ntop:8px;\n}\n* html .tab-folder-border-ne {\ntop:6px;\nmargin-top:1.3em;\n}\n.tab-folder-border-se {\nright:0;\nbottom:0;\nborder-style:none outset outset none;\n}\n* html .tab-folder-border-sw {\nbottom:1px;\n}\n* html .tab-folder-border-se {\nbottom:1px;\n}\n.tab-folder-bottom .tab-folder-border-nw {\ntop:0;\nmargin-top:0;\n}\n.tab-folder-bottom .tab-folder-border-sw {\nbottom:7px;\nmargin-bottom:1.2em;\nborder-bottom:1px outset #777;\n}\n* html .tab-folder-bottom .tab-folder-border-sw {\nbottom:6px;\nmargin-bottom:1.3em;\n}\n.tab-folder-bottom .tab-folder-border-ne {\nright:0;\ntop:0;\nmargin-top:0;\n}\n.tab-folder-bottom .tab-folder-border-se {\nbottom:7px;\nmargin-bottom:1.2em;\nborder-bottom:1px outset #777;\n}\n* html .tab-folder-bottom .tab-folder-border-se {\nbottom:6px;\nmargin-bottom:1.3em;\n}\n.tab-folder-no-tab .tab-folder-border-nw {\ntop:2px;\nmargin-top:0;\n}\n.tab-folder-no-tab .tab-folder-border-sw {\nbottom:2px;\nmargin-bottom:0;\n}\n.tab-folder-no-tab .tab-folder-border-ne {\nright:0;\ntop:2px;\nmargin-top:0;\n}\n.tab-folder-no-tab .tab-folder-border-se {\nbottom:2px;\nmargin-bottom:0;\n}\n* html .tab-folder-no-tab .tab-folder-border-nw {\ntop:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-sw {\nbottom:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-ne {\ntop:1px;\n}\n* html .tab-folder-no-tab .tab-folder-border-se {\nbottom:1px;\n}\n.tab-item-default {\nposition:absolute;\nmargin-top:2px;\npadding:2px 5px 2px 5px;\nmin-width:28px;\ncursor:default;\noverflow:visible;\nwhite-space:nowrap;\nborder-top:1px solid white;\nborder-left:1px solid white;\nborder-right:2px outset #777;\nbackground-color:buttonface;\nborder-bottom-style:none;\n}\n* html .tab-item-default {\npadding-top:1px;\n/*width:28px;*/\n}\n* html .tab-item-image {\n/*width:52px;*/\n/*width:68px;*/\n}\n.tab-item-selected {\nmargin-top:0;\npadding-left:7px;\npadding-right:7px;\npadding-bottom:4px;\n}\n.tab-item-default span {\nwhite-space:nowrap;\npadding-bottom:4px;\nbackground-position:left center;\nbackground-repeat:no-repeat;\n}\n.tab-folder-bottom .tab-item-default span {\npadding-top:1px;\npadding-bottom:3px;\n}\n* html .tab-folder-bottom .tab-item-default span {\npadding-top:3px;\npadding-bottom:1px;\n}\n.tab-item-image span {\nmargin-left:2px;\npadding-left:22px;\n}\n.tab-folder-bottom .tab-item-default {\nbottom:2px;\nmargin-top:0;\npadding-top:2px;\nborder-top-width:0;\nborder-bottom:2px outset white;\n}\n* html .tab-folder-bottom .tab-item-default {\npadding-top:2px;\npadding-bottom:0;\n}\n.tab-folder-bottom .tab-item-selected {\nmargin-top:0;\npadding-top:4px;\npadding-bottom:2px;\nmargin-bottom:0;\nbottom:0;\n}\n* html .tab-folder-bottom .tab-item-selected {\npadding-top:4px;\n}\n.tab-item-more {\nposition:absolute;\nheight:16px;\nleft:-36px;\n/*margin-top:2px;*/\n/*top:-4px;*/\n/*\nleft:-3em;\ntop:-0.4em;\nheight:0.8em;\npadding:4px;\n*/\nmargin-left:100%;\ndisplay:none;\nz-index:111;\n}\n.tab-show-more-item .tab-item-more {\ndisplay:block;\n}\n* html .tab-item-more {\nleft:-2px;\ntop:2px;\nmargin-left:0;\nwidth:100%;\n}\n.tab-folder-bottom .tab-item-more {\nmargin-bottom:2px;\ntop:auto;\nbottom:8px;\n}\n* html .tab-folder-bottom .tab-item-more {\nmargin-bottom:2px;\ntop:auto;\nbottom:0;\n}\n.tab-item-button {\nwidth:16px;\nheight:16px;\n/*\nwidth:0.8em;\nheight:0.8em;\npadding:4px;\n*/\nfloat:right;\n}\n.tab-item-button button {\nposition:relative;\nwidth:16px;\nheight:16px;\n/*\nwidth:100%;\nheight:100%;\ntop:-1em;\nleft:0;\n*/\n}\n.tab-item-button .button-arrow-left {\nborder-width:0.4em;\nborder-left-width:0;\nborder-width:4px 4px 4px 0;\nposition:relative;\n/*left:-6px; mozilla 1.8*/\nleft:-1px;\ntop:-2px;\n}\n.tab-item-button .button-arrow-right {\nborder-width:0.4em;\nborder-right-width:0;\nborder-width:4px 0 4px 4px;\nposition:relative;\n/*left:-5px; mozilla 1.8*/\nleft:0;\ntop:-2px;\n}\n* html .tab-item-button .button-arrow-left {\nleft:-1px;\ntop:0;\n}\n* html .tab-item-button .button-arrow-right {\nleft:0;\ntop:0;\n}\n.tab-folder-content-area {\nposition:absolute;\nwidth:100%;\nz-index:120;\n}\n.swt-widgets-tabfolder {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.items = null;
this.borderFrame = null;
this.borderNW = null;
this.borderNE = null;
this.borderSW = null;
this.borderSE = null;
this.itemMore = null;
this.btnPrevTab = null;
this.btnNextTab = null;
this.contentArea = null;
this.offset = 0;
this.imageList = null;
this.hMorePrevClick = null;
this.hMoreNextClick = null;
$_Z (this, arguments);
}, $wt.widgets, "TabFolder", $wt.widgets.Composite);
$_M (c$, "addSelectionListener", 
function (listener) {
var typedListener =  new $wt.widgets.TypedListener (listener);
this.addListener (13, typedListener);
this.addListener (14, typedListener);
}, "$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,128,1024,0,0,0,0);
return style&-769;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.TabFolder,"computeSize",[wHint,hHint,changed]);
var width=12;
var height=0;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
var containerWidth=O$.getContainerWidth(this.items[i].handle);
if(containerWidth==O$.getFixedBodyClientWidth()){
if(this.items[i].image!=null){
containerWidth=18;
}else{
containerWidth=0;
}containerWidth+=6+O$.getStringStyledWidth(this.items[i].text,"tab-folder-default",null);
}width+=containerWidth;
if(this.items[i].control!=null){
var s=this.items[i].control.computeSize(wHint,hHint);
height=Math.max(height,s.y);
}}}
}var border=this.getBorderWidth();
width+=border*2;
size.x=Math.max(width,size.x);
size.y=Math.max(height,size.y);
return size;
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var lineHeight=0;
if(this.items!=null&&this.items.length>0){
lineHeight=Math.max(O$.getContainerHeight(this.items[this.offset].handle),20);
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}if(O$.isIE){
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
},"~O,~S");
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var tab=d$.createElement("DIV");
tab.className="tab-item-default";
this.borderFrame.insertBefore(tab,this.itemMore);
O$.removeCSSClass(this.borderFrame,"tab-folder-no-tab");
item.textEl=d$.createElement("SPAN");
tab.appendChild(item.textEl);
item.textEl.appendChild(d$.createTextNode(item.getNameText()));
var width=-2;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<index;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
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
}O$.setTextSelection(tab,false);
},"$wt.widgets.TabItem,~N");
$_V(c$,"createHandle",
function(){
this.children=new Array(0);
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
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
el.appendChild(this.btnNextTab);
var arrowRight=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if(((O$.isSafari&&O$.isChrome)||O$.isMozilla)&&!O$.isFirefox){
arrowRight.style.left="-5px";
arrowRight.style.top="0";
}else if(O$.isIE){
arrowRight.style.top="0";
}else if(O$.isSafari){
arrowRight.style.left="-1px";
arrowRight.style.top="1px";
}else if(O$.isOpera){
arrowRight.style.left="-4px";
arrowRight.style.top="0";
}this.hMoreNextClick=$_Q((($_D("$wt.widgets.TabFolder$1")?0:org.eclipse.swt.widgets.TabFolder.$TabFolder$1$()),$_N($wt.widgets.TabFolder$1,this,null)));
Clazz.addEvent(el,"click",this.hMoreNextClick);
Clazz.addEvent(this.btnNextTab,"click",this.hMoreNextClick);
el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
el.appendChild(this.btnPrevTab);
var arrowLeft=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if(((O$.isSafari&&O$.isChrome)||O$.isMozilla)&&!O$.isFirefox){
arrowLeft.style.left="-6px";
arrowLeft.style.top="0";
}else if(O$.isIE){
arrowLeft.style.top="0";
}else if(O$.isSafari){
arrowLeft.style.left="-3px";
arrowLeft.style.top="1px";
}else if(O$.isOpera){
arrowLeft.style.left="-4px";
arrowLeft.style.top="0";
}this.hMorePrevClick=$_Q((($_D("$wt.widgets.TabFolder$2")?0:org.eclipse.swt.widgets.TabFolder.$TabFolder$2$()),$_N($wt.widgets.TabFolder$2,this,null)));
Clazz.addEvent(el,"click",this.hMorePrevClick);
Clazz.addEvent(this.btnPrevTab,"click",this.hMorePrevClick);
this.borderNW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-nw");
this.borderNE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-ne");
this.borderSW=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-sw");
this.borderSE=this.createCSSElement(this.borderFrame,cssName+"tab-folder-border-se");
this.contentArea=this.createCSSElement(this.handle,"tab-folder-content-area");
this.state&=-3;
});
$_M(c$,"destroyItem",
function(item){
},"$wt.widgets.TabItem");
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var selectionIndex=this.getSelectionIndex();
if(selectionIndex!=-1){
var ctrl=this.items[selectionIndex].control;
if(ctrl!=null)ctrl.setBounds(this.getClientArea());
this.setSelection(selectionIndex,false);
var ww=0;
if(this.handle.style.width.length>0){
ww=Integer.parseInt(this.handle.style.width);
}if(ww==0){
this.updateSelectionWithWidth(selectionIndex,cx);
}}return $_U(this,$wt.widgets.TabFolder,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
},"~O,~O,~N,~N,~N,~N,~N");
$_V(c$,"getClientArea",
function(){
this.forceResize();
var x=4;
var y=4;
var h=this.height-8;
var w=this.width-8;
if(this.items!=null&&this.items.length!=0){
var lineHeight=O$.getContainerHeight(this.items[this.offset].handle);
if(O$.isIE)lineHeight++;
if(this.getSelectionIndex()==this.offset){
lineHeight-=2;
}h-=lineHeight;
if((this.style&1024)==0){
y+=lineHeight;
}else{
if(O$.isIE)h--;
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
return-1;
});
$_V(c$,"hookSelection",
function(){
});
$_M(c$,"indexOf",
function(item){
var count=this.getItemCount();
for(var i=0;i<count;i++){
if(this.items[i]===item)return i;
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
if(this.items[index].control===child)break;
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
O$.destroyHandle(this.borderNW);
this.borderNW=null;
}if(this.borderNE!=null){
O$.destroyHandle(this.borderNE);
this.borderNE=null;
}if(this.borderSW!=null){
O$.destroyHandle(this.borderSW);
this.borderSW=null;
}if(this.borderSE!=null){
O$.destroyHandle(this.borderSE);
this.borderSE=null;
}if(this.btnPrevTab!=null){
if(this.hMorePrevClick!=null){
Clazz.removeEvent(this.btnPrevTab,"click",this.hMorePrevClick);
Clazz.removeEvent(this.btnPrevTab.parentNode,"click",this.hMorePrevClick);
this.hMorePrevClick=null;
}O$.destroyHandle(this.btnPrevTab.parentNode);
O$.destroyHandle(this.btnPrevTab);
this.btnPrevTab=null;
}if(this.btnNextTab!=null){
if(this.hMoreNextClick!=null){
Clazz.removeEvent(this.btnNextTab,"click",this.hMoreNextClick);
Clazz.removeEvent(this.btnNextTab.parentNode,"click",this.hMoreNextClick);
this.hMoreNextClick=null;
}O$.destroyHandle(this.btnNextTab.parentNode);
O$.destroyHandle(this.btnNextTab);
this.btnNextTab=null;
}if(this.itemMore!=null){
O$.destroyHandle(this.itemMore);
this.itemMore=null;
}if(this.borderFrame!=null){
O$.destroyHandle(this.borderFrame);
this.borderFrame=null;
}if(this.contentArea!=null){
O$.destroyHandle(this.contentArea);
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
if(item.control===control)item.setControl(null);
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
$_V(c$,"_updateOrientation",
function(){
if((this.style&67108864)!=0){
this.handle.style.direction="ltr";
}else if(this.parent!=null&&(this.parent.style&67108864)!=0){
this.handle.style.direction="ltr";
}});
$_M(c$,"updateSelection",
function(index){
this.updateSelectionWithWidth(index,-1);
},"~N");
$_M(c$,"updateSelectionWithWidth",
function(index,prefWidth){
var key="tab-item-selected";
for(var i=0;i<this.offset;i++){
if(i!=index&&this.items[i].control!=null){
this.items[i].control.setVisible(false);
}if(index>=this.offset){
O$.removeCSSClass(this.items[i].handle,key);
}}
if(this.items[index]!=null){
var left=-2;
var x=2;
for(var i=this.offset;i<this.items.length;i++){
if(this.items[i].handle.style.zIndex==-1){
this.items[i].handle.style.display="";
}this.items[i].handle.style.zIndex=i+1;
O$.removeCSSClass(this.items[i].handle,key);
var w=O$.getContainerWidth(this.items[i].handle);
if(i<index){
left+=w;
}var s=this.items[i].handle.style;
if(i==index){
x-=2;
}s.left=x+"px";
x+=w;
}
var ww=0;
if(this.handle.style.width.length>0){
ww=Integer.parseInt(this.handle.style.width);
}if(prefWidth!=-1&&ww==0){
ww=prefWidth;
}if(ww>0){
O$.updateCSSClass(this.borderFrame,"tab-show-more-item",x>ww||this.offset!=0);
}O$.addCSSClass(this.items[index].handle,key);
this.items[index].handle.style.zIndex=(index>=this.offset)?this.items.length+1:-1;
if(index<this.offset){
this.items[index].handle.style.display="none";
}else{
this.items[index].handle.style.display="";
}if(this.width!=0){
var w=O$.getContainerWidth(this.items[index].handle);
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
}}}},"~N,~N");
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
c$.$TabFolder$1$=function(){
$_H();
c$=$_W($wt.widgets,"TabFolder$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset+1>=this.b$["$wt.widgets.TabFolder"].items.length)return;
var w=0;
var ww=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[this.b$["$wt.widgets.TabFolder"].offset].handle);
var width=this.b$["$wt.widgets.TabFolder"].getSize().x-36;
for(var i=this.b$["$wt.widgets.TabFolder"].offset+1;i<this.b$["$wt.widgets.TabFolder"].items.length;i++){
var x=O$.getContainerWidth(this.b$["$wt.widgets.TabFolder"].items[i].handle);
w+=x;
ww+=x;
if(w>width){
if(i<this.b$["$wt.widgets.TabFolder"].items.length-1){
this.b$["$wt.widgets.TabFolder"].offset++;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}}}
if(ww>width){
this.b$["$wt.widgets.TabFolder"].offset++;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
return;
}});
c$=$_P();
};
c$.$TabFolder$2$=function(){
$_H();
c$=$_W($wt.widgets,"TabFolder$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(this.b$["$wt.widgets.TabFolder"].offset<=0)return;
this.b$["$wt.widgets.TabFolder"].offset--;
this.b$["$wt.widgets.TabFolder"].setSelection(this.b$["$wt.widgets.TabFolder"].getSelectionIndex(),false);
});
c$=$_P();
};
});
