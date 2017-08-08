Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent"], "java.awt.event.ComponentEvent", ["java.awt.Component"], function () {
c$ = Clazz.declareType (java.awt.event, "ComponentEvent", java.awt.AWTEvent);
Clazz.defineMethod (c$, "getComponent", 
function () {
return (Clazz.instanceOf (this.source, java.awt.Component)) ? this.source : null;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
var b = (this.source != null ? (this.source).getBounds () : null);
switch (this.id) {
case 102:
typeStr = "COMPONENT_SHOWN";
break;
case 103:
typeStr = "COMPONENT_HIDDEN";
break;
case 100:
typeStr = "COMPONENT_MOVED (" + b.x + "," + b.y + " " + b.width + "x" + b.height + ")";
break;
case 101:
typeStr = "COMPONENT_RESIZED (" + b.x + "," + b.y + " " + b.width + "x" + b.height + ")";
break;
default:
typeStr = "unknown type";
}
return typeStr;
});
Clazz.defineStatics (c$,
"COMPONENT_FIRST", 100,
"COMPONENT_LAST", 103,
"COMPONENT_MOVED", 100,
"COMPONENT_RESIZED", 101,
"COMPONENT_SHOWN", 102,
"COMPONENT_HIDDEN", 103);
});
