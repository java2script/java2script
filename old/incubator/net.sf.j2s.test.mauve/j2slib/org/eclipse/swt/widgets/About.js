$_L(null,"$wt.widgets.About",["$wt.events.DisposeListener","$.SelectionAdapter","$wt.internal.ResizeSystem","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Composite","$.Display","$.Label","$.Link","$.Shell"],function(){
c$=$_T($wt.widgets,"About");
c$.openAbout=$_M(c$,"openAbout",
function(objShell){
try{
var aboutShell=null;
if(objShell==null){
aboutShell=new $wt.widgets.Shell(4);
}else{
aboutShell=new $wt.widgets.Shell(objShell,4);
}aboutShell.setText("About Java2Script");
$wt.widgets.About.createContents(aboutShell);
aboutShell.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
var gridLayout=new $wt.layout.GridLayout();
gridLayout.verticalSpacing=0;
gridLayout.marginWidth=0;
gridLayout.marginHeight=0;
gridLayout.horizontalSpacing=0;
aboutShell.setLayout(gridLayout);
aboutShell.setMinimumSize(442,301);
aboutShell.open();
aboutShell.layout();
aboutShell.pack();
var size=aboutShell.getSize();
var y=Math.floor((aboutShell.getMonitor().clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}aboutShell.setLocation(Math.floor((aboutShell.getMonitor().clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(aboutShell,16777216);
aboutShell.addDisposeListener((($_D("$wt.widgets.About$1")?0:org.eclipse.swt.widgets.About.$About$1$()),$_N($wt.widgets.About$1,this,null)));
var disp=aboutShell.display;
Sync2Async.block(aboutShell,this,function(){
if(objShell==null){
disp.dispose();
}});
return;
}catch(e){
if($_O(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
},"$wt.widgets.Shell");
c$.createContents=$_M(c$,"createContents",
($fz=function(aboutShell){
var composite=new $wt.widgets.Composite(aboutShell,0);
composite.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
composite.setLayoutData(new $wt.layout.GridData(4,4,true,true));
var gridLayout=new $wt.layout.GridLayout();
gridLayout.numColumns=2;
composite.setLayout(gridLayout);
var logo=new $wt.widgets.Label(composite,0);
var gd_logo=new $wt.layout.GridData(16384,128,false,false);
gd_logo.heightHint=160;
gd_logo.widthHint=160;
logo.setLayoutData(gd_logo);
var logoImage=null;
{
logoImage=new $wt.graphics.Image($wt.widgets.Display.getCurrent(),$wt.widgets.Display.getResourceAsStream("images/j2s-logo.gif"));
}logo.setImage(logoImage);
logo.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
var description=new $wt.widgets.Composite(composite,0);
description.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
description.setLayoutData(new $wt.layout.GridData(4,4,true,true));
description.setLayout(new $wt.layout.GridLayout());
var java2scriptLabel=new $wt.widgets.Label(description,0);
var j2sFont=null;
{
j2sFont=new $wt.graphics.Font($wt.widgets.Display.getCurrent(),new $wt.graphics.FontData("Arial",18,1));
}java2scriptLabel.setFont(j2sFont);
java2scriptLabel.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
var gd_Java2Script=new $wt.layout.GridData(4,16777216,true,false);
gd_Java2Script.verticalIndent=6;
gd_Java2Script.heightHint=24;
java2scriptLabel.setLayoutData(gd_Java2Script);
java2scriptLabel.setText("Java2Script");
var java2scriptj2sPacemakerLabel=new $wt.widgets.Label(description,64);
j2sFont=null;
{
j2sFont=new $wt.graphics.Font($wt.widgets.Display.getCurrent(),new $wt.graphics.FontData("Arial",10,0));
}java2scriptj2sPacemakerLabel.setFont(j2sFont);
java2scriptj2sPacemakerLabel.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
java2scriptj2sPacemakerLabel.setLayoutData(new $wt.layout.GridData(225,-1));
java2scriptj2sPacemakerLabel.setText("Java2Script (J2S) open source project provides an Eclipse Java to JavaScript compiler plugin, provides java.lang.*, java.util.* and other common utilities, provides an JavaScript implementation of Eclipse Standard Widget Toolkit (SWT), supports SWT-based Rich Client Platform (RCP) to Rich Internet Application (RIA) conversions.");
var homepageLink=new $wt.widgets.Link(description,0);
homepageLink.setFont(j2sFont);
var gd_homepageLink=new $wt.layout.GridData();
gd_homepageLink.verticalIndent=8;
homepageLink.setLayoutData(gd_homepageLink);
homepageLink.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
homepageLink.setText("Home: <a href=\"http://java2script.org/\">java2script.org</a> / <a href=\"http://j2s.sourceforge.net/\">j2s.sourceforge.net</a>");
var founderLink=new $wt.widgets.Link(description,0);
founderLink.setFont(j2sFont);
founderLink.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
founderLink.setText("Founder: <a href=\"http://zhourenjian.name/\">Zhou Renjian</a>");
var blank=new $wt.widgets.Composite(description,0);
blank.setBackground($wt.widgets.Display.getCurrent().getSystemColor(1));
blank.setLayoutData(new $wt.layout.GridData(4,4,true,true));
blank.setLayout(new $wt.layout.GridLayout());
var okButton=new $wt.widgets.Button(description,0);
var gd_okButton=new $wt.layout.GridData(131072,16777216,false,false);
gd_okButton.widthHint=120;
okButton.setLayoutData(gd_okButton);
okButton.setText("OK");
okButton.addSelectionListener((($_D("$wt.widgets.About$2")?0:org.eclipse.swt.widgets.About.$About$2$()),$_N($wt.widgets.About$2,this,null)));
},$fz.isPrivate=true,$fz),"$wt.widgets.Shell");
c$.$About$1$=function(){
$_H();
c$=$_W($wt.widgets,"About$1",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(e){
$wt.internal.ResizeSystem.unregister(e.widget,16777216);
},"$wt.events.DisposeEvent");
c$=$_P();
};
c$.$About$2$=function(){
$_H();
c$=$_W($wt.widgets,"About$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
(e.widget).getShell().close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
});
