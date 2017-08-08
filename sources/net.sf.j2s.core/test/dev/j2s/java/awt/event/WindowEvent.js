Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentEvent"], "java.awt.event.WindowEvent", ["java.awt.Window", "sun.awt.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.opposite = null;
this.oldState = 0;
this.newState = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "WindowEvent", java.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, opposite, oldState, newState) {
Clazz.superConstructor (this, java.awt.event.WindowEvent, [source, id]);
this.opposite = opposite;
this.oldState = oldState;
this.newState = newState;
}, "java.awt.Window,~N,java.awt.Window,~N,~N");
Clazz.makeConstructor (c$, 
function (source, id, opposite) {
this.construct (source, id, opposite, 0, 0);
}, "java.awt.Window,~N,java.awt.Window");
Clazz.makeConstructor (c$, 
function (source, id, oldState, newState) {
this.construct (source, id, null, oldState, newState);
}, "java.awt.Window,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (source, id) {
this.construct (source, id, null, 0, 0);
}, "java.awt.Window,~N");
Clazz.defineMethod (c$, "getWindow", 
function () {
return (Clazz.instanceOf (this.source, java.awt.Window)) ? this.source : null;
});
Clazz.defineMethod (c$, "getOppositeWindow", 
function () {
if (this.opposite == null) {
return null;
}return (sun.awt.SunToolkit.targetToAppContext (this.opposite) === sun.awt.AppContext.getAppContext ()) ? this.opposite : null;
});
Clazz.defineMethod (c$, "getOldState", 
function () {
return this.oldState;
});
Clazz.defineMethod (c$, "getNewState", 
function () {
return this.newState;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 200:
typeStr = "WINDOW_OPENED";
break;
case 201:
typeStr = "WINDOW_CLOSING";
break;
case 202:
typeStr = "WINDOW_CLOSED";
break;
case 203:
typeStr = "WINDOW_ICONIFIED";
break;
case 204:
typeStr = "WINDOW_DEICONIFIED";
break;
case 205:
typeStr = "WINDOW_ACTIVATED";
break;
case 206:
typeStr = "WINDOW_DEACTIVATED";
break;
case 207:
typeStr = "WINDOW_GAINED_FOCUS";
break;
case 208:
typeStr = "WINDOW_LOST_FOCUS";
break;
case 209:
typeStr = "WINDOW_STATE_CHANGED";
break;
default:
typeStr = "unknown type";
}
typeStr += ",opposite=" + this.getOppositeWindow () + ",oldState=" + this.oldState + ",newState=" + this.newState;
return typeStr;
});
Clazz.defineStatics (c$,
"WINDOW_FIRST", 200,
"WINDOW_OPENED", 200,
"WINDOW_CLOSING", 201,
"WINDOW_CLOSED", 202,
"WINDOW_ICONIFIED", 203,
"WINDOW_DEICONIFIED", 204,
"WINDOW_ACTIVATED", 205,
"WINDOW_DEACTIVATED", 206,
"WINDOW_GAINED_FOCUS", 207,
"WINDOW_LOST_FOCUS", 208,
"WINDOW_STATE_CHANGED", 209,
"WINDOW_LAST", 209);
});
