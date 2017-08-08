Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.HierarchyBoundsListener"], "java.awt.event.HierarchyBoundsAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "HierarchyBoundsAdapter", null, java.awt.event.HierarchyBoundsListener);
Clazz.overrideMethod (c$, "ancestorMoved", 
function (e) {
}, "java.awt.event.HierarchyEvent");
Clazz.overrideMethod (c$, "ancestorResized", 
function (e) {
}, "java.awt.event.HierarchyEvent");
});
