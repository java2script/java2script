Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ContainerListener"], "java.awt.event.ContainerAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "ContainerAdapter", null, java.awt.event.ContainerListener);
Clazz.overrideMethod (c$, "componentAdded", 
function (e) {
}, "java.awt.event.ContainerEvent");
Clazz.overrideMethod (c$, "componentRemoved", 
function (e) {
}, "java.awt.event.ContainerEvent");
});
