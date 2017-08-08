Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener"], "java.awt.event.MouseAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "MouseAdapter", null, [java.awt.event.MouseListener, java.awt.event.MouseWheelListener, java.awt.event.MouseMotionListener]);
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
Clazz.overrideMethod (c$, "mouseWheelMoved", 
function (e) {
}, "java.awt.event.MouseWheelEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "java.awt.event.MouseEvent");
});
