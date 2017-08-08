Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.AWTEventMulticaster", "java.awt.dnd.DragSourceListener", "$.DragSourceMotionListener"], "java.awt.dnd.DnDEventMulticaster", null, function () {
c$ = Clazz.declareType (java.awt.dnd, "DnDEventMulticaster", java.awt.AWTEventMulticaster, [java.awt.dnd.DragSourceListener, java.awt.dnd.DragSourceMotionListener]);
Clazz.defineMethod (c$, "dragEnter", 
function (dsde) {
(this.a).dragEnter (dsde);
(this.b).dragEnter (dsde);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dragOver", 
function (dsde) {
(this.a).dragOver (dsde);
(this.b).dragOver (dsde);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dropActionChanged", 
function (dsde) {
(this.a).dropActionChanged (dsde);
(this.b).dropActionChanged (dsde);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dragExit", 
function (dse) {
(this.a).dragExit (dse);
(this.b).dragExit (dse);
}, "java.awt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "dragDropEnd", 
function (dsde) {
(this.a).dragDropEnd (dsde);
(this.b).dragDropEnd (dsde);
}, "java.awt.dnd.DragSourceDropEvent");
Clazz.defineMethod (c$, "dragMouseMoved", 
function (dsde) {
(this.a).dragMouseMoved (dsde);
(this.b).dragMouseMoved (dsde);
}, "java.awt.dnd.DragSourceDragEvent");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.dnd.DnDEventMulticaster.addInternal (a, b);
}, "java.awt.dnd.DragSourceListener,java.awt.dnd.DragSourceListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.dnd.DnDEventMulticaster.addInternal (a, b);
}, "java.awt.dnd.DragSourceMotionListener,java.awt.dnd.DragSourceMotionListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.dnd.DnDEventMulticaster.removeInternal (l, oldl);
}, "java.awt.dnd.DragSourceListener,java.awt.dnd.DragSourceListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, ol) {
return java.awt.dnd.DnDEventMulticaster.removeInternal (l, ol);
}, "java.awt.dnd.DragSourceMotionListener,java.awt.dnd.DragSourceMotionListener");
c$.addInternal = Clazz.overrideMethod (c$, "addInternal", 
function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new java.awt.dnd.DnDEventMulticaster (a, b);
}, "java.util.EventListener,java.util.EventListener");
Clazz.defineMethod (c$, "remove", 
function (oldl) {
if (oldl === this.a) return this.b;
if (oldl === this.b) return this.a;
var a2 = java.awt.dnd.DnDEventMulticaster.removeInternal (this.a, oldl);
var b2 = java.awt.dnd.DnDEventMulticaster.removeInternal (this.b, oldl);
if (a2 === this.a && b2 === this.b) {
return this;
}return java.awt.dnd.DnDEventMulticaster.addInternal (a2, b2);
}, "java.util.EventListener");
c$.removeInternal = Clazz.overrideMethod (c$, "removeInternal", 
function (l, oldl) {
if (l === oldl || l == null) {
return null;
} else if (Clazz.instanceOf (l, java.awt.dnd.DnDEventMulticaster)) {
return (l).remove (oldl);
} else {
return l;
}}, "java.util.EventListener,java.util.EventListener");
});
