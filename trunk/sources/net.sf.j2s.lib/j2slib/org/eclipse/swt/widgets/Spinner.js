Clazz.load(["$wt.widgets.Composite"],"$wt.widgets.Spinner",["java.lang.Character","$.StringBuffer","$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
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
this.increment=1;
this.minimum=0;
this.maximum=2147483647;
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return style&-769;
},"~N");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Spinner,"createHandle",[]);
this.state&=-3;
this.handle=d$.createElement("DIV");
this.handle.className="spinner-default";
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&2048)!=0){
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
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()+this.b$["$wt.widgets.Spinner"].increment);
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
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()-this.b$["$wt.widgets.Spinner"].increment);
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
this.setSelection(0,false);
this.textInputHandle.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Spinner$3")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Spinner$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection());
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
}else{
string=""+this.maximum;
}var size=O$.getStringPlainSize(string);
width=size.x;
height=O$.getContainerHeight(this.updownHandle);
height=O$.getContainerHeight(this.upBtnHandle)+O$.getContainerHeight(this.downBtnHandle);
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
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
value=Math.min(Math.max(this.minimum,value),this.maximum);
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
this.textInputHandle.style.width=(width-16)+"px";
this.textInputHandle.style.height=((height-2)>24?20:height-2)+"px";
},"~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Spinner,"setBounds",[x,y,width,height,flags]);
this.textInputHandle.style.width=(width-16)+"px";
this.textInputHandle.style.height=((height-2)>24?20:height-2)+"px";
},"~N,~N,~N,~N,~N");
$_M(c$,"releaseHandle",
function(){
if(this.textHandle!=null){
O$.destroyHandle(this.textHandle);
this.textHandle=null;
}if(this.upBtnHandle!=null){
O$.destroyHandle(this.upBtnHandle);
this.upBtnHandle=null;
}if(this.downBtnHandle!=null){
O$.destroyHandle(this.downBtnHandle);
this.downBtnHandle=null;
}if(this.updownHandle!=null){
O$.destroyHandle(this.updownHandle);
this.updownHandle=null;
}$_U(this,$wt.widgets.Spinner,"releaseHandle",[]);
});
$_M(c$,"getSelectionText",
function(){
return 0;
});
});
