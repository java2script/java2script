$_L(["$wt.widgets.TypedListener"],"$wt.dnd.DNDListener",["$wt.dnd.DragSourceEvent","$.DropTargetEvent"],function(){
c$=$_T($wt.dnd,"DNDListener",$wt.widgets.TypedListener);
$_V(c$,"handleEvent",
function(e){
switch(e.type){
case 2008:
{
var event=new $wt.dnd.DragSourceEvent(e);
(this.eventListener).dragStart(event);
event.updateEvent(e);
break;
}case 2000:
{
var event=new $wt.dnd.DragSourceEvent(e);
(this.eventListener).dragFinished(event);
event.updateEvent(e);
break;
}case 2001:
{
var event=new $wt.dnd.DragSourceEvent(e);
(this.eventListener).dragSetData(event);
event.updateEvent(e);
break;
}case 2002:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).dragEnter(event);
event.updateEvent(e);
break;
}case 2003:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).dragLeave(event);
event.updateEvent(e);
break;
}case 2004:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).dragOver(event);
event.updateEvent(e);
break;
}case 2006:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).drop(event);
event.updateEvent(e);
break;
}case 2007:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).dropAccept(event);
event.updateEvent(e);
break;
}case 2005:
{
var event=new $wt.dnd.DropTargetEvent(e);
(this.eventListener).dragOperationChanged(event);
event.updateEvent(e);
break;
}}
},"$wt.widgets.Event");
});
