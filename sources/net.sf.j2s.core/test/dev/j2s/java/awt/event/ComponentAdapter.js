Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentListener"], "java.awt.event.ComponentAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "ComponentAdapter", null, java.awt.event.ComponentListener);
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
});
