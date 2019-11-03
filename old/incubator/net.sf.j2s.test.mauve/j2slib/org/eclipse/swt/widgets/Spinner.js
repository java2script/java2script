$_L(["$wt.widgets.Composite"],"$wt.widgets.Spinner",["java.lang.Character","$wt.graphics.Point","$.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Spinner", ".spinner-default {\nposition:absolute;\n}\n.spinner-text-default {\nmargin-right:16px;\n}\n.spinner-text-field-default {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nborder:2px inset white;\n}\n.spinner-text-field-no-border {\nborder-style:none;\n}\n.spinner-up-down-default {\nfloat:right;\nwidth:16px;\n}\n.spinner-up-down-default button {\nposition:absolute;\nline-height:0;\nwidth:16px;\nheight:50%;\npadding:0;\nfont-size:0;\nmargin:0;/*1px 0;*/\n}\n.spinner-up-button-default {\ntop:0;\n}\n.spinner-down-button-default {\nbottom:0;\n}\n.spinner-button-arrow-up {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:none solid solid solid;\nborder-color:buttonface;\nborder-bottom-color:black;\nborder-top-width:0;\n}\n.spinner-button-arrow-down {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid none solid;\nborder-color:buttonface;\nborder-top-color:black;\nborder-bottom-width:0;\n}\n.spinner-disabled .spinner-button-arrow-up {\nborder-bottom-color:gray;\n}\n.spinner-disabled .spinner-button-arrow-down {\nborder-top-color:gray;\n}\n.swt-widgets-spinner {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.hwndText = null;
this.hwndUpDown = null;
this.ignoreModify = false;
this.pageIncrement = 0;
this.digits = 0;
this.minimum = 0;
this.maximum = 0;
this.increment = 0;
this.textHandle = null;
this.updownHandle = null;
this.textInputHandle = null;
this.downBtnHandle = null;
this.upBtnHandle = null;
this.hTextKeyDown = null;
this.hTextChange = null;
this.hDownClick = null;
this.hUpClick = null;
$_Z (this, arguments);
}, $wt.widgets, "Spinner", $wt.widgets.Composite);
c$.checkStyle = $_M (c$, "checkStyle", 
function (style) {
return style & -769;
}, "~N");
$_M(c$,"createHandle",
function(){
this.increment=1;
this.minimum=0;
this.maximum=100;
var oldStyle=this.style;
this.style&=-2049;
$_U(this,$wt.widgets.Spinner,"createHandle",[]);
this.style=oldStyle;
this.state&=-3;
this.pageIncrement=10;
this.digits=0;
this.handle.className+=" spinner-default";
this.updownHandle=d$.createElement("DIV");
this.handle.appendChild(this.updownHandle);
this.updownHandle.className="spinner-up-down-default";
this.upBtnHandle=d$.createElement("BUTTON");
this.updownHandle.appendChild(this.upBtnHandle);
this.upBtnHandle.className="spinner-up-button-default";
var btnArrow=d$.createElement("DIV");
btnArrow.className="spinner-button-arrow-up";
this.upBtnHandle.appendChild(btnArrow);
this.hUpClick=$_Q((($_D("$wt.widgets.Spinner$1")?0:org.eclipse.swt.widgets.Spinner.$Spinner$1$()),$_N($wt.widgets.Spinner$1,this,null)));
Clazz.addEvent(this.upBtnHandle,"click",this.hUpClick);
this.downBtnHandle=d$.createElement("BUTTON");
this.updownHandle.appendChild(this.downBtnHandle);
this.downBtnHandle.className="spinner-down-button-default";
btnArrow=d$.createElement("DIV");
btnArrow.className="spinner-button-arrow-down";
this.downBtnHandle.appendChild(btnArrow);
this.hDownClick=$_Q((($_D("$wt.widgets.Spinner$2")?0:org.eclipse.swt.widgets.Spinner.$Spinner$2$()),$_N($wt.widgets.Spinner$2,this,null)));
Clazz.addEvent(this.downBtnHandle,"click",this.hDownClick);
this.textHandle=d$.createElement("DIV");
this.handle.appendChild(this.textHandle);
this.textHandle.className="spinner-text-default";
this.textInputHandle=d$.createElement("INPUT");
this.textInputHandle.className="spinner-text-field-default";
if((this.style&8)!=0){
this.textInputHandle.readOnly=true;
}if((this.style&2048)==0){
this.textInputHandle.className+=" spinner-text-field-no-border";
}this.textHandle.appendChild(this.textInputHandle);
this.setSelection(0,false);
this.hTextChange=$_Q((($_D("$wt.widgets.Spinner$3")?0:org.eclipse.swt.widgets.Spinner.$Spinner$3$()),$_N($wt.widgets.Spinner$3,this,null)));
Clazz.addEvent(this.textInputHandle,"change",this.hTextChange);
this.hTextKeyDown=$_Q((($_D("$wt.widgets.Spinner$4")?0:org.eclipse.swt.widgets.Spinner.$Spinner$4$()),$_N($wt.widgets.Spinner$4,this,null)));
Clazz.addEvent(this.textInputHandle,"keydown",this.hTextKeyDown);
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
height=13;
var string=""+this.maximum;
if(this.digits>0){
var leading=Math.floor(this.maximum/Math.round(Math.pow(10,this.digits)));
var buffer=""+leading;
buffer+=this.getDecimalSeparator();
var count=this.digits-buffer.length+1;
while(count>=0){
buffer+="0";
count--;
}
string=buffer;
}width=O$.getStringPlainWidth(string);
}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
if(hHint==-1){
trim.height=Math.max(trim.height,16);
}return new $wt.graphics.Point(trim.width,trim.height);
},"~N,~N,~B");
$_V(c$,"computeTrim",
function(x,y,width,height){
var margins=0x10000;
x-=margins&0xFFFF;
width+=(margins&0xFFFF)+((margins>>16)&0xFFFF);
if((this.style&2048)!=0){
x-=1;
y-=1;
width+=6;
height+=6;
}width+=16;
return new $wt.graphics.Rectangle(x,y,width,height);
},"~N,~N,~N,~N");
$_M(c$,"copy",
function(){
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_V(c$,"enableWidget",
function(enabled){
this.upBtnHandle.disabled=!enabled;
this.downBtnHandle.disabled=!enabled;
this.textInputHandle.disabled=!enabled;
O$.updateCSSClass(this.handle,"spinner-disabled",!enabled);
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
var value=this.textInputHandle.value;
var idx=value.indexOf(".");
if(idx!=-1){
if(value.substring(idx+1).length>this.digits){
value=value.substring(0,idx+1+this.digits);
}}value=value.replaceAll("(\\s+)|([\\+-]\\s*0+)|(^0+)|(\\.)","");
if(value.length==0){
return 0;
}if(!value.matches("\\d+")){
return 0;
}return Integer.parseInt(value);
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
if(this.textHandle!=null){
if(this.hTextChange!=null){
Clazz.removeEvent(this.textHandle,"change",this.hTextChange);
this.hTextChange=null;
}if(this.hTextKeyDown!=null){
Clazz.removeEvent(this.textHandle,"keydown",this.hTextKeyDown);
this.hTextKeyDown=null;
}O$.destroyHandle(this.textHandle);
this.textHandle=null;
}if(this.upBtnHandle!=null){
if(this.hUpClick!=null){
Clazz.removeEvent(this.upBtnHandle,"click",this.hUpClick);
this.hUpClick=null;
}O$.destroyHandle(this.upBtnHandle);
this.upBtnHandle=null;
}if(this.downBtnHandle!=null){
if(this.hDownClick!=null){
Clazz.removeEvent(this.downBtnHandle,"click",this.hDownClick);
this.hDownClick=null;
}O$.destroyHandle(this.downBtnHandle);
this.downBtnHandle=null;
}if(this.updownHandle!=null){
O$.destroyHandle(this.updownHandle);
this.updownHandle=null;
}$_U(this,$wt.widgets.Spinner,"releaseHandle",[]);
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
var pos;
pos=this.getSelection();
this.setSelection(pos,false);
},"~N");
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
var pos;
pos=this.getSelection();
if(pos>value)this.setSelection(value,false);
},"~N");
$_M(c$,"setMinimum",
function(value){
if(value<0)return;
if(value>this.maximum)return;
this.minimum=value;
var pos;
pos=this.getSelection();
if(pos<value)this.setSelection(value,false);
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
var str="";
if(index>0){
str+=string.substring(0,index);
str+=decimalSeparator;
str+=string.substring(index);
}else{
str+="0";
str+=decimalSeparator;
while(index++<0)str+="0";

str+=string;
}string=str;
}if(this.hooks(25)||this.filters(25)){
var length=this.textInputHandle.value.length;
string=this.verifyText(string,0,length,null);
if(string==null)return;
}if(this.textInputHandle!=null){
this.textInputHandle.value=""+string;
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
width-=17;
if((this.style&2048)!=0){
width-=4;
height-=6;
}width=(width<0)?0:width;
height=(height<0)?0:height;
this.textInputHandle.style.width=width+"px";
this.textInputHandle.style.height=height+"px";
},"~N,~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
$_U(this,$wt.widgets.Spinner,"setBounds",[x,y,width,height,flags]);
width-=17;
if((this.style&2048)!=0){
width-=4;
height-=6;
}width=(width<0)?0:width;
height=(height<0)?0:height;
this.textInputHandle.style.width=width+"px";
this.textInputHandle.style.height=height+"px";
},"~N,~N,~N,~N,~N");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
this.textHandle.style.width=(cx>0?cx:0)+"px";
this.textHandle.style.height=(cy>0?cy:0)+"px";
this.textInputHandle.style.width=(cx-16>0?cx-16:0)+"px";
this.textInputHandle.style.height=(cy>0?cy:0)+"px";
if(O$.isIE){
this.upBtnHandle.style.height=(cy>>1)+"px";
this.downBtnHandle.style.height=(cy>>1)+"px";
}var h=(cy>>2<<1)+1;
O$.updateArrowSize(this.upBtnHandle.childNodes[0],128,16,h);
O$.updateArrowSize(this.downBtnHandle.childNodes[0],1024,16,h);
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
c$.$Spinner$1$=function(){
$_H();
c$=$_W($wt.widgets,"Spinner$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()+this.b$["$wt.widgets.Spinner"].increment);
});
c$=$_P();
};
c$.$Spinner$2$=function(){
$_H();
c$=$_W($wt.widgets,"Spinner$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()-this.b$["$wt.widgets.Spinner"].increment);
});
c$=$_P();
};
c$.$Spinner$3$=function(){
$_H();
c$=$_W($wt.widgets,"Spinner$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection());
});
c$=$_P();
};
c$.$Spinner$4$=function(){
$_H();
c$=$_W($wt.widgets,"Spinner$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
switch(e.keyCode){
case 38:
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()+this.b$["$wt.widgets.Spinner"].increment);
break;
case 40:
this.b$["$wt.widgets.Spinner"].setSelection(this.b$["$wt.widgets.Spinner"].getSelection()-this.b$["$wt.widgets.Spinner"].increment);
break;
default:
this.toReturn(true);
}
});
c$=$_P();
};
});
