Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent"], "java.awt.event.AdjustmentEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.adjustable = null;
this.value = 0;
this.adjustmentType = 0;
this.isAdjusting = false;
Clazz.instantialize (this, arguments);
}, java.awt.event, "AdjustmentEvent", java.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, type, value) {
this.construct (source, id, type, value, false);
}, "java.awt.Adjustable,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (source, id, type, value, isAdjusting) {
Clazz.superConstructor (this, java.awt.event.AdjustmentEvent, [source, id]);
this.adjustable = source;
this.adjustmentType = type;
this.value = value;
this.isAdjusting = isAdjusting;
}, "java.awt.Adjustable,~N,~N,~N,~B");
Clazz.defineMethod (c$, "getAdjustable", 
function () {
return this.adjustable;
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "getAdjustmentType", 
function () {
return this.adjustmentType;
});
Clazz.defineMethod (c$, "getValueIsAdjusting", 
function () {
return this.isAdjusting;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 601:
typeStr = "ADJUSTMENT_VALUE_CHANGED";
break;
default:
typeStr = "unknown type";
}
var adjTypeStr;
switch (this.adjustmentType) {
case 1:
adjTypeStr = "UNIT_INCREMENT";
break;
case 2:
adjTypeStr = "UNIT_DECREMENT";
break;
case 4:
adjTypeStr = "BLOCK_INCREMENT";
break;
case 3:
adjTypeStr = "BLOCK_DECREMENT";
break;
case 5:
adjTypeStr = "TRACK";
break;
default:
adjTypeStr = "unknown type";
}
return typeStr + ",adjType=" + adjTypeStr + ",value=" + this.value + ",isAdjusting=" + this.isAdjusting;
});
Clazz.defineStatics (c$,
"ADJUSTMENT_FIRST", 601,
"ADJUSTMENT_LAST", 601,
"ADJUSTMENT_VALUE_CHANGED", 601,
"UNIT_INCREMENT", 1,
"UNIT_DECREMENT", 2,
"BLOCK_DECREMENT", 3,
"BLOCK_INCREMENT", 4,
"TRACK", 5);
});
