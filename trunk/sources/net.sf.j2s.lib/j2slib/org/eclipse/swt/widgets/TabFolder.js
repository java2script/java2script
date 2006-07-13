Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.TabFolder",["java.lang.Character","$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TabItem","$.TypedListener"],function(){
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
var width=-124;
if(this.items!=null&&this.items.length!=0){
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&!this.items[i].isDisposed()){
width+=O$.getContainerWidth(this.items[i].handle);
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
var lineHeight=0;
if(this.items!=null&&this.items.length>0){
lineHeight=O$.getContainerHeight(this.items[this.offset].handle);
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
if(O$.isMozilla&&!O$.isFirefox){
this.itemMore.style.bottom="6px";
}var el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnNextTab=d$.createElement("BUTTON");
el.appendChild(this.btnNextTab);
var arrowRight=this.createCSSElement(this.btnNextTab,"button-arrow-right");
if(O$.isMozilla&&!O$.isFirefox){
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
}
return $_N($wt.widgets.TabFolder$1,i$,v$);
})(this,null));
el=this.createCSSElement(this.itemMore,"tab-item-button");
this.btnPrevTab=d$.createElement("BUTTON");
el.appendChild(this.btnPrevTab);
var arrowLeft=this.createCSSElement(this.btnPrevTab,"button-arrow-left");
if(O$.isMozilla&&!O$.isFirefox){
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
if(this.b$["$wt.widgets.TabFolder"].offset<=0)return;
this.b$["$wt.widgets.TabFolder"].offset--;
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
O$.destroyHandle(this.btnPrevTab.parentNode);
O$.destroyHandle(this.btnPrevTab);
this.btnPrevTab=null;
}if(this.btnNextTab!=null){
O$.destroyHandle(this.btnNextTab.parentNode);
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
if(this.items[i].control!=null){
this.items[i].control.setVisible(false);
}if(index>=this.offset){
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
this.items[i].handle.style.zIndex=(i+1)+"";
var cssName=this.items[i].handle.className;
if(cssName==null)cssName="";
var idx=cssName.indexOf(key);
if(idx!=-1){
this.items[i].handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
if(i>index){
}}var w=O$.getContainerWidth(this.items[i].handle);
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
});
