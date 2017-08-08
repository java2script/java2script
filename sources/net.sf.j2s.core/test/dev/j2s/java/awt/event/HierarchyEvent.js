Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent"], "java.awt.event.HierarchyEvent", ["java.awt.Component"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changed = null;
this.changedParent = null;
this.changeFlags = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "HierarchyEvent", java.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, changed, changedParent) {
Clazz.superConstructor (this, java.awt.event.HierarchyEvent, [source, id]);
this.changed = changed;
this.changedParent = changedParent;
}, "java.awt.Component,~N,java.awt.Component,java.awt.Container");
Clazz.makeConstructor (c$, 
function (source, id, changed, changedParent, changeFlags) {
Clazz.superConstructor (this, java.awt.event.HierarchyEvent, [source, id]);
this.changed = changed;
this.changedParent = changedParent;
this.changeFlags = changeFlags;
}, "java.awt.Component,~N,java.awt.Component,java.awt.Container,~N");
Clazz.defineMethod (c$, "getComponent", 
function () {
return (Clazz.instanceOf (this.source, java.awt.Component)) ? this.source : null;
});
Clazz.defineMethod (c$, "getChanged", 
function () {
return this.changed;
});
Clazz.defineMethod (c$, "getChangedParent", 
function () {
return this.changedParent;
});
Clazz.defineMethod (c$, "getChangeFlags", 
function () {
return this.changeFlags;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 1401:
typeStr = "ANCESTOR_MOVED (" + this.changed + "," + this.changedParent + ")";
break;
case 1402:
typeStr = "ANCESTOR_RESIZED (" + this.changed + "," + this.changedParent + ")";
break;
case 1400:
{
typeStr = "HIERARCHY_CHANGED (";
var first = true;
if ((this.changeFlags & 1) != 0) {
first = false;
typeStr += "PARENT_CHANGED";
}if ((this.changeFlags & 2) != 0) {
if (first) {
first = false;
} else {
typeStr += ",";
}typeStr += "DISPLAYABILITY_CHANGED";
}if ((this.changeFlags & 4) != 0) {
if (first) {
first = false;
} else {
typeStr += ",";
}typeStr += "SHOWING_CHANGED";
}if (!first) {
typeStr += ",";
}typeStr += this.changed + "," + this.changedParent + ")";
break;
}default:
typeStr = "unknown type";
}
return typeStr;
});
Clazz.defineStatics (c$,
"HIERARCHY_FIRST", 1400,
"HIERARCHY_CHANGED", 1400,
"ANCESTOR_MOVED", 1401,
"ANCESTOR_RESIZED", 1402,
"HIERARCHY_LAST", 1402,
"PARENT_CHANGED", 0x1,
"DISPLAYABILITY_CHANGED", 0x2,
"SHOWING_CHANGED", 0x4);
});
