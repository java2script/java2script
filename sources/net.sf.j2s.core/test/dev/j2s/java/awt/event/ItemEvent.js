Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent"], "java.awt.event.ItemEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.item = null;
this.stateChange = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "ItemEvent", java.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, item, stateChange) {
Clazz.superConstructor (this, java.awt.event.ItemEvent, [source, id]);
this.item = item;
this.stateChange = stateChange;
}, "java.awt.ItemSelectable,~N,~O,~N");
Clazz.defineMethod (c$, "getItemSelectable", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "getItem", 
function () {
return this.item;
});
Clazz.defineMethod (c$, "getStateChange", 
function () {
return this.stateChange;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 701:
typeStr = "ITEM_STATE_CHANGED";
break;
default:
typeStr = "unknown type";
}
var stateStr;
switch (this.stateChange) {
case 1:
stateStr = "SELECTED";
break;
case 2:
stateStr = "DESELECTED";
break;
default:
stateStr = "unknown type";
}
return typeStr + ",item=" + this.item + ",stateChange=" + stateStr;
});
Clazz.defineStatics (c$,
"ITEM_FIRST", 701,
"ITEM_LAST", 701,
"ITEM_STATE_CHANGED", 701,
"SELECTED", 1,
"DESELECTED", 2);
});
