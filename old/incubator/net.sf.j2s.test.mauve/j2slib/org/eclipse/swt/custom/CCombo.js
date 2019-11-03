$_L(["$wt.widgets.Composite"],"$wt.custom.CCombo",["$wt.SWT","$wt.accessibility.AccessibleAdapter","$.AccessibleControlAdapter","$.AccessibleTextAdapter","$wt.graphics.GC","$.Point","$wt.widgets.Button","$.Event","$.List","$.Listener","$.Shell","$.Text","$.TypedListener"],function(){
c$=$_C(function(){
this.text=null;
this.list=null;
this.visibleItemCount=5;
this.popup=null;
this.arrow=null;
this.$hasFocus=false;
this.listener=null;
this.filter=null;
this.$foreground=null;
this.$background=null;
this.font=null;
$_Z(this,arguments);
},$wt.custom,"CCombo",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.CCombo,[parent,style=$wt.custom.CCombo.checkStyle(style)]);
var textStyle=4;
if((style&8)!=0)textStyle|=8;
if((style&8388608)!=0)textStyle|=8388608;
this.text=new $wt.widgets.Text(this,textStyle);
var arrowStyle=1028;
if((style&8388608)!=0)arrowStyle|=8388608;
this.arrow=new $wt.widgets.Button(this,arrowStyle);
this.listener=(($_D("$wt.custom.CCombo$1")?0:org.eclipse.swt.custom.CCombo.$CCombo$1$()),$_N($wt.custom.CCombo$1,this,null));
this.filter=(($_D("$wt.custom.CCombo$2")?0:org.eclipse.swt.custom.CCombo.$CCombo$2$()),$_N($wt.custom.CCombo$2,this,null));
var comboEvents=[12,10,11];
for(var i=0;i<comboEvents.length;i++)this.addListener(comboEvents[i],this.listener);

var textEvents=[1,2,24,3,4,31,15];
for(var i=0;i<textEvents.length;i++)this.text.addListener(textEvents[i],this.listener);

var arrowEvents=[13,15];
for(var i=0;i<arrowEvents.length;i++)this.arrow.addListener(arrowEvents[i],this.listener);

this.createPopup(null,-1);
this.initAccessible();
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
var mask=109053960;
return style&mask;
},"~N");
$_M(c$,"add",
function(string){
this.list.add(string);
},"~S");
$_M(c$,"add",
function(string,index){
this.list.add(string,index);
},"~S,~N");
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
$_M(c$,"arrowEvent",
function(event){
switch(event.type){
case 15:
{
this.handleFocus(15);
break;
}case 13:
{
this.dropDown(!this.isDropped());
break;
}}
},"$wt.widgets.Event");
$_M(c$,"clearSelection",
function(){
this.text.clearSelection();
this.list.deselectAll();
});
$_M(c$,"comboEvent",
function(event){
switch(event.type){
case 12:
if(this.popup!=null&&!this.popup.isDisposed()){
this.list.removeListener(12,this.listener);
this.popup.dispose();
}var shell=this.getShell();
shell.removeListener(27,this.listener);
var display=this.getDisplay();
display.removeFilter(15,this.filter);
this.popup=null;
this.text=null;
this.list=null;
this.arrow=null;
break;
case 10:
this.dropDown(false);
break;
case 11:
this.internalLayout(false);
break;
}
},"$wt.widgets.Event");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
var items=this.list.getItems();
var textWidth=0;
var gc=new $wt.graphics.GC(this.text);
var spacer=gc.stringExtent(" ").x;
for(var i=0;i<items.length;i++){
textWidth=Math.max(gc.stringExtent(items[i]).x,textWidth);
}
gc.dispose();
var textSize=this.text.computeSize(-1,-1,changed);
var arrowSize=this.arrow.computeSize(-1,-1,changed);
var listSize=this.list.computeSize(wHint,-1,changed);
var borderWidth=this.getBorderWidth();
height=Math.max(hHint,Math.max(textSize.y,arrowSize.y)+2*borderWidth);
width=Math.max(wHint,Math.max(textWidth+2*spacer+arrowSize.x+2*borderWidth,listSize.x));
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"createPopup",
function(items,selectionIndex){
this.popup=new $wt.widgets.Shell(this.getShell(),16392);
var style=this.getStyle();
var listStyle=516;
if((style&8388608)!=0)listStyle|=8388608;
if((style&67108864)!=0)listStyle|=67108864;
if((style&33554432)!=0)listStyle|=33554432;
this.list=new $wt.widgets.List(this.popup,listStyle);
if(this.font!=null)this.list.setFont(this.font);
if(this.$foreground!=null)this.list.setForeground(this.$foreground);
if(this.$background!=null)this.list.setBackground(this.$background);
var popupEvents=[21,9,27];
for(var i=0;i<popupEvents.length;i++)this.popup.addListener(popupEvents[i],this.listener);

var listEvents=[4,13,31,1,2,15,12];
for(var i=0;i<listEvents.length;i++)this.list.addListener(listEvents[i],this.listener);

if(items!=null)this.list.setItems(items);
if(selectionIndex!=-1)this.list.setSelection(selectionIndex);
},"~A,~N");
$_M(c$,"deselect",
function(index){
this.list.deselect(index);
},"~N");
$_M(c$,"deselectAll",
function(){
this.list.deselectAll();
});
$_M(c$,"dropDown",
function(drop){
if(drop==this.isDropped())return;
if(!drop){
this.popup.setVisible(false);
if(!this.isDisposed()&&this.arrow.isFocusControl()){
this.text.setFocus();
}return;
}if(this.getShell()!==this.popup.getParent()){
var items=this.list.getItems();
var selectionIndex=this.list.getSelectionIndex();
this.list.removeListener(12,this.listener);
this.popup.dispose();
this.popup=null;
this.list=null;
this.createPopup(items,selectionIndex);
}var size=this.getSize();
var itemCount=this.list.getItemCount();
itemCount=(itemCount==0)?this.visibleItemCount:Math.min(this.visibleItemCount,itemCount);
var itemHeight=this.list.getItemHeight()*itemCount;
var listSize=this.list.computeSize(-1,itemHeight,false);
this.list.setBounds(1,1,Math.max(size.x-2,listSize.x),listSize.y);
var index=this.list.getSelectionIndex();
if(index!=-1)this.list.setTopIndex(index);
var display=this.getDisplay();
var listRect=this.list.getBounds();
var parentRect=display.map(this.getParent(),null,this.getBounds());
var comboSize=this.getSize();
var displayRect=this.getMonitor().getClientArea();
var width=Math.max(comboSize.x,listRect.width+2);
var height=listRect.height+2;
var x=parentRect.x;
var y=parentRect.y+comboSize.y;
if(y+height>displayRect.y+displayRect.height)y=parentRect.y-height;
this.popup.setBounds(x,y,width,height);
this.popup.setVisible(true);
this.list.setFocus();
},"~B");
$_M(c$,"getAssociatedLabel",
function(){
var siblings=this.getParent().getChildren();
for(var i=0;i<siblings.length;i++){
if(siblings[i]===this){
if(i>0&&$_O(siblings[i-1],$wt.widgets.Label)){
return siblings[i-1];
}}}
return null;
});
$_M(c$,"getChildren",
function(){
return new Array(0);
});
$_M(c$,"getEditable",
function(){
return this.text.getEditable();
});
$_M(c$,"getItem",
function(index){
return this.list.getItem(index);
},"~N");
$_M(c$,"getItemCount",
function(){
return this.list.getItemCount();
});
$_M(c$,"getItemHeight",
function(){
return this.list.getItemHeight();
});
$_M(c$,"getItems",
function(){
return this.list.getItems();
});
$_M(c$,"getMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while((index<length)&&((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0)))index++;

if(++index>=length)return'\0';
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0))return string.charAt(index);
index++;
}while(index<length);
return'\0';
},"~S");
$_M(c$,"getSelection",
function(){
return this.text.getSelection();
});
$_M(c$,"getSelectionIndex",
function(){
return this.list.getSelectionIndex();
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.CCombo,"getStyle",[]);
style&=-9;
if(!this.text.getEditable())style|=8;
return style;
});
$_M(c$,"getText",
function(){
return this.text.getText();
});
$_M(c$,"getTextHeight",
function(){
return this.text.getLineHeight();
});
$_M(c$,"getTextLimit",
function(){
return this.text.getTextLimit();
});
$_M(c$,"getVisibleItemCount",
function(){
return this.visibleItemCount;
});
$_M(c$,"handleFocus",
function(type){
if(this.isDisposed())return;
switch(type){
case 15:
{
if(this.$hasFocus)return;
if(this.getEditable())this.text.selectAll();
this.$hasFocus=true;
var shell=this.getShell();
shell.removeListener(27,this.listener);
shell.addListener(27,this.listener);
var display=this.getDisplay();
display.removeFilter(15,this.filter);
display.addFilter(15,this.filter);
var e=new $wt.widgets.Event();
this.notifyListeners(15,e);
break;
}case 16:
{
if(!this.$hasFocus)return;
var focusControl=this.getDisplay().getFocusControl();
if(focusControl===this.arrow||focusControl===this.list||focusControl===this.text)return;
this.$hasFocus=false;
var shell=this.getShell();
shell.removeListener(27,this.listener);
var display=this.getDisplay();
display.removeFilter(15,this.filter);
var e=new $wt.widgets.Event();
this.notifyListeners(16,e);
break;
}}
},"~N");
$_M(c$,"indexOf",
function(string){
return this.list.indexOf(string);
},"~S");
$_M(c$,"indexOf",
function(string,start){
return this.list.indexOf(string,start);
},"~S,~N");
$_M(c$,"initAccessible",
function(){
var accessibleAdapter=(($_D("$wt.custom.CCombo$3")?0:org.eclipse.swt.custom.CCombo.$CCombo$3$()),$_N($wt.custom.CCombo$3,this,null));
this.getAccessible().addAccessibleListener(accessibleAdapter);
this.text.getAccessible().addAccessibleListener(accessibleAdapter);
this.list.getAccessible().addAccessibleListener(accessibleAdapter);
this.arrow.getAccessible().addAccessibleListener((($_D("$wt.custom.CCombo$4")?0:org.eclipse.swt.custom.CCombo.$CCombo$4$()),$_N($wt.custom.CCombo$4,this,null)));
this.getAccessible().addAccessibleTextListener((($_D("$wt.custom.CCombo$5")?0:org.eclipse.swt.custom.CCombo.$CCombo$5$()),$_N($wt.custom.CCombo$5,this,null)));
this.getAccessible().addAccessibleControlListener((($_D("$wt.custom.CCombo$6")?0:org.eclipse.swt.custom.CCombo.$CCombo$6$()),$_N($wt.custom.CCombo$6,this,null)));
this.text.getAccessible().addAccessibleControlListener((($_D("$wt.custom.CCombo$7")?0:org.eclipse.swt.custom.CCombo.$CCombo$7$()),$_N($wt.custom.CCombo$7,this,null)));
this.arrow.getAccessible().addAccessibleControlListener((($_D("$wt.custom.CCombo$8")?0:org.eclipse.swt.custom.CCombo.$CCombo$8$()),$_N($wt.custom.CCombo$8,this,null)));
});
$_M(c$,"isDropped",
function(){
return this.popup.getVisible();
});
$_M(c$,"isFocusControl",
function(){
if(this.text.isFocusControl()||this.arrow.isFocusControl()||this.list.isFocusControl()||this.popup.isFocusControl()){
return true;
}return $_U(this,$wt.custom.CCombo,"isFocusControl",[]);
});
$_M(c$,"internalLayout",
function(changed){
if(this.isDropped())this.dropDown(false);
var rect=this.getClientArea();
var width=rect.width;
var height=rect.height;
var arrowSize=this.arrow.computeSize(-1,height,changed);
this.text.setBounds(0,0,width-arrowSize.x,height);
this.arrow.setBounds(width-arrowSize.x,0,arrowSize.x,arrowSize.y);
},"~B");
$_M(c$,"listEvent",
function(event){
switch(event.type){
case 12:
if(this.getShell()!==this.popup.getParent()){
var items=this.list.getItems();
var selectionIndex=this.list.getSelectionIndex();
this.popup=null;
this.list=null;
this.createPopup(items,selectionIndex);
}break;
case 15:
{
this.handleFocus(15);
break;
}case 4:
{
if(event.button!=1)return;
this.dropDown(false);
break;
}case 13:
{
var index=this.list.getSelectionIndex();
if(index==-1)return;
this.text.setText(this.list.getItem(index));
this.text.selectAll();
this.list.setSelection(index);
var e=new $wt.widgets.Event();
e.time=event.time;
e.stateMask=event.stateMask;
e.doit=event.doit;
this.notifyListeners(13,e);
event.doit=e.doit;
break;
}case 31:
{
switch(event.detail){
case 4:
case 2:
case 32:
case 64:
event.doit=false;
break;
}
var e=new $wt.widgets.Event();
e.time=event.time;
e.detail=event.detail;
e.doit=event.doit;
e.character=event.character;
e.keyCode=event.keyCode;
this.notifyListeners(31,e);
event.doit=e.doit;
event.detail=e.detail;
break;
}case 2:
{
var e=new $wt.widgets.Event();
e.time=event.time;
e.character=event.character;
e.keyCode=event.keyCode;
e.stateMask=event.stateMask;
this.notifyListeners(2,e);
break;
}case 1:
{
if((event.character).charCodeAt(0)==('\u001b').charCodeAt(0)){
this.dropDown(false);
}if((event.stateMask&65536)!=0&&(event.keyCode==16777217||event.keyCode==16777218)){
this.dropDown(false);
}if((event.character).charCodeAt(0)==('\u000d').charCodeAt(0)){
this.dropDown(false);
var e=new $wt.widgets.Event();
e.time=event.time;
e.stateMask=event.stateMask;
this.notifyListeners(14,e);
}if(this.isDisposed())break;
var e=new $wt.widgets.Event();
e.time=event.time;
e.character=event.character;
e.keyCode=event.keyCode;
e.stateMask=event.stateMask;
this.notifyListeners(1,e);
break;
}}
},"$wt.widgets.Event");
$_M(c$,"popupEvent",
function(event){
switch(event.type){
case 9:
var listRect=this.list.getBounds();
var black=this.getDisplay().getSystemColor(2);
event.gc.setForeground(black);
event.gc.drawRectangle(0,0,listRect.width+1,listRect.height+1);
break;
case 21:
event.doit=false;
this.dropDown(false);
break;
case 27:
this.dropDown(false);
break;
}
},"$wt.widgets.Event");
$_M(c$,"redraw",
function(){
$_U(this,$wt.custom.CCombo,"redraw",[]);
this.text.redraw();
this.arrow.redraw();
if(this.popup.isVisible())this.list.redraw();
});
$_M(c$,"redraw",
function(x,y,width,height,all){
$_U(this,$wt.custom.CCombo,"redraw",[x,y,width,height,true]);
},"~N,~N,~N,~N,~B");
$_M(c$,"remove",
function(index){
this.list.remove(index);
},"~N");
$_M(c$,"remove",
function(start,end){
this.list.remove(start,end);
},"~N,~N");
$_M(c$,"remove",
function(string){
this.list.remove(string);
},"~S");
$_M(c$,"removeAll",
function(){
this.text.setText("");
this.list.removeAll();
});
$_M(c$,"removeModifyListener",
function(listener){
this.removeListener(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
this.removeListener(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"select",
function(index){
if(index==-1){
this.list.deselectAll();
this.text.setText("");
return;
}if(0<=index&&index<this.list.getItemCount()){
if(index!=this.getSelectionIndex()){
this.text.setText(this.list.getItem(index));
this.text.selectAll();
this.list.select(index);
this.list.showSelection();
}}},"~N");
$_M(c$,"setBackground",
function(color){
$_U(this,$wt.custom.CCombo,"setBackground",[color]);
this.$background=color;
if(this.text!=null)this.text.setBackground(color);
if(this.list!=null)this.list.setBackground(color);
if(this.arrow!=null)this.arrow.setBackground(color);
},"$wt.graphics.Color");
$_M(c$,"setEditable",
function(editable){
this.text.setEditable(editable);
},"~B");
$_M(c$,"setEnabled",
function(enabled){
$_U(this,$wt.custom.CCombo,"setEnabled",[enabled]);
if(this.popup!=null)this.popup.setVisible(false);
if(this.text!=null)this.text.setEnabled(enabled);
if(this.arrow!=null)this.arrow.setEnabled(enabled);
},"~B");
$_V(c$,"setFocus",
function(){
return this.text.setFocus();
});
$_M(c$,"setFont",
function(font){
$_U(this,$wt.custom.CCombo,"setFont",[font]);
this.font=font;
this.text.setFont(font);
this.list.setFont(font);
this.internalLayout(true);
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
$_U(this,$wt.custom.CCombo,"setForeground",[color]);
this.$foreground=color;
if(this.text!=null)this.text.setForeground(color);
if(this.list!=null)this.list.setForeground(color);
if(this.arrow!=null)this.arrow.setForeground(color);
},"$wt.graphics.Color");
$_M(c$,"setItem",
function(index,string){
this.list.setItem(index,string);
},"~N,~S");
$_M(c$,"setItems",
function(items){
this.list.setItems(items);
if(!this.text.getEditable())this.text.setText("");
},"~A");
$_V(c$,"setLayout",
function(layout){
return;
},"$wt.widgets.Layout");
$_M(c$,"setSelection",
function(selection){
this.text.setSelection(selection.x,selection.y);
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
var index=this.list.indexOf(string);
if(index==-1){
this.list.deselectAll();
this.text.setText(string);
return;
}this.text.setText(string);
this.text.selectAll();
this.list.setSelection(index);
this.list.showSelection();
},"~S");
$_M(c$,"setTextLimit",
function(limit){
this.text.setTextLimit(limit);
},"~N");
$_M(c$,"setToolTipText",
function(string){
$_U(this,$wt.custom.CCombo,"setToolTipText",[string]);
this.arrow.setToolTipText(string);
this.text.setToolTipText(string);
},"~S");
$_M(c$,"setVisible",
function(visible){
$_U(this,$wt.custom.CCombo,"setVisible",[visible]);
if(!visible)this.popup.setVisible(false);
},"~B");
$_M(c$,"setVisibleItemCount",
function(count){
if(count<0)return;
this.visibleItemCount=count;
},"~N");
$_M(c$,"stripMnemonic",
function(string){
var index=0;
var length=string.length;
do{
while((index<length)&&((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0)))index++;

if(++index>=length)return string;
if((string.charAt(index)).charCodeAt(0)!=('&').charCodeAt(0)){
return string.substring(0,index-1)+string.substring(index,length);
}index++;
}while(index<length);
return string;
},"~S");
$_M(c$,"textEvent",
function(event){
switch(event.type){
case 15:
{
this.handleFocus(15);
break;
}case 1:
{
if((event.character).charCodeAt(0)==('\u000d').charCodeAt(0)){
this.dropDown(false);
var e=new $wt.widgets.Event();
e.time=event.time;
e.stateMask=event.stateMask;
this.notifyListeners(14,e);
}if(this.isDisposed())break;
if(event.keyCode==16777217||event.keyCode==16777218){
event.doit=false;
if((event.stateMask&65536)!=0){
var dropped=this.isDropped();
this.text.selectAll();
if(!dropped)this.setFocus();
this.dropDown(!dropped);
break;
}var oldIndex=this.getSelectionIndex();
if(event.keyCode==16777217){
this.select(Math.max(oldIndex-1,0));
}else{
this.select(Math.min(oldIndex+1,this.getItemCount()-1));
}if(oldIndex!=this.getSelectionIndex()){
var e=new $wt.widgets.Event();
e.time=event.time;
e.stateMask=event.stateMask;
this.notifyListeners(13,e);
}if(this.isDisposed())break;
}var e=new $wt.widgets.Event();
e.time=event.time;
e.character=event.character;
e.keyCode=event.keyCode;
e.stateMask=event.stateMask;
this.notifyListeners(1,e);
break;
}case 2:
{
var e=new $wt.widgets.Event();
e.time=event.time;
e.character=event.character;
e.keyCode=event.keyCode;
e.stateMask=event.stateMask;
this.notifyListeners(2,e);
break;
}case 24:
{
this.list.deselectAll();
var e=new $wt.widgets.Event();
e.time=event.time;
this.notifyListeners(24,e);
break;
}case 3:
{
if(event.button!=1)return;
if(this.text.getEditable())return;
var dropped=this.isDropped();
this.text.selectAll();
if(!dropped)this.setFocus();
this.dropDown(!dropped);
break;
}case 4:
{
if(event.button!=1)return;
if(this.text.getEditable())return;
this.text.selectAll();
break;
}case 31:
{
switch(event.detail){
case 4:
case 32:
case 64:
event.doit=false;
break;
}
var e=new $wt.widgets.Event();
e.time=event.time;
e.detail=event.detail;
e.doit=event.doit;
e.character=event.character;
e.keyCode=event.keyCode;
this.notifyListeners(31,e);
event.doit=e.doit;
event.detail=e.detail;
break;
}}
},"$wt.widgets.Event");
c$.$CCombo$1$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
if(this.b$["$wt.custom.CCombo"].popup===event.widget){
this.b$["$wt.custom.CCombo"].popupEvent(event);
return;
}if(this.b$["$wt.custom.CCombo"].text===event.widget){
this.b$["$wt.custom.CCombo"].textEvent(event);
return;
}if(this.b$["$wt.custom.CCombo"].list===event.widget){
this.b$["$wt.custom.CCombo"].listEvent(event);
return;
}if(this.b$["$wt.custom.CCombo"].arrow===event.widget){
this.b$["$wt.custom.CCombo"].arrowEvent(event);
return;
}if(this.b$["$wt.custom.CCombo"]===event.widget){
this.b$["$wt.custom.CCombo"].comboEvent(event);
return;
}if(this.b$["$wt.custom.CCombo"].getShell()===event.widget){
this.b$["$wt.custom.CCombo"].handleFocus(16);
}},"$wt.widgets.Event");
c$=$_P();
};
c$.$CCombo$2$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$2",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
var shell=(event.widget).getShell();
if(shell===this.b$["$wt.custom.CCombo"].getShell()){
this.b$["$wt.custom.CCombo"].handleFocus(16);
}},"$wt.widgets.Event");
c$=$_P();
};
c$.$CCombo$3$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$3",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(e){
var name=null;
var label=this.b$["$wt.custom.CCombo"].getAssociatedLabel();
if(label!=null){
name=this.b$["$wt.custom.CCombo"].stripMnemonic(label.getText());
}e.result=name;
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getKeyboardShortcut",
function(e){
var shortcut=null;
var label=this.b$["$wt.custom.CCombo"].getAssociatedLabel();
if(label!=null){
var text=label.getText();
if(text!=null){
var mnemonic=this.b$["$wt.custom.CCombo"].getMnemonic(text);
if((mnemonic).charCodeAt(0)!=('\0').charCodeAt(0)){
shortcut="Alt+"+mnemonic;
}}}e.result=shortcut;
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getHelp",
function(e){
e.result=this.b$["$wt.custom.CCombo"].getToolTipText();
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
};
c$.$CCombo$4$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$4",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getName",
function(e){
e.result=this.b$["$wt.custom.CCombo"].isDropped()?"Close":"Open";
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getKeyboardShortcut",
function(e){
e.result="Alt+Down Arrow";
},"$wt.accessibility.AccessibleEvent");
$_V(c$,"getHelp",
function(e){
e.result=this.b$["$wt.custom.CCombo"].getToolTipText();
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
};
c$.$CCombo$5$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$5",$wt.accessibility.AccessibleTextAdapter);
$_V(c$,"getCaretOffset",
function(e){
e.offset=this.b$["$wt.custom.CCombo"].text.getCaretPosition();
},"$wt.accessibility.AccessibleTextEvent");
c$=$_P();
};
c$.$CCombo$6$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$6",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getChildAtPoint",
function(e){
var testPoint=this.b$["$wt.custom.CCombo"].toControl(e.x,e.y);
if(this.b$["$wt.custom.CCombo"].getBounds().contains(testPoint)){
e.childID=-1;
}},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getLocation",
function(e){
var location=this.b$["$wt.custom.CCombo"].getBounds();
var pt=this.b$["$wt.custom.CCombo"].toDisplay(location.x,location.y);
e.x=pt.x;
e.y=pt.y;
e.width=location.width;
e.height=location.height;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getChildCount",
function(e){
e.detail=0;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getRole",
function(e){
e.detail=46;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(e){
e.detail=0;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getValue",
function(e){
e.result=this.b$["$wt.custom.CCombo"].getText();
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
};
c$.$CCombo$7$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$7",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getRole",
function(e){
e.detail=this.b$["$wt.custom.CCombo"].text.getEditable()?42:41;
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
};
c$.$CCombo$8$=function(){
$_H();
c$=$_W($wt.custom,"CCombo$8",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getDefaultAction",
function(e){
e.result=this.b$["$wt.custom.CCombo"].isDropped()?$WT.getMessage("SWT_Close"):$WT.getMessage("SWT_Open");
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
};
});
