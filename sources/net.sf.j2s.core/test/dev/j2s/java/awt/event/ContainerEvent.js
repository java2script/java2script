Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentEvent"], "java.awt.event.ContainerEvent", ["java.awt.Container"], function () {
c$ = Clazz.decorateAsClass (function () {
this.child = null;
Clazz.instantialize (this, arguments);
}, java.awt.event, "ContainerEvent", java.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, child) {
Clazz.superConstructor (this, java.awt.event.ContainerEvent, [source, id]);
this.child = child;
}, "java.awt.Component,~N,java.awt.Component");
Clazz.defineMethod (c$, "getContainer", 
function () {
return (Clazz.instanceOf (this.source, java.awt.Container)) ? this.source : null;
});
Clazz.defineMethod (c$, "getChild", 
function () {
return this.child;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 300:
typeStr = "COMPONENT_ADDED";
break;
case 301:
typeStr = "COMPONENT_REMOVED";
break;
default:
typeStr = "unknown type";
}
return typeStr + ",child=" + this.child.getName ();
});
Clazz.defineStatics (c$,
"CONTAINER_FIRST", 300,
"CONTAINER_LAST", 301,
"COMPONENT_ADDED", 300,
"COMPONENT_REMOVED", 301);
});
