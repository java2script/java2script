Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.MouseMotionListener"], "java.awt.event.MouseMotionAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "MouseMotionAdapter", null, java.awt.event.MouseMotionListener);
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "java.awt.event.MouseEvent");
});
