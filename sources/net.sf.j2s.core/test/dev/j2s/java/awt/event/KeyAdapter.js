Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.KeyListener"], "java.awt.event.KeyAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "KeyAdapter", null, java.awt.event.KeyListener);
Clazz.overrideMethod (c$, "keyTyped", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyReleased", 
function (e) {
}, "java.awt.event.KeyEvent");
});
