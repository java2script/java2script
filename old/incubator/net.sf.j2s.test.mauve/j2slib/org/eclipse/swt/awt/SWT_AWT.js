$_J("org.eclipse.swt.awt");
c$=$_T($wt.awt,"SWT_AWT");
c$.loadLibrary=$_M(c$,"loadLibrary",
function(){
if($wt.awt.SWT_AWT.loaded)return;
($t$=$wt.awt.SWT_AWT.loaded=true,$wt.awt.SWT_AWT.prototype.loaded=$wt.awt.SWT_AWT.loaded,$t$);
});
c$.initializeSwing=$_M(c$,"initializeSwing",
function(){
if($wt.awt.SWT_AWT.swingInitialized)return;
($t$=$wt.awt.SWT_AWT.swingInitialized=true,$wt.awt.SWT_AWT.prototype.swingInitialized=$wt.awt.SWT_AWT.swingInitialized,$t$);
});
c$.new_Frame=$_M(c$,"new_Frame",
function(parent){
return null;
},"$wt.widgets.Composite");
c$.new_Shell=$_M(c$,"new_Shell",
function(display,parent){
return null;
},"$wt.widgets.Display,java.awt.Canvas");
$_S(c$,
"embeddedFrameClass",null,
"loaded",false,
"swingInitialized",false);
