Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.Combo",["$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
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
this.itemCount=0;
$_Z(this,arguments);
},$wt.widgets,"Combo",$wt.widgets.Composite);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.Combo,[parent,$wt.widgets.Combo.checkStyle(style)]);
this.itemCount=0;
},"$wt.widgets.Composite,~N");
$_M(c$,"add",
function(string){
if(this.selectInput!=null){
this.selectInput.options[this.itemCount]=new Option(string,string);
}this.itemCount++;
},"~S");
$_M(c$,"add",
function(string,index){
var count=this.itemCount;
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
var length=this.itemCount;
for(var i=0;i<length;i++){
width=Math.max(width,O$.getStringPlainWidth(options[i].value));
}
}else{
width=64;
}width+=O$.getContainerWidth(this.dropDownButton);
}if(hHint==-1){
if((this.style&64)!=0){
height=this.computeSelectHeight();
}height+=this.getTextHeight();
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
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
var height=O$.getContainerHeight(this.dropDownButton);
this.selectInput=d$.createElement("SELECT");
if(this.isSimple){
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
this.selectInput.className="combo-select-box-visible";
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
}else{
this.selectInput.style.top=height+"px";
this.selectInput.style.left=this.textInput.style.left;
this.selectInput.className="combo-select-box-invisible combo-select-box-notsimple";
this.selectInput.size=this.visibleCount;
this.getShell().handle.appendChild(this.selectInput);
}this.textInput.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].show();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$1,i$,v$);
})(this,null));
this.dropDownButton.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].show();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$2,i$,v$);
})(this,null));
this.selectInput.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$3,i$,v$);
})(this,null));
this.selectInput.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$4")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Combo$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Combo"].isSimple)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$4,i$,v$);
})(this,null));
});
$_M(c$,"hide",
function(){
this.selectShown=false;
this.selectInput.className="combo-select-box-invisible"+(this.isSimple?"":" combo-select-box-notsimple");
});
$_M(c$,"show",
function(){
var coordinate=O$.getElementPositionInShell(this.textInput,this.getShell().handle);
this.selectShown=true;
this.selectInput.style.zIndex="120";
this.selectInput.className="combo-select-box-visible"+(this.isSimple?"":" combo-select-box-notsimple");
this.selectInput.style.top=coordinate.y+"px";
this.selectInput.style.left=coordinate.x+"px";
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
this.setText("",false);
this.sendEvent(24);
});
$_M(c$,"getItem",
function(index){
return this.selectInput.options[index].value;
},"~N");
$_M(c$,"getItemCount",
function(){
return this.itemCount;
});
$_M(c$,"getItemHeight",
function(){
return O$.getStringPlainHeight("A")+1;
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
return this.selectInput.selectedIndex;
});
$_M(c$,"getText",
function(){
return this.textInput.value;
});
$_M(c$,"getTextHeight",
function(){
return O$.getStringPlainHeight("A")+6;
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
if(this.selectInput.selectedIndex==index){
this.noSelection=true;
}var newOptions=new Array(oldOptions.length-1);
System.arraycopy(oldOptions,0,newOptions,0,index);
System.arraycopy(oldOptions,index+1,newOptions,index,oldOptions.length-index-1);
this.selectInput.options=newOptions;
this.itemCount--;
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var oldOptions=this.selectInput.options;
if(start<=this.selectInput.selectedIndex&&this.selectInput.selectedIndex<=end){
this.noSelection=true;
}var newOptions=new Array(oldOptions.length-(end-start+1));
System.arraycopy(oldOptions,0,newOptions,0,start);
System.arraycopy(oldOptions,end+1,newOptions,start,oldOptions.length-end-1);
this.selectInput.options=newOptions;
this.itemCount-=(end-start+1);
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
if(this.selectInput.selectedIndex==index){
this.noSelection=true;
}this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
{
this.selectInput.options.length=0;
}this.noSelection=true;
this.itemCount=0;
this.textInput.value="";
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
if(index>=0&&index<this.itemCount){
this.noSelection=false;
this.selectInput.selectedIndex=index;
this.setText(this.getItem(index));
}},"~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var buttonHeight=this.getTextHeight();
var buttonWidth=O$.getContainerWidth(this.dropDownButton);
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
this.setText(string,true);
},"~S");
$_M(c$,"setText",
function(string,modify){
if((this.style&8)!=0){
var index=this.indexOf(string);
if(index!=-1)this.select(index);
return;
}this.textInput.readOnly=false;
this.textInput.value=string;
this.textInput.readOnly=(this.style&8)!=0;
if(modify){
this.sendEvent(24);
}},"~S,~B");
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
$_M(c$,"windowClass",
function(){
return"DIV";
});
$_M(c$,"releaseHandle",
function(){
if(this.selectInput!=null){
O$.destroyHandle(this.selectInput);
this.selectInput=null;
}if(this.dropDownButton!=null){
O$.destroyHandle(this.dropDownButton);
this.dropDownButton=null;
}if(this.textInput!=null){
O$.destroyHandle(this.textInput);
this.textInput=null;
}$_U(this,$wt.widgets.Combo,"releaseHandle",[]);
});
$_S(c$,
"LIMIT",0x7FFF);
});
