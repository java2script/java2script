Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.FocusListener"], "java.awt.event.FocusAdapter", null, function () {
c$ = Clazz.declareType (java.awt.event, "FocusAdapter", null, java.awt.event.FocusListener);
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
}, "java.awt.event.FocusEvent");
});
