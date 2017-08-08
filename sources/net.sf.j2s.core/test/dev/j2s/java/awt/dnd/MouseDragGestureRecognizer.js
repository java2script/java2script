Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DragGestureRecognizer", "java.awt.event.MouseListener", "$.MouseMotionListener"], "java.awt.dnd.MouseDragGestureRecognizer", null, function () {
c$ = Clazz.declareType (java.awt.dnd, "MouseDragGestureRecognizer", java.awt.dnd.DragGestureRecognizer, [java.awt.event.MouseListener, java.awt.event.MouseMotionListener]);
Clazz.makeConstructor (c$, 
function (ds, c, act) {
this.construct (ds, c, act, null);
}, "java.awt.dnd.DragSource,java.awt.Component,~N");
Clazz.makeConstructor (c$, 
function (ds, c) {
this.construct (ds, c, 0);
}, "java.awt.dnd.DragSource,java.awt.Component");
Clazz.makeConstructor (c$, 
function (ds) {
this.construct (ds, null);
}, "java.awt.dnd.DragSource");
Clazz.overrideMethod (c$, "registerListeners", 
function () {
this.component.addMouseListener (this);
this.component.addMouseMotionListener (this);
});
Clazz.overrideMethod (c$, "unregisterListeners", 
function () {
this.component.removeMouseListener (this);
this.component.removeMouseMotionListener (this);
});
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "java.awt.event.MouseEvent");
});
