$_L(["$wt.widgets.Dialog"],"$wt.widgets.MessageBox",["$wt.events.DisposeListener","$.SelectionAdapter","$wt.internal.ResizeSystem","$wt.internal.browser.OS","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Composite","$.Label","$.Listener","$.Shell"],function(){
c$=$_C(function(){
this.message="";
this.buttonPanel=null;
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
this.dialogShell=new $wt.widgets.Shell(this.parent.display,65600);
this.dialogShell.addListener(21,(($_D("$wt.widgets.MessageBox$1")?0:org.eclipse.swt.widgets.MessageBox.$MessageBox$1$()),$_N($wt.widgets.MessageBox$1,this,null)));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var iconID=0;
var iconStyles=[1,2,4,8,16];
for(var i=0;i<iconStyles.length;i++){
if((this.style&iconStyles[i])!=0){
iconID=iconStyles[i];
break;
}}
if(iconID!=0){
var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout());
var gd=new $wt.layout.GridData(48,48);
composite.setLayoutData(gd);
var icon=new $wt.widgets.Label(composite,0);
icon.setImage(this.parent.display.getSystemImage(iconID));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
}var composite=new $wt.widgets.Composite(this.dialogShell,0);
composite.setLayout(new $wt.layout.GridLayout(2,false));
var gd=new $wt.layout.GridData(1812);
if(iconID==0){
gd.horizontalSpan=2;
}gd.grabExcessVerticalSpace=true;
gd.heightHint=48;
var labelGD=new $wt.layout.GridData(4);
var wHint=O$.getStringPlainWidth(this.message);
if(wHint>480){
labelGD.widthHint=480;
var hHint=O$.getStringPlainWrappedHeight(this.message,labelGD.widthHint);
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
var y=Math.floor((this.dialogShell.getMonitor().clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation(Math.floor((this.dialogShell.getMonitor().clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
this.dialogShell.addDisposeListener((($_D("$wt.widgets.MessageBox$2")?0:org.eclipse.swt.widgets.MessageBox.$MessageBox$2$()),$_N($wt.widgets.MessageBox$2,this,null)));
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
var gridData=new $wt.layout.GridData();
gridData.widthHint=75;
gridData.minimumHeight=24;
this.btn.setLayoutData(gridData);
this.btn.addSelectionListener((($_D("$wt.widgets.MessageBox$3")?0:org.eclipse.swt.widgets.MessageBox.$MessageBox$3$()),$_N($wt.widgets.MessageBox$3,this,$_F("btnStyle",btnStyle))));
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
}{
this.dialogReturn=this.returnCode;
}},$fz.isPrivate=true,$fz));
c$.$MessageBox$1$=function(){
$_H();
c$=$_W($wt.widgets,"MessageBox$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.widgets.MessageBox"].updateReturnCode();
},"$wt.widgets.Event");
c$=$_P();
};
c$.$MessageBox$2$=function(){
$_H();
c$=$_W($wt.widgets,"MessageBox$2",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(e){
$wt.internal.ResizeSystem.unregister(this.b$["$wt.widgets.MessageBox"].dialogShell,16777216);
},"$wt.events.DisposeEvent");
c$=$_P();
};
c$.$MessageBox$3$=function(){
$_H();
c$=$_W($wt.widgets,"MessageBox$3",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.MessageBox"].returnCode=this.f$.btnStyle;
this.b$["$wt.widgets.MessageBox"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
});
