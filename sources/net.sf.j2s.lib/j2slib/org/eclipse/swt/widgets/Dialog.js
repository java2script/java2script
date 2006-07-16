Clazz.load(null,"$wt.widgets.Dialog",["$wt.SWT","$wt.events.SelectionAdapter","$wt.graphics.Image","$wt.internal.ResizeSystem","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Composite","$.Display","$.Label","$.Listener","$.Shell"],function(){
c$=$_C(function(){
this.style=0;
this.parent=null;
this.title=null;
$_Z(this,arguments);
},$wt.widgets,"Dialog");
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.checkParent(parent);
this.parent=parent;
this.style=style;
this.title="";
},"$wt.widgets.Shell,~N");
$_M(c$,"checkParent",
function(parent){
if(parent==null)this.error(4);
},"$wt.widgets.Shell");
$_M(c$,"error",
function(code){
$WT.error(code);
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
function(string){
if(string==null)this.error(4);
this.title=string;
},"~S");
$_M(c$,"dialogUnimplemented",
function(){
var dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|2048);
dialogShell.addListener(21,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$1")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
},"$wt.widgets.Event");
c$=$_P();
}
return $_N($wt.widgets.Dialog$1,i$,v$);
})(this,null));
dialogShell.setText(this.title);
dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var icon=new $wt.widgets.Label(dialogShell,0);
icon.setImage(new $wt.graphics.Image(dialogShell.display,"j2slib/images/warning.png"));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
var label=new $wt.widgets.Label(dialogShell,0);
label.setText("Not implemented yet.");
var buttonPanel=new $wt.widgets.Composite(dialogShell,0);
var gd=new $wt.layout.GridData(3,2,false,false);
gd.horizontalSpan=2;
buttonPanel.setLayoutData(gd);
buttonPanel.setLayout(new $wt.layout.GridLayout());
var btn=new $wt.widgets.Button(buttonPanel,8);
btn.setText("&OK");
btn.setLayoutData(new $wt.layout.GridData(75,24));
btn.addSelectionListener((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Dialog$2")){
$_H();
c$=$_C(function(){
$_B(this,arguments);
$_Z(this,arguments);
},$wt.widgets,"Dialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.f$.dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
}
return $_N($wt.widgets.Dialog$2,i$,v$);
})(this,$_F("dialogShell",dialogShell)));
dialogShell.pack();
dialogShell.open();
var size=dialogShell.getSize();
var y=Math.floor((dialogShell.getMonitor().clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}dialogShell.setLocation(Math.floor((dialogShell.getMonitor().clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(dialogShell,16777216);
});
});
