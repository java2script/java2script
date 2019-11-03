$_L(["$wt.widgets.TypedListener"],"$wt.custom.StyledTextListener",["$wt.custom.BidiSegmentEvent","$.ExtendedModifyEvent","$.LineBackgroundEvent","$.LineStyleEvent","$.TextChangedEvent","$.TextChangingEvent","$wt.events.VerifyEvent"],function(){
c$=$_T($wt.custom,"StyledTextListener",$wt.widgets.TypedListener);
$_V(c$,"handleEvent",
function(e){
var textChangedEvent;
switch(e.type){
case 3000:
var extendedModifyEvent=new $wt.custom.ExtendedModifyEvent(e);
(this.eventListener).modifyText(extendedModifyEvent);
break;
case 3001:
var lineBgEvent=new $wt.custom.LineBackgroundEvent(e);
(this.eventListener).lineGetBackground(lineBgEvent);
(e).lineBackground=lineBgEvent.lineBackground;
break;
case 3007:
var segmentEvent=new $wt.custom.BidiSegmentEvent(e);
(this.eventListener).lineGetSegments(segmentEvent);
(e).segments=segmentEvent.segments;
break;
case 3002:
var lineStyleEvent=new $wt.custom.LineStyleEvent(e);
(this.eventListener).lineGetStyle(lineStyleEvent);
(e).styles=lineStyleEvent.styles;
break;
case 3005:
var verifyEvent=new $wt.events.VerifyEvent(e);
(this.eventListener).verifyKey(verifyEvent);
e.doit=verifyEvent.doit;
break;
case 3006:
textChangedEvent=new $wt.custom.TextChangedEvent(e.data);
(this.eventListener).textChanged(textChangedEvent);
break;
case 3003:
var textChangingEvent=new $wt.custom.TextChangingEvent(e.data,e);
(this.eventListener).textChanging(textChangingEvent);
break;
case 3004:
textChangedEvent=new $wt.custom.TextChangedEvent(e.data);
(this.eventListener).textSet(textChangedEvent);
break;
}
},"$wt.widgets.Event");
});
