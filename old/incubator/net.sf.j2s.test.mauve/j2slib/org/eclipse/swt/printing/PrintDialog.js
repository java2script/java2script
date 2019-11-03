$_J("org.eclipse.swt.printing");
$_L(["$wt.widgets.Dialog"],"$wt.printing.PrintDialog",["$wt.events.SelectionAdapter","$wt.internal.ResizeSystem","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Composite","$.Label","$.Listener","$.Shell"],function(){
c$=$_C(function(){
this.scope=0;
this.startPage=1;
this.endPage=1;
this.printToFile=false;
$_Z(this,arguments);
},$wt.printing,"PrintDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.printing.PrintDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getScope",
function(){
return this.scope;
});
$_M(c$,"setScope",
function(scope){
this.scope=scope;
},"~N");
$_M(c$,"getStartPage",
function(){
return this.startPage;
});
$_M(c$,"setStartPage",
function(startPage){
this.startPage=startPage;
},"~N");
$_M(c$,"getEndPage",
function(){
return this.endPage;
});
$_M(c$,"setEndPage",
function(endPage){
this.endPage=endPage;
},"~N");
$_M(c$,"getPrintToFile",
function(){
return this.printToFile;
});
$_M(c$,"setPrintToFile",
function(printToFile){
this.printToFile=printToFile;
},"~B");
$_M(c$,"open",
function(){
this.dialogShell=new $wt.widgets.Shell(this.parent.getDisplay(),this.style|64|65536);
this.dialogShell.addListener(21,(($_D("$wt.printing.PrintDialog$1")?0:org.eclipse.swt.printing.PrintDialog.$PrintDialog$1$()),$_N($wt.printing.PrintDialog$1,this,null)));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var icon=new $wt.widgets.Label(this.dialogShell,0);
icon.setImage(this.parent.getDisplay().getSystemImage(8));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
var label=new $wt.widgets.Label(this.dialogShell,0);
label.setText("Not implemented yet.");
var buttonPanel=new $wt.widgets.Composite(this.dialogShell,0);
var gd=new $wt.layout.GridData(3,2,false,false);
gd.horizontalSpan=2;
buttonPanel.setLayoutData(gd);
buttonPanel.setLayout(new $wt.layout.GridLayout());
var btn=new $wt.widgets.Button(buttonPanel,8);
btn.setText("&OK");
btn.setLayoutData(new $wt.layout.GridData(75,24));
btn.addSelectionListener((($_D("$wt.printing.PrintDialog$2")?0:org.eclipse.swt.printing.PrintDialog.$PrintDialog$2$()),$_N($wt.printing.PrintDialog$2,this,null)));
this.dialogShell.pack();
this.dialogShell.open();
var size=this.dialogShell.getSize();
var y=Math.floor((this.dialogShell.getMonitor().getBounds().height-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation(Math.floor((this.dialogShell.getMonitor().getBounds().width-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
return null;
});
c$.$PrintDialog$1$=function(){
$_H();
c$=$_W($wt.printing,"PrintDialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
},"$wt.widgets.Event");
c$=$_P();
};
c$.$PrintDialog$2$=function(){
$_H();
c$=$_W($wt.printing,"PrintDialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.printing.PrintDialog"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
});
