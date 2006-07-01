/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=swt-default.css,j2s-swt-basic.z.js,j2s-swt-event.z.js,j2s-swt-layout.z.js,j2s-swt-widget.z.js,org/eclipse/swt/widgets/ScrollBar.js,org/eclipse/swt/widgets/Monitor.js,org/eclipse/swt/widgets/Caret.js,org/eclipse/swt/widgets/Spinner.js,org/eclipse/swt/widgets/ProgressBar.js,org/eclipse/swt/widgets/Scale.js,org/eclipse/swt/internal/dnd/ScaleDND.js,org/eclipse/swt/widgets/Slider.js,org/eclipse/swt/internal/dnd/SliderDND.js,org/eclipse/swt/widgets/MenuItem.js,org/eclipse/swt/widgets/Menu.js,org/eclipse/swt/widgets/Monitor.js,org/eclipse/swt/widgets/TableItem.js,org/eclipse/swt/widgets/TableColumn.js,org/eclipse/swt/widgets/Table.js,org/eclipse/swt/widgets/TreeItem.js,org/eclipse/swt/widgets/TreeColumn.js,org/eclipse/swt/widgets/Tree.js,org/eclipse/swt/widgets/ToolBar.js,org/eclipse/swt/widgets/ToolItem.js,org/eclipse/swt/widgets/CoolBar.js,org/eclipse/swt/widgets/CoolItem.js,org/eclipse/swt/widgets/ColorDialog.js,org/eclipse/swt/widgets/DirectoryDialog.js,org/eclipse/swt/widgets/FileDialog.js,org/eclipse/swt/widgets/FontDialog.js
=*/
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
this.state=this.state|16;
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
System.out.println("setvisible of scrollbar called : "+visible+" parent : "+this.parent);
var isVisible=(this.state&16)==0;
if(isVisible==visible)return;
if(visible){
this.state=this.state&-17;
}else{
this.state=this.state|16;
}if(this.parent==null||this.parent.handle==null){
return;
}var scrollClass="hscroll-default";
if((this.style&512)!=0){
scrollClass="vscroll-default";
}var className=this.parent.handle.className;
var idx=this.parent.handle.className.indexOf(scrollClass);
System.out.println("parent scroll class name is "+className+" "+idx+" "+visible);
if(!visible&&idx!=-1){
className=className.substring(0,idx)+className.substring(idx+scrollClass.length);
}else if(visible&&idx==-1){
className+=" "+scrollClass;
}System.out.println("setting parent scrollable to "+className);
this.parent.handle.className=className;
},"~B");
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
},"~O");
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
}var size=O$.getStringPlainSize(string);
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
O$.destroyHandle(this.handle);
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
O$.destroyHandle(this.$handle);
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
},"~O");
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
e.display=this.b$["$wt.widgets.TableItem"].display;
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
e.display=this.b$["$wt.widgets.TableItem"].display;
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
e.display=this.b$["$wt.widgets.TableItem"].display;
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
}if((this.parent.style&65536)!=0){
this.handle.className=selected?"table-item-selected":"table-item-default";
}else{
var element=this.handle.childNodes[0].childNodes[0].childNodes[index];
element.className=selected?"table-item-cell-text-selected":"table-item-cell-text-default";
}},"~B");
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
}return O$.getContainerWidth(this.handle);
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
this.tbody=null;
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
this.tbody=null;
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
event.display=this.display;
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
height=(O$.getStringPlainHeight(t)+5)*(this.items.length+0);
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
this.handle.className+=" table-default";
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
if(this.tbody==null)for(var i=0;i<table.childNodes.length;i++){
if("TBODY".equals(table.childNodes[i].nodeName)){
this.tbody=table.childNodes[i];
break;
}}
if(this.tbody==null){
this.tbody=d$.createElement("TBODY");
table.appendChild(this.tbody);
}var tbodyTR=d$.createElement("TR");
tbodyTR.className="table-item-default";
if(index<0||index>=this.tbody.childNodes.length){
this.tbody.appendChild(tbodyTR);
this.items[index]=item;
}else{
System.out.println("existed");
this.tbody.insertBefore(tbodyTR,this.tbody.childNodes[index]);
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
columnWidth=O$.getStringPlainWidth(t);
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
if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}this.parent=null;
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
O$.clearChildren(tbodyTD);
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
e.display=this.b$["$wt.widgets.TreeItem"].display;
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
e.display=this.b$["$wt.widgets.TreeItem"].display;
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
var e=new $wt.widgets.Event();
e.display=this.b$["$wt.widgets.TreeItem"].display;
e.type=14;
e.detail=0;
e.item=this.b$["$wt.widgets.TreeItem"];
e.widget=this.b$["$wt.widgets.TreeItem"];
this.b$["$wt.widgets.TreeItem"].parent.sendEvent(e);
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
e.display=this.display;
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
this.handle.className+=" tree-default";
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
}var count=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i].handle==null){
this.items[i]=null;
count++;
}}
if(count==this.items.length){
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
}},"$wt.widgets.TreeItem,~O,~N");
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
this.items=new Array(0);
this.columns=new Array(0);
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
w=O$.getStringPlainWidth(this.text);
}var height=this.handle.style.height;
if(height!=null&&height.length!=0){
h=Integer.parseInt(height);
}else if(this.text!=null&&this.text.length!=0){
h=O$.getStringPlainHeight(this.text);
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
