$_L(["$wt.widgets.Listener"],"$wt.widgets.TypedListener",["$wt.events.ArmEvent","$.ControlEvent","$.DisposeEvent","$.FocusEvent","$.HelpEvent","$.KeyEvent","$.MenuDetectEvent","$.MenuEvent","$.ModifyEvent","$.MouseEvent","$.PaintEvent","$.SelectionEvent","$.ShellEvent","$.TraverseEvent","$.TreeEvent","$.VerifyEvent"],function(){
c$=$_C(function(){
this.eventListener=null;
$_Z(this,arguments);
},$wt.widgets,"TypedListener",null,$wt.widgets.Listener);
$_K(c$,
function(listener){
this.eventListener=listener;
},"$wt.internal.SWTEventListener");
$_M(c$,"getEventListener",
function(){
return this.eventListener;
});
$_V(c$,"handleEvent",
function(e){
var eventListener=this.eventListener;
switch(e.type){
case 9:
{
var event=new $wt.events.PaintEvent(e);
(eventListener).paintControl(event);
e.gc=event.gc;
break;
}case 13:
{
var event=new $wt.events.SelectionEvent(e);
(eventListener).widgetSelected(event);
e.x=event.x;
e.y=event.y;
e.doit=event.doit;
break;
}case 14:
{
(eventListener).widgetDefaultSelected(new $wt.events.SelectionEvent(e));
break;
}case 12:
{
(eventListener).widgetDisposed(new $wt.events.DisposeEvent(e));
break;
}case 15:
{
(eventListener).focusGained(new $wt.events.FocusEvent(e));
break;
}case 16:
{
(eventListener).focusLost(new $wt.events.FocusEvent(e));
break;
}case 23:
{
(eventListener).menuHidden(new $wt.events.MenuEvent(e));
break;
}case 22:
{
(eventListener).menuShown(new $wt.events.MenuEvent(e));
break;
}case 1:
{
var event=new $wt.events.KeyEvent(e);
(eventListener).keyPressed(event);
e.doit=event.doit;
break;
}case 2:
{
var event=new $wt.events.KeyEvent(e);
(eventListener).keyReleased(event);
e.doit=event.doit;
break;
}case 35:
{
var event=new $wt.events.MenuDetectEvent(e);
(eventListener).menuDetected(event);
e.x=event.x;
e.y=event.y;
e.doit=event.doit;
break;
}case 3:
{
(eventListener).mouseDown(new $wt.events.MouseEvent(e));
break;
}case 4:
{
(eventListener).mouseUp(new $wt.events.MouseEvent(e));
break;
}case 8:
{
(eventListener).mouseDoubleClick(new $wt.events.MouseEvent(e));
break;
}case 5:
{
(eventListener).mouseMove(new $wt.events.MouseEvent(e));
return;
}case 11:
{
(eventListener).controlResized(new $wt.events.ControlEvent(e));
break;
}case 10:
{
(eventListener).controlMoved(new $wt.events.ControlEvent(e));
break;
}case 21:
{
var event=new $wt.events.ShellEvent(e);
(eventListener).shellClosed(event);
e.doit=event.doit;
break;
}case 26:
{
(eventListener).shellActivated(new $wt.events.ShellEvent(e));
break;
}case 27:
{
(eventListener).shellDeactivated(new $wt.events.ShellEvent(e));
break;
}case 19:
{
(eventListener).shellIconified(new $wt.events.ShellEvent(e));
break;
}case 20:
{
(eventListener).shellDeiconified(new $wt.events.ShellEvent(e));
break;
}case 17:
{
(eventListener).treeExpanded(new $wt.events.TreeEvent(e));
break;
}case 18:
{
(eventListener).treeCollapsed(new $wt.events.TreeEvent(e));
break;
}case 24:
{
(eventListener).modifyText(new $wt.events.ModifyEvent(e));
break;
}case 25:
{
var event=new $wt.events.VerifyEvent(e);
(eventListener).verifyText(event);
e.text=event.text;
e.doit=event.doit;
break;
}case 28:
{
(eventListener).helpRequested(new $wt.events.HelpEvent(e));
break;
}case 30:
{
(eventListener).widgetArmed(new $wt.events.ArmEvent(e));
break;
}case 7:
{
(eventListener).mouseExit(new $wt.events.MouseEvent(e));
break;
}case 6:
{
(eventListener).mouseEnter(new $wt.events.MouseEvent(e));
break;
}case 32:
{
(eventListener).mouseHover(new $wt.events.MouseEvent(e));
break;
}case 31:
{
var event=new $wt.events.TraverseEvent(e);
(eventListener).keyTraversed(event);
e.detail=event.detail;
e.doit=event.doit;
break;
}}
},"$wt.widgets.Event");
});
